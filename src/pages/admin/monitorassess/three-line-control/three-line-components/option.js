let commonecharts = {};

commonecharts.tab1Echart = function(data) {
  var option = {
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
      //   right: "2%",
      //   top: "2%",
      data: data.legendData,
      itemWidth: 20,
      itemHeight: 14
    },
    grid: {
      left: "3%",
      right: "15%",
      bottom: "2%",
      top: "10%",
      containLabel: true
    },
    yAxis: [
      {
        // name: '市',
        type: "category",
        data: data.city,
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
        // type: "slider",
        type: "inside",
        show: false,
        yAxisIndex: [0],
        start: 0, // 默认为1
        end: 100
      }
    ],
    xAxis: [
      {
        name: "",
        type: "value",
        position: "top", // x轴固定在顶部
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
          textStyle: {
            fontSize: "14" // 坐标值得具体的颜色
          }
        }
      }
    ],
    series: data.series
  };
  return option;
};

commonecharts.tab2Echart = function(data) {
  var option = {
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
      //   right: "2%",
      //   top: "2%",
      data: data.legendData,
      itemWidth: 20,
      itemHeight: 14
    },
    grid: {
      left: "3%",
      right: "15%",
      bottom: "2%",
      top: "10%",
      containLabel: true
    },
    yAxis: [
      {
        // name: '市',
        type: "category",
        data: data.city,
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
        // type: "slider",
        type: "inside",
        show: false,
        yAxisIndex: [0],
        start: 0, // 默认为1
        end: 100
      }
    ],
    xAxis: [
      {
        name: "",
        type: "value",
        position: "top", // x轴固定在顶部
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
          textStyle: {
            fontSize: "14" // 坐标值得具体的颜色
          }
        }
      }
    ],
    series: data.series
  };
  return option;
};

commonecharts.tab3Echart = function(data) {
  let option = {
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
      //   right: "2%",
      //   top: "2%",
      data: data.legendData,
      itemWidth: 20,
      itemHeight: 14
    },
    grid: {
      left: "3%",
      right: "15%",
      bottom: "2%",
      top: "10%",
      containLabel: true
    },
    yAxis: [
      {
        // name: '市',
        type: "category",
        data: data.city,
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
        // type: "slider",
        type: "inside",
        show: false,
        yAxisIndex: [0],
        start: 0, // 默认为1
        end: 100
      }
    ],
    xAxis: [
      {
        name: "",
        type: "value",
        position: "top", // x轴固定在顶部
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
          textStyle: {
            fontSize: "14" // 坐标值得具体的颜色
          }
        }
      }
    ],
    series: data.server
  };
  return option;
};

commonecharts.detailBar = function(data) {
  var option = {
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
      right: "2%",
      top: "2%",
      data: data.legendData,
      itemWidth: 14,
      itemHeight: 14
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "10%",
      top: "10%",
      containLabel: true,
      x: 100, // 控制x轴文字与底部的距离
      y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
    },
    xAxis: [
      {
        // name: '市',
        type: "category",
        data: data.city,
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
    dataZoom: [
      {
        type: "inside",
        show: true,
        xAxisIndex: [0],
        start: 0, // 默认为1
        end: 100
        // filterMode: 'filter'
        // end: 45
      }
    ],
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
        }
      }
    ],
    series: data.series
  };
  return option;
};

commonecharts.circles = function(data) {
  var option = (option = {
    title: {
      // text: "全省农村拆旧复垦指标流转情况总览",
      x: "center",
      fontSize: "18px",
      top: "2%"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      selectedMode: "single",
      right: "2%",
      top: "2%",
      data: data.legendData,
      itemWidth: 14,
      itemHeight: 14
      // selected: {
      //   出售指标: true,
      //   购买指标: false
      // },
    },
    series: data.series
  });
  return option;
};

commonecharts.sercondCircles = function(data) {
  var option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: 10,
      data: data.legend
    },
    series: [
      {
        name: "",
        type: "pie",
        selectedMode: "single",
        radius: [0, "30%"],

        label: {
          position: "inner"
        },
        labelLine: {
          show: false
        },
        data: data.dataArr1
      },
      {
        name: "",
        type: "pie",
        radius: ["40%", "55%"],
        label: {
          formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",

          // shadowBlur:3,
          // shadowOffsetX: 2,
          // shadowOffsetY: 2,
          // shadowColor: '#999',
          // padding: [0, 7],
          rich: {
            a: {
              color: "#999",
              lineHeight: 22,
              align: "center"
            },
            // abg: {
            //     backgroundColor: '#333',
            //     width: '100%',
            //     align: 'right',
            //     height: 22,
            //     borderRadius: [4, 4, 0, 0]
            // },

            b: {
              fontSize: 16,
              lineHeight: 33
            },
            per: {
              color: "#eee",
              backgroundColor: "#334455",
              padding: [2, 4],
              borderRadius: 2
            }
          }
        },
        data: data.dataArr2
      }
    ]
  };
  return option;
};
export default commonecharts;
