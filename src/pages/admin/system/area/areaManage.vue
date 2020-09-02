<template>
  <div id="menuManage">
    <el-container>
      <el-aside width="300px"
                style="padding-top:10px;padding-left:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">区域</el-header>
          <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
            <el-button size="mini"
                       @click="addLevelOne">添加</el-button>
          </div>
          <el-main :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
            <el-tree :data="data4"
                     v-loading="loading"
                     element-loading-text="数据加载中"
                     element-loading-background="rgba(255, 255, 255,0.95)"
                     :props="defaultProps"
                     node-key="id"
                     :expand-on-click-node="false"
                     class="menuManage_List"
                     :render-content="renderContent">
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-main style="margin-left:15px;padding-top:10px;padding-right:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">区域信息</el-header>
          <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
            <el-button v-if="!isadd"
                       size="mini"
                       @click="editDict">保存</el-button>
            <el-button v-if="isadd"
                       size="mini"
                       @click="saveMenu">保存</el-button>
            <el-button size="mini"
                       @click="deleteMenu">删除</el-button>
          </div>
          <el-main :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderRight':'1px solid rgb(224, 224, 224)'}">

            <el-form :model="dict"
                     :rules="rules"
                     label-width="80px">
              <el-form-item label="字典key"
                            :label-width="formLabelWidth"
                            prop="dictKey">
                <el-input v-model="dict.dictKey"
                          :readonly="true"
                          auto-complete="off"
                          :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="字典value"
                            :label-width="formLabelWidth"
                            prop="dictValue">
                <el-input v-model="dict.dictValue"
                          auto-complete="off"
                          :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="中文名称"
                            :label-width="formLabelWidth"
                            prop="zhCn">
                <el-input v-model="dict.zhCn"
                          auto-complete="off"
                          :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="英文名称"
                            :label-width="formLabelWidth"
                            prop="enUs">
                <el-input v-model="dict.enUs"
                          auto-complete="off"
                          :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="排序"
                            :label-width="formLabelWidth">
                <el-input v-model="dict.dictOrder"
                          auto-complete="off"
                          :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="父节点"
                            :label-width="formLabelWidth">
                <el-input v-model="parentName"
                          :readonly="true"
                          :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="简称"
                            :label-width="formLabelWidth">
                <el-input v-model="dict.abbreviation"
                          auto-complete="off"
                          :maxlength="50"></el-input>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
let id = 1000;
export default {
  name: 'menuManage',
  data () {
    return {
      rules: {
        dictKey: [
          { required: true, message: '请输入字典key', trigger: 'blur' },
        ],
        dictValue: [
          { required: true, message: '请输入字典value', trigger: 'blur' },
        ],
        zhCn: [
          { required: true, message: '请输入中文名称', trigger: 'blur' },
        ],
        enUs: [
          { required: true, message: '请输入英文名称', trigger: 'blur' },
        ],
      },
      data4: [],
      grouparea: {},
      dict: {},
      dictKey: '',
      loading: true,
      defaultProps: {
        children: 'children',
        label: 'zhCn',
        id: 'dictValue'
      },
      isadd: false,
      parentName: '',
      form: {

      },
      formLabelWidth: '120px',
      menuListHeight: 100,
      dialogVisible: false,
      currentNode: '',
      currentData: '',

      //按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: ''
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 261;
    this.buttons = JSON.parse(localStorage.getItem("infoMenuManage"));
    this.theme_BackgroundColor = localStorage.getItem("theme_BackgroundColor");
    this.theme_TextColor = localStorage.getItem("theme_TextColor");

    this.laodmenus();
  },
  methods: {

    laodmenus () {
      var that = this;
      this.loading = true
      that.$get('/epf-admin/admin/regionals/getRegionalTree')
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.loading = false
            if (res.treeTableData != '') {
              that.data4 = res.dataTree
            } else {
              that.data4 = []
            }
          } else {
            that.$message.warning(res.msg)
          }

        })
    },
    append (node, data) {
      console.log(node, data);

      if (!node.expanded) {
        node.expanded = true;
      }
      const newChild = { id: '', zhCn: '', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    addLevelOne () {
      const newMenu = { id: '', zhCn: '', parentId: '0', children: [] };
      this.data4.push(newMenu);
    },
    remove (node, data) {
      if (data.children.length > 0) {
        this.$message.error("请先删除下级地区！");//失败
        return;
      }
      this.currentNode = node;
      this.dict = data;
      this.deleteMenu();
    },
    setName (node, data) {
      console.log(node, data);
      data.menuname = document.getElementById(node.id + 'Name').value
    },


    saveMenu () {
      var that = this

      var url = '/epf-admin/admin/regionals/add'
      if (that.dict.dictValue == '' || that.dict.dictValue == null) {
        that.$message.warning('请输入字典值')
        return
      }
      if (that.dict.zhCn == '' || that.dict.zhCn == null) {
        that.$message.warning('请输入字典中文名称')
        return
      }
      if (that.dict.enUs == '' || that.dict.enUs == null) {
        that.$message.warning('请输入字典英文名称')
        return
      }
      let dict = {        'dictKey': that.dictKey, 'dictValue': that.dict.dictValue,
        'zhCn': that.dict.zhCn, 'enUs': this.dict.enUs,
        'parentId': that.dict.parentId, dictOrder: this.dict.dictOrder,
        'abbreviation': that.dict.abbreviation      }
      that.$post(url, dict)
        .then(res => {
          if (res.code === 0) {
            that.$message.success("保存成功")
            that.laodmenus()
          } else {
            that.$message.warning(res.msg)
          }
        })
        .catch(res => {
          console.log(res)
          that.$message.warning(res.msg)
        })
    },
    editDict () {
      let that = this
      var url = '/epf-admin/admin/regionals/edit'
      if (that.dict.dictKey == '' || that.dict.dictKey == null) {
        that.$message.warning('请输入字典key')
        return
      }
      if (that.dict.dictValue == '' || that.dict.dictValue == null) {
        that.$message.warning('请输入字典值')
        return
      }
      if (that.dict.zhCn == '' || that.dict.zhCn == null) {
        that.$message.warning('请输入字典中文名称')
        return
      }
      if (that.dict.enUs == '' || that.dict.enUs == null) {
        that.$message.warning('请输入字典英文名称')
        return
      }
      let dict = { 'id': that.dict.id, 'dictKey': that.dict.dictKey, 'dictValue': that.dict.dictValue, 'zhCn': that.dict.zhCn, 'enUs': that.dict.enUs, 'parentId': that.dict.parentId, dictOrder: that.dict.dictOrder, 'abbreviation': that.dict.abbreviation }
      that.$post(url, dict).then(res => {
        if (res.code === 0) {
          that.$message.success("保存成功")
          that.laodmenus()
        } else {
          that.$message.error(res.msg)
        }
      })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    deleteMenu () {
      let that = this

      var dict = that.dict;
      if (dict.children.length > 0) {
        that.$message.warning("请先删除下级地区！");
        return false;
      }
      let url = '/epf-admin/admin/regionals/delete';
      if (that.dict.id == null || that.dict.id == "") {
        const parent = this.currentNode.parent;
        const childMenu = parent.data.children || parent.data;
        const index = childMenu.findIndex(d => d.id === this.currentData.id);
        childMenu.splice(index, 1);
        return false;
      }
      let data = { 'id': that.dict.id }

      this.$confirm("确认删除该条的信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: "warning"
      })
        .then(async () => {
          this.$post(url, data).then(res => {
            if (res.code != 0) {
              that.$message.error(res.msg)
              return false;
            }
            that.$message.success("删除成功!")
            this.laodmenus();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    getdictInfo (node, data) {
      this.isadd = false;
      this.currentNode = node;
      this.currentData = data;
      this.dict = data;
      this.parentName = node.parent.label;

    },

    getnewdictInfo (node, data) {
      let that = this
      that.isadd = true;
      that.currentNode = node;
      that.currentData = data == null ? {} : data;
      var dict = data == null ? {} : data;
      if (node.parent.data.id == null || node.parent.data.id == undefined) {
        dict.parentId = "0"
      } else {
        dict.parentId = node.parent.data.id
        that.parentName = node.parent.label;
      }


      let code = that.grouparea.code
      var url = '/api/epf-admin/admin/regionals/getDictKey'

      axios
        .get(url)
        .then(res => {
          if (res.code === 0) {
            that.dictKey = res.dictKey;
            dict.dictKey = res.dictKey;
            that.dict = dict;
          } else {
            that.$message.warning(res.msg)
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
      console.log(that.dict);

    },
    renderContent (h, { node, data, store }) {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (node.label) {
        return (
          <span on-click={() => this.getdictInfo(node, data)} style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span>
              <i class={data.iconCls} style="padding-right:5px;"></i>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 16px;padding:0px;color:#409EFF;" type="text" on-click={() => this.append(node, data)}><i class="el-icon-circle-plus-outline"></i></el-button>
              <el-button style="font-size: 16px;color:#F56C6C;" type="text" on-click={() => this.remove(node, data)}><i class="el-icon-delete"></i></el-button>
            </span>
          </span>);
      } else {
        return (
          <span on-click={() => this.getnewdictInfo(node, data)} style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span>
              <span><input id={node.id + 'Name'} type="text" placeholder="请输入名称" autofocus /></span>
            </span>
            <span>
              <el-button style="font-size: 16px;padding:0px;color:#67C23A;" type="text" on-click={() => this.setName(node, data)}><i class="el-icon-circle-check-outline"></i></el-button>
              <el-button style="font-size: 16px;color:#F56C6C;" type="text" on-click={() => this.remove(node, data)}><i class="el-icon-delete"></i></el-button>
            </span>
          </span>);
      }
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
  background: #fff;
  overflow-y: auto;
}
.iconitem {
  width: 100px;
  height: 80px;
  text-align: center;
  float: left;
  border: 1px solid rgb(230, 227, 227);
  overflow: hidden;
}
.iconitem i {
  font-size: 30px;
}
</style>
<style>
.menuManage_List .el-tree-node__content {
  margin-bottom: 5px;
}
</style>


