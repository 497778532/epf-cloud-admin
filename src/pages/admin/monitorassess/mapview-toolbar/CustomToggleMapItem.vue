<template>
  <div class="toolbar-button toolbar-button-long"
       :title="title"
       @click="handleToggleMapClick">
    <img v-show="showXZQH"
         class="toolbar-button-icon toolbar-button-icon-long"
         src="@/assets/monitorassess-normalmap.png" />
    <img v-show="!showXZQH"
         class="toolbar-button-icon toolbar-button-icon-long"
         src="@/assets/monitorassess-setcolor.png" />
  </div>
</template>
<script>
export default {
  name: 'CustomToggleMapItem',
  inject: ['mapAppId'],
  data() {
    return {
      title: '切换到常规地图',
      mapApp: null,
      xzqhLayer: null,
      showXZQH: true
    }
  },
  created() {
    const me = this
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', res => {
      me.addXZQHLayer(res)
    })
    this.$bus.$off('addXZQHLayer')
    this.$bus.$on('addXZQHLayer', res => {
      me.addXZQHLayer(res)
    })
  },
  mounted() {
    const me = this
    this.$bus.$off('showXZQHLayer')
    this.$bus.$on('showXZQHLayer', res => {
      me.xzqhLayer.visible = res
      me.showXZQH = res
      me.title = res ? '切换到常规地图' : '切换到分段设色地图'
    })
  },
  methods: {
    addXZQHLayer(mapAppId) {
      const me = this
      this.mapApp = this.$findMapApp(mapAppId)
      if (!this.mapApp) return
      this.showXZQH = this.mapApp.appConfig.map.xzqhService.disable
      this.title = this.showXZQH ? '切换到常规地图' : '切换到分段设色地图'
      this.mapApp.addXZQHLayer().then(layer => {
        if (layer) {
          layer.maxScale = 1000000
          this.mapApp.addLayerEventListener('XZQHLayer', 'click', res => {
            if (res) {
              const cityName = res.graphic.attributes.CityNameC
              if (me.mapApp.areaInfo) {
                me.sendSelectedCityInfo(cityName)
              } else {
                const code = me.$getMapAppInitConf().map.areaCode
                me.$get('/epf-admin/admin/regionals/getAreasByCode').then(res => {
                  if (res.code === 0) {
                    const areas = JSON.parse(res.areas)
                    me.$root.areaInfo = areas.filter(area => area.dictKey === code)[0]
                    me.mapApp.areaInfo = me.$root.areaInfo
                    me.sendSelectedCityInfo(cityName)
                  }
                })
              }
            }
          })
        }
      })
    },
    sendSelectedCityInfo(cityName) {
      const selectedAreaInfo = this.mapApp.areaInfo.children.filter(child => child.zhCn === cityName)[0]
      this.$bus.$emit('sendSelectedCityInfo', selectedAreaInfo)
      this.$emit('sendSelectedCityInfo', selectedAreaInfo)
    },
    handleToggleMapClick() {
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }
      if (!this.xzqhLayer) {
        this.xzqhLayer = this.mapApp.map.allLayers.items.find(item => { return item.id === 'XZQHLayer' })
      }
      if (!this.xzqhLayer) return
      this.showXZQH = !this.showXZQH
      this.title = (this.showXZQH ? '切换到常规地图' : '切换到分段设色地图')
      this.xzqhLayer.visible = this.showXZQH
    }
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
</style>
