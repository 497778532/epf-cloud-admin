<template>
  <div id="advertManage">
    <el-container>

      <el-main style="">
        <el-container>
          <el-header class="m_title">
            <div style="float:left">广告位管理</div>
            <el-button style="float:right;margin-top:-2px;"
                       @click="addBanner"
                       size="mini"
                       icon="el-icon-plus">添加</el-button>
          </el-header>
          <el-main :style="{'height':menuAdvertListHeight + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
            <template>
              <el-table :data="advertDataList"
                        border
                        style="width: 100%">
                <el-table-column fixed
                                 prop="img"
                                 label="图片"
                                 width="400">
                  <template slot-scope="scope">
                    <img style="width:400px;height:100px;"
                         :src="getImgUrl(scope.row.img)" />
                  </template>
                </el-table-column>
                <el-table-column prop="name"
                                 label="标题"
                                 width="200">
                </el-table-column>
                <el-table-column prop="url"
                                 label="链接"
                                 width="200">
                </el-table-column>
                <el-table-column prop="remark"
                                 label="详细说明"
                                 width="90">
                </el-table-column>
                <el-table-column prop="orderNum"
                                 label="排序"
                                 width="90">
                </el-table-column>
                <el-table-column prop="createTime"
                                 label="创建时间"
                                 width="180">
                </el-table-column>
                <el-table-column fixed="right"
                                 label="操作"
                                 width="150">
                  <template slot-scope="scope">
                    <el-button type="text"
                               size="small"
                               @click="shwoDialog(scope.row)">编辑</el-button>
                    <el-button type="text"
                               size="small"
                               @click="deleteBanner(scope.row)">删除</el-button>
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

        <!-- <img style="width:100%;height:180px;" :src="getImgUrl(advertData.img)"  /> -->
        <el-upload class="avatar-uploader"
                   action="/api/epf-document/document/upload"
                   name="files"
                   :headers="headers"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl"
               :src="imageUrl"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <el-form-item label="标题
                "
                      style="margin-top:20px;">
          <el-input v-model="advertData.name"
                    :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="advertData.orderNum"
                    :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="advertData.url"
                    :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea"
                    v-model="advertData.remark"
                    :maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary"
                   @click="saveBanner">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import qs from 'qs'
import Axios from 'axios'

export default {
  name: 'advertManage',
  headers: {},
  data () {
    return {
      advertDataList: [],
      advertData: {},
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchAdvert: {},
      tableData1: [],
      dialogVisible: false,
      imageUrl: ''
    }
  },
  created () {
    this.searchAdvert['page'] = this.pageNo
    this.searchAdvert['rows'] = this.pageSize
    this.getAdvertManage(this.searchAdvert)
    this.menuAdvertListHeight = window.innerHeight - 261
    this.headers = { 'token': sessionStorage.getItem('token') }
  },
  methods: {
    shwoDialog (data) {
      this.advertData = data
      this.dialogVisible = true
      this.imageUrl = this.getImgUrl(this.advertData.img)
    },
    getAdvertManage (params) {
      this.$get('/epf-cms/cmsAdvert/getCmsAdvertJson', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.advertDataList = res.pager.results
      })
    },
    deleteBanner (data) {
      this.$post('/epf-cms/cmsAdvert/deleteCmsAdvert', { id: data.id }).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.getAdvertManage(this.searchAdvert)
      })
    },
    saveBanner () {
      this.$post('/epf-cms/cmsAdvert/editCmsAdvert', this.advertData).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.dialogVisible = false
        this.$message.success(res.msg)
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
  background: rgb(48, 126, 204);
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

