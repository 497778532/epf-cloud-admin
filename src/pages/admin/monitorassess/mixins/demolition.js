import gisMixin from './gis'
export default {
  mixins: [gisMixin],
  data() {
    return {
      CJFKKeyMap: {
        '项目立项情况': '拆旧复垦立项',
        '项目验收情况': '拆旧复垦验收'
      },
      layerInfo3: {
        title: '拆旧复垦',
        type: 'feature',
        url: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/拆旧复垦/FeatureServer'
      },
      layerUrl: 'http://19.15.73.111/arcgisserver12/rest/services/城镇内部用地/拆旧复垦/FeatureServer',
      mapAppId: 'monitoringProject',
      queryResult: null,
      totalRecord: 0,
      pageSize: 5,
      totalPage: 0,
      gisData: [],
      gisDataProperties: [],
      loading: false,
      columns: []
    }
  },
  methods: {
    handleSelectionChange() {

    },
    getDataFromGISService(objectIds) {
      const me = this
      if (!this.mapApp) return
      return new Promise(resolve => {
        const sqlStr = 'OBJECTID_1 IN (' + objectIds + ')'
        me.mapApp.getQueryResult(this.layerUrl + '/0/query', null, [{ key: 'where', val: sqlStr}]).then(res => {
          if (res && res.fields) {
            me.columns = []
            res.fields.forEach(field => {
              me.columns.push({
                prop: field.name,
                label: field.alias
              })
            })
          }
          if (res && res.data) {
            me.totalRecord = 1000
            me.totalPage = Math.ceil((me.totalRecord * 1) / (me.pageSize * 1))
            me.features = me.$cloneDeep(res.data.features)
            resolve(me.features)
          }
        })
      })
    },
    getMapApp(mapApp) {
      const me = this
      this.mapApp = mapApp
      this.$bus.$emit('addXZQHLayer', mapApp.name)
      this.addLayerToMap(this.layerInfo3)
      this.flag = this.CJFKKeyMap[this.$refs.controlMenu.isCurrent]
      this.bindPopupInfo()
      this.bindMapApp()
      this.mapApp.addLayerEventListener('拆旧复垦', 'click', res => {
        const ks = Object.keys(res.graphic.attributes)
        let keyVals = []
        ks.forEach(k => {
          keyVals.push({
            key: 'where',
            val: `${k}=${res.graphic.attributes[k]}`
          })
        })
        me.mapApp.getQueryResult(me.layerUrl + '/0/query', null, keyVals).then(res => {
          if (res && res.data) {
            me.queryResult = res.data
            me.$bus.$emit('sendQueryResult', me.queryResult)
            me.$emit('sendQueryResult', me.queryResult)
          }
        })
      })
      me.getDataFromGISService('1,2,3,4,5').then(res => {
        if (res) {
          me.gisDataProperties = []
          me.columns = Object.keys(res.properties)
          me.gisData = res
          me.gisData.forEach(item => {
            me.gisDataProperties.push(item.properties)
          })
        }
      })
    }
  }
}
