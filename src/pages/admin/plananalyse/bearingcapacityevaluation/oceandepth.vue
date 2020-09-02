<template>
  <el-container id="oceandepth" class="EPF-table">
    <el-main id="main">
      <epf-mapview :delay="1" name="suitability22" ref="suitability222" class="epf-mapview__custom">
        <div class="toolbar">
          <jump-to></jump-to>
          <zoom></zoom>
          <pan></pan>
          <basemap></basemap>
          <layerlist></layerlist>
        </div>
      </epf-mapview>
    </el-main>

    <el-aside id="aside" width="400px" v-loading="loading1">
      <el-container>
        <el-header id="aside-header" style="height: 40px;">
          <span class="title">{{routerData[currentRouter].nama}}</span>
        </el-header>
        <el-row type="flex" justify="center" style="margin-top:5px" v-if="tabs">
          <el-col :span="20" class="twoInone">
            <div
              :class="['one',{'active':isCurrent==item.index}]"
              @click="myTab(item)"
              v-for="(item,index) in tabs"
              :key="index"
            >{{item.title}}</div>
          </el-col>
        </el-row>
        <el-main id="aside-main">
          <div class="start">
            <div class="appraisals" style="margin-top:15px">
              <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
                <div class="verticalLine"></div>
                <div class="text title">评价说明</div>
              </el-row>
              <div class="description">
                <el-row class="myContent">{{routerData[currentRouter].instructions}}</el-row>
              </div>
            </div>

            <div>
              <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
                <div class="verticalLine"></div>
                <div class="text title">设置</div>
              </el-row>

              <div class="myContent">
                <div class="calculations">
                  <el-row
                    type="flex"
                    align="middle"
                    v-for="(item,index) in routerData[currentRouter].arr1 "
                    :key="index"
                    style="margin-top:10px"
                  >
                    <el-col :span="6">
                      <span class="filter_title_span">选择数据:</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select
                        v-model="routerData[currentRouter].selectOneArray[index]"
                        size="small"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item,index) in routerData[currentRouter].select1"
                          :ref="item.name"
                          :id="item.id"
                          :dictKey="item.id"
                          :label="item.name"
                          :value="item.id"
                          :key="index"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="4" style="text-align:right">
                      <div
                        v-if="index===0"
                        style="cursor:pointer;height:40px"
                        @click="addData('arr1')"
                      >
                        <img :src="addImg" style="height:100%" alt />
                      </div>

                      <div v-else style="cursor:pointer;height:40px" @click="deleted(index,'arr1')">
                        <img :src="subImg" style="height:100%" alt />
                      </div>
                    </el-col>
                  </el-row>
                  <el-row
                    style="color:rgba(170,170,170,1);font-size:14px;margin-top"
                  >{{routerData[currentRouter].remarks1}}</el-row>
                </div>

                <div class="line"></div>

                <el-row
                  type="flex"
                  align="middle"
                  v-for="(item,index) in routerData[currentRouter].arr2 "
                  :key="index"
                  style="margin-top:10px"
                >
                  <el-col :span="6">
                    <span class="filter_title_span">选择模型:</span>
                  </el-col>
                  <el-col :span="14">
                    <el-select
                      v-model="routerData[currentRouter].selectTwoArray[index]"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item,index) in select2"
                        :ref="item.modelName"
                        :id="item.id"
                        :dictKey="item.id"
                        :label="item.modelName"
                        :value="item.id"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4" style="text-align:right">
                    <div
                      v-if="index===0"
                      style="cursor:pointer;height:40px"
                      @click="addData('arr2')"
                    >
                      <img :src="addImg" style="height:100%" alt />
                    </div>

                    <div v-else style="cursor:pointer;height:40px" @click="deleted(index,'arr2')">
                      <img :src="subImg" style="height:100%" alt />
                    </div>
                  </el-col>
                </el-row>

                <el-row
                  style="color:rgba(170,170,170,1);font-size:14px;margin-top:10px"
                >{{routerData[currentRouter].computingMethod}}</el-row>
              </div>
            </div>

            <el-row type="flex" justify="end" style="margin-top:15px">
              <div class="EPFButton EFPwirte" @click="resetFilter()">重置</div>
              <div class="EPFButton EFPcommon secondButton" @click="myClick()">开始评价</div>
            </el-row>
          </div>

          <div class="end" v-if="routerData[currentRouter].showEnd">
            <div class="subsume">
              <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
                <div class="verticalLine"></div>
                <div class="text title">评价汇总</div>
              </el-row>
              <div
                class="description"
                style="text-align:center;color:rgba(29,124,228,1);font-size:16px;margin-top:20px"
              >
                <span
                  style="padding:8px 14px;border-radius:3px;border:1px solid rgba(97,155,219,1);"
                >
                  <img :src="pinggu" alt />
                  <span>下载评估报告</span>
                </span>
              </div>
              <!-- <more :introduce="childrenData.echartsContent"></more> -->
            </div>

            <div style="margin-top:30px">
              <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
                <div class="verticalLine"></div>
                <div class="text title">等级概括</div>
                <div class="induce">导出数据</div>
              </el-row>
              <div class="myContent">
                <el-table
                  :data="routerData[currentRouter].gradeZoning"
                  style="width: 100%;margin-top:15px"
                  border
                >
                  <el-table-column
                    label
                    min-width="80"
                    align="center"
                    :show-overflow-tooltip="true"
                  >
                    <template slot-scope="scope">
                      <span hit size="medium">{{ scope.row.level }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="覆盖面积" min-width="90" align="center">
                    <template slot-scope="scope">
                      <span hit size="medium">{{ scope.row.cover }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="比例" min-width="90" align="center">
                    <template slot-scope="scope">
                      <span hit size="medium">{{ scope.row.proportion }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>

            <div>
              <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
                <div class="verticalLine"></div>
                <div class="text title">区域概括</div>
                <div class="induce">导出数据</div>
              </el-row>
              <div class="myContent">
                <el-table
                  :data="routerData[currentRouter].confluenceZoning"
                  style="width: 100%;margin-top:15px"
                  border
                >
                  <el-table-column
                    label
                    min-width="80"
                    align="center"
                    :show-overflow-tooltip="true"
                  >
                    <template slot-scope="scope">
                      <span hit size="medium">{{ scope.row.division }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="覆盖面积" min-width="90" align="center">
                    <template slot-scope="scope">
                      <span hit size="medium">{{ scope.row.cover }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="比例" min-width="90" align="center">
                    <template slot-scope="scope">
                      <span hit size="medium">{{ scope.row.proportion }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-aside>
  </el-container>
</template>
<script>
import jumpTo from "../../onemap/toolbarItem/jumpTo/widget";
import zoom from "../../onemap/toolbarItem/zoom/index";
import pan from "../../onemap/toolbarItem/pan/widget";

import miXin from "./plananalyse";
import { LayerPairs } from '../common/config'

import more from "./more";
export default {
  name: "home",
  data() {
    return {
      // tabs:['城镇建设','农业耕作'],
      loading1: false,
      num: 0,
      addImg: require("@/assets/plananalyse/add.png"),
      subImg: require("@/assets/plananalyse/reduce.png"),

      pinggu: require("@/assets/pinggu.png"),
      isHide: true,
      childrenData: {
        type: "",
        active: "1",
        showEnd: false,
        selectOneArray: [],
        selectTwoArray: [],
        arr1: [{}],
        arr2: [{}]
      },
      isCurrent: "",
      currentRouter: "",
      loadEndRouter: [],
      routerData: [],
      routerIndex: null,
      forward: true,
      select2: [],
      select1: []
    };
  },

  methods: {
    myClick() {
      let data = this.routerData[this.currentRouter];
      let analysisDataId = Array.isArray(data.selectOneArray)
        ? this.getIDs(data.selectOneArray)
        : data.selectOneArray;
      let modellibraryId = Array.isArray(data.selectTwoArray)
        ? this.getIDs(data.selectTwoArray)
        : data.selectTwoArray;
      if (!analysisDataId) {
        this.$message.warning("请选择数据");
        return;
      }
      if (!modellibraryId) {
        this.$message.warning("请选择模型");
        return;
      }
      this.$get(
        "/epf-planning-analysis/paevaluationanalysis/getAnalysisCalculationDate",
        {
          evaluationType: `evaluation_type-00${this.currentRouter}`,
          analysisDataId: analysisDataId,
          modellibraryId: modellibraryId
        }
      ).then(res => {
        if (res.code == "0") {
          let endData = res.analysisCalculationDate;

          this.routerData[this.currentRouter] = Object.assign(
            this.routerData[this.currentRouter],
            endData
          );

          this.$set(this.routerData[this.currentRouter], "showEnd", true);
          this.$message.success("分析完成");
        } else {
          this.loading = false;
          this.$message.error(res.msg); // 失败
          return;
        }
      });

      // this.$emit("appraisals", analysisDataId, modellibraryId);
    },
    getIDs: function(array) {
      var ids = "";
      for (var i = 0; i < array.length; i++) {
        ids += array[i];
        if (i != array.length - 1) {
          ids += ",";
        }
      }
      return ids;
    },

    resetFilter() {
      this.routerData[this.currentRouter].selectOneArray = [];
      this.routerData[this.currentRouter].selectTwoArray = [];
    },

    addData(key) {
      this.routerData[this.currentRouter][key].push({});
    },
    deleted(index, key) {
      this.routerData[this.currentRouter][key].splice(index, 1);
    },
    myTab(item) {
      this.isCurrent = item.index;
      this.$router.push({ path: "oceandepth", query: { index: item.index } });
      // var num1 = "";
      // var num2 = "";
      // if (this.childrenData.evaluationType === "evaluation_type-001") {
      //   (num1 = "1"), (num2 = "10");
      // }
      // if (this.childrenData.evaluationType === "evaluation_type-002") {
      //   (num1 = "2"), (num2 = "11");
      // }
      // switch (key) {
      //   case "city":
      //     this.$router.push({ path: "oceandepth", query: { index: num1 } });
      //     break;

      //   case "country":
      //     this.$router.push({ path: "oceandepth", query: { index: num2 } });
      //     break;
      // }
    },

    getData(index, params) {
      this.loading1 = true;
      this.$get(
        "/epf-planning-analysis/paevaluationanalysis/getPaEvaluationAnalysisByEvaluationType",
        params
      ).then(res => {
        if (res.code == "0") {
          var data = Object.assign(
            this.routerData[index],
            res.paEvaluationAnalysis
          );
          var newData = {};
          this.$get(
            "/epf-planning-analysis/paevaluationanalysis/getAnalysisDataList",
            params
          ).then(res => {
            if (res.code == "0") {
              this.loading1 = false;
              let select = {};
              select.select1 = res.analysisDataList;

              newData = Object.assign(data, select);

              this.routerData[index] = newData;
              return;
            } else {
              this.$message.error(res.msg); // 失败
              return;
            }
          });
        } else {
          this.loading1 = false;
          this.$message.error(res.msg); // 失败
          return;
        }
      });
    },
    getAnalysisDataList(params) {},
    getImModelLibraryList(params) {
      this.$get(
        "/epf-planning-analysis/paevaluationanalysis/getImModelLibraryList",
        params
      ).then(res => {
        if (res.code == "0") {
          this.select2 = res.imModelLibraryList;
          this.$set(this.select2, "select2", res.imModelLibraryList);
        } else {
          this.$message.error(res.msg); // 失败
          return;
        }
      });
    },
    exitFullScreen(el) {
      var el = document,
        cfs =
          el.cancelFullScreen ||
          el.webkitCancelFullScreen ||
          el.mozCancelFullScreen ||
          el.exitFullScreen,
        wscript;

      if (typeof cfs !== "undefined" && cfs) {
        cfs.call(el);

        return;
      }

      if (typeof window.ActiveXObject !== "undefined") {
        wscript = new ActiveXObject("WScript.Shell");

        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    }
  },
  computed: {
    tabs() {
      switch (this.currentRouter) {
        case "1":
          this.isCurrent = "1";
          return [
            { title: "城镇建设", index: "1" },
            { title: "农业耕作", index: "2" }
          ];
          break;
        case "2":
          this.isCurrent = "2";
          return [
            { title: "城镇建设", index: "1" },
            { title: "农业耕作", index: "2" }
          ];
          break;
        case "3":
          return null;
          break;
        case "4":
          this.isCurrent = "4";
          return [
            { title: "渔业资源", index: "4" },
            { title: "港口资源", index: "5" },
            { title: "工业利用", index: "6" }
          ];
          break;
        case "5":
          this.isCurrent = "5";
          return [
            { title: "渔业资源", index: "4" },
            { title: "港口资源", index: "5" },
            { title: "工业利用", index: "6" }
          ];
          break;
        case "6":
          this.isCurrent = "6";
          return [
            { title: "渔业资源", index: "4" },
            { title: "港口资源", index: "5" },
            { title: "工业利用", index: "6" }
          ];
          break;
      }
    }
  },
  components: {
    basemap:()=>import("@/pages/admin/onemap/toolbarItem/basemap"),
    layerlist:()=>import("@/pages/admin/onemap/toolbarItem/layerlist"),
    jumpTo,
    zoom,
    pan,
    more
  },
  created() {
    this.currentRouter = this.$route.query.index;
    this.loadEndRouter.push(this.currentRouter);
    for (let i = 0; i < 10; i++) {
      this.routerData.push({
        nama: "",
        type: "",
        active: "1",
        showEnd: false,
        selectOneArray: [],
        selectTwoArray: [],
        arr1: [{}],
        arr2: [{}],
        select1: []
      });
    }
    let url = `evaluation_type-00${this.currentRouter}`;
    this.getData(this.currentRouter, { evaluationType: url });
    this.getImModelLibraryList({})
  },
  watch: {
    $route(to, form) {
      if (to.path !== "/oceandepth") {
        return;
      }

      let mapApp = this.$findMapApp('suitability22')
      mapApp.map.layers.removeAll()

      let layer = LayerPairs[to.query.index]
      console.info(layer)
      if (layer) {
        mapApp.addLayerToMap(layer)
      }

      this.currentRouter = this.$route.query.index;
      var url = `evaluation_type-00${this.currentRouter}`;

      if (this.loadEndRouter.indexOf(this.currentRouter) === -1) {
        this.loadEndRouter.push(this.currentRouter);
        this.getData(this.currentRouter, { evaluationType: url });
      }
    }
  }
};
</script>
<style scoped>
@import "../../..//admin/onemap/toolbarItem/style.css";
#oceandepth {
  height: 100%;
  width: 100%;
  padding: 20px;
  font-size: 16px;
  color: rgba(32, 32, 32, 1);
}

#oceandepth .el-header {
  padding: 0;
}
#main {
  position: relative;
  background: #e9eef3;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.one {
  background: rgba(255, 255, 255, 1);
  color: rgba(29, 124, 228, 1);
  cursor: pointer;
}
.one.active {
  background: rgba(29, 124, 228, 1);
  color: #fff;
}

#aside {
  padding: 15px;
  margin-left: 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.filter_title_span {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 28px;
  padding-right: 10px;
  text-align: left;
  line-height: 28px;
}
.title {
  font-size: 18px;
  font-weight: 700;
  color: rgba(32, 32, 32, 1);
}

.twoInone {
  font-size: 20px;
  display: flex;
  border: 2px solid rgba(29, 124, 228, 1);
  justify-content: center;
  flex-direction: row;
  text-align: center;
}

.twoInone > div {
  flex: 1;
}

.secondButton {
  margin-left: 5px;
}
.evaluation {
}

.hideBg,
.showBg {
  margin-top: 10px;
}
.text {
  margin-left: 5px;
}

.verticalLine {
  width: 4px;
  height: 16px;
  background: rgba(82, 144, 242, 1);
  border-radius: 2px;
}

.myContent {
  padding-left: 10px;
}
.description > .el-row,
.calculations > .el-row {
  margin-top: 10px;
}
.circles {
  width: 6px;
  height: 6px;
  background: rgba(48, 48, 48, 1);
  border-radius: 50%;
  display: inline-block;
}

.add {
  height: 32px;
  color: rgba(82, 144, 242, 1);
  padding: 0 15px;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(25, 137, 217, 1);
  cursor: pointer;
}
.xLine {
  height: 2px;
  background-color: rgba(82, 144, 242, 1);
  width: 90%;
  margin-top: 10px;
  display: inline-block;
  margin-left: 5%;
}
.line {
  height: 1px;
  margin: 23px 0;
  background: rgba(198, 198, 198, 1);
}
.crude {
  font-weight: 700;
}
.summary {
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}
.showBtn,
.hideBtn {
  text-align: right;
}
.induce {
  margin-left: auto;
  color: rgba(82, 144, 242, 1);
}
#percentage {
  width: 100%;
  height: 130px;
}

#aside .el-header {
  padding: 0;
}
</style>
<style>
#main-container .el-table td,
#main-container .el-table th {
  padding: 6px 0;
}

#aside .el-row {
  margin-bottom: 0;
}
</style>
