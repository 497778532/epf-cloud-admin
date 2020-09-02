<template>
  <div
    class="epf-table detailList"
    style="width: 345px;
    height: 563px;
    position: absolute;
    left: 15px;
    top: 3%;"
  >
  <div>
    <div class="epf-table__frist">
                <div class="monitor-left-top-box">
                  <div class="display:flex;flex:1;" style="font-size: 18px;
    font-weight: bolder;
    color: #202020;">{{this.topTitle}} - 全省</div>
                    <!-- <el-select size="mini"
                               v-model="this.params.year"
                               filterable
                               @change="handleChangeYear"
                               style="width:80px;">
                      <el-option v-for="item in yearOptions"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item"></el-option>
                    </el-select> -->
        <!-- <span class="one-header__left">{{ this.topTitle }}全省</span> -->
        </div>
        <!-- <span class="one-header__right EPFsuccess fl">正常</span> -->
        <div>预警状态</div>
      <div>
        <div class="one-content__ing">
          <span>监测现状(2019)</span>
          <span v-if="this.presentSituation!==''">{{this.presentSituation | numFilterScan}}</span>
          <span v-if="this.presentSituation==''" style="color:red;">- -</span>
          <span>{{this.unit}}</span>
        </div>
        <div style="display: flex;
    justify-content: space-between;">
          <span style="color:#a0a0a0;">规划目标(2013)</span>
          <div>
          <span  style="color:#a0a0a0;" v-if="this.planningValue!==''">{{this.planningValue | numFilterScan}}</span>
          <span  style="color:red;" v-if="this.planningValue ==''">- -</span>
          <span  style="color:#a0a0a0;">{{this.unit}}</span></div>
        </div>
      </div>
    </div>
      <div style="margin-top: 3%;">
        <epf-title title="总体变化趋势"></epf-title>
      </div>
      <div>单位：{{ this.unit }}</div>
      </div>
    <!-- <el-collapse-transition> -->
        <div  style="width: 100%;
    height: 330px;" id="changeChart" ref="changeChart"></div>
    <!-- </el-collapse-transition> -->
    <!-- <div class="fourBottom">
      <el-collapse-transition>
        <div v-show="isShowBottom"
             style="height:30px;width:350px;backgroundColor: #fff;padding:10px;margin-top:5px;">
          <div class="left-chart-tab-tilte-box">
            <div @click="turnMonitorLeftFirst"
                 class="left-chart-tab-tilte"
                 :class="{active:leftCurrent==0}"
                 style="padding-right:10px;">趋势分析</div>
            <div @click="turnMonitorLeftSecond"
                 class="left-chart-tab-tilte"
                 :class="{active:leftCurrent==1}"
                 style="padding-right:10px;">环比分析</div>
            <div @click="turnMonitorLeftThird"
                 class="left-chart-tab-tilte"
                 :class="{active:leftCurrent==2}"
                 style="padding-right:10px;">目标对比</div>
            <div @click="turnMonitorLeftFourth"
                 class="left-chart-tab-tilte"
                 :class="{active:leftCurrent==3}"
                 style="padding-right:10px;">实施进度</div>
          </div>
        </div>
      </el-collapse-transition>
    </div>-->
  </div>
</template>

<script>
import map from "./map";
import echarts from 'echarts'
export default {
  mixins: [map],
  props: {
    getDetail: {
      type: Array
    },
    detailTitle: {
      type: String
    }
  },
  data() {
    return {
      params: {
        cantonProvince: '440000',
        cantonCity: '',
        cantonArea: '',
        year: '',
        areaType: '',
        sortType: '',
        zbEnum: ''
      },
      yearOptions: [
        {
          value: 2020,
          label: 2020
        },
        {
          value: 2019,
          label: 2019
        },
        {
          value: 2018,
          label: 2018
        },
        {
          value: 2017,
          label: 2017
        },
        {
          value: 2016,
          label: 2016
        },
        {
          value: 2015,
          label: 2015
        }
      ],
      topTitle: '',
      fromScan: {},
      indexId: "",
      unit: "",
      presentSituation: "",
      planningValue: "",
      leftCurrent: 0,
      isShowBottom: true,
      state: true,
      show4: true,
      // option: {
      //   color: ["#3398DB"],
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       // 坐标轴指示器，坐标轴触发有效
      //       type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      //     }
      //   },
      //   legend: {
      //     data: ["监测值", "增长率"],
      //     align: "left"
      //   },
      //   grid: {
      //     top: "2%",
      //     left: "0%",
      //     right: "2%",
      //     bottom: "0%",
      //     containLabel: true
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: [],
      //       axisTick: {
      //         show: true
      //       },
      //       axisLine: {
      //         show: false
      //       },
      //       axisLabel: {
      //         show: true,
      //         textStyle: {
      //           color: "#303030", // 更改坐标轴文字颜色
      //           fontSize: 14 // 更改坐标轴文字大小
      //         }
      //         // formatter: function(value) {
      //         //   return value.split("").join("\n");
      //         // }
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: "value",
      //       min: 0,
      //       max: 3000000,
      //       interval: 250000,
      //       splitNumber: 250000,
      //       axisLabel: {
      //         show: true,
      //         textStyle: {
      //           color: "rgba(48,48,48,1);", // 更改坐标轴文字颜色
      //           fontSize: 14 // 更改坐标轴文字大小
      //         }
      //       },
      //       axisLine: {
      //         show: false // y轴线消失
      //       },
      //       // splitLine: {
      //       //   show: false,
      //       //   lineStyle: {
      //       //     color: ["#979797"],
      //       //     type: "solid"
      //       //   }
      //       // },
      //       axisTick: {
      //         show: false
      //       }
      //     },
      //     {
      //       type: "value",
      //       min: 0,
      //       max: 3000000,
      //       interval: 250000,
      //       splitNumber: 250000,
      //       position: "right",
      //       axisLabel: {
      //         show: false,
      //         textStyle: {
      //           color: "rgba(48,48,48,1)", // 更改坐标轴文字颜色
      //           fontSize: 14 // 更改坐标轴文字大小
      //         }
      //         // formatter: function (value) {
      //         //   return value + "%";
      //         // }
      //       },
      //       axisLine: {
      //         show: false // y轴线消失
      //       },
      //       axisTick: {
      //         show: false
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: "监测值",
      //       type: "bar",
      //       barWidth: "20px",
      //       data: [],
      //       itemStyle: {
      //         normal: {
      //           color: "#1D7CE4"
      //           // barBorderColor: "rgba(151,151,151,1);", // 柱条边线
      //           // barBorderRadius: 0, // 柱条边线圆角，单位px，默认为0
      //           // barBorderWidth: 1 // 柱条边线线宽，单位px，默认为1
      //         }
      //       }
      //     },
      //     {
      //       data: [],
      //       type: "line",
      //       smooth: false,
      //       name: "增长率",
      //       symbolSize: 5, // 控制线条上 点 的大小
      //       color: ["#00D07C"],
      //       itemStyle: {
      //         normal: {
      //           color: "#00D07C",
      //           borderColor: "#00D07C",
      //           lineStyle: {
      //             type: "dotted"
      //           }
      //         }
      //       }
      //     }
      //   ]
      // }
      // option2: {
      //   color: ["#3398DB"],
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       // 坐标轴指示器，坐标轴触发有效
      //       type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      //     }
      //   },
      //   legend: {
      //     data: ["监测值", "增长率"],
      //     align: "left"
      //   },
      //   grid: {
      //     top: "15%",
      //     left: "0%",
      //     right: "2%",
      //     bottom: "0%",
      //     containLabel: true
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: ["2014", "2015", "2016", "2017", "2018"],
      //       axisTick: {
      //         show: true
      //       },
      //       axisLine: {
      //         show: false
      //       },
      //       axisLabel: {
      //         show: true,
      //         textStyle: {
      //           color: "#303030", // 更改坐标轴文字颜色
      //           fontSize: 14 // 更改坐标轴文字大小
      //         }
      //         // formatter: function(value) {
      //         //   return value.split("").join("\n");
      //         // }
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: "value",
      //       min: 0,
      //       max: 1600,
      //       interval: 400,
      //       axisLabel: {
      //         show: true,
      //         textStyle: {
      //           color: "rgba(48,48,48,1);", // 更改坐标轴文字颜色
      //           fontSize: 14 // 更改坐标轴文字大小
      //         }
      //       },
      //       axisLine: {
      //         show: false // y轴线消失
      //       },
      //       splitLine: {
      //         show: true,
      //         lineStyle: {
      //           color: ["#979797"],
      //           type: "solid"
      //         }
      //       },
      //       axisTick: {
      //         show: false
      //       }
      //     },
      //     {
      //       type: "value",
      //       min: 0,
      //       max: 16,
      //       interval: 4,
      //       position: "right",
      //       axisLabel: {
      //         show: true,
      //         textStyle: {
      //           color: "rgba(48,48,48,1)", // 更改坐标轴文字颜色
      //           fontSize: 14 // 更改坐标轴文字大小
      //         },
      //         formatter: function (value) {
      //           return value + "%";
      //         }
      //       },
      //       axisLine: {
      //         show: false // y轴线消失
      //       },
      //       axisTick: {
      //         show: false
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: "监测值",
      //       type: "bar",
      //       barWidth: "25%",
      //       data: [1300, 1750, 1420, 1399, 1348],
      //       itemStyle: {
      //         normal: {
      //           color: "#1D7CE4"
      //         }
      //       }
      //     },
      //     {
      //       data: [1300, 1750, 1420, 1399, 1348],
      //       type: "line",
      //       smooth: false,
      //       name: "增长率",
      //       symbolSize: 5, // 控制线条上 点 的大小
      //       color: ["#00D07C"],
      //       itemStyle: {
      //         normal: {
      //           color: "#00D07C",
      //           borderColor: "#00D07C",
      //           lineStyle: {
      //             type: "dotted"
      //           }
      //         }
      //       }
      //     }
      //   ]
      // }
    };
  },
  methods: {
    initEchart() {
      window.addEventListener('resize', () => {
        let changeChart = echarts.init(document.getElementById('changeChart'))
        document.getElementById('changeChart').style.width = 345 + 'px'
        document.getElementById('changeChart').style.height = 395 + 'px'
        changeChart.resize()
      })
    },
    changeDrawLine() {
      setTimeout(() => {
        let changeChart = echarts.init(document.getElementById('changeChart'))
        document.getElementById('changeChart').style.width = 345 + 'px'
        document.getElementById('changeChart').style.height = 395 + 'px'
        changeChart.resize() // 直接加这句即可
      }, 0)
      let changeChart = echarts.init(document.getElementById('changeChart'))
      let xZhouData = this.year
      let seriesData = this.detectionValue
      let legendData = ['监测值']
      // let legendData = ["监测值", "增长率"];
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
          // formatter: function(params) {
          //   return (
          //     params[0].marker + params[0].seriesName + ' ' + params[0].data
          //   )
          // }
        },
        // legend: {
        //   data: legendData,
        //   align: 'left'
        // },
        grid: {
          top: '2%',
          left: '0%',
          right: '2%',
          bottom: '0%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            type: 'value',
            // interval: Math.ceil(maxData1 / 5), // y轴分段
            // max: Math.ceil(maxData1), // 最大值
            // min: 0, // 最小值
            position: 'top', // x轴固定在顶部
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                color: 'rgba(48,48,48,1);', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
            },
            // axisLine: {
            //   show: false // y轴线消失
            // },
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     color: ["#979797"],
            //     type: "solid"
            //   }
            // },
            // axisTick: {
            //   show: false
            // }
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
          // {
          //   type: "value",
          //   interval: Math.ceil(maxData2 / 5), // y轴分段
          //   max: Math.ceil(maxData2), // 最大值
          //   min: 0, // 最小值
          //   position: "right",
          //   axisLabel: {
          //     show: true,
          //     textStyle: {
          //       color: "rgba(48,48,48,1)", // 更改坐标轴文字颜色
          //       fontSize: 14 // 更改坐标轴文字大小
          //     },
          //     formatter: function(value) {
          //       return value + "%";
          //     }
          //   },
          //   axisLine: {
          //     show: false // y轴线消失
          //   },
          //   axisTick: {
          //     show: false
          //   }
          // }
        ],
        yAxis: [
          {
            type: 'category',
            data: xZhouData,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              interval: 0,
              // rotate: 45, //文字逆时针旋转45°
              textStyle: {
                color: '#303030', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
              // formatter: function(value) {
              //   return value.split("").join("\n");
              // }
            }
          }
        ],
        series: [
          {
            name: '监测值',
            type: 'bar',
            barWidth: null, // 默认自适应
            barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesData,
            itemStyle: {
              normal: {
                color: '#50a5f6'
                // barBorderColor: "rgba(151,151,151,1);", // 柱条边线
                // barBorderRadius: 0, // 柱条边线圆角，单位px，默认为0
                // barBorderWidth: 1 // 柱条边线线宽，单位px，默认为1
              }
            }
          }
          // {
          //   data: seriesData,
          //   type: 'line',
          //   smooth: false,
          //   name: '增长率',
          //   symbolSize: 5, // 控制线条上 点 的大小
          //   color: ['#00D07C'],
          //   itemStyle: {
          //     normal: {
          //       color: '#00D07C',
          //       borderColor: '#00D07C',
          //       lineStyle: {
          //         type: 'dotted'
          //       }
          //     }
          //   }
          // }
        ]
      }
      changeChart.setOption(option, true)
    },
    handleChangeYear (val) {
    },
    getData() {
      this.$http
        .get(
          `/api/epf-index-model/indexOverview/getIndexTrendAnalysisJson?indexId=${this.indexId}`,
          {}
        )
        .then(res => {
          if (res.code === 0) {
            this.detectionValue = [];
            this.year = [];
            res.indexTrendAnalysisList.forEach(response => {
              this.detectionValue.push(Number(response.detectionValue).toFixed(2));
              this.year.push(response.year);
              // this.initEchart("change");
              // this.useDrawLine("change", this.option);
              // this.option.xAxis[0].data = this.year;
              // this.option.series[0].data = this.detectionValue;
            });
              this.changeDrawLine()
          } else {
            this.$message.error(res.msg); // 失败
          }
        });
    },
    turnMonitorLeftFirst() {
      this.leftCurrent = 0;
    },
    turnMonitorLeftSecond() {
      this.leftCurrent = 1;
    },
    turnMonitorLeftThird() {
      this.leftCurrent = 2;
    },
    turnMonitorLeftFourth() {
      this.leftCurrent = 3;
    },
    open() {
      this.$emit("openImportant", "important");
    }
  },
  created() {
    this.getData();
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
  },
  watch: {
fromScan: {
      immediate: true,
      deep: true,
      handler(val) {
        this.presentSituation = val['nowVal']
        this.planningValue = val['planVal']
        this.unit = val['unit']
      }
    },
    // year: {
    //   immediate: true,
    //   deep: true,
    //   handler(val) {
    //     this.changeDrawLine()
    //   }
    // },
    detailTitle(val) {
      this.topTitle = val
    }
  },
  components: {},
  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        // this.changeDrawLine()
      }, 1000)
    })
    this.initEchart()
    this.$bus.$on("presentSituation", val => {
      this.presentSituation = val;
    });
    this.$bus.$on("planningValue", val => {
      this.planningValue = val;
    });
    this.$bus.$on("unit", val => {
      this.unit = val;
    });
    this.$bus.$on("indexId", val => {
      this.indexId = val;
      this.getData();
    });
    this.initEchart("change");
    this.useDrawLine("change", this.option);
    this.initEchart("bigProjects");
    this.useDrawLine("bigProjects", this.option2);
  }
};
</script>

<style scoped>
@import "./index.css";
* {
  color: #404040;
  line-height: 28px;
}
.left-chart-tab-tilte-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
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
  width: 19%;
  height: 76%;
  position: absolute;
  left: 15px;
  top: 3%;
}
#change {
  height: 250px;
  width: 300px;
}
.monitor-left-top-box {
  display: flex;
    justify-content: space-between;
  /* height: 300px; */
  /* width: 400px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start; */
}
.monitor-left-top {
  /* width: 100%;
  height: 56px;
  padding: 0 24px;
  font-size: 18px;
  font-weight: bolder;
  color: #202020;
  display: flex;
  justify-content: space-between;
  align-items: center; */
  /* border-bottom: 2px solid #dcdcdc; */
}
* {
  font-size: 16px;
}
.epf-title__wrapper {
  margin-bottom: 2%;
}
#changeChart {
  width: 345px;
  height: 395px;
}
</style>
