<template>
  <el-container class="app-container"
                :class="{ 'mini-side': isCollapse, 'hide-side': hideSide }">
    <el-header class="app-header"
               :height="headerHeight + 'px'">
      <app-header @switch="handleSideSwitch"
                  @set-theme="handleSetTheme"
                  @hide-side="handleSwitchHideSide"
                  :activeMessage="activePath"></app-header>
    </el-header>
    <el-container style="overflow-x: auto">
      <el-aside style="background:transparent;overflowX:hidden;width:0px;"
                v-if="this.isMenu == 1">
        <app-side :collapse="isCollapse"
                  :theme="theme.theme"></app-side>
      </el-aside>
      <div v-show="this.isMenu == 0">
        <app-side :collapse="isCollapse"
                  :theme="theme.theme"></app-side>
      </div>
      <!-- <el-aside class="app-side"
                :width="hideSide ? '0' : sideWidth + 'px'"
                :style="{background: 'rgba(249,249,249,1)','overflowX':'hidden'}"
                v-if="this.isMenu==0">
        <app-side :collapse="isCollapse"
                  :theme="theme.theme"></app-side>
      </el-aside>-->
      <el-container id="appBody"
                    style="width:100%;"
                    :style="{ height: screenHeight1 + 'px' }">
        <div class="topTools"
             :class="{'topTools1': this.menuSearch == 0,'topTools2': this.isMenu == 0}"
             v-if="this.isMenu == 0 || this.menuSearch == 0">
          <el-tabs id="viewTabs"
                   style="width:100%;padding-right:130px;z-index:10;box-shadow:0px 1px 3px 0px rgba(153,153,153,0.5);"
                   class="mainTabs"
                   ref="mainTabsRerfs"
                   :value="active.activeIndex"
                   type="card"
                   @tab-click="currentTab"
                   @tab-remove="removeTab">
            <el-tab-pane closable
                         v-for="item in tabsList"
                         :key="item.name"
                         :label="item.title"
                         :name="item.name"
                         :routerPath="item.routerPath">
              <span v-rightMenu="menudata"
                    @contextmenu="rightClick(item.routerPath)"
                    @mouseenter="enterTabs(item.routerPath)"
                    style="display:block;position:relative;padding:0 30px 0 15px;"
                    slot="label">{{ item.title }}</span>
              <!-- <el-main class="."> -->
              <!-- <keep-alive> -->
              <!-- <router-view></router-view> -->
              <!-- </keep-alive> -->
              <!-- </el-main> -->
            </el-tab-pane>
          </el-tabs>
          <span class="refreshBox">
            <el-tooltip effect="dark"
                        content="刷新"
                        placement="bottom">
              <span :class="{ refresh: true, refreshRun: refreshRun }"
                    @click="refresh">
                <i class="el-icon-refresh"></i>
              </span>
            </el-tooltip>
            <span v-if="toPath==='/ComprehensiveDeail'"
                  class="go-back">
              <span @click="back">返回</span>
            </span>

            <!-- <span class="refresh">
                <i class="el-icon-refresh"></i>
            </span>-->
          </span>
        </div>
        <el-main class="app-page-body">
          <!-- <keep-alive :exclude="['supplyDetail','entrustDetail']"> -->
          <transition :name="transitionName">
            <keep-alive :include="aliveList"
                        v-if="isRouterAlive">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-main>
        <!-- <el-footer class="app-footer"
                   :height="footerHeight + 'px'"
                   v-if="this.$route.fullPath != '/LeadershipIndex'">
          <app-footer></app-footer>
        </el-footer> -->
        <el-footer class="app-footer"
                   height="0px">
          <!-- <el-footer class="app-footer"
                   height="0px"
                   v-if="this.$route.fullPath == '/LeadershipIndex'"> -->
          <!-- <app-footer></app-footer> -->
        </el-footer>
      </el-container>
    </el-container>
    <!-- <m-back-top body-id="appBody"></m-back-top> -->
  </el-container>
</template>
<script type="text/javascript">
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppSide from '@/components/app-side'
import Axios from 'axios'
import { mapActions, mapState } from 'vuex'
import Bus from '@/utils/bus'
export default {
  name: 'app-view',
  computed: {
    ...mapState({
      tabsList: state => state.tabs.tabsList, // 选项卡列表
      active: state => {
        // 当前激活的选项卡
        return state.tabs
      }
    })
  },
  watch: {
    tabsList (v1, v2) {
      let arr = v1.map((val, index, arr) => {
        // console.log(val.name.indexOf('demandSupplyDetails') == -1)
        if (val.name.indexOf('EmailDetail') === -1) {
          return val.name
        }
      })
      // arr.unshift('editor')
      // arr.unshift('announcementeditor')
      // arr.unshift('vueTinymce')
      this.aliveList = arr
      // console.log('排除', this.aliveList)

      if (v1.length === 0) {
        this.$router.push({ path: '/LeadershipIndex' })
        this.activePath = 'pages/admin/home-page/LeadershipIndex'
        this.menuSearch = 1
        this.isMenu = 1
      }
    },
    active (v1, v2) {
      // console.log(v1, v2)
    },
    $route (to, from) {
      this.toPath = to.fullPath
      this.fullPath = from.fullPath
      if (to.fullPath === '' || to.fullPath === '/LeadershipIndex') {
        this.activePath = 'pages/admin/home-page/LeadershipIndex'
      }
      if (to.fullPath === '/onemap') {
        this.activePath = 'pages/admin/onemap/onemap'
      }
      if (to.fullPath === '/oceandepth?index=1') {
        this.activePath = 'systemManage2'
      }
      if (to.fullPath === '/monitoringcenter') {
        this.activePath = 'systemManage3'
      }
      if (to.fullPath === '/MonitorLargeScreen') {
        this.activePath = 'systemManage4'
      }
      if (to.fullPath === '/indicatorbase') {
        this.activePath = 'systemManage6'
      }
      if (to.fullPath === '/knowledge') {
        this.activePath = 'knowledgeManage'
      }
      if (to.fullPath === '/Auxiliary') {
        this.activePath = 'plansupport'
      }
      if (to.name === 'projectcheck') {
        this.refresh()
      }
      if (to.fullPath != '') {
        // let path = to.fullPath
        // if (path == '/LeadershipIndex' || path == '/onemap' || path == '/splitscreen' || path == '/templateHome' || path == '/makeTemplate' || path == '/makeColorTemplate' || path == '/makeFlowTemplate' || path == '/makeGradeTemplate' || path == '/makePieTemplate' || path == '/makeColumnarTemplate' || path == '/makeColorGradeTemplate' || path == '/makeHotTemplate' || path == '/makeWaterTemplate' || path == '/saveTemplate' || path == '/useTemplate') {
        //   this.menuSearch = 1
        // } else {
        //   this.menuSearch = 0
        // }
        let path = to.fullPath
        if (path.indexOf('/SearchList?word=') != -1) {
          this.menuSearch = 0
        } else {
          this.menuSearch = 1
        }
      }

      if (this.needRefresh.indexOf(to.name) != -1) {
        // 如果是需要刷新的页面则进行刷新
        this.refresh()
        this.needRefresh.splice(
          this.needRefresh.findIndex(item => item == to.name),
          1
        )
      }
      // if (this.transitionNum == 1) {
      //   this.transitionName = 'slide-right'
      //   this.transitionNum = 2
      //   return
      // }
      // if (this.transitionNum == 2) {
      //   this.transitionName = 'slide-left'
      //   this.transitionNum = 1
      //   return
      // }
    }
  },
  created () {
    let that = this
    this.screenHeight = document.body.clientHeight
    this.screenWidth = document.body.clientWidth
    this.screenHeight1 = this.screenHeight - 74
    if (this.active.activeIndex == 'home') {
      this.$router.push('/LeadershipIndex')
    }
    window.addEventListener('setItem', () => {
      this.newVal = sessionStorage.getItem('watchStorage')
      that.isMenu = that.newVal
      // console.log(this.newVal)
      // if (that.fullPath === '/onemap') {
      //   window.setTimeout(function () { that.isMenu = that.newVal }, 500)
      // } else {

      // }

      // console.log(this.isMenu);
    })
  },
  data () {
    return {
      toPath: '',
      isMenu: 1,
      newVal: '',
      aliveList: [],
      needRefresh: [],
      pushName: '',
      isRouterAlive: true,
      isCollapse: false,
      hideSide: false,
      sideWidth: 200,
      footerHeight: 50,
      headerHeight: 74,
      currentRightPath: '', //  当前右键点击的tab
      currententerPath: '',
      theme: { theme: {} },
      editableTabsValue2: 'home',
      transitionName: 'slide-left',
      editableTabs2: [
        {
          title: '地块转让',
          name: '1',
          routerPath: '/transferPlace'
        },
        {
          title: '转让审批',
          name: '2',
          routerPath: '/rentPlace'
        }
      ],
      tabIndex: 3,
      transitionNum: 1,
      refreshRun: false,
      menudata: {
        // 菜单box的样式   Menu box style
        boxStyle:
          'width:120px;background:#fff;box-shadow: 0px 0px 15px rgb(172, 172, 172);padding:10px 0;',
        // 菜单选项的样式 Style of menu options
        optionStyle:
          'color:#666;line-height:30px;font-size:12px;text-center:left;padding:0 5px;',
        menus: [
          {
            content: '关闭右侧标签页',
            callback: 'closeOnRight',
            style:
              'border-bottom:1px solid #fff;background:#fff;line-height:30px;'
          },
          {
            content: '关闭其他标签页',
            callback: 'closeOther',
            style:
              'border-bottom:1px solid #fff;background:#fff;line-height:30px;'
          },
          {
            content: '关闭所有标签页',
            callback: 'closeAll',
            style:
              'border-bottom:1px solid #fff;background:#fff;line-height:30px;'
          }
        ]
      },

      activePath: '',
      menuSearch: 1,

      screenHeight: '',
      screenWidth: '',
      screenHeight1: ''
    }
  },
  components: {
    AppHeader,
    AppFooter,
    AppSide
  },
  mounted () {
    this.screenHeight = document.body.clientHeight
    this.screenWidth = document.body.clientWidth
    this.screenHeight1 = this.screenHeight - 74
    // window.onresize = () => {
    //   return (() => {
    //     this.screenHeight = document.body.clientHeight
    //     this.screenWidth = document.body.clientWidth
    //     this.screenHeight1 = this.screenHeight - 74
    //   })()
    // }
    window.addEventListener(
      'resize',
      () => {
        return (() => {
          this.screenHeight = document.body.clientHeight
          this.screenWidth = document.body.clientWidth
          this.screenHeight1 = this.screenHeight - 74
        })()
      },
      0
    )
    // 其他组件需要关闭标签页
    this.$bus.$on('closeTabsItem', val => {
      // console.log(val)
      this.removeTab(val)
      this.refresh()
    })
    // 刷新指定页面
    this.$bus.$on('refreshPage', val => {
      this.needRefresh.push(...val)
      this.needRefresh = Array.from(new Set(this.needRefresh))
    })
  },
  methods: {
    ...mapActions([
      'deleteTab',
      'setActive',
      'closeRight',
      'offOther',
      'offAll'
    ]),
    closeOnRight () {
      if (this.currentRightPath != this.currententerPath) {
        this.currentRightPath = this.currententerPath
      }
      this.$router.push({ path: this.currentRightPath })
      this.closeRight(this.currentRightPath)
    },
    closeOther () {
      if (this.currentRightPath != this.currententerPath) {
        this.currentRightPath = this.currententerPath
      }
      this.$router.push({ path: this.currentRightPath })
      this.offOther(this.currentRightPath)
    },
    closeAll () {
      if (this.currentRightPath != this.currententerPath) {
        this.currentRightPath = this.currententerPath
      }
      this.$router.push({ path: '/' })
      this.offAll()
    },
    back () {
      if (this.fullPath === '/ComprehensiveAdmin') {
        this.$router.push('/ComprehensiveAdmin')
        return
      }
      this.$bus.$emit('closeTabsItem', 'ComprehensiveDeail')
      Bus.$emit('describe', 'oneMap?index=4')
    },
    rightClick (path) {
      this.currentRightPath = path
    },
    enterTabs (path) {
      this.currententerPath = path
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    handleSideSwitch (val) {
      this.isCollapse = val
      this.sideWidth = val ? 60 : 200
    },
    handleSwitchHideSide () {
      this.hideSide = !this.hideSide
    },
    handleSetTheme (theme) {
      this.theme = theme
    },
    currentTab (val, event) {
      // console.log('删除页面可以传', val.$attrs)
      if (val.$attrs.routerPath == '/') {
        this.setActive('home')
        this.$router.push({ path: '/' })
        if (this.needRefresh.indexOf('home') != -1) {
          this.refresh()
          this.needRefresh.splice(
            this.needRefresh.findIndex(item => item == 'home'),
            1
          )
        }
        return
      }
      this.setActive(val.$attrs.routerPath)
      this.$router.push({ path: '/' + val.$attrs.routerPath })
      // 切换的时候刷新详情页
      if (val.$attrs.routerPath.indexOf('demandSupplyDetails') != -1) {
        this.reload()
      }
    },
    // 点击刷新按钮
    refresh () {
      this.refreshRun = true
      let routerName = this.$route.name
      if (this.$route.path === '/ThreeLine') {
        this.$router.push('/ThreeLine?index=home')
      }

      for (let i = 0; i < this.aliveList.length; i++) {
        if (this.aliveList[i] == routerName) {
          this.pushName = this.aliveList[i]
          this.aliveList.splice(i, 1)
        }
      }
      this.reload()
      setTimeout(() => {
        this.aliveList.push(this.pushName)
      }, 20)
      this.refreshRun = false
    },
    // addTab(targetName) {//element 案例中的添加标签
    //   let newTabName = ++this.tabIndex + "";
    //   this.editableTabs2.push({
    //     title: "New Tab",
    //     name: newTabName,
    //     content: "New Tab content"
    //   });
    //   this.editableTabsValue2 = newTabName;
    // },
    removeTab (targetName) {
      this.deleteTab(targetName)
      // console.log('========targetName=====', targetName)
      if (this.active.activeIndex == 'home') {
        this.$router.push('/')
      } else {
        this.$router.push(this.active.activeIndex)
      }
      //   let tabs = this.editableTabs2;
      //   let activeName = this.editableTabsValue2;
      //   if (activeName === targetName) {
      //     tabs.forEach((tab, index) => {
      //       if (tab.name === targetName) {
      //         let nextTab = tabs[index + 1] || tabs[index - 1];
      //         if (nextTab) {
      //           activeName = nextTab.name;
      //         }
      //       }
      //     });
      //   }
      //   this.editableTabsValue2 = activeName;
      //   this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
    }
  }
}
</script>
<style type="text/css">
.el-main {
  padding: 0;
}
.page-body {
  padding: 15px;
}
.el-tabs__header {
  margin-bottom: 0px;
}
.mainTabs {
  z-index: 10 !important;
}
.mainTabs .el-tabs__content {
  overflow-y: auto;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0px;
}
.topTools {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  min-height: 41px;
}
.refreshBox {
  display: flex;
  box-sizing: border-box;
  height: 41px;
  width: 10%;
  position: absolute;
  width: 130px;
  right: 0;
  top: 0;
  border-bottom: 1px solid #e4e7ed;
  z-index: 11;
  align-items: center;
}
.go-back {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  color: rgb(114, 114, 114);
  cursor: pointer;
}
.refresh {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  font-size: 26px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  color: rgb(114, 114, 114);
  border-left: 1px solid #e4e7ed;
  border-right: 1px solid #e4e7ed;
}
.refresh > i {
  transform: rotateY(180deg);
}
.refresh:hover i {
  animation: refRun2 0.8s infinite;
}
.refreshRun > i {
  animation: refRun 0.8s infinite;
}
@keyframes refRun {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes refRun2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.app-container {
  margin: 0 auto;
  /* position: absolute; */
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.app-container .app-header {
  padding: 0;
  /* background: #16aad8; */
  overflow: visible;
  z-index: 99;
}
.app-side {
  position: relative;
  z-index: 10;
  border-right: 1px solid rgb(212, 212, 212);
}
.app-container .app-side {
  width: 210px !important;
  transition: all 0.5s ease;
}
.app-container .app-body {
  padding: 0;
  height: 90%;
}
.app-container .app-footer {
  background: #fff;
  border-top: solid 1px rgba(48, 54, 62, 0.14);
}
.app-container .app-page-body {
  width: 100%;
  height: 100%;
}
.app-header-logo-box {
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-header-logo-box .header-logo {
  height: 42px;
  margin-top: -17px;
  margin-right: 5px;
  vertical-align: middle;
}
.app-header-logo-box .header-logo-text {
  font-size: 20px;
  font-weight: bold;
  opacity: 1;
}

/*mini-side*/
.app-container.mini-side .app-side {
  overflow: visible;
}
.app-container.mini-side .app-side .el-menu--collapse {
  width: 60px;
}
.app-container.mini-side .header-logo {
  margin-left: -10px;
}
.app-container.mini-side .header-logo-text {
  opacity: 0;
}
/*hide-side*/
.app-container.hide-side .app-side {
  display: none;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  opacity: 0;
  overflow: hidden;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  opacity: 0;
  overflow: hidden;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-80%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(80%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(80%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-80%, 0, 0);
}
</style>
<style>
#viewTabs .el-tabs__item {
  padding: 0px !important;
  width: auto;
}
#viewTabs .el-tabs__item .el-icon-close {
  position: absolute;
  top: 13px;
  right: 8px;
  z-index: 220;
}
</style>
<style scoped>
@media screen and (max-width: 1599px) {
  #appBody {
    width: calc(100% - 74px) !important;
    height: 100%;
    left: 74px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .app-page-body {
    width: 100%;
    height: calc(100% - 41px) !important;
  }
  .topTools1 {
    width: calc(100% + 74px);
    position: relative;
    left: -74px;
  }
  .topTools2 {
    width: 100% !important;
    position: static !important;
  }
  /* .app-footer {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0px;
  } */
}
</style>
