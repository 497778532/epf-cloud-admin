<template>
  <div class="page-body"
       id="userSelection">
    <div class="switchHeight_box">
      <el-row>
        <el-col :span="2">
          <span class="filter_title">部门 :</span>
        </el-col>
        <el-col :span="4">
          <el-cascader :options="options"
                       :show-all-levels="false"
                       @change="orgChange"
                       v-model="selectedOrg"></el-cascader>
        </el-col>
        <el-col :span="2">
          <span class="filter_title">账号 :</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="searchInfo.username"
                    placeholder="请输入"
                    :maxlength="20"></el-input>
        </el-col>
        <el-button @click="getsearchuser"
                   style="margin-left: 40px;background-color: #ffa202;color: #fff;">查询</el-button>
        <el-button @click="resetsearchuser"
                   style="margin-left: 10px;background-color: #ffa202;color: #fff;">重置</el-button>
        <el-button @click="saveUser"
                   style="margin-left: 10px;"
                   type="primary">确定</el-button>
      </el-row>
      <el-tabs style="margin-top:35px;">
        <el-table ref="multipleTable"
                  :data="tableData"
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55"
                           prop="username"></el-table-column>
          <el-table-column prop="username"
                           label="账号"
                           min-width="130"></el-table-column>
          <el-table-column prop="realname"
                           label="名字"
                           min-width="130"></el-table-column>
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
  </div>
</template>
<script>
import Bus from '../utils/bus'

export default {
  name: 'userSelection',
  props: {
    users: String,
    taskNodeInfo: Object
  },
  components: {
  },
  data () {
    return {
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
      },
      options: [],
      selectedOrg: [],
      isDoShow: true
    }
  },
  created () {
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.getsearchuser(this.searchInfo)
    this.queryOrgList()
  },
  methods: {
    queryOrgList () {
      // 查询机构集合
      let that = this
      that.$post('/epf-admin/user/getDepartmentTree', {}).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        that.options = []
        // 返回的数据
        that.options = res.list
      })
    },
    orgChange (value) {
      // alert("值改变了："+ this.selectedOrg);
    },
    roleOnchange (e) {
      this.selectrows = e
      console.log(e)
    },
    saveUser () {
      var that = this

      let nodeInfo = that.taskNodeInfo
      if (typeof nodeInfo !== 'undefined') {
        if (nodeInfo.selectType == '0' && this.selectGroups.length > 1) {
          that.$message.warning('需单选！')
          return
        }
      }

      let ids = ''
      let taskExeUsers = []
      let nodesInfo = {}
      if (that.selectGroups.length < 1) {
        that.$message.warning('请选择要配置的用户！')
        return
      } else {
        for (var i = 0; i < this.selectGroups.length; i++) {
          let seUser = {}
          if (i == 0) {
            ids += this.selectGroups[i].id
            seUser = this.selectGroups[i]
          } else {
            ids += ',' + this.selectGroups[i].id
          }
          seUser = this.selectGroups[i]
          taskExeUsers.push(seUser)
        }
      }
      // 触发重置
      that.resetsearchuser()
      // 业务代码》》向父组件传值
      if (typeof nodeInfo !== 'undefined') {
        nodesInfo = { 'taskExeUsers': taskExeUsers, 'taskNodeInfo': that.taskNodeInfo }
        this.$emit('patch', nodesInfo)
      } else {
        this.$emit('patch', ids)
      }
    },
    getsearchuser () {
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      var org = this.selectedOrg
      var orgStr = ''
      if (org.length != null && org.length > 0) {
        for (var i = 0; i < org.length; i++) {
          orgStr = orgStr + org[i] + ','
        }
      }
      this.searchInfo['orgid'] = orgStr
      this.getUserList()
    },
    resetsearchuser () {
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      this.searchInfo['username'] = ''
      this.selectedOrg = []
      var org = this.selectedOrg
      var orgStr = ''
      if (org.length != null && org.length > 0) {
        for (var i = 0; i < org.length; i++) {
          orgStr = orgStr + org[i] + ','
        }
      }
      this.searchInfo['orgid'] = orgStr
      this.pageNo = 1
      this.getUserList()
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
    getUserList () {
      let that = this
      that.$post('/epf-admin/user/getUserJson', this.searchInfo).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        // 返回的数据
        that.tableData = res.pager.results
        // 数据条数
        that.totalRecord = res.pager.totalRecord
        // 总页数
        that.totalPage = res.pager.totalPage
        var checked = new Array()
        // 父组件传进来的用户名
        var users = ''
        if (typeof that.taskNodeInfo !== 'undefined') {
          users = that.taskNodeInfo.users
        } else {
          users = that.users
        }
        var use = users.split(',')
        for (var i = 0; i < use.length; i++) {
          var tuser = use[i]
          for (var j = 0; j < res.pager.results.length; j++) {
            var yuser = res.pager.results[j].username
            if (tuser == yuser) {
              checked.push(j)
            }
          }
          var kuser = [{}]
          // 转为数组
          for (var k = 0; k < checked.length; k++) {
            var index = checked[k]
            kuser[k] = that.tableData[index]
          }
          that.toggleSelection(kuser)
        }
      })
    },
    handleSelectionChange (val) {
      this.selectGroups = val
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      var org = this.selectedOrg
      var orgStr = ''
      if (org.length != null && org.length > 0) {
        for (var i = 0; i < org.length; i++) {
          orgStr = orgStr + org[i] + ','
        }
      }
      this.searchInfo['orgid'] = orgStr
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.pageNo = val
      this.searchInfo['rows'] = this.pageSize
      var org = this.selectedOrg
      var orgStr = ''
      if (org.length != null && org.length > 0) {
        for (var i = 0; i < org.length; i++) {
          orgStr = orgStr + org[i] + ','
        }
      }
      this.searchInfo['orgid'] = orgStr
      this.getUserList()
    },
    getImgUrl (id) {
      return '/epf-document/document/downloadById?id=' + id
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
