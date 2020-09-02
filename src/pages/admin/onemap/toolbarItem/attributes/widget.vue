<template>
  <div id="attributesButton" class="toolbar-button" title="查看属性" @click="handleAttributesClick">
    <img class="toolbar-button-icon" src="@/assets/onemap-attributes.png" />
  </div>
</template>

<script>
export default {
  name: 'attributes',
  methods: {
    handleAttributesClick() {
      this.$emit('updateShowState', 'DrawBox')
    }
  }
}
</script>
<style scoped>
</style>
