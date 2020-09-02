<template>
  <div class="page-body EPF-table"
       id="serveBody">
    <div style="height:100%;">
      <!-- <el-scrollbar style="height:100%;"> -->
      <div class="filter_wrap">
        <div class="assignmentBigBox">
          <div class="assignmentBox"
               :class="{bgI1:!this.isTotal,bgIHover1:this.isTotal}"
               @click="turnTotal">
            <div class="assignmentLeft">
              <span>{{this.newYear}}</span>
              <span>全部项目</span>
            </div>
            <div class="assignmentRight">{{this.totalStatus}}</div>
          </div>

          <div class="assignmentBox"
               :class="{bgI2:!this.isBacklog,bgIHover2:this.isBacklog}"
               @click="turnBacklog">
            <div class="assignmentLeft">
              <span>{{this.newYear}}</span>
              <span>待处理</span>
            </div>
            <div class="assignmentRight">{{this.backlogStatus}}</div>
          </div>
          <div class="assignmentBox"
               :class="{bgI3:!this.isIndo,bgIHover3:this.isIndo}"
               @click="turnIndo">
            <div class="assignmentLeft">
              <span>{{this.newYear}}</span>
              <span>办理中</span>
            </div>
            <div class="assignmentRight">{{this.onlineStatus}}</div>
          </div>
          <div class="assignmentBox"
               :class="{bgI4:!this.isCompleted,bgIHover4:this.isCompleted}"
               @click="turnCompleted">
            <div class="assignmentLeft">
              <span>{{this.newYear}}</span>
              <span>已办理</span>
            </div>
            <div class="assignmentRight">{{this.completedStatus}}</div>
          </div>
          <div class="assignmentBox"
               :class="{bgI5:!this.isSuccess,bgIHover5:this.isSuccess}"
               @click="turnSuccess">
            <div class="assignmentLeft">
              <span>{{this.newYear}}</span>
              <span>已办结</span>
            </div>
            <div class="assignmentRight">{{this.successStatus}}</div>
          </div>
          <div class="assignmentBox"
               :class="{bgI6:!this.isBack,bgIHover6:this.isBack}"
               @click="turnBack">
            <div class="assignmentLeft">
              <span>{{this.newYear}}</span>
              <span>回退记录</span>
            </div>
            <div class="assignmentRight">{{this.backStatus}}</div>
          </div>

          <el-button type="text"
                     icon="el-icon-finished"
                     @click="flexSwitch"
                     style="margin-top:65px;">筛选类别</el-button>
        </div>

        <div class="switchHeight_box"
             style="margin-top:16px;"
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
              <span class="filter_title__custom_five"
                    style="padding-left:17px;">项目名称：</span>
              <el-input v-model="filterData.projectName"
                        size="small"
                        placeholder="请输入项目名称"
                        style="width:calc(100% - 140px);"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom">流程环节：</span>
              <el-input v-model="filterData.linkNow"
                        size="small"
                        placeholder="请输入流程环节"
                        style="width:calc(100% - 120px);"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom_two">状态：</span>
              <el-select v-model="filterData.projectStatusName"
                         size="small"
                         placeholder="全部"
                         @change="projectStatusSelect(dictionary.project_status,filterData.projectStatusName,$event)"
                         style="width:calc(100% - 60px);">
                <el-option v-for="(item,index) in dictionary.project_status"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row style="margin-bottom:0px;">
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom"
                    style="padding-left:15px;">发起人：</span>
              <el-input v-model="filterData.insertUserName"
                        size="small"
                        placeholder="请输入发起人"
                        style="width:calc(100% - 120px);"
                        :maxlength="20"></el-input>
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
            <el-col :span="8">
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
        <!-- 全部任务表格 -->
        <el-tabs style="margin-top:24px;"
                 v-if="this.current==0">
          <el-table ref="multipleTable"
                    :data="totalAssignmentList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    stripe>
            <el-table-column prop="projectNo"
                             label="项目编号"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectName"
                             label="项目名称"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectTypeName"
                             label="项目类型"
                             min-width="150"
                             align="center">
            </el-table-column>
            <el-table-column prop="insertUserName"
                             label="发起人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertType"
                             label="发起类型"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
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
            <el-table-column prop="insertUnitName"
                             label="发起人部门"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="linkNow"
                             label="当前流程环节"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="userNow"
                             label="当前审批人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertTime"
                             label="发起时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="endTime"
                             label="到期时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="surplusDay"
                             label="剩余天数"
                             min-width="150"
                             align="center">
              <template>
                <span>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="projectStatusName"
                             label="状态"
                             min-width="200"
                             align="center">
              <template slot-scope="scope">
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-00E'">
                  质检失败
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-000'">
                  创建中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-001'">
                  排队中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-002'">
                  质检中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-003'">
                  待派发
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-004'">
                  经办待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-005'">
                  经办审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-006'">
                  经办核准待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-007'">
                  经办核准
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-008'">
                  经办复核待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-009'">
                  经办复核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-010'">
                  主任待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-011'">
                  主任审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-012'">
                  待省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-013'">
                  省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-014'">
                  省厅审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="success"
                           plain
                           v-if="scope.row.projectStatus==='project_status-015'">
                  已入库
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-016'">
                  经办审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-017'">
                  经办核准不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-018'">
                  经办复核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-019'">
                  主任审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-020'">
                  退回到下级
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             min-width="200"
                             fixed="right"
                             align="center">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           @click="handelClickCheck(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="totalRecord"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </el-tabs>
        <!-- 待处理任务表格 -->
        <el-tabs style="margin-top:24px;"
                 v-if="this.current==1">
          <el-table ref="multipleTable"
                    :data="backlogAssignmentList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    stripe>
            <el-table-column prop="projectNo"
                             label="项目编号"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectName"
                             label="项目名称"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectTypeName"
                             label="项目类型"
                             min-width="150"
                             align="center">
            </el-table-column>
            <el-table-column prop="insertUserName"
                             label="发起人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertType"
                             label="发起类型"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
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
            <el-table-column prop="insertUnitName"
                             label="发起人部门"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="linkNow"
                             label="当前流程环节"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="userNow"
                             label="当前审批人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertTime"
                             label="发起时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="updateTime"
                             label="最后操作时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="projectStatusName"
                             label="状态"
                             min-width="200"
                             align="center">
              <template slot-scope="scope">
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-00E'">
                  质检失败
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-000'">
                  创建中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-001'">
                  排队中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-002'">
                  质检中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-003'">
                  待派发
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-004'">
                  经办待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-005'">
                  经办审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-006'">
                  经办核准待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-007'">
                  经办核准
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-008'">
                  经办复核待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-009'">
                  经办复核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-010'">
                  主任待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-011'">
                  主任审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-012'">
                  待省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-013'">
                  省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-014'">
                  省厅审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="success"
                           plain
                           v-if="scope.row.projectStatus==='project_status-015'">
                  已入库
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-016'">
                  经办审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-017'">
                  经办核准不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-018'">
                  经办复核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-019'">
                  主任审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-020'">
                  退回到下级
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             min-width="250"
                             fixed="right"
                             align="center">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           @click="handelClickSign(scope.row)">签收</el-button>
                <el-button type="text"
                           size="small"
                           v-if="scope.row.projectStatus==='project_status-004'"
                           @click="handelClickChange(scope.row)">申请改派</el-button>
                <el-button type="text"
                           size="small"
                           @click="handelClickBacklogCheck(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="totalRecord"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </el-tabs>
        <!-- 在办任务表格 -->
        <el-tabs style="margin-top:24px;"
                 v-if="this.current==2">
          <el-table ref="multipleTable"
                    :data="onlineAssignmentList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    stripe>
            <el-table-column prop="projectNo"
                             label="项目编号"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectName"
                             label="项目名称"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectTypeName"
                             label="项目类型"
                             min-width="150"
                             align="center">
            </el-table-column>
            <el-table-column prop="insertUserName"
                             label="发起人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertType"
                             label="发起类型"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
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
            <el-table-column prop="insertUnitName"
                             label="发起人部门"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="linkNow"
                             label="当前流程环节"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="userNow"
                             label="当前审批人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertTime"
                             label="发起时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="updateTime"
                             label="最后操作时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="projectStatusName"
                             label="状态"
                             min-width="200"
                             align="center">
              <template slot-scope="scope">
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-00E'">
                  质检失败
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-000'">
                  创建中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-001'">
                  排队中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-002'">
                  质检中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-003'">
                  待派发
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-004'">
                  经办待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-005'">
                  经办审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-006'">
                  经办核准待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-007'">
                  经办核准
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-008'">
                  经办复核待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-009'">
                  经办复核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-010'">
                  主任待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-011'">
                  主任审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-012'">
                  待省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-013'">
                  省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-014'">
                  省厅审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="success"
                           plain
                           v-if="scope.row.projectStatus==='project_status-015'">
                  已入库
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-016'">
                  经办审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-017'">
                  经办核准不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-018'">
                  经办复核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-019'">
                  主任审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-020'">
                  退回到下级
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             min-width="200"
                             fixed="right"
                             align="center">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           @click="handelClickAudit(scope.row)">审核</el-button>
                <el-button type="text"
                           size="small"
                           @click="handelClickBack(scope.row)">退回</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="totalRecord"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </el-tabs>
        <!-- 已办任务表格 -->
        <el-tabs style="margin-top:24px;"
                 v-if="this.current==3">
          <el-table ref="multipleTable"
                    :data="completedAssignmentList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    stripe>
            <el-table-column prop="projectNo"
                             label="项目编号"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectName"
                             label="项目名称"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectTypeName"
                             label="项目类型"
                             min-width="150"
                             align="center">
            </el-table-column>
            <el-table-column prop="insertUserName"
                             label="发起人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertType"
                             label="发起类型"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
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
            <el-table-column prop="insertUnitName"
                             label="发起人部门"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="linkNow"
                             label="当前流程环节"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="userNow"
                             label="当前审批人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertTime"
                             label="发起时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="updateTime"
                             label="最后操作时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="projectStatusName"
                             label="状态"
                             min-width="200"
                             align="center">
              <template slot-scope="scope">
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-00E'">
                  质检失败
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-000'">
                  创建中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-001'">
                  排队中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-002'">
                  质检中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-003'">
                  待派发
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-004'">
                  经办待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-005'">
                  经办审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-006'">
                  经办核准待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-007'">
                  经办核准
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-008'">
                  经办复核待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-009'">
                  经办复核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-010'">
                  主任待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-011'">
                  主任审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-012'">
                  待省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-013'">
                  省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-014'">
                  省厅审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="success"
                           plain
                           v-if="scope.row.projectStatus==='project_status-015'">
                  已入库
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-016'">
                  经办审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-017'">
                  经办核准不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-018'">
                  经办复核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-019'">
                  主任审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-020'">
                  退回到下级
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             min-width="200"
                             fixed="right"
                             align="center">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           @click="handelClickIndoCheck(scope.row)">查看详情</el-button>
                <el-button type="text"
                           size="small"
                           v-if="scope.row.projectStatus==='project_status-006'||scope.row.projectStatus==='project_status-008'||scope.row.projectStatus==='project_status-010'"
                           @click="handelClickRecall(scope.row)">撤回</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="totalRecord"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </el-tabs>
        <!-- 办结任务表格 -->
        <el-tabs style="margin-top:24px;"
                 v-if="this.current==4">
          <el-table ref="multipleTable"
                    :data="successAssignmentList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    stripe>
            <el-table-column prop="projectNo"
                             label="项目编号"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectName"
                             label="项目名称"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectTypeName"
                             label="项目类型"
                             min-width="150"
                             align="center">
            </el-table-column>
            <el-table-column prop="insertUserName"
                             label="发起人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertType"
                             label="发起类型"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
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
            <el-table-column prop="insertUnitName"
                             label="发起人部门"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="linkNow"
                             label="当前流程环节"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="userNow"
                             label="当前审批人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertTime"
                             label="发起时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="updateTime"
                             label="最后操作时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="projectStatusName"
                             label="状态"
                             min-width="200"
                             align="center">
              <template slot-scope="scope">
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-00E'">
                  质检失败
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-000'">
                  创建中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-001'">
                  排队中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-002'">
                  质检中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-003'">
                  待派发
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-004'">
                  经办待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-005'">
                  经办审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-006'">
                  经办核准待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-007'">
                  经办核准
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-008'">
                  经办复核待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-009'">
                  经办复核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-010'">
                  主任待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-011'">
                  主任审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-012'">
                  待省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-013'">
                  省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-014'">
                  省厅审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="success"
                           plain
                           v-if="scope.row.projectStatus==='project_status-015'">
                  已入库
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-016'">
                  经办审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-017'">
                  经办核准不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-018'">
                  经办复核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-019'">
                  主任审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-020'">
                  退回到下级
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             min-width="200"
                             fixed="right"
                             align="center">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           @click="handelClickSuccessCheck(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="totalRecord"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </el-tabs>
        <!-- 退回任务表格 -->
        <el-tabs style="margin-top:24px;"
                 v-if="this.current==5">
          <el-table ref="multipleTable"
                    :data="backAssignmentList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    stripe>
            <el-table-column prop="projectNo"
                             label="项目编号"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectName"
                             label="项目名称"
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="projectTypeName"
                             label="项目类型"
                             min-width="150"
                             align="center">
            </el-table-column>
            <el-table-column prop="insertUserName"
                             label="发起人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertType"
                             label="发起类型"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
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
            <el-table-column prop="insertUnitName"
                             label="发起人部门"
                             min-width="220"
                             align="center"></el-table-column>
            <el-table-column prop="linkNow"
                             label="当前流程环节"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="userNow"
                             label="当前审批人"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="insertTime"
                             label="发起时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="updateTime"
                             label="最后操作时间"
                             min-width="300"
                             align="center"></el-table-column>
            <el-table-column prop="projectStatusName"
                             label="状态"
                             min-width="200"
                             align="center">
              <template slot-scope="scope">
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-00E'">
                  质检失败
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-000'">
                  创建中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-001'">
                  排队中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-002'">
                  质检中
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-003'">
                  待派发
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-004'">
                  经办待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-005'">
                  经办审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-006'">
                  经办核准待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-007'">
                  经办核准
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-008'">
                  经办复核待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-009'">
                  经办复核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-010'">
                  主任待签收
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-011'">
                  主任审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-012'">
                  待省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-013'">
                  省厅审核
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="warning"
                           plain
                           v-if="scope.row.projectStatus==='project_status-014'">
                  省厅审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="success"
                           plain
                           v-if="scope.row.projectStatus==='project_status-015'">
                  已入库
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-016'">
                  经办审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-017'">
                  经办核准不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-018'">
                  经办复核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-019'">
                  主任审核不通过
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
                <el-button size="small"
                           id="thunderButton"
                           type="danger"
                           plain
                           v-if="scope.row.projectStatus==='project_status-020'">
                  退回到下级
                  <i class="thunderIcon"
                     v-if="scope.row.urgentFlag=='1'"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             min-width="200"
                             fixed="right"
                             align="center">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           v-if="scope.row.projectStatus==='project_status-020'"
                           @click="handelClickBackCheck(scope.row)">查看详情</el-button>
                <el-button type="text"
                           size="small"
                           v-if="scope.row.projectStatus!='project_status-020'"
                           @click="handelClickExamine(scope.row)">审查</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="totalRecord"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </el-tabs>

        <!-- 已办--退回弹窗 -->
        <el-dialog title="退回"
                   :visible.sync="completedBackVisible"
                   width="40%"
                   :modal="true"
                   :close-on-click-modal="false"
                   :append-to-body="true"
                   class="assignmentDialog">
          <el-form :model="completedBackForm"
                   ref="completedBackForm"
                   label-width="100px">
            <el-form-item label="节点选择：">
              <el-radio-group v-model="completedBackForm.opt">
                <el-radio label="RETURN_ROOT">退回到下级</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-00E'">质检失败</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-000'">创建中</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-001'">排队中</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-002'">质检中</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-003'">待派发</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-004'">经办待签收</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-005'">经办审核</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-006'">经办核准待签收</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-007'">经办核准</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-008'">经办复核待签收</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-009'">经办复核</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-010'">主任待签收</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-011'">主任审核</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-012'">待省厅审核</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-013'">省厅审核</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-014'">省厅审核不通过</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-015'">已入库</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-016'">经办审核不通过</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-017'">经办核准不通过</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-018'">经办复核不通过</el-radio>
                <el-radio label="RETURN_BEFORE"
                          v-if="this.nodeSelectLabel=='project_status-019'">主任审核不通过</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="意见：">
              <el-input type="textarea"
                        :maxlength="300"
                        :minlength="0"
                        @input="descInput"
                        :autosize="{ minRows: 6, maxRows: 6}"
                        v-model="completedBackForm.remarks"
                        placeholder="请输入至少5个字符"
                        style="width:90%;min-height:150px;"></el-input>
              <span class="numberV"
                    style="color:#999;">{{txtVal}}/300</span>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <!-- <el-button @click="completedBackCancel">取 消</el-button>
            <el-button type="primary"
                       @click="completedBackSend('completedBackForm')">发 送</el-button> -->
            <div class="button_qian"
                 @click="completedBackCancel">取消</div>
            <div style="width:96px;height:40px;"></div>
            <div class="button_shen"
                 @click="completedBackSend('completedBackForm')">发送</div>
          </div>
        </el-dialog>
      </div>
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import qs from 'qs'
import Bus from '../../../../utils/bus'
import moment from 'moment'

export default {
  name: 'totalassignment',

  data () {
    return {
      totalAssignmentList: [], // 全部列表
      backlogAssignmentList: [], // 待处理列表
      onlineAssignmentList: [], // 办理中列表
      completedAssignmentList: [], // 已办理列表
      successAssignmentList: [], // 已办结列表
      backAssignmentList: [], // 回退目录

      totalStatus: '', // 全部数量
      backlogStatus: '', // 待处理数量
      onlineStatus: '', // 办理中数量
      completedStatus: '', // 已办理数量
      successStatus: '', // 已办结数量
      backStatus: '', // 回退数量

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: false,

      filterData: {
        projectNo: '', // 项目编号
        projectName: '', // 项目名称
        linkNow: '', // 流程环节
        insertUserName: '', // 发起人
        projectStatus: '', // 状态id
        projectStatusName: '' // 状态
      },

      orgdata: [],
      searchselectdefall: [],
      slectdefall: [],
      singleuser: {},

      params: {
        projectNo: '', // 项目编号
        projectName: '', // 项目名称
        linkNow: '', // 流程环节
        insertUserName: '', // 发起人
        insertUnit: '', // 发起人部门
        projectStatus: '', // 状态id
        projectStatusName: '' // 状态
      },

      isTotal: '',
      isBacklog: '',
      isIndo: '',
      isCompleted: '',
      isSuccess: '',
      isBack: '',
      current: '',
      isShow: false,

      completedBackVisible: false,
      completedBackForm: {
        projectId: '',
        opt: '',
        remarks: ''
      },
      txtVal: '',
      nodeSelectLabel: '',

      dicRequest: ['project_status'], // 字典码请求
      dictionary: {
        // 字典码结果
        project_status: ''
      },
      dicNum: 0, // 字典循环下标

      dictObj: {
        dictKey: '',
        id: '',
        zhCn: '全部'
      },

      newYear: moment().year()
    }
  },

  methods: {
    ...mapActions(['setTabsList']),

    flexSwitch () {
      setTimeout(() => {
        this.isShow = !this.isShow
      }, 100)
    },
    // tableHeaderColorTotal({ rowIndex }) {
    //   if (rowIndex === 0) {
    //     return "background-color: rgba(189, 208, 255,.3);font-weight: bolder;";
    //   }
    // },
    // tableHeaderColorBacklog({ rowIndex }) {
    //   if (rowIndex === 0) {
    //     return "background-color:rgba(209, 171, 254,.3);font-weight: bolder;";
    //   }
    // },
    // tableHeaderColorOnline({ rowIndex }) {
    //   if (rowIndex === 0) {
    //     return "background-color: rgba(255, 193, 154,.3);font-weight: bolder;";
    //   }
    // },
    // tableHeaderColorCompleted({ rowIndex }) {
    //   if (rowIndex === 0) {
    //     return "background-color: rgba(140, 219, 213,.3);font-weight: bolder;";
    //   }
    // },
    // tableHeaderColorSuccess({ rowIndex }) {
    //   if (rowIndex === 0) {
    //     return "background-color: rgba(162, 218, 147,.3);font-weight: bolder;";
    //   }
    // },
    // tableHeaderColorBack({ rowIndex }) {
    //   if (rowIndex === 0) {
    //     return "background-color: rgba(255, 166, 166,.3);font-weight: bolder;";
    //   }
    // },
    turnTotal () {
      this.isTotal = true
      this.isBacklog = false
      this.isIndo = false
      this.isCompleted = false
      this.isSuccess = false
      this.isBack = false

      let title = '全部任务'
      let routerPath = 'totalassignment?currentassignment=0'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1

      this.current = 0
      this.getTotalList()
      this.resetFilter()
    },
    turnBacklog () {
      this.isTotal = false
      this.isBacklog = true
      this.isIndo = false
      this.isCompleted = false
      this.isSuccess = false
      this.isBack = false

      let title = '待办任务'
      let routerPath = 'totalassignment?currentassignment=1'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1

      this.current = 1
      this.getBacklogList()
      this.resetFilter()
    },
    turnIndo () {
      this.isTotal = false
      this.isBacklog = false
      this.isIndo = true
      this.isCompleted = false
      this.isSuccess = false
      this.isBack = false

      let title = '在办任务'
      let routerPath = 'totalassignment?currentassignment=2'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1

      this.current = 2
      this.getOnlineList()
      this.resetFilter()
    },
    turnCompleted () {
      this.isTotal = false
      this.isBacklog = false
      this.isIndo = false
      this.isCompleted = true
      this.isSuccess = false
      this.isBack = false

      let title = '已办任务'
      let routerPath = 'totalassignment?currentassignment=3'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1

      this.current = 3
      this.getCompletedList()
      this.resetFilter()
    },
    turnSuccess () {
      this.isTotal = false
      this.isBacklog = false
      this.isIndo = false
      this.isCompleted = false
      this.isSuccess = true
      this.isBack = false

      let title = '办结任务'
      let routerPath = 'totalassignment?currentassignment=4'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1

      this.current = 4
      this.getSuccessList()
      this.resetFilter()
    },
    turnBack () {
      this.isTotal = false
      this.isBacklog = false
      this.isIndo = false
      this.isCompleted = false
      this.isSuccess = false
      this.isBack = true

      let title = '退回任务'
      let routerPath = 'totalassignment?currentassignment=5'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1

      this.current = 5
      this.getBackList()
      this.resetFilter()
    },

    // 全部任务--查看详情
    handelClickCheck (item) {
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${
        item.id
        }&isShowReport=${true}&isShowOpinion=${false}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: { id: item.id, isShowReport: true, isShowOpinion: false }
      })
    },
    // 待处理--签收
    handelClickSign (item) {
      this.$confirm('确认签收，签收后该项目由你负责审查。', '签收', {
        confirmButtonText: '确认签收',
        cancelButtonText: '取消'
        // type: 'warning'
      })
        .then(async () => {
          let projectId = item.id
          let res = await this.$get('/epf-result-review/task/pendingReceipt', {
            projectId: projectId
          })

          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '已确认签收!'
            })
            this.current = 1
            this.getBacklogList()
            this.getAssignmentNumber()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消签收!'
          })
        })
    },
    // 待处理--申请改派
    handelClickChange (item) {
      this.$confirm('确认申请改派，申请成功后需等待领导审核。', '申请改派', {
        confirmButtonText: '确认申请',
        cancelButtonText: '取消'
        // type: 'warning'
      })
        .then(async () => {
          let projectId = item.id
          let res = await this.$get(
            '/epf-result-review/task/changeOptionUser',
            {
              projectId: projectId
            }
          )

          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '已成功申请改派!'
            })
            this.current = 1
            this.getBacklogList()
            this.getAssignmentNumber()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消申请改派!'
          })
        })
    },

    // 待处理--查看详情
    handelClickBacklogCheck (item) {
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${
        item.id
        }&isShowReport=${true}&isShowOpinion=${false}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: { id: item.id, isShowReport: true, isShowOpinion: false }
      })
    },
    // 在办--审核
    handelClickAudit (item) {
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${
        item.id
        }&isShowReport=${true}&isShowOpinion=${true}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: { id: item.id, isShowReport: true, isShowOpinion: true }
      })
    },
    // 在办--退回
    async handelClickBack (item) {
      this.completedBackForm = {
        projectId: '',
        opt: '',
        remarks: ''
      }
      this.completedBackVisible = true
      let res = await this.$get(
        `/epf-result-review/task/getTodoNextLink?projectId=${item.id}&opt=RETURN_BEFORE`
      )
      this.nodeSelectLabel = res.result.nextLink
      this.completedBackForm.projectId = item.id
    },
    // 在办--退回--取消
    completedBackCancel () {
      this.nodeSelectLabel = ''
      this.completedBackVisible = false
      this.$message.info('已取消退回!')
    },
    // 在办--退回--发送
    completedBackSend (formName) {
      if (this.completedBackForm.remarks.length < 5) {
        this.$message.error('退回意见请输入至少5个字符')
        return
      } else {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let params = this.completedBackForm
            this.$post('/epf-result-review/task/todoReview', params).then(
              res => {
                if (res.code == 0) {
                  this.completedBackVisible = false
                  this.current = 2
                  this.getOnlineList()
                  this.getAssignmentNumber()
                  this.$message.success('退回请求发送成功!')
                } else {
                  this.$message.error(res.msg) // 失败
                  return
                }
                this.nodeSelectLabel = ''
              }
            )
          }
        })
      }
    },
    // 已办--查看详情
    handelClickIndoCheck (item) {
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${
        item.id
        }&isShowReport=${true}&isShowOpinion=${false}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: { id: item.id, isShowReport: true, isShowOpinion: false }
      })
    },
    // 已办--撤回
    handelClickRecall (item) {
      this.$confirm(
        '撤回后审核停止返回待办任务，你还要继续吗？',
        '仅撤回已提交但下一审批人未签收的项目',
        {
          confirmButtonText: '继续',
          cancelButtonText: '取消'
          // type: 'warning'
        }
      )
        .then(async () => {
          let id = item.id
          let res = await this.$get('/epf-result-review/task/doneWithdraw', {
            id: id
          })

          if (res.code == 0) {
            this.handelClickRecallSure()
          } else {
            this.handelClickRecallFail()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤回!'
          })
        })
    },
    // 已办--撤回--撤回成功
    handelClickRecallSure () {
      this.$confirm('项目返回待办任务中，请及时处理。', '撤回成功', {
        confirmButtonText: '确定',
        // type: 'success',
        showCancelButton: false
      }).then(() => {
        this.$message({
          type: 'success',
          message: '撤回成功!'
        })
        this.current = 3
        this.getCompletedList()
        this.getAssignmentNumber()
      })
    },
    // 已办--撤回--撤回失败
    handelClickRecallFail () {
      this.$confirm('此项目已被签收，无法撤回。', '此项目不支持被撤回', {
        confirmButtonText: '确定',
        // type: 'warning',
        showCancelButton: false
      }).then(() => {
        this.$message({
          type: 'error',
          message: '撤回失败!'
        })
      })
    },
    // 办结--查看详情
    handelClickSuccessCheck (item) {
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${
        item.id
        }&isShowReport=${true}&isShowOpinion=${false}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: { id: item.id, isShowReport: true, isShowOpinion: false }
      })
    },
    // 退回--查看详情
    handelClickBackCheck (item) {
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${
        item.id
        }&isShowReport=${true}&isShowOpinion=${false}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: { id: item.id, isShowReport: true, isShowOpinion: false }
      })
    },
    // 退回--审查
    handelClickExamine (item) {
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${
        item.id
        }&isShowReport=${true}&isShowOpinion=${false}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: { id: item.id, isShowReport: true, isShowOpinion: false }
      })
    },

    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.searchselectdefall = []
      this.orgdata = []
      this.singleuser = {}
      this.slectdefall = []
      this.getGrowpList({})
      if (this.current == 0) {
        this.getTotalList()
      } else if (this.current == 1) {
        this.getBacklogList()
      } else if (this.current == 2) {
        this.getOnlineList()
      } else if (this.current == 3) {
        this.getCompletedList()
      } else if (this.current == 4) {
        this.getSuccessList()
      } else if (this.current == 5) {
        this.getBackList()
      }
    },
    searchList () {
      this.params = this.filterData
      this.params['insertUnit'] = this.singleuser.orgId

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1

      if (this.current == 0) {
        this.getTotalList()
      } else if (this.current == 1) {
        this.getBacklogList()
      } else if (this.current == 2) {
        this.getOnlineList()
      } else if (this.current == 3) {
        this.getCompletedList()
      } else if (this.current == 4) {
        this.getSuccessList()
      } else if (this.current == 5) {
        this.getBackList()
      }
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      if (this.current == 0) {
        this.getTotalList()
      } else if (this.current == 1) {
        this.getBacklogList()
      } else if (this.current == 2) {
        this.getOnlineList()
      } else if (this.current == 3) {
        this.getCompletedList()
      } else if (this.current == 4) {
        this.getSuccessList()
      } else if (this.current == 5) {
        this.getBackList()
      }
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      if (this.current == 0) {
        this.getTotalList()
      } else if (this.current == 1) {
        this.getBacklogList()
      } else if (this.current == 2) {
        this.getOnlineList()
      } else if (this.current == 3) {
        this.getCompletedList()
      } else if (this.current == 4) {
        this.getSuccessList()
      } else if (this.current == 5) {
        this.getBackList()
      }
    },
    descInput () {
      this.txtVal = this.completedBackForm.remarks.length
    },

    // 获取全部任务列表
    getTotalList () {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-result-review/task/allTaskList', params).then(res => {
        if (res.code == 0) {
          this.totalAssignmentList = res.result.pager.results
          this.pageNo = res.result.pager.pageNo
          this.pageSize = res.result.pager.pageSize
          this.totalPage = res.result.pager.totalPage
          this.totalRecord = res.result.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    // 获取待处理列表
    getBacklogList () {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-result-review/task/waitTodoList', params).then(res => {
        if (res.code == 0) {
          this.backlogAssignmentList = res.pager.results
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

    // 获取办理中列表
    getOnlineList () {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-result-review/task/todoList', params).then(res => {
        if (res.code == 0) {
          this.onlineAssignmentList = res.pager.results
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

    // 获取已办理列表
    getCompletedList () {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-result-review/task/hasDoneList', params).then(res => {
        if (res.code == 0) {
          this.completedAssignmentList = res.pager.results
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

    // 获取已办结列表
    getSuccessList () {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-result-review/task/overDoneList', params).then(res => {
        if (res.code == 0) {
          this.successAssignmentList = res.pager.results
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

    // 获取退回列表
    getBackList () {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-result-review/task/returnList', params).then(res => {
        if (res.code == 0) {
          this.backAssignmentList = res.pager.results
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

    // 获取任务数量
    getAssignmentNumber () {
      this.$get('/epf-result-review/task/projectCountInfo').then(res => {
        if (res.code == 0) {
          this.totalStatus = res.result.allStatus
          this.backlogStatus = res.result.waitStatus
          this.onlineStatus = res.result.todoStatus
          this.completedStatus = res.result.downStatus
          this.successStatus = res.result.overDownStatus
          this.backStatus = res.result.backStatus
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    // 字典选择
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
      console.log(value)
      this.singleuser.orgId = value[value.length - 1]
      this.filterData.slectdefall = this.singleuser.orgId
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

    this.current = this.$route.query.currentassignment

    if (this.current == 0) {
      this.turnTotal()
      this.getTotalList()
    } else if (this.current == 1) {
      this.turnBacklog()
      this.getBacklogList()
    } else if (this.current == 2) {
      this.turnIndo()
      this.getOnlineList()
    } else if (this.current == 3) {
      this.turnCompleted()
      this.getCompletedList()
    } else if (this.current == 4) {
      this.turnSuccess()
      this.getSuccessList()
    } else if (this.current == 5) {
      this.turnBack()
      this.getBackList()
    }
    this.getAssignmentNumber()
    this.getGrowpList({})
  },
  watch: {
    // 监听相同路由下参数变化的时候，从而实现异步刷新
    $route (to, from) {
      /** 初始化其他数据 */
      this.current = this.$route.query.currentassignment
      if (this.current == 0) {
        this.turnTotal()
        this.getTotalList()
      } else if (this.current == 1) {
        this.turnBacklog()
        this.getBacklogList()
      } else if (this.current == 2) {
        this.turnIndo()
        this.getOnlineList()
      } else if (this.current == 3) {
        this.turnCompleted()
        this.getCompletedList()
      } else if (this.current == 4) {
        this.turnSuccess()
        this.getSuccessList()
      } else if (this.current == 5) {
        this.turnBack()
        this.getBackList()
      }
      this.getAssignmentNumber()
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
.assignmentBigBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.assignmentBox {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 110px;
  cursor: pointer;
  border-radius: 10px;
}
.assignmentLeft {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.assignmentLeft span:nth-child(2) {
  font-size: 16px;
  font-weight: bold;
}
.assignmentRight {
  font-size: 50px;
  font-weight: 500;
  color: #686868;
}
.bgI1 {
  background-image: url("../../../../assets/images/cgsc/total0201.png");
  background-size: 200px 110px;
}
.bgIHover1 {
  background-image: url("../../../../assets/images/cgsc/total0202.png");
  background-size: 200px 110px;
}
.bgI2 {
  background-image: url("../../../../assets/images/cgsc/backlog0201.png");
  background-size: 200px 110px;
}
.bgIHover2 {
  background-image: url("../../../../assets/images/cgsc/backlog0202.png");
  background-size: 200px 110px;
}
.bgI3 {
  background-image: url("../../../../assets/images/cgsc/indo0201.png");
  background-size: 200px 110px;
}
.bgIHover3 {
  background-image: url("../../../../assets/images/cgsc/indo0202.png");
  background-size: 200px 110px;
}
.bgI4 {
  background-image: url("../../../../assets/images/cgsc/completed0201.png");
  background-size: 200px 110px;
}
.bgIHover4 {
  background-image: url("../../../../assets/images/cgsc/completed0202.png");
  background-size: 200px 110px;
}
.bgI5 {
  background-image: url("../../../../assets/images/cgsc/success0201.png");
  background-size: 200px 110px;
}
.bgIHover5 {
  background-image: url("../../../../assets/images/cgsc/success0202.png");
  background-size: 200px 110px;
}
.bgI6 {
  background-image: url("../../../../assets/images/cgsc/back0201.png");
  background-size: 200px 110px;
}
.bgIHover6 {
  background-image: url("../../../../assets/images/cgsc/back0202.png");
  background-size: 200px 110px;
}
#thunderButton {
  position: relative;
  margin: 5px 0;
}
.thunderIcon {
  width: 21px;
  height: 21px;
  display: inline-block;
  background-image: url("../../../../assets/images/cgsc/thunder.png");
  position: absolute;
  top: -8px;
}
/* .el-scrollbar {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow: scroll;
  width: 110%;
  height: 120%;
} */
@media screen and (max-width: 1599px) {
  .assignmentBox {
    width: 180px;
  }
  .bgI1 {
    background-size: 180px 110px;
  }
  .bgIHover1 {
    background-size: 180px 110px;
  }
  .bgI2 {
    background-size: 180px 110px;
  }
  .bgIHover2 {
    background-size: 180px 110px;
  }
  .bgI3 {
    background-size: 180px 110px;
  }
  .bgIHover3 {
    background-size: 180px 110px;
  }
  .bgI4 {
    background-size: 180px 110px;
  }
  .bgIHover4 {
    background-size: 180px 110px;
  }
  .bgI5 {
    background-size: 180px 110px;
  }
  .bgIHover5 {
    background-size: 180px 110px;
  }
  .bgI6 {
    background-size: 180px 110px;
  }
  .bgIHover6 {
    background-size: 180px 110px;
  }
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
#serveBody .el-pagination .el-input__inner {
  height: 28px;
}

.assignmentDialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.assignmentDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.assignmentDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.assignmentDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.assignmentDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.assignmentDialog .el-dialog__body .el-form {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.assignmentDialog .el-dialog__body .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.assignmentDialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.assignmentDialog .button_qian,
.assignmentDialog .button_shen {
  margin-left: 0px;
}
</style>
