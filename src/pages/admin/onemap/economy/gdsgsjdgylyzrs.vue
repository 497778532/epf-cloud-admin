<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">广东省各市接待过夜旅游者人数</div>
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

              <el-date-picker v-model="censusYear"
                              type="year"
                              align="center"
                              :clearable="false"
                              value-format="yyyy"
                              placeholder="选择开始年份"
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
          单位：人、%
        </div>
        <div v-if="cjActiveName === 'Table'">
          <el-table :data="listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    stripe
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border>
            <el-table-column prop="ND"
                             label="年份"
                             min-width="100"
                             align="center"></el-table-column>
            <el-table-column prop="SBRMFKGCHQTRFFHSSSJ"
                             label="市别人民防空工程和其他人防防护设施设计"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('市别人民防空工程和其他人防防护设施设计')">
              <template slot-scope="scope">
                <span v-if="scope.row.SBRMFKGCHQTRFFHSSSJ===''">- -</span>
                <span v-else>{{scope.row.SBRMFKGCHQTRFFHSSSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JDGYLYZZRS"
                             label="接待过夜旅游者总人数"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('接待过夜旅游者总人数')">
              <template slot-scope="scope">
                <span v-if="scope.row.JDGYLYZZRS===''">- -</span>
                <span v-else>{{scope.row.JDGYLYZZRS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BSNZZ"
                             label="比上年增长_%"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('比上年增长_%')">
              <template slot-scope="scope">
                <span v-if="scope.row.BSNZZ===''">- -</span>
                <span v-else>{{scope.row.BSNZZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WGR"
                             label="外国人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('外国人')">
              <template slot-scope="scope">
                <span v-if="scope.row.WGR===''">- -</span>
                <span v-else>{{scope.row.WGR}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WGRBSNZZ"
                             label="外国人比上年增长_%"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('外国人比上年增长_%')">
              <template slot-scope="scope">
                <span v-if="scope.row.WGRBSNZZ===''">- -</span>
                <span v-else>{{scope.row.WGRBSNZZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="RJLYZ"
                             label="入境旅游者"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('入境旅游者')">
              <template slot-scope="scope">
                <span v-if="scope.row.RJLYZ===''">- -</span>
                <span v-else>{{scope.row.RJLYZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="RJLYZBSNZZ"
                             label="入境旅游者比上年增长_%"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('入境旅游者比上年增长_%')">
              <template slot-scope="scope">
                <span v-if="scope.row.RJLYZBSNZZ===''">- -</span>
                <span v-else>{{scope.row.RJLYZBSNZZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GNLYZ"
                             label="国内旅游者"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('国内旅游者')">
              <template slot-scope="scope">
                <span v-if="scope.row.GNLYZ===''">- -</span>
                <span v-else>{{scope.row.GNLYZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GNLYZBSNZZ"
                             label="国内旅游者比上年增长_%"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('国内旅游者比上年增长_%')">
              <template slot-scope="scope">
                <span v-if="scope.row.GNLYZBSNZZ===''">- -</span>
                <span v-else>{{scope.row.GNLYZBSNZZ}}</span>
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
          <div>单位：人、%</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine6 === true }"
                 @click="revealBarLine6">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart6"
               ref="barlineChart6"
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
          <div>单位：人、%</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine7 === true }"
                 @click="revealBarLine7">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart7"
               ref="barlineChart7"
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
          <div>单位：人、%</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine8 === true }"
                 @click="revealBarLine8">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart8"
               ref="barlineChart8"
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
          <div>单位：人、%</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine9 === true }"
                 @click="revealBarLine9">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart9"
               ref="barlineChart9"
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
        // ND: moment().year()
        ND: 2017
      },
      censusYear: '',
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
          this.barlineDrawLine6()
          this.barlineDrawLine7()
          this.barlineDrawLine8()
          this.barlineDrawLine9()
        }, 0)
      })
    },
    searchList () {
      this.params.ND = this.censusYear// 查询年份

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getEconomyData()
    },
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['年份', '市别人民防空工程和其他人防防护设施设计', '接待过夜旅游者总人数', '比上年增长_%', '外国人', '外国人比上年增长_%', '入境旅游者', '入境旅游者比上年增长_%', '国内旅游者', '国内旅游者比上年增长_%', '更新时间']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['ND', 'SBRMFKGCHQTRFFHSSSJ', 'JDGYLYZZRS', 'BSNZZ', 'WGR', 'WGRBSNZZ', 'RJLYZ', 'RJLYZBSNZZ', 'GNLYZ', 'GNLYZBSNZZ', 'GXSJ']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '广东省各市接待过夜旅游者人数')
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
      this.seriesAllDataForBarT6 = []
      this.seriesAllDataForLineT6 = []
      this.seriesAllDataForBarT7 = []
      this.seriesAllDataForLineT7 = []
      this.seriesAllDataForBarT8 = []
      this.seriesAllDataForLineT8 = []
      this.seriesAllDataForBarT9 = []
      this.seriesAllDataForLineT9 = []

      let params = this.params
      let res = await this.$post('/epf-third-part/oneBatch/GDSGSJDGYLYZRS', params)
      if (res.code === 0) {
        let chartData = res.result

        this.loading = false
        this.listData = chartData
        // this.checkList = ['年份', '市别人民防空工程和其他人防防护设施设计', '接待过夜旅游者总人数', '比上年增长_%', '外国人', '外国人比上年增长_%', '入境旅游者', '入境旅游者比上年增长_%', '国内旅游者', '国内旅游者比上年增长_%', '更新时间']
        // this.checkListIng = ['年份', '市别人民防空工程和其他人防防护设施设计', '接待过夜旅游者总人数', '比上年增长_%', '外国人', '外国人比上年增长_%', '入境旅游者', '更新时间']
        this.xzhouData = [] // x轴数据
        this.legendDataForBarT6 = [] // 图例数据
        this.legendDataForLineT6 = [] // 图例数据
        this.legendDataForBarLineT6 = []// 图例数据
        this.legendDataForBarT7 = [] // 图例数据
        this.legendDataForLineT7 = [] // 图例数据
        this.legendDataForBarLineT7 = []// 图例数据
        this.legendDataForBarT8 = [] // 图例数据
        this.legendDataForLineT8 = [] // 图例数据
        this.legendDataForBarLineT8 = []// 图例数据
        this.legendDataForBarT9 = [] // 图例数据
        this.legendDataForLineT9 = [] // 图例数据
        this.legendDataForBarLineT9 = []// 图例数据

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
          data0.push(Number(chartData[key].JDGYLYZZRS).toFixed(2))//	接待过夜旅游者总人数
          data1.push(Number(chartData[key].BSNZZ).toFixed(2))// 比上年增长_%

          data2.push(Number(chartData[key].WGR).toFixed(2))// 外国人
          data3.push(Number(chartData[key].WGRBSNZZ).toFixed(2))// 外国人比上年增长_%

          data4.push(Number(chartData[key].RJLYZ).toFixed(2))// 入境旅游者
          data5.push(Number(chartData[key].RJLYZBSNZZ).toFixed(2))// 入境旅游者比上年增长_%

          data6.push(Number(chartData[key].GNLYZ).toFixed(2))// 国内旅游者
          data7.push(Number(chartData[key].GNLYZBSNZZ).toFixed(2))// 国内旅游者比上年增长_%

          this.xzhouData.push(chartData[key].SBRMFKGCHQTRFFHSSSJ)// 市别
        }

        if (this.xzhouData.length === 0) {
          this.legendDataForBarT6 = []
          this.legendDataForLineT6 = []
          this.legendDataForBarLineT6 = []
          this.legendDataForBarT7 = []
          this.legendDataForLineT7 = []
          this.legendDataForBarLineT7 = []
          this.legendDataForBarT8 = []
          this.legendDataForLineT8 = []
          this.legendDataForBarLineT8 = []
          this.legendDataForBarT9 = []
          this.legendDataForLineT9 = []
          this.legendDataForBarLineT9 = []
          this.isShowData = false
        } else {
          this.legendDataForBarT6 = ['接待过夜旅游者总人数']
          this.legendDataForLineT6 = ['比上年增长_%']
          this.legendDataForBarLineT6 = ['接待过夜旅游者总人数', { name: '比上年增长_%', icon: 'line' }]
          this.legendDataForBarT7 = ['外国人']
          this.legendDataForLineT7 = ['外国人比上年增长_%']
          this.legendDataForBarLineT7 = ['外国人', { name: '外国人比上年增长_%', icon: 'line' }]
          this.legendDataForBarT8 = ['入境旅游者']
          this.legendDataForLineT8 = ['入境旅游者比上年增长_%']
          this.legendDataForBarLineT8 = ['入境旅游者', { name: '入境旅游者比上年增长_%', icon: 'line' }]
          this.legendDataForBarT9 = ['国内旅游者']
          this.legendDataForLineT9 = ['国内旅游者比上年增长_％']
          this.legendDataForBarLineT9 = ['国内旅游者', { name: '国内旅游者比上年增长_%', icon: 'line' }]
          this.isShowData = true
        }

        this.seriesAllDataForBarT6.push(data0)
        this.seriesAllDataForLineT6.push(data1)
        this.seriesAllDataForBarT7.push(data2)
        this.seriesAllDataForLineT7.push(data3)
        this.seriesAllDataForBarT8.push(data4)
        this.seriesAllDataForLineT8.push(data5)
        this.seriesAllDataForBarT9.push(data6)
        this.seriesAllDataForLineT9.push(data7)

        this.$nextTick(function () {
          setTimeout(() => {
            this.barlineDrawLine6()
            this.barlineDrawLine7()
            this.barlineDrawLine8()
            this.barlineDrawLine9()
          }, 0)
        })
      } else {
        this.loading = false
        this.isShowData = false
        this.listData = []
        // this.checkList = ['年份', '市别人民防空工程和其他人防防护设施设计', '接待过夜旅游者总人数', '比上年增长_%', '外国人', '外国人比上年增长_%', '入境旅游者', '入境旅游者比上年增长_%', '国内旅游者', '国内旅游者比上年增长_%', '更新时间']
        // this.checkListIng = ['年份', '市别人民防空工程和其他人防防护设施设计', '接待过夜旅游者总人数', '比上年增长_%', '外国人', '外国人比上年增长_%', '入境旅游者', '更新时间']
        this.$message.error(res.msg)
        return
      }
    }
  },
  created () {
    this.checkList = ['年份', '市别人民防空工程和其他人防防护设施设计', '接待过夜旅游者总人数', '比上年增长_%', '外国人', '外国人比上年增长_%', '入境旅游者', '入境旅游者比上年增长_%', '国内旅游者', '国内旅游者比上年增长_%', '更新时间']
    this.checkListIng = ['年份', '市别人民防空工程和其他人防防护设施设计', '接待过夜旅游者总人数', '比上年增长_%', '外国人', '外国人比上年增长_%', '入境旅游者', '更新时间']
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barlineDrawLine6()
        this.barlineDrawLine7()
        this.barlineDrawLine8()
        this.barlineDrawLine9()
      }, 0)
    })

    this.initBarLineEchart6()
    this.initBarLineEchart7()
    this.initBarLineEchart8()
    this.initBarLineEchart9()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barlineDrawLine6()
          this.barlineDrawLine7()
          this.barlineDrawLine8()
          this.barlineDrawLine9()
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
