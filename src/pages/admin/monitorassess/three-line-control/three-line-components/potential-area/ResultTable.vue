<template>
  <div id="secondcollide"
       v-drag
       class="EPF-table">
    <div class="data_title_different">
      <span>永久基本农田潜力区分析结果</span>
      <i class="el-icon-close"
         @click="handleClickClose"
         style="position: absolute;right:20px;"></i>
    </div>
    <div class="data_content_different">
      <el-divider></el-divider>

      <el-row style=" display: flex;align-items: center;">
        <el-col :span="7  ">
          <div class="content_title">符合条件潜力区面积：{{conformingArea}}亩</div>
        </el-col>

        <el-col :span="7">
          <div class="content_unitSelect">
            <div class="content_title">耕地质量</div>
            <el-select v-model="unitData"
                       size="mini"
                       style="width:150px;"
                       @change="selectChartUnit">
              <el-option v-for="item in unitList"
                         :key="item.value"
                         :label="item.label"
                         :value="item"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="content_unitSelect">
            <div class="content_title">耕地种植属性</div>
            <el-select v-model="valueData"
                       size="mini"
                       style="width:150px;"
                       @change="selectChartUnit2">
              <el-option v-for="item in valueList"
                         :key="item.value"
                         :label="item.label"
                         :value="item"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="primary_search__2">筛选</div>
        </el-col>
      </el-row>

      <el-table :data="dataList"
                v-loading="loading"
                element-loading-text="数据加载中"
                empty-text="没有数据"
                element-loading-background="rgba(255, 255, 255,0.95)"
                max-height="500"
                style="width: 100%;min-height:80px;margin-top:20px;"
                @row-click="handleTableRowClick"
                border>
        <el-table-column v-for="item in keyVals"
                         :key="item.val"
                         :prop="item.val"
                         :label="item.key"
                         min-width="150"
                         align="center"></el-table-column>
      </el-table>
      <div style="text-align:right;margin:22px 0px;">
        <el-pagination background
                       layout="total, prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10,15,20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :page-count="pageCount"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"></el-pagination>
      </div>
      <el-divider></el-divider>
      <div class="button-list footer">
        <el-button type="primary"
                   size="small"
                   @click="showExport('chart')"
                   :disabled="loading">统计图</el-button>
        <el-button type="primary"
                   size="small"
                   @click="showExport('report')"
                   :disabled="loading">导出报告</el-button>
        <download-excel :data="currentTableData"
                        :fields="excelHeader"
                        :name="excelFileName"
                        style="display: inline">
          <el-button type="primary"
                     size="small"
                     @click="showExport('execl')"
                     :disabled="loading">导出Excel</el-button>
        </download-excel>
      </div>
      <resultEchart :chartData="dataList"
                    @close="isChartShow = false"
                    :isChartShow="isChartShow"
                    :chartName="titleName"
                    :chartUnitName="unitData"
                    ref="differentChart"></resultEchart>
    </div>
  </div>
</template>

<script>
import ResultEchart from './ResultEchart'
import { TABLE_KEYVAL } from '../../../mixins/dictionary'
export default {
  props: {
    secondcollideDialog: Boolean,
    tableData: Array,
    layerOutFieldsAlias: Map,
    layerFieldsToShow: Array,

    loading: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  inject: ['threeLine'],
  data() {
    return {
      conformingArea: 0,
      valueData: '全部',
      columns: [],
      loadingText: '拼命加载中',
      isChartShow: false,
      tableDataDefault: [],
      tableDataSpecific: [],
      tableDataType: '默认',
      currentTableData: this.tableData,
      totalArea: 0,
      excelFileName: '两规冲突检测分析结果.xls',
      excelHeader: {},
      spanArr: [],

      unitList: [
        {
          value: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15',
          label: '全部'
        },
        {
          value: '1,2,3,4,5',
          label: '优等'
        },
        {
          value: '6,7,8',
          label: '高等'
        },
        {
          value: '9,10,11,12',
          label: '中等'
        },
        {
          value: '13,14,15',
          label: '低等'
        }
      ],

      valueList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '种植粮食作物'
        },
        {
          value: '2',
          label: '粮与非粮轮作'
        },
        {
          value: '3',
          label: '林粮间作'
        },
        {
          value: '4',
          label: '种植非粮作物'
        },
        {
          value: '5',
          label: '休耕'
        },
        {
          value: '6',
          label: '未耕种'
        }
      ],

      dataList: [
        {
          xuhao: '010',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: '12002',
          city: '天河区'
        },
        {
          xuhao: '020',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: '14875',
          city: '荔湾区'
        },
        {
          xuhao: '030',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: '13564',
          city: '黄浦区'
        },
        {
          xuhao: '040',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: '20938',
          city: '越秀区'
        },
        {
          xuhao: '050',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: '24195',
          city: '花都区'
        }
      ],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,
      pageCount: 1,

      unitData: '全部',
      tableNumber: 22,
      keyVals: [],
      allDatas: [],
      filterDatas1: [],
      attribute0: [],
      attribute1: []
    }
  },
  created() {
    const me = this
    this.keyVals = this.$cloneDeep(TABLE_KEYVAL)
    this.$bus.$off('sendResult')
    this.$bus.$on('sendResult', res => {
      me.allDatas = res.properties
      // me.conformingArea = me.allDatas.reduce((total, currentValue, index, arr) => {
      //   return total + currentValue['st_area(shape)']
      // })

      me.conformingArea = res.statisticsInfo.reduce((total, num) => {
        return total + num['SUM_TBMJ'] * 1
      }, 0)
      me.totalRecord = me.threeLine.queryResultCount * 1
      me.pageCount = Math.ceil(me.totalRecord / me.pageSize)
      me.dataList = me.allDatas
    })
  },
  methods: {
    handleTableRowClick(row, column, event) {
      const index = this.allDatas.findIndex(item => item.object === row.object)
      this.$bus.$emit('showFeature', index)
    },
    async selectChartUnit(val) {
      this.loading = true
      this.attribute0 = [{key: 'where', val: `gjlyd in (${val.value})`}]
      this.totalRecord = await this.threeLine.getQueryCount(this.attribute0)
      const result = await this.threeLine.getQueryResult(this.pageNo, this.pageSize, this.attribute0)
      this.dataList = result.properties
      this.loading = false
    },
    selectChartUnit2(val) {
      this.loading = true
      this.attribute1 = [{key: 'where', val: `gdzzsxmc in (${val.value})`}]
      this.threeLine.getQueryResult(this.pageNo, this.pageSize, this.attribute1).then(res => {
        this.loading = false
        if (res) {
          this.dataList = res.properties
        }
      })
    },
    handleClickClose() {
      this.$emit('closeDialog', false)
      this.secondcollideDialog = false
      this.isChartShow = false
    },
    async handleSizeChange(val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      // this.dataList = this.allDatas.slice((this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize * 1 - 1)
      const result = await this.threeLine.getQueryResult(this.pageNo, this.pageSize)
      this.dataList = result.properties
    },
    async handleCurrentChange(val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      // this.dataList = this.allDatas.slice((this.pageNo - 1) * this.pageSize, this.pageNo * this.pageSize * 1 - 1)
      const result = await this.threeLine.getQueryResult(this.pageNo, this.pageSize)
      this.dataList = result.properties
    },
    updateTableHeader() {
      this.columns = []
      if (this.tableData.length === 0) return
      let layerOutFieldsAlias = this.layerOutFieldsAlias
      let tableHeader = this.tableData[0]
      var propAlias, data
      for (let propName in tableHeader) {
        if (propName !== 'type') {
          propAlias = layerOutFieldsAlias.get(propName)
          data = {
            prop: propName,
            label: propAlias
          }
          this.columns.push(data)
          this.excelHeader['' + propAlias] = propName
        }
      }
      this.currentTableData = this.tableData.filter(
        e => e.landuseCode.slice(2, 4) === '00'
      )
      this.calcSpanArr()
    },
    switchTableData() {
      if (this.tableDataType === '默认') {
        this.currentTableData = this.tableData.filter(
          e => e.landuseCode.slice(2, 4) === '00'
        )
      } else if (this.tableDataType === '详细') {
        this.currentTableData = this.tableData.filter(
          e => e.landuseCode.slice(2, 4) === '--'
        )
      }
      this.calcSpanArr()
    },
    calcSpanArr() {
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
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    showExport(type) {
      if (type === 'chart') {
        this.isChartShow = !this.isChartShow
        let that = this
        that.$refs.differentChart.drawBarChart()
        that.$refs.differentChart.drawPieChart()
      } else if (type === 'report') {
        var result = ''
        var header = '地类名称\t\t地类编码\t\t占比（%）\t\t面积（公顷）\n'
        result += header
        var cols
        for (let item of this.currentTableData) {
          cols = `${item.cityName}\t`
          if (item.cityName.length <= 4) {
            cols += '\t'
          }
          cols += `${item.landuseCode}\t\t${item.landuseRatio}\t\t${item.value}\n`
          result += cols
        }
        this.exportRaw('两规冲突检测分析结果.txt', result)
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
    ResultEchart
  },
  watch: {
    tableData() {
      this.updateTableHeader()
    }
  }
}
</script>

<style scoped>
#secondcollide {
  position: fixed;
  left: 471px;
  top: 84px;
  width: 50%;
  height: 60%;
  z-index: 1001;
}

#secondcollide .table {
  width: 100%;
}
#secondcollide .button-list {
  text-align: right;
  margin: 8px 0px;
  margin-top: 15px;
}

#dataDetailBox {
  position: absolute;
  top: 6.625rem;
  right: 0.9rem;
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
  position: relative;
}
.data_content_different {
  width: 100%;
  /* height: 500px; */
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  /* border: 1px solid #999; */
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.content_table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
.content_title_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.content_title {
  font-size: 16px;
  margin-right: 20px;
}
.content_unitSelect {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
}
.chart-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
<style >
#secondcollide .el-input--mini .el-input__inner {
  height: 38px;
  line-height: 38px;
}
</style>
