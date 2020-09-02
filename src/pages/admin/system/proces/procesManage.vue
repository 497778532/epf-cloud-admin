<template>
  <div id="procesManage">
    <el-container>
      <el-aside width="200px"
                style="padding-top:10px;padding-left:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">流程分类</el-header>
          <el-main :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
            <el-tree :data="data4"
                     :props="defaultProps"
                     node-key="id"
                     :expand-on-click-node="false"
                     class="orgManange_List"
                     :default-expand-all="true"
                     @node-click="handleCheckChange">
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-main style="margin-left:15px;padding-top:10px;padding-right:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">
            <div style="float:left">{{title}}</div>
          </el-header>

          <el-main :style="{'height':menuInfoListHeight + 'px','paddingTop':'0px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)'}">
            <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
              <el-button size="mini"
                         @click="addprocess">新增</el-button>
              <el-button size="mini"
                         @click="deleteprocess">删除</el-button>
            </div>

            <el-table :data="processData"
                      border
                      v-loading="loading"
                      element-loading-text="数据加载中"
                      element-loading-background="rgba(255, 255, 255,0.95)"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
              <el-table-column fixed
                               type="selection"
                               width="50"></el-table-column>
              <el-table-column fixed
                               prop="processName"
                               label="流程名称"
                               min-width="100"></el-table-column>
              <el-table-column prop="processSimpleName"
                               label="流程简称"
                               min-width="100"> </el-table-column>
              <el-table-column prop="processWechatName"
                               label="微信简称"
                               min-width="100"></el-table-column>
              <el-table-column prop="groupCodeName"
                               label="流程分类">
              </el-table-column>
              <!--  <el-table-column   prop="processType" label="流程类型"  min-width="100"></el-table-column>-->
              <el-table-column prop="procdefName"
                               label="关键流程名称"
                               min-width="100"></el-table-column>
              <el-table-column prop="useScope"
                               label="使用范围"
                               min-width="100"></el-table-column>
              <el-table-column prop="businessType"
                               label="业务类型"
                               min-width="100"></el-table-column>
              <el-table-column prop="processState"
                               label="状态"
                               min-width="50"></el-table-column>

              <el-table-column fixed="right"
                               label="操作"
                               min-width="100">
                <template slot-scope="scope">
                  <!-- <el-button  type="text" size="small" @click="viewInfo(scope.row)" >查看</el-button> -->
                  <el-button type="text"
                             size="small"
                             @click="editInfo(scope.row)"
                             class="el-icon-menu">配置</el-button>
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

    <!--*******配置弹窗********-->
    <el-dialog :visible.sync="dialogAreaCheck"
               :show-close="false">
      <span slot="title"
            class="dialog-header">
        <el-steps :active="active"
                  align-center
                  finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="流程配置"></el-step>
          <el-step title="人员配置"></el-step>
          <el-step title="事件配置"></el-step>
        </el-steps>
      </span>
      <el-form ref="form"
               v-show="active==0"
               :label-position="labelPosition"
               :model="singleprocess"
               label-width="100px"
               size="mini">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="流程名称">
              <el-input v-model="singleprocess.processName"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="流程KEY">
              <el-input v-model="singleprocess.processKey"
                        :maxlength="50"></el-input>
              <!-- <el-select v-model="singleprocess.processKey" clearable placeholder="请选择">
                                <el-option
                                v-for="(item,index) in actkeys"
                                :key="index"
                                :label="item.zhCn"
                                :value="item.dictKey">
                                </el-option>
                            </el-select>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="流程简称">
              <el-input v-model="singleprocess.processSimpleName"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信简称">
              <el-input v-model="singleprocess.processWechatName"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属分类">
              <el-select v-model="singleprocess.groupCode"
                         clearable
                         placeholder="请选择">
                <el-option v-for="(item,index) in actTypes"
                           :key="index"
                           :label="item.zhCn"
                           :value="item.dictKey">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
                        <el-form-item label="流程类型">
                            <el-select v-model="singleprocess.processType" clearable placeholder="请选择">
                                <el-option
                                v-for="(item,index) in actleixing"
                                :key="index"
                                :label="item.zhCn"
                                :value="item.dictValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>-->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="流程状态">
              <el-select v-model="singleprocess.processState"
                         clearable
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联流程定义">
              <el-select v-model="singleprocess.procdefName"
                         clearable
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="使用范围">
              <el-select v-model="singleprocess.useScope"
                         clearable
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务类型">
              <el-select v-model="singleprocess.businessType"
                         clearable
                         placeholder="请选择">
                <el-option v-for="(item,index) in business_Typs"
                           :key="index"
                           :label="item.zhCn"
                           :value="item.dictKey">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="9">

            <el-form-item label="到期时限">
              <el-input v-model="singleprocess.expireTerm"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            天
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标标识">
              <el-input v-model="singleprocess.processIcon"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input v-model="singleprocess.description"
                        :maxlength="200"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <el-container style="display:block;"
                    v-if="active==1">
        <img style="width:100%"
             :src="actPhoto" />
      </el-container>
      <el-container style="display:block;"
                    v-if="active==2 || active==3">
        <el-table ref="multipleTable"
                  height="450"
                  :data="userData"
                  style="width: 100%"
                  border>
          <el-table-column prop="id"
                           label="节点id"
                           min-width="130"></el-table-column>
          <el-table-column prop="name"
                           label="节点名称"
                           min-width="130"></el-table-column>
          <el-table-column label="操作"
                           min-width="100">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         v-show="active==2"
                         @click="viewInfo(scope.row)">配置人员</el-button>
              <el-button type="text"
                         size="small"
                         v-show="active==3"
                         @click="editevnet(scope.row)">事件配置</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination background
                         layout="prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10, 15, 20]"
                         @size-change="userhandleSizeChange"
                         @current-change="userhandleCurrentChange"
                         :total="usertotalRecord"></el-pagination>
        </div>
      </el-container>

      <span slot="footer"
            class="dialog-footer">
        <el-button style="margin-top: 12px;"
                   type="warning"
                   size="small"
                   @click="dialogAreaCheck=false;active=0">关闭</el-button>
        <el-button style="margin-top: 12px;"
                   type="warning"
                   v-if="active==0"
                   size="small"
                   @click="saveprocess">保存</el-button>
        <el-button style="margin-top: 12px;"
                   v-show="active>0"
                   size="small"
                   @click="back">上一步</el-button>
        <el-button style="margin-top: 12px;"
                   v-show="active<3"
                   size="small"
                   @click="next">下一步</el-button>
        <!-- <el-button style="margin-top: 12px;" v-if="active>=3" size="small" @click="dialogAreaCheck=false;active=0">finish</el-button> -->
      </span>

    </el-dialog>
    <!--***********新增流程弹出***********-->
    <el-dialog title="节点编辑"
               :visible.sync="dialogaddCheck"
               width="400px">
      <el-form ref="form"
               style="display:block;"
               :label-position="labelPosition"
               :model="singleprocess"
               label-width="100px"
               size="mini">
        <el-row :gutter="12">
          <el-col :span="24">
            <el-form-item label="节点名称">
              <el-input v-model="singleNode.nodeName"
                        :disabled="true"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="12">

          <el-col :span="24">
            <el-form-item label="节点ID">
              <el-input v-model="singleNode.nodeId"
                        :disabled="true"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="24">
            <el-form-item label="指定类型">
              <el-select v-model="singleNode.focustype"
                         @change="focuschange"
                         placeholder="请选择">
                <el-option label="指定角色"
                           value="0"></el-option>
                <el-option label="当前人部门"
                           value="6"></el-option>
                <el-option label="指定部门"
                           value="5"></el-option>
                <el-option label="指定部门负责人"
                           value="0"></el-option>
                <el-option label="发起人办理"
                           value="3"></el-option>
                <!--            <el-option   label="当前部门及上级部门"  value="1"></el-option>
                                     <el-option   label="当前部门及所有子部门"  value="2"></el-option> -->
                <el-option label="指定人"
                           value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="12"
                v-if="singleNode.focustype=='5'">
          <el-col :span="24">

            <el-form-item label="指定部门"
                          prop="designDepartment">
              <el-cascader expand-trigger="hover"
                           :options="orglist"
                           :show-all-levels="false"
                           v-model="slectdefall"
                           :props="{ value:'id' ,label:'name',children:'children'}"
                           :change-on-select="true"
                           @change="handleChange"
                           @clear="clearorg">
              </el-cascader>

            </el-form-item>

          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="24">
            <el-form-item label="指定人"
                          v-if="singleNode.focustype=='4'">
              <el-input v-model="singleNode.realName"
                        :readonly="true"
                        @click.native="userList"
                        placeholder="请选择指定人"
                        :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="指定角色"
                          v-if="singleNode.focustype=='0'|| singleNode.focustype=='6'">
              <el-select clearable
                         v-model="singleNode.roleId"
                         placeholder="请选择指定角色">
                <el-option v-for="(item,index) in roles"
                           :key="index"
                           :label="item.roleName"
                           :value="item.id"
                           @clear="clearrole">
                </el-option>
              </el-select>
            </el-form-item>

          </el-col>
        </el-row>

      </el-form>
      <span slot="footer"
            class="dialog-footer">

        <el-button style="margin-top: 12px;"
                   size="small"
                   @click="dialogaddCheck=false">取消</el-button>
        <el-button style="margin-top: 12px;"
                   size="small"
                   @click="savenode">保存</el-button>
      </span>
    </el-dialog>

    <!--***********选择人员弹出层***********-->
    <el-dialog title="选择人员"
               width="700px"
               :visible.sync="userFrom"
               :append-to-body='true'>
      <template>
        <div>
          <!--id="dialog"-->
          <userSelection @patch="userResult"
                         :users="users" />
        </div>
      </template>
    </el-dialog>
    <!--***********选择事件选项弹出层***********-->
    <el-dialog title="选择事件"
               :visible.sync="dialogeventCheck"
               width="550px">

      <el-form ref="form"
               style="display:block;"
               :label-position="labelPosition"
               :model="singleprocess"
               label-width="80px"
               size="mini">
        <el-row :gutter="12">
          <el-col :span="24">
            <el-form-item label="节点名称">
              <el-input v-model="singleNode.nodeName"
                        :disabled="true"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="12">
          <el-col :span="24">
            <el-form-item label="节点ID">
              <el-input v-model="singleNode.nodeId"
                        :disabled="true"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item label="节点跳过:">
              <el-tooltip :content="singleNode.jumpState=='1'?'启动':'禁止'"
                          placement="top">
                <el-switch v-model="singleNode.jumpState"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           active-value="1"
                           inactive-value="0">
                </el-switch>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            说明：自动后流转系统将跳过该节点
          </el-col>
        </el-row>

        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item label="短信通知:">
              <el-tooltip :content="singleNode.msgState=='0'?'打开':'禁止'"
                          placement="top">
                <el-switch v-model="singleNode.msgState"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           active-value="0"
                           inactive-value="1">
                </el-switch>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            说明：启动后系统将发送短信通知当前环节人
          </el-col>
        </el-row>

        <el-row :gutter="12">
          <el-col :span="4">
            动态事件配置：
          </el-col>
          <el-col :span="20"
                  style="border:1px solid #cdcdcd;">
            <div v-for="(item,index) in eventlist"
                 :key="index"
                 style="float:left;display:block;width:50%;padding-bottom:15px;">
              <label stype="width:70%;">{{item.name}}</label>
              <el-tooltip :content="sendmsgevent[index]!=0?'启用':'禁用'"
                          placement="top">
                <el-switch v-model="sendmsgevent[index]"
                           @click="eventchange(item,index)"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           :active-value="item.code"
                           :inactive-value=0>
                </el-switch>
              </el-tooltip>
            </div>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button style="margin-top: 12px;"
                   size="small"
                   @click="dialogeventCheck=false">取消</el-button>
        <el-button style="margin-top: 12px;"
                   size="small"
                   @click="savenode2">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userSelection from '@/components/userSelection'
import { loadavg } from 'os'

let id = 1000
export default {
  name: 'procesManage',
  components: {
    userSelection
  },
  data () {
    return {
      sendmsgevent: [], // 事件

      singleprocess: {}, // 单个流程
      singleNode: {
        nodeName: '',
        nodeId: '',
        nodeUser: '',
        processDefinitionId: ''
      }, // 单个

      options: [{
        value: '选项1',
        label: '黄金糕'
      }],

      labelPosition: 'right',
      sizeForm: {},
      active: 0,

      methData: [],
      methpageNo: 1,
      methtotalRecord: 1,
      methpageSize: 10,

      userData: [],
      userpageNo: 1,
      usertotalRecord: 1,
      userpageSize: 10,

      processData: [],
      pageNo: 1,
      totalRecord: 1,
      pageSize: 10,

      menuInfoListHeight: 100,
      selectGroups: [],
      tableData: [],
      searchInfo: {},
      data4: [{}],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      newName: '1',
      form: {},
      menuListHeight: 100,

      needParams: ['id', 'orgName', 'orgCode', 'address', 'telPhone', 'orgType', 'area', 'parentId', 'orgLevel', 'rank'],
      orgTypes: [],
      orgLevels: [],
      areaData: [],
      areaDefaultProps: {
        children: 'children',
        label: 'zhCn',
        id: 'dictValue'
      },
      dialogeventCheck: false,
      dialogAreaCheck: false,
      dialogaddCheck: false,
      userFrom: false,
      actPhoto: '',
      processType: '', // 当前选中的项
      title: '流程数据列表', // 显示的标题

      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',

      eventlist: [], // 事件列表
      actkeys: [], // 流程key
      actleixing: [], // 流程类型
      actTypes: [], // 流程分类
      business_Typs: [], // 业务类型
      loading: true,
      users: '',

      roles: [],
      orglist: [],
      slectdefall: []
    }
  },
  mounted () {
    var that = this
    let url = '/epf-supply/dictionaries/getDictsByCodeOrParentId?code=actType'
    var areaData = []
    //   this.$get(url,{}).then(res => {
    //     if (res.code === 0) {
    //       if(res.treeTableData != ''){
    //         that.areaData = res.dictionariesList;
    //         areaData = res.dictionariesList;
    //       }else{
    //         that.areaData = []
    //       }
    //     } else {
    //       that.$message.warning(res.msg)
    //     }

    //     //创建用于收集数据的集合
    //     var dictData = [];
    //     for(var i = 0;i<areaData.length;i++){
    //       var value = {id: areaData[i].dictKey,label: areaData[i].zhCn};
    //       dictData.push(value);
    //     }
    //     console.log(dictData)
    //     that.data4 = dictData;
    //     //查询列表,默认使用第一个
    //     that.queryprocess();
    //   });
  },
  created () {
    this.menuInfoListHeight = window.innerHeight - 261
    this.menuListHeight = window.innerHeight - 261
    this.buttons = JSON.parse(localStorage.getItem('procesManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')
    this.queryDictList('actType')
    this.queryDictList('actkey')
    this.queryDictList('actleixing')
    this.queryDictList('business_Type')
    this.queryfole()
    this.queryorg()
  },
  methods: {
    clearorg () {
      this.singleNode.slectdefall = []
    },
    clearrole () {
      this.singleNode.roleId = ''
    },
    roleList () {

    },
    queryDictList (code) {
      let that = this
      let url = '/epf-supply/dictionaries/getDictsByCodeOrParentId?code=' + code
      //  this.$get(url,{}).then(res => {
      //     if(res.code != 0) {
      //       that.$message.warning(res.msg)
      //       return;
      //     }
      //     if(res.dictionariesList.length != 0){
      //       if(code=='actType'){
      //         that.actTypes = res.dictionariesList;
      //         return;
      //       }
      //       if(code=='business_Type'){
      //         that.business_Typs=res.dictionariesList;
      //         return;
      //       }
      //       if(code=='actkey'){
      //         that.actkeys=res.dictionariesList;
      //         return;
      //       }
      //       if(code=='actleixing'){
      //         that.actleixing=res.dictionariesList;
      //         return;
      //       }
      //     }
      //   })
    },
    userResult (data) { // todo
      var that = this
      // 获取多个对象，只取第一个
      var ids = data.split(',')
      // 隐藏子组件
      this.userFrom = false
      // 通过ID去查询用户的信息
      that.$post('/epf-admin/user/getUserAndManages', { 'ids': data }).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        var userList = res.use
        var userName = ''
        var realName = ''
        for (var i = 0; i < userList.length; i++) {
          userName = userName + ',' + userList[i].username
          realName = realName + ',' + userList[i].realname
        }
        // 设置指定人信息
        userName = userName.substr(1)
        this.singleNode.nodeUser = userName
        // 设置昵称
        realName = realName.substr(1)
        this.singleNode.realName = realName
      })
    },
    handleCheckChange (data, checked, indeterminate) {
      var that = this
      console.log(data, checked, indeterminate)
      // 设置列表的标题
      // 设置数据
      that.processType = data.id
      // 设置标题
      that.title = data.label
      // 重新查询数据
      that.queryprocess(data.id)
    },
    // 弹出用户列表
    userList () {
      this.userFrom = true
      this.users = this.singleNode.nodeUser
    },
    queryprocess (Type) {
      this.loading = true
      this.$post('/epf-activiti/admin/process/getBpmReProcessJson', { page: this.pageNo, rows: this.pageSize, groupCode: Type }).then(res => {
        console.log('供需平台流程', res)

        this.processData = res.pager.results
        this.totalRecord = res.pager.totalRecord
        this.loading = false
      })
    },
    editevnet (obj) {
      var that = this
      var sendmsgevent = []
      that.$post('/epf-activiti/admin/taskevent/getTaskEventJson').then(res => {
        that.eventlist = res.pager.results
        if (that.eventlist != null) {
          for (var i = 0; i < that.eventlist.length; i++) {
            sendmsgevent.push(0)
          }
        }
        that.sendmsgevent = sendmsgevent
      })
      var processDefId = that.singleNode.processDefinitionId
      // 查询节点信息
      that.$post('/epf-activiti/act/task/getTaskNodeByNodeId', { nodeId: obj.id, processDefId: processDefId }).then(res => {
        if (res.taskNode != null) {
          that.singleNode = res.taskNode
          var evt = res.taskNode.taskEvent
          var evtlt = that.eventlist
          if (evt != null && evtlt != null) {
            var l = evt.split(',')
            for (var j = 0; j < evtlt.length; j++) {
              for (var i = 0; i < l.length; i++) {
                if (evtlt[j].code == l[i]) {
                  that.sendmsgevent[j] = l[i]
                }
              }
            }
          }
        } else {
          that.singleNode.nodeUser = ''
          that.singleNode.id = ''
        }

        that.singleNode.nodeName = obj.name
        that.singleNode.nodeId = obj.id

        that.dialogeventCheck = true
      })
    },
    viewInfo (obj) {
      var processDefId = this.singleNode.processDefinitionId
      // 查询节点信息
      this.$post('/epf-activiti/act/task/getTaskNodeByNodeId', { nodeId: obj.id, processDefId: processDefId }).then(res => {
        if (res.taskNode != null) {
          this.singleNode = res.taskNode
        } else {
          this.singleNode.nodeUser = ''
          this.singleNode.id = ''
        }
        this.singleNode.nodeName = obj.name
        this.singleNode.nodeId = obj.id
        var orgid = this.singleNode.designDepartment
        console.log(orgid)
        if (orgid != null) {
          var orgids = []
          var orgdt = this.orglist

          for (var i = 0; i < orgdt.length; i++) {
            if (orgdt[i].id == orgid) {
              var orgids = [orgid]
              break
            }
            if (orgdt[i].children) {
              for (var k = 0; k < orgdt[i].children.length; k++) {
                if (orgdt[i].children[k].id == orgid) {
                  var orgids = [orgdt[i].id, orgid]
                  break
                }
                if (orgdt[i].children[k].children) {
                  for (var j = 0; j < orgdt[i].children[k].children.length; j++) {
                    if (orgdt[i].children[k].children[j].id == orgid) {
                      var orgids = [orgdt[i].id, orgdt[i].children[k].id, orgid]
                      break
                    }
                  }
                }
              }
            }
          }
          this.slectdefall = orgids
        }
        this.dialogaddCheck = true
      })
    },
    methhandleSelectionChange () { },
    userhandleSelectionChange () { },
    handleSelectionChange (val) {
      this.selectGroups = val
    },
    back () {
      var index = this.active - 1
      if (index <= 0) {
        this.active = 0
      } else {
        this.active = index
      }
      this.setActiveInfo(this.active)
    },
    next () {
      var index = this.active + 1
      if (index >= 3) {
        this.active = 3
      } else {
        this.active = index
      }

      this.setActiveInfo(this.active)
    },
    setActiveInfo (active) {
      if (active == 1) { // 流程配置
        this.actPhoto = '/api/epf-activiti/act/model/deployModelResource?procDefKey=' + this.singleprocess.processKey + '&type=image&random=' + Math.random() * 10
      } else if (active == 2) { // 人员配置
        this.querytasknode()
      } else if (active == 3) { // 事件配置
        this.querytasknode()
      }
    },
    editInfo (data) {
      let temp = {        'id': '', 'processName': '', 'processKey': '', 'processSimpleName': '', 'processWechatName': '',
        'groupCode': '', 'groupCodeName': '', 'procdefName': '', 'useScope': '', 'businessType': '', 'processState': '',
        'expireTerm': '', 'processIcon': '', 'description': '', 'createBy': '', 'createTime': '', 'procdefId': '', 'processType': '', 'useScopeName': ''
      }
      this.active = 0
      temp.id = data.id
      temp.processName = data.processName
      temp.processKey = data.processKey
      temp.processSimpleName = data.processSimpleName
      temp.processWechatName = data.processWechatName
      temp.groupCode = data.groupCode
      temp.groupCodeName = data.groupCodeName
      temp.procdefName = data.procdefName
      temp.useScope = data.useScope
      temp.businessType = data.businessType
      temp.processState = data.processState
      temp.expireTerm = data.expireTerm
      temp.processIcon = data.processIcon
      temp.description = data.description
      temp.createBy = data.createBy
      temp.createTime = data.createTime
      temp.procdefId = data.procdefId
      temp.processType = data.processType
      temp.useScopeName = data.useScopeName

      this.singleprocess = temp
      this.dialogAreaCheck = true
    },
    querytasknode () {
      var that = this
      that.$post('/epf-activiti/act/task/getTaskNodeList', { page: that.userpageNo, rows: that.pageSize, procDefKey: this.singleprocess.processKey, nodeType: 'UserTask' }).then(res => {
        that.userData = res.pager.results
        that.userpageNo = res.pager.pageNo
        that.usertotalRecord = res.pager.totalRecord
        that.userpageSize = res.pager.pageSize
        that.singleNode.processDefinitionId = res.processDefId
      })
    },
    querymethtasknode () {
      var that = this
      that.$post('/epf-activiti/act/task/getTaskNodeJson', { page: that.methpageNo, rows: this.pageSize }).then(res => {
        that.methData = res.pager.results
        that.methpageNo = res.pager.pageNo
        that.methtotalRecord = res.pager.totalRecord
        that.methpageSize = res.pager.pageSize
      })
    },
    // loadTree() {
    //   this.$post('/epf-admin/admin/org/getOrgTreeForTree').then(res => {
    //       this.data4 = JSON.parse(res.ztreeJson.replace(/'/g, '"'));
    //   });
    // },
    handleCurrentChange (val) {
      var that = this
      that.pageNo = val
      this.queryprocess(that.processType)
    },
    userhandleCurrentChange (val) {
      this.userpageNo = val
      this.querytasknode()
    },
    methhandleCurrentChange (val) {
      this.methpageNo = val
      this.querymethtasknode()
    },
    handleSizeChange (val) {
      var that = this
      that.pageSize = val
      this.queryprocess(that.processType)
    },
    methhandleSizeChange (val) { this.pageSize = val; this.querytasknode() },
    userhandleSizeChange (val) { this.pageSize = val; this.querytasknode() },
    append (node, data) {
      if (!node.expanded) {
        node.expanded = true
      }
      const newChild = { id: 'newOrg', orgName: '', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    addprocess () {
      this.active = 0
      this.singleprocess = {}
      this.dialogAreaCheck = true
    },
    saveprocess () {
      var that = this
      let paramsData = that.singleprocess
      that.$post('/epf-activiti/admin/process/addProcess', paramsData).then(res => {
        if (res.code == 0) {
          that.dialogAreaCheck = false
          that.active = 0
          that.queryprocess(that.processType)
          that.$message.success('保存成功！')
        } else {
          that.$message.warning(res.msg)
        }
      })
    },
    savenode () {
      var that = this
      let paramsData = that.singleNode
      that.$post('/epf-activiti/act/task/addTaskNode', paramsData).then(res => {
        if (res.code == 0) {
          that.$message.success(res.msg)
          that.dialogeventCheck = false
          that.dialogaddCheck = false
        } else {
          that.$message.warning(res.msg)
        }
      })
    },
    savenode2 () {
      var that = this
      var events = ''
      for (var i = 0; i < that.sendmsgevent.length; i++) {
        if (that.sendmsgevent[i] != 0) {
          if (events != '') {
            events += ',' + that.sendmsgevent[i]
          } else {
            events += that.sendmsgevent[i]
          }
        }
      }
      let paramsData = that.singleNode
      paramsData['taskEvent'] = events
      that.$post('/epf-activiti/act/task/addTaskNode', paramsData).then(res => {
        if (res.code == 0) {
          that.$message.success(res.msg)
          that.dialogeventCheck = false
          that.dialogaddCheck = false
        } else {
          that.$message.warning(res.msg)
        }
      })
    },
    deleteprocess () {
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
        that.$post('/epf-activiti/admin/process/deleteProcess', { id: ids }).then(res => {
          if (res.code != '0') {
            that.$message({ type: 'faill', message: '删除失败!' })
            return
          }
          that.queryprocess(that.processType)
          that.$message({ type: 'success', message: '删除成功!' })
          // that.getRoleList(that.searchInfo);
        })
      }).catch(() => {
        that.$message({ type: 'info', message: '已取消删除' })
      })
    },
    focuschange (dt) {
      if (dt == '0') {
        this.singleNode.realName = ''
        this.singleNode.designDepartment = ''
      } else if (dt == '1' || dt == '2') {
        this.singleNode.roleId = ''
        this.singleNode.realName = ''
        this.singleNode.designDepartment = ''
      } else if (dt == '3' || dt == '4') {
        this.singleNode.roleId = ''
        this.singleNode.designDepartment = ''
      } else if (dt == '5') {
        this.singleNode.realName = ''
        this.singleNode.designDepartment = ''
      }
      this.singleNode.focustype = dt
    },
    handleChange (value) {
      console.log(value)
      this.singleNode.designDepartment = value[value.length - 1]
      console.log(this.singleNode.designDepartment)
    },
    queryfole () {
      var that = this
      that.$post('/epf-admin/admin/role/getAllList').then(res => {
        if (res.code == 0) {
          that.roles = res.rolelist
        } else {
          that.$message.warning(res.msg)
        }
      })
    },
    queryorg () {
      var that = this
      that.$get('/epf-admin/admin/org/getOrgTreeForTree').then(res => {
        that.orglist = []
        var arr = []
        that.orglist = arr.concat([{ 'id': '', 'name': '请选择' }], JSON.parse(res.ztreeJson.replace(/'/g, '"')))
      })
    }

    // queryDictList (){
    //   let that = this
    //   let url = '/epf-admin/admin/dictionaries/getTreeTableDatas';
    //   let data = {'code': 'actType', 'parentId': '0'};
    //   /**
    //    * data4: [
    //    {id: 1,label: '供需平台流程'},{id: 2,label: '交易系统流程'},{id: 3,label: '合同网签备案流程'}
    //    ],
    //    */
    //   var areaData = [];
    //   this.$get(url,data).then(res => {
    //       if (res.code === 0) {
    //
    //           if(res.treeTableData != ''){
    //               that.areaData = JSON.parse(res.treeTableData);
    //             areaData = JSON.parse(res.treeTableData);
    //           }else{
    //               that.areaData = []
    //           }
    //       } else {
    //           that.$message.warning(res.msg)
    //       }
    //
    //       //创建用于收集数据的集合
    //       // var dictData = [];
    //       for(var i = 0;i<areaData.length;i++){
    //         // var value = "{id: '"+areaData[i].dictValue+"',label: '"+areaData[i].zhCn+"'}";
    //         var value = "{id:"+i+",label: '"+areaData[i].zhCn+"'}";
    //         that.data4.push(value);
    //       }
    //       // that.data4 = dictData;
    //   });
    // }
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

