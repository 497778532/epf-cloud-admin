<template>
  <div class="page-body">
    <a :href="this.diaoYanHref"
       target="_blank"
       style="font-size:16px;">调研问卷系统</a>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Questionnaire',
  data () {
    return {
      adminName: '',
      diaoYanHref: ''
    }
  },
  methods: {
    async getMsg () {
      let res = await this.$get('/epf-admin/admin/user/geUserInfo')
      this.adminName = res.username
      this.diaoYanHref = `http://120.79.99.87:7776/diaowen/login.jsp?loginUser=${this.adminName}`
      window.open('http://120.79.99.87:7776/diaowen/login.jsp?loginUser=' + this.adminName)
    }
  },
  created () {
    this.getMsg()
  }
}
</script>
<style scoped>
.page-body {
  padding: 15px;
  background-color: #f7f7f7;
  width: 100%;
  height: 100%;
}
</style>
