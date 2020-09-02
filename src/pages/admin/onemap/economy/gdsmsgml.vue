<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneTable-other">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">广东省美术馆名录</div>
        </div>
      </div>
      <div class="page-list-nature EPF-table">
        <div class="switchHeight_box_nature"
             style="margin-bottom:16px;">
          <div class="switchHeight_box_nature_left">

            <div class="filter_title_box">
              <span class="filter_title__custom">区域选择：</span>
              <el-cascader :props="props"
                           clearable
                           v-model="areaSelectedOptions"
                           style="width:300px;"></el-cascader>
            </div>
            <div class="primary_search"
                 @click="searchList()">查询</div>
            <div class="flex-box">
              <div class="primary_export"><span @click="exportList()">导出excel</span></div>
            </div>
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
            <el-table-column prop="SSDS"
                             label="所属地市"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.SSDS===''">- -</span>
                <span v-else>{{scope.row.SSDS}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CGFL"
                             label="场馆分类"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.CGFL===''">- -</span>
                <span v-else>{{scope.row.CGFL}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CGMC"
                             label="场馆名称"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.CGMC===''">- -</span>
                <span v-else>{{scope.row.CGMC}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="TXDZ"
                             label="通讯地址"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.TXDZ===''">- -</span>
                <span v-else>{{scope.row.TXDZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="DH"
                             label="电话"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.DH===''">- -</span>
                <span v-else>{{scope.row.DH}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YB"
                             label="邮编"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.YB===''">- -</span>
                <span v-else>{{scope.row.YB}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="CZ"
                             label="传真"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.CZ===''">- -</span>
                <span v-else>{{scope.row.CZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JJ"
                             label="简介"
                             min-width="100"
                             align="center"
                             :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <span v-if="scope.row.JJ===''">- -</span>
                <span v-else>{{scope.row.JJ}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="GXSJ"
                             label="更新时间"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.GXSJ===''">- -</span>
                <span v-else>{{scope.row.GXSJ}}</span>
              </template>
            </el-table-column> -->

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
import areaSelect from '../../../../assets/js/areaCascader'

export default {
  mixins: [areaSelect],
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      params: {
        SSDS: '440000'
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
    searchList () {
      if (this.areaSelectedOptions.length === 1) {
        this.params.SSDS = this.areaSelectedOptions[0]
      } else if (this.areaSelectedOptions.length === 2) {
        this.params.SSDS = this.areaSelectedOptions[1]
      } else if (this.areaSelectedOptions.length === 3) {
        this.params.SSDS = this.areaSelectedOptions[2]
      } else if (this.areaSelectedOptions.length === 0) {
        this.params.SSDS = ''
      }
      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getTableData()
    },
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['所属地市', '场馆分类', '场馆名称', '通讯地址', '电话', '邮编', '传真', '简介']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['SSDS', 'CGFL', 'CGMC', 'TXDZ', 'DH', 'YB', 'CZ', 'JJ']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '广东省美术馆名录')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getTableData () {
      this.loading = true
      let params = this.params
      this.$post('/epf-third-part/twoBatch/GDSMSGML', params).then(res => {
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
