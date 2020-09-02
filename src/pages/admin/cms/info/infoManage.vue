<template>
    <div id="infoManage">
        <el-container>
            <el-aside width="200px">
                <el-container>
                <el-header class="m_title">内容分组</el-header>
                <!-- <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);"><el-button size="mini" @click="addLevelOne">添加</el-button></div> -->
                <el-main :style="{'height':menuInfoListHeight + 'px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
                    <el-tree
                    v-loading="treeloading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    :data="data4"
                    :props="defaultProps"
                    node-key="id"
                    :expand-on-click-node="false"
                    class="menuManage_List"
                    @node-click="nodeClick" >
                    </el-tree>
                </el-main>
                </el-container>
            </el-aside>
            <el-main style="margin-left:15px;">
                <el-container>
                <el-header class="m_title">
                        <div style="float:left">内容列表</div>
                        <el-button style="float:right;margin-top:4px;" @click="addInfo"  size="mini" icon="el-icon-plus" >添加</el-button>
                </el-header>
                <el-main  :style="{'height':menuInfoListHeight + 'px','paddingTop':'0px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">

                    <el-table
                        :data="infoData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="title"
                        label="标题"
                        min-width="250"
                       >
                        </el-table-column>
                        <el-table-column
                        prop="fromWhere"
                        label="信息来源"
                        >
                        </el-table-column>
                         <el-table-column
                        prop="creatorName"
                        label="创建人"
                       >
                        </el-table-column>
                         <el-table-column
                        prop="readCount"
                        label="访问次数"
                       >
                        </el-table-column>
                         <el-table-column
                        prop="pubTime"
                        label="发布时间"
                       >
                        </el-table-column>
                        <el-table-column
                        prop="statusName"
                        label="发布状态"
                        >
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        min-width="150"
                        >
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="viewInfo(scope.row)" >查看</el-button>
                            <el-button type="text" size="small" @click="editInfo(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteInfo(scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-main>
                </el-container>
                <div style="text-align:right;margin:8px 0px;">
                    <el-pagination
                        background
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
        <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            fullscreen
            lock-scroll
            width="80%"
            >
            <div class="app-container calendar-list-container">
                    <div style="margin:0 5%; width: 90%;">
                        <editor
                            class="editor"
                            :info="info"
                            :isViewHtml='isViewHtml'
                            @saveInfo="saveInfo"
                            @saveCancel="saveCancel"
                            >
                        </editor>
                    </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'
import editor from '../editor/editor'

let id = 1000
export default {
  name: 'menuManage',
  data() {
    return {
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
      needParams: ['menuname', 'resourceId', 'url', 'state', 'startType', 'menuType', 'permissCode', 'rank', 'iconCls', 'parentId', 'id']
    }
  },
  components: { // 引入组件
    editor
  },
  created() {
    this.menuInfoListHeight = window.innerHeight - 261
    this.$get('/epf-cms/admin/infomenu/getInfoMenuList').then(res => {
      console.log(res)
      this.data4 = res.infoMenus
      this.treeloading = false
    })
  },
  methods: {
    saveCancel() {
      this.dialogVisible = false
    },
    deleteInfo(data) {
      this.$post('/epf-cms/admin/info/deleteInfo', {id: data.id}).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }
        this.$message.success(res.msg)
        this.getInfoManage(this.searchInfo)
      })
    },
    saveInfo(data) {
      this.$post('/epf-cms/admin/info/editInfo', data).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }
        this.dialogVisible = false
        this.$message.success(res.msg)
        this.getInfoManage(this.searchInfo)
      })
    },
    addInfo() { // 添加新闻
      this.info = {content: '', id: '', infoMenuCode: ''}
      this.info.infoMenuCode = this.infoMenuCode
      this.isViewHtml = false
      this.dialogVisible = true
    },
    editInfo(data) { // 编辑新闻
      this.$get('/epf-cms/admin/info/getInfo', {id: data.id}).then(res => {
        this.info = res.info
        this.isViewHtml = false
        this.dialogVisible = true
      }).catch(res => {
        this.$message.warning(res.msg)
      })
    },
    viewInfo(data) { // 预览新闻
      this.$get('/epf-cms/admin/info/getInfo', {id: data.id}).then(res => {
        this.info = res.info
        this.isViewHtml = true
        this.dialogVisible = true
      }).catch(res => {
        this.$message.warning(res.msg)
      })
    },

    nodeClick(data) {
      this.searchInfo['infoMenuCode'] = data.id
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = this.pageSize
      this.infoMenuCode = data.id
      this.getInfoManage(this.searchInfo)
    },
    getInfoManage(params) {
      this.$get('/epf-cms/admin/info/getInfoJson', {params: params, infoMenuCode: this.infoMenuCode}).then(res => {
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.infoData = res.pager.results
      }).catch(res => {
        this.$message.warning(res.msg)
      })
    },
    getMenuInfo(node, data) {
      this.currentNode = node
      this.currentData = data
      this.form = data
      this.form.parentMenu = node.parent.label
      this.form.parentId = node.parent.key
    },
    handleClose(done) {
      // 隐藏dialog
      this.dialogVisible = false
    },
    handleSizeChange(val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getInfoManage(this.searchInfo)
    },
    handleCurrentChange(val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.pageSize
      this.getInfoManage(this.searchInfo)
    }
  }
}
</script>

<style scoped>
.m_title{
    height: 40px !important;
    line-height: 40px !important;
    padding-left: 30px;
    background: rgb(48, 126, 204);
    color: #fff;
    font-size: 16px;
}
.el-tree>div{
    margin: 5px 0;
}
.iconList{
    height: 400px;
    background: rgb(255, 213, 213);
    overflow-y: auto;
}
</style>
<style>
.menuManage_List .el-tree-node__content{
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
    z-index:1001 !important;
}
.v-modal{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index:1000 !important;
}
</style>

