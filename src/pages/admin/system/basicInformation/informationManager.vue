<template>
  <div class="page-body"
       id="basicInformationManager">
    <div class="filter_wrap">
      <div class="primary"
           @click="getCheckedKeys"
           style="float: right">保存</div>
      <div class="switchHeight_box">
        <el-row>
          <el-form :model="InfoConfigBase">

            <el-form-item label='平台logo'
                          :label-width="formLabelWidth"
                          prop="logoUrl">
              <el-upload class="avatar-uploader"
                         action="/api/epf-document/document/upload"
                         name="files"
                         :headers="headers"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl"
                     :src="imageUrl"
                     class="avatar"
                     :onerror="defaultImg">
                <i v-else
                   class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='平台名称'
                              :label-width="formLabelWidth"
                              prop="name">
                  <el-input v-model="InfoConfigBase.name"
                            auto-complete="off"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='显示标题'
                              :label-width="formLabelWidth">
                  <el-tooltip :content="InfoConfigBase.isShowTitle=='1'?'不显示':'显示'"
                              placement="top">
                    <el-switch v-model="InfoConfigBase.isShowTitle"
                               active-color="#ff4949"
                               inactive-color="#13ce66"
                               active-value="1"
                               inactive-value="0">
                    </el-switch>
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='英文名称'
                              :label-width="formLabelWidth"
                              prop="nameEn">
                  <el-input v-model="InfoConfigBase.nameEn"
                            auto-complete="off"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='主办单位'
                              :label-width="formLabelWidth"
                              prop="sponsor">
                  <el-input v-model="InfoConfigBase.sponsor"
                            auto-complete="off"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='承办单位'
                              :label-width="formLabelWidth"
                              prop="undertake">
                  <el-input v-model="InfoConfigBase.undertake"
                            auto-complete="off"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='技术支持'
                              :label-width="formLabelWidth"
                              prop="techSupport">
                  <el-input v-model="InfoConfigBase.techSupport"
                            auto-complete="off"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='备案字号'
                              :label-width="formLabelWidth"
                              prop="filingNumber">
                  <el-input v-model="InfoConfigBase.filingNumber"
                            auto-complete="off"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='地    址'
                              :label-width="formLabelWidth"
                              prop="address">
                  <el-input type="textarea"
                            v-model="InfoConfigBase.address"
                            auto-complete="off"
                            :maxlength="100"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='电    话'
                              :label-width="formLabelWidth"
                              prop="telphone">
                  <el-input v-model="InfoConfigBase.telphone"
                            auto-complete="off"
                            :maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='版权信息'
                              :label-width="formLabelWidth"
                              prop="allRights">
                  <el-input v-model="InfoConfigBase.allRights"
                            auto-complete="off"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='客服电话'
                              :label-width="formLabelWidth"
                              prop="servicePhone">
                  <el-input v-model="InfoConfigBase.servicePhone"
                            auto-complete="off"
                            :maxlength="15"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='QQ号码'
                              :label-width="formLabelWidth"
                              prop="qq">
                  <el-input v-model="InfoConfigBase.qq"
                            auto-complete="off"
                            :maxlength="15"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='城市名称'
                              :label-width="formLabelWidth"
                              prop="cityName">
                  <el-input v-model="InfoConfigBase.cityName"
                            auto-complete="off"
                            :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='位置X坐标'
                              :label-width="formLabelWidth"
                              prop="coordinateX">
                  <el-input v-model="InfoConfigBase.coordinateX"
                            auto-complete="off"
                            :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='位置Y坐标'
                              :label-width="formLabelWidth"
                              prop="coordinateY">
                  <el-input v-model="InfoConfigBase.coordinateY"
                            auto-complete="off"
                            :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='ICP证'
                              :label-width="formLabelWidth"
                              prop="icpCard">
                  <el-input v-model="InfoConfigBase.icpCard"
                            auto-complete="off"
                            :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='办公时间'
                              :label-width="formLabelWidth"
                              prop="officeHours">
                  <el-input v-model="InfoConfigBase.officeHours"
                            auto-complete="off"
                            :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='业务信箱'
                              :label-width="formLabelWidth"
                              prop="businessMail">
                  <el-input v-model="InfoConfigBase.businessMail"
                            auto-complete="off"
                            :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label='单位简介'
                              :label-width="formLabelWidth"
                              prop="introduction">
                  <el-input type="textarea"
                            v-model="InfoConfigBase.introduction"
                            auto-complete="off"
                            :rows="5"
                            :maxlength="200"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='版本号'
                              :label-width="formLabelWidth"
                              prop="version">
                  <el-input v-model="InfoConfigBase.version"
                            auto-complete="off"
                            :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-row>
        <div class="activity-dialog"
             v-loading="loading"
             element-loading-text="数据加载中"
             element-loading-background="rgba(255, 255, 255,0.95)">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import personalFiltrate from '@/components/personalFiltrate'
import transferTable from '@/components/transferTable'

export default {
  name: 'basicInformationManager',
  components: {
    personalFiltrate,
    transferTable
  },

  data () {
    return {
      formLabelWidth: '80px',
      loading: true,
      defaultImg: 'this.src="' + require('../../../../assets/logo.png') + '"', // 默认图片
      InfoConfigBase: {},
      imageUrl: ''

    }
  },
  created () {
    this.getlogList()
    this.headers = { 'token': sessionStorage.getItem('token') }
  },
  mounted () {
    this.$bus.$on('themChange', val => {
      this.theme_BackgroundColor = val.menuBackgroundColor
      this.theme_TextColor = val.textColor
    })
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.InfoConfigBase.logoUrl = res.data[0].id
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      /* if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }*/
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    getCheckedKeys () {
      let that = this
      that.$post('/epf-cms/cms/basics/updateInformation', this.InfoConfigBase).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        // that.dialogFormVisible = false;
        this.$message.success('更新成功')
        that.getlogList()
      })
    },
    getlogList () {
      this.$http.get('/api/epf-cms/cms/basics/getInformationList', {}).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.InfoConfigBase = res.information
        // 图片回显
        this.imageUrl = '/api/epf-document/document/downloadById?id=' + res.information.logoUrl

        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
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
  width: 120px;
  height: 120px;
  display: block;
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
  margin-left: 15px;
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
#basicInformationManager .el-table__body tr td:nth-child(2) .cell {
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

.el-row {
  margin-bottom: 20px;
  /* &:last-child {
     margin-bottom: 0;
   } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
