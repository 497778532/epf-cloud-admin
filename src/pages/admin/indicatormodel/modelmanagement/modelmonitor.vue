<template>
  <el-row class="EPF-table modelmonitor">
    <div style="padding:15px;">
      <div class="filter_wrap">
        <div class="toolsTitleBox">
          <span style="font-size:16px;color:#000">指标分类信息</span>
        </div>
        <!-- 搜索 -->
        <div class="switchHeight_box">
          <el-row>
            <el-col :span="2">
              <span class="filter_title">搜索关键词</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="filterData.modelName"
                        placeholder="请输入关键词"
                        :maxlength="50"></el-input>
            </el-col>

            <el-col :span="2">
              <span class="filter_title">开始时间</span>
            </el-col>
            <el-col :span="4">
              <el-date-picker v-model="filterData.beginReleaseDate"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">结束时间</span>
            </el-col>
            <el-col :span="4">
              <el-date-picker v-model="filterData.endReleaseDate"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期时间"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="2"
                    :offset="1">
              <div class="primary_reset"
                   @click="resetFilter()">重置</div>
            </el-col>
            <el-col :span="2">
              <div class="primary_search"
                   @click="searchList()">搜索</div>
            </el-col>
          </el-row>
          <div class="dictionary">
            <el-row>
              <el-col :span="2">
                <span class="filter_title">模型类型</span>
              </el-col>
              <span :class="{'all':item.dictKey===isCurrent1}"
                    v-for="(item,index) in dictionary.model_type"
                    @click="searchList1(item)"
                    :key="index">{{item.zhCn}}</span>
            </el-row>

            <el-row>
              <el-col :span="2">
                <span class="filter_title">运行状态</span>
              </el-col>
              <span v-for="(item,index) in status"
                    :class="{'all':item.id==isCurrent2}"
                    @click="searchList2(item)"
                    :key="index">{{item.name}}</span>
            </el-row>
          </div>
        </div>
        <div style="width: 100%;margin-top:20px;padding:20px">
          <el-table :data="tableData"
                    style="width: 100%;"
                    stripe
                    border>
            <el-table-column label="模型名称"
                             min-width="160">
              <template slot-scope="scope">
                <span hit
                      size="medium">{{ scope.row.modelName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="版本号"
                             min-width="160">
              <template slot-scope="scope">
                <span hit
                      size="medium">{{ scope.row.versionNo }}</span>
              </template>
            </el-table-column>

            <el-table-column label="发布时间"
                             min-width="160">
              <template slot-scope="scope">
                <span hit
                      size="medium">{{ scope.row.releaseDate }}</span>
              </template>
            </el-table-column>

            <el-table-column label="发布状态"
                             min-width="160"
                             align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.isRelease==0"
                      hit
                      size="medium">未发布</span>
                <span v-if="scope.row.isRelease==1"
                      hit
                      size="medium">已发布</span>
              </template>
            </el-table-column>

            <el-table-column label="运行状态"
                             min-width="160"
                             align="center">
              <template slot-scope="scope">
                <span hit
                      size="medium">{{ scope.row.main }}</span>
              </template>
            </el-table-column>

            <el-table-column fixed="right"
                             label="操作"
                             min-width="160"
                             align="center">
              <template slot-scope="scope">
                <span class="list-style: none;">
                  <!-- v-if="button.resourceId=='cjgs_editinfo'&&scope.row.status=='0'" -->
                  <el-button @click="deletedAuthorizeList(scope.row)"
                             type="text">刷新</el-button>
                  <el-button @click="deletedAuthorizeList(scope.row)"
                             type="text">查看日志</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页控件 -->
        <div style="text-align:right;margin:8px 0px;margin-top:15px;">
          <el-pagination background
                         layout="total,prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="totalRecord"
                         :page-size="pageSize"
                         :current-page="pageNo"></el-pagination>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tableData: [
        {
          number: 1,
          name: '深圳市',
          key: '深圳市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '5',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 2,
          name: '广州市',
          key: '广州市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '12',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 3,
          name: '河源市',
          key: '河源市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 4,
          name: '揭阳市',
          key: '揭阳市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '8',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 5,
          name: '清远市',
          key: '清远市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '9',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        }
      ],
      isCurrent1: '',
      isCurrent2: '',
      filterData: {
        modelName: '',
        beginReleaseDate: '',
        endReleaseDate: ''
      },
      pictureFilterData: {},
      //  表格数据
      params: {},

      status: [
        { name: '全部', id: '' },
        { name: '正常', id: '0' },
        { name: '警告', id: '1' },
        { name: '异常', id: '2' },
        { name: '停止', id: '3' }
      ],
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      loading: false,

      dicRequest: ['model_type'], // 字典码请求
      dictionary: {
        // 字典码结果
        model_type: ''
      },
      dicNum: 0
    }
  },
  components: {},
  created () {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        this.$get(
          `/epf-admin/admin/dictionaries/getDictEbyDictGroup/${item}`,
          {}
        ).then(res => {
          resolve(res)
        })
      })
      return reqFun
    })
    Promise.all(reqArr).then(res => {
      console.log(res)
      let dicArr = res.map(item => {
        console.log(item)
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          }
        })

        dicArr.unshift({
          id: '',
          dictKey: '',
          zhCn: '全部'
        })
        return dicArr
      })

      for (let item in this.dictionary) {
        console.log(this.dicNum)
        this.dictionary[item] = dicArr[this.dicNum]
        console.log(dicArr[this.dicNum])
        this.dicNum++
      }

      console.log('字典结果', this.dictionary)
    })
    this.getList()
  },
  methods: {
    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.isCurrent1 = ''
      this.isCurrent2 = ''
      this.params['filterData'] = JSON.stringify(this.filterData)

      this.getList()
    },
    getList (val) {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize

      this.$get(
        '/epf-index-model/immodellibrary/getImModelLibraryJson',
        params
      ).then(res => {
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
    searchList () {
      this.params['filterData'] = JSON.stringify(this.filterData)

      this.getList()
    },
    searchList1 (item) {
      this.isCurrent1 = item.dictKey
      this.filterData.modelType = item.dictKey
      this.params['filterData'] = JSON.stringify(this.filterData)
      this.getList()
    },
    searchList2 (item) {
      this.isCurrent2 = item.id
      this.filterData.status = item.id
      this.params['filterData'] = JSON.stringify(this.filterData)
      this.getList()
    },
    treeClick5 () { },
    treeChangeClick () { },

    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getList()
    },

    nodeClick (item) {
      this.$set(this.defaultArray1, 0, item.id)
      this.isCurrent = item
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getList()
    },

    getIDs: function (array) {
      var ids = ''
      for (var i = 0; i < array.length; i++) {
        ids += array[i].id
        if (i != array.length - 1) {
          ids += ','
        }
      }
      return ids
    },
    handleSelectionChange (val) {
      this.serviceIdsArr = this.getIDs(val)
    },

    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode () {
      if (this.mode == 'transfer') {
        this.mode = 'addressList'
      } else {
        this.mode = 'transfer'
      }
    }
  }
}
</script>

<style scoped>
.companyInfoBox {
  padding: 30px 30px;
  max-height: 600px;
  overflow-y: auto;
}

.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding-right: 15px;
  text-align: center;
  line-height: 35px;
  color: rgba(48, 48, 48, 1);
  font-weight: 400;
  font-size: 16px;
}
.filter_wrap {
  box-sizing: border-box;
  min-height: 750px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.zy-main {
  height: 100%;
  overflow: hidden;
}

.middleBox {
  margin: 30px auto;
  margin-top: 10px;
}
.middleBox_btn {
  width: 85%;
  margin: 30px auto;
  margin-bottom: 0;
}

.toolsTitleBox {
  height: 56px;
  background: rgba(230, 230, 230, 1);

  text-align: left;
  line-height: 56px;
  background: #e8eaf6;
  padding-left: 20px;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 13px;
  float: left;
}
.currentDiv {
  float: right;
  text-align: right;
  width: 40%;
}
.currentDiv > div {
  display: inline-block;
  margin-right: 5px;
}

.switchHeight_box {
  padding: 20px;

  line-height: 45px;
  color: rgba(112, 112, 112, 1);
}
.dictionary span {
  margin-right: 25px;
  cursor: pointer;
}

.dictionary span.all {
  color: rgba(245, 154, 35, 1);
}
.dictionary .el-col {
  font-size: 15px;
  text-align: center;
  color: rgba(67, 67, 67, 1);
}
</style>

<style>
.modelmonitor .el-date-editor.el-input,
.modelmonitor .el-date-editor.el-input__inner {
  width: 100%;
}
</style>
