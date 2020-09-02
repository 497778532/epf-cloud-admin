<template>
  <div class="page-body"
       id="bindingIndex-box">
    <div class="bindingIndex-box-main">
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
              <span class="main-menu-title">约束性指标（{{this.menuList.length}}）</span>
            </el-header>
            <el-main id="main-aside">
              <div class="main-aside-main">
                <div class="aside-list-box">
                  <div :class="['list-little-box',{'currentBgc':isCurrent===item.title}]"
                       v-for="(item, index) in menuList"
                       :key="index"
                       ref="item">
                    <div class="list-content">
                      <div class="list-content-title">{{item.title}}</div>
                      <div class="list-content-number-box">
                        <div class="list-content-number">
                          {{item.curUnit}}：
                          <span>{{item.curVal}}</span>
                          <i>{{item.unitName}}</i>
                        </div>
                        <div class="list-content-number">
                          {{item.expUnit}}：
                          <span>{{item.expVal}}</span>
                          <i>{{item.unitName}}</i>
                        </div>
                      </div>
                    </div>
                    <el-row class="list-conter-footer">
                      <el-col :span="16">
                        <div class="footer-left">
                          预警状态：
                          <span class="footer-left-text success-button"
                                v-if="item.isWarn==true&&item.dimness==1">正常</span>
                          <span class="footer-left-text error-button"
                                v-if="item.isWarn==false&&item.dimness==1">预警</span>
                          <span v-if="item.dimness==0">--</span>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div @click="handleMenuClick(item,'2')"
                             class="footer-right">
                          <span>监测详情</span>
                          <i class="el-icon-arrow-right"
                             style="color:#50A5F4;width:24px;height:24px;display:flex;justify-content: center;align-items: center;font-size:18px;margin-left:5px;"></i>
                        </div>
                      </el-col>
                    </el-row>
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
           :class="{ 'main-right-map-nototal': isShow, 'main-right-map-total': !isShow }">
        <div class="map-big-box"
             style="position:static;z-index:0;">
          <div class="map-top-title">
          </div>
          <div style="width:100%;height:calc(100% - 40px);color:#fff;">
            <epf-mapview :delay="1"
                         name="bindingIndex"
                         :mapAppInitConf="myMapAppInitConf">
              <epf-mapview-popup :visible="showPopup"
                                 :position="popupPosition"
                                 :content="popupContent"></epf-mapview-popup>
              <div class="toolbar">
                <toggle-map style="margin-right: 10px;width: 32px;"></toggle-map>
                <jumpto style="margin: 0px;"></jumpto>
                <zoom></zoom>
                <layerlist></layerlist>
                <basemap></basemap>
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
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import moment from 'moment'
import Bus from '../../../../utils/bus'
import commonecharts from '../../onemap/topic/commonecharts.js'
import '../../../../../static/map/js/province/guangdong'
import gisMixin from '../mixins/gis'
export default {
  name: 'BindingIndex',
  mixins: [gisMixin],
  components: {
    layerlist: () => import("@/pages/admin/onemap/toolbarItem/layerlist"),
    basemap: () => import("@/pages/admin/onemap/toolbarItem/basemap"),
  },
  data () {
    return {
      menuList: [],
      params: {
        province: '440000',
        city: '',
        area: '',
        year: moment().year()
      },
      isShow: true,
      isCurrent: '',
      isButton: '',
      tolist: {}
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    showProjectMenu () {
      this.isShow = !this.isShow
    },
    handleMenuClick (item, key) {
      this.isCurrent = item.title
      this.isButton = key

      let title = '约束性指标监测详情'
      let routerPath = 'MonitorDetail'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      this.tolist = {
        title: item.title,
        zbEnum: item.zbEnum,
        city: this.params.city,
        area: this.params.area,
        year: this.params.year
      }
      sessionStorage.setItem('toBindingMonitorlist', JSON.stringify(this.tolist))
    },
    async getMenuData () {
      let params = this.params
      let res = await this.$get(
        '/epf-monitor-evaluation/bindIndicator/queryList',
        params
      )
      if (res.code === 0) {
        let menuData = []
        for (var key in res.result) {
          if (res.result[key].indexValue < res.result[key].planValue) {
            let index = key
            res.result[index]['isWarn'] = false
            res.result[index]['dimness'] = 1
            //  this.$set(res.result[index], 'isWarn', true);
          } else if (res.result[key].indexValue > res.result[key].planValue) {
            let index = key
            res.result[index]['isWarn'] = true
            res.result[index]['dimness'] = 1
            //  this.$set(res.result[index], 'isWarn', false);
          } else if (
            res.result[key].indexValue == null
            && res.result[key].planValue == null
          ) {
            let index = key
            res.result[index]['dimness'] = 0
            //  this.$set(res.result[index], 'isWarn', false);
          }
          if (res.result[key].indexValue != null) {
            let index = key
            res.result[index].indexValue = Number(
              res.result[index].indexValue
            ).toFixed(2)
          } else {
            let index = key
            res.result[index].indexValue = '- -'
          }
          if (res.result[key].planValue != null) {
            let index = key
            res.result[index].planValue = Number(
              res.result[index].planValue
            ).toFixed(2)
          } else {
            let index = key
            res.result[index].planValue = '- -'
          }
          menuData.push({
            title: res.result[key].name,
            curVal: res.result[key].indexValue,
            curUnit: '现状值',
            expVal: res.result[key].planValue,
            expUnit: '规划值',
            unitName: res.result[key].unit,
            zbEnum: res.result[key].zbEnum,
            presentTime: '2019年12月27日',
            isWarn: res.result[key].isWarn,
            dimness: res.result[key].dimness
          })
        }
        this.menuList = menuData
      } else {
        this.$message.error(res.msg) // 失败
      }
    }
  },
  created () {
    this.getMenuData()
  },
  mounted () {
    const me = this
    this.myMapAppInitConf.map.xzqhService.disable = false
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', res => {
      const mapApp = me.$findMapApp(res)
      this.mapApp = mapApp
      mapApp.addLayerToMap({
        title: '永久基本农田划定',
        type: 'wmts',
        useProxy: false,
        url: 'http://19.15.73.111/arcgisserver12/rest/services/三线管控/永久基本农田划定/MapServer'
      })
      mapApp.addLayerToMap({
        title: '现状耕地',
        type: 'wmts',
        useProxy: false,
        url: 'http://19.15.73.111/arcgisserver12/rest/services/一张图展示界面/现状耕地/MapServer'
      })
    })
    this.$bus.$on('sendCityInfo', res => {
      if (res.id === '440000') {
        this.params.city = ''
        this.params.area = ''
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
        this.params.city = res.id
        this.params.area = ''
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
        this.params.city = '440100'
        this.params.area = res.id
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
        this.params.city = '440200'
        this.params.area = res.id
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
        this.params.city = '440300'
        this.params.area = res.id
      } else if (
        res.id === '440402'
        || res.id === '440403'
        || res.id === '440404'
      ) {
        this.params.city = '440400'
        this.params.area = res.id
      } else if (
        res.id === '440507'
        || res.id === '440511'
        || res.id === '440512'
        || res.id === '440513'
        || res.id === '440514'
        || res.id === '440515'
        || res.id === '440523'
      ) {
        this.params.city = '440500'
        this.params.area = res.id
      } else if (
        res.id === '440604'
        || res.id === '440605'
        || res.id === '440606'
        || res.id === '440607'
        || res.id === '440608'
      ) {
        this.params.city = '440600'
        this.params.area = res.id
      } else if (
        res.id === '440703'
        || res.id === '440704'
        || res.id === '440705'
        || res.id === '440781'
        || res.id === '440783'
        || res.id === '440784'
        || res.id === '440785'
      ) {
        this.params.city = '440700'
        this.params.area = res.id
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
        this.params.city = '440800'
        this.params.area = res.id
      } else if (
        res.id === '440902'
        || res.id === '440904'
        || res.id === '440981'
        || res.id === '440982'
        || res.id === '440983'
      ) {
        this.params.city = '440900'
        this.params.area = res.id
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
        this.params.city = '441200'
        this.params.area = res.id
      } else if (
        res.id === '441302'
        || res.id === '441303'
        || res.id === '441322'
        || res.id === '441323'
        || res.id === '441324'
      ) {
        this.params.city = '441300'
        this.params.area = res.id
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
        this.params.city = '441400'
        this.params.area = res.id
      } else if (
        res.id === '441502'
        || res.id === '441521'
        || res.id === '441523'
        || res.id === '441581'
      ) {
        this.params.city = '441500'
        this.params.area = res.id
      } else if (
        res.id === '441602'
        || res.id === '441621'
        || res.id === '441622'
        || res.id === '441623'
        || res.id === '441624'
        || res.id === '441625'
      ) {
        this.params.city = '441600'
        this.params.area = res.id
      } else if (
        res.id === '441702'
        || res.id === '441704'
        || res.id === '441721'
        || res.id === '441781'
      ) {
        this.params.city = '441700'
        this.params.area = res.id
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
        this.params.city = '441800'
        this.params.area = res.id
      } else if (
        res.id === '445102'
        || res.id === '445103'
        || res.id === '445122'
      ) {
        this.params.city = '445100'
        this.params.area = res.id
      } else if (
        res.id === '445202'
        || res.id === '445203'
        || res.id === '445222'
        || res.id === '445224'
        || res.id === '445281'
      ) {
        this.params.city = '445200'
        this.params.area = res.id
      } else if (
        res.id === '445302'
        || res.id === '445303'
        || res.id === '445321'
        || res.id === '445322'
        || res.id === '445381'
      ) {
        this.params.city = '445300'
        this.params.area = res.id
      }
    })
  },
  watch: {
    'params': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getMenuData()
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
#bindingIndex-box {
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  background-color: #f7f7f7;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#bindingIndex-box::-webkit-scrollbar {
  display: none;
}
.bindingIndex-box-main {
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
  justify-content: flex-end;
  align-items: center;
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
.main-aside-main {
  background-color: #fff;
  width: 100%;
  /* height: 100%; */
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 0px 24px 54px;
}
.main-aside-main::-webkit-scrollbar {
  display: none;
  width: 0px !important;
}
.aside-list-box .el-col-12 {
  text-align: center;
}
.aside-list-box .el-col-12 div {
  padding: 5px 0;
  cursor: pointer;
}
.list-little-box {
  position: relative;
  width: 100%;
  border-radius: 3px;
  background: #fafafa;
  color: #818181;
  margin: 0 auto;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  text-align: left;
  margin-bottom: 16px;
  padding: 5px 8px 6px 16px;
}

.list-little-box:last-child {
  margin-bottom: 0;
}
.list-little-box.currentBgc {
  background: #f6f9ff;
  border: 1px solid #1b74ee;
}

.list-little-box:hover {
  background: #f6f9ff;
  border: 1px solid #1b74ee;
}
.list-little-box .list-content-title {
  /* font-weight: bold; */
  font-size: 18px;
  line-height: 46px;
  color: #202020;
}
.list-content-title {
  line-height: 30px;
}
.list-content-number-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 55px;
  font-size: 16px;
  color: #000;
}
.list-content-number {
  width: 100%;
  height: 100%;
  font-size: 16px;
  line-height: 21px;
  color: #505050;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.list-content-number span {
  font-size: 18px;
  color: #ffa200;
  /* font-weight: bolder; */
}
.list-content-number i {
  font-size: 14px;
  color: #707070;
  margin-left: 5px;
  /* font-weight: bolder; */
}
.list-conter-footer {
  /* background-color: #eeeeee; */
  border-top: #c6c6c6;
}
.footer-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  cursor: default !important;
  font-size: 16px;
  line-height: 21px;
  color: #505050;
}
.footer-left span.footer-left-text {
  margin-left: 0px;
}
.footer-left-text {
  width: 56px;
  height: 24px;
  border-radius: 2px;
  padding: 2px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  /* margin-left: auto; */
}
.success-button {
  background: #9dd31c;
  color: #fff;
}
.error-button {
  background: #f79861;
  color: #fff;
}
.footer-right {
  height: 40px;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #50a5f4;
  cursor: pointer;
}
</style>
<style>
#main-aside .el-row {
  margin-bottom: 0px;
}
.main-aside-main::-webkit-scrollbar {
  display: none;
  width: 0px !important;
}
</style>
