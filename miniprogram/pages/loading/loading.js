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

  // 刷新数据
  async refreshData() {
    console.log('开始刷新数据')
    try {
      // 重新初始化数据管理器
      await syncManager.initialize()
      
      // 更新全局数据
      const app = getApp()
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
      }

      // 如果卡牌功能开启，重新加载卡牌数据
      if (functionManager.isEnabled('albumEntry')) {
        await albumManager.init()
        await albumManager.checkSeasonEnd()
      }

      // 如果徽章功能开启，重新加载徽章数据
      if (functionManager.isEnabled('userBadge')) {
        await syncManager.initBadges()
      }

      // 如果每日任务功能开启，重新初始化任务
      if (functionManager.isEnabled('dailyTasks')) {
        await dailyTaskManager.initialize()
      }

      // 获取并处理微信运动数据
      await syncManager.handleWeRunData()

      // 更新最后刷新时间
      syncManager.updateLastRefreshTime()

      console.log('数据刷新完成')
    } catch (error) {
      console.error('数据刷新失败：', error)
      wx.showToast({
        title: '数据刷新失败',
        icon: 'none'
      })
    }
  },

  // 初始化数据管理器
  async initSyncManager() {
    try {
      console.log('开始初始化数据管理器...')
      
      // 获取用户 openid
      console.log('正在获取用户openid...')
      const { result } = await wx.cloud.callFunction({
        name: 'getOpenId'
      })
      
      if (!result || !result.openid) {
        console.error('获取 openid 失败')
        wx.showToast({
          title: '初始化失败，请重试',
          icon: 'none'
        })
        return false
      }

      // 保存 openid 到全局数据
      getApp().globalData.openid = result.openid
      console.log('获取 openid 成功:', result.openid)

      // 检查登录状态
      console.log('当前登录状态:', {
        globalData: getApp().globalData,
        isLoggedIn: getApp().globalData.isLoggedIn
      })

      // 初始化数据管理器
      console.log('正在初始化数据管理器...')
      await syncManager.initialize()
      
      // 检查初始化后的状态
      console.log('数据管理器初始化完成:', {
        isLoggedIn: syncManager.isLoggedIn,
        globalData: getApp().globalData,
        localData: syncManager.getLocalData()
      })

      // 获取本地数据
      const localData = syncManager.getLocalData()
      console.log('本地数据:', localData)

      // 根据用户状态决定跳转
      if (!localData.userAvatar) {
        console.log('新用户，跳转到引导页')
        wx.redirectTo({
          url: '/pages/guide/guide'
        })
      } else if (!localData.currentCity || !localData.targetCity) {
        console.log('已选择头像但未选择城市，跳转到城市选择页')
        wx.redirectTo({
          url: '/pages/city/city'
        })
      } else {
        console.log('已初始化完成，跳转到主页')
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }

      return true
    } catch (err) {
      console.error('初始化数据管理器失败：', err)
      wx.showToast({
        title: '初始化失败，请重试',
        icon: 'none'
      })
      return false
    }
  },

  onLoad: async function() {
    const app = getApp()
    try {
      console.log('开始加载流程')

      // 检查登录状态
      console.log('当前登录状态:', {
        globalData: app.globalData,
        isLoggedIn: app.globalData.isLoggedIn
      })

      // 如果已登录，获取用户openid
      if (app.globalData.isLoggedIn) {
        console.log('用户已登录，正在获取用户openid...')
        const { result } = await wx.cloud.callFunction({
          name: 'login'
        })
        app.globalData.openid = result.openid
        console.log('获取openid成功:', result.openid)
      } else {
        console.log('用户未登录，跳过云函数调用')
      }

      // 初始化数据管理器
      console.log('正在初始化数据管理器...')
      await syncManager.initialize()
      console.log('数据管理器初始化完成:', {
        isLoggedIn: syncManager.isLoggedIn,
        globalData: app.globalData
      })

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