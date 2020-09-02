
<template>
  <widgetpanel v-show="showPanel">
    <div class="content">
      <div>
        <p class="list-title">选择绘制模式</p>
        <div class="button-list">
          <div class="draw-button">点标记</div>
          <div class="draw-button">线标记</div>
          <div class="draw-button">矩形标记</div>
          <div class="draw-button">圆形标记</div>
          <div class="draw-button">不规则图形标记</div>
          <div class="draw-button">文字标记</div>
        </div>
      </div>
      <div>
        <p class="list-title">绘制标记</p>
        <div class="sketches-list">
          <div v-for="(item, index) in sketchesList" :key="index" class="sketches-items">
            <p>{{item.title}}</p>
            <div class="rightSide-button">
              <i class="el-icon-location-outline"></i>
              <i class="el-icon-star-off"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </widgetpanel>
</template>

<script>
import widgetpanel from '../../utils/panel'
export default {
  name: 'sketch-widget',
  componentName: '绘制',
  inject: ['mapAppId'],
  components: {
    widgetpanel
  },
  data() {
    return {
      showPanel: false,
      sketchesList: [
        { type: 'point', name: '0', title: '点标记', remarks: '备注1' },
        { type: 'polyline', name: '1', title: '线标记', remarks: '备注2' },
        { type: 'polygon', name: '2', title: '矩形标记', remarks: '备注3' },
        { type: 'rectangle', name: '3', title: '圆形标记', remarks: '备注4' },
        {
          type: 'circle',
          name: '4',
          title: '不规则图形标记',
          remarks: '备注5'
        },
        { type: 'text', name: '5', title: '文字标记', remarks: '备注6' }
      ],
      starIconClass: 'el-icon-star-off'
    }
  },
  methods: {
    handleCloseClick() {
      this.$emit('closePanel', 'SketchPanel')
    },
    handleStarClick() {
      if (this.starIconClass === 'el-icon-star-off') {
        this.starIconClass = 'el-icon-star-on'
      } else {
        this.starIconClass = 'el-icon-star-off'
      }
    }
  }
}
</script>

<style scoped>
@import "../style.css";
.onemap-widget-panel .content .button-list {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
}

.onemap-widget-panel .content .list-title {
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
}
.onemap-widget-panel .content .button-list .draw-button {
  width: 50px;
  height: 50px;
  border: 0.3px solid lightgray;
  margin: 0 5px;
  text-align: center;
}
.draw-button:hover,
.draw-button:active {
  background: #1b80e4;
  border: 0.1px solid lightgray;
  color: #fff;
}
.sketches-list {
  color: gray;
}
.sketches-list .sketches-items {
  position: relative;
  overflow: hidden;
  margin: 10px 0;
  display: flex;
}
.rightSide-button > i {
  font-size: 20px;
}
.rightSide-button {
  position: absolute;
  overflow: hidden;
  right: 2rem;
}
</style>
