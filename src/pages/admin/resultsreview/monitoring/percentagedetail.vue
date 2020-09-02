<template>
  <div class="detail">
    <percentage :canMore="false"></percentage>
  </div>
</template>

<script>
import percentage from './percentage'
import { mapActions } from 'vuex'
export default {

  data() {
    return {}
  },
  components: {
    percentage
  },
  methods: {
    ...mapActions(['setTabsList'])
  }
}
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
  padding: 25px;
}
</style>
