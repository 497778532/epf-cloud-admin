<template>
  <div class="wrap" v-show="showToolPanel">
    <epf-row>
      <div class="content">
        <img src="@/assets/monitorassess-tools/jcwt.png" />
        <p>监测问题</p>
      </div>
      <div class="content">
        <img src="@/assets/monitorassess-tools/hcfk.png" />
        <p>核查反馈</p>
      </div>
      <div class="content" @click="problem">
        <img src="@/assets/monitorassess-tools/wtfx.png" />
        <p>问题发现</p>
      </div>
      <div class="content">
        <img src="@/assets/monitorassess-tools/sxcx.png" />
        <p>属性查询</p>
      </div>
    </epf-row>
    <epf-row>
      <div class="content">
        <img src="@/assets/monitorassess-tools/sxcx2.png" />
        <p>时相对比</p>
      </div>
      <div class="content" @click="handleDistanceMeasureClick">
        <img src="@/assets/monitorassess-tools/jllc.png" />
        <p>距离量测</p>
      </div>
      <div class="content">
        <img src="@/assets/monitorassess-tools/mjlc.png" />
        <p>面积量测</p>
      </div>
      <div class="content" @click.stop="handleLocateClick">
        <img src="@/assets/monitorassess-tools/wzbj.png" />
        <p>位置标记</p>
      </div>
    </epf-row>
    <epf-row>
      <div class="content" @click.stop="handleScreenshotClick">
        <img src="@/assets/monitorassess-tools/jtgn.png" />
        <p>截图功能</p>
      </div>
      <div class="content" @click.stop="handleUploadClick">
        <img src="@/assets/monitorassess-tools/drwj.png" />
        <p>导入文件</p>
      </div>
      <div class="content" @click="myClick">
        <img src="@/assets/monitorassess-tools/bhqlq.png" />
        <p>补划潜力区</p>
      </div>
    </epf-row>
  </div>
</template>

<script>
export default {
  name: 'CustomToolPanel',
  data() {
    return {
      showToolPanel: false,
      isShowProblem: false
    }
  },
  methods: {
    myClick() {
      this.showToolPanel = false
      this.$emit('show')
    },
    problem() {
      this.showToolPanel = false
      this.isShowProblem = true
      this.$emit('problem')
      this.$emit('problemMessage', this.isShowProblem)
    },
    handleDistanceMeasureClick() {
    },
    handleLocateClick() {
      this.showToolPanel = false
      this.$bus.$emit('showLocate', true)
    },
    handleScreenshotClick() {
      this.showToolPanel = false
      this.$bus.$emit('startupScreenshot', true)
    },
    handleUploadClick() {
      debugger
      this.showToolPanel = false
      this.$bus.$emit('showUpload', true)
    }
  },
  mounted() {
    this.$bus.$on('showToolPanel', res => {
      if (typeof res === 'boolean') {
        this.showToolPanel = res
      }
    })
  },
  watch: {
    showToolPanel(val) {
      if (val === false) {
        this.isShowProblem = false
      }
    },
    isShowProblem(val) {
      if (val === true) {
        this.isShowProblem = true
        this.$emit('problemMessage', this.isShowProblem)
      }
    }
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 330px;
  height: auto;
  position: absolute;
  top: 60px;
  right: 15px;
  z-index: 99999;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
}
.content {
  display: flex;
  flex-direction: column;
  margin: 0 12px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
}
.content:hover {
  background-color: #eee;
}
.content:hover p {
  color: rgba(20, 20, 20, 1);
}
img {
  width: 36px;
  height: 36px;
  margin: 0 0 10px 0;
}
p {
  width: auto;
  height: 19px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: rgba(60, 60, 60, 1);
  line-height: 19px;
}
</style>
