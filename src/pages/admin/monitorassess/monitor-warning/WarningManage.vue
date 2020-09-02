<template>
  <div class="page-warning">

    <!-- 左边菜单 -->
    <div style="position: relative;z-index:200;">
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
            <span class="main-menu-title">底线管控</span>
          </el-header>
          <el-main class="main-warn">
            <div class="warn-menu-first-box"
                 v-for="(item, index) in indexList"
                 :key="index">
              <div class="warn-menu-first-left" @click="menuClick(item, index)">
                <div class="warn-menu-first-left-title"
                     :class="{titleChange:item.title.length>13}">
                  {{ item.title }}
                </div>
                <div class="warn-menu-first-left-number">

                  <span class="left-year">{{ item.year }}年</span>
                  <div class="warn-menu-first-left-number-right">
                    <span :class="{
                succeed: item.isindexStandard == 0,
                nosucceed: item.isindexStandard == 1
              }">{{ item.number }}</span>
                    <span class="number-unit">{{ item.unit }}</span>
                  </div>
                </div>
              </div>
              <div class="warn-menu-first-right">
                <span @click="handleClickShow(item)">预警总览</span>
                <i></i>
                <span @click="handleClickMenu(item)">预警清单</span>
              </div>
            </div>
          </el-main>
          <div style="width:100%;min-height:16px;background:#fff;"></div>
        </el-container>
      </transition>
    </div>
    <!-- 右边地图 -->
    <div class="warning-map"
         :class="{
          'warning-map-nototal': isShow,
          'warning-map-total': !isShow
        }">
      <div class="map-big-box">
        <div class="map-top-title"
             style="position: static;z-index:100;">
        </div>
        <div style="width:100%;height:calc(100% - 40px);">
          <epf-mapview name="WarningManage000" :delay="1">
            <div class="toolbar">
              <!-- <zoom></zoom> -->
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
import moment from 'moment'

import gisMixin from '../mixins/gis'
export default {
  name: 'WarningManage',
  mixins: [gisMixin],
  components: {
    layerlist:()=>import("@/pages/admin/onemap/toolbarItem/layerlist"),
    basemap:()=>import("@/pages/admin/onemap/toolbarItem/basemap"),
  },
  data () {
    return {
      indexList: [],
      params: {
        province: '440000',
        city: '',
        area: '',
        year: moment().year()
      },

      areaType: 2,

      indexMapList: [],
      indexDetail: [],
      isShow: true,
      isact:[false,false,false,false,false,false,false,false,false,false,false,false]
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    menuClick(item,index){
      var obj = {};
      if(item.title=="永久基本农田保护面积"){
        obj = {
          title: '永久基本农田划定',
          type: 'wmts',
          useProxy: false,
          url: 'http://19.15.73.111/arcgisserver12/rest/services/三线管控/永久基本农田划定/MapServer'
        }
      }
      this.isact[index] = !this.isact[index]
      this.loadLayer(obj,this.isact[index])
    },
    loadLayer(obj,bol){
      if (obj.url == '') return
      if (!obj) return
      const layerConf = {
        title: obj.title || '',
        url: obj.url || '',
        type: obj.type || 'feature', // type: "feature",
        useProxy: obj.useProxy || false,
        id: obj.title || ''        
      }
      
      const mapApp = this.$findMapApp("WarningManage000")
      const layer = mapApp.findLayerById(layerConf.id)
      if (bol) {
        if (!layer) {
          this.$addLayerToMap({ mapApp: mapApp }, layerConf)
          //mapApp.addLayerToMap(layerConf)
        }       
      } 
      if (layer) {
        layer.visible = bol;
        // mapApp.setLayerVisiblity(layerConf.id, bol)
      }
    },
    showProjectMenu () {
      this.isShow = !this.isShow
    },
    handleClickShow (item) {
      this.$bus.$emit('aeraMessage', this.params)
      let title = item.title + '预警总览'
      let lyrobj={}
      if(title.indexOf("永久基本农田保护")>=0){
        lyrobj = {
          title: '永久基本农田',
          type: 'wmts',
          useProxy: false,
          url: 'http://19.15.73.111/arcgisserver12/rest/services/三线管控/永久基本农田划定/MapServer'
        }
      }
      if(lyrobj){
        var lyrArr = JSON.parse(sessionStorage.getItem("lyrobj")) || [];
        lyrArr.push(lyrobj)
        sessionStorage.setItem("lyrobj",JSON.stringify(lyrArr))
      }
      let routerPath = `WarningProducts?menuTypeName=${item.title}&menuTypeUnit=${item.unit}&zbEnum=${item.zbEnum}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        name: 'WarningProducts',
        query: {
          menuTypeName: item.title,
          menuTypeUnit: item.unit,
          zbEnum: item.zbEnum, 
          lyrobj:lyrobj,        
        },
        params: { city: this.params.city, area: this.params.area }
      })
    },
    handleClickMenu (item) {
      let title = item.title + '预警清单'
      let routerPath = `WarningMenuTable?menuTypeName=${item.title}&menuTypeUnit=${item.unit}&zbEnum=${item.zbEnum}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        name: 'WarningMenuTable',
        query: {
          menuTypeName: item.title,
          menuTypeUnit: item.unit,
          zbEnum: item.zbEnum
        },
        params: { city: this.params.city, area: this.params.area }
      })
    },
    async getIndexData () {
      let params = this.params
      let res = await this.$get(
        '/epf-monitor-evaluation/earlyWarn/bottomLine/queryList',
        params
      )
      if (res.code === 0) {
        let indexList = res.result
        for (var key in indexList) {
          if (indexList[key].indexValue == null) {
            let index = key
            indexList[index].indexValue = '- -'
          }
          if (indexList[key].indexValue < indexList[key].planValue) {
            this.indexList.push({
              title: indexList[key].name,
              number: indexList[key].indexValue,
              unit: indexList[key].unit,
              year: indexList[key].year,
              isindexStandard: 1,
              zbEnum: indexList[key].zbEnum
            })
          } else {
            this.indexList.push({
              title: indexList[key].name,
              number: indexList[key].indexValue,
              unit: indexList[key].unit,
              year: indexList[key].year,
              isindexStandard: 0,
              zbEnum: indexList[key].zbEnum
            })
          }
        }
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
    }
  },
  created () {
    this.getIndexData()
    this.getMapIndexData()
    this.getgetMapIndexDetail()
  },
  mounted () { },
  watch: {
    params: {
      immediate: true,
      deep: true,
      handler (val) {
        this.getIndexData()
        this.getMapIndexData()
        this.getgetMapIndexDetail()
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
  padding-left: 20px;
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
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  padding: 0 16px;
  color: #7c8196;
}
.warning-menu {
  width: 400px;
  height: 100%;
  background-color: #fff;
  padding: 10px;
  overflow: auto;
}
.warning-menu div.warning-menu-index:last-child {
  border-bottom: 0px solid #e9e6e6;
}
.warning-menu-index {
  height: 110px;
  position: relative;
  border-bottom: 2px solid #e9e6e6;
}
.index-type {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
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
.index-data span:nth-child(2) {
  font-size: 12px;
  color: #c9c9c9;
  margin-left: 10px;
}
.index-button {
  height: 42px;
  width: 100%;
  color: #02a7f0;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  bottom: 10px;
}
.index-button span {
  cursor: pointer;
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
.main-warn {
  background-color: #fff;
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 5px 24px 22px;
}
.main-warn::-webkit-scrollbar {
  display: none;
  width: 0px !important;
}
.warn-menu-first-box {
  width: 342px;
  height: 111px;
  display: flex;
  justify-content: flex-start;
  background-color: #fafafc;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin: 0px auto 16px;
}
.warn-menu-first-box.firstActive {
  background-color: #f4faff;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
  box-sizing: content-box;
}
.warn-menu-first-box:hover {
  background-color: #f4faff;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
  box-sizing: content-box;
}
.warn-menu-first-left {
  width: 264px;
  height: 100%;
  padding: 16px 0 16px 16px;
  /* background-color: #fafafc; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
}
.warn-menu-first-left.firstActiveBGC {
  background-color: #f4faff;
}
.warn-menu-first-left:hover {
  background-color: #f4faff;
}
.warn-menu-first-left-title {
  width: 100%;
  height: 24px;
  color: #202020;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.titleChange {
  width: 100%;
  height: 48px;
  color: #202020;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.warn-menu-first-left-number {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
}
.left-year {
  font-size: 16px;
  color: #707070;
}
.warn-menu-first-left-number-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.warn-menu-first-left-number-right span.succeed {
  font-size: 20px;
  color: #9dd31c;
}
.warn-menu-first-left-number-right span.nosucceed {
  font-size: 20px;
  color: #ffa200;
}
.warn-menu-first-left-number-right span.number-unit {
  font-size: 16px;
  color: #707070;
  margin-left: 5px;
}
.warn-menu-first-right {
  width: 88px;
  height: 100%;
  box-sizing: border-box;
  border-left: 1px solid #ececec;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.warn-menu-first-right__custom {
  width: 88px;
  height: 100%;
  box-sizing: border-box;
  border-left: 1px solid #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.warn-menu-first-right span {
  font-size: 16px;
  width: 100%;
  height: 55px;
  text-align: center;
  line-height: 55px;
  color: #50a5f4;
  cursor: pointer;
}
.warn-menu-first-right__custom span {
  font-size: 16px;
  color: #50a5f4;
  cursor: pointer;
}
.warn-menu-first-right i {
  width: 90%;
  height: 1px;
  display: block;
  background-color: #ececec;
  margin: 0 auto;
}
@media screen and (max-width: 1599px) {
  .page-warning {
    height: 772px;
  }
}
</style>
