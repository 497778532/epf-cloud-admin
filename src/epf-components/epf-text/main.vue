<template>
  <p class="epf-text__wrapper">{{content}}</p>
</template>

<script>
export default {
  name: 'EpfText',
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.epf-text__wrapper {
  font-size: 16px;
  padding: 0 14px;
  /* text-indent: 32px; */
}
</style>
