<template>
  <div class="epf-side__wrapper">
    <div class="epf-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EpfSide'
}
</script>
<style scoped>
.epf-side__wrapper {
  width: 400px;
  overflow: auto;
  background-color: #fff;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.epf-content {
  margin: 0;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
