<template>
  <div class="page-body EPF-table"
       id="dispatchlist">
    <div class="filter_wrap">
      <el-row type="flex"
              justify="end">
        <div class="button_kuang">导出</div>
        <div class="button_kuang">任务统计</div>
        <div class="button_qian"
             @click="show3 = !show3">筛选类别</div>
      </el-row>

      <div class="switchHeight_box"
           style="margin-top:16px;"
           v-if="show3">
        <el-row style="margin-bottom:20px;">
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">项目编号：</span>
            <el-input v-model="filterData.projectNo"
                      placeholder="请输入项目编号"
                      style="width:calc(100% - 120px);"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">项目名称：</span>
            <el-input v-model="filterData.projectName"
                      placeholder="请输入项目名称"
                      style="width:calc(100% - 120px);"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom_five">发起人部门：</span>
            <el-cascader placeholder="全部"
                         expand-trigger="hover"
                         :options="orgdata"
                         :show-all-levels="false"
                         v-model="slectdefall"
                         :change-on-select="true"
                         @change="handleChange"
                         style="width:calc(100% - 140px);"></el-cascader>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom_three">经办人：</span>
            <el-input v-model="filterData.operator"
                      placeholder="请输入经办人"
                      style="width:calc(100% - 80px);"
                      :maxlength="20"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom"
                  style="padding-left:32px;">状态：</span>
            <el-select v-model="filterData.statusName"
                       placeholder="全部"
                       @change="status(dictionary.project_status,filterData.statusName,$event)"
                       style="width:calc(100% - 120px);">
              <el-option v-for="(item,index) in dictionary.project_status"
                         :ref="item.zhCn"
                         :id="item.id"
                         :dictKey="item.dictKey"
                         :label="item.zhCn"
                         :value="item.zhCn"
                         :key="index"></el-option>
            </el-select>
          </el-col>
          <el-col :span="14">
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

      <el-table :data="tableData"
                style="width: 100%;margin-top:24px"
                border
                stripe
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)">
        <el-table-column label="项目编号"
                         min-width="120">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.projectNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="projectTypeName"
                         label="项目类型"
                         min-width="170">
        </el-table-column>

        <el-table-column label="主负责区域"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.regionMain }}</span>
          </template>
        </el-table-column>
        <el-table-column label="次负责区域"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.regionVice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发起类型"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <!-- <span hit size="medium">{{ scope.row.class }}</span> -->
            <el-button size="small"
                       type="primary"
                       plain
                       v-if="scope.row.insertType==='1'">本级添加</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.insertType==='0'">下级上报</el-button>
          </template>
        </el-table-column>
        <el-table-column label="发起人部门"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.insertUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="经办人"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.operator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="派发时间"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.distributeDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="签收时间"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.receiveDate }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="状态"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <el-button size="small"
                       type="danger"
                       plain
                       v-if="scope.row.status==='project_status-00E'">质检失败</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-000'">创建中</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-001'">排队中</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-002'">质检中</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-003'">待派发</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-004'">经办待签收</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-005'">经办审核</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-006'">经办核准待签收</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-007'">经办核准</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-008'">经办复核待签收</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-009'">经办复核</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-010'">主任待签收</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-011'">主任审核</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-012'">待省厅审核</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-013'">省厅审核</el-button>
            <el-button size="small"
                       type="warning"
                       plain
                       v-if="scope.row.status==='project_status-014'">省厅审核不通过</el-button>
            <el-button size="small"
                       type="success"
                       plain
                       v-if="scope.row.status==='project_status-015'">已入库</el-button>
            <el-button size="small"
                       type="danger"
                       plain
                       v-if="scope.row.status==='project_status-016'">经办审核不通过</el-button>
            <el-button size="small"
                       type="danger"
                       plain
                       v-if="scope.row.status==='project_status-017'">经办核准不通过</el-button>
            <el-button size="small"
                       type="danger"
                       plain
                       v-if="scope.row.status==='project_status-018'">经办复核不通过</el-button>
            <el-button size="small"
                       type="danger"
                       plain
                       v-if="scope.row.status==='project_status-019'">主任审核不通过</el-button>
            <el-button size="small"
                       type="danger"
                       plain
                       v-if="scope.row.status==='project_status-020'">退回到下级</el-button>
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span class="list-style: none;">
              <el-button v-if="scope.row.urgentFlag==='0'"
                         @click="btnClick(scope.row,'urgent','1')"
                         type="text">加急</el-button>
              <el-button v-else
                         @click="btnClick(scope.row,'urgent','0')"
                         type="text">取消加急</el-button>

              <el-button v-if="scope.row.status!=='project_status-004'&&'project_status-006'&&'project_status-008'&&'project_status-010'"
                         type="text"
                         @click="btnClick(scope.row,'change')">改派</el-button>
              <el-button type="text"
                         @click="btnClick(scope.row,'projectcheck')">查看详情</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页控件 -->
      <div style="text-align:right;margin:8px 0px;margin-top:15px;">
        <el-pagination background
                       layout="prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10, 15, 20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :page-size="pageSize"
                       :current-page="pageNo"></el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible"
               width="25%"
               :modal="true"
               :close-on-click-modal="false"
               :append-to-body="true"
               class="changeDialog">
      <template slot="title"
                slot-scope="scope">
        <el-row class="header">
          <span style="font-size:18px;color:rgba(0,0,0,1);font-weight:700">改派</span>
          <span style="color:rgba(169,169,169,1);">选择派发对象</span>
        </el-row>
      </template>
      <div class="body">
        <el-row type="flex"
                align="middle">
          <img :src="bumen"
               alt />
          <span style="margin-left:15px;color:rgba(54,54,54,1);font-size:16px;">业务拓展部</span>
        </el-row>

        <div class="zy-main">
          <el-scrollbar style="height:100%"
                        ref="main">
            <el-row v-for="(item,index) in tableData2"
                    class="item"
                    align="middle"
                    :key="index">
              <el-col :span="4"
                      style>
                <el-avatar :src="touxiang"
                           :size="52"></el-avatar>
              </el-col>
              <el-col :span="16"
                      class="main">
                <el-row class="one"
                        type="flex"
                        align="middle"
                        style="marin-top:3px">
                  <span class="name">{{item.userName}}</span>
                  <span v-if="item.stauts=='1'"
                        class="status green">工作中</span>
                  <span v-if="item.stauts=='2'"
                        class="status orange">空闲</span>
                  <span v-if="item.stauts=='3'"
                        class="status orange">休假</span>
                  <span v-if="item.stauts=='4'"
                        class="status red">离职</span>
                </el-row>
                <el-row class="two"
                        style="marin-top:3px">
                  <el-col :span="8"
                          class="title">负责区域</el-col>
                  <el-col :span="16"
                          class="content">{{item.regionMain}}</el-col>
                </el-row>
                <el-row class="three"
                        style="marin-top:3px">
                  <el-col :span="8"
                          class="title">总任务数</el-col>
                  <el-col :span="8"
                          class="title">待办任务</el-col>
                  <el-col :span="8"
                          class="title">在办任务</el-col>
                </el-row>
                <el-row class="four"
                        style="marin-top:3px">
                  <el-col :span="8"
                          class="content green">{{item.tasktotal}}</el-col>
                  <el-col :span="8"
                          class="content orange">{{item.tasksDoing}}</el-col>
                  <el-col :span="8"
                          class="content red">{{item.tasksTodo}}</el-col>
                </el-row>
              </el-col>
              <el-col :span="4">
                <el-radio v-model="radio"
                          :label="item"
                          style>&nbsp;</el-radio>
              </el-col>
            </el-row>
          </el-scrollbar>
        </div>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleClose()">确 定 改 派</el-button> -->
        <div class="button_qian"
             @click="dialogVisible = false">取消</div>
        <div style="width:96px;height:40px;"></div>
        <div class="button_shen"
             @click="handleClose()">确定改派</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import selectInput from '@/components/common/form/selectInpt'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'transnotice',
  components: { selectInput },
  data () {
    return {
      slectdefall: [],
      tableData2: [
        {
          id: '1',
          state: '空闲',
          area: '深圳市 惠州市 河源市',
          total: 90,
          ing: 40,
          before: 10
        },
        {
          id: '2',
          state: '空闲',
          area: '深圳市 惠州市 河源市',
          total: 90,
          ing: 40,
          before: 10
        }
      ],
      show3: false,
      bumen: require('../../../../assets/bumen.png'),
      touxiang: require('../../../../assets/touxiang.png'),
      radio: '',
      filterData: {
        projectNo: '',
        projectName: '',
        operator: '',
        statusName: '',
        status: ''
      },
      dicRequest: ['project_status'], // 字典码请求
      dictionary: {
        // 字典码结果
        project_status: ''
      },
      dicNum: 0,
      tableData: [
        {
          number: 10001,
          name: '土地利用总体规划',
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
          name: '土地利用总体规划',
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
          name: '土地利用总体规划',
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
          number: 10004,
          name: '土地利用总体规划',
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
          number: 10005,
          name: '土地利用总体规划',
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
      orgdata: [],
      topLevel: '',
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      dialogVisible: false,
      loading: false, // 控制loading动画显示隐藏
      params: {}
    }
  },

  created () {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        this.$get(
          `/epf-admin/admin/dictionaries/getDictEbyDictGroup/${item}`,
          {}
        ).then(res => {
          console.log(res)
          resolve(res)
        })
      })
      return reqFun
    })
    Promise.all(reqArr).then(res => {
      console.log(res)
      let dicArr = res.map(item => {
        console.log(item)
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          }
        })
        return dicArr
      })
      console.log(dicArr)
      for (let item in this.dictionary) {
        console.log(this.dicNum)
        this.dictionary[item] = dicArr[this.dicNum]
        console.log(dicArr[this.dicNum])
        this.dicNum++
      }
      this.dicFinsh = true
      console.log('字典结果', this.dictionary)
    })

    this.getList()
    this.getGrowpList({})
  },
  methods: {
    ...mapActions(['setTabsList']),
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
        console.log(selecttree)
        this.orgdata = selecttree
      })
    },
    handleClose () {
      if (this.radio.stauts === '2' || this.radio.stauts === '3') {
        this.$confirm('该人员处于工作繁忙/休假中，是否继续派发', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'
        })
          .then(() => {
            this.issue()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消派发'
            })
          })
      } else if (this.radio.stauts === '1') {
        this.$refs['main'].wrap.scrollTop = 0
        this.issue()

        // this.$refs.main.scrollTop = 0;
      } else {
        this.$message.error('该人员已离职')
      }

      this.dialogVisible = false
    },
    handleChange (value) {
      let id = value[value.length - 1]
      this.filterData.insertUnit = id
    },

    btnClick (item, oper, state) {
      var routerPath, title
      if (oper === 'projectcheck') {
        title = ' 查看项目详细信息'
        routerPath = `${oper}?id=${item.id}&isShowReport=${false}`
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({
          path: routerPath,
          query: { id: item.id, isShowReport: false, isShowOpinion: false }
        })
      }
      if (oper === 'change') {
        this.reassignmentObj = item
        this.dialogVisible = true
        this.$post(
          '/epf-result-review/revdistrpersonnel/getRevDistrPersonnelList',
          {}
        ).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.tableData2 = res.revDistrPersonnelList
          } else {
            this.loading = false
            this.$message.error(res.msg) // 失败
            return
          }
        })
      }

      if (oper === 'urgent') {
        this.$post('/epf-result-review/dispatchCenter/dispatchCenterToUrgent', {
          id: item.id,
          urgentFlag: state
        }).then(res => {
          if (res.code == '0') {
            this.$message.success('成功')
            this.getList()
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        })
      }

      // this.getObject(row.id)
    },
    topLevelAdd () {
      this.$post('/epf-onemap/admin/mapdiretree/addFristMapDireTree', {
        name: this.topLevel
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.topLevel = ''
          this.$message.success('添加成功')
          this.dialogVisible = false
          this.getList()
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    issue () {
      this.$post('/epf-result-review/dispatchCenter/dispatchCenterToSend', {
        userId: this.radio.userId,
        id: this.reassignmentObj.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$message.success('派发成功')
          this.getList()
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.params = {}
      this.orgdata = []
      this.singleuser = {}
      this.slectdefall = []
      this.getList()
      this.getGrowpList({})
    },
    searchList () {
      this.params['filterData'] = JSON.stringify(this.filterData)
      this.getList()
    },
    getList (val) {
      this.loading = true

      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize

      this.$post(
        '/epf-result-review/dispatchCenter/getDispatchCenterJson',
        params
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.tableData = res.pager.results
          for (var i = 0; i < this.tableData.length; i++) {
            console.log(this.tableData[i].projectType)
            if (this.tableData[i].projectType == 'project_type-001') {
              this.$set(this.tableData[i], 'projectTypeName', '总体规划')
            }
            if (this.tableData[i].projectType == 'project_type-002') {
              this.$set(this.tableData[i], 'projectTypeName', '详细计划')
            }
            if (this.tableData[i].projectType === 'project_type-003') {
              this.$set(this.tableData[i], 'projectTypeName', '规划计划')
            }
            for (var j = 0; j < this.dictionary.project_status.length; j++) {
              if (
                this.tableData[i].status
                == this.dictionary.project_status[j].dictKey
              ) {
                this.tableData[i][
                  'statusName'
                ] = this.dictionary.project_status[j].zhCn
              } else {
                this.tableData[i]['statusName'] = ''
              }
            }
          }
          console.log(this.tableData)
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
      })
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
    status (dic, statusName, event) {
      this.filterData.status = this.$refs[statusName][0].$attrs.dictKey
    }
  }
}
</script>

<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
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
.filter_title__custom_two {
  box-sizing: border-box;
  width: 60px;
  min-width: 60px;
  max-width: 60px;
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
.filter_title__custom_five {
  box-sizing: border-box;
  width: 110px;
  min-width: 110px;
  max-width: 110px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.switchHeight_box {
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.el-input__inner {
  background: rgba(255, 255, 255, 1);
  border: 1px solid #ebeef5;
  height: 36px;
  line-height: 40px;
}

.frist span {
  margin-right: 15px;
}
.second {
  margin-top: 5px;
}

.body {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(151, 151, 151, 1);
  border-radius: 3px;
  font-family: Microsoft YaHei;
}

.body .title {
  font-size: 16px;
  color: #363535;
}
.body .content {
  font-size: 14px;
}
.body .name {
  font-size: 18px;
  color: rgba(0, 85, 177, 1);
  font-weight: 700;
  display: inline-block;
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.body .status {
  font-size: 16px;
  font-weight: 700;
}
.zy-main {
  /* height: 300px;
  overflow: hidden; */
  position: relative;
}
.green {
  color: rgba(112, 182, 3, 1);
}
.red {
  color: rgba(246, 108, 108, 1);
}

.orange {
  color: rgba(245, 154, 35, 1);
}
.item {
  cursor: pointer;
  padding: 13px 0px;
}
.item:hover {
  background: #fff;
  /* background: rgba(245, 250, 255, 1); */
}

.main .el-row {
  margin-top: 3px;
}
</style>
<style>
/* #dispatchlist .el-dialog__header {
  border-bottom: none;
}
#dispatchlist .el-dialog__body {
  padding: 15px;
}

#dispatchlist .el-dialog {
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 7px;
  border: 1px solid rgba(213, 213, 213, 1);
}

#dispatchlist .el-dialog__footer {
  border-top: none;
} */

#dispatchlist .el-scrollbar__wrap {
  overflow-x: hidden;
}

.changeDialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.changeDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.changeDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.changeDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.changeDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.changeDialog .el-dialog__body .body {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.changeDialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.changeDialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.changeDialog .button_qian,
.changeDialog .button_shen {
  margin-left: 0px;
}
</style>
