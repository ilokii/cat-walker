const packManager = require('../../utils/pack-manager')
const albumManager = require('../../utils/album-manager')
const syncManager = require('../../utils/sync-manager')

// 云存储文件路径配置
const CLOUD_PATH = {
  STAR: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/star.png'
}

Page({
  data: {
    packInfo: null,
    stage: 'unopened', // unopened, opened
    openResult: null,
    showHint: true
  },

  // 判断是否为新卡
  isNewCard: function(cardId, cardIndex) {
    if (!this.data.openResult || !this.data.openResult.newCards) {
      return false;
    }

    // 检查是否是新卡
    const isNew = this.data.openResult.newCards.some(function(card) {
      return card.card_id === cardId;
    });

    if (!isNew) {
      return false;
    }

    // 检查在当前卡之前是否已经出现过相同的卡
    for (let i = 0; i < cardIndex; i++) {
      if (this.data.openResult.cards[i].card_id === cardId) {
        return false;  // 如果之前出现过相同的卡，就不算新卡
      }
    }

    return true;
  },

  async onLoad(options) {
    if (!options || !options.id) {
      wx.showToast({
        title: '参数错误',
        icon: 'error'
      });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    // 确保 packManager 已初始化
    if (!packManager.packsData) {
      await packManager.init();
    }

    const packId = parseInt(options.id);
    const packInfo = packManager.getPackInfo(packId);
    
    if (!packInfo) {
      wx.showToast({
        title: '卡包不存在',
        icon: 'error'
      });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    this.setData({ packInfo });
  },

  async handleTap() {
    try {
      // 检查数据是否正确加载
      if (!this.data.packInfo) {
        wx.showToast({
          title: '卡包数据错误',
          icon: 'error'
        });
        setTimeout(() => wx.navigateBack(), 1500);
        return;
      }

      switch (this.data.stage) {
        case 'unopened':
          wx.showLoading({
            title: '开启中...',
            mask: true
          });

          // 开启卡包
          const openResult = await packManager.openPack(this.data.packInfo.id);
          
          if (!openResult) {
            wx.hideLoading();
            wx.showToast({
              title: '开启失败',
              icon: 'error'
            });
            return;
          }

          // 一次性更新所有数据
          try {
            // 1. 更新本地数据
            const albumId = albumManager.currentAlbum.id;
            
            // 更新收集的卡牌
            for (const card of openResult.newCards) {
              const setId = card.card_id.split('_').slice(0, -1).join('_');
              syncManager.localData.albumData.collectedCards.push(card.card_id);
              
              // 检查套牌是否集齐
              const allSetCards = await syncManager.getAllSetCards(setId);
              const collectedSetCards = syncManager.localData.albumData.collectedCards.filter(id => id.startsWith(setId));
              if (allSetCards.length === collectedSetCards.length && 
                  !syncManager.localData.albumData.completedSets.includes(setId)) {
                syncManager.localData.albumData.completedSets.push(setId);
              }
            }

            // 更新星星数量
            if (openResult.totalStars > 0) {
              syncManager.localData.albumData.stars += openResult.totalStars;
            }

            // 2. 一次性同步到云端
            await syncManager.syncToCloud();
          } catch (error) {
            console.error('同步数据失败：', error);
          }

          wx.hideLoading();
          
          console.log('开包结果:', {
            总卡牌数: openResult.cards.length,
            新卡数量: openResult.newCards.length,
            获得星星: openResult.totalStars,
            所有卡牌: openResult.cards.map(card => ({
              card_id: card.card_id,
              是否新卡: openResult.newCards.some(newCard => newCard.card_id === card.card_id)
            }))
          });
          
          this.setData({
            openResult,
            stage: 'opened',
            showHint: true
          });
          break;

        case 'opened':
          // 直接返回卡包列表页
          wx.navigateBack();
          break;
      }
    } catch (error) {
      console.error('开启卡包失败：', error);
      wx.hideLoading();
      wx.showToast({
        title: '开启失败',
        icon: 'error'
      });
    }
  }
}) 