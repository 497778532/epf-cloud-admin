
<template>
  <div>
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column prop="number"
                       label="序号"
                       width="50"
                       align="center">
      </el-table-column>
      <el-table-column prop="infoId"
                       label="信息发布编号"
                       width="170"
                       align="center">
        <template slot-scope="scope">
          <span style="text-align:center;cursor:pointer;"
                @click="dialogTest = true">{{ scope.row.infoId }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="infoTitle"
                       label="信息标题"
                       width="250"
                       align="center">
        <template slot-scope="scope">
          <span style="text-align:center;cursor:pointer;"
                @click="dialogTable = true">{{ scope.row.infoTitle }}</span>
          <el-dialog title="信息"
                     :visible.sync="dialogTable">
            <el-table :data="tableData">
              <el-table-column property="number"
                               label="Id"
                               width="50"></el-table-column>
              <el-table-column property="infoId"
                               label="编号"
                               width="160"></el-table-column>
              <el-table-column property="infoTitle"
                               label="标题"></el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column prop="flowType"
                       label="流转方式"
                       width="80"
                       align="center">
      </el-table-column>
      <el-table-column prop="createDate"
                       label="申请时间"
                       width="190"
                       align="center">
      </el-table-column>
      <el-table-column prop="type"
                       label="状态"
                       width="130"
                       align="center">
      </el-table-column>
      <el-table-column prop="createUser"
                       label="申请人"
                       width="100"
                       align="center">
      </el-table-column>
      <el-table-column prop="tell"
                       label="联系人电话"
                       width="130"
                       align="center">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="220"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     :type="item.type"
                     plain
                     @click="handleEdit(scope.$index, scope.row,item.title)"
                     v-for="(item,index) in handleData"
                     :key="index">{{item.title}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="审核"
               width="30%"
               :visible.sync="dialogForm">
      <el-form ref="form"
               :model="form"
               label-width="120px">
        <el-form-item label="审核结果：">
          <el-radio-group v-model="form.assessor">
            <el-radio style="margin-left:10px;"
                      label="审核通过"></el-radio>
            <el-radio style="margin-left:10px;"
                      label="审核未通过"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见：">
          <el-input type="textarea"
                    placeholder="请输入您的审核意见,500字以内"
                    :maxlength="500"
                    v-model="form.opinion"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogForm = false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="表单"
               :visible.sync="dialogTest">
      <el-form ref="form"
               label-position="top"
               :model="formTest"
               label-width="100px">
        <el-form-item label="活动名称">
          <el-input v-model="formTest.name"
                    :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formTest.region"
                     placeholder="请选择活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="formTest.date1"
                            style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line"
                  style="text-align:center;"
                  :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间"
                            v-model="formTest.date2"
                            style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="formTest.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="formTest.type">
            <el-checkbox label="美食/餐厅线上活动"
                         name="type"></el-checkbox>
            <el-checkbox label="地推活动"
                         name="type"></el-checkbox>
            <el-checkbox label="线下主题活动"
                         name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光"
                         name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="formTest.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea"
                    v-model="formTest.desc"
                    :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btnAlignCenter">
            <el-button @click="dialogTest=false">取消</el-button>
            <el-button type="primary">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    handleEdit (index, row, btnText) {
      if (btnText === '审核') {
        this.dialogForm = true
      }
    }
  },
  props: {
    handle: {
      type: Array
    }
  },
  created () {
    this.handleData = this.handle
    // console.log(this.handleData);
  },
  data () {
    return {
      handleData: '',
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      tableData: [
        {
          number: '1',
          infoId: 'ZR20180723001',
          infoTitle: '南昌市湾里区梅岭镇中南昌市湾里区梅岭镇中',
          flowType: '转让',
          createDate: '2018.06.12 12:00:00',
          type: '审核未通过',
          createUser: '张浩',
          tell: '18769693636'
        },
        {
          number: '1',
          infoId: 'ZR20180723001',
          infoTitle: '南昌市湾里区梅岭镇中南昌市湾里区梅岭镇中',
          flowType: '转让',
          createDate: '2018.06.12 12:00:00',
          type: '审核未通过',
          createUser: '张浩',
          tell: '18769693636'
        },
        {
          number: '1',
          infoId: 'ZR20180723001',
          infoTitle: '南昌市湾里区梅岭镇中南昌市湾里区梅岭镇中',
          flowType: '转让',
          createDate: '2018.06.12 12:00:00',
          type: '审核未通过',
          createUser: '张浩',
          tell: '18769693636'
        },
        {
          number: '1',
          infoId: 'ZR20180723001',
          infoTitle: '南昌市湾里区梅岭镇中南昌市湾里区梅岭镇中',
          flowType: '转让',
          createDate: '2018.06.12 12:00:00',
          type: '审核未通过',
          createUser: '张浩',
          tell: '18769693636'
        }
      ],
      labelPosition: 'right',
      form: {
        assessor: '',
        opinion: ''
      },
      formTest: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }
}
</script>
<style scoped>
.btnAlignCenter {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
<style>
.el-table .el-table__header thead th {
  background: rgba(241, 241, 241, 0.226);
}
/* .el-dialog__body {
  max-height: 500px;
  overflow-y: auto;
} */
</style>
