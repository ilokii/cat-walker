class SyncManager {
  constructor() {
    this.db = wx.cloud.database()
  }

  // 获取用户数据
  async getUserData() {
    try {
      const result = await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).get()

      if (result.data.length > 0) {
        return result.data[0]
      }
      return null
    } catch (err) {
      console.error('获取用户数据失败：', err)
      throw err
    }
  }

  // 同步用户数据
  async syncUserData(data) {
    try {
      return await wx.cloud.callFunction({
        name: 'syncUserData',
        data
      })
    } catch (err) {
      console.error('同步用户数据失败：', err)
      throw err
    }
  }

  // 更新当前城市
  async updateCurrentCity(cityName) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          currentCity: cityName,
          updateTime: this.db.serverDate()
        }
      })
    } catch (err) {
      console.error('更新当前城市失败：', err)
      throw err
    }
  }

  // 更新目标城市
  async updateTargetCity(cityName, startSteps) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          targetCity: cityName,
          startSteps,
          updateTime: this.db.serverDate()
        }
      })
    } catch (err) {
      console.error('更新目标城市失败：', err)
      throw err
    }
  }

  // 添加已访问城市
  async addVisitedCity(cityName) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          visitedCities: this.db.command.addToSet(cityName),
          updateTime: this.db.serverDate()
        }
      })
    } catch (err) {
      console.error('添加已访问城市失败：', err)
      throw err
    }
  }

  // 更新总步数
  async updateTotalSteps(steps) {
    try {
      await this.db.collection('users').where({
        _openid: getApp().globalData.openid
      }).update({
        data: {
          totalSteps: steps,
          updateTime: this.db.serverDate()
        }
      })
    } catch (err) {
      console.error('更新总步数失败：', err)
      throw err
    }
  }
}

module.exports = new SyncManager() 