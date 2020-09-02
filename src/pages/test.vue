<template>
  <div id="container"></div>
</template>

<script>
import { loadModules } from "esri-loader";

export default {
  mounted() {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/WMTSLayer",
      "esri/widgets/LayerList"
    ]).then(([Map, MapView, WMTSLayer, LayerList]) => {
      layer = new WMTSLayer({
        url: "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best",
        copyright:
          "<a target='_top' href='https://earthdata.nasa.gov'>Earthdata</a> by <a target='_top' href='https://www.nasa.gov'>NASA</a>",
        activeLayer: {
          id: "SRTM_Color_Index"
        }
      });

      map = new Map({
        layers: [layer]
      });
      view = new MapView({
        container: "container",
        map: map,
        center: [16.463814503649008, 48.13488142774444],
        scale: 144201449.5083617
      });
      view.when(function() {
        view.extent = layer.fullExtent;
        var layerList = new LayerList({
          view: view
        });
        view.ui.add(layerList, "bottom-left");
      });
    });
  }
};
</script>

<style scoped>
#container{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>