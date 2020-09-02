<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">各类卫生事业机构、床位和人员数统计</div>
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
          单位：个、人、张、所
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
            <el-table-column prop="JGS_G"
                             label="机构数_个"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('机构数_个')">
              <template slot-scope="scope">
                <span v-if="scope.row.JGS_G===''">- -</span>
                <span v-else>{{scope.row.JGS_G}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YY"
                             label="医院"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('医院')">
              <template slot-scope="scope">
                <span v-if="scope.row.YY===''">- -</span>
                <span v-else>{{scope.row.YY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WSY"
                             label="卫生院"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('卫生院')">
              <template slot-scope="scope">
                <span v-if="scope.row.WSY===''">- -</span>
                <span v-else>{{scope.row.WSY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZKFZJG"
                             label="专科防治机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('专科防治机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZKFZJG===''">- -</span>
                <span v-else>{{scope.row.ZKFZJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JBYFKZJG"
                             label="疾病预防控制机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('疾病预防控制机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.JBYFKZJG===''">- -</span>
                <span v-else>{{scope.row.JBYFKZJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FYBJJG"
                             label="妇幼保健机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('妇幼保健机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.FYBJJG===''">- -</span>
                <span v-else>{{scope.row.FYBJJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YXKXYJJG"
                             label="医学科学研究机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('医学科学研究机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.YXKXYJJG===''">- -</span>
                <span v-else>{{scope.row.YXKXYJJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QTWSJG"
                             label="其他卫生机构"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('其他卫生机构')">
              <template slot-scope="scope">
                <span v-if="scope.row.QTWSJG===''">- -</span>
                <span v-else>{{scope.row.QTWSJG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CWS_Z"
                             label="床位数_张"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('床位数_张')">
              <template slot-scope="scope">
                <span v-if="scope.row.CWS_Z===''">- -</span>
                <span v-else>{{scope.row.CWS_Z}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="RYS_R"
                             label="人员数_人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('人员数_人')">
              <template slot-scope="scope">
                <span v-if="scope.row.RYS_R===''">- -</span>
                <span v-else>{{scope.row.RYS_R}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WSJSRY"
                             label="卫生技术人员"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('卫生技术人员')">
              <template slot-scope="scope">
                <span v-if="scope.row.WSJSRY===''">- -</span>
                <span v-else>{{scope.row.WSJSRY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YS"
                             label="医生"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('医生')">
              <template slot-scope="scope">
                <span v-if="scope.row.YS===''">- -</span>
                <span v-else>{{scope.row.YS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZCHS"
                             label="注册护士"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('注册护士')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZCHS===''">- -</span>
                <span v-else>{{scope.row.ZCHS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QTJSRY"
                             label="其他技术人员"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('其他技术人员')">
              <template slot-scope="scope">
                <span v-if="scope.row.QTJSRY===''">- -</span>
                <span v-else>{{scope.row.QTJSRY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GLRY"
                             label="管理人员"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('管理人员')">
              <template slot-scope="scope">
                <span v-if="scope.row.GLRY===''">- -</span>
                <span v-else>{{scope.row.GLRY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GQRY"
                             label="工勤人员"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('工勤人员')">
              <template slot-scope="scope">
                <span v-if="scope.row.GQRY===''">- -</span>
                <span v-else>{{scope.row.GQRY}}</span>
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
          <div>单位：个、人</div>
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
          <div>单位：张</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBar2 === true }"
                 @click="revealBar2">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barChart2"
               ref="barChart2"
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
          <div>单位：所、个</div>
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
        <!-- 第四个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：人</div>
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
          this.barDrawLine1()
          this.barDrawLine2()
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
        const tHeader = ['年份', '机构数_个', '医院', '卫生院', '专科防治机构', '疾病预防控制机构', '妇幼保健机构', '医学科学研究机构', '其他卫生机构', '床位数_张', '人员数_人', '卫生技术人员', '医生', '注册护士', '其他技术人员', '管理人员', '工勤人员', '更新时间']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['NF', 'JGS_G', 'YY', 'WSY', 'ZKFZJG', 'JBYFKZJG', 'FYBJJG', 'YXKXYJJG', 'QTWSJG', 'CWS_Z', 'RYS_R', 'WSJSRY', 'YS', 'ZCHS', 'QTJSRY', 'GLRY', 'GQRY', 'GXSJ']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '各类卫生事业机构、床位和人员数统计')
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
      this.seriesAllDataForBar2 = []
      this.seriesAllDataForLine1 = []
      this.seriesAllDataForLine2 = []

      let params = this.params
      let res = await this.$post('/epf-third-part/threebatch/GLWSSYJGCWHRYS', params)
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
        // this.checkList = ['年份', '机构数_个', '医院', '卫生院', '专科防治机构', '疾病预防控制机构', '妇幼保健机构', '医学科学研究机构', '其他卫生机构', '床位数_张', '人员数_人', '卫生技术人员', '医生', '注册护士', '其他技术人员', '管理人员', '工勤人员', '更新时间']
        // this.checkListIng = ['年份', '机构数_个', '医院', '卫生院', '专科防治机构', '疾病预防控制机构', '妇幼保健机构', '更新时间']
        this.xzhouData = [] // x轴数据
        this.legendDataForBar1 = [] // 图例数据
        this.legendDataForBar2 = [] // 图例数据
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

        for (var key in chartData) {
          data0.push(Number(chartData[key].JGS_G).toFixed(2))//	机构数_个
          data1.push(Number(chartData[key].RYS_R).toFixed(2))// 人员数_人

          data2.push(Number(chartData[key].CWS_Z).toFixed(2))// 床位数_张

          data3.push(Number(chartData[key].YY).toFixed(2))// 医院
          data4.push(Number(chartData[key].WSY).toFixed(2))// 卫生院
          // data5.push(Number(chartData[key]['MZB、ZS、WSS_S']).toFixed(2))// 门诊部、诊所、卫生所_所
          data5.push(Number(chartData[key].ZKFZJG).toFixed(2))// 专科防治机构
          data6.push(Number(chartData[key].JBYFKZJG).toFixed(2))// 疾病预防控制机构
          data7.push(Number(chartData[key].FYBJJG).toFixed(2))// 妇幼保健机构
          data8.push(Number(chartData[key].YXKXYJJG).toFixed(2))// 医学科学研究机构
          data9.push(Number(chartData[key].QTWSJG).toFixed(2))// 其他卫生机构

          data10.push(Number(chartData[key].WSJSRY).toFixed(2))// 卫生技术人员
          data11.push(Number(chartData[key].YS).toFixed(2))// 医生
          data12.push(Number(chartData[key].ZCHS).toFixed(2))// 注册护士
          data13.push(Number(chartData[key].GLRY).toFixed(2))// 管理人员
          data14.push(Number(chartData[key].GQRY).toFixed(2))// 工勤人员
          data15.push(Number(chartData[key].QTJSRY).toFixed(2))// 其他技术人员

          this.xzhouData.push(chartData[key].NF)// x轴年份数据
        }

        if (this.xzhouData.length === 0) {
          this.legendDataForBar1 = []
          this.legendDataForBar2 = []
          this.legendDataForLine1 = []
          this.legendDataForLine2 = []
          this.isShowData = false
        } else {
          this.legendDataForBar1 = ['机构数', '人员数']
          this.legendDataForBar2 = ['床位数']
          this.legendDataForLine1 = ['医院', '卫生院', '专科防治机构', '疾病预防控制机构', '妇幼保健机构', '医学科学研究机构', '其他卫生机构']
          this.legendDataForLine2 = ['卫生技术人员', '医生', '注册护士', '管理人员', '工勤人员', '其他技术人员']
          this.isShowData = true
        }

        this.seriesAllDataForBar1.push(data0, data1)
        this.seriesAllDataForBar2.push(data2)
        this.seriesAllDataForLine1.push(data3, data4, data5, data6, data7, data8, data9)
        this.seriesAllDataForLine2.push(data10, data11, data12, data13, data14, data15)

        this.$nextTick(function () {
          setTimeout(() => {
            this.barDrawLine1()
            this.barDrawLine2()
            this.lineDrawLine1()
            this.lineDrawLine2()
          }, 0)
        })
      } else {
        this.loading = false
        this.isShowData = false
        this.listData = []
        // this.checkList = ['年份', '机构数_个', '医院', '卫生院', '专科防治机构', '疾病预防控制机构', '妇幼保健机构', '医学科学研究机构', '其他卫生机构', '床位数_张', '人员数_人', '卫生技术人员', '医生', '注册护士', '其他技术人员', '管理人员', '工勤人员', '更新时间']
        // this.checkListIng = ['年份', '机构数_个', '医院', '卫生院', '专科防治机构', '疾病预防控制机构', '妇幼保健机构', '更新时间']
        this.$message.error(res.msg)
        return
      }
    }
  },
  created () {
    this.checkList = ['年份', '机构数_个', '医院', '卫生院', '专科防治机构', '疾病预防控制机构', '妇幼保健机构', '医学科学研究机构', '其他卫生机构', '床位数_张', '人员数_人', '卫生技术人员', '医生', '注册护士', '其他技术人员', '管理人员', '工勤人员', '更新时间']
    this.checkListIng = ['年份', '机构数_个', '医院', '卫生院', '专科防治机构', '疾病预防控制机构', '妇幼保健机构', '更新时间']
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barDrawLine1()
        this.barDrawLine2()
        this.lineDrawLine1()
        this.lineDrawLine2()
      }, 0)
    })

    this.initBarEchart1()
    this.initBarEchart2()
    this.initLineEchart1()
    this.initLineEchart2()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
          this.barDrawLine2()
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
