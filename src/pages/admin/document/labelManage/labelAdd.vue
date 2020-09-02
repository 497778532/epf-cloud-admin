<template>
  <div class="page-body"
       id="labelAdd"
       :style="{'height':menuListHeight+'px'}">
    <div class="filter_wrap"
         :style="{'height':menuListHeight+'px'}">
      <el-form ref="form"
               :model="form"
               label-width="80px"
               style="width:60%;margin:0 auto;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标签名称:"
                          label-width="10rem">
              <el-input placeholder="请输入"
                        v-model="form.name"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="标签分类:"
                          label-width="10rem">
              <el-select placeholder="请选择（数据字典维护）"
                         v-model="form.tagType">
                <el-option label="广东省自然资源厅"
                           value="shanghai"></el-option>
                <el-option label="区域二"
                           value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序:"
                          label-width="10rem">
              <el-input placeholder="请输入"
                        type="number"
                        v-model="form.orders"
                        :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:"
                          label-width="10rem">
              <el-select placeholder="请选择"
                         v-model="form.status">
                <el-option label="启用"
                           value="0"></el-option>
                <el-option label="停用"
                           value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标签说明:"
                          label-width="10rem">
              <el-input placeholder="请输入"
                        v-model="form.remark"
                        :maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div style="text-align:center;margin-top:5%">
        <el-button type="primary"
                   @click="onSubmit(0)">{{bttype}}并新增</el-button>
        <el-button type="primary"
                   @click="onSubmit(1)">{{bttype}}</el-button>
        <el-button @click="closearticle">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/mobile/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import axios from 'axios'
import baseUrl from '../../../../utils/config'
export default {
  name: 'labelAdd',
  components: { Editor },
  data () {
    return {
      bttype: '保存',
      totalRecord: 1,
      docInfoList: [],
      searchInfo: {},
      loading: false,
      menuListHeight: 900,
      forderdata: [],
      form: {
        name: '',
        remark: '',
        orders: '',
        tagType: '',
        status: ''
      }
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 200
    var type = this.$route.query.type
    if (type == 1) {
      this.form = this.$route.query.data
      this.bttype = '修改'
    } else if (type == 0) {
      this.form = {}
      this.bttype = '保存'
    }
    this.loadTree()
  },
  watch: {
    '$route': function (to, from) {
      var type = this.$route.query.type
      if (type == 1) {
        this.form = this.$route.query.data
        this.bttype = '修改'
      } else if (type == 0) {
        this.form = {}
        this.bttype = '保存'
      }
    }
  },
  mounted () {

  },
  methods: {
    async getDocList (params) {
      this.loading = true
      this.$get('/epf-document/docdocumentinfo/getTenantDocJson', params).then(res => {
        console.log('871===========', res)
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          this.loading = false
          return
        }
        if (params.load) {
          this.totlecorde = res.pager.totalRecord
          this.searchInfo['load'] = ''
        }
        this.totalRecord = res.pager.totalRecord
        this.docInfoList = res.pager.results

        this.loading = false
      })
    },
    loadTree () {
      var that = this
      this.loading = true
      that.$post('/epf-document/admin/docfolder/getAllFolderTree').then(res => {
        console.log('数返回', res.ztreeJson)
        that.forderdata = res.ztreeJson
        this.loading = false
      })
    },
    closearticle () {
      let that = this
      this.$bus.$emit('closeTabsItem', this.$route.name)
      let routerPath = '/labelManage'
      let title = '标签管理'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push('/labelManage')
      this.$bus.$emit('refreshAssembly')
    },
    onSubmit (type) {
      var data = this.form
      delete data['childForder']
      delete data['createTime']
      delete data['updateTime']
      data['type'] = '0'
      this.$post('/epf-document/admin/doctag/tagsave', data).then(res => {
        if (res.code != '0') {
          // 失败
          this.$message.error(res.msg)
          return
        }
        this.$message.success('保存成功')
        if (type == 1) {
          this.$bus.$emit('closeTabsItem', this.$route.name)
          let routerPath = '/labelManage'
          let title = '标签管理'
          var tabObj = { title, routerPath }
          this.setTabsList(tabObj)
          this.$router.push('/labelManage')
          this.$bus.$emit('refreshAssembly')
        } else if (type == 0) {
          this.bttype = '保存'
          this.form = {}
        }
      })
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
  position: relative;
}

.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
</style>
<style>
.filterIpt {
  position: relative;
}
.filterIpt i {
  position: absolute;
  right: 1%;
  top: 20%;
  font-size: 20px;
  cursor: pointer;
}
.el-select {
  width: 100%;
}
.relation .el-upload {
  width: 100%;
}
.relation .el-button--small {
  width: 100%;
}
.edition .el-form-item__content {
  position: relative;
}
.edition .el-form-item__content .selt {
  position: absolute;
  left: 0;
}
.edition .el-form-item__content .inp {
  position: absolute;
  right: 0;
}
</style>
