App({
  onLaunch() {
    // 小程序启动时执行
    // 初始化云开发
    wx.cloud.init({
      env: 'cat-walker-1gnvj0y102f12cab', // 替换成你的云环境ID
      traceUser: true
    })
  }
}) 