<template>
  <div class="page-body">
    <div class="filter_wrap">
      <div class="switchHeight_box">
        <el-row>
          <el-col :span="2">
            <span class="filter_title">操作人：</span>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="请输入"
                      :maxlength="20"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">IP地址：</span>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="请输入"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="2"
                  style="margin-left:60px;">
            <div class="primary">查询</div>
          </el-col>
          <el-col :span="2">
            <div class="primary-reset">清除</div>
          </el-col>
          <el-col :span="2">
            <div class="primary-reset"
                 @click="qualifications = true">查看</div>
          </el-col>
          <el-col :span="2">
            <div class="primary-reset">删除</div>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData"
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255, 0.9)"
                style="width: 100%;margin-top:35px;">
        <el-table-column label="系统日志列表">
          <el-table-column type="selection"
                           width="65">
          </el-table-column>
          <el-table-column type="index"
                           :index="1"
                           label="序号"
                           width="80">
          </el-table-column>
          <el-table-column prop="operator"
                           label="操作人"
                           width="120">
          </el-table-column>
          <el-table-column prop="actions"
                           label="操作动作"
                           width="160">
          </el-table-column>
          <el-table-column prop="requestMethod"
                           label="请求方法"
                           width="200">
          </el-table-column>
          <el-table-column prop="parameters"
                           label="请求参数"
                           width="200">
          </el-table-column>
          <el-table-column prop="duration"
                           label="执行时长（毫秒）"
                           width="200">
          </el-table-column>
          <el-table-column prop="IPaddress"
                           label="IP地址"
                           width="160">
          </el-table-column>
          <el-table-column prop="end_time"
                           label="操作时间"
                           width="220">
          </el-table-column>
        </el-table-column>
      </el-table>
      <div style="margin-top:25px;text-align: right;">
        <el-pagination background
                       layout="prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10, 15, 20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :current-page="pageNo"
                       :page-size="pageSize">
        </el-pagination>
      </div>
    </div>

    <el-dialog class="companyInfo includedBox"
               width="600px"
               :visible.sync="qualifications"
               top="14vh"
               :append-to-body='true'
               :show-close="false">
      <div style="height:500px;box-sizing:border-box;position: relative;">
        <el-row class="elastic_frame_box">
          <el-col :span="4">
            <span class="elastic_frame_title">操作人：</span>
          </el-col>
          <el-col :span="20">
            <el-input placeholder="用户名"
                      :maxlength="20"></el-input>
          </el-col>
        </el-row>
        <el-row class="elastic_frame_box">
          <el-col :span="4">
            <span class="elastic_frame_title">操作动作：</span>
          </el-col>
          <el-col :span="20">
            <el-input placeholder="用户名"
                      :maxlength="500"></el-input>
          </el-col>
        </el-row>
        <el-row class="elastic_frame_box">
          <el-col :span="4">
            <span class="elastic_frame_title">请求方法：</span>
          </el-col>
          <el-col :span="20">
            <el-input placeholder="用户名"
                      :maxlength="500"></el-input>
          </el-col>
        </el-row>
        <el-row class="elastic_frame_box">
          <el-col :span="4">
            <span class="elastic_frame_title">请求参数：</span>
          </el-col>
          <el-col :span="20">
            <el-input placeholder="用户名"
                      :maxlength="500"></el-input>
          </el-col>
        </el-row>
        <el-row class="elastic_frame_box">
          <el-col :span="6">
            <span class="elastic_frame_title">执行时长（毫秒）：</span>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="用户名"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row class="elastic_frame_box">
          <el-col :span="4">
            <span class="elastic_frame_title">IP地址：</span>
          </el-col>
          <el-col :span="20">
            <el-input placeholder="用户名"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row class="elastic_frame_box">
          <el-col :span="4">
            <span class="elastic_frame_title">操作时间：</span>
          </el-col>
          <el-col :span="20">
            <el-input placeholder="用户名"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <div class="middleBox"
             style="text-align:center;">
          <div class="button_default"
               @click="qualifications = false">关闭</div>
        </div>

      </div>
    </el-dialog>

  </div>
</template>
<script>
import personalFiltrate from '@/components/personalFiltrate'
import transferTable from '@/components/transferTable'
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import Bus from '../../../../utils/bus'

export default {
  name: 'tradSufReview',
  components: {
    personalFiltrate,
    transferTable
  },
  data () {
    return {
      tableData: [ // 标的列表
        { operator: '1', actions: 'DAZ2018001', requestMethod: '11018001', parameters: 'libai', duration: '是', IPaddress: '1000', end_time: '2019-07-21 12:21:41' },
        { operator: '2', actions: 'DAZ2018008', requestMethod: '18018008', parameters: 'libai', duration: '是', IPaddress: '1200', end_time: '2019-06-02 09:11:23' },
        { operator: '3', actions: 'DAZ2012003', requestMethod: '13012003', parameters: 'libai', duration: '是', IPaddress: '1000', end_time: '2019-07-11 14:48:24' },
        { operator: '4', actions: 'DAZ2138006', requestMethod: '36138006', parameters: 'libai', duration: '是', IPaddress: '2000', end_time: '2019-09-21 15:11:54' },
        { operator: '5', actions: 'DAZ2031308', requestMethod: '38031308', parameters: 'libai', duration: '否', IPaddress: '1500', end_time: '2019-08-26 10:51:23' },
        { operator: '6', actions: 'DAZ2011348', requestMethod: '18011348', parameters: 'libai', duration: '否', IPaddress: '3000', end_time: '2019-11-15 09:23:45' },
        { operator: '7', actions: 'DAZ2013010', requestMethod: '10013010', parameters: 'libai', duration: '否', IPaddress: '3000', end_time: '2019-07-07 16:22:30' },
        { operator: '8', actions: 'DAZ2018310', requestMethod: '10018310', parameters: 'libai', duration: '是', IPaddress: '2100', end_time: '2019-12-08 17:21:02' },
        { operator: '9', actions: 'DAZ2018004', requestMethod: '14018004', parameters: 'libai', duration: '是', IPaddress: '2000', end_time: '2019-10-17 11:04:13' }
      ],
      pageNo: 1,
      pageSize: 5,
      totalRecord: 1,
      qualifications: false
    }
  },
  created () {

  },
  mounted () {
    this.loading = false
  },
  methods: {
    ...mapActions(['setTabsList']),
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
    }

  }
}
</script>
<style scoped>
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
  font-size: 12px;
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
  box-sizing: border-box;
  padding: 38px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
.switchHeight_box {
  padding-top: 25px;
  /* padding-bottom:10px; */
  height: 90px;
  transition: 0.5s;
  background: #fff;
  border: 1px solid #ebeef5;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
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
.primary-reset {
  width: 88px;
  height: 34px;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  line-height: 36px;
  display: inline-block;
  cursor: pointer;
  margin-left: 40px;
  border: solid 1px #d3d4d6;
  color: #606266;
  background-color: #fff;
}
.flexibleSwitch {
  display: block;
  float: right;
  color: #4472d5;
  cursor: pointer;
}
.dialog-footer {
  display: flex;
  justify-content: center;
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
.offerBox {
  width: 100%;
  padding: 15px 25px;
}
.filterBox {
  padding: 20px;
  height: 72px;
  border: 1px solid rgb(219, 219, 219);
}
</style>
<style>
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
}
.el-table__body tr td:nth-child(1) .cell {
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.elastic_frame_box {
  margin-top: 20px;
}
.elastic_frame_title {
  text-align: left;
  line-height: 40px;
}
.middleBox {
  width: 85%;
  margin: 30px auto;
}
</style>

