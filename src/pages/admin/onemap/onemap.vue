<template>
  <el-container id="elcontainer"
                style="height: 100%;">
    <el-header height="56px"
               class="header3">
      <oneMapHead v-show="canShow"></oneMapHead>
      <!-- <el-switch v-model="show3d" active-text="3D模式" inactive-text="2D模式"></el-switch> -->
    </el-header>
    <el-container>
      <el-aside :width="this.iframeWidth">
        <controller v-show="canShow"
                    @show="showStatis"
                    :tabShow="index"
                    @tab="tabs"
                    @isNatureMsg="turnNature"
                    @societyMsg="getsocietyMsg"
                    @isIframe="getIframe"></controller>
      </el-aside>
      <el-main>
        <el-row style="height: 100%;">
          <epf-mapview name="mapapp0"
                       :delay=300
                       :mapAppInitConf="mapAppInitConf"
                       :widgetConf="widgetConf">
            <special-picture v-show="special"></special-picture>
            <toolbar v-show="!special && !statistical"></toolbar>
          </epf-mapview>
          <statisticsBanner v-if="statistical&&this.isNatureNum===1"
                            :data="item"></statisticsBanner>
          <societyIndex v-if="statistical&&this.isNatureNum===2"
                        :data="societyData"></societyIndex>
          <skylineviewer :bindMapApp="mapApp"
                         v-if="show3d"></skylineviewer>
          <div id="switcher"
               @click="switchView"
               v-show="!special && !statistical">
            {{ viewMode }}
          </div>
          <div id="zoomin"
               @click="zoomIn"
               v-show="!special && !statistical">
            <img class="toolbar-button-icon"
                 src="@/assets/onemap-zoomIn.png" />
          </div>
          <div id="zoomout"
               @click="zoomOut"
               v-show="!special && !statistical">
            <img class="toolbar-button-icon"
                 style="height: unset;"
                 src="@/assets/onemap-zoomOut.png" />
          </div>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import controller from './controller'
import specialPicture from './controller/specialPicture'
import toolbar from './toolbar'
import skylineviewer from '@/components/skyline/skylineviewer'
import OneMapHead from './controller/OneMapHead'
import statisticsBanner from './controller/statisticsBanner'
import societyIndex from './economy/societyIndex'
export default {
  name: 'Map',
  provide () {
    return {
      mapAppId: 'mapapp0'
    }
  },
  data () {
    return {
      canShow: true,
      mapApp: null,
      mapService: null,
      mapAppInitConf: null,
      widgetConf: null,
      show3d: false,
      viewMode: '2D',
      indexTab: 0,
      statistical: false,
      item: { name: '自然资源概况', id: 0, key: 'zrzygk' },
      index: 0,
      isNatureNum: 1,
      societyData: { name: '历年旅客周转量', id: 0 },

      iframeNum: 10,
      iframeWidth: 395 + 'px'

    }
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    window.addEventListener(
      'resize',
      () => {
        return (() => {
          this.screenWidth = document.body.clientWidth
        })()
      },
      0
    )
    this.mapService = this.$route.params
    const me = this
    this.$off('showLayer')
    this.$bus.$on('showLayer', res => {
      me.mapService = res
    })
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', res => {
      if (res === 'mapapp0') {
        me.mapApp = me.$findMapApp(res)
        if (me.mapService) {
          const id = me.mapService.id
          if (id) {
            const slipt = id.split('_')[1]
            this.$get(`/epf-onemap/admin/mapservices/getById?id=${slipt}`).then(
              res => {
                me.mapApp.addLayerToMap({
                  title: res.services.serviceName,
                  url: res.services.url,
                  type: res.services.serviceType
                })
              }
            )
          }
        }
      }
    })
  },

  methods: {

    zoomIn () {
      if (this.show3d) {
        TerraExplorer.internal.Navigate.zoom(1)
      } else {
        this.mapApp.view.zoom++
      }
    },
    zoomOut () {
      if (this.show3d) {
        TerraExplorer.internal.Navigate.zoom(-1)
      } else {
        this.mapApp.view.zoom--
      }
    },
    switchView () {
      this.show3d = !this.show3d
      this.viewMode = this.show3d ? '3D' : '2D'
    },
    addLayerToMap (service) {
      const mapService = {
        title: service.title,
        useProxy: false,
        url: service.serviceUrl,
        type: 'image'
      }
      this.mapApp.addLayerToMap(mapService)
    },
    exitFullScreen (el) {
      const cfs
        = document.cancelFullScreen
        || document.webkitCancelFullScreen
        || document.mozCancelFullScreen
        || document.exitFullScreen
      let wscript

      if (typeof cfs !== 'undefined' && cfs) {
        cfs.call(document)
        return
      }

      if (typeof window.ActiveXObject !== 'undefined') {
        wscript = new ActiveXObject('WScript.Shell')

        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },
    asyncViewExtent (is3d) {
      if (this.mapApp && window.viewer) {
        if (is3d) {
          let newExtent = this.mapApp.view.extent
          window.viewer.camera.flyTo({
            destination: Cesium.Rectangle.fromDegrees(
              newExtent.xmin,
              newExtent.ymin,
              newExtent.xmax,
              newExtent.ymax
            ),
            orientation: {
              heading: Cesium.Math.toRadians(0 - this.mapApp.view.rotation)
            }
          })
        } else {
          let rectangle = window.viewer.camera.computeViewRectangle()
          let extent = this.mapApp.view.extent.clone()
          extent.xmin = (rectangle.west * 180) / Math.PI
          extent.ymin = (rectangle.south * 180) / Math.PI
          extent.xmax = (rectangle.east * 180) / Math.PI
          extent.ymax = (rectangle.north * 180) / Math.PI
          this.mapApp.view.goTo(extent, {
            duration: 3000
          })
        }
      }
    },
    checkProjectMenu () {
      if (this.isShow) {
        document.querySelector('.el-tabs__content').style.display = ''
      } else {
        document.querySelector('.el-tabs__content').style.display = 'none'
      }
      this.isShow = !this.isShow
    },
    tabs (val) {
      if (val !== 4) {
        this.statistical = false
        return
      }
      this.statistical = true
    },
    showStatis (item) {
      this.item = item
    },
    getsocietyMsg (item) {
      this.societyData = item
    },
    getIframe (item) {
      this.iframeNum = item
    },
    turnNature (val) {
      this.isNatureNum = val
    }
  },
  created () {
    if (this.$route.params) {
      this.index = this.$route.params.index
    }

    this.screenWidth = document.body.clientWidth
    this.exitFullScreen()
    this.mapAppInitConf = this.$getMapAppInitConf()
    let arr1 = this.mapAppInitConf.map.basemaps.slice(
      0,
      this.mapAppInitConf.map.basemaps.length - 1
    )
    let arr2 = this.mapAppInitConf.map.basemaps.slice(
      this.mapAppInitConf.map.basemaps.length - 1,
      this.mapAppInitConf.map.basemaps.length
    )
    this.mapAppInitConf.map.basemaps = arr2.concat(arr1)
    this.widgetConf = this.$getWidgetConf()
    this.widgetConf.widgets.find(item => {
      if (item.name === 'ScaleBar') {
        item.position = 'bottom-right'
      }
    })
  },

  computed: {
    ...mapState('onemap', ['special'])

  },
  components: {
    controller,
    toolbar,
    skylineviewer,
    specialPicture,
    OneMapHead,
    statisticsBanner,
    societyIndex
  },
  watch: {
    getMapService (state) {
      if (state) {
        this.mapService = state.mapService
        this.addLayerToMap(this.mapService)
      }
    },
    show3d (mode) {
      this.asyncViewExtent(mode)
    },
    iframeNum (val) {
      if (val == 10) {
        this.iframeWidth = 395 + 'px'
      } else if (val == 11) {
        this.iframeWidth = 100 + '%'
      }
    }
  },
  beforeDestroy () {
    this.canShow = false
    console.log('我被摧毁')
    this.$bus.$off('viewLoaded')
  },
  beforeRouteLeave (to, from, next) {
    this.canShow = false
    next()
  }
}
</script>

<style scoped>
.header3 {
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 30;
}

.aside-menu {
  width: 100%;
  height: auto;
}

#newBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;
}

.middle-middle-message-box {
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 10;
  cursor: pointer;
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
}

.middle-middle-message-boxL {
  background-image: url("../../../assets/images/jcpgyj/left.png");
  background-size: 40px 40px;
  left: 394px;
  top: 56px;
}
.middle-middle-message-boxR {
  background-image: url("../../../assets/images/jcpgyj/right.png");
  background-size: 40px 40px;
  left: 74px;
  top: 56px;
}
.showT {
  width: 74px;
}
.showF {
  width: 394px;
}
.showTH {
  width: calc(100% + 74px);
  left: -74px;
}
.showFH {
  width: calc(100% + 394px);
  left: -394px;
}

@media screen and (max-width: 1599px) {
  #elcontainer {
    width: calc(100% + 74px);
    position: absolute;
    left: -74px;
    z-index: 88;
  }
}

#zoomout {
  position: absolute;
  right: 24px;
  bottom: 24px;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 0px 0px 5px 5px;
  cursor: pointer;
}

#zoomin {
  position: absolute;
  right: 24px;
  bottom: 64px;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
}
/* #zoomin img,
#zoomout img {
  border: 1px dashed #ccc;
} */
#switcher {
  position: absolute;
  right: 24px;
  bottom: 120px;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  cursor: pointer;
}
</style>
