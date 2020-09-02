<template>
  <!-- <div>预警管理</div> -->
  <div class="page-body EPF-table"
       id="serveBody">
    <div class="filter_wrap">
      <div class="SelectButton">
        <!-- <el-button @click="batchExport">导出</el-button>
        <el-button icon="el-icon-finished"
                   @click="flexSwitch">筛选类别</el-button> -->
        <div class="button_kuang"
             @click="batchExport">导出</div>
        <div class="button_qian"
             @click="flexSwitch">筛选类别</div>
      </div>
      <!-- <el-collapse-transition> -->
      <div class="switchHeight_box"
           v-if="isShow">
        <el-row style="margin-bottom:20px;">
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">预警编号：</span>
            <el-input v-model="filterData.yujingNo"
                      size="small"
                      style="width:calc(100% - 120px);"
                      placeholder="请输入预警编号"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">预警指标：</span>
            <el-input v-model="filterData.yujingIndex"
                      size="small"
                      style="width:calc(100% - 120px);"
                      placeholder="请输入预警指标"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">所属区域：</span>
            <el-cascader size="small"
                         style="width:calc(100% - 120px);"
                         :props="props"
                         clearable
                         v-model="areaSelectedOptions"
                         @change="areaSelect()"></el-cascader>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box_end">
            <span class="filter_title__custom_two">状态：</span>
            <el-select v-model="filterData.yjStatus"
                       size="small"
                       placeholder="全部"
                       style="width:calc(100% - 60px);">
              <el-option label="预警"
                         value="1"></el-option>
              <el-option label="已正常"
                         value="0"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:0px;">
          <el-col :span="9"
                  class="filter_title_box">
            <span class="filter_title__custom">预警时间：</span>
            <el-date-picker v-model="yujingTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            style="width:calc(100% - 120px);"></el-date-picker>
          </el-col>
          <el-col :span="11">
            <div style="width:100%;height:40px;"></div>
          </el-col>
          <el-col :span="4"
                  style="display:flex;justify-content:flex-end;">
            <div class="primary_reset"
                 @click="resetFilter()">重置</div>
            <div class="primary_search"
                 @click="searchList()">搜索</div>
          </el-col>
        </el-row>
      </div>
      <!-- </el-collapse-transition> -->
      <el-tabs style="margin-top:24px;">
        <!-- <div class="toolsTitleBox">
          <span class="toolsTitle">预警列表</span>
          <div class="oper">
            <span @click="handelClickAdd">
              <i class="el-icon-plus"></i>添加
            </span>
          </div>
        </div> -->
        <el-table ref="multipleTable"
                  stripe
                  :data="warningList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:100px;"
                  border>
          <el-table-column prop="warnNo"
                           label="预警编号"
                           min-width="250"
                           align="center"></el-table-column>
          <el-table-column prop="zhiBiaoF"
                           label="指标分类"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="warnNumber"
                           label="预警指标"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="area"
                           label="所属区域"
                           min-width="200"
                           align="center">
            <template slot-scope="scope">
              <span style="color:#70b603;">{{scope.row.area}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="yuZhi"
                           label="预警值"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="shiZhi"
                           label="实际值"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="unit"
                           label="单位"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="warnTime"
                           label="预警时间"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="warnReport"
                           label="预警报告"
                           min-width="200"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="handelClickDownload(scope.row)">{{scope.row.warnReport}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="delTime"
                           label="预警消除时间"
                           min-width="300"
                           align="center"></el-table-column>
          <el-table-column prop="type"
                           label="状态"
                           min-width="300"
                           align="center">
            <template slot-scope="scope">
              <span style="color:#027db4;">{{scope.row.type}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           min-width="200"
                           fixed="right"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         v-if="scope.row.delTime==''"
                         @click="handelClickRefresh(scope.row)">刷新指标</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination background
                         layout="total,prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10,15,20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="this.warningList.length"
                         :current-page.sync="currentPage"
                         :page-size="pageSize"></el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import qs from 'qs'
import Bus from '../../../../utils/bus'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import Vue from 'vue'
import areaSelect from '../../../../assets/js/areaCascader'

Vue.component(CollapseTransition.name, CollapseTransition)
export default {
  name: 'earlywarningmanage',
  mixins: [areaSelect],
  data () {
    return {

      warningList: [
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '繁荣国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '',
          type: '预警'
        },
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '繁荣国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '2019-1-1 1:1:2',
          type: '已正常'
        },
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '安全国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '',
          type: '已正常'
        },
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '安全国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '',
          type: ''
        },
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '安全国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '',
          type: ''
        },
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '安全国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '',
          type: ''
        },
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '安全国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '',
          type: ''
        },
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '安全国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '',
          type: ''
        },
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '安全国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '',
          type: ''
        },
        {
          warnNo: 'PG-20191021-001',
          zhiBiaoF: '安全国土',
          warnNumber: '永久基本农田保护线',
          area: '广州市',
          yuZhi: '87',
          shiZhi: '86',
          unit: '万亩',
          warnTime: '2019-1-1 1:1:1',
          warnReport: '下载',
          delTime: '',
          type: ''
        }
      ],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: false,
      filterData: {
        yujingNo: '', // 预警编号
        yujingIndex: '', // 预警指标
        yjStatus: '' // 状态
      },
      yujingTime: '', // 预警时间

      params: {
        cantonProvince: '440000',
        cantonCity: '',
        cantonArea: '',
        yujingNo: '', // 预警编号
        yujingIndex: '', // 预警指标
        yjStatus: '', // 状态
        searchTimeBegin: '', // 时间
        searchTimeEnd: '' // 时间
      },

      isShow: false,

      // 日期选择器
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    // 刷新指标
    handelClickRefresh (item) {
      // this.$message.success("指标已刷新");
    },
    // 下载指标报告
    handelClickDownload (item) {
      // this.$message.success("正在下载中");
    },
    // 导出
    batchExport () {
      // this.$message.warning("导出中...");
    },
    // 筛选
    flexSwitch () {
      this.isShow = !this.isShow
    },

    // // 获取列表
    getList () {
      //   this.loading = true;
      //   let params = this.params;
      //   params["page"] = this.pageNo;
      //   params["rows"] = this.pageSize;
      //   this.$get(
      //     `/epf-result-review/admin/revproject/getProjectLibraryList`,
      //     params
      //   ).then(res => {
      //     console.log(res);
      //     if (res.code == "0") {
      //       this.proList = res.pager.results;
      //       console.log(this.proList);
      //       this.pageNo = res.pager.pageNo;
      //       this.pageSize = res.pager.pageSize;
      //       this.totalPage = res.pager.totalPage;
      //       this.totalRecord = res.pager.totalRecord;
      //       this.loading = false;
      //     } else {
      //       this.loading = false;
      //       this.$message.error(res.msg); //失败
      //       return;
      //     }
      //   });
    },

    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.yujingTime = ''
      this.areaSelectedOptions = ['440000']
      this.getList()
    },
    searchList () {
      this.params = this.filterData
      this.params['province'] = this.areaSelectedOptions[0]
      this.params['city'] = this.areaSelectedOptions[1]
      this.params['area'] = this.areaSelectedOptions[2]
      if (this.yujingTime) {
        this.params['searchTimeBegin'] = this.yujingTime[0]
        this.params['searchTimeEnd'] = this.yujingTime[1]
      }
      this.getList()
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      // this.pageSize = val // 显示条数改变
      // this.getList()
      this.$data.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      // this.pageNo = val // 页码改变
      // this.getList()
      this.currentPage = val // 页码改变
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style scoped>
#serveBody {
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
  height: 60px;
  line-height: 60px;
  background: rgba(211, 211, 211, 0.1);
  color: #606266;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #ebeef5;
  margin-bottom: 5px;
}
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
  display: inline-block;
  width: 80px;
  height: 32px;
  background-color: #1e7ae5;
  border-radius: 2px;
  margin-right: 40px;
  text-align: center;
  line-height: 36px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
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
}
.filter_wrap[data-v-60fb67bb] {
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
.filter_title_box_end {
  display: flex;
  justify-content: flex-end;
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
.filter_title__custom_two {
  box-sizing: border-box;
  width: 60px;
  min-width: 60px;
  max-width: 60px;
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
.primary_search {
  width: 96px;
  height: 40px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
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
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.coverageBox {
  width: 100%;
  height: 100%;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0 20px;
  margin-bottom: 20px;
}
.loaderBox {
  width: 100%;
  height: 40px;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  margin-bottom: 20px;
  font-size: 20px;
}
.loaderBox span {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.coverageTitleBox {
  height: 40px;
  border-bottom: 2px solid #e4e7ed;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.coverageTitle {
  height: 40px;
  width: 100px;
  padding: 0 10px;
  font-size: 18px;
  color: #1082c2;
  margin-left: 20px;
  border-bottom: 2px solid #3399ff;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.flexibleSwitch {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  font-size: 18px;
  color: #1082c2;
}
.SelectButton {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}
</style>
<style>
#serveBody .default,
#serveBody .error,
#serveBody .success {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: relative;
  top: 1px;
  right: 5px;
}
#serveBody .default {
  background: #b6b6b6;
  border: 2px solid #cfcfcf;
}
#serveBody .error {
  background: #fd4041;
  border: 2px solid #ff6c6f;
}
#serveBody .success {
  background: #92b62d;
  border: 2px solid #bfd482;
}
#serveBody .filter_wrap .el-input--small .el-input__inner {
  height: 40px;
}
#serveBody .filter_wrap .el-row {
  margin-bottom: 10px;
}
#serveBody .filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  padding: 0 10px;
}

#serveBody .filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 40px;
  color: #8dc4f7;
}
#serveBody .filter_wrap .el-input__prefix,
#serveBody .el-input__suffix {
  width: 25px;
  font-size: 16px;
}
#serveBody .el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
#serveBody .el-input__inner {
  height: 40px;
  /* border: 1px solid #c6c6c6; */
}
#serveBody .el-pagination .el-input__inner {
  height: 28px;
  /* border: 1px solid #c6c6c6; */
}
</style>
