<template>
  <div :class='[showDataBox ? "containerAuto" : "containerHidden"]'>
    <div class="titleBox">
      <div :class='[showDataBox || showTable? "showTitle" : "hideTitle"]'>
        <epf-title :title="this.title"></epf-title>
      </div>
      <div class="topRightBox"
           v-if="showDataBox"><span :class="{ active: currentTab === 0 }"
              @click="toAll" class="pointer">全部<span>({{this.sumCount}})</span></span><span>丨</span><span :class="{ active: currentTab === 1 }"
              @click="toWarn" class="pointer">预警<span>({{this.warningCount}})</span></span><span>丨</span><span :class="{ active: currentTab === 2 }"
              @click="toHealth" class="pointer">健康<span>({{this.healthCount}})</span></span><span>丨</span><span :class="{ active: currentTab === 3 }"
              @click="toNoData" class="pointer">暂无数据<span>({{this.emptyCount}})</span></span></div>
              <div class="topRightBox" v-if="!showDataBox" style="cursor:pointer;">
                <div @click="goBack"><span style="padding-right: 8px;">返回</span>
                <!-- <span>|</span> -->
                </div>
                <!-- <div style="display: flex;
    justify-content: center;
    align-items: center;margin-left: 4px;" v-if="showXiangqing"><img src="../../monitorassess/peopleAndLand/topicOverview/images/图表模式.png" alt=""><div @click="toTable">图表模式</div></div>
                <div style="display: flex;
    justify-content: center;
    align-items: center;margin-left: 4px;" v-if="showTable"><img src="../../monitorassess/peopleAndLand/topicOverview/images/地图模式.png" alt=""><div @click="toMap">地图模式</div></div> -->
              </div>
    </div>
    <div class="mainBox"
         v-show="showDataBox">
      <div class="mainFirst"
           v-for="item0 in bigShuZu"
           :key="item0.title">
        <div class="small1">{{item0.title}}</div>
        <div class="wrap-small2">
          <div :class='item1.status==2 ? "small3" : "small2"'
               v-for="item1 in item0.date"
               :key="item1.name"
               @click="toXiangQing(item1.name, item1.indexId, item1.unit, item1.presentSituation, item1.planningValue)" v-show="showAllData">
            <div class="small2-one">
              <div class="point"
                   v-if="item1.status == 0||''"></div>
              <div class="redpoint"
                   v-if="item1.status==2"></div>
              <div class="greenpoint"
                   v-if="item1.status==1"></div>
              <span>{{ item1.name }}</span><span v-if="item1.unit!=''">({{item1.unit}})</span>
            </div>
            <!-- <template slot-scope="scope"> -->
            <div class="small2-two"><span class="huiBox">现状</span><span class="weightText">{{ item1.presentSituation  | numFilterScan}}</span></div>
            <div class="small2-three"><span class="huiBox">规划目标</span><span class="weightText">{{ item1.planningValue  | numFilterScan}}</span></div>
            <!-- </template> -->
          </div>
           <div class="small2" id="warnClass"
               v-for="item1 in item0.date"
               :key="item1.name"
               @click="toXiangQing(item1.name, item1.indexId, item1.unit, item1.presentSituation, item1.planningValue)" v-show="item1.status==2 && showWarnData">
            <div class="small2-one">
              <div class="point"
                   v-if="item1.status == 0||''"></div>
              <div class="redpoint"
                   v-if="item1.status==2"></div>
              <div class="greenpoint"
                   v-if="item1.status==1"></div>
              <span>{{ item1.name }}</span><span v-if="item1.unit!=''">({{item1.unit}})</span>
            </div>
            <!-- <template slot-scope="scope"> -->
            <div class="small2-two"><span class="huiBox">现状</span><span class="weightText">{{ item1.presentSituation  | numFilterScan}}</span></div>
            <div class="small2-three"><span class="huiBox">规划目标</span><span class="weightText">{{ item1.planningValue  | numFilterScan}}</span></div>
            <!-- </template> -->
          </div>
           <div class="small2"
               v-for="item1 in item0.date"
               :key="item1.name"
               @click="toXiangQing(item1.name, item1.indexId, item1.unit, item1.presentSituation, item1.planningValue)" v-show="item1.status==1 && showHealthData">
            <div class="small2-one">
              <div class="point"
                   v-if="item1.status == 0||''"></div>
              <div class="redpoint"
                   v-if="item1.status==2"></div>
              <div class="greenpoint"
                   v-if="item1.status==1"></div>
              <span>{{ item1.name }}</span><span v-if="item1.unit!=''">({{item1.unit}})</span>
            </div>
            <!-- <template slot-scope="scope"> -->
            <div class="small2-two"><span class="huiBox">现状</span><span class="weightText">{{ item1.presentSituation  | numFilterScan}}</span></div>
            <div class="small2-three"><span class="huiBox">规划目标</span><span class="weightText">{{ item1.planningValue  | numFilterScan}}</span></div>
            <!-- </template> -->
          </div>
           <div class="small2"
               v-for="item1 in item0.date"
               :key="item1.name"
               @click="toXiangQing(item1.name, item1.indexId, item1.unit, item1.presentSituation, item1.planningValue)" v-show="item1.status==0 && showNoData">
            <div class="small2-one">
              <div class="point"
                   v-if="item1.status == 0||''"></div>
              <div class="redpoint"
                   v-if="item1.status==2"></div>
              <div class="greenpoint"
                   v-if="item1.status==1"></div>
              <span>{{ item1.name }}</span><span v-if="item1.unit!=''">({{item1.unit}})</span>
            </div>
            <!-- <template slot-scope="scope"> -->
            <div class="small2-two"><span class="huiBox">现状</span><span class="weightText">{{ item1.presentSituation  | numFilterScan}}</span></div>
            <div class="small2-three"><span class="huiBox">规划目标</span><span class="weightText">{{ item1.planningValue  | numFilterScan}}</span></div>
            <!-- </template> -->
          </div>
        </div>
      </div>
    </div>
    <div class="xiangQingBox"
         v-show="showXiangqing"
         style="height:90%;width:100%;position:relative;">
      <epf-mapview :delay="1"
                   name="scan"
                   @viewLoaded="getMapApp">
        <epf-mapview-popup :visible="showPopup"
                           :position="popupPosition"
                           :content="popupContent">
        </epf-mapview-popup>
        <div class="toolbar">
          <toggle-map style="margin-right: 10px;width: 32px;"></toggle-map>
          <jumpto style="margin: 0px;"></jumpto>
          <toolbox style="margin: 0px;"
                   @click.stop.native="handleToolBoxClick"></toolbox>
          <tool-item style="margin: 0px;"></tool-item>
        </div>
        <city-location></city-location>
        <tool-panel></tool-panel>
        
        <!-- <div class="chart-click">
      <div class="wrap-middle-bottom"
           style="position: relative;">
        <ul class="wrap-middle-bottom-timeLine">
          <li class="timeLine-box"
              v-for="(item, index) in projectYearData"
              :key="index"
               :class="{
              active: index == limitB && !morenYear,
              activeMoren: morenYear
            }">
            <div class="timeLine-shape">
              <div class="timeLine-shape-circle"
                   @click="getSelectYearData(index)"></div>
              <div class="timeLine-shape-line"></div>
            </div>
            <div class="timeLine-year">{{ item }}</div>
          </li>
        </ul>
      </div>
    </div> -->
        <!-- <div style="height:100%;margin-top:100px;"
          >
        <detailList :myType="type"
                    v-show="activeVue==='detailList'"
                    @openImportant="vueChange"
                    :data="detectionRouterData[routerIndex]"
                    :fromScan="toDetail"></detailList>
        <stateDataTrends :data="detectionRouterData[routerIndex]"
                         @classDetails="openClassDetails"
                         @classIng="openClassIng"
                         :yearData="childYear"
                         :childTitle="title"></stateDataTrends>
      </div> -->
      </epf-mapview>
      <div @click="showProjectMenu"
               class="main-message"
               :class="{
            'main-messageR': ifClickArrow,
            'main-messageL': !ifClickArrow
          }"></div>
        <transition name="left">
          <div>
      <div class="wrap_twotable" v-show="ifClickArrow" style="height: 106%;
    width:400px;
    top: -6%;
    position: absolute;">
        <div style="height:600px;width:400px;position:relative;">
        <detailList :myType="type"
                    v-show="activeVue==='detailList'"
                    @openImportant="vueChange"
                    :data="detectionRouterData[routerIndex]"
                    :fromScan="toDetail" :detailTitle="title"></detailList>
                    </div>
      <div style="height:520px;width:400px;position:relative;">
                      <div style="width:90%;height:100%;display:flex;justify-content: center;
  align-items: center;margin-left: 5%;">
        <stateDataTrends :data="detectionRouterData[routerIndex]"
                         @classDetails="openClassDetails"
                         @classIng="openClassIng"
                         :yearData="childYear"
                         :childTitle="title"
                         ></stateDataTrends>
                         </div>
      </div>
      </div>
      </div>
      </transition>
    </div>
    <!-- <div class="xiangQingBox"
         v-show="showTable"
         style="height:90%;width:100%;background: #fff;box-shadow: 1px 2px 5px 2px rgba(236, 236, 236, 0.5);">
         <WarningMenuTable></WarningMenuTable>
    </div> -->
  </div>
</template>
<script>
// @import "../../onemap/toolbarItem/style.css";
import axios from "axios";
import echarts from "echarts";
import DetailList from "./data-scanning-components/DetailList";
import TimeLine from "./data-scanning-components/time-line";
import StateDataTrends from "./data-scanning-components/StateDataTrends";
import WarningMenuTable from "./data-scanning-components/WarningMenuTable";
import gisMixin from "../mixins/gis";
import { mapState, mapMutations } from "vuex";
import mapOption from "./data-scanning-components/option";
export default {
  mixins: [gisMixin],
  components: {
    WarningMenuTable,
    DetailList,
    StateDataTrends,
    TimeLine
  },
  data() {
    return {
      showTable: false,
      ifClickArrow: true,
      toDetail: {
      },
      morenYear: true,
      childYear:'2019',
      limitB: 4,
      projectYearData:[2015, 2016, 2017, 2018, 2019],
      showAllData: true,
      showWarnData: false,
      showHealthData: false,
      showNoData: false,
      name: '',
      indexId: '',
      unit: '',
      presentSituation: '',
      planningValue: '',
      sumCount: '',
      emptyCount: '',
      warningCount: '',
      healthCount: '',
      bigShuZu: [],
      shuZu2: [],
      detectionRouterData: [],
      activeVue: "detailList",
      showDataBox: true,
      lala: false,
      title: "国土空间规划指标监测预警总览",
      currentTab: 0,
      totalData: {
        "title1": "自然资源现状",
        data1: [
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" }
        ],
        "title2": "社会经济发展",
        "data2": [
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" }
        ],
        "title3": "规划建设剩余空间",
        "data3": [
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" },
          { name: "土地总面积（万亩）", xianzhuang: "4.15", mubiao: "4.62" }
        ]
      }
    }
  },
  methods: {
    toTable() {
      this.showTable = true
      this.showDataBox = false
      this.showXiangqing = false
    },
    toMap() {
      this.showXiangqing = true
      this.showDataBox = false
      this.showTable = false
    },
    showProjectMenu () {
      this.ifClickArrow = !this.ifClickArrow
    },
    goBack() {
      this.title = '国土空间规划指标监测预警总览'
      this.showDataBox = true
      this.showXiangqing = false
      this.showTable = false
    },
    getSelectYearData(index) {
      if (index == this.limitB == 4) {
        this.limitB = 4
      } else {
        this.limitB = index
        if (index == this.projectYearData.length - 1) {
          this.childYear = '2019'
        } else if (index == this.projectYearData.length - 2) {
          this.childYear = '2018'
        } else if (index == this.projectYearData.length - 3) {
          this.childYear = '2017'
        } else if (index == this.projectYearData.length - 4) {
          this.childYear = '2016'
        } else if (index == this.projectYearData.length - 5) {
          this.childYear = '2015'
        }
      }
      this.morenYear = false
    },
    toAll() {
      this.currentTab = 0
      this.showAllData=true
      this.showWarnData=false
      this.showHealthData=false
      this.showNoData=false
    },
    toWarn() {
      this.currentTab = 1
      this.showAllData=false
      this.showWarnData=true
      this.showHealthData=false
      this.showNoData=false
    },
    toHealth() {
      this.currentTab = 2
      this.showAllData=false
      this.showWarnData=false
      this.showHealthData=true
      this.showNoData=false
    },
    toNoData() {
      this.currentTab = 3
      this.showAllData=false
      this.showWarnData=false
      this.showHealthData=false
      this.showNoData=true
    },
    vueChange(key) {
      this.activeVue = key;
    },
    toXiangQing(name, indexId, unit, presentSituation, planningValue) {
      this.toDetail['nowVal'] = presentSituation
      this.toDetail['planVal'] = planningValue
      this.toDetail['unit'] = unit
      console.log(123)
      console.log(this.toDetail)
      this.showXiangqing = true
      this.showDataBox = false
      this.showTable = false
      this.indexId = indexId
      this.unit = unit
      this.name = name
      this.presentSituation = presentSituation
      this.planningValue = planningValue
      this.$bus.$emit('name', this.name)
      this.$bus.$emit('presentSituation', this.presentSituation)
      this.$bus.$emit('indexId', this.indexId)
      this.$bus.$emit('unit', this.unit)
      this.$bus.$emit('planningValue', this.planningValue)
      this.title = name
      console.log(this.title)
      // this.lala = true
    }
  },
  created() {
    this.$http.get('/api/epf-index-model/indexOverview/getIndexOverviewJson', {}).then(res => {
      if (res.code === 0) {
        this.bigShuZu = res.indexOverviewList
        this.sumCount = res.countJson.sumCount
        this.emptyCount = res.countJson.emptyCount
        this.warningCount = res.countJson.warningCount
        this.healthCount = res.countJson.healthCount
        this.shuZu2 = []
        res.indexOverviewList.forEach(response => {
          this.shuZu2.push(response.date)
        })
      } else {
        this.$message.error(res.msg)// 失败
      }
    })
  },
  filters: {
    numFilterScan(value) {
      let realVal = ''
      if (value !== "") {
        // 截取当前数据到小数点后三位
        realVal = parseFloat(parseInt(Number(value))).toFixed(2)
        // realVal = tempVal.substring(0, tempVal.length - 1)
      } else {
        realVal = '--'
      }
      return realVal
    }
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
.containerAuto {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: #f7f7f7;
  overflow-x: hidden;
}
.containerHidden {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: #f7f7f7;
}
.titleBox {
  padding: 0 1%;
  width: 100%;
    border-bottom: 1px solid #f7f7f7;
    height: 50px;
    background-color: #fff;
    /* -webkit-box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1); */
    /* box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1); */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-right: 0 20px;
}
.topRightBox {
  height: 100%;
    /* width: 8%; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.topRightBox .active {
  color: #1d7ce4;
}
.epf-title-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* margin: 25px 0; */
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  align-items: center;
}
.showTitle {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* margin: 25px 0; */
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  align-items: center;
  opacity: 1;
}
.hideTitle {
   display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* margin: 25px 0; */
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
}
.mainBox {
  width: 100%;
  background-color: #fff;
  /* padding-top: 20px; */
}
.mainFirst,
.mainSecond,
.mainThird {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 20px;
  flex-direction: column;
}
.mainThird {
  border-bottom: unset;
}
.small1 {
  font-size: 20px;
    font-weight: bolder;
}
.huiBox {
  color: rgba(173, 173, 173);
}
.greenBox {
  color: green;
}
.redBox {
  color: red;
}
.small2 {
  padding: 25px 30px;
  height: 20px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
.small2:hover {
  background: rgba(236, 245, 255);
  color: #1d7ce4;
  cursor: pointer;
}
.small2 .active {
  color: #1d7ce4;
}
.small3 {
  padding: 25px 30px;
  height: 20px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}
.small3:hover {
  background: rgba(252, 245, 245, 1);
  color: rgba(217, 0, 27, 1);
  cursor: pointer;
}
.small3 .active {
  color: rgba(217, 0, 27, 1);
}
#warnClass:hover {
  background: rgba(252, 245, 245, 1);
  color: rgba(217, 0, 27, 1);
  cursor: pointer;
}
.small2-one {
  height: 20px;
  width: 50%;
  /* padding-right: 120px; */
  position: relative;
}
.small2-two {
  height: 20px;
  padding-right: 8px;
  width: 40%;
}
.small2-three {
  height: 20px;
  width: 50%;
  padding-right: 20px;
}
.wrap-small2 {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  width: 100%;
  font-size: 16px;
}
.point {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  color: #ccc;
  background: #ccc;
  position: absolute;
  top: 8px;
  left: -10px;
}
.redpoint {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: red;
  position: absolute;
  top: 8px;
  left: -10px;
}
.greenpoint {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: green;
  position: absolute;
  top: 8px;
  left: -10px;
}
.weightText {
  font-weight: bolder;
  padding-left: 10px;
}
.pointer {
  cursor: pointer;
}
.chart-click {
  width: 60%;
    height: 60px;
    margin-right: 50%;
    position: absolute;
    top: 85%;
    right: -30%;
}
.wrap-middle-bottom {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
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
  li.active:nth-child(1)
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
  li.active:nth-child(2)
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
  li.active:nth-child(3)
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
  li.active:nth-child(4)
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
  li.active:nth-child(5)
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
  li.active:nth-child(6)
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
  li.active:last-child
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
  li.activeMoren:last-child
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
.timeLine-year {
  position: absolute;
  bottom: -15px;
  left: -11px;
  font-size: 16px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:nth-child(1) {
  margin-left: 20px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:last-child {
  width: 30px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:last-child .timeLine-shape {
  width: 30px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:last-child .timeLine-shape-line {
  width: 0;
  height: 0;
}
body{
  font-size: 16px;
}
.wrap_twotable {
  width: 400px;
    height: 107%;
    background: #fff;
    position: absolute;
    left: 0;
    /* top: -7%; */
    bottom: 0;
    overflow: auto;
    /* -webkit-box-shadow: rgba(236, 236, 236, 0.5) 1px 2px 5px 2px, rgba(172, 172, 172, 0.5) 3px 0px 3px -2px;
    box-shadow: rgba(236, 236, 236, 0.5) 1px 2px 5px 2px, rgba(172, 172, 172, 0.5) 3px 0px 3px -2px; */
}

.wrap_twotable::-webkit-scrollbar{
    display: none;
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
  /* top: 40px;
  right: -40px; */
  cursor: pointer;
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: 99;
}
.main-messageL {
  position: absolute;
    left: 0;
    top: 0;
  background-image: url("../../../../assets/images/jcpgyj/right.png");
  background-size: 40px 40px;
}
.main-messageR {
  background-image: url("../../../../assets/images/jcpgyj/left.png");
  background-size: 40px 40px;
  position: absolute;
    left: 400px;
    top: 0;
}
</style>