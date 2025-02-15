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

### 3. 列表渲染性能优化
**问题描述**：
使用 `wx:for` 进行列表渲染时出现警告：
```
[WXML Runtime warning] Now you can provide attr `wx:key` for a `wx:for` to improve performance.
```

**原因分析**：
1. 微信小程序中，`wx:for` 循环如果没有指定 `wx:key`，会影响性能
2. 当列表数据发生变化时，如果没有 key，小程序需要重新渲染整个列表
3. 有了唯一的 key，小程序可以精确找到需要更新的项，提高渲染效率

**解决方案**：
1. 为 `wx:for` 添加合适的 `wx:key`：
```xml
<!-- 使用数组索引作为 key -->
<view wx:for="{{list}}" 
      wx:for-index="index" 
      wx:key="index">
  {{item.name}}
</view>

<!-- 使用唯一标识作为 key -->
<view wx:for="{{list}}" 
      wx:key="id">
  {{item.name}}
</view>
```

2. 最佳实践：
   - 优先使用数据项中的唯一字段（如 id）作为 key
   - 如果数据项本身是唯一的字符串，可以使用 `*this`
   - 在没有唯一值时，可以使用索引（index）作为 key
   - 避免使用可能重复的值作为 key

3. 性能影响：
   - 添加 `wx:key` 可以提高列表的更新性能
   - 特别是在列表数据频繁变化的场景下更为重要
   - 有助于减少不必要的 DOM 操作

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

## 微信小程序开发注意事项

### 1. WXML 中的方法调用限制
**问题描述**：
在卡片转化阶段，WXML 中直接调用页面方法（如 `isDuplicateCard`）来判断卡片状态不生效。

**原因分析**：
1. 微信小程序的 WXML 中不支持在视图层直接调用页面方法
2. 这与 Vue 等前端框架的模板语法有所不同，需要特别注意

**解决方案**：
1. 在数据层面提前处理好标记：
```javascript
// pack-manager.js
result.cards.push({ 
  ...card, 
  isDup: !isNewCard,  // 在数据中直接标记是否重复
  isNew: isNewCard    // 在数据中直接标记是否新卡
})
```

2. 在 WXML 中直接使用数据属性而不是调用方法：
```xml
<!-- pack-open.wxml -->
<!-- 错误写法 -->
<block wx:if="{{stage === 'converting' && isDuplicateCard(cardIndex)}}">

<!-- 正确写法 -->
<block wx:if="{{stage === 'converting' && item.isDup}}">
```

3. 最佳实践：
   - 在 JS 中提前处理好所有需要的标记和状态
   - WXML 中只进行数据绑定和简单的条件判断
   - 避免在 WXML 中进行复杂的逻辑运算或方法调用 

### 2. 图片资源路径问题
**问题描述**：
加载本地图片资源时出现 500 错误：`Failed to load local image resource /images/albums/commons/star.png`

**原因分析**：
1. 小程序中的图片路径必须与实际的项目目录结构完全匹配
2. 路径以 `/` 开头时，代表从项目根目录（miniprogram）开始
3. 使用了不存在的目录路径会导致图片加载失败

**解决方案**：
1. 确保图片路径与项目结构匹配：
```xml
<!-- 错误路径 -->
<image src="/images/albums/commons/star.png"></image>

<!-- 正确路径 -->
<image src="/images/star.png"></image>
```

2. 最佳实践：
   - 在使用图片资源前，先确认项目的目录结构
   - 使用相对路径时要注意组件所在的目录层级
   - 建议使用绝对路径（以 `/` 开头）来避免路径计算错误
   - 在开发工具中使用预览功能验证图片是否能正确加载 