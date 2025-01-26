import albumManager from '../../utils/album-manager'

Page({
  data: {
    setId: '',
    setName: '',
    cards: [],
    collectedCards: [],
    collectionLevel: 1
  },

  onLoad: async function(options) {
    const { setId } = options
    this.setData({ setId })
    await this.loadSetData()
  },

  async loadSetData() {
    // 获取套牌卡牌数据
    const cards = albumManager.getSetCards(this.data.setId)
    
    // 获取用户收集状态
    const collectedCards = await albumManager.getUserCardStatus(this.data.setId)
    
    // 获取收集等级
    const collectionLevel = albumManager.getCurrentSeasonCollectionLevel()

    this.setData({
      cards,
      collectedCards,
      collectionLevel
    })
  },

  onClose() {
    wx.navigateBack()
  }
}) 