<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">研究生教育情况</div>
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
          单位：个、人
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
            <el-table-column prop="PYDWS_G"
                             label="培养单位数_个"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('培养单位数_个')">
              <template slot-scope="scope">
                <span v-if="scope.row.PYDWS_G===''">- -</span>
                <span v-else>{{scope.row.PYDWS_G}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GDXX"
                             label="高等学校"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('高等学校')">
              <template slot-scope="scope">
                <span v-if="scope.row.GDXX===''">- -</span>
                <span v-else>{{scope.row.GDXX}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="KYDW"
                             label="科研单位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('科研单位')">
              <template slot-scope="scope">
                <span v-if="scope.row.KYDW===''">- -</span>
                <span v-else>{{scope.row.KYDW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZSS_R"
                             label="招生数_人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('招生数_人')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZSS_R===''">- -</span>
                <span v-else>{{scope.row.ZSS_R}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZSS_GDBSXW"
                             label="招生数_攻读博士学位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('招生数_攻读博士学位')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZSS_GDBSXW===''">- -</span>
                <span v-else>{{scope.row.ZSS_GDBSXW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZSS_GDSSXW"
                             label="招生数_攻读硕士学位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('招生数_攻读硕士学位')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZSS_GDSSXW===''">- -</span>
                <span v-else>{{scope.row.ZSS_GDSSXW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZSS_GDXX"
                             label="招生数_高等学校"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('招生数_高等学校')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZSS_GDXX===''">- -</span>
                <span v-else>{{scope.row.ZSS_GDXX}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZSS_KYDW"
                             label="招生数_科研单位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('招生数_科研单位')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZSS_KYDW===''">- -</span>
                <span v-else>{{scope.row.ZSS_KYDW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZXXSS_R"
                             label="在校学生数_人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('在校学生数_人')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZXXSS_R===''">- -</span>
                <span v-else>{{scope.row.ZXXSS_R}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZXXSS_GDBSXW"
                             label="在校学生数_攻读博士学位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('在校学生数_攻读博士学位')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZXXSS_GDBSXW===''">- -</span>
                <span v-else>{{scope.row.ZXXSS_GDBSXW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZXXSS_GDSSXW"
                             label="在校学生数_攻读硕士学位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('在校学生数_攻读硕士学位')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZXXSS_GDSSXW===''">- -</span>
                <span v-else>{{scope.row.ZXXSS_GDSSXW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZXXSS_GDXX"
                             label="在校学生数_高等学校"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('在校学生数_高等学校')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZXXSS_GDXX===''">- -</span>
                <span v-else>{{scope.row.ZXXSS_GDXX}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZXXSS_KYDW"
                             label="在校学生数_科研单位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('在校学生数_科研单位')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZXXSS_KYDW===''">- -</span>
                <span v-else>{{scope.row.ZXXSS_KYDW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BYSS_R"
                             label="毕业生数_人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('毕业生数_人')">
              <template slot-scope="scope">
                <span v-if="scope.row.BYSS_R===''">- -</span>
                <span v-else>{{scope.row.BYSS_R}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BYSS_GDBSXW"
                             label="毕业生数_攻读博士学位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('毕业生数_攻读博士学位')">
              <template slot-scope="scope">
                <span v-if="scope.row.BYSS_GDBSXW===''">- -</span>
                <span v-else>{{scope.row.BYSS_GDBSXW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BYSS_GDSSXW"
                             label="毕业生数_攻读硕士学位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('毕业生数_攻读硕士学位')">
              <template slot-scope="scope">
                <span v-if="scope.row.BYSS_GDSSXW===''">- -</span>
                <span v-else>{{scope.row.BYSS_GDSSXW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BYSS_GDXX"
                             label="毕业生数_高等学校"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('毕业生数_高等学校')">
              <template slot-scope="scope">
                <span v-if="scope.row.BYSS_GDXX===''">- -</span>
                <span v-else>{{scope.row.BYSS_GDXX}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BYSS_KYDW"
                             label="毕业生数_科研单位"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('毕业生数_科研单位')">
              <template slot-scope="scope">
                <span v-if="scope.row.BYSS_KYDW===''">- -</span>
                <span v-else>{{scope.row.BYSS_KYDW}}</span>
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
          <div>单位：人</div>
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
          <div>单位：人</div>
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
          <div>单位：人</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine4 === true }"
                 @click="revealBarLine4">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart4"
               ref="barlineChart4"
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
          this.barlineDrawLine4()
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
        const tHeader = ['年份', '培养单位数_个', '高等学校', '科研单位', '招生数_人', '招生数_攻读博士学位', '招生数_攻读硕士学位', '招生数_高等学校', '招生数_科研单位', '在校学生数_人', '在校学生数_攻读博士学位', '在校学生数_攻读硕士学位', '在校学生数_高等学校', '在校学生数_科研单位', '毕业生数_人', '毕业生数_攻读博士学位', '毕业生数_攻读硕士学位', '毕业生数_高等学校', '毕业生数_科研单位', '更新时间']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['NF', 'PYDWS_G', 'GDXX', 'KYDW', 'ZSS_R', 'ZSS_GDBSXW', 'ZSS_GDSSXW', 'ZSS_GDXX', 'ZSS_KYDW', 'ZXXSS_R', 'ZXXSS_GDBSXW', 'ZXXSS_GDSSXW', 'ZXXSS_GDXX', 'ZXXSS_KYDW', 'BYSS_R', 'BYSS_GDBSXW', 'BYSS_GDSSXW', 'BYSS_GDXX', 'BYSS_KYDW', 'GXSJ']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '研究生教育情况')
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
      this.seriesAllDataForBarT4 = []
      this.seriesAllDataForLineT4 = []

      let params = this.params
      let res = await this.$post('/epf-third-part/threebatch/YJSJYQKB', params)
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
        // this.checkList = ['年份', '培养单位数_个', '高等学校', '科研单位', '招生数_人', '招生数_攻读博士学位', '招生数_攻读硕士学位', '招生数_高等学校', '招生数_科研单位', '在校学生数_人', '在校学生数_攻读博士学位', '在校学生数_攻读硕士学位', '在校学生数_高等学校', '在校学生数_科研单位', '毕业生数_人', '毕业生数_攻读博士学位', '毕业生数_攻读硕士学位', '毕业生数_高等学校', '毕业生数_科研单位', '更新时间']
        // this.checkListIng = ['年份', '培养单位数_个', '高等学校', '科研单位', '招生数_人', '招生数_攻读博士学位', '招生数_攻读硕士学位', '更新时间']
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
        this.legendDataForBarT4 = [] // 图例数据
        this.legendDataForLineT4 = [] // 图例数据
        this.legendDataForBarLineT4 = []// 图例数据

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

        for (var key in chartData) {
          data0.push(Number(chartData[key].PYDWS_G).toFixed(2))//	培养单位数_个
          data1.push(Number(chartData[key].GDXX).toFixed(2))// 高等学校
          data2.push(Number(chartData[key].KYDW).toFixed(2))// 科研单位

          data3.push(Number(chartData[key].ZSS_R).toFixed(2))// 招生数_人
          data4.push(Number(chartData[key].ZSS_GDBSXW).toFixed(2))// 招生数_攻读博士学位
          data5.push(Number(chartData[key].ZSS_GDSSXW).toFixed(2))// 招生数_攻读硕士学位
          data6.push(Number(chartData[key].ZSS_GDXX).toFixed(2))// 招生数_高等学校
          data7.push(Number(chartData[key].ZSS_KYDW).toFixed(2))// 招生数_科研单位

          data8.push(Number(chartData[key].ZXXSS_R).toFixed(2))// 在校学生数_人
          data9.push(Number(chartData[key].ZXXSS_GDBSXW).toFixed(2))// 在校学生数_攻读博士学位
          data10.push(Number(chartData[key].ZXXSS_GDSSXW).toFixed(2))// 在校学生数_攻读硕士学位
          data11.push(Number(chartData[key].ZXXSS_GDXX).toFixed(2))// 在校学生数_高等学校
          data12.push(Number(chartData[key].ZXXSS_KYDW).toFixed(2))// 在校学生数_科研单位

          data13.push(Number(chartData[key].BYSS_R).toFixed(2))// 毕业生数_人
          data14.push(Number(chartData[key].BYSS_GDBSXW).toFixed(2))// 毕业生数_攻读博士学位
          data15.push(Number(chartData[key].BYSS_GDSSXW).toFixed(2))// 毕业生数_攻读硕士学位
          data16.push(Number(chartData[key].BYSS_GDXX).toFixed(2))// 毕业生数_高等学校
          data17.push(Number(chartData[key].BYSS_KYDW).toFixed(2))// 毕业生数_科研单位

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
          this.legendDataForBarT4 = []
          this.legendDataForLineT4 = []
          this.legendDataForBarLineT4 = []
          this.isShowData = false
        } else {
          this.legendDataForBarT1 = ['培养单位数']
          this.legendDataForLineT1 = ['高等学校', '科研单位']
          this.legendDataForBarLineT1 = ['培养单位数', { name: '高等学校', icon: 'line' }, { name: '科研单位', icon: 'line' }]
          this.legendDataForBarT2 = ['招生数']
          this.legendDataForLineT2 = ['招生数_攻读博士学位', '招生数_攻读硕士学位', '招生数_高等学校', '招生数_科研单位']
          this.legendDataForBarLineT2 = ['招生数', { name: '招生数_攻读博士学位', icon: 'line' }, { name: '招生数_攻读硕士学位', icon: 'line' }, { name: '招生数_高等学校', icon: 'line' }, { name: '招生数_科研单位', icon: 'line' }]
          this.legendDataForBarT3 = ['在校学生数']
          this.legendDataForLineT3 = ['在校学生数_攻读博士学位', '在校学生数_攻读硕士学位', '在校学生数_高等学校', '在校学生数_科研单位']
          this.legendDataForBarLineT3 = ['在校学生数', { name: '在校学生数_攻读博士学位', icon: 'line' }, { name: '在校学生数_攻读硕士学位', icon: 'line' }, { name: '在校学生数_高等学校', icon: 'line' }, { name: '在校学生数_科研单位', icon: 'line' }]
          this.legendDataForBarT4 = ['毕业生数']
          this.legendDataForLineT4 = ['毕业生数_攻读博士学位', '毕业生数_攻读硕士学位', '毕业生数_高等学校', '毕业生数_科研单位']
          this.legendDataForBarLineT4 = ['毕业生数', { name: '毕业生数_攻读博士学位', icon: 'line' }, { name: '毕业生数_攻读硕士学位', icon: 'line' }, { name: '毕业生数_高等学校', icon: 'line' }, { name: '毕业生数_科研单位', icon: 'line' }]
          this.isShowData = true
        }

        this.seriesAllDataForBarT1.push(data0)
        this.seriesAllDataForLineT1.push(data1, data2)
        this.seriesAllDataForBarT2.push(data3)
        this.seriesAllDataForLineT2.push(data4, data5, data6, data7)
        this.seriesAllDataForBarT3.push(data8)
        this.seriesAllDataForLineT3.push(data9, data10, data11, data12)
        this.seriesAllDataForBarT4.push(data13)
        this.seriesAllDataForLineT4.push(data14, data15, data16, data17)

        this.$nextTick(function () {
          setTimeout(() => {
            this.barlineDrawLine1()
            this.barlineDrawLine2()
            this.barlineDrawLine3()
            this.barlineDrawLine4()
          }, 0)
        })
      } else {
        this.loading = false
        this.isShowData = false
        this.listData = []
        // this.checkList = ['年份', '培养单位数_个', '高等学校', '科研单位', '招生数_人', '招生数_攻读博士学位', '招生数_攻读硕士学位', '招生数_高等学校', '招生数_科研单位', '在校学生数_人', '在校学生数_攻读博士学位', '在校学生数_攻读硕士学位', '在校学生数_高等学校', '在校学生数_科研单位', '毕业生数_人', '毕业生数_攻读博士学位', '毕业生数_攻读硕士学位', '毕业生数_高等学校', '毕业生数_科研单位', '更新时间']
        // this.checkListIng = ['年份', '培养单位数_个', '高等学校', '科研单位', '招生数_人', '招生数_攻读博士学位', '招生数_攻读硕士学位', '更新时间']
        this.$message.error(res.msg)
        return
      }
    }
  },
  created () {
    this.checkList = ['年份', '培养单位数_个', '高等学校', '科研单位', '招生数_人', '招生数_攻读博士学位', '招生数_攻读硕士学位', '招生数_高等学校', '招生数_科研单位', '在校学生数_人', '在校学生数_攻读博士学位', '在校学生数_攻读硕士学位', '在校学生数_高等学校', '在校学生数_科研单位', '毕业生数_人', '毕业生数_攻读博士学位', '毕业生数_攻读硕士学位', '毕业生数_高等学校', '毕业生数_科研单位', '更新时间']
    this.checkListIng = ['年份', '培养单位数_个', '高等学校', '科研单位', '招生数_人', '招生数_攻读博士学位', '招生数_攻读硕士学位', '更新时间']
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barlineDrawLine1()
        this.barlineDrawLine2()
        this.barlineDrawLine3()
        this.barlineDrawLine4()
      }, 0)
    })

    this.initBarLineEchart1()
    this.initBarLineEchart2()
    this.initBarLineEchart3()
    this.initBarLineEchart4()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barlineDrawLine1()
          this.barlineDrawLine2()
          this.barlineDrawLine3()
          this.barlineDrawLine4()
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
