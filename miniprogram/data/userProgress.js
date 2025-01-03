// 创建新的进度数据
function createNewProgress() {
  return {
    currentCity: null,
    targetCity: null,
    totalSteps: 0,
    startSteps: 0,
    endSteps: 0,
    stepsToTarget: 0,
    dailySteps: {}, // 格式: { "2024-01-20": 8000 }
    lastSyncDate: null,
    registerDate: formatDate(new Date()), // 添加注册日期
    registerInitialSteps: null // 添加注册时的初始步数
  }
}

// 加载进度数据
function loadProgress() {
  let progress = wx.getStorageSync('userProgress')
  if (!progress) {
    progress = createNewProgress()
    saveProgress(progress)
    console.log('新用户注册，注册日期:', progress.registerDate)
  }
  return progress
}

// 保存进度数据
function saveProgress(progress) {
  wx.setStorageSync('userProgress', progress)
}

// 更新当前城市
function updateCurrentCity(progress, city) {
  progress.currentCity = city
  // 每次更换当前城市时，都将当前的 totalSteps 设为新的 startSteps
  progress.startSteps = progress.totalSteps
  progress.stepsToTarget = 0
  return progress
}

// 更新目标城市
function updateTargetCity(progress, city, requiredSteps) {
  progress.targetCity = city
  progress.endSteps = progress.startSteps + requiredSteps
  return progress
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 同步微信运动数据
async function syncWeRunData(progress) {
  try {
    // 检查是否有微信运动权限
    const auth = await new Promise((resolve) => {
      wx.getSetting({
        success: (res) => {
          resolve(res.authSetting['scope.werun'])
        },
        fail: () => {
          resolve(false)
        }
      })
    })

    if (!auth) {
      console.log('没有微信运动权限')
      return progress
    }

    // 获取微信运动数据
    const weRunData = await new Promise((resolve, reject) => {
      wx.getWeRunData({
        success: (res) => {
          console.log('获取到的加密数据:', res)
          // 调用云函数解密数据
          wx.cloud.callFunction({
            name: 'decryptWeRunData',
            data: {
              cloudID: res.cloudID
            },
            success: result => {
              console.log('云函数返回结果:', result)
              if (result.result && result.result.code === 0 && Array.isArray(result.result.data)) {
                resolve(result.result.data)
              } else {
                const error = result.result && result.result.error ? result.result.error : '解密失败'
                console.error('解密数据错误:', error)
                reject(new Error(error))
              }
            },
            fail: err => {
              console.error('云函数调用失败:', err)
              reject(err)
            }
          })
        },
        fail: err => {
          console.error('获取微信运动数据失败:', err)
          reject(err)
        }
      })
    })

    console.log('解密后的步数数据:', weRunData)
    
    if (!Array.isArray(weRunData)) {
      console.error('步数数据不是数组:', weRunData)
      return progress
    }

    if (weRunData.length === 0) {
      console.warn('步数数据为空数组')
      return progress
    }

    progress.dailySteps = {}
    
    // 获取注册日期的时间戳（当天0点）
    const registerDate = new Date(progress.registerDate)
    registerDate.setHours(0, 0, 0, 0)
    const registerTimestamp = Math.floor(registerDate.getTime() / 1000)

    // 获取注册时间（精确到分钟）
    const registerDateTime = new Date(progress.registerDate)
    const registerHourTimestamp = Math.floor(registerDateTime.getTime() / 1000)

    // 处理每天的步数数据
    weRunData.forEach(info => {
      if (info && typeof info.timestamp === 'number' && typeof info.step === 'number' && !isNaN(info.step)) {
        // 跳过注册日期之前的数据
        if (info.timestamp < registerTimestamp) {
          console.log(`跳过注册日期之前的数据: ${formatDate(new Date(info.timestamp * 1000))}`)
          return
        }

        const date = new Date(info.timestamp * 1000)
        const dateStr = formatDate(date)

        // 如果是注册当天的数据，需要特殊处理
        if (dateStr === progress.registerDate) {
          // 如果还没有记录注册时的初始步数，记录第一次同步时的步数
          if (progress.registerInitialSteps === null) {
            progress.registerInitialSteps = info.step
            console.log(`记录注册时的初始步数: ${info.step}`)
          }
          
          // 计算注册当天的实际步数（当前步数减去注册时的初始步数）
          const actualSteps = Math.max(0, info.step - progress.registerInitialSteps)
          console.log(`注册当天(${dateStr})的步数计算: 当前步数=${info.step}, 初始步数=${progress.registerInitialSteps}, 实际步数=${actualSteps}`)
          progress.dailySteps[dateStr] = actualSteps
        } else {
          // 如果不是注册当天，需要检查是否已经到达目标城市
          if (progress.targetCity) {
            const currentSteps = progress.totalSteps - progress.startSteps
            const targetSteps = progress.endSteps - progress.startSteps
            
            if (currentSteps >= targetSteps) {
              // 已经到达目标城市，不再累计新的步数
              console.log(`已到达目标城市，不累计新步数: ${dateStr}`)
              return
            } else {
              // 还未到达目标城市，检查是否需要限制步数
              const remainingSteps = targetSteps - currentSteps
              if (info.step > remainingSteps) {
                // 如果当天步数超过剩余所需步数，只记录所需的部分
                console.log(`${dateStr} 步数超出剩余所需，限制为${remainingSteps}步`)
                progress.dailySteps[dateStr] = remainingSteps
              } else {
                progress.dailySteps[dateStr] = info.step
              }
            }
          } else {
            // 没有目标城市时正常记录步数
            progress.dailySteps[dateStr] = info.step
          }
        }
        console.log(`${dateStr} 的步数:`, progress.dailySteps[dateStr])
      } else {
        console.warn('无效的步数数据:', info)
      }
    })

    if (Object.keys(progress.dailySteps).length === 0) {
      console.warn('没有有效的步数数据')
      return progress
    }

    console.log('当前progress.dailySteps:', progress.dailySteps)

    // 计算总步数
    let totalSteps = 0
    Object.values(progress.dailySteps).forEach(steps => {
      if (typeof steps === 'number' && !isNaN(steps)) {
        totalSteps += steps
      }
    })

    console.log('计算得到的总步数:', totalSteps)

    progress.totalSteps = totalSteps
    progress.lastSyncDate = formatDate(new Date())
    return progress
  } catch (error) {
    console.error('同步微信运动数据失败:', error)
    return progress
  }
}

module.exports = {
  createNewProgress,
  loadProgress,
  saveProgress,
  updateCurrentCity,
  updateTargetCity,
  syncWeRunData
} 