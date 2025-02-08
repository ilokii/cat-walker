const dailyTaskManager = require('../../utils/daily-task-manager')
const packManager = require('../../utils/pack-manager')

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
      console.log('每日任务组件 - attached')
      this.initialize()
    },

    ready() {
      console.log('每日任务组件 - ready')
    },

    detached() {
      console.log('每日任务组件 - detached')
    }
  },

  methods: {
    async initialize() {
      console.log('每日任务组件 - 开始初始化')
      try {
        // 从 globalData 获取卡包配置
        const app = getApp()
        this.setData({ packsConfig: app.globalData.packsConfig })
        console.log('每日任务组件 - 获取卡包配置:', this.data.packsConfig)

        // 更新UI
        this.updateUI()
        console.log('每日任务组件 - UI更新完成')
      } catch (error) {
        console.error('每日任务组件初始化失败：', error)
      }
    },

    updateUI() {
      console.log('每日任务组件 - 开始更新UI')
      const { steps, kilometers } = dailyTaskManager.getTodayData()
      console.log('每日任务组件 - 获取今日数据:', { steps, kilometers })

      const allTasks = dailyTaskManager.getAllTasks()
      console.log('每日任务组件 - 获取所有任务:', allTasks)

      const tasks = allTasks.map(task => {
        const status = dailyTaskManager.checkTaskStatus(task.id)
        const packInfo = this.data.packsConfig ? this.data.packsConfig.find(p => p.id === task.reward) : null
        console.log(`每日任务组件 - 任务${task.id}状态:`, { status, packInfo })
        return {
          ...task,
          status,
          packInfo
        }
      })

      const progress = dailyTaskManager.getProgress()
      console.log('每日任务组件 - 计算进度:', progress)

      this.setData({
        tasks,
        todaySteps: steps,
        todayKm: kilometers,
        progress
      })
      console.log('每日任务组件 - UI更新完成')
    },

    async onTaskTap(e) {
      const { taskId } = e.currentTarget.dataset
      console.log('每日任务组件 - 点击任务:', taskId)

      const status = dailyTaskManager.checkTaskStatus(taskId)
      console.log('每日任务组件 - 任务状态:', status)

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
          console.error('每日任务组件 - 未找到任务:', taskId)
          return
        }

        // 跳转到卡包开启页面
        wx.navigateTo({
          url: `/pages/pack-open/pack-open?id=${task.reward}&taskId=${taskId}`,
          events: {
            // 监听卡包开启成功事件
            packOpenSuccess: () => {
              console.log('每日任务组件 - 收到卡包开启成功事件')
              this.updateUI()
            }
          },
          success: () => console.log('每日任务组件 - 跳转到卡包开启页面'),
          fail: error => console.error('每日任务组件 - 跳转失败:', error)
        })
      }
    }
  }
}) 