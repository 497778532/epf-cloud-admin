<template>
  <div class="page-body EPF-table"
       id="dispatchlist">
    <div class="filter_wrap">
      <!-- 搜索 -->
      <div class="switchHeight_box">
        <el-row style="margin-bottom:24px;">
          <el-col :span="5"
                  class="filter_title_box">
            <span class="filter_title__custom">成果名称 :</span>
            <el-input size="small"
                      v-model="filterData.projectName"
                      placeholder="请输入成果名称"
                      style="width:calc(100% - 120px);"
                      :maxlength="50"></el-input>
          </el-col>
          <el-col :span="5"
                  class="filter_title_box">
            <span class="filter_title__custom">所属区域 :</span>
            <el-cascader size="small"
                         style="width:calc(100% - 120px);"
                         :props="props"
                         clearable
                         v-model="areaSelectedOptions"
                         @change="areaSelect()"></el-cascader>
          </el-col>
          <el-col :span="5"
                  class="filter_title_box">
            <span class="filter_title__custom">项目类型 :</span>
            <el-select v-model="filterData.projectTypeName"
                       placeholder="全部"
                       @change="projectTypeSelect"
                       style="width:calc(100% - 120px);">
              <el-option v-for="item in projectTypeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item"></el-option>
            </el-select>
          </el-col>

          <el-col :span="5"
                  class="filter_title_box">
            <span class="filter_title__custom_two">状态 :</span>
            <el-select size="small"
                       v-model="filterData.projectStatusName"
                       placeholder="全部"
                       @change="status(dictionary.project_status,filterData.projectStatusName,$event)"
                       style="width:calc(100% - 60px);">
              <el-option v-for="(item,index) in dictionary.project_status"
                         :ref="item.zhCn"
                         :id="item.id"
                         :dictKey="item.dictKey"
                         :label="item.zhCn"
                         :value="item.zhCn"
                         :key="index"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4"
                  style="display:flex;justify-content:flex-end;">
            <div class="primary_reset"
                 @click="resetFilter()">重置</div>
            <div class="primary_search"
                 @click="searchList()">搜索</div>
          </el-col>
        </el-row>
      </div>

      <el-table :data="tableData"
                style="width: 100%"
                border
                stripe
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)">
        <el-table-column label="成果编号"
                         min-width="120"
                         align="center">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.projectNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="成果名称"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.projectName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目类型"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.projectTypeName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="所属区域"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.ownAreaName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="版本数"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.versionNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后入库更新时间"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.storageTime"
                  hit
                  size="medium">{{ scope.row.storageTime }}</span>
            <span v-else
                  hit
                  size="medium">{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最新版本号"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.versionNo }}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         label="操作"
                         min-width="170"
                         align="center">
          <template slot-scope="scope">
            <span class="list-style: none;">
              <el-button type="text"
                         @click="btnClick(scope.row,'projectcheck')">查看详情</el-button>
              <el-button @click="btnClick(scope.row,'historysubmission')"
                         type="text"
                         plain>历史版本</el-button>
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
import axios from 'axios'
import selectInput from '@/components/common/form/selectInpt'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'transnotice',
  components: { selectInput },
  data () {
    return {
      areaSelectedOptions: ['440000'],
      props: {
        value: 'dictKey',
        label: 'zhCn',
        checkStrictly: true,
        expandTrigger: 'hover',
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level } = node
          if (level === 0) {
            const dictionariesList = [{
              zhCn: '广东省',
              id: '440000',
              parentId: '0',
              dictKey: '440000',
              dictValue: '440000'
            }]
            return resolve(dictionariesList)
          }
          const res = await axios.get(
            `/api/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${node.data.dictKey}`
          )
          res.dictionariesList.forEach(
            item => (item.leaf = level >= 2)
          )
          return resolve(res.dictionariesList)
        }
      },
      projectTypeList: [],
      ownArea: '440000',

      filterData: {
        projectStatusName: '',
        projectStatus: '',
        projectType: '',
        projectTypeName: '',
        projectName: '',
        ownArea: '440000'
      },
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
      params: {},
      dicRequest: ['administrative_regions', 'project_type', 'project_status'], // 字典码请求
      dictionary: {
        // 字典码结果
        administrative_regions: '',
        project_type: '',
        project_status: '',

        cantonCity: '',
        cantonArea: ''
      },
      dicNum: 0
    }
  },

  created () {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == 'administrative_regions') {
          this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
            parentId: 0
          }).then(res => {
            resolve(res)
          })
        } else {
          this.$get(
            `/epf-admin/admin/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            resolve(res)
          })
        }
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
        return dicArr
      })
      console.log(dicArr)
      for (let item in this.dictionary) {
        console.log(this.dicNum)
        this.dictionary[item] = dicArr[this.dicNum]
        console.log(dicArr[this.dicNum])
        this.dicNum++
      }
      this.dicFinsh = true
      console.log('字典结果', this.dictionary)
    })
    this.getList()
    this.getProjectType()
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
      if (oper === 'projectcheck') {
        title = '查看项目详细信息'
      }
      if (oper === 'historysubmission') {
        title = '历史版本'
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
      this.areaSelectedOptions = ['440000']
      this.ownArea = '440000'
      this.getList()
      this.getProjectType()
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
      this.$post(
        '/epf-result-review/revproject/getProjectDataList',
        params
      ).then(res => {
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
    },
    status (dic, projectStatusName, event) {
      this.filterData.projectStatus = this.$refs[
        projectStatusName
      ][0].$attrs.dictKey
    },
    projectType (dic, projectTypeName, event) {
      this.filterData.projectType = this.$refs[
        projectTypeName
      ][0].$attrs.dictKey
    },

    areaSelect () {
      if (this.areaSelectedOptions.length === 3) {
        this.filterData.ownArea = this.areaSelectedOptions[2]
        this.ownArea = this.areaSelectedOptions[2]
      } else if (this.areaSelectedOptions.length === 2) {
        this.filterData.ownArea = this.areaSelectedOptions[1]
        this.ownArea = this.areaSelectedOptions[1]
      } else if (this.areaSelectedOptions.length === 1) {
        this.filterData.ownArea = this.areaSelectedOptions[0]
        this.ownArea = this.areaSelectedOptions[0]
      }
      this.filterData.projectType = ''
      this.filterData.projectTypeName = ''
      this.getProjectType()
    },
    async getProjectType () {
      let res = await this.$get(
        `/epf-result-review/revplanningcategorymanage/getRevPlanningType?cantonId=${this.ownArea}&orgId=${sessionStorage.getItem('orgId')}`
      )
      if (res.code === 0) {
        this.projectTypeList = []
        for (var key in res.planning) {
          this.projectTypeList.push({
            value: res.planning[key].planningTypeId,
            label: res.planning[key].planningTypeName
          })
        }
      } else {
        this.$message.error(res.msg)
      }
    },
    projectTypeSelect (val) {
      this.filterData.projectType = val.value
      this.filterData.projectTypeName = val.label
    }
  },
  watch: {
    areaSelectedOptions (val) {
      if (val.length === 3) {
        this.ownArea = val[2]
      } else if (val.length === 2) {
        this.ownArea = val[1]
      } else if (val.length === 1) {
        this.ownArea = val[0]
      } else if (val.length === 0) {
        this.ownArea = ''
      }
      this.filterData.projectType = ''
      this.filterData.projectTypeName = ''
      this.getProjectType()
    }
  }
}
</script>

<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.toolsTitleBox {
  height: 56px;
  background: rgba(230, 230, 230, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  text-align: right;
  line-height: 56px;
  margin-bottom: 20px;
  padding-right: 20px;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 13px;
  float: left;
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

.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  min-height: 789px;
  box-sizing: border-box;
  padding: 16px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
.filter_title_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.filter_title_box_end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.filter_title__custom {
  box-sizing: border-box;
  width: 90px;
  min-width: 90px;
  max-width: 90px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.filter_title__custom_two {
  box-sizing: border-box;
  width: 60px;
  min-width: 60px;
  max-width: 60px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.switchHeight_box {
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.el-input__inner {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  height: 36px;
  line-height: 40px;
}
.primary_search {
  width: 96px;
  height: 40px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.primary_reset {
  width: 96px;
  height: 40px;
  background: rgba(233, 243, 255, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
</style>
