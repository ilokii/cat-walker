const packManager = require("../../utils/pack-manager");
const albumManager = require("../../utils/album-manager");
const syncManager = require("../../utils/sync-manager");
const dailyTaskManager = require("../../utils/daily-task-manager");

// 云存储文件路径配置
const CLOUD_PATH = {
  STAR: "cloud://cat-walker-1gnvj0y102f12cab.6361-cat-walker-1gnvj0y102f12cab-1334179374/albums/commons/star.png",
};

Page({
  data: {
    packInfo: null,
    stage: "unopened", // unopened, opened, converting, completed
    openResult: null,
    showHint: true,
    initialSetStatus: {}, // 记录开卡前的套牌完成状态
    newlyCompletedSets: [], // 记录本次开卡完成的套牌
    currentCompletedSetIndex: 0, // 当前展示的完成套牌索引
    taskId: null, // 存储任务ID
    fromStarShop: false,
    starCost: 0,
  },

  // 判断是否为新卡
  isNewCard: function (cardId, cardIndex) {
    if (!this.data.openResult || !this.data.openResult.newCards) return false;
    const isNew = this.data.openResult.newCards.some(
      (card) => card.card_id === cardId
    );
    if (!isNew) return false;
    // 检查在当前卡之前是否已经出现过相同的卡
    for (let i = 0; i < cardIndex; i++) {
      if (this.data.openResult.cards[i].card_id === cardId) return false;
    }
    return true;
  },

  // 判断是否是重复卡
  isDuplicateCard: function (index) {
    console.log(
      `卡包开启页面 - [${this.data.stage}] 检查索引 ${index} 是否为重复卡`
    );
    if (!this.data.openResult) {
      console.log(
        `卡包开启页面 - [${this.data.stage}] openResult 为空，返回 false`
      );
      return false;
    }
    if (!this.data.openResult.duplicateIndexes) {
      console.log(
        `卡包开启页面 - [${this.data.stage}] duplicateIndexes 为空，返回 false`
      );
      return false;
    }
    const isDuplicate = this.data.openResult.duplicateIndexes.includes(index);
    console.log(
      "type of index",
      typeof index,
      this.data.openResult.duplicateIndexes,
      index,
      isDuplicate
    );
    console.log(
      `卡包开启页面 - [${this.data.stage}] 索引 ${index} ${
        isDuplicate ? "是" : "不是"
      }重复卡`
    );
    if (isDuplicate) {
      const card = this.data.openResult.cards[index];
      console.log(
        `卡包开启页面 - [${this.data.stage}] 重复卡详情: ${card.name}（${card.star}星）`
      );
      // 添加渲染相关的日志
      console.log(`卡包开启页面 - [${this.data.stage}] 渲染检查:`);
      console.log(`  当前阶段: ${this.data.stage}`);
      console.log(
        `  条件1(非重复卡显示): ${
          this.data.stage === "opened" ||
          (this.data.stage === "converting" && !isDuplicate)
        }`
      );
      console.log(
        `  条件2(重复卡星星): ${
          this.data.stage === "converting" && isDuplicate
        }`
      );
    }
    return isDuplicate;
  },

  // 获取所有套牌的完成状态
  getSetCompletionStatus() {
    const currentSets = albumManager.getCurrentSets();
    const collectedCards = syncManager.getCollectedCards();
    const completedSets = syncManager.getCompletedSets();

    const status = {};
    for (const set of currentSets) {
      const setCards = albumManager.getSetCards(set.set_id);
      status[set.set_id] = {
        isCompleted: setCards.every((card) =>
          collectedCards.includes(card.card_id)
        ),
        inCompletedList: completedSets.includes(set.set_id),
      };
    }
    return status;
  },

  onLoad: async function (options) {
    console.log("卡包开启页面 - 加载参数:", options);
    const { id, taskId, fromStarShop, starCost } = options;

    if (!id) {
      console.error("卡包开启页面 - 未提供卡包ID");
      wx.showToast({
        title: "参数错误",
        icon: "error",
      });
      wx.navigateBack();
      return;
    }

    // 保存任务ID
    if (taskId) {
      this.setData({ taskId: parseInt(taskId) });
    }

    // 保存星星兑换相关信息
    this.setData({
      fromStarShop: fromStarShop === "true",
      starCost: parseInt(starCost) || 0,
    });

    // 如果是星星兑换，检查星星是否足够
    if (this.data.fromStarShop) {
      const stars = syncManager.getStars();
      if (stars < this.data.starCost) {
        wx.showToast({
          title: "星星不足",
          icon: "error",
        });
        wx.navigateBack();
        return;
      }
    }

    // 获取卡包信息
    const packId = parseInt(id);
    const packInfo = packManager.getPackInfo(packId);

    if (!packInfo) {
      console.error("卡包开启页面 - 未找到卡包信息:", packId);
      wx.showToast({
        title: "卡包不存在",
        icon: "error",
      });
      wx.navigateBack();
      return;
    }

    // 记录开卡前的套牌完成状态
    const initialSetStatus = this.getSetCompletionStatus();

    this.setData({
      packInfo,
      initialSetStatus,
    });

    // 如果是从每日任务来的，先检查任务状态
    if (this.data.taskId) {
      const taskStatus = dailyTaskManager.checkTaskStatus(this.data.taskId);
      if (taskStatus !== "available") {
        wx.showToast({
          title: taskStatus === "completed" ? "该奖励已经领取" : "任务未完成",
          icon: "none",
        });
        wx.navigateBack();
        return;
      }
    }
  },

  // 处理点击事件
  handleTap: async function () {
    try {
      switch (this.data.stage) {
        case "unopened":
          wx.showLoading({ title: "开启中...", mask: true });

          try {
            // 1. 如果是从每日任务来的，先标记任务完成
            if (this.data.taskId) {
              console.log("卡包开启页面 - 标记任务完成:", this.data.taskId);
              const taskResult = await dailyTaskManager.claimTaskReward(
                this.data.taskId
              );
              if (!taskResult.success) {
                wx.hideLoading();
                wx.showToast({
                  title: taskResult.message,
                  icon: "none",
                });
                return;
              }
            }

            // 2. 如果是星星兑换，先扣除星星
            if (this.data.fromStarShop) {
              await syncManager.addStars(-this.data.starCost);
            }

            // 3. 开启卡包
            const openResult = await packManager.openPack(
              this.data.packInfo.id
            );
            if (!openResult) {
              wx.hideLoading();
              wx.showToast({ title: "开启失败", icon: "error" });
              return;
            }

            // 4. 更新本地数据
            await syncManager.syncFromCloud();

            // 5. 更新收集的卡牌
            for (const card of openResult.newCards) {
              if (
                !syncManager.localData.albumData.collectedCards.includes(
                  card.card_id
                )
              ) {
                syncManager.localData.albumData.collectedCards.push(
                  card.card_id
                );
              }
            }

            // 6. 更新星星数量（从重复卡获得的星星）
            if (openResult.totalStars > 0) {
              syncManager.localData.albumData.stars += openResult.totalStars;
            }

            // 7. 获取开卡后的套牌状态
            const currentSetStatus = this.getSetCompletionStatus();
            console.log("开卡后套牌状态:", currentSetStatus);

            // 8. 找出新完成的套牌
            const newlyCompletedSets = [];
            const currentSets = albumManager.getCurrentSets();

            for (const set of currentSets) {
              const setId = set.set_id;
              if (
                !this.data.initialSetStatus[setId].isCompleted &&
                currentSetStatus[setId].isCompleted
              ) {
                newlyCompletedSets.push(setId);
                if (
                  !syncManager.localData.albumData.completedSets.includes(setId)
                ) {
                  syncManager.localData.albumData.completedSets.push(setId);
                }
              }
            }

            // 9. 保存数据到云端
            await syncManager.saveLocalData();
            await syncManager.syncFromCloud();

            wx.hideLoading();

            this.setData(
              {
                openResult,
                stage: "opened",
                showHint: true,
                newlyCompletedSets,
                currentCompletedSetIndex: 0,
              },
              () => {
                // 通知主页更新UI
                const eventChannel = this.getOpenerEventChannel();
                if (eventChannel && eventChannel.emit) {
                  eventChannel.emit("packOpenSuccess");
                }
              }
            );
          } catch (error) {
            console.error("开启卡包失败：", error);
            wx.hideLoading();
            wx.showToast({ title: "开启失败", icon: "error" });
          }
          break;

        case "opened":
          // 检查是否有重复卡需要转化
          console.log("卡包开启页面 - 当前状态: opened");
          console.log("卡包开启页面 - 开包结果:", this.data.openResult);

          if (
            this.data.openResult.duplicateIndexes &&
            this.data.openResult.duplicateIndexes.length > 0
          ) {
            console.log("卡包开启页面 - 检测到重复卡片:");
            console.log("  重复卡索引:", this.data.openResult.duplicateIndexes);
            this.data.openResult.duplicateIndexes.forEach((index) => {
              const card = this.data.openResult.cards[index];
              console.log(`  索引 ${index}: ${card.name}（${card.star}星）`);
            });

            this.setData(
              {
                stage: "converting",
                showHint: true,
              },
              () => {
                console.log("卡包开启页面 - 状态已更新为 converting");
                console.log("卡包开启页面 - 立即检查渲染状态:");
                // 立即检查每张卡片的渲染状态
                this.data.openResult.cards.forEach((card, index) => {
                  const isDuplicate = this.isDuplicateCard(index);
                  console.log(`卡片 ${index}: ${card.name}`);
                  console.log(`  当前阶段: ${this.data.stage}`);
                  console.log(`  是否重复: ${isDuplicate}`);
                  console.log(
                    `  条件1(非重复卡显示): ${
                      this.data.stage === "opened" ||
                      (this.data.stage === "converting" && !isDuplicate)
                    }`
                  );
                  console.log(
                    `  条件2(重复卡星星): ${
                      this.data.stage === "converting" && isDuplicate
                    }`
                  );
                });
              }
            );
          } else {
            console.log("卡包开启页面 - 没有检测到重复卡片，直接进入完成流程");
            this.handleSetComplete();
          }
          break;

        case "converting":
          console.log("卡包开启页面 - 当前状态: converting");
          console.log("卡包开启页面 - 重新检查所有卡片状态:");
          this.data.openResult.cards.forEach((card, index) => {
            const isDuplicate = this.isDuplicateCard(index);
            console.log(`卡片 ${index}: ${card.name}`);
            console.log(`  是否重复: ${isDuplicate}`);
            console.log(
              `  当前显示模式: ${isDuplicate ? "应显示星星" : "应显示卡片"}`
            );
          });
          console.log("卡包开启页面 - 转化完成，准备进入完成流程");
          this.handleSetComplete();
          break;
      }
    } catch (error) {
      console.error("处理点击事件失败：", error);
      wx.showToast({ title: "操作失败", icon: "error" });
    }
  },

  // 处理套牌完成逻辑
  handleSetComplete: function () {
    if (this.data.newlyCompletedSets.length > 0) {
      // 获取第一个需要展示的套牌ID
      const firstSetId = this.data.newlyCompletedSets[0];
      // 关闭当前界面，打开第一个set-complete界面，并传递所有新集齐的套牌信息
      wx.redirectTo({
        url: `/pages/set-complete/set-complete?setId=${firstSetId}&currentIndex=0&setIds=${JSON.stringify(
          this.data.newlyCompletedSets
        )}`,
        fail: (err) => console.error("跳转到套牌完成页面失败:", err),
      });
    } else {
      wx.navigateBack();
    }
  },

  // 处理开包结果
  async handleOpenResult(result) {
    console.log("卡包开启页面 - 处理开包结果:", result);

    if (!result) {
      console.error("卡包开启页面 - 开包结果为空");
      return;
    }

    this.setData({
      openResult: result,
      stage: "opened",
    });

    // 如果是从每日任务来的，标记任务完成
    if (this.data.taskId) {
      try {
        console.log("卡包开启页面 - 标记任务完成:", this.data.taskId);
        const result = await dailyTaskManager.claimTaskReward(this.data.taskId);
        if (!result.success) {
          console.error("卡包开启页面 - 标记任务完成失败:", result.message);
        }
      } catch (error) {
        console.error("卡包开启页面 - 标记任务完成出错:", error);
      }
    }

    // 检查是否有新完成的套牌
    const currentSetStatus = this.getSetCompletionStatus();
    const newlyCompletedSets = [];

    for (const [setId, status] of Object.entries(currentSetStatus)) {
      if (
        status.isCompleted &&
        !this.data.initialSetStatus[setId]?.isCompleted
      ) {
        newlyCompletedSets.push(setId);
      }
    }

    if (newlyCompletedSets.length > 0) {
      this.setData({ newlyCompletedSets });
    }

    // 通知主页更新UI
    const eventChannel = this.getOpenerEventChannel();
    if (eventChannel && eventChannel.emit) {
      eventChannel.emit("packOpenSuccess");
    }
  },
});
