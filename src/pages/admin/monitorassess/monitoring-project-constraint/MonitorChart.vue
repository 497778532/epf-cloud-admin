<template>
  <div style="width:400px;height:100%;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);">
    <!-- 左边图表 -->
    <div class="fuken-chart-left-Box"
         style="width:400px;height:100%;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);"
         v-if="!isShowHome">
      <div class="monitor-left-top-box">
        <div class="monitor-left-top">
          <div class="display:flex;flex:1;">{{this.changeIndexTitle}} - {{this.changeAreaName}}</div>
          <span class="one-header__right EPFsuccess__custom"
                v-if="!isWarn&&this.dimnessWarn==1">正常</span>
          <span class="one-header__right EPFerror__custom"
                v-if="isWarn&&this.dimnessWarn==1">预警</span>
          <span v-if="this.dimnessWarn==0">--</span>
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
              <!-- <el-tooltip effect="dark" content="排序" placement="bottom">
                    <i
                      class="el-icon-s-unfold"
                      style="font-size:20px;margin-left:10px;cursor: pointer;"
                      @click="handleClickSort"
                    ></i>
              </el-tooltip>-->
              <div style="cursor:pointer;margin-right:18px;display:flex;align-items: center;"
                   @click="handleClickSort1"
                   :class="{'sort-color1':this.sortTypeParams === '0'}">
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
        <!-- <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="总体变化趋势" name="1">
            <div
              class="one-fuken-chart-left__content__diff"
              v-if="this.huanbiData!=null||this.zengfuData!=null"
            >
              <span>
                环比
                <i
                  class="el-icon-bottom"
                  style="color:rgba(246, 108, 108, 1);font-size:14px;"
                  v-if="this.zbzfIcon==-1"
                ></i>
                <i
                  class="el-icon-sort"
                  style="color:#7a6266;font-size:14px;"
                  v-if="this.zengfuData<0"
                ></i>
                <i
                  class="el-icon-top"
                  style="color:rgba(103, 194, 58, 1);font-size:14px;"
                  v-if="this.zengfuData>0"
                ></i>
                <span>{{this.huanbiData}}m²，</span>
              </span>
              <span>
                增幅
                <i
                  class="el-icon-bottom"
                  style="color:rgba(246, 108, 108, 1);font-size:14px;"
                  v-if="this.zbzfIcon==-1"
                ></i>
                <i
                  class="el-icon-sort"
                  style="color:#7a6266;font-size:14px;"
                  v-if="this.zengfuData<0"
                ></i>
                <i
                  class="el-icon-top"
                  style="color:rgba(103, 194, 58, 1);font-size:14px;"
                  v-if="this.zengfuData>0"
                ></i>
                <span>{{this.zengfuData}}%</span>
              </span>
            </div>

            <div class="qushi-chart__diff">
              <div id="changeChart" ref="change" style="height:100%;width:100%;"></div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames1" @change="handleChange1">
          <el-collapse-item title="市县变化情况" name="2">
            <div class="chart-tab-content-box__diff">
              <div class="chart-tab-content-return__diff">
                <div>单位：{{this.changeIndexUnit}}</div>
                <div class="chart-tab-content-return-icon">
                  <el-tooltip effect="dark" content="排序" placement="bottom">
                    <i
                      class="el-icon-s-unfold"
                      style="font-size:20px;margin-left:10px;cursor: pointer;"
                      @click="handleClickSort"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
              <div class="chart-tab-content-main__diff">
                <div id="firstChart" style="width:100%;height:100%;"></div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>-->
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import qs from 'qs'
import Bus from '../../../../utils/bus'
import echarts from 'echarts'
import moment from 'moment'
export default {
  props: {
    rightItemMessageTitleData: {
      type: String
    },
    rightItemMessageUnitData: {
      type: String
    },
    rightItemMessageZbEnumData: {
      type: String
    },
    homeChangeMessage: {
      type: Boolean
    },
    controlMenuCity: {
      type: String
    },
    controlMenuArea: {
      type: String
    }
  },
  data () {
    return {
      current: 0,
      leftCurrent: 0,
      isShowBottom: false,
      isShowBottom1: false,

      discoverForm: {},
      monitorChartData: [],
      monitorChartYear: [],
      monitorZbzfData: [],
      zbzfIcon: '',
      zbzfHB: '',
      zbzfZF: '',

      changeIndexTitle: '',
      changeIndexUnit: '',

      discoverForm: {
        name: '河源市紫金县XX乡XX村第二批拆旧复垦项目',
        location: '113.224,23.445',
        now: '耕地',
        plan: '耕地',
        area: '广东省>河源市>紫金县'
      },

      pageZbEnum: '',
      // pageZbEnum:"CULTIVATED_LAND_HOLDINGS",
      pageRightItemMessage: {},

      params: {
        cantonProvince: '440000',
        cantonCity: '',
        cantonArea: '',
        // year: "2019",
        year: moment().year(),
        areaType: '',
        sortType: '',
        zbEnum: ''
      },
      sortType: false,
      sortTypeParams: '0',

      changeAreaName: '',
      jianceYear: '',
      guihuaYear: '',
      isWarn: '',

      isShowHome: '',

      huanbiData: '',
      zengfuData: '',

      // 样式修改
      activeNames: '',
      activeNames1: '',

      dimnessWarn: '',

      changeMenuCity: '',
      changeMenuArea: '',

      zongUnit: ''
    }
  },
  methods: {
    handleChange () {
      this.isShowBottom = !this.isShowBottom
    },
    handleChange1 () {
      this.isShowBottom1 = !this.isShowBottom1
    },
    turnMonitorLeftFirst () {
      this.leftCurrent = 0
    },
    turnMonitorLeftSecond () {
      this.leftCurrent = 1
    },
    turnMonitorLeftThird () {
      this.leftCurrent = 2
    },
    turnMonitorLeftFourth () {
      this.leftCurrent = 3
    },
    turnMonitorFirst () {
      this.current = 0
      // this.sortType = "0";
      setTimeout(() => {
        this.firstDrawLine()
      }, 500)
    },
    turnMonitorSecond () {
      this.current = 1
      // this.sortType = "0";
      setTimeout(() => {
        this.secondDrawLine()
      }, 500)
    },
    turnMonitorThird () {
      this.current = 2
      // this.sortType = "0";
      setTimeout(() => {
        this.thirdDrawLine()
      }, 500)
    },
    handleClickSort () {
      this.sortType = !this.sortType
    },
    handleClickSort1 () {
      this.sortTypeParams = '0'
    },
    handleClickSort2 () {
      this.sortTypeParams = '1'
    },
    changeSXCase () {
      this.isShowBottom1 = !this.isShowBottom1
      // this.sortType = "0";
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
      params['zbEnum'] = this.pageZbEnum
      params['sortType'] = this.sortTypeParams
      params['cantonCity'] = this.changeMenuCity
      params['cantonArea'] = this.changeMenuArea
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
      params['zbEnum'] = this.pageZbEnum
      // this.pageZbEnum
      //   ? (params["zbEnum"] = this.pageZbEnum)
      //   : (params["zbEnum"] = "CULTIVATED_LAND_HOLDINGS");
      params['sortType'] = this.sortTypeParams
      params['cantonCity'] = this.changeMenuCity
      params['cantonArea'] = this.changeMenuArea
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
      params['zbEnum'] = this.pageZbEnum
      params['sortType'] = this.sortTypeParams
      params['cantonCity'] = this.changeMenuCity
      params['cantonArea'] = this.changeMenuArea
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
    // this.getMenuData();
  },
  mounted () {
    Bus.$on('changeMessage', val => {
      this.changeIndexTitle = val
    })
    Bus.$on('changeUnitMessage', val => {
      this.changeIndexUnit = val
    })
    this.$nextTick(function () {
      setTimeout(() => {
        this.changeDrawLine()
        this.firstDrawLine()
        // this.secondDrawLine();
        // this.thirdDrawLine();
      }, 1000)
    })
    this.initEchart()
  },
  watch: {
    changeIndexTitle: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeIndexTitle = val
      }
    },
    changeIndexUnit: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeIndexUnit = val
      }
    },
    pageZbEnum: {
      immediate: true,
      deep: true,
      handler (val) {
        this.pageZbEnum = val
      }
    },
    rightItemMessageTitleData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeIndexTitle = val
      }
    },
    rightItemMessageUnitData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeIndexUnit = val
      }
    },
    rightItemMessageZbEnumData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.pageZbEnum = val
        if (val) {
          this.getIndexData()
          setTimeout(() => {
            this.firstDrawLine()
            this.changeDrawLine()
          }, 500)
        }
      }
    },
    homeChangeMessage: {
      immediate: true,
      deep: true,
      handler (val) {
        this.isShowHome = val
      }
    },
    controlMenuCity: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeMenuCity = val
        console.log(this.changeMenuCity)
        if (this.pageZbEnum) {
          this.getIndexData()
          setTimeout(() => {
            this.firstDrawLine()
            this.changeDrawLine()
          }, 500)
        }
      }
    },
    controlMenuArea: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeMenuArea = val
        console.log(this.changeMenuArea)
        if (this.pageZbEnum) {
          this.getIndexData()
          setTimeout(() => {
            this.firstDrawLine()
            this.changeDrawLine()
          }, 500)
        }
      }
    },
    // sortType: {
    //   immediate: true,
    //   deep: true,
    //   handler(val) {
    //     if (val == true) {
    //       this.sortTypeParams = "1";
    //     } else if (val == false) {
    //       this.sortTypeParams = "0";
    //     }
    //     setTimeout(() => {
    //       this.firstDrawLine();
    //     }, 500);
    //   }
    // },
    sortTypeParams: {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          this.firstDrawLine()
        }, 100)
      }
    },
    isShowBottom (val) {
      if (val == true) {
        setTimeout(() => {
          this.changeDrawLine()
        }, 0)
      }
    },
    isShowBottom1 (val) {
      if (val == true) {
        setTimeout(() => {
          this.firstDrawLine()
        }, 0)
      }
    }
  }
}
</script>
<style scoped>
#chart-monitor-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-tab-tilte-box {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  color: #303030;
  border-bottom: 2px solid #d7d7d7;
  box-sizing: border-box;
}
.chart-tab-tilte {
  width: 33.33%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chart-tab-tilte-box .active {
  border-bottom: 2px solid #1d7ce4;
  color: #1d7ce4;
  height: 40px;
}
.chart-tab-content-box {
  width: 350px;
  height: 550px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 15px 10px 10px;
}
.chart-tab-content-box__diff {
  width: 400px;
  height: 700px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-tab-content-title {
  color: #303030;
  line-height: 24px;
  font-size: 14px;
  text-align: left;
}
.chart-tab-content-return {
  color: #303030;
  line-height: 24px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.chart-tab-content-main {
  width: 100%;
  height: calc(100% - 48px);
}
.chart-tab-content-main__diff {
  width: 400px;
  height: 650px;
  background-color: #fff;
  padding: 10px 24px;
  box-sizing: border-box;
}
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
.fuken-chart-left {
  height: 60px;
  width: 350px;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 5px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}

.one-fuken-chart-left__title {
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 24px;
}
.one-fuken-chart-left__content {
  color: #202020;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 24px;
}
.one-fuken-chart-left__content__diff {
  color: #202020;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 24px;
  padding: 8px 10px 0 10px;
  font-size: 14px;
}
.left-chart-tab-tilte-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #303030;
  box-sizing: border-box;
}
.left-chart-tab-tilte {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.left-chart-tab-tilte-box .active {
  color: #1d7ce4;
}
.problem-discover-box {
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
.qushi-chart {
  height: 250px;
  width: 350px;
  background-color: #fff;
  padding: 10px;
}
.qushi-chart__diff {
  height: 310px;
  width: 400px;
  background-color: #fff;
  padding: 10px 24px;
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
</style>
<style>
.problem-discover-box .el-form-item {
  margin-bottom: 0px;
}
.monitor-left-top-box .el-collapse-item__header {
  color: #303133;
  border-bottom: 2px solid #dcdcdc;
  font-size: 16px;
  font-weight: 700;
  width: 350px;
  padding-right: 10px;
  padding-left: 10px;
  box-sizing: border-box;
}
.monitor-left-top-box .el-collapse-item__content {
  padding-bottom: 10px;
}
</style>
