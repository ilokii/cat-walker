const app = getApp()
const syncManager = require('./sync-manager')
const albumManager = require('./album-manager')

// 云存储文件路径配置
const CLOUD_PATH = {
  PACKS: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/pack.json',
  STAR: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/star.png'
}

class PackManager {
  constructor() {
    this.packsData = null
  }

  // 初始化卡包数据
  async init() {
    try {
      await this.loadPacksData()
      return true
    } catch (error) {
      console.error('初始化卡包数据失败：', error)
      return false
    }
  }

  // 从临时文件路径读取JSON
  async readJSONFile(tempFilePath) {
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath: tempFilePath,
        encoding: 'utf-8',
        success: res => {
          try {
            const data = JSON.parse(res.data)
            resolve(data)
          } catch (e) {
            reject(e)
          }
        },
        fail: reject
      })
    })
  }

  // 加载卡包数据
  async loadPacksData() {
    try {
      const { tempFilePath } = await wx.cloud.downloadFile({
        fileID: CLOUD_PATH.PACKS
      })
      this.packsData = await this.readJSONFile(tempFilePath)
    } catch (error) {
      console.error('加载卡包数据失败：', error)
      throw error
    }
  }

  // 获取卡包信息
  getPackInfo(packId) {
    return this.packsData.find(pack => pack.id === packId)
  }

  // 随机选择星级
  _randomRarity(probability) {
    const random = Math.random()
    let sum = 0
    for (const [rarity, prob] of Object.entries(probability)) {
      sum += prob
      if (random < sum) {
        return parseInt(rarity)
      }
    }
    return parseInt(Object.keys(probability)[0])
  }

  // 从指定星级的卡牌中随机选择一张
  _randomCardByRarity(rarity) {
    const currentSets = albumManager.getCurrentSets()
    const allCards = []
    
    currentSets.forEach(set => {
      const setCards = albumManager.getSetCards(set.set_id)
      const rarityCards = setCards.filter(card => card.star === rarity)
      allCards.push(...rarityCards)
    })
    
    if (allCards.length === 0) {
      console.warn(`没有找到${rarity}星级的卡牌`)
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * allCards.length)
    return allCards[randomIndex]
  }

  // 获取用户未收集的卡牌
  _getUncollectedCards() {
    const currentSets = albumManager.getCurrentSets()
    const collectedCards = syncManager.getCollectedCards()
    const uncollectedCards = []
    
    currentSets.forEach(set => {
      const setCards = albumManager.getSetCards(set.set_id)
      setCards.forEach(card => {
        if (!collectedCards.includes(card.card_id)) {
          uncollectedCards.push(card)
        }
      })
    })
    
    return uncollectedCards
  }

  // 开启卡包
  async openPack(packId) {
    const packInfo = this.packsData.find(pack => pack.id === packId)
    if (!packInfo) {
      console.error('未找到卡包信息:', packId)
      return null
    }

    const result = {
      newCards: [],
      totalStars: 0,
      cards: []
    }

    console.log(`开始开启卡包: ${packInfo.name}`)
    const currentDrawnCards = []
    
    for (let i = 0; i < packInfo.quantity; i++) {
      const card = this._drawCard(packInfo)
      if (!card) continue
      
      result.cards.push(card)

      const addResult = await syncManager.addCollectedCard(
        albumManager.currentAlbum.id,
        card.card_id,
        card.card_id.split('_').slice(0, -1).join('_'),
        currentDrawnCards
      )

      if (addResult.isNewCard) {
        result.newCards.push(card)
        console.log(`获得新卡: ${card.name}`)
      } else if (addResult.isDuplicate) {
        result.totalStars += card.star
        console.log(`重复卡转化为${card.star}星星: ${card.name}`)
      }

      currentDrawnCards.push(card.card_id)
    }

    // 保底机制检查
    if (result.newCards.length === 0 && packInfo.guaranteed) {
      console.log('触发保底机制')
      const guaranteedCard = this._drawNewCard()
      if (guaranteedCard) {
        const replacedCard = result.cards[result.cards.length - 1]
        result.cards[result.cards.length - 1] = guaranteedCard
        
        const addResult = await syncManager.addCollectedCard(
          albumManager.currentAlbum.id,
          guaranteedCard.card_id,
          guaranteedCard.card_id.split('_').slice(0, -1).join('_'),
          currentDrawnCards
        )

        if (addResult.isNewCard) {
          result.newCards.push(guaranteedCard)
          console.log(`保底获得新卡: ${guaranteedCard.name}`)
        }
      }
    }

    console.log(`开包完成，获得${result.newCards.length}张新卡，${result.totalStars}颗星星`)
    return result
  }

  // 检查是否集齐所有卡牌
  _checkAlbumCompletion() {
    const currentSets = albumManager.getCurrentSets()
    const collectedCards = syncManager.getCollectedCards()
    
    return currentSets.every(set => {
      const setCards = albumManager.getSetCards(set.set_id)
      return setCards.every(card => collectedCards.includes(card.card_id))
    })
  }

  // 抽取一张新卡（用于保底机制）
  _drawNewCard(packInfo) {
    console.log('开始抽取保底新卡')
    // 获取所有未收集的卡牌
    const uncollectedCards = this._getUncollectedCards()
    console.log('未收集的卡牌:', uncollectedCards)
    
    if (uncollectedCards.length === 0) {
      console.warn('没有未收集的卡牌')
      return null
    }
    
    // 随机选择一张未收集的卡牌
    const randomIndex = Math.floor(Math.random() * uncollectedCards.length)
    const selectedCard = uncollectedCards[randomIndex]
    console.log('选中的保底新卡:', selectedCard)
    return selectedCard
  }

  _drawCard(packInfo) {
    const rarity = this._randomRarity(packInfo.probability)
    if (!rarity) return null
    return this._randomCardByRarity(rarity)
  }
}

// 创建单例实例
const packManager = new PackManager()
module.exports = packManager 