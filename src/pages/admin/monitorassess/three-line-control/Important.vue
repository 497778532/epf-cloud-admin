<template>
  <div class="zebra"
       ref="zebra">
    <el-row class="icon__header"
            type="flex"
            align="middle"
            justify>
      <epf-title title="重大项目占用基本农田"></epf-title>
      <div style="margin-left:auto;display:flex;align-items:center">
        <span style="cursor:pointer"
              @click="addDialog=true">
          <img src="@/assets/images/jcpgyj/add.png"
               alt />
        </span>
      </div>
    </el-row>

    <el-row type="flex"
            justify="middle">
      <el-col :span="19">
        <el-input v-model="input"
                  placeholder="请输入项目名称关键词"
                  :maxlength="50"></el-input>
      </el-col>
      <el-col :span="4"
              :offset="1">
        <div class="EPFplain button"
             @click="searchList()">搜索</div>
      </el-col>
    </el-row>
    <el-table :data="listMinData"
              @row-click="toDetail"
              style="width: 100%;margin-top:16px"
              :fit="false"
              stripe>
      <el-table-column label="项目名称"
                       show-overflow-tooltip
                       min-width="160">
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="占用面积"
                       min-width="70"
                       show-overflow-tooltip
                       align="center">
        <template slot-scope="scope">
          <span @click="closeDialog=true"
                style="color:rgba(89,89,89,1)">{{ scope.row.occupyArea }}</span>
        </template>
      </el-table-column>>

      <el-table-column label="状态"
                       min-width="120"
                       align="center">

        <template slot-scope="scope">
          <span v-if="scope.row.status===0">待审查</span>
          <span v-if="scope.row.status===1">审核通过</span>
          <span v-if="scope.row.status===2">审核不通过</span>
          <span @click.stop="deleted(scope.row)"
                style="cursor:pointer">删除</span>
        </template>
      </el-table-column>>
    </el-table>

    <div style="text-align:right;margin:8px 0px;margin-top:15px;">
      <el-pagination small
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     layout="prev, pager, next"
                     :total="totalRecord"></el-pagination>
    </div>

    <result @closeDialog="close"
            v-if="resultDialog"
            :tableData="tableData"
            :tableList="tableList"></result>
    <projects v-if="addDialog"
              @close="myProjectsClose"
              @save="addSuccess"></projects>
  </div>
</template>

<script>
import axios from 'axios'
import shp from 'shpjs'
import { mapState, mapMutations } from 'vuex'
import Result from './Result'
import Projects from './ProjectsAdd'
export default {
  props: {
    area: {
      type: Object,
      default: function () {
        return {
          cantonProvince: '440000',
          cantonCity: '',
          cantonArea: ''
        }
      }
    },
    problem: {
      type: Boolean,
      default: function () {
        false
      }
    }
  },
  data () {
    return {
      addDialog: false,
      resultDialog: false,
      filterData: {
        projectName: ''
      },
      problemResult: false,
      inputSearch: true,
      yearSum: {},
      listMinParams: {},
      listMinData: [],
      tableData: [],
      tableList: [],
      audit: false,
      projectsVisibility: false,
      landVisibility: false,
      detail: false,
      // data: [{ name: "哈哈" }, {}, {}, {}, {}],
      show4: true,
      show5: true,
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      detailData: {
        projectName: ''
      },
      input: ''
    }
  },

  methods: {
    deleted (item) {
      this.$get('/epf-monitor-evaluation/mproject/delete', {
        id: item.id
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.findListMin()
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    close () {
      this.resultDialog = false
    },

    searchList () {
      this.listMinParams['projectName'] = this.input
      this.findListMin()
      // this.inputSearch = true
    },
    closeProblem () {
      this.$emit('close')
    },
    toDetail (item) {
      this.resultDialog = true
      let me = this
      me.tableData = []
      me.$get('/epf-monitor-evaluation/mproject/files/findByProjectId', {
        projectId: item.id,
        documentType: 2
      }).then(res => {
        if (res.code === 0) {
          if (res.result.length > 0) {
            axios
              .get('/api/epf-document/document/downloadById', {
                params: { id: res.result[0].documentId },
                responseType: 'arraybuffer'
              })
              .then(buffer => {
                shp(buffer).then(function (geojson) {
                  geojson.features.forEach(element => {
                    var dataRow = element.properties
                    dataRow.GEOM = element.geometry
                    me.tableData.push(dataRow)
                  })
                }).catch(function (err) {
                  me.$message.error('范围文件解析错误:文件结构错误或不支持的坐标系')
                })
              })
          } else {
            me.$message.error('范围文件不存在')
          }
        } else {
          me.$message.error(res.msg)
          return
        }
      })

      this.$get('/epf-monitor-evaluation/mproject/getDetailsById', {
        id: item.id
      }).then(res => {
        if (res.code === 0) {
          let data = res.result
          let occupy = {
            title: '占用',
            area: data.occupyArea,
            num: data.occupyPlotNum,
            avgquality: data.occupyAvgQuality,
            qualityLand: data.qualityLand,
            higher: data.occupyHigher,
            Inferior: data.occupyInferior
          }
          let makeUp = {
            title: '补化',
            area: data.makeUpArea,
            num: data.makeUpPlotNum,
            avgquality: data.makeUpAvgQuality,
            qualityLand: data.makeUpQualityLand,
            higher: data.makeUpHigher,
            Inferior: data.makeUpInferior
          }

          let result = {
            title: '对比结果',
            area: this.reg(occupy.area, makeUp.area),
            num: this.reg(occupy.num, makeUp.num),
            avgquality: this.reg(makeUp.avgquality, occupy.avgquality),
            qualityLand: this.reg(occupy.qualityLand, makeUp.qualityLand),
            higher: this.reg(occupy.makeUpHigher, makeUp.makeUpHigher),
            Inferior: this.reg(makeUp.makeUpInferior, occupy.makeUpInferior)
          }

          this.tableList = [occupy, makeUp, result]
          console.log(this.tableList)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    reg (data1, data2) {
      if (!data1 || !data2) {
        return ''
      }
      return data1 - data2 > 0 ? '异常' : '正常'
    },
    land () {
      this.landVisibility = true
    },
    myClose () {
      this.landVisibility = false
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.findListMin()
    },

    handleCurrentChange (val) {
      this.pageNo = val
      this.findListMin()
    },
    findListMin () {
      let params = this.listMinParams
      params['year'] = this.year
      params = Object.assign(params, this.area)
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-monitor-evaluation/mproject/findListMin', params).then(
        res => {
          if (res.code === 0) {
            this.listMinData = res.pager.results
            this.pageNo = res.pager.pageNo
            this.pageSize = res.pager.pageSize
            this.totalPage = res.pager.totalPage
            this.totalRecord = res.pager.totalRecord
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    myAudit () {
      this.audit = true
    },
    myAuditClose () {
      this.audit = false
    },
    myProjectsClose () {
      this.addDialog = false
    },
    findYearSum () {
      let params = {}
      params['year'] = this.year
      params = Object.assign(params, this.area)
      this.$get('/epf-monitor-evaluation/mproject/findYearSum', params).then(
        res => {
          console.log(res)
          if (res.code == '0') {
            this.yearSum = res.result
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },

    addSuccess () {
      this.findListMin()
    }

  },
  mounted () { },
  components: { Result, Projects },
  created () {
    this.findYearSum()
    this.findListMin()
  },
  computed: {
    ...mapState('jcpgyj', ['year']),
    tuban () {
      switch (this.year) {
        case '2014':
          return 0
          break

        case '2015':
          return 0
          break
        case '2016':
          return 0
          break
        case '2017':
          return 0
          break
        case '2018':
          return 0
          break
        case '2019':
          return 5.2
          break
        case '2020':
          return 0
          break
      }
    }
  },
  watch: {
    year (val) {
      this.findYearSum()
      this.findListMin()
    },
    area: {
      handler (newName, oldName) {
        this.findYearSum()
        this.findListMin()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.button {
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
}
</style>

<style>
@import "../monitoring-project-stock/icon-Mode/index";
</style>
