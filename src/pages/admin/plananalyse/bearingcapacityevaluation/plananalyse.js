export default {
  data() {
    return {
      select1: [],
      select2: []

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getData(params) {
      this.$get(
        '/epf-planning-analysis/paevaluationanalysis/getPaEvaluationAnalysisByEvaluationType', params
      ).then(res => {
        if (res.code == '0') {
          this.childrenData = Object.assign(
            this.childrenData,
            res.paEvaluationAnalysis
          )
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    getAnalysisDataList(params) {
      this.$get(
        '/epf-planning-analysis/paevaluationanalysis/getAnalysisDataList', params
      ).then(res => {
        if (res.code == '0') {
          this.select1 = res.analysisDataList
          this.$set(this.childrenData, 'select1', res.analysisDataList)
          return
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    getImModelLibraryList(params) {
      this.$get(
        '/epf-planning-analysis/paevaluationanalysis/getImModelLibraryList', params
      ).then(res => {
        if (res.code == '0') {
          this.select2 = res.imModelLibraryList
          this.$set(this.childrenData, 'select2', res.imModelLibraryList)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    }

  }
}
