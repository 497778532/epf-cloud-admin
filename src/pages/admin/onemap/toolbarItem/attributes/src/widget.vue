<template>
  <div class="toolbox" v-show="isDrawBoxShow">
    <div>
      <div>
        <div class="esri-sketch esri-widget" style="flex-flow: unset;">
          <div class="esri-sketch__section esri-sketch__tool-section">
            <el-select
              v-model="layerId"
              size="mini"
              style="width:200px"
              placeholder="选择图层"
              @focus="onFocusSelector"
            >
              <el-option
                v-for="(item,index) in selectItems"
                :key="index"
                class="option-class"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="esri-sketch__section esri-sketch__tool-section">
            <button
              class="esri-sketch__button esri-icon-cursor"
              title="点击选择"
              @click="onDrawStart('point')"
            ></button>
            <button
              class="esri-sketch__button esri-icon-checkbox-unchecked"
              title="矩形选择"
              @click="onDrawStart('rectangle')"
            ></button>
            <button
              class="esri-sketch__button esri-icon-radio-unchecked"
              title="圆形选择"
              @click="onDrawStart('circle')"
            ></button>
            <button
              class="esri-sketch__button esri-icon-polygon"
              title="多边形选择"
              @click="onDrawStart('polygon')"
            ></button>
            <button class="esri-sketch__button esri-icon-trash" title="清除选择" @click="onClearAll"></button>
          </div>
          <div class="esri-sketch__section esri-sketch__tool-section">
            <button
              class="esri-sketch__button esri-icon-table"
              title="属性表"
              @click="updateTableState"
            ></button>
          </div>
        </div>
      </div>
    </div>
    <attribute-table
      class="attributeTable"
      ref="attributeTable"
      :layerId="layerId"
      @watchTabLabel="watchTabLabel"
    ></attribute-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import attributeTable from "./attributeTable";
export default {
  name: "attributes-widget",
  inject: ["mapAppId"],
  props: {
    isDrawBoxShow: Boolean
  },
  data() {
    return {
      layerId: "",
      layerUrl: "",
      resultArray: [],
      clickListener: null,
      action: null,
      drawType: "",
      radius: 0,
      selectItems: []
    };
  },
  methods: {
    watchTabLabel(data) {
      // 通过点击的属性表图层标签，修改当前框选项
      this.layerId = data;
    },
    onClearAll() {
      this.mapApp.view.graphics.removeAll();
      if (this.mapApp.findLayerById("RGLayer")) {
        this.mapApp.removeLayerById("RGLayer");
      }
      if (this.clickListener) {
        this.clickListener.remove();
      }
      this.mapApp.view.container.classList.remove("screenshotCursor");
      this.mapApp.view.container.style.cursor = "default";
    },
    createDrawAction(type) {
      // debugger
      if (!type) return;
      let me = this;
      me.onClearAll();
      me.mapApp.view.container.classList.add("screenshotCursor");
      me.mapApp.view.container.style.cursor = "crossHair";
      const drawWidget = me.mapApp.widgets.find(e => e.draw);
      me.type = type.replace(type[0], type[0].toUpperCase());
      let view = me.mapApp.view;
      view.when(() => {
        me.mapApp.view.container.classList.add("screenshotCursor");
      });
      // me.mapApp.view.container.style.cursor = "crossHair";
      if (type === "point") {
        me.clickListener = me.mapApp.view.on("click", function(evt) {
          evt.stopPropagation();
          evt.layerId = me.layerId;
          evt.mapApp = me.mapApp;
          drawWidget["create" + me.type](evt);
        });
        return;
      } else if (type === "buffer") {
        me.mapApp.view.container.classList.add("screenshotCursor");
        // me.mapApp.view.container.style.cursor = "crossHair";

        const widget = me.mapApp.widgets.find(e => e.unit);
        let layer = me.mapApp.findLayerById(this.layerId);
        var radius = this.radius || 100;
        me.mapApp.addLayer(widget.graphicsLayer2);

        me.mapApp.addLayer(widget.graphicsLayer);

        me.clickListener = me.mapApp.view.on("click", function(evt) {
          me.clickListener.remove();
          me.mapApp.view.container.classList.remove("screenshotCursor");
          // me.mapApp.view.container.style.cursor = "default";

          widget.graphicsLayer.graphics.removeAll();
          widget.graphicsLayer2.graphics.removeAll();
          widget.centerGraphic = null;
          evt.stopPropagation();
          widget.setUpSketch();
          widget.setUpBufferUI(layer, radius, evt);
          let sq = me.mapApp.createSpatialQuery(
            me.mapApp,
            me.layerId,
            widget.bufferGraphic.geometry
          );
          sq.querySelectedFeatures();
        });
        return;
      }
      me.action = drawWidget.draw.create(type);
      me.mapApp.view.focus();
      me.action.on(["cursor-update", "vertex-add", "draw-complete"], function(
        evt
      ) {
        evt.layerId = me.layerId;
        evt.mapApp = me.mapApp;
        drawWidget["create" + me.type](evt);
        // me.mapApp.view.container.classList.remove("screenshotCursor");
        // me.mapApp.view.container.style.cursor = "default";
      });
    },
    onDrawStart(type) {     
      this.createDrawAction(type);
    },

    onPointDrawStart() {
      this.createDrawAction("point");
      // this.$refs.attributeTable.isAttributeTableShow = true;
    },
    onBufferDrawStart() {
      this.createDrawAction("buffer");
    },
    onRectangleDrawStart() {
      this.createDrawAction("rectangle");
      // this.$refs.attributeTable.isAttributeTableShow = true;
    },
    onCircleDrawStart() {
      this.createDrawAction("circle");
      // this.$refs.attributeTable.isAttributeTableShow = true;
    },
    onPolygonDrawStart() {
      this.createDrawAction("polygon");
      // this.$refs.attributeTable.isAttributeTableShow = true;
    },
    updateTableState() {
      this.$refs.attributeTable.isAttributeTableShow = !this.$refs
        .attributeTable.isAttributeTableShow;
    },
    onFocusSelector() {
      var tempArr = [];
      var tempid = [];
      const layers = this.mapApp.getAllLayer();
      for (let layer of layers) {
        if (
          layer &&
          layer.id !== "SGLayer" &&
          layer.id !== "RGLayer" &&
          layer.id !== "SGLayer1" &&
          layer.id !== "SGLayer2"
        ) {
          // this.mapApp.getServiceStatus(layer.url).then(res => {
          //   console.log(res)
          // })
          if (tempid.includes(layer.id)===false) {
            tempArr.push({
              label: layer.title,
              value: layer.id
            });
            tempid.push(layer.id)
          }
        }
      }
      // layers.forEach((layer, index) => {});
      if (this.selectItems !== tempArr) {
        this.selectItems = tempArr;
      }
    }
  },
  beforeDestroy() {
    if (this.clickListener) {
      this.clickListener.remove();
    }
  },
  computed: {
    mapApp() {
      return this.$findMapApp(this.mapAppId);
    },
    ...mapGetters(["getLayerUrl", "getLayerId"])
  },
  watch: {
    getLayerUrl(layerUrl) {
      if (layerUrl) {
        this.layerUrl = layerUrl;
        // this.createDrawAction("polygon");
        this.$store.dispatch("onemap/setlayerUrl", null);
      }
    },
    getLayerId(payload) {
      if (payload) {
        this.layerId = payload.layerId || "";
        this.drawType = payload.drawType || "";
        this.radius = payload.radius || 0;
        this.createDrawAction(payload.drawType);
      }
    }
  },
  components: {
    attributeTable
  }
};
</script>

<style scoped>
.screenshotCursor {
  cursor: crosshair;
}
.toolbox {
  border-radius: 2px;
  border: 0.3px solid #d6d6d6;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style>
