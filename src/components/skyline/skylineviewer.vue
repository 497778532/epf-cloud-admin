<template>
  <div id="cesiumContainer" class="cesium-container">
    <div id="creditDiv" style="diaplay: hidden"></div>
  </div>
</template>

<script>
import { loadScriptAsyncEx, removeScriptAsyncEx } from "./scriptloader";
import { loadCss } from "esri-loader";

export default {
  props: {
    bindMapApp: Object
  },
  destroyed() {
    removeScriptAsyncEx("static/te4w/TerraExplorer.js").then(function() {
      removeScriptAsyncEx("static/te4w/Cesium/Cesium.js").then(function() {
        removeScriptAsyncEx("static/te4w/jquery.js");
      });
    });
  },
  created() {
    let parent = this.$parent;
    let me = this;
    loadCss(
      "static/te4w/Cesium/Widgets/widgets.css"
    );
    if (
      navigator.userAgent.indexOf("Chrome") < 0 &&
      navigator.userAgent.indexOf("Firefox") < 0
    ) {
      this.$message({
        message: "当前浏览器不支持TE4W，请切换浏览器",
        type: "warning"
      });
    } else {
      loadScriptAsyncEx("static/te4w/jquery.js").then(function() {
        loadScriptAsyncEx("static/te4w/Cesium/Cesium.js").then(function() {
          loadScriptAsyncEx("static/te4w/TerraExplorer.js").then(function() {
            initialize();
          });
        });
      });
    }

    function initialize() {
      window.viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        scene3DOnly: true,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        creditContainer: "creditDiv",
        contextOptions: { failIfMajorPerformanceCaveat: false },
        useDefaultRenderLoop: true,
        imageryProvider: new Cesium.WebMapServiceImageryProvider({
          url: "http://19.16.240.94/sg/Imagery",
          layers: "GDALL.397536.tbp",
          enablePickFeatures: false
        }),
        terrainProvider: new TerraExplorer.internal.SFSTerrainProvider({
          url: "http://19.16.240.94/sg/Elevation",
          layerName: "GDALL.397536.tbp",
          requestVertexNormals: true
        })
      });

      let mapApp = me.$props.bindMapApp;

      if (mapApp) {
        let defaultExtent = mapApp.view.extent;
        window.viewer.camera.flyTo({
          destination: Cesium.Rectangle.fromDegrees(
            defaultExtent.xmin,
            defaultExtent.ymin,
            defaultExtent.xmax,
            defaultExtent.ymax
          )
        });

        // 图层同步
        mapApp.map.layers.on("change", function(event) {
          event.added.forEach(layer => {
            if(layer.id=="RGLayer") return;
            var newLayer = null;
            switch (layer.type) {
              case "map-image":
                newLayer = new Cesium.ArcGisMapServerImageryProvider({
                  url: layer.url,
                  enablePickFeatures: true
                });
                break;
              case "wms":
                lyr_list = [];
                layer.sublayers.forEach(item => {
                  lyr_list.push(item.name);
                });
                newLayer = new Cesium.WebMapServiceImageryProvider({
                  url: layer.url,
                  layers: lyr_list.join(","),
                  enablePickFeatures: true
                });
                break;
              case "wmts":
                newLayer = new Cesium.WebMapTileServiceImageryProvider({
                  url: layer.url,
                  layer: layer.activeLayer.id
                });
                break;
              case "web-tile":
                if (layer.urlTemplate.match(/WMTS\?/i)) {
                  let layerName = layer.urlTemplate.match(/layer=[^\&]*/i);
                  let layerStyle = layer.urlTemplate.match(/style=[^\&]*/i);
                  let matrixSet = layer.urlTemplate.match(
                    /tilematrixset=[^\&]*/i
                  );
                  let tileFormat = layer.urlTemplate.match(/format=[^\&]*/i);

                  newLayer = new Cesium.WebMapTileServiceImageryProvider({
                    url: layer.urlTemplate.split("?")[0],
                    layer:
                      null == layerName
                        ? ""
                        : layerName.toString().split("=")[1],
                    style:
                      null == layerStyle
                        ? "default"
                        : layerStyle.toString().split("=")[1],
                    tileMatrixSetID:
                      null == matrixSet
                        ? "default028mm"
                        : matrixSet.toString().split("=")[1],
                    format:
                      null == tileFormat
                        ? "image/tile"
                        : tileFormat.toString().split("=")[1]
                  });
                } else {
                  newLayer = new Cesium.UrlTemplateImageryProvider({
                    url: layer.urlTemplate
                      .replace(/{level\}/i, "{z}")
                      .replace(/{col\}/i, "{x}")
                      .replace(/{row\}/i, "{y}")
                      .replace(/\{subdomain\}/i, "{s}"),
                    subdomains: layer.subDomains
                  });
                }
                break;
              default:
                console.log("三维场景暂不支持此类图层服务：" + layer.type);
                break;
            }
            if (newLayer) {
              window.viewer.imageryLayers.addImageryProvider(newLayer);
              let index = window.viewer.imageryLayers.length - 1;
              layer.watch("visible", function() {
                window.viewer.imageryLayers.get(index).show = layer.visible;
              });
            }
          });
        });
      }

      TerraExplorer.init();
    }
  }
};
</script>

<style scoped>
.cesium-container {
  margin: 0;
  padding: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
</style>