<template>
  <div class="EPF-table HealthAdmin">
    <div class="filter_wrap">
      <!-- 搜索 -->
      <div class="switchHeight_box">
        <el-row type="flex"
                align="middle">
          <el-col :span="3">
            <span class="filter_title">所属年份：</span>
          </el-col>
          <el-col :span="4"
                  style="margin-left:-40px">
            <el-input v-model="filterData.year"
                      placeholder="请输入年份"
                      :maxlength="4"></el-input>
          </el-col>

          <el-col :span="2"
                  :offset="11">
            <div class="primary_reset"
                 @click="resetFilter()">重置</div>
          </el-col>
          <el-col :span="2">
            <div class="primary_search"
                 @click="searchList()">查询</div>
          </el-col>

          <el-col :span="2">
            <div class="primary_search"
                 @click="myExport()">导出报告</div>
          </el-col>
        </el-row>
      </div>
      <!-- :span-method="objectSpanMethod" -->
      <el-table :data="data"
                style="width: 100%;margin-top:20px"
                border>
        <el-table-column type="selection"
                         min-width="50"></el-table-column>
        <el-table-column type="index"
                         width="70"
                         label="全选"></el-table-column>

        <el-table-column label="体检编号"
                         min-width="160"
                         prop="checkUpNo"></el-table-column>

        <el-table-column label="所属年份"
                         min-width="100"
                         prop="year"></el-table-column>
        <el-table-column label="体检时间"
                         min-width="150"
                         prop="createTime"></el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         min-width="250"
                         align="center">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row)"
                       type="text">查看体检报告</el-button>
            <el-button @click="downLoad(scope.row)"
                       type="text">下载体检报告</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页控件 -->
      <div style="text-align:right;margin:8px 0px;margin-top:15px;">
        <el-pagination background
                       layout="total,prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10, 15, 20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :page-size="pageSize"
                       :current-page="pageNo"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'HealthAdmin',

  data () {
    return {
      arr1: [''],
      arr2: [''],
      arr3: [''],
      editorData: {},
      editorVisible: false,
      detailVisible: false,
      configuration: false,
      checkedCities: [],
      classification: [],
      allTree: [],
      radio: 0,
      myClassification: [],
      num: 2018,
      innerVisible: false,

      currentID1: '',
      currentID2: '',
      currentID3: '',
      dialogVisible: false,
      data: [],
      configurationData: {},
      imIndexValue: [],
      children: [],
      filterData: {
        year: ''
      },
      href: '/api/epf-index-model/imindexmanage/exportIndexExcel?',
      pictureFilterData: {},
      //  表格数据

      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      addParams: {},
      loading: false,
      params: {}
    }
  },
  components: {},
  created () {
    this.getList()
  },

  mounted () { },
  watch: {},
  methods: {
    ...mapActions(['setTabsList']),
    detail (item) {
      let title = '查看体检结果'
      let routerPath = `/HealthDetail?id=${item.id}`
      let tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    downLoad (item) { },
    getList (val) {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get(
        '/epf-monitor-evaluation/yearCheckup/getCheckupPage',
        params
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.data = res.pager.results
          this.pageNo = res.pager.pageNo
          this.pageSize = res.pager.pageSize
          this.totalPage = res.pager.totalPage
          this.totalRecord = res.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    searchList () {
      this.params = this.filterData
      this.pageNo = 1
      this.pageSize = 5
      this.getList()
    },
    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.params = this.filterData
      this.getList()
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getList()
    },

    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getList()
    }
  }
}
</script>

<style  scoped>
.HealthAdmin {
  padding: 16px 24px;
}
.filter_wrap {
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  padding: 16px;
  min-height: 790px;
}
</style>
