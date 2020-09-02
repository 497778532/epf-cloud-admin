<template>
  <div style="height:100%;position: relative;"
       class="fb-menu"
       :style="{ width: isShowMenu == true ? 308 + 'px' : 74 + 'px' }">
    <div style="width:74px;height:100%;background-image:linear-gradient(180deg,rgba(15,36,106,1) 0%,rgba(0,63,163,1) 29%,rgba(15,36,106,1) 100%);box-sizing: border-box;box-shadow:3px 0px 8px 0px rgba(59,74,128,0.5);">
      <el-scrollbar style="height:100%;">
        <ul style="padding-top:32px;">
          <li v-for="(item, dex) in menus"
              :key="dex"
              style="height:70px;width:74px;display:flex;justify-content: center;align-items: center;cursor: pointer;margin-bottom:24px;"
              @click="getIndexMenu(item, dex)"
              :class="{ 'menuicon-click-dex': limitA == dex }">
            <el-tooltip class="item"
                        effect="dark"
                        :content="item.menuname"
                        placement="right">
              <div style="height:70px;width:74px; display:flex; flex-direction: column;justify-content: center;align-items: center;"
                   class="nav-special">
                <i v-if="item.ghfxIcons"
                   :class="item.ghfxIcons"
                   style="font-size:32px;"
                   class="i-special"></i>
                <i v-if="item.cgscIcons"
                   :class="item.cgscIcons"
                   style="font-size:32px;"
                   class="i-special"></i>
                <i v-if="item.jcpgyjIcons"
                   :class="item.jcpgyjIcons"
                   style="font-size:32px;"
                   class="i-special"></i>
                <i v-if="item.czjcyjIcons"
                   :class="item.czjcyjIcons"
                   style="font-size:32px;"
                   class="i-special"></i>
                <i v-if="item.dghyzcIcons"
                   :class="item.dghyzcIcons"
                   style="font-size:32px;"
                   class="i-special"></i>
                <i v-if="item.zbmxIcons"
                   :class="item.zbmxIcons"
                   style="font-size:32px;"
                   class="i-special"></i>
                <i v-if="item.zskIcons"
                   :class="item.zskIcons"
                   style="font-size:32px;"
                   class="i-special"></i>
                <i v-if="item.ndtjIcons"
                   :class="item.ndtjIcons"
                   style="font-size:32px;"
                   class="i-special"></i>
                <i v-if="item.xtglIcons"
                   :class="item.xtglIcons"
                   style="font-size:32px;"
                   class="i-special"></i>
                <span style="height: 28px;font-size: 16px;line-height:28px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:74px;text-align:center;"
                      class="i-special">{{ item.menuname }}</span>
              </div>
            </el-tooltip>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div style="height:100%;width:234px;backgroundColor:#edeef7;position: absolute;left:74px;top:0;border-right: 1px solid #e4e7ed;box-sizing: border-box;box-shadow:2px 0px 5px 1px rgba(181,184,196,0.31);"
         class="fbnav-sub"
         v-if="isShowMenu">
      <ul style="width:204px;padding-top:16px;">
        <!-- <li
          style="height:40px;width:100%;display:flex;justify-content: flex-start;align-items: center;font-size:16px;padding:0 15px;margin-bottom:5px;color:#8A8A8A;"
        >
          <i v-if="newMenuIcon" :class="newMenuIcon" style="font-size:20px;margin-right:10px;"></i>
          {{this.newMenuName}}
        </li>-->
        <li class="menu-li"
            v-for="(item, dex) in this.newChildMenu"
            :key="dex"
            style="height:40px;width:100%;display:flex;justify-content: flex-start;align-items: center;cursor: pointer;padding:0 15px;margin-bottom:5px;"
            @click="toNewRoute(item, dex)"
            :class="{ 'menu-click-dex': limit == dex }">
          <!-- <i v-if="item.iconCls"
             :class="item.iconCls"
             style="font-size:20px;margin-right:10px;"
             class="span-special"></i> -->
          <span slot="title"
                style="font-size:16px;"
                class="span-special">{{
            item.menuname
          }}</span>
        </li>
      </ul>
    </div>
    <div class="fbnav-sub-zhezhao"
         :style="{ width: screenWidth1 + 'px' }"
         v-if="isShowMenu"></div>
    <!-- <el-menu :mode="mode"
           :collapse="collapse"
           class="leftMenu"
           :backgroundColor="backgroundColor"
           :textColor="textColor"
           :activeTextColor="activeTextColor"
           :defaultActive="defaultActive"
           :defaultOpeneds="defaultOpeneds"
           :uniqueOpened="uniqueOpened"
           :menuTrigger="menuTrigger"
           @open="open"
           @close="close"
           @select="select">
    <template v-for="item in menus">-->
    <!-- <template v-if="isArr(item)">
      <el-menu-item-group
        :title="typeof item[0] === 'string' ? item[0] : ''"
        >
        <el-menu-item
          v-for="(val, index) in item[1]"
          :key="index"
          :index="val.id+''"
          :route="toRoute(val)"
          :title=item.label
          >
          <i v-if="val.icon" :class="val.icon"></i>
          <span slot="title">{{val.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </template>-->
    <!-- <template>
        <el-submenu v-if="item.childMenu.length!= 0 && item.menuType=='zuobiancaidan'"
                    :key="item.id"
                    :index="item.id"
                    :title=item.menuname>
          <template slot="title">
            <i v-if="item.iconCls"
               :class="item.iconCls"></i>
            <span slot="title">{{item.menuname}}</span>
          </template>
          <menu-list :menus="item.childMenu"></menu-list>
        </el-submenu>
        <el-menu-item v-else-if="item.menuType=='zuobiancaidan'"
                      :key="item.id"
                      :index="item.resourceId?item.resourceId:item.url"
                      :route="toRoute(item)"
                      :title=item.menuname>
          <i v-if="item.iconCls"
             :class="item.iconCls"></i>
          <span slot="title">{{item.menuname}}</span>
        </el-menu-item>
      </template>
    </template>-->
    <!-- 由于缩小侧边栏问题，不能直接使用menu-list组件 -->
    <!-- <menu-list :menus="menus"></menu-list> -->

    <!-- </el-menu> -->
  </div>
</template>
<script type="text/javascript">
import { mapActions, mapState } from 'vuex'
import menuList from './chunk'
export default {
  name: 'VMenu',
  props: {
    mode: {
      type: String,
      default: 'vertical'
    },
    collapse: {
      type: Boolean,
      default: false
    },
    isShowMenu: {
      type: Boolean,
      default: false
    },
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    defaultActive: String,
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    menuTrigger: String,
    router: Boolean,
    menus: {
      type: Array,
      required: true
    }
  },
  components: {
    menuList
  },
  data () {
    return {
      newMenuIcon: '',
      newMenuName: '',
      newChildMenu: [],
      isShowMenu: false,
      limit: -1,
      limitA: -1,
      selectChildMenu: '',
      screenWidth: '',
      screenWidth1: '',

      // 更换自定义菜单图标
      ghfxIcons: [
        { url: 'icon-ghfxzyhjczl' },
        { url: 'icon-ghfxkjkf' },
        { url: 'icon-ghfxzhfx' }
      ],
      cgscIcons: [
        { url: 'icon-cgscxmgl' },
        { url: 'icon-cgsczjzx' },
        { url: 'icon-cgscddzc' },
        { url: 'icon-cgscwdrw' },
        { url: 'icon-cgsccggl' },
        { url: 'icon-cgscjkzx' }
      ],
      jcpgyjIcons: [
        { url: 'icon-jcpgyjjcdp' },
        { url: 'icon-jcpgyjdtjc' },
        { url: 'icon-jcpgyjjsyj' },
        { url: 'icon-jcpgyjdqpg' },
        { url: 'icon-jcpgyjjcyj' },
        { url: 'icon-jcpgyjjczt' },
        { url: 'icon-jcpgyjksh' }
      ],
      czjcyjIcons: [
        { url: 'icon-czpgyjzhjg' },
        { url: 'icon-czpgyjdtpg' },
        { url: 'icon-czpgyjjczc' }
      ],
      dghyzcIcons: [
        { url: 'icon-dghyzcfzxz' }
      ],
      zbmxIcons: [
        { url: 'icon-zbmxzbgl' },
        { url: 'icon-zbmxmxgl' }
      ],
      zskIcons: [
        { url: 'icon-zskzsk' },
        { url: 'icon-zskglwh' },
        { url: 'icon-zskdywj' }
      ],
      ndtjIcons: [
        { url: 'icon-ndtjtjgl' },
        { url: 'icon-ndtjtjzb' }
      ],
      xtglIcons: [
        { url: 'icon-xtglyhgl' },
        { url: 'icon-xtglpzzx' },
        { url: 'icon-xtglwdzx' },
        { url: 'icon-xtglmhgl' },
        { url: 'icon-xtgllczx' },
        { url: 'icon-xtglssyq' },
        { url: 'icon-xtglxtgl' },
        { url: 'icon-xtglsjzx' },
        { url: 'icon-xtglywzx' },
        { url: 'icon-xtgldtfw' },
        { url: 'icon-xtglcszx' },
        { url: 'icon-swagger' }
      ]
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    isArr (v) {
      return Object.prototype.toString.call(v) === '[object Array]'
    },
    toRoute (item) {
      localStorage.setItem(item.resourceId, JSON.stringify(item.childButton))
      console.log('item', item)

      return {
        name: item.menuname,
        path: item.url,
        params: { menuId: item.id }
      }
    },
    open (index) {
      this.$emit('open', index)
    },
    close (index) {
      this.$emit('close', index)
    },
    select (index, tabs, event) {
      console.log('点击的路由', event)
      let title = event.$attrs.title
      let routerPath = index
      let params = event.$options.propsData.route.params
      let tabObj = { title, routerPath, params }

      // 将当前点击的选项添加到vuex中
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath, params: params })
      // this.$bus.$emit('clickMenu')
      this.$emit('select', index, params)
    },
    getIndexMenu (item, dex) {
      if (this.menus[dex].childMenu.length === 0) {
        this.limitA = dex
        this.isShowMenu = false
        // this.isShowMenu = true

        localStorage.setItem(
          this.menus[dex].resourceId,
          JSON.stringify(this.menus[dex].childButton)
        )

        // return { name: item.menuname, path: item.url, params: {menuId: item.id}}

        let menuObj = {
          name: this.menus[dex].menuname,
          path: this.menus[dex].url,
          params: { menuId: this.menus[dex].id }
        }

        let title = menuObj.name
        let routerPath = this.menus[dex].resourceId
        let params = menuObj.params
        let tabObj = { title, routerPath, params }

        console.log('tabObj', tabObj)
        console.log('item', item)

        // 将当前点击的选项添加到vuex中
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath, params: params })
        // this.$bus.$emit('clickMenu')
        let index = routerPath
        this.$emit('select', index, params)
      } else {
        if (this.screenWidth < 1600) {
          if (dex == this.limitA) {
            this.limitA = -1
            this.isShowMenu = !this.isShowMenu
          } else {
            this.isShowMenu = true
          }
        } else {
          if (dex == this.limitA) {
            this.limitA = -1
            this.isShowMenu = true
          } else {
            this.isShowMenu = true
          }
        }
        if (this.isShowMenu === true) {
          this.resetSetItem('watchShow', 0)
        } else {
          this.resetSetItem('watchShow', 1)
        }
        this.limitA = dex
        this.limit = -1
        this.newMenuIcon = this.menus[dex].iconCls
        this.newMenuName = this.menus[dex].menuname
        this.newChildMenu = this.menus[dex].childMenu
        this.selectChildMenu = sessionStorage.getItem('selectMenu')
        for (var key in this.newChildMenu) {
          if (this.newChildMenu[key].menuname === this.selectChildMenu) {
            let index = key
            this.limit = index
          }
        }
        // this.isShowMenu=true;
        console.log(this.limitA)
      }
    },
    toNewRoute (item, dex) {
      if (this.screenWidth < 1600) {
        this.isShowMenu = false
      } else {
        this.isShowMenu = true
      }

      //  if (dex == this.limit) {
      //   this.limit = -1;
      // } else {
      this.limit = dex
      // }
      console.log('limit', this.limit)
      localStorage.setItem(item.resourceId, JSON.stringify(item.childButton))
      console.log('item', item)

      // return { name: item.menuname, path: item.url, params: {menuId: item.id}}

      let menuObj = {
        name: item.menuname,
        path: item.url,
        params: { menuId: item.id }
      }

      let title = menuObj.name
      let routerPath = item.resourceId
      let params = menuObj.params
      let tabObj = { title, routerPath, params }

      console.log('tabObj', tabObj)
      sessionStorage.setItem('selectMenu', title)

      // 将当前点击的选项添加到vuex中
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath, params: params })
      // this.$bus.$emit('clickMenu')
      let index = routerPath
      this.$emit('select', index, params)
    }
  },
  created () {
    this.screenWidth = document.body.clientWidth
    this.screenWidth1 = this.screenWidth - 308
    console.log(this.screenWidth)
    console.log(this.screenWidth1)
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    this.screenWidth1 = this.screenWidth - 308
    // window.onresize = () => {
    //   return (() => {
    //     this.screenWidth = document.body.clientWidth;
    //     this.screenWidth1 = this.screenWidth - 308;
    //   })();
    // };
    window.addEventListener(
      'resize',
      () => {
        return (() => {
          this.screenWidth = document.body.clientWidth
          this.screenWidth1 = this.screenWidth - 308
        })()
      },
      0
    )
  },
  destroyed () {
    sessionStorage.removeItem('selectMenu')
  },
  watch: {
    menus: {
      handler (newValue, oldValue) {
        console.log('left', newValue)
        for (var key in newValue) {
          if (newValue[0].menuname === '资源环境承载力评价') {
            newValue[key]['ghfxIcons'] = this.ghfxIcons[key].url
            this.resetSetItem('watchStorage', 0)
          } else if (newValue[0].menuname === '项目管理') {
            newValue[key]['cgscIcons'] = this.cgscIcons[key].url
            this.resetSetItem('watchStorage', 0)
          } else if (newValue[0].menuname === '监测大屏') {
            newValue[key]['jcpgyjIcons'] = this.jcpgyjIcons[key].url
            this.resetSetItem('watchStorage', 0)
          } else if (newValue[0].menuname === '综合监管') {
            newValue[key]['czjcyjIcons'] = this.czjcyjIcons[key].url
            this.resetSetItem('watchStorage', 0)
          } else if (newValue[0].menuname === '辅助选址') {
            newValue[key]['dghyzcIcons'] = this.dghyzcIcons[key].url
            this.resetSetItem('watchStorage', 0)
          } else if (newValue[0].menuname === '指标管理') {
            newValue[key]['zbmxIcons'] = this.zbmxIcons[key].url
            this.resetSetItem('watchStorage', 0)
          } else if (newValue[0].menuname === '知识库') {
            newValue[key]['zskIcons'] = this.zskIcons[key].url
            this.resetSetItem('watchStorage', 0)
          } else if (newValue[0].menuname === '体检管理') {
            newValue[key]['ndtjIcons'] = this.ndtjIcons[key].url
            this.resetSetItem('watchStorage', 0)
          } else if (newValue[0].menuname === '用户中心') {
            newValue[key]['xtglIcons'] = this.xtglIcons[key].url
            this.resetSetItem('watchStorage', 0)
          }
        }
        if (newValue.length != 0) {
          this.resetSetItem('watchStorage', 0)
          if (newValue[0].id != oldValue[0].id) {
            this.limitA = -1
            this.limit = -1
            this.isShowMenu = false
          }
        }
        if (newValue.length == 0) {
          this.resetSetItem('watchStorage', 1)
          this.limitA = -1
          this.limit = -1
          this.isShowMenu = false
        }
      },
      deep: true
    }
  }
}
</script>
<style type="text/css">
.el-menu.side-menu {
  border-right: none;
}
.el-menu .fa {
  font-size: 15px;
  margin-right: 0px;
  display: inline-block;
  width: 23px;
  text-align: center;
  color: inherit;
}
.leftMenu .el-menu-item.is-active {
  background-color: #282f32;
}
</style>
<style scoped>
.menu-click-dex {
  width: 198px !important;
  /* background-color: #1d7ce4; */
  color: #076fff;
  border-right: 6px solid #1b74ee;
  font-weight: bolder;
}
.menuicon-click-dex {
  background-color: #055cd2;
  color: #fff;
  /* border-right: 3px solid rgb(254, 162, 0); */
  box-sizing: border-box;
}
.i-special {
  color: #76b0ff;
}
.menuicon-click-dex .i-special {
  color: #fff;
}
.span-special:hover {
  color: #076fff;
}
.span-special {
  color: #8a8a8a;
}
.menu-click-dex .span-special {
  color: #076fff;
}
.nav-special:hover {
  background-color: #055cd2;
}
.nav-special:hover .i-special {
  color: #fff;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}

@media screen and (max-width: 1599px) {
  .fbnav-sub {
    z-index: 9999;
    background-color: #edeff5 !important;
  }
  .fbnav-sub-zhezhao {
    height: 100%;
    background-color: rgba(204, 204, 204, 0.3);
    position: absolute;
    left: 308px;
    top: 0;
    z-index: 998;
  }
}
</style>
