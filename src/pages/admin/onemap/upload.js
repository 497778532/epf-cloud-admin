export const upload = {}

upload.annexUpload = function (files) {
  (function (files, that) {
    const file = files.file
    let formData = new FormData()

    if (that.fileList.length > 0) {
      that.fileList.forEach(file => {
        formData.append('files', file)
      })
      if (formData.getAll('files').length === that.length && that.length > 0) {
        that.$useAppend('/epf-document/document/upload', formData).then(
          res => {
            that.fileList = []
            if (res.state === 'SUCCESS') {
              files.onSuccess(res)
              that.$message.success('上传成功!')
            }
          }
        )
      }
    }
  })(files, this)
}
