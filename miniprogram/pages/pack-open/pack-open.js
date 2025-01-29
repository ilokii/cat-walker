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
    starIconPath: CLOUD_PATH.STAR
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

      if (this.data.stage === 'unopened') {
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
        
        this.setData({
          openResult,
          stage: 'opened'
        });

        // 延迟显示转换动画
        setTimeout(() => {
          this.setData({ stage: 'converting' });
        }, 2000);

        // 延迟显示完成状态
        setTimeout(() => {
          this.setData({ stage: 'completed' });
        }, 4000);

      } else if (this.data.stage === 'completed') {
        // 返回卡包列表页
        wx.navigateBack();
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