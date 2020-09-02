<template>
  <el-main id="aside-main">
    <div class="start">
      <div class="appraisals" style="margin-top:15px">
        <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
          <div class="verticalLine"></div>
          <div class="text title">评价说明</div>
        </el-row>
        <div class="description">
          <el-row type="flex" align="middle">
            <span class="circles"></span>
            <span class="title text" style="font-size:16px">{{data.name}}：</span>
          </el-row>

          <el-row class="myContent">{{data.instructions}}</el-row>
          <el-row class="myContent">{{data.rule}}</el-row>
        </div>
      </div>

      <div>
        <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
          <div class="verticalLine"></div>
          <div class="text title">设置</div>
        </el-row>

        <div class="myContent">
          <div class="calculations">
            <el-row
              type="flex"
              align="middle"
              v-for="(item,index) in arr1 "
              :key="index"
              style="margin-top:10px"
            >
              <el-col :span="6">
                <span class="filter_title_span">选择数据:</span>
              </el-col>
              <el-col :span="14">
                <el-select v-model="selectOneArray[index]" size="small" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in data.select1"
                    :ref="item.name"
                    :id="item.id"
                    :dictKey="item.id"
                    :label="item.name"
                    :value="item.id"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="text-align:right">
                <div v-if="index===0" style="cursor:pointer;height:40px" @click="addData('arr1')">
                  <img :src="addImg" style="height:100%" alt />
                </div>

                <div v-else style="cursor:pointer;height:40px" @click="deleted(index,'arr1')">
                  <img :src="subImg" style="height:100%" alt />
                </div>

                <!-- <el-row class="add" type="flex" justify="center" align="middle">
                      <i v-if="index===0" class="el-icon-plus crude" @click="addData('arr1')"></i>
                      <i v-else class="el-icon-minus crude" @click="deleted(index,'arr1')"></i>
                </el-row>-->
              </el-col>
            </el-row>
            <el-row style="color:rgba(170,170,170,1);font-size:14px;margin-top">{{data.remarks1}}</el-row>
          </div>

          <div class="line"></div>

          <el-row
            type="flex"
            align="middle"
            v-for="(item,index) in arr2 "
            :key="index"
            style="margin-top:10px"
          >
            <el-col :span="6">
              <span class="filter_title_span">选择模型:</span>
            </el-col>
            <el-col :span="14">
              <el-select v-model="selectTwoArray[index]" size="small" placeholder="请选择">
                <el-option
                  v-for="(item,index) in data.select2"
                  :ref="item.modelName"
                  :id="item.id"
                  :dictKey="item.id"
                  :label="item.modelName"
                  :value="item.id"
                  :key="index"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" style="text-align:right">
              <div v-if="index===0" style="cursor:pointer;height:40px" @click="addData('arr2')">
                <img :src="addImg" style="height:100%" alt />
              </div>

              <div v-else style="cursor:pointer;height:40px" @click="deleted(index,'arr2')">
                <img :src="subImg" style="height:100%" alt />
              </div>
            </el-col>
          </el-row>

          <el-row
            style="color:rgba(170,170,170,1);font-size:14px;margin-top:10px"
          >{{data.computingMethod}}</el-row>
        </div>
      </div>

      <el-row type="flex" justify="end" style="margin-top:15px">
        <div class="EPFButton EFPwirte" @click="resetFilter()">重置</div>
        <div class="EPFButton EFPcommon secondButton" @click="myClick()">开始评价</div>
      </el-row>
    </div>

    <div class="end" v-if="endData.showEnd&&data.type!=='landundulate'">
      <div class="subsume">
        <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
          <div class="verticalLine"></div>
          <div class="text title">评价汇总</div>
        </el-row>

        <more :introduce="data.echartsContent"></more>

        <div id="percentage" ref="percentage"></div>
      </div>

      <div>
        <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
          <div class="verticalLine"></div>
          <div class="text title">等级概括</div>
          <div class="induce">导出数据</div>
        </el-row>
        <div class="myContent">
          <el-table :data="endData.gradeZoning" style="width: 100%;margin-top:15px" border>
            <el-table-column label min-width="80" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span hit size="medium">{{ scope.row.level }}</span>
              </template>
            </el-table-column>
            <el-table-column label="网格数量" min-width="80" align="center">
              <template slot-scope="scope">
                <span hit size="medium">{{ scope.row.grid }}</span>
              </template>
            </el-table-column>
            <el-table-column label="覆盖面积" min-width="90" align="center">
              <template slot-scope="scope">
                <span hit size="medium">{{ scope.row.cover }}</span>
              </template>
            </el-table-column>
            <el-table-column label="比例" min-width="90" align="center">
              <template slot-scope="scope">
                <span hit size="medium">{{ scope.row.proportion }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div>
        <el-row class="evaluation" type="flex" align="middle" style="margin-top:15px">
          <div class="verticalLine"></div>
          <div class="text title">区域概括</div>
          <div class="induce">导出数据</div>
        </el-row>
        <div class="myContent">
          <el-table :data="endData.confluenceZoning" style="width: 100%;margin-top:15px" border>
            <el-table-column label min-width="80" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span hit size="medium">{{ scope.row.division }}</span>
              </template>
            </el-table-column>
            <el-table-column label="网格数量" min-width="80" align="center">
              <template slot-scope="scope">
                <span hit size="medium">{{ scope.row.grid }}</span>
              </template>
            </el-table-column>
            <el-table-column label="覆盖面积" min-width="90" align="center">
              <template slot-scope="scope">
                <span hit size="medium">{{ scope.row.cover }}</span>
              </template>
            </el-table-column>
            <el-table-column label="比例" min-width="90" align="center">
              <template slot-scope="scope">
                <span hit size="medium">{{ scope.row.proportion }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import echarts from 'echarts'
import more from './more'
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    endData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      num: 0,
      addImg: require('@/assets/plananalyse/add.png'),
      subImg: require('@/assets/plananalyse/reduce.png'),
      isHide: true,
      arr1: [{}],
      arr2: [{}],
      selectOneArray: [],

      selectTwoArray: []
    }
  },
  methods: {
    myClick() {
      let analysisDataId = Array.isArray(this.selectOneArray)
        ? this.getIDs(this.selectOneArray)
        : this.selectOneArray
      let modellibraryId = Array.isArray(this.selectTwoArray)
        ? this.getIDs(this.selectTwoArray)
        : this.selectTwoArray
      if (!analysisDataId) {
        this.$message('请选择数据')
        return
      }
      if (!modellibraryId) {
        this.$message('请选择模型')
        return
      }
      this.$emit('appraisals', analysisDataId, modellibraryId)
    },
    getIDs: function(array) {
      var ids = ''
      for (var i = 0; i < array.length; i++) {
        ids += array[i]
        if (i != array.length - 1) {
          ids += ','
        }
      }
      return ids
    },
    initEchart() {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.percentage)
        this.$refs.percentage.style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    },
    tabClick(key) {
      this.$emit('tabClick', key)
    },
    resetFilter() {
      this.selectOneArray = []
      this.selectTwoArray = []
    },
    useDrawLine() {
      console.log(this.endData)
      this.$nextTick(function() {
        setTimeout(() => {
          let useChart = echarts.init(this.$refs.percentage)
          useChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'right',
              left: '40%',
              data: this.endData.echartsTableData || []
              // textStyle:{
              //   color:'rgba(48,48,48,1);'
              // }
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['20%', '50%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.endData.evaluateConfluence || []
              }
            ]
          })
        }, 1000)
      })
    },
    addData(key) {
      this[key].push({})
    },
    deleted(index, key) {
      this[key].splice(index, 1)
    }
  },

  components: { more },
  mounted() {},
  computed: {},
  watch: {
    endData(val) {
      this.initEchart()
      this.useDrawLine()
    }
  }
}
</script>
<style >
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

  border: 2px solid rgba(29, 124, 228, 1);
}

.twoInone > div {
  text-align: center;
  cursor: pointer;
  width: 50%;
  float: left;
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
<style >
#main-container .el-table td,
#main-container .el-table th {
  padding: 6px 0;
}

#aside .el-row {
  margin-bottom: 0;
}
</style>
