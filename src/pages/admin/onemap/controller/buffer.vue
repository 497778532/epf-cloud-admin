<template>
  <div v-if="bufferDialog" id="buffer" v-drag>
    <div class="data_title">
      <span>缓冲分析结果</span>
      <i class="el-icon-close" @click="handleClickClose" style="position: absolute;right:20px;"></i>
    </div>
    <div class="data_content">
      <el-table
        :data="currentTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        class="table"
        border
        v-loading="loading"
        height="450"
        :element-loading-text="loadingText"
        empty-text="暂无数据"
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
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableDataLength"
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
      ></el-pagination>
      <div class="button-list footer">
        <!-- <el-button type="primary" size="mini" @click="showExport('chart')" :disabled="loading">统计图</el-button> -->
        <el-button type="primary" size="mini" @click="showExport('report')" :disabled="loading">导出报告</el-button>
        <download-excel
          :data="tableData"
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
    </div>
  </div>
</template>

<script>
import exportChart from './export-chart'

export default {
  props: {
    bufferDialog: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    tableData: Array,
    layerOutFieldsAlias: Map,
    layerFieldsToShow: Array,
    loading: Boolean
  },
  data() {
    return {
      columns: [],
      currentTableData: [],
      loadingText: '拼命加载中',
      isChartShow: false,
      excelFileName: '缓冲分析结果.xls',
      pageSize: 60,
      tableDataLength: 1,
      currentPage: 1,
      excelHeader: {},
      totalArea: 0
    }
  },
  methods: {
    handleClickClose() {
      this.$emit('closeDialog', 'bufferDialog')
    },
    exReport() {
      var results = ''
      var cols = ''
      var names = []
      this.columns.forEach(e => {
        results += `${e.label}\t`
        names.push(e.prop)
      })
      results += '\n'
      for (let item = 0; item < this.tableData.length; item++) {
        for (let key = 0; key < names.length; key++) {
          var n = names[key]
          cols += `${this.tableData[item]['' + n]}\t`
          if (key === names.length - 1) {
            cols += '\n'
          }
        }
      }
      results += cols

      this.exportRaw('缓冲分析结果.txt', results)
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
    },
    formatter(row, column, cellValue, index) {
      return cellValue === '' || cellValue === ' ' || cellValue === null
        ? '暂无数据'
        : cellValue
    },
    updateTableData() {
      this.columns = []
      // console.log(this.tableData)
      if (!this.tableData || this.tableData.length === 0) return
      this.tableDataLength = this.tableData.length
      let layerOutFieldsAlias = this.layerOutFieldsAlias
      let tableHeader = this.layerFieldsToShow
      var propAlias, data
      tableHeader.forEach(propName => {
        propAlias = layerOutFieldsAlias.get(propName)
        data = {
          prop: propName,
          label: propAlias
        }
        this.columns.push(data)
        this.excelHeader['' + propAlias] = propName
      })
      this.currentTableData = this.tableData
    },
    showExport(type) {
      if (type === 'chart') {
        this.isChartShow = !this.isChartShow
      } else if (type === 'report') {
        this.exReport()
      } else if (type === 'execl') {
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange() {
      this.currentPage = 1
      this.pageSize = val
    }
  },
  components: { exportChart },
  watch: {
    bufferDialog(val) {
      if (val) {
        this.updateTableData()
        console.log(val)
      }
    },
    tableData() {
      if (this.updateTableData) {
        this.updateTableData()
      }
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
#buffer {
  position: fixed;
  left: 471px;
  top: 84px;
  width: 800px;
  height: 695px;
}

#buffer .button-list {
  text-align: right;
  margin: 8px 0px;
  margin-top: 15px;
}

#buffer .data_title {
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
#buffer .data_content {
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
</style>
