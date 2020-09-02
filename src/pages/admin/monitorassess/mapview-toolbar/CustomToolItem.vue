<template>
  <div>
    <div id="toolboxButton"
         class="toolbar-button toolbar-button-long"
         title="监测预警">
      <img class="toolbar-button-icon toolbar-button-icon-long"
           src="@/assets/monitorassess.png" />
      <p class="toolbar-button-text-long">监测预警</p>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CustomToolItem'
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
</style>
