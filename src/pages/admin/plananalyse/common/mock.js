const xzqhs = [
  '广州市',
  '深圳市',
  '东莞市',
  '梅州市',
  '佛山市',
  '中山市',
  '湛江市',
  '惠州市',
  '河源市',
  '珠海市',
  '江门市',
  '阳江市',
  '茂名市',
  '韶关市',
  '汕头市',
  '清远市',
  '揭阳市',
  '云浮市',
  '汕尾市'
]

const levels = [
  '<1°',
  '3-8°',
  '8-15°',
  '15-25°',
  '>25°'
]

export const LAYERS = [
  {
    title: '生态承载力评价结果',
    url: 'http://19.15.73.111/arcgisserver12/rest/services/试评价结果/生态保护等级评价结果/MapServer',
    useProxy: false,
    type: 'image',
    visible: true
  },
  {
    title: '农业承载力评价结果',
    url: 'http://19.15.73.111/arcgisserver12/rest/services/试评价结果/农业承载力评价结果/MapServer',
    useProxy: false,
    type: 'image',
    visible: true
  },
  {
    title: '城镇承载力评价结果',
    url: 'http://19.15.73.111/arcgisserver12/rest/services/试评价结果/城镇承载力评价结果/MapServer',
    useProxy: false,
    type: 'image',
    visible: true
  },
  {
    title: '生态保护重要性评价结果',
    url: '',
    useProxy: false,
    type: 'image',
    visible: true
  },
  {
    title: '农业生产适宜性评价结果',
    url: 'http://19.15.73.111/arcgisserver12/rest/services/试评价结果/农业适宜性评价结果/MapServer',
    useProxy: false,
    type: 'image',
    visible: true
  },
  {
    title: '城镇建设适宜性评价结果',
    url: 'http://19.15.73.111/arcgisserver12/rest/services/试评价结果/城镇适宜性评价结果/MapServer',
    useProxy: false,
    type: 'image',
    visible: true
  }
]

export const CHART_OPTION = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: '40%',
    align: 'left',
    itemWidth: 10,
    itemHeight: 10,
    data: ['<3', '3-8', '8-15', '15-25', '>25']
  },
  series: [
    {
      name: '评价汇总',
      type: 'pie',
      clockWise: false,
      radius: ['50%', '80%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
      center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      label: {
        normal: {
          // show: true,
          position: 'center',
          formatter: '{name|{a}}',
          rich: {
            name: {
              color: '#333',
              fontSize: 12,
              // fontWeight: "bolder",
              align: 'center',
              verticalAlign: 'middle',
              padding: 8
            }
          }
        }
        // emphasis: {
        //   show: true,
        //   textStyle: {
        //     fontSize: 24
        //   }
        // }//内圈字体不放大
      },
      hoverAnimation: true,
      data: [
        { value: 335, name: '<3' },
        { value: 310, name: '3-8' },
        { value: 234, name: '8-15' },
        { value: 135, name: '15-25' },
        { value: 1548, name: '>25' }
      ]
    }
  ]
}

export const DESCRIBE = '[农业耕作条件]=f([坡度],[高程],[土壤质地])'

export const TEXT_CONTENT = '基于资源环境要素单项评价的分级结果，根据生态保护、农业生产、城镇建设三方面的差异化要求，综合划分生态指向的生态保护等级一级农业、城市指向的承载能力等级。取生态系统服务功能重要性及生态敏感性评价结果的最大值，判定生态保护等级。'

export const SCOPE = createScopeData()

export const LEVEL = createLevelData()

export const CKQZ = createSTCKQZData()

export const PBJZ = createSTPBJZData()

// 生态斑块集中度评价分级参考阈值
function createSTCKQZData() {
  let arr = [{
    bkmj: '<0.25',
    bkjzd: '低'
  }, {
    bkmj: '0.25-0.5',
    bkjzd: '较低'
  },
  {
    bkmj: '0.5-1.0',
    bkjzd: '一般'
  },
  {
    bkmj: '1-2',
    bkjzd: '较高'
  },
  {
    bkmj: '>=2',
    bkjzd: '高'
  }
  ]
  return arr
}

// 生态保护重要性等级分区参考判别矩阵
function createSTPBJZData() {
  let arr = [{
    level: '高',
    high: '极重要',
    higher: '极重要',
    normal: '极重要',
    lower: '重要',
    low: '一般'
  },
  {
    level: '较高',
    high: '极重要',
    higher: '极重要',
    normal: '极重要',
    lower: '重要',
    low: '一般'
  },
  {
    level: '中等',
    high: '重要',
    higher: '重要',
    normal: '重要',
    lower: '重要',
    low: '一般'
  },
  {
    level: '较低',
    high: '重要',
    higher: '重要',
    normal: '重要',
    lower: '一般',
    low: '一般'
  },
  {
    level: '低',
    high: '一般',
    higher: '一般',
    normal: '一般',
    lower: '一般',
    low: '一般'
  }
  ]
  return arr
}

// 农业地块连片度评价分级参考阈值
export const NYCKQZData = createNYCKQZData()
function createNYCKQZData() {
  return [
    {
      dklpd: '平原田块面积(mu)',
      low: '<150',
      lower: '150-400',
      normal: '400-600',
      higher: '600-900',
      high: '>=900'
    },
    {
      dklpd: '山地丘陵田块面积(mu)',
      low: '<80',
      lower: '80-150',
      normal: '150-250',
      higher: '250-400',
      high: '>=400'
    },
    {
      dklpd: '海域斑块面积(ha)',
      low: '<250',
      lower: '250-500',
      normal: '500-1000',
      higher: '1000-2000',
      high: '>=2000'
    }
  ]
}

// 农业生产适宜性分区参考判别矩阵
export const NYPBJZ = createNYPBJZ()
export function createNYPBJZ() {
  return [
    {
      nycznl: '高',
      high: '适宜',
      higher: '适宜',
      normal: '适宜',
      lower: '一般适宜',
      low: '不适宜'
    },
    {
      nycznl: '较高',
      high: '适宜',
      higher: '适宜',
      normal: '一般适宜',
      lower: '一般适宜',
      low: '不适宜'
    },
    {
      nycznl: '中等',
      high: '一般适宜',
      higher: '一般适宜',
      normal: '一般适宜',
      lower: '一般适宜',
      low: '不适宜'
    },
    {
      nycznl: '较低',
      high: '一般适宜',
      higher: '一般适宜',
      normal: '一般适宜',
      lower: '一般适宜',
      low: '不适宜'
    },
    {
      nycznl: '低',
      high: '不适宜',
      higher: '不适宜',
      normal: '不适宜',
      lower: '不适宜',
      low: '不适宜'
    }
  ]
}
// 城镇地块集中度评价分级参考阈表
export const CZCKQB = createCZCKQB()
function createCZCKQB() {
  return [
    {
      dkjzd: '地块集中度',
      low: '低',
      lower: '较低',
      normal: '一般',
      higher: '较高',
      high: '高'
    }
  ]
}

// 城镇区位优势度分级参考阈值
export const CZQYYSDCKQZ = createCZQYYSDCKQZ()
export function createCZQYYSDCKQZ() {
  return [
    {
      pjzb: '区位优势度',
      fjckqz: '车程<=1小时',
      fz: '5',
      reason: '好'
    },
    {
      pjzb: '区位优势度',
      fjckqz: '1小时＜车程＜＝２小时',
      fz: '4',
      reason: '较好'
    },
    {
      pjzb: '区位优势度',
      fjckqz: '2小时＜车程＜＝3.5小时',
      fz: '3',
      reason: '一般'
    },
    {
      pjzb: '区位优势度',
      fjckqz: '3.5小时＜车程＜＝5小时',
      fz: '2',
      reason: '较差'
    },
    {
      pjzb: '区位优势度',
      fjckqz: '车程＞５小时',
      fz: '1',
      reason: '差'
    }
  ]
}

// 城镇舒适度分级参考阈值
export const CZSSDCKQZ = createCZSSDCKQZ()
function createCZSSDCKQZ() {
  return [
    {
      level: '1',
      standard: '50~70',
      reason: '好'
    },
    {
      level: '2',
      standard: '45~50 或 70~75',
      reason: '较好'
    },
    {
      level: '3',
      standard: '40~45 或 75~80',
      reason: '一般'
    },
    {
      level: '4',
      standard: '35~40 或 80~85',
      reason: '较差'
    },
    {
      level: '5',
      standard: '<35 或≥85',
      reason: '差'
    }
  ]
}

// 城镇综合优势度（省级层面）参考判别矩阵
export const CZZHYSDPBJZ = createCZZHYSDPBJZ()
function createCZZHYSDPBJZ() {
  return [
    {
      ssd: '好',
      good: '高',
      preferably: '高',
      normal: '较高',
      poor: '一般',
      bad: '一般'
    },
    {
      ssd: '好',
      good: '高',
      preferably: '高',
      normal: '较高',
      poor: '一般',
      bad: '较低'
    },
    {
      ssd: '一般',
      good: '较高',
      preferably: '较高',
      normal: '一般',
      poor: '一般',
      bad: '低'
    },
    {
      ssd: '较差',
      good: '较高',
      preferably: '一般',
      normal: '较低',
      poor: '较低',
      bad: '低'
    },
    {
      ssd: '差',
      good: '一般',
      preferably: '一般',
      normal: '较低',
      poor: '低',
      bad: '低'
    }
  ]
}

function createScopeData() {
  let arr = []
  for (let i = 0; i < xzqhs.length; i++) {
    arr.push({
      xzqh: xzqhs[i],
      wgsl: getRandomIntInclusive(1, 50),
      fgmj: getRandomIntInclusive(1, 10),
      bl: getRandomIntInclusive(1, 50) + '%'
    })
  }
  return arr
}

function createLevelData() {
  let arr = []
  for (let i = 0; i < levels.length; i++) {
    arr.push({
      level: levels[i],
      wgsl: getRandomIntInclusive(1, 50),
      fgmj: getRandomIntInclusive(1, 10),
      bl: getRandomIntInclusive(1, 50) + '%'
    })
  }
  return arr
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
