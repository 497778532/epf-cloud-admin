<template>
  <div class="page__body zebra">

    <transition name="left">

      <div class="body__left"
           v-show="show">

        <el-scrollbar style="height:100%;">
          <router-view>

          </router-view>

        </el-scrollbar>
      </div>
    </transition>

    <div :class="show?'body__right':'body__right-fullCreen'">
      <el-row type="flex"
              justify="end"
              style="height:40px;padding-right:16px;
              box-shadow:0px 1px 3px -1px rgba(153,153,153,0.5);z-index:2;
              background:#fff"
              align="middle">
        <span @click="full()"
              style="cursor: pointer;display: flex;align-items: center;">
          返回
        </span>
      </el-row>

      <div @click="checkProjectMenu"
           style="z-index:1"
           class="middle-middle-message-box"
           :class="{
            'middle-middle-message-boxR': show,
            'middle-middle-message-boxL': !show
          }"></div>
      <epf-mapview :delay="10"
                   name="threeLine"
                   :mapAppInitConf="myMapAppInitConf"
                   @viewLoaded="getMapApp"
                   class="epf-mapview__custom">

        <epf-mapview-popup :visible="showPopup"
                           :position="popupPosition"
                           :content="popupContent"></epf-mapview-popup>
        <div class="toolbar">
          <toggle-map style="margin-right: 10px;width: 32px;"></toggle-map>
          <jumpto></jumpto>

          <toolbox  @click.stop.native="handleToolBoxClick"></toolbox>
          <tool-item></tool-item>
          <layerlist></layerlist>
          <basemap></basemap>
        </div>
        <city-location></city-location>
        <epf-locate></epf-locate>
        <epf-upload></epf-upload>
        <epf-screenshot></epf-screenshot>

        <tool-panel @show="showCondtion"
                    @problem="myProblem"></tool-panel>

      </epf-mapview>
    </div>
    <findProblem v-if="problemVisiblity"
                 @close="closeProblem"></findProblem>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import gisMixin from '../mixins/three'
import FindProblem from './FindProblem'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  components: {
    FindProblem,
    layerlist:()=>import("@/pages/admin/onemap/toolbarItem/layerlist"),
    basemap:()=>import("@/pages/admin/onemap/toolbarItem/basemap"),
  },
  mixins: [gisMixin],
  data () {
    return {
      problemVisiblity: false,
      isMapPattern: true,
      newCommand: '2020年',
      mapviewHidden: true,
      totalList: [],
      searchResult: false,
      pictureList: [
        { name: '城市总体规划' },
        { name: '土地利用规划' },
        { name: '环保规划' }
      ],
      data: [
        { name: '哈哈', unit: '元' },
        { name: '哈哈', unit: '元' },
        { name: '哈哈', unit: '元' },
        { name: '哈哈', unit: '元' },
        { name: '哈哈', unit: '元' }
      ],
      up: '2.1公顷',
      baifen: '1.1%',
      echartTitle: '重大项目占用永久基本农田情况',
      isActive: false,
      detectionAndPlanData: {},
      state: true,
      show: true,

      show1: true,
      detailCanShow: false,
      detail: false,
      searchVue: false,
      params: {},
      itemData: {},
      activeYear: '2020',
      activeCity: '广东省',
      dicKey: {
        province: '440000',
        city: '',
        area: ''
      },
      projectInfo: {},
      fullPath: ''
    }
  },
  methods: {
    ...mapMutations('jcpgyj', ['SET_year', 'SET_area', 'SET_locationCity']),
    full () {
      this.$router.push('/Control')
    },

    checkProjectMenu () {
      this.show = !this.show
    },
    myProblem () {
      this.problemVisiblity = true
    },
    closeProblem () {
      this.problemVisiblity = false
    },
    pushList () {
      this.$emit('open')
    },
    toDetail (item) {
      this.itemData = item
      this.detailCanShow = true
    },
    getList (val) {
      let params = this.params
      params['year'] = this.activeYear
      params = Object.assign(params, this.area)
      this.$get('/epf-monitor-evaluation/stockActivation/acMap', params).then(
        res => {
          if (res.code === 0) {
            let data = res.result
            data.forEach(item => {
              if (item.indexValueDouble) {
                if (!/^\d+$/.test(item.indexValueDouble)) {
                  item.indexValueDouble = parseFloat(
                    item.indexValueDouble
                  ).toFixed(2)
                }
              } else {
                item.indexValueDouble = '-'
              }
            })
            data[0].name = '可盘活用地'
            data[4].name = '已盘活用地'
            this.totalList = data
          } else {
            this.loading = false
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    close () {
      this.searchResult = false
    },
    showProjectInfo (res) {
      this.detail = true
      this.projectInfo = this.$cloneDeep(res)
    }

  },
  created () {
    this.getList()
  },

  mounted () {
    this.$bus.$on('sendCityInfo', res => {
      this.SET_locationCity(res.zhCn)
      if (res.children.length === 0) {
        this.SET_area({
          cantonProvince: '440000',
          cantonCity: res.parentId,
          cantonArea: res.id
        })
      } else if (res.parentId === '440000') {
        this.SET_area({
          cantonProvince: '440000',
          cantonCity: res.id,
          cantonArea: ''
        })
      } else {
        this.SET_area({
          cantonProvince: '440000',
          cantonCity: '',
          cantonArea: ''
        })
      }
    })
  },

  computed: {
    ...mapState('jcpgyj', ['year', 'area', 'locationCity'])

  },
  beforeRouteLeave (to, from, next) {
    this.fullPath = to.path
    if (this.fullPath !== '/TableList') {
      this.SET_year('2019')
    }
    next()
  }

}
</script>

<style scoped>
@import "../../onemap/toolbarItem/style.css";

.body__left {
  width: 400px;
  height: 100%;
  background-color: #fff;
  padding: 16px 18px;
  z-index: 10;
  box-shadow: 3px 0px 3px -2px rgba(172, 172, 172, 0.5);
}

.page__body {
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 16px;
  background: #f7f7f7;
  display: flex;
  padding: 16px 24px;
}

.page__body .el-row {
  margin-bottom: 0;
}
.body__right {
  width: calc(100% - 400px);
  height: calc(100% - 40px);
  position: relative;
  z-index: 2;
}
.body__right-fullCreen {
  width: calc(100%);
  height: calc(100% - 40px);
}
.left__title {
  font-size: 18px;
  font-weight: 700;
  padding-left: 7px;
}
.list__contain {
  width: 30%;
  height: 100%;
  position: absolute;
  left: 10px;
  top: 10px;
}

.list__contain .el-row {
  margin-bottom: 0;
}
.icon-mode_contain {
  width: 100%;
  font-size: 16px;

  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  border-radius: 7px;
  background: #fff;
  padding: 5px 10px;
}

.detailList {
  width: 100%;
  font-size: 16px;

  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  border-radius: 7px;
  background: #fff;
  padding: 5px 10px;
}

.row__title {
  width: 46%;
  text-align: right;
}
.begin {
  color: rgba(64, 64, 64, 1);
}

.unit {
  color: rgba(205, 205, 205, 1);
  font-size: 14px;
}
.list-row {
  color: rgba(80, 165, 244, 1);
  line-height: 20px;
  padding: 6px 8px;
  margin-top: 4px;
  cursor: pointer;
}

.list-row.active {
  background: rgba(244, 250, 255, 1);
  border-radius: 2px;
}
.list-row.active:hover {
  background: rgba(27, 116, 238, 1);
  color: #fff;
}

.num {
  color: rgba(157, 211, 28, 1);
  font-size: 18px;
}
.explorer {
  margin-left: 10px;
}
.row__contain {
  cursor: pointer;
}
.row__contain > .el-row {
  margin-top: 5px;
}
.row__contain > .el-row:hover,
.row__contain > .el-row:hover div,
.row__contain > .el-row:hover span {
  color: rgba(82, 144, 242, 1);
}
.button {
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 2px;
}
.detail-Info {
  width: 27%;
  height: 90%;
  padding: 5px 10px;
  position: absolute;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  border-radius: 7px;
  background: #fff;
  left: 10px;
  top: 10px;
  font-size: 16px;
}
.detail-Info .epf-title__wrapper {
  margin: 10px 0;
}

.detail-Info .space__title {
  margin-left: 14px;
}

.detail-Info > .el-row {
  margin-top: 5px;
  margin-bottom: 0;
}
.address {
  font-size: 20px;
  font-weight: 700;
}

.unit__row {
  padding: 5px 0;

  display: flex;
  align-items: center;
}
.icon {
  margin-left: auto;
  font-size: 20px;
}
.unit__title {
  margin-left: 18px;
}

.searchVue {
  width: 456px;
  height: 416px;
  position: absolute;
  left: 40%;
  top: 25%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 7px;
  border: 1px solid rgba(213, 213, 213, 1);
  padding: 16px;
}
.icon__text {
  line-height: 21px;
  font-size: 16px;
  margin-bottom: 8px;
}
.icon__text > span:nth-child(1) {
  color: rgba(64, 64, 64, 1);
}

.icon__text > span:nth-child(2) {
  color: rgba(112, 112, 112, 1);
}

.projectButton {
  background: rgba(233, 243, 255, 1);
  color: rgba(43, 149, 247, 1);
}
.projectButton2 {
  background: rgba(43, 149, 247, 1);
  color: rgba(255, 255, 255, 1);
}

.middle-middle-message-box {
  width: 40px;
  height: 40px;
  position: absolute;

  cursor: pointer;
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
}
.middle-middle-message-boxL {
  background-image: url("../../../../assets/images/jcpgyj/right.png");
  background-size: 40px 40px;
  top: 56px;
  left: 24px;
}
.middle-middle-message-boxR {
  background-image: url("../../../../assets/images/jcpgyj/left.png");
  background-size: 40px 40px;
  top: 40px;
  left: 0;
}
/* .detail-Info .el-scrollbar {
  height: 100%;
} */
.tb-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("../../../../assets/images/jcpgyj/project/tubiao.png");
  background-size: 24px 24px;
  margin: 0px 5px;
}
.left-enter-active,
.left-leave-active {
  transition: all 0.2s ease;
  transform: translateX(0%);
}
.left-enter,
.left-leave {
  transform: translateX(-100%);
}
.left-leave-to {
  transform: translateX(-100%);
}
</style>
<style>
@import "../monitoring-project-stock/icon-Mode/index.css";
</style>
