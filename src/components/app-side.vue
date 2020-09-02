<template>
  <v-menu class="side-menu"
          :collapse="collapse"
          :default-active="defaultActive"
          :menus="menus"
          :background-color="color"
          :text-color="textColor"
          :active-text-color="theme.activeTextColor"></v-menu>
</template>
<script type="text/javascript">
import VMenu from './vmenu'
import Bus from '../utils/bus.js'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  props: {
    collapse: Boolean,
    theme: Object
  },
  components: {
    VMenu
  },
  data () {
    return {
      color: 'rgba(249,249,249,1)',
      textColor: 'rgba(48,48,48,1)',
      menus: [],
      defaultActive: 'home',
      test: 'asdfasdf',
      busType: 'watch',
      localMenuDown: false
    }
  },
  watch: {
    $route () {
      this.setCurrentRoute()
    },
    localMenuDown: {
      handler: function (newValue) {
        // console.log('watch情况', this.busType, newValue)
        this.getMenu()
      }
    }
  },
  mounted () {
    const me = this
    this.$bus.$on('describe', val => {
      if (val instanceof Object) {
        let title = '表单预览'
        let routerPath = 'ComprehensiveDeail'
        var tabObj = { title, routerPath }
        this.$router.push({
          name: 'ComprehensiveDeail',
          params: { documentId: val.id }
        })
        this.setTabsList(tabObj)
        this.busType = 'describe'
        this.getMenu(val.key)
        return
      }
      if (val === 'oneMap?index=4') {
        this.$router.push({
          name: 'onemap',
          params: { index: 4 }
        })
        this.busType = 'describe'
        this.getMenu(val.key)
        return
      }
      if (val === 'pages/admin/home-page/LeadershipIndex') {
        let routerPath = 'LeadershipIndex'
        this.$router.push({ path: routerPath })
      }
      if (val === 'pages/admin/onemap/onemap') {
        if (me.$route.name === 'onemap') {
          me.$store.dispatch('onemap/setSpecialF')
        }
        let routerPath = 'onemap?'
        this.$router.push({ path: routerPath })
      }

      if (val === 'systemManage2') {
        let title = '土地资源评价'
        let routerPath = 'oceandepth?index=1'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath, query: { index: '1' } })
      }
      if (val === 'systemManage3') {
        let title = '监控中心'
        let routerPath = 'monitoringcenter'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath })
      }
      if (val === 'systemManage4') {
        let title = '监测大屏'
        let routerPath = 'MonitorLargeScreen'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath })
      }
      if (val === 'systemManage5') {
        let title = '综合监管'
        let routerPath = 'SynthesizeLargeScreen'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath })
      }
      if (val === 'systemManage6') {
        let title = '指标库管理'
        let routerPath = 'indicatorbase'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath })
      }
      if (val === 'knowledgeManage') {
        let title = '公共文档'
        let routerPath = 'knowledge'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath })
      }
      if (val === 'systemManage') {
        let title = '地图服务仓库'
        let routerPath = 'mapServeStore'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath })
      }
      if (val === 'plansupport') {
        let title = '辅助选址'
        let routerPath = 'Auxiliary'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath })
      }
      if (val === 'systemManage9') {
        let title = '体检管理'
        let routerPath = 'HealthAdmin'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath })
      }
      // console.log('describe', val)
      this.busType = 'describe'
      this.getMenu(val)
    })
    this.$bus.$on('menuData', val => {
      this.localMenuDown = true
    })
  },
  methods: {
    ...mapActions(['setTabsList']),
    getMenu (val) {
      let activeIndex = 0
      if (
        localStorage.getItem('menuData') === null
        || localStorage.getItem('menuData') === ''
      ) {
        this.busType = 'watch'
        return null
      }
      if (localStorage.getItem('menuData')) {
        let res = JSON.parse(localStorage.getItem('menuData'))
        let newVal = val == undefined ? 'supplyDemand' : val
        res.menus.map((item, index) => {
          if (item.url == newVal) {
            activeIndex = index
          }
        })
        // console.log('activeIndex', activeIndex)
        this.menus = res.menus[activeIndex]['childMenu']
        // console.log('默认', this.menus)
        return null
      }
    },
    setCurrentRoute () {
      // console.log('setCurrentRoute', this.$route)
      this.defaultActive = this.$route.name
      // console.log(this.defaultActive)
    }
  },
  created () {
    this.setCurrentRoute()
    this.getMenu()
  },
  watch: {
    $route (to, from) {
      if (to.fullPath === '/totalassignment?currentassignment=0') {
        this.defaultActive = 'totalassignment?currentassignment=0'
      } else if (to.fullPath === '/totalassignment?currentassignment=1') {
        this.defaultActive = 'totalassignment?currentassignment=1'
      } else if (to.fullPath === '/totalassignment?currentassignment=2') {
        this.defaultActive = 'totalassignment?currentassignment=2'
      } else if (to.fullPath === '/totalassignment?currentassignment=3') {
        this.defaultActive = 'totalassignment?currentassignment=3'
      } else if (to.fullPath === '/totalassignment?currentassignment=4') {
        this.defaultActive = 'totalassignment?currentassignment=4'
      } else if (to.fullPath === '/totalassignment?currentassignment=5') {
        this.defaultActive = 'totalassignment?currentassignment=5'
      } else if (to.fullPath === '/oceandepth?index=1') {
        this.defaultActive = 'oceandepth?index=1'
      } else if (to.fullPath === '/monitoringcenter') {
        this.defaultActive = 'monitoringcenter'
      } else if (to.fullPath === '/MonitorLargeScreen') {
        this.defaultActive = 'MonitorLargeScreen'
      } else if (to.fullPath === '/SynthesizeLargeScreen') {
        this.defaultActive = 'SynthesizeLargeScreen'
      } else if (to.fullPath === '/indicatorbase') {
        this.defaultActive = 'indicatorbase'
      } else if (to.fullPath === '/knowledge') {
        this.defaultActive = 'knowledge'
      } else if (to.fullPath === '/mapServeStore') {
        this.defaultActive = 'mapServeStore'
      } else if (to.fullPath === '/Auxiliary') {
        this.defaultActive = 'Auxiliary'
      } else if (to.fullPath === '/HealthAdmin') {
        this.defaultActive = 'HealthAdmin'
      }
    }
  }
}
</script>
<style type="text/css">
.el-menu.side-menu {
  border-right: none;
}
.el-menu .fa {
  font-size: 18px;
  margin-right: 7px;
  display: inline-block;
  width: 23px;
  text-align: center;
}

.side-menu .el-submenu.is-active.is-opened .el-menu-item {
  /* background: rgba(249, 249, 249, 1) !important; */
}

.side-menu .el-submenu.is-active.is-opened .el-menu-item {
  background: rgba(225, 225, 225, 1) !important;
  color: rgba(85, 85, 80, 1) !important;
}

.side-menu .el-submenu.is-active.is-opened .el-menu-item.is-active {
  background: rgba(29, 124, 228, 1) !important;
  color: rgba(255, 255, 255, 1) !important;
}
.el-menu.side-menu .el-menu-item.is-active {
  background: rgba(29, 124, 228, 1) !important;
  color: rgba(255, 255, 255, 1) !important;
}
/* .el-menu.side-menu .el-submenu.is-opened .el-submenu__title:hover{
    background: red !important;
  } */
/* .el-menu.side-menu .el-submenu.is-opened .el-submenu__title{
    background: #282f32 !important;
  }
  .el-menu.side-menu .el-submenu.is-opened .el-menu{
    background: #282f32 !important;
  }
  .el-menu.side-menu .el-submenu.is-opened .el-menu .el-menu-item{
    background: #282f32 !important;
  } */
.el-menu.side-menu .el-menu-item.is-active {
  border-right: solid 3px #fea200;
  min-width: 188px !important;
  /* background:  #282f32 !important; */
}

.el-menu--inline .el-menu-item-group .el-menu-item-group__title {
  padding: 0 !important;
}
</style>
