<template>
  <div id="single-main"
       class="main-container">
    <div class="map-box">
      <epf-mapview name="mapapp101"
                   :delay="1"
                   class="mapapp"
                   :widgetConf="widgetConf">
        <div class="toolbar">
          <jumpto-item @changeCity="handleCityChange"></jumpto-item>
          <zoom-item></zoom-item>
          <pan-item></pan-item>
        </div>
        <jumpto-panel></jumpto-panel>
      </epf-mapview>
      <epf-floatbar :listData="assessItemList"
                    @itemChange="handleItemChange"></epf-floatbar>
      <epf-stepper @yearChange="handleYearChange"></epf-stepper>
    </div>

    <div class="sidebar">
      <div class="sidebar-title flex-center">
        <div class="title-icon"></div>
        <span class="title-text">{{activeTitle}}</span>
      </div>
      <div class="sidebar-content"
           v-loading="loading">
        <div class="sidebar-content-header">
          <div style="display: flex;align-items: center;">{{activeItem.title.replace("评价", "")}}可利用程度评价等级</div>
          <div class="icon-item-img header-icon">
            <img v-if="activeItem.score"
                 :src="getIcon(activeItem.score)"
                 alt />
            <img v-if="activeItem.score1"
                 :src="getIcon(activeItem.score1)"
                 alt />
            <img v-if="activeItem.score2"
                 :src="getIcon(activeItem.score2)"
                 alt />
          </div>
        </div>
        <div class="sidebar-content-main">
          <div v-for="(item,index) in activeItem.items"
               :key="index"
               style="padding: 5px 0; position: relative">
            <div class="item-name text-wrapper">• {{item.name}}</div>
            <div class="item-score">
              <img v-if="item.score"
                   :src="getIcon(item.score)"
                   alt />
            </div>
            <div v-if="item.iconList"
                 class="content-with-icon">
              <div v-for="(iconItem, iconIndex) in item.iconList"
                   :key="iconIndex"
                   :class="{'icon-item': true, 'icon-item--long': (iconItem.name.length > 4)}">
                <div class="icon-item-text">{{iconItem.name}}</div>
                <div v-if="iconItem.unit"
                     class="icon-item-score">
                  {{iconItem.score}}
                  <div class="icon-item-unit">{{iconItem.unit}}</div>
                </div>
                <div v-else
                     class="icon-item-img">
                  <img :src="getIcon(iconItem.score)"
                       alt />
                </div>
              </div>
            </div>
            <div v-if="item.method"
                 class="content-with-method text-wrapper">
              <div>{{item.method}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ZoomItem from './../../onemap/toolbarItem/zoom'
import PanItem from './../../onemap/toolbarItem/pan/widget'
import JumptoItem from './../../onemap/toolbarItem/jumpTo/item'
import JumptoPanel from '../../onemap/toolbarItem/jumpTo/widget'
import EpfStepper from './../common/epf-stepper'
import EpfFloatbar from './../common/epf-floatbar'

export default {
  name: 'single',
  data () {
    return {
      activeTitle: '',
      activeItem: null,
      widgetConf: {
        widgets: []
      },
      assessItemList: [],
      loading: false,
      options: {
        year: '2019',
        province: '440000'
      }
    }
  },
  methods: {
    handleItemChange ({ title, item }) {
      this.activeTitle = title
      this.activeItem = item
    },
    handleYearChange ({ year }) {
      this.options.year = year
      this.updateData()
    },
    handleCityChange (city) {
      if (city !== '440000') {
        this.options.city = city
      } else {
        this.options.city = null
      }
      this.updateData()
    },
    async updateData () {
      this.loading = true
      let params = this.options
      let that = this
      await that
        .$get('/epf-monitor-bearer/beanlandResouce/getAreaOneAssess', params)
        .then(res => {
          if (res.code === 0) {
            that.updateRight('土地资源评价', res.area)
          }
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
      await that
        .$get('/epf-monitor-bearer/beaWaterResouce/getAreaOneAssess', params)
        .then(res => {
          if (res.code === 0) {
            that.updateRight('水资源评价', res.area)
          }
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
      await that
        .$get('/epf-monitor-bearer/beaEcoSystem/getAreaOneAssess', params)
        .then(res => {
          if (res.code === 0) {
            that.updateRight('生态环境评价', res.area)
          }
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
      await that
        .$get('/epf-monitor-bearer/beaNaturalDisater/getAreaOneAssess', params)
        .then(res => {
          if (res.code === 0) {
            that.updateRight('自然灾害评价', res.area)
          }
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
      this.loading = false
    },
    getIcon (name) {
      let url
      if (name === '较高') {
        url = require('@/assets/images/czjcyj/jc-higher.png')
      } else if (name === '高') {
        url = require('@/assets/images/czjcyj/jc-high.png')
      } else if (name === '中等') {
        url = require('@/assets/images/czjcyj/jc-middle.png')
      } else if (name === '较低') {
        url = require('@/assets/images/czjcyj/jc-low.png')
      } else if (name === '低') {
        url = require('@/assets/images/czjcyj/jc-lower.png')
      } else if (name === '不重要') {
        url = require('@/assets/images/czjcyj/jc-important-1.png')
      } else if (name === '一般重要') {
        url = require('@/assets/images/czjcyj/jc-important-2.png')
      } else if (name === '中等重要') {
        url = require('@/assets/images/czjcyj/jc-important-3.png')
      } else if (name === '高度重要') {
        url = require('@/assets/images/czjcyj/jc-important-4.png')
      } else if (name === '极重要') {
        url = require('@/assets/images/czjcyj/jc-important-5.png')
      } else if (name === '不敏感') {
        url = require('@/assets/images/czjcyj/jc-sensitive-1.png')
      } else if (name === '敏感') {
        url = require('@/assets/images/czjcyj/jc-sensitive-2.png')
      } else if (name === '中等敏感') {
        url = require('@/assets/images/czjcyj/jc-sensitive-3.png')
      } else if (name === '高度敏感') {
        url = require('@/assets/images/czjcyj/jc-sensitive-4.png')
      } else if (name === '极敏感') {
        url = require('@/assets/images/czjcyj/jc-sensitive-5.png')
      }
      return url
    },
    updateRight (title, data) {
      console.log(title, data)
      if (!data) return
      let list = this.assessItemList.find(e => e.title === title)

      if (list.hasOwnProperty('score')) {
        list.score = data[list.id]
      } else {
        list.score1 = data[list.id1]
        list.score2 = data[list.id2]
      }
      list.items.forEach(e => {
        if (e.hasOwnProperty('id')) {
          e.score = data[e.id]
        }

        if (e.hasOwnProperty('iconList')) {
          let items = e.iconList
          for (let item of items) {
            item.score = data[item.id]
          }
        }
      })
    },
    init () {
      this.assessItemList = [
        {
          title: '土地资源评价',
          id: 'landLevelName',
          score: '较高',
          items: [
            {
              name: '农业功能指向的土地资源可利用程度评价',
              iconList: [
                {
                  name: '土壤环境',
                  id: 'agroSoilName',
                  score: '低'
                },
                {
                  name: '土壤质地',
                  id: 'agroSoilTextureName',
                  score: '低'
                },
                {
                  name: '水环境',
                  id: 'agroWaterName',
                  score: '低'
                },
                {
                  name: '坡度',
                  id: 'agroSlopeName',
                  score: '较低'
                },
                {
                  name: '土层厚度',
                  id: 'agroSoilThicknessName',
                  score: '中等'
                },
                {
                  name: '微观地貌',
                  id: 'agroMicroLandformName',
                  score: '较高'
                },
                {
                  name: '生态重要性和敏感性',
                  id: 'agroImportanceName',
                  score: '较低'
                }
              ]
            },
            {
              name: '建设功能指向的土地资源可利用程度评价',
              iconList: [
                {
                  name: '坡度',
                  id: 'erectSlopeName',
                  score: '低'
                },
                {
                  name: '水域',
                  id: 'erectWatersName',
                  score: '较高'
                },
                {
                  name: '耕地质量',
                  id: 'erectTillQualityName',
                  score: '较低'
                },
                {
                  name: '蓄滞洪区',
                  id: 'erectFloodAreaName',
                  score: '较高'
                },
                {
                  name: '地质灾害易发程度',
                  id: 'erectGeologicalHazardName',
                  score: '中等'
                },
                {
                  name: '生态重要性和敏感性',
                  id: 'erectImportanceName',
                  score: '较低'
                }
              ]
            }
          ]
        },
        {
          title: '水资源评价',
          id: 'evaluationLevelName',
          score: '低',
          items: [
            {
              name: '地表水可利用程度评价',
              iconList: [
                {
                  name: '地表水资源可利用量',
                  id: 'surfaceAmount',
                  score: '52421.32',
                  unit: '亿立方米'
                },
                {
                  name: '地下水资源可开采量',
                  id: 'groundAmount',
                  score: '52421.32',
                  unit: '亿立方米'
                }
              ]
            },
            {
              name: '计算方法：',
              method: `Q 总＝Q 地表＋Q 地下－Q 重 Q 重＝ρ（Q 渠＋Q 田）
公式中：
Q 总——水资源可利用总量；
Q 地表——地表水资源可利用量；
Q 地下——浅层地下水资源可开采量；
Q 重——地表水资源可利用量与地下水资源可开采量之间重
复计算量；
Q 渠——渠系渗漏补给量；
Q 田——田间地表水灌溉入渗补给量；
ρ——可开采系数，是可开采量与地下水资源量的比值。`
            }
          ]
        },
        {
          title: '生态环境评价',
          score1: '一般重要',
          id1: 'ecosystemImportLevelName',
          score2: '敏感',
          id2: 'ecosystemSensitiveLevelName',
          items: [
            {
              name: '生态重要性',
              iconList: [
                {
                  name: '水源涵养功能重要性分级',
                  id: 'waterConservationName',
                  score: '一般重要'
                },
                {
                  name: '生物多样性维护功能重要性分级',
                  id: 'biodiversityName',
                  score: '中等重要'
                }
              ]
            },
            {
              name: '生态敏感性',
              iconList: [
                {
                  name: '水土流失敏感性分级',
                  id: 'soilErosionName',
                  score: '敏感'
                },
                {
                  name: '石漠化敏感性分级',
                  id: 'rockyDeserName',
                  score: '敏感'
                }
              ]
            }
          ]
        },
        {
          title: '自然灾害评价',
          id: 'disasterLevelName',
          score: '较低',
          items: [
            {
              name: '农业功能指向的自然灾害危险性评价\r\n评价方法：',
              id: 'agricultureAssessName',
              score: '中等',
              method: `评价方法：
评价方法分为两种，一是基于历史事件预测，二是基于自然情况预测。
（1）基于历史事件预测
统计评价区域历史上（至少为近 10 年）发生特别重大（I）、
重大（II）、较大（III）洪涝、干旱、冻害等自然灾害发生情况（灾害等级、影响范围、经济损失、受灾人口等），根据灾害影响范围落实到空间上。采用基于历史事件的自然灾害发生概率预测模型（假设一年内洪涝、干旱、冻害等自然灾害的发生次数服从泊松分布）对评价单元发生特别重大（I）、重大（II）、较大（III）洪涝、干旱、冻害等自然灾害的概率、损失情况进行预测。
（2）基于自然情况预测
从致灾因子、孕灾环境、承载体状况、防灾减灾能力等方面
选取指标进行洪涝、干旱、冻害等自然灾害危险性预测，可参考
《气象灾害风险评估技术指南》（姜彤、王艳君、翟建青主编，
气象出版社，2018 年 8 月出版）中的相关方法。`
            },
            {
              name: '建设功能指向的自然灾害危险性评价',
              id: 'bildAssessName',
              score: '中等',
              iconList: [
                {
                  name: '崩塌滑坡泥石流危险性',
                  id: 'debrisFlowAssessName',
                  score: '中等'
                },
                { name: '岩溶塌陷危险性', id: 'lavaAssessName', score: '较低' },
                { name: '采空塌陷危险性', id: 'sinkAssessName', score: '中等' }
              ]
            }
          ]
        }
      ]
    }
  },

  created () {
    this.init()
    this.activeItem = this.assessItemList[0]
    this.activeTitle = this.activeItem.title
    this.updateData(this.options)
  },
  components: {
    ZoomItem,
    PanItem,
    JumptoItem,
    EpfStepper,
    EpfFloatbar,
    JumptoPanel
  }
}
</script>
<style scoped src="../css/style.css"></style>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
.item-name {
  font-size: 14px;
  font-weight: bold;
  margin: 15px 0;
}

.icon-item {
  position: relative;
  width: 50%;
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 1px;
}

.icon-item--long {
  width: 100%;
}
.main-container {
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
}
.map-box {
  width: calc(100% - 420px);
}
.sidebar {
  width: 400px;
  margin-left: 15px;
}

.sidebar-content-header .icon-item-img {
  position: relative;
  margin-left: 10px;
}

.item-score {
  position: absolute;
  top: 15px;
  left: 250px;
}

/* .icon-item--long .icon-item-img {
  right: 160px;
} */

.icon-item-img {
  position: absolute;
  right: 10px;
  bottom: 3px;
}

.icon-item-text {
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 16px;
  height: 44px;
}

.icon-item-unit {
  display: inline-block;
  margin-left: 10px;
  color: #707070;
  font-weight: normal;
  font-size: 14px;
}

.icon-item-score {
  display: inline-block;
  margin-left: 10px;
  color: #ffa200;
  font-weight: bold;
  font-size: 18px;
}

.header-icon {
  display: flex;
  align-items: center;
}
</style>
