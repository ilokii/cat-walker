class PackManager {
  constructor() {
    this.packs = null;
  }

  async loadPacksData() {
    try {
      const fileID = 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/pack.json';
      const result = await wx.cloud.downloadFile({ fileID });
      const data = await readJSONFile(result.tempFilePath);
      this.packs = data;
      console.log('加载卡包数据成功：', this.packs);
    } catch (error) {
      console.error('加载卡包数据失败：', error);
      throw error;
    }
  }

  getPack(packId) {
    return this.packs?.find(pack => pack.id === packId);
  }

  async openPack(packId) {
    const packInfo = this.getPack(packId);
    if (!packInfo) {
      console.error('卡包不存在：', packId);
      return null;
    }

    console.log('开启卡包：', packInfo);
    const result = {
      cards: [],
      newCards: [],
      totalStars: 0
    };

    // 获取已收集的卡牌
    const collectedCards = new Set(syncManager.getCollectedCards());

    // 抽取指定数量的卡牌
    for (let i = 0; i < packInfo.quantity; i++) {
      let card;
      
      // 检查是否需要保底
      if (packInfo.guaranteed && i === packInfo.quantity - 1 && result.newCards.length === 0) {
        card = await this._drawNewCard();
        if (!card) {
          card = await this._drawCard(); // 如果没有新卡可抽，则抽普通卡
        }
      } else {
        card = await this._drawCard();
      }

      if (!card) continue;

      // 检查是否为新卡
      const isNewCard = !collectedCards.has(card.card_id);
      if (isNewCard) {
        result.newCards.push(card);
        // 同步新卡到云端
        await albumManager.addCard(card.card_id, card.card_id.split('_').slice(0, -1).join('_'));
        collectedCards.add(card.card_id); // 更新本地缓存
      } else {
        // 转换为星星
        result.totalStars += card.star;
      }

      result.cards.push(card);
    }

    // 同步星星到云端
    if (result.totalStars > 0) {
      await syncManager.addStars(result.totalStars);
    }

    return result;
  }

  async _drawCard() {
    const sets = albumManager.getCurrentSets();
    if (!sets || sets.length === 0) {
      console.warn('没有可用的卡牌集');
      return null;
    }

    // 随机选择一个卡牌集
    const randomSet = sets[Math.floor(Math.random() * sets.length)];
    const setCards = albumManager.getSetCards(randomSet.set_id);
    if (!setCards || setCards.length === 0) {
      console.warn('卡牌集中没有卡牌：', randomSet);
      return null;
    }

    // 随机选择一张卡牌
    const card = setCards[Math.floor(Math.random() * setCards.length)];
    console.log('抽到卡牌：', card);
    return card;
  }

  async _drawNewCard() {
    console.log('尝试抽取新卡');
    const sets = albumManager.getCurrentSets();
    if (!sets || sets.length === 0) {
      console.warn('没有可用的卡牌集');
      return null;
    }

    // 获取已收集的卡牌
    const collectedCards = syncManager.getCollectedCards();

    // 获取所有未收集的卡牌
    const uncollectedCards = [];
    for (const set of sets) {
      const setCards = albumManager.getSetCards(set.set_id);
      if (!setCards) continue;

      for (const card of setCards) {
        if (!collectedCards.includes(card.card_id)) {
          uncollectedCards.push(card);
        }
      }
    }

    if (uncollectedCards.length === 0) {
      console.warn('没有未收集的卡牌');
      return null;
    }

    // 随机选择一张未收集的卡牌
    const card = uncollectedCards[Math.floor(Math.random() * uncollectedCards.length)];
    console.log('抽到新卡：', card);
    return card;
  }
} 