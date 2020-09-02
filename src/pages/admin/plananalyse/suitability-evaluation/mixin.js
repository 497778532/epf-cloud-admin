import { LAYERS } from '../common/mock'
export default {
  data() {
    return {
      mapApp: null,
      hasShowResultLayer: false
    }
  },
  methods: {
    findLayer() {
      const mapAppId = this.$refs.suitability.name
      this.mapApp = this.$findMapApp(mapAppId)
      return this.mapApp.findLayerById(LAYERS[this.routeId * 1 - 1].title)
    },
    findMapApp() {
      const mapAppId = this.$refs.suitability.name
      this.mapApp = this.$findMapApp(mapAppId)
      return this.mapApp
    },
    showResultLayer(res) {
      if (res && res.hasFinished) {
        const layer = this.findLayer()
        if (layer) {
          this.mapApp.setLayerVisiblity(LAYERS[this.routeId * 1 - 1].title, true)
        } else {
          // this.mapApp.addLayerToMap(LAYERS[this.routeId * 1 - 1])
          this.$addLayerToMap({mapApp: this.mapApp}, LAYERS[this.routeId * 1 - 1])
        }
      }
    },
    hideResultLayer() {
      if (this.mapApp) {
        const layers = this.mapApp.getAllLayer()
        if (layers) {
          layers.forEach(layer => {
            layer.visible = false
          })
        }
      }
    },
    handleCancelClick() {
      this.mapApp.removeAllLayer()
    }
  }
}
