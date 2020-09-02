<template>
  <el-popover
    class="layer-btn"
    placement="bottom"
    @show="show"
    @hide="hide"
    width="320"
    trigger="manual"
    v-model="visible"
  >
    <el-card class="box-card" id="basemaps">
      <!-- <div slot="header" class="clearfix">
        <span>图层列表</span>
      </div>-->
      <div class="map-gallary-widget">
        <div id="map-gallary"></div>
      </div>
    </el-card>
    <p class="layer-txt" slot="reference" @click="showlayer">
      <img class="layer-img" src="@/assets/basemap.png" />底图
    </p>
  </el-popover>
</template>

<script>
export default {
  name: "basemap",
  inject: ["mapAppId"],
  data() {
    return {
      mapApp: null,
      visible: false,
      mapGallery: null
    };
  },
  methods: {
    showlayer() {
      let me = this;
      // hide layerlist
      this.$bus.$on("layerlistfalse",res=>{
        me.visible = res;
      })
      this.visible = !this.visible;
      var layerlist = document.getElementById("layerlists")
      var w = layerlist.parentNode.clientWidth||layerlist.parentNode.offsetWidth
      if(w!=0){
        layerlist.parentNode.style.display = "none"
        document.getElementById("basemaps").parentNode.style.display = "block"
        this.visible =true
      }    
    },
    hide(){
      this.$bus.$emit("basemapfalse",this.visible)
    },
    show() {
      document.getElementById("map-gallary").innerHTML = "";
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId);
      }
      let me = this;
      this.mapApp.view.on("click", function(evt) {
        me.visible = false;
      });
      if (!this.mapGallary) {
        this.mapGallery = this.mapApp.createOutsideWidget(
          "EsriBasemapGallery",
          {
            view: this.mapApp.view,
            container: document.getElementById("map-gallary"),
            source: this.mapApp.baseMapSource
          }
        );
      }
    }
  }
};
</script>
<style scoped>
.layer-btn {
  margin-left: 0.7rem;
  background: #ffffff;
  opacity: 1;
  cursor: pointer;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.layer-img {
  position: relative;
  top: 6px;
  left: -3px;
  height: 1.25rem;
  width: 1.25rem;
}
.layer-txt {
  margin-left: 8px;
  margin-right: 10px;
  font-size: 1rem;
  line-height: 2rem;
  -ms-flex-line-pack: center;
  align-content: center;
  text-align: center;
  color: #464c5b;
}
.v-icon {
  cursor: pointer;
  vertical-align: middle;
}
/* .map-gallary-widget {
  height: 400px;
  overflow: auto;
} */
.el-card__body {
  padding: 3px !important;
}
</style>