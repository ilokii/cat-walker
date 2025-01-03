const { citiesData } = require('../data/cities.js')

// 计算两个坐标点之间的距离（使用 Haversine 公式）
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// 根据坐标找到最近的城市
const findNearestCity = (latitude, longitude) => {
  let nearestCity = null
  let minDistance = Infinity

  Object.entries(citiesData).forEach(([cityName, cityData]) => {
    const distance = calculateDistance(
      latitude,
      longitude,
      cityData.location.lat,
      cityData.location.lon
    )

    if (distance < minDistance) {
      minDistance = distance
      nearestCity = cityName
    }
  })

  return minDistance <= 200 ? nearestCity : null
}

// 导出函数
module.exports = {
  getUserLocation: () => {
    return new Promise((resolve, reject) => {
      if (!wx.getLocation) {
        reject(new Error('不支持地理定位'))
        return
      }

      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          const { latitude, longitude } = res
          const nearestCity = findNearestCity(latitude, longitude)
          if (nearestCity) {
            resolve(nearestCity)
          } else {
            reject(new Error('无法找到匹配的城市'))
          }
        },
        fail: reject
      })
    })
  },

  getSelectableCities: () => {
    const cities = {}
    
    Object.entries(citiesData).forEach(([cityName, cityData]) => {
      const { province } = cityData
      if (!cities[province]) {
        cities[province] = []
      }
      cities[province].push(cityName)
    })

    return cities
  },

  isValidCity: (cityName) => {
    return cityName in citiesData
  }
} 