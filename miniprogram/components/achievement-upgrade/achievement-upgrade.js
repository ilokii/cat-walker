Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    achievement: {
      type: Object,
      value: null
    },
    isMaxLevel: {
      type: Boolean,
      value: false
    }
  },

  data: {
    envId: ''
  },

  lifetimes: {
    attached() {
      this.setData({
        envId: getApp().globalData.envId
      })
    }
  },

  methods: {
    onConfirm() {
      this.triggerEvent('confirm')
    }
  }
}) 