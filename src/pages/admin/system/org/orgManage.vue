<template>
  <div id="orgManage">
    <el-container>
      <el-aside width="300px"
                style="padding-top:10px;padding-left:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">机构</el-header>
          <div style="padding:6px 22px;background:rgb(224, 224, 224);">
            <span v-for="(button ,index)  in buttons"
                  :key="index">
              <el-button v-if="button.resourceId=='org_add'"
                         size="mini"
                         @click="addLevelOne">添加</el-button>
              <!-- <el-button v-if="button.resourceId=='org_samestep'" size="mini" @click="loadTree">同步</el-button> -->
            </span>
          </div>
          <el-main :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
            <el-tree :data="data4"
                     v-loading="loading"
                     element-loading-text="数据加载中"
                     element-loading-background="rgba(255, 255, 255,0.95)"
                     :props="defaultProps"
                     node-key="id"
                     :expand-on-click-node="false"
                     class="orgManange_List"
                     :render-content="renderContent"
                     @node-drag-end="handleDragEnd"
                     draggable>
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-main style="margin-left:15px;padding-top:10px;padding-right:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">机构信息</el-header>
          <div style="padding:6px 22px;background:rgb(224, 224, 224);">
            <span v-for="(button ,index)  in buttons"
                  :key="index">
              <el-button v-if="button.resourceId=='org_save'"
                         size="mini"
                         @click="saveMenu">保存</el-button>
              <el-button v-if="button.resourceId=='org_delete'"
                         size="mini"
                         @click="deleteMenu">删除</el-button>
            </span>
          </div>
          <el-main :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderRight':'1px solid rgb(224, 224, 224)'}">
            <el-form ref="form"
                     :model="form"
                     :rules="rules"
                     label-width="80px"
                     size="small">
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="机构名称"
                                prop="name">
                    <el-input v-model="form.name"
                              placeholder="请输入机构名称"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="机构编号"
                                prop="orgCode">
                    <el-input v-model="form.orgCode"
                              placeholder="请输入机构编号"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="详细地址"
                                prop="address">
                    <el-input v-model="form.address"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="联系电话"
                                prop="telPhone">
                    <el-input v-model="form.telPhone"
                              :maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="机构类型">
                    <el-select v-model="form.orgType"
                               placeholder="请选择机构类型">
                      <el-option v-for="orgType of orgTypes"
                                 :key="orgType.id"
                                 :label="orgType.zhCn"
                                 :value="orgType.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="地区"
                                prop="areaName"
                                class="areaSty">
                    <el-input v-model="form.areaName"
                              placeholder="请选择地区"
                              readonly
                              style="float:left; width:79%;margin-right:5px;"
                              :maxlength="50"></el-input>
                    <el-button size="mini"
                               @click="checkArea">选择</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="父节点">
                    <el-input disabled
                              v-model="form.parentMenu"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="级别">
                    <el-select v-model="form.orgLevel"
                               placeholder="请选择级别">
                      <el-option v-for="orgLevel of orgLevels"
                                 :key="orgLevel.id"
                                 :label="orgLevel.zhCn"
                                 :value="orgLevel.dictKey"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="排序">
                    <el-input-number v-model="form.rank"
                                     controls-position="right"
                                     :min="1"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="邮编"
                                prop="postalCode">
                    <el-input v-model="form.postalCode"
                              controls-position="right"
                              :maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="联系人"
                                prop="liaison">
                    <el-input v-model="form.liaison"
                              controls-position="right"
                              :maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="邮箱"
                                prop="email">
                    <el-input v-model="form.email"
                              controls-position="right"
                              :maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-main>
        </el-container>
      </el-main>
    </el-container>

    <!-- 选择父节点 -->
    <el-dialog title="选择地区"
               :visible.sync="dialogAreaCheck">
      <el-form class="region">
        <el-tree :data="areaData"
                 :props="areaDefaultProps"
                 node-key="dict_key"
                 accordion
                 @node-click="handleAreaNodeClick"
                 :expand-on-click-node="false">
        </el-tree>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
let id = 1000;
export default {
  name: "orgManage",
  data () {
    return {
      data4: [],
      rules: {
        name: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        orgCode: [
          { required: true, message: "请输入机构编号", trigger: "blur" }
        ],
        address: [
          { min: 5, max: 40, message: "长度在 5 到 40个字符", trigger: "change" },
        ],
        telPhone: [
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/, message: "您输入的联系电话有误", trigger: "change" },
        ],
        postalCode: [
          { pattern: /^[0-9]{6}$/, message: "您输入的邮编有误", trigger: "change" },
        ],
        liaison: [
          { min: 2, max: 8, message: "长度在 2 到 8个字符" },
          { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: "只能输入中文", trigger: 'change' }
        ],
        email: [
          { pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '您输入的邮箱格式有误，请重新输入', trigger: 'change' },
        ],
      },
      loading: true,
      defaultProps: {
        children: "children",
        label: "name"
      },
      newName: "1",
      form: {
        id: "",
        name: "",
        orgCode: "",
        address: "",
        telPhone: "",
        orgType: "",
        area: "",
        parentId: "",
        orgLevel: "",
        rank: "",
        postalCode: "",
        liaison: "",
        email: "",
        areaName: ""
      },
      menuListHeight: 100,
      currentNode: "",
      currentData: "",
      needParams: [
        "id",
        "name",
        "orgCode",
        "address",
        "telPhone",
        "orgType",
        "area",
        "parentId",
        "orgLevel",
        "rank",
        "postalCode",
        "liaison",
        "email"
      ],
      orgTypes: [],
      orgLevels: [],
      areaData: [],
      areaDefaultProps: {
        children: "children",
        label: "zhCn",
        id: "dictKey"
      },
      dialogAreaCheck: false,

      //按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',
      currentMenuId: "",
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 261;
    this.buttons = JSON.parse(localStorage.getItem("orgManage"));
    this.theme_BackgroundColor = localStorage.getItem("theme_BackgroundColor");
    this.theme_TextColor = localStorage.getItem("theme_TextColor");
    //this.$get('/epf-admin/admin/dictionaries/selectGroupId?groupId=195a3310-2ae7-4913-8050-6d600a41c5e7').then(res => {
    /*this.$get('/epf-admin/admin/dictionaries/getDictEbyDictGroup/org_type').then(res => {

    this.$get('/epf-admin/admin/dictionaries/getDictEbyDictGroup/org_level').then(res => {
        this.orgLevels = res.dictionariesList;
    });
    });*/

    this.currentMenuId = this.$route.name
    this.loadTree();
    this.queryareatList();
    this.queryDictList("org_level");
    this.queryDictList("org_type");

  },
  mounted () {
    this.$bus.$on("themChange", val => {
      this.theme_BackgroundColor = val.menuBackgroundColor;
      this.theme_TextColor = val.textColor;
    });
  },
  methods: {
    loadTree () {
      this.loading = true;
      this.$get("/epf-admin/admin/org/getOrgTreeForTree", { menuId: this.currentMenuId }).then(res => {
        this.data4 = JSON.parse(res.ztreeJson.replace(/'/g, '"'));
        console.log(this.data4)
        this.loading = false;
      });

    },

    append (node, data) {
      if (!node.expanded) {
        node.expanded = true;
      }
      const newChild = { id: "newOrg", name: "", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    addLevelOne () {
      const newOrg = { id: "newOrg", name: "", children: [] };
      this.data4.push(newOrg);
    },
    remove (node, data, event) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      event.stopPropagation();
    },
    setName (node, data) {
      console.log(node, data);
      data.name = document.getElementById(node.id + "Name").value;
    },
    getOrgInfo (node, data) {
      if (data.id == "newOrg") {
        this.form = data;
        this.form.rank = 1;
        this.form.parentMenu = node.parent.label;
        this.form.parentId = node.parent.key == undefined ? 0 : node.parent.key;
      } else {
        this.$get("/epf-admin/admin/org/getOrg?id=" + data.id).then(res => {
          res.org["name"] = res.org.orgName;
          this.form = res.org;
          this.handlerAreaData(res.org.area);
          this.form.parentMenu = node.parent.label;
          this.form.parentId = node.parent.key;
        });
      }
      this.currentNode = node;
      this.currentData = data;
    },
    onSubmit () {
      console.log("submit!");
    },
    saveMenu () {
      let paramsData = {};
      for (let index = 0; index < this.needParams.length; index++) {
        paramsData[this.needParams[index]] = this.form[this.needParams[index]];
      }
      if (paramsData.id == "newOrg") {
        paramsData.id = null;
      }
      if (!paramsData.name) {
        this.$message.warning("机构名称不能为空！");
        return;
      }
      if (!paramsData.orgCode) {
        this.$message.warning("机构编码不能为空！");
        return;
      }
      if (!paramsData.area) {
        this.$message.warning("地区不能为空！");
        return;
      }
      if (paramsData.telPhone) {
        if (isNaN(paramsData.telPhone)) {
          this.$message.warning("电话号码只能是数字！");
          return;
        }
      }
      if (paramsData.postalCode) {
        if (isNaN(paramsData.postalCode)) {
          this.$message.warning("邮编只能是数字！");
          return;
        }
      }
      //   if(!paramsData.areaName){
      //     this.$message.warning("地区不能为空！");
      //     return;
      //   }
      paramsData["orgName"] = paramsData.name;
      this.$post("/epf-admin/admin/org/save", paramsData).then(res => {
        if (res.code == 0) {
          this.currentData = res.org;
          this.loadTree();
          this.form = {
            id: "",
            name: "",
            orgCode: "",
            address: "",
            telPhone: "",
            orgType: "",
            area: "",
            parentId: "",
            orgLevel: "",
            rank: "",
            postalCode: "",
            liaison: "",
            email: "",
            areaName: ""
          }
          this.$message.success("保存成功！");
        } else {
          this.$message.error(res.msg);
        }
      }).catch(error => { })
    },
    deleteMenu () {
      if (this.currentData.id == "") {
        this.$message({
          message: "请选择机构单位",
          type: "warning"
        });
        return;
      } else {
        this.$confirm("确定要删除吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          // type: "warning"
        }).then(() => {
          const parent = this.currentNode.parent;
          const children = parent.data.children || parent.data;
          this.$post("/epf-admin/admin/org/delete", {
            id: this.currentData.id
          }).then(res => {
            if (res.code == 0) {
              Object.assign(this.$data.form, this.$options.$data().form)
              this.currentData.id == ""
              this.$message.success("删除成功！");
            } else {
              this.$message.error(res.msg);
            }
          });
          const index = children.findIndex(d => d.id === this.currentData.id);
          children.splice(index, 1);
        }).catch(() => { })
      }
    },
    renderContent (h, { node, data, store }) {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (node.label) {
        return (
          <span
            on-click={() => this.getOrgInfo(node, data)}
            style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;"
          >
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button
                style="font-size: 16px;padding:0px;color:#409EFF;"
                type="text"
                on-click={() => this.append(node, data)}
              >
                <i class="el-icon-circle-plus-outline" />
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span
            on-click={() => this.getOrgInfo(node, data)}
            style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;"
          >
            <span>
              <span>
                <input
                  id={node.id + "Name"}
                  readonly
                  type="text"
                  placeholder="请在右边输入..."
                  autofocus
                />
              </span>
            </span>
            <span>
              <el-button
                style="font-size: 16px;padding:0px;color:#67C23A;"
                type="text"
                on-click={() => this.setName(node, data)}
              >
                <i class="el-icon-circle-check-outline" />
              </el-button>
              <el-button
                style="font-size: 16px;color:#F56C6C;"
                type="text"
                on-click={() => this.remove(node, data, event)}
              >
                <i class="el-icon-delete" />
              </el-button>
            </span>
          </span>
        );
      }
    },
    handlerAreaData (area) {
      let areaData = this.areaData;
      let that = this;
      //debugger;
      for (let i = 0; i < areaData.length; i++) {
        if (areaData[i].dictKey == area) {
          that.form.areaName = areaData[i].zhCn;
          return;
        }
        for (let j = 0; j < areaData[i].children.length; j++) {
          if (areaData[i].children[j].dictKey == area) {
            that.form.areaName = areaData[i].children[j].zhCn;
            return;
          }
          for (let n = 0; n < areaData[i].children[j].children.length; n++) {
            if (areaData[i].children[j].children[n].dictKey == area) {
              that.form.areaName =
                areaData[i].zhCn +
                "/" +
                areaData[i].children[j].zhCn +
                "/" +
                areaData[i].children[j].children[n].zhCn;
              return;
            }
          }
        }
      }
    },
    handleAreaNodeClick (data, checked, indeterminate) {
      this.handlerAreaData(data.dictKey);
      this.form.area = data.dictKey;
      //this.form.areaName = data.zhCn;
      console.log(this.form.area, this.form.areaName);
      this.dialogAreaCheck = false;
    },
    checkArea () {
      this.dialogAreaCheck = true;
    },
    queryareatList () {
      var that = this;
      that.$get("/epf-admin/admin/regionals/getRegionalTree").then(res => {
        if (res.code === 0) {
          if (res.treeTableData != "") {
            that.areaData = res.dataTree;
          } else {
            that.areaData = [];
          }
        } else {
          that.$message.warning(res.msg);
        }
      });
    },
    queryDictList (code) {
      var that = this;
      that
        .$get("/epf-admin/admin/dictionaries/getDictEbyDictGroup/" + code)
        .then(res => {
          if (res.code === 0) {
            if (code == "org_level") {
              if (res.dictionariesList != null) {
                that.orgLevels = res.dictionariesList;
              } else {
                that.orgLevels = [];
              }
            } else if (code == "org_type") {
              if (res.dictionariesList != null) {
                that.orgTypes = res.dictionariesList;
              } else {
                that.orgTypes = [];
              }
            }
          } else {
            that.$message.warning(res.msg);
          }
        });
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {

      // this.$refs['form'].validate((valid)=>{
      //   if(valid){

      //   }else{
      //     this.$message.warning('请确认信息是否填写完整')
      //   }
      // })

      var orgId = draggingNode.data.id;
      var pId = '';
      if (dropType == "inner") {
        pId = dropNode.data.id;
      } else {
        pId = dropNode.data.pId;
      }
      var paramsData = { id: orgId, parentId: pId, };
      this.$post("/epf-admin/admin/org/update", paramsData).then(res => {
        if (res.code == 0) {
          this.$message.warning("保存成功！");
        } else {
          this.$message.warning(res.msg);
        }
        this.loadTree();
      });
    }
  }
};
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
</style>
<style>
.orgManange_List .el-tree-node__content {
  margin-bottom: 5px;
}
.region {
  height: 350px;
  overflow: auto;
}
.areaSty {
  position: relative;
}
.areaSty:after {
  content: "*";
  color: red;
  position: absolute;
  left: 30px;
  top: 9px;
}
</style>


