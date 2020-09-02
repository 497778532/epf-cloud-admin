<template>
  <div id="integration-main"
       class="main-container">
    <div class="map-box">
      <epf-mapview name="mapapp100"
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
        <span class="title-text">集成评价</span>
      </div>
      <div class="sidebar-content"
           v-loading="loading">
        <!-- <div class="sidebar-content-header"></div> -->
        <div class="sidebar-content-main">
          <div v-for="(item,index) in activeItem.items"
               :key="index"
               style="padding: 5px 0;">
            <div class="item-header">
              <div class="item-name">
                <div :style="getStyle(item.name)">•</div>
                {{item.name}}
              </div>
              <div class="item-score">{{item.score}}级</div>
            </div>
            <div class="item-intro text-wrapper">{{item.intro1}}</div>
            <div v-if="item.hasTable">
              <table ref="gridtable"></table>
              <div class="item-intro text-wrapper">{{item.intro2}}</div>
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
  name: 'integration',
  data () {
    return {
      activeTitle: '',
      activeItem: null,
      loading: false,
      options: {
        year: '2019',
        province: '440000'
      },
      widgetConf: {
        widgets: []
      },
      assessItemList: []
    }
  },
  methods: {
    handleItemChange ({ title, item }) {
      // this.activeTitle = title;
      // this.activeItem = item;
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
    updateData () {
      this.loading = true
      let params = this.options
      let that = this
      that
        .$get(
          '/epf-monitor-bearer/beaIntegratedEvaluation/getAreaOneAssess',
          params
        )
        .then(res => {
          console.log(res)

          if (res.code === 0) {
            that.updateRight(res.area)
          }
        })
        .catch(err => {
          console.log(err)
          that.loading = false
        })
      this.loading = false
    },
    updateRight (data) {
      if (!data) return
      let list = this.assessItemList[0].items
      list.forEach(item => {
        item.score = data[item.id]
      })
    },
    getStyle (name) {
      let color = '#030303'
      if (name === '生态保护等级') {
        color = '#70B603'
      } else if (name === '农业功能指向的承载等级评价') {
        color = '#F0760C'
      } else if (name === '建筑功能指向的承载等级评价') {
        color = '#1D7CE4'
      }
      return {
        color: color,
        marginRight: '5px'
      }
    },
    getIcon (name) {
      let url
      if (name === '高') {
        url = require('@/assets/images/czjcyj/jc-higher.png')
      } else if (name === '较高') {
        url = require('@/assets/images/czjcyj/jc-high.png')
      } else if (name === '中') {
        url = require('@/assets/images/czjcyj/jc-middle.png')
      } else if (name === '较低') {
        url = require('@/assets/images/czjcyj/jc-low.png')
      } else if (name === '低') {
        url = require('@/assets/images/czjcyj/jc-lower.png')
      }
      return url
    },
    renderTable (index) {
      let $ = document
      let tableData = [
        { prop: '高', row: ['Ⅴ', 'Ⅴ', 'Ⅳ', 'Ⅲ', 'Ⅰ'] },
        { prop: '较高', row: ['Ⅴ', 'Ⅳ', 'Ⅳ', 'Ⅱ', 'Ⅰ'] },
        { prop: '中', row: ['Ⅳ', 'Ⅳ', 'Ⅲ', 'Ⅱ', 'Ⅰ'] },
        { prop: '较低', row: ['Ⅲ', 'Ⅲ', 'Ⅱ', 'Ⅰ', 'Ⅰ'] },
        { prop: '低', row: ['Ⅱ', 'Ⅰ', 'Ⅰ', 'Ⅰ', 'Ⅰ'] }
      ]
      let table = this.$refs.gridtable[index]
      let tr, td, th, th1, th2
      let name = index === 0 ? '农业' : '建筑'

      tr = $.createElement('tr')

      th1 = $.createElement('th')
      th1.setAttribute('colspan', 2)
      th1.setAttribute('rowspan', 2)
      th1.innerHTML = `${name}功能指向\n承载等级判定`

      th2 = $.createElement('th')
      th2.setAttribute('colspan', 5)
      th2.innerHTML = `${name}功能指向的土地资源可利用程度`

      tr.appendChild(th1)
      tr.appendChild(th2)
      table.appendChild(tr)

      let props = ['高', '较高', '中', '较低', '低']

      let col2 = $.createElement('tr')
      for (let i = 0; i < 5; i++) {
        th = $.createElement('th')
        th.innerHTML = props[i]
        col2.appendChild(th)
      }
      table.appendChild(col2)

      for (let i = 0; i < 5; i++) {
        tr = $.createElement('tr')
        if (i === 0) {
          let col1 = $.createElement('td')
          col1.setAttribute('rowspan', 5)
          col1.innerHTML = '水资源\n可利用程度'
          tr.appendChild(col1)
        }
        let label = $.createElement('td')
        label.innerHTML = tableData[i].prop
        tr.appendChild(label)

        for (let j = 0; j < 5; j++) {
          td = $.createElement('td')
          td.innerHTML = tableData[i].row[j]
          tr.appendChild(td)
        }
        table.append(tr)
      }
      this.$refs.gridtable[index].classList.add('gridtable')
    },
    init () {
      this.assessItemList = [
        {
          title: '生态保护等级',
          items: [
            {
              name: '生态保护等级',
              id: 'ecoSystemProtectedLevName',
              score: 'Ⅲ',
              intro1: `评价方法：
生态保护等以生态重要性和敏感性评价中级别高的为准，不重要/不敏感、一般重要/一般敏感、中等重要/中等敏感、高度重要/高度敏感、极重要/极敏感对应的生态保护等级为Ⅰ级、Ⅱ级、Ⅲ级、Ⅳ级、Ⅴ级。`,
              hasTable: false
            },
            {
              name: '农业功能指向的承载等级评价',
              id: 'agicProtectedLevName',
              score: 'Ⅲ',
              intro1: `评价方法：
首先，基于农业功能指向的土地资源可利用程度和水资源可利用程度判定农业功能指向的承载等级（如下表所示）：`,
              intro2: '农业功能指向的承载等级判定然后，结合自然灾害危险性，把承载等级为Ⅴ、Ⅳ级但自然灾害危险性高的区域调整为Ⅲ级。',
              hasTable: true
            },
            {
              name: '建筑功能指向的承载等级评价',
              id: 'townProtectedLevName',
              score: 'Ⅲ',
              intro1: `评价方法：
首先，基于建设功能指向的土地资源可利用程度和水资源可利用程度判定建设功能指向的承载等级，如下表所示：`,
              intro2: '建设功能指向的承载等级判定然后，结合自然灾害危险性，把承载等级为Ⅴ级或Ⅳ级，但自然灾害危险性高的区域调整为Ⅲ级，把承载等级为Ⅴ级。但自然灾害危险性较高的区域调整为Ⅳ级。',
              hasTable: true
            }
          ]
        },
        { title: '农业承载力等级' },
        { title: '城镇承载力等级' }
      ]
    }
  },

  created () {
    this.init() // 加载静态数据
    this.activeItem = this.assessItemList[0]
    this.activeTitle = this.activeItem.title
    this.updateData(this.options)
  },
  mounted () {
    this.renderTable(0)
    this.renderTable(1)
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
.item {
  width: 50%;
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 1px;
}

.item-header {
  padding: 10px 0;
  position: relative;
}

.item-name {
  font-weight: bold;
  display: inline-flex;
}

.item-score {
  color: #ffa200;
  display: inline-flex;
  margin-left: 10px;
}

.sidebar .side-bar-title {
  height: 60px;
  background: rgb(242, 242, 242);
  font-size: 18px;
  font-weight: bold;
  color: rgba(32, 32, 32, 1);
}

.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border: 1px solid #979797;
  border-collapse: collapse;
  text-align: center;
  margin: 0 auto;
}

.gridtable >>> th {
  padding: 2px 8px;
  border: 1px solid #979797;
  background-color: #e8eaf6;
  color: #4f4f4f;
}

.gridtable >>> td {
  padding: 8px;
  border: 1px solid #979797;
  background-color: #ffffff;
}

.gridtable >>> tr:nth-child(3) > td:first-child {
  width: 60px;
  white-space: pre-wrap;
}

.gridtable >>> tr:first-child th:first-child {
  width: 80px;
  white-space: pre-wrap;
}
</style>
