const syncManager = require('./utils/sync-manager')
const albumManager = require('./utils/album-manager')
const functionManager = require('./utils/function-manager')

App({
  globalData: {
    openid: null,
    envId: 'cat-walker-1gnvj0y102f12cab', // 云环境ID
    isInitialized: false,
    packsConfig: null,  // 存储卡包配置
    isPacksConfigLoaded: false,  // 标记卡包配置加载状态
    userAvatar: null,
    currentBadge: null,
    isCheckingLogin: false, // 添加登录检查状态标记
    canShowGuide: true, // 默认显示引导页
    isLoggedIn: false // 添加登录状态标记
  },

  onLaunch: async function(options) {
    try {
      // 初始化功能管理器
      functionManager.init()
      
      // 初始化云开发环境
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        return
      }

      wx.cloud.init({
        env: this.globalData.envId,
        traceUser: true
      })

      // 等待一小段时间确保云环境初始化完成
      await new Promise(resolve => setTimeout(resolve, 100))

      // 检查登录状态并初始化数据
      await this.checkLoginStatus()
    } catch (error) {
      console.error('应用初始化失败:', error)
    }
  },

  // 检查登录状态并初始化数据
  async checkLoginStatus() {
    // 先检查登录状态
    const loginInfo = wx.getStorageSync('loginInfo')
    this.globalData.isLoggedIn = !!loginInfo
    console.log('当前登录状态:', {
      globalData: this.globalData,
      isLoggedIn: this.globalData.isLoggedIn
    })
    
    // 等待一下确保 globalData 已更新
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // 初始化数据管理器
    const syncManager = require('./utils/sync-manager')
    await syncManager.initialize()
  },

  // 检查用户是否授权微信运动
  checkWeRunAuth: function() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.werun']) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  // 获取微信运动步数
  getWeRunData: function() {
    return new Promise((resolve, reject) => {
      wx.getWeRunData({
        success: (res) => {
          const encryptedData = res.encryptedData
          const iv = res.iv
          // 暂时直接返回加密数据
          resolve({
            encryptedData,
            iv,
            cloudID: res.cloudID
          })
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  // 检查用户是否已登录
  checkLogin() {
    return this.globalData.isLoggedIn
  },

  // 获取用户信息
  getUserInfo() {
    return this.globalData.userInfo
  },

  // 更新用户信息
  async updateUserInfo() {
    if (!this.globalData.openid) return null

    try {
      const db = wx.cloud.database()
      const result = await db.collection('users').where({
        _openid: this.globalData.openid
      }).get()

      if (result.data.length > 0) {
        this.globalData.userInfo = result.data[0]
        this.globalData.hasUserInfo = true
        return result.data[0]
      }
      return null
    } catch (err) {
      console.error('更新用户信息失败：', err)
      return null
    }
  }
}) 