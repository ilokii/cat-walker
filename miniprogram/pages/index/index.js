const syncManager = require('../../utils/sync-manager')
const { provincesData } = require('../../data/provinces')
const { citiesData } = require('../../data/cities')
const achievementManager = require('../../utils/achievement-manager')

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
    achievements: [],
    showAchievementUpgrade: false,
    currentUpgradeAchievement: null,
    envId: '',
  },

  onLoad() {
    this.setData({
      envId: getApp().globalData.envId
    })
    this.initializeData()
    this.updateAchievements()
  },

  onShow() {
    // 如果之前进入过后台，则触发刷新
    if (this.data.hasBeenInBackground) {
      this.onRefresh()
      this.setData({ hasBeenInBackground: false })
    }
    this.refreshData()
  },

  onHide() {
    // 标记已进入后台
    this.setData({ hasBeenInBackground: true })
  },

  async initializeData() {
    try {
      await syncManager.initialize()
      this.refreshData()
    } catch (err) {
      console.error('初始化数据失败：', err)
      wx.showToast({
        title: '数据加载失败',
        icon: 'none'
      })
    }
  },

  refreshData() {
    const localData = syncManager.getLocalData()
    
    // 计算总公里数（1步 = 0.75米）
    const totalKilometers = (localData.totalSteps * 0.75 / 1000).toFixed(2)
    
    // 计算已访问省份数（去重）
    let visitedProvinces = 0
    if (localData.visitedCities && Array.isArray(localData.visitedCities)) {
      const validCities = localData.visitedCities.filter(city => {
        const isValid = citiesData[city] && citiesData[city].province
        if (!isValid) {
          console.warn('城市数据无效：', city)
        }
        return isValid
      })
      visitedProvinces = new Set(validCities.map(city => citiesData[city].province)).size
    }
    
    // 获取当前城市和目标城市信息
    let currentCity = null
    if (localData.currentCity) {
      const cityData = citiesData[localData.currentCity]
      if (cityData) {
        currentCity = {
          name: localData.currentCity,
          province: cityData.province,
          icon: cityData.icon
        }
      } else {
        console.warn('当前城市数据无效：', localData.currentCity)
      }
    }
    
    let targetCity = null
    if (localData.targetCity) {
      const cityData = citiesData[localData.targetCity]
      if (cityData) {
        targetCity = {
          name: localData.targetCity,
          province: cityData.province,
          icon: cityData.icon
        }
      } else {
        console.warn('目标城市数据无效：', localData.targetCity)
      }
    }
    
    // 计算进度
    let progress = 0
    let progressSteps = 0
    let totalRequiredSteps = 0
    let hasArrived = false
    let travelDays = 0
    
    if (currentCity && targetCity) {
      const distance = citiesData[currentCity.name]?.neighbors?.[targetCity.name]
      
      if (distance) {
        totalRequiredSteps = distance.steps
        const tempSteps = syncManager.getTotalStepsTemp()
        const finalSteps = localData.totalSteps
        
        // 计算当前显示的进度
        progressSteps = Math.max(0, tempSteps - localData.startSteps)
        progress = ((progressSteps / totalRequiredSteps) * 100).toFixed(2)
        
        // 计算最终进度
        const finalProgressSteps = Math.max(0, finalSteps - localData.startSteps)
        
        // 检查是否需要播放动画
        if (tempSteps !== finalSteps && !this.data.animatingProgress) {
          this.playProgressAnimation(progressSteps, finalProgressSteps, totalRequiredSteps)
        } else if (finalProgressSteps >= totalRequiredSteps && !this.data.animatingProgress) {
          // 如果已经到达目标城市，且不在动画中，直接显示到达弹窗
          hasArrived = true
        }
        
        // 检查是否到达目标城市
        if (finalProgressSteps >= totalRequiredSteps) {
          // 计算旅行天数
          const startDate = new Date(localData.startDate)
          const currentDate = new Date()
          const startDay = Math.floor(startDate.getTime() / (24 * 60 * 60 * 1000))
          const currentDay = Math.floor(currentDate.getTime() / (24 * 60 * 60 * 1000))
          travelDays = currentDay - startDay
        }
      } else {
        console.warn('找不到城市间距离信息：', {
          from: currentCity.name,
          to: targetCity.name
        })
      }
    }
    
    // 只在非动画状态下更新showArrivalModal
    const updates = {
      totalKilometers,
      totalSteps: localData.totalSteps,
      visitedProvinces,
      visitedCities: localData.visitedCities && Array.isArray(localData.visitedCities) ? 
        localData.visitedCities.filter(city => citiesData[city]).length : 0,
      currentCity,
      currentProvince: currentCity ? provincesData[currentCity.province] : null,
      targetCity,
      targetProvince: targetCity ? provincesData[targetCity.province] : null,
      progress: progress || 0,
      progressSteps: progressSteps || 0,
      totalRequiredSteps: totalRequiredSteps || 0,
      travelDays: travelDays || 0,
      dailyLoginCount: localData.achievement_daily_login || 0  // 添加每日登录次数
    }

    // 只在非动画状态下更新showArrivalModal
    if (!this.data.animatingProgress) {
      updates.showArrivalModal = hasArrived
    }
    
    const oldData = { ...this.data }
    this.setData(updates)
    
    // 检查勋章升级
    this.checkAchievements(oldData)
  },

  // 播放进度条动画
  playProgressAnimation(startSteps, endSteps, totalRequiredSteps) {
    this.setData({ animatingProgress: true })
    
    const stepDuration = PROGRESS_ANIMATION_DURATION / ANIMATION_STEPS
    let currentStep = 0
    
    const updateProgress = () => {
      if (currentStep >= ANIMATION_STEPS) {
        // 动画结束
        this.setData({ 
          progressSteps: endSteps,
          progress: ((endSteps / totalRequiredSteps) * 100).toFixed(2),
          animatingProgress: false 
        })
        syncManager.setTotalStepsTemp(syncManager.getLocalData().totalSteps)
        
        // 检查是否需要显示到达弹窗
        if (endSteps >= totalRequiredSteps) {
          setTimeout(() => {
            this.setData({ showArrivalModal: true })
          }, ARRIVAL_MODAL_DELAY)
        }
        return
      }
      
      // 使用缓动函数计算当前进度
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

  // 缓动函数
  easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3)
  },

  // 刷新按钮点击处理
  onRefresh() {
    if (syncManager.isRefreshCooldown()) {
      // 在冷却中，显示loading
      wx.showLoading({
        title: '数据同步中',
        mask: true
      })

      // 随机等待1-3秒
      const waitTime = Math.floor(Math.random() * 2000) + 1000 // 1000-3000ms
      setTimeout(() => {
        // 隐藏loading
        wx.hideLoading()
        
        // 显示刷新成功提示
        wx.showToast({
          title: '数据刷新成功',
          icon: 'success',
          duration: 2000
        })
      }, waitTime)
      return
    }

    // 不在冷却中，直接跳转到loading页面
    wx.redirectTo({
      url: '/pages/loading/loading'
    })
  },

  async onPlanNextTravel() {
    try {
      // 获取当前日期的步数
      const weRunData = await syncManager.getWeRunData()
      const serverDate = syncManager.getServerDate()
      
      const todaySteps = syncManager.getTodaySteps(weRunData)
      const localData = syncManager.getLocalData()
      
      // 更新最后步数信息
      await syncManager.updateLastStepInfo(serverDate, todaySteps)
      
      // 更新当前城市
      await syncManager.updateCurrentCity(localData.targetCity)
      
      // 添加已访问城市
      await syncManager.addVisitedCity(localData.targetCity)
      
      // 关闭弹窗
      this.setData({
        showArrivalModal: false
      })
      
      // 跳转到城市选择页面
      wx.navigateTo({
        url: '/pages/city/city'
      })
    } catch (err) {
      console.error('处理到达城市失败：', err)
      wx.showToast({
        title: '处理失败，请重试',
        icon: 'none'
      })
    }
  },

  updateAchievements() {
    const achievements = [
      achievementManager.calculateAchievement('daily_login', this.data.dailyLoginCount || 0),
      achievementManager.calculateAchievement('steps', this.data.totalSteps || 0),
      achievementManager.calculateAchievement('cities', this.data.visitedCities || 0),
      achievementManager.calculateAchievement('provinces', this.data.visitedProvinces || 0)
    ].filter(Boolean)

    this.setData({ achievements })
  },

  showNextAchievementUpgrade() {
    if (achievementManager.hasUpgrade()) {
      const achievement = achievementManager.getNextUpgrade()
      this.setData({
        showAchievementUpgrade: true,
        currentUpgradeAchievement: achievement
      })
    } else if (this.data.showArrivalModal) {
      this.setData({ showArrivalModal: true })
    }
  },

  onAchievementUpgradeConfirm() {
    this.setData({
      showAchievementUpgrade: false,
      currentUpgradeAchievement: null
    }, () => {
      setTimeout(() => {
        this.showNextAchievementUpgrade()
      }, 500)
    })
  },

  // 在数据更新后检查勋章升级
  checkAchievements(oldData) {
    if (oldData.dailyLoginCount !== undefined && this.data.dailyLoginCount !== oldData.dailyLoginCount) {
      achievementManager.checkUpgrade('daily_login', oldData.dailyLoginCount, this.data.dailyLoginCount)
    }
    if (oldData.totalSteps !== undefined && this.data.totalSteps !== oldData.totalSteps) {
      achievementManager.checkUpgrade('steps', oldData.totalSteps, this.data.totalSteps)
    }
    if (oldData.visitedCities !== undefined && this.data.visitedCities !== oldData.visitedCities) {
      achievementManager.checkUpgrade('cities', oldData.visitedCities, this.data.visitedCities)
    }
    if (oldData.visitedProvinces !== undefined && this.data.visitedProvinces !== oldData.visitedProvinces) {
      achievementManager.checkUpgrade('provinces', oldData.visitedProvinces, this.data.visitedProvinces)
    }

    this.updateAchievements()
    this.showNextAchievementUpgrade()
  }
}) 