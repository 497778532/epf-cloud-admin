<template>
  <div class="exchangeTable">
    <div id="mapBox" ref="chinaChart"></div>
  </div>
</template>
<script>
import axios from 'axios'
import echarts from 'echarts'
import commonecharts from '../../onemap/topic/commonecharts.js'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  data() {
    return {
      mapTopicData: {},
      chart: null,
      jsonData: {
        cantonCode: '440000',
        cantonCodeName: '广东省',
        SEList: [
          {
            start: '潮州市',
            end: '广州市',
            message: '900'
          },
          {
            start: '韶关市',
            end: '广州市',
            message: '600'
          },

          {
            start: '清远市',
            end: '广州市',
            message: '600'
          },
          {
            start: '茂名市',
            end: '广州市',
            message: '800'
          },
          {
            start: '湛江市',
            end: '广州市',
            message: '700'
          },
          {
            start: '江门市',
            end: '广州市',
            message: '700'
          },
          {
            start: '肇庆市',
            end: '广州市',
            message: '500'
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          },
          {
            start: '',
            end: '',
            message: ''
          }
        ],
        checked: true,
        flowStart: '0',
        flowLine: '0',
        flowEnd: '0',
        lineProgram: '1',
        colorProgram: '#5ca7b0, #a8b76e, #e9c437, #e38f46, #dc5b55',
        showData: '0',
        colorTableList: [
          {
            colorSelect: '#5ca7b0',
            colorMin: '1',
            colorMax: '300',
            colorMessage: ''
          },
          {
            colorSelect: '#a8b76e',
            colorMin: '300',
            colorMax: '600',
            colorMessage: ''
          },
          {
            colorSelect: '#e9c437',
            colorMin: '600',
            colorMax: '900',
            colorMessage: ''
          },
          {
            colorSelect: '#dc5b55',
            colorMin: '1000',
            colorMax: '2000',
            colorMessage: ''
          }
        ],
        cantonList: [
          {
            rowName: '广州市',
            rowMessage: '99'
          },
          {
            rowName: '韶关市',
            rowMessage: '199'
          },
          {
            rowName: '深圳市',
            rowMessage: '299'
          },
          {
            rowName: '珠海市',
            rowMessage: '399'
          },
          {
            rowName: '汕头市',
            rowMessage: ''
          },
          {
            rowName: '佛山市',
            rowMessage: ''
          },
          {
            rowName: '江门市',
            rowMessage: ''
          },
          {
            rowName: '湛江市',
            rowMessage: ''
          },
          {
            rowName: '茂名市',
            rowMessage: ''
          },
          {
            rowName: '肇庆市',
            rowMessage: ''
          },
          {
            rowName: '惠州市',
            rowMessage: ''
          },
          {
            rowName: '梅州市',
            rowMessage: ''
          },
          {
            rowName: '汕尾市',
            rowMessage: ''
          },
          {
            rowName: '河源市',
            rowMessage: ''
          },
          {
            rowName: '阳江市',
            rowMessage: ''
          },
          {
            rowName: '清远市',
            rowMessage: ''
          },
          {
            rowName: '东莞市',
            rowMessage: ''
          },
          {
            rowName: '中山市',
            rowMessage: ''
          },
          {
            rowName: '潮州市',
            rowMessage: ''
          },
          {
            rowName: '揭阳市',
            rowMessage: ''
          },
          {
            rowName: '云浮市',
            rowMessage: ''
          }
        ],
        borderWidth: '1',
        borderColor: '#f00',
        isShow: true,
        mapColorData: [
          {
            start: 1,
            end: 100,
            color: '#6cadff',
            label: ''
          },
          {
            start: 100,
            end: 200,
            color: '#28b9d0',
            label: ''
          },
          {
            start: 200,
            end: 300,
            color: '#d19eff',
            label: ''
          },
          {
            start: 300,
            end: 400,
            color: '#ffdb57',
            label: ''
          }
        ],
        allData: [
          {
            name: '广州市',
            value: '89',
            value2: '23'
          },
          {
            name: '韶关市',
            value: '209',
            value2: '23'
          },
          {
            name: '深圳市',
            value: '12',
            value2: '23'
          },
          {
            name: '珠海市',
            value: '0',
            value2: '23'
          },
          {
            name: '汕头市',
            value: '241',
            value2: '23'
          },
          {
            name: '佛山市',
            value: '99',
            value2: '23'
          },
          {
            name: '江门市',
            value: '412',
            value2: '23'
          },
          {
            name: '湛江市',
            value: '222',
            value2: '23'
          },
          {
            name: '茂名市',
            value: '99',
            value2: '23'
          },
          {
            name: '肇庆市',
            value: '51',
            value2: '23'
          },
          {
            name: '惠州市',
            value: '89',
            value2: '23'
          },
          {
            name: '梅州市',
            value: '76',
            value2: '23'
          },
          {
            name: '汕尾市',
            value: '67',
            value2: '23'
          },
          {
            name: '河源市',
            value: '44',
            value2: '23'
          },
          {
            name: '阳江市',
            value: '19',
            value2: '23'
          },
          {
            name: '清远市',
            value: '21',
            value2: '23'
          },
          {
            name: '东莞市',
            value: '25',
            value2: '23'
          },
          {
            name: '中山市',
            value: '566',
            value2: '23'
          },
          {
            name: '潮州市',
            value: '599',
            value2: '23'
          },
          {
            name: '揭阳市',
            value: '0',
            value2: '0'
          },
          {
            name: '云浮市',
            value: '0',
            value2: '0'
          }
        ]
      }
    }
  },
  methods: {
    handleClickSkip() {
      let routerPath = 'templateHome'
      this.$router.push({ path: routerPath })
    },
    // getMapTopic(id) {
    //   let that = this;
    //   console.log("查询专题数据：", { id: id });
    //   that.$post("/epf-onemap/maptopic/getMapTopic", { id: id }).then(res => {
    //     // res 是返回结果
    //     console.log("查询专题数据方法接口：", res);
    //     if (res.code != 0) {
    //       self.$message.error(res.msg); //失败
    //       return;
    //     }
    //     //返回的数据
    //     if (res.mapTopic.contentsType == "ghxzsj") {
    //       res.mapTopic.contentsType = "规划现状数据";
    //     } else if (res.mapTopic.contentsType == "tgsj") {
    //       res.mapTopic.contentsType = "土规数据";
    //     } else if (res.mapTopic.contentsType == "cgsj") {
    //       res.mapTopic.contentsType = "规划现状数据";
    //     }
    //     that.mapTopicData = res.mapTopic;
    //     console.log("查询专题数据方法接口：", that.mapTopicData);
    //   });
    // },
    initEchart() {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.chinaChart)
        document.getElementById('mapBox').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    },
    async setEcharMap() {
      const that = this
      // 根据区域id获取对应的GeoJson数据
      // var jsonData = JSON.parse(that.mapTopicData.jsonData);
      var mapCode = this.jsonData.cantonCode
      var name = this.jsonData.cantonCodeName
      var echarMap = commonecharts.getEcharMap(mapCode)
      const data = await axios.get(echarMap)

      if (data) {
        this.chart = echarts.init(this.$refs.chinaChart)
        var myChart = echarts.init(document.getElementById('mapBox'))
        echarts.registerMap(name, data)

        // 获取对应行政区geoJson中所有城市的中心点位置
        var mapCenter = {}
        data.features.forEach(function(item, i) {
          var centerName = item.properties.name
          var centerId = item.properties.center
          if (centerName != '') {
            mapCenter[centerName] = centerId
          }
        })
        console.log('mapCenter:', mapCenter)
        // 中心点
        var centerId = data.features[0].properties.center
        // 组装底图数据
        var option = commonecharts.monitor(
          this.jsonData,
          name,
          mapCenter,
          centerId
        )

        this.chart.setOption(option,true)
      } else {
        alert('无法加载该地图')
      }
    },
    useTemplate() {}
  },
  created() {
    this.initEchart()
    this.$nextTick(function() {
      setTimeout(() => {
        this.setEcharMap()
      }, 1000)
    })
  }
}
</script>
<style scoped>
.exchangeTable {
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  width: 100%;
  height: 100%;
}
#mapBox {
  width: 100%;
  height: 100%;
}
</style>
<style>
</style>
