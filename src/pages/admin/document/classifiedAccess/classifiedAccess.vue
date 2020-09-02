<template>
  <div class="page-body"
       id="userManage">
    <div class="filter_wrap"
         :style="{'paddingTop':'10px'}">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">关键字:</span>
          </el-col>
          <el-col :span="3">
            <el-input size="small"
                      v-model="searchInfo.username"
                      placeholder="账号/名字/手机号"
                      :maxlength="20"></el-input>
          </el-col>

          <el-col :span="2">
            <span class="filter_title">覆盖区域:</span>
          </el-col>
          <el-col :span="3">
            <el-select size="small"
                       style="padding-left:10px;"
                       v-model="searchInfo.usetype"
                       placeholder="请选择">
              <el-option label="全部"
                         value=""></el-option>
              <el-option label="后台"
                         value="0"></el-option>
              <el-option label="前端"
                         value="1"></el-option>
            </el-select>
          </el-col>

          <el-col :span="2">
            <span class="filter_title">文档来源:</span>
          </el-col>
          <el-col :span="3">
            <el-select size="small"
                       style="padding-left:10px;"
                       v-model="searchInfo.usetype"
                       placeholder="请选择">
              <el-option label="全部"
                         value=""></el-option>
              <el-option label="后台"
                         value="0"></el-option>
              <el-option label="前端"
                         value="1"></el-option>
            </el-select>
          </el-col>

          <el-col :span="1">
            <span class="filter_title">状态:</span>
          </el-col>
          <el-col :span="3">
            <el-select size="small"
                       style="padding-left:10px;"
                       v-model="searchInfo.usetype"
                       placeholder="请选择">
              <el-option label="全部"
                         value=""></el-option>
              <el-option label="后台"
                         value="0"></el-option>
              <el-option label="前端"
                         value="1"></el-option>
            </el-select>
          </el-col>

          <el-col :span="5"
                  style="text-align:right;padding-right: 1%;">
            <div class="button_bg"
                 @click="getsearchuser"
                 style="min-width:auto">搜索</div>
            <div class="button_default"
                 @click="resetsearchuser"
                 style="margin: 0;min-width:auto">重置</div>
          </el-col>
        </el-row>
      </div>
      <el-container style="height:auto">
        <el-aside width="260px"
                  style="padding-top:10px;">
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     style="height:40px;line-height:40px"
                     class="m_title">知识库板块</el-header>
          <el-main :style="{'height':menuListHeight-150+'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
            <el-tree v-loading="loading"
                     element-loading-text="数据加载中"
                     element-loading-background="rgba(255, 255, 255,0.95)"
                     :data="orgdata"
                     :props="searchselectdefall"
                     :default-expanded-keys="expandedkeys"
                     node-key="id"
                     :expand-on-click-node="false"
                     @node-click="getsearchuser"
                     draggable>
            </el-tree>
          </el-main>
        </el-aside>
        <el-main style="margin-left:15px;">
          <el-tabs style="margin-top:10px;">
            <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                       style="height:40px;line-height:40px"
                       class="m_title">文档管理</el-header>
            <el-table ref="multipleTable"
                      :data="tableData"
                      :height="menuListHeight-150"
                      style="width: 100%"
                      border
                      @selection-change="handleSelectionChange"
                      v-loading="loading"
                      element-loading-text="数据加载中"
                      element-loading-background="rgba(255, 255, 255,0.95)"
                      @row-click="clickselectrow">
              <el-table-column type="selection"
                               width="55"></el-table-column>
              <el-table-column prop="username"
                               label="文件名称"
                               min-width="180">
                <template slot-scope="scope">
                  广东省村庄规划编制指引（试行）.pdf
                </template>
              </el-table-column>

              <el-table-column fixed
                               prop="realname"
                               label="文件来源"
                               min-width="150">
                <template slot-scope="scope">
                  广东省自然资源厅
                </template>
              </el-table-column>
              <el-table-column prop="createTime"
                               label="发文日期"
                               min-width="130">
                <template slot-scope="scope">
                  2017年7月1日
                </template>
              </el-table-column>
              <el-table-column prop="orgName"
                               label="大小"
                               min-width="100">
                <template slot-scope="scope">
                  2.1MB
                </template>
              </el-table-column>
              <el-table-column prop="tenantCode"
                               label="版本"
                               min-width="50">
                <template slot-scope="scope">
                  V1.0
                </template>
              </el-table-column>
              <el-table-column prop="email"
                               label="浏览量"
                               min-width="100">
                <template slot-scope="scope">
                  1000
                </template>
              </el-table-column>
              <el-table-column prop="telPhone"
                               label="描述"
                               min-width="150">
                <template slot-scope="scope">
                  文件描述文字
                </template>
              </el-table-column>

            </el-table>
            <div style="text-align:right;margin:12px 0px;">
              <el-pagination background
                             layout="prev, pager, next,sizes,jumper"
                             :page-sizes="[5,10, 15, 20]"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :page-size="pageSize"
                             :current-page="pageNo"
                             :total="totalRecord"></el-pagination>
            </div>
          </el-tabs>
        </el-main>
      </el-container>
    </div>

  </div>
</template>
<script>
import qs from 'qs'
import personalFiltrate from '@/components/personalFiltrate'
import transferTable from '@/components/transferTable'
import Axios from 'axios'
import { constants } from 'zlib'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'userManage',
  components: {
    personalFiltrate,
    transferTable
  },

  data () {
    var validataPhone = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(value)) {
        callback(new Error('请输入正确的手机号格式'))
      } else {
        callback()
      }
    }

    return {
      // 扩展信息参数
      dialogManageInfo: false,
      usermanageInfo: {},
      sexoptions: [{ value: '男', label: '男' }, { value: '女', label: '女' }],
      loading: true,

      defaultProps: {
        children: 'children',
        label: 'label'
      },

      menuListHeight: 100,
      txtVal: 0,
      searchselectdefall: [],
      slectdefall: [],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogFormroleVisible: false,
      rolelist: [],
      selectrows: [],
      tableData: [],
      multipleSelection: [],
      handleDataError: [],
      howProvince: true,

      value: '',

      handleData: '',
      singleuser: {},
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
      searchInfo: { usetype: '' },
      labelPosition: 'right',
      expandedkeys: [],
      orgdata: [],
      tenantItems: [],

      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',
      //  编辑 表单验证
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        telPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validataPhone, trigger: 'blur' }
        ],
        tenantCode: [
          { required: true, message: '请选择租户', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
            message: '格式有误，请重新输入',
            trigger: 'change'
          }
        ],
        userTypes: [] // 用户类型
      }
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 245
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.buttons = JSON.parse(localStorage.getItem('userManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')
    this.userTypes = this.queryDictList('userTypes')
    this.getUserList(this.searchInfo)
    this.getGrowpList({})
    this.getTenantlist()
  },
  mounted () {
    this.$bus.$on('themChange', val => {
      this.theme_BackgroundColor = val.menuBackgroundColor
      this.theme_TextColor = val.textColor
    })
  },
  methods: {
    ...mapActions(['setTabsList']),
    queryDictList: function (code) {
      let that = this
      that.$get('/epf-admin/admin/dictionaries/getDictEbyDictGroup/' + code).then(res => {
        if (res.code === 0) {
          if (code == 'userTypes') {
            if (res.dictionariesList != null) {
              that.userTypes = res.dictionariesList
            } else {
              that.userTypes = []
            }
          }
        } else {
          that.$message.warning(res.msg)
        }
      })
    },
    saveusermanage () {
      var that = this

      that
        .$post(
          '/epf-admin/admin/sysusermanage/editSysUserManage',
          that.usermanageInfo
        )
        .then(res => {
          if (res.code != '0') {
            that.$message.error(res.msg) // 失败
            return
          }
          that.that.dialogManageInfo = false
          that.$message.success('保存成功！') // 失败
        })
    },
    roleOnchange (e) {
      this.selectrows = e
      console.log(e)
    },
    clickselectrow (row, column, event) {
      // this.$refs.multipleTable.toggleRowSelection(row);
      let that = this
      let title = '文档浏览'
      let routerPath = '/documentBrowse'
      let tabObj = { title, routerPath }
      that.setTabsList(tabObj)
      that.$router.push({ path: routerPath, query: {} })
    },
    getCheckedKeys (e) {
      var that = this
      if (that.selectGroups.length != 1) {
        that.$message.warning('请选择一条数据！')
        return
      } else {
        var id = ''
        for (var i = 0; i < that.selectrows.length; i++) {
          if (i == 0) {
            id = id + that.selectrows[i]
          } else {
            id = id + ',' + that.selectrows[i]
          }
        }
        var params = { userId: that.selectGroups[0].id, roleids: id }
        console.log(params)
        that
          .$get('/epf-admin/admin/userRole/setRoleByOwner', params)
          .then(res => {
            if (res.code != '0') {
              that.$message.error(res.msg) // 失败
              return
            }
            that.$message.success('保存成功！')
            that.dialogFormroleVisible = false
          })
      }
    },
    saerchhandleChange (value) {
      this.searchInfo.orgId = value[value.length - 1]
    },
    handleChange (value) {
      console.log(value)
      this.singleuser.orgId = value[value.length - 1]
    },
    getsearchuser (data) {
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      this.searchInfo['orgId'] = data.value
      this.getUserList(this.searchInfo)
    },
    resetsearchuser () {
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      this.searchInfo['orgName'] = ''
      this.searchInfo['orgId'] = ''
      this.searchInfo['username'] = ''
      this.searchInfo['realname'] = ''
      this.searchInfo['usetype'] = ''
      this.searchselectdefall = []
      this.getUserList(this.searchInfo)
    },
    saveuserinfo (formName) {
      let that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          var sg = this.singleuser
          var url = ''
          if (that.add == false && that.edit == false) {
            url = '/epf-admin/admin/user/addUser'
          } else {
            url = '/epf-admin/admin/user/editUser'
          }
          sg.createTime = ''
          that.$post(url, sg).then(res => {
            if (res.code != '0') {
              that.$message.error(res.msg) // 失败
              return
            }
            that.dialogFormVisible = false
            if (that.add) {
              that.$message.success('修改成功')
            } else {
              that.$message.success('新增成功')
            }
            that.getUserList(that.searchInfo)
          })
        } else {
          this.$message.error('请确保信息填写正确')
          return false
        }
      })
    },
    handleSelectionChange (val) {
      this.selectGroups = val
    },
    queryuserifo (id) {
      let that = this
      var url = '/epf-admin/admin/user/getUser'
      var params = { id: id }
      this.$get(url, params)
        .then(res => {
          that.singleuser = res.user
          that.imageUrl = that.getImgUrl(res.user.iconImg)
          if (res.user.orgId != '' && res.user.orgId != null) {
            var orgid = []
            var orgdt = that.orgdata

            for (var i = 0; i < orgdt.length; i++) {
              if (orgdt[i].value == res.user.orgId) {
                var orgid = [res.user.orgId]
                break
              }
              if (orgdt[i].children) {
                for (var k = 0; k < orgdt[i].children.length; k++) {
                  if (orgdt[i].children[k].value == res.user.orgId) {
                    var orgid = [orgdt[i].value, orgdt[i].children[k].value]
                    break
                  }
                  if (orgdt[i].children[k].children) {
                    for (
                      var j = 0;
                      j < orgdt[i].children[k].children.length;
                      j++
                    ) {
                      if (
                        orgdt[i].children[k].children[j].value == res.user.orgId
                      ) {
                        var orgid = [
                          orgdt[i].value,
                          orgdt[i].children[k].value,
                          orgdt[i].children[k].children[j].value
                        ]
                        break
                      }
                    }
                  }
                }
              }
            }
            that.slectdefall = orgid
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    async getUserList (params) {
      this.loading = true
      this.$get('/epf-admin/admin/user/getAllUserJson', params).then(res => {
        console.log('===========', res)
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          this.loading = false
          return
        }
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.tableData = res.pager.results
        this.loading = false
      })
    },
    async getGrowpList (params) {
      this.$get('/epf-admin/admin/org/getallOrg', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          return
        }
        var orglist = res.ztreeJson
        var selecttree = new Array()
        var expandedkeys = []
        for (var i = 0; i < orglist.length; i++) {
          if (orglist[i].parentId == '0' || orglist[i].parentId == '' || orglist[i].parentId == null) {
            var selecttree1 = new Array()
            expandedkeys.push(orglist[i].id)
            for (var j = 0; j < orglist.length; j++) {
              if (orglist[j].parentId == orglist[i].id) {
                selecttree1.push({
                  id: orglist[j].id,
                  value: orglist[j].id,
                  label: orglist[j].orgName
                })
              }
            }
            for (var j = 0; j < selecttree1.length; j++) {
              var selecttree2 = new Array()
              for (var k = 0; k < orglist.length; k++) {
                if (orglist[k].parentId == selecttree1[j].value) {
                  selecttree2.push({
                    id: orglist[k].id,
                    value: orglist[k].id,
                    label: orglist[k].orgName
                  })
                }
              }
              if (selecttree2.length > 0) {
                selecttree1[j].children = selecttree2
              }
            }

            if (selecttree1.length > 0) {
              selecttree.push({
                id: orglist[i].id,
                value: orglist[i].id,
                label: orglist[i].orgName,
                children: selecttree1
              })
            } else {
              selecttree.push({
                value: orglist[i].id,
                label: orglist[i].orgName
              })
            }
          }
        }
        this.expandedkeys = expandedkeys
        this.orgdata = selecttree
      })
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

    handleClick () { },

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
      return this.$urlConfig.common.imageUrl + id
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
    },
    manageAvatarSuccess (res, file) {
      console.log(res)
      if (res.state == 'FAILURE') {
        this.$message.error('上传失败!')
        return
      }
      this.imageUrl = this.getImgUrl(res.data[0].id)
      this.usermanageInfo.iconImg = res.data[0].id
    },
    beforemanageUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //  开始上传
    userUploadFile (files) {
      const file = files.file

      const formData = new FormData()

      formData.append('files', file)

      this.$useAppend('/epf-document/document/upload', formData).then(res => {
        console.log(res)
        files.onProgress(file)
        if (res.state != 'SUCCESS') {
          this.$message.error('图片上传失败，请重新上传')
          return null
        }
        this.usermanageInfo.iconImg = res.data[0].id
        this.imageUrl = this.$urlConfig.common.imageUrl + res.data[0].id
        files.onSuccess(res)
      })
    },
    //  开始上传
    usermanageUploadFile (files) {
      const file = files.file

      const formData = new FormData()

      formData.append('files', file)

      this.$useAppend('/epf-document/document/upload', formData).then(res => {
        console.log(res)
        files.onProgress(file)
        if (res.state != 'SUCCESS') {
          this.$message.error('图片上传失败，请重新上传')
          return null
        }
        this.singleuser.iconImg = res.data[0].id
        this.imageUrl = this.$urlConfig.common.imageUrl + res.data[0].id
        files.onSuccess(res)
      })
    },
    getTenantlist () {
      var that = this
      that.$post('/epf-admin/admin/Tenantry/tenantItems').then(res => {
        console.log(res)
        if (res.code != '0') {
          that.$message.error(res.msg)
          return
        }
        if (res.tenantItems == null) {
          that.tenantItems = []
        } else {
          that.tenantItems = res.tenantItems
        }
      })
    }
  }
}
</script>
<style scoped>
.el-container {
  height: 300px;
  overflow: auto;
}
.headerpop {
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: bold;

  line-height: 30px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 120px;
  border-radius: 10px;
  height: 120px;
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

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
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
  padding-right: 1rem;
}
.oper span {
  display: inline-block;
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
  padding: 0 !important;
  padding-top: 15px !important;
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
  margin-left: 15px;
  margin-top: 0 !important;
  margin-right: 0 !important;
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
  right: 8px;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
}
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
