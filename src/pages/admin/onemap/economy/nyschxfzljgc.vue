<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">能源生产和消费总量及构成</div>
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
          单位：万吨标准煤、%
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
            <el-table-column prop="NYSCZL_WDBZM"
                             label="能源生产总量_万吨标准煤"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('能源生产总量_万吨标准煤')">
              <template slot-scope="scope">
                <span v-if="scope.row.NYSCZL_WDBZM===''">- -</span>
                <span v-else>{{scope.row.NYSCZL_WDBZM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YCDLJQTNY"
                             label="一次电力及其他能源"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('一次电力及其他能源')">
              <template slot-scope="scope">
                <span v-if="scope.row.YCDLJQTNY===''">- -</span>
                <span v-else>{{scope.row.YCDLJQTNY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YM"
                             label="原煤"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('原煤')">
              <template slot-scope="scope">
                <span v-if="scope.row.YM===''">- -</span>
                <span v-else>{{scope.row.YM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YY"
                             label="原油"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('原油')">
              <template slot-scope="scope">
                <span v-if="scope.row.YY===''">- -</span>
                <span v-else>{{scope.row.YY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="TRQ"
                             label="天然气"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('天然气')">
              <template slot-scope="scope">
                <span v-if="scope.row.TRQ===''">- -</span>
                <span v-else>{{scope.row.TRQ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GC"
                             label="构成"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('构成')">
              <template slot-scope="scope">
                <span v-if="scope.row.GC===''">- -</span>
                <span v-else>{{scope.row.GC}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YCNYGC_HJ"
                             label="一次能源构成_合计"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('一次能源构成_合计')">
              <template slot-scope="scope">
                <span v-if="scope.row.YCNYGC_HJ===''">- -</span>
                <span v-else>{{scope.row.YCNYGC_HJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YCNYXFL"
                             label="一次能源消费量"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('一次能源消费量')">
              <template slot-scope="scope">
                <span v-if="scope.row.YCNYXFL===''">- -</span>
                <span v-else>{{scope.row.YCNYXFL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YCNYGC_YM"
                             label="一次能源构成_原煤"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('一次能源构成_原煤')">
              <template slot-scope="scope">
                <span v-if="scope.row.YCNYGC_YM===''">- -</span>
                <span v-else>{{scope.row.YCNYGC_YM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YCNYGC_YY"
                             label="一次能源构成_原油"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('一次能源构成_原油')">
              <template slot-scope="scope">
                <span v-if="scope.row.YCNYGC_YY===''">- -</span>
                <span v-else>{{scope.row.YCNYGC_YY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YCNYGC_TRQ"
                             label="一次能源构成_天然气"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('一次能源构成_天然气')">
              <template slot-scope="scope">
                <span v-if="scope.row.YCNYGC_TRQ===''">- -</span>
                <span v-else>{{scope.row.YCNYGC_TRQ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YCNYGC_YCDLJQTNY"
                             label="一次能源构成_一次电力及其他能源"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('一次能源构成_一次电力及其他能源')">
              <template slot-scope="scope">
                <span v-if="scope.row.YCNYGC_YCDLJQTNY===''">- -</span>
                <span v-else>{{scope.row.YCNYGC_YCDLJQTNY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZDNYGC_HJ"
                             label="终端能源构成_合计"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('终端能源构成_合计')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZDNYGC_HJ===''">- -</span>
                <span v-else>{{scope.row.ZDNYGC_HJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZDNYXFL"
                             label="终端能源消费量"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('终端能源消费量')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZDNYXFL===''">- -</span>
                <span v-else>{{scope.row.ZDNYXFL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZDNYGC_YM"
                             label="终端能源构成_原煤"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('终端能源构成_原煤')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZDNYGC_YM===''">- -</span>
                <span v-else>{{scope.row.ZDNYGC_YM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZDNYGC_YP"
                             label="终端能源构成_油品"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('终端能源构成_油品')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZDNYGC_YP===''">- -</span>
                <span v-else>{{scope.row.ZDNYGC_YP}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZDNYGC_QT"
                             label="终端能源构成_其他"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('终端能源构成_其他')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZDNYGC_QT===''">- -</span>
                <span v-else>{{scope.row.ZDNYGC_QT}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZDNYGC_DL"
                             label="终端能源构成_电力"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('终端能源构成_电力')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZDNYGC_DL===''">- -</span>
                <span v-else>{{scope.row.ZDNYGC_DL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GXSJ1"
                             label="生产总量更新时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('生产总量更新时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.GXSJ1===''">- -</span>
                <span v-else>{{scope.row.GXSJ1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="PCH1"
                             label="生产总量批次号"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('生产总量批次号')">
              <template slot-scope="scope">
                <span v-if="scope.row.PCH1===''">- -</span>
                <span v-else>{{scope.row.PCH1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZLSJ1"
                             label="生产总量增量时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('生产总量增量时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZLSJ1===''">- -</span>
                <span v-else>{{scope.row.ZLSJ1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZLBS1"
                             label="生产总量增量标识"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('生产总量增量标识')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZLBS1===''">- -</span>
                <span v-else>{{scope.row.ZLBS1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GXSJ2"
                             label="消费总量更新时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('消费总量更新时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.GXSJ2===''">- -</span>
                <span v-else>{{scope.row.GXSJ2}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="PCH2"
                             label="消费总量批次号"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('消费总量批次号')">
              <template slot-scope="scope">
                <span v-if="scope.row.PCH2===''">- -</span>
                <span v-else>{{scope.row.PCH2}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZLSJ2"
                             label="消费总量增量时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('消费总量增量时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZLSJ2===''">- -</span>
                <span v-else>{{scope.row.ZLSJ2}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZLBS2"
                             label="消费总量增量标识"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('消费总量增量标识')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZLBS2===''">- -</span>
                <span v-else>{{scope.row.ZLBS2}}</span>
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
        <div class="chart-title-one"
             v-if="cjActiveName === 'Chart'">能源消费总量和构成</div>
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：万吨标准煤、%</div>
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
        <div class="chart-title-one"
             v-if="cjActiveName === 'Chart'">一次能源消费总量和构成</div>
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：万吨标准煤、%</div>
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
        <div class="chart-title-one"
             v-if="cjActiveName === 'Chart'">终端能源消费总量和构成</div>
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：万吨标准煤、%</div>
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
          this.barlineDrawLine1()
          this.barlineDrawLine2()
          this.barlineDrawLine3()
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
        const tHeader = ['年份', '能源生产总量_万吨标准煤', '一次电力及其他能源', '原煤', '原油', '天然气', '构成', '一次能源构成_合计', '一次能源消费量', '一次能源构成_原煤', '一次能源构成_原油', '一次能源构成_天然气', '一次能源构成_一次电力及其他能源', '终端能源构成_合计', '终端能源消费量', '终端能源构成_原煤', '终端能源构成_油品', '终端能源构成_其他', '终端能源构成_电力', '生产总量更新时间', '生产总量批次号', '生产总量增量时间', '生产总量增量标识', '消费总量更新时间', '消费总量批次号', '消费总量增量时间', '消费总量增量标识']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['NF', 'NYSCZL_WDBZM', 'YCDLJQTNY', 'YM', 'YY', 'TRQ', 'GC', 'YCNYGC_HJ', 'YCNYXFL', 'YCNYGC_YM', 'YCNYGC_YY', 'YCNYGC_TRQ', 'YCNYGC_YCDLJQTNY', 'ZDNYGC_HJ', 'ZDNYXFL', 'ZDNYGC_YM', 'ZDNYGC_YP', 'ZDNYGC_QT', 'ZDNYGC_DL', 'GXSJ1', 'PCH1', 'ZLSJ1', 'ZLBS1', 'GXSJ2', 'PCH2', 'ZLSJ2', 'ZLBS2']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '能源生产和消费总量及构成')
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
      this.seriesAllDataForBarT1 = []
      this.seriesAllDataForLineT1 = []
      this.seriesAllDataForBarT2 = []
      this.seriesAllDataForLineT2 = []
      this.seriesAllDataForBarT3 = []
      this.seriesAllDataForLineT3 = []

      // 生产总量
      let chartData1 = []
      for (let i = 0; i < yaerList.length; i++) {
        let res = await this.$post(`/epf-third-part/oneBatch/NYSCZLJGC?NF=${yaerList[i]}`)
        if (res.code === 0) {
          let data = res.result[0]
          chartData1.push(data)
        } else {
          this.loading = false
          this.isShowData = false
          this.listData = []
          // this.checkList = ['年份', '能源生产总量_万吨标准煤', '一次电力及其他能源', '原煤', '原油', '天然气', '构成', '一次能源构成_合计', '一次能源消费量', '一次能源构成_原煤', '一次能源构成_原油', '一次能源构成_天然气', '一次能源构成_一次电力及其他能源', '终端能源构成_合计', '终端能源消费量', '终端能源构成_原煤', '终端能源构成_油品', '终端能源构成_其他', '终端能源构成_电力', '生产总量更新时间', '生产总量批次号', '生产总量增量时间', '生产总量增量标识', '消费总量更新时间', '消费总量批次号', '消费总量增量时间', '消费总量增量标识']
          // this.checkListIng = ['年份', '能源生产总量_万吨标准煤', '一次电力及其他能源', '原煤', '原油', '天然气', '构成', '生产总量更新时间']
          this.$message.error(res.msg)
          return
        }
      }

      chartData1 = chartData1.filter(res => {
        return res !== undefined
      })

      for (let key in chartData1) {
        chartData1[key]['GXSJ1'] = chartData1[key].GXSJ
        chartData1[key]['PCH1'] = chartData1[key].PCH
        chartData1[key]['ZLSJ1'] = chartData1[key].ZLSJ
        chartData1[key]['ZLBS1'] = chartData1[key].ZLBS
        delete chartData1[key].GXSJ
        delete chartData1[key].PCH
        delete chartData1[key].ZLSJ
        delete chartData1[key].ZLBS

        chartData1[key]['RankYear1'] = parseInt(chartData1[key].NF)
        if (chartData1[key].NF.length > 4) {
          chartData1[key]['RankYearChange1'] = 0
        } else {
          chartData1[key]['RankYearChange1'] = 1
        }
      }

      chartData1.sort(function (a, b) {
        if (a.RankYear1 === b.RankYear1) { // 如果RankYear相同，按照RankYearChange的降序
          return b.RankYearChange1 - a.RankYearChange1
        } else {
          return a.RankYear1 - b.RankYear1
        }
      })

      // 消费总量
      let chartData2 = []
      for (let i = 0; i < yaerList.length; i++) {
        let res = await this.$post(`/epf-third-part/oneBatch/NYXFZLJGC?NF=${yaerList[i]}`)
        if (res.code === 0) {
          let data = res.result[0]
          chartData2.push(data)
        } else {
          this.loading = false
          this.isShowData = false
          this.listData = []
          // this.checkList = ['年份', '能源生产总量_万吨标准煤', '一次电力及其他能源', '原煤', '原油', '天然气', '构成', '一次能源构成_合计', '一次能源消费量', '一次能源构成_原煤', '一次能源构成_原油', '一次能源构成_天然气', '一次能源构成_一次电力及其他能源', '终端能源构成_合计', '终端能源消费量', '终端能源构成_原煤', '终端能源构成_油品', '终端能源构成_其他', '终端能源构成_电力', '生产总量更新时间', '生产总量批次号', '生产总量增量时间', '生产总量增量标识', '消费总量更新时间', '消费总量批次号', '消费总量增量时间', '消费总量增量标识']
          // this.checkListIng = ['年份', '能源生产总量_万吨标准煤', '一次电力及其他能源', '原煤', '原油', '天然气', '构成', '生产总量更新时间']
          this.$message.error(res.msg)
          return
        }
      }

      chartData2 = chartData2.filter(res => {
        return res !== undefined
      })

      for (let key in chartData2) {
        chartData2[key]['GXSJ2'] = chartData2[key].GXSJ
        chartData2[key]['PCH2'] = chartData2[key].PCH
        chartData2[key]['ZLSJ2'] = chartData2[key].ZLSJ
        chartData2[key]['ZLBS2'] = chartData2[key].ZLBS
        delete chartData2[key].GXSJ
        delete chartData2[key].PCH
        delete chartData2[key].ZLSJ
        delete chartData2[key].ZLBS

        chartData2[key]['RankYear2'] = chartData2[key].NF

        chartData2[key]['RankYear2'] = parseInt(chartData2[key].NF)
        if (chartData2[key].NF.length > 4) {
          chartData2[key]['RankYearChange2'] = 0
        } else {
          chartData2[key]['RankYearChange2'] = 1
        }
      }

      chartData2.sort(function (a, b) {
        if (a.RankYear2 === b.RankYear2) { // 如果RankYear相同，按照RankYearChange的降序
          return b.RankYearChange2 - a.RankYearChange2
        } else {
          return a.RankYear2 - b.RankYear2
        }
      })

      chartData2.forEach(function (o, d) {
        for (let k in o) {
          chartData1.forEach(function (t) {
            for (let key in t) {
              if (t.NF == o.NF) {
                t[k] = o[k]
              }
            }
          })
        }
      })

      this.loading = false
      this.listData = chartData1
      this.checkList = ['年份', '能源生产总量_万吨标准煤', '一次电力及其他能源', '原煤', '原油', '天然气', '构成', '一次能源构成_合计', '一次能源消费量', '一次能源构成_原煤', '一次能源构成_原油', '一次能源构成_天然气', '一次能源构成_一次电力及其他能源', '终端能源构成_合计', '终端能源消费量', '终端能源构成_原煤', '终端能源构成_油品', '终端能源构成_其他', '终端能源构成_电力', '生产总量更新时间', '生产总量批次号', '生产总量增量时间', '生产总量增量标识', '消费总量更新时间', '消费总量批次号', '消费总量增量时间', '消费总量增量标识']
      this.checkListIng = ['年份', '能源生产总量_万吨标准煤', '一次电力及其他能源', '原煤', '原油', '天然气', '构成', '生产总量更新时间']
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

      for (var key in chartData1) {
        data0.push(Number(chartData1[key].NYSCZL_WDBZM).toFixed(2))//	能源生产总量
        data1.push(Number(chartData1[key].YCDLJQTNY).toFixed(2))// 一次电力及其他能源
        data2.push(Number(chartData1[key].YM).toFixed(2))// 原煤
        data3.push(Number(chartData1[key].YY).toFixed(2))// 原油
        data4.push(Number(chartData1[key].TRQ).toFixed(2))// 天然气

        data5.push(Number(chartData1[key].YCNYXFL).toFixed(2))//	一次能源消费量
        data6.push(Number(chartData1[key].YCNYGC_YM).toFixed(2))// 一次能源构成_原煤
        data7.push(Number(chartData1[key].YCNYGC_YY).toFixed(2))// 一次能源构成_原油
        data8.push(Number(chartData1[key].YCNYGC_TRQ).toFixed(2))// 一次能源构成_天然气
        data9.push(Number(chartData1[key].YCNYGC_YCDLJQTNY).toFixed(2))// 一次能源构成_一次电力及其他能源

        data10.push(Number(chartData1[key].ZDNYXFL).toFixed(2))//	终端能源消费量
        data11.push(Number(chartData1[key].ZDNYGC_YM).toFixed(2))// 终端能源构成_原煤
        data12.push(Number(chartData1[key].ZDNYGC_YP).toFixed(2))// 终端能源构成_油品
        data13.push(Number(chartData1[key].ZDNYGC_QT).toFixed(2))// 终端能源构成_其他
        data14.push(Number(chartData1[key].ZDNYGC_DL).toFixed(2))// 终端能源构成_电力

        this.xzhouData.push(chartData1[key].NF)// x轴年份数据
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
        this.isShowData = false
      } else {
        this.legendDataForBarT1 = ['能源生产总量']
        this.legendDataForLineT1 = ['一次电力及其他能源', '原煤', '原油', '天然气']
        this.legendDataForBarLineT1 = ['能源生产总量', { name: '一次电力及其他能源', icon: 'line' }, { name: '原煤', icon: 'line' }, { name: '原油', icon: 'line' }, { name: '天然气', icon: 'line' }]
        this.legendDataForBarT2 = ['一次能源消费量']
        this.legendDataForLineT2 = ['一次能源构成_原煤', '一次能源构成_原油', '一次能源构成_天然气', '一次能源构成_一次电力及其他能源']
        this.legendDataForBarLineT2 = ['一次能源消费量', { name: '一次能源构成_原煤', icon: 'line' }, { name: '一次能源构成_原油', icon: 'line' }, { name: '一次能源构成_天然气', icon: 'line' }, { name: '一次能源构成_一次电力及其他能源', icon: 'line' }]
        this.legendDataForBarT3 = ['终端能源消费量']
        this.legendDataForLineT3 = ['终端能源构成_原煤', '终端能源构成_油品', '终端能源构成_其他', '终端能源构成_电力']
        this.legendDataForBarLineT3 = ['终端能源消费量', { name: '终端能源构成_原煤', icon: 'line' }, { name: '终端能源构成_油品', icon: 'line' }, { name: '终端能源构成_其他', icon: 'line' }, { name: '终端能源构成_电力', icon: 'line' }]
        this.isShowData = true
      }

      this.seriesAllDataForBarT1.push(data0)
      this.seriesAllDataForLineT1.push(data1, data2, data3, data4)
      this.seriesAllDataForBarT2.push(data5)
      this.seriesAllDataForLineT2.push(data6, data7, data8, data9)
      this.seriesAllDataForBarT3.push(data10)
      this.seriesAllDataForLineT3.push(data11, data12, data13, data14)

      this.$nextTick(function () {
        setTimeout(() => {
          this.barlineDrawLine1()
          this.barlineDrawLine2()
          this.barlineDrawLine3()
        }, 0)
      })
    }
  },
  created () {
    this.checkList = ['年份', '能源生产总量_万吨标准煤', '一次电力及其他能源', '原煤', '原油', '天然气', '构成', '一次能源构成_合计', '一次能源消费量', '一次能源构成_原煤', '一次能源构成_原油', '一次能源构成_天然气', '一次能源构成_一次电力及其他能源', '终端能源构成_合计', '终端能源消费量', '终端能源构成_原煤', '终端能源构成_油品', '终端能源构成_其他', '终端能源构成_电力', '生产总量更新时间', '生产总量批次号', '生产总量增量时间', '生产总量增量标识', '消费总量更新时间', '消费总量批次号', '消费总量增量时间', '消费总量增量标识']
    this.checkListIng = ['年份', '能源生产总量_万吨标准煤', '一次电力及其他能源', '原煤', '原油', '天然气', '构成', '生产总量更新时间']
    this.showYear = [moment().year() - 9, moment().year() - 8, moment().year() - 7, moment().year() - 6, moment().year() - 5, moment().year() - 4, moment().year() - 3, moment().year() - 2, moment().year() - 1, moment().year()]
    this.getEconomyData(this.showYear)
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barlineDrawLine1()
        this.barlineDrawLine2()
        this.barlineDrawLine3()
      }, 0)
    })

    this.initBarLineEchart1()
    this.initBarLineEchart2()
    this.initBarLineEchart3()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barlineDrawLine1()
          this.barlineDrawLine2()
          this.barlineDrawLine3()
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
