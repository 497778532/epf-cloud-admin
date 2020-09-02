<template>

  <div class="redTable">
    <el-row type="flex"
            align="middle">
      <span class="table-header__title">{{title}}</span>

      <i class="el-icon-circle-close"
         @click="close"
         style="font-size:26px;margin-left:auto"></i>

    </el-row>

    <el-table :data="tableContent"
              v-loading="loading"
              stripe
              element-loading-text="数据加载中"
              element-loading-background="rgba(255, 255, 255,0.95)"
              style="width: 100%;margin:10px 0">

      <el-table-column type="index"
                       label="序号"
                       min-width="100">
      </el-table-column>
      <el-table-column v-for="(item,index) in tableHead"
                       :prop="item.en"
                       :label="item.ch"
                       min-width="250"
                       align="center"
                       :key="index
                           ">
      </el-table-column>

    </el-table>
    <div style="text-align:right"
         class="fanye">
      <el-pagination background
                     layout="total, prev, pager, next,sizes,jumper"
                     :page-sizes="[5,10,15,20]"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :total="totalRecord"
                     :current-page.sync="currentPage"
                     :page-size="pageSize"></el-pagination>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  data () {
    return {
      textarea: '',
      canClick: true,

      axiosBtn: true,
      projectId: null,

      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      myHeaders: {
        token: sessionStorage.getItem('token')
      },
      tableHead: [
        { en: 'chongtuType', ch: '要素代码' },
        { en: 'chongtuType', ch: '行政区域名称' },
        { en: 'chongtuType', ch: '类型' },
        { en: 'chongtuType', ch: '压力面积' },
        { en: 'chongtuType', ch: '现状地类' }
      ],
      tableContent: [

      ],
      arr: [],
      filterData: {
        projectName: '',
        remarks: ''

      }

    }
  },
  components: {},
  methods: {
    close () {
      this.$emit('close')
    },

    enter () {
      let params = this.filterData
      params['year'] = this.year
      params = Object.assign(params, this.areaParams)

      this.axiosBtn = false
      this.$get('/epf-monitor-evaluation/mproject/save', params).then(res => {
        if (res.code === 0) {
          this.$emit('save')
          this.projectId = res.projectId
          this.$message.success('添加成功,请继续分析文件')
          this.canClick = false
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    beforeUpload () {
      if (!this.projectId) {
        this.$message('请先提交项目后分析文件')
        return false
      }
    },
    analysis () {
      if (!this.projectId) {
        return
      }
      if (!this.arr.length) {
        this.$message('请上传文件')
        return
      }
      let params = {
        json: JSON.stringify(this.arr)
      }
      this.$post(
        '/epf-monitor-evaluation/mproject/files/saveByJson',
        params
      ).then(res => {
        if (res.code == '0') {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
          return
        }
      })
    },
    success2 (res, file, fileList) {
      let obj = {
        projectId: this.projectId,
        documentType: 2,
        documentId: res.data[0].id
      }
      this.arr.push(obj)
    },
    success3 (res, file, fileList) {
      let obj = {
        projectId: this.projectId,
        documentType: 3,
        documentId: res.data[0].id
      }
      this.arr.push(obj)
    },
    success4 (res, file, fileList) {
      let obj = {
        projectId: this.projectId,
        documentType: 4,
        documentId: res.data[0].id
      }
      this.arr.push(obj)
    }
  },
  computed: {
    ...mapState('jcpgyj', ['year'])
  },
  mounted () {
    let width = document.querySelector('.body__right').offsetWidth + 'px'
    document.querySelector('.redTable').style.width = width
  }

}
</script>

<style scoped>
.redTable {
  position: fixed;
  right: 24px;
  bottom: 17px;
  z-index: 2;
  background: #fff;
  padding: 16px;
}
.table-header__title {
  font-size: 18px;

  color: rgba(89, 89, 89, 1);
  font-weight: 700;
}
</style>
