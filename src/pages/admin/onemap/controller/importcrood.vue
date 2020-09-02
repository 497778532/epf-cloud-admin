<template>
  <div id="dataDetailBox"
       v-show="isImportcroodShow">
    <div class="data_title">
      <span>导入坐标</span>
      <i class="el-icon-close"
         @click="handleCloseClick"></i>
    </div>
    <div class="data_content">
      <div class="inputTextArea">
        <el-input placeholder="格式参考：114,23"
                  v-model="inputCrood"
                  clearable
                  :maxlength="20"></el-input>
      </div>
      <div class="buttonList">
        <el-button type="primary"
                   size="small"
                   @click="handleLocationClick">转至位置</el-button>
        <el-button type="primary"
                   size="small"
                   @click="handleCaptureModeClick">{{captureModeTitle}}</el-button>
        <el-button type="primary"
                   size="small"
                   @click="handleLiveModeClick">{{liveModeTitle}}</el-button>
        <el-button type="primary"
                   size="small"
                   @click="handleCloseClick">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'importcrood',
  props: {
    isImportcroodShow: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    layer: Object
  },
  data () {
    return {
      inputCrood: '',
      captureModeTitle: '手动定位模式',
      liveModeTitle: '实时模式',
      centerPoint: null,
      layerId: ''
    }
  },
  computed: {
    mapApp () {
      return MapApp
    }
  },
  watch: {
    layer (newVal, oldVal) {
      if (newVal.serviceId) {
        this.layerId = newVal.serviceId
      }
    }
  },
  methods: {
    handleCloseClick () {
      this.$emit('closeDialog', false)
    },
    handleLocationClick () {
      if (this.inputCrood !== '') {
        var inputCrood = this.inputCrood.split(',')
        var x = Number(inputCrood[0])
        var y = Number(inputCrood[1])
        // this.addPoint(x,y);
        this.mapApp.view.goTo({
          target: this.centerPoint,
          zoom: 15
        })
      }
    },
    handleCaptureModeClick () {
      let me = this
      const captureAction = me.mapApp.view.on(
        ['pointer-move', 'click'],
        function (event) {
          event.stopPropagation()
          var x, y
          me.captureModeTitle = '定位中...'
          me.liveModeTitle = '实时模式'
          if (event.type === 'click') {
            me.captureModeTitle = '重新定位'
            x = event.mapPoint.x
            y = event.mapPoint.y
            me.inputCrood = `${x}, ${y}`
            me.addPoint(x, y)

            captureAction.remove()
          }
        }
      )
    },
    handleLiveModeClick () {
      let me = this
      const captureAction = me.mapApp.view.on(
        ['pointer-move', 'click'],
        function (event) {
          event.stopPropagation()

          var mapPoint = me.mapApp.view.toMap({
            x: event.x,
            y: event.y
          })
          me.inputCrood = `${mapPoint.x}, ${mapPoint.y}`
          me.liveModeTitle = '定位中...'
          me.captureModeTitle = '手动定位模式'

          if (event.type === 'click') {
            me.liveModeTitle = '重新定位'
            me.addPoint(mapPoint.x, mapPoint.y)
            captureAction.remove()
          }
        }
      )
    },
    addPoint (x, y) {
      let wkid = this.mapApp.view.spatialReference.wkid
      let coordinateConversion = this.mapApp.widgets.find(
        e => e.coordinateConversion
      )
      this.centerPoint = coordinateConversion.createCenter(wkid, x, y)
      coordinateConversion.startQuery(this.centerPoint, this.layerId)
    }
  }
}
</script>
<style scoped>
#dataDetailBox {
}
.data_title {
  width: 415px;
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0px 5px 0 rgba(0, 0, 0, 0.5);
}
.data_content {
  width: 415px;
  height: 650px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  /* border: 1px solid #999; */
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.data_content::-webkit-scrollbar {
  display: none;
}
.inputTextArea {
}
.buttonList {
  margin-top: 1rem;
}
</style>
