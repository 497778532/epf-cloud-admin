<template>
  <div class="health-admin">
    <div class="health-content">
      <div class="health-admin__header">
        <span>体检结果详情</span>
      </div>
      <el-row class="health-admin-banner">
        <div class="banner__header">
          <div>
            <span class="text">体检编号：</span>
            <span class="number">{{record.checkUpNo}}</span>
          </div>

          <div>
            <span class="text">体检时间：</span>
            <span class="number">{{record.createTime}}</span>
          </div>
        </div>
        <el-row class="banner__body"
                type="flex">
          <!-- 左边盒子 -->
          <el-col :span="6">
            <div class="main">
              <div id="scroe-panel">
                <div id="scroe-result">
                  <div class="scroe-circle"
                       :style="bgimgData()">
                    <div class="scroe-number">
                      <div>{{TrueOrFlase}}</div>
                      <div class="scroe-text">
                        <img src="@/assets/tijian.png"
                             alt />
                      </div>
                    </div>
                  </div>
                  <div class="reportButton"
                       @click="handleReportClick">
                    <span>查看体检报告</span>
                  </div>
                  <div class="standard">
                    <div>
                      <div class="standard-title__success standard-button">达标指标</div>
                      <div class="standard-content__success standard-button">
                        <span class="bigFont">{{record.succCount}}</span>
                        <span class="blackFont">项</span>
                      </div>
                    </div>
                    <div>
                      <div class="standard-title__error standard-button">不达标指标</div>
                      <div class="standard-content__error standard-button">
                        <span class="bigFont">{{record.failCount}}</span>
                        <span class="blackFont">项</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <el-col :span="12" class="report-box" @click.native="checkIndex('good')">
                      <div
                        class="situation"
                        style="background:rgba(113,184,2,1);color:#fff;border-radius:4px;"
                      >达标指标</div>
                    </el-col>

                    <el-col :span="12" class="report-box" @click.native="checkIndex('bad')">
                      <div class="situation">不达标指标</div>
                      <div class="error">{{record.failCount}}项</div>
                </el-col>-->
              </div>
              <div id="scroe-radar"></div>
              <div id="scroe-bar"></div>
            </div>
          </el-col>
          <!-- 右边盒子 -->
          <el-col :span="18">
            <div class="body__title">
              <span class="title__cycle"></span>
              <span class="title__text">体检结果描述</span>
            </div>
            <p class="body__description">本年度体检涉及指标项{{record.succCount+record.failCount}}项，达标指标{{record.succCount}}项，不达标指标{{record.failCount}}项；以促进经济、可持续增长、宜居生活、生态保护为目的。共分为底线管控、结构效率、生活设施、基础指标、防灾减灾、生态保护六大类评估指标体系，总体上，同规划预期目标基本吻合，但同时部分市县存在指标不达标情况，经统计汇总和分析，在底线管控和生活设施方面存在不足，地域存在悬殊，需要重点跟踪和分析原因，便于后续管理和管控工作的优化和改进。</p>
            <p class="body__description">
              本年度体检结果评定为：
              <span class="description__success">{{TrueOrFlase}}</span>
            </p>
            <div class="echartContain">
              <div id="base"
                   ref="base"></div>
              <div id="recommend"
                   ref="recommend"></div>
            </div>

            <el-row class="twoTable"
                    :gutter="20"
                    type="flex">
              <el-col :span="12"
                      class="table__result">
                <div class="table__header">
                  <span class="photo__error"></span>
                  <span class="photo__text">不达标指标</span>
                  <span class="photo__text">({{record.failCount}})</span>
                </div>
                <el-table :data="failList"
                          stripe
                          style="width: 100%;border:1px solid rgba(112,112,112,1);"
                          height="300">
                  <el-table-column type="index"
                                   width="60"
                                   label="序号"></el-table-column>
                  <el-table-column label="行政区域"
                                   min-width="170">
                    <template slot-scope="scope">
                      <span hit
                            size="medium">
                        {{scope.row.cantonProvinceName}}
                        {{scope.row.cantonCityName}}
                        {{scope.row.cantonAreaName}}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="indexName"
                                   label="指标名称"
                                   min-width="200"></el-table-column>
                  <el-table-column prop="monitorVal"
                                   label="监测值"
                                   min-width="100"></el-table-column>
                  <el-table-column prop="planVal"
                                   label="规划值(2020)"
                                   min-width="150"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="12"
                      class="table__tabs">
                <div class="table__header">
                  <span class="photo__success"></span>
                  <span class="photo__text">达标指标</span>
                  <span class="photo__text">({{record.succCount}})</span>
                </div>
                <el-tabs type="border-card">
                  <el-tab-pane>
                    <span slot="label">
                      <div class="tabs__change">
                        <!-- <img :src="img01" alt /> -->
                        <span>{{dxgkList.length}}</span>
                      </div>
                      <div>底线管控</div>
                    </span>
                    <div style="height:250px">
                      <el-scrollbar>
                        <el-row class="tab__frist"
                                v-for="(item,index) in dxgkList"
                                :key="index">
                          <el-col :span="12">
                            <span>{{item.indexName}}</span>
                          </el-col>
                          <el-col :span="6"
                                  class="StatusQuo">
                            <span>现状</span>

                            <el-tooltip class="item"
                                        effect="dark"
                                        :content="item.monitorVal"
                                        placement="top">
                              <span>{{item.monitorVal}}</span>
                            </el-tooltip>

                          </el-col>
                          <el-col :span="6"
                                  class="StatusQuo">
                            <span>规划目标</span>

                            <el-tooltip class="item"
                                        effect="dark"
                                        :content="item.planVal"
                                        placement="top">
                              <span>{{item.planVal}}</span>
                            </el-tooltip>

                          </el-col>
                        </el-row>
                      </el-scrollbar>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane>
                    <span slot="label">
                      <div class="tabs__change">
                        <!-- <img :src="img02" alt /> -->
                        <span>{{jgxlList.length}}</span>
                      </div>
                      <div>结构效率</div>
                    </span>
                    <div style="height:250px">
                      <el-scrollbar>
                        <el-row class="tab__frist"
                                v-for="(item,index) in jgxlList"
                                :key="index">
                          <el-col :span="12">
                            <span>{{item.indexName}}</span>
                          </el-col>
                          <el-col :span="6">
                            <span>现状</span>
                            <span>{{item.monitorVal}}</span>
                          </el-col>
                          <el-col :span="6">
                            <span>规划目标</span>
                            <span>{{item.planVal}}</span>
                          </el-col>
                        </el-row>
                      </el-scrollbar>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane>
                    <span slot="label">
                      <div class="tabs__change">
                        <!-- <img :src="img03" alt /> -->
                        <span>{{shssList.length}}</span>
                      </div>
                      <div>生活设施</div>
                    </span>
                    <div style="height:250px">
                      <el-scrollbar>
                        <el-row class="tab__frist"
                                v-for="(item,index) in shssList"
                                :key="index">
                          <el-col :span="12">
                            <span>{{item.indexName}}</span>
                          </el-col>
                          <el-col :span="6">
                            <span>现状</span>
                            <span>{{item.monitorVal}}</span>
                          </el-col>
                          <el-col :span="6">
                            <span>规划目标</span>
                            <span>{{item.planVal}}</span>
                          </el-col>
                        </el-row>
                      </el-scrollbar>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane>
                    <span slot="label">
                      <div class="tabs__change">
                        <!-- <img :src="img04" alt /> -->
                        <span>{{jczbList.length}}</span>
                      </div>
                      <div>基础指标</div>
                    </span>
                    <div style="height:250px">
                      <el-scrollbar>
                        <el-row class="tab__frist"
                                v-for="(item,index) in jczbList"
                                :key="index">
                          <el-col :span="12">
                            <span>{{item.indexName}}</span>
                          </el-col>
                          <el-col :span="6">
                            <span>现状</span>
                            <span>{{item.monitorVal}}</span>
                          </el-col>
                          <el-col :span="6">
                            <span>规划目标</span>
                            <span>{{item.planVal}}</span>
                          </el-col>
                        </el-row>
                      </el-scrollbar>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
              <!-- <div class="table__result"></div>
              <div class="table__result"></div>-->
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'HealthDetail',
  data () {
    return {
      img01: require('@/assets/tabs01.png'),
      //   img02: require("@/assets/tabs02-false.png"),
      //   img03: require("@/assets/tabs03-false.png"),
      //   img04: require("@/assets/tabs04-false.png"),
      activeName: 'one',
      data: {},
      tableData: [
        { name: '哈哈哈哈' },
        { name: '哈哈哈哈' },
        { name: '哈哈哈哈' },
        { name: '哈哈哈哈' },
        { name: '哈哈哈哈' }
      ],
      record: {},
      failList: [],
      jczbList: [],
      jgxlList: [],
      dxgkList: [],
      shssList: []
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    handleReportClick () {
      let title = '查看体检报告'
      let routerPath = '/HealthReport'
      let tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
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
    useDrawLine (id, option) {
      this.$nextTick(function () {
        setTimeout(() => {
          let useChart = echarts.init(this.$refs[id])
          var data = [20, 32, 11, 65, 25, 50, 21]
          var xMax = 100
          useChart.setOption(option)
        }, 1000)
      })
    },
    initEchart (id) {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs[id])
        this.chart.resize() // 直接加这句即可
      })
    },
    getData (id) {
      this.$get('/epf-monitor-evaluation/yearCheckup/getCheckupDetail', {
        id: id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.data = res.result
          console.log(this.data)
          this.record = this.data.record
          this.failList = this.data.failList
          this.jczbList = this.data.jczbList
          this.jgxlList = this.data.jgxlList
          this.dxgkList = this.data.dxgkList
          this.shssList = this.data.shssList
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    }
  },
  created () {
    let id = this.$route.query.id
    this.getData(id)
  },
  mounted () {
    console.log(this.data)
  },

  computed: {
    TrueOrFlase: {
      get () {
        let total = this.record.failCount + this.record.succCount
        if (this.record.succCount / total >= 0.6) {
          return '体检合格'
        } else {
          return '体检不合格'
        }
      },
      set () { }
    },
    rate: {
      get () {
        let total = this.record.failCount + this.record.succCount
        return (this.record.succCount / total) * 100
      }
    }
  },
  watch: {
    record (val) {
      let series = []
      let legend = ['达标', '不达标']
      let color = ['#70B603', '#FD8D0C']
      let data = [
        { value: val.succCount, name: '达标' },
        { value: val.failCount, name: '不达标' }
      ]
      for (var i = 0; i < legend.length; i++) {
        series.push({
          name: legend[i],
          type: 'pie',
          radius: '50%',
          center: ['50%', '40%'],
          data: data
        })
      }
      this.useDrawLine('base', {
        color: ['#70B603', '#FD8D0C', '#FF0000'],
        title: {
          text: `指标达标率  ${this.rate}%`,
          left: 'center',
          // top: "bottom",
          bottom: '8%',
          textStyle: {
            color: '#464646',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          data: legend,
          top: 'middle',
          right: 100
        },
        series: series
      })
      this.initEchart('base')
    }
  }
}
</script>

<style scoped>
.health-admin {
  padding: 15px;
  font-size: 16px;
}

.standard {
  display: flex;
  margin-top: 20px;
}

.standard > div {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.standard-button {
  padding: 0 14px;
  width: 120px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
}
.standard-title__success {
  background: rgba(113, 184, 2, 1);
  color: #fff;
}

.standard-title__error {
  background: rgba(255, 59, 59, 1);
  color: #fff;
}

.standard-content__success {
  background: rgba(236, 245, 255, 1);
  color: rgba(113, 184, 2, 1);
  border: 1px solid rgba(113, 184, 2, 1);
  margin-top: 25px;
}

.standard-content__error {
  background: rgba(236, 245, 255, 1);
  border: 1px solid rgba(255, 59, 59, 1);
  margin-top: 25px;
  color: rgba(255, 59, 59, 1);
}
.bigFont {
  font-size: 20px;
}
.blackFont {
  color: #000;
}
.health-content {
  border: 1px solid rgba(151, 151, 151, 1);
}
.health-admin__header {
  height: 50px;
  background: rgba(232, 234, 246, 1);
  color: #000;
  line-height: 50px;
  padding-left: 15px;
  font-weight: 700;
}

.health-admin-banner {
  padding: 0 15px 15px 15px;
}
.banner__header {
  height: 55px;
  border-bottom: 1px solid rgba(198, 198, 198, 1);
  line-height: 55px;
}
.banner__header > div {
  float: left;
}
.banner__header > div:nth-child(2) {
  margin-left: 100px;
}
.text {
  color: #303030;
}
.number {
  color: #505050;
}
.banner__body {
  margin-top: 15px;
  display: flex;
}

.banner__body > div:nth-child(1) {
}
.banner__body > div:nth-child(2) {
  margin-left: 15px;
}
.banner__body .main {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.reportButton {
  text-align: center;
}
.reportButton > span {
  background: rgba(236, 245, 255, 1);
  border-radius: 6px;
  border: 1px solid rgba(22, 28, 210, 1);
  padding: 6px 12px;
  color: #303030;
  cursor: pointer;
}
.report-box {
  text-align: center;
}

.report-box-list {
  margin-top: 50px;
}
/* .report-box-list .success {
  color: rgba(9, 194, 0, 1);
  font-size: 24px;
}
.report-box-list .error {
  color: rgba(255, 0, 0, 1);
  font-size: 24px;
} */
#scroe-panel {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(173, 255, 199, 1) 0%,
    rgba(170, 251, 201, 1) 8%,
    rgba(167, 246, 204, 1) 16%,
    rgba(163, 240, 207, 1) 24%,
    rgba(158, 233, 210, 1) 33%,
    rgba(153, 226, 213, 1) 41%,
    rgba(148, 218, 216, 1) 49%,
    rgba(142, 210, 219, 1) 57%,
    rgba(137, 202, 223, 1) 65%,
    rgba(131, 193, 226, 1) 73%,
    rgba(125, 185, 229, 1) 79%,
    rgba(119, 176, 231, 1) 86%,
    rgba(113, 168, 234, 1) 91%,
    rgba(108, 160, 236, 1) 96%,
    rgba(103, 153, 238, 1) 100%
  );

  border-radius: 11px;
  color: #fff;
}
#scroe-panel #scroe-result {
  padding-top: 50px;
  width: 100%;
  height: 100%;
}
.scroe-circle {
  margin: 20px auto;
  width: 146px;
  height: 146px;
  padding-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroe-number {
  color: rgba(9, 194, 0, 1);
  font-size: 24px;
}
.scroe-text {
  text-align: center;
}

.body__title {
  display: flex;
  align-items: center;
  line-height: 24px;
}
.title__cycle {
  width: 10px;
  height: 10px;
  background: rgba(112, 182, 3, 1);
  border-radius: 50%;
}

.title__text {
  color: rgba(70, 70, 70, 1);
  font-size: 18px;
  margin-left: 10px;
}

.body__description {
  text-indent: 19px;
  color: rgba(70, 70, 70, 1);
  margin-top: 15px;
  line-height: 21px;
}
.description__success {
  color: #09c200;
}
.echartContain {
  display: flex;
  height: 250px;
}
.echartContain > div:nth-child(1) {
  flex: 1;
}
.echartContain > div:nth-child(2) {
  flex: 1;
}
/* .tab__frist {
  padding: 12px 0;
} */

.tab__frist > .el-col {
  padding: 12px 3px;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  line-height: 24px;
}
.tab__frist > .el-col:nth-child(1) {
  padding-left: 12px;
}
.tabs__change {
  display: flex;
  align-items: center;
  line-height: normal;
  justify-content: center;
}
.table__header {
  display: flex;
  align-items: center;
  height: 40px;
}

.table__header .photo__error {
  width: 10px;
  height: 10px;
  background: rgba(246, 108, 108, 1);
  border-radius: 50%;
}

.table__header .photo__success {
  width: 10px;
  height: 10px;
  background: #09c200;
  border-radius: 50%;
}
.table__header .photo__text {
  color: rgba(70, 70, 70, 1);
  margin-left: 5px;
  font-weight: 700;
}

.StatusQuo {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style >
.health-admin .el-row {
  margin-bottom: 0;
}

.health-admin .el-table .el-table__header thead th {
  background: rgba(105, 155, 238, 1);
}

.health-admin .el-table thead {
  color: #fff;
  font-size: 16px;
}
.health-admin .el-tabs__item {
  line-height: 25px;
  height: 50px;
}

.health-admin .el-tabs--border-card > .el-tabs__header {
  background: rgba(105, 155, 238, 1);
}

.health-admin .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #fff;
  font-size: 16px;
}

.health-admin .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active,
.el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover {
  color: #000;
}

.health-admin .el-tabs--border-card {
  border: 1px solid rgba(112, 112, 112, 1);
  font-size: 14px;
  color: #606266;
}

.health-admin .el-scrollbar {
  height: 100%;
}
.health-admin .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: auto;
}
</style>
