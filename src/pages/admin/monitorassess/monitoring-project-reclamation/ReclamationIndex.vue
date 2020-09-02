<template>
  <div class="page-body"
       id="reclamationIndex-box">
    <div class="reclamationIndex-box-main">
      <!-- 左边菜单 -->
      <div style="position: relative;z-index:200;backgroundColor: #fff;">
        <div @click="showProjectMenu"
             class="main-message"
             :class="{
            'main-messageR': isShow,
            'main-messageL': !isShow
          }"></div>
        <transition name="left">
          <el-container v-if="this.isShow == true"
                        style="width:400px;height:100%;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);">
            <el-header class="main-menu-box">
              <span class="main-menu-title">拆旧复垦</span>
              <span class="main-menu-toMsg"
                    @click="goTOShuJuZL">数据总览</span>
            </el-header>
            <div class="change-main">
              <div style="width:168px;min-height: 40px;height:40px;display:flex;">
                <div class="tab-title"
                     :class="{
                    'tab-title1': cjActiveName === 'TOTAL',
                    'tab-title3': cjActiveName === 'NEW'
                  }"
                     @click="turnTOTAL">
                  交易总览
                </div>
                <div class="tab-title"
                     :class="{
                    'tab-title2': cjActiveName === 'NEW',
                    'tab-title4':
                      cjActiveName === 'TOTAL' || cjActiveName === 'ONLY'
                  }"
                     @click="turnNEW">
                  最新交易
                </div>
              </div>
              <el-cascader :options="periodsOptions"
                           :props="props"
                           v-model="qiOptions"
                           @change="qiSelect()"
                           :placeholder="jiaoyiZLPHolder"
                           style="backgroundColor:#fff;min-height: 40px;margin-left:16px;"></el-cascader>
            </div>
            <el-main id="main-aside">
              <div class="main-aside-main"
                   v-if="cjActiveName === 'TOTAL'">
                <el-collapse v-model="activeNames"
                             @change="handleChange">
                  <el-collapse-item title="拆旧复垦进展情况"
                                    name="1">
                    <!-- 项目立项 -->
                    <div class="doaway-menu-first-time">
                      <i></i>
                      <span>2019年11月25日</span>
                      <span>更新</span>
                    </div>
                    <div class="doaway-menu-first-box">
                      <div class="doaway-menu-first-left">
                        <div class="doaway-menu-first-left-title">
                          项目立项情况
                        </div>
                        <div class="doaway-menu-first-left-number">
                          <div class="doaway-menu-first-left-number-one">
                            <span>立项个数(个)</span>
                            <span>{{ this.LXCOUN }}</span>
                          </div>
                          <div class="doaway-menu-first-left-number-one">
                            <span>立项面积(亩)</span>
                            <span>{{ this.LXAREA }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="doaway-menu-first-right">
                        <span @click="handleClickDetailLX">详情</span>
                        <i></i>
                        <span @click="handleClickMonitorLX">监测</span>
                      </div>
                    </div>
                    <!-- 项目验收 -->
                    <div class="doaway-menu-first-time">
                      <i></i>
                      <span>2019年11月25日</span>
                      <span>更新</span>
                    </div>
                    <div class="doaway-menu-first-box">
                      <div class="doaway-menu-first-left">
                        <div class="doaway-menu-first-left-title">
                          项目验收情况
                        </div>
                        <div class="doaway-menu-first-left-number">
                          <div class="doaway-menu-first-left-number-one">
                            <span>验收个数(个)</span>
                            <span>{{ this.YSCOUN }}</span>
                          </div>
                          <div class="doaway-menu-first-left-number-one">
                            <span>验收面积(亩)</span>
                            <span>{{ this.YSAREA }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="doaway-menu-first-right">
                        <span @click="handleClickDetailYS">详情</span>
                        <i></i>
                        <span @click="handleClickMonitorYS">监测</span>
                      </div>
                    </div>
                    <!-- 项目交易 -->
                    <div class="doaway-menu-first-time">
                      <i></i>
                      <span>2019年11月25日</span>
                      <span>更新</span>
                    </div>
                    <div class="doaway-menu-first-box firstActive">
                      <div class="doaway-menu-first-left firstActiveBGC">
                        <div class="doaway-menu-first-left-title">
                          项目交易情况
                        </div>
                        <div class="doaway-menu-first-left-number">
                          <div class="doaway-menu-first-left-number-one">
                            <span>交易金额(亿元)</span>
                            <span>{{ this.JYCOUN }}</span>
                          </div>
                          <div class="doaway-menu-first-left-number-one">
                            <span>交易面积(亩)</span>
                            <span>{{ this.JYAREA }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="doaway-menu-first-right">
                        <span @click="handleClickDetailJY">详情</span>
                        <i></i>
                        <span @click="handleClickMonitorJY">监测</span>
                      </div>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="预留规模台账管理"
                                    name="2">
                    <!-- 规模台账 -->
                    <div class="doaway-menu-first-time">
                      <i></i>
                      <span>2019年11月25日</span>
                      <span>更新</span>
                    </div>
                    <div class="doaway-menu-first-box">
                      <div class="doaway-menu-first-left">
                        <div class="doaway-menu-first-left-title">预留规模</div>
                        <div class="doaway-menu-first-left-number">
                          <div class="doaway-menu-first-left-number-one">
                            <span>预留城乡总规模(公顷)</span>
                            <span>{{ this.yuliuData }}</span>
                          </div>
                          <div class="doaway-menu-first-left-number-one">
                            <span>剩余城乡规模(公顷)</span>
                            <span style="color:#73BD00;">{{
                              this.shengyuData
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="doaway-menu-first-right__custom">
                        <span @click="handleClickDetailYJGM">详情</span>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <!-- 最新交易 -->
              <div class="main-aside-main"
                   v-if="cjActiveName === 'NEW'">
                <div class="menu-new-box"
                     @click="handleClickMenuB">
                  <div class="menu-new-title">{{ this.newYQListYear }}年{{this.newYQListProid}}交易</div>
                  <div class="menu-new-time">交易时间{{this.newYQListTime}}</div>
                  <div class="menu-new-msg">
                    <span>本期成交面积：</span>
                    <span>{{this.newYQListArea}}</span>
                    <span>亩</span>
                  </div>
                  <div class="menu-new-msg">
                    <span>本期成交金额：</span>
                    <span>{{this.newYQListMount}}</span>
                    <span>亿元</span>
                  </div>
                </div>
              </div>
              <!-- 级联(年期数) -->
              <div class="main-aside-main"
                   v-if="cjActiveName === 'ONLY'">
                <div class="menu-new-box__custom"
                     :class="{
                    lastActive: limitC == index,
                    lastActiveOther: MoRenFirst && index == 0
                  }"
                     v-for="(item, index) in changeYQList"
                     :key="index"
                     @click="handleClickMenuC(item, index)">
                  <div class="menu-new-title"
                       v-if="item.proid===null">{{ item.year }}累计交易情况</div>
                  <div class="menu-new-title"
                       v-if="item.proid!==null">{{ item.year }}年{{item.proid}}交易</div>
                  <div class="menu-new-time"
                       v-if="item.proid===null">截止时间{{ item.time }}</div>
                  <div class="menu-new-time"
                       v-if="item.proid!==null">交易时间{{ item.time }}</div>
                  <div class="menu-new-msg">
                    <span v-if="item.proid===null">本年成交面积：</span>
                    <span v-if="item.proid!==null">本期成交面积：</span>
                    <span>{{ item.area }}</span>
                    <span>亩</span>
                  </div>
                  <div class="menu-new-msg">
                    <span v-if="item.proid===null">本年成交金额：</span>
                    <span v-if="item.proid!==null">本期成交金额：</span>
                    <span>{{ item.mount }}</span>
                    <span>亿元</span>
                  </div>
                </div>
              </div>
            </el-main>
            <div style="width:100%;min-height:16px;background:#fff;"></div>
          </el-container>
        </transition>
      </div>
      <!-- 右边地图 -->
      <div class="main-right-map"
           :class="{
          'main-right-map-nototal': isShow,
          'main-right-map-total': !isShow
        }">
        <div class="map-big-box">
          <div class="map-top-title"
               style="position: static;z-index:100;">
            {{ this.cjActiveTitle }}
          </div>
          <div style="width:100%;height:calc(100% - 40px);backgroundColor:#023853;">
            <div id="mapBox"
                 ref="mapBox"
                 style="width:100%;height:100%;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import moment from 'moment'
import qs from 'qs'
import Bus from '../../../../utils/bus'
import echarts from 'echarts'
import commonecharts from '../../onemap/topic/commonecharts.js'
import '../../../../../static/map/js/province/guangdong'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  name: 'ReclamationIndex',
  data () {
    return {
      tolist: {},
      isShow: true,
      isShowMenuSpecial: '',
      activeNames: ['1'],
      cjActiveName: 'TOTAL',
      // 历年交易级联选择器
      qiOptions: [],
      props: {
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      periodsOptions: [],
      qiYear: '',
      qiNumber: '',
      jiaoyiZLPHolder: '',
      cjActiveTitle: '广东省复垦指标网上公开交易指标流向总览',
      params: {
        year: '',
        proid: ''
      },
      // 交易总览菜单数据
      LXCOUN: '',
      LXAREA: '',
      YSCOUN: '',
      YSAREA: '',
      JYCOUN: '',
      JYAREA: '',
      // 地图
      chart: null,
      timeFn: null,
      mapCode: '',
      pro: {
        广州市: '../../../../../static/map/json/province/440100.json',
        韶关市: '../../../../../static/map/json/province/440200.json',
        深圳市: '../../../../../static/map/json/province/440300.json',
        珠海市: '../../../../../static/map/json/province/440400.json',
        汕头市: '../../../../../static/map/json/province/440500.json',
        佛山市: '../../../../../static/map/json/province/440600.json',
        江门市: '../../../../../static/map/json/province/440700.json',
        湛江市: '../../../../../static/map/json/province/440800.json',
        茂名市: '../../../../../static/map/json/province/440900.json',
        肇庆市: '../../../../../static/map/json/province/441200.json',
        惠州市: '../../../../../static/map/json/province/441300.json',
        梅州市: '../../../../../static/map/json/province/441400.json',
        汕尾市: '../../../../../static/map/json/province/441500.json',
        河源市: '../../../../../static/map/json/province/441600.json',
        阳江市: '../../../../../static/map/json/province/441700.json',
        清远市: '../../../../../static/map/json/province/441800.json',
        东莞市: '../../../../../static/map/json/province/441900.json',
        中山市: '../../../../../static/map/json/province/442000.json',
        潮州市: '../../../../../static/map/json/province/445100.json',
        揭阳市: '../../../../../static/map/json/province/445200.json',
        云浮市: '../../../../../static/map/json/province/445300.json'
      },
      allData: [],

      // 最新交易
      newYQListYear: '',
      newYQListProid: '',
      newYQListTime: '',
      newYQListArea: '',
      newYQListMount: '',
      // 级联列表
      changeYQList: [],
      limitC: -1,
      MoRenFirst: true,

      // 菜单
      activeMenuTitle: '项目交易情况',

      // 预留规模
      yuliuData: '',
      shengyuData: ''
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    turnTOTAL () {
      this.cjActiveName = 'TOTAL'
      for (var key in this.params) {
        this.params[key] = ''
      }
      this.qiOptions = []
      this.cjActiveTitle = '广东省复垦指标网上公开交易指标流向总览'
    },
    async turnNEW () {
      this.cjActiveName = 'NEW'
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

      if (this.qiNumber) {
        this.cjActiveTitle
          = '广东省复垦指标网上公开交易'
          + this.qiYear
          + '年'
          + this.qiNumber
          + '指标流向'
      } else {
        this.cjActiveTitle
          = '广东省复垦指标网上公开交易' + this.qiYear + '年' + '指标流向'
      }

      let params = this.params
      let resList = await this.$get('/epf-monitor-evaluation/fkhome/fkThrdeAmount', params)
      this.newYQListYear = this.params.year
      this.newYQListProid = this.params.proid
      this.newYQListTime = resList.result[0].createTime
      this.newYQListArea = Number(resList.result[0].areaSum).toFixed(2)
      this.newYQListMount = Number(resList.result[0].totalAmount / 100000000).toFixed(2)
    },
    // 历史交易年数-期数
    async getPeriods () {
      let res = await this.$get('/epf-monitor-evaluation/fkhome/fkHomeParam')
      if (res.code === 0) {
        let periodsYears = []
        let childreList = []
        for (var key in res.homeParam) {
          periodsYears.push(res.homeParam[key].year)
          childreList.push(res.homeParam[key].proid)
        }
        let childreListData = []
        let newPeriodsData = []
        let newPeriod = ''
        for (var key in childreList) {
          childreListData.push(childreList[key].split(','))
          newPeriodsData.push(childreList[key].split(','))
        }
        newPeriod = newPeriodsData[0][newPeriodsData[0].length - 1]
        let childreListDataOld = []
        for (var key in childreListData) {
          for (var index in childreListData[key]) {
            childreListData[key].push({
              value: childreListData[key][index],
              label: childreListData[key][index]
            })
          }
        }
        for (var key in childreListData) {
          let length = childreListData[key].length / 2
          childreListData[key] = childreListData[key].slice(length)
        }

        let periodsData = []
        for (var i = 0; i < periodsYears.length; i++) {
          periodsData.push({
            value: periodsYears[i],
            label: periodsYears[i],
            children: childreListData[i]
          })
        }
        this.periodsOptions = periodsData
        this.qiOptions = []
        this.params = {
          year: '',
          proid: ''
        }
        this.qiYear = ''
        this.qiNumber = ''
        this.jiaoyiZLPHolder = '历次交易'
        // this.qiOptions = [periodsYears[0], newPeriod]
        // this.params = {
        //   year: periodsYears[0],
        //   proid: newPeriod
        // }
        // this.qiYear = periodsYears[0]
        // this.qiNumber = newPeriod
      } else {
        this.$message.error(res.msg)
      }
    },
    qiSelect (val) {
      this.cjActiveName = 'ONLY'
      this.MoRenFirst = true
      this.limitC = -1
      this.qiYear = this.qiOptions[0]
      this.qiNumber = this.qiOptions[1]
      this.params.year = this.qiOptions[0]
      this.params.proid = this.qiOptions[1]
      if (this.qiNumber) {
        this.cjActiveTitle
          = '广东省复垦指标网上公开交易'
          + this.qiYear
          + '年'
          + this.qiNumber
          + '指标流向'
      } else {
        this.cjActiveTitle
          = '广东省复垦指标网上公开交易' + this.qiYear + '年' + '指标流向'
      }
      this.getListData()
      setTimeout(() => {
        this.loadMap(
          '../../../../../static/map/json/province/440000.json',
          'guangdong'
        )
      }, 500)
    },
    async getListData () {
      this.changeYQList = []
      this.params.year = this.qiOptions[0]
      this.params.proid = this.qiOptions[1]
      let params = this.params
      let res = await this.$get('/epf-monitor-evaluation/fkhome/fkThrdeAmount', params)
      let data = res.result
      for (var key in data) {
        this.changeYQList.push(
          {
            year: this.params.year,
            proid: data[key].proid,
            time: data[key].createTime,
            area: Number(data[key].areaSum).toFixed(2),
            mount: Number(data[key].totalAmount / 100000000).toFixed(2)
          }
        )
      }
    },
    handleClickMenuB (item, index) { },
    handleClickMenuC (item, index) {
      this.limitC = index
      if (index == 0) {
        this.MoRenFirst = true
      } else {
        this.MoRenFirst = false
      }
      item.year ? this.params.year = item.year : this.params.year = ''
      this.params.proid = item.proid

      if (item.proid) {
        this.cjActiveTitle
          = '广东省复垦指标网上公开交易'
          + item.year
          + '年'
          + item.proid
          + '指标流向'
      } else {
        this.cjActiveTitle
          = '广东省复垦指标网上公开交易' + item.year + '年' + '指标流向'
      }
    },
    // 地图展示
    async loadMap (mapCode, name) {
      setTimeout(() => {
        document.getElementById('mapBox').style.width = 100 + '%'
        this.chart = echarts.init(this.$refs.mapBox)
        this.chart.resize() // 直接加这句即可
      }, 0)

      const that = this
      const data = await axios.get(mapCode)

      if (data) {
        this.chart = echarts.init(this.$refs.mapBox)
        echarts.registerMap(name, data)

        // 获取城市中心点
        var centerId
          = data.features[0].properties.center
          || data.features[0].geometry.coordinates[0][0]

        var geoCoordMap = {} // 坐标点
        data.features.map(function (e, item) {
          geoCoordMap[e.properties.name]
            = e.properties.center || e.geometry.coordinates[0][0]
        })

        // 流向数据(交易金额)
        let params = this.params
        let res = await this.$get(
          '/epf-monitor-evaluation/fkhome/fkHomeInfo',
          params
        )
        this.LXCOUN = Number(res.result.projectAppr.COUN).toFixed(2)
        this.LXAREA = Number(res.result.projectAppr.AREA).toFixed(2)
        this.YSCOUN = Number(res.result.projectAcc.COUN).toFixed(2)
        this.YSAREA = Number(res.result.projectAcc.AREA).toFixed(2)
        this.JYCOUN = Number(res.result.tradeAcc.AMOUNT).toFixed(2)
        this.JYAREA = Number(res.result.tradeAcc.AREASUM).toFixed(2)
        let chartData = res.result.tradeVos

        let amountAllData = []
        for (var key in chartData) {
          amountAllData.push(chartData[key].areaSum)
        }
        let maxAmountData = Math.max.apply(Math, amountAllData)

        function getFlowData (Data, DataNew) {
          for (var key in Data) {
            // DataNew.push({
            //   end: Data[key].buyCityName,
            //   start: Data[key].sellCityName,
            //   message: Data[key].areaSum
            // });
            DataNew.push([
              {
                name: Data[key].sellCityName
              },
              {
                name: Data[key].buyCityName,
                value: Data[key].areaSum
              }
            ])
          }
        }
        // 广州市
        let guangzhouDataNew = []
        let guangzhouData = chartData.filter(function (i) {
          return i.sellCity.includes('440100')
        })
        getFlowData(guangzhouData, guangzhouDataNew)
        if (guangzhouData != '') {
          guangzhouDataNew = [
            [
              {
                name: '广州市'
              },
              {
                name: '广州市',
                value: ''
              }
            ]
          ].concat(guangzhouDataNew)
        }
        // 韶关市
        let shaoguanDataNew = []
        let shaoguanData = chartData.filter(function (i) {
          return i.sellCity.includes('440200')
        })
        getFlowData(shaoguanData, shaoguanDataNew)
        if (shaoguanData != '') {
          shaoguanDataNew = [
            [
              {
                name: '韶关市'
              },
              {
                name: '韶关市',
                value: ''
              }
            ]
          ].concat(shaoguanDataNew)
        }
        // 深圳市
        let shenzhenDataNew = []
        let shenzhenData = chartData.filter(function (i) {
          return i.sellCity.includes('440300')
        })
        getFlowData(shenzhenData, shenzhenDataNew)
        if (shenzhenData != '') {
          shenzhenDataNew = [
            [
              {
                name: '深圳市'
              },
              {
                name: '深圳市',
                value: ''
              }
            ]
          ].concat(shenzhenDataNew)
        }
        // 珠海市
        let zhuhaiDataNew = []
        let zhuhaiData = chartData.filter(function (i) {
          return i.sellCity.includes('440400')
        })
        getFlowData(zhuhaiData, zhuhaiDataNew)
        if (zhuhaiData != '') {
          zhuhaiDataNew = [
            [
              {
                name: '珠海市'
              },
              {
                name: '珠海市',
                value: ''
              }
            ]
          ].concat(zhuhaiDataNew)
        }
        // 汕头市
        let shantouDataNew = []
        let shantouData = chartData.filter(function (i) {
          return i.sellCity.includes('440500')
        })
        getFlowData(shantouData, shantouDataNew)
        if (shantouData != '') {
          shantouDataNew = [
            [
              {
                name: '汕头市'
              },
              {
                name: '汕头市',
                value: ''
              }
            ]
          ].concat(shantouDataNew)
        }
        // 佛山市
        let foshanDataNew = []
        let foshanData = chartData.filter(function (i) {
          return i.sellCity.includes('440600')
        })
        getFlowData(foshanData, foshanDataNew)
        if (foshanData != '') {
          foshanDataNew = [
            [
              {
                name: '佛山市'
              },
              {
                name: '佛山市',
                value: ''
              }
            ]
          ].concat(foshanDataNew)
        }
        // 江门市
        let jiangmenDataNew = []
        let jiangmenData = chartData.filter(function (i) {
          return i.sellCity.includes('440700')
        })
        getFlowData(jiangmenData, jiangmenDataNew)
        if (jiangmenData != '') {
          jiangmenDataNew = [
            [
              {
                name: '江门市'
              },
              {
                name: '江门市',
                value: ''
              }
            ]
          ].concat(jiangmenDataNew)
        }
        // 湛江市
        let zhanjiangDataNew = []
        let zhanjiangData = chartData.filter(function (i) {
          return i.sellCity.includes('440800')
        })
        getFlowData(zhanjiangData, zhanjiangDataNew)
        if (zhanjiangData != '') {
          zhanjiangDataNew = [
            [
              {
                name: '湛江市'
              },
              {
                name: '湛江市',
                value: ''
              }
            ]
          ].concat(zhanjiangDataNew)
        }
        // 茂名市
        let maomingDataNew = []
        let maomingData = chartData.filter(function (i) {
          return i.sellCity.includes('440900')
        })
        getFlowData(maomingData, maomingDataNew)
        if (maomingData != '') {
          maomingDataNew = [
            [
              {
                name: '茂名市'
              },
              {
                name: '茂名市',
                value: ''
              }
            ]
          ].concat(maomingDataNew)
        }
        // 肇庆市
        let zhaoqingDataNew = []
        let zhaoqingData = chartData.filter(function (i) {
          return i.sellCity.includes('441200')
        })
        getFlowData(zhaoqingData, zhaoqingDataNew)
        if (zhaoqingData != '') {
          zhaoqingDataNew = [
            [
              {
                name: '肇庆市'
              },
              {
                name: '肇庆市',
                value: ''
              }
            ]
          ].concat(zhaoqingDataNew)
        }
        // 惠州市
        let huizhouDataNew = []
        let huizhouData = chartData.filter(function (i) {
          return i.sellCity.includes('441300')
        })
        getFlowData(huizhouData, huizhouDataNew)
        if (huizhouData != '') {
          huizhouDataNew = [
            [
              {
                name: '惠州市'
              },
              {
                name: '惠州市',
                value: ''
              }
            ]
          ].concat(huizhouDataNew)
        }
        // 梅州市
        let meizhouDataNew = []
        let meizhouData = chartData.filter(function (i) {
          return i.sellCity.includes('441400')
        })
        getFlowData(meizhouData, meizhouDataNew)
        if (meizhouData != '') {
          meizhouDataNew = [
            [
              {
                name: '梅州市'
              },
              {
                name: '梅州市',
                value: ''
              }
            ]
          ].concat(meizhouDataNew)
        }
        // 汕尾市
        let shanweiDataNew = []
        let shanweiData = chartData.filter(function (i) {
          return i.sellCity.includes('441500')
        })
        getFlowData(shanweiData, shanweiDataNew)
        if (shanweiData != '') {
          shanweiDataNew = [
            [
              {
                name: '汕尾市'
              },
              {
                name: '汕尾市',
                value: ''
              }
            ]
          ].concat(shanweiDataNew)
        }
        // 河源市
        let heyuanDataNew = []
        let heyuanData = chartData.filter(function (i) {
          return i.sellCity.includes('441600')
        })
        getFlowData(heyuanData, heyuanDataNew)
        if (heyuanData != '') {
          heyuanDataNew = [
            [
              {
                name: '河源市'
              },
              {
                name: '河源市',
                value: ''
              }
            ]
          ].concat(heyuanDataNew)
        }
        // 阳江市
        let yangjiangDataNew = []
        let yangjiangData = chartData.filter(function (i) {
          return i.sellCity.includes('441700')
        })
        getFlowData(yangjiangData, yangjiangDataNew)
        if (yangjiangData != '') {
          yangjiangDataNew = [
            [
              {
                name: '阳江市'
              },
              {
                name: '阳江市',
                value: ''
              }
            ]
          ].concat(yangjiangDataNew)
        }
        // 清远市
        let qingyuanDataNew = []
        let qingyuanData = chartData.filter(function (i) {
          return i.sellCity.includes('441800')
        })
        getFlowData(qingyuanData, qingyuanDataNew)
        if (qingyuanData != '') {
          qingyuanDataNew = [
            [
              {
                name: '清远市'
              },
              {
                name: '清远市',
                value: ''
              }
            ]
          ].concat(qingyuanDataNew)
        }
        // 东莞市
        let dongguanDataNew = []
        let dongguanData = chartData.filter(function (i) {
          return i.sellCity.includes('441900')
        })
        getFlowData(dongguanData, dongguanDataNew)
        if (dongguanData != '') {
          dongguanDataNew = [
            [
              {
                name: '东莞市'
              },
              {
                name: '东莞市',
                value: ''
              }
            ]
          ].concat(dongguanDataNew)
        }
        // 中山市
        let zhongshanDataNew = []
        let zhongshanData = chartData.filter(function (i) {
          return i.sellCity.includes('442000')
        })
        getFlowData(zhongshanData, zhongshanDataNew)
        if (zhongshanData != '') {
          zhongshanDataNew = [
            [
              {
                name: '中山市'
              },
              {
                name: '中山市',
                value: ''
              }
            ]
          ].concat(zhongshanDataNew)
        }
        // 潮州市
        let chaozhouDataNew = []
        let chaozhouData = chartData.filter(function (i) {
          return i.sellCity.includes('445100')
        })
        getFlowData(chaozhouData, chaozhouDataNew)
        if (chaozhouData != '') {
          chaozhouDataNew = [
            [
              {
                name: '潮州市'
              },
              {
                name: '潮州市',
                value: ''
              }
            ]
          ].concat(chaozhouDataNew)
        }
        // 揭阳市
        let jieyangDataNew = []
        let jieyangData = chartData.filter(function (i) {
          return i.sellCity.includes('445200')
        })
        getFlowData(jieyangData, jieyangDataNew)
        if (jieyangData != '') {
          jieyangDataNew = [
            [
              {
                name: '揭阳市'
              },
              {
                name: '揭阳市',
                value: ''
              }
            ]
          ].concat(jieyangDataNew)
        }
        // 云浮市
        let yunfuDataNew = []
        let yunfuData = chartData.filter(function (i) {
          return i.sellCity.includes('445300')
        })
        getFlowData(yunfuData, yunfuDataNew)
        if (yunfuData != '') {
          yunfuDataNew = [
            [
              {
                name: '云浮市'
              },
              {
                name: '云浮市',
                value: ''
              }
            ]
          ].concat(yunfuDataNew)
        }

        let totalData = []

        totalData = totalData.concat([
          ['广州市', guangzhouDataNew],
          ['韶关市', shaoguanDataNew],
          ['深圳市', shenzhenDataNew],
          ['珠海市', zhuhaiDataNew],
          ['汕头市', shantouDataNew],
          ['佛山市', foshanDataNew],
          ['江门市', jiangmenDataNew],
          ['湛江市', zhanjiangDataNew],
          ['茂名市', maomingDataNew],
          ['肇庆市', zhaoqingDataNew],
          ['惠州市', huizhouDataNew],
          ['梅州市', meizhouDataNew],
          ['汕尾市', shanweiDataNew],
          ['河源市', heyuanDataNew],
          ['阳江市', yangjiangDataNew],
          ['清远市', qingyuanDataNew],
          ['东莞市', dongguanDataNew],
          ['中山市', zhongshanDataNew],
          ['潮州市', chaozhouDataNew],
          ['揭阳市', jieyangDataNew],
          ['云浮市', yunfuDataNew]
        ])
        for (var key in totalData) {
          if (totalData[key][1] == '') {
            let index = key
            delete totalData[index]
          }
        }
        var legendData = []
        for (var key in totalData) {
          legendData.push(totalData[key][0] + ' 拆旧复垦指标流向')
        }

        var planePath
          = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705'
        var convertData = function (data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i]
            var fromCoord = geoCoordMap[dataItem[0].name]
            var toCoord = geoCoordMap[dataItem[1].name]
            if (fromCoord && toCoord) {
              // res.push([
              //   {
              //     coord: fromCoord
              //   },
              //   {
              //     coord: toCoord
              //   }
              // ])
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                value: dataItem[1].value
              })
            }
          }
          return res
        }

        // 颜色
        // var color = [
        //   "#4e81f7",
        //   "#9dcb69",
        //   "#f4ce53",
        //   "#ef525b",
        //   "#47b884",
        //   "#f58d56",
        //   "#f891fc",
        //   "#8e60dc",
        //   "#50b8ef",
        //   "#70ddda",
        //   "#6577dd",
        //   "#cd366d",
        //   "#9ae883",
        //   "#aeb3b7",
        //   "#28bdb7",
        //   "#e0bebd",
        //   "#5c30cd",
        //   "#d07cb7",
        //   "#f25f33",
        //   "#c961ff",
        //   "#a6c84c"
        // ];
        var color = [
          '#0ebbf1',
          '#7cf5e3',
          '#4ca0fe',
          '#ca6bfe',
          '#e9c437',
          '#5ca7b0',
          '#88ca6e',
          '#fe1800',
          '#f87700',
          '#dc5b55',
          '#0ebbf1',
          '#1d7ce4',
          '#ce1365',
          '#aeb3b7',
          '#28bdb7',
          '#e0bebd',
          '#5c30cd',
          '#d07cb7',
          '#f25f33',
          '#c961ff',
          '#a6c84c'
        ]

        // 点
        commonecharts.dot
          = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB0VBMVEX///9AQEBRUVFQUFBRUVNQUFNQUFNQUFRQUFRQUFNKSlFNTU1VVVVQUFRQUFRQUFNQUFNRUVNPT1NJSUkAAABPT1RQUFNRUVNRUVRQUFNPT1JPT1NRUVRRUVRQUFMAAABJSUlOTlNQUFNRUVRRUVNRUVNNTU0zMzNVVVVQUFRQUFNQUFRQUFJERFVPT1NQUFNRUVJQUFNERERPT1JQUFNMTFFPT1NOTlJPT1NQUFNNTVVQUFNRUVRRUVNJSVBQUFRRUVRQUFNOTlJQUFJRUVNQUFRAQEA5OTlRUVRJSVVRUVRQUFJQUFBNTVFOTlJQUFJNTU1RUVRQUFVPT1RQUFNPT1RQUFRQUFRPT1NRUVNRUVRLS0tQUFRMTExPT1JQUFNRUVJMTFJQUFNQUFJQUFRQUFNQUFNOTlNRUVNQUFNQUFNQUFJQUFRAQEBRUVRRUVRGRlFRUVFRUVNQUFNRUVNPT1NNTVJQUFRPT1JPT1FRUVFQUFNRUVJRUVROTk5RUVNRUVNJSVJRUVRQUFNQUFRVVVVQUFRPT09RUVNOTlNPT1NPT1JQUFJPT1NOTk5RUVVPT1JPT1JQUFBPT1NQUFRPT1NRUVNPT1NQUFNRUVT///8Bgf/9AAAAmXRSTlMABBMjZaPK8cyZJhQGRo/O+NFKBwE6s+n9yKSXxuq5Ag51/vPjkTgFA4zi9H0PN7WnUA9UuznXTkfQP/L6xCO8+fM7hn7YDAn3Fbp/ID9BwArwM3Sfd+7Obt3gEdUbhY2IMmx2cKb1NObL+3PGCJukFhbNxdCaOOGhdyaWhdEN59QcT1PrCbo6x3K7sXx+Fz9EpxCHQITBxM90dZ2MAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+MJGRETIUxnIWMAAAK5SURBVDjLjVX7WxJBFB1Q3EpdFllkQVNcVHwEauKjFgU1FUwNE01LM8uktEzTSMtMM9Pykb07/20s+u3OKsvX+WV3zpy5c/feszOE0DAYs7JNOQzAXLiYfSnXQPSQl8+aOSjgLGyBNa2QtxXaBVnicBYVOYvlN+Fyia30vNJVxkB0l1dUek7GVZXVNbUimCvesyF9dckd6xuualY3mpL5+H28RtrULMDS4j23VasFwrXrdMwmCYG29nRf0B4MoaNTjetrhrvLlb4sxhtudPuUbeqEQFePXgl7u8JCXeR0+zKgzUV0EekDbp6kYGNgaScZ0G+GNJDqUSG4FpIRgxxu5SWf+XaxXlslq8tr1dQyWi8O5RPiYQV3A83fHo71BWMjPpprHBVZKzHeQTnVI8PYeEhuf+DuGGWVexNwTJIsDhWU8r7qrCmPyj8AN00eApUqNQYKj1TeBsyQx5hVV8fHaemTuLobECNP4VAXD4do6dy8OvMMZsLAqYyfx6DBQlSZegGJAEXK2OXXSv2LyhQLaKTeoFYaXNJIMyUQ69Ek8BLFypgfCWg+a0Rt7zJWyCt0VClE4jUttSfoYq2SbP0WrFHeklvwhkM1ZaopVfmWMsE6uDjJfYeaDZXzrL2fS+VpX6OUrk3kbKVM+IE2XHx+wZ80YYLmtlMmJAUfRZOL5kl0calHY+0dk8AUyOl9AtdKMmKXw14qnf//DUnpZ+CLUV9p3AcOTg9Er18IHfbqKfMOw6L/SGmSBe71iE7Mw+RBpJaD/1qLcEl/2jz3w5g9puvR2S3APBg9K9zZNUPsPtZwfEI+ir9tf6fJje3UUZzgzwSIDEsQRyd+7J5eK4afvzZHBUgHR+Qc+IHfQ6Lc/mUnyzr/yG8iszeQ5tqQy9LKOujLKEfvMpJhnZyeif2VAGlldSa+pRX+A6ZEDu7OBxwOAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA5LTI1VDA5OjE5OjMzKzA4OjAwZOkGcAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wOS0yNVQwOToxOTozMyswODowMBW0vswAAAAASUVORK5CYII='
        commonecharts.round
          = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABklBMVEX///8AAABOTk5KSlJPT1JRUVJQUFNPT1NQUFNQUFNQUFNQUFNRUVFQUFBQUFBPT1NPT1RQUFNQUFRQUFRRUVNQUFBSUlJPT1NQUFRRUVRQUFNPT1NMTExAQFVQUFNQUFNQUFNRUVNNTVNQUFNQUFNQUFNRUVFQUFNQUFNRUVRPT1ROTlJRUVFQUFRRUVNLS1FAQEBQUFNHR0dQUFBRUVRRUVFQUFNSUlJPT1RQUFNPT1JQUFRQUFNOTlIzMzNQUFNJSUlQUFBQUFRRUVFRUVRPT09RUVNQUFJRUVRPT1RQUFJQUFRQUFNQUFJQUFNQUFNRUVRQUFRQUFRQUFNPT1JQUFNOTlFQUFJERFVRUVNGRlFVVVVQUFRPT1NRUVMAAABQUFNNTU1RUVNOTk5QUFRPT1NLS0tRUVRRUVNOTk5SUlJQUFNRUVQAAABMTFJQUFJNTVJRUVFRUVNOTlNHR1VQUFJRUVNQUFRPT09PT1JQUFJQUFRQUFJRUVNRUVRRUVNLS1JQUFRQUFJPT1JRUVT///92MI4RAAAAhHRSTlMAAg0fZJ671/LzvKBiIDB+t+zrtnszGZHh+uKXGwxZ4+FiK6n+rybL+/w9OyzM1CwMqBJT/V/fH6GjROjvQQWTBxDAFu0tZXCrscPG4Nz29fDS1baYn1VgD74WA4lH6QOwK+0ugoQRwMEaMs/XATLrNSnRMRJm420dm6J5qtqqeCJGxqHNKI+zAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+MJGREWIEYX5bAAAAGASURBVDjLjdX5NwJRFAfwW1S2olFS9owlS8QQSUTInl3Ikn3JmmSJ5P3hjPY5s9zvz59z3nvnnfu9ALmRyQsKFUpVUbGqpLRMLZeBYDTlFVqSCVWp0wvAKkO1keTFaKqp5YF19Q2EJ41Ncq40N9OEN3SLOV+2trUTgVjaNLmygyIi0XZmZVc3EY21Jy17bRZxarH1pWg/QyTCDCSlelBKEmKy/3/mkLQkZJiljhEMdY4CuMYkb8qGNoyDewIjCSmZBLsHRz1TMI2ThMyAF0tnYQ5L52EBSxdhCUuXwYmlPljB0lVYw1IlrGPpBmzSOElvQQGFoyNm2PYjr7oDu3sM6vw9F0BgH0N9gb8pODjEUP8BOzFHPmkZPE6O7Ik0PU31wNm5xMuYi8t0vVxdi9ObbCWHbu/EpOc+lFOFD1bB2mIenzhVbKMFpJdTxQDh5wifjLyEebZB9JXiVHe79i0qsGP07x+xjDbGPr+ElhHbiu7495ciQQUTPzpH3J2/4n4BmA63E2iY/SgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDktMjVUMDk6MjI6MzIrMDg6MDCjnJAyAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA5LTI1VDA5OjIyOjMyKzA4OjAw0sEojgAAAABJRU5ErkJggg=='
        commonecharts.startPoint
          = 'image://data:image/png;base64,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'
        commonecharts.endPoint
          = 'image://data:image/png;base64,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'

        // 线
        commonecharts.linesInage1
          = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313zpath://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
        commonecharts.linesInage2
          = 'image://data:image/png;base64,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'

        // 流向图标
        var linkSymbol = [
          'roundRect',
          commonecharts.linesInage1,
          commonecharts.linesInage2
        ]
        // 起点图标
        var startSymbol = [
          'circle',
          commonecharts.dot,
          commonecharts.round,
          commonecharts.startPoint
        ]
        // 终点图标
        var endSymbol = [
          'pin',
          commonecharts.dot,
          commonecharts.round,
          commonecharts.endPoint
        ]

        // 流向series
        var series = []

        totalData.forEach(function (item, i) {
          series.push(
            {
              name: item[0] + ' 拆旧复垦指标流向',
              type: 'lines',
              zlevel: 1,
              effect: {
                show: true,
                period: 4, // 箭头指向速度，值越小速度越快
                trailLength: 0.5, // 特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: linkSymbol[0], // 箭头图标
                symbolSize: 5 // 图标大小
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 0,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + ' 拆旧复垦指标流向',
              type: 'lines',
              zlevel: 2,
              effect: {
                // show: true,
                // period: 6,
                // trailLength: 0,
                // symbol: planePath,
                // symbolSize: 15
                show: true,
                period: 4, // 箭头指向速度，值越小速度越快
                trailLength: 0.5, // 特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: linkSymbol[0], // 箭头图标
                symbolSize: 5 // 图标大小
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 1,
                  opacity: 0.4,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + ' 拆旧复垦指标流向',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              // rippleEffect: {
              //   brushType: 'stroke'
              // },
              rippleEffect: {
                // 涟漪特效
                period: 4, // 动画时间，值越小速度越快
                brushType: 'stroke', // 波纹绘制方式 stroke, fill
                scale: 4 // 波纹圆环最大限制，值越大波纹越大
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  offset: [10, 0],
                  formatter: '{b}'
                }
              },
              symbol: startSymbol[0],
              symbolSize: function (val) {
                return Math.round(10 + (val[2] * 15) / maxAmountData)
                // return val[2] * 10;
                // return val[2] / 8;
              },
              itemStyle: {
                normal: {
                  color: color[i]
                }
              },
              data: item[1].map(function (dataItem) {
                return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name].concat([
                    dataItem[1].value
                  ])
                }
              })
            },
            {
              // 被攻击点
              type: 'scatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                period: 4,
                brushType: 'stroke',
                scale: 4
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  offset: [10, 0],
                  formatter: '{b}'
                }
              },
              // symbol: endSymbol[0],
              symbolSize: 15,
              data: item[1].map(function (dataItem) {
                return {
                  name: dataItem[1].name
                }
              })
            }
          )
        })

        var option = {
          backgroundColor: '#023853', // 背景色
          // tooltip: {
          //   trigger: 'item',
          //   formatter: function (params) {
          //     return (
          //       params.seriesName
          //       + '</br>'
          //       + params.marker
          //       + params.name
          //       + '：'
          //       + params.value[2]
          //     )
          //   }
          // },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(166, 200, 76, 0.82)',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function (params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              if (
                params.seriesType === 'effectScatter'
                || params.seriesType === 'scatter'
              ) {
                return (
                  '线路：' + params.data.name + '  ' + params.data.value[2]
                )
              } else if (params.seriesType === 'lines') {
                return (
                  params.data.fromName
                  + ' > '
                  + params.data.toName
                  + '<br />'
                  + params.data.value
                )
              } else {
                return params.name
              }
              // return res;
            }
          },
          legend: {
            orient: 'vertical',
            // top: "bottom",
            // left: "right",
            bottom: '10px',
            right: '10px',
            data: legendData,
            textStyle: {
              color: '#fff'
            }
            // selectedMode: "single"
          },
          geo: {
            map: 'guangdong',
            aspectScale: 1,
            zoom: 1.1,
            label: {
              emphasis: {
                show: false
              }
            },
            // roam: true,
            itemStyle: {
              normal: {
                color: 'rgba(51, 69, 89, .5)', // 地图背景色
                borderColor: '#516a89', // 省市边界线00fcff 516a89
                borderWidth: 1
              },
              emphasis: {
                color: 'rgba(37, 43, 61, .5)' // 悬浮背景
              }
            }
          },
          series: series
        }

        this.chart.setOption(option, true)
      } else {
        alert('无法加载该地图')
      }
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.mapBox)
        document.getElementById('mapBox').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    },

    getGMTZMenuData () {
      this.$get(
        `/epf-monitor-evaluation/admin/fkScaleLedger/getList?yeaer=${this.params.year}&province=440000&city=&area=&unit=HECTARE`
      ).then(res => {
        if (res.code == 0) {
          let chartData = res.pager.results
          let yuliuDataList = []
          let shengyuDataList = []
          for (var key in chartData) {
            yuliuDataList.push(chartData[key].overallScope)
            shengyuDataList.push(chartData[key].surplusAmount)
          }

          function sum (arr) {
            return eval(arr.join('+'))
          }

          this.yuliuData = sum(yuliuDataList).toFixed(2)
          this.shengyuData = sum(shengyuDataList).toFixed(2)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    handleChange (val) { },
    showProjectMenu () {
      this.isShow = !this.isShow
    },
    goTOShuJuZL () {
      let title = '拆旧复垦数据总览'
      let routerPath = 'ReclamationTotalData'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    handleClickDetailLX () {
      this.activeMenuTitle = '项目立项情况'

      let title = '拆旧复垦详情'
      let routerPath = 'ReclamationChart'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      sessionStorage.setItem(
        'toChaijiuChartType',
        JSON.stringify(this.activeMenuTitle)
      )
    },
    handleClickMonitorLX () {
      this.activeMenuTitle = '项目立项情况'

      let title = '拆旧复垦监测'
      let routerPath = 'ReclamationMonitor'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      sessionStorage.setItem(
        'toChaijiuChartType',
        JSON.stringify(this.activeMenuTitle)
      )
    },
    handleClickDetailYS () {
      this.activeMenuTitle = '项目验收情况'

      let title = '拆旧复垦详情'
      let routerPath = 'ReclamationChart'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      sessionStorage.setItem(
        'toChaijiuChartType',
        JSON.stringify(this.activeMenuTitle)
      )
    },
    handleClickMonitorYS () {
      this.activeMenuTitle = '项目验收情况'

      let title = '拆旧复垦监测'
      let routerPath = 'ReclamationMonitor'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      sessionStorage.setItem(
        'toChaijiuChartType',
        JSON.stringify(this.activeMenuTitle)
      )
    },
    handleClickDetailJY () {
      this.activeMenuTitle = '项目交易情况'

      let title = '拆旧复垦详情'
      let routerPath = 'ReclamationChart'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      sessionStorage.setItem(
        'toChaijiuChartType',
        JSON.stringify(this.activeMenuTitle)
      )
    },
    handleClickMonitorJY () {
      this.activeMenuTitle = '项目交易情况'
    },
    handleClickDetailYJGM () {
      this.activeMenuTitle = '预留规模'

      let title = '拆旧复垦详情'
      let routerPath = 'ReclamationChart'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      sessionStorage.setItem(
        'toChaijiuChartType',
        JSON.stringify(this.activeMenuTitle)
      )
    }
  },
  created () {
    this.getPeriods()
    this.getGMTZMenuData()
    window.addEventListener('setItem', () => {
      this.isShowMenuSpecial = sessionStorage.getItem('watchShow')
    })
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.loadMap(
          '../../../../../static/map/json/province/440000.json',
          'guangdong'
        )
      }, 0)
    })
    this.initEchart()
    window.addEventListener('setItem', () => {
      this.isShowMenuSpecial = sessionStorage.getItem('watchShow')
    })
  },
  watch: {
    $route (to, from) {
      this.$nextTick(function () {
        setTimeout(() => {
          this.loadMap(
            '../../../../../static/map/json/province/440000.json',
            'guangdong'
          )
        }, 1000)
      })
    },
    isShowMenuSpecial: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.loadMap(
              '../../../../../static/map/json/province/440000.json',
              'guangdong'
            )
          }, 1000)
        })
      }
    },
    isShow: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.loadMap(
              '../../../../../static/map/json/province/440000.json',
              'guangdong'
            )
          }, 1000)
        })
      }
    },
    params: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.loadMap(
              '../../../../../static/map/json/province/440000.json',
              'guangdong'
            )
          }, 100)
        })
      }
    }
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
::-webkit-scrollbar {
  width: 0px;
}
#reclamationIndex-box {
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  background-color: #f7f7f7;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#reclamationIndex-box::-webkit-scrollbar {
  display: none;
}
.reclamationIndex-box-main {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  display: flex;
  justify-content: flex-start;
}
.main-right-map {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  z-index: 0;
}
.main-right-map-nototal {
  width: calc(100% - 400px);
}
.main-right-map-total {
  width: 100%;
}
.map-big-box {
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
.map-top-title {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  padding: 0 16px;
  color: #7c8196;
}
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
.main-message {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 40px;
  right: -40px;
  cursor: pointer;
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: -1;
}
.main-messageL {
  background-image: url("../../../../assets/images/jcpgyj/right.png");
  background-size: 40px 40px;
}
.main-messageR {
  background-image: url("../../../../assets/images/jcpgyj/left.png");
  background-size: 40px 40px;
}
/* 菜单 */
.main-menu-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px !important;
  background-color: #fff;
  padding: 0 24px;
}
.main-menu-title {
  font-size: 18px;
  color: #202020;
  line-height: 24px;
  font-weight: bolder;
}
.main-menu-toMsg {
  font-size: 16px;
  color: #50a5f4;
  cursor: pointer;
}
.change-main {
  width: 100%;
  min-height: 40px;
  height: 40px;
  padding: 0 24px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}
.tab-title {
  width: 84px;
  height: 40px;
  font-size: 16px;
  color: #595959;
  border: 1px solid #d9d9d9;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  box-sizing: border-box;
}
.tab-title1 {
  width: 84px;
  height: 40px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #1b74ee;
  font-size: 16px;
  color: #1b74ee;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.tab-title2 {
  width: 84px;
  height: 40px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #1b74ee;
  font-size: 16px;
  color: #1b74ee;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.tab-title3 {
  border-right: 0px solid transparent;
}
.tab-title4 {
  border-left: 0px solid transparent;
}
.main-aside-main {
  background-color: #fff;
  width: 100%;
  /* height: 100%; */
  /* box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1); */
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 0px 24px 54px;
}
.main-aside-main::-webkit-scrollbar {
  display: none;
  width: 0px !important;
}
.doaway-menu-first-time {
  width: 340px;
  height: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.doaway-menu-first-time span {
  font-size: 12px;
  color: #c4c4c4;
  margin-left: 5px;
}
.doaway-menu-first-time i {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: #439dff;
}
.doaway-menu-first-box {
  width: 342px;
  height: 111px;
  display: flex;
  justify-content: flex-start;
  background-color: #fafafc;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin: 0px auto 16px;
}
.doaway-menu-first-box.firstActive {
  background-color: #f4faff;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
  box-sizing: content-box;
}
.doaway-menu-first-box:hover {
  background-color: #f4faff;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
  box-sizing: content-box;
}
.doaway-menu-first-left {
  width: 264px;
  height: 100%;
  padding: 16px 0 16px 16px;
  /* background-color: #fafafc; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.doaway-menu-first-left.firstActiveBGC {
  background-color: #f4faff;
}
.doaway-menu-first-left:hover {
  background-color: #f4faff;
}
.doaway-menu-first-left-title {
  width: 100%;
  height: 24px;
  color: #202020;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.doaway-menu-first-left-number {
  width: 100%;
  height: 48px;
  display: flex;
}
.doaway-menu-first-left-number-one {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.doaway-menu-first-left-number-one span:nth-child(1) {
  color: #707070;
  font-size: 12px;
  line-height: 26px;
}
.doaway-menu-first-left-number-one span:nth-child(2) {
  color: #f9c60d;
  font-size: 20px;
  line-height: 27px;
}
.doaway-menu-first-right {
  width: 88px;
  height: 100%;
  box-sizing: border-box;
  border-left: 1px solid #ececec;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.doaway-menu-first-right__custom {
  width: 88px;
  height: 100%;
  box-sizing: border-box;
  border-left: 1px solid #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.doaway-menu-first-right span {
  font-size: 16px;
  width: 100%;
  height: 55px;
  text-align: center;
  line-height: 55px;
  color: #50a5f4;
  cursor: pointer;
}
.doaway-menu-first-right__custom span {
  font-size: 16px;
  color: #50a5f4;
  cursor: pointer;
}
.doaway-menu-first-right i {
  width: 90%;
  height: 1px;
  display: block;
  background-color: #ececec;
  margin: 0 auto;
}
.menu-new-box {
  width: 352px;
  height: 147px;
  /* margin: 0 auto; */
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
  padding: 16px 0 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
}
.menu-new-box__custom {
  width: 352px;
  height: 147px;
  /* margin: 0 auto; */
  background: rgba(250, 250, 250, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  padding: 16px 0 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  cursor: pointer;
}
.menu-new-box__custom:hover {
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
}
.menu-new-box__custom.lastActive {
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
}
.menu-new-box__custom.lastActiveOther {
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
}
.menu-new-title {
  color: #202020;
  font-size: 18px;
  line-height: 24px;
  height: 24px;
}
.menu-new-time {
  color: #a4a4a4;
  font-size: 16px;
  line-height: 21px;
  height: 21px;
}
.menu-new-msg {
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.menu-new-msg span:nth-child(1) {
  color: #707070;
  font-size: 16px;
  margin-right: 5px;
}
.menu-new-msg span:nth-child(2) {
  color: #f9c60d;
  font-size: 20px;
  margin-right: 2px;
}
.menu-new-msg span:nth-child(3) {
  color: #f9c60d;
  font-size: 16px;
}
</style>
<style>
#reclamationIndex-box .el-collapse-item__header {
  font-size: 18px;
  border-bottom: 0px solid #ebeef5;
}
#reclamationIndex-box .el-collapse-item__wrap {
  border-bottom: 0px solid #ebeef5;
}
#reclamationIndex-box .el-collapse {
  border-top: 0px solid #ebeef5;
  border-bottom: 0px solid #ebeef5;
}
.main-aside-main::-webkit-scrollbar {
  display: none;
  width: 0px !important;
}
</style>
