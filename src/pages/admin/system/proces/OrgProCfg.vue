<template>
  <div id="orgManage">
    <el-container>
      <el-aside width="300px"
                style="padding-top:10px;padding-left:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">机构-流程配置
          </el-header>
          <el-main :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
            <el-tree :data="data4"
                     v-loading="loading"
                     element-loading-text="数据加载中"
                     element-loading-background="rgba(255, 255, 255,0.95)"
                     :props="defaultProps"
                     node-key="id"
                     @check-change="loadOrgProTableData"
                     :expand-on-click-node="false"
                     class="orgManange_List"
                     draggable
                     show-checkbox>
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-main style="margin-left:15px;padding-top:10px;padding-right:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">业务-流程配置
          </el-header>
          <div>
            <div class="filter_wrap">
              <!-- 搜索 -->
              <div class="switchHeight_box">
                <el-row :gutter="2">

                </el-row>
                <el-row style="margin-top:10px;margin-bottom:10px;">
                  <el-col :span="6"
                          :offset="1">
                    <div class="btnBox">
                      <div class="button_bg"
                           @click="add"
                           style="margin:0;">新增</div>
                      <div class="button_border"
                           @click="searchData">查询</div>
                      <div class="button_default"
                           @click="resetFilter"
                           style="margin:0;">重置</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-table :data="tableData"
                        style="width: 100%"
                        border
                        v-loading="loading"
                        element-loading-text="数据加载中"
                        element-loading-background="rgba(255, 255, 255,0.95)">
                <el-table-column prop="number"
                                 label="序号"
                                 min-width="50"
                                 align="center">
                  <template slot-scope="scope">
                    <span style="text-align:center;cursor:pointer;">{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="机构名称"
                                 min-width="180"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.orgName }}
                  </template>
                </el-table-column>
                <el-table-column label="业务名称"
                                 min-width="180"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.buiName }}
                  </template>
                </el-table-column>
                <el-table-column label="业务标识"
                                 min-width="180"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.buiCode }}
                  </template>
                </el-table-column>
                <el-table-column label="流程名称"
                                 min-width="180"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.proName }}
                  </template>
                </el-table-column>
                <el-table-column label="流程标识"
                                 min-width="180"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.proCode }}
                  </template>
                </el-table-column>
                <el-table-column label="启用状态"
                                 min-width="180"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.state=='1'?'启用':'禁用'}}
                  </template>
                </el-table-column>
                <el-table-column label="操作"
                                 align="center"
                                 width="160">
                  <template slot-scope="scope">
                    <!----------------- 编辑 ----------------->
                    <el-button size="mini"
                               type="primary"
                               plain
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <!----------------- 删除 ----------------->
                    <el-popover :ref="`popover2-${scope.$index}`"
                                placement="top"
                                width="170"
                                trigger="click">
                      <p style="font-size:14px;text-align:center;font-weight:800;">确定要删除该信息吗?</p>
                      <div style="text-align:center;margin-top:10px;">
                        <el-button size="mini"
                                   type="info"
                                   plain
                                   @click="scope._self.$refs[`popover2-${scope.$index}`].doClose()">取消
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   @click="delOneData(scope.$index, scope.row)">确定</el-button>
                      </div>
                      <el-button slot="reference"
                                 size="mini"
                                 plain
                                 type="danger">删除</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页控件 -->
              <div style="text-align:right;margin:8px 0px;margin-top:15px;">
                <el-pagination background
                               layout="prev, pager, next,sizes,jumper"
                               :page-sizes="[5,10, 15, 20]"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :total="totalRecord"
                               :page-size="pageSize"
                               :current-page="pageNo">
                </el-pagination>
              </div>
            </div>
            <!-- 新增弹窗 -->
            <el-dialog title="新增"
                       class="companyInfo"
                       width="500px"
                       :visible.sync="addPopup"
                       :append-to-body='true'>
              <div class="middleBox">
                <el-form :model="wfBusproConf"
                         :rules="rules"
                         ref="wfBusproConf"
                         label-width="80px"
                         label-position="left"
                         size="small">
                  <el-form-item label="业务名称"
                                prop="buiName">
                    <el-select v-model="wfBusproConf.buiName"
                               placeholder="业务名称"
                               @change="buiNameChanged">
                      <el-option v-for="item in businessType"
                                 :ref="item.zhCn"
                                 :dictKey="item.dictKey"
                                 :id="item.id"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="业务标识"
                                prop="buiCode">
                    <el-input v-model="wfBusproConf.buiCode"
                              :disabled="true"
                              style="width: 215px;"
                              clearable
                              :maxlength="50"></el-input>
                  </el-form-item>
                  <el-form-item label="流程名称"
                                prop="proName">
                    <el-select v-model="wfBusproConf.proName"
                               placeholder="流程名称"
                               @change="proNameChanged">
                      <el-option v-for="item in processModels"
                                 :ref="item.zhCn"
                                 :dictKey="item.dictKey"
                                 :id="item.id"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="流程标识"
                                prop="proCode">
                    <el-input v-model="wfBusproConf.proCode"
                              :disabled="true"
                              style="width: 215px;"
                              clearable
                              :maxlength="50"></el-input>
                  </el-form-item>
                  <el-form-item label="启用状态"
                                prop="state">
                    <el-radio v-model="wfBusproConf.state"
                              label="1">启用</el-radio>
                    <el-radio v-model="wfBusproConf.state"
                              label="0">禁用</el-radio>
                  </el-form-item>
                </el-form>
              </div>
              <div class="middleBox_btn"
                   style="text-align:center;">
                <div class="button_default"
                     @click="addPopup = false">取消</div>
                <div class="button_bg"
                     @click="addData">确认</div>
              </div>
            </el-dialog>
            <!-- 编辑弹窗 -->
            <el-dialog title="编辑"
                       class="companyInfo"
                       width="500px"
                       :visible.sync="editorPopup"
                       :append-to-body='true'>
              <div class="middleBox">
                <el-form :model="wfBusproConf"
                         :rules="rules"
                         ref="wfBusproConf"
                         label-width="80px"
                         size="small">
                  <el-form-item label="业务名称"
                                prop="buiName"
                                style="width: 215px;">
                    <el-select v-model="wfBusproConf.buiName"
                               placeholder="业务名称"
                               @change="buiNameChanged">
                      <el-option v-for="item in businessType"
                                 :ref="item.zhCn"
                                 :dictKey="item.dictKey"
                                 :id="item.id"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="业务标识"
                                prop="buiCode"
                                style="width: 215px;">
                    <el-input v-model="wfBusproConf.buiCode"
                              clearable
                              :disabled="true"
                              :maxlength="50"></el-input>
                  </el-form-item>
                  <el-form-item label="流程名称"
                                prop="proName"
                                style="width: 215px;">
                    <el-select v-model="wfBusproConf.proName"
                               placeholder="流程名称"
                               @change="proNameChanged">
                      <el-option v-for="item in processModels"
                                 :ref="item.zhCn"
                                 :dictKey="item.dictKey"
                                 :id="item.id"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="流程标识"
                                prop="proCode"
                                style="width: 215px;">
                    <el-input v-model="wfBusproConf.proCode"
                              clearable
                              :disabled="true"
                              :maxlength="50"></el-input>
                  </el-form-item>
                  <el-form-item label="启用状态"
                                prop="state">
                    <el-radio v-model="wfBusproConf.state"
                              label="1">启用</el-radio>
                    <el-radio v-model="wfBusproConf.state"
                              label="0">禁用</el-radio>
                  </el-form-item>
                </el-form>
              </div>
              <div style="text-align:center;margin-top:10px;">
                <el-button size="mini"
                           type="info"
                           plain
                           @click="editorPopup = false">取消</el-button>
                <el-button size="mini"
                           type="success"
                           @click="editorSubmit('wfBusproConf')">确定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import qs from 'qs'
import selectInput from '@/components/common/form/selectInpt'

export default {
  name: 'OrgProCfg',
  components: { selectInput },
  data () {
    return {
      data4: [],
      loading: true,
      defaultProps: { children: 'children', label: 'name' },
      newName: '1',
      menuListHeight: 100,
      orgTypes: [],
      orgLevels: [],
      areaData: [],
      dialogAreaCheck: false,
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',
      dialogForm: false,
      actInfo: {},
      landRes: '',
      useRes: '',
      filterData: {},
      tableData: [],
      orgArray: [], // 选择的机构ID
      rules: {
        buiName: [{ required: true, message: '业务名称不能为空', trigger: 'blur' }],
        proName: [{ required: true, message: '流程名称不能为空', trigger: 'blur' }],
        state: [{ required: true, message: '启用状态：0-禁用，1-启用不能为空', trigger: 'blur' }]
      },
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      addPopup: false, //  控制新增弹窗
      editorPopup: false, //  控制编辑弹窗
      currentEditorIndex: 0, //  当前选中编辑的下表
      loading: true, // 控制loading动画显示隐藏
      wfBusproConf: {},
      searchInfo: {},
      businessType: [], // 业务类型
      processModels: []// 流程数据字典
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 261
    this.buttons = JSON.parse(localStorage.getItem('orgManage'))
    this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
    this.theme_TextColor = localStorage.getItem('theme_TextColor')
    this.loadTree()
    this.queryareatList()
    this.queryDictList('org_level')
    this.queryDictList('org_type')
    this.queryDictList('business_Type')
    this.queryProcessModels()
    this.pageSize = 5
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = 5
    this.getList()
  },
  methods: {
    loadTree: function () {
      this.loading = true
      this.$get('/epf-admin/admin/org/getOrgTreeForTree').then(res => {
        this.data4 = JSON.parse(res.ztreeJson.replace(/'/g, '"'))
        this.loading = false
      })
    },
    rowClickHandle: function (row, event, column) {
    },
    queryareatList: function () {
      var that = this
      that.$get('/epf-admin/admin/regionals/getRegionalTree').then(res => {
        if (res.code === 0) {
          if (res.treeTableData != '') {
            that.areaData = res.dataTree
          } else {
            that.areaData = []
          }
        } else {
          that.$message.warning(res.msg)
        }
      })
    },
    queryDictList: function (code) {
      var that = this
      that.$get('/epf-admin/admin/dictionaries/getDictEbyDictGroup/' + code).then(res => {
        if (res.code === 0) {
          if (code == 'org_level') {
            if (res.dictionariesList != null) {
              that.orgLevels = res.dictionariesList
            } else {
              that.orgLevels = []
            }
          } else if (code == 'org_type') {
            if (res.dictionariesList != null) {
              that.orgTypes = res.dictionariesList
            } else {
              that.orgTypes = []
            }
          } else if (code == 'business_Type') {
            if (res.dictionariesList != null) {
              that.businessType = res.dictionariesList
            } else {
              that.businessType = []
            }
          }
        } else {
          that.$message.warning(res.msg)
        }
      })
    },
    queryProcessModels: function () {
      var that = this
      that.$get('/epf-activiti/wfbusproconf/queryProcessTree').then(res => {
        if (res.code === 0) {
          that.processModels = res.processTree
        } else {
          that.$message.warning(res.msg)
        }
      })
    },
    buiNameChanged: function (item, event) {
      let that = this
      if (typeof item !== 'undefined') {
        that.businessType.forEach(function (dict) {
          if (item == dict.zhCn) {
            that.wfBusproConf['buiCode'] = dict.dictValue
            that.wfBusproConf['buisId'] = dict.id
          }
        })
      }
    },
    proNameChanged: function (item, event) {
      let that = this
      if (typeof item !== 'undefined') {
        that.processModels.forEach(function (dict) {
          if (item == dict.zhCn) {
            that.wfBusproConf['proCode'] = dict.dictValue
            that.wfBusproConf['procId'] = dict.id
          }
        })
      }
    },
    actResult: function () {

    },
    no_handleSizeChange (val) {
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = val
      this.searchInfo['publishStatus'] = 'audit' // 待处理
      this.getTransferPlace(this.searchInfo)
    },
    no_handleCurrentChange (val) {
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.no_pageSize
      this.searchInfo['publishStatus'] = 'audit' // 待处理
      this.getTransferPlace(this.searchInfo)
    },
    add () {
      let that = this
      if (that.orgArray.length > 0) {
        this.addPopup = true
        this.wfBusproConf = { 'state': '1' }
      } else {
        that.$message.error('未选择机构!')
      }
    },
    addData: function (wfBusproConf) {
      let that = this
      if (that.wfBusproConf != null) {
        that.$post('/epf-activiti/wfbusproconf/addWfBusproConf', {
          'wfBusproConf': JSON.stringify(that.wfBusproConf),
          'orgs': JSON.stringify(that.orgArray)
        }).then(res => {
          if (res.code != '0') {
            that.$message.error(res.msg)// 失败
            return
          }
          this.addPopup = false
          that.wfBusproConf = {}
          this.$message.success('成功新增' + that.orgArray.length + '条数据!')
          this.getList()
        })
      } else {
        return false
      }
    },
    searchData () {
      var that = this
      var json = {}
      var filters = JSON.stringify(json)
      that.searchInfo['filterData'] = filters
      that.getList()
    },
    resetFilter () {
      this.filterData = {}
      var that = this
      var json = {}
      var filters = JSON.stringify(json)
      that.searchInfo['filterData'] = filters
      that.getList()
    },
    handleEdit (index, row) {
      this.currentEditorIndex = index
      var id = row.id
      this.getObject(id)
      this.editorPopup = true
    },
    editorSubmit (wfBusproConf) {
      var that = this
      this.$refs[wfBusproConf].validate((valid) => {
        if (valid) {
          that.$post('/epf-activiti/wfbusproconf/editWfBusproConf', that.wfBusproConf).then(res => {
            if (res.code != '0') {
              that.$message.error(res.msg)// 失败
              return
            }
            this.editorPopup = false
            this.$refs[wfBusproConf].resetFields()
            this.$message.success('修改成功!')
            this.getList()
          })
        } else {
          return false
        }
      })
    },
    delOneData (index, row) {
      var that = this
      that.$post('/epf-activiti/wfbusproconf/deleteWfBusproConf', { id: row.id }).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        this.$message.success('删除成功!')
        this.$refs[`popover2-${index}`].doClose()
        this.getList()
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.searchInfo['page'] = val
      this.pageNo = val
      this.searchInfo['rows'] = this.pageSize
      this.getList()
    },
    getList: function () {
      let that = this
      that.$post('/epf-activiti/wfbusproconf/getWfBusproConfJson', this.searchInfo).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        that.tableData = res.pager.results
        that.totalRecord = res.pager.totalRecord
        that.totalPage = res.pager.totalPage
        this.loading = false
      })
    },
    getObject (id) {
      var that = this
      that.$post('/epf-activiti/wfbusproconf/getWfBusproConf', { id: id }).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        this.wfBusproConf = {}
        this.wfBusproConf = res.wfBusproConf
      })
    },
    loadOrgProTableData: function (data, checked, indeterminate) {
      let that = this
      let afterOrgArray = []
      if (checked) {
        if (typeof data !== 'undefined') {
          let orgObj = {}
          orgObj['id'] = data.id
          orgObj['isParent'] = data.isParent
          orgObj['name'] = data.name
          that.orgArray.push(orgObj)
        }
      } else {
        that.orgArray.forEach(function (org) {
          let id = data.id
          if (org.id != id) {
            afterOrgArray.push(org)
          }
        })
        that.orgArray = afterOrgArray
      }
      that.searchInfo['params'] = JSON.stringify(that.orgArray)
      // 点击右左边的树，刷新右边列表数据
      that.pageSize = 5
      that.searchInfo['page'] = this.pageNo
      that.searchInfo['rows'] = 5
      that.getList()
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
