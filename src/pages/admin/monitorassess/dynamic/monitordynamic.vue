<template>
  <div class="page-body"
       id="normBox">
    <div class="normTitleBox">
      <p class="normTitle">{{this.yileiName}}总览</p>
      <el-cascader size="small"
                   style="margin:0 20px;width:220px;"
                   :props="props"
                   clearable
                   v-model="areaSelectedOptions"
                   @change="areaSelect()"></el-cascader>
      <!-- <el-select v-model="time" placeholder="请选择" size="small" style="width:100px;">
        <el-option
          v-for="item in timeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
    </div>
    <div class="filterWrap">
      <div class="filter_wrap">
        <!-- 一级 -->
        <div class="normContentTitle"
             style="margin-bottom:20px;">{{this.yileiName}}</div>
        <!-- <div class="normNumberBox">
          <div class="normNumber" style="margin-right:30px;">
            <img src="@/assets/images/jcpgyj/icondui.png" alt />
            <span>正常指标：300 项</span>
          </div>
          <div class="normNumber">
            <img src="@/assets/images/jcpgyj/icontan.png" alt />
            <span>预警指标：5 项</span>
          </div>
        </div>-->
        <!-- 二级 -->
        <ul class="secondnormBox">
          <li class="secondnormLittleBox"
              v-for="(item,index) in secondnormList"
              :key="index"
              :style="bgimgData(index)"
              @click="goAnchor('#anchor-'+index)"
              rel="external nofollow">
            <span class="secondnormLittleTitle">{{item.name}}</span>
            <span class="secondnormLittleNumber">{{item.indexs.length}} 项指标</span>
          </li>
        </ul>
        <!-- 三级 -->
        <div class="thirdnormBigBox">
          <div class="thirdnormBox"
               :id="'anchor-'+index"
               v-for="(item,index) in secondnormList"
               :key="index">
            <div class="thirdnormTitle"
                 :style="bgcolorRgb(index)">{{item.name}} （ {{item.childs?item.number:item.indexs.length}} ）</div>

            <div class="thirdnormContentBox"
                 v-if="item.childs!='null'">
              <ul class="thirdnormContentBoxUl"
                  v-for="(i,index1) in item.childs"
                  :key="index1">
                <li class="thirdnormContentTitle">
                  <i class="thirdnormTitleIcon"
                     :style="bgcolorRgb(index)"></i>
                  <span class="thirdnormTitleName"
                        :style="colorRgb(index)">{{i.name}}</span>
                  <ul class="thirdnormContentTitleUl">
                    <li class="thirdnormContentTitleLi"
                        v-for="(t,index2) in i.indexs"
                        :key="index2"
                        @click="goIndex(index2)">{{t.name}}</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="thirdnormContentBoxT"
                 v-if="item.childs!='null'">
              <ul class="thirdnormContentBoxUlT"
                  v-for="(v,index1) in item.indexs"
                  :key="index1">
                <li class="thirdnormContentTitleT">
                  <ul class="thirdnormContentTitleUlT"
                      style="margin-top:10px;">
                    <li class="thirdnormContentTitleLiT"
                        @click="goIndex(index1)">{{v.name}}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="filterWrapRight">
        <!-- 基础指标情况 -->
        <div class="filterWrapRightTop">
          <div class="checkTitleBox">
            <div class="checkTitleIcon"></div>
            <div class="checkTitle">基础指标情况</div>
          </div>

          <div class="jcBBox">
            <div class="jcBox">
              <span>指标项宗数</span>
              <i>{{this.allIndexNumber}} 项</i>
            </div>
            <div class="jcBox"
                 style="border: 2px solid #29dad3;">
              <span style="background:#29dad3;">一类指标</span>
              <i>{{this.oneIndexNumber}} 项</i>
            </div>
            <div class="jcBox"
                 style="border: 2px solid #f678b2;">
              <span style="background:#f678b2;">二类指标</span>
              <i>{{this.twoIndexNumber}} 项</i>
            </div>
            <div class="jcBox"
                 style="border: 2px solid #4dcef0;">
              <span style="background:#4dcef0;">三类指标</span>
              <i>{{this.threeIndexNumber}} 项</i>
            </div>
          </div>
        </div>
        <div class="filterWrapRightMiddle">
          <!-- 常用监测指标 -->
          <div class="filterWrapRightML">
            <div class="checkTitleBox">
              <div class="checkTitleIcon"></div>
              <div class="checkTitle">常用监测指标</div>
            </div>
            <div class="zbBBox">
              <div class="zbBox"
                   @click="handleCJFKServiceClick(0)">
                <img src="@/assets/images/jcpgyj/zhibiao01.png"
                     alt />
                <div class="zbName">预留规模台账</div>
              </div>
              <div class="zbBox"
                   @click="handleCJFKServiceClick(1)">
                <img src="@/assets/images/jcpgyj/zhibiao01.png"
                     alt />
                <div class="zbName">拆旧复垦指标调整汇总</div>
              </div>
              <div class="zbBox"
                   @click="handleCJFKServiceClick(2)">
                <img src="@/assets/images/jcpgyj/zhibiao01.png"
                     alt />
                <div class="zbName">预留规模回填复垦区</div>
              </div>
              <div class="zbBox"
                   @click="handleCJFKServiceClick(3)">
                <img src="@/assets/images/jcpgyj/zhibiao01.png"
                     alt />
                <div class="zbName">城乡建设用地预留规模</div>
              </div>
              <div class="zbBox"
                   @click="handleCJFKServiceClick(4)">
                <img src="@/assets/images/jcpgyj/zhibiao01.png"
                     alt />
                <div class="zbName">已验收拆旧复垦项目</div>
              </div>
            </div>
          </div>
          <!-- 指标按发展理念分类 -->
          <div class="filterWrapRightMR">
            <div class="checkTitleBox">
              <div class="checkTitleIcon"></div>
              <div class="checkTitle">指标按发展理念分类</div>
            </div>
            <div id="targetRadarChart"
                 style=" width: 100%; height: 90%;"></div>
          </div>
        </div>
        <!-- 指标预警状态总览 -->
        <div class="filterWrapRightBottom">
          <div class="checkTitleBox">
            <div class="checkTitleIcon"></div>
            <div class="checkTitle">指标预警状态总览</div>
          </div>
          <div id="targetBarChart"
               style=" width: 100%; height: 90%;"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import qs from 'qs'
import Bus from '@/utils/bus'
import echarts from 'echarts'

export default {
  data () {
    return {
      areaSelectedOptions: [],
      props: {
        value: 'dictKey',
        label: 'zhCn',
        checkStrictly: true,
        expandTrigger: 'hover',
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level } = node
          if (level === 0) {
            const dictionariesList = [{
              zhCn: '广东省',
              id: '440000',
              parentId: '0',
              dictKey: '440000',
              dictValue: '440000'
            }]
            return resolve(dictionariesList)
          }
          const res = await axios.get(
            `/api/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${node.data.dictKey}`
          )
          res.dictionariesList.forEach(
            item => (item.leaf = level >= 2)
          )
          return resolve(res.dictionariesList)
        }
      },
      secondnormList: [],
      domId: '',

      timeOptions: [
        {
          value: '2019',
          label: '2019'
        },
        {
          value: '2018',
          label: '2018'
        },
        {
          value: '2017',
          label: '2017'
        },
        {
          value: '2016',
          label: '2016'
        },
        {
          value: '2015',
          label: '2015'
        },
        {
          value: '2014',
          label: '2014'
        },
        {
          value: '2013',
          label: '2013'
        }
      ],
      time: '2019',

      params: {
        cantonProvince: '440000', // 省
        cantonCity: '', // 市
        cantonArea: '' // 区
      },

      tableList: [],
      allIndexNumber: '',
      oneIndexNumber: '',
      twoIndexNumber: '',
      threeIndexNumber: '',

      yileiName: '',
      erleiList: [],

      isShowMenu: ''
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    // 锚点定位
    goAnchor (selector) {
      var anchor = this.$el.querySelector(selector)
      this.$nextTick(() => {
        if (this.secondnormList.length < 6) {
          document.querySelector('.thirdnormBigBox').scrollTop
            = anchor.offsetTop - 216
        } else if (this.secondnormList.length > 5) {
          document.querySelector('.thirdnormBigBox').scrollTop
            = anchor.offsetTop - 432
        }
      })
    },
    // 背景图片动态生成
    bgimgData (index) {
      if (index == 0) {
        let src = require('@/assets/images/jcpgyj/erji01.png')
        return {
          backgroundImage: 'url(' + src + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }
      } else if (index == 1) {
        let src = require('@/assets/images/jcpgyj/erji02.png')
        return {
          backgroundImage: 'url(' + src + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }
      } else if (index == 2) {
        let src = require('@/assets/images/jcpgyj/erji03.png')
        return {
          backgroundImage: 'url(' + src + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }
      } else if (index == 3) {
        let src = require('@/assets/images/jcpgyj/erji04.png')
        return {
          backgroundImage: 'url(' + src + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }
      } else if (index == 4) {
        let src = require('@/assets/images/jcpgyj/erji05.png')
        return {
          backgroundImage: 'url(' + src + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }
      } else if (index == 5) {
        let src = require('@/assets/images/jcpgyj/erji06.png')
        return {
          backgroundImage: 'url(' + src + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }
      }
    },
    // 字体颜色动态生成
    colorRgb (index) {
      if (index == 0) {
        return { color: '#5290f2' }
      } else if (index == 1) {
        return { color: '#29dad3' }
      } else if (index == 2) {
        return { color: '#f678b2' }
      } else if (index == 3) {
        return { color: '#4dcef0' }
      } else if (index == 4) {
        return { color: '#f1a051' }
      } else if (index == 5) {
        return { color: '#51d054' }
      }
    },
    // 背景颜色动态生成
    bgcolorRgb (index) {
      console.log(index)
      if (index == 0) {
        return { background: '#5290f2' }
      } else if (index == 1) {
        return { background: '#29dad3' }
      } else if (index == 2) {
        return { background: '#f678b2' }
      } else if (index == 3) {
        return { background: '#4dcef0' }
      } else if (index == 4) {
        return { background: '#f1a051' }
      } else if (index == 5) {
        return { background: '#51d054' }
      }
    },
    // 跳转指标
    goIndex (item) {
      // this.$message.warning("待跳转...");
    },
    handleCJFKServiceClick (index) {
      this.$store.dispatch('jcpgyj/setCJFKServiceType', index)

      if (index === 0) {
        let title = '预留规模台账监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=0'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 0 }
        })
      } else if (index === 1) {
        let title = '拆旧复垦指标调整汇总监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=1'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 1 }
        })
      } else if (index === 2) {
        let title = '预留规模回填复垦区监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=2'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 2 }
        })
      } else if (index === 3) {
        let title = '城乡建设用地预留规模监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=3'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 3 }
        })
      } else if (index === 4) {
        let title = '已验收拆旧复垦项目监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=4'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 4 }
        })
      }
    },

    // 指标雷达图
    targetRadarDrawLine () {
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementById('targetRadarChart').style.width = 100 + '%'
          document.getElementById('targetRadarChart').style.height = 90 + '%'
          let targetRadarChart = echarts.init(
            document.getElementById('targetRadarChart')
          )
          targetRadarChart.resize() // 直接加这句即可
        }, 0)
        let targetRadarChart = echarts.init(
          document.getElementById('targetRadarChart')
        )
        let params = this.params
        this.$get(
          '/epf-monitor-evaluation/dynamicMonitor/getImIndexCount',
          params
        ).then(res => {
          if (res.code == 0) {
            this.tableList = res.result.fjIndex

            function sum (arr) {
              return eval(arr.join('+'))
            }

            this.allIndexNumber = sum(this.tableList)
            this.oneIndexNumber = this.tableList[0]
            this.twoIndexNumber = this.tableList[1]
            this.threeIndexNumber = this.tableList[2]
            if (!this.twoIndexNumber) {
              this.twoIndexNumber = 0
            }
            if (!this.threeIndexNumber) {
              this.threeIndexNumber = 0
            }
            console.log(this.tableList)

            let chartData = res.result.oneLevelIndex
            var indicatorData = []
            var valueData = []
            for (var key in chartData) {
              indicatorData.push({
                name: chartData[key].name,
                max: chartData[key].count + 100
              })
              valueData.push(chartData[key].count)
            }
            console.log(indicatorData)

            var option = {
              tooltip: {},

              legend: {
                data: ['指标数量'],
                top: 0,
                right: 0,
                icon: 'line',
                itemWidth: 14, // 图例标记的图形宽度。
                itemHeight: 5 // 图例标记的图形高度。
              },

              radar: {
                // shape: 'circle',//圆形雷达
                splitNumber: 4, // 雷达图圈数设置
                name: {
                  textStyle: {
                    color: '#5290F2',
                    fontSize: 10
                  }
                },

                indicator: indicatorData,
                radius: 65
              },

              series: [
                {
                  name: '指标数量',
                  type: 'radar',
                  // areaStyle: {normal: {}},
                  data: [
                    {
                      value: valueData,
                      name: '指标数量',
                      itemStyle: {
                        normal: {
                          color: '#5290F2',
                          lineStyle: {
                            color: '#5290F2'
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            }
            targetRadarChart.setOption(option, true)
          } else {
            // this.allIndexNumber = 0;
            // this.oneIndexNumber = 0;
            // this.twoIndexNumber = 0;
            // this.threeIndexNumber = 0;
            // let valueData = [];
            // this.$message.warning("暂时没有数据"); //失败
            return
          }
        })
      })
    },
    // 指标预警状态总览
    targetBarDrawLine () {
      setTimeout(() => {
        let targetBarChart = echarts.init(
          document.getElementById('targetBarChart')
        )
        document.getElementById('targetBarChart').style.width = 100 + '%'
        document.getElementById('targetBarChart').style.height = 90 + '%'
        targetBarChart.resize() // 直接加这句即可
      }, 0)
      let targetBarChart = echarts.init(
        document.getElementById('targetBarChart')
      )

      var xData = ['开放', '创新', '共享', '协调', '安全', '绿色']
      var legendData = ['健康', '轻度预警', '中度预警', '严重预警', '缺失']
      var colorData = ['#51d054', '#f6d521', '#f19235', '#f94f4f', '#d2d2d2']

      var jiankanData = []
      var qingduData = []
      var zhongduData = []
      var yanzhongData = []
      var queshiData = []

      for (var i = 0; i < xData.length; i++) {
        jiankanData[i] = Math.round(Math.random() * 100)
        qingduData[i] = Math.round(Math.random() * 100)
        zhongduData[i] = Math.round(Math.random() * 100)
        yanzhongData[i] = Math.round(Math.random() * 100)
        queshiData[i] = Math.round(Math.random() * 100)
      }

      var seriesAllData = [
        jiankanData,
        qingduData,
        zhongduData,
        yanzhongData,
        queshiData
      ]

      var series = []
      for (var i = 0; i < xData.length; i++) {
        series.push({
          name: legendData[i],
          type: 'bar',
          stack: 'a',
          barWidth: '30%',
          data: seriesAllData[i], // 数据
          itemStyle: {
            normal: {
              color: colorData[i]
            }
          }
        })
      }

      targetBarChart.setOption({
        color: colorData,
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
          bottom: '5%',
          top: '15%',
          containLabel: true
        },
        legend: {
          data: legendData,
          top: 0,
          // right: 30,
          x: 'center',
          textStyle: {
            color: '#555',
            fontSize: 14
          },
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
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
            // name: "单位：公顷",
            type: 'value',
            // interval: Math.ceil(maxAllData / 5), // y轴分段
            // max: Math.ceil(maxAllData), // 最大值
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
      })
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        let targetRadarChart = echarts.init(
          document.getElementById('targetRadarChart')
        )
        document.getElementById('targetRadarChart').style.width = 100 + '%'
        document.getElementById('targetRadarChart').style.height = 90 + '%'
        targetRadarChart.resize()

        let targetBarChart = echarts.init(
          document.getElementById('targetBarChart')
        )
        document.getElementById('targetBarChart').style.width = 100 + '%'
        document.getElementById('targetBarChart').style.height = 90 + '%'
        targetBarChart.resize()
      })
    },
    // 城市三级联动
    areaSelect () {
      this.params.cantonProvince = this.areaSelectedOptions[0]
      this.params.cantonCity = this.areaSelectedOptions[1]
      this.params.cantonArea = this.areaSelectedOptions[2]
    },
    // 获取监测指标树结构数据
    getIndexTreeList () {
      let params = this.params
      this.$get(
        '/epf-monitor-evaluation/dynamicMonitor/getTreeInfo',
        params
      ).then(res => {
        if (res.code == 0) {
          // 一类名称
          this.yileiName = res.result.name
          // 二类指标
          var erleiList = res.result.childs
          this.secondnormList = erleiList
          for (var key in this.secondnormList) {
            if (this.secondnormList[key].childs) {
              let index = key

              this.secondnormList[index]['number'] = 0
              for (var k in this.secondnormList[index].childs) {
                this.secondnormList[index]['number'] += this.secondnormList[
                  index
                ].childs[k].indexs.length
              }
            }
          }
          console.log(this.secondnormList)
        } else {
          // this.secondnormList = [];
          // this.$message.warning("暂时没有数据"); //失败
          return
        }
      })
    }
  },
  created () {
    this.getIndexTreeList()
    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })
  },
  mounted () {
    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })
    this.$nextTick(function () {
      setTimeout(() => {
        this.targetRadarDrawLine()
        this.targetBarDrawLine()
      }, 1000)
    })
    this.initEchart()
  },
  watch: {
    'params.cantonProvince': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getIndexTreeList()
        this.targetRadarDrawLine()
        this.targetBarDrawLine()
      }
    },
    'params.cantonCity': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getIndexTreeList()
        this.targetRadarDrawLine()
        this.targetBarDrawLine()
      }
    },
    'params.cantonArea': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getIndexTreeList()
        this.targetRadarDrawLine()
        this.targetBarDrawLine()
      }
    },
    isShowMenu: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.targetRadarDrawLine()
            this.targetBarDrawLine()
          }, 0)
        })
      }
    }
  }
}
</script>
<style scoped>
.page-body {
  padding: 0 15px 15px;
  background-color: #f7f7f7;
}
#normBox {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.normTitleBox {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.normTitle {
  font-size: 16px;
  line-height: 50px;
  font-weight: bolder;
  color: #000;
  width: 60%;
}
.normContentTitle {
  font-size: 16px;
  text-align: center;
  color: #333;
  font-weight: bold;
}
.normNumberBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
}
.normNumber {
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.normNumber img {
  width: 21px;
  height: 21px;
  margin-right: 10px;
}
.secondnormBox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  /* box-shadow:0 5px 10px -5px rgb(134, 134, 134); */
}
.secondnormLittleBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 19%;
  height: 80px;
  margin-right: 1.25%;
  margin-bottom: 1.25%;
  cursor: pointer;
}
.secondnormBox li:nth-child(5n) {
  margin-right: 0;
}
.secondnormLittleTitle {
  font-size: 18px;
  color: #fff;
  margin-bottom: 5px;
}
.secondnormLittleNumber {
  font-size: 14px;
  color: #fff;
}
.thirdnormBigBox {
  padding: 0 10px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.thirdnormBigBox::-webkit-scrollbar {
  display: none;
}
.thirdnormBox {
  width: 100%;
  /* border: 1px solid #999; */
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgb(134, 134, 134);
  margin-bottom: 20px;
}
.thirdnormTitle {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #fff;
  background-color: #5290f2;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.thirdnormContentBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 10px 10px;
  width: 100%;
}
.thirdnormContentBoxUl {
  width: 100%;
}
.thirdnormContentTitleUl {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}
.thirdnormTitleName {
  font-size: 16px;
  color: #5290f2;
  line-height: 50px;
}
.thirdnormTitleIcon {
  width: 5px;
  height: 5px;
  display: inline-block;
  background-color: #5290f2;
  margin-right: 10px;
  border-radius: 5px;
  margin-bottom: 4px;
}
.thirdnormContentTitleLi {
  padding: 10px;
  background-color: #eeeeee;
  width: 15.625%;
  height: 50px;
  margin-right: 1.25%;
  margin-bottom: 1.25%;
  font-size: 12px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  cursor: pointer;
}
.thirdnormContentTitleUl li:nth-child(6n) {
  margin-right: 0;
}
.thirdnormContentBoxT {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px 10px;
  width: 100%;
}
.thirdnormContentBoxUlT {
  width: 14.5%;
  padding: 0 10px;
}
.thirdnormContentTitleT {
  width: 100%;
  display: flex;
}
.thirdnormContentTitleUlT {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.thirdnormContentTitleLiT {
  padding: 10px;
  background-color: #eeeeee;
  width: 100%;
  height: 50px;
  /* margin-right: 1.25%; */
  margin-bottom: 1.25%;
  font-size: 12px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  cursor: pointer;
}
.headerpop {
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  line-height: 30px;
}
.box-body {
  width: 100%;
  /* overflow: auto; */
}
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  padding: 15px 15px 0 15px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  background: #fff;
  width: 60%;
  /* overflow: auto; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
.switchHeight_box {
  padding-top: 28px;
  padding-bottom: 25px;
  transition: 0.5s;
  background: #fff;
  border: 1px solid #ebeef5;
}
.filterWrap {
  display: flex;
  width: 100%;
  flex: 1;
  overflow: hidden;
  background-color: #f7f7f7;
}
.filterWrapRight {
  box-sizing: border-box;

  width: 40%;
  /* flex: 1; */

  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.filterWrapRightTop {
  width: 100%;
  height: 18%;
  background-color: #fff;
  margin-bottom: 20px;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  padding: 10px 15px 5px 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.jcBBox {
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
.jcBox {
  width: 40%;
  height: 30px;
  border: 2px solid #f94f4f;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.jcBox span {
  color: #fff;
  font-size: 14px;
  width: 60%;
  height: 102%;
  text-align: center;
  line-height: 26px;
  display: inline-block;
  background-color: #f94f4f;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  box-sizing: border-box;
}
.jcBox i {
  font-size: 14px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.filterWrapRightMiddle {
  width: 100%;
  height: 44%;
  display: flex;
  justify-content: space-around;
}
.filterWrapRightML {
  width: 50%;
  height: 100%;
  background-color: #fff;
  margin-right: 20px;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.zbBBox {
  display: flex;
  flex-wrap: wrap;
  height: 90%;
  overflow: hidden;
}
.zbBox {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.zbBox img {
  width: 40px;
  height: 40px;
}
.zbName {
  flex: 1;
  height: 16px;
  font-size: 12px;
}
.filterWrapRightMR {
  width: 50%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
}
.filterWrapRightBottom {
  width: 100%;
  height: 38%;
  background-color: #fff;
  margin-top: 20px;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
}
.checkTitleBox {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.checkTitleIcon {
  width: 4px;
  height: 16px;
  display: block;
  background-color: #1082c2;
  margin-right: 10px;
}
.checkTitle {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
@media screen and (max-width: 1600px) {
  #normBox {
    height: 772px;
  }
}
</style>
<style>
#normBox .el-input__inner {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
}
#normBox .el-icon-arrow-up:before {
  color: #fff;
}
#normBox .el-icon-arrow-down:before {
  color: #fff;
}
#normBox .el-input__icon {
  color: #fff;
}
#normBox .el-input__inner::placeholder {
  color: #fff;
  font-size: 12px;
}
</style>
