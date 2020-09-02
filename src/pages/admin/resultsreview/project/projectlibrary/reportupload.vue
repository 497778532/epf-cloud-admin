<template>
  <div id="reportUploadBox">
    <el-upload class="upload-demo"
               drag
               action="https://jsonplaceholder.typicode.com/posts/"
               multiple
               :on-success="onSuccess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>

    <div class="buttonBox"
         style="margin-top:100px;">
      <!-- <el-button @click="handleClickCancel">取消</el-button>
      <el-button type="primary"
                 @click="handleClickAdd">确认添加</el-button> -->
      <div class="button_qian"
           @click="handleClickCancel">取消</div>
      <div class="button_shen"
           @click="handleClickAdd">确认添加</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import Bus from '../../../../../utils/bus'
export default {
  name: 'reportupload.vue',
  data () {
    return {
      isSuccess: ''
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    onSuccess () {
      this.$message.success('上传成功')
      this.isSuccess = true
    },

    handleClickCancel () {
      let id = this.$route.query.id
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${id}&isShowReport=${true}&isShowOpinion=${true}`
      this.$bus.$emit('closeTabsItem', this.$route.name)
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)

      this.$router.push({
        path: routerPath,
        query: { id: id, isShowReport: true, isShowOpinion: true }
      })
      Bus.$emit('proDetail', true)
    },
    handleClickAdd () {
      let id = this.$route.query.id
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${id}&isShowReport=${true}&isShowOpinion=${true}`
      this.$bus.$emit('closeTabsItem', this.$route.name)
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)

      this.$router.push({
        path: routerPath,
        query: { id: id, isShowReport: true, isShowOpinion: true }
      })
      Bus.$emit('proDetail', true)
    }
  }
}
</script>
<style scoped>
#reportUploadBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 100px;
}
.buttonBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style>
#reportUploadBox .el-upload-dragger {
  width: 1000px;
}
</style>
