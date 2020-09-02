<template>
  <div class="epf-page__wrapper"
       :class="[{
         'is-row': row,
         'is-column': col
       }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EpfPage',
  props: {
    row: Boolean,
    col: Boolean
  }
}
</script>

<style scoped>
.epf-page__wrapper {
  position: relative;
  margin: 0;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #f7f7f7;
}
.is-row {
  flex-direction: row;
}
.is-column {
  flex-direction: column;
}
</style>
