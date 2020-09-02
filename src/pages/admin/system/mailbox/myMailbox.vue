<template>
  <div id="myMailbox">
    <el-container>
      <el-aside width="300px"
                style="padding-top:10px;padding-left:20px;">
        <el-container>
          <el-header class="m_title">我的邮件</el-header>
          <el-row style="padding:10px;borderRight:1px solid rgb(224, 224, 224);borderBottom:1px solid rgb(224, 224, 224);borderLeft:1px solid rgb(224, 224, 224);">
            <ul class="leftContent">
              <li>收件箱</li>
              <li>已发送</li>
              <li>草稿箱</li>
              <li>垃圾箱</li>
            </ul>
          </el-row>
        </el-container>
      </el-aside>
      <el-main style="margin-left:15px;padding-top:10px;padding-right:20px;">
        <el-container>
          <el-header class="m_title">收件箱列表</el-header>
          <div style="height:55px;padding:6px 22px;background:rgb(224, 224, 224);">
            <el-row>
              <el-col :span="3">
                <span class="filter_title">标题关键字：</span>
              </el-col>
              <el-col :span="4">
                <el-input placeholder="请输入关键字"
                          :maxlength="50"></el-input>
              </el-col>
              <el-col :span="3">
                <div class="primary-reset">查询</div>
              </el-col>
              <el-col :span="3">
                <div class="primary-reset">重置</div>
              </el-col>
              <el-col :span="4">
                <div class="primary-reset"
                     style="width:120px;">全部标记为已读</div>
              </el-col>
              <el-col :span="3">
                <div class="primary-reset">写邮件</div>
              </el-col>
              <el-col :span="3">
                <div class="primary-reset">删除</div>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-table :data="tableData"
                      v-loading="loading"
                      border
                      element-loading-text="数据加载中"
                      element-loading-background="rgba(255, 255, 255, 0.9)"
                      style="width: 100%;margin-top:35px;">
              <el-table-column type="index"
                               :index="1"
                               label="序号"
                               width="80">
              </el-table-column>
              <el-table-column type="selection"
                               width="65">
              </el-table-column>
              <el-table-column prop="title"
                               label="标题"
                               width="200">
              </el-table-column>
              <el-table-column prop="name"
                               label="发送人"
                               width="200">
              </el-table-column>
              <el-table-column prop="time"
                               label="时间"
                               width="200">
              </el-table-column>
              <el-table-column fixed="right"
                               label="操作"
                               width="150">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row.selection)"
                             type="text"
                             size="small">查看</el-button>
                  <el-button type="text"
                             size="small">回复</el-button>
                  <el-button type="text"
                             size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
        </el-container>
      </el-main>
    </el-container>

    <el-dialog class="companyInfo includedBox"
               width="600px"
               :visible.sync="qualifications"
               top="14vh"
               :append-to-body='true'
               :show-close="false">
      <div style="height:500px;box-sizing:border-box;position: relative;">
        <h2>
          <b>
            邮件详情
          </b>
        </h2>
        <div class="middleBox"
             style="text-align:left;margin:20px 0;">
          <div class="button_default">回复</div>
          <div class="button_default">返回</div>
        </div>
        <div style="padding:0 10px;">
          <el-row>
            <b>导出</b>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span class="filter_title">发件人：</span>
            </el-col>
            <el-col :span="20">
              <span class="filter_title">超级管理员</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span class="filter_title">时间：</span>
            </el-col>
            <el-col :span="20">
              <span class="filter_title">2018年10月01日</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span class="filter_title">抄送人：</span>
            </el-col>
            <el-col :span="20">
              <span class="filter_title">超级管理员</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span class="filter_title">收件人：</span>
            </el-col>
            <el-col :span="20">
              <span class="filter_title">超级管理员</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span class="filter_title">附件：</span>
            </el-col>
            <el-col :span="20">
              <span class="filter_title">123</span>
            </el-col>
          </el-row>
        </div>
        <div class="middleBox"
             style="text-align:center;margin-top:60px;">
          <div class="button_default"
               @click="qualifications = false">关闭</div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'myMailbox',
  data () {
    return {
      data4: [],
      defaultProps: {
        children: 'childMenu',
        label: 'menuname'
      },
      menuListHeight: 100,
      tableData: [ // 标的列表
        { title: '导出', name: '王花花', time: '2019-07-21  12:21:41' },
        { title: '导出', name: '王花花', time: '2019-06-20  09:11:23' },
        { title: '导出', name: '王花花', time: '2019-07-11  14:48:24' },
        { title: '导出', name: '王花花', time: '2019-09-21  15:11:54' }
      ],
      loading: false,
      totalRecord: 1,
      pageNo: 1,
      pageSize: 5,
      qualifications: false
    }
  },
  created () {

  },
  methods: {
    handleClick (val) {
      this.qualifications = true
    },
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
.m_title {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 30px;
  background: rgb(50, 58, 64);
  color: #fff;
  font-size: 16px;
}
.el-tree > div {
  margin: 5px 0;
}
.iconList {
  height: 300px;
  background: rgb(255, 213, 213);
  overflow-y: auto;
}
.filter_title {
  line-height: 40px;
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
.leftContent {
  height: 460px;
}
.leftContent li {
  margin-top: 10px;
  cursor: pointer;
}
</style>
<style>
.menuManage_List .el-tree-node__content {
  margin-bottom: 5px;
}
</style>

