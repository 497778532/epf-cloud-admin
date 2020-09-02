import { BHQLQ_PARAM, BHQLQ_RESULT, MAPSERVICE} from './mock'
import gisMixin from './gis'
export default {
  mixins: [gisMixin],
  data() {
    return {
      dynamicLayer: null,
      showChart: false,
      myChartStyle: {
        position: 'absolute',
        width: '1000px',
        height: '100px',
        left: '100px',
        bottom: '10px'
      },
      yearData: null,
      deductTimeLineData: [],
      myKeyMap: {
        cultivatedLand: '三调耕地',
        prospectingRight: '探矿权',
        basicFarmland: '永久基本农田',
        farmlandPreparation: '永久基本农田整备区',
        natureReserve: '自然保护地（核心区）',
        landApproval: '已完成建设项目用地审批',
        slope25: '坡度大于25度耕地',
        cultivatedLandQuality: '耕地质量数据'
      },
      threeLineKeyMap: {
        0: '永久基本农田',
        1: '生态保护红线',
        2: '城镇开发边界'
      },
      bhqlqParam: null, // 补划潜力区param
      timeLineSelectServiceVal: null,
      tempData: null,
      mapServices: null,
      timeLineStatus: 0,
      selectYear: 0,
      featureDatas: [],
      checkedAnalystService: [],
      threeLineSelectedIndex: 0,
      queryResultCount: 0,
      dynamicLayerInfo: null,
      statisticsInfo: null,
      workspaceId: null,
      dataSourceName: null,
      dynamicLayerQueryUrl: 'http://120.79.99.87:6080/arcgis/rest/services/data/DynamicLayerServer/MapServer/dynamicLayer/query',
      isAnalysing: false
    }
  },
  created() {
    this.yearData = this.createYearsArray()
    this.threeLineChart = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: false,
          playInterval: 3000,
          data: this.yearData,
          label: {
            formatter: function(s) {
              return s
            }
          }
        }
      }
    }
    this.tempData = this.$cloneDeep(BHQLQ_RESULT)
    this.mapServices = this.$cloneDeep(MAPSERVICE)
    this.bhqlqParam = this.$cloneDeep(BHQLQ_PARAM)
    this.bindQLQAnalyse()
  },
  mounted() {
    const me = this
    this.$bus.$off('chartLoaded')
    this.$bus.$on('chartLoaded', chartInstance => {
      if (chartInstance) {
        chartInstance.off('timelinechanged')
        chartInstance.on('timelinechanged', timeLineIndex => {
          if (me.timeLineStatus === 0) {
            // dosomething
            this.selectYear = me.yearData[timeLineIndex.currentIndex] // 年份
            this.$bus.$emit('changeSelectYear', this.selectYear)
          } else {
            me.getDynamicLayer(timeLineIndex)
          }
        })
      }
    })
    this.$bus.$off('showMapService')
    this.$bus.$on('showMapService', res => {
      me.threeLineSelectedIndex = res.index
      if (!me.mapApp) return
      me.flag = me.threeLineKeyMap[res.index]
      me.mapApp.operationLayers.forEach(layer => {
        layer.visible = false
      })
      if (me.mapServices[res.title]) {
        const layer = me.mapApp.findLayerById(me.mapServices[res.title].title)
        if (!layer) {
          me.$addLayerToMap({ mapApp: me.mapApp }, me.mapServices[res.title])
        } else {
          me.mapApp.setLayerVisiblity(me.mapServices[res.title].title, true)
        }
      }
    })
    this.$bus.$off('changeTimeLineStatus')
    this.$bus.$on('changeTimeLineStatus', res => {
      me.timeLineStatus = res
      if (res === 0) {
        me.$bus.$emit('analysing', false)
        me.threeLineChart = {
          baseOption: {
            timeline: {
              axisType: 'category',
              autoPlay: false,
              // currentIndex: 6,
              playInterval: 3000,
              data: me.yearData,
              label: {
                formatter: function(s) {
                  return s
                }
              }
            }
          }
        }
      }
    })
    this.$bus.$off('showFeature')
    this.$bus.$on('showFeature', index => {
      const feature = me.featureDatas[index]
      me.mapApp.showSelectedFeature(feature)
    })
  },
  methods: {
    getMapApp(mapApp) {
      this.mapApp = mapApp
      this.flag = this.threeLineKeyMap[0]
      this.addLayerToMap(this.mapServices['永久基本农田保护红线'])
      this.bindPopupInfo()
      this.bindMapApp()
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
    bindQLQAnalyse() {
      // 开始潜力区分析
      const me = this
      me.$bus.$off('startQLQAnalyse')
      me.$bus.$on('startQLQAnalyse', async res => {
        if (!me.mapApp) return
        me.showChart = true
        me.isAnalysing = true
        me.checkedAnalystService = res.checkedAnalystService
        let checkedAnalystServiceStr = ''
        for (let i = 0; i < res.checkedAnalystService.length; i++) {
          me.deductTimeLineData.push(me.myKeyMap[res.checkedAnalystService[i]])
          checkedAnalystServiceStr += res.checkedAnalystService[i] + ';'
        }
        if (checkedAnalystServiceStr.length > 0) {
          checkedAnalystServiceStr = checkedAnalystServiceStr.substring(
            0,
            checkedAnalystServiceStr.length - 1
          )
        }
        me.threeLineChart = {
          baseOption: {
            timeline: {
              axisType: 'category',
              autoPlay: false,
              playInterval: 3000,
              currentIndex: 0,
              data: me.deductTimeLineData,
              label: {
                formatter: function(s) {
                  return s
                }
              }
            }
          }
        }
        // me.$bus.$emit('analysing', true)

        let layer = me.mapApp.map.allLayers.items.find(e => {
          return e.id === 'DynamicLayer'
        })
        if (!layer) {
          if (!me.mapApp) return
          me.dynamicLayer = me.mapApp.addDynamicLayer2(
            this.bhqlqParam,
            '永久基本农田潜力区'
          )
          me.mapApp.map.add(me.dynamicLayer)
        }
        const jobRes = await this.$gisGet('/api/epf-analysis/atAnalysisJob/addAtAnalysisJob', {
          jobName: 'potentialAreaForFarmland',
          jobDescribe: ''
        })
        if (jobRes && jobRes.data) {
          const dynamicLayerInfoRes = await this.$gisGet('/api/epf-analysis/analysis/potentialAreaForFarmlandFixedLayer', {
            baseLayer: 'cultivatedLand',
            eraseLayers: checkedAnalystServiceStr,
            areaCode: res.area || res.city || res.province,
            jobId: jobRes.data.JobId
          })
          if (dynamicLayerInfoRes && dynamicLayerInfoRes.data) {
            this.dynamicLayerInfo = dynamicLayerInfoRes.data.dynamicLayerInfo
            this.statisticsInfo = dynamicLayerInfoRes.data.statisticsInfo
          }
        }
        const intersectDynamicLayerInfo = this.dynamicLayerInfo.filter(item => item.dataSourceName.indexOf('intersect') > -1)[0]
        this.workspaceId = intersectDynamicLayerInfo.workspaceId
        this.dataSourceName = intersectDynamicLayerInfo.dataSourceName
        if (!me.queryResultCount) {
          me.queryResultCount = await this.getQueryCount()
        }
        const result = await me.getQueryResult(1, 5)
        me.$bus.$emit('analysing', false)
        me.resultTableVisiblity = true
        setTimeout(() => {
          me.$refs.threeResultTable.$nextTick(() => {
            me.isAnalysing = false
            me.load = false
            me.$bus.$emit('sendResult', result)
          })
        }, 20)
      })
    },
    getdynamicLayerStr() {
      const mylayer = JSON.stringify({
        id: 1,
        source: {
          type: 'dataLayer',
          dataSource: {
            type: 'table',
            workspaceId: this.workspaceId,
            dataSourceName: this.dataSourceName
          }
        }
      })
      return mylayer
    },
    async getQueryCount(keyVals) {
      const myLr = this.getdynamicLayerStr()
      let myKeyVals = [{key: 'layer', val: myLr}]
      if (Array.isArray(keyVals)) {
        myKeyVals = [...myKeyVals, ...keyVals]
      }
      try {
        const resultCount = await this.mapApp.getQueryCount(this.dynamicLayerQueryUrl, myKeyVals)
        return resultCount.data.count * 1
      } catch (err) {
        console.error(err)
        return 0
      }
    },
    async getQueryResult(currentPage, pageSize, keyVals) {
      const outFields = 'objectid,tbbh,dlmc,zldwmc,st_area(shape),gdzzsxmc,sjnf,gdlx_1,gdpdj,bzgzzd,gjlyd,gjjjd,yxtchd,bctrzd,pmgx,tryjzhl,trsjd,pstj,dxpd,ggbzl,tmpd,dxsw'
      const mylayer = this.getdynamicLayerStr()
      let myKeyVals = [{key: 'layer', val: mylayer}]
      if (Array.isArray(keyVals)) {
        myKeyVals = [...myKeyVals, ...keyVals]
      }
      try {
        const res = await this.mapApp.getQueryResult(this.dynamicLayerQueryUrl, outFields, myKeyVals, currentPage, pageSize)
        this.featureDatas = []
        let results = {
          properties: [],
          statisticsInfo: this.statisticsInfo
        }
        if (res.data) {
          if (res.data.features) {
            this.featureDatas = res.data.features
            res.data.features.forEach(feature => {
              const properties = feature.properties
              results.properties.push(properties)
            })
            return results
          }
        }
      } catch (err) {
        console.error(err)
        return null
      }
    },
    getDynamicLayer(timeLineIndex) {
      if (this.mapApp.findLayerById('DynamicLayer')) {
        this.mapApp.removeLayerById('DynamicLayer')
      }
      if (this.mapApp.findLayerById('RGLayer')) {
        this.mapApp.removeLayerById('RGLayer')
      }
      this.timeLineSelectServiceVal = this.checkedAnalystService[
        timeLineIndex.currentIndex
      ]
      const selectedType = this.dynamicLayerInfo.filter(item => {
        return item.layerName.indexOf(this.timeLineSelectServiceVal) > -1
      })
      let filterSelectedType = null
      filterSelectedType = selectedType.find(
        e => e.layerName.indexOf('erase') > -1
      )
      if (filterSelectedType) {
        const params = {
          url: 'http://120.79.99.87:6080/arcgis/rest/services/data/DynamicLayerServer/MapServer',
          sublayers: [{
            title: this.myKeyMap[this.timeLineSelectServiceVal],
            source: {
              type: 'dataLayer',
              dataSource: {
                type: 'table',
                workspaceId: 'AnalysisData',
                dataSourceName: filterSelectedType.dataSourceName
              }
            },
            renderer: {
              type: 'simple',
              symbol: {
                type: 'simple-fill',
                color: [93, 177, 255, 1],
                outline: {
                  color: [255, 255, 255],
                  width: 1
                }
              }
            }
          }]
        }
        this.dynamicLayer = this.mapApp.addDynamicLayer2(
          params,
          this.myKeyMap[this.timeLineSelectServiceVal]
        )
        this.mapApp.map.add(this.dynamicLayer)
      }
    }
  }
}
