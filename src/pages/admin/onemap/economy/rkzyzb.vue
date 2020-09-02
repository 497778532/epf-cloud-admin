<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">人口主要指标</div>
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
          单位：万人、%
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
            <el-table-column prop="QSNMCZRK_WR_"
                             label="全省年末常住人口万人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省年末常住人口万人')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSNMCZRK_WR_===''">- -</span>
                <span v-else>{{scope.row.QSNMCZRK_WR_}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSNMCZRK_CZRKBL"
                             label="全省年末常住人口_城镇人口比例"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省年末常住人口_城镇人口比例')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSNMCZRK_CZRKBL===''">- -</span>
                <span v-else>{{scope.row.QSNMCZRK_CZRKBL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSNMCZRK_NANXBL"
                             label="全省年末常住人口_男性比例"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省年末常住人口_男性比例')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSNMCZRK_NANXBL===''">- -</span>
                <span v-else>{{scope.row.QSNMCZRK_NANXBL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSNMCZRK_NVXBL"
                             label="全省年末常住人口_女性比例"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省年末常住人口_女性比例')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSNMCZRK_NVXBL===''">- -</span>
                <span v-else>{{scope.row.QSNMCZRK_NVXBL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSNMCZRK_0D14SRKBL"
                             label="全省年末常住人口_0到14岁人口比例"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省年末常住人口_0到14岁人口比例')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSNMCZRK_0D14SRKBL===''">- -</span>
                <span v-else>{{scope.row.QSNMCZRK_0D14SRKBL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSNMCZRK_15D64SRKBL"
                             label="全省年末常住人口_15到64岁人口比例"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省年末常住人口_15到64岁人口比例')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSNMCZRK_15D64SRKBL===''">- -</span>
                <span v-else>{{scope.row.QSNMCZRK_15D64SRKBL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSNMCZRK_65SJYSRKBL"
                             label="全省年末常住人口_65岁及以上人口比例"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省年末常住人口_65岁及以上人口比例')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSNMCZRK_65SJYSRKBL===''">- -</span>
                <span v-else>{{scope.row.QSNMCZRK_65SJYSRKBL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSNMCZRK_RKMD"
                             label="全省年末常住人口_人口密度"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省年末常住人口_人口密度')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSNMCZRK_RKMD===''">- -</span>
                <span v-else>{{scope.row.QSNMCZRK_RKMD}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSCSL"
                             label="全省出生率"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省出生率')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSCSL===''">- -</span>
                <span v-else>{{scope.row.QSCSL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSSWL_BFB_"
                             label="全省死亡率"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省死亡率')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSSWL_BFB_===''">- -</span>
                <span v-else>{{scope.row.QSSWL_BFB_}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QSZRZZL"
                             label="全省自然增长率"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('全省自然增长率')">
              <template slot-scope="scope">
                <span v-if="scope.row.QSZRZZL===''">- -</span>
                <span v-else>{{scope.row.QSZRZZL}}</span>
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
          <div>单位：万人、%</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine1 === true }"
                 @click="revealBarLine1">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart1"
               ref="barlineChart1"
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
        <!-- 第五个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：%</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine4 === true }"
                 @click="revealLine4">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart4"
               ref="lineChart4"
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
          this.barlineDrawLine1()
          this.lineDrawLine1()
          this.lineDrawLine2()
          this.lineDrawLine3()
          this.lineDrawLine4()
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
        const tHeader = ['年份', '全省年末常住人口万人', '全省年末常住人口_城镇人口比例', '全省年末常住人口_男性比例', '全省年末常住人口_女性比例', '全省年末常住人口_0到14岁人口比例', '全省年末常住人口_15到64岁人口比例', '全省年末常住人口_65岁及以上人口比例', '全省年末常住人口_人口密度', '全省出生率', '全省死亡率', '全省自然增长率']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['NF', 'QSNMCZRK_WR_', 'QSNMCZRK_CZRKBL', 'QSNMCZRK_NANXBL', 'QSNMCZRK_NVXBL', 'QSNMCZRK_0D14SRKBL', 'QSNMCZRK_15D64SRKBL', 'QSNMCZRK_65SJYSRKBL', 'QSNMCZRK_RKMD', 'QSCSL', 'QSSWL_BFB_', 'QSZRZZL']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '人口主要指标')
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
      this.seriesAllDataForBarT1 = []
      this.seriesAllDataForLineT1 = []
      this.seriesAllDataForLine1 = []
      this.seriesAllDataForLine2 = []
      this.seriesAllDataForLine3 = []
      this.seriesAllDataForLine4 = []

      let endYear = Number(this.params.JZNF)
      let beginYear = Number(this.params.QSNF)
      let arrYear = [] // 查询年份

      let section = endYear - beginYear // 年份差变量
      for (let i = 0; i <= section; i++) {
        arrYear.push(endYear--)
      }
      this.showYear = arrYear.reverse()

      let params = this.params
      let res = await this.$post('/epf-third-part/oneBatch/RKZYZB', params)
      if (res.code === 0) {
        let chartData = []
        for (let index in res.result) {
          if (this.showYear.includes(parseInt(res.result[index].NF))) {
            let key = index
            chartData.push(res.result[key])
          }
        }

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
        // this.checkList = ['年份', '全省年末常住人口万人', '全省年末常住人口_城镇人口比例', '全省年末常住人口_男性比例', '全省年末常住人口_女性比例', '全省年末常住人口_0到14岁人口比例', '全省年末常住人口_15到64岁人口比例', '全省年末常住人口_65岁及以上人口比例', '全省年末常住人口_人口密度', '全省出生率', '全省死亡率', '全省自然增长率']
        // this.checkListIng = ['年份', '全省年末常住人口万人', '全省年末常住人口_城镇人口比例', '全省年末常住人口_男性比例', '全省年末常住人口_女性比例', '全省年末常住人口_0到14岁人口比例', '全省年末常住人口_15到64岁人口比例', '全省年末常住人口_65岁及以上人口比例']
        this.xzhouData = [] // x轴数据
        this.legendDataForBarT1 = [] // 图例数据
        this.legendDataForLineT1 = [] // 图例数据
        this.legendDataForBarLineT1 = []// 图例数据
        this.legendDataForLine1 = [] // 图例数据
        this.legendDataForLine2 = [] // 图例数据
        this.legendDataForLine3 = [] // 图例数据
        this.legendDataForLine4 = [] // 图例数据

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

        for (var key in chartData) {
          data0.push(Number(chartData[key].QSNMCZRK_WR_).toFixed(2))//	全省年末常住人口万人
          data1.push(Number(chartData[key].QSNMCZRK_CZRKBL).toFixed(2))// 全省年末常住人口_城镇人口比例

          data2.push(Number(chartData[key].QSNMCZRK_NANXBL).toFixed(2))// 全省年末常住人口_男性比例
          data3.push(Number(chartData[key].QSNMCZRK_NVXBL).toFixed(2))// 全省年末常住人口_女性比例

          data4.push(Number(chartData[key].QSNMCZRK_0D14SRKBL).toFixed(2))// 全省年末常住人口_0到14岁人口比例
          data5.push(Number(chartData[key].QSNMCZRK_15D64SRKBL).toFixed(2))// 全省年末常住人口_15到64岁人口比例
          data6.push(Number(chartData[key].QSNMCZRK_65SJYSRKBL).toFixed(2))// 全省年末常住人口_65岁及以上人口比例

          data7.push(Number(chartData[key].QSNMCZRK_RKMD).toFixed(2))// 全省年末常住人口_人口密度

          data8.push(Number(chartData[key].QSCSL).toFixed(2))// 全省出生率
          data9.push(Number(chartData[key].QSSWL_BFB_).toFixed(2))// 全省死亡率
          data10.push(Number(chartData[key].QSZRZZL).toFixed(2))// 全省自然增长率

          this.xzhouData.push(chartData[key].NF)// x轴年份数据
        }

        if (this.xzhouData.length === 0) {
          this.legendDataForBarT1 = []
          this.legendDataForLineT1 = []
          this.legendDataForBarLineT1 = []
          this.legendDataForLine1 = []
          this.legendDataForLine2 = []
          this.legendDataForLine3 = []
          this.legendDataForLine4 = []
          this.isShowData = false
        } else {
          this.legendDataForBarT1 = ['全省年末常住人口']
          this.legendDataForLineT1 = ['全省年末常住人口_城镇人口']
          this.legendDataForBarLineT1 = ['全省年末常住人口', { name: '全省年末常住人口_城镇人口', icon: 'line' }]
          this.legendDataForLine1 = ['全省年末常住人口_男性', '全省年末常住人口_女性']
          this.legendDataForLine2 = ['全省年末常住人口_0到14岁人口', '全省年末常住人口_15到64岁人口', '全省年末常住人口_65岁及以上人口']
          this.legendDataForLine3 = ['全省年末常住人口_人口密度']
          this.legendDataForLine4 = ['全省出生率', '全省死亡率', '全省自然增长率']
          this.isShowData = true
        }

        this.seriesAllDataForBarT1.push(data0)
        this.seriesAllDataForLineT1.push(data1)
        this.seriesAllDataForLine1.push(data2, data3)
        this.seriesAllDataForLine2.push(data4, data5, data6)
        this.seriesAllDataForLine3.push(data7)
        this.seriesAllDataForLine4.push(data8, data9, data10)

        this.$nextTick(function () {
          setTimeout(() => {
            this.barlineDrawLine1()
            this.lineDrawLine1()
            this.lineDrawLine2()
            this.lineDrawLine3()
            this.lineDrawLine4()
          }, 0)
        })
      } else {
        this.loading = false
        this.isShowData = false
        this.listData = []
        // this.checkList = ['年份', '全省年末常住人口万人', '全省年末常住人口_城镇人口比例', '全省年末常住人口_男性比例', '全省年末常住人口_女性比例', '全省年末常住人口_0到14岁人口比例', '全省年末常住人口_15到64岁人口比例', '全省年末常住人口_65岁及以上人口比例', '全省年末常住人口_人口密度', '全省出生率', '全省死亡率', '全省自然增长率']
        // this.checkListIng = ['年份', '全省年末常住人口万人', '全省年末常住人口_城镇人口比例', '全省年末常住人口_男性比例', '全省年末常住人口_女性比例', '全省年末常住人口_0到14岁人口比例', '全省年末常住人口_15到64岁人口比例', '全省年末常住人口_65岁及以上人口比例']
        this.$message.error(res.msg)
        return
      }
    }
  },
  created () {
    this.checkList = ['年份', '全省年末常住人口万人', '全省年末常住人口_城镇人口比例', '全省年末常住人口_男性比例', '全省年末常住人口_女性比例', '全省年末常住人口_0到14岁人口比例', '全省年末常住人口_15到64岁人口比例', '全省年末常住人口_65岁及以上人口比例', '全省年末常住人口_人口密度', '全省出生率', '全省死亡率', '全省自然增长率']
    this.checkListIng = ['年份', '全省年末常住人口万人', '全省年末常住人口_城镇人口比例', '全省年末常住人口_男性比例', '全省年末常住人口_女性比例', '全省年末常住人口_0到14岁人口比例', '全省年末常住人口_15到64岁人口比例', '全省年末常住人口_65岁及以上人口比例']
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barlineDrawLine1()
        this.lineDrawLine1()
        this.lineDrawLine2()
        this.lineDrawLine3()
        this.lineDrawLine4()
      }, 0)
    })

    this.initBarLineEchart1()
    this.initLineEchart1()
    this.initLineEchart2()
    this.initLineEchart3()
    this.initLineEchart4()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barlineDrawLine1()
          this.lineDrawLine1()
          this.lineDrawLine2()
          this.lineDrawLine3()
          this.lineDrawLine4()
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
