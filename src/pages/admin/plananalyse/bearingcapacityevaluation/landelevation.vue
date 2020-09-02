<template>
  <el-container id="main-container"
                class="EPF-table">
    <el-main id="main">
      <epf-mapview name="landelevation"
                   :delay="1">
        <div class="toolbar">
          <jumpto-item></jumpto-item>
          <zoom-item></zoom-item>
          <pan-item></pan-item>
        </div>
      </epf-mapview>
    </el-main>

    <el-aside id="aside"
              width="400px">
      <el-container>
        <el-header id="aside-header"
                   style="height: 40px;">
          <span class="title">{{childrenData.title}}</span>
        </el-header>

        <el-row type="flex"
                justify="center"
                style="margin-top:5px">
          <el-col :span="17"
                  class="twoInone">
            <div :class="classes1"
                 @click="myTab('city')">城镇建设</div>
            <div :class="classes"
                 @click="myTab('country')">农业耕作</div>
          </el-col>
        </el-row>
        <planSide v-show="childrenData.active==='1'"
                  :data="childrenData"
                  :endData="analysisData"
                  @appraisals="myAppraisals1"></planSide>

        <planSide v-show="childrenData.active==='2'"
                  :data="childrenData"
                  :endData="analysisData2"
                  @appraisals="myAppraisals2"></planSide>
      </el-container>
    </el-aside>
  </el-container>
</template>
<script>

import toolbar from '../../onemap/toolbar'
import ZoomItem from './../../onemap/toolbarItem/zoom'
import PanItem from './../../onemap/toolbarItem/pan/widget'
import JumptoItem from './../../onemap/toolbarItem/jumpTo/widget'
import PlanSide from './PlanSide'

import miXin from './plananalyse'
export default {
  name: 'landelevation',
  mixins: [miXin],
  data() {
    return {
      childrenData: {
        title: '土地资源高程分析',
        type: 'landelevation',
        name: '高程分析',
        active: '1'
      },
      analysisData: {
        showEnd: false
      },
      analysisData2: {
        showEnd: false
      },
      data: {}
    }
  },

  methods: {
    myTab(key) {
      switch (key) {
        case 'city':
          this.getData({ evaluationType: 'evaluation_type-002' })
          this.childrenData.active = '2'

          break

        case 'country':
          this.getData({ evaluationType: 'evaluation_type-002' })
          this.childrenData.active = '1'
          break
      }
    },
    myAppraisals1(ids1, ids2) {
      this.$get(
        '/epf-planning-analysis/paevaluationanalysis/getAnalysisCalculationDate',
        {
          evaluationType: 'evaluation_type-002',
          analysisDataId: ids1,
          analysisDataId: ids2
        }
      ).then(res => {
        if (res.code == '0') {
          this.analysisData = res.analysisCalculationDate
          let echartData = []
          let arr = this.analysisData.evaluateConfluence
          this.analysisData.evaluateConfluence = JSON.parse(
            JSON.stringify(this.analysisData.evaluateConfluence).replace(
              /level/g,
              'name'
            )
          )
          this.analysisData.evaluateConfluence = JSON.parse(
            JSON.stringify(this.analysisData.evaluateConfluence).replace(
              /proportion/g,
              'value'
            )
          )
          for (
            var i = 0;
            i < this.analysisData.evaluateConfluence.length;
            i++
          ) {
            echartData.push(this.analysisData.evaluateConfluence[i].name)
          }

          this.$set(this.analysisData, 'echartsTableData', echartData)
          this.$set(this.analysisData, 'showEnd', true)
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    myAppraisals2(ids1, ids2) {
      this.$get(
        '/epf-planning-analysis/paevaluationanalysis/getAnalysisCalculationDate',
        {
          evaluationType: 'evaluation_type-002',
          analysisDataId: ids1,
          analysisDataId: ids2
        }
      ).then(res => {
        if (res.code == '0') {
          this.analysisData2 = res.analysisCalculationDate
          let echartData = []
          let arr = this.analysisData2.evaluateConfluence
          this.analysisData2.evaluateConfluence = JSON.parse(
            JSON.stringify(this.analysisData2.evaluateConfluence).replace(
              /level/g,
              'name'
            )
          )
          this.analysisData2.evaluateConfluence = JSON.parse(
            JSON.stringify(this.analysisData2.evaluateConfluence).replace(
              /proportion/g,
              'value'
            )
          )
          for (
            var i = 0;
            i < this.analysisData2.evaluateConfluence.length;
            i++
          ) {
            echartData.push(this.analysisData2.evaluateConfluence[i].name)
          }

          this.$set(this.analysisData2, 'echartsTableData', echartData)
          this.$set(this.analysisData2, 'showEnd', true)
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    }
  },
  computed: {
    classes() {
      return this.childrenData.active == '1' ? 'one' : 'two'
    },
    classes1() {
      return this.childrenData.active == '1' ? 'two' : 'one'
    }
  },
  components: { ZoomItem, PanItem, JumptoItem, toolbar, PlanSide },
  created() {
    this.getData({ evaluationType: 'evaluation_type-002' })
    this.getAnalysisDataList({})
    this.getImModelLibraryList({})
  }
}
</script>
<style scoped>
#main-container {
  height: 100%;
  width: 100%;
  padding: 20px;
  font-size: 16px;
  color: rgba(32, 32, 32, 1);
}

#main-container .el-header {
  padding: 0;
}
#main {
  position: relative;
  background: #e9eef3;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}

.one {
  background: rgba(29, 124, 228, 1);
  color: #fff;
}
.two {
  background: rgba(255, 255, 255, 1);
  color: rgba(29, 124, 228, 1);
}
</style>
