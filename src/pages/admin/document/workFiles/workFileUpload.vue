<template>
  <div class="page-body"
       id="libraryupload"
       :style="{'height':menuListHeight+'px'}">
    <div class="filter_wrap">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择文件"
                          label-width="10rem">
              <el-upload class="upload-demo"
                         name="files"
                         action="/api/epf-document/document/upload"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :http-request="annexUpload"
                         :before-remove="beforeRemove"
                         multiple
                         :limit="1"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
                <el-button size="small"
                           type="primary"
                           style="margin-right:10px;">点击上传</el-button>
                <span slot="tip"
                      class="el-upload__tip"
                      style="padding:left:10px">支持扩展名：.pdf .doc .docx .xls .jpg...</span>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="文件名称"
                          label-width="10rem">
              <el-input v-model="form.name"
                        placeholder="填写文件名称"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文档来源"
                          label-width="10rem">
              <el-select v-model="form.source"
                         placeholder="广东省自然资源厅">
                <el-option label="广东省自然资源厅"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="发文字号"
                          label-width="10rem">
              <el-input v-model="form.issuedNumber"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属目录"
                          label-width="10rem">
              <el-cascader expand-trigger="hover"
                           :options="forderdata"
                           :props="folderprops"
                           :show-all-levels="false"
                           v-model="selectefolderid"
                           :change-on-select="true"
                           @change="handleChange"
                           style="width:100%">
              </el-cascader>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="涉及业务"
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
          <el-col :span="12"
                  class="edition">
            <el-form-item label="关键字"
                          label-width="10rem">
              <el-input v-model="form.keywords"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="文档编号"
                          label-width="10rem">
              <el-input v-model="form.docNo"
                        :maxlength="50"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12"
                  class="edition">
            <el-form-item label="涉及行业"
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
          <el-col :span="12">
            <el-form-item label="文件描述"
                          label-width="10rem">
              <el-input v-model="form.remark"
                        :maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"
                  class="edition">
            <el-form-item label="文档状态"
                          label-width="10rem">
              <el-col :span="11"
                      class="selt">
                <el-select v-model="form.versionType"
                           placeholder="请选择文档状态">
                  <el-option label="V1.0"
                             value="V1.0"></el-option>
                  <el-option label="V1.1"
                             value="V1.1"></el-option>
                  <el-option label="V1.2"
                             value="V1.2"></el-option>
                  <el-option label="V1.3"
                             value="V1.3"></el-option>
                  <el-option label="V1.4"
                             value="V1.4"></el-option>
                  <el-option label="V1.5"
                             value="V1.5"></el-option>
                </el-select>
              </el-col>
              <el-col :span="11"
                      class="inp">
                <el-input v-model="form.versionRemark"
                          :maxlength="50"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="文件标签"
                          label-width="10rem">
              <div class="label">
                <el-tag :key="index"
                        v-for="(tag ,index) in selectedtag"
                        closable
                        :disable-transitions="false"
                        @close="handleClosetag(tag)">
                  {{tag.name}}
                </el-tag>

                <i class="el-icon-circle-plus-outline"
                   @click="AddFlowpatreason"></i>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件编目"
                          label-width="10rem">
              <el-input v-model="form.fileCataloging"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="relation">
          <el-col :span="12">
            <el-form-item label="关联相关"
                          label-width="10rem">
              <el-button size="small"
                         @click="handleEditt">请选择要关联的文件</el-button>
              <div class="relevance"
                   v-for="(item,index) in guanlian"
                   :key="index"><span class="el-icon-paperclip"></span>{{item.name?item.name:item.NAME}}<span class="el-icon-close"
                      @click="guanliandelet(item)"></span></div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本关联"
                          label-width="10rem">
              <el-button size="small"
                         @click="handlEdition">请选择要关联的版本</el-button>
              <div class="relevance"
                   v-for="(item,index) in versiondoc"
                   :key="index"><span class="el-icon-paperclip"></span>{{item.name?item.name:item.NAME}}<span class="el-icon-close"
                      @click="versiondocdelet(item)"></span></div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="text-align:center;">
        <el-button @click="closeupload"
                   class="primary_reset">取消</el-button>
        <el-button @click="onSubmit"
                   class="primary_search">提交</el-button>
      </el-row>
    </div>
    <!-- 弹窗 -->
    <div>
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

      <!-- 标签 -->
      <el-dialog :title="savetitle"
                 :visible.sync="dialogFormVisible">
        <el-container>
          <el-row :gutter="2">
            <el-col :span="24">
              <p>已选标签 <span>（最多只能添加六个）</span></p>
              <el-tag :key="index"
                      v-for="(tag ,index) in selectedtag"
                      closable
                      :disable-transitions="false"
                      @close="handleClosetag(tag)">
                {{tag.name}}
              </el-tag>
            </el-col>
            <el-col :span="24">
              <p>全部标签</p>
              <span v-for="(tag,index) in alltag"
                    :key="index">
                <el-button v-if="selectedtagid.indexOf(tag.id)!=-1"
                           class="button-new-tag"
                           size="small">{{tag.name}} +</el-button>
                <el-button v-else
                           class="button-new-tag"
                           size="small"
                           @click="handleInputConfirm(tag)">{{tag.name}} +</el-button>
              </span>
            </el-col>
          </el-row>

        </el-container>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>

          <el-button type="primary"
                     @click="dialogFormVisible = false">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import selectInput from '@/components/common/form/selectInpt'
import { mapActions, mapState } from 'vuex'
import Bus from '../../../../utils/bus'
export default {
  name: 'libraryupload',
  data () {
    return {
      folderprops: { value: 'id', label: 'folderName', children: 'childForder' },
      fileList: [],
      loading: false,
      xmbsmTableData: [],
      menuListHeight: 100,
      savetitle: '',
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      dlogTitle: '',
      folder: '',
      optPopup: false, //  控制关联弹窗
      dialogFormVisible: false, // 标签选择
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      forderdata: [],
      alltag: [],
      selectedtag: [],
      selectefolderid: [],
      selectedtagid: [],
      docInfoList: [],
      searchInfo: {},
      guanlian: [],
      versiondoc: [],
      dialogtype: '',
      form: { name: '' },
      row: {},
      editor: '',
      selectedData: []
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 245
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.row = this.$route.query.row
    this.editor = this.$route.query.editor

    if (this.editor == 1) { // 是否为编辑
      this.form = this.row
      if (form['involvedIndustry'] != null || form['involvedIndustry'] != undefined) { this.form.industry = form['involvedIndustry'].split(',') }
      if (form['involvedBussyniss'] != null || form['involvedBussyniss'] != undefined) { this.form.bussyniss = form['involvedBussyniss'].split(',') }
      this.form.pbtime = new Date(this.row.publishTime)
      this.getinit(this.row.id)
    }

    this.loadTree()// 文件夹
    this.getDocList(this.searchInfo)
  },
  methods: {
    ...mapActions(['setTabsList']),
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
          var ids = []
          var taglist = []
          if (res.tags != null && res.tags.length > 0) {
            for (let j = 0; j < this.alltag.length; j++) {
              for (let i = 0; i < res.tags.length; i++) {
                if (res.tags[i].TAG_ID == this.alltag[j].id) {
                  taglist.push(this.alltag[j])
                  ids.push(this.alltag[j].id)
                }
              }
            }
          }
          this.selectedtag = taglist
          this.selectedtagid = ids
          this.guanlian = res.guanlianlist

          this.versiondoc = res.versionlist
        })
      })
    },

    async getDocList (params) {
      this.loading = true
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
    onSubmit () { // 保存
      var that = this
      var form = that.form
      var tags = that.selectedtagid
      var guanlian = this.guanlian
      var tagids = ''
      var guanliid = ''
      var versid = ''

      form['involvedIndustry'] = this.form.industry.join(',')
      form['involvedBussyniss'] = this.form.bussyniss.join(',')

      if (tags.length > 0) {
        for (let index = 0; index < tags.length; index++) {
          tagids += tags[index] + ','
        }
      }
      if (guanlian.length > 0) {
        for (let index = 0; index < this.guanlian.length; index++) {
          guanliid += (this.guanlian[index].id ? this.guanlian[index].id : this.guanlian[index].ID) + ','
        }
      }
      if (this.versiondoc.length > 0) {
        for (let index = 0; index < this.versiondoc.length; index++) {
          versid += (this.versiondoc[index].id ? this.versiondoc[index].id : this.versiondoc[index].ID) + ','
        }
      }
      if (this.selectefolderid.length == 0) {
        this.$message.warning('请选择文件目录') // 失败
        return
      }
      form['folderId'] = this.selectefolderid[this.selectefolderid.length - 1]
      form['tagids'] = tagids
      form['guanliid'] = guanliid
      form['versid'] = versid
      delete form.publishTime
      // form["folderId"]="id,id";
      that.$post('/epf-document/docdocumentinfo/savedocinfo', form).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
        }

        this.$bus.$emit('closeTabsItem', this.$route.name)
        let routerPath = '/libraryManage'
        let title = '文库管理'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push('/libraryManage')
        this.$bus.$emit('refreshAssembly')
      })
    },
    closeupload () {
      let that = this
      this.$bus.$emit('closeTabsItem', this.$route.name)
      let routerPath = '/libraryManage'
      let title = '文库管理'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push('/libraryManage')
      this.$bus.$emit('refreshAssembly')
    },
    guanliandelet (item) { this.guanlian.splice(this.guanlian.indexOf(item), 1) },
    versiondocdelet (item) { this.versiondoc.splice(this.versiondoc.indexOf(item), 1) },
    handleClosetag (tag) {
      this.selectedtagid.splice(this.selectedtagid.indexOf(tag.id), 1)
      this.selectedtag.splice(this.selectedtag.indexOf(tag), 1)
    },
    dialogCheckChange (selection) {
      if (this.dialogtype == 'guanlian') {
        this.guanlian = selection
      } else {
        this.versiondoc = selection
      }
    },
    loadTree () { // 获取文件
      var that = this
      this.loading = true
      that.$post('/epf-document/admin/docfolder/getAllFolderTree').then(res => {
        console.log('数返回', res.ztreeJson)
        that.forderdata = res.ztreeJson
        this.loading = false
      })
    },
    handleChange (value) {
      console.log(value)
      this.selectefolderid = value
    },
    async Addtagtreason () {
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
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
    handleEditt (index, row) {
      this.dlogTitle = '关联相关'
      this.folder = '个人收藏夹'
      this.dialogtype = 'guanlian'

      this.optPopup = true
      this.$refs.multipleTable.clearSelection()
    },
    handlEdition (index, row) {
      this.dlogTitle = '关联版本'
      this.folder = '政策法规'
      this.dialogtype = ''
      this.optPopup = true
      this.$refs.multipleTable.clearSelection()
    },
    AddFlowpatreason () {
      this.savetitle = '标签选择'
      this.Addtagtreason()
      this.dialogFormVisible = true
    },

    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm (tag) {
      if (this.selectedtag.length >= 6) {
        this.$message.warning('最多添加六条标签！')
        return
      } else {
        this.selectedtag.push(tag)
        this.selectedtagid.push(tag.id)
      }
    },
    annexUpload (files) { // 附件上传
      const file = files.file
      const formData = new FormData()

      formData.append('files', file)
      formData.append('belong', this.belong)
      if (this.editor == 1) {
        formData.append('id', this.form.id)
      }
      this.uploadFunction(formData, files, file)
    },
    uploadFunction (formData, files, file, count) { // 上传方法
      var _this = this
      _this.$useAppend('/epf-document/document/upload', formData).then(res => {
        console.log('res', res)
        if (res.state != 'SUCCESS') {
          return null
        }
        _this.form.id = res.data[0].id
        _this.form.name = res.data[0].name
        files.onSuccess(res)
      }).catch(error => {
        _this.$message.error('文件上传请求失败')
      })
    }
  }
}
</script>
<style scoped>
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  padding: 34px 22px;
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
<style scoped>
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
.relevance {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.relevance span {
  color: #3a8ee6;
}
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
.el-message-box__message {
  text-align: center;
  font-size: 20px;
}
.label {
  position: relative;
  overflow: auto;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  height: 40px;
  width: 100%;
}
.label i {
  position: absolute;
  top: 20%;
  right: 1%;
  font-size: 24px;
  color: #3a8ee6;
  cursor: pointer;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0 5px 5px 0;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
.collection .el-dialog {
  width: 30%;
}
.choice .el-select {
  display: block;
}
.primary_reset {
  width: 88px;
  height: 40px;
  border-radius: 2px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #50a5f4;
  color: #50a5f4;
  background: rgba(233, 243, 255, 1);
  border: none;
  margin-right: 15px;
}
.primary_search {
  width: 88px;
  height: 40px;
  border-radius: 2px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #2b95f7;
  color: #ffffff;
  background-color: #2b95f7;
  margin-left: 0px;
}
</style>
