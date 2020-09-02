<template>
  <el-scrollbar style="height:100%"
                ref="tableScrollbar">
    <div class="page-body EPF-table"
         id="knowledge"
         style="background:#F7F7F7">
      <div class="filter_wrap">
        <el-container style="height:auto;">
          <el-main>
            <el-tabs>
              <div class="switchHeight_box">
                <div style="font-size: 28px;font-weight: bold;display:flex;align-items: center;">公共文档审核</div>
                <div style="display:flex;align-items: center;"
                     @click="uploadRecord">
                  <i class="el-icon-s-order"
                     style="color: #ccc;font-size: 18px;cursor:pointer;"></i>
                  <span style="cursor:pointer;margin-left:10px">审核记录</span>
                </div>
                <!-- <el-button icon="el-icon-tickets"
                             circle
                             style="border: 0px;border-radius: inherit;"
                             @click="uploadRecord">审核记录
                  </el-button> -->
              </div>

              <!--列表模式  -->
              <div class="main-table">
                <el-table ref="multipleTable"
                          :default-sort="{ prop: 'publishTime', order: 'descending' }"
                          :data="docInfoList"
                          style="width: 100%;min-height:100px;"
                          border
                          stripe
                          @selection-change="handleSelectionChange"
                          @sort-change="changeorders"
                          v-loading="loading"
                          element-loading-text="数据加载中"
                          element-loading-background="rgba(255, 255, 255,0.95)"
                          v-show="tablelist"
                          :header-cell-style="{background:'rgba(246,246,246,1)'}">
                  <el-table-column fixed
                                   type="selection"
                                   width="55"
                                   align="center"></el-table-column>
                  <el-table-column prop="name"
                                   label="文件名称"
                                   min-width="230">
                    <template slot-scope="scope">
                      <div class="cell_click"
                           @click="clickselectrow(scope.$index, scope.row)">
                        <div class="docuImg">
                          <img v-if="'png,gif,jpeg,jpg,jtp,rar'.indexOf(scope.row.extName.toLowerCase()) != -1"
                               :src="'/api/epf-document/document/downloadById?id=' + scope.row.id">
                          <img v-else
                               :src="require('@/assets/docu/' + scope.row.extName.toLowerCase() + '.png')">
                        </div>
                        <p class="ellipsis"
                           :title='scope.row.name'>{{scope.row.name}}</p>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="folderName"
                                   label="文档分类"
                                   min-width="100"
                                   align="center">
                    <template slot-scope="scope">
                      {{scope.row.folderName}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="source"
                                   label="文档来源"
                                   min-width="100"
                                   align="center">
                    <template slot-scope="scope">
                      {{scope.row.source}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="involvedBussyniss"
                                   label="涉及业务"
                                   min-width="100"
                                   align="center">
                    <template slot-scope="scope">
                      {{scope.row.involvedBussyniss}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="keywords"
                                   label="关键字"
                                   min-width="100"
                                   align="center">
                    <template slot-scope="scope">
                      {{scope.row.keywords}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="publishTime"
                                   label="上传时间"
                                   min-width="130"
                                   align="center">
                    <template slot-scope="scope">
                      {{scope.row.publishTime}}
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="issuedNumber"
                                   label="发文字号"
                                   min-width="130"
                                   align="center">
                    <template slot-scope="scope">
                      {{scope.row.issuedNumber}}
                    </template>
                  </el-table-column> -->
                  <!-- <el-table-column prop="involvedIndustry"
                                   label="涉及行业"
                                   min-width="130"
                                   align="center">
                    <template slot-scope="scope">
                      {{scope.row.involvedIndustry}}
                    </template>
                  </el-table-column> -->
                  <el-table-column prop="createName"
                                   label="上传人"
                                   min-width="130"
                                   align="center">
                    <template slot-scope="scope">
                      {{scope.row.createName}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="docNo"
                                   label="操作"
                                   min-width="100"
                                   align="center"
                                   fixed="right">
                    <template slot-scope="scope">
                      <div class="cell_click"
                           @click="examine(scope.$index, scope.row)">
                        <span style="color:#4E88FE">审核</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align:right;margin:22px 24px;">
                  <el-pagination background
                                 layout="total,prev, pager, next,sizes,jumper"
                                 :page-sizes="[5,10, 15, 20]"
                                 @size-change="handleSizeChange"
                                 @current-change="handleCurrentChange"
                                 :page-size="pageSize"
                                 :current-page="pageNo"
                                 :total="totalRecord"></el-pagination>
                </div>
              </div>
            </el-tabs>
          </el-main>

        </el-container>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import qs from 'qs'
import Axios from 'axios'
import { constants } from 'zlib'
import { mapActions, mapState } from 'vuex'
import configApi from '../../../../../config/index'
import base from '../../../../utils/config.js'
export default {
  name: 'knowledge',

  data () {
    return {
      tablelist: true,
      totlecorde: 0,
      isIndeterminate: true,
      folderId: '',
      docInfoList: [],
      loading: true,
      menuListHeight: 100,
      selectGroups: [],
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: { usetype: '' },
      folderType: '1' // 文件类型：1文件夹，知识分类；2收藏夹；3工作文件夹分类,文档分类
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 245
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.searchInfo['load'] = true
    this.getDocList(this.searchInfo)
  },
  methods: {
    ...mapActions(['setTabsList']),
    changeorders (event) {
      var _this = this
      this.pageNo - 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = this.pageSize
      this.searchInfo['sort'] = event.prop
      this.searchInfo['order'] = event.order
      this.getDocList(this.searchInfo)
    },
    clickselectrow (index, row) {
      // this.$refs.multipleTable.toggleRowSelection(row);
      let that = this
      let title = '文档浏览'
      let routerPath = '/documentBrowse'
      let tabObj = { title, routerPath }
      that.setTabsList(tabObj)
      that.$router.push({ path: routerPath, query: { row: row } })
    },
    // 审核记录
    uploadRecord () {
      let that = this
      let title = '公共文档审核记录'
      let routerPath = '/workAuditConsult?folderType=1'
      let tabObj = { title, routerPath }
      that.setTabsList(tabObj)
      that.$router.push({ path: routerPath, query: { folderType: that.folderType } })
    },
    // 审核跳转
    examine (index, row) {
      let that = this
      let title = '文档审核'
      that.$bus.$emit('closeTabsItem', 'myAudit')
      let routerPath = '/documentBrowse'
      let tabObj = { title, routerPath }
      that.setTabsList(tabObj)
      that.$router.push({ path: routerPath, query: { row: row, folderType: '1' } })
    },
    handleSelectionChange (val) {
      this.selectGroups = val
    },
    async getDocList (params) {
      this.loading = true
      this.$get('/epf-document/docdocumentinfo/getMyExaminePlanningDocs', params).then(res => {
        console.log('871===========', res)
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          this.loading = false
          return
        }
        if (params.load) {
          this.totlecorde = res.pager.totalRecord
          this.searchInfo['load'] = ''
        }
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.docInfoList = res.pager.results
        this.isIndeterminate = true

        this.loading = false
      })
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getDocList(this.searchInfo)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.pageNo = val
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = this.pageSize
      this.searchInfo['folderId'] = this.folderId
      this.getDocList(this.searchInfo)
    }

  },
  mounted () {
    this.$bus.$on('proSubmit1', val => {
      console.log(val)
      this.getDocList(this.searchInfo)
    })
  },
  watch: {
    pageNo (val) {
      this.$refs.tableScrollbar.wrap.scrollTop = 0
    },
    pageSize (val) {
      this.$refs.tableScrollbar.wrap.scrollTop = 0
    }
  }
}
</script>
<style scoped>
.page-body {
  padding: 16px 24px;
  background-color: #f6f6f6;
}
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
.switchHeight_box {
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
  min-height: 80px;
  /* padding: 10px 0; */
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px 24px;
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
}
.flexibleSwitch {
  display: block;
  float: right;
  color: #4472d5;
  cursor: pointer;
}

.carditem {
  width: 150px;
  height: 170px;
  margin: 5px 5px;
  position: relative;
  padding: 5px;
  border-radius: 6px;
  cursor: default;
  transition: 0.4s;
  border: 1px solid #fff;
  z-index: 99 !important;
  display: inline-block;
  float: none !important;
}
.carditem:hover {
  box-shadow: 0px 5px 10px rgb(134, 134, 134);
  border: 1px solid rgb(211, 211, 211);
}
.docImgBox {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 90px;
  background: rgb(255, 255, 255);
  cursor: pointer;
}
.docImgBox > img {
  object-fit: contain;
  width: 100%;
  height: 90px;
  display: block;
}
.Dangerg {
  width: 140px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.Dangergtn {
  color: #fff;
  background: #f56c6c;
}
.checkBox {
  position: absolute;
  top: 2px;
  left: 2px;
}
.check {
  padding: 0 3px;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 50%;
  background: rgba(240, 240, 240, 0.774);
}
.checked {
  padding: 0 3px;
  border: 1px solid rgb(88, 150, 57);
  border-radius: 50%;
  background: #67c23a;
}
.check i {
  font-size: 10px;
  color: rgb(153, 153, 153);
}
.checked i {
  font-size: 10px;
  color: #fff;
}
.dowld {
  color: #000;
  background: rgb(241, 245, 248);
}

.cardbottom {
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  width: 100%;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(85, 85, 85);
  transition: 0.4s;
  margin-top: 6px;
}
.cardbottomInput {
  margin-top: 8px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.cardbottomInput input {
  display: inline-block;
  box-sizing: border-box;
  width: 90px;
  height: 25px;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 3px;
  padding: 0 3px;
}
.carditem:hover {
  /* border: 1px solid rgb(211, 211, 211); */
}
.carditem:hover .cardbottom {
  color: #409eff;
}
.m_title {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 10px;
  background: #fff;
  color: rgb(50, 58, 64);
  font-size: 16px;
  border-bottom: 1px solid rgb(224, 224, 224);
}
.el-tree > div {
  margin: 5px 0;
}
.iconList {
  height: 300px;
  background: rgb(255, 213, 213);
  overflow-y: auto;
}
.main-table {
  min-height: 691px;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
  padding-bottom: 22px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style scoped>
.orgManange_List .el-tree-node__content {
  margin-bottom: 5px;
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
.cell .cell_click {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: relative;
}
.docuImg {
  width: 40px;
  height: 40px;
  /* border: 1px solid #ddd; */
  margin-right: 10px;
  display: inline-block;
}
.docuImg img {
  border-radius: 4px;
  width: 100%;
  height: 100%;
}
.ellipsis {
  position: absolute;
  top: 0;
  left: 50px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.filter_wrap >>> .el-table.el-table--fit .cell {
  line-height: 22px !important;
}

.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.usemngtable {
  width: 100%;
}
.search .el-button:focus,
.search .el-button:hover {
  color: #409eff;
  border-color: transparent;
  background-color: transparent;
}
.usemngtable td {
  border: 1px solid #b6b6b6;
  line-height: 28px;
}
.searchIpt {
  position: relative;
}
.searchIpt i {
  background-color: #409eff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 8%;
  left: -18%;
}
.searchIpt input {
  padding-left: 30px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 5px;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
.collection .el-dialog {
  width: 30%;
}
</style>
