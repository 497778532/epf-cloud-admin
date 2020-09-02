<template>
  <div class="EPF-table"
       id="chart-box"
       style="width:100%;height:100%;padding:15px;">
    <div class="chart-select">
     
        <!-- <img src="./images/饼状图.png"
             alt
             @click="showPieChart" /> -->
             <div style="display: flex;
    margin-right: 10px;">
               <img src="./images/条形图选中.png"
             alt
             @click="showBarChart" class="lineStyle" style="cursor:pointer;" v-if="chosenBar"/>
        <img src="./images/条形图未选.png"
             alt
             @click="showBarChart" class="noneLine" style="cursor:pointer;" v-if="!chosenBar"/>
        <img src="./images/表格未选.png"
             alt
             @click="showTable" class="noneLine" style="cursor:pointer;" v-if="chosenTable"/>
        <img src="./images/表格选中.png"
             alt
             @click="showTable" class="lineStyle" style="cursor:pointer;" v-if="!chosenTable"/>
             </div>
      <div class="chart-select-top__button" id="chaijiuChart">
        <el-button-group>
          <el-button :type="this.current == 0 ? 'primary' : ''"
                     @click="turnTopFirst">区域格局</el-button>
          <el-button :type="this.current == 1 ? 'primary' : ''"
                     @click="turnTopSecond">片区</el-button>
          <el-button :type="this.current == 2 ? 'primary' : ''"
                     @click="turnTopThird">地级以上市</el-button>
          <!-- <el-button :type="this.current==3?'primary':''"
                     @click="turnTopFourth">县区</el-button> -->
        </el-button-group>
        <el-select v-model="chartValue"
                   filterable
                   placeholder="请选择市"
                   style="margin-left:15px;width:170px;"
                   @change="handleChangeArea"
                   >
          <el-option v-for="item in chartOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <el-select v-model="xianValue"
                   filterable
                   placeholder="请选择县"
                   style="margin-left:15px;width:170px;"
                   @change="handleChangeXian"
                    v-show="showXian">
          <el-option v-for="item in chartOptions2"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <!-- <el-button :type="this.current == 2? '' : ''"
                     @click="handleChangePlace" v-show="this.current == 2">请选择县</el-button> -->
         <el-select v-model="yearVal"
                   placeholder="请选择年份"
                   style="margin-left:15px;width:100px;"
                   @change="yearNameSelect()">
          <el-option v-for="item in yearInput"
                     :key="item"
                     :label="item"
                     :value="item"></el-option>
        </el-select>
        <el-select v-model="unitsVal"
                   placeholder="请选择单位"
                   style="margin-left:15px;width:100px;"
                   @change="unitNameSelect()">
          <el-option v-for="item in units"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </div>

      <div class="chart-tab-icon" style="width:10%;">
             <span @click="download" style="color: #409EFF;cursor:pointer;">下载文档</span>
      </div>
    </div>
    <div style="height: 100px;margin-top:20px;" v-show="showTableHead">
          <div>信息列筛选：</div>
          <div>
  <el-checkbox label="序号" disabled checked  style="padding-left: 5px;"></el-checkbox>
    <el-checkbox label="行政区" disabled checked  style="padding-left: 5px;"></el-checkbox>
    <el-checkbox label="达标情况" disabled checked  style="padding-left: 5px;"></el-checkbox>
  <div style="margin: 15px 0;"></div>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <!-- <el-checkbox label="行政区" disabled></el-checkbox> -->
    <!-- <el-checkbox v-for="city in testtableHead" :label="city.other_comment" :key="city" v-show="city.other_comment == '行政区'" disabled checked>{{city.other_comment}}</el-checkbox> -->
    <el-checkbox v-for="city in checkedCities1" :label="city" :key="city" style="padding: 5px;">{{city}}</el-checkbox>
  </el-checkbox-group>
  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"  style="padding-left: 5px;">全部取消</el-checkbox>
  <span>（最多可选择<span>{{this.biggestNum}}</span>项）</span>
</div>
</div>
    <div class="unitTip" v-if="this.showCurrent == 2">{{ this.unitName }}</div><div class="index-map-button-box"
         v-if="this.showCurrent == 0">
      <div class="index-map-button"
           :class="{ active: bottomCurrentZeroActive === true }"
           @click="turnFirst" style="margin-right:10px;">
        显示数字
      </div>
      <div class="index-map-button"
           :class="{ activeOnly: bottomCurrent === 1 }"
           @click="turnSecond">
        倒序
      </div>
      <div class="index-map-button"
           :class="{ activeOnly: bottomCurrent === 2 }"
           @click="turnThird">
        正序
      </div>
      <div class="index-map-button"
           :class="{ activeOnly: bottomCurrent === 4 }"
           @click="turnFifth">
        行政区排序
      </div>
      <!-- <div class="index-map-button"
           :class="{ active: bottomCurrentThirdActive === true}"
           @click="turnFourth">X/Y轴对换</div> -->
    </div>
    <div class="chart-show">
      <div id="projectChart"
           ref="projectChart"
           style="width:100%;height:100%;"
           v-show="this.showCurrent == 0"></div>
      <div style="width:100%;height:100%;position: relative;padding-bottom: 20px;"
           v-if="this.showCurrent == 2">
        <el-table :data="
            projectTableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
                  :summary-method="getSummaries"
                  show-summary
                  min-height="100"
                  max-height="550"
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:80px;margin-bottom:10px;"
                  border>
          <el-table-column label="序号"
                           align="center">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column v-for="(item, index) in projectTableHead"
                           :prop="item.column_name"
                           :label="item.column_comment"
                           align="center"
                           :key="index"></el-table-column>
          <!-- <el-table-column label="达标情况"
                           align="center">
            <template v-if="projectTableData.compliance===0">
              <el-button type="success"
                         plain>成功按钮</el-button>
            </template>
          </el-table-column> -->
          <el-table-column label="达标情况"
                           align="center"
                           v-if="this.projectTableData[0].showDB==true">
            <template slot-scope="scope">
              <el-button type="success"
                         plain
                         v-if="scope.row.dabiaoqingkuang == 0">正常</el-button>
              <el-button type="danger"
                         plain
                         v-if="scope.row.dabiaoqingkuang == -1">偏低</el-button>
              <el-button type="danger"
                         plain
                         v-if="scope.row.dabiaoqingkuang == 1">偏高</el-button>
            </template>
          </el-table-column>
          <el-table-column label="排名情况"
                           align="center"
                           v-if="this.projectTableData[0].showDB==false">
            <template slot-scope="scope">
              <el-button type="warning"
                         plain
                         v-if="scope.row.paiming == 1">{{scope.row.paiming}}</el-button>
              <el-button type="warning"
                         plain
                         v-if="scope.row.paiming == 2">{{scope.row.paiming}}</el-button>
              <el-button type="warning"
                         plain
                         v-if="scope.row.paiming == 3">{{scope.row.paiming}}</el-button>
              <el-button type="success"
                         plain
                         v-if="scope.row.paiming > 3">{{scope.row.paiming}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="position: absolute;bottom:-10px;right:0px;">
          <el-pagination background
                         layout="total, prev, pager, next,sizes,jumper"
                         :page-sizes="[5, 10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="this.projectTableData.length"
                         :current-page.sync="currentPage"
                         :page-size="pageSize"></el-pagination>
        </div>
      </div>
    </div>
    
    <!-- <div class="chart-click">
      <div class="wrap-middle-bottom"
           style="position: relative;">
        <ul class="wrap-middle-bottom-timeLine">
          <li class="timeLine-box"
              v-for="(item, index) in projectYearData"
              :key="index"
              :class="{
              active: index == limitB && !morenYear,
              activeMoren: morenYear
            }">
            <div class="timeLine-shape">
              <div class="timeLine-shape-circle"
                   @click="getSelectYearData(index)"></div>
              <div class="timeLine-shape-line"></div>
            </div>
            <div class="timeLine-year">{{ item.year }}</div>
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import Bus from '../../../../../utils/bus'
import qs from 'qs'
import echarts from 'echarts'
import moment from 'moment'
import 'echarts/theme/dark.js'
import 'echarts/theme/vintage.js'
import 'echarts/theme/macarons.js'
export default {
  props: {
    tableHeadData: {
      type: Array
    },
    checkCitied1: {
      type: Array
    },
    tableDataList: {
      type: Array
    },
    tableAddDataList: {
      type: Object
    },
    yearListData: {
      type: Array
    },
    isShowData: {
      type: Boolean
    },
    controlButton: {
      type: String
    },
    chartOptionsData: {
      type: Array
    },
    chartXianData: {
      type: Array
    },
    list: {
      type: String
    },
    city: {
      type: String
    },
    rightItemMessageTitleData: {
      type: String
    },
  },
  data() {
    return {
      showXian: false,
      // 页码
      biggestNum: '',
      checkAll: true,
      isIndeterminate: false,
      itemStyle1: '',
      chosenTable:false,
      chosenBar: false,
      showTableHead: true,
      checkedCities: [],
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,
      loading: true,
      chartValue: '',
      xianValue: '',
      chartOptions: [],
      chartOptions2: [],
      test: [1, 2, 3],
      areaType: 3,
      year: 2019,
      newCity: [],
      newList: [],
      testData: [1, 2, 3],
      data1: [],
      xianQuList: [],
      cityNameList: [
        '广州市',
        '韶关市',
        '深圳市',
        '珠海市',
        '汕头市',
        '佛山市',
        '江门市',
        '湛江市',
        '茂名市',
        '肇庆市',
        '惠州市',
        '梅州市',
        '汕尾市',
        '河源市',
        '阳江市',
        '清远市',
        '东莞市',
        '中山市',
        '潮州市',
        '揭阳市',
        '云浮市'
      ],
      current: 2,

      flag: false,
      cities: [
        { id: '440100', name: '广州市' },
        { id: '440200', name: '韶关市' },
        { id: '440300', name: '深圳市' },
        { id: '440400', name: '珠海市' },
        { id: '440500', name: '汕头市' },
        { id: '440600', name: '佛山市' },
        { id: '440700', name: '江门市' },
        { id: '440800', name: '湛江市' },
        { id: '440900', name: '茂名市' },
        { id: '441200', name: '肇庆市' },
        { id: '441300', name: '惠州市' },
        { id: '441400', name: '梅州市' },
        { id: '441500', name: '汕尾市' },
        { id: '441600', name: '河源市' },
        { id: '441700', name: '阳江市' },
        { id: '441800', name: '清远市' },
        { id: '441900', name: '东莞市' },
        { id: '442000', name: '中山市' },
        { id: '445100', name: '潮州市' },
        { id: '445200', name: '揭阳市' },
        { id: '445300', name: '云浮市' }
      ],
      areas: [
        { name: '珠三角核心区(一核)', label: 'deltaCenter', id: '1' },
        { name: '沿海经济带(一带)', label: 'economicBelt', id: '2' },
        { name: '北部生态保护区(一区)', label: 'natureArea', id: '3' },
        { name: '珠三角', label: 'riverDelta', id: '4' },
        { name: '粤东', label: 'eastZone', id: '5' },
        { name: '粤西', label: 'westZone', id: '6' },
        { name: '粤北', label: 'northwestZone', id: '7' }
      ],
      selectArea: [],
      limit: -1,
      isShowMenu: true,
      changeAreaName: '区域筛选',

      units: [
        { label: '平方公里', value: 'SQUARE_KILOMETER' },
        { label: '亩', value: 'MU' },
        { label: '万亩', value: 'MILLION_MU' },
        { label: '平方米', value: 'SQUARE_METER' },
        { label: '万平方米', value: 'WAN_SQUARE_METER' },
        { label: '公顷', value: 'HECTARE' }
      ],
      yearInput: ['2019'],
      rankList: [
        { label: '前3', value: 'q3' },
        { label: '前5', value: 'q5' },
        { label: '前10', value: 'q10' },
        { label: '前15', value: 'q15' },
        { label: '前20', value: 'q20' },
        { label: '所有', value: 'total' },
        { label: '后20', value: 'h20' },
        { label: '后15', value: 'h15' },
        { label: '后10', value: 'h10' },
        { label: '后5', value: 'h5' },
        { label: '后3', value: 'h3' }
      ],
      unitsVal: 'HECTARE',
      unitName: '单位：公顷',
      rankVal: 'total',
      limitB: -1,
      yearVal: '2019',
      selectYear: '2019',
      bottomCurrent: 4,
      bottomCurrentZeroActive: false,
      bottomCurrentFirstActive: false,
      bottomCurrentSecondActive: false,
      bottomCurrentThirdActive: false,
      bottomCurrentFourthActive: false,
      showCurrent: 0,
      isNoBottomButton: true,
      theme: '',

      projectTableHead: [],
      projectTableData: [],
      projectTableAddData: {},
      projectYearData: [],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      showXZhou: true,
      showDataNumber: false,
      morenYear: true,

      filterData: {
        topLeftParam: '3',
        selectArea: '',
        city: '',
        area: '',
        unitsVal: 'HECTARE',
        selectYear: '2019',
        sortType: ''
      },

      isButton: "",
      pageTitle: "",
    };
  },
  methods: {
    handleCheckAllChange(val) {
        this.isIndeterminate = false;
      this.getCheckedCities()
      // this.projectTableHead = this.tableHeadData
      if(val) {
        this.projectTableHead = this.tableHeadData
      } else {
        this.projectTableHead = [
        {
            column_name: 'quyu',
            column_comment: '行政区'
          }
          ]
      }
      this.checkedCities = val ? checkedCities : [];
    },
    getCheckedCities() {
      // this.isIndeterminate = false;
      if(this.rightItemMessageTitleData == '城镇开发边界内住宅用地占比') {
        this.checkedCities = [
            '行政区', '城市用地面积', '建制镇用地面积', '城镇用地面积', '城镇住宅用地（城市）', '城镇住宅用地（建制镇）', '城镇住宅用地', '比例'
          ]
      } else if (
        this.rightItemMessageTitleData == '人均住宅用地面积（平方米/人）'
      ) {
        this.checkedCities = [
          '行政区', '城镇住宅用地（城市）', '城镇住宅用地（建制镇）', '城镇住宅面积', '年末常住人口', '城镇化率', '年末常住城镇人口', '人均城镇住宅用地面积'
        ]
      } else if (
        this.rightItemMessageTitleData == '公园绿地占比'
      ) {
        this.checkedCities = [
          '行政区', '城市用地面积', '建制镇用地面积', '城镇用地面积', '公园与绿地（城市）', '公园与绿地（建制镇）', '公园与绿地', '比例'
        ]
      } else if (
        this.rightItemMessageTitleData == '人均公园绿地面积（平方米/人）'
      ) {
        this.checkedCities = [
          '行政区', '公园与绿地（城市）', '公园与绿地（建制镇）', '公园与绿地', '年末常住人口', '城镇化率', '年末常住城镇人口', '人均公园绿地面积'
        ]
      } else if (
        this.rightItemMessageTitleData == '公共服务用地面积占比'
      ) {
        this.checkedCities = [
          '行政区', '城镇用地面积', '机关团体新闻出版用地', '公用设施用地', '公共服务用地', '比例'
        ]
      } else if (
        this.rightItemMessageTitleData == '人均公共服务用地面积（平方米/人）'
      ) {
        this.checkedCities = [
          '行政区', '机关团体新闻出版用地', '公用设施用地', '公共服务用地', '年末常住人口', '城镇化率', '年末常住城镇人口', '人均公共服务用地面积'
        ]
      }
    },
     handleCheckedCitiesChange(value) {
       if(this.checkedCities.indexOf('行政区') == -1) {
          this.checkedCities.unshift('行政区')
          }
       this.projectTableHead = this.tableHeadData
        let checkedCount = value.length;
        let checkedVal = value
        
        var j=0
        var arry3 = []
        for(var i=0;i<this.projectTableHead.length;i++) {
          for(var k=0;k<checkedVal.length;k++) {
            if(checkedVal[k]==this.projectTableHead[i].column_comment) {
              arry3[j]=this.projectTableHead[i];
              j++
            }
          }
        }
              this.projectTableHead = arry3
        this.checkAll = checkedCount === this.checkedCities.length+1;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedCities.length+1;
        if(this.checkedCities.indexOf('行政区') == -1){
          if(checkedCount == 0) {
          this.checkAll = false
          this.isIndeterminate = false
        }
        } else if(this.checkedCities.indexOf('行政区') !== -1){
           if(checkedCount == 1) {
          this.checkAll = false
          this.isIndeterminate = false
        } else if(checkedCount == this.biggestNum+1) {
          this.checkAll = true
          this.isIndeterminate = false
        }
        }
        
    },
    // 区域选择
    handleChangeArea(val) {
      this.current = 10
      if(val == '000') {
        this.showXian = false
        // this.current = 2
      this.loading = true
      this.filterData.topLeftParam = '3'
      this.filterData.city = ''
      this.filterData.area = ''
      this.chartValue = '全部'
      this.xianValue = ''
      this.$emit('filterInfo', this.filterData)
      //  let projectChart = echarts.init(document.getElementById('projectChart'))
      // projectChart.dispose()
      // projectChart = echarts.init(this.$refs.projectChart, this.theme)
      // this.projectDrawLine()
      } else {
        this.showXian = true
      this.filterData.city = val
      this.filterData.area = ''
      this.xianValue = ''
      this.filterData.topLeftParam = '3'
      this.$emit('filterInfo', this.filterData)
      }
    },
    handleChangeXian(val) {
      this.current = 10
      if(val == 0) {
        this.filterData.area = ''
        // this.chartValue = ''
     this.filterData.topLeftParam = '4'
    this.$emit('filterInfo', this.filterData)
      } else {
      // this.xianValue = ''
      this.filterData.area = val
      this.filterData.topLeftParam = '4'
      this.$emit('filterInfo', this.filterData)
      }
    },
    // handleChangePlace() {
    //   this.chartValue = ''
    //    this.filterData.topLeftParam = '4'
    //   this.$emit('filterInfo', this.filterData)
    // },
    turnTopFirst() {
      this.current = 0
      this.loading = true
      this.filterData.area = ''
      this.filterData.topLeftParam = '1'
      this.$emit('filterInfo', this.filterData)
      //  let projectChart = echarts.init(document.getElementById('projectChart'))
      // projectChart.dispose()
      // projectChart = echarts.init(this.$refs.projectChart, this.theme)
      // this.projectDrawLine()
    },
    turnTopSecond() {
      this.filterData.area = ''
      this.current = 1
      this.loading = true
      this.filterData.topLeftParam = '2'
      this.$emit('filterInfo', this.filterData)
      //  let projectChart = echarts.init(document.getElementById('projectChart'))
      // projectChart.dispose()
      // projectChart = echarts.init(this.$refs.projectChart, this.theme)
      // this.projectDrawLine()
    },
    turnTopThird() {
      this.showXian = false
      this.current = 2
      this.loading = true
      this.filterData.topLeftParam = '3'
      this.filterData.city = ''
      this.filterData.area = ''
      this.chartValue = ''
      this.$emit('filterInfo', this.filterData)
      //  let projectChart = echarts.init(document.getElementById('projectChart'))
      // projectChart.dispose()
      // projectChart = echarts.init(this.$refs.projectChart, this.theme)
      // this.projectDrawLine()
    },
    // turnTopFourth() {
    //   this.current = 3
    //   this.filterData.topLeftParam = '4'
    //   this.$emit('filterInfo', this.filterData)
    //   this.$bus.$on('postData92', val => {
    //     this.projectDrawLine()
    //     this.xianQuList = []
    //     this.xianQuList = val
    //   })
    // },
    handleSelectArea(item) {
      switch (item.id) {
        case '1':
          this.selectArea = [
            '440100',
            '440300',
            '440400',
            '440600',
            '441300',
            '441900',
            '442000',
            '440700',
            '441200'
          ]
          this.changeAreaName = '一核'
          break
        case '2':
          this.selectArea = [
            '440100',
            '440300',
            '440400',
            '441300',
            '441900',
            '442000',
            '440700',
            '440500',
            '441500',
            '445200',
            '445100',
            '440800',
            '440900',
            '441700'
          ]
          this.changeAreaName = '一带'
          break
        case '3':
          this.selectArea = ['440200', '441400', '441800', '441600', '445300']
          this.changeAreaName = '一区'
          break
        case '4':
          this.selectArea = [
            '440100',
            '440300',
            '440400',
            '440600',
            '441300',
            '441900',
            '442000',
            '440700',
            '441200'
          ]
          this.changeAreaName = '珠三角'
          break
        case '5':
          this.selectArea = ['440500', '441500', '445200', '445100']
          this.changeAreaName = '粤东'
          break
        case '6':
          this.selectArea = ['440800', '440900', '441700', '445300']
          this.changeAreaName = '粤西'
          break
        case '7':
          this.selectArea = ['440200', '441400', '441800', '441600']
          this.changeAreaName = '粤北'
          break
      }
      this.filterData.selectArea = this.selectArea
      this.$emit('filterInfo', this.filterData)
    },
    changeArea(index) {
      if (index === this.limit) {
        this.limit = -1
      } else {
        this.limit = index
      }
    },
    handleVisible() {
      this.isShowMenu = true
    },
    sureArea() {
      this.isShowMenu = false
    },
    cancelArea() {
      this.isShowMenu = false
    },
    unitNameSelect() {
      if (this.unitsVal == 'SQUARE_KILOMETER') {
        this.unitName = '单位：平方公里'
      } else if (this.unitsVal == 'MU') {
        this.unitName = '单位：亩'
      } else if (this.unitsVal == 'MILLION_MU') {
        this.unitName = '单位：万亩'
      } else if (this.unitsVal == 'SQUARE_METER') {
        this.unitName = '单位：平方米'
      } else if (this.unitsVal == 'WAN_SQUARE_METER') {
        this.unitName = '单位：万平方米'
      } else if (this.unitsVal == 'HECTARE') {
        this.unitName = '单位：公顷'
      }
      this.filterData.unitsVal = this.unitsVal
      this.$emit('filterInfo', this.filterData)
    },
    yearNameSelect() {
      if(this.yearVal == '2019') {
        this.selectYear = '2019'
      } else if(this.yearVal == '2018') {
        this.selectYear = '2018'
      }
      this.filterData.selectYear = this.selectYear
      this.$emit('filterInfo', this.filterData)
    },
    // rankSelect() {
    //   this.filterData.rankVal = this.rankVal
    //   this.$emit('filterInfo', this.filterData)
    // },
    showBarChart() {
      this.chosenBar = true
      this.chosenTable = true
      this.showTableHead = false
      this.showCurrent = 0
      this.isNoBottomButton = true
      this.projectYearData = this.yearListData
    },
    showTable() {
      this.chosenTable = false
      this.chosenBar = false
      this.showTableHead = true
      this.showCurrent = 2
      this.isNoBottomButton = false
      let projectChart = echarts.init(document.getElementById('projectChart'))
      // projectChart.showLoading();
      projectChart.dispose()

      this.projectTableHead = this.tableHeadData
      this.projectTableData = this.tableDataList
      this.projectYearData = this.yearListData
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (this.rightItemMessageTitleData == "城镇开发边界内住宅用地占比") {
          
          if (index === 0) {
            sums[index] = "合计";
            return;
          } else if (index == 2) {
            sums[index] = this.projectTableAddData["2"];
          } else if (index == 3) {
            sums[index] = this.projectTableAddData["3"];
          } else if (index == 4) {
            sums[index] = this.projectTableAddData["4"];
          } else if (index == 5) {
            sums[index] = this.projectTableAddData["5"];
          } else if (index == 6) {
            sums[index] = this.projectTableAddData["6"];
          } else if (index == 7) {
            sums[index] = this.projectTableAddData["7"];
          } else if (index == 8) {
            sums[index] = this.projectTableAddData["8"];
          }
        } else if (this.rightItemMessageTitleData == "人均住宅用地面积（平方米/人）") {
          if (index === 0) {
            sums[index] = "合计";
            return;
          } else if (index == 2) {
            sums[index] = this.projectTableAddData["2"];
          } else if (index == 3) {
            sums[index] = this.projectTableAddData["3"];
          } else if (index == 4) {
            sums[index] = this.projectTableAddData["4"];
          } else if (index == 5) {
            sums[index] = this.projectTableAddData["5"];
          } else if (index == 6) {
            sums[index] = this.projectTableAddData["6"];
          } else if (index == 7) {
            sums[index] = this.projectTableAddData["7"];
          } else if (index == 8) {
            sums[index] = this.projectTableAddData["8"];
          }
        } else if (this.rightItemMessageTitleData == "公园绿地占比") {
          if (index === 0) {
            sums[index] = "合计";
            return;
          } else if (index == 2) {
            sums[index] = this.projectTableAddData["2"];
          } else if (index == 3) {
            sums[index] = this.projectTableAddData["3"];
          } else if (index == 4) {
            sums[index] = this.projectTableAddData["4"];
          } else if (index == 5) {
            sums[index] = this.projectTableAddData["5"];
          } else if (index == 6) {
            sums[index] = this.projectTableAddData["6"];
          } else if (index == 7) {
            sums[index] = this.projectTableAddData["7"];
          } else if (index == 8) {
            sums[index] = this.projectTableAddData["8"];
          }
        } else if (this.rightItemMessageTitleData == "人均公园绿地面积（平方米/人）") {
          if (index === 0) {
            sums[index] = "合计";
            return;
          } else if (index == 2) {
            sums[index] = this.projectTableAddData["2"];
          } else if (index == 3) {
            sums[index] = this.projectTableAddData["3"];
          } else if (index == 4) {
            sums[index] = this.projectTableAddData["4"];
          } else if (index == 5) {
            sums[index] = this.projectTableAddData["5"];
          } else if (index == 6) {
            sums[index] = this.projectTableAddData["6"];
          } else if (index == 7) {
            sums[index] = this.projectTableAddData["7"];
          } else if (index == 8) {
            sums[index] = this.projectTableAddData["8"];
          }
        } else if (this.rightItemMessageTitleData == "公共服务用地面积占比") {
          if (index === 0) {
            sums[index] = "合计";
            return;
          } else if (index == 2) {
            sums[index] = this.projectTableAddData["2"];
          } else if (index == 3) {
            sums[index] = this.projectTableAddData["3"];
          } else if (index == 4) {
            sums[index] = this.projectTableAddData["4"];
          } else if (index == 5) {
            sums[index] = this.projectTableAddData["5"];
          } else if (index == 6) {
            sums[index] = this.projectTableAddData["6"];
          }
        } else if (this.rightItemMessageTitleData == "人均公共服务用地面积（平方米/人）") {
          if (index === 0) {
            sums[index] = "合计";
            return;
          } else if (index == 2) {
            sums[index] = this.projectTableAddData["2"];
          } else if (index == 3) {
            sums[index] = this.projectTableAddData["3"];
          } else if (index == 4) {
            sums[index] = this.projectTableAddData["4"];
          } else if (index == 5) {
            sums[index] = this.projectTableAddData["5"];
          } else if (index == 6) {
            sums[index] = this.projectTableAddData["6"];
          } else if (index == 7) {
            sums[index] = this.projectTableAddData["7"];
          } else if (index == 8) {
            sums[index] = this.projectTableAddData["8"];
          }
        }
      });

      return sums;
    },
    handleSizeChange(val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
    },
    handleCurrentChange(val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
    },
    download() {
      if (
        this.rightItemMessageTitleData == "城镇开发边界内住宅用地占比"
      ) {
        window.open(
          `/api/epf-monitor-evaluation/manlandRel/boundaryRatioListAndSumExport?province=440000&city=${this.filterData.city}&area=${this.filterData.selectArea}&unit=${this.filterData.unitsVal}&year=${this.filterData.selectYear}&areaType=${this.filterData.topLeftParam}`
        );
      } else if (this.rightItemMessageTitleData == "人均住宅用地面积（平方米/人）") {
        window.open(
          `/api/epf-monitor-evaluation/manlandRel/residentialAreaPerCapitaListAndSumExport?province=440000&city=${this.filterData.city}&area=${this.filterData.selectArea}&unit=${this.filterData.unitsVal}&year=${this.filterData.selectYear}&areaType=${this.filterData.topLeftParam}`
        );
      } else if (this.rightItemMessageTitleData == "公园绿地占比") {
        window.open(
          `/api/epf-monitor-evaluation/manlandRel/proportionOfGreenListAndSumExport?province=440000&city=${this.filterData.city}&area=${this.filterData.selectArea}&unit=${this.filterData.unitsVal}&year=${this.filterData.selectYear}&areaType=${this.filterData.topLeftParam}`
        );
      } else if (this.rightItemMessageTitleData == "人均公园绿地面积（平方米/人）") {
        window.open(
          `/api/epf-monitor-evaluation/manlandRel/parkGreenAreaPerCapitaListAndSumExport?province=440000&city=${this.filterData.city}&area=${this.filterData.selectArea}&unit=${this.filterData.unitsVal}&year=${this.filterData.selectYear}&areaType=${this.filterData.topLeftParam}`
        );
      } else if (this.rightItemMessageTitleData == "公共服务用地面积占比") {
        window.open(
          `/api/epf-monitor-evaluation/manlandRel/publicServiceAreaRatioListAndSumExport?province=440000&city=${this.filterData.city}&area=${this.filterData.selectArea}&unit=${this.filterData.unitsVal}&year=${this.filterData.selectYear}&areaType=${this.filterData.topLeftParam}`
        );
      } else if (this.rightItemMessageTitleData == "人均公共服务用地面积（平方米/人）") {
        window.open(
          `/api/epf-monitor-evaluation/manlandRel/perCapitaPublicServiceAreaAndSumExport?province=440000&city=${this.filterData.city}&area=${this.filterData.selectArea}&unit=${this.filterData.unitsVal}&year=${this.filterData.selectYear}&areaType=${this.filterData.topLeftParam}`
        );
      }
    },
    // changColorTheme1() {
    //   this.theme = 'dark'
    // },
    // changColorTheme2() {
    //   this.theme = 'vintage'
    // },
    // changColorTheme3() {
    //   this.theme = 'macarons'
    // },
    getSelectYearData(index) {
      if (index == this.limitB) {
        this.limitB = -1
      } else {
        this.limitB = index
        if (index == this.projectYearData.length - 1) {
          this.selectYear = '2019'
        } else if (index == this.projectYearData.length - 2) {
          this.selectYear = '2018'
        } else if (index == this.projectYearData.length - 3) {
          this.selectYear = '2017'
        } else if (index == this.projectYearData.length - 4) {
          this.selectYear = '2016'
        } else if (index == this.projectYearData.length - 5) {
          this.selectYear = '2015'
        } else if (index == this.projectYearData.length - 6) {
          this.selectYear = '2014'
        } else if (index == this.projectYearData.length - 7) {
          this.selectYear = '2013'
        }
      }
      this.filterData.selectYear = this.selectYear
      this.$emit('filterInfo', this.filterData)

      this.morenYear = false
    },
    turnFirst() {
      // this.bottomCurrent = 0;
      this.bottomCurrentZeroActive = !this.bottomCurrentZeroActive
      this.showDataNumber = !this.showDataNumber
    },
    turnSecond() {
      this.bottomCurrent = 1
      this.bottomCurrentFirstActive = !this.bottomCurrentFirstActive
      this.filterData.rankStyle = '1'
      this.filterData['sortType'] = '2'
      this.$emit('filterInfo', this.filterData)
    },
    turnThird() {
      this.bottomCurrent = 2
      this.bottomCurrentSecondActive = !this.bottomCurrentSecondActive
      this.filterData.rankStyle = '2'
      this.filterData['sortType'] = '1'
      this.$emit('filterInfo', this.filterData)
    },
    // turnFourth() {
      // this.bottomCurrent = 3;
    //   this.bottomCurrentThirdActive = !this.bottomCurrentThirdActive
    //   this.showXZhou = !this.showXZhou
    // },
    turnFifth() {
      this.bottomCurrent = 4
      this.bottomCurrentFourthActive = !this.bottomCurrentFourthActive
      this.filterData.rankStyle = '4'
      this.$emit('filterInfo', this.filterData)
    },
    projectDrawLine() {
      setTimeout(() => {
        let projectChart = echarts.init(
          document.getElementById('projectChart')
        )
        document.getElementById('projectChart').style.width = 100 + '%'
        document.getElementById('projectChart').style.height = 100 + '%'
        projectChart.resize() // 直接加这句即可
      }, 0)
      // let projectChart = echarts.init(
      //   document.getElementById("projectChart")
      // );

      let projectChart = echarts.init(this.$refs.projectChart)

      let legendData = ['']
      let seriesAllData = []

      let colorData = ["#4295ef", "#7579eb", "#53bef6", "#24a6c2", "#545bb0"];
      let option = {}

      if (this.showCurrent === 0) {
        seriesAllData = [this.list]
        let series = []
        
        if (this.showDataNumber == false) {
          for (var i = 0; i < legendData.length; i++) {
            series.push({
              type: 'bar',
              barWidth: '30px',
              barGap: '60px',
              data: seriesAllData[i],
              markArea:this.markArea1, // 数据
              itemStyle: this.itemStyle1
            })
          }
        } else {
            for (var i = 0; i < legendData.length; i++) {
              series.push({
                name: legendData[i],
                type: 'bar',
                barWidth: '30px',
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#70b603'
                    }
                  }
                },
                data: seriesAllData[i],
                 // 数据
                itemStyle: this.itemStyle1
              })
            }
        }

        if (this.showXZhou == true) {
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
              right: '2%',
              top: '2%',
              data: legendData,
              itemWidth: 18,
              itemHeight: 18
            },
            grid: {
              show: true,
              left: '0',
              right: '0',
              bottom: '5%',
              top: '5%',
              containLabel: true,
              x: 100,
              y2: 200
            },
            xAxis: [
              {
                // name: '市',
                type: 'category',
                data: this.city,
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                },
                axisLabel: {
                  inter: 0,
                  rotate: 45,
                  textStyle: {
                    fontSize: '16'
                  }
                }
              }
            ],
            dataZoom: [
              {
                type: 'inside',
                show: false,
                xAxisIndex: [0],
                start: 0, // 默认为1
                end: 50
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
                axisLabel: {
                  show: true
                },
                axisLine: {
                  show: false // 不要x轴
                }
              }
            ],
            series: series
          }
        } else {
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
              right: '2%',
              top: '2%',
              data: legendData,
              itemWidth: 18,
              itemHeight: 18
            },
            grid: {
              left: '3%',
              right: '6%',
              bottom: '2%',
              top: '10%',
              containLabel: true
            },
            yAxis: [
              {
                // name: '市',
                type: 'category',
                data: this.city,
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                }
              }
            ],
            dataZoom: [
              {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                start: 0, // 默认为1
                end: 30
              }
            ],
            xAxis: [
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
        }
      } else if (this.showCurrent === 1) {
        let newData1 = []
        for (var i = 0; i < this.city.length; i++) {
          newData1.push({
            name: this.city[i],
            value: this.list[i]
          })
        }
        seriesAllData = [newData1]
        let series = []

        for (var i = 0; i < legendData.length; i++) {
          series.push({
            name: legendData[i],
            type: 'pie',
            radius: '70%',
            center: ['50%', '55%'],
            label: {
              show: true,
              formatter: '{b}: {d}%'
            },
            data: seriesAllData[i] // 数据
          })
        }

        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            right: '2%',
            top: '2%',
            data: legendData,
            itemWidth: 18,
            itemHeight: 18,
            selectedMode: 'single'
          },
          series: series
        };
      }

      projectChart.setOption(option, true)
    },
    // 图表自适应
    initEchart() {
      window.addEventListener('resize', () => {
        let projectChart = echarts.init(
          document.getElementById('projectChart')
        )
        document.getElementById('projectChart').style.width = 100 + '%'
        document.getElementById('projectChart').style.height = 100 + '%'
        projectChart.resize()
      })
    }
  },
  mounted() {
    // this.$nextTick(function () {
    //   setTimeout(() => {
    //     this.projectDrawLine()
    //   }, 1000)
    // })
    this.showBarChart()
     this.initEchart()

    Bus.$on('changeYearMessage', val => {
      this.morenYear = true
      this.selectYear = '2019'
    })

    this.$bus.$on('postData91', val => {
      // this.projectDrawLine()
      this.data1 = []
      this.data1 = val
    })

    this.$bus.$on('postData93', val => {
      // this.projectDrawLine()
      this.cityNameList = []
      this.cityNameList = val
    })
  },
  computed: {
    isActive: function () {
      return 'select-area-color'
    }
  },
  created() {
  
  },
  watch: {
    current(val) {
      if(val == 2) {
        this.yearInput = ['2019']
      } else {
        this.yearInput = ['2019', '2018']
      }
    },
    showCurrent(val) {
      if (val == 0) {
        setTimeout(() => {
          this.projectDrawLine()
        }, 1000)
      }
    },
    // theme(val) {
    //   let projectChart = echarts.init(document.getElementById('projectChart'))
    //   // projectChart.showLoading();
    //   projectChart.dispose()
    //   projectChart = echarts.init(this.$refs.projectChart, this.theme)
    //   this.projectDrawLine()
    // },
     list: {
       immediate: true,
       deep: true,
      handler(val){
        console.log(val)
        let projectChart = echarts.init(document.getElementById('projectChart'))
      projectChart.dispose()
      projectChart = echarts.init(this.$refs.projectChart)
      this.projectDrawLine()
      }
    },
    // showXZhou: {
    //   immediate: true,
    //   deep: true,
    //   handler(val) {
    //     setTimeout(() => {
    //       this.projectDrawLine()
    //     }, 1000)
    //   }
    // },
    showDataNumber: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log(val)
        setTimeout(() => {
          this.projectDrawLine()
        }, 1000)
      }
    },
    tableHeadData: {
      immediate: true,
      deep: true,
      handler(val) {
        this.projectTableHead = val
      }
    },
    tableDataList: {
      immediate: true,
      deep: true,
      handler(val) {
        this.projectTableData = val
        this.loading = false
      }
    },
    tableAddDataList: {
      immediate: true,
      deep: true,
      handler(val) {
        this.projectTableAddData = val;
      }
    },
    rightItemMessageTitleData: {
      immediate: true,
      deep: true,
      handler(val) {
       console.log(val)
        if(val == '城镇开发边界内住宅用地占比') {
          this.biggestNum = 7
          this.itemStyle1 = {
                  normal: {
                    color: function (params) {
                    var index_color = params.value;
                    if (index_color < 25) {
                      return "#f59a23";
                      this.legendData = ''
                    } else {
                      return "#70b603";
                      this.legendData = ''
                    }
                  }
                  }
                }
                 this.checkedCities = [
             '城市用地面积', '建制镇用地面积', '城镇用地面积', '城镇住宅用地（城市）', '城镇住宅用地（建制镇）', '城镇住宅用地', '比例'
          ]
          this.checkedCities1 = [
             '城市用地面积', '建制镇用地面积', '城镇用地面积', '城镇住宅用地（城市）', '城镇住宅用地（建制镇）', '城镇住宅用地', '比例'
          ]
                this.markArea1 =  {
                data: [
                  [{
                    yAxis: 25, // y轴坐标控制
                    itemStyle: {
                      color: 'rgba(244,250,255,1)',
                      type: 'dashed'
                    },
                    label: {
                      show: true,
                      position: ['1%', '50%'],
                      color: '#ccc',
                      fontSize: 16,
                      formatter: '标准区间',
                    }
                  }, {
                    yAxis: 40
                  }
                  ]
                ]
              }
        } else if (val == "人均住宅用地面积（平方米/人）") {
          this.biggestNum = 7
          this.itemStyle1 = {
                  normal: {
                    color: function (params) {
                    var index_color = params.value;
                    if (index_color < 25) {
                      return "#f59a23";
                      this.legendData = ''
                    } else {
                      return "#70b603";
                      this.legendData = ''
                    }
                  }
                  }
                }
                this.checkedCities = [
          '城镇住宅用地（城市）', '城镇住宅用地（建制镇）', '城镇住宅面积', '年末常住人口', '城镇化率', '年末常住城镇人口', '人均城镇住宅用地面积'
        ]
        this.checkedCities1 = [
         '城镇住宅用地（城市）', '城镇住宅用地（建制镇）', '城镇住宅面积', '年末常住人口', '城镇化率', '年末常住城镇人口', '人均城镇住宅用地面积'
        ]
                this.markArea1 =  {
                data: [
                  [{
                    yAxis: 25, // y轴坐标控制
                    itemStyle: {
                      color: 'rgba(244,250,255,1)',
                      type: 'dashed'
                    },
                    label: {
                      show: true,
                      position: ['1%', '50%'],
                      color: '#ccc',
                      fontSize: 16,
                      formatter: '标准区间',
                    }
                  }, {
                    yAxis: 38
                  }
                  ]
                ]
              }
        } else if(val == '公园绿地占比') {
          this.biggestNum = 7
           this.itemStyle1 = {
                  normal: {
                    color: function (params) {
                    var index_color = params.value;
                    if (index_color < 10) {
                      return "#f59a23";
                      this.legendData = ''
                    } else {
                      return "#70b603";
                      this.legendData = ''
                    }
                  }
                  }
                }
                this.checkedCities = [
          '城市用地面积', '建制镇用地面积', '城镇用地面积', '公园与绿地（城市）', '公园与绿地（建制镇）', '公园与绿地', '比例'
        ]
        this.checkedCities1 = [
          '城市用地面积', '建制镇用地面积', '城镇用地面积', '公园与绿地（城市）', '公园与绿地（建制镇）', '公园与绿地', '比例'
        ]
                this.markArea1 =  {
                data: [
                  [{
                    yAxis: 10, // y轴坐标控制
                    itemStyle: {
                      color: 'rgba(244,250,255,1)',
                      type: 'dashed'
                    },
                    label: {
                      show: true,
                      position: ['1%', '50%'],
                      color: '#ccc',
                      fontSize: 16,
                      formatter: '标准区间',
                    }
                  }, {
                    yAxis: 15
                  }
                  ]
                ]
              }
        }else if (val == '人均公园绿地面积（平方米/人）') {
          this.biggestNum = 7
          this.itemStyle1 = {
                  normal: {
                    color: function (params) {
                    var index_color = params.value;
                    if (index_color < 8) {
                      return "#f59a23";
                      this.legendData = ''
                    } else {
                      return "#70b603";
                      this.legendData = ''
                    }
                  }
                  }
                }
                this.checkedCities = [
          '公园与绿地（城市）', '公园与绿地（建制镇）', '公园与绿地', '年末常住人口', '城镇化率', '年末常住城镇人口', '人均公园绿地面积'
        ]
        this.checkedCities1 = [
          '公园与绿地（城市）', '公园与绿地（建制镇）', '公园与绿地', '年末常住人口', '城镇化率', '年末常住城镇人口', '人均公园绿地面积'
        ]
                this.markArea1 =  {
                data: [
                  [{
                    yAxis: '', // y轴坐标控制
                    itemStyle: {
                      color: 'rgba(244,250,255,1)',
                      type: 'dashed'
                    },
                    label: {
                      show: true,
                      position: ['1%', '50%'],
                      color: '#ccc',
                      fontSize: 16,
                      formatter: '',
                    }
                  }, {
                    yAxis: ''
                  }
                  ]
                ]
              }
        } else if(val == '公共服务用地面积占比') {
          this.biggestNum = 5
           this.itemStyle1 = {
                  normal: {
                    color: function (params) {
                    var index_color = params.value;
                    if (index_color > 0) {
                      return "#70b603";
                      this.legendData = ''
                    } else {
                      return "#70b603";
                      this.legendData = ''
                    }
                  }
                  }
                }
                this.checkedCities = [
          '城镇用地面积', '机关团体新闻出版用地', '公用设施用地', '公共服务用地', '比例'
        ]
        this.checkedCities1 = [
         '城镇用地面积', '机关团体新闻出版用地', '公用设施用地', '公共服务用地', '比例'
        ]
                this.markArea1 = ''
        } else if(val == '人均公共服务用地面积（平方米/人）') {
          this.biggestNum = 7
          this.itemStyle1 = {
                  normal: {
                   color: function (params) {
                    var index_color = params.value;
                    if (index_color < 5.5) {
                      return "#f59a23";
                      this.legendData = ''
                    } else {
                      return "#70b603";
                      this.legendData = ''
                    }
                  }
                  }
                }
                 this.checkedCities = [
          '机关团体新闻出版用地', '公用设施用地', '公共服务用地', '年末常住人口', '城镇化率', '年末常住城镇人口', '人均公共服务用地面积'
        ]
        this.checkedCities1 = [
         '机关团体新闻出版用地', '公用设施用地', '公共服务用地', '年末常住人口', '城镇化率', '年末常住城镇人口', '人均公共服务用地面积'
        ]
                this.markArea1 = ''
        }
        //  if(this.filterData.topLeftParam !=='3') {
          this.turnTopThird()
        // }
        //  let projectChart = echarts.init(document.getElementById('projectChart'))
      // projectChart.showLoading();
      // projectChart.dispose()
      // projectChart = echarts.init(this.$refs.projectChart, this.theme)
      // this.projectDrawLine()
        this.pageTitle = val;
      }
    },
    yearListData: {
      immediate: true,
      deep: true,
      handler(val) {
        this.projectYearData = val
      }
    },
    isShowData: {
      immediate: true,
      deep: true,
      handler(val) {
        setTimeout(() => {
          // this.projectDrawLine()
        }, 500)
      }
    },
    controlButton: {
      immediate: true,
      deep: true,
      handler(val) {
        this.isButton = val
      }
    },
    chartOptionsData: {
      immediate: true,
      deep: true,
      handler(val) {
        this.chartOptions = val
      }
    },
    chartXianData: {
      immediate: true,
      deep: true,
      handler(val) {
        this.chartOptions2 = val
      }
    }
  }
}
</script>
<style scoped>
#chart-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chart-select {
  position: relative;
  width: 100%;
  /* width: 1230px; */
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart-tab-icon {
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.chart-tab-icon img {
  width: 30px;
  height: 30px;
  margin-right: 20px;
  cursor: pointer;
}
.chart-tab-icon span {
  margin: 0 10px 0 20px;
  font-size: 16px;
}
.select-area-color {
  color: #1d7ce4;
}
.chart-show {
  width: 100%;
  flex: 1;
  margin: 5px 0 15px 0;
}
.chart-click {
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
}
.wrap-middle-bottom {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-middle-bottom-timeLine {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timeLine-box {
  width: 15%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}
.timeLine-shape {
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.active:nth-child(1)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.active:nth-child(2)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.active:nth-child(3)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.active:nth-child(4)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.active:nth-child(5)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.active:nth-child(6)
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.active:last-child
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.wrap-middle-bottom
  .wrap-middle-bottom-timeLine
  li.activeMoren:last-child
  .timeLine-shape
  div.timeLine-shape-circle {
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-radius: 14px;
  background-color: #007aff;
  cursor: pointer;
}
.timeLine-shape-circle {
  width: 10px;
  height: 10px;
  border: 1px solid #666;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
}
.timeLine-shape-line {
  width: 100%;
  height: 5px;
  background-color: #dbdbdb;
}
.timeLine-year {
  position: absolute;
  bottom: -15px;
  left: -11px;
  font-size: 14px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:nth-child(1) {
  margin-left: 20px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:last-child {
  width: 30px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:last-child .timeLine-shape {
  width: 30px;
}
.wrap-middle-bottom-timeLine li.timeLine-box:last-child .timeLine-shape-line {
  width: 0;
  height: 0;
}
.index-map-button-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.index-map-button {
  height: 36px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  /* background: #f7f9fa; */
  border: 1px solid #dcdfe6;
  color: #303030;
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
  font-size: 14px;
  border-radius: 2px;
  /* margin-right: 10px; */
}
.index-map-button-box .active {
  height: 36px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #409eff;
  color: #409eff;
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
  font-size: 14px;
  border-radius: 2px;
  /* margin-right: 10px; */
  /* box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25); */
}
.index-map-button-box .activeOnly {
  height: 36px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #409eff;
  color: #409eff;
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
  font-size: 14px;
  border-radius: 2px;
  /* margin-right: 10px; */
  /* box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25); */
}
.unitTip {
  font-weight: bolder;
  color: #303030;
  margin: 10px 0;
}
.chart-select-top__button {
  /* margin-left: -18%; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 1165px;
}
.area-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.area-menu-left {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.area-menu-left-text {
  width: 50px;
  padding: 5px 10px;
}
.area-menu-middle {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.area-menu-middle-text {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.area-menu-middle-text-top {
  padding: 5px 10px;
  cursor: pointer;
}
.area-menu-middle-text-bottom {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.area-menu-middle-text-bottom-text {
  cursor: pointer;
  padding: 2px 10px;
}
.lineStyle {
  border: 1px solid #50A5F4;
}
.noneLine {
  border: 1px solid rgba(242,242,242,1);
}
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
</style>
