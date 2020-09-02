<template>
  <div class="toolbar-button toolbar-button-long" title="查看属性" @click="handleAttributesClick">
    <img class="toolbar-button-icon toolbar-button-icon-long" src="@/assets/onemap-attributes.png" />
    <p class="toolbar-button-text-long">查看属性</p>
  </div>
</template>

<script>
export default {
  name: 'attributes-item',
  methods: {
    handleAttributesClick() {
      this.$emit('openPanel', 'DrawBox')
    }
  }
}
</script>
