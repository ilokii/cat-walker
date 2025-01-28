const syncManager = require('../../utils/sync-manager')
const albumManager = require('../../utils/album-manager')

Page({
  data: {
    loadingText: '正在加载数据...'
  },

  onLoad: async function() {
    const app = getApp()
    try {
      // 获取用户openid
      this.setData({ loadingText: '正在获取用户信息...' })
      const { result } = await wx.cloud.callFunction({
        name: 'login'
      })
      app.globalData.openid = result.openid

      // 初始化数据管理器
      this.setData({ loadingText: '正在同步用户数据...' })
      await syncManager.initialize()

      // 预加载卡牌配置数据
      this.setData({ loadingText: '正在加载卡册数据...' })
      await albumManager.init()

      // 标记初始化完成
      app.globalData.isInitialized = true

      // 检查微信运动授权
      const hasWeRunAuth = await app.checkWeRunAuth()
      if (!hasWeRunAuth) {
        wx.redirectTo({
          url: '/pages/auth/auth'
        })
        return
      }

      // 获取并处理微信运动数据
      this.setData({ loadingText: '正在同步运动数据...' })
      await syncManager.handleWeRunData()

      // 更新最后刷新时间
      syncManager.updateLastRefreshTime()

      // 跳转到首页
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } catch (error) {
      console.error('初始化失败：', error)
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none',
        duration: 2000
      })
    }
  }
}) 