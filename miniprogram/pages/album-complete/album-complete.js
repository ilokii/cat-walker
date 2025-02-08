const albumManager = require('../../utils/album-manager')
const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    albumInfo: null,
    collectionLevel: 1,
    badgeIcon: ''
  },

  onLoad: async function() {
    const currentAlbum = albumManager.currentAlbum
    if (!currentAlbum) {
      wx.showToast({
        title: '获取赛季信息失败',
        icon: 'error'
      })
      return
    }

    // 获取升级前的收集等级（当前完成的等级）
    const completedLevel = syncManager.getCollectionLevel() - 1
    console.log('完成的收集等级:', completedLevel)
    
    // 获取徽章信息
    let badgeIcon = ''
    let badgeId = null
    let badgeLevel = null

    try {
      if (currentAlbum.rewards && currentAlbum.rewards[completedLevel]) {
        const rewardString = currentAlbum.rewards[completedLevel]
        if (rewardString && rewardString.includes('#')) {
          const [id, level] = rewardString.split('#')
          badgeId = parseInt(id)
          badgeLevel = parseInt(level)

          // 获取徽章配置
          const badgeConfig = await syncManager.getBadgeConfig()
          if (badgeConfig && badgeConfig.data) {
            const badge = badgeConfig.data.find(b => b.id === badgeId)
            if (badge) {
              const badgeLevelInfo = badge.levels.find(l => l.level === badgeLevel)
              if (badgeLevelInfo) {
                badgeIcon = badgeLevelInfo.icon
                console.log('获取到徽章图标路径:', badgeIcon)

                // 添加或更新徽章到存档
                try {
                  const isUpdated = await syncManager.addBadge(badgeId, badgeLevel)
                  if (isUpdated) {
                    console.log(`成功${isUpdated ? '更新' : '添加'}徽章 - ID: ${badgeId}, 等级: ${badgeLevel}`)
                  } else {
                    console.log('徽章已存在且等级未提升')
                  }
                } catch (error) {
                  console.error('保存徽章失败：', error)
                }
              }
            }
          }
        } else {
          console.warn('无效的勋章奖励格式:', rewardString)
        }
      } else {
        console.log('当前等级没有勋章奖励')
      }
    } catch (error) {
      console.error('处理勋章奖励时出错：', error)
    }
    
    this.setData({
      albumInfo: currentAlbum,
      collectionLevel: completedLevel, // 使用完成的等级
      badgeIcon
    })
  },

  handleTap: function() {
    // 返回主界面
    wx.navigateBack({
      delta: 3 // 返回三层，跳过卡包开启和套牌集齐界面
    })
  }
}) 