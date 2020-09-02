<template>
  <div class="page-body">
    <div class="filter_wrap">
      <!-- 搜索 -->
      <div class="switchHeight_box">
        <el-row :gutter="2">
          <el-col :span="1">
            <span class="filter_title">标题 :</span>
          </el-col>
          <el-col :span="6">
            <el-input class="filterIpt"
                      v-model="filterData.title"
                      size="small"
                      placeholder="请输入标题"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="2">
            <span class="filter_title">类型 :</span>
          </el-col>
          <el-col :span="4">
            <selectInput v-model="landRes"
                         :groupCode="'land_type'"
                         :default="'judicial_disposal_land'"></selectInput>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;margin-bottom:10px;">
          <el-col :span="6"
                  :offset="1">
            <div class="btnBox">
              <div class="button_bg"
                   @click="handleEdit('add','sizeForm')"
                   style="margin:0;">新增</div>
              <div class="button_border"
                   @click="searchData">查询</div>
              <div class="button_default"
                   @click="resetFilter"
                   style="margin:0;">重置</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-table :data="tableData"
                style="width: 100%"
                border
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)">
        <el-table-column label="日期"
                         min-width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.setDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名"
                         min-width="180">
          <template slot-scope="scope">
            <el-tag type="warning"
                    hit
                    size="medium">{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">

            <!----------------- 编辑 ----------------->
            <el-button size="mini"
                       type="primary"
                       plain
                       @click="handleEdit('editor','sizeForm',scope.$index, scope.row)">编辑</el-button>

            <!----------------- 删除 ----------------->
            <el-popover :ref="`popover2-${scope.$index}`"
                        placement="top"
                        width="170"
                        trigger="click">
              <p style="font-size:14px;text-align:center;font-weight:800;">确定要删除该信息吗?</p>
              <div style="text-align:center;margin-top:10px;">
                <el-button size="mini"
                           type="info"
                           plain
                           @click="scope._self.$refs[`popover2-${scope.$index}`].doClose()">取消</el-button>
                <el-button size="mini"
                           type="danger"
                           @click="delOneData(scope.$index, scope.row)">确定</el-button>
              </div>
              <el-button slot="reference"
                         size="mini"
                         plain
                         type="danger">删除</el-button>
            </el-popover>
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
                       :current-page="pageNo">
        </el-pagination>
      </div>
    </div>

    <!-- 新增弹窗 -->
    <!-- 编辑弹窗 -->
    <el-dialog :title="dialogTitle"
               class="companyInfo"
               width="500px"
               :visible.sync="editorPopup"
               :append-to-body='true'>
      <div class="middleBox">
        <el-form :model="sizeForm"
                 :rules="rules"
                 ref="sizeForm"
                 label-width="80px"
                 size="small">
          <el-form-item label="日期"
                        prop="setDate">
            <el-col>
              <el-date-picker v-model="sizeForm.setDate"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              align="center"
                              style="width: 100%;">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="姓名"
                        prop="name">
            <el-input v-model="sizeForm.name"
                      clearable
                      :maxlength="20"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:center;margin-top:10px;">
        <el-button size="mini"
                   type="info"
                   plain
                   @click="editorPopup = false">取消</el-button>
        <el-button size="mini"
                   type="success"
                   @click="editorSubmit('sizeForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import selectInput from '../../../../components/common/form/selectInpt'
export default {
  name: 'generate',
  components: { selectInput },
  data () {
    return {
      landRes: '',
      useRes: '',
      filterData: {
        title: ''
      },
      //  表格数据
      tableData: [{
        setDate: '2019-06-26 10:21:57',
        name: '大霖子',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        setDate: '2019-06-26 10:21:57',
        name: '小霖子',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        setDate: '2019-06-26 10:21:57',
        name: '大涛子',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        setDate: '2019-06-26 10:21:57',
        name: '小涛子',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      //  新增 表单
      // addForm: {
      //   setDate: '',
      //   name: '',
      // },
      //  编辑 表单
      sizeForm: {
        setDate: '',
        name: ''
      },
      //  编辑 表单验证
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        setDate: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ]
      },
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      currentHandle: '', //  当前操作是新增还是编辑
      editorPopup: false, //  控制编辑弹窗
      currentEditorIndex: 0, //  当前选中编辑的下表
      loading: true, //  控制loading动画显示隐藏
      dialogTitle: '编辑' //  弹窗标题
    }
  },
  created () {
    this.loading = false
  },
  methods: {
    //  查询 点击事件
    searchData () {
      // this.filterData.title 当前已填标题

    },
    //  重置 点击事件
    resetFilter () {
      this.filterData.title = ''
    },
    //  编辑 点击事件
    handleEdit (handle, formName, index, row) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
      this.sizeForm.setDate = ''
      this.sizeForm.name = ''
      if (handle == 'editor') {
        this.currentEditorIndex = index
        this.sizeForm.setDate = this.tableData[index].setDate
        this.sizeForm.name = this.tableData[index].name
        this.currentHandle = 'editor'
        this.dialogTitle = '编辑'
      } else {
        this.currentHandle = 'add'
        this.dialogTitle = '新增'
      }
      this.editorPopup = true
    },

    //  新增  编辑  提交
    editorSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.currentHandle == 'editor') {
            //  编辑操作
            this.tableData[this.currentEditorIndex].setDate = this.sizeForm.setDate
            this.tableData[this.currentEditorIndex].name = this.sizeForm.name
          } else {
            //  新增操作
            let newData = {
              name: this.sizeForm.name,
              setDate: this.sizeForm.setDate
            }
            this.$message.success('成功新增一条数据!')
          }
          this.editorPopup = false
        } else {
          return false
        }
      })
    },

    //  确定 删除 点击事件
    delOneData (index, row) {
      console.log(index, row)

      /**
         * 删除接口返回成功后，对列表数据进行删除
         */
      //  删除所选数据
      this.tableData.splice(index, 1)
      //  关闭删除提示框
      this.$refs[`popover2-${index}`].doClose()
      this.$refs['sizeForm'].resetFields()
    },

    //  每页条数改变时触发
    handleSizeChange (val) {
      this.pageNo = 1
      this.pageSize = val
    },
    //  翻页时触发
    handleCurrentChange (val) {
      this.pageNo = val
    }
  }
}
</script>

<style scoped>
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  padding: 34px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
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
.switchHeight_box {
  padding: 5px 15px;
  padding-top: 18px;
  border: 1px solid rgb(219, 219, 219);
  margin-bottom: 30px;
}
.btnBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.companyInfoBox {
  padding: 30px 30px;
  max-height: 600px;
  overflow-y: auto;
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.middleBox {
  width: 85%;
  margin: 30px auto;
  margin-top: 10px;
}
.middleBox_btn {
  width: 85%;
  margin: 30px auto;
  margin-bottom: 0;
}
.btnInfo {
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  letter-spacing: 3px;
}
</style>
<style>
.filter_wrap .el-col .filterIpt.el-input--small .el-input__inner {
  height: 34px;
}
</style>
