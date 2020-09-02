<template>
  <div style="height: 100%;position: relative;overflow-y: auto;
    overflow-x: hidden;box-shadow: rgba(237, 237, 237, 0.5) 1px 2px 5px 2px, rgba(171, 171, 171, 0.5) 3px 0px 3px -2px;z-index: 999;"
       class="hiddenScroll">
    <!-- <div><img src="../images/隐藏侧面板.png" alt="" style="position: absolute;
    bottom: 95%;
    left: 21%;cursor:pointer;" @click="handleHidden" v-show="ifClickHidden"></div>
    <div><img src="../images/展开侧面板.png" alt="" style="position: absolute;
    bottom: 95%;
    left: 0;cursor:pointer;" @click="handleHidden" v-show="!ifClickHidden"></div>-->

    <!-- <div @click="handleHidden"
             class="middle-middle-message-box"
             :class="{
            'middle-middle-message-boxR': ifClickHidden,
            'middle-middle-message-boxL': !ifClickHidden
    }"></div>-->
    <transition name="left">
      <div class="epf-table detailList"
           v-if="show1"
           v-show="ifClickHidden">
        <div class="topTitle">{{ this.pageTitle }}</div>
        <div style="padding: 10px;padding-left: 6%;"
             v-show="pageTitle === '城镇开发边界内住宅用地占比'"
             class="standardStyle">
          标准值说明：城镇开发边界内居住用地比例在
          <span style="color:#70b603;">25%~40%</span>为宜居城市比例；
        </div>
        <div class="standardStyle"
             v-show="pageTitle === '人均住宅用地面积（平方米/人）'">
          标准值说明：人均城镇住宅用地面积在
          <span style="color:#70b603;">25%~38%</span>属于正常范围
        </div>
        <div class="standardStyle"
             v-show="pageTitle === '公园绿地占比'">
          标准值说明：城镇用地面积内公园绿地比例在
          <span style="color:#70b603;">10%~15%</span>为宜居城市比例
        </div>
        <div class="standardStyle"
             v-show="pageTitle === '人均公园绿地面积（平方米/人）'">
          标准值说明：人均公园绿地面积在
          <span style="color:#70b603;">8平方米/每人</span>属于正常范围，低于
          <span style="color:#f59a23;">8平方米/每人</span>
        </div>
        <div class="standardStyle"
             v-show="pageTitle === '公共服务用地面积占比'">标准值说明：公共服务设施占城镇用地面积比例</div>
        <div class="standardStyle"
             v-show="pageTitle === '人均公共服务用地面积（平方米/人）'">
          标准值说明：人均公共服务面积在
          <span style="color:#70b603;">5.5平方米/每人</span>属于正常范围
        </div>
        <div>
          <!-- <epf-title title="广东省概况" style="margin:0;"></epf-title> -->
          <!-- <div style="font-size:18px;
font-family:MicrosoftYaHeiSemibold;
color:rgba(80,80,80,1);padding-left: 3%;
          line-height:24px;">广东省概况</div>-->
          <epf-title title="广东省概况"
                     style="font-size: 18px;
    margin: 1px 0px 1px 10px;
    color: #505050;"></epf-title>
          <div v-show="pageTitle === '城镇开发边界内住宅用地占比'">
            <div class="dabiao">
              <span>住宅用地比例</span>
              <span style="color: #525252;font-weight:bold;">{{ this.getChild.persent1 }}</span>
            </div>
          </div>
          <div v-show="pageTitle === '人均住宅用地面积（平方米/人）'">
            <div class="dabiao">
              <span>人均住宅用地面积</span>
              <span style="color: #525252;font-weight:bold;">{{ this.getChild.persent2 }}㎡/人</span>
            </div>
          </div>
          <div v-show="pageTitle === '公共服务用地面积占比'">
            <div class="dabiao">
              <span>公共服务用地面积占比</span>
              <span style="color: #525252;font-weight:bold;">{{ this.getChild.persent5 }}</span>
            </div>
          </div>
          <div v-show="pageTitle === '人均公共服务用地面积（平方米/人）'">
            <div class="dabiao">
              <span>人均公共服务用地面积</span>
              <span style="color: #525252;font-weight:bold;">{{ this.getChild.persent6 }}㎡/人</span>
            </div>
          </div>
          <div v-show="pageTitle === '公园绿地占比'">
            <div class="dabiao">
              <span>公园绿地比例</span>
              <span style="color: #525252;font-weight:bold;">{{ this.getChild.persent3 }}%</span>
            </div>
          </div>
          <div v-show="pageTitle === '人均公园绿地面积（平方米/人）'">
            <div class="dabiao">
              <span>人均公园绿地面积</span>
              <span style="color: #f59A23;font-weight:bold;">{{ this.getChild.persent4 }}㎡/人</span>
            </div>
          </div>
          <div class="dabiao">
            <span>不达标城市（个数）</span>
            <span style="color: #f59A23;font-weight:bold;">{{this.underStandard}}</span>
          </div>
          <div class="dabiao">
            <span>达标城市（个数）</span>
            <span style="color:#70b603;">{{this.notReach}}</span>
          </div>
        </div>
        <!-- <div id="change" ref="change" class="echart"></div> -->
        <div style="height: 10%;z-index: 99;">
          <div style="display: flex;
    justify-content: space-between;align-items: center;margin-bottom: 5px;">
            <epf-title title="地市详情"
                       style="font-size: 18px;
    margin: 1px 0px 1px 10px;
    color: #505050;"></epf-title>
          </div>
          <div style="display:flex;justify-content: space-between;align-items: center;">
            <div style="padding: 10px;flex:1;">
              <span v-show="pageTitle === '城镇开发边界内住宅用地占比'">住宅用地比例</span>
              <span v-show="pageTitle === '人均住宅用地面积（平方米/人）'">人均住宅用地面积</span>
              <span v-show="pageTitle === '公共服务用地面积占比'">公共服务用地比例</span>
              <span v-show="pageTitle === '人均公共服务用地面积（平方米/人）'">人均公共服务用地面积</span>
              <span v-show="pageTitle === '公园绿地占比'">公园绿地占比</span>
              <span v-show="pageTitle === '人均公园绿地面积（平方米/人）'">人均公园绿地面积</span>
            </div>
            <div style="display: flex;justify-content: flex-end;padding-right: 3%;width:100px;min-width:100px;max-width:100px;">
              <el-select v-model="yearVal"
                         placeholder="请选择年份"
                         size="mini"
                         @change="yearNameSelect()">
                <el-option v-for="item in yearInput"
                           :key="item"
                           :label="item"
                           :value="item"></el-option>
              </el-select>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between;padding: 3%;">
            <div style="color:#404040;"
                 v-if="pageTitle == '城镇开发边界内住宅用地占比' || pageTitle === '公园绿地占比' || pageTitle === '公共服务用地面积占比'">单位： %</div>
            <div style="color:#404040;"
                 v-if="pageTitle == '人均住宅用地面积（平方米/人）' || pageTitle === '人均公园绿地面积（平方米/人）' || pageTitle === '人均公共服务用地面积（平方米/人）'">单位： ㎡/人</div>
            <div style="color:#404040;">
              <span style="cursor: pointer;"
                    @click="daoXu">正序</span>
              <i class="zheng-icon"></i>
              <span style="cursor: pointer;"
                    @click="zhengXu">倒序</span>
              <i class="dao-icon"></i>
              <span @click="toDetail"
                    style="cursor:pointer;">详情</span>
            </div>
          </div>
        </div>
        <div style="height: 85%;margin-top: 5%;">
          <div id="secondChart"
               ref="secondChart"></div>
        </div>
      </div>
    </transition>
    <transition name="left">
      <div class="epf-table detailList"
           v-if="show2"
           v-show="ifClickHidden">
        <div class="topTitle">{{ this.pageTitle }}</div>
        <!-- <div class="header" style="padding-left: 6%;
    display: flex;
        align-items: center;">-->
        <epf-title :title="this.mapCity + '概况'"
                   style="font-size: 18px;
    margin-left: 3%;
    color: #505050;"></epf-title>
        <!-- <div class="one-header__left">
          <span>{{this.mapCity}}</span><span>概况</span>
        </div>-->
        <!-- </div> -->
        <div v-show="show5">
          <div v-show="pageTitle === '城镇开发边界内住宅用地占比'">
            <div class="dabiao">
              <span>住宅用地比例</span>
              <span style="color: #f59A23;font-weight:bold;">{{ this.scaleCalc }}</span>
            </div>
            <div class="dabiao">
              <span style="color:#7f7f7f;">正常范围参考值</span>
              <span style="color:#70b603;">25%~40%</span>
            </div>
          </div>
          <div v-show="pageTitle === '人均住宅用地面积（平方米/人）'">
            <div class="dabiao">
              <span>人均住宅用地面积</span>
              <span style="color: #f59A23;font-weight:bold;">{{ this.scaleCalc }}</span>
            </div>
            <div class="dabiao">
              <span style="color:#7f7f7f;">正常范围参考值</span>
              <span style="color:#70b603;">25m²~38m²</span>
            </div>
          </div>
          <div v-show="pageTitle === '公共服务用地面积占比'">
            <div class="dabiao">
              <span>公共服务用地面积占比</span>
              <span style="color: #f59A23;font-weight:bold;">{{ this.scaleCalc }}</span>
            </div>
            <div class="dabiao">
              <span style="color:#7f7f7f;">广东省地市排名</span>
              <span style="color:#70b603;">{{ this.order }}</span>
            </div>
          </div>
          <div v-show="pageTitle === '人均公共服务用地面积（平方米/人）'">
            <div class="dabiao">
              <span>人均公共服务用地面积</span>
              <span style="color: #f59A23;font-weight:bold;">{{ this.scaleCalc }}</span>
            </div>
            <div class="dabiao">
              <span style="color:#7f7f7f;">正常范围参考值</span>
              <span style="color:#70b603;">25m²~38m²</span>
            </div>
          </div>
          <div v-show="pageTitle === '公园绿地占比'">
            <div class="dabiao">
              <span>公园绿地比例</span>
              <span style="color: #f59A23;font-weight:bold;">{{ this.scaleCalc }}</span>
            </div>
            <div class="dabiao">
              <span style="color:#7f7f7f;">正常范围参考值</span>
              <span style="color:#70b603;">20%~40%</span>
            </div>
          </div>
          <div v-show="pageTitle === '人均公园绿地面积（平方米/人）'">
            <div class="dabiao">
              <span>人均公园绿地面积</span>
              <span style="color: #f59A23;font-weight:bold;">{{ this.scaleCalc }}</span>
            </div>
            <div class="dabiao">
              <span style="color:#7f7f7f;">正常范围参考值</span>
              <span style="color:#70b603;">>8m²</span>
            </div>
          </div>
        </div>
        <epf-title title="地市详情"
                   style="font-size: 18px;
    margin: 1px 0px 1px 10px;
    color: #505050;"></epf-title>
        <div v-if="show6"
             style="height: 72%;padding: 10px;">
          <div class="box333">
            <div v-show="pageTitle === '城镇开发边界内住宅用地占比'">
              城镇用地面积：
              <span class="greenStyle">{{ this.ciecleNum1 }}公顷</span>
            </div>
            <div v-show="pageTitle === '人均住宅用地面积（平方米/人）'">
              城镇住宅面积:
              <span class="greenStyle">{{ this.ciecleNum1 }}公顷</span>
            </div>
            <div v-show="pageTitle === '公共服务用地面积占比'">
              城镇用地面积:
              <span class="greenStyle">{{ this.ciecleNum1 }}公顷</span>
            </div>
            <div v-show="pageTitle === '公共服务用地面积占比'">
              公共服务用地面积:
              <span class="greenStyle">{{ this.ciecleNum2 }}公顷</span>
            </div>
            <div v-show="pageTitle === '人均公共服务用地面积（平方米/人）'">
              公共服务用地:
              <span class="greenStyle">{{ this.ciecleNum1 }}公顷</span>
            </div>
            <div v-show="pageTitle === '公园绿地占比'">
              城市用地面积:
              <span class="greenStyle">{{ this.ciecleNum1 }}公顷</span>
            </div>
            <div v-show="pageTitle === '人均公园绿地面积（平方米/人）'">
              公园与绿地:
              <span class="greenStyle">{{ this.ciecleNum1 }}公顷</span>
            </div>
            <div id="circle1"></div>
          </div>
          <div class="box333"
               v-show="pageTitle === '城镇开发边界内住宅用地占比' || pageTitle === '公共服务用地面积占比' || pageTitle === '公园绿地占比'">
            <div v-show="pageTitle === '城镇开发边界内住宅用地占比'">
              城镇住宅用地：
              <span class="greenStyle">{{ this.ciecleNum2 }}公顷</span>
            </div>
            <div v-show="pageTitle === '公共服务用地面积占比'">住宅用地占比(城镇用地面积/公共服务用地)</div>
            <div v-show="pageTitle === '公园绿地占比'">
              公园与绿地
              <span class="greenStyle">{{ this.ciecleNum2 }}公顷</span>
            </div>
            <div id="circle2"></div>
          </div>
          <div class="box333"
               v-show="pageTitle === '城镇开发边界内住宅用地占比' || pageTitle === '公园绿地占比'">
            <div v-show="pageTitle === '城镇开发边界内住宅用地占比'">住宅用地占比(城镇用地面积/城镇住宅用地)</div>
            <div v-show="pageTitle === '公园绿地占比'">公园绿地占比(城镇用地面积/公园与绿地)</div>
            <div id="circle3"></div>
          </div>
          <div class="box333"
               v-show="pageTitle === '人均住宅用地面积（平方米/人）'">
            <div>
              年末常住城镇人口:
              <span class="greenStyle">{{ this.ciecleNum2 }}万人</span>
            </div>
            <div>
              =年末常住人口数量：
              <span class="greenStyle">{{ this.ciecleNum3 }}万人</span>
            </div>
            <div>x</div>
            <div>
              人口城镇化率:
              <span class="greenStyle">{{ this.ciecleNum4 }}</span>
            </div>
            <div>
              住宅用地占比:
              <span class="greenStyle">{{ this.ciecleNum5 }}</span>
            </div>
            <div>
              =城镇住宅面积：
              <span class="greenStyle">{{ this.ciecleNum6 }}公顷</span>
            </div>
            <div>
              年末常住城镇人口:
              <span class="greenStyle">{{ this.ciecleNum7 }}万人</span>
            </div>
          </div>
          <div class="box333"
               v-show="pageTitle === '人均公共服务用地面积（平方米/人）'">
            <div>
              年末常住城镇人口:
              <span class="greenStyle">{{ this.ciecleNum2 }}万人</span>
            </div>
            <div>
              =年末常住人口数量：
              <span class="greenStyle">{{ this.ciecleNum3 }}万人</span>
            </div>
            <div>x</div>
            <div>
              人口城镇化率:
              <span class="greenStyle">{{ this.ciecleNum4 }}</span>
            </div>
            <div>
              人均公共服务用地面积:
              <span class="greenStyle">{{ this.ciecleNum5 }}公顷</span>
            </div>
            <div>
              =公共服务用地：
              <span class="greenStyle">{{ this.ciecleNum6 }}公顷</span>
            </div>
            <div>➗</div>
            <div>
              年末常住城镇人口:
              <span class="greenStyle">{{ this.ciecleNum7 }}万人</span>
            </div>
          </div>
          <div class="box333"
               v-show="pageTitle === '人均公园绿地面积（平方米/人）'">
            <div>
              年末常住城镇人口:
              <span class="greenStyle">{{ this.ciecleNum2 }}万人</span>
            </div>
            <div>
              =年末常住人口数量：
              <span class="greenStyle">{{ this.ciecleNum3 }}万人</span>
            </div>
            <div>x</div>
            <div>
              人口城镇化率:
              <span class="greenStyle">{{ this.ciecleNum4 }}</span>
            </div>
            <div>
              人均公园绿地面积:
              <span class="greenStyle">{{ this.ciecleNum5 }}公顷</span>
            </div>
            <div>
              =公园与绿地：
              <span class="greenStyle">{{ this.ciecleNum6 }}公顷</span>
            </div>
            <div>➗</div>
            <div>
              年末常住城镇人口:
              <span class="greenStyle">{{ this.ciecleNum7 }}万人</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import map from './map'
import echarts from 'echarts'
export default {
  props: {
    rightItemMessageTitleData: {
      type: String
    },
    upCity: {
      type: String
    },
    upList: {
      type: String
    },
    downCity: {
      type: String
    },
    downList: {
      type: String
    },
    getChild: {
      type: String
    }
  },
  mixins: [map],
  data () {
    return {
      serverOrder: [],
      yearVal: '2019',
      yearInput: ['2019', '2018', '2017'],
      ifClickHidden: true,
      citySpe: [],
      listSpe: [],
      sortType: '',
      standardGap: 20,
      scaleCalc: '',
      scaleCalc2: '',
      data1: [],
      data1Legend: [],
      data2: [],
      data2Legend: [],
      data3: [],
      data3Legend: [],
      ciecleNum1: '',
      ciecleNum2: '',
      ciecleNum3: '',
      ciecleNum4: '',
      ciecleNum5: '',
      ciecleNum6: '',
      ciecleNum7: '',
      cityCode: '',
      getChild: {},
      underStandard: '',
      notReach: '',
      pageTitle: '',
      mapCity: '',
      under: [],
      reach: [],
      show1: true,
      show2: false,
      mapMode: true,
      tableMode: false,
      indexValue: [],
      growRate: [],
      year: '',
      planYear: '',
      planValueDouble: '',
      manLandType: 'BOUNDARY_RATIO',
      leftCurrent: 0,
      isShowBottom: true,
      state: true,
      show3: true,
      // show4: true,
      show5: true,
      show6: true,
      barChartY: [],
      barChartX: [],
      t1: '',
      t2: '',
      t3: '',
      t4: '',
      t5: '',
      t6: '',
      clickBox: []
    }
  },
  methods: {
    initEchart () {
      window.addEventListener('resize', () => {
        let secondChart = echarts.init(document.getElementById('secondChart'))
        document.getElementById('secondChart').style.width = 363 + 'px'
        document.getElementById('secondChart').style.height = 700 + 'px'
        secondChart.resize()
      })
    },
    yearNameSelect () {
      this.$emit('detailYear', this.yearVal)
      this.getSpe()
      this.getStandard()
      // let secondChart = echarts.init(
      //   document.getElementById("secondChart")
      // )
      // secondChart.dispose()
      // this.f()
    },
    handleHidden () {
      this.ifClickHidden = !this.ifClickHidden
    },
    getSpe () {
      if (this.pageTitle == '城镇开发边界内住宅用地占比') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/boundaryRatioListAndSum?province=440000&city=&area&unit=&year=${this.yearVal}&areaType=3&sortType=${this.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.$bus.$emit('refresh-data', res.result)
              if (res.result) {
                this.citySpe = []
                this.listSpe = []
                res.result.forEach(item => {
                  this.citySpe.push(item.dictTranslate.cityName)
                  this.listSpe.push(item.scaleCalc.toFixed(2))
                })
              }
            }
          })
      } else if (this.pageTitle == '人均住宅用地面积（平方米/人）') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/residentialAreaPerCapitaListAndSum?province=440000&city=&area&unit=&year=${this.yearVal}&areaType=3&sortType=${this.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.$bus.$emit('refresh-data', res.result)
              if (res.result) {
                this.citySpe = []
                this.listSpe = []
                this.xyData = {}
                res.result.forEach(item => {
                  this.citySpe.push(item.dictTranslate.cityName)
                  this.listSpe.push(item.areaPerCapitaCalc.toFixed(2))
                })
              }
            }
          })
      } else if (this.pageTitle == '公园绿地占比') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/proportionOfGreenListAndSum?province=440000&city=&area&unit=&year=${this.yearVal}&areaType=3&sortType=${this.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.$bus.$emit('refresh-data', res.result)
              if (res.result) {
                this.citySpe = []
                this.listSpe = []
                res.result.forEach(item => {
                  this.citySpe.push(item.dictTranslate.cityName)
                  this.listSpe.push(item.proportionOfParkGreenClac.toFixed(2))
                })
              }
            }
          })
      } else if (this.pageTitle == '人均公园绿地面积（平方米/人）') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/parkGreenAreaPerCapitaListAndSum?province=440000&city=&area&unit=&year=${this.yearVal}&areaType=3&sortType=${this.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.$bus.$emit('refresh-data', res.result)
              if (res.result) {
                this.citySpe = []
                this.listSpe = []
                res.result.forEach(item => {
                  this.citySpe.push(item.dictTranslate.cityName)
                  this.listSpe.push(item.areaPerCapita.toFixed(2))
                })
              }
            }
          })
      } else if (this.pageTitle == '公共服务用地面积占比') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/publicServiceAreaRatioListAndSum?province=440000&city=&area&unit=&year=${this.yearVal}&areaType=3&sortType=${this.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.$bus.$emit('refresh-data', res.result)
              if (res.result) {
                this.citySpe = []
                this.listSpe = []
                this.serverOrder = []
                res.result.forEach(item => {
                  this.citySpe.push(item.dictTranslate.cityName)
                  this.listSpe.push(item.scale.toFixed(2))
                  this.serverOrder.push({
                    city: item.dictTranslate.cityName,
                    order: item.order
                  })
                })
              }
            }
          })
        this.$bus.$on('sendSelectedCityInfo', res => {
          // dosomething
          if (res) {
            this.mapCity = res.zhCn
            this.serverOrder.forEach(item1 => {
              if (item1.city == this.mapCity) {
                this.order = item1.order
              }
            })
          }
        })
      } else if (this.pageTitle == '人均公共服务用地面积（平方米/人）') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/perCapitaPublicServiceAreaAndSum?province=440000&city=&area&unit=&year=${this.yearVal}&areaType=3&sortType=${this.sortType}`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.$bus.$emit('refresh-data', res.result)
              if (res.result) {
                this.citySpe = []
                this.listSpe = []
                res.result.forEach(item => {
                  this.citySpe.push(item.dictTranslate.cityName)
                  this.listSpe.push(item.perPublicServArea.toFixed(2))
                })
              }
            }
          })
      }
      // this.getStandard()
      //   let secondChart = echarts.init(
      //   document.getElementById("secondChart")
      // )
      // secondChart.dispose()
      // this.secondDrawLine()
    },
    initCircle () {
      let circle1Chart = echarts.init(document.getElementById('circle1'))
      circle1Chart.dispose()
      this.drawCircle1()
      let circle2Chart = echarts.init(document.getElementById('circle2'))
      circle1Chart.dispose()
      this.drawCircle2()
      let circle3Chart = echarts.init(document.getElementById('circle3'))
      circle3Chart.dispose()
      this.drawCircle3()
    },
    getCity () {
      if (this.pageTitle === '城镇开发边界内住宅用地占比') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/boundaryRatioListAndSum?province=440000&city=${this.cityCode}&area&unit=&year=${this.yearVal}&areaType=3`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.$bus.$emit('refresh-data', res.result)
              this.data1 = [
                { value: res.result[0].citySiteArea, name: '城市用地面积' },
                { value: res.result[0].formedTownArea, name: '建设镇用地面积' }
              ]
              this.data2 = [
                {
                  value: res.result[0].citySiteLand,
                  name: '城镇住宅用地（城市）'
                },
                {
                  value: res.result[0].formedTownLand,
                  name: '城镇住宅用地（建设镇）'
                }
              ]
              this.data3 = [
                { value: res.result[0].urbanLandArea, name: '城镇用地面积' },
                {
                  value: res.result[0].urbanResidentialLand,
                  name: '城镇住宅用地'
                }
              ]
              this.data1Legend = ['城市用地面积', '建设镇用地面积']
              this.data2Legend = [
                '城镇住宅用地（城市）',
                '城镇住宅用地（建设镇）'
              ]
              this.data3Legend = ['城镇用地面积', '城镇住宅用地']
              // this.ciecleNum1 = res.result[0].urbanLandArea + res.result[0].unit
              // this.ciecleNum2 = res.result[0].urbanResidentialLand + res.result[0].unit
              this.ciecleNum1 = res.result[0].urbanLandArea
              this.ciecleNum2 = res.result[0].urbanResidentialLand
              this.scaleCalc = res.result[0].scaleCalc.toFixed(2) + '%'
            }
          })
      } else if (this.pageTitle === '人均住宅用地面积（平方米/人）') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/residentialAreaPerCapitaListAndSum?province=440000&city=${this.cityCode}&area&unit=&year=${this.yearVal}&areaType=3`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.data1 = [
                {
                  value: res.result[0].citySiteLand,
                  name: '城镇住宅用地（城市）'
                },
                {
                  value: res.result[0].formedTownLand,
                  name: '城镇住宅用地（建设镇）'
                }
              ]
              this.data1Legend = [
                '城镇住宅用地（城市）',
                '城镇住宅用地（建设镇）'
              ]
              // this.ciecleNum1 = res.result[0].urbanResidentialLand + res.result[0].unit
              // this.ciecleNum2 = res.result[0].permanentUrbanPopulation + res.result[0].unit
              // this.ciecleNum3 = res.result[0].permanentResident + res.result[0].unit
              this.ciecleNum1 = res.result[0].urbanResidentialLand
              this.ciecleNum2 = res.result[0].permanentUrbanPopulation
              this.ciecleNum3 = res.result[0].permanentResident
              this.ciecleNum4
                = (res.result[0].urbanizationRate * 100).toFixed(2) + '%'
              this.ciecleNum5
                = (
                  res.result[0].urbanResidentialLand
                  / res.result[0].permanentUrbanPopulation
                ).toFixed(2) + '%'
              // this.ciecleNum6 = res.result[0].urbanResidentialLand + res.result[0].unit
              // this.ciecleNum7 = res.result[0].permanentUrbanPopulation + res.result[0].unit
              this.ciecleNum6 = res.result[0].urbanResidentialLand
              this.ciecleNum7 = res.result[0].permanentUrbanPopulation
              this.scaleCalc = res.result[0].areaPerCapitaCalc.toFixed(2) + '%'
            }
          })
      } else if (this.pageTitle === '公园绿地占比') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/proportionOfGreenListAndSum?province=440000&city=${this.cityCode}&area&unit=&year=${this.yearVal}&areaType=3`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.data1 = [
                { value: res.result[0].citySiteArea, name: '城市用地面积' },
                { value: res.result[0].formedTownArea, name: '建设镇用地面积' }
              ]
              this.data2 = [
                {
                  value: res.result[0].cityParkGreen,
                  name: '公园与绿地（城市）'
                },
                {
                  value: res.result[0].formedTownParkGreen,
                  name: '公园与绿地（建设镇）'
                }
              ]
              this.data3 = [
                { value: res.result[0].urbanLandArea, name: '城镇用地面积' },
                { value: res.result[0].townParkGreen, name: '公园与绿地' }
              ]
              this.data1Legend = ['城市用地面积', '建设镇用地面积']
              this.data2Legend = ['公园与绿地（城市）', '公园与绿地（建设镇）']
              this.data3Legend = ['城镇用地面积', '公园与绿地']
              this.ciecleNum1 = res.result[0].citySiteArea
              // this.ciecleNum2 = res.result[0].townParkGreen + res.result[0].unit
              this.ciecleNum2 = res.result[0].townParkGreen
              this.scaleCalc
                = res.result[0].proportionOfParkGreenClac.toFixed(2) + '%'
            }
          })
      } else if (this.pageTitle === '人均公园绿地面积（平方米/人）') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/parkGreenAreaPerCapitaListAndSum?province=440000&city=${this.cityCode}&area&unit=&year=${this.yearVal}&areaType=3`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.data1 = [
                {
                  value: res.result[0].cityParkGreen,
                  name: '公园与绿地（城市）'
                },
                {
                  value: res.result[0].formedTownParkGreen,
                  name: '公园与绿地（建制镇）'
                }
              ]
              this.data1Legend = ['公园与绿地（城市）', '公园与绿地（建制镇）']
              // this.ciecleNum1 = res.result[0].townParkGreen + res.result[0].unit
              // this.ciecleNum2 = (res.result[0].permanentUrbanPopulation).toFixed(2) + res.result[0].unit
              // this.ciecleNum3 = res.result[0].permanentResident + res.result[0].unit
              // this.ciecleNum4 = (res.result[0].urbanizationRate*100).toFixed(2) + '%'
              // this.ciecleNum5 = (res.result[0].areaPerCapita).toFixed(2) + res.result[0].unit
              // this.ciecleNum6 = res.result[0].townParkGreen + res.result[0].unit
              // this.ciecleNum7 = (res.result[0].permanentUrbanPopulation).toFixed(2) + res.result[0].unit
              this.ciecleNum1 = res.result[0].townParkGreen
              this.ciecleNum2 = res.result[0].permanentUrbanPopulation.toFixed(
                2
              )
              this.ciecleNum3 = res.result[0].permanentResident
              this.ciecleNum4
                = (res.result[0].urbanizationRate * 100).toFixed(2) + '%'
              this.ciecleNum5 = res.result[0].areaPerCapita.toFixed(2)
              this.ciecleNum6 = res.result[0].townParkGreen
              this.ciecleNum7 = res.result[0].permanentUrbanPopulation.toFixed(
                2
              )
              this.scaleCalc = res.result[0].areaPerCapita.toFixed(2)
            }
          })
      } else if (this.pageTitle === '公共服务用地面积占比') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/publicServiceAreaRatioListAndSum?province=440000&city=${this.cityCode}&area&unit=&year=${this.yearVal}&areaType=3`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.data1 = [
                {
                  value: res.result[0].governMentArea,
                  name: '机关团体新闻出版用地'
                },
                {
                  value: res.result[0].commuFacilitiesArea,
                  name: '公用设施用地'
                }
              ]
              this.data2 = [
                { value: res.result[0].cityUseArea, name: '城镇用地面积' },
                { value: res.result[0].publicServArea, name: '公共服务用地' }
              ]
              this.data1Legend = ['机关团体新闻出版用地', '公用设施用地']
              this.data2Legend = ['城镇用地面积', '公共服务用地']
              // this.ciecleNum1 = res.result[0].cityUseArea + res.result[0].unit
              // this.ciecleNum2 = res.result[0].publicServArea + res.result[0].unit
              this.ciecleNum1 = res.result[0].cityUseArea
              this.ciecleNum2 = res.result[0].publicServArea
              this.scaleCalc = res.result[0].scale.toFixed(2) + '%'
              // this.scaleCalc2 = res.result[0].order
            }
          })
      } else if (this.pageTitle === '人均公共服务用地面积（平方米/人）') {
        this.$http
          .get(
            `/api/epf-monitor-evaluation/manlandRel/perCapitaPublicServiceAreaAndSum?province=440000&city=${this.cityCode}&area&unit=&year=${this.yearVal}&areaType=3`,
            {}
          )
          .then(res => {
            if (res.code === 0) {
              this.data1 = [
                {
                  value: res.result[0].governMentArea,
                  name: '机关团体新闻出版用地'
                },
                {
                  value: res.result[0].commuFacilitiesArea,
                  name: '公用设施用地'
                }
              ]
              this.data1Legend = ['机关团体新闻出版用地', '公用设施用地']
              // this.ciecleNum1 = res.result[0].publicServArea + res.result[0].unit
              // this.ciecleNum2 = (res.result[0].residentCityPopu).toFixed(2) + res.result[0].unit
              // this.ciecleNum3 = res.result[0].residentPopu + res.result[0].unit
              // this.ciecleNum4 = (res.result[0].urbanizationRate*100).toFixed(2) + '%'
              // this.ciecleNum5 = (res.result[0].perPublicServArea).toFixed(2) + res.result[0].unit
              // this.ciecleNum6 = res.result[0].publicServArea + res.result[0].unit
              // this.ciecleNum7 = (res.result[0].residentCityPopu).toFixed(2) + res.result[0].unit
              this.ciecleNum1 = res.result[0].publicServArea
              this.ciecleNum2 = res.result[0].residentCityPopu.toFixed(2)
              this.ciecleNum3 = res.result[0].residentPopu
              this.ciecleNum4
                = (res.result[0].urbanizationRate * 100).toFixed(2) + '%'
              this.ciecleNum5 = res.result[0].perPublicServArea.toFixed(2)
              this.ciecleNum6 = res.result[0].publicServArea
              this.ciecleNum7 = res.result[0].residentCityPopu.toFixed(2)
              this.scaleCalc = res.result[0].perPublicServArea.toFixed(2)
            }
          })
      }
      this.initCircle()
    },
    getStandard () {
      if (this.pageTitle === '城镇开发边界内住宅用地占比') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var j = 0
        for (let i in this.listSpe) {
          if (Number(this.listSpe[i]) < 25) {
            this.under[j++] = this.listSpe[i]
          }
        }
        var listLength = this.listSpe.length
        console.log(listLength)
        if (listLength == 0) {
          this.underStandard = '- -'
          this.notReach = '- -'
        } else {
          this.underStandard = this.under.length
          this.notReach = 21 - this.underStandard
        }
      } else if (this.pageTitle === '人均住宅用地面积（平方米/人）') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var a = 0
        for (let i in this.listSpe) {
          if (Number(this.listSpe[i]) < 25) {
            this.under[a++] = this.listSpe[i]
          }
        }
        var listLength = this.listSpe.length
        console.log(listLength)
        if (listLength == 0) {
          this.underStandard = '- -'
          this.notReach = '- -'
        } else {
          this.underStandard = this.under.length
          this.notReach = 21 - this.underStandard
        }
      } else if (this.pageTitle === '公园绿地占比') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var b = 0
        for (let i in this.listSpe) {
          if (Number(this.listSpe[i]) < 10) {
            this.under[b++] = this.listSpe[i]
          }
        }
        var listLength = this.listSpe.length
        console.log(listLength)
        if (listLength == 0) {
          this.underStandard = '- -'
          this.notReach = '- -'
        } else {
          this.underStandard = this.under.length
          this.notReach = 21 - this.underStandard
        }
      } else if (this.pageTitle === '人均公园绿地面积（平方米/人）') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var c = 0
        for (let i in this.listSpe) {
          if (Number(this.listSpe[i]) < 8) {
            this.under[c++] = this.listSpe[i]
          }
        }
        var listLength = this.listSpe.length
        console.log(listLength)
        if (listLength == 0) {
          this.underStandard = '- -'
          this.notReach = '- -'
        } else {
          this.underStandard = this.under.length
          this.notReach = 21 - this.underStandard
        }
      } else if (this.pageTitle === '公共服务用地面积占比') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var d = 0
        for (let i in this.listSpe) {
          if (Number(this.listSpe[i]) > 0) {
            this.under[d++] = this.listSpe[i]
          }
        }
        var listLength = this.listSpe.length
        console.log(listLength)
        if (listLength == 0) {
          this.underStandard = '- -'
          this.notReach = '- -'
        } else {
          this.underStandard = this.under.length
          this.notReach = 21 - this.underStandard
        }
      } else if (this.pageTitle === '人均公共服务用地面积（平方米/人）') {
        this.under = []
        this.underStandard = ''
        this.notReach = ''
        var e = 0
        for (let i in this.listSpe) {
          if (Number(this.listSpe[i]) < 5.5) {
            this.under[e++] = this.listSpe[i]
          }
        }
        var listLength = this.listSpe.length
        console.log(listLength)
        if (listLength == 0) {
          this.underStandard = '- -'
          this.notReach = '- -'
        } else {
          this.underStandard = this.under.length
          this.notReach = 21 - this.underStandard
        }
      }
    },
    zhengXu () {
      this.sortType = '1'
      this.getSpe()
      // let secondChart = echarts.init(
      //   document.getElementById("secondChart")
      // )
      // secondChart.dispose()
      // this.secondDrawLine()
    },
    daoXu () {
      this.sortType = '2'
      this.getSpe()
      // let secondChart = echarts.init(
      //   document.getElementById("secondChart")
      // )
      // secondChart.dispose()
      // this.secondDrawLine()
    },
    getClick () {
      this.$nextTick(() =>
        this.$bus.$on('click1', val => {
          this.t1 = val
          this.show1 = false
          this.show2 = true
        })
      )
    },
    drawCircle1 () {
      this.$nextTick(function () {
        setTimeout(() => {
          let circle1Chart = echarts.init(document.getElementById('circle1'))
          circle1Chart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              itemWidth: 5,
              orient: 'vertical',
              icon: 'circle',
              right: 2,
              data: this.data1Legend
            },
            color: ['rgba(89, 212, 211)', 'rgba(58, 161, 255)'],
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: this.data1
              }
            ]
          })
        }, 1000)
      })
    },
    drawCircle2 () {
      this.$nextTick(function () {
        setTimeout(() => {
          let circle2Chart = echarts.init(document.getElementById('circle2'))
          circle2Chart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              itemWidth: 5,
              orient: 'vertical',
              icon: 'circle',
              right: 2,
              data: this.data2Legend
            },
            color: ['rgba(89, 212, 211)', 'rgba(58, 161, 255)'],
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: this.data2
              }
            ]
          })
        }, 1000)
      })
    },
    drawCircle3 () {
      this.$nextTick(function () {
        setTimeout(() => {
          let circle3Chart = echarts.init(document.getElementById('circle3'))
          circle3Chart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              itemWidth: 5,
              orient: 'vertical',
              icon: 'circle',
              right: 2,
              data: this.data3Legend
            },
            color: ['rgba(89, 212, 211)', 'rgba(58, 161, 255)'],
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: this.data3
              }
            ]
          })
        }, 1000)
      })
    },
    toDetail () {
      this.$bus.$emit('toShowTable', false)
    },
    secondDrawLine () {
      this.$nextTick(function () {
        setTimeout(() => {
          let secondChart = echarts.init(
            document.getElementById('secondChart')
          )
          document.getElementById('secondChart').style.width = 363 + 'px'
          document.getElementById('secondChart').style.height = 700 + 'px'
          secondChart.resize() // 直接加这句即可
          let legendData = ['', '']
          let seriesAllData = []

          let colorData = ['#70b603', '#f59a23']

          seriesAllData = [this.listSpe]
          let series = []
          if (this.pageTitle == '城镇开发边界内住宅用地占比') {
            for (var i = 0; i < legendData.length; i++) {
              series.push({
                name: legendData[i],
                type: 'bar',
                barWidth: '10px',
                data: seriesAllData[i], // 数据
                itemStyle: {
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
                    }
                  }
                }
              })
            }
          } else if (this.pageTitle == '人均住宅用地面积（平方米/人）') {
            for (var i = 0; i < legendData.length; i++) {
              series.push({
                name: legendData[i],
                type: 'bar',
                barWidth: '10px',
                data: seriesAllData[i], // 数据
                itemStyle: {
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
                    }
                  }
                }
              })
            }
          } else if (this.pageTitle == '公园绿地占比') {
            for (var i = 0; i < legendData.length; i++) {
              series.push({
                name: legendData[i],
                type: 'bar',
                barWidth: '10px',
                data: seriesAllData[i], // 数据
                itemStyle: {
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
                    }
                  }
                }
              })
            }
          } else if (this.pageTitle == '人均公园绿地面积（平方米/人）') {
            for (var i = 0; i < legendData.length; i++) {
              series.push({
                name: legendData[i],
                type: 'bar',
                barWidth: '10px',
                data: seriesAllData[i], // 数据
                itemStyle: {
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
                    }
                  }
                }
              })
            }
          } else if (this.pageTitle == '公共服务用地面积占比') {
            for (var i = 0; i < legendData.length; i++) {
              series.push({
                name: legendData[i],
                type: 'bar',
                barWidth: '10px',
                data: seriesAllData[i], // 数据
                itemStyle: {
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
                    }
                  }
                }
              })
            }
          } else if (this.pageTitle == '人均公共服务用地面积（平方米/人）') {
            for (var i = 0; i < legendData.length; i++) {
              series.push({
                name: legendData[i],
                type: 'bar',
                barWidth: '10px',
                data: seriesAllData[i], // 数据
                itemStyle: {
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
                    }
                  }
                }
              })
            }
          }
          this.getStandard()
          let option = {
            title: {
              // text: "全省农村拆旧复垦指标流转情况总览",
              x: 'center',
              fontSize: '18px',
              top: '2%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: legendData[i],
              color: colorData[i],
              top: 0
            },
            grid: {
              left: '3%',
              right: '15%',
              bottom: '2',
              top: '4%',
              containLabel: true
            },
            yAxis: [
              {
                // name: '市',
                type: 'category',
                data: this.citySpe,
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                }
              }
            ],
            dataZoom: [
              {
                type: 'inside',
                show: true,
                yAxisIndex: [0],
                start: 0, // 默认为1
                end: 50
              }
            ],
            xAxis: [
              {
                name: '',
                type: 'value',
                position: 'top', // x轴固定在顶部
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
          secondChart.setOption(option, true)
        }, 1000)
      })
    },
    turnMonitorLeftFirst () {
      this.leftCurrent = 0
    },
    turnMonitorLeftSecond () {
      this.leftCurrent = 1
    },
    turnMonitorLeftThird () {
      this.leftCurrent = 2
    },
    turnMonitorLeftFourth () {
      this.leftCurrent = 3
    },
    open () {
      this.$emit('openImportant', 'important')
    }
    // getLeftTopData() {
    //   this.$http
    //     .get(
    //       `/api/epf-monitor-evaluation/manlandRel/detectionAndPlan?cantonProvince=440000&cantonCity&cantonArea&year=2019&sortType&manLandType=${this.manLandType}`,
    //       {}
    //     )
    //     .then(res => {
    //       if (res.code === 0) {
    //         this.year = res.result[0].year;
    //         this.planYear = res.result[0].planYear;
    //         this.barChartY = res.result[0].barChartY;
    //         this.planValueDouble = res.result[0].planValueDouble;
    //       } else {
    //         this.$message.error(res.msg); // 失败
    //       }
    //     });
    // }
  },
  components: {},
  watch: {
    listSpe: {
      immediate: true,
      deep: true,
      handler (val) {
        this.getStandard()
        let secondChart = echarts.init(document.getElementById('secondChart'))
        secondChart.dispose()
        this.secondDrawLine()
      }
    },
    rightItemMessageTitleData: {
      immediate: true,
      deep: true,
      handler (val) {
        this.pageTitle = val
        this.rightItemMessageTitle = '其他建设用地情况'
        if ((val = '专题总览' || '')) {
          this.ifClickHidden = true
        }
        this.getSpe()
        // let secondChart = echarts.init(
        //   document.getElementById("secondChart")
        // )
        // secondChart.dispose()
        // this.secondDrawLine()
      }
    },
    // show4(val) {
    //   this.secondDrawLine();
    // },
    data1: {
      immediate: true,
      deep: true,
      handler (val) {
        this.initCircle()
      }
    }
    // pageTitle: {
    //   immediate: true,
    //   deep: true,
    //   handler(newVal, oldVal) {
    //     this.getStandard()
    //     this.getSpe()
    //   }
    // }
  },
  mounted () {
    this.initEchart()
    this.$bus.$on('sendSelectedCityInfo', res => {
      // dosomething
      if (res) {
        this.show1 = false
        this.show2 = true
        this.mapCity = res.zhCn
        this.cityCode = res.dictKey
        this.getCity()
      }
    })
    this.getSpe()
    this.$bus.$on('showDetail', res => { })
  },
  created () { }
}
</script>

<style scoped>
@import "./index.css";
* {
  font-size: 16px;
  color: rgba(64, 64, 64, 1);
}
.left-chart-tab-tilte-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  color: #303030;
  box-sizing: border-box;
}
.left-chart-tab-tilte-box .active {
  color: #1d7ce4;
}
.fourBottom {
  height: 44px;
  line-height: 44px;
  padding-left: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.epf-table {
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  width: 363px;
  height: 823px;
  top: 0px;
  left: 0;
  position: absolute;
  box-shadow: rgba(237, 237, 237, 0.5) 1px 2px 5px 2px,
    rgba(171, 171, 171, 0.5) 3px 0px 3px -2px;
}
.header {
  height: 7%;
  padding: 0 12px;
}
.one-header__left {
  padding-top: 17px;
}
.dabiao {
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 10px;
}
#secondChart {
  height: 700px;
  width: 363px;
}
.box333 {
  background: rgba(249, 249, 249, 1);
  margin: 15px;
  margin-left: 0;
  /* padding: 10px; */
  height: 180px;
  width: 100%;
}
#circle1,
#circle2,
#circle3 {
  height: 130px;
  width: 335px;
}
.greenStyle {
  color: #36cbcb;
}
.middle-middle-message-box {
}
.middle-middle-message-boxL {
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 0;
  /* -webkit-box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1); */
  -webkit-box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: 99;
  background-image: url("../images/展开侧面板.png");
  background-size: 40px 40px;
}
.middle-middle-message-boxR {
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 363px;
  /* -webkit-box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1); */
  -webkit-box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: 99;
  background-image: url("../images/隐藏侧面板.png");
  background-size: 40px 40px;
}
.left-enter-active,
.left-leave-active {
  transition: all 0.2s ease;
  transform: translateX(0%);
}
.left-enter,
.left-leave {
  transform: translateX(-300px);
}
.left-leave-to {
  transform: translateX(-300px);
}
.biggest {
  width: 363px;
  height: 95%;
}
.topTitle {
  color: rgb(32, 32, 32);
  width: 234px;
  height: 24px;
  font-size: 18px;
  font-family: MicrosoftYaHeiSemibold;
  line-height: 24px;
  /* margin-left: 3%; */
  margin-top: 3%;
  font-weight: 600;
  z-index: 99;
  padding-left: 3%;
}
.standardStyle {
  color: #404040;
  font-size: 16px;
  padding: 3%;
  padding-left: 6%;
}
.hiddenScroll::-webkit-scrollbar {
  display: none;
}
.epf-table::-webkit-scrollbar {
  display: none;
}
.zheng-icon {
  display: inline-block;
  width: 12px;
  height: 15px;
  background-image: url("../../../../../../assets/images/jcpgyj/project/zheng.png");
  background-size: 12px 15px;
  margin: 0px 5px;
  margin-right: 15px;
}
.dao-icon {
  display: inline-block;
  width: 12px;
  height: 15px;
  background-image: url("../../../../../../assets/images/jcpgyj/project/dao.png");
  background-size: 12px 15px;
  margin: 0px 5px;
}
.wrap_table {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 33;
  /* overflow: auto; */
}
.hiddenScroll {
  overflow-x: hidden;
  width: 363px;
}
</style>
