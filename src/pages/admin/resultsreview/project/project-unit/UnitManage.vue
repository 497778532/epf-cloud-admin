<template>
  <div class="page-body EPF-table"
       id="dispatchlist">
    <div class="filter_wrap">

      <div class="unit-manage-header">
        <el-row>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">单位名称：</span>
            <el-input v-model="filterData.companyName"
                      style="width:calc(100% - 120px);"
                      placeholder="请输入单位名称关键词"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">资质等级：</span>
            <el-select v-model="filterData.planningLevel"
                       placeholder="请选择"
                       style="width:calc(100% - 120px);">
              <el-option v-for="(item, index) in planningQualificationLevelArr"
                         :label="item.zhCn"
                         :value="item.dictKey"
                         :key="index"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12"
                  class="unit-header-right">

            <div class="button_qian"
                 @click="resetFilter">重置</div>

            <div class="button_shen"
                 @click="searchList">搜索</div>
            <div style="height:40px;width:1px;background:#D9D9D9;margin-left:16px;"></div>
            <div class="button_kuang"
                 @click="importClick">导入</div>

            <div class="button_kuang"
                 @click="handelClickAdd">添加</div>

          </el-col>
        </el-row>
        <form id="import_form"
              style="display: none;">
          <input type="file"
                 id="import_input"
                 name="file"
                 @change="importFun">
        </form>
      </div>

      <el-table :data="tableData"
                style="width: 100%;margin-top:24px"
                border
                stripe
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)">
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="60"></el-table-column>
        <el-table-column prop="companyName"
                         label="单位名称"
                         align="center"
                         min-width="300"></el-table-column>
        <el-table-column prop="dictTranslate.planningLevelName"
                         label="城乡规划资质等级"
                         align="center"
                         min-width="160"></el-table-column>
        <el-table-column prop="certificateNo"
                         label="证书编号"
                         align="center"
                         min-width="220"></el-table-column>
        <el-table-column prop="issuingAuthority"
                         label="发证机关"
                         align="center"
                         min-width="220"></el-table-column>
        <el-table-column prop="issueDate"
                         label="发证日期"
                         min-width="120"
                         align="center"></el-table-column>
        <el-table-column prop="expiraDate"
                         label="有效期"
                         align="center"
                         min-width="120"></el-table-column>
        <el-table-column prop="createTime"
                         label="创建时间"
                         align="center"
                         min-width="170"></el-table-column>
        <el-table-column prop="createUser"
                         label="录入人"
                         min-width="80"
                         align="center"></el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span class="list-style: none;">
              <el-button type="text"
                         @click="btnClick(scope.row,'preview')">查看</el-button>
              <el-button type="text"
                         @click="btnClick(scope.row,'edit')">编辑</el-button>
              <el-button type="text"
                         @click="btnClick(scope.row,'del')">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页控件 -->
      <div style="text-align:right;margin:8px 0px;margin-top:15px;">
        <el-pagination background
                       layout="total, prev, pager, next, sizes, jumper"
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
import { mapActions, mapState } from 'vuex'
import Bus from '../../../../../utils/bus'

export default {
  name: 'unitmanage',
  data () {
    return {
      filterData: {
        planningLevel: '',
        companyName: ''
      },
      tableData: [],
      planningQualificationLevelArr: [], // 资质等级
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      loading: false, // 控制loading动画显示隐藏
      params: {}
    }
  },
  created () {
    this.getList()
    this.getGrowpList()
  },
  mounted () {
    Bus.$on('unitMsg', val => {
      console.log('unitMsg')
      // this.getList()
    })
  },
  methods: {
    ...mapActions(['setTabsList']),
    handelClickAdd () {
      this.setTabsList({
        title: '添加编制单位',
        routerPath: 'unitadd'
      })
      this.$router.push({ path: 'unitadd' })
    },
    async getGrowpList () {
      // 查询字典  城乡资质等级
      this.$get('/epf-admin/admin/dictionaries/getDictEbyDictGroup/planning_qualification_level')
        .then(res => {
          if (res.code === 0) {
            this.planningQualificationLevelArr = res.dictionariesList
          }
        })
    },
    btnClick (item, oper, state) {
      if (oper === 'preview') {
        this.setTabsList({
          title: '编制单位查看',
          routerPath: 'unitcheck'
        })
        this.$router.push({ path: 'unitcheck', query: { id: item.id } })
      } else if (oper === 'edit') {
        this.setTabsList({
          title: '编制单位编辑',
          routerPath: 'unitedit'
        })
        this.$router.push({ path: 'unitedit', query: { id: item.id } })
      } else if (oper === 'del') {
        this.$confirm('请确认是否删除当前编制单位？', '删除规划分类', {
          // type: 'warning',
          center: true
        })
          .then(async () => {
            let id = item.id
            let res = await this.$get(
              '/epf-result-review/preparatUnit/delete',
              {
                id: id
              }
            )
            if (res.code == '0') {
              this.$message.success('删除成功')
              this.getList()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }

      // this.getObject(row.id)
    },
    resetFilter () {
      if (!this.filterData.planningLevel && !this.filterData.companyName) return
      this.filterData.planningLevel = ''
      this.filterData.companyName = ''
      this.params = {}
      this.getList()
    },
    searchList () {
      if (!this.filterData.planningLevel && !this.filterData.companyName) return
      let query = {
        planningLevel: this.filterData.planningLevel,
        companyName: this.filterData.companyName
      }
      this.getList(query)
    },
    getList (params = this.params) {
      this.loading = true
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get(
        '/epf-result-review/preparatUnit/findList',
        params
      ).then(res => {
        if (res.code === 0) {
          this.tableData = res.pager.results
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
        .catch(res => {
          this.tableData = []
          this.loading = false
          this.$message.error('表格数据 请求错误~')
        })
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
    },
    importClick () {
      document.getElementById('import_input').click()
    },
    importFun () {
      let formData = new FormData(document.getElementById('import_form'))
      this.$useAppend('/epf-result-review/preparatUnit/importData', formData).then(res => {
        if (res.code === 0) {
          this.getList()
          this.$message.success(res.msg) // 成功
        }
      })
    }
  }
}
</script>

<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.filter_wrap {
  min-height: 789px;
  box-sizing: border-box;
  padding: 16px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_title_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.filter_title__custom {
  box-sizing: border-box;
  width: 90px;
  min-width: 90px;
  max-width: 90px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.unit-manage-header {
  background: rgba(255, 255, 255, 1);
  line-height: 40px;
  margin-bottom: 10px;
}
.unit-manage-header .unit-header-right {
  display: flex;
  justify-content: flex-end;
}
.unit-manage-header .unit-header-right span {
  display: block;
}

.unit-manage-header .white-btn {
  border-color: #1b74ee;
  color: #1b74ee;
}
</style>
