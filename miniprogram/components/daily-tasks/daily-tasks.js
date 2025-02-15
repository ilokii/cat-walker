const dailyTaskManager = require('../../utils/daily-task-manager')

Component({
  properties: {},

  data: {
    tasks: [],
    todaySteps: 0,
    todayKm: 0,
    progress: 0,
    packsConfig: null
  },

  lifetimes: {
    attached() {
      this.initialize()
    }
  },

  methods: {
    initialize() {
      try {
        // 直接使用预加载的配置
        const app = getApp()
        this.setData({ 
          packsConfig: app.globalData.packsConfig 
        }, () => {
          // 在设置完配置后立即更新UI
          this.updateUI()
        })
      } catch (error) {
        console.error('每日任务组件初始化失败：', error)
      }
    },

    updateUI() {
      const { steps, kilometers } = dailyTaskManager.getTodayData()
      const allTasks = dailyTaskManager.getAllTasks()

      const tasks = allTasks.map(task => {
        const status = dailyTaskManager.checkTaskStatus(task.id)
        const packInfo = this.data.packsConfig ? this.data.packsConfig.find(p => p.id === task.reward) : null
        return {
          ...task,
          status,
          packInfo
        }
      })

      const progress = dailyTaskManager.getProgress()

      this.setData({
        tasks,
        todaySteps: steps,
        todayKm: kilometers,
        progress
      })
    },

    async onTaskTap(e) {
      const { taskId } = e.currentTarget.dataset

      const status = dailyTaskManager.checkTaskStatus(taskId)

      if (status === 'locked') {
        wx.showToast({
          title: '你尚未完成该任务，请继续走路吧',
          icon: 'none'
        })
        return
      }

      if (status === 'completed') {
        wx.showToast({
          title: '该奖励已经领取，请明天再来吧',
          icon: 'none'
        })
        return
      }

      if (status === 'available') {
        const task = dailyTaskManager.getTask(taskId)
        if (!task) {
          return
        }

        // 跳转到卡包开启页面
        wx.navigateTo({
          url: `/pages/pack-open/pack-open?id=${task.reward}&taskId=${taskId}`,
          events: {
            // 监听卡包开启成功事件
            packOpenSuccess: () => {
              this.updateUI()
            }
          },
          fail: error => console.error('每日任务组件 - 跳转失败:', error)
        })
      }
    }
  }
}) 