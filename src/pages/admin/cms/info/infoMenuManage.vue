<template>
  <div id="infoManage">
    <el-container>
      <el-aside width="300px">
        <el-container>
          <el-header class="m_title">栏目管理</el-header>
          <div style="background:rgb(224, 224, 224);">
            <div class="menuManageBtn">
              <el-button round
                         size="mini"
                         icon="el-icon-circle-plus"
                         @click="appendChild">子级</el-button>
            </div>
            <div class="menuManageBtn">
              <el-button round
                         size="mini"
                         icon="el-icon-circle-plus"
                         @click="append">顶级</el-button>
            </div>
          </div>
          <el-main :style="{'height':menuInfoListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
            <el-tree :data="infoMenus"
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
          <el-header class="m_title">
            <div style="float:left">栏目详情</div>
          </el-header>
          <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
            <el-button round
                       size="mini"
                       @click="saveInfoMenu"
                       icon="el-icon-document">保存</el-button>
            <el-button round
                       size="mini"
                       @click="deleteInfoMenu"
                       icon="el-icon-delete">删除</el-button>
          </div>
          <el-main :style="{'height':menuInfoListHeight + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
            <el-form ref="form"
                     :model="infoMenu"
                     label-width="80px"
                     size="small">
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="菜单名称">
                    <el-input v-model="infoMenu.name"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="编码">
                    <el-input v-model="infoMenu.code"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="排序">
                    <el-input v-model="infoMenu.orderNum"
                              :maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-main>
        </el-container>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import qs from 'qs'

let id = 1000
export default {
  name: 'infoMenuManage',
  data () {
    return {
      infoMenus: [],
      infoMenu: {},
      defaultProps: {
        children: 'childInfoMenu',
        label: 'name'
      },
      newName: '1',

      menuInfoListHeight: 100

    }
  },
  created () {
    this.$get('/epf-cms/admin/infomenu/getInfoMenuList').then(res => {
      console.info(res.infoMenus)
      this.infoMenus = res.infoMenus
    })
    this.menuInfoListHeight = window.innerHeight - 261
  },
  methods: {
    nodeClick (data) {
      console.log(data.id)

      this.infoMenu = data
    },
    append () { // 添加同级节点
      const newInfoMenu = { id: '', name: '新节点', pId: this.infoMenus[0].pId, childInfoMenu: [] }
      this.infoMenus.push(newInfoMenu)
    },
    appendChild () { // 添加子节点、
      const newInfoMenu = { id: '', name: '新节点', pId: this.infoMenu.id, childInfoMenu: [] }
      this.infoMenu.childInfoMenu.push(newInfoMenu)
    },
    saveInfoMenu () { // 保存选中节点
      var tempInfoMenu = this.infoMenu
      tempInfoMenu.childInfoMenu = []
      this.$post('/epf-cms/admin/infomenu/editInfoMenu', tempInfoMenu).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        tempInfoMenu.id = res.infoMenu.id
        this.$message.success(res.msg)
      })
    },
    deleteInfoMenu () { // 删除选中节点
      this.$get('/epf-cms/admin/infomenu/deleteInfoMenu?id=' + this.infoMenu.id).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.$get('/epf-cms/admin/infomenu/getInfoMenuList').then(res => {
          this.infoMenus = res.infoMenus
        })
        this.infoMenu = {}
        this.$message.success(res.msg)
      })
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
.menuManageBtn {
  height: 40px;
  padding: 6px 4px;
  float: right;
}
</style>

