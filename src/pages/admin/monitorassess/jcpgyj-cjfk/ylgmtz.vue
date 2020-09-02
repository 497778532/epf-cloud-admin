<template>
  <div class="page-body EPF-table"
       id="dtIndexBox">
    <div class="indexTitleBox">
      <div class="indexCheck">
        <el-cascader size="small"
                     style="margin:0 20px;width:220px;"
                     :props="props"
                     clearable
                     v-model="areaSelectedOptions"
                     @change="areaSelect()"></el-cascader>
        <el-select v-model="unitsVal"
                   placeholder="全部"
                   size="small"
                   style="margin-right:20px;width:100px;"
                   @change="unitNameSelect()"
                   v-if="this.jcpgyjindex!=1">
          <el-option v-for="item in units"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <el-select v-model="danweiVal"
                   placeholder="全部"
                   size="small"
                   style="margin-right:20px;width:100px;height:40px"
                   @change="unitNameSelect2()"
                   v-if="this.jcpgyjindex==1">
          <el-option label="万公顷"
                     value="1"></el-option>
          <el-option label="万亩"
                     value="2"></el-option>
        </el-select>
        <el-button type="primary"
                   size="small"
                   style="margin-right:10px;width:100px;height:40px"
                   @click="handleDownloadTemplateClick">下载模板</el-button>
        <el-upload :action="uploadUrls[jcpgyjindex]"
                   :before-upload="beforeUpload"
                   :http-request="annexUpload"
                   :on-success="uploadSuccess"
                   :on-error="uploadError"
                   :on-change="changeFile"
                   :show-file-list="false"
                   accept=".xlsx, .xls, .csv"
                   style="display:inline-block;">
          <el-button type="primary"
                     size="small"
                     style="margin-right:10px;width:100px;height:40px">导入台账</el-button>
        </el-upload>

        <!-- <el-select v-model="selectscopeVal" placeholder="前五">
              <el-option
                v-for="item in selectscope"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
        </el-select>-->
      </div>
      <div class="indexImage">
        <img :src="this.current==0?require('@/assets/images/jcpgyj/index01.png'):require('@/assets/images/jcpgyj/index0101.png')"
             alt
             style="width:46px;height:36px;margin-right:20px;cursor:pointer;"
             @click="getTableData" />
        <img :src="this.current==1?require('@/assets/images/jcpgyj/index0202.png'):require('@/assets/images/jcpgyj/index02.png')"
             alt
             style="width:42px;height:36px;cursor:pointer;"
             @click="getChartData" />
      </div>
    </div>

    <div class="filterWrap">
      <!-- 左边部分 -->
      <div class="filter_wrap"
           id="filter_wrap0">
        <div style="width:100%;height:90%;"
             v-show="this.current==0">
          <div class="unitTip"
               v-if="this.jcpgyjindex!=1">{{this.unitName}}</div>
          <div class="unitTip"
               v-if="this.jcpgyjindex==1">{{this.unitName2}}</div>
          <!-- 预留规模台账 -->
          <el-table key="table0"
                    :data="ylgmtzList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    max-height="500"
                    style="width: 100%;min-height:80px;"
                    border
                    v-if="this.jcpgyjindex==0">
            <el-table-column label="序号"
                             min-width="100px"
                             align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="city"
                             label="市"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">{{scope.row.dictTranslate.cityName}}</template>
            </el-table-column>
            <el-table-column prop="area"
                             label="县"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">{{scope.row.dictTranslate.areaName}}</template>
            </el-table-column>
            <el-table-column prop="databaseCode"
                             label="数据库编码"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="overallScope"
                             label="预留城乡总规模"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="changedAmount"
                             label="已变更"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="beforeChangeAmount"
                             label="预变更"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="surplusAmount"
                             label="剩余"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="beforeSurplusAmount"
                             label="剩余（包含预变更）"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="implementationProjects"
                             label="落实项目"
                             min-width="500"
                             align="center"></el-table-column>
            <el-table-column prop="useArea"
                             label="使用面积"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="registerDate"
                             label="登记日期"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="registerType"
                             label="登记类型"
                             min-width="140"
                             align="center"></el-table-column>
          </el-table>
          <!-- 拆旧复垦指标调整汇总 -->
          <el-table key="table1"
                    :data="ylgmtzList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    max-height="500"
                    style="width: 100%;min-height:80px;"
                    border
                    v-if="this.jcpgyjindex==1">
            <el-table-column prop="city"
                             label="规划指标行政区划"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">{{scope.row.cityName}}</template>
            </el-table-column>

            <el-table-column label="耕地保有量"
                             align="center">
              <el-table-column prop="cultivatedLandBefore"
                               label="原规划指标"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="cultivatedLandNow"
                               label="2018年现状"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="cultivatedLandAfter"
                               label="调整后指标"
                               min-width="140"
                               align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="基本农田保护面积"
                             align="center">
              <el-table-column prop="farmLandBefore"
                               label="原规划指标"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="farmLandNow"
                               label="2014年现状"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="farmLandAfter"
                               label="调整后指标"
                               min-width="140"
                               align="center"></el-table-column>
            </el-table-column>

            <el-table-column prop="reclaim"
                             label="复垦区面积"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="baseChange"
                             label="基数转换面积"
                             min-width="140"
                             align="center"></el-table-column>

            <el-table-column label="建设用地总规模"
                             align="center">
              <el-table-column prop="bildLandBefore"
                               label="原规划指标"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="bildLandNow"
                               label="2018年现状"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="bildLandAfter"
                               label="调整后指标"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="bildLandSupScaleOne"
                               label="剩余规模1（含复垦区）"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="bildLandSupScaleTwo"
                               label="剩余规模2（含复垦区和基数转换面积）"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="bildLandSupScaleThree"
                               label="实际剩余规模（规划指标-现状面积）"
                               min-width="140"
                               align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="城乡建设用地规模"
                             align="center">
              <el-table-column prop="cityBildLandBefore"
                               label="原规划指标"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="cityBildLandNow"
                               label="2018年现状"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="cityBildLandAfter"
                               label="调整后指标"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="suplusScale"
                               label="预留规模"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="changedScaleTwo"
                               label="剩余规模（含复垦区）"
                               min-width="140"
                               align="center"></el-table-column>
              <el-table-column prop="changedScaleOne"
                               label="实际剩余规模（规划指标-现状面积）"
                               min-width="140"
                               align="center"></el-table-column>
            </el-table-column>
          </el-table>
          <!-- 纳入城乡建设用地预留规模需回填复垦区 -->
          <el-table key="table2"
                    :data="ylgmtzList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    max-height="500"
                    style="width: 100%;min-height:80px;"
                    border
                    v-if="this.jcpgyjindex==2">
            <el-table-column label="序号"
                             min-width="100px"
                             align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="city"
                             label="市"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">{{scope.row.cityName}}</template>
            </el-table-column>
            <el-table-column prop="area"
                             label="县"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">{{scope.row.areaName}}</template>
            </el-table-column>
            <el-table-column prop="cityBildScale"
                             label="纳入城乡建设规模"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="breakthroughScale"
                             label="现状已突破规模"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="nowScale"
                             label="现状城乡建设用地"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="planScale"
                             label="规划城乡建设用地规模"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="backFillScale"
                             label="需回填复垦区面积不低于"
                             min-width="180"
                             align="center"></el-table-column>
          </el-table>
          <!-- 纳入城乡建设用地预留规模 -->
          <el-table key="table3"
                    :data="ylgmtzList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    max-height="500"
                    style="width: 100%;min-height:80px;"
                    border
                    :summary-method="getSummaries"
                    show-summary
                    v-if="this.jcpgyjindex==3">
            <el-table-column label="序号"
                             min-width="100px"
                             align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="city"
                             label="所在地市"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">{{scope.row.dictTranslate.cityName}}</template>
            </el-table-column>
            <el-table-column prop="area"
                             label="所在县区"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">{{scope.row.dictTranslate.areaName}}</template>
            </el-table-column>
            <el-table-column prop="areaReturn"
                             label="来源于县级返还"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="provinceReturn"
                             label="来源于省级收回"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="total"
                             label="合计"
                             min-width="140"
                             align="center"></el-table-column>
          </el-table>
          <!-- 已验收拆旧复垦项目纳入城乡建设用地 -->
          <el-table key="table4"
                    :data="ylgmtzList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    max-height="500"
                    style="width: 100%;min-height:80px;"
                    border
                    v-if="this.jcpgyjindex==4">
            <el-table-column label="序号"
                             min-width="100px"
                             align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="city"
                             label="所在地市"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">{{scope.row.dictTranslate.cityName}}</template>
            </el-table-column>
            <el-table-column prop="area"
                             label="所在区县"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">{{scope.row.dictTranslate.areaName}}</template>
            </el-table-column>
            <el-table-column prop="projectKeeponNo"
                             label="项目备案号"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="projectName"
                             label="项目名称"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="agricultureArea"
                             label="复垦为农用地面积"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="totalPrice"
                             label="成交总价"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="scaleUrbanArea"
                             label="城乡建设规模"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="provinceRecovery"
                             label="省级收回"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="areaReturn"
                             label="县级返还"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="dealPeriods"
                             label="成交期数"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="isSale"
                             label="是否出售"
                             min-width="140"
                             align="center"></el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="totalRecord"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </div>
        <div style="width:100%;height:100%;"
             v-show="this.current==1">
          <!-- <div class="exchangeTable">
                <columns :option="mainChartOption" id="chart-main-cjfk" ref="mainchart"></columns>
          </div>-->
          <div id="indexChart"
               style="width:100%;height:100%;"></div>
        </div>
        <!-- <columns
          :option="timelineOption"
          id="chart-timeline-cjfk"
          width="1290px"
          height="100px"
          type="timeline"
        ></columns>-->
        <div id="chart-timeline-cjfk"
             class="chart-timebox"></div>
      </div>
      <!-- 右边部分 -->
      <div class="filterWrapRight">
        <customMenu :message="jcpgyjindex"></customMenu>
      </div>
    </div>
  </div>
</template>
<script>
import { XZQH, UNINTS, SELECT } from '../base/buttons/options'
import {
  TIMELINEOPTION,
  MAINCHARTOPTION,
  CUSTOMOPTION,
  tableData
} from '../mock'
import customMenu from '../base/jcpgyj-menu'
import columns from '../dynamic/columns'
import { mapGetters } from 'vuex'
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import qs from 'qs'
import echarts from 'echarts'
import Bus from '../../../../utils/bus'
import loadMixin from './mixins/load'
export default {
  name: 'ylgmtz',
  componentName: '预留规模台账',
  mixins: [loadMixin],
  components: {
    customMenu,
    columns
  },
  data () {
    return {
      timelineChart: null,
      arrTime: null,
      selectedYear: '2020',
      option: null,
      timelineOption: null,
      mainChartOption: {},
      xzqh: null,
      units: null,
      selectscope: null,
      xzqhVal: '',
      unitsVal: 'HECTARE',
      danweiVal: '1',
      selectscopeVal: '',
      num: 0,
      inquire: '',
      produImg: [
        { src: require('@/assets/icon1.png') },
        { src: require('@/assets/icon2.png') }
      ],
      tableData: null,
      serviceType: null,

      ylgmtzList: [],

      areaSelectedOptions: ['440000'],
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
      propsjs: {
        value: 'dictKey',
        label: 'zhCn',
        checkStrictly: true,
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
            item => (item.leaf = level >= 1)
          )
          return resolve(res.dictionariesList)
        }
      },

      params: {
        yeaer: '2019', // 年份
        province: '440000', // 省
        city: '', // 市
        area: '', // 区
        unit: '' // 计量单位
      },
      nextparams: {
        year: '2019', // 年份
        province: '440000', // 省
        cityx: '', // 市
        unitType: '' // 计量单位
      },
      lastparams: {
        year: '', // 年份
        province: '440000', // 省
        city: '', // 市
        area: '', // 区
        unit: '' // 计量单位
      },
      loading: false,
      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      jcpgyjindex: '',
      current: 0,
      unitName: '',
      unitName2: '',

      screenWidth: '',
      isShowMenu: ''
    }
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    window.addEventListener(
      'resize',
      () => {
        return (() => {
          this.screenWidth = document.body.clientWidth
        })()
      },
      0
    )
    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })
    this.$nextTick(function () {
      setTimeout(() => {
        this.initTimeline()
      }, 100)
    })
    if (this.current === 1) {
      this.$nextTick(function () {
        setTimeout(() => {
          this.ylgmtzDrawLine()
        }, 1000)
      })
      this.initEchart()
    }
  },
  computed: {
    ...mapGetters(['getCJFKServiceType'])
  },
  watch: {
    getCJFKServiceType: {
      immediate: true,
      handler: function (state) {
        this.serviceType = state
      }
    },

    unitsVal (val) {
      this.getYlgmtzList()
      this.ylgmtzDrawLine()
    },
    danweiVal (val) {
      this.getYlgmtzList()
      this.ylgmtzDrawLine()
    },
    jcpgyjindex (val) {
      console.log(val)
      if (val) {
        this.current = 0
        this.areaSelectedOptions = ['440000']
        this.unitsVal = 'HECTARE'
        this.danweiVal = '1'
        this.getYlgmtzList()
      }
    },
    current (val) {
      console.log(val)
      if (val == 0) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.getYlgmtzList()
          }, 1000)
        })
      } else if (val == 1) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.ylgmtzDrawLine()
          }, 1000)
        })
        this.initEchart()
      }
    },
    'params.province': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getYlgmtzList()
        this.ylgmtzDrawLine()
      }
    },
    'params.city': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getYlgmtzList()
        this.ylgmtzDrawLine()
      }
    },
    'params.area': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getYlgmtzList()
      }
    },
    screenWidth: {
      immediate: true,
      deep: true,
      handler (val) {
        this.createTimeline()
        this.initTimeline()
      }
    },
    isShowMenu: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.createTimeline()
            this.initTimeline()
            this.ylgmtzDrawLine()
          }, 0)
        })
      }
    },
    $route (to, from) {
      let jcpgyjindex = this.$route.query.index
      this.jcpgyjindex = jcpgyjindex
      if (this.jcpgyjindex == 0) {
        let title = '预留规模台账监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=0'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 0 }
        })
        this.jcpgyjindex = 0
      } else if (this.jcpgyjindex == 1) {
        let title = '拆旧复垦指标调整汇总监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=1'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 1 }
        })
        this.jcpgyjindex = 1
      } else if (this.jcpgyjindex == 2) {
        let title = '预留规模回填复垦区监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=2'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 2 }
        })
        this.jcpgyjindex = 2
      } else if (this.jcpgyjindex == 3) {
        let title = '城乡建设用地预留规模监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=3'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 3 }
        })
        this.jcpgyjindex = 3
      } else if (this.jcpgyjindex == 4) {
        let title = '已验收拆旧复垦项目监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=4'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 4 }
        })
        this.jcpgyjindex = 4
      }
    },
    $route: function (newUrl, oldUrl) {
      if (newUrl != oldUrl) {
        this.jcpgyjindex = this.$route.query.index

        this.pageNo = 1
        this.pageSize = 5
        this.currentPage = 1

        this.params = {
          yeaer: '', // 年份
          province: '440000', // 省
          city: '', // 市
          area: '', // 区
          unit: '' // 计量单位
        }
        this.nextparams = {
          year: '', // 年份
          province: '440000', // 省
          cityx: '', // 市
          unitType: '' // 计量单位
        }
        this.lastparams = {
          year: '', // 年份
          province: '440000', // 省
          city: '', // 市
          area: '', // 区
          unit: '' // 计量单位
        }
      }
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    registerTimelineChange (chartInstance) {
      const me = this
      chartInstance.on('timelinechanged', function (timeLineIndex) {
        me.selectedYear = me.arrTime[timeLineIndex.currentIndex]
        me.getYlgmtzList()
        me.ylgmtzDrawLine()
      })
    },

    initTimeline () {
      const me = this
      setTimeout(function () {
        me.createTimeline()
      }, 10)
    },

    resetTimeLine () {
      if (this.timelineChart) {
        this.timelineChart.setOption(this.timelineOption)
      }
    },

    createTimeline () {
      if (this.timelineChart) {
        this.timelineChart.clear()
      }
      this.timelineChart = echarts.init(
        document.getElementById('chart-timeline-cjfk')
      )
      this.timelineChart.resize()
      this.timelineChart.setOption(this.timelineOption)
      this.registerTimelineChange(this.timelineChart)
    },

    getTableData () {
      this.current = 0
      this.getYlgmtzList()
    },
    getChartData () {
      this.current = 1
      this.ylgmtzDrawLine()
    },
    // 城市三级联动
    areaSelect (val) {
      this.params.province = this.areaSelectedOptions[0]
      this.params.city = this.areaSelectedOptions[1]
      this.params.area = this.areaSelectedOptions[2]

      this.nextparams.province = this.areaSelectedOptions[0]
      this.nextparams.cityx = this.areaSelectedOptions[1]

      this.lastparams.province = this.areaSelectedOptions[0]
      this.lastparams.city = this.areaSelectedOptions[1]
      this.lastparams.area = this.areaSelectedOptions[2]
    },
    unitNameSelect () {
      if (this.unitsVal == 'SQUARE_KILOMETER') {
        this.unitName = '单位：平方公里'
      } else if (this.unitsVal == 'MU') {
        this.unitName = '单位：亩'
      } else if (this.unitsVal == 'MILLION_MU') {
        this.unitName = '单位：万亩'
      } else if (this.unitsVal == 'SQUARE_METER') {
        this.unitName = '单位：平方米'
      } else if (this.unitsVal == 'HECTARE') {
        this.unitName = '单位：公顷'
      }
    },
    unitNameSelect2 () {
      if (this.danweiVal == '1') {
        this.unitName2 = '单位：万公顷'
      } else if (this.danweiVal == '2') {
        this.unitName2 = '单位：万亩'
      }
    },

    // 获取预留规模台账列表数据
    async getYlgmtzList () {
      this.loading = true
      this.jcpgyjindex = this.$route.query.index
      console.log(this.jcpgyjindex)
      if (this.jcpgyjindex == 0) {
        let params = this.params
        params['yeaer'] = this.selectedYear
        params['unit'] = this.unitsVal
        params['page'] = this.pageNo
        params['rows'] = this.pageSize
        let res = await this.$get(
          '/epf-monitor-evaluation/admin/fkScaleLedger/getList',
          params
        )
        if (res.code === 0) {
          for (var key in res.pager.results) {
            res.pager.results[key].overallScope = Number(res.pager.results[key].overallScope).toFixed(2)
            res.pager.results[key].changedAmount = Number(res.pager.results[key].changedAmount).toFixed(2)
            res.pager.results[key].beforeChangeAmount = Number(res.pager.results[key].beforeChangeAmount).toFixed(2)
            res.pager.results[key].surplusAmount = Number(res.pager.results[key].surplusAmount).toFixed(2)
            res.pager.results[key].beforeSurplusAmount = Number(res.pager.results[key].beforeSurplusAmount).toFixed(2)
            res.pager.results[key].useArea = Number(res.pager.results[key].useArea).toFixed(2)
          }
          this.ylgmtzList = res.pager.results
          this.pageNo = res.pager.pageNo
          this.pageSize = res.pager.pageSize
          this.totalPage = res.pager.totalPage
          this.totalRecord = res.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      } else if (this.jcpgyjindex == 1) {
        let params = this.nextparams
        params['year'] = this.selectedYear
        params['unitType'] = this.danweiVal
        params['page'] = this.pageNo
        params['rows'] = this.pageSize
        let res = await this.$get(
          '/epf-monitor-evaluation/dismantOldReclam/pageInfo',
          params
        )
        if (res.code === 0) {
          for (var key in res.result.pager.results) {
            res.result.pager.results[key].cultivatedLandBefore = Number(res.result.pager.results[key].cultivatedLandBefore).toFixed(2)
            res.result.pager.results[key].cultivatedLandNow = Number(res.result.pager.results[key].cultivatedLandNow).toFixed(2)
            res.result.pager.results[key].cultivatedLandAfter = Number(res.result.pager.results[key].cultivatedLandAfter).toFixed(2)

            res.result.pager.results[key].farmLandBefore = Number(res.result.pager.results[key].farmLandBefore).toFixed(2)
            res.result.pager.results[key].farmLandNow = Number(res.result.pager.results[key].farmLandNow).toFixed(2)
            res.result.pager.results[key].farmLandAfter = Number(res.result.pager.results[key].farmLandAfter).toFixed(2)

            res.result.pager.results[key].reclaim = Number(res.result.pager.results[key].reclaim).toFixed(2)
            res.result.pager.results[key].baseChange = Number(res.result.pager.results[key].baseChange).toFixed(2)

            res.result.pager.results[key].bildLandBefore = Number(res.result.pager.results[key].bildLandBefore).toFixed(2)
            res.result.pager.results[key].bildLandNow = Number(res.result.pager.results[key].bildLandNow).toFixed(2)
            res.result.pager.results[key].bildLandAfter = Number(res.result.pager.results[key].bildLandAfter).toFixed(2)

            res.result.pager.results[key].bildLandSupScaleOne = Number(res.result.pager.results[key].bildLandSupScaleOne).toFixed(2)
            res.result.pager.results[key].bildLandSupScaleTwo = Number(res.result.pager.results[key].bildLandSupScaleTwo).toFixed(2)
            res.result.pager.results[key].bildLandSupScaleThree = Number(res.result.pager.results[key].bildLandSupScaleThree).toFixed(2)

            res.result.pager.results[key].cityBildLandBefore = Number(res.result.pager.results[key].cityBildLandBefore).toFixed(2)
            res.result.pager.results[key].cityBildLandNow = Number(res.result.pager.results[key].cityBildLandNow).toFixed(2)
            res.result.pager.results[key].cityBildLandAfter = Number(res.result.pager.results[key].cityBildLandAfter).toFixed(2)

            res.result.pager.results[key].suplusScale = Number(res.result.pager.results[key].suplusScale).toFixed(2)
            res.result.pager.results[key].changedScaleTwo = Number(res.result.pager.results[key].changedScaleTwo).toFixed(2)
            res.result.pager.results[key].changedScaleOne = Number(res.result.pager.results[key].changedScaleOne).toFixed(2)
          }
          this.ylgmtzList = res.result.pager.results
          this.pageNo = res.result.pager.pageNo
          this.pageSize = res.result.pager.pageSize
          this.totalPage = res.result.pager.totalPage
          this.totalRecord = res.result.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      } else if (this.jcpgyjindex == 2) {
        let params = this.lastparams
        params['year'] = this.selectedYear
        params['unit'] = this.unitsVal
        params['page'] = this.pageNo
        params['rows'] = this.pageSize
        let res = await this.$get(
          '/epf-monitor-evaluation/bildAreaBackFill/pageInfo',
          params
        )
        if (res.code === 0) {
          for (var key in res.result.pager.results) {
            res.result.pager.results[key].cityBildScale = Number(res.result.pager.results[key].cityBildScale).toFixed(2)
            res.result.pager.results[key].breakthroughScale = Number(res.result.pager.results[key].breakthroughScale).toFixed(2)
            res.result.pager.results[key].nowScale = Number(res.result.pager.results[key].nowScale).toFixed(2)
            res.result.pager.results[key].planScale = Number(res.result.pager.results[key].planScale).toFixed(2)
            res.result.pager.results[key].backFillScale = Number(res.result.pager.results[key].backFillScale).toFixed(2)
          }
          this.ylgmtzList = res.result.pager.results
          this.pageNo = res.result.pager.pageNo
          this.pageSize = res.result.pager.pageSize
          this.totalPage = res.result.pager.totalPage
          this.totalRecord = res.result.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      } else if (this.jcpgyjindex == 3) {
        let params = this.lastparams
        params['year'] = this.selectedYear
        params['unit'] = this.unitsVal
        params['page'] = this.pageNo
        params['rows'] = this.pageSize
        let res = await this.$get(
          '/epf-monitor-evaluation/admin/fkReserveInfo/getList',
          params
        )
        if (res.code === 0) {
          for (var key in res.pager.results) {
            res.pager.results[key].areaReturn = Number(res.pager.results[key].areaReturn).toFixed(2)
            res.pager.results[key].provinceReturn = Number(res.pager.results[key].provinceReturn).toFixed(2)
            res.pager.results[key].total = Number(res.pager.results[key].total).toFixed(2)
          }
          this.ylgmtzList = res.pager.results
          this.pageNo = res.pager.pageNo
          this.pageSize = res.pager.pageSize
          this.totalPage = res.pager.totalPage
          this.totalRecord = res.pager.totalRecord
          this.areaReturn = Number(res.sum.areaReturn).toFixed(2)
          this.provinceReturn = Number(res.sum.provinceReturn).toFixed(2)
          this.total = Number(res.sum.total).toFixed(2)
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      } else if (this.jcpgyjindex == 4) {
        let params = this.lastparams
        params['year'] = this.selectedYear
        params['unit'] = this.unitsVal
        params['page'] = this.pageNo
        params['rows'] = this.pageSize
        let res = await this.$get(
          '/epf-monitor-evaluation/admin/fkAcceptedBildInfo/getList',
          params
        )
        if (res.code === 0) {
          for (var key in res.pager.results) {
            res.pager.results[key].agricultureArea = Number(res.pager.results[key].agricultureArea).toFixed(2)
            res.pager.results[key].totalPrice = Number(res.pager.results[key].totalPrice).toFixed(2)
            res.pager.results[key].scaleUrbanArea = Number(res.pager.results[key].scaleUrbanArea).toFixed(2)
            res.pager.results[key].provinceRecovery = Number(res.pager.results[key].provinceRecovery).toFixed(2)
            res.pager.results[key].areaReturn = Number(res.pager.results[key].areaReturn).toFixed(2)
          }
          this.ylgmtzList = res.pager.results
          this.pageNo = res.pager.pageNo
          this.pageSize = res.pager.pageSize
          this.totalPage = res.pager.totalPage
          this.totalRecord = res.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      }
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getYlgmtzList()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getYlgmtzList()
    },
    // 获取预留规模台账图表数据
    async ylgmtzDrawLine () {
      setTimeout(() => {
        document.getElementById('indexChart').style.width = 100 + '%'
        document.getElementById('indexChart').style.height = 100 + '%'
        let indexChart = echarts.init(document.getElementById('indexChart'))
        indexChart.resize() // 直接加这句即可
      }, 0)
      let indexChart = echarts.init(document.getElementById('indexChart'))

      this.jcpgyjindex = this.$route.query.index

      if (this.jcpgyjindex == 0) {
        let params = this.params
        params['yeaer'] = this.selectedYear
        params['unit'] = this.unitsVal
        let res = await this.$get(
          '/epf-monitor-evaluation/admin/fkScaleLedger/getChartData',
          params
        )
        console.log(res)
        let chartData = res.result

        var allData = [] // y轴数据(所有数据)

        var cityData = [] // x轴数据
        var areaData = [] // x轴数据
        var xzhouData = [] // x轴数据

        // 展示的数据
        var overallScopeData = []
        var changedAmountData = []
        var beforeChangeAmountData = []
        var surplusAmountData = []
        var beforeSurplusAmountData = []

        for (var key in chartData) {
          overallScopeData.push(Number(chartData[key].overallScope).toFixed(2))
          changedAmountData.push(Number(chartData[key].changedAmount).toFixed(2))
          beforeChangeAmountData.push(Number(chartData[key].beforeChangeAmount).toFixed(2))
          surplusAmountData.push(Number(chartData[key].surplusAmount).toFixed(2))
          beforeSurplusAmountData.push(Number(chartData[key].beforeSurplusAmount).toFixed(2))

          cityData.push(chartData[key].dictTranslate.cityName)
          areaData.push(chartData[key].dictTranslate.areaName)

          allData.push(
            Number(chartData[key].overallScope).toFixed(2),
            Number(chartData[key].changedAmount).toFixed(2),
            Number(chartData[key].beforeChangeAmount).toFixed(2),
            Number(chartData[key].surplusAmount).toFixed(2),
            Number(chartData[key].beforeSurplusAmount).toFixed(2)
          )
        }

        var maxAllData = Math.max.apply(Math, allData) // 求y轴最大值

        if (this.areaSelectedOptions.length == 1) {
          xzhouData = cityData
        }
        if (this.areaSelectedOptions.length == 2) {
          xzhouData = areaData
        }
        if (this.areaSelectedOptions.length == 3) {
          xzhouData = areaData
        }

        var legendData = [
          '预留城乡总规模',
          '已变更',
          '预变更',
          '剩余',
          '剩余（包含预变更）'
        ]
        var seriesAllData = [
          overallScopeData,
          changedAmountData,
          beforeChangeAmountData,
          surplusAmountData,
          beforeSurplusAmountData
        ]
      } else if (this.jcpgyjindex == 1) {
        let params = this.nextparams
        params['unitType'] = this.danweiVal
        let res = await this.$get(
          '/epf-monitor-evaluation/dismantOldReclam/listInfo',
          params
        )
        console.log(res)

        let chartData = res.result.list

        var allData = [] // y轴数据(所有数据)

        var cityData = [] // x轴数据
        var xzhouData = [] // x轴数据

        // 展示的数据
        var cultivatedLandBeforeData = []
        var cultivatedLandNowData = []
        var cultivatedLandAfterData = []

        var farmLandBeforeData = []
        var farmLandNowData = []
        var farmLandAfterData = []

        var reclaimData = []
        var baseChangeData = []

        var bildLandBeforeData = []
        var bildLandNowData = []
        var bildLandAfterData = []
        var bildLandSupScaleOneData = []
        var bildLandSupScaleTwoData = []
        var bildLandSupScaleThreeData = []

        var cityBildLandBeforeData = []
        var cityBildLandNowData = []
        var cityBildLandAfterData = []
        var changedScaleOneData = []
        var changedScaleTwoData = []
        var suplusScaleData = []

        for (var key in chartData) {
          cultivatedLandBeforeData.push(Number(chartData[key].cultivatedLandBefore).toFixed(2))
          cultivatedLandNowData.push(Number(chartData[key].cultivatedLandNow).toFixed(2))
          cultivatedLandAfterData.push(Number(chartData[key].cultivatedLandAfter).toFixed(2))

          farmLandBeforeData.push(Number(chartData[key].farmLandBefore).toFixed(2))
          farmLandNowData.push(Number(chartData[key].farmLandNow).toFixed(2))
          farmLandAfterData.push(Number(chartData[key].farmLandAfter).toFixed(2))

          reclaimData.push(Number(chartData[key].reclaim).toFixed(2))
          baseChangeData.push(Number(chartData[key].baseChange).toFixed(2))

          bildLandBeforeData.push(Number(chartData[key].bildLandBefore).toFixed(2))
          bildLandNowData.push(Number(chartData[key].bildLandNow).toFixed(2))
          bildLandAfterData.push(Number(chartData[key].bildLandAfter).toFixed(2))
          bildLandSupScaleOneData.push(Number(chartData[key].bildLandSupScaleOne).toFixed(2))
          bildLandSupScaleTwoData.push(Number(chartData[key].bildLandSupScaleTwo).toFixed(2))
          bildLandSupScaleThreeData.push(Number(chartData[key].bildLandSupScaleThree).toFixed(2))

          cityBildLandBeforeData.push(Number(chartData[key].cityBildLandBefore).toFixed(2))
          cityBildLandNowData.push(Number(chartData[key].cityBildLandNow).toFixed(2))
          cityBildLandAfterData.push(Number(chartData[key].cityBildLandAfter).toFixed(2))
          changedScaleOneData.push(Number(chartData[key].changedScaleOne).toFixed(2))
          changedScaleTwoData.push(Number(chartData[key].changedScaleTwo).toFixed(2))
          suplusScaleData.push(Number(chartData[key].suplusScale).toFixed(2))

          cityData.push(chartData[key].cityName)

          allData.push(
            Number(chartData[key].cultivatedLandBefore).toFixed(2),
            Number(chartData[key].cultivatedLandNow).toFixed(2),
            Number(chartData[key].cultivatedLandAfter).toFixed(2),
            Number(chartData[key].farmLandBefore).toFixed(2),
            Number(chartData[key].farmLandNow).toFixed(2),
            Number(chartData[key].farmLandAfter).toFixed(2),
            Number(chartData[key].reclaim).toFixed(2),
            Number(chartData[key].baseChange).toFixed(2),
            Number(chartData[key].bildLandBefore).toFixed(2),
            Number(chartData[key].bildLandNow).toFixed(2),
            Number(chartData[key].bildLandAfter).toFixed(2),
            Number(chartData[key].bildLandSupScaleOne).toFixed(2),
            Number(chartData[key].bildLandSupScaleTwo).toFixed(2),
            Number(chartData[key].bildLandSupScaleThree).toFixed(2),
            Number(chartData[key].cityBildLandBefore).toFixed(2),
            Number(chartData[key].cityBildLandNow).toFixed(2),
            Number(chartData[key].cityBildLandAfter).toFixed(2),
            Number(chartData[key].changedScaleOne).toFixed(2),
            Number(chartData[key].changedScaleTwo).toFixed(2),
            Number(chartData[key].suplusScale).toFixed(2)
          )
        }

        var maxAllData = Math.max.apply(Math, allData) // 求y轴最大值
        var minAllData = Math.min.apply(Math, allData) // 求y轴最小值

        xzhouData = cityData

        var legendData = [
          '耕地保有量原规划指标',
          '耕地保有量现状',
          '耕地保有量调整后指标',
          '基本农田原规划指标',
          '基本农田现状',
          '基本农田调整后指标',
          '复垦区面积',
          '基数转换面积',
          '建设用地总规模原规划指标',
          '建设用地总规模现状',
          '建设用地总规模调整后指标',
          '建设用地剩余规模（含复垦区）',
          '建设用地剩余规模（含复垦区和基数转换面积）',
          '建设用地实际剩余规模',
          '城乡建设用地原规划指标',
          '城乡建设用地现状',
          '城乡建设用地调整后指标',
          '预留规模',
          '剩余规模',
          '实际剩余规模'
        ]
        var seriesAllData = [
          cultivatedLandBeforeData,
          cultivatedLandNowData,
          cultivatedLandAfterData,
          farmLandBeforeData,
          farmLandNowData,
          farmLandAfterData,
          reclaimData,
          baseChangeData,
          bildLandBeforeData,
          bildLandNowData,
          bildLandAfterData,
          bildLandSupScaleOneData,
          bildLandSupScaleTwoData,
          bildLandSupScaleThreeData,
          cityBildLandBeforeData,
          cityBildLandNowData,
          cityBildLandAfterData,
          suplusScaleData,
          changedScaleTwoData,
          changedScaleOneData
        ]
      } else if (this.jcpgyjindex == 2) {
        let params = this.lastparams
        params['unit'] = this.unitsVal
        let res = await this.$get(
          '/epf-monitor-evaluation/bildAreaBackFill/listInfo',
          params
        )
        console.log(res)

        let chartData = res.result.list

        var allData = [] // y轴数据(所有数据)

        var cityData = [] // x轴数据
        var areaData = [] // x轴数据
        var xzhouData = [] // x轴数据

        // 展示的数据
        var cityBildScaleData = []
        var breakthroughScaleData = []
        var nowScaleData = []
        var planScaleData = []
        var backFillScaleData = []

        for (var key in chartData) {
          cityBildScaleData.push(Number(chartData[key].cityBildScale).toFixed(2))
          breakthroughScaleData.push(Number(chartData[key].breakthroughScale).toFixed(2))
          nowScaleData.push(Number(chartData[key].nowScale).toFixed(2))
          planScaleData.push(Number(chartData[key].planScale).toFixed(2))
          backFillScaleData.push(Number(chartData[key].backFillScale).toFixed(2))

          cityData.push(chartData[key].cityName)
          areaData.push(chartData[key].areaName)

          allData.push(
            Number(chartData[key].cityBildScale).toFixed(2),
            Number(chartData[key].breakthroughScale).toFixed(2),
            Number(chartData[key].nowScale).toFixed(2),
            Number(chartData[key].planScale).toFixed(2),
            Number(chartData[key].backFillScale).toFixed(2)
          )
        }

        var maxAllData = Math.max.apply(Math, allData) // 求y轴最大值

        // if (this.params.area == "") {
        //   xzhouData = cityData;
        // } else {
        //   xzhouData = areaData;
        // }
        if (this.areaSelectedOptions.length == 1) {
          xzhouData = cityData
        }
        if (this.areaSelectedOptions.length == 2) {
          xzhouData = areaData
        }
        if (this.areaSelectedOptions.length == 3) {
          xzhouData = areaData
        }

        var legendData = [
          '纳入城乡建设规模',
          '现状已突破规模',
          '现状城乡建设用地',
          '规划城乡建设用地规模',
          '需回填复垦区面积不低于'
        ]
        var seriesAllData = [
          cityBildScaleData,
          breakthroughScaleData,
          nowScaleData,
          planScaleData,
          backFillScaleData
        ]
      } else if (this.jcpgyjindex == 3) {
        let params = this.lastparams
        params['year'] = this.selectedYear
        params['unit'] = this.unitsVal
        let res = await this.$get(
          '/epf-monitor-evaluation/admin/fkReserveInfo/getChartData',
          params
        )
        console.log(res)

        let chartData = res.result

        var allData = [] // y轴数据(所有数据)

        var cityData = [] // x轴数据
        var areaData = [] // x轴数据
        var xzhouData = [] // x轴数据

        // 展示的数据
        var areaReturnData = []
        var provinceReturnData = []

        for (var key in chartData) {
          areaReturnData.push(Number(chartData[key].areaReturn).toFixed(2))
          provinceReturnData.push(Number(chartData[key].provinceReturn).toFixed(2))

          cityData.push(chartData[key].dictTranslate.cityName)
          areaData.push(chartData[key].dictTranslate.areaName)

          allData.push(
            Number(chartData[key].areaReturn).toFixed(2),
            Number(chartData[key].provinceReturn).toFixed(2)
          )
        }

        var maxAllData = Math.max.apply(Math, allData) // 求y轴最大值

        // if (this.params.area == "") {
        //   xzhouData = cityData;
        // } else {
        //   xzhouData = areaData;
        // }
        if (this.areaSelectedOptions.length == 1) {
          xzhouData = cityData
        }
        if (this.areaSelectedOptions.length == 2) {
          xzhouData = areaData
        }
        if (this.areaSelectedOptions.length == 3) {
          xzhouData = areaData
        }

        var legendData = ['来源于县级返还', '来源于省级收回']
        var seriesAllData = [areaReturnData, provinceReturnData]
      } else if (this.jcpgyjindex == 4) {
        let params = this.lastparams
        params['year'] = this.selectedYear
        params['unit'] = this.unitsVal
        let res = await this.$get(
          '/epf-monitor-evaluation/admin/fkAcceptedBildInfo/getChartData',
          params
        )
        console.log(res)

        let chartData = res.result

        var allData = [] // y轴数据(所有数据)

        var cityData = [] // x轴数据
        var areaData = [] // x轴数据
        var xzhouData = [] // x轴数据

        // 展示的数据
        var agricultureAreaData = []
        var scaleUrbanAreaData = []
        var provinceRecoveryData = []
        var areaReturnData = []
        var totalPriceData = [] // 折线

        for (var key in chartData) {
          agricultureAreaData.push(Number(chartData[key].agricultureArea).toFixed(2))
          scaleUrbanAreaData.push(Number(chartData[key].scaleUrbanArea).toFixed(2))
          provinceRecoveryData.push(Number(chartData[key].provinceRecovery).toFixed(2))
          areaReturnData.push(Number(chartData[key].areaReturn).toFixed(2))

          totalPriceData.push(Number(chartData[key].totalPrice).toFixed(2)) // 折线

          cityData.push(chartData[key].dictTranslate.cityName)
          areaData.push(chartData[key].dictTranslate.areaName)

          allData.push(
            Number(chartData[key].agricultureArea).toFixed(2),
            Number(chartData[key].scaleUrbanArea).toFixed(2),
            Number(chartData[key].provinceRecovery).toFixed(2),
            Number(chartData[key].areaReturn).toFixed(2)
          )
        }

        var maxAllData = Math.max.apply(Math, allData) // 求y轴最大值
        var maxAllDataR = Math.max.apply(Math, totalPriceData) // 求y右轴最大值

        // if (this.params.area == "") {
        //   xzhouData = cityData;
        // } else {
        //   xzhouData = areaData;
        // }
        if (this.areaSelectedOptions.length == 1) {
          xzhouData = cityData
        }
        if (this.areaSelectedOptions.length == 2) {
          xzhouData = areaData
        }
        if (this.areaSelectedOptions.length == 3) {
          xzhouData = areaData
        }

        var legendData = [
          '复垦为农用地面积',
          '城乡建设规模',
          '省级收回',
          '县级返还',
          { name: '成交总价', icon: 'line' }
        ]

        var seriesAllData = [
          agricultureAreaData,
          scaleUrbanAreaData,
          provinceRecoveryData,
          areaReturnData
        ]
      }

      var colorData = [
        '#5582ea',
        '#9dcb69',
        '#45b27f',
        '#f4ce52',
        '#f48e56',
        '#f0525b',
        '#cd69d0',
        '#8759d6',
        '#616fc2',
        '#50b8ef',
        '#6ddedc',
        '#cd356d',
        '#e0bebd',
        '#4a27a7',
        '#a16f92',
        '#28bdb6',
        '#31908e',
        '#626b70',
        '#9ae883',
        '#3b5050'
      ]

      var series = []
      for (var i = 0; i < legendData.length; i++) {
        series.push({
          name: legendData[i],
          type: 'bar',
          barWidth: null, // 默认自适应
          barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
          barMaxWidth: 40, // 柱形的宽度
          barMaxnWidth: 1, // 柱形的宽度
          barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
          data: seriesAllData[i], // 数据
          itemStyle: {
            normal: {
              color: colorData[i]
            }
          }
        })
      }

      if (this.jcpgyjindex == 1) {
        var unitName = ''
        if (this.danweiVal == '1') {
          unitName = '单位：万公顷'
        } else if (this.danweiVal == '2') {
          unitName = '单位：万亩'
        }
      } else {
        var unitName = ''
        if (this.unitsVal == 'SQUARE_KILOMETER') {
          unitName = '单位：平方公里'
        } else if (this.unitsVal == 'MU') {
          unitName = '单位：亩'
        } else if (this.unitsVal == 'MILLION_MU') {
          unitName = '单位：万亩'
        } else if (this.unitsVal == 'SQUARE_METER') {
          unitName = '单位：平方米'
        } else if (this.unitsVal == 'HECTARE') {
          unitName = '单位：公顷'
        }
      }

      if (this.jcpgyjindex == 1) {
        var option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            x: 'center',
            bottom: '2%',
            data: legendData, // legendData
            itemWidth: 36,
            itemHeight: 17,
            itemGap: 20
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '30%',
            top: '5%',
            containLabel: true,
            x: 100, // 控制x轴文字与底部的距离
            y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
          },
          xAxis: [
            {
              // name: '市',
              type: 'category',
              data: xzhouData, // x轴data
              axisTick: {
                alignWithLabel: true,
                show: false // 不要刻度
              },
              axisLine: {
                show: false // 不要x轴
              },
              axisLabel: {
                interval: 'auto',
                rotate: 45, // 文字逆时针旋转45°
                textStyle: {
                  fontSize: '14' // 坐标值得具体的颜色
                }
              }
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, // 默认为1
              end: 30
              // end: 45
            }
          ],
          yAxis: [
            {
              name: unitName,
              nameTextStyle: {
                fontWeight: 'bolder'
              },
              type: 'value',
              interval: Math.ceil(maxAllData / 5), // y轴分段
              max: Math.ceil(maxAllData), // 最大值
              min: minAllData,
              splitLine: {
                // 网格线
                lineStyle: {
                  type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
                },
                show: true // 隐藏或显示
              },
              axisTick: {
                alignWithLabel: true,
                show: false // 不要刻度
              },
              axisLine: {
                show: false, // 不要x轴
                onZero: true
              }
            }
          ],
          series: series
        }
      } else if (this.jcpgyjindex == 4) {
        var option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            x: 'center',
            bottom: '2%',
            data: legendData, // legendData
            itemWidth: 36,
            itemHeight: 17,
            itemGap: 20
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '15%',
            top: '5%',
            containLabel: true,
            x: 100, // 控制x轴文字与底部的距离
            y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
          },
          xAxis: [
            {
              // name: '市',
              type: 'category',
              data: xzhouData, // x轴data
              axisTick: {
                alignWithLabel: true,
                show: false // 不要刻度
              },
              axisLine: {
                show: false // 不要x轴
              },
              axisLabel: {
                interval: 'auto',
                rotate: 45, // 文字逆时针旋转45°
                textStyle: {
                  fontSize: '14' // 坐标值得具体的颜色
                }
              }
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, // 默认为1
              end: 100
              // end: 45
            }
          ],
          yAxis: [
            {
              name: unitName,
              nameTextStyle: {
                fontWeight: 'bolder'
              },
              type: 'value',
              interval: Math.ceil(maxAllData / 5), // y轴分段
              max: Math.ceil(maxAllData), // 最大值
              splitLine: {
                // 网格线
                lineStyle: {
                  type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
                },
                show: true // 隐藏或显示
              },
              axisTick: {
                alignWithLabel: true,
                show: false // 不要刻度
              },
              axisLine: {
                show: false // 不要x轴
              }
            },
            {
              name: '万元',
              nameTextStyle: {
                fontWeight: 'bolder'
              },
              type: 'value',
              interval: Math.ceil(maxAllDataR / 5), // y轴分段
              max: Math.ceil(maxAllDataR), // 最大值
              splitLine: {
                // 网格线
                lineStyle: {
                  type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
                },
                show: true // 隐藏或显示
              },
              axisTick: {
                alignWithLabel: true,
                show: false // 不要刻度
              },
              axisLine: {
                show: false // 不要x轴
              }
            }
          ],
          series: series.concat([
            {
              name: '成交总价',
              type: 'line',
              yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
              smooth: false, // 平滑曲线显示
              showAllSymbol: true, // 显示所有图形。
              symbol: 'emptyCircle', // 标记的图形为实心圆
              symbolSize: 8, // 标记的大小
              color: '#7fbdf8',
              itemStyle: {
                // 折线拐点标志的样式
                normal: {
                  lineStyle: {
                    width: 3, // 0.1的线条是非常细的了
                    color: '#7fbdf8' //
                  }
                }
              },
              lineStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#436cd1'
                  },
                  {
                    offset: 1,
                    color: '#7ab5f4'
                  }
                ])
              },
              data: totalPriceData
            }
          ])
        }
      } else {
        var option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            x: 'center',
            bottom: '2%',
            data: legendData, // legendData
            itemWidth: 36,
            itemHeight: 17,
            itemGap: 20
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '15%',
            top: '5%',
            containLabel: true,
            x: 100, // 控制x轴文字与底部的距离
            y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
          },
          xAxis: [
            {
              // name: '市',
              type: 'category',
              data: xzhouData, // x轴data
              axisTick: {
                alignWithLabel: true,
                show: false // 不要刻度
              },
              axisLine: {
                show: false // 不要x轴
              },
              axisLabel: {
                interval: 'auto',
                rotate: 45, // 文字逆时针旋转45°
                textStyle: {
                  fontSize: '14' // 坐标值得具体的颜色
                }
              }
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, // 默认为1
              end: 100
              // end: 45
            }
          ],
          yAxis: [
            {
              name: unitName,
              nameTextStyle: {
                fontWeight: 'bolder'
              },
              type: 'value',
              interval: Math.ceil(maxAllData / 5), // y轴分段
              max: Math.ceil(maxAllData), // 最大值
              splitLine: {
                // 网格线
                lineStyle: {
                  type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
                },
                show: true // 隐藏或显示
              },
              axisTick: {
                alignWithLabel: true,
                show: false // 不要刻度
              },
              axisLine: {
                show: false // 不要x轴
              }
            }
          ],
          series: series
        }
      }
      indexChart.setOption(option, true)
    },
    initEchart () {
      window.addEventListener('resize', () => {
        let indexChart = echarts.init(document.getElementById('indexChart'))
        document.getElementById('indexChart').style.width = 100 + '%'
        document.getElementById('indexChart').style.height = 100 + '%'
        indexChart.resize()
      })
    },
    getSummaries (param) {
      console.log(param)
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '统计'
          return
        } else if (index == 3) {
          sums[index] = this.areaReturn
        } else if (index === 4) {
          sums[index] = this.provinceReturn
        } else if (index === 5) {
          sums[index] = this.total
        } else {
          sums[index] = ''
        }
      })

      return sums
    }
  },
  created () {
    this.screenWidth = document.body.clientWidth
    this.jcpgyjindex = this.$route.query.index
    console.log(this.jcpgyjindex)

    if (this.unitsVal == 'SQUARE_KILOMETER') {
      this.unitName = '单位：平方公里'
    } else if (this.unitsVal == 'MU') {
      this.unitName = '单位：亩'
    } else if (this.unitsVal == 'MILLION_MU') {
      this.unitName = '单位：万亩'
    } else if (this.unitsVal == 'SQUARE_METER') {
      this.unitName = '单位：平方米'
    } else if (this.unitsVal == 'HECTARE') {
      this.unitName = '单位：公顷'
    }

    if (this.danweiVal == '1') {
      this.unitName2 = '单位：万公顷'
    } else if (this.danweiVal == '2') {
      this.unitName2 = '单位：万亩'
    }

    this.getYlgmtzList()

    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })
  },
  beforeDestroy () {
    this.$store.dispatch('jcpgyj/setCJFKServiceType', null)
  },
  beforeMount () {
    this.tableData = this.deepClone(tableData)
    this.xzqh = this.deepClone(XZQH)
    this.units = this.deepClone(UNINTS)
    this.selectscope = this.deepClone(SELECT)
    this.timelineOption = this.deepClone(TIMELINEOPTION)
    this.arrTime = this.timelineOption.baseOption.timeline.data
    // this.mainChartOption = this.deepClone(MAINCHARTOPTION);
  }
}
</script>
<style>
#dtIndexBox .el-input__inner {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
}
#dtIndexBox .el-icon-arrow-up:before {
  /* color: #fff; */
}
#dtIndexBox .el-icon-arrow-down:before {
  /* color: #fff; */
}
#dtIndexBox .el-input__icon {
  color: #fff;
}
#dtIndexBox .el-input__inner::placeholder {
  color: #fff;
}
#dtIndexBox .el-button--primary {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
}
</style>
<style scoped>
@import "../css/style.css";
.page-body {
  padding: 0 15px 15px;
  background-color: #f7f7f7;
}
#dtIndexBox {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.indexTitleBox {
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
}
.indexCheck {
  flex: 1;
}
.indexImage {
  width: 200px;
}

.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  background: #fff;
  width: 80%;
  height: 100%;
  /* overflow: auto; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.indexContentBox {
  width: 100%;
  height: 100%;
}
.indexContentBox1 {
  width: 100%;
  height: 100%;
}
.unitTip {
  font-weight: bolder;
  color: #303030;
  margin-bottom: 15px;
}
.filterWrap {
  display: flex;
  width: 100%;
  flex: 1;
  overflow: hidden;
  background-color: #f7f7f7;
}
.filterWrapRight {
  box-sizing: border-box;
  width: 20%;
  /* flex: 1; */
  background-color: #fff;
  margin-left: 20px;
  padding: 15px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-timebox {
  position: relative;
  width: 1200px;
  height: 50px;
  left: 50%;
  margin-left: -600px;
}
@media screen and (max-width: 1600px) {
  #dtIndexBox {
    height: 772px;
  }
  .chart-timebox {
    position: relative;
    width: 1000px;
    height: 50px;
    left: 50%;
    margin-left: -500px;
  }
}
</style>

