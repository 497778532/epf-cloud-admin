<template>
  <div class="page-body"
       id="userinfoManage">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">账号 :</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="searchInfo.username"
                      placeholder="请输入"
                      :maxlength="50"></el-input>
          </el-col>

          <el-col :span="2">
            <div class="primary"
                 @click="getsearchuser">查询</div>
          </el-col>
          <el-col :span="2">
            <div class="primary"
                 @click="resetsearchuser">重置</div>
          </el-col>
        </el-row>
      </div>
      <el-tabs style="margin-top:35px;">
        <div class="toolsTitleBox">
          <span class="toolsTitle">账号信息</span>

          <div class="oper">
            <span class="primary"
                  @click="showsingleuser">查看</span>
            <span class="primary"
                  @click="AddFlowpatreason">新增</span>
            <span class="primary"
                  @click="editFlowpatreason">修改</span>
            <span @click="handleDelete">删除</span>

          </div>
        </div>
        <el-table ref="multipleTable"
                  :data="tableData"
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55"></el-table-column>
          <el-table-column prop="username"
                           label="账号"
                           min-width="130"></el-table-column>

          <el-table-column prop="realname"
                           label="名字"
                           min-width="130"></el-table-column>
          <el-table-column prop="telPhone"
                           label="手机号"
                           min-width="130"></el-table-column>
          <el-table-column prop="landState"
                           label="状态"
                           min-width="80">
            <template slot-scope="scope">
              <span :class="(scope.row.deleteType=='0')?'success':''"></span>
              <span :class="(scope.row.deleteType!=0)?'error':''"></span>
              <span>{{scope.row.deleteType=='0'?'正常':'禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orgName"
                           label="所属机构"
                           min-width="130"></el-table-column>
          <el-table-column prop="sex"
                           label="性别"
                           min-width="130"></el-table-column>
          <el-table-column prop="email"
                           label="邮箱"
                           min-width="130"></el-table-column>

          <el-table-column prop="createTime"
                           label="创建时间"
                           min-width="100"></el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination background
                         layout="prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="totalRecord"></el-pagination>
        </div>
      </el-tabs>
    </div>

    <!-- 弹框 -->
    <div>

      <el-dialog :title="savetitle"
                 :close-on-click-modal="false"
                 :visible.sync="dialogFormVisible">
        <el-container>
          <el-aside width="200px">

          </el-aside>
          <el-main>
          </el-main>
        </el-container>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>

          <el-button v-if="!add || !edit"
                     type="primary"
                     @click="saveuserinfo">保存</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>
<script>
import qs from 'qs'
import personalFiltrate from '@/components/personalFiltrate'
import transferTable from '@/components/transferTable'
import Axios from 'axios'
import { constants } from 'zlib'

export default {
  name: 'userinfoManage',
  components: {
    personalFiltrate,
    transferTable
  },

  data () {
    return {
      searchselectdefall: [],
      slectdefall: [],
      dialogFormVisible: false,
      dialogFormroleVisible: false,
      rolelist: [],
      selectrows: [],
      tableData: [],
      multipleSelection: [],
      handleDataError: [],
      filterData: {
        title: '',
        infoId: '',
        flowType: '',
        type: '',
        start: '',
        end: '',
        max: '',
        min: ''
      },
      isShowProvince: true,
      temp: {
        address__province: '',
        address__city: '',
        address__dist: ''
      },

      value: '',

      handleData: '',
      singleuser: Object,
      selectGroups: [],
      imageUrl: '',
      add: false,
      savetitle: '新增账号',
      edit: false,
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      labelPosition: 'right',
      form: {
        assessor: '',
        opinion: ''
      },
      orgdata: [],
      formTest: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created () {
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize

    this.getUsermngList(this.searchInfo)
  },
  methods: {
    roleOnchange (e) {
      this.selectrows = e
      console.log(e)
    },

    getsearchuser () {
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      this.getUserList(this.searchInfo)
    },
    resetsearchuser () {
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      this.searchInfo['orgName'] = ''
      this.searchInfo['orgId'] = ''
      this.searchInfo['username'] = ''
      this.searchInfo['realname'] = ''
      this.searchInfo['telPhone'] = ''
      this.searchselectdefall = []
      this.getUserList(this.searchInfo)
    },
    saveuserinfo () {
      let that = this
      that.$post('/epf-admin/admin/user/editUser', this.singleuser).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        that.dialogFormVisible = false
        that.$message.success(res.msg)
        that.getUserList(that.searchInfo)
      })
    },
    handleSelectionChange (val) {
      this.selectGroups = val
    },
    queryuserifo (id) {
      let that = this
      var url = '/epf-admin/admin/user/getUser'
      var params = { 'id': id }
      this.$get(url, { params: params })
        .then(res => {
          that.singleuser = res.user

          that.slectdefall = orgid
          that.imageUrl = that.getImgUrl(res.user.iconImg)
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },

    showsingleuser () {
      this.savetitle = '账号信息'
      this.add = true
      this.edit = true
      this.singleuser = []
      if (this.selectGroups.length != 1) {
        this.$message.warning('请选择一条数据！')
        return
      } else {
        let id = ''
        id = this.selectGroups[0].id
        this.queryuserifo(id)
      }
      this.dialogFormVisible = true
    },
    async getUsermngList (params) {
      this.$get('/epf-admin/admin/sysusermanage/getSysUserManageJson', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        console.log(res)
        // this.pageNo = res.pager.pageNo;
        // this.pageSize = res.pager.pageSize;
        // this.totalPage = res.pager.totalPage;
        // this.totalRecord = res.pager.totalRecord;
        // this.tableData=res.pager.results;
      })
    },

    AddFlowpatreason () {
      this.savetitle = '新增账号'
      this.add = false
      this.edit = false
      this.singleuser = []
      this.imageUrl = ''
      this.slectdefall = []
      this.dialogFormVisible = true
    },
    editFlowpatreason () {
      this.savetitle = '修改账号'
      this.add = true
      this.edit = false
      this.singleuser = []
      if (this.selectGroups.length != 1) {
        this.$message.warning('请选择一条数据！')
        return
      } else {
        let id = ''

        id = this.selectGroups[0].id

        this.queryuserifo(id)
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
      that.$message({
        type: 'warning',
        message: '删除失败!'
      })

      let ids = ''
      if (that.selectGroups.length < 1) {
        that.$message.warning('请选择要删除的数据！')
        return
      } else {
        for (var i = 0; i < this.selectGroups.length; i++) {
          ids += this.selectGroups[i].id + ','
        }
      }
      that.$confirm('确认要删除该条信息吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        // type: 'warning',
        center: true
      }).then(() => {
        that.$post('/epf-admin/admin/user/deleteUserJson', { id: ids }).then(res => {
          if (res.code != '0') {
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
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleDetail (item) {
      this.$router.push({
        path: '/landmarkInfoDetail',
        query: { landNo: item.landNo }
      })
    },
    handleExamine (item) {
      this.$router.push({
        path: '/landmarkInfoExamineResult',
        query: { landNo: item.landNo }
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getUserList(this.searchInfo)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.pageSize
      this.getUserList(this.searchInfo)
    },
    getImgUrl (id) {
      return '/epf-document/document/downloadById?id=' + id
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      if (res.state == 'FAILURE') {
        this.$message.error('上传失败!')
        return
      }
      this.imageUrl = this.getImgUrl(res.data[0].id)
      this.singleuser.iconImg = res.data[0].id
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
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
  margin-right: 16px;
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
  box-sizing: border-box;
  padding: 38px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
.switchHeight_box {
  padding-top: 25px;
  /* padding-bottom:10px; */
  /* height:80px; */
  transition: 0.5s;
  background: #fff;
  border: 1px solid #ebeef5;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
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
  margin-left: 30px;
}
.flexibleSwitch {
  display: block;
  float: right;
  color: #4472d5;
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
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
/* .el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
} */
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
