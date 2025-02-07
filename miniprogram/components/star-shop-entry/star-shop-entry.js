const packManager = require('../../utils/pack-manager')
const syncManager = require('../../utils/sync-manager')

const STAR_SHOP_CONFIG = {
  EXCHANGE_PRICE: 100,
  PACK_ID: 5
}

Component({
  properties: {},
  data: {
    stars: 0,
    showRedDot: false
  },
  lifetimes: {
    attached() {
      this.updateStars()
    }
  },
  methods: {
    // 更新星星数量和红点状态
    updateStars() {
      console.log('更新星星商店入口状态')
      const stars = syncManager.getStars()
      this.setData({
        stars,
        showRedDot: stars >= STAR_SHOP_CONFIG.EXCHANGE_PRICE
      })
    },
    onTap() {
      this.triggerEvent('showStarShop')
    }
  }
}) 