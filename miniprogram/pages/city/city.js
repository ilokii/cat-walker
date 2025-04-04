const { provincesData } = require('../../data/provinces.js')
const { citiesData } = require('../../data/cities.js')
const syncManager = require('../../utils/sync-manager.js')

Page({
  data: {
    provinces: provincesData,
    cities: citiesData,
    selectorVisible: false,   // 只保留 UI 状态相关的数据
    confirmModal: {
      visible: false,
      type: 'normal',
      cityName: '',
      selectedCity: null
    }
  },

  onLoad() {
    // 确保 syncManager 已初始化
    syncManager.initialize().then(() => {
      // 从 syncManager 获取本地数据
      const userData = syncManager.getLocalData()
      if (userData.currentCity) {
        const cityInfo = citiesData[userData.currentCity]
        this.setData({
          currentCity: {
            name: userData.currentCity,
            ...cityInfo
          },
          targetCities: this.getTargetCities(userData.currentCity, userData.visitedCities || [])
        })
      } else {
        // 如果没有当前城市，直接显示城市选择器
        this.setData({
          selectorVisible: true
        })
      }
    }).catch(err => {
      console.error('初始化数据管理器失败:', err)
      wx.showToast({
        title: '加载数据失败，请重试',
        icon: 'none'
      })
    })
  },

  // 获取目标城市列表
  getTargetCities(currentCityName, visitedCities) {
    const targetCities = []
    const neighbors = citiesData[currentCityName]?.neighbors || {}
    
    for (const [cityName, info] of Object.entries(neighbors)) {
      targetCities.push({
        name: cityName,
        ...citiesData[cityName],
        distance: info.distance,
        steps: info.steps,
        visited: visitedCities.includes(cityName)
      })
    }
    return targetCities
  },

  // 显示城市选择器
  showCitySelector() {
    const userData = syncManager.getLocalData()
    console.log('显示城市选择器, isInitStepInfo:', userData.isInitStepInfo)
    
    if (userData.isInitStepInfo) {
      wx.showToast({
        title: '已完成初始化，无法更改城市',
        icon: 'none'
      })
      return
    }
    
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

    const userData = syncManager.getLocalData()
    console.log('选择城市, isInitStepInfo:', userData.isInitStepInfo)
    
    if (userData.isInitStepInfo) {
      console.log('步数已初始化，不允许选择城市')
      return
    }

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
    try {
      await syncManager.updateCurrentCity(cityName)
      // 直接使用本地数据更新界面
      const userData = syncManager.getLocalData()
      const cityInfo = citiesData[cityName]
      this.setData({
        currentCity: {
          name: cityName,
          ...cityInfo
        },
        targetCities: this.getTargetCities(cityName, userData.visitedCities || [])
      })
    } catch (err) {
      console.error('更新当前城市失败:', err)
      throw err
    }
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
      // 获取本地数据
      const userData = syncManager.getLocalData()
      
      // 如果当前城市不在已访问列表中，添加进去
      if (userData && userData.currentCity && 
          (!userData.visitedCities || !userData.visitedCities.includes(userData.currentCity))) {
        await syncManager.addVisitedCity(userData.currentCity)
      }

      // 使用当前的 totalSteps 作为新的 startSteps，并设置开始日期为当前日期
      const serverDate = syncManager.getServerDate()
      await syncManager.updateTargetCity(cityName, userData.totalSteps, serverDate)

      wx.showToast({
        title: '目标设置成功',
        icon: 'success'
      })

      wx.redirectTo({
        url: '/pages/loading/loading'
      })
    } catch (err) {
      console.error('设置目标城市或更新已访问城市失败:', err)
      wx.showToast({
        title: '设置目标失败，请重试',
        icon: 'none'
      })
    }
  }
}) 