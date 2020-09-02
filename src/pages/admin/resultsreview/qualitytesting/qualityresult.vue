<template>
  <!-- 查看质检结果 -->
  <div class="page-body EPF-table">
    <div class="filter_wrap">
      <div class="report">
        <!-- <div class="report-title">质检报告</div> -->
        <epf-title title="质检报告"
                   style="margin:5px 10px;"></epf-title>
        <div class="report_core">
          <div>质检报告.pdf</div>
          <div class="cural">
            <span>预览</span>
            <span style="margin-left:20px">下载</span>
          </div>
        </div>
      </div>
      <div class="particulars">
        <!-- <div class="report-title">质检结果详细内容</div> -->
        <epf-title title="质检结果详细内容"
                   style="margin:5px 10px 28px;"></epf-title>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  stripe
                  style="width: 100%;min-height:80px;"
                  border>
          <el-table-column prop="date"
                           label="序号"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column prop="name"
                           label="检查分类"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column prop="province"
                           label="检查项目"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column prop="city"
                           label="检查结果"
                           min-width="150"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.city==='检查通过'"
                    style="color:#70B603">检查通过</span>
              <span v-if="scope.row.city==='检查不通过'"
                    style="color:#D9001B">检查不通过</span>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           min-width="150"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="handelClickCheck(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination background
                         layout="total, prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10,15,20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="this.tableData.length"
                         :current-page.sync="currentPage"
                         :page-size="pageSize"></el-pagination>
        </div>
      </div>
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
      tableData: [
        {
          date: '1',
          name: '数据完整性检查',
          province: '目录及文件规范性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '2',
          name: '',
          province: '数据格式正确性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '3',
          name: '',
          province: '数据有效性',
          city: '检查不通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '4',
          name: '空间数据基本检查',
          province: '图层完整性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '5',
          name: '',
          province: '数据基础',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '6',
          name: '',
          province: '行政区范围',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '7',
          name: '属性数据标准性检查',
          province: '图层名称规范性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '8',
          name: '',
          province: '属性数据结构一致性',
          city: '检查不通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '9',
          name: '',
          province: '代码一致性',
          city: '检查不通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '10',
          name: '',
          province: '数值范围符合性',
          city: '检查不通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '11',
          name: '',
          province: '编号唯一性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '12',
          name: '',
          province: '字段必填性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '13',
          name: '',
          province: '图层内逻辑一致性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '14',
          name: '',
          province: '图层间属性一致性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '15',
          name: '空间图形拓扑检查',
          province: '点层内拓扑关系',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '16',
          name: '',
          province: '线层内拓扑关系',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '17',
          name: '',
          province: '面层内拓扑关系',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '18',
          name: '',
          province: '线面间拓扑关系',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '19',
          name: '',
          province: '面层间拓扑关系',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '20',
          name: '',
          province: '碎线检查',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '21',
          name: '',
          province: '碎面检查',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '22',
          name: '表格数据检查',
          province: '表格完整性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '23',
          name: '',
          province: '表格数据结构一致性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '24',
          name: '',
          province: '表格数据代码一致性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '25',
          name: '',
          province: '表格数值范围符合性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '26',
          name: '',
          province: '表格字段编号唯一性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '27',
          name: '',
          province: '表格字段必填性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '28',
          name: '图数一致性检查',
          province: '图数一致性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        },
        {
          date: '29',
          name: '图数一致性检查',
          province: '上级指标符合性',
          city: '检查通过',
          address: '查看详情',
          zip: 200333
        }
      ],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    handelClickCheck () {
      let title = '目录及文件规范性质检详情'
      let routerPath = 'qualitycatalog'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      // this.pageSize = val; // 显示条数改变
      this.$data.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.currentPage = val // 页码改变
    }
  }
}
</script>
<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.report-title {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
  color: #333333;
  font-size: 22px;
  padding-left: 20px;
  position: relative;
}
.report-title:before {
  content: "";
  width: 4px;
  height: 38px;
  background: #139ee8;
  position: absolute;
  left: 2px;
  top: 8px;
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
.cural > span {
  color: #139ee8;
  cursor: pointer;
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
