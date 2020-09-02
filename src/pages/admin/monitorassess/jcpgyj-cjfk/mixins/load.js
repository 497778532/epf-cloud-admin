export default {
  data () {
    return {
      uploadUrls: [
        '/epf-monitor-evaluation/admin/fkScaleLedger/import', // 预留规模台账
        '/epf-monitor-evaluation/dismantOldReclam/excel/upload', // 拆旧复垦指标调整汇总
        '/epf-monitor-evaluation/bildAreaBackFill/excel/upload', // 纳入城乡建设用地预留规模需回填复垦区
        '/epf-monitor-evaluation/admin/fkReserveInfo/import', // 纳入城乡建设用地预留规模
        '/epf-monitor-evaluation/admin/fkAcceptedBildInfo/import' // 已验收拆旧复垦项目纳入城乡建设用地
      ],
      downloadUrls: [
        '/api/epf-document/document/downloadById?id=2f4d0e1b-abc7-4983-bc65-e97df1b75473', // 预留规模台账
        '/api/epf-document/document/downloadById?id=313f9fea-9b7a-4cde-91c8-8aa92bbba699', // 拆旧复垦指标调整汇总
        '/api/epf-document/document/downloadById?id=fd9af2fa-00de-42b2-bda4-de74896a0d38', // 纳入城乡建设用地预留规模需回填复垦区
        '/api/epf-document/document/downloadById?id=583401bf-2538-439a-8f95-8b5ba893a440', // 纳入城乡建设用地预留规模
        '/api/epf-document/document/downloadById?id=1f88f0f8-0d33-4d6e-b28c-713590f1d668' // 已验收拆旧复垦项目纳入城乡建设用地
      ],
      file: null
    }
  },
  methods: {
    beforeUpload (file) {
      const isLt5M = file.size / 1024 / 1024 < 5

      if (isLt5M) {
        return true
      }
      this.$message({
        message: '上传文件不能超过5M',
        type: 'warning'
      })
      return false
    },
    // 导入台账
    annexUpload (files) {
      const file = files.file
      const me = this
      let formData = new FormData()
      if (file) {
        formData.append('file', file)
        this.$useAppend(this.uploadUrls[this.jcpgyjindex], formData).then(
          res => {
            if (res.code === 0) {
              files.onSuccess(res)
              this.$message.success('模板上传成功!')
            } else {
              me.uploadError()
            }
          }
        )
      }
    },
    uploadSuccess() {},
    uploadError() {
      this.$message.error('模板上传失败!')
    },
    changeFile() {},

    handleDownloadTemplateClick() {
      this.downloadTemplate()
    },
    // 下载模板
    downloadTemplate() {
      window.open(this.downloadUrls[this.jcpgyjindex])
    }
  }
}
