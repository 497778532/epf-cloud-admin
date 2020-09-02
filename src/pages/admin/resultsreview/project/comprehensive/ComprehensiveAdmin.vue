<template>
  <div class="cphStatistics EPF-table">
    <div class="filter_wrap">
      <!-- 搜索开始 -->
      <div>

        <el-form :rules="rules"
                 :model="params"
                 ref="filterData"
                 label-width="auto"
                 class="demo-ruleForm"
                 id="basicInfo">

          <div style="display:flex">

            <el-form-item label="行政区划："
                          prop="name">
              <el-cascader :props="props"
                           clearable
                           v-model="areaSelectedOptions"
                           @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="年份："
                          prop="name">
              <el-date-picker v-model="params.year"
                              type="year"
                              value-format="yyyy"
                              placeholder="请选择年份"
                              size="small"></el-date-picker>
            </el-form-item>

            <el-form-item label="调查表名称："
                          prop="name"
                          style="margin-left:30px">
              <el-select v-model="params.formType"
                         filterable
                         placeholder="全部"
                         size="small">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <div class="EPFButton EPFBlue"
                 style="margin-left:15px"
                 @click="searchList()">搜索</div>
            <div class="EPFButton EPFwirte"
                 style="margin-left:15px"
                 @click="resetFilter()">重置</div>
            <!-- <div class="EPFButton EPFwirte"
                 style="margin-left:15px"
                 @click="$router.push('/centerprice')">重置</div> -->
          </div>

        </el-form>

      </div>
      <!-- 搜索结束 -->
      <div class="filter_hd"
           style="margin-top:20px">
        <h2>自然资源综合统计调查表</h2>
      </div>
      <!-- 表格开始 -->
      <div class="tables">
        <el-tabs>
          <el-table ref="multipleTable"
                    :data="tableData"
                    border
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;">

            <el-table-column prop="division"
                             label="行政区划"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.provinceName }}</span>
                <span>{{ scope.row.cityName }}</span>
                <span>{{ scope.row.areaName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="zoneCode"
                             label="行政区划代码"
                             min-width="135"
                             align="center"></el-table-column>
            <el-table-column prop="year"
                             label="年份"
                             min-width="80"
                             align="center"></el-table-column>
            <el-table-column prop="formTypeName"
                             label="调查表名称"
                             min-width="180"
                             align="center"></el-table-column>
            <el-table-column prop="organName"
                             label="综合机关名称"
                             min-width="240"
                             align="center"></el-table-column>
            <el-table-column prop="unitPrincipal"
                             label="单位负责人"
                             min-width="135"
                             align="center"></el-table-column>
            <el-table-column prop="formPrincipal"
                             label="填表人"
                             min-width="130"
                             align="center"></el-table-column>
            <el-table-column prop="reportDate"
                             label="报出日期"
                             min-width="175"
                             align="center"></el-table-column>
            <el-table-column fixed="right"
                             label="操作"
                             min-width="200"
                             align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)"
                           type="text"
                           size="small">查看</el-button>
                <el-button type="text"
                           size="small"
                           @click="deleted(scope.row)">删除</el-button>
                <el-button type="text"
                           size="small"
                           @click="myExport(scope.row)">导出</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tabs>

        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pageNo"
                         :page-sizes="[5, 10, 15, 20]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalRecord"
                         background></el-pagination>
        </div>
      </div>
      <!-- 表格开始 -->
    </div>
  </div>
</template>

<script>

import Axios from 'axios'
import qs from 'qs'
import areaSelect from '@/assets/js/areaCascader'
export default {
  mixins: [areaSelect],
  data () {
    return {
      tableData: [
        {
          no: '1',
          division: '广东省',
          code: '440000',
          year: '2019',
          quesName: '国土空间规划编制实施情况',
          compName: '广东省自然资源厅',
          charPerson: '张三',
          fillPerson: '赵四',
          data: '2020-3-30'
        },
        {
          no: '2',
          division: '广东省',
          code: '440000',
          year: '2019',
          quesName: '国土空间规划编制实施情况',
          compName: '广东省自然资源厅',
          charPerson: '张三',
          fillPerson: '赵四',
          data: '2020-3-30'
        },
        {
          no: '3',
          division: '广东省',
          code: '440000',
          year: '2019',
          quesName: '国土空间规划编制实施情况',
          compName: '广东省自然资源厅',
          charPerson: '张三',
          fillPerson: '赵四',
          data: '2020-3-30'
        },
        {
          no: '4',
          division: '广东省',
          code: '440000',
          year: '2019',
          quesName: '国土空间规划编制实施情况',
          compName: '广东省自然资源厅',
          charPerson: '张三',
          fillPerson: '赵四',
          data: '2020-3-30'
        },
        {
          no: '5',
          division: '广东省',
          code: '440000',
          year: '2019',
          quesName: '国土空间规划编制实施情况',
          compName: '广东省自然资源厅',
          charPerson: '张三',
          fillPerson: '赵四',
          data: '2020-3-30'
        }
      ],
      pageNo: 1,
      pageSize: 5,
      totalRecord: 0,
      params: {
        province: '440000',
        city: '',
        area: '',
        year: '', // 年份
        formType: '' // 调查表名称
      },

      options: [
        { value: 'zrzygk', label: '自然资源概况' },
        { value: 'zrzyjyjylyqk', label: '自然资源节约集约利用情况' },
        { value: 'gtkjghbzssqk', label: '国土空间规划编制实施情况' },
        { value: 'gdbhqk', label: '耕地保护情况' },
        { value: 'gtkjytgzqk', label: '国土空间用途管制情况' },
        { value: 'hyjjqk', label: '海洋经济情况' },
        { value: 'wthqk', label: '围填海情况' }
      ]
    }
  },
  methods: {
    // 查看
    handleClick (row) {
      this.$router.push({
        name: 'ComprehensiveDeail',
        params: { documentId: row.documentId }
      })
    },
    // 重置
    resetFilter () {
      this.params.year = ''
      this.params.formType = ''
    },
    // 每页显示多少条
    handleSizeChange (val) {
      this.pageSize = val
      this.pageNo = 0
      this.tableList()
    },
    // 当前位于第几页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageNo = val
      this.tableList()
    },
    handleChange () {
      this.params.city = this.areaSelectedOptions[1] || ''
      this.params.area = this.areaSelectedOptions[2] || ''
    },
    // 列表
    tableList () {
      let that = this
      Axios.get(
        '/api/epf-onemap/formData/findList?formType='
        + that.params.formType
        + '&province=440000&city='
        + that.params.city
        + '&area='
        + that.params.area
        + '&year='
        + that.params.year
        + '&rows='
        + that.pageSize
        + '&page='
        + that.pageNo
      )
        .then(function (response) {
          that.tableData = response.pager.results
          // 总条数
          that.totalRecord = response.pager.totalRecord
        })
        .catch(function (error) {

        })
    },
    // 搜索
    searchList () {
      this.tableList()
    },
    deleted (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      }).then(() => {
        this.$get('/epf-onemap/formData/delete', { id: item.id }).then(res => {
          if (res.code === 0) {
            this.tableList()
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    myExport (item) {
      if (!item.documentId) {
        return
      }
      window.open('/api/epf-document/document/downloadById?id=' + item.documentId)
    }
  },

  created () {
    this.tableList()
  }
}
</script>

<style scoped>
.filter_wrap {
  min-height: 789px;
  box-sizing: border-box;
  padding: 16px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
}
.cphStatistics {
  padding: 16px 24px;
}
.cphStatistics .switchHeight_box .el-input {
  width: auto;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-right: 10px;
  text-align: right;
  line-height: 40px;
}
.cphStatistics .filter_wrap .el-input--small .el-input__inner {
  height: 40px;
}
.cphStatistics .filter_wrap .el-row {
  margin-bottom: 10px;
}
.cphStatistics .filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  padding: 0 10px;
}

.cphStatistics .filter_hd h2 {
  height: 50px;
  padding-left: 20px;
  font-size: 20px;
  background-color: #f2f2f2;
  line-height: 50px;
  font-weight: 700;
  margin-bottom: 10px;
}
.cphStatistics .block {
  margin-top: 15px;
  text-align: right;
}
.cphStatistics .primary_reset {
  margin-left: 30px;
}
</style>
<style >
.cphStatistics .el-form-item {
  margin-bottom: 0;
}
</style>
