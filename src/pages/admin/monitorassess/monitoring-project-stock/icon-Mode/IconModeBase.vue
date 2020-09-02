<template>
  <div class="page__body zebra">
    <!-- <div>
      <el-collapse-transition>
        <div v-show="show3">
          <div class="transition-box">el-collapse-transition</div>
          <div class="transition-box">el-collapse-transition</div>
        </div>
      </el-collapse-transition>
    </div>-->

    <transition name="left">

      <div class="body__left"
           v-show="show">

        <el-scrollbar style="height:100%">

          <div v-if="!detail">
            <el-row justify="space-between"
                    type="flex"
                    class="left__title">
              <span>存量盘活-全省</span>

              <span>
                <el-dropdown @command="handleCommand"
                             trigger="click"
                             style="margin-left:15px;">
                  <span class="el-dropdown-link">
                    {{this.activeYear}}年
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="2020年">2020年</el-dropdown-item>
                    <el-dropdown-item command="2019年">2019年</el-dropdown-item>
                    <el-dropdown-item command="2018年">2018年</el-dropdown-item>
                    <el-dropdown-item command="2017年">2017年</el-dropdown-item>
                    <el-dropdown-item command="2016年">2016年</el-dropdown-item>
                    <el-dropdown-item command="2015年">2015年</el-dropdown-item>
                    <el-dropdown-item command="2014年">2014年</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </el-row>
            <el-row justify="space-between"
                    v-for="(item,index) in totalList "
                    :key="index"
                    type="flex"
                    @click.native="toDetail(item)"
                    class="list-row"
                    :class="{'active':index!==0&&index!==4}">
              <div class="row__title"
                   :class="{'begin':index===0||index===4}">
                <span>{{item.name}} （{{activeYear}}）</span>
              </div>

              <div>
                <span :class="{'num':index===0||index===4}">{{item.indexValueDouble}}</span>
                <span style="font-size:14px"
                      :class="{'unit':index===0||index===4}">{{item.unit}}</span>
              </div>
            </el-row>

            <div v-if="detailCanShow">
              <div class="icon__header">
                <epf-title :title="itemData.name"></epf-title>
              </div>

              <el-row type="flex"
                      justify="middle">
                <el-col :span="19">
                  <el-input v-model="input"
                            placeholder="请输入内容"
                            :maxlength="50"></el-input>
                </el-col>
                <el-col :span="4"
                        :offset="1">
                  <div class="EPFplain button">
                    搜索
                  </div>
                </el-col>

              </el-row>
              <el-table :data="data"
                        style="width: 100%;margin-top:16px"
                        stripe>
                <el-table-column label="项目名称"
                                 min-width="160"
                                 prop="BZXMMC">
                  <template slot-scope="scope">
                    <span @click="detailShow(scope.row)"
                          style="cursor:pointer">{{ scope.row.BZXMMC }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="占用面积"
                                 min-width="100"
                                 align="center"
                                 prop="BZTBMJ">
                  <template slot-scope="scope">
                    <span @click="detailShow(scope.row)"
                          style="color:rgba(89,89,89,1)">{{ scope.row.BZTBMJ.toFixed(2) }}</span>
                  </template>
                </el-table-column>>
              </el-table>

              <div style="text-align:right;margin:8px 0px;margin-top:15px;">
                <!-- <el-pagination small
                               layout="prev, pager, next"
                               :total="50"></el-pagination> -->
                <el-pagination background
                               layout="prev, pager, next"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :total="totalRecord"
                               :current-page.sync="currentPage"
                               :page-size="pageSize"></el-pagination>
              </div>
            </div>
          </div>

          <div v-if="detail">
            <div class="icon__header">
              <span class="address">广东省项目详细信息</span>
            </div>
            <epf-title title="项目基本信息"></epf-title>

            <div class="icon__text">
              <span>项目名称：</span>

              <span>{{projectInfo.BZXMMC}}</span>
            </div>
            <div class="icon__text">
              <span>项目类型：</span>

              <span>{{projectInfo.BZXMLX}}</span>
            </div>
            <div class="icon__text">
              <span>地块面积：</span>

              <span>{{projectInfo.BZXMMC}}</span>
            </div>

            <div class="icon__text">
              <span>所属区域：</span>

              <span>{{projectInfo.XZQMC}}</span>
            </div>

            <div class="icon__text">
              <span>占用耕地面积：</span>

              <span>{{projectInfo.BZZYGDMJ}}</span>
            </div>

            <div class="icon__text">
              <span>占用耕地面积：</span>

              <span>{{projectInfo.BZZYGDMJ}}</span>
            </div>
            <epf-title title="项目批文信息"></epf-title>

            <div class="icon__text">
              <span>批准时间：</span>

              <span>{{projectInfo.BZPZRQ}}</span>
            </div>

            <div class="icon__text">
              <span>批准文号：</span>

              <span>{{projectInfo.BZPZWH}}</span>
            </div>

            <div class="icon__text">
              <span>变更后权属：</span>

              <span>{{projectInfo.BZPZWH}}</span>
            </div>

            <el-row style="text-align:right;margin-top:30px">
              <div class="EPFButton projectButton"
                   @click="detail=false">返回列表</div>
              <div class="EPFButton projectButton2"
                   @click="searchVue=true">空间查询</div>
            </el-row>
          </div>
        </el-scrollbar>
      </div>
    </transition>

    <div :class="show?'body__right':'body__right-fullCreen'">
      <el-row type="flex"
              justify="end"
              style="height:40px;padding-right:16px"
              align="middle">
        <span @click="full()"
              style="cursor: pointer;display: flex;align-items: center;">
          <i class="tb-icon"></i>图表模式
        </span>
      </el-row>

      <div @click="checkProjectMenu"
           class="middle-middle-message-box"
           :class="{
            'middle-middle-message-boxR': show,
            'middle-middle-message-boxL': !show
          }"></div>
      <epf-mapview :delay="10"
                   name="IconModeBase"
                   @viewLoaded="getLoad"
                   class="epf-mapview__custom">
        <div class="toolbar">
          <jumpto style="margin: 0px;"></jumpto>
          <zoom></zoom>
          <layerlist></layerlist>
          <basemap></basemap>
        </div>
        <city-location></city-location>
      </epf-mapview>
    </div>
    <div v-if="searchVue"
         class="searchVue"
         v-drag>
      <div class="icon__header">
        <span class="address">选择查询图层</span>
        <span class="explorer">可多选</span>
        <i class="el-icon-close icon"
           @click="searchVue=false"
           style="cursor:pointer"></i>
      </div>

      <div style="height:70%">
        <el-scrollbar style="height:100%">
          <div class="content">
            <div style="margin-left:18px">图层列表</div>
            <div style="margin-left:100px">
              <div v-for="(item,index) in pictureList"
                   :key="index">{{item.name}}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <el-row style="text-align:center;margin-top:30px">
        <div class="EPFButton EFPcommon"
             @click="searchVue=false">取消</div>
        <div class="EPFButton EPFActive"
             @click="searchResult=true;searchVue=false">确定</div>
      </el-row>
    </div>

    <result v-if="searchResult"
            @closeDialog="close()"></result>
  </div>
</template>

<script>
import result from './Result'
import gisMixin from '../../mixins/gis'
import { mapActions, mapState, mapMutations } from 'vuex'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  components: {
    result,
    layerlist: () => import("@/pages/admin/onemap/toolbarItem/layerlist"),
    basemap: () => import("@/pages/admin/onemap/toolbarItem/basemap"),
  },
  mixins: [gisMixin],
  props: {
    year: {
      type: String,
      default: '2019年'
    }
  },
  data () {
    return {
      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 0,
      totalRecord: 4129,
      layerUrl: 'http://19.15.73.111/arcgisserver12/rest/services/存量用地/PTBBZ_2014/MapServer',
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
      projectInfo: {}
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    getLoad () {
      const layerConf = {
        title: '存量用地',
        url: 'http://19.15.73.111/arcgisserver12/rest/services/存量用地/PTBBZ_2014/MapServer',
        type: 'wmts', // type: "feature",
        useProxy: false,
        id: '存量用地'
      }
      const mapApp = this.$findMapApp("IconModeBase")
      this.$addLayerToMap({ mapApp: mapApp }, layerConf)
    },
    full () {
      let title = '存量盘活地图模式'
      let routerPath = 'StockIndex'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        name: 'StockIndex'
        // params: {
        //   year: this.listYear.substring(0, 4)
        // }
      })
      this.$router.push('/StockIndex')
    },

    checkProjectMenu () {
      this.show = !this.show
    },
    pushList () {
      this.$emit('open')
    },
    toDetail (item) {
      this.itemData = item
      this.detailCanShow = true
      //图层数据接入
      const me = this
      const objectIds = this.createObjectIds()
      this.getDataFromGISService(objectIds).then(res => {
        me.data = [];
        for (let i = 0; i < res.length; i++) {
          me.data.push(res[i].properties)
        }
      })
    },
    getList (val) {
      let params = this.params
      params['year'] = this.activeYear
      params = Object.assign(params, this.dicKey)
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
    },
    handleCommand (command) {
      this.activeYear = command.replace(/[^0-9]/gi, '')
      this.getList()
    },
    getDataFromGISService (objectIds) {
      const me = this
      const mapApp = this.$findMapApp("IconModeBase")
      if (!mapApp) return
      return new Promise(resolve => {
        mapApp.getQueryResult(this.layerUrl + '/0/query', null, [{ key: 'objectIds', val: objectIds }]).then(res => {
          console.log("resstocklist")
          me.totalRecord = 4129
          me.totalPage = Math.ceil((me.totalRecord * 1) / (me.pageSize * 1))
          // if (!me.gisQueryData) {
          //   me.gisQueryData = res.data
          // } else {
          //   me.gisQueryData.features = [...me.gisQueryData.features, ...res.data.features]
          // }
          var features = me.$cloneDeep(res.data.features)
          resolve(features)
        })
      })
    },
    pushDataList () {
      const me = this
      const objectIds = this.createObjectIds()
      this.getDataFromGISService(objectIds).then(res => {
        //me.gisData = res
        me.data = []
        for (let i = 0; i < res.length; i++) {
          me.data.push(res[i].properties)
        }
      })
    },
    createObjectIds () {
      let objectIds = ''
      for (
        let i = (this.pageNo - 1) * this.pageSize + 1;
        i <= this.pageNo * this.pageSize;
        i++
      ) {
        objectIds += i + ','
      }
      objectIds = objectIds.substring(0, objectIds.length - 1)
      return objectIds
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      //this.getIndexData()
      this.pushDataList()
    },
    detailShow (item) {
      this.detail = true;
      this.projectInfo = item;
    },
  },
  created () {
    this.getList()
  },

  mounted () {
    this.$bus.$on('sendCityInfo', res => {
      this.activeCity = res.zhCn
      if (res.children.length === 0) {
        this.dicKey = {
          province: '440000',
          city: res.parentId,
          area: res.id
        }
      } else if (res.parentId === '440000') {
        this.dicKey = {
          province: '440000',
          city: res.id,
          area: ''
        }
      } else {
        this.dicKey = {
          province: '440000',
          city: '',
          area: ''
        }
      }
    })
  },
  watch: {

    dicKey: {
      handler (newName, oldName) {
        this.getList()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
@import "../../../onemap/toolbarItem/style.css";

.body__left {
  width: 400px;
  height: 100%;
  background-color: #fff;
  padding: 16px 24px;
}

.page__body {
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 16px;
  display: flex;
}

.page__body .el-row {
  margin-bottom: 0;
}
.body__right {
  width: calc(100% - 400px);
  height: calc(100% - 40px);
  position: relative;
}
.body__right-fullCreen {
  width: calc(100%);
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
  top: 40px;
  left: 0;
  cursor: pointer;
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
  z-index: 99;
}
.middle-middle-message-boxL {
  background-image: url("../../../../../assets/images/jcpgyj/right.png");
  background-size: 40px 40px;
}
.middle-middle-message-boxR {
  background-image: url("../../../../../assets/images/jcpgyj/left.png");
  background-size: 40px 40px;
}
/* .detail-Info .el-scrollbar {
  height: 100%;
} */
.tb-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("../../../../../assets/images/jcpgyj/project/tubiao.png");
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
@import "./index.css";
</style>
