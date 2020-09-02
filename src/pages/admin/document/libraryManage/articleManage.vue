<template>
  <div class="page-body"
       id="addAgreementContract"
       :style="{'height':menuListHeight +'px'}">
    <div class="filter_wrap">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="文章标题:"
                          label-width="10rem">
              <el-input v-model="form.name"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label-width="10rem">
              <div :style="{'height':menuListHeight-250 +'px'}">

                <Editor :id='editorId'
                        v-model='form.content'
                        :init="init"></Editor>

              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="文章来源:"
                          label-width="10rem">
              <el-autocomplete style="width:100%;"
                               popper-class="my-autocomplete"
                               v-model="form.source"
                               :fetch-suggestions="querySearch"
                               placeholder="请输入文档来源"
                               @select="handleSelect">

                <template slot-scope="props">
                  <div class="name">{{ props.item.name }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文章作者:"
                          label-width="10rem">
              <el-input v-model="form.author"
                        :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布日期:"
                          label-width="10rem">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="form.pbtime"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="文档编号"
                          label-width="10rem">
              <el-input v-model="form.docNo"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关键字"
                          label-width="10rem">
              <el-input v-model="form.keywords"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="涉及业务:"
                          label-width="10rem">
              <el-select v-model="form.bussyniss"
                         multiple
                         placeholder="请选择">
                <el-option label="公积金"
                           value="公积金"></el-option>
                <el-option label="台账"
                           value="台账"></el-option>
                <el-option label="合同"
                           value="合同"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发文字号"
                          label-width="10rem">
              <el-input v-model="form.issuedNumber"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
                    <el-form-item label="描述" label-width="10rem">
                        <el-input v-model="form.remark" :maxlength="50"></el-input>
                    </el-form-item>
                </el-col> -->
          <el-col :span="8">
            <el-form-item label="涉及行业:"
                          label-width="10rem">
              <el-select v-model="form.industry"
                         multiple
                         placeholder="请选择">
                <el-option label="IT"
                           value="IT"></el-option>
                <el-option label="教育"
                           value="教育"></el-option>
                <el-option label="金融"
                           value="金融"></el-option>
                <el-option label="医疗"
                           value="医疗"></el-option>
                <el-option label="服务"
                           value="服务"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="文章分类:"
                          label-width="10rem">
              <el-cascader expand-trigger="hover"
                           :options="forderdata"
                           :props="folderprops"
                           :show-all-levels="false"
                           v-model="form.folderId"
                           :change-on-select="true"
                           @change="handleChange"
                           style="width:100%">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文章编目:"
                          label-width="10rem">
              <el-input v-model="form.fileCataloging"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联相关:"
                          label-width="10rem">
              <el-button size="small"
                         @click="handleEditt"
                         style="width:100%;line-height:20px">请选择要关联的文件</el-button>
              <div class="relevance"
                   v-for="(item,index) in guanlian"
                   :key="index"><span class="el-icon-paperclip"></span>{{item.name?item.name:item.NAME}}<span class="el-icon-close"
                      @click="guanliandelet(item)"></span></div>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <div style="text-align:center;">
        <el-button type="primary"
                   @click="onSubmit">保存</el-button>
        <el-button @click="closearticle">取消</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <!-- 关联相关 -->
    <el-dialog :title="dlogTitle"
               class="companyInfo"
               width="900px"
               :visible.sync="optPopup"
               :append-to-body='true'>
      <div class="switchHeight_box">
        <el-row :gutter="2">
          <el-col :span="24"
                  class="filterIpt">
            <el-input size="small"
                      placeholder="请输入您要关联的相关文件的名称或关键字"
                      v-model="searchInfo.name"
                      @keyup.enter.native="tosearch"
                      :maxlength="50"></el-input>
            <i class="el-icon-search"
               @click="tosearch"></i>
          </el-col>
        </el-row>
        <!--
                <el-row :gutter="2">
                    <el-col :span="24" style="margin-top:15px;">
                        <el-select v-model="form.region" :placeholder="folder">
                            <el-option label="个人收藏夹" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                </el-row>-->
        <el-table :data="docInfoList"
                  style="width: 100%;margin-top:20px"
                  border
                  v-loading="loading"
                  @selection-change="dialogCheckChange"
                  :height="menuListHeight-150"
                  ref="multipleTable"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)">

          <el-table-column type="selection"
                           width="55"></el-table-column>

          <el-table-column prop="name"
                           label="文件名称"
                           min-width="180">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>

          <el-table-column prop="source"
                           label="文档来源"
                           min-width="150">
            <template slot-scope="scope">
              {{scope.row.source}}
            </template>
          </el-table-column>
          <el-table-column prop="publishTime"
                           label="发文日期"
                           min-width="130">
            <template slot-scope="scope">
              {{scope.row.publishTime}}
            </template>
          </el-table-column>
        </el-table>

        <div style="text-align:right;margin:8px 0px;margin-top:15px;">
          <el-pagination background
                         layout="prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-size="pageSize"
                         :current-page="pageNo"
                         :total="totalRecord"></el-pagination>
        </div>
        <el-row>
          <el-col :span="24"
                  style="text-align: center;margin-top:10px">
            <span class="button_border"
                  @click="optPopup = false"
                  style="margin:0;">确定</span>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/mobile/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import axios from 'axios'
import baseUrl from '../../../../utils/config'
export default {
  components: { Editor },
  data () {
    return {
      restaurants: [{ 'name': '广东省自然资源厅', 'value': '广东省自然资源厅' }, { 'name': '贵州资源厅', 'value': '贵州资源厅' }],
      dialogtype: '',
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      docInfoList: [],
      searchInfo: {},
      loading: false,
      dlogTitle: '',
      folder: '',
      optPopup: false, //  控制关联弹窗
      guanlian: [],
      menuListHeight: 900,
      forderdata: [],
      folderprops: { value: 'id', label: 'folderName', children: 'childForder' },
      form: {
        content: '',
        name: ''

      },
      editorId: 'cmsEditor',
      editor: '',
      relaod: '',
      init: {
        language_url: process.env.NODE_ENV == 'development' ? '/static/tinymce/langs/zh_CN.js' : '/static/js/langs/zh_CN.js',
        language: 'zh_cn',
        skin_url: process.env.NODE_ENV == 'development' ? '/static/tinymce/skins/ui/oxide' : '/static/js/skins/ui/oxide',
        height: 500,
        plugins: [
          'advlist autolink lists link image charmap preview',
          'searchreplace visualblocks fullscreen',
          'insertdatetime media table contextmenu paste',
          'emoticons textcolor'
        ],
        toolbar1: 'undo redo | styleselect | fontselect | fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
        toolbar2: 'fullscreen preview | forecolor backcolor emoticons | table | link image media',
        branding: false,
        images_upload_url: '/epf-document/document/upload',
        images_upload_handler: (blobInfo, success, failure) => {
          var form = new FormData()
          form.append('files', blobInfo.blob(), blobInfo.filename())
          axios.post(baseUrl.baseURL1 + '/epf-document/document/upload', form).then(res => {
            if (res.state != 'SUCCESS') {
              alert('图片上传失败')
            }
            var location = baseUrl.baseURL1 + '/epf-document/document/downloadById?id=' + res.data[0].id
            success(location)
          }
          )
        },
        file_picker_callback: (callback, value, meta) => {
          var input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.onchange = function () {
            var file = this.files[0]
            var form = new FormData()
            form.append('files', file)
            axios.post(baseUrl.baseURL1 + '/epf-document/document/upload', form).then(res => {
              if (res.state != 'SUCCESS') {
                alert('图片上传失败')
                files.onError()
                return null
              }
              var location = baseUrl.baseURL1 + '/epf-document/document/downloadById?id=' + res.data[0].id
              callback(location, { text: res.data[0].name })
            }
            )
          }

          input.click()
        }
      }
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 200
    this.loadTree()
    this.editor = this.$route.query.editor
    if (this.editor == 1) { // 是否为编辑
      var form = this.$route.query.row
      this.form = form
      var name = this.form.name
      if (form['involvedIndustry'] != null || form['involvedIndustry'] != undefined) { this.form.industry = form['involvedIndustry'].split(',') }
      if (form['involvedBussyniss'] != null || form['involvedBussyniss'] != undefined) { this.form.bussyniss = form['involvedBussyniss'].split(',') }
      if (name.indexOf('.') != -1) {
        this.form.name = name.substring(0, name.indexOf('.'))
      }
      this.form.pbtime = new Date(this.form.publishTime)
      var _this = this
    }
    this.getDocList(this.searchInfo)
  },
  mounted () {
    console.log('路径', process.env.NODE_ENV)
    this.showEditor = false
    if (this.$store.state.cmsEditor_Index) {
      this.editorId = 'cmsEditor' + (this.$store.state.cmsEditor_Index + 1)
      this.$store.state.cmsEditor_Index++
    } else {
      this.$store.state.cmsEditor_Index = 1
      this.editorId = 'cmsEditor' + 1
    }

    tinymce.init({})
  },
  methods: {
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {

    },
    async getinit (id) {
      var params = {}
      this.$post('/epf-document/admin/doctag/getTagJson', params).then(res => {
        console.log('===========', res)
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          this.loading = false
          return
        }
        this.alltag = res.tags
        this.loading = false

        //   return R.ok().put("tags", tags).put("guanlianlist", guanlianlist).put("versionlist", versionlist);
        this.$get('/epf-document/admin/doctag/getdocinit', { id: id }).then(res => {
          if (res.code != '0') {
            this.$message.error(res.msg) // 失败
            return
          }
          this.guanlian = res.guanlianlist
        })
      })
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getDocList(this.searchInfo)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.pageSize
      this.getDocList(this.searchInfo)
    },
    dialogCheckChange (selection) {
      this.guanlian = selection
    },
    async getDocList (params) {
      this.loading = true
      params['foldertype'] = '1'
      this.$get('/epf-document/docdocumentinfo/getTenantDocJson', params).then(res => {
        console.log('871===========', res)
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          this.loading = false
          return
        }
        if (params.load) {
          this.totlecorde = res.pager.totalRecord
          this.searchInfo['load'] = ''
        }
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.docInfoList = res.pager.results

        this.loading = false
      })
    },
    tosearch () {
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = this.pageSize
      this.getDocList(this.searchInfo)
    },
    handleEditt (index, row) {
      this.dlogTitle = '关联相关'
      this.folder = '个人收藏夹'
      this.dialogtype = 'guanlian'

      this.optPopup = true
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = this.pageSize
      this.getDocList(this.searchInfo)
      this.$refs.multipleTable.clearSelection()
    },
    handleChange (value) {
      console.log(value)
      this.form.folderId = value[value.length - 1]
    },
    loadTree () {
      var that = this
      this.loading = true
      that.$post('/epf-document/admin/docfolder/getAllFolderTree').then(res => {
        console.log('数返回', res.ztreeJson)
        that.forderdata = res.ztreeJson
        this.loading = false
      })
    },
    closearticle () {
      let that = this
      this.$bus.$emit('closeTabsItem', this.$route.name)
      let routerPath = '/libraryManage'
      let title = '文库管理'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push('/libraryManage')
      this.$bus.$emit('refreshAssembly')
    },
    onSubmit () {
      var data = this.form
      var guanlian = this.guanlian
      var guanliid = ''
      if (guanlian.length > 0) {
        for (let index = 0; index < this.guanlian.length; index++) {
          guanliid += this.guanlian[index].id + ','
        }
      }
      if (!data.pbtime) {
        this.$message.warning('请填写发布日期')
        return
      }
      data['guanliid'] = guanliid
      data['involvedIndustry'] = data.industry.join(',')
      data['involvedBussyniss'] = data.bussyniss.join(',')
      delete data.publishTime
      this.$post('/epf-document/docdocumentinfo/savearticle', data).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }
        this.$message.success('保存成功')
        this.$bus.$emit('closeTabsItem', this.$route.name)
        let routerPath = '/libraryManage'
        let title = '文库管理'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push('/libraryManage')
        this.$bus.$emit('refreshAssembly')
      })
    }
  }

}
</script>
<style scoped>
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  padding: 10px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
}

.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
</style>
<style>
.filterIpt {
  position: relative;
}
.filterIpt i {
  position: absolute;
  right: 1%;
  top: 20%;
  font-size: 20px;
  cursor: pointer;
}
.el-select {
  width: 100%;
}
.relation .el-upload {
  width: 100%;
}
.relation .el-button--small {
  width: 100%;
}
.edition .el-form-item__content {
  position: relative;
}
.edition .el-form-item__content .selt {
  position: absolute;
  left: 0;
}
.edition .el-form-item__content .inp {
  position: absolute;
  right: 0;
}
</style>
