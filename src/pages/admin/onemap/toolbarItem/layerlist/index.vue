<template>
  <el-popover   
    class="layer-btn"
    placement="bottom"
    @show="show"
    @hide="hide"
    width="268"
    trigger="manual"
    v-model="visible"
  >
    <el-card class="box-card" id="layerlists">
      <div slot="header" class="clearfix">
        <span>图层列表</span>
      </div>
      <div class="layer-list-widget">
        <div id="layer-list"></div>
      </div>
    </el-card>
    <p class="layer-txt" slot="reference" @click="showlayer">
      <img class="layer-img" src="@/assets/layerlist.png" />图层
    </p>
  </el-popover>
</template>

<script>
export default {
  name: "layerlist",
  inject: ["mapAppId"],
  data() {
    return {
      mapApp: null,
      visible: false,
      layerList: null
    };
  },
  methods: {
    showlayer() {
      let me = this;
      // hide basemap
      this.$bus.$on("basemapfalse",function(res){
        me.visible = res;
      })      
      this.visible = !this.visible;
      var basemap = document.getElementById("basemaps")
      var w = basemap.parentNode.clientWidth||basemap.parentNode.offsetWidth
      if(w!=0){
        basemap.parentNode.style.display = "none"
        document.getElementById("layerlists").parentNode.style.display = "block"
        this.visible =true
      }    
    },
    hide(){
      this.$bus.$emit("layerlistfalse",this.visible)
    },
    show() {
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId);
      }
      let me = this;
      this.mapApp.view.on("click", function(evt) {
        me.visible = false;
      });
      if (!this.layerList) {
        this.layerList = this.mapApp.createOutsideWidget("EsriLayerList", {
          view: this.mapApp.view,
          container: document.getElementById("layer-list")
        });
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
.layer-list-widget {
  height: 100%;
  overflow: auto;
}
.el-card__body {
  padding: 5px;
}
</style>