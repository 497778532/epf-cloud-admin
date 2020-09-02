<template>
  <div class="epf-step">
    <div :class="['button', 'flex-center',{'active':isCurrent===item.index}]"
         @click="handleItemClick(item, index)"
         v-for="(item, index) in listData"
         :key="index"
         ref="itemDOM">{{item.title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: function () {
        return [];
      } // 这样可以指定默认的值
    },
    isCurrent: {
      type: Number,
      default: function () {
        return
      }
    }
  },
  data() {
    return {

    };
  },
  components: {},
  methods: {
    handleItemClick(item, index) {
      this.isCurrent = item.title;
      item.activeStep = index
      this.$emit("itemClick", item);
    }
  },
  watch: {}
};
</script>

<style scoped>
.epf-step {
  position: absolute;
  top: 10px;
  left: 15px;
  user-select: none;
  display: flex;
  flex-direction: column;
}

.epf-step .button {
  padding: 0 15px;
  height: 36px;
  background: #ffffff;
  color: #707070;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  font-size: 14px;
}

.epf-step .button.active {
  background: #1d7ce4;
  color: #ffffff;
}
.epf-step .button:hover {
  filter: brightness(0.95);
}
.flex-center {
  display: flex;

  align-items: center;
  justify-content: center;
}
</style>
