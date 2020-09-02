<template>
  <div class="exchangeTable">
    <el-row>
      <el-col :span="14"
              style="font-size:18px;color:rgba(79,79,79,1)">成果汇交排行榜</el-col>
    </el-row>
    <el-row class="tabHeader">
      <div class="leftTabHeader">
        <span>2018年4月</span>-
        <span>2019年3月</span>
      </div>
      <div class="rightTabHeader">单位：次</div>
    </el-row>
    <div id="diagram"
         ref="diagram"></div>
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import commonecharts from '../../onemap/topic/commonecharts.js'
export default {
  data () {
    return {
      chart: null,
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
    useDrawLine (params) {
      this.$nextTick(function () {
        setTimeout(() => {
          let useChart = echarts.init(document.getElementById('diagram'))
          useChart.setOption({
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['成果汇交', '成果入库', '成果退货'],
              bottom: '0%',
              itemGap: 15
            },
            grid: {
              top: '5%',
              left: '0%',
              bottom: '12%',
              containLabel: true
            },

            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
                '1月',
                '2月',
                '3月'
              ],
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#979797'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'rgba(79,79,79,1)'
                },
                formatter: function (value) {
                  return value.split('').join('\n')
                }
              }
            },
            yAxis: {
              type: 'value',
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#979797'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'rgba(79,79,79,1)'
                }
              }
            },
            series: [
              {
                name: '成果汇交',
                type: 'line',
                stack: '总量',
                data: [
                  120,
                  132,
                  101,
                  134,
                  90,
                  230,
                  210,
                  132,
                  101,
                  134,
                  90,
                  230
                ],
                itemStyle: {
                  normal: {
                    color: '#1D7CE4'
                  }
                }
              },
              {
                name: '成果退货',
                type: 'line',
                stack: '总量',
                data: [
                  220,
                  182,
                  191,
                  234,
                  290,
                  330,
                  310,
                  132,
                  101,
                  134,
                  90,
                  230
                ],
                itemStyle: {
                  normal: {
                    color: '#F59A23'
                  }
                }
              },
              {
                name: '成果入库',
                type: 'line',
                stack: '总量',
                data: [
                  150,
                  232,
                  201,
                  154,
                  190,
                  330,
                  410,
                  132,
                  101,
                  134,
                  90,
                  230
                ],
                itemStyle: {
                  normal: {
                    color: '#70B603'
                  }
                }
              }
            ]
          })
        }, 1000)
      })
    },
    initEchart () {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.diagram)
        document.getElementById('diagram').style.width = 100 + '%'
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
#diagram {
  width: 100%;
  height: 80%;
}

.tabHeader {
  margin-top: 10px;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
}
.leftTabHeader {
  float: left;
}
.rightTabHeader {
  float: right;
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

.exchangeTable .el-table td,
.exchangeTable .el-table th {
  padding: 9px 0;
}
.exchangeTable .el-table .el-table__header thead th {
  background: rgba(189, 208, 255, 0.5);
}
.more {
  color: rgba(29, 124, 228, 1);
  cursor: pointer;
  float: right;
  padding: 2px 0 2px 15px;
}
</style>
