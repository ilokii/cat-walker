const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  try {
    const { currentCity, targetCity, visitedCities, totalSteps, startSteps } = event

    // 更新用户数据
    const result = await db.collection('users').where({
      _openid: wxContext.OPENID
    }).update({
      data: {
        currentCity,
        targetCity,
        visitedCities,
        totalSteps,
        startSteps,
        updateTime: db.serverDate()
      }
    })

    return {
      success: true,
      updated: result.stats.updated
    }
  } catch (err) {
    console.error('同步数据失败：', err)
    throw err
  }
} 