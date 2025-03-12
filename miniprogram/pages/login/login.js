const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    isLoading: false
  },

  onLoad() {
    // 初始化云环境
    const app = getApp()
    if (!wx.cloud) {
      wx.showToast({
        title: '请使用最新版本微信',
        icon: 'none'
      })
      return
    }
    
    // 确保云环境已初始化
    if (!wx.cloud.Cloud.prototype.isInit) {
      wx.cloud.init({
        env: app.globalData.envId,
        traceUser: true
      })
    }
  },

  // 打开隐私政策
  openPrivacyContract() {
    if (typeof wx.openPrivacyContract === 'function') {
      wx.openPrivacyContract({
        fail: (err) => {
          console.error('打开隐私协议失败:', err)
          wx.showToast({
            title: '打开隐私协议失败',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请升级微信版本',
        icon: 'none'
      })
    }
  },

  async onLogin() {
    if (this.data.isLoading) return
    this.setData({ isLoading: true })
    
    try {
      // 请求隐私授权
      if (typeof wx.requirePrivacyAuthorize === 'function') {
        await new Promise((resolve, reject) => {
          wx.requirePrivacyAuthorize({
            success: resolve,
            fail: (err) => {
              // 如果是用户拒绝隐私授权
              if (err.errMsg.includes('privacy permission is not authorized')) {
                wx.showToast({
                  title: '请先同意隐私政策',
                  icon: 'none'
                })
              }
              reject(err)
            }
          })
        })
      }

      // 显示登录提示
      wx.showLoading({
        title: '登录中',
        mask: true
      })

      // 获取用户openid
      const { result } = await wx.cloud.callFunction({
        name: 'login'
      })

      if (!result || !result.openid) {
        throw new Error('登录失败')
      }

      const app = getApp()
      app.globalData.openid = result.openid
      
      // 存储登录状态
      wx.setStorageSync('openid', result.openid)
      
      // 初始化数据管理器
      await syncManager.initialize()
      
      const userData = syncManager.getLocalData()
      
      // 隐藏登录提示
      wx.hideLoading()
      this.setData({ isLoading: false })
      
      // 根据用户数据状态决定跳转目标
      if (!userData.userAvatar) {
        // 如果没有头像，前往用户信息初始化界面
        wx.redirectTo({
          url: '/pages/user-init/user-init'
        })
      } else if (!userData.currentCity || !userData.targetCity) {
        // 如果有头像但没有城市信息，前往城市选择界面
        wx.redirectTo({
          url: '/pages/city/city'
        })
      } else {
        // 如果所有信息都存在，前往loading界面
        wx.redirectTo({
          url: '/pages/loading/loading'
        })
      }
    } catch (error) {
      console.error('登录失败:', error)
      wx.hideLoading()
      this.setData({ isLoading: false })
      
      // 如果是隐私授权失败，不显示重试弹窗
      if (error.errMsg && error.errMsg.includes('privacy permission is not authorized')) {
        return
      }
      
      wx.showModal({
        title: '登录失败',
        content: '登录过程中遇到问题，是否重试？',
        confirmText: '重试',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 用户点击重试
            this.onLogin()
          }
        }
      })
    }
  },

  // 检查用户数据
  async checkUserData() {
    try {
      const userData = await syncManager.getUserData()
      if (userData && userData.currentCity && userData.targetCity) {
        // 检查微信运动授权
        const setting = await wx.getSetting()
        if (setting.authSetting['scope.werun']) {
          // 已授权，跳转到loading页面
          wx.redirectTo({
            url: '/pages/loading/loading'
          })
        } else {
          // 未授权，跳转到授权页面
          wx.redirectTo({
            url: '/pages/werun-auth/werun-auth'
          })
        }
      } else if (userData && userData.userAvatar) {
        // 跳转到城市选择页面
        wx.redirectTo({
          url: '/pages/city/city'
        })
      }
      // 如果没有用户头像，保持在登录页面
    } catch (err) {
      console.error('检查用户数据失败：', err)
      wx.showToast({
        title: '数据加载失败，请重试',
        icon: 'none'
      })
    }
  }
}) 