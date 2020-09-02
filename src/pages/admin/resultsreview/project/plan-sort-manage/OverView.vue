<template>
  <el-row style="height:100%"
          class="OverView"
          type="flex">
    <el-col :span="11"
            class="OverView-left">
      <div class="treeSearch">
        <el-cascader :props="props"
                     clearable
                     v-model="areaSelectedOptions"
                     @change="handleChange"></el-cascader>
        <el-input placeholder="输入服务关键字进行过滤"
                  suffix-icon="el-icon-search"
                  v-model="filterText"
                  style="margin-left:5px"
                  :maxlength="50"></el-input>
      </div>
      <controllerResource @EPFgetNode="getNode"
                          v-if="allTree.length"
                          :searchNode="mysearchNode"
                          @EPFnodeClick="nodeClick"
                          :EPFDefaultProps="defaultProps"
                          :data="data5"
                          :filterText="filterText"
                          :EPFdefaultArray="defaultArray1"
                          style="width:100%;box-shadow:1px 2px 10px 2px rgba(208,208,208,0.5);height:calc(100% - 56px)">
        <template slot="item"
                  slot-scope="scope">

          <el-input ref="sortInput"
                    class="sortInput"
                    style="width:60%"
                    v-if="scope.row.add"
                    v-model="name"
                    placeholder="请在右侧输入信息"
                    @click.stop
                    :maxlength="50"></el-input>
        </template>
        <template slot="handle"
                  slot-scope="scope">
          <div class="currentDiv"
               style="display:inline-block"
               v-if="scope.row===isCurrent&&!scope.row.add">
            <div @click.stop="add(scope.row,scope.rowNode,$event)"
                 v-if="scope.rowNode.level<=4">
              <img :src="xzml"
                   alt />
            </div>
            <div @click.stop="editor(scope.row,scope.rowNode)">
              <img :src="WenJianEditor"
                   alt />
            </div>

            <div @click.stop="remove(scope.row,scope.rowNode,$event)">
              <img :src="sc"
                   alt />
            </div>
          </div>
        </template>
      </controllerResource>
      <div class="add-tree"
           v-if="allTree.length===0">

        <div class="addButton"
             @click="top()">
          添加顶级目录
        </div>
      </div>

    </el-col>
    <el-col :span="13"
            class="OverView-right">
      <div class="filter_wrap_over">
        <div class="toolsTitleBox">
          <span style="font-size:18px;color:#202020">规划清单分类管理</span>
        </div>
        <el-scrollbar style="height:calc(100% - 50px);">
          <overEditor v-show="!addIng"
                      :layers="layers"
                      @cancel="inputDisabled=true"
                      :allTree="allTree"
                      :node="node"
                      :inputDisabled="inputDisabled"
                      :id="indexSortId"
                      @success="editorSuccess"></overEditor>
          <overAdd v-show="addIng"
                   :layers="layers"
                   :data="parentData"
                   :name.sync="name"
                   :allTree="allTree"
                   @cancel="addCancel"
                   :node="addData"
                   @success="success"></overAdd>
        </el-scrollbar>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import controllerResource from '../../../onemap/controller/controllerResourceCommon'

import areaSelect from '@/assets/js/areaCascader.js'
import OverAdd from './OverAdd'
import OverEditor from './OverEditor'
export default {
  name: 'overview',
  mixins: [areaSelect],
  data () {
    return {

      layers: [{
        id: '1', name: '顶级'
      }, {
        id: '2', name: '一级'
      }, {
        id: '3', name: '二级'
      }, {
        id: '4', name: '三级'
      }],

      addIng: false,
      allTree: [],
      filterData: [

      ],
      myClassification: [],

      leverl: [
        {
          id: 1,
          name: '国家级'
        },
        {
          id: 2,
          name: '省级'
        },
        {
          id: 3,
          name: '市级'
        }
      ],
      name: '',
      currentCheck: null,
      filterText: '',
      node: {},

      sy: require('@/assets/sy.png'),
      xy: require('@/assets/xy.png'),
      xzml: require('@/assets/xzml.png'),
      WenJianEditor: require('@/assets/WenJianEditor.png'),
      tjfw: require('@/assets/tjtc.png'),
      cmm: require('@/assets/cmm.png'),
      sc: require('@/assets/sc.png'),
      data: [],
      indexList: [],
      focusState: false,
      cantonId: '440000',
      mysearchNode: '',
      inputDisabled: true,
      addData: {},
      data5: [
        { name: '哈哈哈' }
      ],
      defaultProps: {
        children: 'childs',
        label: 'name',
        isLeaf: 'isLeaf'
      },

      defaultArray1: [0],
      isCurrent: null,

      parentId: '',
      parentData: null,
      nodeId: '',
      imIndexManageSelect: [],
      have: true,
      indexSortId: ''
    }
  },
  components: { controllerResource, OverEditor, OverAdd },
  created () {
    this.getTreeAdmin(this.setDefaultArray)
  },

  methods: {
    setDefaultArray () {
      this.defaultArray1 = [this.data5[0].id]
    },
    editorSuccess () {
      this.inputDisabled = true
      this.getTreeAdmin()
    },
    success () {
      this.addIng = false
      this.inputDisabled = true
      this.getTreeAdmin()
    },
    top () {
      this.addIng = true
      this.addData = {
        name: '',
        layersName: '顶级',
        treeName: '',
        turn: '',
        parentId: '0',
        cantonId: this.cantonId
      }
    },
    handleChange (value) {
      this.cantonId = value[value.length - 1]
      this.getTreeAdmin(this.setDefaultArray)
    },
    addCancel () {
      this.parentData && this.parentData.childs.pop()
      this.addIng = false
    },
    getSelect () {
      this.$post(
        '/epf-index-model/imindexmanage/getImIndexManageSelect?',
        {}
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.imIndexManageSelect = res.imIndexManageSelect
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    remove (data, node) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      }).then(() => {
        this.$post('/epf-result-review/revplanningcategorymanage/deleteRevPlanningCategoryManage?', {
          id: data.id
        }).then(res => {
          if (res.code === 0) {
            this.$set(this.defaultArray1, 0, node.parent.data.id)
            this.$message.success(res.msg)
            this.getTreeAdmin()
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 添加事件，打开弹窗
    add (data, node, ele) {
      // if (node.level === 4) {
      //   this.$message({
      //     message: '最多可添加至第四级!',
      //     type: 'warning'
      //   })
      //   return false
      // }

      if (this.parentData && this.parentData.childs[this.parentData.childs.length - 1].id === '100') {
        this.parentData.childs.pop()
      }

      data.childs.push({
        id: '100',
        name: '',
        leverl: '1',
        add: true
      })

      this.addIng = true
      this.parentData = data
      this.defaultArray1 = [data.id]
      this.$nextTick(() => {
        // document.querySelector('.sortInput').querySelector('input').focus()
        // console.log(this.$refs.sortInput.focus)
        this.$refs.sortInput.focus()
      })

      let layersName = ''
      switch (node.level) {
        case 1:
          layersName = '一级'
          break

        case 2:
          layersName = '二级'
          break
        case 3:
          layersName = '三级'
          break
        case 4:
          layersName = '四级'
          break
      }
      this.addData = {
        name: '',
        layersName: layersName,
        treeName: data.name,
        turn: data.childs.length,
        parentId: data.id
      }
    },
    editor (data, node) {
      this.defaultArray1.push(data.id)
      this.inputDisabled = false
    },
    deleleCheck (index) {
      this.cities.splice(index, 1)
    },

    cancel () {
      for (let item in this.enterFilterData) {
        this.enterFilterData[item] = ''
      }

      this.indexList = []
      this.myClassification = []
      for (let item in this.imIndexSort) {
        this.imIndexSort[item] = ''
      }
    },

    getTreeAndData (arr, newArr) {
      var contantArray = newArr
      if (arr && arr.length) {
        for (var i = 0; i < arr.length; i++) {
          this.getTreeAndData(arr[i].childs, contantArray)
          contantArray.push(arr[i])
        }
      }
    },

    getTreeAdmin (callBack) {
      this.$post('/epf-result-review/revplanningcategorymanage/getRevPlanningCategoryManageTree', { cantonId: this.cantonId }).then(
        res => {
          if (res.code === 0) {
            this.data5 = JSON.parse(JSON.stringify(res.planningManage))
            this.$set(this.data5)
            if (callBack) {
              callBack()
            }
            let data = res.planningManage
            let getTree = function (data) {
              if (data.length) {
                for (var i = 0; i < data.length; i++) {
                  getTree(data[i].childs)
                  data = [...data, ...data[i].childs]
                }
              }
              return data
            }

            this.allTree = getTree(data)
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },

    showHandle (node) {
      return node.childNodes.length !== 0
    },

    nodeClick (item, node) {
      this.isCurrent = item
      this.node = node
      if (item.add) {
        this.addIng = true
        return
      }
      this.addIng = false
      this.inputDisabled = true
      this.indexSortId = item.id
    },

    showButton (data) {
      return !!data.hasOwnProperty('leverl')
    },

    getOrg () {
      let orgId = sessionStorage.getItem('orgId')

      this.$get('/epf-admin/admin/org/getOrg', { id: orgId }).then(res => {
        if (res.code == '0') {
          this.data5[0].name = res.area + '指标体系'
        }
      })
    },

    getIDs: function (array) {
      var ids = ''
      for (var i = 0; i < array.length; i++) {
        ids += array[i].id
        if (i != array.length - 1) {
          ids += ','
        }
      }
      return ids
    },

    getNode (node) {
      this.nodeId = node.data.id
    }
  },
  watch: {},
  computed: {
    checkedIds: {
      get () {
        let arr = []
        this.indexList.forEach(item => arr.push(item.id))
        return arr
      },
      set (val) {
        let arr2 = []
        let arr = this.imIndexManageSelect
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < arr.length; j++) {
            if (val[i] == arr[j].id) {
              arr2.push(arr[j])
            }
          }
        }
        this.indexList = arr2
        // for (var i = 0; i < val.length; i++) {
        //   for (var j = 0; j < this.imIndexManageSelect.length; j++) {
        //     if (val[i] == this.imIndexManageSelect[j].id) {
        //       this.indexList.push(this.imIndexManage[j]);
        //     }
        //   }
        // }
      }
    }
  }

}
</script>

<style scoped>
@import "./index.css";
</style>

<style>
</style>
