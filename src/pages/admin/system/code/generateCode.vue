<template>
  <div class="page-body">
    <div class="filter_wrap">
      <!-- 搜索 -->
      <div class="switchHeight_box">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              点我查看-使用须知<i class="header-icon el-icon-info"></i>
            </template>
            <div>1、确保后台代码生成器配置没有问题</div>
            <div>2、需要生成代码的表，表注释以及列注释都存在且不为空</div>
            <div>3、代码生成器路径是否配置正确</div>
            <div>4、当前数据库信息</div>
            <div style="margin-left: 2em">数据源：{{sourceType}}</div>
            <div style="margin-left: 2em">用户名：{{owner}}</div>
          </el-collapse-item>
        </el-collapse>
        <el-row :gutter="2">
          <el-col :span="2">
            <span class="filter_title">表名:</span>
          </el-col>
          <el-col :span="6">
            <el-input class="filterIpt"
                      v-model="filterData.tablename"
                      size="small"
                      placeholder="请输入表名"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="12"
                  :offset="1">
            <div class="btnBox">
              <div class="button_border"
                   @click="searchData">查询</div>
              <div class="button_default"
                   @click="resetFilter"
                   style="margin:0;">重置</div>
              <div class="button_bg"
                   @click="codeList"
                   style="float: right;width: 10em">批量生成代码</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-table :data="tableData"
                style="width: 100%"
                border
                v-loading="loading"
                @selection-change="handleSelectionChange"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                ref="multipleTable">
        <el-table-column type="selection"
                         width="55"></el-table-column>

        <el-table-column label="表名"
                         min-width="180">
          <template slot-scope="scope">
            <el-tag hit
                    size="medium">{{ scope.row.TABLENAME }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="表备注"
                         min-width="180">
          <template slot-scope="scope">
            <el-tag hit
                    size="medium">{{ scope.row.TABLECOMMENT }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="创建时间"
                         min-width="180">
          <template slot-scope="scope">
            <el-tag hit
                    size="medium">{{ scope.row.CREATETIME }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">

            <!----------------- 编辑 ----------------->
            <el-button size="mini"
                       type="warning"
                       plain
                       @click="handleEdit(scope.$index, scope.row)">生成代码</el-button>
          </template>

        </el-table-column>
      </el-table>

      <div style="text-align:right;margin:8px 0px;margin-top:15px;">
        <el-pagination background
                       layout="prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10, 15, 20]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :page-size="pageSize"
                       :current-page="pageNo">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import selectInput from '@/components/common/form/selectInpt'

export default {
  name: 'generateCode',
  components: { selectInput },
  data () {
    return {
      filterData: {}, // 查询条件
      //  表格数据
      tableData: [],
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      loading: true, // 控制loading动画显示隐藏
      searchInfo: {},
      selectGroups: [], // 已选中的对象
      codeHref: '', // 文件下载路径
      sourceType: '', // 数据源类型
      owner: '' // 用户名
    }
  },
  created () {
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.getList()
  },
  methods: {
    // 多选框选中事件
    handleSelectionChange (val) {
      this.selectGroups = val
    },
    // 批量生成代码按钮点击事件
    codeList () {
      // 获取已选中的行对象
      var selectGroups = this.selectGroups
      var id = ''
      if (selectGroups != null && selectGroups.length > 0) {
        for (var i = 0; i < selectGroups.length; i++) {
          id += selectGroups[i].TABLENAME + ','
        }
      } else {
        // 未选中任何对象，显示提示
        this.$message.success('没有指定生成表数据，将生成所有表代码!')
      }
      // 传输需要生成的表
      this.getObject(id)
    },
    //  查询 点击事件
    searchData () {
      var that = this
      var json = { 'tablename': that.filterData.tablename }
      var filters = JSON.stringify(json)
      that.searchInfo['filterData'] = filters
      that.getList()
    },
    //  重置 点击事件
    resetFilter () {
      this.filterData.tablename = ''
      var that = this
      var json = {}
      var filters = JSON.stringify(json)
      that.searchInfo['filterData'] = filters
      that.getList()
    },
    //  生成代码 点击事件
    handleEdit (index, row) {
      var id = row.TABLENAME
      this.getObject(id)
    },
    //  每页条数改变时触发
    handleSizeChange (val) {
      this.pageNo = 1
      this.pageSize = val
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getList()
    },
    //  翻页时触发
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.pageNo = val
      this.searchInfo['rows'] = this.pageSize
      this.getList()
    },
    getList () {
      let that = this
      that.$post('/epf-generator/sys/generator/listJson', this.searchInfo).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg)// 失败
          return
        }
        // 返回的数据
        that.tableData = res.page.list
        // 数据条数
        that.totalRecord = res.page.totalCount
        // 总页数
        that.totalPage = res.page.pageSize
        // 代码生成器路径
        that.codeHref = res.codeHref
        // 数据源类型
        if (res.sourceType == 1) {
          that.sourceType = 'Oracle'
        } else {
          that.sourceType = 'Mysql'
        }
        // 用户名
        that.owner = res.owner
        // 隐藏进度条
        this.loading = false
      })
    },
    getObject (id) {
      var btn = document.createElement('a')
      btn.setAttribute('download', '')// download属性
      btn.setAttribute('href', this.codeHref + id)// href链接
      btn.click()// 自执行点击事件
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
}

.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}

.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
}

.switchHeight_box {
  padding: 5px 15px;
  padding-top: 18px;
  border: 1px solid rgb(219, 219, 219);
  margin-bottom: 30px;
}

.btnBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.companyInfoBox {
  padding: 30px 30px;
  max-height: 600px;
  overflow-y: auto;
}

.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}

.middleBox {
  width: 85%;
  margin: 30px auto;
  margin-top: 10px;
}

.middleBox_btn {
  width: 85%;
  margin: 30px auto;
  margin-bottom: 0;
}

.btnInfo {
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  letter-spacing: 3px;
}
</style>
<style>
.filter_wrap .el-col .filterIpt.el-input--small .el-input__inner {
  height: 34px;
}
</style>
