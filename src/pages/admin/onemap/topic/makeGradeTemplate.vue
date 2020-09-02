<template>
  <div id="gradeTemplate">
    <div class="templateBox">
      <p class="templateTitle_big">{{templateParentItem.templateName}}</p>
      <el-form label-width="100px">
        <div v-if="false">
          <el-form-item label="底图选择：">
            <el-select size="small"
                       v-model="mapServiceId"
                       placeholder="请选择地图底图"
                       style="width:100%;">
              <el-option label="底图选择1"
                         value="1"></el-option>
              <el-option label="底图选择2"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="true">
          <el-form-item label="行政区域：">
            <div style="width:48%;float:left;margin-right:4%;">
              <el-select v-model="cantonProvinceName"
                         size="small"
                         placeholder="全部"
                         @change="provinceSelect($event)">
                <el-option v-for="(item,index) in dictionary.administrative_regions"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </div>
            <div style="width:48%;float:left;margin-right:0%;">
              <el-select v-model="cantonCityName"
                         size="small"
                         placeholder="全部"
                         @change="citySelect($event)">
                <el-option label="全部"
                           value></el-option>
                <el-option v-for="(item,index) in dictionary.cantonCity"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="分级数量：">
          <el-select size="small"
                     v-model="jsonData.number"
                     placeholder="请选择地图分级数量"
                     style="width:100%;"
                     @change="getNumberData">
            <el-option label="1"
                       value="1"></el-option>
            <el-option label="2"
                       value="2"></el-option>
            <el-option label="3"
                       value="3"></el-option>
            <el-option label="4"
                       value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-tabs v-model="activeName"
                 @tab-click="handleClick"
                 style="width:96%;margin-left:4%;margin-bottom:15px;">
          <el-tab-pane label="添加数据"
                       name="first">
            <div class="tabContent">
              <el-row class="tabContent_row">
                <el-col :span="10"
                        style="text-align:center;">
                  <span>行政区域</span>
                </el-col>
                <!-- <el-divider direction="vertical"></el-divider> -->
                <el-col :span="14"
                        style="text-align:center;">
                  <span>描述</span>
                </el-col>
              </el-row>
              <el-row style="margin-top:10px;"
                      v-for="(item,index) in jsonData.cantonList"
                      :key="index">
                <el-col :span="10"
                        style="display:flex;justify-content:center;">
                  <span>{{item.rowName}}</span>
                </el-col>
                <el-col :span="14"
                        style="display:flex;justify-content:center;">
                  <el-input v-model="item.rowMessage"
                            placeholder="请设置数值"
                            size="small"
                            style="width:85%;"
                            @input="inputCheck"
                            :maxlength="6"></el-input>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="导入数据"
                       name="second">
            <div class="tabContent"
                 style="padding:10px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <el-button size="small">
                  <i class="el-icon-download"></i>下载模板
                </el-button>

                <el-button size="small">
                  <i class="el-icon-upload2"></i>上传文件
                </el-button>

                <el-button size="small"
                           type="primary">预览</el-button>
              </div>
              <div style="padding:0 10px 10px 10px;background:#F1F1F1;">
                <div style="display:flex;justify-content:space-between; align-items: center;">
                  <div class="docTitle">广东省城市分段描述.doc</div>
                  <i class="el-icon-delete"></i>
                </div>
                <table width="100%"
                       max-width="100%"
                       border="1"
                       cellpadding="4"
                       cellspacing="0"
                       bordercolor="#c5defb"
                       style="table-layout:fixed;text-align:center;background:#fff;">
                  <tr height="30px"
                      style="color:#333;font-weight:bolder;text-align:center;font-size:14px;">
                    <td>人口数量</td>
                    <td>行政区域</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>广州市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>深圳市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>东莞市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>中山市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>潮州市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>梅州市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>河源市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>惠州市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>湛江市</td>
                  </tr>
                </table>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数据库获取"
                       name="third">
            <div class="tabContent"
                 style="padding:10px;">
              <el-form-item label="图层数据："
                            prop="coverage">
                <el-select size="small"
                           v-model="dataForm.coverage"
                           placeholder="请选择"
                           style="width:100%;">
                  <el-option label="土地利用总体规划"
                             value="土地利用总体规划"></el-option>
                  <el-option label="城市利用总体规划"
                             value="城市利用总体规划"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="行政区域："
                            prop="storeArea">
                <el-select size="small"
                           v-model="dataForm.storeArea"
                           placeholder="请选择"
                           style="width:100%;">
                  <el-option label="土地利用总体规划"
                             value="土地利用总体规划"></el-option>
                  <el-option label="城市利用总体规划"
                             value="城市利用总体规划"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="值："
                            prop="storeNumber">
                <el-select size="small"
                           v-model="dataForm.storeNumber"
                           placeholder="请选择"
                           style="width:100%;">
                  <el-option label="土地利用总体规划"
                             value="土地利用总体规划"></el-option>
                  <el-option label="城市利用总体规划"
                             value="城市利用总体规划"></el-option>
                </el-select>
              </el-form-item>
              <div style="display:flex;justify-content:flex-end;">
                <el-button size="small"
                           type="primary">确认导入</el-button>
                <el-button size="small"
                           type="primary"
                           style="margin-left:20px;">预览</el-button>
              </div>
              <div style="padding:10px;background:#F1F1F1;margin-top:10px;">
                <table width="100%"
                       max-width="100%"
                       border="1"
                       cellpadding="4"
                       cellspacing="0"
                       bordercolor="#c5defb"
                       style="table-layout:fixed;text-align:center;background:#fff;">
                  <tr height="30px"
                      style="color:#333;font-weight:bolder;text-align:center;font-size:14px;">
                    <td>人口数量</td>
                    <td>行政区域</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>广州市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>深圳市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>东莞市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>中山市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>潮州市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>梅州市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>河源市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>惠州市</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>1000</td>
                    <td>湛江市</td>
                  </tr>
                </table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- <el-form-item label="色带：" prop="flowStyle" style="margin-top:10px;">
          <span
            :style="{'width':90+'%','height':24+'px','margin-top':8+'px','display':'block','background-image':'linear-gradient(to right,#FCE0BC 0%,#FCE0BC 25%,#FAD5A4 25%,#FAD5A4 50%,#FACD93 50%,#FACD93 75%,#F8BF74 75%,#F8BF74 100%)'}"
          ></span>
        </el-form-item>-->
        <div class="tabContent"
             style="width:96%;margin-left:4%;margin-bottom:15px;">
          <el-row class="tabContent_row">
            <el-col :span="4"
                    style="text-align:center;">
              <span>颜色</span>
            </el-col>
            <!-- <el-divider direction="vertical"></el-divider> -->
            <el-col :span="5"
                    style="text-align:center;">
              <span>最小值</span>
            </el-col>
            <!-- <el-divider direction="vertical"></el-divider> -->
            <el-col :span="5"
                    style="text-align:center;">
              <span>最大值</span>
            </el-col>
            <!-- <el-divider direction="vertical"></el-divider> -->
            <el-col :span="10"
                    style="text-align:center;">
              <span>图例描述</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;"
                  v-for="(item,index) in jsonData.colorTableList"
                  :key="index">
            <el-col :span="4"
                    style="display:flex;justify-content:center;">
              <!-- <span style="width:24px;height:24px;display:block;background:#FCE0BC;"></span> -->
              <el-popover placement="top"
                          width="160">
                <div class="tipBox">
                  <ul>
                    <li v-for="(item,index) in colorList"
                        :key="index"
                        :style="{'background-color': item.colorSelect }"
                        @click="getColorData(item)"></li>
                  </ul>
                </div>
                <span slot="reference"
                      :style="{'width':24+'px','height':24+'px','display':'block','border':'1px solid #999','background':item.colorSelect}"
                      @click="setColorData(index)"></span>
              </el-popover>
            </el-col>
            <el-col :span="5"
                    style="display:flex;justify-content:center;">
              <el-input v-model="item.colorMin"
                        @input="item.colorMin = item.colorMin.replace(/[^\d]/g, '')"
                        :maxlength="6"
                        size="small"
                        style="width:85%;"></el-input>
            </el-col>
            <el-col :span="5"
                    style="display:flex;justify-content:center;">
              <el-input v-model="item.colorMax"
                        @input="item.colorMax = item.colorMax.replace(/[^\d]/g, '')"
                        :maxlength="6"
                        size="small"
                        style="width:85%;"></el-input>
            </el-col>
            <el-col :span="10"
                    style="display:flex;justify-content:center;">
              <el-input v-model="item.colorMessage"
                        :maxlength="6"
                        size="small"
                        style="width:85%;"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-form-item label="边框宽度：">
          <el-select size="small"
                     v-model="jsonData.borderWidth"
                     placeholder="请选择地图边框宽度"
                     style="width:100%;">
            <el-option label="1px"
                       value="1"></el-option>
            <el-option label="2px"
                       value="2"></el-option>
            <el-option label="3px"
                       value="3"></el-option>
            <el-option label="4px"
                       value="4"></el-option>
            <el-option label="5px"
                       value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="边框颜色：">
          <el-select size="small"
                     v-model="jsonData.borderColor"
                     placeholder="请选择地图边框颜色"
                     style="width:100%;">
            <el-option label="红色"
                       value="#f00"></el-option>
            <el-option label="黑色"
                       value="#000"></el-option>
            <el-option label="白色"
                       value="#fff"></el-option>
            <el-option label="橙色"
                       value="#ffa000"></el-option>
            <el-option label="蓝色"
                       value="#0CA6E1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示数值：">
          <el-select size="small"
                     v-model="showData"
                     placeholder="请选择是否显示数值"
                     style="width:100%;">
            <el-option label="是"
                       value="0"></el-option>
            <el-option label="否"
                       value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary"
                   size="medium"
                   style="margin:20px 0;float:right;"
                   @click="handleClickSave">保存专题</el-button>
        <el-button type="primary"
                   size="medium"
                   style="margin:20px;float:right;margin-right:10px;"
                   @click="getMapData">刷新专题</el-button>
      </el-form>
    </div>
    <div style="display:flex;flex-direction: column;align-items: flex-end;flex:1;height:100%;">
      <div class="buttonBox">
        <el-button size="medium"
                   type="info"
                   class="skipBox"
                   @click="handleClickSkip">退出</el-button>
      </div>
      <div id="mapBox"
           ref="chinaChart"></div>
      <!-- <img src="../../../../assets/images/color.png" alt width="100%" height="95%" /> -->
    </div>
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
      templateParentItem: {}, // 专题模板参数
      mapServiceId: '', // 底图选择
      isOnLine: '', // 专题模板：在线、离线
      cantonProvinceName: '广东省', // 省
      cantonProvinceId: '440000',
      cantonCityName: '', // 市
      cantonCityId: '',

      dataForm: {
        coverage: '',
        storeArea: '',
        storeNumber: ''
      },

      name: '', // 专题命名
      contentsType: '', // 专题分类
      createUserName: '', // 制作人
      createTime: '', // 制作时间
      showData: '0', // 显示数值

      // 字典码结果
      dictionary: {
        administrative_regions: [], // 省级行政区集合
        cantonCity: [], // 市级行政区集合
        cantonArea: []
      },
      // 颜色选择器
      colorList: [
        { colorSelect: '#4a4a4a' },
        { colorSelect: '#ff6667' },
        { colorSelect: '#ffb358' },
        { colorSelect: '#ffdb57' },
        { colorSelect: '#50e176' },
        { colorSelect: '#28b9d0' },
        { colorSelect: '#6cadff' },
        { colorSelect: '#d19eff' },
        { colorSelect: '#008cff' },
        { colorSelect: '#ff2e90' }
      ],

      colorIndex: '',
      colorSelect: '',

      // 模板制作数据
      jsonData: {
        cantonCode: '', // 底图
        cantonCodeName: '', // 底图名称
        number: '4', // 分级数量
        colorTableList: [
          // colorSelect颜色区域-颜色, colorMin颜色区域-最小值,colorMax颜色区域-最大值,颜色区域-描述
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' }
        ],
        // 区域数据摸块
        cantonList: [
          {
            cantonName: '', // 区域
            cantonMessage: '' // 描述
          }
        ],
        borderWidth: '1', // 边框宽度
        borderColor: '#f00', // 边框颜色
        isShow: false, // 是否显示数据
        // 图例范围
        mapColorData: [
          {
            start: 0,
            end: 0,
            color: '#fff'
          }
        ],
        // 数据
        allData: [
          {
            name: '',
            value: ''
          }
        ],
        geoCoordMapData: [],
        levelShow: true,
        maxGradeData: ''
      },
      activeName: 'first',
      checked: true,
      chart: null // echart对象
    }
  },
  methods: {
    inputCheck (val) {
      for (var key in this.jsonData.cantonList) {
        this.jsonData.cantonList[key].rowMessage = this.jsonData.cantonList[key].rowMessage.replace(/[^\d]/g, '')
      }
      if (val.length >= 6) {
        this.$message.error('只能输入不大于6位数的数字!')
      }
    },
    getMapData () {
      this.jsonData.allData = []
      for (let key in this.jsonData.cantonList) {
        this.jsonData.allData.push({
          name: this.jsonData.cantonList[key].rowName,
          value: this.jsonData.cantonList[key].rowMessage
        })
      }
      console.log('区域数据', this.jsonData.allData)

      this.jsonData.mapColorData = []

      for (let key in this.jsonData.colorTableList) {
        this.jsonData.mapColorData.push({
          start: this.jsonData.colorTableList[key].colorMin - 0,
          end: this.jsonData.colorTableList[key].colorMax - 0,
          color: this.jsonData.colorTableList[key].colorSelect,
          label: this.jsonData.colorTableList[key].colorMessage
        })
      }
      console.log('图例范围', this.jsonData.mapColorData)

      if (this.showData == 0) {
        this.jsonData.isShow = true
      } else if (this.showData == 1) {
        this.jsonData.isShow = false
      }
      console.log('是否显示数据', this.jsonData.isShow)

      this.setEcharMap(this.jsonData.cantonCode, this.jsonData.cantonCodeName)
      this.jsonData.levelShow = false
    },
    handleClickSkip () {
      let routerPath = 'makeTemplate'
      this.$router.push({ path: routerPath })
    },
    handleClickSave () {
      var mapTopic = {}
      mapTopic['topicTemplateId'] = this.templateParentItem.id // 模板id
      // mapTopic['topicTemplateId'] = ;
      mapTopic['cantonProvince'] = this.cantonProvinceId
      mapTopic['cantonCity'] = this.cantonCityId
      mapTopic['showData'] = this.showData
      mapTopic['jsonData'] = this.jsonData
      mapTopic['templateType'] = this.templateParentItem.templateType

      let routerPath = 'saveTemplate'
      this.$router.push({ name: routerPath, params: { mapTopic: mapTopic } })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async loadMap (mapCode, name) {
      const that = this
      // 根据区域id获取对应的GeoJson数据
      var echarMap = commonecharts.getEcharMap(mapCode)
      const data = await axios.get(echarMap)

      if (data) {
        this.chart = echarts.init(this.$refs.chinaChart)
        echarts.registerMap(name, data)
        // 中心点
        var centerId
          = data.features[0].properties.center
          || data.features[0].geometry.coordinates[0][0]

        var centerIdObj = {}
        data.features.map(function (e, item) {
          centerIdObj[e.properties.name]
            = e.properties.center || e.geometry.coordinates[0][0]
        })

        var centerIdData = this.jsonData.allData

        function convertData (centerIdData) {
          var res = []
          for (var i = 0; i < centerIdData.length; i++) {
            var geoCoord = centerIdObj[centerIdData[i].name]
            if (geoCoord) {
              res.push({
                name: centerIdData[i].name,
                value: geoCoord.concat(Number(centerIdData[i].value))
              })
            }
          }
          return res
        }
        this.jsonData.geoCoordMapData = convertData(centerIdData)

        var gradeDataList = []
        for (var key in this.jsonData.mapColorData) {
          gradeDataList.push(this.jsonData.mapColorData[key].end)
        }
        this.jsonData.maxGradeData = Math.max.apply(Math, gradeDataList) // 取值范围最大值
        console.log(this.jsonData.maxGradeData)

        // 组装底图数据
        var option = commonecharts.makeGrade(this.jsonData, name, centerId)
        this.chart.setOption(option)
      } else {
        alert('无法加载该地图')
      }
    },
    initEchart () {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.chinaChart)
        document.getElementById('mapBox').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    },
    // 获取行政区字典集合
    getDictionaryList () {
      this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
        code: this.cantonProvinceId,
        parentId: 0
      }).then(res => {
        console.log('获取行政区字典集合：', res)
        if (res.code != 0) {
          self.$message.error(res.msg)
          return
        }
        this.dictionary.administrative_regions = res.dictionariesList
        console.log('eos', this.dictionary.administrative_regions)
      })
    },
    // 字典-省选择
    provinceSelect (name) {
      this.cantonCityName = ''
      this.cantonCityId = ''
      let pId = ''
      if (name != '440000') {
        this.cantonProvinceName = name
        pId = this.$refs[name][0].$attrs.dictKey
      } else {
        pId = name
      }
      this.cantonProvinceId = pId
      // 底图加载
      this.setEcharMap(pId, this.cantonProvinceName)
      this.jsonData.cantonCode = pId
      this.jsonData.cantonCodeName = this.cantonProvinceName
      this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
        parentId: pId
      }).then(res => {
        console.log('获取行政区字典集合：', res)
        if (res.code != 0) {
          self.$message.error(res.msg)
          return
        }
        this.dictionary.cantonCity = res.dictionariesList
        var provinceNameList = []
        for (var key in res.dictionariesList) {
          provinceNameList.push({
            rowName: res.dictionariesList[key].zhCn,
            rowMessage: ''
          })
        }
        console.log(provinceNameList)
        console.log('省', this.dictionary.administrative_regions)
        this.jsonData.cantonList = provinceNameList
      })
    },
    // 字典-市选择
    citySelect (name) {
      if (name == '') {
        // 选择全部
        this.getDictionaryList() // 初始化省级行政区
        this.provinceSelect(this.cantonProvinceId)
        return
      }
      this.cantonCityName = name
      let pId = this.$refs[name][0].$attrs.id;
      (this.cantonCityId = name),
        // 底图加载
        this.setEcharMap(pId, this.cantonCityName)
      this.jsonData.cantonCode = pId
      this.jsonData.cantonCodeName = this.cantonCityName
      let me = this
      this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
        parentId: pId
      }).then(res => {
        console.log('获取行政区字典集合：', res)
        if (res.code != 0) {
          self.$message.error(res.msg)
          return
        }
        // this.dictionary.cantonCity = res.dictionariesList;
        var provinceNameList = []
        if (res.dictionariesList.length === 0) {
          if (me.cantonCityName === '东莞市') {
            res.dictionariesList = [
              { zhCn: '东城街道' },
              { zhCn: '万江街道' },
              { zhCn: '莞城街道' },
              { zhCn: '常平镇' },
              { zhCn: '南城街道' },
              { zhCn: '厚街镇' },
              { zhCn: '樟木头镇' },
              { zhCn: '虎门镇' },
              { zhCn: '长安镇' },
              { zhCn: '大朗镇' },
              { zhCn: '塘厦镇' },
              { zhCn: '大朗镇' },
              { zhCn: '凤岗镇' },
              { zhCn: '清溪镇' },
              { zhCn: '谢岗镇' },
              { zhCn: '桥头镇' },
              { zhCn: '谢岗镇' },
              { zhCn: '石龙镇' },
              { zhCn: '谢岗镇' },
              { zhCn: '石碣镇' },
              { zhCn: '高埗镇' },
              { zhCn: '中堂镇' },
              { zhCn: '洪梅镇' },
              { zhCn: '麻涌镇' },
              { zhCn: '沙田镇' },
              { zhCn: '茶山镇' },
              { zhCn: '企石镇' },
              { zhCn: '横沥镇' },
              { zhCn: '寮步镇' },
              { zhCn: '东坑镇' },
              { zhCn: '石排镇' },
              { zhCn: '大岭山镇' }
            ]
          } else if (me.cantonCityName === '中山市') {
            res.dictionariesList = [
              { zhCn: '石岐街道' },
              { zhCn: '南区街道' },
              { zhCn: '港口镇' },
              { zhCn: '东升镇' },
              { zhCn: '东区街道' },
              { zhCn: '西区街道' },
              { zhCn: '阜沙镇' },
              { zhCn: '南头镇' },
              { zhCn: '东凤镇' },
              { zhCn: '小榄镇' },
              { zhCn: '横栏镇' },
              { zhCn: '大涌镇' },
              { zhCn: '板芙镇' },
              { zhCn: '神湾镇' },
              { zhCn: '三角镇' },
              { zhCn: '三乡镇' },
              { zhCn: '坦洲镇' },
              { zhCn: '五桂山街道' },
              { zhCn: '火炬高技术产业开发区' },
              { zhCn: '南朗镇' },
              { zhCn: '民众镇' }
            ]
          } else {
            res.dictionariesList = [{ zhCn: '暂无数据' }]
          }
        }
        for (var key in res.dictionariesList) {
          provinceNameList.push({
            rowName: res.dictionariesList[key].zhCn,
            rowMessage: ''
          })
        }
        console.log(provinceNameList)
        this.jsonData.cantonList = provinceNameList
      })
    },
    // 分级数量
    getNumberData () {
      if (this.jsonData.number == 1) {
        this.jsonData.colorTableList = [
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' }
        ]
      } else if (this.jsonData.number == 2) {
        this.jsonData.colorTableList = [
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' }
        ]
      } else if (this.jsonData.number == 3) {
        this.jsonData.colorTableList = [
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' }
        ]
      } else if (this.jsonData.number == 4) {
        this.jsonData.colorTableList = [
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' }
        ]
      }
    },
    getColorData (item) {
      console.log(item)
      this.colorSelect = item.colorSelect
      console.log(this.colorSelect)
      for (var key in this.jsonData.colorTableList) {
        console.log(this.jsonData.colorTableList[key])
        if (key == this.colorIndex) {
          this.jsonData.colorTableList[key].colorSelect = this.colorSelect
        }
        console.log(this.jsonData.colorTableList[key].colorSelect)
      }
    },
    setColorData (index) {
      console.log(index)
      this.colorIndex = index
    },
    // 动态切换地图数据
    setEcharMap (code, name) {
      this.$nextTick(function () {
        setTimeout(() => {
          this.loadMap(code, name)
        }, 1000)
      })
    }
  },
  mounted () {
    // 获取父窗口传递参数1
    this.templateParentItem = this.$route.params.item
    this.initEchart()
    this.getDictionaryList() // 初始化省级行政区
    this.provinceSelect(this.cantonProvinceId)
  },
  created () { },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    // this.chart.dispose();
    this.chart = null
  }
}
</script>
<style scoped>
#gradeTemplate {
  width: 100%;
  height: 100%;
  padding: 20px 0 0 30px;
  position: relative;
  display: flex;
  justify-content: flex-start;
}
.skipBox {
  position: absolute;
  top: 15px;
  right: 30px;
}
.templateBox {
  width: 25%;
  height: 100%;
  float: left;
  background-color: #fff;
  padding-right: 30px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.templateBox::-webkit-scrollbar {
  display: none;
}
.templateTitle_big {
  font-size: 16px;
  font-weight: bold;
}
.templateTitle {
  font-size: 15px;
  line-height: 30px;
  margin-bottom: 10px;
}
.tabContent {
  height: 250px;
  overflow: auto;
  border: 2px solid #666;
  padding-bottom: 10px;
}
.tabContent_row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f1f1f1;
  height: 32px;
}
.docTitle {
  font-size: 14px;
  font-weight: bold;
  line-height: 50px;
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
.buttonBox {
  width: 100%;
  height: 5%;
  background-color: #fff;
}
.tipBox {
  width: 140px;
  height: 60px;
}
.tipBox ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.tipBox ul li {
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-bottom: 10px;
}
/* .contentBox{
  width: 70px;
  height: 30px;
  border: 1px solid #666;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  line-height: 30px;
  margin: 10px;
} */
@media screen and (max-width: 1599px) {
  #gradeTemplate {
    width: calc(100% + 74px);
    /* height: 200px; */
    position: absolute;
    left: -74px;
    z-index: 88;
    overflow: auto;
  }
}
</style>
<style>
#gradeTemplate .el-table__header tr,
#gradeTemplate .el-table__header th {
  padding: 0;
  height: 40px;
}
#gradeTemplate .el-table__body tr,
#gradeTemplate .el-table__body td {
  padding: 0;
  height: 40px;
}
#gradeTemplate .el-table {
  margin: 0 auto;
  margin-bottom: 20px;
}
#gradeTemplate .el-tabs {
  margin: 0 auto;
}
#gradeTemplate .el-form-item {
  margin-bottom: 5px;
}
</style>
