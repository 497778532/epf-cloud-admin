<template>

  <div class="page-body"
       :key="id">

    <div class="filter_wrap">
      <div class="table-content">
        <el-row>
          <el-col :span="24"
                  class="filter_title_box">
            <span class="filter_title__custom_three">发送者：</span>
            <el-input v-model="myData.sender"
                      placeholder="请输入发送者"
                      style="width:calc(100% - 90px);"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
                  class="filter_title_box">
            <span class="filter_title__custom">来自邮箱：</span>
            <el-input v-model="myData.sendMail"
                      placeholder="请输入来自邮箱"
                      style="width:calc(100% - 90px);"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
                  class="filter_title_box">
            <span class="filter_title__custom">文档标题：</span>
            <el-input v-model="myData.subject"
                      placeholder="请输入文档标题"
                      style="width:calc(100% - 90px);"
                      :maxlength="50"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
                  class="filter_title_box">
            <span class="filter_title__custom">备注说明：</span>
            <el-input type="textarea"
                      :autosize="{ minRows: 7, maxRows: 7}"
                      placeholder="请输入内容"
                      :maxlength="200"
                      v-model="myData.remarks"
                      style="width:calc(100% - 90px);height:150px;"></el-input>
          </el-col>
        </el-row>
        <!-- <el-row type="flex"
                align="middle">
          <el-col :span="4">内容类型</el-col>
          <el-col :span="20">
            <el-select v-model="myData.previewType"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.value"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24"
                  class="filter_title_box">
            <span class="filter_title__custom">文档内容：</span>
            <editor class="editor"
                    :goodsInfo="goodsInfo"
                    style="width:calc(100% - 90px);">
            </editor>
          </el-col>
        </el-row>

      </div>
      <el-row type="flex"
              style="height:60px;width:100%;display:flex;justify-content:center;align-items: center;"
              justify="space-around">
        <!-- <div class="EPFButton EPFwirte" >
          返回
        </div> -->
        <div class="button_shen"
             @click="enter">
          确认
        </div>
      </el-row>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import Bus from '../../../../utils/bus'
import Editor from './goodsEditor'
export default {

  data () {
    return {
      options: [{
        value: 'URL',
        label: 'URL'
      }, {
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'TEXT',
        label: 'TEXT'
      }],
      goodsInfo: {
        content: ''
      },
      myData: {
        remarks: '',
        sender: '',
        sendMail: '',
        subject: ''
      },
      textarea: '',
      canClick: true,

      axiosBtn: true,
      projectId: null,

      arr: [],
      id: ''
    }
  },
  components: { Editor },
  methods: {
    ...mapActions(['setTabsList']),

    getData (id) {
      let params = {}
      params['id'] = id
      this.$get('/epf-document/receivecontent/getById', params).then(res => {
        if (res.code === 0) {
          this.myData = res.result

          this.goodsInfo.content = res.result.text
        } else {
          this.$message.error(res.msg)
          return
        }
      })
    },

    enter () {
      let activeEditor = tinymce.activeEditor
      let editBody = activeEditor.getBody()
      activeEditor.selection.select(editBody)
      let text = ''

      if (this.myData.previewType === 'HTML') {
        text = activeEditor.getContent()
      } else {
        text = activeEditor.selection.getContent({ 'format': 'text' })
      }

      let params = this.myData
      params['text'] = text
      params['sendTime'] = ''
      params['createTime'] = ''
      this.$post(
        '/epf-document/receivecontent/update',
        params
      ).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)

          let title = '知识库邮箱'
          let routerPath = 'EmailBase'
          this.$bus.$emit('closeTabsItem', this.$route.name)
          var tabObj = { title, routerPath }
          this.setTabsList(tabObj)
          this.$router.push({ path: routerPath })
          Bus.$emit('emailSubmit', true)
        } else {
          this.$message.error(res.msg)
          return
        }
      })
    }

  },
  computed: {
    ...mapState('jcpgyj', ['year'])
  },
  created () {
    this.id = this.$route.query.id

    this.getData(this.id)
  },
  watch: {
    $route (to, form) {
      if (to.name === form.name && to.fullPath !== form.fullPath) {
        let id = to.query.id
        this.getData(id)
      }
    }
  }

}
</script>

<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.table-header__title {
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
.table-content {
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.table-content .el-row {
  margin-bottom: 16px;
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
  font-weight: 500;
}
.filter_title__custom_three {
  box-sizing: border-box;
  width: 90px;
  min-width: 90px;
  max-width: 90px;
  height: 40px;
  padding-left: 16px;
  padding-right: 10px;
  line-height: 40px;
  font-weight: 500;
}
</style>
