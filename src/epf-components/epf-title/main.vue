<template>
  <div class="epf-title__wrapper">
    <div class="epf-title-container">
      <i :class="iconClass"
         v-if="showIcon"></i>
      <span class="epf-title-content"
            :class="[fontSize, noMargin]">{{title}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EpfTitle',
  props: {
    showIcon: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'rect'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    iconClass() {
      return `epf-title-${this.type}`
    },
    fontSize() {
      return this.type
    },
    noMargin() {
      if (!this.showIcon) {
        return 'no-margin'
      }
      return ''
    }
  }
}
</script>

<style scoped>
.epf-title__wrapper {
  display: flex;
  align-items: center;
  margin: 25px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.epf-title-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.epf-title-rect {
  width: 4px;
  height: 16px;
  background: rgba(82, 144, 242, 1);
  border-radius: 2px;
}
.epf-title-circle {
  width: 6px;
  height: 6px;
  background: rgba(48, 48, 48, 1);
  border-radius: 50%;
}
.epf-title-content {
  line-height: 22px;
  font-weight: bold;
  margin: 0 0 0 10px;
}
.no-margin {
  margin: 0;
}
.normal {
  font-size: 18px;
  margin: 0 0 0 14px;
  font-weight: unset;
}
.rect {
  font-size: 18px;
}
.circle {
  font-size: 16px;
}
</style>
