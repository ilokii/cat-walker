const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  try {
    // 查找用户是否存在
    const userResult = await db.collection('users').where({
      _openid: wxContext.OPENID
    }).get()

    if (userResult.data.length === 0) {
      // 新用户，创建用户记录
      await db.collection('users').add({
        data: {
          _openid: wxContext.OPENID,
          registerDate: db.serverDate(),
          totalSteps: 0,
          currentCity: null,
          targetCity: null,
          startSteps: 0,
          visitedCities: [],
          isInitStepInfo: false,
          lastUpdateStepInfo: {
            date: null,
            steps: 0
          },
          updateTime: db.serverDate()
        }
      })
    }

    return {
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }
  } catch (err) {
    console.error('登录失败：', err)
    throw err
  }
} 