<template>
  <div id="advertManage">
    <el-container>

      <el-main style="">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">
            <div style="float:left">广告位管理</div>
            <span style="float:right;margin-top:-2px;"
                  v-for="(button ,index)  in buttons"
                  :key="index">
              <el-button v-if="button.resourceId=='advert_add'"
                         @click="addBanner"
                         size="mini"
                         icon="el-icon-plus">添加</el-button>
            </span>
          </el-header>
          <div class="bankfilter noSelect">
            <div style="min-width:100px;height:28px;">
              <span class="filter_title">类型 :</span>
            </div>
            <!-- <div style="min-width:160px;height:28px;">
                        <el-input  size="mini" placeholder="请输入银行名称" :maxlength="50"></el-input>
                    </div> -->
            <el-select v-model="value"
                       size="mini"
                       clearable
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

            <div style="margin-left:20px">
              <el-button size="mini"
                         @click="queryDate">查询</el-button>
            </div>
          </div>
          <el-main :style="{'height':menuAdvertListHeight + 'px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
            <template>
              <el-table :data="advertDataList"
                        border
                        style="width: 100%">
                <el-table-column fixed
                                 prop="img"
                                 label="图片"
                                 min-width="423">
                  <template slot-scope="scope">
                    <img style="width:100%;height:100px;"
                         :src="getImgUrl(scope.row.img)"
                         :onerror="defaultImg" />
                  </template>
                </el-table-column>
                <el-table-column prop="name"
                                 label="标题"
                                 min-width="200">
                </el-table-column>
                <el-table-column prop="url"
                                 label="链接"
                                 min-width="200">
                </el-table-column>
                <el-table-column prop="remark"
                                 label="详细说明"
                                 min-width="90">
                </el-table-column>
                <el-table-column prop="orderNum"
                                 label="排序"
                                 min-width="90">
                </el-table-column>
                <el-table-column prop="createTime"
                                 label="创建时间"
                                 min-width="180">
                </el-table-column>
                <el-table-column prop="typeUse"
                                 label="类型"
                                 min-width="180">
                </el-table-column>
                <el-table-column fixed="right"
                                 label="操作"
                                 min-width="150">
                  <template slot-scope="scope">
                    <span v-for="(button ,index)  in buttons"
                          :key="index">
                      <el-button v-if="button.resourceId=='advert_add'"
                                 type="text"
                                 size="small"
                                 @click="editBanner(scope.row)">编辑</el-button>
                      <el-button v-if="button.resourceId=='advert_delete'"
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

    <el-dialog :title="title"
               :visible.sync="dialogVisible">
      <el-form :model="advertData"
               label-width="80px">

        <el-upload class="avatar-uploader"
                   action="/api/epf-document/document/upload"
                   name="files"
                   :headers="headers"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <i v-if="!imageUrl"
             class="el-icon-plus avatar-uploader-icon"></i>
          <img v-if="imageUrl"
               :src="imageUrl"
               style="height:178px"
               class="avatar"
               :onerror="defaultImg">
        </el-upload>

        <el-form-item label="标题"
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

        <el-form-item label="类型">
          <el-select v-model="advertData.typeUse"
                     placeholder="请选择广告图片类型">
            <!--                    <el-option label="首页" value="home"></el-option>-->
            <!--                    <el-option label="服务中心" value="service"></el-option>-->
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary"
                   @click="saveBanner"
                   :disabled="isDisabled">确 定</el-button>
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
      options: [
        {
          value: 'home',
          label: '首页'
        },
        {
          value: 'service',
          label: '服务中心'
        },
        {
          value: 'landData',
          label: '土地数据'
        }
      ],
      value: '',
      advertDataList: [],
      advertData: {},
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchAdvert: {},
      tableData1: [],
      dialogVisible: false,
      imageUrl: '',

      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',
      title: '',
      isDisabled: false, // 禁用按钮，默认不禁用
      defaultImg:
        'this.src="' + require('../../../../assets/icon-nodata.png') + '"' // 默认图地址npm
    }
  },
  created () {
    this.searchAdvert['page'] = this.pageNo
    this.searchAdvert['rows'] = this.pageSize
    this.menuAdvertListHeight = window.innerHeight - 261
    this.buttons = JSON.parse(localStorage.getItem('advertManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')
    this.getAdvertManage(this.searchAdvert)
    this.headers = { token: sessionStorage.getItem('token') }
  },
  methods: {
    shwoDialog (data) {
      this.advertData = data
      this.dialogVisible = true
      this.title = '编辑'
      this.imageUrl = this.getImgUrl(this.advertData.img)
    },

    queryDate () {
      let typeUse = this.value
      var filters = { typeUse: typeUse }
      this.getAdvertManage({
        page: this.pageNo,
        rows: this.pageSize,
        filters: filters
      })
      //   this.searchAdvert['page'] = this.pageNo
      //   this.searchAdvert['rows'] = this.pageSize
      //   this.searchAdvert['typeUse'] = typeUse
      //   this.getAdvertManage(this.searchAdvert)
    },
    getAdvertManage (params) {
      this.$get('/epf-cms/cmsAdvert/getCmsAdvertJson', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          return
        }
        this.isDisabled = false
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.advertDataList = res.pager.results
        let typeText = this.advertDataList
        for (let i = 0; i < typeText.length; i++) {
          if (typeText[i].typeUse == 'home') {
            typeText[i].typeUse = '首页'
          } else if (typeText[i].typeUse == 'service') {
            typeText[i].typeUse = '服务中心'
          } else if (typeText[i].typeUse == 'landData') {
            typeText[i].typeUse = '土地数据'
          }
        }
      })
    },
    deleteBanner (data) {
      this.$confirm('是否删除该消息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      })
        .then(() => {
          this.$post('/epf-cms/cmsAdvert/deleteCmsAdvert', {
            id: data.id
          }).then(res => {
            if (res.code != '0') {
              // 失败
              this.$message.error(res.msg)
              return
            }
            this.$message.success(res.msg)
            this.getAdvertManage(this.searchAdvert)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    saveBanner () {
      this.isDisabled = true
      // let d = this.advertData;
      // console.log(d);
      let typeUse = this.advertData.typeUse // 获取类型
      // if(typeUse == 'home'){
      //   typeUse = '首页'
      // }else  if(typeUse == 'service'){
      //   typeUse = '服务中心'
      // }else  if(typeUse == 'landData'){
      //   typeUse = '土地数据'
      // }

      // console.log(typeUse)
      var paramTypeUse = { typeUse: typeUse }
      this.$post('/epf-cms/cmsAdvert/editCmsAdvert', this.advertData).then(
        res => {
          if (res.code != '0') {
            this.$message.error(res.msg) // 失败
            return
          }
          this.dialogVisible = false
          this.$message.success(res.msg)
          // this.getAdvertManage(this.searchAdvert);
          this.getAdvertManage({
            page: this.pageNo,
            rows: this.pageSize,
            filters: { typeUse: this.value } // paramTypeUse
          })
        }
      )
    },
    addBanner () {
      // 添加新闻
      this.advertData = { id: '', name: '', url: '', remark: '', typeUse: '' }
      this.imageUrl = ''
      this.title = '添加'
      this.dialogVisible = true
      let sltValue = this.value
      this.advertData.typeUse = sltValue
    },
    editBanner (data) {
      // 编辑新闻
      this.$get('/epf-cms/cmsAdvert/getCmsAdvert?id=' + data.id)
        .then(res => {
          this.advertData = res.advert
          this.dialogVisible = true
          this.title = '编辑'
          this.imageUrl = this.getImgUrl(this.advertData.img)
        })
        .catch(res => {
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
      return '/api/epf-document/document/downloadById?id=' + id
    },
    handleAvatarSuccess (res, file) {
      console.log('上传成功', res, file)
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

<style>
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

.avatar-uploader .el-upload.el-upload--text {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: block !important;
}
.avatar-uploader .avatar {
  width: 100%;
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
  height: auto;
  display: block;
}

input[type="file"] {
  display: none !important;
}
.bankfilter {
  padding: 6px 12px;
  border: 1px solid rgb(224, 224, 224);
  display: flex;
  flex-direction: row;
  background: rgb(224, 224, 224);
  overflow-x: hidden;
}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 28px;
  padding-right: 10px;
  text-align: right;
  line-height: 28px;
}
</style>

