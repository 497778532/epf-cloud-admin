<template>
  <div>
    <div class="toolbar">
      <jump-to></jump-to>
      <!-- <zoom></zoom> -->
      <!-- <pan></pan> -->
      <attributes></attributes>
      <trash></trash>
      <toolbox @mouseenter.native="setToolBoxVisible"
               @mouseleave.native="setToolBoxVisible">
        <transition name="el-zoom-in-top">
          <div id="toolbox"
               v-show="showToolBoxItems">
            <legenditem @click.native="handleItemClick(0)"></legenditem>
            <splitscreen @click.native="handleItemClick(1)"></splitscreen>
            <!-- <sketchitem @click.native="handleItemClick(2)"></sketchitem> -->
            <uploaditem @click.native="handleItemClick(3)"></uploaditem>
            <locateitem @click.native="handleItemClick(4)"></locateitem>
            <printitem @click.native="handleItemClick(5)"></printitem>
            <screenshotitem @click.native="handleItemClick(6)"></screenshotitem>
            <measurement @click.native="handleItemClick(7)"></measurement>
          </div>
        </transition>
      </toolbox>
      <layerlist></layerlist>
      <basemap></basemap>
    </div>
    <jumpto-panel></jumpto-panel>
    <legendwidget ref="legendwidget"></legendwidget>
    <locatewidget ref="locatewidget"></locatewidget>
    <printwidget ref="printwidget"></printwidget>
    <screenshotwidget ref="screenshotwidget"></screenshotwidget>
    <!-- <sketchwidget ref="sketchwidget"></sketchwidget> -->
    <uploadwidget ref="uploadwidget"></uploadwidget>
    <detailbox></detailbox>
    <measurementwidget ref="measurementwidget"></measurementwidget>
  </div>
</template>

<script>
import layerlist from './toolbarItem/layerlist'
import basemap from './toolbarItem/basemap'

import detailbox from './dataDetail'

import zoom from './toolbarItem/zoom'

import pan from './toolbarItem/pan/widget'

import trash from './toolbarItem/trash/widget'

import attributes from './toolbarItem/attributes'

import legenditem from './toolbarItem/legend/item'
import legendwidget from './toolbarItem/legend/widget'

import locateitem from './toolbarItem/locate/item'
import locatewidget from './toolbarItem/locate/widget'

import printitem from './toolbarItem/print/item'
import printwidget from './toolbarItem/print/widget'

import screenshotitem from './toolbarItem/screenshot/item'
import screenshotwidget from './toolbarItem/screenshot/widget'

// import sketchitem from "./toolbarItem/sketch/item";
// import sketchwidget from "./toolbarItem/sketch/widget";

import splitscreen from './toolbarItem/splitscreen/item'

import uploaditem from './toolbarItem/upload/item'
import uploadwidget from './toolbarItem/upload/widget'

import toolbox from './toolbarItem/toolbox/item'

import JumpTo from './toolbarItem/jumpTo/item'
import JumptoPanel from '../onemap/toolbarItem/jumpTo/widget'

import measurement from './toolbarItem/measurement/item'
import measurementwidget from './toolbarItem/measurement/widget'

export default {
  name: 'toolbar',
  components: {
    layerlist,
    basemap,
    detailbox,
    zoom,
    JumpTo,
    JumptoPanel,
    pan,
    trash,
    attributes,
    legenditem,
    legendwidget,
    locateitem,
    locatewidget,
    printitem,
    printwidget,
    screenshotitem,
    screenshotwidget,
    // sketchitem,
    // sketchwidget,
    splitscreen,
    uploaditem,
    uploadwidget,
    toolbox,
    measurement,
    measurementwidget
  },
  data() {
    return {
      showToolBoxItems: false
    }
  },
  methods: {
    setToolBoxVisible() {
      this.showToolBoxItems = !this.showToolBoxItems
    },
    handleItemClick(index) {
      this.hideAllPanel()
      switch (index) {
        case 0:
          this.$refs.legendwidget.showPanel = true
          break
        case 1:
          const routerPath = 'splitscreen'
          this.$router.push({ path: routerPath })
          break
        case 2:
          this.$refs.sketchwidget.showPanel = true
          break
        case 3:
          this.$refs.uploadwidget.showPanel = true
          break
        case 4:
          this.$refs.locatewidget.showPanel = true
          break
        case 5:
          this.$refs.printwidget.showPanel = true
          break
        case 6:
          this.$store.dispatch('onemap/setScreenshotState', true)
          break
        case 7:
          this.$refs.measurementwidget.showPanel = true
          break
      }
    },
    hideAllPanel() {
      this.$refs.legendwidget.showPanel = false
      this.$refs.locatewidget.showPanel = false
      this.$refs.printwidget.showPanel = false
      this.$refs.screenshotwidget.showPanel = false
      // this.$refs.sketchwidget.showPanel = false;
      this.$refs.uploadwidget.showPanel = false
      //this.$refs.measurementwidget.showPanel = false;
      this.$refs.measurementwidget.close();
    }
  }
}
</script>

<style scoped>
@import "./toolbarItem/style.css";
.onemap-widget-panel {
  position: fixed;
  top: 10.25rem;
  right: 0.9rem;
  height: auto;
  max-height: 30rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.toolbar{
  position: fixed !important;
  top: 5.5rem !important;
}
</style>
