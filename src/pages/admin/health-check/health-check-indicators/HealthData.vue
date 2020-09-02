<template>
  <div class="HealthData">
    <el-row class="page-content"
            type="flex">
      <el-col class="choice_case"
              :span="19">
        <div class="choice_core">
          <el-row type="flex"
                  align="middle">
            <el-col :span="2">
              <span class="filter_title">行政区域：</span>
            </el-col>
            <el-col :span="5">
              <el-cascader :props="props"
                           clearable
                           v-model="areaSelectedOptions"
                           @change="handleChange"></el-cascader>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">区域格局：</span>
            </el-col>
            <el-col :span="5">
              <el-select v-model="gejuLabel"
                         filterable
                         placeholder="请选择区域格局"
                         @change="handleChangeGeju">
                <el-option v-for="item in gejuOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">区域划分：</span>
            </el-col>
            <el-col :span="5">
              <el-select v-model="diquLabel"
                         filterable
                         placeholder="请选择区域划分"
                         @change="handleChangeDiqu">
                <el-option v-for="item in diquOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-row type="flex"
                      align="middle">
                <el-col :span="12">
                  <div @click="num = 0"
                       :class="{active:num==1}">
                    <img :src="num===0?require('@/assets/images/jcpgyj/index0202.png'):require('@/assets/images/jcpgyj/index02.png')"
                         style="width:46px;height:36px;" />
                  </div>
                </el-col>
                <el-col :span="12">
                  <div @click="num = 1"
                       :class="{active:num==0}">
                    <img :src="num===1?require('@/assets/images/jcpgyj/index01.png'):require('@/assets/images/jcpgyj/index0101.png')"
                         style="width:46px;height:36px;" />
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- <div class="choice_tab">
            <ul class="choice_tab_ul">
              <li @click="num = 0" :class="{active:num==1}">

              </li>
              <li @click="num = 1" :class="{active:num==0}">
                <img
                  :src="num===1?require('@/assets/images/jcpgyj/index01.png'):require('@/assets/images/jcpgyj/index0101.png')"
                  style="width:46px;height:36px;"
                />
              </li>
            </ul>
          </div>-->
        </div>

        <!-- 切换的内容 -->
        <div>
          <ul class="tab_content_ul">
            <li v-show="num == 0"
                style="width:100%">
              <columns :option="customoption"></columns>
            </li>
            <li v-show="num == 1">
              <div class="pageTab">
                <el-table :data="tableData"
                          style="width: 100%;margin-top:10px"
                          border
                          height="500">
                  <el-table-column :label="item"
                                   show-overflow-tooltip
                                   align="center"
                                   v-for="(item,index) in tableHead"
                                   :key="index">
                    <template slot-scope="scope">
                      <span hit
                            size="medium">{{ scope.row.get(item) }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col class="norm"
              :span="5">
        <el-scrollbar style="height:100%">
          <div>
            <el-input placeholder="输入关键字查询"
                      prefix-icon="el-icon-search"
                      v-model="inquire"
                      style="font-size:16px"
                      :maxlength="50"></el-input>
          </div>
          <div style="margin-top:20px">
            <el-menu :default-active="activeIndex"
                     :default-openeds="activeArr"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     :unique-opened="true">
              <el-submenu :index="item.val"
                          v-for="(item,index) in indexInfo"
                          :key="item.val">
                <template slot="title">
                  <i v-if="index===0">
                    <img src="@/assets/tabs01.png"
                         alt />
                  </i>
                  <i v-if="index===1">
                    <img src="@/assets/tabs02.png"
                         alt />
                  </i>
                  <i v-if="index===2">
                    <img src="@/assets/tabs03.png"
                         alt />
                  </i>
                  <i v-if="index===3">
                    <img src="@/assets/tabs04.png"
                         alt />
                  </i>

                  <span>{{item.name}}</span>
                  <span>({{item.size}})</span>
                </template>
                <!-- <el-menu-item-group >
                <el-menu-item :index="element.indexName">{{element.indexName}}</el-menu-item>
              </el-menu-item-group>-->

                <el-menu-item :index="element.indexName"
                              v-for="element in item.list"
                              :key="element.indexName">{{element.indexName}}</el-menu-item>
              </el-submenu>
              <!-- <el-submenu index="2">
              <template slot="title">
                <i>
                  <img src="@/assets/tabs02.png" alt />
                </i>
                <span>结构效率</span>
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
                  <img src="@/assets/tabs03.png" alt />
                </i>
                <span>生活设施</span>
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
                  <img src="@/assets/tabs04.png" alt />
                </i>
                <span>基础指标</span>
                <span>(9)</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">都市圈内城镇一小时可达性</el-menu-item>
                <el-menu-item index="4-2">人地匹配度</el-menu-item>
              </el-menu-item-group>
            </el-submenu>-->
            </el-menu>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import columns from './EchartData'
import areaSelect from '@/assets/js/areaCascader'
export default {
  name: 'HealthData',
  mixins: [areaSelect],
  data () {
    return {
      gejuLabel: '',
      diquLabel: '',
      unitsVal: 'SQUARE_KILOMETER',
      activeIndex: '底线管控',
      activeArr: ['ONE'],
      unitName: '',
      num: 0,
      inquire: '',
      produImg: [
        { src: require('@/assets/icon1.png') },
        { src: require('@/assets/icon2.png') }
      ],
      gejuOptions: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '珠三角核心区'
        },
        {
          value: '2',
          label: '沿海经济带'
        },
        {
          value: '3',
          label: '北部生态保护区'
        }
      ],

      diquOptions: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '珠三角'
        },
        {
          value: '2',
          label: '粤东'
        },
        {
          value: '3',
          label: '粤西'
        },
        {
          value: '4',
          label: '粤北'
        }
      ],
      unit: '',
      tableData: null,
      customoption: null,
      tableHead: [],
      data: [],
      indexInfo: [],
      params: {
        indexType: 'ONE',
        province: '440000',
        city: '',
        area: ''
      }
    }
  },
  methods: {
    handleOpen (index) {
      this.params.indexType = index
    },
    handleClose () { },
    getList (val) {
      let params = this.params

      this.$get('/epf-monitor-evaluation/indexOrder/orderList', params).then(
        res => {
          if (res.code == '0') {
            // let newData = [{ name: "哈哈", 哈哈: 2 }];
            let { title, ...data } = res.result
            var arr = []
            var value = ''
            for (var key in data) {
              value = new Map()
              for (var i = 0; i < title.length; i++) {
                value.set(title[i], data[key][i])
              }
              arr.push(value)
            }

            this.tableHead = title
            this.tableData = arr
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    getEchart (val) {
      let params = this.params
      // params["indexType"] = "ONE";
      this.$get(
        '/epf-monitor-evaluation/indexOrder/getHistogramData',
        params
      ).then(res => {
        if (res.code == '0') {
          this.indexInfo = res.indexInfo
          this.activeIndex = this.indexInfo[0].name
          console.log(this.indexInfo)
          let result = res.result
          let legend = []
          let city = []
          let series = []
          let allData = []
          let unitArr = []
          let arr = []
          for (var key in result) {
            legend.push(key)

            if (result[key].length) {
              unitArr.push(result[key][0].unit)
            }

            var value = new Map()
            for (let i = 0; i < result[key].length; i++) {
              let temp = result[key][i]
              value.set(temp.area, temp.value)
              if (city.indexOf(temp.area) === -1) {
                city.push(temp.area)
              }
            }
            arr.push(value)
          }
          for (let j = 0; j < arr.length; j++) {
            var tempArr = []
            var temp = arr[j]
            for (let k = 0; k < city.length; k++) {
              var cityTemp = city[k]
              var value = ''
              if (!temp.get(cityTemp)) {
                value = 0
              } else {
                value = temp.get(cityTemp)
              }
              tempArr.push(value)
            }
            allData.push(tempArr)
          }
          for (var i = 0; i < legend.length; i++) {
            series.push({
              name: legend[i],
              type: 'bar',
              barWidth: '16px',
              data: allData[i], // 数据,
              tooltip: {
                formatter: `{b} {c} ${unitArr[i]}`
              }
            })
          }

          this.customoption = {
            tooltip: {
              trigger: 'item',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              x: 'center',
              bottom: '2%',
              data: legend,
              itemWidth: 36,
              itemHeight: 17,
              itemGap: 20,
              selectedMode: 'single'
            },
            grid: {
              left: '3%',
              right: '3%',
              bottom: '20%',
              top: '5%',
              containLabel: true
            },
            xAxis: [
              {
                // name: '市',
                type: 'category',
                data: city, // x轴data
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                }
              }
            ],
            dataZoom: [
              {
                type: 'inside',
                show: true,
                xAxisIndex: [0],
                start: 0, // 默认为1
                end: 20
                // end: 45
              }
            ],
            yAxis: [
              {
                name: '',
                nameTextStyle: {
                  fontWeight: 'bolder'
                },
                type: 'value',
                // interval: Math.ceil(maxAllData / 5), // y轴分段
                // max: Math.ceil(50), // 最大值
                min: 0,
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
                  show: false, // 不要x轴
                  onZero: true
                }
              }
            ],
            series: series
          }
          // let newObj = {
          //   name: "啦啦啦啦",
          //   type: "bar",
          //   barWidth: "16px",
          //   data: [100] // 数据
          // };
          // console.log(city);
          // allData.push(newObj);

          // let newData = [{ name: "哈哈", 哈哈: 2 }];
          // let { title, ...data } = res.result;
          // var arr = [];
          // var value = "";
          // for (var key in data) {
          //   arr;
          //   value = new Map();
          //   for (var i = 0; i < title.length; i++) {
          //     value.set(title[i], data[key][i]);
          //   }
          //   arr.push(value);
          // }
          // console.log(arr);
          // this.tableHead = title;
          // this.tableData = arr;
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    handleChange () {
      this.params.city = this.areaSelectedOptions[1] || ''
      this.params.area = this.areaSelectedOptions[2] || ''
    },
    handleChangeGeju () { },
    handleChangeDiqu () { },
    change () { }
  },
  components: {
    columns
  },
  beforeMount () { },
  mounted () { },
  created () {
    this.getList()
    this.getEchart()
  },
  watch: {
    activeArr (val) {
      console.log(val)
    },
    params: {
      handler () {
        this.getList()
        this.getEchart()
      },
      deep: true
    }
  }
}
</script>
<style src="./style.css" scoped>
</style>
