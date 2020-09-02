<template>
  <div v-drag v-if="isChartShow" class="charts">
    <div>
      <div class="data_title">
        <span>统计图</span>
        <i class="el-icon-close" @click="handleClickClose" style="position: absolute;right:20px;"></i>
      </div>
      <div class="data_content">
        <div class="chart-list">
          <div id="chart-bar" ref="chartBar" :style="{width: '470px', height: '650px'}"></div>
          <div id="chart-pie" ref="chartPie" :style="{width: '470px', height: '650px'}"></div>
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
    tableData: Array
  },
  data() {
    return {
      landuseName: [],
      landuseArea: [],
      seriesData: []
    }
  },
  watch: {
    isChartShow(newVal) {
      if (newVal) {
        this.getData()
        this.$nextTick(() => this.drawBarChart())
        this.$nextTick(() => this.drawPieChart())
      }
    }
  },
  methods: {
    handleClickClose() {
      this.$emit('close', false)
    },
    getData() {
      this.landuseName = []
      this.landuseArea = []
      this.seriesData = []
      var name, area
      for (let item of this.tableData) {
        name = item['landuseName']
        area = item['landuseArea']
        this.landuseName.push(name)
        this.landuseArea.push(area)
        this.seriesData.push({
          value: area,
          name: name
        })
      }
    },
    drawBarChart() {
      let myChart = echarts.init(this.$refs.chartBar)

      var interval = 0
      var rotate = 0

      if (this.landuseName.length > 6 && this.landuseName.length < 15) {
        rotate = 45
      } else if (this.landuseName.length > 16) {
        interval = 5
        rotate = 45
      }
      // 绘制图表

      myChart.setOption({
        title: {
          text: '现状数据分析结果直方图',
          left: 'center'
        },
        tooltip: {},
        xAxis: {
          data: this.landuseName,
          name: '地类名称',
          nameLocation: 'end',
          axisLabel: {
            interval: interval,
            rotate: rotate
          }
        },
        yAxis: {},
        series: [
          {
            name: '面积（公顷）',
            type: 'bar',
            data: this.landuseArea
          }
        ]
      })
    },
    drawPieChart() {
      let myChart = echarts.init(this.$refs.chartPie)
      var legendType = 'plain'
      if (this.landuseName.length > 10) {
        legendType = 'scroll'
      }
      // 绘制图表

      myChart.setOption({
        title: { text: '现状数据分析结果饼状图', left: 'center' },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          type: legendType,
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: this.landuseName
        },
        series: [
          {
            name: '地类名称',
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
    }
  },
  directives: {
    drag: {
      inserted: function(el, binding, vNode) {
        el.setAttribute('style', 'position: fixed;')
      },
      bind: function(el, bindding, vNode) {
        el.setAttribute('draggable', true)
        let left, top, width, height
        el._dragstart = function(event) {
          event.stopPropagation()
          left = event.clientX - el.offsetLeft
          top = event.clientY - el.offsetTop
          width = el.offsetWidth
          height = el.offsetHeight
        }
        el._checkPosition = function() {
          // 防止被拖出边界
          let width = el.offsetWidth
          let height = el.offsetHeight
          let left = Math.min(el.offsetLeft, document.body.clientWidth - width)
          left = Math.max(0, left)
          let top = Math.min(el.offsetTop, document.body.clientHeight - height)
          top = Math.max(0, top)
          el.style.left = left + 'px'
          el.style.top = top + 'px'
          el.style.width = width + 'px'
          el.style.height = height + 'px'
        }
        el._dragEnd = function(event) {
          event.stopPropagation()
          left = event.clientX - left
          top = event.clientY - top
          el.style.left = left + 'px'
          el.style.top = top + 'px'
          el.style.width = width + 'px'
          el.style.height = height + 'px'
          el._checkPosition()
        }
        el._documentAllowDraop = function(event) {
          event.preventDefault()
        }
        document.body.addEventListener('dragover', el._documentAllowDraop)
        el.addEventListener('dragstart', el._dragstart)
        el.addEventListener('dragend', el._dragEnd)
        window.addEventListener('resize', el._checkPosition)
      },
      unbind: function(el, bindding, vNode) {
        document.body.removeEventListener('dragover', el._documentAllowDraop)
        el.removeEventListener('dragstart', el._dragstart)
        el.removeEventListener('dragend', el._dragEnd)
        window.removeEventListener('resize', el._checkPosition)
        delete el._documentAllowDraop
        delete el._dragstart
        delete el._dragEnd
        delete el._checkPosition
      }
    }
  }
}
</script>

<style scoped>
.charts {
  z-index: 1001;
  left: 471px;
  top: 128px;
}
.data_title {
  width: 1000px;
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0px 5px 0 rgba(0, 0, 0, 0.5);
  /* position: relative; */
}
.data_content {
  width: 1000px;
  height: 700px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px 20px 10px 10px;
  /* border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px; */
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
