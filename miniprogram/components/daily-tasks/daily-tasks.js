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
        // 先更新UI，确保基础数据显示
        this.updateUI()
        console.log('每日任务组件 - 基础UI更新完成')

        // 然后加载卡包配置
        await this.loadPacksConfig()
        console.log('每日任务组件 - 卡包配置加载完成')

        // 再次更新UI以显示卡包图标
        this.updateUI()
        console.log('每日任务组件 - 完整UI更新完成')
      } catch (error) {
        console.error('每日任务组件初始化失败：', error)
      }
    },

    async loadPacksConfig() {
      console.log('每日任务组件 - 开始加载卡包配置')
      try {
        const result = await wx.cloud.downloadFile({
          fileID: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/pack.json'
        })
        console.log('每日任务组件 - 卡包配置下载成功')

        const fs = wx.getFileSystemManager()
        const content = fs.readFileSync(result.tempFilePath, 'utf8')
        const config = JSON.parse(content)
        console.log('每日任务组件 - 卡包配置解析成功:', config)

        this.setData({
          packsConfig: config
        })
      } catch (error) {
        console.error('每日任务组件 - 加载卡包配置失败：', error)
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

      const result = await dailyTaskManager.claimTaskReward(taskId)
      console.log('每日任务组件 - 领取结果:', result)

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