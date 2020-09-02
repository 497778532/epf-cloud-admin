<template>
  <div class="epf-mapview__wrapper" :id="name" v-show="visible">
    <epf-loading v-show="loading" :content="loadingText"></epf-loading>
    <slot></slot>
  </div>
</template>

<script>
// import { MAPAPP_INITCONF, WIDGET_CONF } from './mapconf/mapapp.conf1'
// import analyse from './mixins/analyse'

export default {
  name: "EpfMapview1",
  // mixins: [analyse],
  props: {
    name: {
      type: String,
      default: `id-mapapp${Math.floor(Math.random() * 10000)}`
    },
    visible: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 0
    },
    linked: {
      type: Boolean,
      default: false
    },
    custom: {
      type: Boolean,
      default: false
    },
    showPopup: {
      type: Boolean,
      default: false
    },
    // mapAppInitConf: {
    //   type: Object,
    //   default: null
    // },
    widgetConf: {
      type: Object,
      default: null
    },
    fn: {
      type: Function,
      default: null
    }
  },

  data() {
    return {
      mapAppInitConf: {
        map: {
          "3D": false,
          "2D": true,
          noSupport: ["3857"],
          areaCode: "440000",
          basemaps: [
            [
              {
                title: "天地图电子图(经纬度坐标)",
                type: "wmts",
                layer: "vec_c",
                key: "6a92e00bdfafade25568c053a5ba6de4"
              },
              {
                title: "天地图矢量注记(经纬度坐标)",
                type: "wmts",
                layer: "cva_c",
                key: "6a92e00bdfafade25568c053a5ba6de4"
              }
            ],
            [
              {
                title: "天地图影像图(经纬度坐标)",
                type: "wmts",
                layer: "img_c",
                key: "6a92e00bdfafade25568c053a5ba6de4"
              },
              {
                title: "天地图影像注记(经纬度坐标)",
                type: "wmts",
                layer: "cia_c",
                key: "6a92e00bdfafade25568c053a5ba6de4"
              }
            ],
            [
              {
                title: "技术中心电子图(经纬度坐标)",
                type: "wmts",
                useProxy: true,
                url: "http://19.16.240.227:7001/Wy5mwp/DLG_PAD/wmts"
              }
            ],
            [
              {
                title: "技术中心影像图(经纬度坐标)",
                type: "wmts",
                useProxy: true,
                url: "http://19.16.240.232/DOM_PAD/wmts"
              }
            ],
            [
              {
                title: "广东省国土空间规划地图",
                type: "wmts",
                useProxy: false,
                url:
                  "http://19.15.73.111/arcgisserver12/rest/services/国土空间规划底图/实施监督预警底图/MapServer"
              }
            ]
          ],
          maskService: {
            disable: false,
            title: "行政区划边界服务",
            type: "image",
            url:
              "http://19.15.73.111/arcgisserver12/rest/services/广东省界合并2000/MapServer",
            symbol: {
              type: "simple-fill",
              color: [128, 128, 128, 0.6],
              outline: {
                color: [56, 125, 232],
                width: 2
              }
            }
          },
          xzqhService: {
            disable: false,
            needTransform: false,
            title: "广东省地市边界图层",
            id: "XZQHLayer",
            url:
              "http://19.15.73.111/arcgisserver12/rest/services/广东省行政区界线/Boundary/MapServer/0",
            url2:
              "http://120.77.57.182:6080/arcgis/rest/services/test/区划/MapServer/0",
            url3:
              "http://19.15.73.111/arcgisserver12/rest/services/广东省行政区界线/MyMapService/MapServer/0",
            colors: [
              [230, 209, 192, 0.8],
              [245, 248, 195, 0.8],
              [208, 231, 207, 0.8]
            ]
          }
        },
        mapview: {
          spatialReference: {
            wkid: 4326
          },
          constraints: {
            minZoom: 6,
            maxZoom: 17
          },
          center: [113.754645, 23.198923]
        },
        httpProxy: {
          useProxy: true,
          items: [
            "http://19.15.73.111/node_s/proxy/"
            //'http://172.16.8.102:8089/proxy/', // 技术中心局域网代理
            // 'http://39.108.106.59:8089/tdt/', // 互联网天地图代理
            // 'http://172.16.8.102:8089/geoapi/', // 技术中心空间分析代理
            // 'http://172.16.8.107:9994/gmap/proxyHandler/' // 粤政图服务代理
          ]
        }
      },
      myLoading: null,
      loadingText: "初次加载，请耐心等待...",
      mapAppFactory: null,
      mapApp: null,
      loading: false,
      areaInfo: null,
      viewLoaded: false,
      startTime: null,
      endTime: null
    };
  },
  beforeCreate() {
    const startTime = new Date().getMilliseconds();
    const me = this;
    if (!window.dojo) {
      this.$loadGISUri().then(res => {
        me.$loadGISModules();
      });
    }
  },
  created() {},
  mounted() {
    const me = this;
    this.loading = true;
    this.$bus.$on("layerLoading", bol => {
      if (bol) {
        me.loadingText = "图层加载中，请耐心等待...";
      }
      me.loading = bol;
    });
    this.$bus.$on("analysing", bol => {
      if (bol) {
        me.loadingText = "分析进行中，请耐心等待...";
      }
      me.loading = bol;
    });
    this.creatMapApp();
  },
  beforeDestroy() {
    this.$bus.$off("layerLoading");
    this.$bus.$off("analysing");
    if (this.linked) {
      if (this.mapAppFactory) {
        this.mapAppFactory.removeEventLinstener(this.$el.id);
      }
    }
  },
  destroyed() {
    if (this.mapAppFactory) {
      this.mapAppFactory.destroyMapApp(this.$el.id);
    }
  },

  provide() {
    return {
      mapAppId: this.name,
      mapAppConf: this.mapAppConf
    };
  },

  methods: {
    async creatMapApp(layerInfo) {
      // if (!MAPAPP_INITCONF || !WIDGET_CONF) return
      this.mapAppConf = {
        ...(this.mapAppInitConf || MAPAPP_INITCONF),
        ...(this.widgetConf || WIDGET_CONF)
      };
      if (this.name) {
        this.mapAppConf.mapview.container = this.$el.id;
        this.mapAppConf.mapview.linked = this.linked;
        let previewConf = null;
        if (this.custom && !layerInfo) {
          return;
        } else if (this.custom && layerInfo) {
          previewConf = this.getPreviewConf(layerInfo, this.mapAppConf);
        }
        this.mapAppFactory = this.$findMapAppFactory();
        if (!this.mapAppFactory) {
          const mapAppFactoryConstructor = await this.$loadGISModules();
          this.mapAppFactory = mapAppFactoryConstructor.getInstance();
          this.$setMapAppFactory(this.mapAppFactory);
        }
        const me = this;
        this.$nextTick(() => {
          if (me.delay > 0) {
            setTimeout(() => {
              me.initMapApp(previewConf);
            }, me.delay);
          } else {
            me.initMapApp(previewConf);
          }
        });
      }
    },

    initMapApp(previewConf) {
      const me = this;
      this.mapAppFactory
        .createMapApp(
          previewConf || this.mapAppConf,
          this.fn || this.$message.error
        )
        .then(mapApp => {
          me.mapApp = mapApp;
          me.loading = false;
          me.viewLoaded = true;
          me.endTime = new Date().getMilliseconds();
          const usedTime = Math.floor(this.endTime - this.startTime);
          me.$print(`${this.$el.id} loading time : ${usedTime}ms`);
          me.$bus.$emit("viewLoaded", me.name);
          me.$emit("viewLoaded", me.mapApp);
        });
    },

    getPreviewConf(layerInfo, mapAppConf) {
      let previewConf = this.$cloneDeep(mapAppConf);
      previewConf.map.basemaps = [];
      previewConf.map.basemaps.push([
        {
          id: layerInfo.id,
          title: layerInfo.serviceName,
          type: layerInfo.serviceType,
          url: layerInfo.url
        }
      ]);
      previewConf.widgets = this.mapAppConf.widgets;
      return previewConf;
    },

    getMapApp() {
      return this.mapApp || this.$findMapApp(this.name);
    }
  }
};
</script>

<style scoped>
.epf-mapview__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
</style>
