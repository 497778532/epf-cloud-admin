<template>
  <transition name="el-zoom-in-top">
    <div class="panelbox">
      <div class="panelbox-title">
        <span>{{ widgetName }}</span>
        <i class="el-icon-close"
           @click="closeClickHander"
           style="position: absolute;right:20px;"></i>
      </div>
      <div class="panelbox-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'epf-onemap-panel',

  data () {
    return {
      showPanel: false
    }
  },

  methods: {
    closeClickHander () {
      this.$parent.showPanel = false
    }
  },
  computed: {
    widgetName () {
      return this.$parent.$options.componentName
    }
  }
}
</script>

<style scoped>
.panelbox {
  position: absolute;
  top: 24px;
  right: 75px;
  width: 410px;
  height: 690px;
}
.panelbox-title {
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0px 5px 0 rgba(0, 0, 0, 0.5);
  position: relative;
}

.panelbox-content {
  position: absolute;
  top: 45px;
  width: 100%;
  bottom: 0px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  /* border: 1px solid #999; */
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.panelbox-content::-webkit-scrollbar {
  display: none;
}
.el-icon-close {
  cursor: pointer;
}
@media screen and (max-width: 1900px) {
  .panelbox {
    top: 24px;
    height: 80%;
  }
}
</style>
