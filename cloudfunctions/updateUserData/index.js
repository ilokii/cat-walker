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

  console.log('收到的更新数据:', event)
  console.log('当前用户openid:', openid)

  try {
    // 查询用户是否存在
    const userQuery = await db.collection('users').where({
      openid: openid
    }).get()
    
    console.log('查询用户结果:', userQuery)

    // 准备要保存的数据
    let userData = {
      openid: openid,
      lastUpdated: db.serverDate()
    }

    if (userQuery.data.length > 0) {
      // 如果用户存在，保留现有数据
      const existingUser = userQuery.data[0]
      userData = {
        ...existingUser,
        lastUpdated: db.serverDate()
      }

      // 更新访问记录
      if (event.currentCity && !userData.visitedCities.some(v => v === event.currentCity.name)) {
        userData.visitedCities = userData.visitedCities || []
        userData.visitedCities.push(event.currentCity.name)
      }
    } else {
      // 新用户
      userData.createdAt = db.serverDate()
      userData.registerDate = event.registerDate || new Date().toISOString()
      userData.visitedCities = []
      userData.totalSteps = 0
      userData.startSteps = 0
      if (event.currentCity) {
        userData.visitedCities.push(event.currentCity.name)
      }
    }

    // 更新城市数据
    if (event.currentCity) {
      userData.currentCity = event.currentCity.name
    }

    if (event.targetCity) {
      userData.targetCity = event.targetCity.name
    }

    // 更新步数数据
    if (event.totalSteps !== undefined) {
      userData.totalSteps = event.totalSteps
    }
    if (event.startSteps !== undefined) {
      userData.startSteps = event.startSteps
    }
    if (event.registerInitialSteps !== undefined) {
      userData.registerInitialSteps = event.registerInitialSteps
    }

    console.log('准备保存的完整用户数据:', userData)

    // 删除现有文档
    if (userQuery.data.length > 0) {
      await db.collection('users').where({
        openid: openid
      }).remove()
    }

    // 创建新文档
    await db.collection('users').add({
      data: userData
    })

    return {
      code: 0,
      data: {
        currentCity: userData.currentCity,
        targetCity: userData.targetCity,
        visitedCities: userData.visitedCities,
        totalSteps: userData.totalSteps,
        startSteps: userData.startSteps,
        registerDate: userData.registerDate,
        registerInitialSteps: userData.registerInitialSteps
      }
    }
  } catch (err) {
    console.error('更新用户数据失败:', err)
    return {
      code: -1,
      error: err.message || err
    }
  }
} 