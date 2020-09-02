<template>
  <div style="height:100%"
       class="epf-tree">
    <div class="zy-main">
      <slot name="input"></slot>
      <el-scrollbar style>
        <div id="container">
          <div class="firstBox">
            <span @click="turnTuCeng"
                  :class="{active:current==0}">常用图层</span>
            <!-- <span @click="turnZhuanTi"
                  :class="{active:current==1}">常用专题</span> -->
            <span @click="turnMuLu"
                  :class="{active:current==2}">详细目录</span>
            <i class="clear">清除</i>
          </div>
          <div v-if="this.current==0">
            <div class="secondBox"
                 v-for="(item, index) in resourceData"
                 :key="index">
              <el-checkbox v-model="checked1"
                           class="changeCheckbox"
                           @change="getId">{{ item }}</el-checkbox>
              <div class="point"
                   @click="toThree"><span class="el-icon-more"></span></div>
              <div class="three"
                   v-if="showThree">
                <P>收藏</P>
                <P>查看详情</P>
                <P>服务透明度</P>
              </div>
            </div>
          </div>
          <div v-if="this.current==1">
            <div class="secondBox"
                 v-for="(item, index) in zhuanTiData"
                 :key="index">
              <el-checkbox v-model="checked1"
                           class="changeCheckbox">{{ item }}</el-checkbox>
            </div>
          </div>
          <div v-if="this.current==2">456</div>
        </div>
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
      showThree: false,
      current: 0,
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
      wenjian: require('@/assets/wenjian1.png'),
      right: require('@/assets/right.png'),
      resourceData: [
        '国土空间规划分区', '国土用途规划分类', '城镇开发边界', '生态保护红线', '永久基本农田', '生态保护等级', '生态保护重要性', '农业承载等级', '农业生产适宜性', '城镇承载等级', '城镇开发适宜性', '土地规划期末地类图斑', '土地规划建设用地管制区', '土地规划用途分区', '城市总体规划', '主体功能区', '海洋功能区划', '自然保护区', '风景名胜区', '地质公园', '地质灾害防治规划', '高速公路网规划', '港口规划', '航道规划', '三调地类图斑', '现状图', '中心城区范围', '开发区范围', '产业园范围', '用地红线', '预审红线', '常住人口'
      ],
      zhuanTiData: ['国土空间规划底图', '基本农田-400', '农田', '农田补充文字', '生态保护红线划定', '生态红线', '生态红线-400', '生态红线-600', '生态红线补偿文字', '永久基本农田划定成果']
    }
  },
  components: {},
  methods: {
    toThree () {
      console.log('123')
      this.showThree = !showThree
    },
    turnTuCeng () {
      this.current = 0
    },
    turnZhuanTi () {
      this.current = 1
    },
    turnMuLu () {
      this.current = 2
    },
    getId () {

    },
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
      this.$emit('EPFnodeClick', item.id, node)
    },
    treeChangeClick (obj, bol, have) {
      this.$emit('EPFcheckChange', obj, bol, have)
    },

    rightClick (MouseEvent, object, node, element) {
      this.menuVisible = !this.menuVisible // 显示模态窗口，跳出自定义菜单栏
      if (!this.menuVisible) {
        return
      }

      this.$refs.menu.style.left = MouseEvent.clientX - 100 + 'px'
      this.$refs.menu.style.top = MouseEvent.clientY - 200 + 'px'
      document.addEventListener('click', this.foo) // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
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
.container {
  padding-bottom: 10px;
}
.epf-tree {
  font-size: 16px;
}
.epf-tree .zy-main {
  height: 100%;
  overflow: hidden;
  position: relative;
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
.changeCheckbox {
  margin-top: 10px;
  margin-left: 30px;
}
.firstBox {
  padding-top: 15px;
  padding-left: 30px;
  border-bottom: 1px solid rgba(215, 215, 215);
}
.secondBox {
  height: 30px;
  position: relative;
}
.point {
  position: absolute;
  right: 50px;
  bottom: 0;
}
.firstBox span {
  color: rgba(255, 255, 255);
  display: inline-block;
  width: 68px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  background-color: rgba(215, 215, 215);
}
.clear {
  display: inline-block;
  width: 40px;
  height: 20px;
  color: rgba(255, 255, 255);
  background-color: rgba(22, 155, 213);
  border-radius: 5px;
  text-align: center;
  line-height: 20px;
  position: relative;
  right: -25px;
  top: 5px;
}
.firstBox .active {
  color: rgba(255, 255, 255);
  background-color: rgba(22, 155, 213);
}
.el-icon-more {
  transform: rotate(90deg);
}
.three {
  width: 83px;
  height: 77px;
  z-index: 999;
}
</style>
