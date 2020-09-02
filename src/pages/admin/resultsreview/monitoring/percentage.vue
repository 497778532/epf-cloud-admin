<template>
  <div class="exchangeTable">
    <el-row>
      <el-col :span="14" style="font-size:18px;color:rgba(79,79,79,1)">成果汇交质量排行榜</el-col>
      <el-col :span="7" style="text-align:right" :offset="3">
        <span class="more" v-if="canMore" @click="toDetail()">更多</span>
      </el-col>
    </el-row>

    <el-row class="tabHeader">
      <div class="rightTabHeader">
        <div></div>
        <div>成果退回</div>
        <div></div>
        <div>成果入库</div>
      </div>
    </el-row>
    <div id="percentage" ref="percentage"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import echarts from 'echarts'
import commonecharts from '../../onemap/topic/commonecharts.js'
export default {
  props: {
    canMore: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  components: {},
  mounted() {
    this.initEchart()
    this.useDrawLine()
  },
  methods: {
    ...mapActions(['setTabsList']),
    useDrawLine(params) {
      this.$nextTick(function() {
        setTimeout(() => {
          let useChart = echarts.init(document.getElementById('percentage'))
          var data = [20, 32, 11, 65, 25, 50, 21]
          var xMax = 100
          useChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a}{b}{c}%',
              axisPointer: {
                type: 'none'
              }
            },
            grid: {
              top: '5%',
              left: '0%',
              right: '8%%',
              bottom: '12%',
              containLabel: true
            },

            yAxis: [
              {
                type: 'category',
                show: true,
                data: [
                  '广州市',
                  '深圳市',
                  '惠州市',
                  '河源市',
                  '中山市',
                  '韶关市',
                  '潮州市'
                ],
                axisLine: {
                  show: false
                },
                axisTick: {
                  // y轴刻度线
                  show: false
                },
                splitLine: {
                  show: false
                }
              }
            ],
            xAxis: [
              {
                type: 'value',
                //  position:'top',
                show: true,
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#fff'
                  }
                },
                splitLine: {
                  show: true
                },
                axisLabel: {
                  show: true,
                  rotate: 0,
                  textStyle: {
                    color: '#737373'
                  },
                  formatter: '{value}%' // 以百分比显示
                }
              }
            ],
            series: [
              {
                name: '',
                type: 'bar',
                stack: '',
                z: 2,
                barWidth: '40%',
                data: [20, 32, 11, 65, 25, 50, 21],
                itemStyle: {
                  normal: {
                    color: 'rgba(131,131,131,1)',
                    label: {
                      show: false,
                      textStyle: {
                        color: 'rgba(0,0,0,1)'
                      },
                      position: 'right',
                      formatter: function(p) {
                        return p.value > 0 ? p.value : ''
                      }
                    }
                  }
                }
              },
              {
                name: '占位',
                type: 'bar',
                barWidth: '40%',
                barGap: '-100%',
                z: 1,
                silent: true,
                itemStyle: {
                  normal: {
                    color: 'rgba(216,216,216,1)',

                    label: {
                      show: true,
                      textStyle: {
                        color: 'rgba(0,0,0,1)'
                      },
                      position: 'right',
                      formatter: function(p) {
                        return data[p.dataIndex] + '%'
                      }
                    }
                  }
                },
                data: data.map(function(d) {
                  return xMax
                })
              }
            ]
          })
        }, 1000)
      })
    },

    toDetail() {
      let title = '成果汇交质量排行榜'
      let routerPath = '/percentagedetail'
      console.log(routerPath)
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    initEchart() {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.percentage)
        document.getElementById('percentage').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    }
  }
}
</script>

<style scoped>
#percentage {
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
.exchangeTable {
box-shadow:1px 3px 12px 5px rgba(0,0,0,0.06);
  width: 100%;
  height: 100%;
  padding: 15px;
}
.more {
  color: rgba(29, 124, 228, 1);
  cursor: pointer;
}
.tabHeader {
  margin-top: 10px;
  font-size: 12px;
  height: 20px;
  display: flex;
  justify-content: flex-end;
}

.rightTabHeader {
  display: flex;
  align-items: center;
}
.rightTabHeader > div {
  margin-right: 10px;
}
.rightTabHeader div:nth-child(1),
.rightTabHeader div:nth-child(3) {
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.rightTabHeader div:nth-child(1) {
  background: rgba(131, 131, 131, 1);
}
.rightTabHeader div:nth-child(3) {
  background: rgba(216, 216, 216, 1);
}
.rightTabHeader div:nth-child(2) {
  color: rgba(131, 131, 131, 1);
}
.rightTabHeader div:nth-child(4) {
  color: rgba(216, 216, 216, 1);
}
</style>
