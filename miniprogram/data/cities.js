// 城市基础数据
const citiesData = {
  // === 江苏省城市 ===
  "南京市": {
    province: 'JSU',
    location: { lat: 32.0603, lon: 118.7969 },
    icon: 'nanjing.png',
    neighbors: {
      // 江苏省内
      "镇江市": { distance: 80, steps: 106670 },      // 东面接壤
      "扬州市": { distance: 105, steps: 140000 },     // 东北面接壤
      "苏州市": { distance: 145, steps: 193330 },     // 西北面接壤
      "常州市": { distance: 155, steps: 206670 },      // 东南面接壤
      // 安徽省
      "马鞍山市": { distance: 85, steps: 113330 }    // 西面接壤
    }
  },
  "苏州市": {
    province: 'JSU',
    location: { lat: 31.2989, lon: 120.5853 },
    icon: 'suzhou.png',
    neighbors: {
      // 江苏省内
      "无锡市": { distance: 85, steps: 113330 },      // 西面接壤
      "常州市": { distance: 140, steps: 186670 },     // 西北面接壤
      // 上海市
      "上海市": { distance: 102, steps: 136000 },     // 东面接壤
      // 浙江省
      "嘉兴市": { distance: 115, steps: 153330 },     // 南面接壤
      "湖州市": { distance: 135, steps: 180000 }      // 西南面接壤
    }
  },
  "无锡市": {
    province: 'JSU',
    location: { lat: 31.4900, lon: 120.3119 },
    icon: 'wuxi.png',
    neighbors: {
      // 江苏省内
      "常州市": { distance: 75, steps: 100000 },      // 东面接壤
      "苏州市": { distance: 85, steps: 113330 },      // 东面接壤
      // 浙江省
      "湖州市": { distance: 125, steps: 166670 }      // 南面接壤
    }
  },
  "常州市": {
    province: 'JSU',
    location: { lat: 31.8105, lon: 119.9741 },
    icon: 'changzhou.png',
    neighbors: {
      // 江苏省内
      "无锡市": { distance: 75, steps: 100000 },      // 东面接壤
      "镇江市": { distance: 95, steps: 126670 },      // 西北面接壤
      "南京市": { distance: 155, steps: 206670 },     // 西面接壤
      "苏州市": { distance: 140, steps: 186670 },     // 东北面接壤
      // 浙江省
      "湖州市": { distance: 145, steps: 193330 }      // 南面接壤
    }
  },
  "镇江市": {
    province: 'JSU',
    location: { lat: 32.1981, lon: 119.4216 },
    icon: 'zhenjiang.png',
    neighbors: {
      // 江苏省内
      "南京市": { distance: 80, steps: 106670 },      // 西面接壤
      "常州市": { distance: 95, steps: 126670 },      // 东北面接壤
      "扬州市": { distance: 95, steps: 126670 },      // 北面接壤
      "泰州市": { distance: 95, steps: 126670 },       // 南面接壤
      // 浙江省
      "湖州市": { distance: 145, steps: 193330 }      // 南面接壤
    }
  },
  "徐州市": {
    province: 'JSU',
    location: { lat: 34.2044, lon: 117.2857 },
    icon: 'xuzhou.png',
    neighbors: {
      // 江苏省内
      "宿迁市": { distance: 135, steps: 180000 },     // 东南面接壤
      "淮安市": { distance: 165, steps: 220000 },     // 东南面接壤
      // 山东省
      "枣庄市": { distance: 125, steps: 166670 },     // 北面接壤
      "临沂市": { distance: 210, steps: 280000 },     // 东北面接壤
      // 安徽省
      "宿州市": { distance: 145, steps: 193330 }      // 西面接壤
    }
  },
  "南通市": {
    province: 'JSU',
    location: { lat: 31.9829, lon: 120.8943 },
    icon: 'nantong.png',
    neighbors: {
      // 江苏省内
      "盐城市": { distance: 155, steps: 206670 },     // 北面接壤
      "泰州市": { distance: 95, steps: 126670 },      // 西面接壤
      // 上海市
      "上海市": { distance: 142, steps: 189330 }      // 东南面接壤
    }
  },
  "连云港市": {
    province: 'JSU',
    location: { lat: 34.5969, lon: 119.2215 },
    icon: 'lianyungang.png',
    neighbors: {
      // 江苏省内
      "宿迁市": { distance: 165, steps: 220000 },     // 南面接壤
      // 山东省
      "日照市": { distance: 145, steps: 193330 },     // 北面接壤
      "临沂市": { distance: 185, steps: 246670 }      // 西北面接壤
    }
  },
  "淮安市": {
    province: 'JSU',
    location: { lat: 33.6065, lon: 119.0153 },
    icon: 'huaian.png',
    neighbors: {
      // 江苏省内
      "宿迁市": { distance: 115, steps: 153330 },     // 北面接壤
      "盐城市": { distance: 145, steps: 193330 },     // 东面接壤
      "扬州市": { distance: 135, steps: 180000 },     // 南面接壤
      "徐州市": { distance: 165, steps: 220000 }      // 西北面接壤
    }
  },
  "盐城市": {
    province: 'JSU',
    location: { lat: 33.3477, lon: 120.1615 },
    icon: 'yancheng.png',
    neighbors: {
      // 江苏省内
      "连云港市": { distance: 185, steps: 246670 },   // 北面接壤
      "淮安市": { distance: 145, steps: 193330 },     // 西面接壤
      "泰州市": { distance: 165, steps: 220000 },     // 南面接壤
      "南通市": { distance: 155, steps: 206670 }      // 东南面接壤
    }
  },
  "扬州市": {
    province: 'JSU',
    location: { lat: 32.3947, lon: 119.4143 },
    icon: 'yangzhou.png',
    neighbors: {
      // 江苏省内
      "淮安市": { distance: 135, steps: 180000 },     // 北面接壤
      "泰州市": { distance: 85, steps: 113330 },      // 东面接壤
      "镇江市": { distance: 95, steps: 126670 },      // 南面接壤
      "南京市": { distance: 105, steps: 140000 }      // 西南面接壤
    }
  },
  "泰州市": {
    province: 'JSU',
    location: { lat: 32.4558, lon: 119.9231 },
    icon: 'taizhou.png',
    neighbors: {
      // 江苏省内
      "盐城市": { distance: 165, steps: 220000 },     // 北面接壤
      "南通市": { distance: 95, steps: 126670 },      // 东面接壤
      "扬州市": { distance: 85, steps: 113330 },       // 西面接壤
      "镇江市": { distance: 95, steps: 126670 },      // 西南面接壤
      "镇江市": { distance: 95, steps: 126670 }      // 西南面接壤
    }
  },
  "宿迁市": {
    province: 'JSU',
    location: { lat: 33.9631, lon: 118.2751 },
    icon: 'suqian.png',
    neighbors: {
      // 江苏省内
      "连云港市": { distance: 165, steps: 220000 },   // 东北面接壤
      "淮安市": { distance: 115, steps: 153330 },     // 东南面接壤
      "徐州市": { distance: 135, steps: 180000 },     // 西北面接壤
      // 安徽省
      "宿州市": { distance: 175, steps: 233330 }      // 西面接壤
    }
  },

  // === 浙江省城市 ===
  "杭州市": {
    province: 'ZJ',
    location: { lat: 30.2946, lon: 120.1614 },
    icon: 'hangzhou.png',
    neighbors: {
      // 浙江省内
      "湖州市": { distance: 125, steps: 166670 },     // 西面接壤
      "宁波市": { distance: 145, steps: 193330 },     // 东面接壤
      "嘉兴市": { distance: 95, steps: 126670 },      // 南面接壤
      "台州市": { distance: 185, steps: 246670 },     // 东南面接壤
      "绍兴市": { distance: 65, steps: 86670 },       // 西面接壤
      "金华市": { distance: 145, steps: 193330 },     // 北面接壤
      "衢州市": { distance: 215, steps: 286670 },     // 西北面接壤
      "丽水市": { distance: 125, steps: 166670 },     // 南面接壤
      "温州市": { distance: 145, steps: 193330 }      // 东南面接壤
    }
  },
  "宁波市": {
    province: 'ZJ',
    location: { lat: 29.8683, lon: 121.5493 },
    icon: 'ningbo.png',
    neighbors: {
      // 浙江省内
      "杭州市": { distance: 145, steps: 193330 },     // 北面接壤
      "绍兴市": { distance: 165, steps: 220000 },     // 东北面接壤
      "金华市": { distance: 165, steps: 220000 },     // 南面接壤
      "台州市": { distance: 185, steps: 246670 },     // 东南面接壤
      "温州市": { distance: 145, steps: 193330 }      // 西面接壤
    }
  },
  "温州市": {
    province: 'ZJ',
    location: { lat: 28.0006, lon: 120.6721 },
    icon: 'wenzhou.png',
    neighbors: {
      // 浙江省内
      "丽水市": { distance: 145, steps: 193330 },     // 北面接壤
      "台州市": { distance: 165, steps: 220000 },     // 东面接壤
      "宁波市": { distance: 145, steps: 193330 },     // 西面接壤
      "杭州市": { distance: 145, steps: 193330 }      // 西北面接壤
    }
  },
  "嘉兴市": {
    province: 'ZJ',
    location: { lat: 30.7469, lon: 120.7555 },
    icon: 'jiaxing.png',
    neighbors: {
      // 浙江省内
      "湖州市": { distance: 85, steps: 113330 },      // 西面接壤
      "杭州市": { distance: 95, steps: 126670 },      // 南面接壤
      // 江苏省
      "苏州市": { distance: 115, steps: 153330 },     // 北面接壤
      // 上海市
      "上海市": { distance: 91, steps: 121330 }       // 东面接壤
    }
  },
  "湖州市": {
    province: 'ZJ',
    location: { lat: 30.8927, lon: 120.0881 },
    icon: 'huzhou.png',
    neighbors: {
      // 浙江省内
      "嘉兴市": { distance: 85, steps: 113330 },      // 东面接壤
      "杭州市": { distance: 125, steps: 166670 },     // 南面接壤
      // 江苏省
      "苏州市": { distance: 135, steps: 180000 },     // 东北面接壤
      "无锡市": { distance: 125, steps: 166670 },     // 北面接壤
      "常州市": { distance: 145, steps: 193330 },     // 西北面接壤
      // 安徽省
      "宣城市": { distance: 185, steps: 246670 }      // 西面接壤
    }
  },
  "绍兴市": {
    province: 'ZJ',
    location: { lat: 30.0307, lon: 120.5853 },
    icon: 'shaoxing.png',
    neighbors: {
      // 浙江省内
      "杭州市": { distance: 65, steps: 86670 },       // 西面接壤
      "宁波市": { distance: 145, steps: 193330 },     // 东面接壤
      "金华市": { distance: 165, steps: 220000 },     // 南面接壤
      "台州市": { distance: 205, steps: 273330 }      // 东南面接壤
    }
  },
  "金华市": {
    province: 'ZJ',
    location: { lat: 29.0784, lon: 119.6494 },
    icon: 'jinhua.png',
    neighbors: {
      // 浙江省内
      "杭州市": { distance: 145, steps: 193330 },     // 北面接壤
      "绍兴市": { distance: 165, steps: 220000 },     // 东北面接壤
      "衢州市": { distance: 155, steps: 206670 },     // 西面接壤
      "丽水市": { distance: 135, steps: 180000 },     // 南面接壤
      "台州市": { distance: 175, steps: 233330 }      // 东面接壤
    }
  },
  "衢州市": {
    province: 'ZJ',
    location: { lat: 28.9709, lon: 118.8743 },
    icon: 'quzhou.png',
    neighbors: {
      // 浙江省内
      "杭州市": { distance: 215, steps: 286670 },     // 北面接壤
      "金华市": { distance: 155, steps: 206670 },     // 东面接壤
      "丽水市": { distance: 185, steps: 246670 },     // 东南面接壤
      // 江西省
      "上饶市": { distance: 165, steps: 220000 },     // 西面接壤
      // 安徽省
      "黄山市": { distance: 175, steps: 233330 }      // 西北面接壤
    }
  },
  "舟山市": {
    province: 'ZJ',
    location: { lat: 29.9853, lon: 122.2067 },
    icon: 'zhoushan.png',
    neighbors: {
      // 浙江省内
      "宁波市": { distance: 105, steps: 140000 }      // 西面接壤
    }
  },
  "台州市": {
    province: 'ZJ',
    location: { lat: 28.6560, lon: 121.4205 },
    icon: 'taizhou.png',
    neighbors: {
      // 浙江省内
      "宁波市": { distance: 185, steps: 246670 },     // 北面接壤
      "绍兴市": { distance: 205, steps: 273330 },     // 西北面接壤
      "金华市": { distance: 175, steps: 233330 },     // 西面接壤
      "丽水市": { distance: 155, steps: 206670 },     // 西南面接壤
      "温州市": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },
  "丽水市": {
    province: 'ZJ',
    location: { lat: 28.4672, lon: 119.9229 },
    icon: 'lishui.png',
    neighbors: {
      // 浙江省内
      "金华市": { distance: 135, steps: 180000 },     // 北面接壤
      "衢州市": { distance: 185, steps: 246670 },     // 西北面接壤
      "台州市": { distance: 155, steps: 206670 },     // 东面接壤
      "温州市": { distance: 145, steps: 193330 },     // 东南面接壤
      // 福建省
      "南平市": { distance: 215, steps: 286670 },     // 南面接壤
      // 江西省
      "上饶市": { distance: 245, steps: 326670 }      // 西面接壤
    }
  },

  // === 安徽省城市 ===
  "合肥市": {
    province: 'AH',
    location: { lat: 31.8206, lon: 117.2272 },
    icon: 'hefei.png',
    neighbors: {
      // 安徽省内
      "六安市": { distance: 95, steps: 126670 },      // 西面接壤
      "滁州市": { distance: 145, steps: 193330 },     // 东北面接壤
      "马鞍山市": { distance: 125, steps: 166670 },   // 东面接壤
      "芜湖市": { distance: 85, steps: 113330 },      // 东南面接壤
      "铜陵市": { distance: 115, steps: 153330 }      // 南面接壤
    }
  },

  "芜湖市": {
    province: 'AH',
    location: { lat: 31.3339, lon: 118.3650 },
    icon: 'wuhu.png',
    neighbors: {
      // 安徽省内
      "合肥市": { distance: 85, steps: 113330 },      // 西北面接壤
      "马鞍山市": { distance: 65, steps: 86670 },     // 东北面接壤
      "宣城市": { distance: 115, steps: 153330 },     // 东南面接壤
      "铜陵市": { distance: 75, steps: 100000 }       // 西南面接壤
    }
  },

  "蚌埠市": {
    province: 'AH',
    location: { lat: 32.9162, lon: 117.3889 },
    icon: 'bengbu.png',
    neighbors: {
      // 安徽省内
      "宿州市": { distance: 125, steps: 166670 },     // 北面接壤
      "淮南市": { distance: 85, steps: 113330 },      // 南面接壤
      "滁州市": { distance: 145, steps: 193330 }      // 东南面接壤
    }
  },

  "淮南市": {
    province: 'AH',
    location: { lat: 32.6267, lon: 116.9998 },
    icon: 'huainan.png',
    neighbors: {
      // 安徽省内
      "蚌埠市": { distance: 85, steps: 113330 },      // 北面接壤
      "滁州市": { distance: 155, steps: 206670 },     // 东面接壤
      "合肥市": { distance: 105, steps: 140000 },     // 南面接壤
      "六安市": { distance: 125, steps: 166670 }      // 西南面接壤
    }
  },

  "马鞍山市": {
    province: 'AH',
    location: { lat: 31.6704, lon: 118.5065 },
    icon: 'maanshan.png',
    neighbors: {
      // 安徽省内
      "芜湖市": { distance: 65, steps: 86670 },       // 南面接壤
      "合肥市": { distance: 125, steps: 166670 },     // 西面接壤
      "滁州市": { distance: 95, steps: 126670 },      // 北面接壤
      // 江苏省
      "南京市": { distance: 85, steps: 113330 }       // 东面接壤
    }
  },

  "淮北市": {
    province: 'AH',
    location: { lat: 33.9544, lon: 116.7985 },
    icon: 'huaibei.png',
    neighbors: {
      // 安徽省内
      "宿州市": { distance: 115, steps: 153330 },     // 东面接壤
      // 河南省
      "商丘市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "铜陵市": {
    province: 'AH',
    location: { lat: 30.9456, lon: 117.8121 },
    icon: 'tongling.png',
    neighbors: {
      // 安徽省内
      "芜湖市": { distance: 75, steps: 100000 },      // 北面接壤
      "合肥市": { distance: 115, steps: 153330 },     // 西北面接壤
      "安庆市": { distance: 95, steps: 126670 },      // 西南面接壤
      "池州市": { distance: 85, steps: 113330 }       // 南面接壤
    }
  },

  "安庆市": {
    province: 'AH',
    location: { lat: 30.5433, lon: 117.0633 },
    icon: 'anqing.png',
    neighbors: {
      // 安徽省内
      "六安市": { distance: 165, steps: 220000 },     // 北面接壤
      "铜陵市": { distance: 95, steps: 126670 },      // 东北面接壤
      "池州市": { distance: 125, steps: 166670 },     // 东面接壤
      // 湖北省
      "黄冈市": { distance: 245, steps: 326670 }      // 西面接壤
    }
  },

  "黄山市": {
    province: 'AH',
    location: { lat: 29.7147, lon: 118.3145 },
    icon: 'huangshan.png',
    neighbors: {
      // 安徽省内
      "池州市": { distance: 145, steps: 193330 },     // 北面接壤
      "宣城市": { distance: 155, steps: 206670 },     // 东北面接壤
      // 浙江省
      "衢州市": { distance: 175, steps: 233330 },     // 东面接壤
      // 江西省
      "上饶市": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },

  "滁州市": {
    province: 'AH',
    location: { lat: 32.3012, lon: 118.3377 },
    icon: 'chuzhou.png',
    neighbors: {
      // 安徽省内
      "蚌埠市": { distance: 145, steps: 193330 },     // 西北面接壤
      "淮南市": { distance: 155, steps: 206670 },     // 西面接壤
      "合肥市": { distance: 145, steps: 193330 },     // 西南面接壤
      "马鞍山市": { distance: 95, steps: 126670 },    // 南面接壤
      // 江苏省
      "南京市": { distance: 125, steps: 166670 }      // 东面接壤
    }
  },

  "阜阳市": {
    province: 'AH',
    location: { lat: 32.8963, lon: 115.8142 },
    icon: 'fuyang.png',
    neighbors: {
      // 安徽省内
      "亳州市": { distance: 135, steps: 180000 },     // 北面接壤
      "淮南市": { distance: 165, steps: 220000 },     // 东面接壤
      "六安市": { distance: 155, steps: 206670 },     // 南面接壤
      // 河南省
      "周口市": { distance: 145, steps: 193330 },     // 西北面接壤
      "信阳市": { distance: 185, steps: 246670 }      // 西南面接壤
    }
  },

  "宿州市": {
    province: 'AH',
    location: { lat: 33.6462, lon: 116.9638 },
    icon: 'suzhou.png',
    neighbors: {
      // 安徽省内
      "淮北市": { distance: 115, steps: 153330 },     // 西北面接壤
      "蚌埠市": { distance: 125, steps: 166670 },     // 南面接壤
      // 江苏省
      "徐州市": { distance: 145, steps: 193330 },     // 东面接壤
      "宿迁市": { distance: 175, steps: 233330 },     // 东南面接壤
      // 河南省
      "商丘市": { distance: 185, steps: 246670 }      // 西南面接壤
    }
  },

  "六安市": {
    province: 'AH',
    location: { lat: 31.7337, lon: 116.5078 },
    icon: 'luan.png',
    neighbors: {
      // 安徽省内
      "阜阳市": { distance: 155, steps: 206670 },     // 北面接壤
      "淮南市": { distance: 125, steps: 166670 },     // 东北面接壤
      "合肥市": { distance: 95, steps: 126670 },      // 东面接壤
      "安庆市": { distance: 165, steps: 220000 },     // 南面接壤
      // 湖北省
      "黄冈市": { distance: 235, steps: 313330 }      // 西南面接壤
    }
  },

  "亳州市": {
    province: 'AH',
    location: { lat: 33.8712, lon: 115.7793 },
    icon: 'bozhou.png',
    neighbors: {
      // 安徽省内
      "淮北市": { distance: 145, steps: 193330 },     // 东北面接壤
      "阜阳市": { distance: 135, steps: 180000 },     // 南面接壤
      // 河南省
      "周口市": { distance: 125, steps: 166670 },     // 西面接壤
      "商丘市": { distance: 155, steps: 206670 }      // 西北面接壤
    }
  },

  "池州市": {
    province: 'AH',
    location: { lat: 30.6645, lon: 117.4913 },
    icon: 'chizhou.png',
    neighbors: {
      // 安徽省内
      "铜陵市": { distance: 85, steps: 113330 },      // 北面接壤
      "安庆市": { distance: 125, steps: 166670 },     // 西面接壤
      "黄山市": { distance: 145, steps: 193330 },     // 东南面接壤
      // 江西省
      "九江市": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },

  "宣城市": {
    province: 'AH',
    location: { lat: 30.9454, lon: 118.7589 },
    icon: 'xuancheng.png',
    neighbors: {
      // 安徽省内
      "芜湖市": { distance: 115, steps: 153330 },     // 西北面接壤
      "黄山市": { distance: 155, steps: 206670 },     // 西南面接壤
      // 浙江省
      "湖州市": { distance: 185, steps: 246670 },     // 东面接壤
      // 江西省
      "上饶市": { distance: 215, steps: 286670 }      // 东南面接壤
    }
  },

  // === 福建省城市 ===
  "福州市": {
    province: 'FJ',
    location: { lat: 26.0745, lon: 119.2965 },
    icon: 'fuzhou.png',
    neighbors: {
      // 福建省内
      "宁德市": { distance: 165, steps: 220000 },    // 东北面接壤
      "南平市": { distance: 245, steps: 326670 },    // 西北面接壤
      "三明市": { distance: 245, steps: 326670 },    // 西面接壤
      "莆田市": { distance: 145, steps: 193330 },    // 南面接壤
      // 台湾省
      "台北市": { distance: 185, steps: 246670 }     // 东面隔海
    }
  },

  "厦门市": {
    province: 'FJ',
    location: { lat: 24.4798, lon: 118.0894 },
    icon: 'xiamen.png',
    neighbors: {
      // 福建省内
      "泉州市": { distance: 85, steps: 113330 },     // 北面接壤
      "漳州市": { distance: 65, steps: 86670 },      // 西面接壤
      // 台湾省
      "高雄市": { distance: 285, steps: 380000 }     // 东南面隔海
    }
  },

  "莆田市": {
    province: 'FJ',
    location: { lat: 25.4541, lon: 119.0078 },
    icon: 'putian.png',
    neighbors: {
      // 福建省内
      "福州市": { distance: 115, steps: 153330 },     // 北面接壤
      "泉州市": { distance: 95, steps: 126670 },      // 南面接壤
      "三明市": { distance: 185, steps: 246670 }      // 西面接壤
    }
  },

  "三明市": {
    province: 'FJ',
    location: { lat: 26.2654, lon: 117.6390 },
    icon: 'sanming.png',
    neighbors: {
      // 福建省内
      "南平市": { distance: 165, steps: 220000 },     // 北面接壤
      "福州市": { distance: 225, steps: 300000 },     // 东北面接壤
      "莆田市": { distance: 185, steps: 246670 },     // 东面接壤
      "泉州市": { distance: 215, steps: 286670 },     // 东南面接壤
      "龙岩市": { distance: 155, steps: 206670 },     // 南面接壤
      // 江西省
      "抚州市": { distance: 245, steps: 326670 }      // 西北面接壤
    }
  },

  "泉州市": {
    province: 'FJ',
    location: { lat: 24.8741, lon: 118.6753 },
    icon: 'quanzhou.png',
    neighbors: {
      // 福建省内
      "莆田市": { distance: 145, steps: 193330 },    // 北面接壤
      "厦门市": { distance: 85, steps: 113330 },     // 南面接壤
      "漳州市": { distance: 165, steps: 220000 },    // 西南面接壤
      "三明市": { distance: 245, steps: 326670 },    // 西北面接壤
      // 台湾省
      "台中市": { distance: 245, steps: 326670 }     // 东面隔海
    }
  },

  "漳州市": {
    province: 'FJ',
    location: { lat: 24.5133, lon: 117.6471 },
    icon: 'zhangzhou.png',
    neighbors: {
      // 福建省内
      "泉州市": { distance: 85, steps: 113330 },      // 北面接壤
      "龙岩市": { distance: 165, steps: 220000 },     // 西面接壤
      "厦门市": { distance: 65, steps: 86670 }        // 东面接壤
    }
  },

  "南平市": {
    province: 'FJ',
    location: { lat: 27.3317, lon: 118.1716 },
    icon: 'nanping.png',
    neighbors: {
      // 福建省内
      "宁德市": { distance: 195, steps: 260000 },     // 东面接壤
      "三明市": { distance: 165, steps: 220000 },     // 南面接壤
      "福州市": { distance: 195, steps: 260000 },     // 东南面接壤
      // 浙江省
      "丽水市": { distance: 215, steps: 286670 },     // 北面接壤
      // 江西省
      "上饶市": { distance: 245, steps: 326670 },     // 西北面接壤
      "抚州市": { distance: 185, steps: 246670 }      // 西面接壤
    }
  },

  "龙岩市": {
    province: 'FJ',
    location: { lat: 25.0916, lon: 117.0173 },
    icon: 'longyan.png',
    neighbors: {
      // 福建省内
      "三明市": { distance: 155, steps: 206670 },     // 北面接壤
      "漳州市": { distance: 165, steps: 220000 },     // 东面接壤
      // 江西省
      "赣州市": { distance: 245, steps: 326670 },     // 西面接壤
      // 广东省
      "梅州市": { distance: 185, steps: 246670 }      // 南面接壤
    }
  },

  "宁德市": {
    province: 'FJ',
    location: { lat: 26.6617, lon: 119.5485 },
    icon: 'ningde.png',
    neighbors: {
      // 福建省内
      "福州市": { distance: 145, steps: 193330 },     // 南面接壤
      "南平市": { distance: 195, steps: 260000 },     // 西面接壤
      // 浙江省
      "温州市": { distance: 195, steps: 260000 }      // 北面接壤
    }
  },

  // === 江西省城市 ===
  "南昌市": {
    province: 'JXI',
    location: { lat: 28.6829, lon: 115.8579 },
    icon: 'nanchang.png',
    neighbors: {
      // 江西省内
      "九江市": { distance: 135, steps: 180000 },     // 北面接壤
      "抚州市": { distance: 115, steps: 153330 },     // 东面接壤
      "鹰潭市": { distance: 165, steps: 220000 },     // 东北面接壤
      "宜春市": { distance: 145, steps: 193330 },     // 西面接壤
      "吉安市": { distance: 175, steps: 233330 }      // 南面接壤
    }
  },

  "景德镇市": {
    province: 'JXI',
    location: { lat: 29.2786, lon: 117.1785 },
    icon: 'jingdezhen.png',
    neighbors: {
      // 江西省内
      "九江市": { distance: 125, steps: 166670 },     // 西北面接壤
      "上饶市": { distance: 145, steps: 193330 },     // 东南面接壤
      // 安徽省
      "黄山市": { distance: 165, steps: 220000 }      // 北面接壤
    }
  },

  "九江市": {
    province: 'JXI',
    location: { lat: 29.7051, lon: 116.0012 },
    icon: 'jiujiang.png',
    neighbors: {
      // 江西省内
      "景德镇市": { distance: 125, steps: 166670 },   // 东面接壤
      "南昌市": { distance: 135, steps: 180000 },     // 南面接壤
      "宜春市": { distance: 155, steps: 206670 },     // 西南面接壤
      // 安徽省
      "安庆市": { distance: 165, steps: 220000 },     // 西北面接壤
      "池州市": { distance: 165, steps: 220000 },     // 北面接壤
      // 湖北省
      "黄冈市": { distance: 185, steps: 246670 }      // 西面接壤
    }
  },

  "萍乡市": {
    province: 'JXI',
    location: { lat: 27.6225, lon: 113.8520 },
    icon: 'pingxiang.png',
    neighbors: {
      // 江西省内
      "宜春市": { distance: 125, steps: 166670 },     // 东面接壤
      // 湖南省
      "株洲市": { distance: 145, steps: 193330 },     // 西面接壤
      "衡阳市": { distance: 185, steps: 246670 }      // 西南面接壤
    }
  },

  "新余市": {
    province: 'JXI',
    location: { lat: 27.8174, lon: 114.9166 },
    icon: 'xinyu.png',
    neighbors: {
      // 江西省内
      "宜春市": { distance: 95, steps: 126670 },      // 北面接壤
      "吉安市": { distance: 125, steps: 166670 }      // 南面接壤
    }
  },

  "鹰潭市": {
    province: 'JXI',
    location: { lat: 28.2602, lon: 117.0688 },
    icon: 'yingtan.png',
    neighbors: {
      // 江西省内
      "上饶市": { distance: 115, steps: 153330 },     // 东北面接壤
      "抚州市": { distance: 125, steps: 166670 },     // 南面接壤
      "南昌市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "赣州市": {
    province: 'JXI',
    location: { lat: 25.8452, lon: 114.9349 },
    icon: 'ganzhou.png',
    neighbors: {
      // 江西省内
      "吉安市": { distance: 165, steps: 220000 },     // 北面接壤
      "抚州市": { distance: 245, steps: 326670 },     // 东北面接壤
      // 福建省
      "龙岩市": { distance: 245, steps: 326670 },     // 东面接壤
      // 广东省
      "韶关市": { distance: 215, steps: 286670 },     // 南面接壤
      // 湖南省
      "郴州市": { distance: 185, steps: 246670 }      // 西面接壤
    }
  },

  "吉安市": {
    province: 'JXI',
    location: { lat: 27.1138, lon: 114.9927 },
    icon: 'jian.png',
    neighbors: {
      // 江西省内
      "新余市": { distance: 125, steps: 166670 },     // 北面接壤
      "南昌市": { distance: 175, steps: 233330 },     // 东北面接壤
      "抚州市": { distance: 165, steps: 220000 },     // 东面接壤
      "赣州市": { distance: 165, steps: 220000 },     // 南面接壤
      // 湖南省
      "衡阳市": { distance: 215, steps: 286670 }      // 西面接壤
    }
  },

  "宜春市": {
    province: 'JXI',
    location: { lat: 27.8111, lon: 114.4163 },
    icon: 'yichun.png',
    neighbors: {
      // 江西省内
      "九江市": { distance: 155, steps: 206670 },     // 北面接壤
      "南昌市": { distance: 145, steps: 193330 },     // 东面接壤
      "新余市": { distance: 95, steps: 126670 },      // 南面接壤
      "萍乡市": { distance: 125, steps: 166670 },     // 西面接壤
      // 湖南省
      "岳阳市": { distance: 215, steps: 286670 }      // 西北面接壤
    }
  },

  "抚州市": {
    province: 'JXI',
    location: { lat: 27.9458, lon: 116.3584 },
    icon: 'fuzhou.png',
    neighbors: {
      // 江西省内
      "鹰潭市": { distance: 125, steps: 166670 },     // 北面接壤
      "上饶市": { distance: 165, steps: 220000 },     // 东北面接壤
      "南昌市": { distance: 115, steps: 153330 },     // 西面接壤
      "吉安市": { distance: 165, steps: 220000 },     // 西南面接壤
      "赣州市": { distance: 245, steps: 326670 },     // 南面接壤
      // 福建省
      "三明市": { distance: 245, steps: 326670 }      // 东面接壤
    }
  },

  "上饶市": {
    province: 'JXI',
    location: { lat: 28.4549, lon: 117.9434 },
    icon: 'shangrao.png',
    neighbors: {
      // 江西省内
      "景德镇市": { distance: 145, steps: 193330 },   // 西北面接壤
      "鹰潭市": { distance: 115, steps: 153330 },     // 西南面接壤
      "抚州市": { distance: 165, steps: 220000 },     // 南面接壤
      // 安徽省
      "黄山市": { distance: 165, steps: 220000 },     // 北面接壤
      "宣城市": { distance: 215, steps: 286670 },     // 西北面接壤
      // 浙江省
      "衢州市": { distance: 165, steps: 220000 },     // 东面接壤
      // 福建省
      "南平市": { distance: 245, steps: 326670 }      // 东南面接壤
    }
  },

  // === 山东省城市 ===
  "济南市": {
    province: 'SD',
    location: { lat: 36.6512, lon: 117.1201 },
    icon: 'jinan.png',
    neighbors: {
      // 山东省内
      "淄博市": { distance: 85, steps: 113330 },      // 东面接壤
      "泰安市": { distance: 65, steps: 86670 },       // 南面接壤
      "德州市": { distance: 145, steps: 193330 },     // 西北面接壤
      "滨州市": { distance: 155, steps: 206670 }      // 北面接壤
    }
  },

  "青岛市": {
    province: 'SD',
    location: { lat: 36.0671, lon: 120.3826 },
    icon: 'qingdao.png',
    neighbors: {
      // 山东省内
      "烟台市": { distance: 185, steps: 246670 },     // 东北面接壤
      "潍坊市": { distance: 145, steps: 193330 },     // 西北面接壤
      "日照市": { distance: 165, steps: 220000 }      // 西南面接壤
    }
  },

  "淄博市": {
    province: 'SD',
    location: { lat: 36.8131, lon: 118.0549 },
    icon: 'zibo.png',
    neighbors: {
      // 山东省内
      "济南市": { distance: 85, steps: 113330 },      // 西面接壤
      "潍坊市": { distance: 125, steps: 166670 },     // 东面接壤
      "滨州市": { distance: 115, steps: 153330 },     // 北面接壤
      "泰安市": { distance: 135, steps: 180000 }      // 南面接壤
    }
  },

  "枣庄市": {
    province: 'SD',
    location: { lat: 34.8107, lon: 117.3235 },
    icon: 'zaozhuang.png',
    neighbors: {
      // 山东省内
      "临沂市": { distance: 145, steps: 193330 },     // 东面接壤
      "济宁市": { distance: 125, steps: 166670 },     // 西北面接壤
      // 江苏省
      "徐州市": { distance: 125, steps: 166670 }      // 南面接壤
    }
  },

  "东营市": {
    province: 'SD',
    location: { lat: 37.4340, lon: 118.6747 },
    icon: 'dongying.png',
    neighbors: {
      // 山东省内
      "滨州市": { distance: 125, steps: 166670 },     // 西面接壤
      "潍坊市": { distance: 145, steps: 193330 },     // 南面接壤
      "烟台市": { distance: 185, steps: 246670 }      // 东面接壤
    }
  },

  "烟台市": {
    province: 'SD',
    location: { lat: 37.4638, lon: 121.4479 },
    icon: 'yantai.png',
    neighbors: {
      // 山东省内
      "东营市": { distance: 185, steps: 246670 },     // 西面接壤
      "潍坊市": { distance: 165, steps: 220000 },     // 西南面接壤
      "青岛市": { distance: 185, steps: 246670 },     // 南面接壤
      "威海市": { distance: 95, steps: 126670 }       // 东面接壤
    }
  },

  "潍坊市": {
    province: 'SD',
    location: { lat: 36.7067, lon: 119.1619 },
    icon: 'weifang.png',
    neighbors: {
      // 山东省内
      "东营市": { distance: 145, steps: 193330 },     // 北面接壤
      "烟台市": { distance: 165, steps: 220000 },     // 东北面接壤
      "青岛市": { distance: 145, steps: 193330 },     // 东面接壤
      "日照市": { distance: 185, steps: 246670 },     // 南面接壤
      "临沂市": { distance: 165, steps: 220000 },     // 南面接壤
      "淄博市": { distance: 125, steps: 166670 }      // 西面接壤
    }
  },

  "济宁市": {
    province: 'SD',
    location: { lat: 35.4154, lon: 116.5874 },
    icon: 'jining.png',
    neighbors: {
      // 山东省内
      "泰安市": { distance: 145, steps: 193330 },     // 北面接壤
      "枣庄市": { distance: 125, steps: 166670 },     // 东南面接壤
      "菏泽市": { distance: 165, steps: 220000 },     // 西面接壤
      // 江苏省
      "徐州市": { distance: 155, steps: 206670 }      // 南面接壤
    }
  },

  "泰安市": {
    province: 'SD',
    location: { lat: 36.1951, lon: 117.0884 },
    icon: 'taian.png',
    neighbors: {
      // 山东省内
      "济南市": { distance: 65, steps: 86670 },       // 北面接壤
      "淄博市": { distance: 135, steps: 180000 },     // 东北面接壤
      "临沂市": { distance: 185, steps: 246670 },     // 东南面接壤
      "济宁市": { distance: 145, steps: 193330 }      // 南面接壤
    }
  },

  "威海市": {
    province: 'SD',
    location: { lat: 37.5128, lon: 122.1201 },
    icon: 'weihai.png',
    neighbors: {
      // 山东省内
      "烟台市": { distance: 95, steps: 126670 }       // 西面接壤
    }
  },

  "日照市": {
    province: 'SD',
    location: { lat: 35.4164, lon: 119.5270 },
    icon: 'rizhao.png',
    neighbors: {
      // 山东省内
      "青岛市": { distance: 165, steps: 220000 },     // 北面接壤
      "潍坊市": { distance: 185, steps: 246670 },     // 西北面接壤
      "临沂市": { distance: 125, steps: 166670 },     // 西面接壤
      // 江苏省
      "连云港市": { distance: 145, steps: 193330 }    // 南面接壤
    }
  },

  "临沂市": {
    province: 'SD',
    location: { lat: 35.1042, lon: 118.3563 },
    icon: 'linyi.png',
    neighbors: {
      // 山东省内
      "日照市": { distance: 125, steps: 166670 },     // 东面接壤
      "潍坊市": { distance: 165, steps: 220000 },     // 北面接壤
      "泰安市": { distance: 185, steps: 246670 },     // 西北面接壤
      "枣庄市": { distance: 145, steps: 193330 },     // 西南面接壤
      // 江苏省
      "连云港市": { distance: 185, steps: 246670 }    // 东南面接壤
    }
  },

  "德州市": {
    province: 'SD',
    location: { lat: 37.4355, lon: 116.3575 },
    icon: 'dezhou.png',
    neighbors: {
      // 山东省内
      "济南市": { distance: 145, steps: 193330 },     // 东南面接壤
      "聊城市": { distance: 115, steps: 153330 },     // 南面接壤
      // 河北省
      "衡水市": { distance: 125, steps: 166670 },     // 西面接壤
      "沧州市": { distance: 165, steps: 220000 }      // 北面接壤
    }
  },

  "聊城市": {
    province: 'SD',
    location: { lat: 36.4574, lon: 115.9854 },
    icon: 'liaocheng.png',
    neighbors: {
      // 山东省内
      "德州市": { distance: 115, steps: 153330 },     // 北面接壤
      "济南市": { distance: 165, steps: 220000 },     // 东面接壤
      "菏泽市": { distance: 185, steps: 246670 },     // 南面接壤
      // 河北省
      "衡水市": { distance: 145, steps: 193330 },     // 西面接壤
      // 河南省
      "濮阳市": { distance: 155, steps: 206670 }      // 南面接壤
    }
  },

  "滨州市": {
    province: 'SD',
    location: { lat: 37.3835, lon: 117.9721 },
    icon: 'binzhou.png',
    neighbors: {
      // 山东省内
      "东营市": { distance: 125, steps: 166670 },     // 东面接壤
      "淄博市": { distance: 115, steps: 153330 },     // 南面接壤
      "济南市": { distance: 155, steps: 206670 },     // 西南面接壤
      "德州市": { distance: 175, steps: 233330 },     // 西面接壤
      // 河北省
      "沧州市": { distance: 185, steps: 246670 }      // 西北面接壤
    }
  },

  "菏泽市": {
    province: 'SD',
    location: { lat: 35.2333, lon: 115.4809 },
    icon: 'heze.png',
    neighbors: {
      // 山东省内
      "济宁市": { distance: 165, steps: 220000 },     // 东面接壤
      "聊城市": { distance: 185, steps: 246670 },     // 北面接壤
      // 河南省
      "商丘市": { distance: 145, steps: 193330 },     // 南面接壤
      "开封市": { distance: 175, steps: 233330 },     // 西面接壤
      "濮阳市": { distance: 155, steps: 206670 }      // 西北面接壤
    }
  },

  // === 河南省城市 ===
  "郑州市": {
    province: 'HEN',
    location: { lat: 34.7472, lon: 113.6249 },
    icon: 'zhengzhou.png',
    neighbors: {
      // 河南省内
      "开封市": { distance: 75, steps: 100000 },      // 东面接壤
      "新乡市": { distance: 85, steps: 113330 },      // 北面接壤
      "焦作市": { distance: 95, steps: 126670 },      // 西北面接壤
      "洛阳市": { distance: 145, steps: 193330 },     // 西面接壤
      "许昌市": { distance: 85, steps: 113330 }       // 南面接壤
    }
  },

  "开封市": {
    province: 'HEN',
    location: { lat: 34.7971, lon: 114.3074 },
    icon: 'kaifeng.png',
    neighbors: {
      // 河南省内
      "郑州市": { distance: 75, steps: 100000 },      // 西面接壤
      "新乡市": { distance: 115, steps: 153330 },     // 西北面接壤
      "商丘市": { distance: 155, steps: 206670 },     // 东面接壤
      "周口市": { distance: 145, steps: 193330 },     // 东南面接壤
      "许昌市": { distance: 125, steps: 166670 },     // 南面接壤
      // 山东省
      "菏泽市": { distance: 175, steps: 233330 }      // 东北面接壤
    }
  },

  "洛阳市": {
    province: 'HEN',
    location: { lat: 34.6197, lon: 112.4539 },
    icon: 'luoyang.png',
    neighbors: {
      // 河南省内
      "焦作市": { distance: 145, steps: 193330 },     // 东北面接壤
      "郑州市": { distance: 145, steps: 193330 },     // 东面接壤
      "平顶山市": { distance: 165, steps: 220000 },   // 东南面接壤
      "三门峡市": { distance: 185, steps: 246670 },   // 西面接壤
      "南阳市": { distance: 245, steps: 326670 },     // 南面接壤
      // 陕西省
      "渭南市": { distance: 215, steps: 286670 }      // 西北面接壤
    }
  },

  "平顶山市": {
    province: 'HEN',
    location: { lat: 33.7350, lon: 113.1922 },
    icon: 'pingdingshan.png',
    neighbors: {
      // 河南省内
      "洛阳市": { distance: 165, steps: 220000 },     // 西北面接壤
      "许昌市": { distance: 95, steps: 126670 },      // 东北面接壤
      "漯河市": { distance: 115, steps: 153330 },     // 东面接壤
      "南阳市": { distance: 185, steps: 246670 },     // 西南面接壤
      "驻马店市": { distance: 165, steps: 220000 }    // 东南面接壤
    }
  },

  "安阳市": {
    province: 'HEN',
    location: { lat: 36.0997, lon: 114.3931 },
    icon: 'anyang.png',
    neighbors: {
      // 河南省内
      "鹤壁市": { distance: 85, steps: 113330 },      // 南面接壤
      "新乡市": { distance: 145, steps: 193330 },     // 南面接壤
      // 河北省
      "邯郸市": { distance: 125, steps: 166670 },     // 北面接壤
      // 山西省
      "长治市": { distance: 185, steps: 246670 }      // 西面接壤
    }
  },

  "鹤壁市": {
    province: 'HEN',
    location: { lat: 35.7480, lon: 114.2975 },
    icon: 'hebi.png',
    neighbors: {
      // 河南省内
      "安阳市": { distance: 85, steps: 113330 },      // 北面接壤
      "新乡市": { distance: 95, steps: 126670 }       // 南面接壤
    }
  },

  "新乡市": {
    province: 'HEN',
    location: { lat: 35.3027, lon: 113.9268 },
    icon: 'xinxiang.png',
    neighbors: {
      // 河南省内
      "鹤壁市": { distance: 95, steps: 126670 },      // 北面接壤
      "焦作市": { distance: 85, steps: 113330 },      // 西面接壤
      "郑州市": { distance: 85, steps: 113330 },      // 南面接壤
      "开封市": { distance: 115, steps: 153330 },      // 东南面接壤
      "濮阳市": { distance: 165, steps: 220000 }     // 东北面接壤
    }
  },

  "焦作市": {
    province: 'HEN',
    location: { lat: 35.2159, lon: 113.2418 },
    icon: 'jiaozuo.png',
    neighbors: {
      // 河南省内
      "新乡市": { distance: 85, steps: 113330 },      // 东面接壤
      "郑州市": { distance: 95, steps: 126670 },      // 东南面接壤
      "洛阳市": { distance: 145, steps: 193330 },     // 南面接壤
      // 山西省
      "晋城市": { distance: 165, steps: 220000 }      // 北面接壤
    }
  },

  "濮阳市": {
    province: 'HEN',
    location: { lat: 35.7606, lon: 115.0288 },
    icon: 'puyang.png',
    neighbors: {
      // 河南省内
      "新乡市": { distance: 165, steps: 220000 },     // 西面接壤
      "安阳市": { distance: 125, steps: 166670 },     // 北面接壤
      // 山东省
      "聊城市": { distance: 155, steps: 206670 },     // 东面接壤
      "菏泽市": { distance: 155, steps: 206670 }      // 东南面接壤
    }
  },

  "许昌市": {
    province: 'HEN',
    location: { lat: 34.0357, lon: 113.8519 },
    icon: 'xuchang.png',
    neighbors: {
      // 河南省内
      "郑州市": { distance: 85, steps: 113330 },      // 北面接壤
      "开封市": { distance: 125, steps: 166670 },     // 东北面接壤
      "周口市": { distance: 145, steps: 193330 },     // 东面接壤
      "漯河市": { distance: 85, steps: 113330 },      // 南面接壤
      "平顶山市": { distance: 95, steps: 126670 }     // 西面接壤
    }
  },

  "漯河市": {
    province: 'HEN',
    location: { lat: 33.5815, lon: 114.0168 },
    icon: 'luohe.png',
    neighbors: {
      // 河南省内
      "许昌市": { distance: 85, steps: 113330 },      // 北面接壤
      "周口市": { distance: 125, steps: 166670 },     // 东面接壤
      "驻马店市": { distance: 115, steps: 153330 },   // 南面接壤
      "平顶山市": { distance: 115, steps: 153330 }    // 西面接壤
    }
  },

  "三门峡市": {
    province: 'HEN',
    location: { lat: 34.7733, lon: 111.1941 },
    icon: 'sanmenxia.png',
    neighbors: {
      // 河南省内
      "洛阳市": { distance: 185, steps: 246670 },     // 东面接壤
      "南阳市": { distance: 245, steps: 326670 },     // 东南面接壤
      // 陕西省
      "渭南市": { distance: 165, steps: 220000 },     // 西面接壤
      // 山西省
      "运城市": { distance: 125, steps: 166670 }      // 北面接壤
    }
  },

  "南阳市": {
    province: 'HEN',
    location: { lat: 32.9908, lon: 112.5285 },
    icon: 'nanyang.png',
    neighbors: {
      // 河南省内
      "三门峡市": { distance: 245, steps: 326670 },   // 西北面接壤
      "洛阳市": { distance: 245, steps: 326670 },     // 北面接壤
      "平顶山市": { distance: 185, steps: 246670 },   // 东北面接壤
      "驻马店市": { distance: 165, steps: 220000 },   // 东面接壤
      // 湖北省
      "襄阳市": { distance: 185, steps: 246670 },     // 南面接壤
      // 陕西省
      "商洛市": { distance: 245, steps: 326670 }      // 西面接壤
    }
  },

  "商丘市": {
    province: 'HEN',
    location: { lat: 34.4149, lon: 115.6505 },
    icon: 'shangqiu.png',
    neighbors: {
      // 河南省内
      "开封市": { distance: 145, steps: 193330 },     // 西面接壤
      "周口市": { distance: 125, steps: 166670 },     // 南面接壤
      // 安徽省
      "亳州市": { distance: 165, steps: 220000 }      // 东面接壤
    }
  },

  "信阳市": {
    province: 'HEN',
    location: { lat: 32.1467, lon: 114.0926 },
    icon: 'xinyang.png',
    neighbors: {
      // 河南省内
      "驻马店市": { distance: 145, steps: 193330 },   // 北面接壤
      // 湖北省
      "随州市": { distance: 165, steps: 220000 },     // 南面接壤
      "孝感市": { distance: 185, steps: 246670 },     // 南面接壤
      // 安徽省
      "六安市": { distance: 215, steps: 286670 }      // 东面接壤
    }
  },

  "周口市": {
    province: 'HEN',
    location: { lat: 33.6255, lon: 114.6965 },
    icon: 'zhoukou.png',
    neighbors: {
      // 河南省内
      "开封市": { distance: 145, steps: 193330 },     // 北面接壤
      "商丘市": { distance: 145, steps: 193330 },     // 东北面接壤
      "许昌市": { distance: 145, steps: 193330 },     // 西面接壤
      "漯河市": { distance: 125, steps: 166670 },     // 西南面接壤
      "驻马店市": { distance: 135, steps: 180000 },   // 南面接壤
      // 安徽省
      "阜阳市": { distance: 165, steps: 220000 }      // 东面接壤
    }
  },

  "驻马店市": {
    province: 'HEN',
    location: { lat: 33.0114, lon: 114.0226 },
    icon: 'zhumadian.png',
    neighbors: {
      // 河南省内
      "漯河市": { distance: 115, steps: 153330 },     // 北面接壤
      "周口市": { distance: 135, steps: 180000 },     // 东北面接壤
      "信阳市": { distance: 145, steps: 193330 },     // 东南面接壤
      "南阳市": { distance: 165, steps: 220000 },     // 西面接壤
      "平顶山市": { distance: 165, steps: 220000 }    // 西北面接壤
    }
  },

  // === 湖北省城市 ===
  "武汉市": {
    province: 'HUB',
    location: { lat: 30.5928, lon: 114.3055 },
    icon: 'wuhan.png',
    neighbors: {
      // 湖北省内
      "鄂州市": { distance: 55, steps: 73330 },       // 东面接壤
      "黄冈市": { distance: 75, steps: 100000 },      // 东北面接壤
      "孝感市": { distance: 85, steps: 113330 },      // 北面接壤
      "黄石市": { distance: 95, steps: 126670 }       // 东南面接壤
    }
  },

  "黄石市": {
    province: 'HUB',
    location: { lat: 30.2147, lon: 115.0381 },
    icon: 'huangshi.png',
    neighbors: {
      // 湖北省内
      "武汉市": { distance: 95, steps: 126670 },      // 西北面接壤
      "鄂州市": { distance: 45, steps: 60000 },       // 北面接壤
      "咸宁市": { distance: 85, steps: 113330 },      // 南面接壤
      // 江西省
      "九江市": { distance: 145, steps: 193330 }      // 东面接壤
    }
  },

  "十堰市": {
    province: 'HUB',
    location: { lat: 32.6292, lon: 110.7987 },
    icon: 'shiyan.png',
    neighbors: {
      // 湖北省内
      "襄阳市": { distance: 245, steps: 326670 },     // 东面接壤
      // 陕西省
      "安康市": { distance: 185, steps: 246670 },     // 西面接壤
      // 河南省
      "南阳市": { distance: 215, steps: 286670 }      // 北面接壤
    }
  },

  "宜昌市": {
    province: 'HUB',
    location: { lat: 30.7000, lon: 111.2803 },
    icon: 'yichang.png',
    neighbors: {
      // 湖北省内
      "襄阳市": { distance: 245, steps: 326670 },     // 北面接壤
      "荆门市": { distance: 165, steps: 220000 },     // 东北面接壤
      "荆州市": { distance: 145, steps: 193330 },     // 东面接壤
      "恩施土家族苗族自治州": { distance: 265, steps: 353330 },     // 西南面接壤
      // 重庆市
      "重庆市": { distance: 485, steps: 646670 }      // 西面接壤
    }
  },

  "襄阳市": {
    province: 'HUB',
    location: { lat: 32.0090, lon: 112.1220 },
    icon: 'xiangyang.png',
    neighbors: {
      // 湖北省内
      "十堰市": { distance: 245, steps: 326670 },     // 西北面接壤
      "随州市": { distance: 145, steps: 193330 },     // 东北面接壤
      "孝感市": { distance: 165, steps: 220000 },     // 东面接壤
      "荆门市": { distance: 125, steps: 166670 },     // 南面接壤
      "宜昌市": { distance: 245, steps: 326670 },     // 西南面接壤
      // 河南省
      "南阳市": { distance: 185, steps: 246670 }      // 北面接壤
    }
  },

  "鄂州市": {
    province: 'HUB',
    location: { lat: 30.3875, lon: 114.8948 },
    icon: 'ezhou.png',
    neighbors: {
      // 湖北省内
      "武汉市": { distance: 55, steps: 73330 },       // 西面接壤
      "黄冈市": { distance: 75, steps: 100000 },      // 北面接壤
      "黄石市": { distance: 45, steps: 60000 }        // 南面接壤
    }
  },

  "荆门市": {
    province: 'HUB',
    location: { lat: 31.0354, lon: 112.1990 },
    icon: 'jingmen.png',
    neighbors: {
      // 湖北省内
      "襄阳市": { distance: 125, steps: 166670 },     // 北面接壤
      "孝感市": { distance: 145, steps: 193330 },     // 东北面接壤
      "荆州市": { distance: 125, steps: 166670 },     // 南面接壤
      "宜昌市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "孝感市": {
    province: 'HUB',
    location: { lat: 30.9242, lon: 113.9167 },
    icon: 'xiaogan.png',
    neighbors: {
      // 湖北省内
      "随州市": { distance: 145, steps: 193330 },     // 北面接壤
      "黄冈市": { distance: 115, steps: 153330 },     // 东面接壤
      "武汉市": { distance: 85, steps: 113330 },      // 南面接壤
      "荆门市": { distance: 145, steps: 193330 },     // 西面接壤
      "襄阳市": { distance: 165, steps: 220000 },     // 西北面接壤
      // 河南省
      "信阳市": { distance: 185, steps: 246670 }      // 北面接壤
    }
  },

  "荆州市": {
    province: 'HUB',
    location: { lat: 30.3340, lon: 112.2417 },
    icon: 'jingzhou.png',
    neighbors: {
      // 湖北省内
      "荆门市": { distance: 125, steps: 166670 },     // 北面接壤
      "宜昌市": { distance: 145, steps: 193330 },     // 西面接壤
      "咸宁市": { distance: 125, steps: 166670 },     // 南面接壤
      // 湖南省
      "岳阳市": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },

  "黄冈市": {
    province: 'HUB',
    location: { lat: 30.4461, lon: 114.8721 },
    icon: 'huanggang.png',
    neighbors: {
      // 湖北省内
      "孝感市": { distance: 115, steps: 153330 },     // 西北面接壤
      "武汉市": { distance: 75, steps: 100000 },      // 西面接壤
      "鄂州市": { distance: 75, steps: 100000 },      // 南面接壤
      "咸宁市": { distance: 125, steps: 166670 },     // 东南面接壤
      // 河南省
      "信阳市": { distance: 165, steps: 220000 },     // 北面接壤
      // 安徽省
      "安庆市": { distance: 235, steps: 313330 }      // 东面接壤
    }
  },

  "咸宁市": {
    province: 'HUB',
    location: { lat: 29.8416, lon: 114.3220 },
    icon: 'xianning.png',
    neighbors: {
      // 湖北省内
      "黄石市": { distance: 85, steps: 113330 },      // 北面接壤
      "黄冈市": { distance: 125, steps: 166670 },     // 北面接壤
      "荆州市": { distance: 125, steps: 166670 },     // 南面接壤
      // 湖南省
      "岳阳市": { distance: 145, steps: 193330 },     // 南面接壤
      // 江西省
      "九江市": { distance: 165, steps: 220000 }      // 东面接壤
    }
  },

  "随州市": {
    province: 'HUB',
    location: { lat: 31.6902, lon: 113.3737 },
    icon: 'suizhou.png',
    neighbors: {
      // 湖北省内
      "襄阳市": { distance: 145, steps: 193330 },     // 西面接壤
      "孝感市": { distance: 145, steps: 193330 },     // 南面接壤
      // 河南省
      "信阳市": { distance: 165, steps: 220000 }      // 北面接壤
    }
  },

  "恩施土家族苗族自治州": {
    province: 'HUB',
    location: { lat: 30.2720, lon: 109.4881 },
    icon: 'enshi.png',
    neighbors: {
      // 湖北省内
      "宜昌市": { distance: 265, steps: 353330 },     // 东北面接壤
      // 重庆市
      "重庆市": { distance: 385, steps: 513330 },     // 西面接壤
      // 湖南省
      "张家界市": { distance: 245, steps: 326670 }    // 南面接壤
    }
  },

  // === 湖南省城市 ===
  "长沙市": {
    province: 'HUN',
    location: { lat: 28.2278, lon: 112.9388 },
    icon: 'changsha.png',
    neighbors: {
      // 湖南省内
      "岳阳市": { distance: 145, steps: 193330 },     // 北面接壤
      "株洲市": { distance: 65, steps: 86670 },       // 东面接壤
      "湘潭市": { distance: 55, steps: 73330 },       // 南面接壤
      "益阳市": { distance: 85, steps: 113330 },      // 西面接壤
      "娄底市": { distance: 115, steps: 153330 }      // 西南面接壤
    }
  },

  "株洲市": {
    province: 'HUN',
    location: { lat: 27.8273, lon: 113.1340 },
    icon: 'zhuzhou.png',
    neighbors: {
      // 湖南省内
      "长沙市": { distance: 65, steps: 86670 },       // 西面接壤
      "湘潭市": { distance: 45, steps: 60000 },       // 西南面接壤
      "衡阳市": { distance: 145, steps: 193330 },     // 南面接壤
      // 江西省
      "萍乡市": { distance: 145, steps: 193330 }      // 东面接壤
    }
  },

  "湘潭市": {
    province: 'HUN',
    location: { lat: 27.8294, lon: 112.9447 },
    icon: 'xiangtan.png',
    neighbors: {
      // 湖南省内
      "长沙市": { distance: 55, steps: 73330 },       // 北面接壤
      "株洲市": { distance: 45, steps: 60000 },       // 东面接壤
      "衡阳市": { distance: 135, steps: 180000 },     // 南面接壤
      "娄底市": { distance: 95, steps: 126670 }       // 西面接壤
    }
  },

  "衡阳市": {
    province: 'HUN',
    location: { lat: 26.8982, lon: 112.5719 },
    icon: 'hengyang.png',
    neighbors: {
      // 湖南省内
      "株洲市": { distance: 145, steps: 193330 },     // 北面接壤
      "湘潭市": { distance: 135, steps: 180000 },     // 北面接壤
      "娄底市": { distance: 165, steps: 220000 },     // 西北面接壤
      "邵阳市": { distance: 145, steps: 193330 },     // 西面接壤
      "永州市": { distance: 165, steps: 220000 },     // 南面接壤
      "郴州市": { distance: 185, steps: 246670 },     // 东南面接壤
      // 江西省
      "萍乡市": { distance: 185, steps: 246670 }      // 东北面接壤
    }
  },

  "邵阳市": {
    province: 'HUN',
    location: { lat: 27.2386, lon: 111.4673 },
    icon: 'shaoyang.png',
    neighbors: {
      // 湖南省内
      "娄底市": { distance: 125, steps: 166670 },     // 北面接壤
      "衡阳市": { distance: 145, steps: 193330 },     // 东面接壤
      "永州市": { distance: 165, steps: 220000 },     // 南面接壤
      "怀化市": { distance: 185, steps: 246670 }      // 西面接壤
    }
  },

  "岳阳市": {
    province: 'HUN',
    location: { lat: 29.3579, lon: 113.1289 },
    icon: 'yueyang.png',
    neighbors: {
      // 湖南省内
      "长沙市": { distance: 145, steps: 193330 },     // 南面接壤
      "常德市": { distance: 165, steps: 220000 },     // 西面接壤
      "咸宁市": { distance: 145, steps: 193330 },     // 东北面接壤
      // 江西省
      "九江市": { distance: 125, steps: 166670 }      // 东面接壤
    }
  },

  "常德市": {
    province: 'HUN',
    location: { lat: 29.0321, lon: 111.6984 },
    icon: 'changde.png',
    neighbors: {
      // 湖南省内
      "岳阳市": { distance: 165, steps: 220000 },     // 东面接壤
      "益阳市": { distance: 125, steps: 166670 },     // 东南面接壤
      "娄底市": { distance: 185, steps: 246670 },     // 南面接壤
      "怀化市": { distance: 215, steps: 286670 },     // 西南面接壤
      "张家界市": { distance: 145, steps: 193330 }    // 西面接壤
    }
  },

  "张家界市": {
    province: 'HUN',
    location: { lat: 29.1169, lon: 110.4791 },
    icon: 'zhangjiajie.png',
    neighbors: {
      // 湖南省内
      "常德市": { distance: 145, steps: 193330 },     // 东面接壤
      "怀化市": { distance: 185, steps: 246670 },     // 南面接壤
      "湘西土家族苗族自治州": { distance: 125, steps: 166670 },     // 西面接壤
      // 湖北省
      "恩施土家族苗族自治州": { distance: 245, steps: 326670 }      // 北面接壤
    }
  },

  "益阳市": {
    province: 'HUN',
    location: { lat: 28.5535, lon: 112.3555 },
    icon: 'yiyang.png',
    neighbors: {
      // 湖南省内
      "常德市": { distance: 125, steps: 166670 },     // 西北面接壤
      "岳阳市": { distance: 165, steps: 220000 },     // 北面接壤
      "长沙市": { distance: 85, steps: 113330 },      // 东面接壤
      "娄底市": { distance: 125, steps: 166670 }      // 南面接壤
    }
  },

  "郴州市": {
    province: 'HUN',
    location: { lat: 25.7707, lon: 113.0150 },
    icon: 'chenzhou.png',
    neighbors: {
      // 湖南省内
      "衡阳市": { distance: 185, steps: 246670 },     // 北面接壤
      "永州市": { distance: 165, steps: 220000 },     // 西面接壤
      // 广东省
      "韶关市": { distance: 165, steps: 220000 },     // 南面接壤
      // 江西省
      "赣州市": { distance: 185, steps: 246670 }      // 东面接壤
    }
  },

  "永州市": {
    province: 'HUN',
    location: { lat: 26.4200, lon: 111.6132 },
    icon: 'yongzhou.png',
    neighbors: {
      // 湖南省内
      "衡阳市": { distance: 165, steps: 220000 },     // 北面接壤
      "邵阳市": { distance: 165, steps: 220000 },     // 西北面接壤
      "郴州市": { distance: 165, steps: 220000 },     // 东面接壤
      // 广西壮族自治区
      "桂林市": { distance: 245, steps: 326670 }      // 西南面接壤
    }
  },

  "怀化市": {
    province: 'HUN',
    location: { lat: 27.5700, lon: 110.0037 },
    icon: 'huaihua.png',
    neighbors: {
      // 湖南省内
      "张家界市": { distance: 185, steps: 246670 },   // 北面接壤
      "常德市": { distance: 215, steps: 286670 },     // 东北面接壤
      "娄底市": { distance: 185, steps: 246670 },     // 东面接壤
      "邵阳市": { distance: 185, steps: 246670 },     // 东南面接壤
      "湘西土家族苗族自治州": { distance: 145, steps: 193330 },     // 西北面接壤
      // 贵州省
      "铜仁市": { distance: 165, steps: 220000 }      // 西南面接壤
    }
  },

  "娄底市": {
    province: 'HUN',
    location: { lat: 27.7281, lon: 111.9965 },
    icon: 'loudi.png',
    neighbors: {
      // 湖南省内
      "长沙市": { distance: 115, steps: 153330 },     // 东北面接壤
      "湘潭市": { distance: 95, steps: 126670 },      // 东面接壤
      "衡阳市": { distance: 165, steps: 220000 },     // 东南面接壤
      "邵阳市": { distance: 125, steps: 166670 },     // 南面接壤
      "怀化市": { distance: 185, steps: 246670 },     // 西面接壤
      "常德市": { distance: 185, steps: 246670 },     // 西北面接壤
      "益阳市": { distance: 125, steps: 166670 }      // 北面接壤
    }
  },

  "湘西土家族苗族自治州": {
    province: 'HUN',
    location: { lat: 28.3112, lon: 109.7389 },
    icon: 'xiangxi.png',
    neighbors: {
      // 湖南省内
      "张家界市": { distance: 125, steps: 166670 },   // 东面接壤
      "怀化市": { distance: 145, steps: 193330 },     // 东南面接壤
      // 贵州省
      "铜仁市": { distance: 185, steps: 246670 },     // 西南面接壤
      // 重庆市
      "重庆市": { distance: 385, steps: 513330 }      // 西北面接壤
    }
  },

  // === 广东省城市 ===
  "广州市": {
    province: 'GD',
    location: { lat: 23.1291, lon: 113.2644 },
    icon: 'guangzhou.png',
    neighbors: {
      // 广东省内
      "佛山市": { distance: 45, steps: 60000 },       // 西面接壤
      "东莞市": { distance: 55, steps: 73330 },       // 东面接壤
      "清远市": { distance: 115, steps: 153330 },     // 北面接壤
      "肇庆市": { distance: 125, steps: 166670 },     // 西北面接壤
      "深圳市": { distance: 145, steps: 193330 }      // 东南面接壤
    }
  },

  "深圳市": {
    province: 'GD',
    location: { lat: 22.5431, lon: 114.0579 },
    icon: 'shenzhen.png',
    neighbors: {
      // 广东省内
      "东莞市": { distance: 65, steps: 86670 },       // 北面接壤
      "惠州市": { distance: 85, steps: 113330 },      // 东北面接壤
      "广州市": { distance: 145, steps: 193330 },     // 西南面接壤
      "珠海市": { distance: 165, steps: 220000 },     // 西面接壤
      // 香港特别行政区
      "香港特别行政区": { distance: 35, steps: 46670 }      // 南面接壤
    }
  },

  "珠海市": {
    province: 'GD',
    location: { lat: 22.2710, lon: 113.5767 },
    icon: 'zhuhai.png',
    neighbors: {
      // 广东省内
      "中山市": { distance: 45, steps: 60000 },       // 北面接壤
      "江门市": { distance: 85, steps: 113330 },      // 西北面接壤
      "深圳市": { distance: 165, steps: 220000 },     // 东面接壤
      // 澳门特别行政区
      "澳门特别行政区": { distance: 15, steps: 20000 }      // 南面接壤
    }
  },

  "汕头市": {
    province: 'GD',
    location: { lat: 23.3535, lon: 116.6820 },
    icon: 'shantou.png',
    neighbors: {
      // 广东省内
      "潮州市": { distance: 65, steps: 86670 },       // 西面接壤
      "揭阳市": { distance: 85, steps: 113330 }       // 西南面接壤
    }
  },

  "佛山市": {
    province: 'GD',
    location: { lat: 23.0218, lon: 113.1219 },
    icon: 'foshan.png',
    neighbors: {
      // 广东省内
      "广州市": { distance: 45, steps: 60000 },       // 东面接壤
      "肇庆市": { distance: 115, steps: 153330 },     // 西北面接壤
      "江门市": { distance: 85, steps: 113330 },      // 西南面接壤
      "中山市": { distance: 65, steps: 86670 }        // 南面接壤
    }
  },

  "韶关市": {
    province: 'GD',
    location: { lat: 24.8108, lon: 113.5979 },
    icon: 'shaoguan.png',
    neighbors: {
      // 广东省内
      "清远市": { distance: 145, steps: 193330 },     // 南面接壤
      "河源市": { distance: 165, steps: 220000 },     // 东南面接壤
      // 湖南省
      "郴州市": { distance: 165, steps: 220000 },     // 北面接壤
      // 江西省
      "赣州市": { distance: 215, steps: 286670 }      // 东北面接壤
    }
  },

  "湛江市": {
    province: 'GD',
    location: { lat: 21.2707, lon: 110.3594 },
    icon: 'zhanjiang.png',
    neighbors: {
      // 广东省内
      "茂名市": { distance: 145, steps: 193330 },     // 东北面接壤
      "阳江市": { distance: 215, steps: 286670 },     // 东面接壤
      // 广西壮族自治区
      "北海市": { distance: 165, steps: 220000 },      // 西面接壤
      // 海南省
      "海口市": { distance: 245, steps: 326670 }       // 南面隔海
    }
  },

  "肇庆市": {
    province: 'GD',
    location: { lat: 23.0471, lon: 112.4663 },
    icon: 'zhaoqing.png',
    neighbors: {
      // 广东省内
      "清远市": { distance: 145, steps: 193330 },     // 北面接壤
      "广州市": { distance: 125, steps: 166670 },     // 东面接壤
      "佛山市": { distance: 115, steps: 153330 },     // 东南面接壤
      "云浮市": { distance: 125, steps: 166670 },     // 西面接壤
      "江门市": { distance: 145, steps: 193330 }      // 南面接壤
    }
  },

  "江门市": {
    province: 'GD',
    location: { lat: 22.5789, lon: 113.0815 },
    icon: 'jiangmen.png',
    neighbors: {
      // 广东省内
      "肇庆市": { distance: 145, steps: 193330 },     // 北面接壤
      "佛山市": { distance: 85, steps: 113330 },      // 东北面接壤
      "中山市": { distance: 65, steps: 86670 },       // 东面接壤
      "珠海市": { distance: 85, steps: 113330 },      // 东南面接壤
      "阳江市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "茂名市": {
    province: 'GD',
    location: { lat: 21.6631, lon: 110.9253 },
    icon: 'maoming.png',
    neighbors: {
      // 广东省内
      "云浮市": { distance: 165, steps: 220000 },     // 北面接壤
      "阳江市": { distance: 145, steps: 193330 },     // 东面接壤
      "湛江市": { distance: 145, steps: 193330 }      // 西南面接壤
    }
  },

  "惠州市": {
    province: 'GD',
    location: { lat: 23.1116, lon: 114.4161 },
    icon: 'huizhou.png',
    neighbors: {
      // 广东省内
      "深圳市": { distance: 85, steps: 113330 },      // 南面接壤
      "东莞市": { distance: 75, steps: 100000 },      // 西面接壤
      "河源市": { distance: 145, steps: 193330 },     // 北面接壤
      "汕尾市": { distance: 165, steps: 220000 }      // 东面接壤
    }
  },

  "梅州市": {
    province: 'GD',
    location: { lat: 24.2885, lon: 116.1225 },
    icon: 'meizhou.png',
    neighbors: {
      // 广东省内
      "河源市": { distance: 165, steps: 220000 },     // 西面接壤
      "揭阳市": { distance: 145, steps: 193330 },     // 南面接壤
      // 福建省
      "龙岩市": { distance: 185, steps: 246670 },     // 东北面接壤
      // 江西省
      "赣州市": { distance: 215, steps: 286670 }      // 北面接壤
    }
  },

  "汕尾市": {
    province: 'GD',
    location: { lat: 22.7787, lon: 115.3759 },
    icon: 'shanwei.png',
    neighbors: {
      // 广东省内
      "惠州市": { distance: 165, steps: 220000 },     // 西面接壤
      "揭阳市": { distance: 145, steps: 193330 }      // 东面接壤
    }
  },

  "阳江市": {
    province: 'GD',
    location: { lat: 21.8579, lon: 111.9826 },
    icon: 'yangjiang.png',
    neighbors: {
      // 广东省内
      "云浮市": { distance: 185, steps: 246670 },     // 北面接壤
      "江门市": { distance: 165, steps: 220000 },     // 东面接壤
      "茂名市": { distance: 145, steps: 193330 },     // 西面接壤
      "湛江市": { distance: 215, steps: 286670 }      // 西南面接壤
    }
  },

  "清远市": {
    province: 'GD',
    location: { lat: 23.6817, lon: 113.0561 },
    icon: 'qingyuan.png',
    neighbors: {
      // 广东省内
      "韶关市": { distance: 145, steps: 193330 },     // 南面接壤
      "河源市": { distance: 185, steps: 246670 },     // 东面接壤
      "广州市": { distance: 115, steps: 153330 },     // 南面接壤
      "肇庆市": { distance: 145, steps: 193330 }      // 西面接壤
    }
  },

  "东莞市": {
    province: 'GD',
    location: { lat: 23.0430, lon: 113.7633 },
    icon: 'dongguan.png',
    neighbors: {
      // 广东省内
      "广州市": { distance: 55, steps: 73330 },       // 西面接壤
      "深圳市": { distance: 65, steps: 86670 },       // 南面接壤
      "惠州市": { distance: 75, steps: 100000 }       // 东面接壤
    }
  },

  "中山市": {
    province: 'GD',
    location: { lat: 22.5176, lon: 113.3926 },
    icon: 'zhongshan.png',
    neighbors: {
      // 广东省内
      "佛山市": { distance: 65, steps: 86670 },       // 北面接壤
      "江门市": { distance: 65, steps: 86670 },       // 西面接壤
      "珠海市": { distance: 45, steps: 60000 }        // 南面接壤
    }
  },

  // === 广东省城市 ===
  "潮州市": {
    province: 'GD',
    location: { lat: 23.6618, lon: 116.6220 },
    icon: 'chaozhou.png',
    neighbors: {
      // 广东省内
      "揭阳市": { distance: 65, steps: 86670 },       // 北面接壤
      "汕头市": { distance: 65, steps: 86670 },       // 东面接壤
      "梅州市": { distance: 145, steps: 193330 }      // 北面接壤
    }
  },

  "揭阳市": {
    province: 'GD',
    location: { lat: 23.5500, lon: 116.3728 },
    icon: 'jieyang.png',
    neighbors: {
      // 广东省内
      "潮州市": { distance: 65, steps: 86670 },       // 北面接壤
      "汕头市": { distance: 85, steps: 113330 },      // 东北面接壤
      "汕尾市": { distance: 145, steps: 193330 },     // 西面接壤
      "梅州市": { distance: 145, steps: 193330 }      // 北西面接壤
    }
  },

  "云浮市": {
    province: 'GD',
    location: { lat: 22.9150, lon: 112.0440 },
    icon: 'yunfu.png',
    neighbors: {
      // 广东省内
      "肇庆市": { distance: 125, steps: 166670 },     // 东面接壤
      "阳江市": { distance: 185, steps: 246670 },     // 南面接壤
      "茂名市": { distance: 165, steps: 220000 },     // 西南面接壤
      // 广西壮族自治区
      "梧州市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  // === 广西壮族自治区城市 ===
  "南宁市": {
    province: 'GX',
    location: { lat: 22.8170, lon: 108.3665 },
    icon: 'nanning.png',
    neighbors: {
      // 广西壮族自治区内
      "崇左市": { distance: 115, steps: 153330 },     // 西南面接壤
      "来宾市": { distance: 145, steps: 193330 },     // 北面接壤
      "贵港市": { distance: 115, steps: 153330 },     // 东北面接壤
      "钦州市": { distance: 125, steps: 166670 }      // 南面接壤
    }
  },

  "柳州市": {
    province: 'GX',
    location: { lat: 24.3255, lon: 109.4283 },
    icon: 'liuzhou.png',
    neighbors: {
      // 广西壮族自治区内
      "河池市": { distance: 165, steps: 220000 },     // 西北面接壤
      "来宾市": { distance: 115, steps: 153330 },     // 南面接壤
      "贵港市": { distance: 165, steps: 220000 },     // 东南面接壤
      "桂林市": { distance: 185, steps: 246670 },     // 东北面接壤
      // 贵州省
      "黔南州": { distance: 245, steps: 326670 }      // 北面接壤
    }
  },

  "桂林市": {
    province: 'GX',
    location: { lat: 25.2744, lon: 110.2992 },
    icon: 'guilin.png',
    neighbors: {
      // 广西壮族自治区内
      "柳州市": { distance: 185, steps: 246670 },     // 西面接壤
      "贺州市": { distance: 165, steps: 220000 },     // 东面接壤
      // 湖南省
      "永州市": { distance: 245, steps: 326670 },     // 北面接壤
      // 贵州省
      "黔东南苗族侗族自治州": { distance: 285, steps: 380000 }    // 西北面接壤
    }
  },

  "梧州市": {
    province: 'GX',
    location: { lat: 23.4748, lon: 111.2790 },
    icon: 'wuzhou.png',
    neighbors: {
      // 广西壮族自治区内
      "贺州市": { distance: 145, steps: 193330 },     // 东面接壤
      "贵港市": { distance: 125, steps: 166670 },     // 西面接壤
      "玉林市": { distance: 165, steps: 220000 },     // 西南面接壤
      // 广东省
      "云浮市": { distance: 165, steps: 220000 }      // 东面接壤
    }
  },

  "北海市": {
    province: 'GX',
    location: { lat: 21.4734, lon: 109.1197 },
    icon: 'beihai.png',
    neighbors: {
      // 广西壮族自治区内
      "钦州市": { distance: 85, steps: 113330 },      // 西面接壤
      // 广东省
      "湛江市": { distance: 165, steps: 220000 }      // 东面接壤
    }
  },

  "防城港市": {
    province: 'GX',
    location: { lat: 21.6867, lon: 108.3547 },
    icon: 'fangchenggang.png',
    neighbors: {
      // 广西壮族自治区内
      "钦州市": { distance: 115, steps: 153330 },     // 东面接壤
      "崇左市": { distance: 145, steps: 193330 }      // 北面接壤
    }
  },

  "钦州市": {
    province: 'GX',
    location: { lat: 21.9797, lon: 108.6242 },
    icon: 'qinzhou.png',
    neighbors: {
      // 广西壮族自治区内
      "防城港市": { distance: 115, steps: 153330 },   // 西面接壤
      "南宁市": { distance: 125, steps: 166670 },     // 北面接壤
      "玉林市": { distance: 165, steps: 220000 },     // 东面接壤
      "北海市": { distance: 85, steps: 113330 }       // 东南面接壤
    }
  },

  "贵港市": {
    province: 'GX',
    location: { lat: 23.1115, lon: 109.5986 },
    icon: 'guigang.png',
    neighbors: {
      // 广西壮族自治区内
      "南宁市": { distance: 115, steps: 153330 },     // 西面接壤
      "来宾市": { distance: 125, steps: 166670 },     // 北面接壤
      "柳州市": { distance: 165, steps: 220000 },     // 西北面接壤
      "梧州市": { distance: 125, steps: 166670 },     // 东面接壤
      "玉林市": { distance: 115, steps: 153330 }      // 南面接壤
    }
  },

  "玉林市": {
    province: 'GX',
    location: { lat: 22.6545, lon: 110.1545 },
    icon: 'yulin.png',
    neighbors: {
      // 广西壮族自治区内
      "贵港市": { distance: 115, steps: 153330 },     // 北面接壤
      "钦州市": { distance: 165, steps: 220000 },     // 西面接壤
      "梧州市": { distance: 165, steps: 220000 },     // 东北面接壤
      "贺州市": { distance: 215, steps: 286670 },     // 东面接壤
      "百色市": { distance: 185, steps: 246670 }      // 南面接壤
    }
  },

  "百色市": {
    province: 'GX',
    location: { lat: 23.9027, lon: 106.6184 },
    icon: 'baise.png',
    neighbors: {
      // 广西壮族自治区内
      "河池市": { distance: 185, steps: 246670 },     // 东北面接壤
      "来宾市": { distance: 215, steps: 286670 },     // 东面接壤
      "崇左市": { distance: 215, steps: 286670 },     // 南面接壤
      "玉林市": { distance: 185, steps: 246670 },     // 西南面接壤
      // 云南省
      "文山州": { distance: 165, steps: 220000 },     // 西面接壤
      // 贵州省
      "黔南州": { distance: 245, steps: 326670 }      // 北面接壤
    }
  },

  "贺州市": {
    province: 'GX',
    location: { lat: 24.4037, lon: 111.5520 },
    icon: 'hezhou.png',
    neighbors: {
      // 广西壮族自治区内
      "桂林市": { distance: 165, steps: 220000 },     // 北面接壤
      "梧州市": { distance: 145, steps: 193330 },     // 西南面接壤
      "玉林市": { distance: 215, steps: 286670 },     // 南面接壤
      // 湖南省
      "永州市": { distance: 215, steps: 286670 }      // 东北面接壤
    }
  },

  "河池市": {
    province: 'GX',
    location: { lat: 24.6926, lon: 108.0851 },
    icon: 'hechi.png',
    neighbors: {
      // 广西壮族自治区内
      "柳州市": { distance: 165, steps: 220000 },     // 东面接壤
      "来宾市": { distance: 185, steps: 246670 },     // 东南面接壤
      "百色市": { distance: 185, steps: 246670 },     // 西南面接壤
      // 贵州省
      "黔南州": { distance: 215, steps: 286670 },     // 北面接壤
      "黔西南布依族苗族自治州": { distance: 245, steps: 326670 }      // 西北面接壤
    }
  },

  "来宾市": {
    province: 'GX',
    location: { lat: 23.7521, lon: 109.2214 },
    icon: 'laibin.png',
    neighbors: {
      // 广西壮族自治区内
      "河池市": { distance: 185, steps: 246670 },     // 北面接壤
      "柳州市": { distance: 115, steps: 153330 },     // 东北面接壤
      "贵港市": { distance: 125, steps: 166670 },     // 东南面接壤
      "南宁市": { distance: 145, steps: 193330 },     // 西南面接壤
      "百色市": { distance: 215, steps: 286670 }      // 东面接壤
    }
  },

  "崇左市": {
    province: 'GX',
    location: { lat: 22.4040, lon: 107.3645 },
    icon: 'chongzuo.png',
    neighbors: {
      // 广西壮族自治区内
      "南宁市": { distance: 115, steps: 153330 },     // 东北面接壤
      "百色市": { distance: 215, steps: 286670 },     // 北面接壤
      "防城港市": { distance: 145, steps: 193330 },   // 南面接壤
      // 越南
      "谅山省": { distance: 145, steps: 193330 }      // 西南面接壤
    }
  },

  // === 海南省城市 ===
  "海口市": {
    province: 'HAN',
    location: { lat: 20.0440, lon: 110.1904 },
    icon: 'haikou.png',
    neighbors: {
      // 海南省内
      "儋州市": { distance: 145, steps: 193330 },     // 西面接壤
      "三亚市": { distance: 245, steps: 326670 },      // 南面接壤
      // 广东省
      "湛江市": { distance: 245, steps: 326670 }       // 北面隔海
    }
  },

  "三亚市": {
    province: 'HAN',
    location: { lat: 18.2528, lon: 109.5127 },
    icon: 'sanya.png',
    neighbors: {
      // 海南省内
      "海口市": { distance: 245, steps: 326670 },     // 北面接壤
      "儋州市": { distance: 215, steps: 286670 },     // 西北面接壤
      "三沙市": { distance: 385, steps: 513330 }      // 东南面隔海
    }
  },

  "儋州市": {
    province: 'HAN',
    location: { lat: 19.5211, lon: 109.5811 },
    icon: 'danzhou.png',
    neighbors: {
      // 海南省内
      "海口市": { distance: 145, steps: 193330 },     // 东面接壤
      "三亚市": { distance: 215, steps: 286670 }      // 南面接壤
    }
  },

  "三沙市": {
    province: 'HAN',
    location: { lat: 16.8310, lon: 112.3385 },
    icon: 'sansha.png',
    neighbors: {
      // 海南省内
      "三亚市": { distance: 385, steps: 513330 }      // 西北面隔海
    }
  },

  // === 四川省城市 ===
  "成都市": {
    province: 'SC',
    location: { lat: 30.5728, lon: 104.0668 },
    icon: 'chengdu.png',
    neighbors: {
      // 四川省内
      "德阳市": { distance: 85, steps: 113330 },      // 北面接壤
      "眉山市": { distance: 75, steps: 100000 },      // 南面接壤
      "资阳市": { distance: 95, steps: 126670 },      // 东南面接壤
      "遂宁市": { distance: 145, steps: 193330 },     // 东北面接壤
      "绵阳市": { distance: 165, steps: 220000 },     // 西北面接壤
      "雅安市": { distance: 155, steps: 206670 }      // 西南面接壤
    }
  },

  "绵阳市": {
    province: 'SC',
    location: { lat: 31.4679, lon: 104.6796 },
    icon: 'mianyang.png',
    neighbors: {
      // 四川省内
      "德阳市": { distance: 115, steps: 153330 },     // 东南面接壤
      "成都市": { distance: 165, steps: 220000 },     // 东南面接壤
      "广元市": { distance: 185, steps: 246670 },     // 北面接壤
      "南充市": { distance: 165, steps: 220000 },     // 东面接壤
      "遂宁市": { distance: 145, steps: 193330 },     // 东南面接壤
      // 甘肃省
      "陇南市": { distance: 245, steps: 326670 }      // 西北面接壤
    }
  },

  "自贡市": {
    province: 'SC',
    location: { lat: 29.3390, lon: 104.7786 },
    icon: 'zigong.png',
    neighbors: {
      // 四川省内
      "内江市": { distance: 85, steps: 113330 },      // 东面接壤
      "泸州市": { distance: 145, steps: 193330 },     // 东南面接壤
      "宜宾市": { distance: 125, steps: 166670 },     // 南面接壤
      "资阳市": { distance: 115, steps: 153330 },     // 北面接壤
      "眉山市": { distance: 125, steps: 166670 }      // 西面接壤
    }
  },

  "攀枝花市": {
    province: 'SC',
    location: { lat: 26.5821, lon: 101.7182 },
    icon: 'panzhihua.png',
    neighbors: {
      // 四川省内
      "凉山彝族自治州": { distance: 245, steps: 326670 },     // 北面接壤
      // 云南省
      "丽江市": { distance: 285, steps: 380000 },     // 西南面接壤
      "昭通市": { distance: 215, steps: 286670 },     // 东面接壤
      "怒江傈僳族自治州": { distance: 285, steps: 380000 }    // 西面接壤
    }
  },

  "泸州市": {
    province: 'SC',
    location: { lat: 28.8717, lon: 105.4422 },
    icon: 'luzhou.png',
    neighbors: {
      // 四川省内
      "自贡市": { distance: 145, steps: 193330 },     // 西北面接壤
      "宜宾市": { distance: 125, steps: 166670 },     // 西南面接壤
      "内江市": { distance: 165, steps: 220000 },     // 北面接壤
      // 重庆市
      "重庆市": { distance: 215, steps: 286670 },     // 东面接壤
      // 贵州省
      "遵义市": { distance: 245, steps: 326670 }      // 东南面接壤
    }
  },

  "德阳市": {
    province: 'SC',
    location: { lat: 31.1311, lon: 104.3980 },
    icon: 'deyang.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 85, steps: 113330 },      // 南面接壤
      "绵阳市": { distance: 115, steps: 153330 },     // 东南面接壤
      "遂宁市": { distance: 145, steps: 193330 },     // 东面接壤
      "资阳市": { distance: 125, steps: 166670 }      // 东南面接壤
    }
  },

  "广元市": {
    province: 'SC',
    location: { lat: 32.4335, lon: 105.8433 },
    icon: 'guangyuan.png',
    neighbors: {
      // 四川省内
      "绵阳市": { distance: 185, steps: 246670 },     // 南面接壤
      "南充市": { distance: 215, steps: 286670 },     // 东南面接壤
      "巴中市": { distance: 165, steps: 220000 },     // 东面接壤
      // 陕西省
      "汉中市": { distance: 245, steps: 326670 },     // 北面接壤
      // 甘肃省
      "陇南市": { distance: 185, steps: 246670 }      // 西北面接壤
    }
  },

  "遂宁市": {
    province: 'SC',
    location: { lat: 30.5332, lon: 105.5932 },
    icon: 'suining.png',
    neighbors: {
      // 四川省内
      "德阳市": { distance: 145, steps: 193330 },     // 西面接壤
      "成都市": { distance: 145, steps: 193330 },     // 西南面接壤
      "资阳市": { distance: 115, steps: 153330 },     // 南面接壤
      "内江市": { distance: 165, steps: 220000 },     // 东南面接壤
      "南充市": { distance: 125, steps: 166670 },     // 北面接壤
      "绵阳市": { distance: 145, steps: 193330 }      // 西南面接壤
    }
  },

  "内江市": {
    province: 'SC',
    location: { lat: 29.5827, lon: 105.0584 },
    icon: 'neijiang.png',
    neighbors: {
      // 四川省内
      "自贡市": { distance: 85, steps: 113330 },      // 西面接壤
      "资阳市": { distance: 125, steps: 166670 },     // 北面接壤
      "遂宁市": { distance: 165, steps: 220000 },     // 北面接壤
      "泸州市": { distance: 165, steps: 220000 },     // 东南面接壤
      // 重庆市
      "重庆市": { distance: 245, steps: 326670 }      // 东面接壤
    }
  },

  "乐山市": {
    province: 'SC',
    location: { lat: 29.5521, lon: 103.7660 },
    icon: 'leshan.png',
    neighbors: {
      // 四川省内
      "眉山市": { distance: 115, steps: 153330 },     // 北面接壤
      "自贡市": { distance: 145, steps: 193330 },     // 东面接壤
      "宜宾市": { distance: 165, steps: 220000 },     // 东南面接壤
      "凉山彝族自治州": { distance: 245, steps: 326670 },     // 南面接壤
      "雅安市": { distance: 165, steps: 220000 }      // 西北面接壤
    }
  },

  "南充市": {
    province: 'SC',
    location: { lat: 30.8373, lon: 106.1105 },
    icon: 'nanchong.png',
    neighbors: {
      // 四川省内
      "广元市": { distance: 215, steps: 286670 },     // 北面接壤
      "绵阳市": { distance: 165, steps: 220000 },     // 西面接壤
      "遂宁市": { distance: 125, steps: 166670 },     // 南面接壤
      "广安市": { distance: 145, steps: 193330 },     // 东南面接壤
      "达州市": { distance: 165, steps: 220000 },     // 东面接壤
      "巴中市": { distance: 165, steps: 220000 },     // 北面接壤
      // 重庆市
      "重庆市": { distance: 245, steps: 326670 }      // 东南面接壤
    }
  },

  "宜宾市": {
    province: 'SC',
    location: { lat: 28.7513, lon: 104.6417 },
    icon: 'yibin.png',
    neighbors: {
      // 四川省内
      "自贡市": { distance: 125, steps: 166670 },     // 北面接壤
      "泸州市": { distance: 125, steps: 166670 },     // 东面接壤
      "乐山市": { distance: 165, steps: 220000 },     // 西北面接壤
      "凉山彝族自治州": { distance: 215, steps: 286670 },     // 西南面接壤
      // 云南省
      "昭通市": { distance: 185, steps: 246670 },     // 南面接壤
      // 贵州省
      "遵义市": { distance: 245, steps: 326670 }      // 东南面接壤
    }
  },

  "广安市": {
    province: 'SC',
    location: { lat: 30.4739, lon: 106.6333 },
    icon: 'guangan.png',
    neighbors: {
      // 四川省内
      "南充市": { distance: 145, steps: 193330 },     // 西北面接壤
      "达州市": { distance: 165, steps: 220000 },     // 北面接壤
      // 重庆市
      "重庆市": { distance: 185, steps: 246670 }      // 东面接壤
    }
  },

  "达州市": {
    province: 'SC',
    location: { lat: 31.2089, lon: 107.4677 },
    icon: 'dazhou.png',
    neighbors: {
      // 四川省内
      "南充市": { distance: 165, steps: 220000 },     // 西面接壤
      "广安市": { distance: 165, steps: 220000 },     // 南面接壤
      "巴中市": { distance: 145, steps: 193330 },     // 西北面接壤
      // 重庆市
      "重庆市": { distance: 245, steps: 326670 },     // 东南面接壤
      // 陕西省
      "安康市": { distance: 215, steps: 286670 }      // 北面接壤
    }
  },

  "巴中市": {
    province: 'SC',
    location: { lat: 31.8675, lon: 106.7478 },
    icon: 'bazhong.png',
    neighbors: {
      // 四川省内
      "南充市": { distance: 165, steps: 220000 },     // 南面接壤
      "达州市": { distance: 145, steps: 193330 },     // 东面接壤
      "广元市": { distance: 165, steps: 220000 },     // 西面接壤
      // 陕西省
      "汉中市": { distance: 245, steps: 326670 }      // 北面接壤
    }
  },

  "雅安市": {
    province: 'SC',
    location: { lat: 30.0159, lon: 103.0419 },
    icon: 'yaan.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 245, steps: 326670 },     // 东北面接壤
      "乐山市": { distance: 245, steps: 326670 },     // 东南面接壤
      "阿坝藏族羌族自治州": { distance: 245, steps: 326670 },     // 西北面接壤
      "甘孜藏族自治州": { distance: 245, steps: 326670 },     // 西面接壤
      "凉山彝族自治州": { distance: 245, steps: 326670 }      // 南面接壤
    }
  },

  "眉山市": {
    province: 'SC',
    location: { lat: 30.0750, lon: 103.8317 },
    icon: 'meishan.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "资阳市": { distance: 115, steps: 153330 },     // 东北面接壤
      "自贡市": { distance: 125, steps: 166670 },     // 东面接壤
      "乐山市": { distance: 115, steps: 153330 },     // 南面接壤
      "雅安市": { distance: 145, steps: 193330 }      // 西面接壤
    }
  },

  "资阳市": {
    province: 'SC',
    location: { lat: 30.1222, lon: 104.6419 },
    icon: 'ziyang.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "德阳市": { distance: 125, steps: 166670 },     // 西北面接壤
      "遂宁市": { distance: 115, steps: 153330 },     // 北面接壤
      "内江市": { distance: 125, steps: 166670 },     // 东南面接壤
      "自贡市": { distance: 115, steps: 153330 },     // 南面接壤
      "眉山市": { distance: 115, steps: 153330 }      // 西南面接壤
    }
  },

  "阿坝藏族羌族自治州": {
    province: 'SC',
    location: { lat: 31.8994, lon: 102.2213 },
    icon: 'aba.png',
    neighbors: {
      // 四川省内
      "绵阳市": { distance: 245, steps: 326670 },     // 东面接壤
      "德阳市": { distance: 215, steps: 286670 },     // 东南面接壤
      "雅安市": { distance: 245, steps: 326670 },     // 南面接壤
      "甘孜藏族自治州": { distance: 285, steps: 380000 },     // 西面接壤
      // 甘肃省
      "甘南藏族自治州": { distance: 385, steps: 513330 },     // 北面接壤
      // 青海省
      "果洛藏族自治州": { distance: 485, steps: 646670 }      // 西北面接壤
    }
  },

  "甘孜藏族自治州": {
    province: 'SC',
    location: { lat: 30.0500, lon: 101.9625 },
    icon: 'ganzi.png',
    neighbors: {
      // 四川省内
      "阿坝藏族羌族自治州": { distance: 285, steps: 380000 },     // 北面接壤
      "雅安市": { distance: 285, steps: 380000 },     // 东面接壤
      "凉山彝族自治州": { distance: 385, steps: 513330 },     // 南面接壤
      // 西藏自治区
      "昌都市": { distance: 485, steps: 646670 },     // 西面接壤
      // 青海省
      "玉树藏族自治州": { distance: 485, steps: 646670 }      // 西北面接壤
    }
  },

  "凉山彝族自治州": {
    province: 'SC',
    location: { lat: 27.8793, lon: 102.2587 },
    icon: 'liangshan.png',
    neighbors: {
      // 四川省内
      "乐山市": { distance: 245, steps: 326670 },     // 北面接壤
      "宜宾市": { distance: 215, steps: 286670 },     // 东北面接壤
      "攀枝花市": { distance: 245, steps: 326670 },   // 南面接壤
      "甘孜藏族自治州": { distance: 385, steps: 513330 },     // 北面接壤
      "雅安市": { distance: 245, steps: 326670 },     // 南面接壤
      // 云南省
      "迪庆藏族自治州": { distance: 385, steps: 513330 },     // 西面接壤
      "丽江市": { distance: 285, steps: 380000 },     // 西南面接壤
      "昭通市": { distance: 245, steps: 326670 }      // 东南面接壤
    }
  },

  // === 贵州省城市 ===
  "贵阳市": {
    province: 'GZ',
    location: { lat: 26.6470, lon: 106.6302 },
    icon: 'guiyang.png',
    neighbors: {
      // 贵州省内
      "遵义市": { distance: 185, steps: 246670 },     // 北面接壤
      "安顺市": { distance: 95, steps: 126670 },      // 西面接壤
      "黔南布依族苗族自治州": { distance: 165, steps: 220000 },     // 南面接壤
      "黔东南苗族侗族自治州": { distance: 185, steps: 246670 }      // 东面接壤
    }
  },

  "遵义市": {
    province: 'GZ',
    location: { lat: 27.7254, lon: 106.9271 },
    icon: 'zunyi.png',
    neighbors: {
      // 贵州省内
      "贵阳市": { distance: 185, steps: 246670 },     // 南面接壤
      "铜仁市": { distance: 185, steps: 246670 },     // 东面接壤
      "毕节市": { distance: 165, steps: 220000 },     // 西面接壤
      // 四川省
      "泸州市": { distance: 215, steps: 286670 },     // 北面接壤
      "宜宾市": { distance: 245, steps: 326670 },     // 西北面接壤
      // 重庆市
      "重庆市": { distance: 245, steps: 326670 }      // 东北面接壤
    }
  },

  "六盘水市": {
    province: 'GZ',
    location: { lat: 26.5947, lon: 104.8302 },
    icon: 'liupanshui.png',
    neighbors: {
      // 贵州省内
      "毕节市": { distance: 145, steps: 193330 },     // 北面接壤
      "安顺市": { distance: 145, steps: 193330 },     // 东面接壤
      "黔西南布依族苗族自治州": { distance: 145, steps: 193330 },     // 南面接壤
      // 云南省
      "曲靖市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "安顺市": {
    province: 'GZ',
    location: { lat: 26.2456, lon: 105.9320 },
    icon: 'anshun.png',
    neighbors: {
      // 贵州省内
      "贵阳市": { distance: 95, steps: 126670 },      // 东面接壤
      "六盘水市": { distance: 145, steps: 193330 },   // 西面接壤
      "黔南布依族苗族自治州": { distance: 145, steps: 193330 },     // 南面接壤
      "毕节市": { distance: 165, steps: 220000 }      // 北面接壤
    }
  },

  "毕节市": {
    province: 'GZ',
    location: { lat: 27.2850, lon: 105.2856 },
    icon: 'bijie.png',
    neighbors: {
      // 贵州省内
      "遵义市": { distance: 165, steps: 220000 },     // 东面接壤
      "六盘水市": { distance: 145, steps: 193330 },   // 南面接壤
      "安顺市": { distance: 165, steps: 220000 },     // 东南面接壤
      // 四川省
      "宜宾市": { distance: 215, steps: 286670 },     // 北面接壤
      // 云南省
      "昭通市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "铜仁市": {
    province: 'GZ',
    location: { lat: 27.7183, lon: 109.1907 },
    icon: 'tongren.png',
    neighbors: {
      // 贵州省内
      "遵义市": { distance: 185, steps: 246670 },     // 西面接壤
      "黔东南苗族侗族自治州": { distance: 165, steps: 220000 },     // 南面接壤
      // 湖南省
      "怀化市": { distance: 165, steps: 220000 },     // 东面接壤
      // 重庆市
      "重庆市": { distance: 245, steps: 326670 }      // 北面接壤
    }
  },

  "黔东南苗族侗族自治州": {
    province: 'GZ',
    location: { lat: 26.5834, lon: 107.9774 },
    icon: 'qiandongnan.png',
    neighbors: {
      // 贵州省内
      "铜仁市": { distance: 165, steps: 220000 },     // 北面接壤
      "贵阳市": { distance: 165, steps: 220000 },     // 西面接壤
      "黔南布依族苗族自治州": { distance: 145, steps: 193330 },     // 南面接壤
      // 湖南省
      "怀化市": { distance: 185, steps: 246670 },     // 东北面接壤
      // 广西壮族自治区
      "桂林市": { distance: 245, steps: 326670 }      // 东南面接壤
    }
  },

  "黔南布依族苗族自治州": {
    province: 'GZ',
    location: { lat: 26.2582, lon: 107.5173 },
    icon: 'qiannan.png',
    neighbors: {
      // 贵州省内
      "贵阳市": { distance: 165, steps: 220000 },     // 北面接壤
      "安顺市": { distance: 145, steps: 193330 },     // 西北面接壤
      "黔西南布依族苗族自治州": { distance: 165, steps: 220000 },     // 西面接壤
      "黔东南苗族侗族自治州": { distance: 145, steps: 193330 },     // 东面接壤
      // 广西壮族自治区
      "河池市": { distance: 215, steps: 286670 },     // 南面接壤
      "柳州市": { distance: 245, steps: 326670 }      // 东南面接壤
    }
  },

  "黔西南布依族苗族自治州": {
    province: 'GZ',
    location: { lat: 25.0881, lon: 104.9006 },
    icon: 'qianxinan.png',
    neighbors: {
      // 贵州省内
      "六盘水市": { distance: 145, steps: 193330 },   // 北面接壤
      "黔南布依族苗族自治州": { distance: 165, steps: 220000 },     // 东面接壤
      // 云南省
      "曲靖市": { distance: 165, steps: 220000 },     // 西面接壤
      // 广西壮族自治区
      "百色市": { distance: 215, steps: 286670 }      // 南面接壤
    }
  },

  // === 云南省城市 ===
  "昆明市": {
    province: 'YN',
    location: { lat: 24.8801, lon: 102.8329 },
    icon: 'kunming.png',
    neighbors: {
      // 云南省内
      "曲靖市": { distance: 125, steps: 166670 },     // 东面接壤
      "玉溪市": { distance: 85, steps: 113330 },      // 南面接壤
      "楚雄彝族自治州": { distance: 165, steps: 220000 },     // 西面接壤
      "昭通市": { distance: 285, steps: 380000 }      // 东北面接壤
    }
  },

  "曲靖市": {
    province: 'YN',
    location: { lat: 25.4901, lon: 103.7964 },
    icon: 'qujing.png',
    neighbors: {
      // 云南省内
      "昆明市": { distance: 125, steps: 166670 },     // 西面接壤
      "昭通市": { distance: 245, steps: 326670 },     // 北面接壤
      // 贵州省
      "六盘水市": { distance: 185, steps: 246670 },   // 东面接壤
      "黔西南布依族苗族自治州": { distance: 165, steps: 220000 }      // 东南面接壤
    }
  },

  "玉溪市": {
    province: 'YN',
    location: { lat: 24.3518, lon: 102.5428 },
    icon: 'yuxi.png',
    neighbors: {
      // 云南省内
      "昆明市": { distance: 85, steps: 113330 },      // 北面接壤
      "红河哈尼族彝族自治州": { distance: 165, steps: 220000 },     // 南面接壤
      "楚雄彝族自治州": { distance: 145, steps: 193330 },     // 西面接壤
      "文山壮族苗族自治州": { distance: 245, steps: 326670 }      // 东南面接壤
    }
  },

  "保山市": {
    province: 'YN',
    location: { lat: 25.1120, lon: 99.1671 },
    icon: 'baoshan.png',
    neighbors: {
      // 云南省内
      "大理白族自治州": { distance: 165, steps: 220000 },     // 东面接壤
      "德宏傣族景颇族自治州": { distance: 145, steps: 193330 },     // 西南面接壤
      "怒江傈僳族自治州": { distance: 185, steps: 246670 }     // 北面接壤
    }
  },

  "昭通市": {
    province: 'YN',
    location: { lat: 27.3401, lon: 103.7168 },
    icon: 'zhaotong.png',
    neighbors: {
      // 云南省内
      "曲靖市": { distance: 245, steps: 326670 },     // 南面接壤
      "昆明市": { distance: 285, steps: 380000 },     // 西南面接壤
      // 四川省
      "攀枝花市": { distance: 215, steps: 286670 },   // 西面接壤
      "凉山彝族自治州": { distance: 245, steps: 326670 },     // 西北面接壤
      "宜宾市": { distance: 185, steps: 246670 },     // 北面接壤
      // 贵州省
      "毕节市": { distance: 185, steps: 246670 }      // 东面接壤
    }
  },

  "丽江市": {
    province: 'YN',
    location: { lat: 26.8557, lon: 100.2271 },
    icon: 'lijiang.png',
    neighbors: {
      // 云南省内
      "迪庆藏族自治州": { distance: 185, steps: 246670 },     // 北面接壤
      "大理白族自治州": { distance: 165, steps: 220000 },     // 南面接壤
      "怒江傈僳族自治州": { distance: 145, steps: 193330 },     // 西面接壤
      "楚雄彝族自治州": { distance: 245, steps: 326670 },     // 东南面接壤
      // 四川省
      "攀枝花市": { distance: 285, steps: 380000 },   // 东面接壤
      "凉山彝族自治州": { distance: 285, steps: 380000 }      // 东北面接壤
    }
  },

  "普洱市": {
    province: 'YN',
    location: { lat: 22.8255, lon: 100.9660 },
    icon: 'puer.png',
    neighbors: {
      // 云南省内
      "西双版纳傣族自治州": { distance: 165, steps: 220000 },     // 南面接壤
      "红河哈尼族彝族自治州": { distance: 245, steps: 326670 },     // 东面接壤
      "玉溪市": { distance: 285, steps: 380000 },     // 东北面接壤
      "大理白族自治州": { distance: 245, steps: 326670 },     // 北面接壤
      "临沧市": { distance: 185, steps: 246670 }      // 西面接壤
    }
  },

  "临沧市": {
    province: 'YN',
    location: { lat: 23.8776, lon: 100.0820 },
    icon: 'lincang.png',
    neighbors: {
      // 云南省内
      "普洱市": { distance: 185, steps: 246670 },     // 东面接壤
      "大理白族自治州": { distance: 165, steps: 220000 },     // 北面接壤
      "保山市": { distance: 185, steps: 246670 },     // 西北面接壤
      "德宏傣族景颇族自治州": { distance: 165, steps: 220000 }     // 西面接壤
    }
  },

  "楚雄彝族自治州": {
    province: 'YN',
    location: { lat: 25.0461, lon: 101.5466 },
    icon: 'chuxiong.png',
    neighbors: {
      // 云南省内
      "大理白族自治州": { distance: 145, steps: 193330 },     // 西面接壤
      "丽江市": { distance: 245, steps: 326670 },     // 西北面接壤
      "昆明市": { distance: 165, steps: 220000 },     // 东面接壤
      "玉溪市": { distance: 145, steps: 193330 }      // 东南面接壤
    }
  },

  "红河哈尼族彝族自治州": {
    province: 'YN',
    location: { lat: 23.3639, lon: 103.3756 },
    icon: 'honghe.png',
    neighbors: {
      // 云南省内
      "玉溪市": { distance: 165, steps: 220000 },     // 北面接壤
      "文山壮族苗族自治州": { distance: 185, steps: 246670 },     // 东面接壤
      "普洱市": { distance: 245, steps: 326670 },     // 西面接壤
      "西双版纳傣族自治州": { distance: 285, steps: 380000 }     // 西南面接壤
    }
  },

  "文山壮族苗族自治州": {
    province: 'YN',
    location: { lat: 23.3697, lon: 104.2440 },
    icon: 'wenshan.png',
    neighbors: {
      // 云南省内
      "曲靖市": { distance: 245, steps: 326670 },     // 北面接壤
      "红河哈尼族彝族自治州": { distance: 185, steps: 246670 },     // 西面接壤
      // 广西壮族自治区
      "百色市": { distance: 165, steps: 220000 },     // 南面接壤
      // 贵州省
      "黔西南布依族苗族自治州": { distance: 185, steps: 246670 }      // 东面接壤
    }
  },

  "西双版纳傣族自治州": {
    province: 'YN',
    location: { lat: 22.0017, lon: 100.8030 },
    icon: 'xishuangbanna.png',
    neighbors: {
      // 云南省内
      "普洱市": { distance: 165, steps: 220000 },     // 北面接壤
      "红河哈尼族彝族自治州": { distance: 285, steps: 380000 }     // 东北面接壤
    }
  },

  "大理白族自治州": {
    province: 'YN',
    location: { lat: 25.6065, lon: 100.2679 },
    icon: 'dali.png',
    neighbors: {
      // 云南省内
      "丽江市": { distance: 165, steps: 220000 },     // 北面接壤
      "怒江傈僳族自治州": { distance: 185, steps: 246670 },     // 西北面接壤
      "保山市": { distance: 165, steps: 220000 },     // 西面接壤
      "临沧市": { distance: 165, steps: 220000 },     // 西南面接壤
      "普洱市": { distance: 245, steps: 326670 },     // 南面接壤
      "楚雄彝族自治州": { distance: 145, steps: 193330 }      // 东面接壤
    }
  },

  "德宏傣族景颇族自治州": {
    province: 'YN',
    location: { lat: 24.4367, lon: 98.5856 },
    icon: 'dehong.png',
    neighbors: {
      // 云南省内
      "保山市": { distance: 145, steps: 193330 },     // 东北面接壤
      "临沧市": { distance: 165, steps: 220000 }     // 东面接壤
    }
  },

  "怒江傈僳族自治州": {
    province: 'YN',
    location: { lat: 25.8171, lon: 98.8566 },
    icon: 'nujiang.png',
    neighbors: {
      // 云南省内
      "迪庆藏族自治州": { distance: 185, steps: 246670 },     // 北面接壤
      "丽江市": { distance: 145, steps: 193330 },     // 东面接壤
      "大理白族自治州": { distance: 185, steps: 246670 },     // 东南面接壤
      "保山市": { distance: 185, steps: 246670 }     // 南面接壤
    }
  },

  "迪庆藏族自治州": {
    province: 'YN',
    location: { lat: 27.8255, lon: 99.7068 },
    icon: 'diqing.png',
    neighbors: {
      // 云南省内
      "怒江傈僳族自治州": { distance: 185, steps: 246670 },     // 南面接壤
      "丽江市": { distance: 185, steps: 246670 },     // 东南面接壤
      // 四川省
      "凉山彝族自治州": { distance: 385, steps: 513330 },     // 东面接壤
      // 西藏自治区
      "昌都市": { distance: 385, steps: 513330 }      // 西北面接壤
    }
  },

  // === 西藏自治区城市 ===
  "拉萨市": {
    province: 'XZ',
    location: { lat: 29.6500, lon: 91.1409 },
    icon: 'lasa.png',
    neighbors: {
      // 西藏自治区内
      "日喀则市": { distance: 245, steps: 326670 },     // 西面接壤
      "山南市": { distance: 185, steps: 246670 },     // 南面接壤
      "林芝市": { distance: 285, steps: 380000 },     // 东面接壤
      "那曲市": { distance: 285, steps: 380000 }      // 北面接壤
    }
  },

  "日喀则市": {
    province: 'XZ',
    location: { lat: 29.2678, lon: 88.8854 },
    icon: 'rikaze.png',
    neighbors: {
      // 西藏自治区内
      "拉萨市": { distance: 245, steps: 326670 },     // 东面接壤
      "山南市": { distance: 285, steps: 380000 },     // 东南面接壤
      "阿里地区": { distance: 485, steps: 646670 },   // 西面接壤
      "那曲市": { distance: 385, steps: 513330 }      // 北面接壤
    }
  },

  "昌都市": {
    province: 'XZ',
    location: { lat: 31.1369, lon: 97.1784 },
    icon: 'changdu.png',
    neighbors: {
      // 西藏自治区内
      "那曲市": { distance: 385, steps: 513330 },     // 西面接壤
      "林芝市": { distance: 285, steps: 380000 },     // 南面接壤
      // 四川省
      "甘孜藏族自治州": { distance: 485, steps: 646670 },     // 东面接壤
      // 云南省
      "迪庆藏族自治州": { distance: 385, steps: 513330 }      // 东北面接壤
    }
  },

  "林芝市": {
    province: 'XZ',
    location: { lat: 29.6486, lon: 94.3624 },
    icon: 'linzhi.png',
    neighbors: {
      // 西藏自治区内
      "昌都市": { distance: 285, steps: 380000 },     // 北面接壤
      "拉萨市": { distance: 285, steps: 380000 },     // 西面接壤
      "山南市": { distance: 245, steps: 326670 }      // 东面接壤
    }
  },

  "山南市": {
    province: 'XZ',
    location: { lat: 29.2378, lon: 91.7733 },
    icon: 'shannan.png',
    neighbors: {
      // 西藏自治区内
      "拉萨市": { distance: 185, steps: 246670 },     // 北面接壤
      "日喀则市": { distance: 285, steps: 380000 },   // 西面接壤
      "林芝市": { distance: 245, steps: 326670 }      // 东面接壤
    }
  },

  "那曲市": {
    province: 'XZ',
    location: { lat: 31.4766, lon: 92.0517 },
    icon: 'naqu.png',
    neighbors: {
      // 西藏自治区内
      "阿里地区": { distance: 485, steps: 646670 },   // 西面接壤
      "日喀则市": { distance: 385, steps: 513330 },   // 南面接壤
      "拉萨市": { distance: 285, steps: 380000 },     // 南面接壤
      "昌都市": { distance: 385, steps: 513330 }      // 东面接壤
    }
  },

  "阿里地区": {
    province: 'XZ',
    location: { lat: 32.5016, lon: 80.1055 },
    icon: 'ali.png',
    neighbors: {
      // 西藏自治区内
      "日喀则市": { distance: 485, steps: 646670 },   // 东南面接壤
      "那曲市": { distance: 485, steps: 646670 }      // 东面接壤
    }
  },

  // === 陕西省城市 ===
  "西安市": {
    province: 'SAX',
    location: { lat: 34.3433, lon: 108.9409 },
    icon: 'xian.png',
    neighbors: {
      // 陕西省内
      "咸阳市": { distance: 45, steps: 60000 },     // 西面接壤
      "渭南市": { distance: 85, steps: 113330 },    // 东面接壤
      "铜川市": { distance: 145, steps: 193330 },   // 北面接壤
      "商洛市": { distance: 185, steps: 246670 }    // 东南面接壤
    }
  },

  "咸阳市": {
    province: 'SAX',
    location: { lat: 34.3472, lon: 108.7147 },
    icon: 'xianyang.png',
    neighbors: {
      // 陕西省内
      "西安市": { distance: 45, steps: 60000 },     // 东面接壤
      "铜川市": { distance: 125, steps: 166670 },   // 北面接壤
      "宝鸡市": { distance: 145, steps: 193330 },   // 西面接壤
      "渭南市": { distance: 125, steps: 166670 }    // 东南面接壤
    }
  },

  "宝鸡市": {
    province: 'SAX',
    location: { lat: 34.3609, lon: 107.2372 },
    icon: 'baoji.png',
    neighbors: {
      // 陕西省内
      "咸阳市": { distance: 145, steps: 193330 },   // 东面接壤
      "铜川市": { distance: 245, steps: 326670 },   // 东北面接壤
      "汉中市": { distance: 165, steps: 220000 },   // 南面接壤
      // 甘肃省
      "天水市": { distance: 165, steps: 220000 }    // 西面接壤
    }
  },

  "渭南市": {
    province: 'SAX',
    location: { lat: 34.5020, lon: 109.5098 },
    icon: 'weinan.png',
    neighbors: {
      // 陕西省内
      "西安市": { distance: 85, steps: 113330 },    // 西面接壤
      "咸阳市": { distance: 125, steps: 166670 },   // 西北面接壤
      "铜川市": { distance: 145, steps: 193330 },   // 北面接壤
      "商洛市": { distance: 165, steps: 220000 },   // 南面接壤
      // 山西省
      "运城市": { distance: 185, steps: 246670 }    // 东面接壤
    }
  },

  "铜川市": {
    province: 'SAX',
    location: { lat: 34.8965, lon: 108.9453 },
    icon: 'tongchuan.png',
    neighbors: {
      // 陕西省内
      "西安市": { distance: 145, steps: 193330 },   // 南面接壤
      "咸阳市": { distance: 125, steps: 166670 },   // 西南面接壤
      "宝鸡市": { distance: 245, steps: 326670 },   // 西面接壤
      "渭南市": { distance: 145, steps: 193330 },   // 东南面接壤
      "延安市": { distance: 185, steps: 246670 }    // 北面接壤
    }
  },

  "延安市": {
    province: 'SAX',
    location: { lat: 36.5853, lon: 109.4894 },
    icon: 'yanan.png',
    neighbors: {
      // 陕西省内
      "铜川市": { distance: 185, steps: 246670 },   // 南面接壤
      "榆林市": { distance: 285, steps: 380000 },   // 北面接壤
      // 山西省
      "吕梁市": { distance: 245, steps: 326670 },    // 东面接壤
      // 甘肃省
      "庆阳市": { distance: 245, steps: 326670 }     // 西面接壤
    }
  },

  "庆阳市": {
    province: 'GS',
    location: { lat: 35.7094, lon: 107.6389 },
    icon: 'qingyang.png',
    neighbors: {
      // 甘肃省内
      "白银市": { distance: 385, steps: 513330 },     // 西面接壤
      "平凉市": { distance: 165, steps: 220000 },     // 西南面接壤
      // 陕西省
      "延安市": { distance: 245, steps: 326670 },     // 东面接壤
      // 宁夏回族自治区
      "固原市": { distance: 245, steps: 326670 }      // 西北面接壤
    }
  },

  "榆林市": {
    province: 'SAX',
    location: { lat: 38.2852, lon: 109.7348 },
    icon: 'yulin.png',
    neighbors: {
      // 陕西省内
      "延安市": { distance: 285, steps: 380000 },   // 南面接壤
      // 内蒙古自治区
      "鄂尔多斯市": { distance: 245, steps: 326670 },   // 北面接壤
      // 山西省
      "忻州市": { distance: 285, steps: 380000 }    // 东面接壤
    }
  },

  "安康市": {
    province: 'SAX',
    location: { lat: 32.6903, lon: 109.0294 },
    icon: 'ankang.png',
    neighbors: {
      // 陕西省内
      "商洛市": { distance: 185, steps: 246670 },   // 北面接壤
      // 湖北省
      "十堰市": { distance: 165, steps: 220000 },   // 东面接壤
      // 四川省
      "广元市": { distance: 245, steps: 326670 }    // 西南面接壤
    }
  },

  "商洛市": {
    province: 'SAX',
    location: { lat: 33.8705, lon: 109.9410 },
    icon: 'shangluo.png',
    neighbors: {
      // 陕西省内
      "西安市": { distance: 185, steps: 246670 },   // 西北面接壤
      "渭南市": { distance: 165, steps: 220000 },   // 北面接壤
      "安康市": { distance: 185, steps: 246670 },   // 南面接壤
      // 河南省
      "三门峡市": { distance: 165, steps: 220000 }  // 东北面接壤
    }
  },

  "汉中市": {
    province: 'SAX',
    location: { lat: 33.0677, lon: 107.0236 },
    icon: 'hanzhong.png',
    neighbors: {
      // 陕西省内
      "宝鸡市": { distance: 165, steps: 220000 },     // 北面接壤
      "安康市": { distance: 165, steps: 220000 },     // 东面接壤
      // 四川省
      "广元市": { distance: 245, steps: 326670 },     // 西南面接壤
      "巴中市": { distance: 245, steps: 326670 },     // 南面接壤
      // 甘肃省
      "陇南市": { distance: 245, steps: 326670 }      // 西面接壤
    }
  },

  // === 甘肃省城市 ===
  "兰州市": {
    province: 'GS',
    location: { lat: 36.0611, lon: 103.8343 },
    icon: 'lanzhou.png',
    neighbors: {
      // 甘肃省内
      "白银市": { distance: 85, steps: 113330 },     // 北面接壤
      "定西市": { distance: 125, steps: 166670 },    // 南面接壤
      "临夏回族自治州": { distance: 145, steps: 193330 },   // 西南面接壤
      "天水市": { distance: 285, steps: 380000 }     // 东面接壤
    }
  },

  "天水市": {
    province: 'GS',
    location: { lat: 34.5809, lon: 105.7249 },
    icon: 'tianshui.png',
    neighbors: {
      // 甘肃省内
      "兰州市": { distance: 285, steps: 380000 },    // 西面接壤
      "定西市": { distance: 245, steps: 326670 },    // 西北面接壤
      "陇南市": { distance: 165, steps: 220000 },    // 南面接壤
      // 陕西省
      "宝鸡市": { distance: 165, steps: 220000 }     // 东面接壤
    }
  },

  "白银市": {
    province: 'GS',
    location: { lat: 36.5447, lon: 104.1390 },
    icon: 'baiyin.png',
    neighbors: {
      // 甘肃省内
      "兰州市": { distance: 85, steps: 113330 },     // 南面接壤
      "定西市": { distance: 165, steps: 220000 },    // 东南面接壤
      "武威市": { distance: 245, steps: 326670 },    // 西北面接壤
      "庆阳市": { distance: 385, steps: 513330 }     // 东北面接壤
    }
  },

  "武威市": {
    province: 'GS',
    location: { lat: 37.9283, lon: 102.6340 },
    icon: 'wuwei.png',
    neighbors: {
      // 甘肃省内
      "白银市": { distance: 245, steps: 326670 },    // 东南面接壤
      "金昌市": { distance: 145, steps: 193330 },    // 北面接壤
      "张掖市": { distance: 245, steps: 326670 },    // 西面接壤
      "酒泉市": { distance: 385, steps: 513330 }     // 西北面接壤
    }
  },

  "张掖市": {
    province: 'GS',
    location: { lat: 38.9258, lon: 100.4495 },
    icon: 'zhangye.png',
    neighbors: {
      // 甘肃省内
      "武威市": { distance: 245, steps: 326670 },    // 东面接壤
      "金昌市": { distance: 185, steps: 246670 },    // 东北面接壤
      "酒泉市": { distance: 245, steps: 326670 },    // 西北面接壤
      // 青海省
      "海北藏族自治州": { distance: 285, steps: 380000 }    // 南面接壤
    }
  },

  "金昌市": {
    province: 'GS',
    location: { lat: 38.5204, lon: 102.1877 },
    icon: 'jinchang.png',
    neighbors: {
      // 甘肃省内
      "武威市": { distance: 145, steps: 193330 },    // 南面接壤
      "张掖市": { distance: 185, steps: 246670 }     // 西面接壤
    }
  },

  "嘉峪关市": {
    province: 'GS',
    location: { lat: 39.7727, lon: 98.2891 },
    icon: 'jiayuguan.png',
    neighbors: {
      // 甘肃省内
      "酒泉市": { distance: 85, steps: 113330 }      // 西面接壤
    }
  },

  "庆阳市": {
    province: 'GS',
    location: { lat: 35.7094, lon: 107.6389 },
    icon: 'qingyang.png',
    neighbors: {
      // 甘肃省内
      "白银市": { distance: 385, steps: 513330 },     // 西面接壤
      "平凉市": { distance: 165, steps: 220000 },     // 西南面接壤
      // 陕西省
      "延安市": { distance: 245, steps: 326670 },     // 东面接壤
      // 宁夏回族自治区
      "固原市": { distance: 245, steps: 326670 }      // 西北面接壤
    }
  },

  "酒泉市": {
    province: 'GS',
    location: { lat: 39.7326, lon: 98.4941 },
    icon: 'jiuquan.png',
    neighbors: {
      // 甘肃省内
      "嘉峪关市": { distance: 85, steps: 113330 },    // 东面接壤
      "张掖市": { distance: 245, steps: 326670 },     // 东南面接壤
      "武威市": { distance: 385, steps: 513330 },     // 东面接壤
      // 内蒙古自治区
      "阿拉善盟": { distance: 485, steps: 646670 },   // 北面接壤
      // 青海省
      "海西蒙古族藏族自治州": { distance: 385, steps: 513330 }  // 南面接壤
    }
  },

  "巴中市": {
    province: 'SC',
    location: { lat: 31.8675, lon: 106.7478 },
    icon: 'bazhong.png',
    neighbors: {
      // 四川省内
      "广元市": { distance: 165, steps: 220000 },     // 西面接壤
      "南充市": { distance: 165, steps: 220000 },     // 南面接壤
      "达州市": { distance: 165, steps: 220000 },     // 东南面接壤
      // 陕西省
      "汉中市": { distance: 245, steps: 326670 }      // 北面接壤
    }
  },

  "雅安市": {
    province: 'SC',
    location: { lat: 30.0044, lon: 102.9910 },
    icon: 'yaan.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 245, steps: 326670 },     // 东北面接壤
      "乐山市": { distance: 245, steps: 326670 },     // 东南面接壤
      "阿坝藏族羌族自治州": { distance: 245, steps: 326670 },     // 西北面接壤
      "甘孜藏族自治州": { distance: 245, steps: 326670 },     // 西面接壤
      "凉山彝族自治州": { distance: 245, steps: 326670 }      // 南面接壤
    }
  },

  "广元市": {
    province: 'SC',
    location: { lat: 32.4354, lon: 105.8436 },
    icon: 'guangyuan.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东面接壤
      "巴中市": { distance: 165, steps: 220000 },     // 东南面接壤
      "汉中市": { distance: 165, steps: 220000 },     // 南面接壤
      "安康市": { distance: 245, steps: 326670 }      // 西南面接壤
    }
  },

  "南充市": {
    province: 'SC',
    location: { lat: 30.7952, lon: 106.0829 },
    icon: 'nanchong.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "巴中市": { distance: 165, steps: 220000 },     // 北面接壤
      "达州市": { distance: 165, steps: 220000 },     // 东面接壤
      "广元市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "达州市": {
    province: 'SC',
    location: { lat: 31.2089, lon: 107.4677 },
    icon: 'dazhou.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "南充市": { distance: 165, steps: 220000 },     // 西面接壤
      "巴中市": { distance: 165, steps: 220000 },     // 西北面接壤
      "广元市": { distance: 165, steps: 220000 }      // 北面接壤
    }
  },

  "乐山市": {
    province: 'SC',
    location: { lat: 29.5828, lon: 103.7612 },
    icon: 'leshan.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "雅安市": { distance: 245, steps: 326670 },     // 东南面接壤
      "凉山彝族自治州": { distance: 245, steps: 326670 },     // 南面接壤
      "宜宾市": { distance: 165, steps: 220000 },     // 西面接壤
      "自贡市": { distance: 165, steps: 220000 }      // 西南面接壤
    }
  },

  "自贡市": {
    province: 'SC',
    location: { lat: 29.3392, lon: 104.7784 },
    icon: 'zigong.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东面接壤
      "乐山市": { distance: 165, steps: 220000 },     // 东南面接壤
      "内江市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "泸州市": {
    province: 'SC',
    location: { lat: 28.8720, lon: 105.4427 },
    icon: 'luzhou.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "宜宾市": { distance: 165, steps: 220000 },     // 东面接壤
      "遂宁市": { distance: 165, steps: 220000 },     // 南面接壤
      "攀枝花市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "宜宾市": {
    province: 'SC',
    location: { lat: 28.7628, lon: 104.6301 },
    icon: 'yibin.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "乐山市": { distance: 165, steps: 220000 },     // 东面接壤
      "泸州市": { distance: 165, steps: 220000 },     // 西面接壤
      "遂宁市": { distance: 165, steps: 220000 },     // 西南面接壤
      "资阳市": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },

  "内江市": {
    province: 'SC',
    location: { lat: 29.5842, lon: 105.0661 },
    icon: 'neijiang.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "自贡市": { distance: 165, steps: 220000 },     // 东面接壤
      "资阳市": { distance: 165, steps: 220000 },     // 南面接壤
      "眉山市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "资阳市": {
    province: 'SC',
    location: { lat: 30.1229, lon: 104.6419 },
    icon: 'ziyang.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "内江市": { distance: 165, steps: 220000 },     // 北面接壤
      "宜宾市": { distance: 165, steps: 220000 },     // 西面接壤
      "眉山市": { distance: 165, steps: 220000 }      // 西南面接壤
    }
  },

  "眉山市": {
    province: 'SC',
    location: { lat: 30.0750, lon: 103.8317 },
    icon: 'meishan.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "内江市": { distance: 165, steps: 220000 },     // 东面接壤
      "资阳市": { distance: 165, steps: 220000 },     // 东南面接壤
      "凉山彝族自治州": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },

  "凉山彝族自治州": {
    province: 'SC',
    location: { lat: 27.8867, lon: 102.2587 },
    icon: 'liangshan.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 245, steps: 326670 },     // 东北面接壤
      "乐山市": { distance: 245, steps: 326670 },     // 东面接壤
      "眉山市": { distance: 165, steps: 220000 },     // 西面接壤
      "雅安市": { distance: 245, steps: 326670 },     // 北面接壤
      // 云南省
      "迪庆藏族自治州": { distance: 385, steps: 513330 },     // 西北面接壤
      "攀枝花市": { distance: 245, steps: 326670 }      // 西面接壤
    }
  },

  "攀枝花市": {
    province: 'SC',
    location: { lat: 26.5823, lon: 101.7186 },
    icon: 'panzhihua.png',
    neighbors: {
      // 四川省内
      "成都市": { distance: 165, steps: 220000 },     // 东北面接壤
      "泸州市": { distance: 165, steps: 220000 },     // 东面接壤
      "凉山彝族自治州": { distance: 245, steps: 326670 },     // 西面接壤
      // 云南省
      "迪庆藏族自治州": { distance: 245, steps: 326670 },     // 西南面接壤
      "丽江市": { distance: 285, steps: 380000 }      // 北面接壤
    }
  },

  "阿坝藏族羌族自治州": {
    province: 'SC',
    location: { lat: 31.8997, lon: 102.2213 },
    icon: 'aba.png',
    neighbors: {
      // 四川省内
      "雅安市": { distance: 245, steps: 326670 },     // 东南面接壤
      "甘孜藏族自治州": { distance: 245, steps: 326670 },     // 东面接壤
      // 甘肃省
      "甘南藏族自治州": { distance: 245, steps: 326670 }      // 北面接壤
    }
  },

  "甘孜藏族自治州": {
    province: 'SC',
    location: { lat: 30.0492, lon: 101.9625 },
    icon: 'ganzi.png',
    neighbors: {
      // 四川省内
      "雅安市": { distance: 245, steps: 326670 },     // 东南面接壤
      "阿坝藏族羌族自治州": { distance: 245, steps: 326670 },     // 西面接壤
      // 云南省
      "迪庆藏族自治州": { distance: 385, steps: 513330 }      // 西北面接壤
    }
  },

  "陇南市": {
    province: 'GS',
    location: { lat: 33.3912, lon: 104.9116 },
    icon: 'longnan.png',
    neighbors: {
      // 甘肃省内
      "天水市": { distance: 165, steps: 220000 },     // 北面接壤
      "定西市": { distance: 165, steps: 220000 },     // 东北面接壤
      "平凉市": { distance: 165, steps: 220000 },     // 东面接壤
      // 陕西省
      "汉中市": { distance: 245, steps: 326670 }      // 南面接壤
    }
  },

  "定西市": {
    province: 'GS',
    location: { lat: 35.5795, lon: 104.6254 },
    icon: 'dingxi.png',
    neighbors: {
      // 甘肃省内
      "兰州市": { distance: 125, steps: 166670 },    // 北面接壤
      "白银市": { distance: 165, steps: 220000 },    // 西面接壤
      "天水市": { distance: 245, steps: 326670 },    // 西南面接壤
      "陇南市": { distance: 165, steps: 220000 }     // 南面接壤
    }
  },

  "平凉市": {
    province: 'GS',
    location: { lat: 35.5427, lon: 106.6795 },
    icon: 'pingliang.png',
    neighbors: {
      // 甘肃省内
      "陇南市": { distance: 165, steps: 220000 },     // 西面接壤
      "临夏回族自治州": { distance: 165, steps: 220000 },     // 南面接壤
      "酒泉市": { distance: 165, steps: 220000 }      // 东面接壤
    }
  },

  "临夏回族自治州": {
    province: 'GS',
    location: { lat: 35.6020, lon: 103.2120 },
    icon: 'linxia.png',
    neighbors: {
      // 甘肃省内
      "兰州市": { distance: 145, steps: 193330 },     // 东北面接壤
      "定西市": { distance: 165, steps: 220000 },     // 东面接壤
      "甘南藏族自治州": { distance: 245, steps: 326670 },     // 南面接壤
      // 青海省
      "海东市": { distance: 245, steps: 326670 }      // 西面接壤
    }
  },

  "甘南藏族自治州": {
    province: 'GS',
    location: { lat: 34.9733, lon: 102.9272 },
    icon: 'gannan.png',
    neighbors: {
      // 甘肃省内
      "临夏回族自治州": { distance: 245, steps: 326670 },     // 北面接壤
      "阿坝藏族羌族自治州": { distance: 245, steps: 326670 },     // 西面接壤
      // 内蒙古自治区内
      "呼伦贝尔市": { distance: 385, steps: 513330 },   // 北面接壤
      "通辽市": { distance: 285, steps: 380000 },    // 南面接壤
      // 吉林省
      "白城市": { distance: 245, steps: 326670 }     // 东面接壤
    }
  },

  "锡林郭勒盟": {
    province: 'NMG',
    location: { lat: 43.9332, lon: 116.0477 },
    icon: 'xilinguole.png',
    neighbors: {
      // 内蒙古自治区内
      "乌兰察布市": { distance: 245, steps: 326670 },   // 南面接壤
      "通辽市": { distance: 285, steps: 380000 },    // 东面接壤
      "赤峰市": { distance: 385, steps: 513330 },     // 东南面接壤
      "呼和浩特市": { distance: 245, steps: 326670 }   // 西南面接壤
    }
  },

  "包头市": {
    province: 'NMG',
    location: { lat: 40.6571, lon: 109.8405 },
    icon: 'baotou.png',
    neighbors: {
      // 内蒙古自治区内
      "呼和浩特市": { distance: 165, steps: 220000 },  // 东面接壤
      "乌海市": { distance: 185, steps: 246670 },      // 西面接壤
      "鄂尔多斯市": { distance: 165, steps: 220000 },  // 南面接壤
      // 山西省
      "朔州市": { distance: 245, steps: 326670 }       // 东南面接壤
    }
  },

  "鄂尔多斯市": {
    province: 'NMG',
    location: { lat: 39.6087, lon: 109.7811 },
    icon: 'eerduosi.png',
    neighbors: {
      // 内蒙古自治区内
      "包头市": { distance: 165, steps: 220000 },      // 北面接壤
      "乌海市": { distance: 165, steps: 220000 },      // 西北面接壤
      "阿拉善盟": { distance: 285, steps: 380000 },    // 西面接壤
      // 陕西省
      "榆林市": { distance: 245, steps: 326670 },      // 南面接壤
      // 山西省
      "朔州市": { distance: 245, steps: 326670 }       // 东面接壤
    }
  },

  "阿拉善盟": {
    province: 'NMG',
    location: { lat: 38.8430, lon: 105.7285 },
    icon: 'alashanmeng.png',
    neighbors: {
      // 内蒙古自治区内
      "巴彦淖尔市": { distance: 285, steps: 380000 },   // 东面接壤
      "乌海市": { distance: 285, steps: 380000 },    // 东南面接壤
      "鄂尔多斯市": { distance: 285, steps: 380000 },    // 西面接壤
      // 甘肃省
      "酒泉市": { distance: 485, steps: 646670 },    // 西面接壤
      // 宁夏回族自治区
      "中卫市": { distance: 285, steps: 380000 },    // 南面接壤
      "银川市": { distance: 385, steps: 513330 }     // 东南面接壤
    }
  },

  "呼和浩特市": {
    province: 'NMG',
    location: { lat: 40.8173, lon: 111.7651 },
    icon: 'huhehaote.png',
    neighbors: {
      // 内蒙古自治区内
      "包头市": { distance: 165, steps: 220000 },      // 东面接壤
      "乌海市": { distance: 165, steps: 220000 },      // 南面接壤
      "乌兰察布市": { distance: 185, steps: 246670 },  // 南面接壤
      // 河北省
      "承德市": { distance: 245, steps: 326670 },      // 西面接壤
      "唐山市": { distance: 245, steps: 326670 }       // 西北面接壤
    }
  },

  "乌海市": {
    province: 'NMG',
    location: { lat: 39.6635, lon: 106.8255 },
    icon: 'wuhai.png',
    neighbors: {
      // 内蒙古自治区内
      "呼和浩特市": { distance: 165, steps: 220000 },  // 北面接壤
      "阿拉善盟": { distance: 285, steps: 380000 },    // 西面接壤
      "鄂尔多斯市": { distance: 165, steps: 220000 },  // 东面接壤
      // 青海省
      "海西蒙古族藏族自治州": { distance: 245, steps: 326670 } // 南面接壤
    }
  },

  "赤峰市": {
    province: 'NMG',
    location: { lat: 42.2584, lon: 118.8894 },
    icon: 'chifeng.png',
    neighbors: {
      // 内蒙古自治区内
      "通辽市": { distance: 245, steps: 326670 },      // 西北面接壤
      "锡林郭勒盟": { distance: 385, steps: 513330 },  // 西面接壤
      // 辽宁省
      "朝阳市": { distance: 285, steps: 380000 },      // 南面接壤
      // 河北省
      "承德市": { distance: 285, steps: 380000 }       // 西南面接壤
    }
  },

  "通辽市": {
    province: 'NMG',
    location: { lat: 43.6524, lon: 122.2437 },
    icon: 'tongliao.png',
    neighbors: {
      // 内蒙古自治区内
      "呼伦贝尔市": { distance: 385, steps: 513330 },  // 北面接壤
      "兴安盟": { distance: 285, steps: 380000 },      // 西北面接壤
      "锡林郭勒盟": { distance: 285, steps: 380000 },  // 西面接壤
      "赤峰市": { distance: 245, steps: 326670 },      // 南面接壤
      // 吉林省
      "松原市": { distance: 245, steps: 326670 },      // 东面接壤
      // 辽宁省
      "阜新市": { distance: 285, steps: 380000 }       // 东南面接壤
    }
  },

  "呼伦贝尔市": {
    province: 'NMG',
    location: { lat: 49.2153, lon: 119.7651 },
    icon: 'hulunbeier.png',
    neighbors: {
      // 内蒙古自治区内
      "兴安盟": { distance: 285, steps: 380000 },      // 南面接壤
      "通辽市": { distance: 385, steps: 513330 },      // 南面接壤
      // 黑龙江省
      "齐齐哈尔市": { distance: 345, steps: 460000 }   // 东面接壤
    }
  },

  "巴彦淖尔市": {
    province: 'NMG',
    location: { lat: 40.7436, lon: 107.3883 },
    icon: 'bayannaoer.png',
    neighbors: {
      // 内蒙古自治区内
      "包头市": { distance: 245, steps: 326670 },      // 东面接壤
      "乌兰察布市": { distance: 285, steps: 380000 },  // 东北面接壤
      "阿拉善盟": { distance: 285, steps: 380000 },    // 西面接壤
      // 宁夏回族自治区
      "石嘴山市": { distance: 165, steps: 220000 }     // 南面接壤
    }
  },

  "乌兰察布市": {
    province: 'NMG',
    location: { lat: 41.0260, lon: 113.1145 },
    icon: 'wulanchabu.png',
    neighbors: {
      // 内蒙古自治区内
      "呼和浩特市": { distance: 185, steps: 246670 },  // 南面接壤
      "锡林郭勒盟": { distance: 245, steps: 326670 },  // 东面接壤
      "巴彦淖尔市": { distance: 285, steps: 380000 },  // 西面接壤
      // 山西省
      "大同市": { distance: 245, steps: 326670 }       // 南面接壤
    }
  },

  "兴安盟": {
    province: 'NMG',
    location: { lat: 46.0827, lon: 122.0703 },
    icon: 'xinganmeng.png',
    neighbors: {
      // 内蒙古自治区内
      "呼伦贝尔市": { distance: 285, steps: 380000 },  // 北面接壤
      "通辽市": { distance: 285, steps: 380000 },      // 南面接壤
      // 吉林省
      "白城市": { distance: 285, steps: 380000 }       // 东面接壤
    }
  },

  "阿拉善盟": {
    province: 'NMG',
    location: { lat: 38.8451, lon: 105.6722 },
    icon: 'alashanmeng.png',
    neighbors: {
      // 内蒙古自治区内
      "巴彦淖尔市": { distance: 285, steps: 380000 },    // 东面接壤
      "乌海市": { distance: 285, steps: 380000 },        // 东面接壤
      "鄂尔多斯市": { distance: 285, steps: 380000 },    // 东面接壤
      // 宁夏回族自治区
      "中卫市": { distance: 245, steps: 326670 },       // 南面接壤
      "银川市": { distance: 245, steps: 326670 },       // 南面接壤
      // 甘肃省
      "酒泉市": { distance: 245, steps: 326670 }         // 西面接壤
    }
  },

  // === 香港特别行政区 ===
  "香港特别行政区": {
    province: 'HK',
    location: { lat: 22.3193, lon: 114.1694 },
    icon: 'hongkong.png',
    neighbors: {
      // 广东省
      "深圳市": { distance: 35, steps: 46670 }      // 北面接壤
    }
  },

  // === 澳门特别行政区 ===
  "澳门特别行政区": {
    province: 'MO',
    location: { lat: 22.1987, lon: 113.5439 },
    icon: 'macao.png',
    neighbors: {
      // 广东省
      "珠海市": { distance: 25, steps: 33330 }      // 北面接壤
    }
  },

  // === 台湾省 ===
  "台北市": {
    province: 'TW',
    location: { lat: 25.0330, lon: 121.5654 },
    icon: 'taipei.png',
    neighbors: {
      // 台湾省内
      "新北市": { distance: 15, steps: 20000 },      // 环绕
      "基隆市": { distance: 45, steps: 60000 },      // 东北面接壤
      // 福建省
      "福州市": { distance: 185, steps: 246670 }     // 西面隔海
    }
  },

  "基隆市": {
    province: 'TW',
    location: { lat: 25.1276, lon: 121.7392 },
    icon: 'jilong.png',
    neighbors: {
      // 台湾省内
      "台北市": { distance: 45, steps: 60000 },     // 西南面接壤
      "新北市": { distance: 35, steps: 46670 }      // 南面接壤
    }
  },

  "新北市": {
    province: 'TW',
    location: { lat: 25.0120, lon: 121.4657 },
    icon: 'newtaipei.png',
    neighbors: {
      // 台湾省内
      "台北市": { distance: 15, steps: 20000 },     // 环绕
      "桃园市": { distance: 45, steps: 60000 },     // 西南面接壤
      "宜兰县": { distance: 85, steps: 113330 }     // 东面接壤
    }
  },

  "桃园市": {
    province: 'TW',
    location: { lat: 24.9936, lon: 121.3010 },
    icon: 'taoyuan.png',
    neighbors: {
      // 台湾省内
      "新北市": { distance: 45, steps: 60000 },     // 东北面接壤
      "新竹市": { distance: 45, steps: 60000 },     // 南面接壤
    }
  },

  "新竹市": {
    province: 'TW',
    location: { lat: 24.8138, lon: 120.9675 },
    icon: 'xinzhu.png',
    neighbors: {
      // 台湾省内
      "桃园市": { distance: 45, steps: 60000 },     // 北面接壤
      "台中市": { distance: 85, steps: 113330 }     // 南面接壤
    }
  },

  "台中市": {
    province: 'TW',
    location: { lat: 24.1477, lon: 120.6736 },
    icon: 'taizhong.png',
    neighbors: {
      // 台湾省内
      "新竹市": { distance: 85, steps: 113330 },    // 北面接壤
      "嘉义市": { distance: 85, steps: 113330 }     // 南面接壤
    }
  },

  "嘉义市": {
    province: 'TW',
    location: { lat: 23.4800, lon: 120.4491 },
    icon: 'jiayi.png',
    neighbors: {
      // 台湾省内
      "台中市": { distance: 85, steps: 113330 },    // 北面接壤
      "台南市": { distance: 65, steps: 86670 }      // 南面接壤
    }
  },

  "台南市": {
    province: 'TW',
    location: { lat: 22.9998, lon: 120.2269 },
    icon: 'tainan.png',
    neighbors: {
      // 台湾省内
      "嘉义市": { distance: 65, steps: 86670 },    // 北面接壤
      "高雄市": { distance: 45, steps: 60000 }      // 南面接壤
    }
  },

  "高雄市": {
    province: 'TW',
    location: { lat: 22.6273, lon: 120.3014 },
    icon: 'kaohsiung.png',
    neighbors: {
      // 台湾省内
      "台南市": { distance: 45, steps: 60000 },     // 北面接壤
      "屏东县": { distance: 45, steps: 60000 },     // 东南面接壤
      "台东县": { distance: 145, steps: 193330 },   // 东面接壤
      // 福建省
      "厦门市": { distance: 285, steps: 380000 }    // 西面隔海
    }
  },

  // === 直辖市 ===
  "北京市": {
    province: 'BJ',
    location: { lat: 39.9042, lon: 116.4074 },
    icon: 'beijing.png',
    neighbors: {
      // 河北省
      "保定市": { distance: 145, steps: 193330 },     // 南面接壤
      "廊坊市": { distance: 65, steps: 86670 },       // 东南面接壤
      "张家口市": { distance: 185, steps: 246670 },   // 西北面接壤
      "承德市": { distance: 225, steps: 300000 },     // 东北面接壤
      // 天津市
      "天津市": { distance: 125, steps: 166670 }      // 东面接壤
    }
  },

  "天津市": {
    province: 'TJ',
    location: { lat: 39.3434, lon: 117.3616 },
    icon: 'tianjin.png',
    neighbors: {
      "北京市": { distance: 125, steps: 166670 },     // 西北面接壤
      "廊坊市": { distance: 85, steps: 113330 },      // 西面接壤
      "唐山市": { distance: 145, steps: 193330 },     // 东北面接壤
      "沧州市": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },

  "上海市": {
    province: 'SH',
    location: { lat: 31.2304, lon: 121.4737 },
    icon: 'shanghai.png',
    neighbors: {
      // 江苏省
      "苏州市": { distance: 85, steps: 113330 },      // 西面接壤
      "南通市": { distance: 95, steps: 126670 },      // 北面接壤
      // 浙江省
      "嘉兴市": { distance: 95, steps: 126670 }       // 南面接壤
    }
  },

  "重庆市": {
    province: 'CQ',
    location: { lat: 29.5647, lon: 106.5501 },
    icon: 'chongqing.png',
    neighbors: {
      // 四川省
      "达州市": { distance: 245, steps: 326670 },     // 北面接壤
      "广安市": { distance: 185, steps: 246670 },     // 北面接壤
      "遂宁市": { distance: 245, steps: 326670 },     // 西北面接壤
      "内江市": { distance: 265, steps: 353330 },     // 西面接壤
      "泸州市": { distance: 245, steps: 326670 },     // 西南面接壤
      // 贵州省
      "遵义市": { distance: 285, steps: 380000 },     // 南面接壤
      "毕节市": { distance: 285, steps: 380000 },     // 南面接壤
      // 湖北省
      "恩施土家族苗族自治州": { distance: 385, steps: 513330 },    // 东面接壤
      // 湖南省
      "张家界市": { distance: 425, steps: 566670 },    // 东南面接壤
      "湘西土家族苗族自治州": { distance: 385, steps: 513330 },    // 东南面接壤
      // 陕西省
      "安康市": { distance: 445, steps: 593330 }      // 北面接壤
    }
  },

  // === 河北省城市 ===
  "石家庄市": {
    province: 'HEB',
    location: { lat: 38.0428, lon: 114.5149 },
    icon: 'shijiazhuang.png',
    neighbors: {
      // 河北省内
      "保定市": { distance: 145, steps: 193330 },     // 北面接壤
      "衡水市": { distance: 165, steps: 220000 },     // 东面接壤
      "邢台市": { distance: 125, steps: 166670 },     // 南面接壤
      "定州市": { distance: 85, steps: 113330 },      // 北面接壤
      // 山西省
      "太原市": { distance: 285, steps: 380000 },     // 西面接壤
      "阳泉市": { distance: 225, steps: 300000 }      // 西面接壤
    }
  },

  "唐山市": {
    province: 'HEB',
    location: { lat: 39.6307, lon: 118.1801 },
    icon: 'tangshan.png',
    neighbors: {
      // 河北省内
      "秦皇岛市": { distance: 145, steps: 193330 },   // 东北面接壤
      "廊坊市": { distance: 165, steps: 220000 },     // 西南面接壤
      "承德市": { distance: 185, steps: 246670 },     // 北面接壤
      // 天津市
      "天津市": { distance: 145, steps: 193330 },     // 西面接壤
      // 北京市
      "北京市": { distance: 185, steps: 246670 }      // 西北面接壤
    }
  },

  "秦皇岛市": {
    province: 'HEB',
    location: { lat: 39.9355, lon: 119.5977 },
    icon: 'qinhuangdao.png',
    neighbors: {
      // 河北省内
      "唐山市": { distance: 145, steps: 193330 },     // 西南面接壤
      "承德市": { distance: 185, steps: 246670 },     // 西北面接壤
      // 辽宁省
      "葫芦岛市": { distance: 165, steps: 220000 },   // 东面接壤
      "绥中县": { distance: 125, steps: 166670 }      // 东北面接壤
    }
  },

  "邯郸市": {
    province: 'HEB',
    location: { lat: 36.6252, lon: 114.5391 },
    icon: 'handan.png',
    neighbors: {
      // 河北省内
      "邢台市": { distance: 85, steps: 113330 },      // 北面接壤
      "衡水市": { distance: 145, steps: 193330 },     // 东北面接壤
      // 山西省
      "长治市": { distance: 165, steps: 220000 },     // 西面接壤
      "晋城市": { distance: 145, steps: 193330 },     // 西南面接壤
      // 河南省
      "安阳市": { distance: 85, steps: 113330 },      // 南面接壤
      "濮阳市": { distance: 145, steps: 193330 }      // 东南面接壤
    }
  },

  "邢台市": {
    province: 'HEB',
    location: { lat: 37.0682, lon: 114.5047 },
    icon: 'xingtai.png',
    neighbors: {
      // 河北省内
      "石家庄市": { distance: 125, steps: 166670 },   // 北面接壤
      "邯郸市": { distance: 85, steps: 113330 },      // 南面接壤
      "衡水市": { distance: 125, steps: 166670 },     // 东面接壤
      // 山西省
      "长治市": { distance: 185, steps: 246670 },     // 西面接壤
      "晋城市": { distance: 165, steps: 220000 }      // 西南面接壤
    }
  },

  "保定市": {
    province: 'HEB',
    location: { lat: 38.8737, lon: 115.4647 },
    icon: 'baoding.png',
    neighbors: {
      // 河北省内
      "张家口市": { distance: 245, steps: 326670 },   // 西北面接壤
      "石家庄市": { distance: 145, steps: 193330 },   // 南面接壤
      "廊坊市": { distance: 125, steps: 166670 },     // 东北面接壤
      "衡水市": { distance: 145, steps: 193330 },     // 东南面接壤
      "沧州市": { distance: 185, steps: 246670 },     // 东面接壤
      // 北京市
      "北京市": { distance: 145, steps: 193330 },     // 北面接壤
      // 山西省
      "阳泉市": { distance: 285, steps: 380000 }      // 西面接壤
    }
  },

  "张家口市": {
    province: 'HEB',
    location: { lat: 40.7686, lon: 114.8868 },
    icon: 'zhangjiakou.png',
    neighbors: {
      // 河北省内
      "承德市": { distance: 245, steps: 326670 },     // 东面接壤
      "保定市": { distance: 245, steps: 326670 },     // 东南面接壤
      // 山西省
      "大同市": { distance: 185, steps: 246670 },     // 西面接壤
      "朔州市": { distance: 225, steps: 300000 },     // 西南面接壤
      // 内蒙古自治区
      "乌兰察布市": { distance: 285, steps: 380000 }, // 北面接壤
      // 北京市
      "北京市": { distance: 185, steps: 246670 }      // 东南面接壤
    }
  },

  "承德市": {
    province: 'HEB',
    location: { lat: 40.9515, lon: 117.9634 },
    icon: 'chengde.png',
    neighbors: {
      // 河北省内
      "张家口市": { distance: 245, steps: 326670 },   // 西面接壤
      "秦皇岛市": { distance: 185, steps: 246670 },   // 东南面接壤
      "唐山市": { distance: 185, steps: 246670 },     // 南面接壤
      // 内蒙古自治区
      "赤峰市": { distance: 285, steps: 380000 },     // 北面接壤
      // 辽宁省
      "朝阳市": { distance: 245, steps: 326670 },     // 东面接壤
      // 北京市
      "北京市": { distance: 225, steps: 300000 }      // 西南面接壤
    }
  },

  "沧州市": {
    province: 'HEB',
    location: { lat: 38.3037, lon: 116.8388 },
    icon: 'cangzhou.png',
    neighbors: {
      // 河北省内
      "廊坊市": { distance: 145, steps: 193330 },     // 北面接壤
      "衡水市": { distance: 125, steps: 166670 },     // 西面接壤
      "保定市": { distance: 185, steps: 246670 },     // 西北面接壤
      // 天津市
      "天津市": { distance: 125, steps: 166670 },     // 北面接壤
      // 山东省
      "德州市": { distance: 165, steps: 220000 },     // 南面接壤
      "滨州市": { distance: 185, steps: 246670 }      // 东南面接壤
    }
  },

  "廊坊市": {
    province: 'HEB',
    location: { lat: 39.5374, lon: 116.6835 },
    icon: 'langfang.png',
    neighbors: {
      // 河北省内
      "保定市": { distance: 125, steps: 166670 },     // 西面接壤
      "唐山市": { distance: 165, steps: 220000 },     // 东北面接壤
      "沧州市": { distance: 145, steps: 193330 },     // 南面接壤
      "衡水市": { distance: 165, steps: 220000 },     // 北面接壤
      // 北京市
      "北京市": { distance: 65, steps: 86670 },       // 西北面接壤
      // 天津市
      "天津市": { distance: 85, steps: 113330 }       // 东面接壤
    }
  },

  "衡水市": {
    province: 'HEB',
    location: { lat: 37.7349, lon: 115.6705 },
    icon: 'hengshui.png',
    neighbors: {
      // 河北省内
      "石家庄市": { distance: 165, steps: 220000 },   // 西面接壤
      "沧州市": { distance: 125, steps: 166670 },     // 东面接壤
      "廊坊市": { distance: 165, steps: 220000 },     // 北面接壤
      "保定市": { distance: 145, steps: 193330 },     // 西北面接壤
      "邢台市": { distance: 125, steps: 166670 },     // 南面接壤
      "邯郸市": { distance: 145, steps: 193330 },     // 东南面接壤
      // 山东省
      "德州市": { distance: 145, steps: 193330 }      // 南面接壤
    }
  },

  // === 山西省城市 ===
  "太原市": {
    province: 'SX',
    location: { lat: 37.8706, lon: 112.5489 },
    icon: 'taiyuan.png',
    neighbors: {
      // 山西省内
      "晋中市": { distance: 85, steps: 113330 },      // 东面接壤
      "吕梁市": { distance: 145, steps: 193330 },     // 西面接壤
      "阳泉市": { distance: 165, steps: 220000 },     // 东北面接壤
      "忻州市": { distance: 185, steps: 246670 },     // 北面接壤
      // 河北省
      "石家庄市": { distance: 285, steps: 380000 }    // 东面接壤
    }
  },

  "大同市": {
    province: 'SX',
    location: { lat: 40.0766, lon: 113.2946 },
    icon: 'datong.png',
    neighbors: {
      // 山西省内
      "朔州市": { distance: 145, steps: 193330 },     // 南面接壤
      // 河北省
      "张家口市": { distance: 185, steps: 246670 },   // 东面接壤
      // 内蒙古自治区
      "乌兰察布市": { distance: 245, steps: 326670 }  // 北面接壤
    }
  },

  "阳泉市": {
    province: 'SX',
    location: { lat: 37.8575, lon: 113.5830 },
    icon: 'yangquan.png',
    neighbors: {
      // 山西省内
      "太原市": { distance: 165, steps: 220000 },     // 西南面接壤
      "晋中市": { distance: 125, steps: 166670 },     // 南面接壤
      // 河北省
      "石家庄市": { distance: 185, steps: 246670 },    // 东面接壤
      "保定市": { distance: 285, steps: 380000 }      // 西面接壤
    }
  },

  "长治市": {
    province: 'SX',
    location: { lat: 36.1953, lon: 113.1169 },
    icon: 'changzhi.png',
    neighbors: {
      // 山西省内
      "晋城市": { distance: 125, steps: 166670 },     // 东面接壤
      "晋中市": { distance: 165, steps: 220000 },     // 北面接壤
      "临汾市": { distance: 185, steps: 246670 },     // 西面接壤
      // 河北省
      "邯郸市": { distance: 165, steps: 220000 },     // 东面接壤
      "邢台市": { distance: 185, steps: 246670 }      // 东北面接壤
    }
  },

  "晋城市": {
    province: 'SX',
    location: { lat: 35.4911, lon: 112.8513 },
    icon: 'jincheng.png',
    neighbors: {
      // 山西省内
      "长治市": { distance: 125, steps: 166670 },     // 西面接壤
      "邢台市": { distance: 165, steps: 220000 },     // 西南面接壤
      "邯郸市": { distance: 145, steps: 193330 },     // 东北面接壤
      // 河南省
      "焦作市": { distance: 145, steps: 193330 },     // 南面接壤
      "济源市": { distance: 165, steps: 220000 }      // 东南面接壤
    }
  },

  "朔州市": {
    province: 'SX',
    location: { lat: 39.3311, lon: 112.4333 },
    icon: 'shuozhou.png',
    neighbors: {
      // 山西省内
      "大同市": { distance: 145, steps: 193330 },     // 北面接壤
      "忻州市": { distance: 165, steps: 220000 },     // 南面接壤
      // 内蒙古自治区
      "鄂尔多斯市": { distance: 285, steps: 380000 }  // 西面接壤
    }
  },

  "晋中市": {
    province: 'SX',
    location: { lat: 37.6872, lon: 112.7528 },
    icon: 'jinzhong.png',
    neighbors: {
      // 山西省内
      "太原市": { distance: 85, steps: 113330 },      // 西面接壤
      "阳泉市": { distance: 125, steps: 166670 },     // 北面接壤
      "长治市": { distance: 165, steps: 220000 },     // 南面接壤
      "临汾市": { distance: 185, steps: 246670 },     // 南面接壤
      "吕梁市": { distance: 145, steps: 193330 }      // 西面接壤
    }
  },

  "运城市": {
    province: 'SX',
    location: { lat: 35.0228, lon: 111.0047 },
    icon: 'yuncheng.png',
    neighbors: {
      // 山西省内
      "临汾市": { distance: 145, steps: 193330 },     // 北面接壤
      // 河南省
      "三门峡市": { distance: 125, steps: 166670 },   // 南面接壤
      // 陕西省
      "渭南市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "忻州市": {
    province: 'SX',
    location: { lat: 38.4167, lon: 112.7337 },
    icon: 'xinzhou.png',
    neighbors: {
      // 山西省内
      "太原市": { distance: 185, steps: 246670 },     // 南面接壤
      "朔州市": { distance: 165, steps: 220000 },     // 北面接壤
      "吕梁市": { distance: 145, steps: 193330 },     // 西面接壤
      // 内蒙古自治区
      "乌兰察布市": { distance: 285, steps: 380000 }  // 北面接壤
    }
  },

  "临汾市": {
    province: 'SX',
    location: { lat: 36.0880, lon: 111.5190 },
    icon: 'linfen.png',
    neighbors: {
      // 山西省内
      "运城市": { distance: 145, steps: 193330 },     // 南面接壤
      "晋中市": { distance: 185, steps: 246670 },     // 北面接壤
      "长治市": { distance: 185, steps: 246670 },     // 东面接壤
      "吕梁市": { distance: 165, steps: 220000 },     // 西北面接壤
      // 陕西省
      "渭南市": { distance: 245, steps: 326670 }      // 西面接壤
    }
  },

  "吕梁市": {
    province: 'SX',
    location: { lat: 37.5190, lon: 111.1414 },
    icon: 'lvliang.png',
    neighbors: {
      // 山西省内
      "太原市": { distance: 145, steps: 193330 },     // 东面接壤
      "忻州市": { distance: 145, steps: 193330 },     // 北面接壤
      "临汾市": { distance: 165, steps: 220000 },     // 南面接壤
      "晋中市": { distance: 145, steps: 193330 },     // 东面接壤
      // 陕西省
      "延安市": { distance: 285, steps: 380000 }      // 西面接壤
    }
  },

  // === 辽宁省城市 ===
  "沈阳市": {
    province: 'LN',
    location: { lat: 41.8057, lon: 123.4315 },
    icon: 'shenyang.png',
    neighbors: {
      // 辽宁省内
      "铁岭市": { distance: 145, steps: 193330 },     // 北面接壤
      "抚顺市": { distance: 85, steps: 113330 },      // 东面接壤
      "本溪市": { distance: 125, steps: 166670 },     // 东南面接壤
      "鞍山市": { distance: 145, steps: 193330 },     // 南面接壤
      "辽阳市": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },

  "大连市": {
    province: 'LN',
    location: { lat: 38.9140, lon: 121.6147 },
    icon: 'dalian.png',
    neighbors: {
      // 辽宁省内
      "营口市": { distance: 185, steps: 246670 },     // 北面接壤
      "丹东市": { distance: 245, steps: 326670 }      // 东北面接壤
    }
  },

  "鞍山市": {
    province: 'LN',
    location: { lat: 41.1087, lon: 122.9956 },
    icon: 'anshan.png',
    neighbors: {
      // 辽宁省内
      "沈阳市": { distance: 145, steps: 193330 },     // 北面接壤
      "本溪市": { distance: 125, steps: 166670 },     // 东面接壤
      "营口市": { distance: 145, steps: 193330 },     // 南面接壤
      "辽阳市": { distance: 85, steps: 113330 }       // 西面接壤
    }
  },

  "抚顺市": {
    province: 'LN',
    location: { lat: 41.8807, lon: 123.9573 },
    icon: 'fushun.png',
    neighbors: {
      // 辽宁省内
      "沈阳市": { distance: 85, steps: 113330 },      // 西面接壤
      "本溪市": { distance: 125, steps: 166670 }      // 南面接壤
    }
  },

  "本溪市": {
    province: 'LN',
    location: { lat: 41.2979, lon: 123.7662 },
    icon: 'benxi.png',
    neighbors: {
      // 辽宁省内
      "沈阳市": { distance: 125, steps: 166670 },     // 西北面接壤
      "抚顺市": { distance: 125, steps: 166670 },     // 北面接壤
      "丹东市": { distance: 165, steps: 220000 },     // 东南面接壤
      "鞍山市": { distance: 125, steps: 166670 }      // 西面接壤
    }
  },

  "丹东市": {
    province: 'LN',
    location: { lat: 40.1297, lon: 124.3707 },
    icon: 'dandong.png',
    neighbors: {
      // 辽宁省内
      "本溪市": { distance: 165, steps: 220000 },     // 西北面接壤
      "大连市": { distance: 245, steps: 326670 }      // 南面接壤
    }
  },

  "锦州市": {
    province: 'LN',
    location: { lat: 41.0954, lon: 121.1269 },
    icon: 'jinzhou.png',
    neighbors: {
      // 辽宁省内
      "葫芦岛市": { distance: 125, steps: 166670 },   // 西面接壤
      "盘锦市": { distance: 145, steps: 193330 },     // 东面接壤
      "阜新市": { distance: 165, steps: 220000 }      // 东北面接壤
    }
  },

  "营口市": {
    province: 'LN',
    location: { lat: 40.6673, lon: 122.2351 },
    icon: 'yingkou.png',
    neighbors: {
      // 辽宁省内
      "鞍山市": { distance: 145, steps: 193330 },     // 北面接壤
      "大连市": { distance: 185, steps: 246670 },     // 南面接壤
      "盘锦市": { distance: 165, steps: 220000 }      // 西面接壤
    }
  },

  "阜新市": {
    province: 'LN',
    location: { lat: 42.0214, lon: 121.6708 },
    icon: 'fuxin.png',
    neighbors: {
      // 辽宁省内
      "锦州市": { distance: 165, steps: 220000 },     // 西南面接壤
      "铁岭市": { distance: 185, steps: 246670 },     // 东面接壤
      // 内蒙古自治区
      "通辽市": { distance: 285, steps: 380000 }      // 北面接壤
    }
  },

  "辽阳市": {
    province: 'LN',
    location: { lat: 41.2733, lon: 123.2374 },
    icon: 'liaoyang.png',
    neighbors: {
      // 辽宁省内
      "沈阳市": { distance: 165, steps: 220000 },     // 北面接壤
      "鞍山市": { distance: 85, steps: 113330 },      // 东面接壤
      "盘锦市": { distance: 145, steps: 193330 }      // 西面接壤
    }
  },

  "盘锦市": {
    province: 'LN',
    location: { lat: 41.1200, lon: 122.0731 },
    icon: 'panjin.png',
    neighbors: {
      // 辽宁省内
      "锦州市": { distance: 145, steps: 193330 },     // 西面接壤
      "营口市": { distance: 165, steps: 220000 },     // 东面接壤
      "辽阳市": { distance: 145, steps: 193330 }      // 东北面接壤
    }
  },

  "铁岭市": {
    province: 'LN',
    location: { lat: 42.2862, lon: 123.8442 },
    icon: 'tieling.png',
    neighbors: {
      // 辽宁省内
      "沈阳市": { distance: 145, steps: 193330 },     // 南面接壤
      "阜新市": { distance: 185, steps: 246670 },     // 西面接壤
      // 吉林省
      "四平市": { distance: 165, steps: 220000 }      // 东面接壤
    }
  },

  "朝阳市": {
    province: 'LN',
    location: { lat: 41.5763, lon: 120.4510 },
    icon: 'chaoyang.png',
    neighbors: {
      // 辽宁省内
      "葫芦岛市": { distance: 165, steps: 220000 },   // 南面接壤
      // 河北省
      "承德市": { distance: 245, steps: 326670 },     // 西面接壤
      // 内蒙古自治区
      "赤峰市": { distance: 285, steps: 380000 }      // 北面接壤
    }
  },

  "葫芦岛市": {
    province: 'LN',
    location: { lat: 40.7110, lon: 120.8378 },
    icon: 'huludao.png',
    neighbors: {
      // 辽宁省内
      "锦州市": { distance: 125, steps: 166670 },     // 东面接壤
      "朝阳市": { distance: 165, steps: 220000 },     // 北面接壤
      // 河北省
      "秦皇岛市": { distance: 165, steps: 220000 }    // 西面接壤
    }
  },

  // === 吉林省城市 ===
  "长春市": {
    province: 'JL',
    location: { lat: 43.8171, lon: 125.3235 },
    icon: 'changchun.png',
    neighbors: {
      // 吉林省内
      "吉林市": { distance: 145, steps: 193330 },     // 东面接壤
      "四平市": { distance: 165, steps: 220000 },     // 西南面接壤
      "松原市": { distance: 185, steps: 246670 }      // 西北面接壤
    }
  },

  "吉林市": {
    province: 'JL',
    location: { lat: 43.8375, lon: 126.5494 },
    icon: 'jilin.png',
    neighbors: {
      // 吉林省内
      "长春市": { distance: 145, steps: 193330 },     // 西面接壤
      "四平市": { distance: 185, steps: 246670 },     // 东南面接壤
      "辽源市": { distance: 165, steps: 220000 },     // 南面接壤
      "通化市": { distance: 185, steps: 246670 },     // 东南面接壤
      "延边朝鲜族自治州": { distance: 245, steps: 326670 }  // 东面接壤
    }
  },

  "四平市": {
    province: 'JL',
    location: { lat: 43.1666, lon: 124.3508 },
    icon: 'siping.png',
    neighbors: {
      // 吉林省内
      "长春市": { distance: 165, steps: 220000 },     // 东北面接壤
      "吉林市": { distance: 185, steps: 246670 },     // 东面接壤
      "辽源市": { distance: 125, steps: 166670 },     // 东南面接壤
      "松原市": { distance: 165, steps: 220000 },     // 西北面接壤
      // 辽宁省
      "铁岭市": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },

  "辽源市": {
    province: 'JL',
    location: { lat: 42.9023, lon: 125.1449 },
    icon: 'liaoyuan.png',
    neighbors: {
      // 吉林省内
      "四平市": { distance: 125, steps: 166670 },     // 西北面接壤
      "吉林市": { distance: 165, steps: 220000 },     // 北面接壤
      "通化市": { distance: 145, steps: 193330 }      // 东面接壤
    }
  },

  "通化市": {
    province: 'JL',
    location: { lat: 41.7286, lon: 125.9395 },
    icon: 'tonghua.png',
    neighbors: {
      // 吉林省内
      "辽源市": { distance: 145, steps: 193330 },     // 西面接壤
      "吉林市": { distance: 185, steps: 246670 },     // 北面接壤
      "白山市": { distance: 165, steps: 220000 },     // 东面接壤
      "延边朝鲜族自治州": { distance: 245, steps: 326670 }  // 东北面接壤
    }
  },

  "白山市": {
    province: 'JL',
    location: { lat: 41.9429, lon: 126.4230 },
    icon: 'baishan.png',
    neighbors: {
      // 吉林省内
      "通化市": { distance: 165, steps: 220000 },     // 西面接壤
      "延边朝鲜族自治州": { distance: 185, steps: 246670 }  // 东北面接壤
    }
  },

  "延边朝鲜族自治州": {
    province: 'JL',
    location: { lat: 42.8917, lon: 129.5097 },
    icon: 'yanbian.png',
    neighbors: {
      // 吉林省内
      "吉林市": { distance: 245, steps: 326670 },     // 西面接壤
      "通化市": { distance: 245, steps: 326670 },     // 西南面接壤
      "白山市": { distance: 185, steps: 246670 }      // 西北面接壤
    }
  },

  // === 黑龙江省城市 ===
  "哈尔滨市": {
    province: 'HLJ',
    location: { lat: 45.7517, lon: 126.6475 },
    icon: 'haerbin.png',
    neighbors: {
      // 黑龙江省内
      "大庆市": { distance: 165, steps: 220000 },     // 东面接壤
      "齐齐哈尔市": { distance: 185, steps: 246670 },   // 东北面接壤
      "绥化市": { distance: 165, steps: 220000 },     // 东南面接壤
      "牡丹江市": { distance: 185, steps: 246670 }      // 南面接壤
    }
  },

  "齐齐哈尔市": {
    province: 'HLJ',
    location: { lat: 47.3543, lon: 123.9179 },
    icon: 'qiqihaer.png',
    neighbors: {
      // 黑龙江省内
      "哈尔滨市": { distance: 185, steps: 246670 },   // 西南面接壤
      "大庆市": { distance: 185, steps: 246670 },     // 东南面接壤
      "黑河市": { distance: 285, steps: 380000 },     // 东面接壤
      "绥化市": { distance: 185, steps: 246670 },   // 西面接壤
      "鸡西市": { distance: 165, steps: 220000 }      // 西北面接壤
    }
  },

  "鸡西市": {
    province: 'HLJ',
    location: { lat: 45.2952, lon: 130.9697 },
    icon: 'jixi.png',
    neighbors: {
      // 黑龙江省内
      "齐齐哈尔市": { distance: 165, steps: 220000 },   // 东南面接壤
      "牡丹江市": { distance: 185, steps: 246670 },     // 东面接壤
      "鹤岗市": { distance: 165, steps: 220000 }      // 南面接壤
    }
  },

  "绥化市": {
    province: 'HLJ',
    location: { lat: 46.6434, lon: 126.9927 },
    icon: 'suihua.png',
    neighbors: {
      // 黑龙江省内
      "哈尔滨市": { distance: 165, steps: 220000 },     // 西南面接壤
      "齐齐哈尔市": { distance: 185, steps: 246670 },   // 东面接壤
      "黑河市": { distance: 185, steps: 246670 },     // 北面接壤
      "大兴安岭地区": { distance: 185, steps: 246670 }    // 东北面接壤
    }
  },

  "大兴安岭地区": {
    province: 'HLJ',
    location: { lat: 52.3352, lon: 124.7108 },
    icon: 'daxinganling.png',
    neighbors: {
      // 黑龙江省内
      "绥化市": { distance: 185, steps: 246670 },     // 西南面接壤
      // 内蒙古自治区
      "呼伦贝尔市": { distance: 285, steps: 380000 }    // 西面接壤
    }
  },

  // === 内蒙古自治区城市 ===
  "呼和浩特市": {
    province: 'NMG',
    location: { lat: 40.8415, lon: 111.7508 },
    icon: 'huhehaote.png',
    neighbors: {
      // 内蒙古自治区内
      "包头市": { distance: 185, steps: 246670 },     // 东面接壤
      "赤峰市": { distance: 185, steps: 246670 },     // 东南面接壤
      "通辽市": { distance: 185, steps: 246670 },     // 南面接壤
      "呼伦贝尔市": { distance: 185, steps: 246670 },   // 西北面接壤
      "巴彦淖尔市": { distance: 185, steps: 246670 },   // 西南面接壤
      "乌海市": { distance: 185, steps: 246670 }      // 西面接壤
    }
  },

  "包头市": {
    province: 'NMG',
    location: { lat: 40.6581, lon: 109.8189 },
    icon: 'baotou.png',
    neighbors: {
      // 内蒙古自治区内
      "呼和浩特市": { distance: 185, steps: 246670 },   // 西面接壤
      "赤峰市": { distance: 185, steps: 246670 },     // 东南面接壤
      "鄂尔多斯市": { distance: 185, steps: 246670 },   // 东面接壤
      "巴彦淖尔市": { distance: 185, steps: 246670 }   // 西南面接壤
    }
  },

  "赤峰市": {
    province: 'NMG',
    location: { lat: 42.2581, lon: 118.9527 },
    icon: 'chifeng.png',
    neighbors: {
      // 内蒙古自治区内
      "呼和浩特市": { distance: 185, steps: 246670 },   // 西南面接壤
      "包头市": { distance: 185, steps: 246670 },     // 西北面接壤
      "通辽市": { distance: 185, steps: 246670 },     // 东面接壤
      "鄂尔多斯市": { distance: 185, steps: 246670 },   // 东南面接壤
      // 河北省
      "承德市": { distance: 285, steps: 380000 },     // 北面接壤
      // 辽宁省
      "朝阳市": { distance: 285, steps: 380000 }      // 南面接壤
    }
  },

  "通辽市": {
    province: 'NMG',
    location: { lat: 43.6526, lon: 122.2444 },
    icon: 'tongliao.png',
    neighbors: {
      // 内蒙古自治区内
      "呼和浩特市": { distance: 185, steps: 246670 },   // 北面接壤
      "赤峰市": { distance: 185, steps: 246670 },     // 西面接壤
      "鄂尔多斯市": { distance: 185, steps: 246670 },   // 东南面接壤
      "乌兰察布市": { distance: 185, steps: 246670 },   // 东北面接壤
      // 吉林省
      "阜新市": { distance: 285, steps: 380000 }      // 南面接壤
    }
  },

  "呼伦贝尔市": {
    province: 'NMG',
    location: { lat: 49.2117, lon: 119.7656 },
    icon: 'hulunbeier.png',
    neighbors: {
      // 内蒙古自治区内
      "呼和浩特市": { distance: 185, steps: 246670 },   // 东南面接壤
      "巴彦淖尔市": { distance: 185, steps: 246670 },   // 东面接壤
      "兴安盟": { distance: 185, steps: 246670 },     // 北面接壤
      // 黑龙江省
      "大兴安岭地区": { distance: 285, steps: 380000 }  // 西面接壤
    }
  },

  "兴安盟": {
    province: 'NMG',
    location: { lat: 46.0762, lon: 122.0703 },
    icon: 'xinganmeng.png',
    neighbors: {
      // 内蒙古自治区内
      "呼伦贝尔市": { distance: 185, steps: 246670 }   // 南面接壤
    }
  },

  "哲里木盟": {
    province: 'NMG',
    location: { lat: 43.3333, lon: 117.0000 },
    icon: 'zhelimu.png',
    neighbors: {
      // 内蒙古自治区内
      "乌兰察布市": { distance: 185, steps: 246670 }   // 南面接壤
    }
  },

  "锡林郭勒盟": {
    province: 'NMG',
    location: { lat: 43.9388, lon: 116.0911 },
    icon: 'xilinguole.png',
    neighbors: {
      // 内蒙古自治区内
      "乌兰察布市": { distance: 185, steps: 246670 },   // 西面接壤
      "阿拉善盟": { distance: 185, steps: 246670 }     // 东北面接壤
    }
  },

  "阿拉善盟": {
    province: 'NMG',
    location: { lat: 38.8451, lon: 105.6702 },
    icon: 'alashan.png',
    neighbors: {
      // 内蒙古自治区内
      "锡林郭勒盟": { distance: 185, steps: 246670 }   // 西南面接壤
    }
  },

  // === 宁夏回族自治区城市 ===
  "银川市": {
    province: 'NX',
    location: { lat: 38.4864, lon: 106.2324 },
    icon: 'yinchuan.png',
    neighbors: {
      // 宁夏回族自治区内
      "石嘴山市": { distance: 185, steps: 246670 },   // 东面接壤
      "固原市": { distance: 185, steps: 246670 },     // 南面接壤
      // 陕西省
      "榆林市": { distance: 285, steps: 380000 },     // 西面接壤
      "汉中市": { distance: 285, steps: 380000 }      // 西北面接壤
    }
  },

  "石嘴山市": {
    province: 'NX',
    location: { lat: 39.0177, lon: 106.3843 },
    icon: 'shizuishan.png',
    neighbors: {
      // 宁夏回族自治区内
      "银川市": { distance: 185, steps: 246670 },   // 西面接壤
      "吴忠市": { distance: 185, steps: 246670 }     // 东南面接壤
    }
  },

  "吴忠市": {
    province: 'NX',
    location: { lat: 37.9979, lon: 106.1994 },
    icon: 'wuzhong.png',
    neighbors: {
      // 宁夏回族自治区内
      "石嘴山市": { distance: 185, steps: 246670 },   // 西北面接壤
      "固原市": { distance: 185, steps: 246670 }     // 东面接壤
    }
  },

  "固原市": {
    province: 'NX',
    location: { lat: 36.0045, lon: 106.2852 },
    icon: 'guyuan.png',
    neighbors: {
      // 宁夏回族自治区内
      "银川市": { distance: 185, steps: 246670 },     // 北面接壤
      "吴忠市": { distance: 185, steps: 246670 },     // 西面接壤
      // 山西省
      "运城市": { distance: 245, steps: 326670 },     // 东北面接壤
      "吕梁市": { distance: 245, steps: 326670 }      // 东面接壤
    }
  },

  // === 青海省城市 ===
  "西宁市": {
    province: 'QH',
    location: { lat: 36.6171, lon: 101.7782 },
    icon: 'xining.png',
    neighbors: {
      // 青海省内
      "海东市": { distance: 185, steps: 246670 },     // 东面接壤
      "海北藏族自治州": { distance: 185, steps: 246670 }, // 北面接壤
      "黄南藏族自治州": { distance: 185, steps: 246670 }, // 西北面接壤
      "海南藏族自治州": { distance: 185, steps: 246670 }, // 西南面接壤
      "果洛藏族自治州": { distance: 185, steps: 246670 }, // 南面接壤
      // 陕西省
      "西安市": { distance: 285, steps: 380000 }      // 西面接壤
    }
  },

  "海东市": {
    province: 'QH',
    location: { lat: 36.5029, lon: 102.1018 },
    icon: 'haidong.png',
    neighbors: {
      // 青海省内
      "西宁市": { distance: 185, steps: 246670 },     // 西面接壤
      "海南藏族自治州": { distance: 185, steps: 246670 }, // 南面接壤
      "海北藏族自治州": { distance: 185, steps: 246670 } // 东北面接壤
    }
  },

  "海北藏族自治州": {
    province: 'QH',
    location: { lat: 36.9541, lon: 100.9010 },
    icon: 'haibei.png',
    neighbors: {
      // 青海省内
      "西宁市": { distance: 185, steps: 246670 },     // 南面接壤
      "海东市": { distance: 185, steps: 246670 },     // 西南面接壤
      "黄南藏族自治州": { distance: 185, steps: 246670 }, // 西面接壤
      "果洛藏族自治州": { distance: 185, steps: 246670 } // 东南面接壤
    }
  },

  "黄南藏族自治州": {
    province: 'QH',
    location: { lat: 35.5172, lon: 102.0087 },
    icon: 'huangnan.png',
    neighbors: {
      // 青海省内
      "西宁市": { distance: 185, steps: 246670 },     // 东南面接壤
      "海北藏族自治州": { distance: 185, steps: 246670 }, // 东面接壤
      "果洛藏族自治州": { distance: 185, steps: 246670 } // 南面接壤
    }
  },

  "海南藏族自治州": {
    province: 'QH',
    location: { lat: 36.2982, lon: 100.6212 },
    icon: 'hainan.png',
    neighbors: {
      // 青海省内
      "西宁市": { distance: 185, steps: 246670 },     // 东北面接壤
      "海东市": { distance: 185, steps: 246670 },     // 北面接壤
      "果洛藏族自治州": { distance: 185, steps: 246670 } // 东面接壤
    }
  },

  "果洛藏族自治州": {
    province: 'QH',
    location: { lat: 34.4736, lon: 100.2475 },
    icon: 'guoluo.png',
    neighbors: {
      // 青海省内
      "西宁市": { distance: 185, steps: 246670 },     // 北面接壤
      "海北藏族自治州": { distance: 185, steps: 246670 }, // 西北面接壤
      "黄南藏族自治州": { distance: 185, steps: 246670 }, // 北面接壤
      "海南藏族自治州": { distance: 185, steps: 246670 } // 西面接壤
    }
  },

  // === 新疆维吾尔自治区城市 ===
  "乌鲁木齐市": {
    province: 'XJ',
    location: { lat: 43.8256, lon: 87.6168 },
    icon: 'wulumuqi.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "克拉玛依市": { distance: 185, steps: 246670 },   // 东面接壤
      "吐鲁番市": { distance: 185, steps: 246670 },   // 东北面接壤
      "哈密市": { distance: 185, steps: 246670 },     // 北面接壤
      "昌吉回族自治州": { distance: 185, steps: 246670 }, // 西北面接壤
      "博尔塔拉蒙古自治州": { distance: 185, steps: 246670 }, // 西面接壤
      "伊犁哈萨克自治州": { distance: 185, steps: 246670 } // 西南面接壤
    }
  },

  "克拉玛依市": {
    province: 'XJ',
    location: { lat: 45.5798, lon: 84.8830 },
    icon: 'kelamayi.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "乌鲁木齐市": { distance: 185, steps: 246670 },   // 西面接壤
      "吐鲁番市": { distance: 185, steps: 246670 },   // 东南面接壤
      "阿克苏地区": { distance: 185, steps: 246670 }   // 南面接壤
    }
  },

  "吐鲁番市": {
    province: 'XJ',
    location: { lat: 42.9477, lon: 89.1847 },
    icon: 'tulufan.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "乌鲁木齐市": { distance: 185, steps: 246670 },   // 西南面接壤
      "克拉玛依市": { distance: 185, steps: 246670 },   // 西北面接壤
      "哈密市": { distance: 185, steps: 246670 },     // 东北面接壤
      "和田地区": { distance: 185, steps: 246670 }     // 东面接壤
    }
  },

  "哈密市": {
    province: 'XJ',
    location: { lat: 42.8333, lon: 93.5167 },
    icon: 'hami.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "乌鲁木齐市": { distance: 185, steps: 246670 },   // 南面接壤
      "吐鲁番市": { distance: 185, steps: 246670 },   // 西南面接壤
      "昌吉回族自治州": { distance: 185, steps: 246670 }, // 东面接壤
      "阿勒泰地区": { distance: 185, steps: 246670 }   // 东北面接壤
    }
  },

  "昌吉回族自治州": {
    province: 'XJ',
    location: { lat: 44.0145, lon: 87.3043 },
    icon: 'changji.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "乌鲁木齐市": { distance: 185, steps: 246670 },   // 东南面接壤
      "哈密市": { distance: 185, steps: 246670 },     // 西面接壤
      "博尔塔拉蒙古自治州": { distance: 185, steps: 246670 }, // 东北面接壤
      "巴音郭楞蒙古自治州": { distance: 185, steps: 246670 }, // 东面接壤
      "阿克苏地区": { distance: 185, steps: 246670 }   // 南面接壤
    }
  },

  "博尔塔拉蒙古自治州": {
    province: 'XJ',
    location: { lat: 44.9033, lon: 82.2667 },
    icon: 'boertala.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "乌鲁木齐市": { distance: 185, steps: 246670 },   // 东面接壤
      "昌吉回族自治州": { distance: 185, steps: 246670 }, // 西南面接壤
      "阿拉尔市": { distance: 185, steps: 246670 }     // 东北面接壤
    }
  },

  "巴音郭楞蒙古自治州": {
    province: 'XJ',
    location: { lat: 41.7675, lon: 86.1448 },
    icon: 'bayinguoleng.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "昌吉回族自治州": { distance: 185, steps: 246670 }, // 西面接壤
      "阿克苏地区": { distance: 185, steps: 246670 },   // 东南面接壤
      "克孜勒苏柯尔克孜自治州": { distance: 185, steps: 246670 } // 东北面接壤
    }
  },

  "阿克苏地区": {
    province: 'XJ',
    location: { lat: 41.1675, lon: 80.2647 },
    icon: 'akesu.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "克拉玛依市": { distance: 185, steps: 246670 },   // 北面接壤
      "昌吉回族自治州": { distance: 185, steps: 246670 }, // 北面接壤
      "巴音郭楞蒙古自治州": { distance: 185, steps: 246670 }, // 西南面接壤
      "克孜勒苏柯尔克孜自治州": { distance: 185, steps: 246670 }, // 西面接壤
      "喀什地区": { distance: 185, steps: 246670 }     // 东南面接壤
    }
  },

  "克孜勒苏柯尔克孜自治州": {
    province: 'XJ',
    location: { lat: 39.7134, lon: 76.1728 },
    icon: 'kezilesukeerkezi.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "阿克苏地区": { distance: 185, steps: 246670 },   // 东面接壤
      "巴音郭楞蒙古自治州": { distance: 185, steps: 246670 }, // 西北面接壤
      "喀什地区": { distance: 185, steps: 246670 }     // 东南面接壤
    }
  },

  "喀什地区": {
    province: 'XJ',
    location: { lat: 39.4676, lon: 75.9897 },
    icon: 'kashi.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "阿克苏地区": { distance: 185, steps: 246670 },   // 西北面接壤
      "克孜勒苏柯尔克孜自治州": { distance: 185, steps: 246670 }, // 西南面接壤
      "和田地区": { distance: 185, steps: 246670 },     // 东面接壤
      "伊犁哈萨克自治州": { distance: 185, steps: 246670 } // 北面接壤
    }
  },

  "和田地区": {
    province: 'XJ',
    location: { lat: 37.1109, lon: 79.9253 },
    icon: 'hetian.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "吐鲁番市": { distance: 185, steps: 246670 },   // 西面接壤
      "喀什地区": { distance: 185, steps: 246670 },     // 西面接壤
      "伊犁哈萨克自治州": { distance: 185, steps: 246670 } // 北面接壤
    }
  },

  "伊犁哈萨克自治州": {
    province: 'XJ',
    location: { lat: 43.9139, lon: 81.3165 },
    icon: 'yili.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "乌鲁木齐市": { distance: 185, steps: 246670 },   // 东北面接壤
      "和田地区": { distance: 185, steps: 246670 },     // 南面接壤
      "喀什地区": { distance: 185, steps: 246670 },     // 南面接壤
      "塔城地区": { distance: 185, steps: 246670 },     // 东面接壤
      "阿勒泰地区": { distance: 185, steps: 246670 }   // 东南面接壤
    }
  },

  "塔城地区": {
    province: 'XJ',
    location: { lat: 46.7463, lon: 82.9834 },
    icon: 'tacheng.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "伊犁哈萨克自治州": { distance: 185, steps: 246670 }, // 西面接壤
      "阿勒泰地区": { distance: 185, steps: 246670 }   // 东南面接壤
    }
  },

  "阿勒泰地区": {
    province: 'XJ',
    location: { lat: 47.8483, lon: 88.1396 },
    icon: 'aletai.png',
    neighbors: {
      // 新疆维吾尔自治区内
      "哈密市": { distance: 185, steps: 246670 },     // 西南面接壤
      "塔城地区": { distance: 185, steps: 246670 },     // 西北面接壤
      "伊犁哈萨克自治州": { distance: 185, steps: 246670 } // 西面接壤
    }
  },

  "石河子市": {
    province: 'XJ',
    location: { lat: 44.3054, lon: 86.0742 },
    icon: 'shihezi.png',
    neighbors: {
      "克拉玛依市": { distance: 185, steps: 246670 },   // 东北面接壤
      "吐鲁番市": { distance: 185, steps: 246670 },   // 东面接壤
      "哈密市": { distance: 185, steps: 246670 },     // 南面接壤
      "临夏回族自治州": { distance: 245, steps: 326670 },     // 北面接壤
      "阿坝藏族羌族自治州": { distance: 245, steps: 326670 },     // 南面接壤
      // 青海省
      "黄南藏族自治州": { distance: 245, steps: 326670 },     // 西面接壤
      "海东市": { distance: 285, steps: 380000 }      // 西北面接壤
    }
  }
}

module.exports.citiesData = citiesData