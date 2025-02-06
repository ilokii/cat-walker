const dailyTasks = require('../data/dailyTasks')
const syncManager = require('../utils/sync-manager')

class DailyTaskManager {
  constructor() {
    this.todaySteps = 0
    this.todayKm = 0
    this.completedTasks = new Set()
    this.lastCompletedDate = null
  }

  // 初始化每日任务数据
  async initialize() {
    await this.loadCompletedTasks()
    await this.checkAndResetDaily()
    await this.updateTodaySteps()
  }

  // 加载已完成的任务
  async loadCompletedTasks() {
    try {
      const storage = wx.getStorageSync('dailyTasks') || {}
      this.completedTasks = new Set(storage.completedTasks || [])
      this.lastCompletedDate = storage.lastCompletedDate
    } catch (error) {
      console.error('加载每日任务数据失败：', error)
    }
  }

  // 检查并重置每日任务
  async checkAndResetDaily() {
    const today = new Date().toDateString()
    if (this.lastCompletedDate !== today) {
      this.completedTasks.clear()
      this.lastCompletedDate = today
      await this.saveCompletedTasks()
    }
  }

  // 更新今日步数
  async updateTodaySteps() {
    try {
      const weRunData = await syncManager.getWeRunData()
      if (weRunData && weRunData.length > 0) {
        // 获取最后一条数据（今日数据）
        const todayData = weRunData[weRunData.length - 1]
        this.todaySteps = todayData.step
        this.todayKm = (this.todaySteps * 0.7 / 1000).toFixed(2) // 按照0.7米/步计算
      }
    } catch (error) {
      console.error('获取今日步数失败：', error)
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