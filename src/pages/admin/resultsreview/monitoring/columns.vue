<template>
  <div class="exchangeTable">
    <el-row>
      <el-col :span="7"
              style="font-size:18px;color:rgba(79,79,79,1)">成果修改排行榜</el-col>
      <div v-if="canMore"
           class="more"
           @click="toDetail()">更多</div>
      <div class="bottonParent">
        <span v-for="(item,index) in buttons "
              :class="{'active':isCurrent.id===item.id}"
              @click="isCurrent=item"
              :key="index">{{item.name}}</span>
      </div>
    </el-row>
    <el-row class="tabHeader">
      <span>单位：个</span>
    </el-row>
    <div id="columns"
         ref="columns"></div>
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import { mapActions } from 'vuex'
import commonecharts from '../../onemap/topic/commonecharts.js'
export default {
  props: {
    canMore: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  data () {
    return {
      chart: null,
      landuseName: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      landuseArea: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      isCurrent: { id: 1, name: '本日' },
      buttons: [
        { id: 1, name: '本日' },
        { id: 2, name: '本周' },
        { id: 3, name: '本月' },
        { id: 4, name: '本年' }
      ]
    }
  },
  components: {},
  mounted () {
    this.initEchart()
    this.useDrawLine()
  },
  methods: {
    ...mapActions(['setTabsList']),
    loadMap () {
      let useChart = echarts.init(document.getElementById('columns'))
      useChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '5%',
          left: '0%',
          right: '8%%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '广州市',
              '深圳市',
              '中山市',
              '佛山市',
              '东莞市',
              '江门市',
              '肇庆市',
              '阳江市',
              '汕头市'
            ],
            axisTick: {
              show: true
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(131,131,131,1)', // 更改坐标轴文字颜色
                fontSize: 12 // 更改坐标轴文字大小
              },
              formatter: function (value) {
                return value.split('').join('\n')
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 1600,
            interval: 400,
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(131,131,131,1)', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
            },
            axisLine: {
              show: false // y轴线消失
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: ' ',
            type: 'bar',
            barWidth: '30%',
            data: [1300, 1650, 1420, 1399, 1348, 1267, 998, 846, 690],
            itemStyle: {
              normal: {
                color: 'rgba(216,216,216,1)',
                barBorderColor: 'rgba(151,151,151,1);', // 柱条边线
                barBorderRadius: 0, // 柱条边线圆角，单位px，默认为0
                barBorderWidth: 1 // 柱条边线线宽，单位px，默认为1
              }
            }
          }
        ]
      })
    },

    toDetail () {
      let title = '成果修改排行榜'
      let routerPath = '/columnsdetail'
      console.log(routerPath)
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    useDrawLine () {
      this.$nextTick(function () {
        setTimeout(() => {
          this.loadMap()
        }, 1000)
      })
    },
    initEchart () {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.columns)
        document.getElementById('columns').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    }
  }
}
</script>

<style scoped>
.exchangeTable {
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  height: 100%;
  width: 100%;
  padding: 15px;
}

#columns {
  width: 100%;
  height: 80%;
}

.bottonParent {
  border: 1px solid rgba(151, 151, 151, 1);
  border-radius: 11px;
  font-size: 0;
  float: right;
}
.bottonParent span {
  cursor: pointer;
  padding: 2px 15px;
  font-size: 16px;
  color: rgba(104, 104, 104, 1);
}

.bottonParent .active {
  border-radius: 11px;
  background-color: rgba(29, 124, 228, 1);
  color: rgba(255, 255, 255, 1);
}
.tabHeader {
  margin-top: 10px;
  font-size: 12px;
  height: 20px;
  display: flex;
  justify-content: flex-end;
}

.more {
  color: rgba(29, 124, 228, 1);
  cursor: pointer;
  float: right;
  padding: 2px 0 2px 15px;
}
</style>
