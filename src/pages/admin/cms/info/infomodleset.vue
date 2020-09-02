<template>
<div class="page-body">
  <div class="pageName">1.1 模板配置</div>
  <el-container style="overflow-x: auto">
    <el-aside class="app-side" width="150px" style="background: white">

    </el-aside>
    <el-main class="app-body">
          <personalFiltrate></personalFiltrate>
          <div class="toolsTitleBox">
            <span class="toolsTitle">信息列表</span>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            background
            layout="prev, pager, next"
            :page-size="pagesize"
            :total="totalpage">
          </el-pagination>

    </el-main>
  </el-container>

  </div>
</template>
<script>
import personalFiltrate from '../../../../components/personalFiltrate'
import { constants } from 'fs'

export default {
  components: {
    personalFiltrate
  },
  data () {
    return {
      pagesize: 1,
      currentPage: 1,
      totalpage: 1,
      tableDatas: [],
      handleDataWait: [
        {
          type: 'success',
          title: '审核'
        },
        {
          type: 'primary',
          title: '自动核验'
        }
      ],
      handleDataSuccess: [
        {
          type: 'primary',
          title: '查看审核结果'
        },
        {
          type: 'danger',
          title: '下架'
        }
      ],
      handleDataError: [
        {
          type: 'primary',
          title: '查看审核结果'
        }
      ]
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

