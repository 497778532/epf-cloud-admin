<template>
  <div class="detail">
    <columns :canMore="false"></columns>
  </div>
</template>

<script>
import columns from './columns'
export default {
  data() {
    return {}
  },
  components: {
    columns
  }
}
</script>

<style scoped>
.detail{
  width: 100%;
  height:100%;
  padding: 25px
}
</style>
