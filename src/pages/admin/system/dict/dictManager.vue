<template>
  <div class="dictGroup">
    <table-com/>
  </div>
</template>
<script>
import table from './groupTable.vue'
export default {
  name: 'dictManager',
  data () {
    return {

    }
  },
  components: {
    tableCom: table
  }
}
</script>
<style scoped>
.dictGroup{
  height: 100%;
}
</style>
