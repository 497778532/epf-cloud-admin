<template>
  <div class="page-body"
       id="subject-box">
    <div class="subject-box-map"
         v-if="isMapPattern">
      <div style="position: relative;"
           v-if="isShowHome">
        <div @click="checkProjectMenu"
             class="middle-middle-message-box"
             :class="{
            'middle-middle-message-boxR': isShow,
            'middle-middle-message-boxL': !isShow
          }"></div>
        <transition name="left">
          <ControlMenu ref="menuForm"
                       v-if="this.isShow == true"
                       @controlChange="getItemChangeMessage(arguments)"
                       @homeShow="getHomeChangeMessage()"
                       :controlButton="rightItemButton"
                       :controlTitle="rightItemMessageTitle"
                       :controlUnit="rightItemMessageUnit"
                       :controlZbEnum="rightItemMessageZbEnum"
                       :controlMenuLXData="lixiangMenuData"
                       :controlMenuYSData="yanshouMenuData"
                       :controlMenuJYData="jiaoyiMenuData"
                       :controlMenuCity="changeMenuCity"
                       :isMapPatternData="isMapPattern"
                       :controlMenuArea="changeMenuArea"></ControlMenu>
        </transition>
      </div>
      <div style="position: relative;"
           v-if="!isShowHome">
        <div @click="checkProjectMenu"
             class="middle-middle-message-box"
             :class="{
            'middle-middle-message-boxR': isShow,
            'middle-middle-message-boxL': !isShow
          }"></div>
        <transition name="left">
          <MonitorChart v-if="this.isShow == true"
                        :rightItemMessageTitleData="rightItemMessageTitle"
                        :rightItemMessageUnitData="rightItemMessageUnit"
                        :rightItemMessageZbEnumData="rightItemMessageZbEnum"
                        :homeChangeMessage="isShowHome"
                        :controlMenuCity="changeMenuCity"
                        :controlMenuArea="changeMenuArea"></MonitorChart>
        </transition>
      </div>
      <div class="left"
           :class="{ 'left-true': isShow, 'left-false': !isShow }">
        <!-- <div class="left-top">
        <epf-title title="约束性指标"
                   v-if="isShowHome"></epf-title>
        <epf-title :title="this.rightItemMessageTitle"
                   v-else></epf-title>
        <div class="left-top-button">
          <div class="left-top-button-tab"
               :class="{ active: currentTab === 2 }"
               @click="turnThird"
               v-if="!isShowHome">返回</div>
          <span v-if="!isShowHome">丨</span>
          <div class="left-top-button-tab"
               :class="{ active: currentTab === 3 }"
               @click="turnFourth"
               v-if="!isShowHome">
            <span v-if="isMapPattern">列表模式</span>
            <span v-if="!isMapPattern">地图模式</span>
          </div>
        </div>
        </div>-->

        <div class="left-bottom">
          <div class="map-top-title">
            <div class="left-top-button-tab"
                 @click="turnThird"
                 v-if="!isShowHome">
              返回
            </div>
            <span v-if="!isShowHome">丨</span>
            <div class="left-top-button-tab__custom"
                 @click="turnFourth"
                 v-if="!isShowHome">
              <span v-if="isMapPattern"
                    style="cursor: pointer;display: flex;align-items: center;">
                <i class="tb-icon"></i>图表模式
              </span>
            </div>
          </div>
          <div style="width:100%;height:calc(100% - 40px);color:#fff;">
            <epf-mapview :delay="1"
                         name="ConstraintIndex"
                         :mapAppInitConf="myMapAppInitConf">
              <epf-mapview-popup :visible="showPopup"
                                 :position="popupPosition"
                                 :content="popupContent"></epf-mapview-popup>
              <div class="toolbar">
                <toggle-map style="margin-right: 10px;width: 32px;"></toggle-map>
                <jumpto style="margin: 0px;"></jumpto>
                <zoom></zoom>
                <!-- <toolbox style="margin: 0px;"
                @click.stop.native="handleToolBoxClick"></toolbox>-->
                <!-- <tool-item style="margin: 0px;"></tool-item> -->
              </div>
              <city-location>123</city-location>
              <!-- <tool-panel></tool-panel> -->
            </epf-mapview>
          </div>
        </div>
      </div>
    </div>

    <div class="left-bottom-fourth"
         v-if="!isMapPattern">
      <ProjectChart :chartAreasNameData="chartAreasName"
                    :chartDataFirst="chartData1"
                    :chartDataSecond="chartData2"
                    :chartLegendData="chartLegend"
                    :chartOptionsData="chartOptions"
                    :legendSelectedData="legendSelected"
                    :tableHeadData="tableHead"
                    :tableDataList="tableData"
                    :yearListData="yearList"
                    :isShowData="isShow"
                    :controlButton="rightItemButton"
                    :rightItemMessageTitleData="rightItemMessageTitle"
                    :rightItemMessageUnitData="rightItemMessageUnit"
                    :rightItemMessageZbEnumData="rightItemMessageZbEnum"
                    @filterInfo="getFilterData"
                    @mapPatternInfo="getMapPatternData"></ProjectChart>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import qs from 'qs'
import Bus from '../../../../utils/bus'
import echarts from 'echarts'
import moment from 'moment'
import ProjectChart from './ProjectChart'
import ControlMenu from './ControlMenu'
import MonitorChart from './MonitorChart'
import commonecharts from '../../onemap/topic/commonecharts.js'
import '../../../../../static/map/js/province/guangdong'

import gisMixin from '../mixins/gis'

require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  mixins: [gisMixin],
  components: {
    ProjectChart,
    ControlMenu,
    MonitorChart
  },
  data () {
    return {
      // 历年交易级联选择器
      qiOptions: [],
      props: {
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      periodsOptions: [],
      qiYear: '',
      qiNumber: '',
      params: {
        province: '440000',
        city: '',
        area: '',
        year: ''
      },

      currentTab: 0,

      isShow: true,

      rightItemMessage: {},
      rightItemMessageTitle: '',
      rightItemMessageUnit: '',
      rightItemButton: '',
      rightItemMessageZbEnum: '',
      isShowCurrentTab: 1, // 1为流向//2为gis//3位数据
      isMapPattern: true,

      chartAreasName: [],
      chartData1: [],
      chartData2: [],
      chartLegend: [],
      chartOptions: [],
      legendSelected: {},
      tableHead: [],
      tableData: [],
      yearList: [],

      monitorChartData: [],
      monitorChartYear: [],
      monitorZbzfData: {},

      filterData: {
        type: '3',
        citys: '',
        areas: '',
        unit: '',
        year: '2019',
        amountOrderFlag: '',
        areaOrderFlag: '',
        rankVal: '',
        dataFlag: '',
        buyCitys: '',
        buyAreas: ''
      },
      periodsYears: [], // 历年交易年份,

      // 项目验收情况
      yanshouCityNameList: [],
      yanshouData1: [],
      yanshouData2: [],
      yanshouLegendData: [],
      yanshouChartOptions: [],
      yanshouLegendSelected: {},
      yanshouTableData: [],
      // 项目交易情况
      jiaoyiCityNameList: [],
      jiaoyiData1: [],
      jiaoyiData2: [],
      jiaoyiLegendData: [],
      jiaoyiChartOptions: [],
      jiaoyiLegendSelected: {},
      jiaoyiTableData: [],
      // 立项\验收监测数据
      monitorYear: [],
      monitorArea: [],
      zbzfData: {},
      // 菜单数据
      changeMenuCity: '',
      changeMenuArea: '',
      lixiangMenuData: {},
      yanshouMenuData: {},
      jiaoyiMenuData: {},
      jiaoyiMenuData: {},

      indexMapList: [],
      indexDetail: [],

      isShowHome: true,
      mapApp: null
    }
  },
  methods: {
    qiSelect (val) {
      this.qiYear = this.qiOptions[0]
      this.qiNumber = this.qiOptions[1]
      this.params.year = this.qiOptions[0]
      this.params.proid = this.qiOptions[1]
      setTimeout(() => {
        this.loadMap(
          '../../../../../static/map/json/province/440000.json',
          'guangdong'
        )
      }, 500)
    },
    async turnFirst () {
      this.currentTab = 0
      let res = await this.$get('/epf-monitor-evaluation/fkhome/fkHomeParam')

      let periodsYears = []
      let childreList = []
      for (var key in res.homeParam) {
        periodsYears.push(res.homeParam[key].year)
        childreList.push(res.homeParam[key].proid)
      }
      let newPeriodsData = []
      let newPeriod = ''
      for (var key in childreList) {
        newPeriodsData.push(childreList[key].split(','))
      }
      newPeriod = newPeriodsData[0][newPeriodsData[0].length - 1]
      this.params = {
        year: periodsYears[0],
        proid: newPeriod
      }
      this.qiYear = periodsYears[0]
      this.qiNumber = newPeriod
      this.qiOptions = [periodsYears[0], newPeriod]
    },
    turnSecond () {
      this.currentTab = 1
      console.log(this.qiOptions)
    },
    turnThird () {
      this.currentTab = 2
      this.isShowHome = true
      this.rightItemMessageTitle = ''
      this.rightItemMessageUnit = ''
      this.rightItemButton = ''
      this.rightItemMessageZbEnum = ''
    },
    turnFourth () {
      this.currentTab = 3
      this.isMapPattern = !this.isMapPattern
    },
    checkProjectMenu () {
      this.isShow = !this.isShow
    },
    getItemChangeMessage (val) {
      console.log(val)
      this.rightItemMessage = val[0]
      this.rightItemMessageTitle = val[0].title
      this.rightItemMessageUnit = val[0].unitName
      this.rightItemButton = val[1]
      this.rightItemMessageZbEnum = val[0].zbEnum
    },
    getHomeChangeMessage (val) {
      this.isShowHome = val
    },

    getFilterData (val) {
      this.changeMenuCity = val.city
      this.changeMenuArea = val.area
    },
    getMapPatternData (val) {
      this.isMapPattern = val
    },

    // 地图请求
    async getMapIndexData () {
      let res = await this.$get(
        `/epf-monitor-evaluation/bindIndicator/queryMap?province=440000&city=&area=&year=${moment().year()}&areaType=2`
      )
      if (res.code === 0) {
        let indexMapList = res.result
        for (var key in indexMapList) {
          if (indexMapList[key].dictTranslate.provinceName != null) {
            if (indexMapList[key].dictTranslate.cityName != null) {
              if (indexMapList[key].dictTranslate.areaName != null) {
                let index = key
                indexMapList[index]['diquName']
                  = indexMapList[index].dictTranslate.areaName
              } else {
                let index = key
                indexMapList[index]['diquName']
                  = indexMapList[index].dictTranslate.cityName
              }
            } else {
              let index = key
              indexMapList[index]['diquName']
                = indexMapList[index].dictTranslate.provinceName
            }
          }
          if (indexMapList[key].province != null) {
            if (indexMapList[key].city != null) {
              if (indexMapList[key].area != null) {
                let index = key
                indexMapList[index]['diquIdCode'] = indexMapList[index].area
              } else {
                let index = key
                indexMapList[index]['diquIdCode'] = indexMapList[index].city
              }
            } else {
              let index = key
              indexMapList[index]['diquIdCode'] = indexMapList[index].province
            }
          }
          this.indexMapList.push({
            subNumber: indexMapList[key].subNumber,
            diquIdCode: indexMapList[key].diquIdCode,
            diquName: indexMapList[key].diquName
          })
        }
        console.log(this.indexMapList) // 地图预警个数数组
      } else {
        this.$message.error(res.msg) // 失败
      }
    },
    // 鼠标移进预警图标请求表格数据
    async getgetMapIndexDetail () {
      let res = await this.$get(
        `/epf-monitor-evaluation/bindIndicator/queryWarnList?province=440000&city=&area=&year=${moment().year()}&areaType=1&zbEnum=${
        this.rightItemMessageZbEnum
        }`
      )
      if (res.code === 0) {
        let indexDetail = res.pager.results
        for (var key in indexDetail) {
          this.indexDetail.push({
            name: indexDetail[key].name,
            indexValue: indexDetail[key].indexValue,
            planValue: indexDetail[key].planValue,
            difference: indexDetail[key].difference
          })
        }
        console.log(this.indexDetail) // 地图独自预警数据
      } else {
        this.$message.error(res.msg) // 失败
      }
    }
  },
  created () {
    // this.$refs.menuForm.getMenuData();//请求约束性指标菜单数据
    // this.getMenuData();
    this.getMapIndexData()
    this.getgetMapIndexDetail()
    // this.getPeriods();
    // this.getYanShouData();
    // this.getYanShouOptionsData();
    // this.getJiaoYIData();
    // this.getJiaoYiOptionsData();
    // this.getLXYSMonitorData();
    // this.requestData();
  },
  mounted () {
    const me = this
    this.myMapAppInitConf.map.xzqhService.disable = false
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', res => {
      const mapApp = me.$findMapApp(res)
      this.mapApp = mapApp
      // mapApp.addLayerToMap({
      //   title: '永久基本农田划定',
      //   type: 'image',
      //   useProxy: false,
      //   url: 'http://172.16.8.102:6080/arcgis/rest/services/三线管控/永久基本农田划定/MapServer'
      // })
      this.$addLayerToMap({ mapApp: mapApp }, [
        {
          title: '永久基本农田划定',
          type: 'image',
          useProxy: false,
          url:
            'http://19.15.73.111/arcgisserver12/rest/services/三线管控/永久基本农田划定/MapServer'
        },
        {
          title: '现状耕地',
          type: 'image',
          useProxy: false,
          url:
            'http://19.15.73.111/arcgisserver12/rest/services/一张图展示界面/现状耕地/MapServer'
        }
      ])
    })
    this.$bus.$on('loadLayer', res => {
      const mapApp = me.$findMapApp(res)
      this.$addLayerToMap(
        { mapApp: mapApp },
        {
          title: ''
        }
      )
    })
    this.$bus.$on('sendCityInfo', res => {
      if (res.id === '440000') {
        this.changeMenuCity = ''
        this.changeMenuArea = ''
      } else if (
        res.id === '440100'
        || res.id === '440200'
        || res.id === '440300'
        || res.id === '440400'
        || res.id === '440500'
        || res.id === '440600'
        || res.id === '440700'
        || res.id === '440800'
        || res.id === '440900'
        || res.id === '441200'
        || res.id === '441300'
        || res.id === '441400'
        || res.id === '441500'
        || res.id === '441600'
        || res.id === '441700'
        || res.id === '441800'
        || res.id === '441900'
        || res.id === '442000'
        || res.id === '445100'
        || res.id === '445200'
        || res.id === '445300'
      ) {
        this.changeMenuCity = res.id
        this.changeMenuArea = ''
      } else if (
        res.id === '440103'
        || res.id === '440104'
        || res.id === '440105'
        || res.id === '440106'
        || res.id === '440111'
        || res.id === '440112'
        || res.id === '440113'
        || res.id === '440114'
        || res.id === '440115'
        || res.id === '440117'
        || res.id === '440118'
      ) {
        this.changeMenuCity = '440100'
        this.changeMenuArea = res.id
      } else if (
        res.id === '440203'
        || res.id === '440204'
        || res.id === '440205'
        || res.id === '440222'
        || res.id === '440224'
        || res.id === '440229'
        || res.id === '440232'
        || res.id === '440233'
        || res.id === '440281'
        || res.id === '440282'
      ) {
        this.changeMenuCity = '440200'
        this.changeMenuArea = res.id
      } else if (
        res.id === '440303'
        || res.id === '440304'
        || res.id === '440305'
        || res.id === '440306'
        || res.id === '440307'
        || res.id === '440308'
        || res.id === '440309'
        || res.id === '440310'
        || res.id === '440311'
      ) {
        this.changeMenuCity = '440300'
        this.changeMenuArea = res.id
      } else if (
        res.id === '440402'
        || res.id === '440403'
        || res.id === '440404'
      ) {
        this.changeMenuCity = '440400'
        this.changeMenuArea = res.id
      } else if (
        res.id === '440507'
        || res.id === '440511'
        || res.id === '440512'
        || res.id === '440513'
        || res.id === '440514'
        || res.id === '440515'
        || res.id === '440523'
      ) {
        this.changeMenuCity = '440500'
        this.changeMenuArea = res.id
      } else if (
        res.id === '440604'
        || res.id === '440605'
        || res.id === '440606'
        || res.id === '440607'
        || res.id === '440608'
      ) {
        this.changeMenuCity = '440600'
        this.changeMenuArea = res.id
      } else if (
        res.id === '440703'
        || res.id === '440704'
        || res.id === '440705'
        || res.id === '440781'
        || res.id === '440783'
        || res.id === '440784'
        || res.id === '440785'
      ) {
        this.changeMenuCity = '440700'
        this.changeMenuArea = res.id
      } else if (
        res.id === '440802'
        || res.id === '440803'
        || res.id === '440804'
        || res.id === '440811'
        || res.id === '440823'
        || res.id === '440825'
        || res.id === '440881'
        || res.id === '440882'
        || res.id === '440883'
      ) {
        this.changeMenuCity = '440800'
        this.changeMenuArea = res.id
      } else if (
        res.id === '440902'
        || res.id === '440904'
        || res.id === '440981'
        || res.id === '440982'
        || res.id === '440983'
      ) {
        this.changeMenuCity = '440900'
        this.changeMenuArea = res.id
      } else if (
        res.id === '441202'
        || res.id === '441203'
        || res.id === '441204'
        || res.id === '441223'
        || res.id === '441224'
        || res.id === '441225'
        || res.id === '441226'
        || res.id === '441284'
      ) {
        this.changeMenuCity = '441200'
        this.changeMenuArea = res.id
      } else if (
        res.id === '441302'
        || res.id === '441303'
        || res.id === '441322'
        || res.id === '441323'
        || res.id === '441324'
      ) {
        this.changeMenuCity = '441300'
        this.changeMenuArea = res.id
      } else if (
        res.id === '441402'
        || res.id === '441403'
        || res.id === '441422'
        || res.id === '441423'
        || res.id === '441424'
        || res.id === '441426'
        || res.id === '441427'
        || res.id === '441481'
      ) {
        this.changeMenuCity = '441400'
        this.changeMenuArea = res.id
      } else if (
        res.id === '441502'
        || res.id === '441521'
        || res.id === '441523'
        || res.id === '441581'
      ) {
        this.changeMenuCity = '441500'
        this.changeMenuArea = res.id
      } else if (
        res.id === '441602'
        || res.id === '441621'
        || res.id === '441622'
        || res.id === '441623'
        || res.id === '441624'
        || res.id === '441625'
      ) {
        this.changeMenuCity = '441600'
        this.changeMenuArea = res.id
      } else if (
        res.id === '441702'
        || res.id === '441704'
        || res.id === '441721'
        || res.id === '441781'
      ) {
        this.changeMenuCity = '441700'
        this.changeMenuArea = res.id
      } else if (
        res.id === '441802'
        || res.id === '441803'
        || res.id === '441821'
        || res.id === '441823'
        || res.id === '441881'
        || res.id === '441882'
        || res.id === '441826'
        || res.id === '441825'
      ) {
        this.changeMenuCity = '441800'
        this.changeMenuArea = res.id
      } else if (
        res.id === '445102'
        || res.id === '445103'
        || res.id === '445122'
      ) {
        this.changeMenuCity = '445100'
        this.changeMenuArea = res.id
      } else if (
        res.id === '445202'
        || res.id === '445203'
        || res.id === '445222'
        || res.id === '445224'
        || res.id === '445281'
      ) {
        this.changeMenuCity = '445200'
        this.changeMenuArea = res.id
      } else if (
        res.id === '445302'
        || res.id === '445303'
        || res.id === '445321'
        || res.id === '445322'
        || res.id === '445381'
      ) {
        this.changeMenuCity = '445300'
        this.changeMenuArea = res.id
      }
      console.log(this.changeMenuCity)
    })
  },
  watch: {
    // 指标变化
    rightItemMessageZbEnum (val) {
      this.getgetMapIndexDetail()
    },
    currentTab (val) {
      // setTimeout(() => {
      //   this.loadMap(
      //     "../../../../../static/map/json/province/440000.json",
      //     "guangdong"
      //   );
      // }, 500);
    },
    isMapPattern (val) {
      // if (val == true) {
      //   setTimeout(() => {
      //     this.loadMap(
      //       "../../../../../static/map/json/province/440000.json",
      //       "guangdong"
      //     );
      //   }, 500);
      // }
      this.changeMenuCity = ''
      this.changeMenuArea = ''
    },
    changeMenuCity: {
      immediate: true,
      deep: true,
      handler (val) {
        // this.getMenuData();
        console.log(val)
      }
    },
    changeMenuArea: {
      immediate: true,
      deep: true,
      handler (val) {
        // this.getMenuData();
        console.log(val)
      }
    },
    // rightItemMessageTitle(val) {
    //   console.log(val);
    //   if (val == "项目立项情况") {
    //     this.isShowCurrentTab = 2;
    //     this.filterData.dataFlag = "2";
    //   } else if (val == "项目验收情况") {
    //     this.isShowCurrentTab = 2;
    //     this.filterData.dataFlag = "1";
    //   } else if (val.indexOf("交易") != -1) {
    //     this.isShowCurrentTab = 1;
    //     delete this.filterData["dataFlag"];
    //   } else if (val == "数据总览") {
    //     this.isShowCurrentTab = 3;
    //     this.rightItemButton = "";
    //   }
    //   console.log(val);
    //   console.log(this.isShowCurrentTab);
    //   this.requestData();
    // },
    rightItemMessageTitle: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val == '项目立项情况') {
          this.isShowCurrentTab = 2
          this.filterData.dataFlag = '2'
        } else if (val == '项目验收情况') {
          this.isShowCurrentTab = 2
          this.filterData.dataFlag = '1'
        } else if (val == '项目交易情况') {
          this.isShowCurrentTab = 1
          // delete this.filterData["dataFlag"];
          this.filterData.dataFlag = ''
        } else if (val == '数据总览') {
          this.isShowCurrentTab = 3
          this.rightItemButton = ''
        }
        // this.requestData();
      }
    },
    rightItemButton: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val == 1) {
          setTimeout(() => {
            this.isMapPattern = false
          }, 500)
        } else if (val == 2 || val == '') {
          setTimeout(() => {
            this.isMapPattern = true
          }, 500)
        }
        this.rightItemButton = val
        console.log(val)
        // this.requestData();
      }
    },
    isShowCurrentTab (val) {
      // if (val == 1) {
      //   setTimeout(() => {
      //     this.loadMap(
      //       "../../../../../static/map/json/province/440000.json",
      //       "guangdong"
      //     );
      //   }, 500);
      // }
    }
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
#subject-box {
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  background-color: #f7f7f7;
  /* display: flex;
  justify-content: flex-start; */
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#subject-box::-webkit-scrollbar {
  display: none;
}
.subject-box-map {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  display: flex;
  justify-content: flex-start;
}
.left {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}
.left-true {
  width: calc(100% - 380px);
}
.left-false {
  width: 100%;
}
.left-top {
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 15px;
}
.left-top-button {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left-top-button-tab {
  color: #7c8196;
  font-size: 16px;
  cursor: pointer;
}
.map-top-title {
  width: 100%;
  height: 40px;
  /* position: absolute; */
  /* top: 0px; */
  background: rgba(255, 255, 255, 1);
  /* box-shadow: 0px 1px 3px -1px rgba(153, 153, 153, 0.5); */
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.left-top-button-tab__custom {
  color: #7c8196;
  font-size: 16px;
  line-height: 40px;
  height: 100%;
  padding-right: 16px;
  display: flex;
  justify-content: flex-end;
}
.left-top-button-tab__custom:hover {
  color: #50a5f6;
}
.left-top-button-tab:hover {
  color: #50a5f6;
}
.tb-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("../../../../assets/images/jcpgyj/project/tubiao.png");
  background-size: 24px 24px;
  margin: 0px 5px;
}
.left-top-button .active {
  color: #1d7ce4;
}
.left-top-button span {
  margin: 5px;
}
.left-top-button-cascader {
  position: relative;
}
.left-bottom {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.left-bottom-map {
  width: 100%;
  height: 100%;
}
.left-bottom-fourth {
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1); */
}
.left-bottom-time {
  position: absolute;
  top: 15px;
  left: 30px;
  font-size: 16px;
  color: #00fefe;
  /* color: #fff; */
  z-index: 9;
}
/* .left-enter,
.left-leave-to {
  transform: translate3d(100%, 0, 0);
}
.left-leave,
.left-enter-to {
  transform: translate3d(0, 0, 0);
}
.left-enter-active,
.left-leave-active {
  transition: all .2s;
} */
.left-enter-active,
.left-leave-active {
  transition: all 0.2s ease;
  transform: translateX(0%);
}
.left-enter,
.left-leave {
  transform: translateX(-100%);
}
.left-leave-to {
  transform: translateX(-100%);
}
.middle-middle-message-box {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 40px;
  right: -40px;
  cursor: pointer;
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: 99;
}
.middle-middle-message-boxL {
  background-image: url("../../../../assets/images/jcpgyj/right.png");
  background-size: 40px 40px;
}
.middle-middle-message-boxR {
  background-image: url("../../../../assets/images/jcpgyj/left.png");
  background-size: 40px 40px;
}
/* @media screen and (max-width: 1599px) {
  .page-body {
    height: calc(100% - 125px) !important;
  }
} */
</style>
<style></style>
