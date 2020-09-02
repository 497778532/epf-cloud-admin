import gisMixin from './gis'
import { resolve } from 'tinymce'
export default {
  mixins: [gisMixin],
  data() {
    return {
      mapServiceTitle: '存量用地',
      mapApp: null,
      layerUrl: 'http://19.15.73.111/arcgisserver12/rest/services/存量用地/PTBBZ_2014/MapServer',
      gisQueryData: null,
      features: []
    }
  },
  mounted() {
    const me = this
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', res => {
      me.mapApp = me.$findMapApp(res)
      me.$addLayerToMap({ mapApp: me.mapApp }, {
        type: 'feature',
        title: me.mapServiceTitle,
        useProxy: false,
        url: me.layerUrl
      })
      me.mapApp.addLayerEventListener(me.mapServiceTitle, 'click', res => {
        const objectId = res.graphic.attributes.OBJECTID.toString()
        me.getDataFromGISService(objectId).then(res => {
          me.mapApp.showSelectedFeature(res[0])
          me.$refs.icoModeBase.showProjectInfo(res[0].properties)
        })
      })
    })
  },
  methods: {
    showGeometry(data) {
      const me = this
      setTimeout(() => {
        me.mapApp.showSelectedFeature(data)
      }, 100)
    },
    getDataFromGISService(objectIds) {
      const me = this
      if (!this.mapApp) return
      return new Promise(resolve => {
        me.mapApp.getQueryResult(this.layerUrl + '/0/query', null, [{ key: 'objectIds', val: objectIds }]).then(res => {
          if (me.$refs.stockList) {
            me.$refs.stockList.totalRecord = 4129
            me.$refs.stockList.totalPage = Math.ceil((me.$refs.stockList.totalRecord * 1) / (me.$refs.stockList.pageSize * 1))
          }
          if (!me.gisQueryData) {
            me.gisQueryData = res.data
          } else {
            me.gisQueryData.features = [...me.gisQueryData.features, ...res.data.features]
          }
          me.features = me.$cloneDeep(res.data.features)
          resolve(me.features)
        })
      })
    }
  }
}
