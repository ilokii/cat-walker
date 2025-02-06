const dailyTasks = require('../data/dailyTasks')
const syncManager = require('./sync-manager')

class DailyTaskManager {
  constructor() {
    console.log('每日任务管理器 - 构造函数')
    this.todaySteps = 0
    this.todayKm = 0
    this.completedTasks = new Set()
    this.lastCompletedDate = null
    this.isInitialized = false
  }

  // 初始化每日任务数据
  async initialize() {
    if (this.isInitialized) {
      console.log('每日任务管理器 - 已经初始化过，跳过初始化')
      return
    }

    console.log('每日任务管理器 - 开始初始化')
    try {
      await this.loadCompletedTasks()
      await this.checkAndResetDaily()
      await this.updateTodaySteps()
      this.isInitialized = true
      console.log('每日任务管理器 - 初始化完成:', {
        todaySteps: this.todaySteps,
        todayKm: this.todayKm,
        completedTasks: Array.from(this.completedTasks),
        lastCompletedDate: this.lastCompletedDate
      })
    } catch (error) {
      console.error('每日任务管理器 - 初始化失败:', error)
      throw error
    }
  }

  // 加载已完成的任务
  async loadCompletedTasks() {
    console.log('每日任务管理器 - 开始加载已完成任务')
    try {
      const storage = wx.getStorageSync('dailyTasks') || {}
      this.completedTasks = new Set(storage.completedTasks || [])
      this.lastCompletedDate = storage.lastCompletedDate
      console.log('每日任务管理器 - 加载已完成任务成功:', {
        completedTasks: Array.from(this.completedTasks),
        lastCompletedDate: this.lastCompletedDate
      })
    } catch (error) {
      console.error('每日任务管理器 - 加载已完成任务失败:', error)
      throw error
    }
  }

  // 检查并重置每日任务
  async checkAndResetDaily() {
    console.log('每日任务管理器 - 开始检查是否需要重置')
    const today = new Date().toDateString()
    if (this.lastCompletedDate !== today) {
      console.log('每日任务管理器 - 需要重置任务:', {
        lastCompletedDate: this.lastCompletedDate,
        today: today
      })
      this.completedTasks.clear()
      this.lastCompletedDate = today
      await this.saveCompletedTasks()
      console.log('每日任务管理器 - 重置完成')
    } else {
      console.log('每日任务管理器 - 不需要重置')
    }
  }

  // 更新今日步数
  async updateTodaySteps() {
    console.log('每日任务管理器 - 开始更新今日步数')
    try {
      const weRunData = await syncManager.getWeRunData()
      console.log('每日任务管理器 - 获取微信运动数据:', weRunData)
      
      if (weRunData && weRunData.length > 0) {
        const todayData = weRunData[weRunData.length - 1]
        console.log('每日任务管理器 - 今日步数数据:', todayData)
        
        this.todaySteps = todayData.step
        this.todayKm = (this.todaySteps * 0.7 / 1000).toFixed(2) // 按照0.7米/步计算
        
        console.log('每日任务管理器 - 更新步数完成:', {
          todaySteps: this.todaySteps,
          todayKm: this.todayKm
        })
      } else {
        console.warn('每日任务管理器 - 未获取到步数数据')
      }
    } catch (error) {
      console.error('每日任务管理器 - 更新今日步数失败:', error)
      throw error
    }
  }

  // 获取任务进度
  getProgress() {
    const maxSteps = dailyTasks[dailyTasks.length - 1].steps
    return Math.min(100, (this.todaySteps / maxSteps) * 100)
  }

  // 检查任务是否可领取
  checkTaskStatus(taskId) {
    const task = dailyTasks.find(t => t.id === taskId)
    if (!task) return 'invalid'
    
    if (this.completedTasks.has(taskId)) {
      return 'completed'
    }
    
    if (this.todaySteps >= task.steps) {
      return 'available'
    }
    
    return 'locked'
  }

  // 领取任务奖励
  async claimTaskReward(taskId) {
    const status = this.checkTaskStatus(taskId)
    if (status !== 'available') {
      return {
        success: false,
        message: status === 'completed' ? '该奖励已经领取，请明天再来吧' : '你尚未完成该任务，请继续走路吧'
      }
    }

    try {
      const task = dailyTasks.find(t => t.id === taskId)
      this.completedTasks.add(taskId)
      await this.saveCompletedTasks()
      
      // 同步到云端
      await this.syncToCloud()
      
      return {
        success: true,
        reward: task.reward
      }
    } catch (error) {
      console.error('领取奖励失败：', error)
      return {
        success: false,
        message: '领取奖励失败，请稍后重试'
      }
    }
  }

  // 保存完成的任务到本地
  async saveCompletedTasks() {
    try {
      wx.setStorageSync('dailyTasks', {
        completedTasks: Array.from(this.completedTasks),
        lastCompletedDate: this.lastCompletedDate
      })
    } catch (error) {
      console.error('保存每日任务数据失败：', error)
    }
  }

  // 同步数据到云端
  async syncToCloud() {
    try {
      await wx.cloud.callFunction({
        name: 'syncUserData',
        data: {
          dailyTasks: {
            completedTasks: Array.from(this.completedTasks),
            lastCompletedDate: this.lastCompletedDate
          }
        }
      })
    } catch (error) {
      console.error('同步每日任务数据到云端失败：', error)
    }
  }

  // 获取所有任务数据
  getAllTasks() {
    return dailyTasks
  }

  // 获取今日数据
  getTodayData() {
    return {
      steps: this.todaySteps,
      kilometers: this.todayKm
    }
  }
}

module.exports = new DailyTaskManager() 