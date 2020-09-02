<template>
  <div class="page-body EPF-table"
       id="dtIndexBox">
    <div class="indexTitleBox">
      <div class="indexCheck">
        <el-cascader size="small"
                     style="margin:0 20px;width:220px;"
                     :props="props"
                     clearable
                     v-model="areaSelectedOptions"
                     @change="areaSelect()"></el-cascader>
        <el-select v-model="unitsVal"
                   placeholder="全部"
                   size="small"
                   style="margin-right:20px;width:100px;"
                   @change="unitNameSelect()">
          <el-option v-for="item in units"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <el-button type="primary"
                   size="small"
                   style="margin-right:10px;width:130px;height:40px">导出监测报告</el-button>

        <!-- <el-select v-model="selectscopeVal" placeholder="前五">
              <el-option
                v-for="item in selectscope"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
        </el-select>-->
      </div>
      <div class="indexImage">
        <img :src="
            this.current == 0
              ? require('@/assets/images/jcpgyj/index01.png')
              : require('@/assets/images/jcpgyj/index0101.png')
          "
             alt
             style="width:46px;height:36px;margin-right:20px;cursor:pointer;"
             @click="getTableData" />
        <img :src="
            this.current == 1
              ? require('@/assets/images/jcpgyj/index0202.png')
              : require('@/assets/images/jcpgyj/index02.png')
          "
             alt
             style="width:42px;height:36px;cursor:pointer;"
             @click="getChartData" />
      </div>
    </div>

    <div class="filterWrap">
      <!-- 左边部分 -->
      <div class="filter_wrap"
           id="filter_wrap0">
        <div style="width:100%;height:90%;"
             v-show="this.current == 0">
          <div class="unitTip">{{ this.unitName }}</div>
          <!-- 查看评估报告 -->
          <el-table :data="
              reportData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    max-height="500"
                    style="width: 100%;min-height:80px;"
                    border>
            <!-- <el-table-column label="序号"
                             min-width="100px"
                             align="center">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>-->
            <el-table-column prop="data1"
                             label="行政区"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="data2"
                             label="水田面积"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="data3"
                             label="水田面积排名"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="data4"
                             label="水田占耕地面积的比例"
                             min-width="220"
                             align="center">
              <template slot-scope="scope">{{ scope.row.data4 }}%</template>
            </el-table-column>
            <el-table-column prop="data5"
                             label="水田占耕地面积的比例排名"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="data6"
                             label="水浇地"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="data7"
                             label="水浇地排名"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="data8"
                             label="水浇地占耕地面积的比例"
                             min-width="220"
                             align="center">
              <template slot-scope="scope">{{ scope.row.data8 }}%</template>
            </el-table-column>
            <el-table-column prop="data9"
                             label="旱地"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="data10"
                             label="旱地排名"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="data11"
                             label="旱地占耕地面积的比例"
                             min-width="220"
                             align="center">
              <template slot-scope="scope">{{ scope.row.data11 }}%</template>
            </el-table-column>
            <el-table-column prop="data12"
                             label="旱地占耕地面积的比例排名"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="data13"
                             label="耕地"
                             min-width="140"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#02aff4;">{{ scope.row.data13 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="data14"
                             label="耕地排名"
                             min-width="140"
                             align="center"></el-table-column>
            <el-table-column prop="data15"
                             label="可调整地类面积"
                             min-width="220"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#02aff4;">{{ scope.row.data15 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="data16"
                             label="可调整地类面积排名"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="data17"
                             label="耕地保有量现状"
                             min-width="220"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#02aff4;">{{ scope.row.data17 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="data18"
                             label="耕地保有量现状排名"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="data19"
                             label="耕地保有量现状（含全部可调整地类）"
                             min-width="320"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#02aff4;">{{ scope.row.data19 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="data20"
                             label="耕地保有量现状（含全部可调整地类）排名"
                             min-width="320"
                             align="center"></el-table-column>
            <el-table-column prop="data21"
                             label="耕地保有量现状（含带K园地和带K坑塘）"
                             min-width="320"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#02aff4;">{{ scope.row.data21 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="data22"
                             label="耕地保有量现状（含带K园地和带K坑塘）排名"
                             min-width="320"
                             align="center"></el-table-column>
            <el-table-column prop="data23"
                             label="耕地保有量规划指标"
                             min-width="220"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#02aff4;">{{ scope.row.data23 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="data24"
                             label="耕地保有量规划指标排名"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="data25"
                             label="耕地保有量指标完成情况"
                             min-width="220"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#02aff4;">{{ scope.row.data25 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="data26"
                             label="耕地保有量指标完成情况排名"
                             min-width="220"
                             align="center"></el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5, 10, 15, 20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="this.reportData.length"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </div>
        <div style="width:100%;height:100%;"
             v-show="this.current == 1">
          <!-- <div class="exchangeTable">
                <columns :option="mainChartOption" id="chart-main-cjfk" ref="mainchart"></columns>
          </div>-->
          <div id="monitorChart"
               style="width:100%;height:100%;"></div>
        </div>
        <!-- <columns
          :option="timelineOption"
          id="chart-timeline-cjfk"
          width="1290px"
          height="100px"
          type="timeline"
        ></columns>-->
        <div id="chart-timeline-cjfk"
             class="chart-timebox"></div>
      </div>
      <!-- 右边部分 -->
      <div class="filterWrapRight">
        <!-- <customMenu :message="jcpgyjindex"></customMenu> -->
        <div style="padding:0 15px;">
          <el-input placeholder="输入关键字查询"
                    prefix-icon="el-icon-search"
                    v-model="inquire"
                    style="font-size:16px;"
                    :maxlength="50"></el-input>
        </div>
        <div style="margin-top:20px"
             class="filterWrapRight-menu">
          <el-menu default-active="2"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i>
                  <img src="@/assets/icon3.png"
                       alt />
                </i>
                <span>安全国土</span>
                <span>(14)</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">耕地保有量</el-menu-item>
                <el-menu-item index="1-2">永久基本农田保护面积</el-menu-item>
                <el-menu-item index="1-3">高标准农田假设面积</el-menu-item>
                <el-menu-item index="1-4">生态保护红线面积</el-menu-item>
                <el-menu-item index="1-5">用水强度</el-menu-item>
                <el-menu-item index="1-6">用水总量</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i>
                  <img src="@/assets/icon4.png"
                       alt />
                </i>
                <span>繁荣国土</span>
                <span>(6)</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">城乡建设用地规模</el-menu-item>
                <el-menu-item index="2-2">城镇建设用地规模</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i>
                  <img src="@/assets/icon5.png"
                       alt />
                </i>
                <span>美丽国土</span>
                <span>(5)</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">自然保护地面积</el-menu-item>
                <el-menu-item index="3-2">新增国土修复面积</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i>
                  <img src="@/assets/icon6.png"
                       alt />
                </i>
                <span>和谐国土</span>
                <span>(9)</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">都市圈内城镇一小时可达性</el-menu-item>
                <el-menu-item index="4-2">人地匹配度</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XZQH, UNINTS, SELECT } from '../base/buttons/options'
import {
  TIMELINEOPTION,
  MAINCHARTOPTION,
  CUSTOMOPTION,
  tableData
} from '../mock'
import customMenu from '../base/jcpgyj-menu'
import columns from '../dynamic/columns'
import { mapGetters } from 'vuex'
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import qs from 'qs'
import echarts from 'echarts'
import Bus from '../../../../utils/bus'
export default {
  name: 'ylgmtz',
  componentName: '预留规模台账',
  components: {
    customMenu,
    columns
  },
  data () {
    return {
      timelineChart: null,
      arrTime: null,
      selectedYear: '2019',
      option: null,
      timelineOption: null,
      mainChartOption: {},
      xzqh: null,
      units: null,
      selectscope: null,
      xzqhVal: '',
      unitsVal: 'HECTARE',
      danweiVal: '1',
      selectscopeVal: '',
      num: 0,
      inquire: '',
      produImg: [
        { src: require('@/assets/icon1.png') },
        { src: require('@/assets/icon2.png') }
      ],
      tableData: null,
      serviceType: null,

      ylgmtzList: [],

      areaSelectedOptions: ['440000'],
      props: {
        value: 'dictKey',
        label: 'zhCn',
        checkStrictly: true,
        expandTrigger: 'hover',
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level } = node
          if (level === 0) {
            const dictionariesList = [
              {
                zhCn: '广东省',
                id: '440000',
                parentId: '0',
                dictKey: '440000',
                dictValue: '440000'
              }
            ]
            return resolve(dictionariesList)
          }
          const res = await axios.get(
            `/api/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${node.data.dictKey}`
          )
          res.dictionariesList.forEach(item => (item.leaf = level >= 2))
          return resolve(res.dictionariesList)
        }
      },

      params: {
        yeaer: '2019', // 年份
        province: '440000', // 省
        city: '', // 市
        area: '', // 区
        unit: '' // 计量单位
      },
      nextparams: {
        year: '2019', // 年份
        province: '440000', // 省
        cityx: '', // 市
        unitType: '' // 计量单位
      },
      lastparams: {
        year: '', // 年份
        province: '440000', // 省
        city: '', // 市
        area: '', // 区
        unit: '' // 计量单位
      },
      loading: false,
      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      jcpgyjindex: '',
      current: 0,
      unitName: '',
      unitName2: '',

      changeCityList: [],
      reportData: [],
      reportArea: '',
      inquire: '',

      screenWidth: '',
      isShowMenu: ''
    }
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    window.addEventListener(
      'resize',
      () => {
        return (() => {
          this.screenWidth = document.body.clientWidth
        })()
      },
      0
    )
    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })

    this.$nextTick(function () {
      setTimeout(() => {
        this.initTimeline()
      }, 100)
    })
    if (this.current === 1) {
      this.$nextTick(function () {
        setTimeout(() => {
          this.ylgmtzDrawLine()
        }, 1000)
      })
      this.initEchart()
    }
  },
  computed: {
    ...mapGetters(['getCJFKServiceType'])
  },
  watch: {
    getCJFKServiceType: {
      immediate: true,
      handler: function (state) {
        this.serviceType = state
      }
    },

    unitsVal (val) {
      this.getYlgmtzList()
      this.ylgmtzDrawLine()
    },
    danweiVal (val) {
      this.getYlgmtzList()
      this.ylgmtzDrawLine()
    },
    jcpgyjindex (val) {
      console.log(val)
      if (val) {
        this.current = 0
        this.areaSelectedOptions = ['440000']
        this.unitsVal = 'HECTARE'
        this.danweiVal = '1'
        this.getYlgmtzList()
      }
    },
    current (val) {
      console.log(val)
      if (val == 0) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.getYlgmtzList()
          }, 1000)
        })
      } else if (val == 1) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.ylgmtzDrawLine()
          }, 1000)
        })
        this.initEchart()
      }
    },
    'params.province': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getYlgmtzList()
        this.ylgmtzDrawLine()

        // this.getCityNameList(440000);
      }
    },
    'params.city': {
      immediate: true,
      deep: true,
      handler (val) {
        this.getYlgmtzList()
        this.ylgmtzDrawLine()
      }
    },
    'params.area': {
      immediate: true,
      deep: true,
      handler (val) { }
    },
    screenWidth: {
      immediate: true,
      deep: true,
      handler (val) {
        this.createTimeline()
        this.initTimeline()
      }
    },
    isShowMenu: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.createTimeline()
            this.initTimeline()
            this.ylgmtzDrawLine()
          }, 0)
        })
      }
    },
    unitsVal: {
      immediate: true,
      deep: true,
      handler (val) {
        let reportData = []
        for (var i = 0; i < this.changeCityList.districtName.length; i++) {
          reportData.push({
            data1: this.changeCityList.districtName[i],
            data2: Math.round(Math.random() * 30000),
            data3: Math.round(Math.random() * 10),
            data4: Math.round(Math.random() * 30),
            data5: Math.round(Math.random() * 10),
            data6: Math.round(Math.random() * 30000),
            data7: Math.round(Math.random() * 10),
            data8: Math.round(Math.random() * 30),
            data9: Math.round(Math.random() * 30000),
            data10: Math.round(Math.random() * 10),
            data11: Math.round(Math.random() * 30),
            data12: Math.round(Math.random() * 10),
            data13: Math.round(Math.random() * 30000),
            data14: Math.round(Math.random() * 10),
            data15: Math.round(Math.random() * 30000),
            data16: Math.round(Math.random() * 10),
            data17: Math.round(Math.random() * 30000),
            data18: Math.round(Math.random() * 10),
            data19: Math.round(Math.random() * 30000),
            data20: Math.round(Math.random() * 10),
            data21: Math.round(Math.random() * 30000),
            data22: Math.round(Math.random() * 10),
            data23: Math.round(Math.random() * 30000),
            data24: Math.round(Math.random() * 10),
            data25: Math.round(Math.random() * 30000),
            data26: Math.round(Math.random() * 10)
          })
        }
        this.reportData = reportData
        this.ylgmtzDrawLine()
      }
    },

    areaSelectedOptions: {
      immediate: true,
      deep: true,
      handler: function (val) {
        console.log(val)
        this.$nextTick(() => {
          setTimeout(() => {
            if (val.length == 1) {
              this.getCityNameList(440000)
            } else if (val.length == 2) {
              this.getCityNameList(val[1])
            } else if (val.length == 3) {
              if (val[2] == '440103') {
                this.params.area = '440103'
                this.changeCityList.districtName = ['荔湾区']
              } else if (val[2] == '440104') {
                this.params.area = '440104'
                this.changeCityList.districtName = ['越秀区']
              } else if (val[2] == '440105') {
                this.params.area = '440105'
                this.changeCityList.districtName = ['海珠区']
              } else if (val[2] == '440106') {
                this.params.area = '440106'
                this.changeCityList.districtName = ['天河区']
              } else if (val[2] == '440111') {
                this.params.area = '440111'
                this.changeCityList.districtName = ['白云区']
              } else if (val[2] == '440112') {
                this.params.area = '440112'
                this.changeCityList.districtName = ['黄埔区']
              } else if (val[2] == '440113') {
                this.params.area = '440113'
                this.changeCityList.districtName = ['番禺区']
              } else if (val[2] == '440114') {
                this.params.area = '440114'
                this.changeCityList.districtName = ['花都区']
              } else if (val[2] == '440115') {
                this.params.area = '440115'
                this.changeCityList.districtName = ['南沙区']
              } else if (val[2] == '440117') {
                this.params.area = '440117'
                this.changeCityList.districtName = ['从化区']
              } else if (val[2] == '440118') {
                this.params.area = '440118'
                this.changeCityList.districtName = ['增城区']
              } else if (val[2] == '440203') {
                this.params.area = '440203'
                this.changeCityList.districtName = ['武江区']
              } else if (val[2] == '440204') {
                this.params.area = '440204'
                this.changeCityList.districtName = ['浈江区']
              } else if (val[2] == '440205') {
                this.params.area = '440205'
                this.changeCityList.districtName = ['曲江区']
              } else if (val[2] == '440222') {
                this.params.area = '440222'
                this.changeCityList.districtName = ['始兴县']
              } else if (val[2] == '440224') {
                this.params.area = '440224'
                this.changeCityList.districtName = ['仁化县']
              } else if (val[2] == '440229') {
                this.params.area = '440229'
                this.changeCityList.districtName = ['翁源县']
              } else if (val[2] == '440232') {
                this.params.area = '440232'
                this.changeCityList.districtName = ['乳源瑶族自治县']
              } else if (val[2] == '440233') {
                this.params.area = '440233'
                this.changeCityList.districtName = ['新丰县']
              } else if (val[2] == '440281') {
                this.params.area = '440281'
                this.changeCityList.districtName = ['乐昌市']
              } else if (val[2] == '440282') {
                this.params.area = '440282'
                this.changeCityList.districtName = ['南雄市']
              } else if (val[2] == '440303') {
                this.params.area = '440303'
                this.changeCityList.districtName = ['罗湖区']
              } else if (val[2] == '440304') {
                this.params.area = '440304'
                this.changeCityList.districtName = ['福田区']
              } else if (val[2] == '440305') {
                this.params.area = '440305'
                this.changeCityList.districtName = ['南山区']
              } else if (val[2] == '440306') {
                this.params.area = '440306'
                this.changeCityList.districtName = ['宝安区']
              } else if (val[2] == '440307') {
                this.params.area = '440307'
                this.changeCityList.districtName = ['龙岗区']
              } else if (val[2] == '440308') {
                this.params.area = '440308'
                this.changeCityList.districtName = ['盐田区']
              } else if (val[2] == '440309') {
                this.params.area = '440309'
                this.changeCityList.districtName = ['龙华区']
              } else if (val[2] == '440310') {
                this.params.area = '440310'
                this.changeCityList.districtName = ['坪山区']
              } else if (val[2] == '440311') {
                this.params.area = '440311'
                this.changeCityList.districtName = ['光明区']
              } else if (val[2] == '440402') {
                this.params.area = '440402'
                this.changeCityList.districtName = ['香洲区']
              } else if (val[2] == '440403') {
                this.params.area = '440403'
                this.changeCityList.districtName = ['斗门区']
              } else if (val[2] == '440404') {
                this.params.area = '440404'
                this.changeCityList.districtName = ['金湾区']
              } else if (val[2] == '440507') {
                this.params.area = '440507'
                this.changeCityList.districtName = ['龙湖区']
              } else if (val[2] == '440511') {
                this.params.area = '440511'
                this.changeCityList.districtName = ['金平区']
              } else if (val[2] == '440512') {
                this.params.area = '440512'
                this.changeCityList.districtName = ['濠江区']
              } else if (val[2] == '440513') {
                this.params.area = '440513'
                this.changeCityList.districtName = ['潮阳区']
              } else if (val[2] == '440514') {
                this.params.area = '440514'
                this.changeCityList.districtName = ['潮南区']
              } else if (val[2] == '440515') {
                this.params.area = '440515'
                this.changeCityList.districtName = ['澄海区']
              } else if (val[2] == '440523') {
                this.params.area = '440523'
                this.changeCityList.districtName = ['南澳县']
              } else if (val[2] == '440604') {
                this.params.area = '440604'
                this.changeCityList.districtName = ['禅城区']
              } else if (val[2] == '440605') {
                this.params.area = '440605'
                this.changeCityList.districtName = ['南海区']
              } else if (val[2] == '440606') {
                this.params.area = '440606'
                this.changeCityList.districtName = ['顺德区']
              } else if (val[2] == '440607') {
                this.params.area = '440607'
                this.changeCityList.districtName = ['三水区']
              } else if (val[2] == '440608') {
                this.params.area = '440608'
                this.changeCityList.districtName = ['高明区']
              } else if (val[2] == '440703') {
                this.params.area = '440703'
                this.changeCityList.districtName = ['蓬江区']
              } else if (val[2] == '440704') {
                this.params.area = '440704'
                this.changeCityList.districtName = ['江海区']
              } else if (val[2] == '440705') {
                this.params.area = '440705'
                this.changeCityList.districtName = ['新会区']
              } else if (val[2] == '440781') {
                this.params.area = '440781'
                this.changeCityList.districtName = ['台山市']
              } else if (val[2] == '440783') {
                this.params.area = '440783'
                this.changeCityList.districtName = ['开平市']
              } else if (val[2] == '440784') {
                this.params.area = '440784'
                this.changeCityList.districtName = ['鹤山市']
              } else if (val[2] == '440785') {
                this.params.area = '440785'
                this.changeCityList.districtName = ['恩平市']
              } else if (val[2] == '440802') {
                this.params.area = '440802'
                this.changeCityList.districtName = ['赤坎区']
              } else if (val[2] == '440803') {
                this.params.area = '440803'
                this.changeCityList.districtName = ['霞山区']
              } else if (val[2] == '440804') {
                this.params.area = '440804'
                this.changeCityList.districtName = ['坡头区']
              } else if (val[2] == '440811') {
                this.params.area = '440811'
                this.changeCityList.districtName = ['麻章区']
              } else if (val[2] == '440823') {
                this.params.area = '440823'
                this.changeCityList.districtName = ['遂溪县']
              } else if (val[2] == '440825') {
                this.params.area = '440825'
                this.changeCityList.districtName = ['徐闻县']
              } else if (val[2] == '440881') {
                this.params.area = '440881'
                this.changeCityList.districtName = ['廉江市']
              } else if (val[2] == '440882') {
                this.params.area = '440882'
                this.changeCityList.districtName = ['雷州市']
              } else if (val[2] == '440883') {
                this.params.area = '440883'
                this.changeCityList.districtName = ['吴川市']
              } else if (val[2] == '440902') {
                this.params.area = '440902'
                this.changeCityList.districtName = ['茂南区']
              } else if (val[2] == '440904') {
                this.params.area = '440904'
                this.changeCityList.districtName = ['电白区']
              } else if (val[2] == '440981') {
                this.params.area = '440981'
                this.changeCityList.districtName = ['高州市']
              } else if (val[2] == '440982') {
                this.params.area = '440982'
                this.changeCityList.districtName = ['化州市']
              } else if (val[2] == '440983') {
                this.params.area = '440983'
                this.changeCityList.districtName = ['信宜市']
              } else if (val[2] == '441202') {
                this.params.area = '441202'
                this.changeCityList.districtName = ['端州区']
              } else if (val[2] == '441203') {
                this.params.area = '441203'
                this.changeCityList.districtName = ['鼎湖区']
              } else if (val[2] == '441204') {
                this.params.area = '441204'
                this.changeCityList.districtName = ['高要区']
              } else if (val[2] == '441223') {
                this.params.area = '441223'
                this.changeCityList.districtName = ['广宁县']
              } else if (val[2] == '441224') {
                this.params.area = '441224'
                this.changeCityList.districtName = ['怀集县']
              } else if (val[2] == '441225') {
                this.params.area = '441225'
                this.changeCityList.districtName = ['封开县']
              } else if (val[2] == '441226') {
                this.params.area = '441226'
                this.changeCityList.districtName = ['德庆县']
              } else if (val[2] == '441284') {
                this.params.area = '441284'
                this.changeCityList.districtName = ['四会市']
              } else if (val[2] == '441302') {
                this.params.area = '441302'
                this.changeCityList.districtName = ['惠城区']
              } else if (val[2] == '441303') {
                this.params.area = '441303'
                this.changeCityList.districtName = ['惠阳区']
              } else if (val[2] == '441322') {
                this.params.area = '441322'
                this.changeCityList.districtName = ['博罗县']
              } else if (val[2] == '441323') {
                this.params.area = '441323'
                this.changeCityList.districtName = ['惠东县']
              } else if (val[2] == '441324') {
                this.params.area = '441324'
                this.changeCityList.districtName = ['龙门县']
              } else if (val[2] == '441402') {
                this.params.area = '441402'
                this.changeCityList.districtName = ['梅江区']
              } else if (val[2] == '441403') {
                this.params.area = '441403'
                this.changeCityList.districtName = ['梅县区']
              } else if (val[2] == '441422') {
                this.params.area = '441422'
                this.changeCityList.districtName = ['大埔县']
              } else if (val[2] == '441423') {
                this.params.area = '441423'
                this.changeCityList.districtName = ['丰顺县']
              } else if (val[2] == '441424') {
                this.params.area = '441424'
                this.changeCityList.districtName = ['五华县']
              } else if (val[2] == '441426') {
                this.params.area = '441426'
                this.changeCityList.districtName = ['平远县']
              } else if (val[2] == '441427') {
                this.params.area = '441427'
                this.changeCityList.districtName = ['蕉岭县']
              } else if (val[2] == '441481') {
                this.params.area = '441481'
                this.changeCityList.districtName = ['兴宁市']
              } else if (val[2] == '441502') {
                this.params.area = '441502'
                this.changeCityList.districtName = ['城区']
              } else if (val[2] == '441521') {
                this.params.area = '441521'
                this.changeCityList.districtName = ['海丰县']
              } else if (val[2] == '441523') {
                this.params.area = '441523'
                this.changeCityList.districtName = ['陆河县']
              } else if (val[2] == '441581') {
                this.params.area = '441581'
                this.changeCityList.districtName = ['陆丰市']
              } else if (val[2] == '441602') {
                this.params.area = '441602'
                this.changeCityList.districtName = ['源城区']
              } else if (val[2] == '441621') {
                this.params.area = '441621'
                this.changeCityList.districtName = ['紫金县']
              } else if (val[2] == '441622') {
                this.params.area = '441622'
                this.changeCityList.districtName = ['龙川县']
              } else if (val[2] == '441623') {
                this.params.area = '441623'
                this.changeCityList.districtName = ['连平县']
              } else if (val[2] == '441624') {
                this.params.area = '441624'
                this.changeCityList.districtName = ['和平县']
              } else if (val[2] == '441625') {
                this.params.area = '441625'
                this.changeCityList.districtName = ['东源县']
              } else if (val[2] == '441702') {
                this.params.area = '441702'
                this.changeCityList.districtName = ['江城区']
              } else if (val[2] == '441704') {
                this.params.area = '441704'
                this.changeCityList.districtName = ['阳东区']
              } else if (val[2] == '441721') {
                this.params.area = '441721'
                this.changeCityList.districtName = ['阳西县']
              } else if (val[2] == '441781') {
                this.params.area = '441781'
                this.changeCityList.districtName = ['阳春市']
              } else if (val[2] == '441802') {
                this.params.area = '441802'
                this.changeCityList.districtName = ['清城区']
              } else if (val[2] == '441803') {
                this.params.area = '441803'
                this.changeCityList.districtName = ['清新区']
              } else if (val[2] == '441821') {
                this.params.area = '441821'
                this.changeCityList.districtName = ['佛冈县']
              } else if (val[2] == '441823') {
                this.params.area = '441823'
                this.changeCityList.districtName = ['阳山县']
              } else if (val[2] == '441825') {
                this.params.area = '441825'
                this.changeCityList.districtName = ['连山壮族瑶族自治县']
              } else if (val[2] == '441826') {
                this.params.area = '441826'
                this.changeCityList.districtName = ['连南瑶族自治县']
              } else if (val[2] == '441881') {
                this.params.area = '441881'
                this.changeCityList.districtName = ['英德市']
              } else if (val[2] == '441882') {
                this.params.area = '441882'
                this.changeCityList.districtName = ['连州市']
              } else if (val[2] == '445102') {
                this.params.area = '445102'
                this.changeCityList.districtName = ['湘桥区']
              } else if (val[2] == '445103') {
                this.params.area = '445103'
                this.changeCityList.districtName = ['潮安区']
              } else if (val[2] == '445122') {
                this.params.area = '445122'
                this.changeCityList.districtName = ['饶平县']
              } else if (val[2] == '445202') {
                this.params.area = '445202'
                this.changeCityList.districtName = ['榕城区']
              } else if (val[2] == '445203') {
                this.params.area = '445203'
                this.changeCityList.districtName = ['揭东区']
              } else if (val[2] == '445222') {
                this.params.area = '445222'
                this.changeCityList.districtName = ['揭西县']
              } else if (val[2] == '445224') {
                this.params.area = '445224'
                this.changeCityList.districtName = ['惠来县']
              } else if (val[2] == '445281') {
                this.params.area = '445281'
                this.changeCityList.districtName = ['普宁市']
              } else if (val[2] == '445302') {
                this.params.area = '445302'
                this.changeCityList.districtName = ['云城区']
              } else if (val[2] == '445303') {
                this.params.area = '445303'
                this.changeCityList.districtName = ['云安区']
              } else if (val[2] == '445321') {
                this.params.area = '445321'
                this.changeCityList.districtName = ['新兴县']
              } else if (val[2] == '445322') {
                this.params.area = '445322'
                this.changeCityList.districtName = ['郁南县']
              } else if (val[2] == '445381') {
                this.params.area = '445381'
                this.changeCityList.districtName = ['罗定市']
              }
              let reportData = []
              for (
                var i = 0;
                i < this.changeCityList.districtName.length;
                i++
              ) {
                reportData.push({
                  data1: this.changeCityList.districtName[i],
                  data2: Math.round(Math.random() * 30000),
                  data3: Math.round(Math.random() * 10),
                  data4: Math.round(Math.random() * 30),
                  data5: Math.round(Math.random() * 10),
                  data6: Math.round(Math.random() * 30000),
                  data7: Math.round(Math.random() * 10),
                  data8: Math.round(Math.random() * 30),
                  data9: Math.round(Math.random() * 30000),
                  data10: Math.round(Math.random() * 10),
                  data11: Math.round(Math.random() * 30),
                  data12: Math.round(Math.random() * 10),
                  data13: Math.round(Math.random() * 30000),
                  data14: Math.round(Math.random() * 10),
                  data15: Math.round(Math.random() * 30000),
                  data16: Math.round(Math.random() * 10),
                  data17: Math.round(Math.random() * 30000),
                  data18: Math.round(Math.random() * 10),
                  data19: Math.round(Math.random() * 30000),
                  data20: Math.round(Math.random() * 10),
                  data21: Math.round(Math.random() * 30000),
                  data22: Math.round(Math.random() * 10),
                  data23: Math.round(Math.random() * 30000),
                  data24: Math.round(Math.random() * 10),
                  data25: Math.round(Math.random() * 30000),
                  data26: Math.round(Math.random() * 10)
                })
              }
              this.reportData = reportData
              this.ylgmtzDrawLine()
            }
          }, 10)
        })
      }
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    getCityNameList (code) {
      // let that = this;
      code = Number(code)
      this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
        parentId: code
      }).then(res => {
        console.log(code)
        let districtName = []
        if (res.code === 0) {
          let lst = res.dictionariesList
          if (lst.length === 0) {
            if (code === '442000') {
              lst = [
                { zhCn: '石岐街道' },
                { zhCn: '南区街道' },
                { zhCn: '港口镇' },
                { zhCn: '东升镇' },
                { zhCn: '东区街道' },
                { zhCn: '西区街道' },
                { zhCn: '阜沙镇' },
                { zhCn: '南头镇' },
                { zhCn: '东凤镇' },
                { zhCn: '小榄镇' },
                { zhCn: '横栏镇' },
                { zhCn: '大涌镇' },
                { zhCn: '板芙镇' },
                { zhCn: '神湾镇' },
                { zhCn: '三角镇' },
                { zhCn: '三乡镇' },
                { zhCn: '坦洲镇' },
                { zhCn: '五桂山街道' },
                { zhCn: '火炬高技术产业开发区' },
                { zhCn: '南朗镇' },
                { zhCn: '民众镇' }
              ]
            } else if (code === '441900') {
              lst = [
                { zhCn: '东城街道' },
                { zhCn: '万江街道' },
                { zhCn: '莞城街道' },
                { zhCn: '常平镇' },
                { zhCn: '南城街道' },
                { zhCn: '厚街镇' },
                { zhCn: '樟木头镇' },
                { zhCn: '虎门镇' },
                { zhCn: '长安镇' },
                { zhCn: '大朗镇' },
                { zhCn: '塘厦镇' },
                { zhCn: '大朗镇' },
                { zhCn: '凤岗镇' },
                { zhCn: '清溪镇' },
                { zhCn: '谢岗镇' },
                { zhCn: '桥头镇' },
                { zhCn: '谢岗镇' },
                { zhCn: '石龙镇' },
                { zhCn: '谢岗镇' },
                { zhCn: '石碣镇' },
                { zhCn: '高埗镇' },
                { zhCn: '中堂镇' },
                { zhCn: '洪梅镇' },
                { zhCn: '麻涌镇' },
                { zhCn: '沙田镇' },
                { zhCn: '茶山镇' },
                { zhCn: '企石镇' },
                { zhCn: '横沥镇' },
                { zhCn: '寮步镇' },
                { zhCn: '东坑镇' },
                { zhCn: '石排镇' },
                { zhCn: '大岭山镇' }
              ]
            }
          }
          lst.forEach(district => {
            districtName.push(district.zhCn)
          })
        }
        this.changeCityList = {
          districtName: districtName
        }

        console.log(this.changeCityList)

        let reportData = []
        for (var i = 0; i < this.changeCityList.districtName.length; i++) {
          reportData.push({
            data1: this.changeCityList.districtName[i],
            data2: Math.round(Math.random() * 30000),
            data3: Math.round(Math.random() * 10),
            data4: Math.round(Math.random() * 30),
            data5: Math.round(Math.random() * 10),
            data6: Math.round(Math.random() * 30000),
            data7: Math.round(Math.random() * 10),
            data8: Math.round(Math.random() * 30),
            data9: Math.round(Math.random() * 30000),
            data10: Math.round(Math.random() * 10),
            data11: Math.round(Math.random() * 30),
            data12: Math.round(Math.random() * 10),
            data13: Math.round(Math.random() * 30000),
            data14: Math.round(Math.random() * 10),
            data15: Math.round(Math.random() * 30000),
            data16: Math.round(Math.random() * 10),
            data17: Math.round(Math.random() * 30000),
            data18: Math.round(Math.random() * 10),
            data19: Math.round(Math.random() * 30000),
            data20: Math.round(Math.random() * 10),
            data21: Math.round(Math.random() * 30000),
            data22: Math.round(Math.random() * 10),
            data23: Math.round(Math.random() * 30000),
            data24: Math.round(Math.random() * 10),
            data25: Math.round(Math.random() * 30000),
            data26: Math.round(Math.random() * 10)
          })
        }

        this.reportData = reportData
        console.log(this.reportData)
        this.ylgmtzDrawLine()
      })
    },

    registerTimelineChange (chartInstance) {
      const me = this
      chartInstance.on('timelinechanged', function (timeLineIndex) {
        me.selectedYear = me.arrTime[timeLineIndex.currentIndex]
        me.getYlgmtzList()
        me.ylgmtzDrawLine()
      })
    },

    initTimeline () {
      const me = this
      setTimeout(function () {
        me.createTimeline()
      }, 10)
    },

    resetTimeLine () {
      if (this.timelineChart) {
        this.timelineChart.setOption(this.timelineOption)
      }
    },

    createTimeline () {
      if (this.timelineChart) {
        this.timelineChart.clear()
      }
      this.timelineChart = echarts.init(
        document.getElementById('chart-timeline-cjfk')
      )
      this.timelineChart.resize()
      this.timelineChart.setOption(this.timelineOption)
      this.registerTimelineChange(this.timelineChart)
    },

    getTableData () {
      this.current = 0
      this.getYlgmtzList()
    },
    getChartData () {
      this.current = 1
      this.ylgmtzDrawLine()
    },
    // 城市三级联动
    areaSelect (val) {
      this.params.province = this.areaSelectedOptions[0]
      this.params.city = this.areaSelectedOptions[1]
      this.params.area = this.areaSelectedOptions[2]

      this.nextparams.province = this.areaSelectedOptions[0]
      this.nextparams.cityx = this.areaSelectedOptions[1]

      this.lastparams.province = this.areaSelectedOptions[0]
      this.lastparams.city = this.areaSelectedOptions[1]
      this.lastparams.area = this.areaSelectedOptions[2]
    },
    unitNameSelect () {
      if (this.unitsVal == 'SQUARE_KILOMETER') {
        this.unitName = '单位：平方公里'
      } else if (this.unitsVal == 'MU') {
        this.unitName = '单位：亩'
      } else if (this.unitsVal == 'MILLION_MU') {
        this.unitName = '单位：万亩'
      } else if (this.unitsVal == 'SQUARE_METER') {
        this.unitName = '单位：平方米'
      } else if (this.unitsVal == 'HECTARE') {
        this.unitName = '单位：公顷'
      }
    },

    // 获取预留规模台账列表数据
    getYlgmtzList () { },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getYlgmtzList()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getYlgmtzList()
    },
    // 获取预留规模台账图表数据
    async ylgmtzDrawLine () {
      setTimeout(() => {
        document.getElementById('monitorChart').style.width = 100 + '%'
        document.getElementById('monitorChart').style.height = 100 + '%'
        let monitorChart = echarts.init(
          document.getElementById('monitorChart')
        )
        monitorChart.resize() // 直接加这句即可
      }, 0)
      let monitorChart = echarts.init(document.getElementById('monitorChart'))

      var xzhouData = [] // x轴数据

      // 展示的数据
      var shuitianmj = []
      var shuijiaodi = []
      var handi = []
      var gengdi = []
      var dileimianji = []
      var baoyouliang = []
      var baoyouliangxianzhuangdilei = []
      var baoyouliangxianzhuangzhibiao = []
      var baoyouliangxianzhuanghanK = []
      var baoyouliangxianzhuangwancheng = []

      var chartData = this.reportData
      for (var key in chartData) {
        shuitianmj.push(chartData[key].data2)
        shuijiaodi.push(chartData[key].data6)
        handi.push(chartData[key].data9)

        gengdi.push(chartData[key].data13)
        dileimianji.push(chartData[key].data15)
        baoyouliang.push(chartData[key].data17)

        baoyouliangxianzhuangdilei.push(chartData[key].data19)
        baoyouliangxianzhuangzhibiao.push(chartData[key].data23)

        baoyouliangxianzhuanghanK.push(chartData[key].data21)
        baoyouliangxianzhuangwancheng.push(chartData[key].data25)
      }
      for (var key in this.changeCityList.districtName) {
        xzhouData.push(this.changeCityList.districtName[key])
      }

      var legendData = [
        '水田面积',
        '水浇地',
        '旱地',
        '耕地',
        '可调整地类面积',
        '耕地保有量现状',
        '耕地保有量现状（含全部可调整地类）',
        '耕地保有量规划指标',
        '耕地保有量现状（含带K园地和带K坑塘）',
        '耕地保有量指标完成情况'
      ]
      var seriesAllData = [
        shuitianmj,
        shuijiaodi,
        handi,
        gengdi,
        dileimianji,
        baoyouliang,
        baoyouliangxianzhuangdilei,
        baoyouliangxianzhuangzhibiao,
        baoyouliangxianzhuanghanK,
        baoyouliangxianzhuangwancheng
      ]

      var colorData = [
        '#5582ea',
        '#9dcb69',
        '#45b27f',
        '#f4ce52',
        '#f48e56',
        '#f0525b',
        '#cd69d0',
        '#8759d6',
        '#616fc2',
        '#50b8ef'
      ]

      var series = []
      for (var i = 0; i < legendData.length; i++) {
        series.push({
          name: legendData[i],
          type: 'bar',
          barWidth: null, // 默认自适应
          barGap: '50%', // 柱间距离，默认为柱形宽度的30%，可设固定值
          barMaxWidth: 40, // 柱形的宽度
          barMaxnWidth: 1, // 柱形的宽度
          barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
          data: seriesAllData[i], // 数据
          itemStyle: {
            normal: {
              color: colorData[i]
            }
          }
        })
      }

      var unitName = ''
      if (this.unitsVal == 'SQUARE_KILOMETER') {
        unitName = '单位：平方公里'
      } else if (this.unitsVal == 'MU') {
        unitName = '单位：亩'
      } else if (this.unitsVal == 'MILLION_MU') {
        unitName = '单位：万亩'
      } else if (this.unitsVal == 'SQUARE_METER') {
        unitName = '单位：平方米'
      } else if (this.unitsVal == 'HECTARE') {
        unitName = '单位：公顷'
      }

      var option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: 'center',
          bottom: '2%',
          data: legendData, // legendData
          itemWidth: 36,
          itemHeight: 17,
          itemGap: 20
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '25%',
          top: '5%',
          containLabel: true,
          x: 100, // 控制x轴文字与底部的距离
          y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
        },
        xAxis: [
          {
            // name: '市',
            type: 'category',
            data: xzhouData, // x轴data
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            },
            axisLabel: {
              interval: 'auto',
              rotate: 45, // 文字逆时针旋转45°
              textStyle: {
                fontSize: '14' // 坐标值得具体的颜色
              }
            }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            start: 0, // 默认为1
            end: 100
            // end: 45
          }
        ],
        yAxis: [
          {
            name: unitName,
            nameTextStyle: {
              fontWeight: 'bolder'
            },
            type: 'value',
            splitLine: {
              // 网格线
              lineStyle: {
                type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
              },
              show: true // 隐藏或显示
            },
            axisTick: {
              alignWithLabel: true,
              show: false // 不要刻度
            },
            axisLine: {
              show: false // 不要x轴
            }
          }
        ],
        series: series
      }

      monitorChart.setOption(option, true)
    },
    initEchart () {
      window.addEventListener('resize', () => {
        let monitorChart = echarts.init(
          document.getElementById('monitorChart')
        )
        document.getElementById('monitorChart').style.width = 100 + '%'
        document.getElementById('monitorChart').style.height = 100 + '%'
        monitorChart.resize()
      })
    },
    getSummaries (param) {
      console.log(param)
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '统计'
          return
        } else if (index == 3) {
          sums[index] = this.areaReturn
        } else if (index === 4) {
          sums[index] = this.provinceReturn
        } else if (index === 5) {
          sums[index] = this.total
        } else {
          sums[index] = ''
        }
      })

      return sums
    }
  },
  created () {
    this.screenWidth = document.body.clientWidth
    window.addEventListener('setItem', () => {
      this.isShowMenu = sessionStorage.getItem('watchShow')
    })
    // this.getCityNameList(440000);

    if (this.unitsVal == 'SQUARE_KILOMETER') {
      this.unitName = '单位：平方公里'
    } else if (this.unitsVal == 'MU') {
      this.unitName = '单位：亩'
    } else if (this.unitsVal == 'MILLION_MU') {
      this.unitName = '单位：万亩'
    } else if (this.unitsVal == 'SQUARE_METER') {
      this.unitName = '单位：平方米'
    } else if (this.unitsVal == 'HECTARE') {
      this.unitName = '单位：公顷'
    }

    this.getYlgmtzList()
  },

  beforeDestroy () {
    this.$store.dispatch('jcpgyj/setCJFKServiceType', null)
  },
  beforeMount () {
    this.tableData = this.deepClone(tableData)
    this.xzqh = this.deepClone(XZQH)
    this.units = this.deepClone(UNINTS)
    this.selectscope = this.deepClone(SELECT)
    this.timelineOption = this.deepClone(TIMELINEOPTION)
    this.arrTime = this.timelineOption.baseOption.timeline.data
    // this.mainChartOption = this.deepClone(MAINCHARTOPTION);
  }
}
</script>
<style>
@import "../css/style.css";

#dtIndexBox .el-input__inner {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
}
#dtIndexBox .el-icon-arrow-up:before {
  /* color: #fff; */
}
#dtIndexBox .el-icon-arrow-down:before {
  /* color: #fff; */
}
#dtIndexBox .el-input__icon {
  color: #fff;
}
#dtIndexBox .el-input__inner::placeholder {
  color: #fff;
}
#dtIndexBox .el-button--primary {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
}
</style>
<style scoped>
.page-body {
  padding: 0 15px 15px;
  background-color: #f7f7f7;
}
#dtIndexBox {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.indexTitleBox {
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
}
.indexCheck {
  flex: 1;
}
.indexImage {
  width: 200px;
}

.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  background: #fff;
  width: 80%;
  height: 100%;
  /* overflow: auto; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.indexContentBox {
  width: 100%;
  height: 100%;
}
.indexContentBox1 {
  width: 100%;
  height: 100%;
}
.unitTip {
  font-weight: bolder;
  color: #303030;
  margin-bottom: 15px;
}
.filterWrap {
  display: flex;
  width: 100%;
  flex: 1;
  overflow: hidden;
  background-color: #f7f7f7;
}
.filterWrapRight {
  box-sizing: border-box;
  width: 20%;
  /* flex: 1; */
  background-color: #fff;
  margin-left: 20px;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.filterWrapRight-menu {
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.filterWrapRight-menu::-webkit-scrollbar {
  display: none;
}
.chart-timebox {
  position: relative;
  width: 1200px;
  height: 50px;
  left: 50%;
  margin-left: -600px;
}
@media screen and (max-width: 1600px) {
  #dtIndexBox {
    height: 772px;
  }
  .chart-timebox {
    position: relative;
    width: 1000px;
    height: 50px;
    left: 50%;
    margin-left: -500px;
  }
}
</style>
