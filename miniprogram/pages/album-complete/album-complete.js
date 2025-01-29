const albumManager = require('../../utils/album-manager')
const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    albumInfo: null,
    collectionLevel: 1,
    rewardIcon: ''
  },

  onLoad: function() {
    const currentAlbum = albumManager.currentAlbum
    if (!currentAlbum) {
      wx.showToast({
        title: '获取赛季信息失败',
        icon: 'error'
      })
      return
    }

    const collectionLevel = syncManager.getCollectionLevel()
    
    this.setData({
      albumInfo: currentAlbum,
      collectionLevel,
      rewardIcon: currentAlbum.rewards[collectionLevel] || ''
    })
  },

  handleTap: function() {
    // 返回主界面
    wx.navigateBack({
      delta: 3 // 返回三层，跳过卡包开启和套牌集齐界面
    })
  }
}) 