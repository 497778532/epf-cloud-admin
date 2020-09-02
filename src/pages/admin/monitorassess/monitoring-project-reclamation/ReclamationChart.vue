<template>
  <div class="page-body"
       id="chaijiuChart">
    <div class="left-top-stock">
      <div class="left-top-button-other">
        <div class="left-top-button-other-title">
          拆旧复垦{{ this.detailTitle }}数据
        </div>
      </div>
    </div>
    <div class="page-list-stock EPF-table"
         style="width:100%;height:100%;padding:15px;backgroundColor: #fff;">
      <div class="switchHeight_box_chaijiu">
        <div class="switchHeight_box_chaijiu_left">
          <div style="width:80px;height:40px;display:flex;">

            <div class="tab-title-chart"
                 :class="{
                'tab-title-chart2': cjActiveName === 'Chart',
                'tab-title-chart4': cjActiveName === 'Table'
              }"
                 @click="turnChart">
              <img src="../../../../assets/images/jcpgyj/project/条形图选中2x.png"
                   alt=""
                   style="width:100%;height:100%;"
                   v-if="cjActiveName === 'Chart'" />
              <img src="../../../../assets/images/jcpgyj/project/条形图未选2x.png"
                   alt=""
                   style="width:100%;height:100%;"
                   v-if="cjActiveName === 'Table'" />
            </div>
            <div class="tab-title-chart"
                 :class="{
                'tab-title-chart1': cjActiveName === 'Table',
                'tab-title-chart3': cjActiveName === 'Chart'
              }"
                 @click="turnTable">
              <img src="../../../../assets/images/jcpgyj/project/表格选中2x.png"
                   alt=""
                   style="width:100%;height:100%;"
                   v-if="cjActiveName === 'Table'" />
              <img src="../../../../assets/images/jcpgyj/project/表格未选2x.png"
                   alt=""
                   style="width:100%;height:100%;"
                   v-if="cjActiveName === 'Chart'" />
            </div>
          </div>
          <el-button-group style="margin-left:24px;"
                           v-if="this.detailTitle !== '预留规模'">
            <el-button :type="this.params.type == 1 ? 'primary' : ''"
                       plain
                       @click="turnTopFirst">区域格局</el-button>
            <el-button :type="this.params.type == 2 ? 'primary' : ''"
                       plain
                       @click="turnTopSecond">片区</el-button>
            <el-button :type="this.params.type == 3 ? 'primary' : ''"
                       plain
                       @click="turnTopThird">地级以上市</el-button>
          </el-button-group>

          <el-select v-model="chartCityValue"
                     filterable
                     placeholder="全部"
                     style="margin-left:8px;width:170px;"
                     @change="handleChangeCity"
                     v-if="(this.params.type==3||this.params.type==4)&&this.detailTitle !== '预留规模'">
            <el-option v-for="item in chartCityOptions"
                       :key="item.dictKey"
                       :label="item.zhCn"
                       :value="item.dictKey"></el-option>
          </el-select>
          <el-select v-model="chartAreaValue"
                     filterable
                     placeholder="请选择县"
                     style="margin-left:8px;width:170px;"
                     @change="handleChangeArea"
                     v-if="(this.params.type!=1||this.params.type!=2)&&this.chartCityValue!='all'">
            <el-option v-for="item in chartAreaOptions"
                       :key="item.dictKey"
                       :label="item.zhCn"
                       :value="item.dictKey"></el-option>
          </el-select>

          <el-cascader :props="props"
                       clearable
                       v-model="areaSelectedOptions"
                       @change="areaSelect()"
                       style="width:250px;margin-left:24px;"
                       v-if="this.detailTitle === '预留规模'"></el-cascader>

          <el-select v-model="this.params.year"
                     filterable
                     placeholder="请选择年份"
                     @change="handleChangeYear"
                     style="margin-left:24px;width:120px;">
            <el-option v-for="item in yearOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <el-select v-model="this.params.unit"
                     placeholder="请选择单位"
                     style="margin-left:24px;width:120px;"
                     @change="unitNameSelect">
            <el-option v-for="item in unitOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="primary-search-href__custom">
          <el-upload action="/epf-monitor-evaluation/admin/fkScaleLedger/import"
                     :before-upload="beforeUpload"
                     :http-request="annexUpload"
                     :on-success="uploadSuccess"
                     :on-error="uploadError"
                     :on-change="changeFile"
                     :show-file-list="false"
                     accept=".xlsx, .xls, .csv"
                     style="display:inline-block;"
                     v-if="this.detailTitle === '预留规模'">
            <span>导入台账</span>
          </el-upload>
          <span @click="getDownload"
                style="margin-left:24px;"
                v-if="this.detailTitle !== '预留规模'">下载文档</span>
          <span @click="getDownload"
                style="margin-left:24px;"
                v-if="this.detailTitle === '预留规模'">下载模板</span>
        </div>
      </div>
      <div style="width:136px;height:32px;display:flex;"
           v-if="this.detailTitle === '交易'">
        <div class="tab-title-jiaoyi"
             :class="{
            'tab-title-jiaoyi1': jiaoYiChartActive === 'GM',
            'tab-title-jiaoyi3': jiaoYiChartActive === 'CS'
          }"
             @click="turnGM">
          购买方
        </div>
        <div class="tab-title-jiaoyi"
             :class="{
            'tab-title-jiaoyi2': jiaoYiChartActive === 'CS',
            'tab-title-jiaoyi4': jiaoYiChartActive === 'GM'
          }"
             @click="turnCS">
          出售方
        </div>
      </div>

      <div class="checkout-big-box"
           style="margin-top:0px;"
           v-show="this.detailTitle === '预留规模' && cjActiveName === 'Table'">
        <div class="checkout-box-title">
          信息列筛选：
        </div>
        <div class="checkout-box">
          <el-checkbox-group v-model="checkListIng"
                             @change="handleCheckedTypesChange">
            <el-checkbox v-for="(item, index) in checkList"
                         :key="index"
                         :label="item"
                         :disabled="checkDisList.includes(item)"></el-checkbox>
            <span @click="handleCheckedTypesCancelChange"
                  style="color:#1B74EE;font-size:16px;line-height: 21px;cursor:pointer;margin-left:32px;">全部取消</span>
            <span style="color:#9A9A9A;font-size:16px;line-height: 21px;">（至多可选择6项）</span>
          </el-checkbox-group>
        </div>
      </div>

      <div class="unitTipChart"
           v-if="cjActiveName === 'Table'">
        面积单位：{{ this.unitName }}
      </div>
      <div class="unitTipChart"
           v-if="cjActiveName === 'Chart'">
        <div>面积单位：{{ this.unitName }}</div>
        <div class="index-map-button-bigBox">
          <div class="index-map-button"
               :class="{ active: showDataNumber === true }"
               @click="turnFirst">
            显示数据
          </div>
          <el-button-group style="margin-left:24px;"
                           v-if="this.detailTitle !== '预留规模'">
            <el-button :type="this.rankIndex == 1 ? 'primary' : ''"
                       plain
                       :disabled="this.rankDisabled"
                       @click="turnSecond">正序</el-button>
            <el-button :type="this.rankIndex == 2 ? 'primary' : ''"
                       plain
                       :disabled="this.rankDisabled"
                       @click="turnThird">倒序</el-button>
            <el-button :type="this.rankIndex == 3 ? 'primary' : ''"
                       plain
                       @click="turnFourth">行政区排序</el-button>
          </el-button-group>
        </div>
      </div>

      <div v-if="cjActiveName === 'Table'"
           :class="{minHeight1:this.detailTitle === '立项'||this.detailTitle === '验收',minHeight2:this.detailTitle === '交易',minHeight3:this.detailTitle === '预留规模'}">
        <el-table :data="
            listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
                  v-if="this.detailTitle === '立项'"
                  stripe
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:80px;"
                  border>
          <el-table-column label="序号"
                           min-width="100px"
                           align="center">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="areaName"
                           label="项目区名"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="coun"
                           label="立项数量"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="totalArea"
                           label="立项面积"
                           min-width="200"
                           align="center"></el-table-column>
        </el-table>
        <el-table :data="
            listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
                  v-if="this.detailTitle === '验收'"
                  stripe
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:80px;"
                  border>
          <el-table-column label="序号"
                           min-width="100px"
                           align="center">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="areaName"
                           label="项目区名"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="coun"
                           label="验收数量"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="totalArea"
                           label="验收面积"
                           min-width="200"
                           align="center"></el-table-column>
        </el-table>
        <el-table :data="
            listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
                  v-if="this.detailTitle === '交易'"
                  stripe
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:80px;"
                  border>
          <el-table-column label="序号"
                           min-width="100px"
                           align="center">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="areaName"
                           label="项目区名"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="totalAmount"
                           label="交易金额"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="totalArea"
                           label="交易面积"
                           min-width="200"
                           align="center"></el-table-column>
        </el-table>
        <el-table :data="
            listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
          "
                  v-if="this.detailTitle === '预留规模'"
                  stripe
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:80px;"
                  border>
          <el-table-column label="序号"
                           min-width="100px"
                           align="center">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="cityName"
                           label="市"
                           min-width="100"
                           align="center"></el-table-column>
          <el-table-column prop="areaName"
                           label="县"
                           min-width="100"
                           align="center"></el-table-column>
          <el-table-column prop="databaseCode"
                           label="数据库编码"
                           min-width="100"
                           align="center"
                           v-if="checkListIng.includes('数据库编码')"></el-table-column>
          <el-table-column prop="overallScope"
                           label="预留城乡总规模"
                           min-width="100"
                           align="center"
                           v-if="checkListIng.includes('预留城乡总规模')"></el-table-column>
          <el-table-column prop="changedAmount"
                           label="已变更"
                           min-width="100"
                           align="center"
                           v-if="checkListIng.includes('已变更')"></el-table-column>
          <el-table-column prop="beforeChangeAmount"
                           label="预变更"
                           min-width="100"
                           align="center"
                           v-if="checkListIng.includes('预变更')"></el-table-column>
          <el-table-column prop="surplusAmount"
                           label="剩余"
                           min-width="100"
                           align="center"
                           v-if="checkListIng.includes('剩余')"></el-table-column>
          <el-table-column prop="beforeSurplusAmount"
                           label="剩余（包含预变更）"
                           min-width="100"
                           align="center"
                           v-if="checkListIng.includes('剩余（包含预变更）')"></el-table-column>
          <el-table-column prop="implementationProjects"
                           label="落实项目"
                           min-width="300"
                           align="center"
                           v-if="checkListIng.includes('落实项目')"></el-table-column>
          <el-table-column prop="useArea"
                           label="使用面积"
                           min-width="100"
                           align="center"
                           v-if="checkListIng.includes('使用面积')"></el-table-column>
          <el-table-column prop="registerDate"
                           label="登记日期"
                           min-width="100"
                           align="center"
                           v-if="checkListIng.includes('登记日期')"></el-table-column>
          <el-table-column prop="registerType"
                           label="登记类型"
                           min-width="100"
                           align="center"
                           v-if="checkListIng.includes('登记类型')"></el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination background
                         layout="total, prev, pager, next,sizes,jumper"
                         :page-sizes="[5, 10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="this.listData.length"
                         :current-page.sync="currentPage"
                         :page-size="pageSize"></el-pagination>
        </div>
      </div>
      <div v-if="cjActiveName === 'Chart'"
           style="width:100%;"
           :style="{'height':(this.detailTitle === '交易'?565+'px':598+'px')}">
        <div id="projectChart"
             ref="projectChart"
             style="width:100%;height:100%;"
             v-show="isShowData"></div>
        <div class="chartImage"
             v-show="!isShowData">
          <img src="../../../../assets/noEchartData.png"
               alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import qs from 'qs'
import Bus from '../../../../utils/bus'
import moment from 'moment'
import echarts from 'echarts'
import areaSelect from '../../../../assets/js/areaCascader'
export default {
  name: 'ReclamationChart',
  mixins: [areaSelect],
  data () {
    return {
      params: {
        type: '3',
        citys: '',
        areas: '',
        city: '',
        area: '',
        unit: 'MU',
        amountOrderFlag: '',
        areaOrderFlag: '',
        // year: moment().year(),
        year: 2019,
        dataFlag: ''
      },
      href: '',

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: false,

      listData: [],

      detailTitle: '',
      cjActiveName: 'Chart',
      yearOptions: [
        {
          value: 2020,
          label: 2020
        },
        {
          value: 2019,
          label: 2019
        },
        {
          value: 2018,
          label: 2018
        },
        {
          value: 2017,
          label: 2017
        },
        {
          value: 2016,
          label: 2016
        },
        {
          value: 2015,
          label: 2015
        }
      ],
      unitOptions: [
        { label: '平方公里', value: 'SQUARE_KILOMETER' },
        { label: '亩', value: 'MU' },
        { label: '万亩', value: 'MILLION_MU' },
        { label: '平方米', value: 'SQUARE_METER' },
        { label: '公顷', value: 'HECTARE' }
      ],
      unitName: '亩',

      isShowData: true,
      cityNameList: [],
      cityNameListForgm: [],
      seriesAllData: [],
      seriesAllDataForgm: [],
      chartOptions: [],
      chartCityOptions: [],
      chartCityValue: 'all',
      chartAreaOptions: [],
      chartAreaValue: '',
      chartValue: '',
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      data7: [],
      legendData: [],
      changeLegendObj: [],
      changeLegend: [],
      showRankButton: 0,
      rankDisabled: true,
      showDataNumber: false,
      rankIndex: 3,

      // 交易
      dataMethod: '1',
      jiaoYiChartActive: 'GM',

      // 预留规模
      giuiMOprovince: '440000',
      giuiMOcity: '',
      giuiMOarea: '',

      file: null,
      checkList: [
        '序号',
        '市',
        '县',
        '数据库编码',
        '预留城乡总规模',
        '已变更',
        '预变更',
        '剩余',
        '剩余（包含预变更）',
        '落实项目',
        '使用面积',
        '登记日期',
        '登记类型'
      ],
      checkDisList: ['序号', '市', '县'],
      checkListIng: [
        '序号',
        '市',
        '县',
        '预留城乡总规模',
        '已变更',
        '预变更',
        '剩余',
        '剩余（包含预变更）'
      ],
      checked: true
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    // 切换图表展示
    changeRankLegend () {
      if (this.detailTitle === '立项') {
        this.changeLegendObj = {
          立项个数: true,
          立项面积: true
        }
        this.rankDisabled = true
      } else if (this.detailTitle === '验收') {
        this.changeLegendObj = {
          验收个数: true,
          验收面积: true
        }
        this.rankDisabled = true
      } else if (this.detailTitle === '交易') {
        this.changeLegendObj = {
          交易金额: true,
          交易面积: true
        }
        this.rankDisabled = true
        this.rankIndex = 3
        this.params.amountOrderFlag = ''
        this.params.areaOrderFlag = ''
      }
    },
    turnTable () {
      this.cjActiveName = 'Table'
      // if (this.detailTitle === '预留规模') {
      //   echarts.init(document.getElementById('projectChart')).clear()
      // }
    },
    turnChart () {
      if (this.detailTitle !== '预留规模') {
        this.$message(
          '当存在多个图例时不进行排序, 只能选择其中任意一个图例'
        )
      }
      this.cjActiveName = 'Chart'
      this.rankIndex = 3
      this.changeRankLegend()
      this.$nextTick(function () {
        setTimeout(() => {
          this.projectDrawLine()
        }, 500)
      })
    },
    // 地区选择
    turnTopFirst () {
      this.rankIndex = 3
      this.params.amountOrderFlag = ''
      this.params.areaOrderFlag = ''
      this.params.type = '1'
      this.params.citys = ''
      this.params.city = ''
      this.params.areas = ''
      this.params.area = ''
      this.chartCityValue = 'all'
      this.chartAreaValue = ''
      this.changeRankLegend()
    },
    turnTopSecond () {
      this.rankIndex = 3
      this.params.amountOrderFlag = ''
      this.params.areaOrderFlag = ''
      this.params.type = '2'
      this.params.citys = ''
      this.params.city = ''
      this.params.areas = ''
      this.params.area = ''
      this.chartCityValue = 'all'
      this.chartAreaValue = ''
      this.changeRankLegend()
    },
    turnTopThird () {
      this.rankIndex = 3
      this.params.amountOrderFlag = ''
      this.params.areaOrderFlag = ''
      this.params.type = '3'
      this.params.citys = ''
      this.params.city = ''
      this.params.areas = ''
      this.params.area = ''
      this.chartCityValue = 'all'
      this.chartAreaValue = ''
      this.changeRankLegend()
    },
    handleChangeYear (val) {
      this.params.year = val.value
    },
    unitNameSelect (val) {
      this.params.unit = val
      if (val === 'SQUARE_KILOMETER') {
        this.unitName = '平方公里'
      } else if (val === 'MU') {
        this.unitName = '亩'
      } else if (val === 'MILLION_MU') {
        this.unitName = '万亩'
      } else if (val === 'SQUARE_METER') {
        this.unitName = '平方米'
      } else if (val === 'HECTARE') {
        this.unitName = '公顷'
      }
    },
    turnGM () {
      this.jiaoYiChartActive = 'GM'
      this.dataMethod = '1'
    },
    turnCS () {
      this.jiaoYiChartActive = 'CS'
      this.dataMethod = '2'
    },
    areaSelect () {
      if (this.areaSelectedOptions.length == 1) {
        this.giuiMOprovince = this.areaSelectedOptions[0]
        this.giuiMOcity = ''
        this.giuiMOarea = ''
      } else if (this.areaSelectedOptions.length == 2) {
        this.giuiMOprovince = this.areaSelectedOptions[0]
        this.giuiMOcity = this.areaSelectedOptions[1]
        this.giuiMOarea = ''
      } else if (this.areaSelectedOptions.length == 3) {
        this.giuiMOprovince = this.areaSelectedOptions[0]
        this.giuiMOcity = this.areaSelectedOptions[1]
        this.giuiMOarea = this.areaSelectedOptions[2]
      }
      this.currentPage = 1
    },
    handleCheckedTypesChange (value) {
      if (this.checkListIng.length == 9) {
        this.checkDisList = this.checkList.filter(item => {
          return this.checkListIng.indexOf(item) === -1
        })
        this.checkDisList.unshift('序号', '市', '县')
      } else {
        this.checkDisList = []
        this.checkDisList = ['序号', '市', '县']
      }
    },
    handleCheckedTypesCancelChange () {
      this.checkDisList = ['序号', '市', '县']
      this.checkListIng = ['序号', '市', '县']
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      // this.pageSize = val; // 显示条数改变
      this.$data.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.currentPage = val // 页码改变
    },

    turnFirst () {
      this.showDataNumber = !this.showDataNumber
    },
    turnSecond () {
      this.rankIndex = 1
      if (
        (this.changeLegendObj['验收面积'] == true
          && this.changeLegendObj['验收个数'] == false)
        || (this.changeLegendObj['立项面积'] == true
          && this.changeLegendObj['立项个数'] == false)
        || (this.changeLegendObj['交易面积'] == true
          && this.changeLegendObj['交易金额'] == false)
      ) {
        this.params.areaOrderFlag = '1'
        this.params.amountOrderFlag = ''
      } else if (
        (this.changeLegendObj['验收面积'] == false
          && this.changeLegendObj['验收个数'] == true)
        || (this.changeLegendObj['立项面积'] == false
          && this.changeLegendObj['立项个数'] == true)
        || (this.changeLegendObj['交易面积'] == false
          && this.changeLegendObj['交易金额'] == true)
      ) {
        this.params.amountOrderFlag = '1'
        this.params.areaOrderFlag = ''
      }
    },
    turnThird () {
      this.rankIndex = 2
      if (
        (this.changeLegendObj['验收面积'] == true
          && this.changeLegendObj['验收个数'] == false)
        || (this.changeLegendObj['立项面积'] == true
          && this.changeLegendObj['立项个数'] == false)
        || (this.changeLegendObj['交易面积'] == true
          && this.changeLegendObj['交易金额'] == false)
      ) {
        this.params.areaOrderFlag = '2'
        this.params.amountOrderFlag = ''
      } else if (
        (this.changeLegendObj['验收面积'] == false
          && this.changeLegendObj['验收个数'] == true)
        || (this.changeLegendObj['立项面积'] == false
          && this.changeLegendObj['立项个数'] == true)
        || (this.changeLegendObj['交易面积'] == false
          && this.changeLegendObj['交易金额'] == true)
      ) {
        this.params.amountOrderFlag = '2'
        this.params.areaOrderFlag = ''
      }
    },
    turnFourth () {
      this.rankIndex = 3
      this.params.amountOrderFlag = ''
      this.params.areaOrderFlag = ''
    },

    getListData () {
      if (this.detailTitle === '立项' || this.detailTitle === '验收') {
        this.loading = true
        let params = this.params
        this.$get(
          '/epf-monitor-evaluation/fkProjectAccepted/acceptedList',
          params
        ).then(res => {
          if (res.code == 0) {
            let chartData = res.result
            this.listData = []
            this.cityNameList = []
            this.data1 = []
            this.data2 = []
            for (var key in chartData) {
              if (this.params.type == 1 || this.params.type == 2) {
                this.listData.push({
                  areaName: chartData[key].area1,
                  coun: Number(chartData[key].coun).toFixed(2),
                  totalArea: Number(chartData[key].totalArea).toFixed(2)
                })
                this.cityNameList.push(chartData[key].area1)
              } else if (this.params.type == 3 || this.params.type == 4) {
                this.cityNameList.push(chartData[key].areaName)
                this.chartOptions.push({
                  value: chartData[key].area1,
                  label: chartData[key].areaName
                })
                this.listData.push({
                  areaName: chartData[key].areaName,
                  coun: Number(chartData[key].coun).toFixed(2),
                  totalArea: Number(chartData[key].totalArea).toFixed(2)
                })
              }
              this.data1.push(Number(chartData[key].coun).toFixed(2)) // 验收或立项数量
              this.data2.push(Number(chartData[key].totalArea).toFixed(2)) // 验收或立项面积
            }
            this.seriesAllData = [this.data1, this.data2]
            this.loading = false

            this.$nextTick(function () {
              setTimeout(() => {
                this.projectDrawLine()
              }, 100)
            })
          } else {
            this.loading = false
            this.isShowData = false
            this.$message.error(res.msg) // 失败
            return
          }
        })
      } else if (this.detailTitle === '交易') {
        this.loading = true
        if (this.dataMethod == '1') {
          this.$get(
            `/epf-monitor-evaluation/fkProjectTrade/tradeList?type=${this.params.type}&buyCitys=${this.params.citys}&buyAreas=${this.params.areas}&buyCity=${this.params.city}&buyArea=${this.params.area}&unit=${this.params.unit}&amountOrderFlag=${this.params.amountOrderFlag}&areaOrderFlag=${this.params.areaOrderFlag}&year=${this.params.year}&dataMethod=1`
          ).then(res => {
            if (res.code == 0) {
              let chartData = res.result
              this.listData = []
              this.cityNameList = []
              this.data1 = []
              this.data2 = []
              for (var key in chartData) {
                if (this.params.type == 1 || this.params.type == 2) {
                  this.listData.push({
                    areaName: chartData[key].area1,
                    totalAmount: Number(chartData[key].totalAmount).toFixed(2),
                    totalArea: Number(chartData[key].totalArea).toFixed(2)
                  })
                  this.cityNameList.push(chartData[key].area1)
                } else if (this.params.type == 3 || this.params.type == 4) {
                  this.cityNameList.push(chartData[key].areaName)
                  this.chartOptions.push({
                    value: chartData[key].area1,
                    label: chartData[key].areaName
                  })
                  this.listData.push({
                    areaName: chartData[key].areaName,
                    totalAmount: Number(chartData[key].totalAmount).toFixed(2),
                    totalArea: Number(chartData[key].totalArea).toFixed(2)
                  })
                }
                this.data1.push(Number(chartData[key].totalAmount).toFixed(2)) // 交易金额
                this.data2.push(Number(chartData[key].totalArea).toFixed(2)) // 交易面积
              }
              this.seriesAllData = [this.data1, this.data2]
              this.loading = false

              this.$nextTick(function () {
                setTimeout(() => {
                  this.projectDrawLine()
                }, 500)
              })
            } else {
              this.loading = false
              this.isShowData = false
              this.$message.error(res.msg) // 失败
              return
            }
          })
        } else if (this.dataMethod == '2') {
          this.$get(
            `/epf-monitor-evaluation/fkProjectTrade/tradeList?type=${this.params.type}&buyCitys=${this.params.citys}&buyAreas=${this.params.areas}&sellCity=${this.params.city}&sellArea=${this.params.area}&unit=${this.params.unit}&amountOrderFlag=${this.params.amountOrderFlag}&areaOrderFlag=${this.params.areaOrderFlag}&year=${this.params.year}&dataMethod=2`
          ).then(res => {
            if (res.code == 0) {
              let chartData = res.result
              this.listData = []
              this.cityNameList = []
              this.data1 = []
              this.data2 = []
              for (var key in chartData) {
                if (this.params.type == 1 || this.params.type == 2) {
                  this.listData.push({
                    areaName: chartData[key].area1,
                    totalAmount: Number(chartData[key].totalAmount).toFixed(2),
                    totalArea: Number(chartData[key].totalArea).toFixed(2)
                  })
                  this.cityNameList.push(chartData[key].area1)
                } else if (this.params.type == 3 || this.params.type == 4) {
                  this.cityNameList.push(chartData[key].areaName)
                  this.chartOptions.push({
                    value: chartData[key].area1,
                    label: chartData[key].areaName
                  })
                  this.listData.push({
                    areaName: chartData[key].areaName,
                    totalAmount: Number(chartData[key].totalAmount).toFixed(2),
                    totalArea: Number(chartData[key].totalArea).toFixed(2)
                  })
                }
                this.data1.push(Number(chartData[key].totalAmount).toFixed(2)) // 交易金额
                this.data2.push(Number(chartData[key].totalArea).toFixed(2)) // 交易面积
              }
              this.seriesAllData = [this.data1, this.data2]
              this.loading = false

              this.$nextTick(function () {
                setTimeout(() => {
                  this.projectDrawLine()
                }, 500)
              })
            } else {
              this.loading = false
              this.isShowData = false
              this.$message.error(res.msg) // 失败
              return
            }
          })
        }
      } else if (this.detailTitle === '预留规模') {
        this.loading = true
        this.$get(
          `/epf-monitor-evaluation/admin/fkScaleLedger/getList?yeaer=${this.params.year}&province=440000&city=${this.giuiMOcity}&area=${this.giuiMOarea}&unit=${this.params.unit}`
        ).then(res => {
          if (res.code == 0) {
            let chartData = res.pager.results
            this.listData = []
            for (var key in chartData) {
              chartData[key]['cityName']
                = chartData[key].dictTranslate.cityName
              chartData[key]['areaName']
                = chartData[key].dictTranslate.areaName
              chartData[key]['overallScope'] = Number(
                chartData[key].overallScope
              ).toFixed(2)
              chartData[key]['changedAmount'] = Number(
                chartData[key].changedAmount
              ).toFixed(2)
              chartData[key]['beforeChangeAmount'] = Number(
                chartData[key].beforeChangeAmount
              ).toFixed(2)
              chartData[key]['surplusAmount'] = Number(
                chartData[key].surplusAmount
              ).toFixed(2)
              chartData[key]['beforeSurplusAmount'] = Number(
                chartData[key].beforeSurplusAmount
              ).toFixed(2)
              chartData[key]['useArea'] = Number(
                chartData[key].useArea
              ).toFixed(2)
            }
            this.listData = chartData
            this.loading = false
          } else {
            this.loading = false
            this.$message.error(res.msg) // 失败
            return
          }
        })
      }
    },
    projectDrawLine () {
      setTimeout(() => {
        let projectChart = echarts.init(
          document.getElementById('projectChart')
        )
        document.getElementById('projectChart').style.width = 100 + '%'
        document.getElementById('projectChart').style.height = 100 + '%'
        projectChart.resize() // 直接加这句即可
      }, 0)
      const that = this
      let projectChart = echarts.init(document.getElementById('projectChart'))
      let cityNameList = []
      let seriesAllData = []
      let legendData = this.legendData
      let legendSelected = this.changeLegendObj

      let colorData = ['#4298ef', '#7678ec', '#53bef6', '#24a6c2', '#545bb0']
      let option = {}

      if (this.detailTitle === '预留规模') {
        seriesAllData = this.seriesAllDataForgm
        cityNameList = this.cityNameListForgm
      } else {
        seriesAllData = this.seriesAllData
        cityNameList = this.cityNameList
      }

      if (cityNameList.length === 0) {
        this.isShowData = false
      } else {
        this.isShowData = true
      }

      let series = []
      if (this.showDataNumber == false) {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: 'bar',
            barWidth: null, // 默认自适应
            barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          })
        }
      } else {
        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: 'bar',
            barWidth: null, // 默认自适应
            barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: colorData[i]
                }
              }
            },
            data: seriesAllData[i], // 数据
            itemStyle: {
              normal: {
                color: colorData[i]
              }
            }
          })
        }
      }

      option = {
        title: {
          // text: "全省农村拆旧复垦指标流转情况总览",
          x: 'center',
          fontSize: '18px',
          top: '2%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: 'center',
          bottom: '1%',
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          itemGap: 16,
          selected: legendSelected,
          textStyle: {
            fontSize: '18px',
            color: '#4E4E4E'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '8%',
          top: '5%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: 'category',
            data: cityNameList,
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: 'auto',
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: '14' // 坐标值得具体的颜色
              }
            }
          }
        ],
        dataZoom: [
          {
            // type: "slider",
            type: 'inside',
            show: false,
            xAxisIndex: [0],
            start: 0, // 默认为1
            end: 100
            // zoomLock:true,
            // height:"15px",
          }
        ],
        yAxis: [
          {
            name: '',
            type: 'value',
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            },
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            }
          }
        ],
        series: series
      }

      projectChart.setOption(option, true)
      projectChart.on('legendselectchanged', function (e) {
        sessionStorage.removeItem('showRankButtonMessage')
        sessionStorage.removeItem('showRankContentMessage')
        this.changeLegend = e.selected
        if (
          (e.selected[legendData[0]] == true
            && e.selected[legendData[1]] == true)
          || (e.selected[legendData[0]] == false
            && e.selected[legendData[1]] == false)
        ) {
          this.showRankButton = 0
        } else if (
          e.selected[legendData[0]] == true
          || e.selected[legendData[1]] == false
          || e.selected[legendData[0]] == false
          || e.selected[legendData[1]] == true
        ) {
          this.showRankButton = 1
        }
        this.changeLegend = JSON.stringify(this.changeLegend)
        sessionStorage.setItem('showRankButtonMessage', this.showRankButton)
        sessionStorage.setItem('showRankContentMessage', this.changeLegend)

        clearTimeout(this.timeFn)
        this.timeFn = setTimeout(function () {
          that.getChangeLegend()
        }, 250)
      })
    },
    getGMChart () {
      this.$get(
        `/epf-monitor-evaluation/admin/fkScaleLedger/getChartData?yeaer=${this.params.year}&province=440000&city=${this.giuiMOcity}&area=${this.giuiMOarea}&unit=${this.params.unit}`
      ).then(res => {
        if (res.code == 0) {
          let chartData = res.result

          // 展示的数据
          this.data3 = []
          this.data4 = []
          this.data5 = []
          this.data6 = []
          this.data7 = []
          this.cityNameListForgm = [] // x轴数据
          this.seriesAllDataForgm = [] // 展示数据

          for (var key in chartData) {
            this.data3.push(Number(chartData[key].overallScope).toFixed(2))
            this.data4.push(Number(chartData[key].changedAmount).toFixed(2))
            this.data5.push(
              Number(chartData[key].beforeChangeAmount).toFixed(2)
            )
            this.data6.push(Number(chartData[key].surplusAmount).toFixed(2))
            this.data7.push(
              Number(chartData[key].beforeSurplusAmount).toFixed(2)
            )
            if (this.giuiMOprovince != '') {
              if (this.giuiMOcity != '') {
                if (this.giuiMOarea != '') {
                  this.cityNameListForgm.push(chartData[key].dictTranslate.areaName)
                } else {
                  this.cityNameListForgm.push(chartData[key].dictTranslate.areaName)
                }
              } else {
                this.cityNameListForgm.push(chartData[key].dictTranslate.cityName)
              }
            }
          }
          this.seriesAllDataForgm = [this.data3, this.data4, this.data5, this.data6, this.data7]

          this.$nextTick(function () {
            setTimeout(() => {
              this.projectDrawLine()
            }, 0)
          })
        } else {
          this.isShowData = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        let projectChart = echarts.init(
          document.getElementById('projectChart')
        )
        document.getElementById('projectChart').style.width = 100 + '%'
        document.getElementById('projectChart').style.height = 100 + '%'
        projectChart.resize()
      })
    },
    getChangeLegend () {
      this.showRankButton = sessionStorage.getItem('showRankButtonMessage')
      this.changeLegendObj = JSON.parse(
        sessionStorage.getItem('showRankContentMessage')
      )
      if (
        (this.changeLegendObj['验收面积'] == true
          && this.this.changeLegendObj['验收个数'] == true)
        || (this.changeLegendObj['立项面积'] == true
          && this.this.changeLegendObj['立项个数'] == true)
        || (this.changeLegendObj['交易面积'] == true
          && this.this.changeLegendObj['交易金额'] == true)
      ) {
        this.params.amountOrderFlag = ''
        this.params.areaOrderFlag = ''
      }
      if (this.showRankButton == 0) {
        this.rankDisabled = true
      } else {
        this.rankDisabled = false
      }
    },
    getDownload () {
      if (this.detailTitle === '立项' || this.detailTitle === '验收') {
        window.open(
          `/api/epf-monitor-evaluation/fkProjectAccepted/exportDataNow?type=${this.params.type}&citys=${this.params.citys}&areas=${this.params.areas}&city=${this.params.city}&area=${this.params.area}&unit=${this.params.unit}&amountOrderFlag=${this.params.amountOrderFlag}&areaOrderFlag=${this.params.areaOrderFlag}&year=${this.params.year}&dataFlag=${this.params.dataFlag}`
        )
      } else if (this.detailTitle === '交易') {
        if (this.dataMethod == '1') {
          window.open(
            `/api/epf-monitor-evaluation/fkProjectTrade/exportDataNow?type=${this.params.type}&buyCitys=${this.params.citys}&buyAreas=${this.params.areas}&buyCity=${this.params.city}&buyArea=${this.params.area}&unit=${this.params.unit}&amountOrderFlag=${this.params.amountOrderFlag}&areaOrderFlag=${this.params.areaOrderFlag}&year=${this.params.year}&dataMethod=1`
          )
        } else if (this.dataMethod == '2') {
          window.open(
            `/api/epf-monitor-evaluation/fkProjectTrade/exportDataNow?type=${this.params.type}&buyCitys=${this.params.citys}&buyAreas=${this.params.areas}&sellCity=${this.params.city}&sellArea=${this.params.area}&unit=${this.params.unit}&amountOrderFlag=${this.params.amountOrderFlag}&areaOrderFlag=${this.params.areaOrderFlag}&year=${this.params.year}&dataMethod=2`
          )
        }
      } else if (this.detailTitle === '预留规模') {
        window.open(
          '/api/epf-document/document/downloadById?id=2f4d0e1b-abc7-4983-bc65-e97df1b75473'
        )
      }
    },
    // 导入台账
    beforeUpload (file) {
      const isLt5M = file.size / 1024 / 1024 < 5

      if (isLt5M) {
        return true
      }
      this.$message({
        message: '上传文件不能超过5M',
        type: 'warning'
      })
      return false
    },
    annexUpload (files) {
      const file = files.file
      const me = this
      let formData = new FormData()
      if (file) {
        formData.append('file', file)
        this.$useAppend(
          '/epf-monitor-evaluation/admin/fkScaleLedger/import',
          formData
        ).then(res => {
          if (res.code === 0) {
            files.onSuccess(res)
            this.$message.success('模板上传成功!')
          } else {
            me.uploadError()
          }
        })
      }
    },
    uploadSuccess () { },
    uploadError () {
      this.$message.error('模板上传失败!')
    },
    changeFile () { },
    handleChangeCity (value) {
      this.params.type = '3'
      this.chartAreaValue = ''
      if (this.chartCityValue === 'all') {
        this.params.citys = ''
        this.params.city = ''
        this.params.areas = ''
        this.params.area = ''
      } else {
        this.params.citys = ''
        this.params.city = value
        this.params.areas = ''
        this.params.area = ''
      }
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${value}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length !== 0) {
          this.chartAreaOptions = res.dictionariesList
          this.chartAreaOptions.unshift({
            zhCn: '全部',
            dictKey: 'all'
          })
          return
        }
      })
    },
    handleChangeArea (value) {
      this.params.type = '4'
      if (this.chartAreaValue === 'all') {
        this.params.areas = ''
        this.params.area = ''
      } else {
        this.params.areas = ''
        this.params.area = value
      }
    }
  },
  created () {
    var toTable = JSON.parse(sessionStorage.getItem('toChaijiuChartType'))
    if (toTable === '项目立项情况') {
      this.detailTitle = '立项'
      this.params.dataFlag = 2
      this.legendData = ['立项个数', '立项面积']
    } else if (toTable === '项目验收情况') {
      this.detailTitle = '验收'
      this.params.dataFlag = 1
      this.legendData = ['验收个数', '验收面积']
    } else if (toTable === '项目交易情况') {
      this.detailTitle = '交易'
      this.legendData = ['交易金额', '交易面积']
    } else if (toTable === '预留规模') {
      this.detailTitle = '预留规模'
      this.legendData = [
        '预留城乡总规模',
        '已变更',
        '预变更',
        '剩余',
        '剩余（包含预变更）'
      ]
    }
    this.currentPage = 1
    this.pageNo = 1
    this.pageSize = 5
    this.cjActiveName = 'Chart'
    this.params.type = '3'
    this.params.citys = ''
    this.params.city = ''
    this.params.areas = ''
    this.params.area = ''
    this.chartCityValue = 'all'
    this.chartAreaValue = ''
    this.getListData()

    if (this.detailTitle !== '预留规模') {
      this.$message(
        '当存在多个图例时不进行排序, 只能选择其中任意一个图例'
      )
    }

    this.$get(
      '/epf-admin/regionals/getAreaByCodeOrParentId?parentId=440000',
      {}
    ).then(res => {
      if (res.dictionariesList.length !== 0) {
        this.chartCityOptions = res.dictionariesList
        this.chartCityOptions.unshift({
          zhCn: '全部',
          dictKey: 'all'
        })
        return
      }
    })
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.projectDrawLine()
      }, 500)
    })

    this.initEchart()
    this.getChangeLegend()
  },
  watch: {
    $route (to, from) {
      var toTable = JSON.parse(sessionStorage.getItem('toChaijiuChartType'))
      if (toTable === '项目立项情况') {
        this.detailTitle = '立项'
        this.params.dataFlag = 2
        this.legendData = ['立项个数', '立项面积']
      } else if (toTable === '项目验收情况') {
        this.detailTitle = '验收'
        this.params.dataFlag = 1
        this.legendData = ['验收个数', '验收面积']
      } else if (toTable === '项目交易情况') {
        this.detailTitle = '交易'
        this.legendData = ['交易金额', '交易面积']
      } else if (toTable === '预留规模') {
        this.detailTitle = '预留规模'
        this.legendData = [
          '预留城乡总规模',
          '已变更',
          '预变更',
          '剩余',
          '剩余（包含预变更）'
        ]
        this.getGMChart()
      }
      this.currentPage = 1
      this.pageNo = 1
      this.pageSize = 5
      this.cjActiveName = 'Chart'
      this.params.type = '3'
      this.params.citys = ''
      this.params.city = ''
      this.params.areas = ''
      this.params.area = ''
      this.chartCityValue = 'all'
      this.chartAreaValue = ''
      this.getListData()
    },
    showDataNumber (val) {
      this.$nextTick(function () {
        setTimeout(() => {
          this.projectDrawLine()
        }, 500)
      })
    },
    showRankButton: {
      immediate: true,
      deep: true,
      handler (val) {
        this.showRankButton = sessionStorage.getItem('showRankButtonMessage')
        if (this.showRankButton == 0) {
          this.rankDisabled = true
          this.rankIndex = 3
          this.params.amountOrderFlag = ''
          this.params.areaOrderFlag = ''
        } else if (this.showRankButton == 1) {
          this.rankDisabled = false
        }
      }
    },
    params: {
      immediate: true,
      deep: true,
      handler (val) {
        this.getListData()
        if (this.detailTitle === '预留规模') {
          this.getGMChart()
        }
        setTimeout(() => {
          this.$nextTick(function () {
            setTimeout(() => {
              this.projectDrawLine()
            }, 500)
          })
        }, 0)
      }
    },
    areaSelectedOptions: {
      immediate: true,
      deep: true,
      handler (val) {
        this.getListData()
        if (this.detailTitle === '预留规模') {
          this.getGMChart()
        }
        setTimeout(() => {
          this.$nextTick(function () {
            setTimeout(() => {
              this.projectDrawLine()
            }, 1000)
          })
        }, 0)
      }
    },
    dataMethod (val) {
      this.getListData()
      setTimeout(() => {
        this.$nextTick(function () {
          setTimeout(() => {
            this.projectDrawLine()
          }, 500)
        })
      }, 0)
    },
    detailTitle (val) {
      if (val === '预留规模') {
        this.getGMChart()
        setTimeout(() => {
          this.$nextTick(function () {
            setTimeout(() => {
              this.projectDrawLine()
            }, 500)
          })
        }, 0)
      }
    }
  }
}
</script>
<style scoped>
.page-body {
  width: 100%;
  min-height: 821px;
  height: auto;
  padding: 16px 24px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
}
.left-top-stock {
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  border-bottom: 1px solid #d9d9d9;
}
.left-top-button-other {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left-top-button-other-title {
  font-size: 18px;
  color: #232323;
  font-weight: bolder;
}
.page-list-stock {
  width: 100% !important;
  height: calc(100% - 40px) !important;
  background-color: #fff !important;
  padding: 0px 16px 16px !important;
}
.switchHeight_box_chaijiu {
  width: 100%;
  height: 88px;
  padding: 24px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.switchHeight_box_chaijiu_left {
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.primary-search-href__custom {
  width: 120px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;
  color: #50a5f4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 24px;
}
.tab-title-chart {
  width: 40px;
  height: 40px;
  padding: 2px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  box-sizing: border-box;
}
.tab-title-chart1 {
  width: 40px;
  height: 40px;
  padding: 2px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #1b74ee;
  cursor: pointer;
}
.tab-title-chart2 {
  width: 40px;
  height: 40px;
  padding: 2px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #1b74ee;
  cursor: pointer;
}
.tab-title-chart3 {
  border-left: 0px solid transparent;
}
.tab-title-chart4 {
  border-right: 0px solid transparent;
}
.tab-title-jiaoyi {
  width: 68px;
  height: 32px;
  font-size: 16px;
  color: #595959;
  border: 1px solid #d9d9d9;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
  box-sizing: border-box;
}
.tab-title-jiaoyi1 {
  width: 68px;
  height: 32px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #1b74ee;
  font-size: 16px;
  color: #1b74ee;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
}
.tab-title-jiaoyi2 {
  width: 68px;
  height: 32px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #1b74ee;
  font-size: 16px;
  color: #1b74ee;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
}
.tab-title-jiaoyi3 {
  border-right: 0px solid transparent;
}
.tab-title-jiaoyi4 {
  border-left: 0px solid transparent;
}
.unitTipTable {
  width: 100%;
  height: 21px;
  font-size: 16px;
  color: #505050;
  line-height: 21px;
  margin-bottom: 8px;
}
.unitTipChart {
  width: 100%;
  height: 38px;
  font-size: 16px;
  color: #505050;
  line-height: 38px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.index-map-button {
  height: 38px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #d9d9d9;
  color: #595959;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 4px;
}
.index-map-button.active {
  color: #1b74ee;
  border-color: #1b74ee;
  background-color: #fff;
}
.index-map-button-bigBox {
  flex: 1;
  height: 38px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.checkout-big-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.checkout-box-title {
  width: 110px;
  height: 30px;
  font-size: 16px;
  color: #505050;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.checkout-box {
  flex: 1;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.chartImage {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chartImage img {
  width: 250px;
  height: 254px;
}
.minHeight1 {
  min-height: 598px;
}
.minHeight2 {
  min-height: 565px;
}
.minHeight3 {
  min-height: 522px;
}
</style>
<style>
#chaijiuChart .el-button {
  border: 1px solid #d9d9d9;
  color: #595959;
  font-weight: 500;
  font-size: 16px;
  padding: 10px;
}
#chaijiuChart .el-button:focus {
  color: #1b74ee;
  border-color: #1b74ee;
  background-color: #fff;
}
/* #chaijiuChart .el-button:hover {
  color: #595959;
  border-color: #d9d9d9;
  background-color: #fff;
} */
#chaijiuChart .el-button--primary {
  background-color: #fff;
  color: #1b74ee;
  border-color: #1b74ee;
  z-index: 11;
}
#chaijiuChart .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #c0c4cc;
  font-size: 16px;
  line-height: 21px;
}
#chaijiuChart .el-checkbox__label {
  font-size: 16px;
  line-height: 21px;
}
#chaijiuChart .el-checkbox {
  margin-bottom: 8px;
}
#chaijiuChart .el-checkbox__label {
  font-size: 16px;
  line-height: 21px;
}
</style>
