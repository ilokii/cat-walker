Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    currentCity: {
      type: Object,
      value: null
    }
  },

  data: {
    provinces: {},        // 省份数据
    cities: {},          // 城市数据
    expandedProvince: '', // 当前展开的省份
    loading: false,      // 加载状态
    locationAuth: false  // 位置权限状态
  },

  lifetimes: {
    attached() {
      // 加载省份和城市数据
      const { provincesData } = require('../../data/provinces.js')
      const { citiesData } = require('../../data/cities.js')
      this.setData({
        provinces: provincesData,
        cities: citiesData
      })
      
      // 检查位置权限
      this.checkLocationAuth()
      console.log('Loaded data:', this.data.provinces, this.data.cities) // 添加调试日志
    }
  },

  methods: {
    // 检查位置权限
    async checkLocationAuth() {
      try {
        const setting = await wx.getSetting()
        this.setData({
          locationAuth: setting.authSetting['scope.userLocation'] || false
        })
      } catch (err) {
        console.error('检查位置权限失败:', err)
      }
    },

    // 获取当前位置
    async getLocation() {
      this.setData({ loading: true })
      try {
        const res = await wx.getLocation({
          type: 'gcj02'
        })
        
        // 通过经纬度查找最近的城市
        const nearestCity = this.findNearestCity(res.latitude, res.longitude)
        if (nearestCity) {
          this.triggerEvent('select', {
            type: 'current',
            city: nearestCity
          })
        } else {
          wx.showToast({
            title: '定位异常，请手动选择您出发的城市',
            icon: 'none'
          })
        }
      } catch (err) {
        wx.showToast({
          title: '请手动选择您出发的城市',
          icon: 'none'
        })
      } finally {
        this.setData({ loading: false })
      }
    },

    // 查找最近的城市
    findNearestCity(lat, lon) {
      let nearestCity = null
      let minDistance = Infinity

      for (const [cityName, cityInfo] of Object.entries(this.data.cities)) {
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
    },

    // 切换省份展开状态
    toggleProvince(e) {
      const { province } = e.currentTarget.dataset
      console.log('切换省份:', province)
      console.log('当前展开省份:', this.data.expandedProvince)
      console.log('cities数据:', this.data.cities)
      this.setData({
        expandedProvince: this.data.expandedProvince === province ? '' : province
      })
      console.log('切换后展开省份:', this.data.expandedProvince)
    },

    // 选择城市
    selectCity(e) {
      const { city } = e.currentTarget.dataset
      console.log('选择城市:', city, this.data.cities[city])
      this.triggerEvent('select', {
        type: 'current',
        city: {
          name: city,
          ...this.data.cities[city]
        }
      })
    },

    // 关闭选择器
    close() {
      this.triggerEvent('close')
    },
  }
}) 