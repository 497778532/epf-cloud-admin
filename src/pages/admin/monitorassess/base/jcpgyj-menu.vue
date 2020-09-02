<template>
  <div style="margin-top:20px" class="jcpgyj-menu-right">
    <el-menu :default-active="activeIndex" :default-openeds="['1']" class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i>
            <img src="@/assets/jcpgyj-cjfk-menu.png" alt />
          </i>
          <span>常用监测指标</span>
          <span>(5)</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click.native="handleItemClick(0)">预留规模台账</el-menu-item>
          <el-menu-item index="1-2" @click.native="handleItemClick(1)">拆旧复垦指标调整汇总</el-menu-item>
          <el-menu-item index="1-3" @click.native="handleItemClick(2)">纳入城乡建设用地预留规模需回填复垦区</el-menu-item>
          <el-menu-item index="1-4" @click.native="handleItemClick(3)">纳入城乡建设用地预留规模</el-menu-item>
          <el-menu-item index="1-5" @click.native="handleItemClick(4)">已验收拆旧复垦项目纳入城乡建设用地</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'jcpgyj-menu',
  commentName: '监测评估预警-拆旧复垦菜单',
  props: ['message'],
  data() {
    return {
      activeIndex: ''
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    handleItemClick(index) {
      this.$parent.initTimeline()
      this.$parent.selectedYear = new Date().getFullYear().toString()
      if (index == 0) {
        let title = '预留规模台账监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=0'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 0 }
        })
        this.$parent.getTableData()
        this.$parent.getYlgmtzList()
        this.activeIndex = '1-1'
      } else if (index == 1) {
        let title = '拆旧复垦指标调整汇总监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=1'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 1 }
        })
        this.$parent.getTableData()
        this.$parent.getYlgmtzList()
        this.activeIndex = '1-2'
      } else if (index == 2) {
        let title = '预留规模回填复垦区监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=2'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 2 }
        })
        this.$parent.getTableData()
        this.$parent.getYlgmtzList()
        this.activeIndex = '1-3'
      } else if (index == 3) {
        let title = '城乡建设用地预留规模监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=3'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 3 }
        })
        this.$parent.getTableData()
        this.$parent.getYlgmtzList()
        this.activeIndex = '1-4'
      } else if (index == 4) {
        let title = '已验收拆旧复垦项目监测指标'
        let routerPath = 'jcpgyj-ylgmtz?index=4'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { index: 4 }
        })
        this.$parent.getTableData()
        this.$parent.getYlgmtzList()
        this.activeIndex = '1-5'
      }
    }
  },
  created() {
    if (this.message == 0) {
      this.activeIndex = '1-1'
    } else if (this.message == 1) {
      this.activeIndex = '1-2'
    } else if (this.message == 2) {
      this.activeIndex = '1-3'
    } else if (this.message == 3) {
      this.activeIndex = '1-4'
    } else if (this.message == 4) {
      this.activeIndex = '1-5'
    }
  },
  watch: {
    message(val) {
      console.log(val)
      if (val == 0) {
        this.activeIndex = '1-1'
      } else if (val == 1) {
        this.activeIndex = '1-2'
      } else if (val == 2) {
        this.activeIndex = '1-3'
      } else if (val == 3) {
        this.activeIndex = '1-4'
      } else if (val == 4) {
        this.activeIndex = '1-5'
      }
    }
  }
}
</script>
<style scoped>
@import "../css/style.css";
</style>
<style>
.jcpgyj-menu-right .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 25px;
    min-width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
