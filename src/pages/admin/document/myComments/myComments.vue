<template>
  <div class="page-body"
       id="myComments">
    <div class="filter_wrap"
         :style="{'paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
      <div class="switchHeight_box">
        <el-row :gutter="2">
          <el-col :span="1"
                  class="search">
            <el-button icon="el-icon-search"
                       circle
                       style="border: 0px;">搜索</el-button>
          </el-col>
          <!-- 搜索切换 -->
          <el-col :span="4"
                  class="searchIpt"
                  hidden>
            <i class="el-icon-search"></i>
            <el-input placeholder="请输入您要搜索的关键词"
                      v-model="input"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="1"
                  class="search"
                  style="width:5.7%">
            <el-button icon="el-icon-sort"
                       circle
                       style="border: 0px;">时间排序</el-button>
          </el-col>
          <el-col :span="1"
                  class="search">
            <el-button icon="el-icon-chat-dot-square"
                       circle
                       style="border: 0px;">评论</el-button>
          </el-col>
          <el-col :span="1"
                  class="search">
            <el-button icon="el-icon-edit"
                       circle
                       style="border: 0px;">回复</el-button>
          </el-col>
          <el-col :span="1"
                  class="search">
            <el-button icon="el-icon-chicken"
                       circle
                       style="border: 0px;">点赞</el-button>
          </el-col>
        </el-row>
      </div>
      <el-container style="height:auto">
        <el-main>
          <el-tabs style="margin-top:10px;">
            <el-header style="height:40px;line-height:40px;background:rgb(50, 58, 64);color:#fff"
                       class="m_title">我的评论</el-header>
            <div style="margin: 20px;margin-top:0;">
              <div style="border-bottom: 1px solid #ddd;margin-top:20px;">
                <el-row>
                  <el-col :span="12">
                    <div class="person">
                      <div class="commImg"></div>
                      <div class="commTime">
                        <p><span>王小静</span>评论了</p>
                        <p>2019年11月1日 12:00:20</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12"
                          style="text-align:right;font-size:20px"><i class="el-icon-delete"></i></el-col>
                </el-row>

                <el-row>
                  <div class="doc">
                    <el-col :span="11">
                      <div class="doct">
                        <p>这次新的国土空间规划体系“四梁八柱”，不是简单换一个名称，比如说我们把它统称为国土空间规划，也不是形式上的拼凑，我认为体现的是生态文明新时代空间供给侧结构性改革的要求。《若干意见》里面特别强调，新的规划要体现战略性，提高科学性，强化权威性，加强协调性，注重操作性，要实现国土空间开发保护更高质量、更有效率、更加公平、更可持续</p>
                      </div>
                    </el-col>
                    <el-col :span="11"
                            style="border:1px solid #ddd;padding: 20px;">
                      <div class="document">
                        <div class="documentImg"></div>
                        <div>自然资源部办公厅关于开展国土空间规划“一张图”建设和现状评估工作的通知（自然资办〔2019〕38号）.pdf</div>
                      </div>
                      <div class="papers">
                        <p>文件类型：<span>政策法规</span></p>
                        <p>文档来源：<span>自然资源部办公厅</span></p>
                        <p>发文日期：<span>2019年7月1日</span></p>
                      </div>
                    </el-col>
                  </div>
                </el-row>
              </div>
              <div style="border-bottom: 1px solid #ddd;margin-top:20px;">
                <el-row>
                  <el-col :span="12">
                    <div class="person">
                      <div class="commImg"></div>
                      <div class="commTime">
                        <p><span>王小静</span>评论了</p>
                        <p>2019年11月1日 12:00:20</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12"
                          style="text-align:right;font-size:20px"><i class="el-icon-delete"></i></el-col>
                </el-row>

                <el-row>
                  <div class="doc">
                    <el-col :span="11">
                      <div class="doct">
                        <p>这次新的国土空间规划体系“四梁八柱”，不是简单换一个名称，比如说我们把它统称为国土空间规划，也不是形式上的拼凑，我认为体现的是生态文明新时代空间供给侧结构性改革的要求。《若干意见》里面特别强调，新的规划要体现战略性，提高科学性，强化权威性，加强协调性，注重操作性，要实现国土空间开发保护更高质量、更有效率、更加公平、更可持续</p>
                      </div>
                    </el-col>
                    <el-col :span="11"
                            style="border:1px solid #ddd;padding: 20px;">
                      <div class="document">
                        <div class="documentImg"></div>
                        <div>自然资源部办公厅关于开展国土空间规划“一张图”建设和现状评估工作的通知（自然资办〔2019〕38号）.pdf</div>
                      </div>
                      <div class="papers">
                        <p>文件类型：<span>政策法规</span></p>
                        <p>文档来源：<span>自然资源部办公厅</span></p>
                        <p>发文日期：<span>2019年7月1日</span></p>
                      </div>
                    </el-col>
                  </div>
                </el-row>
              </div>

            </div>
            <div style="text-align:right;margin:22px 0px;">
              <el-pagination background
                             layout="prev, pager, next,sizes,jumper"
                             :page-sizes="[5,10, 15, 20]"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :page-size="pageSize"
                             :current-page="pageNo"
                             :total="totalRecord"></el-pagination>
            </div>
          </el-tabs>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import personalFiltrate from '@/components/personalFiltrate'
import transferTable from '@/components/transferTable'
import Axios from 'axios'
import { constants } from 'zlib'

export default {
  name: 'myComments',
  components: {
    personalFiltrate,
    transferTable
  },

  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 245
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
  },
  mounted () {
    this.$bus.$on('themChange', val => {
      this.theme_BackgroundColor = val.menuBackgroundColor
      this.theme_TextColor = val.textColor
    })
  },
  methods: {
    getdoclist () { },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getdoclist(this.searchInfo)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.pageSize
      this.getdoclist(this.searchInfo)
    }
  }
}
</script>
<style scoped>
.el-container {
  height: 300px;
  overflow: auto;
}
.headerpop {
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: bold;

  line-height: 30px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 120px;
  border-radius: 10px;
  height: 120px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
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
  padding-right: 1rem;
}
.oper span {
  display: inline-block;
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
  padding: 0 !important;
  padding-top: 15px !important;
  /* padding-bottom:10px; */
  /* height:80px; */
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
  margin-left: 15px;
  margin-top: 0 !important;
  margin-right: 0 !important;
}
.flexibleSwitch {
  display: block;
  float: right;
  color: #4472d5;
  cursor: pointer;
}
</style>
<style scoped>
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
  right: 8px;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.usemngtable {
  width: 100%;
}
.usemngtable td {
  border: 1px solid #b6b6b6;
  line-height: 28px;
}
.search .el-button:focus,
.search .el-button:hover {
  color: #409eff;
  border-color: transparent;
  background-color: transparent;
}
.searchIpt {
  position: relative;
}
.searchIpt i {
  position: absolute;
  z-index: 1;
  top: 33%;
  left: 5%;
}
.searchIpt input {
  padding-left: 25px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
.collection .el-dialog {
  width: 30%;
}
.choice .el-select {
  display: block;
}
/* 评论 */
.person {
  display: flex;
  justify-content: flex-start;
}
.person .commImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  margin-right: 5px;
}
.person .commTime {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.person .commTime span {
  padding-right: 5px;
  font-weight: bold;
}
.doc {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.document {
  display: flex;
  justify-content: flex-start;
}
.document .documentImg {
  width: 60px;
  height: 60px;
  border: 1px solid #ddd;
  margin-right: 15px;
}
.papers {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.doct {
  font-size: 16px;
  text-align: justify;
}
</style>
