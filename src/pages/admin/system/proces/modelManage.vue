<template>
  <div id="modalManage">
    <el-container>
      <el-main style="margin-left:15px;padding-top:10px;padding-right:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">
            <div style="float:left">流程模型列表</div>
          </el-header>
          <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
            <el-button size="mini"
                       @click="showAddModel()">新增</el-button>
          </div>
          <el-main :style="{'height':menuInfoListHeight + 'px','paddingTop':'0px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">

            <el-table :data="modalData"
                      border
                      style="width: 100%"
                      v-loading="loading"
                      element-loading-text="数据加载中"
                      element-loading-background="rgba(255, 255, 255,0.95)">
              <el-table-column prop="id"
                               label="模型编号"
                               min-width="100"></el-table-column>
              <el-table-column prop="name"
                               label="模型名称"
                               min-width="100"> </el-table-column>
              <el-table-column prop="key"
                               label="key"
                               min-width="100"></el-table-column>
              <el-table-column prop="version"
                               label="版本号"></el-table-column>
              <el-table-column prop="createTime"
                               label="创建时间"
                               min-width="100"></el-table-column>
              <el-table-column prop="lastUpdateTime"
                               label="更新时间"
                               min-width="100"></el-table-column>
              <el-table-column prop="deploymentId"
                               label="部署ID"
                               min-width="100"></el-table-column>
              <el-table-column label="操作"
                               min-width="100">
                <template slot-scope="scope">
                  <el-button type="text"
                             icon="el-icon-edit"
                             size="small"
                             @click="editModel(scope.row)">编辑</el-button>
                  <el-button type="text"
                             icon="el-icon-delete"
                             size="small"
                             @click="deleteModel(scope.row)">删除</el-button>
                  <el-button type="text"
                             class="el-icon-share"
                             size="small"
                             @click="deployModel(scope.row)">部署</el-button>
                </template>
              </el-table-column>
            </el-table>
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
    <!-- 对话框-begin -->
    <el-dialog title="编辑"
               fullscreen="fullscreen"
               :visible.sync="dialogVisible"
               width="100%">
      <span style="float:right;margin-bottom:10px;">
        <el-button @click="dialogVisible = false">关 闭</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
      <div>
        <iframe :src="modelSrc"
                id="show-iframe"
                frameborder="0"
                name="showHere"
                scrolling="auto"
                height="750px"
                width="100%"></iframe>
      </div>
    </el-dialog>
    <el-dialog title="创建"
               :visible.sync="createDialogVisible"
               width="30%">

      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="模型名称">
          <el-input v-model="form.name"
                    :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="模型描述">
          <el-input type="textarea"
                    v-model="form.description"
                    :maxlength="200"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addModel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 对话框-end -->
  </div>
</template>

<script>
import configApi from '../../../../../config/index'
import qs from 'qs'
let id = 1000
export default {
  name: 'procesManage',
  data () {
    return {
      modalData: [],
      loading: true,
      menuInfoListHeight: '',
      dialogVisible: false,
      createDialogVisible: false,
      fullscreen: true,
      modelSrc: '',
      model: {
        id: ''
      },
      form: {
        name: '',
        description: ''
      },
      pageNo: 1,
      totalRecord: 1,
      pageSize: 10,

      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: ''
    }
  },

  created () {
    this.loading = true
    this.menuInfoListHeight = window.innerHeight - 261
    this.buttons = JSON.parse(localStorage.getItem('infoMenuManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')
    this.$get('/epf-activiti/act/model/list?rows=' + this.pageSize + '&page=' + this.pageNo).then(res => {
      this.modalData = res.pager.results
      this.totalRecord = res.pager.totalRecord
      this.loading = false
    })
    // this.menuListHeight = window.innerHeight - 261;
  },
  methods: {
    reload () {
      this.loading = true
      this.$get('/epf-activiti/act/model/list?rows=' + this.pageSize + '&page=' + this.pageNo).then(res => {
        this.modalData = res.pager.results
        this.totalRecord = res.pager.totalRecord
        this.loading = false
      })
    },
    showAddModel () {
      this.form = {}
      this.createDialogVisible = true
    },
    addModel () {
      if (this.form.name == '' || this.form.name == null) {
        this.$message.warning('输入框不能为空！')
        return
      }
      this.$post('/epf-activiti/act/model/createModel', { name: this.form.name, description: this.form.description }).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }

        this.createDialogVisible = false
        this.model.id = res.id
        this.editModel(this.model)
      })
    },
    editModel (model) {
      var baseURL1 = configApi.dev.proxyTable['/api'].target// 仅限于开发环境，生产环境需要调整下
      this.modelSrc = baseURL1 + '/epf-activiti/activiti/modeler.html?modelId=' + model.id + '&random=' + Math.random() * 10
      this.dialogVisible = true
      this.reload() // 刷新页面
    },
    deleteModel (model) {
      this.$confirm('确认要删除信息吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        // type: 'warning',
        center: true
      }).then(() => {
        this.$post('/epf-activiti/act/model/deleteModel', { id: model.id }).then(res => {
          if (res.code != '0') {
            // 失败
            this.$message.error(res.msg)
            return
          }
          this.$message.success('删除成功')
          this.reload() // 刷新页面
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    deployModel (model) {
      this.$post('/epf-activiti/act/model/deployModel', { id: model.id }).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.reload() // 刷新页面
      })
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.reload()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.reload()
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
  height: 300px;
  background: rgb(255, 213, 213);
  overflow-y: auto;
}

.el-button--warning {
  color: #fff;
  background-color: #ffa202 !important;
  border-color: #ffa202 !important;
}
</style>
<style>
.orgManange_List .el-tree-node__content {
  margin-bottom: 5px;
}
</style>

