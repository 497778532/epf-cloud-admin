<template>
  <div id="tenantryManage"
       style="padding:10px;">
    <el-container>
      <el-main style="">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">
            <div style="float:left">租户管理</div>
            <span v-for="(button ,index)  in buttons"
                  :key="index">
              <el-button v-if="button.resourceId=='tenant_add'"
                         style="float:right;margin-top:4px;"
                         @click="addBanner"
                         size="mini"
                         icon="el-icon-plus">添加</el-button>
            </span>
          </el-header>
          <el-main :style="{'height':menuAdvertListHeight + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
            <template>
              <el-table :data="advertDataList"
                        border
                        style="width: 100%">
                <el-table-column fixed
                                 prop="code"
                                 label="租户编号"
                                 width="100">
                </el-table-column>
                <el-table-column fixed
                                 prop="name"
                                 label="租户名称"
                                 min-width="150">
                </el-table-column>
                <el-table-column prop="contacter"
                                 label="联系人"
                                 width="120">
                </el-table-column>
                <el-table-column prop="telPhone"
                                 label="联系电话"
                                 width="120">
                </el-table-column>
                <el-table-column prop="status"
                                 label="状态"
                                 min-width="70">
                  <template slot-scope="scope">
                    <span :class="(scope.row.status=='0')?'success':''"></span>
                    <span :class="(scope.row.status!='0')?'error':''"></span>
                    <span>{{scope.row.status=='0'?'启用':'禁用'}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="email"
                                 label="邮箱"
                                 width="120">
                </el-table-column>
                <el-table-column prop="address"
                                 label="地址"
                                 min-width="150">
                </el-table-column>
                <el-table-column prop="createTime"
                                 label="创建时间"
                                 width="120">
                </el-table-column>
                <el-table-column prop="updateTime"
                                 label="更新时间"
                                 width="120">
                </el-table-column>
                <el-table-column fixed="right"
                                 label="操作">
                  <template slot-scope="scope">
                    <span v-for="(button ,index)  in buttons"
                          :key="index">
                      <el-button v-if="button.resourceId=='tenant_edit'"
                                 type="text"
                                 size="small"
                                 @click="shwoDialog(scope.row)">编辑</el-button>
                      <el-button v-if="button.resourceId=='tenant_delete'&& scope.row.code!='plus'"
                                 type="text"
                                 size="small"
                                 @click="deleteBanner(scope.row)">删除</el-button>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </template>

          </el-main>
        </el-container>
        <div style="text-align:right;margin:8px 0px;">
          <el-pagination background
                         layout="prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10, 15, 20]"
                         :total="totalRecord"
                         :page-size="pageSize"
                         :current-page="pageNo"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-main>
    </el-container>

    <el-dialog title="编辑租户"
               :visible.sync="dialogVisible"
               :before-close="cancel">
      <el-form :model="advertData"
               label-width="80px"
               :rules="rules"
               ref="advertData"
               size="small">
        <el-row>
          <el-col :offset="1"
                  :span="9">
            <el-form-item label="编号"
                          prop="code">
              <el-input v-model="advertData.code"
                        :readonly="edit"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1"
                  :span="9">
            <el-form-item label="名称"
                          prop="name">
              <el-input v-model="advertData.name"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1"
                  :span="9">
            <el-form-item label="地址"
                          prop="address">
              <el-input v-model="advertData.address"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1"
                  :span="9">
            <el-form-item label="联系人"
                          prop="contacter">
              <el-input v-model="advertData.contacter"
                        :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1"
                  :span="9">
            <el-form-item label="联系电话"
                          prop="telPhone">
              <el-input v-model="advertData.telPhone"
                        :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1"
                  :span="9">
            <el-form-item label="邮箱"
                          prop="email">
              <el-input v-model="advertData.email"
                        :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1"
                  :span="9">
            <el-form-item label="状态">
              <el-tooltip :content="advertData.status=='1'?'已禁用':'已启用'"
                          placement="top">
                <el-switch v-model="advertData.status"
                           active-color="#ff4949"
                           inactive-color="#13ce66"
                           active-value="1"
                           inactive-value="0">
                </el-switch>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :offset="1"
                  :span="9">
            <el-form-item label="排序"
                          prop="ranks">
              <el-input-number v-model="advertData.ranks"
                               :min="1"
                               :disabled='edit'
                               style="width:265px;"
                               :maxlength="20"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input type="textarea"
                    maxlength="125"
                    v-model="advertData.remarks"
                    :maxlength="100"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"
                   @click="saveBanner('advertData')"
                   :disabled="disabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import Axios from 'axios'

export default {
  name: 'tenantryManage',
  headers: {},
  data () {
    return {
      advertDataList: [],
      advertData: {
      },
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchAdvert: {},
      tableData1: [],
      dialogVisible: false,
      disabled: false,
      edit: false,
      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',
      rules: {
        code: [
          { required: true, message: '编号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        address: [
          { min: 5, max: 40, message: '长度在 5 到 40个字符', trigger: 'change' }
        ],
        contacter: [
          { min: 2, max: 8, message: '长度在 2 到 8个字符' },
          { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '只能输入中文', trigger: 'change' }
        ],
        telPhone: [
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/, message: '您输入的联系电话有误', trigger: 'change' }
        ],
        email: [
          { pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '您输入的邮箱格式有误，请重新输入', trigger: 'change' }
        ],
        ranks: [
          { required: true, message: '排序不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.menuAdvertListHeight = window.innerHeight - 270
    this.searchAdvert['page'] = this.pageNo
    this.searchAdvert['rows'] = this.pageSize
    this.buttons = JSON.parse(localStorage.getItem('tenantryManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')
    this.headers = { 'token': sessionStorage.getItem('token') }

    this.getTenantryManage(this.searchAdvert)
  },
  mounted () {
    this.$bus.$on('themChange', val => {
      this.theme_BackgroundColor = val.menuBackgroundColor
      this.theme_TextColor = val.textColor
    })
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    shwoDialog (data) {
      this.edit = true
      this.advertData = data
      this.dialogVisible = true
      // this.imageUrl =this.getImgUrl(this.advertData.img);
    },
    getTenantryManage (params) {
      this.$post('/epf-admin/admin/Tenantry/getTenantryJson', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.advertDataList = res.pager.results
      }).catch(error => { })
    },
    deleteBanner (data) {
      var that = this
      that.$confirm('确认要删除该条信息吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        // type: 'warning',
        center: true
      }).then(() => {
        that.$post('/epf-admin/admin/Tenantry/delete', { id: data.id }).then(res => {
          if (res.code != '0') {
            // 失败
            that.$message.error(res.msg)
            return
          }
          that.$message.success('删除成功!')
          that.getTenantryManage(that.searchAdvert)
        })
      }).catch(() => { })
    },
    cancel () {
      this.dialogVisible = false
      this.getTenantryManage(this.searchAdvert)
    },
    saveBanner (formName) {
      let that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.disabled = true
          that.$post('/epf-admin/admin/Tenantry/add', that.advertData).then(res => {
            if (res.code != '0') {
              that.$message.error(res.msg) // 失败
              that.disabled = false
              that.dialogVisible = false
              return
            }
            that.disabled = false
            that.dialogVisible = false
            that.$message.success('保存成功！')
            that.getTenantryManage(that.searchAdvert)
          })
        } else {
          this.$message.error('请确保信息填写正确')
          return false
        }
      })
    },
    addBanner () { // 添加新闻
      this.edit = false
      this.advertData = {}
      this.dialogVisible = true
    },

    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchAdvert['page'] = this.pageNo
      this.searchAdvert['rows'] = val
      this.getTenantryManage(this.searchAdvert)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchAdvert['page'] = val
      this.searchAdvert['rows'] = this.pageSize
      this.getTenantryManage(this.searchAdvert)
    }

  }
}
</script>

<style scoped>
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
.success {
  background: #92b62d;
  border: 2px solid #bfd482;
}
.m_title {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 30px;
  background: rgb(50, 58, 64);
  color: #fff;
  font-size: 16px;
}
.el-tree > div {
  margin: 5px 0;
}
.iconList {
  height: 400px;
  background: rgb(255, 213, 213);
  overflow-y: auto;
}
.menuManage_List .el-tree-node__content {
  margin-bottom: 5px;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

input[type="file"] {
  display: none !important;
}
</style>

