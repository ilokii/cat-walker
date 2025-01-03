// pages/index/index.js
const { loadProgress, saveProgress, createNewProgress, updateCurrentCity, updateTargetCity, syncWeRunData } = require('../../data/userProgress.js')
const { citiesData } = require('../../data/cities.js')

const app = getApp()

Page({
  data: {
    currentCity: '未选择',
    targetCity: '未选择',
    currentCityIcon: '',
    targetCityIcon: '',
    totalDistance: 0,
    totalSteps: 0,
    currentSteps: 0,
    targetSteps: 1,  // 避免除以0
    hasInitialized: false,  // 添加初始化标记
    hasWeRunAuth: false,  // 是否有微信运动权限
    isLoading: true,  // 是否正在加载数据
    hasRequestedAuth: false  // 是否已经请求过授权
  },

  onLoad() {
    // 检查本地存档中是否已有城市信息
    const progress = loadProgress()
    const globalData = app.globalData
    
    // 如果有城市信息，加载到全局数据中
    if (progress.currentCity) {
      globalData.currentCity = citiesData[progress.currentCity]
    }
    if (progress.targetCity) {
      globalData.targetCity = citiesData[progress.targetCity]
    }
    
    this.checkWeRunAuth()
  },

  onShow() {
    if (this.data.hasWeRunAuth) {
      this.updateStats()
    }
  },

  // 检查微信运动权限
  async checkWeRunAuth() {
    this.setData({ isLoading: true })
    const auth = wx.getAppAuthorizeSetting()
    const hasAuth = auth.werun
    this.setData({ hasWeRunAuth: hasAuth })

    if (hasAuth) {
      await this.initializeData()
    } else if (!this.data.hasRequestedAuth) {
      // 首次请求授权，直接弹出授权窗口
      await this.requestAuth()
    }
    this.setData({ isLoading: false })
  },

  // 请求授权
  async requestAuth() {
    try {
      await wx.authorize({ scope: 'scope.werun' })
      this.setData({ 
        hasWeRunAuth: true,
        hasRequestedAuth: true,
        isLoading: true 
      })
      await this.initializeData()
      this.setData({ isLoading: false })
    } catch (err) {
      console.log('用户拒绝授权')
      this.setData({ 
        hasWeRunAuth: false,
        hasRequestedAuth: true
      })
    }
  },

  // 初始化数据
  async initializeData() {
    try {
      await this.doSyncSteps()
      wx.setStorageSync('lastStepSync', new Date().getTime())
      this.updateCityInfo()
      this.setData({ hasInitialized: true })
    } catch (error) {
      console.error('初始化数据失败：', error)
      wx.showToast({
        title: '数据加载失败',
        icon: 'none'
      })
    }
  },

  // 处理授权按钮点击
  handleAuthClick() {
    wx.openSetting({
      success: async (res) => {
        if (res.authSetting['scope.werun']) {
          this.setData({ 
            hasWeRunAuth: true,
            isLoading: true 
          })
          
          try {
            // 先获取微信步数数据
            const data = await new Promise((resolve, reject) => {
              wx.getWeRunData({
                success: res => resolve(res),
                fail: err => reject(err)
              })
            })

            // 创建新的进度数据
            let progress = createNewProgress()
            progress.weRunData = data
            
            // 同步微信运动数据
            progress = await syncWeRunData(progress)
            // 保存到本地
            saveProgress(progress)
            // 同步到云端
            await app.updateStepsData({
              totalSteps: progress.totalSteps,
              startSteps: progress.startSteps,
              registerInitialSteps: progress.registerInitialSteps
            })

            // 初始化其他数据
            await this.initializeData()
          } catch (error) {
            console.error('同步数据失败：', error)
            wx.showToast({
              title: '同步数据失败',
              icon: 'none'
            })
          }

          this.setData({ isLoading: false })
        }
      }
    })
  },

  updateCityInfo() {
    const globalData = app.globalData
    let progress = loadProgress()

    if (globalData.currentCity) {
      this.setData({
        currentCity: globalData.currentCity.name,
        currentCityIcon: globalData.currentCity.icon
      })
      // 同步到本地进度
      progress = updateCurrentCity(progress, globalData.currentCity.name)
      saveProgress(progress)
    }

    if (globalData.targetCity) {
      this.setData({
        targetCity: globalData.targetCity.name,
        targetCityIcon: globalData.targetCity.icon
      })
      // 同步到本地进度
      if (globalData.currentCity && globalData.currentCity.neighbors[globalData.targetCity.name]) {
        const requiredSteps = globalData.currentCity.neighbors[globalData.targetCity.name].steps
        progress = updateTargetCity(progress, globalData.targetCity.name, requiredSteps)
        saveProgress(progress)
      }
    }

    // 更新目标步数
    if (globalData.currentCity && globalData.targetCity && 
        globalData.currentCity.neighbors[globalData.targetCity.name]) {
      this.setData({
        targetSteps: globalData.currentCity.neighbors[globalData.targetCity.name].steps
      })
    }
  },

  async doSyncSteps() {
    try {
      let progress = loadProgress()
      // 同步微信运动数据
      progress = await syncWeRunData(progress)
      // 保存到本地
      saveProgress(progress)
      // 同步到云端，只在第一次同步时更新 startSteps
      await app.updateStepsData({
        totalSteps: progress.totalSteps,
        startSteps: progress.startSteps,
        registerInitialSteps: progress.registerInitialSteps
      })
      // 更新界面数据
      this.updateStats()
    } catch (error) {
      console.error('同步步数失败：', error)
      wx.showToast({
        title: '同步步数失败',
        icon: 'none'
      })
    }
  },

  updateStats() {
    const globalData = app.globalData
    
    // 获取城市图标和步数信息
    let currentCityIcon = ''
    let targetCityIcon = ''
    let targetSteps = 1

    if (globalData.currentCity && globalData.targetCity && 
        globalData.currentCity.neighbors[globalData.targetCity.name]) {
      currentCityIcon = globalData.currentCity.icon
      targetCityIcon = globalData.targetCity.icon
      targetSteps = globalData.currentCity.neighbors[globalData.targetCity.name].steps
    }

    // 计算当前步数（总步数 - 起始步数）
    const currentSteps = Math.max(0, globalData.totalSteps - globalData.startSteps)

    this.setData({
      currentCity: globalData.currentCity?.name || '未选择',
      targetCity: globalData.targetCity?.name || '未选择',
      currentCityIcon,
      targetCityIcon,
      totalSteps: globalData.totalSteps,
      totalDistance: (globalData.totalSteps * 0.00075).toFixed(2), // 假设一步0.75米
      currentSteps: currentSteps,
      targetSteps: targetSteps
    })
  },

  selectCity() {
    wx.navigateTo({
      url: '/pages/city-select/city-select'
    })
  },
})