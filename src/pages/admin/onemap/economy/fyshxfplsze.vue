<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">分月社会消费品零售总额</div>
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
          单位：万元
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
            <el-table-column prop="ZJ_WY"
                             label="总计_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('总计_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZJ_WY===''">- -</span>
                <span v-else>{{scope.row.ZJ_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YJD_WY"
                             label="一季度_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('一季度_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.YJD_WY===''">- -</span>
                <span v-else>{{scope.row.YJD_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="EJD_WY"
                             label="二季度_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('二季度_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.EJD_WY===''">- -</span>
                <span v-else>{{scope.row.EJD_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SJD_WY"
                             label="三季度_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('三季度_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.SJD_WY===''">- -</span>
                <span v-else>{{scope.row.SJD_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SJD_WY"
                             label="四季度_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('四季度_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.SJD_WY===''">- -</span>
                <span v-else>{{scope.row.SJD_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="siY_WY"
                             label="4月_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('4月_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.siY_WY===''">- -</span>
                <span v-else>{{scope.row.siY_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WY_WY"
                             label="5月_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('5月_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.WY_WY===''">- -</span>
                <span v-else>{{scope.row.WY_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="LY_WY"
                             label="6月_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('6月_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.LY_WY===''">- -</span>
                <span v-else>{{scope.row.LY_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QY_WY"
                             label="7月_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('7月_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.QY_WY===''">- -</span>
                <span v-else>{{scope.row.QY_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BY_WY"
                             label="8月_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('8月_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.BY_WY===''">- -</span>
                <span v-else>{{scope.row.BY_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JY_WY"
                             label="9月_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('9月_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.JY_WY===''">- -</span>
                <span v-else>{{scope.row.JY_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SY_WY"
                             label="10月_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('10月_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.SY_WY===''">- -</span>
                <span v-else>{{scope.row.SY_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SYY_WY"
                             label="11月_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('11月_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.SYY_WY===''">- -</span>
                <span v-else>{{scope.row.SYY_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SEY_WY"
                             label="12月_万元"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('12月_万元')">
              <template slot-scope="scope">
                <span v-if="scope.row.SEY_WY===''">- -</span>
                <span v-else>{{scope.row.SEY_WY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GXSJ"
                             label="更新时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('更新时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.GXSJ===''">- -</span>
                <span v-else>{{scope.row.GXSJ}}</span>
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
          <div>单位：万元</div>
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
        <!-- 第二个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：万元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine1 === true }"
                 @click="revealLine1">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart1"
               ref="lineChart1"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第三个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：万元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine2 === true }"
                 @click="revealLine2">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart2"
               ref="lineChart2"
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
        NF: ''
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
          this.lineDrawLine1()
          this.lineDrawLine2()
        }, 0)
      })
    },
    searchList () {
      if ((this.beginYear !== '' && this.endYear === '') || (this.beginYear === '' && this.endYear !== '')) {
        this.$message.error('开始年份 或 结束年份 存在空值')
        return
      }
      if (this.beginYear === '' && this.endYear === '') return

      let endYear = Number(this.endYear)
      let beginYear = Number(this.beginYear)
      let arrYear = [] // 查询年份

      if (this.beginYear && this.endYear) {
        let section = endYear - beginYear // 年份差变量
        for (let i = 0; i <= section; i++) {
          arrYear.push(endYear--)
        }
      }
      this.showYear = arrYear.reverse()

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getEconomyData(this.showYear)
    },
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['年份', '总计_万元', '一季度_万元', '二季度_万元', '三季度_万元', '四季度_万元', '4月_万元', '5月_万元', '6月_万元', '7月_万元', '8月_万元', '9月_万元', '10月_万元', '11月_万元', '12月_万元', '更新时间']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['NF', 'ZJ_WY', 'YJD_WY', 'EJD_WY', 'SJD_WY', 'SJD_WY', 'siY_WY', 'WY_WY', 'LY_WY', 'QY_WY', 'BY_WY', 'JY_WY', 'SY_WY', 'SYY_WY', 'SEY_WY', 'GXSJ']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '分月社会消费品零售总额')
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
    async getEconomyData (yaerList) {
      this.loading = true
      this.xzhouData = []
      this.seriesAllDataForBar1 = []
      this.seriesAllDataForLine1 = []
      this.seriesAllDataForLine2 = []

      let chartData = []
      for (let i = 0; i < yaerList.length; i++) {
        let res = await this.$post(`/epf-third-part/oneBatch/FYSHXFPLSZE?NF=${yaerList[i]}`)
        if (res.code === 0) {
          let data = res.result[0]
          chartData.push(data)
        } else {
          this.loading = false
          this.isShowData = false
          this.listData = []
          // this.checkList = ['年份', '总计_万元', '一季度_万元', '二季度_万元', '三季度_万元', '四季度_万元', '4月_万元', '5月_万元', '6月_万元', '7月_万元', '8月_万元', '9月_万元', '10月_万元', '11月_万元', '12月_万元', '更新时间']
          // this.checkListIng = ['年份', '总计_万元', '一季度_万元', '二季度_万元', '三季度_万元', '四季度_万元', '4月_万元', '更新时间']
          this.$message.error(res.msg)
          return
        }
      }
      chartData = chartData.filter(res => {
        return res !== undefined
      })

      for (let key in chartData) {
        chartData[key]['RankYear'] = parseInt(chartData[key].NF)
        if (chartData[key].NF.length > 4) {
          chartData[key]['RankYearChange'] = 0
        } else {
          chartData[key]['RankYearChange'] = 1
        }
      }

      chartData.sort(function (a, b) {
        if (a.RankYear === b.RankYear) { // 如果RankYear相同，按照RankYearChange的降序
          return b.RankYearChange - a.RankYearChange
        } else {
          return a.RankYear - b.RankYear
        }
      })

      this.loading = false
      this.listData = chartData
      // this.checkList = ['年份', '总计_万元', '一季度_万元', '二季度_万元', '三季度_万元', '四季度_万元', '4月_万元', '5月_万元', '6月_万元', '7月_万元', '8月_万元', '9月_万元', '10月_万元', '11月_万元', '12月_万元', '更新时间']
      // this.checkListIng = ['年份', '总计_万元', '一季度_万元', '二季度_万元', '三季度_万元', '四季度_万元', '4月_万元', '更新时间']
      this.xzhouData = [] // x轴数据
      this.legendDataForBar1 = [] // 图例数据
      this.legendDataForLine1 = [] // 图例数据
      this.legendDataForLine2 = [] // 图例数据

      // 展示的数据
      let data0 = []
      let data1 = []
      let data2 = []
      let data3 = []
      let data4 = []
      let data5 = []
      let data6 = []
      let data7 = []
      let data8 = []
      let data9 = []
      let data10 = []
      let data11 = []
      let data12 = []
      let data13 = []

      for (var key in chartData) {
        data0.push(Number(chartData[key].ZJ_WY).toFixed(2))//	总计_万元

        data1.push(Number(chartData[key].YJD_WY).toFixed(2))// 一季度_万元
        data2.push(Number(chartData[key].EJD_WY).toFixed(2))// 二季度_万元
        data3.push(Number(chartData[key].SJD_WY).toFixed(2))// 三季度_万元
        data4.push(Number(chartData[key].SJD_WY).toFixed(2))// 四季度_万元

        data5.push(Number(chartData[key].siY_WY).toFixed(2))// 4月_万元
        data6.push(Number(chartData[key].WY_WY).toFixed(2))// 5月_万元
        data7.push(Number(chartData[key].LY_WY).toFixed(2))// 6月_万元
        data8.push(Number(chartData[key].QY_WY).toFixed(2))// 7月_万元
        data9.push(Number(chartData[key].BY_WY).toFixed(2))// 8月_万元
        data10.push(Number(chartData[key].JY_WY).toFixed(2))// 9月_万元
        data11.push(Number(chartData[key].SY_WY).toFixed(2))// 10月_万元
        data12.push(Number(chartData[key].SYY_WY).toFixed(2))// 11月_万元
        data13.push(Number(chartData[key].SEY_WY).toFixed(2))// 12月_万元

        this.xzhouData.push(chartData[key].NF)// x轴年份数据
      }

      if (this.xzhouData.length === 0) {
        this.legendDataForBar1 = []
        this.legendDataForLine1 = []
        this.legendDataForLine2 = []
        this.isShowData = false
      } else {
        this.legendDataForBar1 = ['总计']
        this.legendDataForLine1 = ['一季度', '二季度', '三季度', '四季度']
        this.legendDataForLine2 = ['4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        this.isShowData = true
      }

      this.seriesAllDataForBar1.push(data0)
      this.seriesAllDataForLine1.push(data1, data2, data3, data4)
      this.seriesAllDataForLine2.push(data5, data6, data7, data8, data9, data10, data11, data12, data13)

      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
          this.lineDrawLine1()
          this.lineDrawLine2()
        }, 0)
      })
    }
  },
  created () {
    this.checkList = ['年份', '总计_万元', '一季度_万元', '二季度_万元', '三季度_万元', '四季度_万元', '4月_万元', '5月_万元', '6月_万元', '7月_万元', '8月_万元', '9月_万元', '10月_万元', '11月_万元', '12月_万元', '更新时间']
    this.checkListIng = ['年份', '总计_万元', '一季度_万元', '二季度_万元', '三季度_万元', '四季度_万元', '4月_万元', '更新时间']
    this.showYear = [moment().year() - 9, moment().year() - 8, moment().year() - 7, moment().year() - 6, moment().year() - 5, moment().year() - 4, moment().year() - 3, moment().year() - 2, moment().year() - 1, moment().year()]
    this.getEconomyData(this.showYear)
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barDrawLine1()
        this.lineDrawLine1()
        this.lineDrawLine2()
      }, 0)
    })

    this.initBarEchart1()
    this.initLineEchart1()
    this.initLineEchart2()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
          this.lineDrawLine1()
          this.lineDrawLine2()
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
