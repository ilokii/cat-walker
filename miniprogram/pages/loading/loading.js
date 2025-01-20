const syncManager = require('../../utils/sync-manager')

Page({
  data: {},

  onLoad() {
    this.checkWeRunAuth()
  },

  // 检查微信运动权限
  async checkWeRunAuth() {
    try {
      // 先检查是否已经授权
      const setting = await wx.getSetting()
      if (setting.authSetting['scope.werun']) {
        // 已授权，处理步数数据
        await this.handleWeRunData()
      } else {
        // 未授权，主动请求授权
        wx.authorize({
          scope: 'scope.werun',
          success: async () => {
            // 用户同意授权，处理步数数据
            await this.handleWeRunData()
          },
          fail: () => {
            // 用户拒绝授权，跳转到授权页面
            wx.redirectTo({
              url: '/pages/werun-auth/werun-auth'
            })
          }
        })
      }
    } catch (err) {
      console.error('检查微信运动权限失败：', err)
      wx.showToast({
        title: '数据加载失败，请重新登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }, 1500)
    }
  },

  // 处理微信运动数据
  async handleWeRunData() {
    try {
      // 先检查每日登录
      await this.checkDailyLogin()

      const success = await syncManager.handleWeRunData()
      if (success) {
        // 更新最后刷新时间
        syncManager.updateLastRefreshTime()
        
        // 处理完成，进入主页
        wx.reLaunch({
          url: '/pages/index/index'
        })
      } else {
        wx.showToast({
          title: '数据加载失败，请重新登录',
          icon: 'none'
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }, 1500)
      }
    } catch (err) {
      console.error('处理微信运动数据失败：', err)
      wx.showToast({
        title: '数据加载失败，请重新登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }, 1500)
    }
  },

  // 检查每日登录
  async checkDailyLogin() {
    try {
      const localData = syncManager.getLocalData()
      console.log('每日打卡检查 - 原始数据:', {
        lastUpdateStepInfo: localData.lastUpdateStepInfo,
        achievement_daily_login: localData.achievement_daily_login
      })

      // 确保日期有效
      let lastUpdateDate
      try {
        lastUpdateDate = new Date(localData.lastUpdateStepInfo.date)
        // 检查日期是否有效
        if (isNaN(lastUpdateDate.getTime())) {
          console.log('上次更新日期无效，使用默认日期')
          lastUpdateDate = new Date(1900, 0, 1, 0, 0, 0)
        }
      } catch (err) {
        console.log('解析上次更新日期失败，使用默认日期')
        lastUpdateDate = new Date(1900, 0, 1, 0, 0, 0)
      }

      const currentDate = syncManager.getServerDate()
      
      console.log('每日打卡检查 - 处理后数据:', {
        lastLoginCount: localData.achievement_daily_login,
        lastUpdateDate: lastUpdateDate.toISOString(),
        currentDate: currentDate.toISOString()
      })
      
      // 检查是否是新的一天（忽略小时、分钟和秒）
      const lastUpdateDay = Math.floor(lastUpdateDate.getTime() / (24 * 60 * 60 * 1000))
      const currentDay = Math.floor(currentDate.getTime() / (24 * 60 * 60 * 1000))
      
      console.log('每日打卡检查 - 天数比较:', {
        lastUpdateDay,
        currentDay,
        needUpdate: currentDay > lastUpdateDay
      })
      
      if (currentDay > lastUpdateDay) {
        // 是新的一天，增加登录次数
        const newCount = (localData.achievement_daily_login || 0) + 1
        console.log('每日打卡 - 更新计数:', {
          oldCount: localData.achievement_daily_login,
          newCount
        })
        await syncManager.updateDailyLoginAchievement(newCount)
      }
    } catch (err) {
      console.error('检查每日登录失败：', err)
    }
  }
}) 