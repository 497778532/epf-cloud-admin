<template>
  <el-container id="main-container">
    <el-main id="main">
      <keep-alive>
        <epf-mapview name="mapapp99"
                     :delay="1"
                     :widgetConf="widgetConf"
                     @viewLoaded="getMapApp">
          <div class="toolbar">
            <jumpto-item @changeCity="handleCityChange"></jumpto-item>
            <zoom-item></zoom-item>
            <pan-item></pan-item>
          </div>
        </epf-mapview>
      </keep-alive>
      <transition name="el-zoom-in-bottom">
        <div id="chartsPanel"
             v-show="isChartsPanelShow">
          <div class="chart-item">
            <div height="30"
                 class="chart-header">
              <div class="title-line"></div>
              <div class="title-text">空间分布</div>
            </div>
            <div style="width:100%;height:calc(100% - 50px);">
              <div class="chart-main"
                   id="chart-bar"
                   style="width:100%;height:100%;"></div>
            </div>
          </div>

          <div class="chart-item">
            <div height="30"
                 class="chart-header">
              <div class="title-line"></div>
              <div class="title-text">历年变化</div>
            </div>
            <div style="width:100%;height:calc(100% - 50px);">
              <div class="chart-main"
                   id="chart-change"
                   style="width:100%;height:100%;"></div>
            </div>
          </div>
          <div :style="bgimgData('hide')"
               class="hide-button"
               @click="hidingChartPanel"></div>
        </div>
      </transition>
    </el-main>

    <el-aside id="aside">
      <el-container>
        <el-header id="aside-header"
                   style="height: 40px;">
          <div style="margin: 12px 15px; font-size: 18px; font-weight: bolder; line-height: 14px;">预警指标</div>
        </el-header>
        <el-main id="aside-main">
          <el-collapse @change="hidingChartPanel">
            <el-collapse-item class="monitor-moudle">
              <template slot="title">
                <div class="title-icon__custom">
                  <img src="@/assets/icon3.png"
                       alt />
                </div>
                {{moMoudletitle}}
              </template>
              <div class="monitor-list">
                <div class="monitor-item"
                     v-for="(item, index) in moItems"
                     :key="index"
                     @click="handleMoItemClick(index)"
                     ref="item">
                  <div style="margin-top: 13px;">
                    <div class="moItemTitle">{{item.title}}</div>

                    <div v-if="isWarning(item)"
                         class="is-warning">
                      <div :style="bgimgData('flag')"
                           class="flag">
                        <p class="warning-text">预警</p>
                      </div>
                    </div>
                  </div>

                  <p>
                    <span class="curVal"
                          ref="curVal">{{item.curVal}}</span>
                    <span class="moUnit">{{moUnit}}</span>
                  </p>
                  <p>
                    <span>规划目标（2035）</span>
                    <span class="expVal">{{item.expVal}}</span>
                    <span class="moUnit">{{moUnit}}</span>
                  </p>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse @change="hidingChartPanel">
            <el-collapse-item class="monitor-moudle">
              <template slot="title">
                <div class="title-icon__custom">
                  <img src="@/assets/icon4.png"
                       alt />
                </div>繁荣国土（6）
              </template>
            </el-collapse-item>
            <el-collapse-item class="monitor-moudle">
              <template slot="title">
                <div class="title-icon__custom">
                  <img src="@/assets/icon5.png"
                       alt />
                </div>美丽国土（5）
              </template>
            </el-collapse-item>
            <el-collapse-item class="monitor-moudle">
              <template slot="title">
                <div class="title-icon__custom">
                  <img src="@/assets/icon6.png"
                       alt />
                </div>和谐国土（9）
              </template>
            </el-collapse-item>
          </el-collapse>
        </el-main>
      </el-container>
    </el-aside>
  </el-container>
</template>
<script>
import echarts from 'echarts'
import ZoomItem from './../../onemap/toolbarItem/zoom'
import PanItem from './../../onemap/toolbarItem/pan/widget'
import JumptoItem from './../../onemap/toolbarItem/jumpTo/widget'
export default {
  name: 'EarlyWarningCenter',
  data () {
    return {
      locName: '广东省',
      locOpt: [],
      moMoudleText: '安全国土',
      moMoudleCount: 14,
      moUnit: '万km²',
      moItems: [
        {
          title: '永久基本农田保护线',
          curVal: 4.21, // 当前值
          expVal: 4.52 // 规划目标值
        },
        {
          title: '生态保护红线',
          curVal: 4.21,
          expVal: 4.52
        },
        {
          title: '城镇开发边界',
          curVal: 5.2,
          expVal: 4.52
        }
      ],
      isChartsPanelShow: false,
      cityData: {},
      isActive: false,
      widgetConf: {
        widgets: []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.drawChartBar()
        this.drawChartChange()
      }, 1000)
    })
    this.initEchart()
  },
  methods: {
    handleCityChange (code) {
      this.handleSelectChange(code)
    },
    handleMoItemClick (index) {
      let moItemDom = this.$refs.item[index]
      this.isChartsPanelShow = !this.isChartsPanelShow
      this.$refs.item.forEach((item, i) => {
        if (i !== index) {
          item.classList.remove('itemActive')
        }
      })

      if (moItemDom.classList.contains('itemActive')) {
        moItemDom.classList.remove('itemActive')
      } else {
        moItemDom.classList.add('itemActive')
        this.isChartsPanelShow = true
      }

      if (this.isChartsPanelShow) {
        this.dataFaker()
      }
    },
    hidingChartPanel () {
      this.isChartsPanelShow = false
    },
    handleRefreshClick () {
      if (this.isChartsPanelShow) {
        this.dataFaker()
      }
    },
    dataFaker () {
      let historyData = []
      let areaData = []

      var num = 2
      for (let i = 0; i < 12; i++) {
        historyData.push(
          (Math.floor((num += parseFloat((0.05 + Math.random() * 0.2))) * 100) / 100)
        )
      }
      let len = this.cityData.districtName.length
      for (let i = 0; i < len; i++) {
        areaData.push(Math.round(100 + Math.random() * 400))
      }
      this.cityData.areaData = areaData
      this.cityData.historyData = historyData
      this.drawChartBar()
      this.drawChartChange()
    },
    handleSelectChange (code) {
      let that = this
      this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
        parentId: code
      }).then(res => {
        let districtName = []
        if (res.code === 0) {
          let lst = res.dictionariesList
          if (lst.length === 0) {
            if (code === '442000') {
              lst = [
                { zhCn: '石岐街道' },
                { zhCn: '南区街道' },
                { zhCn: '港口镇' },
                { zhCn: '东升镇' },
                { zhCn: '东区街道' },
                { zhCn: '西区街道' },
                { zhCn: '阜沙镇' },
                { zhCn: '南头镇' },
                { zhCn: '东凤镇' },
                { zhCn: '小榄镇' },
                { zhCn: '横栏镇' },
                { zhCn: '大涌镇' },
                { zhCn: '板芙镇' },
                { zhCn: '神湾镇' },
                { zhCn: '三角镇' },
                { zhCn: '三乡镇' },
                { zhCn: '坦洲镇' },
                { zhCn: '五桂山街道' },
                { zhCn: '火炬高技术产业开发区' },
                { zhCn: '南朗镇' },
                { zhCn: '民众镇' }
              ]
            } else if (code === '441900') {
              lst = [
                { zhCn: '东城街道' },
                { zhCn: '万江街道' },
                { zhCn: '莞城街道' },
                { zhCn: '常平镇' },
                { zhCn: '南城街道' },
                { zhCn: '厚街镇' },
                { zhCn: '樟木头镇' },
                { zhCn: '虎门镇' },
                { zhCn: '长安镇' },
                { zhCn: '大朗镇' },
                { zhCn: '塘厦镇' },
                { zhCn: '大朗镇' },
                { zhCn: '凤岗镇' },
                { zhCn: '清溪镇' },
                { zhCn: '谢岗镇' },
                { zhCn: '桥头镇' },
                { zhCn: '谢岗镇' },
                { zhCn: '石龙镇' },
                { zhCn: '谢岗镇' },
                { zhCn: '石碣镇' },
                { zhCn: '高埗镇' },
                { zhCn: '中堂镇' },
                { zhCn: '洪梅镇' },
                { zhCn: '麻涌镇' },
                { zhCn: '沙田镇' },
                { zhCn: '茶山镇' },
                { zhCn: '企石镇' },
                { zhCn: '横沥镇' },
                { zhCn: '寮步镇' },
                { zhCn: '东坑镇' },
                { zhCn: '石排镇' },
                { zhCn: '大岭山镇' }
              ]
            }
          }
          lst.forEach(district => {
            districtName.push(district.zhCn)
          })
        }
        that.cityData = {
          districtName: districtName
        }
        that.dataFaker()
      })
    },
    bgimgData (imgName) {
      let src
      if (imgName === 'hide') {
        src = require('@/assets/images/jcpgyj/hide-button.png')
      } else if (imgName === 'flag') {
        src = require('@/assets/images/jcpgyj/warning-flag.png')
      }
      return {
        backgroundImage: 'url(' + src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }
    },
    isWarning ({ _, curVal, expVal }) {
      return curVal >= expVal
    },
    drawChartBar () {
      setTimeout(() => {
        let chartbar = echarts.init(
          document.getElementById('chart-bar')
        )
        document.getElementById('chart-bar').style.width = 100 + '%'
        document.getElementById('chart-bar').style.height = 100 + '%'
        chartbar.resize() // 直接加这句即可
      }, 0)
      let chartbar = echarts.init(document.getElementById('chart-bar'))
      let districtName = this.cityData.districtName || []
      let areaData = this.cityData.areaData || []
      let option = {
        color: ['#5582EA'],
        tooltip: {
          trggier: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          top: '10%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: districtName,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: districtName.length > 25 ? 2 : 0,
              // rotate: -45,
              formatter: function (value) {
                return value.split('').join('\n')
              }
            }
          }
        ],
        yAxis: [
          {
            name: '单位：km²',
            type: 'value'
          }
        ],
        series: [
          {
            name: '面积（km²）',
            type: 'bar',
            barWidth: '80%',
            data: areaData
          }
        ]
      }
      chartbar.setOption(option)
    },
    drawChartChange () {
      setTimeout(() => {
        let chartchange = echarts.init(
          document.getElementById('chart-change')
        )
        document.getElementById('chart-change').style.width = 100 + '%'
        document.getElementById('chart-change').style.height = 100 + '%'
        chartchange.resize() // 直接加这句即可
      }, 0)
      let chartchange = echarts.init(document.getElementById('chart-change'))
      let historyData = this.cityData.historyData || []
      let warningVal = Math.max.apply(null, historyData) + 0.2
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        itemStyle: {
          color: '#70B603'
        },
        lineStyle: {
          color: '#70B603'
        },
        areaStyle: {
          color: '#E5FBC3'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          top: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [
              '2008',
              '2009',
              '2010',
              '2011',
              '2012',
              '2013',
              '2014',
              '2015',
              '2016',
              '2017',
              '2018',
              '2019',
              '',
              '',
              '2035'
            ]
          }
        ],
        yAxis: [
          {
            name: '单位：km²',
            type: 'value',
            max: 5
          }
        ],
        series: [
          {
            name: '面积',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: historyData,
            markLine: {
              label: {
                show: false
              },
              symbol: 'none',
              data: [
                [{ x: '2035', y: 0 }, { y: warningVal }],
                { yAxis: warningVal }
              ],
              lineStyle: {
                type: 'solid',
                color: '#F59A23'
              }
            }
          }
        ]
      }
      chartchange.setOption(option)
    },
    initEchart () {
      window.addEventListener('resize', () => {
        let chartchange = echarts.init(
          document.getElementById('chart-change')
        )
        document.getElementById('chart-change').style.width = 100 + '%'
        document.getElementById('chart-change').style.height = 100 + '%'
        chartchange.resize() // 直接加这句即可

        let chartbar = echarts.init(
          document.getElementById('chart-bar')
        )
        document.getElementById('chart-bar').style.width = 100 + '%'
        document.getElementById('chart-bar').style.height = 100 + '%'
        chartbar.resize() // 直接加这句即可
      })
    }
  },
  computed: {
    moMoudletitle () {
      return `${this.moMoudleText}(${this.moMoudleCount})`
    }
  },
  components: { ZoomItem, PanItem, JumptoItem },
  created () {
    this.handleSelectChange(440000)
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
#main-container {
  height: 100%;
  width: 100%;
  padding: 20px;
  font-size: 16px;
}

#main {
  position: relative;
  background: #e9eef3;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}

#aside {
  width: 330px;
  margin-left: 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}

#chartsPanel {
  position: absolute;
  padding: 0 20px;
  bottom: 0px;
  left: 0px;
  height: 370px;
  width: 100%;
  display: flex;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}

.chart-item {
  width: 50%;
  height: 100%;
}
.chart-header {
  font-weight: bold;
  margin: 10px 0px;
  padding: 0;
  display: flex;
}
/* .chart-main {
  width: 600px;
  height: 320px;
} */

.button-list {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}

#aside >>> .el-collapse {
  border: unset;
  overflow: hidden;
}

.monitor-moudle >>> .el-collapse-item__header {
  margin-left: 10px;
  font-size: 16px;
}

.monitor-item {
  position: relative;
  overflow: hidden;
  height: 120px;
  width: 260px;
  background: #fafafa;
  border-radius: 3px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: left;
  padding-left: 10px;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
}

.monitor-item:hover,
.monitor-item:active,
.itemActive {
  background: #d4ebff;
}

.monitor-item .curVal {
  font-size: 24px;
  font-weight: bold;
  color: #ffa200;
}

.monitor-item .expVal {
  font-size: 18px;

  font-weight: bold;
}
.monitor-item .moUnit {
  color: #707070;
}

.monitor-item .moItemTitle {
  margin-top: 10px;
  font-weight: bold;
  font-size: 16px;
}

.monitor-item .is-warning {
  position: absolute;
  right: 10px;
  top: 0px;
  width: 40px;
  height: 50px;
  text-align: center;
  color: #fff;
}

.flag {
  height: 53px;
  width: 42px;
  position: absolute;
}

.hide-button {
  height: 25px;
  width: 25px;
  position: absolute;
  right: 15px;
  top: 10px;
}
.title-icon__custom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 24px;
  height: 24px;
}

.monitor-item .is-warning .warning-text {
  margin-top: 10px;
}
.title-line {
  width: 6px;
  height: 24px;
  display: block;
  background-color: #50b8ef;
  margin-right: 10px;
}
.title-text {
  color: #202020;
  font-size: 18px;
  position: static;
}
</style>
