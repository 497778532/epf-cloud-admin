let chartsUtils = {}

const ROOT_PATH = '../../../../../static/map/json/province/'

chartsUtils.getGeoJSON = function (code) {
  var geojson = ROOT_PATH + `${code}.json`
  return geojson
}

chartsUtils.getMapOptions = function (data) {
  console.log(data)
  let visualMap = [{
    type: 'piecewise',
    splitNumber: 5,
    min: 1,
    max: 5,
    inRange: {
      color: ['#FFD180', '#FCB065', '#FF9100', '#FF6D00', '#E65100']
    },
    pieces: [
      { value: 1, label: '高', color: '#FFD180' },
      { value: 2, label: '较高', color: '#FCB065' },
      { value: 3, label: '一般', color: '#FF9100' },
      { value: 4, label: '较低', color: '#FF6D00' },
      { value: 5, label: '低', color: '#E65100' } // 大气质量低
    ]
  }]
  let tooltip = {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2,
    // backgroundColor: '#fff',
    // borderWidth: 1,
    // textStyle: {
    //   color: "#303030"
    // },
    formatter: function (params) {
      let num = params.value
      let value = '暂无数据'
      if (num == 1) { value = '高' } else if (num == 2) { value = '较高' } else if (num == 3) { value = '一般' } else if (num == 4) { value = '较低' } else if (num == 5) { value = '低' }
      let tooltip = `${params.name}<br/>大气质量：${value}`
      return tooltip
    }
  }
  let series = [{
    name: '大气环境质量地图',
    mapType: 'Air Quality',
    type: 'map',
    aspectScale: 1.0,
    roam: true,
    zoom: 1,
    scaleLimit: {
      min: 1,
      max: 5
    },
    label: {
      normal: { show: false },
      emphasis: { show: false }
    },
    itemStyle: {
      normal: {},
      emphasis: {
        areaColor: 'white',
        borderWidth: 2,
        borderColor: '#5276f1'
      }
    },
    data: data
  }]

  return {
    tooltip: tooltip,
    visualMap: visualMap,
    series: series
  }
}

export default chartsUtils

