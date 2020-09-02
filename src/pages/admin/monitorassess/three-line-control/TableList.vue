<template>
  <div class="delimit">
    <div class="table-contain">
      <!-- <el-row type="flex"
              justify="space-between"
              class="table-title">
        <div>{{data.name}}</div>
        <div @click="btnClick">返回</div>
      </el-row> -->
      <div class="left-top">
        <epf-title :title="data.name"></epf-title>
        <div class="left-top-button">
          <div class="left-top-button-tab"
               @click="btnClick">
            返回
          </div>

        </div>
      </div>

      <el-row type="flex"
              justify="middle"
              align="middle"
              style="padding:16px 16px;margin-top:10px">
        <div style="display:flex">
          <div class="img-parent"
               :class="{'active':!isTable}">
            <span :class="isTable?'bar1':'bar2'"
                  class="img-contain"
                  @click="isTable=false">
            </span>
          </div>
          <div class="img-parent"
               :class="{'active':isTable}">
            <span :class="!isTable?'table1':'table2'"
                  class="img-contain"
                  @click="isTable=true"></span>
          </div>
        </div>

        <el-button-group style="margin-left:15px">
          <el-button :type="iscurrent=='1'?'primary':''"
                     @click="turnTop('1')">区域格局</el-button>
          <el-button :type="iscurrent=='2'?'primary':''"
                     @click="turnTop('2')">片区</el-button>
          <el-button :type="iscurrent=='3'?'primary':''"
                     @click="turnTop('3')">地级以上市</el-button>

        </el-button-group>

        <el-select v-if="iscurrent==='3'"
                   v-model="cityZhcn"
                   placeholder="请选择(可搜索)"
                   style="margin-left:15px;width:170px;"
                   @change="handleChangeArea">
          <el-option v-for="item in cityArr"
                     :key="item.dictKey"
                     :label="item.zhCn"
                     :value="item.dictKey"></el-option>
        </el-select>

        <el-select v-if="areaVisible&&iscurrent==='3'"
                   v-model="dicKey.area"
                   placeholder="请选择(可搜索)"
                   style="margin-left:15px;width:170px;"
                   @change="handleChangeArea2">
          <el-option v-for="item in areaArr"
                     :key="item.dictKey"
                     :label="item.zhCn"
                     :value="item.dictKey"></el-option>
        </el-select>

        <el-select v-model="year"
                   placeholder="请选择排名"
                   style="margin-left:15px;width:100px;"
                   @change="rankSelect">
          <el-option v-for="item in rankList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
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
        <div style="color:rgba(80,165,244,1);margin-left:auto"
             @click="downLoad()">
          下载文档
        </div>
      </el-row>
      <el-row type="flex"
              justify="space-between"
              align="middle"
              style="padding:16px">
        <div>{{unitName}}:{{data.unit}}</div>
        <div v-if="!isTable">
          <el-button :type="block?'primary':''"
                     @click="blockMath()"
                     style="margin-right:16px">显示数据</el-button>
          <el-button-group>
            <el-button :type="sort=='1'?'primary':''"
                       @click="sortType('1')">正序</el-button>
            <el-button :type="sort=='2'?'primary':''"
                       @click="sortType('2')">倒序</el-button>
            <el-button :type="sort===''?'primary':''"
                       @click="sortType('')">行政区域排序</el-button>

          </el-button-group>
        </div>
      </el-row>

      <div ref="delimitChart"
           v-if="!isTable"
           id="delimitChart"
           style="width:100%;height:500px"></div>

      <div v-else>
        <el-table :data="tableData"
                  min-height="100"
                  max-height="450"
                  style="width: 100%;min-height:80px;margin-bottom:10px;"
                  border>
          <el-table-column label="序号"
                           min-width="100px"
                           align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column v-for="(item,index) in tableHead"
                           :label="item.column_comment"
                           align="center"
                           min-width="200"
                           :key="index">
            <template slot-scope="scope">
              <span>{{scope.row[item.column_name]}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:8px 0px;margin-top:15px;">
          <el-pagination background
                         layout="prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="totalRecord"
                         :page-size="pageSize"
                         :current-page="pageNo"></el-pagination>
        </div>
      </div>

    </div>

  </div>
</template>
<script>

import { mapActions, mapState, mapMutations } from 'vuex'

import echarts from 'echarts'

import 'echarts/theme/dark.js'
import 'echarts/theme/vintage.js'
import 'echarts/theme/macarons.js'
import map from './three-line-components/mapinit'
export default {
  mixins: [map],
  props: {

    tableHeadData: {
      type: Array
    },
    tableDataList: {
      type: Array
    },
    yearListData: {
      type: Array
    },
    paramsMore: {
      type: Object
    },
    unit: {
      type: String
    }
  },
  data () {
    return {
      cityZhcn: '',
      areaVisible: false,
      data: {},
      sort: '',
      index: '1',
      block: false,
      iscurrent: '3',
      isTable: false,
      areaValue: '',
      currentTable: '1',

      flag: false,
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      selectArea: [],
      limit: -1,
      isShowMenu: true,
      changeAreaName: '区域筛选',

      units: [
        { label: '平方公里', value: 'SQUARE_KILOMETER' },
        { label: '亩', value: 'MU' },
        { label: '万亩', value: 'MILLION_MU' },
        { label: '平方米', value: 'SQUARE_METER' },
        { label: '公顷', value: 'HECTARE' }
      ],
      rankList: [
        { label: '2014', value: '2014' },
        { label: '2015', value: '2015' },
        { label: '2016', value: '2016' },
        { label: '2017', value: '2017' },
        { label: '2018', value: '2018' },
        { label: '2019', value: '2019' },
        { label: '2020', value: '2020' }

      ],
      rankval: '2019',
      unitsVal: 'HECTARE',
      unitName: '单位',

      limitB: -1,
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

      tableHead: [],
      tableData: [],

      // 页码
      currentPage: 1,

      showXZhou: true,
      showDataNumber: false,
      morenYear: true,
      cityArr: [],
      areaArr: [],
      areaType: '3',
      filterData: {},
      // filterData: {
      //   areaType: "3",
      //   unit: "",
      //   isCharts: true
      // },
      itemButton: '3',
      chartCurrentType: 'bar',
      dicKey: {
        province: '',
        city: '',
        area: ''
      }

    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    ...mapMutations('jcpgyj', ['SET_year', 'SET_area']),
    chartOption (data) {
      return {

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

          bottom: '2%',
          data: data[0],
          selected: data[3]

        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '10%',
          top: '10%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: 'category',
            data: data[1],
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
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            start: 0, // 默认为1
            end: 100
            // filterMode: 'filter'
            // end: 45
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
        series: data[2]
      }
    },
    blockMath () {
      this.block = !this.block
      this.echartInit()
    },
    basicFarmland (sort) {
      this.tableHead = [
        { column_comment: '区域', column_name: 'cityName' },
        { column_comment: '基本农田图斑面积', column_name: 'plotArea' },
        { column_comment: '面积排行', column_name: 'plotAreaRank' },
        { column_comment: '符合基本农田地类面积', column_name: 'accordArea' },
        { column_comment: '符合排行', column_name: 'accordAreaRank' },
        {
          column_comment: '疑似符合基本农田地类面积',
          column_name: 'suspectAccordArea'
        },
        {
          column_comment: '疑似符合排行',
          column_name: 'suspectAccordAreaRank'
        },
        {
          column_comment: '疑似不符合基本农田地类面积',
          column_name: 'suspectUnaccordArea'
        },
        {
          column_comment: '疑似不符合排行',
          column_name: 'suspectUnaccordAreaRank'
        },
        { column_comment: '不符合基本农田面积', column_name: 'unaccordArea' },
        { column_comment: '不符合排行', column_name: 'unaccordAreaRank' }
      ]

      let params = {}
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      params['year'] = this.year
      params['isCharts'] = !this.isTable
      params['areaType'] = this.areaType
      params['unit'] = this.unitsVal
      params['sortType'] = this.sort
      params['sortParam'] = sort || ''
      params = Object.assign(params, this.dicKey)
      this.filterData = params
      this.$get(
        '/epf-monitor-evaluation/threeLine/basicFarmland/queryByThreeLine',
        params
      ).then(res => {
        if (res.code === 0) {
          let data = res.pager.results
          if (!this.isTable) {
            let accordArea = [] // 符合基本农田地类面积
            let suspectAccordArea = [] // 疑似复合基本农田面积
            let suspectUnaccordArea = [] // 疑似不复合基本农田面积
            let unaccordArea = [] // 不复合基本农田面积

            let city = []
            let series = []
            let selected = {}

            let legendData = [
              '符合基本农田落实地类情况',
              '疑似符合基本农田落实地类情况',
              '疑似不符合基本农田落实地类情况',
              '不符合基本农田落实地类情况'
            ]

            if (this.selected.length === 1) {
              for (var i = 0; i < legendData.length; i++) {
                let temp = legendData[i]
                if (temp === this.selected[0]) {
                  selected[temp] = true
                } else {
                  selected[temp] = false
                }
              }
            } else {
              selected = {
                '符合基本农田落实地类情况': true,
                '疑似符合基本农田落实地类情况': true,
                '疑似不符合基本农田落实地类情况': true,
                '不符合基本农田落实地类情况': true
              }
            }
            let colorData = [
              '#4295ef',
              '#7579eb',
              '#53bef6',
              '#24a6c2',
              '#545bb0'
            ]
            let seriesAllData = []

            data.forEach(item => {
              let tempArea = {}
              if (item.dictTranslate.areaName) {
                item.cityName = item.dictTranslate.areaName
                tempArea.cityName = item.dictTranslate.areaName
                tempArea.cityKey = item.area
              } else if (item.dictTranslate.cityName) {
                item.cityName = item.dictTranslate.cityName
                tempArea.cityName = item.dictTranslate.cityName
                tempArea.cityKey = item.city
              } else {
                item.cityName = item.dictTranslate.provinceName
                tempArea.cityName = item.dictTranslate.provinceName
                tempArea.cityKey = item.province
              }

              city.push(item.cityName)
              accordArea.push(item.accordArea)
              suspectAccordArea.push(item.suspectAccordArea)
              suspectUnaccordArea.push(item.suspectUnaccordArea)
              unaccordArea.push(item.unaccordArea)
            })

            seriesAllData = [
              accordArea,
              suspectAccordArea,
              suspectUnaccordArea,
              unaccordArea
            ]
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
                    color: colorData[i],
                    label: {
                      show: this.block,
                      position: 'top',
                      textStyle: {
                        color: colorData[i]
                      }
                    }
                  }
                },
                label: {
                  show: false,
                  position: 'top'
                }
              })
            }
            console.log(selected)
            let option = this.chartOption([legendData, city, series, selected])
            this.loadMap('delimitChart', option)
          } else {
            data.forEach((item, index) => {
              if (item.dictTranslate.areaName) {
                item.cityName = item.dictTranslate.areaName
              } else if (item.dictTranslate.cityName) {
                item.cityName = item.dictTranslate.cityName
              } else {
                item.cityName = item.dictTranslate.provinceName
              }
            })
            this.tableData = data

            this.pageNo = res.pager.pageNo
            this.pageSize = res.pager.pageSize
            this.totalPage = res.pager.totalPage
            this.totalRecord
              = res.pager.totalRecord

            this.loading = false
          }
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    redLine (sort) {
      let params = {}
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      params['year'] = this.year
      params['isCharts'] = !this.isTable
      params['areaType'] = this.areaType
      params['unit'] = this.unitsVal
      params['sortType'] = this.sort
      params['sortParam'] = sort || ''
      params = Object.assign(params, this.dicKey)
      this.filterData = params
      this.$get(
        '/epf-monitor-evaluation/threeLine/redLine/queryByThreeLine',
        params
      ).then(res => {
        if (res.code === 0) {
          let data = res.pager.results
          if (!this.isTable) {
            let redLineArea = [] // 生态保护红线面积

            let city = []
            let series = []

            let chartData = {}

            let legendData = ['生态保护红线面积']
            let colorData = [
              '#4295ef',
              '#7579eb',
              '#53bef6',
              '#24a6c2',
              '#545bb0'
            ]
            let seriesAllData = []

            data.forEach(item => {
              let tempArea = {}
              if (item.dictTranslate.areaName) {
                item.cityName = item.dictTranslate.areaName
                tempArea.cityName = item.dictTranslate.areaName
                tempArea.cityKey = item.area
              } else if (item.dictTranslate.cityName) {
                item.cityName = item.dictTranslate.cityName
                tempArea.cityName = item.dictTranslate.cityName
                tempArea.cityKey = item.city
              } else {
                item.cityName = item.dictTranslate.provinceName
                tempArea.cityName = item.dictTranslate.provinceName
                tempArea.cityKey = item.province
              }

              city.push(item.cityName)
              redLineArea.push(item.redLineArea)
            })

            seriesAllData = [redLineArea]
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
                    color: colorData[i],
                    label: {
                      show: this.block,
                      position: 'top',
                      textStyle: {
                        color: colorData[i]
                      }
                    }
                  }
                },
                label: {
                  show: false,
                  position: 'top'
                }
              })
            }

            chartData = {
              legendData: legendData,
              city: city,
              series: series
            }

            let option = this.chartOption([legendData, city, series])
            this.loadMap('delimitChart', option)
          } else {
            data.forEach((item, index) => {
              if (item.dictTranslate.areaName) {
                item.cityName = item.dictTranslate.areaName
              } else if (item.dictTranslate.cityName) {
                item.cityName = item.dictTranslate.cityName
              } else {
                item.cityName = item.dictTranslate.provinceName
              }
            })
            this.detailRouterData[this.routerIndex].tableData = data
            this.paramsData[this.routerIndex].pageNo = res.pager.pageNo
            this.paramsData[this.routerIndex].pageSize = res.pager.pageSize
            this.paramsData[this.routerIndex].totalPage = res.pager.totalPage
            this.paramsData[this.routerIndex].totalRecord
              = res.pager.totalRecord
          }
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    townBorder (sort) {
      this.tableHead = [
        { column_comment: '区域', column_name: 'cityName' },
        { column_comment: '城镇开发边界面积', column_name: 'townBorderArea' },
        { column_comment: '面积排行', column_name: 'townBorderAreaRank' }
      ]

      let params = {}
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      params['year'] = this.year
      params['isCharts'] = !this.isTable
      params['areaType'] = this.areaType
      params['unit'] = this.unitsVal
      params['sortType'] = this.sort
      params['sortParam'] = sort || ''
      params = Object.assign(params, this.dicKey)
      this.filterData = params
      this.$get(
        '/epf-monitor-evaluation/threeLine/townBorder/queryByThreeLine',
        params
      ).then(res => {
        if (res.code === 0) {
          let data = res.pager.results

          if (params.isCharts) {
            let townBorderArea = [] // 生态保护红线面积

            let city = []
            let series = []

            let chartData = {}

            let legendData = ['城镇开发边界面积']
            let colorData = [
              '#4295ef',
              '#7579eb',
              '#53bef6',
              '#24a6c2',
              '#545bb0'
            ]
            let seriesAllData = []

            data.forEach(item => {
              let tempArea = {}
              if (item.dictTranslate.areaName) {
                item.cityName = item.dictTranslate.areaName
                tempArea.cityName = item.dictTranslate.areaName
                tempArea.cityKey = item.area
              } else if (item.dictTranslate.cityName) {
                item.cityName = item.dictTranslate.cityName
                tempArea.cityName = item.dictTranslate.cityName
                tempArea.cityKey = item.city
              } else {
                item.cityName = item.dictTranslate.provinceName
                tempArea.cityName = item.dictTranslate.provinceName
                tempArea.cityKey = item.province
              }

              city.push(item.cityName)
              townBorderArea.push(item.townBorderArea)
            })

            seriesAllData = [townBorderArea]
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
                    color: colorData[i],
                    label: {
                      show: this.block,
                      position: 'top',
                      textStyle: {
                        color: colorData[i]
                      }
                    }
                  }
                }
              })
            }

            chartData = {
              legendData: legendData,
              city: city,
              series: series
            }
            let option = this.chartOption([legendData, city, series])
            this.loadMap('delimitChart', option)
            this.loading = false
          } else {
            data.forEach((item, index) => {
              if (item.dictTranslate.areaName) {
                item.cityName = item.dictTranslate.areaName
              } else if (item.dictTranslate.cityName) {
                item.cityName = item.dictTranslate.cityName
              } else {
                item.cityName = item.dictTranslate.provinceName
              }
            })
            this.tableData = data
            this.pageNo = res.pager.pageNo
            this.pageSize = res.pager.pageSize
            this.totalPage = res.pager.totalPage
            this.totalRecord
              = res.pager.totalRecord
          }
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    echartInit (value) {
      switch (this.index) {
        case '0':
          this.basicFarmland(value)
          break

        case '1':
          this.redLine(value)
          break
        case '2':
          this.townBorder(value)
          break
      }
    },
    btnClick () {
      let routerPath = '/ThreeLine'
      let title = '三线管控'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: '/ThreeLine'
      })
    },
    rankSelect (data) {
      this.SET_year(data)
      this.echartInit()
    },
    turnTop (key) {
      this.iscurrent = key
      this.areaType = key
      this.selected = []
      this.sortParam = ''
      this.dicKey = {
        province: '',
        city: '',
        area: ''
      }
      this.echartInit()
    },

    changeArea (index) {
      if (index === this.limit) {
        this.limit = -1
      } else {
        this.limit = index
      }
    },
    handleVisible () {
      this.isShowMenu = true
    },
    sureArea () {
      this.isShowMenu = false
    },
    cancelArea () {
      this.isShowMenu = false
    },
    unitNameSelect () {
      if (this.unitsVal == 'SQUARE_KILOMETER') {
        this.unit = '平方公里'
      } else if (this.unitsVal == 'MU') {
        this.unit = '亩'
      } else if (this.unitsVal == 'MILLION_MU') {
        this.unit = '万亩'
      } else if (this.unitsVal == 'SQUARE_METER') {
        this.unit = '平方米'
      } else if (this.unitsVal == 'WAN_SQUARE_METER') {
        this.unit = '万平方米'
      } else if (this.unitsVal == 'HECTARE') {
        this.unit = '公顷'
      }
      this.echartInit()
    },
    handleChangeArea (value) {
      this.areaVisible = true
      this.dicKey.province = '440000'
      this.dicKey.city = value
      this.areaType = '3'

      // this.iscurrent = ''
      this.echartInit()
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${value}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length !== 0) {
          this.areaArr = res.dictionariesList
          this.areaArr.unshift({
            zhCn: '全部',
            dicKey: ''
          })
          return
        }
      })
    },
    handleChangeArea2 (value) {
      this.dicKey.area = value
      this.areaType = '4'
      this.echartInit()
    },
    destory () {
      let projectChart = echarts.init(document.getElementById('detailChart'))
      projectChart.dispose()
    },

    downLoad () {
      let href = ''

      switch (this.index) {
        case '0':
          href
            = '/api/epf-monitor-evaluation/threeLine/basicFarmland/exportData?'
          break

        case '1':
          href = '/api/epf-monitor-evaluation/threeLine/redLine/exportData?'
          break
        case '2':
          href = '/api/epf-monitor-evaluation/threeLine/townBorder/exportData?'
          break
      }

      let hrefParams = this.urlEncode(this.filterData).slice(1)
      href = href + hrefParams

      window.open(href)
    },

    urlEncode (param, key, encode) {
      if (param == null) return ''
      var paramStr = ''
      var t = typeof param
      if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr
          += '&'
          + key
          + '='
          + (encode == null || encode ? encodeURIComponent(param) : param)
      } else {
        for (var i in param) {
          var k
            = key == null
              ? i
              : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
          paramStr += this.urlEncode(param[i], k, encode)
        }
      }
      return paramStr
    },
    sortType (key) {
      if (key === '') {
        this.sort = key
        this.echartInit()
        return
      }
      if (this.index === '1') {
        this.sortParam = 'redLineArea'
      }
      if (this.index === '2') {
        this.sortParam = 'townBorderArea'
      }
      if (!this.sortParam) {
        this.$message('请选择其中一项进行排序')
        return
      }
      this.sort = key

      this.echartInit(this.sortParam)

      // if (key === '') {
      //   this.sortParam = ''
      //   this.echartInit()
      // } else {
      //   if (this.index === '1') {
      //     this.sortParam = 'redLineArea'
      //     this.echartInit(this.sortParam)
      //   } else if (this.index === '2') {
      //     this.sortParam = 'townBorderArea'
      //     this.echartInit(this.sortParam)
      //   } else if (this.index === '0') {
      //     this.echartInit(this.sortParam)
      //   } else {
      //     if (!this.sortParam) {
      //       this.$message('请选择其中一项进行排序')
      //       return
      //     }
      //     this.echartInit()
      //   }
      // }
    },
    turnFirst () {
      this.showDataNumber = !this.showDataNumber
      this.bottomCurrentZeroActive = !this.bottomCurrentZeroActive
    },

    // sort (key) {
    //   this.$emit('sortType', key, this.sortParam)
    // },
    turnSecond () {
      // this.bottomCurrent = 1;
      // this.bottomCurrentFirstActive = !this.bottomCurrentFirstActive;
    },
    turnThird () {
      // this.bottomCurrent = 2;
    },
    turnFourth () {
      // this.bottomCurrent = 3;
      // this.bottomCurrentThirdActive = !this.bottomCurrentThirdActive;
      // this.showXZhou = !this.showXZhou;
    },
    turnFifth () {
      // this.bottomCurrent = 4;
      // this.bottomCurrentFourthActive = !this.bottomCurrentFourthActive;
      // this.filterData.rankStyle = "4";
      // this.$emit("filterInfo", this.filterData);
    }
  },
  mounted () {
    this.echartInit()
  },
  created () {
    this.index = this.$route.query.index
    this.data = this.$route.query
    this.$get(
      '/epf-admin/regionals/getAreaByCodeOrParentId?parentId=440000',
      {}
    ).then(res => {
      if (res.dictionariesList.length !== 0) {
        this.cityArr = res.dictionariesList
        this.cityArr.unshift({
          zhCn: '全部',
          dicKey: ''
        })
        return
      }
    })
  },
  computed: {
    ...mapState('jcpgyj', ['year', 'area', 'locationCity']),
    isActive: function () {
      return 'select-area-color'
    }
  },
  watch: {
    isTable (val) {
      this.echartInit()
    }
  }

}
</script>
<style scoped>
.delimit {
  width: 100%;

  padding: 15px;
}
.img-contain {
  width: 32px;
  height: 32px;
  display: inline-block;
}
.bar1 {
  background-image: url("../../../../assets/images/jcpgyj/bar1.png");
  background-size: 32px 32px;
}
.bar2 {
  background-image: url("../../../../assets/images/jcpgyj/bar2.png");
  background-size: 32px 32px;
}
.table1 {
  background-image: url("../../../../assets/images/jcpgyj/table1.png");
  background-size: 32px 32px;
}
.table2 {
  background-image: url("../../../../assets/images/jcpgyj/table2.png");
  background-size: 32px 32px;
}
.table-contain {
  box-shadow: 1px 2px 5px 2px rgba(236, 236, 236, 0.5);
  height: 100%;
}
.table-title {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(165, 165, 165, 1);
  padding: 0 16px;
  font-size: 18px;
  color: rgba(32, 32, 32, 1);
}

.left-top {
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 15px;
}
.left-top-button {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left-top-button-tab {
  color: #303030;
  cursor: pointer;
}
.left-top-button .active {
  color: #1d7ce4;
}
.left-top-button span {
  margin: 5px;
}
.left-top-button-cascader {
  position: relative;
}
.left-bottom {
  width: 100%;
  height: calc(100% - 50px);
  /* background-color: #fff; */
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.img-parent {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}
.img-parent.active {
  border: 1px solid #1b74ee;
}
</style>
<style >
.delimit .el-button {
  border: 1px solid #d9d9d9;
  color: #595959;
  font-weight: 500;
  font-size: 16px;
  padding: 11px;
}
.delimit .el-button:focus,
.delimit .el-button:hover {
  color: #1b74ee;
  border-color: #1b74ee;
  background-color: #fff;
}
.delimit .el-button--primary {
  background-color: #fff;
  color: #1b74ee;
  border-color: #1b74ee !important;
  z-index: 99;
}
</style>
