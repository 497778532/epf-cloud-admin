<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">文化、文物机构及人员数</div>
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
            <el-table-column prop="HJ_JGS"
                             label="合计_机构数"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('合计_机构数')">
              <template slot-scope="scope">
                <span v-if="scope.row.HJ_JGS===''">- -</span>
                <span v-else>{{scope.row.HJ_JGS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WHBM_JGS"
                             label="文化部门_机构数"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文化部门_机构数')">
              <template slot-scope="scope">
                <span v-if="scope.row.WHBM_JGS===''">- -</span>
                <span v-else>{{scope.row.WHBM_JGS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QTBM_JGS"
                             label="其他部门_机构数"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('其他部门_机构数')">
              <template slot-scope="scope">
                <span v-if="scope.row.QTBM_JGS===''">- -</span>
                <span v-else>{{scope.row.QTBM_JGS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="HJ_RS"
                             label="合计_人数"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('合计_人数')">
              <template slot-scope="scope">
                <span v-if="scope.row.HJ_RS===''">- -</span>
                <span v-else>{{scope.row.HJ_RS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WHBM_RS"
                             label="文化部门_人数"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文化部门_人数')">
              <template slot-scope="scope">
                <span v-if="scope.row.WHBM_RS===''">- -</span>
                <span v-else>{{scope.row.WHBM_RS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QTBM_RS"
                             label="其他部门_人数"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('其他部门_人数')">
              <template slot-scope="scope">
                <span v-if="scope.row.QTBM_RS===''">- -</span>
                <span v-else>{{scope.row.QTBM_RS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WHHJ"
                             label="文化合计"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文化合计')">
              <template slot-scope="scope">
                <span v-if="scope.row.WHHJ===''">- -</span>
                <span v-else>{{scope.row.WHHJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YSSY"
                             label="艺术事业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('艺术事业')">
              <template slot-scope="scope">
                <span v-if="scope.row.YSSY===''">- -</span>
                <span v-else>{{scope.row.YSSY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="TSGSY"
                             label="图书馆事业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('图书馆事业')">
              <template slot-scope="scope">
                <span v-if="scope.row.TSGSY===''">- -</span>
                <span v-else>{{scope.row.TSGSY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QZWHSY"
                             label="群众文化事业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('群众文化事业')">
              <template slot-scope="scope">
                <span v-if="scope.row.QZWHSY===''">- -</span>
                <span v-else>{{scope.row.QZWHSY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YSJYY"
                             label="艺术教育业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('艺术教育业')">
              <template slot-scope="scope">
                <span v-if="scope.row.YSJYY===''">- -</span>
                <span v-else>{{scope.row.YSJYY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WYKY"
                             label="文艺科研"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文艺科研')">
              <template slot-scope="scope">
                <span v-if="scope.row.WYKY===''">- -</span>
                <span v-else>{{scope.row.WYKY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YSZLCZJG"
                             label="艺术展览创作机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('艺术展览创作机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.YSZLCZJG===''">- -</span>
                <span v-else>{{scope.row.YSZLCZJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WHXZZGBM"
                             label="文化行政主管部门"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文化行政主管部门')">
              <template slot-scope="scope">
                <span v-if="scope.row.WHXZZGBM===''">- -</span>
                <span v-else>{{scope.row.WHXZZGBM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QTWHJG"
                             label="其他文化机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('其他文化机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.QTWHJG===''">- -</span>
                <span v-else>{{scope.row.QTWHJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WHSCJYJG_BHFGYZYSBYTT"
                             label="文化市场经营机构_不含非公有制艺术表演团体"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文化市场经营机构_不含非公有制艺术表演团体')">
              <template slot-scope="scope">
                <span v-if="scope.row.WHSCJYJG_BHFGYZYSBYTT===''">- -</span>
                <span v-else>{{scope.row.WHSCJYJG_BHFGYZYSBYTT}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WWHJ"
                             label="文物合计"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文物合计')">
              <template slot-scope="scope">
                <span v-if="scope.row.WWHJ===''">- -</span>
                <span v-else>{{scope.row.WWHJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WWKYJG"
                             label="文物科研机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文物科研机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.WWKYJG===''">- -</span>
                <span v-else>{{scope.row.WWKYJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WWBHGLJG"
                             label="文物保护管理机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文物保护管理机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.WWBHGLJG===''">- -</span>
                <span v-else>{{scope.row.WWBHGLJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BWG"
                             label="博物馆"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('博物馆')">
              <template slot-scope="scope">
                <span v-if="scope.row.BWG===''">- -</span>
                <span v-else>{{scope.row.BWG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WWSD"
                             label="文物商店"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('文物商店')">
              <template slot-scope="scope">
                <span v-if="scope.row.WWSD===''">- -</span>
                <span v-else>{{scope.row.WWSD}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QTWWJG"
                             label="其他文物机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('其他文物机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.QTWWJG===''">- -</span>
                <span v-else>{{scope.row.QTWWJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZJ"
                             label="总计"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('总计')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZJ===''">- -</span>
                <span v-else>{{scope.row.ZJ}}</span>
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
          <div>单位：个</div>
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
          <div>单位：个</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine2 === true }"
                 @click="revealBarLine2">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart2"
               ref="barlineChart2"
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
          <div>单位：个</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine3 === true }"
                 @click="revealBarLine3">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart3"
               ref="barlineChart3"
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
          <div>单位：个</div>
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
        <!-- 第五个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：个</div>
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
          this.barlineDrawLine1()
          this.barlineDrawLine2()
          this.barlineDrawLine3()
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
        const tHeader = ['年份', '合计_机构数', '文化部门_机构数', '其他部门_机构数', '合计_人数', '文化部门_人数', '其他部门_人数', '文化合计', '艺术事业', '图书馆事业', '群众文化事业', '艺术教育业', '文艺科研', '艺术展览创作机构', '文化行政主管部门', '其他文化机构', '文化市场经营机构_不含非公有制艺术表演团体', '文物合计', '文物科研机构', '文物保护管理机构', '博物馆', '文物商店', '其他文物机构', '总计', '更新时间']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['NF', 'HJ_JGS', 'WHBM_JGS', 'QTBM_JGS', 'HJ_RS', 'WHBM_RS', 'QTBM_RS', 'WHHJ', 'YSSY', 'TSGSY', 'QZWHSY', 'YSJYY', 'WYKY', 'YSZLCZJG', 'WHXZZGBM', 'QTWHJG', 'WHSCJYJG_BHFGYZYSBYTT', 'WWHJ', 'WWKYJG', 'WWBHGLJG', 'BWG', 'WWSD', 'QTWWJG', 'ZJ', 'GXSJ']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '文化、文物机构及人员数')
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
      this.seriesAllDataForBarT2 = []
      this.seriesAllDataForLineT2 = []
      this.seriesAllDataForBarT3 = []
      this.seriesAllDataForLineT3 = []
      this.seriesAllDataForLine1 = []
      this.seriesAllDataForLine2 = []

      let params = this.params
      let res = await this.$post('/epf-third-part/threebatch/WHWWJGJRYSB', params)
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
        // this.checkList = ['年份', '合计_机构数', '文化部门_机构数', '其他部门_机构数', '合计_人数', '文化部门_人数', '其他部门_人数', '文化合计', '艺术事业', '图书馆事业', '群众文化事业', '艺术教育业', '文艺科研', '艺术展览创作机构', '文化行政主管部门', '其他文化机构', '文化市场经营机构_不含非公有制艺术表演团体', '文物合计', '文物科研机构', '文物保护管理机构', '博物馆', '文物商店', '其他文物机构', '总计', '更新时间']
        // this.checkListIng = ['年份', '合计_机构数', '文化部门_机构数', '其他部门_机构数', '合计_人数', '文化部门_人数', '其他部门_人数', '更新时间']
        this.xzhouData = [] // x轴数据
        this.legendDataForBarT1 = [] // 图例数据
        this.legendDataForLineT1 = [] // 图例数据
        this.legendDataForBarLineT1 = []// 图例数据
        this.legendDataForBarT2 = [] // 图例数据
        this.legendDataForLineT2 = [] // 图例数据
        this.legendDataForBarLineT2 = []// 图例数据
        this.legendDataForBarT3 = [] // 图例数据
        this.legendDataForLineT3 = [] // 图例数据
        this.legendDataForBarLineT3 = []// 图例数据
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
        let data14 = []
        let data15 = []
        let data16 = []
        let data17 = []
        let data18 = []
        let data19 = []
        let data20 = []

        for (var key in chartData) {
          data0.push(Number(chartData[key].HJ_JGS).toFixed(2))//	合计_机构数
          data1.push(Number(chartData[key].WHBM_JGS).toFixed(2))// 文化部门_机构数
          data2.push(Number(chartData[key].QTBM_JGS).toFixed(2))// 其他部门_机构数

          data3.push(Number(chartData[key].HJ_RS).toFixed(2))// 合计_人数
          data4.push(Number(chartData[key].WHBM_RS).toFixed(2))// 文化部门_人数
          data5.push(Number(chartData[key].QTBM_RS).toFixed(2))// 其他部门_人数

          data6.push(Number(chartData[key].WHHJ).toFixed(2))// 文化合计
          data7.push(Number(chartData[key].YSSY).toFixed(2))// 艺术事业
          data8.push(Number(chartData[key].TSGSY).toFixed(2))// 图书馆事业
          data9.push(Number(chartData[key].QZWHSY).toFixed(2))// 群众文化事业
          data10.push(Number(chartData[key].YSJYY).toFixed(2))// 艺术教育业

          data11.push(Number(chartData[key].WYKY).toFixed(2))// 文艺科研
          data12.push(Number(chartData[key].YSZLCZJG).toFixed(2))// 艺术展览创作机构
          data13.push(Number(chartData[key].WHXZZGBM).toFixed(2))// 文化行政主管部门
          data14.push(Number(chartData[key].QTWHJG).toFixed(2))// 其他文化机构
          data15.push(Number(chartData[key].WHSCJYJG_BHFGYZYSBYTT).toFixed(2))// 文化市场经营机构_不含非公有制艺术表演团体

          data16.push(Number(chartData[key].WWKYJG).toFixed(2))// 文物科研机构
          data17.push(Number(chartData[key].WWBHGLJG).toFixed(2))// 文物保护管理机构
          data18.push(Number(chartData[key].BWG).toFixed(2))// 博物馆
          data19.push(Number(chartData[key].WWSD).toFixed(2))// 文物商店
          data20.push(Number(chartData[key].QTWWJG).toFixed(2))// 其他文物机构

          this.xzhouData.push(chartData[key].NF)// x轴年份数据
        }

        if (this.xzhouData.length === 0) {
          this.legendDataForBarT1 = []
          this.legendDataForLineT1 = []
          this.legendDataForBarLineT1 = []
          this.legendDataForBarT2 = []
          this.legendDataForLineT2 = []
          this.legendDataForBarLineT2 = []
          this.legendDataForBarT3 = []
          this.legendDataForLineT3 = []
          this.legendDataForBarLineT3 = []
          this.legendDataForLine1 = []
          this.legendDataForLine2 = []
          this.isShowData = false
        } else {
          this.legendDataForBarT1 = ['合计_机构数']
          this.legendDataForLineT1 = ['文化部门_机构数', '其他部门_机构数']
          this.legendDataForBarLineT1 = ['合计_机构数', { name: '文化部门_机构数', icon: 'line' }, { name: '其他部门_机构数', icon: 'line' }]
          this.legendDataForBarT2 = ['合计_人数']
          this.legendDataForLineT2 = ['文化部门_人数', '其他部门_人数']
          this.legendDataForBarLineT2 = ['合计_人数', { name: '文化部门_人数', icon: 'line' }, { name: '其他部门_人数', icon: 'line' }]
          this.legendDataForBarT3 = ['文化合计']
          this.legendDataForLineT3 = ['艺术事业', '图书馆事业', '群众文化事业', '艺术教育业']
          this.legendDataForBarLineT3 = ['文化合计', { name: '艺术事业', icon: 'line' }, { name: '图书馆事业', icon: 'line' }, { name: '群众文化事业', icon: 'line' }, { name: '艺术教育业', icon: 'line' }]
          this.legendDataForLine1 = ['文艺科研', '艺术展览创作机构', '文化行政主管部门', '其他文化机构', '文化市场经营机构_不含非公有制艺术表演团体']
          this.legendDataForLine2 = ['文物科研机构', '文物保护管理机构', '博物馆', '文物商店', '其他文物机构']
          this.isShowData = true
        }

        this.seriesAllDataForBarT1.push(data0)
        this.seriesAllDataForLineT1.push(data1, data2)
        this.seriesAllDataForBarT2.push(data3)
        this.seriesAllDataForLineT2.push(data4, data5)
        this.seriesAllDataForBarT3.push(data6)
        this.seriesAllDataForLineT3.push(data7, data8, data9, data10)
        this.seriesAllDataForLine1.push(data11, data12, data13, data14, data15)
        this.seriesAllDataForLine2.push(data16, data17, data18, data19, data20)

        this.$nextTick(function () {
          setTimeout(() => {
            this.barlineDrawLine1()
            this.barlineDrawLine2()
            this.barlineDrawLine3()
            this.lineDrawLine1()
            this.lineDrawLine2()
          }, 0)
        })
      } else {
        this.loading = false
        this.isShowData = false
        this.listData = []
        // this.checkList = ['年份', '合计_机构数', '文化部门_机构数', '其他部门_机构数', '合计_人数', '文化部门_人数', '其他部门_人数', '文化合计', '艺术事业', '图书馆事业', '群众文化事业', '艺术教育业', '文艺科研', '艺术展览创作机构', '文化行政主管部门', '其他文化机构', '文化市场经营机构_不含非公有制艺术表演团体', '文物合计', '文物科研机构', '文物保护管理机构', '博物馆', '文物商店', '其他文物机构', '总计', '更新时间']
        // this.checkListIng = ['年份', '合计_机构数', '文化部门_机构数', '其他部门_机构数', '合计_人数', '文化部门_人数', '其他部门_人数', '更新时间']
        this.$message.error(res.msg)
        return
      }
    }
  },
  created () {
    this.checkList = ['年份', '合计_机构数', '文化部门_机构数', '其他部门_机构数', '合计_人数', '文化部门_人数', '其他部门_人数', '文化合计', '艺术事业', '图书馆事业', '群众文化事业', '艺术教育业', '文艺科研', '艺术展览创作机构', '文化行政主管部门', '其他文化机构', '文化市场经营机构_不含非公有制艺术表演团体', '文物合计', '文物科研机构', '文物保护管理机构', '博物馆', '文物商店', '其他文物机构', '总计', '更新时间']
    this.checkListIng = ['年份', '合计_机构数', '文化部门_机构数', '其他部门_机构数', '合计_人数', '文化部门_人数', '其他部门_人数', '更新时间']
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barlineDrawLine1()
        this.barlineDrawLine2()
        this.barlineDrawLine3()
        this.lineDrawLine1()
        this.lineDrawLine2()
      }, 0)
    })

    this.initBarLineEchart1()
    this.initBarLineEchart2()
    this.initBarLineEchart3()
    this.initLineEchart1()
    this.initLineEchart2()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barlineDrawLine1()
          this.barlineDrawLine2()
          this.barlineDrawLine3()
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
