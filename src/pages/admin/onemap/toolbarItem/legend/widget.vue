<template>
  <widgetpanel v-show="showPanel">
    <div class="epf-map-content"
         ref="content"></div>
  </widgetpanel>
</template>

<script>
import widgetpanel from '../../utils/panel'
export default {
  name: 'LegendWidget',
  componentName: '图例',
  inject: ['mapAppId'],
  data() {
    return {
      constructor: null,
      instance: null,
      mapApp: null,
      showPanel: false
    }
  },
  watch: {
    showPanel(val) {
      if (val) {
        this.showLegend()
      }
    }
  },
  methods: {
    showLegend() {
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }
      if (!this.mapApp.widgetInstance.legend) {
        this.mapApp.createLegend(this.$refs.content)
      }
    }
  },
  components: {
    widgetpanel
  }
}
</script>

<style>
</style>
