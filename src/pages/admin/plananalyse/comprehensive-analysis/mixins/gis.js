import { AdaptContrastStatus, AdaptContrastThreeline, BearingContrastStatus, BearingContrastThreeline } from './mapservices.conf'
export default {
  data () {
    return {
      mapApp: null,
      routeId: '-1',
      activeIndexs: [0, 0, 0, 0],
      mapservices: []
    }
  },
  watch: {
    $route (to, from) {
      this.caseRouteQuery()
      this.addLayerToMap(this.activeIndexs[this.routeId * 1 - 1])
    }
  },
  created () {
    this.mapservices.push(AdaptContrastStatus || [])
    this.mapservices.push(AdaptContrastThreeline || [])
    this.mapservices.push(BearingContrastStatus || [])
    this.mapservices.push(BearingContrastThreeline || [])
  },
  mounted () {
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', res => {
      if (res === 'suitability99') {
        const me = this
        setTimeout(() => {
          me.mapApp = me.$findMapApp('suitability99')
          me.addLayerToMap(0)
        }, 20)
      }
    })
  },
  beforeDestroy () {
    this.$bus.$off('viewLoaded')
  },
  methods: {
    caseRouteQuery () {
      this.routeId = this.$route.query.index
    },
    addLayerToMap (index) {
      this.routeId = this.$route.query.index
      this.activeIndexs[this.routeId * 1 - 1] = index

      if (this.routeId && typeof this.routeId === 'string') {
        const mapservice = this.mapservices[this.routeId * 1 - 1]
        if (mapservice.length > 0) {
          let myServices = mapservice[index * 1]

          var titleArr = []
          if (Array.isArray(myServices)) {
            myServices.forEach(element => {
              titleArr.push(element.title)
              let layer = this.mapApp.findLayerById(element.title)
              if (!layer) {
                this.$addLayerToMap({ mapApp: this.mapApp }, element)
              } else {
                layer.visible = !layer.visible
              }
            })
          } else {
            titleArr.push(myServices.title)
            let layer = this.mapApp.findLayerById(myServices.title)
            if (!layer) {
              this.$addLayerToMap({ mapApp: this.mapApp }, myServices)
            } else {
              layer.visible = !layer.visible
            }
          }

          const allLayer = this.mapApp.getAllLayer()
          if (allLayer) {
            allLayer.forEach(layer => {
              if (titleArr.includes(layer.title) === false) {
                layer.visible = false
              }
            })
          }
        }
      }
    }
  }
}
