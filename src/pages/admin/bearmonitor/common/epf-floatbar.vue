<template>
  <div class="epf-floatbar">
    <div
      class="button flex-center"
      @click="handleItemClick(item, index)"
      v-for="(item, index) in listData"
      :key="index"
      ref="itemDOM"
    >{{item.title}}</div>
  </div>
</template>

<script>
export default {
  name: 'epf-floatbar',
  data() {
    return {
      activeTitle: '',
      activeItem: null
    }
  },
  props: {
    listData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    handleItemClick(item, index) {
      this.activeTitle = item.title
      this.activeItem = item
      this.updateItemState(index)
      this.emitAction()
    },
    updateItemState(index) {
      this.$refs.itemDOM.forEach(e => {
        e.classList.remove('is-actived')
      })
      let itemDOM = this.$refs.itemDOM[index]
      itemDOM.classList.add('is-actived')
    },
    emitAction() {
      var payload = {
        title: this.activeTitle,
        item: this.activeItem
      }
      this.$emit('itemChange', payload)
    }
  },
  mounted() {
    this.$refs.itemDOM[0].classList.add('is-actived')
  },
  created() {
    this.activeItem = this.listData[0]
    this.activeTitle = this.activeItem.title
  }
}
</script>

<style scoped>
.epf-floatbar {
  position: absolute;
  top: 10px;
  left: 15px;
  user-select:none;
}

.epf-floatbar .button {
  width: 216px;
  height: 36px;
  background: #ffffff;
  color: #707070;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
}

.epf-floatbar .button:hover,
.epf-floatbar .button:active {
  filter: brightness(0.95);
}

.epf-floatbar .is-actived {
  background: #1d7ce4;
  color: #ffffff;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
