const app = getApp()
const syncManager = require('./sync-manager')

// 云存储文件路径配置
const CLOUD_PATH = {
  ALBUMS: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/albums.json',
  SETS: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/sets.json',
  CARDS: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/config/cards.json',
  UNCOLLECTED_CARD: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/uncollect_card.png',
  ALBUM_ICON: 'cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/album.png'
}

class AlbumManager {
  constructor() {
    this.albumData = null
    this.setsData = null
    this.cardsData = null
    this.currentAlbum = null
  }

  // 初始化卡册数据
  async init() {
    try {
      await this.loadAlbumData()
      await this.loadSetsData()
      await this.loadCardsData()
      this.determineCurrentAlbum()
      return true
    } catch (error) {
      console.error('初始化卡册数据失败：', error)
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

  // 加载赛季数据
  async loadAlbumData() {
    try {
      const { tempFilePath } = await wx.cloud.downloadFile({
        fileID: CLOUD_PATH.ALBUMS
      })
      this.albumData = await this.readJSONFile(tempFilePath)
    } catch (error) {
      console.error('加载赛季数据失败：', error)
      throw error
    }
  }

  // 加载套牌数据
  async loadSetsData() {
    try {
      const { tempFilePath } = await wx.cloud.downloadFile({
        fileID: CLOUD_PATH.SETS
      })
      this.setsData = await this.readJSONFile(tempFilePath)
    } catch (error) {
      console.error('加载套牌数据失败：', error)
      throw error
    }
  }

  // 加载卡牌数据
  async loadCardsData() {
    try {
      const { tempFilePath } = await wx.cloud.downloadFile({
        fileID: CLOUD_PATH.CARDS
      })
      this.cardsData = await this.readJSONFile(tempFilePath)
    } catch (error) {
      console.error('加载卡牌数据失败：', error)
      throw error
    }
  }

  // 确定当前赛季
  determineCurrentAlbum() {
    const now = Math.floor(Date.now() / 1000)
    this.currentAlbum = this.albumData.albums.find(
      album => now >= album.start_time && now <= album.end_time
    )
    if (this.currentAlbum) {
      // 如果找到当前赛季，初始化赛季数据，但不保存
      syncManager.initSeasonData(this.currentAlbum.id, false)
    }
    return this.currentAlbum
  }

  // 获取当前赛季剩余时间
  getRemainingTime() {
    if (!this.currentAlbum) return null
    const now = Math.floor(Date.now() / 1000)
    const remaining = this.currentAlbum.end_time - now
    
    if (remaining <= 0) return null
    
    const days = Math.floor(remaining / 86400)
    const hours = Math.floor((remaining % 86400) / 3600)
    const minutes = Math.floor((remaining % 3600) / 60)
    const seconds = remaining % 60

    if (days > 0) {
      return `${days}天${hours}小时`
    } else {
      return `${hours}小时${minutes}分${seconds}秒`
    }
  }

  // 获取当前赛季套牌
  getCurrentSets() {
    if (!this.currentAlbum) return []
    const albumSets = this.setsData.find(sets => sets.id === this.currentAlbum.id)
    return albumSets ? albumSets.sets : []
  }

  // 获取套牌卡牌
  getSetCards(setId) {
    const setCards = this.cardsData.find(cards => cards.id === setId)
    return setCards ? setCards.cards : []
  }

  // 获取套牌收集进度
  async getSetProgress(setId) {
    try {
      const collectedCards = syncManager.getCollectedCards()
      const totalCards = this.getSetCards(setId).length
      const collectedSetCards = collectedCards.filter(cardId => cardId.startsWith(setId))
      
      return {
        collected: collectedSetCards.length,
        total: totalCards,
        collectionLevel: syncManager.getCollectionLevel()
      }
    } catch (error) {
      console.error('获取套牌收集进度失败：', error)
      return { collected: 0, total: 0, collectionLevel: 1 }
    }
  }

  // 获取用户卡牌收集状态
  async getUserCardStatus(setId) {
    try {
      const collectedCards = syncManager.getCollectedCards()
      return collectedCards.filter(cardId => cardId.startsWith(setId))
    } catch (error) {
      console.error('获取用户卡牌收集状态失败：', error)
      return []
    }
  }

  // 获取当前收集等级
  get userCollectionLevel() {
    return syncManager.getCollectionLevel()
  }

  // 获取当前赛季的收集等级
  getCurrentSeasonCollectionLevel() {
    if (!this.currentAlbum) return 1
    return syncManager.getCollectionLevel(this.currentAlbum.id)
  }

  // 添加收集到的卡牌
  async addCard(cardId, setId) {
    if (!this.currentAlbum) return false
    return await syncManager.addCollectedCard(this.currentAlbum.id, cardId, setId)
  }

  // 检查套牌是否已完成
  isSetCompleted(setId) {
    const completedSets = syncManager.getCompletedSets()
    return completedSets.includes(setId)
  }

  // 获取赛季收集等级
  getSeasonCollectionLevel(seasonId) {
    return syncManager.getCollectionLevel(seasonId)
  }
}

export default new AlbumManager() 