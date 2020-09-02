
<template>
  <div id="trashButton" class="toolbar-button toolbar-button-long" title="清除属性" @click="handleTrashClick">
    <img class="toolbar-button-icon toolbar-button-icon-long" src="@/assets/onemap-trash.png" />
    <p class="toolbar-button-text-long">清除</p>
  </div>
</template>

<script>
export default {
  name: 'trash',
  inject: ['mapAppId'],
  data() {
    return {
      mapApp: null
    }
  },
  methods: {
    handleTrashClick() {
      this.$parent.hideAllPanel()
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }
      this.mapApp.view.container.style = 'auto'
      if (this.mapApp.findLayerById('RGLayer')) {
        this.mapApp.removeLayerById('RGLayer')
      }
      if (this.mapApp.findLayerById('SGLayer')) {
        this.mapApp.removeLayerById('SGLayer')
      }
      this.mapApp.view.graphics.removeAll()
    }
  }
}
</script>

<style scoped>
</style>
