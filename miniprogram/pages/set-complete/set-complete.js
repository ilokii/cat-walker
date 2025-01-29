const albumManager = require('../../utils/album-manager')
const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    setInfo: null,
    isAlbumCompleted: false
  },

  onLoad: async function(options) {
    const { setId } = options
    if (!setId) {
      wx.showToast({
        title: '参数错误',
        icon: 'error'
      })
      return
    }

    const currentSets = albumManager.getCurrentSets()
    const setInfo = currentSets.find(set => set.set_id === setId)
    if (!setInfo) {
      wx.showToast({
        title: '套牌不存在',
        icon: 'error'
      })
      return
    }

    // 检查是否集齐整个卡册
    const isAlbumCompleted = currentSets.every(set => {
      const setCards = albumManager.getSetCards(set.set_id)
      const collectedCards = syncManager.getCollectedCards()
      return setCards.every(card => collectedCards.includes(card.card_id))
    })

    // 如果所有套牌都集齐了，检查是否可以升级
    if (isAlbumCompleted) {
      await syncManager.checkCollectionLevelUp()
    }

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