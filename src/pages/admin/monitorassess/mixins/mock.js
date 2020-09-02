// 补划潜力区Param
export const BHQLQ_PARAM = {
  url: 'http://120.79.99.87:6080/arcgis/rest/services/data/DynamicLayerServer/MapServer',
  sublayers: [{
    title: '优等地',
    source: {
      type: 'dataLayer',
      dataSource: {
        type: 'table',
        workspaceId: 'AnalysisData',
        dataSourceName: 'intersect_20200108094556'
      }
    },
    definitionExpression: 'GJLYD >= 1 AND GJLYD < 5',
    renderer: {
      type: 'simple',
      symbol: {
        type: 'simple-fill',
        color: [93, 177, 255, 1],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      }
    }
  },
  {
    title: '高等地',
    source: {
      type: 'dataLayer',
      dataSource: {
        type: 'table',
        workspaceId: 'AnalysisData',
        dataSourceName: 'intersect_20200108094556'
      }
    },
    definitionExpression: 'GJLYD >= 5 AND GJLYD < 9',
    renderer: {
      type: 'simple',
      symbol: {
        type: 'simple-fill',
        color: [89, 212, 212, 1],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      }
    }
  },
  {
    title: '中等地',
    source: {
      type: 'dataLayer',
      dataSource: {
        type: 'table',
        workspaceId: 'AnalysisData',
        dataSourceName: 'intersect_20200108094556'
      }
    },
    definitionExpression: 'GJLYD >= 9 AND GJLYD < 13',
    renderer: {
      type: 'simple',
      symbol: {
        type: 'simple-fill',
        color: [109, 212, 140, 1],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      }
    }
  },
  {
    title: '低等地',
    source: {
      type: 'dataLayer',
      dataSource: {
        type: 'table',
        workspaceId: 'AnalysisData',
        dataSourceName: 'intersect_20200108094556'
      }
    },
    definitionExpression: 'GJLYD >= 13 AND GJLYD <= 15',
    renderer: {
      type: 'simple',
      symbol: {
        type: 'simple-fill',
        color: [251, 219, 90, 1],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      }
    }
  }
  ]
}
// 补划潜力区分析返回结果
export const BHQLQ_RESULT = {
  'msg': '操作成功！',
  'dynamicLayerInfo': [
    {
      'id': '1',
      'type': 'dataLayer',
      'dataSourceName': 'select_20200108094307',
      'workspaceId': 'AnalysisData',
      'layerName': 'select_441826_cultivatedLand',
      'layerDefinitions': '[]'
    },
    {
      'id': '1',
      'type': 'dataLayer',
      'dataSourceName': 'select_20200108094424',
      'workspaceId': 'AnalysisData',
      'layerName': 'select_441826_basicFarmland',
      'layerDefinitions': '[]'
    },
    {
      'id': '1',
      'type': 'dataLayer',
      'dataSourceName': 'select_20200108094435',
      'workspaceId': 'AnalysisData',
      'layerName': 'select_441826_farmlandPreparation',
      'layerDefinitions': '[]'
    },
    {
      'id': '1',
      'type': 'dataLayer',
      'dataSourceName': 'select_20200108094436',
      'workspaceId': 'AnalysisData',
      'layerName': 'select_441826_cultivatedLandQuality',
      'layerDefinitions': '[]'
    },
    {
      'id': '1',
      'type': 'dataLayer',
      'dataSourceName': 'erase_20200108094535',
      'workspaceId': 'AnalysisData',
      'layerName': 'erase_441826_basicFarmland',
      'layerDefinitions': '[]'
    },
    {
      'id': '1',
      'type': 'dataLayer',
      'dataSourceName': 'erase_20200108094550',
      'workspaceId': 'AnalysisData',
      'layerName': 'erase_441826_farmlandPreparation',
      'layerDefinitions': '[]'
    },
    {
      'id': '1',
      'type': 'dataLayer',
      'dataSourceName': 'intersect_20200108094556',
      'workspaceId': 'AnalysisData',
      'layerName': 'intersect_441826_cultivatedLandQuality',
      'layerDefinitions': '[]'
    },
    {
      'id': '1',
      'type': 'dataLayer',
      'dataSourceName': 'erase_20200107091605',
      'workspaceId': 'AnalysisData',
      'layerName': 'erase_441826_prospectingRight',
      'layerDefinitions': '[]'
    }
  ],
  'code': 0,
  'statisticsInfo': [
    {
      'SUM_TBMJ': '866647.03',
      'FREQUENCY': 472,
      'GJLYD': 4
    },
    {
      'SUM_TBMJ': '3249837.54',
      'FREQUENCY': 1196,
      'GJLYD': 5
    },
    {
      'SUM_TBMJ': '3194033.37',
      'FREQUENCY': 1024,
      'GJLYD': 6
    },
    {
      'SUM_TBMJ': '1946369.05',
      'FREQUENCY': 710,
      'GJLYD': 7
    },
    {
      'SUM_TBMJ': '279773.10',
      'FREQUENCY': 233,
      'GJLYD': 8
    },
    {
      'SUM_TBMJ': '2047113.35',
      'FREQUENCY': 548,
      'GJLYD': 9
    },
    {
      'SUM_TBMJ': '666004.76',
      'FREQUENCY': 176,
      'GJLYD': 10
    }
  ],
  'legendField': 'GJLYD'
}

// 三线管控服务
export const MAPSERVICE = {
  '永久基本农田保护红线': {
    title: '永久基本农田划定',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/三线管控/永久基本农田划定/MapServer'
  },
  '生态保护红线': {
    title: '生态保护红线',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/三线管控/生态保护红线/MapServer'
  },
  '城镇开发边界控制线': {
    title: '城镇开发边界控制线',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/三线管控/广东省城镇开发边界/MapServer'
  },
  '公共服务用地': {
    title: '公共服务用地',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/公共服务用地/MapServer'
  },
  '公园绿地与广场用地': {
    title: '公园绿地与广场用地',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/公园与绿地和广场用地/MapServer'
  },
  '拆旧复垦': {
    title: '拆旧复垦',
    type: 'image',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/拆旧复垦/MapServer'
  }
}

// 人地关系地图服务
export const PEOPLEANDLAND_MAPSERVICE = [
  {
    title: '城镇住宅用地',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/城镇住宅用地/MapServer'
  },
  {
    title: '城镇住宅用地',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/城镇住宅用地/MapServer'
  },
  {
    title: '公园与绿地和广场用地',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/公园与绿地和广场用地/MapServer'
  },
  {
    title: '公园与绿地和广场用地',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/公园与绿地和广场用地/MapServer'
  },
  {
    title: '公共服务用地',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/公共服务用地/MapServer'
  },
  {
    title: '公共服务用地',
    type: 'wmts',
    useProxy: false,
    url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/公共服务用地/MapServer'
  }
]