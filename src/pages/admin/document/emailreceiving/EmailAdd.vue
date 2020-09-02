<template>

  <div style="padding:16px">
    <div class="EmailDetail">

      <div class="table-content">
        <el-row type="flex"
                align="middle">
          <el-col :span="4">发送者</el-col>
          <el-col :span="16">
            <el-input v-model="filterData.projectName"
                      placeholder="请输入发送者"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"
                align="middle">
          <el-col :span="4">来自邮箱</el-col>
          <el-col :span="16">
            <el-input v-model="filterData.projectName"
                      placeholder="请输入来自邮箱"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"
                align="middle">
          <el-col :span="4">文档标题</el-col>
          <el-col :span="16">
            <el-input v-model="filterData.projectName"
                      placeholder="请输入文档标题"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"
                align="middle">
          <el-col :span="4">备注说明</el-col>
          <el-col :span="16">

            <el-input type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入备注说明"
                      :maxlength="200"
                      v-model="filterData.remarks"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"
                align="middle">
          <el-col :span="4">文档内容</el-col>
          <el-col :span="16">
            <editor class="editor"
                    :goodsInfo="goodsInfo">
            </editor>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Editor from './goodsEditor'
export default {

  data () {
    return {
      goodsInfo: {
        content: ''
      },
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
  components: { Editor },
  methods: {
    ProjectsAddClose () {
      this.$emit('close')
    },

    enter () {
      console.log(this.goodsInfo)
      // let params = this.filterData
      // params['year'] = this.year
      // params = Object.assign(params, this.areaParams)

      // this.axiosBtn = false
      // this.$get('/epf-monitor-evaluation/mproject/save', params).then(res => {
      //   if (res.code === 0) {
      //     this.$emit('save')
      //     this.projectId = res.projectId
      //     this.$message.success('添加成功,请继续分析文件')
      //     this.canClick = false
      //   } else {
      //     this.$message.error(res.msg) // 失败
      //     return
      //   }
      // })
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
.EmailDetail {
  z-index: 1002;
  background: #fff;
  padding: 16px 40px;

  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  border: 1px solid rgba(213, 213, 213, 1);
}
.table-header__title {
}

.table-content {
  background: rgba(248, 248, 248, 1);
  padding: 20px 8px 8px 8px;
  font-size: 18px;

  color: rgba(89, 89, 89, 1);
  font-weight: 700;
  position: relative;
  margin-top: 10px;
}
.table-content .el-row {
  margin-top: 10px;
}
.table-content .el-row > .el-col-4 {
  text-align: center;
}
</style>
