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
      console.log('===== 每日打卡检查开始 =====')
      console.log('本地数据:', {
        lastUpdateStepInfo: localData.lastUpdateStepInfo,
        achievement_daily_login: localData.achievement_daily_login,
        isInitStepInfo: localData.isInitStepInfo
      })

      // 确保日期有效
      let lastUpdateDate
      try {
        lastUpdateDate = new Date(localData.lastUpdateStepInfo.date)
        console.log('解析上次更新日期:', {
          originalDate: localData.lastUpdateStepInfo.date,
          parsedDate: lastUpdateDate,
          isValid: !isNaN(lastUpdateDate.getTime())
        })

        // 检查日期是否有效
        if (isNaN(lastUpdateDate.getTime())) {
          console.warn('上次更新日期无效，使用默认日期')
          lastUpdateDate = new Date(1900, 0, 1, 0, 0, 0)
        }
      } catch (err) {
        console.error('解析上次更新日期失败:', err)
        lastUpdateDate = new Date(1900, 0, 1, 0, 0, 0)
      }

      const currentDate = new Date()
      
      // 记录原始时间
      console.log('时间比较 - 原始值:', {
        lastUpdateDate: lastUpdateDate.toISOString(),
        currentDate: currentDate.toISOString(),
        lastUpdateLocalDate: lastUpdateDate.toLocaleDateString(),
        currentLocalDate: currentDate.toLocaleDateString()
      })
      
      // 获取本地日期字符串进行比较（考虑时区）
      const lastUpdateLocalDate = lastUpdateDate.toLocaleDateString()
      const currentLocalDate = currentDate.toLocaleDateString()
      
      console.log('时间比较 - 本地日期:', {
        lastUpdateLocalDate,
        currentLocalDate,
        isDifferentDay: lastUpdateLocalDate !== currentLocalDate
      })
      
      // 比较本地日期字符串是否不同
      if (lastUpdateLocalDate !== currentLocalDate) {
        // 是新的一天，增加登录次数
        const newCount = (localData.achievement_daily_login || 0) + 1
        console.log('每日打卡 - 更新计数:', {
          oldCount: localData.achievement_daily_login,
          newCount,
          lastUpdateDate: lastUpdateLocalDate,
          currentDate: currentLocalDate
        })
        await syncManager.updateDailyLoginAchievement(newCount)
        console.log('每日打卡 - 更新完成')
      } else {
        console.log('每日打卡 - 今天已经打卡:', {
          lastUpdateDate: lastUpdateLocalDate,
          currentDate: currentLocalDate,
          currentCount: localData.achievement_daily_login
        })
      }
      
      console.log('===== 每日打卡检查结束 =====')
    } catch (err) {
      console.error('检查每日登录失败:', err)
    }
  }
}) 