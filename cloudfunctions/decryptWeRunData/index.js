// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const { cloudID } = event
    
    console.log('接收到的cloudID:', cloudID)
    
    // 解密微信运动数据
    const res = await cloud.getOpenData({
      list: [cloudID]
    })
    
    console.log('解密后的原始数据:', res)

    if (!res.list || !res.list[0] || !res.list[0].data) {
      throw new Error('解密数据为空')
    }

    const weRunData = res.list[0].data
    console.log('解析后的数据:', weRunData)

    if (!weRunData.stepInfoList) {
      throw new Error('步数数据不存在')
    }

    return {
      code: 0,
      data: weRunData.stepInfoList
    }
  } catch (err) {
    console.error('解密微信运动数据失败:', err)
    return {
      code: -1,
      error: err.message || err
    }
  }
} 