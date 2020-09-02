<template>
  <div id="main-content">
    <div class="top-main">
      <div id="result"
           class="grid">
        <div class="header">
          <div class="title-icon1"></div>
          <div class="title-text1">
            <span>评估结果</span>
          </div>
          <div class="subtitle-text">
            <span>（评估版本：20191029v1.0）</span>
          </div>
          <div class="action-bar">
            <el-select v-model="locName"
                       placeholder="请选择"
                       size="small"
                       class="picker"
                       @change="handleSelectChange">
              <el-option v-for="item in locOpt"
                         :key="item.code"
                         :label="item.name"
                         :value="item.code"></el-option>
            </el-select>
            <el-select v-model="yearName"
                       placeholder="请选择"
                       size="small"
                       class="picker"
                       @change="handleYearChange">
              <el-option v-for="item in yearOpt"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <div class="newButton"
                 @click="newPG">新增评估</div>
          </div>
        </div>
        <div class="main0"
             id="result-panel">
          <div id="scroe-panel"
               style="width:290px;min-width:290px;max-width:290px;height:400px;min-height:400px;max-height:400px;">
            <div id="scroe-result">
              <div class="scroe-circle"
                   :style="bgimgData()">
                <div class="scroe-number">78</div>
                <div class="scroe-text">评估分数</div>
              </div>
              <div class="reportButton"
                   @click="handleReportClick">查看评估报告</div>
              <el-row class="report-box-list">
                <el-col :span="12"
                        class="report-box"
                        @click.native="checkIndex('good')">
                  <div>达标指数</div>
                  <div>148项</div>
                </el-col>

                <el-col :span="12"
                        class="report-box"
                        @click.native="checkIndex('bad')">
                  <div>不达标指数</div>
                  <div>26项</div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="width:calc(100% - 290px);height:100%; display: flex;justify-content: space-between;align-items: center;">
            <div id="scroe-radar"
                 style="width:50%;height:100%;"></div>
            <div id="scroe-bar"
                 style="width:50%;height:100%;"></div>
          </div>
        </div>
      </div>
      <!-- <div style="width:16px;min-width:16px;max-width:16px;height:100%;"></div> -->
      <div id="analyst"
           class="grid1">
        <div class="header">
          <div class="title-icon1"></div>
          <div class="title-text1">
            <span>指标分析</span>
          </div>
        </div>
        <div class="main1">
          <div id="item-bar"
               style="width:100%;height:50%;"></div>
          <div id="ratio-bar"
               style="width:100%;height:50%;"></div>
        </div>
      </div>
    </div>
    <!-- <div style="width:100%;height:16px;min-height:16px;max-height:16px;"></div> -->
    <div class="bottom-main">
      <div id="statistics"
           class="grid">
        <div class="header">
          <div class="title-icon1"></div>
          <div class="title-text1">
            <span>指标区域分析</span>
          </div>
        </div>
        <div class="main2">
          <div id="stat-bar"
               style="width:100%;height:100%;"></div>
        </div>
      </div>
      <!-- <div style="width:16px;min-width:16px;max-width:16px;height:100%;"></div> -->
      <div id="unqualified"
           class="grid1 EPF-table">
        <div class="header">
          <div class="title-icon1"></div>
          <div class="title-text1">
            <span>不达标指标</span>
          </div>
        </div>
        <div class="main2">
          <div id="unqualified-panel"
               style="width:100%;height:calc(100% - 40px);padding-top:20px;">
            <el-table :data="tableData"
                      class="table"
                      size="mini"
                      border
                      stripe>
              <el-table-column type="index"
                               label="序号"
                               width="80px"
                               align="center"></el-table-column>
              <el-table-column prop="name"
                               label="指标名称"
                               align="center"
                               min-width="150px"></el-table-column>
              <el-table-column prop="value"
                               label="指标值"
                               align="center"
                               min-width="60px"></el-table-column>
              <el-table-column label="达标率"
                               align="center"
                               min-width="80px">
                <template slot-scope="scope">
                  <div v-if="scope.row.ratio >= scope.row.value">
                    <span style="margin-left: 10px; color: green">{{ scope.row.ratio }}</span>
                    <i class="el-icon-caret-top increase"></i>
                  </div>
                  <div v-else>
                    <span style="margin-left: 10px; color: red">{{ scope.row.ratio }}</span>
                    <i class="el-icon-caret-bottom decrease"></i>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AssessCenter',
  data () {
    return {
      assessVer: '20191029v1.0',
      locName: '广东省',
      yearName: 2019,
      locOpt: [],
      cityData: {},
      fourIndexScroe: {
        flourish: 70, // 繁荣国土
        beautiful: 100, // 美丽国土
        harmonious: 90, // 和谐国土
        security: 80 // 安全国土
      },
      fourIndexCount: {
        flourish: 42, // 繁荣国土
        beautiful: 27, // 美丽国土
        harmonious: 17, // 和谐国土
        security: 12 // 安全国土
      },
      percentOfPass: [12, 25, 38, 32, 50],
      yearOpt: [
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
        }
      ],
      tableData: [
        {
          name: '公路网密度',
          value: '70%',
          ratio: '60%'
        },
        {
          name: '铁路网密度',
          value: '40%',
          ratio: '50%'
        },
        {
          name: '乡村公交覆盖率',
          value: '70%',
          ratio: '60%'
        }
        // {
        //   name: '乡村污水处理率',
        //   value: '70%',
        //   ratio: '60%'
        // },
        // {
        //   name: '城市人均综合用水量',
        //   value: '70%',
        //   ratio: '60%'
        // },
        // {
        //   name: '自然岸线保有率',
        //   value: '70%',
        //   ratio: '60%'
        // }
      ],
      isShowMenu: ''
    }
  },
  mounted () {
    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })
    this.initEchart()
    this.$nextTick(() => {
      setTimeout(() => {
        this.drawScroeRadar()
        this.drawScroeBar()
        this.drawStatBar()
        this.drawItemBar()
        this.drawRatioBar()
      }, 1000)
    })
  },
  methods: {
    ...mapActions(['setTabsList']),
    newPG () {
      this.$router.push({ name: 'xzpg' })
    },
    checkIndex (item) {
      // if (item === "good") {
      //   // this.$router.push({ name: "xzpg" });
      // } else if (item === "bad") {
      //   // this.$router.push({ name: "xzpg" });
      // }
      // console.log('jcpgyj-pgxq')
      // let routerPath = 'jcpgyj-pgxq'
      // this.$router.push({ path: routerPath })
      let title = '评估报告'
      let routerPath = 'AssessReport'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath
      })
    },
    handleReportClick () {
      // this.$router.push({ name: "xzpg" });
    },
    bgimgData () {
      let src = require('@/assets/images/jcpgyj/score-ball.png')
      return {
        backgroundImage: 'url(' + src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }
    },
    handleReportClick () {
      let title = '评估报告'
      let routerPath = 'AssessReport'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath
      })
      // let routerPath = 'jcpgyj-pgxq'
      // this.$router.push({ path: routerPath })
    },
    initEchart () {
      window.addEventListener('resize', () => {
        // let chartDom,
        //   chart,
        //   chartList = [
        //     'scroe-radar',
        //     'scroe-bar',
        //     'stat-bar',
        //     'item-bar',
        //     'ratio-bar'
        //   ]
        // chartList.forEach(id => {
        //   chartDom = document.getElementById(id)
        //   chart = echarts.init(chartDom)
        //   chartDom.style.width = 100 + '%'
        //   chartDom.style.height = 90 + '%'
        //   chart.resize()
        // })
        let scroeradar = echarts.init(
          document.getElementById('scroe-radar')
        )
        document.getElementById('scroe-radar').style.width = 50 + '%'
        document.getElementById('scroe-radar').style.height = 100 + '%'
        scroeradar.resize() // 直接加这句即可

        let scroebar = echarts.init(
          document.getElementById('scroe-bar')
        )
        document.getElementById('scroe-bar').style.width = 50 + '%'
        document.getElementById('scroe-bar').style.height = 100 + '%'
        scroebar.resize() // 直接加这句即可

        let itembar = echarts.init(
          document.getElementById('item-bar')
        )
        document.getElementById('item-bar').style.width = 100 + '%'
        document.getElementById('item-bar').style.height = 50 + '%'
        itembar.resize() // 直接加这句即可

        let ratiobar = echarts.init(
          document.getElementById('ratio-bar')
        )
        document.getElementById('ratio-bar').style.width = 100 + '%'
        document.getElementById('ratio-bar').style.height = 50 + '%'
        ratiobar.resize() // 直接加这句即可

        let statbar = echarts.init(
          document.getElementById('stat-bar')
        )
        document.getElementById('stat-bar').style.width = 100 + '%'
        document.getElementById('stat-bar').style.height = 100 + '%'
        statbar.resize() // 直接加这句即可
      })
    },
    // 评估结果雷达图
    drawScroeRadar () {
      setTimeout(() => {
        let scroeradar = echarts.init(
          document.getElementById('scroe-radar')
        )
        document.getElementById('scroe-radar').style.width = 50 + '%'
        document.getElementById('scroe-radar').style.height = 100 + '%'
        scroeradar.resize() // 直接加这句即可
      }, 0)
      let scroeradar = echarts.init(document.getElementById('scroe-radar'))
      let value = []
      for (let item in this.fourIndexScroe) {
        value.push(this.fourIndexScroe[item])
      }

      let option = {
        grid: {
          left: '10%',
          right: '10%',
          bottom: '10%',
          containLabel: true,
          shadowColor: 'rgba(0,0,0,0.42)',
          shadowBlur: 11,
          shadowOffsetX: 1,
          shadowOffsetY: 5
        },
        radar: {
          splitNumber: 4,
          name: {
            textStyle: {
              color: 'black',
              fontSize: 14
            }
          },
          indicator: [
            { name: '繁荣', max: 100 },
            { name: '美丽', max: 100 },
            { name: '和谐', max: 100 },
            { name: '安全', max: 100 }
          ],
          radius: '60%'
        },
        series: [
          {
            name: '雷达图',
            type: 'radar',
            data: [
              {
                value: value,
                name: '指标数量',
                areaStyle: {
                  normal: {
                    color: 'rgba(61, 166, 207, 0.5)'
                  }
                },
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
      scroeradar.setOption(option)
    },
    drawScroeBar () {
      setTimeout(() => {
        let scroebar = echarts.init(
          document.getElementById('scroe-bar')
        )
        document.getElementById('scroe-bar').style.width = 50 + '%'
        document.getElementById('scroe-bar').style.height = 100 + '%'
        scroebar.resize() // 直接加这句即可
      }, 0)
      let fourIndexScroe = this.fourIndexScroe

      let scroe = [
        {
          itemStyle: { color: 'rgba(255,202,81,1)' },
          value: fourIndexScroe.flourish // 繁荣国土
        },
        {
          itemStyle: { color: 'rgba(94,210,28,1)' },
          value: fourIndexScroe.beautiful // 美丽国土
        },
        {
          itemStyle: { color: 'rgba(61,154,255,1)' },
          value: fourIndexScroe.harmonious // 和谐国土
        },
        {
          itemStyle: { color: 'rgba(156,82,234,1)' },
          value: fourIndexScroe.security // 安全国土
        }
      ]
      let scroe2 = []
      for (let item in this.fourIndexScroe) {
        scroe2.push(100 - this.fourIndexScroe[item])
      }
      let scroebar = echarts.init(document.getElementById('scroe-bar'))
      let option = {
        color: ['#51d054', '#f94f4f'],
        animation: false,
        tooltip: {
          show: false,
          trigger: 'none',
          showContent: 'none',
          triggerOn: 'none'
        },
        emphasis: {
          itemStyle: {}
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        label: {
          show: true,
          position: 'insideTopLeft',
          formatter: '{b}',
          offset: [0, -20],
          color: 'black'
        },
        xAxis: [{ type: 'value', show: false }],
        yAxis: [
          {
            show: false,
            type: 'category',
            data: ['繁荣', '美丽', '和谐', '安全'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        silent: true,
        series: [
          {
            type: 'bar',
            barWidth: '30%',
            stack: '得分',
            data: scroe
          },
          {
            type: 'bar',
            barWidth: '30%',
            stack: '得分',
            color: '#e9eef3',
            data: scroe2,
            label: {
              show: true,
              position: 'right',
              formatter: obj => {
                var num = 100 - obj.data
                return num + '分'
              },
              offset: [-30, -20],
              color: 'black'
            }
          }
        ]
      }
      scroebar.setOption(option)
    },
    // 指标区域统计
    drawStatBar () {
      setTimeout(() => {
        let statbar = echarts.init(
          document.getElementById('stat-bar')
        )
        document.getElementById('stat-bar').style.width = 100 + '%'
        document.getElementById('stat-bar').style.height = 100 + '%'
        statbar.resize() // 直接加这句即可
      }, 0)
      let statbar = echarts.init(document.getElementById('stat-bar'))
      let goodItem = this.cityData.goodItem
      let badItem = this.cityData.badItem
      let districtName = this.cityData.districtName
      let option = {
        color: ['#6FB600', '#F66C6C'],
        tooltip: {
          trggier: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: { data: ['达标', '不达标'], top: '0%', right: '1%' },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            type: 'category',
            data: districtName,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 'auto',
              rotate: 45 // 文字逆时针旋转45°
            }
          }
        ],
        yAxis: [
          {
            name: '单位：项',
            type: 'value'
          }
        ],
        series: [
          {
            name: '达标',
            type: 'bar',
            barWidth: '30%',
            stack: '面积',
            data: goodItem
          },
          {
            name: '不达标',
            type: 'bar',
            barWidth: '30%',
            stack: '面积',
            data: badItem
          }
        ]
      }
      statbar.setOption(option)
    },
    // 指标分析1
    drawItemBar () {
      setTimeout(() => {
        let itembar = echarts.init(
          document.getElementById('item-bar')
        )
        document.getElementById('item-bar').style.width = 100 + '%'
        document.getElementById('item-bar').style.height = 50 + '%'
        itembar.resize() // 直接加这句即可
      }, 0)
      let itembar = echarts.init(document.getElementById('item-bar'))
      let fourIndexCount = this.fourIndexCount

      let itemCount = [
        {
          itemStyle: { color: 'rgba(255,202,81,1)' },
          value: fourIndexCount.flourish // 繁荣国土
        },
        {
          itemStyle: { color: 'rgba(94,210,28,1)' },
          value: fourIndexCount.beautiful // 美丽国土
        },
        {
          itemStyle: { color: 'rgba(61,154,255,1)' },
          value: fourIndexCount.harmonious // 和谐国土
        },
        {
          itemStyle: { color: 'rgba(156,82,234,1)' },
          value: fourIndexCount.security // 安全国土
        }
      ]
      let option = {
        title: {
          text: '规划指标共计241项，本次评估230项',
          left: 'center',
          top: '3%'
        },
        color: ['#51d054', '#f94f4f'],
        tooltip: {
          trggier: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        label: {
          show: true,
          position: 'top',
          color: 'black'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['繁荣国土', '美丽国土', '和谐国土', '安全国土']
          }
        ],
        yAxis: [
          {
            name: '单位：项',
            type: 'value'
          }
        ],
        // tooltip: {
        //   show: false
        // },
        series: [
          {
            name: '指标',
            type: 'bar',
            barWidth: '15%',
            data: itemCount
          }
        ]
      }
      itembar.setOption(option)
    },
    // 指标分析2
    drawRatioBar () {
      setTimeout(() => {
        let ratiobar = echarts.init(
          document.getElementById('ratio-bar')
        )
        document.getElementById('ratio-bar').style.width = 100 + '%'
        document.getElementById('ratio-bar').style.height = 50 + '%'
        ratiobar.resize() // 直接加这句即可
      }, 0)
      let ratiobar = echarts.init(document.getElementById('ratio-bar'))
      let option = {
        color: '#5290f2',
        tooltip: {
          trggier: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        label: {
          show: true,
          position: 'right',
          color: 'black'
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: [{ type: 'value', show: false }],
        yAxis: [
          {
            name: '达标率',
            type: 'category',
            data: ['60%以下', '60%-70%', '70%-80%', '80%-90%', '90%以上']
          }
        ],
        series: [
          {
            type: 'bar',
            data: this.percentOfPass
          }
        ]
      }
      ratiobar.setOption(option)
    },
    dataFaker () {
      for (let item in this.fourIndexScroe) {
        this.fourIndexScroe[item] = Math.round(50 + Math.random() * 50)
        this.fourIndexCount[item] = Math.round(10 + Math.random() * 50)
      }

      this.percentOfPass.map(e => Math.round(50 + Math.random() * 50))
      let goodItem = []
      let badItem = []
      let len = this.cityData.districtName.length
      for (let i = 0; i < len; i++) {
        goodItem.push(Math.round(20 + Math.random() * 100))
        badItem.push(Math.round(20 + Math.random() * 100))
      }
      this.cityData.goodItem = goodItem
      this.cityData.badItem = badItem
      this.drawStatBar()
      this.drawScroeRadar()
      this.drawScroeBar()
      this.drawItemBar()
      this.drawRatioBar()
    },
    handleYearChange () {
      this.dataFaker()
    },
    handleSelectChange (code) {
      let that = this
      this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
        parentId: code
      }).then(res => {
        console.log(code)
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
    }
  },
  created () {
    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })
    this.locOpt = [
      {
        code: 440000,
        name: '广东省'
      }
    ]
    let that = this
    this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
      parentId: 440000
    }).then(res => {
      let lst = res.dictionariesList
      lst.forEach(city => {
        that.locOpt.push({
          code: city.id,
          name: city.zhCn
        })
      })
      that.handleSelectChange(440000)
    })
  },
  watch: {
    isShowMenu: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.drawScroeRadar()
            this.drawScroeBar()
            this.drawStatBar()
            this.drawItemBar()
            this.drawRatioBar()
          }, 0)
        })
      }
    }
  }
}
</script>
<style scoped>
#main-content {
  height: 100%;
  width: 100%;
  background-color: #f8f8f8;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

#main-content .top-main {
  width: 100%;
  height: 64%;
  min-height: 64%;
  max-height: 64%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
#main-content .bottom-main {
  width: 100%;
  height: 34%;
  min-height: 34%;
  max-height: 34%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* Header 包括标题，图标，选择器，按钮等 */
.header {
  width: 100%;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0px 0px;
}

.header .title-icon1 {
  width: 4px;
  height: 24px;
  display: inline-block;
  background-color: #1082c2;
  border-radius: 3px;
  margin: 0 5px;
}

.header .title-text1 {
  font-size: 18px;
  color: rgba(17, 17, 17, 1);
  line-height: 24px;
}
.header .subtitle-text {
  font-size: 16px;
  color: rgba(81, 79, 79, 1);
  line-height: 21px;
}

.header .action-bar {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header .action-bar .picker {
  width: 100px;
  margin-right: 20px;
}

.header .action-bar .newButton {
  width: 112px;
  height: 36px;
  background: rgba(29, 124, 228, 1);
  border-radius: 2px;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.header .action-bar .newButton:hover,
.header .action-bar .newButton:active {
  background-color: #5290f2;
  border: 1px solid #5290f2;
}

#main-content >>> .el-input__inner {
  font-size: 16px;
  height: 36px;
  color: rgba(96, 96, 96, 1);
  line-height: 21px;
  border-radius: 2px;
  border: 1px solid rgba(29, 124, 228, 1);
}

/* Main 包括展示数据的图和表 */
.grid {
  width: 59.5%;
  min-width: 59.5%;
  max-width: 59.5%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
}
.grid1 {
  width: 39.5%;
  min-width: 39.5%;
  max-width: 39.5%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
}
.main0 {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main1 {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.main2 {
  width: 100%;
  height: calc(100% - 40px);
}
#scroe-result {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(173, 198, 255, 1) 0%,
    rgba(103, 153, 238, 1) 100%
  );
  border-radius: 11px;
  color: #fff;
}
.scroe-circle {
  margin: 20px auto;
  width: 120px;
  height: 120px;
  padding: 20px;
  text-align: center;
  font-family: MicrosoftYaHeiSemibold;
}

.scroe-number {
  font-size: 40px;
  line-height: 60px;
}

.reportButton {
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 144px;
  height: 40px;
  background: rgba(236, 245, 255, 1);
  border-radius: 6px;
  border: 1px solid rgba(22, 28, 210, 1);
  font-size: 16px;
  color: rgba(48, 48, 48, 1);
  line-height: 40px;
}

.reportButton:hover,
.reportButton:active {
  opacity: 0.8;
}

.report-box-list {
  padding: 15px;
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  font-family: MicrosoftYaHeiSemibold;
}

.report-box {
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
}

.report-box:hover,
.report-box:active {
  background: rgba(173, 198, 255, 0.12);
}

.report-box > div {
  margin-bottom: 10px;
}

@media screen and (max-width: 1900px) {
  #main-content {
    height: auto;
  }
  #main-content .top-main {
    height: 505px;
    min-height: 505px;
    max-height: 505px;
    margin-bottom: 8px;
  }
  #main-content .bottom-main {
    height: 268px;
    min-height: 268px;
    max-height: 268px;
    margin-top: 8px;
  }
}
</style>
