const albumManager = require('../../utils/album-manager')
const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    setInfo: null,
    isAlbumCompleted: false
  },

  onLoad: async function(options) {
    console.log('set-complete onLoad开始，参数:', options)
    const { setId } = options
    if (!setId) {
      wx.showToast({
        title: '参数错误',
        icon: 'error'
      })
      return
    }

    const currentSets = albumManager.getCurrentSets()
    console.log('当前所有套牌:', currentSets.map(set => ({
      set_id: set.set_id,
      name: set.name
    })))

    const setInfo = currentSets.find(set => set.set_id === setId)
    if (!setInfo) {
      wx.showToast({
        title: '套牌不存在',
        icon: 'error'
      })
      return
    }

    // 检查是否集齐整个卡册
    const collectedCards = syncManager.getCollectedCards()
    console.log('已收集的卡牌数量:', collectedCards.length)
    console.log('已收集的卡牌:', collectedCards)

    const completedSets = syncManager.getCompletedSets()
    console.log('已完成的套牌:', completedSets)

    // 检查每个套牌的完成状态
    const setCompletionStatus = {}
    const isAlbumCompleted = currentSets.every(set => {
      const setCards = albumManager.getSetCards(set.set_id)
      const isSetCompleted = setCards.every(card => collectedCards.includes(card.card_id))
      setCompletionStatus[set.set_id] = {
        total: setCards.length,
        collected: setCards.filter(card => collectedCards.includes(card.card_id)).length,
        isCompleted: isSetCompleted
      }
      return isSetCompleted
    })

    console.log('各套牌完成状态:', setCompletionStatus)
    console.log('整个卡册是否完成:', isAlbumCompleted)

    // 如果所有套牌都集齐了，检查是否可以升级
    if (isAlbumCompleted) {
      console.log('开始检查是否可以升级...')
      const currentLevel = syncManager.getCollectionLevel()
      console.log('当前收集等级:', currentLevel)
      const result = await syncManager.checkCollectionLevelUp()
      console.log('升级检查结果:', result)
    }

    this.setData({
      setInfo,
      isAlbumCompleted
    })
  },

  handleTap: function() {
    if (this.data.isAlbumCompleted) {
      // 如果相册已完成，跳转到相册完成界面
      wx.navigateTo({
        url: '/pages/album-complete/album-complete'
      })
    } else {
      // 返回到开包界面，让开包界面处理下一个完成的套牌
      wx.navigateBack()
    }
  }
}) 