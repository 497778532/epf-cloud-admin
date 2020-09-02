<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">每千老年人口养老床位数统计信息</div>
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
          单位：人、张
        </div>
        <div v-if="cjActiveName === 'Table'">
          <el-table :data="listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    stripe
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border>
            <el-table-column prop="DWMC"
                             label="单位名称"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.DWMC===''">- -</span>
                <span v-else>{{scope.row.DWMC}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YLCWS"
                             label="养老床位数"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('养老床位数')">
              <template slot-scope="scope">
                <span v-if="scope.row.YLCWS===''">- -</span>
                <span v-else>{{scope.row.YLCWS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="HJLNRKS_R"
                             label="户籍老年人口数_人"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('户籍老年人口数_人')">
              <template slot-scope="scope">
                <span v-if="scope.row.HJLNRKS_R===''">- -</span>
                <span v-else>{{scope.row.HJLNRKS_R}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="MQLNRKYLCWS_Z"
                             label="每千老年人口养老床位数_张"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('每千老年人口养老床位数_张')">
              <template slot-scope="scope">
                <span v-if="scope.row.MQLNRKYLCWS_Z===''">- -</span>
                <span v-else>{{scope.row.MQLNRKYLCWS_Z}}</span>
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
          <div>单位：张</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBar9 === true }"
                 @click="revealBar9">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barChart9"
               ref="barChart9"
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
          <div>单位：人、张</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBarLine5 === true }"
                 @click="revealBarLine5">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barlineChart5"
               ref="barlineChart5"
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
        DWMC: ''
      },
      showYear: [],
      loading: true,

      quyuName: '',
      quyuList: [
        { value: '广东省', label: '广东省' },
        { value: '广州市', label: '广州市' },
        { value: '韶关市', label: '韶关市' },
        { value: '深圳市', label: '深圳市' },
        { value: '珠海市', label: '珠海市' },
        { value: '汕头市', label: '汕头市' },
        { value: '佛山市', label: '佛山市' },
        { value: '江门市', label: '江门市' },
        { value: '湛江市', label: '湛江市' },
        { value: '茂名市', label: '茂名市' },
        { value: '肇庆市', label: '肇庆市' },
        { value: '惠州市', label: '惠州市' },
        { value: '梅州市', label: '梅州市' },
        { value: '汕尾市', label: '汕尾市' },
        { value: '河源市', label: '河源市' },
        { value: '阳江市', label: '阳江市' },
        { value: '清远市', label: '清远市' },
        { value: '东莞市', label: '东莞市' },
        { value: '中山市', label: '中山市' },
        { value: '潮州市', label: '潮州市' },
        { value: '揭阳市', label: '揭阳市' },
        { value: '云浮市', label: '云浮市' }
      ],

      checkList: [], // 全部多选内容
      checkDisList: ['单位名称'], // 默认+判断禁用内容
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
          this.barDrawLine9()
          this.barlineDrawLine5()
        }, 0)
      })
    },
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['单位名称', '养老床位数', '户籍老年人口数_人', '每千老年人口养老床位数_张']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['DWMC', 'YLCWS', 'HJLNRKS_R', 'MQLNRKYLCWS_Z']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '每千老年人口养老床位数统计信息')
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
        this.checkDisList.unshift('单位名称')
      } else {
        this.checkDisList = ['单位名称']
      }
    },
    handleCheckedTypesCancelChange () {
      this.checkDisList = ['单位名称']
      this.checkListIng = ['单位名称']
    },
    async getEconomyData (yaerList) {
      this.loading = true
      this.xzhouData = []
      this.xzhouData1 = []
      this.seriesAllDataForBar9 = []
      this.seriesAllDataForBarT5 = []
      this.seriesAllDataForLineT5 = []

      let chartData = []
      for (let i = 0; i < yaerList.length; i++) {
        let res = await this.$post(`/epf-third-part/twoBatch/MQLNRKYLCWSTJXX?DWMC=${yaerList[i]}`)
        if (res.code === 0) {
          let data = res.result[0]
          chartData.push(data)
        } else {
          this.loading = false
          this.isShowData = false
          this.listData = []
          // this.checkList = ['单位名称', '养老床位数', '户籍老年人口数_人', '每千老年人口养老床位数_张']
          // this.checkListIng = ['单位名称', '养老床位数', '户籍老年人口数_人', '每千老年人口养老床位数_张']
          this.$message.error(res.msg)
          return
        }
      }
      chartData = chartData.filter(res => {
        return res !== undefined
      })

      // for (let key in chartData) {
      //   chartData[key]['RankYear'] = parseInt(chartData[key].NF)
      //   if (chartData[key].NF.length > 4) {
      //     chartData[key]['RankYearChange'] = 0
      //   } else {
      //     chartData[key]['RankYearChange'] = 1
      //   }
      // }

      // chartData.sort(function (a, b) {
      //   if (a.RankYear === b.RankYear) { // 如果RankYear相同，按照RankYearChange的降序
      //     return b.RankYearChange - a.RankYearChange
      //   } else {
      //     return a.RankYear - b.RankYear
      //   }
      // })

      this.loading = false
      this.listData = chartData
      // this.checkList = ['单位名称', '养老床位数', '户籍老年人口数_人', '每千老年人口养老床位数_张']
      // this.checkListIng = ['单位名称', '养老床位数', '户籍老年人口数_人', '每千老年人口养老床位数_张']
      this.xzhouData = [] // x轴数据
      this.xzhouData1 = [] // x轴数据
      this.legendDataForBar9 = [] // 图例数据
      this.legendDataForBarT5 = [] // 图例数据
      this.legendDataForLineT5 = [] // 图例数据
      this.legendDataForBarLineT5 = []// 图例数据
      // 展示的数据
      let data0 = []
      let data1 = []
      let data2 = []

      for (var key in chartData) {
        data0.push(Number(chartData[key].MQLNRKYLCWS_Z).toFixed(2))//	每千老年人口养老床位数_张

        this.xzhouData.push(chartData[key].DWMC)// x轴年份数据
      }

      chartData = chartData.filter(item => {
        return item.DWMC !== '广东省'
      })

      for (var key in chartData) {
        data1.push(Number(chartData[key].HJLNRKS_R).toFixed(2))// 户籍老年人口数_人
        data2.push(Number(chartData[key].YLCWS).toFixed(2))// 养老床位数

        this.xzhouData1.push(chartData[key].DWMC)// x轴年份数据
      }

      if (this.xzhouData.length === 0) {
        this.legendDataForBar9 = []
        this.legendDataForBarT5 = []
        this.legendDataForLineT5 = []
        this.legendDataForBarLineT5 = []
        this.isShowData = false
      } else {
        this.legendDataForBar9 = ['每千老年人口养老床位数_张']
        this.legendDataForBarT5 = ['户籍老年人口数_人']
        this.legendDataForLineT5 = ['养老床位数']
        this.legendDataForBarLineT5 = ['户籍老年人口数_人', { name: '养老床位数', icon: 'line' }]
        this.isShowData = true
      }

      this.seriesAllDataForBar9.push(data0)
      this.seriesAllDataForBarT5.push(data1)
      this.seriesAllDataForLineT5.push(data2)

      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine9()
          this.barlineDrawLine5()
        }, 0)
      })
    }
  },
  created () {
    this.checkList = ['单位名称', '养老床位数', '户籍老年人口数_人', '每千老年人口养老床位数_张']
    this.checkListIng = ['单位名称', '养老床位数', '户籍老年人口数_人', '每千老年人口养老床位数_张']
    this.showYear = [
      '广东省',
      '广州市',
      '韶关市',
      '深圳市',
      '珠海市',
      '汕头市',
      '佛山市',
      '江门市',
      '湛江市',
      '茂名市',
      '肇庆市',
      '惠州市',
      '梅州市',
      '汕尾市',
      '河源市',
      '阳江市',
      '清远市',
      '东莞市',
      '中山市',
      '潮州市',
      '揭阳市',
      '云浮市'
    ]
    this.getEconomyData(this.showYear)
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barDrawLine9()
        this.barlineDrawLine5()
      }, 0)
    })

    this.initBarEchart9()
    this.initBarLineEchart5()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine9()
          this.barlineDrawLine5()
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
