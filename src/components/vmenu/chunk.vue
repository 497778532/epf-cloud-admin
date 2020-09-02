<template>
<el-menu-item-group>
<template v-for="item in menus">
  <!-- <template v-if="isArr(item)">
  <el-menu-item-group
    :title="typeof item[0] === 'string' ? item[0] : ''"
    >
    <el-menu-item
      v-for="(val, index) in item[1]"
      :key="val.id"
      :index="val.id + ''"
      :route="toRoute(val)"
      :title=val.label
      style="min-width:195px;"
      >
      <i v-if="val.icon" :class="val.icon"></i>
      <span slot="title">{{val.label}}1</span>
    </el-menu-item>
  </el-menu-item-group>
  </template> -->
  <template>
    <el-submenu
      v-if="item.childMenu.length != 0 && item.menuType=='zuobiancaidan'"
      :key="item.id"
      :index="item.resourceId?item.resourceId:item.url"
      :title=item.menuname
      style="min-width:195px;"
      >
      <template slot="title">
        <i v-if="item.iconCls" :class="item.iconCls"></i>
        <span slot="title">{{item.menuname}}</span>
      </template>
      <menu-list :menus="item.childMenu"></menu-list>
    </el-submenu>
    <el-menu-item
      v-else-if="item.menuType=='zuobiancaidan'"
      :key="item.id"
      :index="item.resourceId?item.resourceId:item.url"
      :route="toRoute(item)"
      :title=item.menuname
      style="min-width:195px;"
      >
      <i v-if="item.iconCls" :class="item.iconCls"></i>
      <span slot="title">{{item.menuname}}</span>
    </el-menu-item>
  </template>
</template>
</el-menu-item-group>
</template>
<script type="text/javascript">
import menuList from './chunk-2'
import { log } from 'util'
export default {
  props: {
    menus: Array
  },
  components: {
    menuList
  },
  methods: {
    isArr (v) {
      return Object.prototype.toString.call(v) === '[object Array]'
    },
    toRoute (item) {
      localStorage.setItem(item.resourceId, JSON.stringify(item.childButton))
      console.log('item', item)
      return { name: item.menuname, path: item.url, params: {menuId: item.id}}
    }
  }
}
</script>

