<template>
  <div class="page-body EPF-table"
       id="dispatchlist">

    <div class="filter_wrap">
      <div class="tableBigBox">
        <div class="tableTopBox">
          <div>
            <span class="title">任务总量：</span>8
          </div>
          <!-- <el-button>导出</el-button> -->
          <div class="button_kuang">导出</div>
        </div>

        <el-table :data="tableData"
                  style="width: 100%"
                  border
                  stripe
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)">
          <el-table-column label="序号"
                           width="100px"
                           align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column label="经办人"
                           min-width="180">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.people }}</span>
            </template>
          </el-table-column>
          <el-table-column label="待办数量"
                           min-width="180">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.daiNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column label="在办数量"
                           min-width="180">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.zaiNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="已办数量"
                           min-width="180">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.yiNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="办结数量"
                           min-width="180">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.banNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="退回数量"
                           min-width="180">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.tuiNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合计"
                           min-width="180">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.heNumber }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="chartBigBox">
      <div class="chartLeftBox">
        <div class="titleBox">
          <span class="title">调度统计</span>
          <el-button-group>
            <el-button :type="this.current==0?'primary':''"
                       round
                       size="small"
                       @click="turnri">本日</el-button>
            <el-button :type="this.current==1?'primary':''"
                       round
                       size="small"
                       @click="turnzhou">本周</el-button>
            <el-button :type="this.current==2?'primary':''"
                       round
                       size="small"
                       @click="turnyue">本月</el-button>
            <el-button :type="this.current==3?'primary':''"
                       round
                       size="small"
                       @click="turnnian">本年</el-button>
          </el-button-group>
        </div>
        <div>2018年4月-2019年3月</div>
        <div id="diaoduchart"
             style="width:100%;height:320px;margin-top:10px;"></div>
      </div>
      <div class="chartLeftBox">
        <span class="title">人员任务统计</span>
        <div id="renwuchart"
             style="width:100%;height:320px;margin-top:30px;"></div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import echarts from 'echarts'
import { timeout } from 'q'

export default {
  name: 'chartstatistics',
  data () {
    return {
      filterData: {},
      //  表格数据
      tableData: [
        {
          people: '张三',
          daiNumber: '200',
          zaiNumber: '200',
          yiNumber: '200',
          banNumber: '200',
          tuiNumber: '200',
          heNumber: '1000'
        },
        {
          people: '李四',
          daiNumber: '300',
          zaiNumber: '300',
          yiNumber: '300',
          banNumber: '300',
          tuiNumber: '300',
          heNumber: '1500'
        },
        {
          people: '王五',
          daiNumber: '300',
          zaiNumber: '300',
          yiNumber: '300',
          banNumber: '300',
          tuiNumber: '300',
          heNumber: '1500'
        },
        {
          people: '赵六',
          daiNumber: '200',
          zaiNumber: '200',
          yiNumber: '200',
          banNumber: '200',
          tuiNumber: '200',
          heNumber: '1000'
        },
        {
          people: '田七',
          daiNumber: '200',
          zaiNumber: '200',
          yiNumber: '200',
          banNumber: '200',
          tuiNumber: '200',
          heNumber: '1000'
        },
        {
          people: '宋甜甜',
          daiNumber: '300',
          zaiNumber: '300',
          yiNumber: '300',
          banNumber: '300',
          tuiNumber: '300',
          heNumber: '1500'
        },
        {
          people: '张哲',
          daiNumber: '180',
          zaiNumber: '180',
          yiNumber: '180',
          banNumber: '180',
          tuiNumber: '180',
          heNumber: '900'
        },
        {
          people: '成隆',
          daiNumber: '280',
          zaiNumber: '280',
          yiNumber: '280',
          banNumber: '280',
          tuiNumber: '280',
          heNumber: '1400'
        }
      ],
      topLevel: '',

      loading: false, // 控制loading动画显示隐藏
      params: {},
      current: 0
    }
  },

  created () {
    // this.getList();
  },
  methods: {
    ...mapActions(['setTabsList']),

    getList (val) {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$post('/epf-onemap/admin/mapdiretree/topList', params).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.tableData = res.pager.results
          this.pageNo = res.pager.pageNo
          this.pageSize = res.pager.pageSize
          this.totalPage = res.pager.totalPage
          this.totalRecord = res.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    turnri () {
      this.current = 0
    },
    turnzhou () {
      this.current = 1
    },
    turnyue () {
      this.current = 2
    },
    turnnian () {
      this.current = 3
    },
    renwuDrawLine () {
      setTimeout(() => {
        let renwuchart = echarts.init(document.getElementById('renwuchart'))
        document.getElementById('renwuchart').style.width = 100 + '%'
        renwuchart.resize() // 直接加这句即可
      }, 0)
      let renwuchart = echarts.init(document.getElementById('renwuchart'))

      renwuchart.setOption({
        color: ['#03d092', '#b77bdd', '#ff9601', '#ffd60a', '#ea4d57'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        legend: {
          data: ['待办数量', '在办数量', '已办数量', '办结数量', '退回数量'],

          right: 30,
          textStyle: {
            color: '#555',
            fontSize: 14
          },
          itemGap: 16,
          itemWidth: 16,
          itemHeight: 16
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '张三',
              '李四',
              '王五',
              '赵六',
              '田七',
              '宋甜甜',
              '张哲',
              '成隆'
            ],
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
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            start: 0, // 默认为1
            end: 100
          }
        ],
        yAxis: [
          {
            name: '单位：个',
            type: 'value',
            interval: 360,
            max: 1800,
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
            name: '待办数量',
            type: 'bar',
            stack: 'a',
            barWidth: '30%',
            data: ['200', '300', '300', '200', '200', '300', '180', '280']
          },
          {
            name: '在办数量',
            type: 'bar',
            stack: 'a',
            barWidth: '30%',
            data: ['200', '300', '300', '200', '200', '300', '180', '280']
          },
          {
            name: '已办数量',
            type: 'bar',
            stack: 'a',
            barWidth: '30%',
            data: ['200', '300', '300', '200', '200', '300', '180', '280']
          },
          {
            name: '办结数量',
            type: 'bar',
            stack: 'a',
            barWidth: '30%',
            data: ['200', '300', '300', '200', '200', '300', '180', '280']
          },
          {
            name: '退回数量',
            type: 'bar',
            stack: 'a',
            barWidth: '30%',
            data: ['200', '300', '300', '200', '200', '300', '180', '280']
          }
        ]
      })
    },
    diaoduDrawLine () {
      setTimeout(() => {
        let diaoduchart = echarts.init(document.getElementById('diaoduchart'))
        document.getElementById('diaoduchart').style.width = 100 + '%'
        diaoduchart.resize() // 直接加这句即可
      }, 0)
      let diaoduchart = echarts.init(document.getElementById('diaoduchart'))

      let timeData = [
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
      ]
      let centerData = [
        280,
        580,
        480,
        1180,
        980,
        1080,
        580,
        280,
        180,
        780,
        380,
        880
      ]
      let paifaData = [
        680,
        780,
        980,
        480,
        880,
        880,
        380,
        280,
        880,
        480,
        1080,
        580
      ]

      diaoduchart.setOption({
        backgroundColor: '#fff',
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['进入中心数量', '派发数量'],
          itemGap: 200 // item之间的距离
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            data: timeData,
            // name: "时间",
            // nameLocation: "end",
            // nameTextStyle: {
            //   color: "#333",
            //   fontSize: 12,
            //   padding: 10
            // },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#333' // X轴文字颜色
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#ddd6d0'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ebf8ac'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            }
          },
          {
            name: '单位：个',
            type: 'value',
            interval: 240,
            max: 1200,
            position: 'left',

            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true
            }
          }
        ],
        series: [
          {
            name: '进入中心数量',
            type: 'line',
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: false, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'emptyCircle', // 标记的图形为实心圆
            symbolSize: 10, // 标记的大小
            color: '#6ba6fe',
            itemStyle: {
              // 折线拐点标志的样式
              normal: {
                lineStyle: {
                  width: 2, // 0.1的线条是非常细的了
                  color: '#6ba6fe' //
                }
              }
            },

            data: centerData
          },
          {
            name: '派发数量',
            type: 'line',
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: false, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'emptyCircle', // 标记的图形为实心圆
            symbolSize: 10, // 标记的大小
            color: '#ff7141',
            itemStyle: {
              // 折线拐点标志的样式
              normal: {
                lineStyle: {
                  width: 2, // 0.1的线条是非常细的了
                  color: '#ff7141' //
                }
              }
            },

            data: paifaData
          }
        ]
      })
    },
    initEchart () {
      window.addEventListener('resize', () => {
        let renwuchart = echarts.init(document.getElementById('renwuchart'))
        document.getElementById('renwuchart').style.width = 100 + '%'
        renwuchart.resize()
        let diaoduchart = echarts.init(document.getElementById('diaoduchart'))
        document.getElementById('diaoduchart').style.width = 100 + '%'
        diaoduchart.resize()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.renwuDrawLine()
        this.diaoduDrawLine()
      }, 1000)
    })
    this.initEchart()
  }
}
</script>

<style scoped>
.toolsTitleBox {
  height: 56px;
  background: rgba(230, 230, 230, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  text-align: right;
  line-height: 56px;
  margin-bottom: 20px;
  padding-right: 20px;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 13px;
  float: left;
}

.btnBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.companyInfoBox {
  padding: 30px 30px;
  max-height: 600px;
  overflow-y: auto;
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.middleBox {
  margin: 30px auto;
  margin-top: 10px;
}
.middleBox_btn {
  width: 85%;
  margin: 30px auto;
  margin-bottom: 0;
}
.btnInfo {
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  letter-spacing: 3px;
}

.filter_wrap {
  box-sizing: border-box;
  padding: 20px 0;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding-right: 15px;
  text-align: right;
  line-height: 35px;
  color: rgba(48, 48, 48, 1);
  font-weight: 400;
  font-size: 16px;
}
.switchHeight_box {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  line-height: 56px;
  margin-bottom: 20px;
}
.el-input__inner {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  height: 36px;
  line-height: 40px;
}
.tableBigBox {
  width: 100%;
  border: 1px solid #a1a1a1;
  padding: 10px;
}
.tableTopBox {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.chartBigBox {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chartLeftBox {
  width: 49%;
  height: 400px;
  border: 1px solid #a1a1a1;
  padding: 10px;
}
.chartLeftBox .titleBox {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 16px;
  font-weight: 700;
}
.el-scrollbar {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow: scroll;
  width: 110%;
  height: 120%;
}
</style>
