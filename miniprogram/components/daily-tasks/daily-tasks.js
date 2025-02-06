const dailyTaskManager = require('../../managers/daily-task-manager')
const packManager = require('../../managers/pack-manager')

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
    async initialize() {
      await dailyTaskManager.initialize()
      await this.loadPacksConfig()
      this.updateUI()
    },

    async loadPacksConfig() {
      try {
        const result = await wx.cloud.downloadFile({
          fileID: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/pack.json'
        })
        const fs = wx.getFileSystemManager()
        const content = fs.readFileSync(result.tempFilePath, 'utf8')
        this.setData({
          packsConfig: JSON.parse(content)
        })
      } catch (error) {
        console.error('加载卡包配置失败：', error)
      }
    },

    updateUI() {
      const { steps, kilometers } = dailyTaskManager.getTodayData()
      const tasks = dailyTaskManager.getAllTasks().map(task => ({
        ...task,
        status: dailyTaskManager.checkTaskStatus(task.id),
        packInfo: this.data.packsConfig ? this.data.packsConfig.find(p => p.id === task.reward) : null
      }))

      this.setData({
        tasks,
        todaySteps: steps,
        todayKm: kilometers,
        progress: dailyTaskManager.getProgress()
      })
    },

    async onTaskTap(e) {
      const { taskId } = e.currentTarget.dataset
      const result = await dailyTaskManager.claimTaskReward(taskId)

      if (!result.success) {
        wx.showToast({
          title: result.message,
          icon: 'none'
        })
        return
      }

      // 打开卡包
      await packManager.openPack(result.reward)
      this.updateUI()
    }
  }
}) 