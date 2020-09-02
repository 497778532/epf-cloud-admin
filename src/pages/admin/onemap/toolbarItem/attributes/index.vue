<template>
  <div>
    <item @openPanel="updateShowState"></item>
    <widget class="drawBox" :isDrawBoxShow="isDrawBoxShow"></widget>
  </div>
</template>
<script>
import item from './src/item'
import widget from './src/widget'
export default {
  components: {
    item,
    widget
  },
  data() {
    return {
      isDrawBoxShow: false
    }
  },
  computed: {
    mapApp() {
      return this.$parent.mapApp
    }
  },
  methods: {
    updateShowState(name) {
      this.isDrawBoxShow = !this.isDrawBoxShow
    },
    onClosePanel(name) {
      this._closePanel(name)
    },
    onOpenPanel(name) {
      // this._closeAllPanel();
      this._openPanel(name)
    },
    _openPanel(name) {
      this['is' + name + 'Show'] = true
    },
    _closePanel(name) {
      this['is' + name + 'Show'] = false
    },
    _closeAllPanel() {
      this.panelsList.forEach(name => {
        this._closePanel(name)
      })
    }
  }
}
</script>
<style scoped>
.drawBox {
  position: absolute;
  top: 2.625rem;
  right: 0rem;

}
.drawBox .option-class {
  height: 24px;
  font-size: 12px;
  line-height: 24px;
}
</style>
