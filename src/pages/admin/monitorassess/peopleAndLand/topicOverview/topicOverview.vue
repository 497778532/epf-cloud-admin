<template>
  <div class="page-body"
       id="subject-box">
    <div class="left"
         :class="{ 'left-true': isShow, 'left-false': !isShow }">
      <div class="left-top"
           v-show="this.rightItemMessageTitle !==''">
        <epf-title :title="this.rightItemMessageTitle"
                   :class="[!isMapPattern || rightItemMessageTitle==='其他建设用地情况'?'haveStyle':'noneStyle']"></epf-title>
        <div class="left-top-button"
             v-show="isShowCurrentTab == 2">
          <div class="left-top-button-tab"
               :class="{ active: currentTab === 2 }"
               @click="turnThird">
            返回
          </div>
          <span>丨</span>
          <div class="left-top-button-tab"
               :class="{ active: currentTab === 3 }"
               @click="turnFourth"
               style="margin-left: -13px;">
            <div v-if="isMapPattern"
                 style="display: flex;align-items: center;justify-content: center;"><img src="./images/图表模式2x.png"
                   alt=""><span>图表模式</span></div>
            <div v-if="!isMapPattern"
                 style="display: flex;align-items: center;justify-content: center;"><img src="./images/地图模式2x.png"
                   alt=""><span>地图模式</span></div>
          </div>
        </div>
        <div class="left-top-button"
             v-show="isShowCurrentTab == 8"
             @click="turnThird"
             style="cursor:pointer;">返回</div>
      </div>
      <div class="otherTable EPF-table"
           id="chart-box"
           v-if="isShowCurrentTab == 8"
           style="box-shadow: none;">
        <div class="otherTableHead">
          <div class="chart-select-top__button chart-select">
            <el-button-group>
              <el-button :type="this.current == 0 ? 'primary' : ''"
                         @click="turnTopFirst">区域格局</el-button>
              <el-button :type="this.current == 1 ? 'primary' : ''"
                         @click="turnTopSecond">片区</el-button>
              <el-button :type="this.current == 2 ? 'primary' : ''"
                         @click="turnTopThird">地级以上市</el-button>
              <!-- <el-button :type="this.current==3?'primary':''"
                     @click="turnTopFourth">县区</el-button> -->
            </el-button-group>
            <el-select v-model="chartValue"
                       filterable
                       placeholder="请选择市"
                       style="margin-left:15px;width:170px;"
                       @change="handleChangeArea"
                       v-show="this.current == 2">
              <el-option v-for="item in othersChartOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <el-select v-model="xianValue"
                       filterable
                       placeholder="请选择县"
                       style="margin-left:15px;width:170px;"
                       @change="handleChangeXian"
                       v-show="this.current == 2"
                       v-if="showXian">
              <el-option v-for="item in xianOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <!-- <el-button :type="this.current == 2? '' : ''"
                     @click="handleChangePlace" v-show="this.current == 2">请选择县</el-button> -->
            <el-select v-model="yearVal"
                       placeholder="请选择年份"
                       style="margin-left:15px;width:100px;"
                       @change="yearNameSelect()">
              <el-option v-for="item in yearInput"
                         :key="item"
                         :label="item"
                         :value="item"></el-option>
            </el-select>
            <el-select v-model="unitsVal"
                       placeholder="请选择单位"
                       style="margin-left:15px;width:100px;"
                       @change="unitNameSelect()">
              <el-option v-for="item in units"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div style="cursor: pointer;
    color: rgb(64, 158, 255);
    width: 80px;
    height: 20px;"
               @click="downOther">下载文档</div>
        </div>
        <div class="selectHeader">
          <div>
            <div>信息列筛选：</div>
            <el-checkbox label="序号"
                         disabled
                         checked
                         style="padding-left: 5px;"></el-checkbox>
            <el-checkbox label="行政区"
                         disabled
                         checked
                         style="padding-left: 5px;"></el-checkbox>
            <el-checkbox-group v-model="checkedCities"
                               @change="handleCheckedCitiesChange">
              <!-- <el-checkbox label="行政区" disabled></el-checkbox> -->
              <!-- <el-checkbox v-for="city in testtableHead" :label="city.other_comment" :key="city" v-show="city.other_comment == '行政区'" disabled checked>{{city.other_comment}}</el-checkbox> -->
              <el-checkbox v-for="city in cities"
                           :label="city"
                           :key="city"
                           style="padding: 5px;">{{city}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox :indeterminate="isIndeterminate"
                         v-model="checkAll"
                         @change="handleCheckAllChange"
                         style="padding-left: 5px;">全部取消</el-checkbox>
            <span>（最多可选择7项）</span>
          </div>
          <div style="padding: 10px;">{{this.unitName}}</div>
          <div style="width:100%;height:92%;position: relative;">
            <el-table :data="
            testOtherTableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
                      v-loading="loading"
                      element-loading-text="数据加载中"
                      element-loading-background="rgba(255, 255, 255,0.95)"
                      style="width: 100%;min-height:80px;margin-bottom:10px;"
                      border>
              <el-table-column label="序号"
                               align="center">
                <template slot-scope="scope"
                          min-height:
                          100px;>{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column v-for="(item, index) in testtableHead"
                               :prop="item.other_name"
                               :label="item.other_comment"
                               align="center"
                               :key="index"></el-table-column>
              <!-- <el-table-column label="达标情况"
                           align="center">
            <template v-if="projectTableData.compliance===0">
              <el-button type="success"
                         plain>成功按钮</el-button>
            </template>
          </el-table-column> -->
            </el-table>
            <div style="position: absolute;right:0px;">
              <el-pagination background
                             layout="total, prev, pager, next,sizes,jumper"
                             :page-sizes="[5, 10, 15, 20]"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :total="this.testOtherTableData.length"
                             :current-page.sync="currentPage"
                             :page-size="pageSize"></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="left-bottom"
           v-show="isMapPattern"
           v-if="addPattern">
        <div class="left-bottom-map"
             v-if="isShowCurrentTab == 1">
          <div class="topSecond">
            <div class="houseBox">
              <div class="houseBoxTop">
                <div>
                  <img src="./images/城镇住宅用地备份2x.png"
                       alt="" /><span>城镇住宅用地</span></div>
                <div><span>{{ this.indexValueDouble3 }}</span><span>{{ this.indexValueUnit3 }}</span></div>
              </div>
              <div class="houseBoxBottom">
                <div class="houseBoxBottom1"
                     @click.stop="toMap(0)">
                  <div class="houseSmallTitle1"><img src="./images/占比2x.png"
                         alt=""><span>城镇开发边界内住宅用地占比</span></div>
                  <div class="standardRight">
                    <div class="number greenStyle">{{this.persent1}}</div>
                    <div class="houseSmallTitle2">标准值 25-40%</div>
                  </div>
                  <div class="imgFlex">
                    <img src="./images/指针2x.png"
                         style="position: absolute;z-index: 99;bottom: -15px;left: 27%;"
                         alt="" />
                    <img src="./images/城镇开发边界内住宅用地占比备份2x.png"
                         alt=""
                         class="imgStyle"
                         style="transform: unset;" />
                  </div>
                </div>
                <div class="houseBoxBottom2"
                     @click.stop="toMap(1)">
                  <div class="houseSmallTitle1">
                    <img src="./images/人均2x.png"
                         alt=""><span>人均住宅用地面积（平方米/人）</span>
                  </div>
                  <div class="standardRight">
                    <div class="number greenStyle">{{this.persent2}}㎡</div>
                    <div class="houseSmallTitle2">标准值 25-38 平方米/人</div>
                  </div>
                  <div class="imgFlex">
                    <img src="./images/指针2x.png"
                         style="position: absolute;z-index: 99;bottom: -15px;left: 28%;"
                         alt="" />
                    <img src="./images/人均住宅用地面积备份2x.png"
                         alt=""
                         class="imgStyle"
                         style="transform: unset;" /></div>
                </div>
              </div>
            </div>
            <div class="greenBox">
              <div class="houseBoxTop">
                <div>
                  <img src="./images/城镇公园绿地备份2x.png"
                       alt="" /><span>城镇公园绿地</span></div>
                <div><span>{{ this.indexValueDouble4 }}</span><span>{{ this.indexValueUnit4 }}</span></div>
              </div>
              <div class="houseBoxBottom">
                <div class="houseBoxBottom1"
                     @click.stop="toMap(2)">
                  <div class="houseSmallTitle1"><img src="./images/占比2x.png"
                         alt=""><span>公园绿地占比</span></div>
                  <div class="standardRight">
                    <div class="number orrange">{{this.persent3}}%</div>
                    <div class="houseSmallTitle2">标准值 10-15%</div>
                  </div>
                  <div class="imgFlex">
                    <img src="./images/指针2x.png"
                         style="position: absolute;z-index: 99;bottom: -15px;left: 4%;"
                         alt="" />
                    <img src="./images/公园绿地占比备份2x.png"
                         alt=""
                         class="imgStyle"
                         style="transform: unset;" /></div>
                </div>
                <div class="houseBoxBottom2"
                     @click.stop="toMap(3)">
                  <div class="houseSmallTitle1">
                    <img src="./images/人均2x.png"
                         alt=""><span>人均公园绿地面积（平方米/人）</span>
                  </div>
                  <div class="standardRight">
                    <div class="number orrange">{{this.persent4}}㎡</div>
                    <div class="houseSmallTitle2">标准值 8 平方米/人</div>
                  </div>
                  <div style="display: flex;align-items: center;justify-content: space-between;padding: 0px 3%;background: #f7f7f7;border-radius: 25px;margin: 0 3%;">
                    <div style="width: 35%;
    display: flex;
    justify-content: space-between;
    align-items: center;"><span>高标值</span><img src="./images/greenUp.png"
                           alt="" /><span>{{ this.greenLowNum }}个</span></div>
                    <div style="width: 35%;
    display: flex;
    justify-content: space-between;
    align-items: center;"><span>低标值</span><img src="./images/redDown.png"
                           alt="" /><span>{{ this.greenHighNum}}个</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="serviceBox"
                 style="margin-right:0;">
              <div class="houseBoxTop">
                <div>
                  <img src="./images/公共服务用地备份2x.png"
                       alt="" /><span>公共服务用地</span></div>
                <div><span>{{ this.indexValueDouble1 }}公顷</span>
                  <!-- <span>{{ this.indexValueUnit1 }}</span> -->
                </div>
              </div>
              <div class="houseBoxBottom">
                <div class="houseBoxBottom1"
                     @click.stop="toMap(4)">
                  <div class="houseSmallTitle1">
                    <img src="./images/占比2x.png"
                         alt=""><span>公共服务用地面积占比</span>
                  </div>
                  <div class="standardRight">
                    <div class="number greenStyle">{{this.persent5}}</div>
                    <div class="houseSmallTitle2">标准值 按排名</div>
                  </div>
                  <div class="imgFlex">
                    <img src="./images/公共服务用地占比备份2x.png"
                         class="imgStyle"
                         style="transform: unset;position: absolute;width: 93%;height: 40%;"
                         alt="" /></div>
                </div>
                <div class="houseBoxBottom2"
                     @click.stop="toMap(5)">
                  <div class="houseSmallTitle1">
                    <img src="./images/人均2x.png"
                         alt=""><span>人均公共服务用地面积（平方米/人）</span>
                  </div>
                  <div class="standardRight">
                    <div class="number greenStyle">{{this.persent6}}㎡</div>
                    <div class="houseSmallTitle2">标准值 5.5平方米/人</div>
                  </div>
                  <div style="display: flex;align-items: center;justify-content: space-between;padding: 0px 3%;background: #f7f7f7;border-radius: 25px;margin: 0 3%;">
                    <div style="width: 35%;display: flex;justify-content: space-between;align-items: center;"><span>高标值</span><img src="./images/greenUp.png"
                           alt="" /><span>{{ this.serverLowNum }}个</span></div>
                    <div style="width: 35%;display: flex;justify-content: space-between;align-items: center;"><span>低标值</span><img src="./images/redDown.png"
                           alt="" /><span>{{ this.serverHighNum }}个</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="topThird">
            <div class="threeTitle">
              <div class="smallTitle">
                <div class="title1"
                     :class="{ active: histogramTitle1 === 0 }"
                     @click="toHouse">
                  城镇住宅用地
                </div>
                <div class="title2"
                     :class="{ active: histogramTitle1 === 1 }"
                     @click="toGreen"
                     style="padding-top:0;">
                  城镇公园绿地
                </div>
                <div class="title3"
                     :class="{ active: histogramTitle1 === 2 }"
                     @click="toService">
                  城镇公共服务用地
                </div>
              </div>
              <div class="histogramTitle"
                   v-show="histogramTitle1 === 0">
                <div class="removeTen"
                     :class="{ active: histogramTitle2 === 0 }"
                     @click="toTitle1">
                  <img src="./images/占比2x.png"
                       alt=""><span>占比</span>
                </div>
                <div :class="{ active: histogramTitle2 === 1 }"
                     @click="toTitle2"
                     class="removeTen">
                  <img src="./images/人均2x.png"
                       alt=""><span>人均</span>
                </div>
              </div>
              <div class="histogramTitle"
                   v-show="histogramTitle1 === 1">
                <div class="removeTen"
                     :class="{ active: histogramTitle2 === 0 }"
                     @click="toTitle3">
                  <img src="./images/占比2x.png"
                       alt=""><span>占比</span>
                </div>
                <div :class="{ active: histogramTitle2 === 1 }"
                     @click="toTitle4"
                     class="removeTen">
                  <img src="./images/人均2x.png"
                       alt=""><span>人均</span>
                </div>
              </div>
              <div class="histogramTitle"
                   v-show="histogramTitle1 === 2">
                <div class="removeTen"
                     :class="{ active: histogramTitle2 === 0 }"
                     @click="toTitle5">
                  <img src="./images/占比2x.png"
                       alt=""><span>占比</span>
                </div>
                <div :class="{ active: histogramTitle2 === 1 }"
                     @click="toTitle6"
                     class="removeTen">
                  <img src="./images/人均2x.png"
                       alt=""><span>人均</span>
                </div>
              </div>
              <div class="yearBox">
                <div id="test"
                     class="hoverStyle"
                     @click="getYearData(index)"
                     v-for="(item, index) in label2"
                     :key="index"
                     :class="{ active: yearIndex == index }">{{item}}</div>
              </div>
              <div style="color:#1d7ce4;cursor:pointer;"
                   @click="toOtherTable">其他情况</div>
            </div>
            <div class="histogram">
              <div id="histogramBox">
                <div id="barChart"></div>
                <div style="display:flex;height:3%;padding-top: 2%;"
                     v-show="this.pageTitle !=='公共服务用地面积占比'">
                  <div class="addTitle">
                    <div class="titleRadius"
                         style="backgroundColor:#f59a23;"></div><span>低于标准区间：</span><span>{{this.underStandard}}个城市</span>
                  </div>
                  <div class="addTitle">
                    <div class="titleRadius"
                         style="backgroundColor:#70b603;"></div><span>处于标准区间：</span><span>{{this.middleData}}个城市</span>
                  </div>
                  <div class="addTitle">
                    <div class="titleRadius"
                         style="backgroundColor:#70b603;"></div><span>高于标准区间：</span><span>{{this.notReach}}个城市</span>
                  </div>
                </div>
              </div>
              <div class="rank">
                <div style="font-size: 16px;font-weight: bold;">
                  地市排名情况
                </div>
                <div class="rankBox">
                  <div class="rankLeft">
                    <div v-for="item in 21"
                         :key="item"
                         :class="item < 4? 'blackN' : 'whiteN'">{{item}}</div>
                  </div>
                  <div class="rankMiddle">
                    <div v-for="item in upCity"
                         :key="item.index"
                         class="seeLeft">{{item}}</div>
                  </div>
                  <div class="rankright">
                    <div v-for="item in upList"
                         :key="item.index"
                         class="seeLeft">{{item}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isShowCurrentTab === 2"
             style="width:100%;height:100%;">
          <epf-mapview :delay="1"
                       name="peopleAndLand"
                       @viewLoaded="getMapApp"
                       :mapAppInitConf="myMapAppInitConf">
            <epf-mapview-popup :visible="showPopup"
                               :position="popupPosition"
                               :content="popupContent">
            </epf-mapview-popup>
            <div class="toolbar">
              <toggle-map style="margin-right: 10px;width: 32px;"></toggle-map>
              <jumpto style="margin: 0px;"></jumpto>
              <!-- <toolbox style="margin: 0px;"
                       @click.stop.native="handleToolBoxClick"></toolbox> -->
              <zoom></zoom>
              <layerlist></layerlist>
              <basemap></basemap>
            </div>
            <city-location @sendCityInfo="updataCity"></city-location>
            <!-- <tool-panel></tool-panel> -->
          </epf-mapview>
          <div style="top: -50px;
    width: 405px;
    position: absolute;
    height: calc(100% + 50px);"
               class="hiddenScroll">
            <div @click="handleHidden"
                 class="middle-middle-message-box"
                 :class="{
            'middle-middle-message-boxR': ifClickHidden,
            'middle-middle-message-boxL': !ifClickHidden
          }"></div>
            <transition name="left">
              <detailList v-if="activeVue === 'detailList'"
                          @openImportant="vueChange"
                          :rightItemMessageTitleData="rightItemMessageTitle"
                          :citySpe="childCity"
                          :listSpe="childList"
                          :upCity="upCity"
                          :upList="upList"
                          @detailYear="toChildYear"
                          :downList="downList"
                          :downCity="downCity"
                          :getChild="toChild"
                          v-show="ifClickHidden"></detailList>
            </transition>
          </div>
          <!-- <stateDataTrends :data="detectionRouterData[routerIndex]"
                           @classDetails="openClassDetails"
                           @classIng="openClassIng"></stateDataTrends> -->
        </div>
      </div>
      <div class="left-bottom-fourth"
           v-if="!isMapPattern">
        <ProjectChart :chartAreasNameData="chartAreasName"
                      :chartDataFirst="chartData1"
                      :chartDataSecond="chartData2"
                      :chartLegendData="chartLegend"
                      :chartOptionsData="chartOptions1"
                      :chartXianData="chartOptions2"
                      :legendSelectedData="legendSelected"
                      :tableHeadData="tableHead"
                      :tableDataList="tableData"
                      :tableAddDataList="addDataList"
                      :yearListData="yearList"
                      :isShowData="isShow"
                      :controlButton="rightItemButton"
                      :rightItemMessageTitleData="rightItemMessageTitle"
                      @filterInfo="getFilterData"
                      :city="childCity"
                      :list="childList"
                      :checkCitied1="checkedCities">

        </ProjectChart>
      </div>
    </div>
  </div>
</template>
<script>
const cityOptions = ['商业服务业设施用地', '物流仓储用地', '工业用地', '采矿用地', '科教文卫用地', '公共设施用地', '机关团体新闻出版用地']
import DetailList from './people-land-component/DetailList'
import StateDataTrends from './people-land-component/StateDataTrends'
import axios from 'axios'
import echarts from 'echarts'
import ProjectChart from '../topicOverview/ProjectChart.vue'
import ControlMenu from '../topicOverview/ControlMenu.vue'
import '../../../../../../static/map/js/province/guangdong'
import gisMixin from '../../mixins/people'
import 'echarts-liquidfill/src/liquidFill.js'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  name: 'PeopleAndLand',
  mixins: [gisMixin],
  components: {
    ProjectChart,
    ControlMenu,
    DetailList,
    StateDataTrends,
    layerlist: () => import("@/pages/admin/onemap/toolbarItem/layerlist"),
    basemap: () => import("@/pages/admin/onemap/toolbarItem/basemap"),
  },
  data () {
    return {
      childYear: '2019',
      unitName: '单位：公顷',
      averTitleNum: [],
      averTitleNum1: [],
      averTitleNum2: [],
      averTitleNum12: [],
      greenHighNum: '',
      greenLowNum: '',
      serverHighNum: '',
      serverLowNum: '',
      ifClickHidden: true,
      yearIndex: '1',
      isShowMenuSpecial: '',
      showXian: false,
      itemStyleNnm: {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 25) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      },
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,
      checkAll: true,
      checkedCities: ['行政区', '商业服务业设施用地', '物流仓储用地', '工业用地', '采矿用地', '科教文卫用地', '公共设施用地', '机关团体新闻出版用地'],
      cities: cityOptions,
      isIndeterminate: false,
      yearVal: '2020',
      otherFilterData: {
        areaType: '3',
        province: '440000',
        city: '',
        area: '',
        unit: '',
        year: '2020',
        sortType: ''
      },
      selectYear: '2019',
      pageTitle: '城镇开发边界内住宅用地占比',
      under: [],
      higher: [],
      underStandard: '',
      middleData: '',
      notReach: '',
      unitsVal: 'HECTARE',
      units: [
        { label: '平方公里', value: 'SQUARE_KILOMETER' },
        { label: '亩', value: 'MU' },
        { label: '万亩', value: 'MILLION_MU' },
        { label: '平方米', value: 'SQUARE_METER' },
        { label: '万平方米', value: 'WAN_SQUARE_METER' },
        { label: '公顷', value: 'HECTARE' }
      ],
      yearInput: ['2020', '2019', '2018', '2017', '2016'],
      current: 2,
      chooseYear: 2019,
      standard: '标准区间',
      standard1: 25,
      standard2: 40,
      toChild: {},
      xyData: {},
      sortArr: [],
      downSortArr: [],
      upCity: [],
      upList: [],
      downCity: [],
      downList: [],
      persent1: '',
      persent2: '',
      persent3: '',
      persent4: '',
      persent5: '',
      persent6: '',
      barChartX: [],
      barChartY: [],
      paibarChartY: [],
      histogramTitle1: 0,
      histogramTitle2: 0,
      compliance1: '',
      indexValueDouble1: '',
      indexValueDouble3: '',
      indexValueDouble4: '',
      indexValueUnit1: '',
      indexValueUnit2: '',
      indexValueUnit3: '',
      indexValueUnit4: '',
      label1: ['15个城市', '19个城市'],
      label2: ['2018年', '2019年', '2020年'],
      detectionRouterData: [],
      scaleCalc1: '',
      scaleCalc2: '',
      scaleCalc3: '',
      scaleCalc4: '',
      scaleCalc5: '',
      scaleCalc6: '',
      comlianceStr1: '',
      comlianceStr2: '',
      comlianceStr3: '',
      comlianceStr4: '',
      comlianceStr5: '',
      comlianceStr6: '',
      mapCanShow: true,
      activeVue: 'detailList',
      data1: [],
      cityList: [],
      xianQuList: [],
      widgetConf: { widgets: [] },
      // 历年交易级联选择器
      qiOptions: [],
      props: {
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      qiYear: '',
      qiNumber: '',

      currentTab: 0,

      isShow: false,

      // 地图
      chart: null,
      timeFn: null,
      mapCode: '',
      pro: {
        广州市: '../../../../../../static/map/json/province/440100.json',
        韶关市: '../../../../../../static/map/json/province/440200.json',
        深圳市: '../../../../../../static/map/json/province/440300.json',
        珠海市: '../../../../../../static/map/json/province/440400.json',
        汕头市: '../../../../../../static/map/json/province/440500.json',
        佛山市: '../../../../../../static/map/json/province/440600.json',
        江门市: '../../../../../../static/map/json/province/440700.json',
        湛江市: '../../../../../../static/map/json/province/440800.json',
        茂名市: '../../../../../../static/map/json/province/440900.json',
        肇庆市: '../../../../../../static/map/json/province/441200.json',
        惠州市: '../../../../../../static/map/json/province/441300.json',
        梅州市: '../../../../../../static/map/json/province/441400.json',
        汕尾市: '../../../../../../static/map/json/province/441500.json',
        河源市: '../../../../../../static/map/json/province/441600.json',
        阳江市: '../../../../../../static/map/json/province/441700.json',
        清远市: '../../../../../../static/map/json/province/441800.json',
        东莞市: '../../../../../../static/map/json/province/441900.json',
        中山市: '../../../../../../static/map/json/province/442000.json',
        潮州市: '../../../../../../static/map/json/province/445100.json',
        揭阳市: '../../../../../../static/map/json/province/445200.json',
        云浮市: '../../../../../../static/map/json/province/445300.json'
      },
      allData: [],

      rightItemMessage: '',
      rightItemMessageTitle: '',
      rightItemButton: '2',
      isShowCurrentTab: 1, // 1为流向//2为gis//3位数据
      isMapPattern: true,
      addPattern: true,
      tableHead: [],
      tableData: [],
      testOtherTableData: [],
      testtableHead: [
        {
          other_name: 'xingzheng',
          other_comment: '行政区'
        },
        {
          other_name: 'shangye',
          other_comment: '商业服务业设施用地'
        },
        {
          other_name: 'wuliu',
          other_comment: '物流仓储用地'
        },
        {
          other_name: 'gongye',
          other_comment: '工业用地'
        },
        {
          other_name: 'caikuang',
          other_comment: '采矿用地'
        },
        {
          other_name: 'kejiao',
          other_comment: '科教文卫用地'
        },
        {
          other_name: 'gonggong',
          other_comment: '公共设施用地'
        },
        {
          other_name: 'jiguan',
          other_comment: '机关团体新闻出版用地'
        }
      ],
      yearList: [],
      filterData: {
        areaType: '3',
        province: '440000',
        city: '',
        area: '',
        unit: '',
        year: '2019',
        sortType: ''
        // type: '3',
        // citys: '',
        // areas: '',
        // unit: '',
        // year: '2019',
        // amountOrderFlag: '',
        // areaOrderFlag: '',
        // rankVal: '',
        // dataFlag: ''
      },

      chartOptions: [],
      chartOptions1: [],
      chartOptions2: [],
      otherChartOptions: [],
      othersChartOptions: [],
      xianOptions: [],
      chartValue: '',
      xianValue: '',
      addDataList: {},

      childCity: [],
      childList: []
    }
  },
  methods: {
    toChildYear (val) {
      if (val) {
        this.childYear = val
      } else {
        this.childYear = '2019'
      }
      console.log(this.childYear)
      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/boundaryRatioScale?year=${this.childYear}`, {}).then(res => {
        if (res.code === 0) {
          this.persent1 = res.result[0].scaleCalc.toFixed(2) + '%'
          this.toChild.persent1 = this.persent1
        } else {
          this.$message.error(res.msg)// 失败
        }
      })

      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/residentialAreaPerCapitaScale?year=${this.childYear}`, {}).then(res => {
        if (res.code === 0) {
          this.persent2 = res.result[0].areaPerCapitaCalc.toFixed(2)
          this.toChild.persent2 = this.persent2
        } else {
          this.$message.error(res.msg)// 失败
        }
      })

      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/proportionOfGreenScale?year=${this.childYear}`, {}).then(res => {
        if (res.code === 0) {
          this.persent3 = res.result[0].proportionOfParkGreenClac.toFixed(2)
          this.toChild.persent3 = this.persent3
        } else {
          this.$message.error(res.msg)// 失败
        }
      })

      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/parkGreenAreaPerCapitaScale?year=${this.childYear}`, {}).then(res => {
        if (res.code === 0) {
          this.persent4 = res.result[0].areaPerCapitaCalc.toFixed(2)
          this.toChild.persent4 = this.persent4
        } else {
          this.$message.error(res.msg)// 失败
        }
      })

      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/publicServiceAreaRatioScale?province=440000&city=&area&unit=&year=${this.childYear}&areaType=5`, {}).then(res => {
        if (res.code === 0) {
          this.persent5 = res.result[0].scaleCalc.toFixed(2) + '%'
          this.toChild.persent5 = this.persent5
        } else {
          this.$message.error(res.msg)// 失败
        }
      })

      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/perCapitaPublicServiceAreaScale?province=440000&city=&area&unit=&year=${this.childYear}&areaType=5`, {}).then(res => {
        if (res.code === 0) {
          this.persent6 = res.result[0].perPublicServArea.toFixed(2)
          this.toChild.persent6 = this.persent6
        } else {
          this.$message.error(res.msg)// 失败
        }
      })
    },
    getTitleNum () {
      this.$http.get('/api/epf-monitor-evaluation/manlandRel/parkGreenAreaPerCapitaListAndSum?province=440000&city=&area&unit=&year=2019&areaType=3', {}).then(res => {
        if (res.code === 0) {
          if (res.result) {
            var j = 0
            this.averTitleNum = []
            this.averTitleNum1 = []
            res.result.forEach(item => {
              this.averTitleNum.push(item.areaPerCapita.toFixed(2))
            })
            for (let i in this.averTitleNum) {
              if (Number(this.averTitleNum[i]) < 8) {
                this.averTitleNum1[j++] = this.averTitleNum[i]
              }
            }
            this.greenHighNum = this.averTitleNum1.length
            this.greenLowNum = 21 - this.greenHighNum
          }
        }
      })
      this.$http.get('/api/epf-monitor-evaluation/manlandRel/perCapitaPublicServiceAreaAndSum?province=440000&city=&area&unit=&year=2019&areaType=3', {}).then(res => {
        if (res.code === 0) {
          if (res.result) {
            var q = 0
            this.averTitleNum2 = []
            this.averTitleNum12 = []
            res.result.forEach(item => {
              this.averTitleNum2.push(item.perPublicServArea.toFixed(2))
            })
            for (let i in this.averTitleNum2) {
              if (Number(this.averTitleNum2[i]) < 5.5) {
                this.averTitleNum12[q++] = this.averTitleNum2[i]
              }
            }
            this.serverHighNum = this.averTitleNum12.length
            this.serverLowNum = 21 - this.serverHighNum
          }
        }
      })
    },
    handleHidden () {
      this.ifClickHidden = !this.ifClickHidden
    },
    downOther () {
      window.open(
        `/api/epf-monitor-evaluation/manlandRel/otherAreaListAndSumExport?province=440000&city=${this.otherFilterData.city}&area&year=${this.otherFilterData.year}&unit=${this.otherFilterData.unit}&areaType=${this.otherFilterData.areaType}&sortType=${this.otherFilterData.sortType}`
      )
    },
    handleChangeArea (val) {
      if (val == '00') {
        this.chartValue = '全部'
        this.showXian = false
        this.otherFilterData.area = ''
        // this.chartValue = ''
        this.otherFilterData.city = ''
        this.current = 2
        this.otherFilterData.areaType = '3'
        this.requestOtherData()
      } else {
        this.showXian = true
        this.xianValue = ''
        this.otherFilterData.area = ''
        this.otherFilterData.areaType = '3'
        this.otherFilterData.city = val
        this.requestOtherData()
      }
    },
    handleChangeXian (val) {
      if (val == 0) {
        this.otherFilterData.area = ''
        //  this.chartValue = ''
        this.otherFilterData.areaType = '4'
        this.requestOtherData()
      } else {
        this.otherFilterData.areaType = '4'
        // this.xianValue = val
        this.otherFilterData.area = val
        this.requestOtherData()
      }
    },
    // handleChangePlace() {
    //   this.chartValue = ''
    //   this.otherFilterData.areaType = '4'
    //   this.requestOtherData()
    // },
    requestOtherData () {
      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/otherAreaListAndSum?province=440000&city=${this.otherFilterData.city}&area=${this.otherFilterData.area}&year=${this.otherFilterData.year}&unit=${this.otherFilterData.unit}&areaType=${this.otherFilterData.areaType}&sortType=${this.otherFilterData.sortType}`, {}).then(res => {
        if (res.code === 0) {
          this.testOtherTableData = []
          res.result.forEach(item => {
            if (this.otherFilterData.areaType !== '4') {
              this.testOtherTableData.push({
                xingzheng: item.dictTranslate.cityName,
                shangye: Number(item.commercialServiceFacilityLand).toFixed(
                  2
                ),
                wuliu: Number(
                  item.logisticsStorageLand
                ).toFixed(2),
                gongye: Number(
                  item.industrialLand
                ).toFixed(2),
                caikuang: Number(
                  item.miningLand
                ).toFixed(2),
                kejiao: Number(
                  item.cultureAndHealthLand
                ).toFixed(2),
                gonggong: Number(
                  item.publicFacilitiesLand
                ).toFixed(2),
                jiguan: Number(
                  item.pressAndPublicationLand
                ).toFixed(2)
              })
              if (this.otherFilterData.areaType === '3' && this.otherFilterData.city === '') {
                this.otherChartOptions = []
                res.result.forEach(item => {
                  this.otherChartOptions.push(
                    {
                      value: item.city,
                      label: item.dictTranslate.cityName
                    }
                  )
                })
                this.otherChartOptions.unshift({
                  value: '00',
                  label: '全部'
                })
              }
            } else {
              this.testOtherTableData.push({
                xingzheng: item.dictTranslate.areaName,
                shangye: Number(item.commercialServiceFacilityLand).toFixed(
                  2
                ),
                wuliu: Number(
                  item.logisticsStorageLand
                ).toFixed(2),
                gongye: Number(
                  item.industrialLand
                ).toFixed(2),
                caikuang: Number(
                  item.miningLand
                ).toFixed(2),
                kejiao: Number(
                  item.cultureAndHealthLand
                ).toFixed(2),
                gonggong: Number(
                  item.publicFacilitiesLand
                ).toFixed(2),
                jiguan: Number(
                  item.pressAndPublicationLand
                ).toFixed(2)
              })
            }
          }
          )
          this.othersChartOptions = this.otherChartOptions
        } else {
          this.$message.error(res.msg)// 失败
        }
      })
    },
    turnTopFirst () {
      this.otherFilterData.area = ''
      this.chartValue = ''
      this.current = 0
      this.otherFilterData.areaType = '1'
    },
    turnTopSecond () {
      this.otherFilterData.area = ''
      this.chartValue = ''
      this.current = 1
      this.otherFilterData.areaType = '2'
    },
    turnTopThird () {
      this.showXian = false
      this.xianValue = ''
      this.otherFilterData.area = ''
      this.chartValue = ''
      this.otherFilterData.city = ''
      this.current = 2
      this.otherFilterData.areaType = '3'
      this.requestOtherData()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? ['行政区', '商业服务业设施用地', '物流仓储用地', '工业用地', '采矿用地', '科教文卫用地', '公共设施用地', '机关团体新闻出版用地'] : []
      this.isIndeterminate = false
      if (val) {
        this.testtableHead = [
          {
            other_name: 'xingzheng',
            other_comment: '行政区'
          },
          {
            other_name: 'shangye',
            other_comment: '商业服务业设施用地'
          },
          {
            other_name: 'wuliu',
            other_comment: '物流仓储用地'
          },
          {
            other_name: 'gongye',
            other_comment: '工业用地'
          },
          {
            other_name: 'caikuang',
            other_comment: '采矿用地'
          },
          {
            other_name: 'kejiao',
            other_comment: '科教文卫用地'
          },
          {
            other_name: 'gonggong',
            other_comment: '公共设施用地'
          },
          {
            other_name: 'jiguan',
            other_comment: '机关团体新闻出版用地'
          }
        ]
      } else {
        this.testtableHead = [
          {
            other_name: 'xingzheng',
            other_comment: '行政区'
          }
        ]
      }
    },
    handleCheckedCitiesChange (value) {
      if (this.checkAll == false) {
        if (this.checkedCities.indexOf('行政区') == -1) {
          this.checkedCities.unshift('行政区')
        }
      }
      this.testtableHead = [
        {
          other_name: 'xingzheng',
          other_comment: '行政区'
        },
        {
          other_name: 'shangye',
          other_comment: '商业服务业设施用地'
        },
        {
          other_name: 'wuliu',
          other_comment: '物流仓储用地'
        },
        {
          other_name: 'gongye',
          other_comment: '工业用地'
        },
        {
          other_name: 'caikuang',
          other_comment: '采矿用地'
        },
        {
          other_name: 'kejiao',
          other_comment: '科教文卫用地'
        },
        {
          other_name: 'gonggong',
          other_comment: '公共设施用地'
        },
        {
          other_name: 'jiguan',
          other_comment: '机关团体新闻出版用地'
        }
      ]
      let checkedCount = value.length
      let checkedVal = value
      var j = 0
      var arry3 = []
      for (var i = 0; i < this.testtableHead.length; i++) {
        for (var k = 0; k < checkedVal.length; k++) {
          if (checkedVal[k] == this.testtableHead[i].other_comment) {
            arry3[j] = this.testtableHead[i]
            j++
          }
        }
      }
      this.testtableHead = arry3
      this.checkAll = checkedCount === this.cities.length + 1
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length + 1
      if (checkedCount == 1) {
        this.checkAll = false
        this.isIndeterminate = false
      }
    },
    yearNameSelect (val) {
      if (this.yearVal == '2020') {
        this.otherFilterData.year = '2020'
      } else if (this.yearVal == '2019') {
        this.otherFilterData.year = '2019'
      } else if (this.yearVal == '2018') {
        this.otherFilterData.year = '2018'
      } else if (this.yearVal == '2017') {
        this.otherFilterData.year = '2017'
      } else if (this.yearVal == '2016') {
        this.otherFilterData.year = '2016'
      }
      this.otherFilterData.year = this.yearVal
      this.requestOtherData()
    },
    unitNameSelect (val) {
      if (this.unitsVal == 'SQUARE_KILOMETER') {
        this.unitName = '单位：平方公里'
      } else if (this.unitsVal == 'MU') {
        this.unitName = '单位：亩'
      } else if (this.unitsVal == 'MILLION_MU') {
        this.unitName = '单位：万亩'
      } else if (this.unitsVal == 'SQUARE_METER') {
        this.unitName = '单位：平方米'
      } else if (this.unitsVal == 'WAN_SQUARE_METER') {
        this.unitName = '单位：万平方米'
        this.otherFilterData.unit = 'WAN_SQUARE_METER'
      } else if (this.unitsVal == 'HECTARE') {
        this.unitName = '单位：公顷'
      }
      this.otherFilterData.unit = this.unitsVal
      this.requestOtherData()
    },
    getStandard () {
      if (this.pageTitle === '城镇开发边界内住宅用地占比') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var j = 0
        for (let i in this.barChartY) {
          if (Number(this.barChartY[i]) < 25) {
            this.under[j++] = this.barChartY[i]
          }
        }
        this.underStandard = this.under.length
        this.notReach = 21 - this.underStandard
      } else if (this.pageTitle === '人均住宅用地面积（平方米/人）') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var a = 0
        for (let i in this.barChartY) {
          if (Number(this.barChartY[i]) < 25) {
            this.under[a++] = this.barChartY[i]
          }
        }
        this.underStandard = this.under.length
        this.notReach = 21 - this.underStandard
      } else if (this.pageTitle === '公园绿地占比') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var b = 0
        for (let i in this.barChartY) {
          if (Number(this.barChartY[i]) < 10) {
            this.under[b++] = this.barChartY[i]
          }
        }
        this.underStandard = this.under.length
        this.notReach = 21 - this.underStandard
      } else if (this.pageTitle === '人均公园绿地面积（平方米/人）') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var c = 0
        for (let i in this.barChartY) {
          if (Number(this.barChartY[i]) < 8) {
            this.under[c++] = this.barChartY[i]
          }
        }
        this.underStandard = this.under.length
        this.notReach = 21 - this.underStandard
        this.greenHighNum = this.under.length
        this.greenLowNum = this.notReach
      } else if (this.pageTitle === '公共服务用地面积占比') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var d = 0
        for (let i in this.barChartY) {
          if (Number(this.barChartY[i]) > 0) {
            this.under[d++] = this.barChartY[i]
          }
        }
        this.underStandard = this.under.length
        this.notReach = 21 - this.underStandard
      } else if (this.pageTitle === '人均公共服务用地面积（平方米/人）') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var e = 0
        for (let i in this.barChartY) {
          if (Number(this.barChartY[i]) < 5.5) {
            this.under[e++] = this.barChartY[i]
          }
        }
        this.underStandard = this.under.length
        this.notReach = 21 - this.underStandard
        this.serverHighNum = this.underStandard
        this.serverLowNum = this.notReach
      }
    },
    toOtherTable () {
      this.rightItemMessageTitle = '其他建设用地情况'
      this.isShowCurrentTab = 8
      this.addPattern = false
    },
    getYearData (index) {
      if (index == 0) {
        this.yearIndex = '0'
        this.standard = ''
        this.chooseYear = 2018
      } else if (index == 1) {
        this.yearIndex = '1'
        this.chooseYear = 2019
      } else if (index == 2) {
        this.yearIndex = '2'
        this.chooseYear = 2020
      }
      if (this.pageTitle == '城镇开发边界内住宅用地占比') {
        this.requestBarChart1()
      } else if (this.pageTitle == '人均住宅用地面积（平方米/人）') {
        this.requestBarChart2()
      } else if (this.pageTitle == '公园绿地占比') {
        this.requestBarChart3()
      } else if (this.pageTitle == '人均公园绿地面积（平方米/人）') {
        this.requestBarChart4()
      } else if (this.pageTitle == '公共服务用地面积占比') {
        this.requestBarChart5()
      } else if (this.pageTitle == '人均公共服务用地面积（平方米/人）') {
        this.requestBarChart6()
      }
      //   let barChart = echarts.init(document.getElementById('barChart'))
      // barChart.dispose()
      // this.drawBar()
    },
    toMap (index) {
      switch (index) {
        case 0:
          this.chooseYear = 2019
          this.selectedIndexForPeopleAndLand = index
          this.isShowCurrentTab = 2
          this.currentTab = 1
          this.rightItemMessageTitle = '城镇开发边界内住宅用地占比'
          this.requestBarChart1()
          // this.$bus.$emit('click6', this.rightItemMessageTitle);
          break
        case 1:
          this.chooseYear = 2019
          this.selectedIndexForPeopleAndLand = index
          this.isShowCurrentTab = 2
          this.currentTab = 1
          this.rightItemMessageTitle = '人均住宅用地面积（平方米/人）'
          this.requestBarChart2()
          // this.$bus.$emit('click6', this.rightItemMessageTitle);
          break
        case 2:
          this.chooseYear = 2019
          this.selectedIndexForPeopleAndLand = index
          this.isShowCurrentTab = 2
          this.currentTab = 1
          this.rightItemMessageTitle = '公园绿地占比'
          this.requestBarChart3()
          // this.$bus.$emit('click6', this.rightItemMessageTitle);
          break
        case 3:
          this.chooseYear = 2019
          this.selectedIndexForPeopleAndLand = index
          this.isShowCurrentTab = 2
          this.currentTab = 1
          this.rightItemMessageTitle = '人均公园绿地面积（平方米/人）'
          this.requestBarChart4()
          // this.$bus.$emit('click6', this.rightItemMessageTitle);
          break
        case 4:
          this.chooseYear = 2019
          this.selectedIndexForPeopleAndLand = index
          this.isShowCurrentTab = 2
          this.currentTab = 1
          this.rightItemMessageTitle = '公共服务用地面积占比'
          this.requestBarChart5()
          // this.$bus.$emit('click6', this.rightItemMessageTitle);
          break
        case 5:
          this.chooseYear = 2019
          this.selectedIndexForPeopleAndLand = index
          this.isShowCurrentTab = 2
          this.currentTab = 1
          this.rightItemMessageTitle = '人均公共服务用地面积（平方米/人）'
          this.requestBarChart6()
          // this.$bus.$emit('click6', this.rightItemMessageTitle);
          break
      }
      // this.selectedIndexForPeopleAndLand = index
      // this.isShowCurrentTab = 2
      // this.rightItemMessageTitle = '人均公共服务用地面积（平方米/人）'
      // this.$bus.$emit('click6', this.rightItemMessageTitle)
      this.rightItemMessageTitle = this.titleKeyMap[index]
      this.$bus.$emit('click6', this.rightItemMessageTitle)
    },
    requestBarChart1 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 25) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/boundaryRatioListAndSum?province=440000&city=&area&unit=&year=${this.chooseYear}&areaType=3`, {}).then(res => {
        if (res.code === 0) {
          if (res.result) {
            this.paibarChartY = []
            this.barChartY = []
            this.barChartX = []
            this.childCity = []
            this.childList = []
            this.xyData = {}
            res.result.forEach(item => {
              this.barChartY.push(item.scaleCalc.toFixed(2))
              // this.paibarChartY.push((item.scaleCalc.toFixed(2)).sort((a, b) => { return b - a }))
              this.barChartX.push(item.dictTranslate.cityName)
              this.childCity.push(item.dictTranslate.cityName)
              this.xyData.xzhou = this.barChartX
              this.xyData.yzhou = this.barChartY
              this.childList.push(item.scaleCalc)
            })
            this.under = []
            this.higher = []
            this.middleData = ''
            this.underStandard = ''
            this.notReach = ''
            var j = 0
            var q = 0
            for (let i in this.barChartY) {
              if (Number(this.barChartY[i]) < 25) {
                this.under[j++] = this.barChartY[i]
              } else if (Number(this.barChartY[i]) > 40) {
                this.higher[q++] = this.barChartY[i]
              }
            }
            this.underStandard = this.under.length
            this.notReach = this.higher.length
            this.middleData = 21 - this.under.length - this.higher.length
            this.sortArr = res.result
            this.downSortArr = res.result
            this.sortArr.sort(function (a, b) {
              return b.scaleCalc - a.scaleCalc
            })
            this.upCity = []
            this.upList = []
            this.sortArr.forEach(item1 => {
              this.upCity.push(item1.dictTranslate.cityName)
              this.upList.push(item1.scaleCalc.toFixed(2))
            })
            this.downSortArr.sort(function (c, d) {
              return c.scaleCalc - d.scaleCalc
            })
            this.downCity = []
            this.downList = []
            this.downSortArr.forEach(item2 => {
              this.downCity.push(item2.dictTranslate.cityName)
              this.downList.push(item2.scaleCalc.toFixed(2))
            })
          }
        }
      })
    },
    requestBarChart2 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 25) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/residentialAreaPerCapitaListAndSum?province=440000&city=&area&unit=&year=${this.chooseYear}&areaType=3`, {}).then(res => {
        if (res.code === 0) {
          if (res.result) {
            this.barChartY = []
            this.barChartX = []
            this.childCity = []
            this.childList = []
            this.xyData = {}
            res.result.forEach(item => {
              this.barChartY.push(item.areaPerCapitaCalc.toFixed(2))
              this.barChartX.push(item.dictTranslate.cityName)
              this.xyData.xzhou = this.barChartX
              this.childCity.push(item.dictTranslate.cityName)
              this.childList.push(item.areaPerCapitaCalc.toFixed(2))
              this.xyData.yzhou = this.barChartY
            })
            this.under = []
            this.higher = []
            this.middleData = ''
            this.underStandard = ''
            this.notReach = ''
            var j = 0
            var q = 0
            for (let i in this.barChartY) {
              if (Number(this.barChartY[i]) < 25) {
                this.under[j++] = this.barChartY[i]
              } else if (Number(this.barChartY[i]) > 38) {
                this.higher[q++] = this.barChartY[i]
              }
            }
            this.underStandard = this.under.length
            this.notReach = this.higher.length
            this.middleData = 21 - this.under.length - this.higher.length
            this.sortArr = res.result
            this.downSortArr = res.result
            this.sortArr.sort(function (a, b) {
              return b.areaPerCapitaCalc - a.areaPerCapitaCalc
            })
            this.upCity = []
            this.upList = []
            this.sortArr.forEach(item1 => {
              this.upCity.push(item1.dictTranslate.cityName)
              this.upList.push(item1.areaPerCapitaCalc.toFixed(2))
            })
            this.downSortArr.sort(function (c, d) {
              return c.areaPerCapitaCalc - d.areaPerCapitaCalc
            })
            this.downCity = []
            this.downList = []
            this.downSortArr.forEach(item2 => {
              this.downCity.push(item2.dictTranslate.cityName)
              this.downList.push(item2.areaPerCapitaCalc.toFixed(2))
            })
          }
        }
      })
    },
    requestBarChart3 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 10) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.childCity = []
      this.childList = []
      this.xyData = {}
      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/proportionOfGreenListAndSum?province=440000&city=&area&unit=&year=${this.chooseYear}&areaType=3`, {}).then(res => {
        if (res.code === 0) {
          if (res.result) {
            this.barChartY = []
            this.barChartX = []
            res.result.forEach(item => {
              this.barChartY.push(item.proportionOfParkGreenClac.toFixed(2))
              this.barChartX.push(item.dictTranslate.cityName)
              this.childCity.push(item.dictTranslate.cityName)
              this.xyData.xzhou = this.barChartX
              this.xyData.yzhou = this.barChartY
              this.childList.push(item.proportionOfParkGreenClac)
            })
            this.under = []
            this.higher = []
            this.middleData = ''
            this.underStandard = ''
            this.notReach = ''
            var j = 0
            var q = 0
            for (let i in this.barChartY) {
              if (Number(this.barChartY[i]) < 10) {
                this.under[j++] = this.barChartY[i]
              } else if (Number(this.barChartY[i]) > 15) {
                this.higher[q++] = this.barChartY[i]
              }
            }
            this.underStandard = this.under.length
            this.notReach = this.higher.length
            this.middleData = 21 - this.under.length - this.higher.length
            this.sortArr = res.result
            this.downSortArr = res.result
            this.sortArr.sort(function (a, b) {
              return b.proportionOfParkGreenClac - a.proportionOfParkGreenClac
            })
            this.upCity = []
            this.upList = []
            this.sortArr.forEach(item1 => {
              this.upCity.push(item1.dictTranslate.cityName)
              this.upList.push(item1.proportionOfParkGreenClac.toFixed(2))
            })
            this.downSortArr.sort(function (c, d) {
              return c.proportionOfParkGreenClac - d.proportionOfParkGreenClac
            })
            this.downCity = []
            this.downList = []
            this.downSortArr.forEach(item2 => {
              this.downCity.push(item2.dictTranslate.cityName)
              this.downList.push(item2.proportionOfParkGreenClac.toFixed(2))
            })
          }
        }
      })
    },
    requestBarChart4 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 8) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.$http
        .get(
          `/api/epf-monitor-evaluation/manlandRel/parkGreenAreaPerCapitaListAndSum?province=440000&city=&area&unit=&year=${this.chooseYear}&areaType=3`,
          {}
        )
        .then(res => {
          if (res.code === 0) {
            if (res.result) {
              this.barChartY = []
              this.barChartX = []
              this.childCity = []
              this.childList = []
              this.xyData = {}
              res.result.forEach(item => {
                this.barChartY.push(item.areaPerCapita.toFixed(2))
                this.barChartX.push(item.dictTranslate.cityName)
                this.childCity.push(item.dictTranslate.cityName)
                this.childList.push(item.areaPerCapita.toFixed(2))
                this.xyData.xzhou = this.barChartX
                this.xyData.yzhou = this.barChartY
              })
              this.under = []
              this.higher = []
              this.middleData = ''
              this.underStandard = ''
              this.notReach = ''
              var j = 0
              var q = 0
              for (let i in this.barChartY) {
                if (Number(this.barChartY[i]) < 8) {
                  this.under[j++] = this.barChartY[i]
                } else if (Number(this.barChartY[i]) > 8) {
                  this.higher[q++] = this.barChartY[i]
                }
              }
              this.underStandard = this.under.length
              this.notReach = this.higher.length
              this.middleData = 21 - this.under.length - this.higher.length
              this.sortArr = res.result
              this.downSortArr = res.result
              this.sortArr.sort(function (a, b) {
                return b.areaPerCapita - a.areaPerCapita
              })
              this.upCity = []
              this.upList = []
              this.sortArr.forEach(item1 => {
                this.upCity.push(item1.dictTranslate.cityName)
                this.upList.push(item1.areaPerCapita.toFixed(2))
              })
              this.downSortArr.sort(function (c, d) {
                return c.areaPerCapita - d.areaPerCapita
              })
              this.downCity = []
              this.downList = []
              this.downSortArr.forEach(item2 => {
                this.downCity.push(item2.dictTranslate.cityName)
                this.downList.push(item2.areaPerCapita.toFixed(2))
              })
            }
          } else {
            this.$message.error(res.msg) // 失败
          }
        })
    },
    requestBarChart5 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 0) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.$http.get(`/api/epf-monitor-evaluation/manlandRel/publicServiceAreaRatioListAndSum?province=440000&city=&area&unit=&year=${this.chooseYear}&areaType=3`, {}).then(res => {
        if (res.code === 0) {
          if (res.result) {
            this.barChartY = []
            this.barChartX = []
            this.childCity = []
            this.childList = []
            this.xyData = {}
            res.result.forEach(item => {
              this.barChartY.push(item.scale.toFixed(2))
              this.barChartX.push(item.dictTranslate.cityName)
              this.childCity.push(item.dictTranslate.cityName)
              this.childList.push(item.scale.toFixed(2))
              this.xyData.xzhou = this.barChartX
              this.xyData.yzhou = this.barChartY
            })
            this.under = []
            this.higher = []
            this.middleData = ''
            this.underStandard = ''
            this.notReach = ''
            var j = 0
            var q = 0
            for (let i in this.barChartY) {
              if (Number(this.barChartY[i]) < 20) {
                this.under[j++] = this.barChartY[i]
              } else if (Number(this.barChartY[i]) > 40) {
                this.higher[q++] = this.barChartY[i]
              }
            }
            this.underStandard = ''
            this.notReach = ''
            this.middleData = ''
            this.sortArr = res.result
            this.downSortArr = res.result
            this.sortArr.sort(function (a, b) {
              return b.scale - a.scale
            })
            this.upCity = []
            this.upList = []
            this.sortArr.forEach(item1 => {
              this.upCity.push(item1.dictTranslate.cityName)
              this.upList.push(item1.scale.toFixed(2))
            })
            this.downSortArr.sort(function (c, d) {
              return c.scale - d.scale
            })
            this.downCity = []
            this.downList = []
            this.downSortArr.forEach(item2 => {
              this.downCity.push(item2.dictTranslate.cityName)
              this.downList.push(item2.scale.toFixed(2))
            })
          }
        }
      })
    },
    requestBarChart6 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 5.5) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.$http
        .get(
          `/api/epf-monitor-evaluation/manlandRel/perCapitaPublicServiceAreaAndSum?province=440000&city=&area&unit=&year=${this.chooseYear}&areaType=3`,
          {}
        )
        .then(res => {
          if (res.code === 0) {
            if (res.result) {
              this.barChartY = []
              this.barChartX = []
              this.childCity = []
              this.childList = []
              this.xyData = {}
              res.result.forEach(item => {
                this.barChartY.push(item.perPublicServArea.toFixed(2))
                this.barChartX.push(item.dictTranslate.cityName)
                this.childCity.push(item.dictTranslate.cityName)
                this.childList.push(item.perPublicServArea.toFixed(2))
                this.xyData.xzhou = this.barChartX
                this.xyData.yzhou = this.barChartY
              })
              this.under = []
              this.higher = []
              this.middleData = ''
              this.underStandard = ''
              this.notReach = ''
              var j = 0
              var q = 0
              for (let i in this.barChartY) {
                if (Number(this.barChartY[i]) < 5.5) {
                  this.under[j++] = this.barChartY[i]
                } else if (Number(this.barChartY[i]) > 5.5) {
                  this.higher[q++] = this.barChartY[i]
                }
              }
              this.underStandard = this.under.length
              this.notReach = this.higher.length
              this.middleData = 21 - this.under.length - this.higher.length
              this.sortArr = res.result
              this.downSortArr = res.result
              this.sortArr.sort(function (a, b) {
                return b.perPublicServArea - a.perPublicServArea
              })
              this.upCity = []
              this.upList = []
              this.sortArr.forEach(item1 => {
                this.upCity.push(item1.dictTranslate.cityName)
                this.upList.push(item1.perPublicServArea.toFixed(2))
              })
              this.downSortArr.sort(function (c, d) {
                return c.perPublicServArea - d.perPublicServArea
              })
              this.downCity = []
              this.downList = []
              this.downSortArr.forEach(item2 => {
                this.downCity.push(item2.dictTranslate.cityName)
                this.downList.push(item2.perPublicServArea.toFixed(2))
              })
            }
          } else {
            this.$message.error(res.msg) // 失败
          }
        })
    },
    toHouse () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 25) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.pageTitle = '城镇开发边界内住宅用地占比'
      this.standard = '标准区间'
      this.standard1 = 25
      this.standard2 = 40
      this.rankList = this.rankList1
      this.histogramTitle2 = 0
      this.histogramTitle1 = 0
      // this.yearIndex = '1'
      this.requestBarChart1()
    },
    toGreen () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 10) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.pageTitle = '公园绿地占比'
      this.standard = ''
      this.standard1 = 10
      this.standard2 = 15
      this.rankList = this.rankList3
      this.histogramTitle2 = 0
      this.histogramTitle1 = 1
      this.requestBarChart3()
    },
    toService () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 0) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.pageTitle = '公共服务用地面积占比'
      this.standard = ''
      this.standard1 = ''
      this.standard2 = ''
      this.rankList = this.rankList5
      this.histogramTitle2 = 0
      this.histogramTitle1 = 2
      this.requestBarChart5()
    },
    toTitle1 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 25) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.pageTitle = '城镇开发边界内住宅用地占比'
      this.standard = '标准区间'
      this.standard1 = 25
      this.standard2 = 40
      this.rankList = this.rankList1
      this.histogramTitle2 = 0
      this.requestBarChart1()
    },
    toTitle2 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 25) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.pageTitle = '人均住宅用地面积（平方米/人）'
      this.standard = '标准区间'
      this.standard1 = 25
      this.standard2 = 38
      this.rankList = this.rankList2
      this.histogramTitle2 = 1
      this.requestBarChart2()
    },
    toTitle3 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 10) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.standard = '标准区间'
      this.standard1 = 10
      this.standard2 = 15
      this.rankList = this.rankList3
      this.histogramTitle2 = 0
      this.requestBarChart3()
    },
    toTitle4 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 8) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.pageTitle = '人均公园绿地面积（平方米/人）'
      this.standard = ''
      this.standard1 = 10
      this.standard2 = 15
      this.rankList = this.rankList4
      this.histogramTitle2 = 1
      this.requestBarChart4()
    },
    toTitle5 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 0) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.pageTitle = '公共服务用地面积占比'
      this.standard = ''
      this.standard1 = ''
      this.standard2 = ''
      this.rankList = this.rankList5
      this.histogramTitle2 = 0
      this.requestBarChart5()
    },
    toTitle6 () {
      this.itemStyleNnm = {
        normal: {
          color: function (params) {
            var index_color = params.value
            if (index_color < 5.5) {
              return '#f59a23'
              this.legendData = ''
            } else {
              return '#70b603'
              this.legendData = ''
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: 'black'
            }
          }
        }
      }
      this.pageTitle = '人均公共服务用地面积（平方米/人）'
      this.standard = ''
      this.standard1 = ''
      this.standard2 = ''
      this.rankList = this.rankList6
      this.histogramTitle2 = 1
      this.requestBarChart6()
    },
    vueChange (key) {
      this.activeVue = key
    },
    drawBar () {
      this.$nextTick(() => {
        let barChart = echarts.init(document.getElementById('barChart'))
        document.getElementById('barChart').style.width = 100 + '%'
        document.getElementById('barChart').style.height = 90 + '%'
        barChart.resize() // 直接加这句即可
        barChart.setOption({
          xAxis: {
            type: 'category',
            data: this.barChartX,
            axisLabel: {
              show: true,
              interval: 0            }
          },
          grid: {
            left: '3%',
            right: '6%',
            bottom: '0',
            top: '6%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(48,48,48,1);', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
            },
            axisLine: {
              show: false // y轴线消失
            }
          },
          series: [{
            data: this.barChartY,
            type: 'bar',
            barWidth: '20px',
            itemStyle: this.itemStyleNnm,
            color: 'rgba(24, 144, 255, 0.85)',
            markArea: {
              data: [
                [{
                  yAxis: this.standard1, // y轴坐标控制
                  itemStyle: {
                    color: 'rgba(244,250,255,1)',
                    type: 'dashed'
                  },
                  label: {
                    show: true,
                    position: ['1%', '50%'],
                    color: '#ccc',
                    fontSize: 16,
                    formatter: this.standard
                  }
                }, {
                  yAxis: this.standard2
                }
                ]
              ]
            }
          }]
        })
      })
    },
    qiSelect () {
      this.qiYear = this.qiOptions[0]
      this.qiNumber = this.qiOptions[1]
    },
    turnFirst () {
      this.currentTab = 0
    },
    turnSecond () {
      this.currentTab = 1
    },
    turnThird () {
      this.addPattern = true
      this.currentTab = 2
      this.isShowCurrentTab = 1
      this.isMapPattern = true
      this.filterData.areaType = 3
      this.rightItemMessageTitle = ''
    },
    turnFourth () {
      this.currentTab = 3
      this.isMapPattern = !this.isMapPattern

      // this.requestData()
    },
    getItemChangeMessage (val) {
      this.rightItemMessage = val[0]
      this.rightItemMessageTitle = val[0].title
      this.rightItemButton = val[1]
      // this.isShowCurrentTab = val[1]
    },
    getFilterData (val) {
      this.filterData['areaType'] = val.topLeftParam
      this.filterData['city'] = val.city

      // if (val.topLeftParam == 3) {
      //   this.filterData["citys"] = val.citys;
      //   this.filterData["areas"] = "";
      // } else if (val.topLeftParam == 4) {
      //   this.filterData["areas"] = val.areas;
      //   this.filterData["citys"] = "";
      // }
      this.filterData['area'] = val.area
      this.filterData['unit'] = val.unitsVal
      this.filterData['year'] = val.selectYear
      this.filterData['sortType'] = val.sortType
      // this.filterData["amountOrderFlag"] = val.amountOrderFlag;
      // this.filterData["areaOrderFlag"] = val.areaOrderFlag;
      // this.filterData["rankVal"] = val.rankVal;
      this.requestData()
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        let barChart = echarts.init(document.getElementById('barChart'))
        barChart.dispose()
        this.drawBar()
        this.chart = echarts.init(this.$refs.mapBox)
        document.getElementById('mapBox').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
        this.chart = echarts.init(this.$refs.diagram)
        document.getElementById('diagram').style.width = 100 + '%'
        this.chart.resize()
      })
    },
    requestData () {
      const me = this
      // this.filterData.areaType?this.filterData.areaType=this.filterData.areaType:this.filterData.areaType=3;
      // if (this.rightItemButton != "") {
      //   if (this.rightItemButton == 1) {
      if (this.rightItemMessageTitle === '城镇开发边界内住宅用地占比') {
        this.tableData = []
        this.tableHead = [
          {
            column_name: 'quyu',
            column_comment: '行政区'
          },
          {
            column_name: 'chengshiyongdimianji',
            column_comment: '城市用地面积'
          },
          {
            column_name: 'jianshezhenyongdimianji',
            column_comment: '建制镇用地面积'
          },
          {
            column_name: 'chengzhenyongdimianji',
            column_comment: '城镇用地面积'
          },
          {
            column_name: 'chegzhenzhuzhaiyongdichengshi',
            column_comment: '城镇住宅用地（城市）'
          },
          {
            column_name: 'chengzhenzhuzhaiyongdijianshezhen',
            column_comment: '城镇住宅用地（建制镇）'
          },
          {
            column_name: 'chengzhenzhuzhaiyongdi',
            column_comment: '城镇住宅用地'
          },
          {
            column_name: 'bili',
            column_comment: '比例'
          }
          // {
          //   column_name: 'dabiaoqingkuang',
          //   column_comment: '达标情况'
          // }
        ]
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/boundaryRatioListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=${this.filterData.areaType}&sortType=${this.filterData.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.childCity = []
              this.childList = []
              this.addDataList = {}
              let scaleCalc1 = res.sum.scaleCalc.toFixed(2)
              me.$bus.$emit('postCal', scaleCalc1)
              if (res.result) {
                me.data1 = []
                me.cityList = []
                me.xianQuList = []
                res.sum.citySiteArea = Number(res.sum.citySiteArea).toFixed(2)
                res.sum.formedTownArea = Number(res.sum.formedTownArea).toFixed(2)
                res.sum.urbanLandArea = Number(res.sum.urbanLandArea).toFixed(2)
                res.sum.citySiteLand = Number(res.sum.citySiteLand).toFixed(2)
                res.sum.formedTownLand = Number(res.sum.formedTownLand).toFixed(2)
                res.sum.urbanResidentialLand = Number(res.sum.urbanResidentialLand).toFixed(2)
                res.sum.scaleCalc = Number(res.sum.scaleCalc).toFixed(2)
                this.addDataList = {
                  '2': res.sum.citySiteArea,
                  '3': res.sum.formedTownArea,
                  '4': res.sum.urbanLandArea,
                  '5': res.sum.citySiteLand,
                  '6': res.sum.formedTownLand,
                  '7': res.sum.urbanResidentialLand,
                  '8': res.sum.scaleCalc
                }
                res.result.forEach(item => {
                  if (this.filterData['areaType'] !== '4') {
                    me.tableData.push({
                      quyu: item.dictTranslate.cityName,
                      chengshiyongdimianji: Number(item.citySiteArea).toFixed(
                        2
                      ),
                      jianshezhenyongdimianji: Number(
                        item.formedTownArea
                      ).toFixed(2),
                      chengzhenyongdimianji: Number(
                        item.urbanLandArea
                      ).toFixed(2),
                      chegzhenzhuzhaiyongdichengshi: Number(
                        item.citySiteLand
                      ).toFixed(2),
                      chengzhenzhuzhaiyongdijianshezhen: Number(
                        item.formedTownLand
                      ).toFixed(2),
                      chengzhenzhuzhaiyongdi: Number(
                        item.urbanResidentialLand
                      ).toFixed(2),
                      bili: Number(item.scaleCalc).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  } else {
                    me.tableData.push({
                      quyu: item.dictTranslate.areaName,
                      chengshiyongdimianji: Number(item.citySiteArea).toFixed(
                        2
                      ),
                      jianshezhenyongdimianji: Number(
                        item.formedTownArea
                      ).toFixed(2),
                      chengzhenyongdimianji: Number(
                        item.urbanLandArea
                      ).toFixed(2),
                      chegzhenzhuzhaiyongdichengshi: Number(
                        item.citySiteLand
                      ).toFixed(2),
                      chengzhenzhuzhaiyongdijianshezhen: Number(
                        item.formedTownLand
                      ).toFixed(2),
                      chengzhenzhuzhaiyongdi: Number(
                        item.urbanResidentialLand
                      ).toFixed(2),
                      bili: Number(item.scaleCalc).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  }
                  me.data1.push(item.scaleCalc)
                  me.cityList.push(item.dictTranslate.cityName)
                  me.xianQuList.push(item.dictTranslate.areaName)
                  if (this.filterData.areaType == 3 && this.filterData['city'] == '') {
                    this.chartOptions = []
                    res.result.forEach(item => {
                      this.chartOptions.push({
                        value: item.city,
                        label: item.dictTranslate.cityName
                      })
                    })
                    this.chartOptions.unshift({
                      value: '000',
                      label: '全部'
                    })
                  }
                  if (item.dictTranslate.areaName) {
                    item.cityName = item.dictTranslate.areaName
                  } else if (item.dictTranslate.cityName) {
                    item.cityName = item.dictTranslate.cityName
                  } else {
                    item.cityName = item.dictTranslate.provinceName
                  }
                  item.scaleCalc = Number(item.scaleCalc).toFixed(2)
                  if (this.filterData.areaType !== 4) {
                    this.childCity.push(item.cityName)
                  } else {
                    this.childCity.push(item.areaName)
                  }

                  this.childList.push(item.scaleCalc)
                })

                me.$bus.$emit('postData91', me.data1)
                me.$bus.$emit('postData93', me.cityList)
                me.$bus.$emit('postData92', me.xianQuList)
              }
              this.chartOptions1 = this.chartOptions
            } else {
              me.$message.error(res.msg) // 失败
            }
          })
        if (this.filterData['areaType'] == '3') {
          this.yearList = [{ year: '2019' }]
        } else {
          this.yearList = [{ year: '2018' }, { year: '2019' }]
        }
      } else if (
        this.rightItemMessageTitle == '人均住宅用地面积（平方米/人）'
      ) {
        this.tableData = []
        this.tableHead = [
          {
            column_name: 'quyu',
            column_comment: '行政区'
          },
          {
            column_name: 'chengzhenzhuzhaiyongdichengshi',
            column_comment: '城镇住宅用地（城市）'
          },
          {
            column_name: 'chengzhenzhuzhaiyongdijianshezhen',
            column_comment: '城镇住宅用地（建制镇）'
          },
          {
            column_name: 'chegzhenzhuzhaimianji',
            column_comment: '城镇住宅面积'
          },
          {
            column_name: 'mianmochangzhurenkou',
            column_comment: '年末常住人口'
          },
          {
            column_name: 'chengzhenhualv',
            column_comment: '城镇化率'
          },
          {
            column_name: 'mianmochangzhuchengzhenrenkou',
            column_comment: '年末常住城镇人口'
          },
          {
            column_name: 'renjunchengzhenzhuzhaiyongdimianji',
            column_comment: '人均城镇住宅用地面积'
          }
          // {
          //   column_name: 'dabiaoqingkuang',
          //   column_comment: '达标情况'
          // }
        ]
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/residentialAreaPerCapitaListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=${this.filterData.areaType}&sortType=${this.filterData.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              if (res.result) {
                this.childCity = []
                this.childList = []
                this.addDataList = {}
                me.data1 = []
                me.cityList = []
                me.xianQuList = []
                let chartOptions = []
                res.sum.citySiteLand = Number(res.sum.citySiteLand).toFixed(2)
                res.sum.formedTownLand = Number(res.sum.formedTownLand).toFixed(2)
                res.sum.urbanResidentialLand = Number(res.sum.urbanResidentialLand).toFixed(2)
                res.sum.permanentResident = Number(res.sum.permanentResident).toFixed(2)
                res.sum.urbanizationRate = Number(res.sum.urbanizationRate).toFixed(2)
                res.sum.permanentUrbanPopulation = Number(res.sum.permanentUrbanPopulation).toFixed(2)
                res.sum.areaPerCapitaCalc = Number(res.sum.areaPerCapitaCalc).toFixed(2)
                this.addDataList = {
                  '2': res.sum.citySiteLand,
                  '3': res.sum.formedTownLand,
                  '4': res.sum.urbanResidentialLand,
                  '5': res.sum.permanentResident,
                  '6': res.sum.urbanizationRate,
                  '7': res.sum.permanentUrbanPopulation,
                  '8': res.sum.areaPerCapitaCalc
                }
                res.result.forEach(item => {
                  if (this.filterData['areaType'] !== '4') {
                    this.tableData.push({
                      quyu: item.dictTranslate.cityName,
                      chengzhenzhuzhaiyongdichengshi: Number(
                        item.citySiteLand
                      ).toFixed(2),
                      chengzhenzhuzhaiyongdijianshezhen: Number(
                        item.formedTownLand
                      ).toFixed(2),
                      chegzhenzhuzhaimianji: Number(
                        item.urbanResidentialLand
                      ).toFixed(2),
                      mianmochangzhurenkou: Number(
                        item.permanentResident
                      ).toFixed(2),
                      chengzhenhualv: Number(item.urbanizationRate).toFixed(
                        2
                      ),
                      mianmochangzhuchengzhenrenkou: Number(
                        item.permanentUrbanPopulation
                      ).toFixed(2),
                      renjunchengzhenzhuzhaiyongdimianji: Number(
                        item.areaPerCapitaCalc
                      ).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  } else {
                    this.tableData.push({
                      quyu: item.dictTranslate.areaName,
                      chengzhenzhuzhaiyongdichengshi: Number(
                        item.citySiteLand
                      ).toFixed(2),
                      chengzhenzhuzhaiyongdijianshezhen: Number(
                        item.formedTownLand
                      ).toFixed(2),
                      chegzhenzhuzhaimianji: Number(
                        item.urbanResidentialLand
                      ).toFixed(2),
                      mianmochangzhurenkou: Number(
                        item.permanentResident
                      ).toFixed(2),
                      chengzhenhualv: Number(item.urbanizationRate).toFixed(
                        2
                      ),
                      mianmochangzhuchengzhenrenkou: Number(
                        item.permanentUrbanPopulation
                      ).toFixed(2),
                      renjunchengzhenzhuzhaiyongdimianji: Number(
                        item.areaPerCapitaCalc
                      ).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  }

                  if (item.dictTranslate.areaName) {
                    item.cityName = item.dictTranslate.areaName
                  } else if (item.dictTranslate.cityName) {
                    item.cityName = item.dictTranslate.cityName
                  } else {
                    item.cityName = item.dictTranslate.provinceName
                  }
                  item.areaPerCapitaCalc = Number(item.areaPerCapitaCalc).toFixed(2)
                  if (this.filterData.areaType !== 4) {
                    this.childCity.push(item.cityName)
                  } else {
                    this.childCity.push(item.areaName)
                  }
                  this.childList.push(item.areaPerCapitaCalc)

                  me.data1.push(item.areaPerCapita)
                  me.cityList.push(item.dictTranslate.cityName)
                  me.xianQuList.push(item.dictTranslate.areaName)
                  if (this.filterData.areaType == 3 && this.filterData['city'] == '') {
                    this.chartOptions = []
                    res.result.forEach(item => {
                      this.chartOptions.push({
                        value: item.city,
                        label: item.dictTranslate.cityName
                      })
                    })
                    this.chartOptions.unshift({
                      value: '000',
                      label: '全部'
                    })
                  }
                })
                me.$bus.$emit('postData91', me.data1)
                me.$bus.$emit('postData93', me.cityList)
                me.$bus.$emit('postData92', me.xianQuList)
              }
              this.chartOptions1 = this.chartOptions
            } else {
              this.$message.error(res.msg) // 失败
            }
          })
        if (this.filterData['areaType'] == '3') {
          this.yearList = [{ year: '2019' }]
        } else {
          this.yearList = [{ year: '2018' }, { year: '2019' }]
        }
      } else if (this.rightItemMessageTitle == '公园绿地占比') {
        this.tableData = []
        this.tableHead = [
          {
            column_name: 'quyu',
            column_comment: '行政区'
          },
          {
            column_name: 'chengshiyongdimianji',
            column_comment: '城市用地面积'
          },
          {
            column_name: 'jianshezhenyongdimianji',
            column_comment: '建制镇用地面积'
          },
          {
            column_name: 'chengzhenyongdiminaji',
            column_comment: '城镇用地面积'
          },
          {
            column_name: 'yongyuanylvdichengshi',
            column_comment: '公园与绿地（城市）'
          },
          {
            column_name: 'gongyuanyulvdijianshezhen',
            column_comment: '公园与绿地（建制镇）'
          },
          {
            column_name: 'gongyuanyulvdi',
            column_comment: '公园与绿地'
          },
          {
            column_name: 'bili',
            column_comment: '比例'
          }
          // {
          //   column_name: 'dabiaoqingkuang',
          //   column_comment: '达标情况'
          // }
        ]
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/proportionOfGreenListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=${this.filterData.areaType}&sortType=${this.filterData.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              if (res.result) {
                this.childList = []
                this.childCity = []
                this.addDataList = {}
                me.data1 = []
                me.cityList = []
                me.xianQuList = []
                res.sum.citySiteArea = Number(res.sum.citySiteArea).toFixed(2)
                res.sum.formedTownArea = Number(res.sum.formedTownArea).toFixed(2)
                res.sum.urbanLandArea = Number(res.sum.urbanLandArea).toFixed(2)
                res.sum.cityParkGreen = Number(res.sum.cityParkGreen).toFixed(2)
                res.sum.formedTownParkGreen = Number(res.sum.formedTownParkGreen).toFixed(2)
                res.sum.townParkGreen = Number(res.sum.townParkGreen).toFixed(2)
                res.sum.proportionOfParkGreenClac = Number(res.sum.proportionOfParkGreenClac).toFixed(2)
                this.addDataList = {
                  '2': res.sum.citySiteArea,
                  '3': res.sum.formedTownArea,
                  '4': res.sum.urbanLandArea,
                  '5': res.sum.cityParkGreen,
                  '6': res.sum.formedTownParkGreen,
                  '7': res.sum.townParkGreen,
                  '8': res.sum.proportionOfParkGreenClac
                }
                res.result.forEach(item => {
                  if (this.filterData['areaType'] !== '4') {
                    this.tableData.push({
                      quyu: item.dictTranslate.cityName,
                      chengshiyongdimianji: Number(item.citySiteArea).toFixed(
                        2
                      ),
                      jianshezhenyongdimianji: Number(
                        item.formedTownArea
                      ).toFixed(2),
                      chengzhenyongdiminaji: Number(
                        item.urbanLandArea
                      ).toFixed(2),
                      yongyuanylvdichengshi: Number(
                        item.cityParkGreen
                      ).toFixed(2),
                      gongyuanyulvdijianshezhen: Number(
                        item.formedTownParkGreen
                      ).toFixed(2),
                      gongyuanyulvdi: Number(item.townParkGreen).toFixed(2),
                      bili: Number(item.proportionOfParkGreenClac).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  } else {
                    this.tableData.push({
                      quyu: item.dictTranslate.areaName,
                      chengshiyongdimianji: Number(item.citySiteArea).toFixed(
                        2
                      ),
                      jianshezhenyongdimianji: Number(
                        item.formedTownArea
                      ).toFixed(2),
                      chengzhenyongdiminaji: Number(
                        item.urbanLandArea
                      ).toFixed(2),
                      yongyuanylvdichengshi: Number(
                        item.cityParkGreen
                      ).toFixed(2),
                      gongyuanyulvdijianshezhen: Number(
                        item.formedTownParkGreen
                      ).toFixed(2),
                      gongyuanyulvdi: Number(item.townParkGreen).toFixed(2),
                      bili: Number(item.proportionOfParkGreenClac).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  }

                  if (item.dictTranslate.areaName) {
                    item.cityName = item.dictTranslate.areaName
                  } else if (item.dictTranslate.cityName) {
                    item.cityName = item.dictTranslate.cityName
                  } else {
                    item.cityName = item.dictTranslate.provinceName
                  }
                  item.proportionOfParkGreenClac = Number(item.proportionOfParkGreenClac).toFixed(2)
                  this.childList.push(item.proportionOfParkGreenClac)
                  if (this.filterData.areaType !== 4) {
                    this.childCity.push(item.cityName)
                  } else {
                    this.childCity.push(item.areaName)
                  }
                  me.data1.push(item.proportionOfParkGreenClac)
                  me.cityList.push(item.dictTranslate.cityName)
                  me.xianQuList.push(item.dictTranslate.areaName)
                  if (this.filterData.areaType == 3 && this.filterData['city'] == '') {
                    this.chartOptions = []
                    res.result.forEach(item => {
                      this.chartOptions.push({
                        value: item.city,
                        label: item.dictTranslate.cityName
                      })
                    })
                    this.chartOptions.unshift({
                      value: '000',
                      label: '全部'
                    })
                  }
                })
                me.$bus.$emit('postData91', me.data1)
                me.$bus.$emit('postData93', me.cityList)
                me.$bus.$emit('postData92', me.xianQuList)
              }
              this.chartOptions1 = this.chartOptions
            } else {
              this.$message.error(res.msg) // 失败
            }
          })
        if (this.filterData['areaType'] == '3') {
          this.yearList = [{ year: '2019' }]
        } else {
          this.yearList = [{ year: '2018' }, { year: '2019' }]
        }
      } else if (
        this.rightItemMessageTitle == '人均公园绿地面积（平方米/人）'
      ) {
        this.tableData = []
        this.tableHead = [
          {
            column_name: 'quyu',
            column_comment: '行政区'
          },
          {
            column_name: 'gongyuanyulvdichengshi',
            column_comment: '公园与绿地（城市）'
          },
          {
            column_name: 'gongyuanyulvdijianshezhen',
            column_comment: '公园与绿地（建制镇）'
          },
          {
            column_name: 'gongyuanyulvdi',
            column_comment: '公园与绿地'
          },
          {
            column_name: 'nianmochangzhuzhenrenku',
            column_comment: '年末常住人口'
          },
          {
            column_name: 'chengzhenhualv',
            column_comment: '城镇化率'
          },
          {
            column_name: 'nianmochangzhuzhenrenkou',
            column_comment: '年末常住城镇人口'
          },
          {
            column_name: 'renjungongyuanlvdimianji',
            column_comment: '人均公园绿地面积'
          }
          // {
          //   column_name: 'dabiaoqingkuang',
          //   column_comment: '达标情况'
          // }
        ]
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/parkGreenAreaPerCapitaListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=${this.filterData.areaType}&sortType=${this.filterData.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              if (res.result) {
                this.childList = []
                this.childCity = []
                this.addDataList = {}
                me.data1 = []
                me.cityList = []
                me.xianQuList = []
                let chartOptions = []
                res.sum.cityParkGreen = Number(res.sum.cityParkGreen).toFixed(2)
                res.sum.formedTownParkGreen = Number(res.sum.formedTownParkGreen).toFixed(2)
                res.sum.townParkGreen = Number(res.sum.townParkGreen).toFixed(2)
                res.sum.permanentResident = Number(res.sum.permanentResident).toFixed(2)
                res.sum.urbanizationRate = Number(res.sum.urbanizationRate).toFixed(2)
                res.sum.permanentUrbanPopulation = Number(res.sum.permanentUrbanPopulation).toFixed(2)
                res.sum.areaPerCapitaCalc = Number(res.sum.areaPerCapitaCalc).toFixed(2)
                this.addDataList = {
                  '2': res.sum.cityParkGreen,
                  '3': res.sum.formedTownParkGreen,
                  '4': res.sum.townParkGreen,
                  '5': res.sum.permanentResident,
                  '6': res.sum.urbanizationRate,
                  '7': res.sum.permanentUrbanPopulation,
                  '8': res.sum.areaPerCapitaCalc
                }
                res.result.forEach(item => {
                  if (this.filterData['areaType'] !== '4') {
                    this.tableData.push({
                      quyu: item.dictTranslate.cityName,
                      gongyuanyulvdichengshi: Number(
                        item.cityParkGreen
                      ).toFixed(2),
                      gongyuanyulvdijianshezhen: Number(
                        item.formedTownParkGreen
                      ).toFixed(2),
                      gongyuanyulvdi: Number(item.townParkGreen).toFixed(2),
                      nianmochangzhuzhenrenku: Number(
                        item.permanentResident
                      ).toFixed(2),
                      chengzhenhualv: Number(item.urbanizationRate).toFixed(
                        2
                      ),
                      nianmochangzhuzhenrenkou: Number(
                        item.permanentUrbanPopulation
                      ).toFixed(2),
                      renjungongyuanlvdimianji: Number(
                        item.areaPerCapita
                      ).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  } else {
                    this.tableData.push({
                      quyu: item.dictTranslate.areaName,
                      gongyuanyulvdichengshi: Number(
                        item.cityParkGreen
                      ).toFixed(2),
                      gongyuanyulvdijianshezhen: Number(
                        item.formedTownParkGreen
                      ).toFixed(2),
                      gongyuanyulvdi: Number(item.townParkGreen).toFixed(2),
                      nianmochangzhuzhenrenku: Number(
                        item.permanentResident
                      ).toFixed(2),
                      chengzhenhualv: Number(item.urbanizationRate).toFixed(
                        2
                      ),
                      nianmochangzhuzhenrenkou: Number(
                        item.permanentUrbanPopulation
                      ).toFixed(2),
                      renjungongyuanlvdimianji: Number(
                        item.areaPerCapita
                      ).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  }

                  if (item.dictTranslate.areaName) {
                    item.cityName = item.dictTranslate.areaName
                  } else if (item.dictTranslate.cityName) {
                    item.cityName = item.dictTranslate.cityName
                  } else {
                    item.cityName = item.dictTranslate.provinceName
                  }
                  item.areaPerCapita = Number(item.areaPerCapita).toFixed(2)
                  this.childList.push(item.areaPerCapita)
                  if (this.filterData.areaType !== 4) {
                    this.childCity.push(item.cityName)
                  } else {
                    this.childCity.push(item.areaName)
                  }
                  me.data1.push(item.areaPerCapita * 1.0)
                  me.cityList.push(item.dictTranslate.cityName)
                  me.xianQuList.push(item.dictTranslate.areaName)
                  if (this.filterData.areaType == 3 && this.filterData['city'] == '') {
                    this.chartOptions = []
                    res.result.forEach(item => {
                      this.chartOptions.push({
                        value: item.city,
                        label: item.dictTranslate.cityName
                      })
                    })
                    this.chartOptions.unshift({
                      value: '000',
                      label: '全部'
                    })
                  }
                })
                me.$bus.$emit('postData91', me.data1)
                me.$bus.$emit('postData93', me.cityList)
                me.$bus.$emit('postData92', me.xianQuList)
              }
              this.chartOptions1 = this.chartOptions
            } else {
              this.$message.error(res.msg) // 失败
            }
          })
        if (this.filterData['areaType'] == '3') {
          this.yearList = [{ year: '2019' }]
        } else {
          this.yearList = [{ year: '2018' }, { year: '2019' }]
        }
      } else if (this.rightItemMessageTitle == '公共服务用地面积占比') {
        this.tableData = []
        this.tableHead = [
          {
            column_name: 'quyu',
            column_comment: '行政区'
          },
          {
            column_name: 'chengzhenyongdimianji',
            column_comment: '城镇用地面积'
          },
          {
            column_name: 'jiguantutixinwen',
            column_comment: '机关团体新闻出版用地'
          },
          {
            column_name: 'gongongsheshiyongdi',
            column_comment: '公用设施用地'
          },
          {
            column_name: 'gonggongfuwuyongdi',
            column_comment: '公共服务用地'
          },
          {
            column_name: 'bili',
            column_comment: '比例'
          }
          // {
          //   column_name: 'paiming',
          //   column_comment: '排名情况'
          // }
        ]
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/publicServiceAreaRatioListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=${this.filterData.areaType}&sortType=${this.filterData.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              if (res.result) {
                this.childList = []
                this.childCity = []
                this.addDataList = {}
                me.data1 = []
                me.cityList = []
                me.xianQuList = []
                let chartOptions = []
                res.sum.cityUseArea = Number(res.sum.cityUseArea).toFixed(2)
                res.sum.governMentArea = Number(res.sum.governMentArea).toFixed(2)
                res.sum.commuFacilitiesArea = Number(res.sum.commuFacilitiesArea).toFixed(2)
                res.sum.publicServArea = Number(res.sum.publicServArea).toFixed(2)
                res.sum.scale = Number(res.sum.scale).toFixed(2)
                this.addDataList = {
                  '2': res.sum.cityUseArea,
                  '3': res.sum.governMentArea,
                  '4': res.sum.commuFacilitiesArea,
                  '5': res.sum.publicServArea,
                  '6': res.sum.scale
                }
                res.result.forEach(item => {
                  if (this.filterData['areaType'] !== '4') {
                    this.tableData.push({
                      quyu: item.dictTranslate.cityName,
                      chengzhenyongdimianji: Number(item.cityUseArea).toFixed(
                        2
                      ),
                      jiguantutixinwen: Number(item.governMentArea).toFixed(
                        2
                      ),
                      gongongsheshiyongdi: Number(
                        item.commuFacilitiesArea
                      ).toFixed(2),
                      gonggongfuwuyongdi: Number(item.publicServArea).toFixed(
                        2
                      ),
                      bili: Number(item.scale).toFixed(2),
                      paiming: item.order,
                      showDB: false
                    })
                  } else {
                    this.tableData.push({
                      quyu: item.dictTranslate.areaName,
                      chengzhenyongdimianji: Number(item.cityUseArea).toFixed(
                        2
                      ),
                      jiguantutixinwen: Number(item.governMentArea).toFixed(
                        2
                      ),
                      gongongsheshiyongdi: Number(
                        item.commuFacilitiesArea
                      ).toFixed(2),
                      gonggongfuwuyongdi: Number(item.publicServArea).toFixed(
                        2
                      ),
                      bili: Number(item.scale).toFixed(2),
                      paiming: item.order,
                      showDB: false
                    })
                  }

                  me.data1.push(item.scaleCalc)
                  me.cityList.push(item.dictTranslate.cityName)
                  me.xianQuList.push(item.dictTranslate.areaName)
                  if (this.filterData.areaType == 3 && this.filterData['city'] == '') {
                    this.chartOptions = []
                    res.result.forEach(item => {
                      this.chartOptions.push({
                        value: item.city,
                        label: item.dictTranslate.cityName
                      })
                    })
                    this.chartOptions.unshift({
                      value: '000',
                      label: '全部'
                    })
                  }

                  if (item.dictTranslate.areaName) {
                    item.cityName = item.dictTranslate.areaName
                  } else if (item.dictTranslate.cityName) {
                    item.cityName = item.dictTranslate.cityName
                  } else {
                    item.cityName = item.dictTranslate.provinceName
                  }
                  item.scaleCalc = Number(item.scaleCalc).toFixed(2)
                  this.childList.push(item.scaleCalc)
                  if (this.filterData.areaType !== 4) {
                    this.childCity.push(item.cityName)
                  } else {
                    this.childCity.push(item.areaName)
                  }
                })
                me.$bus.$emit('postData91', me.data1)
                me.$bus.$emit('postData93', me.cityList)
                me.$bus.$emit('postData92', me.xianQuList)
              }
              this.chartOptions1 = this.chartOptions
            } else {
              this.$message.error(res.msg) // 失败
            }
          })
        if (this.filterData['areaType'] == '3') {
          this.yearList = [{ year: '2019' }]
        } else {
          this.yearList = [{ year: '2018' }, { year: '2019' }]
        }
      } else if (
        this.rightItemMessageTitle == '人均公共服务用地面积（平方米/人）'
      ) {
        this.tableData = []
        this.tableHead = [
          {
            column_name: 'quyu',
            column_comment: '行政区'
          },
          {
            column_name: 'jiguantutixinwenchubandi',
            column_comment: '机关团体新闻出版用地'
          },
          {
            column_name: 'gonggongsheshiyongdi',
            column_comment: '公用设施用地'
          },
          {
            column_name: 'gonggongfuwuyongdi',
            column_comment: '公共服务用地'
          },
          {
            column_name: 'nianmochangzhurenkou',
            column_comment: '年末常住人口'
          },
          {
            column_name: 'chegzhenhualv',
            column_comment: '城镇化率'
          },
          {
            column_name: 'nianmochangzhuzhenrenkou',
            column_comment: '年末常住城镇人口'
          },
          {
            column_name: 'renjungonggongfuwuyongdimianji',
            column_comment: '人均公共服务用地面积'
          }
          // {
          //   column_name: 'dabiaoqingkuang',
          //   column_comment: '达标情况'
          // }
        ]
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/perCapitaPublicServiceAreaAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=${this.filterData.areaType}&sortType=${this.filterData.sortType}`
          )
          .then(res => {
            if (res.code === 0) {
              if (res.result) {
                this.childList = []
                this.childCity = []
                this.addDataList = {}
                me.data1 = []
                me.cityList = []
                me.xianQuList = []
                let chartOptions = []
                res.sum.governMentArea = Number(res.sum.governMentArea).toFixed(2)
                res.sum.commuFacilitiesArea = Number(res.sum.commuFacilitiesArea).toFixed(2)
                res.sum.publicServArea = Number(res.sum.publicServArea).toFixed(2)
                res.sum.residentPopu = Number(res.sum.residentPopu).toFixed(2)
                res.sum.urbanizationRate = Number(res.sum.urbanizationRate).toFixed(2)
                res.sum.residentCityPopu = Number(res.sum.residentCityPopu).toFixed(2)
                res.sum.perPublicServArea = Number(res.sum.perPublicServArea).toFixed(2)
                this.addDataList = {
                  '2': res.sum.governMentArea,
                  '3': res.sum.commuFacilitiesArea,
                  '4': res.sum.publicServArea,
                  '5': res.sum.residentPopu,
                  '6': res.sum.urbanizationRate,
                  '7': res.sum.residentCityPopu,
                  '8': res.sum.perPublicServArea
                }
                res.result.forEach(item => {
                  if (this.filterData['areaType'] !== '4') {
                    this.tableData.push({
                      quyu: item.dictTranslate.cityName,
                      jiguantutixinwenchubandi: Number(
                        item.governMentArea
                      ).toFixed(2),
                      gonggongsheshiyongdi: Number(
                        item.commuFacilitiesArea
                      ).toFixed(2),
                      gonggongfuwuyongdi: Number(item.publicServArea).toFixed(
                        2
                      ),
                      nianmochangzhurenkou: Number(item.residentPopu).toFixed(
                        2
                      ),
                      chegzhenhualv: Number(item.urbanizationRate).toFixed(2),
                      nianmochangzhuzhenrenkou: Number(
                        item.residentCityPopu
                      ).toFixed(2),
                      renjungonggongfuwuyongdimianji: Number(
                        item.perPublicServArea
                      ).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  } else {
                    this.tableData.push({
                      quyu: item.dictTranslate.areaName,
                      jiguantutixinwenchubandi: Number(
                        item.governMentArea
                      ).toFixed(2),
                      gonggongsheshiyongdi: Number(
                        item.commuFacilitiesArea
                      ).toFixed(2),
                      gonggongfuwuyongdi: Number(item.publicServArea).toFixed(
                        2
                      ),
                      nianmochangzhurenkou: Number(item.residentPopu).toFixed(
                        2
                      ),
                      chegzhenhualv: Number(item.urbanizationRate).toFixed(2),
                      nianmochangzhuzhenrenkou: Number(
                        item.residentCityPopu
                      ).toFixed(2),
                      renjungonggongfuwuyongdimianji: Number(
                        item.perPublicServArea
                      ).toFixed(2),
                      dabiaoqingkuang: item.compliance,
                      showDB: true
                    })
                  }

                  if (item.dictTranslate.areaName) {
                    item.cityName = item.dictTranslate.areaName
                  } else if (item.dictTranslate.cityName) {
                    item.cityName = item.dictTranslate.cityName
                  } else {
                    item.cityName = item.dictTranslate.provinceName
                  }
                  item.perPublicServArea = Number(item.perPublicServArea).toFixed(2)
                  this.childList.push(item.perPublicServArea)
                  if (this.filterData.areaType !== 4) {
                    this.childCity.push(item.cityName)
                  } else {
                    this.childCity.push(item.areaName)
                  }
                  me.data1.push(item.perPublicServArea * 1.0)
                  me.cityList.push(item.dictTranslate.cityName)
                  me.xianQuList.push(item.dictTranslate.areaName)
                  if (this.filterData.areaType == 3 && this.filterData['city'] == '') {
                    this.chartOptions = []
                    res.result.forEach(item => {
                      this.chartOptions.push({
                        value: item.city,
                        label: item.dictTranslate.cityName
                      })
                    })
                    this.chartOptions.unshift({
                      value: '000',
                      label: '全部'
                    })
                  }
                })
                me.$bus.$emit('postData91', me.data1)
                me.$bus.$emit('postData93', me.cityList)
                me.$bus.$emit('postData92', me.xianQuList)
              }
              this.chartOptions1 = this.chartOptions
            } else {
              this.$message.error(res.msg) // 失败
            }
          })
        if (this.filterData['areaType'] == '3') {
          this.yearList = [{ year: '2019' }]
        } else {
          this.yearList = [{ year: '2018' }, { year: '2019' }]
        }
      }
      //   }
      // }
    }
  },
  created () {
    this.getTitleNum()
    this.getStandard()
    window.addEventListener('setItem', () => {
      this.isShowMenuSpecial = sessionStorage.getItem('watchShow')
    })
    this.requestOtherData()
    this.toChildYear()

    this.$http
      .get(
        '/api/epf-monitor-evaluation/manlandRel/realTimeMonitor?cantonProvince=440000&cantonCity&cantonArea&year=2019&areaType=1',
        {}
      )
      .then(res => {
        if (res.code === 0) {
          this.indexValueDouble1 = res.result[0].indexValueDouble
          this.indexValueDouble3 = res.result[3].indexValueDouble
          this.indexValueDouble4 = res.result[4].indexValueDouble
          this.indexValueUnit1 = res.result[0].unit
          this.indexValueUnit3 = res.result[3].unit
          this.indexValueUnit4 = res.result[4].unit
          this.toChild.indexValueDouble1 = this.indexValueDouble1
          this.toChild.indexValueDouble3 = this.indexValueDouble3
          this.toChild.indexValueDouble4 = this.indexValueDouble4
          this.toChild.indexValueUnit1 = this.indexValueUnit1
          this.toChild.indexValueUnit3 = this.indexValueUnit3
          this.toChild.indexValueUnit4 = this.indexValueUnit4
        } else {
          this.$message.error(res.msg) // 失败
        }
      })
    this.requestData()
  },
  mounted () {
    window.addEventListener('setItem', () => {
      this.isShowMenuSpecial = sessionStorage.getItem('watchShow')
    })
    this.$nextTick(function () {
      this.$bus.$on('toShowTable', val => {
        this.isMapPattern = val
        this.rightItemButton = 1
      })
    })
    this.$nextTick(function () {
      setTimeout(() => {
        let diaoduchart = echarts.init(document.getElementById('diaoduchart'))
        diaoduchart.dispose()
        this.diaoduDrawLine()
        let useChart = echarts.init(document.getElementById('diagram'))
        useChart.dispose()
        this.useDrawLine()
        this.chuanData1()
        this.loadMap(
          '../../../../../../static/map/json/province/440000.json',
          'guangdong'
        )
      }, 1000)
    })
    this.initEchart()
  },
  filters: {
    arrFilter (value) {
      let realVal = []
      realVal.sort((a, b) => { return b - a })
      return realVal
    }
  },
  watch: {
    isShowMenuSpecial: {
      immediate: true,
      deep: true,
      handler (val) {
        this.drawBar()
      }
    },
    otherFilterData: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val.areaType == 3) {
          this.$http.get(`/api/epf-monitor-evaluation/manlandRel/otherAreaListAndSum?province=440000&city=${val.city}&area=${val.area}&year=${val.year}&unit=${val.unit}&areaType=4&sortType=4`, {}).then(res => {
            if (res.code == 0) {
              this.xianOptions = []
              res.result.forEach(item => {
                this.xianOptions.push(
                  {
                    value: item.area,
                    label: item.dictTranslate.areaName
                  }
                )
              })
              this.xianOptions.unshift({
                value: '0',
                label: '全部'
              })
            }
          })
        }
      }
    },
    current: {
      immediate: true,
      deep: true,
      handler (val) {
        this.requestOtherData()
      }
    },
    pageTitle: {
      immediate: true,
      deep: true,
      handler (val) {
        this.getStandard()
      }
    },
    barChartY: {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          let barChart = echarts.init(document.getElementById('barChart'))
          barChart.dispose()
          this.drawBar()
        }, 0)
      }
    },
    isShow (val) {
      setTimeout(() => {
        this.loadMap(
          '../../../../../../static/map/json/province/440000.json',
          'guangdong'
        )
      }, 500)
    },
    currentTab (val) {
      setTimeout(() => {
        this.loadMap(
          '../../../../../../static/map/json/province/440000.json',
          'guangdong'
        )
      }, 500)
    },
    isMapPattern (val) {
      if (val == true) {
        setTimeout(() => {
          this.loadMap(
            '../../../../../../static/map/json/province/440000.json',
            'guangdong'
          )
        }, 500)
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
        // this.requestData()
      }
    },
    filterData: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val.areaType == 3) {
          if (this.rightItemMessageTitle == '城镇开发边界内住宅用地占比') {
            this.$http.get(`/api/epf-monitor-evaluation/manlandRel/boundaryRatioListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=4&sortType=${this.filterData.sortType}`, {}).then(res => {
              if (res.code == 0) {
                this.chartOptions2 = []
                res.result.forEach(item => {
                  this.chartOptions2.push(
                    {
                      value: item.area,
                      label: item.dictTranslate.areaName
                    }
                  )
                })
                this.chartOptions2.unshift({
                  value: '0',
                  label: '全部'
                })
              }
            })
          } else if (this.rightItemMessageTitle == '人均住宅用地面积（平方米/人）') {
            this.$http.get(`/api/epf-monitor-evaluation/manlandRel/residentialAreaPerCapitaListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=4&sortType=${this.filterData.sortType}`, {}).then(res => {
              if (res.code == 0) {
                this.chartOptions2 = []
                res.result.forEach(item => {
                  this.chartOptions2.push(
                    {
                      value: item.area,
                      label: item.dictTranslate.areaName
                    }
                  )
                })
                this.chartOptions2.unshift({
                  value: '0',
                  label: '全部'
                })
              }
            })
          } else if (this.rightItemMessageTitle == '公园绿地占比') {
            this.$http.get(`/api/epf-monitor-evaluation/manlandRel/proportionOfGreenListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=4&sortType=${this.filterData.sortType}`, {}).then(res => {
              if (res.code == 0) {
                this.chartOptions2 = []
                res.result.forEach(item => {
                  this.chartOptions2.push(
                    {
                      value: item.area,
                      label: item.dictTranslate.areaName
                    }
                  )
                })
                this.chartOptions2.unshift({
                  value: '0',
                  label: '全部'
                })
              }
            })
          } else if (this.rightItemMessageTitle == '人均公园绿地面积（平方米/人）') {
            this.$http.get(`/api/epf-monitor-evaluation/manlandRel/parkGreenAreaPerCapitaListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=4&sortType=${this.filterData.sortType}`, {}).then(res => {
              if (res.code == 0) {
                this.chartOptions2 = []
                res.result.forEach(item => {
                  this.chartOptions2.push(
                    {
                      value: item.area,
                      label: item.dictTranslate.areaName
                    }
                  )
                })
                this.chartOptions2.unshift({
                  value: '0',
                  label: '全部'
                })
              }
            })
          } else if (this.rightItemMessageTitle == '公共服务用地面积占比') {
            this.$http.get(`/api/epf-monitor-evaluation/manlandRel/publicServiceAreaRatioListAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=4&sortType=${this.filterData.sortType}`, {}).then(res => {
              if (res.code == 0) {
                this.chartOptions2 = []
                res.result.forEach(item => {
                  this.chartOptions2.push(
                    {
                      value: item.area,
                      label: item.dictTranslate.areaName
                    }
                  )
                })
                this.chartOptions2.unshift({
                  value: '0',
                  label: '全部'
                })
              }
            })
          } else if (this.rightItemMessageTitle == '人均公共服务用地面积（平方米/人）') {
            this.$http.get(`/api/epf-monitor-evaluation/manlandRel/perCapitaPublicServiceAreaAndSum?province=${this.filterData.province}&city=${this.filterData.city}&area=${this.filterData.area}&unit=${this.filterData.unit}&year=${this.filterData.year}&areaType=4&sortType=${this.filterData.sortType}`, {}).then(res => {
              if (res.code == 0) {
                this.chartOptions2 = []
                res.result.forEach(item => {
                  this.chartOptions2.push(
                    {
                      value: item.area,
                      label: item.dictTranslate.areaName
                    }
                  )
                })
                this.chartOptions2.unshift({
                  value: '0',
                  label: '全部'
                })
              }
            })
          }
        }
      }
    },
    isShowCurrentTab: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val == 1) {
          this.itemStyleNnm = {
            normal: {
              color: function (params) {
                var index_color = params.value
                if (index_color < 25) {
                  return '#f59a23'
                  this.legendData = ''
                } else {
                  return '#70b603'
                  this.legendData = ''
                }
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'black'
                }
              }
            }
          }
          this.childYear = ''
          this.requestBarChart1()
          this.histogramTitle1 = 0
          this.histogramTitle2 = 0
          this.yearIndex = '1'
          //  let barChart = echarts.init(document.getElementById('barChart'))
          //  barChart.dispose()
          // this.drawBar()
        }
      }
    },
    isMapPattern: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val == false) {
          // this.requestData();
        }
      }
    }
  }
}
</script>
<style scoped>
@import "../../../onemap/toolbarItem/style.css";
#subject-box {
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#subject-box::-webkit-scrollbar {
  display: none;
}
.left {
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: auto;
}
.left-true {
  width: calc(100% - 380px);
}
.left-false {
  width: 100%;
  overflow-x: hidden;
}
.left-top {
  width: 100%;
  height: 50px;
  background-color: #fff;
  /* box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #f7f7f7;
  margin-bottom: 0;
  /* margin-bottom: 15px; */
}
.left-top-button {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left-top-button-tab {
  color: #303030;
  cursor: pointer;
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
  background: #f7f7f7;
  width: 100%;
  height: calc(100% - 50px);
  /* background-color: #fff; */
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.otherTable {
  width: 100%;
  height: calc(100% - 50px);
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
}
.left-bottom-map {
  width: 100%;
  height: 100%;
}
.left-bottom-fourth {
  width: 100%;
  height: calc(100% - 50px);
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
}
.left-bottom-time {
  position: absolute;
  top: 15px;
  left: 30px;
  font-size: 16px;
  color: #fff;
  z-index: 9;
}
.right-enter,
.right-leave-to {
  transform: translate3d(100%, 0, 0);
}
.right-leave,
.right-enter-to {
  transform: translate3d(0, 0, 0);
}
.right-enter-active,
.right-leave-active {
  transition: all 0.2s;
}
.middle-middle-message-box {
  width: 12px;
  height: 192px;
  position: absolute;
  top: 50%;
  margin-top: -96px;
  left: 2px;
  cursor: pointer;
}
.middle-middle-message-boxL {
  background-image: url("../../../../../assets/images/jcpgyj/map00L.png");
}
.middle-middle-message-boxR {
  background-image: url("../../../../../assets/images/jcpgyj/map00R.png");
}
.overview {
  display: flex;
  justify-content: space-between;
  height: 100%;
  /* margin: 25px; */
  margin-bottom: 0;
  margin-top: 0;
}
.leftOverview {
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.leftOverviewOne {
  height: 66.6666%;
  /* margin: 20px; */
  margin-left: 0;
  background-color: #fff;
}
.leftOverviewTwo {
  height: 33.3333%;
  background: #fff;
  margin: 20px;
  margin-left: 0;
  margin-top: 0;
}
.rightOverview {
  width: 23%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.rightOverviewOne {
  height: 33.3333%;
  background: #fff;
  position: relative;
}
.withLableBox {
  position: absolute;
  top: 253px;
  z-index: 999999999;
  display: flex;
  padding-left: 12%;
}
.rightOverviewTwo {
  height: 60%;
  margin-top: 20px;
  background: #fff;
}
#diagram {
  width: 100%;
  height: 100%;
}
#watch1,
#watch2 {
  width: 100%;
  height: 43%;
}
.mapview-colobar {
  width: 16.666%;
  height: 6px;
  margin: 6px 0;
}
.mapview-colorbar__text {
  position: relative;
  top: -4px;
  left: 10px;
}
.mapview-colorbar__content {
  border-left: 6px solid;
}
.topSecond {
  display: flex;
  height: 309px;
  width: 100%;
}
.houseBox,
.greenBox,
.serviceBox {
  width: 33%;
  margin-right: 12px;
}
.houseBoxTop {
  display: flex;
  justify-content: space-between;
  height: 15%;
  line-height: 50px;
  padding: 0 6px;
  background: #fff;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
#histogramBox {
  padding-top: 2%;
  height: 396px;
  width: 70%;
}
.histogramTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.histogramTitle div {
  cursor: pointer;
}
#barChart {
  height: 95%;
  width: 100%;
}
.rank {
  width: 30%;
  padding: 20px;
  margin-bottom: 20px;
}
.houseBoxBottom {
  display: flex;
  flex-direction: column;
  height: 85%;
}
.houseBoxBottom1 {
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.houseBoxBottom1,
.houseBoxBottom2 {
  position: relative;
  height: 146px;
  background: #fff;
  margin-left: 0;
  width: 100%;
  height: 50%;
}
.houseBoxBottom1:hover {
  background: rgba(236, 245, 255);
  color: #1d7ce4;
  cursor: pointer;
}
.houseBoxBottom2:hover {
  background: rgba(236, 245, 255);
  color: #1d7ce4;
  cursor: pointer;
}
.houseBoxBottom2 {
  margin-right: 0;
}
.houseSmallTitle1 {
  padding-left: 1%;
}
.houseSmallTitle1,
.houseSmallTitle2 {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: rgba(51, 51, 51, 0.71);
}
.houseSmallTitle2 {
  padding-top: 7px;
  top: 111px;
}
.number {
  font-size: 30px;
  color: rgba(0, 0, 0, 0.85);
}
.topThird {
  height: 472px;
  background: #fff;
  margin: 10px;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: unset;
  /* border: 1px solid rgba(233, 233, 233, 1); */
}
.histogram {
  height: 88%;
  display: flex;
}
.threeTitle {
  height: 10%;
  display: flex;
  height: 12%;
  line-height: 57px;
  justify-content: space-between;
  font-size: 16px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.smallTitle {
  display: flex;
  padding-left: 20px;
}
.title1,
.title2,
.title3 {
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
}
.smallTitle .active {
  color: black;
  border-bottom: 2px solid black;
}
.histogramTitle .active {
  color: black;
  border-bottom: 2px solid black;
}
img {
  transform: scale(0.5);
}
.rankBox {
  height: 100%;
  overflow: auto;
  /* display: -ms-flexbox; */
  display: flex;
  padding-top: 33px;
  justify-content: space-around;
}
.rankLeft,
.rankMiddle,
.rankRight {
  width: 33.333%;
  height: 100%;
  padding-right: 90px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
}
.seeLeft {
  width: 60px;
  height: 28px;
  padding-top: 4px;
  margin-top: 13px;
}
.blackN {
  width: 28px;
  height: 28px;
  text-align: center;
  background: #70b603;
  color: white;
  border: 50%;
  padding-top: 4px;
  border-radius: 50%;
  margin-top: 13px;
}
.whiteN {
  width: 28px;
  height: 28px;
  text-align: center;
  background: rgba(240, 242, 245);
  border: 50%;
  padding-top: 4px;
  border-radius: 50%;
  margin-top: 13px;
}
.yearBox {
  padding-right: 70px;
  display: flex;
}
.hoverStyle {
  padding: 0 10px;
}
.yearBox .active {
  border-bottom: 2px solid black;
}
.hoverStyle:hover {
  color: #1d7ce4;
  cursor: pointer;
}
.standardRight {
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  padding: 0 3%;
}
.removeTen {
  padding: 0 20px;
  height: 100%;
}
.chart-select-top__button {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.otherTableHead {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 15%;
  align-items: center;
}
.addTitle {
  display: flex;
  width: 33.3333%;
  padding-left: 8%;
}
.titleRadius {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 2%;
  margin-right: 2%;
}
.selectHeader {
  height: 90%;
}
.imgStyle {
  position: absolute;
  width: 95%;
  height: 20%;
}
#chart-box {
  height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}
.chart-select {
  width: 1100px;
  height: 50px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.greenStyle {
  color: #70b603;
}
.orrange {
  color: #f59a23;
}
.imgFlex {
  display: flex;
  justify-content: center;
  text-align: center;
}
.noneStyle {
  opacity: 0;
}
.haveStyle {
  opacity: 1;
}
.middle-middle-message-box {
}
.middle-middle-message-boxL {
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 145px;
  left: 0;
  /* -webkit-box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1); */
  -webkit-box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: 99;
  background-image: url("images/展开侧面板.png");
  background-size: 40px 40px;
}
.middle-middle-message-boxR {
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 145px;
  left: 363px;
  /* -webkit-box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1); */
  -webkit-box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: 99;
  background-image: url("images/隐藏侧面板.png");
  background-size: 40px 40px;
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
.hiddenScroll {
  overflow-x: hidden;
}
.hiddenScroll::-webkit-scrollbar {
  display: none;
}
.rankBox::-webkit-scrollbar {
  display: none;
}
</style>
