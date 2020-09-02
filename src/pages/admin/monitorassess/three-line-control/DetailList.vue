<template>
  <div>
    <div>
      <el-row justify="space-between"
              type="flex"
              class="left__title">
        <span>{{data.name}}-{{locationCity}}</span>

        <span>

          <el-select size="mini"
                     v-model="year"
                     filterable
                     @change="handleChangeYear"
                     style="width:90px;">
            <el-option v-for="item in yearList"
                       :key="item"
                       :label="item"
                       :value="item"></el-option>
          </el-select>
          <!-- <el-dropdown @command="handleCommand"
                       trigger="click"
                       style="margin-left:15px;">
            <span class="el-dropdown-link">
              {{year}}年
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="2020">2020年</el-dropdown-item>
              <el-dropdown-item command="2019">2019年</el-dropdown-item>
              <el-dropdown-item command="2018">2018年</el-dropdown-item>
              <el-dropdown-item command="2017">2017年</el-dropdown-item>
              <el-dropdown-item command="2016">2016年</el-dropdown-item>
              <el-dropdown-item command="2015">2015年</el-dropdown-item>
              <el-dropdown-item command="2014">2014年</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </span>
      </el-row>
      <el-row justify="space-between"
              v-for="(item,index) in totalList "
              :key="index"
              type="flex"
              @click.native="toDetail(item)"
              class="list-row"
              :class="{'active':item.state===3,'clickLi':item===currentLi}">
        <div class="row__title"
             :class="{'one':item.state===1,'two':item.state===2}">
          <span>{{item.name}} （{{year}}）</span>
        </div>

        <div>
          <span :class="{'num':index===0}">{{item.indexValueDouble}}</span>
          <span style="font-size:14px"
                :class="{'unit':index===0}">{{item.unit}}</span>
        </div>
      </el-row>
    </div>
    <div v-if="!bigProject">
      <epf-title title="总体变化趋势"
                 style="margin:10px 0;"></epf-title>
      <div class="zong-unit-mes">单位：{{data.unit}}</div>
      <div class="qushi-chart__diff">
        <div id="change"
             ref="change"
             style="height:100%;width:100%;"></div>
      </div>
      <epf-title title="市县变化情况"
                 style="margin:10px 0;"></epf-title>
      <div class="chart-tab-content-box__diff">
        <div class="chart-tab-content-return__diff">
          <div class="zong-unit-mes">单位：</div>
          <div class="chart-tab-content-return-icon">
            <div style="cursor:pointer;margin-right:18px;display:flex;align-items: center;"
                 @click="handleClickSort('1')"
                 :class="{'sort-color':this.sortTypeParams === '1'}">
              <span>正序</span>
              <i class="zheng-icon"></i>
            </div>
            <div style="cursor:pointer;display:flex;align-items: center;"
                 @click="handleClickSort('2')"
                 :class="{'sort-color':this.sortTypeParams === '2'}">
              <span>倒序</span>
              <i class="dao-icon"></i>
            </div>
          </div>
        </div>
        <div class="chart-tab-content-main__diff">
          <div id="firstChart"
               ref="firstChart"
               style="width:100%;height:100%;"></div>
        </div>
      </div>
    </div>
    <important v-if="bigProject"></important>
    <redTable v-if="redTableDialog"
              :title="redTableTitle"
              @close="myClose"></redTable>

  </div>

</template>

<script>

import map from './three-line-components/mapinit'
import Important from './Important'
import RedTable from './RedTable'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [map],
  data () {
    return {
      yearList: [2020, 2019, 2018, 2017, 2016, 2015, 2014],
      currentLi: '',
      noYear: '',
      index: '0',
      bigProject: false,
      redTableDialog: false,
      redTableTitle: '',
      title: '',
      titleEnglish: '',
      data: {},
      totalList: [],
      params: {},
      activeYear: 2019,
      dicKey: {
        cantonProvince: '440000',
        cantonCity: '',
        cantonArea: ''
      },
      zongUnit: '万亩',
      sortTypeParams: '1',
      changeIndexUnit: ''
    }
  },
  created () {
    this.index = this.$route.query.index
    this.data = this.$route.query

    switch (this.index) {
      case '0':

        this.titleEnglish = 'PERMANENT_BASIC_FARMLAND'
        this.totalList = [
          {
            name: '监测现状',
            indexValueDouble: this.data.indexValueDouble,
            unit: this.data.unit,
            state: 1
          }, {
            name: '重大项目占用',
            indexValueDouble: 248.28,
            unit: '万亩',
            state: 3
          },
          {
            name: '疑似不符合图斑',
            indexValueDouble: 370.99,
            unit: '万亩',
            state: 3
          },
          {
            name: '遥感影像变化图斑',
            indexValueDouble: '-',
            unit: '万亩',
            state: 3
          }]
        break

      case '1':

        this.titleEnglish = 'ECOLOGICAL_PROTECTION_RED_LINE'
        this.totalList = [
          {
            name: '监测现状',
            indexValueDouble: this.data.indexValueDouble,
            unit: this.data.unit,
            state: 1
          },
          {
            name: '规划目标',
            indexValueDouble: this.data.planValueDouble,
            unit: this.data.unit,
            state: 2
          },
          {
            name: '红线内现状建设面积',
            indexValueDouble: '-',
            unit: '万亩',
            state: 3
          }, {
            name: '红线内新增建设面积',
            indexValueDouble: '-',
            unit: '万亩',
            state: 3
          }
        ]
        break
      case '2':

        this.titleEnglish = 'TOWN_DEVELOPMENT_BORDER'
        this.totalList = [
          {
            name: '监测现状',
            indexValueDouble: this.data.indexValueDouble,
            unit: this.data.unit,
            state: 1

          },
          {
            name: '规划目标',
            indexValueDouble: this.data.planValueDouble,
            unit: this.data.unit,
            state: 2
          },
          {
            name: '开发边界内现状城镇用地',
            indexValueDouble: '-',
            unit: '万亩',
            state: 3
          }, {
            name: '开发边界外新增城镇用地',
            indexValueDouble: '-',
            unit: '万亩',
            state: 3
          }
        ]
        break
      default:
        this.title = '永久基本农田保护红线'
        this.titleEnglish = 'PERMANENT_BASIC_FARMLAND'
        break
    }
  },

  mounted () {
    this.overallTrend()
    this.firstDrawLine()
  },
  methods: {
    option (data) {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }

        },

        grid: {
          top: '2%',
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        yAxis: [
          {
            type: 'category',
            data: data[0],
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              // rotate: 45, //文字逆时针旋转45°
              textStyle: {
                color: '#303030', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }

            }
          }
        ],
        xAxis: [
          {
            type: 'value',

            position: 'top', // x轴固定在顶部
            axisLabel: {
              show: true,
              interval: 'auto',
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                color: 'rgba(48,48,48,1);', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
            },

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
        series: [
          {
            name: '监测值',
            type: 'bar',
            barWidth: null, // 默认自适应
            barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
            barMaxWidth: 40, // 柱形的宽度
            barMaxnWidth: 1, // 柱形的宽度
            barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
            data: data[1],
            itemStyle: {
              normal: {
                color: '#50a5f6'

              }
            }
          }

        ]
      }
    },
    ...mapMutations('jcpgyj', ['SET_year', 'SET_area']),
    handleChangeYear (command) {
      this.SET_year(command)
    },
    myClose () {
      this.redTableDialog = false
    },
    overallTrend () {
      let params = this.params
      params['threeLineEnum'] = this.titleEnglish
      params['year'] = this.year
      params = Object.assign(params, this.area)
      this.$get('/epf-monitor-evaluation/threeLine/overallTrend', params).then(
        res => {
          if (res.code === 0) {
            let result = res.result
            let x = []
            let indexValueDouble = []
            result.forEach(element => {
              element.indexValueDouble = this.$math(element.indexValueDouble)
              element.grow = this.$math(element.grow)
              element.growRate = this.$math(element.growRate)
              element.growRate = this.$math(element.growRate)
              x.push(element.year)
              indexValueDouble.push(element.indexValueDouble)
            })
            let option = this.option([x, indexValueDouble])
            this.loadMap('change', option)
            this.initEchart('change')
          } else {
            this.loading = false
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    async firstDrawLine () {
      let params = this.params
      params['sortType'] = this.sortTypeParams
      params['threeLineEnum'] = this.titleEnglish
      params['year'] = this.year
      params = Object.assign(params, this.area)
      let res = await this.$get(
        '/epf-monitor-evaluation/threeLine/overallTrendArea',
        params
      )
      let chartData = res.result
      let cityNameList = []
      let data1 = []
      let data2 = []
      let data3 = []
      for (var key in chartData) {
        chartData[key].indexValueDouble = Number(
          chartData[key].indexValueDouble
        ).toFixed(2)
        chartData[key].planValueDouble = Number(
          chartData[key].planValueDouble
        ).toFixed(2)
        chartData[key].difference = Number(chartData[key].difference).toFixed(
          2
        )
        if (chartData[key].cantonArea == null) {
          cityNameList.push(chartData[key].cantonCityName)
        } else {
          cityNameList.push(chartData[key].cantonAreaName)
        }
        data1.push(chartData[key].indexValueDouble)
        data2.push(chartData[key].planValueDouble)
        data3.push(chartData[key].difference)
      }
      let planYear = chartData[0].planYear
      let legendData = []
      if (planYear == null) {
        legendData = ['监测值', '规划目标', '差值']
      } else {
        legendData = ['监测值', `规划目标（${planYear}）`, '差值']
      }
      let selectedLegend = {}

      for (var key in legendData) {
        selectedLegend[legendData[0]] = true
        selectedLegend[legendData[1]] = false
        selectedLegend[legendData[2]] = false
      }

      let seriesAllData = []

      let colorData = ['#7cb5b4', '#50a5f6', '#f86a72']

      seriesAllData = [data1, data2, data3]
      let series = []
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

      let option = {
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
          //   right: "2%",
          //   top: "2%",
          data: legendData,
          itemWidth: 24,
          itemHeight: 16,
          selected: selectedLegend,
          textStyle: {
            // 图例文字的样式
            color: '#404040',
            fontSize: 16
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '0%',
          top: '7%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        yAxis: [
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
              show: true,
              interval: 'auto',
              // rotate: 45, //文字逆时针旋转45°
              textStyle: {
                color: '#303030', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
              // formatter: function(value) {
              //   return value.split("").join("\n");
              // }
            }
          }
        ],
        // dataZoom: [
        //   {
        //     type: "inside",
        //     show: false,
        //     yAxisIndex: [0],
        //     start: 0, // 默认为1
        //     end: 30
        //   }
        // ],
        xAxis: [
          {
            name: '',
            type: 'value',
            position: 'top', // x轴固定在顶部
            // interval: 500,
            // max: 1500,
            splitLine: {
              // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                color: 'rgba(48,48,48,1);', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
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
      this.loadMap('firstChart', option)
      this.initEchart('firstChart')
    },
    handleClickSort (key) {
      this.sortTypeParams = key
    },
    toDetail (item) {
      if (item.state !== 3) {
        return
      }
      this.currentLi = item
      if (this.index === '0') { this.bigProject = true } else {
        this.redTableDialog = true
        this.redTableTitle = item.name
      }
    }
  },
  watch: {
    sortTypeParams: {

      handler (newName, oldName) {
        setTimeout(() => {
          this.firstDrawLine()
        }, 100)
      },
      immediate: true,
      deep: true
    },
    year (val) {
      this.firstDrawLine()
      this.overallTrend()
    }
  },

  computed: {
    ...mapState('jcpgyj', ['year', 'area', 'locationCity'])

  },
  components: {
    Important,
    RedTable
  }
}
</script>

<style scoped>
.left__title {
  font-size: 18px;
  font-weight: 700;
  padding-left: 7px;
}
.row__title {
  text-align: left;
}
.one {
  color: rgba(64, 64, 64, 1);
}
.two {
  color: rgba(160, 160, 160, 1);
}
.unit {
  color: rgba(205, 205, 205, 1);
  font-size: 14px;
}
.list-row {
  color: rgba(80, 165, 244, 1);
  line-height: 20px;
  padding: 6px 8px;
  margin-top: 4px;
  cursor: pointer;
}

.list-row.active {
  background: rgba(244, 250, 255, 1);
  border-radius: 2px;
}
.list-row.active:hover {
  background: rgba(27, 116, 238, 1);
  color: #fff;
}
.list-row.clickLi {
  background: rgba(27, 116, 238, 1);
  color: #fff;
}

.num {
  color: rgba(157, 211, 28, 1);
  font-size: 18px;
}

.zheng-icon {
  display: inline-block;
  width: 12px;
  height: 15px;
  background-image: url("../../../../assets/images/jcpgyj/project/zheng.png");
  background-size: 12px 15px;
  margin: 0px 5px;
}
.dao-icon {
  display: inline-block;
  width: 12px;
  height: 15px;
  background-image: url("../../../../assets/images/jcpgyj/project/dao.png");
  background-size: 12px 15px;
  margin: 0px 5px;
}
.qushi-chart__diff {
  height: 310px;
  width: 352px;
  margin: 0 auto;
  background-color: #fff;
  padding: 10px 0;
}
.zong-unit-mes {
  height: 21px;
  padding-left: 14px;
  color: #707070;
  line-height: 21px;
  font-size: 16px;
}

.chart-tab-content-return__diff {
  color: #707070;
  line-height: 21px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 16px;
}
.chart-tab-content-return-icon {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.chart-tab-content-main__diff {
  width: 352px;
  height: 650px;
  background-color: #fff;
  padding: 10px 0;
  box-sizing: border-box;
}
.sort-color {
  color: #50a5f6;
}
</style>
