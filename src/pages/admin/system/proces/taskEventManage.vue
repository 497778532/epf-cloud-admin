<template>
  <div id="taskEventManage">
    <el-container>
      <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                 class="m_title">
        <div style="float:left">流程事件列表</div>
      </el-header>
      <el-main :style="{'height':menuListHeight + 'px','paddingTop':'0px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
        <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
          <el-button size="mini"
                     @click="addevent">新增</el-button>
          <el-button size="mini"
                     @click="editevent">修改</el-button>
          <el-button size="mini"
                     @click="deleteevent">删除</el-button>
        </div>

        <el-table ref="multipleTable"
                  :data="eventData"
                  border
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  @row-click="clickselectrow">
          <el-table-column fixed
                           type="selection"
                           width="50"></el-table-column>
          <el-table-column fixed
                           prop="name"
                           label="名称"
                           min-width="100"></el-table-column>
          <el-table-column prop="code"
                           label="唯一编码"
                           min-width="100"> </el-table-column>
          <el-table-column prop="classPath"
                           label="Bean类名"
                           min-width="100"></el-table-column>
          <el-table-column prop="method"
                           label="方法"> </el-table-column>
          <el-table-column prop="params"
                           label="参数"
                           min-width="100"></el-table-column>

        </el-table>

      </el-main>
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
    </el-container>

    <el-dialog :title="savetitle"
               :visible.sync="dialogFormVisible"
               width="500px">
      <el-form :model="singleevent">
        <el-form-item label='名称'
                      :label-width="formLabelWidth"
                      :rules="[{required: true}]">
          <el-input v-model="singleevent.name"
                    auto-complete="off"
                    style="width:300px;"
                    :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label='唯一编码'
                      :label-width="formLabelWidth"
                      :rules="[{required: true}]">
          <el-input v-model="singleevent.code"
                    auto-complete="off"
                    :disabled='add'
                    style="width:300px;"
                    :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label='Bean类名'
                      :label-width="formLabelWidth"
                      :rules="[{required: true}]">
          <el-input v-model="singleevent.classPath"
                    auto-complete="off"
                    style="width:300px;"
                    :maxlength="50"></el-input>
        </el-form-item>

        <el-form-item label='方法'
                      :label-width="formLabelWidth"
                      prop="method">
          <el-input v-model="singleevent.method"
                    auto-complete="off"
                    style="width:300px;"
                    :rules="[{required: true}]"
                    :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label='参数'
                      :label-width="formLabelWidth"
                      prop="params">
          <el-input type="textarea"
                    v-model="singleevent.params"
                    auto-complete="off"
                    style="width:300px;"
                    :maxlength="200"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="saveinfo">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

let id = 1000
export default {
  name: 'taskEventManage',
  data () {
    return {

      eventData: [],
      singleevent: {}, // 单个
      savetitle: '新增',

      selectGroups: [],
      pageNo: 1,
      totalRecord: 1,
      pageSize: 10,
      loading: false,
      dialogFormVisible: false,
      add: false,
      menuListHeight: 100,
      formLabelWidth: '100px',
      filters: {},

      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: ''

    }
  },
  mounted () {
    var that = this
  },
  created () {
    this.menuListHeight = window.innerHeight - 261
    this.buttons = JSON.parse(localStorage.getItem('procesManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')
    this.querylistdata()
  },
  methods: {
    saveinfo () {
      var that = this

      if (!this.singleevent.name) {
        this.$message.warning('名称不能为空！')
        return false
      }
      if (!this.singleevent.code) {
        this.$message.warning('唯一编码不能为空！')
        return false
      }
      if (!this.singleevent.classPath) {
        this.$message.warning('Bean类名不能为空！')
        return false
      }
      this.$post('/epf-activiti/admin/taskevent/addTaskEvent', that.singleevent).then(res => {
        if (res.code != 0) {
          that.$message.warning('保存失败！')
          return false
        }

        that.$message.success('保存成功！')
        that.dialogFormVisible = false
        that.querylistdata()
        this.loading = false
      })
    },
    querylistdata () {
      var that = this
      this.loading = true
      this.$post('/epf-activiti/admin/taskevent/getTaskEventJson', { page: this.pageNo, rows: this.pageSize, filters: this.filters }).then(res => {
        this.eventData = res.pager.results
        this.totalRecord = res.pager.totalRecord
        this.loading = false
      })
    },
    addevent () {
      var that = this
      that.savetitle = '新增'
      that.add = false
      that.singleevent = {}
      that.dialogFormVisible = true
    },
    editevent () {
      var that = this
      that.savetitle = '修改'
      if (that.selectGroups.length != 1) {
        that.$message.warning('请选择一条数据！')
        return
      }
      // that.singleevent=that.selectGroups[0];
      let temp = { 'name': '', 'code': '', 'method': '', 'classPath': '', 'params': '', 'id': '', 'state': '' }
      temp.name = that.selectGroups[0].name
      temp.code = that.selectGroups[0].code
      temp.method = that.selectGroups[0].method
      temp.classPath = that.selectGroups[0].classPath
      temp.params = that.selectGroups[0].params
      temp.id = that.selectGroups[0].id
      temp.state = that.selectGroups[0].state
      that.singleevent = temp
      that.add = true
      that.dialogFormVisible = true
    },
    clickselectrow (row, column, event) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },

    deleteevent () {
      var that = this
      let ids = ''
      if (that.selectGroups.length < 1) {
        that.$message.warning('请选择要删除的数据！')
        return
      } else {
        for (var i = 0; i < this.selectGroups.length; i++) {
          if (i == 0) {
            ids += this.selectGroups[i].id
          } else {
            ids += ',' + this.selectGroups[i].id
          }
        }
        console.log(ids)
      }

      that.$confirm('确认要删除信息吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        // type: 'warning',
        center: true
      }).then(() => {
        that.$post('/epf-activiti/admin/taskevent/deleteTaskEvent', { id: ids }).then(res => {
          if (res.code != '0') {
            that.$message({ type: 'faill', message: '删除失败!' })
            return
          }

          that.$message({ type: 'success', message: '删除成功!' })
          that.querylistdata()
        })
      }).catch(() => {
        that.$message({ type: 'info', message: '已取消删除' })
      })
    },
    viewInfo (obj) {

    },
    handleSelectionChange (val) {
      this.selectGroups = val
    },
    handleCurrentChange (val) {
      var that = this
      that.pageNo = val
      that.querylistdata()
    },
    handleSizeChange (val) {
      var that = this
      that.pageSize = val
      that.querylistdata()
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

