<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">

    <el-table-column
      prop="id"
      label="编号"
      width="170"
      align="center">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="250"
      align="center">
    </el-table-column>
    <el-table-column
      prop="fromWhere"
      label="信息来源"
      width="180"
      align="center">
    </el-table-column>
    <el-table-column
      prop="readCount"
      label="访问次数"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="statusName"
      label="状态"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="pubTime"
      label="发布时间"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="lastUpdateTime"
      label="修改时间"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="220"
      align="center">
       <template slot-scope="scope">
        <el-button
          size="mini"
          :type="item.type"
          plain
          @click="handleEdit(scope.$index, scope.row)"
          v-for="(item,index) in handleData"
          :key="index"
          >{{item.title}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {

  data () {
    return {
      handleData: '',
      tableData: []
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    }
  },
  props: {
    tabledt: Array,
    handle: {
      type: Array
    }
  },
  created () {
    this.handleData = this.handle
    this.tableData = this.tabledt
    console.log(this.handleData)
  },
  watch: {
    tabledt(curVal, oldVal) {
      if (curVal) {
        this.tableData = curVal
      }
    }
  }
}
</script>
<style>
  .el-table .el-table__header thead th{
    background:rgba(241, 241, 241, 0.226);
  }
</style>
