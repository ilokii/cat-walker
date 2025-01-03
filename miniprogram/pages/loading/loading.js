const app = getApp()

Page({
  data: {},

  onLoad: function() {
    // 获取用户数据
    app.getUserData().then(() => {
      const globalData = app.globalData
      if (globalData.currentCity && globalData.targetCity) {
        // 如果已有当前城市和目标城市，直接进入主页
        wx.reLaunch({
          url: '/pages/index/index'
        })
      } else {
        // 如果缺少任何一个城市信息，进入城市选择页面
        wx.reLaunch({
          url: '/pages/city-select/city-select'
        })
      }
    })
  }
}) 