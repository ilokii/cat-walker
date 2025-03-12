Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    currentCity: {
      type: null,
      value: null
    }
  },

  data: {
    provinces: {},        // 省份数据
    cities: {},          // 城市数据
    expandedProvince: '', // 当前展开的省份
    loading: false       // 加载状态
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
    }
  },

  methods: {
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
      this.close()  // 选择后直接关闭选择器
    },

    // 关闭选择器
    close() {
      this.triggerEvent('close')
    }
  }
}) 