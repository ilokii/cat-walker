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
    totalRequiredSteps: 0
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
    const visitedProvinces = localData.visitedCities 
      ? new Set(localData.visitedCities.map(city => citiesData[city].province)).size
      : 0
    
    // 获取当前城市和目标城市信息
    const currentCity = localData.currentCity ? {
      name: localData.currentCity,
      province: citiesData[localData.currentCity].province,
      icon: citiesData[localData.currentCity].icon
    } : null
    
    const targetCity = localData.targetCity ? {
      name: localData.targetCity,
      province: citiesData[localData.targetCity].province,
      icon: citiesData[localData.targetCity].icon
    } : null
    
    // 计算进度
    let progress = 0
    let progressSteps = 0
    let totalRequiredSteps = 0
    
    if (currentCity && targetCity) {
      const distance = citiesData[currentCity.name].neighbors[targetCity.name]
      if (distance) {
        progressSteps = localData.totalSteps - localData.startSteps
        totalRequiredSteps = distance.steps
        progress = progressSteps > 0 ? ((progressSteps / totalRequiredSteps) * 100).toFixed(2) : 0
      }
    }
    
    this.setData({
      totalKilometers,
      totalSteps: localData.totalSteps,
      visitedProvinces,
      visitedCities: localData.visitedCities ? localData.visitedCities.length : 0,
      currentCity,
      currentProvince: currentCity ? provincesData[currentCity.province] : null,
      targetCity,
      targetProvince: targetCity ? provincesData[targetCity.province] : null,
      progress,
      progressSteps,
      totalRequiredSteps
    })
  }
}) 