const app = getApp()
const syncManager = require('../../utils/sync-manager')
const { provincesData } = require('../../data/provinces')
const { citiesData } = require('../../data/cities')
const packManager = require('../../utils/pack-manager')
const albumManager = require('../../utils/album-manager')
const functionManager = require('../../utils/managers/function-manager')

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
    
    // 用户数据
    userAvatar: '',
    
    // 添加后台切换标记
    hasBeenInBackground: false,
    
    // 功能开关
    showDailyTasks: false
  },

  onLoad: function() {
    // 初始化功能开关
    this.setData({
      showDailyTasks: functionManager.isEnabled('dailyTasks')
    })
    this.refreshData()
    this.updateUserAvatar()
  },

  onShow: function() {
    console.log('首页 - 页面显示')
    // 如果之前进入过后台，则触发刷新
    if (this.data.hasBeenInBackground) {
      this.onRefresh()
      this.setData({ hasBeenInBackground: false })
    }
    // 更新旅行数据
    this.refreshData()
  },

  onHide() {
    this.setData({ hasBeenInBackground: true })
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

            // 更新已访问城市和当前城市
            if (targetCity.name) {
              await syncManager.addVisitedCity(targetCity.name)
              await syncManager.updateCurrentCity(targetCity.name)
              // 更新当前城市显示
              currentCity = targetCity
              currentProvince = targetProvince
            }
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
        travelDays: travelDays || 0
      })

      // 如果已到达目标城市，显示到达弹窗
      if (isArrived) {
        this.setData({ showArrivalModal: true })
      }
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
    this.setData({
      showArrivalModal: false
    })
    wx.navigateTo({
      url: '/pages/city/city'
    })
  },

  onAlbumTap() {
    wx.navigateTo({
      url: '/pages/album/album'
    })
  },

  updateUserAvatar() {
    const app = getApp()
    if (app.globalData.isInitialized) {
      this.setData({
        userAvatar: app.globalData.userAvatar
      })
    }
  },

  // 更新旅行数据
  async updateTravelData() {
    console.log('首页 - 开始更新旅行数据')
    try {
      // 从本地获取最新数据
      const localData = syncManager.getLocalData()
      console.log('首页 - 获取本地数据:', {
        currentCity: localData.currentCity,
        targetCity: localData.targetCity,
        totalSteps: localData.totalSteps,
        startSteps: localData.startSteps
      })

      // 更新城市信息
      let currentCity = null
      let currentProvince = null
      let targetCity = null
      let targetProvince = null

      if (localData.currentCity) {
        const cityData = citiesData[localData.currentCity]
        if (!cityData) {
          console.error('首页 - 当前城市数据不存在:', localData.currentCity)
        } else {
          currentCity = {
            ...cityData,
            name: localData.currentCity
          }
          currentProvince = provincesData[cityData.province]
          console.log('首页 - 当前城市数据:', { currentCity, currentProvince })
        }
      }

      if (localData.targetCity) {
        const cityData = citiesData[localData.targetCity]
        if (!cityData) {
          console.error('首页 - 目标城市数据不存在:', localData.targetCity)
        } else {
          targetCity = {
            ...cityData,
            name: localData.targetCity
          }
          targetProvince = provincesData[cityData.province]
          console.log('首页 - 目标城市数据:', { targetCity, targetProvince })
        }
      }

      this.setData({
        currentCity,
        currentProvince,
        targetCity,
        targetProvince
      })

      // 计算进度
      if (localData.currentCity && localData.targetCity) {
        const cityNeighbors = citiesData[localData.currentCity]?.neighbors
        if (!cityNeighbors) {
          console.error('首页 - 当前城市邻居数据不存在')
          return
        }

        const totalSteps = cityNeighbors[localData.targetCity]?.steps
        if (!totalSteps) {
          console.error('首页 - 目标城市步数数据不存在')
          return
        }

        const currentSteps = localData.totalSteps - localData.startSteps
        const progress = Math.min(100, (currentSteps / totalSteps) * 100)

        console.log('首页 - 进度计算数据:', {
          totalSteps,
          currentSteps,
          progress
        })

        // 确保进度是有效数字
        if (!isNaN(progress)) {
          this.setData({
            progress: progress.toFixed(1),
            progressSteps: currentSteps,
            totalRequiredSteps: totalSteps
          })
        } else {
          console.error('首页 - 进度计算结果无效:', {
            totalSteps,
            currentSteps,
            progress
          })
        }
      }

      console.log('首页 - 旅行数据更新完成:', {
        currentCity: this.data.currentCity?.name,
        targetCity: this.data.targetCity?.name,
        progress: this.data.progress
      })
    } catch (error) {
      console.error('首页 - 更新旅行数据失败:', error)
    }
  }
}) 