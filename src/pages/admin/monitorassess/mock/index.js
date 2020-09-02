import echarts from "echarts";
const xzqhs = [
  "广州市",
  "深圳市",
  "东莞市",
  "梅州市",
  "佛山市",
  "中山市",
  "湛江市",
  "惠州市",
  "河源市",
  "珠海市",
  "江门市",
  "阳江市",
  "茂名市",
  "韶关市",
  "汕头市",
  "清远市",
  "揭阳市",
  "云浮市",
  "汕尾市"
];

const legends = [
  "水田面积",
  "水浇地",
  "旱地",
  "耕地",
  "可调整地类面积",
  "耕地保有量现状",
  "耕地保有量现状(含全部可调整地类)",
  "耕地保有量现状指标",
  "耕地保有量现状（含带K园地和带K坑塘）",
  "耕地保有量现状指标完成情况"
];

const colorData = [
  "#5582ea",
  "#9dcb69",
  "#45b27f",
  "#f4ce52",
  "#f48e56",
  "#f0525b",
  "#cd69d0",
  "#8759d6",
  "#616fc2",
  "#50b8ef",
  "#6ddedc",
  "#cd356d",
  "#e0bebd",
  "#4a27a7",
  "#a16f92",
  "#28bdb6",
  "#31908e",
  "#626b70",
  "#9ae883",
  "#3b5050"
];

export let tableData = createTableData();
function createTableData() {
  let arr = [];
  for (let i = 0; i < xzqhs.length; i++) {
    arr.push({
      xzqh: xzqhs[i],
      stmj: getRandomIntInclusive(1, 50),
      stmhpm: getRandomIntInclusive(1, 10),
      stzgdmjbl: getRandomIntInclusive(1, 50) + "%",
      stzgdmjblpm: getRandomIntInclusive(1, 10),
      sjd: getRandomIntInclusive(1, 50),
      sjdpm: getRandomIntInclusive(1, 10),
      sjdzgdmjzb: getRandomIntInclusive(1, 50) + "%",
      hd: getRandomIntInclusive(1, 50),
      hdpm: getRandomIntInclusive(1, 10),
      hdzgdmjbl: getRandomIntInclusive(1, 50) + "%",
      gd: getRandomIntInclusive(1, 50),
      gdpm: getRandomIntInclusive(1, 10),
      ktzdlmj: getRandomIntInclusive(1, 50),
      ktzdlmjpm: getRandomIntInclusive(1, 10),
      gdbylxz: getRandomIntInclusive(1, 50),
      gdbylxzpm: getRandomIntInclusive(1, 10),
      gdbylxzpm2: getRandomIntInclusive(1, 50),
      gdbylzapm3: getRandomIntInclusive(1, 10),
      gdbylxzdk: getRandomIntInclusive(1, 50),
      gdbylxzdkpm: getRandomIntInclusive(1, 10),
      gdbylghzb: getRandomIntInclusive(1, 50),
      gdbylghzbpm: getRandomIntInclusive(1, 10),
      gdbylzbwcqk: getRandomIntInclusive(1, 50) + "%",
      gdbylzbwcqkpm: getRandomIntInclusive(1, 10)
    });
  }
  return arr;
}
export const TIMELINEOPTION = {
  baseOption: {
    timeline: {
      currentIndex: 6,
      axisType: "category",
      autoPlay: false,
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomObj(name) {
  let obj = {
    name: name,
    type: "bar",
    data: [],
    itemStyle: {
      normal: {
        color: ""
      }
    }
  };
  for (let i = 0; i < xzqhs.length; i++) {
    obj.data.push(getRandomIntInclusive(10, 50));
  }
  return obj;
}

function createMock() {
  let test = [];
  for (let i = 0; i < legends.length; i++) {
    let randObj = createRandomObj(legends[i]);
    randObj.itemStyle.normal.color = colorData[i];
    test.push(randObj);
  }
  return test;
}
export const MAINCHARTOPTION = {
  color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    x: "center",
    bottom: "2%",
    data: legends,
    itemWidth: 36,
    itemHeight: 17,
    itemGap: 20
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "20%",
    top: "5%",
    containLabel: true
  },
  xAxis: [
    {
      // name: '市',
      type: "category",
      data: xzqhs, // x轴data
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
      type: "inside",
      show: true,
      xAxisIndex: [0],
      start: 0, // 默认为1
      end: 30
      // end: 45
    }
  ],
  yAxis: [
    {
      name: "公顷",
      nameTextStyle: {
        fontWeight: "bolder"
      },
      type: "value",
      // interval: Math.ceil(maxAllData / 5), // y轴分段
      max: Math.ceil(50), // 最大值
      min: 0,
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
        show: false, // 不要x轴
        onZero: true
      }
    }
  ],
  series: createMock()
  // 调整渲染位置
  // grid: {
  //   left: '1%',
  //   right: '1%',
  //   bottom: '5%',
  //   containLabel: true
  // },
  // tooltip: {
  //   trigger: 'axis',
  //   axisPointer: {
  //     type: 'cross',
  //     crossStyle: {
  //       color: '#999'
  //     }
  //   }
  // },
  // legend: {
  //   x: 'left',
  //   y: 'bottom',
  //   padding: [30, 0, 0, 15],
  //   data: ['蒸发量', '降水量', '平均温度']
  // },
  // xAxis: [
  //   {
  //     type: 'category',
  //     data: [
  //       '1月',
  //       '2月',
  //       '3月',
  //       '4月',
  //       '5月',
  //       '6月',
  //       '7月',
  //       '8月',
  //       '9月',
  //       '10月',
  //       '11月',
  //       '12月'
  //     ],
  //     axisPointer: {
  //       type: 'shadow'
  //     }
  //   }
  // ],
  // yAxis: [
  //   {
  //     type: 'value',
  //     name: '水量',
  //     min: 0,
  //     max: 250,
  //     interval: 50,
  //     axisLabel: {
  //       formatter: '{value} ml'
  //     }
  //   },
  //   {
  //     type: 'value',
  //     name: '温度',
  //     min: 0,
  //     max: 25,
  //     interval: 5,
  //     axisLabel: {
  //       formatter: '{value} °C'
  //     }
  //   }
  // ],
  // series: [
  //   {
  //     name: '蒸发量',
  //     type: 'bar',
  //     data: [
  //       2.0,
  //       4.9,
  //       7.0,
  //       23.2,
  //       25.6,
  //       76.7,
  //       135.6,
  //       162.2,
  //       32.6,
  //       20.0,
  //       6.4,
  //       3.3
  //     ]
  //   },
  //   {
  //     name: '降水量',
  //     type: 'bar',
  //     data: [
  //       2.6,
  //       5.9,
  //       9.0,
  //       26.4,
  //       28.7,
  //       70.7,
  //       175.6,
  //       182.2,
  //       48.7,
  //       18.8,
  //       6.0,
  //       2.3
  //     ]
  //   },
  //   {
  //     name: '平均温度',
  //     type: 'line',
  //     yAxisIndex: 1,
  //     data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
  //   }
  // ]
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
