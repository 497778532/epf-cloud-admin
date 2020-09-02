<template>
  <div id="saveTemplate">
    <!-- <el-button class="editorTo"
               type="primary"
               size="medium"
               @click="toEdtior()">编辑专题</el-button> -->
    <div id="mapBox"
         ref="chinaChart"></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import echarts from 'echarts'
import commonecharts from '../topic/commonecharts.js'

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
      chart: null
    }
  },
  components: {},
  computed: {
    ...mapState('onemap', ['specialData']),
    ...mapMutations('onemap', ['SET_specialF'])
  },
  destroyed() {
    this.SET_specialF
  },
  methods: {
    toEdtior() { },
    getMapTopic(id) {
      let that = this
      console.log('查询专题数据：', { id: id })
      that.$post('/epf-onemap/maptopic/getMapTopic', { id: id }).then(res => {
        // res 是返回结果
        console.log('查询专题数据方法接口：', res)
        if (res.code != 0) {
          self.$message.error(res.msg) // 失败
          return
        }
        // 返回的数据
        that.mapTopicData = res.mapTopic
        console.log('查询专题数据方法接口：', that.mapTopicData)
      })
    },
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
      var jsonData = JSON.parse(that.mapTopicData.jsonData)
      var mapCode = jsonData.cantonCode
      var name = jsonData.cantonCodeName
      var echarMap = commonecharts.getEcharMap(mapCode)
      const data = await axios.get(echarMap)

      if (data) {
        if (this.chart) {
          this.chart.dispose()
        }
        this.chart = echarts.init(this.$refs.chinaChart)
        var myChart = echarts.init(document.getElementById('mapBox'))
        echarts.registerMap(name, data)

        // 获取对应行政区geoJson中所有城市的中心点位置
        var mapCenter = {}
        data.features.forEach(function (item, i) {
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
        var option = {}
        var templateType = that.mapTopicData.templateType
        if (templateType == 'rlt') {
          option = commonecharts.makeHot(jsonData, name, mapCenter)
        } else if (templateType == 'fdssdt') {
          option = commonecharts.makeColor(jsonData, name, centerId)
        } else if (templateType == 'lxdy') {
          option = commonecharts.makeFlow(jsonData, name, mapCenter)
        } else if (templateType == 'djfhdt') {
          option = commonecharts.makeGrade(jsonData, name, centerId)
        } else if (templateType == 'bztjdt') {
          option = commonecharts.makePie(jsonData, name, centerId)
          if (option && typeof option === 'object') {
            myChart.setOption(option, true)
          }
          commonecharts.addPie(myChart, option, jsonData, mapCenter)
          myChart.setOption(option, true)
        } else if (templateType == 'zztjdt') {
          option = commonecharts.makeColumnar(jsonData, name, centerId)
          if (option && typeof option === 'object') {
            myChart.setOption(option, true)
          }
          commonecharts.addColumnar(myChart, option, jsonData, mapCenter)
          myChart.setOption(option, true)
        }

        this.chart.setOption(option)
      } else {
        alert('无法加载该地图')
      }
    },
    useTemplate() { }
  },
  watch: {
    specialData(newVal, oldVal) {
      var mapTopicId = newVal.id
      this.getMapTopic(mapTopicId)
      // this.initEchart();
      this.$nextTick(function () {
        setTimeout(() => {
          this.setEcharMap()
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
#saveTemplate {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

#mapBox {
  width: 100%;
  height: 100%;

  background-color: #fff;
  box-sizing: border-box;
}
.skipBox {
  position: absolute;
  top: 15px;
  right: 30px;
}
.searchBox {
  width: 100%;
  height: 15%;
  padding: 20px 0 0 30px;
}
.content_textBox {
  width: 40%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.useButton {
  position: absolute;
  top: 80px;
  left: 500px;
}
.imageBox {
  width: 100%;
  height: 85%;
}
.editorTo {
  position: absolute;
  right: 3%;
  top: 3%;
  z-index: 999;
  background: linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -ms-linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -webkit-linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -moz-linear-gradient(left, #1e7ae5, #0ca6e1);
  border: none;
}
</style>
