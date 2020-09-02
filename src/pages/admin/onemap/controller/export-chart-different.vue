<template>
  <div v-drag
       v-if="isChartShow"
       class="charts">
    <div class="chart_box">
      <div class="data_title_different drag-title">
        <span>{{this.currentTitle}}统计图</span>
        <i class="el-icon-close"
           @click="handleClickClose"></i>
      </div>
      <div class="data_content_different">
        <div class="chart-list">
          <div id="chart-bar"
               ref="chartBar"
               style="width:100%;height:100%;"></div>
          <!-- <div id="chart-pie" ref="chartPie" :style="{width: '470px', height: '650px'}"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'exportChart',
  props: {
    isChartShow: Boolean,
    chartData: Array,
    chartName: String,
    chartUnitName: String
  },
  data () {
    return {
      exportChartName: [],
      exportChartValue: [],
      seriesData: [],

      currentTitle: '',
      currentTableData: [],
      currentUnitName: ''
    }
  },
  created () {
    this.currentTableData = this.chartData
    this.currentTitle = this.chartName
    this.currentUnitName = this.chartUnitName
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.drawBarChart()
        // this.drawPieChart();
      }, 100)
    })
    this.initEchart()
  },
  watch: {
    isChartShow (newVal) {
      if (newVal) {
        this.$nextTick(() => this.drawBarChart())
        // this.$nextTick(() => this.drawPieChart());
      }
    },
    chartUnitName (val) {
      this.currentTableData = []
      this.currentUnitName = val
      this.drawBarChart()
      // this.drawPieChart();
    },
    chartData: {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          this.currentTableData = []
          this.currentTableData = val
          this.drawBarChart()
          // this.drawPieChart();
        }, 200)
      }
    }
  },
  methods: {
    handleClickClose () {
      this.$emit('close', false)
    },

    drawBarChart () {
      setTimeout(() => {
        let barChart = echarts.init(
          document.getElementById('chart-bar')
        )
        document.getElementById('chart-bar').style.width = 100 + '%'
        document.getElementById('chart-bar').style.height = 100 + '%'
        barChart.resize() // 直接加这句即可
      }, 0)
      let barChart = echarts.init(this.$refs.chartBar)
      var interval = 0
      var rotate = 0
      this.exportChartName = []
      this.exportChartValue = []
      this.currentTableData.forEach(element => {
        let idx = this.exportChartName.indexOf(element['灾害体类型'])
        if (idx < 0) {
          this.exportChartName.push(element['灾害体类型'])
          this.exportChartValue.push(1)
        } else {
          this.exportChartValue[idx]++
        }
      })
      let optionTipName = ''
      if (this.currentTitle === '压覆矿') {
        optionTipName = '面积'
      } else if (this.currentTitle === '地质灾害点') {
        optionTipName = '数量'
      } else if (this.currentTitle === '地质灾害易发区') {
        optionTipName = '地块面积'
      } else if (this.currentTitle === '两规冲突检测') {
        optionTipName = '冲突面积'
      } else if (this.currentTitle === '规划与现状冲突检测') {
        optionTipName = '冲突面积'
      }

      if (this.exportChartName.length > 6 && this.exportChartName.length < 15) {
        rotate = 45
      } else if (this.exportChartName.length > 16) {
        interval = 5
        rotate = 45
      }
      // 绘制图表
      var option = {
        title: {
          text: this.currentTitle + '数据分析结果直方图',
          left: 'center'
        },
        tooltip: {},
        xAxis: {
          data: this.exportChartName,
          name: '灾害类型',
          nameLocation: 'end',
          axisLabel: {
            interval: interval,
            rotate: rotate
          }
        },
        yAxis: {},
        series: [
          {
            name: '数量（个）',
            type: 'bar',
            barWidth: 20,
            data: this.exportChartValue
          }
        ]
      }
      barChart.setOption(option, false)
    },
    drawPieChart () {
      setTimeout(() => {
        let pieChart = echarts.init(
          document.getElementById('chart-pie')
        )
        document.getElementById('chart-pie').style.width = 100 + '%'
        document.getElementById('chart-pie').style.height = 100 + '%'
        pieChart.resize() // 直接加这句即可
      }, 0)
      let pieChart = echarts.init(this.$refs.chartPie)
      this.seriesData = []
      for (var key in this.currentTableData) {
        this.seriesData.push({
          name: this.currentTableData[key].city,
          value: this.currentTableData[key].value
        })
      }

      let optionTipName = ''
      if (this.currentTitle === '压覆矿') {
        optionTipName = '面积'
      } else if (this.currentTitle === '地质灾害点') {
        optionTipName = '数量'
      } else if (this.currentTitle === '地质灾害易发区') {
        optionTipName = '地块面积'
      } else if (this.currentTitle === '两规冲突检测') {
        optionTipName = '冲突面积'
      } else if (this.currentTitle === '规划与现状冲突检测') {
        optionTipName = '冲突面积'
      }

      var legendType = 'plain'
      if (this.exportChartName.length > 10) {
        legendType = 'scroll'
      }
      // 绘制图表

      pieChart.setOption({
        title: {
          text: this.currentTitle + '数据分析结果饼状图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          type: legendType,
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: this.exportChartName
        },
        series: [
          {
            name: optionTipName + '（' + this.currentUnitName + '）',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.seriesData
          }
        ]
      })
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        let barChart = echarts.init(
          document.getElementById('chart-bar')
        )
        document.getElementById('chart-bar').style.width = 100 + '%'
        document.getElementById('chart-bar').style.height = 100 + '%'
        barChart.resize() // 直接加这句即可

        let pieChart = echarts.init(
          document.getElementById('chart-pie')
        )
        document.getElementById('chart-pie').style.width = 100 + '%'
        document.getElementById('chart-pie').style.height = 100 + '%'
        pieChart.resize() // 直接加这句即可
      })
    }
  }
  // directives: {
  //   drag: {
  //     inserted: function (el, binding, vNode) {
  //       el.setAttribute('style', 'position: fixed;')
  //     },
  //     bind: function (el, bindding, vNode) {
  //       el.setAttribute('draggable', true)
  //       let left, top, width, height
  //       el._dragstart = function (event) {
  //         event.stopPropagation()
  //         left = event.clientX - el.offsetLeft
  //         top = event.clientY - el.offsetTop
  //         width = el.offsetWidth
  //         height = el.offsetHeight
  //       }
  //       el._checkPosition = function () {
  //         // 防止被拖出边界
  //         let width = el.offsetWidth
  //         let height = el.offsetHeight
  //         let left = Math.min(el.offsetLeft, document.body.clientWidth - width)
  //         left = Math.max(0, left)
  //         let top = Math.min(el.offsetTop, document.body.clientHeight - height)
  //         top = Math.max(0, top)
  //         el.style.left = left + 'px'
  //         el.style.top = top + 'px'
  //         el.style.width = width + 'px'
  //         el.style.height = height + 'px'
  //       }
  //       el._dragEnd = function (event) {
  //         event.stopPropagation()
  //         left = event.clientX - left
  //         top = event.clientY - top
  //         el.style.left = left + 'px'
  //         el.style.top = top + 'px'
  //         el.style.width = width + 'px'
  //         el.style.height = height + 'px'
  //         el._checkPosition()
  //       }
  //       el._documentAllowDraop = function (event) {
  //         event.preventDefault()
  //       }
  //       document.body.addEventListener('dragover', el._documentAllowDraop)
  //       el.addEventListener('dragstart', el._dragstart)
  //       el.addEventListener('dragend', el._dragEnd)
  //       window.addEventListener('resize', el._checkPosition)
  //     },
  //     unbind: function (el, bindding, vNode) {
  //       document.body.removeEventListener('dragover', el._documentAllowDraop)
  //       el.removeEventListener('dragstart', el._dragstart)
  //       el.removeEventListener('dragend', el._dragEnd)
  //       window.removeEventListener('resize', el._checkPosition)
  //       delete el._documentAllowDraop
  //       delete el._dragstart
  //       delete el._dragEnd
  //       delete el._checkPosition
  //     }
  //   }
  // }
}
</script>

<style scoped>
.charts {
  z-index: 1001;
  left: 460px;
  top: 190px;
}
.data_title_different {
  width: 800px;
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0px 5px 0 rgba(0, 0, 0, 0.5);
  /* position: relative; */
}
.data_content_different {
  width: 800px;
  height: 552px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px 20px 10px 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  /* border: 1px solid #999; */
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.chart-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.el-icon-close {
  cursor: pointer;
}

@media screen and (max-width: 1600px) and (min-width: 1401px) {
  .data_title_different {
    width: 700px;
    height: 45px;
  }
  .data_content_different {
    width: 700px;
    height: 455px;
  }
}
@media screen and (max-width: 1400px) {
  .data_title_different {
    width: 550px;
    height: 45px;
  }
  .data_content_different {
    width: 550px;
    height: 355px;
  }
}
</style>
