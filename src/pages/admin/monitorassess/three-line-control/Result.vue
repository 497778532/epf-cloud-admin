<template>
  <div id="result"
       class="zebra">
    <el-row class="data_title_different drag-title"
            type="flex"
            justify="space-between"
            align="middle">
      <span>空间查询结果</span>
      <el-row type="flex"
              align="middle">
        <el-row class="tab-button"
                type="flex">
          <div :class="{'active':currentLi===1}"
               @click="currentLi=1">总体描述</div>
          <div :class="{'active':currentLi===2}"
               @click="currentLi=2">详细列表</div>
        </el-row>
        <i class="el-icon-circle-close"
           @click="handleClickClose"
           style="font-size:26px"></i>
      </el-row>
    </el-row>
    <div v-if="currentLi===2">
      <div class="data_content_different">
        <el-row style=" display: flex;align-items: center;margin:10px 0">
          <span v-for="(item,index) in list"
                class="EPFButton"
                :class="index===activeIndex?'EPFBlue marginLeft':'EPFBrown marginLeft'"
                @click="activeIndex=index"
                :key="index">{{item.name}}</span>
          <div class="downLoad">
            <span @click="selcet">信息列筛选</span>
            <span class="line"></span>
            <span>下载文档</span>
          </div>
        </el-row>

        <el-table :data="dataList"
                  :fit="true"
                  v-loading="loading"
                  stripe
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;"
                  @row-click="centerAtMap">
          <el-table-column v-for="(item,index) in selcetTitle"
                           :prop="item.en"
                           :label="item.ch"
                           min-width="250"
                           align="center"
                           :key="index
                           "></el-table-column>
        </el-table>
        <div style="text-align:right"
             class="fanye">
          <el-pagination background
                         layout="total, prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10,15,20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="tableData.length"
                         :current-page.sync="pageNo"
                         :page-size="pageSize"></el-pagination>
        </div>
      </div>
    </div>
    <div v-if="currentLi===1">
      <el-table :data="tableList"
                v-loading="loading"
                stripe
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                style="width: 100%;">
        <el-table-column type
                         label
                         min-width="90"
                         show-overflow-tooltip
                         prop="title"></el-table-column>
        <el-table-column prop="area"
                         label="面积"
                         min-width="90"
                         show-overflow-tooltip
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.area }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="num"
                         label="地块数量"
                         min-width="90"
                         show-overflow-tooltip
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.num }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="avgQuality"
                         label="评价质量"
                         show-overflow-tooltipF
                         min-width="90"
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.avgQuality }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="qualityLand"
                         label="优质地数量(质量等级1-4)"
                         min-width="130"
                         show-overflow-tooltip
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.qualityLand }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="higher"
                         label="高等地数量(质量等级5-8)"
                         show-overflow-tooltip
                         min-width="130"
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.higher }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="chongtuType"
                         label="中等地数量(质量等级9-12)"
                         show-overflow-tooltip
                         min-width="130"
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.chongtuType }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="inferior"
                         label="低等地数量(质量等级13-15)"
                         show-overflow-tooltip
                         min-width="130"
                         align="center">
          <template slot-scope="scope">
            <span class="table-text">{{ scope.row.inferior }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right "
           class="fanye">
        <el-pagination background
                       layout="total, prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10,15,20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :current-page.sync="pageNo"
                       :page-size="pageSize"></el-pagination>
      </div>
    </div>
    <div v-if="selcetDialog"
         v-drag
         class="selcetDialog">
      <el-row type="flex"
              align="middle">
        <span class="table-header__title">筛选数据列</span>

        <i class="el-icon-circle-close"
           @click="selcetDialog=false"
           style="font-size:26px;margin-left:auto"></i>
      </el-row>
      <div class="table-content">
        <div>
          <el-checkbox-group v-model="selcetTitleArr"
                             @change="handleChange">
            <el-checkbox class="checkbox"
                         v-for="(item,index) in selcetTitleAll"
                         :label="item"
                         :disabled="item.state"
                         :key="index">{{item.ch}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="cancel">
          <span>全部取消</span>
          <span>(至多可选择4项)</span>
        </div>
      </div>
      <el-row type="flex"
              style="margin:16px 0"
              justify="space-around">
        <div class="EPFButton EPFBlue">取消</div>
        <div class="EPFButton EPFBlue"
             @click="enter">确认</div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    secondcollideDialog: Boolean,
    tableData: Array,
    tableList: Array,
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
      selcetTitle: [
        { ch: '要素ID', en: 'OBJECTID', state: true },
        { ch: '地类名称', en: 'DLMC_EJ', state: true },
        { ch: '座落单位名称', en: 'XZQHMC', state: true },
        { ch: '基本农田类型', en: 'QMGHDL', state: true }
      ],
      selcetTitleArr: [],
      selcetTitleAll: [
        { ch: '序号', en: 'chongtuType', state: true },
        { ch: '地类名称', en: 'chongtuType', state: true },
        { ch: '座落单位名称', en: 'chongtuType', state: true },
        { ch: '基本农田类型', en: 'chongtuType', state: true },
        { ch: '质量等级代码', en: 'chongtuType', state: false },
        { ch: '坡度级别', en: 'chongtuType', state: false },
        { ch: '质量等级代码', en: 'chongtuType', state: false },
        { ch: '质量等级代码', en: 'chongtuType', state: false }
      ],
      selcetDialog: false,
      currentLi: 1,
      list: [{ name: '项目占用地块' }, { name: '项目补化地块' }],
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

      dataList: [],
      dataList2: [
        {
          title: '占用',
          xuhao: '010',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: '12002',
          city: '天河区'
        },
        {
          title: '补化',
          xuhao: '020',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: '14875',
          city: '荔湾区'
        },
        {
          title: '对比结果',
          xuhao: '020',
          chongtuType: '两规均为建设用地',
          chengguiType: '居住用地',
          tuguiName: '基本农田',
          value: '14875',
          city: '荔湾区'
        }
      ],
      activeIndex: 1,
      // 页码
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      unitData: '全部',
      tableNumber: 22
    }
  },
  methods: {
    centerAtMap (row) {
      this.$findMapApp('threeLine').view.extent = {
        xmin: row.GEOM.bbox[0],
        ymin: row.GEOM.bbox[1],
        xmax: row.GEOM.bbox[2],
        ymax: row.GEOM.bbox[3],
        spatialReference: this.$findMapApp('threeLine').map.spatialReference
      }
    },
    enter () {
      this.selcetDialog = false

      this.selcetTitle = JSON.parse(
        JSON.stringify([...this.selcetTitleArr, ...this.selcetTitle])
      )
    },
    selcet () {
      this.selcetDialog = true
    },
    selectChartUnit (val) {
      console.log(val)
      this.unitData = val.label
      this.tableNumber = Math.round(Math.random() * 50)
    },
    handleClickClose () {
      this.$emit('closeDialog')
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.handleChange()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.handleChange()
    },
    handleChange () {
      this.dataList = this.tableData.slice(
        (this.pageNo - 1) * this.pageSize,
        this.pageNo * this.pageSize
      )
    }
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
    // updateTableHeader () {
    //   this.columns = []
    //   if (this.tableData.length === 0) return
    //   let layerOutFieldsAlias = this.layerOutFieldsAlias
    //   let tableHeader = this.tableData[0]
    //   var propAlias, data
    //   for (let propName in tableHeader) {
    //     if (propName !== 'type') {
    //       propAlias = layerOutFieldsAlias.get(propName)
    //       data = {
    //         prop: propName,
    //         label: propAlias
    //       }
    //       this.columns.push(data)
    //       this.excelHeader['' + propAlias] = propName
    //     }
    //   }
    //   this.currentTableData = this.tableData.filter(
    //     e => e.landuseCode.slice(2, 4) === '00'
    //   )
    //   this.calcSpanArr()
    // },
    // switchTableData () {
    //   if (this.tableDataType === '默认') {
    //     this.currentTableData = this.tableData.filter(
    //       e => e.landuseCode.slice(2, 4) === '00'
    //     )
    //   } else if (this.tableDataType === '详细') {
    //     this.currentTableData = this.tableData.filter(
    //       e => e.landuseCode.slice(2, 4) === '--'
    //     )
    //   }
    //   this.calcSpanArr()
    // },
    // calcSpanArr () {
    //   this.spanArr = []
    //   let len = this.currentTableData.length
    //   for (var i = 0; i < len; i++) {
    //     if (i === 0) {
    //       this.spanArr.push(1)
    //       this.pos = 0
    //     } else {
    //       // 判断当前元素与上一个元素是否相同
    //       if (
    //         this.currentTableData[i].type === this.currentTableData[i - 1].type
    //       ) {
    //         this.spanArr[this.pos] += 1
    //         this.spanArr.push(0)
    //       } else {
    //         this.spanArr.push(1)
    //         this.pos = i
    //       }
    //     }
    //   }
    // },
    // cellMerge ({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     const _row = this.spanArr[rowIndex]
    //     const _col = _row > 0 ? 1 : 0
    //     return {
    //       rowspan: _row,
    //       colspan: _col
    //     }
    //   }
    // },
    // showExport (type) {
    //   if (type === 'chart') {
    //     this.isChartShow = !this.isChartShow
    //     let that = this
    //     that.$refs.differentChart.drawBarChart()
    //     that.$refs.differentChart.drawPieChart()
    //   } else if (type === 'report') {
    //     var result = ''
    //     var header = '地类名称\t\t地类编码\t\t占比（%）\t\t面积（公顷）\n'
    //     result += header
    //     var cols
    //     for (let item of this.currentTableData) {
    //       cols = `${item.cityName}\t`
    //       if (item.cityName.length <= 4) {
    //         cols += '\t'
    //       }
    //       cols += `${item.landuseCode}\t\t${item.landuseRatio}\t\t${item.value}\n`
    //       result += cols
    //     }
    //     this.exportRaw('两规冲突检测分析结果.txt', result)
    //   } else if (type === 'execl') {
    //   }
    // },
    // fakeClick (obj) {
    //   var ev = document.createEvent('MouseEvents')
    //   ev.initMouseEvent(
    //     'click',
    //     true,
    //     false,
    //     window,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     false,
    //     false,
    //     false,
    //     false,
    //     0,
    //     null
    //   )
    //   obj.dispatchEvent(ev)
    // },
    // exportRaw (name, data) {
    //   var urlObject = window.URL || window.webkitURL || window
    //   var export_blob = new Blob([data])
    //   var save_link = document.createElementNS(
    //     'http://www.w3.org/1999/xhtml',
    //     'a'
    //   )
    //   save_link.href = urlObject.createObjectURL(export_blob)
    //   save_link.download = name
    //   this.fakeClick(save_link)
    // }
  },
  mounted () {
    let width = document.querySelector('.body__right').offsetWidth + 'px'
    document.querySelector('#result').style.width = width
  },
  watch: {
    tableData () {
      this.handleChange()
    }
  }
}
</script>

<style scoped>
#result {
  position: fixed;
  right: 24px;
  bottom: 16px;
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
.tab-button {
  border-radius: 2px;
  border: 1px solid rgba(80, 165, 244, 1);
  font-size: 16px;
  margin-right: 15px;
}
.tab-button > div {
  padding: 2px 4px;

  font-weight: 400;
}
.tab-button > div {
  color: rgba(80, 165, 244, 1);
  background: #fff;
}
.tab-button > div:nth-child(2) {
}
.tab-button > div.active {
  background: rgba(27, 116, 238, 1);
  color: #fff;
}
.downLoad {
  color: rgba(80, 165, 244, 1);
  margin-left: auto;
  display: flex;
  align-items: center;
}
.downLoad > span {
  cursor: pointer;
}
.line {
  margin: 0 8px;
  width: 1px;
  height: 24px;
  line-height: 24px;
  background: rgba(0, 0, 0, 1);
}

.selcetDialog {
  position: fixed;
  left: 50%;
  margin-left: -320px;
  top: 200px;
  width: 640px;
  height: 296px;
  z-index: 1002;
  background: #fff;
  padding: 16px;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  border: 1px solid rgba(213, 213, 213, 1);
}
.table-header__title {
  font-size: 18px;

  color: rgba(89, 89, 89, 1);
  font-weight: 700;
}

.table-content {
  background: rgba(248, 248, 248, 1);
  padding: 20px 8px 8px 8px;
  height: 180px;
  position: relative;
  margin-top: 10px;
}
.cancel {
  position: absolute;
  bottom: 8px;
  left: 8px;
}
</style>

