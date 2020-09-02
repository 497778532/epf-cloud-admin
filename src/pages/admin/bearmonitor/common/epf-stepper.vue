<template>
  <div class="wp">
    <div class="epf-stepper">
      <img class="epf-stepper-icon"
           :src="getIcon('year')"
           alt />
      <span class="epf-stepper-text">统计年份：</span>
      <input class="epf-stepper-year"
             ref="input"
             v-model="curYear"
             type="text" />
      <div class="epf-step-buttons">
        <div class="epf-step-button epf-step-button-up"
             @click="stepUp"
             :style="getIcon('up')">
          <img :src="getIcon('up')"
               alt />
        </div>
        <div class="epf-step-button epf-step-button-down"
             @click="stepDown"
             :style="getIcon('down')">
          <img :src="getIcon('down')"
               alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'epf-stepper',
  data () {
    return {
      curYear: 2019
    }
  },
  methods: {
    getIcon (type) {
      let url
      if (type === 'up') {
        url = require('@/assets/images/czjcyj/jc-step-up.png')
      } else if (type === 'down') {
        url = require('@/assets/images/czjcyj/jc-step-down.png')
      } else if (type === 'year') {
        url = require('@/assets/images/czjcyj/jc-year.png')
      }
      return url
    },
    stepUp () {
      if (this.curYear < 2019 && this.curYear > 1949) this.curYear++
    },
    stepDown () {
      if (this.curYear > 2000 && this.curYear < 2035) this.curYear--
    },
    _debounce (fn, delay = 600) {
      let timer = null
      return function () {
        let context = this
        let args = arguments

        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(context, args)
        }, delay)
      }
    }
  },
  watch: {
    curYear (value) {
      if (value > 2019 || value < 1949) {
        this.$refs.input.classList.add('is-error')
        return
      }
      this.$refs.input.classList.remove('is-error')
      this.$emit('yearChange', { year: value })
    }
  }
}
</script>

<style scoped>
.wp {
  position: absolute;
  top: 16px;
  right: 237px;
  font-size: 16px;
  user-select: none;
}

.epf-stepper {
  position: relative;
  width: 214px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 99;
}

.epf-stepper .epf-stepper-icon {
  position: absolute;
  left: 7px;
  top: 9px;
}

.epf-stepper .epf-stepper-text {
  position: absolute;
  left: 35px;
}

.epf-stepper .epf-stepper-year {
  position: absolute;
  /* top: calc(50% - 8px); */
  right: 30px;
  color: #000000;
  font-weight: bold;
  width: 70px;
  font-size: 16px;
  border: unset;
  text-align: center;
}

.epf-stepper .epf-step-buttons {
  position: absolute;
  right: 0;
  height: 100%;
  width: 23px;
}

.epf-stepper .epf-step-button {
  background: rgba(247, 247, 247, 1);
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.epf-stepper .epf-step-button:hover,
.epf-stepper .epf-step-button:active {
  filter: brightness(0.9);
}

.epf-stepper .epf-step-button-up {
  border-radius: 0px 2px 0px 0px;
}

.epf-stepper .epf-step-button-down {
  border-radius: 0px 0px 2px 0px;
}

.epf-stepper .is-error {
  color: #d21a1a;
}
</style>
