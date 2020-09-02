<template>
  <div style="font-size:16px;padding:0 6px">
    <el-row justify="space-between"
            type="flex"
            class="left__title">
      <span>三线管控</span>

      <span style="margin-left:auto">
        <el-select size="mini"
                   v-model="year"
                   filterable
                   @change="handleChangeYear"
                   style="width:90px;">
          <el-option v-for="item in yearList"
                     :key="item"
                     :label="item"
                     :value="item"></el-option>
        </el-select>
      </span>
    </el-row>

    <div :class="['monitor-item',{'acitve':isCurrent===item.title}]"
         v-for="(item, index) in moItems"
         :key="index"
         ref="item"
         @click="goBack(item, index)">
      <div class="item-title">
        <div class="moItemTitle">{{item.name}}</div>

        <p style="margin-top:15px">
          <span class="curVal"
                ref="curVal">{{item.indexValueDouble}}</span>
          <span class="moUnit">{{item.unit}}</span>
        </p>
      </div>
      <div class="item-content">
        <div @click.stop="handleMoItemClick(item,1,index)"
             class="sliding">划定详情</div>

        <div @click.stop="handleMoItemClick(item,2, index)"
             class="change">变化监测</div>
      </div>
    </div>

  </div>
</template>

<script>
import {MAPSERVICE} from '../mixins/mock'
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'ThreeLine',

  data () {
    return {
      activeName: '1',
      fullPath: '',
      // tabs:['城镇建设','农业耕作'],
      data: [],
      zoomIn: '缩小',
      loading1: false,
      num: 0,
      yearList: [2020, 2019, 2018, 2017, 2016, 2015, 2014],
      isHide: true,
      childrenData: {
        content: '',
        tableData: [],
        makepeace: false,
        tableTitle: []
      },

      currentRouter: '',
      loadEndRouter: [],
      routerData: [],
      routerIndex: null,
      forward: true,
      select2: [],
      select1: [],
      urlParams: [
        'PERMANENT_BASIC_FARMLAND',
        'ECOLOGICAL_PROTECTION_RED_LINE',
        'TOWN_DEVELOPMENT_BORDER'
      ],
      threeData: [],

      locName: '广东省',
      locOpt: [],

      moUnit: '万亩',
      moItems: [
        {
          name: '永久基本农田保护',
          indexValueDouble: '--', // 当前值
          planValueDouble: '--',
          unit: '公顷' // 规划目标值
        },
        {
          name: '生态保护红线面积',
          indexValueDouble: '--', // 当前值
          planValueDouble: '--',
          unit: '万亩'
        },
        {
          name: '城镇开发边界',
          indexValueDouble: '--', // 当前值
          planValueDouble: '--',
          unit: '公顷'
        }
      ],
      isChartsPanelShow: false,
      cityData: {},
      isActive: false,
      widgetConf: {
        widgets: []
      },
      isCurrent: '',
      isButton: '1',
      isact:[true,false,false]
    }
  },

  methods: {
    ...mapActions(['setTabsList']),
    ...mapMutations('jcpgyj', ['SET_year', 'SET_area']),
    handleChangeYear (command) {
      this.SET_year(command)
    },
    goBack(item, index){     
      var obj = [];
      if(item.name=="永久基本农田保护"){
        obj = MAPSERVICE["永久基本农田保护红线"]
      }else if(item.name=="生态保护红线面积"){
        obj = MAPSERVICE["生态保护红线"]
      }else if(item.name=="城镇开发边界"){
        obj = MAPSERVICE["城镇开发边界控制线"]
      }
      this.isact[index] = !this.isact[index]
      this.loadLayer(obj,this.isact[index])
    },
    loadLayer(obj,bol){
      if (obj.url == '') return
      if (!obj) return
      const layerConf = {
        title: obj.title || '',
        url: obj.url || '',
        type: obj.type || 'feature', // type: "feature",
        useProxy: obj.useProxy || false,
        id: obj.title || ''        
      }
      
      const mapApp = this.$findMapApp("threeLine")
      const layer = mapApp.findLayerById(layerConf.id)
      if (bol) {
        if (!layer) {
          this.$addLayerToMap({ mapApp: mapApp }, layerConf)
          //mapApp.addLayerToMap(layerConf)
        }       
      } 
      if (layer) {
        layer.visible = bol;
        // mapApp.setLayerVisiblity(layerConf.id, bol)
      }
    },
    handleMoItemClick (item, key, index) {
      switch (key) {
        case 1:

          this.$router.push({
            path: `/TableList?index=${index}`,
            query: item
          })
          break
        case 2:
          this.$router.push({
            path: `/DetailList?index=${index}`,
            query: item
          })
      }
    },

    isWarning ({ _, curVal, expVal }) {
      return curVal >= expVal
    },
    monitor () { },
    detail () { },
    hidingChartPanel () {
      this.isChartsPanelShow = false
    },
    bgimgData (imgName) {
      let src
      if (imgName === 'hide') {
        src = require('@/assets/images/jcpgyj/hide-button.png')
      } else if (imgName === 'flag') {
        src = require('@/assets/images/jcpgyj/warning-flag.png')
      }
      return {
        backgroundImage: 'url(' + src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }
    },
    async threeDetectionAndPlan (item, k) {
      let params = {
        year: this.year,
        threeLineEnum: item
      }
      params = Object.assign(params, this.area)
      const res = await axios.get(
        '/api/epf-monitor-evaluation/threeLine/detectionAndPlan',
        {
          params: params
        }
      )

      let result = res.result
      let data = {}
      if (!result.length) {
        switch (k) {
          case 0:
            data.name = '永久基本农田保护'
            data.unit = '公顷'
            break
          case 1:
            data.name = '生态保护红线面积'
            data.unit = '万亩'
            break
          case 2:
            data.name = '城镇开发边界'
            data.unit = '公顷'
            break
        }
        data.indexValueDouble = '--'
        data.planValueDouble = '--'
        this.$set(this.moItems, k, data)
      } else {
        data = result[0]
        data.indexValueDouble = this.$math(data.indexValueDouble)
        data.planValueDouble = this.$math(data.planValueDouble)
        this.$set(this.moItems, k, data)
      }
    }
  },
  computed: {
    ...mapState('jcpgyj', ['year', 'area'])

  },
  components: {},
  created () {
    for (var k = 0; k < this.urlParams.length; k++) {
      this.threeDetectionAndPlan(this.urlParams[k], k)
    }
  },
  watch: {
    year (val) {
      for (var k = 0; k < this.urlParams.length; k++) {
        this.threeDetectionAndPlan(this.urlParams[k], k)
      }
    },
    $route (to, from) {
      this.fullPath = to.path
      console.log(this.fullPath)
    },
    area: {
      handler (newName, oldName) {
        for (var k = 0; k < this.urlParams.length; k++) {
          this.threeDetectionAndPlan(this.urlParams[k], k)
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      deep: true

    }
  },
  mounted () {
    // this.$bus.$on('sendCityInfo', res => {
    //   if (res.children.length === 0) {
    //     this.SET_area({
    //       cantonProvince: '440000',
    //       cantonCity: res.parentId,
    //       cantonArea: res.id
    //     })
    //   } else if (res.parentId === '440000') {
    //     this.SET_area({
    //       cantonProvince: '440000',
    //       cantonCity: res.id,
    //       cantonArea: ''
    //     })
    //   } else {
    //     this.SET_area({
    //       cantonProvince: '440000',
    //       cantonCity: '',
    //       cantonArea: ''
    //     })
    //   }
    // })
  }
}
</script>
<style scoped>
.left__title {
  font-size: 18px;
  font-weight: 700;
  padding-left: 7px;
}

.main {
  position: relative;
  background: #e9eef3;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}

.aside {
  padding: 15px;

  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.epf-block__zoom {
  display: flex;
  align-items: center;
}

#sun {
  width: 400px;
  height: 400px;
}

.button-list {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}

.aside >>> .el-collapse {
  border: unset;
  overflow: hidden;
}

.monitor-moudle >>> .el-collapse-item__header,
.monitor-moudle >>> .el-collapse-item__header.is-active {
  margin-left: 20px;
  font-size: 16px;
  border: none;
}

.monitor-item {
  border-radius: 2px;
  background: rgba(250, 250, 250, 1);
  color: rgba(32, 32, 32, 1);
  box-shadow: rgba(0, 0, 0, 0.25) 1px 3px 6px 0px;
  border: 1px solid transparent;
  margin-top: 15px;
  cursor: pointer;
  display: flex;
  height: 91px;
}
.item-title {
  padding: 15px;
  flex: 3;
  border-right: 1px solid rgba(236, 236, 236, 1);
}

.item-content {
  height: 100%;
  flex: 1;
  background: #fff;
  padding: 0 6px;
}
.item-content > div {
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: rgba(80, 165, 244, 1);
}

.monitor-item:hover {
  border: 1px solid rgba(27, 116, 238, 1);
  background: #f4faff;
}
.monitor-item .curVal {
  font-size: 20px;

  color: rgba(255, 162, 0, 1);
}

.monitor-item .curVal.acitve {
  color: #fff;
}
.moUnit {
  font-size: 16px;
  color: rgba(112, 112, 112, 1);
}
.monitor-item .expVal {
  font-size: 18px;

  font-weight: bold;
}

.monitor-item .moItemTitle {
  font-weight: bold;
  font-size: 16px;
  color: #000;
}

.monitor-item .is-warning {
  position: absolute;
  right: 10px;
  top: 0px;
  width: 40px;
  height: 50px;
  text-align: center;
  color: #fff;
}
.sliding {
  border-bottom: 1px solid rgba(236, 236, 236, 1);
}
.flag {
  height: 53px;
  width: 42px;
  position: absolute;
}

.hide-button {
  height: 25px;
  width: 25px;
  position: absolute;
  right: 15px;
  top: 10px;
}
.title-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.monitor-item .is-warning .warning-text {
  margin-top: 10px;
}
.title-line {
  width: 6px;
  height: 24px;
  display: block;
  background-color: #50b8ef;
  margin-right: 10px;
}
.title-text {
  color: #202020;
  font-size: 18px;
}

.monitor-list .el-col-12 {
  text-align: center;
}
.monitor-list .el-col-12 div {
  padding: 5px 0;
  cursor: pointer;
}

.block__footer {
  background-color: #eeeeee;
  border-top: #c6c6c6;
}
.epf-flex__align {
  display: flex;
  align-items: center;
  background: rgba(29, 124, 228, 1);
  font-size: 18px;
  color: #fff;
  height: 50px !important;
}
</style>
<style>
.monitor-moudle .el-collapse-item__wrap {
  border-bottom: none;
}
</style>
