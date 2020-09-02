<template>
  <!-- <div class="exchangeTable">
    <el-row class="tabHeader">
      <span>单位：公顷</span>
    </el-row>
    <div id="columns" ref="columns"></div>
  </div>-->
  <div :id="id" :style="{width:width,height:height}" ref="columns"></div>
</template>

<script>
import echarts from 'echarts'
import { mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: `chart-${Math.random() * 100}`
    },
    option: {
      type: Object,
      default: null
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null
    }
  },
  components: {},

  mounted() {
    this.initEchart()
    this.useDrawLine()
  },
  methods: {
    ...mapActions(['setTabsList']),
    loadMap() {
      let useChart = echarts.init(document.getElementById(this.id))
      useChart.setOption(this.option)
      if (this.type === 'timeline') {
        this.$parent.registerTimelineChange(useChart)
      }
    },

    toDetail() {
      let title = '成果修改排行榜'
      let routerPath = '/columnsdetail'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    useDrawLine() {
      // this.$nextTick(function() {
      //   setTimeout(() => {
      //     this.loadMap();
      //   }, 1000);
      // });
      this.loadMap()
    },
    initEchart() {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.id)
        document.getElementById('columns').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    }
  }
}
</script>

<style scoped>
@import "../css/style.css";
</style>
