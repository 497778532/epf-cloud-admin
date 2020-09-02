<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row style="margin-bottom:50px;">
          <el-col :span="5"
                  class="filter_title_box">
            <span class="filter_title__custom">年份选择：</span>
            <el-select v-model="yyyy"
                       placeholder="请选择年份"
                       @change="yyyyChange"
                       style="width:calc(100% - 120px)">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="5"
                  class="filter_title_box">
            <span class="filter_title__custom">月份选择：</span>
            <el-select v-model="mm"
                       placeholder="请选择月份"
                       @change="mmChange"
                       style="width:calc(100% - 120px)">
              <el-option v-for="item in options2"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="10"
                  class="filter_title_box">
            <span class="filter_title__custom">统计时间：</span>
            <el-date-picker v-model="params.selectDate"
                            style="width:calc(100% - 120px)"
                            type="daterange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="dateChange"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
          <el-col :span="4"
                  style="display:flex;justify-content:flex-end;">
            <div class="primary_reset"
                 @click="clearList()">重置</div>
            <div class="primary_search"
                 @click="searchList()">查询</div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-button class="cbutt"
                   type="primary"
                   plain>{{title}}</el-button>
      </el-row>
      <div style="width:100%;height:500px;display:flex;">
        <graphicsChart id="high"
                       style="width:65%;height:100%;"
                       :option="option1"></graphicsChart>
        <graphicsChart id="high2"
                       style="width:35%;height:100%;"
                       :option="option2"></graphicsChart>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.headerpop {
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  line-height: 30px;
}
.box-body {
  width: 100%;
  overflow: auto;
}
.pageName {
  padding-left: 15px;
  margin-bottom: 15px;
  border-left: 4px solid rgba(26, 188, 156, 6);
}
.toolsTitleBox {
  height: 55px;
  line-height: 55px;
  background: rgba(211, 211, 211, 0.1);
  color: #606266;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #ebeef5;
}
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
  display: inline-block;
  width: 80px;
  height: 32px;
  background-color: #ffa000;
  border-radius: 2px;
  margin-right: 16px;
  text-align: center;
  line-height: 36px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.oper span:nth-child(2) {
  border: solid 1px #d3d4d6;
  color: #606266;
  background: #fff;
}
.toolsTitle {
  line-height: 40px;
  font-size: 15px;
  margin-left: 25px;
}
.toolsTips {
  line-height: 40px;
  font-size: 14px;
  margin-left: 10px;
  color: red;
}
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  min-height: 789px;
  box-sizing: border-box;
  padding: 16px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  background: #fff;
}
.switchHeight_box {
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.filter_title_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.filter_title__custom {
  box-sizing: border-box;
  width: 90px;
  min-width: 90px;
  max-width: 90px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.monad {
  display: block;
  width: 48px;
  position: absolute;
  top: 7px;
  left: 5px;
}
.primary {
  width: 88px;
  height: 34px;
  background-color: #ffa000;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 36px;
  display: inline-block;
  cursor: pointer;
  margin-left: 30px;
}
.primary_search {
  width: 96px;
  height: 40px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.primary_reset {
  width: 96px;
  height: 40px;
  background: rgba(233, 243, 255, 1);
  border-radius: 2px;
  font-size: 16px;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.flexibleSwitch {
  display: block;
  float: right;
  color: #424242;
  cursor: pointer;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
<style>
.cbutt {
  text-align: center;
  margin: 0 auto;
  display: block;
  font-size: 1.5em;
  border: 0 white solid;
  margin: 24px auto;
}
.high {
  width: 70em;
  height: auto;
  margin: 2em auto;
  float: left;
  display: inline;
}
.high2 {
  /*width: 30em;*/
  height: auto;
  margin: 2em auto;
  float: left;
  display: inline;
}
.default,
.error,
.success {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: relative;
  top: 1px;
  right: 5px;
}
.default {
  background: #b6b6b6;
  border: 2px solid #cfcfcf;
}
.error {
  background: #fd4041;
  border: 2px solid #ff6c6f;
}
.success {
  background: #92b62d;
  border: 2px solid #bfd482;
}
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  font-size: 14px;
  padding: 0 10px;
}

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #b3b3b3;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
</style>
<script>
// 导入chart组件
var myvue = {}
import graphicsChart from '@/pages/admin/system/graphics/graphicsChart'
export default {
  name: 'graphics',
  components: {
    graphicsChart
  },
  data () {
    return {
      option1: {},
      option2: {},
      // 搜索表单
      params: {
        selectDate: '',
        startTime: '',
        endTime: ''
      },
      title: '',
      pickerOptions: {
        disabledDate (time) {
          let curDate = (new Date()).getTime()
          let three = 30 * 24 * 3600 * 1000
          let threeMonths = curDate - three
          // return time.getTime() > Date.now() || time.getTime() < threeMonths;
          return time.getTime() > Date.now()
        }
      },
      type: 0, // 类型  0-（x轴是年月日，时间控件传时间查询，或者默认没有传值） 1-只传了年  2-传了年月
      options: [],
      options2: [
        {
          value: 1,
          label: '一月'
        }, {
          value: 2,
          label: '二月'
        },
        {
          value: 3,
          label: '三月'
        }, {
          value: 4,
          label: '四月'
        },
        {
          value: 5,
          label: '五月'
        }, {
          value: 6,
          label: '六月'
        },
        {
          value: 7,
          label: '七月'
        }, {
          value: 8,
          label: '八月'
        },
        {
          value: 9,
          label: '九月'
        }, {
          value: 10,
          label: '十月'
        },
        {
          value: 11,
          label: '十一月'
        }, {
          value: 12,
          label: '十二月'
        }
      ],
      yyyy: '',
      mm: ''
    }
  },
  beforeCreate: function () {
    myvue = this
  },
  mounted: function () {
    var date = new Date()
    var year = date.getFullYear()

    this.options = [{
      value: year,
      label: year
    }, {
      value: year - 1,
      label: year - 1
    }]

    this.getCountData()
  },
  methods: {
    // 点击查询按钮
    searchList: function () {
      this.getCountData()
    },
    // 点击重置按钮
    clearList () {
      this.params.startTime = ''
      this.params.endTime = ''
      this.params.selectDate = []
      this.yyyy = ''
      this.mm = ''
      this.type = 0
      this.getCountData()
    },
    // 时间控件值改变事件
    dateChange (val) {
      if (val) {
        this.params.startTime = val[0]
        this.params.endTime = val[1]

        this.yyyy = ''
        this.mm = ''
        this.type = 0
      }
    },
    // 年份，值改变
    yyyyChange (val) {
      this.params.startTime = ''
      this.params.endTime = ''
      this.params.selectDate = []
      if (!this.mm) {
        this.type = 1
      } else {
        this.type = 2
      }
    },
    // 月份，值改变
    mmChange (val) {
      this.params.startTime = ''
      this.params.endTime = ''
      this.params.selectDate = []
      if (!this.yyyy) {
        this.yyyy = 2019
      }
      this.type = 2
    },
    // 获取统计数据
    getCountData () {
      // 查询机构集合
      let that = this
      that.$post('/epf-monitor/log/logShow', { startTime: this.params.startTime, endTime: this.params.endTime, type: that.type, yyyy: that.yyyy, month: that.mm }).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        if (res.code == 0) {
          // 获取数据
          var map = res.map
          var sector = map.sector
          // 设置标题
          this.title = map.title
          // 设置图表数据
          this.option1 = {
            chart: {
              type: 'spline'
            },
            title: {
              text: ''
            },
            subtitle: {
              text: ' '
            },
            xAxis: {
              categories: map.categories
            },
            yAxis: {
              title: {
                text: '单位/次'
              },
              labels: {
                formatter: function () {
                  return this.value + '次'
                }
              }
            },
            tooltip: {
              shared: true
            },
            plotOptions: {
            },
            series: [{
              name: '异常日志',
              marker: {
                symbol: 'abnormal'
              },
              color: 'red',
              data: map.abnormal
            }, {
              name: '操作日志',
              marker: {
                symbol: 'operation'
              },
              color: 'green',
              data: map.operation
            }, {
              name: '登录日志',
              marker: {
                symbol: 'login'
              },
              color: 'blue',
              data: map.login
            }]
          }
          this.option2 = {
            title: {
              text: '日志所占比',
              align: 'center',
              verticalAlign: 'middle',
              y: 50
            },
            tooltip: {
              headerFormat: '{series.name}<br>',
              pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '0px 1px 2px black'
                  }
                },
                startAngle: -90, // 圆环的开始角度
                endAngle: 90, // 圆环的结束角度
                center: ['50%', '75%']
              }
            },
            series: [{
              type: 'pie',
              name: '日志占比',
              innerSize: '50%',
              data: [
                {
                  name: '异常(' + sector.abnormal + '次)',
                  y: sector.abnormal,
                  color: 'red'
                },
                {
                  name: '操作(' + sector.operation + '次)',
                  y: sector.operation,
                  color: 'green'
                },
                {
                  name: '登录(' + sector.login + '次)',
                  y: sector.login,
                  color: 'blue'
                }
              ]
            }]
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
