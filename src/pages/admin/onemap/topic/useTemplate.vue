<template>
  <div id="saveTemplate">
    <el-button size="medium"
               type="info"
               class="skipBox"
               @click="handleClickSkip">退出</el-button>
    <div class="searchBox">
      <div class="content_textBox">
        <span style="width:50%;font-size:16px;font-weight:600;">{{mapTopicData.name}}</span>
        <span style="width:50%;display:flex;justify-content: flex-end;"
              v-if="mapTopicData.isShow==1">
          <img src="../../../../assets/images/ysc.png"
               alt
               style="width:25px;height:25px" />
        </span>
        <span style="width:50%;display:flex;justify-content: flex-end;"
              v-if="mapTopicData.isShow==0">
          <img src="../../../../assets/images/wsc.png"
               alt
               style="width:25px;height:25px" />
        </span>
        <div style="width:50%">
          <img src="../../../../assets/images/usetem02.png"
               alt
               style="width:20px;height:20px" />
          <span style="font-size:12px;color:#666;margin-left:20px;">{{mapTopicData.createUserName}}</span>
        </div>
        <div style="width:50%">
          <img src="../../../../assets/images/usetem01.png"
               alt
               style="width:20px;height:20px" />
          <span style="font-size:12px;color:#666;margin-left:20px;">{{mapTopicData.createTime}}</span>
        </div>
        <div style="width:50%">
          <img src="../../../../assets/images/usetem03.png"
               alt
               style="width:20px;height:20px" />
          <span style="font-size:12px;color:#666;margin-left:20px;">{{mapTopicData.contentsType}}</span>
        </div>
      </div>
    </div>
    <!-- <el-button type="primary" size="medium" @click="useTemplate" class="useButton">使用专题</el-button> -->
    <div id="mapBox"
         ref="chinaChart"></div>
  </div>
</template>
<script>
import axios from 'axios'
import echarts from 'echarts'
import commonecharts from './commonecharts.js'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  data () {
    return {
      mapTopicData: {},
      chart: null
    }
  },
  methods: {
    handleClickSkip () {
      let routerPath = 'templateHome'
      this.$router.push({ path: routerPath })
    },
    getMapTopic (id) {
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
        if (res.mapTopic.contentsType == 'ghxzsj') {
          res.mapTopic.contentsType = '规划现状数据'
        } else if (res.mapTopic.contentsType == 'tgsj') {
          res.mapTopic.contentsType = '土规数据'
        } else if (res.mapTopic.contentsType == 'cgsj') {
          res.mapTopic.contentsType = '规划现状数据'
        }
        that.mapTopicData = res.mapTopic
        console.log('查询专题数据方法接口：', that.mapTopicData)
      })
    },
    initEchart () {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.chinaChart)
        document.getElementById('mapBox').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    },
    async setEcharMap () {
      const that = this
      // 根据区域id获取对应的GeoJson数据
      var jsonData = JSON.parse(that.mapTopicData.jsonData)
      var mapCode = jsonData.cantonCode
      var name = jsonData.cantonCodeName
      var echarMap = commonecharts.getEcharMap(mapCode)
      const data = await axios.get(echarMap)

      if (data) {
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
    useTemplate () { }
  },
  created () {
    var mapTopicId = this.$route.query.id
    this.getMapTopic(mapTopicId)
    this.initEchart()
    this.$nextTick(function () {
      setTimeout(() => {
        this.setEcharMap()
      }, 1000)
    })
  }
}
</script>
<style scoped>
#saveTemplate {
  width: 100%;
  height: 100%;
  position: relative;
}
#mapBox {
  width: 100%;
  height: 95%;
  float: left;
  background-color: #fff;
  border-top: 1px dashed #999;
  border-left: 1px dashed #999;
  box-sizing: border-box;
}
.skipBox {
  position: absolute;
  top: 15px;
  right: 30px;
}
.searchBox {
  width: 100%;
  height: 130px;
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
  height: calc(100% - 130px);
}
@media screen and (max-width: 1599px) {
  #saveTemplate {
    width: calc(100% + 74px);
    position: absolute;
    left: -74px;
    z-index: 88;
    overflow: auto;
  }
}
</style>
<style>
</style>
