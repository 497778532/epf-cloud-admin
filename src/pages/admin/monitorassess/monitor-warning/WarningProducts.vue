<template>
  <div class="page-warning">
    <!-- 左边菜单 -->
    <div style="position: relative;z-index:200;background:#fff;">
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
            <span class="main-menu-title">{{this.indexName}}</span>
            <span class="main-menu-toMsg"
                  @click="handleClickMenu">预警清单</span>
          </el-header>
          <el-main style="background:#fff;">
            <div class="monitor-left-number-box"
                 style="margin-bottom:10px">
              <div class="monitor-left-number-title"
                   v-if="this.indexYear==null">监测值</div>
              <div class="monitor-left-number-title"
                   v-if="this.indexYear!=null">监测值（{{this.indexYear}}）</div>
              <div class="monitor-left-number-number">
                <span style="margin-right:10px"
                      :class="{
                succeed: isindexStandard == 0,
                nosucceed: isindexStandard == 1
              }">{{this.indexNumber}}</span>
                {{this.indexUnit}}
              </div>
            </div>
            <div class="monitor-left-number-box"
                 style="margin-bottom:32px">
              <div class="monitor-left-number-title__other"
                   v-if="this.indexPlanYear==null">规划目标</div>
              <div class="monitor-left-number-title__other"
                   v-if="this.indexPlanYear!=null">规划目标（{{this.indexPlanYear}}）</div>
              <div class="monitor-left-number-number__other">
                <span style="margin-right:10px">{{this.indexPlanNumber}}</span>
                {{this.indexUnit}}
              </div>
            </div>
            <epf-title title="查看预警情况"
                       style="margin:1px 0px 17px 10px;"></epf-title>
            <div class="warn-chart-box">
              <div class="warn-chart"
                   v-if="(this.params.city==''&&this.params.area=='')||(this.params.city==undefined&&this.params.area==undefined)">
                <div class="chart-content-show">
                  <div id="chartMBT"
                       style=" width: 200px; height: 210px;"></div>
                  <div id="chartMBB"
                       style=" width: 200px; height: 210px;"></div>
                  <!-- <i class="el-icon-s-grid"
                     style="font-size:20px;color:#02a7f0;position: absolute; top:10px;right:20px;z-index:33; cursor: pointer;"
                     @click="getShiIndexList"></i>
                  <i class="el-icon-s-grid"
                     style="font-size:20px;color:#02a7f0;position: absolute; top:10px;right:220px;z-index:33; cursor: pointer;"
                     @click="getXianIndexList"></i> -->
                  <img src="../../../../assets/images/jcpgyj/Fill.png"
                       alt=""
                       style="width:20px;height:20px;font-size:20px;color:#02a7f0;position: absolute; top:10px;right:220px;z-index:33; cursor: pointer;"
                       @click="getShiIndexList">
                  <img src="../../../../assets/images/jcpgyj/Fill.png"
                       alt=""
                       style="width:20px;height:20px;font-size:20px;color:#02a7f0;position: absolute; top:10px;right:20px;z-index:33; cursor: pointer;"
                       @click="getXianIndexList">
                </div>
              </div>
              <div class="warn-chart"
                   v-if="(this.params.city!=''&&this.params.area=='')||(this.params.city!=undefined&&this.params.area==undefined)">
                <div class="chart-content-show">
                  <!-- <div id="chartMBT" style=" width: 100%; height: 50%;border-bottom: 2px solid #02a7f0;"></div> -->
                  <div id="chartMBB"
                       style=" width: 400px; height: 210px;"></div>
                  <!-- <i class="el-icon-s-grid"
                     style="font-size:20px;color:#02a7f0;position: absolute; top:10px;right:20px;z-index:33; cursor: pointer;"
                     @click="getXianIndexList"></i> -->
                  <img src="../../../../assets/images/jcpgyj/Fill.png"
                       alt=""
                       style="width:20px;height:20px;font-size:20px;color:#02a7f0;position: absolute; top:10px;right:20px;z-index:33; cursor: pointer;"
                       @click="getXianIndexList">
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </transition>
    </div>

    <div class="warning-map"
         :class="{
          'warning-map-nototal': isShow,
          'warning-map-total': !isShow
        }">

      <div class="map-big-box">
        <div class="map-top-title"
             style="position: static;z-index:100;">
          <div class="return-icon"
               @click="handleClickGoBack()">返回</div>
        </div>
        <div style="width:100%;height:calc(100% - 40px);">
          <epf-mapview name="WarningProducts000"
                       @viewLoaded="getLoad"
                       :delay="1">
              <div class="toolbar">
                <toggle-map style="margin-right: 10px;width: 32px;"></toggle-map>  
                <jumpto style="margin:0"></jumpto>            
                <layerlist></layerlist>
                <basemap></basemap>
              </div> 
              <CityLocation></CityLocation>
            </epf-mapview>
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
import echarts from 'echarts'
import moment from 'moment'

import gisMixin from '../mixins/gis'
export default {
  name: 'WarningProducts',
  mixins: [gisMixin],
  components: {
    layerlist:()=>import("@/pages/admin/onemap/toolbarItem/layerlist"),
    basemap:()=>import("@/pages/admin/onemap/toolbarItem/basemap"),
  },
  data () {
    return {
      pageTitle: '',
      pageUnit: '',
      pageZbEnum: '',
      isindexStandard: 0,

      indexName: '', // 指标名称
      indexYear: '', // 请求年份
      indexNumber: '', // 指标监测值
      indexPlanYear: '', // 指标规划年份
      indexPlanNumber: '', // 指标规划值
      indexUnit: '', // 指标单位

      params: {
        province: '440000',
        city: '',
        area: '',
        year: moment().year(),
        zbEnum: ''
        // areaType: ""
      },
      areaType: 2,
      // 市
      shiFirstData: '',
      shiAllData: '',
      shiWarnData: '',
      // 县
      xianFirstData: '',
      xianAllData: '',
      xianWarnData: '',

      isShow: true
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    showProjectMenu () {
      this.isShow = !this.isShow
    },
    handleClickGoBack () {
      let title = '预警管理'
      let routerPath = 'WarningManage'
      this.$bus.$emit('closeTabsItem', this.$route.name)
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    handleClickMenu () {
      // if (this.params.city != "" && this.params.area != "") {
      //   this.getXianIndexList();
      // } else {
      //   this.isShow = !this.isShow;
      // }
      let title = this.pageTitle + '预警清单'
      let routerPath = `WarningMenuTable?menuTypeName=${this.pageTitle}&menuTypeUnit=${this.pageUnit}&zbEnum=${this.pageZbEnum}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        name: 'WarningMenuTable',
        query: {
          menuTypeName: this.pageTitle,
          menuTypeUnit: this.pageUnit,
          zbEnum: this.pageZbEnum
        },
        params: {
          city: this.params.city,
          area: this.params.area
        }
      })
    },
    // 市级预警
    async mbtDrawLine () {
      setTimeout(() => {
        let chartMBT = echarts.init(document.getElementById('chartMBT'))
        document.getElementById('chartMBT').style.width = 200 + 'px'
        document.getElementById('chartMBT').style.height = 210 + 'px'

        chartMBT.resize() // 直接加这句即可
      }, 0)
      let chartMBT = echarts.init(document.getElementById('chartMBT'))

      let params = this.params
      params['zbEnum'] = this.pageZbEnum
      let res = await this.$get(
        '/epf-monitor-evaluation/earlyWarn/overview/queryAreaMap?areaType=2',
        params
      )

      this.shiFirstData = Number(res.sum.rate).toFixed(2)
      this.shiAllData = res.sum.all
      this.shiWarnData = res.sum.warn

      let firstData = this.shiFirstData

      let option = {}

      option = {
        title: [
          {
            text:
              '预警城市 '
              + '{a|'
              + this.shiWarnData
              + '}'
              + '/'
              + this.shiAllData
              + '个',
            x: 'center',
            y: '85%',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
              color: '#404040',
              rich: {
                a: {
                  fontSize: 16,
                  color: '#F56259'
                }
              }
            }
          },
          {
            text: '市级:',
            x: '20px',
            y: '10px',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
              color: '#787878'
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        color: ['#D9D9D9'],

        series: [
          {
            name: '市级预警情况',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '65%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['50%', '45%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: true,

            data: [
              {
                value: firstData,
                name: '预警',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#F56259' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#F56259' // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: true,
                      textStyle: {
                        fontWeight: 'normal',
                        color: '#999',
                        fontSize: '12'
                      }
                    },
                    labelLine: {
                      show: true
                    },
                    barBorderRadius: [30, 30, 0, 0]
                  }
                },
                label: {
                  normal: {
                    formatter: function (params) {
                      return '{f|' + params.value + '%}' + '\n' + '{ss| 预警}'
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                      rich: {
                        f: {
                          fontSize: 16,
                          // fontWeight: 'bolder',
                          color: '#404040',
                          lineHeight: 40
                        },
                        ss: {
                          fontSize: 14,
                          fontWeight: 'none',
                          color: '#F56259',
                          lineHeight: 40
                        }
                      }
                    }
                  }
                }
              },
              {
                value: 100 - firstData,
                name: '正常'
              }
            ]
          }
        ]
      }
      chartMBT.setOption(option, true)
    },
    // 县级级预警
    async mbbDrawLine () {
      setTimeout(() => {
        if (
          (this.params.city == '' && this.params.area == '')
          || (this.params.city == undefined && this.params.area == undefined)
        ) {
          let chartMBB = echarts.init(document.getElementById('chartMBB'))
          document.getElementById('chartMBB').style.width = 200 + 'px'
          document.getElementById('chartMBB').style.height = 210 + 'px'

          chartMBB.resize() // 直接加这句即可
        } else if (
          (this.params.city != '' && this.params.area == '')
          || (this.params.city != undefined && this.params.area == undefined)
        ) {
          let chartMBB = echarts.init(document.getElementById('chartMBB'))
          document.getElementById('chartMBB').style.width = 400 + 'px'
          document.getElementById('chartMBB').style.height = 210 + 'px'
        }
      }, 0)
      let chartMBB = echarts.init(document.getElementById('chartMBB'))

      let params = this.params
      params['zbEnum'] = this.pageZbEnum
      let res = await this.$get(
        '/epf-monitor-evaluation/earlyWarn/overview/queryAreaMap?areaType=3',
        params
      )

      this.xianFirstData = Number(res.sum.rate).toFixed(2)
      this.xianAllData = res.sum.all
      this.xianWarnData = res.sum.warn

      let firstData = this.xianFirstData

      let option = {}

      option = {
        title: [
          {
            text:
              '预警区县 '
              + '{a|'
              + this.xianWarnData
              + '}'
              + '/'
              + this.xianAllData
              + '个',
            x: 'center',
            y: '85%',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
              color: '#404040',
              rich: {
                a: {
                  fontSize: 16,
                  color: '#F56259'
                }
              }
            }
          },
          {
            text: '县级:',
            x: '20px',
            y: '10px',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
              color: '#787878'
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        color: ['#D9D9D9'],

        series: [
          {
            name: '县级预警情况',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '65%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['50%', '45%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: true,

            data: [
              {
                value: firstData,
                name: '预警',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#F56259' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#F56259' // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: true,
                      textStyle: {
                        fontWeight: 'normal',
                        color: '#999',
                        fontSize: '12'
                      }
                    },
                    labelLine: {
                      show: true
                    },
                    barBorderRadius: [30, 30, 0, 0]
                  }
                },
                label: {
                  normal: {
                    formatter: function (params) {
                      return '{f|' + params.value + '%}' + '\n' + '{ss| 预警}'
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                      rich: {
                        f: {
                          fontSize: 16,
                          // fontWeight: 'bolder',
                          color: '#404040',
                          lineHeight: 40
                        },
                        ss: {
                          fontSize: 14,
                          fontWeight: 'none',
                          color: '#F56259',
                          lineHeight: 40
                        }
                      }
                    }
                  }
                }
              },
              {
                value: 100 - firstData,
                name: '正常'
              }
            ]
          }
        ]
      }
      chartMBB.setOption(option, true)
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        let chartMBT = echarts.init(document.getElementById('chartMBT'))
        document.getElementById('chartMBT').style.width = 200 + 'px'
        document.getElementById('chartMBT').style.height = 210 + 'px'
        chartMBT.resize()

        if (
          (this.params.city == '' && this.params.area == '')
          || (this.params.city == undefined && this.params.area == undefined)
        ) {
          let chartMBB = echarts.init(document.getElementById('chartMBB'))
          document.getElementById('chartMBB').style.width = 200 + 'px'
          document.getElementById('chartMBB').style.height = 210 + 'px'
          chartMBB.resize() // 直接加这句即可
        } else if (
          (this.params.city != '' && this.params.area == '')
          || (this.params.city != undefined && this.params.area == undefined)
        ) {
          let chartMBB = echarts.init(document.getElementById('chartMBB'))
          document.getElementById('chartMBB').style.width = 400 + 'px'
          document.getElementById('chartMBB').style.height = 210 + 'px'
          chartMBB.resize() // 直接加这句即可
        }
      })
    },
    getShiIndexList () {
      let title = this.pageTitle + '预警清单'
      let routerPath = `WarningMenuTable?menuTypeName=${this.pageTitle}&menuTypeUnit=${this.pageUnit}&zbEnum=${this.pageZbEnum}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        name: 'WarningMenuTable',
        query: {
          menuTypeName: this.pageTitle,
          menuTypeUnit: this.pageUnit,
          zbEnum: this.pageZbEnum
        },
        params: {
          areasType: '市级',
          city: this.params.city,
          area: this.params.area
        }
      })
    },
    getXianIndexList () {
      let title = this.pageTitle + '预警清单'
      let routerPath = `WarningMenuTable?menuTypeName=${this.pageTitle}&menuTypeUnit=${this.pageUnit}&zbEnum=${this.pageZbEnum}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        name: 'WarningMenuTable',
        query: {
          menuTypeName: this.pageTitle,
          menuTypeUnit: this.pageUnit,
          zbEnum: this.pageZbEnum
        },
        params: {
          areasType: '县级',
          city: this.params.city,
          area: this.params.area
        }
      })
    },
    async getIndexData () {
      let params = this.params
      params['zbEnum'] = this.pageZbEnum
      let res = await this.$get(
        '/epf-monitor-evaluation/earlyWarn/overview/getDetail',
        params
      )
      if (res.code === 0) {
        this.indexName = res.result.name
        this.indexYear = this.params.year
        if (res.result.indexValue != null) {
          this.indexNumber = Number(res.result.indexValue).toFixed(2)
        } else {
          this.indexNumber = '- -'
        }

        this.indexPlanYear = res.result.planYear

        if (res.result.planValue != null) {
          this.indexPlanNumber = Number(res.result.planValue).toFixed(2)
        } else {
          this.indexPlanNumber = '- -'
        }
        this.indexUnit = res.result.unit
        if (this.indexNumber < this.indexPlanNumber) {
          this.isindexStandard = 1
        } else {
          this.isindexStandard = 0
        }
        console.log(this.indexPlanYear)
      } else {
        this.$message.error(res.msg) // 失败
      }
    },
    // 地图请求
    async getMapIndexData () {
      let params = this.params
      let res = await this.$get(
        `/epf-monitor-evaluation/earlyWarn/bottomLine/queryMap?areaType=${this.areaType}`,
        params
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
    async getgetMapIndexDetail () {
      let params = this.params
      let res = await this.$get(
        '/epf-monitor-evaluation/earlyWarn/warnList/queryList?areaType=1',
        params
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
    },
    getLoad(){      
      let me =this;      
      setTimeout(()=>{
        var lyrobj = me.$route.query.lyrobj 
        if(!lyrobj){
          var lyrArr = JSON.parse(sessionStorage.getItem("lyrobj")) || []
          if(lyrArr.length>0){
            lyrArr.forEach(item=>{
              if(me.indexName.indexOf(item.title)!=-1)
              lyrobj = item; 
            })
          }
        } 
        me.loadLayer(lyrobj || {})
      },1500)
    },
    loadLayer(obj){
      if (!obj.url) return false;
      if (!obj) return
      const layerConf = {
        title: obj.title || '',
        url: obj.url || '',
        type: obj.type || 'feature', // type: "feature",
        useProxy: obj.useProxy || false,
        id: obj.title || ''        
      }
      
      const mapApp = this.$findMapApp("WarningProducts000")
      const layer = mapApp.findLayerById(layerConf.id)
      if (!layer) {
        this.$addLayerToMap({ mapApp: mapApp }, layerConf)
        //mapApp.addLayerToMap(layerConf)
      }      
    },
  },
  created () {
    this.pageTitle = this.$route.query.menuTypeName
    this.pageUnit = this.$route.query.menuTypeUnit
    this.pageZbEnum = this.$route.query.zbEnum
    this.params.city = this.$route.params.city
    this.params.area = this.$route.params.area
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.mbtDrawLine()
        this.mbbDrawLine()
      }, 1000)
    })
    this.initEchart()
    this.getIndexData()
  },
  destroyed () {
    window.removeEventListener(
      'resize',
      () => {
        let chartMBT = echarts.init(document.getElementById('chartMBT'))
        document.getElementById('chartMBT').style.width = 200 + 'px'
        document.getElementById('chartMBT').style.height = 210 + 'px'
        chartMBT.resize()

        if (
          (this.params.city == '' && this.params.area == '')
          || (this.params.city == undefined && this.params.area == undefined)
        ) {
          let chartMBB = echarts.init(document.getElementById('chartMBB'))
          document.getElementById('chartMBB').style.width = 200 + 'px'
          document.getElementById('chartMBB').style.height = 210 + 'px'
          chartMBB.resize() // 直接加这句即可
        } else if (
          (this.params.city != '' && this.params.area == '')
          || (this.params.city != undefined && this.params.area == undefined)
        ) {
          let chartMBB = echarts.init(document.getElementById('chartMBB'))
          document.getElementById('chartMBB').style.width = 400 + 'px'
          document.getElementById('chartMBB').style.height = 210 + 'px'
          chartMBB.resize() // 直接加这句即可
        }
      },
      20
    )
  },
  watch: {
    isShow (val) {
      if (val == true) {
        setTimeout(() => {
          this.mbtDrawLine()
          this.mbbDrawLine()          
        }, 0)     
      }
    },
    $route (to, from) {
      this.pageTitle = this.$route.query.menuTypeName
      this.pageUnit = this.$route.query.menuTypeUnit
      this.pageZbEnum = this.$route.query.zbEnum
      if (this.pageZbEnum) {
        this.getIndexData()
      }     
    },
    params: {
      immediate: true,
      deep: true,
      handler (val) {
        this.params = val
        this.getIndexData()       
        console.log(val)
        console.log(this.params)
      }
    },
    pageZbEnum: {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          this.mbtDrawLine()
          this.mbbDrawLine()
        }, 0)
      }
    }
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
.page-warning {
  width: 100%;
  height: 100% !important;
  background-color: #f7f7f7;
  padding: 16px 24px;
  display: flex;
  justify-content: flex-start;
}
.warning-title {
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
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
.warning-map {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}
.warning-map-nototal {
  width: calc(100% - 400px);
}
.warning-map-total {
  width: 100%;
}
.warning-menu {
  width: 350px;
  height: 230px;
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #fff;
  padding: 10px;
}
.warning-menu-index {
  height: 100px;
  position: relative;
  border-bottom: 2px solid #e9e6e6;
}
.warning-menu div.warning-menu-index:last-child {
  border-bottom: 0px solid #e9e6e6;
}
.index-type {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  color: #303030;
}
.index-type__other {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #303030;
}
.index-data span.succeed {
  font-size: 20px;
  color: #70b603;
}
.index-data span.nosucceed {
  font-size: 20px;
  color: #d9001b;
}
.index-data span.target {
  font-size: 16px;
  color: #303030;
  font-weight: 700;
}
.index-data span:nth-child(2) {
  font-size: 12px;
  color: #c9c9c9;
  margin-left: 10px;
}
.index-button {
  height: 21px;
  width: 100%;
  color: #02a7f0;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  bottom: 0px;
}
.index-button span {
  cursor: pointer;
}
.warn-chart-box {
  width: 400px;
  height: 210px;
  display: flex;
}
.warn-chart {
  width: 400px;
  height: 210px;
}
.chart-title {
  width: 100%;
  height: 40px;
  background-color: #02a7f0;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chart-content-show {
  width: 400px;
  height: 210px;
  display: flex;
  position: relative;
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
.monitor-left-number-box {
  width: 100%;
  height: 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: #fff;
}
.monitor-left-number-title {
  height: 100%;
  width: 50%;
  font-size: 16px;
  line-height: 21px;
  color: #404040;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.monitor-left-number-number {
  height: 100%;
  width: 50%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #404040;
}
.monitor-left-number-number span {
  font-size: 18px;
  color: #9dd31c;
}
.monitor-left-number-number span.succeed {
  font-size: 20px;
  color: #9dd31c;
}
.monitor-left-number-number span.nosucceed {
  font-size: 20px;
  color: #ffa200;
}
.monitor-left-number-title__other {
  height: 100%;
  width: 50%;
  font-size: 16px;
  line-height: 21px;
  color: #a0a0a0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.monitor-left-number-number__other {
  height: 100%;
  width: 50%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #cdcdcd;
}
.monitor-left-number-number__other span {
  font-size: 16px;
  color: #cdcdcd;
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
  z-index: 0;
}
.map-top-title {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  padding: 0 16px;
  color: #7c8196;
}
.return-icon {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(124, 129, 150, 1);
  cursor: pointer;
}
/* @media screen and (max-width: 1910px) {
  .chart-content-show {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 10px;
  }
  .warn-chart {
    width: 300px;
    height: 440px;
    position: absolute;
    top: 50px;
    right: 50px;
    background-color: #fff;
  }
} */
@media screen and (max-width: 1599px) {
  .page-warning {
    height: 772px;
  }
}
</style>
