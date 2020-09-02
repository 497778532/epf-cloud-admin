<template>
  <div v-show="isDrawBoxShow">
    <div id="drawBox"
         class="esri-component">
      <div class="esri-expand__content esri-expand__content--expanded">
        <div class="esri-sketch esri-widget"
             style="flex-flow: unset;">
          <div class="esri-sketch__section esri-sketch__tool-section">
            <el-select v-model="layerId"
                       size="mini"
                       style="width:200px"
                       placeholder="选择图层"
                       @focus="onFocusSelector">
              <el-option v-for="(item,index) in selectItems"
                         :key="index"
                         class="option-class"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="esri-sketch__section esri-sketch__tool-section">
            <button class="esri-sketch__button esri-icon-cursor"
                    title="点击选择"
                    @click="onPointDrawStart"></button>
            <button class="esri-sketch__button esri-icon-checkbox-unchecked"
                    title="矩形选择"
                    @click="onRectangleDrawStart"></button>
            <button class="esri-sketch__button esri-icon-radio-unchecked"
                    title="圆形选择"
                    @click="onCircleDrawStart"></button>
            <button class="esri-sketch__button esri-icon-polygon"
                    title="多边形选择"
                    @click="onPolygonDrawStart"></button>
            <button class="esri-sketch__button esri-icon-trash"
                    title="清除选择"
                    @click="onClearAll"></button>
          </div>
          <div class="esri-sketch__section esri-sketch__tool-section">
            <button class="esri-sketch__button esri-icon-table"
                    title="属性表"
                    @click="updateTableState"></button>
          </div>
        </div>
      </div>
    </div>
    <attribute-table class="attributeTable"
                     ref="attributeTable"
                     :layerId="layerId"
                     @watchTabLabel="watchTabLabel"></attribute-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import attributeTable from './attributeTable'
export default {
  props: {
    isDrawBoxShow: Boolean
  },
  data() {
    return {
      layerId: '',
      layerUrl: '',
      resultArray: [],
      selectItems: [],
      clickListener: null,
      action: null,
      drawType: '',
      radius: 0
    }
  },
  methods: {
    watchTabLabel(data) {
      // 通过点击的属性表图层标签，修改当前框选项
      this.layerId = data
    },
    onClearAll() {
      this.mapApp.view.graphics.removeAll()
      if (this.mapApp.findLayerById('RGLayer')) {
        this.mapApp.removeLayerById('RGLayer')
      }
      if (this.clickListener) {
        this.clickListener.remove()
      }
    },
    createDrawAction(type) {
      if (type === '') return
      let me = this
      me.onClearAll()
      const drawWidget = me.mapApp.widgets.find(e => e.draw)
      me.type = type.replace(type[0], type[0].toUpperCase())

      if (type === 'point' || type === 'buffer') {
        me.clickListener = me.mapApp.view.on('click', function (evt) {
          evt.stopPropagation()
          evt.layerId = me.layerId
          evt.radius = me.radius
          evt.mapApp = me.mapApp
          drawWidget['create' + me.type](evt)
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
      })
    },
    onPointDrawStart() {
      this.createDrawAction('point')
      this.$refs.attributeTable.isAttributeTableShow = true
    },
    onBufferDrawStart() {
      this.createDrawAction('buffer')
    },
    onRectangleDrawStart() {
      this.createDrawAction('rectangle')
      this.$refs.attributeTable.isAttributeTableShow = true
    },
    onCircleDrawStart() {
      this.createDrawAction('circle')
      this.$refs.attributeTable.isAttributeTableShow = true
    },
    onPolygonDrawStart() {
      this.createDrawAction('polygon')
      this.$refs.attributeTable.isAttributeTableShow = true
    },
    updateTableState() {
      this.$refs.attributeTable.isAttributeTableShow = !this.$refs
        .attributeTable.isAttributeTableShow
    },
    onFocusSelector() {
      var tempArr = []
      const layers = this.mapApp.getAllLayer()
      for (let layer of layers) {
        if (layer && layer.id !== 'SGLayer' && layer.id !== 'RGLayer' && layer.id !== 'SGLayer1' && layer.id !== 'SGLayer2') {
          tempArr.push({
            label: layer.id,
            value: layer.id
          })
        }
      }
      if (this.selectItems !== tempArr) {
        this.selectItems = tempArr
      }
    }
  },
  beforeDestroy() {
    if (this.clickListener) {
      this.clickListener.remove()
    }
  },
  computed: {
    mapApp() {
      return this.$parent.mapApp || MapApp
    },
    ...mapGetters(['getLayerUrl', 'getLayerId'])
  },
  watch: {
    getLayerUrl(layerUrl) {
      if (layerUrl) {
        this.layerUrl = layerUrl
        // this.createDrawAction("polygon");
        this.$store.dispatch('oneMap/setlayerUrl', null)
      }
    },
    getLayerId(payload) {
      if (payload) {
        this.layerId = payload.layerId || ''
        this.drawType = payload.drawType || ''
        this.radius = payload.radius || 0
        this.createDrawAction(payload.drawType)
        // this.$store.dispatch("onemap/setlayerId", {
        //   layerId: "",
        //   drawType: "",
        //   radius: 0
        // });
      }
    }
  },
  components: {
    attributeTable
  }
}
</script>

<style scoped>
#drawBox .option-class {
  height: 24px;
  font-size: 12px;
  line-height: 24px;
}

#drawBox {
  position: absolute;
  top: 5.625rem;
  right: 0.9rem;
}
</style>
