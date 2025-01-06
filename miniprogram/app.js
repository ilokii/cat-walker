App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cat-walker-1gnvj0y102f12cab',
        traceUser: true,
      })
    }

    this.globalData = {
      userInfo: null,
      hasUserInfo: false,
      openid: '',
      isLogin: false
    }

    // 初始化登录
    this.initLogin()
  },

  // 初始化登录
  async initLogin() {
    try {
      const loginResult = await wx.cloud.callFunction({
        name: 'login'
      })

      if (loginResult.result) {
        this.globalData.openid = loginResult.result.openid
        this.globalData.isLogin = true

        // 获取用户信息
        const db = wx.cloud.database()
        const userResult = await db.collection('users').where({
          _openid: loginResult.result.openid
        }).get()

        if (userResult.data.length > 0) {
          this.globalData.userInfo = userResult.data[0]
          this.globalData.hasUserInfo = true

          // 检查是否有当前城市和目标城市
          if (!userResult.data[0].currentCity || !userResult.data[0].targetCity) {
            // 没有当前城市，跳转到城市选择页面
            wx.redirectTo({
              url: '/pages/city/city'
            })
          }
        }
        else {
          // 新用户，跳转到城市选择页面
          wx.redirectTo({
            url: '/pages/city/city'
          })
        }
      }
    } catch (err) {
      console.error('初始化登录失败：', err)
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      })
      // 登录失败也跳转到城市选择页面
      wx.redirectTo({
        url: '/pages/city/city'
      })
    }
  },

  // 检查用户是否授权微信运动
  checkWeRunAuth: function() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.werun']) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  // 获取微信运动步数
  getWeRunData: function() {
    return new Promise((resolve, reject) => {
      wx.getWeRunData({
        success: (res) => {
          const encryptedData = res.encryptedData
          const iv = res.iv
          // 暂时直接返回加密数据
          resolve({
            encryptedData,
            iv,
            cloudID: res.cloudID
          })
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  // 检查用户是否已登录
  checkLogin() {
    return this.globalData.isLogin
  },

  // 获取用户信息
  getUserInfo() {
    return this.globalData.userInfo
  },

  // 更新用户信息
  async updateUserInfo() {
    if (!this.globalData.openid) return null

    try {
      const db = wx.cloud.database()
      const result = await db.collection('users').where({
        _openid: this.globalData.openid
      }).get()

      if (result.data.length > 0) {
        this.globalData.userInfo = result.data[0]
        this.globalData.hasUserInfo = true
        return result.data[0]
      }
      return null
    } catch (err) {
      console.error('更新用户信息失败：', err)
      return null
    }
  }
}) 