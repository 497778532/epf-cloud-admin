<template>
  <div class="wrap">
    <iframe v-if="documentId != null"
            :src="pSrc"
            width="100%"
            height="100%"></iframe>
    <div v-else>没有相应文件</div>
  </div>
</template>

<script>
export default {
  name: 'ComprehensiveDeail',
  data () {
    return {
      pSrc: '',
      documentId: this.$route.params.documentId
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    loadPDF () {
      if (this.documentId) {
        // baseurl ：pdf存放的文件路径，可以是本地的，也可以是远程
        let baseurl
          = '/api/epf-document/document/downloadById?id=' + this.documentId
        // ie有缓存加个随机数解决 + '?r=' + new Date()
        let pSrc = baseurl + '&r=' + new Date()
        this.pSrc = `../../../../../../static/pdf/web/viewer.html?file=${encodeURIComponent(
          pSrc
        )}`

        console.log(this.pSrc)
      }
    }
  },

  mounted () {
    this.loadPDF()
  }
}
</script>

<style scoped>
.wrap {
  position: flex;
  top: 15%;
  /* left: 10%; */
  width: 100%;
  height: 100%;
  bottom: 0;
}
</style>
