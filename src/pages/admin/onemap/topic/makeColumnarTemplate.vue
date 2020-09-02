<template>
  <div id="pieTemplate">
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
        <el-tabs v-model="activeName"
                 @tab-click="handleClick"
                 style="width:96%;margin-left:4%;margin-bottom:15px;">
          <el-tab-pane label="添加数据"
                       name="first">
            <el-table :data="cantonList"
                      style="width: 100%"
                      max-height="250">
              <el-table-column prop="rowName"
                               label="行政区域"
                               fixed
                               min-width="85"></el-table-column>
              <el-table-column v-for="(col,index) in cols"
                               :label="'描述'"
                               :key="index">
                <template slot-scope="scope">
                  <el-input size="small"
                            v-model="scope.row[index]"
                            @input="scope.row[index] = scope.row[index].replace(/[^\d]/g, '')"
                            :maxlength="6"></el-input>
                </template>
              </el-table-column>
              <el-table-column fixed="right"
                               width="65">
                <template slot="header">
                  <el-button type="text"
                             size="small"
                             icon="el-icon-circle-plus-outline"
                             @click="addCol">添加</el-button>
                </template>
              </el-table-column>
              <el-table-column fixed="right"
                               width="65">
                <template slot="header">
                  <el-button type="text"
                             size="small"
                             icon="el-icon-remove-outline"
                             @click="deleteCol">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
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
                    <td>行政区域</td>
                    <td>建筑用地</td>
                    <td>林业用地</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>广州市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>深圳市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>东莞市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>中山市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>潮州市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>梅州市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>河源市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>惠州市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>湛江市</td>
                    <td>1000</td>
                    <td>1000</td>
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
              <el-form-item label="分类："
                            prop="storeNumber">
                <el-select size="small"
                           v-model="dataForm.storeNumber"
                           placeholder="请选择"
                           style="width:100%;">
                  <el-option label="分类1"
                             value="分类1"></el-option>
                  <el-option label="分类2"
                             value="分类2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="值字段："
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
                    <td>行政区域</td>
                    <td>建筑用地</td>
                    <td>林业用地</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>广州市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>深圳市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>东莞市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>中山市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>潮州市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>梅州市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>河源市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>惠州市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                  <tr height="30px"
                      style="color:#999;">
                    <td>湛江市</td>
                    <td>1000</td>
                    <td>1000</td>
                  </tr>
                </table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div class="tabContent"
             style="width:96%;margin-left:4%;margin-bottom:15px;">
          <el-row class="tabContent_row">
            <el-col :span="8"
                    style="text-align:center;">
              <span>分类</span>
            </el-col>
            <el-divider direction="vertical"></el-divider>
            <el-col :span="8"
                    style="text-align:center;">
              <span>颜色</span>
            </el-col>
            <el-divider direction="vertical"></el-divider>
            <el-col :span="8"
                    style="text-align:center;">
              <span>是否显示</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;"
                  v-for="(item,index) in colorTableList"
                  :key="index">
            <el-col :span="8"
                    style="display:flex;justify-content:center;">
              <el-input v-model="item.content"
                        @input="inputCheck"
                        :maxlength="6"
                        size="small"
                        style="width:85%;"></el-input>
            </el-col>
            <el-col :span="8"
                    style="display:flex;justify-content:center;">
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
                      :style="{'width':100+'px','height':32+'px','display':'block','border':'1px solid #999','background':item.colorSelect}"
                      @click="setColorData(index)"></span>
              </el-popover>
            </el-col>
            <el-col :span="8"
                    style="display:flex;justify-content:center;">
              <el-checkbox v-model="item.checked"
                           @change="handleClickCheck(item)"></el-checkbox>
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

        borderWidth: '1', // 边框宽度
        borderColor: '#f00', // 边框颜色
        isShow: false, // 是否显示数据
        levelShow: true, // 是否显示数据另一种方式

        // 数据
        cityNameData: [], // 地图所包含区域名称
        pielegendMsgData: [], // 添加的数据
        pieLegendData: [], // 数据分类名称
        pieColorData: [], // 选择的颜色
        pieSelectData: [], // 多选框选择是否显示的数据
        delMessage: '', // 删除后的数据
        startDel: false // 判断添加还是删除
      },
      activeName: 'first',
      checked: true,
      chart: null, // echart对象
      chart2: null, // echart对象
      cols: [
        {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: ''
        }
      ],
      falseIndex: '',
      allData: [
        {
          name: '',
          value: ''
        }
      ],
      colorTableList: [
        // content颜色区域-分类名称, colorSelect颜色区域-选择颜色,checked颜色区域-多选框
        { content: '', colorSelect: '', checked: true }
      ],

      // 区域数据摸块
      cantonList: [
        {
          cantonName: '', // 区域
          cantonMessage: '' // 描述
        }
      ],
      // 图例范围
      mapColorData: [
        {
          content: 0,
          checked: 0,
          color: '#fff'
        }
      ],
      geoCoordMap: {}
    }
  },
  methods: {
    inputCheck (val) {
      if (val.length >= 6) {
        this.$message.error('只能输入不大于6位数的数字!')
      }
    },
    addCol () {
      if (this.cols.length == 10) {
        this.$message.error('最多只能添加十列数据!')
        return
      }
      this.jsonData.startDel = false
      this.cols.push({
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: ''
      })
      this.colorTableList.push({
        content: '',
        colorSelect: '',
        checked: true
      })
    },
    deleteCol () {
      if (this.cols.length == 1) {
        this.$message.error('最少应保留一列数据!')
        return
      }
      this.jsonData.startDel = true
      this.cols.pop({
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: ''
      })

      this.colorTableList.pop({
        content: '',
        colorSelect: '',
        checked: true
      })

      if (this.jsonData.startDel) {
        this.jsonData.delMessage = this.colorTableList.length
        for (var key in this.cantonList) {
          delete this.cantonList[key][this.jsonData.delMessage]
        }
      }
    },
    handleClickCheck (item) {
      if (item.checked == false) {
        this.jsonData.pieSelectData.push(item.content)
      }
      if (item.checked == true) {
        for (var key in this.jsonData.pieSelectData) {
          if (this.jsonData.pieSelectData[key] === item.content) {
            var index = key
            this.jsonData.pieSelectData.splice(index, 1)
          }
        }
      }
      console.log(this.jsonData.pieSelectData)
    },

    getMapData () {
      this.allData = []
      this.jsonData.pielegendMsgData = []
      for (let key in this.cantonList) {
        var addDataObj = this.cantonList[key]
        var addDataArrKong = Object.values(addDataObj)

        function curtail (arr) {
          var m = arr.concat()
          m.pop()
          return m
        }
        var addDataArr = curtail(addDataArrKong)

        function deletelast (arr) {
          var newarr = arr.concat()
          newarr.pop()
          return newarr
        }
        var addPieLegendData = deletelast(addDataArr)

        var addDataArrLength = addDataArr.length - 1
        function itemtoArraytop (Arr, index) {
          var temp = Arr[index]
          if (index == 0) {
            return Arr
          }
          for (var i = 0; i < Arr.length; i++) {
            if (Arr[i] === Arr[index]) {
              // 从第i个元素开始移除，1是长度，只移除一个元素。
              Arr.splice(i, 1)
              break
            }
          }
          // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
          Arr.unshift(temp)
          return Arr
        }
        this.allData.push(itemtoArraytop(addDataArr, addDataArrLength))
        this.jsonData.pielegendMsgData.push(addPieLegendData)
      }

      this.jsonData.cityNameData = []

      for (var key in this.allData) {
        if (this.jsonData.startDel) {
          if (this.jsonData.delMessage == 1) {
            this.allData[key] = this.allData[key].slice(0, 2)

            this.jsonData.pielegendMsgData[
              key
            ] = this.jsonData.pielegendMsgData[key].slice(0, 1)
          }
          if (this.jsonData.delMessage > 1) {
            this.allData[key] = this.allData[key].slice(
              0,
              this.jsonData.delMessage + 1
            )

            this.jsonData.pielegendMsgData[
              key
            ] = this.jsonData.pielegendMsgData[key].slice(
              0,
              this.jsonData.delMessage
            )
          }
        }
        if (this.allData[key].length > 1) {
          var index = key
          this.jsonData.cityNameData.push(this.allData[index][0])
        }
      }

      console.log('区域+区域数据', this.allData) // ["广州市", "1", "11", "111"]
      console.log('区域数据', this.jsonData.pielegendMsgData) // ["1", "11", "111"]
      console.log('区域名称数据', this.jsonData.cityNameData) // ["广州市", "广州市", "广州市"]

      this.mapColorData = []
      this.jsonData.pieLegendData = []
      this.jsonData.pieColorData = []

      for (let key in this.colorTableList) {
        this.mapColorData.push({
          content: this.colorTableList[key].content,
          color: this.colorTableList[key].colorSelect,
          checked: this.colorTableList[key].checked
        })
        this.jsonData.pieLegendData.push(this.colorTableList[key].content)
        this.jsonData.pieColorData.push(this.colorTableList[key].colorSelect)
      }

      console.log('图例范围', this.mapColorData)
      console.log('图例名称', this.jsonData.pieLegendData)
      console.log('颜色名称', this.jsonData.pieColorData)

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
      var myChart = echarts.init(document.getElementById('mapBox'))
      const data = await axios.get(echarMap)

      if (data) {
        this.chart = echarts.init(this.$refs.chinaChart)
        echarts.registerMap(name, data)
        // 中心点
        var centerId
          = data.features[0].properties.center
          || data.features[0].geometry.coordinates[0][0]

        // 获取对应行政区geoJson中所有城市的中心点位置
        var mapCenter = {}
        data.features.forEach(function (item, i) {
          var centerName = item.properties.name
          var centerId
            = item.properties.center || item.geometry.coordinates[0][0]
          if (name != '') {
            mapCenter[centerName] = centerId
          }
        })
        console.log('mapCenter:', mapCenter)

        // function resetPie(myChart, params, geoCoordMap, typeIndex) {
        //   var op = myChart.getOption();
        //   var ops = op.series;
        //   ops.forEach(function(v, i) {
        //     if (i > 0) {
        //       var geoCoord = geoCoordMap[v.name];
        //       var p = myChart.convertToPixel(
        //         {
        //           seriesIndex: 0
        //         },
        //         geoCoord
        //       );
        //       v.center = p;
        //       if (params != 0 && params.zoom) {
        //         v.radius = v.radius * params.zoom;
        //       }
        //       if (params != 0 && params.selected) {
        //         var rangeFirstNumber = params.selected[0];
        //         var rangeSecondNumber = params.selected[1];
        //         var pd = v.data[typeIndex].value;
        //         if (pd < rangeFirstNumber || pd > rangeSecondNumber) {
        //           v.itemStyle.normal.opacity = 0;
        //         } else {
        //           v.itemStyle.normal.opacity = 1;
        //         }
        //       }
        //     }
        //   });
        //   myChart.setOption(op, true);
        // }

        // 组装底图数据

        var option = commonecharts.makeColumnar(this.jsonData, name, centerId)

        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
        }
        /* bar*/
        commonecharts.addColumnar(myChart, option, this.jsonData, mapCenter)

        console.log('地图数据', option)

        myChart.setOption(option, true)

        // /*图跟着地图移动:bar*/
        // myChart.on("georoam", function(params) {
        //   resetPie(myChart, params, this.geoCoordMap, typeIndex);
        // });
        // myChart.on("datarangeselected", function(params) {
        //   resetPie(myChart, params, this.geoCoordMap, typeIndex);
        // });
        // window.addEventListener("resize", function() {
        //   myChart.resize();
        //   resetPie(myChart, 0, this.geoCoordMap);
        // });

        myChart.setOption(option)
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
        this.cantonList = provinceNameList
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
        // this.dictionary.cantonCity = res.dictionariesList;
        var provinceNameList = []
        for (var key in res.dictionariesList) {
          provinceNameList.push({
            rowName: res.dictionariesList[key].zhCn,
            rowMessage: ''
          })
        }
        console.log(provinceNameList)
        this.cantonList = provinceNameList
      })
    },
    // 分级数量
    getNumberData () {
      if (this.jsonData.number == 1) {
        this.colorTableList = [
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' }
        ]
      } else if (this.jsonData.number == 2) {
        this.colorTableList = [
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' }
        ]
      } else if (this.jsonData.number == 3) {
        this.colorTableList = [
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' },
          { colorSelect: '', colorMin: '', colorMax: '', colorMessage: '' }
        ]
      } else if (this.jsonData.number == 4) {
        this.colorTableList = [
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
      for (var key in this.colorTableList) {
        console.log(this.colorTableList[key])
        if (key == this.colorIndex) {
          this.colorTableList[key].colorSelect = this.colorSelect
        }
        console.log(this.colorTableList[key].colorSelect)
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
#pieTemplate {
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
@media screen and (max-width: 1599px) {
  #pieTemplate {
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
#pieTemplate .el-tabs__item:hover,
#pieTemplate .el-tabs__item.is-active {
  color: #1d7ce4;
}
#pieTemplate .el-table__header tr,
#pieTemplate .el-table__header th {
  padding: 0;
  height: 40px;
}
#pieTemplate .el-table__body tr,
#pieTemplate .el-table__body td {
  padding: 0;
  height: 40px;
}
#pieTemplate .el-table {
  margin: 0 auto;
  border: 2px solid #666;
}
#pieTemplate .el-table__body-wrapper {
  height: 208px !important;
}
#pieTemplate .el-table__fixed-right {
  height: 240px !important;
  background-color: #fff;
}
#pieTemplate .el-table__fixed {
  height: 240px !important;
  background-color: #fff;
}
#pieTemplate .el-tabs {
  margin: 0 auto;
}
#pieTemplate .el-form-item {
  margin-bottom: 5px;
}
#pieTemplate .el-table .el-table__header thead th {
  background: #f1f1f1;
  color: #666;
  font-weight: normal;
}
#pieTemplate .el-table td,
#pieTemplate .el-table th.is-leaf {
  border-bottom: 1px solid transparent;
}
#pieTemplate .el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
#pieTemplate .el-table__fixed-right-patch {
  background-color: #f1f1f1;
}
</style>
