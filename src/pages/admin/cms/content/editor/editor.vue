<template>
  <div class='editor'>
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
      <div v-if="showEditor">
        <Editor :id='editorId'
                v-model='info.content'
                :init="init"></Editor>
      </div>
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
import qs from 'qs'
import axios from 'axios'
import baseUrl from '../../../../../utils/config'

export default {
  name: 'editor',
  props: ['info', 'isViewHtml'],
  data () {
    return {
      tinymceHtml: '请输入内容',
      editorId: 'cmsEditor',
      showEditor: false,
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
        toolbar2: 'fullscreen preview | forecolor backcolor emoticons | table | link image media',
        branding: false,
        images_upload_url: '/epf-document/document/upload',
        images_upload_handler: (blobInfo, success, failure) => {
          var form = new FormData()
          form.append('files', blobInfo.blob(), blobInfo.filename())
          axios.post(baseUrl.baseURL1 + '/epf-document/document/upload', form).then(res => {
            if (res.state != 'SUCCESS') {
              alert('图片上传失败')
            }
            var location = baseUrl.baseURL1 + '/epf-document/document/downloadById?id=' + res.data[0].id
            success(location)
          }
          )
        },
        file_picker_callback: (callback, value, meta) => {
          var input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.onchange = function () {
            var file = this.files[0]
            var form = new FormData()
            form.append('files', file)
            axios.post(baseUrl.baseURL1 + '/epf-document/document/upload', form).then(res => {
              if (res.state != 'SUCCESS') {
                alert('图片上传失败')
                files.onError()
                return null
              }
              var location = baseUrl.baseURL1 + '/epf-document/document/downloadById?id=' + res.data[0].id
              callback(location, { text: res.data[0].name })
            }
            )
          }

          input.click()
        }
      }
    }
  },
  mounted () {
    console.log('路径', process.env.NODE_ENV)
    this.showEditor = false
    if (this.$store.state.cmsEditor_Index) {
      this.editorId = 'annEditor' + (this.$store.state.cmsEditor_Index + 1)
      this.$store.state.cmsEditor_Index++
    } else {
      this.$store.state.cmsEditor_Index = 1
      this.editorId = 'annEditor' + 1
    }
    setTimeout(() => {
      this.showEditor = true
    }, 100)
    tinymce.init({})
  },
  activated () {
    this.showEditor = false
    if (this.$store.state.cmsEditor_Index) {
      this.editorId = 'annEditor' + (this.$store.state.cmsEditor_Index + 1)
      this.$store.state.cmsEditor_Index++
    } else {
      this.$store.state.cmsEditor_Index = 1
      this.editorId = 'annEditor' + 1
    }
    setTimeout(() => {
      this.showEditor = true
    }, 100)
    tinymce.init({})
  },
  watch: {
    info (v1, v2) {
      console.log('返回结果', v1)
    }
  },
  methods: {
    viewHtml () {
      if (this.isViewHtml == false) {
        this.isViewHtml = true
      } else {
        this.isViewHtml = false
      }
    }
  },
  components: { Editor }
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
