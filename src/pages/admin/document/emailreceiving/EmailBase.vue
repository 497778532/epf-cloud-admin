<template>
  <el-scrollbar style="height:100%"
                ref="tableScrollbar">
    <div class="page-body EPF-table">
      <div class="filter_wrap">
        <!-- 搜索 -->
        <div class="switchHeight_box">
          <el-row style="margin-bottom:24px;">
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom_two">标题：</span>
              <el-input size="small"
                        v-model="filterData.subject"
                        placeholder="请输入标题"
                        style="width:calc(100% - 90px);"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom_two">内容：</span>
              <el-input size="small"
                        v-model="filterData.text"
                        placeholder="请输入内容"
                        style="width:calc(100% - 90px);"
                        :maxlength="50"></el-input>
            </el-col>

            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom">发送邮箱：</span>
              <el-input size="small"
                        v-model="filterData.sendMail"
                        placeholder="请输入发送邮箱"
                        style="width:calc(100% - 120px);"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="2">
              <div style="width:100%;height:40px;"></div>
            </el-col>
            <el-col :span="4"
                    style="display:flex;justify-content:flex-end;">
              <div class="primary_reset"
                   @click="resetFilter()">重置</div>
              <div class="primary_search"
                   @click="searchList()">搜索</div>
            </el-col>

          </el-row>
        </div>

        <el-table :data="tableData"
                  style="width: 100%"
                  stripe
                  border
                  :default-sort="{ prop: 'sendTime', order: 'descending' }"
                  :header-cell-style="{background:'rgba(246,246,246,1)'}">
          <el-table-column label="发送者"
                           min-width="120"
                           align="center">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.sender }}</span>
            </template>
          </el-table-column>
          <el-table-column label="来自邮箱"
                           min-width="170"
                           align="center">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.sendMail }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文档标题"
                           min-width="170"
                           align="center">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.subject }}</span>
            </template>
          </el-table-column>

          <el-table-column label="发送时间"
                           min-width="170"
                           align="center">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.sendTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="文档内容"
                           min-width="170"
                           show-overflow-tooltip
                           align="center">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.text }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注信息"
                           min-width="170"
                           align="center">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right"
                           label="操作"
                           min-width="170"
                           align="center">
            <template slot-scope="scope">

              <el-button type="text"
                         @click="btnClick(scope.row,'EmailDetail')">查看详情</el-button>

              <el-button @click="look(scope.row,'EmailLook')"
                         type="text">预览</el-button>
              <el-button @click="deleted(scope.row)"
                         type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页控件 -->
        <div style="text-align:right;margin:8px 0px;margin-top:15px;">
          <el-pagination background
                         layout="total, prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="totalRecord"
                         :page-size="pageSize"
                         :current-page="pageNo"></el-pagination>
        </div>
      </div>

      <el-dialog title="外层 Dialog"
                 :visible.sync="outerVisible">

        <div slot="footer"
             class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>

        </div>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>

<script>
import selectInput from '@/components/common/form/selectInpt'
import { mapActions, mapState } from 'vuex'
import areaSelect from '../../../../assets/js/areaCascader'
import Bus from '../../../../utils/bus'

export default {
  name: 'transnotice',
  components: { selectInput },
  mixins: [areaSelect],
  data () {
    return {
      outerVisible: false,
      filterData: {
        subject: '',
        text: '',
        sendMail: ''
      },
      //  表格数据
      tableData: [

      ],
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
    handleClose () {
      this.topLevelAdd()
      // let title = "新增目录树";
      // let routerPath = `directoryTreeAdd`;
      // console.log(routerPath);
      // var tabObj = { title, routerPath };
      // this.setTabsList(tabObj);
      // this.$router.push({ path: routerPath });
    },

    btnClick (item, oper) {
      var routerPath, title
      if (oper === 'EmailDetail') {
        title = '邮件详情'
      }

      routerPath = oper + '?id=' + item.id
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath
      })
    },
    look (item) {
      if (!item.previewType) {
        this.$message('该文件无内容')
        return
      }
      if (item.previewType === 'URL') {
        window.open(item.text)
        return
      }
      let title = '邮件预览'
      let routerPath = `EmailLook?id=${item.id}&previewType=${item.previewType}&text=${item.text}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: item
      })
    },
    deleted (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      }).then(() => {
        this.$post(
          '/epf-document/receivecontent/delete',
          { id: item.id }
        ).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.loading = false
            this.$message.error(res.msg) // 失败
            return
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.getList()
    },
    searchList () {
      this.params = this.filterData
      this.getList()
    },
    getList (val) {
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$post(
        '/epf-document/receivecontent/findList',
        params
      ).then(res => {
        if (res.code === 0) {
          this.tableData = res.pager.results
          this.pageNo = res.pager.pageNo
          this.pageSize = res.pager.pageSize
          this.totalPage = res.pager.totalPage
          this.totalRecord = res.pager.totalRecord
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

  },
  mounted () {
    Bus.$on('emailSubmit', val => {
      this.getList()
    })
  },
  watch: {
    pageNo (val) {
      this.$refs.tableScrollbar.wrap.scrollTop = 0
    },
    pageSize (val) {
      this.$refs.tableScrollbar.wrap.scrollTop = 0
    }
  }
}
</script>

<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
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

.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  min-height: 789px;
  box-sizing: border-box;
  padding: 16px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
.switchHeight_box {
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
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
.filter_title__custom_two {
  box-sizing: border-box;
  width: 60px;
  min-width: 60px;
  max-width: 60px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.el-input__inner {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  height: 36px;
  line-height: 40px;
}
.primary_search {
  width: 96px;
  height: 40px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.primary_reset {
  width: 96px;
  height: 40px;
  background: rgba(233, 243, 255, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
