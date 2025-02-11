const syncManager = require('../../utils/sync-manager')

Component({
  properties: {
  },

  data: {
    userAvatar: null,
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
    async updateUserInfo() {
      console.log('开始更新用户信息...')
      const localData = syncManager.getLocalData()
      console.log('获取到本地数据:', {
        currentBadge: localData.currentBadge,
        badges: localData.badges
      })
      
      // 获取用户头像
      const userAvatar = localData.userAvatar

      // 获取当前佩戴的勋章
      const currentBadge = localData.currentBadge
      let badgeIcon = '/images/nobadge.png'

      if (currentBadge) {
        try {
          // 获取徽章配置
          const badgeConfig = await syncManager.getBadgeConfig()
          if (badgeConfig && badgeConfig.data) {
            const badge = badgeConfig.data.find(b => b.id === currentBadge.id)
            if (badge) {
              const badgeLevelInfo = badge.levels.find(l => l.level === currentBadge.level)
              if (badgeLevelInfo) {
                badgeIcon = badgeLevelInfo.icon
                console.log('获取到最新徽章图标:', badgeIcon)
              }
            }
          }
        } catch (error) {
          console.error('获取徽章配置失败:', error)
        }
      }

      console.log('准备更新界面显示:', {
        userAvatar,
        currentBadge,
        badgeIcon
      })

      this.setData({
        userAvatar,
        currentBadge,
        badgeIcon
      })

      console.log('用户信息更新完成')
    },

    // 打开账户界面
    onDetailTap() {
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