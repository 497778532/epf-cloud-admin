<template>
  <div id="infoManage">
    <el-container>
      <el-aside width="300px">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">栏目管理</el-header>
          <div style="background:rgb(224, 224, 224);">
            <div v-for="(button ,index)  in buttons"
                 :key="index"
                 class="menuManageBtn">
              <el-button v-if="button.resourceId=='infomenu_chuildadd'"
                         round
                         size="mini"
                         icon="el-icon-circle-plus"
                         @click="appendChild">子级</el-button>
              <el-button v-if="button.resourceId=='infomenu_prtadd'"
                         round
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
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">
            <div style="float:left">栏目详情</div>
          </el-header>
          <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
            <span v-for="(button ,index)  in buttons"
                  :key="index">
              <el-button v-if="button.resourceId=='infomenu_save'"
                         round
                         size="mini"
                         @click="saveInfoMenu"
                         icon="el-icon-document">保存</el-button>
              <el-button v-if="button.resourceId=='infomenu_delete'"
                         round
                         size="mini"
                         @click="deleteInfoMenu"
                         icon="el-icon-delete">删除</el-button>
            </span>
          </div>
          <el-main :style="{'height':menuInfoListHeight + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
            <el-form ref="form"
                     :model="infoMenu"
                     :rules="rules"
                     label-width="80px"
                     size="small">
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="菜单名称"
                                prop="name">
                    <el-input v-model="infoMenu.name"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="编码"
                                prop="code">
                    <el-input v-model="infoMenu.code"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="路径">
                    <el-input v-model="infoMenu.menuUrl"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="排序">
                    <el-input v-model="infoMenu.orderNum"
                              :maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="内容模型">
                    <el-select v-model="infoMenu.model"
                               placeholder="请选择"
                               class="select">
                      <el-option v-for="item in model"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="位置">
                    <el-select v-model="infoMenu.position"
                               placeholder="请选择"
                               class="select">
                      <el-option v-for="item in position"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="打开方式">
                    <el-select v-model="infoMenu.openType"
                               placeholder="请选择"
                               class="select">
                      <el-option v-for="item in openType"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
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
      clickFlag: false,
      defaultProps: {
        children: 'childInfoMenu',
        label: 'name'
      },
      rules: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '编码不能为空', trigger: 'blur' }
        ]
      },
      newName: '1',
      menuInfoListHeight: 100,

      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',
      model: [{
        value: '1',
        label: '文章'
      },
      {
        value: '2',
        label: '页面'
      },
      {
        value: '3',
        label: '下载'
      }, {
        value: '4',
        label: '外链'
      }],
      position: [
        {
          value: '1',
          label: '通过编码获取'
        },
        {
          value: '2',
          label: '头部主导航'
        },
        {
          value: '3',
          label: '尾部主导航'
        },
        {
          value: '4',
          label: '头尾部主导航'
        }
      ],
      openType: [{
        value: '1',
        label: '新窗口打开'
      },
      {
        value: '2',
        label: '当前窗口打开'
      }]
    }
  },
  created () {
    this.buttons = JSON.parse(localStorage.getItem('infoMenuManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')

    this.menuInfoListHeight = window.innerHeight - 261
    this.$get('/epf-cms/admin/infomenu/getInfoMenuList').then(res => {
      console.info(res.infoMenus)
      this.infoMenus = res.infoMenus
    })
  },
  methods: {
    nodeClick (data) {
      console.log(data.id)

      this.infoMenu = data
      this.clickFlag = true
    },
    append () { // 添加同级节点
      const newInfoMenu = { id: '', name: '新节点', pId: this.infoMenus[0].pId, childInfoMenu: [] }
      this.infoMenus.push(newInfoMenu)
    },
    appendChild () { // 添加子节点、
      if (!this.infoMenu.name) {
        this.$message({
          message: '请先选择顶级栏目!',
          type: 'warning'
        })
        return
      }
      const newInfoMenu = { id: '', name: '新节点', pId: this.infoMenu.id, childInfoMenu: [] }
      this.infoMenu.childInfoMenu.push(newInfoMenu)
    },
    saveInfoMenu () { // 保存选中节点
      if (!this.clickFlag) {
        this.$message.warning('请先选择节点！')
        return
      }
      if (!this.infoMenu.name) {
        this.$message.warning('菜单名称不能为空！')
        return
      }
      if (!this.infoMenu.code) {
        this.$message.warning('编码不能为空！')
        return
      }
      var tempInfoMenu = this.infoMenu
      tempInfoMenu.childInfoMenu = []
      this.$post('/epf-cms/admin/infomenu/editInfoMenu', tempInfoMenu).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.infoMenu.id = res.infoMenu.id
        this.$message.success(res.msg)
        this.$get('/epf-cms/admin/infomenu/getInfoMenuList').then(res => {
          console.info(res.infoMenus)
          this.infoMenus = res.infoMenus
        })
      })
    },
    deleteInfoMenu () { // 删除选中节点
      if (!this.infoMenu.id) {
        this.$message({
          message: '请先选中要删除的栏目!',
          type: 'warning'
        })
        return
      }

      this.$get('/epf-cms/admin/infomenu/deleteInfoMenu?id=' + this.infoMenu.id).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg)// 失败
          return
        }
        this.$get('/epf-cms/admin/infomenu/getInfoMenuList').then(res => {
          this.infoMenus = res.infoMenus
        })
        this.infoMenu = {}
        this.$message.success('删除成功!')
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
.menuManageBtn {
  height: 40px;
  padding: 6px 4px;
  float: right;
}

.select {
  width: 31.5em;
}
</style>

