<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">高新技术企业认定信息</div>
        </div>
      </div>
      <div class="page-list-nature EPF-table">
        <div class="switchHeight_box_nature">
          <div class="switchHeight_box_nature_left">
            <div style="width:80px;height:40px;display:flex;">

              <div class="tab-title-chart-nature"
                   :class="{
                'tab-title-chart2-nature': cjActiveName === 'Chart',
                'tab-title-chart4-nature': cjActiveName === 'Table'
              }"
                   @click="turnChart">
                <img src="../../../../assets/images/jcpgyj/project/条形图选中2x.png"
                     alt=""
                     style="width:100%;height:100%;"
                     v-if="cjActiveName === 'Chart'" />
                <img src="../../../../assets/images/jcpgyj/project/条形图未选2x.png"
                     alt=""
                     style="width:100%;height:100%;"
                     v-if="cjActiveName === 'Table'" />
              </div>
              <div class="tab-title-chart-nature"
                   :class="{
                'tab-title-chart1-nature': cjActiveName === 'Table',
                'tab-title-chart3-nature': cjActiveName === 'Chart'
              }"
                   @click="turnTable">
                <img src="../../../../assets/images/jcpgyj/project/表格选中2x.png"
                     alt=""
                     style="width:100%;height:100%;"
                     v-if="cjActiveName === 'Table'" />
                <img src="../../../../assets/images/jcpgyj/project/表格未选2x.png"
                     alt=""
                     style="width:100%;height:100%;"
                     v-if="cjActiveName === 'Chart'" />
              </div>
            </div>

            <div class="filter_title_box"
                 style="margin-left:24px;">
              <span class="filter_title__custom">统计年份：</span>

              <el-date-picker v-model="beginYear"
                              type="year"
                              align="center"
                              :clearable="false"
                              value-format="yyyy"
                              @change="getBeginYear"
                              placeholder="选择开始年份"
                              style="width:180px;">
              </el-date-picker>
              <span style="margin:0 10px;">至</span>
              <el-date-picker v-model="endYear"
                              type="year"
                              align="center"
                              :clearable="false"
                              value-format="yyyy"
                              @change="getEndYear"
                              placeholder="选择结束年份"
                              style="width:180px;">
              </el-date-picker>

            </div>
            <div class="primary_search"
                 @click="searchList()">查询</div>
            <div class="flex-box"
                 v-if="cjActiveName === 'Table'">
              <div class="primary_export"><span @click="exportList()">导出excel</span></div>
            </div>
          </div>
        </div>

        <div class="checkout-big-box"
             v-show="cjActiveName === 'Table'">
          <div class="checkout-box-title">
            信息列筛选：
          </div>
          <div class="checkout-box">
            <el-checkbox-group v-model="checkListIng"
                               @change="handleCheckedTypesChange">
              <el-checkbox v-for="(item, index) in checkList"
                           :key="index"
                           :label="item"
                           :disabled="checkDisList.includes(item)"></el-checkbox>
              <span @click="handleCheckedTypesCancelChange"
                    style="color:#1B74EE;font-size:16px;line-height: 21px;cursor:pointer;margin-left:32px;">全部取消</span>
              <span style="color:#9A9A9A;font-size:16px;line-height: 21px;">（至多可选择7项）</span>
            </el-checkbox-group>
          </div>
        </div>

        <div class="unitTipTable-nature"
             v-if="cjActiveName === 'Table'">
          单位：个
        </div>
        <div v-if="cjActiveName === 'Table'">
          <el-table :data="listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    stripe
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border>
            <el-table-column prop="NF"
                             label="年份"
                             min-width="100"
                             align="center"></el-table-column>
            <el-table-column prop="ZZJGDM"
                             label="组织机构代码"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('组织机构代码')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZZJGDM===''">- -</span>
                <span v-else>{{scope.row.ZZJGDM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="DWMC"
                             label="单位名称"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('单位名称')">
              <template slot-scope="scope">
                <span v-if="scope.row.DWMC===''">- -</span>
                <span v-else>{{scope.row.DWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BH"
                             label="编号"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('编号')">
              <template slot-scope="scope">
                <span v-if="scope.row.BH===''">- -</span>
                <span v-else>{{scope.row.BH}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JB"
                             label="级别"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('级别')">
              <template slot-scope="scope">
                <span v-if="scope.row.JB===''">- -</span>
                <span v-else>{{scope.row.JB}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FZDW"
                             label="发证单位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('发证单位')">
              <template slot-scope="scope">
                <span v-if="scope.row.FZDW===''">- -</span>
                <span v-else>{{scope.row.FZDW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FZRQ"
                             label="发证日期"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('发证日期')">
              <template slot-scope="scope">
                <span v-if="scope.row.FZRQ===''">- -</span>
                <span v-else>{{scope.row.FZRQ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YXQ"
                             label="有效期"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('有效期')">
              <template slot-scope="scope">
                <span v-if="scope.row.YXQ===''">- -</span>
                <span v-else>{{scope.row.YXQ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZXRQ"
                             label="注销日期"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('注销日期')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZXRQ===''">- -</span>
                <span v-else>{{scope.row.ZXRQ}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin:50px 0;text-align:right;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5, 10, 15, 20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="this.listData.length"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </div>
        <!-- 第一个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：个</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBar1 === true }"
                 @click="revealBar1">
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
import moment from 'moment'

export default {
  mixins: [complexity],
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      params: {
        KSSJ: moment().year() - 9,
        JSSJ: moment().year()
      },
      showYear: [],
      loading: true,

      checkList: [], // 全部多选内容
      checkDisList: ['年份'], // 默认+判断禁用内容
      checkListIng: [], // 选中内容
      checked: true, // 是否禁用

      checkAllData: [], // 后台数据
      checkChartData: [] // 图表展示数据
    }
  },
  methods: {
    turnChart () {
      this.cjActiveName = 'Chart'
      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
        }, 0)
      })
    },
    searchList () {
      if ((this.beginYear !== '' && this.endYear === '') || (this.beginYear === '' && this.endYear !== '')) {
        this.$message.error('开始年份 或 结束年份 存在空值')
        return
      }
      if (this.beginYear === '' && this.endYear === '') return

      if (this.beginYear && this.endYear) {
        this.params.KSSJ = this.beginYear// 开始时间
        this.params.JSSJ = this.endYear// 结束时间
      }

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getEconomyData()
    },
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['年份', '组织机构代码', '单位名称', '编号', '级别', '发证单位', '发证日期', '有效期', '注销日期']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['NF', 'ZZJGDM', 'DWMC', 'BH', 'JB', 'FZDW', 'FZRQ', 'YXQ', 'ZXRQ']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '高新技术企业认定信息')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleCheckedTypesChange (value) {
      if (this.checkListIng.length === 8) {
        this.checkDisList = this.checkList.filter(item => {
          return this.checkListIng.indexOf(item) === -1
        })
        this.checkDisList.unshift('年份')
      } else {
        this.checkDisList = ['年份']
      }
    },
    handleCheckedTypesCancelChange () {
      this.checkDisList = ['年份']
      this.checkListIng = ['年份']
    },
    async getEconomyData () {
      this.loading = true
      this.xzhouData = []
      this.seriesAllDataForBar1 = []

      let endYear = Number(this.params.JSSJ)
      let beginYear = Number(this.params.KSSJ)
      let arrYear = [] // 查询年份

      let section = endYear - beginYear // 年份差变量
      for (let i = 0; i <= section; i++) {
        arrYear.push(endYear--)
      }
      this.showYear = arrYear.reverse()

      let chartData = []
      let tableData = []
      for (let i = 0; i < (this.showYear.length) - 1; i++) {
        let res = await this.$post(`/epf-third-part/threebatch/GXJSQYRDXXB?KSSJ=${this.showYear[i]}&JSSJ=${this.showYear[i + 1]}`)
        if (res.code === 0) {
          for (let key in res.result) {
            res.result[key]['NF'] = this.showYear[i]
          }
          let dataForChart = res.result.length
          chartData.push(dataForChart)
          let dataForTable = res.result
          tableData = tableData.concat(dataForTable)
        } else {
          this.loading = false
          this.isShowData = false
          this.listData = []
          // this.checkList = ['年份', '组织机构代码', '单位名称', '编号', '级别', '发证单位', '发证日期', '有效期', '注销日期']
          // this.checkListIng = ['年份', '组织机构代码', '单位名称', '编号', '级别', '发证单位', '发证日期', '有效期']
          this.$message.error(res.msg)
          return
        }
      }
      chartData = chartData.filter(res => {
        return res !== undefined
      })

      this.loading = false
      this.listData = tableData
      // this.checkList = ['年份', '组织机构代码', '单位名称', '编号', '级别', '发证单位', '发证日期', '有效期', '注销日期']
      // this.checkListIng = ['年份', '组织机构代码', '单位名称', '编号', '级别', '发证单位', '发证日期', '有效期']
      this.xzhouData = [] // x轴数据
      this.legendDataForBar1 = [] // 图例数据

      // 展示的数据
      let data0 = []

      data0 = chartData
      this.xzhouData = this.showYear

      if (chartData.length === 0) {
        this.legendDataForBar1 = []
        this.isShowData = false
      } else {
        this.legendDataForBar1 = ['高新技术企业_个数']
        this.isShowData = true
      }

      this.seriesAllDataForBar1.push(data0)

      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
        }, 0)
      })
    }
  },
  created () {
    this.checkList = ['年份', '组织机构代码', '单位名称', '编号', '级别', '发证单位', '发证日期', '有效期', '注销日期']
    this.checkListIng = ['年份', '组织机构代码', '单位名称', '编号', '级别', '发证单位', '发证日期', '有效期']
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barDrawLine1()
      }, 0)
    })

    this.initBarEchart1()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
        }, 0)
      })
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
