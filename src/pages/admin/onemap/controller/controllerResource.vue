<template>
  <div style="height:100%"
       class="epf-tree">
    <div class="zy-main">
      <slot name="input"></slot>
      <el-scrollbar>
        <el-tree :data="EPFTreeData"
                 :node-key="EPFnodeKey"
                 ref="tree"
                 @node-click="treeClick1"
                 @check-change="treeChangeClick"
                 :default-expanded-keys="EPFdefaultArray"
                 :props="EPFDefaultProps"
                 @node-contextmenu="rightClick"
                 :filter-node-method="filterNode"
                 :load="loadNode"
                 lazy>
          <span class="custom-tree-node"
                slot-scope="{ node, data }">
            <el-radio-group @click.native.prevent="clickitem(data)"
                            v-model="radio"
                            v-if="showRadio(node,data)">
              <el-radio :label="data">
                <!-- debugger -->
                <span>{{ node.label }}</span>
              </el-radio>
            </el-radio-group>
            <div v-else
                 style="{display:inline-block,display:relative,white-space:nowrap,overflow:hidden,text-overflow:ellipsis,padding-right:68px;}"
                 class="one"
                 :title="node.label">
              <el-checkbox v-if="showCheck(node,data)"
                           v-model="node.checked"
                           class="getChecked"></el-checkbox>
              <!-- <div v-if="showCheck(node,data)"
                   class="three"
                   style="display:inline-block"><span class="el-icon-more"></span></div> -->

              <img v-if="showWenjian(node,data)"
                   :src="wenjian1"
                   style="padding:4px;width:24px;height:24px" />
              <img v-if="showWenjian2(node,data)"
                   :src="wenjian2"
                   style="padding:4px;width:24px;height:24px" />
              <slot name="item"
                    :row="data"></slot>
              <span>{{ node.label }}</span>
            </div>
          </span>
        </el-tree>
        <div id="menu"
             v-show="menuVisible"
             ref="menu">
          <slot name="footer"
                :row="EPFmenu">
            <ul v-if="EPFcommon">
              <li v-for="(item,index) in EPFmenu"
                  class="menu__item"
                  :key="index">
                <span @click="handleCommand(item.type)">{{item.label}}</span>
              </li>
            </ul>

            <ul v-else
                class="slider">
              <li>
                <i style="width:50%;display:inline-block;text-align:center">透明度</i>
                <span style="width:40%;background:rgba(178,178,178,1);display:inline-block;text-align:center">{{`${opacityVal}%`}}</span>
              </li>
              <li>
                <el-slider v-model="opacityVal"></el-slider>
              </li>
            </ul>
          </slot>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
export default {
  inject: ['mapAppId', 'rightSelectNode'],
  props: {
    EFPexpandedData: {
      type: Array,
      default: function () {
        return []
      }
    },
    EFPexpandedNode: {
      type: Object,
      default: function () {
        return {}
      }
    },
    EPFcommon: {
      type: Boolean,
      default: function () {
        return true
      } // 这样可以指定默
    },
    data: {
      type: Array,
      default: function () {
        return []
      } // 这样可以指定默认的值
    },
    EPFdataChilds: {
      type: Array,
      default: function () {
        return []
      }
    },
    EPFnodeKey: {
      type: String,
      default: 'id'
    },
    filterText: {
      type: String,
      default: ''
    },
    parentDataId: {
      type: String,
      default: ''
    },
    EPFDefaultProps: {
      type: Object,
      default: function () {
        return {
          children: 'children',
          label: 'label',
          isLeaf: 'isLeaf'
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
      rightSelectLayerId: null,
      mapApp: null,
      opacityVal: 0,
      common: true,
      radio: '',
      arr: [],
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
      right: require('@/assets/right.png')
    }
  },
  components: {},
  methods: {
    ...mapMutations('onemap', [
      'SET_specialT',
      'SET_specialF',
      'SET_specialData'
    ]),
    EPFNodeExpand (item, node, element) {
      if (!this.arr.includes(item.id)) {
        this.arr.push(item.id)
        this.$emit('EPFNodeExpand', item)
      }
    },

    // radioChange(data) {
    //   this.SET_specialData(data);
    //   if (this.special) {
    //     return;
    //   }
    //   this.SET_special();
    // },
    clickitem (data, $event) {
      data === this.radio ? (this.radio = '') : (this.radio = data)
      if (this.radio) {
        this.SET_specialData(data)
        if (this.special) {
          return
        }
        this.SET_specialT()
      } else {
        this.SET_specialF()
      }
    },
    foo () {
      this.$emit('Closeslider', true)
      this.menuVisible = false
      document.removeEventListener('click', this.foo)
      // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    treeClick1 (item, node, element) {
      this.menuVisible = false
      this.$emit('EPFnodeClick', item, node)
    },
    treeChangeClick (obj, bol, have) {
      this.$emit('EPFcheckChange', obj, bol, have)
    },

    rightClick (MouseEvent, object, node, element) {
      this.menuVisible = !this.menuVisible // 显示模态窗口，跳出自定义菜单栏

      if (this.menuVisible) {
        this.$refs.menu.style.left = MouseEvent.clientX - 150 + 'px'
        if ((MouseEvent.clientY - 235) < 413) {
          this.$refs.menu.style.top = MouseEvent.clientY - 235 + 'px'
        } else {
          this.$refs.menu.style.top = 413 + 'px'
        }
        // this.$refs.menu.style.top = MouseEvent.clientY - 235 + 'px'
        console.log(MouseEvent.clientY - 235 + 'px')

        document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
        this.rightObject = object
        this.rightParentObject = node.parent.data
        this.rightNode = node

        this.$emit('EPFrightClick', MouseEvent, object, node, element)
        // this.menuVisible = false;
      }
    },
    handleCommand (type) {
      this.menuVisible = false

      this.$emit('EPFdropDown', type, this.rightObject)
    },

    showCheck (node, data) {
      return !!data.hasOwnProperty('serviceStatus')
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
        || data.hasOwnProperty('enUs'))
        && !node.expanded
    },
    showWenjian2 (node, data) {
      return !!(node.childNodes.length !== 0
        || data.onlyList
        || data.leverl
        || data.hasOwnProperty('workbenchType')
        || data.hasOwnProperty('enUs'))
        && node.expanded
    },
    loadNode (node, resolve) {
      this.$emit('EPFloadNode', node, resolve)
    }
  },
  computed: {
    ...mapState('onemap', ['special']),
    ...mapGetters(['getRightSelectLayerId'])
  },
  mounted () {
    this.$emit('EPFgetNode', this.$refs.tree.getNode('0'))
  },
  created () { },
  watch: {
    EPFcommon (val) {
      this.common = val
      this.menuVisible = !val
    },
    data (newVal, oldVal) {
      this.EPFTreeData = newVal
    },
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    EPFdataChilds (val) {
      this.$refs.tree.updateKeyChildren('0', val)
    },
    EFPexpandedNode (val) {
      val.childNodes.splice(1, val.childNodes.length)
    },
    getRightSelectLayerId (layerId) {
      this.rightSelectLayerId = layerId
    },
    opacityVal (val) {
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }

      this.mapApp.setLayerOpacity(this.rightSelectLayerId, Number((100 - val) / 100))
    }
  }
}
</script>

<style scoped>
</style>
<style>
.epf-tree {
  font-size: 16px;
}
.epf-tree .zy-main {
  height: 100%;
  /* height: 645px; */
  overflow: hidden;
  overflow-y: auto;
}

.epf-tree .el-scrollbar {
  height: 100%;
  padding: 5px 0 5px 5px;
}
.epf-tree .el-tree-node__content {
  height: 40px;
  position: relative;
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
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(245, 247, 250);
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  box-shadow: 1px 1px 1px 1px rgb(245, 247, 250);
  z-index: 9999999999999999999999999;
}
.epf-tree li:hover {
  background-color: #f9f9f9;
}

/* .epf-tree .el-scrollbar {
  height: 100%;
} */
.epf-tree .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: auto;
}
.epf-tree .el-checkbox {
  margin-right: 0;
}
.epf-tree .el-radio__label {
  font-size: 16px;
  color: #606266;
}

.epf-tree .el-radio__inner {
}
.epf-tree .slider {
  width: 82px;
  background: rgba(249, 249, 249, 1);
}
.epf-tree .slider li {
  height: 17px;
  line-height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  padding: 0 5px;
}

.epf-tree .el-slider__button-wrapper {
}

.epf-tree .el-slider__button {
  width: 10px;
  height: 10px;
  border: 2px solid #575656;
}
.epf-tree .el-slider__runway {
  margin: 5px 0;
}
.epf-tree .el-slider__bar {
  background-color: #b2b2b2;
}
/* .point {
  position: absolute;
  right:0;
  bottom:0;
} */
.el-icon-more {
  transform: rotate(90deg);
}
.zy-main .three {
  position: absolute;
  right: 8%;
  bottom: 5px;
  width: unset;
  height: unset;
  z-index: unset;
}
.el-tree-node__content .one {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
}
.countHome {
  height: 100%;
  overflow: auto;
}
</style>

