<template>
  <div id="dataDetailBox"
       v-if="this.showDetail==true">
    <div class="data_title">
      <span>服务图层</span>
      <i class="el-icon-close"
         @click="handleClickClose"
         style="position: absolute;right:20px;"></i>
    </div>
    <div class="data_content">
      <div class="bigtab">
        <ul class="bigtab_title">
          <li @click="turnMain"
              :class="{active:current==0}">
            <input style="display:none;"
                   type="radio"
                   name="tabToggle"
                   value="0" />
            规划文本
          </li>
          <li @click="turnFile"
              :class="{active:current==1}">
            <input style="display:none;"
                   type="radio"
                   name="tabToggle"
                   value="1" />
            规划专题
          </li>
        </ul>
      </div>
      <div v-if="current==0">
        <p class="main_text"
           v-for="(info, index) in servicesInfo"
           :key="index">{{info.name}}: {{info.value}}</p>
      </div>
      <div v-if="current==1">
        <el-table ref="multipleTable"
                  :data="tableData"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55"></el-table-column>
          <el-table-column prop="name"
                           label="全选"
                           width="250"></el-table-column>
          <el-table-column>
            <template slot="header">
              <el-button type="text"
                         size="small"
                         @click="downLoadAll()">批量下载</el-button>
            </template>
            <template slot-scope="scope">
              <el-button type="text"
                         @click="centerDialogVisible = true">预览</el-button>
              <el-dialog title="预览"
                         :visible.sync="centerDialogVisible"
                         width="50%"
                         center>
                <iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls'
                        width='100%'
                        height='100%'
                        fullscreen>
                </iframe>
                <span slot="footer"
                      class="dialog-footer">
                  <el-button @click="centerDialogVisible = false">取 消</el-button>
                  <el-button type="primary"
                             @click="centerDialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
              <el-button type="text"
                         size="small"
                         @click="downLoad(scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '@/utils/bus'

export const downloadFile = (url) => {
  const iframe = document.createElement("iframe")
  iframe.style.display = "none"// 防止影响页面
  iframe.style.height = 0  // 防止影响页面
  iframe.src = url
  document.body.appendChild(iframe)  // 这一行必须，iframe挂在到dom树上才会发请求
  // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
  setTimeout(() => {
    iframe.remove()
  }, 5 * 60 * 1000)
}
export default {
  data() {
    return {
      orderAttachment: [
        { attachPath: 'https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' }
      ],
      centerDialogVisible: false,
      current: 0,
      tableData: [
        {
          name: '附件名称1'
        },
        {
          name: '附件名称1'
        },
        {
          name: '附件名称1'
        },
        {
          name: '附件名称1'
        },
        {
          name: '附件名称1'
        },
        {
          name: '附件名称1'
        },
        {
          name: '附件名称1'
        }
      ],
      multipleSelection: [],
      showDetail: false,
      getDetail: ''
    }
  },
  methods: {
    turnMain() {
      this.current = 0
    },
    turnFile() {
      this.current = 1
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClickClose() {
      this.showDetail = false
      this.getDetail = ''
    },
    downLoad(scope) {
      console.log('单量下载')
    },
    downLoadAll() {
      var that = this
      for (var i = 0; i < that.orderAttachment.length; i++) {
        const url = that.orderAttachment[i].attachPath
        downloadFile(url)
      }
    },
    PreLook() {
    }
  },
  computed: {
    servicesInfo() {
      let info = []
      let _ = this.getDetail
      info = [
        {
          name: '图层名称',
          value: _.serviceName
        },
        {
          name: '图层服务类型',
          value: _.serviceType
        },
        {
          name: '备注',
          value: _.remarks || '无'
        }
      ]
      return info
    }
  },
  created() {
    var that = this
    Bus.$on('send', function (val) {
      console.log(val)
      that.showDetail = val
    })
    Bus.$on('sendDetail', function (val) {
      console.log(val)
      that.getDetail = val
    })
  }
}
</script>
<style scoped>
#dataDetailBox {
  font-size: 14px;
  position: absolute;
  top: 6.625rem;
  right: 0.9rem;
}
.data_title {
  width: 415px;
  height: 45px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-shadow: 2px 0px 5px 0 rgba(0, 0, 0, 0.5);
  position: relative;
}
.data_content {
  width: 415px;
  height: 650px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  /* border: 1px solid #999; */
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.data_content::-webkit-scrollbar {
  display: none;
}
.bigtab {
  width: 260px;
  height: 32px;
  margin: 5px auto;
}
.bigtab_title {
  width: 100%;
  height: 30px;
  display: flex;
}
.bigtab_title li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #fff;
  color: #979797;
  border: 1px solid #1b80e4;
}
.bigtab_title li.active {
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
  color: #fff;
}
.main_text {
  text-indent: 2em;
  margin-top: 20px;
  font-size: 14px;
  line-height: 18px;
}
</style>
<style>
#dataDetailBox .el-table .el-table__header thead th {
  background: #fff;
  color: #666;
  font-weight: normal;
}
#dataDetailBox .el-table td,
#dataDetailBox .el-table th.is-leaf {
  border-bottom: 1px solid transparent;
}
#dataDetailBox .el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
#dataDetailBox .el-table td,
#dataDetailBox .el-table th {
  padding: 5px 0;
}
#dataDetailBox .el-dialog__body {
  height: 600px;
}
</style>
