const syncManager = require('../../utils/sync-manager')

Component({
  properties: {
  },

  data: {
    userAvatar: '',
    currentBadge: null,
    badgeIcon: '',
    showUserModal: false
  },

  lifetimes: {
    attached() {
      this.updateUserInfo()
    }
  },

  methods: {
    updateUserInfo() {
      const app = getApp()
      if (!app.globalData.isInitialized) {
        console.log('全局数据未初始化完成')
        return
      }

      // 直接使用全局数据
      this.setData({
        userAvatar: app.globalData.userAvatar || '/images/default-avatar.png',
        currentBadge: app.globalData.currentBadge || null,
        badgeIcon: app.globalData.currentBadge?.icon || '/images/nobadge.png'
      })
    },

    onTap() {
      const app = getApp()
      if (!app.globalData.isInitialized) {
        wx.showToast({
          title: '数据加载中...',
          icon: 'loading',
          duration: 2000
        })
        return
      }
      
      this.setData({
        showUserModal: true
      })
    },

    // 打开卡牌界面
    onAlbumTap() {
      wx.navigateTo({
        url: '/pages/album/album'
      })
    },

    // 关闭账户界面
    onModalClose(e) {
      console.log('收到关闭事件:', e)
      this.setData({
        showUserModal: false
      })
      // 如果需要刷新，则更新用户信息
      if (e.detail.needRefresh) {
        console.log('检测到需要刷新用户信息')
        this.updateUserInfo()
      }
    }
  }
}) 