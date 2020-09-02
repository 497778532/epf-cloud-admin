import echarts from "echarts";
export const TIMELINEOPTION = {
  baseOption: {
    timeline: {
      axisType: "category",
      autoPlay: true,
      playInterval: 3000,
      data: createYearsArray(),
      label: {
        formatter: function(s) {
          return new Date(s).getFullYear();
        }
      }
    }
  }
};

function createYearsArray() {
  const thisYear = new Date().getFullYear();
  let arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push((thisYear - i).toString());
  }
  return arr.reverse();
}

export const MAINCHARTOPTION = {
  // 调整渲染位置
  grid: {
    left: "1%",
    right: "1%",
    bottom: "1%",
    containLabel: true
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999"
      }
    }
  },
  // toolbox: {
  //   feature: {
  //     dataView: { show: true, readOnly: false },
  //     magicType: { show: true, type: ['line', 'bar'] },
  //     restore: { show: true },
  //     saveAsImage: { show: true }
  //   }
  // },
  legend: {
    x: "left",
    y: "bottom",
    padding: [50, 0, 0, 0],
    data: ["蒸发量", "降水量", "平均温度"]
  },
  xAxis: [
    {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      axisPointer: {
        type: "shadow"
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "水量",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value} ml"
      }
    },
    {
      type: "value",
      name: "温度",
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: "{value} °C"
      }
    }
  ],
  series: [
    {
      name: "蒸发量",
      type: "bar",
      data: [
        2.0,
        4.9,
        7.0,
        23.2,
        25.6,
        76.7,
        135.6,
        162.2,
        32.6,
        20.0,
        6.4,
        3.3
      ]
    },
    {
      name: "降水量",
      type: "bar",
      data: [
        2.6,
        5.9,
        9.0,
        26.4,
        28.7,
        70.7,
        175.6,
        182.2,
        48.7,
        18.8,
        6.0,
        2.3
      ]
    },
    {
      name: "平均温度",
      type: "line",
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
};

export const CUSTOMOPTION = {
  backgroundColor: "#fff",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: "2%",
    right: "4%",
    bottom: "14%",
    top: "16%",
    containLabel: true
  },
  legend: {
    data: ["1", "2", "3"],
    right: 10,
    top: 12,
    textStyle: {
      color: "#fff"
    },
    itemWidth: 12,
    itemHeight: 10
    // itemGap: 35
  },
  xAxis: {
    type: "category",
    data: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
    axisLine: {
      lineStyle: {
        color: "white"
      }
    },
    axisLabel: {
      // interval: 'auto',
      // rotate: 40,
      textStyle: {
        fontFamily: "Microsoft YaHei"
      }
    }
  },

  yAxis: {
    type: "value",
    max: "1200",
    axisLine: {
      show: false,
      lineStyle: {
        color: "white"
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(255,255,255,0.3)"
      }
    },
    axisLabel: {}
  },
  dataZoom: [
    {
      show: true,
      height: 12,
      xAxisIndex: [0],
      bottom: "8%",
      start: 10,
      end: 90,
      handleIcon:
        "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
      handleSize: "110%",
      handleStyle: {
        color: "#d3dee5"
      },
      textStyle: {
        color: "#fff"
      },
      borderColor: "#90979c"
    },
    {
      type: "inside",
      show: true,
      height: 15,
      start: 1,
      end: 35
    }
  ],
  series: [
    {
      name: "1",
      type: "bar",
      barWidth: "15%",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#fccb05"
            },
            {
              offset: 1,
              color: "#f5804d"
            }
          ]),
          barBorderRadius: 12
        }
      },
      data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
    },
    {
      name: "2",
      type: "bar",
      barWidth: "15%",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#8bd46e"
            },
            {
              offset: 1,
              color: "#09bcb7"
            }
          ]),
          barBorderRadius: 11
        }
      },
      data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
    },
    {
      name: "3",
      type: "bar",
      barWidth: "15%",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#248ff7"
            },
            {
              offset: 1,
              color: "#6851f1"
            }
          ]),
          barBorderRadius: 11
        }
      },
      data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
    }
  ]
};
