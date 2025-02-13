const albumManager = require('../../utils/album-manager')
const syncManager = require('../../utils/sync-manager')

// 云存储文件路径配置
const CLOUD_PATH = {
  UNCOLLECTED_CARD: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/uncollect_card.png',
  BASE_CARDS: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/cards'
}

Page({
  data: {
    setId: '',
    setInfo: null,
    cards: [],
    collectedCards: [],
    collectionLevel: 1,
    uncollectedCardPath: CLOUD_PATH.UNCOLLECTED_CARD,
    progress: {
      collected: 0,
      total: 0
    },
    progressPercentage: 0,
    showFullImage: false,
    currentImageUrl: ''
  },

  async onLoad(options) {
    console.log('set-detail onLoad, options:', options);
    const { setId } = options;
    if (!setId) {
      wx.showToast({
        title: '参数错误',
        icon: 'error'
      });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    // 获取套牌信息
    const currentSets = albumManager.getCurrentSets();
    console.log('当前所有套牌信息:', currentSets);
    
    const setInfo = currentSets.find(set => set.set_id === setId);
    console.log('当前套牌信息:', setInfo);
    
    if (!setInfo) {
      wx.showToast({
        title: '套牌不存在',
        icon: 'error'
      });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    this.setData({ 
      setId,
      setInfo
    });

    await this.loadSetData();
  },

  async loadSetData() {
    try {
      // 获取套牌卡牌数据
      const cards = albumManager.getSetCards(this.data.setId);
      console.log('套牌卡牌原始数据:', cards);
      
      // 获取已收集的卡牌ID列表
      const collectedCards = syncManager.getCollectedCards();
      console.log('已收集的卡牌ID列表:', collectedCards);
      
      // 获取收集等级
      const collectionLevel = albumManager.getCurrentSeasonCollectionLevel();
      console.log('当前收集等级:', collectionLevel);

      // 处理卡牌显示数据
      const processedCards = cards.map(card => {
        const isCollected = collectedCards.includes(card.card_id);
        
        // 根据收集状态设置显示资源
        const displayRes = isCollected ? card.res : this.data.uncollectedCardPath;
        
        const processedCard = {
          ...card,
          isCollected,
          displayRes,
          displayName: isCollected ? card.name : '？？？',
          imageLoadError: false
        };
        
        console.log('处理后的卡牌数据:', {
          card_id: processedCard.card_id,
          isCollected: processedCard.isCollected,
          displayRes: processedCard.displayRes,
          name: processedCard.displayName,
          originalRes: card.res
        });
        
        return processedCard;
      });

      // 计算收集进度
      const collected = processedCards.filter(card => card.isCollected).length;
      const total = processedCards.length;
      const progressPercentage = (collected / total) * 100;

      this.setData({
        cards: processedCards,
        collectedCards,
        collectionLevel,
        progress: {
          collected,
          total
        },
        progressPercentage
      }, () => {
        console.log('页面数据更新完成，当前data:', {
          setId: this.data.setId,
          collectedCount: this.data.progress.collected,
          totalCount: this.data.progress.total,
          cards: this.data.cards.map(card => ({
            card_id: card.card_id,
            isCollected: card.isCollected,
            displayRes: card.displayRes,
            originalRes: card.res
          }))
        });
      });
    } catch (error) {
      console.error('加载套牌数据失败：', error);
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      });
    }
  },

  onImageError(e) {
    const { cardId, type } = e.currentTarget.dataset;
    console.error(`图片加载失败 - ${type === 'reward' ? '奖励图片' : `卡牌ID: ${cardId}`}`, e);
    
    if (cardId) {
      console.log('卡牌图片加载失败，切换到未收集图片:', {
        cardId,
        newPath: CLOUD_PATH.UNCOLLECTED_CARD
      });
      
      const cards = this.data.cards;
      const cardIndex = cards.findIndex(card => card.card_id === cardId);
      if (cardIndex !== -1) {
        const updatedCard = {
          ...cards[cardIndex],
          displayRes: CLOUD_PATH.UNCOLLECTED_CARD,
          imageLoadError: true
        };
        cards[cardIndex] = updatedCard;
        this.setData({ cards }, () => {
          console.log('卡牌图片已更新:', {
            cardId,
            newPath: updatedCard.displayRes,
            isCollected: updatedCard.isCollected,
            originalRes: updatedCard.res
          });
        });
      }
    }
  },

  onClose() {
    wx.navigateBack();
  },

  // 处理卡片点击
  onCardTap(e) {
    const { isCollected, imageUrl } = e.currentTarget.dataset;
    
    // 只有已收集的卡片才显示大图
    if (isCollected) {
      this.setData({
        showFullImage: true,
        currentImageUrl: imageUrl
      });
    }
  },

  // 处理大图点击（关闭大图）
  onFullImageTap() {
    this.setData({
      showFullImage: false,
      currentImageUrl: ''
    });
  }
}); 