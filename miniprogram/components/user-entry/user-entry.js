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
      const localData = syncManager.getLocalData()
      
      // 获取用户头像
      const userAvatar = localData.userAvatar

      // 获取当前佩戴的勋章
      const currentBadge = localData.currentBadge
      let badgeIcon = '/images/nobadge.png'

      if (currentBadge) {
        // 获取徽章配置
        const badgeConfig = await syncManager.getBadgeConfig()
        if (badgeConfig && badgeConfig.data) {
          const badge = badgeConfig.data.find(b => b.id === currentBadge.id)
          if (badge) {
            const badgeLevelInfo = badge.levels.find(l => l.level === currentBadge.level)
            if (badgeLevelInfo) {
              badgeIcon = badgeLevelInfo.icon
            }
          }
        }
      }

      this.setData({
        userAvatar,
        currentBadge,
        badgeIcon
      })
    },

    // 打开账户界面
    onDetailTap() {
      this.setData({
        showUserModal: true
      })
    },

    // 关闭账户界面
    onModalClose(e) {
      this.setData({
        showUserModal: false
      })
      // 如果需要刷新，则更新用户信息
      if (e.detail.needRefresh) {
        this.updateUserInfo()
      }
    }
  }
}) 