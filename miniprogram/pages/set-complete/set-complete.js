const albumManager = require('../../utils/album-manager')

Page({
  data: {
    setInfo: null,
    isAlbumCompleted: false
  },

  onLoad: function(options) {
    const { setId } = options
    if (!setId) {
      wx.showToast({
        title: '参数错误',
        icon: 'error'
      })
      return
    }

    const currentSets = albumManager.getCurrentSets()
    const setInfo = currentSets.find(set => set.id === setId)
    if (!setInfo) {
      wx.showToast({
        title: '套牌不存在',
        icon: 'error'
      })
      return
    }

    // 检查是否集齐整个卡册
    const isAlbumCompleted = currentSets.every(set => {
      const setCards = albumManager.getSetCards(set.id)
      return setCards.every(card => 
        albumManager.getUserCardStatus(set.id).includes(card.id)
      )
    })

    this.setData({
      setInfo,
      isAlbumCompleted
    })
  },

  handleTap: function() {
    if (this.data.isAlbumCompleted) {
      // 显示卡册集齐界面
      wx.navigateTo({
        url: '/pages/album-complete/album-complete'
      })
    } else {
      // 返回主界面
      wx.navigateBack({
        delta: 2 // 返回两层，跳过卡包开启界面
      })
    }
  }
}) 