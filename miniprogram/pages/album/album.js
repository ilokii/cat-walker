import albumManager from '../../utils/album-manager'

Page({
  data: {
    currentAlbum: null,
    remainingTime: '',
    sets: [],
    collectionLevel: 1
  },

  onLoad: async function() {
    await this.initAlbumData()
    this.startCountdown()
  },

  async initAlbumData() {
    await albumManager.init()
    const currentAlbum = albumManager.currentAlbum
    const sets = albumManager.getCurrentSets()

    // 获取每个套牌的收集进度
    for (let set of sets) {
      set.progress = await albumManager.getSetProgress(set.set_id)
    }

    this.setData({
      currentAlbum,
      sets,
      collectionLevel: albumManager.userCollectionLevel
    })
  },

  startCountdown() {
    // 每秒更新倒计时
    this.countdownTimer = setInterval(() => {
      const remainingTime = albumManager.getRemainingTime()
      this.setData({ remainingTime })
    }, 1000)
  },

  onSetTap(e) {
    const { setId } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/set-detail/set-detail?setId=${setId}`
    })
  },

  onClose() {
    wx.navigateBack()
  },

  onUnload() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer)
    }
  }
}) 