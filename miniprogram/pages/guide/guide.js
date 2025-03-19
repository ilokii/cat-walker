const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    currentStep: 0,
    opacity: 1,
    showContent: false,
    isAnimating: false,
    guides: [
      {
        image: 'guide_1',
        text: '疲惫的早晨被闹钟唤醒，又开始新一天的工作...'
      },
      {
        image: 'guide_2',
        text: '堆积如山的工作不知道要什么时候才能做完...'
      },
      {
        image: 'guide_3',
        text: '9点下班，10点到家，开始躺尸...'
      },
      {
        image: 'guide_4',
        text: '浑浑噩噩半夜2点，睡着后又要开始新的循环...'
      },
      {
        image: 'guide_4_1',
        text: '好想去旅游，见见那巍峨的高山...'
      },
      {
        image: 'guide_4_2',
        text: '看看那葱郁的森林...'
      },
      {
        image: 'guide_4_3',
        text: '望望那辽阔的大海...'
      },
      {
        image: 'guide_4_4',
        text: '然而...没有假期...'
      },
      {
        image: '',
        text: '朦朦胧胧迷了双眼，恍惚做了个奇怪的梦...',
        isBlackScreen: true
      },
      {
        image: 'guide_5',
        text: '自己变成了一只自由的猫咪，周游世界！',
        isLastStep: true
      }
    ]
  },

  onLoad() {
    const app = getApp()
    // 等待应用初始化完成
    if (typeof app.globalData.canShowGuide === 'undefined') {
      const checkTimer = setInterval(() => {
        if (typeof app.globalData.canShowGuide !== 'undefined') {
          clearInterval(checkTimer)
          this.setData({
            showContent: app.globalData.canShowGuide
          })
        }
      }, 50)
    } else {
      this.setData({
        showContent: app.globalData.canShowGuide
      })
    }
  },

  // 检查用户数据
  async checkUserData() {
    try {
      const userData = await syncManager.getUserData()
      if (userData && userData.currentCity && userData.targetCity) {
        // 检查微信运动授权
        const setting = await wx.getSetting()
        if (setting.authSetting['scope.werun']) {
          // 已授权，跳转到loading页面
          wx.redirectTo({
            url: '/pages/loading/loading'
          })
        } else {
          // 未授权，跳转到授权页面
          wx.redirectTo({
            url: '/pages/werun-auth/werun-auth'
          })
        }
      } else if (userData && userData.userAvatar) {
        // 跳转到城市选择页面
        wx.redirectTo({
          url: '/pages/city/city'
        })
      }
      // 如果没有用户数据，保持在引导页
    } catch (err) {
      console.error('检查用户数据失败：', err)
      // 出错时清除登录状态
      wx.removeStorageSync('openid')
    }
  },

  // 处理点击事件
  handleTap() {
    // 如果正在动画中或已经是最后一步，则不处理点击
    if (this.data.isAnimating || this.data.currentStep >= this.data.guides.length - 1) return
    
    // 设置动画状态为true
    this.setData({ 
      isAnimating: true,
      opacity: 0 
    })
    
    setTimeout(() => {
      // 切换到下一步
      this.setData({
        currentStep: this.data.currentStep + 1,
        opacity: 1
      })
      
      // 动画结束后，延迟重置动画状态
      setTimeout(() => {
        this.setData({ isAnimating: false })
      }, 500)
    }, 500)
  },

  // 跳转到用户信息初始化页面
  async handleStartExperience() {
    try {
      // 初始化本地数据
      const now = new Date()
      const localData = {
        userAvatar: null,
        startDate: now.toISOString(),
        registerDate: now.toISOString(),
        totalSteps: 0,
        totalStepsTemp: 0,
        isInitStepInfo: false,
        lastUpdateStepInfo: {
          date: new Date(1900, 0, 1, 0, 0, 0).toISOString(),
          steps: 0
        },
        visitedCities: [],
        currentCity: null,
        targetCity: null,
        badges: [],
        currentBadge: null,
        lastRefreshTime: now.toISOString(),
        albumData: {
          currentSeasonId: '',
          collectedCards: [],
          completedSets: [],
          collectionLevel: 1,
          stars: 0
        },
        dailyTaskData: {
          lastCompletedDate: null,
          completedTasks: []
        }
      }
      
      // 保存数据到本地
      await syncManager.updateLocalData(localData)
      
      // 跳转到用户信息初始化页面
      wx.redirectTo({
        url: '/pages/user-init/user-init'
      })
    } catch (error) {
      console.error('初始化数据失败：', error)
      wx.showToast({
        title: '初始化失败，请重试',
        icon: 'none'
      })
    }
  }
}) 