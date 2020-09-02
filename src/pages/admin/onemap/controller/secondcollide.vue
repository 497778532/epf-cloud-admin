<template>
  <div v-if="secondcollideDialog" id="secondcollide" v-drag class="EPF-table">
    <div class="data_title_different">
      <span>两规冲突检测结果</span>
      <i class="el-icon-close" @click="handleClickClose" style="position: absolute;right:20px;"></i>
    </div>
    <div class="data_content_different">
      <el-divider></el-divider>
      <el-row style=" display: flex;align-items: center;">
        <el-col :span="8">
          <div class="content_title">两规均为建设用地：12387m²</div>
        </el-col>
        <el-col :span="9">
          <div class="content_title">城规建设用地，土规建设用地：15863m²</div>
        </el-col>
      </el-row>
      <el-row style=" display: flex;align-items: center;">
        <el-col :span="8">
          <div class="content_title">两规均为非建设用地：13645m²</div>
        </el-col>
        <el-col :span="9">
          <div class="content_title">城规建设用地，土规非建设用地：18753m²</div>
        </el-col>
        <el-col :span="7">
          <div class="content_unitSelect">
            <div class="content_title">面积单位：</div>
            <el-select
              v-model="unitData"
              size="mini"
              style="width:150px;"
              @change="selectChartUnit"
            >
              <el-option
                v-for="item in unitList"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- <div style="margin-bottom: 5px">
        <el-radio-group v-model="tableDataType" size="small" @change="switchTableData">
          <el-radio-button label="默认"></el-radio-button>
          <el-radio-button label="详细"></el-radio-button>
        </el-radio-group>
        <div v-show="!loading">
          <p>{{totalArea}}</p>
        </div>
      </div>
      <el-table
        :data="currentTableData"
        class="table"
        border
        show-summary
        v-loading="loading"
        height="450"
        :element-loading-text="loadingText"
        :span-method="cellMerge"
      >
        <el-table-column
          v-for="{ prop, label } in columns"
          :key="prop"
          :prop="prop"
          :label="label"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>-->
      <el-table
        :data="dataList"
        v-loading="loading"
        element-loading-text="数据加载中"
        element-loading-background="rgba(255, 255, 255,0.95)"
        style="width: 100%;min-height:80px;"
        border
      >
        <el-table-column prop="xuhao" label="序号" min-width="120" align="center"></el-table-column>
        <el-table-column prop="chongtuType" label="冲突类型" min-width="250" align="center"></el-table-column>
        <el-table-column prop="chengguiType" label="城规地类名称" min-width="250" align="center"></el-table-column>
        <el-table-column prop="tuguiName" label="土规地类名称" min-width="150" align="center"></el-table-column>
        <el-table-column prop="value" label="冲突面积" min-width="150" align="center"></el-table-column>
        <el-table-column prop="city" label="行政区名称" min-width="150" align="center"></el-table-column>
      </el-table>
      <div style="text-align:right;margin:22px 0px;">
        <el-pagination
          background
          layout="total, prev, pager, next,sizes,jumper"
          :page-sizes="[5,10,15,20]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="totalRecord"
          :current-page.sync="currentPage"
          :page-size="pageSize"
        ></el-pagination>
      </div>
      <el-divider></el-divider>
      <div class="button-list footer">
        <el-button type="primary" size="small" @click="showExport('chart')" :disabled="loading">统计图</el-button>
        <el-button
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
        </download-excel>
      </div>
      <exportChart
        :chartData="dataList"
        @close="isChartShow = false"
        :isChartShow="isChartShow"
        :chartName="titleName"
        :chartUnitName="unitData"
        ref="differentChart"
      ></exportChart>
    </div>
  </div>
</template>

<script>
import exportChart from "./export-chart-different";
export default {
  props: {
    secondcollideDialog: Boolean,
    tableData: Array,
    layerOutFieldsAlias: Map,
    layerFieldsToShow: Array,
    loading: Boolean
  },
  data() {
    return {
      columns: [],
      loadingText: "拼命加载中",
      isChartShow: false,
      tableDataDefault: [],
      tableDataSpecific: [],
      tableDataType: "默认",
      currentTableData: this.tableData,
      totalArea: 0,
      excelFileName: "两规冲突检测分析结果.xls",
      excelHeader: {},
      spanArr: [],

      unitList: [
        {
          value: "1",
          label: "平方米"
        },
        {
          value: "2",
          label: "平方千米"
        },
        {
          value: "3",
          label: "公顷"
        },
        {
          value: "4",
          label: "万公顷"
        },
        {
          value: "5",
          label: "亩"
        },
        {
          value: "6",
          label: "万亩"
        }
      ],
      titleName: "两规冲突检测",
      dataList: [
        {
          xuhao: "010",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: "12002",
          city: "天河区"
        },
        {
          xuhao: "020",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: "14875",
          city: "荔湾区"
        },
        {
          xuhao: "030",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: "13564",
          city: "黄浦区"
        },
        {
          xuhao: "040",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: "20938",
          city: "越秀区"
        },
        {
          xuhao: "050",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: "24195",
          city: "花都区"
        }
      ],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      unitData: "平方米",
      tableNumber: 22
    };
  },
  methods: {
    selectChartUnit(val) {
      console.log(val);
      this.unitData = val.label;
      this.tableNumber = Math.round(Math.random() * 50);
      this.dataList = [
        {
          xuhao: "010",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: Math.round(Math.random() * 30000),
          city: "天河区"
        },
        {
          xuhao: "020",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: Math.round(Math.random() * 30000),
          city: "荔湾区"
        },
        {
          xuhao: "030",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: Math.round(Math.random() * 30000),
          city: "黄浦区"
        },
        {
          xuhao: "040",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: Math.round(Math.random() * 30000),
          city: "越秀区"
        },
        {
          xuhao: "050",
          chongtuType: "两规均为建设用地",
          chengguiType: "居住用地",
          tuguiName: "基本农田",
          value: Math.round(Math.random() * 30000),
          city: "花都区"
        }
      ];
    },
    handleClickClose() {
      this.$emit('closeDialog', false);
      this.secondcollideDialog = false;
      this.isChartShow = false;
    },
    handleSizeChange(val) {
      // 每页条数改变时触发
      this.pageSize = val; // 显示条数改变
    },
    handleCurrentChange(val) {
      // 当前页发生改变时触发
      this.pageNo = val; // 页码改变
    },
    // getSummaries(param) {
    //   // 合并前三项 只显示面积
    //   const { columns, data } = param
    //   const sums = []
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = '合计'
    //       return
    //     } else if (index === 1 || index === 2) {
    //       sums[index] = ' '
    //       return
    //     } else if (index === 3) {
    //       sums[index] = '100%'
    //       return
    //     }
    //     const values = data.map(item => Number(item[column.property]))
    //     if (!values.every(value => isNaN(value))) {
    //       sums[index] = values.reduce((prev, curr) => {
    //         const value = Number(curr)
    //         if (!isNaN(value)) {
    //           return prev + curr
    //         } else {
    //           return prev
    //         }
    //       }, 0)
    //       sums[index] = sums[index].toFixed(5) / 1
    //       sums[index] += ' 公顷'
    //       this.totalArea = '图斑总面积：' + sums[index]
    //     } else {
    //       sums[index] = 'N/A'
    //     }
    //   })

    //   return sums
    // },
    updateTableHeader() {
      this.columns = [];
      if (this.tableData.length === 0) return;
      let layerOutFieldsAlias = this.layerOutFieldsAlias;
      let tableHeader = this.tableData[0];
      var propAlias, data;
      for (let propName in tableHeader) {
        if (propName !== "type") {
          propAlias = layerOutFieldsAlias.get(propName);
          data = {
            prop: propName,
            label: propAlias
          };
          this.columns.push(data);
          this.excelHeader["" + propAlias] = propName;
        }
      }
      this.currentTableData = this.tableData.filter(
        e => e.landuseCode.slice(2, 4) === "00"
      );
      this.calcSpanArr();
    },
    switchTableData() {
      if (this.tableDataType === "默认") {
        this.currentTableData = this.tableData.filter(
          e => e.landuseCode.slice(2, 4) === "00"
        );
      } else if (this.tableDataType === "详细") {
        this.currentTableData = this.tableData.filter(
          e => e.landuseCode.slice(2, 4) === "--"
        );
      }
      this.calcSpanArr();
    },
    calcSpanArr() {
      this.spanArr = [];
      let len = this.currentTableData.length;
      for (var i = 0; i < len; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (
            this.currentTableData[i].type === this.currentTableData[i - 1].type
          ) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    cellMerge({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
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
        this.exportRaw("两规冲突检测分析结果.txt", result);
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
    }
  },
  components: {
    exportChart
  },
  watch: {
    tableData() {
      this.updateTableHeader();
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
#secondcollide {
  position: fixed;
  left: 471px;
  top: 84px;
  width: 900px;
  height: 695px;
}

#secondcollide .table {
  width: 100%;
}
#secondcollide .button-list {
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
  width: 900px;
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
  width: 900px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px;
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
.content_title_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.content_title {
  font-size: 16px;
  margin-right: 20px;
}
.content_unitSelect {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
}
.chart-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
