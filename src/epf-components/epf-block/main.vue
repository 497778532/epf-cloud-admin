<template>
  <div class="epf-block__wrapper"
       :class="[{
         'is-row': row,
         'is-column': col
       }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EpfBlock',
  props: {
    row: Boolean,
    col: Boolean
  }
}
</script>

<style scoped>
.epf-block__wrapper {
  width: 100%;
  line-height: 22px;
}
.is-row {
  flex-direction: row;
}
.is-column {
  flex-direction: column;
}
</style>
