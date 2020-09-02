<template>
  <el-container style="width:400px;height:100%;box-shadow:1px 2px 5px 2px rgba(236,236,236,0.5),3px 0px 3px -2px rgba(172,172,172,0.5);">
    <el-header class="epf-flex__align">
      <span class="project-title">约束性指标（{{this.moItems.length}}）</span>
      <!-- <span class="project-title-other" @click="showTotalData">
        数据总览
        <i class="el-icon-s-unfold el-icon--right"></i>
      </span>-->
    </el-header>

    <el-main id="aside-main">
      <div class="collapse-box">
        <!-- <el-collapse @change="hidingChartPanel" v-model="activeName">
        <el-collapse-item class="monitor-moudle" name="1">-->
        <!-- <template slot="title">拆旧复垦进展情况</template> -->
        <div class="monitor-list">
          <div :class="['monitor-item',{'acitvebgc':isCurrent===item.title}]"
               v-for="(item, index) in moItems"
               :key="index"
               ref="item">
            <!-- <div class="chart-header-time">
                  <i class="chart-header-timeIcon"></i>
                  {{ item.presentTime }} 更新
            </div>-->
            <div class="project-content">
              <div class="moItemTitle">{{item.title}}</div>
              <div class="project-number-box">
                <div class="project-number-content">
                  {{item.curUnit}}：
                  <span>{{item.curVal}}</span>
                  <i>{{item.unitName}}</i>
                </div>
                <div class="project-number-content">
                  {{item.expUnit}}：
                  <span>{{item.expVal}}</span>
                  <i>{{item.unitName}}</i>
                </div>
              </div>
              <!-- <div class="project-number-box-other" v-if="item.title=='自然岸线保有率'">
                <div class="project-number-content-other">
                  {{item.curUnit}}：
                  <span>{{item.curVal}}</span>
                </div>
                <div class="project-number-content-other">
                  <div class="project-number-content-first">{{item.expUnit}}：</div>
                  <div class="project-number-content-second">
                    <div style="display: flex;justify-content: flex-start;">
                      大陆：
                      <span>{{item.expVal1}}</span>
                    </div>
                    <div style="display: flex;justify-content: flex-start;margin-top:10px;">
                      海岛：
                      <span>{{item.expVal2}}</span>
                    </div>
                  </div>
                </div>
              </div>-->

              <!-- <div class="number-box">
                    <p class="number-message">
                      <span class="curVal" ref="curVal">{{item.curVal}}</span>
                      <span class="moUnit">{{item.curUnit}}</span>
                    </p>

                    <p class="number-message">
                      <span class="curVal" ref="curVal" style="color:#1d7ce4;">{{item.expVal}}</span>
                      <span class="moUnit">{{item.expUnit}}（{{item.unitName}}）</span>
                    </p>
              </div>-->
            </div>
            <el-row class="block__footer">
              <el-col :span="12">
                <div class="warn-button">
                  预警状态：
                  <span class="one-header__right EPFsuccess__custom"
                        v-if="item.isWarn==true&&item.dimness==1">正常</span>
                  <span class="one-header__right EPFerror__custom"
                        v-if="item.isWarn==false&&item.dimness==1">预警</span>
                  <span v-if="item.dimness==0">--</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div @click="handleMoItemClick(item,'2')"
                     class="turn-title">
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
  </el-container>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'
import Bus from '../../../../utils/bus'
export default {
  name: 'ControlMenu',
  props: {
    controlButton: {
      type: String
    },
    controlTitle: {
      type: String
    },
    controlUnit: {
      type: String
    },
    controlZbEnum: {
      type: String
    },
    controlMenuLXData: {
      type: Object
    },
    controlMenuYSData: {
      type: Object
    },
    controlMenuJYData: {
      type: Object
    },
    isMapPatternData: {
      type: Boolean
    },
    controlMenuCity: {
      type: String
    },
    controlMenuArea: {
      type: String
    }
  },
  data () {
    return {
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
        // {
        //   title: "耕地保有量",
        //   curVal: 259.31,
        //   curUnit: "现状值",
        //   expVal: 247.93,
        //   expUnit: "规划值",
        //   unitName: "万公顷",
        //   presentTime: "2019年12月27日"
        // },
        // {
        //   title: "永久基本农田保护面积",
        //   curVal: 264.16,
        //   curUnit: "现状值",
        //   expVal: 210.93,
        //   expUnit: "规划值",
        //   unitName: "万公顷",
        //   presentTime: "2019年12月27日"
        // },
        // {
        //   title: "海洋生态红线区面积占比",
        //   curVal: "--",
        //   curUnit: "现状值",
        //   expVal: ">=28.07",
        //   expUnit: "规划值",
        //   unitName: "%",
        //   presentTime: "2019年12月27日"
        // },
        // {
        //   title: "自然岸线保有率",
        //   curVal: "--",
        //   curUnit: "现状值",
        //   expVal: "",
        //   expVal1: ">=35",
        //   expVal2: ">=85",
        //   expUnit: "规划值",
        //   unitName: "%",
        //   presentTime: "2019年12月27日"
        // },
        // {
        //   title: "国土开发强度",
        //   curVal: 11.7,
        //   curUnit: "现状值",
        //   expVal: 11.6,
        //   expUnit: "规划值",
        //   unitName: "%",
        //   presentTime: "2019年12月27日"
        // },
        // {
        //   title: "人均城镇工矿用地",
        //   curVal: 103,
        //   curUnit: "现状值",
        //   expVal: 118,
        //   expUnit: "规划值",
        //   unitName: "平方米/人",
        //   presentTime: "2019年12月27日"
        // },
        // {
        //   title: "用水总量",
        //   curVal: "--",
        //   curUnit: "现状值",
        //   expVal: 456.04,
        //   expUnit: "规划值",
        //   unitName: "亿立方米",
        //   presentTime: "2019年12月27日"
        // },
        // {
        //   title: "重要江河湖泊水功能区水质达标率",
        //   curVal: 70,
        //   curUnit: "现状值",
        //   expVal: 83,
        //   expUnit: "规划值",
        //   unitName: "%",
        //   presentTime: "2019年12月27日"
        // }
      ],
      dealItems: [
        {
          title: '第9期交易',
          curVal: 38.0464,
          curUnit: '本期成交金额亿元）',
          expVal: 5219.8567,
          expUnit: '本期成交面积',
          unitName: '亩',
          presentTime: '2019年12月27日',
          presentTimeName: '交易时间'
        },
        {
          title: '累计交易情况',
          curVal: 73.1346,
          curUnit: '累计成交金额亿元）',
          expVal: 11280.4179,
          expUnit: '累计成交面积',
          unitName: '亩',
          presentTime: '2019年12月27日',
          presentTimeName: '截止时间'
        }
      ],
      isChartsPanelShow: false,
      cityData: {},
      isActive: false,
      widgetConf: {
        widgets: []
      },
      isCurrent: '',
      isCurrentUnit: '',
      isButton: '',

      activeName: '1', // 展开name为2的折叠板
      morenYear: true,

      // 菜单数据
      lixiangMenuData: {},
      yanshouMenuData: {},
      jiaoyiMenuData: {},
      unitName: '',

      isMapPattern: true,

      params: {
        province: '440000',
        city: '',
        area: '',
        year: moment().year()
      },

      zbEnum: '',

      isShowHome: false,

      isWarn: '',
      changeMenuCity: '',
      changeMenuArea: ''
    }
  },

  methods: {
    handleMoItemClick (item, key) {
      this.isCurrent = item.title
      this.isCurrentUnit = item.unitName
      this.zbEnum = item.zbEnum
      this.isButton = key
      this.$emit('controlChange', item, key)
      this.morenYear = true

      this.isShowHome = false
      this.$emit('homeShow', this.isShowHome)

      Bus.$emit('changeMessage', this.isCurrent)
      Bus.$emit('changeUnitMessage', this.isCurrentUnit)
      Bus.$emit('changeZbEnumMessage', this.zbEnum)
      Bus.$emit('changeYearMessage', this.morenYear)
    },
    isWarning ({ _, curVal, expVal }) {
      return curVal >= expVal
    },
    showTotalData () {
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
    monitor () { },
    detail () { },
    hidingChartPanel () {
      this.isChartsPanelShow = false
    },
    bgimgData (imgName) {
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
    },
    async getMenuData () {
      let params = this.params
      params['city'] = this.changeMenuCity
      params['area'] = this.changeMenuArea
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
        this.moItems = menuData
        console.log(this.moItems)
      } else {
        this.$message.error(res.msg) // 失败
      }
    }
  },
  created () {
    this.getMenuData()
    // let item = {
    //   title: this.isCurrent,
    //   zbEnum: this.zbEnum,
    //   unitName: this.isCurrentUnit
    // };
    // let key = this.isButton;
    // this.$emit("controlChange", item, key);
  },
  mounted () { },
  watch: {
    controlButton: {
      immediate: true,
      deep: true,
      handler (val) {
        this.isButton = val
      }
    },
    controlTitle: {
      immediate: true,
      deep: true,
      handler (val) {
        this.isCurrent = val
      }
    },
    controlUnit: {
      immediate: true,
      deep: true,
      handler (val) {
        this.isCurrentUnit = val
      }
    },
    controlZbEnum: {
      immediate: true,
      deep: true,
      handler (val) {
        this.zbEnum = val
      }
    },
    controlMenuCity: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeMenuCity = val
        console.log(this.changeMenuCity)
        this.getMenuData()
      }
    },
    controlMenuArea: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeMenuArea = val
        console.log(this.changeMenuArea)
        this.getMenuData()
      }
    }
    // isMapPatternData: {
    //   immediate: true,
    //   deep: true,
    //   handler(val) {
    //     this.isMapPattern = val;
    //     if (this.isMapPattern == true) {
    //       this.isButton = "2";
    //     } else if (this.isMapPattern == false) {
    //       this.isButton = "1";
    //     }
    //   }
    // },
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

.monitor-item:last-child {
  margin-bottom: 0;
}
.monitor-item.acitvebgc {
  background: #f6f9ff;
  border: 1px solid #1b74ee;
}

.monitor-item:hover {
  background: #f6f9ff;
  border: 1px solid #1b74ee;
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
  /* font-weight: bold; */
  font-size: 18px;
  line-height: 46px;
  color: #202020;
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

/* .monitor-list{
  height: 180px;
} */
.monitor-list .el-col-12 {
  text-align: center;
}
.monitor-list .el-col-12 div {
  padding: 5px 0;
  cursor: pointer;
}

.block__footer {
  /* background-color: #eeeeee; */
  border-top: #c6c6c6;
}
.epf-flex__align {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px !important;
  background-color: #fff;
  padding: 0 24px;
}
.project-title {
  font-size: 18px;
  color: #202020;
  line-height: 24px;
  font-weight: bolder;
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
  line-height: 21px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #50a5f4;
}
.collapse-box {
  background-color: #fff;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 0px 24px 54px;
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
.moItemTitle {
  line-height: 30px;
}
.project-number-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 55px;
  font-size: 16px;
  color: #000;
}
.project-number-content {
  width: 100%;
  height: 100%;
  font-size: 16px;
  line-height: 21px;
  color: #505050;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.project-number-content span {
  font-size: 18px;
  color: #ffa200;
  /* font-weight: bolder; */
}
.project-number-content i {
  font-size: 14px;
  color: #707070;
  margin-left: 5px;
  /* font-weight: bolder; */
}
.project-number-box-other {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  height: 80px;
  font-size: 14px;
  color: #000;
  padding: 0 10px;
  margin-top: 15px;
}
.project-number-content-other {
  width: 50%;
  height: 100%;
  font-size: 14px;
  color: #000;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  line-height: 20px;
}
.project-number-content-second {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.project-number-content-other span {
  font-size: 20px;
  color: #f59a23;
  font-weight: bolder;
}
.project-number-content-other div span {
  font-size: 20px;
  color: #f59a23;
  font-weight: bolder;
  display: flex;
  align-items: flex-start;
}
.project-number-content-second span {
  font-size: 20px;
  color: #f59a23;
  font-weight: bolder;
}
.warn-button {
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
.warn-button span.one-header__right {
  margin-left: 0px;
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
</style>
<style>
.monitor-moudle .el-collapse-item__wrap {
  border-bottom: none;
}
.monitor-moudle .el-row {
  margin-bottom: 0px;
}
#aside-main .el-row {
  margin-bottom: 0px;
}
</style>
