const syncManager = require('../../utils/sync-manager')
const albumManager = require('../../utils/album-manager')
const dailyTaskManager = require('../../utils/daily-task-manager')
const packManager = require('../../utils/pack-manager')
const functionManager = require('../../utils/function-manager')

Page({
  data: {
    loadingText: '数据加载中...'
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
      console.log('正在获取用户openid...')
      const { result } = await wx.cloud.callFunction({
        name: 'login'
      })
      app.globalData.openid = result.openid
      console.log('获取openid成功:', result.openid)

      // 初始化数据管理器
      console.log('正在初始化数据管理器...')
      await syncManager.initialize()
      console.log('数据管理器初始化完成')

      // 预加载用户信息
      console.log('正在加载用户信息...')
      const localData = syncManager.getLocalData()
      if (localData) {
        app.globalData.userInfo = {
          avatar: localData.userAvatar,
          currentBadge: localData.currentBadge,
          badges: localData.badges || []
        }
        app.globalData.userAvatar = localData.userAvatar
        app.globalData.currentBadge = localData.currentBadge
        app.globalData.badges = localData.badges || []
        console.log('用户信息加载完成:', app.globalData.userInfo)
      }

      // 根据开关状态决定是否加载卡牌相关数据
      if (functionManager.isEnabled('albumEntry')) {
        // 预加载卡包配置
        console.log('正在加载卡包配置...')
        try {
          const result = await wx.cloud.downloadFile({
            fileID: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/pack.json'
          })
          console.log('卡包配置下载成功')

          const fs = wx.getFileSystemManager()
          const content = fs.readFileSync(result.tempFilePath, 'utf8')
          const config = JSON.parse(content)
          console.log('卡包配置解析成功:', config)

          app.globalData.packsConfig = config
          app.globalData.isPacksConfigLoaded = true
          console.log('卡包配置加载完成')

          // 初始化卡包管理器
          packManager.packsData = config
          console.log('卡包管理器初始化完成')

          // 预加载卡牌配置数据
          console.log('正在初始化卡册管理器...')
          const initResult = await albumManager.init()
          console.log('卡册管理器初始化结果:', initResult)

          // 检查赛季是否结束
          console.log('检查赛季状态...')
          await albumManager.checkSeasonEnd()
        } catch (error) {
          console.error('加载卡牌相关数据失败：', error)
        }
      } else {
        console.log('卡牌功能已禁用，跳过相关数据加载')
      }

      // 根据开关状态决定是否加载徽章系统
      if (functionManager.isEnabled('userBadge')) {
        console.log('正在初始化徽章系统...')
        const badgeConfig = await syncManager.getBadgeConfig()
        if (badgeConfig) {
          console.log('徽章配置加载成功:', badgeConfig)
          await syncManager.initBadges()
          console.log('徽章系统初始化完成')
        } else {
          console.warn('徽章配置加载失败')
        }
      } else {
        console.log('徽章功能已禁用，跳过相关数据加载')
      }

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
      console.log('正在处理微信运动数据...')
      await syncManager.handleWeRunData()
      console.log('微信运动数据处理完成')

      // 根据开关状态决定是否初始化每日任务
      if (functionManager.isEnabled('dailyTasks')) {
        console.log('正在初始化每日任务...')
        await dailyTaskManager.initialize()
        console.log('每日任务初始化完成')
      } else {
        console.log('每日任务功能已禁用，跳过相关数据加载')
      }

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