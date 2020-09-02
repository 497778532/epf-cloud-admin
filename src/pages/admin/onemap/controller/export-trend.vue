<template>
  <div v-drag v-if="isTrendShow" class="charts">
    <div>
      <div class="data_title">
        <span>历年分析对比统计图</span>
        <i class="el-icon-close" @click="handleClickClose" style="position: absolute;right:20px;"></i>
      </div>
      <div class="data_content">
        <div class="chart-list">
          <div id="chart-line" ref="chartLine" :style="{width: '1000px', height: '650px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'ExportTrend',
  props: {
    isTrendShow: Boolean,
    tableData: Array,
    multiResult: Array
  },
  data() {
    return {
      landuseName: [],
      landuseArea: [],
      seriesData: []
    }
  },
  watch: {
    isTrendShow(newVal) {
      if (newVal) {
        this.getData()
        this.$nextTick(() => this.drawLineChart())
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
      this.multiSeriesData = []
      var name, area, year, singleYearData

      this.seriesData = this.multiResult.map(item => parseInt(item.name))

      let len = this.seriesData.length
      // 求每一项的每年的值 - sort()
      let data = this.tableData
      data.sort((a, b) => a.landuseName - b.landuseName)

      console.log(data)

      for (let item of this.tableData) {
        name = item['landuseName']
        area = item['landuseArea']
        this.landuseName.push(name)
        this.landuseArea.push(area)
        this.multiSeriesData.push({
          name: name,
          type: 'line',
          stack: '总量',
          data: []// 历年数据项
        })
      }
    },
    drawLineChart() {
      let myChart = echarts.init(this.$refs.chartLine)
      console.log(this.seriesData)
      var option = {
        title: {
          text: '历年分析对比'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.landuseName // 数据项
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.seriesData
        },
        yAxis: {
          type: 'value'
        },
        series: this.multiSeriesData
      }

      myChart.setOption(option)
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
