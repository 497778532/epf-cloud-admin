<template>
  <keep-alive>
    <div class="page-body EPF-table"
         id="bindingIndex-box">
      <div class="bindingIndex-box-main">
        <!-- 左边菜单 -->
        <div style="position:relative;">
          <div @click="showProjectMenu"
               class="main-message"
               :class="{
            'main-messageR': isShow,
            'main-messageL': !isShow
          }"></div>
          <transition name="left">
            <!-- 左边图表 -->
            <div v-if="this.isShow == true"
                 style="width:400px;height:100%;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);position:relative;z-index:200;">
              <div class="fuken-chart-left-Box"
                   style="width:400px;height:100%;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);">
                <div class="monitor-left-top-box">
                  <div class="monitor-left-top">
                    <div class="display:flex;flex:1;">拆旧复垦{{this.detailTitle}}项目</div>
                  </div>
                  <div class="monitor-left-search">
                    <el-input v-model="projectData"
                              size="medium"
                              placeholder="请输入项目名称关键词"
                              :maxlength="50"></el-input>
                    <div class="primary_search_fuken"
                         @click="getProjectList">搜索</div>
                  </div>
                  <div style="width:100%;padding:0 24px;">
                    <el-table :data="indexData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                              stripe
                              v-loading="loading"
                              element-loading-text="数据加载中"
                              element-loading-background="rgba(255, 255, 255,0.95)"
                              style="width: 100%;min-height:80px;"
                              border>
                      <el-table-column prop="projectName"
                                       label="项目名称"
                                       min-width="150"
                                       align="center"
                                       :show-overflow-tooltip='true'>
                        <template slot-scope="scope">
                          <span style="color:#50A5F4;cursor:pointer;"
                                @click="handleClickDetail(scope.row)">{{scope.row.projectName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="useArea"
                                       label="用地面积(m²)"
                                       min-width="150"
                                       align="center"></el-table-column>
                    </el-table>
                    <div style="height:70px;margin:10px 0;display:flex;align-items: center; justify-content: flex-end;">
                      <el-pagination layout="total, prev, pager, next"
                                     :page-sizes="[5, 10, 15, 20]"
                                     @size-change="handleSizeChange"
                                     @current-change="handleCurrentChange"
                                     :total="this.indexData.length"
                                     :current-page.sync="currentPage"
                                     :page-size="pageSize"
                                     :pager-count="5"></el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </transition>
        </div>
        <!-- 右边地图 -->
        <div class="main-right-map"
             :class="{ 'main-right-map-nototal': isShow, 'main-right-map-total': !isShow }"
             style="position: relative;">
          <div class="map-big-box">
            <div class="map-top-title"
                 style="position:static;z-index:50;min-height:40px;height:40px">
            </div>

            <div style="width:100%;color:#fff;"
                 :class="{ 'main-right-map-nototal-height': isShowTop, 'main-right-map-total-height': !isShowTop }">
              <epf-mapview :delay="1"
                           name="monitoringProject"
                           :mapAppInitConf="myMapAppInitConf"
                           @viewLoaded="getMapApp">
                <epf-mapview-popup :visible="showPopup"
                                   :position="popupPosition"
                                   :content="popupContent"></epf-mapview-popup>
                <div class="toolbar">
                  <jumpto></jumpto>
                  <toolbox @click.stop.native="handleToolBoxClick"></toolbox>
                  <layerlist></layerlist>
                  <basemap></basemap>
                </div>
                <city-location>123</city-location>
                <epf-locate></epf-locate>
                <epf-upload></epf-upload>
                <epf-screenshot></epf-screenshot>
                <tool-panel @problemMessage="getProblem"
                            @show="showCondtion"
                            @problem="myProblem"></tool-panel>
              </epf-mapview>
            </div>

            <findProblem v-if="problemVisiblity"
                         @close="closeProblem"></findProblem>

            <div @click="showProjectTable"
                 class="main-messageH"
                 :class="{
            'main-messageT': isShowTop,
            'main-messageLB': !isShowTop
          }"></div>
            <transition name="top">
              <!-- 右侧底部表格 -->
              <div v-if="this.isShowTop == true"
                   style="width:100%;height:260px;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);position:static;z-index:2;">
                <div class="fuken-chart-left-Box"
                     style="width:100%;height:260px;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);">
                  <div class="monitor-right-bottom-box">
                    <div class="monitor-right-bottom">
                      <div class="display:flex;flex:1;">{{this.rightTableTitle}}</div>
                      <i class="el-icon-circle-close"
                         style="font-size:24px;color:#666;cursor:pointer;"
                         @click="offTable"></i>
                    </div>
                    <div style="width:100%;padding:0 16px;">
                      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                                stripe
                                max-height="180px"
                                v-loading="loading"
                                element-loading-text="数据加载中"
                                element-loading-background="rgba(255, 255, 255,0.95)"
                                style="width: 100%;min-height:75px;"
                                @row-click="fitFeature"
                                border>
                        <el-table-column prop="DKMC"
                                         label="地块名称"
                                         min-width="150"
                                         align="center"
                                         :show-overflow-tooltip='true'></el-table-column>
                        <el-table-column prop="DKYT"
                                         label="地块用途"
                                         min-width="150"
                                         align="center"
                                         :show-overflow-tooltip='true'></el-table-column>
                        <el-table-column prop="DKMJ"
                                         label="地块面积"
                                         min-width="150"
                                         align="center"
                                         :show-overflow-tooltip='true'></el-table-column>
                        <el-table-column prop="XMSZD_DSMC"
                                         label="所在城市"
                                         min-width="150"
                                         align="center"
                                         :show-overflow-tooltip='true'></el-table-column>
                        <el-table-column prop="XMSZD_QXMC"
                                         label="所在区县"
                                         min-width="150"
                                         align="center"
                                         :show-overflow-tooltip='true'></el-table-column>
                        <el-table-column prop="LXPZWH"
                                         label="批准文号"
                                         min-width="150"
                                         align="center"
                                         :show-overflow-tooltip='true'></el-table-column>
                        <el-table-column prop="LXPZDW"
                                         label="批准单位"
                                         min-width="150"
                                         align="center"
                                         :show-overflow-tooltip='true'></el-table-column>
                      </el-table>
                      <div style="height:40px;margin:5px 0;display:flex;align-items: center; justify-content: flex-end;">
                        <el-pagination layout="total, prev, pager, next"
                                       :page-sizes="[5, 10, 15, 20]"
                                       @size-change="handleSizeChange"
                                       @current-change="handleCurrentChange"
                                       :total="this.tableData.length"
                                       :current-page.sync="currentPage"
                                       :page-size="pageSize"
                                       :pager-count="5"></el-pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>
<script>
import qs from 'qs'
import { mapActions, mapState, mapMutations } from 'vuex'
import echarts from 'echarts'
import moment from 'moment'
import Bus from '../../../../utils/bus'
import commonecharts from '../../onemap/topic/commonecharts.js'
import '../../../../../static/map/js/province/guangdong'
import gisMixin from '../mixins/demolition'
import FindProblem from './FindProblem'
export default {
  name: 'ReclamationMonitor',
  mixins: [gisMixin],
  components: {
    FindProblem,
    layerlist: () => import("@/pages/admin/onemap/toolbarItem/layerlist"),
    basemap: () => import("@/pages/admin/onemap/toolbarItem/basemap"),
  },
  data () {
    return {
      isShow: true,
      isShowTop: false,
      detailTitle: '',
      projectData: '',
      indexData: [],
      tableData: [],
      rightTableTitle: '',
      loading: false,

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      problemVisiblity: false
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    showProjectMenu () {
      this.isShow = !this.isShow
    },
    showProjectTable () {
      this.isShowTop = !this.isShowTop
    },
    offTable () {
      this.isShowTop = false
    },
    getProjectList () {

    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.$data.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.currentPage = val // 页码改变
    },
    handleClickDetail (val) {
      this.rightTableTitle = val.projectName
      this.isShowTop = true
      fetch('http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/拆旧复垦/MapServer/0/query',{
      method: "POST",
      body: qs.stringify({
        where: 'XMMC=\'' + val.projectName + '\'',
        returnGeometry: true,
        outFields: '*',
        f: 'geojson'
      }),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then(res => {
      return res.json()
    }).then(data => {
      this.tableData = []
      data.features.forEach(element => {
        let rowinfo = element.properties
        rowinfo.geometry = element.geometry
        this.tableData.push(rowinfo)
      })
    })
    },
    fitFeature (row) {
      let mapApp = this.$findMapApp('monitoringProject')
      let extent = {
        xmin: 180,
        ymin: 90,
        xmax: -180,
        ymax: -90
      }
      row['geometry'].coordinates.forEach(ring => {
        ring.forEach(coords => {
          if (coords[0] < extent.xmin) {
            extent.xmin = coords[0]
          }
          if (coords[0] > extent.xmax) {
            extent.xmax = coords[0]
          }
          if (coords[1] < extent.ymin) {
            extent.ymin = coords[1]
          }
          if (coords[1] > extent.ymax) {
            extent.ymax = coords[1]
          }
        });
      });
      mapApp.view.extent = extent
    },
    closeProblem () {
      this.problemVisiblity = false
    },
    myProblem () {
      this.problemVisiblity = true
    }

  },
  created () {
    var toTable = JSON.parse(sessionStorage.getItem('toChaijiuChartType'))
    if (toTable === '项目立项情况') {
      this.detailTitle = '立项'
    } else if (toTable === '项目验收情况') {
      this.detailTitle = '验收'
    }
    fetch('http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/拆旧复垦/MapServer/0/query',{
      method: "POST",
      body: qs.stringify({
        where: '1=1',
        returnGeometry: false,
        groupByFieldsForStatistics: 'XMMC',
        outStatistics: JSON.stringify([{
          statisticType: "sum",
          onStatisticField: "DKMJ",
          outStatisticFieldName: "DKMJ"
        }]),
        f: 'geojson'
      }),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then(res => {
      return res.json()
    }).then(data => {
      data.features.forEach(element => {
        this.indexData.push({
          projectName: element.attributes.XMMC,
          useArea: element.attributes.DKMJ
        })
      })
    })
  },
  mounted () {
    this.$bus.$on('sendCityInfo', res => {
      if (res.id === '440000') {
        this.changeMenuCity = ''
      } else if (res.id != '440000') {
        this.changeMenuCity = res.id
      }
    })
  },
  watch: {
    $route (to, from) {
      var toTable = JSON.parse(sessionStorage.getItem('toChaijiuChartType'))
      if (toTable === '项目立项情况') {
        this.detailTitle = '立项'
      } else if (toTable === '项目验收情况') {
        this.detailTitle = '验收'
      }
    }
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";

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
.main-right-map-nototal-height {
  height: calc(100% - 300px);
}
.main-right-map-total-height {
  height: calc(100% - 40px);
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
.left-top-button-tab {
  color: #7c8196;
  font-size: 16px;
  cursor: pointer;
}
.left-top-button-tab:hover {
  color: #50a5f6;
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
.tb-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("../../../../assets/images/jcpgyj/project/tubiao.png");
  background-size: 24px 24px;
  margin: 0px 5px;
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
  z-index: 100;
}
.main-messageL {
  background-image: url("../../../../assets/images/jcpgyj/right.png");
  background-size: 40px 40px;
}
.main-messageR {
  background-image: url("../../../../assets/images/jcpgyj/left.png");
  background-size: 40px 40px;
}
.main-messageH {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 50px;
  cursor: pointer;
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: 0;
}
.main-messageLB {
  background-image: url("../../../../assets/images/jcpgyj/top.png");
  background-size: 40px 40px;
  bottom: 0px;
}
.main-messageT {
  background-image: url("../../../../assets/images/jcpgyj/bottom.png");
  background-size: 40px 40px;
  bottom: 260px;
}
.top-enter-active,
.top-leave-active {
  transition: all 0.1s ease;
  transform: translateY(0%);
}
.top-enter,
.top-leave {
  transform: translateY(100%);
}
.top-leave-to {
  transform: translateY(100%);
}
/* 详情 */
.fuken-chart-left-Box {
  /* height: 100%; */
  width: 400px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: #fff;
}
.fuken-chart-left-Box::-webkit-scrollbar {
  display: none;
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
  /* margin-left: auto; */
}
.EPFsuccess__custom {
  background: #9dd31c;
  color: #fff;
}
.EPFerror__custom {
  background: #f79861;
  color: #fff;
}
.monitor-left-top-box {
  /* height: 300px; */
  width: 400px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.monitor-left-top {
  width: 100%;
  height: 56px;
  padding: 0 24px;
  font-size: 18px;
  font-weight: bolder;
  color: #202020;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 2px solid #dcdcdc; */
}
.monitor-right-bottom-box {
  /* height: 300px; */
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.monitor-right-bottom {
  width: 100%;
  height: 30px;
  padding: 0 16px;
  font-size: 18px;
  color: #202020;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 2px solid #dcdcdc; */
}
.monitor-left-number-box {
  width: 100%;
  height: 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
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
.monitor-left-number-warn {
  height: 100%;
  width: 50%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
.zong-unit-mes {
  width: 100%;
  height: 21px;
  padding-left: 24px;
  color: #707070;
  line-height: 21px;
  font-size: 16px;
  margin-top: 16px;
}
.qushi-chart__diff {
  height: 310px;
  width: 400px;
  background-color: #fff;
  padding: 10px 24px;
}
.chart-tab-content-box__diff {
  width: 400px;
  height: 700px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-tab-content-return__diff {
  color: #707070;
  line-height: 21px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  margin-top: 16px;
}
.chart-tab-content-return-icon {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.sort-color1 {
  color: #50a5f6;
}
.sort-color2 {
  color: #50a5f6;
}
.zheng-icon {
  display: inline-block;
  width: 12px;
  height: 15px;
  background-image: url("../../../../assets/images/jcpgyj/project/zheng.png");
  background-size: 12px 15px;
  margin: 0px 5px;
}
.dao-icon {
  display: inline-block;
  width: 12px;
  height: 15px;
  background-image: url("../../../../assets/images/jcpgyj/project/dao.png");
  background-size: 12px 15px;
  margin: 0px 5px;
}
.chart-tab-content-main__diff {
  width: 400px;
  height: 650px;
  background-color: #fff;
  padding: 10px 24px;
  box-sizing: border-box;
}
.monitor-left-search {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 24px;
}
.primary_search_fuken {
  width: 64px;
  height: 36px;
  background: rgba(233, 243, 255, 1);
  border-radius: 2px;
  font-size: 16px;
  color: #50a5f4;
  border: 1px solid rgba(80, 165, 244, 1);
  text-align: center;
  line-height: 36px;
  display: inline-block;
  cursor: pointer;
  margin-left: 8px;
}
</style>
