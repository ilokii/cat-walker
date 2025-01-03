# 小猫计步器

## 项目简介
小猫计步器是一个创新的微信小程序，通过将用户的每日步数转化为虚拟旅行距离，让用户在走路健身的同时，体验游历中国各地的乐趣。

## 功能特点
- 自动定位：获取用户当前所在城市作为起点
- 步数同步：自动同步微信运动的步数数据
- 虚拟旅行：将步数转换为旅行距离（1.5米=2步）
- 城市探索：支持查看全国城市地图和已到访城市
- 进度追踪：实时显示到达目标城市的进度
- 成就系统：记录已到访的城市和省份

## 技术架构
- 前端框架：微信小程序原生框架
- 数据存储：微信小程序本地存储
- 地理位置：微信位置服务
- 步数数据：微信运动步数API

## 目录结构
project/
├── pages/
│   ├── index/             # 主页
│   ├── citySelect/        # 城市选择页面
│   └── cityView/          # 城市查看页面
├── components/            # 公共组件
├── utils/                 # 工具函数
│   └── distance.js        # 距离计算工具
├── services/              # 服务层
│   └── cityService.js     # 城市数据服务
├── data/                  # 城市数据
│   └── cities.js         # 省份和城市数据
└── app.js                # 应用入口

## 数据模块说明
- cities.js: 包含城市基础数据
  - citiesData: 城市详细信息（省份、坐标、相邻城市、距离、步数）
  - provinceIndex: 省份城市索引
  - 工具函数：
    - getCityProvince: 获取城市所属省份
    - getNeighborCities: 获取相邻城市列表
    - getDistanceBetweenCities: 获取城市间距离
    - getStepsBetweenCities: 获取城市间步数
- cityService.js: 提供城市数据相关的服务
  - getNeighborCities: 获取相邻城市
  - calculateStepsBetweenCities: 计算城市间步数
  - findProvinceByCity: 查找城市所属省份
- distance.js: 提供距离计算相关工具
  - calculateDistance: 计算两点间距离
  - distanceToSteps: 将距离转换为步数 