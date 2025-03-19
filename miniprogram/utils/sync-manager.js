const { citiesData } = require('../data/cities')

// 本地存档数据结构
const defaultLocalData = {
  userAvatar: null,
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
  lastRefreshTime: 0,
  registerDate: null, // 添加注册日期字段
  
  // 卡牌收集数据
  albumData: {
    currentSeasonId: '', // 当前赛季ID
    collectedCards: [], // 已收集的卡牌id列表
    completedSets: [], // 已完成的套牌id列表，移除null默认值
    collectionLevel: 1, // 当前收集等级
    stars: 0 // 当前星星数量
  },

  // 每日任务数据
  dailyTaskData: {
    lastCompletedDate: null, // 最后完成任务的日期
    completedTasks: [], // 已完成的任务ID列表
  },

  // 当前佩戴的勋章
  currentBadge: null // { id: number, level: number }
}

// 云存储文件路径配置
const CLOUD_PATH = {
  ALBUMS: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/albums.json',
  SETS: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/sets.json',
  CARDS: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/cards.json',
  UNCOLLECTED_CARD: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/uncollect_card.png',
  ALBUM_ICON: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/album.png',
  BADGES: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/badges/config/badge.json'
}

class SyncManager {
  constructor() {
    this.db = null
    this.localData = { 
      ...defaultLocalData,
      badges: null // 初始化徽章列表为 null
    }
    this.isInitialized = false
    this.REFRESH_COOLDOWN = 10 * 60 * 1000
    this.isLoggedIn = false // 添加登录状态标记
  }

  // 初始化数据库连接
  initDatabase() {
    if (!this.db) {
      // 确保云环境已初始化
      const app = getApp()
      if (!wx.cloud) {
        console.error('请使用最新版本微信')
        return false
      }
      
      if (!wx.cloud.Cloud.prototype.isInit) {
        wx.cloud.init({
          env: app.globalData.envId,
          traceUser: true
        })
      }
      
      this.db = wx.cloud.database()
      return true
    }
    return true
  }

  // 检查是否已登录
  checkIsLoggedIn() {
    const app = getApp()
    return app && app.globalData && app.globalData.openid && app.globalData.isLoggedIn
  }

  // 从本地存储加载数据
  loadFromStorage() {
    try {
      const storedData = wx.getStorageSync('localUserData')
      if (storedData) {
        this.localData = JSON.parse(storedData)
      }
    } catch (err) {
      console.error('从本地存储加载数据失败：', err)
    }
  }

  // 保存数据到本地存储
  saveToStorage() {
    try {
      wx.setStorageSync('localUserData', JSON.stringify(this.localData))
    } catch (err) {
      console.error('保存数据到本地存储失败：', err)
    }
  }

  // 初始化数据管理器
  async initialize() {
    if (this.isInitialized) return
    
    try {
      // 首先从本地存储加载数据
      this.loadFromStorage()

      // 检查登录状态
      const app = getApp()
      // 确保 globalData 已初始化
      if (!app.globalData) {
        console.error('初始化数据管理器 - globalData 未初始化')
        return
      }
      
      // 等待一下确保 globalData.isLoggedIn 已设置
      await new Promise(resolve => setTimeout(resolve, 100))
      
      this.isLoggedIn = app.globalData.isLoggedIn
      console.log('初始化数据管理器 - 登录状态:', {
        isLoggedIn: this.isLoggedIn,
        globalData: app.globalData
      })
      
      if (this.isLoggedIn) {
        // 初始化数据库连接
        if (!this.initDatabase()) {
          console.error('初始化数据管理器 - 数据库初始化失败')
          return
        }

        // 获取用户数据
        const result = await this.db.collection('users').where({
          _openid: app.globalData.openid
        }).get()

        if (result.data.length > 0) {
          // 如果找到多条记录，删除多余的记录
          if (result.data.length > 1) {
            console.warn('发现多条用户记录，正在清理...')
            const keepId = result.data[0]._id
            for (let i = 1; i < result.data.length; i++) {
              await this.db.collection('users').doc(result.data[i]._id).remove()
            }
          }

          const userData = result.data[0]
          const cloudData = this.convertToLocalDataFormat(userData)
          
          // 比较本地和云端数据的 startSteps
          if (cloudData.startSteps > this.localData.startSteps) {
            this.localData = cloudData
          }
          
          // 同步到云端
          await this.syncToCloud()
        } else {
          // 如果没有找到用户数据，但有本地数据，创建新用户
          if (this.localData.userAvatar) {
            await this.createNewUser()
          }
        }
      } else {
        // 未登录用户只使用本地数据，不进行云端操作
        console.log('初始化数据管理器 - 用户未登录，仅使用本地数据')
        // 确保本地数据已保存
        this.saveToStorage()
      }

      this.isInitialized = true
    } catch (err) {
      console.error('初始化数据管理器失败：', err)
      throw err
    }
  }

  // 转换云端数据为本地数据格式
  convertToLocalDataFormat(userData) {
    return {
      userAvatar: userData.userAvatar || null,
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
      registerDate: userData.registerDate || null,
      albumData: {
        currentSeasonId: userData.albumData?.currentSeasonId || '',
        collectedCards: userData.albumData?.collectedCards || [],
        completedSets: userData.albumData?.completedSets || [],
        collectionLevel: userData.albumData?.collectionLevel || 1,
        stars: userData.albumData?.stars || 0
      },
      dailyTaskData: {
        lastCompletedDate: userData.dailyTaskData?.lastCompletedDate || null,
        completedTasks: userData.dailyTaskData?.completedTasks || []
      },
      badges: userData.badges || [],
      currentBadge: userData.currentBadge || null
    }
  }

  // 创建新用户数据
  async createNewUser() {
    // 双重检查登录状态
    if (!this.isLoggedIn || !getApp().globalData.isLoggedIn) {
      console.log('创建新用户 - 用户未登录，跳过云端创建')
      return false
    }

    try {
      // 确保数据库已初始化
      if (!this.initDatabase()) {
        console.error('创建新用户 - 数据库初始化失败')
        return false
      }

      // 创建新用户数据
      const result = await this.db.collection('users').add({
        data: this.convertToCloudDataFormat()
      })

      console.log('创建新用户成功：', result)
      return true
    } catch (err) {
      console.error('创建新用户失败：', err)
      return false
    }
  }

  // 同步数据到云端
  async syncToCloud() {
    try {
      // 双重检查登录状态
      if (!this.isLoggedIn || !getApp().globalData.isLoggedIn) {
        console.log('同步到云端 - 用户未登录，跳过同步')
        return false
      }

      // 确保数据库已初始化
      if (!this.initDatabase()) {
        console.error('同步到云端 - 数据库初始化失败')
        return false
      }

      // 获取当前用户数据
      const result = await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).get()

      if (result.data.length > 0) {
        // 更新现有用户数据
        await this.db.collection('users').doc(result.data[0]._id).update({
          data: this.convertToCloudDataFormat()
        })
      } else {
        // 创建新用户数据
        await this.createNewUser()
      }

      return true
    } catch (err) {
      console.error('同步到云端失败：', err)
      return false
    }
  }

  // 更新本地数据
  async updateLocalData(updates) {
    // 先更新本地数据
    Object.assign(this.localData, updates)
    this.saveToStorage()

    // 如果已登录，尝试同步到云端
    if (this.isLoggedIn) {
      // 确保数据库已初始化
      if (!this.initDatabase()) {
        console.error('数据库初始化失败')
        return
      }
      await this.syncToCloud()
    }
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
        hasData: !!userData
      })

      if (userData) {
        this.localData = {
          userAvatar: userData.userAvatar || null,
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
          registerDate: userData.registerDate || null,
          albumData: {
            currentSeasonId: userData.albumData?.currentSeasonId || '',
            collectedCards: userData.albumData?.collectedCards || [],
            completedSets: userData.albumData?.completedSets || [],
            collectionLevel: userData.albumData?.collectionLevel || 1,
            stars: userData.albumData?.stars || 0
          },
          dailyTaskData: {
            lastCompletedDate: userData.dailyTaskData?.lastCompletedDate || null,
            completedTasks: userData.dailyTaskData?.completedTasks || []
          },
          badges: userData.badges || [], // 同步徽章数据
          currentBadge: userData.currentBadge || null // 同步当前佩戴的勋章
        }

        console.log('同步云端数据 - 更新本地数据完成')
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
      // 如果未登录，直接返回本地数据
      if (!this.isLoggedIn) {
        console.log('获取用户数据 - 用户未登录，返回本地数据')
        return this.localData
      }

      // 确保数据库已初始化
      if (!this.initDatabase()) {
        console.error('获取用户数据 - 数据库初始化失败')
        return this.localData
      }

      const result = await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).get()

      if (result.data.length > 0) {
        console.log('获取用户数据 - 成功')
        return result.data[0]
      }
      console.log('获取用户数据 - 未找到用户数据，返回本地数据')
      return this.localData
    } catch (err) {
      console.error('获取用户数据失败：', err)
      return this.localData
    }
  }

  // 更新当前城市
  async updateCurrentCity(cityName) {
    try {
      // 更新本地数据
      this.localData.currentCity = cityName
      this.saveToStorage()

      // 如果已登录，则同步到云端
      if (this.isLoggedIn) {
        // 确保数据库已初始化
        if (!this.initDatabase()) {
          console.error('更新当前城市 - 数据库初始化失败')
          return false
        }

        await this.db.collection('users').where({
          _openid: getApp().globalData.openid
        }).update({
          data: {
            currentCity: cityName,
            updateTime: this.db.serverDate()
          }
        })
      }

      return true
    } catch (err) {
      console.error('更新当前城市失败：', err)
      throw err
    }
  }

  // 更新目标城市
  async updateTargetCity(cityName, startSteps, startDate) {
    try {
      // 先更新本地数据
      this.localData.targetCity = cityName
      this.localData.startSteps = startSteps
      this.localData.startDate = startDate ? new Date(startDate) : new Date()
      this.saveToStorage()

      // 如果已登录，则同步到云端
      if (this.isLoggedIn) {
        // 确保数据库已初始化
        if (!this.initDatabase()) {
          console.error('更新目标城市 - 数据库初始化失败')
          return false
        }

        const serverDate = this.db.serverDate()
        await this.db.collection('users').where({
          _openid: getApp().globalData.openid
        }).update({
          data: {
            targetCity: cityName,
            startSteps,
            startDate: startDate || serverDate,
            updateTime: serverDate
          }
        })
      }

      return true
    } catch (err) {
      console.error('更新目标城市失败：', err)
      throw err
    }
  }

  // 添加已访问城市
  async addVisitedCity(cityName) {
    try {
      // 先更新本地数据
      if (!this.localData.visitedCities) {
        this.localData.visitedCities = []
      }
      
      if (!this.localData.visitedCities.includes(cityName)) {
        this.localData.visitedCities.push(cityName)
        this.saveToStorage()
      }

      // 如果已登录，则同步到云端
      if (this.isLoggedIn) {
        // 确保数据库已初始化
        if (!this.initDatabase()) {
          console.error('添加已访问城市 - 数据库初始化失败')
          return false
        }

        await this.db.collection('users').where({
          _openid: getApp().globalData.openid
        }).update({
          data: {
            visitedCities: this.db.command.addToSet(cityName),
            updateTime: this.db.serverDate()
          }
        })
      }

      return true
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
      const weRunData = await wx.getWeRunData()
      console.log('获取微信运动数据成功:', weRunData)

      // 更新本地数据
      this.localData.lastWeRunData = weRunData
      this.localData.lastWeRunTime = new Date().getTime()

      // 如果已登录，同步到云端
      if (this.isLoggedIn) {
        await this.syncToCloud()
      }

      return weRunData
    } catch (err) {
      console.error('获取微信运动数据失败：', err)
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

  async updateUserData(userData) {
    try {
      const { userAvatar } = userData
      
      // 更新本地数据
      this.localData.userAvatar = userAvatar
      
      // 如果已登录，则同步到云端
      if (this.isLoggedIn) {
        // 确保数据库已初始化
        if (!this.initDatabase()) {
          console.error('数据库初始化失败')
          return false
        }

        const openid = getApp().globalData.openid
        const collection = this.db.collection('users')
        
        await collection.where({
          _openid: openid
        }).update({
          data: {
            userAvatar,
            updateTime: this.db.serverDate()
          }
        })
      }
      
      // 无论是否登录，都保存到本地存储
      this.saveToStorage()
      return true
    } catch (error) {
      console.error('更新用户信息失败：', error)
      throw error
    }
  }

  // 初始化赛季数据
  async initSeasonData(seasonId, shouldSave = false) {
    if (this.localData.albumData.currentSeasonId !== seasonId) {
      // 如果是新赛季，重置收集数据
      this.localData.albumData = {
        currentSeasonId: seasonId,
        collectedCards: [],
        completedSets: [],
        collectionLevel: 1,
        stars: 0
      }
      
      // 只有在需要保存时才执行保存操作
      if (shouldSave) {
        await this.saveLocalData()
        await this.syncToCloud()
      }
    }
  }

  // 添加收集到的卡牌
  async addCollectedCard(seasonId, cardId, setId, currentDrawnCards = []) {
    // 确保是当前赛季，并且需要保存数据
    if (seasonId !== this.localData.albumData.currentSeasonId) {
      await this.initSeasonData(seasonId, true)
    }
    
    // 检查是否是重复卡牌
    const isDuplicate = this.localData.albumData.collectedCards.includes(cardId) || 
                       currentDrawnCards.includes(cardId)
    
    if (isDuplicate) {
      // 如果是重复卡牌，转化为星星
      await this.addStars(1)
      return { isNewCard: false, isDuplicate: true }
    }
    
    // 如果不是重复卡牌，添加到收集列表
    this.localData.albumData.collectedCards.push(cardId)
    
    // 检查套牌是否集齐
    const allSetCards = await this.getAllSetCards(setId)
    const collectedSetCards = this.localData.albumData.collectedCards.filter(id => id.startsWith(setId))
    
    if (allSetCards.length === collectedSetCards.length && !this.localData.albumData.completedSets.includes(setId)) {
      // 套牌集齐，添加到完成列表
      this.localData.albumData.completedSets.push(setId)
    }
    
    await this.saveLocalData()
    await this.syncToCloud()
    
    return { isNewCard: true, isDuplicate: false }
  }

  // 从临时文件路径读取JSON
  async readJSONFile(tempFilePath) {
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath: tempFilePath,
        encoding: 'utf-8',
        success: res => {
          try {
            const data = JSON.parse(res.data)
            resolve(data)
          } catch (e) {
            reject(e)
          }
        },
        fail: reject
      })
    })
  }

  // 获取套牌的所有卡牌
  async getAllSetCards(setId) {
    try {
      const { tempFilePath } = await wx.cloud.downloadFile({
        fileID: CLOUD_PATH.CARDS
      })
      const cardsData = await this.readJSONFile(tempFilePath)
      const setCards = cardsData.find(cards => cards.id === setId)
      return setCards ? setCards.cards.map(card => card.card_id) : []
    } catch (error) {
      console.error('获取套牌卡牌失败：', error)
      return []
    }
  }

  // 检查是否需要升级收集等级
  async checkCollectionLevelUp() {
    try {
      // 获取当前赛季的所有套牌
      const { tempFilePath } = await wx.cloud.downloadFile({
        fileID: CLOUD_PATH.SETS
      })
      const setsData = await this.readJSONFile(tempFilePath)
      const seasonSets = setsData.find(sets => sets.id === this.localData.albumData.currentSeasonId)
      
      // 过滤掉null值并比较长度
      const validCompletedSets = this.localData.albumData.completedSets.filter(Boolean)
      
      if (seasonSets && validCompletedSets.length === seasonSets.sets.length) {
        // 所有套牌都已集齐，可以升级
        if (this.localData.albumData.collectionLevel < 3) { // 最高3级
          console.log('开始升级收集等级...')
          console.log('升级前状态:', {
            level: this.localData.albumData.collectionLevel,
            collectedCards: this.localData.albumData.collectedCards.length,
            completedSets: validCompletedSets.length
          })

          // 1. 提升收集等级
          this.localData.albumData.collectionLevel++

          // 2. 清除所有已收集的卡牌
          this.localData.albumData.collectedCards = []

          // 3. 清除所有已完成的套牌
          this.localData.albumData.completedSets = []

          console.log('升级后状态:', {
            level: this.localData.albumData.collectionLevel,
            collectedCards: this.localData.albumData.collectedCards.length,
            completedSets: this.localData.albumData.completedSets.length
          })
          
          // 保存更新后的数据
          await this.saveLocalData()
          await this.syncFromCloud()
          
          return true
        }
      }
      return false
    } catch (error) {
      console.error('检查收集等级升级失败：', error)
      return false
    }
  }

  // 获取收集等级
  getCollectionLevel(seasonId = null) {
    // 如果没有指定赛季ID，或者是当前赛季，返回当前收集等级
    if (!seasonId || seasonId === this.localData.albumData.currentSeasonId) {
      return this.localData.albumData.collectionLevel
    }
    // 如果不是当前赛季，返回默认等级1
    return 1
  }

  // 获取卡牌收集状态
  getCollectedCards() {
    return this.localData.albumData.collectedCards
  }

  // 获取已完成套牌
  getCompletedSets() {
    return this.localData.albumData.completedSets
  }

  // 获取当前赛季ID
  getCurrentSeasonId() {
    return this.localData.albumData.currentSeasonId
  }

  // 保存本地数据到云端
  async saveLocalData() {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          albumData: this.localData.albumData,
          dailyTaskData: this.localData.dailyTaskData,
          badges: this.localData.badges,
          currentBadge: this.localData.currentBadge, // 添加当前佩戴的勋章
          updateTime: this.db.serverDate()
        }
      })
      return true
    } catch (error) {
      console.error('保存本地数据失败：', error)
      throw error
    }
  }

  // 增加收集等级
  async increaseCollectionLevel() {
    try {
      // 更新本地数据
      this.localData.albumData.collectionLevel += 1

      // 更新云端数据
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          'albumData.collectionLevel': this.localData.albumData.collectionLevel,
          updateTime: this.db.serverDate()
        }
      })

      return true
    } catch (error) {
      console.error('增加收集等级失败：', error)
      return false
    }
  }

  // 清空已收集的卡牌
  async clearCollectedCards() {
    try {
      // 更新本地数据
      this.localData.albumData.collectedCards = []

      // 更新云端数据
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          'albumData.collectedCards': [],
          updateTime: this.db.serverDate()
        }
      })

      return true
    } catch (error) {
      console.error('清空已收集卡牌失败：', error)
      return false
    }
  }

  // 添加星星
  async addStars(count) {
    try {
      if (!this.localData.albumData.stars) {
        this.localData.albumData.stars = 0
      }
      this.localData.albumData.stars += count

      // 更新云端数据
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          'albumData.stars': this.localData.albumData.stars,
          updateTime: this.db.serverDate()
        }
      })

      return this.localData.albumData.stars
    } catch (error) {
      console.error('添加星星失败：', error)
      return false
    }
  }

  // 获取当前星星数量
  getStars() {
    return this.localData.albumData.stars || 0
  }

  // 重置赛季数据
  async resetSeasonData() {
    try {
      console.log('开始重置赛季数据...')
      console.log('重置前状态:', {
        collectedCards: this.localData.albumData.collectedCards.length,
        completedSets: this.localData.albumData.completedSets.length,
        collectionLevel: this.localData.albumData.collectionLevel
      })

      // 重置所有相关数据
      this.localData.albumData.collectedCards = []
      this.localData.albumData.completedSets = []
      this.localData.albumData.collectionLevel = 1
      this.localData.albumData.currentSeasonId = ''

      console.log('重置后状态:', {
        collectedCards: this.localData.albumData.collectedCards.length,
        completedSets: this.localData.albumData.completedSets.length,
        collectionLevel: this.localData.albumData.collectionLevel
      })

      // 保存到云端
      await this.saveLocalData()
      await this.syncFromCloud()

      return true
    } catch (error) {
      console.error('重置赛季数据失败：', error)
      return false
    }
  }

  // 徽章相关方法
  
  // 获取徽章配置
  async getBadgeConfig() {
    try {
      const { tempFilePath } = await wx.cloud.downloadFile({
        fileID: CLOUD_PATH.BADGES
      })
      return await this.readJSONFile(tempFilePath)
    } catch (error) {
      console.error('获取徽章配置失败：', error)
      return null
    }
  }

  // 初始化用户徽章数据
  async initBadges() {
    if (this.localData.badges === null) {
      this.localData.badges = []
      await this.saveLocalData()
      await this.syncToCloud()
    }
  }

  // 获取用户所有徽章
  getBadges() {
    return this.localData.badges || []
  }

  // 获取指定徽章信息
  getBadge(badgeId) {
    return this.localData.badges?.find(b => b.id === badgeId) || null
  }

  // 添加或更新徽章
  async addBadge(badgeId, level) {
    try {
      // 确保徽章列表已初始化
      if (!this.localData.badges) {
        await this.initBadges()
      }

      const existingBadge = this.localData.badges.find(b => b.id === badgeId)
      let isUpdated = false

      if (!existingBadge) {
        // 新徽章
        this.localData.badges.push({ id: badgeId, level })
        isUpdated = true
        console.log(`添加新徽章 - ID: ${badgeId}, 等级: ${level}`)
      } else if (level > existingBadge.level) {
        // 升级徽章
        existingBadge.level = level
        isUpdated = true
        console.log(`升级徽章 - ID: ${badgeId}, 新等级: ${level}`)
      }

      if (isUpdated) {
        // 更新当前佩戴的勋章
        this.localData.currentBadge = { id: badgeId, level }
        console.log('更新当前佩戴的勋章:', this.localData.currentBadge)
        
        await this.saveLocalData()
        await this.syncToCloud()
      }

      return isUpdated
    } catch (error) {
      console.error('添加/更新徽章失败：', error)
      throw error
    }
  }

  // 获取当前佩戴的勋章
  getCurrentBadge() {
    return this.localData.currentBadge
  }

  // 处理登录成功
  async handleLogin(openid) {
    this.isLoggedIn = true
    getApp().globalData.isLoggedIn = true
    await this.initialize() // 重新初始化以同步云端数据
  }

  // 处理登出
  async handleLogout() {
    this.isLoggedIn = false
    getApp().globalData.isLoggedIn = false
    // 保持本地数据不变，只更新登录状态
    this.saveToStorage()
  }
}

module.exports = new SyncManager() 