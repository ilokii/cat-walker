const { provincesData } = require('../../data/provinces.js')
const { citiesData } = require('../../data/cities.js')
const syncManager = require('../../utils/sync-manager.js')

Page({
  data: {
    provinces: provincesData,
    currentCity: null,        // 当前城市
    targetCities: [],         // 目标城市列表
    selectorVisible: false,   // 城市选择器显示状态
    visitedCities: [],         // 已访问城市列表
    confirmModal: {
      visible: false,
      type: 'normal',
      cityName: '',
      selectedCity: null
    }
  },

  onLoad() {
    // 加载用户数据
    this.loadUserData()
    // 如果没有当前城市，尝试获取地理位置
    if (!this.data.currentCity) {
      this.checkAndGetLocation()
    }
  },

  // 加载用户数据
  async loadUserData() {
    try {
      const userData = await syncManager.getUserData()

      if (userData) {
        // 设置当前城市
        if (userData.currentCity) {
          this.setCurrentCity(userData.currentCity)
        }
        // 设置已访问城市
        if (userData.visitedCities) {
          this.setData({
            visitedCities: userData.visitedCities
          })
        }
      }
    } catch (err) {
      console.error('加载用户数据失败:', err)
      wx.showToast({
        title: '加载数据失败，请重试',
        icon: 'none'
      })
    }
  },

  // 显示城市选择器
  showCitySelector() {
    this.setData({
      selectorVisible: true
    })
  },

  // 关闭城市选择器
  onSelectorClose() {
    this.setData({
      selectorVisible: false
    })
  },

  // 处理城市选择
  async onCitySelect(e) {
    const { city } = e.detail
    if (!city) return

    try {
      // 更新当前城市
      await this.updateCurrentCity(city.name)
      this.setData({
        selectorVisible: false
      })
    } catch (err) {
      console.error('更新城市失败:', err)
      wx.showToast({
        title: '设置城市失败，请重试',
        icon: 'none'
      })
    }
  },

  // 更新当前城市
  async updateCurrentCity(cityName) {
    const cityInfo = citiesData[cityName]
    if (!cityInfo) return

    try {
      await syncManager.updateCurrentCity(cityName)

      // 更新本地数据
      this.setCurrentCity(cityName)
    } catch (err) {
      console.error('更新当前城市失败:', err)
      throw err
    }
  },

  // 设置当前城市并更新目标城市列表
  setCurrentCity(cityName) {
    const cityInfo = citiesData[cityName]
    if (!cityInfo) return

    // 获取相邻城市列表
    const neighbors = Object.entries(cityInfo.neighbors).map(([name, info]) => ({
      name,
      ...citiesData[name],
      distance: info.distance,
      steps: info.steps,
      visited: this.data.visitedCities.includes(name)
    }))

    this.setData({
      currentCity: {
        name: cityName,
        ...cityInfo
      },
      targetCities: neighbors
    })
  },

  // 选择目标城市
  async selectTarget(e) {
    const { city } = e.currentTarget.dataset
    if (!city) return

    this.setData({
      'confirmModal.visible': true,
      'confirmModal.type': city.visited ? 'visited' : 'normal',
      'confirmModal.cityName': city.name,
      'confirmModal.selectedCity': city
    })
  },

  // 处理确认弹窗取消
  handleConfirmCancel() {
    this.setData({
      'confirmModal.visible': false
    })
  },

  // 处理确认弹窗确认
  async handleConfirmConfirm() {
    const { selectedCity } = this.data.confirmModal
    if (!selectedCity) return

    await this.setTargetCity(selectedCity.name)
    this.setData({
      'confirmModal.visible': false
    })
  },

  // 处理直接传送
  async handleConfirmTeleport() {
    const { selectedCity } = this.data.confirmModal
    if (!selectedCity) return

    await this.updateCurrentCity(selectedCity.name)
    this.setData({
      'confirmModal.visible': false
    })
  },

  // 设置目标城市
  async setTargetCity(cityName) {
    try {
      await syncManager.updateTargetCity(cityName, 0)

      wx.showToast({
        title: '目标设置成功',
        icon: 'success'
      })

      wx.reLaunch({
        url: '/pages/index/index'
      })
    } catch (err) {
      console.error('设置目标城市失败:', err)
      wx.showToast({
        title: '设置目标失败，请重试',
        icon: 'none'
      })
    }
  },

  // 检查并获取地理位置
  async checkAndGetLocation() {
    try {
      // 直接调用获取位置，会自动弹出授权框
      const location = await new Promise((resolve, reject) => {
        wx.getLocation({
          type: 'gcj02',
          success: resolve,
          fail: (err) => {
            // 如果是用户拒绝授权导致的失败
            if (err.errMsg.indexOf('auth deny') !== -1) {
              wx.showToast({
                title: '授权失败，请手动选择城市',
                icon: 'none',
                duration: 3000
              })
            } else {
              reject(err)
            }
          }
        })
      })
      
      // 根据经纬度查找最近的城市
      const nearestCity = this.findNearestCity(location.latitude, location.longitude)
      if (nearestCity) {
        // 更新当前城市
        await this.updateCurrentCity(nearestCity.name)
      } else {
        wx.showToast({
          title: '定位异常，请手动选择城市',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          this.showCitySelector()
        }, 2000)
      }
    } catch (err) {
      console.error('获取位置失败:', err)
      wx.showToast({
        title: '请手动选择城市',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        this.showCitySelector()
      }, 2000)
    }
  },

  // 查找最近的城市
  findNearestCity(lat, lon) {
    let nearestCity = null
    let minDistance = Infinity

    for (const [cityName, cityInfo] of Object.entries(citiesData)) {
      if (!cityInfo.location) continue
      
      const distance = this.calculateDistance(
        lat, lon,
        cityInfo.location.lat,
        cityInfo.location.lon
      )
      if (distance < minDistance) {
        minDistance = distance
        nearestCity = {
          name: cityName,
          ...cityInfo
        }
      }
    }

    // 如果最近的城市距离超过100公里，认为定位异常
    return minDistance <= 100 ? nearestCity : null
  },

  // 计算两点之间的距离（km）
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 // 地球半径（km）
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  },

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}) 