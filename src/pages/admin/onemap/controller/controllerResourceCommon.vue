<template>
  <div style="height:100%"
       class="epf-tree">
    <div class="zy-main">
      <slot name="input"></slot>
      <el-scrollbar style="height:100%;">
        <el-tree ref="tree"
                 :data="EPFTreeData"
                 :node-key="EPFnodeKey"
                 @node-expand="EPFNodeExpand"
                 @node-click="treeClick1"
                 @check-change="treeChangeClick"
                 :default-expanded-keys="EPFdefaultArray"
                 :props="EPFDefaultProps"
                 @node-contextmenu="rightClick"
                 radioChange
                 :filter-node-method="filterNode">
          <div class="custom-tree-node"
               slot-scope="{ node, data }"
               style="width:97%">
            <!-- <slot name="radio" :row="data">

            </slot>-->

            <el-radio-group v-model="radio"
                            @change="radioChange"
                            v-if="showRadio(node,data)">
              <el-radio :label="data">
                <span>{{ node.label }}</span>
              </el-radio>
            </el-radio-group>
            <div v-else
                 class="tree-line">
              <img v-if="showWenjian(node,data)"
                   :src="wenjian1"
                   style="padding:4px;width:24px;height:24px" />
              <img v-if="showWenjian2(node,data)"
                   :src="wenjian2"
                   style="padding:4px;width:24px;height:24px" />
              <img v-if="showneirong(node,data)"
                   :src="neirong"
                   style="padding:4px;" />
              <slot name="item"
                    :row="data"></slot>
              <span class="nodeLabel">
                <el-checkbox v-if="showCheck(node,data)"
                             v-model="node.checked"></el-checkbox>
                {{ node.label }}
              </span>
              <slot name="handle"
                    :row="data"
                    :rowNode="node"></slot>
            </div>
            <!-- <el-checkbox v-if="showCheck(node,data)" v-model="node.checked"></el-checkbox> -->
          </div>
        </el-tree>
        <div id="menu"
             v-show="menuVisible"
             ref="menu">
          <slot name="footer"
                :row="EPFmenu">
            <ul>
              <li v-for="(item,index) in EPFmenu"
                  class="menu__item"
                  :key="index">
                <span @click="handleCommand(item.type)">{{item.label}}</span>
              </li>
            </ul>
          </slot>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      } // 这样可以指定默认的值
    },
    EPFnodeKey: {
      type: String,
      default: 'id'
    },
    filterText: {
      type: String,
      default: ''
    },

    searchNode: {
      type: String,
      default: ''
    },
    EPFDefaultProps: {
      type: Object,
      default: function () {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    EPFmenu: {
      type: Array,
      default: function () {
        return []
      }
    },
    EPFdefaultArray: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      arr: [],
      radio: {},
      EPFTreeData: this.data,
      lowerTreeData: {
        id: ''
      },
      menu: '',
      type: this.EPFDefaultProps,
      defaultArray: [],
      rightObject: {},
      rightParentObject: {},
      rightNode: {},
      menuVisible: false,
      isShow: false,
      liubianxing: require('@/assets/check.png'),
      wenjian1: require('@/assets/wenjian1.png'),
      wenjian2: require('@/assets/wenjian2.png'),
      neirong: require('@/assets/neirong.png'),
      right: require('@/assets/right.png')
    }
  },
  components: {},
  methods: {
    EPFNodeExpand (item, node, element) {
      console.log(node)
      this.$emit('EPFNodeExpand', item)
    },
    foo () {
      // 取消鼠标监听事件 菜单栏
      // this.menuVisible = false;
      // document.removeEventListener("click", this.foo); // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    treeClick1 (item, node, element) {
      this.menuVisible = false
      this.$emit('EPFnodeClick', item, node)
    },
    treeChangeClick (obj, bol, have) {
      this.$emit('EPFcheckChange', obj, bol, have)
    },
    radioChange () {
      this.$emit('EPFradioChange', this.radio)
    },
    rightClick (MouseEvent, object, node, element) {
      this.menuVisible = !this.menuVisible // 显示模态窗口，跳出自定义菜单栏
      if (!this.menuVisible) {
        return
      }

      this.$refs.menu.style.left = MouseEvent.clientX - 100 + 'px'
      this.$refs.menu.style.top = MouseEvent.clientY - 200 + 'px'
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
      console.log('右键被点击的event:', MouseEvent)
      console.log('右键被点击的object:', object)
      console.log('右键被点击的value:', node)
      console.log('右键被点击的element:', element)
      console.log('鼠标点击了树形结构图')
      this.rightObject = object
      this.rightParentObject = node.parent.data
      this.rightNode = node

      this.$emit('EPFrightClick', MouseEvent, object, node, element)
      // this.menuVisible = false;
    },
    handleCommand (type) {
      this.menuVisible = false
      this.$emit('EPFdropDown', type, this.rightObject)
    },

    showCheck (node, data) {
      return !!(node.childNodes.length === 0
        && data.hasOwnProperty('serviceStatus'))
    },
    showRadio (node, data) {
      return !!data.hasOwnProperty('topicTemplateId')
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    showCheck3 (node, data) {
      return !!data.hasOwnProperty('isShow')
    },
    showWenjian (node, data) {
      return !!(node.childNodes.length !== 0
        || data.onlyList
        || data.leverl
        || data.hasOwnProperty('workbenchType')
        || data.hasOwnProperty('parentId')
        || data.hasOwnProperty('description'))
        && !node.expanded
    },
    showWenjian2 (node, data) {
      return !!(node.childNodes.length !== 0
        || data.onlyList
        || data.leverl
        || data.hasOwnProperty('workbenchType')
        || data.hasOwnProperty('parentId')
        || data.hasOwnProperty('description'))
        && node.expanded
    },
    showneirong (node, data) {
      return !!data.hasOwnProperty('content')
    }
  },
  created () {
    console.log(this.type)
  },
  watch: {
    data (newVal) {
      this.EPFTreeData = newVal
    },
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    searchNode (val) {
      let id = this.$refs.tree.getNode(val)
      this.$emit('EPFgetNode', id)
    }
  }
}
</script>

<style scoped>
.nodeLabel {
  width: 50%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: middle;
  display: inline-block;
}
.tree-line {
  display: flex;
  align-items: center;
}
</style>
<style>
.el-tree {
  color: #393939;
}
.epf-tree {
  font-size: 16px;
}
.epf-tree .zy-main {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.epf-tree .el-scrollbar {
  height: 100%;
}
.epf-tree .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: auto;
}

.epf-tree .el-tree-node__content {
  height: 40px;
}
.epf-tree .menu__item {
  width: 80px;
  display: block;
  line-height: 27px;
  height: 27;
  text-align: center;
}
.epf-tree #menu {
  color: #000;
  background-color: #fff;
  cursor: pointer;
  position: absolute;
}
.epf-tree li:hover {
  background-color: #f9f9f9;
}

.epf-tree .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: auto;
}
.epf-tree .el-checkbox {
  margin-right: 0;
  display: inline-block;
}
</style>
