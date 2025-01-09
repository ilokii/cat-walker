const { citiesData } = require('../data/cities')

class SyncManager {
  constructor() {
    this.db = wx.cloud.database()
    this.localData = {
      currentCity: null,
      targetCity: null,
      startSteps: 0,
      visitedCities: [],
      totalSteps: 0,
      isInitStepInfo: false,
      lastUpdateStepInfo: {
        date: new Date(1900, 0, 1, 0, 0, 0),
        steps: 0
      }
    }
    this.isInitialized = false
  }

  // 初始化数据管理器
  async initialize() {
    if (this.isInitialized) return
    
    try {
      const userData = await this.getUserData()
      if (userData) {
        this.localData = {
          currentCity: userData.currentCity || null,
          targetCity: userData.targetCity || null,
          startSteps: userData.startSteps || 0,
          visitedCities: userData.visitedCities || [],
          totalSteps: userData.totalSteps || 0,
          isInitStepInfo: userData.isInitStepInfo || false,
          lastUpdateStepInfo: {
            date: userData.lastUpdateStepInfo?.date || new Date(1900, 0, 1, 0, 0, 0),
            steps: userData.lastUpdateStepInfo?.steps || 0
          }
        }
      } else {
        // 如果云端没有数据，创建新用户数据
        await this.createNewUser()
      }
      this.isInitialized = true
    } catch (err) {
      console.error('初始化数据管理器失败：', err)
      throw err
    }
  }

  // 创建新用户数据
  async createNewUser() {
    try {
      // 先检查是否已存在该用户的数据
      const existingUser = await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).get()

      if (existingUser.data.length > 0) {
        // 如果已存在用户数据，则使用已有数据
        this.localData = {
          currentCity: existingUser.data[0].currentCity || null,
          targetCity: existingUser.data[0].targetCity || null,
          startSteps: existingUser.data[0].startSteps || 0,
          visitedCities: existingUser.data[0].visitedCities || [],
          totalSteps: existingUser.data[0].totalSteps || 0,
          isInitStepInfo: existingUser.data[0].isInitStepInfo || false,
          lastUpdateStepInfo: {
            date: existingUser.data[0].lastUpdateStepInfo?.date || new Date(1900, 0, 1, 0, 0, 0),
            steps: existingUser.data[0].lastUpdateStepInfo?.steps || 0
          }
        }
        return
      }

      // 如果不存在，则创建新用户数据
      await this.db.collection('users').add({
        data: {
          ...this.localData,
          createTime: this.db.serverDate(),
          updateTime: this.db.serverDate()
        }
      })
    } catch (err) {
      console.error('创建新用户数据失败：', err)
      throw err
    }
  }

  // 获取本地数据
  getLocalData() {
    if (!this.isInitialized) {
      console.warn('数据管理器尚未初始化')
    }
    return { ...this.localData }
  }

  // 从云端获取最新数据并更新本地
  async syncFromCloud() {
    try {
      const userData = await this.getUserData()
      if (userData) {
        this.localData = {
          currentCity: userData.currentCity || null,
          targetCity: userData.targetCity || null,
          startSteps: userData.startSteps || 0,
          visitedCities: userData.visitedCities || [],
          totalSteps: userData.totalSteps || 0,
          isInitStepInfo: userData.isInitStepInfo || false,
          lastUpdateStepInfo: {
            date: userData.lastUpdateStepInfo?.date || new Date(1900, 0, 1, 0, 0, 0),
            steps: userData.lastUpdateStepInfo?.steps || 0
          }
        }
      }
      return this.localData
    } catch (err) {
      console.error('同步云端数据失败：', err)
      throw err
    }
  }

  // 获取用户数据
  async getUserData() {
    try {
      const result = await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).get()

      if (result.data.length > 0) {
        return result.data[0]
      }
      return null
    } catch (err) {
      console.error('获取用户数据失败：', err)
      throw err
    }
  }

  // 更新当前城市
  async updateCurrentCity(cityName) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          currentCity: cityName,
          updateTime: this.db.serverDate()
        }
      })
      this.localData.currentCity = cityName
    } catch (err) {
      console.error('更新当前城市失败：', err)
      throw err
    }
  }

  // 更新目标城市
  async updateTargetCity(cityName, startSteps) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          targetCity: cityName,
          startSteps,
          updateTime: this.db.serverDate()
        }
      })
      this.localData.targetCity = cityName
      this.localData.startSteps = startSteps
    } catch (err) {
      console.error('更新目标城市失败：', err)
      throw err
    }
  }

  // 添加已访问城市
  async addVisitedCity(cityName) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          visitedCities: this.db.command.addToSet(cityName),
          updateTime: this.db.serverDate()
        }
      })
      if (!this.localData.visitedCities.includes(cityName)) {
        this.localData.visitedCities.push(cityName)
      }
    } catch (err) {
      console.error('添加已访问城市失败：', err)
      throw err
    }
  }

  // 更新总步数
  async updateTotalSteps(steps) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          totalSteps: steps,
          updateTime: this.db.serverDate()
        }
      })
      this.localData.totalSteps = steps
    } catch (err) {
      console.error('更新总步数失败：', err)
      throw err
    }
  }

  // 更新步数初始化状态
  async updateStepInfoInitStatus(isInit) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          isInitStepInfo: isInit,
          updateTime: this.db.serverDate()
        }
      })
      this.localData.isInitStepInfo = isInit
    } catch (err) {
      console.error('更新步数初始化状态失败：', err)
      throw err
    }
  }

  // 更新最后步数信息
  async updateLastStepInfo(date, steps) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          lastUpdateStepInfo: {
            date: date,
            steps: steps
          },
          updateTime: this.db.serverDate()
        }
      })
      this.localData.lastUpdateStepInfo = {
        date: new Date(date),
        steps: steps
      }
    } catch (err) {
      console.error('更新最后步数信息失败：', err)
      throw err
    }
  }

  // 处理微信运动数据
  async handleWeRunData() {
    try {
      // 获取微信运动数据
      const weRunData = await this.getWeRunData()
      if (!weRunData) {
        console.error('未获取到微信运动数据')
        return false
      }

      const serverDate = this.db.serverDate()

      if (!this.localData.isInitStepInfo) {
        console.log('首次初始化步数信息')
        // 首次初始化
        const todaySteps = this.getTodaySteps(weRunData)
        console.log('今日步数：', todaySteps)
        await this.updateLastStepInfo(serverDate, todaySteps)
        await this.updateStepInfoInitStatus(true)
      } else {
        // 计算需要增加的步数
        let additionalSteps = 0
        const lastUpdateDate = new Date(this.localData.lastUpdateStepInfo.date)
        lastUpdateDate.setHours(0, 0, 0, 0)

        weRunData.forEach(item => {
          const itemDate = new Date(item.timestamp * 1000)
          itemDate.setHours(0, 0, 0, 0)

          if (itemDate < lastUpdateDate) return

          if (itemDate.getTime() === lastUpdateDate.getTime()) {
            const diff = Math.max(0, item.step - this.localData.lastUpdateStepInfo.steps)
            additionalSteps += diff
          } else if (itemDate > lastUpdateDate) {
            additionalSteps += item.step
          }
        })

        if (additionalSteps > 0) {
          console.log('新增步数：', additionalSteps)
          // 计算可增加步数的上限
          const currentSteps = this.localData.totalSteps - this.localData.startSteps
          const targetDistance = this.getTargetDistance()
          const maxAdditionalSteps = Math.max(0, targetDistance - currentSteps)

          // 更新总步数
          const stepsToAdd = Math.min(additionalSteps, maxAdditionalSteps)
          if (stepsToAdd > 0) {
            await this.updateTotalSteps(this.localData.totalSteps + stepsToAdd)
          }

          // 更新最后步数信息
          const todaySteps = this.getTodaySteps(weRunData)
          await this.updateLastStepInfo(serverDate, todaySteps)
        }
      }

      return true
    } catch (err) {
      console.error('处理微信运动数据失败：', err)
      throw err
    }
  }

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
  }

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
  }

  // 获取目标距离
  getTargetDistance() {
    const currentCity = this.localData.currentCity
    const targetCity = this.localData.targetCity

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
  }
}

module.exports = new SyncManager() 