<template>
  <epf-page>
    <epf-mapview :delay="1"
                 name="suitability"
                 ref="suitability"
                 style="width: calc(100% - 460px);
                 height: auto;
                 background-color: #fff;
                 margin: 20px 0 20px 20px;
                 box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);">
      <div class="toolbar">
        <jump-to></jump-to>
        <zoom></zoom>
        <pan></pan>
        <basemap></basemap>
      </div>
    </epf-mapview>
    <epf-side class="epf-side__custom"
              v-loading="loading">
      <div v-show="showMain === true">
        <epf-title type="normal"
                   :showIcon="false"
                   :title="routeCache[routeId * 1 - 1].title"
                   style="margin:2px 0 40px 0"></epf-title>
        <epf-block>
          <epf-title title="评价说明">
            <div class="epf-title-skip"
                 style="padding:0 4px 0 0;"
                 @click="handleCheckStandardClick"
                 v-show="showTitleSkip()">
              <span>点击查看具体标准</span>
              <img src="@/assets/plananalyse/direction.png"
                   style="margin:10px;" />
            </div>
          </epf-title>

          <epf-text :content="routeCache[routeId * 1 - 1].explainContent"></epf-text>
        </epf-block>
        <epf-block>
          <epf-title title="设置"></epf-title>
          <epf-row v-for="count in routeCache[routeId * 1 - 1].dataModels.length"
                   :key="count"
                   :row="count"
                   style="padding: 0 14px;">
            <div class="epf-row-column__first">
              <span>选择数据：</span>
            </div>
            <el-select class="epf-row-column__second"
                       clearable
                       v-model="routeCache[routeId * 1 - 1].dataModels[count - 1]">
              <el-option v-for="item in routeCache[routeId * 1 - 1].analysisDataList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
            <div class="epf-row-column__third">
              <epf-button v-if="count === 1"
                          type="add"
                          @click.native="handleAddDataTypeClick"></epf-button>
              <epf-button v-else
                          type="reduce"
                          @click.native="handleReduceDataTypeClick(count - 1)"></epf-button>
            </div>
          </epf-row>
          <epf-row style="padding: 0 14px;">
            <epf-splitline></epf-splitline>
          </epf-row>
          <epf-row v-for="count in routeCache[routeId * 1 - 1].calculateModels.length"
                   :key="count"
                   :row="count"
                   style="padding: 0 14px;">
            <div class="epf-row-column__first">
              <span>选择模型：</span>
            </div>
            <el-select class="epf-row-column__second"
                       clearable
                       v-model="routeCache[routeId * 1 - 1].calculateModels[count - 1]">
              <el-option v-for="item in routeCache[routeId * 1 - 1].imModelLibraryList"
                         :key="item.id"
                         :label="item.modelName"
                         :value="item.id"></el-option>
            </el-select>
            <div class="epf-row-column__third">
              <epf-button v-if="count === 1"
                          type="add"
                          @click.native="handleAddCalculateClick"></epf-button>
              <epf-button v-else
                          type="reduce"
                          @click.native="handleReduceCalculateClick(count - 1)"></epf-button>
            </div>
          </epf-row>
          <epf-row style="padding: 0 14px;">
            <p class="epf-describe">{{ routeCache[routeId * 1 - 1].describe }}</p>
          </epf-row>
          <epf-row style="justify-content: flex-end;padding: 0 14px;">
            <el-button class="epf-button__custom"
                       style="width:100px;height:40px;color:#1989D9;"
                       @click="handleCancelClick">重置</el-button>
            <el-button type="primary"
                       class="epf-button__custom"
                       style="width:136px;height:40px;background-color:rgba(25, 137, 217, 1);"
                       @click="handleStartClick">开始评价</el-button>
          </epf-row>
        </epf-block>
        <epf-block v-if="showResult"
                   ref="resultBlock">
          <epf-block>
            <epf-title title="评价汇总"></epf-title>

            <div style="text-align:center;color:rgba(29,124,228,1);font-size:16px;margin-top:20px">
              <span style="padding:8px 14px;border-radius:3px;border:1px solid rgba(97,155,219,1);">
                <img :src="pinggu"
                     alt />
                <span>下载评估报告</span>
              </span>
            </div>
            <!-- <epf-showmore :msg="summaryContent"></epf-showmore>
            <epf-chart :option="chartOption" id="id-chart-ecology2"></epf-chart>-->
          </epf-block>
          <epf-block>
            <epf-title title="等级概括">
              <epf-export></epf-export>
            </epf-title>
            <div class="EPF-table epf-table__custom">
              <el-table :data="levelData"
                        border
                        style="width: 100%"
                        max-height="300">
                <el-table-column prop="level"
                                 label="等级区间"
                                 align="center"></el-table-column>
                <el-table-column prop="wgsl"
                                 label="网格数量"
                                 align="center"></el-table-column>
                <el-table-column prop="fgmj"
                                 label="覆盖面积"
                                 align="center"></el-table-column>
                <el-table-column prop="bl"
                                 label="比例"
                                 align="center"></el-table-column>
              </el-table>
            </div>
          </epf-block>
          <epf-block>
            <epf-title title="区域概括">
              <epf-export></epf-export>
            </epf-title>
            <div class="EPF-table epf-table__custom">
              <el-table :data="scopeData"
                        border
                        style="width: 100%"
                        max-height="1000">
                <el-table-column prop="xzqh"
                                 label="行政区划"
                                 align="center"></el-table-column>
                <el-table-column prop="wgsl"
                                 label="网格数量"
                                 align="center"></el-table-column>
                <el-table-column prop="fgmj"
                                 label="覆盖面积"
                                 align="center"></el-table-column>
                <el-table-column prop="bl"
                                 label="比例"
                                 align="center"></el-table-column>
              </el-table>
            </div>
          </epf-block>
        </epf-block>
      </div>
      <div v-show="showMain === false && showTitleSkip()">
        <epf-block>
          <epf-title title="评价标准"
                     style="margin-top:2px">
            <div class="epf-title-skip"
                 @click="handleCheckStandardClick">返回</div>
          </epf-title>
          <div v-show="routeId === '4'">
            <epf-title type="circle"
                       title="生态斑块集中度评价分级参考阈值"></epf-title>
            <div class="EPF-table epf-table__custom">
              <el-table :data="criterion"
                        border
                        style="width: 100%"
                        max-height="300">
                <el-table-column prop="bkmj"
                                 label="斑块面积(KM2)"
                                 align="center"></el-table-column>
                <el-table-column prop="bkjzd"
                                 label="斑块集中度"
                                 align="center"></el-table-column>
              </el-table>
            </div>
            <epf-title type="circle"
                       title="生态保护重要性等级分区参考判别矩阵"></epf-title>
            <div class="EPF-table epf-table__custom"
                 id="id-table-pbjz">
              <el-table :data="criterionMatrix"
                        border
                        style="width: 100%"
                        max-height="1000">
                <el-table-column prop="level"
                                 label="生态保护等级"
                                 align="center"></el-table-column>
                <el-table-column label="生态斑块集中度"
                                 align="center">
                  <el-table-column prop="high"
                                   label="高"
                                   align="center"></el-table-column>
                  <el-table-column prop="higher"
                                   label="较高"
                                   align="center"></el-table-column>
                  <el-table-column prop="normal"
                                   label="一般"
                                   align="center"></el-table-column>
                  <el-table-column prop="lower"
                                   label="较低"
                                   align="center"></el-table-column>
                  <el-table-column prop="low"
                                   label="低"
                                   align="center"></el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-show="routeId === '5'">
            <epf-title type="circle"
                       title="地块连片度评价分级参考阈值"></epf-title>
            <div class="EPF-table epf-table__custom">
              <el-table :data="NYCKQZData"
                        border
                        style="width: 100%"
                        max-height="300">
                <el-table-column prop="dklpd"
                                 label="地块连片度"
                                 align="center"></el-table-column>
                <el-table-column prop="low"
                                 label="低"
                                 align="center"></el-table-column>
                <el-table-column prop="lower"
                                 label="较低"
                                 align="center"></el-table-column>
                <el-table-column prop="normal"
                                 label="一般"
                                 align="center"></el-table-column>
                <el-table-column prop="high"
                                 label="较高"
                                 align="center"></el-table-column>
                <el-table-column prop="higher"
                                 label="高"
                                 align="center"></el-table-column>
              </el-table>
            </div>
            <epf-title type="circle"
                       title="农业生产适宜性分区参考判别矩阵"></epf-title>
            <div class="EPF-table epf-table__custom">
              <el-table :data="NYPBJZ"
                        border
                        style="width: 100%"
                        max-height="300">
                <el-table-column prop="nycznl"
                                 label="农业承载能力"
                                 align="center"></el-table-column>
                <el-table-column label="地块连片度"
                                 align="center">
                  <el-table-column prop="higher"
                                   label="高"
                                   align="center"></el-table-column>
                  <el-table-column prop="high"
                                   label="较高"
                                   align="center"></el-table-column>
                  <el-table-column prop="normal"
                                   label="一般"
                                   align="center"></el-table-column>
                  <el-table-column prop="lower"
                                   label="较低"
                                   align="center"></el-table-column>
                  <el-table-column prop="low"
                                   label="低"
                                   align="center"></el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-show="routeId === '6'">
            <epf-title type="circle"
                       title="地块集中度评价分级参考阈表"></epf-title>
            <div class="EPF-table epf-table__custom">
              <el-table :data="CZCKQB"
                        border
                        style="width: 100%"
                        max-height="300">
                <el-table-column prop="dkjzd"
                                 label="地块面积(km)"
                                 align="center"></el-table-column>
                <el-table-column prop="low"
                                 label="<0.25"
                                 align="center"></el-table-column>
                <el-table-column prop="lower"
                                 label="0.25-0.5"
                                 align="center"></el-table-column>
                <el-table-column prop="normal"
                                 label="0.5-1.0"
                                 align="center"></el-table-column>
                <el-table-column prop="higher"
                                 label="1-2"
                                 align="center"></el-table-column>
                <el-table-column prop="high"
                                 label=">=2"
                                 align="center"></el-table-column>
              </el-table>
            </div>
            <epf-title type="circle"
                       title="区位优势度分级参考阈值"></epf-title>
            <div class="EPF-table epf-table__custom">
              <el-table :data="CZQYYSDCKQZ"
                        border
                        style="width: 100%"
                        max-height="300">
                <el-table-column prop="pjzb"
                                 label="评价指标"
                                 align="center"></el-table-column>
                <el-table-column prop="fjckqz"
                                 label="分级参考阈值"
                                 align="center"></el-table-column>
                <el-table-column prop="fz"
                                 label="赋值"
                                 align="center"></el-table-column>
                <el-table-column prop="reason"
                                 label="说明"
                                 align="center"
                                 style="width:94px;"></el-table-column>
              </el-table>
            </div>
            <epf-title type="circle"
                       title="舒适度分级参考阈值"></epf-title>
            <div class="EPF-table epf-table__custom">
              <el-table :data="CZSSDCKQZ"
                        border
                        style="width: 100%"
                        max-height="300">
                <el-table-column prop="level"
                                 label="等级"
                                 align="center"></el-table-column>
                <el-table-column prop="standard"
                                 label="分级标准"
                                 align="center"></el-table-column>
                <el-table-column prop="reason"
                                 label="说明"
                                 align="center"></el-table-column>
              </el-table>
            </div>
            <epf-title type="circle"
                       title="综合优势度（省级层面）参考判别矩阵"></epf-title>
            <div class="EPF-table epf-table__custom">
              <el-table :data="CZZHYSDPBJZ"
                        border
                        style="width: 100%"
                        max-height="300">
                <el-table-column prop="ssd"
                                 label="区位优势度"
                                 align="center"></el-table-column>
                <el-table-column prop="good"
                                 label="好"
                                 align="center"></el-table-column>
                <el-table-column prop="preferably"
                                 label="较好"
                                 align="center"></el-table-column>
                <el-table-column prop="normal"
                                 label="一般"
                                 align="center"></el-table-column>
                <el-table-column prop="poor"
                                 label="较差"
                                 align="center"></el-table-column>
                <el-table-column prop="bad"
                                 label="差"
                                 align="center"></el-table-column>
              </el-table>
            </div>
          </div>
        </epf-block>
      </div>
    </epf-side>
  </epf-page>
</template>

<script>
import jumpTo from '../../onemap/toolbarItem/jumpTo/widget'
import zoom from '../../onemap/toolbarItem/zoom/index'
import pan from '../../onemap/toolbarItem/pan/widget'

import mixin from './mixin'

import {
  getPaEvaluationAnalysisByEvaluationType,
  getAnalysisDataList,
  getImModelLibraryList,
  getAnalysisCalculationDate
} from '@/api/paevaluationanalysis/index'

import {
  CKQZ,
  PBJZ,
  NYCKQZData,
  NYPBJZ,
  CZCKQB,
  CZQYYSDCKQZ,
  CZSSDCKQZ,
  CZZHYSDPBJZ
} from '../common/mock'

export default {
  name: 'Suitability',
  mixins: [mixin],
  components: {
    basemap:()=>import("@/pages/admin/onemap/toolbarItem/basemap"),
    jumpTo,
    zoom,
    pan
  },
  data () {
    return {
      loading: false,
      routeId: '',
      isDoing: false,
      pinggu: require('@/assets/pinggu.png'),
      hasFinished: false,
      showMain: true,
      showResult: false,
      evaluationType: null,

      routeCache: [],

      chartOption: null,
      scopeData: null,
      levelData: null,

      NYCKQZData: null,
      NYPBJZ: null,
      CZCKQB: null,
      CZQYYSDCKQZ: null,
      CZSSDCKQZ: null,
      CZZHYSDPBJZ: null
    }
  },
  created () {
    this.caseRouteQuery()
    this.routeCache = []
    for (let i = 0; i < 6; i++) {
      this.routeCache.push({
        describe: '',
        explainContent: '',
        title: '',
        criterion: '',
        criterionMatrix: [],
        analysisDataList: [],
        imModelLibraryList: [],
        dataModels: [''],
        calculateModels: [''],
        analysisCalculationDate: {},
        hasFinished: false
      })
    }
    this.criterion = CKQZ
    this.criterionMatrix = PBJZ
    this.NYCKQZData = NYCKQZData
    this.NYPBJZ = NYPBJZ
    this.CZCKQB = CZCKQB
    this.CZSSDCKQZ = CZSSDCKQZ
    this.CZQYYSDCKQZ = CZQYYSDCKQZ
    this.CZZHYSDPBJZ = CZZHYSDPBJZ
    this.requestData()
  },
  mounted () {
  },
  watch: {
    $route (to, from) {
      this.showMain = true
      this.showResult = false
      this.caseRouteQuery()

      this.hideResultLayer()
      this.showResultLayer(this.routeCache[this.routeId * 1 - 1])
      const tempTitle = this.routeCache[this.routeId * 1 - 1].title
      if (!tempTitle) {
        this.requestData()
      }
    }
  },
  methods: {
    requestData () {
      this.loading = true
      getPaEvaluationAnalysisByEvaluationType({
        evaluationType: this.evaluationType
      }).then(response => {
        this.loading = false
        if (response.code === 0) {
          const analysisResult = response.paEvaluationAnalysis
          const c = analysisResult.criterion
          const cm = analysisResult.criterionMatrix

          this.$set(
            this.routeCache[this.routeId * 1 - 1],
            'describe',
            analysisResult.computingMethod
          )
          this.$set(
            this.routeCache[this.routeId * 1 - 1],
            'explainContent',
            analysisResult.instructions
          )
          this.$set(
            this.routeCache[this.routeId * 1 - 1],
            'title',
            analysisResult.nama
          )
          this.$set(
            this.routeCache[this.routeId * 1 - 1],
            'criterion',
            c.length > 0 ? c : CKQZ
          )
          this.$set(
            this.routeCache[this.routeId * 1 - 1],
            'criterionMatrix',
            cm.length > 0 ? cm : PBJZ
          )
        } else {
          this.$message.error(response.message)
        }
      })
      getAnalysisDataList({
        evaluationType: this.evaluationType
      }).then(response => {
        this.loading = false
        if (response.code === 0) {
          this.$set(
            this.routeCache[this.routeId * 1 - 1],
            'analysisDataList',
            response.analysisDataList
          )
        } else {
          this.$message.error(response.message)
        }
      })
      getImModelLibraryList({
        evaluationType: this.evaluationType
      }).then(response => {
        this.loading = false
        if (response.code === 0) {
          this.$set(
            this.routeCache[this.routeId * 1 - 1],
            'imModelLibraryList',
            response.imModelLibraryList
          )
        } else {
          this.$message.error(response.message)
        }
      })
    },
    jointStr (array) {
      let str = ''
      Array.from(new Set(array)).forEach(item => {
        if (item.length > 0) {
          str += `${item},`
        }
      })
      if (str.length > 0) {
        str = str.substr(0, str.length - 1)
      }
      return str
    },
    showTitleSkip () {
      if (
        this.routeId === '4'
        || this.routeId === '5'
        || this.routeId === '6'
      ) {
        return true
      } else return false
    },
    caseRouteQuery () {
      this.routeId = this.$route.query.index
      this.evaluationType = `evaluation_type-0${this.routeId * 1 + 9}`
    },
    checkoutStr () {
      const dataModelStr = this.jointStr(
        this.routeCache[this.routeId * 1 - 1].dataModels
      )
      if (dataModelStr.length === 0) {
        this.$message({ message: '请先选择数据。', type: 'warning' })
        return false
      }
      const calculateModelStr = this.jointStr(
        this.routeCache[this.routeId * 1 - 1].calculateModels
      )
      if (calculateModelStr.length === 0) {
        this.$message({ message: '请先选择模型。', type: 'warning' })
        return false
      }
      return true
    },

    handleAddDataTypeClick () {
      this.routeCache[this.routeId * 1 - 1].dataModels.push('')
    },
    handleReduceDataTypeClick (count) {
      this.routeCache[this.routeId * 1 - 1].dataModels.splice(count, 1)
    },
    handleAddCalculateClick () {
      this.routeCache[this.routeId * 1 - 1].calculateModels.push('')
    },
    handleReduceCalculateClick (count) {
      this.routeCache[this.routeId * 1 - 1].calculateModels.splice(count, 1)
    },
    handleCheckStandardClick () {
      this.showMain = !this.showMain
    },
    handleCancelClick () {
      this.showResult = false
      this.routeCache[this.routeId * 1 - 1].dataModels = ['']
      this.routeCache[this.routeId * 1 - 1].calculateModels = ['']
    },
    handleStartClick () {
      const canStart = this.checkoutStr()
      if (canStart) {
        if (!this.isDoing) {
          this.isDoing = true
          this.hasFinished = false
          this.loading = true
          getAnalysisCalculationDate({
            evaluationType: this.evaluationType,
            modellibraryId: this.jointStr(
              this.routeCache[this.routeId * 1 - 1].dataModels
            ),
            analysisDataId: this.jointStr(
              this.routeCache[this.routeId * 1 - 1].calculateModels
            )
          }).then(response => {
            this.loading = false
            if (response.code === 0) {
              this.isDoing = false
              if (response.code === 0) {
                this.$set(
                  this.routeCache[this.routeId * 1 - 1],
                  'analysisCalculationDate',
                  response.analysisCalculationDate
                )
                this.$set(
                  this.routeCache[this.routeId * 1 - 1],
                  'hasFinished',
                  true
                )
                this.showResultLayer(this.routeCache[this.routeId * 1 - 1])
                this.$message({ message: '分析完成！', type: 'success' })
              }
            }
          })
        } else {
          this.$message('正在分析,请耐心等待...')
        }
      }
    }
  }
}
</script>

<style scoped>
@import "../../onemap/toolbarItem/style.css";
@import "../common/style.css";
</style>
