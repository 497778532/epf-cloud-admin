<template>
  <div class="page-body-leadership"
       id="leader-index-swiper">
    <el-carousel indicator-position="none"
                 autoplay="false"
                 :interval="0"
                 :initial-index="currentIndex"
                 height="100%"
                 @change="handleCarouselChange"
                 style="width:100%;height:100%;">
      <el-carousel-item>
        <SearchIndex ref="leaderThird"></SearchIndex>
      </el-carousel-item>
      <el-carousel-item>
        <MapIndex ref="leaderSecond"></MapIndex>
      </el-carousel-item>
      <el-carousel-item>
        <leadershipLargeScreen ref="leaderFirst"></leadershipLargeScreen>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import qs from 'qs'
import Bus from '../../../utils/bus'
import echarts from 'echarts'
import moment from 'moment'
import leadershipLargeScreen from './leadershipLargeScreen'
import MapIndex from './MapIndex'
import SearchIndex from './SearchIndex'
import { MAPSERVICE } from './LeaderShipMock'

export default {
  name: 'LeadershipIndex',
  components: {
    leadershipLargeScreen,
    MapIndex,
    SearchIndex
  },
  data () {
    return {
      currentIndex: 1,
      title: '图层加载中...',
      mapApp: null,
      activeIndex: -1
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    handleCarouselChange (activeIndex) {
      if (activeIndex === 2) {
        this.$refs.leaderFirst.mapViewHidden = false
      }
    }
  }
}
</script>
<style scoped>
.page-body-leadership {
  padding: 0;
  height: 100%;
  width: 100%;
}
@media screen and (max-width: 1599px) {
  .page-body-leadership {
    width: calc(100% + 74px);
    position: absolute;
    left: -74px;
    z-index: 88;
  }
}
</style>
<style>
.page-body-leadership .el-icon-arrow-up:before {
  color: #fff;
}
.page-body-leadership .el-carousel-item {
  width: 100%;
}
.page-body-leadership .el-carousel__arrow {
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  height: 200px;
  width: 25px;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 0;
  /* color: #FFF; */
  background-color: transparent;
  position: absolute;
  top: 50%;
  z-index: 10;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  /* text-align: center;
    font-size: 12px; */
}
.page-body-leadership .el-carousel__arrow--right {
  right: 0px;
  background: url("../../../assets/images/leader/next.png") no-repeat;
  background-size: 100% 100%;
}
.page-body-leadership .el-icon-arrow-right:before {
  content: "";
}
.page-body-leadership .el-carousel__arrow--left {
  left: 0px;
  background: url("../../../assets/images/leader/prev.png") no-repeat;
  background-size: 100% 100%;
}
.page-body-leadership .el-icon-arrow-left:before {
  content: "";
}
</style>
