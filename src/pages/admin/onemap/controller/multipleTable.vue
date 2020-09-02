<template>
  <div v-if="isMTableShow" id="m-table" v-drag>
    <div class="data_title">
      <span>规划数据分析结果</span>
      <i class="el-icon-close" @click="handleClickClose" style="position: absolute;right:20px;"></i>
    </div>
    <div class="data_content">
      <div style="margin-bottom: 5px">
        <el-radio-group v-model="tableDataType" size="small" @change="switchTableData">
          <el-radio-button v-for="(item, index) in multiResult" :label="item.name" :key="index"></el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="tableDataType2" size="small" @change="switchTableData2">
          <el-radio-button label="默认"></el-radio-button>
          <el-radio-button label="详细"></el-radio-button>
        </el-radio-group>
        <!-- <div>
          <p>
            分析图斑总面积：
            <span v-show="!loading">{{totalArea}}</span>
          </p>
        </div> -->
      </div>
      <el-table
        :data="currentTableData"
        class="table"
        border
        v-loading="loading"
        height="450"
        :element-loading-text="loadingText"
        :span-method="cellMerge"
        empty-text="没有分析结果"
      >
        <el-table-column
          v-for="{ prop, label } in columns"
          :key="prop"
          :prop="prop"
          :label="label"
          show-overflow-tooltip
          align="center"
          :formatter="formatter"
        ></el-table-column>
      </el-table>
      <div class="button-list footer">
        <el-button type="primary" size="mini" @click="showExport('chart')" :disabled="loading">统计图</el-button>
        <!-- <el-button type="primary" size="mini" @click="showExport('trend')" :disabled="loading">历年对比</el-button> -->
        <el-button type="primary" size="mini" @click="showExport('report')" :disabled="loading">导出报告</el-button>
        <download-excel
          :data="currentTableData"
          :fields="excelHeader"
          :name="excelFileName"
          style="display: inline"
        >
          <el-button
            type="primary"
            size="mini"
            @click="showExport('execl')"
            :disabled="loading"
          >导出Excel</el-button>
        </download-excel>
      </div>
      <export-chart
        :tableData="currentTableData"
        @close="isChartShow = false"
        :isChartShow="isChartShow"
      ></export-chart>
      <export-trend
        :tableData="currentTableData"
        :multiResult="multiResult"
        @close="isTrendShow = false"
        :isTrendShow="isTrendShow"
      ></export-trend>
    </div>
  </div>
</template>

<script>
import exportChart from './export-chart'
import exportTrend from './export-trend'
export default {
  props: {
    isMTableShow: Boolean,
    tableData: Array,
    layerOutFieldsAlias: Map,
    layerFieldsToShow: Array,
    loading: Boolean,
    multiResult: Array
  },
  data() {
    return {
      columns: [],
      loadingText: '拼命加载中',
      isChartShow: false,
      isTrendShow: false,
      tableDataType: '所有数据',
      currentTableData: [],
      excelFileName: '规划数据分析结果.xls',
      excelHeader: {},
      spanArr: [],
      totalArea: 0,
      tableDataType2: '默认',
      singleTypeData: []
    }
  },
  methods: {
    handleClickClose() {
      this.$emit('closeDialog', 'isMTableShow')
    },
    formatter(row, column, cellValue, index) {
      return cellValue === '' || cellValue === ' ' || cellValue === null
        ? '暂无数据'
        : cellValue
    },
    getSummaries(param) {
      // 合并前三项 只显示面积
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        } else if (index === 4) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] = sums[index].toFixed(4) / 1
            sums[index] += ' 公顷'
            this.totalArea = sums[index]
          } else {
            sums[index] = 'N/A'
          }
        } else {
          sums[index] = ' '
        }
      })

      return sums
    },
    switchTableData(val) {
      // debugger;

      if (val === '高标准农田范围' || val === '城市周边永久基本农田') {
        return
      }
      // debugger;
      if (val === '所有数据') {
        this.currentTableData = this.tableData
      } else if (val === '用地红线') {
        this.currentTableData = this.tableData.filter(
          e =>
            e.type.indexOf('用地红线') !== -1
            || e.type.indexOf('预审红线') !== -1
        )
      } else {
        this.currentTableData = this.tableData.filter(
          e => e.type.indexOf(val) !== -1
        )
      }
      this.singleTypeData = this.currentTableData
      this.switchTableData2(this.tableDataType2)
      this.calcSpanArr()
    },
    switchTableData2(val) {
      if (this.tableDataType !== '土地利用现状') return

      let data = this.singleTypeData
      if (val === '默认') {
        this.changeToDefault(data)
      } else if (val === '详细') {
        this.changeToSpecific(data)
      }
      this.calcSpanArr()
    },
    changeToDefault(data) {
      this.currentTableData = data.filter(
        e => e.landuseCode.slice(2, 4) !== '--'
      )
    },
    changeToSpecific(data) {
      this.currentTableData = data.filter(
        e => e.landuseCode.slice(2, 4) === '--'
      )
    },
    calcSpanArr() {
      if (this.currentTableData.length === 0) return
      if (('DK_ID' in this.currentTableData[0])) return

      this.spanArr = []
      let len = this.currentTableData.length
      for (var i = 0; i < len; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (
            this.currentTableData[i].type === this.currentTableData[i - 1].type
          ) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    cellMerge({ row, column, rowIndex, columnIndex }) {
      if (this.spanArr.length === 0) return
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    updateTableHeader() {
      this.excelHeader = {}
      this.columns = []
      if (this.tableData.length === 0 || this.tableData[0].length === 0) return
      let layerOutFieldsAlias = this.layerOutFieldsAlias
      let tableHeader = this.tableData[0]
      var propAlias, data
      for (let propName in tableHeader) {
        if (!(propName === 'type' || propName === 'year')) {
          propAlias = layerOutFieldsAlias.get(propName)
          data = {
            prop: propName,
            label: propAlias
          }
          this.columns.push(data)
          this.excelHeader['' + propAlias] = propName
        }
      }
      // this.currentTableData = [...this.tableData];
      this.tableDataType = '所有数据'

      this.switchTableData(this.tableDataType)

      // this.calcSpanArr();
    },
    showExport(type) {
      if (type === 'chart') {
        this.isChartShow = !this.isChartShow
      } else if (type === 'trend') {
        this.isTrendShow = !this.isTrendShow
      } else if (type === 'report') {
        var result = ''
        var header = '地类名称\t\t地类编码\t\t占比（%）\t\t面积（公顷）\n'
        result += header
        var cols
        for (let item of this.currentTableData) {
          cols = `${item.landuseName}\t`
          if (item.landuseName.length <= 4) {
            cols += '\t'
          }
          cols += `${item.landuseCode}\t\t${item.landuseRatio}\t\t${item.landuseArea}\n`
          result += cols
        }
        this.exportRaw('规划数据分析结果.txt', result)
      } else if (type === 'execl') {
      }
    },
    fakeClick(obj) {
      var ev = document.createEvent('MouseEvents')
      ev.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      obj.dispatchEvent(ev)
    },
    exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window
      var export_blob = new Blob([data])
      var save_link = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'a'
      )
      save_link.href = urlObject.createObjectURL(export_blob)
      save_link.download = name
      this.fakeClick(save_link)
    }
  },
  components: {
    exportChart,
    exportTrend
  },
  watch: {
    tableData() {
      this.updateTableHeader()
    },
    isMTableShow() {
      this.tableDataType = '所有数据'
      this.tableDataType2 = '默认'
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
#m-table {
  position: fixed;
  left: 471px;
  top: 84px;
  width: 800px;
  height: 695px;
}

#m-table .table {
  width: 100%;
}
#m-table .button-list {
  text-align: right;
  margin: 8px 0px;
  margin-top: 15px;
}

#dataDetailBox {
  position: absolute;
  top: 6.625rem;
  right: 0.9rem;
}
.data_title {
  width: 800px;
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
  width: 800px;
  height: 600px;
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
