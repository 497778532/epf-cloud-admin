<template>
  <el-row class="conHeader"
          type="flex"
          align="middle">
    <div class="switch-contain">
      <div class="switch">
        <span @click="search"
              class=""><img :src="searchShow?list55:list5"
               alt=""></span>
      </div>

    </div>
    <div class="handle-icon">
      <div class="input--contain">
        <el-input v-model="input"
                  placeholder="输入图层/文件/专题关键字"
                  :maxlength="50"></el-input>

        <span @click="reset"
              class="iconButton"><img src="@/assets/list7.png"
               alt=""></span>
      </div>
      <div class="search_botton"
           @click="searchList()">
        搜索
      </div>

    </div>
    <!-- <div class="handle-icon"
         v-if="tab==4">
      <div class="data">

        <div :class="acitve===0?'darkBlue':'EFPreset'"
             @click="acitve=0">
          <span>自然资源综合统计</span>
        </div>
        <div :class="acitve!==0?'darkBlue':'EFPreset'"
             @click="acitve=1">
          <span>社会经济数据统计</span>
        </div>
      </div>
    </div> -->
  </el-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {

  },
  data () {
    return {
      acitve: 0,
      input: '',
      params: {
        key: ''
      },

      list5: require('@/assets/list5.png'),
      list55: require('@/assets/list55.png'),
      list7: require('@/assets/list7.png')
    }
  },
  methods: {
    ...mapMutations('onemap', ['SET_Search', 'SET_SearchParams']),

    search () {
      this.SET_Search(!this.searchShow)
    },
    searchList () {
      this.SET_Search(true)
      this.SET_SearchParams(this.input)
    },
    reset () {
      this.input = ''
    }
  },
  computed: {
    ...mapState('onemap', ['searchShow', 'searchParams'])
  }
}
</script>

<style>
.conHeader {
  /* height: 56px;
  width: 100%;
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0; */
  height: 100% !important;
  width: 100%;
}
.switch-contain {
  background: #0c2973;
  width: 74px;
  height: 100%;
  padding: 0 8px;
}
.conHeader .switch {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #000a2c;
  height: 100%;
}
.conHeader .handle-icon {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 3px 0px rgba(153, 153, 153, 0.5);
  height: 56px;
  width: calc(100% - 74px);
  display: flex;
  align-items: center;
}

.conHeader .handle-icon .input--contain {
  width: 320px;
  padding: 10px 12px;
  position: relative;
}
.conHeader .handle-icon .search_botton {
  width: 70px;
  height: 40px;
  background: linear-gradient(
    180deg,
    rgba(36, 129, 255, 1) 0%,
    rgba(5, 92, 210, 1) 100%
  );
  line-height: 40px;
  text-align: center;
  border-radius: 2px;
  color: #ffffff;
  cursor: pointer;
}
.iconButton {
  position: absolute;

  right: 20px;
  top: 17px;

  cursor: pointer;
}
.data {
  display: flex;
  height: 100%;
  width: 320px;
}
.data > div {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
