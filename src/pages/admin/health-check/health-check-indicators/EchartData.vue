<template>
  <div id="server"
       ref="server"></div>
</template>

<script>
import echarts from 'echarts'
import { mapActions } from 'vuex'

export default {
  name: 'EchartData',

  props: {
    option: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      chart: null
    }
  },
  components: {},

  mounted () { },
  methods: {
    ...mapActions(['setTabsList']),

    useDrawLine (id, option) {
      this.$nextTick(function () {
        setTimeout(() => {
          let useChart = echarts.init(this.$refs[id])
          useChart.setOption(option)
        }, 1000)
      })
    },
    initEchart (id) {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs[id])
        this.$refs[id].$el.style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    },
    toDetail () {
      let title = '成果修改排行榜'
      let routerPath = '/columnsdetail'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    }
  },
  watch: {
    option (val) {
      this.initEchart('server')
      this.useDrawLine('server', val)
    },
    immediate: true
  }
}
</script>

<style scoped>
@import "./style.css";

#server {
  width: 100%;
  height: 600px;
}
</style>
