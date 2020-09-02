<template>
  <div id="dms-main"
       class="main-container">
    <div class="map-box">
      <epf-mapview name="mapapp102"
                   :delay="1"
                   class="mapapp"
                   :widgetConf="widgetConf"
                   v-if="isBasemapShow">
        <div class="toolbar">
          <jumpto-item @changeCity="handleCityChange"></jumpto-item>
          <zoom-item></zoom-item>
          <pan-item></pan-item>
        </div>
        <jumpto-panel></jumpto-panel>
      </epf-mapview>
      <div id="ecMap"
           ref="chinaChart"
           class="mapapp"
           v-else></div>
      <div v-if="!isBasemapShow"
           class="toolbar">
        <jumpto-item @changeCity="handleCityChange"></jumpto-item>
        <zoom-item></zoom-item>
        <pan-item></pan-item>
      </div>
      <epf-floatbar :listData="assessItemList"
                    @itemChange="handleItemChange"></epf-floatbar>
      <epf-stepper @yearChange="handleYearChange"></epf-stepper>
    </div>
    <div class="sidebar">
      <div class="sidebar-title flex-center">
        <div class="title-icon"></div>
        <span class="title-text">{{ activeTitle }}</span>
      </div>
      <div class="sidebar-content"
           v-loading="loading">
        <div class="sidebar-content-main">
          <div class="item-name item-name-jg">• 评价描述</div>
          <div class="item-intro-content">{{ activeItem.intro }}</div>
          <div v-for="(item, index) in activeItem.items"
               :key="index"
               style="padding: 5px 0;">
            <div class="item-name">• {{ item.name }}</div>
            <div v-if="item.hasCharts">
              <div v-for="chart in item.chartsID"
                   :key="chart"
                   :id="chart"
                   class="chart"></div>
            </div>
            <div v-else>
              <div class="rldata"
                   v-for="(item,index) in airList"
                   :key="index">
                <p class="rldata-p0">
                  <span>{{item.scoreName}}</span>
                </p>
                <p class="rldata-p1">
                  <img :src="getIcon(item.score)"
                       alt />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'

import ZoomItem from './../../onemap/toolbarItem/zoom'
import PanItem from './../../onemap/toolbarItem/pan/widget'
import JumptoItem from './../../onemap/toolbarItem/jumpTo/item'
import JumptoPanel from '../../onemap/toolbarItem/jumpTo/widget'
import EpfStepper from './../common/epf-stepper'
import EpfFloatbar from './../common/epf-floatbar'
import chartsUtils from '../common/chartsUtils'

export default {
  name: 'DecisionMakingSupport',
  data () {
    return {
      activeTitle: '',
      activeItem: null,
      loading: false,
      isBasemapShow: true,
      widgetConf: {
        widgets: []
      },
      options: {
        year: '2019',
        province: '440000'
      },
      assessItemList: [
        {
          title: '资源利用评价',
          intro:
            '通过自然资源业务管理数据统计及深度分析，准确评价自然资源业务现状，剖析自然资源利用潜力，结合自然资源规划配置与社会经济发展数据，探索挖掘相互作用关系，为国土空间生态保护修复、助推资源集约节约利用、释放经济价值效益、拓宽经济社会发展空间提供决策依据。',
          items: [
            {
              name: '资源资产量化分析',
              hasCharts: true,
              chartsID: ['landuse', 'mineral', 'ocean', 'forest', 'water']
            }
          ]
        },
        {
          title: '生态修复评价',
          intro:
            '是在生态学原理指导下，以生物修复为基础，结合各种物理修复、化学修复以及工程技术措施，通过优化组合，使之达到最佳效果和最低耗费的一种综合的修复污染环境的方法',
          items: [
            {
              name: '生态修复量化分析',
              hasCharts: true,
              chartsID: ['zoology']
            }
          ]
        },
        {
          title: '大气环境质量评价',
          intro:
            '是指根据不同的目的和要求，按照一定的原则和评价标准，用一定的评价方法对大气环境质量的优劣进行定性或定量的评估。',
          items: [
            {
              name: '大气环境容量分析',
              hasCharts: false
            }
          ]
        },
        {
          title: '水环境质量评价',
          intro:
            '水环境质量评价又称水质评价，是根据水的用途，按照一定的评价标准、评价参数和评价方法，对水域的水质或水域综合体的质量进行定性或定量的评定',
          items: [
            {
              name: '四类污染源量化分析',
              hasCharts: true,
              chartsID: ['pollute']
            },
            {
              name: '水质指标分析',
              hasCharts: true,
              chartsID: ['quality']
            }
          ]
        }
      ],
      airList: [],
      landuseData: [5391, 77271, 97038],
      mineralData: [56709, 98600, (98600 + 56709) / 2],
      mineralData2: [553, 447],
      oceanData: [49125, 36265],
      forestData: [49125, 36265],
      waterData: [49125, 36265]
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
      this.drawZoology()
      this.getAirMassData()
      this.drawPollute()
      this.drawQuality()
    },
    handleCityChange (city) {
      if (city !== '440000') {
        this.options.city = city
      } else {
        this.options.city = null
        this.options.area = null
      }
      this.updateData()
      this.drawZoology()
      this.getAirMassData()
      this.drawPollute()
      this.drawQuality()
    },
    async updateData () {
      // 更新数据
      this.loading = true
      let params = this.options
      let that = this
      await that
        .$get('/epf-monitor-bearer/decisionsupport/getSourceUtilize', params)
        .then(res => {
          if (res.code === 0) {
            that.updateRight(res.sourceUtilize)
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
      let {
        beaLandResourceVo: landuse,
        beaGeologyResourceVo: mineral,
        beaOceanResourceVo: ocean,
        beaForestResourceVo: forest,
        beaWaterResourceVo: water
      } = data

      this.landuseData = [
        parseInt(landuse.unutilizedLand) || 0,
        parseInt(landuse.constructionLand) || 0,
        parseInt(landuse.agriculturalLand) || 0
      ]

      this.mineralData = [
        parseInt(mineral.exploitAmount) || 0,
        parseInt(mineral.mineralAmount) || 0,
        parseInt(mineral.unexploitAmount) || 0
      ]

      this.mineralData2 = [
        parseInt(mineral.exploitNumber) || 0,
        parseInt(mineral.prospectNumber) || 0
      ]

      this.oceanData = [
        parseInt(ocean.confirmArea) || 0,
        parseInt(ocean.unconfirmArea) || 0
      ]

      this.forestData = [
        parseInt(forest.stateOwnedArea) || 0,
        parseInt(forest.otherArea) || 0
      ]

      this.waterData = [
        parseInt(water.surfaceAmount) || 0,
        parseInt(water.groundAmount) || 0
      ]

      this.refreshChart(this.activeTitle)
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
      } else if (name === 'air_element_assess-002') {
        url = require('@/assets/images/czjcyj/jczc-qdyj.png')
      } else if (name === 'air_element_assess-003') {
        url = require('@/assets/images/czjcyj/jczc-zdyj.png')
      } else if (name === 'air_element_assess-004') {
        url = require('@/assets/images/czjcyj/jczc-gdyj.png')
      } else if (name === 'air_element_assess-005') {
        url = require('@/assets/images/czjcyj/jczc-lh.png')
      } else if (name === 'air_element_assess-001') {
        url = require('@/assets/images/czjcyj/jczc-jk.png')
      }
      return url
    },
    drawLanduse () {
      let myChart = echarts.init(document.getElementById('landuse'))
      // let data_values = [5391, 77271, 97038];
      let data_values = this.landuseData
      let data_names = ['未利用地', '建设用地', '农用地']
      let colors = ['#2C6DF4', '#C046F8', '#0ACD8E']

      let series_data = []
      for (var i = 0; i < data_names.length; i++) {
        series_data.push({
          itemStyle: { color: colors[i] },
          value: data_values[i]
        })
      }
      var option = {
        title: {
          text: '土地资源',
          textStyle: {
            fontSize: 14,
            fontWeight: 'bold'
          },
          left: 'left'
        },
        backgroundColor: '#fff',
        grid: {
          left: '0%',
          right: '10%',
          bottom: '0%',
          top: '15%',
          containLabel: true
        },
        xAxis: [{ type: 'value' }],
        yAxis: {
          type: 'category',
          data: data_names,
          axisLabel: {
            show: true,
            fontSize: 10
          }
        },
        series: {
          type: 'bar',
          barWidth: '10px',
          data: series_data,
          label: {
            normal: {
              show: true,
              position: 'right',
              color: '#5B5A5A'
            }
          }
        }
      }

      myChart.setOption(option)
    },
    drawMineral () {
      let myChart = echarts.init(document.getElementById('mineral'))
      let data_names = [
        '已开采矿产总量: ',
        '已探明矿产总量: ',
        '未探明矿产: 未知'
      ]
      let data_values = this.mineralData
      let colors = ['#FF3737', '#B66BE6', '#C7C7C7']
      let total = data_values.reduce((a, b) => a + b)
      let radius = [25, 15]
      function toThousands (num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      }
      let series = []
      for (let i = 0, len = data_values.length; i < len; i++) {
        series.push({
          name:
            i === 2
              ? data_names[i]
              : data_names[i] + toThousands(data_values[i]) + 't',
          type: 'pie',
          radius: [radius[0] + i * 15 + '%', radius[1] + i * 15 + '%'], // 环的位置
          center: [55, '50%'],
          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          hoverAnimation: false,
          data: [
            {
              value: data_values[i], // 需要显示的数据
              itemStyle: {
                normal: {
                  color: colors[i]
                }
              }
            },
            {
              value: total - data_values[i], // 不需要显示的数据，颜色设置成和背景一样
              itemStyle: {
                normal: {
                  color: 'transparent'
                }
              }
            }
          ]
        })
      }

      let graphic = [
        {
          type: 'text',
          id: 'zr_title',
          style: {
            x: 170,
            y: 140,
            textFill: '#303030',
            text: '2019年矿权登记',
            textAlign: 'center',
            textFont: '12px \'Microsoft YaHei\''
          }
        },
        {
          type: 'text',
          id: 'zr_tag1',

          style: {
            x: 120,
            y: 160,
            textFill: '#F7AF4F',
            text: '采矿权登记',
            textPadding: [5, 10],
            textBackgroundColor: '#FFF8D7',
            textBorderColor: '#F7AF4F',
            textBorderWidth: 1,
            textBorderRadius: 17,
            textAlign: 'center',
            textFont: '12px \'Microsoft YaHei\''
          }
        },
        {
          type: 'text',
          id: 'zr_tag2',

          style: {
            x: 220,
            y: 160,
            textFill: '#4B97EA',
            text: '探矿权登记',
            textPadding: [5, 10],
            textBackgroundColor: '#F0F7FF',
            textBorderColor: '#4B97EA',
            textBorderWidth: 1,
            textBorderRadius: 17,
            textAlign: 'center',
            textFont: '12px \'Microsoft YaHei\''
          }
        },
        {
          type: 'text',
          id: 'zr_num1',

          style: {
            x: 120,
            y: 190,
            textFill: '#F7AF4F',
            text: this.mineralData2[0] + ' km²',
            textAlign: 'center',
            textFont: '12px \'Microsoft YaHei\''
          }
        },
        {
          type: 'text',
          id: 'zr_num2',

          style: {
            x: 220,
            y: 190,
            textFill: '#4B97EA',
            text: this.mineralData2[1] + ' km²',
            textAlign: 'center',
            textFont: '12px \'Microsoft YaHei\''
          }
        }
      ]

      let option = {
        title: {
          text: '矿产资源',
          textStyle: {
            fontSize: 14,
            fontWeight: 'bold'
          },
          left: 'left'
        },
        backgroundColor: '#fff',
        tooltip: {
          show: false
        },
        color: colors,
        legend: {
          orient: 'vertical',
          x: 'left',
          left: 120,
          top: 50,
          icon: 'rect',
          data: [
            data_names[0] + toThousands(data_values[0]) + 't',
            data_names[1] + toThousands(data_values[1]) + 't',
            data_names[2]
          ]
        },
        series: series,
        graphic: graphic
      }
      myChart.setOption(option)
    },
    makePie (title, vals, names, colors, zr) {
      let data_values = vals || [49125, 36265]
      let data_names = names || ['已确权海域面积', '未确权海域面积']
      let data_colors = colors || ['#40A9FF', '#FA8C16']
      let data_sumTitle
      if (title === '海洋资源') {
        data_sumTitle = '海域总面积'
      } else if (title === '森林资源') {
        data_sumTitle = '森林总面积'
      } else if (title === '水资源') {
        data_sumTitle = '水资源总量'
      }
      let index = data_sumTitle.indexOf('总')
      let len = data_sumTitle.length - 1
      let text
        = data_sumTitle.substring(0, index)
        + '\n'
        + data_sumTitle.substring(index)
      let data_sumVals = data_values.reduce((a, b) => a + b)
      function toThousands (num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      }
      let name1 = data_names[0] + '：' + toThousands(data_values[0]) + ' km²'
      let name2 = data_names[1] + '：' + toThousands(data_values[1]) + ' km²'
      let graphic = [
        {
          type: 'text',
          style: {
            x: 214,
            y: 55,
            textFill: '#303030',
            text: data_sumTitle + '：' + toThousands(data_sumVals) + ' km²',
            textAlign: 'center',
            textFont: '15px \'Microsoft YaHei\''
          }
        },
        {
          type: 'text',
          style: {
            x: 70,
            y: zr.getHeight() / 2 - 13,
            textFill: '#303030',
            text: text,
            textAlign: 'center',
            textFont: '14px \'Microsoft YaHei\''
          }
        },
        {
          type: 'text',
          style: {
            x: 214,
            y: 55,
            textFill: '#303030',
            text: data_sumTitle + '：' + toThousands(data_sumVals) + ' km²',
            textAlign: 'center',
            textFont: '15px \'Microsoft YaHei\''
          }
        },
        {
          type: 'text',
          style: {
            x: 214,
            y: 55,
            textFill: '#303030',
            text: data_sumTitle + '：' + toThousands(data_sumVals) + ' km²',
            textAlign: 'center',
            textFont: '15px \'Microsoft YaHei\''
          }
        }
      ]
      let series_data = [
        { value: data_values[0], name: name1 },
        { value: data_values[1], name: name2 }
      ]
      let legend_data = [
        { name: name1, icon: 'circle' },
        { name: name2, icon: 'circle' }
      ]
      let option_series = [
        {
          name: title,
          type: 'pie',
          radius: ['30%', '40%'],
          center: [70, '50%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            normal: { show: false },
            emphasis: { show: false }
          },
          labelLine: {
            normal: { show: false }
          },
          data: series_data
        }
      ]

      let option_legend = {
        orient: 'vertical',
        x: 'left',
        left: 130,
        top: 'middle',
        data: legend_data
      }
      let option_title = {
        text: title,
        textStyle: {
          fontSize: 14,
          fontWeight: 'bold'
        },
        left: 'left'
      }
      let option = {
        title: option_title,
        color: data_colors,
        legend: option_legend,
        series: option_series,
        backgroundColor: '#fff',
        tooltip: { show: false },
        graphic: graphic
      }
      return option
    },
    drawOcean () {
      let myChart = echarts.init(document.getElementById('ocean'))
      var zr = myChart.getZr()
      let vals = this.oceanData
      let names = ['已确权海域面积', '未确权海域面积']
      let colors = ['#40A9FF', '#FA8C16']
      let option = this.makePie('海洋资源', vals, names, colors, zr)
      myChart.setOption(option)
    },
    drawForest () {
      let myChart = echarts.init(document.getElementById('forest'))
      var zr = myChart.getZr()

      let vals = this.forestData
      let names = ['国有林地面积', '其他林地面积']
      let colors = ['#52C41A', '#FA541C']
      let option = this.makePie('森林资源', vals, names, colors, zr)
      myChart.setOption(option)
    },
    drawWater () {
      let myChart = echarts.init(document.getElementById('water'))
      var zr = myChart.getZr()

      let vals = this.waterData
      let names = ['地表水资源', '地下水资源']
      let colors = ['#9254DE', '#F0C731']
      let option = this.makePie('水资源', vals, names, colors, zr)
      myChart.setOption(option)
    },
    async drawZoology () {
      let myChart = echarts.init(document.getElementById('zoology'))

      let params = this.options
      // params["city"] = this.clickCity;

      let res = await this.$get(
        '/epf-monitor-bearer/decisionsupport/getEcosystemRepair',
        params
      )

      if (res.code == 0) {
        let chartData = res.ecosystemRepairVos

        var legendData = ['沙化土地', '水土流失', '其它']
        var colorData = ['#81d3f8', '#8080ff', '#c280ff']
        var xData = []
        var Data1 = []
        var Data2 = []
        var Data3 = []

        for (var key in chartData) {
          xData.push(chartData[key].year)
          Data1.push(chartData[key].desertifiedLandArea)
          Data2.push(chartData[key].soilErosionArea)
          Data3.push(chartData[key].otherArea)
        }

        var seriesAllData = [Data1, Data2, Data3]

        var series = []
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: 'line',
            stack: 'a',
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          })
        }

        var option = {
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: legendData
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },

          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: xData
          },
          yAxis: {
            name: '单位：公顷',
            type: 'value'
          },
          series: series
        }
        myChart.setOption(option, true)
      } else {
        this.$message.error(res.msg)
        return
      }
    },
    async createEcMap (code, mapData) {
      let geojson = await axios.get(chartsUtils.getGeoJSON(code))

      if (geojson) {
        let myChart = echarts.init(this.$refs.chinaChart)
        echarts.registerMap('Air Quality', geojson)
        let mapOption = chartsUtils.getMapOptions(mapData)
        myChart.setOption(mapOption)
      }
    },
    async getAirMassData () {
      let params = this.options
      // params["city"] = this.clickCity;

      let getAirQualityMap = await this.$get(
        '/epf-monitor-bearer/decisionsupport/getAirQualityMap',
        params
      )

      if (getAirQualityMap.code === 0) {
        let mapData = []
        let list = getAirQualityMap.airQualityList
        let name, value
        mapData = list.map(e => {
          name = params.city ? e.cantonAreaName : e.cantonCityName
          value = Number.parseInt(e.airQualityAssess.split('').splice(-1))
          return {
            name,
            value
          }
        })
        this.createEcMap(params.city ? params.city : '440000', mapData)
      }

      let res = await this.$get(
        '/epf-monitor-bearer/decisionsupport/getAirQuality',
        params
      )
      if (res.code === 0) {
        var so2AssessData = res.airQualityVo.so2Assess
        var soxAssessData = res.airQualityVo.soxAssess
        var pmoAssessData = res.airQualityVo.pmoAssess
        var pm25AssessData = res.airQualityVo.pm25Assess
        var coAssessData = res.airQualityVo.coAssess

        this.airList = [
          {
            score: so2AssessData,
            scoreName: 'SO₂'
          },
          {
            score: soxAssessData,
            scoreName: 'SOx'
          },
          {
            score: pmoAssessData,
            scoreName: 'PM0'
          },
          {
            score: pm25AssessData,
            scoreName: 'PM2.5'
          },
          {
            score: coAssessData,
            scoreName: 'CO'
          }
        ]
      } else {
        this.$message.error(res.msg)
        return
      }
    },
    async drawPollute () {
      let myChart = echarts.init(document.getElementById('pollute'))

      let params = this.options
      // params["city"] = this.clickCity;

      let res = await this.$get(
        '/epf-monitor-bearer/decisionsupport/getSewageInfos',
        params
      )
      if (res.code == 0) {
        let chartData = res.sewageInfoVos

        var legendData = ['工业污水', '生活污水', '农业污水', '地表水径流']
        var colorData = ['#81d3f8', '#8080ff', '#c280ff', '#ffff80']
        var xData = []
        var Data1 = []
        var Data2 = []
        var Data3 = []
        var Data4 = []

        for (var key in chartData) {
          xData.push(chartData[key].year)
          Data1.push(chartData[key].industrySewagePercent)
          Data2.push(chartData[key].lifeSewagePercent)
          Data3.push(chartData[key].agricultureSewagePercent)
          Data4.push(chartData[key].surfaceSewagePercent)
        }

        var seriesAllData = [Data1, Data2, Data3, Data4]

        var series = []
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: colorData[i]
                    },
                    {
                      offset: 0.8,
                      color: colorData[i]
                    }
                  ],
                  false
                ),
                shadowColor: colorData[i],
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            },
            data: seriesAllData[i]
          })
        }

        var option = {
          backgroundColor: '#fff',

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          legend: {
            icon: 'rect',
            itemWidth: 18,
            itemHeight: 10,
            // itemGap: 13,
            data: legendData
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '20%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              data: xData
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },

              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %',
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },

              splitLine: {
                lineStyle: {
                  color: '#57617B'
                }
              }
            }
          ],
          series: series
        }
        myChart.setOption(option, true)
      } else {
        this.$message.error(res.msg)
        return
      }
    },
    async drawQuality () {
      let myChart = echarts.init(document.getElementById('quality'))

      let params = this.options
      // params["city"] = this.clickCity;

      let res = await this.$get(
        '/epf-monitor-bearer/decisionsupport/getWaterEnvironment',
        params
      )

      if (res.code == 0) {
        let chartData = res.waterEnVo

        var xData = ['COD', 'BOD', 'TOD', 'TOC', '硬度', 'PH值', '混浊度']

        var colorData = ['#8de8ff']

        var Data1 = []

        Data1.push(
          chartData.codIndex,
          chartData.bodIndex,
          chartData.todIndex,
          chartData.tocIndex,
          chartData.hardnessIndex,
          chartData.phIndex,
          chartData.turbidityIndex
        )

        var option = {
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          // legend: {
          //   data: ["水质指标"],
          //   textStyle: {
          //     color: "#555",
          //     fontSize: 12
          //   },
          //   itemWidth: 12,
          //   itemHeight: 12
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '5%',
            containLabel: true
          },
          //  dataZoom: [
          //         {
          //           type: "inside",
          //           show: true,
          //           xAxisIndex: [0],
          //           start: 0, //默认为1
          //           end: 100
          //         }
          //       ],
          xAxis: [
            {
              type: 'category',
              data: xData,
              axisLabel: {
                show: true,
                fontSize: 10
              }
            }
          ],
          yAxis: {
            type: 'value'
          },
          series: {
            // name: "水质指标",
            type: 'bar',
            barWidth: '10px',
            data: Data1, // 数据
            itemStyle: {
              normal: {
                color: colorData
              }
            }
          }
        }
        myChart.setOption(option, true)
      } else {
        this.$message.error(res.msg)
        return
      }
    },
    refreshChart (title) {
      this.isBasemapShow = true

      if (title === '资源利用评价') {
        this.$nextTick(() => {
          this.drawWater()
          this.drawLanduse()
          this.drawMineral()
          this.drawOcean()
          this.drawForest()
        })
      } else if (title === '生态修复评价') {
        this.$nextTick(() => {
          this.drawZoology()
        })
      } else if (title === '大气环境质量评价') {
        this.isBasemapShow = true
        this.$nextTick(() => {
          this.getAirMassData()
        })
      } else if (title === '水环境质量评价') {
        this.$nextTick(() => {
          this.drawPollute()
          this.drawQuality()
        })
      }
    }
  },
  created () {
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
  },
  watch: {
    activeTitle (val) {
      this.options.city = null
      this.refreshChart(val)
    }
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

.item-name {
  font-size: 14px;
  font-weight: bold;
  display: inline-flex;
}
.item-name-jg {
  margin-top: 30px;
  margin-bottom: 15px;
}
.item-score {
  display: inline-block;
  margin-left: 10px;
  color: #ffa200;
  font-weight: bold;
}

.jumpto {
  position: absolute;
  top: 10px;
  right: 15px;
  user-select: none;
}

.sidebar .side-bar-title {
  height: 60px;
  background: rgb(242, 242, 242);
  font-size: 18px;
  font-weight: bold;
  color: rgba(32, 32, 32, 1);
}

.chart {
  margin-top: 10px;
  height: 200px;
  width: 100%;
}
.rldata {
  width: 100%;
  height: 40px;
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.rldata .rldata-p0 {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rldata .rldata-p1 {
  width: 150px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.rldata .rldata-p1 img {
  width: 97px;
  height: 32px;
}
.item-intro-content {
  width: 100%;
  padding: 0 10px;
  line-height: 22px;
  color: #404040;
  margin-bottom: 10px;
}
</style>
