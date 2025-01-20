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

  methods: {
    onConfirm() {
      this.triggerEvent('confirm')
    }
  }
}) 