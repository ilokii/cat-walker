const syncManager = require('../../utils/sync-manager')
const { citiesData } = require('../../data/cities')
const functionManager = require('../../utils/function-manager')

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  data: {
    userAvatar: null,
    registerDate: '',
    joinDays: 0,
    totalSteps: 0,
    totalKm: '0.00',
    visitedCities: 0,
    visitedCitiesPercentage: '0.00',
    visitedProvinces: 0,
    visitedProvincesPercentage: '0.00',
    badges: [],
    selectedBadgeId: null,
    currentBadge: {
      icon: ''
    },
    showBadgeSection: true,
    isLoggedIn: false
  },

  lifetimes: {
    attached() {
      this.checkLoginStatus()
      this.loadUserData()
      this.setData({
        showBadgeSection: functionManager.isEnabled('userBadge')
      })
    }
  },

  observers: {
    'show': function(show) {
      if (show) {
        this.loadUserData()
      }
    },
    'selectedBadgeId': function(badgeId) {
      if (badgeId) {
        const selectedBadge = this.data.badges.find(b => b.id === badgeId)
        if (selectedBadge) {
          this.setData({
            'currentBadge.icon': selectedBadge.icon
          })
        }
      }
    }
  },

  methods: {
    checkLoginStatus() {
      const app = getApp()
      const isLoggedIn = app.globalData.openid !== null
      this.setData({ isLoggedIn })
    },

    async loadUserData() {
      const localData = syncManager.getLocalData()
      if (!localData) return

      const userAvatar = localData.userAvatar

      let registerDateStr = '暂无数据'
      if (localData.registerDate) {
        const date = new Date(localData.registerDate)
        registerDateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      }

      const startDate = new Date(localData.startDate)
      const now = new Date()
      const joinDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24))

      const totalSteps = localData.totalSteps
      const totalKm = (totalSteps * 0.00075).toFixed(2)

      const visitedCities = localData.visitedCities.length
      const totalCities = Object.keys(citiesData).length
      const visitedCitiesPercentage = (visitedCities / totalCities * 100).toFixed(2)

      const provinces = new Set()
      const allProvinces = new Set()
      
      for (const cityName in citiesData) {
        const city = citiesData[cityName]
        allProvinces.add(city.province)
        
        if (localData.visitedCities.includes(cityName)) {
          provinces.add(city.province)
        }
      }
      
      const visitedProvinces = provinces.size
      const totalProvinces = allProvinces.size
      const visitedProvincesPercentage = (visitedProvinces / totalProvinces * 100).toFixed(2)

      const badges = []
      const badgeList = localData.badges || []
      const currentBadge = localData.currentBadge

      try {
        const badgeConfig = await syncManager.getBadgeConfig()
        if (badgeConfig && badgeConfig.data) {
          for (const userBadge of badgeList) {
            const badge = badgeConfig.data.find(b => b.id === userBadge.id)
            if (badge) {
              const badgeLevelInfo = badge.levels.find(l => l.level === userBadge.level)
              if (badgeLevelInfo) {
                badges.push({
                  id: userBadge.id,
                  level: userBadge.level,
                  icon: badgeLevelInfo.icon
                })
              }
            }
          }
        }
      } catch (error) {
        console.error('加载徽章配置失败：', error)
      }

      let selectedBadgeId = currentBadge?.id
      if (!selectedBadgeId && badges.length > 0) {
        selectedBadgeId = badges[0].id
      }

      const selectedBadge = badges.find(b => b.id === selectedBadgeId)
      const currentBadgeIcon = selectedBadge ? selectedBadge.icon : ''

      this.setData({
        userAvatar,
        registerDate: registerDateStr,
        joinDays,
        totalSteps,
        totalKm,
        visitedCities,
        visitedCitiesPercentage,
        visitedProvinces,
        visitedProvincesPercentage,
        badges,
        selectedBadgeId,
        'currentBadge.icon': currentBadgeIcon
      })
    },

    onBadgeSelect(e) {
      const badgeId = e.currentTarget.dataset.badgeId
      this.setData({
        selectedBadgeId: badgeId
      })
    },

    onGetBadges() {
      wx.navigateTo({
        url: '/pages/album/album'
      })
      this.triggerEvent('close', { detail: { needRefresh: false } })
    },

    async onClose() {
      const localData = syncManager.getLocalData()
      const currentBadge = localData.currentBadge
      
      if (this.data.selectedBadgeId !== currentBadge?.id) {
        const selectedBadge = this.data.badges.find(b => b.id === this.data.selectedBadgeId)
        
        if (selectedBadge) {
          try {
            const db = wx.cloud.database()
            
            const userResult = await db.collection('users').where({
              _openid: getApp().globalData.openid
            }).get()
            
            if (userResult.data && userResult.data.length > 0) {
              const userData = userResult.data[0]
              
              const { _id, _openid, createTime, ...restData } = userData
              
              const result = await db.collection('users').doc(userData._id).set({
                data: {
                  ...restData,
                  currentBadge: {
                    id: selectedBadge.id,
                    level: selectedBadge.level
                  },
                  updateTime: db.serverDate()
                }
              })
              
              if (result.stats.updated > 0) {
                await syncManager.syncFromCloud()
                this.triggerEvent('close', { needRefresh: true })
                return
              }
            }
          } catch (error) {
            console.error('更新徽章失败：', error)
            wx.showToast({
              title: '更新徽章失败',
              icon: 'none'
            })
          }
        }
      }
      
      this.triggerEvent('close', { needRefresh: false })
    },

    onLogin() {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      this.triggerEvent('close', { needRefresh: false })
    },

    async handleLogout() {
      try {
        wx.showLoading({
          title: '正在退出...',
          mask: true
        })

        // 清除登录状态
        const app = getApp()
        app.globalData.openid = null
        wx.removeStorageSync('openid')

        // 重置 syncManager 的状态
        syncManager.localData = null
        syncManager.isInitialized = false

        wx.hideLoading()

        // 更新登录状态
        this.setData({ isLoggedIn: false })

        // 关闭模态框并通知父组件需要刷新
        this.triggerEvent('close', { needRefresh: true })

        // 重定向到引导页
        wx.reLaunch({
          url: '/pages/guide/guide'
        })
      } catch (error) {
        console.error('退出登录失败：', error)
        wx.hideLoading()
        wx.showToast({
          title: '退出失败，请重试',
          icon: 'none'
        })
      }
    }
  }
}) 