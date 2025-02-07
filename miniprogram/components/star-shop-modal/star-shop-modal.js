const packManager = require('../../utils/pack-manager')
const syncManager = require('../../utils/sync-manager')

const STAR_SHOP_CONFIG = {
  EXCHANGE_PRICE: 100,
  PACK_ID: 5
}

Component({
  properties: {},
  data: {
    packInfo: null,
    stars: 0,
    canExchange: false,
    STAR_SHOP_CONFIG: STAR_SHOP_CONFIG
  },
  lifetimes: {
    attached() {
      const packInfo = packManager.getPackInfo(STAR_SHOP_CONFIG.PACK_ID)
      const stars = syncManager.getStars()
      this.setData({
        packInfo,
        stars,
        canExchange: stars >= STAR_SHOP_CONFIG.EXCHANGE_PRICE
      })
    }
  },
  methods: {
    onClose() {
      this.triggerEvent('close')
    },
    async onExchange() {
      if (!this.data.canExchange) {
        wx.showToast({
          title: '星星不足，获取重复的卡牌将会获得星星',
          icon: 'none',
          duration: 2000
        })
        return
      }
      
      // 关闭弹窗
      this.triggerEvent('close')
      
      // 打开开卡界面，使用 id 作为参数名，并传递星星价格
      wx.navigateTo({
        url: `/pages/pack-open/pack-open?id=${Number(STAR_SHOP_CONFIG.PACK_ID)}&fromStarShop=true&starCost=${STAR_SHOP_CONFIG.EXCHANGE_PRICE}`
      })
    }
  }
}) 