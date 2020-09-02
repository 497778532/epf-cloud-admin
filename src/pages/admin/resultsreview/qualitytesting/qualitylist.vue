<template>
  <!-- <div>质检队列</div> -->
  <div class="page-body EPF-table"
       id="serveBody">
    <div class="filter_wrap">
      <div style="text-align:right;overflow:hidden;">
        <el-button type="text"
                   icon="el-icon-finished"
                   @click="flexSwitch">筛选类别</el-button>
      </div>
      <div class="switchHeight_box"
           v-if="isShow==true">
        <el-row style="margin-bottom:20px;">
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">项目编号：</span>
            <el-input v-model="filterData.projectNo"
                      size="small"
                      placeholder="请输入项目编号"
                      style="width:calc(100% - 120px);"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom_six">质检项目名称：</span>
            <el-input v-model="filterData.projectName"
                      size="small"
                      placeholder="请输入质检项目名称"
                      style="width:calc(100% - 155px);"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">所属区域：</span>
            <el-cascader size="small"
                         style="width:calc(100% - 120px);"
                         :props="props"
                         clearable
                         v-model="areaSelectedOptions"
                         @change="areaSelect()"></el-cascader>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box_end">
            <span class="filter_title__custom">项目类型：</span>
            <el-select v-model="filterData.projectTypeName"
                       placeholder="全部"
                       @change="projectTypeSelect"
                       style="width:calc(100% - 90px);">
              <el-option v-for="item in projectTypeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:0px;">
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">上传单位：</span>
            <el-cascader placeholder="全部"
                         expand-trigger="hover"
                         :options="orgdata"
                         :show-all-levels="false"
                         v-model="slectdefall"
                         :change-on-select="true"
                         @change="handleChange"
                         style="width:calc(100% - 120px);"></el-cascader>
          </el-col>
          <el-col :span="9"
                  class="filter_title_box">
            <span class="filter_title__custom_six">质检开始时间：</span>
            <el-date-picker v-model="projectTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            style="width:calc(100% - 155px);"></el-date-picker>
          </el-col>
          <el-col :span="5">
            <div style="width:100%;height:40px;"></div>
          </el-col>
          <el-col :span="4"
                  style="display:flex;justify-content:flex-end;">
            <div class="primary_reset"
                 @click="resetFilter()">重置</div>
            <div class="primary_search"
                 @click="searchList()">搜索</div>
          </el-col>
        </el-row>
      </div>
      <el-tabs style="margin-top:35px;">
        <el-table ref="multipleTable"
                  :data="proList"
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:100px;"
                  border
                  stripe>
          <el-table-column prop="projectNo"
                           label="项目编号"
                           min-width="250"
                           align="center"></el-table-column>
          <el-table-column prop="projectName"
                           label="质检项目名称"
                           min-width="200"
                           align="center"></el-table-column>
          <!-- <el-table-column prop="projectTypeName" label="类型" min-width="150" align="center"></el-table-column> -->
          <el-table-column prop="projectTypeName"
                           label="项目类型"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column prop="ownAreaName"
                           label="所属区域"
                           min-width="150"
                           align="center"></el-table-column>
          <el-table-column prop="insertType"
                           label="质检项目类型"
                           min-width="150"
                           align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.insertType==='0'">下级上报</span>
              <span v-if="scope.row.insertType==='1'">本级添加</span>
            </template>
          </el-table-column>
          <el-table-column prop="orgName"
                           label="上传单位"
                           min-width="250"
                           align="center"></el-table-column>
          <el-table-column prop="checkStartDate"
                           label="质检开始时间"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="checkEndDate"
                           label="质检完成时间"
                           min-width="200"
                           align="center"></el-table-column>
          <!-- <el-table-column prop="projectStatusName" label="状态" min-width="250" align="center"></el-table-column> -->
          <el-table-column prop="projectQualiStatusName"
                           label="质检状态"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column label="操作"
                           min-width="200"
                           fixed="right"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         v-if="scope.row.projectQualiStatus==='project_quali_status-005'"
                         @click="handelClickTest(scope.row)">重新质检</el-button>
              <el-button type="text"
                         size="small"
                         v-else
                         @click="handelClickCheck(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination background
                         layout="total,prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10,15,20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="totalRecord"
                         :current-page.sync="currentPage"
                         :page-size="pageSize"></el-pagination>
        </div>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'qualitylist',
  data () {
    return {
      areaSelectedOptions: ['440000'],
      props: {
        value: 'dictKey',
        label: 'zhCn',
        checkStrictly: true,
        expandTrigger: 'hover',
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level } = node
          if (level === 0) {
            const dictionariesList = [{
              zhCn: '广东省',
              id: '440000',
              parentId: '0',
              dictKey: '440000',
              dictValue: '440000'
            }]
            return resolve(dictionariesList)
          }
          const res = await axios.get(
            `/api/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${node.data.dictKey}`
          )
          res.dictionariesList.forEach(
            item => (item.leaf = level >= 2)
          )
          return resolve(res.dictionariesList)
        }
      },
      projectTypeList: [],
      ownArea: '440000',

      proList: [],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: false,
      filterData: {
        projectName: '', // 成果名称关键词
        projectType: '', // 类型id
        projectTypeName: '', // 类型
        projectQualiStatus: '', // 状态id
        projectStatusName: '', // 状态id
        insertUnit: '',
        ownArea: '440000'
      },
      projectTime: '',

      orgdata: [],
      searchselectdefall: [],
      slectdefall: [],
      singleuser: {},

      params: {
        projectName: '', // 成果名称关键词
        projectType: '', // 类型id
        projectTypeName: '', // 类型
        insertUnit: '', // 创建单位
        projectQualiStatus: '', // 状态id
        projectStatusName: '', // 状态id
        searchTimeBegin: '', // 时间
        searchTimeEnd: '' // 时间
      },
      // 日期选择器
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      dealTime: '',
      isShow: true,
      dicRequest: ['project_type', 'project_status'], // 字典码请求
      dictionary: {
        // 字典码结果
        project_type: '',
        project_status: ''
      },
      dicNum: 0, // 字典循环下标

      dictObj: {
        dictKey: '',
        id: '',
        zhCn: '全部'
      }
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    // tableHeaderColor({ rowIndex }) {
    //   if (rowIndex === 0) {
    //     return "background-color: #deeeff;font-weight: bolder;";
    //   }
    // },
    flexSwitch () {
      setTimeout(() => {
        this.isShow = !this.isShow
      }, 100)
    },
    handelClickAdd () {
      let title = '添加成果审查信息'
      let routerPath = 'projectadd'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    handelClickTest (item) {
      this.$confirm('确定对改项目进行重新自检？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      })
        .then(async () => {
          let id = item.projectId
          let res = await this.$post('/epf-result-review/quali/queen/manual', {
            projectId: id
          })
          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '申请质检成功'
            })
            this.getList()
          }
        })

        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消申请质检'
          })
        })
    },

    handelClickCheck () {
      let title = '质检结果列表'
      let routerPath = 'qualityresult'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },

    // 获取列表
    getList () {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-result-review/quali/queen/getPageList', params).then(
        res => {
          if (res.code == '0') {
            this.proList = res.pager.results
            this.pageNo = res.pager.pageNo
            this.pageSize = res.pager.pageSize
            this.totalPage = res.pager.totalPage
            this.totalRecord = res.pager.totalRecord
            this.loading = false
          } else {
            this.loading = false
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },

    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.projectTime = ''
      this.searchselectdefall = []
      this.orgdata = []
      this.singleuser = {}
      this.slectdefall = []
      this.areaSelectedOptions = ['440000']
      this.ownArea = '440000'
      this.getList()
      this.getGrowpList({})
      this.getProjectType()
    },
    searchList () {
      this.params = this.filterData
      this.params['insertUnit'] = this.singleuser.orgId
      if (this.projectTime) {
        this.params['searchTimeBegin'] = this.projectTime[0]
        this.params['searchTimeEnd'] = this.projectTime[1]
      }
      this.getList()
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getList()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getList()
    },

    // 字典选择
    // projectTypeSelect (dic, projectType, event) {
    //   this.filterData.projectType = this.$refs[projectType][0].$attrs.dictKey
    // },
    projectStatusSelect (dic, projectStatus, event) {
      this.filterData.projectStatus = this.$refs[
        projectStatus
      ][0].$attrs.dictKey
    },

    async getGrowpList (params) {
      this.$get('/epf-admin/admin/org/getallOrg', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          return
        }

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
    queryuserifo (id) {
      let that = this
      var url = '/epf-admin/admin/user/getUser'
      var params = { id: id }
      this.$get(url, params)
        .then(res => {
          that.singleuser = res.user
          that.imageUrl = that.getImgUrl(res.user.iconImg)
          if (res.user.orgId != '' && res.user.orgId != null) {
            var orgid = []
            var orgdt = that.orgdata

            for (var i = 0; i < orgdt.length; i++) {
              if (orgdt[i].value == res.user.orgId) {
                var orgid = [res.user.orgId]
                break
              }
              if (orgdt[i].children) {
                for (var k = 0; k < orgdt[i].children.length; k++) {
                  if (orgdt[i].children[k].value == res.user.orgId) {
                    var orgid = [orgdt[i].value, orgdt[i].children[k].value]
                    break
                  }
                  if (orgdt[i].children[k].children) {
                    for (
                      var j = 0;
                      j < orgdt[i].children[k].children.length;
                      j++
                    ) {
                      if (
                        orgdt[i].children[k].children[j].value == res.user.orgId
                      ) {
                        var orgid = [
                          orgdt[i].value,
                          orgdt[i].children[k].value,
                          orgdt[i].children[k].children[j].value
                        ]
                        break
                      }
                    }
                  }
                }
              }
            }
            that.slectdefall = orgid
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    handleChange (value) {
      this.filterData.insertUnit = value[value.length - 1]
    },
    areaSelect () {
      if (this.areaSelectedOptions.length === 3) {
        this.filterData.ownArea = this.areaSelectedOptions[2]
        this.ownArea = this.areaSelectedOptions[2]
      } else if (this.areaSelectedOptions.length === 2) {
        this.filterData.ownArea = this.areaSelectedOptions[1]
        this.ownArea = this.areaSelectedOptions[1]
      } else if (this.areaSelectedOptions.length === 1) {
        this.filterData.ownArea = this.areaSelectedOptions[0]
        this.ownArea = this.areaSelectedOptions[0]
      }
      this.filterData.projectType = ''
      this.filterData.projectTypeName = ''
      this.getProjectType()
    },
    async getProjectType () {
      let res = await this.$get(
        `/epf-result-review/revplanningcategorymanage/getRevPlanningType?cantonId=${this.ownArea}&orgId=${sessionStorage.getItem('orgId')}`
      )
      if (res.code === 0) {
        this.projectTypeList = []
        for (var key in res.planning) {
          this.projectTypeList.push({
            value: res.planning[key].planningTypeId,
            label: res.planning[key].planningTypeName
          })
        }
      } else {
        this.$message.error(res.msg)
      }
    },
    projectTypeSelect (val) {
      this.filterData.projectType = val.value
      this.filterData.projectTypeName = val.label
    }
  },
  created () {
    const that = this
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        this.$get(
          `/epf-admin/admin/dictionaries/getDictEbyDictGroup/${item}`,
          {}
        ).then(res => {
          resolve(res)
        })
      })
      return reqFun
    })
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item => {
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          }
        })
        return dicArr
      })
      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum]
        this.dicNum++
      }
      this.dicFinsh = true
    })
    this.getList()
    this.getGrowpList({})
    this.getProjectType()
  },

  mounted () {
    Bus.$on('proSubmit', val => {
      this.getList()
    })
  },
  watch: {
    areaSelectedOptions (val) {
      if (val.length === 3) {
        this.ownArea = val[2]
      } else if (val.length === 2) {
        this.ownArea = val[1]
      } else if (val.length === 1) {
        this.ownArea = val[0]
      } else if (val.length === 0) {
        this.ownArea = ''
      }
      this.filterData.projectType = ''
      this.filterData.projectTypeName = ''
      this.getProjectType()
    }
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
  margin-bottom: 5px;
}
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
  display: inline-block;
  width: 80px;
  height: 32px;
  background-color: #1e7ae5;
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
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.filter_title_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.filter_title_box_end {
  display: flex;
  justify-content: flex-end;
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
.filter_title__custom_six {
  box-sizing: border-box;
  width: 125px;
  min-width: 125px;
  max-width: 125px;
  height: 40px;
  padding-right: 10px;
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
  /* border: 1px solid #c6c6c6; */
}
#serveBody .el-pagination .el-input__inner {
  height: 28px;
  /* border: 1px solid #c6c6c6; */
}
</style>
