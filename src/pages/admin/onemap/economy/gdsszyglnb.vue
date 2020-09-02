<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneTable-other">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">广东省水资源管理年报</div>
        </div>
      </div>
      <div class="page-list-nature EPF-table">
        <div class="switchHeight_box_nature"
             style="margin-bottom:16px;">
          <div class="switchHeight_box_nature_left">

            <!-- <div class="filter_title_box">
              <span class="filter_title__custom">区域选择：</span>
              <el-cascader :props="props"
                           clearable
                           v-model="areaSelectedOptions"
                           style="width:300px;"></el-cascader>
            </div>
            <div class="primary_search"
                 @click="searchList()">查询</div>
            <div class="flex-box"> -->
            <div class="primary_export"><span @click="exportList()">导出excel</span></div>
          </div>
        </div>

        <div>
          <el-table :data="listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    stripe
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border>
            <el-table-column prop="BZDW"
                             label="编制单位"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.BZDW===''">- -</span>
                <span v-else>{{scope.row.BZDW}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BGMC"
                             label="报告名称"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.BGMC===''">- -</span>
                <span v-else>{{scope.row.BGMC}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BZRQ"
                             label="编制日期"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.BZRQ===''">- -</span>
                <span v-else>{{scope.row.BZRQ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GXSJ"
                             label="更新时间"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.GXSJ===''">- -</span>
                <span v-else>{{scope.row.GXSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BGNR"
                             label="报告内容"
                             min-width="100"
                             align="center"
                             :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <span v-if="scope.row.BGNR===''">- -</span>
                <span v-else>{{scope.row.BGNR}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin:50px 0;text-align:right;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5, 10, 15, 20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="this.listData.length"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import moment from 'moment'

export default {
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      params: {
        BZDW: '',
        BZRQ: moment().year(),
        GXSJ: ''
      },

      loading: true,
      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      listData: []
    }
  },
  methods: {
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['编制单位', '报告名称', '编制日期', '更新时间', '报告内容']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['BZDW', 'BGMC', 'BZRQ', 'GXSJ', 'BGNR']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '广东省水资源管理年报')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getTableData () {
      this.loading = true
      let params = this.params
      this.$post('/epf-third-part/threebatch/GDSSZYGLNB', params).then(res => {
        if (res.code === 0) {
          this.listData = res.result
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.$data.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.currentPage = val // 页码改变
    }
  },
  created () {
    this.getTableData()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.getTableData()
    }
  }
}
</script>
<style scoped>
@import "./css/simplenessChart.css";

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
