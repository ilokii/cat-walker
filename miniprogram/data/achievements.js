const achievements = {
  daily_login: {
    id: 'daily_login',
    name: '每日打卡',
    levels: [
      { level: 0, icon: 'daily_login_0', nextValue: 3 },
      { level: 1, icon: 'daily_login_1', nextValue: 5 },
      { level: 2, icon: 'daily_login_2', nextValue: 7 },
      { level: 3, icon: 'daily_login_3', nextValue: 14 },
      { level: 4, icon: 'daily_login_4', nextValue: 30 },
      { level: 5, icon: 'daily_login_5', nextValue: 60 },
      { level: 6, icon: 'daily_login_6', nextValue: 90 },
      { level: 7, icon: 'daily_login_7', nextValue: 120 },
      { level: 8, icon: 'daily_login_8', nextValue: 240 },
      { level: 9, icon: 'daily_login_9', nextValue: 365 },
      { level: 10, icon: 'daily_login_10', nextValue: 1000 }
    ]
  },
  steps: {
    id: 'steps',
    name: '行万里路',
    levels: [
      { level: 0, icon: 'steps_0', nextValue: 10000 },
      { level: 1, icon: 'steps_1', nextValue: 50000 },
      { level: 2, icon: 'steps_2', nextValue: 100000 },
      { level: 3, icon: 'steps_3', nextValue: 100000 },
      { level: 4, icon: 'steps_4', nextValue: 500000 },
      { level: 5, icon: 'steps_5', nextValue: 1000000 },
      { level: 6, icon: 'steps_6', nextValue: 5000000 },
      { level: 7, icon: 'steps_7', nextValue: 10000000 },
      { level: 8, icon: 'steps_8', nextValue: 50000000 },
      { level: 9, icon: 'steps_9', nextValue: 100000000 },
      { level: 10, icon: 'steps_10', nextValue: 100000000 }
    ]
  },
  cities: {
    id: 'cities',
    name: '城市猎人',
    levels: [
      { level: 0, icon: 'cities_0', nextValue: 2 },
      { level: 1, icon: 'cities_1', nextValue: 5 },
      { level: 2, icon: 'cities_2', nextValue: 10 },
      { level: 3, icon: 'cities_3', nextValue: 20 },
      { level: 4, icon: 'cities_4', nextValue: 50 },
      { level: 5, icon: 'cities_5', nextValue: 100 },
      { level: 6, icon: 'cities_6', nextValue: 150 },
      { level: 7, icon: 'cities_7', nextValue: 200 },
      { level: 8, icon: 'cities_8', nextValue: 250 },
      { level: 9, icon: 'cities_9', nextValue: 300 },
      { level: 10, icon: 'cities_10', nextValue: 351 }
    ]
  },
  provinces: {
    id: 'provinces',
    name: '省份猎人',
    levels: [
      { level: 0, icon: 'provinces_0', nextValue: 2 },
      { level: 1, icon: 'provinces_1', nextValue: 5 },
      { level: 2, icon: 'provinces_2', nextValue: 10 },
      { level: 3, icon: 'provinces_3', nextValue: 15 },
      { level: 4, icon: 'provinces_4', nextValue: 20 },
      { level: 5, icon: 'provinces_5', nextValue: 25 },
      { level: 6, icon: 'provinces_6', nextValue: 30 },
      { level: 7, icon: 'provinces_7', nextValue: 34 }
    ]
  }
}

module.exports = achievements 