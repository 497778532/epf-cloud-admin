<template>
  <div>
    <div class="toolbar-button toolbar-button-jumpTo"
         title="定位"
         @click="handleJumpToClick">
      <img class="toolbar-button-jumpTo-icon"
           src="@/assets/onemap-jumpTo.png" />
      <p class="toolbar-button-jumpTo-text">
        {{currentCity}}
        <span class="triangle"></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'jumpToButton',
  inject: ['mapAppId'],
  data() {
    return {
      currentCity: '广东省',
      showPanel: false
    }
  },
  methods: {
    handleJumpToClick() {
      this.showPanel = !this.showPanel;
      this.$bus.$emit('showPanel', this.showPanel)
      this.$parent.isUploadShow = false
      this.$parent.isDrawBoxShow = false
      this.$parent.isToolboxShow = false
    }
  },
  mounted() {
    this.$bus.$on('changeCity', res => {
      this.currentCity = res
    })
    this.$bus.$on('showPanel', res => {
      this.showPanel = res
    })
  }
}
</script>

<style scoped>
@import "./style.css";
</style>
