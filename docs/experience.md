# 文档维护规则

1. 记录时机
   - 在解决反复调试修改的 BUG 后及时记录
   - 发现有价值的开发经验时记录
   - 解决过的问题再次出现时，及时补充新的解决方案

2. 记录格式
   - 使用 Markdown 格式
   - 按照"问题描述 -> 原因分析 -> 解决方案"的结构
   - 代码片段使用代码块，并注明语言
   - 保持代码片段的简洁性，只展示关键部分

3. 记录内容要求
   - 问题描述要具体，避免模糊表述
   - 原因分析要深入，指出根本原因
   - 解决方案要完整，包含必要的代码和说明
   - 添加必要的注释和说明

4. 分类管理
   - 按照问题类型分类（如：组件通信、数据库操作等）
   - 相似问题归类到同一节下
   - 保持目录结构清晰

5. 文档更新
   - 发现更好的解决方案时及时更新
   - 保留原有解决方案，标注更新时间
   - 对过时的内容进行标注或清理

# 小程序开发经验总结

## 组件通信问题

### 1. 徽章更新不刷新问题
**问题描述**：
在用户更换徽章后，主界面的徽章显示没有及时更新。

**原因分析**：
1. 事件传递中的 `detail` 对象嵌套问题
2. 数据同步后没有触发界面刷新

**解决方案**：
1. 正确的事件触发方式：
```javascript
// user-modal.js 中触发事件
this.triggerEvent('close', { needRefresh: true })  // 不要重复嵌套 detail

// user-entry.js 中接收事件
onModalClose(e) {
  console.log('收到关闭事件:', e)
  this.setData({
    showUserModal: false
  })
  if (e.detail.needRefresh) {
    console.log('检测到需要刷新用户信息')
    this.updateUserInfo()
  }
}
```

2. 完整的数据更新流程：
```javascript
// 1. 更新数据库
const result = await db.collection('users').doc(userData._id).set({
  data: {
    ...restData,
    currentBadge: {
      id: selectedBadge.id,
      level: selectedBadge.level
    },
    updateTime: db.serverDate()
  }
})

// 2. 同步到本地存储
await syncManager.syncFromCloud()

// 3. 刷新界面显示
this.updateUserInfo()
```

### 2. 数据库字段更新问题
**问题描述**：
更新数据库时出现 "Cannot create field 'id' in element {currentBadge: null}" 错误。

**原因分析**：
数据库中的字段为 null 时，不能直接创建子字段。

**解决方案**：
使用 `set` 操作替代直接更新，确保完整的数据结构：
```javascript
// 正确的更新方式
const result = await db.collection('users').doc(userData._id).set({
  data: {
    ...restData,  // 保留其他字段
    currentBadge: {  // 设置完整的对象结构
      id: selectedBadge.id,
      level: selectedBadge.level
    },
    updateTime: db.serverDate()
  }
})
```

## 调试技巧

### 1. 关键节点日志
在关键操作节点添加日志，方便追踪数据流：
```javascript
// 数据更新流程日志
console.log('开始更新用户信息...')
console.log('获取到本地数据:', {
  currentBadge: localData.currentBadge,
  badges: localData.badges
})
console.log('准备更新界面显示:', {
  userAvatar,
  currentBadge,
  badgeIcon
})
console.log('用户信息更新完成')
```

### 2. 数据同步检查
在数据同步操作后，验证数据一致性：
```javascript
// 同步后检查数据
const updatedData = syncManager.getLocalData()
console.log('更新后的状态:', {
  currentBadge: updatedData.currentBadge,
  badges: updatedData.badges
})
```

## 最佳实践

1. 事件传递
   - 避免重复嵌套 `detail` 对象
   - 保持事件数据结构简单清晰
   - 添加必要的日志跟踪事件流转

2. 数据更新
   - 保持数据库、本地存储、界面三者的同步
   - 使用完整的数据结构进行更新
   - 更新后验证数据一致性

3. 错误处理
   - 添加适当的错误提示
   - 在出错时保持数据一致性
   - 提供用户友好的错误反馈 