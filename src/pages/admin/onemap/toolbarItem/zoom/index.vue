<template>
  <div class="toolbar-button-zoom" title="放大缩小">
    <div class="toolbar-button" title="放大" @click="handleZoomInClick">
      <img class="toolbar-button-icon" src="@/assets/onemap-zoomIn.png" />
    </div>
    <div class="toolbar-button" title="缩小" @click="handleZoomOutClick">
      <img class="toolbar-button-icon" style="height: unset;" src="@/assets/onemap-zoomOut.png" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ZoomItem',
  inject: ['mapAppId'],
  data() {
    return {
      constructor: null,
      instance: null,
      mapApp: null
    }
  },
  methods: {
    async startUp() {
      if (this.mapAppId) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }
    },
    handleZoomInClick() {
      this.startUp()
      if (this.mapApp.view.zoom < this.mapApp.view.constraints.maxZoom) {
        this.mapApp.view.zoom++
      }
    },
    handleZoomOutClick() {
      this.startUp()
      if (this.mapApp.view.zoom > this.mapApp.view.constraints.minZoom) {
        this.mapApp.view.zoom--
      }
    }
  }
}
</script>
<style scoped>
  @import "../style.css";
</style>
