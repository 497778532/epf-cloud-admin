<template>
  <div class="epf-row__wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EpfRow',
  props: {
    row: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.epf-row__wrapper {
  width: 100%;
  margin: 10px 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: left;
}
</style>

