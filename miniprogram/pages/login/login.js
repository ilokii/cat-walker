const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    isLoading: false
  },

  async onLogin() {
    // 显示登录提示
    wx.showLoading({
      title: '登录中......',
      mask: true
    })

    try {
      // 获取用户openid
      const { result } = await wx.cloud.callFunction({
        name: 'login'
      })
      
      if (!result || !result.openid) {
        wx.hideLoading()
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        })
        return
      }

      getApp().globalData.openid = result.openid

      // 初始化数据管理器
      await syncManager.initialize()
      const userData = syncManager.getLocalData()
      
      // 隐藏登录提示
      wx.hideLoading()
      
      // 根据用户数据状态决定跳转目标
      if (userData.currentCity && userData.targetCity) {
        // 如果当前城市和目标城市都存在，前往loading界面
        wx.redirectTo({
          url: '/pages/loading/loading'
        })
      } else {
        // 如果有任一城市为null，前往城市选择界面
        wx.redirectTo({
          url: '/pages/city/city'
        })
      }

    } catch (err) {
      console.error('登录失败：', err)
      wx.hideLoading()
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none'
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
      } else {
        // 跳转到城市选择页面
        wx.redirectTo({
          url: '/pages/city/city'
        })
      }
    } catch (err) {
      console.error('检查用户数据失败：', err)
      wx.showToast({
        title: '数据加载失败，请重试',
        icon: 'none'
      })
    }
  }
}) 