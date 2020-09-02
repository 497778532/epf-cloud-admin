import echarts from "echarts";

export default {
  data() {
    return {
      beginYear: "",
      endYear: "",

      isShowData: true,

      xzhouData: [],

      legendDataForBar1: [],
      seriesAllDataForBar1: [],
      legendDataForBar2: [],
      seriesAllDataForBar2: [],
      legendDataForBar3: [],
      seriesAllDataForBar3: [],
      legendDataForBar4: [],
      seriesAllDataForBar4: [],
      legendDataForBar5: [],
      seriesAllDataForBar5: [],
      legendDataForBar6: [],
      seriesAllDataForBar6: [],
      legendDataForBar7: [],
      seriesAllDataForBar7: [],
      legendDataForBar8: [],
      seriesAllDataForBar8: [],
      legendDataForBar9: [],
      seriesAllDataForBar9: [],
      legendDataForBar10: [],
      seriesAllDataForBar10: [],

      legendDataForLine1: [],
      seriesAllDataForLine1: [],
      legendDataForLine2: [],
      seriesAllDataForLine2: [],
      legendDataForLine3: [],
      seriesAllDataForLine3: [],
      legendDataForLine4: [],
      seriesAllDataForLine4: [],
      legendDataForLine5: [],
      seriesAllDataForLine5: [],
      legendDataForLine6: [],
      seriesAllDataForLine6: [],
      legendDataForLine7: [],
      seriesAllDataForLine7: [],
      legendDataForLine8: [],
      seriesAllDataForLine8: [],
      legendDataForLine9: [],
      seriesAllDataForLine9: [],
      legendDataForLine10: [],
      seriesAllDataForLine10: [],
      legendDataForLine11: [],
      seriesAllDataForLine11: [],
      legendDataForLine12: [],
      seriesAllDataForLine12: [],
      legendDataForLine13: [],
      seriesAllDataForLine13: [],

      legendDataForBarT1: [],
      legendDataForLineT1: [],
      legendDataForBarLineT1: [],
      seriesAllDataForBarT1: [],
      seriesAllDataForLineT1: [],
      legendDataForBarT2: [],
      legendDataForLineT2: [],
      legendDataForBarLineT2: [],
      seriesAllDataForBarT2: [],
      seriesAllDataForLineT2: [],
      legendDataForBarT3: [],
      legendDataForLineT3: [],
      legendDataForBarLineT3: [],
      seriesAllDataForBarT3: [],
      seriesAllDataForLineT3: [],
      legendDataForBarT4: [],
      legendDataForLineT4: [],
      legendDataForBarLineT4: [],
      seriesAllDataForBarT4: [],
      seriesAllDataForLineT4: [],
      legendDataForBarT5: [],
      legendDataForLineT5: [],
      legendDataForBarLineT5: [],
      seriesAllDataForBarT5: [],
      seriesAllDataForLineT5: [],
      legendDataForBarT6: [],
      legendDataForLineT6: [],
      legendDataForBarLineT6: [],
      seriesAllDataForBarT6: [],
      seriesAllDataForLineT6: [],
      legendDataForBarT7: [],
      legendDataForLineT7: [],
      legendDataForBarLineT7: [],
      seriesAllDataForBarT7: [],
      seriesAllDataForLineT7: [],
      legendDataForBarT8: [],
      legendDataForLineT8: [],
      legendDataForBarLineT8: [],
      seriesAllDataForBarT8: [],
      seriesAllDataForLineT8: [],
      legendDataForBarT9: [],
      legendDataForLineT9: [],
      legendDataForBarLineT9: [],
      seriesAllDataForBarT9: [],
      seriesAllDataForLineT9: [],
      legendDataForBarT10: [],
      legendDataForLineT10: [],
      legendDataForBarLineT10: [],
      seriesAllDataForBarT10: [],
      seriesAllDataForLineT10: [],

      cjActiveName: "Chart",

      showDataNumberForBar1: false,
      showDataNumberForBar2: false,
      showDataNumberForBar3: false,
      showDataNumberForBar4: false,
      showDataNumberForBar5: false,
      showDataNumberForBar6: false,
      showDataNumberForBar7: false,
      showDataNumberForBar8: false,
      showDataNumberForBar9: false,
      showDataNumberForBar10: false,

      showDataNumberForLine1: false,
      showDataNumberForLine2: false,
      showDataNumberForLine3: false,
      showDataNumberForLine4: false,
      showDataNumberForLine5: false,
      showDataNumberForLine6: false,
      showDataNumberForLine7: false,
      showDataNumberForLine8: false,
      showDataNumberForLine9: false,
      showDataNumberForLine10: false,
      showDataNumberForLine11: false,
      showDataNumberForLine12: false,
      showDataNumberForLine13: false,

      showDataNumberForBarLine1: false,
      showDataNumberForBarLine2: false,
      showDataNumberForBarLine3: false,
      showDataNumberForBarLine4: false,
      showDataNumberForBarLine5: false,
      showDataNumberForBarLine6: false,
      showDataNumberForBarLine7: false,
      showDataNumberForBarLine8: false,
      showDataNumberForBarLine9: false,
      showDataNumberForBarLine10: false,
      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      listData: []
    };
  },
  methods: {
    turnTable() {
      this.cjActiveName = "Table";
      this.handleCheckedTypesChange();
    },
    getBeginYear(val) {
      if (this.endYear) {
        if (val >= this.endYear) {
          this.beginYear = "";
          this.$message.error("开始年份 不能大于或等于 结束年份");
        }
      }
    },
    getEndYear(val) {
      if (this.beginYear) {
        if (val <= this.beginYear) {
          this.endYear = "";
          this.$message.error("结束年份 不能小于或等于 开始年份");
        }
      }
    },
    revealBar1() {
      this.showDataNumberForBar1 = !this.showDataNumberForBar1;
    },
    revealBar2() {
      this.showDataNumberForBar2 = !this.showDataNumberForBar2;
    },
    revealBar3() {
      this.showDataNumberForBar3 = !this.showDataNumberForBar3;
    },
    revealBar4() {
      this.showDataNumberForBar4 = !this.showDataNumberForBar4;
    },
    revealBar5() {
      this.showDataNumberForBar5 = !this.showDataNumberForBar5;
    },
    revealBar6() {
      this.showDataNumberForBar6 = !this.showDataNumberForBar6;
    },
    revealBar7() {
      this.showDataNumberForBar7 = !this.showDataNumberForBar7;
    },
    revealBar8() {
      this.showDataNumberForBar8 = !this.showDataNumberForBar8;
    },
    revealBar9() {
      this.showDataNumberForBar9 = !this.showDataNumberForBar9;
    },
    revealBar10() {
      this.showDataNumberForBar10 = !this.showDataNumberForBar10;
    },
    revealLine1() {
      this.showDataNumberForLine1 = !this.showDataNumberForLine1;
    },
    revealLine2() {
      this.showDataNumberForLine2 = !this.showDataNumberForLine2;
    },
    revealLine3() {
      this.showDataNumberForLine3 = !this.showDataNumberForLine3;
    },
    revealLine4() {
      this.showDataNumberForLine4 = !this.showDataNumberForLine4;
    },
    revealLine5() {
      this.showDataNumberForLine5 = !this.showDataNumberForLine5;
    },
    revealLine6() {
      this.showDataNumberForLine6 = !this.showDataNumberForLine6;
    },
    revealLine7() {
      this.showDataNumberForLine7 = !this.showDataNumberForLine7;
    },
    revealLine8() {
      this.showDataNumberForLine8 = !this.showDataNumberForLine8;
    },
    revealLine9() {
      this.showDataNumberForLine9 = !this.showDataNumberForLine9;
    },
    revealLine10() {
      this.showDataNumberForLine10 = !this.showDataNumberForLine10;
    },
    revealLine11() {
      this.showDataNumberForLine11 = !this.showDataNumberForLine11;
    },
    revealLine12() {
      this.showDataNumberForLine12 = !this.showDataNumberForLine12;
    },
    revealLine13() {
      this.showDataNumberForLine13 = !this.showDataNumberForLine13;
    },
    revealBarLine1() {
      this.showDataNumberForBarLine1 = !this.showDataNumberForBarLine1;
    },
    revealBarLine2() {
      this.showDataNumberForBarLine2 = !this.showDataNumberForBarLine2;
    },
    revealBarLine3() {
      this.showDataNumberForBarLine3 = !this.showDataNumberForBarLine3;
    },
    revealBarLine4() {
      this.showDataNumberForBarLine4 = !this.showDataNumberForBarLine4;
    },
    revealBarLine5() {
      this.showDataNumberForBarLine5 = !this.showDataNumberForBarLine5;
    },
    revealBarLine6() {
      this.showDataNumberForBarLine6 = !this.showDataNumberForBarLine6;
    },
    revealBarLine7() {
      this.showDataNumberForBarLine7 = !this.showDataNumberForBarLine7;
    },
    revealBarLine8() {
      this.showDataNumberForBarLine8 = !this.showDataNumberForBarLine8;
    },
    revealBarLine9() {
      this.showDataNumberForBarLine9 = !this.showDataNumberForBarLine9;
    },
    revealBarLine10() {
      this.showDataNumberForBarLine10 = !this.showDataNumberForBarLine10;
    },
    handleSizeChange(val) {
      // 每页条数改变时触发
      this.$data.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      // 当前页发生改变时触发
      this.currentPage = val; // 页码改变
    },
    // 柱状图
    barDrawLine1() {
      setTimeout(() => {
        let barChart1 = echarts.init(document.getElementById("barChart1"));
        document.getElementById("barChart1").style.width = 100 + "%";
        document.getElementById("barChart1").style.height = 100 + "%";
        barChart1.resize(); // 直接加这句即可
      }, 0);
      let barChart1 = echarts.init(document.getElementById("barChart1"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar1;
      seriesAllData = this.seriesAllDataForBar1;

      if (this.showDataNumberForBar1 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart1.setOption(option, true);
    },
    barDrawLine2() {
      setTimeout(() => {
        let barChart2 = echarts.init(document.getElementById("barChart2"));
        document.getElementById("barChart2").style.width = 100 + "%";
        document.getElementById("barChart2").style.height = 100 + "%";
        barChart2.resize(); // 直接加这句即可
      }, 0);
      let barChart2 = echarts.init(document.getElementById("barChart2"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar2;
      seriesAllData = this.seriesAllDataForBar2;

      if (this.showDataNumberForBar2 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart2.setOption(option, true);
    },
    barDrawLine3() {
      setTimeout(() => {
        let barChart3 = echarts.init(document.getElementById("barChart3"));
        document.getElementById("barChart3").style.width = 100 + "%";
        document.getElementById("barChart3").style.height = 100 + "%";
        barChart3.resize(); // 直接加这句即可
      }, 0);
      let barChart3 = echarts.init(document.getElementById("barChart3"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar3;
      seriesAllData = this.seriesAllDataForBar3;

      if (this.showDataNumberForBar3 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart3.setOption(option, true);
    },
    barDrawLine4() {
      setTimeout(() => {
        let barChart4 = echarts.init(document.getElementById("barChart4"));
        document.getElementById("barChart4").style.width = 100 + "%";
        document.getElementById("barChart4").style.height = 100 + "%";
        barChart4.resize(); // 直接加这句即可
      }, 0);
      let barChart4 = echarts.init(document.getElementById("barChart4"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar4;
      seriesAllData = this.seriesAllDataForBar4;

      if (this.showDataNumberForBar4 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart4.setOption(option, true);
    },
    barDrawLine5() {
      setTimeout(() => {
        let barChart5 = echarts.init(document.getElementById("barChart5"));
        document.getElementById("barChart5").style.width = 100 + "%";
        document.getElementById("barChart5").style.height = 100 + "%";
        barChart5.resize(); // 直接加这句即可
      }, 0);
      let barChart5 = echarts.init(document.getElementById("barChart5"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar5;
      seriesAllData = this.seriesAllDataForBar5;

      if (this.showDataNumberForBar5 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart5.setOption(option, true);
    },
    barDrawLine6() {
      setTimeout(() => {
        let barChart6 = echarts.init(document.getElementById("barChart6"));
        document.getElementById("barChart6").style.width = 100 + "%";
        document.getElementById("barChart6").style.height = 100 + "%";
        barChart6.resize(); // 直接加这句即可
      }, 0);
      let barChart6 = echarts.init(document.getElementById("barChart6"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar6;
      seriesAllData = this.seriesAllDataForBar6;

      if (this.showDataNumberForBar6 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart6.setOption(option, true);
    },
    barDrawLine7() {
      setTimeout(() => {
        let barChart7 = echarts.init(document.getElementById("barChart7"));
        document.getElementById("barChart7").style.width = 100 + "%";
        document.getElementById("barChart7").style.height = 100 + "%";
        barChart7.resize(); // 直接加这句即可
      }, 0);
      let barChart7 = echarts.init(document.getElementById("barChart7"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar7;
      seriesAllData = this.seriesAllDataForBar7;

      if (this.showDataNumberForBar7 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart7.setOption(option, true);
    },
    barDrawLine8() {
      setTimeout(() => {
        let barChart8 = echarts.init(document.getElementById("barChart8"));
        document.getElementById("barChart8").style.width = 100 + "%";
        document.getElementById("barChart8").style.height = 100 + "%";
        barChart8.resize(); // 直接加这句即可
      }, 0);
      let barChart8 = echarts.init(document.getElementById("barChart8"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar8;
      seriesAllData = this.seriesAllDataForBar8;

      if (this.showDataNumberForBar8 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart8.setOption(option, true);
    },
    // 特殊表
    barDrawLine9() {
      setTimeout(() => {
        let barChart9 = echarts.init(document.getElementById("barChart9"));
        document.getElementById("barChart9").style.width = 100 + "%";
        document.getElementById("barChart9").style.height = 100 + "%";
        barChart9.resize(); // 直接加这句即可
      }, 0);
      let barChart9 = echarts.init(document.getElementById("barChart9"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar9;
      seriesAllData = this.seriesAllDataForBar9;

      if (this.showDataNumberForBar9 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart9.setOption(option, true);
    },
    // 特殊表
    barDrawLine10() {
      setTimeout(() => {
        let barChart10 = echarts.init(document.getElementById("barChart10"));
        document.getElementById("barChart10").style.width = 100 + "%";
        document.getElementById("barChart10").style.height = 100 + "%";
        barChart10.resize(); // 直接加这句即可
      }, 0);
      let barChart10 = echarts.init(document.getElementById("barChart10"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#50a5f4",
        "#7cf5e3",
        "#0ebbf1",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForBar10;
      seriesAllData = this.seriesAllDataForBar10;

      if (this.showDataNumberForBar10 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            stack: "地区",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "bar",
            stack: "地区",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };
      barChart10.setOption(option, true);
    },
    // 折线图
    lineDrawLine1() {
      setTimeout(() => {
        let lineChart1 = echarts.init(document.getElementById("lineChart1"));
        document.getElementById("lineChart1").style.width = 100 + "%";
        document.getElementById("lineChart1").style.height = 100 + "%";
        lineChart1.resize(); // 直接加这句即可
      }, 0);
      let lineChart1 = echarts.init(document.getElementById("lineChart1"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine1;
      seriesAllData = this.seriesAllDataForLine1;

      if (this.showDataNumberForLine1 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart1.setOption(option, true);
    },
    lineDrawLine2() {
      setTimeout(() => {
        let lineChart2 = echarts.init(document.getElementById("lineChart2"));
        document.getElementById("lineChart2").style.width = 100 + "%";
        document.getElementById("lineChart2").style.height = 100 + "%";
        lineChart2.resize(); // 直接加这句即可
      }, 0);
      let lineChart2 = echarts.init(document.getElementById("lineChart2"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine2;
      seriesAllData = this.seriesAllDataForLine2;

      if (this.showDataNumberForLine2 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart2.setOption(option, true);
    },
    lineDrawLine3() {
      setTimeout(() => {
        let lineChart3 = echarts.init(document.getElementById("lineChart3"));
        document.getElementById("lineChart3").style.width = 100 + "%";
        document.getElementById("lineChart3").style.height = 100 + "%";
        lineChart3.resize(); // 直接加这句即可
      }, 0);
      let lineChart3 = echarts.init(document.getElementById("lineChart3"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine3;
      seriesAllData = this.seriesAllDataForLine3;

      if (this.showDataNumberForLine3 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart3.setOption(option, true);
    },
    lineDrawLine4() {
      setTimeout(() => {
        let lineChart4 = echarts.init(document.getElementById("lineChart4"));
        document.getElementById("lineChart4").style.width = 100 + "%";
        document.getElementById("lineChart4").style.height = 100 + "%";
        lineChart4.resize(); // 直接加这句即可
      }, 0);
      let lineChart4 = echarts.init(document.getElementById("lineChart4"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine4;
      seriesAllData = this.seriesAllDataForLine4;

      if (this.showDataNumberForLine4 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart4.setOption(option, true);
    },
    lineDrawLine5() {
      setTimeout(() => {
        let lineChart5 = echarts.init(document.getElementById("lineChart5"));
        document.getElementById("lineChart5").style.width = 100 + "%";
        document.getElementById("lineChart5").style.height = 100 + "%";
        lineChart5.resize(); // 直接加这句即可
      }, 0);
      let lineChart5 = echarts.init(document.getElementById("lineChart5"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine5;
      seriesAllData = this.seriesAllDataForLine5;

      if (this.showDataNumberForLine5 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart5.setOption(option, true);
    },
    lineDrawLine6() {
      setTimeout(() => {
        let lineChart6 = echarts.init(document.getElementById("lineChart6"));
        document.getElementById("lineChart6").style.width = 100 + "%";
        document.getElementById("lineChart6").style.height = 100 + "%";
        lineChart6.resize(); // 直接加这句即可
      }, 0);
      let lineChart6 = echarts.init(document.getElementById("lineChart6"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine6;
      seriesAllData = this.seriesAllDataForLine6;

      if (this.showDataNumberForLine6 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart6.setOption(option, true);
    },
    lineDrawLine7() {
      setTimeout(() => {
        let lineChart7 = echarts.init(document.getElementById("lineChart7"));
        document.getElementById("lineChart7").style.width = 100 + "%";
        document.getElementById("lineChart7").style.height = 100 + "%";
        lineChart7.resize(); // 直接加这句即可
      }, 0);
      let lineChart7 = echarts.init(document.getElementById("lineChart7"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine7;
      seriesAllData = this.seriesAllDataForLine7;

      if (this.showDataNumberForLine7 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart7.setOption(option, true);
    },
    lineDrawLine8() {
      setTimeout(() => {
        let lineChart8 = echarts.init(document.getElementById("lineChart8"));
        document.getElementById("lineChart8").style.width = 100 + "%";
        document.getElementById("lineChart8").style.height = 100 + "%";
        lineChart8.resize(); // 直接加这句即可
      }, 0);
      let lineChart8 = echarts.init(document.getElementById("lineChart8"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine8;
      seriesAllData = this.seriesAllDataForLine8;

      if (this.showDataNumberForLine8 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart8.setOption(option, true);
    },
    lineDrawLine9() {
      setTimeout(() => {
        let lineChart9 = echarts.init(document.getElementById("lineChart9"));
        document.getElementById("lineChart9").style.width = 100 + "%";
        document.getElementById("lineChart9").style.height = 100 + "%";
        lineChart9.resize(); // 直接加这句即可
      }, 0);
      let lineChart9 = echarts.init(document.getElementById("lineChart9"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine9;
      seriesAllData = this.seriesAllDataForLine9;

      if (this.showDataNumberForLine9 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart9.setOption(option, true);
    },
    lineDrawLine10() {
      setTimeout(() => {
        let lineChart10 = echarts.init(document.getElementById("lineChart10"));
        document.getElementById("lineChart10").style.width = 100 + "%";
        document.getElementById("lineChart10").style.height = 100 + "%";
        lineChart10.resize(); // 直接加这句即可
      }, 0);
      let lineChart10 = echarts.init(document.getElementById("lineChart10"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine10;
      seriesAllData = this.seriesAllDataForLine10;

      if (this.showDataNumberForLine10 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart10.setOption(option, true);
    },
    lineDrawLine11() {
      setTimeout(() => {
        let lineChart11 = echarts.init(document.getElementById("lineChart11"));
        document.getElementById("lineChart11").style.width = 100 + "%";
        document.getElementById("lineChart11").style.height = 100 + "%";
        lineChart11.resize(); // 直接加这句即可
      }, 0);
      let lineChart11 = echarts.init(document.getElementById("lineChart11"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      legendData = this.legendDataForLine11;
      seriesAllData = this.seriesAllDataForLine11;

      if (this.showDataNumberForLine11 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart11.setOption(option, true);
    },
    // 特殊表
    lineDrawLine12() {
      setTimeout(() => {
        let lineChart12 = echarts.init(document.getElementById("lineChart12"));
        document.getElementById("lineChart12").style.width = 100 + "%";
        document.getElementById("lineChart12").style.height = 100 + "%";
        lineChart12.resize(); // 直接加这句即可
      }, 0);
      let lineChart12 = echarts.init(document.getElementById("lineChart12"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      if (this.change1 === false) {
        legendData = this.legendDataMR1;
        seriesAllData = this.seriesAllDataMR1;
      } else {
        for (let key in this.checkChartData1) {
          legendData.push(this.checkChartData1[key][0].label);
          seriesAllData.push(this.checkChartData1[key][0].value);
        }
      }

      if (this.showDataNumberForLine12 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart12.setOption(option, true);
    },
    // 特殊表
    lineDrawLine13() {
      setTimeout(() => {
        let lineChart13 = echarts.init(document.getElementById("lineChart13"));
        document.getElementById("lineChart13").style.width = 100 + "%";
        document.getElementById("lineChart13").style.height = 100 + "%";
        lineChart13.resize(); // 直接加这句即可
      }, 0);
      let lineChart13 = echarts.init(document.getElementById("lineChart13"));

      let XZhouData = this.xzhouData;
      let option = {};
      let series = [];

      let colorData = [
        "#5AD8A6",
        "#5B8FF9",
        "#5D7092",
        "#F6BD16",
        "#0ebbf1",
        "#7cf5e3",
        "#4ca0fe",
        "#ca6bfe",
        "#e9c437",
        "#5ca7b0",
        "#88ca6e",
        "#fe1800",
        "#f87700",
        "#dc5b55",
        "#0ebbf1",
        "#1d7ce4",
        "#ce1365",
        "#aeb3b7",
        "#28bdb7",
        "#e0bebd",
        "#5c30cd",
        "#d07cb7",
        "#f25f33",
        "#c961ff",
        "#a6c84c"
      ];

      let legendData = [];
      let seriesAllData = [];

      if (this.change2 === false) {
        legendData = this.legendDataMR2;
        seriesAllData = this.seriesAllDataMR2;
      } else {
        for (let key in this.checkChartData2) {
          legendData.push(this.checkChartData2[key][0].label);
          seriesAllData.push(this.checkChartData2[key][0].value);
        }
      }

      if (this.showDataNumberForLine13 === false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              color: colorData[i]
            },
            data: seriesAllData[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          });
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "left",
          top: "0%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          textStyle: {
            fontSize: "18px",
            color: "#4E4E4E"
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series
      };

      lineChart13.setOption(option, true);
    },
    // 柱状图+折线图
    barlineDrawLine1() {
      setTimeout(() => {
        let barlineChart1 = echarts.init(
          document.getElementById("barlineChart1")
        );
        document.getElementById("barlineChart1").style.width = 100 + "%";
        document.getElementById("barlineChart1").style.height = 100 + "%";
        barlineChart1.resize(); // 直接加这句即可
      }, 0);
      let barlineChart1 = echarts.init(
        document.getElementById("barlineChart1")
      );

      let XZhouData = this.xzhouData;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT1;
      legendData1 = this.legendDataForBarT1;
      legendData2 = this.legendDataForLineT1;
      seriesAllData1 = this.seriesAllDataForBarT1;
      seriesAllData2 = this.seriesAllDataForLineT1;

      if (this.showDataNumberForBarLine1 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart1.setOption(option, true);
    },
    barlineDrawLine2() {
      setTimeout(() => {
        let barlineChart2 = echarts.init(
          document.getElementById("barlineChart2")
        );
        document.getElementById("barlineChart2").style.width = 100 + "%";
        document.getElementById("barlineChart2").style.height = 100 + "%";
        barlineChart2.resize(); // 直接加这句即可
      }, 0);
      let barlineChart2 = echarts.init(
        document.getElementById("barlineChart2")
      );

      let XZhouData = this.xzhouData;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT2;
      legendData1 = this.legendDataForBarT2;
      legendData2 = this.legendDataForLineT2;
      seriesAllData1 = this.seriesAllDataForBarT2;
      seriesAllData2 = this.seriesAllDataForLineT2;

      if (this.showDataNumberForBarLine2 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart2.setOption(option, true);
    },
    barlineDrawLine3() {
      setTimeout(() => {
        let barlineChart3 = echarts.init(
          document.getElementById("barlineChart3")
        );
        document.getElementById("barlineChart3").style.width = 100 + "%";
        document.getElementById("barlineChart3").style.height = 100 + "%";
        barlineChart3.resize(); // 直接加这句即可
      }, 0);
      let barlineChart3 = echarts.init(
        document.getElementById("barlineChart3")
      );

      let XZhouData = this.xzhouData;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT3;
      legendData1 = this.legendDataForBarT3;
      legendData2 = this.legendDataForLineT3;
      seriesAllData1 = this.seriesAllDataForBarT3;
      seriesAllData2 = this.seriesAllDataForLineT3;

      if (this.showDataNumberForBarLine3 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart3.setOption(option, true);
    },
    barlineDrawLine4() {
      setTimeout(() => {
        let barlineChart4 = echarts.init(
          document.getElementById("barlineChart4")
        );
        document.getElementById("barlineChart4").style.width = 100 + "%";
        document.getElementById("barlineChart4").style.height = 100 + "%";
        barlineChart4.resize(); // 直接加这句即可
      }, 0);
      let barlineChart4 = echarts.init(
        document.getElementById("barlineChart4")
      );

      let XZhouData = this.xzhouData;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT4;
      legendData1 = this.legendDataForBarT4;
      legendData2 = this.legendDataForLineT4;
      seriesAllData1 = this.seriesAllDataForBarT4;
      seriesAllData2 = this.seriesAllDataForLineT4;

      if (this.showDataNumberForBarLine4 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true
          // x: 100, // 控制x轴文字与底部的距离
          // y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart4.setOption(option, true);
    },
    // 特殊表
    barlineDrawLine5() {
      setTimeout(() => {
        let barlineChart5 = echarts.init(
          document.getElementById("barlineChart5")
        );
        document.getElementById("barlineChart5").style.width = 100 + "%";
        document.getElementById("barlineChart5").style.height = 100 + "%";
        barlineChart5.resize(); // 直接加这句即可
      }, 0);
      let barlineChart5 = echarts.init(
        document.getElementById("barlineChart5")
      );

      let XZhouData = this.xzhouData1;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT5;
      legendData1 = this.legendDataForBarT5;
      legendData2 = this.legendDataForLineT5;
      seriesAllData1 = this.seriesAllDataForBarT5;
      seriesAllData2 = this.seriesAllDataForLineT5;

      if (this.showDataNumberForBarLine5 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart5.setOption(option, true);
    },
    // 特殊表
    barlineDrawLine6() {
      setTimeout(() => {
        let barlineChart6 = echarts.init(
          document.getElementById("barlineChart6")
        );
        document.getElementById("barlineChart6").style.width = 100 + "%";
        document.getElementById("barlineChart6").style.height = 100 + "%";
        barlineChart6.resize(); // 直接加这句即可
      }, 0);
      let barlineChart6 = echarts.init(
        document.getElementById("barlineChart6")
      );

      let XZhouData = this.xzhouData;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT6;
      legendData1 = this.legendDataForBarT6;
      legendData2 = this.legendDataForLineT6;
      seriesAllData1 = this.seriesAllDataForBarT6;
      seriesAllData2 = this.seriesAllDataForLineT6;

      if (this.showDataNumberForBarLine6 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart6.setOption(option, true);
    },
    // 特殊表
    barlineDrawLine7() {
      setTimeout(() => {
        let barlineChart7 = echarts.init(
          document.getElementById("barlineChart7")
        );
        document.getElementById("barlineChart7").style.width = 100 + "%";
        document.getElementById("barlineChart7").style.height = 100 + "%";
        barlineChart7.resize(); // 直接加这句即可
      }, 0);
      let barlineChart7 = echarts.init(
        document.getElementById("barlineChart7")
      );

      let XZhouData = this.xzhouData;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT7;
      legendData1 = this.legendDataForBarT7;
      legendData2 = this.legendDataForLineT7;
      seriesAllData1 = this.seriesAllDataForBarT7;
      seriesAllData2 = this.seriesAllDataForLineT7;

      if (this.showDataNumberForBarLine7 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart7.setOption(option, true);
    },
    // 特殊表
    barlineDrawLine8() {
      setTimeout(() => {
        let barlineChart8 = echarts.init(
          document.getElementById("barlineChart8")
        );
        document.getElementById("barlineChart8").style.width = 100 + "%";
        document.getElementById("barlineChart8").style.height = 100 + "%";
        barlineChart8.resize(); // 直接加这句即可
      }, 0);
      let barlineChart8 = echarts.init(
        document.getElementById("barlineChart8")
      );

      let XZhouData = this.xzhouData;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT8;
      legendData1 = this.legendDataForBarT8;
      legendData2 = this.legendDataForLineT8;
      seriesAllData1 = this.seriesAllDataForBarT8;
      seriesAllData2 = this.seriesAllDataForLineT8;

      if (this.showDataNumberForBarLine8 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart8.setOption(option, true);
    },
    // 特殊表
    barlineDrawLine9() {
      setTimeout(() => {
        let barlineChart9 = echarts.init(
          document.getElementById("barlineChart9")
        );
        document.getElementById("barlineChart9").style.width = 100 + "%";
        document.getElementById("barlineChart9").style.height = 100 + "%";
        barlineChart9.resize(); // 直接加这句即可
      }, 0);
      let barlineChart9 = echarts.init(
        document.getElementById("barlineChart9")
      );

      let XZhouData = this.xzhouData;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT9;
      legendData1 = this.legendDataForBarT9;
      legendData2 = this.legendDataForLineT9;
      seriesAllData1 = this.seriesAllDataForBarT9;
      seriesAllData2 = this.seriesAllDataForLineT9;

      if (this.showDataNumberForBarLine9 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart9.setOption(option, true);
    },
    // 特殊表
    barlineDrawLine10() {
      setTimeout(() => {
        let barlineChart10 = echarts.init(
          document.getElementById("barlineChart10")
        );
        document.getElementById("barlineChart10").style.width = 100 + "%";
        document.getElementById("barlineChart10").style.height = 100 + "%";
        barlineChart10.resize(); // 直接加这句即可
      }, 0);
      let barlineChart10 = echarts.init(
        document.getElementById("barlineChart10")
      );

      let XZhouData = this.xzhouData;
      let option = {};
      let series0 = [];
      let series1 = [];
      let series2 = [];

      let colorData1 = ["#4295EF", "#5AD8A6", "#5B8FF9", "#5D7092", "#F6BD16"];
      let colorData2 = [
        "#F6BD16",
        "#c961ff",
        "#f25f33",
        "#f891fc",
        "#4e81f7",
        "#f58d56",
        "#5c30cd",
        "#cd366d",
        "#50b8ef",
        "#9ae883"
      ];

      let legendData = [];
      let legendData1 = [];
      let legendData2 = [];
      let seriesAllData1 = [];
      let seriesAllData2 = [];

      legendData = this.legendDataForBarLineT10;
      legendData1 = this.legendDataForBarT10;
      legendData2 = this.legendDataForLineT10;
      seriesAllData1 = this.seriesAllDataForBarT10;
      seriesAllData2 = this.seriesAllDataForLineT10;

      if (this.showDataNumberForBarLine10 === false) {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            itemStyle: {
              color: colorData2[i]
            },
            data: seriesAllData2[i] // 数据
          });
        }
      } else {
        for (var i = 0; i < legendData1.length; i++) {
          series1.push({
            name: legendData1[i],
            type: "bar",
            barWidth: null, // 默认自适应
            barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData1[i]
                }
              }
            },
            data: seriesAllData1[i], // 数据
            itemStyle: {
              normal: {
                color: colorData1[i]
              }
            }
          });
        }
        for (var i = 0; i < legendData2.length; i++) {
          series2.push({
            name: legendData2[i],
            type: "line",
            symbolSize: 10,
            symbol: "circle",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: colorData2[i]
                }
              }
            },
            data: seriesAllData2[i], // 数据
            itemStyle: {
              normal: {
                color: colorData2[i]
              }
            }
          });
        }
      }

      series0 = series0.concat(series1, series2);

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: "center",
          fontSize: "18px",
          top: "2%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: [
          {
            x: "left",
            top: "0%",
            data: legendData,
            itemWidth: 24,
            itemHeight: 16,
            itemGap: 16,
            textStyle: {
              fontSize: "18px",
              color: "#4E4E4E"
            }
            // formatter: function(item) {
            //   return item + "（人）";
            // }
          }
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: "category",
            data: XZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: "auto",
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     // type: "slider",
        //     type: 'inside',
        //     show: false,
        //     xAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 100
        //     // zoomLock:true,
        //     // height:"15px",
        //   }
        // ],
        yAxis: [
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          },
          {
            name: "",
            type: "value",
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
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
              interval: "auto",
              // rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: "14" // 坐标值得具体的颜色
              }
            }
          }
        ],
        series: series0
      };

      barlineChart10.setOption(option, true);
    },
    // 图表自适应
    initBarEchart1() {
      window.addEventListener("resize", () => {
        let barChart1 = echarts.init(document.getElementById("barChart1"));
        document.getElementById("barChart1").style.width = 100 + "%";
        document.getElementById("barChart1").style.height = 100 + "%";
        barChart1.resize();
      });
    },
    initBarEchart2() {
      window.addEventListener("resize", () => {
        let barChart2 = echarts.init(document.getElementById("barChart2"));
        document.getElementById("barChart2").style.width = 100 + "%";
        document.getElementById("barChart2").style.height = 100 + "%";
        barChart2.resize();
      });
    },
    initBarEchart3() {
      window.addEventListener("resize", () => {
        let barChart3 = echarts.init(document.getElementById("barChart3"));
        document.getElementById("barChart3").style.width = 100 + "%";
        document.getElementById("barChart3").style.height = 100 + "%";
        barChart3.resize();
      });
    },
    initBarEchart4() {
      window.addEventListener("resize", () => {
        let barChart4 = echarts.init(document.getElementById("barChart4"));
        document.getElementById("barChart4").style.width = 100 + "%";
        document.getElementById("barChart4").style.height = 100 + "%";
        barChart4.resize();
      });
    },
    initBarEchart5() {
      window.addEventListener("resize", () => {
        let barChart5 = echarts.init(document.getElementById("barChart5"));
        document.getElementById("barChart5").style.width = 100 + "%";
        document.getElementById("barChart5").style.height = 100 + "%";
        barChart5.resize();
      });
    },
    initBarEchart6() {
      window.addEventListener("resize", () => {
        let barChart6 = echarts.init(document.getElementById("barChart6"));
        document.getElementById("barChart6").style.width = 100 + "%";
        document.getElementById("barChart6").style.height = 100 + "%";
        barChart6.resize();
      });
    },
    initBarEchart7() {
      window.addEventListener("resize", () => {
        let barChart7 = echarts.init(document.getElementById("barChart7"));
        document.getElementById("barChart7").style.width = 100 + "%";
        document.getElementById("barChart7").style.height = 100 + "%";
        barChart7.resize();
      });
    },
    initBarEchart8() {
      window.addEventListener("resize", () => {
        let barChart8 = echarts.init(document.getElementById("barChart8"));
        document.getElementById("barChart8").style.width = 100 + "%";
        document.getElementById("barChart8").style.height = 100 + "%";
        barChart8.resize();
      });
    },
    initBarEchart9() {
      window.addEventListener("resize", () => {
        let barChart9 = echarts.init(document.getElementById("barChart9"));
        document.getElementById("barChart9").style.width = 100 + "%";
        document.getElementById("barChart9").style.height = 100 + "%";
        barChart9.resize();
      });
    },
    initBarEchart10() {
      window.addEventListener("resize", () => {
        let barChart10 = echarts.init(document.getElementById("barChart10"));
        document.getElementById("barChart10").style.width = 100 + "%";
        document.getElementById("barChart10").style.height = 100 + "%";
        barChart10.resize();
      });
    },
    initLineEchart1() {
      window.addEventListener("resize", () => {
        let lineChart1 = echarts.init(document.getElementById("lineChart1"));
        document.getElementById("lineChart1").style.width = 100 + "%";
        document.getElementById("lineChart1").style.height = 100 + "%";
        lineChart1.resize();
      });
    },
    initLineEchart2() {
      window.addEventListener("resize", () => {
        let lineChart2 = echarts.init(document.getElementById("lineChart2"));
        document.getElementById("lineChart2").style.width = 100 + "%";
        document.getElementById("lineChart2").style.height = 100 + "%";
        lineChart2.resize();
      });
    },
    initLineEchart3() {
      window.addEventListener("resize", () => {
        let lineChart3 = echarts.init(document.getElementById("lineChart3"));
        document.getElementById("lineChart3").style.width = 100 + "%";
        document.getElementById("lineChart3").style.height = 100 + "%";
        lineChart3.resize();
      });
    },
    initLineEchart4() {
      window.addEventListener("resize", () => {
        let lineChart4 = echarts.init(document.getElementById("lineChart4"));
        document.getElementById("lineChart4").style.width = 100 + "%";
        document.getElementById("lineChart4").style.height = 100 + "%";
        lineChart4.resize();
      });
    },
    initLineEchart5() {
      window.addEventListener("resize", () => {
        let lineChart5 = echarts.init(document.getElementById("lineChart5"));
        document.getElementById("lineChart5").style.width = 100 + "%";
        document.getElementById("lineChart5").style.height = 100 + "%";
        lineChart5.resize();
      });
    },
    initLineEchart6() {
      window.addEventListener("resize", () => {
        let lineChart6 = echarts.init(document.getElementById("lineChart6"));
        document.getElementById("lineChart6").style.width = 100 + "%";
        document.getElementById("lineChart6").style.height = 100 + "%";
        lineChart6.resize();
      });
    },
    initLineEchart7() {
      window.addEventListener("resize", () => {
        let lineChart7 = echarts.init(document.getElementById("lineChart7"));
        document.getElementById("lineChart7").style.width = 100 + "%";
        document.getElementById("lineChart7").style.height = 100 + "%";
        lineChart7.resize();
      });
    },
    initLineEchart8() {
      window.addEventListener("resize", () => {
        let lineChart8 = echarts.init(document.getElementById("lineChart8"));
        document.getElementById("lineChart8").style.width = 100 + "%";
        document.getElementById("lineChart8").style.height = 100 + "%";
        lineChart8.resize();
      });
    },
    initLineEchart9() {
      window.addEventListener("resize", () => {
        let lineChart9 = echarts.init(document.getElementById("lineChart9"));
        document.getElementById("lineChart9").style.width = 100 + "%";
        document.getElementById("lineChart9").style.height = 100 + "%";
        lineChart9.resize();
      });
    },
    initLineEchart10() {
      window.addEventListener("resize", () => {
        let lineChart10 = echarts.init(document.getElementById("lineChart10"));
        document.getElementById("lineChart10").style.width = 100 + "%";
        document.getElementById("lineChart10").style.height = 100 + "%";
        lineChart10.resize();
      });
    },
    initLineEchart11() {
      window.addEventListener("resize", () => {
        let lineChart11 = echarts.init(document.getElementById("lineChart11"));
        document.getElementById("lineChart11").style.width = 100 + "%";
        document.getElementById("lineChart11").style.height = 100 + "%";
        lineChart11.resize();
      });
    },
    initLineEchart12() {
      window.addEventListener("resize", () => {
        let lineChart12 = echarts.init(document.getElementById("lineChart12"));
        document.getElementById("lineChart12").style.width = 100 + "%";
        document.getElementById("lineChart12").style.height = 100 + "%";
        lineChart12.resize();
      });
    },
    initLineEchart13() {
      window.addEventListener("resize", () => {
        let lineChart13 = echarts.init(document.getElementById("lineChart13"));
        document.getElementById("lineChart13").style.width = 100 + "%";
        document.getElementById("lineChart13").style.height = 100 + "%";
        lineChart13.resize();
      });
    },
    initBarLineEchart1() {
      window.addEventListener("resize", () => {
        let barlineChart1 = echarts.init(
          document.getElementById("barlineChart1")
        );
        document.getElementById("barlineChart1").style.width = 100 + "%";
        document.getElementById("barlineChart1").style.height = 100 + "%";
        barlineChart1.resize();
      });
    },
    initBarLineEchart2() {
      window.addEventListener("resize", () => {
        let barlineChart2 = echarts.init(
          document.getElementById("barlineChart2")
        );
        document.getElementById("barlineChart2").style.width = 100 + "%";
        document.getElementById("barlineChart2").style.height = 100 + "%";
        barlineChart2.resize();
      });
    },
    initBarLineEchart3() {
      window.addEventListener("resize", () => {
        let barlineChart3 = echarts.init(
          document.getElementById("barlineChart3")
        );
        document.getElementById("barlineChart3").style.width = 100 + "%";
        document.getElementById("barlineChart3").style.height = 100 + "%";
        barlineChart3.resize();
      });
    },
    initBarLineEchart4() {
      window.addEventListener("resize", () => {
        let barlineChart4 = echarts.init(
          document.getElementById("barlineChart4")
        );
        document.getElementById("barlineChart4").style.width = 100 + "%";
        document.getElementById("barlineChart4").style.height = 100 + "%";
        barlineChart4.resize();
      });
    },
    initBarLineEchart5() {
      window.addEventListener("resize", () => {
        let barlineChart5 = echarts.init(
          document.getElementById("barlineChart5")
        );
        document.getElementById("barlineChart5").style.width = 100 + "%";
        document.getElementById("barlineChart5").style.height = 100 + "%";
        barlineChart5.resize();
      });
    },
    initBarLineEchart6() {
      window.addEventListener("resize", () => {
        let barlineChart6 = echarts.init(
          document.getElementById("barlineChart6")
        );
        document.getElementById("barlineChart6").style.width = 100 + "%";
        document.getElementById("barlineChart6").style.height = 100 + "%";
        barlineChart6.resize();
      });
    },
    initBarLineEchart7() {
      window.addEventListener("resize", () => {
        let barlineChart7 = echarts.init(
          document.getElementById("barlineChart7")
        );
        document.getElementById("barlineChart7").style.width = 100 + "%";
        document.getElementById("barlineChart7").style.height = 100 + "%";
        barlineChart7.resize();
      });
    },
    initBarLineEchart8() {
      window.addEventListener("resize", () => {
        let barlineChart8 = echarts.init(
          document.getElementById("barlineChart8")
        );
        document.getElementById("barlineChart8").style.width = 100 + "%";
        document.getElementById("barlineChart8").style.height = 100 + "%";
        barlineChart8.resize();
      });
    },
    initBarLineEchart9() {
      window.addEventListener("resize", () => {
        let barlineChart9 = echarts.init(
          document.getElementById("barlineChart9")
        );
        document.getElementById("barlineChart9").style.width = 100 + "%";
        document.getElementById("barlineChart9").style.height = 100 + "%";
        barlineChart9.resize();
      });
    },
    initBarLineEchart10() {
      window.addEventListener("resize", () => {
        let barlineChart10 = echarts.init(
          document.getElementById("barlineChart10")
        );
        document.getElementById("barlineChart10").style.width = 100 + "%";
        document.getElementById("barlineChart10").style.height = 100 + "%";
        barlineChart10.resize();
      });
    }
  },
  watch: {
    showDataNumberForBar1: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine1();
          }, 0);
        });
      }
    },
    showDataNumberForBar2: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine2();
          }, 0);
        });
      }
    },
    showDataNumberForBar3: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine3();
          }, 0);
        });
      }
    },
    showDataNumberForBar4: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine4();
          }, 0);
        });
      }
    },
    showDataNumberForBar5: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine5();
          }, 0);
        });
      }
    },
    showDataNumberForBar6: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine6();
          }, 0);
        });
      }
    },
    showDataNumberForBar7: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine7();
          }, 0);
        });
      }
    },
    showDataNumberForBar8: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine8();
          }, 0);
        });
      }
    },
    showDataNumberForBar9: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine9();
          }, 0);
        });
      }
    },
    showDataNumberForBar10: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barDrawLine10();
          }, 0);
        });
      }
    },
    showDataNumberForLine1: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine1();
          }, 0);
        });
      }
    },
    showDataNumberForLine2: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine2();
          }, 0);
        });
      }
    },
    showDataNumberForLine3: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine3();
          }, 0);
        });
      }
    },
    showDataNumberForLine4: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine4();
          }, 0);
        });
      }
    },
    showDataNumberForLine5: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine5();
          }, 0);
        });
      }
    },
    showDataNumberForLine6: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine6();
          }, 0);
        });
      }
    },
    showDataNumberForLine7: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine7();
          }, 0);
        });
      }
    },
    showDataNumberForLine8: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine8();
          }, 0);
        });
      }
    },
    showDataNumberForLine9: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine9();
          }, 0);
        });
      }
    },
    showDataNumberForLine10: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine10();
          }, 0);
        });
      }
    },
    showDataNumberForLine11: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine11();
          }, 0);
        });
      }
    },
    showDataNumberForLine12: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine12();
          }, 0);
        });
      }
    },
    showDataNumberForLine13: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.lineDrawLine13();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine1: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine1();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine2: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine2();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine3: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine3();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine4: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine4();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine5: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine5();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine6: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine6();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine7: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine7();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine8: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine8();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine9: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine9();
          }, 0);
        });
      }
    },
    showDataNumberForBarLine10: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$nextTick(function() {
          setTimeout(() => {
            this.barlineDrawLine10();
          }, 0);
        });
      }
    }
  }
};
