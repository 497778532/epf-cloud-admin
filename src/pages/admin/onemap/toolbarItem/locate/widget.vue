<template>
  <widgetpanel v-show="showPanel">
    <div class="epf-map-content">
      <div>
        <p class="input-label">输入坐标</p>
        <el-input placeholder="格式参考：113.22,23.22"
                  v-model="coordinateText"
                  type="textarea"
                  clearable
                  :maxlength="50"></el-input>
      </div>
      <div class="buttonList">
        <el-button type="info"
                   size="medium"
                   @click="handleCleanClick">清空</el-button>
        <el-button type="primary"
                   size="medium"
                   @click="handleLocationClick">定位</el-button>
      </div>
    </div>
  </widgetpanel>
</template>

<script>
import widgetpanel from '../../utils/panel'
export default {
  name: 'LocateWidget',
  componentName: '定位',
  inject: ['mapAppId'],
  props: {
    layer: Object
  },
  data () {
    return {
      coordinateText: '',
      centerPoint: null,
      showPanel: false,
      mapApp: null
    }
  },
  methods: {
    handleCleanClick () {
      this.coordinateText = ''
    },
    handleLocationClick () {
      if (this.coordinateText !== '') {
        var coordinate = this.coordinateText.split(',')

        var x = Number(coordinate[0])
        var y = Number(coordinate[1])
        if (!this.mapApp) {
          this.mapApp = this.$findMapApp(this.mapAppId)
        }
        this.mapApp.addPoint(x, y)
        this.mapApp.view.goTo({
          target: [x, y],
          zoom: 12
        })
      }
    },
    addPoint (x, y) {
      let wkid = this.mapApp.view.spatialReference.wkid
      let coordinateConversion = this.mapApp.widgets.find(
        e => e.coordinateConversion
      )
      this.centerPoint = coordinateConversion.createCenter(wkid, x, y)
    }
  },
  components: {
    widgetpanel
  }
}
</script>

<style scoped>
.input-label {
  margin: 10px 0px;
}
.buttonList {
  margin-top: 1rem;
  text-align: center;
}
</style>
