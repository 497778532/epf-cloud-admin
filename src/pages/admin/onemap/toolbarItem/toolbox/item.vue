<template>
  <div>
    <div
      id="toolboxButton"
      class="toolbar-button toolbar-button-long"
      title="工具箱"
    >
      <img class="toolbar-button-icon toolbar-button-icon-long" src="@/assets/onemap-toolbox.png" />
      <p class="toolbar-button-text-long">工具箱</p>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'toolbox'
}
</script>
<style>
@import "../style.css";
</style>
