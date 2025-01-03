// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  try {
    // 查询用户数据
    const userResult = await db.collection('users').where({
      openid: openid
    }).get()

    if (userResult.data.length > 0) {
      console.log('获取到的用户数据:', userResult.data[0])
      return {
        code: 0,
        data: {
          currentCity: userResult.data[0].currentCity,
          targetCity: userResult.data[0].targetCity,
          visitedCities: userResult.data[0].visitedCities || [],
          totalSteps: userResult.data[0].totalSteps || 0,
          startSteps: userResult.data[0].startSteps || 0,
          registerDate: userResult.data[0].registerDate,
          registerInitialSteps: userResult.data[0].registerInitialSteps
        }
      }
    } else {
      // 新用户，创建用户记录
      const newUser = {
        openid: openid,
        currentCity: null,
        targetCity: null,
        visitedCities: [],
        totalSteps: 0,
        startSteps: 0,
        createdAt: db.serverDate(),
        registerDate: new Date().toISOString(),
        registerInitialSteps: null
      }
      
      await db.collection('users').add({
        data: newUser
      })

      console.log('创建新用户:', newUser)
      return {
        code: 0,
        data: {
          currentCity: null,
          targetCity: null,
          visitedCities: [],
          totalSteps: 0,
          startSteps: 0,
          registerDate: newUser.registerDate,
          registerInitialSteps: newUser.registerInitialSteps
        }
      }
    }
  } catch (err) {
    console.error('获取用户数据失败:', err)
    return {
      code: -1,
      error: err.message || err
    }
  }
} 