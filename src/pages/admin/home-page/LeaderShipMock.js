export const MAPSERVICE = [
  {
    title: '城市总体规划',
    type: 'wmts',
    //url:'http://19.18.128.73:6080/arcgis/rest/services/2000服务/城市总体规划2000/MapServer',
    url:'http://19.15.73.111/arcgisserver12/rest/services/城市规划类数据服务/广东省城市总体规划/MapServer',
    visible: true,
    useProxy: false
  },
  {
    title: '土地规划用途分区',
    type: 'image',
    url:
      'http://19.16.240.45:6080/arcgis/rest/services/GHSJ_UPDATE/TDYT20180622/MapServer',
    visible: false,
    useProxy: false
  },
  {
    title: '土地规划期末类图斑',
    type: 'image',
    url:
      'http://19.16.240.45:6080/arcgis/rest/services/GHSJ_UPDATE/QMDLTB20180622/MapServer',
    visible: false,
    useProxy: false
  },
  {
    title: '土地利用现状',
    type: 'image',
    url:
      'http://19.16.240.25:6080/arcgis/rest/services/ServerTD/TDXZ2016/MapServer',
    visible: false,
    useProxy: false
  },
  {
    title: '生态保护红线',
    type: 'wmts',
    //url:'http://19.18.128.73:6080/arcgis/rest/services/2000服务/生态保护红线//MapServer',
    url: "http://19.15.73.111/arcgisserver12/rest/services/三线管控/生态保护红线/MapServer",
    visible: false,
    useProxy: false
  },
  {
    title: '永久基本农田',
    type: 'wmts',
    // url:'http://19.18.128.73:6080/arcgis/rest/services/2000服务/永久基本农田2000/MapServer',
    url: 'http://19.15.73.111/arcgisserver12/rest/services/三线管控/永久基本农田划定/MapServer',
    visible: false,
    useProxy: false
  },
  {
    title: '城镇开发边界',
    type: 'wmts',
    //url: 'http://19.18.128.73:6080/arcgis/rest/services/2000服务/城镇开发边界/MapServer',
    url:'http://19.15.73.111/arcgisserver12/rest/services/三线管控/广东省城镇开发边界/MapServer',
    visible: false,
    useProxy: false
  },
  {
    title: '海洋综合整治规划',
    type: 'image',
    url:
      'http://19.15.73.111/arcgisserver12/rest/services/广东省海洋规划/海洋综合整治规划/MapServer',
    visible: false,
    useProxy: false
  }
]
