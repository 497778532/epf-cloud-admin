<template>
  <widgetpanel v-show="showPanel">
    <div class="epf-map-content">
      <div>标题</div>
      <el-input v-model="titleText"
                placeholder="请输入内容标题"
                style="margin-bottom:16px;"
                :maxlength="50"></el-input>
      <div>纸张样式</div>
      <el-select v-model="layoutSize"
                 placeholder="请选择纸张样式"
                 style="margin-bottom:16px;">
        <el-option v-for="item in layoutSizeOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"></el-option>
      </el-select>
      <div>纸张方向</div>
      <el-select v-model="layoutType"
                 placeholder="请选择纸张方向"
                 style="margin-bottom:16px;">
        <el-option v-for="item in layoutTypeOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"></el-option>
      </el-select>
      <div>制图人</div>
      <el-input v-model="authorText"
                placeholder="请输入制图人名称"
                style="margin-bottom:16px;"
                :maxlength="20"></el-input>
      <el-button type="primary"
                 @click="handlePrintClick"
                 :disabled="isExecuting"
                 v-loading="isExecuting">打印</el-button>
    </div>
  </widgetpanel>
</template>

<script>
import widgetpanel from '../../utils/panel'
export default {
  name: 'print-widget',
  componentName: '打印',
  inject: ['mapAppId'],
  watch: {
    showPanel (val) {
      if (val) {
        this.showPrint()
      }
    }
  },
  data () {
    return {
      showPanel: false,
      constructor: null,
      printTask: null,
      printTemplate: null,
      isExecuting: false,
      mapApp: null,
      screenshotDataUrl: null,
      format: '',
      layoutSize: '',
      layoutType: '',
      titleText: '',
      authorText: '',
      dpi: '',
      layoutSizeOptions: [
        {
          value: 'a3',
          label: 'A3'
        },
        {
          value: 'a4',
          label: 'A4'
        }
      ],
      layoutTypeOptions: [
        {
          value: 'portrait',
          label: '竖屏模式'
        },
        {
          value: 'landscape',
          label: '横屏模式'
        }
      ]
    }
  },
  methods: {
    async showPrint () {
      if (
        !this.printTask
        || !this.printTemplate
        || (!this.printParams && this.mapAppId)
      ) {
        this.constructor = await this.$loadGISModules([
          'esri/tasks/PrintTask',
          'esri/tasks/support/PrintTemplate',
          'esri/tasks/support/PrintParameters'
        ])
        this.mapApp = this.$findMapApp(this.mapAppId)
        let printUrl
          = 'http://120.77.57.182:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task'
        this.printTask = new this.constructor.PrintTask({
          url: printUrl
        })
        this.printTemplate = new this.constructor.PrintTemplate()
        this.printParams = new this.constructor.PrintParameters({
          view: this.mapApp.view
        })
        this.mapApp.widgets.push(this.printTask)
        this.mapApp.widgets.push(this.printTemplate)
        this.mapApp.widgets.push(this.printParams)
      }
    },
    startPrint () {
      // this.printTemplate.format = "png32";
      this.printTemplate.layout = this.layoutSize + '-' + this.layoutType
      this.printTemplate.layoutOptions = {
        titleText: this.titleText,
        authorText: this.authorText
      }

      this.printParams.template = this.printTemplate

      return this.printTask.execute(this.printParams)
    },
    handlePrintClick () {
      // a3 297×420
      // a4 297×420
      // let width;
      // let height;
      // if (this.layoutSize === "a3") {
      //   width = 297 * 3.78;
      //   height = 420 * 3.78;
      // } else {
      //   width = 210 * 3.78;
      //   height = 297 * 3.78;
      // }

      let area = {
        x: 0,
        y: 0,
        width: this.mapApp.width,
        height: this.mapApp.height
      }
      let that = this

      that.mapApp.view
        .takeScreenshot({
          area: area,
          format: 'png'
        })
        .then(screenshot => {
          that.screenshotDataUrl = screenshot.dataUrl
          if (that.screenshotDataUrl) {
            that.downloadImage('新建打印.png', that.screenshotDataUrl)
          }
        })
      // this.isExecuting = true;
      // Promise.race([this.startPrint(), this.printTimeout(10000)]).then(res => {
      //   console.log(res);
      //   this.isExecuting = false;
      // }).catch(err => {
      //     console.log(err);
      //     this.isExecuting = false;
      //   });
      // this.startPrint()
      //   .then(res => {
      //     // this.downloadImage("新建打印", res.url)
      //     console.log(res);
      //     this.isExecuting = false;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     this.isExecuting = false;
      //   });
    },
    printTimeout (ms) {
      return new Promise((_, reject) => {
        let msg = '请求超时，请重试'
        setTimeout(_ => reject(msg), ms)
      })
    },
    downloadImage (filename, dataUrl) {
      if (!window.navigator.msSaveOrOpenBlob) {
        const element = document.createElement('a')
        element.setAttribute('href', dataUrl)
        element.setAttribute('download', filename)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      } else {
        const byteString = atob(dataUrl.split(',')[1])
        const mimeString = dataUrl
          .split(',')[0]
          .split(':')[1]
          .split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        const blob = new Blob([ab], { type: mimeString })
        window.navigator.msSaveOrOpenBlob(blob, filename)
      }
    }
  },
  components: {
    widgetpanel
  }
}
</script>

<style>
</style>
