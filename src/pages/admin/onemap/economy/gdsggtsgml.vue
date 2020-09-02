<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">广东省公共图书馆目录</div>
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
                   @click="turnTable1">
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
                 style="margin-left:24px;"
                 v-if="cjActiveName === 'Chart'">
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
                 @click="searchList()"
                 v-if="cjActiveName === 'Chart'">查询</div>

            <div class="filter_title_box"
                 style="margin-left:24px;"
                 v-if="cjActiveName === 'Table'">
              <span class="filter_title__custom">区域选择：</span>

              <el-select v-model="quyuName"
                         style="width:100%;"
                         @change="quyuSelect">
                <el-option v-for="item in quyuList"
                           :key="item.value"
                           :label="item.label"
                           :value="item"></el-option>
              </el-select>

            </div>
            <div class="primary_search"
                 @click="searchList1()"
                 v-if="cjActiveName === 'Table'">查询</div>
            <div class="flex-box"
                 v-if="cjActiveName === 'Table'">
              <div class="primary_export"><span @click="exportList()">导出excel</span></div>
            </div>
          </div>
        </div>

        <div class="checkout-big-box"
             style="margin-bottom:16px;"
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

        <!-- <div class="unitTipTable-nature"
             v-if="cjActiveName === 'Table'">
          单位：亿人公里
        </div> -->
        <div v-if="cjActiveName === 'Table'">
          <el-table :data="listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    stripe
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border>
            <el-table-column prop="QY"
                             label="区域"
                             min-width="100"
                             align="center"></el-table-column>
            <el-table-column prop="TSG"
                             label="图书馆"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('图书馆')">
              <template slot-scope="scope">
                <span v-if="scope.row.TSG===''">- -</span>
                <span v-else>{{scope.row.TSG}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="DZ"
                             label="地址"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('地址')">
              <template slot-scope="scope">
                <span v-if="scope.row.DZ===''">- -</span>
                <span v-else>{{scope.row.DZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YB"
                             label="邮编"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('邮编')">
              <template slot-scope="scope">
                <span v-if="scope.row.YB===''">- -</span>
                <span v-else>{{scope.row.YB}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QH"
                             label="区号"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('区号')">
              <template slot-scope="scope">
                <span v-if="scope.row.QH===''">- -</span>
                <span v-else>{{scope.row.QH}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GBDH"
                             label="馆办电话"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('馆办电话')">
              <template slot-scope="scope">
                <span v-if="scope.row.GBDH===''">- -</span>
                <span v-else>{{scope.row.GBDH}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CZDH"
                             label="传真电话"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('传真电话')">
              <template slot-scope="scope">
                <span v-if="scope.row.CZDH===''">- -</span>
                <span v-else>{{scope.row.CZDH}}</span>
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

      quyuName: '广东省',
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
      checkDisList: ['区域'], // 默认+判断禁用内容
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
        }, 0)
      })
    },
    turnTable1 () {
      this.cjActiveName = 'Table'
      this.handleCheckedTypesChange()
      this.getTableData()
    },
    quyuSelect (val) {
      this.quyuName = val.label
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

      this.getEconomyData()
    },
    searchList1 () {
      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getTableData()
    },
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['区域', '图书馆', '地址', '邮编', '区号', '馆办电话', '传真电话']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['QY', 'TSG', 'DZ', 'YB', 'QH', 'GBDH', 'CZDH']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '广东省公共图书馆目录')
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
        this.checkDisList.unshift('区域')
      } else {
        this.checkDisList = ['区域']
      }
    },
    handleCheckedTypesCancelChange () {
      this.checkDisList = ['区域']
      this.checkListIng = ['区域']
    },
    async getEconomyData () {
      this.loading = true
      this.xzhouData = []
      this.seriesAllDataForBar9 = []

      let params = this.params
      let res = await this.$post('/epf-third-part/threebatch/GDSGGTSGMLB', params)
      if (res.code === 0) {
        // 把广东省放在最前面
        let obj = {}
        for (let i = 0; i < res.result.length; i++) {
          if (res.result[i].DSMC === '广东省') {
            obj = res.result[i]
            res.result.splice(i, 1)
            break
          }
        }
        res.result.unshift(obj)

        let chartData = res.result

        this.loading = false
        this.xzhouData = [] // x轴数据
        this.legendDataForBar9 = [] // 图例数据

        // 展示的数据
        let data0 = []

        for (var key in chartData) {
          data0.push(Number(chartData[key].count).toFixed(2))//	个数

          this.xzhouData.push(chartData[key].DSMC)// x轴数据
        }

        if (this.xzhouData.length === 0) {
          this.legendDataForBar9 = []
          this.isShowData = false
        } else {
          this.legendDataForBar9 = ['图书馆']
          this.isShowData = true
        }

        this.seriesAllDataForBar9.push(data0)

        this.$nextTick(function () {
          setTimeout(() => {
            this.barDrawLine9()
          }, 0)
        })
      } else {
        this.loading = false
        this.isShowData = false
        this.$message.error(res.msg)
        return
      }
    },
    async getTableData () {
      this.loading = true

      let res = await this.$post(`/epf-third-part/twoBatch/GDSGGTSGML?QY=${this.quyuName}`)
      if (res.code === 0) {
        let tableData = res.result

        this.loading = false
        this.listData = tableData
      } else {
        this.loading = false
        this.listData = []
        this.$message.error(res.msg)
        return
      }
    }
  },
  created () {
    this.getEconomyData()
    this.checkList = ['区域', '图书馆', '地址', '邮编', '区号', '馆办电话', '传真电话']
    this.checkListIng = ['区域', '图书馆', '地址', '邮编', '区号', '馆办电话', '传真电话']
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barDrawLine9()
      }, 0)
    })

    this.initBarEchart9()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine9()
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
