<template>
  <div class="resultDetail EPF-table">
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="项目基本信息"
                   name="first"
                   class="firstTab">
        <el-row>
          <el-col :span="2"
                  style="text-align:center">项目编号：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">项目名称：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">项目类型：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="20"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"
                  style="text-align:center">发起人：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="20"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">发起时间：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="20"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">发起人部门：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"
                  style="text-align:center">发起类型：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="20"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">行政区名称：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="20"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">行政区代码：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="10"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"
                  style="text-align:center">成果类型：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="20"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">现状基准年：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="10"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">规划起始年：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="10"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"
                  style="text-align:center">规划目标年：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="10"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">编制单位：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">规划范围：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"
                  style="text-align:center">规划面积：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="10"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">规划人口：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="10"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">委托单位：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"
                  style="text-align:center">规划期限：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="10"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">成果版本：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="10"></el-input>
          </el-col>
          <el-col :span="2"
                  style="text-align:center">批复部门：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"
                  style="text-align:center">批复时间：</el-col>

          <el-col :span="6">
            <el-input v-model="data.name"
                      :maxlength="20"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"
                  style="text-align:center">批复时间：</el-col>

          <el-col :span="22">
            <el-input type="textarea"
                      v-model="data.name"
                      :maxlength="20"></el-input>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="成果数据"
                   name="second">配置管理</el-tab-pane>
      <el-tab-pane label="审批流程"
                   name="third"
                   style="padding-top:30px">
        <el-row type="flex">
          <el-col :span="4"
                  style="display:flex">
            <el-steps direction="vertical"
                      :active="2"
                      style="height:100%;"
                      finish-status="success"
                      process-status="finish">
              <el-step :title="item.label"
                       v-for="(item,index) in approvalProcessProject"
                       :key="index">
                <template slot="description"
                          v-if="index!==0">
                  <el-row>执行人：{{item.people}}</el-row>
                  <el-row>办理时间： {{item.date}}</el-row>
                  <el-row>状态：{{item.state}}</el-row>
                </template>
              </el-step>
            </el-steps>
          </el-col>
          <el-col :span="20">
            <el-table :data="processData"
                      style="width: 100%"
                      border
                      v-loading="loading"
                      element-loading-text="数据加载中"
                      element-loading-background="rgba(255, 255, 255,0.95)">
              <el-table-column label="序号"
                               min-width="55"
                               type="index"></el-table-column>
              <el-table-column label="流程环节"
                               min-width="120">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="执行人"
                               min-width="170">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.a }}</span>
                </template>
              </el-table-column>
              <el-table-column label="开始时间"
                               min-width="170">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.b }}</span>
                </template>
              </el-table-column>

              <el-table-column label="结束时间"
                               min-width="170">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.c }}</span>
                </template>
              </el-table-column>
              <el-table-column label="审批历时"
                               min-width="170">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.d }}</span>
                </template>
              </el-table-column>
              <el-table-column label="审批意见"
                               min-width="170">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.e }}</span>
                </template>
              </el-table-column>

            </el-table>
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
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="成果文本"
                   name="fourth">
        <el-table :data="tableData"
                  style="width: 100%;margin-top:25px"
                  border
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)">
          <el-table-column label="文件名称"
                           min-width="120">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件格式"
                           min-width="170">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column label="文件大小"
                           min-width="170">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.b }}</span>
            </template>
          </el-table-column>

          <el-table-column label="文件分类"
                           min-width="170">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.c }}</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right"
                           label="操作"
                           min-width="170"
                           align="center">
            <template slot-scope="scope">
              <span class="list-style: none;">
                <el-button type="text"
                           @click="btnClick(scope.row,'dispatchlistDetail')">下载</el-button>
                <el-button type="text"
                           @click="btnClick(scope.row,'dispatchlistDetail')">预览</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 2,
      approvalProcessProject: [
        { id: '0', label: '任务中心' },
        {
          id: '1',
          label: '经办人',
          people: '杨紫',
          date: '2019-10-25',
          state: '已完成'
        },
        {
          id: '2',
          label: '审核人',
          people: '宋主任',
          date: '2019-10-25',
          state: '正在处理中'
        },
        { id: '3', label: '审批人', people: '宋院长', date: '无', state: '无' }
      ],
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      tableData: [
        { name: '属重点项目的证明文件', a: 'pdf', b: '12MB', c: '矢量数据' },
        {
          name: '调出地块不涉及建设用地的红头说明',
          a: 'pdf',
          b: '12MB',
          c: '栅格数据'
        },
        { name: '属重点项目的证明文件', a: 'pdf', b: '19MB', c: '表格数据' },
        {
          name: '属重点项目的证明文件',
          a: 'rar',
          b: '11MB',
          c: '数据库建设文档'
        },
        { name: '属重点项目的证明文件', a: 'pdf', b: '30MB', c: '文档数据' }
      ],
      data: {},
      activeName: 'first',
      processData: [
        {
          name: '环节1',
          a: '章紫',
          b: '2019-10-10 10：10：10',
          c: '2019-10-12 10：10：10',
          d: '2天1小时',
          e: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          name: '环节2',
          a: '章紫',
          b: '2019-10-10 10：10：10',
          c: '2019-10-12 10：10：10',
          d: '2天1小时',
          e: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          name: '环节3',
          a: '章紫',
          b: '2019-10-10 10：10：10',
          c: '2019-10-12 10：10：10',
          d: '2天1小时',
          e: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          name: '环节4',
          a: '章紫',
          b: '2019-10-10 10：10：10',
          c: '2019-10-12 10：10：10',
          d: '2天1小时',
          e: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          name: '环节5',
          a: '章紫',
          b: '2019-10-10 10：10：10',
          c: '2019-10-12 10：10：10',
          d: '2天1小时',
          e: '质检结果反馈没问题，规划文本核实没问题'
        }
      ]
    }
  },
  components: {},
  methods: {
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getList()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getList()
    }
  }
}
</script>

<style scoped>
.page-body {
  height: auto;
}
.resultDetail {
  padding: 30px;
  height: 100%;
}
.resultDetail .el-tabs__nav {
  width: 100%;
}
.resultDetail .firstTab {
  padding-top: 35px;
}
.resultDetail .firstTab .el-row {
  height: 35px;
  line-height: 35px;
  margin-top: 35px;
}
.resultDetail .firstTab .el-row:nth-child(1) {
  margin-top: 0;
}
.resultDetail .el-tabs__content {
}
</style>
<style >
.resultDetail .el-tabs__item {
  text-align: center;
  width: 100%;
}

.resultDetail .el-tabs__header {
}
.resultDetail .el-tabs__content {
  height: 90%;
}
</style>
