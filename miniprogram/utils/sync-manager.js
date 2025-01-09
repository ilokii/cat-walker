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
}

module.exports = new SyncManager() 