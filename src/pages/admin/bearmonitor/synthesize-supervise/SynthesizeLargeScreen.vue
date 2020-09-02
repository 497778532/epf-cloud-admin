<template>
  <div
    id="epf-screen-content"
    :class="type==='big'?'big-chart':'small-chart'"
    style="width:100%;height:100%"
  >
    <SynthesizeBigScreen @full="changeScreen" @screenMessage="getScreenType"></SynthesizeBigScreen>
  </div>
</template>
<script>
import SynthesizeBigScreen from "./SynthesizeBigScreen";
import screenfull from "screenfull";
export default {
  components: {
    SynthesizeBigScreen
  },
  data() {
    return {
      type: "small"
    };
  },
  methods: {
    changeScreen() {
      let target = document.getElementById("epf-screen-content");
      if (screenfull.isEnabled) {
        screenfull.request(target);
        screenfull.on("change", () => {
          this.type = screenfull.isFullscreen ? "big" : "small";
        });
      }
    },
    getScreenType() {
      this.type = "big";
    },
    //退出全屏
    exitFullScreen(el) {
      var el = document,
        cfs =
          el.cancelFullScreen ||
          el.webkitCancelFullScreen ||
          el.mozCancelFullScreen ||
          el.exitFullScreen,
        wscript;

      if (typeof cfs !== "undefined" && cfs) {
        cfs.call(el);

        return;
      }

      if (typeof window.ActiveXObject !== "undefined") {
        wscript = new ActiveXObject("WScript.Shell");

        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    }
  },
  created() {
    this.exitFullScreen();
  }
};
</script>
<style scoped>
</style>