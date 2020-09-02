const urlPrefix = 'http://19.18.128.73:6080/arcgis/rest/services/data/DynamicLayerServer/MapServer/exts/JCZCRestSOE/'

export const config = {
  outFields: [{
    name: 'landuseType',
    alias: '分类'
  },
  {
    name: 'landuseName',
    alias: '地类名称'
  },
  {
    name: 'landuseCode',
    alias: '地类编码'
  },
  {
    name: 'landuseRatio',
    alias: '占比(%)'
  },
  {
    name: 'landuseArea',
    alias: '面积(公顷)'
  }
  ],
  aliasConf: [{
    name: 'JSGQ',
    alias: '建设用地管制区'
  }, {
    name: 'TDYT',
    alias: '土地用途'
  }, {
    name: 'JBNT',
    alias: '基本农田'
  }, {
    name: 'GHYT1',
    alias: '规划用途'
  }, {
    name: 'GHYT2',
    alias: '规划用途'
  }, {
    name: 'DLTB1',
    alias: '土地利用现状'
  }, {
    name: 'DLTB2',
    alias: '土地利用现状'
  }, {
    name: 'DLTB1',
    alias: '土地利用现状'
  }, {
    name: 'NYD',
    alias: '农用地'
  }, {
    name: 'JSYD',
    alias: '建设用地'
  }, {
    name: 'WLYD',
    alias: '未利用地'
  }, {
    name: 'MJ',
    alias: '建设用地剩余空间'
  }, {
    name: 'CXMJ',
    alias: '城乡建设用地剩余空间'
  }, {
    name: 'JTSLMJ',
    alias: '交通水利用地剩余空间'
  }, {
    name: 'QTJSYDMJ',
    alias: '其他建设用地剩余空间'
  }, {
    name: 'YDHX',
    alias: '用地红线'
  }, {
    name: 'YSHX',
    alias: '预审红线'
  }, {
    name: 'SJZXCQ',
    alias: '市级中心城区范围线'
  }, {
    name: 'XJZXCQ',
    alias: '县级中心城区范围线'
  }, {
    name: 'YJJBNT',
    alias: '永久基本农田'
  }, {
    name: 'STBHHX',
    alias: '生态保护红线'
  }, {
    name: 'YQFW',
    alias: '园区范围线'
  }],
  // 土地利用分析(规划分类)
  presentConf: {
    description: '现状分析',
    name: 'QueryPresent',
    parameters: '',
    url: urlPrefix + 'QuerySituationGH'
  },
  // 永久基本农田
  YJJBNTConf: {
    description: '永久基本农田',
    name: 'QueryYJJBNT',
    parameters: '',
    url: urlPrefix + 'QueryYJJBNT'
  },
  // 生态保护红线
  STBHHXConf: {
    description: '生态保护红线',
    name: 'QuerySTBHHX',
    parameters: '',
    url: urlPrefix + 'QuerySTBHHX'
  },
  SYKJConf: {
    description: '剩余空间分析',
    name: 'QuerySYKJ',
    parameters: '',
    url: urlPrefix + 'QuerySYKJ'
  },
  // 用地红线分析
  YDHXConf: {
    description: '用地红线分析',
    name: 'QuerySTBHHX',
    parameters: '',
    url: urlPrefix + 'QueryHongXian'
  },
  // 中心城区范围分析
  ZXCQConf: {
    description: '中心城区范围分析',
    name: 'QueryZXCQ',
    parameters: '',
    url: urlPrefix + 'QueryZXCQ'
  },
  // 园区范围分析
  YQFWConf: {
    description: '园区范围分析',
    name: 'QueryYQFW',
    parameters: '',
    url: urlPrefix + 'QueryYQFW'
  },
  // 城市总体规划分析
  CSZTGHConf: {
    description: '城市总体规划分析',
    name: 'QueryCSZTGH',
    parameters: '',
    url: urlPrefix + 'QueryCSZTGH'
  },
  // 高标准农田范围分析
  GBZNTFXConf: {
    description: '高标准农田范围分析',
    name: 'QueryGBZNTFX',
    parameters: '',
    fields: [{
      name: 'DK_ID',
      alias: '地块ID'
    }, {
      name: 'DK_MJ',
      alias: '地块面积（单位：平方米）'
    }, {
      name: 'XZQHDM',
      alias: '行政区划代码（乡镇级）'
    }, {
      name: 'XZQHMC',
      alias: '行政区划名称（乡镇级）'
    }, {
      name: 'BSM',
      alias: '标识码'
    }, {
      name: 'TBBH',
      alias: '图斑编号'
    }, {
      name: 'DLBM',
      alias: '地类编码'
    }, {
      name: 'DLMC',
      alias: '地类名称'
    }, {
      name: 'QSXZ',
      alias: '权属性质'
    }, {
      name: 'ZLDWDM',
      alias: '坐落单位代码'
    }, {
      name: 'ZLDWMC',
      alias: '坐落单位名称'
    }, {
      name: 'ZLDJDM',
      alias: '质量等级代码'
    }, {
      name: 'JBNTLX',
      alias: '基本农田类型'
    }, {
      name: 'TBMJ',
      alias: '图斑面积'
    }, {
      name: 'YZMJ',
      alias: '压占面积（单位：平方米）'
    }, {
      name: 'YZGeoJSON',
      alias: '压占图形：JSON格式'
    }, {
      name: 'F_SJLY',
      alias: '数据来源'
    }, {
      name: 'F_SCDW',
      alias: '生产单位'
    }, {
      name: 'F_SJBB',
      alias: '数据版本'
    }],
    url: 'http://19.16.240.49:8866/YZFXService.asmx?op=GBZNTFX'
  }
}
