<template>
  <!-- 查看质检结果 -->
  <div class="page-body EPF-table">
    <div class="filter_wrap">
      <!-- <div class="reportBox">
        目录及文件规范性质检详情
        <el-button style="float:right;margin-right:60px">导出</el-button>
      </div> -->
      <div class="reportBox">
        <epf-title title="目录及文件规范性质检详情"
                   style="margin:5px 10px;"></epf-title>
        <div class="button_kuang">导出</div>
      </div>
      <el-tabs v-model="activeName2"
               type="border-card"
               @tab-click="handleClick"
               style="margin-top:20px">
        <el-tab-pane name="first">
          <span slot="label">
            错误信息列表
            <span>(10)</span>
          </span>
          <el-table :data="tableData.slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)"
                    stripe
                    style="width: 100%;min-height:80px;"
                    border>
            <el-table-column prop="date"
                             label="序号"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column prop="name"
                             label="检查类型"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column prop="province"
                             label="父文件夹"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column prop="city"
                             label="文件"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#70B603">{{scope.row.city}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address"
                             label="错误原因"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#027DB4">{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="zip"
                             label="说明"
                             min-width="150"
                             align="center"></el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange1"
                           @current-change="handleCurrentChange1"
                           :total="this.tableData.length"
                           :current-page.sync="currentPage1"
                           :page-size="pageSize1"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane name="two">
          <span slot="label">
            任务信息列表
            <span>(15)</span>
          </span>
          <el-table :data="tableDataInfo.slice((currentPage2-1)*pageSize2,currentPage2*pageSize2)"
                    stripe
                    style="width: 100%;min-height:80px;"
                    border>
            <el-table-column prop="date"
                             label="序号"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column prop="name"
                             label="检查类型"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column prop="province"
                             label="父文件夹"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column prop="city"
                             label="文件"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#70B603">{{scope.row.city}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address"
                             label="错误原因"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
                <span style="color:#027DB4">{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="zip"
                             label="说明"
                             min-width="150"
                             align="center"></el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange2"
                           @current-change="handleCurrentChange2"
                           :total="this.tableDataInfo.length"
                           :current-page.sync="currentPage2"
                           :page-size="pageSize2"></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'qualityresult',
  data () {
    return {
      activeName2: 'first',
      tableData: [
        {
          date: '1',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '2',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '3',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '4',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '5',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '6',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '7',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '8',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '9',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '10',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        }
      ],
      tableDataInfo: [
        {
          date: '1',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '2',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '3',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '4',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '5',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '6',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '7',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '8',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '9',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '10',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '11',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '12',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '13',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '14',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        },
        {
          date: '15',
          name: '目录及文件规范性',
          province: '...广州市**数据库电子成果数据文档数据',
          city: '440100规划文本',
          address: '缺少必要文件',
          zip: ''
        }
      ],

      // 页码
      currentPage1: 1,
      pageNo1: 1, // 页码
      pageSize1: 5, // 每页条数
      totalPage1: 1,
      totalRecord1: 1,

      // 页码
      currentPage2: 1,
      pageNo2: 1, // 页码
      pageSize2: 5, // 每页条数
      totalPage2: 1,
      totalRecord2: 1
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },

    handleSizeChange1 (val) {
      // 每页条数改变时触发
      // this.pageSize = val; // 显示条数改变
      this.$data.pageSize1 = val
      this.currentPage1 = 1
    },
    handleCurrentChange1 (val) {
      // 当前页发生改变时触发
      this.currentPage1 = val // 页码改变
    },

    handleSizeChange2 (val) {
      // 每页条数改变时触发
      // this.pageSize = val; // 显示条数改变
      this.$data.pageSize2 = val
      this.currentPage2 = 1
    },
    handleCurrentChange2 (val) {
      // 当前页发生改变时触发
      this.currentPage2 = val // 页码改变
    }
  }
}
</script>
<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.reportBox {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.report_core {
  line-height: 60px;
  color: #333333;
  font-size: 16px;
  overflow: hidden;
  padding-left: 24px;
}
.report_core > div {
  float: left;
}
.report_core > div:nth-child(2) {
  margin-left: 100px;
}
.report_core a {
  color: #139ee8 !important;
}
.information {
  overflow: hidden;
  margin-top: 20px;
}
.information > div {
  height: 60px;
  line-height: 60px;
  float: left;
  border: 1px solid #ddd;
  text-align: center;
  width: 180px;
  font-size: 16px;
  color: #333333;
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
</style>
