import {MAPSERVICE, PEOPLEANDLAND_MAPSERVICE } from './mock'
import gisMixin from './gis'
export default {
  mixins: [gisMixin],
  data() {
    return {
      peopleAndLandMapService: null,
      selectedIndexForPeopleAndLand: 0, // 人地内部关系专题选择
      mapServices: null,
      mapAppId: null,
      keyMap: ['城镇开发边界内住宅用地占比', '人均住宅用地面积', '公园绿地占比', '人均公园绿地面积', '公共服务用地面积占比', '人均公服用地面积']
    }
  },
  created() {
    this.mapServices = this.$cloneDeep(MAPSERVICE)
    this.peopleAndLandMapService = this.$cloneDeep(PEOPLEANDLAND_MAPSERVICE)
  },
  methods: {
    getMapApp(mapApp) {
      this.mapApp = mapApp
      this.$bus.$emit('addXZQHLayer', this.mapApp.name)
      this.addLayerToMap(this.peopleAndLandMapService[this.selectedIndexForPeopleAndLand])
      this.bindMapApp()
      this.flag = this.keyMap[this.selectedIndexForPeopleAndLand]
      this.bindPopupInfo()
    }
  }
}
