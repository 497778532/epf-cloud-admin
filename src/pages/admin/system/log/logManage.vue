<template>
  <div class="page-body EPF-table"
       id="userManage">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row style="margin-bottom:24px;">
          <el-col :span="5"
                  class="filter_title_box">
            <span class="filter_title__custom__three">用户名：</span>
            <el-input v-model="searchInfo.filters.username"
                      placeholder="请输入用户名"
                      style="width:calc(100% - 105px)"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="5"
                  class="filter_title_box">
            <span class="filter_title__custom__two">IP：</span>
            <el-input v-model="searchInfo.filters.ip"
                      placeholder="请输入IP"
                      style="width:calc(100% - 70px)"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="5"
                  class="filter_title_box">
            <span class="filter_title__custom__four">操作/异常：</span>
            <el-select v-model="searchInfo.filters.logtype"
                       placeholder="请选择"
                       style="width:calc(100% - 30px)">
              <el-option key="1"
                         label="操作"
                         value="0"> </el-option>
              <el-option key="2"
                         label="异常"
                         value="1"> </el-option>
              <el-option key="3"
                         label="登录"
                         value="2"> </el-option>
            </el-select>
          </el-col>

          <el-col :span="9"
                  style="display:flex;justify-content:flex-end;">
            <div class="primary_reset"
                 @click="resetsearchLog">重置</div>
            <div class="primary_search"
                 @click="getsearchLog">查询</div>
            <div class="primary_search"
                 @click="showsinglelog">查看</div>
            <!-- <div class="primary_search"
                 @click="handleDelete">删除</div> -->
          </el-col>
        </el-row>
      </div>
      <el-table ref="multipleTable"
                :data="tableData"
                style="width: 100%"
                border
                stripe
                @selection-change="handleSelectionChange"
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255, 0.9)">
        <el-table-column fixed
                         type="selection"
                         width="55"
                         align="center"></el-table-column>
        <el-table-column fixed
                         prop="username"
                         label="用户名"
                         min-width="100"
                         align="center"></el-table-column>
        <el-table-column label="操作/异常"
                         min-width="300"
                         align="center">
          <template slot-scope="props">
            <span>{{ props.row.operation!=null&&props.row.operation.length>70?props.row.operation.substring(0,70):props.row.operation }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="method"
                         label="请求方法/异常类型"
                         width="300"
                         align="center"></el-table-column>
        <el-table-column label="请求参数/异常信息"
                         min-width="450"
                         align="center">
          <template slot-scope="props">
            <span>{{ props.row.params!=null&&props.row.params.length>200?props.row.params.substring(0,200):props.row.params }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ip"
                         label="IP地址"
                         min-width="150"
                         align="center"></el-table-column>
        <el-table-column prop="time"
                         label="时长(毫秒)"
                         min-width="150"
                         align="center"></el-table-column>
        <el-table-column prop="createDate"
                         label="请求时间"
                         min-width="150"
                         align="center"></el-table-column>
        <el-table-column fixed="right"
                         prop="myResult"
                         label="结果"
                         min-width="100"
                         align="center">
          <template slot-scope="scope">
            <span style="color:#67c23a;"
                  v-if="scope.row.myResult==='成功'">{{ scope.row.myResult }}</span>
            <span style="color:#f56c6c;"
                  v-if="scope.row.myResult==='失败'">{{ scope.row.myResult }}</span>
          </template>
        </el-table-column>

      </el-table>
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
    <!--   弹窗 -->
    <el-dialog title="日志信息"
               :visible.sync="dialogFormVisible"
               width="40%"
               :modal="true"
               :close-on-click-modal="false"
               :append-to-body="true"
               class="rizhiDialog">
      <el-form :model="singleLog">
        <el-form-item label='用户名：'
                      :label-width="formLabelWidth"
                      prop="username">
          <el-input v-model="singleLog.username"
                    auto-complete="off"
                    :disabled='true'
                    :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label='操作：'
                      :label-width="formLabelWidth"
                      prop="operation">
          <el-input v-model="singleLog.operation"
                    auto-complete="off"
                    :disabled='true'
                    :maxlength="500"></el-input>
        </el-form-item>
        <el-form-item label='请求方法：'
                      :label-width="formLabelWidth"
                      prop="method">
          <el-input type="textarea"
                    v-model="singleLog.method"
                    auto-complete="off"
                    :disabled='true'
                    :maxlength="500"></el-input>
        </el-form-item>
        <el-form-item label='请求参数：'
                      :label-width="formLabelWidth"
                      prop="params">
          <el-input type="textarea"
                    rows="4"
                    v-model="singleLog.params"
                    auto-complete="off"
                    :disabled='true'
                    :maxlength="500"></el-input>
        </el-form-item>
        <el-form-item label='IP地址：'
                      :label-width="formLabelWidth"
                      prop="ip">
          <el-input v-model="singleLog.ip"
                    auto-complete="off"
                    :disabled='true'
                    :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label='时长(毫秒)：'
                      :label-width="formLabelWidth"
                      prop="time">
          <el-input v-model="singleLog.time"
                    auto-complete="off"
                    :disabled='true'
                    :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label='请求时间：'
                      :label-width="formLabelWidth"
                      prop="createDate">
          <el-input v-model="singleLog.createDate"
                    auto-complete="off"
                    :disabled='true'
                    :maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <div class="button_shen"
             @click="dialogFormVisible=false">确定</div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import qs from 'qs'
import personalFiltrate from '@/components/personalFiltrate'
import transferTable from '@/components/transferTable'
import Axios from 'axios'
import { constants } from 'zlib'

export default {
  name: 'userManage',
  components: {
    personalFiltrate,
    transferTable
  },

  data () {
    return {
      menuListHeight: 100,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      rolelist: [],
      selectrows: [],
      tableData: [],
      multipleSelection: [],
      handleDataError: [],
      loading: true,
      handleData: '',
      singleLog: Object,
      selectGroups: [],
      dialogForm: false,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      currentPage: 1,
      searchInfo: { filters: {} }

    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 370
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize

    this.getlogList(this.searchInfo)
  },
  methods: {
    getsearchLog () {
      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      this.getlogList(this.searchInfo)
    },
    resetsearchLog () {
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      this.searchInfo['filters'] = {}
      this.getlogList(this.searchInfo)
    },
    handleSelectionChange (val) {
      this.selectGroups = val
    },

    showsinglelog () {
      this.savetitle = '账号信息'
      this.singleLog = []
      if (this.selectGroups.length != 1) {
        this.$message.warning('请选择一条数据！')
        return
      }
      let id = ''
      id = this.selectGroups[0].id
      this.queryloginfo(id)

      this.dialogFormVisible = true
    },
    queryloginfo (id) {
      let that = this
      var url = '/api/epf-monitor/log/getLog'
      var params = { 'id': id }
      Axios
        .get(url, { params: params })
        .then(res => {
          that.singleLog = res.log
          console.log(res)
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    async getlogList (params) {
      this.loading = true
      this.$http.get('/api/epf-monitor/log/getLogJson', { params: params }).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.tableData = res.pager.results
        for (var key in this.tableData) {
          if (/.*[\u4e00-\u9fa5]+.*$/.test(this.tableData[key].operation)) {
            let index = key
            this.tableData[index]['myResult'] = '成功'
          } else {
            let index = key
            this.tableData[index]['myResult'] = '失败'
          }
        }
        this.loading = false
      })
    },
    AddFlowpatreason () {
      this.savetitle = '新增账号'
      this.add = false
      this.edit = false
      this.singleLog = []
      this.imageUrl = ''
      this.slectdefall = []
      this.dialogFormVisible = true
    },
    editFlowpatreason () {
      this.savetitle = '修改账号'
      this.add = true
      this.edit = false
      this.singleLog = []
      if (this.selectGroups.length != 1) {
        this.$message.warning('请选择一条数据！')
        return
      } else {
        let id = ''

        id = this.selectGroups[0].id

        this.showsinglelog(id)
      }
      this.dialogFormVisible = true
    },
    viewPublicityDetails (item) {
      this.$router.push({ path: '/publicityDetails', query: { landNo: item } })
    },
    handlePublicityRelease (item) {
      this.$router.push({ path: '/publicityRelease', query: { landNo: item } })
    },
    handleResult (item) {
      this.$router.push({
        path: '/landmarkInfoDealresult',
        query: { landNo: item }
      })
    },
    handleAdd () {
      this.$router.push('/landmarkInfoAdd')
    },
    handleDelete () {
      let that = this

      let ids = ''
      if (that.selectGroups.length < 1) {
        that.$message.warning('请选择要删除的数据！')
        return
      }
      for (var i = 0; i < this.selectGroups.length; i++) {
        ids += this.selectGroups[i].id + ','
      }
      that.$confirm('确认要删除该条信息吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        // type: 'warning',
        center: true
      }).then(() => {
        that.$http.post('/api/epf-monitor/log/deleteLog', qs.stringify({ id: ids })).then(res => {
          console.log(res)
          if (res.code != 0) {
            that.$message({
              type: 'faill',
              message: '删除失败!'
            })
            return
          }
          that.$message({
            type: 'success',
            message: '删除成功!'
          })
          that.getlogList(this.searchInfo)
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getlogList(this.searchInfo)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.pageSize
      this.getlogList(this.searchInfo)
    }

  }
}
</script>
<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.headerpop {
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: bold;

  line-height: 30px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.box-body {
  width: 100%;
  overflow: auto;
}
.pageName {
  padding-left: 15px;
  margin-bottom: 15px;
  border-left: 4px solid rgba(26, 188, 156, 6);
}
.toolsTitleBox {
  height: 55px;
  line-height: 55px;
  background: rgba(211, 211, 211, 0.1);
  color: #606266;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #ebeef5;
}
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
  display: inline-block;
  width: 80px;
  height: 32px;

  border-radius: 2px;
  margin-right: 10px;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  cursor: pointer;
  border: solid 1px #d3d4d6;
  color: #606266;
  background-color: #dbf0ec;
}
.oper span:nth-child(4) {
  color: #fff;
  background-color: #ffa000;
}
.toolsTitle {
  line-height: 40px;
  font-size: 12px;
  margin-left: 25px;
}
.toolsTips {
  line-height: 40px;
  font-size: 14px;
  margin-left: 10px;
  color: red;
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
.filter_title__custom__three {
  box-sizing: border-box;
  width: 75px;
  min-width: 75px;
  max-width: 75px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.filter_title__custom__two {
  box-sizing: border-box;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.filter_title__custom__four {
  box-sizing: border-box;
  width: 95px;
  min-width: 95px;
  max-width: 95px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.monad {
  display: block;
  width: 48px;
  position: absolute;
  top: 7px;
  left: 5px;
}
.primary {
  width: 88px;
  height: 34px;
  background-color: #ffa000;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 36px;
  display: inline-block;
  cursor: pointer;
  margin-left: 15px;
}
.flexibleSwitch {
  display: block;
  float: right;
  color: #4472d5;
  cursor: pointer;
}
.primary_search {
  width: 96px;
  height: 40px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
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
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
</style>
<style>
.default,
.error,
.success {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: relative;
  top: 1px;
  right: 5px;
}
.default {
  background: #b6b6b6;
  border: 2px solid #cfcfcf;
}
.error {
  background: #fd4041;
  border: 2px solid #ff6c6f;
}
.success {
  background: #92b62d;
  border: 2px solid #bfd482;
}
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
  right: 8px;
}

/* .el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
} */
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.usemngtable {
  width: 100%;
}
.usemngtable td {
  border: 1px solid #b6b6b6;
  line-height: 28px;
}
</style>
<style>
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.rizhiDialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.rizhiDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.rizhiDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.rizhiDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.rizhiDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.rizhiDialog .el-dialog__body .el-form {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.rizhiDialog .el-dialog__body .el-form .el-input.is-disabled .el-input__inner {
  color: #656565;
  border-color: 1px solid #dcdfe6;
  background-color: #fff;
}
.rizhiDialog
  .el-dialog__body
  .el-form
  .el-textarea.is-disabled
  .el-textarea__inner {
  color: #656565;
  border-color: 1px solid #dcdfe6;
  background-color: #fff;
}
.rizhiDialog .el-dialog__body .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.rizhiDialog .el-dialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
