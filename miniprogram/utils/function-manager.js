/**
 * 功能开关管理器
 * 统一管理所有功能的显示/隐藏状态
 */

// 功能开关的默认配置
const DEFAULT_CONFIG = {
  // 首页功能
  dailyTasks: false,      // 每日任务模块
  
  // 用户功能
  userBadge: false,       // 控制所有徽章相关的显示（用户头像旁徽章、账户界面徽章等）
  albumEntry: false       // 控制卡牌功能（入口显示、数据加载等）
}

// 当前功能开关状态
let currentConfig = { ...DEFAULT_CONFIG }

const FunctionManager = {
  /**
   * 初始化功能管理器
   * @param {Object} config 可选的初始配置
   */
  init(config = {}) {
    currentConfig = {
      ...DEFAULT_CONFIG,
      ...config
    }
    console.log('功能管理器初始化完成:', currentConfig)
  },

  /**
   * 获取指定功能的开关状态
   * @param {string} feature 功能名称
   * @returns {boolean} 功能是否启用
   */
  isEnabled(feature) {
    if (!(feature in currentConfig)) {
      console.warn(`未找到功能配置: ${feature}`)
      return false
    }
    return currentConfig[feature]
  },

  /**
   * 设置指定功能的开关状态
   * @param {string} feature 功能名称
   * @param {boolean} enabled 是否启用
   * @returns {boolean} 设置是否成功
   */
  setEnabled(feature, enabled) {
    if (!(feature in currentConfig)) {
      console.warn(`未找到功能配置: ${feature}`)
      return false
    }
    currentConfig[feature] = enabled
    console.log(`功能 ${feature} 已${enabled ? '启用' : '禁用'}`)
    return true
  },

  /**
   * 批量设置功能开关状态
   * @param {Object} config 功能配置对象
   */
  batchSetEnabled(config) {
    Object.entries(config).forEach(([feature, enabled]) => {
      this.setEnabled(feature, enabled)
    })
  },

  /**
   * 获取所有功能的当前状态
   * @returns {Object} 当前配置
   */
  getAllConfig() {
    return { ...currentConfig }
  },

  /**
   * 重置所有功能为默认状态
   */
  resetToDefault() {
    currentConfig = { ...DEFAULT_CONFIG }
    console.log('所有功能已重置为默认状态')
  }
}

module.exports = FunctionManager 