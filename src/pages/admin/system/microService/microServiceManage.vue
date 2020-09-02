<template>
  <div id="advertManage"
       style="padding:10px;">
    <el-container>

      <el-main style="">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">
            <div style="float:left">服务鉴权管理</div>
            <span v-for="(button ,index)  in buttons"
                  :key="index">
              <el-button v-if="button.resourceId=='micro_add'"
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
                        v-loading="loading"
                        element-loading-text="数据加载中"
                        element-loading-background="rgba(255, 255, 255,0.95)"
                        style="width: 100%">
                <el-table-column fixed
                                 prop="name"
                                 label="模块名称"
                                 width="400">
                </el-table-column>
                <el-table-column prop="code"
                                 label="模块代码"
                                 width="200">
                </el-table-column>
                <el-table-column prop="secert"
                                 label="秘钥"
                                 width="200">
                </el-table-column>

                <el-table-column prop="createTime"
                                 label="创建时间"
                                 width="180">
                </el-table-column>
                <el-table-column prop="updateTime"
                                 label="更新时间"
                                 width="180">
                </el-table-column>
                <el-table-column fixed="right"
                                 label="操作">
                  <template slot-scope="scope">
                    <span v-for="(button ,index)  in buttons"
                          :key="index">
                      <el-button v-if="button.resourceId=='micro_viewset'"
                                 type="text"
                                 size="small"
                                 @click="shwoDialog2(scope.row)">访问设置</el-button>
                      <el-button v-if="button.resourceId=='micro_edit'"
                                 type="text"
                                 size="small"
                                 @click="shwoDialog(scope.row)">编辑</el-button>
                      <el-button v-if="button.resourceId=='micro_delete'"
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

    <el-dialog title="编辑"
               :visible.sync="dialogVisible">
      <el-form :model="advertData"
               label-width="80px">

        <el-form-item label="模块名称
                "
                      style="margin-top:20px;">
          <el-input v-model="advertData.name"
                    :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="模块代码">
          <el-input v-model="advertData.code"
                    :maxlength="200"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"
                   @click="saveBanner">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设置"
               :visible.sync="dialogVisible2">
      <el-form :model="advertData2"
               label-width="80px">
        <el-checkbox v-for="mpb in advertDataList2"
                     name="ids"
                     :key="mpb.id"
                     v-model="mpb.hasAuth">{{mpb.name}}</el-checkbox>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible2=false">取 消</el-button>
        <el-button type="primary"
                   @click="saveBanner2">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import qs from 'qs'
import Axios from 'axios'

export default {
  name: 'microServiceManage',
  headers: {},
  data () {
    return {
      advertDataList: [],
      loading: true,
      advertDataList2: [],
      advertData: {},
      advertData2: {},
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchAdvert: {},
      tableData1: [],
      dialogVisible: false,
      dialogVisible2: false,
      imageUrl: '',
      nowId: 0,

      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: ''
    }
  },
  created () {
    this.menuAdvertListHeight = window.innerHeight - 270
    this.searchAdvert['page'] = this.pageNo
    this.searchAdvert['rows'] = this.pageSize
    this.buttons = JSON.parse(localStorage.getItem('microServiceManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')

    this.getAdvertManage(this.searchAdvert)
    this.headers = { 'token': sessionStorage.getItem('token') }
  },
  mounted () {
    this.$bus.$on('themChange', val => {
      this.theme_BackgroundColor = val.menuBackgroundColor
      this.theme_TextColor = val.textColor
    })
  },
  methods: {
    shwoDialog (data) {
      this.advertData = data
      this.dialogVisible = true
      this.imageUrl = this.getImgUrl(this.advertData.img)
    },
    shwoDialog2 (data) {
      this.getCallInfoById(data)
      this.dialogVisible2 = true
      this.nowId = data.id
      // this.imageUrl =this.getImgUrl(this.advertData.img);
    },
    getCallInfoById (data) {
      this.$post('/epf-admin/microService/getCallInfoById', { id: data.id }).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.advertDataList2 = res.list
      })
    },
    getAdvertManage (params) {
      this.loading = true
      this.$post('/epf-admin/microService/getAllMicroService', { params: params }).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.loading = false
        this.advertDataList = res.pager.results
      })
    },
    deleteBanner (data) {
      var that = this
      that.$confirm('确认要删除信息吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        // type: 'warning',
        center: true
      }).then(() => {
        this.$post('/epf-admin/microService/deleteInfo', { id: data.id }).then(res => {
          if (res.code != '0') {
            // 失败
            this.$message.error(res.msg)
            return
          }
          this.$message.success('删除成功!')
          this.getAdvertManage(this.searchAdvert)
        })
      }).catch(() => {
        that.$message({ type: 'info', message: '已取消删除' })
      })
    },
    cancel () {
      this.dialogVisible = false
      this.getAdvertManage(this.searchAdvert)
    },
    saveBanner () {
      this.$post('/epf-admin/microService/modifyInfo?token=' + sessionStorage.getItem('token'), this.advertData).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.dialogVisible = false
        this.$message.success('保存成功!')
        this.getAdvertManage(this.searchAdvert)
      })
    },
    saveBanner2 () {
      var selectedIds = []
      for (var int = 0; int < this.advertDataList2.length; int++) {
        if (this.advertDataList2[int].hasAuth) {
          selectedIds.push(this.advertDataList2[int].id)
        }
      }
      this.$post('/epf-admin/microService/updateRela?token=' + sessionStorage.getItem('token') + '&id=' + this.nowId + '&ids=' + selectedIds
        , this.advertData2).then(res => {
          if (res.code != '0') {
            this.$message.error(res.msg)// 失败
            return
          }
          this.dialogVisible2 = false
          this.$message.success('设置成功!')
          this.getAdvertManage(this.searchAdvert)
        })
    },
    addBanner () { // 添加新闻
      this.advertData = { id: '', name: '', url: '', remark: '' }
      this.imageUrl = ''
      this.dialogVisible = true
    },
    editBanner (data) { // 编辑新闻
      this.$get('/epf-cms/admin/advert/getAdvert?id=' + data.id).then(res => {
        this.advert = res.advert
        this.isViewHtml = false
        this.dialogVisible = false
      }).catch(res => {
        this.$message.warning(res.msg)
      })
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchAdvert['page'] = this.pageNo
      this.searchAdvert['rows'] = val
      this.getAdvertManage(this.searchAdvert)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchAdvert['page'] = val
      this.searchAdvert['rows'] = this.pageSize
      this.getAdvertManage(this.searchAdvert)
    },
    getImgUrl (id) {
      return '/epf-document/document/downloadById?id=' + id
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.advertData.img = res.data[0].id
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

