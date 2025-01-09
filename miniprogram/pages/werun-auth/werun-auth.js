const syncManager = require('../../utils/sync-manager')
const { citiesData } = require('../../data/cities.js')

Page({
  data: {},

  onShow: function() {
    // 检查是否已获得授权
    this.checkWeRunAuth()
  },

  // 检查微信运动权限
  async checkWeRunAuth() {
    try {
      const res = await wx.getSetting()
      if (res.authSetting['scope.werun']) {
        // 已授权，处理步数数据
        await this.handleWeRunData()
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
      // 获取微信运动数据
      const weRunData = await this.getWeRunData()
      if (!weRunData) return

      const localData = syncManager.getLocalData()
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (!localData.isInitStepInfo) {
        // 首次初始化
        const todaySteps = this.getTodaySteps(weRunData)
        await syncManager.updateLastStepInfo(today, todaySteps)
        await syncManager.updateStepInfoInitStatus(true)
      } else {
        // 计算需要增加的步数
        let additionalSteps = 0
        const lastUpdateDate = new Date(localData.lastUpdateStepInfo.date)
        lastUpdateDate.setHours(0, 0, 0, 0)

        weRunData.forEach(item => {
          const itemDate = new Date(item.timestamp * 1000)
          itemDate.setHours(0, 0, 0, 0)

          if (itemDate < lastUpdateDate) return

          if (itemDate.getTime() === lastUpdateDate.getTime()) {
            additionalSteps += Math.max(0, item.step - localData.lastUpdateStepInfo.steps)
          } else if (itemDate > lastUpdateDate) {
            additionalSteps += item.step
          }
        })

        if (additionalSteps > 0) {
          // 计算可增加步数的上限
          const currentSteps = localData.totalSteps - localData.startSteps
          const targetDistance = await this.getTargetDistance()
          const maxAdditionalSteps = Math.max(0, targetDistance - currentSteps)

          // 更新总步数
          const stepsToAdd = Math.min(additionalSteps, maxAdditionalSteps)
          if (stepsToAdd > 0) {
            await syncManager.updateTotalSteps(localData.totalSteps + stepsToAdd)
          }

          // 更新最后步数信息
          const todaySteps = this.getTodaySteps(weRunData)
          await syncManager.updateLastStepInfo(today, todaySteps)
        }
      }

      // 处理完成，进入主页
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } catch (err) {
      console.error('处理微信运动数据失败：', err)
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
      const res = await wx.getWeRunData()
      const result = await wx.cloud.callFunction({
        name: 'getWeRunData',
        data: {
          weRunData: wx.cloud.CloudID(res.cloudID)
        }
      })
      return result.result.event.weRunData.data.stepInfoList
    } catch (err) {
      console.error('获取微信运动数据失败：', err)
      throw err
    }
  },

  // 获取今日步数
  getTodaySteps(weRunData) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayData = weRunData.find(item => {
      const itemDate = new Date(item.timestamp * 1000)
      itemDate.setHours(0, 0, 0, 0)
      return itemDate.getTime() === today.getTime()
    })
    return todayData ? todayData.step : 0
  },

  // 获取目标距离
  async getTargetDistance() {
    const localData = syncManager.getLocalData()
    const currentCity = localData.currentCity
    const targetCity = localData.targetCity

    if (!currentCity || !targetCity) {
      console.error('当前城市或目标城市未设置')
      return 0
    }

    const cityInfo = citiesData[currentCity]
    if (!cityInfo || !cityInfo.neighbors || !cityInfo.neighbors[targetCity]) {
      console.error('找不到城市间距离信息')
      return 0
    }

    return cityInfo.neighbors[targetCity].steps
  },

  // 处理授权按钮点击
  handleAuthClick() {
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.werun']) {
          this.handleWeRunData()
        }
      }
    })
  }
}) 