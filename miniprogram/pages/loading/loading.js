const syncManager = require('../../utils/sync-manager')
const { citiesData } = require('../../data/cities')

Page({
  data: {},

  onLoad() {
    this.checkWeRunAuth()
  },

  // 检查微信运动权限
  async checkWeRunAuth() {
    try {
      // 先检查是否已经授权
      const setting = await wx.getSetting()
      if (setting.authSetting['scope.werun']) {
        // 已授权，处理步数数据
        await this.handleWeRunData()
      } else {
        // 未授权，主动请求授权
        wx.authorize({
          scope: 'scope.werun',
          success: async () => {
            // 用户同意授权，处理步数数据
            await this.handleWeRunData()
          },
          fail: () => {
            // 用户拒绝授权，跳转到授权页面
            wx.redirectTo({
              url: '/pages/werun-auth/werun-auth'
            })
          }
        })
      }
    } catch (err) {
      console.error('检查微信运动权限失败：', err)
      wx.showToast({
        title: '数据加载失败，请重新登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }, 1500)
    }
  },

  // 处理微信运动数据
  async handleWeRunData() {
    try {
      console.log('开始处理微信运动数据')
      // 获取微信运动数据
      const weRunData = await this.getWeRunData()
      console.log('获取到的微信运动数据：', weRunData)
      if (!weRunData) {
        console.error('未获取到微信运动数据')
        return
      }

      const localData = syncManager.getLocalData()
      console.log('当前本地数据：', localData)
      const db = wx.cloud.database()
      const serverDate = db.serverDate()
      console.log('当前服务器时间：', serverDate)

      if (!localData.isInitStepInfo) {
        console.log('首次初始化步数信息')
        // 首次初始化
        const todaySteps = this.getTodaySteps(weRunData)
        console.log('今日步数：', todaySteps)
        await syncManager.updateLastStepInfo(serverDate, todaySteps)
        await syncManager.updateStepInfoInitStatus(true)
        console.log('步数信息初始化完成')
      } else {
        console.log('开始计算需要增加的步数')
        // 计算需要增加的步数
        let additionalSteps = 0
        const lastUpdateDate = new Date(localData.lastUpdateStepInfo.date)
        lastUpdateDate.setHours(0, 0, 0, 0)
        console.log('上次更新时间：', lastUpdateDate)

        weRunData.forEach(item => {
          const itemDate = new Date(item.timestamp * 1000)
          itemDate.setHours(0, 0, 0, 0)
          console.log('处理步数记录：', {
            date: itemDate,
            steps: item.step
          })

          if (itemDate < lastUpdateDate) {
            console.log('跳过早于上次更新的记录')
            return
          }

          if (itemDate.getTime() === lastUpdateDate.getTime()) {
            const diff = Math.max(0, item.step - localData.lastUpdateStepInfo.steps)
            console.log('同一天的步数差：', diff)
            additionalSteps += diff
          } else if (itemDate > lastUpdateDate) {
            console.log('新的一天步数：', item.step)
            additionalSteps += item.step
          }
        })

        console.log('计算得到的总增加步数：', additionalSteps)

        if (additionalSteps > 0) {
          // 计算可增加步数的上限
          const currentSteps = localData.totalSteps - localData.startSteps
          const targetDistance = await this.getTargetDistance()
          const maxAdditionalSteps = Math.max(0, targetDistance - currentSteps)
          console.log('步数上限计算：', {
            currentSteps,
            targetDistance,
            maxAdditionalSteps
          })

          // 更新总步数
          const stepsToAdd = Math.min(additionalSteps, maxAdditionalSteps)
          console.log('实际要增加的步数：', stepsToAdd)
          if (stepsToAdd > 0) {
            await syncManager.updateTotalSteps(localData.totalSteps + stepsToAdd)
          }

          // 更新最后步数信息
          const todaySteps = this.getTodaySteps(weRunData)
          console.log('更新今日步数：', todaySteps)
          await syncManager.updateLastStepInfo(serverDate, todaySteps)
        }
      }

      console.log('步数处理完成，准备跳转到主页')
      // 处理完成，进入主页
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } catch (err) {
      console.error('处理微信运动数据失败，详细错误：', err)
      wx.showToast({
        title: '数据加载失败，请重新登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }, 1500)
    }
  },

  // 获取微信运动数据
  async getWeRunData() {
    try {
      console.log('开始获取微信运动数据')
      const res = await wx.getWeRunData()
      console.log('获取到加密的运动数据：', res)
      const result = await wx.cloud.callFunction({
        name: 'getWeRunData',
        data: {
          weRunData: wx.cloud.CloudID(res.cloudID)
        }
      })
      console.log('云函数解密结果：', result)
      return result.result.event.weRunData.data.stepInfoList
    } catch (err) {
      console.error('获取微信运动数据失败，详细错误：', err)
      throw err
    }
  },

  // 获取今日步数
  getTodaySteps(weRunData) {
    console.log('原始微信运动数据：', weRunData)
    // 获取今天0点的时间戳
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    console.log('获取今日步数，当前时间：', today)

    const todayData = weRunData.find(item => {
      const itemDate = new Date(item.timestamp * 1000)
      itemDate.setHours(0, 0, 0, 0)
      const isSameDay = itemDate.getTime() === today.getTime()
      console.log('比较日期：', {
        itemDate,
        today,
        isSameDay
      })
      return isSameDay
    })
    console.log('找到的今日步数数据：', todayData)
    return todayData ? todayData.step : 0
  },

  // 获取目标距离
  async getTargetDistance() {
    const localData = syncManager.getLocalData()
    const currentCity = localData.currentCity
    const targetCity = localData.targetCity
    console.log('获取目标距离，城市信息：', { currentCity, targetCity })

    if (!currentCity || !targetCity) {
      console.error('当前城市或目标城市未设置')
      return 0
    }

    const cityInfo = citiesData[currentCity]
    if (!cityInfo || !cityInfo.neighbors || !cityInfo.neighbors[targetCity]) {
      console.error('找不到城市间距离信息：', {
        cityInfo,
        neighbors: cityInfo?.neighbors
      })
      return 0
    }

    const steps = cityInfo.neighbors[targetCity].steps
    console.log('获取到的目标步数：', steps)
    return steps
  }
}) 