<template>
<div class="app-footer-box">
  <!-- <img src="../assets/logo.png" alt="logo" class="footer-logo"> -->
  <i class="fa fa-meetup" style="color: #29ABE2"></i>&nbsp;
  <!--<span class="footer-text">{{appName}} ©make by
    &lt;!&ndash; <a href="https://www.github.com/mengdu" target="_blank"> &ndash;&gt;
      {{author}}
    &lt;!&ndash; </a> &ndash;&gt;-->
  <span class="footer-text">{{InfoConfigBase.techSupport}}
    <!-- </a> -->
  <!--&nbsp;版本号：<el-tag size="mini">{{version}}</el-tag>-->
    &nbsp;版本号：<el-tag size="mini">{{InfoConfigBase.version}}</el-tag>
  </span>
</div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      // author: window.APP_INFO.author,
      // version: window.APP_INFO.version,
      // appName: window.APP_INFO.appName,
      InfoConfigBase: {}
    }
  },
  created() {
    this.$http.get('/api/epf-cms/cms/basics/getInformationList', {}).then(res => {
      if (res.code != '0') {
        this.$message.error(res.msg)// 失败
        return
      }
      this.InfoConfigBase = res.list[0]
    })
  }
}
</script>
<style type="text/css">
  .app-footer-box{
    height: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .app-footer-box .footer-logo{
    width: 24px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .app-footer-box .footer-text{
    color: #8b949e;
  }
</style>
