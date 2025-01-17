const citiesData = {
  "北京市": {
    province: 'BJ',
    location: { lat: 39.9042, lon: 116.4074 },
    icon: 'beijingshi.png',
    neighbors: {
      "承德市": { distance: 247, steps: 329330 },
      "张家口市": { distance: 226, steps: 301330 },
      "保定市": { distance: 197, steps: 262660 },
      "廊坊市": { distance: 66, steps: 88000 },
      "天津市": { distance: 144, steps: 192000 },
    }
  },
  "天津市": {
    province: 'TJ',
    location: { lat: 39.3434, lon: 117.3616 },
    icon: 'tianjinshi.png',
    neighbors: {
      "唐山市": { distance: 109, steps: 145330 },
      "承德市": { distance: 261, steps: 348000 },
      "北京市": { distance: 144, steps: 192000 },
      "廊坊市": { distance: 87, steps: 116000 },
      "沧州市": { distance: 174, steps: 232000 },
    }
  },
  "上海市": {
    province: 'SH',
    location: { lat: 31.2304, lon: 121.4737 },
    icon: 'shanghaishi.png',
    neighbors: {
      "苏州市": { distance: 119, steps: 158660 },
      "南通市": { distance: 141, steps: 188000 },
      "嘉兴市": { distance: 122, steps: 162660 },
    }
  },
  "重庆市": {
    province: 'CQ',
    location: { lat: 29.5647, lon: 106.5501 },
    icon: 'chongqingshi.png',
    neighbors: {
      "神农架林区": { distance: 474, steps: 632000 },
      "十堰市": { distance: 741, steps: 988000 },
      "安康市": { distance: 589, steps: 785330 },
      "达州市": { distance: 285, steps: 380000 },
      "广安市": { distance: 142, steps: 189330 },
      "遂宁市": { distance: 199, steps: 265330 },
      "资阳市": { distance: 272, steps: 362660 },
      "内江市": { distance: 201, steps: 268000 },
      "泸州市": { distance: 186, steps: 248000 },
      "遵义市": { distance: 291, steps: 388000 },
      "铜仁市": { distance: 462, steps: 616000 },
      "湘西土家族苗族自治州": { distance: 477, steps: 636000 },
      "恩施土家族苗族自治州": { distance: 412, steps: 549330 },
    }
  },
  "石家庄市": {
    province: 'HEB',
    location: { lat: 38.0428, lon: 114.5149 },
    icon: 'shijiazhuangshi.png',
    neighbors: {
      "衡水市": { distance: 150, steps: 200000 },
      "保定市": { distance: 174, steps: 232000 },
      "忻州市": { distance: 226, steps: 301330 },
      "阳泉市": { distance: 118, steps: 157330 },
      "晋中市": { distance: 224, steps: 298660 },
      "邢台市": { distance: 152, steps: 202660 },
    }
  },
  "唐山市": {
    province: 'HEB',
    location: { lat: 39.6307, lon: 118.1801 },
    icon: 'tangshanshi.png',
    neighbors: {
      "秦皇岛市": { distance: 177, steps: 236000 },
      "承德市": { distance: 208, steps: 277330 },
      "天津市": { distance: 109, steps: 145330 },
    }
  },
  "秦皇岛市": {
    province: 'HEB',
    location: { lat: 39.9355, lon: 119.5977 },
    icon: 'qinhuangdaoshi.png',
    neighbors: {
      "葫芦岛市": { distance: 191, steps: 254660 },
      "朝阳市": { distance: 275, steps: 366660 },
      "承德市": { distance: 251, steps: 334660 },
      "唐山市": { distance: 177, steps: 236000 },
    }
  },
  "邯郸市": {
    province: 'HEB',
    location: { lat: 36.6252, lon: 114.5391 },
    icon: 'handanshi.png',
    neighbors: {
      "聊城市": { distance: 183, steps: 244000 },
      "邢台市": { distance: 70, steps: 93330 },
      "晋中市": { distance: 277, steps: 369330 },
      "长治市": { distance: 191, steps: 254660 },
      "安阳市": { distance: 84, steps: 112000 },
      "濮阳市": { distance: 148, steps: 197330 },
    }
  },
  "邢台市": {
    province: 'HEB',
    location: { lat: 37.0682, lon: 114.5047 },
    icon: 'xingtaishi.png',
    neighbors: {
      "德州市": { distance: 237, steps: 316000 },
      "衡水市": { distance: 178, steps: 237330 },
      "石家庄市": { distance: 152, steps: 202660 },
      "晋中市": { distance: 238, steps: 317330 },
      "邯郸市": { distance: 70, steps: 93330 },
      "聊城市": { distance: 208, steps: 277330 },
    }
  },
  "保定市": {
    province: 'HEB',
    location: { lat: 38.8737, lon: 115.4647 },
    icon: 'baodingshi.png',
    neighbors: {
      "沧州市": { distance: 190, steps: 253330 },
      "廊坊市": { distance: 180, steps: 240000 },
      "北京市": { distance: 197, steps: 262660 },
      "张家口市": { distance: 303, steps: 404000 },
      "大同市": { distance: 322, steps: 429330 },
      "忻州市": { distance: 340, steps: 453330 },
      "石家庄市": { distance: 174, steps: 232000 },
      "衡水市": { distance: 180, steps: 240000 },
    }
  },
  "张家口市": {
    province: 'HEB',
    location: { lat: 40.7686, lon: 114.8868 },
    icon: 'zhangjiakoushi.png',
    neighbors: {
      "北京市": { distance: 226, steps: 301330 },
      "承德市": { distance: 364, steps: 485330 },
      "锡林郭勒盟": { distance: 513, steps: 684000 },
      "乌兰察布市": { distance: 213, steps: 284000 },
      "大同市": { distance: 218, steps: 290660 },
      "保定市": { distance: 303, steps: 404000 },
    }
  },
  "承德市": {
    province: 'HEB',
    location: { lat: 40.9515, lon: 117.9634 },
    icon: 'chengdeshi.png',
    neighbors: {
      "唐山市": { distance: 208, steps: 277330 },
      "秦皇岛市": { distance: 251, steps: 334660 },
      "朝阳市": { distance: 307, steps: 409330 },
      "赤峰市": { distance: 234, steps: 312000 },
      "锡林郭勒盟": { distance: 513, steps: 684000 },
      "张家口市": { distance: 364, steps: 485330 },
      "北京市": { distance: 247, steps: 329330 },
      "天津市": { distance: 261, steps: 348000 },
    }
  },
  "沧州市": {
    province: 'HEB',
    location: { lat: 38.3037, lon: 116.8388 },
    icon: 'cangzhoushi.png',
    neighbors: {
      "天津市": { distance: 174, steps: 232000 },
      "廊坊市": { distance: 193, steps: 257330 },
      "保定市": { distance: 190, steps: 253330 },
      "衡水市": { distance: 169, steps: 225330 },
      "德州市": { distance: 148, steps: 197330 },
      "滨州市": { distance: 200, steps: 266660 },
    }
  },
  "廊坊市": {
    province: 'HEB',
    location: { lat: 39.5374, lon: 116.6835 },
    icon: 'langfangshi.png',
    neighbors: {
      "北京市": { distance: 66, steps: 88000 },
      "保定市": { distance: 180, steps: 240000 },
      "沧州市": { distance: 193, steps: 257330 },
      "天津市": { distance: 87, steps: 116000 },
    }
  },
  "衡水市": {
    province: 'HEB',
    location: { lat: 37.7349, lon: 115.6705 },
    icon: 'hengshuishi.png',
    neighbors: {
      "沧州市": { distance: 169, steps: 225330 },
      "保定市": { distance: 180, steps: 240000 },
      "石家庄市": { distance: 150, steps: 200000 },
      "邢台市": { distance: 178, steps: 237330 },
      "德州市": { distance: 97, steps: 129330 },
    }
  },
  "太原市": {
    province: 'SX',
    location: { lat: 37.8706, lon: 112.5489 },
    icon: 'taiyuanshi.png',
    neighbors: {
      "阳泉市": { distance: 128, steps: 170660 },
      "忻州市": { distance: 88, steps: 117330 },
      "吕梁市": { distance: 182, steps: 242660 },
      "晋中市": { distance: 39, steps: 52000 },
    }
  },
  "大同市": {
    province: 'SX',
    location: { lat: 40.0766, lon: 113.2946 },
    icon: 'datongshi.png',
    neighbors: {
      "张家口市": { distance: 218, steps: 290660 },
      "乌兰察布市": { distance: 150, steps: 200000 },
      "朔州市": { distance: 156, steps: 208000 },
      "忻州市": { distance: 268, steps: 357330 },
      "保定市": { distance: 322, steps: 429330 },
    }
  },
  "阳泉市": {
    province: 'SX',
    location: { lat: 37.8575, lon: 113.583 },
    icon: 'yangquanshi.png',
    neighbors: {
      "石家庄市": { distance: 118, steps: 157330 },
      "朔州市": { distance: 269, steps: 358660 },
      "太原市": { distance: 128, steps: 170660 },
      "晋中市": { distance: 106, steps: 141330 },
    }
  },
  "长治市": {
    province: 'SX',
    location: { lat: 36.1953, lon: 113.1169 },
    icon: 'changzhishi.png',
    neighbors: {
      "安阳市": { distance: 162, steps: 216000 },
      "邯郸市": { distance: 191, steps: 254660 },
      "晋中市": { distance: 237, steps: 316000 },
      "临汾市": { distance: 202, steps: 269330 },
      "晋城市": { distance: 115, steps: 153330 },
      "新乡市": { distance: 173, steps: 230660 },
    }
  },
  "晋城市": {
    province: 'SX',
    location: { lat: 35.4911, lon: 112.8513 },
    icon: 'jinchengshi.png',
    neighbors: {
      "新乡市": { distance: 140, steps: 186660 },
      "长治市": { distance: 115, steps: 153330 },
      "临汾市": { distance: 193, steps: 257330 },
      "运城市": { distance: 246, steps: 328000 },
      "济源市": { distance: 74, steps: 98660 },
      "焦作市": { distance: 66, steps: 88000 },
    }
  },
  "朔州市": {
    province: 'SX',
    location: { lat: 39.3311, lon: 112.4333 },
    icon: 'shuozhoushi.png',
    neighbors: {
      "大同市": { distance: 156, steps: 208000 },
      "乌兰察布市": { distance: 277, steps: 369330 },
      "呼和浩特市": { distance: 249, steps: 332000 },
      "忻州市": { distance: 147, steps: 196000 },
    }
  },
  "晋中市": {
    province: 'SX',
    location: { lat: 37.6872, lon: 112.7528 },
    icon: 'jinzhongshi.png',
    neighbors: {
      "邢台市": { distance: 238, steps: 317330 },
      "石家庄市": { distance: 224, steps: 298660 },
      "阳泉市": { distance: 106, steps: 141330 },
      "太原市": { distance: 39, steps: 52000 },
      "吕梁市": { distance: 201, steps: 268000 },
      "临汾市": { distance: 293, steps: 390660 },
      "长治市": { distance: 237, steps: 316000 },
      "邯郸市": { distance: 277, steps: 369330 },
    }
  },
  "运城市": {
    province: 'SX',
    location: { lat: 35.0228, lon: 111.0047 },
    icon: 'yunchengshi.png',
    neighbors: {
      "济源市": { distance: 204, steps: 272000 },
      "晋城市": { distance: 246, steps: 328000 },
      "临汾市": { distance: 179, steps: 238660 },
      "渭南市": { distance: 208, steps: 277330 },
      "三门峡市": { distance: 46, steps: 61330 },
      "洛阳市": { distance: 196, steps: 261330 },
    }
  },
  "忻州市": {
    province: 'SX',
    location: { lat: 38.4167, lon: 112.7337 },
    icon: 'xinzhoushi.png',
    neighbors: {
      "石家庄市": { distance: 226, steps: 301330 },
      "保定市": { distance: 340, steps: 453330 },
      "大同市": { distance: 268, steps: 357330 },
      "朔州市": { distance: 147, steps: 196000 },
      "呼和浩特市": { distance: 396, steps: 528000 },
      "鄂尔多斯市": { distance: 403, steps: 537330 },
      "榆林市": { distance: 367, steps: 489330 },
      "吕梁市": { distance: 241, steps: 321330 },
      "太原市": { distance: 88, steps: 117330 },
      "阳泉市": { distance: 136, steps: 181330 },
    }
  },
  "临汾市": {
    province: 'SX',
    location: { lat: 36.088, lon: 111.519 },
    icon: 'linfenshi.png',
    neighbors: {
      "长治市": { distance: 202, steps: 269330 },
      "晋中市": { distance: 293, steps: 390660 },
      "吕梁市": { distance: 228, steps: 304000 },
      "延安市": { distance: 267, steps: 356000 },
      "渭南市": { distance: 356, steps: 474660 },
      "运城市": { distance: 179, steps: 238660 },
      "晋城市": { distance: 193, steps: 257330 },
    }
  },
  "吕梁市": {
    province: 'SX',
    location: { lat: 37.519, lon: 111.1414 },
    icon: 'lvliangshi.png',
    neighbors: {
      "太原市": { distance: 182, steps: 242660 },
      "忻州市": { distance: 241, steps: 321330 },
      "榆林市": { distance: 210, steps: 280000 },
      "延安市": { distance: 252, steps: 336000 },
      "临汾市": { distance: 228, steps: 304000 },
      "晋中市": { distance: 201, steps: 268000 },
    }
  },
  "沈阳市": {
    province: 'LN',
    location: { lat: 41.8057, lon: 123.4315 },
    icon: 'shenyangshi.png',
    neighbors: {
      "抚顺市": { distance: 63, steps: 84000 },
      "铁岭市": { distance: 89, steps: 118660 },
      "通辽市": { distance: 318, steps: 424000 },
      "阜新市": { distance: 207, steps: 276000 },
      "锦州市": { distance: 291, steps: 388000 },
      "鞍山市": { distance: 120, steps: 160000 },
      "辽阳市": { distance: 86, steps: 114660 },
      "本溪市": { distance: 89, steps: 118660 },
    }
  },
  "大连市": {
    province: 'LN',
    location: { lat: 38.914, lon: 121.6147 },
    icon: 'dalianshi.png',
    neighbors: {
      "丹东市": { distance: 382, steps: 509330 },
      "鞍山市": { distance: 380, steps: 506660 },
      "营口市": { distance: 283, steps: 377330 },
      "烟台市": { distance: 227, steps: 302660 },
    }
  },
  "鞍山市": {
    province: 'LN',
    location: { lat: 41.1087, lon: 122.9956 },
    icon: 'anshanshi.png',
    neighbors: {
      "丹东市": { distance: 223, steps: 297330 },
      "辽阳市": { distance: 39, steps: 52000 },
      "沈阳市": { distance: 120, steps: 160000 },
      "锦州市": { distance: 220, steps: 293330 },
      "盘锦市": { distance: 109, steps: 145330 },
      "营口市": { distance: 113, steps: 150660 },
      "大连市": { distance: 380, steps: 506660 },
    }
  },
  "抚顺市": {
    province: 'LN',
    location: { lat: 41.8807, lon: 123.9573 },
    icon: 'fushunshi.png',
    neighbors: {
      "通化市": { distance: 232, steps: 309330 },
      "辽源市": { distance: 210, steps: 280000 },
      "铁岭市": { distance: 65, steps: 86660 },
      "沈阳市": { distance: 63, steps: 84000 },
      "本溪市": { distance: 94, steps: 125330 },
    }
  },
  "本溪市": {
    province: 'LN',
    location: { lat: 41.2979, lon: 123.7662 },
    icon: 'benxishi.png',
    neighbors: {
      "通化市": { distance: 263, steps: 350660 },
      "抚顺市": { distance: 94, steps: 125330 },
      "沈阳市": { distance: 89, steps: 118660 },
      "辽阳市": { distance: 62, steps: 82660 },
      "丹东市": { distance: 196, steps: 261330 },
    }
  },
  "丹东市": {
    province: 'LN',
    location: { lat: 40.1297, lon: 124.3707 },
    icon: 'dandongshi.png',
    neighbors: {
      "通化市": { distance: 310, steps: 413330 },
      "本溪市": { distance: 196, steps: 261330 },
      "辽阳市": { distance: 223, steps: 297330 },
      "鞍山市": { distance: 223, steps: 297330 },
      "大连市": { distance: 382, steps: 509330 },
    }
  },
  "锦州市": {
    province: 'LN',
    location: { lat: 41.0954, lon: 121.1269 },
    icon: 'jinzhoushi.png',
    neighbors: {
      "盘锦市": { distance: 112, steps: 149330 },
      "鞍山市": { distance: 220, steps: 293330 },
      "沈阳市": { distance: 291, steps: 388000 },
      "阜新市": { distance: 158, steps: 210660 },
      "朝阳市": { distance: 109, steps: 145330 },
      "葫芦岛市": { distance: 69, steps: 92000 },
    }
  },
  "营口市": {
    province: 'LN',
    location: { lat: 40.6673, lon: 122.2351 },
    icon: 'yingkoushi.png',
    neighbors: {
      "大连市": { distance: 283, steps: 377330 },
      "鞍山市": { distance: 113, steps: 150660 },
      "盘锦市": { distance: 74, steps: 98660 },
    }
  },
  "阜新市": {
    province: 'LN',
    location: { lat: 42.0214, lon: 121.6708 },
    icon: 'fuxinshi.png',
    neighbors: {
      "沈阳市": { distance: 207, steps: 276000 },
      "通辽市": { distance: 263, steps: 350660 },
      "朝阳市": { distance: 158, steps: 210660 },
      "锦州市": { distance: 158, steps: 210660 },
    }
  },
  "辽阳市": {
    province: 'LN',
    location: { lat: 41.2733, lon: 123.2374 },
    icon: 'liaoyangshi.png',
    neighbors: {
      "本溪市": { distance: 62, steps: 82660 },
      "沈阳市": { distance: 86, steps: 114660 },
      "鞍山市": { distance: 39, steps: 52000 },
      "丹东市": { distance: 223, steps: 297330 },
    }
  },
  "盘锦市": {
    province: 'LN',
    location: { lat: 41.12, lon: 122.0731 },
    icon: 'panjinshi.png',
    neighbors: {
      "鞍山市": { distance: 109, steps: 145330 },
      "锦州市": { distance: 112, steps: 149330 },
      "营口市": { distance: 74, steps: 98660 },
    }
  },
  "铁岭市": {
    province: 'LN',
    location: { lat: 42.2862, lon: 123.8442 },
    icon: 'tielingshi.png',
    neighbors: {
      "辽源市": { distance: 178, steps: 237330 },
      "四平市": { distance: 149, steps: 198660 },
      "通辽市": { distance: 281, steps: 374660 },
      "沈阳市": { distance: 89, steps: 118660 },
      "抚顺市": { distance: 65, steps: 86660 },
    }
  },
  "朝阳市": {
    province: 'LN',
    location: { lat: 41.5763, lon: 120.451 },
    icon: 'chaoyangshi.png',
    neighbors: {
      "锦州市": { distance: 109, steps: 145330 },
      "阜新市": { distance: 158, steps: 210660 },
      "通辽市": { distance: 383, steps: 510660 },
      "赤峰市": { distance: 204, steps: 272000 },
      "承德市": { distance: 307, steps: 409330 },
      "秦皇岛市": { distance: 275, steps: 366660 },
      "葫芦岛市": { distance: 143, steps: 190660 },
    }
  },
  "葫芦岛市": {
    province: 'LN',
    location: { lat: 40.711, lon: 120.8378 },
    icon: 'huludaoshi.png',
    neighbors: {
      "锦州市": { distance: 69, steps: 92000 },
      "朝阳市": { distance: 143, steps: 190660 },
      "秦皇岛市": { distance: 191, steps: 254660 },
    }
  },
  "长春市": {
    province: 'JL',
    location: { lat: 43.8171, lon: 125.3235 },
    icon: 'changchunshi.png',
    neighbors: {
      "吉林市": { distance: 138, steps: 184000 },
      "哈尔滨市": { distance: 335, steps: 446660 },
      "松原市": { distance: 214, steps: 285330 },
      "四平市": { distance: 150, steps: 200000 },
    }
  },
  "吉林市": {
    province: 'JL',
    location: { lat: 43.8375, lon: 126.5494 },
    icon: 'jilinshi.png',
    neighbors: {
      "延边朝鲜族自治州": { distance: 366, steps: 488000 },
      "哈尔滨市": { distance: 299, steps: 398660 },
      "长春市": { distance: 138, steps: 184000 },
      "四平市": { distance: 270, steps: 360000 },
      "辽源市": { distance: 216, steps: 288000 },
      "通化市": { distance: 336, steps: 448000 },
      "白山市": { distance: 296, steps: 394660 },
    }
  },
  "四平市": {
    province: 'JL',
    location: { lat: 43.1666, lon: 124.3508 },
    icon: 'sipingshi.png',
    neighbors: {
      "吉林市": { distance: 270, steps: 360000 },
      "长春市": { distance: 150, steps: 200000 },
      "松原市": { distance: 312, steps: 416000 },
      "通辽市": { distance: 250, steps: 333330 },
      "铁岭市": { distance: 149, steps: 198660 },
      "辽源市": { distance: 100, steps: 133330 },
    }
  },
  "辽源市": {
    province: 'JL',
    location: { lat: 42.9023, lon: 125.1449 },
    icon: 'liaoyuanshi.png',
    neighbors: {
      "通化市": { distance: 205, steps: 273330 },
      "吉林市": { distance: 216, steps: 288000 },
      "四平市": { distance: 100, steps: 133330 },
      "铁岭市": { distance: 178, steps: 237330 },
      "抚顺市": { distance: 210, steps: 280000 },
    }
  },
  "通化市": {
    province: 'JL',
    location: { lat: 41.7286, lon: 125.9395 },
    icon: 'tonghuashi.png',
    neighbors: {
      "白山市": { distance: 66, steps: 88000 },
      "吉林市": { distance: 336, steps: 448000 },
      "辽源市": { distance: 205, steps: 273330 },
      "抚顺市": { distance: 232, steps: 309330 },
      "本溪市": { distance: 263, steps: 350660 },
      "丹东市": { distance: 310, steps: 413330 },
    }
  },
  "白山市": {
    province: 'JL',
    location: { lat: 41.9429, lon: 126.423 },
    icon: 'baishanshi.png',
    neighbors: {
      "延边朝鲜族自治州": { distance: 385, steps: 513330 },
      "吉林市": { distance: 296, steps: 394660 },
      "通化市": { distance: 66, steps: 88000 },
    }
  },
  "延边朝鲜族自治州": {
    province: 'JL',
    location: { lat: 42.8917, lon: 129.5097 },
    icon: 'yanbianchaoxianzuzizhizhou.png',
    neighbors: {
      "牡丹江市": { distance: 264, steps: 352000 },
      "哈尔滨市": { distance: 548, steps: 730660 },
      "吉林市": { distance: 366, steps: 488000 },
      "白山市": { distance: 385, steps: 513330 },
    }
  },
  "白城市": {
    province: 'JL',
    location: { lat: 45.3391, lon: 122.783 },
    icon: 'baichengshi.png',
    neighbors: {
      "松原市": { distance: 226, steps: 301330 },
      "大庆市": { distance: 318, steps: 424000 },
      "齐齐哈尔市": { distance: 337, steps: 449330 },
      "兴安盟": { distance: 139, steps: 185330 },
      "通辽市": { distance: 270, steps: 360000 },
    }
  },
  "松原市": {
    province: 'JL',
    location: { lat: 45.1417, lon: 124.8251 },
    icon: 'songyuanshi.png',
    neighbors: {
      "哈尔滨市": { distance: 221, steps: 294660 },
      "大庆市": { distance: 228, steps: 304000 },
      "白城市": { distance: 226, steps: 301330 },
      "通辽市": { distance: 369, steps: 492000 },
      "四平市": { distance: 312, steps: 416000 },
      "长春市": { distance: 214, steps: 285330 },
    }
  },
  "哈尔滨市": {
    province: 'HLJ',
    location: { lat: 45.7517, lon: 126.6475 },
    icon: 'haerbinshi.png',
    neighbors: {
      "牡丹江市": { distance: 372, steps: 496000 },
      "七台河市": { distance: 459, steps: 612000 },
      "佳木斯市": { distance: 428, steps: 570660 },
      "伊春市": { distance: 387, steps: 516000 },
      "绥化市": { distance: 144, steps: 192000 },
      "大庆市": { distance: 212, steps: 282660 },
      "松原市": { distance: 221, steps: 294660 },
      "长春市": { distance: 335, steps: 446660 },
      "吉林市": { distance: 299, steps: 398660 },
      "延边朝鲜族自治州": { distance: 548, steps: 730660 },
    }
  },
  "牡丹江市": {
    province: 'HLJ',
    location: { lat: 44.58, lon: 129.6 },
    icon: 'mudanjiangshi.png',
    neighbors: {
      "鸡西市": { distance: 188, steps: 250660 },
      "七台河市": { distance: 233, steps: 310660 },
      "哈尔滨市": { distance: 372, steps: 496000 },
      "延边朝鲜族自治州": { distance: 264, steps: 352000 },
    }
  },
  "齐齐哈尔市": {
    province: 'HLJ',
    location: { lat: 47.3543, lon: 123.9179 },
    icon: 'qiqihaershi.png',
    neighbors: {
      "绥化市": { distance: 345, steps: 460000 },
      "黑河市": { distance: 583, steps: 777330 },
      "呼伦贝尔市": { distance: 519, steps: 692000 },
      "兴安盟": { distance: 281, steps: 374660 },
      "白城市": { distance: 337, steps: 449330 },
      "大庆市": { distance: 174, steps: 232000 },
    }
  },
  "鸡西市": {
    province: 'HLJ',
    location: { lat: 45.2952, lon: 130.9697 },
    icon: 'jixishi.png',
    neighbors: {
      "双鸭山市": { distance: 212, steps: 282660 },
      "七台河市": { distance: 76, steps: 101330 },
      "牡丹江市": { distance: 188, steps: 250660 },
    }
  },
  "绥化市": {
    province: 'HLJ',
    location: { lat: 46.6434, lon: 126.9927 },
    icon: 'suihuashi.png',
    neighbors: {
      "伊春市": { distance: 259, steps: 345330 },
      "黑河市": { distance: 564, steps: 752000 },
      "齐齐哈尔市": { distance: 345, steps: 460000 },
      "大庆市": { distance: 203, steps: 270660 },
      "哈尔滨市": { distance: 144, steps: 192000 },
    }
  },
  "鹤岗市": {
    province: 'HLJ',
    location: { lat: 24.42, lon: 111.2862 },
    icon: 'hegangshi.png',
    neighbors: {
      "伊春市": { distance: 4226, steps: 5634660 },
      "佳木斯市": { distance: 4212, steps: 5616000 },
    }
  },
  "双鸭山市": {
    province: 'HLJ',
    location: { lat: 46.6465, lon: 131.1591 },
    icon: 'shuangyashanshi.png',
    neighbors: {
      "佳木斯市": { distance: 93, steps: 124000 },
      "七台河市": { distance: 140, steps: 186660 },
      "鸡西市": { distance: 212, steps: 282660 },
    }
  },
  "大庆市": {
    province: 'HLJ',
    location: { lat: 46.5893, lon: 125.1037 },
    icon: 'daqingshi.png',
    neighbors: {
      "绥化市": { distance: 203, steps: 270660 },
      "齐齐哈尔市": { distance: 174, steps: 232000 },
      "白城市": { distance: 318, steps: 424000 },
      "松原市": { distance: 228, steps: 304000 },
      "哈尔滨市": { distance: 212, steps: 282660 },
    }
  },
  "伊春市": {
    province: 'HLJ',
    location: { lat: 47.7275, lon: 128.8411 },
    icon: 'yichunshi.png',
    neighbors: {
      "黑河市": { distance: 415, steps: 553330 },
      "绥化市": { distance: 259, steps: 345330 },
      "哈尔滨市": { distance: 387, steps: 516000 },
      "佳木斯市": { distance: 213, steps: 284000 },
      "鹤岗市": { distance: 4226, steps: 5634660 },
    }
  },
  "佳木斯市": {
    province: 'HLJ',
    location: { lat: 46.7999, lon: 130.3189 },
    icon: 'jiamusishi.png',
    neighbors: {
      "鹤岗市": { distance: 4212, steps: 5616000 },
      "伊春市": { distance: 213, steps: 284000 },
      "哈尔滨市": { distance: 428, steps: 570660 },
      "七台河市": { distance: 171, steps: 228000 },
      "双鸭山市": { distance: 93, steps: 124000 },
    }
  },
  "七台河市": {
    province: 'HLJ',
    location: { lat: 45.7741, lon: 130.8679 },
    icon: 'qitaiheshi.png',
    neighbors: {
      "双鸭山市": { distance: 140, steps: 186660 },
      "哈尔滨市": { distance: 459, steps: 612000 },
      "牡丹江市": { distance: 233, steps: 310660 },
      "鸡西市": { distance: 76, steps: 101330 },
      "佳木斯市": { distance: 171, steps: 228000 },
    }
  },
  "黑河市": {
    province: 'HLJ',
    location: { lat: 50.2449, lon: 127.5282 },
    icon: 'heiheshi.png',
    neighbors: {
      "大兴安岭地区": { distance: 426, steps: 568000 },
      "呼伦贝尔市": { distance: 798, steps: 1064000 },
      "齐齐哈尔市": { distance: 583, steps: 777330 },
      "绥化市": { distance: 564, steps: 752000 },
      "伊春市": { distance: 415, steps: 553330 },
    }
  },
  "大兴安岭地区": {
    province: 'HLJ',
    location: { lat: 52.3352, lon: 124.7108 },
    icon: 'daxinganlingdiqu.png',
    neighbors: {
      "黑河市": { distance: 426, steps: 568000 },
      "呼伦贝尔市": { distance: 688, steps: 917330 },
    }
  },
  "南京市": {
    province: 'JSU',
    location: { lat: 32.0603, lon: 118.7969 },
    icon: 'nanjingshi.png',
    neighbors: {
      "扬州市": { distance: 97, steps: 129330 },
      "镇江市": { distance: 86, steps: 114660 },
      "常州市": { distance: 161, steps: 214660 },
      "宣城市": { distance: 174, steps: 232000 },
      "马鞍山市": { distance: 72, steps: 96000 },
      "滁州市": { distance: 72, steps: 96000 },
    }
  },
  "苏州市": {
    province: 'JSU',
    location: { lat: 31.2989, lon: 120.5853 },
    icon: 'suzhoushi.png',
    neighbors: {
      "无锡市": { distance: 47, steps: 62660 },
      "泰州市": { distance: 201, steps: 268000 },
      "南通市": { distance: 115, steps: 153330 },
      "上海市": { distance: 119, steps: 158660 },
      "嘉兴市": { distance: 89, steps: 118660 },
      "湖州市": { distance: 92, steps: 122660 },
    }
  },
  "无锡市": {
    province: 'JSU',
    location: { lat: 31.49, lon: 120.3119 },
    icon: 'wuxishi.png',
    neighbors: {
      "常州市": { distance: 68, steps: 90660 },
      "宣城市": { distance: 224, steps: 298660 },
      "湖州市": { distance: 98, steps: 130660 },
      "苏州市": { distance: 47, steps: 62660 },
      "泰州市": { distance: 159, steps: 212000 },
    }
  },
  "常州市": {
    province: 'JSU',
    location: { lat: 31.8105, lon: 119.9741 },
    icon: 'changzhoushi.png',
    neighbors: {
      "镇江市": { distance: 95, steps: 126660 },
      "南京市": { distance: 161, steps: 214660 },
      "宣城市": { distance: 211, steps: 281330 },
      "无锡市": { distance: 68, steps: 90660 },
      "泰州市": { distance: 101, steps: 134660 },
    }
  },
  "镇江市": {
    province: 'JSU',
    location: { lat: 32.1981, lon: 119.4216 },
    icon: 'zhenjiangshi.png',
    neighbors: {
      "扬州市": { distance: 31, steps: 41330 },
      "南京市": { distance: 86, steps: 114660 },
      "常州市": { distance: 95, steps: 126660 },
      "泰州市": { distance: 78, steps: 104000 },
    }
  },
  "徐州市": {
    province: 'JSU',
    location: { lat: 34.2044, lon: 117.2857 },
    icon: 'xuzhoushi.png',
    neighbors: {
      "枣庄市": { distance: 95, steps: 126660 },
      "济宁市": { distance: 209, steps: 278660 },
      "菏泽市": { distance: 282, steps: 376000 },
      "宿州市": { distance: 97, steps: 129330 },
      "宿迁市": { distance: 133, steps: 177330 },
      "连云港市": { distance: 257, steps: 342660 },
      "临沂市": { distance: 196, steps: 261330 },
    }
  },
  "南通市": {
    province: 'JSU',
    location: { lat: 31.9829, lon: 120.8943 },
    icon: 'nantongshi.png',
    neighbors: {
      "盐城市": { distance: 234, steps: 312000 },
      "泰州市": { distance: 148, steps: 197330 },
      "苏州市": { distance: 115, steps: 153330 },
      "上海市": { distance: 141, steps: 188000 },
    }
  },
  "连云港市": {
    province: 'JSU',
    location: { lat: 34.5969, lon: 119.2215 },
    icon: 'lianyungangshi.png',
    neighbors: {
      "日照市": { distance: 134, steps: 178660 },
      "临沂市": { distance: 136, steps: 181330 },
      "徐州市": { distance: 257, steps: 342660 },
      "宿迁市": { distance: 157, steps: 209330 },
      "淮安市": { distance: 157, steps: 209330 },
      "盐城市": { distance: 230, steps: 306660 },
    }
  },
  "淮安市": {
    province: 'JSU',
    location: { lat: 33.6065, lon: 119.0153 },
    icon: 'huaianshi.png',
    neighbors: {
      "连云港市": { distance: 157, steps: 209330 },
      "宿迁市": { distance: 111, steps: 148000 },
      "滁州市": { distance: 222, steps: 296000 },
      "扬州市": { distance: 196, steps: 261330 },
      "盐城市": { distance: 155, steps: 206660 },
    }
  },
  "盐城市": {
    province: 'JSU',
    location: { lat: 33.3477, lon: 120.1615 },
    icon: 'yanchengshi.png',
    neighbors: {
      "连云港市": { distance: 230, steps: 306660 },
      "淮安市": { distance: 155, steps: 206660 },
      "扬州市": { distance: 178, steps: 237330 },
      "泰州市": { distance: 143, steps: 190660 },
      "南通市": { distance: 234, steps: 312000 },
    }
  },
  "扬州市": {
    province: 'JSU',
    location: { lat: 32.3947, lon: 119.4143 },
    icon: 'yangzhoushi.png',
    neighbors: {
      "淮安市": { distance: 196, steps: 261330 },
      "滁州市": { distance: 143, steps: 190660 },
      "南京市": { distance: 97, steps: 129330 },
      "镇江市": { distance: 31, steps: 41330 },
      "泰州市": { distance: 68, steps: 90660 },
      "盐城市": { distance: 178, steps: 237330 },
    }
  },
  "泰州市": {
    province: 'JSU',
    location: { lat: 32.4558, lon: 119.9231 },
    icon: 'taizhoushi.png',
    neighbors: {
      "盐城市": { distance: 143, steps: 190660 },
      "扬州市": { distance: 68, steps: 90660 },
      "镇江市": { distance: 78, steps: 104000 },
      "常州市": { distance: 101, steps: 134660 },
      "无锡市": { distance: 159, steps: 212000 },
      "苏州市": { distance: 201, steps: 268000 },
      "南通市": { distance: 148, steps: 197330 },
    }
  },
  "宿迁市": {
    province: 'JSU',
    location: { lat: 33.9631, lon: 118.2751 },
    icon: 'suqianshi.png',
    neighbors: {
      "徐州市": { distance: 133, steps: 177330 },
      "宿州市": { distance: 177, steps: 236000 },
      "蚌埠市": { distance: 200, steps: 266660 },
      "滁州市": { distance: 259, steps: 345330 },
      "淮安市": { distance: 111, steps: 148000 },
      "连云港市": { distance: 157, steps: 209330 },
    }
  },
  "杭州市": {
    province: 'ZJ',
    location: { lat: 30.2946, lon: 120.1614 },
    icon: 'hangzhoushi.png',
    neighbors: {
      "嘉兴市": { distance: 107, steps: 142660 },
      "湖州市": { distance: 94, steps: 125330 },
      "宣城市": { distance: 214, steps: 285330 },
      "黄山市": { distance: 265, steps: 353330 },
      "衢州市": { distance: 270, steps: 360000 },
      "金华市": { distance: 202, steps: 269330 },
      "绍兴市": { distance: 71, steps: 94660 },
    }
  },
  "宁波市": {
    province: 'ZJ',
    location: { lat: 29.8683, lon: 121.5493 },
    icon: 'ningboshi.png',
    neighbors: {
      "嘉兴市": { distance: 174, steps: 232000 },
      "绍兴市": { distance: 133, steps: 177330 },
      "台州市": { distance: 190, steps: 253330 },
      "舟山市": { distance: 91, steps: 121330 },
    }
  },
  "温州市": {
    province: 'ZJ',
    location: { lat: 28.0006, lon: 120.6721 },
    icon: 'wenzhoushi.png',
    neighbors: {
      "台州市": { distance: 145, steps: 193330 },
      "丽水市": { distance: 126, steps: 168000 },
      "宁德市": { distance: 260, steps: 346660 },
    }
  },
  "嘉兴市": {
    province: 'ZJ',
    location: { lat: 30.7469, lon: 120.7555 },
    icon: 'jiaxingshi.png',
    neighbors: {
      "上海市": { distance: 122, steps: 162660 },
      "湖州市": { distance: 93, steps: 124000 },
      "杭州市": { distance: 107, steps: 142660 },
      "绍兴市": { distance: 114, steps: 152000 },
      "宁波市": { distance: 174, steps: 232000 },
      "苏州市": { distance: 89, steps: 118660 },
    }
  },
  "湖州市": {
    province: 'ZJ',
    location: { lat: 30.8927, lon: 120.0881 },
    icon: 'huzhoushi.png',
    neighbors: {
      "苏州市": { distance: 92, steps: 122660 },
      "无锡市": { distance: 98, steps: 130660 },
      "宣城市": { distance: 178, steps: 237330 },
      "杭州市": { distance: 94, steps: 125330 },
      "嘉兴市": { distance: 93, steps: 124000 },
    }
  },
  "绍兴市": {
    province: 'ZJ',
    location: { lat: 30.0307, lon: 120.5853 },
    icon: 'shaoxingshi.png',
    neighbors: {
      "嘉兴市": { distance: 114, steps: 152000 },
      "杭州市": { distance: 71, steps: 94660 },
      "金华市": { distance: 196, steps: 261330 },
      "台州市": { distance: 243, steps: 324000 },
      "宁波市": { distance: 133, steps: 177330 },
    }
  },
  "金华市": {
    province: 'ZJ',
    location: { lat: 29.0784, lon: 119.6494 },
    icon: 'jinhuashi.png',
    neighbors: {
      "绍兴市": { distance: 196, steps: 261330 },
      "杭州市": { distance: 202, steps: 269330 },
      "衢州市": { distance: 107, steps: 142660 },
      "丽水市": { distance: 103, steps: 137330 },
      "台州市": { distance: 251, steps: 334660 },
    }
  },
  "衢州市": {
    province: 'ZJ',
    location: { lat: 28.9709, lon: 118.8743 },
    icon: 'quzhoushi.png',
    neighbors: {
      "杭州市": { distance: 270, steps: 360000 },
      "黄山市": { distance: 139, steps: 185330 },
      "上饶市": { distance: 151, steps: 201330 },
      "南平市": { distance: 273, steps: 364000 },
      "丽水市": { distance: 164, steps: 218660 },
      "金华市": { distance: 107, steps: 142660 },
    }
  },
  "舟山市": {
    province: 'ZJ',
    location: { lat: 29.9853, lon: 122.2067 },
    icon: 'zhoushanshi.png',
    neighbors: {
      "宁波市": { distance: 91, steps: 121330 },
    }
  },
  "台州市": {
    province: 'ZJ',
    location: { lat: 28.656, lon: 121.4205 },
    icon: 'taizhoushi.png',
    neighbors: {
      "宁波市": { distance: 190, steps: 253330 },
      "绍兴市": { distance: 243, steps: 324000 },
      "金华市": { distance: 251, steps: 334660 },
      "丽水市": { distance: 207, steps: 276000 },
      "温州市": { distance: 145, steps: 193330 },
    }
  },
  "丽水市": {
    province: 'ZJ',
    location: { lat: 28.4672, lon: 119.9229 },
    icon: 'lishuishi.png',
    neighbors: {
      "台州市": { distance: 207, steps: 276000 },
      "金华市": { distance: 103, steps: 137330 },
      "衢州市": { distance: 164, steps: 218660 },
      "南平市": { distance: 299, steps: 398660 },
      "宁德市": { distance: 286, steps: 381330 },
      "温州市": { distance: 126, steps: 168000 },
    }
  },
  "合肥市": {
    province: 'AH',
    location: { lat: 31.8206, lon: 117.2272 },
    icon: 'hefeishi.png',
    neighbors: {
      "马鞍山市": { distance: 171, steps: 228000 },
      "滁州市": { distance: 165, steps: 220000 },
      "淮南市": { distance: 130, steps: 173330 },
      "六安市": { distance: 97, steps: 129330 },
      "安庆市": { distance: 201, steps: 268000 },
      "铜陵市": { distance: 157, steps: 209330 },
      "芜湖市": { distance: 169, steps: 225330 },
    }
  },
  "芜湖市": {
    province: 'AH',
    location: { lat: 31.3339, lon: 118.365 },
    icon: 'wuhushi.png',
    neighbors: {
      "马鞍山市": { distance: 56, steps: 74660 },
      "合肥市": { distance: 169, steps: 225330 },
      "铜陵市": { distance: 96, steps: 128000 },
      "池州市": { distance: 157, steps: 209330 },
      "宣城市": { distance: 81, steps: 108000 },
    }
  },
  "蚌埠市": {
    province: 'AH',
    location: { lat: 32.9162, lon: 117.3889 },
    icon: 'bengbushi.png',
    neighbors: {
      "宿州市": { distance: 127, steps: 169330 },
      "淮北市": { distance: 179, steps: 238660 },
      "亳州市": { distance: 257, steps: 342660 },
      "淮南市": { distance: 69, steps: 92000 },
      "滁州市": { distance: 157, steps: 209330 },
      "宿迁市": { distance: 200, steps: 266660 },
    }
  },
  "淮南市": {
    province: 'AH',
    location: { lat: 32.6267, lon: 116.9998 },
    icon: 'huainanshi.png',
    neighbors: {
      "蚌埠市": { distance: 69, steps: 92000 },
      "亳州市": { distance: 251, steps: 334660 },
      "阜阳市": { distance: 161, steps: 214660 },
      "六安市": { distance: 154, steps: 205330 },
      "合肥市": { distance: 130, steps: 173330 },
      "滁州市": { distance: 183, steps: 244000 },
    }
  },
  "马鞍山市": {
    province: 'AH',
    location: { lat: 31.6704, lon: 118.5065 },
    icon: 'maanshanshi.png',
    neighbors: {
      "南京市": { distance: 72, steps: 96000 },
      "滁州市": { distance: 101, steps: 134660 },
      "合肥市": { distance: 171, steps: 228000 },
      "芜湖市": { distance: 56, steps: 74660 },
      "宣城市": { distance: 118, steps: 157330 },
    }
  },
  "淮北市": {
    province: 'AH',
    location: { lat: 33.9544, lon: 116.7985 },
    icon: 'huaibeishi.png',
    neighbors: {
      "宿州市": { distance: 53, steps: 70660 },
      "商丘市": { distance: 165, steps: 220000 },
      "亳州市": { distance: 133, steps: 177330 },
      "蚌埠市": { distance: 179, steps: 238660 },
    }
  },
  "铜陵市": {
    province: 'AH',
    location: { lat: 30.9456, lon: 117.8121 },
    icon: 'tonglingshi.png',
    neighbors: {
      "芜湖市": { distance: 96, steps: 128000 },
      "合肥市": { distance: 157, steps: 209330 },
      "安庆市": { distance: 119, steps: 158660 },
      "池州市": { distance: 62, steps: 82660 },
    }
  },
  "安庆市": {
    province: 'AH',
    location: { lat: 30.5433, lon: 117.0633 },
    icon: 'anqingshi.png',
    neighbors: {
      "铜陵市": { distance: 119, steps: 158660 },
      "合肥市": { distance: 201, steps: 268000 },
      "六安市": { distance: 200, steps: 266660 },
      "黄冈市": { distance: 295, steps: 393330 },
      "九江市": { distance: 194, steps: 258660 },
      "池州市": { distance: 61, steps: 81330 },
    }
  },
  "黄山市": {
    province: 'AH',
    location: { lat: 29.7147, lon: 118.3145 },
    icon: 'huangshanshi.png',
    neighbors: {
      "宣城市": { distance: 201, steps: 268000 },
      "池州市": { distance: 185, steps: 246660 },
      "景德镇市": { distance: 169, steps: 225330 },
      "上饶市": { distance: 203, steps: 270660 },
      "衢州市": { distance: 139, steps: 185330 },
      "杭州市": { distance: 265, steps: 353330 },
    }
  },
  "滁州市": {
    province: 'AH',
    location: { lat: 32.3012, lon: 118.3377 },
    icon: 'chuzhoushi.png',
    neighbors: {
      "南京市": { distance: 72, steps: 96000 },
      "扬州市": { distance: 143, steps: 190660 },
      "淮安市": { distance: 222, steps: 296000 },
      "宿迁市": { distance: 259, steps: 345330 },
      "蚌埠市": { distance: 157, steps: 209330 },
      "淮南市": { distance: 183, steps: 244000 },
      "合肥市": { distance: 165, steps: 220000 },
      "马鞍山市": { distance: 101, steps: 134660 },
    }
  },
  "阜阳市": {
    province: 'AH',
    location: { lat: 32.8963, lon: 115.8142 },
    icon: 'fuyangshi.png',
    neighbors: {
      "亳州市": { distance: 152, steps: 202660 },
      "周口市": { distance: 185, steps: 246660 },
      "驻马店市": { distance: 235, steps: 313330 },
      "信阳市": { distance: 255, steps: 340000 },
      "六安市": { distance: 203, steps: 270660 },
      "淮南市": { distance: 161, steps: 214660 },
    }
  },
  "宿州市": {
    province: 'AH',
    location: { lat: 33.6462, lon: 116.9638 },
    icon: 'suzhoushi.png',
    neighbors: {
      "宿迁市": { distance: 177, steps: 236000 },
      "徐州市": { distance: 97, steps: 129330 },
      "菏泽市": { distance: 312, steps: 416000 },
      "商丘市": { distance: 208, steps: 277330 },
      "淮北市": { distance: 53, steps: 70660 },
      "蚌埠市": { distance: 127, steps: 169330 },
    }
  },
  "六安市": {
    province: 'AH',
    location: { lat: 31.7337, lon: 116.5078 },
    icon: 'liuanshi.png',
    neighbors: {
      "合肥市": { distance: 97, steps: 129330 },
      "淮南市": { distance: 154, steps: 205330 },
      "阜阳市": { distance: 203, steps: 270660 },
      "信阳市": { distance: 326, steps: 434660 },
      "黄冈市": { distance: 297, steps: 396000 },
      "安庆市": { distance: 200, steps: 266660 },
    }
  },
  "亳州市": {
    province: 'AH',
    location: { lat: 33.8712, lon: 115.7793 },
    icon: 'bozhoushi.png',
    neighbors: {
      "淮北市": { distance: 133, steps: 177330 },
      "商丘市": { distance: 87, steps: 116000 },
      "周口市": { distance: 146, steps: 194660 },
      "阜阳市": { distance: 152, steps: 202660 },
      "淮南市": { distance: 251, steps: 334660 },
      "蚌埠市": { distance: 257, steps: 342660 },
    }
  },
  "池州市": {
    province: 'AH',
    location: { lat: 30.6645, lon: 117.4913 },
    icon: 'chizhoushi.png',
    neighbors: {
      "宣城市": { distance: 176, steps: 234660 },
      "芜湖市": { distance: 157, steps: 209330 },
      "铜陵市": { distance: 62, steps: 82660 },
      "安庆市": { distance: 61, steps: 81330 },
      "九江市": { distance: 251, steps: 334660 },
      "上饶市": { distance: 350, steps: 466660 },
      "景德镇市": { distance: 220, steps: 293330 },
      "黄山市": { distance: 185, steps: 246660 },
    }
  },
  "宣城市": {
    province: 'AH',
    location: { lat: 30.9454, lon: 118.7589 },
    icon: 'xuanchengshi.png',
    neighbors: {
      "南京市": { distance: 174, steps: 232000 },
      "马鞍山市": { distance: 118, steps: 157330 },
      "芜湖市": { distance: 81, steps: 108000 },
      "池州市": { distance: 176, steps: 234660 },
      "黄山市": { distance: 201, steps: 268000 },
      "杭州市": { distance: 214, steps: 285330 },
      "湖州市": { distance: 178, steps: 237330 },
      "无锡市": { distance: 224, steps: 298660 },
      "常州市": { distance: 211, steps: 281330 },
    }
  },
  "福州市": {
    province: 'FJ',
    location: { lat: 26.0745, lon: 119.2965 },
    icon: 'fuzhoushi.png',
    neighbors: {
      "台北市": { distance: 358, steps: 477330 },
      "宁德市": { distance: 98, steps: 130660 },
      "南平市": { distance: 251, steps: 334660 },
      "三明市": { distance: 234, steps: 312000 },
      "泉州市": { distance: 207, steps: 276000 },
      "莆田市": { distance: 105, steps: 140000 },
    }
  },
  "厦门市": {
    province: 'FJ',
    location: { lat: 24.4798, lon: 118.0894 },
    icon: 'shamenshi.png',
    neighbors: {
      "泉州市": { distance: 104, steps: 138660 },
      "漳州市": { distance: 63, steps: 84000 },
      "高雄市": { distance: 428, steps: 570660 },
    }
  },
  "莆田市": {
    province: 'FJ',
    location: { lat: 25.4541, lon: 119.0078 },
    icon: 'putianshi.png',
    neighbors: {
      "福州市": { distance: 105, steps: 140000 },
      "泉州市": { distance: 102, steps: 136000 },
    }
  },
  "三明市": {
    province: 'FJ',
    location: { lat: 26.2654, lon: 117.639 },
    icon: 'sanmingshi.png',
    neighbors: {
      "福州市": { distance: 234, steps: 312000 },
      "南平市": { distance: 182, steps: 242660 },
      "抚州市": { distance: 317, steps: 422660 },
      "赣州市": { distance: 384, steps: 512000 },
      "龙岩市": { distance: 203, steps: 270660 },
      "泉州市": { distance: 261, steps: 348000 },
    }
  },
  "泉州市": {
    province: 'FJ',
    location: { lat: 24.8741, lon: 118.6753 },
    icon: 'quanzhoushi.png',
    neighbors: {
      "莆田市": { distance: 102, steps: 136000 },
      "福州市": { distance: 207, steps: 276000 },
      "三明市": { distance: 261, steps: 348000 },
      "龙岩市": { distance: 237, steps: 316000 },
      "漳州市": { distance: 156, steps: 208000 },
      "厦门市": { distance: 104, steps: 138660 },
      "台中市": { distance: 305, steps: 406660 },
    }
  },
  "漳州市": {
    province: 'FJ',
    location: { lat: 24.5133, lon: 117.6471 },
    icon: 'zhangzhoushi.png',
    neighbors: {
      "厦门市": { distance: 63, steps: 84000 },
      "泉州市": { distance: 156, steps: 208000 },
      "梅州市": { distance: 219, steps: 292000 },
      "潮州市": { distance: 197, steps: 262660 },
      "龙岩市": { distance: 127, steps: 169330 },
    }
  },
  "南平市": {
    province: 'FJ',
    location: { lat: 27.3317, lon: 118.1716 },
    icon: 'nanpingshi.png',
    neighbors: {
      "宁德市": { distance: 218, steps: 290660 },
      "丽水市": { distance: 299, steps: 398660 },
      "衢州市": { distance: 273, steps: 364000 },
      "上饶市": { distance: 178, steps: 237330 },
      "鹰潭市": { distance: 210, steps: 280000 },
      "抚州市": { distance: 268, steps: 357330 },
      "三明市": { distance: 182, steps: 242660 },
      "福州市": { distance: 251, steps: 334660 },
    }
  },
  "龙岩市": {
    province: 'FJ',
    location: { lat: 25.0916, lon: 117.0173 },
    icon: 'longyanshi.png',
    neighbors: {
      "漳州市": { distance: 127, steps: 169330 },
      "泉州市": { distance: 237, steps: 316000 },
      "三明市": { distance: 203, steps: 270660 },
      "赣州市": { distance: 316, steps: 421330 },
      "梅州市": { distance: 178, steps: 237330 },
    }
  },
  "宁德市": {
    province: 'FJ',
    location: { lat: 26.6617, lon: 119.5485 },
    icon: 'ningdeshi.png',
    neighbors: {
      "温州市": { distance: 260, steps: 346660 },
      "丽水市": { distance: 286, steps: 381330 },
      "南平市": { distance: 218, steps: 290660 },
      "福州市": { distance: 98, steps: 130660 },
    }
  },
  "南昌市": {
    province: 'JXI',
    location: { lat: 28.6829, lon: 115.8579 },
    icon: 'nanchangshi.png',
    neighbors: {
      "上饶市": { distance: 288, steps: 384000 },
      "九江市": { distance: 161, steps: 214660 },
      "宜春市": { distance: 240, steps: 320000 },
      "抚州市": { distance: 134, steps: 178660 },
    }
  },
  "景德镇市": {
    province: 'JXI',
    location: { lat: 29.2786, lon: 117.1785 },
    icon: 'jingdezhenshi.png',
    neighbors: {
      "黄山市": { distance: 169, steps: 225330 },
      "池州市": { distance: 220, steps: 293330 },
      "上饶市": { distance: 166, steps: 221330 },
    }
  },
  "九江市": {
    province: 'JXI',
    location: { lat: 29.7051, lon: 116.0012 },
    icon: 'jiujiangshi.png',
    neighbors: {
      "上饶市": { distance: 329, steps: 438660 },
      "池州市": { distance: 251, steps: 334660 },
      "安庆市": { distance: 194, steps: 258660 },
      "黄冈市": { distance: 191, steps: 254660 },
      "黄石市": { distance: 153, steps: 204000 },
      "咸宁市": { distance: 228, steps: 304000 },
      "岳阳市": { distance: 393, steps: 524000 },
      "宜春市": { distance: 366, steps: 488000 },
      "南昌市": { distance: 161, steps: 214660 },
    }
  },
  "萍乡市": {
    province: 'JXI',
    location: { lat: 27.6225, lon: 113.852 },
    icon: 'pingxiangshi.png',
    neighbors: {
      "宜春市": { distance: 84, steps: 112000 },
      "长沙市": { distance: 158, steps: 210660 },
      "株洲市": { distance: 104, steps: 138660 },
      "吉安市": { distance: 177, steps: 236000 },
    }
  },
  "新余市": {
    province: 'JXI',
    location: { lat: 27.8174, lon: 114.9166 },
    icon: 'xinyushi.png',
    neighbors: {
      "宜春市": { distance: 69, steps: 92000 },
      "吉安市": { distance: 111, steps: 148000 },
    }
  },
  "鹰潭市": {
    province: 'JXI',
    location: { lat: 28.2602, lon: 117.0688 },
    icon: 'yingtanshi.png',
    neighbors: {
      "上饶市": { distance: 124, steps: 165330 },
      "抚州市": { distance: 110, steps: 146660 },
      "南平市": { distance: 210, steps: 280000 },
    }
  },
  "赣州市": {
    province: 'JXI',
    location: { lat: 25.8452, lon: 114.9349 },
    icon: 'ganzhoushi.png',
    neighbors: {
      "抚州市": { distance: 383, steps: 510660 },
      "吉安市": { distance: 198, steps: 264000 },
      "郴州市": { distance: 270, steps: 360000 },
      "韶关市": { distance: 248, steps: 330660 },
      "河源市": { distance: 329, steps: 438660 },
      "梅州市": { distance: 295, steps: 393330 },
      "龙岩市": { distance: 316, steps: 421330 },
      "三明市": { distance: 384, steps: 512000 },
    }
  },
  "吉安市": {
    province: 'JXI',
    location: { lat: 27.1138, lon: 114.9927 },
    icon: 'jianshi.png',
    neighbors: {
      "抚州市": { distance: 229, steps: 305330 },
      "宜春市": { distance: 135, steps: 180000 },
      "新余市": { distance: 111, steps: 148000 },
      "萍乡市": { distance: 177, steps: 236000 },
      "株洲市": { distance: 280, steps: 373330 },
      "郴州市": { distance: 346, steps: 461330 },
      "赣州市": { distance: 198, steps: 264000 },
    }
  },
  "宜春市": {
    province: 'JXI',
    location: { lat: 27.8111, lon: 114.4163 },
    icon: 'yichunshi.png',
    neighbors: {
      "南昌市": { distance: 240, steps: 320000 },
      "九江市": { distance: 366, steps: 488000 },
      "岳阳市": { distance: 299, steps: 398660 },
      "长沙市": { distance: 214, steps: 285330 },
      "萍乡市": { distance: 84, steps: 112000 },
      "新余市": { distance: 69, steps: 92000 },
      "吉安市": { distance: 135, steps: 180000 },
      "抚州市": { distance: 269, steps: 358660 },
    }
  },
  "抚州市": {
    province: 'JXI',
    location: { lat: 27.9458, lon: 116.3584 },
    icon: 'fuzhoushi.png',
    neighbors: {
      "南平市": { distance: 268, steps: 357330 },
      "鹰潭市": { distance: 110, steps: 146660 },
      "上饶市": { distance: 232, steps: 309330 },
      "南昌市": { distance: 134, steps: 178660 },
      "宜春市": { distance: 269, steps: 358660 },
      "吉安市": { distance: 229, steps: 305330 },
      "赣州市": { distance: 383, steps: 510660 },
      "三明市": { distance: 317, steps: 422660 },
    }
  },
  "上饶市": {
    province: 'JXI',
    location: { lat: 28.4549, lon: 117.9434 },
    icon: 'shangraoshi.png',
    neighbors: {
      "衢州市": { distance: 151, steps: 201330 },
      "黄山市": { distance: 203, steps: 270660 },
      "景德镇市": { distance: 166, steps: 221330 },
      "池州市": { distance: 350, steps: 466660 },
      "九江市": { distance: 329, steps: 438660 },
      "南昌市": { distance: 288, steps: 384000 },
      "抚州市": { distance: 232, steps: 309330 },
      "鹰潭市": { distance: 124, steps: 165330 },
      "南平市": { distance: 178, steps: 237330 },
    }
  },
  "济南市": {
    province: 'SD',
    location: { lat: 36.6512, lon: 117.1201 },
    icon: 'jinanshi.png',
    neighbors: {
      "淄博市": { distance: 120, steps: 160000 },
      "滨州市": { distance: 156, steps: 208000 },
      "德州市": { distance: 155, steps: 206660 },
      "聊城市": { distance: 146, steps: 194660 },
      "泰安市": { distance: 72, steps: 96000 },
    }
  },
  "青岛市": {
    province: 'SD',
    location: { lat: 36.0671, lon: 120.3826 },
    icon: 'qingdaoshi.png',
    neighbors: {
      "烟台市": { distance: 255, steps: 340000 },
      "潍坊市": { distance: 183, steps: 244000 },
      "日照市": { distance: 149, steps: 198660 },
    }
  },
  "淄博市": {
    province: 'SD',
    location: { lat: 36.8131, lon: 118.0549 },
    icon: 'ziboshi.png',
    neighbors: {
      "潍坊市": { distance: 140, steps: 186660 },
      "东营市": { distance: 124, steps: 165330 },
      "滨州市": { distance: 90, steps: 120000 },
      "济南市": { distance: 120, steps: 160000 },
      "泰安市": { distance: 155, steps: 206660 },
      "临沂市": { distance: 269, steps: 358660 },
    }
  },
  "枣庄市": {
    province: 'SD',
    location: { lat: 34.8107, lon: 117.3235 },
    icon: 'zaozhuangshi.png',
    neighbors: {
      "临沂市": { distance: 140, steps: 186660 },
      "济宁市": { distance: 133, steps: 177330 },
      "徐州市": { distance: 95, steps: 126660 },
    }
  },
  "东营市": {
    province: 'SD',
    location: { lat: 37.434, lon: 118.6747 },
    icon: 'dongyingshi.png',
    neighbors: {
      "滨州市": { distance: 88, steps: 117330 },
      "淄博市": { distance: 124, steps: 165330 },
      "潍坊市": { distance: 129, steps: 172000 },
    }
  },
  "烟台市": {
    province: 'SD',
    location: { lat: 37.4638, lon: 121.4479 },
    icon: 'yantaishi.png',
    neighbors: {
      "威海市": { distance: 84, steps: 112000 },
      "潍坊市": { distance: 308, steps: 410660 },
      "青岛市": { distance: 255, steps: 340000 },
      "大连市": { distance: 227, steps: 302660 },
    }
  },
  "潍坊市": {
    province: 'SD',
    location: { lat: 36.7067, lon: 119.1619 },
    icon: 'weifangshi.png',
    neighbors: {
      "青岛市": { distance: 183, steps: 244000 },
      "烟台市": { distance: 308, steps: 410660 },
      "东营市": { distance: 129, steps: 172000 },
      "淄博市": { distance: 140, steps: 186660 },
      "临沂市": { distance: 270, steps: 360000 },
      "日照市": { distance: 207, steps: 276000 },
    }
  },
  "济宁市": {
    province: 'SD',
    location: { lat: 35.4154, lon: 116.5874 },
    icon: 'jiningshi.png',
    neighbors: {
      "枣庄市": { distance: 133, steps: 177330 },
      "临沂市": { distance: 231, steps: 308000 },
      "泰安市": { distance: 137, steps: 182660 },
      "濮阳市": { distance: 205, steps: 273330 },
      "菏泽市": { distance: 144, steps: 192000 },
      "徐州市": { distance: 209, steps: 278660 },
    }
  },
  "泰安市": {
    province: 'SD',
    location: { lat: 36.1951, lon: 117.0884 },
    icon: 'taianshi.png',
    neighbors: {
      "临沂市": { distance: 234, steps: 312000 },
      "淄博市": { distance: 155, steps: 206660 },
      "济南市": { distance: 72, steps: 96000 },
      "聊城市": { distance: 145, steps: 193330 },
      "濮阳市": { distance: 269, steps: 358660 },
      "济宁市": { distance: 137, steps: 182660 },
    }
  },
  "威海市": {
    province: 'SD',
    location: { lat: 37.5128, lon: 122.1201 },
    icon: 'weihaishi.png',
    neighbors: {
      "烟台市": { distance: 84, steps: 112000 },
    }
  },
  "日照市": {
    province: 'SD',
    location: { lat: 35.4164, lon: 119.527 },
    icon: 'rizhaoshi.png',
    neighbors: {
      "青岛市": { distance: 149, steps: 198660 },
      "潍坊市": { distance: 207, steps: 276000 },
      "临沂市": { distance: 157, steps: 209330 },
      "连云港市": { distance: 134, steps: 178660 },
    }
  },
  "临沂市": {
    province: 'SD',
    location: { lat: 35.1042, lon: 118.3563 },
    icon: 'linyishi.png',
    neighbors: {
      "日照市": { distance: 157, steps: 209330 },
      "潍坊市": { distance: 270, steps: 360000 },
      "淄博市": { distance: 269, steps: 358660 },
      "泰安市": { distance: 234, steps: 312000 },
      "济宁市": { distance: 231, steps: 308000 },
      "枣庄市": { distance: 140, steps: 186660 },
      "徐州市": { distance: 196, steps: 261330 },
      "连云港市": { distance: 136, steps: 181330 },
    }
  },
  "德州市": {
    province: 'SD',
    location: { lat: 37.4355, lon: 116.3575 },
    icon: 'dezhoushi.png',
    neighbors: {
      "济南市": { distance: 155, steps: 206660 },
      "滨州市": { distance: 200, steps: 266660 },
      "沧州市": { distance: 148, steps: 197330 },
      "衡水市": { distance: 97, steps: 129330 },
      "邢台市": { distance: 237, steps: 316000 },
      "聊城市": { distance: 160, steps: 213330 },
    }
  },
  "聊城市": {
    province: 'SD',
    location: { lat: 36.4574, lon: 115.9854 },
    icon: 'liaochengshi.png',
    neighbors: {
      "济南市": { distance: 146, steps: 194660 },
      "德州市": { distance: 160, steps: 213330 },
      "邢台市": { distance: 208, steps: 277330 },
      "邯郸市": { distance: 183, steps: 244000 },
      "濮阳市": { distance: 162, steps: 216000 },
      "泰安市": { distance: 145, steps: 193330 },
    }
  },
  "滨州市": {
    province: 'SD',
    location: { lat: 37.3835, lon: 117.9721 },
    icon: 'binzhoushi.png',
    neighbors: {
      "东营市": { distance: 88, steps: 117330 },
      "沧州市": { distance: 200, steps: 266660 },
      "德州市": { distance: 200, steps: 266660 },
      "济南市": { distance: 156, steps: 208000 },
      "淄博市": { distance: 90, steps: 120000 },
    }
  },
  "菏泽市": {
    province: 'SD',
    location: { lat: 35.2333, lon: 115.4809 },
    icon: 'hezeshi.png',
    neighbors: {
      "济宁市": { distance: 144, steps: 192000 },
      "濮阳市": { distance: 101, steps: 134660 },
      "新乡市": { distance: 198, steps: 264000 },
      "开封市": { distance: 165, steps: 220000 },
      "商丘市": { distance: 130, steps: 173330 },
      "宿州市": { distance: 312, steps: 416000 },
      "徐州市": { distance: 282, steps: 376000 },
    }
  },
  "郑州市": {
    province: 'HEN',
    location: { lat: 34.7472, lon: 113.6249 },
    icon: 'zhengzhoushi.png',
    neighbors: {
      "新乡市": { distance: 95, steps: 126660 },
      "焦作市": { distance: 88, steps: 117330 },
      "洛阳市": { distance: 152, steps: 202660 },
      "平顶山市": { distance: 168, steps: 224000 },
      "许昌市": { distance: 115, steps: 153330 },
      "开封市": { distance: 88, steps: 117330 },
    }
  },
  "开封市": {
    province: 'HEN',
    location: { lat: 34.7971, lon: 114.3074 },
    icon: 'kaifengshi.png',
    neighbors: {
      "商丘市": { distance: 183, steps: 244000 },
      "菏泽市": { distance: 165, steps: 220000 },
      "新乡市": { distance: 93, steps: 124000 },
      "郑州市": { distance: 88, steps: 117330 },
      "许昌市": { distance: 133, steps: 177330 },
      "周口市": { distance: 190, steps: 253330 },
    }
  },
  "洛阳市": {
    province: 'HEN',
    location: { lat: 34.6197, lon: 112.4539 },
    icon: 'luoyangshi.png',
    neighbors: {
      "郑州市": { distance: 152, steps: 202660 },
      "焦作市": { distance: 137, steps: 182660 },
      "济源市": { distance: 73, steps: 97330 },
      "运城市": { distance: 196, steps: 261330 },
      "三门峡市": { distance: 164, steps: 218660 },
      "南阳市": { distance: 254, steps: 338660 },
      "平顶山市": { distance: 168, steps: 224000 },
    }
  },
  "平顶山市": {
    province: 'HEN',
    location: { lat: 33.735, lon: 113.1922 },
    icon: 'pingdingshanshi.png',
    neighbors: {
      "驻马店市": { distance: 157, steps: 209330 },
      "漯河市": { distance: 110, steps: 146660 },
      "许昌市": { distance: 98, steps: 130660 },
      "郑州市": { distance: 168, steps: 224000 },
      "洛阳市": { distance: 168, steps: 224000 },
      "南阳市": { distance: 145, steps: 193330 },
    }
  },
  "安阳市": {
    province: 'HEN',
    location: { lat: 36.0997, lon: 114.3931 },
    icon: 'anyangshi.png',
    neighbors: {
      "濮阳市": { distance: 96, steps: 128000 },
      "邯郸市": { distance: 84, steps: 112000 },
      "长治市": { distance: 162, steps: 216000 },
      "新乡市": { distance: 138, steps: 184000 },
      "鹤壁市": { distance: 57, steps: 76000 },
    }
  },
  "鹤壁市": {
    province: 'HEN',
    location: { lat: 35.748, lon: 114.2975 },
    icon: 'hebishi.png',
    neighbors: {
      "安阳市": { distance: 57, steps: 76000 },
      "新乡市": { distance: 84, steps: 112000 },
    }
  },
  "新乡市": {
    province: 'HEN',
    location: { lat: 35.3027, lon: 113.9268 },
    icon: 'xinxiangshi.png',
    neighbors: {
      "鹤壁市": { distance: 84, steps: 112000 },
      "安阳市": { distance: 138, steps: 184000 },
      "长治市": { distance: 173, steps: 230660 },
      "晋城市": { distance: 140, steps: 186660 },
      "焦作市": { distance: 89, steps: 118660 },
      "郑州市": { distance: 95, steps: 126660 },
      "开封市": { distance: 93, steps: 124000 },
      "菏泽市": { distance: 198, steps: 264000 },
      "濮阳市": { distance: 157, steps: 209330 },
    }
  },
  "焦作市": {
    province: 'HEN',
    location: { lat: 35.2159, lon: 113.2418 },
    icon: 'jiaozuoshi.png',
    neighbors: {
      "新乡市": { distance: 89, steps: 118660 },
      "晋城市": { distance: 66, steps: 88000 },
      "济源市": { distance: 85, steps: 113330 },
      "洛阳市": { distance: 137, steps: 182660 },
      "郑州市": { distance: 88, steps: 117330 },
    }
  },
  "濮阳市": {
    province: 'HEN',
    location: { lat: 35.7606, lon: 115.0288 },
    icon: 'puyangshi.png',
    neighbors: {
      "菏泽市": { distance: 101, steps: 134660 },
      "济宁市": { distance: 205, steps: 273330 },
      "泰安市": { distance: 269, steps: 358660 },
      "聊城市": { distance: 162, steps: 216000 },
      "邯郸市": { distance: 148, steps: 197330 },
      "安阳市": { distance: 96, steps: 128000 },
      "新乡市": { distance: 157, steps: 209330 },
    }
  },
  "许昌市": {
    province: 'HEN',
    location: { lat: 34.0357, lon: 113.8519 },
    icon: 'xuchangshi.png',
    neighbors: {
      "开封市": { distance: 133, steps: 177330 },
      "郑州市": { distance: 115, steps: 153330 },
      "平顶山市": { distance: 98, steps: 130660 },
      "漯河市": { distance: 74, steps: 98660 },
      "周口市": { distance: 127, steps: 169330 },
    }
  },
  "漯河市": {
    province: 'HEN',
    location: { lat: 33.5815, lon: 114.0168 },
    icon: 'luoheshi.png',
    neighbors: {
      "许昌市": { distance: 74, steps: 98660 },
      "平顶山市": { distance: 110, steps: 146660 },
      "驻马店市": { distance: 89, steps: 118660 },
      "周口市": { distance: 89, steps: 118660 },
    }
  },
  "三门峡市": {
    province: 'HEN',
    location: { lat: 34.7733, lon: 111.1941 },
    icon: 'sanmenxiashi.png',
    neighbors: {
      "洛阳市": { distance: 164, steps: 218660 },
      "运城市": { distance: 46, steps: 61330 },
      "渭南市": { distance: 220, steps: 293330 },
      "商洛市": { distance: 214, steps: 285330 },
      "南阳市": { distance: 327, steps: 436000 },
    }
  },
  "南阳市": {
    province: 'HEN',
    location: { lat: 32.9908, lon: 112.5285 },
    icon: 'nanyangshi.png',
    neighbors: {
      "平顶山市": { distance: 145, steps: 193330 },
      "洛阳市": { distance: 254, steps: 338660 },
      "三门峡市": { distance: 327, steps: 436000 },
      "商洛市": { distance: 363, steps: 484000 },
      "十堰市": { distance: 234, steps: 312000 },
      "襄阳市": { distance: 162, steps: 216000 },
      "随州市": { distance: 231, steps: 308000 },
      "信阳市": { distance: 244, steps: 325330 },
      "驻马店市": { distance: 196, steps: 261330 },
    }
  },
  "商丘市": {
    province: 'HEN',
    location: { lat: 34.4149, lon: 115.6505 },
    icon: 'shangqiushi.png',
    neighbors: {
      "淮北市": { distance: 165, steps: 220000 },
      "宿州市": { distance: 208, steps: 277330 },
      "菏泽市": { distance: 130, steps: 173330 },
      "开封市": { distance: 183, steps: 244000 },
      "周口市": { distance: 174, steps: 232000 },
      "亳州市": { distance: 87, steps: 116000 },
    }
  },
  "信阳市": {
    province: 'HEN',
    location: { lat: 32.1467, lon: 114.0926 },
    icon: 'xinyangshi.png',
    neighbors: {
      "六安市": { distance: 326, steps: 434660 },
      "阜阳市": { distance: 255, steps: 340000 },
      "驻马店市": { distance: 135, steps: 180000 },
      "南阳市": { distance: 244, steps: 325330 },
      "随州市": { distance: 119, steps: 158660 },
      "孝感市": { distance: 192, steps: 256000 },
      "黄冈市": { distance: 285, steps: 380000 },
    }
  },
  "周口市": {
    province: 'HEN',
    location: { lat: 33.6255, lon: 114.6965 },
    icon: 'zhoukoushi.png',
    neighbors: {
      "亳州市": { distance: 146, steps: 194660 },
      "商丘市": { distance: 174, steps: 232000 },
      "开封市": { distance: 190, steps: 253330 },
      "许昌市": { distance: 127, steps: 169330 },
      "漯河市": { distance: 89, steps: 118660 },
      "驻马店市": { distance: 130, steps: 173330 },
      "阜阳市": { distance: 185, steps: 246660 },
    }
  },
  "驻马店市": {
    province: 'HEN',
    location: { lat: 33.0114, lon: 114.0226 },
    icon: 'zhumadianshi.png',
    neighbors: {
      "周口市": { distance: 130, steps: 173330 },
      "漯河市": { distance: 89, steps: 118660 },
      "平顶山市": { distance: 157, steps: 209330 },
      "南阳市": { distance: 196, steps: 261330 },
      "信阳市": { distance: 135, steps: 180000 },
      "阜阳市": { distance: 235, steps: 313330 },
    }
  },
  "济源市": {
    province: 'HEN',
    location: { lat: 35.0672, lon: 112.6019 },
    icon: 'jiyuanshi.png',
    neighbors: {
      "焦作市": { distance: 85, steps: 113330 },
      "晋城市": { distance: 74, steps: 98660 },
      "运城市": { distance: 204, steps: 272000 },
      "洛阳市": { distance: 73, steps: 97330 },
    }
  },
  "武汉市": {
    province: 'HUB',
    location: { lat: 30.5928, lon: 114.3055 },
    icon: 'wuhanshi.png',
    neighbors: {
      "黄冈市": { distance: 80, steps: 106660 },
      "孝感市": { distance: 74, steps: 98660 },
      "仙桃市": { distance: 252, steps: 336000 },
      "荆州市": { distance: 280, steps: 373330 },
      "咸宁市": { distance: 117, steps: 156000 },
      "黄石市": { distance: 115, steps: 153330 },
      "鄂州市": { distance: 86, steps: 114660 },
    }
  },
  "黄石市": {
    province: 'HUB',
    location: { lat: 30.2147, lon: 115.0381 },
    icon: 'huangshishi.png',
    neighbors: {
      "黄冈市": { distance: 43, steps: 57330 },
      "鄂州市": { distance: 34, steps: 45330 },
      "武汉市": { distance: 115, steps: 153330 },
      "咸宁市": { distance: 113, steps: 150660 },
      "九江市": { distance: 153, steps: 204000 },
    }
  },
  "十堰市": {
    province: 'HUB',
    location: { lat: 32.6292, lon: 110.7987 },
    icon: 'shiyanshi.png',
    neighbors: {
      "南阳市": { distance: 234, steps: 312000 },
      "商洛市": { distance: 224, steps: 298660 },
      "安康市": { distance: 233, steps: 310660 },
      "重庆市": { distance: 741, steps: 988000 },
      "神农架林区": { distance: 283, steps: 377330 },
      "襄阳市": { distance: 200, steps: 266660 },
    }
  },
  "宜昌市": {
    province: 'HUB',
    location: { lat: 30.7, lon: 111.2803 },
    icon: 'yichangshi.png',
    neighbors: {
      "荆门市": { distance: 134, steps: 178660 },
      "襄阳市": { distance: 233, steps: 310660 },
      "神农架林区": { distance: 241, steps: 321330 },
      "恩施土家族苗族自治州": { distance: 250, steps: 333330 },
      "常德市": { distance: 266, steps: 354660 },
      "荆州市": { distance: 141, steps: 188000 },
    }
  },
  "襄阳市": {
    province: 'HUB',
    location: { lat: 32.009, lon: 112.122 },
    icon: 'xiangyangshi.png',
    neighbors: {
      "随州市": { distance: 173, steps: 230660 },
      "南阳市": { distance: 162, steps: 216000 },
      "十堰市": { distance: 200, steps: 266660 },
      "神农架林区": { distance: 366, steps: 488000 },
      "宜昌市": { distance: 233, steps: 310660 },
      "荆门市": { distance: 152, steps: 202660 },
    }
  },
  "鄂州市": {
    province: 'HUB',
    location: { lat: 30.3875, lon: 114.8948 },
    icon: 'ezhoushi.png',
    neighbors: {
      "黄冈市": { distance: 10, steps: 13330 },
      "黄石市": { distance: 34, steps: 45330 },
      "武汉市": { distance: 86, steps: 114660 },
    }
  },
  "荆门市": {
    province: 'HUB',
    location: { lat: 31.0354, lon: 112.199 },
    icon: 'jingmenshi.png',
    neighbors: {
      "随州市": { distance: 187, steps: 249330 },
      "襄阳市": { distance: 152, steps: 202660 },
      "宜昌市": { distance: 134, steps: 178660 },
      "荆门市": { distance: 0, steps: 0 },
      "潜江市": { distance: 156, steps: 208000 },
      "天门市": { distance: 143, steps: 190660 },
      "孝感市": { distance: 230, steps: 306660 },
    }
  },
  "孝感市": {
    province: 'HUB',
    location: { lat: 30.9242, lon: 113.9167 },
    icon: 'xiaoganshi.png',
    neighbors: {
      "武汉市": { distance: 74, steps: 98660 },
      "黄冈市": { distance: 148, steps: 197330 },
      "信阳市": { distance: 192, steps: 256000 },
      "随州市": { distance: 140, steps: 186660 },
      "荆门市": { distance: 230, steps: 306660 },
      "天门市": { distance: 109, steps: 145330 },
      "仙桃市": { distance: 230, steps: 306660 },
    }
  },
  "荆州市": {
    province: 'HUB',
    location: { lat: 30.334, lon: 112.2417 },
    icon: 'jingzhoushi.png',
    neighbors: {
      "荆门市": { distance: 110, steps: 146660 },
      "宜昌市": { distance: 141, steps: 188000 },
      "常德市": { distance: 216, steps: 288000 },
      "益阳市": { distance: 278, steps: 370660 },
      "岳阳市": { distance: 194, steps: 258660 },
      "咸宁市": { distance: 291, steps: 388000 },
      "仙桃市": { distance: 62, steps: 82660 },
      "武汉市": { distance: 280, steps: 373330 },
      "潜江市": { distance: 47, steps: 62660 },
    }
  },
  "黄冈市": {
    province: 'HUB',
    location: { lat: 30.4461, lon: 114.8721 },
    icon: 'huanggangshi.png',
    neighbors: {
      "安庆市": { distance: 295, steps: 393330 },
      "六安市": { distance: 297, steps: 396000 },
      "信阳市": { distance: 285, steps: 380000 },
      "孝感市": { distance: 148, steps: 197330 },
      "武汉市": { distance: 80, steps: 106660 },
      "鄂州市": { distance: 10, steps: 13330 },
      "黄石市": { distance: 43, steps: 57330 },
      "九江市": { distance: 191, steps: 254660 },
    }
  },
  "咸宁市": {
    province: 'HUB',
    location: { lat: 29.8416, lon: 114.322 },
    icon: 'xianningshi.png',
    neighbors: {
      "黄石市": { distance: 113, steps: 150660 },
      "武汉市": { distance: 117, steps: 156000 },
      "荆州市": { distance: 291, steps: 388000 },
      "岳阳市": { distance: 179, steps: 238660 },
      "九江市": { distance: 228, steps: 304000 },
    }
  },
  "随州市": {
    province: 'HUB',
    location: { lat: 31.6902, lon: 113.3737 },
    icon: 'suizhoushi.png',
    neighbors: {
      "信阳市": { distance: 119, steps: 158660 },
      "南阳市": { distance: 231, steps: 308000 },
      "襄阳市": { distance: 173, steps: 230660 },
      "荆门市": { distance: 187, steps: 249330 },
      "孝感市": { distance: 140, steps: 186660 },
    }
  },
  "恩施土家族苗族自治州": {
    province: 'HUB',
    location: { lat: 30.272, lon: 109.4881 },
    icon: 'enshitujiazumiaozuzizhizhou.png',
    neighbors: {
      "宜昌市": { distance: 250, steps: 333330 },
      "神农架林区": { distance: 138, steps: 184000 },
      "重庆市": { distance: 412, steps: 549330 },
      "湘西土家族苗族自治州": { distance: 308, steps: 410660 },
      "张家界市": { distance: 225, steps: 300000 },
      "常德市": { distance: 356, steps: 474660 },
    }
  },
  "神农架林区": {
    province: 'HUB',
    location: { lat: 31.15, lon: 109.56 },
    icon: 'shennongjialinqu.png',
    neighbors: {
      "襄阳市": { distance: 366, steps: 488000 },
      "十堰市": { distance: 283, steps: 377330 },
      "重庆市": { distance: 474, steps: 632000 },
      "恩施土家族苗族自治州": { distance: 138, steps: 184000 },
      "宜昌市": { distance: 241, steps: 321330 },
    }
  },
  "潜江市": {
    province: 'HUB',
    location: { lat: 30.04, lon: 112.29 },
    icon: 'qianjiangshi.png',
    neighbors: {
      "天门市": { distance: 152, steps: 202660 },
      "荆门市": { distance: 156, steps: 208000 },
      "荆州市": { distance: 47, steps: 62660 },
      "仙桃市": { distance: 36, steps: 48000 },
    }
  },
  "天门市": {
    province: 'HUB',
    location: { lat: 30.653, lon: 113.1658 },
    icon: 'tianmenshi.png',
    neighbors: {
      "荆州市": { distance: 134, steps: 178660 },
      "潜江市": { distance: 152, steps: 202660 },
      "仙桃市": { distance: 127, steps: 169330 },
      "孝感市": { distance: 109, steps: 145330 },
    }
  },
  "仙桃市": {
    province: 'HUB',
    location: { lat: 30.04, lon: 112.55 },
    icon: 'xiantaoshi.png',
    neighbors: {
      "武汉市": { distance: 252, steps: 336000 },
      "孝感市": { distance: 230, steps: 306660 },
      "潜江市": { distance: 36, steps: 48000 },
      "天门市": { distance: 127, steps: 169330 },
      "荆州市": { distance: 62, steps: 82660 },
    }
  },
  "长沙市": {
    province: 'HUN',
    location: { lat: 28.2278, lon: 112.9388 },
    icon: 'changshashi.png',
    neighbors: {
      "岳阳市": { distance: 178, steps: 237330 },
      "益阳市": { distance: 95, steps: 126660 },
      "娄底市": { distance: 152, steps: 202660 },
      "湘潭市": { distance: 63, steps: 84000 },
      "株洲市": { distance: 68, steps: 90660 },
      "萍乡市": { distance: 158, steps: 210660 },
      "宜春市": { distance: 214, steps: 285330 },
    }
  },
  "株洲市": {
    province: 'HUN',
    location: { lat: 27.8273, lon: 113.134 },
    icon: 'zhuzhoushi.png',
    neighbors: {
      "萍乡市": { distance: 104, steps: 138660 },
      "长沙市": { distance: 68, steps: 90660 },
      "湘潭市": { distance: 27, steps: 36000 },
      "衡阳市": { distance: 165, steps: 220000 },
      "郴州市": { distance: 321, steps: 428000 },
      "吉安市": { distance: 280, steps: 373330 },
    }
  },
  "湘潭市": {
    province: 'HUN',
    location: { lat: 27.8294, lon: 112.9447 },
    icon: 'xiangtanshi.png',
    neighbors: {
      "长沙市": { distance: 63, steps: 84000 },
      "娄底市": { distance: 132, steps: 176000 },
      "衡阳市": { distance: 154, steps: 205330 },
      "株洲市": { distance: 27, steps: 36000 },
    }
  },
  "衡阳市": {
    province: 'HUN',
    location: { lat: 26.8982, lon: 112.5719 },
    icon: 'hengyangshi.png',
    neighbors: {
      "湘潭市": { distance: 154, steps: 205330 },
      "娄底市": { distance: 152, steps: 202660 },
      "邵阳市": { distance: 163, steps: 217330 },
      "永州市": { distance: 153, steps: 204000 },
      "郴州市": { distance: 187, steps: 249330 },
      "株洲市": { distance: 165, steps: 220000 },
    }
  },
  "邵阳市": {
    province: 'HUN',
    location: { lat: 27.2386, lon: 111.4673 },
    icon: 'shaoyangshi.png',
    neighbors: {
      "娄底市": { distance: 106, steps: 141330 },
      "怀化市": { distance: 209, steps: 278660 },
      "桂林市": { distance: 347, steps: 462660 },
      "永州市": { distance: 130, steps: 173330 },
      "衡阳市": { distance: 163, steps: 217330 },
    }
  },
  "岳阳市": {
    province: 'HUN',
    location: { lat: 29.3579, lon: 113.1289 },
    icon: 'yueyangshi.png',
    neighbors: {
      "咸宁市": { distance: 179, steps: 238660 },
      "荆州市": { distance: 194, steps: 258660 },
      "益阳市": { distance: 164, steps: 218660 },
      "长沙市": { distance: 178, steps: 237330 },
      "宜春市": { distance: 299, steps: 398660 },
      "九江市": { distance: 393, steps: 524000 },
    }
  },
  "常德市": {
    province: 'HUN',
    location: { lat: 29.0321, lon: 111.6984 },
    icon: 'changdeshi.png',
    neighbors: {
      "荆州市": { distance: 216, steps: 288000 },
      "宜昌市": { distance: 266, steps: 354660 },
      "恩施土家族苗族自治州": { distance: 356, steps: 474660 },
      "张家界市": { distance: 167, steps: 222660 },
      "怀化市": { distance: 326, steps: 434660 },
      "益阳市": { distance: 117, steps: 156000 },
    }
  },
  "张家界市": {
    province: 'HUN',
    location: { lat: 29.1169, lon: 110.4791 },
    icon: 'zhangjiajieshi.png',
    neighbors: {
      "常德市": { distance: 167, steps: 222660 },
      "恩施土家族苗族自治州": { distance: 225, steps: 300000 },
      "湘西土家族苗族自治州": { distance: 162, steps: 216000 },
      "怀化市": { distance: 250, steps: 333330 },
    }
  },
  "益阳市": {
    province: 'HUN',
    location: { lat: 28.5535, lon: 112.3555 },
    icon: 'yiyangshi.png',
    neighbors: {
      "岳阳市": { distance: 164, steps: 218660 },
      "荆州市": { distance: 278, steps: 370660 },
      "常德市": { distance: 117, steps: 156000 },
      "怀化市": { distance: 358, steps: 477330 },
      "娄底市": { distance: 138, steps: 184000 },
      "长沙市": { distance: 95, steps: 126660 },
    }
  },
  "郴州市": {
    province: 'HUN',
    location: { lat: 25.7707, lon: 113.015 },
    icon: 'chenzhoushi.png',
    neighbors: {
      "赣州市": { distance: 270, steps: 360000 },
      "吉安市": { distance: 346, steps: 461330 },
      "株洲市": { distance: 321, steps: 428000 },
      "衡阳市": { distance: 187, steps: 249330 },
      "永州市": { distance: 221, steps: 294660 },
      "清远市": { distance: 326, steps: 434660 },
      "韶关市": { distance: 171, steps: 228000 },
    }
  },
  "永州市": {
    province: 'HUN',
    location: { lat: 26.42, lon: 111.6132 },
    icon: 'yongzhoushi.png',
    neighbors: {
      "衡阳市": { distance: 153, steps: 204000 },
      "邵阳市": { distance: 130, steps: 173330 },
      "桂林市": { distance: 257, steps: 342660 },
      "贺州市": { distance: 315, steps: 420000 },
      "清远市": { distance: 473, steps: 630660 },
      "郴州市": { distance: 221, steps: 294660 },
    }
  },
  "怀化市": {
    province: 'HUN',
    location: { lat: 27.57, lon: 110.0037 },
    icon: 'huaihuashi.png',
    neighbors: {
      "铜仁市": { distance: 115, steps: 153330 },
      "黔东南苗族侗族自治州": { distance: 321, steps: 428000 },
      "柳州市": { distance: 512, steps: 682660 },
      "桂林市": { distance: 360, steps: 480000 },
      "邵阳市": { distance: 209, steps: 278660 },
      "娄底市": { distance: 276, steps: 368000 },
      "益阳市": { distance: 358, steps: 477330 },
      "常德市": { distance: 326, steps: 434660 },
      "张家界市": { distance: 250, steps: 333330 },
      "湘西土家族苗族自治州": { distance: 121, steps: 161330 },
    }
  },
  "娄底市": {
    province: 'HUN',
    location: { lat: 27.7281, lon: 111.9965 },
    icon: 'loudishi.png',
    neighbors: {
      "湘潭市": { distance: 132, steps: 176000 },
      "长沙市": { distance: 152, steps: 202660 },
      "益阳市": { distance: 138, steps: 184000 },
      "怀化市": { distance: 276, steps: 368000 },
      "邵阳市": { distance: 106, steps: 141330 },
      "衡阳市": { distance: 152, steps: 202660 },
    }
  },
  "湘西土家族苗族自治州": {
    province: 'HUN',
    location: { lat: 28.3112, lon: 109.7389 },
    icon: 'xiangxitujiazumiaozuzizhizhou.png',
    neighbors: {
      "张家界市": { distance: 162, steps: 216000 },
      "恩施土家族苗族自治州": { distance: 308, steps: 410660 },
      "重庆市": { distance: 477, steps: 636000 },
      "铜仁市": { distance: 120, steps: 160000 },
      "怀化市": { distance: 121, steps: 161330 },
    }
  },
  "广州市": {
    province: 'GD',
    location: { lat: 23.1291, lon: 113.2644 },
    icon: 'guangzhoushi.png',
    neighbors: {
      "东莞市": { distance: 73, steps: 97330 },
      "惠州市": { distance: 165, steps: 220000 },
      "韶关市": { distance: 267, steps: 356000 },
      "清远市": { distance: 92, steps: 122660 },
      "佛山市": { distance: 27, steps: 36000 },
      "中山市": { distance: 97, steps: 129330 },
    }
  },
  "深圳市": {
    province: 'GD',
    location: { lat: 22.5431, lon: 114.0579 },
    icon: 'shenzhenshi.png',
    neighbors: {
      "惠州市": { distance: 103, steps: 137330 },
      "东莞市": { distance: 89, steps: 118660 },
      "香港特别行政区": { distance: 39, steps: 52000 },
    }
  },
  "珠海市": {
    province: 'GD',
    location: { lat: 22.271, lon: 113.5767 },
    icon: 'zhuhaishi.png',
    neighbors: {
      "中山市": { distance: 47, steps: 62660 },
      "江门市": { distance: 86, steps: 114660 },
      "澳门特别行政区": { distance: 13, steps: 17330 },
    }
  },
  "汕头市": {
    province: 'GD',
    location: { lat: 23.3535, lon: 116.682 },
    icon: 'shantoushi.png',
    neighbors: {
      "潮州市": { distance: 49, steps: 65330 },
      "揭阳市": { distance: 54, steps: 72000 },
    }
  },
  "佛山市": {
    province: 'GD',
    location: { lat: 23.0218, lon: 113.1219 },
    icon: 'foshanshi.png',
    neighbors: {
      "广州市": { distance: 27, steps: 36000 },
      "清远市": { distance: 104, steps: 138660 },
      "肇庆市": { distance: 95, steps: 126660 },
      "云浮市": { distance: 156, steps: 208000 },
      "江门市": { distance: 70, steps: 93330 },
      "中山市": { distance: 88, steps: 117330 },
    }
  },
  "韶关市": {
    province: 'GD',
    location: { lat: 24.8108, lon: 113.5979 },
    icon: 'shaoguanshi.png',
    neighbors: {
      "赣州市": { distance: 248, steps: 330660 },
      "郴州市": { distance: 171, steps: 228000 },
      "清远市": { distance: 192, steps: 256000 },
      "广州市": { distance: 267, steps: 356000 },
      "惠州市": { distance: 289, steps: 385330 },
      "河源市": { distance: 229, steps: 305330 },
    }
  },
  "湛江市": {
    province: 'GD',
    location: { lat: 21.2707, lon: 110.3594 },
    icon: 'zhanjiangshi.png',
    neighbors: {
      "茂名市": { distance: 103, steps: 137330 },
      "玉林市": { distance: 218, steps: 290660 },
      "北海市": { distance: 183, steps: 244000 },
      "海口市": { distance: 193, steps: 257330 },
    }
  },
  "肇庆市": {
    province: 'GD',
    location: { lat: 23.0471, lon: 112.4663 },
    icon: 'zhaoqingshi.png',
    neighbors: {
      "清远市": { distance: 130, steps: 173330 },
      "贺州市": { distance: 249, steps: 332000 },
      "梧州市": { distance: 183, steps: 244000 },
      "云浮市": { distance: 64, steps: 85330 },
      "佛山市": { distance: 95, steps: 126660 },
    }
  },
  "江门市": {
    province: 'GD',
    location: { lat: 22.5789, lon: 113.0815 },
    icon: 'jiangmenshi.png',
    neighbors: {
      "珠海市": { distance: 86, steps: 114660 },
      "中山市": { distance: 46, steps: 61330 },
      "佛山市": { distance: 70, steps: 93330 },
      "云浮市": { distance: 158, steps: 210660 },
      "阳江市": { distance: 195, steps: 260000 },
    }
  },
  "茂名市": {
    province: 'GD',
    location: { lat: 21.6631, lon: 110.9253 },
    icon: 'maomingshi.png',
    neighbors: {
      "阳江市": { distance: 156, steps: 208000 },
      "云浮市": { distance: 253, steps: 337330 },
      "梧州市": { distance: 287, steps: 382660 },
      "玉林市": { distance: 191, steps: 254660 },
      "湛江市": { distance: 103, steps: 137330 },
    }
  },
  "惠州市": {
    province: 'GD',
    location: { lat: 23.1116, lon: 114.4161 },
    icon: 'huizhoushi.png',
    neighbors: {
      "汕尾市": { distance: 148, steps: 197330 },
      "河源市": { distance: 107, steps: 142660 },
      "韶关市": { distance: 289, steps: 385330 },
      "广州市": { distance: 165, steps: 220000 },
      "东莞市": { distance: 95, steps: 126660 },
      "深圳市": { distance: 103, steps: 137330 },
    }
  },
  "梅州市": {
    province: 'GD',
    location: { lat: 24.2885, lon: 116.1225 },
    icon: 'meizhoushi.png',
    neighbors: {
      "漳州市": { distance: 219, steps: 292000 },
      "龙岩市": { distance: 178, steps: 237330 },
      "赣州市": { distance: 295, steps: 393330 },
      "河源市": { distance: 220, steps: 293330 },
      "汕尾市": { distance: 259, steps: 345330 },
      "揭阳市": { distance: 121, steps: 161330 },
      "潮州市": { distance: 121, steps: 161330 },
    }
  },
  "汕尾市": {
    province: 'GD',
    location: { lat: 22.7787, lon: 115.3759 },
    icon: 'shanweishi.png',
    neighbors: {
      "揭阳市": { distance: 187, steps: 249330 },
      "梅州市": { distance: 259, steps: 345330 },
      "河源市": { distance: 179, steps: 238660 },
      "惠州市": { distance: 148, steps: 197330 },
    }
  },
  "阳江市": {
    province: 'GD',
    location: { lat: 21.8579, lon: 111.9826 },
    icon: 'yangjiangshi.png',
    neighbors: {
      "江门市": { distance: 195, steps: 260000 },
      "云浮市": { distance: 165, steps: 220000 },
      "茂名市": { distance: 156, steps: 208000 },
    }
  },
  "清远市": {
    province: 'GD',
    location: { lat: 23.6817, lon: 113.0561 },
    icon: 'qingyuanshi.png',
    neighbors: {
      "韶关市": { distance: 192, steps: 256000 },
      "郴州市": { distance: 326, steps: 434660 },
      "永州市": { distance: 473, steps: 630660 },
      "贺州市": { distance: 242, steps: 322660 },
      "肇庆市": { distance: 130, steps: 173330 },
      "佛山市": { distance: 104, steps: 138660 },
      "广州市": { distance: 92, steps: 122660 },
    }
  },
  "东莞市": {
    province: 'GD',
    location: { lat: 23.043, lon: 113.7633 },
    icon: 'dongguanshi.png',
    neighbors: {
      "惠州市": { distance: 95, steps: 126660 },
      "广州市": { distance: 73, steps: 97330 },
      "深圳市": { distance: 89, steps: 118660 },
    }
  },
  "中山市": {
    province: 'GD',
    location: { lat: 22.5176, lon: 113.3926 },
    icon: 'zhongshanshi.png',
    neighbors: {
      "广州市": { distance: 97, steps: 129330 },
      "佛山市": { distance: 88, steps: 117330 },
      "江门市": { distance: 46, steps: 61330 },
      "珠海市": { distance: 47, steps: 62660 },
    }
  },
  "潮州市": {
    province: 'GD',
    location: { lat: 23.6618, lon: 116.622 },
    icon: 'chaozhoushi.png',
    neighbors: {
      "漳州市": { distance: 197, steps: 262660 },
      "梅州市": { distance: 121, steps: 161330 },
      "揭阳市": { distance: 40, steps: 53330 },
      "汕头市": { distance: 49, steps: 65330 },
    }
  },
  "揭阳市": {
    province: 'GD',
    location: { lat: 23.55, lon: 116.3728 },
    icon: 'jieyangshi.png',
    neighbors: {
      "潮州市": { distance: 40, steps: 53330 },
      "梅州市": { distance: 121, steps: 161330 },
      "汕尾市": { distance: 187, steps: 249330 },
      "汕头市": { distance: 54, steps: 72000 },
    }
  },
  "云浮市": {
    province: 'GD',
    location: { lat: 22.915, lon: 112.044 },
    icon: 'yunfushi.png',
    neighbors: {
      "佛山市": { distance: 156, steps: 208000 },
      "肇庆市": { distance: 64, steps: 85330 },
      "梧州市": { distance: 140, steps: 186660 },
      "茂名市": { distance: 253, steps: 337330 },
      "阳江市": { distance: 165, steps: 220000 },
      "江门市": { distance: 158, steps: 210660 },
    }
  },
  "河源市": {
    province: 'GD',
    location: { lat: 23.7435, lon: 114.7004 },
    icon: 'heyuanshi.png',
    neighbors: {
      "梅州市": { distance: 220, steps: 293330 },
      "赣州市": { distance: 329, steps: 438660 },
      "韶关市": { distance: 229, steps: 305330 },
      "惠州市": { distance: 107, steps: 142660 },
      "汕尾市": { distance: 179, steps: 238660 },
    }
  },
  "南宁市": {
    province: 'GX',
    location: { lat: 22.817, lon: 108.3665 },
    icon: 'nanningshi.png',
    neighbors: {
      "贵港市": { distance: 183, steps: 244000 },
      "来宾市": { distance: 191, steps: 254660 },
      "河池市": { distance: 295, steps: 393330 },
      "百色市": { distance: 302, steps: 402660 },
      "崇左市": { distance: 158, steps: 210660 },
      "防城港市": { distance: 176, steps: 234660 },
      "钦州市": { distance: 136, steps: 181330 },
    }
  },
  "柳州市": {
    province: 'GX',
    location: { lat: 24.3255, lon: 109.4283 },
    icon: 'liuzhoushi.png',
    neighbors: {
      "桂林市": { distance: 193, steps: 257330 },
      "怀化市": { distance: 512, steps: 682660 },
      "黔东南苗族侗族自治州": { distance: 407, steps: 542660 },
      "河池市": { distance: 199, steps: 265330 },
      "来宾市": { distance: 94, steps: 125330 },
    }
  },
  "桂林市": {
    province: 'GX',
    location: { lat: 25.2744, lon: 110.2992 },
    icon: 'guilinshi.png',
    neighbors: {
      "永州市": { distance: 257, steps: 342660 },
      "邵阳市": { distance: 347, steps: 462660 },
      "怀化市": { distance: 360, steps: 480000 },
      "柳州市": { distance: 193, steps: 257330 },
      "来宾市": { distance: 282, steps: 376000 },
      "梧州市": { distance: 313, steps: 417330 },
      "贺州市": { distance: 223, steps: 297330 },
    }
  },
  "梧州市": {
    province: 'GX',
    location: { lat: 23.4748, lon: 111.279 },
    icon: 'wuzhoushi.png',
    neighbors: {
      "肇庆市": { distance: 183, steps: 244000 },
      "贺州市": { distance: 150, steps: 200000 },
      "桂林市": { distance: 313, steps: 417330 },
      "来宾市": { distance: 297, steps: 396000 },
      "贵港市": { distance: 247, steps: 329330 },
      "玉林市": { distance: 206, steps: 274660 },
      "茂名市": { distance: 287, steps: 382660 },
      "云浮市": { distance: 140, steps: 186660 },
    }
  },
  "北海市": {
    province: 'GX',
    location: { lat: 21.4734, lon: 109.1197 },
    icon: 'beihaishi.png',
    neighbors: {
      "湛江市": { distance: 183, steps: 244000 },
      "玉林市": { distance: 237, steps: 316000 },
      "钦州市": { distance: 107, steps: 142660 },
    }
  },
  "防城港市": {
    province: 'GX',
    location: { lat: 21.6867, lon: 108.3547 },
    icon: 'fangchenggangshi.png',
    neighbors: {
      "钦州市": { distance: 60, steps: 80000 },
      "南宁市": { distance: 176, steps: 234660 },
      "崇左市": { distance: 182, steps: 242660 },
    }
  },
  "钦州市": {
    province: 'GX',
    location: { lat: 21.9797, lon: 108.6242 },
    icon: 'qinzhoushi.png',
    neighbors: {
      "北海市": { distance: 107, steps: 142660 },
      "玉林市": { distance: 245, steps: 326660 },
      "贵港市": { distance: 226, steps: 301330 },
      "南宁市": { distance: 136, steps: 181330 },
      "防城港市": { distance: 60, steps: 80000 },
    }
  },
  "贵港市": {
    province: 'GX',
    location: { lat: 23.1115, lon: 109.5986 },
    icon: 'guigangshi.png',
    neighbors: {
      "梧州市": { distance: 247, steps: 329330 },
      "来宾市": { distance: 114, steps: 152000 },
      "南宁市": { distance: 183, steps: 244000 },
      "钦州市": { distance: 226, steps: 301330 },
      "玉林市": { distance: 107, steps: 142660 },
    }
  },
  "玉林市": {
    province: 'GX',
    location: { lat: 22.6545, lon: 110.1545 },
    icon: 'yulinshi.png',
    neighbors: {
      "茂名市": { distance: 191, steps: 254660 },
      "梧州市": { distance: 206, steps: 274660 },
      "贵港市": { distance: 107, steps: 142660 },
      "钦州市": { distance: 245, steps: 326660 },
      "北海市": { distance: 237, steps: 316000 },
      "湛江市": { distance: 218, steps: 290660 },
    }
  },
  "百色市": {
    province: 'GX',
    location: { lat: 23.9027, lon: 106.6184 },
    icon: 'baiseshi.png',
    neighbors: {
      "崇左市": { distance: 257, steps: 342660 },
      "南宁市": { distance: 302, steps: 402660 },
      "河池市": { distance: 242, steps: 322660 },
      "黔南布依族苗族自治州": { distance: 388, steps: 517330 },
      "黔西南布依族苗族自治州": { distance: 306, steps: 408000 },
      "曲靖市": { distance: 470, steps: 626660 },
      "文山壮族苗族自治州": { distance: 349, steps: 465330 },
    }
  },
  "贺州市": {
    province: 'GX',
    location: { lat: 24.4037, lon: 111.552 },
    icon: 'hezhoushi.png',
    neighbors: {
      "清远市": { distance: 242, steps: 322660 },
      "永州市": { distance: 315, steps: 420000 },
      "桂林市": { distance: 223, steps: 297330 },
      "梧州市": { distance: 150, steps: 200000 },
      "肇庆市": { distance: 249, steps: 332000 },
    }
  },
  "河池市": {
    province: 'GX',
    location: { lat: 24.6926, lon: 108.0851 },
    icon: 'hechishi.png',
    neighbors: {
      "柳州市": { distance: 199, steps: 265330 },
      "黔东南苗族侗族自治州": { distance: 295, steps: 393330 },
      "黔南布依族苗族自治州": { distance: 257, steps: 342660 },
      "百色市": { distance: 242, steps: 322660 },
      "南宁市": { distance: 295, steps: 393330 },
      "来宾市": { distance: 218, steps: 290660 },
    }
  },
  "来宾市": {
    province: 'GX',
    location: { lat: 23.7521, lon: 109.2214 },
    icon: 'laibinshi.png',
    neighbors: {
      "梧州市": { distance: 297, steps: 396000 },
      "桂林市": { distance: 282, steps: 376000 },
      "柳州市": { distance: 94, steps: 125330 },
      "河池市": { distance: 218, steps: 290660 },
      "南宁市": { distance: 191, steps: 254660 },
      "贵港市": { distance: 114, steps: 152000 },
    }
  },
  "崇左市": {
    province: 'GX',
    location: { lat: 22.404, lon: 107.3645 },
    icon: 'chongzuoshi.png',
    neighbors: {
      "防城港市": { distance: 182, steps: 242660 },
      "南宁市": { distance: 158, steps: 210660 },
      "百色市": { distance: 257, steps: 342660 },
    }
  },
  "海口市": {
    province: 'HAN',
    location: { lat: 20.044, lon: 110.1904 },
    icon: 'haikoushi.png',
    neighbors: {
      "儋州市": { distance: 121, steps: 161330 },
      "湛江市": { distance: 193, steps: 257330 },
      "三亚市": { distance: 297, steps: 396000 },
    }
  },
  "三亚市": {
    province: 'HAN',
    location: { lat: 18.2528, lon: 109.5127 },
    icon: 'sanyashi.png',
    neighbors: {
      "儋州市": { distance: 198, steps: 264000 },
      "海口市": { distance: 297, steps: 396000 },
      "三沙市": { distance: 475, steps: 633330 },
    }
  },
  "儋州市": {
    province: 'HAN',
    location: { lat: 19.5211, lon: 109.5811 },
    icon: 'danzhoushi.png',
    neighbors: {
      "海口市": { distance: 121, steps: 161330 },
      "三亚市": { distance: 198, steps: 264000 },
    }
  },
  "三沙市": {
    province: 'HAN',
    location: { lat: 16.831, lon: 112.3385 },
    icon: 'sanshashi.png',
    neighbors: {
      "三亚市": { distance: 475, steps: 633330 },
    }
  },
  "成都市": {
    province: 'SC',
    location: { lat: 30.5728, lon: 104.0668 },
    icon: 'chengdushi.png',
    neighbors: {
      "资阳市": { distance: 105, steps: 140000 },
      "德阳市": { distance: 98, steps: 130660 },
      "阿坝藏族羌族自治州": { distance: 321, steps: 428000 },
      "雅安市": { distance: 170, steps: 226660 },
      "眉山市": { distance: 84, steps: 112000 },
    }
  },
  "绵阳市": {
    province: 'SC',
    location: { lat: 31.4679, lon: 104.6796 },
    icon: 'mianyangshi.png',
    neighbors: {
      "南充市": { distance: 215, steps: 286660 },
      "广元市": { distance: 216, steps: 288000 },
      "陇南市": { distance: 301, steps: 401330 },
      "阿坝藏族羌族自治州": { distance: 333, steps: 444000 },
      "德阳市": { distance: 65, steps: 86660 },
      "遂宁市": { distance: 190, steps: 253330 },
    }
  },
  "自贡市": {
    province: 'SC',
    location: { lat: 29.3392, lon: 104.7784 },
    icon: 'zigongshi.png',
    neighbors: {
      "泸州市": { distance: 116, steps: 154660 },
      "内江市": { distance: 55, steps: 73330 },
      "眉山市": { distance: 172, steps: 229330 },
      "乐山市": { distance: 143, steps: 190660 },
      "宜宾市": { distance: 92, steps: 122660 },
    }
  },
  "攀枝花市": {
    province: 'SC',
    location: { lat: 26.5823, lon: 101.7186 },
    icon: 'panzhihuashi.png',
    neighbors: {
      "凉山彝族自治州": { distance: 217, steps: 289330 },
      "丽江市": { distance: 212, steps: 282660 },
      "楚雄彝族自治州": { distance: 241, steps: 321330 },
    }
  },
  "泸州市": {
    province: 'SC',
    location: { lat: 28.872, lon: 105.4427 },
    icon: 'luzhoushi.png',
    neighbors: {
      "遵义市": { distance: 271, steps: 361330 },
      "重庆市": { distance: 186, steps: 248000 },
      "内江市": { distance: 123, steps: 164000 },
      "自贡市": { distance: 116, steps: 154660 },
      "宜宾市": { distance: 113, steps: 150660 },
      "昭通市": { distance: 337, steps: 449330 },
      "毕节市": { distance: 248, steps: 330660 },
    }
  },
  "德阳市": {
    province: 'SC',
    location: { lat: 31.1311, lon: 104.398 },
    icon: 'deyangshi.png',
    neighbors: {
      "遂宁市": { distance: 185, steps: 246660 },
      "绵阳市": { distance: 65, steps: 86660 },
      "阿坝藏族羌族自治州": { distance: 313, steps: 417330 },
      "成都市": { distance: 98, steps: 130660 },
      "资阳市": { distance: 161, steps: 214660 },
    }
  },
  "广元市": {
    province: 'SC',
    location: { lat: 32.4354, lon: 105.8436 },
    icon: 'guangyuanshi.png',
    neighbors: {
      "汉中市": { distance: 184, steps: 245330 },
      "陇南市": { distance: 193, steps: 257330 },
      "绵阳市": { distance: 216, steps: 288000 },
      "南充市": { distance: 258, steps: 344000 },
      "巴中市": { distance: 149, steps: 198660 },
    }
  },
  "遂宁市": {
    province: 'SC',
    location: { lat: 30.5332, lon: 105.5932 },
    icon: 'suiningshi.png',
    neighbors: {
      "广安市": { distance: 140, steps: 186660 },
      "南充市": { distance: 78, steps: 104000 },
      "绵阳市": { distance: 190, steps: 253330 },
      "德阳市": { distance: 185, steps: 246660 },
      "资阳市": { distance: 143, steps: 190660 },
      "重庆市": { distance: 199, steps: 265330 },
    }
  },
  "内江市": {
    province: 'SC',
    location: { lat: 29.5842, lon: 105.0661 },
    icon: 'neijiangshi.png',
    neighbors: {
      "重庆市": { distance: 201, steps: 268000 },
      "资阳市": { distance: 102, steps: 136000 },
      "眉山市": { distance: 184, steps: 245330 },
      "自贡市": { distance: 55, steps: 73330 },
      "泸州市": { distance: 123, steps: 164000 },
    }
  },
  "乐山市": {
    province: 'SC',
    location: { lat: 29.5828, lon: 103.7612 },
    icon: 'leshanshi.png',
    neighbors: {
      "自贡市": { distance: 143, steps: 190660 },
      "眉山市": { distance: 78, steps: 104000 },
      "雅安市": { distance: 124, steps: 165330 },
      "凉山彝族自治州": { distance: 335, steps: 446660 },
      "宜宾市": { distance: 174, steps: 232000 },
    }
  },
  "南充市": {
    province: 'SC',
    location: { lat: 30.7952, lon: 106.0829 },
    icon: 'nanchongshi.png',
    neighbors: {
      "达州市": { distance: 196, steps: 261330 },
      "巴中市": { distance: 189, steps: 252000 },
      "广元市": { distance: 258, steps: 344000 },
      "绵阳市": { distance: 215, steps: 286660 },
      "遂宁市": { distance: 78, steps: 104000 },
      "广安市": { distance: 90, steps: 120000 },
    }
  },
  "宜宾市": {
    province: 'SC',
    location: { lat: 28.7628, lon: 104.6301 },
    icon: 'yibinshi.png',
    neighbors: {
      "泸州市": { distance: 113, steps: 150660 },
      "自贡市": { distance: 92, steps: 122660 },
      "乐山市": { distance: 174, steps: 232000 },
      "凉山彝族自治州": { distance: 353, steps: 470660 },
      "昭通市": { distance: 255, steps: 340000 },
    }
  },
  "广安市": {
    province: 'SC',
    location: { lat: 30.4739, lon: 106.6333 },
    icon: 'guanganshi.png',
    neighbors: {
      "达州市": { distance: 160, steps: 213330 },
      "南充市": { distance: 90, steps: 120000 },
      "遂宁市": { distance: 140, steps: 186660 },
      "重庆市": { distance: 142, steps: 189330 },
    }
  },
  "达州市": {
    province: 'SC',
    location: { lat: 31.2089, lon: 107.4677 },
    icon: 'dazhoushi.png',
    neighbors: {
      "重庆市": { distance: 285, steps: 380000 },
      "安康市": { distance: 310, steps: 413330 },
      "汉中市": { distance: 296, steps: 394660 },
      "巴中市": { distance: 141, steps: 188000 },
      "南充市": { distance: 196, steps: 261330 },
      "广安市": { distance: 160, steps: 213330 },
    }
  },
  "巴中市": {
    province: 'SC',
    location: { lat: 31.8675, lon: 106.7478 },
    icon: 'bazhongshi.png',
    neighbors: {
      "达州市": { distance: 141, steps: 188000 },
      "汉中市": { distance: 191, steps: 254660 },
      "广元市": { distance: 149, steps: 198660 },
      "南充市": { distance: 189, steps: 252000 },
    }
  },
  "雅安市": {
    province: 'SC',
    location: { lat: 30.0044, lon: 102.991 },
    icon: 'yaanshi.png',
    neighbors: {
      "眉山市": { distance: 114, steps: 152000 },
      "成都市": { distance: 170, steps: 226660 },
      "阿坝藏族羌族自治州": { distance: 313, steps: 417330 },
      "甘孜藏族自治州": { distance: 139, steps: 185330 },
      "凉山彝族自治州": { distance: 345, steps: 460000 },
      "乐山市": { distance: 124, steps: 165330 },
    }
  },
  "眉山市": {
    province: 'SC',
    location: { lat: 30.075, lon: 103.8317 },
    icon: 'meishanshi.png',
    neighbors: {
      "资阳市": { distance: 110, steps: 146660 },
      "成都市": { distance: 84, steps: 112000 },
      "雅安市": { distance: 114, steps: 152000 },
      "乐山市": { distance: 78, steps: 104000 },
      "自贡市": { distance: 172, steps: 229330 },
      "内江市": { distance: 184, steps: 245330 },
    }
  },
  "资阳市": {
    province: 'SC',
    location: { lat: 30.1229, lon: 104.6419 },
    icon: 'ziyangshi.png',
    neighbors: {
      "重庆市": { distance: 272, steps: 362660 },
      "遂宁市": { distance: 143, steps: 190660 },
      "德阳市": { distance: 161, steps: 214660 },
      "成都市": { distance: 105, steps: 140000 },
      "眉山市": { distance: 110, steps: 146660 },
      "内江市": { distance: 102, steps: 136000 },
    }
  },
  "阿坝藏族羌族自治州": {
    province: 'SC',
    location: { lat: 31.8997, lon: 102.2213 },
    icon: 'abacangzuqiangzuzizhizhou.png',
    neighbors: {
      "绵阳市": { distance: 333, steps: 444000 },
      "陇南市": { distance: 423, steps: 564000 },
      "甘南藏族自治州": { distance: 488, steps: 650660 },
      "果洛藏族自治州": { distance: 477, steps: 636000 },
      "甘孜藏族自治州": { distance: 291, steps: 388000 },
      "雅安市": { distance: 313, steps: 417330 },
      "成都市": { distance: 321, steps: 428000 },
      "德阳市": { distance: 313, steps: 417330 },
    }
  },
  "甘孜藏族自治州": {
    province: 'SC',
    location: { lat: 30.0492, lon: 101.9625 },
    icon: 'ganzicangzuzizhizhou.png',
    neighbors: {
      "阿坝藏族羌族自治州": { distance: 291, steps: 388000 },
      "果洛藏族自治州": { distance: 725, steps: 966660 },
      "玉树藏族自治州": { distance: 803, steps: 1070660 },
      "昌都市": { distance: 664, steps: 885330 },
      "迪庆藏族自治州": { distance: 463, steps: 617330 },
      "凉山彝族自治州": { distance: 340, steps: 453330 },
      "雅安市": { distance: 139, steps: 185330 },
    }
  },
  "凉山彝族自治州": {
    province: 'SC',
    location: { lat: 27.8867, lon: 102.2587 },
    icon: 'liangshanyizuzizhizhou.png',
    neighbors: {
      "昭通市": { distance: 219, steps: 292000 },
      "宜宾市": { distance: 353, steps: 470660 },
      "乐山市": { distance: 335, steps: 446660 },
      "雅安市": { distance: 345, steps: 460000 },
      "甘孜藏族自治州": { distance: 340, steps: 453330 },
      "迪庆藏族自治州": { distance: 352, steps: 469330 },
      "丽江市": { distance: 324, steps: 432000 },
      "攀枝花市": { distance: 217, steps: 289330 },
      "楚雄彝族自治州": { distance: 454, steps: 605330 },
      "昆明市": { distance: 475, steps: 633330 },
    }
  },
  "贵阳市": {
    province: 'GZ',
    location: { lat: 26.647, lon: 106.6302 },
    icon: 'guiyangshi.png',
    neighbors: {
      "黔南布依族苗族自治州": { distance: 138, steps: 184000 },
      "遵义市": { distance: 173, steps: 230660 },
      "毕节市": { distance: 212, steps: 282660 },
      "安顺市": { distance: 116, steps: 154660 },
    }
  },
  "遵义市": {
    province: 'GZ',
    location: { lat: 27.7254, lon: 106.9271 },
    icon: 'zunyishi.png',
    neighbors: {
      "铜仁市": { distance: 312, steps: 416000 },
      "重庆市": { distance: 291, steps: 388000 },
      "泸州市": { distance: 271, steps: 361330 },
      "毕节市": { distance: 237, steps: 316000 },
      "贵阳市": { distance: 173, steps: 230660 },
      "黔南布依族苗族自治州": { distance: 243, steps: 324000 },
      "黔东南苗族侗族自治州": { distance: 230, steps: 306660 },
    }
  },
  "六盘水市": {
    province: 'GZ',
    location: { lat: 26.5947, lon: 104.8302 },
    icon: 'liupanshuishi.png',
    neighbors: {
      "安顺市": { distance: 163, steps: 217330 },
      "毕节市": { distance: 125, steps: 166660 },
      "曲靖市": { distance: 225, steps: 300000 },
      "黔西南布依族苗族自治州": { distance: 235, steps: 313330 },
    }
  },
  "安顺市": {
    province: 'GZ',
    location: { lat: 26.2456, lon: 105.932 },
    icon: 'anshunshi.png',
    neighbors: {
      "黔南布依族苗族自治州": { distance: 222, steps: 296000 },
      "贵阳市": { distance: 116, steps: 154660 },
      "毕节市": { distance: 186, steps: 248000 },
      "六盘水市": { distance: 163, steps: 217330 },
      "黔西南布依族苗族自治州": { distance: 232, steps: 309330 },
    }
  },
  "毕节市": {
    province: 'GZ',
    location: { lat: 27.285, lon: 105.2856 },
    icon: 'bijieshi.png',
    neighbors: {
      "贵阳市": { distance: 212, steps: 282660 },
      "遵义市": { distance: 237, steps: 316000 },
      "泸州市": { distance: 248, steps: 330660 },
      "昭通市": { distance: 218, steps: 290660 },
      "曲靖市": { distance: 349, steps: 465330 },
      "六盘水市": { distance: 125, steps: 166660 },
      "安顺市": { distance: 186, steps: 248000 },
    }
  },
  "铜仁市": {
    province: 'GZ',
    location: { lat: 27.7183, lon: 109.1907 },
    icon: 'tongrenshi.png',
    neighbors: {
      "怀化市": { distance: 115, steps: 153330 },
      "湘西土家族苗族自治州": { distance: 120, steps: 160000 },
      "重庆市": { distance: 462, steps: 616000 },
      "遵义市": { distance: 312, steps: 416000 },
      "黔东南苗族侗族自治州": { distance: 244, steps: 325330 },
    }
  },
  "黔东南苗族侗族自治州": {
    province: 'GZ',
    location: { lat: 26.5834, lon: 107.9774 },
    icon: 'qiandongnanmiaozudongzuzizhizhou.png',
    neighbors: {
      "怀化市": { distance: 321, steps: 428000 },
      "铜仁市": { distance: 244, steps: 325330 },
      "遵义市": { distance: 230, steps: 306660 },
      "黔南布依族苗族自治州": { distance: 82, steps: 109330 },
      "河池市": { distance: 295, steps: 393330 },
      "柳州市": { distance: 407, steps: 542660 },
    }
  },
  "黔南布依族苗族自治州": {
    province: 'GZ',
    location: { lat: 26.2582, lon: 107.5173 },
    icon: 'qiannanbuyizumiaozuzizhizhou.png',
    neighbors: {
      "黔东南苗族侗族自治州": { distance: 82, steps: 109330 },
      "遵义市": { distance: 243, steps: 324000 },
      "贵阳市": { distance: 138, steps: 184000 },
      "安顺市": { distance: 222, steps: 296000 },
      "黔西南布依族苗族自治州": { distance: 410, steps: 546660 },
      "百色市": { distance: 388, steps: 517330 },
      "河池市": { distance: 257, steps: 342660 },
    }
  },
  "黔西南布依族苗族自治州": {
    province: 'GZ',
    location: { lat: 25.0881, lon: 104.9006 },
    icon: 'qianxinanbuyizumiaozuzizhizhou.png',
    neighbors: {
      "黔南布依族苗族自治州": { distance: 410, steps: 546660 },
      "安顺市": { distance: 232, steps: 309330 },
      "六盘水市": { distance: 235, steps: 313330 },
      "曲靖市": { distance: 168, steps: 224000 },
      "百色市": { distance: 306, steps: 408000 },
    }
  },
  "昆明市": {
    province: 'YN',
    location: { lat: 24.8801, lon: 102.8329 },
    icon: 'kunmingshi.png',
    neighbors: {
      "曲靖市": { distance: 166, steps: 221330 },
      "昭通市": { distance: 403, steps: 537330 },
      "凉山彝族自治州": { distance: 475, steps: 633330 },
      "楚雄彝族自治州": { distance: 184, steps: 245330 },
      "玉溪市": { distance: 92, steps: 122660 },
      "红河哈尼族彝族自治州": { distance: 249, steps: 332000 },
    }
  },
  "曲靖市": {
    province: 'YN',
    location: { lat: 25.4901, lon: 103.7964 },
    icon: 'qujingshi.png',
    neighbors: {
      "黔西南布依族苗族自治州": { distance: 168, steps: 224000 },
      "六盘水市": { distance: 225, steps: 300000 },
      "毕节市": { distance: 349, steps: 465330 },
      "昭通市": { distance: 289, steps: 385330 },
      "昆明市": { distance: 166, steps: 221330 },
      "红河哈尼族彝族自治州": { distance: 337, steps: 449330 },
      "文山壮族苗族自治州": { distance: 337, steps: 449330 },
      "百色市": { distance: 470, steps: 626660 },
    }
  },
  "玉溪市": {
    province: 'YN',
    location: { lat: 24.3518, lon: 102.5428 },
    icon: 'yuxishi.png',
    neighbors: {
      "红河哈尼族彝族自治州": { distance: 195, steps: 260000 },
      "昆明市": { distance: 92, steps: 122660 },
      "楚雄彝族自治州": { distance: 178, steps: 237330 },
      "普洱市": { distance: 328, steps: 437330 },
    }
  },
  "保山市": {
    province: 'YN',
    location: { lat: 25.112, lon: 99.1671 },
    icon: 'baoshanshi.png',
    neighbors: {
      "大理白族自治州": { distance: 173, steps: 230660 },
      "怒江傈僳族自治州": { distance: 119, steps: 158660 },
      "德宏傣族景颇族自治州": { distance: 134, steps: 178660 },
      "临沧市": { distance: 232, steps: 309330 },
    }
  },
  "昭通市": {
    province: 'YN',
    location: { lat: 27.3401, lon: 103.7168 },
    icon: 'zhaotongshi.png',
    neighbors: {
      "宜宾市": { distance: 255, steps: 340000 },
      "凉山彝族自治州": { distance: 219, steps: 292000 },
      "昆明市": { distance: 403, steps: 537330 },
      "曲靖市": { distance: 289, steps: 385330 },
      "毕节市": { distance: 218, steps: 290660 },
      "泸州市": { distance: 337, steps: 449330 },
    }
  },
  "丽江市": {
    province: 'YN',
    location: { lat: 26.8557, lon: 100.2271 },
    icon: 'lijiangshi.png',
    neighbors: {
      "攀枝花市": { distance: 212, steps: 282660 },
      "凉山彝族自治州": { distance: 324, steps: 432000 },
      "迪庆藏族自治州": { distance: 168, steps: 224000 },
      "怒江傈僳族自治州": { distance: 251, steps: 334660 },
      "大理白族自治州": { distance: 195, steps: 260000 },
      "楚雄彝族自治州": { distance: 337, steps: 449330 },
    }
  },
  "普洱市": {
    province: 'YN',
    location: { lat: 22.8255, lon: 100.966 },
    icon: 'puershi.png',
    neighbors: {
      "红河哈尼族彝族自治州": { distance: 356, steps: 474660 },
      "玉溪市": { distance: 328, steps: 437330 },
      "楚雄彝族自治州": { distance: 356, steps: 474660 },
      "大理白族自治州": { distance: 445, steps: 593330 },
      "临沧市": { distance: 207, steps: 276000 },
      "西双版纳傣族自治州": { distance: 131, steps: 174660 },
    }
  },
  "临沧市": {
    province: 'YN',
    location: { lat: 23.8776, lon: 100.082 },
    icon: 'lincangshi.png',
    neighbors: {
      "普洱市": { distance: 207, steps: 276000 },
      "大理白族自治州": { distance: 271, steps: 361330 },
      "保山市": { distance: 232, steps: 309330 },
    }
  },
  "楚雄彝族自治州": {
    province: 'YN',
    location: { lat: 25.0461, lon: 101.5466 },
    icon: 'chuxiongyizuzizhizhou.png',
    neighbors: {
      "昆明市": { distance: 184, steps: 245330 },
      "凉山彝族自治州": { distance: 454, steps: 605330 },
      "攀枝花市": { distance: 241, steps: 321330 },
      "丽江市": { distance: 337, steps: 449330 },
      "大理白族自治州": { distance: 200, steps: 266660 },
      "普洱市": { distance: 356, steps: 474660 },
      "玉溪市": { distance: 178, steps: 237330 },
    }
  },
  "红河哈尼族彝族自治州": {
    province: 'YN',
    location: { lat: 23.3639, lon: 103.3756 },
    icon: 'honghehanizuyizuzizhizhou.png',
    neighbors: {
      "文山壮族苗族自治州": { distance: 125, steps: 166660 },
      "曲靖市": { distance: 337, steps: 449330 },
      "昆明市": { distance: 249, steps: 332000 },
      "玉溪市": { distance: 195, steps: 260000 },
      "普洱市": { distance: 356, steps: 474660 },
    }
  },
  "文山壮族苗族自治州": {
    province: 'YN',
    location: { lat: 23.3697, lon: 104.244 },
    icon: 'wenshanzhuangzumiaozuzizhizhou.png',
    neighbors: {
      "百色市": { distance: 349, steps: 465330 },
      "曲靖市": { distance: 337, steps: 449330 },
      "红河哈尼族彝族自治州": { distance: 125, steps: 166660 },
    }
  },
  "西双版纳傣族自治州": {
    province: 'YN',
    location: { lat: 22.0017, lon: 100.803 },
    icon: 'xishuangbannadaizuzizhizhou.png',
    neighbors: {
      "普洱市": { distance: 131, steps: 174660 },
    }
  },
  "大理白族自治州": {
    province: 'YN',
    location: { lat: 25.6065, lon: 100.2679 },
    icon: 'dalibaizuzizhizhou.png',
    neighbors: {
      "楚雄彝族自治州": { distance: 200, steps: 266660 },
      "丽江市": { distance: 195, steps: 260000 },
      "怒江傈僳族自治州": { distance: 201, steps: 268000 },
      "保山市": { distance: 173, steps: 230660 },
      "临沧市": { distance: 271, steps: 361330 },
      "普洱市": { distance: 445, steps: 593330 },
    }
  },
  "德宏傣族景颇族自治州": {
    province: 'YN',
    location: { lat: 24.4367, lon: 98.5856 },
    icon: 'dehongdaizujingpozuzizhizhou.png',
    neighbors: {
      "保山市": { distance: 134, steps: 178660 },
    }
  },
  "怒江傈僳族自治州": {
    province: 'YN',
    location: { lat: 25.8171, lon: 98.8566 },
    icon: 'nujianglisuzuzizhizhou.png',
    neighbors: {
      "保山市": { distance: 119, steps: 158660 },
      "大理白族自治州": { distance: 201, steps: 268000 },
      "丽江市": { distance: 251, steps: 334660 },
      "迪庆藏族自治州": { distance: 335, steps: 446660 },
      "林芝市": { distance: 860, steps: 1146660 },
    }
  },
  "迪庆藏族自治州": {
    province: 'YN',
    location: { lat: 27.8255, lon: 99.7068 },
    icon: 'diqingcangzuzizhizhou.png',
    neighbors: {
      "凉山彝族自治州": { distance: 352, steps: 469330 },
      "甘孜藏族自治州": { distance: 463, steps: 617330 },
      "昌都市": { distance: 619, steps: 825330 },
      "林芝市": { distance: 783, steps: 1044000 },
      "怒江傈僳族自治州": { distance: 335, steps: 446660 },
      "丽江市": { distance: 168, steps: 224000 },
    }
  },
  "拉萨市": {
    province: 'XZ',
    location: { lat: 29.65, lon: 91.1409 },
    icon: 'lasashi.png',
    neighbors: {
      "林芝市": { distance: 436, steps: 581330 },
      "那曲市": { distance: 310, steps: 413330 },
      "日喀则市": { distance: 312, steps: 416000 },
      "山南市": { distance: 108, steps: 144000 },
    }
  },
  "日喀则市": {
    province: 'XZ',
    location: { lat: 29.2678, lon: 88.8854 },
    icon: 'rikazeshi.png',
    neighbors: {
      "山南市": { distance: 393, steps: 524000 },
      "拉萨市": { distance: 312, steps: 416000 },
      "那曲市": { distance: 547, steps: 729330 },
      "阿里地区": { distance: 1276, steps: 1701330 },
    }
  },
  "昌都市": {
    province: 'XZ',
    location: { lat: 31.1369, lon: 97.1784 },
    icon: 'changdushi.png',
    neighbors: {
      "甘孜藏族自治州": { distance: 664, steps: 885330 },
      "玉树藏族自治州": { distance: 292, steps: 389330 },
      "那曲市": { distance: 684, steps: 912000 },
      "林芝市": { distance: 444, steps: 592000 },
      "迪庆藏族自治州": { distance: 619, steps: 825330 },
    }
  },
  "林芝市": {
    province: 'XZ',
    location: { lat: 29.6486, lon: 94.3624 },
    icon: 'linzhishi.png',
    neighbors: {
      "迪庆藏族自治州": { distance: 783, steps: 1044000 },
      "怒江傈僳族自治州": { distance: 860, steps: 1146660 },
      "昌都市": { distance: 444, steps: 592000 },
      "那曲市": { distance: 421, steps: 561330 },
      "拉萨市": { distance: 436, steps: 581330 },
      "山南市": { distance: 357, steps: 476000 },
    }
  },
  "山南市": {
    province: 'XZ',
    location: { lat: 29.2378, lon: 91.7733 },
    icon: 'shannanshi.png',
    neighbors: {
      "林芝市": { distance: 357, steps: 476000 },
      "拉萨市": { distance: 108, steps: 144000 },
      "日喀则市": { distance: 393, steps: 524000 },
    }
  },
  "那曲市": {
    province: 'XZ',
    location: { lat: 31.4766, lon: 92.0517 },
    icon: 'naqushi.png',
    neighbors: {
      "玉树藏族自治州": { distance: 695, steps: 926660 },
      "巴音郭楞蒙古自治州": { distance: 1763, steps: 2350660 },
      "阿里地区": { distance: 1585, steps: 2113330 },
      "日喀则市": { distance: 547, steps: 729330 },
      "拉萨市": { distance: 310, steps: 413330 },
      "林芝市": { distance: 421, steps: 561330 },
      "昌都市": { distance: 684, steps: 912000 },
    }
  },
  "阿里地区": {
    province: 'XZ',
    location: { lat: 32.5016, lon: 80.1055 },
    icon: 'alidiqu.png',
    neighbors: {
      "和田地区": { distance: 718, steps: 957330 },
      "日喀则市": { distance: 1276, steps: 1701330 },
      "那曲市": { distance: 1585, steps: 2113330 },
      "巴音郭楞蒙古自治州": { distance: 1625, steps: 2166660 },
    }
  },
  "西安市": {
    province: 'SAX',
    location: { lat: 34.3433, lon: 108.9409 },
    icon: 'xianshi.png',
    neighbors: {
      "渭南市": { distance: 78, steps: 104000 },
      "咸阳市": { distance: 30, steps: 40000 },
      "宝鸡市": { distance: 219, steps: 292000 },
      "汉中市": { distance: 318, steps: 424000 },
      "安康市": { distance: 258, steps: 344000 },
      "商洛市": { distance: 149, steps: 198660 },
    }
  },
  "咸阳市": {
    province: 'SAX',
    location: { lat: 34.3472, lon: 108.7147 },
    icon: 'xianyangshi.png',
    neighbors: {
      "西安市": { distance: 30, steps: 40000 },
      "渭南市": { distance: 105, steps: 140000 },
      "铜川市": { distance: 91, steps: 121330 },
      "延安市": { distance: 362, steps: 482660 },
      "庆阳市": { distance: 253, steps: 337330 },
      "平凉市": { distance: 320, steps: 426660 },
      "宝鸡市": { distance: 190, steps: 253330 },
    }
  },
  "宝鸡市": {
    province: 'SAX',
    location: { lat: 34.3609, lon: 107.2372 },
    icon: 'baojishi.png',
    neighbors: {
      "西安市": { distance: 219, steps: 292000 },
      "咸阳市": { distance: 190, steps: 253330 },
      "平凉市": { distance: 198, steps: 264000 },
      "天水市": { distance: 198, steps: 264000 },
      "陇南市": { distance: 337, steps: 449330 },
      "汉中市": { distance: 204, steps: 272000 },
    }
  },
  "渭南市": {
    province: 'SAX',
    location: { lat: 34.502, lon: 109.5098 },
    icon: 'weinanshi.png',
    neighbors: {
      "运城市": { distance: 208, steps: 277330 },
      "临汾市": { distance: 356, steps: 474660 },
      "延安市": { distance: 325, steps: 433330 },
      "铜川市": { distance: 95, steps: 126660 },
      "咸阳市": { distance: 105, steps: 140000 },
      "西安市": { distance: 78, steps: 104000 },
      "商洛市": { distance: 113, steps: 150660 },
      "三门峡市": { distance: 220, steps: 293330 },
    }
  },
  "铜川市": {
    province: 'SAX',
    location: { lat: 34.8965, lon: 108.9453 },
    icon: 'tongchuanshi.png',
    neighbors: {
      "渭南市": { distance: 95, steps: 126660 },
      "延安市": { distance: 272, steps: 362660 },
      "咸阳市": { distance: 91, steps: 121330 },
    }
  },
  "延安市": {
    province: 'SAX',
    location: { lat: 36.5853, lon: 109.4894 },
    icon: 'yananshi.png',
    neighbors: {
      "临汾市": { distance: 267, steps: 356000 },
      "吕梁市": { distance: 252, steps: 336000 },
      "榆林市": { distance: 267, steps: 356000 },
      "庆阳市": { distance: 270, steps: 360000 },
      "咸阳市": { distance: 362, steps: 482660 },
      "铜川市": { distance: 272, steps: 362660 },
      "渭南市": { distance: 325, steps: 433330 },
    }
  },
  "榆林市": {
    province: 'SAX',
    location: { lat: 38.2852, lon: 109.7348 },
    icon: 'yulinshi.png',
    neighbors: {
      "忻州市": { distance: 367, steps: 489330 },
      "鄂尔多斯市": { distance: 207, steps: 276000 },
      "吴忠市": { distance: 436, steps: 581330 },
      "庆阳市": { distance: 479, steps: 638660 },
      "延安市": { distance: 267, steps: 356000 },
      "吕梁市": { distance: 210, steps: 280000 },
    }
  },
  "安康市": {
    province: 'SAX',
    location: { lat: 32.6903, lon: 109.0294 },
    icon: 'ankangshi.png',
    neighbors: {
      "十堰市": { distance: 233, steps: 310660 },
      "商洛市": { distance: 219, steps: 292000 },
      "西安市": { distance: 258, steps: 344000 },
      "汉中市": { distance: 269, steps: 358660 },
      "达州市": { distance: 310, steps: 413330 },
      "重庆市": { distance: 589, steps: 785330 },
    }
  },
  "商洛市": {
    province: 'SAX',
    location: { lat: 33.8705, lon: 109.941 },
    icon: 'shangluoshi.png',
    neighbors: {
      "南阳市": { distance: 363, steps: 484000 },
      "三门峡市": { distance: 214, steps: 285330 },
      "渭南市": { distance: 113, steps: 150660 },
      "西安市": { distance: 149, steps: 198660 },
      "安康市": { distance: 219, steps: 292000 },
      "十堰市": { distance: 224, steps: 298660 },
    }
  },
  "汉中市": {
    province: 'SAX',
    location: { lat: 33.0677, lon: 107.0236 },
    icon: 'hanzhongshi.png',
    neighbors: {
      "安康市": { distance: 269, steps: 358660 },
      "西安市": { distance: 318, steps: 424000 },
      "宝鸡市": { distance: 204, steps: 272000 },
      "陇南市": { distance: 280, steps: 373330 },
      "广元市": { distance: 184, steps: 245330 },
      "巴中市": { distance: 191, steps: 254660 },
      "达州市": { distance: 296, steps: 394660 },
    }
  },
  "兰州市": {
    province: 'GS',
    location: { lat: 36.0611, lon: 103.8343 },
    icon: 'lanzhoushi.png',
    neighbors: {
      "白银市": { distance: 85, steps: 113330 },
      "武威市": { distance: 327, steps: 436000 },
      "海东市": { distance: 229, steps: 305330 },
      "临夏回族自治州": { distance: 107, steps: 142660 },
      "定西市": { distance: 125, steps: 166660 },
    }
  },
  "天水市": {
    province: 'GS',
    location: { lat: 34.5809, lon: 105.7249 },
    icon: 'tianshuishi.png',
    neighbors: {
      "宝鸡市": { distance: 198, steps: 264000 },
      "平凉市": { distance: 193, steps: 257330 },
      "定西市": { distance: 210, steps: 280000 },
      "陇南市": { distance: 213, steps: 284000 },
    }
  },
  "庆阳市": {
    province: 'GS',
    location: { lat: 35.7094, lon: 107.6389 },
    icon: 'qingyangshi.png',
    neighbors: {
      "延安市": { distance: 270, steps: 360000 },
      "榆林市": { distance: 479, steps: 638660 },
      "吴忠市": { distance: 399, steps: 532000 },
      "中卫市": { distance: 369, steps: 492000 },
      "固原市": { distance: 177, steps: 236000 },
      "平凉市": { distance: 125, steps: 166660 },
      "咸阳市": { distance: 253, steps: 337330 },
    }
  },
  "白银市": {
    province: 'GS',
    location: { lat: 36.5447, lon: 104.139 },
    icon: 'baiyinshi.png',
    neighbors: {
      "中卫市": { distance: 240, steps: 320000 },
      "阿拉善盟": { distance: 405, steps: 540000 },
      "武威市": { distance: 285, steps: 380000 },
      "兰州市": { distance: 85, steps: 113330 },
      "定西市": { distance: 163, steps: 217330 },
      "平凉市": { distance: 356, steps: 474660 },
      "固原市": { distance: 283, steps: 377330 },
    }
  },
  "武威市": {
    province: 'GS',
    location: { lat: 37.9283, lon: 102.634 },
    icon: 'wuweishi.png',
    neighbors: {
      "阿拉善盟": { distance: 397, steps: 529330 },
      "金昌市": { distance: 108, steps: 144000 },
      "张掖市": { distance: 309, steps: 412000 },
      "海北藏族自治州": { distance: 263, steps: 350660 },
      "海东市": { distance: 232, steps: 309330 },
      "兰州市": { distance: 327, steps: 436000 },
      "白银市": { distance: 285, steps: 380000 },
    }
  },
  "张掖市": {
    province: 'GS',
    location: { lat: 38.9258, lon: 100.4495 },
    icon: 'zhangyeshi.png',
    neighbors: {
      "武威市": { distance: 309, steps: 412000 },
      "金昌市": { distance: 221, steps: 294660 },
      "阿拉善盟": { distance: 633, steps: 844000 },
      "酒泉市": { distance: 267, steps: 356000 },
      "嘉峪关市": { distance: 292, steps: 389330 },
      "海西蒙古族藏族自治州": { distance: 475, steps: 633330 },
      "海北藏族自治州": { distance: 312, steps: 416000 },
    }
  },
  "金昌市": {
    province: 'GS',
    location: { lat: 38.5204, lon: 102.1877 },
    icon: 'jinchangshi.png',
    neighbors: {
      "武威市": { distance: 108, steps: 144000 },
      "阿拉善盟": { distance: 427, steps: 569330 },
      "张掖市": { distance: 221, steps: 294660 },
    }
  },
  "嘉峪关市": {
    province: 'GS',
    location: { lat: 39.7727, lon: 98.2891 },
    icon: 'jiayuguanshi.png',
    neighbors: {
      "张掖市": { distance: 292, steps: 389330 },
      "酒泉市": { distance: 26, steps: 34660 },
    }
  },
  "酒泉市": {
    province: 'GS',
    location: { lat: 39.7326, lon: 98.4941 },
    icon: 'jiuquanshi.png',
    neighbors: {
      "阿拉善盟": { distance: 876, steps: 1168000 },
      "哈密市": { distance: 757, steps: 1009330 },
      "巴音郭楞蒙古自治州": { distance: 1490, steps: 1986660 },
      "海西蒙古族藏族自治州": { distance: 408, steps: 544000 },
      "张掖市": { distance: 267, steps: 356000 },
      "嘉峪关市": { distance: 26, steps: 34660 },
    }
  },
  "陇南市": {
    province: 'GS',
    location: { lat: 33.3912, lon: 104.9116 },
    icon: 'longnanshi.png',
    neighbors: {
      "汉中市": { distance: 280, steps: 373330 },
      "宝鸡市": { distance: 337, steps: 449330 },
      "天水市": { distance: 213, steps: 284000 },
      "定西市": { distance: 343, steps: 457330 },
      "甘南藏族自治州": { distance: 355, steps: 473330 },
      "阿坝藏族羌族自治州": { distance: 423, steps: 564000 },
      "绵阳市": { distance: 301, steps: 401330 },
      "广元市": { distance: 193, steps: 257330 },
    }
  },
  "定西市": {
    province: 'GS',
    location: { lat: 35.5795, lon: 104.6254 },
    icon: 'dingxishi.png',
    neighbors: {
      "天水市": { distance: 210, steps: 280000 },
      "平凉市": { distance: 261, steps: 348000 },
      "白银市": { distance: 163, steps: 217330 },
      "兰州市": { distance: 125, steps: 166660 },
      "临夏回族自治州": { distance: 179, steps: 238660 },
      "甘南藏族自治州": { distance: 236, steps: 314660 },
      "陇南市": { distance: 343, steps: 457330 },
    }
  },
  "平凉市": {
    province: 'GS',
    location: { lat: 35.5427, lon: 106.6795 },
    icon: 'pingliangshi.png',
    neighbors: {
      "咸阳市": { distance: 320, steps: 426660 },
      "庆阳市": { distance: 125, steps: 166660 },
      "固原市": { distance: 88, steps: 117330 },
      "白银市": { distance: 356, steps: 474660 },
      "定西市": { distance: 261, steps: 348000 },
      "天水市": { distance: 193, steps: 257330 },
      "宝鸡市": { distance: 198, steps: 264000 },
    }
  },
  "临夏回族自治州": {
    province: 'GS',
    location: { lat: 35.602, lon: 103.212 },
    icon: 'linxiahuizuzizhizhou.png',
    neighbors: {
      "定西市": { distance: 179, steps: 238660 },
      "兰州市": { distance: 107, steps: 142660 },
      "海东市": { distance: 198, steps: 264000 },
      "甘南藏族自治州": { distance: 105, steps: 140000 },
    }
  },
  "甘南藏族自治州": {
    province: 'GS',
    location: { lat: 34.9733, lon: 102.9272 },
    icon: 'gannancangzuzizhizhou.png',
    neighbors: {
      "陇南市": { distance: 355, steps: 473330 },
      "定西市": { distance: 236, steps: 314660 },
      "临夏回族自治州": { distance: 105, steps: 140000 },
      "海东市": { distance: 260, steps: 346660 },
      "黄南藏族自治州": { distance: 145, steps: 193330 },
      "果洛藏族自治州": { distance: 352, steps: 469330 },
      "阿坝藏族羌族自治州": { distance: 488, steps: 650660 },
    }
  },
  "西宁市": {
    province: 'QH',
    location: { lat: 36.6171, lon: 101.7782 },
    icon: 'xiningshi.png',
    neighbors: {
      "海东市": { distance: 45, steps: 60000 },
      "海北藏族自治州": { distance: 122, steps: 162660 },
      "海南藏族自治州": { distance: 154, steps: 205330 },
    }
  },
  "海东市": {
    province: 'QH',
    location: { lat: 36.5029, lon: 102.1018 },
    icon: 'haidongshi.png',
    neighbors: {
      "兰州市": { distance: 229, steps: 305330 },
      "武威市": { distance: 232, steps: 309330 },
      "海北藏族自治州": { distance: 166, steps: 221330 },
      "西宁市": { distance: 45, steps: 60000 },
      "海南藏族自治州": { distance: 189, steps: 252000 },
      "黄南藏族自治州": { distance: 154, steps: 205330 },
      "甘南藏族自治州": { distance: 260, steps: 346660 },
      "临夏回族自治州": { distance: 198, steps: 264000 },
    }
  },
  "海北藏族自治州": {
    province: 'QH',
    location: { lat: 36.9541, lon: 100.901 },
    icon: 'haibeicangzuzizhizhou.png',
    neighbors: {
      "西宁市": { distance: 122, steps: 162660 },
      "海东市": { distance: 166, steps: 221330 },
      "武威市": { distance: 263, steps: 350660 },
      "张掖市": { distance: 312, steps: 416000 },
      "海西蒙古族藏族自治州": { distance: 470, steps: 626660 },
      "海南藏族自治州": { distance: 108, steps: 144000 },
    }
  },
  "黄南藏族自治州": {
    province: 'QH',
    location: { lat: 35.5172, lon: 102.0087 },
    icon: 'huangnancangzuzizhizhou.png',
    neighbors: {
      "甘南藏族自治州": { distance: 145, steps: 193330 },
      "海东市": { distance: 154, steps: 205330 },
      "海南藏族自治州": { distance: 214, steps: 285330 },
      "果洛藏族自治州": { distance: 278, steps: 370660 },
    }
  },
  "海南藏族自治州": {
    province: 'QH',
    location: { lat: 36.2982, lon: 100.6212 },
    icon: 'hainancangzuzizhizhou.png',
    neighbors: {
      "西宁市": { distance: 154, steps: 205330 },
      "海北藏族自治州": { distance: 108, steps: 144000 },
      "海西蒙古族藏族自治州": { distance: 463, steps: 617330 },
      "果洛藏族自治州": { distance: 288, steps: 384000 },
      "黄南藏族自治州": { distance: 214, steps: 285330 },
      "海东市": { distance: 189, steps: 252000 },
    }
  },
  "果洛藏族自治州": {
    province: 'QH',
    location: { lat: 34.4736, lon: 100.2475 },
    icon: 'guoluocangzuzizhizhou.png',
    neighbors: {
      "黄南藏族自治州": { distance: 278, steps: 370660 },
      "海南藏族自治州": { distance: 288, steps: 384000 },
      "海西蒙古族藏族自治州": { distance: 593, steps: 790660 },
      "玉树藏族自治州": { distance: 478, steps: 637330 },
      "甘孜藏族自治州": { distance: 725, steps: 966660 },
      "阿坝藏族羌族自治州": { distance: 477, steps: 636000 },
      "甘南藏族自治州": { distance: 352, steps: 469330 },
    }
  },
  "玉树藏族自治州": {
    province: 'QH',
    location: { lat: 33.0039, lon: 97.0087 },
    icon: 'yushucangzuzizhizhou.png',
    neighbors: {
      "果洛藏族自治州": { distance: 478, steps: 637330 },
      "海西蒙古族藏族自治州": { distance: 675, steps: 900000 },
      "巴音郭楞蒙古自治州": { distance: 1912, steps: 2549330 },
      "那曲市": { distance: 695, steps: 926660 },
      "昌都市": { distance: 292, steps: 389330 },
      "甘孜藏族自治州": { distance: 803, steps: 1070660 },
    }
  },
  "海西蒙古族藏族自治州": {
    province: 'QH',
    location: { lat: 37.3366, lon: 97.1461 },
    icon: 'haiximengguzucangzuzizhizhou.png',
    neighbors: {
      "海南藏族自治州": { distance: 463, steps: 617330 },
      "海北藏族自治州": { distance: 470, steps: 626660 },
      "酒泉市": { distance: 408, steps: 544000 },
      "巴音郭楞蒙古自治州": { distance: 1489, steps: 1985330 },
      "玉树藏族自治州": { distance: 675, steps: 900000 },
      "张掖市": { distance: 475, steps: 633330 },
      "果洛藏族自治州": { distance: 593, steps: 790660 },
    }
  },
  "银川市": {
    province: 'NX',
    location: { lat: 38.4864, lon: 106.2324 },
    icon: 'yinchuanshi.png',
    neighbors: {
      "石嘴山市": { distance: 85, steps: 113330 },
      "阿拉善盟": { distance: 89, steps: 118660 },
      "吴忠市": { distance: 77, steps: 102660 },
      "鄂尔多斯市": { distance: 464, steps: 618660 },
    }
  },
  "石嘴山市": {
    province: 'NX',
    location: { lat: 39.0177, lon: 106.3843 },
    icon: 'shizuishanshi.png',
    neighbors: {
      "乌海市": { distance: 114, steps: 152000 },
      "阿拉善盟": { distance: 91, steps: 121330 },
      "银川市": { distance: 85, steps: 113330 },
      "鄂尔多斯市": { distance: 420, steps: 560000 },
    }
  },
  "吴忠市": {
    province: 'NX',
    location: { lat: 37.9979, lon: 106.1994 },
    icon: 'wuzhongshi.png',
    neighbors: {
      "鄂尔多斯市": { distance: 502, steps: 669330 },
      "银川市": { distance: 77, steps: 102660 },
      "阿拉善盟": { distance: 147, steps: 196000 },
      "中卫市": { distance: 104, steps: 138660 },
      "庆阳市": { distance: 399, steps: 532000 },
      "榆林市": { distance: 436, steps: 581330 },
    }
  },
  "固原市": {
    province: 'NX',
    location: { lat: 36.0045, lon: 106.2852 },
    icon: 'guyuanshi.png',
    neighbors: {
      "庆阳市": { distance: 177, steps: 236000 },
      "中卫市": { distance: 242, steps: 322660 },
      "白银市": { distance: 283, steps: 377330 },
      "平凉市": { distance: 88, steps: 117330 },
    }
  },
  "中卫市": {
    province: 'NX',
    location: { lat: 37.4759, lon: 105.6774 },
    icon: 'zhongweishi.png',
    neighbors: {
      "吴忠市": { distance: 104, steps: 138660 },
      "阿拉善盟": { distance: 214, steps: 285330 },
      "白银市": { distance: 240, steps: 320000 },
      "固原市": { distance: 242, steps: 322660 },
      "庆阳市": { distance: 369, steps: 492000 },
    }
  },
  "乌鲁木齐市": {
    province: 'XJ',
    location: { lat: 43.8256, lon: 87.6168 },
    icon: 'wulumuqishi.png',
    neighbors: {
      "昌吉回族自治州": { distance: 46, steps: 61330 },
      "阿勒泰地区": { distance: 629, steps: 838660 },
      "巴音郭楞蒙古自治州": { distance: 362, steps: 482660 },
      "吐鲁番市": { distance: 224, steps: 298660 },
    }
  },
  "克拉玛依市": {
    province: 'XJ',
    location: { lat: 45.5798, lon: 84.883 },
    icon: 'kelamayishi.png',
    neighbors: {
      "塔城地区": { distance: 274, steps: 365330 },
    }
  },
  "吐鲁番市": {
    province: 'XJ',
    location: { lat: 42.9477, lon: 89.1847 },
    icon: 'tulufanshi.png',
    neighbors: {
      "哈密市": { distance: 495, steps: 660000 },
      "昌吉回族自治州": { distance: 270, steps: 360000 },
      "乌鲁木齐市": { distance: 224, steps: 298660 },
      "巴音郭楞蒙古自治州": { distance: 395, steps: 526660 },
    }
  },
  "哈密市": {
    province: 'XJ',
    location: { lat: 42.8333, lon: 93.5167 },
    icon: 'hamishi.png',
    neighbors: {
      "酒泉市": { distance: 757, steps: 1009330 },
      "昌吉回族自治州": { distance: 726, steps: 968000 },
      "吐鲁番市": { distance: 495, steps: 660000 },
      "巴音郭楞蒙古自治州": { distance: 865, steps: 1153330 },
    }
  },
  "昌吉回族自治州": {
    province: 'XJ',
    location: { lat: 44.0145, lon: 87.3043 },
    icon: 'changjihuizuzizhizhou.png',
    neighbors: {
      "阿勒泰地区": { distance: 604, steps: 805330 },
      "乌鲁木齐市": { distance: 46, steps: 61330 },
      "塔城地区": { distance: 636, steps: 848000 },
      "巴音郭楞蒙古自治州": { distance: 374, steps: 498660 },
      "吐鲁番市": { distance: 270, steps: 360000 },
      "哈密市": { distance: 726, steps: 968000 },
      "石河子市": { distance: 145, steps: 193330 },
    }
  },
  "博尔塔拉蒙古自治州": {
    province: 'XJ',
    location: { lat: 44.9033, lon: 82.2667 },
    icon: 'boertalamengguzizhizhou.png',
    neighbors: {
      "塔城地区": { distance: 298, steps: 397330 },
      "伊犁哈萨克自治州": { distance: 187, steps: 249330 },
    }
  },
  "巴音郭楞蒙古自治州": {
    province: 'XJ',
    location: { lat: 41.7675, lon: 86.1448 },
    icon: 'bayinguolengmengguzizhizhou.png',
    neighbors: {
      "酒泉市": { distance: 1490, steps: 1986660 },
      "哈密市": { distance: 865, steps: 1153330 },
      "吐鲁番市": { distance: 395, steps: 526660 },
      "乌鲁木齐市": { distance: 362, steps: 482660 },
      "昌吉回族自治州": { distance: 374, steps: 498660 },
      "塔城地区": { distance: 852, steps: 1136000 },
      "伊犁哈萨克自治州": { distance: 645, steps: 860000 },
      "阿克苏地区": { distance: 693, steps: 924000 },
      "和田地区": { distance: 1041, steps: 1388000 },
      "阿里地区": { distance: 1625, steps: 2166660 },
      "那曲市": { distance: 1763, steps: 2350660 },
      "玉树藏族自治州": { distance: 1912, steps: 2549330 },
      "海西蒙古族藏族自治州": { distance: 1489, steps: 1985330 },
    }
  },
  "阿克苏地区": {
    province: 'XJ',
    location: { lat: 41.1675, lon: 80.2647 },
    icon: 'akesudiqu.png',
    neighbors: {
      "巴音郭楞蒙古自治州": { distance: 693, steps: 924000 },
      "伊犁哈萨克自治州": { distance: 445, steps: 593330 },
      "克孜勒苏柯尔克孜自治州": { distance: 535, steps: 713330 },
      "喀什地区": { distance: 573, steps: 764000 },
      "和田地区": { distance: 633, steps: 844000 },
    }
  },
  "克孜勒苏柯尔克孜自治州": {
    province: 'XJ',
    location: { lat: 39.7134, lon: 76.1728 },
    icon: 'kezilesukeerkezizizhizhou.png',
    neighbors: {
      "阿克苏地区": { distance: 535, steps: 713330 },
      "喀什地区": { distance: 45, steps: 60000 },
    }
  },
  "喀什地区": {
    province: 'XJ',
    location: { lat: 39.4676, lon: 75.9897 },
    icon: 'kashidiqu.png',
    neighbors: {
      "阿克苏地区": { distance: 573, steps: 764000 },
      "克孜勒苏柯尔克孜自治州": { distance: 45, steps: 60000 },
      "和田地区": { distance: 605, steps: 806660 },
    }
  },
  "和田地区": {
    province: 'XJ',
    location: { lat: 37.1109, lon: 79.9253 },
    icon: 'hetiandiqu.png',
    neighbors: {
      "巴音郭楞蒙古自治州": { distance: 1041, steps: 1388000 },
      "阿克苏地区": { distance: 633, steps: 844000 },
      "喀什地区": { distance: 605, steps: 806660 },
      "阿里地区": { distance: 718, steps: 957330 },
    }
  },
  "伊犁哈萨克自治州": {
    province: 'XJ',
    location: { lat: 43.9139, lon: 81.3165 },
    icon: 'yilihasakezizhizhou.png',
    neighbors: {
      "巴音郭楞蒙古自治州": { distance: 645, steps: 860000 },
      "塔城地区": { distance: 478, steps: 637330 },
      "博尔塔拉蒙古自治州": { distance: 187, steps: 249330 },
      "阿克苏地区": { distance: 445, steps: 593330 },
    }
  },
  "塔城地区": {
    province: 'XJ',
    location: { lat: 46.7463, lon: 82.9834 },
    icon: 'tachengdiqu.png',
    neighbors: {
      "克拉玛依市": { distance: 274, steps: 365330 },
      "昌吉回族自治州": { distance: 636, steps: 848000 },
      "阿勒泰地区": { distance: 571, steps: 761330 },
      "博尔塔拉蒙古自治州": { distance: 298, steps: 397330 },
      "伊犁哈萨克自治州": { distance: 478, steps: 637330 },
      "巴音郭楞蒙古自治州": { distance: 852, steps: 1136000 },
    }
  },
  "阿勒泰地区": {
    province: 'XJ',
    location: { lat: 47.8483, lon: 88.1396 },
    icon: 'aletaidiqu.png',
    neighbors: {
      "塔城地区": { distance: 571, steps: 761330 },
      "昌吉回族自治州": { distance: 604, steps: 805330 },
      "乌鲁木齐市": { distance: 629, steps: 838660 },
    }
  },
  "石河子市": {
    province: 'XJ',
    location: { lat: 44.3054, lon: 86.0742 },
    icon: 'shihezishi.png',
    neighbors: {
      "昌吉回族自治州": { distance: 145, steps: 193330 },
    }
  },
  "呼和浩特市": {
    province: 'NMG',
    location: { lat: 40.8415, lon: 111.7508 },
    icon: 'huhehaoteshi.png',
    neighbors: {
      "乌兰察布市": { distance: 163, steps: 217330 },
      "朔州市": { distance: 249, steps: 332000 },
      "忻州市": { distance: 396, steps: 528000 },
      "鄂尔多斯市": { distance: 303, steps: 404000 },
      "包头市": { distance: 230, steps: 306660 },
    }
  },
  "锡林郭勒盟": {
    province: 'NMG',
    location: { lat: 43.9388, lon: 116.0911 },
    icon: 'xilinmeng.png',
    neighbors: {
      "兴安盟": { distance: 738, steps: 984000 },
      "通辽市": { distance: 693, steps: 924000 },
      "赤峰市": { distance: 418, steps: 557330 },
      "承德市": { distance: 513, steps: 684000 },
      "张家口市": { distance: 513, steps: 684000 },
      "乌兰察布市": { distance: 568, steps: 757330 },
    }
  },
  "包头市": {
    province: 'NMG',
    location: { lat: 40.6581, lon: 109.8189 },
    icon: 'baotoushi.png',
    neighbors: {
      "乌兰察布市": { distance: 393, steps: 524000 },
      "呼和浩特市": { distance: 230, steps: 306660 },
      "鄂尔多斯市": { distance: 164, steps: 218660 },
      "巴彦淖尔市": { distance: 288, steps: 384000 },
    }
  },
  "鄂尔多斯市": {
    province: 'NMG',
    location: { lat: 39.6087, lon: 109.7811 },
    icon: 'eerduosishi.png',
    neighbors: {
      "包头市": { distance: 164, steps: 218660 },
      "呼和浩特市": { distance: 303, steps: 404000 },
      "忻州市": { distance: 403, steps: 537330 },
      "榆林市": { distance: 207, steps: 276000 },
      "吴忠市": { distance: 502, steps: 669330 },
      "银川市": { distance: 464, steps: 618660 },
      "石嘴山市": { distance: 420, steps: 560000 },
      "乌海市": { distance: 355, steps: 473330 },
      "阿拉善盟": { distance: 510, steps: 680000 },
      "巴彦淖尔市": { distance: 335, steps: 446660 },
    }
  },
  "阿拉善盟": {
    province: 'NMG',
    location: { lat: 38.8451, lon: 105.6702 },
    icon: 'alashanmeng.png',
    neighbors: {
      "巴彦淖尔市": { distance: 360, steps: 480000 },
      "鄂尔多斯市": { distance: 510, steps: 680000 },
      "乌海市": { distance: 189, steps: 252000 },
      "石嘴山市": { distance: 91, steps: 121330 },
      "银川市": { distance: 89, steps: 118660 },
      "吴忠市": { distance: 147, steps: 196000 },
      "中卫市": { distance: 214, steps: 285330 },
      "白银市": { distance: 405, steps: 540000 },
      "武威市": { distance: 397, steps: 529330 },
      "金昌市": { distance: 427, steps: 569330 },
      "张掖市": { distance: 633, steps: 844000 },
      "酒泉市": { distance: 876, steps: 1168000 },
    }
  },
  "乌海市": {
    province: 'NMG',
    location: { lat: 39.6635, lon: 106.8255 },
    icon: 'wuhaishi.png',
    neighbors: {
      "鄂尔多斯市": { distance: 355, steps: 473330 },
      "石嘴山市": { distance: 114, steps: 152000 },
      "阿拉善盟": { distance: 189, steps: 252000 },
    }
  },
  "赤峰市": {
    province: 'NMG',
    location: { lat: 42.2581, lon: 118.9527 },
    icon: 'chifengshi.png',
    neighbors: {
      "通辽市": { distance: 434, steps: 578660 },
      "朝阳市": { distance: 204, steps: 272000 },
      "承德市": { distance: 234, steps: 312000 },
      "锡林郭勒盟": { distance: 418, steps: 557330 },
    }
  },
  "通辽市": {
    province: 'NMG',
    location: { lat: 43.6526, lon: 122.2444 },
    icon: 'tongliaoshi.png',
    neighbors: {
      "兴安盟": { distance: 378, steps: 504000 },
      "白城市": { distance: 270, steps: 360000 },
      "松原市": { distance: 369, steps: 492000 },
      "四平市": { distance: 250, steps: 333330 },
      "铁岭市": { distance: 281, steps: 374660 },
      "沈阳市": { distance: 318, steps: 424000 },
      "阜新市": { distance: 263, steps: 350660 },
      "朝阳市": { distance: 383, steps: 510660 },
      "赤峰市": { distance: 434, steps: 578660 },
      "锡林郭勒盟": { distance: 693, steps: 924000 },
    }
  },
  "呼伦贝尔市": {
    province: 'NMG',
    location: { lat: 49.2117, lon: 119.7656 },
    icon: 'hulunbeiershi.png',
    neighbors: {
      "大兴安岭地区": { distance: 688, steps: 917330 },
      "黑河市": { distance: 798, steps: 1064000 },
      "齐齐哈尔市": { distance: 519, steps: 692000 },
      "兴安盟": { distance: 545, steps: 726660 },
    }
  },
  "巴彦淖尔市": {
    province: 'NMG',
    location: { lat: 40.7436, lon: 107.3883 },
    icon: 'bayannaoershi.png',
    neighbors: {
      "包头市": { distance: 288, steps: 384000 },
      "鄂尔多斯市": { distance: 335, steps: 446660 },
      "阿拉善盟": { distance: 360, steps: 480000 },
    }
  },
  "乌兰察布市": {
    province: 'NMG',
    location: { lat: 41.026, lon: 113.1145 },
    icon: 'wulanchabushi.png',
    neighbors: {
      "锡林郭勒盟": { distance: 568, steps: 757330 },
      "张家口市": { distance: 213, steps: 284000 },
      "大同市": { distance: 150, steps: 200000 },
      "忻州市": { distance: 409, steps: 545330 },
      "呼和浩特市": { distance: 163, steps: 217330 },
      "包头市": { distance: 393, steps: 524000 },
    }
  },
  "兴安盟": {
    province: 'NMG',
    location: { lat: 46.0762, lon: 122.0703 },
    icon: 'xinganmeng.png',
    neighbors: {
      "呼伦贝尔市": { distance: 545, steps: 726660 },
      "齐齐哈尔市": { distance: 281, steps: 374660 },
      "白城市": { distance: 139, steps: 185330 },
      "通辽市": { distance: 378, steps: 504000 },
      "锡林郭勒盟": { distance: 738, steps: 984000 },
    }
  },
  "台北市": {
    province: 'TW',
    location: { lat: 25.033, lon: 121.5654 },
    icon: 'taibeishi.png',
    neighbors: {
      "福州市": { distance: 358, steps: 477330 },
      "新北市": { distance: 15, steps: 20000 },
    }
  },
  "新北市": {
    province: 'TW',
    location: { lat: 25.012, lon: 121.4657 },
    icon: 'xinbeishi.png',
    neighbors: {
      "台北市": { distance: 15, steps: 20000 },
      "桃园市": { distance: 24, steps: 32000 },
    }
  },
  "桃园市": {
    province: 'TW',
    location: { lat: 24.9936, lon: 121.301 },
    icon: 'taoyuanshi.png',
    neighbors: {
      "新北市": { distance: 24, steps: 32000 },
      "台中市": { distance: 159, steps: 212000 },
    }
  },
  "台中市": {
    province: 'TW',
    location: { lat: 24.1477, lon: 120.6736 },
    icon: 'taizhongshi.png',
    neighbors: {
      "桃园市": { distance: 159, steps: 212000 },
      "台南市": { distance: 190, steps: 253330 },
      "泉州市": { distance: 305, steps: 406660 },
    }
  },
  "台南市": {
    province: 'TW',
    location: { lat: 22.9998, lon: 120.2269 },
    icon: 'tainanshi.png',
    neighbors: {
      "台中市": { distance: 190, steps: 253330 },
      "高雄市": { distance: 59, steps: 78660 },
    }
  },
  "高雄市": {
    province: 'TW',
    location: { lat: 22.6273, lon: 120.3014 },
    icon: 'gaoxiongshi.png',
    neighbors: {
      "台南市": { distance: 59, steps: 78660 },
      "厦门市": { distance: 428, steps: 570660 },
    }
  },
  "香港特别行政区": {
    province: 'HK',
    location: { lat: 22.3193, lon: 114.1694 },
    icon: 'xianggangtebiexingzhengqu.png',
    neighbors: {
      "珠海市": { distance: 86, steps: 114660 },
    }
  },
  "澳门特别行政区": {
    province: 'MO',
    location: { lat: 22.1987, lon: 113.5439 },
    icon: 'aomentebiexingzhengqu.png',
    neighbors: {
      "深圳市": { distance: 92, steps: 122660 },
    }
  },
};

module.exports.citiesData = citiesData;
