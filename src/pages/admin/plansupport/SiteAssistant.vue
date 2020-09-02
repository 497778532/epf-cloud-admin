<template>
  <epf-page row>
    <epf-mapview name="SiteAssistant"
                 :mapAppInitConf="mapAppInitConf"
                 style="width: calc(100% - 400px)">
      <epf-mapview-popup :visible="showPopup"
                         :position="popupPosition"
                         :content="popupContent"
                         :custom="true">
        <div class="popup-header">
          <span>图斑详细内容</span>
          <i class="el-icon-close"
             @click="handlePopupCloseClick"
             style="position: absolute;right:20px;"></i>
        </div>
        <div class="popup-content">
          <epf-row>
            <div style="margin:0 10px;">要素代码：</div>
            <div style="margin:0 10px;">{{selectedAttr.YSDM}}</div>
          </epf-row>
          <epf-row>
            <div style="margin:0 10px;">类别代码：</div>
            <div style="margin:0 10px;">{{selectedAttr.LBDM}}</div>
          </epf-row>
          <epf-row>
            <div style="margin:0 10px;">类别名称：</div>
            <div style="margin:0 10px;">{{selectedAttr.LBMC }}</div>
          </epf-row>
          <epf-row>
            <div style="margin:0 10px;">占地面积：</div>
            <div style="margin:0 10px;">{{selectedAttr.ZDMJ }}公顷</div>
          </epf-row>
          <epf-row>
            <div style="margin:0 10px;">版本：</div>
            <div style="margin:0 10px;">{{selectedAttr.BB }}</div>
          </epf-row>
          <epf-row>
            <div style="margin:0 10px;">备注：</div>
            <div style="margin:0 10px;">{{selectedAttr.BZ}}</div>
          </epf-row>
        </div>
      </epf-mapview-popup>
      <div class="toolbar">
        <jump-to style="margin: 0px;"></jump-to>
        <zoom></zoom>
        <pan></pan>
      </div>
      <city-location></city-location>
    </epf-mapview>
    <epf-side>
      <epf-block col
                 v-show="showResult===false">
        <epf-title title="辅助选址"
                   type="normal"
                   :showIcon="false"
                   style="margin:2px 0 40px 0"></epf-title>
        <epf-block>
          <epf-title title="选址范围(二选一)"
                     :showIcon="false"></epf-title>
          <epf-row>
            <div class="epf-row-column__first">
              <span>行政区选址：</span>
            </div>
            <el-cascader class="epf-row-column__second"
                         :props="props"
                         clearable
                         v-model="areaSelectedOptions"
                         @change="handleChange">
            </el-cascader>
          </epf-row>
          <epf-row>
            <div class="epf-row-column__first">
              <span>范围绘制：</span>
            </div>
            <div class="epf-row-column__second"
                 style="display: flex;flex-direction: row;padding: 0 15px;">
              <button class="esri-sketch__button esri-icon-checkbox-unchecked"
                      title="矩形选择"
                      @click="handeDrawClick('rectangle')"></button>
              <button class="esri-sketch__button esri-icon-radio-unchecked"
                      title="圆形选择"
                      @click="handeDrawClick('circle')"></button>
              <button class="esri-sketch__button esri-icon-polygon"
                      title="多边形选择"
                      @click="handeDrawClick('polygon')"></button>
            </div>
          </epf-row>
        </epf-block>
        <epf-block>
          <epf-title title="基本条件"
                     :showIcon="false"></epf-title>
          <epf-row>
            <div class="epf-row-column__first">
              <span>用地性质：</span>
            </div>
            <el-select class="epf-row-column__second"
                       v-model="landUseSelected"
                       @change="handleLandUseClick"
                       clearable>
              <el-option v-for="(item, index) in landUses"
                         :key="index"
                         :label="item"
                         :value="item"></el-option>
            </el-select>
          </epf-row>
          <epf-row>
            <div class="epf-row-column__first">
              <span>用地面积：</span>
            </div>
            <div class="epf-row-column__second"
                 style="display: flex;flex-direction: row;">
              <el-input v-model="minLandUseArea"
                        style="margin:0 10px 0 0"
                        :maxlength="20"></el-input>
              <epf-splitline style="width: 20px;"></epf-splitline>
              <el-input v-model="maxLandUseArea"
                        style="margin:0 10px 0 10px"
                        :maxlength="20"></el-input>
              <div style="line-height: 40px;"><span>m²</span></div>
            </div>
          </epf-row>
        </epf-block>
        <epf-block>
          <epf-title title="高级条件"
                     :showIcon="false"></epf-title>
          <epf-row>
            <span :class="{active: isActive}"
                  @click="handleLandUseSeletClick()">用地性质</span>
            <span :class="{active: !isActive}"
                  @click="handleControlLineSeletClick()">控制线</span>
          </epf-row>
          <el-table :data="landUsesAdvanced"
                    border
                    height="236"
                    style="width: 100%;"
                    v-show="isActive">
            <el-table-column prop="type"
                             aglin="center"
                             label="类型"></el-table-column>
            <el-table-column label="影响类型">
              <template slot-scope="scope">
                <el-select v-model="landUsesAdvancedType[scope.$index]">
                  <el-option label="不要求"
                             value="0"></el-option>
                  <el-option label="要求"
                             value="1"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="距离（m）">
              <template slot-scope="scope">
                <el-input v-model='landUsesAdvancedDistance[scope.$index]'
                          :maxlength="20"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="controlLine"
                    border
                    height="236"
                    style="width: 100%;"
                    v-show="!isActive">
            <el-table-column prop="type"
                             aglin="center"
                             label="类型"></el-table-column>
            <el-table-column label="影响类型">
              <template slot-scope="scope">
                <el-select v-model='controlLineEffectType[scope.$index]'>
                  <el-option label="范围内"
                             vulue="0"></el-option>
                  <el-option label="范围外"
                             vulue="1"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </epf-block>
        <epf-block>
          <epf-row>
            <el-button type="primary"
                       class="epf-button__custom"
                       style="width:100%;height:40px;background-color:rgba(25, 137, 217, 1);"
                       @click="handleStartClick">开始分析</el-button>
          </epf-row>
        </epf-block>
      </epf-block>
      <epf-block v-show="showResult===true">
        <epf-title title="分析结果"
                   :showIcon="false">
          <div class="epf-title-skip"
               @click="handleBackUpClick">返回</div>
        </epf-title>
        <el-table :data="propertiesDatas"
                  @row-click="handleTableRowClick"
                  border>
          <el-table-column prop="LBMC"
                           label="类别名称"
                           aglin="center"></el-table-column>
          <el-table-column prop="ZDMJ"
                           label="占地面积（公顷）"
                           aglin="center"></el-table-column>
        </el-table>
      </epf-block>
    </epf-side>
  </epf-page>
</template>

<script>
import { LANDUSE, LANDUSE_ADVANCED, CONTROLLINE, RESULT } from './mixins/mock'
import JumpTo from '../onemap/toolbarItem/jumpTo/item'
import ToolBox from '../onemap/toolbarItem/toolbox/item'
import CityLocation from '../onemap/toolbarItem/jumpTo/widget'
import Zoom from '../onemap/toolbarItem/zoom/index'
import Pan from '../onemap/toolbarItem/pan/widget'
import areaSelect from '@/assets/js/areaCascader'
export default {
  mixins: [areaSelect],
  name: 'SiteAssistant',
  components: {
    JumpTo,
    ToolBox,
    CityLocation,
    Zoom,
    Pan
  },
  data () {
    return {
      mapAppInitConf: null,
      showPopup: false,
      popupPosition: null,
      popupContent: null,
      pageStyle: {
        'font-size': '16px',
        'overflow-y': 'auto',
        '-ms-overflow-style': 'none',
        'overflow': '-moz-scrollbars-none',
        'border-radius': '6px',
        'box-shadow': '1px 3px 6px 0px rgba(0, 0, 0, 0.25)'
      },
      landUseSelected: '',
      landUses: null,
      minLandUseArea: '',
      maxLandUseArea: '',
      isActive: true,
      landUsesAdvanced: null,
      landUsesAdvancedType: [],
      landUsesAdvancedDistance: [],
      controlLine: null,
      controlLineEffectType: [],
      showResult: false,
      result: null,
      mapApp: null,
      clickListener: null,
      areaSelectedOptions: '440000',
      dynamicLayer: null,
      layerId: 'DynamicLayer',
      featureDatas: [],
      propertiesDatas: [],
      selectedAttr: {}
    }
  },
  created () {
    this.mapAppInitConf = this.$getMapAppInitConf()
    this.mapAppInitConf.map.xzqhService.disable = false
    this.landUses = this.$cloneDeep(LANDUSE)
    this.landUsesAdvanced = this.$cloneDeep(LANDUSE_ADVANCED)
    this.controlLine = this.$cloneDeep(CONTROLLINE)
    this.result = this.$cloneDeep(RESULT)
    for (let i = 0; i < this.landUsesAdvanced.length; i++) {
      this.landUsesAdvancedType.push('0')
      this.landUsesAdvancedDistance.push('0')
    }
    for (let i = 0; i < this.controlLine.length; i++) {
      this.controlLineEffectType.push('范围内')
    }
  },
  mounted () {
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', mapAppId => {
      debugger
      const me = this
      if (mapAppId === 'SiteAssistant') {
        setTimeout(() => {
          me.mapApp = me.$findMapApp(mapAppId)
          if (me.mapApp) {
            const option = {
              url: 'http://19.15.73.111/arcgisserver12/rest/services/城市规划/禅城区城市总规/FeatureServer/0',
              type: 'feature',
              useProxy: false,
              title: '禅城区城市总规'
            }
            me.mapApp.addLayerToMap(option)
            me.mapApp.view.on('click', event => {
              me.mapApp.view.hitTest(event).then(res => {
                if (res.results.length > 0) {
                  if (res.results[0].graphic.attributes) {
                    me.selectedAttr = res.results[0].graphic.attributes
                    me.showPopup = true
                    const screenPoint = me.mapApp.view.toScreen(res.results[0].mapPoint)
                    me.popupPosition = `top: ${screenPoint.y}px;left: ${screenPoint.x}px;`
                  }
                } else {
                  me.showPopup = false
                }
              })
            })
            const params = {
              url: 'http://120.79.99.87:6080/arcgis/rest/services/data/DynamicLayerServer/MapServer',
              sublayers: [
                {
                  title: '禅城区总体规划',
                  visible: false,
                  source: {
                    type: 'dataLayer',
                    dataSource:
                    {
                      type: 'table',
                      workspaceId: 'AnalysisData',
                      dataSourceName: '禅城区总体规划'
                    }
                  },
                  renderer: {
                    type: 'simple',
                    symbol: {
                      type: 'simple-fill',
                      color: [93, 177, 255, 1],
                      outline: {
                        color: [255, 255, 255],
                        width: 0.5
                      }
                    }
                  }
                },
                {
                  title: '禅城区二类住宅用地',
                  visible: false,
                  source: {
                    type: 'dataLayer',
                    dataSource:
                    {
                      type: 'table',
                      workspaceId: 'AnalysisData',
                      dataSourceName: '禅城区二类住宅用地'
                    }
                  },
                  renderer: {
                    type: 'simple',
                    symbol: {
                      type: 'simple-fill',
                      color: [89, 212, 212, 1],
                      outline: {
                        color: [255, 255, 255],
                        width: 0.5
                      }
                    }
                  }
                },
                {
                  title: '二类住宅用地辅助选址结果',
                  visible: false,
                  source: {
                    type: 'dataLayer',
                    dataSource:
                    {
                      type: 'table',
                      workspaceId: 'AnalysisData',
                      dataSourceName: '二类住宅用地辅助选址结果'
                    }
                  },
                  renderer: {
                    type: 'simple',
                    symbol: {
                      type: 'simple-fill',
                      color: [255, 0, 0, 1],
                      outline: {
                        color: [255, 255, 255],
                        width: 0.5
                      }
                    }
                  }
                }
              ]
            }
            me.dynamicLayer = me.mapApp.addDynamicLayer2(params, '辅助选址')
            me.mapApp.map.add(me.dynamicLayer)
            const query = {
              outFields: ['*'],
              where: '1=1',
              returnGeometry: true,
              layer: {
                id: 1,
                source: {
                  type: 'dataLayer',
                  dataSource: {
                    type: 'table',
                    dataSourceName: '禅城区总体规划',
                    workspaceId: 'AnalysisData'
                  }
                }
              }
            }
            // const layer = layer={id:8,source:+{+type:+"dataLayer",+dataSource:+{+type:+"table",+dataSourceName:+"intersect_20200108111521",+workspaceId:+"AnalysisData"+}+}}
            // const ss = 'http://120.79.99.87:6080/arcgis/rest/services/data/DynamicLayerServer/MapServer/dynamicLayer/query?layer={id:8,"source":+{+"type":+"dataLayer",+"dataSource":+{+"type":+"table",+"dataSourceName":+"intersect_20200108111521",+"workspaceId":+"AnalysisData"+}+}}+&where=&text=&objectIds=1,2,3,4,5,6&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=ZLDWMC_1,QSDWDM_1&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson'
            // me.mapApp.getDynamicLayerInfo('http://120.79.99.87:6080/arcgis/rest/services/data/DynamicLayerServer/MapServer/dynamicLayer', query).then(res => {
            //   console.log(res)
            // })
          }
        }, 50)
      }
    })
  },
  beforeDestroy () {
    this.$bus.$off('viewLoaded')
  },
  methods: {
    handleTableRowClick (row) {
      const index = this.featureDatas.findIndex(item => item.properties.OBJECTID === row.OBJECTID)
      const selectFeature = this.featureDatas[index]
      this.mapApp.showSelectedFeature(selectFeature)
      this.selectedAttr = selectFeature.properties
    },
    handleChange (val) {
      if (this.mapApp) {
        this.mapApp.view.goTo({
          center: [113.06136296921288, 23.00150749595928],
          zoom: 11
        })
        this.mapApp.map.allLayers.items.find(e => e.id === 'DynamicLayer').sublayers.items[0].visible = true
        this.mapApp.map.allLayers.items.find(e => e.id === 'DynamicLayer').sublayers.items[1].visible = false
        this.mapApp.map.allLayers.items.find(e => e.id === 'DynamicLayer').sublayers.items[2].visible = false
      }
    },
    handleLandUseClick () {
      if (this.mapApp) {
        this.mapApp.view.goTo({
          center: [113.06136296921288, 23.00150749595928],
          zoom: 11
        })
        this.mapApp.map.allLayers.items.find(e => e.id === 'DynamicLayer').sublayers.items[1].visible = true
      }
    },
    handlePopupCloseClick () {
      this.showPopup = false
    },
    handleLandUseSeletClick () {
      this.isActive = true
    },
    handleControlLineSeletClick () {
      this.isActive = false
    },
    handleBackUpClick () {
      this.showResult = false
    },
    handleStartClick () {
      if (this.minLandUseArea === '') {
        this.$message({ message: '请输入最小用地面积', type: 'warning' })
        return
      }
      if (this.maxLandUseArea === '') {
        this.$message({ message: '请输入最大用地面积', type: 'warning' })
        return
      }
      const me = this
      if (this.mapApp) {
        this.mapApp.view.goTo({
          center: [113.06136296921288, 23.00150749595928],
          zoom: 11
        })
        this.mapApp.map.allLayers.items.find(e => e.id === 'DynamicLayer').sublayers.items[0].visible = false
        this.mapApp.map.allLayers.items.find(e => e.id === 'DynamicLayer').sublayers.items[1].visible = false
        this.mapApp.map.allLayers.items.find(e => e.id === 'DynamicLayer').sublayers.items[2].visible = true
        const url = 'http://120.79.99.87:6080/arcgis/rest/services/data/DynamicLayerServer/MapServer/dynamicLayer/query'
        let formData = new FormData()
        formData.append('layer', JSON.stringify({
          id: 1,
          source: {
            type: 'dataLayer',
            dataSource:
            {
              type: 'table',
              workspaceId: 'AnalysisData',
              dataSourceName: '二类住宅用地辅助选址结果'
            }
          }
        }))
        formData.append('where', '1=1')
        formData.append('outFields', 'OBJECTID,LBMC,ZDMJ,YSDM,LBDM,LBMC,ZDMJ,BB,BZ')
        formData.append('returnGeometry', true)
        formData.append('returnTrueCurves', false)
        formData.append('orderByFields', 'OBJECTID')
        formData.append('featureEncoding', 'esriDefault')
        formData.append('f', 'geojson')
        this.mapApp.getDataFromNormalService(url, formData).then(res => {
          console.log(res)
          me.featureDatas = []
          if (res.data) {
            if (res.data.features) {
              me.featureDatas = res.data.features
              me.mapApp.showAllFeatures(me.featureDatas)
              res.data.features.forEach(feature => {
                me.propertiesDatas.push(feature.properties)
              })
            }
          }
        })
      }
      this.showResult = true
      // this.$gisPost('/api/epf-analysis-toos/analysisTools/auxiliaryLocation', {
      //   basicConditions: { 'nature': 'YLZZYD', 'dMeasure': 100, 'uMeasure': 500 },
      //   range: { 'areaCode': this.areaSelectedOptions, geometry: {} },
      //   advancedConditions: {
      //     'nature': [
      //       { 'name': 'ST', 'distance': 100 },
      //       { 'name': 'HD', 'distance': 200 }
      //     ],
      //     'controlLine': { 'farmlandPreparation': 0, 'ecologicalRedLine': 1, 'developmentBoundary': 0 },
      //     jobId: '4fbedaa0-ff17-4d7b-9857-a0a54a5d0f06'
      //   }
      // }).then(res => {
      //   console.log(res)
      // })
    },
    onClearAll () {
      this.mapApp.view.graphics.removeAll()
      if (this.mapApp.findLayerById('RGLayer')) {
        this.mapApp.removeLayerById('RGLayer')
      }
      if (this.clickListener) {
        this.clickListener.remove()
      }
    },
    handeDrawClick (type) {
      if (!type) return
      let me = this
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp('SiteAssistant')
      }
      me.onClearAll()
      const drawWidget = me.mapApp.widgets.find(e => e.draw)
      me.type = type.replace(type[0], type[0].toUpperCase())
      let view = me.mapApp.view
      view.when(() => {
        me.mapApp.view.container.classList.add('screenshotCursor')
      })
      // me.mapApp.view.container.style.cursor = "crossHair";
      if (type === 'point') {
        me.clickListener = me.mapApp.view.on('click', function (evt) {
          evt.stopPropagation()
          evt.layerId = me.layerId
          evt.mapApp = me.mapApp
          drawWidget['create' + me.type](evt)
        })
        return
      } else if (type === 'buffer') {
        me.mapApp.view.container.classList.add('screenshotCursor')
        // me.mapApp.view.container.style.cursor = "crossHair";

        const widget = me.mapApp.widgets.find(e => e.unit)
        let layer = me.mapApp.findLayerById(this.layerId)
        var radius = this.radius || 100
        me.mapApp.addLayer(widget.graphicsLayer2)

        me.mapApp.addLayer(widget.graphicsLayer)

        me.clickListener = me.mapApp.view.on('click', function (evt) {
          me.clickListener.remove()
          me.mapApp.view.container.classList.remove('screenshotCursor')
          // me.mapApp.view.container.style.cursor = "default";

          widget.graphicsLayer.graphics.removeAll()
          widget.graphicsLayer2.graphics.removeAll()
          widget.centerGraphic = null
          evt.stopPropagation()
          widget.setUpSketch()
          widget.setUpBufferUI(layer, radius, evt)
          let sq = me.mapApp.createSpatialQuery(
            me.mapApp,
            me.layerId,
            widget.bufferGraphic.geometry
          )
          sq.querySelectedFeatures()
        })
        return
      }
      me.action = drawWidget.draw.create(type)
      me.mapApp.view.focus()
      me.action.on(['cursor-update', 'vertex-add', 'draw-complete'], function (
        evt
      ) {
        evt.layerId = me.layerId
        evt.mapApp = me.mapApp
        drawWidget['create' + me.type](evt)
        // me.mapApp.view.container.classList.remove("screenshotCursor");
        // me.mapApp.view.container.style.cursor = "default";
      })
    }
  }
}
</script>

<style scoped>
@import "../onemap/toolbarItem/style.css";
.popup-header {
  margin: 0;
}
.popup-content {
  margin: 0;
}
.epf-row-column__first {
  min-width: max-content;
  line-height: 40px;
  font-size: 16px;
}

.epf-row-column__second {
  margin: 0 10px 0 0;
  width: inherit;
}
span {
  color: rgba(32, 32, 32, 1);
  margin: 0 10px 0 0;
  cursor: pointer;
}
.active {
  border-bottom: 2px solid #1d7ce4;
}
.epf-button__custom {
  margin-left: 10px;
  font-size: 16px;
  border: 1px solid rgba(25, 137, 217, 1);
}
.epf-title-content {
  margin: 0;
}

.epf-title-skip {
  color: #1d7ce4;
  font-size: 16px;
  cursor: pointer;
  padding: 0 14px 0 0;
  line-height: 31px;
}

.el-table td {
  padding: unset;
}
.epf-table__custom {
  padding: 0 14px;
}

.epf-table {
  width: 100%;
  min-height: 100px;
  line-height: 22px;
}

.el-table tr {
  height: 30px;
}
</style>
