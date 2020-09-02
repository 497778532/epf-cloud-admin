<template>
  <div class="page-body EPF-table"
       id="contractPublic">
    <div class="filter_wrap">
      <!-- 搜索 -->
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">目录树名称 :</span>
          </el-col>
          <el-col :span="5">
            <el-input v-model="filterData.name"
                      placeholder="请输入目录树名称"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">创建时间 :</span>
          </el-col>
          <el-col :span="5">
            <el-date-picker v-model="filterData.createTimeStr"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"></el-date-picker>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <div class="primary_reset"
                 @click="resetFilter()">重置</div>
          </el-col>
          <el-col :span="2">
            <div class="primary_search"
                 @click="searchList()">搜索</div>
          </el-col>
        </el-row>
      </div>
      <div class="toolsTitleBox">
        <div class="EPFButton EFPcommon"
             @click="add()">新增</div>
      </div>
      <el-table :data="tableData"
                style="width: 100%"
                border
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)">
        <el-table-column label="序号"
                         type="index"
                         width="50"></el-table-column>

        <el-table-column label="目录树名称"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span class="list-style: none;">
              <!-- v-if="button.resourceId=='cjgs_ckxq'" -->
              <el-button type="text"
                         @click="btnClick(scope.row,'directoryTreeEditor')">编辑</el-button>
              <!-- v-if="button.resourceId=='cjgs_editinfo'&&scope.row.status=='0'" -->
              <el-button @click="btnClick(scope.row,'remove')"
                         type="text">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页控件 -->
      <div style="text-align:right;margin:8px 0px;margin-top:15px;">
        <el-pagination background
                       layout="prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10, 15, 20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :page-size="pageSize"
                       :current-page="pageNo"></el-pagination>
      </div>
    </div>
    <el-dialog top="35vh"
               title="目录树命名"
               :visible.sync="dialogVisible"
               width="30%"
               :show-close="false">
      <el-row>
        <el-col :span="5">
          <span class="filter_title">目录树名称 :</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="topLevel"
                    placeholder="请输入目录树名称"
                    :maxlength="50"></el-input>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary"
                   @click="handleClose()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import selectInput from '@/components/common/form/selectInpt'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'transnotice',
  components: { selectInput },
  data () {
    return {
      filterData: {},
      //  表格数据
      tableData: [{}, {}],
      topLevel: '',
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      dialogVisible: false,
      loading: false, // 控制loading动画显示隐藏
      params: {}
    }
  },

  created () {
    this.getList()
  },
  methods: {
    ...mapActions(['setTabsList']),

    add () {
      this.dialogVisible = true
    },
    authorize () { },
    con () {
      this.$router.push('/console')
    },
    close () {
      this.dialogVisible = false
      this.topLevel = ''
    },
    handleClose () {
      if (this.topLevel.length > 10) {
        this.$message.error('超过限定字数请重新输入!（不超过10个字）')
      } else {
        this.topLevelAdd()
      }
      // let title = "新增目录树";
      // let routerPath = `directoryTreeAdd`;
      // console.log(routerPath);
      // var tabObj = { title, routerPath };
      // this.setTabsList(tabObj);
      // this.$router.push({ path: routerPath });
    },

    btnClick (item, oper) {
      var routerPath, title
      if (oper === 'directoryTreeEditor') {
        title = '目录树编辑页'
        routerPath = oper + '?id=' + item.id
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath
        })
      }
      if (oper === 'remove') {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'
        })
          .then(() => {
            this.$post('/epf-onemap/admin/mapdiretree/deleteMapDireTree', {
              id: item.id
            }).then(res => {
              console.log(res)
              if (res.code == '0') {
                this.$message.success('删除成功') // 失败
                this.getList()
              } else {
                this.loading = false
                this.$message.error(res.msg) // 失败
                return
              }
            })
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
    topLevelAdd () {
      this.$post('/epf-onemap/admin/mapdiretree/addFristMapDireTree', {
        name: this.topLevel
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.pageNo = 1

          this.topLevel = ''
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.getList()
        } else {
          this.topLevel = ''
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.pageNo = 1
      this.pageSize = 5
      this.getList()
    },
    searchList () {
      this.pageNo = 1 // 自动刷新至第一页
      this.params = this.filterData
      this.getList()
    },
    getList (val) {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-onemap/admin/mapdiretree/topList', params).then(res => {
        console.log(res)
        if (res.code == '0') {
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

<style scoped>
.toolsTitleBox {
  height: 56px;
  background: rgba(230, 230, 230, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  text-align: right;
  line-height: 56px;
  margin-bottom: 20px;
  padding-right: 20px;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 13px;
  float: left;
}
.primary {
  background-color: #03b976;
  border-color: #03b976;
}

.btnBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.companyInfoBox {
  padding: 30px 30px;
  max-height: 600px;
  overflow-y: auto;
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.middleBox {
  margin: 30px auto;
  margin-top: 10px;
}
.middleBox_btn {
  width: 85%;
  margin: 30px auto;
  margin-bottom: 0;
}
.btnInfo {
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  letter-spacing: 3px;
}
</style>
<style>
#contractPublic .filter_wrap {
  box-sizing: border-box;
  padding: 30px 15px;
}
#contractPublic .filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding-right: 15px;
  text-align: right;
  line-height: 35px;
  color: rgba(48, 48, 48, 1);
  font-weight: 400;
  font-size: 16px;
}
#contractPublic .switchHeight_box {
  height: 56px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  line-height: 56px;
  margin-bottom: 20px;
}
#contractPublic .el-input__inner {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  height: 36px;
  line-height: 40px;
}

#contractPublic .el-button--text {
  padding: 5px 15px;
}
#contractPublic .el-dialog__header {
  border: none;
}
#contractPublic .el-dialog__title {
  color: rgba(29, 124, 228, 1);
}
#contractPublic .el-dialog__footer {
  border: none;
}
</style>
