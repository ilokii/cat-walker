const albumManager = require('../../utils/album-manager')
const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    currentAlbum: null,
    remainingTime: '',
    sets: [],
    collectionLevel: 1,
    totalProgress: {
      collected: 0,
      total: 0
    },
    totalProgressPercentage: 0
  },

  onLoad() {
    this.refreshData();
  },

  onShow() {
    console.log('album onShow')
    // 检查赛季是否结束
    albumManager.checkSeasonEnd()
    // 刷新数据
    this.refreshData()
  },

  refreshData() {
    // 获取当前赛季卡册
    const currentAlbum = albumManager.currentAlbum;
    console.log('当前卡册:', currentAlbum);
    
    // 获取当前赛季套牌
    const sets = albumManager.getCurrentSets();
    console.log('当前套牌列表:', sets);
    
    // 获取收集等级
    const collectionLevel = albumManager.userCollectionLevel;
    console.log('当前收集等级:', collectionLevel);
    
    // 计算总进度
    let totalCollected = 0;
    let totalCards = 0;
    
    sets.forEach(set => {
      const setCards = albumManager.getSetCards(set.set_id);
      const collectedCards = syncManager.getCollectedCards();
      
      const collected = setCards.filter(card => collectedCards.includes(card.card_id)).length;
      const total = setCards.length;
      
      set.progress = {
        collected,
        total
      };
      
      totalCollected += collected;
      totalCards += total;
    });
    
    const totalProgressPercentage = (totalCollected / totalCards) * 100;
    console.log('总进度:', {
      collected: totalCollected,
      total: totalCards,
      percentage: totalProgressPercentage
    });

    this.setData({
      currentAlbum,
      sets,
      collectionLevel,
      totalProgress: {
        collected: totalCollected,
        total: totalCards
      },
      totalProgressPercentage
    });

    // 更新倒计时
    this.updateCountdown();
  },

  updateCountdown() {
    const now = new Date();
    const endDate = new Date('2025-03-31T23:59:59');
    const diff = endDate - now;

    if (diff <= 0) {
      this.setData({
        remainingTime: '赛季已结束'
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    this.setData({
      remainingTime: `赛季剩余时间：${days}天${hours}小时`
    });
  },

  onImageError(e) {
    const { setId } = e.currentTarget.dataset;
    console.error('套牌图片加载失败:', setId);
    
    // 更新对应套牌的图片为默认图片
    const sets = this.data.sets;
    const setIndex = sets.findIndex(set => set.set_id === setId);
    
    if (setIndex !== -1) {
      const defaultSetImage = 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/default_set.png';
      sets[setIndex].res = defaultSetImage;
      
      this.setData({ sets }, () => {
        console.log('已更新套牌默认图片:', setId);
      });
    }
  },

  onSetTap(e) {
    const { setId } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/set-detail/set-detail?setId=${setId}`
    });
  },

  onClose() {
    wx.navigateBack();
  },

  onUnload() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }
}); 