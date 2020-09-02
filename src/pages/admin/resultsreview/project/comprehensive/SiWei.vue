<template>
  <div class="bigContain"
       ref="bigContain"
       v-focus="list"
       v-if="list.length>=1">
    <div :class="{'ma-top':list.length>1}"
         class="contain"
         v-for="(item,index) in list"
         :key="index">
      <div :class="{'shu1':index===0,'shu3':index!==0&&index!==list.length-1,'shu2':index!==0&&index==list.length-1}"
           v-if="list.length>1"></div>

      <transition name="fade">
        <div :class="{'heng':item.parentId!=='0'}"></div>
      </transition>
      <!-- {item.name==='顶级目录'?'firstTitle':'title','has-border':item.add} -->

      <div :class="{'tree-title':item.parentId!=='0','firstTitle':item.parentId==='0','has-border':!item.editor&&!item.add,'active-name':$store.state.tabs.treeCurrent===item}"
           @click="toggle(item)">
        <div class="item-content">
          <div v-if="item.add">
            <el-input placeholder="请输入内容"
                      v-model="item.name"
                      @keyup.enter.native="$event.target.blur"
                      @blur="addBlur(item,list,$event)"
                      :maxlength="50"></el-input>
          </div>
          <div v-else-if="item.editor">
            <el-input placeholder="请输入内容"
                      v-model="item.name"
                      @keyup.enter.native="$event.target.blur"
                      @blur="editorBlur(item,list)"
                      :maxlength="50"></el-input>
          </div>

          <el-tooltip class="item"
                      effect="dark"
                      :content="item.name"
                      placement="top"
                      v-else>
            <span :class="{'item-name':item.parentId!=='0'}">{{item.name}}</span>
          </el-tooltip>

        </div>

      </div>

      <div class="toggle">
        <div class="handle"
             v-if="$store.state.tabs.treeCurrent==item&&!item.editor&&!item.add">

          <div><span @click="editor(item)"><img src="@/assets/images/tree-echarts/editor.png"
                   alt=""></span></div>
          <div>
            <span @click="add(item,list,$event)"><img src="@/assets/images/tree-echarts/add.png"
                   alt=""></span>
          </div>
          <div v-if="list[0].parentId!=='0'"><span @click="remove(item,list,index)"><img src="@/assets/images/tree-echarts/delete.png"
                   alt=""></span></div>

        </div>
        <div class="display"
             @click="display(item)"
             v-if="$store.state.tabs.treeCurrent!==item&&item.childs.length">
          <span v-if="item.display"><img src="@/assets/images/tree-echarts/list.png"
                 alt=""></span>
          <span v-else=""
                class="data-length">{{item.childs.length}}</span>
        </div>
      </div>

      <div class="heng"
           v-if="item.childs.length&&item.display"></div>

      <transition name="fade">
        <siWei :list="item.childs"
               v-show="item.display"
               @add="addTemp"
               @editor="editorTemp"
               @remove="removeTemp">

        </siWei>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'siWei',
  props: {
    list: {
      type: Array,
      default: []
    }
  },

  data () {
    return {

    }
  },
  methods: {
    add (item, list, e) {
      this.$set(item, 'display', true)
      item.childs.push({ name: '', childs: [], add: true })
      this.item = item
      this.$store.commit('set_treeCurrent', null)
    },
    addTemp (item, parent) {
      this.$emit('add', item, parent)
    },
    addBlur (item, list) {
      if (!item.name) {
        list.pop()
        return
      }
      if (item.name.length >= 30) {
        this.$message('请输入小于30个字符')
        return
      }

      this.$emit('add', item, this.$parent.item)
    },
    remove (item, list, index) {
      this.$store.commit('set_treeCurrent', null)
      this.$emit('remove', item)
    },
    removeTemp (item) {
      this.$emit('remove', item)
    },
    editor (item) {
      this.editorValueTemp = this.$clone(item)
      this.$set(item, 'editor', true)
      this.$store.commit('set_treeCurrent', null)
    },
    editorBlur (item, list) {
      if (!item.name) {
        item.name = this.editorValueTemp.name
        return
      }
      this.$set(item, 'editor', false)
      this.$emit('editor', item)
    },
    editorTemp (item) {
      this.$emit('editor', item)
    },
    display (item) {
      if (item.display) {
        this.$set(item, 'display', false)
        this.$store.commit('delete_treeOpenIds', item.id)
      } else {
        this.$set(item, 'display', true)

        this.$store.commit('add_treeOpenIds', item.id)
      }
    },
    toggle (item) {
      this.$store.state.tabs.treeCurrent === item ? this.$store.commit('set_treeCurrent', null) : this.$store.commit('set_treeCurrent', item)
    }

    // submit (item) {
    //   this.$set(item, 'editor', false)
    // }
    // myEditor (item) {
    //   this.$set(item, 'editor', true)
    // }
  },
  computed: {

  },
  mounted () {

  },
  directives: {
    focus: {
      update: function (el, binding, vnode, oldVnode) {
        console.log(vnode)
      }
    }
  }

}
</script>

<style scoped>
.bigContain {
  color: rgba(101, 101, 101, 1);
}
.siwei {
  display: flex;
  min-height: 734px;
  justify-content: flex-start;
  align-items: center;
}
.heng {
  width: 24px;
  flex: 1;
  height: 1px;
  display: inline-block;
  background-color: #c9c9c9;
  position: relative;
}

.heng2 {
  flex: 1;
  height: 1px;
  background-color: #c9c9c9;
}
.shu1 {
  width: 1px;
  height: calc(50% + 16px);
  display: inline-block;
  background-color: #c9c9c9;
  position: absolute;
  left: 0px;
  top: 50%;
}
.shu3 {
  width: 1px;
  height: calc(100% + 16px);
  display: inline-block;
  background-color: #c9c9c9;
  position: absolute;
  left: 0px;
  top: 0%;
}
.shu2 {
  width: 1px;
  height: 50%;
  display: inline-block;
  background-color: #c9c9c9;
  position: absolute;
  left: 0px;
  top: 0%;
  bottom: 50%;
}
.tree-title {
  width: 192px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;

  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tree-title.has-border {
  border: 1px solid rgba(201, 201, 201, 1);
}
.contain {
  display: flex;

  align-items: center;
  position: relative;
}
.active-name {
  background: rgba(244, 250, 255, 1);

  border: 1px solid rgba(27, 116, 238, 1) !important;
}
.display > span {
  cursor: pointer;
}
.ma-top {
  margin: 15px 0;
}
.toggle {
  width: 24px;
}
.handle {
}
.handle > div {
  cursor: pointer;
}
.handle > div:nth-child(2) {
  margin: 2px 0;
}
.firstTitle {
  border-radius: 6px;
  border: 1px solid rgba(201, 201, 201, 1);
  padding: 45px 20px;
  font-size: 20px;
  margin-right: 16px;
  width: 45px;
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.data-length {
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-content: center;
  border: 2px solid #50a5f4;
  border-radius: 50%;
  color: #50a5f4;
}
.item-name {
  padding: 0 8px;
}
.tree-title .item-content {
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style>
</style>
