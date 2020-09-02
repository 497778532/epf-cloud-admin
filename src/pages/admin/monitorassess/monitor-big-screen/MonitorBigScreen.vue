<template>
  <div :class="{
      'page-body': this.chartScreen === 'small',
      'page-body__custom': this.chartScreen === 'big'
    }"
       :id="{
      'page-body-chart': this.chartScreen === 'small',
      'page-body-chart__custom': this.chartScreen === 'big'
    }">
    <div :class="{
        'chart-header': this.chartScreen === 'small',
        'chart-header__custom': this.chartScreen === 'big'
      }">
      <p :class="{
          'chart-header-title': this.chartScreen === 'small',
          'chart-header-title__custom': this.chartScreen === 'big'
        }">
        广东省国土空间规划监测评估预警
      </p>
      <div :class="{
          'chart-header-time': this.chartScreen === 'small',
          'chart-header-time__custom': this.chartScreen === 'big'
        }">
        <i :class="{
            'chart-header-timeIcon': this.chartScreen === 'small',
            'chart-header-timeIcon__custom': this.chartScreen === 'big'
          }"></i>
        {{ this.presentTime }}
      </div>

      <el-tooltip effect="dark"
                  content="全屏"
                  placement="bottom"
                  v-if="this.chartScreen === 'small'">
        <img src="../../../../assets/images/jcpgyj/fullicon.png"
             alt
             class="chart-header-screenIcon"
             @click="fullScreen" />
      </el-tooltip>
      <el-tooltip effect="light"
                  content="退出全屏"
                  placement="left"
                  v-if="this.chartScreen === 'big'">
        <img src="../../../../assets/images/jcpgyj/nofullicon.png"
             alt
             class="chart-header-screenIcon__custom"
             @click="exitFullScreen" />
      </el-tooltip>
    </div>
    <div :class="{
        'chart-content-wrap': this.chartScreen === 'small',
        'chart-content-wrap__custom': this.chartScreen === 'big'
      }">
      <!-- 大屏左边 -->
      <div :class="{
          'chart-content-wrapLeft': this.chartScreen === 'small',
          'chart-content-wrapLeft__custom': this.chartScreen === 'big'
        }">
        <!-- 左顶部 -->
        <div :class="{
            'wrap-left-top': this.chartScreen === 'small',
            'wrap-left-top__custom': this.chartScreen === 'big'
          }">
          <div :class="{
              'wrap-header': this.chartScreen === 'small',
              'wrap-header__custom': this.chartScreen === 'big'
            }"
               class="wrap-header-ziran">
            <div class="wrap-header-icon"
                 style="background:#0ACD8E;"></div>
            <div :class="{
                'wrap-header-title': this.chartScreen === 'small',
                'wrap-header-title__custom': this.chartScreen === 'big'
              }">
              自然资源概况
            </div>
            <div class="wrap-header-ltStyle"
                 v-if="this.chartScreen === 'big'"></div>
          </div>
          <div :class="{
              'warp-left-top-message': this.chartScreen === 'small',
              'warp-left-top-message__custom': this.chartScreen === 'big'
            }">
            土地总面积：
            <span>{{ valueDataSum }}km²</span>
          </div>
          <div class="wrap-left-top-chart">
            <div id="land-use-chart"
                 style=" width: 100%; height: 25%"></div>
            <div id="forestry-area-chart"
                 style=" width: 100%; height: 25%"></div>
            <div id="sea-area-chart"
                 style=" width: 100%; height: 25%"></div>
            <div id="water-resource-chart"
                 style=" width: 100%; height: 25%"></div>
          </div>
        </div>
        <!-- 左底部 -->
        <div :class="{
            'wrap-left-bottom': this.chartScreen === 'small',
            'wrap-left-bottom__custom': this.chartScreen === 'big'
          }">
          <div :class="{
              'wrap-header': this.chartScreen === 'small',
              'wrap-header__custom': this.chartScreen === 'big'
            }">
            <div class="wrap-header-icon"
                 style="background:#50B8EF;"></div>
            <div :class="{
                'wrap-header-title': this.chartScreen === 'small',
                'wrap-header-title__custom': this.chartScreen === 'big'
              }">
              重要江河湖泊和近岸海域水质达标率
            </div>
            <div class="wrap-header-lbStyle"
                 v-if="this.chartScreen === 'big'"></div>
          </div>

          <div :class="{
              'wrap-left-bottom-table': this.chartScreen === 'small',
              'wrap-left-bottom-table__custom': this.chartScreen === 'big'
            }">
            <table width="100%"
                   height="100%"
                   max-width="100%"
                   border="1"
                   cellpadding="4"
                   cellspacing="0"
                   bordercolor="#979797"
                   style="table-layout:fixed;text-align:center;"
                   bgcolor="#fff"
                   v-if="this.chartScreen === 'small'">
              <tr height="20px"
                  style="color:#333;background:#E8EAF6;">
                <td>排行</td>
                <td>水域名称</td>
                <td>达标率</td>
              </tr>
              <tr height="20px"
                  v-for="(item, index) in waterData"
                  :key="index">
                <td>{{ item.waterRank }}</td>
                <td>{{ item.waterName }}</td>
                <td>{{ item.waterRate }}%</td>
              </tr>
            </table>

            <table width="100%"
                   height="100%"
                   max-width="100%"
                   border="1"
                   cellpadding="4"
                   cellspacing="0"
                   bordercolor="#818181"
                   style="table-layout:fixed;text-align:center;"
                   v-if="this.chartScreen === 'big'">
              <tr height="20px"
                  style="color:#fff;background:linear-gradient(270deg,rgba(18,22,35,1) 0%,rgba(28,40,128,1) 100%);">
                <td>排行</td>
                <td>水域名称</td>
                <td>达标率</td>
              </tr>
              <tr height="20px"
                  style="color:#fff;"
                  v-for="(item, index) in waterData"
                  :key="index">
                <td>{{ item.waterRank }}</td>
                <td>{{ item.waterName }}</td>
                <td>{{ item.waterRate }}%</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <!-- 大屏中间 -->
      <div :class="{
          'chart-content-wrapMiddle': this.chartScreen === 'small',
          'chart-content-wrapMiddle__custom': this.chartScreen === 'big'
        }">
        <!-- 中顶部(数据) -->
        <div class="wrap-middle-top"
             v-if="this.chartScreen === 'small'">
          <ul class="wrap-middle-top-message">
            <li class="message-box"
                :class="{
                'message-box01': selectIndexType === 0,
                'message-box02': selectIndexType === 1,
                'message-box03': selectIndexType === 2,
                'message-box04': selectIndexType === 3,
                'message-box05': selectIndexType === 4
              }"
                v-for="(item, index) in landIndexData"
                :key="index"
                @click="getLandIndexData(index)">
              <span class="message-number">{{ item.indexValueDouble }} {{ item.unit }}</span>
              <span class="message-name">{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <div class="wrap-middle-top__custom"
             v-if="this.chartScreen === 'big'">
          <ul class="wrap-middle-top-message">
            <li class="message-box__custom"
                :class="{
                'message-box01': selectIndexType === 0,
                'message-box02': selectIndexType === 1,
                'message-box03': selectIndexType === 2,
                'message-box04': selectIndexType === 3,
                'message-box05': selectIndexType === 4
              }"
                v-for="(item, index) in landIndexData"
                :key="index"
                @click="getLandIndexData(index)">
              <span class="message-number">{{ item.indexValueDouble }} {{ item.unit }}</span>
              <span class="message-name">{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <!-- 中中部(地图展示) -->
        <div :class="{
            'wrap-middle-middle': this.chartScreen === 'small',
            'wrap-middle-middle__custom': this.chartScreen === 'big'
          }">
          <div class="chart-bread-name">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>
                <img src="../../../../assets/images/jcpgyj/dingwei01.png"
                     alt />
                <el-button type="text"
                           @click="toProvinceWide"
                           style="color:#1D7CE4;">广东省</el-button>
              </el-breadcrumb-item>
              <el-breadcrumb-item v-if="isCity">
                <el-button type="text"
                           @click="toCityWide"
                           style="color:#1D7CE4;">{{ breadcrumbCityName }}</el-button>
              </el-breadcrumb-item>
              <el-breadcrumb-item v-if="isArea">
                <el-button type="text"
                           style="color:#1D7CE4;">
                  {{ breadcrumbAreaName }}
                </el-button>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="middle-middle-message-box"
               :class="{
              'middle-middle-message-boxR': isShow,
              'middle-middle-message-boxL': !isShow
            }"
               v-if="this.chartScreen === 'small'"
               @click="checkLandIndexData()"></div>
          <div class="middle-middle-message-box__custom"
               :class="{
              'middle-middle-message-boxR__custom': isShow,
              'middle-middle-message-boxL__custom': !isShow
            }"
               v-if="this.chartScreen === 'big'"
               @click="checkLandIndexData()"></div>
          <transition name="left">
            <div :class="{
                'middle-middle-message-top': this.chartScreen === 'small',
                'middle-middle-message-top__custom': this.chartScreen === 'big'
              }"
                 v-if="this.isShow == true">
              <span :class="{
                  'middle-middle-message-name': this.chartScreen === 'small',
                  'middle-middle-message-name__custom':
                    this.chartScreen === 'big'
                }">原规划指标</span>
              <span :class="{
                  'middle-middle-message-number': this.chartScreen === 'small',
                  'middle-middle-message-number__custom':
                    this.chartScreen === 'big'
                }">{{ this.originalIndex }}万亩</span>
            </div>
          </transition>
          <transition name="left">
            <div :class="{
                'middle-middle-message-middle': this.chartScreen === 'small',
                'middle-middle-message-middle__custom':
                  this.chartScreen === 'big'
              }"
                 v-if="this.isShow == true">
              <span :class="{
                  'middle-middle-message-name': this.chartScreen === 'small',
                  'middle-middle-message-name__custom':
                    this.chartScreen === 'big'
                }">指标现状</span>
              <span :class="{
                  'middle-middle-message-number': this.chartScreen === 'small',
                  'middle-middle-message-number__custom':
                    this.chartScreen === 'big'
                }">{{ this.nowIndex }}万亩</span>
            </div>
          </transition>
          <transition name="left">
            <div :class="{
                'middle-middle-message-bottom': this.chartScreen === 'small',
                'middle-middle-message-bottom__custom':
                  this.chartScreen === 'big'
              }"
                 v-if="this.isShow == true">
              <span :class="{
                  'middle-middle-message-name': this.chartScreen === 'small',
                  'middle-middle-message-name__custom':
                    this.chartScreen === 'big'
                }">调整后指标</span>
              <span :class="{
                  'middle-middle-message-number': this.chartScreen === 'small',
                  'middle-middle-message-number__custom':
                    this.chartScreen === 'big'
                }">{{ this.resizeIndex }}万亩</span>
            </div>
          </transition>

          <div id="chinaChart"
               style="width:100%;height: 100%;"
               ref="mapChart"></div>
        </div>
        <!-- 中底部(时间线) -->
        <div :class="{
            'wrap-middle-bottom': this.chartScreen === 'small',
            'wrap-middle-bottom__custom': this.chartScreen === 'big'
          }"
             style="position: relative;">
          <ul class="wrap-middle-bottom-timeLine"
              v-if="this.chartScreen === 'small'">
            <li class="timeLine-box"
                :class="{
                'timeLine-box01': selectYear == nowYear0,
                'timeLine-box02': selectYear == nowYear1,
                'timeLine-box03': selectYear == nowYear2,
                'timeLine-box04': selectYear == nowYear3,
                'timeLine-box05': selectYear == nowYear4,
                'timeLine-box06': selectYear == nowYear5,
                'timeLine-box07': selectYear == nowYear6
              }"
                v-for="(item, index) in selectYearList"
                :key="index">
              <div class="timeLine-year">{{ item.year }}年</div>
              <div class="timeLine-shape">
                <div class="timeLine-shape-circle"
                     @click="getSelectYearData(index)"></div>
                <div class="timeLine-shape-line"></div>
              </div>
            </li>
          </ul>
          <ul class="wrap-middle-bottom-timeLine"
              v-if="this.chartScreen === 'big'">
            <li class="timeLine-box"
                :class="{
                'timeLine-box01': selectYear == nowYear0,
                'timeLine-box02': selectYear == nowYear1,
                'timeLine-box03': selectYear == nowYear2,
                'timeLine-box04': selectYear == nowYear3,
                'timeLine-box05': selectYear == nowYear4,
                'timeLine-box06': selectYear == nowYear5,
                'timeLine-box07': selectYear == nowYear6
              }"
                v-for="(item, index) in selectYearList"
                :key="index">
              <div class="timeLine-year__custom">{{ item.year }}年</div>
              <div class="timeLine-shape">
                <div class="timeLine-shape-circle"
                     @click="getSelectYearData(index)"></div>
                <div class="timeLine-shape-line__custom"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 大屏右边 -->
      <div :class="{
          'chart-content-wrapRight': this.chartScreen === 'small',
          'chart-content-wrapRight__custom': this.chartScreen === 'big'
        }">
        <!-- 右顶部 -->
        <div :class="{
            'wrap-right-top': this.chartScreen === 'small',
            'wrap-right-top__custom': this.chartScreen === 'big'
          }">
          <div :class="{
              'wrap-header': this.chartScreen === 'small',
              'wrap-header__custom': this.chartScreen === 'big'
            }">
            <div class="wrap-header-icon"
                 style="background:#9AE883;"></div>
            <div :class="{
                'wrap-header-title': this.chartScreen === 'small',
                'wrap-header-title__custom': this.chartScreen === 'big'
              }">
              规划建设剩余空间
            </div>
            <div class="wrap-header-rtStyle"
                 v-if="this.chartScreen === 'big'"></div>
          </div>
          <div id="programme-space-chart"
               style=" width: 100%; height: 100%"></div>
        </div>
        <!-- 右中部 -->
        <div :class="{
            'wrap-right-middle': this.chartScreen === 'small',
            'wrap-right-middle__custom': this.chartScreen === 'big'
          }">
          <div :class="{
              'wrap-header': this.chartScreen === 'small',
              'wrap-header__custom': this.chartScreen === 'big'
            }">
            <div class="wrap-header-icon"
                 style="background:#F4CE52;"></div>
            <div :class="{
                'wrap-header-title': this.chartScreen === 'small',
                'wrap-header-title__custom': this.chartScreen === 'big'
              }">
              用地报批规划审核情况
            </div>
            <div class="wrap-header-rmStyle"
                 v-if="this.chartScreen === 'big'"></div>
          </div>

          <div :class="{
              'wrap-right-middle-messageBox': this.chartScreen === 'small',
              'wrap-right-middle-messageBox__custom': this.chartScreen === 'big'
            }">
            <div :class="{
                'wrap-right-middle-message': this.chartScreen === 'small',
                'wrap-right-middle-message__custom': this.chartScreen === 'big'
              }">
              <span class="wrap-right-middle-message-icon"
                    style="backgroundColor: #51CBE6;"></span>
              <span>符合规划项目面积：{{ this.programmeArea }} 公顷</span>
            </div>
            <div :class="{
                'wrap-right-middle-message': this.chartScreen === 'small',
                'wrap-right-middle-message__custom': this.chartScreen === 'big'
              }">
              <span class="wrap-right-middle-message-icon"
                    style="backgroundColor: #4571C9;"></span>
              <span>用地报批总面积：{{ this.submitArea }} 公顷</span>
            </div>
          </div>
          <div id="land-audit-chart"
               style=" width: 100%; height: 100%"></div>
        </div>
        <!-- 右底部 -->
        <div :class="{
            'wrap-right-bottom': this.chartScreen === 'small',
            'wrap-right-bottom__custom': this.chartScreen === 'big'
          }">
          <div :class="{
              'wrap-header': this.chartScreen === 'small',
              'wrap-header__custom': this.chartScreen === 'big'
            }">
            <div class="wrap-header-icon"
                 style="background:#F0525B;"></div>
            <div :class="{
                'wrap-header-title': this.chartScreen === 'small',
                'wrap-header-title__custom': this.chartScreen === 'big'
              }">
              闲置土地情况
            </div>
            <div class="wrap-header-rbStyle"
                 v-if="this.chartScreen === 'big'"></div>
          </div>
          <div class="wrap-right-bottom-table">
            <table width="100%"
                   height="100%"
                   max-width="100%"
                   border="1"
                   cellpadding="4"
                   cellspacing="0"
                   bordercolor="#979797"
                   style="table-layout:fixed;text-align:center;"
                   bgcolor="#fff"
                   v-if="this.chartScreen === 'small'">
              <tr height="20px"
                  style="color:#333;background:#E8EAF6;">
                <td width="30%">行政区域</td>
                <td width="50%">闲置土地情况</td>
              </tr>
              <tr height="20px"
                  v-for="(item, index) in idleLandData"
                  :key="index">
                <td>{{ item.idleLandCityName }}</td>

                <td style="box-sizing: border-box;">
                  <div style="width:140px;float:left;margin-left:10px;">
                    <el-progress type="line"
                                 :text-inside="false"
                                 :percentage="item.idleLandCityProgress"
                                 :color="item.idleLandColor"
                                 id="table-progress"></el-progress>
                  </div>
                  <div style="float:right;margin-right:10px;">
                    {{ item.idleLandCityNumber }}亩
                  </div>
                </td>
              </tr>
            </table>

            <table width="100%"
                   height="100%"
                   max-width="100%"
                   border="1"
                   cellpadding="4"
                   cellspacing="0"
                   bordercolor="#818181"
                   style="table-layout:fixed;text-align:center;"
                   v-if="this.chartScreen === 'big'">
              <tr height="20px"
                  style="color:#fff;background:linear-gradient(270deg,rgba(18,22,35,1) 0%,rgba(28,40,128,1) 100%);">
                <td width="30%">行政区域</td>
                <td width="50%">闲置土地情况</td>
              </tr>
              <tr height="20px"
                  style="color:#fff;"
                  v-for="(item, index) in idleLandData"
                  :key="index">
                <td>{{ item.idleLandCityName }}</td>

                <td style="box-sizing: border-box;">
                  <div style="width:140px;float:left;margin-left:10px;">
                    <el-progress type="line"
                                 :text-inside="false"
                                 :percentage="item.idleLandCityProgress"
                                 :color="item.idleLandColor"
                                 id="table-progress__custom"></el-progress>
                  </div>
                  <div style="float:right;margin-right:10px;">
                    {{ item.idleLandCityNumber }}亩
                  </div>
                </td>
              </tr>
            </table>
          </div>
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
import screenfull from 'screenfull'
import '../../../../../static/map/js/province/guangdong'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')

export default {
  name: 'MonitorBigScreen',
  data () {
    return {
      waterData: [], // 重要江河湖泊和近岸海域水质达标率(左下)
      landIndexData: [], // 土地指标数据(中上)
      selectYearList: [
        { year: moment().year() - 6 },
        { year: moment().year() - 5 },
        { year: moment().year() - 4 },
        { year: moment().year() - 3 },
        { year: moment().year() - 2 },
        { year: moment().year() - 1 },
        { year: moment().year() }
      ], // 选择年份列表(中下)

      nowYear0: moment().year() - 6,
      nowYear1: moment().year() - 5,
      nowYear2: moment().year() - 4,
      nowYear3: moment().year() - 3,
      nowYear4: moment().year() - 2,
      nowYear5: moment().year() - 1,
      nowYear6: moment().year(),
      idleLandData: [], // 闲置土地情况(右下)

      // 地图面包屑
      isCity: false,
      breadcrumbCityName: '',
      isArea: false,
      breadcrumbAreaName: '',

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
      mapTooltipName: '', // 地图提示指标名称

      // 参数
      clickCity: '', // 获取市id
      clickAreaName: '', // 获取区name

      selectYear: moment().year(), // 年份
      selectIndexType: 0, // 指标类型

      params: {
        cantonProvince: '440000',
        cantonCity: '',
        cantonArea: '',
        year: this.nowYear6,
        type: '0'
      },

      presentTime: '', // 时间
      valueDataSum: '', // 自然资源概况--土地总面积
      originalIndex: '', // 地图--原规划指标
      nowIndex: '', // 地图--指标现状
      resizeIndex: '', // 地图--调整后指标
      programmeArea: '', // 用地报批规划审核情况--符合规划项目面积
      submitArea: '', // 用地报批规划审核情况--用地报批总面积

      chartScreen: 'small', // 大屏<=>全屏

      limit: -1,
      limitB: -1,
      isShow: false,

      isShowMenu: ''
    }
  },
  methods: {
    // ...mapMutations("screen", ["to_fullScreen"]),
    getLandIndexData (index) {
      if (index == this.limit) {
        this.limit = -1
      } else {
        this.limit = index
        if (index == 0) {
          this.params.type = '0'
          this.selectIndexType = 0
        } else if (index == 1) {
          this.params.type = '1'
          this.selectIndexType = 1
        } else if (index == 2) {
          this.params.type = '2'
          this.selectIndexType = 2
        } else if (index == 3) {
          this.params.type = '3'
          this.selectIndexType = 3
        } else if (index == 4) {
          this.params.type = '4'
          this.selectIndexType = 4
        }
        this.changeMap()
        this.getLittleMTData()
      }
    },

    getSelectYearData (index) {
      if (index == this.limitB) {
        this.limitB = -1
      } else {
        this.limitB = index
        if (index == 0) {
          this.params.year = this.nowYear0
          this.selectYear = this.nowYear0
        } else if (index == 1) {
          this.params.year = this.nowYear1
          this.selectYear = this.nowYear1
        } else if (index == 2) {
          this.params.year = this.nowYear2
          this.selectYear = this.nowYear2
        } else if (index == 3) {
          this.params.year = this.nowYear3
          this.selectYear = this.nowYear3
        } else if (index == 4) {
          this.params.year = this.nowYear4
          this.selectYear = this.nowYear4
        } else if (index == 5) {
          this.params.year = this.nowYear5
          this.selectYear = this.nowYear5
        } else if (index == 6) {
          this.params.year = this.nowYear6
          this.selectYear = this.nowYear6
        }
        this.getLittleMTData()
        this.changeMap()
        this.landUseDrawLine()
      }
    },
    checkLandIndexData () {
      this.isShow = !this.isShow
    },
    // 地图展示
    async loadMap (mapCode, name) {
      setTimeout(() => {
        document.getElementById('chinaChart').style.width = 100 + '%'
        this.chart = echarts.init(this.$refs.mapChart)
        this.chart.resize() // 直接加这句即可
      }, 0)

      //  if (this.chartScreen === "small") {
      //         this.chart.showLoading({
      //           text: "正在加载数据，请耐心等待...",
      //           color: "#007aff",
      //           textColor: "#007aff"
      //         }); // 增加等待提示
      //       } else if (this.chartScreen === "big") {
      //         this.chart.showLoading({
      //           text: "正在加载数据，请耐心等待...",
      //           color: "#fff",
      //           textColor: "#fff",
      //           maskColor: "rgba(22,47,82,0.6)"
      //         }); // 增加等待提示
      //       }

      let params = this.params

      let res = await this.$get(
        '/epf-monitor-evaluation/monitor/center/baseDataChild',
        params
      )
      if (res.code === 0) {
        let chartData = res.result
        // 建设用地总规模
        let jsydzgmDataNew = []
        let jsydzgmData = chartData.filter(function (i) {
          return i.name.includes('建设用地总规模')
        })
        for (var key in jsydzgmData) {
          jsydzgmDataNew.push({
            cantonArea: jsydzgmData[key].cantonArea,
            cantonAreaName: jsydzgmData[key].cantonAreaName,
            cantonCity: jsydzgmData[key].cantonCity,
            cantonCityName: jsydzgmData[key].cantonCityName,
            cantonProvince: jsydzgmData[key].cantonProvince,
            cantonProvinceName: jsydzgmData[key].cantonProvinceName,
            id: jsydzgmData[key].id,
            indexValue: jsydzgmData[key].indexValue,
            indexValueDouble: jsydzgmData[key].indexValueDouble,
            indexName: jsydzgmData[key].name,
            planValue: jsydzgmData[key].planValue,
            planValueDouble: jsydzgmData[key].planValueDouble,
            unit: jsydzgmData[key].unit,
            name: jsydzgmData[key].cantonCityName,
            // value: jsydzgmData[key].indexValueDouble,
            value: Number(jsydzgmData[key].indexValueDouble).toFixed(2),
            city: jsydzgmData[key].cantonCity
          })
        }
        for (var i = 0; i < jsydzgmDataNew.length; i++) {
          if (
            jsydzgmDataNew[i]['cantonCity'] == null
            && jsydzgmDataNew[i]['cantonCityName'] === ''
          ) {
            jsydzgmDataNew.splice(i, 1)
            i--
          }
        }
        // 耕地保有量
        let gdbylDataNew = []
        let gdbylData = chartData.filter(function (i) {
          return i.name.includes('耕地保有量')
        })
        for (var key in gdbylData) {
          gdbylDataNew.push({
            cantonArea: gdbylData[key].cantonArea,
            cantonAreaName: gdbylData[key].cantonAreaName,
            cantonCity: gdbylData[key].cantonCity,
            cantonCityName: gdbylData[key].cantonCityName,
            cantonProvince: gdbylData[key].cantonProvince,
            cantonProvinceName: gdbylData[key].cantonProvinceName,
            id: gdbylData[key].id,
            indexValue: gdbylData[key].indexValue,
            indexValueDouble: gdbylData[key].indexValueDouble,
            indexName: gdbylData[key].name,
            planValue: gdbylData[key].planValue,
            planValueDouble: gdbylData[key].planValueDouble,
            unit: gdbylData[key].unit,
            name: gdbylData[key].cantonCityName,
            // value: gdbylData[key].indexValueDouble,
            value: Number(gdbylData[key].indexValueDouble).toFixed(2),
            city: gdbylData[key].cantonCity
          })
        }
        for (var i = 0; i < gdbylDataNew.length; i++) {
          if (
            gdbylDataNew[i]['cantonCity'] == null
            && gdbylDataNew[i]['cantonCityName'] === ''
          ) {
            gdbylDataNew.splice(i, 1)
            i--
          }
        }
        // 基本农田保护面积
        let jbntbhmjDataNew = []
        let jbntbhmjData = chartData.filter(function (i) {
          return i.name.includes('基本农田保护面积')
        })
        for (var key in jbntbhmjData) {
          jbntbhmjDataNew.push({
            cantonArea: jbntbhmjData[key].cantonArea,
            cantonAreaName: jbntbhmjData[key].cantonAreaName,
            cantonCity: jbntbhmjData[key].cantonCity,
            cantonCityName: jbntbhmjData[key].cantonCityName,
            cantonProvince: jbntbhmjData[key].cantonProvince,
            cantonProvinceName: jbntbhmjData[key].cantonProvinceName,
            id: jbntbhmjData[key].id,
            indexValue: jbntbhmjData[key].indexValue,
            indexValueDouble: jbntbhmjData[key].indexValueDouble,
            indexName: jbntbhmjData[key].name,
            planValue: jbntbhmjData[key].planValue,
            planValueDouble: jbntbhmjData[key].planValueDouble,
            unit: jbntbhmjData[key].unit,
            name: jbntbhmjData[key].cantonCityName,
            // value: jbntbhmjData[key].indexValueDouble,
            value: Number(jbntbhmjData[key].indexValueDouble).toFixed(2),
            city: jbntbhmjData[key].cantonCity
          })
        }
        for (var i = 0; i < jbntbhmjDataNew.length; i++) {
          if (
            jbntbhmjDataNew[i]['cantonCity'] == null
            && jbntbhmjDataNew[i]['cantonCityName'] === ''
          ) {
            jbntbhmjDataNew.splice(i, 1)
            i--
          }
        }
        // 生态保护红线面积
        let stbhhxmjDataNew = []
        let stbhhxmjData = chartData.filter(function (i) {
          return i.name.includes('生态保护红线面积')
        })
        for (var key in stbhhxmjData) {
          stbhhxmjDataNew.push({
            cantonArea: stbhhxmjData[key].cantonArea,
            cantonAreaName: stbhhxmjData[key].cantonAreaName,
            cantonCity: stbhhxmjData[key].cantonCity,
            cantonCityName: stbhhxmjData[key].cantonCityName,
            cantonProvince: stbhhxmjData[key].cantonProvince,
            cantonProvinceName: stbhhxmjData[key].cantonProvinceName,
            id: stbhhxmjData[key].id,
            indexValue: stbhhxmjData[key].indexValue,
            indexValueDouble: stbhhxmjData[key].indexValueDouble,
            indexName: stbhhxmjData[key].name,
            planValue: stbhhxmjData[key].planValue,
            planValueDouble: stbhhxmjData[key].planValueDouble,
            unit: stbhhxmjData[key].unit,
            name: stbhhxmjData[key].cantonCityName,
            // value: stbhhxmjData[key].indexValueDouble,
            value: Number(stbhhxmjData[key].indexValueDouble).toFixed(2),
            city: stbhhxmjData[key].cantonCity
          })
        }
        for (var i = 0; i < stbhhxmjDataNew.length; i++) {
          if (
            stbhhxmjDataNew[i]['cantonCity'] == null
            && stbhhxmjDataNew[i]['cantonCityName'] === ''
          ) {
            stbhhxmjDataNew.splice(i, 1)
            i--
          }
        }
        // 城镇开发边界
        let czkfbjDataNew = []
        let czkfbjData = chartData.filter(function (i) {
          return i.name.includes('城镇开发边界')
        })
        for (var key in czkfbjData) {
          czkfbjDataNew.push({
            cantonArea: czkfbjData[key].cantonArea,
            cantonAreaName: czkfbjData[key].cantonAreaName,
            cantonCity: czkfbjData[key].cantonCity,
            cantonCityName: czkfbjData[key].cantonCityName,
            cantonProvince: czkfbjData[key].cantonProvince,
            cantonProvinceName: czkfbjData[key].cantonProvinceName,
            id: czkfbjData[key].id,
            indexValue: czkfbjData[key].indexValue,
            indexValueDouble: czkfbjData[key].indexValueDouble,
            indexName: czkfbjData[key].name,
            planValue: czkfbjData[key].planValue,
            planValueDouble: czkfbjData[key].planValueDouble,
            unit: czkfbjData[key].unit,
            name: czkfbjData[key].cantonCityName,
            // value: czkfbjData[key].indexValueDouble,
            value: Number(czkfbjData[key].indexValueDouble).toFixed(2),
            city: czkfbjData[key].cantonCity
          })
        }
        for (var i = 0; i < czkfbjDataNew.length; i++) {
          if (
            czkfbjDataNew[i]['cantonCity'] == null
            && czkfbjDataNew[i]['cantonCityName'] === ''
          ) {
            czkfbjDataNew.splice(i, 1)
            i--
          }
        }

        let indexAllData = [
          jsydzgmDataNew,
          gdbylDataNew,
          jbntbhmjDataNew,
          stbhhxmjDataNew,
          czkfbjDataNew
        ]

        var changeMapIndexData = []
        var indexName = ''

        if (this.params.type === '0') {
          changeMapIndexData = indexAllData[0]
          indexName = '建设用地总规模'
        } else if (this.params.type === '1') {
          changeMapIndexData = indexAllData[1]
          indexName = '耕地保有量'
        } else if (this.params.type === '2') {
          changeMapIndexData = indexAllData[2]
          indexName = '基本农田保护面积'
        } else if (this.params.type === '3') {
          changeMapIndexData = indexAllData[3]
          indexName = '生态保护红线面积'
        } else if (this.params.type === '4') {
          changeMapIndexData = indexAllData[4]
          indexName = '城镇开发边界'
        }

        var valueAllData = []
        for (var key in changeMapIndexData) {
          valueAllData.push(changeMapIndexData[key].value)
        }

        var valueAllDataMax = Math.max.apply(Math, valueAllData)

        console.log(valueAllData)
        console.log(valueAllDataMax)

        const that = this
        const data = await axios.get(mapCode)

        if (data) {
          this.chart = echarts.init(this.$refs.mapChart)
          echarts.registerMap(name, data)

          var option = {
            tooltip: {},
            visualMap: {
              // 颜色的设置  dataRange
              show: false,
              itemWidth: 14,
              itemHeight: 14,
              bottom: 60,
              left: 10,
              inverse: 'true', // 控制高低的位置
              orient: 'horizontal', // 控制导航的方向
              splitList: [
                {
                  start: (valueAllDataMax / 3) * 2,
                  end: (valueAllDataMax / 3) * 4,
                  color: '#f0525b'
                },
                {
                  start: (valueAllDataMax / 3) * 1,
                  end: (valueAllDataMax / 3) * 2,
                  color: '#f2934c'
                },
                { end: (valueAllDataMax / 3) * 1, color: '#f9f7dc' }
              ],
              // splitList: [
              //   {
              //     start: Math.ceil((valueAllDataMax / 3) * 2),
              //     end: Math.ceil((valueAllDataMax / 3) * 3),
              //     color: "#f0525b"
              //   },
              //   {
              //     start: Math.ceil((valueAllDataMax / 3) * 1),
              //     end: Math.ceil((valueAllDataMax / 3) * 2),
              //     color: "#f2934c"
              //   },
              //   { end: Math.ceil((valueAllDataMax / 3) * 1), color: "#f9f7dc" }
              // ],
              text: ['高', '低'] // 文本，默认为数值文本
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
                zoom: 1,
                tooltip: {
                  trigger: 'item',
                  //  formatter: "{b} : {c} 公顷"
                  formatter: function (params) {
                    if (params.data) {
                      return (
                        params.name
                        + '：'
                        + indexName
                        + '指标 '
                        + params.data['value']
                        + ' 万亩'
                      )
                    } else {
                      return (
                        params.name + '：' + indexName + '指标 ' + 0 + ' 万亩'
                      )
                    }
                  }
                },
                data: changeMapIndexData
              }
            ]
          }
          // this.chart.hideLoading(); // 关闭提示
          this.chart.setOption(option, true)
          this.chart.on('click', function (params) {
            sessionStorage.setItem('indexCity', params.data.city)
            sessionStorage.setItem('indexArea', params.data.name)

            that.clickCity = sessionStorage.getItem('indexCity')
            that.clickAreaName = sessionStorage.getItem('indexArea')

            clearTimeout(this.timeFn)
            this.timeFn = setTimeout(function () {
              const name = params.name
              const mapCode = that.pro[name]

              if (!mapCode) {
                console.log('1')
                return
              }

              // if (mapCode != "") {
              that.loadMap(mapCode, name)

              setTimeout(() => {
                document.getElementById('chinaChart').style.width = 100 + '%'
              }, 0)

              that.landUseDrawLine()
              that.forestryAreaDrawLine()
              that.seaAreaDrawLine()
              that.waterResourceDrawLine()
              that.getWaterQualityData()
              that.getLittleMTData()
              that.programmeSpaceDrawLine()
              that.landAuditDrawLine()
              that.getIdleLandData()
              that.isCity = true
              that.breadcrumbCityName = name
              // }
            }, 250)
          })
        } else {
          alert('无法加载该地图')
        }
      } else {
        this.$message.error(res.msg) // 失败
      }
    },
    returnLastStep () {
      const that = this
      this.chart = echarts.init(this.$refs.mapChart)
      // 绑定双击事件，返回全省地图
      this.chart.on('dblclick', function (params) {
        // 当双击事件发生时，清除单击事件，仅响应双击事件
        sessionStorage.removeItem('indexCity')
        sessionStorage.removeItem('indexArea')

        that.clickCity = ''
        that.clickAreaName = ''
        that.params.cantonArea = ''

        clearTimeout(this.timeFn)

        // that.loadMap(
        //   "../../../../../static/map/json/province/440000.json",
        //   "guangdong"
        // );
        setTimeout(() => {
          document.getElementById('chinaChart').style.width = 100 + '%'
        }, 0)
        // if (that.allData.length > 30) {
        //   return;
        // } else {
        that.changeMap()
        that.landUseDrawLine()
        that.forestryAreaDrawLine()
        that.seaAreaDrawLine()
        that.waterResourceDrawLine()
        that.getWaterQualityData()
        that.getLittleMTData()
        that.programmeSpaceDrawLine()
        that.landAuditDrawLine()
        that.getIdleLandData()
        // }
        that.isCity = false
        that.breadcrumbCityName = ''
        that.isArea = false
        that.breadcrumbAreaName = ''
      })
    },
    changeMap () {
      if (sessionStorage.getItem('indexCity')) {
        if (sessionStorage.getItem('indexCity') === '440100') {
          this.loadMap(
            '../../../../../static/map/json/province/440100.json',
            '广州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440200') {
          this.loadMap(
            '../../../../../static/map/json/province/440200.json',
            '韶关市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440300') {
          this.loadMap(
            '../../../../../static/map/json/province/440300.json',
            '深圳市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440400') {
          this.loadMap(
            '../../../../../static/map/json/province/440400.json',
            '珠海市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440500') {
          this.loadMap(
            '../../../../../static/map/json/province/440500.json',
            '汕头市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440600') {
          this.loadMap(
            '../../../../../static/map/json/province/440600.json',
            '佛山市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440700') {
          this.loadMap(
            '../../../../../static/map/json/province/440700.json',
            '江门市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440800') {
          this.loadMap(
            '../../../../../static/map/json/province/440800.json',
            '湛江市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440900') {
          this.loadMap(
            '../../../../../static/map/json/province/440900.json',
            '茂名市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441200') {
          this.loadMap(
            '../../../../../static/map/json/province/441200.json',
            '肇庆市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441300') {
          this.loadMap(
            '../../../../../static/map/json/province/441300.json',
            '惠州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441400') {
          this.loadMap(
            '../../../../../static/map/json/province/441400.json',
            '梅州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441500') {
          this.loadMap(
            '../../../../../static/map/json/province/441500.json',
            '汕尾市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441600') {
          this.loadMap(
            '../../../../../static/map/json/province/441600.json',
            '河源市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441700') {
          this.loadMap(
            '../../../../../static/map/json/province/441700.json',
            '阳江市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441800') {
          this.loadMap(
            '../../../../../static/map/json/province/441800.json',
            '清远市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441900') {
          this.loadMap(
            '../../../../../static/map/json/province/441900.json',
            '东莞市'
          )
        } else if (sessionStorage.getItem('indexCity') === '442000') {
          this.loadMap(
            '../../../../../static/map/json/province/442000.json',
            '中山市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445100') {
          this.loadMap(
            '../../../../../static/map/json/province/445100.json',
            '潮州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445200') {
          this.loadMap(
            '../../../../../static/map/json/province/445200.json',
            '揭阳市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445300') {
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
    // 自然资源概况
    async landUseDrawLine () {
      setTimeout(() => {
        let landUseChart = echarts.init(
          document.getElementById('land-use-chart')
        )
        document.getElementById('land-use-chart').style.width = 100 + '%'
        document.getElementById('land-use-chart').style.height = 25 + '%'
        landUseChart.resize() // 直接加这句即可
      }, 0)
      let landUseChart = echarts.init(
        document.getElementById('land-use-chart')
      )

      let params = this.params
      params['cantonCity'] = this.clickCity

      let res = await this.$get(
        '/epf-monitor-evaluation/monitor/center/naturalResource',
        params
      )

      let chartData = res.result

      let data = []
      let valueData = []

      for (var key in chartData) {
        valueData.push(chartData[key].indexValueDouble)
      }
      function sum (arr) {
        return eval(arr.join('+'))
      }

      let valueDataSum = sum(valueData)
      if (valueDataSum != 0) {
        this.valueDataSum = valueDataSum.toFixed(2)
      } else {
        this.valueDataSum = 0
      }

      for (var key in chartData) {
        data.push({
          name: chartData[key].name,
          value: Math.round(
            (chartData[key].indexValueDouble / valueDataSum) * 100
          )
        })
      }

      for (var key in data) {
        if (isNaN(data[key].value)) {
          let index = key
          data[index].value = 0
        }
      }

      if (this.chartScreen === 'small') {
        let titleArr = [],
          seriesArr = []
        let colors = [
          ['#007aff', '#bcbcbc'],
          ['#007aff', '#bcbcbc'],
          ['#007aff', '#bcbcbc'],
          ['#007aff', '#bcbcbc']
        ]
        data.forEach((item, index) => {
          titleArr.push({
            text: item.name,
            left: index * 25 + 11 + '%',
            top: '80%',
            textAlign: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: '12',
              color: '#333',
              textAlign: 'center'
            }
          })
          seriesArr.push({
            name: item.name,
            type: 'pie',
            clockWise: false,
            radius: [20, 25],
            itemStyle: {
              normal: {
                color: colors[index][0],
                shadowColor: colors[index][0],
                shadowBlur: 0,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            center: [index * 25 + 12 + '%', '40%'],
            data: [
              {
                value: item.value,
                label: {
                  normal: {
                    formatter: params => {
                      if (isNaN(params.value)) {
                        params.value = 0
                      }
                      return params.value + '%'
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      // fontWeight: "bold",
                      color: '#333'
                    }
                  }
                }
              },
              {
                value: 100 - item.value,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: colors[index][1]
                  },
                  emphasis: {
                    color: colors[index][1]
                  }
                }
              }
            ]
          })
        })
        landUseChart.setOption(
          {
            backgroundColor: '#fff',
            title: titleArr,
            series: seriesArr
          },
          true
        )
      } else if (this.chartScreen === 'big') {
        let titleArr = [],
          seriesArr = []
        let colors = [
          ['#007aff', '#bcbcbc'],
          ['#007aff', '#bcbcbc'],
          ['#007aff', '#bcbcbc'],
          ['#007aff', '#bcbcbc']
        ]
        data.forEach((item, index) => {
          titleArr.push({
            text: item.name,
            left: index * 25 + 11 + '%',
            top: '80%',
            textAlign: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: '12',
              color: '#fff',
              textAlign: 'center'
            }
          })
          seriesArr.push({
            name: item.name,
            type: 'pie',
            clockWise: false,
            radius: [30, 35],
            itemStyle: {
              normal: {
                color: colors[index][0],
                shadowColor: colors[index][0],
                shadowBlur: 0,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            center: [index * 25 + 12 + '%', '40%'],
            data: [
              {
                value: item.value,
                label: {
                  normal: {
                    formatter: params => {
                      if (isNaN(params.value)) {
                        params.value = 0
                      }
                      return params.value + '%'
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      // fontWeight: "bold",
                      color: '#fff'
                    }
                  }
                }
              },
              {
                value: 100 - item.value,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: colors[index][1]
                  },
                  emphasis: {
                    color: colors[index][1]
                  }
                }
              }
            ]
          })
        })
        landUseChart.setOption(
          {
            title: titleArr,
            series: seriesArr
          },
          true
        )
      }
    },
    // 自然资源概况--森林总面积
    forestryAreaDrawLine () {
      setTimeout(() => {
        let forestryAreaChart = echarts.init(
          document.getElementById('forestry-area-chart')
        )
        document.getElementById('forestry-area-chart').style.width = 100 + '%'
        document.getElementById('forestry-area-chart').style.height = 25 + '%'
        forestryAreaChart.resize() // 直接加这句即可
      }, 0)
      let forestryAreaChart = echarts.init(
        document.getElementById('forestry-area-chart')
      )

      let firstData = Math.round(Math.random() * 200)
      let secondData = Math.round(Math.random() * 300)
      let allData = firstData + secondData
      let option = {}
      if (this.chartScreen === 'small') {
        option = {
          title: [
            {
              text: '森林总面积' + '  ' + '{b|' + allData + '}' + '{b| km²}',
              x: '40%',
              y: '20%',
              textStyle: {
                fontWeight: 'normal',
                color: '#303030',
                fontSize: '14',
                rich: {
                  b: {
                    color: '#FFD60A',
                    fontSize: '16'
                  }
                }
              }
            }
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#03d092'],
          legend: {
            data: ['国有林地面积', '其他林地面积'],
            orient: 'vertical',
            icon: 'circle',
            left: '40%',
            align: 'left',
            top: '45%',
            itemWidth: 10,
            itemHeight: 10,
            formatter: function (name) {
              if (name == '国有林地面积') {
                return name + '：' + '{a|' + firstData + '}' + '{a| km²}'
              }
              if (name == '其他林地面积') {
                return name + '：' + '{a|' + secondData + '}' + '{a| km²}'
              }
            },
            textStyle: {
              rich: {
                a: {
                  color: '#1D7CE4'
                }
              }
            }
          },
          series: [
            {
              name: '森林总面积',
              type: 'pie',
              clockWise: false,
              radius: ['70%', '80%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: '{name|{a}}',
                  rich: {
                    name: {
                      color: '#333',
                      fontSize: 12,
                      // fontWeight: "bolder",
                      align: 'center',
                      verticalAlign: 'middle',
                      padding: 8
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: true,
              data: [
                {
                  value: secondData,
                  name: '其他林地面积',
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: '#ff9601' // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#ff9601' // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: 'normal',
                          color: '#999',
                          fontSize: '20'
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                },
                {
                  value: firstData,
                  name: '国有林地面积',
                  labelLine: {
                    show: false
                  }
                }
              ]
            }
          ]
        }
      } else if (this.chartScreen === 'big') {
        option = {
          title: [
            {
              text: '森林总面积' + '  ' + '{b|' + allData + '}' + '{b| km²}',
              x: '50%',
              y: '20%',
              textStyle: {
                fontWeight: 'normal',
                color: '#fff',
                fontSize: '18',
                rich: {
                  b: {
                    color: '#2FB8D7',
                    fontSize: '20'
                  }
                }
              }
            }
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#52C41A'],
          legend: {
            data: ['国有林地面积', '其他林地面积'],
            orient: 'vertical',
            icon: 'circle',
            left: '50%',
            align: 'left',
            top: '45%',
            itemWidth: 10,
            itemHeight: 10,
            formatter: function (name) {
              if (name == '国有林地面积') {
                return name + '：' + '{a|' + firstData + '}' + '{a| km²}'
              }
              if (name == '其他林地面积') {
                return name + '：' + '{a|' + secondData + '}' + '{a| km²}'
              }
            },
            textStyle: {
              color: '#fff',
              rich: {
                a: {
                  color: '#1D7CE4',
                  fontSize: 20
                }
              }
            }
          },
          series: [
            {
              name: '森林总面积',
              type: 'pie',
              clockWise: false,
              radius: ['70%', '80%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: '{name|{a}}',
                  rich: {
                    name: {
                      color: '#A6AFFF',
                      fontSize: 18,
                      // fontWeight: "bolder",
                      align: 'center',
                      verticalAlign: 'middle',
                      padding: 8
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: true,
              data: [
                {
                  value: secondData,
                  name: '其他林地面积',
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: '#FA541C' // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#FA541C' // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: 'normal',
                          color: '#999',
                          fontSize: '24'
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                },
                {
                  value: firstData,
                  name: '国有林地面积',
                  labelLine: {
                    show: false
                  }
                }
              ]
            }
          ]
        }
      }
      forestryAreaChart.setOption(option, true)
    },
    // 自然资源概况--海域总面积
    seaAreaDrawLine () {
      setTimeout(() => {
        let seaAreaChart = echarts.init(
          document.getElementById('sea-area-chart')
        )
        document.getElementById('sea-area-chart').style.width = 100 + '%'
        document.getElementById('sea-area-chart').style.height = 25 + '%'

        seaAreaChart.resize() // 直接加这句即可
      }, 0)
      let seaAreaChart = echarts.init(
        document.getElementById('sea-area-chart')
      )

      let firstData = Math.round(Math.random() * 200)
      let secondData = Math.round(Math.random() * 300)
      let allData = firstData + secondData
      let option = {}
      if (this.chartScreen === 'small') {
        option = {
          title: [
            {
              text: '海域总面积' + '  ' + '{b|' + allData + '}' + '{b| km²}',

              x: '40%',
              y: '20%',
              textStyle: {
                fontWeight: 'normal',
                color: '#303030',
                fontSize: '14',
                rich: {
                  b: {
                    color: '#FFD60A',
                    fontSize: '16'
                  }
                }
              }
            }
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#ffd60a'],
          legend: {
            data: ['海岛线面积', '海岛总面积'],
            orient: 'vertical',
            icon: 'circle',
            left: '40%',
            align: 'left',
            top: '45%',
            itemWidth: 10,
            itemHeight: 10,
            formatter: function (name) {
              if (name == '海岛线面积') {
                return name + '：' + '{a|' + firstData + '}' + '{a| km²}'
              }
              if (name == '海岛总面积') {
                return name + '：' + '{a|' + secondData + '}' + '{a| km²}'
              }
            },
            textStyle: {
              rich: {
                a: {
                  color: '#1D7CE4'
                }
              }
            }
          },
          series: [
            {
              name: '海域总面积',
              type: 'pie',
              clockWise: false,
              radius: ['70%', '80%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: '{name|{a}}',
                  rich: {
                    name: {
                      color: '#333',
                      fontSize: 12,
                      // fontWeight: "bolder",
                      align: 'center',
                      verticalAlign: 'middle',
                      padding: 8
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: true,
              data: [
                {
                  value: secondData,
                  name: '海岛总面积',
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: '#ea4d57' // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#ea4d57' // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: 'normal',
                          color: '#999',
                          fontSize: '20'
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                },
                {
                  value: firstData,
                  name: '海岛线面积',
                  labelLine: {
                    show: false
                  }
                }
              ]
            }
          ]
        }
      } else if (this.chartScreen === 'big') {
        option = {
          title: [
            {
              text: '海域总面积' + '  ' + '{b|' + allData + '}' + '{b| km²}',

              x: '50%',
              y: '20%',
              textStyle: {
                fontWeight: 'normal',
                color: '#fff',
                fontSize: '18',
                rich: {
                  b: {
                    color: '#2FB8D7',
                    fontSize: '20'
                  }
                }
              }
            }
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#40A9FF'],
          legend: {
            data: ['海岛线面积', '海岛总面积'],
            orient: 'vertical',
            icon: 'circle',
            left: '50%',
            align: 'left',
            top: '45%',
            itemWidth: 10,
            itemHeight: 10,
            formatter: function (name) {
              if (name == '海岛线面积') {
                return name + '：' + '{a|' + firstData + '}' + '{a| km²}'
              }
              if (name == '海岛总面积') {
                return name + '：' + '{a|' + secondData + '}' + '{a| km²}'
              }
            },
            textStyle: {
              color: '#fff',
              rich: {
                a: {
                  color: '#1D7CE4',
                  fontSize: 20
                }
              }
            }
          },
          series: [
            {
              name: '海域总面积',
              type: 'pie',
              clockWise: false,
              radius: ['70%', '80%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: '{name|{a}}',
                  rich: {
                    name: {
                      color: '#A6AFFF',
                      fontSize: 18,
                      // fontWeight: "bolder",
                      align: 'center',
                      verticalAlign: 'middle',
                      padding: 8
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: true,
              data: [
                {
                  value: secondData,
                  name: '海岛总面积',
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: '#FA8C16' // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#FA8C16' // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: 'normal',
                          color: '#999',
                          fontSize: '24'
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                },
                {
                  value: firstData,
                  name: '海岛线面积',
                  labelLine: {
                    show: false
                  }
                }
              ]
            }
          ]
        }
      }
      seaAreaChart.setOption(option, true)
    },
    // 自然资源概况--水资源总量
    waterResourceDrawLine () {
      setTimeout(() => {
        let waterResourceChart = echarts.init(
          document.getElementById('water-resource-chart')
        )
        document.getElementById('water-resource-chart').style.width = 100 + '%'
        document.getElementById('water-resource-chart').style.height = 25 + '%'

        waterResourceChart.resize() // 直接加这句即可
      }, 0)
      let waterResourceChart = echarts.init(
        document.getElementById('water-resource-chart')
      )

      let firstData = Math.round(Math.random() * 200)
      let secondData = Math.round(Math.random() * 300)
      let allData = firstData + secondData
      let option = {}
      if (this.chartScreen === 'small') {
        option = {
          title: [
            {
              text: '水资源总量' + '  ' + '{b|' + allData + '}' + '{b| km²}',
              x: '40%',
              y: '20%',
              textStyle: {
                fontWeight: 'normal',
                color: '#303030',
                fontSize: '14',
                rich: {
                  b: {
                    color: '#FFD60A',
                    fontSize: '16'
                  }
                }
              }
            }
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#3672f3'],
          legend: {
            data: ['地表水资源', '地下水资源'],
            orient: 'vertical',
            icon: 'circle',
            left: '40%',
            align: 'left',
            top: '45%',
            itemWidth: 10,
            itemHeight: 10,
            formatter: function (name) {
              if (name == '地表水资源') {
                return name + '：' + '{a|' + firstData + '}' + '{a| km²}'
              }
              if (name == '地下水资源') {
                return name + '：' + '{a|' + secondData + '}' + '{a| km²}'
              }
            },
            textStyle: {
              rich: {
                a: {
                  color: '#1D7CE4'
                }
              }
            }
          },
          series: [
            {
              name: '水资源总量',
              type: 'pie',
              clockWise: false,
              radius: ['70%', '80%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: '{name|{a}}',
                  rich: {
                    name: {
                      color: '#333',
                      fontSize: 12,
                      // fontWeight: "bolder",
                      align: 'center',
                      verticalAlign: 'middle',
                      padding: 8
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: true,
              data: [
                {
                  value: secondData,
                  name: '地下水资源',
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: '#b77bdd' // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#b77bdd' // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: 'normal',
                          color: '#999',
                          fontSize: '20'
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                },
                {
                  value: firstData,
                  name: '地表水资源',
                  labelLine: {
                    show: false
                  }
                }
              ]
            }
          ]
        }
      } else if (this.chartScreen === 'big') {
        option = {
          title: [
            {
              text: '水资源总量' + '  ' + '{b|' + allData + '}' + '{b| km²}',
              x: '50%',
              y: '20%',
              textStyle: {
                fontWeight: 'normal',
                color: '#fff',
                fontSize: '18',
                rich: {
                  b: {
                    color: '#2FB8D7',
                    fontSize: '20'
                  }
                }
              }
            }
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: ['#9254DE'],
          legend: {
            data: ['地表水资源', '地下水资源'],
            orient: 'vertical',
            icon: 'circle',
            left: '50%',
            align: 'left',
            top: '45%',
            itemWidth: 10,
            itemHeight: 10,
            formatter: function (name) {
              if (name == '地表水资源') {
                return name + '：' + '{a|' + firstData + '}' + '{a| km²}'
              }
              if (name == '地下水资源') {
                return name + '：' + '{a|' + secondData + '}' + '{a| km²}'
              }
            },
            textStyle: {
              color: '#fff',
              rich: {
                a: {
                  color: '#1D7CE4',
                  fontSize: 20
                }
              }
            }
          },
          series: [
            {
              name: '水资源总量',
              type: 'pie',
              clockWise: false,
              radius: ['70%', '80%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  formatter: '{name|{a}}',
                  rich: {
                    name: {
                      color: '#A6AFFF',
                      fontSize: 18,
                      // fontWeight: "bolder",
                      align: 'center',
                      verticalAlign: 'middle',
                      padding: 8
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: true,
              data: [
                {
                  value: secondData,
                  name: '地下水资源',
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: '#F0C731' // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#F0C731' // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: 'normal',
                          color: '#999',
                          fontSize: '24'
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  }
                },
                {
                  value: firstData,
                  name: '地表水资源',
                  labelLine: {
                    show: false
                  }
                }
              ]
            }
          ]
        }
      }

      waterResourceChart.setOption(option, true)
    },
    // 规划建设剩余空间
    programmeSpaceDrawLine () {
      setTimeout(() => {
        let programmeSpaceChart = echarts.init(
          document.getElementById('programme-space-chart')
        )
        document.getElementById('programme-space-chart').style.width
          = 100 + '%'
        document.getElementById('programme-space-chart').style.height
          = 100 + '%'
        programmeSpaceChart.resize() // 直接加这句即可
      }, 0)
      let programmeSpaceChart = echarts.init(
        document.getElementById('programme-space-chart')
      )

      let cityNameList = []
      let data1 = []
      let data2 = []
      if (this.clickCity === '') {
        data1 = [
          '35376.7527',
          '12905.3371',
          '9322.6818',
          '12000.1201',
          '14749.8986',
          '19335.6183',
          '29842.1434',
          '22182.4508',
          '16500.1232',
          '14399.3946',
          '35425.4981',
          '11178.9665',
          '13574.0202',
          '15572.4657',
          '13034.9077',
          '16848.2732',
          '22248.6843',
          '8397.5232',
          '9403.2812',
          '12501.2072',
          '7666.0276'
        ]
        data2 = [
          '27516.1629',
          '10471.4184',
          '7757.6297',
          '10419.6529',
          '12860.6387',
          '17175.37',
          '15272.9791',
          '13468.5373',
          '13727.6423',
          '10763.6762',
          '22412.9734',
          '7831.6646',
          '9729.8862',
          '10932.5241',
          '8353.3484',
          '9412.2347',
          '17201.0917',
          '7184.642',
          '6750.8842',
          '9067.2605',
          '5478.8629'
        ]
        cityNameList = [
          '广州市',
          '韶关市',
          '深圳市',
          '珠海市',
          '汕头市',
          '佛山市',
          '江门市',
          '湛江市',
          '茂名市',
          '肇庆市',
          '惠州市',
          '梅州市',
          '汕尾市',
          '河源市',
          '阳江市',
          '清远市',
          '东莞市',
          '中山市',
          '潮州市',
          '揭阳市',
          '云浮市'
        ]
      } else if (this.clickCity === '440100') {
        if (this.params.cantonArea === '') {
          data1 = [
            '536.8042',
            '0.0006',
            '419.2044',
            '859.2568',
            '4228.6223',
            '4321.6295',
            '2981.5931',
            '5730.7797',
            '6983.7102',
            '4934.3177',
            '4380.8344'
          ]
          data2 = [
            '492.2561',
            '0.0006',
            '408.6345',
            '789.0259',
            '3607.3382',
            '3540.9096',
            '2351.0009',
            '4389.8657',
            '6101.5033',
            '2061.8987',
            '3773.7293'
          ]
          cityNameList = [
            '荔湾区',
            '越秀区',
            '海珠区',
            '天河区',
            '白云区',
            '黄埔区',
            '番禺区',
            '花都区',
            '南沙区',
            '从化区',
            '增城区'
          ]
        } else if (this.params.cantonArea === '440103') {
          data1 = ['536.8042']
          data2 = ['492.2561']
          cityNameList = ['荔湾区']
        } else if (this.params.cantonArea === '440104') {
          data1 = ['0.0006']
          data2 = ['0.0006']
          cityNameList = ['越秀区']
        } else if (this.params.cantonArea === '440105') {
          data1 = ['419.2044']
          data2 = ['408.6345']
          cityNameList = ['海珠区']
        } else if (this.params.cantonArea === '440106') {
          data1 = ['859.2568']
          data2 = ['789.0259']
          cityNameList = ['天河区']
        } else if (this.params.cantonArea === '440111') {
          data1 = ['4228.6223']
          data2 = ['3607.3382']
          cityNameList = ['白云区']
        } else if (this.params.cantonArea === '440112') {
          data1 = ['4321.6295']
          data2 = ['3540.9096']
          cityNameList = ['黄埔区']
        } else if (this.params.cantonArea === '440113') {
          data1 = ['2981.5931']
          data2 = ['2351.0009']
          cityNameList = ['番禺区']
        } else if (this.params.cantonArea === '440114') {
          data1 = ['5730.7797']
          data2 = ['4389.8657']
          cityNameList = ['花都区']
        } else if (this.params.cantonArea === '440115') {
          data1 = ['6983.7102']
          data2 = ['6101.5033']
          cityNameList = ['南沙区']
        } else if (this.params.cantonArea === '440117') {
          data1 = ['4934.3177']
          data2 = ['2061.8987']
          cityNameList = ['从化区']
        } else if (this.params.cantonArea === '440118') {
          data1 = ['4380.8344']
          data2 = ['3773.7293']
          cityNameList = ['增城区']
        }
      } else if (this.clickCity === '440200') {
        if (this.params.cantonArea === '') {
          data1 = [
            '1350.2085',
            '2254.2968',
            '1291.2633',
            '1287.5695',
            '1032.3865',
            '1456.3172',
            '944.1386',
            '756.0351',
            '1822.9418',
            '710.1798'
          ]
          data2 = [
            '1331.4719',
            '2162.1968',
            '1165.6195',
            '948.4233',
            '812.3703',
            '990.4353',
            '515.078',
            '477.8364',
            '1664.1225',
            '403.8643'
          ]
          cityNameList = [
            '武江区',
            '浈江区',
            '曲江区',
            '始兴县',
            '仁化县',
            '翁源县',
            '乳源瑶族自治县',
            '新丰县',
            '乐昌市',
            '南雄市'
          ]
        } else if (this.params.cantonArea === '440203') {
          data1 = ['1350.2085']
          data2 = ['1331.4719']
          cityNameList = ['武江区']
        } else if (this.params.cantonArea === '440204') {
          data1 = ['2254.2968']
          data2 = ['2162.1968']
          cityNameList = ['浈江区']
        } else if (this.params.cantonArea === '440205') {
          data1 = ['1291.2633']
          data2 = ['1165.6195']
          cityNameList = ['曲江区']
        } else if (this.params.cantonArea === '440222') {
          data1 = ['1287.5695']
          data2 = ['948.4233']
          cityNameList = ['始兴县']
        } else if (this.params.cantonArea === '440224') {
          data1 = ['1032.3865']
          data2 = ['812.3703']
          cityNameList = ['仁化县']
        } else if (this.params.cantonArea === '440229') {
          data1 = ['1456.3172']
          data2 = ['990.4353']
          cityNameList = ['翁源县']
        } else if (this.params.cantonArea === '440232') {
          data1 = ['944.1386']
          data2 = ['515.078']
          cityNameList = ['乳源瑶族自治县']
        } else if (this.params.cantonArea === '440233') {
          data1 = ['756.0351']
          data2 = ['477.8364']
          cityNameList = ['新丰县']
        } else if (this.params.cantonArea === '440281') {
          data1 = ['1822.9418']
          data2 = ['1664.1225']
          cityNameList = ['乐昌市']
        } else if (this.params.cantonArea === '440282') {
          data1 = ['710.1798']
          data2 = ['403.8643']
          cityNameList = ['南雄市']
        }
      } else if (this.clickCity === '440300') {
        if (this.params.cantonArea === '') {
          data1 = [
            '172.7287',
            '110.3706',
            '702.2966',
            '4483.7477',
            '3468.3263',
            '385.2119',
            '0',
            '0',
            '0'
          ]
          data2 = [
            '156.524',
            '108.8334',
            '679.404',
            '3562.3314',
            '2975.2628',
            '275.2742',
            '0',
            '0',
            '0'
          ]
          cityNameList = [
            '罗湖区',
            '福田区',
            '南山区',
            '宝安区',
            '龙岗区',
            '盐田区',
            '龙华区',
            '坪山区',
            '光明区'
          ]
        } else if (this.params.cantonArea === '440303') {
          data1 = ['172.7287']
          data2 = ['156.524']
          cityNameList = ['罗湖区']
        } else if (this.params.cantonArea === '440304') {
          data1 = ['110.3706']
          data2 = ['108.8334']
          cityNameList = ['福田区']
        } else if (this.params.cantonArea === '440305') {
          data1 = ['702.2966']
          data2 = ['679.404']
          cityNameList = ['南山区']
        } else if (this.params.cantonArea === '440306') {
          data1 = ['4483.7477']
          data2 = ['3562.3314']
          cityNameList = ['宝安区']
        } else if (this.params.cantonArea === '440307') {
          data1 = ['3468.3263']
          data2 = ['2975.2628']
          cityNameList = ['龙岗区']
        } else if (this.params.cantonArea === '440308') {
          data1 = ['385.2119']
          data2 = ['275.2742']
          cityNameList = ['盐田区']
        } else if (this.params.cantonArea === '440309') {
          data1 = ['0']
          data2 = ['0']
          cityNameList = ['龙华区']
        } else if (this.params.cantonArea === '440310') {
          data1 = ['0']
          data2 = ['0']
          cityNameList = ['坪山区']
        } else if (this.params.cantonArea === '440311') {
          data1 = ['0']
          data2 = ['0']
          cityNameList = ['光明区']
        }
      } else if (this.clickCity === '440400') {
        if (this.params.cantonArea === '') {
          data1 = ['3525.2532', '3843.1899', '4631.6771']
          data2 = ['3184.0621', '3451.2915', '3784.2993']
          cityNameList = ['香洲区', '斗门区', '金湾区']
        } else if (this.params.cantonArea === '440402') {
          data1 = ['3525.2532']
          data2 = ['3184.0621']
          cityNameList = ['香洲区']
        } else if (this.params.cantonArea === '440403') {
          data1 = ['3843.1899']
          data2 = ['3451.2915']
          cityNameList = ['斗门区']
        } else if (this.params.cantonArea === '440404') {
          data1 = ['4631.6771']
          data2 = ['3784.2993']
          cityNameList = ['金湾区']
        }
      } else if (this.clickCity === '440500') {
        if (this.params.cantonArea === '') {
          data1 = [
            '1673.9676',
            '1653.2379',
            '2354.4353',
            '3020.4461',
            '2452.9808',
            '2511.0374',
            '1083.7935'
          ]
          data2 = [
            '1503.0078',
            '1575.7352',
            '1917.3523',
            '2784.5258',
            '1895.9025',
            '2362.1495',
            '821.9655'
          ]
          cityNameList = [
            '龙湖区',
            '金平区',
            '濠江区',
            '潮阳区',
            '潮南区',
            '澄海区',
            '南澳县'
          ]
        } else if (this.params.cantonArea === '440507') {
          data1 = ['1673.9676']
          data2 = ['1503.0078']
          cityNameList = ['龙湖区']
        } else if (this.params.cantonArea === '440511') {
          data1 = ['1653.2379']
          data2 = ['1575.7352']
          cityNameList = ['金平区']
        } else if (this.params.cantonArea === '440512') {
          data1 = ['2354.4353']
          data2 = ['1917.3523']
          cityNameList = ['濠江区']
        } else if (this.params.cantonArea === '440513') {
          data1 = ['3020.4461']
          data2 = ['2784.5258']
          cityNameList = ['潮阳区']
        } else if (this.params.cantonArea === '440514') {
          data1 = ['2452.9808']
          data2 = ['1895.9025']
          cityNameList = ['潮南区']
        } else if (this.params.cantonArea === '440515') {
          data1 = ['2511.0374']
          data2 = ['2362.1495']
          cityNameList = ['澄海区']
        } else if (this.params.cantonArea === '440523') {
          data1 = ['1083.7935']
          data2 = ['821.9655']
          cityNameList = ['南澳县']
        }
      } else if (this.clickCity === '440600') {
        if (this.params.cantonArea === '') {
          data1 = [
            '779.6558',
            '6520.2264',
            '6019.8886',
            '3333.8413',
            '2682.0062'
          ]
          data2 = [
            '601.671',
            '6086.0727',
            '5047.247',
            '3179.6564',
            '2260.7229'
          ]
          cityNameList = ['禅城区', '南海区', '顺德区', '三水区', '高明区']
        } else if (this.params.cantonArea === '440604') {
          data1 = ['779.6558']
          data2 = ['601.671']
          cityNameList = ['禅城区']
        } else if (this.params.cantonArea === '440605') {
          data1 = ['6520.2264']
          data2 = ['6086.0727']
          cityNameList = ['南海区']
        } else if (this.params.cantonArea === '440606') {
          data1 = ['6019.8886']
          data2 = ['5047.247']
          cityNameList = ['顺德区']
        } else if (this.params.cantonArea === '440607') {
          data1 = ['3333.8413']
          data2 = ['3179.6564']
          cityNameList = ['三水区']
        } else if (this.params.cantonArea === '440608') {
          data1 = ['2682.0062']
          data2 = ['2260.7229']
          cityNameList = ['高明区']
        }
      } else if (this.clickCity === '440700') {
        if (this.params.cantonArea === '') {
          data1 = [
            '2130.3009',
            '1067.8822',
            '5225.3957',
            '11797.369',
            '4871.2941',
            '1327.3714',
            '3422.5302'
          ]
          data2 = [
            '1844.2223',
            '877.2502',
            '4012.4345',
            '2804.0235',
            '2928.5555',
            '997.9533',
            '1808.5398'
          ]
          cityNameList = [
            '蓬江区',
            '江海区',
            '新会区',
            '台山市',
            '开平市',
            '鹤山市',
            '恩平市'
          ]
        } else if (this.params.cantonArea === '440703') {
          data1 = ['2130.3009']
          data2 = ['1844.2223']
          cityNameList = ['蓬江区']
        } else if (this.params.cantonArea === '440704') {
          data1 = ['1067.8822']
          data2 = ['877.2502']
          cityNameList = ['江海区']
        } else if (this.params.cantonArea === '440705') {
          data1 = ['5225.3957']
          data2 = ['4012.4345']
          cityNameList = ['新会区']
        } else if (this.params.cantonArea === '440781') {
          data1 = ['11797.369']
          data2 = ['2804.0235']
          cityNameList = ['台山市']
        } else if (this.params.cantonArea === '440783') {
          data1 = ['4871.2941']
          data2 = ['2928.5555']
          cityNameList = ['开平市']
        } else if (this.params.cantonArea === '440784') {
          data1 = ['1327.3714']
          data2 = ['997.9533']
          cityNameList = ['鹤山市']
        } else if (this.params.cantonArea === '440785') {
          data1 = ['3422.5302']
          data2 = ['1808.5398']
          cityNameList = ['恩平市']
        }
      } else if (this.clickCity === '440800') {
        if (this.params.cantonArea === '') {
          data1 = [
            '561.9617',
            '911.6764',
            '2207.6695',
            '5539.7435',
            '2357.628',
            '3657.668',
            '3243.4728',
            '2329.1664',
            '1373.4643'
          ]
          data2 = [
            '487.5456',
            '710.7702',
            '1019.2558',
            '2699.8873',
            '1652.2408',
            '1789.5451',
            '2565.4948',
            '1602.9517',
            '940.8459'
          ]
          cityNameList = [
            '赤坎区',
            '霞山区',
            '坡头区',
            '麻章区',
            '遂溪县',
            '徐闻县',
            '廉江市',
            '雷州市',
            '吴川市'
          ]
        } else if (this.params.cantonArea === '440802') {
          data1 = ['561.9617']
          data2 = ['487.5456']
          cityNameList = ['赤坎区']
        } else if (this.params.cantonArea === '440803') {
          data1 = ['911.6764']
          data2 = ['710.7702']
          cityNameList = ['霞山区']
        } else if (this.params.cantonArea === '440804') {
          data1 = ['2207.6695']
          data2 = ['1019.2558']
          cityNameList = ['坡头区']
        } else if (this.params.cantonArea === '440811') {
          data1 = ['5539.7435']
          data2 = ['2699.8873']
          cityNameList = ['麻章区']
        } else if (this.params.cantonArea === '440823') {
          data1 = ['2357.628']
          data2 = ['1652.2408']
          cityNameList = ['遂溪县']
        } else if (this.params.cantonArea === '440825') {
          data1 = ['3657.668']
          data2 = ['1789.5451']
          cityNameList = ['徐闻县']
        } else if (this.params.cantonArea === '440881') {
          data1 = ['3243.4728']
          data2 = ['2565.4948']
          cityNameList = ['廉江市']
        } else if (this.params.cantonArea === '440882') {
          data1 = ['2329.1664']
          data2 = ['1602.9517']
          cityNameList = ['雷州市']
        } else if (this.params.cantonArea === '440883') {
          data1 = ['1373.4643']
          data2 = ['940.8459']
          cityNameList = ['吴川市']
        }
      } else if (this.clickCity === '440900') {
        if (this.params.cantonArea === '') {
          data1 = ['2261.3', '7646.3907', '2920.775', '2770.1331', '901.5244']
          data2 = [
            '1994.006',
            '6118.3458',
            '2628.6402',
            '2329.8932',
            '656.757'
          ]
          cityNameList = ['茂南区', '电白区', '高州市', '化州市', '信宜市']
        } else if (this.params.cantonArea === '440902') {
          data1 = ['2261.3']
          data2 = ['994.006']
          cityNameList = ['茂南区']
        } else if (this.params.cantonArea === '440904') {
          data1 = ['7646.3907']
          data2 = ['6118.3458']
          cityNameList = ['电白区']
        } else if (this.params.cantonArea === '440981') {
          data1 = ['2920.775']
          data2 = ['2628.6402']
          cityNameList = ['高州市']
        } else if (this.params.cantonArea === '440982') {
          data1 = ['2770.1331']
          data2 = ['2329.8932']
          cityNameList = ['化州市']
        } else if (this.params.cantonArea === '440983') {
          data1 = ['901.5244']
          data2 = ['656.757']
          cityNameList = ['信宜市']
        }
      } else if (this.clickCity === '441200') {
        if (this.params.cantonArea === '') {
          data1 = [
            '738.0248',
            '2813.9432',
            '1082.1859',
            '1483.7474',
            '1411.501',
            '1237.1932',
            '2515.1689',
            '3117.6303'
          ]
          data2 = [
            '648.6225',
            '2531.2455',
            '779.2166',
            '1108.6181',
            '909.44',
            '747.7741',
            '1679.9999',
            '2358.7596'
          ]
          cityNameList = [
            '端州区',
            '鼎湖区',
            '高要区',
            '广宁县',
            '怀集县',
            '封开县',
            '德庆县',
            '四会市'
          ]
        } else if (this.params.cantonArea === '441202') {
          data1 = ['738.0248']
          data2 = ['648.6225']
          cityNameList = ['端州区']
        } else if (this.params.cantonArea === '441203') {
          data1 = ['2813.9432']
          data2 = ['2531.2455']
          cityNameList = ['鼎湖区']
        } else if (this.params.cantonArea === '441204') {
          data1 = ['1082.1859']
          data2 = ['779.2166']
          cityNameList = ['高要区']
        } else if (this.params.cantonArea === '441223') {
          data1 = ['1483.7474']
          data2 = ['1108.6181']
          cityNameList = ['广宁县']
        } else if (this.params.cantonArea === '441224') {
          data1 = ['1411.501']
          data2 = ['909.44']
          cityNameList = ['怀集县']
        } else if (this.params.cantonArea === '441225') {
          data1 = ['1237.1932']
          data2 = ['747.7741']
          cityNameList = ['封开县']
        } else if (this.params.cantonArea === '441226') {
          data1 = ['2515.1689']
          data2 = ['1679.9999']
          cityNameList = ['德庆县']
        } else if (this.params.cantonArea === '441284') {
          data1 = ['3117.6303']
          data2 = ['2358.7596']
          cityNameList = ['四会市']
        }
      } else if (this.clickCity === '441300') {
        if (this.params.cantonArea === '') {
          data1 = [
            '10989.2484',
            '9119.2002',
            '5464.5926',
            '6899.1746',
            '2953.2823'
          ]
          data2 = [
            '8006.2878',
            '6634.6598',
            '3061.698',
            '3667.4846',
            '1042.8432'
          ]
          cityNameList = ['惠城区', '惠阳区', '博罗县', '惠东县', '龙门县']
        } else if (this.params.cantonArea === '441302') {
          data1 = ['10989.2484']
          data2 = ['8006.2878']
          cityNameList = ['惠城区']
        } else if (this.params.cantonArea === '441303') {
          data1 = ['9119.2002']
          data2 = ['6634.6598']
          cityNameList = ['惠阳区']
        } else if (this.params.cantonArea === '441322') {
          data1 = ['5464.5926']
          data2 = ['3061.698']
          cityNameList = ['博罗县']
        } else if (this.params.cantonArea === '441323') {
          data1 = ['6899.1746']
          data2 = ['3667.4846']
          cityNameList = ['惠东县']
        } else if (this.params.cantonArea === '441324') {
          data1 = ['2953.2823']
          data2 = ['1042.8432']
          cityNameList = ['龙门县']
        }
      } else if (this.clickCity === '441400') {
        if (this.params.cantonArea === '') {
          data1 = [
            '1037.1266',
            '1839.7265',
            '795.4908',
            '1420.5806',
            '2325.2522',
            '603.3175',
            '1087.3608',
            '2070.1116'
          ]
          data2 = [
            '863.9501',
            '1638.9004',
            '533.7129',
            '844.0494',
            '1641.6584',
            '350.528',
            '610.5216',
            '1348.3438'
          ]
          cityNameList = [
            '梅江区',
            '梅县区',
            '大埔县',
            '丰顺县',
            '五华县',
            '平远县',
            '蕉岭县',
            '兴宁市'
          ]
        } else if (this.params.cantonArea === '441402') {
          data1 = ['1037.1266']
          data2 = ['863.9501']
          cityNameList = ['梅江区']
        } else if (this.params.cantonArea === '441403') {
          data1 = ['1839.7265']
          data2 = ['1638.9004']
          cityNameList = ['梅县区']
        } else if (this.params.cantonArea === '441422') {
          data1 = ['795.4908']
          data2 = ['533.7129']
          cityNameList = ['大埔县']
        } else if (this.params.cantonArea === '441423') {
          data1 = ['1420.5806']
          data2 = ['844.0494']
          cityNameList = ['丰顺县']
        } else if (this.params.cantonArea === '441424') {
          data1 = ['2325.2522']
          data2 = ['1641.6584']
          cityNameList = ['五华县']
        } else if (this.params.cantonArea === '441426') {
          data1 = ['603.3175']
          data2 = ['350.528']
          cityNameList = ['平远县']
        } else if (this.params.cantonArea === '441427') {
          data1 = ['1087.3608']
          data2 = ['610.5216']
          cityNameList = ['蕉岭县']
        } else if (this.params.cantonArea === '441481') {
          data1 = ['2070.1116']
          data2 = ['1348.3438']
          cityNameList = ['兴宁市']
        }
      } else if (this.clickCity === '441500') {
        if (this.params.cantonArea === '') {
          data1 = ['4391.0449', '3874.6729', '1363.5671', '3944.7353']
          data2 = ['3165.6101', '2647.8279', '935.1119', '2981.3363']
          cityNameList = ['城区', '海丰县', '陆河县', '陆丰市']
        } else if (this.params.cantonArea === '441502') {
          data1 = ['4391.0449']
          data2 = ['3165.6101']
          cityNameList = ['城区']
        } else if (this.params.cantonArea === '441521') {
          data1 = ['3874.6729']
          data2 = ['2647.8279']
          cityNameList = ['海丰县']
        } else if (this.params.cantonArea === '441523') {
          data1 = ['1363.5671']
          data2 = ['935.1119']
          cityNameList = ['陆河县']
        } else if (this.params.cantonArea === '441581') {
          data1 = ['3944.7353']
          data2 = ['2981.3363']
          cityNameList = ['陆丰市']
        }
      } else if (this.clickCity === '441600') {
        if (this.params.cantonArea === '') {
          data1 = [
            '3300.9901',
            '2733.7494',
            '1965.141',
            '795.6197',
            '1966.208',
            '4810.7575'
          ]
          data2 = [
            '2769.7363',
            '2047.5848',
            '1440.1034',
            '389.7241',
            '1720.8619',
            '2564.5135'
          ]
          cityNameList = [
            '源城区',
            '紫金县',
            '龙川县',
            '连平县',
            '和平县',
            '东源县'
          ]
        } else if (this.params.cantonArea === '441602') {
          data1 = ['3300.9901']
          data2 = ['2769.7363']
          cityNameList = ['源城区']
        } else if (this.params.cantonArea === '441621') {
          data1 = ['2733.7494']
          data2 = ['2047.5848']
          cityNameList = ['紫金县']
        } else if (this.params.cantonArea === '441622') {
          data1 = ['1965.141']
          data2 = ['1440.1034']
          cityNameList = ['龙川县']
        } else if (this.params.cantonArea === '441623') {
          data1 = ['795.6197']
          data2 = ['389.7241']
          cityNameList = ['连平县']
        } else if (this.params.cantonArea === '441624') {
          data1 = ['1966.208']
          data2 = ['1720.8619']
          cityNameList = ['和平县']
        } else if (this.params.cantonArea === '441625') {
          data1 = ['4810.7575']
          data2 = ['2564.5135']
          cityNameList = ['东源县']
        }
      } else if (this.clickCity === '441700') {
        if (this.params.cantonArea === '') {
          data1 = ['5384.6012', '1974.8771', '2635.3195', '3040.1098']
          data2 = ['3657.8678', '1295.3592', '1229.9531', '2170.1683']
          cityNameList = ['江城区', '阳东区', '阳西县', '阳春市']
        } else if (this.params.cantonArea === '441702') {
          data1 = ['5384.6012']
          data2 = ['3657.8678']
          cityNameList = ['江城区']
        } else if (this.params.cantonArea === '441704') {
          data1 = ['1974.8771']
          data2 = ['1295.3592']
          cityNameList = ['阳东区']
        } else if (this.params.cantonArea === '441721') {
          data1 = ['2635.3195']
          data2 = ['1229.9531']
          cityNameList = ['阳西县']
        } else if (this.params.cantonArea === '441781') {
          data1 = ['3040.1098']
          data2 = ['2170.1683']
          cityNameList = ['阳春市']
        }
      } else if (this.clickCity === '441800') {
        if (this.params.cantonArea === '') {
          data1 = [
            '6014.0103',
            '1531.9368',
            '1175.0193',
            '689.3086',
            '765.7016',
            '592.1703',
            '4552.0635',
            '1528.0628'
          ]
          data2 = [
            '3471.5635',
            '1190.4723',
            '706.4079',
            '216.8001',
            '105.2628',
            '308.7867',
            '2361.6874',
            '1051.254'
          ]
          cityNameList = [
            '清城区',
            '清新区',
            '佛冈县',
            '阳山县',
            '连山壮族瑶族自治县',
            '连南瑶族自治县',
            '英德市',
            '连州市'
          ]
        } else if (this.params.cantonArea === '441802') {
          data1 = ['6014.0103']
          data2 = ['3471.5635']
          cityNameList = ['清城区']
        } else if (this.params.cantonArea === '441803') {
          data1 = ['1531.9368']
          data2 = ['1190.4723']
          cityNameList = ['清新区']
        } else if (this.params.cantonArea === '441821') {
          data1 = ['1175.0193']
          data2 = ['706.4079']
          cityNameList = ['佛冈县']
        } else if (this.params.cantonArea === '441823') {
          data1 = ['689.3086']
          data2 = ['216.8001']
          cityNameList = ['阳山县']
        } else if (this.params.cantonArea === '441825') {
          data1 = ['765.7016']
          data2 = ['105.2628']
          cityNameList = ['连山壮族瑶族自治县']
        } else if (this.params.cantonArea === '441826') {
          data1 = ['592.1703']
          data2 = ['308.7867']
          cityNameList = ['连南瑶族自治县']
        } else if (this.params.cantonArea === '441881') {
          data1 = ['4552.0635']
          data2 = ['2361.6874']
          cityNameList = ['英德市']
        } else if (this.params.cantonArea === '441882') {
          data1 = ['1528.0628']
          data2 = ['1051.254']
          cityNameList = ['连州市']
        }
      } else if (this.clickCity === '441900') {
        cityNameList = [
          '东城街道',
          '万江街道',
          '莞城街道',
          '常平镇',
          '南城街道',
          '厚街镇',
          '樟木头镇',
          '虎门镇',
          '长安镇',
          '大朗镇',
          '塘厦镇',
          '大朗镇',
          '凤岗镇',
          '清溪镇',
          '谢岗镇',
          '桥头镇',
          '谢岗镇',
          '石龙镇',
          '谢岗镇',
          '石碣镇',
          '高埗镇',
          '中堂镇',
          '洪梅镇',
          '麻涌镇',
          '沙田镇',
          '茶山镇',
          '企石镇',
          '横沥镇',
          '寮步镇',
          '东坑镇',
          '石排镇',
          '大岭山镇'
        ]
      } else if (this.clickCity === '442000') {
        cityNameList = [
          '石岐街道',
          '南区街道',
          '港口镇',
          '东升镇',
          '东区街道',
          '西区街道',
          '阜沙镇',
          '南头镇',
          '东凤镇',
          '小榄镇',
          '横栏镇',
          '大涌镇',
          '板芙镇',
          '神湾镇',
          '三角镇',
          '三乡镇',
          '坦洲镇',
          '五桂山街道',
          '火炬高技术产业开发区',
          '南朗镇',
          '民众镇'
        ]
      } else if (this.clickCity === '445100') {
        if (this.params.cantonArea === '') {
          data1 = ['2846.8667', '2724.3092', '3832.1053']
          data2 = ['2254.1661', '2302.1133', '2194.6049']
          cityNameList = ['湘桥区', '潮安区', '饶平县']
        } else if (this.params.cantonArea === '445102') {
          data1 = ['2846.8667']
          data2 = ['2254.1661']
          cityNameList = ['湘桥区']
        } else if (this.params.cantonArea === '445103') {
          data1 = ['2724.3092']
          data2 = ['2302.1133']
          cityNameList = ['潮安区']
        } else if (this.params.cantonArea === '445122') {
          data1 = ['3832.1053']
          data2 = ['2194.6049']
          cityNameList = ['饶平县']
        }
      } else if (this.clickCity === '445200') {
        if (this.params.cantonArea === '') {
          data1 = [
            '2215.9873',
            '2253.1488',
            '1463.4482',
            '4468.9589',
            '2099.6639'
          ]
          data2 = [
            '1652.7085',
            '2172.3167',
            '929.2924',
            '2585.6427',
            '1727.3002'
          ]
          cityNameList = ['榕城区', '揭东区', '揭西县', '惠来县', '普宁市']
        } else if (this.params.cantonArea === '445202') {
          data1 = ['2215.9873']
          data2 = ['1652.7085']
          cityNameList = ['榕城区']
        } else if (this.params.cantonArea === '445203') {
          data1 = ['2253.1488']
          data2 = ['2172.3167']
          cityNameList = ['揭东区']
        } else if (this.params.cantonArea === '445222') {
          data1 = ['1463.4482']
          data2 = ['929.2924']
          cityNameList = ['揭西县']
        } else if (this.params.cantonArea === '445224') {
          data1 = ['4468.9589']
          data2 = ['2585.6427']
          cityNameList = ['惠来县']
        } else if (this.params.cantonArea === '445281') {
          data1 = ['2099.6639']
          data2 = ['1727.3002']
          cityNameList = ['普宁市']
        }
      } else if (this.clickCity === '445300') {
        if (this.params.cantonArea === '') {
          data1 = [
            '1620.4015',
            '1990.5972',
            '1620.5503',
            '811.0355',
            '1623.443'
          ]
          data2 = [
            '1424.7195',
            '1036.4732',
            '1064.6885',
            '664.8432',
            '1288.1385'
          ]
          cityNameList = ['云城区', '云安区', '新兴县', '郁南县', '罗定市']
        } else if (this.params.cantonArea === '445302') {
          data1 = ['1620.4015']
          data2 = ['1424.7195']
          cityNameList = ['云城区']
        } else if (this.params.cantonArea === '445303') {
          data1 = ['1990.5972']
          data2 = ['1036.4732']
          cityNameList = ['云安区']
        } else if (this.params.cantonArea === '445321') {
          data1 = ['1620.5503']
          data2 = ['1064.6885']
          cityNameList = ['新兴县']
        } else if (this.params.cantonArea === '445322') {
          data1 = ['811.0355']
          data2 = ['664.8432']
          cityNameList = ['郁南县']
        } else if (this.params.cantonArea === '445381') {
          data1 = ['1623.443']
          data2 = ['1288.1385']
          cityNameList = ['罗定市']
        }
      }

      let legendData = ['建设用地剩余空间', '城乡建设用地剩余空间']
      let seriesAllData = []

      if (this.params.year == this.nowYear6) {
        seriesAllData = [data1, data2]
      } else {
        for (var i = 0; i < cityNameList.length; i++) {
          data1[i] = Math.round(Math.random() * 2000)
          data2[i] = Math.round(Math.random() * 2000)
        }
        seriesAllData = [data1, data2]
      }

      let option = {}

      if (this.chartScreen === 'small') {
        let colorData = ['#00d07c', '#1d7ce4']

        let series = []
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: 'bar',
            barWidth: null, // 默认自适应
            barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
            barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          })
        }

        option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            right: '0%',
            top: '2%',
            data: legendData,
            itemWidth: 14,
            itemHeight: 14
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '15%',
            top: '15%',
            containLabel: true,
            x: 100, // 控制x轴文字与底部的距离
            y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
          },
          xAxis: [
            {
              // name: '市',
              type: 'category',
              data: cityNameList,
              axisTick: {
                alignWithLabel: true,
                show: false // 不要刻度
              },
              axisLine: {
                show: false // 不要x轴
              },
              axisLabel: {
                interval: 'auto',
                rotate: 45 // 文字逆时针旋转45°
                //  textStyle: {
                //    fontSize: "14" //坐标值得具体的颜色
                // }
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
            }
          ],
          yAxis: [
            {
              name: '单位：公顷',
              type: 'value',
              // interval: 500,
              // max: 1500,
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
      } else if (this.chartScreen === 'big') {
        let colorData1 = ['#00f896', '#0269f3']
        let colorData2 = ['#091e31', '#091e31']

        let series = []
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: 'bar',
            barWidth: null, // 默认自适应
            barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
            barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: colorData1[i] // 高处的颜色
                    },
                    {
                      offset: 1,
                      color: colorData2[i] // 低处的颜色
                    }
                  ],
                  false
                )
              }
            }
          })
        }

        option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            right: '0%',
            top: '2%',
            data: legendData,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: {
              color: '#fff'
            }
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '15%',
            top: '15%',
            containLabel: true,
            x: 100, // 控制x轴文字与底部的距离
            y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
          },
          xAxis: [
            {
              // name: '市',
              type: 'category',
              data: cityNameList,
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
                show: true,
                textStyle: {
                  color: '#fff'
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
              end: 50
            }
          ],
          yAxis: [
            {
              name: '单位：公顷',
              nameTextStyle: {
                color: '#fff'
              },
              type: 'value',
              // interval: 500,
              // max: 1500,
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
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            }
          ],
          series: series
        }
      }

      programmeSpaceChart.setOption(option, true)
    },
    // 用地报批规划审核情况
    landAuditDrawLine () {
      setTimeout(() => {
        let landAuditChart = echarts.init(
          document.getElementById('land-audit-chart')
        )
        document.getElementById('land-audit-chart').style.width = 100 + '%'
        document.getElementById('land-audit-chart').style.height = 100 + '%'
        landAuditChart.resize() // 直接加这句即可
      }, 0)
      let landAuditChart = echarts.init(
        document.getElementById('land-audit-chart')
      )

      let seriesValue = ''
      if (this.clickCity === '') {
        this.programmeArea
          = 4185554.9811
          + 363575.3589
          + 0
          + 0
          + 64061.5964
          + 7200067.3834
          + 2387703.1193
          + 202968.5254
          + 428933.0888
          + 1604882.452
          + 1246386.0106
          + 2092219.4694
          + 2189029.8996
          + 2192124.0911
          + 2600655.0262
          + 1069163.6009
          + 4332004.1522
          + 1018035.0732
          + 208771.6248
          + 648280.8868
          + 1458107.7836
        this.submitArea
          = 4185554.9811
          + 1632146.6842
          + 0
          + 0
          + 88603.9802
          + 7706453.2609
          + 2387703.1193
          + 202968.5254
          + 579142.3324
          + 1604882.452
          + 3830497.139
          + 2092219.4694
          + 2189029.8996
          + 6530630.5459
          + 2600655.0262
          + 1069163.6009
          + 4332004.1522
          + 4521185.6326
          + 208771.6248
          + 648280.8868
          + 1458107.7836
      } else if (this.clickCity === '440100') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 4185554.9811
          this.submitArea = 4185554.9811
        } else if (this.params.cantonArea === '440103') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440104') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440105') {
          this.programmeArea = 2344122.89
          this.submitArea = 2344122.89
        } else if (this.params.cantonArea === '440106') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440111') {
          this.programmeArea = 118705.73
          this.submitArea = 118705.73
        } else if (this.params.cantonArea === '440112') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440113') {
          this.programmeArea = 20381.35
          this.submitArea = 20381.35
        } else if (this.params.cantonArea === '440114') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440115') {
          this.programmeArea = 893413.04
          this.submitArea = 893413.04
        } else if (this.params.cantonArea === '440117') {
          this.programmeArea = 236081.52
          this.submitArea = 236081.52
        } else if (this.params.cantonArea === '440118') {
          this.programmeArea = ''
          this.submitArea = ''
        }
      } else if (this.clickCity === '440200') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 363575.3589
          this.submitArea = 1632146.6842
        } else if (this.params.cantonArea === '440203') {
          this.programmeArea = 0
          this.submitArea = 165240.17
        } else if (this.params.cantonArea === '440204') {
          this.programmeArea = 0
          this.submitArea = 338094.29
        } else if (this.params.cantonArea === '440205') {
          this.programmeArea = 0
          this.submitArea = 765236.86
        } else if (this.params.cantonArea === '440222') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440224') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440229') {
          this.programmeArea = 5461.13
          this.submitArea = 5461.13
        } else if (this.params.cantonArea === '440232') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440233') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440281') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440282') {
          this.programmeArea = 358114.23
          this.submitArea = 358114.23
        }
      } else if (this.clickCity === '440300') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 0
          this.submitArea = 0
        } else if (this.params.cantonArea === '440303') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440304') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440305') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440306') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440307') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440308') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440309') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440310') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440311') {
          this.programmeArea = ''
          this.submitArea = ''
        }
      } else if (this.clickCity === '440400') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 0
          this.submitArea = 0
        } else if (this.params.cantonArea === '440402') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440403') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440404') {
          this.programmeArea = ''
          this.submitArea = ''
        }
      } else if (this.clickCity === '440500') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 64061.5964
          this.submitArea = 88603.9802
        } else if (this.params.cantonArea === '440507') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440511') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440512') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440513') {
          this.programmeArea = 30824.54
          this.submitArea = 30824.54
        } else if (this.params.cantonArea === '440514') {
          this.programmeArea = 0
          this.submitArea = 24542.38
        } else if (this.params.cantonArea === '440515') {
          this.programmeArea = 33237.06
          this.submitArea = 33237.06
        } else if (this.params.cantonArea === '440523') {
          this.programmeArea = ''
          this.submitArea = ''
        }
      } else if (this.clickCity === '440600') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 7200067.3834
          this.submitArea = 7706453.2609
        } else if (this.params.cantonArea === '440604') {
          this.programmeArea = 782189.28
          this.submitArea = 782189.28
        } else if (this.params.cantonArea === '440605') {
          this.programmeArea = 4177481.85
          this.submitArea = 4493871.5
        } else if (this.params.cantonArea === '440606') {
          this.programmeArea = 379488.88
          this.submitArea = 379488.88
        } else if (this.params.cantonArea === '440607') {
          this.programmeArea = 1120846.32
          this.submitArea = 1310842.55
        } else if (this.params.cantonArea === '440608') {
          this.programmeArea = 740061.05
          this.submitArea = 740061.05
        }
      } else if (this.clickCity === '440700') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 2387703.1193
          this.submitArea = 2387703.1193
        } else if (this.params.cantonArea === '440703') {
          this.programmeArea = 96845.78
          this.submitArea = 96845.78
        } else if (this.params.cantonArea === '440704') {
          this.programmeArea = 129400.01
          this.submitArea = 129400.01
        } else if (this.params.cantonArea === '440705') {
          this.programmeArea = 1465282.98
          this.submitArea = 1465282.98
        } else if (this.params.cantonArea === '440781') {
          this.programmeArea = 211118.29
          this.submitArea = 211118.29
        } else if (this.params.cantonArea === '440783') {
          this.programmeArea = 238845.53
          this.submitArea = 238845.53
        } else if (this.params.cantonArea === '440784') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440785') {
          this.programmeArea = 246210.53
          this.submitArea = 246210.53
        }
      } else if (this.clickCity === '440800') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 202968.5254
          this.submitArea = 202968.5254
        } else if (this.params.cantonArea === '440802') {
          this.programmeArea = 119538.45
          this.submitArea = 119538.45
        } else if (this.params.cantonArea === '440803') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440804') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440811') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440823') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440825') {
          this.programmeArea = 7329.25
          this.submitArea = 7329.25
        } else if (this.params.cantonArea === '440881') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440882') {
          this.programmeArea = 76100.82
          this.submitArea = 76100.82
        } else if (this.params.cantonArea === '440883') {
          this.programmeArea = ''
          this.submitArea = ''
        }
      } else if (this.clickCity === '440900') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 428933.0888
          this.submitArea = 579142.3324
        } else if (this.params.cantonArea === '440902') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440904') {
          this.programmeArea = 374818.38
          this.submitArea = 525027.62
        } else if (this.params.cantonArea === '440981') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440982') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '440983') {
          this.programmeArea = ''
          this.submitArea = ''
        }
      } else if (this.clickCity === '441200') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 1604882.452
          this.submitArea = 1604882.452
        } else if (this.params.cantonArea === '441202') {
          this.programmeArea = 2957.1
          this.submitArea = 2957.1
        } else if (this.params.cantonArea === '441203') {
          this.programmeArea = 802256.24
          this.submitArea = 802256.24
        } else if (this.params.cantonArea === '441204') {
          this.programmeArea = 164067.64
          this.submitArea = 164067.64
        } else if (this.params.cantonArea === '441223') {
          this.programmeArea = 143357.79
          this.submitArea = 143357.79
        } else if (this.params.cantonArea === '441224') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '441225') {
          this.programmeArea = 492243.68
          this.submitArea = 492243.68
        } else if (this.params.cantonArea === '441226') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '441284') {
          this.programmeArea = ''
          this.submitArea = ''
        }
      } else if (this.clickCity === '441300') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 1246386.0106
          this.submitArea = 3830497.139
        } else if (this.params.cantonArea === '441302') {
          this.programmeArea = 497968.05
          this.submitArea = 3059071.78
        } else if (this.params.cantonArea === '441303') {
          this.programmeArea = 14467.89
          this.submitArea = 37475.29
        } else if (this.params.cantonArea === '441322') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '441323') {
          this.programmeArea = 162304.56
          this.submitArea = 162304.56
        } else if (this.params.cantonArea === '441324') {
          this.programmeArea = 571645.51
          this.submitArea = 571645.51
        }
      } else if (this.clickCity === '441400') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 2092219.4694
          this.submitArea = 2092219.4694
        } else if (this.params.cantonArea === '441402') {
          this.programmeArea = 183503.57
          this.submitArea = 183503.57
        } else if (this.params.cantonArea === '441403') {
          this.programmeArea = 457499.45
          this.submitArea = 457499.45
        } else if (this.params.cantonArea === '441422') {
          this.programmeArea = 23975.67
          this.submitArea = 23975.67
        } else if (this.params.cantonArea === '441423') {
          this.programmeArea = 337348.79
          this.submitArea = 337348.79
        } else if (this.params.cantonArea === '441424') {
          this.programmeArea = 286895.45
          this.submitArea = 286895.45
        } else if (this.params.cantonArea === '441426') {
          this.programmeArea = 192550.87
          this.submitArea = 192550.87
        } else if (this.params.cantonArea === '441427') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '441481') {
          this.programmeArea = 610445.66
          this.submitArea = 610445.66
        }
      } else if (this.clickCity === '441500') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 2189029.8996
          this.submitArea = 2189029.8996
        } else if (this.params.cantonArea === '441502') {
          this.programmeArea = 690534.69
          this.submitArea = 690534.69
        } else if (this.params.cantonArea === '441521') {
          this.programmeArea = 678963.08
          this.submitArea = 678963.08
        } else if (this.params.cantonArea === '441523') {
          this.programmeArea = 562929.41
          this.submitArea = 562929.41
        } else if (this.params.cantonArea === '441581') {
          this.programmeArea = 256602.71
          this.submitArea = 256602.71
        }
      } else if (this.clickCity === '441600') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 2192124.0911
          this.submitArea = 6530630.5459
        } else if (this.params.cantonArea === '441602') {
          this.programmeArea = 830033.43
          this.submitArea = 830033.43
        } else if (this.params.cantonArea === '441621') {
          this.programmeArea = 228506.95
          this.submitArea = 4567013.4
        } else if (this.params.cantonArea === '441622') {
          this.programmeArea = 376391.92
          this.submitArea = 376391.92
        } else if (this.params.cantonArea === '441623') {
          this.programmeArea = 207420.37
          this.submitArea = 207420.37
        } else if (this.params.cantonArea === '441624') {
          this.programmeArea = 138158.31
          this.submitArea = 138158.31
        } else if (this.params.cantonArea === '441625') {
          this.programmeArea = 411613.12
          this.submitArea = 411613.12
        }
      } else if (this.clickCity === '441700') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 2600655.0262
          this.submitArea = 2600655.0262
        } else if (this.params.cantonArea === '441702') {
          this.programmeArea = 35100.68
          this.submitArea = 35100.68
        } else if (this.params.cantonArea === '441704') {
          this.programmeArea = 653447.16
          this.submitArea = 653447.16
        } else if (this.params.cantonArea === '441721') {
          this.programmeArea = 491642.04
          this.submitArea = 491642.04
        } else if (this.params.cantonArea === '441781') {
          this.programmeArea = 1420465.15
          this.submitArea = 1420465.15
        }
      } else if (this.clickCity === '441800') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 1069163.6009
          this.submitArea = 1069163.6009
        } else if (this.params.cantonArea === '441802') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '441803') {
          this.programmeArea = 291627.89
          this.submitArea = 291627.89
        } else if (this.params.cantonArea === '441821') {
          this.programmeArea = 335564
          this.submitArea = 335564
        } else if (this.params.cantonArea === '441823') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '441825') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '441826') {
          this.programmeArea = 222575.43
          this.submitArea = 222575.43
        } else if (this.params.cantonArea === '441881') {
          this.programmeArea = 62194.79
          this.submitArea = 62194.79
        } else if (this.params.cantonArea === '441882') {
          this.programmeArea = 157201.49
          this.submitArea = 157201.49
        }
      } else if (this.clickCity === '441900') {
        this.programmeArea = 4332004.1522
        this.submitArea = 4332004.1522
      } else if (this.clickCity === '442000') {
        this.programmeArea = 1018035.0732
        this.submitArea = 4521185.6326
      } else if (this.clickCity === '445100') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 208771.6248
          this.submitArea = 208771.6248
        } else if (this.params.cantonArea === '445102') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '445103') {
          this.programmeArea = 208771.62
          this.submitArea = 208771.62
        } else if (this.params.cantonArea === '445122') {
          this.programmeArea = ''
          this.submitArea = ''
        }
      } else if (this.clickCity === '445200') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 648280.8868
          this.submitArea = 648280.8868
        } else if (this.params.cantonArea === '445202') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '445203') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '445222') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '445224') {
          this.programmeArea = ''
          this.submitArea = ''
        } else if (this.params.cantonArea === '445281') {
          this.programmeArea = 648280.89
          this.submitArea = 648280.89
        }
      } else if (this.clickCity === '445300') {
        if (this.params.cantonArea === '') {
          this.programmeArea = 1458107.7836
          this.submitArea = 1458107.7836
        } else if (this.params.cantonArea === '445302') {
          this.programmeArea = 383011.92
          this.submitArea = 383011.92
        } else if (this.params.cantonArea === '445303') {
          this.programmeArea = 400002.21
          this.submitArea = 400002.21
        } else if (this.params.cantonArea === '445321') {
          this.programmeArea = 244086.66
          this.submitArea = 244086.66
        } else if (this.params.cantonArea === '445322') {
          this.programmeArea = 431006.99
          this.submitArea = 431006.99
        } else if (this.params.cantonArea === '445381') {
          this.programmeArea = ''
          this.submitArea = ''
        }
      }

      if (this.params.year == this.nowYear6) {
        seriesValue = (
          this.submitArea
          / (this.programmeArea + this.submitArea)
        ).toPrecision(3)
        if (isNaN(seriesValue)) {
          seriesValue = 0
        }
      } else {
        this.programmeArea = Math.round(Math.random() * 300000)
        this.submitArea = Math.round(Math.random() * 300000)
        seriesValue
          = Math.ceil(
            (Number(this.submitArea)
              / (Number(this.programmeArea) + Number(this.submitArea)))
            * 100
          ) / 100
        if (isNaN(seriesValue)) {
          seriesValue = 0
        }
      }

      let option = {}

      if (this.chartScreen === 'small') {
        option = {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          series: [
            {
              name: '用地报批面积',
              type: 'gauge',
              radius: '60%',
              center: ['80%', '40%'],
              axisLine: {
                lineStyle: {
                  color: [
                    [seriesValue, '#2FB8D7'], // 外环基础色
                    [1, '#335CAD']
                  ],
                  width: 20
                }
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
              itemStyle: {
                show: false
              },
              detail: {
                offsetCenter: [0, '30%'],
                formatter: `{a|${(seriesValue * 100).toFixed(2)}%}\n{radius|用地报批面积}`,
                rich: {
                  a: {
                    color: '#333333',
                    lineHeight: 70,
                    fontSize: 14,
                    fontWeight: 550
                  },
                  b: {
                    color: '#666666',
                    fontSize: 12,
                    padding: [10, 0, 10, 0]
                  },
                  radius: {
                    width: 80,
                    height: 20,
                    // lineHeight:80,
                    borderWidth: 1,
                    borderColor: '',
                    fontSize: 12,
                    color: '#fff',
                    backgroundColor: '#1D7CE4',
                    borderRadius: 5,
                    textAlign: 'center'
                  }
                }
              },

              pointer: {
                show: false,
                length: '0',
                width: '0' // 指针粗细
              },
              data: [
                {
                  name: '',
                  value: seriesValue
                }
              ]
            }
          ]
        }
      } else if (this.chartScreen === 'big') {
        option = {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          series: [
            {
              name: '用地报批面积',
              type: 'gauge',
              radius: '60%',
              center: ['80%', '50%'],
              axisLine: {
                lineStyle: {
                  color: [
                    [seriesValue, '#2FB8D7'], // 外环基础色
                    [1, '#335CAD']
                  ],
                  width: 20
                }
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
              itemStyle: {
                show: false
              },
              detail: {
                offsetCenter: [0, '30%'],
                formatter: `{a|${(seriesValue * 100).toFixed(2)}%}\n{radius|用地报批面积}`,
                rich: {
                  a: {
                    color: '#fff',
                    lineHeight: 70,
                    fontSize: 24,
                    fontWeight: 550
                  },
                  b: {
                    color: '#666666',
                    fontSize: 12,
                    padding: [10, 0, 10, 0]
                  },
                  radius: {
                    width: 90,
                    height: 25,
                    // lineHeight:80,
                    borderWidth: 1,
                    borderColor: '',
                    fontSize: 14,
                    color: '#fff',
                    backgroundColor: '#335CAD',
                    borderRadius: 5,
                    textAlign: 'center'
                  }
                }
              },

              pointer: {
                show: false,
                length: '0',
                width: '0' // 指针粗细
              },
              data: [
                {
                  name: '',
                  value: seriesValue
                }
              ]
            }
          ]
        }
      }

      landAuditChart.setOption(option, true)
    },

    // 获取当前时间
    getTime () {
      this.presentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },

    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.mapChart)
        document.getElementById('chinaChart').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可

        let landUseChart = echarts.init(
          document.getElementById('land-use-chart')
        )
        document.getElementById('land-use-chart').style.width = 100 + '%'
        document.getElementById('land-use-chart').style.height = 25 + '%'
        landUseChart.resize()

        let forestryAreaChart = echarts.init(
          document.getElementById('forestry-area-chart')
        )
        document.getElementById('forestry-area-chart').style.width = 100 + '%'
        document.getElementById('forestry-area-chart').style.height = 25 + '%'
        forestryAreaChart.resize()

        let seaAreaChart = echarts.init(
          document.getElementById('sea-area-chart')
        )
        document.getElementById('sea-area-chart').style.width = 100 + '%'
        document.getElementById('sea-area-chart').style.height = 25 + '%'
        seaAreaChart.resize()

        let waterResourceChart = echarts.init(
          document.getElementById('water-resource-chart')
        )
        document.getElementById('water-resource-chart').style.width = 100 + '%'
        document.getElementById('water-resource-chart').style.height = 25 + '%'
        waterResourceChart.resize()

        let programmeSpaceChart = echarts.init(
          document.getElementById('programme-space-chart')
        )
        document.getElementById('programme-space-chart').style.width
          = 100 + '%'
        document.getElementById('programme-space-chart').style.height
          = 100 + '%'
        programmeSpaceChart.resize()

        let landAuditChart = echarts.init(
          document.getElementById('land-audit-chart')
        )
        document.getElementById('land-audit-chart').style.width = 100 + '%'
        document.getElementById('land-audit-chart').style.height = 100 + '%'
        landAuditChart.resize()
      })
    },
    // 面包屑
    toProvinceWide () {
      sessionStorage.removeItem('indexCity')
      sessionStorage.removeItem('indexArea')
      this.clickCity = ''
      this.clickAreaName = ''
      this.params.cantonArea = ''

      // this.loadMap(
      //   "../../../../../static/map/json/province/440000.json",
      //   "guangdong"
      // );
      this.isCity = false
      this.breadcrumbCityName = ''
      this.isArea = false
      this.breadcrumbAreaName = ''
      this.landUseDrawLine()
      this.getLittleMTData()
    },
    toCityWide () {
      sessionStorage.removeItem('indexArea')
      this.clickAreaName = ''
      this.clickCity = sessionStorage.getItem('indexCity')
      this.params.cantonArea = ''
      this.isArea = false
      this.breadcrumbAreaName = ''
      this.changeMap()
    },
    // 进入全屏
    fullScreen (el) {
      this.$emit('full')
      this.chartScreen = 'big'
    },
    // 退出全屏
    exitFullScreen (el) {
      this.$emit('full')
      this.chartScreen = 'small'

      var el = document,
        cfs
          = el.cancelFullScreen
          || el.webkitCancelFullScreen
          || el.mozCancelFullScreen
          || el.exitFullScreen,
        wscript

      if (typeof cfs !== 'undefined' && cfs) {
        cfs.call(el)

        return
      }

      if (typeof window.ActiveXObject !== 'undefined') {
        wscript = new ActiveXObject('WScript.Shell')

        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },
    // 点击全屏按钮
    screen () {
      screenfull.on('change', () => {
        if (!screenfull.isFullscreen) {
          this.chartScreen = 'small'
        }
      })
    },
    getLittleMTData () {
      let params = this.params
      params['cantonCity'] = this.clickCity

      this.$get('/epf-monitor-evaluation/monitor/center/baseData', params).then(
        res => {
          if (res.code == 0) {
            this.landIndexData = res.result
            for (var key in this.landIndexData) {
              this.landIndexData[key].indexValueDouble = Number(
                this.landIndexData[key].indexValueDouble
              ).toFixed(2)
              this.landIndexData[key].planValueDouble = Number(
                this.landIndexData[key].planValueDouble
              ).toFixed(2)
            }
            if (this.params.type == '0') {
              this.nowIndex = this.landIndexData[0].indexValueDouble
              this.originalIndex = this.landIndexData[0].planValueDouble
              this.mapTooltipName = this.landIndexData[0].name
            } else if (this.params.type == '1') {
              this.nowIndex = this.landIndexData[1].indexValueDouble
              this.originalIndex = this.landIndexData[1].planValueDouble
              this.mapTooltipName = this.landIndexData[1].name
            } else if (this.params.type == '2') {
              this.nowIndex = this.landIndexData[2].indexValueDouble
              this.originalIndex = this.landIndexData[2].planValueDouble
              this.mapTooltipName = this.landIndexData[2].name
            } else if (this.params.type == '3') {
              this.nowIndex = this.landIndexData[3].indexValueDouble
              this.originalIndex = this.landIndexData[3].planValueDouble
              this.mapTooltipName = this.landIndexData[3].name
            } else if (this.params.type == '4') {
              this.nowIndex = this.landIndexData[4].indexValueDouble
              this.originalIndex = this.landIndexData[4].planValueDouble
              this.mapTooltipName = this.landIndexData[4].name
            }
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    getWaterQualityData () {
      this.waterData = []
      let waterNameData = [
        '惠州西湖',
        '肇庆星湖',
        '河源万绿湖',
        '珠江',
        '韩江'
      ]

      for (var i = 0; i < 5; i++) {
        this.waterData.push({
          waterRank: i + 1,
          waterName: waterNameData[i],
          waterRate: Math.round(Math.random() * 100)
        })
      }
    },
    getIdleLandData () {
      this.idleLandData = [
        {
          idleLandCityName: '湛江市',
          idleLandCityNumber: '6328.80',
          idleLandCityProgress: 34.02,
          idleLandColor: '#335CAD'
        },
        {
          idleLandCityName: '清远市',
          idleLandCityNumber: '4725.15',
          idleLandCityProgress: 29.31,
          idleLandColor: '#335CAD'
        },
        {
          idleLandCityName: '惠州市',
          idleLandCityNumber: '3659.10',
          idleLandCityProgress: 29.15,
          idleLandColor: '#335CAD'
        },
        {
          idleLandCityName: '佛山市',
          idleLandCityNumber: '3502.95',
          idleLandCityProgress: 46.31,
          idleLandColor: '#335CAD'
        },
        {
          idleLandCityName: '阳江市',
          idleLandCityNumber: '3197.10',
          idleLandCityProgress: 37.74,
          idleLandColor: '#335CAD'
        }
      ]
    }
  },
  created () {
    // this.resizeIndex = Math.round(Math.random() * 300);
    this.params.year = moment().year()
    this.getTime()
    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })
  },
  mounted () {
    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })
    this.$nextTick(function () {
      setTimeout(() => {
        this.changeMap()
        this.landUseDrawLine()
        this.forestryAreaDrawLine()
        this.seaAreaDrawLine()
        this.waterResourceDrawLine()
        this.getWaterQualityData()
        this.getLittleMTData()
        this.programmeSpaceDrawLine()
        this.landAuditDrawLine()
        this.getIdleLandData()
      }, 1000)
    })
    this.initEchart()
    this.returnLastStep()
    this.toProvinceWide()
    this.screen()

    let that = this
    that.getTime()
    setInterval(function () {
      that.getTime()
    }, 1000)
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
        document.getElementById('chinaChart').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可

        let landUseChart = echarts.init(
          document.getElementById('land-use-chart')
        )
        document.getElementById('land-use-chart').style.width = 100 + '%'
        document.getElementById('land-use-chart').style.height = 25 + '%'
        landUseChart.resize()

        let forestryAreaChart = echarts.init(
          document.getElementById('forestry-area-chart')
        )
        document.getElementById('forestry-area-chart').style.width = 100 + '%'
        document.getElementById('forestry-area-chart').style.height = 25 + '%'
        forestryAreaChart.resize()

        let seaAreaChart = echarts.init(
          document.getElementById('sea-area-chart')
        )
        document.getElementById('sea-area-chart').style.width = 100 + '%'
        document.getElementById('sea-area-chart').style.height = 25 + '%'
        seaAreaChart.resize()

        let waterResourceChart = echarts.init(
          document.getElementById('water-resource-chart')
        )
        document.getElementById('water-resource-chart').style.width = 100 + '%'
        document.getElementById('water-resource-chart').style.height = 25 + '%'
        waterResourceChart.resize()

        let programmeSpaceChart = echarts.init(
          document.getElementById('programme-space-chart')
        )
        document.getElementById('programme-space-chart').style.width
          = 100 + '%'
        document.getElementById('programme-space-chart').style.height
          = 100 + '%'
        programmeSpaceChart.resize()

        let landAuditChart = echarts.init(
          document.getElementById('land-audit-chart')
        )
        document.getElementById('land-audit-chart').style.width = 100 + '%'
        document.getElementById('land-audit-chart').style.height = 100 + '%'
        landAuditChart.resize()
      },
      20
    )

    sessionStorage.removeItem('indexCity')
  },
  watch: {
    clickCity (val) {
      if (val == '440100') {
        this.breadcrumbCityName = '广州市'
        this.isCity = true
      } else if (val == '440200') {
        this.breadcrumbCityName = '韶关市'
        this.isCity = true
      } else if (val == '440300') {
        this.breadcrumbCityName = '深圳市'
        this.isCity = true
      } else if (val == '440400') {
        this.breadcrumbCityName = '珠海市'
        this.isCity = true
      } else if (val == '440500') {
        this.breadcrumbCityName = '汕头市'
        this.isCity = true
      } else if (val == '440600') {
        this.breadcrumbCityName = '佛山市'
        this.isCity = true
      } else if (val == '440700') {
        this.breadcrumbCityName = '江门市'
        this.isCity = true
      } else if (val == '440800') {
        this.breadcrumbCityName = '湛江市'
        this.isCity = true
      } else if (val == '440900') {
        this.breadcrumbCityName = '茂名市'
        this.isCity = true
      } else if (val == '441200') {
        this.breadcrumbCityName = '肇庆市'
        this.isCity = true
      } else if (val == '441300') {
        this.breadcrumbCityName = '惠州市'
        this.isCity = true
      } else if (val == '441400') {
        this.breadcrumbCityName = '梅州市'
        this.isCity = true
      } else if (val == '441500') {
        this.breadcrumbCityName = '汕尾市'
        this.isCity = true
      } else if (val == '441600') {
        this.breadcrumbCityName = '河源市'
        this.isCity = true
      } else if (val == '441700') {
        this.breadcrumbCityName = '阳江市'
        this.isCity = true
      } else if (val == '441800') {
        this.breadcrumbCityName = '清远市'
        this.isCity = true
      } else if (val == '441900') {
        this.breadcrumbCityName = '东莞市'
        this.isCity = true
      } else if (val == '442000') {
        this.breadcrumbCityName = '中山市'
        this.isCity = true
      } else if (val == '445100') {
        this.breadcrumbCityName = '潮州市'
        this.isCity = true
      } else if (val == '445200') {
        this.breadcrumbCityName = '揭阳市'
        this.isCity = true
      } else if (val == '445300') {
        this.breadcrumbCityName = '云浮市'
        this.isCity = true
      } else if (val == '') {
        this.breadcrumbCityName = ''
        this.isCity = false
      }

      this.changeMap()
      this.landUseDrawLine()
      this.forestryAreaDrawLine()
      this.seaAreaDrawLine()
      this.waterResourceDrawLine()
      this.getWaterQualityData()
      this.getLittleMTData()
      this.programmeSpaceDrawLine()
      this.landAuditDrawLine()
      this.getIdleLandData()

      this.resizeIndex = Math.round(Math.random() * 300)
    },

    clickAreaName (val) {
      if (val == '荔湾区') {
        this.params.cantonArea = '440103'
        this.breadcrumbAreaName = '荔湾区'
        this.isArea = true
      } else if (val == '越秀区') {
        this.params.cantonArea = '440104'
        this.breadcrumbAreaName = '越秀区'
        this.isArea = true
      } else if (val == '海珠区') {
        this.params.cantonArea = '440105'
        this.breadcrumbAreaName = '海珠区'
        this.isArea = true
      } else if (val == '天河区') {
        this.params.cantonArea = '440106'
        this.breadcrumbAreaName = '天河区'
        this.isArea = true
      } else if (val == '白云区') {
        this.params.cantonArea = '440111'
        this.breadcrumbAreaName = '白云区'
        this.isArea = true
      } else if (val == '黄埔区') {
        this.params.cantonArea = '440112'
        this.breadcrumbAreaName = '黄埔区'
        this.isArea = true
      } else if (val == '番禺区') {
        this.params.cantonArea = '440113'
        this.breadcrumbAreaName = '番禺区'
        this.isArea = true
      } else if (val == '花都区') {
        this.params.cantonArea = '440114'
        this.breadcrumbAreaName = '花都区'
        this.isArea = true
      } else if (val == '南沙区') {
        this.params.cantonArea = '440115'
        this.breadcrumbAreaName = '南沙区'
        this.isArea = true
      } else if (val == '从化区') {
        this.params.cantonArea = '440117'
        this.breadcrumbAreaName = '从化区'
        this.isArea = true
      } else if (val == '增城区') {
        this.params.cantonArea = '440118'
        this.breadcrumbAreaName = '增城区'
        this.isArea = true
      } else if (val == '武江区') {
        this.params.cantonArea = '440203'
        this.breadcrumbAreaName = '武江区'
        this.isArea = true
      } else if (val == '浈江区') {
        this.params.cantonArea = '440204'
        this.breadcrumbAreaName = '浈江区'
        this.isArea = true
      } else if (val == '曲江区') {
        this.params.cantonArea = '440205'
        this.breadcrumbAreaName = '曲江区'
        this.isArea = true
      } else if (val == '始兴县') {
        this.params.cantonArea = '440222'
        this.breadcrumbAreaName = '始兴县'
        this.isArea = true
      } else if (val == '仁化县') {
        this.params.cantonArea = '440224'
        this.breadcrumbAreaName = '仁化县'
        this.isArea = true
      } else if (val == '翁源县') {
        this.params.cantonArea = '440229'
        this.breadcrumbAreaName = '翁源县'
        this.isArea = true
      } else if (val == '乳源瑶族自治县') {
        this.params.cantonArea = '440232'
        this.breadcrumbAreaName = '乳源瑶族自治县'
        this.isArea = true
      } else if (val == '新丰县') {
        this.params.cantonArea = '440233'
        this.breadcrumbAreaName = '新丰县'
        this.isArea = true
      } else if (val == '乐昌市') {
        this.params.cantonArea = '440281'
        this.breadcrumbAreaName = '乐昌市'
        this.isArea = true
      } else if (val == '南雄市') {
        this.params.cantonArea = '440282'
        this.breadcrumbAreaName = '南雄市'
        this.isArea = true
      } else if (val == '罗湖区') {
        this.params.cantonArea = '440303'
        this.breadcrumbAreaName = '罗湖区'
        this.isArea = true
      } else if (val == '福田区') {
        this.params.cantonArea = '440304'
        this.breadcrumbAreaName = '福田区'
        this.isArea = true
      } else if (val == '南山区') {
        this.params.cantonArea = '440305'
        this.breadcrumbAreaName = '南山区'
        this.isArea = true
      } else if (val == '宝安区') {
        this.params.cantonArea = '440306'
        this.breadcrumbAreaName = '宝安区'
        this.isArea = true
      } else if (val == '龙岗区') {
        this.params.cantonArea = '440307'
        this.breadcrumbAreaName = '龙岗区'
        this.isArea = true
      } else if (val == '盐田区') {
        this.params.cantonArea = '440308'
        this.breadcrumbAreaName = '盐田区'
        this.isArea = true
      } else if (val == '龙华区') {
        this.params.cantonArea = '440309'
        this.breadcrumbAreaName = '龙华区'
        this.isArea = true
      } else if (val == '坪山区') {
        this.params.cantonArea = '440310'
        this.breadcrumbAreaName = '坪山区'
        this.isArea = true
      } else if (val == '光明区') {
        this.params.cantonArea = '440311'
        this.breadcrumbAreaName = '光明区'
        this.isArea = true
      } else if (val == '香洲区') {
        this.params.cantonArea = '440402'
        this.breadcrumbAreaName = '香洲区'
        this.isArea = true
      } else if (val == '斗门区') {
        this.params.cantonArea = '440403'
        this.breadcrumbAreaName = '斗门区'
        this.isArea = true
      } else if (val == '金湾区') {
        this.params.cantonArea = '440404'
        this.breadcrumbAreaName = '金湾区'
        this.isArea = true
      } else if (val == '龙湖区') {
        this.params.cantonArea = '440507'
        this.breadcrumbAreaName = '龙湖区'
        this.isArea = true
      } else if (val == '金平区') {
        this.params.cantonArea = '440511'
        this.breadcrumbAreaName = '金平区'
        this.isArea = true
      } else if (val == '濠江区') {
        this.params.cantonArea = '440512'
        this.breadcrumbAreaName = '濠江区'
        this.isArea = true
      } else if (val == '潮阳区') {
        this.params.cantonArea = '440513'
        this.breadcrumbAreaName = '潮阳区'
        this.isArea = true
      } else if (val == '潮南区') {
        this.params.cantonArea = '440514'
        this.breadcrumbAreaName = '潮南区'
        this.isArea = true
      } else if (val == '澄海区') {
        this.params.cantonArea = '440515'
        this.breadcrumbAreaName = '澄海区'
        this.isArea = true
      } else if (val == '南澳县') {
        this.params.cantonArea = '440523'
        this.breadcrumbAreaName = '南澳县'
        this.isArea = true
      } else if (val == '禅城区') {
        this.params.cantonArea = '440604'
        this.breadcrumbAreaName = '禅城区'
        this.isArea = true
      } else if (val == '南海区') {
        this.params.cantonArea = '440605'
        this.breadcrumbAreaName = '南海区'
        this.isArea = true
      } else if (val == '顺德区') {
        this.params.cantonArea = '440606'
        this.breadcrumbAreaName = '顺德区'
        this.isArea = true
      } else if (val == '三水区') {
        this.params.cantonArea = '440607'
        this.breadcrumbAreaName = '三水区'
        this.isArea = true
      } else if (val == '高明区') {
        this.params.cantonArea = '440608'
        this.breadcrumbAreaName = '高明区'
        this.isArea = true
      } else if (val == '蓬江区') {
        this.params.cantonArea = '440703'
        this.breadcrumbAreaName = '蓬江区'
        this.isArea = true
      } else if (val == '江海区') {
        this.params.cantonArea = '440704'
        this.breadcrumbAreaName = '江海区'
        this.isArea = true
      } else if (val == '新会区') {
        this.params.cantonArea = '440705'
        this.breadcrumbAreaName = '新会区'
        this.isArea = true
      } else if (val == '台山市') {
        this.params.cantonArea = '440781'
        this.breadcrumbAreaName = '台山市'
        this.isArea = true
      } else if (val == '开平市') {
        this.params.cantonArea = '440783'
        this.breadcrumbAreaName = '开平市'
        this.isArea = true
      } else if (val == '鹤山市') {
        this.params.cantonArea = '440784'
        this.breadcrumbAreaName = '鹤山市'
        this.isArea = true
      } else if (val == '恩平市') {
        this.params.cantonArea = '440785'
        this.breadcrumbAreaName = '恩平市'
        this.isArea = true
      } else if (val == '赤坎区') {
        this.params.cantonArea = '440802'
        this.breadcrumbAreaName = '赤坎区'
        this.isArea = true
      } else if (val == '霞山区') {
        this.params.cantonArea = '440803'
        this.breadcrumbAreaName = '霞山区'
        this.isArea = true
      } else if (val == '坡头区') {
        this.params.cantonArea = '440804'
        this.breadcrumbAreaName = '坡头区'
        this.isArea = true
      } else if (val == '麻章区') {
        this.params.cantonArea = '440811'
        this.breadcrumbAreaName = '麻章区'
        this.isArea = true
      } else if (val == '遂溪县') {
        this.params.cantonArea = '440823'
        this.breadcrumbAreaName = '遂溪县'
        this.isArea = true
      } else if (val == '徐闻县') {
        this.params.cantonArea = '440825'
        this.breadcrumbAreaName = '徐闻县'
        this.isArea = true
      } else if (val == '廉江市') {
        this.params.cantonArea = '440881'
        this.breadcrumbAreaName = '廉江市'
        this.isArea = true
      } else if (val == '雷州市') {
        this.params.cantonArea = '440882'
        this.breadcrumbAreaName = '雷州市'
        this.isArea = true
      } else if (val == '吴川市') {
        this.params.cantonArea = '440883'
        this.breadcrumbAreaName = '吴川市'
        this.isArea = true
      } else if (val == '茂南区') {
        this.params.cantonArea = '440902'
        this.breadcrumbAreaName = '茂南区'
        this.isArea = true
      } else if (val == '电白区') {
        this.params.cantonArea = '440904'
        this.breadcrumbAreaName = '电白区'
        this.isArea = true
      } else if (val == '高州市') {
        this.params.cantonArea = '440981'
        this.breadcrumbAreaName = '高州市'
        this.isArea = true
      } else if (val == '化州市') {
        this.params.cantonArea = '440982'
        this.breadcrumbAreaName = '化州市'
        this.isArea = true
      } else if (val == '信宜市') {
        this.params.cantonArea = '440983'
        this.breadcrumbAreaName = '信宜市'
        this.isArea = true
      } else if (val == '端州区') {
        this.params.cantonArea = '441202'
        this.breadcrumbAreaName = '端州区'
        this.isArea = true
      } else if (val == '鼎湖区') {
        this.params.cantonArea = '441203'
        this.breadcrumbAreaName = '鼎湖区'
        this.isArea = true
      } else if (val == '高要区') {
        this.params.cantonArea = '441204'
        this.breadcrumbAreaName = '高要区'
        this.isArea = true
      } else if (val == '广宁县') {
        this.params.cantonArea = '441223'
        this.breadcrumbAreaName = '广宁县'
        this.isArea = true
      } else if (val == '怀集县') {
        this.params.cantonArea = '441224'
        this.breadcrumbAreaName = '怀集县'
        this.isArea = true
      } else if (val == '封开县') {
        this.params.cantonArea = '441225'
        this.breadcrumbAreaName = '封开县'
        this.isArea = true
      } else if (val == '德庆县') {
        this.params.cantonArea = '441226'
        this.breadcrumbAreaName = '德庆县'
        this.isArea = true
      } else if (val == '四会市') {
        this.params.cantonArea = '441284'
        this.breadcrumbAreaName = '四会市'
        this.isArea = true
      } else if (val == '惠城区') {
        this.params.cantonArea = '441302'
        this.breadcrumbAreaName = '惠城区'
        this.isArea = true
      } else if (val == '惠阳区') {
        this.params.cantonArea = '441303'
        this.breadcrumbAreaName = '惠阳区'
        this.isArea = true
      } else if (val == '博罗县') {
        this.params.cantonArea = '441322'
        this.breadcrumbAreaName = '博罗县'
        this.isArea = true
      } else if (val == '惠东县') {
        this.params.cantonArea = '441323'
        this.breadcrumbAreaName = '惠东县'
        this.isArea = true
      } else if (val == '龙门县') {
        this.params.cantonArea = '441324'
        this.breadcrumbAreaName = '龙门县'
        this.isArea = true
      } else if (val == '梅江区') {
        this.params.cantonArea = '441402'
        this.breadcrumbAreaName = '梅江区'
        this.isArea = true
      } else if (val == '梅县区') {
        this.params.cantonArea = '441403'
        this.breadcrumbAreaName = '梅县区'
        this.isArea = true
      } else if (val == '大埔县') {
        this.params.cantonArea = '441422'
        this.breadcrumbAreaName = '大埔县'
        this.isArea = true
      } else if (val == '丰顺县') {
        this.params.cantonArea = '441423'
        this.breadcrumbAreaName = '丰顺县'
        this.isArea = true
      } else if (val == '五华县') {
        this.params.cantonArea = '441424'
        this.breadcrumbAreaName = '五华县'
        this.isArea = true
      } else if (val == '平远县') {
        this.params.cantonArea = '441426'
        this.breadcrumbAreaName = '平远县'
        this.isArea = true
      } else if (val == '蕉岭县') {
        this.params.cantonArea = '441427'
        this.breadcrumbAreaName = '蕉岭县'
        this.isArea = true
      } else if (val == '兴宁市') {
        this.params.cantonArea = '441481'
        this.breadcrumbAreaName = '兴宁市'
        this.isArea = true
      } else if (val == '城区') {
        this.params.cantonArea = '441502'
        this.breadcrumbAreaName = '城区'
        this.isArea = true
      } else if (val == '海丰县') {
        this.params.cantonArea = '441521'
        this.breadcrumbAreaName = '海丰县'
        this.isArea = true
      } else if (val == '陆河县') {
        this.params.cantonArea = '441523'
        this.breadcrumbAreaName = '陆河县'
        this.isArea = true
      } else if (val == '陆丰市') {
        this.params.cantonArea = '441581'
        this.breadcrumbAreaName = '陆丰市'
        this.isArea = true
      } else if (val == '源城区') {
        this.params.cantonArea = '441602'
        this.breadcrumbAreaName = '源城区'
        this.isArea = true
      } else if (val == '紫金县') {
        this.params.cantonArea = '441621'
        this.breadcrumbAreaName = '紫金县'
        this.isArea = true
      } else if (val == '龙川县') {
        this.params.cantonArea = '441622'
        this.breadcrumbAreaName = '龙川县'
        this.isArea = true
      } else if (val == '连平县') {
        this.params.cantonArea = '441623'
        this.breadcrumbAreaName = '连平县'
        this.isArea = true
      } else if (val == '和平县') {
        this.params.cantonArea = '441624'
        this.breadcrumbAreaName = '和平县'
        this.isArea = true
      } else if (val == '东源县') {
        this.params.cantonArea = '441625'
        this.breadcrumbAreaName = '东源县'
        this.isArea = true
      } else if (val == '江城区') {
        this.params.cantonArea = '441702'
        this.breadcrumbAreaName = '江城区'
        this.isArea = true
      } else if (val == '阳东区') {
        this.params.cantonArea = '441704'
        this.breadcrumbAreaName = '阳东区'
        this.isArea = true
      } else if (val == '阳西县') {
        this.params.cantonArea = '441721'
        this.breadcrumbAreaName = '阳西县'
        this.isArea = true
      } else if (val == '阳春市') {
        this.params.cantonArea = '441781'
        this.breadcrumbAreaName = '阳春市'
        this.isArea = true
      } else if (val == '清城区') {
        this.params.cantonArea = '441802'
        this.breadcrumbAreaName = '清城区'
        this.isArea = true
      } else if (val == '清新区') {
        this.params.cantonArea = '441803'
        this.breadcrumbAreaName = '清新区'
        this.isArea = true
      } else if (val == '佛冈县') {
        this.params.cantonArea = '441821'
        this.breadcrumbAreaName = '佛冈县'
        this.isArea = true
      } else if (val == '阳山县') {
        this.params.cantonArea = '441823'
        this.breadcrumbAreaName = '阳山县'
        this.isArea = true
      } else if (val == '连山壮族瑶族自治县') {
        this.params.cantonArea = '441825'
        this.breadcrumbAreaName = '连山壮族瑶族自治县'
        this.isArea = true
      } else if (val == '连南瑶族自治县') {
        this.params.cantonArea = '441826'
        this.breadcrumbAreaName = '连南瑶族自治县'
        this.isArea = true
      } else if (val == '英德市') {
        this.params.cantonArea = '441881'
        this.breadcrumbAreaName = '英德市'
        this.isArea = true
      } else if (val == '连州市') {
        this.params.cantonArea = '441882'
        this.breadcrumbAreaName = '连州市'
        this.isArea = true
      } else if (val == '湘桥区') {
        this.params.cantonArea = '445102'
        this.breadcrumbAreaName = '湘桥区'
        this.isArea = true
      } else if (val == '潮安区') {
        this.params.cantonArea = '445103'
        this.breadcrumbAreaName = '潮安区'
        this.isArea = true
      } else if (val == '饶平县') {
        this.params.cantonArea = '445122'
        this.breadcrumbAreaName = '饶平县'
        this.isArea = true
      } else if (val == '榕城区') {
        this.params.cantonArea = '445202'
        this.breadcrumbAreaName = '榕城区'
        this.isArea = true
      } else if (val == '揭东区') {
        this.params.cantonArea = '445203'
        this.breadcrumbAreaName = '揭东区'
        this.isArea = true
      } else if (val == '揭西县') {
        this.params.cantonArea = '445222'
        this.breadcrumbAreaName = '揭西县'
        this.isArea = true
      } else if (val == '惠来县') {
        this.params.cantonArea = '445224'
        this.breadcrumbAreaName = '惠来县'
        this.isArea = true
      } else if (val == '普宁市') {
        this.params.cantonArea = '445281'
        this.breadcrumbAreaName = '普宁市'
        this.isArea = true
      } else if (val == '云城区') {
        this.params.cantonArea = '445302'
        this.breadcrumbAreaName = '云城区'
        this.isArea = true
      } else if (val == '云安区') {
        this.params.cantonArea = '445303'
        this.breadcrumbAreaName = '云安区'
        this.isArea = true
      } else if (val == '新兴县') {
        this.params.cantonArea = '445321'
        this.breadcrumbAreaName = '新兴县'
        this.isArea = true
      } else if (val == '郁南县') {
        this.params.cantonArea = '445322'
        this.breadcrumbAreaName = '郁南县'
        this.isArea = true
      } else if (val == '罗定市') {
        this.params.cantonArea = '445381'
        this.breadcrumbAreaName = '罗定市'
        this.isArea = true
      } else {
        this.params.cantonArea = ''
        this.breadcrumbAreaName = ''
        this.isArea = false
      }
    },

    'params.cantonArea': {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          this.changeMap()
          this.landUseDrawLine()
          this.forestryAreaDrawLine()
          this.seaAreaDrawLine()
          this.waterResourceDrawLine()
          this.getWaterQualityData()
          this.getLittleMTData()
          this.programmeSpaceDrawLine()
          this.landAuditDrawLine()
          this.getIdleLandData()

          this.resizeIndex = Math.round(Math.random() * 300)
        }, 0)
      }
    },
    'params.year': {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeMap()
        this.landUseDrawLine()
        this.forestryAreaDrawLine()
        this.seaAreaDrawLine()
        this.waterResourceDrawLine()
        this.getWaterQualityData()
        this.getLittleMTData()
        this.programmeSpaceDrawLine()
        this.landAuditDrawLine()
        this.getIdleLandData()

        // this.resizeIndex = Math.round(Math.random() * 300);

        if (val == this.nowYear6) {
          this.idleLandData = [
            {
              idleLandCityName: '湛江市',
              idleLandCityNumber: '6328.80',
              idleLandCityProgress: 34.02,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '清远市',
              idleLandCityNumber: '4725.15',
              idleLandCityProgress: 29.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '惠州市',
              idleLandCityNumber: '3659.10',
              idleLandCityProgress: 29.15,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '佛山市',
              idleLandCityNumber: '3502.95',
              idleLandCityProgress: 46.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '阳江市',
              idleLandCityNumber: '3197.10',
              idleLandCityProgress: 37.74,
              idleLandColor: '#335CAD'
            }
          ]
        } else if (val == this.nowYear5) {
          this.idleLandData = [
            {
              idleLandCityName: '湛江市',
              idleLandCityNumber: '6457.22',
              idleLandCityProgress: 29.02,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '清远市',
              idleLandCityNumber: '4825.35',
              idleLandCityProgress: 39.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '惠州市',
              idleLandCityNumber: '3778.42',
              idleLandCityProgress: 39.15,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '佛山市',
              idleLandCityNumber: '3720.31',
              idleLandCityProgress: 26.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '阳江市',
              idleLandCityNumber: '3428.68',
              idleLandCityProgress: 27.74,
              idleLandColor: '#335CAD'
            }
          ]
        } else if (val == this.nowYear4) {
          this.idleLandData = [
            {
              idleLandCityName: '湛江市',
              idleLandCityNumber: '6621.80',
              idleLandCityProgress: 30.02,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '清远市',
              idleLandCityNumber: '5094.75',
              idleLandCityProgress: 29.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '惠州市',
              idleLandCityNumber: '3921.33',
              idleLandCityProgress: 29.15,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '佛山市',
              idleLandCityNumber: '3845.15',
              idleLandCityProgress: 26.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '阳江市',
              idleLandCityNumber: '3642.10',
              idleLandCityProgress: 37.74,
              idleLandColor: '#335CAD'
            }
          ]
        } else if (val == this.nowYear3) {
          this.idleLandData = [
            {
              idleLandCityName: '湛江市',
              idleLandCityNumber: '7003.30',
              idleLandCityProgress: 32.02,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '清远市',
              idleLandCityNumber: '5422.65',
              idleLandCityProgress: 25.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '惠州市',
              idleLandCityNumber: '4528.48',
              idleLandCityProgress: 32.15,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '佛山市',
              idleLandCityNumber: '4227.30',
              idleLandCityProgress: 38.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '阳江市',
              idleLandCityNumber: '4390.40',
              idleLandCityProgress: 30.74,
              idleLandColor: '#335CAD'
            }
          ]
        } else if (val == this.nowYear2) {
          this.idleLandData = [
            {
              idleLandCityName: '湛江市',
              idleLandCityNumber: '7198.38',
              idleLandCityProgress: 30.02,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '清远市',
              idleLandCityNumber: '6348.25',
              idleLandCityProgress: 30.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '惠州市',
              idleLandCityNumber: '4824.70',
              idleLandCityProgress: 25.15,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '佛山市',
              idleLandCityNumber: '4711.05',
              idleLandCityProgress: 36.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '阳江市',
              idleLandCityNumber: '4701.10',
              idleLandCityProgress: 34.74,
              idleLandColor: '#335CAD'
            }
          ]
        } else if (val == this.nowYear1) {
          this.idleLandData = [
            {
              idleLandCityName: '湛江市',
              idleLandCityNumber: '7432.80',
              idleLandCityProgress: 40.02,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '清远市',
              idleLandCityNumber: '6610.95',
              idleLandCityProgress: 35.83,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '阳江市',
              idleLandCityNumber: '5788.34',
              idleLandCityProgress: 30.15,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '佛山市',
              idleLandCityNumber: '5521.28',
              idleLandCityProgress: 32.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '惠州市',
              idleLandCityNumber: '4922.40',
              idleLandCityProgress: 32.74,
              idleLandColor: '#335CAD'
            }
          ]
        } else if (val == this.nowYear0) {
          this.idleLandData = [
            {
              idleLandCityName: '湛江市',
              idleLandCityNumber: '8832.15',
              idleLandCityProgress: 43.05,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '清远市',
              idleLandCityNumber: '6734.78',
              idleLandCityProgress: 39.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '阳江市',
              idleLandCityNumber: '6646.50',
              idleLandCityProgress: 38.15,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '佛山市',
              idleLandCityNumber: '5926.15',
              idleLandCityProgress: 36.31,
              idleLandColor: '#335CAD'
            },
            {
              idleLandCityName: '惠州市',
              idleLandCityNumber: '5396.32',
              idleLandCityProgress: 29.74,
              idleLandColor: '#335CAD'
            }
          ]
        }
      }
    },
    'params.type': {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeMap()
      }
    },
    isCity (val) {
      if (val == false) {
        this.changeMap()
        this.landUseDrawLine()
        this.getLittleMTData()
      }
    },
    chartScreen: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeMap()
        this.landUseDrawLine()
        this.forestryAreaDrawLine()
        this.seaAreaDrawLine()
        this.waterResourceDrawLine()
        this.getWaterQualityData()
        this.getLittleMTData()
        this.programmeSpaceDrawLine()
        this.landAuditDrawLine()
        this.getIdleLandData()
      }
    },
    nowIndex: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val === 0) {
          this.resizeIndex = 0
        } else {
          this.resizeIndex = Math.round(Math.random() * 300)
        }
      }
    },
    isShowMenu: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.changeMap()
            this.landUseDrawLine()
            this.forestryAreaDrawLine()
            this.seaAreaDrawLine()
            this.waterResourceDrawLine()
            this.getWaterQualityData()
            this.getLittleMTData()
            this.programmeSpaceDrawLine()
            this.landAuditDrawLine()
            this.getIdleLandData()
          }, 0)
        })
      }
    }
  }
}
</script>
<style scoped>
.page-body {
  padding: 0 15px 15px;
  background-color: #f7f7f7;
  height: 100%;
}
.page-body__custom {
  padding: 0 15px 15px;
  height: 100%;
  background-image: url("../../../../assets/images/jcpgyj/mapH.png");
  background-size: 1920px 1080px;
}
#page-body-chart {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#page-body-chart__custom {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chart-header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.chart-header__custom {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("../../../../assets/images/jcpgyj/mapTH.png") no-repeat center -20px;
  margin-bottom: 15px;
}
.chart-header-title {
  font-size: 16px;
  line-height: 50px;
  font-weight: bolder;
  color: #000;
}
.chart-header-title__custom {
  font-size: 20px;
  line-height: 26px;
  color: #ffffff;
}
.chart-header-time {
  position: absolute;
  right: 50px;
}
.chart-header-time__custom {
  color: #fff;
}
.chart-header-timeIcon {
  width: 5px;
  height: 5px;
  display: inline-block;
  background-color: #5290f2;
  margin-right: 10px;
  border-radius: 5px;
  margin-bottom: 3px;
}
.chart-header-timeIcon__custom {
  width: 5px;
  height: 5px;
  display: inline-block;
  background-color: #01ff25;
  margin-right: 10px;
  border-radius: 5px;
  margin-bottom: 3px;
}
.chart-header-screenIcon {
  width: 42px;
  height: 42px;
  display: inline-block;
  border-radius: 42px;
  position: absolute;
  top: 4px;
  right: 0;
  cursor: pointer;
}
.chart-header-screenIcon__custom {
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 30px;
  position: absolute;
  top: 50px;
  right: 0;
  cursor: pointer;
}
.chart-content-wrap {
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
  background-color: #f7f7f7;
}
.chart-content-wrap__custom {
  display: flex;
  width: 100%;
  height: calc(100% - 70px);
  overflow: hidden;
}
.chart-content-wrapLeft {
  box-sizing: border-box;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-content-wrapLeft__custom {
  box-sizing: border-box;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.wrap-left-top {
  width: 100%;
  height: 70%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.wrap-left-top__custom {
  width: 100%;
  height: 70%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.warp-left-top-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
.warp-left-top-message__custom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: #fff;
}
.warp-left-top-message span {
  font-size: 18px;
  color: #ffd712;
  font-weight: bolder;
}
.warp-left-top-message__custom span {
  font-size: 18px;
  color: #2fb8d7;
  font-weight: bolder;
}
.wrap-left-top-chart {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
}
.wrap-left-bottom {
  width: 100%;
  height: 30%;
  background-color: #fff;
  margin-top: 15px;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.wrap-left-bottom__custom {
  width: 100%;
  height: 30%;
  margin-top: 15px;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.wrap-left-bottom-table {
  width: 100%;
  flex: 1;
  padding: 10px;
  background-color: #fff;
}
.wrap-left-bottom-table__custom {
  width: 100%;
  flex: 1;
  padding: 10px;
}

.chart-content-wrapMiddle {
  box-sizing: border-box;
  width: 50%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-content-wrapMiddle__custom {
  box-sizing: border-box;
  width: 50%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.wrap-middle-top {
  width: 100%;
  height: 70px;
  margin-bottom: 15px;
}
.wrap-middle-top__custom {
  width: 100%;
  height: 70px;
  margin-bottom: 15px;
}
.wrap-middle-top-message {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
.message-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  padding: 10px 0;
  height: 70px;
  box-sizing: border-box;
  width: 19%;
  margin-right: 1.25%;
  cursor: pointer;
  background-color: #fff;
}
.message-box__custom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #1c3f86;
  border-radius: 5px;
  padding: 10px;
  height: 70px;
  box-sizing: border-box;
  width: 19%;
  margin-right: 1.25%;
  cursor: pointer;
  background-color: #1e2a3b;
}

.wrap-middle-top-message li.message-box:nth-child(5) {
  margin-right: 0;
}
.wrap-middle-top-message li.message-box span.message-number {
  color: #ffaf00;
}
.wrap-middle-top-message li.message-box span.message-name {
  color: #707070;
}
.wrap-middle-top-message li.message-box__custom:nth-child(5) {
  margin-right: 0;
}
.wrap-middle-top-message li.message-box__custom span.message-number {
  color: #b4bd51;
}
.wrap-middle-top-message li.message-box__custom span.message-name {
  color: #fff;
}
.message-number {
  font-size: 16px;
}
.message-name {
  font-size: 14px;
}
.wrap-middle-top .wrap-middle-top-message li.message-box01:nth-child(1) {
  background-color: #578af0;
}

.wrap-middle-top
  .wrap-middle-top-message
  li.message-box01:nth-child(1)
  .message-number {
  color: #eeff2e;
  font-size: 16px;
}
.wrap-middle-top
  .wrap-middle-top-message
  li.message-box01:nth-child(1)
  .message-name {
  color: #fff;
  font-size: 14px;
}
.wrap-middle-top .wrap-middle-top-message li.message-box02:nth-child(2) {
  background-color: #578af0;
}

.wrap-middle-top
  .wrap-middle-top-message
  li.message-box02:nth-child(2)
  .message-number {
  color: #eeff2e;
  font-size: 16px;
}
.wrap-middle-top
  .wrap-middle-top-message
  li.message-box02:nth-child(2)
  .message-name {
  color: #fff;
  font-size: 14px;
}
.wrap-middle-top .wrap-middle-top-message li.message-box03:nth-child(3) {
  background-color: #578af0;
}

.wrap-middle-top
  .wrap-middle-top-message
  li.message-box03:nth-child(3)
  .message-number {
  color: #eeff2e;
  font-size: 16px;
}
.wrap-middle-top
  .wrap-middle-top-message
  li.message-box03:nth-child(3)
  .message-name {
  color: #fff;
  font-size: 14px;
}
.wrap-middle-top .wrap-middle-top-message li.message-box04:nth-child(4) {
  background-color: #578af0;
}

.wrap-middle-top
  .wrap-middle-top-message
  li.message-box04:nth-child(4)
  .message-number {
  color: #eeff2e;
  font-size: 16px;
}
.wrap-middle-top
  .wrap-middle-top-message
  li.message-box04:nth-child(4)
  .message-name {
  color: #fff;
  font-size: 14px;
}
.wrap-middle-top .wrap-middle-top-message li.message-box05:nth-child(5) {
  background-color: #578af0;
}

.wrap-middle-top
  .wrap-middle-top-message
  li.message-box05:nth-child(5)
  .message-number {
  color: #eeff2e;
  font-size: 16px;
}
.wrap-middle-top
  .wrap-middle-top-message
  li.message-box05:nth-child(5)
  .message-name {
  color: #fff;
  font-size: 14px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box01:nth-child(1) {
  background: linear-gradient(
    180deg,
    rgba(56, 108, 236, 1) 0%,
    rgba(5, 51, 128, 1) 100%
  );
}

.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box01:nth-child(1)
  .message-number {
  color: #b4bd51;
  font-size: 16px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box01:nth-child(1)
  .message-name {
  color: #fff;
  font-size: 14px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box02:nth-child(2) {
  background: linear-gradient(
    180deg,
    rgba(56, 108, 236, 1) 0%,
    rgba(5, 51, 128, 1) 100%
  );
}

.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box02:nth-child(2)
  .message-number {
  color: #b4bd51;
  font-size: 16px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box02:nth-child(2)
  .message-name {
  color: #fff;
  font-size: 14px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box03:nth-child(3) {
  background: linear-gradient(
    180deg,
    rgba(56, 108, 236, 1) 0%,
    rgba(5, 51, 128, 1) 100%
  );
}

.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box03:nth-child(3)
  .message-number {
  color: #b4bd51;
  font-size: 16px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box03:nth-child(3)
  .message-name {
  color: #fff;
  font-size: 14px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box04:nth-child(4) {
  background: linear-gradient(
    180deg,
    rgba(56, 108, 236, 1) 0%,
    rgba(5, 51, 128, 1) 100%
  );
}

.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box04:nth-child(4)
  .message-number {
  color: #b4bd51;
  font-size: 16px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box04:nth-child(4)
  .message-name {
  color: #fff;
  font-size: 14px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box05:nth-child(5) {
  background: linear-gradient(
    180deg,
    rgba(56, 108, 236, 1) 0%,
    rgba(5, 51, 128, 1) 100%
  );
}

.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box05:nth-child(5)
  .message-number {
  color: #b4bd51;
  font-size: 16px;
}
.wrap-middle-top__custom
  .wrap-middle-top-message
  li.message-box05:nth-child(5)
  .message-name {
  color: #fff;
  font-size: 14px;
}

.wrap-middle-middle {
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
}
.wrap-middle-middle__custom {
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  background: url("../../../../assets/images/jcpgyj/kuang.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
}
.chart-bread-name {
  height: 15px;
  position: absolute;
  top: 0px;
  left: 15px;
  z-index: 55;
}
.chart-bread-name img {
  width: 18px;
  height: 20px;
  margin-top: 10px;
}
.middle-middle-message-box {
  width: 16px;
  height: 192px;
  position: absolute;
  bottom: 20px;
  right: 0;
  z-index: 66;
}
.middle-middle-message-box__custom {
  width: 20px;
  height: 223px;
  position: absolute;
  bottom: 20px;
  right: 5px;
  z-index: 66;
}
.middle-middle-message-boxL {
  background-image: url("../../../../assets/images/jcpgyj/map00L.png");
}
.middle-middle-message-boxL__custom {
  background-image: url("../../../../assets/images/jcpgyj/map00LH.png");
}
.middle-middle-message-boxR {
  background-image: url("../../../../assets/images/jcpgyj/map00R.png");
}
.middle-middle-message-boxR__custom {
  background-image: url("../../../../assets/images/jcpgyj/map00RH.png");
}
.middle-middle-message-top {
  width: 274px;
  height: 60px;
  position: absolute;
  background-image: url("../../../../assets/images/jcpgyj/map01.png");
  bottom: 145px;
  right: 15px;
  z-index: 55;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
}
.middle-middle-message-top__custom {
  width: 311px;
  height: 63px;
  position: absolute;
  background-image: url("../../../../assets/images/jcpgyj/map01H.png");
  bottom: 145px;
  right: 15px;
  z-index: 55;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
}
.middle-middle-message-name {
  width: 150px;
  height: 30px;
  color: #303030;
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}
.middle-middle-message-name__custom {
  width: 150px;
  height: 30px;
  color: #fff;
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}
.middle-middle-message-number {
  width: 150px;
  height: 30px;
  color: #ff9601;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}
.middle-middle-message-number__custom {
  width: 150px;
  height: 30px;
  color: #ff9601;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}
.middle-middle-message-middle {
  width: 264px;
  height: 60px;
  position: absolute;
  background-image: url("../../../../assets/images/jcpgyj/map02.png");
  bottom: 85px;
  right: 25px;
  z-index: 55;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
}
.middle-middle-message-middle__custom {
  width: 300px;
  height: 63px;
  position: absolute;
  background-image: url("../../../../assets/images/jcpgyj/map02H.png");
  bottom: 85px;
  right: 25px;
  z-index: 55;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
}
.middle-middle-message-bottom {
  width: 274px;
  height: 60px;
  position: absolute;
  background-image: url("../../../../assets/images/jcpgyj/map03.png");
  bottom: 25px;
  right: 15px;
  z-index: 55;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
}
.middle-middle-message-bottom__custom {
  width: 311px;
  height: 63px;
  position: absolute;
  background-image: url("../../../../assets/images/jcpgyj/map03H.png");
  bottom: 25px;
  right: 15px;
  z-index: 55;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
}
.left-enter,
.left-leave-to {
  transform: translateX(100%);
}
.left-leave,
.left-enter-to {
  transform: translateX(0);
}
.left-enter-active,
.left-leave-active {
  transition: all 0.5s;
}
.wrap-middle-bottom {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-middle-bottom__custom {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrap-middle-bottom-timeLine {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timeLine-box {
  width: 15%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}
.timeLine-shape {
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.timeLine-box01:nth-child(1)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.timeLine-box02:nth-child(2)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.timeLine-box03:nth-child(3)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.timeLine-box04:nth-child(4)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.timeLine-box05:nth-child(5)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.timeLine-box06:nth-child(6)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.timeLine-box07:nth-child(7)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom__custom
  .wrap-middle-bottom-timeLine
  li.timeLine-box01:nth-child(1)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom__custom
  .wrap-middle-bottom-timeLine
  li.timeLine-box02:nth-child(2)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom__custom
  .wrap-middle-bottom-timeLine
  li.timeLine-box03:nth-child(3)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom__custom
  .wrap-middle-bottom-timeLine
  li.timeLine-box04:nth-child(4)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom__custom
  .wrap-middle-bottom-timeLine
  li.timeLine-box05:nth-child(5)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom__custom
  .wrap-middle-bottom-timeLine
  li.timeLine-box06:nth-child(6)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom__custom
  .wrap-middle-bottom-timeLine
  li.timeLine-box07:nth-child(7)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.timeLine-shape-circle {
  width: 10px;
  height: 10px;
  border: 1px solid #666;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
}
.timeLine-shape-line {
  width: 100%;
  height: 5px;
  background-color: #dbdbdb;
}
.timeLine-shape-line__custom {
  width: 100%;
  height: 5px;
  background-color: #00387a;
}
.timeLine-year {
  position: absolute;
  top: 0;
  left: -25px;
  font-size: 12px;
}
.timeLine-year__custom {
  position: absolute;
  top: 0;
  left: -25px;
  font-size: 12px;
  color: #fff;
}
.wrap-middle-bottom-timeLine li.timeLine-box:nth-child(1) {
  margin-left: 20px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:nth-child(7) {
  width: 30px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:nth-child(7) .timeLine-shape {
  width: 30px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:nth-child(7) .timeLine-shape-line {
  width: 0;
  height: 0;
}
.wrap-middle-bottom-timeLine
  li.timeLine-box:nth-child(7)
  .timeLine-shape-line__custom {
  width: 0;
  height: 0;
}
.chart-content-wrapRight {
  box-sizing: border-box;
  width: 25%;
  /* flex: 1; */
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-content-wrapRight__custom {
  box-sizing: border-box;
  width: 25%;
  /* flex: 1; */
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.wrap-right-top {
  width: 100%;
  height: 38%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.wrap-right-top__custom {
  width: 100%;
  height: 38%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.wrap-right-middle {
  width: 100%;
  height: 24%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  margin: 15px 0;
  overflow: hidden;
  position: relative;
}
.wrap-right-middle__custom {
  width: 100%;
  height: 24%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  margin: 15px 0;
  overflow: hidden;
  position: relative;
}
.wrap-right-middle-messageBox {
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 30%;
  left: 2%;
}
.wrap-right-middle-messageBox__custom {
  width: 220px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 40%;
  left: 5%;
}
.wrap-right-middle-message {
  width: 220px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  background-color: #e8f5ff;
  margin: 5px 0;
  font-size: 14px;
  border-radius: 5px;
}
.wrap-right-middle-message__custom {
  width: 220px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #273041;
  margin: 5px 0;
  font-size: 14px;
  border-radius: 5px;
  color: #fff;
}
.wrap-right-middle-message-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  border-radius: 16px;
  margin: 0 10px;
}
.wrap-right-bottom {
  width: 100%;
  height: 38%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.wrap-right-bottom__custom {
  width: 100%;
  height: 38%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.wrap-right-bottom-table {
  width: 100%;
  flex: 1;
  padding: 10px;
}
.wrap-header {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 2px solid #f6f5f8;
}
.wrap-header__custom {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}
.wrap-header-icon {
  width: 4px;
  height: 16px;
  display: block;
  margin: 0 10px;
  border-radius: 4px;
}
.wrap-header-title {
  font-size: 16px;
  color: #333;
  font-weight: 500px;
}
.wrap-header-title__custom {
  font-size: 16px;
  color: #fff;
  font-weight: 500px;
}
.wrap-header-ltStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(18, 0, 89, 1) 0%,
    rgba(0, 143, 210, 1) 61%,
    rgba(86, 187, 255, 1) 74%,
    rgba(0, 145, 211, 1) 87%,
    rgba(21, 1, 97, 1) 100%
  );
}
.wrap-header-lbStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(21, 0, 103, 1) 0%,
    rgba(0, 145, 211, 1) 14%,
    rgba(86, 187, 255, 1) 31%,
    rgba(0, 145, 211, 1) 48%,
    rgba(23, 0, 112, 1) 100%
  );
}
.wrap-header-rtStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(21, 0, 102, 1) 0%,
    rgba(0, 145, 211, 1) 43%,
    rgba(86, 187, 255, 1) 60%,
    rgba(0, 145, 211, 1) 75%,
    rgba(24, 0, 115, 1) 100%
  );
}
.wrap-header-rmStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(21, 0, 103, 1) 0%,
    rgba(0, 145, 211, 1) 14%,
    rgba(86, 187, 255, 1) 31%,
    rgba(0, 145, 211, 1) 49%,
    rgba(20, 0, 96, 1) 100%
  );
}
.wrap-header-rbStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(20, 0, 97, 1) 0%,
    rgba(0, 145, 211, 1) 56%,
    rgba(86, 187, 255, 1) 77%,
    rgba(0, 145, 211, 1) 91%,
    rgba(18, 0, 90, 1) 100%
  );
}
@media screen and (max-width: 1600px) {
  .page-body {
    padding: 0 15px 15px;
    background-color: #f7f7f7;
    width: 1846px;
    height: 821px;
    overflow: auto;
  }
  #page-body-chart {
    width: 1846px;
    height: 821px;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  /* .page-body {
    height: 2017px;
  }
  .chart-content-wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: calc(100% - 50px);
    background-color: #f7f7f7;
  }

  .chart-content-wrapLeft {
    box-sizing: border-box;
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .wrap-left-top {
    width: 50%;
    height: 100%;
    margin-right: 7.5px;
  }
  .wrap-header-ziran {
    margin-top: 2.55px;
  }
  .wrap-left-bottom {
    width: 50%;
    height: 100%;
    margin-top: 0px;
    margin-left: 7.5px;
  }
  .chart-content-wrapMiddle {
    width: 100%;
    margin-left: 0;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .wrap-middle-middle {
    width: 100%;
    height: 450px;
  }
  .chart-content-wrapRight {
    box-sizing: border-box;
    width: 100%;
    margin-left: 0px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .wrap-right-top {
    width: 100%;
    height: 400px;
  }
  .wrap-right-middle {
    width: 100%;
    height: 200px;
  }
  .wrap-right-middle-messageBox {
    width: 400px;
    left: 100px;
  }
  .wrap-right-middle-message {
    width: 400px;
  }
  .wrap-right-bottom {
    width: 100%;
    height: 300px;
  } */
}
</style>
<style>
#page-body-chart .el-input__inner {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
}
#page-body-chart .el-icon-arrow-up:before {
  color: #fff;
}
/* #page-body-chart .el-progress__text {
  display: none!important;
  width: 0!important;
  height: 0!important;
  overflow: hidden!important;
}
#page-body-chart__custom .el-progress__text {
  display: none!important;
  width: 0!important;
  height: 0!important;
  overflow: hidden!important;
} */
#table-progress .el-progress__text {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
}
#table-progress__custom .el-progress__text {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
}
</style>
