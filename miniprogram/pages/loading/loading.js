const syncManager = require('../../utils/sync-manager')
const albumManager = require('../../utils/album-manager')

Page({
  data: {
    loadingText: '正在加载数据...'
  },

  // 请求微信运动授权
  async requestWeRunAuth() {
    try {
      const result = await wx.authorize({
        scope: 'scope.werun'
      })
      console.log('微信运动授权成功')
      return true
    } catch (error) {
      console.log('微信运动授权失败，跳转到授权页面')
      return false
    }
  },

  onLoad: async function() {
    const app = getApp()
    try {
      console.log('开始加载流程')

      // 获取用户openid
      this.setData({ loadingText: '正在获取用户信息...' })
      console.log('正在获取用户openid...')
      const { result } = await wx.cloud.callFunction({
        name: 'login'
      })
      app.globalData.openid = result.openid
      console.log('获取openid成功:', result.openid)

      // 初始化数据管理器
      this.setData({ loadingText: '正在同步用户数据...' })
      console.log('正在初始化数据管理器...')
      await syncManager.initialize()
      console.log('数据管理器初始化完成')

      // 预加载卡牌配置数据
      this.setData({ loadingText: '正在加载卡册数据...' })
      console.log('正在初始化卡册管理器...')
      const initResult = await albumManager.init()
      console.log('卡册管理器初始化结果:', initResult)

      // 检查赛季是否结束
      console.log('检查赛季状态...')
      await albumManager.checkSeasonEnd()

      // 标记初始化完成
      app.globalData.isInitialized = true
      console.log('全局初始化标记设置完成')

      // 检查微信运动授权
      console.log('正在检查微信运动授权...')
      const hasWeRunAuth = await app.checkWeRunAuth()
      console.log('微信运动授权状态:', hasWeRunAuth)
      
      if (!hasWeRunAuth) {
        // 如果未授权，先尝试请求授权
        const authResult = await this.requestWeRunAuth()
        if (!authResult) {
          // 如果授权失败，跳转到授权页面
          wx.redirectTo({
            url: '/pages/werun-auth/werun-auth'
          })
          return
        }
      }

      // 获取并处理微信运动数据
      this.setData({ loadingText: '正在同步运动数据...' })
      console.log('正在处理微信运动数据...')
      await syncManager.handleWeRunData()
      console.log('微信运动数据处理完成')

      // 更新最后刷新时间
      syncManager.updateLastRefreshTime()
      console.log('更新最后刷新时间完成')

      // 跳转到首页
      console.log('准备跳转到首页')
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } catch (error) {
      console.error('初始化失败，详细错误：', error)
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none',
        duration: 2000
      })
    }
  }
}) 