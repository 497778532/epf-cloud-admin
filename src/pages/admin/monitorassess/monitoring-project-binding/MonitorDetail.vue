<template>
  <keep-alive>
    <div class="page-body"
         id="bindingIndex-box">
      <div class="bindingIndex-box-main">
        <!-- 左边菜单 -->
        <div style="position: relative;z-index:200;">
          <div @click="showProjectMenu"
               class="main-message"
               :class="{
            'main-messageR': isShow,
            'main-messageL': !isShow
          }"></div>
          <transition name="left">
            <!-- 左边图表 -->
            <div v-if="this.isShow == true"
                 style="width:400px;height:100%;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);">
              <div class="fuken-chart-left-Box"
                   style="width:400px;height:100%;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);">
                <div class="monitor-left-top-box">
                  <div class="monitor-left-top">
                    <div class="display:flex;flex:1;">{{this.changeIndexTitle}} - {{this.changeAreaName}}</div>
                    <el-select size="mini"
                               v-model="this.params.year"
                               filterable
                               @change="handleChangeYear"
                               style="width:80px;">
                      <el-option v-for="item in yearOptions"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item"></el-option>
                    </el-select>
                  </div>
                  <div class="monitor-left-number-box"
                       style="margin-bottom:10px">
                    <div class="monitor-left-number-title">预警状态</div>
                    <div class="monitor-left-number-warn">
                      <span class="one-header__right EPFsuccess__custom"
                            v-if="!isWarn&&this.dimnessWarn==1">正常</span>
                      <span class="one-header__right EPFerror__custom"
                            v-if="isWarn&&this.dimnessWarn==1">预警</span>
                      <span v-if="this.dimnessWarn==0">--</span>
                    </div>
                  </div>
                  <div class="monitor-left-number-box"
                       style="margin-bottom:10px">
                    <div class="monitor-left-number-title"
                         v-if="this.jianceYear==null">监测现状</div>
                    <div class="monitor-left-number-title"
                         v-if="this.jianceYear!=null">监测现状（{{this.jianceYear}}）</div>
                    <div class="monitor-left-number-number">
                      <span style="margin-right:10px">{{this.jianceValue}}</span>
                      {{this.changeIndexUnit}}
                    </div>
                  </div>
                  <div class="monitor-left-number-box"
                       style="margin-bottom:32px">
                    <div class="monitor-left-number-title__other"
                         v-if="this.guihuaYear==null">规划目标</div>
                    <div class="monitor-left-number-title__other"
                         v-if="this.guihuaYear!=null">规划目标（{{this.guihuaYear}}）</div>
                    <div class="monitor-left-number-number__other">
                      <span style="margin-right:10px">{{this.guihuaValue}}</span>
                      {{this.changeIndexUnit}}
                    </div>
                  </div>
                  <epf-title title="总体变化趋势"
                             style="margin:1px 0px 1px 10px;"></epf-title>
                  <div class="zong-unit-mes">单位：{{this.zongUnit}}</div>
                  <div class="qushi-chart__diff">
                    <div id="changeChart"
                         ref="change"
                         style="height:100%;width:100%;"></div>
                  </div>
                  <epf-title title="市县变化情况"
                             style="margin:1px 0px 1px 10px;"></epf-title>
                  <div class="chart-tab-content-box__diff">
                    <div class="chart-tab-content-return__diff">
                      <div>单位：{{this.changeIndexUnit}}</div>
                      <div class="chart-tab-content-return-icon">
                        <div style="cursor:pointer;margin-right:18px;display:flex;align-items: center;"
                             @click="handleClickSort1"
                             :class="{'sort-color1':this.sortTypeParams === '2'}">
                          <span>正序</span>
                          <i class="zheng-icon"></i>
                        </div>
                        <div style="cursor:pointer;display:flex;align-items: center;"
                             @click="handleClickSort2"
                             :class="{'sort-color2':this.sortTypeParams === '1'}">
                          <span>倒序</span>
                          <i class="dao-icon"></i>
                        </div>
                      </div>
                    </div>
                    <div class="chart-tab-content-main__diff">
                      <div id="firstChart"
                           style="width:100%;height:100%;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </transition>
        </div>
        <!-- 右边地图 -->
        <div class="main-right-map"
             :class="{ 'main-right-map-nototal': isShow, 'main-right-map-total': !isShow }">
          <div class="map-big-box">
            <div class="map-top-title"
                 style="position:static;z-index:100;">
              <div class="left-top-button-tab__custom"
                   @click="turnTable">
                <span style="cursor: pointer;display: flex;align-items: center;">
                  <i class="tb-icon"></i>图表模式
                </span>
              </div>
            </div>
            <div style="width:100%;height:calc(100% - 40px);color:#fff;">
              <epf-mapview :delay="1"
                           name="MonitorDetail"
                           :mapAppInitConf="myMapAppInitConf">
                <epf-mapview-popup :visible="showPopup"
                                   :position="popupPosition"
                                   :content="popupContent"></epf-mapview-popup>
                <div class="toolbar">
                  <toggle-map style="margin-right: 10px;width: 32px;"></toggle-map>
                  <jumpto style="margin: 0px;"></jumpto>
                  <zoom></zoom>
                  <layerlist></layerlist>
                  <basemap></basemap>
                  <!-- <toolbox style="margin: 0px;"
                @click.stop.native="handleToolBoxClick"></toolbox>-->
                  <!-- <tool-item style="margin: 0px;"></tool-item> -->
                </div>
                <city-location>123</city-location>
                <!-- <tool-panel></tool-panel> -->
              </epf-mapview>
            </div>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import echarts from 'echarts'
import moment from 'moment'
import Bus from '../../../../utils/bus'
import commonecharts from '../../onemap/topic/commonecharts.js'
import '../../../../../static/map/js/province/guangdong'
import gisMixin from '../mixins/gis'
export default {
  name: 'MonitorDetail',
  mixins: [gisMixin],
  components: {
    layerlist: () => import("@/pages/admin/onemap/toolbarItem/layerlist"),
    basemap: () => import("@/pages/admin/onemap/toolbarItem/basemap"),
  },
  data () {
    return {
      params: {
        cantonProvince: '440000',
        cantonCity: '',
        cantonArea: '',
        year: '',
        areaType: '',
        sortType: '',
        zbEnum: ''
      },
      isShow: true,

      changeIndexTitle: '',
      changeAreaName: '',

      dimnessWarn: '',
      isWarn: '',

      jianceYear: '',
      jianceValue: '',
      guihuaYear: '',
      guihuaValue: '',
      changeIndexUnit: '',
      zongUnit: '',

      sortTypeParams: '2',

      yearOptions: [
        {
          value: 2020,
          label: 2020
        },
        {
          value: 2019,
          label: 2019
        },
        {
          value: 2018,
          label: 2018
        },
        {
          value: 2017,
          label: 2017
        },
        {
          value: 2016,
          label: 2016
        },
        {
          value: 2015,
          label: 2015
        }
      ],
      toTable: {},

      ownProvinceName: '广东省',
      ownCityName: '',
      ownAreaName: ''
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    showProjectMenu () {
      this.isShow = !this.isShow
    },
    handleChangeYear (val) {
      this.params.year = val.value
    },
    handleClickSort1 () {
      this.sortTypeParams = '2'
    },
    handleClickSort2 () {
      this.sortTypeParams = '1'
    },
    turnTable () {
      let title = '约束性指标图表模式'
      let routerPath = 'BindingTable'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      this.toTable = {
        title: this.changeIndexTitle,
        unit: this.changeIndexUnit,
        zbEnum: this.params.zbEnum,
        city: this.params.cantonCity,
        area: this.params.cantonArea,
        year: this.params.year,
        cityName: this.ownCityName,
        areaName: this.ownAreaName
      }
      sessionStorage.setItem('toBindingTable', JSON.stringify(this.toTable))
    },
    async changeDrawLine () {
      setTimeout(() => {
        let changeChart = echarts.init(document.getElementById('changeChart'))
        document.getElementById('changeChart').style.width = 100 + '%'
        document.getElementById('changeChart').style.height = 100 + '%'
        changeChart.resize() // 直接加这句即可
      }, 0)
      let changeChart = echarts.init(document.getElementById('changeChart'))

      let params = this.params
      params['areaType'] = ''
      params['sortType'] = this.sortTypeParams
      let res = await this.$get(
        '/epf-monitor-evaluation/bindIndicator/overallTrend',
        params
      )
      this.zongUnit = res.result[0].unit
      let chartData = res.result
      let xZhouData = []
      let data1 = []
      let data2 = []
      let huanbiData = ''
      let zengfuData = ''
      for (var key in chartData) {
        if (chartData[key].growRate == null) {
          let index = key
          chartData[index].growRate = 0
        }
        xZhouData.push(chartData[key].year)
        data1.push(Number(chartData[key].indexValueDouble).toFixed(2))
        data2.push(Number(chartData[key].growRate).toFixed(2))
        if (chartData[key].yearNowFlag == 'TRUE') {
          let index = key
          huanbiData = Number(chartData[index].grow).toFixed(2)
          zengfuData = Number(chartData[index].growRate).toFixed(2)
        }
      }
      this.huanbiData = huanbiData
      this.zengfuData = zengfuData

      var maxData1 = Math.max.apply(Math, data1) // 求y左轴最大值
      var maxData2 = Math.max.apply(Math, data2) // 求y右轴最大值

      let legendData = ['监测值', '增长率']

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
          // formatter: function(params) {
          //   return params[0].marker + params[0].seriesName +" "+ params[0].data;
          // }
        },
        // legend: {
        //   data: legendData,
        //   align: "left"
        // },
        grid: {
          top: '2%',
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        yAxis: [
          {
            type: 'category',
            data: xZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              // rotate: 45, //文字逆时针旋转45°
              textStyle: {
                color: '#303030', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
              // formatter: function(value) {
              //   return value.split("").join("\n");
              // }
            }
          }
        ],
        xAxis: [
          {
            type: 'value',
            // interval: Math.ceil(maxData1 / 5), // y轴分段
            // max: Math.ceil(maxData1), // 最大值
            // min: 0, // 最小值
            position: 'top', // x轴固定在顶部
            axisLabel: {
              show: true,
              interval: 'auto',
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                color: 'rgba(48,48,48,1);', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
            },
            // axisLine: {
            //   show: false // y轴线消失
            // },
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     color: ["#979797"],
            //     type: "solid"
            //   }
            // },
            // axisTick: {
            //   show: false
            // }
            splitLine: {
              // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            },
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            }
          }
          // {
          //   type: "value",
          //   interval: Math.ceil(maxData2 / 5), // y轴分段
          //   max: Math.ceil(maxData2), // 最大值
          //   min: 0, // 最小值
          //   position: "right",
          //   axisLabel: {
          //     show: true,
          //     textStyle: {
          //       color: "rgba(48,48,48,1)", // 更改坐标轴文字颜色
          //       fontSize: 14 // 更改坐标轴文字大小
          //     },
          //     formatter: function(value) {
          //       return value + "%";
          //     }
          //   },
          //   axisLine: {
          //     show: false // y轴线消失
          //   },
          //   axisTick: {
          //     show: false
          //   }
          // }
        ],
        series: [
          {
            name: '监测值',
            type: 'bar',
            barWidth: null, // 默认自适应
            barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: data1,
            itemStyle: {
              normal: {
                color: '#50a5f6'
                // barBorderColor: "rgba(151,151,151,1);", // 柱条边线
                // barBorderRadius: 0, // 柱条边线圆角，单位px，默认为0
                // barBorderWidth: 1 // 柱条边线线宽，单位px，默认为1
              }
            }
          }
          // {
          //   data: data2,
          //   type: "line",
          //   smooth: true,
          //   name: "增长率",
          //   symbolSize: 5, // 控制线条上 点 的大小
          //   color: ["#00D07C"],
          //   itemStyle: {
          //     normal: {
          //       color: "#00D07C",
          //       borderColor: "#00D07C",
          //       lineStyle: {
          //         type: "dotted"
          //       }
          //     }
          //   }
          // }
        ]
      }
      changeChart.setOption(option, true)
    },
    async firstDrawLine () {
      setTimeout(() => {
        let firstChart = echarts.init(document.getElementById('firstChart'))
        document.getElementById('firstChart').style.width = 100 + '%'
        document.getElementById('firstChart').style.height = 100 + '%'
        firstChart.resize() // 直接加这句即可
      }, 0)
      let firstChart = echarts.init(document.getElementById('firstChart'))

      let params = this.params
      if (this.params.cantonProvince != '') {
        if (this.params.cantonCity != '') {
          if (this.params.cantonArea != '') {
            params['areaType'] = '1'
          } else {
            params['areaType'] = '2'
          }
        } else {
          params['areaType'] = '2'
        }
      }
      params['sortType'] = this.sortTypeParams
      let res = await this.$get(
        '/epf-monitor-evaluation/bindIndicator/earlyWarnStatus',
        params
      )
      let chartData = res.result
      let cityNameList = []
      let data1 = []
      let data2 = []
      let data3 = []
      for (var key in chartData) {
        chartData[key].indexValueDouble = Number(
          chartData[key].indexValueDouble
        ).toFixed(2)
        chartData[key].planValueDouble = Number(
          chartData[key].planValueDouble
        ).toFixed(2)
        chartData[key].difference = Number(chartData[key].difference).toFixed(
          2
        )
        if (chartData[key].cantonArea == null) {
          cityNameList.push(chartData[key].cantonCityName)
        } else {
          cityNameList.push(chartData[key].cantonAreaName)
        }
        data1.push(chartData[key].indexValueDouble)
        data2.push(chartData[key].planValueDouble)
        data3.push(chartData[key].difference)
      }
      let planYear = chartData[0].planYear
      let legendData = []
      if (planYear == null) {
        legendData = ['监测值', '规划目标', '差值']
      } else {
        legendData = ['监测值', `规划目标（${planYear}）`, '差值']
      }
      let selectedLegend = {}

      for (var key in legendData) {
        selectedLegend[legendData[0]] = true
        selectedLegend[legendData[1]] = false
        selectedLegend[legendData[2]] = false
      }

      let seriesAllData = []

      let colorData = ['#7cb5b4', '#50a5f6', '#f86a72']

      seriesAllData = [data1, data2, data3]
      let series = []
      for (var i = 0; i < legendData.length; i++) {
        series.push({
          name: legendData[i],
          type: 'bar',
          barWidth: null, // 默认自适应
          barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
          barMaxWidth: 40, // 柱形的宽度
          barMaxnWidth: 1, // 柱形的宽度
          barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
          data: seriesAllData[i], // 数据
          itemStyle: {
            normal: {
              color: colorData[i]
            }
          }
        })
      }

      let option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: 'center',
          fontSize: '18px',
          top: '2%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          //   right: "2%",
          //   top: "2%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          selected: selectedLegend,
          textStyle: {
            // 图例文字的样式
            color: '#404040',
            fontSize: 16
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '0%',
          top: '7%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        yAxis: [
          {
            // name: '市',
            type: 'category',
            data: cityNameList,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              // rotate: 45, //文字逆时针旋转45°
              textStyle: {
                color: '#303030', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
              // formatter: function(value) {
              //   return value.split("").join("\n");
              // }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     type: "inside",
        //     show: false,
        //     yAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 30
        //   }
        // ],
        xAxis: [
          {
            name: '',
            type: 'value',
            position: 'top', // x轴固定在顶部
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                color: 'rgba(48,48,48,1);', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
            },
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            }
          }
        ],
        series: series
      }
      firstChart.setOption(option, true)
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        let changeChart = echarts.init(document.getElementById('changeChart'))
        document.getElementById('changeChart').style.width = 100 + '%'
        document.getElementById('changeChart').style.height = 100 + '%'
        changeChart.resize()

        let firstChart = echarts.init(document.getElementById('firstChart'))
        document.getElementById('firstChart').style.width = 100 + '%'
        document.getElementById('firstChart').style.height = 100 + '%'
        firstChart.resize()
      })
    },
    async getIndexData () {
      let params = this.params
      params['areaType'] = '1'
      params['sortType'] = this.sortTypeParams
      let res = await this.$get(
        '/epf-monitor-evaluation/bindIndicator/detectionAndPlan',
        params
      )
      if (res.code === 0) {
        if (res.result == '') {
          if (this.params.cantonProvince != '') {
            if (this.params.cantonCity != '') {
              if (this.params.cantonArea != '') {
                this.changeAreaName = '全县'
              } else {
                this.changeAreaName = '全市'
              }
            } else {
              this.changeAreaName = '全省'
            }
          }
          this.jianceYear = null
          this.guihuaYear = null
          this.jianceValue = '- -'
          this.guihuaValue = '- -'
          // this.isWarn = true;
          this.dimnessWarn = 0
        } else {
          if (this.params.cantonProvince != '') {
            if (this.params.cantonCity != '') {
              if (this.params.cantonArea != '') {
                this.changeAreaName = res.result[0].cantonAreaName
              } else {
                this.changeAreaName = res.result[0].cantonCityName
              }
            } else {
              this.changeAreaName = '全省'
            }
          }
          this.changeIndexUnit = res.result[0].unit
          this.jianceYear = res.result[0].year
          this.guihuaYear = res.result[0].planYear
          if (res.result[0].indexValueDouble == null) {
            this.jianceValue = '- -'
          } else {
            this.jianceValue = Number(res.result[0].indexValueDouble).toFixed(
              2
            )
          }
          if (res.result[0].planValueDouble == null) {
            this.guihuaValue = '- -'
          } else {
            this.guihuaValue = Number(res.result[0].planValueDouble).toFixed(2)
          }
          if (res.result[0].indexValueDouble < res.result[0].planValueDouble) {
            this.isWarn = true
          } else {
            this.isWarn = false
          }
          this.dimnessWarn = 1
        }
      } else {
        this.$message.error(res.msg) // 失败
      }
    }
  },
  created () {
    var tolist = JSON.parse(sessionStorage.getItem('toBindingMonitorlist'))
    this.changeIndexTitle = tolist.title
    this.params.zbEnum = tolist.zbEnum
    this.params.cantonCity = tolist.city
    this.params.cantonArea = tolist.area
    this.params.year = tolist.year
    this.getIndexData()
  },
  mounted () {
    const me = this
    this.myMapAppInitConf.map.xzqhService.disable = false
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', res => {
      const mapApp = me.$findMapApp(res)
      this.mapApp = mapApp
      mapApp.addLayerToMap({
        title: '永久基本农田划定',
        type: 'wmts',
        useProxy: false,
        url: 'http://19.15.73.111/arcgisserver12/rest/services/三线管控/永久基本农田划定/MapServer'
      })
      mapApp.addLayerToMap({
        title: '现状耕地',
        type: 'wmts',
        useProxy: false,
        url: 'http://19.15.73.111/arcgisserver12/rest/services/一张图展示界面/现状耕地/MapServer'
      })
    })
    this.$bus.$on('loadLayer', res => {
      const mapApp = me.$findMapApp(res)
      this.$addLayerToMap(
        { mapApp: mapApp },
        {
          title: ''
        }
      )
    })
    this.$bus.$on('sendCityInfo', res => {
      console.log(res)
      if (res.id === '440000') {
        this.params.cantonCity = ''
        this.params.cantonArea = ''
        this.ownProvinceName = '广东省'
        this.ownCityName = ''
        this.ownAreaName = ''
      } else if (
        res.id === '440100'
        || res.id === '440200'
        || res.id === '440300'
        || res.id === '440400'
        || res.id === '440500'
        || res.id === '440600'
        || res.id === '440700'
        || res.id === '440800'
        || res.id === '440900'
        || res.id === '441200'
        || res.id === '441300'
        || res.id === '441400'
        || res.id === '441500'
        || res.id === '441600'
        || res.id === '441700'
        || res.id === '441800'
        || res.id === '441900'
        || res.id === '442000'
        || res.id === '445100'
        || res.id === '445200'
        || res.id === '445300'
      ) {
        this.params.cantonCity = res.id
        this.params.cantonArea = ''
        this.ownProvinceName = '广东省'
        this.ownCityName = res.zhCn
        this.ownAreaName = ''
      } else if (
        res.id === '440103'
        || res.id === '440104'
        || res.id === '440105'
        || res.id === '440106'
        || res.id === '440111'
        || res.id === '440112'
        || res.id === '440113'
        || res.id === '440114'
        || res.id === '440115'
        || res.id === '440117'
        || res.id === '440118'
      ) {
        this.params.cantonCity = '440100'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '广州市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '440203'
        || res.id === '440204'
        || res.id === '440205'
        || res.id === '440222'
        || res.id === '440224'
        || res.id === '440229'
        || res.id === '440232'
        || res.id === '440233'
        || res.id === '440281'
        || res.id === '440282'
      ) {
        this.params.cantonCity = '440200'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '韶关市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '440303'
        || res.id === '440304'
        || res.id === '440305'
        || res.id === '440306'
        || res.id === '440307'
        || res.id === '440308'
        || res.id === '440309'
        || res.id === '440310'
        || res.id === '440311'
      ) {
        this.params.cantonCity = '440300'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '深圳市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '440402'
        || res.id === '440403'
        || res.id === '440404'
      ) {
        this.params.cantonCity = '440400'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '珠海市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '440507'
        || res.id === '440511'
        || res.id === '440512'
        || res.id === '440513'
        || res.id === '440514'
        || res.id === '440515'
        || res.id === '440523'
      ) {
        this.params.cantonCity = '440500'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '汕头市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '440604'
        || res.id === '440605'
        || res.id === '440606'
        || res.id === '440607'
        || res.id === '440608'
      ) {
        this.params.cantonCity = '440600'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '佛山市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '440703'
        || res.id === '440704'
        || res.id === '440705'
        || res.id === '440781'
        || res.id === '440783'
        || res.id === '440784'
        || res.id === '440785'
      ) {
        this.params.cantonCity = '440700'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '江门市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '440802'
        || res.id === '440803'
        || res.id === '440804'
        || res.id === '440811'
        || res.id === '440823'
        || res.id === '440825'
        || res.id === '440881'
        || res.id === '440882'
        || res.id === '440883'
      ) {
        this.params.cantonCity = '440800'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '湛江市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '440902'
        || res.id === '440904'
        || res.id === '440981'
        || res.id === '440982'
        || res.id === '440983'
      ) {
        this.params.cantonCity = '440900'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '茂名市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '441202'
        || res.id === '441203'
        || res.id === '441204'
        || res.id === '441223'
        || res.id === '441224'
        || res.id === '441225'
        || res.id === '441226'
        || res.id === '441284'
      ) {
        this.params.cantonCity = '441200'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '肇庆市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '441302'
        || res.id === '441303'
        || res.id === '441322'
        || res.id === '441323'
        || res.id === '441324'
      ) {
        this.params.cantonCity = '441300'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '惠州市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '441402'
        || res.id === '441403'
        || res.id === '441422'
        || res.id === '441423'
        || res.id === '441424'
        || res.id === '441426'
        || res.id === '441427'
        || res.id === '441481'
      ) {
        this.params.cantonCity = '441400'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '梅州市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '441502'
        || res.id === '441521'
        || res.id === '441523'
        || res.id === '441581'
      ) {
        this.params.cantonCity = '441500'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '汕尾市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '441602'
        || res.id === '441621'
        || res.id === '441622'
        || res.id === '441623'
        || res.id === '441624'
        || res.id === '441625'
      ) {
        this.params.cantonCity = '441600'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '河源市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '441702'
        || res.id === '441704'
        || res.id === '441721'
        || res.id === '441781'
      ) {
        this.params.cantonCity = '441700'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '阳江市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '441802'
        || res.id === '441803'
        || res.id === '441821'
        || res.id === '441823'
        || res.id === '441881'
        || res.id === '441882'
        || res.id === '441826'
        || res.id === '441825'
      ) {
        this.params.cantonCity = '441800'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '清远市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '445102'
        || res.id === '445103'
        || res.id === '445122'
      ) {
        this.params.cantonCity = '445100'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '潮州市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '445202'
        || res.id === '445203'
        || res.id === '445222'
        || res.id === '445224'
        || res.id === '445281'
      ) {
        this.params.cantonCity = '445200'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '揭阳市'
        this.ownAreaName = res.zhCn
      } else if (
        res.id === '445302'
        || res.id === '445303'
        || res.id === '445321'
        || res.id === '445322'
        || res.id === '445381'
      ) {
        this.params.cantonCity = '445300'
        this.params.cantonArea = res.id
        this.ownProvinceName = '广东省'
        this.ownCityName = '云浮市'
        this.ownAreaName = res.zhCn
      }
    })

    this.$nextTick(function () {
      setTimeout(() => {
        this.changeDrawLine()
        this.firstDrawLine()
      }, 1000)
    })
    this.initEchart()
  },
  watch: {
    $route (to, from) {
      var tolist = JSON.parse(sessionStorage.getItem('toBindingMonitorlist'))
      this.changeIndexTitle = tolist.title
      this.params.zbEnum = tolist.zbEnum
      this.params.cantonCity = tolist.city
      this.params.cantonArea = tolist.area
      this.params.year = tolist.year
      this.getIndexData()
      this.$nextTick(function () {
        setTimeout(() => {
          this.changeDrawLine()
          this.firstDrawLine()
        }, 1000)
      })
    },
    'params.cantonCity': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getIndexData()
        setTimeout(() => {
          this.firstDrawLine()
          this.changeDrawLine()
        }, 500)
      }
    },
    'params.cantonArea': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getIndexData()
        setTimeout(() => {
          this.firstDrawLine()
          this.changeDrawLine()
        }, 500)
      }
    },
    'params.year': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getIndexData()
        setTimeout(() => {
          this.firstDrawLine()
          this.changeDrawLine()
        }, 500)
      }
    },
    sortTypeParams: {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          this.firstDrawLine()
        }, 100)
      }
    }
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";

#bindingIndex-box {
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  background-color: #f7f7f7;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#bindingIndex-box::-webkit-scrollbar {
  display: none;
}
.bindingIndex-box-main {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  display: flex;
  justify-content: flex-start;
}
.main-right-map {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  z-index: 0;
}
.main-right-map-nototal {
  width: calc(100% - 400px);
}
.main-right-map-total {
  width: 100%;
}
.map-big-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.map-top-title {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.left-top-button-tab {
  color: #7c8196;
  font-size: 16px;
  cursor: pointer;
}
.left-top-button-tab:hover {
  color: #50a5f6;
}
.left-top-button-tab__custom {
  color: #7c8196;
  font-size: 16px;
  line-height: 40px;
  height: 100%;
  padding-right: 16px;
  display: flex;
  justify-content: flex-end;
}
.left-top-button-tab__custom:hover {
  color: #50a5f6;
}
.tb-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("../../../../assets/images/jcpgyj/project/tubiao.png");
  background-size: 24px 24px;
  margin: 0px 5px;
}
.left-enter-active,
.left-leave-active {
  transition: all 0.2s ease;
  transform: translateX(0%);
}
.left-enter,
.left-leave {
  transform: translateX(-100%);
}
.left-leave-to {
  transform: translateX(-100%);
}
.main-message {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 40px;
  right: -40px;
  cursor: pointer;
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: -1;
}
.main-messageL {
  background-image: url("../../../../assets/images/jcpgyj/right.png");
  background-size: 40px 40px;
}
.main-messageR {
  background-image: url("../../../../assets/images/jcpgyj/left.png");
  background-size: 40px 40px;
}
/* 详情 */
.fuken-chart-left-Box {
  /* height: 100%; */
  width: 400px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.fuken-chart-left-Box::-webkit-scrollbar {
  display: none;
}
.one-header__right {
  width: 56px;
  height: 24px;
  border-radius: 2px;
  padding: 2px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  /* margin-left: auto; */
}
.EPFsuccess__custom {
  background: #9dd31c;
  color: #fff;
}
.EPFerror__custom {
  background: #f79861;
  color: #fff;
}
.monitor-left-top-box {
  /* height: 300px; */
  width: 400px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.monitor-left-top {
  width: 100%;
  height: 56px;
  padding: 0 24px;
  font-size: 18px;
  font-weight: bolder;
  color: #202020;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 2px solid #dcdcdc; */
}
.monitor-left-number-box {
  width: 100%;
  height: 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}
.monitor-left-number-title {
  height: 100%;
  width: 50%;
  font-size: 16px;
  line-height: 21px;
  color: #404040;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.monitor-left-number-number {
  height: 100%;
  width: 50%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #404040;
}
.monitor-left-number-number span {
  font-size: 18px;
  color: #9dd31c;
}
.monitor-left-number-warn {
  height: 100%;
  width: 50%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.monitor-left-number-title__other {
  height: 100%;
  width: 50%;
  font-size: 16px;
  line-height: 21px;
  color: #a0a0a0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.monitor-left-number-number__other {
  height: 100%;
  width: 50%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #cdcdcd;
}
.monitor-left-number-number__other span {
  font-size: 16px;
  color: #cdcdcd;
}
.zong-unit-mes {
  width: 100%;
  height: 21px;
  padding-left: 24px;
  color: #707070;
  line-height: 21px;
  font-size: 16px;
  margin-top: 16px;
}
.qushi-chart__diff {
  height: 310px;
  width: 400px;
  background-color: #fff;
  padding: 10px 24px;
}
.chart-tab-content-box__diff {
  width: 400px;
  height: 700px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-tab-content-return__diff {
  color: #707070;
  line-height: 21px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  margin-top: 16px;
}
.chart-tab-content-return-icon {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.sort-color1 {
  color: #50a5f6;
}
.sort-color2 {
  color: #50a5f6;
}
.zheng-icon {
  display: inline-block;
  width: 12px;
  height: 15px;
  background-image: url("../../../../assets/images/jcpgyj/project/zheng.png");
  background-size: 12px 15px;
  margin: 0px 5px;
}
.dao-icon {
  display: inline-block;
  width: 12px;
  height: 15px;
  background-image: url("../../../../assets/images/jcpgyj/project/dao.png");
  background-size: 12px 15px;
  margin: 0px 5px;
}
.chart-tab-content-main__diff {
  width: 400px;
  height: 650px;
  background-color: #fff;
  padding: 10px 24px;
  box-sizing: border-box;
}
</style>
