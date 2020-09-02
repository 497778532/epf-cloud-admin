<template>
  <div id="fileLibrary">
    <el-row>
      <el-upload class="fileBox"
                 ref="additionalRef"
                 action="/epf-document/document/upload/"
                 :before-upload="fileFormatChecking"
                 :http-request="annexUpload"
                 :on-success="uploadSuccess"
                 :on-error="upLoadError"
                 :on-change="change"
                 :show-file-list="false"
                 :multiple="true">
        <el-button size="medium"
                   round
                   icon="el-icon-upload2"
                   style="margin-bottom:5px;margin-top:15px;">上传文件</el-button>
      </el-upload>

      <el-button @click="addFile()">新建文件夹</el-button>

      <el-button>下载</el-button>

      <el-button @click="dialogTableVisible=true">删除</el-button>

      <el-button @click="move=true">移动到</el-button>

      <el-button @click="editorFile()">重命名</el-button>
    </el-row>
    <el-row class="nav">
      <span v-for="(item,index) in nav"
            @click="refurbish(item)">
        <i v-if="index!==0"
           class="el-icon-arrow-right"></i>
        {{item.name}}
      </span>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-input v-model="fileName"
                  placeholder="输入文件名称"
                  :maxlength="50"></el-input>
      </el-col>
    </el-row>
    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%;margin-top:10px"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"></el-table-column>
      <el-table-column label="文件名"
                       min-width="120">
        <template slot-scope="scope">
          <el-input v-if="scope.row.add"
                    v-model="scope.row.name"
                    @blur="handleEditConfirm()"
                    :maxlength="50"></el-input>
          <el-input v-else-if="editor===scope.row"
                    v-model="scope.row.name"
                    @blur="handleEditConfirm1()"
                    :maxlength="50"></el-input>
          <span v-else
                class="refurbish"
                @click="refurbish(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="small"
                       label="大小"
                       min-width="120"></el-table-column>
      <el-table-column prop="date"
                       label="修改日期"
                       show-overflow-tooltip></el-table-column>
    </el-table>
    <div class="uploadList"
         v-if="upLoading">
      <el-row>
        文件上传
        <span @click="show2 = !show2">缩放</span>
        <span @click="upLoading=false">关闭</span>
      </el-row>
      <transition name="el-zoom-in-bottom">
        <div v-show="show2"
             class="transition-box">
          <el-table ref="multipleTable"
                    :data="uploadData"
                    tooltip-effect="dark"
                    style="width: 100%;margin-top:10px"
                    @selection-change="handleSelectionChange">
            <el-table-column label="文件名"
                             min-width="120">
              <template slot-scope="scope">
                <el-input v-if="scope.row.add"
                          v-model="scope.row.name"
                          @blur="handleEditConfirm()"
                          :maxlength="50"></el-input>
                <el-input v-else-if="editor===scope.row"
                          v-model="scope.row.name"
                          @blur="handleEditConfirm1()"
                          :maxlength="50"></el-input>
                <span v-else
                      class="refurbish"
                      @click="refurbish(scope.row)">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="small"
                             label="大小"
                             min-width="120"></el-table-column>
            <el-table-column prop="date"
                             label="修改日期"></el-table-column>
            <el-table-column prop="location"
                             label="文件位置"></el-table-column>
            <el-table-column prop="state"
                             label="状态"></el-table-column>
            <el-table-column label="操作"></el-table-column>
          </el-table>
        </div>
      </transition>
    </div>

    <el-dialog width="30%"
               class="deleteFile"
               :visible.sync="dialogTableVisible"
               :close-on-click-modal="false"
               :modal="false"
               :show-close="false">
      <p>确认删除文件</p>
      <p>文件删除后不可恢复，你还要继续吗？</p>

      <el-row>
        <el-button type="primary"
                   @click="deleteFileEnter()">确定</el-button>
        <el-button type="primary"
                   @click="dialogTableVisible=false">取消</el-button>
      </el-row>
    </el-dialog>

    <el-dialog top="25vh"
               title="移动"
               :visible.sync="move"
               width="35%"
               :modal="false">
      <div class
           style="height:430px">
        <controllerResourceCommon :data="data5"
                                  :EPFDefaultProps="defaultProps6"
                                  @EPFnodeClick="treeClick6"
                                  :EPFdefaultArray="defaultArray6"></controllerResourceCommon>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="moveOk()">确定</el-button>
        <el-button type="primary"
                   @click="move=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import controllerResourceCommon from '../../onemap/controller/controllerResourceCommon'
export default {
  data () {
    return {
      defaultArray6: [],
      move: false,
      successDialog: false,
      dialogTableVisible: false,
      show2: false,
      upLoading: true,
      defaultProps6: {
        children: 'childList',
        label: 'name',
        isLeaf: 'isLeaf'
      },
      data5: [
        {
          id: '0',
          name: '收藏',
          leverl: '0',
          childList: []
        }
      ],
      nav: [
        {
          name: '全部文件'
        },
        {
          name: '项目文件'
        },
        {
          name: '单个文件'
        }
      ],

      fileName: '',
      add: false,
      selection: [],
      editor: null,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      uploadData: [
        {
          date: '2019-05-03',
          name: '规划成果时间.jpg',
          address: '上海市普陀区金沙江路 1518 弄',
          location: '',
          state: '5%'
        },
        {
          date: '2019-05-03',
          name: '地块数据.png',
          address: '上海市普陀区金沙江路 1518 弄',
          location: '',
          state: '10%'
        },
        {
          date: '2019-05-03',
          name: '地利用总体规划.zip',
          address: '上海市普陀区金沙江路 1518 弄',
          location: '',
          state: '25%'
        }
      ],
      addParams: {
        date: '',
        name: '',
        address: '',
        add: false
      }
    }
  },
  components: {
    controllerResourceCommon
  },
  methods: {
    treeClick6 () { },
    showInput (item) {
      return this.editor === item
    },
    refurbish (item) {
      this.tableData = [
        {
          date: '2019-10-14',
          name: '李三',
          address: '中国'
        }
      ]
    },
    moveOk () {

    },
    deleteFileEnter () {
      this.dialogTableVisible = false
      this.successDialog = true
    },
    addFile () {
      this.addParams.add = true
      this.tableData.unshift(this.addParams)
    },
    editorFile () {
      this.editor = this.selection[0]
    },
    handleSelectionChange (val) {
      this.selection = val
    },
    handleEditConfirm () {
      this.addParams.add = false
    },
    handleEditConfirm1 () {
      this.editor = null
    },
    fileFormatChecking (file) {
      console.log(file)
      // 附件上传格式验证
      let extName = file.name.split('.').slice(-1)[0]
      const fileTyState = this.extName.indexOf(extName)
      let docSize = file.size / 1024 / 1024 < this.docSize
      if (fileTyState == -1) {
        this.$message.error(`上传附件不能是 ${extName} 格式!`)
        return false
      }
      if (!docSize) {
        this.$message.error(`上传附件大小不能超过 ${this.docSize} MB!`)
        return false
      }
      this.isLookFileName = true
      this.fileName = file.name
    },
    annexUpload (files) {
      // 附件上传
      const file = files.file
      let formData = new FormData()
      if (this.fileList.length > 0) {
        this.fileList.forEach(file => {
          formData.append('files', file)
        })
        if (formData.getAll('files').length == this.length && this.length > 0) {
          this.$useAppend('/epf-document/document/upload', formData).then(
            res => {
              this.fileList = []
              // 此处重置文件中间存储变量是为了相同文件能够重复传递
              if (res.state == 'SUCCESS') {
                files.onSuccess(res)
                this.$message.success('上传成功!')
              }
            }
          )
        }
      }
    },
    uploadSuccess (res, file, fileList) {
      // 上传成功回调
      for (var key in res.data) {
        this.fileNameList.push({
          name: res.data[key].name,
          extName: res.data[key].extName,
          docSize: res.data[key].docSize,
          id: res.data[key].id
        })
      }
      console.log(this.fileNameList)
      if (this.fileNameList.length > 0) {
        this.isAnalysis = true
      }
    },
    upLoadError () {
      // 上传失败回调
      this.$message.error('文件上传失败啦!')
    }
  }
}
</script>

<style scoped>
#fileLibrary {
  width: 100%;
  height: 100%;
  position: relative;
}
.refurbish {
  cursor: pointer;
}
.nav {
  margin-top: 10px;
}
.nav span {
  cursor: pointer;
}
.uploadList {
  position: absolute;
  bottom: 0;
  right: 0;

  width: 50%;
}
</style>
<style>
#fileLibrary .fileBox {
  display: inline;
}
#fileLibrary .deleteFile .el-dialog__header {
  padding: 0;
}
</style>
