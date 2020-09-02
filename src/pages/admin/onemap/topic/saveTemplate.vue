<template>
  <div id="saveTemplate">
    <el-button size="medium"
               type="info"
               class="skipBox"
               @click="handleClickSkip">返回</el-button>
    <div class="searchBox">
      <p class="templateTitle">专题保存</p>
      <el-form :model="saveData"
               :rules="rules"
               ref="saveData"
               label-width="150px">
        <el-row style="margin-bottom:20px;">
          <el-col :span="6">
            <el-form-item label="专题命名："
                          prop="name">
              <el-input v-model="saveData.name"
                        size="medium"
                        placeholder="请输入专题命名"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="专题分类："
                          prop="contentsType">
              <selectInput v-model="saveData.contentsType"
                           :groupCode="'contents_type'"
                           :default="saveData.contentsType"
                           @blur="getBlurData"></selectInput>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制作时间："
                          prop="createTime">
              <el-date-picker v-model="saveData.createTime"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-checkbox v-model="saveData.isShow"
                         class="saveData_title"
                         style="text-align: center;">共享</el-checkbox>
          </el-col>
          <el-col :span="2">
            <el-button type="primary"
                       size="medium"
                       @click="save('saveData')">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div id="mapBox"
         ref="chinaChart"></div>
  </div>
</template>
<script>
import selectInput from '@/components/common/form/selectInpt'
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
  name: 'mapTopic',
  components: { selectInput },

  data () {
    var selectcontensType = (rule, value, callback) => {
      if (value != '') {
        callback()
      } else {
        callback('请选择专题分类')
      }
    }
    return {
      saveData: {
        name: '', // 专题命名
        contentsType: '', // 专题分类
        createUserName: '', // 制作人
        createTime: '', // 制作时间
        isShow: false, // 是否共享
        topicId: ''
      },
      mapTopicData: {}, // 专题数据
      checked: false,
      chart: null,
      timeFn: null,
      mapCode: '',
      rules: {
        name: [{ required: true, message: '请输入专题命名', trigger: 'blur' }],
        contentsType: [
          {
            required: true,
            message: '请选择专题分类',
            trigger: 'blur',
            validator: selectcontensType
          }
        ],
        createTime: [
          {
            type: 'string',
            required: true,
            message: '请选择日期时间',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    handleClickSkip () {
      let routerPath = 'makeTemplate'
      this.$router.push({ path: routerPath })
    },
    getBlurData () {
      if (this.saveData.contentsType != '') {
        this.$refs.saveData.clearValidate('contentsType')
      }
    },
    save (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.mapTopicData['name'] = this.saveData.name
          this.mapTopicData['contentsType'] = this.saveData.contentsType
          this.mapTopicData['createTime'] = this.saveData.createTime
          var dd = 0
          if (this.saveData.isShow) {
            dd = 1
          }
          this.mapTopicData['isShow'] = dd
          this.mapTopicData['jsonData'] = JSON.stringify(
            this.mapTopicData.jsonData
          )
          this.$post(
            '/epf-onemap/maptopic/addMapTopic',
            this.mapTopicData
          ).then(res => {
            // res 是返回结果
            if (res.code != 0) {
              this.$message.error(res.msg)
              return
            }
            this.$message.success('添加成功')
          })
          // 页面跳转
          let routerPath = 'templateHome'
          this.$router.push({ path: routerPath })
        } else {
          this.$message.error('请检查是否漏填重要信息...')
          return false
        }
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
      var jsonData = that.mapTopicData.jsonData
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
    }
  },
  created () {
    // 获取父窗口传递参数
    this.mapTopicData = this.$route.params.mapTopic
    this.initEchart()
    this.$nextTick(function () {
      setTimeout(() => {
        this.setEcharMap()
      }, 1000)
    })
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
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
}
.templateTitle {
  font-size: 16px;
  line-height: 55px;
  margin-bottom: 10px;
  margin-left: 30px;
  font-weight: bold;
}
.saveData_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  padding-right: 10px;
  text-align: right;
  line-height: 36px;
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
