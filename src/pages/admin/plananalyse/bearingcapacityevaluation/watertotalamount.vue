<template>
  <el-aside id="aside" width="400px">
    <el-container>
      <el-header id="aside-header" style="height: 40px;">
        <span class="title">{{childrenData.title}}</span>
      </el-header>

      <planSide :data="childrenData" :endData="analysisData" @appraisals="myAppraisals1"></planSide>
    </el-container>
  </el-aside>
</template>
<script>

import PlanSide from './PlanSide'
import miXin from './plananalyse'
export default {
  name: 'watertotalamount',
  mixins: [miXin],
  data() {
    return {
      childrenData: {
        title: '水资源总量评价',
        type: 'watertotalamount',
        name: '水资源总量评价'
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
          evaluationType: 'evaluation_type-006',
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
    }
  },
  computed: {},
  components: { PlanSide },
  created() {
    this.getData({ evaluationType: 'evaluation_type-006' })
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
