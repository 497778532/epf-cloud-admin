<template>
  <div style="height:100%"
       class="EPF-table"
       id="indicatorbase">
    <el-row style="height:100%">
      <el-col :span="5"
              style="height:100%; padding:15px;  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);">
        <controllerResource :data="data5"
                            :EPFDefaultProps="defaultProps"
                            @EPFnodeClick="nodeClick"
                            :EPFdefaultArray="defaultArray"></controllerResource>
      </el-col>
      <el-col :span="19"
              style="height:100%;padding:15px 0 0 15px; ">
        <div style="height:100%;">
          <el-scrollbar style="height:100%">
            <div class="filter_wrap">
              <!-- 搜索 -->
              <div class="switchHeight_box">
                <el-row>
                  <el-col :span="2">
                    <span class="filter_title">关键字</span>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="filterData.name"
                              placeholder="请输入指标名称关键字"
                              :maxlength="50"></el-input>
                  </el-col>

                  <el-col :span="3">
                    <span class="filter_title">选择区域</span>
                  </el-col>
                  <el-col :span="4">
                    <el-cascader :props="props"
                                 clearable
                                 v-model="areaSelectedOptions"
                                 @change="handleChange"></el-cascader>
                  </el-col>
                  <el-col :span="2">
                    <div class="primary_reset"
                         @click="resetFilter()">重置</div>
                  </el-col>
                  <el-col :span="2">
                    <div class="primary_search"
                         @click="searchList()">搜索</div>
                  </el-col>
                  <el-col :span="2">
                    <div class="primary_search"
                         @click="dialogVisible=true">新增指标</div>
                  </el-col>
                  <el-col :span="2">
                    <el-upload action="http://192.168.1.200:8081/epf-document/document/upload/"
                               ref="photoUploaderOne"
                               multiple
                               accept=".xlsx"
                               :http-request="location_first_photoUploadFile"
                               :on-preview="location_handlePictureCardPreview"
                               :on-remove="location_file_List_Remove"
                               :before-upload="location_beforeAvatarUploadImg"
                               :on-success="location_first_UploadSuccess"
                               :on-error="location_upLoadError"
                               :file-list="filterData.locationFileList"
                               :show-file-list="false">
                      <div class="primary_search">导入指标</div>
                    </el-upload>
                  </el-col>
                  <el-col :span="2">
                    <div class="primary_search"
                         @click="myExport()">导出指标</div>
                  </el-col>
                </el-row>
                <div class="dictionary">
                  <el-row>
                    <el-col :span="2">管控类型</el-col>
                    <span v-for="(item,index) in searchParams1"
                          :class="{'all':item.id==currentID1}"
                          @click="searchList1(item)"
                          :key="index">{{item.zhCn}}</span>
                  </el-row>
                  <el-row>
                    <el-col :span="2">传导方式</el-col>
                    <span v-for="(item,index) in searchParams2"
                          :class="{'all':item.id==currentID2}"
                          @click="searchList2(item)"
                          :key="index">{{item.zhCn}}</span>
                  </el-row>
                  <el-row>
                    <el-col :span="2">上报类型</el-col>
                    <span v-for="(item,index) in searchParams3"
                          :class="{'all':item.id==currentID3}"
                          @click="searchList3(item)"
                          :key="index">{{item.zhCn}}</span>
                  </el-row>
                </div>
              </div>
              <!-- :span-method="objectSpanMethod" -->
              <el-table :data="data"
                        stripe
                        style="width: 100%;margin-top:20px">

                <el-table-column label="
                        行政区域"
                                 min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.cantonProvinceName }}</span>
                    <span>{{ scope.row.cantonCityName }}</span>
                    <span>{{ scope.row.cantonAreaName }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="指标名称"
                                 min-width="160"
                                 prop="name"
                                 show-overflow-tooltip></el-table-column>

                <el-table-column label="单位"
                                 min-width="100"
                                 prop="unit"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="管控类型"
                                 min-width="150"
                                 prop="controlTypeName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="传导方式"
                                 min-width="150"
                                 prop="conductionModeName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="上报类型"
                                 min-width="150"
                                 prop="reportTypeName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="指标分类"
                                 min-width="120"
                                 prop="sortName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right"
                                 label="操作"
                                 min-width="250"
                                 align="center">
                  <template slot-scope="scope">
                    <el-button @click="deploy(scope.row)"
                               type="text">计算配置</el-button>
                    <el-button @click="editor(scope.row)"
                               type="text">修改</el-button>
                    <el-button @click="detail(scope.row)"
                               type="text">查看</el-button>
                    <el-button @click="deleted(scope.row)"
                               type="text">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
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
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>

    <indicatorAdd :imIndexManage="allTree"
                  :indicatorDialog="dialogVisible"
                  :dictionaryDialog="dictionary"
                  @dialogclose="myClose"></indicatorAdd>
    <indicatorEditor :imIndexManage="allTree"
                     :editorDataDialog="editorData"
                     :indicatorDialog="editorVisible"
                     :dictionaryDialog="dictionary"
                     @dialogclose="myClose2"></indicatorEditor>
    <indicatorDetail :indiatorData="indiator"
                     :indicatorDialog="detailVisible"
                     :dictionaryDialog="dictionary"
                     @dialogclose="myClose3"></indicatorDetail>
    <div v-if="configuration"
         class="delDialog my-dialog">

      <div class="handelDialog">
        <el-row class="dialogHeader">
          <el-col :span="6"
                  style="font-size:18px;">添加配置</el-col>
          <el-col :span="6"
                  justify="end"
                  :push="12"
                  style="text-align:right">
            <i class="el-icon-close"
               @click="myClose4()"
               style="font-size:20px;cursor:pointer;color:#fff"></i>
          </el-col>
        </el-row>

        <div style="height:300px">
          <el-scrollbar>
            <div style="padding-right:20px">
              <el-row class="myRow">
                <el-col :span="4">
                  <span class="filter_title">指标名称：</span>
                </el-col>
                <el-col :span="4">
                  <span class="filter_title left">{{configurationData.name}}</span>
                </el-col>

                <el-col :span="4">
                  <span class="filter_title">单位：</span>
                </el-col>
                <el-col :span="4">
                  <span class="filter_title left">{{configurationData.unit}}</span>
                </el-col>

                <el-col :span="4">
                  <span class="filter_title">行政区域：</span>
                </el-col>
                <el-col :span="4">
                  <span class="filter_title left">{{configurationData.cantonProvinceName}}</span>
                </el-col>
              </el-row>
              <el-row class="myRow">
                <el-col :span="4">
                  <span class="filter_title">计算方式：</span>
                </el-col>
                <el-col :span="8">
                  <span class="filter_title left">
                    <el-radio-group v-model="configurationData.computeMode">
                      <el-radio label="1">计算服务接口接入</el-radio>
                      <el-radio label="2">手工录入</el-radio>
                    </el-radio-group>
                  </span>
                </el-col>
                <el-col :span="4">
                  <span class="filter_title">生效日期：</span>
                </el-col>
                <el-col :span="8">
                  <el-date-picker v-model="configurationData.effectiveDate"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="选择日期"></el-date-picker>
                </el-col>
              </el-row>
              <el-row class="myRow"
                      v-if="configurationData.computeMode=='2'">
                <el-col :span="4">
                  <span class="filter_title">服务地址：</span>
                </el-col>
                <el-col :span="20">
                  <el-input v-model="configurationData.serviceAddress"
                            placeholder="请输入输入服务地址"
                            :maxlength="50"></el-input>
                </el-col>
              </el-row>

              <el-row v-if="configurationData.computeMode=='2'">
                <el-col :span="4"
                        style="margin-top:15px">
                  <span class="filter_title">指标参数：</span>
                </el-col>
                <el-col :span="20">
                  <el-col :span="6"
                          v-for="(item,index) in arr1"
                          :key="index"
                          style="margin-top:15px">
                    <el-row type="flex"
                            align="middle">
                      <el-col :span="20">
                        <el-input v-model="arr1[index]"
                                  placeholder="请输入指标参数"
                                  :maxlength="50"></el-input>
                      </el-col>
                      <el-col :span="4">
                        <i v-if="index===0"
                           class="el-icon-circle-plus-outline addIcon"
                           @click="add()"></i>
                        <i v-else
                           class="el-icon-remove-outline addIcon"
                           @click="sub()"></i>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-col>
              </el-row>
              <el-row class="myRow">
                <el-col :span="4">
                  <span class="filter_title">指标数值：</span>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="configurationData.indexValue"
                            placeholder="请输入指标数值"
                            :disabled="configurationData.computeMode!=='2'"
                            :maxlength="10"></el-input>
                </el-col>
              </el-row>

              <el-row class="myRow">
                <el-col :span="6">
                  <span class="filter_title"
                        style="font-size:18px,margin-left:10px">空间数据关联设置：</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        style="margin-top:15px">
                  <span class="filter_title">服务接口：</span>
                </el-col>
                <el-col :span="20">
                  <el-col :span="24"
                          v-for="(item,index) in arr2"
                          :key="index"
                          style="margin-top:15px">
                    <el-row type="flex"
                            align="middle">
                      <el-col :span="22">
                        <el-input v-model="arr2[index]"
                                  placeholder="请输入输入接口"
                                  :maxlength="50"></el-input>
                      </el-col>
                      <el-col :span="2">
                        <i v-if="index===0"
                           class="el-icon-circle-plus-outline addIcon"
                           @click="add2()"></i>
                        <i v-else
                           class="el-icon-remove-outline addIcon"
                           @click="sub2()"></i>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="4"
                        style="margin-top:15px">
                  <span class="filter_title">指标参数：</span>
                </el-col>
                <el-col :span="20">
                  <el-col :span="6"
                          v-for="(item,index) in arr3"
                          :key="index"
                          style="margin-top:15px">
                    <el-row type="flex"
                            align="middle">
                      <el-col :span="20">
                        <el-input v-model="arr3[index]"
                                  placeholder="请输入服务参数"
                                  :maxlength="50"></el-input>
                      </el-col>
                      <el-col :span="4">
                        <i v-if="index===0"
                           class="el-icon-circle-plus-outline addIcon"
                           @click="add3()"></i>
                        <i v-else
                           class="el-icon-remove-outline addIcon"
                           @click="sub3()"></i>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-col>
              </el-row>

              <el-row class="myRow">
                <el-col :span="4">
                  <span class="filter_title">指标说明：</span>
                </el-col>
                <el-col :span="5">
                  <span class="filter_title"
                        style="text-align:left">(指标含义及作用)</span>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20"
                        :offset="4">
                  <el-input type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            :maxlength="200"
                            v-model="configurationData.explain"></el-input>
                </el-col>
              </el-row>
            </div>
          </el-scrollbar>
        </div>

        <el-row class="dialogFooter">
          <div class="EPFButton EFPreset"
               @click="configuration=false">取 消</div>
          <div class="EPFButton EFPcommon"
               @click="save()">保 存</div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import controllerResource from '../../onemap/controller/controllerResourceCommon'

import indicatorAdd from './indicatorAdd'
import indicatorEditor from './indicatorEditor'
import indicatorDetail from './indicatorDetail'
import areaSelect from '../../../../assets/js/areaCascader'

export default {
  name: 'indicatorbase',
  mixins: [areaSelect],
  data () {
    return {
      arr1: [''],
      arr2: [''],
      arr3: [''],
      editorData: {},
      editorVisible: false,
      detailVisible: false,
      configuration: false,
      checkedCities: [],
      classification: [],
      allTree: [],
      radio: 0,
      myClassification: [],
      num: 2018,
      innerVisible: false,

      currentID1: '',
      currentID2: '',
      currentID3: '',
      dialogVisible: false,
      data: [],
      configurationData: {},
      imIndexValue: [],
      children: [],
      filterData: {
        orgId: '',
        name: ''
      },
      href: '/api/epf-index-model/imindexmanage/exportIndexExcel?',
      pictureFilterData: {},
      //  表格数据

      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      addParams: {},
      defaultArray: [],
      data5: [
        {
          id: '',
          name: '国土空间规划指标体系',
          childs: [],
          levels: 1
        }
      ],
      defaultProps: {
        children: 'childs',
        label: 'name',
        isLeaf: 'isLeaf'
      },
      dicRequest: [
        'cantonCity',
        'index_manage_conductionmode',
        'index_manage_controltype',
        'index_manage_reporttype',
        'index_manage_status'
      ], // 字典码请求
      dictionary: {
        // 字典码结果
        cantonCity: '',
        index_manage_conductionmode: '',
        index_manage_controltype: '',
        index_manage_reporttype: '',
        index_manage_status: '',
        administrative_regions: [
          { id: '440000', dictKey: '440000', zhCn: '广东省' }
        ],
        cantonArea: ''
      },
      dicNum: 0,
      spanArr: [],
      params: {},
      myImIndexValue: [],
      indiator: {},
      configurationData: {
        indexId: '',
        status: '',
        computeMode: '',
        indexValue: '',
        serviceAddress: '',
        parameter: '123',
        statusName: '',
        status: '',
        effectiveDate: '',
        searchParams1: [],
        searchParams2: [],
        searchParams3: []
      },
      activeData: {}
    }
  },
  components: {
    controllerResource,
    indicatorAdd,
    indicatorEditor,
    indicatorDetail
  },
  created () {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == 'cantonCity') {
          this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
            parentId: '440000'
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
        this.dictionary[item] = dicArr[this.dicNum]

        this.dicNum++
      }
      this.dictionary.administrative_regions = [
        {
          dictKey: '440000',
          zhCn: '广东省',
          id: '440000'
        }
      ]

      this.searchParams1 = JSON.parse(
        JSON.stringify(this.dictionary.index_manage_controltype)
      )
      this.searchParams2 = JSON.parse(
        JSON.stringify(this.dictionary.index_manage_conductionmode)
      )
      this.searchParams3 = JSON.parse(
        JSON.stringify(this.dictionary.index_manage_reporttype)
      )
      this.searchParams1.unshift({
        id: '',
        dictKey: '',
        zhCn: '全部'
      })
      this.searchParams2.unshift({
        id: '',
        dictKey: '',
        zhCn: '全部'
      })
      this.searchParams3.unshift({
        id: '',
        dictKey: '',
        zhCn: '全部'
      })
    })

    this.getTreeAdmin()
    this.getList()
    this.getOrg()
  },

  mounted () { },
  watch: {},
  methods: {
    save () {
      this.configurationData.serviceUrl = this.arr2.join(',')
      this.configurationData.serviceParameter = this.arr3.join(',')
      console.log(this.configurationData)
      this.$post(
        '/epf-index-model/imindexmanage/editComputeConf',
        this.configurationData
      ).then(res => {
        if (res.code == '0') {
          this.configuration = false
          this.getList()
          this.$message.success(res.msg) // 失败
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    add () {
      this.arr1.push('')
    },
    sub (index) {
      this.arr1.splice(index, 1)
    },
    add2 () {
      this.arr2.push('')
    },
    sub2 (index) {
      this.arr2.splice(index, 1)
    },

    add3 () {
      this.arr3.push('')
    },
    sub3 (index) {
      this.arr3.splice(index, 1)
    },
    myExport () {
      this.href = '/api/epf-index-model/imindexmanage/exportIndexExcel?'
      let hrefParams = this.urlEncode(this.params).slice(1)
      this.href = this.href + hrefParams
      window.open(this.href)
    },
    urlEncode (param, key, encode) {
      if (param == null) return ''
      var paramStr = ''
      var t = typeof param
      if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr
          += '&'
          + key
          + '='
          + (encode == null || encode ? encodeURIComponent(param) : param)
      } else {
        for (var i in param) {
          var k
            = key == null
              ? i
              : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
          paramStr += this.urlEncode(param[i], k, encode)
        }
      }
      return paramStr
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (this.spanArr[rowIndex]) {
          return {
            rowspan: this.spanArr[rowIndex],
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    getList (val) {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get(
        '/epf-index-model/imindexmanage/getIndexManageList',
        params
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.data = res.pager.results
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
    detail (val) {
      this.detailVisible = true

      if (val.year) {
        val.year = val.year.split(',')
      } else {
        val.year = []
      }
      if (val.provinceGroupId === 'TRUE') {
        val.belong = '1'
      } else {
        val.belong = '2'
      }

      this.indiator = val
    },
    deploy (val) {
      this.configuration = true
      this.configurationData.name = val.name
      this.configurationData.unit = val.unit
      this.configurationData.indexId = val.id
      this.configurationData.status = val.status
      this.configurationData.statusName = val.statusName
      this.configurationData.effectiveDate = val.effectiveDate || ''
      this.configurationData.computeMode = val.computeMode
      this.configurationData.serviceAddress = val.address
      this.configurationData.indexValue = val.indexValue
      this.configurationData.explain = val.explain
      this.configurationData.cantonProvinceName
        = val.cantonProvinceName + val.cantonCityName + val.cantonAreaName

      if (val.parameter) {
        this.arr1 = val.parameter.split(',') || []
      }
      if (val.serviceUrl) {
        this.arr2 = val.serviceUrl.split(',') || []
      }
      if (val.serviceParameter) {
        this.arr3 = val.serviceParameter.split(',') || []
      }

      console.log(this.arr3, this.arr2, this.arr1)
    },
    // inTo(arr){

    // arr.forEach((item)=>{
    //   let obj={}
    //   obj.id=
    // })

    //   let obj= {}
    // },
    getTreeAdmin () {
      this.$post('/epf-index-model/imindexsort/getImIndexSortTree', {}).then(
        res => {
          if (res.code == '0') {
            this.data5[0].childs = res.result
            this.getTreeAndData(this.data5, this.allTree)
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    getOrg () {
      let orgId = sessionStorage.getItem('orgId')

      this.$get('/epf-admin/admin/org/getOrg', { id: orgId }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.data5[0].name = res.area + '指标体系'
        }
      })
    },
    getTreeAndData (arr, newArr) {
      var contantArray = newArr
      if (arr && arr.length) {
        for (var i = 0; i < arr.length; i++) {
          this.getTreeAndData(arr[i].childs, contantArray)
          contantArray.push(arr[i])
        }
      }
    },
    myClose (key) {
      this.dialogVisible = false
      if (key == 'f5') {
        this.getList()
      }
    },
    myClose2 (key) {
      this.editorVisible = false
      if (key == 'f5') {
        this.getList()
      }
    },
    myClose3 () {
      this.detailVisible = false
    },
    myClose4 () {
      this.configuration = false
      this.arr1 = ['']
      this.arr2 = ['']
      this.arr3 = ['']
    },
    resetFilter () {
      this.currentID1 = ''
      this.currentID2 = ''
      this.currentID3 = ''
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.params = this.filterData
      this.getList()
    },
    searchList () {
      this.params = this.filterData
      this.pageNo = 1
      this.pageSize = 5
      this.getList()
    },
    searchList1 (item) {
      this.pageNo = 1
      this.currentID1 = item.id

      this.filterData['controlType'] = item.dictKey

      this.params = this.filterData

      this.getList()
    },
    searchList2 (item) {
      this.pageNo = 1
      this.currentID2 = item.id

      this.filterData['conductionMode'] = item.dictKey
      this.params = this.filterData
      this.getList()
    },
    searchList3 (item) {
      this.pageNo = 1
      this.currentID3 = item.id
      this.filterData['reportType'] = item.dictKey
      this.params = this.filterData

      this.getList()
    },
    nodeClick (item) {
      this.pageNo = 1
      this.activeData = item
      this.params = this.filterData
      this.filterData.name = ''
      this.params['sortId'] = item.id
      this.getList()
      console.log(this.activeData)
    },

    editor (item) {
      this.editorVisible = true
      let data = JSON.parse(JSON.stringify(item))
      if (data.year) {
        data.year = data.year.split(',')
      } else {
        data.year = []
      }

      this.editorData = data
    },
    deleted (item) {
      this.$get('/epf-index-model/imindexmanage/deleteImIndexManage', {
        id: item.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.getList()
          this.$message.success(res.msg) // 失败
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    showHandle (node) {
      return node.childNodes.length !== 0
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
    location_first_photoUploadFile (files) {
      const file = files.file
      const formData = new FormData()

      formData.append('file', file)

      if (this.activeData.id) {
        formData.append('sortId', this.activeData.id)
      }
      this.photoUploadLocation(formData, files, file)
    },
    photoUploadLocation (formData, files, file, count) {
      // 图片上传方法
      const that = this
      this.$useAppend(
        '/epf-index-model/imindexmanage/importIndex',
        formData,
        function (event) {
          // 进度条
          file.percent = (event.loaded / event.total) * 100
          files.onProgress(file)
        }
      ).then(res => {
        if (res.message != '上传成功') {
          this.$message.error(res.message)
          return null
        }
        this.$message.success(res.message)

        files.onSuccess(res)
      })
    },
    location_handlePictureCardPreview (file) {
      this.locationDialogImageUrl = file.url
      this.locationDialogVisible = true
    },
    location_file_List_Remove (file, fileList) { },
    location_beforeAvatarUploadImg (file) {
      const isLt50M = file.size / 1024 / 1024 < 50

      if (!isLt50M) {
        this.$message.error('上传土地照片大小不能超过 50MB!')
        return false
      }
    },
    location_first_UploadSuccess (res, file, fileList) {
      this.getList()
    },
    location_upLoadError (err, file, fileList) {
      // 上传失败回调
      this.$message.error('文件上传失败')
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

    provinceSelect (dic, cantonCode, event) {
      this.filterData.cantonAreaName = ''
      this.filterData.cantonArea = ''
      this.cantonArea = ''
      this.filterData.cantonCityName = ''
      this.filterData.cantonCity = ''
      this.cantonCity = ''
      let pId = this.$refs[cantonCode][0].$attrs.id
      this.filterData.ownArea = this.$refs[cantonCode][0].$attrs.dictKey

      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList

          return
        }
        this.dictionary.cantonCity = ''
      })
    },
    citySelect (dic, cantonCity, event) {
      this.filterData.cantonArea = ''
      this.filterData.cantonAreaName = ''
      this.cantonArea = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
      this.filterData.ownArea = this.$refs[cantonCity][0].$attrs.dictKey
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList

          return
        }
        this.dictionary.cantonArea = ''
      })
    },
    areaSelect (dic, cantonCity, event) {
      this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.dictKey
    },
    handleChange (value) {
      [
        this.filterData.cantonProvince,
        this.filterData.cantonCity,
        this.filterData.cantonArea
      ] = value
    },
    configurationSelect (dic, statusName, event) {
      this.configurationData.status = this.$refs[statusName][0].$attrs.dictKey
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
  text-align: right;
  line-height: 35px;
  color: rgba(48, 48, 48, 1);
  font-weight: 400;
  font-size: 16px;
}
.filter_title.left {
  text-align: left;
}
.filter_content {
  font-weight: 700;
  line-height: 35px;
  font-size: 16px;
  height: 40px;
  padding: 0 20px;
  line-height: 40px;
  display: inline-block;
  margin-right: 5px;
  color: rgba(0, 0, 0, 1);
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(198, 198, 198, 1);
}
.filter_content i {
  cursor: pointer;
  margin-left: 5px;
}
.dialogFilter {
  padding-right: 0;
}

.filter_wrap {
  box-sizing: border-box;
  height: 100%;
  padding: 0 15px;
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
  background: rgba(230, 230, 230, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  text-align: right;

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
  padding: 15px;
  border: 1px solid rgba(198, 198, 198, 1);
  line-height: 45px;
  color: rgba(112, 112, 112, 1);
}
.dictionary span {
  margin-left: 25px;
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

>>> .handelDialog {
  width: 45%;
  background-color: #fff;

  border-radius: 2px;
  z-index: 999;
}
>>> .my-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}
>>> .dialogHeader {
  height: 44px;
  border-radius: 2px 2px 0px 0px;
  line-height: 44px;
  padding: 0 20px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
}
>>> .dialogBody {
  padding: 10px;
}
>>> .dialogFooter {
  text-align: center;
  margin-top: 15px;
}

>>> #indicatorbase .el-scrollbar {
  height: 100%;
}
>>> #indicatorbase .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: auto;
}

>>> #indicatorbase .el-date-editor.el-input,
#indicatorbase .el-date-editor.el-input__inner {
  width: 100%;
}

.filter_content i {
  cursor: pointer;
  margin-left: 5px;
}

.addIcon {
  font-size: 20px;
  color: #1d7ce4;
  cursor: pointer;
}
</style>

<style>
#indicatorbase .el-select {
  display: block;
}

#indicatorbase .myRow {
  margin-top: 15px;
}
#indicatorbase .myCol {
  margin-top: 15px;
}
#indicatorbase .el-date-editor.el-input,
#indicatorbase .el-date-editor.el-input__inner {
  width: 100%;
}

.innerDialog .el-checkbox__label {
  font-size: 16px;
}

.innerDialog .el-checkbox__inner {
  border: 1px solid rgba(48, 48, 48, 1);
}
.innerDialog .el-dialog {
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 6px 3px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
}
#indicatorbase .el-input-number--small {
  width: 100%;
}
.el-scrollbar {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: auto;
}
#indicatorbase
  .el-input-number.is-controls-right[class*="small"]
  [class*="decrease"],
#indicatorbase
  .el-input-number.is-controls-right[class*="small"]
  [class*="increase"] {
  line-height: 19px;
}
</style>
