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
      
      // 跳转到loading页面
      wx.redirectTo({
        url: '/pages/loading/loading'
      })

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