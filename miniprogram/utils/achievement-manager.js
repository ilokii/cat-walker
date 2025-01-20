const achievements = require('../data/achievements')

class AchievementManager {
  constructor() {
    this.achievements = achievements
    this.upgradeQueue = []
  }

  // 计算勋章等级和进度
  calculateAchievement(type, value) {
    const achievement = this.achievements[type]
    if (!achievement) return null

    let currentLevel = 0
    let nextLevelValue = achievement.levels[0].nextValue
    let prevLevelValue = 0

    // 找到当前等级
    for (let i = 0; i < achievement.levels.length; i++) {
      if (value >= achievement.levels[i].nextValue) {
        currentLevel = i + 1
        prevLevelValue = achievement.levels[i].nextValue
        nextLevelValue = achievement.levels[i + 1]?.nextValue || achievement.levels[i].nextValue
      } else {
        break
      }
    }

    const isMaxLevel = currentLevel >= achievement.levels.length
    const progress = isMaxLevel ? 1 : 
      (value - prevLevelValue) / (nextLevelValue - prevLevelValue)

    return {
      id: achievement.id,
      name: achievement.name,
      level: currentLevel,
      value,
      nextValue: nextLevelValue,
      progress,
      isMaxLevel,
      icon: achievement.levels[Math.min(currentLevel, achievement.levels.length - 1)].icon
    }
  }

  // 检查勋章升级
  checkUpgrade(type, oldValue, newValue) {
    const oldAchievement = this.calculateAchievement(type, oldValue)
    const newAchievement = this.calculateAchievement(type, newValue)

    if (oldAchievement && newAchievement && newAchievement.level > oldAchievement.level) {
      this.upgradeQueue.push(newAchievement)
    }
  }

  // 获取下一个需要显示升级的勋章
  getNextUpgrade() {
    return this.upgradeQueue.shift()
  }

  // 检查是否还有待显示的升级勋章
  hasUpgrade() {
    return this.upgradeQueue.length > 0
  }

  // 计算省份数量
  calculateProvinceCount(visitedCities) {
    const provinces = new Set()
    visitedCities.forEach(city => {
      if (city.province) {
        provinces.add(city.province)
      }
    })
    return provinces.size
  }
}

module.exports = new AchievementManager() 