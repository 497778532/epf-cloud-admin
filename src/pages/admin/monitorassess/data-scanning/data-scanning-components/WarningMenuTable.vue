<template>
  <div class="page-body"
       id="binding-table-box">
    <div class="page-warning__con EPF-table"
         style="width:100%;height:100%;padding:0;backgroundColor: #fff;">
      <div class="warning-table"
           style="position: relative;">
        <!-- <div class="table-big-title">
          <div>{{ this.changeIndexTitle }}监测详情</div>
        </div> -->
        <div class="switchHeight_box__custom">
          <el-row style="margin-bottom:20px;">
            <el-col :span="2">
              <span class="filter_title">行政区域：</span>
            </el-col>
            <el-col :span="3">
              <el-cascader :props="props"
                           ref="bindingArea"
                           clearable
                           v-model="areaSelectedOptions"
                           @change="areaSelect()"
                           :placeholder="this.jilianPHolder"></el-cascader>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">区域格局：</span>
            </el-col>
            <el-col :span="3">
              <el-select v-model="gejuLabel"
                         filterable
                         placeholder="请选择区域格局"
                         @change="handleChangeGeju">
                <el-option v-for="item in gejuOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">区域划分：</span>
            </el-col>
            <el-col :span="3">
              <el-select v-model="diquLabel"
                         filterable
                         placeholder="请选择区域划分"
                         @change="handleChangeDiqu">
                <el-option v-for="item in diquOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">预警状态：</span>
            </el-col>
            <el-col :span="3">
              <el-select v-model="yujingLabel"
                         filterable
                         placeholder="请选择预警状态"
                         @change="handleChangeYujing">
                <el-option v-for="item in yujingOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2"
                    style="display:flex; justify-content: flex-end;">
              <div class="primary_reset"
                   @click="resetFilter()">重置</div>
            </el-col>
            <el-col :span="2"
                    style="display:flex; justify-content: flex-end;">
              <div class="primary_search"
                   @click="searchList()">查询</div>
            </el-col>
          </el-row>
        </div>
        <div class="mes-bottom">
          <div class="table-unit">单位：{{ this.changeIndexUnit }}</div>
          <div class="mes-bottom-right">
            <div class="checkout-box">
              <el-checkbox :indeterminate="isIndeterminate"
                           v-model="checkAll"
                           @change="handleCheckAllChange">显示全部</el-checkbox>
              <div style="margin-left: 25px;"></div>
              <el-checkbox-group v-model="checkedCities"
                                 @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities"
                             :label="city"
                             :key="city">
                  {{ city }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <el-select size="mini"
                       v-model="this.params.year"
                       filterable
                       @change="handleChangeYear"
                       style="width:100px;">
              <el-option v-for="item in yearOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item"></el-option>
            </el-select>
            <div class="primary-search-href__custom">
              <a :href="href">下载文档</a>
            </div>
          </div>
        </div>
        <el-scrollbar style="height:100%;">
          <div style="width:100%;flex:1;padding:10px 16px 0;">
            <el-table :data="indexData"
                      stripe
                      min-height="100"
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
                               align="center"></el-table-column>
              <el-table-column prop="diquName"
                               label="地区"
                               min-width="150"
                               align="center"></el-table-column>
              <el-table-column prop="planValue"
                               label="规划目标"
                               min-width="150"
                               align="center"></el-table-column>
              <el-table-column prop="indexValue"
                               label="监测值"
                               min-width="150"
                               align="center"></el-table-column>
              <el-table-column prop="difference"
                               label="差值"
                               min-width="150"
                               align="center"></el-table-column>
              <el-table-column prop="deviationRate"
                               label="偏差率"
                               min-width="150"
                               align="center"></el-table-column>
              <el-table-column prop="warnStatus"
                               label="预警状态"
                               min-width="150"
                               align="center">
                <template slot-scope="scope">
                  <span class="one-header__right EPFsuccess__custom"
                        v-if="scope.row.warnStatus == '正常'">{{ scope.row.warnStatus }}</span>
                  <span class="one-header__right EPFerror__custom"
                        v-if="scope.row.warnStatus == '预警'">{{ scope.row.warnStatus }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
        <div style="height:70px;margin:10px 0;padding:0 16px;display:flex;align-items: center; justify-content: flex-end;">
          <el-pagination background
                         layout="total, prev, pager, next,sizes,jumper"
                         :page-sizes="[5, 10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="totalRecord"
                         :current-page.sync="currentPage"
                         :page-size="pageSize"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import qs from 'qs'
// import Bus from '../../../../utils/bus'
import moment from 'moment'
const cityOptions = ['市级', '县级']
export default {
  name: 'BindingTable',
  data () {
    return {
      areaSelectedOptions: [],
      props: {
        value: 'dictKey',
        label: 'zhCn',
        checkStrictly: true,
        expandTrigger: 'hover',
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level } = node
          if (level === 0) {
            const dictionariesList = [{
              zhCn: '广东省',
              id: '440000',
              parentId: '0',
              dictKey: '440000',
              dictValue: '440000'
            }]
            return resolve(dictionariesList)
          }
          const res = await axios.get(
            `/api/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${node.data.dictKey}`
          )
          res.dictionariesList.forEach(
            item => (item.leaf = level >= 2)
          )
          return resolve(res.dictionariesList)
        }
      },

      checkAll: true,
      checkedCities: ['市级', '县级'],
      cities: cityOptions,
      isIndeterminate: false,

      href: '/api/epf-monitor-evaluation/bindIndicator/exportWarnList',

      params: {
        province: '440000',
        city: '',
        area: '',
        year: '',
        areaType: '',
        areaTypeCoupled: '',
        areaTypeEnhance: '',
        sortType: '',
        queryType: '',
        zbEnum: ''
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

      changeIndexTitle: '',
      changeIndexUnit: '',

      gejuOptions: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '珠三角核心区'
        },
        {
          value: '2',
          label: '沿海经济带'
        },
        {
          value: '3',
          label: '北部生态保护区'
        }
      ],
      gejuLabel: '全部',
      gejuValue: '0',
      diquOptions: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '珠三角'
        },
        {
          value: '2',
          label: '粤东'
        },
        {
          value: '3',
          label: '粤西'
        },
        {
          value: '4',
          label: '粤北'
        }
      ],
      diquLabel: '全部',
      diquValue: '0',
      yujingOptions: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '预警'
        },
        {
          value: '2',
          label: '正常'
        }
      ],
      yujingLabel: '全部',
      yujingValue: '0',

      yearOptions: [
        {
          value: 2020,
          label: 2020
        },
        {
          value: 2019,
          label: 2019
        },
        {
          value: 2018,
          label: 2018
        },
        {
          value: 2017,
          label: 2017
        },
        {
          value: 2016,
          label: 2016
        },
        {
          value: 2015,
          label: 2015
        }
      ],
      toCity: '',
      toCityName: '',
      toArea: '',
      toAreaName: '',
      jilianPHolder: '',
      toZbEnum: '',
      toYear: ''
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
    handleChangeGeju (val) {
      this.gejuLabel = val.label
      this.gejuValue = val.value
    },
    handleChangeDiqu (val) {
      this.diquLabel = val.label
      this.diquValue = val.value
    },
    handleChangeYujing (val) {
      this.yujingLabel = val.label
      this.yujingValue = val.value
    },
    handleChangeYear (val) {
      this.params.year = val.value
    },
    handleCheckAllChange (val) {
      if (this.params.area != '') {
        this.checkedCities = val ? cityOptions : ['县级']
      } else {
        this.checkedCities = val ? cityOptions : ['市级']
      }
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate
        = checkedCount > 0 && checkedCount < this.cities.length
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
    },
    async getIndexData () {
      this.loading = true
      let params = this.params
      params['areaTypeCoupled'] = this.gejuValue
      params['areaTypeEnhance'] = this.diquValue
      params['queryType'] = this.yujingValue
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      let res = await this.$get(
        '/epf-monitor-evaluation/bindIndicator/queryWarnList',
        params
      )
      if (res.code === 0) {
        for (var key in res.pager.results) {
          res.pager.results[key].planValue = Number(
            res.pager.results[key].planValue
          ).toFixed(2)
          res.pager.results[key].indexValue = Number(
            res.pager.results[key].indexValue
          ).toFixed(2)
          res.pager.results[key].difference = Number(
            res.pager.results[key].difference
          ).toFixed(2)
          res.pager.results[key].deviationRate = Number(
            res.pager.results[key].deviationRate
          ).toFixed(2)
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
        this.href = `/api/epf-monitor-evaluation/bindIndicator/exportWarnList?province=${this.params.province}&city=${this.params.city}&area=${this.params.area}&year=${this.params.year}&zbEnum=${this.params.zbEnum}&areaType=${this.params.areaType}&areaTypeCoupled=${this.params.areaTypeCoupled}&areaTypeEnhance=${this.params.areaTypeEnhance}&queryType=${this.params.queryType}`
      } else {
        this.loading = false
        this.$message.error(res.msg) // 失败
      }
    },
    resetFilter () {
      // this.areaSelectedOptions = ['440000']
      // this.checkedCities = ['市级', '县级']
      this.gejuValue = '0'
      this.gejuLabel = '全部'
      this.diquValue = '0'
      this.diquLabel = '全部'
      this.yujingValue = '0'
      this.yujingLabel = '全部'
      this.params = {
        province: '440000',
        city: this.toCity,
        area: this.toArea,
        year: this.toYear,
        areaTypeCoupled: this.gejuValue,
        areaTypeEnhance: this.diquValue,
        sortType: '',
        queryType: this.yujingValue
      }
      if (this.params.province !== '') {
        if (this.params.city !== '') {
          if (this.params.area !== '') {
            this.checkedCities = ['县级']
            this.params.areaType = 3
            // this.$refs['bindingArea'].placeholder = '广东省/' + this.toCityName + '/' + this.toAreaName
            this.jilianPHolder = '广东省/' + this.toCityName + '/' + this.toAreaName
            this.areaSelectedOptions = ['440000', this.params.city, this.params.area]
          } else {
            this.checkedCities = ['市级', '县级']
            this.params.areaType = 0
            this.jilianPHolder = '广东省/' + this.toCityName
            this.areaSelectedOptions = ['440000', this.params.city]
          }
        } else {
          this.checkedCities = ['市级', '县级']
          this.params.areaType = 0
          this.jilianPHolder = '广东省'
          this.areaSelectedOptions = ['440000']
        }
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
        this.params.areaTypeCoupled = this.gejuValue
        this.params.areaTypeEnhance = this.diquValue
        this.params.queryType = this.yujingValue
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
        this.params.areaTypeCoupled = this.gejuValue
        this.params.areaTypeEnhance = this.diquValue
        this.params.queryType = this.yujingValue
      } else if (this.areaSelectedOptions.length == 3) {
        this.params.areaType = 3
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = this.areaSelectedOptions[1]
        this.params.area = this.areaSelectedOptions[2]
        this.params.areaTypeCoupled = this.gejuValue
        this.params.areaTypeEnhance = this.diquValue
        this.params.queryType = this.yujingValue
      }

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getIndexData()
    }
  },
  created () {
    var toTable = JSON.parse(sessionStorage.getItem('toBindingTable'))
    this.changeIndexTitle = toTable.title
    this.changeIndexUnit = toTable.unit
    this.params.zbEnum = toTable.zbEnum
    this.params.city = toTable.city
    this.params.area = toTable.area
    this.params.year = toTable.year
    this.toCity = toTable.city
    this.toCityName = toTable.cityName
    this.toArea = toTable.area
    this.toAreaName = toTable.areaName
    this.toZbEnum = toTable.zbEnum
    this.toYear = toTable.year

    if (this.params.province !== '') {
      if (this.params.city !== '') {
        if (this.params.area !== '') {
          this.checkedCities = ['县级']
          this.params.areaType = 3
          // this.$refs['bindingArea'].placeholder = '广东省/' + this.toCityName + '/' + this.toAreaName
          this.jilianPHolder = '广东省/' + this.toCityName + '/' + this.toAreaName
          this.areaSelectedOptions = ['440000', this.params.city, this.params.area]
        } else {
          this.checkedCities = ['市级', '县级']
          this.params.areaType = 0
          this.jilianPHolder = '广东省/' + this.toCityName
          this.areaSelectedOptions = ['440000', this.params.city]
        }
      } else {
        this.checkedCities = ['市级', '县级']
        this.params.areaType = 0
        this.jilianPHolder = '广东省'
        this.areaSelectedOptions = ['440000']
      }
    }
    this.getIndexData()
  },
  watch: {
    checkedCities: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val.length == 0) {
          this.params.areaType = 0
          this.isIndeterminate = true
        } else if (val.length == 1) {
          if (val[0] == '市级') {
            this.params.areaType = 2
            this.isIndeterminate = true
          } else if (val[0] == '县级') {
            this.params.areaType = 3
            this.isIndeterminate = true
          }
        } else if (val.length == 2) {
          this.params.areaType = 0
          this.isIndeterminate = false
          this.checkAll = true
        }
        this.getIndexData()
      }
    },
    'params.year': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getIndexData()
      }
    },
    $route (to, from) {
      var toTable = JSON.parse(sessionStorage.getItem('toBindingTable'))
      this.changeIndexTitle = toTable.title
      this.changeIndexUnit = toTable.unit
      this.params.zbEnum = toTable.zbEnum
      this.params.city = toTable.city
      this.params.area = toTable.area
      this.params.year = toTable.year
      this.toCity = toTable.city
      this.toCityName = toTable.cityName
      this.toArea = toTable.area
      this.toAreaName = toTable.areaName
      this.toZbEnum = toTable.zbEnum
      this.toYear = toTable.year

      if (this.params.province !== '') {
        if (this.params.city !== '') {
          if (this.params.area !== '') {
            this.checkedCities = ['县级']
            this.params.areaType = 3
            // this.$refs['bindingArea'].placeholder = '广东省/' + this.toCityName + '/' + this.toAreaName
            this.jilianPHolder = '广东省/' + this.toCityName + '/' + this.toAreaName
            this.areaSelectedOptions = ['440000', this.params.city, this.params.area]
          } else {
            this.checkedCities = ['市级', '县级']
            this.params.areaType = 0
            this.jilianPHolder = '广东省/' + this.toCityName
            this.areaSelectedOptions = ['440000', this.params.city]
          }
        } else {
          this.checkedCities = ['市级', '县级']
          this.params.areaType = 0
          this.jilianPHolder = '广东省'
          this.areaSelectedOptions = ['440000']
        }
      }
      this.getIndexData()
    }
  }
}
</script>
<style scoped>
#binding-table-box {
  width: 100%;
  height: 100%;
  /* padding: 16px 24px; */
  /* background-color: #f7f7f7; */
  /* display: flex;
  justify-content: flex-start; */
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#binding-table-box::-webkit-scrollbar {
  display: none;
}
.page-warning__con {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* box-shadow: 1px 2px 5px 2px rgba(236, 236, 236, 0.5); */
  /* overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none; */
}
/* .page-warning__con::-webkit-scrollbar {
  display: none;
} */
.warning-title {
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
}
.warning-table {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.switchHeight_box {
  padding-top: 10px;
  padding-bottom: 8px;
  transition: 0.5s;
  background: #fff;
  border: 1px solid #ebeef5;
  height: 120px;
}
.switchHeight_box__custom {
  width: 100%;
  height: 90px;
  padding: 25px 16px;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-right: 10px;
  text-align: right;
  line-height: 40px;
  font-size: 16px;
}
.primary_search {
  width: 88px;
  height: 40px;
  background-color: #1b74ee;
  border-radius: 2px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  margin-left: 0px;
}
.primary_reset {
  width: 88px;
  height: 40px;
  border-radius: 2px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  /* border: 1px solid #d3d4d6; */
  color: #1b74ee;
  background-color: #e9f3ff;
  margin-left: 0px;
}
.switchHeight-box {
  transition: 0.5s;
  background: #fff;
  border: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.switchHeight-box-left {
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
  width: 100px;
  height: 40px;
  background-color: #1e7ae5;
  border-radius: 3px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  margin-left: 60px;
}
.primary-search-href__custom a {
  font-size: 16px;
  line-height: 30px;
  display: inline-block;
  height: 30px;
  cursor: pointer;
  color: #50a5f4;
  margin-left: 30px;
}
.primary-search {
  width: 100px;
  height: 40px;
  background-color: #1e7ae5;
  border-radius: 3px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  margin-left: 30px;
}
.primary-reset {
  width: 100px;
  height: 40px;
  border-radius: 3px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #d3d4d6;
  color: #1e7ae5;
  background-color: #fff;
  margin-left: 30px;
}
.checkout-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px !important;
  font-size: 16px;
  line-height: 30px;
  margin-right: 30px;
}
.table-unit {
  font-size: 16px;
  color: #505050;
  height: 30px;
  line-height: 30px;
}
.table-msg {
  height: 40px;
  background-color: #e6f7ff;
  font-size: 14px;
  color: #303030;
  border: 1px solid #bce7ff;
  padding-left: 20px;
  display: flex;
  justify-items: flex-start;
  align-items: center;
  margin-bottom: 15px;
}
.table-msg-warn {
  color: #de7082;
  font-size: 18px;
  margin-right: 10px;
}
.table-msg-percent {
  font-size: 18px;
  margin-left: 10px;
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

.table-big-title {
  width: 100%;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  padding-left: 19px;
  font-weight: bolder;
  line-height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.mes-bottom {
  width: 100%;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mes-bottom-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.one-header__right {
  width: 56px;
  height: 24px;
  border-radius: 2px;
  padding: 2px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  margin: 0 auto;
}
.EPFsuccess__custom {
  background: #9dd31c;
  color: #fff;
}
.EPFerror__custom {
  background: #f79861;
  color: #fff;
}
</style>

<style>
.checkout-box .el-checkbox__label {
  font-size: 16px;
  color: #505050;
}
.checkout-box .el-checkbox-group {
  font-size: 16px;
  color: #505050;
  line-height: 30px;
}
.page-warning__con .el-input--suffix .el-input__inner {
  font-size: 16px;
}
</style>
