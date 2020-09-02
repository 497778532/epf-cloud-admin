<template>
  <div class="page-body EPF-table"
       id="dispatchlist">
    <div class="filter_wrap">
      <div class="toolsTitleBox">
        成果历史版本
      </div>
      <el-table :data="tableData"
                style="width: 100%"
                border
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)">
        <el-table-column label="成果编号"
                         min-width="120">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="成果名称"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.key }}</span>
          </template>
        </el-table-column>

        <el-table-column label="所属区域"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.main }}</span>
          </template>
        </el-table-column>
        <el-table-column label="版本数"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.class }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后入库更新时间"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="版本号"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态"
                         min-width="170">
          <template slot-scope="scope">
            <span hit
                  size="medium">已入库归档</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span class="list-style: none;">
              <el-button type="text"
                         @click="btnClick(scope.row,'resultDetail')">查看</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页控件 -->
      <div style="text-align:right;margin:8px 0px;margin-top:15px;">
        <el-pagination background
                       layout="prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10, 15, 20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :page-size="pageSize"
                       :current-page="pageNo"></el-pagination>
      </div>
    </div>
    <el-dialog top="35vh"
               title="目录树命名"
               :visible.sync="dialogVisible"
               width="30%"
               :show-close="false">
      <el-row>
        <el-col :span="5">
          <span class="filter_title">目录树名称 :</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="topLevel"
                    placeholder="请输入目录树名称"
                    :maxlength="50"></el-input>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleClose()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import selectInput from '@/components/common/form/selectInpt'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'transnotice',
  components: { selectInput },
  data () {
    return {
      filterData: {},
      //  表格数据
      tableData: [
        {
          number: 10001,
          name: '土地利用总体规划',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 10002,
          name: '土地利用总体规划',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 10003,
          name: '土地利用总体规划',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 10004,
          name: '土地利用总体规划',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 10005,
          name: '土地利用总体规划',
          key: '1',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        }
      ],
      topLevel: '',
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      dialogVisible: false,
      loading: false, // 控制loading动画显示隐藏
      params: {}
    }
  },

  created () {
    // this.getList();
  },
  methods: {
    ...mapActions(['setTabsList']),

    add () {
      this.dialogVisible = true
    },
    authorize () { },
    handleClose () {
      this.topLevelAdd()
      // let title = "新增目录树";
      // let routerPath = `directoryTreeAdd`;
      // console.log(routerPath);
      // var tabObj = { title, routerPath };
      // this.setTabsList(tabObj);
      // this.$router.push({ path: routerPath });
    },

    btnClick (item, oper) {
      var routerPath, title
      if (oper === 'resultDetail') {
        title = '成果数据详情'
      }

      routerPath = oper + '?id=' + item.id
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath
      })
      // this.getObject(row.id)
    },

    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
    },
    searchList () {
      this.params = this.filterData
      this.getList()
    },
    getList (val) {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$post('/epf-onemap/admin/mapdiretree/topList', params).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.tableData = res.pager.results
          this.pageNo = res.pager.pageNo
          this.pageSize = res.pager.pageSize
          this.totalPage = res.pager.totalPage
          this.totalRecord = res.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getList()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getList()
    }
  }
}
</script>

<style scoped>
.page-body {
  height: auto;
}
.toolsTitleBox {
  height: 56px;
  background: rgba(230, 230, 230, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  text-align: left;
  line-height: 56px;
  margin-bottom: 20px;
  padding-left: 20px;
  font-size: 18px;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 13px;
  float: left;
}

.filter_wrap {
  box-sizing: border-box;
  padding: 30px 15px;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding-right: 15px;
  text-align: right;
  line-height: 35px;
  color: rgba(48, 48, 48, 1);
  font-weight: 400;
  font-size: 16px;
}
.switchHeight_box {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  line-height: 56px;
  margin-bottom: 20px;
}
</style>
