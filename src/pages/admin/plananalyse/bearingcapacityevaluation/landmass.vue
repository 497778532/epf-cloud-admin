<template>
  <el-container id="main-container"
                class="EPF-table">
    <el-main id="main">
      <epf-mapview name="landmass"
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

        <planSide :data="childrenData"
                  :endData="analysisData"
                  @appraisals="myAppraisals1"></planSide>
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
  name: 'landundulate',
  mixins: [miXin],
  data() {
    return {
      childrenData: {
        title: '土壤质地分析',
        type: 'landmass',
        name: '质地分析'
      },
      analysisData: {
        showEnd: false
      }
    }
  },

  methods: {
    myAppraisals1(ids1, ids2, key) {
      this.$get(
        '/epf-planning-analysis/paevaluationanalysis/getAnalysisCalculationDate',
        {
          evaluationType: 'evaluation_type-004',
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
          this.$set(this.analysisData, 'showEnd', true)
          this.$set(this.analysisData, 'echartsTableData', echartData)
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    }
  },
  computed: {},
  components: { ZoomItem, PanItem, JumptoItem, toolbar, PlanSide },
  created() {
    this.getData({ evaluationType: 'evaluation_type-004' })
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

#main {
  position: relative;
  background: #e9eef3;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
</style>
