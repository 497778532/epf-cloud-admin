<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">历年规模以上工业增加值增长速度</div>
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
          单位：万亿、%
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
            <el-table-column prop="GYZJZ"
                             label="工业增加值"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('工业增加值')">
              <template slot-scope="scope">
                <span v-if="scope.row.GYZJZ===''">- -</span>
                <span v-else>{{scope.row.GYZJZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AQZGYF_QGY"
                             label="按轻重工业分_轻工业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('按轻重工业分_轻工业')">
              <template slot-scope="scope">
                <span v-if="scope.row.AQZGYF_QGY===''">- -</span>
                <span v-else>{{scope.row.AQZGYF_QGY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AQZGYF_ZGY"
                             label="按轻重工业分_重工业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('按轻重工业分_重工业')">
              <template slot-scope="scope">
                <span v-if="scope.row.AQZGYF_ZGY===''">- -</span>
                <span v-else>{{scope.row.AQZGYF_ZGY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AQYGMF_XWXQY"
                             label="按企业规模分_小微型企业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('按企业规模分_小微型企业')">
              <template slot-scope="scope">
                <span v-if="scope.row.AQYGMF_XWXQY===''">- -</span>
                <span v-else>{{scope.row.AQYGMF_XWXQY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AQYGMF_ZXQY"
                             label="按企业规模分_中型企业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('按企业规模分_中型企业')">
              <template slot-scope="scope">
                <span v-if="scope.row.AQYGMF_ZXQY===''">- -</span>
                <span v-else>{{scope.row.AQYGMF_ZXQY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AQYGMF_DXQY"
                             label="按企业规模分_大型企业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('按企业规模分_大型企业')">
              <template slot-scope="scope">
                <span v-if="scope.row.AQYGMF_DXQY===''">- -</span>
                <span v-else>{{scope.row.AQYGMF_DXQY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AJJLXF_GYKGGY"
                             label="按经济类型分_国有控股工业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('按经济类型分_国有控股工业')">
              <template slot-scope="scope">
                <span v-if="scope.row.AJJLXF_GYKGGY===''">- -</span>
                <span v-else>{{scope.row.AJJLXF_GYKGGY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AJJLXF_WSJGATSTZGY"
                             label="按经济类型分_外商及港澳台商投资工业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('按经济类型分_外商及港澳台商投资工业')">
              <template slot-scope="scope">
                <span v-if="scope.row.AJJLXF_WSJGATSTZGY===''">- -</span>
                <span v-else>{{scope.row.AJJLXF_WSJGATSTZGY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="RKSJ"
                             label="入库时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('入库时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.RKSJ===''">- -</span>
                <span v-else>{{scope.row.RKSJ}}</span>
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
            <el-table-column prop="PCH"
                             label="批次号"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('批次号')">
              <template slot-scope="scope">
                <span v-if="scope.row.PCH===''">- -</span>
                <span v-else>{{scope.row.PCH}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZLSJ"
                             label="增量时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('增量时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZLSJ===''">- -</span>
                <span v-else>{{scope.row.ZLSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZLBS"
                             label="增量标识"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('增量标识')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZLBS===''">- -</span>
                <span v-else>{{scope.row.ZLBS}}</span>
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
          <div>单位：万亿</div>
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
          <div>单位：%</div>
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
          <div>单位：%</div>
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
        <!-- 第四个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：%</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine3 === true }"
                 @click="revealLine3">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart3"
               ref="lineChart3"
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
        QSNF: moment().year() - 9,
        JZNF: moment().year()
      },

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
          this.lineDrawLine3()
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
        this.params.QSNF = this.beginYear// 开始时间
        this.params.JZNF = this.endYear// 结束时间
      }

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getEconomyData()
    },
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['年份', '工业增加值', '按轻重工业分_轻工业', '按轻重工业分_重工业', '按企业规模分_小微型企业', '按企业规模分_中型企业', '按企业规模分_大型企业', '按经济类型分_国有控股工业', '按经济类型分_外商及港澳台商投资工业', '入库时间', '更新时间', '批次号', '增量时间', '增量标识']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['NF', 'GYZJZ', 'AQZGYF_QGY', 'AQZGYF_ZGY', 'AQYGMF_XWXQY', 'AQYGMF_ZXQY', 'AQYGMF_DXQY', 'AJJLXF_GYKGGY', 'AJJLXF_WSJGATSTZGY', 'RKSJ', 'GXSJ', 'PCH', 'ZLSJ', 'ZLBS']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '历年规模以上工业增加值增长速度')
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
      this.seriesAllDataForLine1 = []
      this.seriesAllDataForLine2 = []
      this.seriesAllDataForLine3 = []

      let params = this.params
      let res = await this.$post('/epf-third-part/threebatch/LNGMYSGYZJZZZSD', params)
      if (res.code === 0) {
        for (let key in res.result) {
          res.result[key]['RankYear'] = parseInt(res.result[key].NF)
          if (res.result[key].NF.length > 4) {
            res.result[key]['RankYearChange'] = 0
          } else {
            res.result[key]['RankYearChange'] = 1
          }
        }

        let chartData = res.result

        chartData.sort(function (a, b) {
          if (a.RankYear === b.RankYear) { // 如果RankYear相同，按照RankYearChange的降序
            return b.RankYearChange - a.RankYearChange
          } else {
            return a.RankYear - b.RankYear
          }
        })

        this.loading = false
        this.listData = chartData
        // this.checkList = ['年份', '工业增加值', '按轻重工业分_轻工业', '按轻重工业分_重工业', '按企业规模分_小微型企业', '按企业规模分_中型企业', '按企业规模分_大型企业', '按经济类型分_国有控股工业', '按经济类型分_外商及港澳台商投资工业', '入库时间', '更新时间', '批次号', '增量时间', '增量标识']
        // this.checkListIng = ['年份', '工业增加值', '按轻重工业分_轻工业', '按轻重工业分_重工业', '按企业规模分_小微型企业', '按企业规模分_中型企业', '按企业规模分_大型企业', '更新时间']
        this.xzhouData = [] // x轴数据
        this.legendDataForBar1 = [] // 图例数据
        this.legendDataForLine1 = [] // 图例数据
        this.legendDataForLine2 = [] // 图例数据
        this.legendDataForLine3 = [] // 图例数据

        // 展示的数据
        let data0 = []
        let data1 = []
        let data2 = []
        let data3 = []
        let data4 = []
        let data5 = []
        let data6 = []
        let data7 = []

        for (var key in chartData) {
          data0.push(Number(chartData[key].GYZJZ).toFixed(2))//	工业增加值

          data1.push(Number(chartData[key].AQZGYF_QGY).toFixed(2))// 按轻重工业分_轻工业
          data2.push(Number(chartData[key].AQZGYF_ZGY).toFixed(2))// 按轻重工业分_重工业

          data3.push(Number(chartData[key].AQYGMF_XWXQY).toFixed(2))// 按企业规模分_小微型企业
          data4.push(Number(chartData[key].AQYGMF_ZXQY).toFixed(2))// 按企业规模分_中型企业
          data5.push(Number(chartData[key].AQYGMF_DXQY).toFixed(2))// 按企业规模分_大型企业

          data6.push(Number(chartData[key].AJJLXF_GYKGGY).toFixed(2))// 按经济类型分_国有控股工业
          data7.push(Number(chartData[key].AJJLXF_WSJGATSTZGY).toFixed(2))// 按经济类型分_外商及港澳台商投资工业

          this.xzhouData.push(chartData[key].NF)// x轴年份数据
        }

        if (this.xzhouData.length === 0) {
          this.legendDataForBar1 = []
          this.legendDataForLine1 = []
          this.legendDataForLine2 = []
          this.legendDataForLine3 = []
          this.isShowData = false
        } else {
          this.legendDataForBar1 = ['工业增加值']
          this.legendDataForLine1 = ['按轻重工业分_轻工业', '按轻重工业分_重工业']
          this.legendDataForLine2 = ['按企业规模分_小微型企业', '按企业规模分_中型企业', '按企业规模分_大型企业']
          this.legendDataForLine3 = ['按经济类型分_国有控股工业', '按经济类型分_外商及港澳台商投资工业']
          this.isShowData = true
        }

        this.seriesAllDataForBar1.push(data0)
        this.seriesAllDataForLine1.push(data1, data2)
        this.seriesAllDataForLine2.push(data3, data4, data5)
        this.seriesAllDataForLine3.push(data6, data7)

        this.$nextTick(function () {
          setTimeout(() => {
            this.barDrawLine1()
            this.lineDrawLine1()
            this.lineDrawLine2()
            this.lineDrawLine3()
          }, 0)
        })
      } else {
        this.loading = false
        this.isShowData = false
        this.listData = []
        // this.checkList = ['年份', '工业增加值', '按轻重工业分_轻工业', '按轻重工业分_重工业', '按企业规模分_小微型企业', '按企业规模分_中型企业', '按企业规模分_大型企业', '按经济类型分_国有控股工业', '按经济类型分_外商及港澳台商投资工业', '入库时间', '更新时间', '批次号', '增量时间', '增量标识']
        // this.checkListIng = ['年份', '工业增加值', '按轻重工业分_轻工业', '按轻重工业分_重工业', '按企业规模分_小微型企业', '按企业规模分_中型企业', '按企业规模分_大型企业', '更新时间']
        this.$message.error(res.msg)
        return
      }
    }
  },
  created () {
    this.checkList = ['年份', '工业增加值', '按轻重工业分_轻工业', '按轻重工业分_重工业', '按企业规模分_小微型企业', '按企业规模分_中型企业', '按企业规模分_大型企业', '按经济类型分_国有控股工业', '按经济类型分_外商及港澳台商投资工业', '入库时间', '更新时间', '批次号', '增量时间', '增量标识']
    this.checkListIng = ['年份', '工业增加值', '按轻重工业分_轻工业', '按轻重工业分_重工业', '按企业规模分_小微型企业', '按企业规模分_中型企业', '按企业规模分_大型企业', '更新时间']
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barDrawLine1()
        this.lineDrawLine1()
        this.lineDrawLine2()
        this.lineDrawLine3()
      }, 0)
    })

    this.initBarEchart1()
    this.initLineEchart1()
    this.initLineEchart2()
    this.initLineEchart3()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
          this.lineDrawLine1()
          this.lineDrawLine2()
          this.lineDrawLine3()
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
