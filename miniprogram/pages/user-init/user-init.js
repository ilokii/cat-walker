const app = getApp()
const syncManager = require('../../utils/sync-manager')

Page({
  data: {
    avatarList: [],
    selectedAvatarIndex: 0,
    showConfirmModal: false
  },

  onLoad: function() {
    // 初始化头像列表
    const avatarList = []
    for (let i = 1; i <= 9; i++) {
      avatarList.push(`cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/avatars/cat${i}.png`)
    }
    
    // 随机选择一个默认头像
    const randomIndex = Math.floor(Math.random() * avatarList.length)
    
    this.setData({
      avatarList,
      selectedAvatarIndex: randomIndex
    })
  },

  onSelectAvatar: function(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectedAvatarIndex: index
    })
  },

  onConfirm: function() {
    // 显示确认弹窗
    this.setData({
      showConfirmModal: true
    })
  },

  onModalCancel: function() {
    this.setData({
      showConfirmModal: false
    })
  },

  onModalConfirm: function() {
    const { avatarList, selectedAvatarIndex } = this.data
    const userAvatar = avatarList[selectedAvatarIndex]

    // 更新本地和云端数据
    const userData = {
      userAvatar
    }

    syncManager.updateUserData(userData)
      .then(() => {
        return syncManager.getUserData()
      })
      .then(currentUserData => {
        if (!currentUserData.currentCity || !currentUserData.targetCity) {
          wx.redirectTo({
            url: '/pages/city/city'
          })
        } else {
          wx.redirectTo({
            url: '/pages/loading/loading'
          })
        }
      })
      .catch(error => {
        console.error('保存用户信息失败:', error)
        wx.showToast({
          title: '保存失败，请重试',
          icon: 'none'
        })
      })
  }
}) 