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
      totalStepsTemp: 0,
      isInitStepInfo: false,
      lastUpdateStepInfo: {
        date: new Date(1900, 0, 1, 0, 0, 0),
        steps: 0
      },
      startDate: new Date(1900, 0, 1, 0, 0, 0),
      lastRefreshTime: 0, // 添加最后刷新时间
      achievement_daily_login: 0 // 添加每日登录成就
    }
    this.isInitialized = false
    this.REFRESH_COOLDOWN = 10 * 60 * 1000 // 10分钟的冷却时间（毫秒）
  }

  // 检查是否在冷却中
  isRefreshCooldown() {
    const now = Date.now()
    return (now - this.localData.lastRefreshTime) < this.REFRESH_COOLDOWN
  }

  // 更新最后刷新时间
  updateLastRefreshTime() {
    this.localData.lastRefreshTime = Date.now()
  }

  // 获取剩余冷却时间（秒）
  getRefreshCooldownRemaining() {
    const now = Date.now()
    const elapsed = now - this.localData.lastRefreshTime
    const remaining = Math.max(0, this.REFRESH_COOLDOWN - elapsed)
    return Math.ceil(remaining / 1000)
  }

  // 初始化数据管理器
  async initialize() {
    if (this.isInitialized) return
    
    try {
      // 获取用户数据，如果有多条记录，只使用第一条
      const result = await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).get()

      console.log('初始化数据管理器 - 获取用户数据:', {
        hasData: result.data.length > 0,
        achievement_daily_login: result.data[0]?.achievement_daily_login
      })

      if (result.data.length > 0) {
        // 如果找到多条记录，删除多余的记录
        if (result.data.length > 1) {
          console.warn('发现多条用户记录，正在清理...')
          const keepId = result.data[0]._id
          for (let i = 1; i < result.data.length; i++) {
            await this.db.collection('users').doc(result.data[i]._id).remove()
          }
        }

        // 使用第一条记录的数据
        const userData = result.data[0]
        this.localData = {
          currentCity: userData.currentCity || null,
          targetCity: userData.targetCity || null,
          startSteps: userData.startSteps || 0,
          visitedCities: userData.visitedCities || [],
          totalSteps: userData.totalSteps || 0,
          totalStepsTemp: userData.totalSteps || 0,
          isInitStepInfo: userData.isInitStepInfo || false,
          lastUpdateStepInfo: {
            date: userData.lastUpdateStepInfo?.date || new Date(1900, 0, 1, 0, 0, 0),
            steps: userData.lastUpdateStepInfo?.steps || 0
          },
          startDate: userData.startDate || new Date(1900, 0, 1, 0, 0, 0),
          lastRefreshTime: 0,
          achievement_daily_login: userData.achievement_daily_login || 0
        }

        console.log('初始化数据管理器 - 设置本地数据:', {
          achievement_daily_login: this.localData.achievement_daily_login
        })
      } else {
        // 如果没有找到用户数据，创建新用户
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
      // 再次检查是否已存在用户数据（双重检查）
      const existingUser = await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).get()

      if (existingUser.data.length > 0) {
        // 如果已存在用户数据，使用已有数据
        const userData = existingUser.data[0]
        this.localData = {
          currentCity: userData.currentCity || null,
          targetCity: userData.targetCity || null,
          startSteps: userData.startSteps || 0,
          visitedCities: userData.visitedCities || [],
          totalSteps: userData.totalSteps || 0,
          totalStepsTemp: userData.totalSteps || 0,
          isInitStepInfo: userData.isInitStepInfo || false,
          lastUpdateStepInfo: {
            date: userData.lastUpdateStepInfo?.date || new Date(1900, 0, 1, 0, 0, 0),
            steps: userData.lastUpdateStepInfo?.steps || 0
          },
          startDate: userData.startDate || new Date(1900, 0, 1, 0, 0, 0),
          lastRefreshTime: 0,
          achievement_daily_login: userData.achievement_daily_login || 0
        }
        return
      }

      // 如果确实不存在，则创建新用户数据
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
      console.log('同步云端数据 - 获取用户数据:', {
        hasData: !!userData,
        achievement_daily_login: userData?.achievement_daily_login
      })

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
          },
          startDate: userData.startDate || new Date(1900, 0, 1, 0, 0, 0),
          lastRefreshTime: this.localData.lastRefreshTime,
          achievement_daily_login: userData.achievement_daily_login || 0
        }

        console.log('同步云端数据 - 更新本地数据:', {
          achievement_daily_login: this.localData.achievement_daily_login
        })
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
  async updateTargetCity(cityName, startSteps, startDate) {
    try {
      const serverDate = this.db.serverDate()
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          targetCity: cityName,
          startSteps,
          startDate: startDate || serverDate,
          updateTime: this.db.serverDate()
        }
      })
      this.localData.targetCity = cityName
      this.localData.startSteps = startSteps
      this.localData.startDate = startDate ? new Date(startDate) : new Date(serverDate)
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
      // 先更新临时步数
      this.localData.totalStepsTemp = this.localData.totalSteps
      
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

  // 获取临时步数
  getTotalStepsTemp() {
    return this.localData.totalStepsTemp
  }

  // 设置临时步数
  setTotalStepsTemp(steps) {
    this.localData.totalStepsTemp = steps
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
      console.log('更新最后步数信息 - 开始:', {
        date: date,
        steps: steps
      })

      // 确保日期是有效的Date对象
      let validDate
      if (date instanceof Date) {
        validDate = date
      } else if (typeof date === 'string') {
        validDate = new Date(date)
      } else {
        validDate = new Date()
      }

      // 检查日期是否有效
      if (isNaN(validDate.getTime())) {
        console.warn('无效的日期，使用当前时间')
        validDate = new Date()
      }

      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          lastUpdateStepInfo: {
            date: validDate,
            steps: steps
          },
          updateTime: this.db.serverDate()
        }
      })

      this.localData.lastUpdateStepInfo = {
        date: validDate,
        steps: steps
      }

      console.log('更新最后步数信息 - 完成:', {
        date: validDate,
        steps: steps
      })
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

  // 获取服务器时间
  getServerDate() {
    // 由于db.serverDate()只能在云端运行，这里使用本地时间
    return new Date()
  }

  // 更新每日登录成就
  async updateDailyLoginAchievement(count) {
    try {
      console.log('更新每日登录成就 - 开始:', {
        currentCount: this.localData.achievement_daily_login,
        newCount: count
      })

      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          achievement_daily_login: count,
          updateTime: this.db.serverDate()
        }
      })
      this.localData.achievement_daily_login = count

      console.log('更新每日登录成就 - 完成')
    } catch (err) {
      console.error('更新每日登录成就失败：', err)
      throw err
    }
  }
}

module.exports = new SyncManager() 