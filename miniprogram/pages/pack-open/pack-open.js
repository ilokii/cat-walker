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
    showHint: true,
    initialSetStatus: {}, // 记录开卡前的套牌完成状态
    newlyCompletedSets: [], // 记录本次开卡完成的套牌
    currentCompletedSetIndex: 0, // 当前展示的完成套牌索引
  },

  // 判断是否为新卡
  isNewCard: function(cardId, cardIndex) {
    if (!this.data.openResult || !this.data.openResult.newCards) return false;
    const isNew = this.data.openResult.newCards.some(card => card.card_id === cardId);
    if (!isNew) return false;
    // 检查在当前卡之前是否已经出现过相同的卡
    for (let i = 0; i < cardIndex; i++) {
      if (this.data.openResult.cards[i].card_id === cardId) return false;
    }
    return true;
  },

  // 获取所有套牌的完成状态
  getSetCompletionStatus() {
    const currentSets = albumManager.getCurrentSets();
    const collectedCards = syncManager.getCollectedCards();
    const completedSets = syncManager.getCompletedSets();
    
    const status = {};
    for (const set of currentSets) {
      const setCards = albumManager.getSetCards(set.set_id);
      status[set.set_id] = {
        isCompleted: setCards.every(card => collectedCards.includes(card.card_id)),
        inCompletedList: completedSets.includes(set.set_id)
      };
    }
    return status;
  },

  async onLoad(options) {
    if (!options || !options.id) {
      wx.showToast({ title: '参数错误', icon: 'error' });
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
      wx.showToast({ title: '卡包不存在', icon: 'error' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    // 记录开卡前的套牌完成状态
    const initialSetStatus = this.getSetCompletionStatus();
    console.log('开卡前套牌状态:', initialSetStatus);

    this.setData({ 
      packInfo,
      initialSetStatus
    });
  },

  async handleTap() {
    try {
      if (!this.data.packInfo) {
        wx.showToast({ title: '卡包数据错误', icon: 'error' });
        setTimeout(() => wx.navigateBack(), 1500);
        return;
      }

      switch (this.data.stage) {
        case 'unopened':
          wx.showLoading({ title: '开启中...', mask: true });

          // 开启卡包
          const openResult = await packManager.openPack(this.data.packInfo.id);
          if (!openResult) {
            wx.hideLoading();
            wx.showToast({ title: '开启失败', icon: 'error' });
            return;
          }

          try {
            // 1. 更新本地数据
            await syncManager.syncFromCloud();
            
            // 2. 更新收集的卡牌
            for (const card of openResult.newCards) {
              if (!syncManager.localData.albumData.collectedCards.includes(card.card_id)) {
                syncManager.localData.albumData.collectedCards.push(card.card_id);
              }
            }

            // 3. 更新星星数量
            if (openResult.totalStars > 0) {
              syncManager.localData.albumData.stars += openResult.totalStars;
            }

            // 4. 获取开卡后的套牌状态
            const currentSetStatus = this.getSetCompletionStatus();
            console.log('开卡后套牌状态:', currentSetStatus);

            // 5. 找出新完成的套牌
            const newlyCompletedSets = [];
            const currentSets = albumManager.getCurrentSets();
            
            for (const set of currentSets) {
              const setId = set.set_id;
              // 只判断套牌是否从未完成变为完成，不考虑是否在完成列表中
              if (!this.data.initialSetStatus[setId].isCompleted && 
                  currentSetStatus[setId].isCompleted) {
                newlyCompletedSets.push(setId);
                // 将新完成的套牌添加到完成列表（如果还不在列表中）
                if (!syncManager.localData.albumData.completedSets.includes(setId)) {
                  syncManager.localData.albumData.completedSets.push(setId);
                }
              }
            }

            // 6. 保存数据到云端
            await syncManager.saveLocalData();
            await syncManager.syncFromCloud();

            console.log('新完成的套牌:', newlyCompletedSets);

            wx.hideLoading();
          
            this.setData({
              openResult,
              stage: 'opened',
              showHint: true,
              newlyCompletedSets,
              currentCompletedSetIndex: 0
            }, () => {
              console.log('页面数据更新完成:', {
                newlyCompletedSets: this.data.newlyCompletedSets,
                currentIndex: this.data.currentCompletedSetIndex
              });
            });

          } catch (error) {
            console.error('同步数据失败：', error);
          }
          break;

        case 'opened':
          // 处理套牌完成界面的展示
          if (this.data.newlyCompletedSets.length > 0 && 
              this.data.currentCompletedSetIndex < this.data.newlyCompletedSets.length) {
            const currentSetId = this.data.newlyCompletedSets[this.data.currentCompletedSetIndex];
            console.log('准备展示套牌完成界面:', currentSetId);
            
            wx.navigateTo({
              url: `/pages/set-complete/set-complete?setId=${currentSetId}`,
              success: () => {
                console.log('跳转到套牌完成页面成功');
                // 更新索引为下一个要展示的套牌
                this.setData({
                  currentCompletedSetIndex: this.data.currentCompletedSetIndex + 1
                });
              },
              fail: (err) => console.error('跳转到套牌完成页面失败:', err)
            });
          } else {
            console.log('没有新完成的套牌，直接返回');
            wx.navigateBack();
          }
          break;
      }
    } catch (error) {
      console.error('开启卡包失败：', error);
      wx.hideLoading();
      wx.showToast({ title: '开启失败', icon: 'error' });
    }
  }
}) 