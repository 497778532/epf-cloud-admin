<template>

  <el-container style="height: 100%;padding:10px;">
    <el-container>
      <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                 class="m_title">字典分组</el-header>
      <div style=" background: rgb(224, 224, 224);text-align:left;height:50px;line-height:50px;">
        <span style="float:left;width:150px;height:32px;margin-left:2px">
          <!-- v-for="(button ,index)  in buttons" :key="index" -->
          <el-button size="small"
                     class="btn-sty leftl"
                     @click="deleteData">删除</el-button>
          <el-button size="small"
                     class="btn-sty leftl"
                     @click="showUpdate">修改</el-button>
          <el-button size="small"
                     class="btn-sty leftl"
                     @click="showAdd">添加</el-button>
          <!-- v-if="button.resourceId=='dictgrp_delete'"
        v-if="button.resourceId=='dictgrp_edit'"
        v-if="button.resourceId=='dictgrp_add'"     -->
        </span>
        <!---wsz------------>
        <div style="float:left;width:180px;height:32px;padding:0 0 0 0;margin-left:3px;background:rgb(224, 224, 224);">
          <el-input placeholder="请输入内容"
                    v-model="searchData"
                    size="mini"
                    class="input-with-select noSelect"
                    clearable
                    highlight-current
                    :maxlength="50">
            <el-button slot="append"
                       @click="init">搜索</el-button>
          </el-input>

        </div>
        <!---wsz--------------->

      </div>
      <el-main width="330px">
        <el-table :data="dictGroups"
                  @row-click="dictList"
                  :height="menuListHeight+'px'"
                  style="cursor: pointer;"
                  tooltip-effect="dark"
                  @selection-change="handleSelectionChange"
                  :highlight-current-row="true">
          <el-table-column type="selection"
                           style="cursor: pointer;"
                           width="50">
          </el-table-column>
          <el-table-column property="code"
                           label="分组标识"
                           width="170">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column property="name"
                           label="分组名称"
                           width="110">
          </el-table-column>
        </el-table>
        <!-- 添加分组 -->
        <el-dialog title="添加分组"
                   :visible.sync="dialogFormVisible">
          <el-form :model="group"
                   :rules="rules"
                   ref="group">
            <el-form-item label="分组标识"
                          prop="code"
                          :label-width="formLabelWidth">
              <el-input v-model="group.code"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="分组名称"
                          prop="name"
                          :label-width="formLabelWidth">
              <el-input v-model="group.name"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="insert">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改分组 -->
        <el-dialog title="修改分组"
                   :visible.sync="dialogUpdate">
          <el-form :model="group"
                   :rules="rules"
                   ref="group">
            <el-form-item label="分组标识"
                          prop="code"
                          :label-width="formLabelWidth">
              <el-input v-model="group.code"
                        :disabled="true"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="分组名称"
                          prop="name"
                          :label-width="formLabelWidth">
              <el-input v-model="group.name"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogUpdate = false">取 消</el-button>
            <el-button type="primary"
                       @click="editGroup">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
    <el-container style="margin-left:1%;">
      <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                 class="m_title">字典列表</el-header>
      <div style="padding: 6p x 22px; background: rgb(224, 224, 224);">
        <span>
          <!-- v-for="(button ,index)  in buttons" :key="index" -->
          <el-button size="small"
                     class="btn-sty"
                     @click="deleteDict">删除</el-button>
          <el-button size="small"
                     class="btn-sty"
                     @click="showDict">修改</el-button>
          <el-button size="small"
                     class="btn-sty"
                     @click="showAddDict">添加</el-button>
          <!-- v-if="button.resourceId=='dict_delete'"
        v-if="button.resourceId=='dict_edit'"
        v-if="button.resourceId=='dict_add'"     -->
        </span>
      </div>
      <el-main>
        <!-- <tree-table :data="data" :columns="columns" @selectId="checkDict" v-if="refIsCheck==true" ref="tree-table"/> -->
        <el-table :data="data"
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  :height="menuListHeight+'px'"
                  style="width: 100%;margin:0 0 20px 0;"
                  tooltip-effect="dark"
                  border
                  @selection-change="handleSelectionChange1"
                  :highlight-current-row="true"
                  row-key="id">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="dictKey"
                           label="字典Key"
                           sortable
                           width="180">
          </el-table-column>
          <el-table-column prop="dictValue"
                           label="字典Value"
                           sortable
                           width="180">
          </el-table-column>
          <el-table-column prop="zhCn"
                           label="中文名称">
          </el-table-column>
          <el-table-column prop="enUs"
                           label="英文名称">
          </el-table-column>
          <el-table-column prop="dictOrder"
                           label="排序">
          </el-table-column>

        </el-table>

        <!-- 添加字典 -->
        <el-dialog title="添加字典"
                   :visible.sync="dialogAddDict">
          <el-form :model="dict"
                   :rules="rulesTwo"
                   ref="dict">
            <el-form-item label="字典key"
                          prop="dictKey"
                          :label-width="formLabelWidth">
              <el-input v-model="dictKey"
                        :disabled="true"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="字典value"
                          prop="dictValue"
                          :label-width="formLabelWidth">
              <el-input v-model="dict.dictValue"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="中文名称"
                          prop="zhCn"
                          :label-width="formLabelWidth">
              <el-input v-model="dict.zhCn"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="英文名称"
                          prop="enUs"
                          :label-width="formLabelWidth">
              <el-input v-model="dict.enUs"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="排序"
                          :label-width="formLabelWidth">
              <el-input type="number"
                        v-model="dict.dictOrder"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="父节点"
                          :label-width="formLabelWidth">
              <el-input v-model="parentName"
                        :disabled="true"
                        style="float:left; width:90%"
                        :maxlength="50"></el-input>
              <el-button @click="checkParent"
                         style="float:left; width:10%">选择</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogAddDict = false">取 消</el-button>
            <el-button type="primary"
                       @click="addDict">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 修改字典 -->
        <el-dialog title="修改字典"
                   :visible.sync="dialogEditDict">
          <!-- 选择父节点 -->
          <el-dialog title="选择父节点"
                     :visible.sync="dialogParentCheck"
                     append-to-body>
            <el-form>
              <el-tree :data="data"
                       :props="defaultProps"
                       node-key="id"
                       @node-click="handleNodeClick"
                       :expand-on-click-node="false">
              </el-tree>
            </el-form>
          </el-dialog>

          <el-form :model="dict"
                   :rules="rulesTwo"
                   ref="dict">
            <el-form-item label="字典key"
                          prop="dictKey"
                          :label-width="formLabelWidth">
              <el-input v-model="dict.dictKey"
                        :disabled="true"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="字典value"
                          prop="dictValue"
                          :label-width="formLabelWidth">
              <el-input v-model="dict.dictValue"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="中文名称"
                          prop="zhCn"
                          :label-width="formLabelWidth">
              <el-input v-model="dict.zhCn"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="英文名称"
                          prop="enUs"
                          :label-width="formLabelWidth">
              <el-input v-model="dict.enUs"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="排序"
                          :label-width="formLabelWidth">
              <el-input v-model="dict.dictOrder"
                        auto-complete="off"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="父节点"
                          :label-width="formLabelWidth">
              <el-input v-model="parentName"
                        :disabled="true"
                        style="float:left; width:90%"
                        :maxlength="50"></el-input>
              <el-button @click="checkParent"
                         style="float:left; width:10%">选择</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogEditDict = false">取 消</el-button>
            <el-button type="primary"
                       @click="editDict">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Bus from '@/utils/bus.js'
export default {
  name: 'dictManager',
  components: {},
  data () {
    return {
      rules: {
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入分组标识', trigger: 'blur' }
        ]
      },
      rulesTwo: {
        dictKey: [
          { required: true, message: '请输入字典key', trigger: 'blur' }
        ],
        dictValue: [
          { required: true, message: '请输入字典value', trigger: 'blur' }
        ],
        zhCn: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        enUs: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ]
      },
      menuListHeight: 100,
      dialogFormVisible: false,
      dialogUpdate: false,
      dialogAddDict: false,
      dialogEditDict: false,
      dialogParent: false,
      dialogParentCheck: false,
      group: { 'code': '', 'name': '' },
      dictGroups: [],
      selectGroups: [],
      selectDicts: [],
      formLabelWidth: '120px',
      groupId: '',
      code: '',
      dict: {},
      data: [],
      restaurants: [],
      parentName: '',
      parentId: '0',

      refIsCheck: false,
      dictKey: '',

      defaultProps: {
        children: 'children',
        label: 'zhCn',
        id: 'dictValue'
      },
      // 按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: '',
      loading: false,
      searchData: ''
    }
  },
  mounted () {
    this.init()
    this.$bus.$on('themChange', val => {
      this.theme_BackgroundColor = val.menuBackgroundColor
      this.theme_TextColor = val.textColor
    })
  },
  created () {
    this.menuListHeight = window.innerHeight - 290
  },
  methods: {
    createKey () {
      let that = this
      let code = this.code
      let dict = {}
      var url = '/api/epf-admin/admin/dictionaries/getDictKey/' + code
      let data = new FormData()
      axios
        .get(url, data)
        .then(res => {
          if (res.code === 0) {
            that.dictKey = res.dictKey
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          this.$message.warning(res.msg)
        })
    },
    init () {
      this.buttons = JSON.parse(localStorage.getItem('dictManager'))
      this.theme_BackgroundColor = localStorage.getItem('theme_BackgroundColor')
      this.theme_TextColor = localStorage.getItem('theme_TextColor')
      // ------------------

      let that = this
      var url = '/epf-admin/admin/dictionaries/selectGroup'
      let data = new FormData()
      data.append('keyword', that.searchData)// 参数传递的方法
      console.log('that.searchData =====' + that.searchData)
      this.$useAppend(url, data)
        .then(res => {
          // debugger
          if (res.code === 0) {
            that.dictGroups = res.dictGroupList//
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          this.$message.warning(res.msg)
        })
      // dictList (row);//即初始化或者点击的时候将row设置为空
      this.queryDictList('aaaaa')
    },
    insert () {
      let that = this
      var url = '/epf-admin/admin/dictGroup/addDictGroup'
      if (this.group.code == '' || this.group.code == null) {
        this.$message.warning('请输入分组标识')
        return
      }
      if (this.group.name == '' || this.group.name == null) {
        this.$message.warning('请输入分组名称')
        return
      }
      let dictGroup = { 'code': this.group.code, 'name': this.group.name }
      this.$post(url, dictGroup)
        .then(res => {
          if (res.code === 0) {
            this.groupId = res.group.id
            this.code = res.group.code
            this.$message.success('保存成功!')
            that.dialogFormVisible = false
          } else {
            this.$message.error(res.msg)
            that.dialogFormVisible = false
          }
        })
        .catch(res => { })
      this.dictGroups.push(this.group)
    },
    dictList (row) {
      if (row.id) {
        this.groupId = row.id
      }
      this.code = row.code
      let code = row.code
      this.refIsCheck = true
      this.queryDictList(code)
    },
    queryDictList (code) {
      this.data = []
      this.loading = true
      let that = this
      let url = '/epf-admin/admin/dictionaries/getTreeTableDatas'
      let data = { 'code': code, 'parentId': '' }
      this.$get(url, data)
        .then(res => {
          if (res.code === 0) {
            if (res.treeTableData != '') {
              that.data = JSON.parse(res.treeTableData)
              this.loading = false
            } else {
              that.data = []
              this.loading = false
            }
          } else {
            that.$message.warning(res.msg)
            this.loading = false
          }
        })
    },
    showAdd () {
      this.group = {}
      this.dialogFormVisible = true
    },
    handleSelectionChange (val) {
      this.selectGroups = val
    },
    deleteData () {
      let that = this
      if (this.selectGroups.length < 1) {
        this.$message.warning('请选择要删除的数据！')
        return
      } else {
        let ids = ''
        for (var i = 0; i < this.selectGroups.length; i++) {
          ids += this.selectGroups[i].id + ','
        }
        let url = '/epf-admin/admin/dictGroup/deleteDictGroup'
        let data = { 'id': ids }
        this.$confirm('确定要删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'
        }).then(() => {
          that.$post(url, data)
            .then(res => {
              if (res.code === 0) {
                that.$message.success('删除成功!')
                that.init()
              } else {
                that.$message.error(res.msg)
              }
            })
        }).catch(() => { })
      }
    },
    showUpdate () {
      if (this.selectGroups.length < 1) {
        this.$message.warning('请选择要修改的数据！')
        return
      } else if (this.selectGroups.length > 1) {
        this.$message.warning('不能同时进行多条数据修改，请选择一条！')
        return
      } else {
        this.group = {}
        let id = ''
        if (this.selectGroups[0].id) {
          id = this.selectGroups[0].id
        } else {
          id = this.groupId
        }
        this.queryGroup(id)
        this.dialogUpdate = true
      }
    },
    editGroup () {
      let that = this
      var url = '/epf-admin/admin/dictGroup/editDictGroup'
      if (this.group.code == '' || this.group.code == null) {
        this.$message.warning('请输入分组标识')
        return
      }
      if (this.group.name == '' || this.group.name == null) {
        this.$message.warning('请输入分组名称')
        return
      }
      let id = ''
      if (this.selectGroups[0].id) {
        id = this.selectGroups[0].id
      } else {
        id = this.groupId
      }
      let dictGroup = { 'id': id, 'code': this.group.code, 'name': this.group.name }
      this
        .$post(url, dictGroup)
        .then(res => {
          if (res.code === 0) {
            that.$message.success('保存成功!')
            that.dialogUpdate = false
            that.init()
          } else {
            that.$message.error(res.msg)
            that.dialogUpdate = false
          }
        })
        .catch(res => { })
    },
    queryGroup (id) {
      let that = this
      var url = '/epf-admin/admin/dictGroup/info/' + id
      this.$get(url)
        .then(res => {
          if (res.code === 0) {
            that.group = res.dictGroup
          } else {
            that.$message.warning(res.msg)
          }
        })
        .catch(res => {
          console.log(res)
          that.$message.warning(res.msg)
        })
    },
    showAddDict () {
      if (this.code == '' || this.code == null) {
        this.$message.warning('请选择字典组！')
        return false
      }
      this.createKey()
      this.queryDictList(this.code)
      this.dict = {}
      this.parentName = ''
      this.parentId = '0'
      this.dialogAddDict = true
    },
    addDict () {
      let groupId = this.groupId
      let that = this
      var url = '/epf-admin/admin/dictionaries/addDictionaries'
      if (this.dict.dictValue == '' || this.dict.dictValue == null) {
        this.$message.warning('请输入字典值')
        return
      }
      if (this.dict.zhCn == '' || this.dict.zhCn == null) {
        this.$message.warning('请输入字典中文名称')
        return
      }
      if (this.dict.enUs == '' || this.dict.enUs == null) {
        this.$message.warning('请输入字典英文名称')
        return
      }
      let dict = { 'dictKey': this.dictKey, 'dictValue': this.dict.dictValue, 'zhCn': this.dict.zhCn, 'enUs': this.dict.enUs, 'groupId': groupId, 'parentId': this.parentId, dictOrder: this.dict.dictOrder }
      this.$post(url, dict)
        .then(res => {
          if (res.code === 0) {
            that.$message.success('保存成功!')
            that.dialogAddDict = false
            that.queryDictList(that.code)
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          console.log(res)
          that.$message.warning(res.msg)
        })
      this.data.push(this.dict)
    },
    handleSelectionChange1 (val) {
      this.selectDicts = val
    },
    deleteDict () {
      let that = this
      let idArray = this.selectDicts
      if (idArray.length < 1) {
        this.$message.warning('请选择要删除的数据！')
        return
      }
      let ids = ''
      for (var i = 0; i < idArray.length; i++) {
        ids += idArray[i].id + ','
      }
      let url = '/epf-admin/admin/dictionaries/deleteDictionaries'
      let data = { 'id': ids }
      this.$confirm('确定要删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      }).then(() => {
        that.$post(url, data).then(res => {
          if (res.code === 0) {
            that.$message.success('删除成功!')
            that.queryDictList(that.code)
          } else {
            that.$message.error(res.msg)
          }
        })
      }).catch(() => { })
    },
    showDict () {
      let idArray = this.selectDicts
      if (idArray.length < 1) {
        this.$message.warning('请选择要修改的数据！')
        return
      } else if (idArray.length > 1) {
        this.$message.warning('不能同时进行多条数据修改，请选择一条！')
        return
      } else {
        this.dict = {}
        let id = this.selectDicts[0].id
        let parentId = this.selectDicts[0].parentId
        this.queryDict(id)
        if (parentId === '0') {
          this.parentId = '0'
          this.parentName = ''
        } else {
          this.queryParentDict(parentId)
        }
        this.dialogEditDict = true
      }
    },
    editDict () {
      let that = this
      var url = '/epf-admin/admin/dictionaries/editDictionaries'
      if (this.dict.dictValue == '' || this.dict.dictValue == null) {
        this.$message.warning('请输入字典值')
        return
      }
      if (this.dict.zhCn == '' || this.dict.zhCn == null) {
        this.$message.warning('请输入字典中文名称')
        return
      }
      if (this.dict.enUs == '' || this.dict.enUs == null) {
        this.$message.warning('请输入字典英文名称')
        return
      }
      let dict = { 'id': this.selectDicts[0].id, 'dictKey': this.dict.dictKey, 'dictValue': this.dict.dictValue, 'zhCn': this.dict.zhCn, 'enUs': this.dict.enUs, 'parentId': this.parentId, dictOrder: this.dict.dictOrder }
      this
        .$post(url, dict)
        .then(res => {
          if (res.code === 0) {
            that.$message.success('保存成功!')
            that.dialogEditDict = false
            that.queryDictList(that.code)
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    queryDict (id) {
      let that = this
      var url = '/epf-admin/admin/dictionaries/info/' + id
      this
        .$get(url)
        .then(res => {
          if (res.code === 0) {
            that.dict = res.dictionaries
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    queryParentDict (parentId) {
      let that = this
      var url = '/epf-admin/admin/dictionaries/info/' + parentId
      this
        .$get(url)
        .then(res => {
          if (res.code === 0) {
            that.parentName = res.dictionaries.zhCn
            that.parentId = res.dictionaries.id
          } else {
            that.$message.error(res.msg)
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },

    handleNodeClick (data) {
      this.parentId = data.id
      this.parentName = data.zhCn
      this.dialogParentCheck = false
    },

    checkParent () {
      this.dialogParentCheck = true
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.caret-wrapper {
  height: 23px !important;
}
.m_title {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 30px;
  background: rgb(50, 58, 64);
  color: #fff;
  font-size: 16px;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
tr,
th {
  text-align: center;
}
th,
td {
  border: 1px solid #ddd;
}
.btn-sty {
  padding: 6px 10px;
}
.leftl {
  margin: -1px;
}
</style>
