<template>
<div class="page-body">
  <div class="pageName">1.1 栏目配置</div>
  <el-container style="overflow-x: auto">
    <el-aside class="app-side" width="150px" style="background: white">

    </el-aside>
    <el-main class="app-body">

    </el-main>
  </el-container>

  </div>
</template>
<script>
import { constants } from 'fs'

export default {
  components: {
  },
  data () {
    return {

      tableDatas: []

    }
  },
  created: function() {

  },
  mounted: function() {
    var that = this
  },
  methods: {
    handleClick(e) {
      console.log(e.name)
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },

    editInfo: function(e) {
      this.list = 'ss'
    }
  }
}
</script>
<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
  .pageName{
    padding-left: 15px;
    margin-bottom: 15px;
    border-left: 4px solid rgba(26, 188, 156, 6);
  }
  .toolsTitleBox{
    height: 40px;
    line-height: 40px;
    background: rgba(211, 211, 211, 0.1);
  }
  .toolsTitle{
    line-height: 40px;
    font-size: 12px;
    margin-left: 25px;
  }
  .toolsTips{
    line-height: 40px;
    font-size: 14px;
    margin-left: 10px;
    color:red;
  }
</style>

