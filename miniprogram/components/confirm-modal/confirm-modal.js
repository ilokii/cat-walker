Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'normal' // normal: 普通确认, visited: 已访问城市确认
    },
    cityName: {
      type: String,
      value: ''
    }
  },

  data: {
    // 动画相关
    animationData: {},
    maskAnimation: {}
  },

  observers: {
    'visible': function(visible) {
      if (visible) {
        this.showModal()
      } else {
        this.hideModal()
      }
    }
  },

  methods: {
    // 显示弹窗动画
    showModal() {
      const animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      
      const maskAnimation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })

      maskAnimation.opacity(1).step()
      animation.translateY(0).step()

      this.setData({
        animationData: animation.export(),
        maskAnimation: maskAnimation.export()
      })
    },

    // 隐藏弹窗动画
    hideModal() {
      const animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in'
      })
      
      const maskAnimation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in'
      })

      maskAnimation.opacity(0).step()
      animation.translateY('100%').step()

      this.setData({
        animationData: animation.export(),
        maskAnimation: maskAnimation.export()
      })
    },

    // 取消按钮点击
    onCancel() {
      this.triggerEvent('cancel')
    },

    // 确认按钮点击
    onConfirm() {
      this.triggerEvent('confirm')
    },

    // 直接传送按钮点击
    onTeleport() {
      this.triggerEvent('teleport')
    },

    // 阻止冒泡
    preventBubble() {}
  }
}) 