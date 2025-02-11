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
    console.log('卡包管理器 - 构造函数')
    this.packsData = null
  }

  // 初始化卡包数据
  async init() {
    console.log('卡包管理器 - 开始初始化')
    try {
      // 优先使用 globalData 中的配置
      if (app.globalData.isPacksConfigLoaded && app.globalData.packsConfig) {
        console.log('卡包管理器 - 使用预加载的配置')
        this.packsData = app.globalData.packsConfig
        console.log('卡包管理器 - 初始化完成')
        return true
      }

      // 如果 globalData 中没有配置，则从云端加载
      await this.loadPacksData()
      console.log('卡包管理器 - 初始化完成')
      return true
    } catch (error) {
      console.error('卡包管理器 - 初始化失败：', error)
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
    console.log('卡包管理器 - 开始加载卡包数据')
    try {
      const { tempFilePath } = await wx.cloud.downloadFile({
        fileID: CLOUD_PATH.PACKS
      })
      this.packsData = await this.readJSONFile(tempFilePath)
      console.log('卡包管理器 - 加载卡包数据成功:', this.packsData)
    } catch (error) {
      console.error('卡包管理器 - 加载卡包数据失败：', error)
      throw error
    }
  }

  // 获取卡包信息
  getPackInfo(packId) {
    return this.packsData?.find(pack => pack.id === packId)
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
      console.warn(`卡包管理器 - 没有找到${rarity}星级的卡牌`)
      return null
    }
    
    const randomIndex = Math.floor(Math.random() * allCards.length)
    return allCards[randomIndex]
  }

  // 获取用户未收集的卡牌
  _getUncollectedCards() {
    console.log('卡包管理器 - 获取未收集的卡牌')
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
    
    console.log('卡包管理器 - 未收集的卡牌数量:', uncollectedCards.length)
    return uncollectedCards
  }

  // 开启卡包
  async openPack(packId) {
    console.log('卡包管理器 - 开始开启卡包:', packId)
    const packInfo = this.getPackInfo(packId)
    if (!packInfo) {
      console.error('卡包管理器 - 未找到卡包信息:', packId)
      return null
    }

    const result = {
      cards: [],
      newCards: [],
      totalStars: 0
    }

    console.log(`卡包管理器 - 开始开启卡包: ${packInfo.name}`)
    const collectedCards = new Set(syncManager.getCollectedCards())
    
    for (let i = 0; i < packInfo.quantity; i++) {
      let card
      
      // 检查是否需要保底
      if (packInfo.guaranteed && i === packInfo.quantity - 1 && result.newCards.length === 0) {
        console.log('卡包管理器 - 触发保底机制')
        card = await this._drawNewCard()
        if (!card) {
          card = this._drawCard(packInfo)
        }
      } else {
        card = this._drawCard(packInfo)
      }

      if (!card) continue

      // 检查是否为新卡
      const isNewCard = !collectedCards.has(card.card_id)
      if (isNewCard) {
        result.newCards.push(card)
        console.log(`卡包管理器 - 获得新卡: ${card.name}`)
        // 同步新卡到云端
        await albumManager.addCard(card.card_id, card.card_id.split('_').slice(0, -1).join('_'))
        collectedCards.add(card.card_id)
      } else {
        // 转换为星星
        result.totalStars += card.star
        console.log(`卡包管理器 - 重复卡转化为${card.star}星星: ${card.name}`)
      }

      result.cards.push(card)
    }

    // 同步星星到云端
    if (result.totalStars > 0) {
      await syncManager.addStars(result.totalStars)
    }

    console.log(`卡包管理器 - 开包完成，获得${result.newCards.length}张新卡，${result.totalStars}颗星星`)
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
  _drawNewCard() {
    console.log('卡包管理器 - 开始抽取保底新卡')
    // 获取所有未收集的卡牌
    const uncollectedCards = this._getUncollectedCards()
    console.log('卡包管理器 - 未收集的卡牌:', uncollectedCards)
    
    if (uncollectedCards.length === 0) {
      console.warn('卡包管理器 - 没有未收集的卡牌')
      return null
    }
    
    // 随机选择一张未收集的卡牌
    const randomIndex = Math.floor(Math.random() * uncollectedCards.length)
    const selectedCard = uncollectedCards[randomIndex]
    console.log('卡包管理器 - 选中的保底新卡:', selectedCard)
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