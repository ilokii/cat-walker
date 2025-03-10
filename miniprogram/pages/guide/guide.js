Page({
  data: {
    // 预留数据字段
  },

  onLoad() {
    // 检查登录状态
    const app = getApp()
    if (app.globalData.openid) {
      // 已登录，直接进入 loading 页面
      wx.redirectTo({
        url: '/pages/loading/loading'
      })
    }
  },

  // 跳转到登录页
  handleStartExperience() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  }
}) 