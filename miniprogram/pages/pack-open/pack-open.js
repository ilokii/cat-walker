const packManager = require('../../utils/pack-manager')
const albumManager = require('../../utils/album-manager')

// 云存储文件路径配置
const CLOUD_PATH = {
  STAR: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/star.png'
}

Page({
  data: {
    packInfo: null,
    stage: 'unopened', // unopened, opened, converting, completed
    openResult: null,
    completedSet: null,
    isAlbumCompleted: false,
    starIconPath: CLOUD_PATH.STAR,
    showHint: true // 添加提示显示控制
  },

  // 判断是否为新卡
  isNewCard: function(cardId) {
    if (!this.data.openResult || !this.data.openResult.newCards) {
      console.log(`isNewCard检查失败：openResult或newCards为空`);
      return false;
    }
    
    console.log('当前所有新卡:', this.data.openResult.newCards.map(card => card.card_id));
    
    // 获取当前卡片在所有卡牌中的索引
    const currentIndex = this.data.openResult.cards.findIndex(card => card.card_id === cardId);
    console.log(`当前卡片 ${cardId} 在开包结果中的索引:`, currentIndex);
    
    // 检查在当前卡片之前是否已经出现过相同ID的卡片
    const hasDuplicateBefore = this.data.openResult.cards
      .slice(0, currentIndex)
      .some(card => card.card_id === cardId);
    
    if (hasDuplicateBefore) {
      console.log(`卡片 ${cardId} 在之前已经出现过，标记为重复卡`);
      return false;
    }
    
    // 如果之前没有出现过，再检查是否为新卡
    const isNew = this.data.openResult.newCards.some(card => {
      const match = card.card_id === cardId;
      console.log(`比较: 当前卡片ID ${cardId} vs 新卡ID ${card.card_id}, 结果: ${match}`);
      return match;
    });
    
    console.log(`最终判定卡片 ${cardId} 是否为新卡:`, isNew);
    return isNew;
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
          
          wx.hideLoading();
          
          if (!openResult) {
            wx.showToast({
              title: '开启失败',
              icon: 'error'
            });
            return;
          }

          console.log('开包结果详情:', {
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
          console.log('进入转化阶段前的状态:', {
            新卡列表: this.data.openResult.newCards.map(card => card.card_id),
            所有卡牌: this.data.openResult.cards.map(card => ({
              card_id: card.card_id,
              是否新卡: this.isNewCard(card.card_id)
            }))
          });
          
          // 如果全是新卡，直接跳到完成状态
          if (this.data.openResult.cards.length === this.data.openResult.newCards.length) {
            console.log('全是新卡，跳过转化阶段');
            this.setData({
              stage: 'completed',
              showHint: true
            });
          } else {
            console.log('存在重复卡牌，进入转化阶段');
            this.setData({
              stage: 'converting',
              showHint: true
            });
          }
          break;

        case 'converting':
          console.log('转化阶段的状态:', {
            新卡列表: this.data.openResult.newCards.map(card => card.card_id),
            所有卡牌: this.data.openResult.cards.map(card => ({
              card_id: card.card_id,
              是否新卡: this.isNewCard(card.card_id)
            }))
          });
          
          console.log('转化完成，进入完成状态');
          this.setData({
            stage: 'completed',
            showHint: true
          });
          break;

        case 'completed':
          // 返回卡包列表页
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
  },

  // 检查是否有集齐的套牌
  checkCompletedSet(newCards) {
    if (!newCards || newCards.length === 0) return null;

    const currentSets = albumManager.getCurrentSets();
    if (!currentSets || currentSets.length === 0) return null;

    for (const set of currentSets) {
      if (!set || !set.set_id) continue;
      
      const setCards = albumManager.getSetCards(set.set_id);
      if (!setCards || setCards.length === 0) continue;

      const userCards = albumManager.getUserCardStatus(set.set_id);
      if (!userCards) continue;

      const isCompleted = setCards.every(card => 
        userCards.includes(card.card_id)
      );
      
      if (isCompleted) {
        return set;
      }
    }
    return null;
  }
}) 