<template>
  <!-- <div>项目库</div> -->
  <div class="page-body EPF-table"
       id="serveBody">
    <div class="filter_wrap">
      <el-table ref="multipleTable"
                stripe
                :data="historyList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                style="width: 100%;min-height:80px;"
                border>
        <el-table-column prop="proNo"
                         label="项目编号"
                         min-width="100"
                         align="center"></el-table-column>
        <el-table-column prop="proName"
                         label="项目名称"
                         min-width="250"
                         align="center"></el-table-column>
        <el-table-column prop="proType"
                         label="项目分类"
                         min-width="150"
                         align="center">
          <template slot-scope="scope">
            <span style="color:#67c23a"
                  v-if="scope.row.proType==='0'">总体规划</span>
            <span style="color:#efb43c"
                  v-if="scope.row.proType==='1'">详细规划</span>
            <span style="color:#409eff"
                  v-if="scope.row.proType==='2'">专项规划</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime"
                         label="发起时间"
                         min-width="300"
                         align="center"></el-table-column>
        <el-table-column prop="endTime"
                         label="报送时间"
                         min-width="300"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         min-width="200"
                         fixed="right"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="handelClickCheck(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;margin:22px 0px;">
        <el-pagination background
                       layout="total,prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10,15,20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="this.historyList.length"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import qs from 'qs'
import Bus from '../../../../../utils/bus'
export default {
  name: 'projectlist',
  data () {
    return {
      historyList: [
        {
          proNo: '100011',
          proName: '土地利用总体规划',
          proType: '0',

          startTime: '2019-1-1 1:1:1',
          endTime: '2019-1-1 1:1:1'
        },
        {
          proNo: '100012',
          proName: '城市利用总体规划',
          proType: '0',

          startTime: '2019-1-1 1:1:1',
          endTime: '2019-1-1 1:1:1'
        },
        {
          proNo: '100013',
          proName: '海岸带综合保护规划',
          proType: '1',

          startTime: '2019-1-1 1:1:1',
          endTime: '2019-1-1 1:1:1'
        },
        {
          proNo: '100014',
          proName: '河源市影像数据',
          proType: '2',

          startTime: '2019-1-1 1:1:1',
          endTime: '2019-1-1 1:1:1'
        },
        {
          proNo: '100021',
          proName: '城市利用总体规划',
          proType: '0',

          startTime: '2019-1-1 1:1:1',
          endTime: '2019-1-1 1:1:1'
        }
      ],

      // historyList: [],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: false
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    handelClickCheck () {
      // let title = "查看成果审查信息";
      // let routerPath = "projectcheck";
      // var tabObj = { title, routerPath };
      // this.setTabsList(tabObj);
      // this.$router.push({ path: routerPath });
    },

    // 获取列表
    getList () {
      // this.loading = false;

      // this.pageNo = res.pager.pageNo;
      // this.pageSize = res.pager.pageSize;
      // this.totalPage = res.pager.totalPage;
      // this.totalRecord = res.pager.totalRecord;

      console.log(this.historyList.length)
      if (this.historyList.length == 0) {
        this.getMessage()
      }
    },
    getMessage () {
      this.$confirm('该数据为第一次报送，暂无历史报送记录。', '提示', {
        confirmButtonText: '知道了',
        // type: 'warning',
        showCancelButton: false
      })
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
  },
  mounted () {
    console.log(this.historyList)
  }
}
</script>
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
  height: 60px;
  line-height: 60px;
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
  padding-top: 28px;
  padding-bottom: 25px;
  transition: 0.5s;
  background: #fff;
  border: 1px solid #ebeef5;
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
.monad {
  display: block;
  width: 48px;
  position: absolute;
  top: 7px;
  left: 5px;
}
.primary_search {
  width: 70%;
  height: 40px;
  background-color: #ffa000;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  margin-left: 30px;
}
.primary_reset {
  width: 70%;
  height: 40px;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  border: solid 1px #d3d4d6;
  color: #606266;
  background-color: #eee;
  margin-left: 15px;
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
}
</style>
