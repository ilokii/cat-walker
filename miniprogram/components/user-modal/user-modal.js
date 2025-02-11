const syncManager = require('../../utils/sync-manager')
const { citiesData } = require('../../data/cities')

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
    }
  },

  lifetimes: {
    attached() {
      this.updateUserInfo()
    }
  },

  observers: {
    'show': function(show) {
      if (show) {
        this.updateUserInfo()
      }
    },
    'selectedBadgeId': function(badgeId) {
      // 当选中的徽章ID变化时，更新显示的徽章
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
    async updateUserInfo() {
      const localData = syncManager.getLocalData()
      
      // 获取用户头像
      const userAvatar = localData.userAvatar

      // 格式化注册日期
      let registerDateStr = '暂无数据'
      if (localData.registerDate) {
        const date = new Date(localData.registerDate)
        registerDateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      }

      // 计算加入天数
      const startDate = new Date(localData.registerDate)
      const now = new Date()
      const joinDays = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24)) + 1

      // 计算步数和公里数
      const totalSteps = localData.totalSteps
      const totalKm = (totalSteps * 0.00075).toFixed(2)

      // 计算城市和省份统计
      const visitedCities = localData.visitedCities.length
      const totalCities = Object.keys(citiesData).length
      const visitedCitiesPercentage = (visitedCities / totalCities * 100).toFixed(2)

      // 获取已访问的省份
      const provinces = new Set()
      const allProvinces = new Set()
      
      // 遍历所有城市，统计总省份数
      for (const cityName in citiesData) {
        const city = citiesData[cityName]
        allProvinces.add(city.province)
        
        // 如果是已访问城市，添加到已访问省份集合
        if (localData.visitedCities.includes(cityName)) {
          provinces.add(city.province)
        }
      }
      
      const visitedProvinces = provinces.size
      const totalProvinces = allProvinces.size
      const visitedProvincesPercentage = (visitedProvinces / totalProvinces * 100).toFixed(2)

      // 获取徽章列表
      const badges = []
      const badgeList = localData.badges || []
      const currentBadge = localData.currentBadge

      // 获取徽章配置
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

      // 如果没有选中的徽章但有徽章列表，默认选中第一个
      let selectedBadgeId = currentBadge?.id
      if (!selectedBadgeId && badges.length > 0) {
        selectedBadgeId = badges[0].id
      }

      // 设置当前显示的徽章
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

    // 选择徽章
    onBadgeSelect(e) {
      const badgeId = e.currentTarget.dataset.badgeId
      this.setData({
        selectedBadgeId: badgeId
      })
    },

    // 前往获取徽章
    onGetBadges() {
      wx.navigateTo({
        url: '/pages/album/album'
      })
      this.triggerEvent('close', { detail: { needRefresh: false } })
    },

    // 关闭弹窗
    async onClose() {
      const localData = syncManager.getLocalData()
      const currentBadge = localData.currentBadge
      
      console.log('关闭弹窗 - 当前状态:', {
        selectedBadgeId: this.data.selectedBadgeId,
        currentBadge: currentBadge,
        localBadges: localData.badges
      })
      
      // 如果选中的徽章与当前徽章不同，则更新
      if (this.data.selectedBadgeId !== currentBadge?.id) {
        console.log('检测到徽章变更')
        const selectedBadge = this.data.badges.find(b => b.id === this.data.selectedBadgeId)
        
        console.log('选中的徽章:', selectedBadge)
        
        if (selectedBadge) {
          try {
            // 获取用户文档
            const db = wx.cloud.database()
            console.log('开始查询用户数据...')
            
            const userResult = await db.collection('users').where({
              _openid: getApp().globalData.openid
            }).get()
            
            if (userResult.data && userResult.data.length > 0) {
              const userData = userResult.data[0]
              console.log('获取到用户数据:', userData)
              
              // 使用 update 更新用户文档
              console.log('开始更新数据库...')
              
              // 提取需要的字段，排除系统字段
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
              
              console.log('数据库更新结果:', result)
              
              if (result.stats.updated > 0) {
                // 重新从云端获取数据以确保同步
                console.log('开始从云端同步数据...')
                await syncManager.syncFromCloud()
                console.log('从云端同步数据成功')
                
                // 再次获取本地数据检查更新结果
                const updatedData = syncManager.getLocalData()
                console.log('更新后的状态:', {
                  currentBadge: updatedData.currentBadge,
                  badges: updatedData.badges
                })
                
                // 通知父组件关闭并刷新
                this.triggerEvent('close', { needRefresh: true })
                return
              } else {
                throw new Error('数据库更新失败')
              }
            } else {
              throw new Error('未找到用户数据')
            }
          } catch (error) {
            console.error('更新当前徽章失败，详细错误：', error)
            wx.showToast({
              title: '更新徽章失败',
              icon: 'error'
            })
            this.triggerEvent('close', { needRefresh: false })
            return
          }
        } else {
          console.warn('未找到选中的徽章信息')
          this.triggerEvent('close', { needRefresh: false })
          return
        }
      } else {
        console.log('徽章未发生变更，无需更新')
      }
      
      this.triggerEvent('close', { needRefresh: false })
    }
  }
}) 