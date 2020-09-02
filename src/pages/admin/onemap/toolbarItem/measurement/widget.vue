<template>
  <div id="measurecontent" @mousedown="mousedown" v-show="showPanel">
    <span class="el-icon-close closeM" @click="close"></span>
    <p style="margin-top: 20px;">距离测量</p>
    <div id="measureD"></div>
    <p>面积测量</p>
    <div id="measureA"></div>
  </div>
</template>

<script>
export default {
  name: 'MeasurementWidget',
  componentName: '测量',
  inject: ['mapAppId'],
  data() {
    return {
      constructor: null,
      instance: null,
      mapApp: null,
      showPanel: false,
      measureD:{},
      measureA:{}
    }
  },
  watch: {
    showPanel(val) {
      if (val) {
        this.showLegend()
      }
    }
  },
  methods: {
    showLegend() {
      document.getElementById("measureD").innerHTML=""
      document.getElementById("measureA").innerHTML=""
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }
      this.measureD = this.mapApp.createOutsideWidget(
        "DistanceMeasurement2D",
        {
          view: this.mapApp.view,
          container: document.getElementById("measureD"),
        }
      );
      this.measureA = this.mapApp.createOutsideWidget(
        "AreaMeasurement2D",
        {
          view: this.mapApp.view,
          container: document.getElementById("measureA"),
        }
      );     
    },
    close(){
      this.showPanel = false;
      this.measureD.visible = false;
      this.measureA.visible = false;
    },
    mousedown(event) {
      this.selectElement = document.getElementById('measurecontent')
      var div1 = this.selectElement
      this.selectElement.style.cursor = 'move'
      this.isDowm = true
      var distanceX = event.clientX - this.selectElement.offsetLeft
      var distanceY = event.clientY - this.selectElement.offsetTop
      document.onmousemove = function (ev) {
        var oevent = ev || event
        div1.style.left = oevent.clientX - distanceX + 'px'
        div1.style.top = oevent.clientY - distanceY + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
        div1.style.cursor = 'default'
      }
    },
  },
  components: {
    //widgetpanel
  }
}
</script>

<style scoped>
#measurecontent{
  position: absolute;
  top:24px;
  right:350px;
  width:350px;
  background: #fff;
}
p{
  width: 100%;
  height:25px;
  line-height: 25px;
  float: left;
  text-align: center;
  background: #0079c1;
  color: #fff;
}
#measureD,#measureA{
  width:100%;
  height:100%;
  float: left;
}
.closeM{
  position: absolute;
  top:0;
  right:0;
  width:20px;
  height:20px;
  cursor: pointer;
}
</style>
