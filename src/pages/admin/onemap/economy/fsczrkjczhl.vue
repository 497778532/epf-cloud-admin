<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">分市常住人口及城镇化率</div>
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

            <!-- <div class="filter_title_box"
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

            </div> -->
            <!-- <div class="primary_search"
                 @click="searchList()">查询</div> -->
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
              <!-- <span style="color:#9A9A9A;font-size:16px;line-height: 21px;">（至多可选择7项）</span> -->
            </el-checkbox-group>
          </div>
        </div>

        <div class="unitTipTable-nature"
             v-if="cjActiveName === 'Table'">
          单位：万人
        </div>
        <div v-if="cjActiveName === 'Table'">
          <el-table :data="listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    stripe
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border>
            <el-table-column prop="TJNF"
                             label="年份"
                             min-width="100"
                             align="center"></el-table-column>
            <el-table-column prop="SB"
                             label="市别"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('市别')">
              <template slot-scope="scope">
                <span v-if="scope.row.SB===''">- -</span>
                <span v-else>{{scope.row.SB}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CZRK_WR_"
                             label="常住人口_万人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('常住人口_万人')">
              <template slot-scope="scope">
                <span v-if="scope.row.CZRK_WR_===''">- -</span>
                <span v-else>{{scope.row.CZRK_WR_}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CZRK_CZ_WR_"
                             label="常住人口城镇_万人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('常住人口城镇_万人')">
              <template slot-scope="scope">
                <span v-if="scope.row.CZRK_CZ_WR_===''">- -</span>
                <span v-else>{{scope.row.CZRK_CZ_WR_}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CZRK_NC_WR_"
                             label="常住人口农村_万人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('常住人口农村_万人')">
              <template slot-scope="scope">
                <span v-if="scope.row.CZRK_NC_WR_===''">- -</span>
                <span v-else>{{scope.row.CZRK_NC_WR_}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CZHL_BFB_"
                             label="城镇化率百分比"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('城镇化率百分比')">
              <template slot-scope="scope">
                <span v-if="scope.row.CZHL_BFB_===''">- -</span>
                <span v-else>{{scope.row.CZHL_BFB_}}</span>
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
          <div>单位：万人</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine10 === true }"
                 @click="revealBarLine10">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart10"
               ref="barlineChart10"
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
          <div>单位：万人</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBar10 === true }"
                 @click="revealBar10">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barChart10"
               ref="barChart10"
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

export default {
  mixins: [complexity],
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {

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
          this.barlineDrawLine10()
          this.lineDrawLine10()
        }, 0)
      })
    },
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['年份', '市别', '常住人口_万人', '常住人口城镇_万人', '常住人口农村_万人', '城镇化率百分比', '更新时间']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['TJNF', 'SB', 'CZRK_WR_', 'CZRK_CZ_WR_', 'CZRK_NC_WR_', 'CZHL_BFB_', 'GXSJ']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '分市常住人口及城镇化率')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleCheckedTypesChange (value) {
      if (this.checkListIng.length === 9) {
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
      this.seriesAllDataForBarT10 = []
      this.seriesAllDataForLineT10 = []
      this.seriesAllDataForBar10 = []

      let res = await this.$post('/epf-third-part/oneBatch/FSCZRKJCZHL')
      if (res.code === 0) {
        let chartData = res.result

        this.loading = false
        this.listData = chartData
        // this.checkList = ['年份', '市别', '常住人口_万人', '常住人口城镇_万人', '常住人口农村_万人', '城镇化率百分比', '更新时间']
        // this.checkListIng = ['年份', '市别', '常住人口_万人', '常住人口城镇_万人', '常住人口农村_万人', '城镇化率百分比', '更新时间']
        this.xzhouData = [] // x轴数据
        this.legendDataForBarT10 = [] // 图例数据
        this.legendDataForLineT10 = [] // 图例数据
        this.legendDataForBarLineT10 = []// 图例数据
        this.legendDataForBar10 = [] // 图例数据

        // 展示的数据
        let data0 = []
        let data1 = []
        let data2 = []
        let data3 = []

        chartData = chartData.filter(item => {
          return item.SB !== '全省'
        })

        for (var key in chartData) {
          data0.push(Number(chartData[key].CZRK_WR_).toFixed(2))//	常住人口_万人
          data1.push(Number(chartData[key].CZHL_BFB_).toFixed(2))// 城镇化率百分比

          data2.push(Number(chartData[key].CZRK_CZ_WR_).toFixed(2))// 常住人口城镇_万人
          data3.push(Number(chartData[key].CZRK_NC_WR_).toFixed(2))// 常住人口农村_万人

          this.xzhouData.push(chartData[key].SB)// x轴年份数据
        }

        if (this.xzhouData.length === 0) {
          this.legendDataForBarT10 = []
          this.legendDataForLineT10 = []
          this.legendDataForBarLineT10 = []
          this.legendDataForBar10 = []
          this.isShowData = false
        } else {
          this.legendDataForBarT10 = ['常住人口_万人']
          this.legendDataForLineT10 = ['城镇化率百分比']
          this.legendDataForBarLineT10 = ['常住人口_万人', { name: '城镇化率百分比', icon: 'line' }]
          this.legendDataForBar10 = ['常住人口城镇_万人', '常住人口农村_万人']
          this.isShowData = true
        }

        this.seriesAllDataForBarT10.push(data0)
        this.seriesAllDataForLineT10.push(data1)
        this.seriesAllDataForBar10.push(data2, data3)

        this.$nextTick(function () {
          setTimeout(() => {
            this.barlineDrawLine10()
            this.barDrawLine10()
          }, 0)
        })
      } else {
        this.loading = false
        this.isShowData = false
        this.listData = []
        // this.checkList = ['年份', '市别', '常住人口_万人', '常住人口城镇_万人', '常住人口农村_万人', '城镇化率百分比', '更新时间']
        // this.checkListIng = ['年份', '市别', '常住人口_万人', '常住人口城镇_万人', '常住人口农村_万人', '城镇化率百分比', '更新时间']
        this.$message.error(res.msg)
        return
      }
    }
  },
  created () {
    this.checkList = ['年份', '市别', '常住人口_万人', '常住人口城镇_万人', '常住人口农村_万人', '城镇化率百分比', '更新时间']
    this.checkListIng = ['年份', '市别', '常住人口_万人', '常住人口城镇_万人', '常住人口农村_万人', '城镇化率百分比', '更新时间']
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barlineDrawLine10()
        this.barDrawLine10()
      }, 0)
    })

    this.initBarLineEchart10()
    this.initBarEchart10()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barlineDrawLine10()
          this.barDrawLine10()
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
