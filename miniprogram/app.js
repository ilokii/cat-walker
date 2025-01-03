// app.js
const { citiesData } = require('./data/cities.js')

App({
  globalData: {
    userInfo: null,
    currentCity: null,
    targetCity: null,
    totalSteps: 0,
    startSteps: 0
  },

  onLaunch() {
    // 初始化云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cat-walker-1gnvj0y102f12cab',
        traceUser: true
      })
    }
  },

  getUserData() {
    return new Promise((resolve, reject) => {
      // 确保已经初始化云开发
      if (!wx.cloud) {
        console.error('云开发未初始化')
        resolve(false)
        return
      }

      // 获取用户数据，包括当前城市信息
      wx.cloud.callFunction({
        name: 'getUserData',
        success: res => {
          if (res.result && res.result.data) {
            const userData = res.result.data
            
            // 从本地配置中获取完整的城市数据
            if (userData.currentCity) {
              this.globalData.currentCity = {
                name: userData.currentCity,
                ...citiesData[userData.currentCity]
              }
            }
            
            if (userData.targetCity) {
              this.globalData.targetCity = {
                name: userData.targetCity,
                ...citiesData[userData.targetCity]
              }
            }
            
            this.globalData.visitedCities = userData.visitedCities || []
            this.globalData.totalSteps = userData.totalSteps || 0
            this.globalData.startSteps = userData.startSteps || 0
            this.globalData.registerDate = userData.registerDate
            this.globalData.registerInitialSteps = userData.registerInitialSteps
            
            // 检查是否同时有当前城市和目标城市
            const hasCurrentCity = !!userData.currentCity
            const hasTargetCity = !!userData.targetCity
            
            console.log('当前城市数据:', this.globalData.currentCity)
            console.log('目标城市数据:', this.globalData.targetCity)
            console.log('步数数据:', {
              totalSteps: this.globalData.totalSteps,
              startSteps: this.globalData.startSteps
            })

            // 如果没有选择城市，跳转到城市选择页面
            if (!hasCurrentCity) {
              wx.redirectTo({
                url: '/pages/city-select/city-select'
              })
            }
            
            resolve(hasCurrentCity && hasTargetCity)
          } else {
            // 新用户，直接跳转到城市选择页面
            wx.redirectTo({
              url: '/pages/city-select/city-select'
            })
            resolve(false)
          }
        },
        fail: err => {
          console.error('获取用户数据失败：', err)
          resolve(false)
        }
      })
    })
  },

  // 更新步数数据
  updateStepsData(stepsData) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'updateUserData',
        data: {
          stepsData
        },
        success: res => {
          resolve(res)
        },
        fail: err => {
          console.error('更新步数数据失败：', err)
          reject(err)
        }
      })
    })
  }
}) 
