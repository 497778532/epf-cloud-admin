<template>
  <div id="panButton" class="toolbar-button" title="移动" @click="handlePanClick">
    <img class="toolbar-button-icon" src="@/assets/onemap-pan.png" />
  </div>
</template>
<script>
export default {
  name: 'pan',
  methods: {
    handlePanClick() {
      var style = this.$parent.mapApp.view.container.style
      if (style.cursor === 'auto' || style.cursor === '') {
        style.cursor = 'move'
      } else {
        style.cursor = 'auto'
      }
    }
  }
}
</script>
<style scoped>
  @import "../style.css";
</style>
