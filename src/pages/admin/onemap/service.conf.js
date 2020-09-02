var requestInfo = {
  ApplicationGUID: '', // 应用程序唯一标识（常量），大数据提供
  AnalysisID: '', // 分析唯一标识
  SFFHTX: false, // 是否返回图形(默认为false)
  Blocks: [
    // {
    //   DK_ID: '', // 地块标识
    //   GeoJson: '' // 地块空间图形的JSON字符串
    // }
  ] // 地块信息（数组）
}
const isTest = false
const formalDomain = 'http://19.16.240.63:8888/' // 正式地址
const testDomain = 'http://19.16.240.49:8866/' // 测试地址
// const domain = isTest ? testDomain : formalDomain
const domain = formalDomain
const asmx = 'YZFXService.asmx/'
const asmxGH = 'GHYZFXService.asmx/'

var analysisConfig = {
  // 1.1.建新区分析
  JXQFXConfig: {
    url: domain + asmxGH + 'JXQFX',
    requestInfo: requestInfo,
    fields: [{
      name: 'UniqueTaskID',
      alias: '唯一任务ID '
    },
    {
      name: 'AnalysisID',
      alias: '分析ID'
    },
    {
      name: 'StatusCode',
      alias: '响应状态码，成功：200，失败：404'
    },
    {
      name: 'Message',
      alias: '响应信息'
    },
    {
      name: 'AnalysisResults',
      alias: '分析结果（数组）'
    },
    {
      name: 'ResultRecords',
      alias: '分析结果记录集合数组'
    },
    {
      name: 'DK_ID',
      alias: '地块ID'
    },
    {
      name: 'DK_MJ',
      alias: '地块面积（单位：平方米）'
    },
    {
      name: 'XH',
      alias: '序号'
    },
    {
      name: 'XMQXH',
      alias: '项目区序号'
    },
    {
      name: 'LRRQ',
      alias: '录入日期'
    },
    {
      name: 'XMQM',
      alias: '项目区名'
    },
    {
      name: 'JXQZMJ',
      alias: '建新区总面积'
    },
    {
      name: 'JXQZYGDMJ',
      alias: '建新区占用耕地面积'
    },
    {
      name: 'GGZZZBGM',
      alias: '挂钩周转指标规模'
    },
    {
      name: 'DKSX',
      alias: '地块属性'
    },
    {
      name: 'DKBH',
      alias: '地块编号'
    },
    {
      name: 'DKMC',
      alias: '地块名称'
    },
    {
      name: 'XZYT',
      alias: '现状用途'
    },
    {
      name: 'GHYT',
      alias: '规划用途'
    },
    {
      name: 'DKMJ',
      alias: '地块面积'
    },
    {
      name: 'BBH',
      alias: '版本号'
    },
    {
      name: 'SLS',
      alias: '是历史'
    },
    {
      name: 'XJDM',
      alias: '县级代码'
    },
    {
      name: 'YZMJ',
      alias: '压占面积（单位：平方米）'
    },
    {
      name: 'YZGeoJSON',
      alias: '压占图形：JSON格式'
    },
    {
      name: 'F_SJLY',
      alias: '数据来源'
    },
    {
      name: 'F_SCDW',
      alias: '生产单位'
    },
    {
      name: 'F_SJBB',
      alias: '数据版本'
    }
    ]
  },
  // 1.2.拆旧区分析
  CJQFXConfig: {
    url: domain + asmxGH + 'CJQFX',
    fields: [{
      name: 'UniqueTaskID',
      alias: '唯一任务ID '
    },
    {
      name: 'AnalysisID',
      alias: '分析ID'
    },
    {
      name: 'StatusCode',
      alias: '响应状态码，成功：200，失败：404'
    },
    {
      name: 'Message',
      alias: '响应信息'
    },
    {
      name: 'AnalysisResults',
      alias: '分析结果（数组）'
    },
    {
      name: 'ResultRecords',
      alias: '分析结果记录集合数组'
    },
    {
      name: 'DK_ID',
      alias: '地块ID'
    },
    {
      name: 'DK_MJ',
      alias: '地块面积（单位：平方米）'
    },
    {
      name: 'XH',
      alias: '序号'
    },
    {
      name: 'XMQXH',
      alias: '项目区序号'
    },
    {
      name: 'LRRQ',
      alias: '录入日期'
    },
    {
      name: 'XMQM',
      alias: '项目区名'
    },
    {
      name: 'CJQZMJ',
      alias: '拆旧区总面积'
    },
    {
      name: 'CJQFKMJ',
      alias: '拆旧区复垦耕地面积'
    },
    {
      name: 'DKSX',
      alias: '地块属性'
    },
    {
      name: 'DKBH',
      alias: '地块编号'
    },
    {
      name: 'DKMC',
      alias: '地块名称'
    },
    {
      name: 'XZYT',
      alias: '现状用途'
    },
    {
      name: 'GHYT',
      alias: '规划用途'
    },
    {
      name: 'DKMJ',
      alias: '地块面积'
    },
    {
      name: 'BBH',
      alias: '版本号'
    },
    {
      name: 'SLS',
      alias: '是历史'
    },
    {
      name: 'XJDM',
      alias: '县级代码'
    },
    {
      name: 'YZMJ',
      alias: '压占面积（单位：平方米）'
    },
    {
      name: 'YZGeoJSON',
      alias: '压占图形：JSON格式'
    },
    {
      name: 'F_SJLY',
      alias: '数据来源'
    },
    {
      name: 'F_SCDW',
      alias: '生产单位'
    },
    {
      name: 'F_SJBB',
      alias: '数据版本'
    }
    ]
  },
  // 1.3.调整地块范围分析
  TZDKFWFXConfig: {
    url: domain + asmxGH + 'TZDKFWFX',
    fields: [{
      name: 'UniqueTaskID',
      alias: '唯一任务ID '
    },
    {
      name: 'AnalysisID',
      alias: '分析ID'
    },
    {
      name: 'StatusCode',
      alias: '响应状态码，成功：200，失败：404'
    },
    {
      name: 'Message',
      alias: '响应信息'
    },
    {
      name: 'AnalysisResults',
      alias: '分析结果（数组）'
    },
    {
      name: 'ResultRecords',
      alias: '分析结果记录集合数组'
    },
    {
      name: 'DK_ID',
      alias: '地块ID'
    },
    {
      name: 'DK_MJ',
      alias: '地块面积（单位：平方米）'
    },
    {
      name: 'XMMC',
      alias: '项目名称'
    },
    {
      name: 'XZQHDM',
      alias: '行政区划代码（乡镇级）'
    },
    {
      name: 'XZQHMC',
      alias: '行政区划名称（乡镇级）'
    },
    {
      name: 'DKSX',
      alias: '地块属性'
    },
    {
      name: 'DKBH',
      alias: '地块编号'
    },
    {
      name: 'DKMC',
      alias: '地块名称'
    },
    {
      name: 'DKSX',
      alias: '地块属性'
    },
    {
      name: 'DKBH',
      alias: '地块编号'
    },
    {
      name: 'GHFLBM',
      alias: '规划分类编码'
    },
    {
      name: 'DKMJ',
      alias: '地块面积'
    },
    {
      name: 'DLMJ',
      alias: '地类面积'
    },
    {
      name: 'TZLX',
      alias: '调整类型'
    },
    {
      name: 'BGH',
      alias: '变更号'
    },
    {
      name: 'BGDATE',
      alias: '变更日期'
    },
    {
      name: 'DBCODE',
      alias: '数据库编码'
    },
    {
      name: 'DBNAME',
      alias: '数据库名称'
    },
    {
      name: 'DH',
      alias: '带号'
    },
    {
      name: 'V_KS',
      alias: '开始时间'
    },
    {
      name: 'V_JS',
      alias: '结束时间'
    },
    {
      name: 'V_BGH',
      alias: '变更号'
    },
    {
      name: 'YZMJ',
      alias: '压占面积（单位：平方米）'
    },
    {
      name: 'YZGeoJSON',
      alias: '压占图形：JSON格式'
    },
    {
      name: 'F_SJLY',
      alias: '数据来源'
    },
    {
      name: 'F_SCDW',
      alias: '生产单位'
    },
    {
      name: 'F_SJBB',
      alias: '数据版本'
    }
    ]
  },
  // 1.4.预变更分析
  YBGFXConfig: {
    url: domain + asmxGH + 'YBGFX'
  },
  // 1.5.验收拆旧复垦分析
  YSCJFKFXConfig: {
    url: domain + asmxGH + 'YSCJFKFX'
  },
  // 1.6.预审红线分析
  YSHXFXConfig: {
    url: domain + asmxGH + 'YSHXFX'
  },
  // 1.7.中心城区范围分析
  ZXCQFWFXConfig: {
    url: domain + asmxGH + 'ZXCQFWFX'
  },
  // 1.8.规划用途区分析
  GHYTQFXConfig: {
    url: domain + asmx + 'GHYTQFX'
  },
  // 1.9.已批红线分析
  YPHXFXConfig: {
    url: domain + asmx + 'YPHXFX'
  },
  // 1.10.建设用地管制区分析
  JSYDGZQFXConfig: {
    url: domain + asmx + 'JSYDGZQFX'
  },
  // 1.11.调整后地类耕地分析
  TZHDLGDFXConfig: {
    url: domain + asmx + 'TZHDLGDFX'
  },
  // 1.12.规划地类分析
  GHDLFXConfig: {
    url: domain + asmxGH + 'GHDLFX'
  },
  // 1.13.高标准农田分析
  GBZNTFXConfig: {
    url: domain + asmx + 'GBZNTFX',
    fields: [
      // { name: 'UniqueTaskID', alias: '唯一任务ID'},
      // { name: 'AnalysisID', alias: '分析ID'},
      // { name: 'StatusCode', alias: '响应状态码'},
      // { name: 'Message', alias: '响应信息'},
      // { name: 'AnalysisResults', alias: '分析结果'},
      // { name: 'ResultRecords', alias: '分析结果记录集合数组'},
      { name: 'DK_ID', alias: '地块ID' },
      { name: 'DK_MJ', alias: '地块面积（单位：平方米）' },
      { name: 'XZQHDM', alias: '行政区划代码（乡镇级）' },
      { name: 'XZQHMC', alias: '行政区划名称（乡镇级）' },
      { name: 'XMBH', alias: '项目编号' },
      { name: 'XMMC', alias: '项目名称' },
      { name: 'YZMJ', alias: '压占面积（单位：平方米）' },
      { name: 'YZGeoJSON', alias: '压占图形：JSON格式' }

    ]
  },
  // 1.14.城市周边永久基本农田分析
  CSZBYJJBNTFXConfig: {
    url: domain + asmx + 'CSZBYJJBNTFX',
    fields: [
      //   {
      //   name: 'UniqueTaskID',
      //   alias: '唯一任务ID'
      // },
      // {
      //   name: 'AnalysisID',
      //   alias: '分析ID'
      // },
      // {
      //   name: 'StatusCode',
      //   alias: '响应状态码'
      // },
      // {
      //   name: 'Message',
      //   alias: '响应信息'
      // },
      // {
      //   name: 'AnalysisResults',
      //   alias: '分析结果（数组）'
      // },
      // {
      //   name: 'ResultRecords',
      //   alias: '分析结果记录集合数组'
      // },
      {
        name: 'DK_ID',
        alias: '地块ID'
      },
      {
        name: 'DK_MJ',
        alias: '地块面积（单位：平方米）'
      },
      {
        name: 'BSM',
        alias: '基本农田保护图斑标识码'
      },
      {
        name: 'TBBH',
        alias: '图斑编号'
      },
      {
        name: 'JBNTTBBH',
        alias: '基本农田图斑编号'
      },
      {
        name: 'DLBM',
        alias: '地类编码'
      },
      {
        name: 'DLMC',
        alias: '地类名称'
      },
      {
        name: 'QSXZ',
        alias: '权属性质'
      },
      {
        name: 'ZLDWDM',
        alias: '坐落单位代码'
      },
      {
        name: 'ZLDWMC',
        alias: '坐落单位名称'
      },
      {
        name: 'ZLDJDM',
        alias: '质量等级代码'
      },
      {
        name: 'JBNTLX',
        alias: '基本农田类型'
      },
      {
        name: 'XZQHDM',
        alias: '行政区划代码'
      },
      {
        name: 'XZQHMC',
        alias: '行政区划名称'
      },
      {
        name: 'DLBZ',
        alias: '地类备注'
      },
      {
        name: 'SFCSZB',
        alias: '是否在城市周边'
      },
      {
        name: 'YZJBNTMJ',
        alias: '压占基本农田面积（单位：平方米=基本农田面积*压占比例'
      },
      {
        name: 'YZGeoJSON',
        alias: '压占图形：JSON格式'
      }

    ]
  },
  // 1.15.永久基本农田分析服务
  YJJBNTFXConfig: {
    url: domain + asmx + 'YJJBNTFX'
  },
  // 1.16.县级行政区分析服务
  XZQFXConfig: {
    url: domain + asmx + 'XZQFX'
  },
  // 1.17.占用耕地质量分析
  ZYGDZLFXConfig: {
    url: domain + asmx + 'ZYGDZLFX'
  },
  // 1.18.报批项目压占耕地分析
  BPXMYZGDFXConfig: {
    url: domain + asmx + 'BPXMYZGDFX'
  },
  // 1.19.占用耕地分析
  ZYGDFXConfig: {
    url: domain + asmx + 'ZYGDFX'
  },
  // 1.20.重叠已批红线分析
  CDYPHXFX: {
    url: domain + asmx + 'CDYPHXFX'
  },
  // 1.21.在批红线分析
  ZPHXFX: {
    url: domain + asmx + 'ZPHXFX'
  }
}

export { analysisConfig }
