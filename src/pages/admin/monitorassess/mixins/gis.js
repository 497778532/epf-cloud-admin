import jumpto from '../../onemap/toolbarItem/jumpTo/item'
import toolbox from '../../onemap/toolbarItem/toolbox/item'
import Zoom from '../../onemap/toolbarItem/zoom/index'

import ToolItem from '../mapview-toolbar/CustomToolItem'
import ToggleMap from '../mapview-toolbar/CustomToggleMapItem'
import CityLocation from '../../onemap/toolbarItem/jumpTo/widget'
import ToolPanel from '../mapview-toolbar/CustomToolPanel'

export default {
  components: {
    jumpto,
    toolbox,
    Zoom,
    ToolItem,
    ToggleMap,
    CityLocation,
    ToolPanel
  },
  data() {
    return {
      myMapAppInitConf: null,
      myMapAppInitConf2: null,
      showPopup: false,
      popupPosition: '',
      popupContent: '',
      showToolPanel: false,
      mapApp: null,
      XZQHLayer: null,
      mapAppIds: [
        'threeLine',
        'peopleAndLand',
        'monitoringProject',
        'scan',
        'ConstraintIndex'
      ],
      flag: null,
      currentCityInfo: null,
      tsbbData: null
    }
  },
  watch: {
  },
  created() {
    this.myMapAppInitConf = this.$getMapAppInitConf()
    let arr1 = this.myMapAppInitConf.map.basemaps[0]
    let arr2 = this.myMapAppInitConf.map.basemaps[1]
    let arr3 = this.myMapAppInitConf.map.basemaps.slice(
      2,
      this.myMapAppInitConf.map.basemaps.length
    )
    this.myMapAppInitConf.map.basemaps = [arr2, arr1, ...arr3]
    this.myMapAppInitConf.map.xzqhService.disable = true

    this.myMapAppInitConf2 = this.$getMapAppInitConf()
    this.myMapAppInitConf2.map.basemaps = [
      [{
        title: '城镇内部人地关系底图',
        type: 'image',
        useProxy: false,
        url:""
        //url: 'http://172.16.8.122:6080/arcgis/rest/services/国土空间规划底图/城镇内部人地关系底图/MapServer'
      }]
    ]
    this.bindToggleMap()
    this.bindShowXZQH()
    this.bindChainPopup()  
    this.$bus.$on('refresh-data', res => {
      this.tsbbData = res
    })
  },
  mounted() {

  },
  methods: {
    bindMapApp() {
      const me = this
      me.mapApp.view.on('click', event => {
        me.showToolPanel = false
        me.$bus.$emit('showToolPanel', false)
      })
      // me.mapApp.addXZQHLayer(true, false)
      me.mapApp.removeLayerEventListener('XZQHLayer', 'click')
      me.mapApp.addLayerEventListener('XZQHLayer', 'click', res => {
        if (res) {
          const cityName = res.graphic.attributes.CityNameC
          if (me.mapApp.areaInfo) {
            this.currentCityInfo = me.mapApp.areaInfo.children.filter(child => child.zhCn === cityName)[0]
            me.$bus.$emit('sendCityInfo', this.currentCityInfo)
          }
        }
      })
    },
    addLayerToMap(layerInfo) {
      const me = this
      return new Promise(resolve => {
        me.$addLayerToMap({mapApp: me.mapApp}, layerInfo).then(res => {
          resolve(res)
        })
      })
    },
    bindPopupInfo() {
      if (this.mapApp) {
        const me = this
        this.mapApp.removeLayerEventListener('XZQHLayer', 'pointer-move')
        this.mapApp.addLayerEventListener('XZQHLayer', 'pointer-move', res => {
          if (res) {
            if (res.graphic.attributes) {
              me.showPopup = true
              const screenPoint = me.mapApp.view.toScreen(
                res.mapPoint
              )
              me.popupPosition = `top: ${screenPoint.y}px;left: ${screenPoint.x}px;`
              const cityName = res.graphic.attributes.CityNameC
              let myData = me.tsbbData.find(item => {
                return item.dictTranslate.cityName === cityName
              })

              if (me.mapApp.areaInfo) {
                this.currentCityInfo = me.mapApp.areaInfo.children.filter(child => child.zhCn === cityName)[0]
                me.$bus.$emit('sendCityInfo', this.currentCityInfo)
              }

              let val = ''
              switch (me.flag) {
                case '城镇开发边界内住宅用地占比':
                  val = (myData && myData.scaleCalc) ? myData.scaleCalc.toFixed(2) + '%' : '--'
                  break
                case '公园绿地占比':
                  val = (myData && myData.proportionOfParkGreenClac) ? myData.proportionOfParkGreenClac.toFixed(2) + '%' : '--'
                  break
                case '公共服务用地面积占比':
                  val = (myData && myData.scaleCalc) ? myData.scaleCalc.toFixed(2) + '%' : '--'
                  break
                case '人均住宅用地面积':
                  val = (myData && myData.areaPerCapitaCalc) ? myData.areaPerCapitaCalc.toFixed(2) + '平方米/人' : '--'
                  break
                case '人均公园绿地面积':
                  val = (myData && myData.areaPerCapitaCalc) ? myData.areaPerCapitaCalc.toFixed(2) + '平方米/人' : '--'
                  break
                case '人均公服用地面积':
                  val = (myData && myData.perPublicServArea) ? myData.perPublicServArea.toFixed(2) + '平方米/人' : '--'
                  break
                default:
                  break
              }
              me.popupContent = `${cityName} ：${val}`
            }
          } else {
            me.showPopup = false
          }
        })
      }
    },
    createYearsArray() {
      const thisYear = new Date().getFullYear()
      let arr = []
      for (let i = 0; i < 7; i++) {
        arr.push((thisYear - i).toString())
      }
      this.selectYear = arr[0]
      return arr.reverse()
    },
    addFirstMapService(mapAppId) {
      switch (mapAppId) {
        // case 'threeLine':
        //   this.$addLayerToMap({ mapApp: this.mapApp },
        //     this.mapServices['永久基本农田保护红线']
        //   )
        //   break
        // case 'peopleAndLand':
        //   this.$addLayerToMap({ mapApp: this.mapApp },
        //     this.mapServices['城镇住宅用地']
        //   )
        //   break
        // case 'monitoringProject':
        //   this.$addLayerToMap({ mapApp: this.mapApp }, {
        //     title: '广东省县区常住人口',
        //     type: 'feature',
        //     url: 'http://172.16.8.102:6080/arcgis/rest/services/城镇内部用地/广东省县区人口/FeatureServer'
        //   })
        //   break
        case 'scan':
          break
        case 'ConstraintIndex':
          this.$addLayerToMap({ mapApp: this.mapApp },
            this.mapServices['永久基本农田保护红线']
          )
          break
      }
    },
    bindChainPopup() {
      const me = this
      this.$bus.$off('chainPopup')
      this.$bus.$on('chainPopup', res => {
        if (!me.mapApp) return
        me.showPopup = true
        let xzqhLayer = this.mapApp.map.allLayers.items.find(item => {
          return item.id === 'XZQHLayer'
        })
        if (xzqhLayer) {
          const pt = xzqhLayer.graphics.items.find(e => {
            return e.attributes.CityNameC === res[0].name
          }).geometry.centroid
          const screenPt = me.mapApp.view.toScreen(pt)
          me.popupPosition = `top: ${screenPt.y}px;left: ${screenPt.x}px;`
          me.popupContent = `${res[0].name} ：${res[0].data}`
        }
      })
    },
    bindShowXZQH() {
      const me = this
      this.$bus.$off('showXZQH')
      this.$bus.$on('showXZQH', res => {
        if (!me.mapApp) return
        me.mapApp.operationLayers.forEach(item => {
          item.visible = false
        })
        let xzqhLayer = me.mapApp.map.allLayers.items.filter(item => {
          return item.id === 'XZQHLayer'
        })
        xzqhLayer.visible = res
      })
    },
    bindToggleMap() {
      // 工具条切换地图
      this.$bus.$off('toggleMap')
      this.$bus.$on('toggleMap', res => {
        if (!this.XZQHLayer) {
          this.XZQHLayer = this.mapApp.map.allLayers.items.find(item => {
            return item.id === 'XZQHLayer'
          })
        }
        this.XZQHLayer.visible = res
      })
    },
    handleToolBoxClick() {
      this.showToolPanel = !this.showToolPanel
      this.$bus.$emit('showToolPanel', this.showToolPanel)
    }
  },
  beforeDestroy() {
    this.$bus.$off('viewLoaded')
    this.$bus.$off('showMapService')
    this.$bus.$off('changeTimeLineStatus')
    this.$bus.$off('chainPopup')
  }
}
