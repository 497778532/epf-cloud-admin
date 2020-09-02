<template>
  <div style="width:100%;height:100%;">
    <epf-title title="市县变化情况"></epf-title>
    <!-- <div>
      <div class="chart-tab-tilte-box">
        <div @click="turnMonitorFirst"
             class="chart-tab-tilte"
             :class="{active:current==0}">预警状态</div>
        <div @click="turnMonitorSecond"
             class="chart-tab-tilte"
             :class="{active:current==1}">现状数据</div>
        <div @click="turnMonitorThird"
             class="chart-tab-tilte"
             :class="{active:current==2}">变化趋势</div>
      </div>
    </div> -->
    <div style="display: flex;
    justify-content: space-between;">
      <div style="margin-bottom: 4%;">单位：公顷</div>
      <div>
        <el-select size="mini"
                   v-model="this.yearData"
                   filterable
                   @change="handleChangeYear"
                   style="width:80px;">
          <el-option v-for="item in yearOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item"></el-option>
        </el-select>
      </div>
    </div>
    <div id="firstChart"
         ref="firstChart"></div>
    <!-- <div class="chart-tab-content-box"
         v-show="current==1">
      <div class="chart-tab-content-title">指标名称面积</div>
      <div class="chart-tab-content-return">
        <div>单位：平方米</div>
        <div class="chart-tab-content-return-icon">
          <i class="el-icon-s-grid"
             style="font-size:20px;margin-left:10px;"
             @click="toRoute(1)"></i>
          <i class="el-icon-s-grid"
             style="font-size:20px;margin-left:10px;"
             @click="toRoute(2)"></i>
          <i class="el-icon-s-unfold"
             style="font-size:20px;margin-left:10px;"></i>
        </div>
      </div>
      <div class="chart-tab-content-main">
        <div id="secondChart"
             style="width:100%;height:100%;"
             ref="secondChart"></div>
      </div>
    </div> -->
    <!-- <div class="chart-tab-content-box"
         v-show="current==2">
      <div class="chart-tab-content-title">各市人均城镇住宅用地面积实施情况</div>
      <div class="chart-tab-content-return">
        <div>单位：平方米</div>
        <div class="chart-tab-content-return-icon">
          <i class="el-icon-s-unfold"
             style="font-size:20px;margin-left:10px;"></i>
        </div>
      </div>
      <div class="chart-tab-content-main">
        <div id="thirdChart"
             style="width:100%;height:100%;"
             ref="thirdChart"></div>
      </div>
    </div> -->
  </div>
</template>
<script>
import echarts from 'echarts'
import map from './mapinit'
export default {
  mixins: [map],
  props: {
    childTitle: {
      type: String
    }
    // yearData: {
    //   type: String
    // }
  },
  data () {
    return {
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
      yearData: '2020',
      data1: [],
      data2: [],
      chazhi: [],
      cantonCityName: [],
      cantonCityName2: [],
      detectionValue: [],
      planningValue: [],
      xianZhuang: [],
      indexName: '永久基本农田保护',
      current: 0,
      year: 2020
    }
  },
  methods: {
    handleChangeYear (val) {
      console.log(val)
      this.yearData = val.value
    },
    initEchart () {
      window.addEventListener('resize', () => {
        let firstChart = echarts.init(document.getElementById('firstChart'))
        document.getElementById('firstChart').style.width = 100 + '%'
        document.getElementById('firstChart').style.height = 395 + 'px'
        firstChart.resize()
      })
    },
    requestData () {
      this.$http.post(`/api/epf-index-model/indexOverview/getIndexWarningStateJson?indexName=${this.childTitle}&year=${this.yearData}`, {}).then(res => {
        if (res.code === 0) {
          this.detectionValue = []
          this.planningValue = []
          this.cantonCityName = []
          this.chazhi = []
          console.log(this.childTitle)
          console.log(this.yearData)
          res.indexWarningStateList.forEach(response => {
            console.log(res.indexWarningStateList)
            this.detectionValue.push(Number(response.detectionValue).toFixed(2))
            this.planningValue.push(Number(response.planningValue).toFixed(2))
            this.cantonCityName.push(response.cantonCityName)
            this.chazhi.push((Math.abs(Number(response.detectionValue) - Number(response.planningValue))).toFixed(2))
            let firstChart = echarts.init(document.getElementById('firstChart'))
            firstChart.dispose()
            this.firstDrawLine()
            // this.option.xAxis[0].data = this.year
            // this.option.series[0].data = this.detectionValue
          })
        } else {
          this.$message.error(res.msg)// 失败
        }
      })
      this.$http.post(`/api/epf-index-model/indexOverview/getIndexChangeTrendJson?indexName=${this.childTitle}&&year=${this.yearData}`, {}).then(res => {
        if (res.code === 0) {
          this.riseValue = []
          this.cantonCityName2 = []
          res.indexChangeTrendList.forEach(response => {
            if (response.riseValue >= 0) {
              this.data1.push(response.riseValue)
              this.data2.push('')
            } else {
              this.data2.push(response.riseValue)
              this.data1.push('')
            }
            this.riseValue.push(response.riseValue)
            this.cantonCityName2.push(response.cantonCityName)
            // this.option.xAxis[0].data = this.year
            // this.option.series[0].data = this.detectionValue
          })
        } else {
          this.$message.error(res.msg)// 失败
        }
      })
    },
    toRoute (key) {
      if (key === 1) {
        this.$emit('classDetails')
      }
      if (key === 2) {
        this.$emit('classIng')
      }
    },
    // turnMonitorFirst() {
    //   this.current = 0
    //   this.$nextTick(function () {
    //     setTimeout(() => {
    //       let firstChart = echarts.init(document.getElementById('firstChart'))
    //       firstChart.dispose()
    //       this.firstDrawLine()
    //     })
    //   })
    // },
    // turnMonitorSecond() {
    //   this.current = 1
    //   this.$nextTick(function () {
    //     setTimeout(() => {
    //       let secondChart = echarts.init(document.getElementById('secondChart'))
    //       secondChart.dispose()
    //       this.secondDrawLine()
    //     })
    //   })
    // },
    // turnMonitorThird() {
    //   this.current = 2
    //   this.$nextTick(function () {
    //     setTimeout(() => {
    //       let thirdChart = echarts.init(document.getElementById('thirdChart'))
    //       thirdChart.dispose()
    //       this.thirdDrawLine()
    //     })
    //   })
    // },
    firstDrawLine () {
      // setTimeout(() => {
      //   let firstChart = echarts.init(document.getElementById("firstChart"));
      //   document.getElementById("firstChart").style.width = 100 + "%";
      //   document.getElementById("firstChart").style.height = 100 + "%";
      //   firstChart.resize(); // 直接加这句即可
      // }, 0);

      // for(){

      // var a1 =""
      // var a2 =""
      // var a3 = a1 - a2
      // data.push(a1);
      // data.push(a2);
      // data.push(a3);
      // }

      let firstChart = echarts.init(document.getElementById('firstChart'))
      let legendData = ['监测值', '规划目标（2035）', '差值']
      let selectedLegend = {}
      for (var key in legendData) {
        selectedLegend[legendData[0]] = true
        selectedLegend[legendData[1]] = false
        selectedLegend[legendData[2]] = false
      }
      let seriesAllData = []

      let colorData = ['#7cb5b4', '#50a5f6', '#f86a72']

      seriesAllData = [this.detectionValue, this.planningValue, this.chazhi]
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
            data: this.cantonCityName,
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
        //  dataZoom: [
        //         {
        //           type: 'inside',
        //           show: false,
        //           xAxisIndex: [0],
        //           start: 0, // 默认为1
        //           end: 50
        //         }
        //       ],
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
    }
    // secondDrawLine() {
    //   setTimeout(() => {
    //     let secondChart = echarts.init(document.getElementById('secondChart'))
    //     document.getElementById('secondChart').style.width = 100 + '%'
    //     document.getElementById('secondChart').style.height = 100 + '%'
    //     secondChart.resize() // 直接加这句即可
    //   }, 0)
    //   let secondChart = echarts.init(document.getElementById('secondChart'))

    //   let legendData = ['监测值']
    //   let seriesAllData = []

    //   let colorData = ['#00f896']

    //   seriesAllData = [this.planningValue]
    //   let series = []
    //   for (var i = 0; i < legendData.length; i++) {
    //     series.push({
    //       name: legendData[i],
    //       type: 'bar',
    //       barWidth: '8px',
    //       data: seriesAllData[i], // 数据
    //       itemStyle: {
    //         normal: {
    //           color: colorData[i]
    //         }
    //       }
    //     })
    //   }

    //   let option = {
    //     title: {
    //       // text: "全省农村拆旧复垦指标流转情况总览",
    //       x: 'center',
    //       fontSize: '18px',
    //       top: '2%'
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //       }
    //     },
    //     legend: {
    //       //   right: "2%",
    //       //   top: "2%",
    //       data: legendData,
    //       itemWidth: 20,
    //       itemHeight: 14
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '15%',
    //       bottom: '2%',
    //       top: '10%',
    //       containLabel: true
    //     },
    //     yAxis: [
    //       {
    //         // name: '市',
    //         type: 'category',
    //         data: this.cantonCityName,
    //         axisTick: {
    //           alignWithLabel: true,
    //           show: false // 不要刻度
    //         },
    //         axisLine: {
    //           show: false // 不要x轴
    //         }
    //       }
    //     ],
    //    dataZoom: [
    //           {
    //             type: 'inside',
    //             show: false,
    //             xAxisIndex: [0],
    //             start: 0, // 默认为1
    //             end: 50
    //           }
    //         ],
    //     xAxis: [
    //       {
    //         name: '',
    //         type: 'value',
    //         position: 'top', // x轴固定在顶部
    //         // interval: 500,
    //         // max: 1500,
    //         splitLine: {
    //           // 网格线
    //           lineStyle: {
    //             type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
    //           },
    //           show: true // 隐藏或显示
    //         },
    //         axisTick: {
    //           alignWithLabel: true,
    //           show: false // 不要刻度
    //         },
    //         axisLine: {
    //           show: false // 不要x轴
    //         }
    //       }
    //     ],
    //     series: series
    //   }
    //   secondChart.setOption(option, true)
    // },
    // thirdDrawLine() {
    //   setTimeout(() => {
    //     let thirdChart = echarts.init(document.getElementById('thirdChart'))
    //     document.getElementById('thirdChart').style.width = 100 + '%'
    //     document.getElementById('thirdChart').style.height = 100 + '%'
    //     thirdChart.resize() // 直接加这句即可
    //   }, 0)
    //   let thirdChart = echarts.init(document.getElementById('thirdChart'))

    //   // let data1 = this.riseValue
    //   // this.data1 =
    //   //   [
    //   //     '27516.1629',
    //   //     '10471.4184',
    //   //     '7757.6297',
    //   //     '10419.6529',
    //   //     '12860.6387',
    //   //     '17175.37',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '12272.9791',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '15272.9791',
    //   //     '13468.5373',
    //   //     '13727.6423'
    //   //   ]

    //   // this.data2 =
    //   //   [
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '',
    //   //     '-10763.6762',
    //   //     '-22412.9734',
    //   //     '-7831.6646',
    //   //     '-9729.8862',
    //   //     '-10932.5241',
    //   //     '',
    //   //     '-8353.3484',
    //   //     '-9412.2347',
    //   //     '-17201.0917',
    //   //     '-7184.642',
    //   //     '-6750.8842',
    //   //     '-6750.8842',
    //   //     '',
    //   //     '',
    //   //     ''
    //   //   ]
    //   let newData2 = []
    //   for (var i = 0; i < this.data2.length; i++) {
    //     newData2.push(this.data2[i])
    //   }
    //   let legendData = ['环比增长量', '环比减少量']
    //   let seriesAllData = []

    //   let colorData = ['#00f896', '#0269f3']

    //   seriesAllData = [this.data1, this.data2]
    //   let series = []
    //   for (var i = 0; i < legendData.length; i++) {
    //     series.push({
    //       name: legendData[i],
    //       type: 'bar',
    //       barWidth: '8px',
    //       stack: '总量',
    //       data: seriesAllData[i], // 数据
    //       itemStyle: {
    //         normal: {
    //           color: colorData[i]
    //         }
    //       }
    //     })
    //   }

    //   let option = {
    //     title: {
    //       // text: "全省农村拆旧复垦指标流转情况总览",
    //       x: 'center',
    //       fontSize: '18px',
    //       top: '2%'
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //       }
    //     },
    //     legend: {
    //       //   right: "2%",
    //       //   top: "2%",
    //       data: legendData,
    //       itemWidth: 20,
    //       itemHeight: 14
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '15%',
    //       bottom: '2%',
    //       top: '10%',
    //       containLabel: true
    //     },
    //     yAxis: [
    //       {
    //         // name: '市',
    //         type: 'category',
    //         data: this.cantonCityName2,
    //         axisTick: {
    //           alignWithLabel: true,
    //           show: false // 不要刻度
    //         },
    //         axisLine: {
    //           show: false // 不要x轴
    //         }
    //       }
    //     ],
    //     dataZoom: [
    //           {
    //             type: 'inside',
    //             show: false,
    //             xAxisIndex: [0],
    //             start: 0, // 默认为1
    //             end: 50
    //           }
    //         ],
    //     xAxis: [
    //       {
    //         name: '',
    //         type: 'value',
    //         position: 'top', // x轴固定在顶部
    //         // interval: 500,
    //         // max: 1500,
    //         splitLine: {
    //           // 网格线
    //           lineStyle: {
    //             type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
    //           },
    //           show: true // 隐藏或显示
    //         },
    //         axisTick: {
    //           alignWithLabel: true,
    //           show: false // 不要刻度
    //         },
    //         axisLine: {
    //           show: false // 不要x轴
    //         }
    //       }
    //     ],
    //     series: series
    //   }
    //   thirdChart.setOption(option, true)
    // }
  },
  created () {
  },
  mounted () {
    this.$bus.$on('name', val => {
      this.indexName = val
      let projectChart = echarts.init(
        document.getElementById('projectChart')
      )
      let firstChart = echarts.init(document.getElementById('firstChart'))
      firstChart.dispose()
      this.firstDrawLine()
    })
    let firstChart = echarts.init(document.getElementById('firstChart'))
    firstChart.dispose()
    this.firstDrawLine()
    this.initEchart()
  },
  watch: {
    childTitle (val) {
      this.requestData()
      let firstChart = echarts.init(document.getElementById('firstChart'))
      firstChart.dispose()
      this.firstDrawLine()
    },
    yearData (val) {
      this.requestData()
      let firstChart = echarts.init(document.getElementById('firstChart'))
      firstChart.dispose()
      this.firstDrawLine()
    },
    planningValue: {

      handler (newVal, oldVal) {
        if (newVal) {
          let firstChart = echarts.init(document.getElementById('firstChart'))
          firstChart.dispose()
          this.firstDrawLine()
        }
      },

      deep: true // 对象内部属性的监听，关键。

    }
  }
}
</script>
<style scoped>
* {
  font-size: 16px;
  color: #404040;
  line-height: 21px;
}
#chart-monitor-box {
  background-color: #fff;
  width: 332px;
  /* height: 449px; */
  position: absolute;
  top: calc(4.5% + 37px);
  right: 12px;
  height: 370px;
  border-radius: 6px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
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
  cursor: pointer;
}
.chart-tab-tilte-box .active {
  border-bottom: 2px solid #1d7ce4;
  color: #1d7ce4;
  height: 40px;
}
.chart-tab-content-box {
  flex: 1;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px 10px 10px;
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
.chart-tab-content-return-icon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.chart-tab-content-main {
  width: 100%;
  height: calc(100% - 48px);
}
#firstChart {
  height: 395px;
  width: 100%;
}
.epf-title__wrapper {
  margin-bottom: 4%;
}
</style>
