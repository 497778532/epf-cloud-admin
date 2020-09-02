<template>
  <div class="page-body">
    <div class="left-top-stock">
      <div class="left-top-button-other">
        <!-- <epf-title title="存量盘活"></epf-title> -->
        <div class="left-top-button-other-title">{{ this.listTitle }}列表</div>
        <el-dropdown @command="handleCommand"
                     trigger="click"
                     style="margin-left:24px;">
          <span class="el-dropdown-link">
            {{ this.listYear }}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="2020年">2020年</el-dropdown-item>
            <el-dropdown-item command="2019年">2019年</el-dropdown-item>
            <el-dropdown-item command="2018年">2018年</el-dropdown-item>
            <el-dropdown-item command="2017年">2017年</el-dropdown-item>
            <el-dropdown-item command="2016年">2016年</el-dropdown-item>
            <el-dropdown-item command="2015年">2015年</el-dropdown-item>
            <el-dropdown-item command="2014年">2014年</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="left-top-button-other">
        <!-- <div
          class="left-top-button-tab"
          :class="{ active: currentTab === 1 }"
          @click="turnFirst"
        >
          图表模式
        </div>
        <span>丨</span>
        <div
          class="left-top-button-tab"
          :class="{ active: currentTab === 2 }"
          @click="turnSecond"
        >
          地图模式
        </div> -->
        <epf-mapview name="StockList"
                     @viewLoaded="getLoad"
                     v-show=false></epf-mapview>
        <span style="cursor: pointer;display: flex;align-items: center;"
              @click="handleClickMap">
          <i class="tb-icon"></i>地图模式
        </span>
      </div>
    </div>
    <div class="page-list-stock EPF-table"
         style="width:100%;height:100%;padding:15px;backgroundColor: #fff;">
      <!-- <div class="list-title">
        <span>{{ this.showListIndexName }}列表</span>
        <i class="el-icon-circle-close"
           @click="handleClickClose"></i>
      </div> -->
      <div class="switchHeight_box">
        <el-row style="margin:22px 0;">
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">项目编号：</span>
            <el-input v-model="filterData.projectNo"
                      size="small"
                      placeholder="请输入项目编号"
                      style="width:calc(100% - 120px);"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">项目名称：</span>
            <el-input v-model="filterData.projectName"
                      size="small"
                      placeholder="请输入项目名称"
                      style="width:calc(100% - 120px);"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">所属区域：</span>
            <el-cascader :props="props"
                         clearable
                         v-model="areaSelectedOptions"
                         @change="areaSelect()"
                         style="width:calc(100% - 120px);"></el-cascader>
          </el-col>
          <el-col :span="2">
            <div style="width:100%;height:40px;"></div>
          </el-col>
          <el-col :span="4"
                  style="display:flex;justify-content:flex-end;">
            <div class="primary_reset"
                 @click="resetFilter()">重置</div>
            <div class="primary_search"
                 @click="searchList()">查询</div>
          </el-col>
        </el-row>
      </div>
      <div class="table-box">
        <el-table :data="listData"
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:80px;"
                  border
                  @selection-change="handleSelectionChange"
                  :default-sort="{ prop: 'date', order: 'descending' }">
          <el-table-column align="center"
                           type="selection"
                           min-width="50"></el-table-column>
          <el-table-column prop="BZXMBH"
                           label="项目编号"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column prop="BZXMMC"
                           label="项目名称"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column prop="BZTBMJ"
                           label="地块面积"
                           min-width="150"
                           align="center"
                           sortable></el-table-column>
          <el-table-column prop="XZQMC"
                           label="行政区域"
                           min-width="150"
                           align="center"
                           sortable></el-table-column>
          <el-table-column prop="BZZYGDMJ"
                           label="占用耕地面积"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column label="定位"
                           min-width="150"
                           align="center">
            <template slot-scope="scope">
              <el-button @click="handleLocateClick(scope.$index)"
                         type="text"
                         size="small">定位</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="BZPZRQ"
                           label="批准时间"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column prop="BZPZWH"
                           label="批准文号"
                           min-width="150"
                           align="center"></el-table-column>
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
      </div>
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
export default {
  name: 'StockList',
  mixins: [areaSelect],
  props: {
    showListIndexMsg: {
      type: Number
    }
  },
  created () {
    this.listTitle = this.$route.query.title
    this.listYear = this.$route.query.year
    // Bus.$on('stockTableListT',val=>{
    //       console.log(val)
    //     this.listTitle = val;
    //     console.log(this.listTitle)

    //     })
    // Bus.$on('stockTableListY',val=>{
    //       console.log(val)
    //     this.listYear = val;
    //     console.log(this.listYear)
    //     })
    // const me = this
    // const objectIds = this.createObjectIds()
    // this.$parent.getDataFromGISService(objectIds).then(res => {
    //   me.gisData = res
    //   for (let i = 0; i < res.length; i++) {
    //     me.listData.push(res[i].properties)
    //   }
    // })
  },
  mounted () {
    Bus.$on('stockTableListT', val => {
      this.listTitle = val
    })
    Bus.$on('stockTableListY', val => {
      this.listYear = val
    })
  },
  data () {
    return {
      params: {
        province: '440000',
        city: '',
        area: ''
      },

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 0,
      totalRecord: 0,

      loading: false,

      filterData: {
        projectNo: '',
        projectName: ''
      },
      listData: [],

      multipleSelection: [],

      showListIndex: '',
      showListIndexName: '',

      isClose: true,
      gisData: null,

      listTitle: '',
      listYear: '',
      gisQueryData: null,
      layerUrl: 'http://19.15.73.111/arcgisserver12/rest/services/存量用地/PTBBZ_2014/MapServer'
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    getLoad () {
      const me = this
      const objectIds = this.createObjectIds()
      this.getDataFromGISService(objectIds).then(res => {
        me.gisData = res
        for (let i = 0; i < res.length; i++) {
          me.listData.push(res[i].properties)
        }
      })
    },
    getDataFromGISService (objectIds) {
      const me = this
      const mapApp = this.$findMapApp('StockList')
      if (!mapApp) return
      return new Promise(resolve => {
        mapApp.getQueryResult(this.layerUrl + '/0/query', null, [{ key: 'objectIds', val: objectIds }]).then(res => {
          console.log('resstocklist')
          me.totalRecord = 4129
          me.totalPage = Math.ceil((me.totalRecord * 1) / (me.pageSize * 1))
          if (!me.gisQueryData) {
            me.gisQueryData = res.data
          } else {
            me.gisQueryData.features = [...me.gisQueryData.features, ...res.data.features]
          }
          me.features = me.$cloneDeep(res.data.features)
          resolve(me.features)
        })
      })
    },
    handleLocateClick (index) {
      this.$parent.currentTab = 2
      this.$parent.showGeometry(this.gisData[index])
    },
    createObjectIds () {
      let objectIds = ''
      for (
        let i = (this.pageNo - 1) * this.pageSize + 1;
        i <= this.pageNo * this.pageSize;
        i++
      ) {
        objectIds += i + ','
      }
      objectIds = objectIds.substring(0, objectIds.length - 1)
      return objectIds
    },
    handleClickClose () {
      this.isClose = false
      this.$emit('showInfo', this.isClose)
    },
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
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    getIndexData () { },
    resetFilter () { },
    searchList () { },
    pushDataList () {
      const me = this
      const objectIds = this.createObjectIds()
      this.getDataFromGISService(objectIds).then(res => {
        me.gisData = res
        me.listData = []
        for (let i = 0; i < res.length; i++) {
          me.listData.push(res[i].properties)
        }
      })
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getIndexData()
      this.pushDataList()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getIndexData()
      this.pushDataList()
    },
    handleCommand (command) {
      this.listYear = command
    },
    handleClickMap () {
      let title = '存量盘活地图模式'
      let routerPath = 'IconModeBase'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        name: 'IconModeBase',
        params: {
          year: this.listYear.substring(0, 4)
        }
      })
    }
  },
  watch: {
    // $route(to, from) {
    //   this.listTitle = this.$route.query.title;
    //   this.listYear = this.$route.query.year;
    // },
    // showListIndexMsg: {
    //   immediate: true,
    //   deep: true,
    //   handler(val) {
    //     this.showListIndex = val;
    //     console.log(val);
    //     console.log(this.showListIndex);
    //     if (val == 0) {
    //       this.showListIndexName = "批而未征";
    //     } else if (val == 1) {
    //       this.showListIndexName = "征而未供";
    //     } else if (val == 2) {
    //       this.showListIndexName = "闲置土地";
    //     }
    //   }
    // }
  }
}
</script>
<style scoped>
.page-body {
  width: 100%;
  min-height: 821px;
  height: auto;
  padding: 16px 24px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.left-top-stock {
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  border-bottom: 1px solid #d9d9d9;
}
.left-top-button-other {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left-top-button-other-title {
  font-size: 18px;
  color: #232323;
  font-weight: bolder;
}
.el-dropdown-link {
  cursor: pointer;
  color: #7c8196;
  font-size: 16px;
}
.el-icon-caret-bottom {
  font-size: 18px;
}
.tb-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("../../../../assets/images/jcpgyj/project/tubiao.png");
  background-size: 24px 24px;
  margin: 0px 5px;
}
.page-list-stock {
  width: 100% !important;
  height: calc(100% - 40px) !important;
  background-color: #fff !important;
  padding: 0px 16px 16px !important;
}
.list-title {
  font-size: 18px;
  height: 35px;
  line-height: 35px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-icon-circle-close {
  font-size: 30px;
  cursor: pointer;
}
.switchHeight_box {
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.filter_title_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.filter_title__custom {
  box-sizing: border-box;
  width: 90px;
  min-width: 90px;
  max-width: 90px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
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
  margin-left: 16px;
  cursor: pointer;
}
.table-box {
  width: 100%;
  min-height: 648px;
}
</style>
