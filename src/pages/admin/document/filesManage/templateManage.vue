<template>
  <el-container style="padding:10px;">
    <!-- 左边树形结构 -->
    <el-aside width="280px">
      <div class="panel-heading"
           :style="{background:theme_BackgroundColor,color:theme_TextColor}">区域
      </div>
      <el-tree :data="data4"
               v-loading="loading"
               element-loading-text="数据加载中"
               element-loading-background="rgba(255, 255, 255,0.95)"
               :props="defaultProps"
               class="overflowContent"
               node-key="id"
               :style="{'height':menuListHeight + 'px','border':'1px solid rgb(214, 211, 211)',}"
               @node-click="handleNodeClick"
               :expand-on-click-node="false">
      </el-tree>
    </el-aside>
    <!-- 中间模板管理区域 -->
    <el-aside width="350px"
              style="margin-left:1%;">
      <div class="panel-heading"
           :style="{background:theme_BackgroundColor,color:theme_TextColor}">模板</div>
      <div style="padding: 6px 22px; background: rgb(224, 224, 224);overflow: auto;">
        <el-button size="small"
                   class="btn-sty"
                   style="float:left;margin-left:5px;"
                   @click="deleteTemp">删除</el-button>
        <el-button size="small"
                   class="btn-sty"
                   style="float:left;margin-left:5px;"
                   @click="isEdit">修改</el-button>
        <el-button size="small"
                   class="btn-sty"
                   style="float:left;"
                   @click="isAddChild">添加子节点</el-button>
        <el-button size="small"
                   class="btn-sty"
                   style="float:left;"
                   @click="isAdd">新建</el-button>
      </div>
      <el-tree :data="templates"
               :props="defaultProps1"
               node-key="id"
               v-loading="loading"
               element-loading-text="数据加载中"
               element-loading-background="rgba(255, 255, 255,0.95)"
               class="overflowContent"
               :style="{'height':menuListHeight - 35 + 'px','border':'1px solid rgb(214, 211, 211)',}"
               @node-click="handleNodeClick1"
               :expand-on-click-node="false">
      </el-tree>
      <!-- 添加模板 -->
      <el-dialog title="添加模板"
                 :visible.sync="dialogAddTemp">
        <el-form :model="temp"
                 ref="insertForm">
          <el-form-item label="模板标识"
                        prop="code"
                        :label-width="formLabelWidth">
            <el-input v-model="temp.code"
                      auto-complete="off"
                      :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="模板名称"
                        prop="templeteName"
                        :label-width="formLabelWidth">
            <el-input v-model="temp.templeteName"
                      auto-complete="off"
                      :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="是否为条件模板"
                        prop="isCondition"
                        :label-width="formLabelWidth">
            <el-select v-model="temp.isCondition"
                       placeholder="请选择"
                       auto-complete="off"
                       @change="getIsCondition(temp.isCondition)">
              <el-option label="否"
                         value="0"
                         selected="selected">否</el-option>
              <el-option label="是"
                         value="1">是</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="条件值"
                        prop="conditionValue"
                        :label-width="formLabelWidth"
                        v-show="isShow">
            <el-input v-model="temp.conditionValue"
                      auto-complete="off"
                      :maxlength="20"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogAddTemp = false">取 消</el-button>
          <el-button type="primary"
                     @click="insert">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加子节点 -->
      <el-dialog title="添加子节点"
                 :visible.sync="dialogAddChildTemp">
        <el-form :model="temp"
                 ref="insertChilds">
          <el-form-item label="父节点"
                        :label-width="formLabelWidth">
            <el-input v-model="parentName"
                      :readonly="true"
                      auto-complete="off"
                      :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="模板标识"
                        prop="code"
                        :label-width="formLabelWidth">
            <el-input v-model="temp.code"
                      auto-complete="off"
                      :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="模板名称"
                        prop="templeteName"
                        :label-width="formLabelWidth">
            <el-input v-model="temp.templeteName"
                      auto-complete="off"
                      :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="是否为条件模板"
                        prop="isCondition"
                        :label-width="formLabelWidth"
                        style="margin-left:40px;float: left;width: 40%">
            <el-select v-model="temp.isCondition"
                       placeholder="请选择"
                       auto-complete="off"
                       @change="getIsCondition(temp.isCondition)">
              <el-option label="否"
                         value="0"
                         selected="selected">否</el-option>
              <el-option label="是"
                         value="1">是</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否必传"
                        prop="isAux"
                        :label-width="formLabelWidth"
                        style="margin-left:5px;float: left;width: 55%">
            <el-select v-model="temp.isAux"
                       placeholder="请选择"
                       auto-complete="off"
                       style="width: 100%">
              <el-option label="否"
                         value="0"
                         selected="selected">否</el-option>
              <el-option label="是"
                         value="1">是</el-option>
            </el-select>
          </el-form-item>
          <div style="clear:both" />

          <el-form-item label="条件值"
                        prop="conditionValue"
                        :label-width="formLabelWidth"
                        v-show="isShow">
            <el-input v-model="temp.conditionValue"
                      auto-complete="off"
                      :maxlength="20"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogAddChildTemp = false">取 消</el-button>
          <el-button type="primary"
                     @click="insertChild">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑模板节点 -->
      <el-dialog title="节点编辑"
                 :visible.sync="dialogEditTemp">
        <el-form :model="temp1"
                 ref="editorForm">
          <el-form-item label="模板标识"
                        prop="code"
                        :label-width="formLabelWidth">
            <el-input v-model="temp1.code"
                      :readonly="true"
                      auto-complete="off"
                      :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="模板名称"
                        prop="templeteName"
                        :label-width="formLabelWidth">
            <el-input v-model="temp1.templeteName"
                      auto-complete="off"
                      :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="是否为条件模板"
                        prop="isCondition"
                        :label-width="formLabelWidth"
                        style="margin-left:40px;float: left;width: 40%">
            <el-select v-model="temp1.isConditionName"
                       placeholder="请选择"
                       auto-complete="off"
                       disabled="true">
              <el-option label="否"
                         value="0"
                         selected="selected">否</el-option>
              <el-option label="是"
                         value="1">是</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否必传"
                        prop="isAux"
                        :label-width="formLabelWidth"
                        style="margin-left:5px;float: left;width: 55%">
            <el-select v-model="temp1.isAux"
                       placeholder="请选择"
                       auto-complete="off"
                       style="width: 100%">
              <el-option label="否"
                         value="0"
                         selected="selected">否</el-option>
              <el-option label="是"
                         value="1">是</el-option>
            </el-select>
          </el-form-item>
          <div style="clear:both" />

          <el-form-item label="条件值"
                        prop="conditionValue"
                        :label-width="formLabelWidth"
                        v-show="isShow">
            <el-input v-model="temp1.conditionValue"
                      auto-complete="off"
                      :maxlength="20"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogEditTemp = false">取 消</el-button>
          <el-button type="primary"
                     @click="editTemp">确 定</el-button>
        </div>
      </el-dialog>

    </el-aside>
    <!-- 右边主要内容区 -->
    <el-main style="margin-left:1%;">
      <div class="panel-heading"
           :style="{background:theme_BackgroundColor,color:theme_TextColor}">模板文件</div>
      <div style="padding: 6px 22px; background: rgb(224, 224, 224);">
        <el-upload class="upload-demo"
                   action="http://epf3.cross.echosite.cn/epf-document/document/upload/"
                   :http-request="uploadFile"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   v-show="false"
                   list-type="picture">
          <el-button size="small"
                     class="btn-sty"
                     v-show="false"
                     id="pictureFile"></el-button>
        </el-upload>
        <el-button size="small"
                   class="btn-sty"
                   @click="updateFile">上传</el-button>
      </div>
      <div :style="{'height':menuListHeight - 35 + 'px',}"
           class="overflowContent"
           v-loading="loading2"
           element-loading-text="数据加载中"
           element-loading-background="rgba(255, 255, 255,0.95)">
        <el-table :data="fileList"
                  :height='menuListHeight-35'>
          <el-table-column property="name"
                           min-width="240px"
                           label="附件名称">
          </el-table-column>
          <el-table-column property="docSize"
                           min-width="120px"
                           label="附件大小(kb)">
          </el-table-column>
          <el-table-column property="extName"
                           min-width="100px"
                           label="附件类型">
          </el-table-column>
          <el-table-column property=""
                           min-width="120px"
                           label="操作"
                           fixed="right">
            <template slot-scope="scope">
              <span>
                <el-button size="small"
                           @click="downloadfile(scope.row.id)">下载</el-button>
              </span>
              <span>
                <el-button size="small"
                           @click="removeFile(scope.row.id)">删除</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
let id = 1000
import qs from 'qs'
import axios from 'axios'
export default {
  name: 'templateManage',
  data () {
    return {
      menuListHeight: 100,
      data4: [],
      defaultProps: {
        children: 'children',
        label: 'zhCn',
        id: 'dictKey'
      },
      dialogAddTemp: false,
      areaCode: '',
      formLabelWidth: '120px',
      temp: {
        code: '',
        templeteName: '',
        isCondition: '0',
        conditionValue: ''
      },
      temp1: {
        code: '',
        templeteName: '',
        isConditionName: '',
        conditionValue: ''
      },
      templates: [],
      defaultProps1: {
        children: 'children',
        label: 'name'
      },
      parentId: '',
      parentName: '',
      dialogAddChildTemp: false,
      dialogEditTemp: false,
      dialogUpload: false,
      fileList: [],
      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',
      loading: true,
      loading2: false,
      isShow: false
    }
  },
  mounted () {
    let that = this
    this.loading = true
    this.$get('/epf-admin/admin/regionals/getAreasByCode').then(res => {
      if (res.code === 0) {
        that.data4 = JSON.parse(res.areas)
        this.loading = false
      }
    })
    this.$bus.$on('themChange', val => {
      this.theme_BackgroundColor = val.menuBackgroundColor
      this.theme_TextColor = val.textColor
    })
  },
  created () {
    this.menuListHeight = window.innerHeight - 240
    this.buttons = JSON.parse(localStorage.getItem('groupTable'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')
    this.isShow = false
  },
  methods: {
    updateFile () {
      document.getElementById('pictureFile').click()
    },
    append (data) {
      const newChild = { id: id++, label: '', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    addTemp (node, data) {
      data.label = document.getElementById(node.id + 'Name').value
      let template = { templeteName: data.label, code: node.parent.data.id }
      this.$post('/epf-document/docTemplete/save', template).then(res => {
        console.log(res)
      })
    },

    getIsCondition (isCondition) {
      if (isCondition == 0) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },

    handleNodeClick (data) {
      this.areaCode = data.dictKey
      this.getTempList(this.areaCode)
    },

    getTempList (areaCode) {
      // this.loading = true;
      let para = { areaCode: areaCode }
      this.$get('/epf-document/docTemplete/getTempleteTree', para).then(res => {
        this.templates = JSON.parse(res.ztreeAllJson)
        // this.loading = false;
      })
    },

    isAdd () {
      let areaCode = this.areaCode
      if (areaCode == '') {
        this.$message.warning('请指定区域！')
      } else {
        this.dialogAddTemp = true
      }
    },

    isAddChild () {
      let pid = this.parentId
      if (pid == '') {
        this.$message.warning('请指定父节点！')
      } else {
        this.getTemp()
        this.dialogAddChildTemp = true
      }
    },

    insert () {
      this.temp.areaCode = this.areaCode
      this.$post('/epf-document/docTemplete/save', this.temp).then(res => {
        if (res.code != '0') {
          this.$message.warning('保存失败')
          this.dialogAddTemp = false
          this.getTempList(this.areaCode)
          this.$refs['insertForm'].resetFields()
          return
        }
        this.$message.success('保存成功')
        this.dialogAddTemp = false
        this.getTempList(this.areaCode)
        this.$refs['insertForm'].resetFields()
      })
    },

    insertChild () {
      this.temp.pId = this.parentId
      this.$post('/epf-document/docTemplete/save', this.temp).then(res => {
        if (res.code != '0') {
          this.$message.warning('保存失败')
          this.dialogEditTemp = false
          this.getTempList(this.areaCode)
          this.$refs['insertChilds'].resetFields()
          return
        }
        this.$message.success('保存成功')
        this.dialogAddChildTemp = false
        this.getTempList(this.areaCode)
        this.$refs['insertChilds'].resetFields()
      })
    },

    getTemp () {
      let para = { id: this.parentId }
      this.$get('/epf-document/docTemplete/getInfo', para).then(res => {
        this.parentName = res.docTemplete.templeteName
        this.temp1 = res.docTemplete
        if (res.docTemplete.isCondition == 0) {
          this.isShow = false
          this.temp1.isConditionName = '否'
        } else {
          this.isShow = true
          this.temp1.isConditionName = '是'
        }
      })
    },

    isEdit () {
      let id = this.parentId
      if (id == '') {
        this.$message.warning('请选择需要编辑的数据！')
      } else {
        this.getTemp()
        this.dialogEditTemp = true
      }
    },

    editTemp () {
      this.$post('/epf-document/docTemplete/update', this.temp1).then(res => {
        if (res.code != '0') {
          this.dialogEditTemp = false
          this.$message.warning('保存失败')
          this.getTempList(this.areaCode)
          this.$refs['editorForm'].resetFields()
          return
        }
        this.$message.success('保存成功')
        this.dialogEditTemp = false
        this.getTempList(this.areaCode)
        this.$refs['editorForm'].resetFields()
      })
    },

    deleteTemp () {
      let id = this.parentId
      if (id == '') {
        this.$message.warning('请选择需要编辑的数据！')
        return
      }
      let deleparam = { id: id }
      this.$confirm('确认要删除信息吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        // type: 'warning',
        center: true
      })
        .then(() => {
          this.$post('/epf-document/docTemplete/delete', deleparam).then(
            res => {
              if (res.code != '0') {
                this.$message.warning('删除失败')
                this.getTempList(this.areaCode)
                return
              }
              this.$message.success('删除成功')
              this.getTempList(this.areaCode)
            }
          )
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },

    handleNodeClick1 (data) {
      this.parentId = data.id
      this.queryFiles(data.id)
    },

    queryFiles (id) {
      this.loading2 = true
      let that = this
      let para = { id: id, belong: '', code: '' }
      this.$get('/epf-document/docTemplete/getFilesByGropuId', para).then(
        res => {
          that.fileList = res.files
          that.loading2 = false
        }
      )
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
    },

    handlePreview (file) {
      console.log(file)
    },

    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
        files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },

    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 上传附件
    uploadFile (files) {
      if (this.areaCode == '') {
        this.$message.warning('上传失败，请先选择区域')
        // this.$refs.up.abort(files.file);
        // this.$refs.up.clearFiles();
        // files.file.clearFiles();
        return
      }
      if (this.parentId == '') {
        this.$message.warning('上传失败，请先选择模板')
        return
      }
      const file = files.file
      const formData = new FormData()
      formData.append('files', file)
      formData.append('belong', '')
      formData.append('fdId', this.parentId)
      formData.append('pId', this.parentId)
      this.upload(formData, files, file)
    },

    upload (formData, files, file) {
      let that = this
      this.$useAppend('/epf-document/document/upload', formData).then(
        res => {
          if (res.state == 'error') {
            files.onError()
            return null
          }
          that.fileList.push(file)
          files.onSuccess(res)
          that.queryFiles(that.parentId)
        },
        function (event) {
          // 进度条
          file.percent = event.loaded / event.total * 100
          files.onProgress(file)
        }
      )
    },
    // 删除附件
    removeFile (id) {
      let that = this
      let url
        = '/epf-document/document/deleteByFolder?id='
        + id
        + '&fdId='
        + this.parentId
      this.$confirm('确认要删除信息吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        // type: 'warning',
        center: true
      })
        .then(() => {
          this.$post(url, {}).then(res => {
            if (res.state != 'SUCCESS') {
              that.$message.warning(res.msg)
              return
            }
            that.$message.success(res.msg)
            that.queryFiles(this.parentId)
          })
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    downloadfile (id) {
      window.open(this.$urlConfig.common.imageUrl + id)
      // var that=this
      // that.$get('/epf-document/document/downloadById',{id:id}).then(res => {
      //     console.log(res)

      // });
    }
  }
}
</script>
<style <style lang="scss" scoped>
.panel-heading {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 30px;
  background: rgb(50, 58, 64);
  color: #fff;
  font-size: 16px;
}
.overflowContent {
  overflow: auto;
}
.btn-sty {
  padding: 6px 10px;
}
.el-button--small,
.el-button--small.is-round {
  padding: 5px 10px;
}
input[type="file"] {
  display: none;
}
</style>
