<template>
  <div v-if="disasterDialog" id="disaster" v-drag class="EPF-table">
    <div class="data_title_different">
      <span>地质灾害点分析结果</span>
      <i class="el-icon-close" @click="handleClickClose" style="position: absolute;right:20px;"></i>
    </div>
    <div class="data_content_different">
      <div class="content_table">
        <div class="content_title">地质灾害点数量：{{dataList.length}}个</div>
      </div>
      <el-table
        :data="dataList"
        v-loading="loading"
        height="300px"
        element-loading-text="数据加载中"
        element-loading-background="rgba(255, 255, 255,0.95)"
        style="width: 100%;min-height:80px;"
        border
        @row-click="fitFeature"
      >
        <el-table-column prop="排查编号" label="排查编号" min-width="120" align="center"></el-table-column>
        <el-table-column prop="市" label="市" min-width="250" align="center"></el-table-column>
        <el-table-column prop="县" label="县" min-width="250" align="center"></el-table-column>
        <el-table-column prop="灾害体类型" label="灾害体类型" min-width="150" align="center"></el-table-column>
        <el-table-column prop="隐患点位置" label="隐患点位置" min-width="150" align="center"></el-table-column>
        <el-table-column prop="灾害体规模" label="灾害体规模" min-width="120" align="center"></el-table-column>
        <el-table-column prop="稳定性" label="稳定性" min-width="250" align="center"></el-table-column>
        <el-table-column prop="潜在经济损" label="潜在经济损" min-width="250" align="center"></el-table-column>
        <el-table-column prop="危害性" label="危害性" min-width="150" align="center"></el-table-column>
        <el-table-column prop="威胁人员" label="威胁人员" min-width="150" align="center"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <div class="button-list footer">
        <el-button type="primary" size="small" @click="showExport('chart')" :disabled="loading">统计图</el-button>
        <!-- <el-button
          type="primary"
          size="small"
          @click="showExport('report')"
          :disabled="loading"
        >导出报告</el-button>
        <download-excel
          :data="currentTableData"
          :fields="excelHeader"
          :name="excelFileName"
          style="display: inline"
        >
          <el-button
            type="primary"
            size="small"
            @click="showExport('execl')"
            :disabled="loading"
          >导出Excel</el-button>
        </download-excel>-->
      </div>
      <exportChart
        :chartData="dataList"
        @close="isChartShow = false"
        :isChartShow="isChartShow"
        :chartName="titleName"
        ref="differentChart"
      ></exportChart>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import exportChart from "./export-chart-different";
import { loadModules } from "esri-loader";

export default {
  props: {
    disasterDialog: Boolean,
    tableData: Array,
    layerOutFieldsAlias: Map,
    layerFieldsToShow: Array,
    loading: Boolean,
    paramdisasterLayer: String,
    paramdistance: Number,
    paramgeometry: Object
  },
  data() {
    return {
      loadingText: "拼命加载中",
      isChartShow: false,
      tableDataDefault: [],
      tableDataSpecific: [],
      tableDataType: "默认",
      currentTableData: this.tableData,
      excelFileName: "地质灾害点分析结果.xls",
      excelHeader: {},
      spanArr: [],
      titleName: "地质灾害点",
      dataList: []
    };
  },
  methods: {
    fitFeature(row) {
      let view = this.$parent.$parent.mapApp.view;
      view.goTo(
        { center: [row.G_Shape.x, row.G_Shape.y], zoom: view.zoom },
        {
          duration: 1000
        }
      );
    },
    handleClickClose() {
      this.$emit("closeDialog", false);
      this.disasterDialog = false;
      this.isChartShow = false;
    },
    showExport(type) {
      if (type === "chart") {
        this.isChartShow = !this.isChartShow;
        let that = this;
        that.$refs.differentChart.drawBarChart();
        that.$refs.differentChart.drawPieChart();
      } else if (type === "report") {
        var result = "";
        var header = "地类名称\t\t地类编码\t\t占比（%）\t\t面积（公顷）\n";
        result += header;
        var cols;
        for (let item of this.currentTableData) {
          cols = `${item.cityName}\t`;
          if (item.cityName.length <= 4) {
            cols += "\t";
          }
          cols += `${item.landuseCode}\t\t${item.landuseRatio}\t\t${item.value}\n`;
          result += cols;
        }
        this.exportRaw("地质灾害点分析结果.txt", result);
      } else if (type === "execl") {
      }
    },
    fakeClick(obj) {
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      obj.dispatchEvent(ev);
    },
    exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      this.fakeClick(save_link);
    },
    getTableData() {
      let mapapp = this.$parent.$parent.mapApp;
      loadModules(["esri/Graphic", "esri/geometry/geometryEngine"]).then(
        ([Graphic, geometryEngine]) => {
          axios
            .post("/api/epf-analysis/analysis/getNearbyDisaster", {
              disasterLayer: this.paramdisasterLayer,
              distance: this.paramdistance,
              geometry: {
                rings: this.paramgeometry.coordinates
              },
              f: "pjson"
            })
            .then(res => {
              mapapp.view.graphics.removeAll();

              let geom = this.paramgeometry;

              mapapp.view.graphics.add(
                new Graphic({
                  geometry: geom,
                  symbol: {
                    type: "simple-fill",
                    color: [255, 255, 255, 0],
                    outline: {
                      color: [0, 255, 0],
                      width: 1
                    }
                  }
                })
              );

              let propertiesData = [];
              for (var key in res) {
                propertiesData.push(res[key].properties);
                mapapp.view.graphics.add(
                  new Graphic({
                    geometry: res[key].properties.G_Shape,
                    symbol: {
                      type: "simple-marker",
                      color: [226, 119, 40],
                      style: "triangle",
                      size: "18",
                      outline: {
                        color: [255, 255, 255],
                        width: 2
                      }
                    },
                    attributes: {
                      dnumber: res[key].properties["排查编号"],
                      dtype: res[key].properties["灾害体类型"],
                      dlevel: res[key].properties["灾害体规模"],
                      dlocation: res[key].properties["隐患点位置"]
                    },
                    popupTemplate: {
                      title: "排查编号:{dnumber}",
                      content: [
                        {
                          type: "fields",
                          fieldInfos: [
                            {
                              fieldName: "dtype"
                            },
                            {
                              fieldName: "dlevel"
                            },
                            {
                              fieldName: "dlocation"
                            }
                          ]
                        }
                      ]
                    }
                  })
                );
              }
              this.dataList = propertiesData;
            });
        }
      );
    }
  },
  components: {
    exportChart
  },
  watch: {
    paramdisasterLayer() {
      this.getTableData();
    },
    paramdistance() {
      this.getTableData();
    },
    paramgeometry() {
      this.getTableData();
    }
  },
  directives: {
    drag: {
      inserted: function(el, binding, vNode) {
        el.setAttribute("style", "position: fixed;");
      },
      bind: function(el, bindding, vNode) {
        el.setAttribute("draggable", true);
        let left, top, width, height;
        el._dragstart = function(event) {
          event.stopPropagation();
          left = event.clientX - el.offsetLeft;
          top = event.clientY - el.offsetTop;
          width = el.offsetWidth;
          height = el.offsetHeight;
        };
        el._checkPosition = function() {
          // 防止被拖出边界
          let width = el.offsetWidth;
          let height = el.offsetHeight;
          let left = Math.min(el.offsetLeft, document.body.clientWidth - width);
          left = Math.max(0, left);
          let top = Math.min(el.offsetTop, document.body.clientHeight - height);
          top = Math.max(0, top);
          el.style.left = left + "px";
          el.style.top = top + "px";
          el.style.width = width + "px";
          el.style.height = height + "px";
        };
        el._dragEnd = function(event) {
          event.stopPropagation();
          left = event.clientX - left;
          top = event.clientY - top;
          el.style.left = left + "px";
          el.style.top = top + "px";
          el.style.width = width + "px";
          el.style.height = height + "px";
          el._checkPosition();
        };
        el._documentAllowDraop = function(event) {
          event.preventDefault();
        };
        document.body.addEventListener("dragover", el._documentAllowDraop);
        el.addEventListener("dragstart", el._dragstart);
        el.addEventListener("dragend", el._dragEnd);
        window.addEventListener("resize", el._checkPosition);
      },
      unbind: function(el, bindding, vNode) {
        document.body.removeEventListener("dragover", el._documentAllowDraop);
        el.removeEventListener("dragstart", el._dragstart);
        el.removeEventListener("dragend", el._dragEnd);
        window.removeEventListener("resize", el._checkPosition);
        delete el._documentAllowDraop;
        delete el._dragstart;
        delete el._dragEnd;
        delete el._checkPosition;
      }
    }
  }
};
</script>

<style scoped>
#disaster {
  position: fixed;
  left: 471px;
  top: 84px;
  width: 800px;
  height: 600px;
}

#disaster .table {
  width: 100%;
}
#disaster .button-list {
  text-align: right;
  margin: 8px 0px;
  margin-top: 15px;
}

#dataDetailBox {
  position: absolute;
  top: 6.625rem;
  right: 0.9rem;
}
.data_title_different {
  width: 800px;
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0px 5px 0 rgba(0, 0, 0, 0.5);
  /* position: relative; */
}
.data_content_different {
  width: 800px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px 20px 10px 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  /* border: 1px solid #999; */
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.content_table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
.content_title {
  font-size: 16px;
}
.chart-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
