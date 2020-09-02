<template>
  <div v-drag
       v-if="isChartShow"
       class="resultEchart">
    <div class="drag-title">
      <div class="data_title_different">
        <i class="el-icon-close"
           @click="handleClickClose"
           style="position: absolute;right:20px;"></i>
      </div>
      <div class="data_content_different">
        <div class="chart-list">
          <div id="chart-pie"
               ref="chartPie"
               :style="{width: '470px', height: '530px'}"></div>
          <div id="chart-bar"
               ref="chartBar"
               :style="{width: '470px', height: '530px'}"></div>
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
    tableData: Array,
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
    this.currentTableData = []
    this.currentTableData = this.chartData
    this.currentTitle = this.chartName
    this.currentUnitName = this.chartUnitName
  },
  watch: {
    isChartShow (newVal) {
      if (newVal) {
        this.$nextTick(() => this.drawBarChart())
        this.$nextTick(() => this.drawPieChart())
      }
    },
    chartUnitName (val) {
      this.currentTableData = []
      this.currentUnitName = val
      this.drawBarChart()
      this.drawPieChart()
    },
    chartData: {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          console.log(val)
          this.currentTableData = []
          this.currentTableData = val
          console.log(this.currentTableData)
          this.drawBarChart()
          this.drawPieChart()
        }, 0)
      }
    }
  },
  methods: {
    handleClickClose () {
      this.$emit('close', false)
    },

    drawBarChart () {
      let myChart = echarts.init(this.$refs.chartBar)

      var interval = 0
      var rotate = 0
      this.exportChartName = []
      this.exportChartValue = []
      for (var key in this.currentTableData) {
        this.exportChartName.push(this.currentTableData[key].city)
        this.exportChartValue.push(this.currentTableData[key].value)
      }

      let optionTipName = ''
      if (this.currentTitle === '压覆矿') {
        optionTipName = '面积'
      } else if (this.currentTitle === '地质灾害点') {
        optionTipName = '影响范围'
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
        tooltip: {},
        xAxis: {
          data: ['低等', '中等', '高等', '优等'],
          name: '',
          nameLocation: 'end',
          axisLabel: {
            interval: interval,
            rotate: rotate
          }
        },
        yAxis: {},
        series: [
          {
            name: optionTipName + '（' + this.currentUnitName + '）',
            type: 'bar',
            data: this.exportChartValue,
            itemStyle: {
              color: '#3aa1ff'
            }
          }
        ]
      }
      myChart.setOption(option, false)
    },
    drawPieChart () {
      let myChart = echarts.init(this.$refs.chartPie)
      let colorData = ['#3aa1ff', '#fbd437', '#4ecb73', '#36cbcb']
      let legend = ['优等', '高等', '中等', '低等']
      let series = []
      let data = [
        { value: 335, name: '优等', itemStyle: { color: '' } },
        { value: 310, name: '高等', itemStyle: { color: '' } },
        { value: 234, name: '中等', itemStyle: { color: '' } },
        { value: 135, name: '低等', itemStyle: { color: '' } }
      ]

      for (let i = 0; i < data.length; i++) {
        data[i].itemStyle.color = colorData[i]
      }
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          data: ['优等', '高等', '中等', '低等'],

          bottom: '20px'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.resultEchart {
  position: fixed;
  left: 471px;
  top: 84px;
  width: 50% !important;
  height: 60% !important;
  z-index: 1002;
}
.data_title_different {
  width: 100%;
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0px 5px 0 rgba(0, 0, 0, 0.5);
  /* position: relative; */
}
.data_content_different {
  width: 100%;
  height: 580px;
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
}
</style>
