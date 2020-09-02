<template>
  <div class="page-body">
    <div class="filter_wrap"
         v-if="data.previewType==='HTML'"
         v-html="data.text">
    </div>
    <div class="filter_wrap"
         v-if="data.previewType==='TEXT'">
      {{data.text}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'EmailLook',

  data () {
    return {
      data: {
        previewType: '',
        text: ''
      }
    }
  },

  created () {
    this.data = this.$route.query
  },
  methods: {
  },
  watch: {
    $route (to, form) {
      if (to.name === form.name && to.fullPath !== form.fullPath) {
        this.$set(this.data, 'previewType', to.query.previewType)
        this.$set(this.data, 'text', to.query.text)
      }
    }
  }

}
</script>

<style scoped>
.page-body {
  height: auto;
  font-size: 16px;
  white-space: pre-wrap;
  padding: 16px 24px;
}
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  min-height: 789px;
  box-sizing: border-box;
  padding: 16px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
</style>
