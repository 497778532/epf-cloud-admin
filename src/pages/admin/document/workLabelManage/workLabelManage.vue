<template>
  <el-scrollbar style="height:100%"
                ref="tableScrollbar">
    <div class="page-body EPF-table"
         id="labelManage">
      <div class="filter_wrap">
        <div class="switchHeight_box">
          <el-row>
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom_three">关键字：</span>
              <el-input size="small"
                        v-model="searchInfo.name"
                        placeholder="请输入搜索关键词"
                        style="width:calc(100% - 110px);"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom">标签分类：</span>
              <el-select v-model="searchInfo.doctype"
                         placeholder="请选择标签分类"
                         style="width:calc(100% - 120px);">
                <el-option v-for="item in orgdata"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-col>

            <el-col :span="8"
                    class="filter_title_box">
              <span class="filter_title__custom">创建日期：</span>
              <el-date-picker v-model="publishdata"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              style="width:calc(100% - 120px);"></el-date-picker>
            </el-col>
            <el-col :span="4"
                    style="display:flex;justify-content:flex-end;">
              <div class="primary_reset"
                   @click="resetsearchuser">重置</div>
              <div class="primary_search"
                   @click="getsearchuser">搜索</div>
            </el-col>
          </el-row>
        </div>

        <div class="m_title">
          <div style="width:100%;height:30px;display:flex;justify-content: space-between;align-items: center;">
            <div style="font-weight:bold;font-size:28px;color: #464C5B;">标签管理</div>
            <div style="color:#727272;"
                 class="threeEdict">
              <div @click=" addDocument"
                   style="margin-left:16px;"><i class="el-icon-circle-plus"
                   style="font-size:18px;color:#727272;"></i><span>新增</span></div>
              <div @click="editFlowpatreason"
                   style="margin-left:16px;"><i class="el-icon-edit"
                   style="font-size:18px;color:#727272;"></i><span>编辑</span></div>
              <div @click="handleDelete"
                   style="margin-left:16px;"><img src="../images/删除.png"
                     alt=""><span>删除</span></div>
            </div>
          </div>

          <div style="color:#50A5F4;cursor:pointer;"
               @click="resetsearchuser">全部标签</div>
        </div>

        <div class="main-table">
          <el-table ref="multipleTable"
                    :data="docInfoList"
                    style="width: 100%;min-height:100px;"
                    border
                    stripe
                    @selection-change="handleSelectionChange"
                    v-loading="loading"
                    :default-sort="{prop: 'createTime', order: 'descending'}"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    :header-cell-style="{background:'rgba(246,246,246,1)'}">
            <el-table-column fixed
                             type="selection"
                             width="55"
                             align="center"></el-table-column>
            <el-table-column prop="name"
                             label="标签名称"
                             min-width="130"
                             align="center">
              <!-- <template slot-scope="scope">
                  <div class="cell_click" @click="clickselectrow(scope.$index, scope.row)">
                    <div class="docuImg">
                      <img v-if="'png,gif,jpeg,jpg'.indexOf(scope.row.extName.toLowerCase()) != -1  "  :src="'/api/epf-document/document/downloadById?id=' + scope.row.id" >
                      <img v-else :src="require('@/assets/docu/' + scope.row.extName.toLowerCase() + '.png')" >
                    </div>
                   <p class="ellipsis" title="scope.row.name">{{scope.row.name}}</p>
                  </div>
                </template>-->
              <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>

            <el-table-column prop="source"
                             label="标签分类"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">{{scope.row.tagType}}</template>
            </el-table-column>
            <el-table-column prop="publishTime"
                             label="创建日期"
                             min-width="100"
                             align="center">
              <template slot-scope="scope">{{scope.row.createTime}}</template>
            </el-table-column>
            <el-table-column prop="remark"
                             label="标签说明"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">{{scope.row.remark}}</template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:12px 0px;position: absolute;bottom:16px;right:24px;">
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
      </div>
      <!-- 弹窗 -->
      <el-dialog :title="title"
                 class="companyInfo zskDialog"
                 width="40%"
                 :rules="rules"
                 :visible.sync="popups"
                 :append-to-body='true'
                 :close-on-click-modal="false">
        <el-form :model="rulForm"
                 ref="rulForm"
                 :validate-on-rule-change="false"
                 label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="标签名称："
                            prop="name"
                            required>
                <el-input placeholder="请输入标签名称"
                          v-model="rulForm.name"
                          :maxlength="50"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标签分类：">
                <el-select placeholder="请选择标签分类（数据字典维护）"
                           v-model="rulForm.tagType"
                           style="width:100%;">
                  <el-option label="广东省自然资源厅"
                             value="广东省自然资源厅"></el-option>
                  <el-option label="区域二"
                             value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="排序：">
                <el-input-number v-model="rulForm.orders"
                                 :min="1"
                                 label="排序"
                                 style="width: 100%;"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="状态：">
                <el-select placeholder="请选择状态"
                           v-model="rulForm.status"
                           style="width:100%;">
                  <el-option label="启用"
                             value="0"></el-option>
                  <el-option label="停用"
                             value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标签说明：">
                <el-input placeholder="请输入标签说明"
                          v-model="rulForm.remark"
                          :maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="onSubmit(0)"
                     v-preventReClick>{{bttype}}并新增</el-button>
          <div style="width:64px;height:40px;"></div>
          <el-button @click="onSubmit(1)"
                     v-preventReClick>{{bttype}}</el-button>
          <!-- <el-button @click="popups = false">取消</el-button> -->
          <div style="width:64px;height:40px;"></div>
          <span class="button_qian"
                @click="popups = false">取消</span>
        </span>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'workLabelManage',
  data () {
    return {
      publishdata: [],
      input: '',
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      forderdata: [],
      menuListHeight: 100,
      docInfoList: [],
      parentdata: {},
      pageNodel: 1,
      pageSizedel: 5,
      totalPagedel: 0,
      totalRecorddel: 0,
      loading: false,
      searchselectdefall: [],
      tableData: [],
      value: '',
      selectGroups: [],
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: { usetype: '' },
      orgdata: [
        { value: 'doc', label: '文档' },
        { value: 'cel', label: '表格' },
        { value: 'pdf', label: 'pdf' },
        { value: 'img', label: '图片' },
        { value: 'other', label: '其他' }
      ],
      collectselected: [],
      deletname: '',
      title: '新增', // 控制新增/编辑弹窗的标题
      popups: false, //  控制新增/编辑弹窗
      bttype: '保存',
      rulForm: {
        name: '',
        remark: '',
        orders: '',
        tagType: '',
        status: ''
      },
      rules: {
        name: [
          { required: true, message: '标签名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 210
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.getDocList(this.searchInfo)
  },
  methods: {
    ...mapActions(['setTabsList']),
    // 新增标签
    addDocument () {
      console.log(111)
      let that = this
      that.popups = true
      that.title = '新增'
      that.$refs.rulForm.resetFields()
      that.rulForm = {}
    },

    async getDocList (params) {
      var _this = this
      console.log('publish', _this.publishdata)
      if (_this.publishdata.length > 1) {
        params['starttime'] = _this.publishdata[0]
        params['endtime'] = _this.publishdata[1]
      } else {
        params['starttime'] = ''
        params['endtime'] = ''
      }
      params['type'] = '1'
      _this.loading = true
      _this
        .$post('/epf-document/admin/doctag/getTagpageJson', params)
        .then(res => {
          console.log('===========', res)
          if (res.code != '0') {
            _this.$message.error(res.msg) // 失败
            _this.loading = false
            return
          }
          _this.pageNo = res.pager.pageNo
          _this.pageSize = res.pager.pageSize
          _this.totalPage = res.pager.totalPage
          _this.totalRecord = res.pager.totalRecord
          _this.docInfoList = res.pager.results
          _this.loading = false
        })
    },

    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
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
    getsearchuser () {
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      this.getDocList(this.searchInfo)
    },
    resetsearchuser () {
      this.publishdata = []
      this.searchInfo['page'] = 1
      this.searchInfo['rows'] = this.pageSize
      this.searchInfo['name'] = ''
      this.searchInfo['resource'] = ''
      this.searchInfo['doctype'] = ''
      this.searchInfo['starttime'] = ''
      this.searchInfo['endtime'] = ''
      this.searchselectdefall = []
      this.getDocList(this.searchInfo)
    },
    handleSelectionChange (val) {
      this.selectGroups = val
    },
    handleNodeClick (data) {
      console.log(data)
      this.collectselected = data
    },
    deletsearch () {
      var params = {}
      this.pageNodel = 1
      params['page'] = this.pageNodel
      params['rows'] = this.pageSizedel
      params['name'] = this.deletname
      this.deldoclist(params)
    },
    deldoclist (params) {
      params['isdel'] = '1'
      this.$get('/epf-document/docdocumentinfo/getTenantDocJson', params).then(
        res => {
          console.log('===========', res)
          if (res.code != '0') {
            this.$message.error(res.msg) // 失败
            this.loading = false
            return
          }
          this.pageNodel = res.pager.pageNo
          this.pageSizedel = res.pager.pageSize
          this.totalPagedel = res.pager.totalPage
          this.totalRecorddel = res.pager.totalRecord
          this.tableData = res.pager.results
        }
      )
    },
    async getGrowpList (params) {
      this.$get('/epf-admin/admin/org/getallOrg', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          return
        }
        console.log(res)
        var orglist = res.ztreeJson
        var selecttree = new Array()
        for (var i = 0; i < orglist.length; i++) {
          if (
            orglist[i].parentId == '0'
            || orglist[i].parentId == ''
            || orglist[i].parentId == null
          ) {
            var selecttree1 = new Array()
            for (var j = 0; j < orglist.length; j++) {
              if (orglist[j].parentId == orglist[i].id) {
                selecttree1.push({
                  value: orglist[j].id,
                  label: orglist[j].orgName
                })
              }
            }
            for (var j = 0; j < selecttree1.length; j++) {
              var selecttree2 = new Array()
              for (var k = 0; k < orglist.length; k++) {
                if (orglist[k].parentId == selecttree1[j].value) {
                  selecttree2.push({
                    value: orglist[k].id,
                    label: orglist[k].orgName
                  })
                }
              }
              if (selecttree2.length > 0) {
                selecttree1[j].children = selecttree2
              }
            }

            if (selecttree1.length > 0) {
              selecttree.push({
                value: orglist[i].id,
                label: orglist[i].orgName,
                children: selecttree1
              })
            } else {
              selecttree.push({
                value: orglist[i].id,
                label: orglist[i].orgName
              })
            }
          }
        }

        this.orgdata = selecttree
      })
    },
    // 编辑
    editFlowpatreason () {
      let that = this
      that.bttype = '修改'
      if (that.selectGroups.length != 1) {
        that.$message.warning('请选择一条数据！')
        return
      } else {
        this.rulForm = that.selectGroups[0]
      }
      that.popups = true
      that.title = '编辑'
    },
    handleDelete () {
      let ids = ''
      let that = this
      if (that.selectGroups.length < 1) {
        that.$message.warning('请选择要删除的数据！')
        return
      } else {
        for (var i = 0; i < this.selectGroups.length; i++) {
          ids += this.selectGroups[i].id + ','
        }
      }
      that
        .$confirm('确认要删除该条信息吗?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          // type: "warning",
          center: true
        })
        .then(() => {
          that
            .$post('/epf-document/admin/doctag/delete', { id: ids })
            .then(res => {
              console.log(res)
              if (res.code != '0') {
                that.$message.error(res.msg)
                return
              }
              that.$message({
                type: 'success',
                message: '删除成功!'
              })

              that.searchInfo['page'] = 1
              that.searchInfo['rows'] = this.pageSize
              that.getDocList(that.searchInfo)
            })
        })
        .catch(() => { })
    },
    handleClick () { },

    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getDocList(this.searchInfo)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.pageSize
      this.getDocList(this.searchInfo)
    },
    // 保存/修改
    async onSubmit (type) {
      var data = this.rulForm
      delete data['childForder']
      delete data['createTime']
      delete data['updateTime']
      data['type'] = '1'
      if (!data.name) {
        this.$message.warning('标签名称不能为空') // 失败
        return
      }
      await this.$post('/epf-document/admin/doctag/tagsave', data).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }
        this.$message.success('保存成功')
        if (type == 1) {
          this.bttype = '保存'
          this.rulForm = {}
        } else if (type == 0) {
          this.bttype = '保存'
          this.rulForm = {}
        }
      })
      this.getDocList(this.searchInfo)

      this.popups = false
    }
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
  padding-right: 15px;
}
.oper span {
  display: inline-block;
  margin: 0 !important;
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
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  padding: 20px 24px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.filter_title_box {
  display: flex;
  justify-content: flex-start;
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
.filter_title__custom_three {
  box-sizing: border-box;
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.filter_title {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
}
.switchHeight_box >>> .el-input__inner {
  height: 40px;
  line-height: 40px;
}
.switchHeight_box >>> .el-input__suffix {
  display: flex;
  align-items: center;
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
  min-height: 100px;
  max-height: 100px;
  box-sizing: border-box;
  padding: 16px 24px;
  margin: 16px 0;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  min-height: 575px;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
  padding-bottom: 80px;
  position: relative;
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
.el-table__body tr td:nth-child(2) .cell .cell_click {
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
.usemngtable td {
  border: 1px solid #b6b6b6;
  line-height: 28px;
}

.tableHead {
  /* background-color: #f9fbff;
    padding: 10px 15px; */
  display: inline-block;
  position: absolute;
  right: 1%;
}
.tableHead .el-upload-list {
  display: none !important;
}
.tableHead .el-upload-list--text {
  display: none !important;
}
.tableHead .el-upload-list__item-name {
  display: none !important;
}
.filterIpt {
  position: relative;
  margin-bottom: 10px;
}
.filterIpt i {
  position: absolute;
  right: 1%;
  top: 20%;
  font-size: 20px;
  cursor: pointer;
}
/* 标签 */
.tabs {
  /* border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5; */
  padding-left: 2%;
}
.tabs span {
  cursor: pointer;
}
.tabs .blu {
  color: #1587db;
}
.tabs i {
  margin: 0 5px;
}
.tabs .blac {
  color: #aeaeae;
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
/* .el-table {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  margin-top: 10px;
} */
.threeEdict {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}
.threeEdict div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
}
/* .middleBox {
  background: rgba(248, 248, 248, 1);
  border: 1px solid rgba(231, 231, 231, 1);
  border-radius: 2px;
  padding: 15px;
} */
</style>
<style>
.zskDialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.zskDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.zskDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.zskDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.zskDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.zskDialog .el-dialog__body .el-form {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.zskDialog .el-dialog__body .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.zskDialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.zskDialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.zskDialog .button_qian,
.zskDialog .button_shen {
  margin-left: 0px;
}

.zskDialog .el-button {
  height: 40px;
  padding: 0px 32px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  cursor: pointer;
}

.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
</style>

