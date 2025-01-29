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
    console.log('开始随机星级，概率配置:', probability)
    const random = Math.random()
    console.log('随机数:', random)
    let sum = 0
    
    for (const [rarity, prob] of Object.entries(probability)) {
      sum += prob
      console.log(`当前星级: ${rarity}, 累计概率: ${sum}`)
      if (random < sum) {
        console.log('命中星级:', rarity)
        return parseInt(rarity)
      }
    }
    
    console.warn('未命中任何星级，使用最低星级')
    return parseInt(Object.keys(probability)[0])
  }

  // 从指定星级的卡牌中随机选择一张
  _randomCardByRarity(rarity) {
    console.log('开始随机选择卡牌，星级:', rarity)
    const currentSets = albumManager.getCurrentSets()
    console.log('当前赛季套牌:', currentSets)
    const allCards = []
    
    // 收集当前赛季所有指定星级的卡牌
    currentSets.forEach(set => {
      const setCards = albumManager.getSetCards(set.set_id)
      console.log(`套牌 ${set.set_id} 的卡牌:`, setCards)
      const rarityCards = setCards.filter(card => card.star === rarity)
      console.log(`套牌 ${set.set_id} 中 ${rarity}星卡牌:`, rarityCards)
      allCards.push(...rarityCards)
    })
    
    console.log(`${rarity}星级可选卡牌总数:`, allCards.length)
    if (allCards.length === 0) {
      console.warn(`没有找到${rarity}星级的卡牌`)
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * allCards.length)
    const selectedCard = allCards[randomIndex]
    console.log('随机选中的卡牌:', selectedCard)
    return selectedCard
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
    console.log('开始打开卡包，ID:', packId)
    const packInfo = this.packsData.find(pack => pack.id === packId)
    if (!packInfo) {
      console.error('未找到卡包信息:', packId)
      return null
    }
    console.log('卡包信息:', packInfo)

    const result = {
      newCards: [],
      totalStars: 0,
      cards: []
    }

    // 抽取卡牌
    console.log('开始抽取卡牌，数量:', packInfo.quantity)
    const collectedCards = new Set(syncManager.getCollectedCards())
    let duplicateStars = 0 // 用于记录重复卡牌转化的星星数量
    
    for (let i = 0; i < packInfo.quantity; i++) {
      console.log(`抽取第 ${i + 1} 张卡牌`)
      const card = this._drawCard(packInfo)
      if (!card) {
        console.warn('抽取卡牌失败')
        continue
      }
      console.log('抽到卡牌:', card)
      result.cards.push(card)

      // 检查是否为新卡
      const isNewCard = !collectedCards.has(card.card_id)
      console.log('是否为新卡:', isNewCard)
      if (isNewCard) {
        result.newCards.push(card)
        // 将新卡添加到已收集集合中，避免同一次开包重复标记新卡
        collectedCards.add(card.card_id)
        // 同步新卡到云存档
        await albumManager.addCard(card.card_id, card.set_id)
      } else {
        // 重复卡牌转化为星星
        duplicateStars += card.star
      }
    }

    // 保底机制检查
    console.log('检查保底机制')
    if (result.newCards.length === 0 && packInfo.guaranteed) {
      console.log('触发保底机制，重新抽取一张新卡')
      const guaranteedCard = this._drawNewCard(packInfo)
      if (guaranteedCard) {
        console.log('保底抽到新卡:', guaranteedCard)
        // 替换最后一张卡，并更新星星数量
        const replacedCard = result.cards[result.cards.length - 1]
        console.log('替换掉的卡牌:', replacedCard)
        duplicateStars -= replacedCard.star // 减去被替换卡牌的星星
        result.cards[result.cards.length - 1] = guaranteedCard
        result.newCards.push(guaranteedCard)
        // 同步保底新卡到云存档
        await albumManager.addCard(guaranteedCard.card_id, guaranteedCard.set_id)
      } else {
        console.warn('保底机制未能找到新卡')
      }
    }

    // 更新总星星数量
    result.totalStars = duplicateStars

    // 同步重复卡牌转化的星星到本地和云端
    if (duplicateStars > 0) {
      console.log('同步重复卡牌转化的星星:', duplicateStars)
      await syncManager.addStars(duplicateStars)
    }

    console.log('卡包开启结果:', result)
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
    console.log('开始抽卡，卡包信息:', packInfo)
    // 根据概率随机选择星级
    const rarity = this._randomRarity(packInfo.probability)
    console.log('随机选中星级:', rarity)
    
    if (!rarity) {
      console.error('未能确定卡牌星级')
      return null
    }
    
    // 随机选择指定星级的卡牌
    const card = this._randomCardByRarity(rarity)
    console.log('根据星级随机选中卡牌:', card)
    return card
  }
}

// 创建单例实例
const packManager = new PackManager()
module.exports = packManager 