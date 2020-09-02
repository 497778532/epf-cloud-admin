<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">全省文化文物统计信息</div>
        </div>
      </div>
      <div class="page-list-nature EPF-table">
        <!-- 第一个表 -->
        <div class="chart-title-one"
             style="margin: 0px;"
             v-if="cjActiveName === 'Chart'">年末图书馆总藏量：<span>{{this.num1}}</span>万册</div>
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：个</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForlib1 === true }"
                 @click="reveallib1">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barChart1"
               ref="barChart1"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>

      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import complexity from './js/complexityChart'
import echarts from 'echarts'

export default {
  mixins: [complexity],
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      loading: true,
      num1: '',
      showDataNumberForlib1: false
    }
  },
  methods: {
    reveallib1 () {
      this.showDataNumberForlib1 = !this.showDataNumberForlib1
    },
    async getEconomyData () {
      this.loading = true
      this.xzhouData = []
      this.seriesAllDataForBar1 = []

      let res = await this.$post('/epf-third-part/threebatch/QSWHWWTJXXB')
      if (res.code === 0) {
        let chartData = res.result

        let allMyApp = chartData
        let newArr = []
        let newStartDate = ''
        let startHaoMiao = ''
        for (var p = 0; p < allMyApp.length; p++) {
          newStartDate = (allMyApp[p].GXSJ).replace(new RegExp('-', 'gm'), '/')
          startHaoMiao = (new Date(newStartDate)).getTime() // 得到毫秒数
          newArr.push(allMyApp[p])
          newArr[p].timeStartApp = startHaoMiao
        }
        chartData = newArr.sort(sortDate)
        // arr就是最终的排序后的数组

        function sortDate (a, b) {
          return b.timeStartApp - a.timeStartApp
        }

        if (chartData[0].NMTSGZZL_WC === '') {
          this.num1 = '- -'
        } else {
          this.num1 = Number(chartData[0].NMTSGZZL_WC).toFixed(2)
        }

        this.loading = false
        this.xzhouData = [] // x轴数据

        // 展示的数据
        let data0 = []
        let data1 = []
        let data2 = []
        let data3 = []
        let data4 = []
        let data5 = []
        let data6 = []

        data0 = Number(chartData[0].NMQSGYWHG_G).toFixed(2)//	年末全省共有文化馆_个
        data1 = Number(chartData[0].NMQSGYWHZ_G).toFixed(2)// 年末全省共有文化站_个
        data2 = Number(chartData[0].NMQSGYGGTSG_G).toFixed(2)// 年末全省共有公共图书馆_个
        data3 = Number(chartData[0].NMQSGYMSG_G).toFixed(2)// 年末全省共有美术馆_个
        data4 = Number(chartData[0].NMQSGYBWG_G).toFixed(2)// 年末全省共有博物馆_个
        data5 = Number(chartData[0].NMQSYSBYTT_G).toFixed(2)// 年末全省艺术表演团体_个
        data6 = Number(chartData[0].NMQSWHSCJYJG_G).toFixed(2)// 年末全省文化市场经营机构_个

        this.xzhouData = ['年末全省共有文化馆', '年末全省共有文化站', '年末全省共有公共图书馆', '年末全省共有美术馆', '年末全省共有博物馆', '年末全省艺术表演团体', '年末全省文化市场经营机构']// x轴数据

        if (res.result.length === 0) {
          this.isShowData = false
        } else {
          this.isShowData = true
        }

        this.seriesAllDataForBar1.push(data0, data1, data2, data3, data4, data5, data6)

        this.$nextTick(function () {
          setTimeout(() => {
            this.libDrawLine1()
          }, 0)
        })
      } else {
        this.loading = false
        this.isShowData = false
        this.$message.error(res.msg)
        return
      }
    },
    // 柱状图
    libDrawLine1 () {
      setTimeout(() => {
        let barChart1 = echarts.init(document.getElementById('barChart1'))
        document.getElementById('barChart1').style.width = 100 + '%'
        document.getElementById('barChart1').style.height = 100 + '%'
        barChart1.resize() // 直接加这句即可
      }, 0)
      let barChart1 = echarts.init(document.getElementById('barChart1'))

      let XZhouData = this.xzhouData
      let option = {}
      let series = {}

      let seriesAllData = []

      seriesAllData = this.seriesAllDataForBar1

      if (this.showDataNumberForlib1 === false) {
        series = {
          type: 'bar',
          barWidth: null, // 默认自适应
          barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
          barMaxWidth: 40, // 柱形的宽度
          barMaxnWidth: 1, // 柱形的宽度
          barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
          data: seriesAllData, // 数据
          itemStyle: {
            normal: {
              color: '#50a5f4'
            }
          }
        }
      } else {
        series = {
          type: 'bar',
          barWidth: null, // 默认自适应
          barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
          barMaxWidth: 40, // 柱形的宽度
          barMaxnWidth: 1, // 柱形的宽度
          barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#50a5f4'
              }
            }
          },
          data: seriesAllData, // 数据
          itemStyle: {
            normal: {
              color: '#50a5f4'
            }
          }
        }
      }

      option = {
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
          x: 'left',
          top: '0%',
          // data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: '18px',
            color: '#4E4E4E'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          top: '12%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: 'category',
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: 'auto',
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: '14' // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: '',
            type: 'value',
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
            },
            axisLabel: {
              interval: 'auto',
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: '14' // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      }
      barChart1.setOption(option, true)
    }
  },
  created () {
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.libDrawLine1()
      }, 0)
    })

    this.initBarEchart1()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.libDrawLine1()
        }, 0)
      })
    },
    showDataNumberForlib1: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.libDrawLine1()
          }, 0)
        })
      }
    }
  }
}
</script>
<style scoped>
@import "./css/simplenessChart.css";

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style>
#oneChart .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #c0c4cc;
  font-size: 16px;
  line-height: 21px;
}
#oneChart .el-checkbox__label {
  font-size: 16px;
  line-height: 21px;
}
#oneChart .el-checkbox {
  margin-bottom: 8px;
}
#oneChart .el-input__inner {
  text-align: center;
}
</style>
