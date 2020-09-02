<template>
  <div class='editor'
       id='twoEditor'>
    <div :hidden="isViewHtml">
      <div>
        <span style="text-align:right;margin:8px 0px;float:left">
          <el-button type="primary"
                     @click="viewHtml"
                     size="small"
                     icon="el-icon-save">{{isViewHtml==true?'编 辑':'预 览'}}</el-button>
        </span>
        <span style="text-align:right;margin:8px 0px;float:right">
          <el-button @click="$emit('saveCancel')"
                     size="small">取 消</el-button>
          <el-button type="primary"
                     @click="$emit('saveInfo',info)"
                     size="small"
                     icon="el-icon-save">保 存</el-button>
        </span>
      </div>
      <div style="clear:both;"></div>
      <el-form ref="form"
               :model="info"
               label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="info.title"
                    :maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <tinymceEditor id='tinymce'
                     v-model='info.content'
                     :init='init'></tinymceEditor>
    </div>
    <div :hidden="!isViewHtml">
      <div>
        <span style="text-align:right;margin:8px 0px;float:left">
          <el-button type="primary"
                     @click="viewHtml"
                     size="small"
                     icon="el-icon-save">{{isViewHtml==true?'编 辑':'预 览'}}</el-button>
        </span>
        <span style="text-align:right;margin:8px 0px;float:right">
          <el-button @click="$emit('saveCancel')"
                     size="small">关 闭</el-button>
        </span>
      </div>
      <div style="clear:both;"></div>
      <h1 style="text-align:center;font-weight:bold;font-size:20px;border-bottom:1px solid rgb(216, 216, 216); padding-bottom: 10px;">{{info.title}}</h1>
      <div class="htmlContent"
           v-html='info.content'></div>
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/mobile/theme'
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
import baseUrl from '../../../../utils/config'
export default {
  name: 'editor',
  props: ['info', 'isViewHtml'],
  data () {
    return {
      tinymceHtml: '请输入内容',
      // url:'/epf-document/document/upload',
      init: {
        language_url: process.env.NODE_ENV == 'development' ? '/static/tinymce/langs/zh_cn.js' : '/epf_admin/static/js/langs/zh_cn.js',
        language: 'zh_cn',
        skin_url: process.env.NODE_ENV == 'development' ? '/static/tinymce/skins/ui/oxide' : '/epf_admin/static/js/skins/ui/oxide',
        height: 600,
        plugins: [
          'advlist autolink lists link image charmap preview',
          'searchreplace visualblocks fullscreen',
          'insertdatetime media table contextmenu paste',
          'emoticons textcolor'
        ],
        toolbar1: 'undo redo | styleselect | fontselect | fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
        toolbar2: 'fullscreen preview | forecolor backcolor emoticons | table | link image media | mybutton',
        branding: false,
        images_upload_url: '/epf-document/document/upload',
        images_upload_handler: function (blobInfo, success, failure) {
          var form = new FormData()
          form.append('files', blobInfo.blob(), blobInfo.filename())
          $.ajax({
            url: baseUrl.baseURL1 + '/epf-document/document/upload',
            type: 'post',
            headers: { 'token': sessionStorage.getItem('token') },
            data: form,
            processData: false,
            contentType: false,
            success: function (data) {
              var location = '/epf-document/document/downloadById?id=' + data.data[0].id
              success(location)
            },
            error: function (e) {
              alert('图片上传失败')
            }
          })
        },
        file_picker_callback: function (callback, value, meta) {
          var input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.onchange = function () {
            var file = this.files[0]
            var form = new FormData()
            form.append('files', file)
            $.ajax({
              url: baseUrl.baseURL1 + '/epf-document/document/upload',
              headers: { 'token': sessionStorage.getItem('token') },
              type: 'post',
              data: form,
              processData: false,
              contentType: false,
              success: function (data) {
                var location = '/epf-document/document/downloadById?id=' + data.data[0].id
                callback(location, { text: res.data[0].name })
              },
              error: function (e) {
                alert('图片上传失败')
              }
            })
          }

          input.click()
        }
      }
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    viewHtml () {
      if (this.isViewHtml == false) {
        this.isViewHtml = true
      } else {
        this.isViewHtml = false
      }
    }
  }
  // components:{Editor}
}
</script>
<style lang="scss" scoped>
.htmlContent {
  width: 90%;
  height: auto;
  margin: 20px auto;
  // border: 1px solid rgb(216, 216, 216);
}
.tox-silver-sink {
  z-index: 2300;
}
</style>
