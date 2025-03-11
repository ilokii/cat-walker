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
    canShowGuide: false // 控制是否显示引导页
  },

  onLaunch: async function(options) {
    try {
      // 检查本地存储中的登录状态
      const openid = wx.getStorageSync('openid')
      if (!openid) {
        // 如果没有登录，允许显示引导页
        this.globalData.canShowGuide = true
        return
      }

      // 初始化功能管理器
      functionManager.init()
      
      // 初始化云开发环境
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        this.globalData.canShowGuide = true
        return
      }

      wx.cloud.init({
        env: this.globalData.envId,
        traceUser: true
      })

      // 等待一小段时间确保云环境初始化完成
      await new Promise(resolve => setTimeout(resolve, 100))

      // 检查登录状态
      await this.checkLoginStatus()
    } catch (error) {
      console.error('应用初始化失败:', error)
      this.globalData.canShowGuide = true
    }
  },

  // 检查登录状态
  async checkLoginStatus() {
    if (this.globalData.isCheckingLogin) return
    this.globalData.isCheckingLogin = true

    try {
      const openid = wx.getStorageSync('openid')
      if (!openid) {
        this.globalData.isCheckingLogin = false
        this.globalData.canShowGuide = true
        return
      }

      // 设置全局 openid
      this.globalData.openid = openid

      // 初始化数据管理器
      await syncManager.initialize()

      // 获取用户数据
      const userData = await syncManager.getUserData()
      
      if (!userData) {
        // 如果没有用户数据，清除登录状态
        wx.removeStorageSync('openid')
        this.globalData.openid = null
        this.globalData.canShowGuide = true
        return
      }

      // 根据用户数据状态决定跳转
      if (userData.currentCity && userData.targetCity) {
        // 检查微信运动授权
        const setting = await wx.getSetting()
        if (setting.authSetting['scope.werun']) {
          // 已登录且已授权，重定向到loading页面
          wx.reLaunch({
            url: '/pages/loading/loading'
          })
        } else {
          // 未授权微信运动
          wx.reLaunch({
            url: '/pages/werun-auth/werun-auth'
          })
        }
      } else if (userData.userAvatar) {
        // 需要选择城市
        wx.reLaunch({
          url: '/pages/city/city'
        })
      } else {
        // 需要设置用户信息
        wx.reLaunch({
          url: '/pages/user-init/user-init'
        })
      }
    } catch (err) {
      console.error('检查登录状态失败：', err)
      // 出错时清除登录状态
      wx.removeStorageSync('openid')
      this.globalData.openid = null
      this.globalData.canShowGuide = true
    } finally {
      this.globalData.isCheckingLogin = false
    }
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
    return this.globalData.isLogin
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