<template>
  <div class="EPF-table configuration">
    <div class="openOrClose">
      <el-switch v-model="value"
                 active-color="#13ce66"
                 inactive-color="#ccc"></el-switch>
    </div>
    <div class="rule"
         v-if="value">
      <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                style="width: 100%"
                border
                stripe
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)">
        <el-table-column label="姓名"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="主负责区域"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.main }}</span>
          </template>
        </el-table-column>
        <el-table-column label="次负责区域"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.minor }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         label="状态"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.state=='1'"
                 class="EPFButton EPFplain">工作中</div>
            <div v-if="scope.row.state=='2'"
                 class="EPFButton EPFsuccess">空闲</div>
            <div v-if="scope.row.state=='3'"
                 class="EPFButton EPFerror">休假</div>
            <div v-if="scope.row.state=='4'"
                 class="EPFButton EPFerror">离职</div>
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span class="list-style: none;">
              <el-button type="text"
                         @click="btnClick(scope.row,'dispatchlistDetail')">配置负责区域</el-button>
              <el-button @click="btnClick(scope.row,'remove')"
                         type="text">修改状态</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align:right;margin:22px 0px;">
        <el-pagination background
                       layout="total,prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10,15,20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="this.tableData.length"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"></el-pagination>
      </div>
      <div class="select">
        <el-row>
          <span>人员状态派发设置：</span>
          <span>
            <el-checkbox-group v-model="job"
                               @change="handleCheckedCitiesChange1">
              <el-checkbox v-for="item in jobState"
                           :label="item"
                           :key="item">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </span>
        </el-row>
        <el-row>
          <span>区域筛选：</span>
          <span>
            <el-checkbox-group v-model="job2"
                               @change="handleCheckedCitiesChange2">
              <el-checkbox v-for="item in area"
                           :label="item"
                           :key="item">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </span>
        </el-row>
        <el-row style="margin-top:35px">
          <span>个人任务上限数(单位:个)：</span>
          <div style="width:20%;display:inline-block">
            <el-input v-model="filter.self"
                      placeholder="输入个人任务上限数"
                      @blur="myBlur('self')"
                      :maxlength="20"></el-input>
          </div>
        </el-row>
        <el-row>
          <span>未签收项目取回(单位:天)：</span>
          <div style="width:20%;display:inline-block">
            <el-input v-model="filter.day"
                      placeholder="输入未签收项目取回"
                      @blur="myBlur('day')"
                      :maxlength="20"></el-input>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: {},
      filter: {
        self: '',
        day: ''
      },
      value: true,
      tableData: [
        {
          number: 10001,
          name: '张秀秀',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 10002,
          name: '李文文',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 10003,
          name: '温碧师',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '3'
        },
        {
          number: 10004,
          name: '李太白',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '4'
        },
        {
          number: 10005,
          name: '萧炎',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        }
      ],
      job: [],
      job2: [],
      jobState: [
        { name: '工作中' },
        { name: '空闲' },
        { name: '休假' },
        { name: '离职' }
      ],
      area: [{ name: '主负责区域' }, { name: '次负责区域' }],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1
    }
  },
  methods: {
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
    },
    handleCheckedCitiesChange1 () { },
    handleCheckedCitiesChange2 () { },
    myBlur (key) {
      console.log(key)
      var reg = /^\d+$|^\d+[.]?\d+$/
      if (!reg.test(this.filter[key])) {
        this.filter[key] = ''
      }
    }
  }

}
</script>
<style scoped>
.configuration {
  padding: 25px;
}
.rule {
  font-size: 14px;
  margin-top: 25px;
}
.rule .select .el-row {
  margin-top: 15px;
}

.el-checkbox-group {
  display: inline-block;
}
</style>
