const app = getApp()
const syncManager = require('../../utils/sync-manager')
const { provincesData } = require('../../data/provinces')
const { citiesData } = require('../../data/cities')
const packManager = require('../../utils/pack-manager')
const albumManager = require('../../utils/album-manager')

const PROGRESS_ANIMATION_DURATION = 1000 // 进度条动画持续时间（毫秒）
const ARRIVAL_MODAL_DELAY = 500 // 到达弹窗延迟时间（毫秒）
const ANIMATION_STEPS = 30 // 动画的步骤数

Page({
  data: {
    // 统计数据
    totalKilometers: '0.00',
    totalSteps: 0,
    visitedProvinces: 0,
    totalProvinces: Object.keys(provincesData).length,
    visitedCities: 0,
    totalCities: Object.keys(citiesData).length,
    
    // 当前旅行数据
    currentCity: null,
    currentProvince: null,
    targetCity: null,
    targetProvince: null,
    progress: 0,
    progressSteps: 0,
    totalRequiredSteps: 0,
    showArrivalModal: false,
    animatingProgress: false,
    
    // 添加后台切换标记
    hasBeenInBackground: false,
    envId: '',
    testPackId: '1', // 默认卡包ID
    userInfo: null,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    packs: []
  },

  onLoad: function() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    this.setData({
      envId: getApp().globalData.envId
    })
    this.initializeData()
  },

  onShow() {
    console.log('首页 - 页面显示')
    // 更新旅行数据
    this.updateTravelData()
  },

  onHide() {
    this.setData({ hasBeenInBackground: true })
  },

  async initializeData() {
    try {
      await syncManager.initialize()
      await this.initManagers()
      await this.refreshData()
    } catch (err) {
      console.error('初始化数据失败：', err)
      wx.showToast({
        title: '数据加载失败',
        icon: 'none'
      })
    }
  },

  async initManagers() {
    try {
      await packManager.init()
      const packs = packManager.packsData || []
      this.setData({ packs })
    } catch (error) {
      console.error('初始化管理器失败：', error)
      wx.showToast({
        title: '初始化失败',
        icon: 'error'
      })
    }
  },

  async refreshData() {
    try {
      const localData = syncManager.getLocalData()
      if (!localData) return
      
      // 获取当前城市和目标城市信息
      let currentCity = null
      let currentProvince = null
      if (localData.currentCity) {
        const cityData = citiesData[localData.currentCity]
        if (cityData) {
          currentCity = {
            name: localData.currentCity
          }
          currentProvince = provincesData[cityData.province]
        }
      }
      
      let targetCity = null
      let targetProvince = null
      if (localData.targetCity) {
        const cityData = citiesData[localData.targetCity]
        if (cityData) {
          targetCity = {
            name: localData.targetCity
          }
          targetProvince = provincesData[cityData.province]
        }
      }

      // 计算进度
      let progress = 0
      let progressSteps = 0
      let totalRequiredSteps = 0
      let travelDays = 0
      let isArrived = false

      if (currentCity && targetCity) {
        const distance = citiesData[currentCity.name]?.neighbors?.[targetCity.name]
        if (distance) {
          totalRequiredSteps = distance.steps
          const tempSteps = syncManager.getTotalStepsTemp()
          progressSteps = Math.max(0, tempSteps - localData.startSteps)
          progress = ((progressSteps / totalRequiredSteps) * 100).toFixed(2)

          // 检查是否到达目标城市
          if (progressSteps >= totalRequiredSteps) {
            isArrived = true
            // 计算旅行天数
            const startDate = new Date(localData.startDate)
            const currentDate = new Date()
            const startDay = Math.floor(startDate.getTime() / (24 * 60 * 60 * 1000))
            const currentDay = Math.floor(currentDate.getTime() / (24 * 60 * 60 * 1000))
            travelDays = currentDay - startDay
          }
        }
      }

      this.setData({
        currentCity,
        currentProvince,
        targetCity,
        targetProvince,
        progress: progress || 0,
        progressSteps: progressSteps || 0,
        totalRequiredSteps: totalRequiredSteps || 0,
        showArrivalModal: isArrived,
        travelDays: travelDays || 0
      })
    } catch (error) {
      console.error('刷新数据失败：', error)
      wx.showToast({
        title: '数据刷新失败',
        icon: 'none'
      })
    }
  },

  playProgressAnimation(startSteps, endSteps, totalRequiredSteps) {
    this.setData({ animatingProgress: true })
    
    const stepDuration = PROGRESS_ANIMATION_DURATION / ANIMATION_STEPS
    let currentStep = 0
    
    const updateProgress = () => {
      if (currentStep >= ANIMATION_STEPS) {
        this.setData({ 
          progressSteps: endSteps,
          progress: ((endSteps / totalRequiredSteps) * 100).toFixed(2),
          animatingProgress: false 
        })
        syncManager.setTotalStepsTemp(syncManager.getLocalData().totalSteps)
        
        if (endSteps >= totalRequiredSteps) {
          setTimeout(() => {
            this.setData({ showArrivalModal: true })
          }, ARRIVAL_MODAL_DELAY)
        }
        return
      }
      
      const progress = currentStep / ANIMATION_STEPS
      const easeProgress = this.easeOutCubic(progress)
      const currentSteps = startSteps + (endSteps - startSteps) * easeProgress
      const currentProgress = ((currentSteps / totalRequiredSteps) * 100).toFixed(2)
      
      this.setData({
        progressSteps: Math.floor(currentSteps),
        progress: currentProgress
      })
      
      currentStep++
      setTimeout(updateProgress, stepDuration)
    }
    
    updateProgress()
  },

  easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3)
  },

  onRefresh() {
    if (syncManager.isRefreshCooldown()) {
      return
    }

    wx.redirectTo({
      url: '/pages/loading/loading'
    })
  },

  onPlanNextTravel() {
    wx.navigateTo({
      url: '/pages/travel-plan/travel-plan'
    })
  },

  onAlbumTap() {
    wx.navigateTo({
      url: '/pages/album/album'
    })
  },

  onTestPackIdInput(e) {
    this.setData({
      testPackId: e.detail.value
    })
  },

  onTestOpenPack() {
    if (this.data.testPackId) {
      wx.navigateTo({
        url: `/pages/pack-open/pack-open?id=${this.data.testPackId}`
      })
    }
  },

  async handlePackTap(e) {
    console.log('当前输入ID:', e.currentTarget.dataset.id)
    console.log('packManager状态:', packManager.packsData)

    const packId = parseInt(e.currentTarget.dataset.id)
    if (!packId) {
      console.error('无效的卡包ID')
      return
    }

    if (!packManager.packsData) {
      console.log('packManager未初始化，尝试重新初始化')
      await packManager.init()
      
      if (!packManager.packsData) {
        console.error('packManager初始化失败')
        wx.showToast({
          title: '系统错误',
          icon: 'error'
        })
        return
      }
    }

    console.log('准备跳转到卡包页面')
    wx.navigateTo({
      url: `/pages/pack-open/pack-open?id=${packId}`,
      success: () => console.log('跳转成功'),
      fail: error => console.error('跳转失败：', error)
    })
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 更新旅行数据
  async updateTravelData() {
    console.log('首页 - 开始更新旅行数据')
    try {
      // 从本地获取最新数据
      const localData = syncManager.getLocalData()
      console.log('首页 - 获取本地数据:', localData)

      // 更新城市信息
      let currentCity = null
      let currentProvince = null
      let targetCity = null
      let targetProvince = null

      if (localData.currentCity) {
        const cityData = citiesData[localData.currentCity]
        currentCity = {
          ...cityData,
          name: localData.currentCity
        }
        currentProvince = provincesData[cityData.province]
      }

      if (localData.targetCity) {
        const cityData = citiesData[localData.targetCity]
        targetCity = {
          ...cityData,
          name: localData.targetCity
        }
        targetProvince = provincesData[cityData.province]
      }

      this.setData({
        currentCity,
        currentProvince,
        targetCity,
        targetProvince
      })

      // 计算进度
      if (localData.currentCity && localData.targetCity) {
        const totalSteps = citiesData[localData.currentCity].neighbors[localData.targetCity].steps
        const currentSteps = localData.totalSteps - localData.startSteps
        const progress = Math.min(100, (currentSteps / totalSteps) * 100)

        this.setData({
          progress: progress.toFixed(1),
          progressSteps: currentSteps,
          totalRequiredSteps: totalSteps
        })
      }

      console.log('首页 - 旅行数据更新完成:', {
        currentCity,
        targetCity,
        progress: this.data.progress
      })
    } catch (error) {
      console.error('首页 - 更新旅行数据失败:', error)
    }
  }
}) 