<template>
  <div class="page-body">
    <div class="left-top-stock">
      <div class="left-top-button-other">
        <!-- <epf-title title="存量盘活"></epf-title> -->
        <div class="left-top-button-other-title">存量盘活</div>
        <el-dropdown @command="handleCommand"
                     trigger="click"
                     style="margin-left:24px;">
          <span class="el-dropdown-link">
            {{ this.newCommand }}
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
        <span style="cursor: pointer;display: flex;align-items: center; font-size: 16px;color: #7c8196;"
              @click="handleClickMap">
          <i class="tb-icon"></i>地图模式
        </span>
      </div>
    </div>
    <div class="tab-stock"
         style="height:calc(100% - 40px);">
      <div class="tab-big-box">
        <div style="width:96px;height:100%;margin-right:16px;display:flex;flex-direction: column;justify-content: center;align-items: center;">
          <div class="tab-title"
               :class="{
              'tab-title1': phActiveName === 'KPH',
              'tab-title3': phActiveName === 'YPH'
            }"
               @click="turnKPH">
            可盘活用地
          </div>
          <div class="tab-title"
               :class="{
              'tab-title2': phActiveName === 'YPH',
              'tab-title4': phActiveName === 'KPH'
            }"
               @click="turnYPH">
            已盘活用地
          </div>
        </div>
        <!-- 可盘活用地 -->
        <ul class="tab-left-top"
            v-if="phActiveName === 'KPH'">
          <li class="tab-left-top-one"
              :class="{ 'message-box04': stockStartIndex == 3 }"
              @click="turnTotal">
            <el-dropdown trigger="click"
                         placement="top-start">
              <span class="el-dropdown-link"
                    style="color:#414141;font-size:18px;padding-left:8px;">
                {{ this.newCityCommand }}
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown"
                                style="padding:0;">
                <el-cascader-panel :props="props"
                                   :options="options"
                                   ref="cascaderAddr"
                                   clearable
                                   v-model="areaSelectedOptions"
                                   @change="areaSelect()"
                                   style="backgroundColor:#fff;"></el-cascader-panel>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="tab-left-top-one-number">
              <span>{{ this.stockStartFirst.indexValue }}</span>
              <span>{{ this.stockStartFirst.unit }}</span>
            </div>
            <div class="tab-left-top-one-tbBox">
              <div class="tab-left-top-one-tb">
                <span>环比</span>
                <span>
                  <i class="el-icon-caret-top"
                     style="color:#9DD31C;font-size:16px;"
                     v-if="this.stockStartFirst.momValue > 0"></i>
                  <i class="el-icon-caret-bottom"
                     style="color:#F79861;font-size:16px;"
                     v-if="this.stockStartFirst.momValue < 0"></i>
                  {{ this.stockStartFirst.momValue
                  }}{{ this.stockStartFirst.unit }}
                </span>
              </div>
              <!-- <div class="tab-left-top-one-tb">
                    <span>同比</span>
                    <span>
                      <i
                        class="el-icon-caret-top"
                        style="color:#90da6c;font-size:14px;"
                        v-if="this.stockStartFirst.tongbiDirection===0"
                      ></i>
                      <i
                        class="el-icon-caret-bottom"
                        style="color:#f5222d;font-size:14px;"
                        v-if="this.stockStartFirst.tongbiDirection===1"
                      ></i>
                      {{this.stockStartFirst.tongbi}}{{this.stockStartFirst.tongbiUnit}}
                    </span>
                  </div>-->
            </div>
          </li>
          <li class="tab-left-top-one"
              :class="{
              'message-box01': stockStartIndex == 0,
              'message-box02': stockStartIndex == 1,
              'message-box03': stockStartIndex == 2
            }"
              v-for="(item, index) in stockStartList"
              :key="index"
              @click="turnIndex(item, index)">
            <div class="tab-left-top-one-title">
              <span>{{ item.name }}</span>
              <span class="tab-left-top-one-check"
                    @click="handleClickDetail(item, index)">查看详情</span>
            </div>
            <div class="tab-left-top-one-number">
              <span>{{ item.indexValue }}</span>
              <span>{{ item.unit }}</span>
            </div>
            <div class="tab-left-top-one-tbBox">
              <div class="tab-left-top-one-tb">
                <span>环比</span>
                <span>
                  <i class="el-icon-caret-top"
                     style="color:#9DD31C;font-size:16px;"
                     v-if="item.momValue > 0"></i>
                  <i class="el-icon-caret-bottom"
                     style="color:#F79861;font-size:16px;"
                     v-if="item.momValue < 0"></i>
                  {{ item.momValue }}{{ item.unit }}
                </span>
              </div>
              <!-- <div class="tab-left-top-one-tb">
                    <span>同比</span>
                    <span>
                      <i
                        class="el-icon-caret-top"
                        style="color:#90da6c;font-size:14px;"
                        v-if="item.tongbiDirection===0"
                      ></i>
                      <i
                        class="el-icon-caret-bottom"
                        style="color:#f5222d;font-size:14px;"
                        v-if="item.tongbiDirection===1"
                      ></i>
                      {{item.tongbi}}{{item.tongbiUnit}}
                    </span>
                  </div>-->
            </div>
          </li>
        </ul>
        <!-- 已盘活用地 -->
        <ul class="tab-left-top"
            v-if="phActiveName === 'YPH'">
          <li class="tab-left-top-one"
              :class="{ 'message-box04': stockStartIndex == 3 }"
              @click="turnTotal1">
            <el-dropdown trigger="click"
                         placement="top-start">
              <span class="el-dropdown-link"
                    style="color:#414141;font-size:18px;padding-left:8px;">
                {{ this.newCityCommand }}
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown"
                                style="padding:0;">
                <el-cascader-panel :props="props"
                                   :options="options"
                                   ref="cascaderAddr1"
                                   clearable
                                   v-model="areaSelectedOptions"
                                   @change="areaSelect1()"
                                   style="backgroundColor:#fff;"></el-cascader-panel>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="tab-left-top-one-number">
              <span>{{ this.stockEndFirst.indexValue }}</span>
              <span>{{ this.stockEndFirst.unit }}</span>
            </div>
            <div class="tab-left-top-one-tbBox">
              <div class="tab-left-top-one-tb">
                <span>环比</span>
                <span>
                  <i class="el-icon-caret-top"
                     style="color:#9DD31C;font-size:16px;"
                     v-if="this.stockEndFirst.momValue > 0"></i>
                  <i class="el-icon-caret-bottom"
                     style="color:#F79861;font-size:16px;"
                     v-if="this.stockEndFirst.momValue < 0"></i>
                  {{ this.stockEndFirst.momValue }}{{ this.stockEndFirst.unit }}
                </span>
              </div>
              <!-- <div class="tab-left-top-one-tb">
                    <span>同比</span>
                    <span>
                      <i
                        class="el-icon-caret-top"
                        style="color:#90da6c;font-size:14px;"
                        v-if="this.stockEndFirst.tongbiDirection===0"
                      ></i>
                      <i
                        class="el-icon-caret-bottom"
                        style="color:#f5222d;font-size:14px;"
                        v-if="this.stockEndFirst.tongbiDirection===1"
                      ></i>
                      {{this.stockEndFirst.tongbi}}{{this.stockEndFirst.tongbiUnit}}
                    </span>
                  </div>-->
            </div>
          </li>
          <li class="tab-left-top-one"
              :class="{
              'message-box01': stockStartIndex == 0,
              'message-box02': stockStartIndex == 1,
              'message-box03': stockStartIndex == 2
            }"
              v-for="(item, index) in stockEndList"
              :key="index"
              @click="turnIndex(item, index)">
            <div class="tab-left-top-one-title">
              <span>{{ item.name }}</span>
              <span class="tab-left-top-one-check"
                    @click="handleClickDetail(item, index)">查看详情</span>
            </div>
            <div class="tab-left-top-one-number">
              <span>{{ item.indexValue }}</span>
              <span>{{ item.unit }}</span>
            </div>
            <div class="tab-left-top-one-tbBox">
              <div class="tab-left-top-one-tb">
                <span>环比</span>
                <span>
                  <i class="el-icon-caret-top"
                     style="color:#9DD31C;font-size:16px;"
                     v-if="item.momValue > 0"></i>
                  <i class="el-icon-caret-bottom"
                     style="color:#F79861;font-size:16px;"
                     v-if="item.momValue < 0"></i>
                  {{ item.momValue }}{{ item.unit }}
                </span>
              </div>
              <!-- <div class="tab-left-top-one-tb">
                    <span>同比</span>
                    <span>
                      <i
                        class="el-icon-caret-top"
                        style="color:#90da6c;font-size:14px;"
                        v-if="item.tongbiDirection===0"
                      ></i>
                      <i
                        class="el-icon-caret-bottom"
                        style="color:#f5222d;font-size:14px;"
                        v-if="item.tongbiDirection===1"
                      ></i>
                      {{item.tongbi}}{{item.tongbiUnit}}
                    </span>
                  </div>-->
            </div>
          </li>
        </ul>
      </div>
      <div class="chart-left-box">
        <div class="chart-left-box-inset">
          <div id="chinaChart"
               style="width:75%;height: 100%;"
               ref="mapChart"></div>
          <div class="rank">
            <div class="rankTitle">
              <span>地市排名情况</span>
              <span>单位：{{ this.mapSelectEnumUnit }}</span>
            </div>
            <div class="rankBox">
              <div class="rankBox-left">
                <div class="rankLeft">
                  <div class="blackN"
                       v-for="(item, index) in frontUpCity"
                       :key="index">
                    {{ index + 1 }}
                  </div>
                  <div class="whiteN"
                       v-for="(item, index) in behindUpCity"
                       :key="index">
                    {{ index + 4 }}
                  </div>
                </div>
                <div class="rankRight">
                  <span v-for="(item, index) in upCity"
                        :key="index"
                        class="rankMessage">{{ item.name }}</span>
                </div>
              </div>

              <div class="rankRight-number">
                <span v-for="(item, i) in upCity"
                      :key="i"
                      class="rankMessage">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="list-left-box" v-if="isShowList">
        <StockList
          :showListIndexMsg="showListIndex"
          @showInfo="getShowData"
          ref="stockList"
        ></StockList>
      </div> -->
    </div>
    <!-- <div v-show="currentTab === 2" class="tab">
      <IconModeBase
        :year="newCommand"
        @open="openData"
        ref="icoModeBase"
      ></IconModeBase>
    </div> -->
  </div>
</template>
<script>
import gisMixin from '../mixins/stock'
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import qs from 'qs'
import Bus from '../../../../utils/bus'
import echarts from 'echarts'
import moment from 'moment'
import StockList from './StockList'
import IconModeBase from './icon-Mode/IconModeBase'
import areaMixin from './area'
import '../../../../../static/map/js/province/guangdong'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  name: 'StockIndex',
  components: {
    StockList,
    IconModeBase
  },
  mixins: [areaMixin, gisMixin],
  data () {
    return {
      activeClose: 'StockIndex',
      areaSelectedOptions: ['440000'],
      // props: {
      //   value: "dictKey",
      //   label: "zhCn",
      //   checkStrictly: true,
      //   expandTrigger: "hover",
      //   lazy: true,
      //   async lazyLoad(node, resolve) {
      //     const { level } = node;
      //     if (level === 0) {
      //       const dictionariesList = [
      //         {
      //           zhCn: "广东省",
      //           id: "440000",
      //           parentId: "0",
      //           dictKey: "440000",
      //           dictValue: "440000"
      //         }
      //       ];
      //       return resolve(dictionariesList);
      //     }
      //     const res = await axios.get(
      //       `/api/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${node.data.dictKey}`
      //     );
      //     res.dictionariesList.forEach(item => (item.leaf = level >= 2));
      //     return resolve(res.dictionariesList);
      //   }
      // },
      props: {
        checkStrictly: true,
        expandTrigger: 'click'
      },
      // 地图
      chart: null,
      timeFn: null,
      currentDIv: 0,
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

      // clickCity: "", // 获取市id
      clickAreaName: '', // 获取区name

      // 请求参数
      params: {
        province: '440000',
        city: '',
        area: '',
        year: ''
      },

      newCommand: '2020年',
      newCityCommand: '全省总数',
      currentTab: 1,
      activeName: 'first',

      stockStartFirst: {},
      stockStartList: [],
      stockEndFirst: {},
      stockEndList: [],

      stockStartIndex: 3,

      upCity: [],
      frontUpCity: [],
      behindUpCity: [],

      isShowList: false,
      showListIndex: '',

      selectEnumName: 'CAN_ALL',
      selectEnumType: '可盘活存量用地',
      selectEnumUnit: '',

      isShowMenuSpecial: '',

      phActiveName: 'KPH',
      mapSelectEnumUnit: ''
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    turnKPH () {
      this.phActiveName = 'KPH'
      if (this.stockStartIndex == 0) {
        this.selectEnumName = 'CAN_PEWZ'
        this.selectEnumUnit = this.stockStartList[0].unit
      } else if (this.stockStartIndex == 1) {
        this.selectEnumName = 'CAN_ZEWG'
        this.selectEnumUnit = this.stockStartList[1].unit
      } else if (this.stockStartIndex == 2) {
        this.selectEnumName = 'CAN_XZ'
        this.selectEnumUnit = this.stockStartList[2].unit
      } else if (this.stockStartIndex == 3) {
        this.selectEnumName = 'CAN_ALL'
        this.selectEnumUnit = this.stockStartFirst.unit
      }
      this.$nextTick(function () {
        setTimeout(() => {
          // this.loadMap(
          //   "../../../../../static/map/json/province/440000.json",
          //   "guangdong"
          // );
          this.changeMap()
        }, 100)
      })
    },
    turnYPH () {
      this.phActiveName = 'YPH'
      if (this.stockStartIndex == 0) {
        this.selectEnumName = 'ALREADY_PEWZ'
        this.selectEnumUnit = this.stockEndList[0].unit
      } else if (this.stockStartIndex == 1) {
        this.selectEnumName = 'ALREADY_ZEWG'
        this.selectEnumUnit = this.stockEndList[1].unit
      } else if (this.stockStartIndex == 2) {
        this.selectEnumName = 'ALREADY_XZ'
        this.selectEnumUnit = this.stockEndList[2].unit
      } else if (this.stockStartIndex == 3) {
        this.selectEnumName = 'ALREADY_ALL'
        this.selectEnumUnit = this.stockEndFirst.unit
      }
      this.$nextTick(function () {
        setTimeout(() => {
          // this.loadMap(
          //   "../../../../../static/map/json/province/440000.json",
          //   "guangdong"
          // );
          this.changeMap()
        }, 100)
      })
    },
    getShowData (val) {
      if (this.activeClose === 'IconModeBase') {
        this.currentTab = 2
      } else {
        this.currentTab = 1
      }
      this.isShowList = val
    },
    handleCommand (command) {
      this.newCommand = command
    },
    turnFirst () {
      this.currentTab = 1
      this.isShowList = false
    },
    turnSecond () {
      this.currentTab = 2
    },
    handleClickSelect (val) {
      if (val.name === 'first') {
        if (this.stockStartIndex == 0) {
          this.selectEnumName = 'CAN_PEWZ'
          this.selectEnumUnit = this.stockStartList[0].unit
        } else if (this.stockStartIndex == 1) {
          this.selectEnumName = 'CAN_ZEWG'
          this.selectEnumUnit = this.stockStartList[1].unit
        } else if (this.stockStartIndex == 2) {
          this.selectEnumName = 'CAN_XZ'
          this.selectEnumUnit = this.stockStartList[2].unit
        } else if (this.stockStartIndex == 3) {
          this.selectEnumName = 'CAN_ALL'
          this.selectEnumUnit = this.stockStartFirst.unit
        }
      } else if (val.name === 'second') {
        if (this.stockStartIndex == 0) {
          this.selectEnumName = 'ALREADY_PEWZ'
          this.selectEnumUnit = this.stockEndList[0].unit
        } else if (this.stockStartIndex == 1) {
          this.selectEnumName = 'ALREADY_ZEWG'
          this.selectEnumUnit = this.stockEndList[1].unit
        } else if (this.stockStartIndex == 2) {
          this.selectEnumName = 'ALREADY_XZ'
          this.selectEnumUnit = this.stockEndList[2].unit
        } else if (this.stockStartIndex == 3) {
          this.selectEnumName = 'ALREADY_ALL'
          this.selectEnumUnit = this.stockEndFirst.unit
        }
      }
      this.$nextTick(function () {
        setTimeout(() => {
          // this.loadMap(
          //   "../../../../../static/map/json/province/440000.json",
          //   "guangdong"
          // );
          this.changeMap()
        }, 100)
      })
    },
    turnTotal () {
      this.stockStartIndex = 3
      this.selectEnumName = 'CAN_ALL'
      this.selectEnumUnit = this.stockStartFirst.unit
    },
    turnTotal1 () {
      this.stockStartIndex = 3
      this.selectEnumName = 'ALREADY_ALL'
      this.selectEnumUnit = this.stockEndFirst.unit
    },
    turnIndex (item, index) {
      this.stockStartIndex = index
      this.selectEnumName = item.enumName
      this.selectEnumUnit = item.unit
    },
    areaSelect (item) {
      if (this.areaSelectedOptions.length === 3) {
        this.newCityCommand
          = this.$refs['cascaderAddr'].checkedNodePaths[0][2].label + '总数'
      } else if (this.areaSelectedOptions.length === 2) {
        this.newCityCommand
          = this.$refs['cascaderAddr'].checkedNodePaths[0][1].label + '总数'
      } else if (this.areaSelectedOptions.length === 1) {
        this.newCityCommand = '全省总数'
      }
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
      sessionStorage.setItem('stockCity', this.params.city)
    },
    areaSelect1 (item) {
      if (this.areaSelectedOptions.length === 3) {
        this.newCityCommand
          = this.$refs['cascaderAddr1'].checkedNodePaths[0][2].label + '总数'
      } else if (this.areaSelectedOptions.length === 2) {
        this.newCityCommand
          = this.$refs['cascaderAddr1'].checkedNodePaths[0][1].label + '总数'
      } else if (this.areaSelectedOptions.length === 1) {
        this.newCityCommand = '全省总数'
      }
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
      sessionStorage.setItem('stockCity', this.params.city)
    },
    handleClickDetail (item, index) {
      this.activeClose = 'StockIndex'
      // this.isShowList = true;
      // this.showListIndex = index;
      console.log(item)

      let title = '详情列表'
      let routerPath = 'StockList'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        name: 'StockList',
        query: {
          year: this.newCommand,
          title: item.name
        }
      })
      Bus.$emit('stockTableListT', item.name)
      Bus.$emit('stockTableListY', this.newCommand)
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
          year: this.newCommand.substring(0, 4)
        }
      })
    },
    async getListData () {
      let params = this.params
      params['year'] = this.newCommand.substring(0, 4)
      let res = await this.$get(
        '/epf-monitor-evaluation/stockActivation/acTable',
        params
      )
      if (res.code === 0) {
        for (var key in res.result) {
          if (res.result[key].indexValue == null) {
            let index = key
            res.result[index].indexValue = '- -'
          } else if (res.result[key].indexValue != null) {
            let index = key
            res.result[index].indexValue = Number(
              res.result[index].indexValue
            ).toFixed(2)
          }
          if (res.result[key].momValue == null) {
            let index = key
            res.result[index].momValue = '- -'
          } else if (res.result[key].momValue != null) {
            let index = key
            res.result[index].momValue = Number(
              res.result[index].momValue
            ).toFixed(2)
          }
        }
        this.stockStartFirst = res.result[0]
        this.stockStartList = res.result.slice(1, 4)
        this.stockEndFirst = res.result[4]
        this.stockEndList = res.result.slice(5, res.result.length)
        this.selectEnumUnit = this.stockStartFirst.unit
      } else {
        this.$message.error(res.msg) // 失败
      }
    },
    // 地图展示
    async loadMap (mapCode, name) {
      setTimeout(() => {
        document.getElementById('chinaChart').style.width = 75 + '%'
        document.getElementById('chinaChart').style.height = 100 + '%'
        this.chart = echarts.init(this.$refs.mapChart)
        this.chart.resize() // 直接加这句即可
      }, 0)

      // 请求数据
      let params = this.params
      params['year'] = this.newCommand.substring(0, 4)

      let mapRes = await this.$get(
        `/epf-monitor-evaluation/stockActivation/acTop?enumName=${this.selectEnumName}`,
        params
      )

      if (mapRes.code == 0) {
        let chartData = mapRes.result

        var mapAllData = []
        var allData = []

        for (var key in chartData) {
          if (params.city == '') {
            mapAllData.push({
              name: chartData[key].cantonCityName,
              value: Number(chartData[key].indexValueDouble).toFixed(2),
              unit: chartData[key].unit,
              province: chartData[key].cantonProvince,
              city: chartData[key].cantonCity,
              area: chartData[key].cantonArea
            })
          } else {
            mapAllData.push({
              name: chartData[key].cantonAreaName,
              value: Number(chartData[key].indexValueDouble).toFixed(2),
              unit: chartData[key].unit,
              province: chartData[key].cantonProvince,
              city: chartData[key].cantonCity,
              area: chartData[key].cantonArea
            })
          }
          allData.push(Math.ceil(Number(chartData[key].indexValueDouble)))
        }

        function compare (prop) {
          return (a, b) => {
            a = a[prop]
            b = b[prop]
            return b - a
          }
        }
        mapAllData.sort(compare('value'))

        if (params.area != '') {
          return
        } else {
          this.upCity = mapAllData
          this.frontUpCity = this.upCity.slice(0, 3)
          this.behindUpCity = this.upCity.slice(3, this.upCity.length)
        }

        let mapSelectEnumUnit = chartData[0].unit
        this.mapSelectEnumUnit = mapSelectEnumUnit

        let maxAllData = Math.max.apply(Math, allData) // 求最大值
        let minAllData = Math.min.apply(Math, allData) // 求最大值

        let level1 = minAllData + ((maxAllData - minAllData) / 3) * 1
        level1 -= level1 % 100
        level1 += 100

        let level2 = minAllData + ((maxAllData - minAllData) / 3) * 2
        level2 -= level2 % 100
        level2 += 100

        let level3 = minAllData + ((maxAllData - minAllData) / 3) * 3
        level3 -= level3 % 100
        level3 += 100

        let color1 = '#303030'
        let color2 = '#707070'

        const that = this
        const data = await axios.get(mapCode)

        if (data) {
          this.chart = echarts.init(this.$refs.mapChart)
          echarts.registerMap(name, data)

          var option = {
            title: {
              text: this.selectEnumType + '(' + mapSelectEnumUnit + ')',
              bottom: 90,
              right: 35,
              textStyle: {
                color: color1,
                fontSize: 14,
                fontWeight: 'bolder'
              }
            },
            tooltip: {},
            visualMap: {
              type: 'piecewise', // 分段型。
              splitNumber: 3,
              inverse: true,

              pieces: [
                {
                  min: 0,
                  max: level1,
                  label: '0 - ' + level1,
                  color: '#ffe9c9'
                },
                {
                  min: level1,
                  max: level2,
                  label: level1 + ' - ' + level2,
                  color: '#fbb567'
                },
                {
                  min: level2,
                  max: level3,
                  label: level2 + ' - ' + level3,
                  color: '#f0760c'
                }
              ],
              right: '3%',
              bottom: '3%',
              textStyle: {
                color: color2,
                fontSize: 12
              }
            },
            series: [
              {
                name: 'MAP',
                type: 'map',
                // roam: true, //禁止缩放
                mapType: name,
                aspectScale: 1,
                selectedMode: 'false', // 是否允许选中多个区域
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    // borderColor: "#b2b1a4",
                    // borderWidth: 1
                  }, // 正常样式
                  emphasis: {
                    // areaColor: "#10d4c3",
                    borderWidth: 2,
                    borderColor: '#5276f1'
                  } // 鼠标事件区块样式
                },
                zoom: 1.2,
                tooltip: {
                  trigger: 'item',
                  // formatter: "{b} : {c}"
                  formatter: function (params) {
                    if (params.data) {
                      return (
                        params.name
                        + '：'
                        + params.data['value']
                        + params.data['unit']
                      )
                    } else {
                      return params.name + '：' + 0 + params.data['unit']
                    }
                  }
                },
                data: mapAllData
              }
            ]
          }
          this.chart.setOption(option, true)
          this.chart.on('click', function (params) {
            sessionStorage.setItem('stockCity', params.data.city)
            sessionStorage.setItem('stockArea', params.data.name)

            that.params.city = sessionStorage.getItem('stockCity')
            that.clickAreaName = sessionStorage.getItem('stockArea')

            clearTimeout(this.timeFn)
            this.timeFn = setTimeout(function () {
              const name = params.name
              const mapCode = that.pro[name]

              if (!mapCode) {
                console.log('1')
                return
              }
              that.loadMap(mapCode, name)

              setTimeout(() => {
                document.getElementById('chinaChart').style.width = 75 + '%'
                document.getElementById('chinaChart').style.height = 100 + '%'
              }, 0)

              //   that.isCity = true;
              //   that.breadcrumbCityName = name;
            }, 250)
          })
        } else {
          alert('无法加载该地图')
        }
      } else {
        this.$message.error(mapRes.msg) // 失败
      }
    },
    returnLastStep () {
      const that = this
      this.chart = echarts.init(this.$refs.mapChart)
      // 绑定双击事件，返回全省地图
      this.chart.on('dblclick', function (params) {
        // 当双击事件发生时，清除单击事件，仅响应双击事件
        sessionStorage.removeItem('stockCity')
        sessionStorage.removeItem('stockArea')
        that.params.city = ''
        that.clickAreaName = ''
        that.params.area = ''
        that.areaSelectedOptions = ['440000']
        clearTimeout(this.timeFn)

        // that.loadMap(
        //   "../../../../../static/map/json/province/440000.json",
        //   "guangdong"
        // );
        setTimeout(() => {
          document.getElementById('chinaChart').style.width = 75 + '%'
          document.getElementById('chinaChart').style.height = 100 + '%'
        }, 0)

        // that.isCity = false;
        // that.breadcrumbCityName = "";
        // that.isArea = false;
        // that.breadcrumbAreaName = "";
      })
    },
    changeMap () {
      if (sessionStorage.getItem('stockCity')) {
        if (sessionStorage.getItem('stockCity') == '440100') {
          this.loadMap(
            '../../../../../static/map/json/province/440100.json',
            '广州市'
          )
        } else if (sessionStorage.getItem('stockCity') == '440200') {
          this.loadMap(
            '../../../../../static/map/json/province/440200.json',
            '韶关市'
          )
        } else if (sessionStorage.getItem('stockCity') == '440300') {
          this.loadMap(
            '../../../../../static/map/json/province/440300.json',
            '深圳市'
          )
        } else if (sessionStorage.getItem('stockCity') == '440400') {
          this.loadMap(
            '../../../../../static/map/json/province/440400.json',
            '珠海市'
          )
        } else if (sessionStorage.getItem('stockCity') == '440500') {
          this.loadMap(
            '../../../../../static/map/json/province/440500.json',
            '汕头市'
          )
        } else if (sessionStorage.getItem('stockCity') == '440600') {
          this.loadMap(
            '../../../../../static/map/json/province/440600.json',
            '佛山市'
          )
        } else if (sessionStorage.getItem('stockCity') == '440700') {
          this.loadMap(
            '../../../../../static/map/json/province/440700.json',
            '江门市'
          )
        } else if (sessionStorage.getItem('stockCity') == '440800') {
          this.loadMap(
            '../../../../../static/map/json/province/440800.json',
            '湛江市'
          )
        } else if (sessionStorage.getItem('stockCity') == '440900') {
          this.loadMap(
            '../../../../../static/map/json/province/440900.json',
            '茂名市'
          )
        } else if (sessionStorage.getItem('stockCity') == '441200') {
          this.loadMap(
            '../../../../../static/map/json/province/441200.json',
            '肇庆市'
          )
        } else if (sessionStorage.getItem('stockCity') == '441300') {
          this.loadMap(
            '../../../../../static/map/json/province/441300.json',
            '惠州市'
          )
        } else if (sessionStorage.getItem('stockCity') == '441400') {
          this.loadMap(
            '../../../../../static/map/json/province/441400.json',
            '梅州市'
          )
        } else if (sessionStorage.getItem('stockCity') == '441500') {
          this.loadMap(
            '../../../../../static/map/json/province/441500.json',
            '汕尾市'
          )
        } else if (sessionStorage.getItem('stockCity') == '441600') {
          this.loadMap(
            '../../../../../static/map/json/province/441600.json',
            '河源市'
          )
        } else if (sessionStorage.getItem('stockCity') == '441700') {
          this.loadMap(
            '../../../../../static/map/json/province/441700.json',
            '阳江市'
          )
        } else if (sessionStorage.getItem('stockCity') == '441800') {
          this.loadMap(
            '../../../../../static/map/json/province/441800.json',
            '清远市'
          )
        } else if (sessionStorage.getItem('stockCity') == '441900') {
          this.loadMap(
            '../../../../../static/map/json/province/441900.json',
            '东莞市'
          )
        } else if (sessionStorage.getItem('stockCity') == '442000') {
          this.loadMap(
            '../../../../../static/map/json/province/442000.json',
            '中山市'
          )
        } else if (sessionStorage.getItem('stockCity') == '445100') {
          this.loadMap(
            '../../../../../static/map/json/province/445100.json',
            '潮州市'
          )
        } else if (sessionStorage.getItem('stockCity') == '445200') {
          this.loadMap(
            '../../../../../static/map/json/province/445200.json',
            '揭阳市'
          )
        } else if (sessionStorage.getItem('stockCity') == '445300') {
          this.loadMap(
            '../../../../../static/map/json/province/445300.json',
            '云浮市'
          )
        }
      } else {
        this.loadMap(
          '../../../../../static/map/json/province/440000.json',
          'guangdong'
        )
      }
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.mapChart)
        document.getElementById('chinaChart').style.width = 75 + '%'
        document.getElementById('chinaChart').style.height = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    },
    openData () {
      this.activeClose = 'IconModeBase'
      this.currentTab = 1
      this.isShowList = true
    }
  },
  created () {
    this.getListData()
    window.addEventListener('setItem', () => {
      this.isShowMenuSpecial = sessionStorage.getItem('watchShow')
    })
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        // this.loadMap(
        //   "../../../../../static/map/json/province/440000.json",
        //   "guangdong"
        // );
        this.changeMap()
      }, 1000)
    })
    this.initEchart()
    this.returnLastStep()
    window.addEventListener('setItem', () => {
      this.isShowMenuSpecial = sessionStorage.getItem('watchShow')
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  destroyed () {
    window.removeEventListener(
      'resize',
      () => {
        this.chart = echarts.init(this.$refs.mapChart)
        document.getElementById('chinaChart').style.width = 75 + '%'
        document.getElementById('chinaChart').style.height = 100 + '%'
        this.chart.resize() // 直接加这句即可
      },
      20
    )
    sessionStorage.removeItem('stockCity')
  },
  watch: {
    $route (to, from) {
      if (to.path === '/StockIndex') {
        this.$nextTick(function () {
          setTimeout(() => {
            this.changeMap()
          }, 1000)
        })
      }
    },
    isShowMenuSpecial: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.changeMap()
          }, 0)
        })
      }
    },
    currentTab (val) {
      if (val === 2) {
        this.$refs.icoModeBase.mapviewHidden = true
      }
    },
    isShowList: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            // this.loadMap(
            //   "../../../../../static/map/json/province/440000.json",
            //   "guangdong"
            // );
            this.changeMap()
          }, 100)
        })
      }
    },
    currentTab: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val === 1) {
          this.$nextTick(function () {
            setTimeout(() => {
              // this.loadMap(
              //   "../../../../../static/map/json/province/440000.json",
              //   "guangdong"
              // );
              this.changeMap()
            }, 100)
          })
        }
      }
    },
    params: {
      immediate: true,
      deep: true,
      handler (val) {
        console.log(val)
        // 查询数据
        this.$nextTick(function () {
          setTimeout(() => {
            // this.loadMap(
            //   "../../../../../static/map/json/province/440000.json",
            //   "guangdong"
            // );
            this.changeMap()
          }, 100)
        })
        this.getListData()
      }
    },
    'params.city': {
      immediate: true,
      deep: true,
      handler (val) {
        if (val == '440100') {
          this.newCityCommand = '广州市总数'
          this.areaSelectedOptions = ['440000', '440100']
        } else if (val == '440200') {
          this.newCityCommand = '韶关市总数'
          this.areaSelectedOptions = ['440000', '440200']
        } else if (val == '440300') {
          this.newCityCommand = '深圳市总数'
          this.areaSelectedOptions = ['440000', '440300']
        } else if (val == '440400') {
          this.newCityCommand = '珠海市总数'
          this.areaSelectedOptions = ['440000', '440400']
        } else if (val == '440500') {
          this.newCityCommand = '汕头市总数'
          this.areaSelectedOptions = ['440000', '440500']
        } else if (val == '440600') {
          this.newCityCommand = '佛山市总数'
          this.areaSelectedOptions = ['440000', '440600']
        } else if (val == '440700') {
          this.newCityCommand = '江门市总数'
          this.areaSelectedOptions = ['440000', '440700']
        } else if (val == '440800') {
          this.newCityCommand = '湛江市总数'
          this.areaSelectedOptions = ['440000', '440800']
        } else if (val == '440900') {
          this.newCityCommand = '茂名市总数'
          this.areaSelectedOptions = ['440000', '440900']
        } else if (val == '441200') {
          this.newCityCommand = '肇庆市总数'
          this.areaSelectedOptions = ['440000', '441200']
        } else if (val == '441300') {
          this.newCityCommand = '惠州市总数'
          this.areaSelectedOptions = ['440000', '441300']
        } else if (val == '441400') {
          this.newCityCommand = '梅州市总数'
          this.areaSelectedOptions = ['440000', '441400']
        } else if (val == '441500') {
          this.newCityCommand = '汕尾市总数'
          this.areaSelectedOptions = ['440000', '441500']
        } else if (val == '441600') {
          this.newCityCommand = '河源市总数'
          this.areaSelectedOptions = ['440000', '441600']
        } else if (val == '441700') {
          this.newCityCommand = '阳江市总数'
          this.areaSelectedOptions = ['440000', '441700']
        } else if (val == '441800') {
          this.newCityCommand = '清远市总数'
          this.areaSelectedOptions = ['440000', '441800']
        } else if (val == '441900') {
          this.newCityCommand = '东莞市总数'
          this.areaSelectedOptions = ['440000', '441900']
        } else if (val == '442000') {
          this.newCityCommand = '中山市总数'
          this.areaSelectedOptions = ['440000', '442000']
        } else if (val == '445100') {
          this.newCityCommand = '潮州市总数'
          this.areaSelectedOptions = ['440000', '445100']
        } else if (val == '445200') {
          this.newCityCommand = '揭阳市总数'
          this.areaSelectedOptions = ['440000', '445200']
        } else if (val == '445300') {
          this.newCityCommand = '云浮市总数'
          this.areaSelectedOptions = ['440000', '445300']
        } else if (val == '') {
          this.newCityCommand = '全省总数'
          this.areaSelectedOptions = ['440000']
        }
      }
    },
    clickAreaName (val) {
      console.log(val)
      if (val == '荔湾区') {
        this.params.area = '440103'
        this.newCityCommand = '荔湾区总数'
        this.areaSelectedOptions = ['440000', '440100', '440103']
      } else if (val == '越秀区') {
        this.params.area = '440104'
        this.newCityCommand = '越秀区总数'
        this.areaSelectedOptions = ['440000', '440100', '440104']
      } else if (val == '海珠区') {
        this.params.area = '440105'
        this.newCityCommand = '海珠区总数'
        this.areaSelectedOptions = ['440000', '440100', '440105']
      } else if (val == '天河区') {
        this.params.area = '440106'
        this.newCityCommand = '天河区总数'
        this.areaSelectedOptions = ['440000', '440100', '440106']
      } else if (val == '白云区') {
        this.params.area = '440111'
        this.newCityCommand = '白云区总数'
        this.areaSelectedOptions = ['440000', '440100', '440111']
      } else if (val == '黄埔区') {
        this.params.area = '440112'
        this.newCityCommand = '黄埔区总数'
        this.areaSelectedOptions = ['440000', '440100', '440112']
      } else if (val == '番禺区') {
        this.params.area = '440113'
        this.newCityCommand = '番禺区总数'
        this.areaSelectedOptions = ['440000', '440100', '440113']
      } else if (val == '花都区') {
        this.params.area = '440114'
        this.newCityCommand = '花都区总数'
        this.areaSelectedOptions = ['440000', '440100', '440114']
      } else if (val == '南沙区') {
        this.params.area = '440115'
        this.newCityCommand = '南沙区总数'
        this.areaSelectedOptions = ['440000', '440100', '440115']
      } else if (val == '从化区') {
        this.params.area = '440117'
        this.newCityCommand = '从化区总数'
        this.areaSelectedOptions = ['440000', '440100', '440117']
      } else if (val == '增城区') {
        this.params.area = '440118'
        this.newCityCommand = '增城区总数'
        this.areaSelectedOptions = ['440000', '440100', '440118']
      } else if (val == '武江区') {
        this.params.area = '440203'
        this.newCityCommand = '武江区总数'
        this.areaSelectedOptions = ['440000', '440200', '440203']
      } else if (val == '浈江区') {
        this.params.area = '440204'
        this.newCityCommand = '浈江区总数'
        this.areaSelectedOptions = ['440000', '440200', '440204']
      } else if (val == '曲江区') {
        this.params.area = '440205'
        this.newCityCommand = '曲江区总数'
        this.areaSelectedOptions = ['440000', '440200', '440205']
      } else if (val == '始兴县') {
        this.params.area = '440222'
        this.newCityCommand = '始兴县总数'
        this.areaSelectedOptions = ['440000', '440200', '440222']
      } else if (val == '仁化县') {
        this.params.area = '440224'
        this.newCityCommand = '仁化县总数'
        this.areaSelectedOptions = ['440000', '440200', '440224']
      } else if (val == '翁源县') {
        this.params.area = '440229'
        this.newCityCommand = '翁源县总数'
        this.areaSelectedOptions = ['440000', '440200', '440229']
      } else if (val == '乳源瑶族自治县') {
        this.params.area = '440232'
        this.newCityCommand = '乳源瑶族自治县总数'
        this.areaSelectedOptions = ['440000', '440200', '440232']
      } else if (val == '新丰县') {
        this.params.area = '440233'
        this.newCityCommand = '新丰县总数'
        this.areaSelectedOptions = ['440000', '440200', '440233']
      } else if (val == '乐昌市') {
        this.params.area = '440281'
        this.newCityCommand = '乐昌市总数'
        this.areaSelectedOptions = ['440000', '440200', '440281']
      } else if (val == '南雄市') {
        this.params.area = '440282'
        this.newCityCommand = '南雄市总数'
        this.areaSelectedOptions = ['440000', '440200', '440282']
      } else if (val == '罗湖区') {
        this.params.area = '440303'
        this.newCityCommand = '罗湖区总数'
        this.areaSelectedOptions = ['440000', '440300', '440303']
      } else if (val == '福田区') {
        this.params.area = '440304'
        this.newCityCommand = '福田区总数'
        this.areaSelectedOptions = ['440000', '440300', '440304']
      } else if (val == '南山区') {
        this.params.area = '440305'
        this.newCityCommand = '南山区总数'
        this.areaSelectedOptions = ['440000', '440300', '440305']
      } else if (val == '宝安区') {
        this.params.area = '440306'
        this.newCityCommand = '宝安区总数'
        this.areaSelectedOptions = ['440000', '440300', '440306']
      } else if (val == '龙岗区') {
        this.params.area = '440307'
        this.newCityCommand = '龙岗区总数'
        this.areaSelectedOptions = ['440000', '440300', '440307']
      } else if (val == '盐田区') {
        this.params.area = '440308'
        this.newCityCommand = '盐田区总数'
        this.areaSelectedOptions = ['440000', '440300', '440308']
      } else if (val == '龙华区') {
        this.params.area = '440309'
        this.newCityCommand = '龙华区总数'
        this.areaSelectedOptions = ['440000', '440300', '440309']
      } else if (val == '坪山区') {
        this.params.area = '440310'
        this.newCityCommand = '坪山区总数'
        this.areaSelectedOptions = ['440000', '440300', '440310']
      } else if (val == '光明区') {
        this.params.area = '440311'
        this.newCityCommand = '光明区总数'
        this.areaSelectedOptions = ['440000', '440300', '440311']
      } else if (val == '香洲区') {
        this.params.area = '440402'
        this.newCityCommand = '香洲区总数'
        this.areaSelectedOptions = ['440000', '440400', '440402']
      } else if (val == '斗门区') {
        this.params.area = '440403'
        this.newCityCommand = '斗门区总数'
        this.areaSelectedOptions = ['440000', '440400', '440403']
      } else if (val == '金湾区') {
        this.params.area = '440404'
        this.newCityCommand = '金湾区总数'
        this.areaSelectedOptions = ['440000', '440400', '440404']
      } else if (val == '龙湖区') {
        this.params.area = '440507'
        this.newCityCommand = '龙湖区总数'
        this.areaSelectedOptions = ['440000', '440500', '440507']
      } else if (val == '金平区') {
        this.params.area = '440511'
        this.newCityCommand = '金平区总数'
        this.areaSelectedOptions = ['440000', '440500', '440511']
      } else if (val == '濠江区') {
        this.params.area = '440512'
        this.newCityCommand = '濠江区总数'
        this.areaSelectedOptions = ['440000', '440500', '440512']
      } else if (val == '潮阳区') {
        this.params.area = '440513'
        this.newCityCommand = '潮阳区总数'
        this.areaSelectedOptions = ['440000', '440500', '440513']
      } else if (val == '潮南区') {
        this.params.area = '440514'
        this.newCityCommand = '潮南区总数'
        this.areaSelectedOptions = ['440000', '440500', '440514']
      } else if (val == '澄海区') {
        this.params.area = '440515'
        this.newCityCommand = '澄海区总数'
        this.areaSelectedOptions = ['440000', '440500', '440515']
      } else if (val == '南澳县') {
        this.params.area = '440523'
        this.newCityCommand = '南澳县总数'
        this.areaSelectedOptions = ['440000', '440500', '440523']
      } else if (val == '禅城区') {
        this.params.area = '440604'
        this.newCityCommand = '禅城区总数'
        this.areaSelectedOptions = ['440000', '440600', '440604']
      } else if (val == '南海区') {
        this.params.area = '440605'
        this.newCityCommand = '南海区总数'
        this.areaSelectedOptions = ['440000', '440600', '440605']
      } else if (val == '顺德区') {
        this.params.area = '440606'
        this.newCityCommand = '顺德区总数'
        this.areaSelectedOptions = ['440000', '440600', '440606']
      } else if (val == '三水区') {
        this.params.area = '440607'
        this.newCityCommand = '三水区总数'
        this.areaSelectedOptions = ['440000', '440600', '440607']
      } else if (val == '高明区') {
        this.params.area = '440608'
        this.newCityCommand = '高明区总数'
        this.areaSelectedOptions = ['440000', '440600', '440608']
      } else if (val == '蓬江区') {
        this.params.area = '440703'
        this.newCityCommand = '蓬江区总数'
        this.areaSelectedOptions = ['440000', '440700', '440703']
      } else if (val == '江海区') {
        this.params.area = '440704'
        this.newCityCommand = '江海区总数'
        this.areaSelectedOptions = ['440000', '440700', '440704']
      } else if (val == '新会区') {
        this.params.area = '440705'
        this.newCityCommand = '新会区总数'
        this.areaSelectedOptions = ['440000', '440700', '440705']
      } else if (val == '台山市') {
        this.params.area = '440781'
        this.newCityCommand = '台山市总数'
        this.areaSelectedOptions = ['440000', '440700', '440781']
      } else if (val == '开平市') {
        this.params.area = '440783'
        this.newCityCommand = '开平市总数'
        this.areaSelectedOptions = ['440000', '440700', '440783']
      } else if (val == '鹤山市') {
        this.params.area = '440784'
        this.newCityCommand = '鹤山市总数'
        this.areaSelectedOptions = ['440000', '440700', '440784']
      } else if (val == '恩平市') {
        this.params.area = '440785'
        this.newCityCommand = '恩平市总数'
        this.areaSelectedOptions = ['440000', '440700', '440785']
      } else if (val == '赤坎区') {
        this.params.area = '440802'
        this.newCityCommand = '赤坎区总数'
        this.areaSelectedOptions = ['440000', '440800', '440802']
      } else if (val == '霞山区') {
        this.params.area = '440803'
        this.newCityCommand = '霞山区总数'
        this.areaSelectedOptions = ['440000', '440800', '440803']
      } else if (val == '坡头区') {
        this.params.area = '440804'
        this.newCityCommand = '坡头区总数'
        this.areaSelectedOptions = ['440000', '440800', '440804']
      } else if (val == '麻章区') {
        this.params.area = '440811'
        this.newCityCommand = '麻章区总数'
        this.areaSelectedOptions = ['440000', '440800', '440811']
      } else if (val == '遂溪县') {
        this.params.area = '440823'
        this.newCityCommand = '遂溪县总数'
        this.areaSelectedOptions = ['440000', '440800', '440823']
      } else if (val == '徐闻县') {
        this.params.area = '440825'
        this.newCityCommand = '徐闻县总数'
        this.areaSelectedOptions = ['440000', '440800', '440825']
      } else if (val == '廉江市') {
        this.params.area = '440881'
        this.newCityCommand = '廉江市总数'
        this.areaSelectedOptions = ['440000', '440800', '440881']
      } else if (val == '雷州市') {
        this.params.area = '440882'
        this.newCityCommand = '雷州市总数'
        this.areaSelectedOptions = ['440000', '440800', '440882']
      } else if (val == '吴川市') {
        this.params.area = '440883'
        this.newCityCommand = '吴川市总数'
        this.areaSelectedOptions = ['440000', '440800', '440883']
      } else if (val == '茂南区') {
        this.params.area = '440902'
        this.newCityCommand = '茂南区总数'
        this.areaSelectedOptions = ['440000', '440900', '440902']
      } else if (val == '电白区') {
        this.params.area = '440904'
        this.newCityCommand = '电白区总数'
        this.areaSelectedOptions = ['440000', '440900', '440904']
      } else if (val == '高州市') {
        this.params.area = '440981'
        this.newCityCommand = '高州市总数'
        this.areaSelectedOptions = ['440000', '440900', '440981']
      } else if (val == '化州市') {
        this.params.area = '440982'
        this.newCityCommand = '化州市总数'
        this.areaSelectedOptions = ['440000', '440900', '440982']
      } else if (val == '信宜市') {
        this.params.area = '440983'
        this.newCityCommand = '信宜市总数'
        this.areaSelectedOptions = ['440000', '440900', '440983']
      } else if (val == '端州区') {
        this.params.area = '441202'
        this.newCityCommand = '端州区总数'
        this.areaSelectedOptions = ['440000', '441200', '441202']
      } else if (val == '鼎湖区') {
        this.params.area = '441203'
        this.newCityCommand = '鼎湖区总数'
        this.areaSelectedOptions = ['440000', '441200', '441203']
      } else if (val == '高要区') {
        this.params.area = '441204'
        this.newCityCommand = '高要区总数'
        this.areaSelectedOptions = ['440000', '441200', '441204']
      } else if (val == '广宁县') {
        this.params.area = '441223'
        this.newCityCommand = '广宁县总数'
        this.areaSelectedOptions = ['440000', '441200', '441223']
      } else if (val == '怀集县') {
        this.params.area = '441224'
        this.newCityCommand = '怀集县总数'
        this.areaSelectedOptions = ['440000', '441200', '441224']
      } else if (val == '封开县') {
        this.params.area = '441225'
        this.newCityCommand = '封开县总数'
        this.areaSelectedOptions = ['440000', '441200', '441225']
      } else if (val == '德庆县') {
        this.params.area = '441226'
        this.newCityCommand = '德庆县总数'
        this.areaSelectedOptions = ['440000', '441200', '441226']
      } else if (val == '四会市') {
        this.params.area = '441284'
        this.newCityCommand = '四会市总数'
        this.areaSelectedOptions = ['440000', '441200', '441284']
      } else if (val == '惠城区') {
        this.params.area = '441302'
        this.newCityCommand = '惠城区总数'
        this.areaSelectedOptions = ['440000', '441300', '441302']
      } else if (val == '惠阳区') {
        this.params.area = '441303'
        this.newCityCommand = '惠阳区总数'
        this.areaSelectedOptions = ['440000', '441300', '441303']
      } else if (val == '博罗县') {
        this.params.area = '441322'
        this.newCityCommand = '博罗县总数'
        this.areaSelectedOptions = ['440000', '441300', '441322']
      } else if (val == '惠东县') {
        this.params.area = '441323'
        this.newCityCommand = '惠东县总数'
        this.areaSelectedOptions = ['440000', '441300', '441323']
      } else if (val == '龙门县') {
        this.params.area = '441324'
        this.newCityCommand = '龙门县总数'
        this.areaSelectedOptions = ['440000', '441300', '441324']
      } else if (val == '梅江区') {
        this.params.area = '441402'
        this.newCityCommand = '梅江区总数'
        this.areaSelectedOptions = ['440000', '441400', '441402']
      } else if (val == '梅县区') {
        this.params.area = '441403'
        this.newCityCommand = '梅县区总数'
        this.areaSelectedOptions = ['440000', '441400', '441403']
      } else if (val == '大埔县') {
        this.params.area = '441422'
        this.newCityCommand = '大埔县总数'
        this.areaSelectedOptions = ['440000', '441400', '441422']
      } else if (val == '丰顺县') {
        this.params.area = '441423'
        this.newCityCommand = '丰顺县总数'
        this.areaSelectedOptions = ['440000', '441400', '441423']
      } else if (val == '五华县') {
        this.params.area = '441424'
        this.newCityCommand = '五华县总数'
        this.areaSelectedOptions = ['440000', '441400', '441424']
      } else if (val == '平远县') {
        this.params.area = '441426'
        this.newCityCommand = '平远县总数'
        this.areaSelectedOptions = ['440000', '441400', '441426']
      } else if (val == '蕉岭县') {
        this.params.area = '441427'
        this.newCityCommand = '蕉岭县总数'
        this.areaSelectedOptions = ['440000', '441400', '441427']
      } else if (val == '兴宁市') {
        this.params.area = '441481'
        this.newCityCommand = '兴宁市总数'
        this.areaSelectedOptions = ['440000', '441400', '441481']
      } else if (val == '城区') {
        this.params.area = '441502'
        this.newCityCommand = '城区总数'
        this.areaSelectedOptions = ['440000', '41500', '441502']
      } else if (val == '海丰县') {
        this.params.area = '441521'
        this.newCityCommand = '海丰县总数'
        this.areaSelectedOptions = ['440000', '41500', '441521']
      } else if (val == '陆河县') {
        this.params.area = '441523'
        this.newCityCommand = '陆河县总数'
        this.areaSelectedOptions = ['440000', '41500', '441523']
      } else if (val == '陆丰市') {
        this.params.area = '441581'
        this.newCityCommand = '陆丰市总数'
        this.areaSelectedOptions = ['440000', '41500', '441581']
      } else if (val == '源城区') {
        this.params.area = '441602'
        this.newCityCommand = '源城区总数'
        this.areaSelectedOptions = ['440000', '441600', '441602']
      } else if (val == '紫金县') {
        this.params.area = '441621'
        this.newCityCommand = '紫金县总数'
        this.areaSelectedOptions = ['440000', '441600', '441621']
      } else if (val == '龙川县') {
        this.params.area = '441622'
        this.newCityCommand = '龙川县总数'
        this.areaSelectedOptions = ['440000', '441600', '441622']
      } else if (val == '连平县') {
        this.params.area = '441623'
        this.newCityCommand = '连平县总数'
        this.areaSelectedOptions = ['440000', '441600', '441623']
      } else if (val == '和平县') {
        this.params.area = '441624'
        this.newCityCommand = '和平县总数'
        this.areaSelectedOptions = ['440000', '441600', '441624']
      } else if (val == '东源县') {
        this.params.area = '441625'
        this.newCityCommand = '东源县总数'
        this.areaSelectedOptions = ['440000', '441600', '441625']
      } else if (val == '江城区') {
        this.params.area = '441702'
        this.newCityCommand = '江城区总数'
        this.areaSelectedOptions = ['440000', '441700', '441702']
      } else if (val == '阳东区') {
        this.params.area = '441704'
        this.newCityCommand = '阳东区总数'
        this.areaSelectedOptions = ['440000', '441700', '441704']
      } else if (val == '阳西县') {
        this.params.area = '441721'
        this.newCityCommand = '阳西县总数'
        this.areaSelectedOptions = ['440000', '441700', '441721']
      } else if (val == '阳春市') {
        this.params.area = '441781'
        this.newCityCommand = '阳春市总数'
        this.areaSelectedOptions = ['440000', '441700', '441781']
      } else if (val == '清城区') {
        this.params.area = '441802'
        this.newCityCommand = '清城区总数'
        this.areaSelectedOptions = ['440000', '441800', '441802']
      } else if (val == '清新区') {
        this.params.area = '441803'
        this.newCityCommand = '清新区总数'
        this.areaSelectedOptions = ['440000', '441800', '441803']
      } else if (val == '佛冈县') {
        this.params.area = '441821'
        this.newCityCommand = '佛冈县总数'
        this.areaSelectedOptions = ['440000', '441800', '441821']
      } else if (val == '阳山县') {
        this.params.area = '441823'
        this.newCityCommand = '阳山县总数'
        this.areaSelectedOptions = ['440000', '441800', '441823']
      } else if (val == '连��壮族瑶族自治县') {
        this.params.area = '441825'
        this.newCityCommand = '连山壮族瑶族自治县总数'
        this.areaSelectedOptions = ['440000', '441800', '441825']
      } else if (val == '连南瑶族自治县') {
        this.params.area = '441826'
        this.newCityCommand = '连南瑶族自治县总数'
        this.areaSelectedOptions = ['440000', '441800', '441826']
      } else if (val == '英德市') {
        this.params.area = '441881'
        this.newCityCommand = '英德市总数'
        this.areaSelectedOptions = ['440000', '441800', '441881']
      } else if (val == '连州市') {
        this.params.area = '441882'
        this.newCityCommand = '连州市总数'
        this.areaSelectedOptions = ['440000', '441800', '441882']
      } else if (val == '湘桥区') {
        this.params.area = '445102'
        this.newCityCommand = '湘桥区总数'
        this.areaSelectedOptions = ['440000', '445100', '445102']
      } else if (val == '潮安区') {
        this.params.area = '445103'
        this.newCityCommand = '潮安区总数'
        this.areaSelectedOptions = ['440000', '445100', '445103']
      } else if (val == '饶平县') {
        this.params.area = '445122'
        this.newCityCommand = '饶平县总数'
        this.areaSelectedOptions = ['440000', '445100', '445122']
      } else if (val == '榕城区') {
        this.params.area = '445202'
        this.newCityCommand = '榕城区总数'
        this.areaSelectedOptions = ['440000', '445200', '445202']
      } else if (val == '揭东区') {
        this.params.area = '445203'
        this.newCityCommand = '揭东区总数'
        this.areaSelectedOptions = ['440000', '445200', '445203']
      } else if (val == '揭西县') {
        this.params.area = '445222'
        this.newCityCommand = '揭西县总数'
        this.areaSelectedOptions = ['440000', '445200', '445222']
      } else if (val == '惠来县') {
        this.params.area = '445224'
        this.newCityCommand = '惠来县总数'
        this.areaSelectedOptions = ['440000', '445200', '445224']
      } else if (val == '普宁市') {
        this.params.area = '445281'
        this.newCityCommand = '普宁市总数'
        this.areaSelectedOptions = ['440000', '445200', '445281']
      } else if (val == '云城区') {
        this.params.area = '445302'
        this.newCityCommand = '云城区总数'
        this.areaSelectedOptions = ['440000', '445300', '445302']
      } else if (val == '云安区') {
        this.params.area = '445303'
        this.newCityCommand = '云安区总数'
        this.areaSelectedOptions = ['440000', '445300', '445303']
      } else if (val == '新兴县') {
        this.params.area = '445321'
        this.newCityCommand = '新兴县总数'
        this.areaSelectedOptions = ['440000', '445300', '445321']
      } else if (val == '郁南县') {
        this.params.area = '445322'
        this.newCityCommand = '郁南县总数'
        this.areaSelectedOptions = ['440000', '445300', '445322']
      } else if (val == '罗定市') {
        this.params.area = '445381'
        this.newCityCommand = '罗定市总数'
        this.areaSelectedOptions = ['440000', '445300', '445381']
      }
    },
    newCommand: {
      immediate: true,
      deep: true,
      handler (val) {
        console.log(val)
        // 查询数据
        this.params.year = val.substring(0, 4)
        this.getListData()
      }
    },
    selectEnumName: {
      immediate: true,
      deep: true,
      handler (val) {
        if (
          val == 'CAN_ALL'
          || val == 'CAN_PEWZ'
          || val == 'CAN_ZEWG'
          || val == 'CAN_XZ'
        ) {
          this.selectEnumType = '可盘活存量用地'
        } else if (
          val == 'ALREADY_ALL'
          || val == 'ALREADY_PEWZ'
          || val == 'ALREADY_ZEWG'
          || val == 'ALREADY_XZ'
        ) {
          this.selectEnumType = '已盘活存量用地'
        }
        this.$nextTick(function () {
          setTimeout(() => {
            // this.loadMap(
            //   "../../../../../static/map/json/province/440000.json",
            //   "guangdong"
            // );
            this.changeMap()
          }, 100)
        })
      }
    }
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
.page-body {
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
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
.left-top-button-tab {
  color: #303030;
  cursor: pointer;
}
.left-top-button-other .active {
  color: #1d7ce4;
}
.left-top-button-other span {
  margin: 5px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #7c8196;
  font-size: 16px;
}
.el-icon-caret-bottom {
  font-size: 18px;
}
.tab-big-box {
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
}
.tab-title {
  width: 96px;
  height: 40px;
  font-size: 16px;
  color: rgba(89, 89, 89, 1);
  border: 1px solid rgba(217, 217, 217, 1);
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  box-sizing: border-box;
}
.tab-title1 {
  width: 96px;
  height: 40px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border: 1px solid #1b74ee;
  font-size: 16px;
  color: #1b74ee;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.tab-title2 {
  width: 96px;
  height: 40px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border: 1px solid #1b74ee;
  font-size: 16px;
  color: #1b74ee;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.tab-title3 {
  border-bottom: 0px solid transparent;
}
.tab-title4 {
  border-top: 0px solid transparent;
}
.tab-left-box {
  width: 100%;
  height: 240px;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
}
.tab-left-top {
  flex: 1;
  height: 105px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-left-top-one {
  flex: 2;
  height: 100%;
  background: rgba(250, 250, 250, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  padding: 6px 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 16px;
  float: left;
}
li.tab-left-top-one:nth-child(4n) {
  margin-right: 0px;
}
.tab-left-top-one-title {
  height: 24px;
  font-size: 18px;
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
li.message-box01:nth-child(2) {
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
}
/* li.message-box01:nth-child(2) span {
  color: #fff;
} */
li.message-box02:nth-child(3) {
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
}
/* li.message-box02:nth-child(3) span {
  color: #fff;
} */
li.message-box03:nth-child(4) {
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
}
/* li.message-box03:nth-child(4) span {
  color: #fff;
} */
li.message-box04:nth-child(1) {
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
}
/* li.message-box04:nth-child(1) span {
  color: #fff;
} */
.tab-left-top-one-number {
  /* height: 80px; */
  padding: 0 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  /* padding: 0 20px 0; */
}
.tab-left-top-one-number span:nth-child(1) {
  color: #050831;
  font-size: 22px;
}
.tab-left-top-one-number span:nth-child(2) {
  color: #050831;
}
.tab-left-top-one-tbBox {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px 0;
}
.tab-left-top-one-tb {
  width: 50%;
  height: 100%;
  padding-right: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #707070;
  font-size: 16px;
}
.tab-left-top-one-tb span:nth-child(1) {
  color: #707070;
}
.tab-left-top-one-check {
  font-size: 16px;
  color: #50a5f4;
  cursor: pointer;
}
.tab-left-top-one-check span:hover {
  color: red;
}
.tab-left-top-one .tab-left-top-one-check span:hover {
  color: red;
}
.chart-left-box {
  width: 100%;
  height: calc(100% - 140px);
  padding: 0px 16px 16px;
  background-color: #fff;
}
.chart-left-box-inset {
  width: 100%;
  height: 100%;
  padding: 8px;
  border: 1px solid rgba(217, 217, 217, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rank {
  width: 25%;
  height: 100%;
  padding-left: 15px;
}
.rankTitle {
  font-size: 18px;
  color: #232323;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.rankTitle span:nth-child(2) {
  font-size: 14px;
  color: #989898;
}
.rankBox {
  height: calc(100% - 50px);
  overflow: auto;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.rankBox::-webkit-scrollbar {
  display: none;
}
.rankBox-left {
  height: 100%;
  display: flex;
  justify-content: flex-start;
}
.rankLeft {
  padding-right: 50px;
  font-size: 15px;
}
.blackN {
  width: 24px;
  height: 24px;
  text-align: center;
  background: #9dd31c;
  color: #fff;
  border: 50%;
  line-height: 24px;
  border-radius: 50%;
  margin-bottom: 20px;
}
.whiteN {
  width: 24px;
  height: 24px;
  text-align: center;
  background: #dcdcdc;
  color: #fff;
  border: 50%;
  line-height: 24px;
  border-radius: 50%;
  margin-bottom: 20px;
}
.rankRight {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.rankRight-number {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: right;
}
.rankMessage {
  margin-bottom: 20px;
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  color: #585858;
}
.list-left-box {
  width: 100%;
  height: 100%;
}
.tab-stock {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.tb-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("../../../../assets/images/jcpgyj/project/ditu.png");
  background-size: 24px 24px;
  margin: 0px 5px;
}
@media screen and (max-width: 1600px) {
  /* .page-body {
    height: 772px;
  }
  .tab {
    height: 677px;
  } */
}
</style>
<style>
.tab-left-box .el-tabs--left .el-tabs__header.is-left {
  margin-right: 0px;
  height: 220px;
  box-sizing: border-box;
}
.tab-left-box .el-tabs--left.el-tabs--card .el-tabs__nav {
  height: 220px !important;
}
/* .tab-left-box .el-tabs__item {
  height: 110px !important;
  box-sizing: border-box;
} */

.tab {
  height: calc(100% - 65px);
}
</style>
