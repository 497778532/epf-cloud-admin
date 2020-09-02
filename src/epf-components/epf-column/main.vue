<template>
  <div class="epf-column__wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EpfCol',
  props: {
    column: {
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
.epf-column__wrapper {
  width: auto;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
}
</style>
