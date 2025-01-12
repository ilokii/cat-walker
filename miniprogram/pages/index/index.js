const syncManager = require('../../utils/sync-manager')
const { provincesData } = require('../../data/provinces')
const { citiesData } = require('../../data/cities')

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
    showArrivalModal: false
  },

  onLoad() {
    this.initializeData()
  },

  onShow() {
    this.refreshData()
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
        progressSteps = localData.totalSteps - localData.startSteps
        totalRequiredSteps = distance.steps
        progress = progressSteps > 0 ? ((progressSteps / totalRequiredSteps) * 100).toFixed(2) : 0
        
        // 检查是否到达目标城市
        if (progressSteps >= totalRequiredSteps) {
          hasArrived = true
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
    
    this.setData({
      totalKilometers,
      totalSteps: localData.totalSteps,
      visitedProvinces,
      visitedCities: localData.visitedCities && Array.isArray(localData.visitedCities) ? 
        localData.visitedCities.filter(city => citiesData[city]).length : 0,
      currentCity,
      currentProvince: currentCity ? provincesData[currentCity.province] : null,
      targetCity,
      targetProvince: targetCity ? provincesData[targetCity.province] : null,
      progress,
      progressSteps,
      totalRequiredSteps,
      showArrivalModal: hasArrived,
      travelDays
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
  }
}) 