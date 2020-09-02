<template>
  <el-container style="width:380px;height:100%;padding-left:15px;">
    <el-header class="epf-flex__align">
      <span class="project-title">城镇内部人地关系</span>
    </el-header>
    <el-main id="aside-main">
      <div class="collapse-box">
        <el-collapse @change="hidingChartPanel"
                     v-model="activeName">
          <el-collapse-item class="monitor-moudle"
                            name="1">
            <template slot="title">城镇住宅用地</template>
            <div class="monitor-list">
              <div :class="['monitor-item',{'acitvebgc':isCurrent===item.title}]"
                   v-for="(item, index) in moItems"
                   :key="index"
                   ref="item"
                   @click="goBack(item)">
                <div class="chart-header-time">
                  <i class="chart-header-timeIcon"></i>
                  {{ item.presentTime }} 更新
                </div>
                <div class="project-content">
                  <div class="moItemTitle"
                       style="display:flex;"><img :src="item.src"
                         alt="">{{item.title}}</div>
                  <div class="number-box">
                    <span class="curVal"
                          ref="curVal">{{item.curVal}}<span v-if="item.title === '人均城镇住宅用地面积'"
                            style="color: #ccc;font-size: 14px;">㎡/人</span></span>
                    <span style="padding-left: 5px;"></span>
                    <img src="./images/up.png"
                         alt=""
                         style="margin-bottom: 15px;transform: scale(1.5) rotate(180deg);">
                    <!-- <img src="./images/down.png"
                         alt=""
                         style="margin-bottom: 15px;transform: scale(0.4) rotate(180deg);"
                         v-if="item.ifNormal === '偏低'||'偏高'"> -->
                    <el-button type="success"
                               plain
                               disabled
                               size="mini">正常</el-button>
                    <!-- <el-button type="danger"
                               plain
                               disabled
                               size="mini"
                               v-if="item.ifNormal === '偏低'||'偏高'">{{ item.ifNormal }}</el-button> -->
                  </div>
                </div>
                <el-row class="block__footer"
                        style="margin-top:10px;height:40px;">
                  <el-col :span="12">
                    <div @click="handleMoItemClick(item,'1')"
                         :class="{'EFPwirte':isCurrent===item.title&&isButton==='1'}"
                         class="turn-title">详情</div>
                  </el-col>
                  <el-col :span="12">
                    <div @click="handleMoItemClick(item,'2')"
                         :class="{'EFPwirte':isCurrent===item.title&&isButton==='2'}"
                         class="turn-title">监测</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="monitor-moudle"
                            name="2">
            <template slot="title">城镇公园绿地</template>
            <div class="monitor-list">
              <div :class="['monitor-item',{'acitvebgc':isCurrent===item.title}]"
                   v-for="(item, index) in dealItems"
                   :key="index"
                   ref="item">
                <div class="chart-header-time">{{ item.presentTime }} 更新</div>
                <div class="project-content">
                  <div class="moItemTitle"
                       style="display:flex;"> <img :src="item.src"
                         alt=""> {{item.title}}</div>
                  <div class="number-box">
                    <span class="curVal"
                          ref="curVal">{{item.curVal}}<span v-if="item.title === '人均公园绿地面积'"
                            style="color: #ccc;font-size: 14px;">㎡/人</span></span>
                    <span style="padding-left: 5px;"></span>
                    <img src="./images/up.png"
                         alt=""
                         style="margin-bottom: 15px;transform: scale(1.5) rotate(180deg);"
                         v-if="item.ifNormal === '正常'">
                    <img src="./images/down.png"
                         alt=""
                         style="margin-bottom: 15px;transform: scale(0.4) rotate(180deg);"
                         v-if="item.ifNormal === '偏低'||'偏高'">
                    <el-button type="success"
                               plain
                               disabled
                               size="mini"
                               v-if="item.ifNormal === '正常'">{{ item.ifNormal }}</el-button>
                    <el-button type="danger"
                               plain
                               disabled
                               size="mini"
                               v-if="item.ifNormal === '偏低'||'偏高'">{{ item.ifNormal }}</el-button>
                  </div>
                </div>
                <el-row class="block__footer"
                        style="margin-top:10px;height:40px;position: relative;">
                  <el-col :span="12">
                    <div @click="handleMoItemClick(item,'1')"
                         :class="{'EFPwirte':isCurrent===item.title&&isButton==='1'}"
                         class="turn-title">详情</div>
                  </el-col>
                  <el-col :span="12">
                    <div @click="handleMoItemClick(item,'2')"
                         :class="{'EFPwirte':isCurrent===item.title&&isButton==='2'}"
                         class="turn-title">监测</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item class="monitor-moudle"
                            name="3">
            <template slot="title">公共服务用地</template>
            <div class="monitor-list">
              <div :class="['monitor-item',{'acitvebgc':isCurrent===item.title}]"
                   v-for="(item, index) in thirdItems"
                   :key="index"
                   ref="item">
                <div class="chart-header-time">{{ item.presentTime }} 更新</div>
                <div class="project-content">
                  <div class="moItemTitle"
                       style="display:flex;"><img :src="item.src"
                         alt="">{{item.title}}</div>
                  <div class="number-box">
                    <span class="curVal"
                          ref="curVal">{{item.curVal}}<span v-if="item.title === '人均公共服务用地面积'"
                            style="color: #ccc;font-size: 14px;">㎡/人</span></span>
                    <span style="padding-left: 5px;"></span>
                    <img src="./images/up.png"
                         alt=""
                         style="margin-bottom: 15px;transform: scale(1.5) rotate(180deg);"
                         v-if="item.ifNormal === '正常' && item.title === '人均公共服务用地面积'">
                    <img src="./images/down.png"
                         alt=""
                         style="margin-bottom: 15px;transform: scale(0.4) rotate(180deg);"
                         v-if="item.ifNormal === '偏低' && item.title === '人均公共服务用地面积'">
                    <el-button type="success"
                               plain
                               disabled
                               size="mini"
                               v-if="item.ifNormal === '正常' && item.title === '人均公共服务用地面积'">{{ item.ifNormal }}</el-button>
                    <el-button type="danger"
                               plain
                               disabled
                               size="mini"
                               v-if="item.ifNormal === '偏低' && item.title === '人均公共服务用地面积'">{{ item.ifNormal }}</el-button>
                  </div>
                </div>
                <el-row class="block__footer"
                        style="margin-top:10px;height:40px;position: relative;">
                  <el-col :span="12">
                    <div @click="handleMoItemClick(item,'1')"
                         :class="{'EFPwirte':isCurrent===item.title&&isButton==='1'}"
                         class="turn-title">详情</div>
                  </el-col>
                  <el-col :span="12">
                    <div @click="handleMoItemClick(item,'2')"
                         :class="{'EFPwirte':isCurrent===item.title&&isButton==='2'}"
                         class="turn-title">监测</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import moment from 'moment'
import echarts from 'echarts'
import Bus from '../../../../../utils/bus'
export default {
  props: {
    controlButton: {
      type: String
    }
  },
  data() {
    return {
      comlianceStr1: '',
      comlianceStr2: '',
      comlianceStr3: '',
      comlianceStr4: '',
      comlianceStr5: '',
      comlianceStr6: '',
      scaleCalc1: '',
      scaleCalc2: '',
      scaleCalc3: '',
      scaleCalc4: '',
      scaleCalc5: '',
      scaleCalc6: '',
      zuhe: [],
      changepresentTime: '',
      activeNames: [1],
      // tabs:['城镇建设','农业耕作'],
      data: [],
      zoomIn: '缩小',
      loading1: false,
      num: 0,

      isHide: true,
      childrenData: {
        content: '',
        tableData: [],
        makepeace: false,
        tableTitle: []
      },

      currentRouter: '',
      loadEndRouter: [],
      routerData: [],
      routerIndex: null,
      forward: true,
      select2: [],
      select1: [],

      locName: '广东省',
      locOpt: [],
      moUnit: '万km²',
      moItems: [
        {
          parentName: '城镇住宅用地',
          title: '城镇开发边界内住宅用地比例',
          src: require('./images/城镇开发边界内住宅用地比例.png'),
          curVal: '',
          presentTime: this.presentTime,
          ifNormal: '正常',
          upDownSrc: require('./images/up.png')
        },
        {
          parentName: '城镇住宅用地',
          title: '人均城镇住宅用地面积',
          src: require('./images/人均城镇住宅用地面积.png'),
          curVal: '',
          presentTime: this.presentTime,
          ifNormal: '正常',
          upDownSrc: require('./images/up.png')
        }
      ],
      dealItems: [
        {
          parentName: '公园绿地与广场用地',
          title: '公园绿地（广场用地）占比',
          src: require('./images/公园绿地（广场用地）占比.png'),
          curVal: 38.0464,
          presentTime: this.presentTime,
          presentTimeName: '交易时间',
          ifNormal: '正常',
          upDownSrc: require('./images/up.png')
        },
        {
          parentName: '公园绿地与广场用地',
          title: '人均公园绿地面积',
          src: require('./images/人均公园绿地面积.png'),
          curVal: 73.1346,
          presentTime: this.presentTime,
          presentTimeName: '截止时间',
          ifNormal: '正常',
          upDownSrc: require('./images/up.png')
        }
      ],
      thirdItems: [
        {
          parentName: '公共服务用地',
          title: '公共服务用地面积占比',
          src: require('./images/公共服务用地面积占比.png'),
          curVal: 38.0464,
          presentTime: this.presentTime,
          presentTimeName: '交易时间',
          ifNormal: '正常',
          upDownSrc: require('./images/up.png')
        },
        {
          parentName: '公共服务用地',
          title: '人均公共服务用地面积',
          src: require('./images/人均公共服务用地面积.png'),
          curVal: 73.1346,
          presentTime: this.presentTime,
          presentTimeName: '截止时间',
          ifNormal: '正常',
          upDownSrc: require('./images/up.png')
        }
      ],
      isChartsPanelShow: false,
      cityData: {},
      isActive: false,
      widgetConf: {
        widgets: []
      },
      isCurrent: '城镇内部用地结构',
      isButton: '2',

      activeName: '1', // 展开name为2的折叠板
      morenYear: true
    }
  },

  methods: {
    goBack(item) {
      this.$bus.$emit('showMapService', item.parentName)
    },
    getCard1Data() {

    },
    getCard2Data() {

    },
    getCard3Data() {

    },
    getCard4Data() {

    },
    getCard5Data() {

    },
    getCard6Data() {

    },
    getTime() {
      this.changepresentTime = moment(new Date()).format('YYYY-MM-DD')
      this.zuhe = (this.moItems.concat(this.dealItems)).concat(this.thirdItems)
      for (var key in this.zuhe) {
        if (this.zuhe[key].title === '城镇开发边界内住宅用地比例' || '人均城镇住宅用地面积' || '公园绿地（广场用地）占比' || '人均公园绿地面积' || '公共服务用地面积占比' || '人均公共服务用地面积') {
          let index = key
          this.zuhe[index].presentTime = this.changepresentTime
        }
      }
    },
    handleMoItemClick(item, key) {
      this.isCurrent = item.title
      this.isButton = key
      this.$emit('controlChange', item, key)
      this.morenYear = true
      Bus.$emit('changeYearMessage', this.morenYear)
      if (item.title === '城镇开发边界内住宅用地比例') {
        this.$bus.$emit('postData1', 'BOUNDARY_RATIO')
        this.$bus.$emit('postData1111', 'BOUNDARY_RATIO')
      } else if (item.title === '人均城镇住宅用地面积') {
        this.$bus.$emit('postData2', 'RESIDENTIAL_AREA_PER_CAPITA')
        this.$bus.$emit('postData2222', 'RESIDENTIAL_AREA_PER_CAPITA')
      } else if (item.title === '公园绿地（广场用地）占比') {
        this.$bus.$emit('postData3', 'PROPORTION_OF_GREEN')
        this.$bus.$emit('postData3333', 'PROPORTION_OF_GREEN')
      } else if (item.title === '人均公园绿地面积') {
        this.$bus.$emit('postData4', 'PARK_GREEN_AREA_PER_CAPITA')
        this.$bus.$emit('postData4444', 'PARK_GREEN_AREA_PER_CAPITA')
      } else if (item.title === '公共服务用地面积占比') {
        this.$bus.$emit('postData5', 'PUBLIC_SERVICE_AREA_RATIO')
        this.$bus.$emit('postData5555', 'PUBLIC_SERVICE_AREA_RATIO')
      } else if (item.title === '人均公共服务用地面积') {
        this.$bus.$emit('postData6', 'PER_CAPITA_PUBLIC_SERVICE_AREA')
        this.$bus.$emit('postData6666', 'PER_CAPITA_PUBLIC_SERVICE_AREA')
      }
    },
    isWarning({ _, curVal, expVal }) {
      return curVal >= expVal
    },
    showTotalData() {
      document.querySelector('.acitvebgc').style.backgroundColor = ''
      this.isCurrent = ''
      this.isButton = ''
      this.activeName = '' // 不展开折叠板
      let item = {
        title: '数据总览'
      }
      let key = ''
      this.$emit('controlChange', item, key)
    },
    monitor() { },
    detail() { },
    hidingChartPanel() {
      this.isChartsPanelShow = false
    },
    bgimgData(imgName) {
      let src
      if (imgName === 'hide') {
        src = require('@/assets/images/jcpgyj/hide-button.png')
      } else if (imgName === 'flag') {
        src = require('@/assets/images/jcpgyj/warning-flag.png')
      }
      return {
        backgroundImage: 'url(' + src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }
    }
  },
  mounted() {
    let that = this
    that.getCard1Data()
    that.getCard2Data()
    that.getCard3Data()
    that.getCard4Data()
    that.getCard5Data()
    that.getCard6Data()
    that.getTime()
    that.getCal()
    setInterval(function () {
      that.getTime()
      that.getCal()
    }, 1000)
  },
  computed: {
    asideWidth: {
      get() {
        switch (this.zoomIn) {
          case '缩小':
            return '350px'
            break
          case '扩大':
            return '0'
            break
          default:
            return '350px'
            break
        }
      },
      set() { }
    }
  },
  components: {},
  created() {
    let key = '2'
    this.$emit('controlChange', item, key)
    this.getTime()
    this.getCard1Data()
    this.getCard2Data()
    this.getCard3Data()
    this.getCard4Data()
    this.getCard5Data()
    this.getCard6Data()
  },
  watch: {
    controlButton: {
      immediate: true,
      deep: true,
      handler(val) {
        this.isButton = val
      }
    }
  }
}
</script>
<style scoped>
.ThreeLine {
  height: 100%;
  width: 100%;
  padding: 20px;
  font-size: 16px;
  color: rgba(32, 32, 32, 1);
}

.main {
  position: relative;
  background: #e9eef3;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}

.aside {
  padding: 15px;

  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.epf-block__zoom {
  display: flex;
  align-items: center;
}

#sun {
  width: 400px;
  height: 400px;
}

.button-list {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}

.aside >>> .el-collapse {
  border: unset;
  overflow: hidden;
}

.monitor-moudle >>> .el-collapse-item__header,
.monitor-moudle >>> .el-collapse-item__header.is-active {
  padding: 20px;
  font-size: 16px;
  border: none;
}

.monitor-item {
  position: relative;
  width: 90%;
  border-radius: 8px;
  background: #fafafa;
  color: #818181;
  margin: 0 auto;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  text-align: left;
  margin-top: 15px;
}

.monitor-item :nth-child(1) {
  margin-top: 0;
}
.monitor-item.acitvebgc {
  background: #ecf4ff;
  border: 1px solid rgba(29, 124, 228, 1);
}

.monitor-item:hover {
  border: 1px solid rgba(29, 124, 228, 1);
}
/* .monitor-item:nth-child(1):hover,
.monitor-item:nth-child(1):active,
.itemActive {
  background: rgba(30, 247, 22, 0.603);
}

.monitor-item:nth-child(2):hover,
.monitor-item:nth-child(2):active,
.itemActive {
  background: rgba(246, 108, 108, 1);
}

.monitor-item:nth-child(3):hover,
.monitor-item:nth-child(3):active,
.itemActive {
  background: #1984e3;
} */
.monitor-item .curVal {
  font-size: 24px;
  font-weight: bold;
  color: #ffa003;
}

.monitor-item .curVal.acitve {
  color: #fff;
}

.monitor-item .expVal {
  font-size: 18px;
  font-weight: bold;
}

.monitor-item .moItemTitle {
  padding-left: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #000;
}

.monitor-item .is-warning {
  position: absolute;
  right: 10px;
  top: 0px;
  width: 40px;
  height: 50px;
  text-align: center;
  color: #fff;
}

.flag {
  height: 53px;
  width: 42px;
  position: absolute;
}

.hide-button {
  height: 25px;
  width: 25px;
  position: absolute;
  right: 15px;
  top: 10px;
}
.title-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.monitor-item .is-warning .warning-text {
  margin-top: 10px;
}
.title-line {
  width: 6px;
  height: 24px;
  display: block;
  background-color: #50b8ef;
  margin-right: 10px;
}
.title-text {
  color: #202020;
  font-size: 18px;
}

.monitor-list .el-col-12 {
  text-align: center;
}
.monitor-list .el-col-12 div {
  padding: 5px 0;
  cursor: pointer;
}

.block__footer {
  background-color: #eeeeee;
  border-top: #c6c6c6;
}
.epf-flex__align {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px !important;
  background-color: #1d7ce4;
  padding: 0 5px;
}
.project-title {
  color: #fff;
  margin-left: 10px;
  font-size: 18px;
}
.project-content {
  padding-left: 30px;
}
.project-title-other {
  color: #fff;
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
}
.chart-header-time {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  margin-top: 5px;
  color: #666;
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
.number-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px;
}
.number-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.turn-title {
  height: 40px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.collapse-box {
  background-color: #fff;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.collapse-box::-webkit-scrollbar {
  display: none;
}
/* .turn-br{
  position: absolute;
  left: 50%;
  margin-left: -6px;
  top: 50%;
  margin-top: -10px;
  font-size: 10px;
  color: #666;
} */
</style>
<style>
.monitor-moudle .el-collapse-item__wrap {
  border-bottom: none;
}
</style>
