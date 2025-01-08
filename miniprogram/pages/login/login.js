const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    isLoading: false
  },

  async onLogin() {
    this.setData({ isLoading: true })
    try {
      // 获取用户openid
      const { result } = await wx.cloud.callFunction({
        name: 'login'
      })
      
      if (!result || !result.openid) {
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
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      })
    } finally {
      this.setData({ isLoading: false })
    }
  }
}) 