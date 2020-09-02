<template>
  <div id="infoManage">
    <el-container>
      <el-aside width="200px">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">内容分组</el-header>
          <!-- <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);"><el-button size="mini" @click="addLevelOne">添加</el-button></div> -->
          <el-main :style="{'height':menuInfoListHeight + 'px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
            <el-tree v-loading="treeloading"
                     element-loading-text="数据加载中"
                     element-loading-background="rgba(255, 255, 255,0.95)"
                     :data="data4"
                     :props="defaultProps"
                     node-key="id"
                     :expand-on-click-node="false"
                     class="menuManage_List"
                     @node-click="nodeClick">
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-main style="margin-left:15px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">
            <div style="float:left;">内容列表</div>
            <div v-for="(button ,index)  in buttons"
                 :key="index"
                 style="float:right;">
              <el-button v-if="button.resourceId=='info_add'&&showAdd"
                         style="float:right;margin-top:4px;"
                         @click="addInfo"
                         size="mini"
                         icon="el-icon-plus">添加</el-button>
            </div>
          </el-header>
          <el-main id="infoManageMain"
                   :style="{'height':menuInfoListHeight + 'px','paddingTop':'0px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">

            <el-table v-loading="loading"
                      element-loading-text="数据加载中"
                      element-loading-background="rgba(255, 255, 255,0.95)"
                      :data="infoData"
                      border
                      style="width: 100%">
              <el-table-column prop="title"
                               label="标题"
                               min-width="250">
              </el-table-column>
              <el-table-column prop="fromWhere"
                               label="信息来源">
              </el-table-column>
              <el-table-column prop="creatorName"
                               label="创建人">
                <!-- </el-table-column>
                         <el-table-column
                        prop="readCount"
                        label="访问次数"
                       > -->
              </el-table-column>
              <el-table-column prop="pubTime"
                               label="发布时间">
              </el-table-column>
              <el-table-column prop="statusName"
                               label="发布状态">
              </el-table-column>
              <el-table-column label="操作"
                               min-width="150">
                <template slot-scope="scope">
                  <span v-for="(button ,index)  in buttons"
                        :key="index">
                    <el-button v-if="button.resourceId=='info_view'"
                               type="text"
                               size="small"
                               @click="viewInfo(scope.row)">查看</el-button>
                    <el-button v-if="button.resourceId=='info_edit'"
                               type="text"
                               size="small"
                               @click="editInfo(scope.row)">编辑</el-button>
                    <el-button v-if="button.resourceId=='info_delete'"
                               type="text"
                               size="small"
                               @click="deleteInfo(scope.row)">删除</el-button>
                    <el-button v-if="button.resourceId=='info_send' && scope.row.examineState!=5"
                               type="text"
                               size="small"
                               @click="publicInfo(scope.$index)">取消发布</el-button>
                    <el-button v-if="button.resourceId=='info_send' && scope.row.examineState==5"
                               type="text"
                               size="small"
                               @click="publicInfo(scope.$index)">发布</el-button>
                  </span>
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
    <el-dialog title="详情"
               :visible.sync="dialogVisible"
               :before-close="handleClose"
               fullscreen
               lock-scroll
               width="80%">
      <div class="app-container calendar-list-container">
        <div style="margin:0 5%; width: 90%;">
          <editor class="editor"
                  :info="info"
                  :isViewHtml='isViewHtml'
                  @saveInfo="saveInfo"
                  @saveCancel="saveCancel">
          </editor>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import editor from './editor/editor'

let id = 1000
export default {
  name: 'infoManage',
  data () {
    return {
      showAdd: false, // 默认隐藏添加按钮
      info: {}, // 富文本编辑器双向绑定的内容
      isViewHtml: true, // 默认编辑
      data4: [],
      treeloading: true,
      infoData: [],
      defaultProps: {
        children: 'childInfoMenu',
        label: 'name'
      },
      newName: '1',
      form: {
        menuname: '',
        resourceId: '',
        url: '',
        state: '',
        startType: false,
        menuType: '',
        permissCode: '',
        rank: 1,
        parentMenu: '',
        iconCls: ''
      },
      menuInfoListHeight: 100,
      dialogVisible: false,
      currentNode: '',
      currentData: '',
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      tableData1: [],
      infoMenuId: '',
      needParams: ['menuname', 'resourceId', 'url', 'state', 'startType', 'menuType', 'permissCode', 'rank', 'iconCls', 'parentId', 'id'],

      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',
      loading: false,
      OperateState: ''
    }
  },
  components: { // 引入组件
    editor
  },
  created () {
    this.menuInfoListHeight = window.innerHeight - 261
    this.buttons = JSON.parse(localStorage.getItem('infoManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')
    console.log(this.buttons)
    this.$get('/epf-cms/admin/infomenu/getInfoMenuList').then(res => {
      this.data4 = res.infoMenus
      this.treeloading = false
    })
  },
  methods: {
    saveCancel () {
      this.dialogVisible = false
    },
    deleteInfo (data) {
      this.$confirm('确认要删除信息吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        // type: 'warning',
        center: true
      }).then(() => {
        this.$post('/epf-cms/admin/info/deleteInfo', { id: data.id }).then(res => {
          if (res.code != '0') {
            // 失败
            this.$message.error(res.msg)
            return
          }
          this.OperateState = '删除'
          this.$message.success(this.OperateState + '成功')
          this.getInfoManage(this.searchInfo)
        })
      }).catch(() => {
        that.$message({ type: 'info', message: '已取消删除' })
      })
    },
    testInfo (path) {
      console.log('path=', path)
    },
    publicInfo (data) {
      let myData = this.infoData[data]
      console.log('path:==' + myData.path)
      if (myData.examineState == '5') {
        this.OperateState = '发布'
      } else {
        this.OperateState = '取消'
      }
      this.$post('/epf-cms/admin/info/editInfo2', myData).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }
        this.dialogVisible = false
        this.$message.success(this.OperateState + '成功')
        this.getInfoManage(this.searchInfo)
      })
    },
    saveInfo (data) {
      this.$post('/epf-cms/admin/info/editInfo', data).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }
        this.dialogVisible = false
        console.log('保存按钮 res.msg ==== ', res)

        // bug724- 对操作状态中的编辑、删除、发布的成功提示做纠正
        if (this.OperateState == '编辑') {
          // this.$message.success(this.OperateState+res.status0);
          this.$message.success(this.OperateState + '成功')
        } else {
          this.$message.success('新增成功！')
        }

        this.getInfoManage(this.searchInfo)
      })
    },
    addInfo () { // 添加新闻
      this.info = { content: '', id: '', infoMenuCode: '' }
      this.info.infoMenuCode = this.infoMenuCode
      this.isViewHtml = false
      this.dialogVisible = true
    },
    editInfo (data) { // 编辑新闻
      this.$get('/epf-cms/admin/info/getInfo', { id: data.id }).then(res => {
        console.log('编辑按钮--->>> 返回', res)
        this.info = res.info
        this.isViewHtml = false
        this.dialogVisible = true
        this.OperateState = '编辑'
      }).catch(res => {
        this.$message.warning(res.msg)
      })
    },
    viewInfo (data) { // 预览新闻
      this.$get('/epf-cms/admin/info/getInfo', { id: data.id }).then(res => {
        console.log('这是田湘' + res)
        this.info = res.info
        this.isViewHtml = true
        this.dialogVisible = true
      }).catch(res => {
        this.$message.warning(res.msg)
      })
    },

    nodeClick (data) {
      let childInfoMenu = data.childInfoMenu
      let pId = data.pId
      if (data.childInfoMenu.length == 0 && data.pId != '0') {
        this.showAdd = true
        this.searchInfo['infoMenuCode'] = data.id
        this.searchInfo['page'] = 1
        this.searchInfo['rows'] = this.pageSize
        this.infoMenuCode = data.id
        this.getInfoManage(this.searchInfo)
      } else {
        this.showAdd = false
      }
    },
    getInfoManage (params) {
      this.loading = true
      params['infoMenuCode'] = this.infoMenuCode
      this.$get('/epf-cms/admin/info/getInfoJson', params).then(res => {
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.infoData = res.pager.results
        this.loading = false
      }).catch(res => {
        this.$message.warning(res.msg)
      })
    },
    getMenuInfo (node, data) {
      this.currentNode = node
      this.currentData = data
      this.form = data
      this.form.parentMenu = node.parent.label
      this.form.parentId = node.parent.key
    },
    handleClose (done) {
      // 隐藏dialog
      this.dialogVisible = false
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getInfoManage(this.searchInfo)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.pageSize
      this.getInfoManage(this.searchInfo)
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
</style>
<style>
#infoManageMain .el-loading-mask {
  z-index: 1009 !important;
}
.menuManage_List .el-tree-node__content {
  margin-bottom: 5px;
}
.el-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 1010 !important;
}
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 1000 !important;
}

/*对分辨率过大的图片作缩放处理 bug714*/
.calendar-list-container img {
  width: 100%;
  height: auto;
}
</style>

