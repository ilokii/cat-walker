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
  }
}) 