<template>
  <div class="page-body">
    <div class="checkout-big-box"
         style="margin-bottom:24px;">
      <div class="checkout-box-title">
        信息列筛选：
      </div>
      <div class="checkout-box">
        <el-checkbox-group v-model="checkListIng"
                           @change="handleCheckedTypesChange"
                           style="margin:10px 0;">
          <el-checkbox v-for="(item, index) in checkList"
                       :key="index"
                       :label="item"
                       :disabled="checkDisList.includes(item)"></el-checkbox>
        </el-checkbox-group>
        <div>
          <span @click="handleCheckedTypesCancelChange"
                style="color:#1B74EE;font-size:16px;line-height: 21px;cursor:pointer;">全部取消</span>
          <span style="color:#9A9A9A;font-size:16px;line-height: 21px;">（至多可选择2项）</span>
        </div>
      </div>
    </div>
    <div style="width:1600px;height:700px;">
      <div id="economyChart"
           style="width:100%;height:100%;"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
  data () {
    return {
      xzhouData: [],
      legendData: [],
      legendDataMR: [],
      seriesAllDataMR: [],
      change: false,

      params: {
        NF: '2019'
      },
      checkList: [], // 全部多选内容
      checkDisList: [], // 禁用内容
      checkListIng: [], // 选中内容
      checked: true, // 是否禁用

      checkAllData: [], // 后台数据
      checkChartData: [] // 图表展示数据
    }
  },
  methods: {
    handleCheckedTypesChange (value) {
      this.change = true
      function searchKeyValue (lists, key, value) {
        let res = lists.filter(item => item[key] == value)
        return res
      }

      this.checkChartData = value.map((val, index) => {
        let changeData = searchKeyValue(this.checkAllData, 'label', val)
        return changeData
      })

      console.log(this.checkChartData)

      if (this.checkListIng.length === 6) {
        this.checkDisList = this.checkList.filter(item => {
          return this.checkListIng.indexOf(item) === -1
        })
      } else {
        this.checkDisList = []
      }
    },
    handleCheckedTypesCancelChange () {
      this.checkDisList = []
      this.checkListIng = []
    },
    async getEconomyData () {
      // let params = this.params
      // let res = await this.$post('/epf-third-part/oneBatch/GLWSSYJGCWHRYS', params)
      let res = await this.$get(
        '/epf-monitor-evaluation/dismantOldReclam/listInfo?year=2019'
      )

      let chartData = res.result.list

      this.xzhouData = [] // x轴数据
      this.legendData = [] // 图例数据

      this.legendDataMR = [] // 默认图例
      this.seriesAllDataMR = [] // 默认图表数据

      // 展示的数据
      let data0 = []
      let data1 = []
      let data2 = []
      let data3 = []
      let data4 = []
      let data5 = []
      let data6 = []
      let data7 = []
      let data8 = []
      let data9 = []
      let data10 = []
      let data11 = []
      let data12 = []
      let data13 = []
      let data14 = []
      let data15 = []
      let data16 = []
      let data17 = []
      let data18 = []
      let data19 = []

      for (var key in chartData) {
        data0.push(Number(chartData[key].cultivatedLandBefore).toFixed(2))
        data1.push(Number(chartData[key].cultivatedLandNow).toFixed(2))
        data2.push(Number(chartData[key].cultivatedLandAfter).toFixed(2))
        data3.push(Number(chartData[key].farmLandBefore).toFixed(2))
        data4.push(Number(chartData[key].farmLandNow).toFixed(2))
        data5.push(Number(chartData[key].farmLandAfter).toFixed(2))
        data6.push(Number(chartData[key].reclaim).toFixed(2))
        data7.push(Number(chartData[key].baseChange).toFixed(2))
        data8.push(Number(chartData[key].bildLandBefore).toFixed(2))
        data9.push(Number(chartData[key].bildLandNow).toFixed(2))
        data10.push(Number(chartData[key].bildLandAfter).toFixed(2))
        data11.push(Number(chartData[key].bildLandSupScaleOne).toFixed(2))
        data12.push(Number(chartData[key].bildLandSupScaleTwo).toFixed(2))
        data13.push(Number(chartData[key].bildLandSupScaleThree).toFixed(2))
        data14.push(Number(chartData[key].cityBildLandBefore).toFixed(2))
        data15.push(Number(chartData[key].cityBildLandNow).toFixed(2))
        data16.push(Number(chartData[key].cityBildLandAfter).toFixed(2))
        data17.push(Number(chartData[key].changedScaleOne).toFixed(2))
        data18.push(Number(chartData[key].changedScaleTwo).toFixed(2))
        data19.push(Number(chartData[key].suplusScale).toFixed(2))

        this.checkAllData = [
          { label: '耕地保有量原规划指标', value: data0 },
          { label: '耕地保有量现状', value: data1 },
          { label: '耕地保有量调整后指标', value: data2 },
          { label: '基本农田原规划指标', value: data3 },
          { label: '基本农田现状', value: data4 },
          { label: '基本农田调整后指标', value: data5 },
          { label: '复垦区面积', value: data6 },
          { label: '基数转换面积', value: data7 },
          { label: '建设用地总规模原规划指标', value: data8 },
          { label: '建设用地总规模现状', value: data9 },
          { label: '建设用地总规模调整后指标', value: data10 },
          { label: '建设用地剩余规模（含复垦区）', value: data11 },
          {
            label: '建设用地剩余规模（含复垦区和基数转换面积）',
            value: data12
          },
          { label: '建设用地实际剩余规模', value: data13 },
          { label: '城乡建设用地原规划指标', value: data14 },
          { label: '城乡建设用地现状', value: data15 },
          { label: '城乡建设用地调整后指标', value: data16 },
          { label: '预留规模', value: data17 },
          { label: '剩余规模', value: data18 },
          { label: '实际剩余规模', value: data19 }
        ]

        this.xzhouData.push(chartData[key].cityName)
      }

      this.legendData = [
        '耕地保有量原规划指标',
        '耕地保有量现状',
        '耕地保有量调整后指标',
        '基本农田原规划指标',
        '基本农田现状',
        '基本农田调整后指标',
        '复垦区面积',
        '基数转换面积',
        '建设用地总规模原规划指标',
        '建设用地总规模现状',
        '建设用地总规模调整后指标',
        '建设用地剩余规模（含复垦区）',
        '建设用地剩余规模（含复垦区和基数转换面积）',
        '建设用地实际剩余规模',
        '城乡建设用地原规划指标',
        '城乡建设用地现状',
        '城乡建设用地调整后指标',
        '预留规模',
        '剩余规模',
        '实际剩余规模'
      ]
      this.checkList = this.legendData

      // 默认展示1条数据
      this.legendDataMR = ['耕地保有量原规划指标']
      this.checkListIng = ['耕地保有量原规划指标']
      this.seriesAllDataMR.push(data0)
    },
    economyDrawLine () {
      setTimeout(() => {
        let economyChart = echarts.init(
          document.getElementById('economyChart')
        )
        document.getElementById('economyChart').style.width = 100 + '%'
        document.getElementById('economyChart').style.height = 100 + '%'
        economyChart.resize() // 直接加这句即可
      }, 0)
      let economyChart = echarts.init(document.getElementById('economyChart'))

      let XZhouData = this.xzhouData
      let option = {}
      let series = []

      let colorData = [
        '#0ebbf1',
        '#7cf5e3',
        '#4ca0fe',
        '#ca6bfe',
        '#e9c437',
        '#5ca7b0',
        '#88ca6e',
        '#fe1800',
        '#f87700',
        '#dc5b55',
        '#0ebbf1',
        '#1d7ce4',
        '#ce1365',
        '#aeb3b7',
        '#28bdb7',
        '#e0bebd',
        '#5c30cd',
        '#d07cb7',
        '#f25f33',
        '#c961ff',
        '#a6c84c'
      ]

      let legendData = []
      let seriesAllData = []

      if (this.change === false) {
        legendData = this.legendDataMR
        seriesAllData = this.seriesAllDataMR
      } else {
        for (let key in this.checkChartData) {
          legendData.push(this.checkChartData[key][0].label)
          seriesAllData.push(this.checkChartData[key][0].value)
        }
      }

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
            data: XZhouData,
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

      economyChart.setOption(option, true)
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        let economyChart = echarts.init(
          document.getElementById('economyChart')
        )
        document.getElementById('economyChart').style.width = 100 + '%'
        document.getElementById('economyChart').style.height = 100 + '%'
        economyChart.resize()
      })
    }
  },
  created () {
    this.getEconomyData()
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.economyDrawLine()
      }, 500)
    })

    this.initEchart()
  },
  watch: {
    checkListIng: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.economyDrawLine()
          }, 500)
        })
      }
    }
  }
}
</script>
<style scoped>
.checkout-big-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.checkout-box-title {
  width: 110px;
  height: 21px;
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
</style>
