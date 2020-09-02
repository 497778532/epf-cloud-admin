<template>
  <div id="result"
       class="zebra">
    <el-row class="data_title_different"
            type="flex"
            justify="space-between"
            align="middle">
      <span>空间查询结果</span>
      <i class="el-icon-circle-close"
         @click="handleClickClose"
         style="font-size:26px"></i>
    </el-row>
    <div class="data_content_different">

      <el-row style=" display: flex;align-items: center;margin:10px 0">
        <span v-for='(item,index) in list'
              class="EPFButton"
              :class="index===activeIndex?'EPFBlue marginLeft':'EPFBrown marginLeft'"
              @click="activeIndex=index"
              :key="index">
          {{item.name}}
        </span>
      </el-row>

      <el-table :data="dataList"
                v-loading="loading"
                stripe
                height="210px"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                style="width: 100%;">

        <el-table-column type="index"
                         label="序号"
                         min-width="50">
        </el-table-column>
        <el-table-column prop="chongtuType"
                         label="地类名称"
                         min-width="250"
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.chongtuType }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="chongtuType"
                         label="地类编码"
                         min-width="250"
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.chongtuType }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="chongtuType"
                         label="面积"
                         min-width="250"
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.chongtuType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="chongtuType"
                         label="市"
                         min-width="250"
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.chongtuType }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="chongtuType"
                         label="县区"
                         min-width="250"
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.chongtuType }}</span>
          </template>
        </el-table-column>

      </el-table>
      <div style="text-align:right"
           class="fanye">
        <el-pagination background
                       layout="total, prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10,15,20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"></el-pagination>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  props: {
    secondcollideDialog: Boolean,
    tableData: Array,
    layerOutFieldsAlias: Map,
    layerFieldsToShow: Array,

    loading: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  data () {
    return {
      list: [{ name: '总体规划' }, { name: '村庄规划' }, { name: '永久基本农田' }, { name: '土地用途分区' }, { name: '城镇开发边界' }],
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
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '优等'
        },
        {
          value: '2',
          label: '高等'
        },
        {
          value: '3',
          label: '中等'
        },
        {
          value: '4',
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
      activeIndex: 1,
      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      unitData: '全部',
      tableNumber: 22
    }
  },
  methods: {
    selectChartUnit (val) {
      console.log(val)
      this.unitData = val.label
      this.tableNumber = Math.round(Math.random() * 50)
      this.dataList = [
        {
          xuhao: '010',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: Math.round(Math.random() * 30000),
          city: '天河区'
        },
        {
          xuhao: '020',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: Math.round(Math.random() * 30000),
          city: '荔湾区'
        },
        {
          xuhao: '030',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: Math.round(Math.random() * 30000),
          city: '黄浦区'
        },
        {
          xuhao: '040',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: Math.round(Math.random() * 30000),
          city: '越秀区'
        },
        {
          xuhao: '050',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: Math.round(Math.random() * 30000),
          city: '花都区'
        }
      ]
    },
    handleClickClose () {
      this.$emit('closeDialog')
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
    },
    // getSummaries(param) {
    //   // 合并前三项 只显示面积
    //   const { columns, data } = param
    //   const sums = []
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = '合计'
    //       return
    //     } else if (index === 1 || index === 2) {
    //       sums[index] = ' '
    //       return
    //     } else if (index === 3) {
    //       sums[index] = '100%'
    //       return
    //     }
    //     const values = data.map(item => Number(item[column.property]))
    //     if (!values.every(value => isNaN(value))) {
    //       sums[index] = values.reduce((prev, curr) => {
    //         const value = Number(curr)
    //         if (!isNaN(value)) {
    //           return prev + curr
    //         } else {
    //           return prev
    //         }
    //       }, 0)
    //       sums[index] = sums[index].toFixed(5) / 1
    //       sums[index] += ' 公顷'
    //       this.totalArea = '图斑总面积：' + sums[index]
    //     } else {
    //       sums[index] = 'N/A'
    //     }
    //   })

    //   return sums
    // },
    updateTableHeader () {
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
    switchTableData () {
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
    calcSpanArr () {
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
    cellMerge ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    showExport (type) {
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
    fakeClick (obj) {
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
    exportRaw (name, data) {
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

  watch: {
    tableData () {
      this.updateTableHeader()
    }
  }
}
</script>

<style scoped>
#result {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100% - 400px);

  z-index: 1001;

  padding: 0 16px;
  background: #fff;
}

#result .table {
  width: 100%;
}
#result .button-list {
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
  font-size: 18px;
  font-weight: 700;
  padding: 0 10px;
  height: 35px;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
}
.data_content_different {
  width: 100%;

  padding: 0 10px;
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
.marginLeft {
  margin-left: 10px;
}
</style>

