<template>
  <el-container class="epf-table__all AdaptContrastStatus">
    <el-main id="main">
      <epf-mapview :delay="1"
                   name="suitability99"
                   ref="suitability99"
                   class="epf-mapview__custom">
        <div class="toolbar">
          <jump-to></jump-to>
          <zoom></zoom>
          <pan></pan>
          <basemap></basemap>
        </div>
      </epf-mapview>
      <!-- <epf-stepper @yearChange="handleYearChange"></epf-stepper> -->
      <epf-stepper style="margin-top:-6px;margin-right:-20px;"></epf-stepper>
      <step :listData="data"
            @itemClick="tabClick"
            :isCurrent="childrenData.active"></step>
    </el-main>

    <el-aside id="aside"
              width="420px">
      <el-container>
        <el-main id="aside-main">
          <div class="appraisals"
               style="margin-top:15px">
            <el-row class="evaluation"
                    type="flex"
                    align="middle"
                    style="margin-top:15px">
              <div class="verticalLine"></div>
              <div class="text title">对比结果概述</div>
            </el-row>
            <div class="description">
              <el-row class="myContent">{{childrenData.content}}</el-row>
            </div>
          </div>
          <div>
            <el-row class="evaluation"
                    type="flex"
                    align="middle"
                    style="margin-top:15px">
              <div class="verticalLine"></div>
              <div class="text title">等级概览</div>
              <div class="induce">
                <span v-if="!isEcharts">导出数据</span>
                <span @click="echartsChange"
                      style="cursor:pointer">{{echartsText}}</span>
              </div>
            </el-row>
            <div v-if="isEcharts">
              <div id="synthesis"
                   ref="synthesis"></div>
            </div>
            <div class="myContent"
                 v-else>
              <el-table v-if="childrenData.makepeace"
                        :data="childrenData.tableData"
                        style="width: 100%;margin-top:10px"
                        border
                        :summary-method="getSummaries"
                        show-summary>
                <el-table-column :label="item.title"
                                 show-overflow-tooltip
                                 align="center"
                                 :prop="Array.isArray(item.key)?item.key[0]:item.key"
                                 v-for="(item,index) in childrenData.tableTitle"
                                 :key="index">
                  <template slot-scope="scope">
                    <div v-if="Array.isArray(item.key)">
                      <el-row class="epf-table__row epf-table__fristRow">
                        <el-col :span="8"
                                class="epf-table__fristCol">面积</el-col>
                        <el-col :span="16"
                                class>{{ scope.row[item.key[0]] }}</el-col>
                      </el-row>
                      <el-row class="epf-table__row">
                        <el-col :span="8"
                                class="epf-table__fristCol">占比</el-col>
                        <el-col :span="16">{{ scope.row[item.key[1]] }}</el-col>
                      </el-row>
                    </div>
                    <span v-else>{{ scope.row[item.key] }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-table v-else
                        :data="childrenData.tableData"
                        style="width: 100%;margin-top:10px"
                        border>
                <el-table-column :label="item.title"
                                 show-overflow-tooltip
                                 align="center"
                                 v-for="(item,index) in childrenData.tableTitle"
                                 :key="index">
                  <template slot-scope="scope">
                    <div v-if="Array.isArray(item.key)">
                      <el-row class="epf-table__row epf-table__fristRow">
                        <el-col :span="8"
                                class="epf-table__fristCol">面积</el-col>
                        <el-col :span="16"
                                class>{{ scope.row[item.key[0]] }}</el-col>
                      </el-row>
                      <el-row class="epf-table__row">
                        <el-col :span="8"
                                class="epf-table__fristCol">占比</el-col>
                        <el-col :span="16">{{ scope.row[item.key[1]] }}</el-col>
                      </el-row>
                    </div>
                    <span v-else>{{ scope.row[item.key] }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-aside>
  </el-container>
</template>
<script>
import jumpTo from '../../onemap/toolbarItem/jumpTo/widget'
import zoom from '../../onemap/toolbarItem/zoom/index'
import pan from '../../onemap/toolbarItem/pan/widget'
import step from './common/Step'
import EpfStepper from '../../bearmonitor/common/epf-stepper'
import gis from './mixins/gis'
import map from '../../monitorassess/three-line-control/three-line-components/mapinit'
export default {
  name: 'Adapt',
  mixins: [map, gis],
  data () {
    return {
      // tabs:['城镇建设','农业耕作'],
      data: [],
      loading1: false,
      isEcharts: true,
      num: 0,
      addImg: require('@/assets/plananalyse/add.png'),
      subImg: require('@/assets/plananalyse/reduce.png'),
      isHide: true,
      childrenData: {
        content: '',
        tableData: [],
        makepeace: false,
        tableTitle: []
      },

      data1: {
        content:
          '根据评价结果，全省现状耕地的农业承载力评价结果主要集中Ⅳ和Ⅴ等。Ⅲ等及以上的现状耕地占到全省耕地的 63.53%。其余的36.47%评价结果为Ⅰ等和Ⅱ等，主要零散分布于粤北山区和粤东、粤西丘陵地带。评价结果与现状的吻合度较高。',
        makepeace: true,
        tableData: [
          {
            id: 'V',

            key1: '23634.97',
            key2: '13.16%',
            value1: '6091.33',
            value2: '23.42%'
          },
          {
            id: 'IV',

            key1: '48531.73',
            key2: '27.02%',
            value1: '11458.81',
            value2: '44.05%'
          },
          {
            id: 'III',

            key1: '41955.45',
            key2: '23.335%',
            value1: '5434.52',
            value2: '20.89%'
          },
          {
            id: 'II',

            key1: '41174.05',
            key2: '22.92%',
            value1: '2377.2',
            value2: '9.14%'
          },
          {
            id: 'I',

            key1: '23471.81',
            key2: '13.55%',
            value1: '649.49',
            value2: '2.50%'
          }
        ],
        tableTitle: [
          { title: '承载力等级', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '现状耕地面积', key: ['value1', 'value2'] }
        ],
        active: 1
      },
      data2: {
        content:
          '全省范围看，Ⅴ等承载力的现状耕地主要分布在珠三角和沿海平原区，Ⅳ等主要分布在粤西平原地区，Ⅲ等及以上现状耕地合计全省各地均有分布，以粤西平原地区较为集中',
        makepeace: false,
        tableData: [
          {
            id: '珠三角',
            name: '王小虎',
            key1: '37623.72',
            key2: '28.58%',
            value1: '5567.58',
            value2: '24.22%'
          },
          {
            id: '粤东',
            name: '王小虎',
            key1: '11042.56',
            key2: '8.39%',
            value1: '2412.25',
            value2: '10.50%'
          },
          {
            id: '粤西',
            name: '王小虎',
            key1: '25272.28',
            key2: '19.19%',
            value1: '7681.42',
            value2: '33.42%'
          },
          {
            id: '粤北',
            name: '王小虎',
            key1: '57722.68',
            key2: '43.84%',
            value1: '7323.22',
            value2: '31.86%'
          }
        ],
        tableTitle: [
          { title: '片区', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '现状耕地面积', key: ['value1', 'value2'] }
        ],
        active: 2
      },

      data3: {
        content:
          '根据评价结果，全省现状城镇的城镇承载力评价结果主要集中Ⅴ等。Ⅲ等及以上的现状城镇占全省城镇的 98.8%。其余的 1.2%评价结果为Ⅰ等，零散分布于全省各地，主要包括城区大型矿山、依山而建的住宅和别墅区、城市公园周边的开发建设等。评价结果与现状的吻合度较高。',
        makepeace: true,
        tableData: [
          {
            id: 'V',
            key1: '62885.21',
            key2: '35.01%',
            value1: '5464.78',
            value2: '74.16%'
          },
          {
            id: 'IV',
            key1: '33228.92',
            key2: '18.50%',
            value1: '1515.62',
            value2: '20.57%'
          },
          {
            id: 'III',
            key1: '28029.87',
            key2: '15.60%',
            value1: '299.60',
            value2: '4.07%'
          },
          {
            id: 'II',
            key1: 0,
            key2: '0% ',
            value1: 0,
            value2: '0%'
          },
          {
            id: 'I',
            key1: '55500.00',
            key2: '30.89%',
            value1: '88.47',
            value2: '1.20%'
          }
        ],
        tableTitle: [
          { title: '承载力等级', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '现在城镇面积', key: ['value1', 'value2'] }
        ],
        active: 3
      },
      data4: {
        content:
          '全省范围看，Ⅴ、Ⅳ、Ⅲ等承载力的现状城镇均主要分布在珠三角平原区（分别占全省相应等城镇的 69%、51%、57%），合计占全省城镇的 65%。其余Ⅲ等以下均匀分布在粤北、粤西、粤东。',
        makepeace: false,
        tableData: [
          {
            id: '珠三角',
            key1: '40863.78',
            key2: '32.92%',
            value1: '4742.83',
            value2: '65.15%'
          },
          {
            id: '粤东',
            key1: '12031.89',
            key2: '9.69%',
            value1: '643.14',
            value2: '8.83%'
          },
          {
            id: '粤西',
            key1: '27637.69',
            key2: '22.26%',
            value1: '872.51',
            value2: '11.99%'
          },
          {
            id: '粤北',
            key1: '43610.64',
            key2: '35.13%',
            value1: '1021.52',
            value2: '14.03%'
          }
        ],
        tableTitle: [
          { title: '片区', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '现状城镇面积', key: ['value1', 'value2'] }
        ],
        active: 4
      },
      data5: {
        content:
          '根据评价结果，全省初步划定的生态保护红线的生态重要性评价结果主要为重要和极重要，合计占生态保护红线的 98.54%。其中，一般重要的占 1.46%，散布于粤北和粤东北的丘陵地带、粤西北低山丘陵区。评价结果与生态保护红线初步划定成果高度吻合。',
        makepeace: true,
        tableData: [
          {
            id: '极重要',
            name: '王小虎',
            key1: '108449.96',
            key2: '60.37%',
            value1: '32047.60',
            value2: '88.85%'
          },
          {
            id: '重要',
            name: '王小虎',
            key1: '37587.19',
            key2: '20.92%',
            value1: '3494.58',
            value2: '9.69%'
          },
          {
            id: '一般重要',
            name: '王小虎',
            key1: '33606.85',
            key2: '18.71%',
            value1: '527.36',
            value2: '1.46%'
          }
        ],
        tableTitle: [
          { title: '重要性等级', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '生态保护红线', key: ['value1', 'value2'] }
        ],
        active: 5
      },
      data6: {
        content:
          '评价结果为生态保护极重要与重要的，主要分布在粤北和珠三角地区，其中，极重要的主要分布在粤北的起微山至大庚岭一带、珠江水系流域和粤西北的大田顶山地等区域。',
        makepeace: false,
        tableData: [
          {
            id: '珠三角',
            name: '王小虎',
            key1: '41537.86',
            key2: '28.44%',
            value1: '8975.17',
            value2: '25.25%'
          },
          {
            id: '粤东',
            name: '王小虎',
            key1: '11400.72',
            key2: '7.81%',
            value1: '2666.38',
            value2: '7.51%'
          },
          {
            id: '粤西',
            name: '王小虎',
            key1: '22655.09',
            key2: '15.51%',
            value1: '3632.95',
            value2: '10.22%'
          },
          {
            id: '粤北',
            name: '王小虎',
            key1: '70443.49',
            key2: '48.24%',
            value1: '1021.52',
            value2: '14.03%'
          }
        ],
        tableTitle: [
          { title: '片区', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '生态保护红线', key: ['value1', 'value2'] }
        ],
        active: 6
      },
      data7: {
        content:
          '评价结果为生态保护极重要与重要的，主要分布在粤北和珠三角地区，其中，极重要的主要分布在粤北的起微山至大庚岭一带、珠江水系流域和粤西北的大田顶山地等区域。',
        makepeace: true,
        tableData: [
          {
            id: 'V',
            name: '王小虎',
            key1: '23634.97',
            key2: '13.16%',
            value1: '6091.33',
            value2: '23.42%'
          },
          {
            id: 'IV',
            name: '王小虎',
            key1: '48531.73',
            key2: '27.02%',
            value1: '11458.81',
            value2: '44.05%'
          },
          {
            id: 'III',
            name: '王小虎',
            key1: '41955.45',
            key2: '23.335%',
            value1: '5434.52',
            value2: '20.89%'
          },
          {
            id: 'II',
            name: '王小虎',
            key1: '41174.05',
            key2: '22.92%',
            value1: '2377.2',
            value2: '9.14%'
          },
          {
            id: 'I',
            name: '王小虎',
            key1: '233471.81',
            key2: '13.55%',
            value1: '649.49',
            value2: '2.50%'
          }
        ],
        tableTitle: [
          { title: '承载力等级', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '永久基本农田', key: ['value1', 'value2'] }
        ],
        active: 7
      },
      data8: {
        content:
          '全省范围看，Ⅳ和Ⅴ等承载力的永久基本农田主要分布在沿海平原地区，Ⅲ等不多且平均分布于全省的较平缓区域，粤西地区相对集中。',
        makepeace: true,
        tableData: [
          {
            id: '珠三角',
            name: '王小虎',
            key1: '37623.72',
            key2: '28.58%',
            value1: '5775.50',
            value2: '27.94%'
          },
          {
            id: '粤东',
            name: '王小虎',
            key1: '12031.89',
            key2: '9.69%',
            value1: '643.14',
            value2: '8.83%'
          },
          {
            id: '粤西',
            name: '王小虎',
            key1: '25272.28',
            key2: '19.19%',
            value1: '7681.42',
            value2: '33.42%'
          },
          {
            id: '粤北',
            name: '王小虎',
            key1: '43610.64',
            key2: '35.13%',
            value1: '1021.52',
            value2: '14.03%'
          }
        ],
        tableTitle: [
          { title: '片区', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '永久基本农田', key: ['value1', 'value2'] }
        ],
        active: 8
      },
      data9: {
        content:
          '评价结果为生态保护极重要与重要的，主要分布在粤北和珠三角地区，其中，极重要的主要分布在粤北的起微山至大庚岭一带、珠江水系流域和粤西北的大田顶山地等区域。',
        makepeace: true,
        tableData: [
          {
            id: 'V',
            name: '王小虎',
            key1: '62855.51',
            key2: '35.01%',
            value1: '5464.78',
            value2: '74.16%'
          },
          {
            id: 'IV',
            name: '王小虎',
            key1: '33228.92',
            key2: '18.50%',
            value1: '1515.62',
            value2: '20.57%'
          },
          {
            id: 'III',
            name: '王小虎',
            key1: '28029.87',
            key2: '18.50%',
            value1: '299.60',
            value2: '20.57%'
          },
          {
            id: 'II',
            name: '王小虎',
            key1: 0,
            key2: '0%',
            value1: 0,
            value2: '0%'
          },
          {
            id: 'I',
            name: '王小虎',
            key1: '55599.00',
            key2: '30.89%',
            value1: '88.47',
            value2: '1.20%'
          }
        ],
        tableTitle: [
          { title: '承载能力等级', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '承载开发边界', key: ['value1', 'value2'] }
        ],
        active: 9
      },

      data10: {
        content:
          ' 从全省范围看，Ⅴ、Ⅳ、Ⅲ等承载力的城镇开发边界均主要分布在珠三角平原区（分别占全省相应等城镇开发边界的 68%、48%、58%），合计占全省城镇开发边界的 69%',
        makepeace: true,
        tableData: [
          {
            id: '珠三角',
            key1: '40863.78',
            key2: '32.92%',
            value1: '4742.83',
            value2: '65.15%'
          },
          {
            id: '粤东',
            key1: '12031.89',
            key2: '9.69%',
            value1: '643.14',
            value2: '8.83%'
          },
          {
            id: '粤西',
            key1: '27637.69',
            key2: '22.26%',
            value1: '872.51',
            value2: '11.99%'
          },
          {
            id: '粤北',
            key1: '43610.64',
            key2: '35.13%',
            value1: '1021.52',
            value2: '14.03%'
          }
        ],
        tableTitle: [
          { title: '片区', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '城镇开发边界', key: ['value1', 'value2'] }
        ],
        active: 10
      },
      data11: {
        active: 11,
        content:
          '根据试评价结果，全省现状耕地的农业适宜性评价结果主要集中适宜区和一般适宜区，少部分为不适宜区。适宜和一般适宜区内的现状耕地占到全省耕地的 97.53%。其余的 2.47%分布在不适宜区，主要零散分布于粤东西北山区和丘陵地带。评价结果与现状的吻合度较高。',
        makepeace: true,
        tableData: [
          {
            id: '适宜',
            key1: '71920.16',
            key2: '40.03%',
            value1: '17581.35',
            value2: '67.59%'
          },
          {
            id: '一般适宜',
            key1: '83164.18',
            key2: '46.29%',
            value1: '7786.69',
            value2: '29.94%'
          },
          {
            id: '不适宜',
            key1: '24559.67',
            key2: '13.67%',
            value1: '643.32',
            value2: '2.47%'
          }
        ],
        tableTitle: [
          { title: '适宜性等级', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '现状耕地', key: ['value1', 'value2'] }
        ]
      },
      data12: {
        active: 12,
        content:
          '全省范围看，适宜区的现状耕地主要集中分布在粤东、粤西平原、粤北南雄盆地和兴宁盆地等，不适宜的现状耕地主要零散分布在坡度较大的粤北山区以及粤东、粤西丘陵地带。',
        makepeace: false,
        tableData: [
          {
            id: '珠三角',
            key1: '48714.84',
            key2: '31.41%',
            value1: '5918.30',
            value2: '23.33%'
          },
          {
            id: '粤东',
            key1: '14131.55',
            key2: '9.11%',
            value1: '2492.79',
            value2: '9.83%'
          },
          {
            id: '粤西',
            key1: '30488.26',
            key2: '19.66%',
            value1: '8184.55',
            value2: '32.26%'
          },
          {
            id: '粤北',
            key1: '61749.69',
            key2: '39.82%',
            value1: '8772.11',
            value2: '34.58%'
          }
        ],
        tableTitle: [
          { title: '片区', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '现状耕地', key: ['value1', 'value2'] }
        ]
      },
      data13: {
        active: 13,
        content:
          '根据试评价结果，全省现状城镇的城镇适宜性评价结果基本上全为适宜。其中适宜的占现状城镇的 94.67%，一般适宜占 3.96%,不适宜的占 1.37%。零散分布于全省各地，且多镶嵌在适宜区内部，主要有城区的大型矿山、依山而建的住宅区、城市公园附近的开发建设等。评价结果与现状的高度吻合。',
        makepeace: false,
        tableData: [
          {
            id: '适应',
            name: '王小虎',
            key1: '93923.39',
            key2: '52.28%',
            value1: '6975.91',
            value2: '94.67%'
          },
          {
            id: '一般适应',
            name: '王小虎',
            key1: '37587.19',
            key2: '14.59%',
            value1: '3494.58',
            value2: '3.96%'
          },
          {
            id: '不适应',
            name: '王小虎',
            key1: '59508.42',
            key2: '33.13%',
            value1: '100.03',
            value2: '1.36%'
          }
        ],
        tableTitle: [
          { title: '适应性等级', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '现状城镇', key: ['value1', 'value2'] }
        ]
      },
      data14: {
        active: 14,
        content:
          '   全省范围看，评价结果为适宜的现状城镇主要分布在珠三角广州、深圳、珠海等核心区，占全省城镇的 65%；粤北地区适宜的主要为英德盆地、灯塔盆地、兴宁盆地等山间盆地，占全省城镇的 14.5%；粤西平原地区适宜的占全省城镇的 11.93%；粤东适宜的主要是汕潮揭城镇密集区，占全省 8.88%。',
        makepeace: false,
        tableData: [
          {
            id: '珠三角',
            name: '王小虎',
            key1: '39836.33',
            key2: '33.16%',
            value1: '4734.09',
            value2: '65.14%'
          },
          {
            id: '粤东',
            name: '王小虎',
            key1: '11823.67',
            key2: '9.84%',
            value1: '645.54',
            value2: '8.88%'
          },
          {
            id: '粤西',
            name: '王小虎',
            key1: '27258.56',
            key2: '22.69%',
            value1: '867.24',
            value2: '11.93%'
          },
          {
            id: '粤北',
            name: '王小虎',
            key1: '41217.03',
            key2: '34.31%',
            value1: '1021.18',
            value2: '14.05%'
          }
        ],
        tableTitle: [
          { title: '片区', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '现状城镇', key: ['value1', 'value2'] }
        ]
      },

      data15: {
        active: 15,
        content:
          '根据评价结果，全省划定的永久基本农田的农业适宜性评价结果主要为适宜和一般适宜。适宜和一般适宜的占全省永久基本农田的97.90%；不适宜的占 2.10%，零散分布于粤北山区，少部分分布在粤 东、粤西丘陵地区。评价结果与现状的吻合度较高。',
        makepeace: true,
        tableData: [
          {
            id: '适宜',
            key1: '71920.16',
            key2: '40.03%',
            value1: '17581.35',
            value2: '67.59%'
          },
          {
            id: '一般适宜',
            key1: '83164.18',
            key2: '46.29%',
            value1: '7786.69',
            value2: '29.94%'
          },
          {
            id: '不适宜',
            key1: '24559.67',
            key2: '13.67%',
            value1: '643.32',
            value2: '2.47%'
          }
        ],
        tableTitle: [
          { title: '适宜性等级', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '现状耕地', key: ['value1', 'value2'] }
        ]
      },
      data16: {
        active: 16,
        content:
          '全省范围看，适宜的永久基本农田主要分布在沿海平原及粤东西北丘陵谷地，不适宜的主要分布在粤北山区和粤东、粤西丘陵地带。',
        makepeace: false,
        tableData: [
          {
            id: '珠三角',
            name: '王小虎',
            key1: '48714.84',
            key2: '31.41%',
            value1: '6102.94',
            value2: '26.98%'
          },
          {
            id: '粤东',
            name: '王小虎',
            key1: '14131.55',
            key2: '9.11%',
            value1: '2119.48',
            value2: '9.37%'
          },
          {
            id: '粤西',
            name: '王小虎',
            key1: '30488.26',
            key2: '19.66%',
            value1: '6929.71',
            value2: '30.63%'
          },
          {
            id: '粤北',
            name: '王小虎',
            key1: '61749.66',
            key2: '39.82%',
            value1: '7467.66',
            value2: '33.02%'
          }
        ],
        tableTitle: [
          { title: '片区', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '永久基本农田', key: ['value1', 'value2'] }
        ]
      },

      data17: {
        active: 17,
        content:
          '根据评价结果，全省初步划定的城镇开发边界的城镇适宜性评价结果基本全为适宜。其中，适宜的占全省城镇开发边界的 94.19%，一般适宜的占 4.08%，不适宜的占 1.73%。不适宜的主要零散分布于粤北山区以及珠三角北部丘陵地区。评价结果与现状的吻合度较高。',
        makepeace: true,
        tableData: [
          {
            id: '适宜',
            key1: '93923.39',
            key2: '52.28%',
            value1: '16742.27',
            value2: '94.19%'
          },
          {
            id: '一般适宜',
            key1: '26212.19',
            key2: '14.59%',
            value1: '725.77',
            value2: '4.08%'
          },
          {
            id: '不适宜',
            key1: '59508.42',
            key2: '33.13%',
            value1: '307.46',
            value2: '1.73%'
          }
        ],
        tableTitle: [
          { title: '适宜性等级', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '城镇开发边界', key: ['value1', 'value2'] }
        ]
      },
      data18: {
        active: 18,
        content:
          '从全省范围看，一般适宜及以上的城镇开发边界主要分布在珠三角平原区，占全省一般适宜及以上城镇开发边界的 63.48%；占珠三角城镇开发边界的 94.61%。',
        makepeace: false,
        tableData: [
          {
            id: '珠三角',
            key1: '39836.33',
            key2: '33.16%',
            value1: '4734.09',
            value2: '65.14%'
          },
          {
            id: '粤东',
            key1: '11823.67',
            key2: '9.84%',
            value1: '645.54',
            value2: '8.88%'
          },
          {
            id: '粤西',
            key1: '27258.56',
            key2: '22.69%',
            value1: '867.24',
            value2: '11.93%'
          },
          {
            id: '粤北',
            key1: '41217.03',
            key2: '34.31%',
            value1: '1021.12',
            value2: '14.05%'
          }
        ],
        tableTitle: [
          { title: '片区', key: 'id' },
          { title: '评价结果', key: ['key1', 'key2'] },
          { title: '城镇开发边界', key: ['value1', 'value2'] }
        ]
      },
      isCurrent: '',
      currentRouter: '',
      loadEndRouter: [],
      routerData: [],
      routerIndex: null,
      forward: true,
      select2: [],
      select1: [],
      options: {}
    }
  },

  methods: {
    tabClick (item) {
      this.addLayerToMap(item.activeStep)
      switch (item.index) {
        case 1:
          this.childrenData = this.data1
          this.options = this.getEchartsData(this.data1)

          this.loadMap('synthesis', this.options)
          break

        case 2:
          this.childrenData = this.data2
          this.options = this.getEchartsData(this.data2)

          this.loadMap('synthesis', this.options)
          break

        case 3:
          this.childrenData = this.data3
          this.options = this.getEchartsData(this.data3)

          this.loadMap('synthesis', this.options)
          break

        case 4:
          this.childrenData = this.data4
          this.options = this.getEchartsData(this.data4)

          this.loadMap('synthesis', this.options)
          break

        case 5:
          this.childrenData = this.data5
          this.options = this.getEchartsData(this.data5)

          this.loadMap('synthesis', this.options)
          break

        case 6:
          this.childrenData = this.data6
          this.options = this.getEchartsData(this.data6)

          this.loadMap('synthesis', this.options)
          break

        case 7:
          this.childrenData = this.data7
          this.options = this.getEchartsData(this.data7)

          this.loadMap('synthesis', this.options)
          break

        case 8:
          this.childrenData = this.data8
          this.options = this.getEchartsData(this.data8)

          this.loadMap('synthesis', this.options)
          break

        case 9:
          this.childrenData = this.data9
          this.options = this.getEchartsData(this.data9)

          this.loadMap('synthesis', this.options)
          break

        case 10:
          this.childrenData = this.data10
          this.options = this.getEchartsData(this.data10)

          this.loadMap('synthesis', this.options)
          break

        case 11:
          this.childrenData = this.data11
          this.options = this.getEchartsData(this.data11)

          this.loadMap('synthesis', this.options)
          break

        case 12:
          this.childrenData = this.data12
          this.options = this.getEchartsData(this.data12)

          this.loadMap('synthesis', this.options)
          break
        case 13:
          this.options = this.getEchartsData(this.data13)

          this.loadMap('synthesis', this.options)
          this.childrenData = this.data13
          break

        case 14:
          this.options = this.getEchartsData(this.data14)

          this.loadMap('synthesis', this.options)
          this.childrenData = this.data14
          break

        case 15:
          this.options = this.getEchartsData(this.data15)

          this.loadMap('synthesis', this.options)
          this.childrenData = this.data15
          break

        case 16:
          this.options = this.getEchartsData(this.data16)

          this.loadMap('synthesis', this.options)
          this.childrenData = this.data16
          break
        case 17:
          this.options = this.getEchartsData(this.data17)

          this.loadMap('synthesis', this.options)
          this.childrenData = this.data17
          break

        case 18:
          this.options = this.getEchartsData(this.data18)

          this.loadMap('synthesis', this.options)
          this.childrenData = this.data18
          break
      }

      let num = this.loadEndRouter.findIndex((value, index, arr) => {
        return value == this.currentRouter
      })
      this.routerData[num] = this.childrenData
      console.log(this.routerData)
    },
    getSummaries (param) {
      const { columns, data } = param

      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总面积'
          return
        }

        const values = data.map(item => Number(item[column.property]))

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)

          sums[index] = sums[index].toFixed(2)
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    getEchartsData (data) {
      // tableData: [
      //   {
      //     id: "珠三角",
      //     key1: "39836.33",
      //     key2: "33.16%",
      //     value1: "4734.09",
      //     value2: "65.14%"
      //   },
      //   {
      //     id: "粤东",
      //     key1: "11823.67",
      //     key2: "9.84%",
      //     value1: "645.54",
      //     value2: "8.88%"
      //   },
      //   {
      //     id: "粤西",
      //     key1: "27258.56",
      //     key2: "22.69%",
      //     value1: "867.24",
      //     value2: "11.93%"
      //   },
      //   {
      //     id: "粤北",
      //     key1: "41217.03",
      //     key2: "34.31%",
      //     value1: "1021.12",
      //     value2: "14.05%"
      //   }
      // ],
      // tableTitle: [
      //   { title: "片区", key: "id" },
      //   { title: "评价结果", key: ["key1", "key2"] },
      //   { title: "城镇开发边界", key: ["value1", "value2"] }
      // ]
      let series = []
      let tableData = data.tableData
      let legend = []
      let arr = []
      let allColor = ['#00b74d', '#78ab03', '#f6a65d', '#ffdc3a', '#fffdb8']
      let color = []

      for (var i = 0; i < tableData.length; i++) {
        if (tableData[i].key1) {
          color.push(allColor[i])
          let temp = {}
          legend.push(tableData[i].id)
          temp.name = tableData[i].id
          temp.value = tableData[i].key1
          arr.push(temp)
        }
      }

      if (legend.indexOf('重要') !== -1 || legend.indexOf('适宜') !== -1) {
        color = ['#00b74d', '#f6a65d', '#fffdb8']
      }
      for (var i = 0; i < legend.length; i++) {
        series.push({
          name: legend[i],
          type: 'pie',
          radius: '50%',
          center: ['50%', '40%'],
          data: arr,
          label: {
            show: true,
            formatter: '{d}%'
          }
        })
      }

      return {
        color: color,
        title: {
          text: '评价结果各面积占比',
          left: 'center',
          // top: "bottom",
          bottom: '8%',
          textStyle: {
            color: '#464646',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          data: legend,
          bottom: 0
        },
        series: series
      }
    },
    echartsChange () {
      console.log(this.options)
      this.isEcharts = !this.isEcharts
      if (this.isEcharts) {
        this.loadMap('synthesis', this.options)
      }
    },
    // handleYearChange({ year }) {
    //   this.options.year = year;
    //   this.updateData();
    // },
    myTab (item) {
      this.isCurrent = item
      // var num1 = "";
      // var num2 = "";
      // if (this.childrenData.evaluationType === "evaluation_type-001") {
      //   (num1 = "1"), (num2 = "10");
      // }
      // if (this.childrenData.evaluationType === "evaluation_type-002") {
      //   (num1 = "2"), (num2 = "11");
      // }
      // switch (key) {
      //   case "city":
      //     this.$router.push({ path: "oceandepth", query: { index: num1 } });
      //     break;

      //   case "country":
      //     this.$router.push({ path: "oceandepth", query: { index: num2 } });
      //     break;
      // }
    }
  },
  computed: {
    tabs () {
      switch (this.currentRouter) {
        case '1':
          this.isCurrent = '渔业资源'
          return ['渔业资源', '港口航运', '工业利用']
          break
        case '2':
          return null
          break
        case '3':
          this.isCurrent = '城镇建设'
          return ['城镇建设', '农业耕作']
          break

        default:
          return ['城镇建设', '农业耕作']
          break
      }
    },
    echartsText: {
      get () {
        return this.isEcharts ? '数据详情' : '切换饼图'
      },
      set () { }
    }
  },
  components: {
    basemap: () => import("@/pages/admin/onemap/toolbarItem/basemap"),
    jumpTo,
    zoom,
    pan,
    step,
    EpfStepper
  },
  mounted () {
    let index = this.$route.query.index

    switch (index) {
      case '1':
        this.data = [
          { title: '农业承载力与现状耕地对比情况', index: 1 },
          { title: '农业承载力III等以上现状耕地分布情况', index: 2 },
          { title: '城镇承载力与现状城镇用地对比情况', index: 3 },
          { title: '城镇承载力III等以上现状城镇分布情况', index: 4 }
        ]
        this.childrenData = this.data1
        this.options = this.getEchartsData(this.data1)

        this.loadMap('synthesis', this.options)
        this.initEchart('synthesis')
        break
      case '2':
        this.data = [
          { title: '生态重要性评价结果与生态保护红线对比情况', index: 5 },
          { title: '生态重要性为重要及以上的生态保护红线分布情况', index: 6 },
          { title: '农业承载力与永久基本农田的对比情况', index: 7 },
          { title: '农业承载力为III等以上的永久基本农田分布情况', index: 8 },
          { title: '城镇承载力与城镇开发边界的对比情况', index: 9 },
          { title: '城镇承载力为III等以上的城镇开发边界分布情况', index: 10 }
        ]
        this.childrenData = this.data5
        this.options = this.getEchartsData(this.data5)

        this.loadMap('synthesis', this.options)

        break
      case '3':
        this.data = [
          { title: '农业适宜性评价结果与现状耕地对比情况', index: 11 },
          { title: '农业适宜性为一般适宜及以上现状耕地分布情况', index: 12 },
          { title: '城镇适宜性评价结果与现状城镇用对比情况', index: 13 },
          { title: '城镇适宜性为一般适宜及以上现状城镇分布情况', index: 14 }
        ]
        this.childrenData = this.data11
        this.options = this.getEchartsData(this.data11)

        this.loadMap('synthesis', this.options)

        break
      case '4':
        this.data = [
          { title: '农业适宜性评价结果与永久基本农田对比情况', index: 15 },
          {
            title: '农业适宜性为一般适宜及以上永久基本农田分布情况',
            index: 16
          },
          { title: '城镇适宜性评价结果与城镇开发边界对比情况', index: 17 },
          {
            title: '城镇适宜性为一般适宜及以上城镇开发边界分布情况',
            index: 18
          }
        ]
        this.childrenData = this.data15
        this.options = this.getEchartsData(this.data15)

        this.loadMap('synthesis', this.options)

        break
    }
  },
  created () {
    // this.currentRouter = this.$route.query.index;
    // this.loadEndRouter.push(this.currentRouter);
    // switch (this.currentRouter) {
    //   case "1":
    //     this.data = [
    //       { title: "农业承载力与现状耕地对比情况", index: 1 },
    //       { title: "农业承载力III等以上现状耕地分布情况", index: 2 },
    //       { title: "城镇承载力与现状城镇用地对比情况", index: 3 },
    //       { title: "城镇承载力III等以上现状城镇分布情况", index: 4 }
    //     ];
    //     this.childrenData = this.data1;
    //     this.options = this.getEchartsData(this.data1);
    //     this.loadMap("synthesis", this.options);
    //     break;
    //   case "2":
    //     this.data = [
    //       { title: "生态重要性评价结果与生态保护红线对比情况", index: 5 },
    //       { title: "生态重要性为重要及以上的生态保护红线分布情况", index: 6 },
    //       { title: "农业承载力与永久基本农田的对比情况", index: 7 },
    //       { title: "农业承载力为III等以上的永久基本农田分布情况", index: 8 },
    //       { title: "城镇承载力与城镇开发边界的对比情况", index: 9 },
    //       { title: "城镇承载力为III等以上的城镇开发边界分布情况", index: 10 }
    //     ];
    //     this.options = this.getEchartsData(this.data5);
    //     this.loadMap("synthesis", this.options);
    //     this.childrenData = this.data5;
    //     break;
    //   case "3":
    // }
  },
  watch: {
    $route (to, form) {
      if (to.path !== '/Adapt') {
        return
      }

      this.currentRouter = this.$route.query.index
      switch (this.currentRouter) {
        case '1':
          this.data = [
            { title: '农业承载力与现状耕地对比情况', index: 1 },
            { title: '农业承载力III等以上现状耕地分布情况', index: 2 },
            { title: '城镇承载力与现状城镇用地对比情况', index: 3 },
            { title: '城镇承载力III等以上现状城镇分布情况', index: 4 }
          ]
          this.childrenData = this.data1
          this.options = this.getEchartsData(this.data1)

          this.loadMap('synthesis', this.options)
          break

        case '2':
          this.data = [
            { title: '生态重要性评价结果与生态保护红线对比情况', index: 5 },
            { title: '生态重要性为重要及以上的生态保护红线分布情况', index: 6 },
            { title: '农业承载力与永久基本农田的对比情况', index: 7 },
            { title: '农业承载力为III等以上的永久基本农田分布情况', index: 8 },
            { title: '城镇承载力与城镇开发边界的对比情况', index: 9 },
            { title: '城镇承载力为III等以上的城镇开发边界分布情况', index: 10 }
          ]
          this.childrenData = this.data5
          this.options = this.getEchartsData(this.data5)

          this.loadMap('synthesis', this.options)
          break
        case '3':
          this.data = [
            { title: '农业适宜性评价结果与现状耕地对比情况', index: 11 },
            { title: '农业适宜性为一般适宜及以上现状耕地分布情况', index: 12 },
            { title: '城镇适宜性评价结果与现状城镇用对比情况', index: 13 },
            { title: '城镇适宜性为一般适宜及以上现状城镇分布情况', index: 14 }
          ]
          this.childrenData = this.data11
          this.options = this.getEchartsData(this.data11)

          this.loadMap('synthesis', this.options)
          break
        case '4':
          this.data = [
            { title: '农业适宜性评价结果与永久基本农田对比情况', index: 15 },
            {
              title: '农业适宜性为一般适宜及以上永久基本农田分布情况',
              index: 16
            },
            { title: '城镇适宜性评价结果与城镇开发边界对比情况', index: 17 },
            {
              title: '城镇适宜性为一般适宜及以上城镇开发边界分布情况',
              index: 18
            }
          ]
          this.childrenData = this.data15
          this.options = this.getEchartsData(this.data15)

          this.loadMap('synthesis', this.options)
          break
      }

      // this.routerIndex = this.loadEndRouter.findIndex((value, index, arr) => {
      //   return value == this.currentRouter;
      // });

      // if (this.routerIndex == -1) {
      //   this.loadEndRouter.push(this.currentRouter);
      //   switch (this.currentRouter) {
      //     case "1":
      //       this.childrenData = this.data1;

      // this.routerData.push(this.childrenData);
      //       break;

      //     case "2":
      //       this.childrenData = this.data5;
      //       this.options = this.getEchartsData(this.data5);

      //       this.loadMap("synthesis", this.options);
      //       this.routerData.push(this.childrenData);
      //       break;
      //     case "3":
      //       this.childrenData = this.data11;
      //       this.options = this.getEchartsData(this.data11);

      //       this.loadMap("synthesis", this.options);
      //       this.routerData.push(this.childrenData);
      //       break;
      //     case "4":
      //       this.childrenData = this.data15;
      //       this.options = this.getEchartsData(this.data15);

      //       this.loadMap("synthesis", this.options);
      //       this.routerData.push(this.childrenData);
      //       break;
      //   }
      //   return;
      // }

      // this.childrenData = this.routerData[this.routerIndex];
    }
  }
}
</script>
<style scoped>
@import "../../onemap/toolbarItem/style.css";
.AdaptContrastStatus {
  height: 100%;
  width: 100%;
  padding: 20px;
  font-size: 16px;
  color: rgba(32, 32, 32, 1);
}
#synthesis {
  width: 350px;
  height: 300px;
}
.AdaptContrastStatus .el-header {
  padding: 0;
}
#main {
  position: relative;
  background: #e9eef3;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.one {
  background: rgba(255, 255, 255, 1);
  color: rgba(29, 124, 228, 1);
  cursor: pointer;
}
.one.active {
  background: rgba(29, 124, 228, 1);
  color: #fff;
}

#aside {
  padding: 15px;
  margin-left: 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.filter_title_span {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 28px;
  padding-right: 10px;
  text-align: left;
  line-height: 28px;
}
.title {
  font-size: 18px;
  font-weight: 700;
  color: rgba(32, 32, 32, 1);
}

.twoInone {
  font-size: 20px;
  display: flex;
  border: 2px solid rgba(29, 124, 228, 1);
  justify-content: center;
  flex-direction: row;
  text-align: center;
}

.twoInone > div {
  flex: 1;
}

.secondButton {
  margin-left: 5px;
}
.evaluation {
}

.hideBg,
.showBg {
  margin-top: 10px;
}
.text {
  margin-left: 5px;
}

.verticalLine {
  width: 4px;
  height: 16px;
  background: rgba(82, 144, 242, 1);
  border-radius: 2px;
}

.myContent {
  padding-left: 10px;
}
.description > .el-row,
.calculations > .el-row {
  margin-top: 10px;
}
.circles {
  width: 6px;
  height: 6px;
  background: rgba(48, 48, 48, 1);
  border-radius: 50%;
  display: inline-block;
}

.add {
  height: 32px;
  color: rgba(82, 144, 242, 1);
  padding: 0 15px;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(25, 137, 217, 1);
  cursor: pointer;
}
.xLine {
  height: 2px;
  background-color: rgba(82, 144, 242, 1);
  width: 90%;
  margin-top: 10px;
  display: inline-block;
  margin-left: 5%;
}
.line {
  height: 1px;
  margin: 23px 0;
  background: rgba(198, 198, 198, 1);
}
.crude {
  font-weight: 700;
}
.summary {
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}
.showBtn,
.hideBtn {
  text-align: right;
}
.induce {
  margin-left: auto;
  color: rgba(82, 144, 242, 1);
}

#percentage {
  width: 100%;
  height: 130px;
}

#aside .el-header {
  padding: 0;
}
</style>
<style>
@import "./css/index.css";
</style>
