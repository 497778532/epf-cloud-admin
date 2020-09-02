<template>

  <div v-drag
       class="selcetDialog2">
    <el-row type="flex"
            align="middle">
      <span class="table-header__title">新增</span>

      <i class="el-icon-circle-close"
         @click="ProjectsAddClose"
         style="font-size:26px;margin-left:auto"></i>

    </el-row>
    <div class="table-content">
      <el-row type="flex"
              align="middle">
        <el-col :span="6">项目名称</el-col>
        <el-col :span="16">
          <el-input v-model="filterData.projectName"
                    placeholder="请输入项目名称"
                    :maxlength="50"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-col :span="6">压占范围</el-col>
        <el-col :span="16">
          <el-upload class="upload-demo"
                     action="/api/epf-document/document/upload"
                     :before-upload="beforeUpload"
                     :on-preview="handlePreview2"
                     :on-remove="handleRemove2"
                     :before-remove="beforeRemove2"
                     :headers="myHeaders"
                     multiple
                     name="files"
                     :limit="5"
                     :file-list="fileList2"
                     :on-success="success2">
            <div class="EPFLightBlue EPFButton">上传文件</div>
          </el-upload>
        </el-col>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-col :span="6">补划范围</el-col>
        <el-col :span="16">
          <el-upload class="upload-demo"
                     action="/api/epf-document/document/upload"
                     :before-upload="beforeUpload"
                     :before-remove="beforeRemove3"
                     :headers="myHeaders"
                     multiple
                     name="files"
                     :limit="5"
                     :file-list="fileList3"
                     :on-success="success3">
            <div class="EPFLightBlue EPFButton">上传文件</div>
          </el-upload>
        </el-col>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-col :span="6">备注说明</el-col>
        <el-col :span="16">

          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    :maxlength="200"
                    v-model="filterData.remarks"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-col :span="6">现场照片</el-col>
        <el-col :span="16">
          <el-upload class="upload-demo"
                     action="/api/epf-document/document/upload"
                     :before-upload="beforeUpload"
                     :on-preview="handlePreview4"
                     :on-remove="handleRemove4"
                     :before-remove="beforeRemove4"
                     multiple
                     name="files"
                     :limit="5"
                     :file-list="fileList4"
                     :on-success="success4">
            <div class="EPFLightBlue EPFButton">上传文件</div>
          </el-upload>
        </el-col>
      </el-row>

    </div>
    <el-row type="flex"
            style="margin:16px 0"
            justify="space-around">
      <div class="EPFButton EPFwirte"
           style=""
           @click="analysis">
        分析
      </div>
      <div class="EPFButton EPFBlue"
           @click="enter"
           v-if="canClick">
        确认
      </div>
    </el-row>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {

  data () {
    return {
      textarea: '',
      canClick: true,

      axiosBtn: true,
      projectId: null,

      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      myHeaders: {
        token: sessionStorage.getItem('token')
      },
      arr: [],
      filterData: {
        projectName: '',
        remarks: ''

      }

    }
  },
  components: {},
  methods: {
    ProjectsAddClose () {
      this.$emit('close')
    },

    enter () {
      let params = this.filterData
      params['year'] = this.year
      params = Object.assign(params, this.areaParams)

      this.axiosBtn = false
      this.$get('/epf-monitor-evaluation/mproject/save', params).then(res => {
        if (res.code === 0) {
          this.$emit('save')
          this.projectId = res.projectId
          this.$message.success('添加成功,请继续分析文件')
          this.canClick = false
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    beforeUpload () {
      if (!this.projectId) {
        this.$message('请先提交项目后分析文件')
        return false
      }
    },
    analysis () {
      if (!this.projectId) {
        return
      }
      if (!this.arr.length) {
        this.$message('请上传文件')
        return
      }
      let params = {
        json: JSON.stringify(this.arr)
      }
      this.$post(
        '/epf-monitor-evaluation/mproject/files/saveByJson',
        params
      ).then(res => {
        if (res.code == '0') {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
          return
        }
      })
    },
    success2 (res, file, fileList) {
      let obj = {
        projectId: this.projectId,
        documentType: 2,
        documentId: res.data[0].id
      }
      this.arr.push(obj)
    },
    success3 (res, file, fileList) {
      let obj = {
        projectId: this.projectId,
        documentType: 3,
        documentId: res.data[0].id
      }
      this.arr.push(obj)
    },
    success4 (res, file, fileList) {
      let obj = {
        projectId: this.projectId,
        documentType: 4,
        documentId: res.data[0].id
      }
      this.arr.push(obj)
    }
  },
  computed: {
    ...mapState('jcpgyj', ['year'])
  }

}
</script>

<style scoped>
.selcetDialog2 {
  position: fixed;
  left: 40%;
  height: auto !important;
  top: 200px;
  width: 456px;

  z-index: 1002;
  background: #fff;
  padding: 16px;

  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  border: 1px solid rgba(213, 213, 213, 1);
}
.table-header__title {
  font-size: 18px;

  color: rgba(89, 89, 89, 1);
  font-weight: 700;
}

.table-content {
  background: rgba(248, 248, 248, 1);
  padding: 20px 8px 8px 8px;

  position: relative;
  margin-top: 10px;
}
.table-content .el-row {
  margin-top: 10px;
}
</style>
