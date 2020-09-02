<template>
  <div id="app"
       style="height:100%;">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      userType: ''
    }
  },
  created () {
    this.userType = window.location.href
    if (this.userType.indexOf('type=2') == -1) {
      document.title = '广东省国土空间规划“一张图”实施监督信息系统'
    } else if (this.userType.indexOf('type=2') != -1) {
      document.title = 'SZ项目参考资料知识库管理系统'
    }
  },
  mounted () {
    this.userType = window.location.href
    if (this.userType.indexOf('type=2') == -1) {
      document.title = '广东省国土空间规划“一张图”实施监督信息系统'
    } else if (this.userType.indexOf('type=2') != -1) {
      document.title = 'SZ项目参考资料知识库管理系统'
    }
  }
}
</script>
