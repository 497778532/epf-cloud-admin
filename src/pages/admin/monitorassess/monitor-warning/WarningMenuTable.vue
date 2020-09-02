<template>
  <div class="page-warning EPF-table">
    <div class="warning-title">
      <div class="warning-title-left">{{this.pageTitle}}</div>
      <div class="warning-title-right"
           @click="handleClickGoBack()">返回</div>
    </div>
    <div class="warning-table">
      <div class="switchHeight-box">
        <div class="switchHeight-box-left">
          <span class="filter-title">行政区域：</span>
          <el-cascader style="width:300px;"
                       :props="props"
                       clearable
                       v-model="areaSelectedOptions"
                       @change="areaSelect()"></el-cascader>
          <div class="primary_reset"
               @click="resetFilter()">重置</div>
          <div class="primary_search"
               @click="searchList()">查询</div>
          <div class="checkout-box1">
            <el-checkbox :indeterminate="isIndeterminate"
                         v-model="checkAll"
                         @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin-left: 24px;"></div>
            <el-checkbox-group v-model="checkedCities"
                               @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities"
                           :label="city"
                           :key="city">
                {{
                city
                }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="primary-search-href">
          <a :href="href">导出表单</a>
        </div>
      </div>
      <!-- <div class="table-unit">单位：{{ this.pageUnit }}</div> -->
      <div class="table-msg"
           v-if="this.params.city==''&&this.params.area==''">
        <span class="table-msg-warn">{{ this.shiWarnData }}</span>个城市预警，占所有城市的
        <span class="table-msg-percent">{{ this.shiRateData }}%</span>；
        <span class="table-msg-warn">{{ this.xianWarnData }}</span>个区县预警，占所有城市的
        <span class="table-msg-percent">{{ this.xianRateData }}%</span>；
      </div>
      <div class="table-msg"
           v-if="this.params.city!=''&&this.params.area==''">
        <span class="table-msg-warn">{{ this.xianWarnData }}</span>个区县预警，占所有城市的
        <span class="table-msg-percent">{{ this.xianRateData }}%</span>；
      </div>
      <el-tabs>
        <el-table :data="indexData"
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:80px;"
                  border
                  @selection-change="handleSelectionChange"
                  :default-sort="{ prop: 'date', order: 'descending' }">
          <!-- <el-table-column align="center" type="selection" min-width="50"></el-table-column> -->
          <el-table-column label="序号"
                           min-width="100"
                           align="center">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="diquIdCode"
                           label="行政区代码"
                           min-width="150"
                           align="center"
                           sortable></el-table-column>
          <el-table-column prop="diquName"
                           label="地区"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column prop="planValue"
                           label="规划目标"
                           min-width="150"
                           align="center"
                           sortable></el-table-column>
          <el-table-column prop="indexValue"
                           label="监测值"
                           min-width="150"
                           align="center"
                           sortable></el-table-column>
          <el-table-column prop="difference"
                           label="差值"
                           min-width="150"
                           align="center"
                           sortable></el-table-column>
          <el-table-column prop="deviationRate"
                           label="偏差率"
                           min-width="150"
                           align="center"
                           sortable></el-table-column>
          <el-table-column prop="warnStatus"
                           label="预警状态"
                           min-width="150"
                           align="center">
            <template slot-scope="scope">
              <span class="yes-warn-icon">{{scope.row.warnStatus}}</span>
              <!-- <span class="no-warn-icon" v-if="scope.row.isWarn == 1">正常</span> -->
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination background
                         layout="total, prev, pager, next,sizes,jumper"
                         :page-sizes="[5, 10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="totalRecord"
                         :current-page.sync="currentPage"
                         :page-size="pageSize"></el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import qs from 'qs'
import Bus from '../../../../utils/bus'
import moment from 'moment'
import areaSelect from '../../../../assets/js/areaCascader'
const cityOptions = ['市级', '县级']
export default {
  name: 'WarningMenuTable',
  mixins: [areaSelect],
  data () {
    return {
      pageTitle: '',
      pageUnit: '',
      pageAreasSelect: '',
      pageZbEnum: '',
      menuType: {},
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,

      href: '/api/epf-monitor-evaluation/earlyWarn/warnList/exportList',

      params: {
        province: '440000',
        city: '',
        area: '',
        year: moment().year(),
        zbEnum: '',
        areaType: ''
      },

      indexData: [],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: false,

      multipleSelection: [],

      shiRateData: '',
      shiAllData: '',
      shiWarnData: '',
      xianRateData: '',
      xianAllData: '',
      xianWarnData: ''
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    areaSelect () {
      if (this.areaSelectedOptions.length == 1) {
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = ''
        this.params.area = ''
      } else if (this.areaSelectedOptions.length == 2) {
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = this.areaSelectedOptions[1]
        this.params.area = ''
      } else if (this.areaSelectedOptions.length == 3) {
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = this.areaSelectedOptions[1]
        this.params.area = this.areaSelectedOptions[2]
      }
    },
    handleClickGoBack () {
      let title = '预警管理'
      let routerPath = 'WarningManage'
      this.$bus.$emit('closeTabsItem', this.$route.name)
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
      console.log(this.checkedCities)
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate
        = checkedCount > 0 && checkedCount < this.cities.length
      console.log(this.checkedCities)
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getIndexData()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getIndexData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    async getIndexData () {
      this.loading = true
      let params = this.params
      params['zbEnum'] = this.pageZbEnum
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      let res = await this.$get(
        '/epf-monitor-evaluation/earlyWarn/warnList/queryList',
        params
      )
      if (res.code === 0) {
        for (var key in res.pager.results) {
          res.pager.results[key].planValue = Number(res.pager.results[key].planValue).toFixed(2)
          res.pager.results[key].indexValue = Number(res.pager.results[key].indexValue).toFixed(2)
          res.pager.results[key].difference = Number(res.pager.results[key].difference).toFixed(2)
          res.pager.results[key].deviationRate = Number(res.pager.results[key].deviationRate).toFixed(2)
        }
        this.indexData = res.pager.results
        for (var key in this.indexData) {
          if (this.indexData[key].dictTranslate.provinceName != null) {
            if (this.indexData[key].dictTranslate.cityName != null) {
              if (this.indexData[key].dictTranslate.areaName != null) {
                let index = key
                this.indexData[index]['diquName'] = this.indexData[
                  index
                ].dictTranslate.areaName
              } else {
                let index = key
                this.indexData[index]['diquName'] = this.indexData[
                  index
                ].dictTranslate.cityName
              }
            } else {
              let index = key
              this.indexData[index]['diquName'] = this.indexData[
                index
              ].dictTranslate.provinceName
            }
          }

          if (this.indexData[key].province != null) {
            if (this.indexData[key].city != null) {
              if (this.indexData[key].area != null) {
                let index = key
                this.indexData[index]['diquIdCode'] = this.indexData[
                  index
                ].area
              } else {
                let index = key
                this.indexData[index]['diquIdCode'] = this.indexData[
                  index
                ].city
              }
            } else {
              let index = key
              this.indexData[index]['diquIdCode'] = this.indexData[
                index
              ].province
            }
          }
        }
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.loading = false
        this.href = `/api/epf-monitor-evaluation/earlyWarn/warnList/exportList?province=${this.params.province}&city=${this.params.city}&area=${this.params.area}&year=${this.params.year}&zbEnum=${this.pageZbEnum}&areaType=${this.params.areaType}`
        console.log(this.href)
      } else {
        this.loading = false
        this.$message.error(res.msg) // 失败
      }
    },
    async getShiMonitorMessage () {
      let res = await this.$get(
        `/epf-monitor-evaluation/earlyWarn/overview/queryAreaMap?province=${this.params.province}&city=${this.params.city}&area=${this.params.area}&year=${this.params.year}&zbEnum=${this.pageZbEnum}&areaType=2`
      )
      if (res.code === 0) {
        this.shiRateData = Number(res.sum.rate).toFixed(2)
        this.shiAllData = res.sum.all
        this.shiWarnData = res.sum.warn
      } else {
        this.$message.error(res.msg) // 失败
      }
    },
    async getXianMonitorMessage () {
      let res = await this.$get(
        `/epf-monitor-evaluation/earlyWarn/overview/queryAreaMap?province=${this.params.province}&city=${this.params.city}&area=${this.params.area}&year=${this.params.year}&zbEnum=${this.pageZbEnum}&areaType=3`
      )
      if (res.code === 0) {
        this.xianRateData = Number(res.sum.rate).toFixed(2)
        this.xianAllData = res.sum.all
        this.xianWarnData = res.sum.warn
      } else {
        this.$message.error(res.msg) // 失败
      }
    },
    resetFilter () {
      this.areaSelectedOptions = ['440000']
      this.checkedCities = []
      this.params = {
        province: '440000',
        city: '',
        area: '',
        year: moment().year(),
        zbEnum: this.pageZbEnum,
        areaType: 0
      }
      this.getIndexData()
    },
    searchList () {
      if (this.areaSelectedOptions.length == 1) {
        if (this.checkedCities.length == 0) {
          this.params.areaType = 0
        } else if (this.checkedCities.length == 1) {
          if (this.checkedCities[0] == '市级') {
            this.params.areaType = 2
          } else if (this.checkedCities[0] == '县级') {
            this.params.areaType = 3
          }
        } else if (this.checkedCities.length == 2) {
          this.params.areaType = 0
        }

        this.params.province = this.areaSelectedOptions[0]
        this.params.city = ''
        this.params.area = ''
      } else if (this.areaSelectedOptions.length == 2) {
        if (this.checkedCities.length == 0) {
          this.params.areaType = 0
        } else if (this.checkedCities.length == 1) {
          if (this.checkedCities[0] == '市级') {
            this.params.areaType = 1
          } else if (this.checkedCities[0] == '县级') {
            this.params.areaType = 3
          }
        } else if (this.checkedCities.length == 2) {
          this.params.areaType = 0
        }

        this.params.province = this.areaSelectedOptions[0]
        this.params.city = this.areaSelectedOptions[1]
        this.params.area = ''
      } else if (this.areaSelectedOptions.length == 3) {
        this.params.areaType = 3
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = this.areaSelectedOptions[1]
        this.params.area = this.areaSelectedOptions[2]
      }

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getIndexData()
    }
  },
  created () {
    this.pageTitle = this.$route.query.menuTypeName
    this.pageUnit = this.$route.query.menuTypeUnit
    this.pageAreasSelect = this.$route.params.areasType
    this.pageZbEnum = this.$route.query.zbEnum
    this.params.city = this.$route.params.city
    this.params.area = this.$route.params.area

    this.params.areaType = 0

    //     if(this.params.city!=''&&this.params.area!=''){
    // // this.params.areaType = 3;

    //     }else if(this.params.city!=''&&this.params.area==''){
    // // this.params.areaType = 2;

    //     }else if(this.params.city==''&&this.params.area==''){
    // // this.params.areaType = 0;

    //     }

    if (this.pageAreasSelect == undefined) return
    if (this.pageAreasSelect == '市级') {
      this.checkedCities = ['市级']
    } else if (this.pageAreasSelect == '县级') {
      this.checkedCities = ['县级']
    }
  },
  mounted () {
    this.getIndexData()
  },
  watch: {
    $route (to, from) {
      this.pageTitle = this.$route.query.menuTypeName
      this.pageUnit = this.$route.query.menuTypeUnit
      this.pageAreasSelect = this.$route.params.areasType
      this.pageZbEnum = this.$route.query.zbEnum
      if (this.pageAreasSelect == undefined) return
      if (this.pageAreasSelect == '市级') {
        this.checkedCities = ['市级']
      } else if (this.pageAreasSelect == '县级') {
        this.checkedCities = ['县级']
      }
      if (this.pageZbEnum) {
        this.getIndexData()
      }
    },
    params: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val.city == '' && val.area == '') {
          this.getShiMonitorMessage()
          this.getXianMonitorMessage()
        } else if (val.city != '' && val.area == '') {
          this.getXianMonitorMessage()
        }
      }
    },
    checkedCities: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val.length == 0) {
          this.params.areaType = 0
        } else if (val.length == 1) {
          if (val[0] == '市级') {
            this.params.areaType = 2
          } else if (val[0] == '县级') {
            this.params.areaType = 3
          }
        } else if (val.length == 2) {
          this.params.areaType = 0
        }
        console.log(this.params.areaType)
      }
    }
  }
}
</script>
<style scoped>
.page-warning {
  width: 100%;
  min-height: 821px;
  height: auto;
  background-color: #f7f7f7;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 1px 2px 5px 2px rgba(236, 236, 236, 0.5);
}
.warning-title {
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 2px solid #f0f2f5;
}
.warning-title-left {
  font-size: 18px;
  font-family: MicrosoftYaHeiSemibold;
  color: rgba(32, 32, 32, 1);
  line-height: 40px;
  font-weight: bold;
}
.warning-title-right {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(124, 129, 150, 1);
  line-height: 40px;
  cursor: pointer;
}
.warning-table {
  width: 100%;
  min-height: 749px;
  background-color: #fff;
  padding: 0px 16px;
}
.switchHeight-box {
  height: 88px;
  transition: 0.5s;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.switchHeight-box-left {
  height: 88px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
}
.primary-search-other {
  width: 50px;
  height: 32px;
  background-color: #1e7ae5;
  border-radius: 3px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 32px;
  display: inline-block;
  cursor: pointer;
}
.primary-search-href a {
  height: 40px;
  font-size: 16px;
  color: #50a5f4;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  margin-left: 24px;
}
.primary_search {
  width: 96px;
  height: 40px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.primary_reset {
  width: 96px;
  height: 40px;
  background: rgba(233, 243, 255, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 24px;
  cursor: pointer;
}
.checkout-box1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 24px;
}
.table-unit {
  font-size: 14px;
  color: #303030;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 15px 0;
  padding-right: 20px;
}
.table-msg {
  height: 40px;
  background: rgba(232, 248, 255, 1);
  border: 1px solid rgba(168, 222, 255, 1);
  font-size: 16px;
  color: #464646;
  padding-left: 16px;
  display: flex;
  justify-items: flex-start;
  align-items: center;
  margin-bottom: 16px;
}
.table-msg-warn {
  color: #f56259;
  font-size: 18px;
}
.table-msg-percent {
  font-size: 16px;
}
.yes-warn-icon:before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: #f04134;
  display: inline-block;
  margin-right: 10px;
}
.no-warn-icon:before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: #70b603;
  display: inline-block;
  margin-right: 10px;
}
@media screen and (max-width: 1599px) {
  .page-warning {
    height: 772px;
  }
}
</style>
