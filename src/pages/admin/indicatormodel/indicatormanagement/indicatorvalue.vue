<template>
  <el-row style="height:100%"
          class="EPF-table"
          id="indicatorvalue">
    <el-col :span="5"
            style="height:100%; padding:15px;box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);">
      <controllerResource :data="data5"
                          :EPFDefaultProps="defaultProps"
                          @EPFnodeClick="nodeClick"
                          :EPFdefaultArray="defaultArray"
                          @EPFcheckChange="treeChangeClick"></controllerResource>
    </el-col>
    <el-col :span="19"
            style="height:100%;padding:15px 0 0 15px;">
      <div style="height:100%">
        <el-scrollbar>
          <div class="filter_wrap">
            <div class="switchHeight_box">
              <el-row type="flex">
                <el-col :span="2">
                  <span class="filter_title">关键字</span>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="filterData.name"
                            placeholder="请输入指标名称关键字"
                            :maxlength="50"></el-input>
                </el-col>

                <el-col :span="2">
                  <span class="filter_title">选择区域</span>
                </el-col>
                <el-col :span="4">
                  <el-cascader :props="props"
                               clearable
                               v-model="areaSelectedOptions"
                               @change="handleAreaChange"></el-cascader>
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
                <el-col :span="3">
                  <div class="primary_search"
                       @click="myExport()">指标值导出</div>
                </el-col>
                <el-col :span="3">
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
                    <div class="primary_search">指标值导入</div>
                  </el-upload>
                </el-col>

              </el-row>
              <div class="dictionary">
                <el-row>
                  <el-col :span="2">管控类型</el-col>
                  <span v-for="(item,index) in dictionary.index_manage_controltype"
                        :class="{'all':item.id==currentID1}"
                        @click="searchList1(item)"
                        :key="index">{{item.zhCn}}</span>
                </el-row>
                <el-row>
                  <el-col :span="2">传导方式</el-col>
                  <span v-for="(item,index) in dictionary.index_manage_conductionmode"
                        :class="{'all':item.id==currentID2}"
                        @click="searchList2(item)"
                        :key="index">{{item.zhCn}}</span>
                </el-row>
                <el-row>
                  <el-col :span="2">上报类型</el-col>
                  <span v-for="(item,index) in dictionary.index_manage_reporttype"
                        :class="{'all':item.id==currentID3}"
                        @click="searchList3(item)"
                        :key="index">{{item.zhCn}}</span>
                </el-row>
              </div>
            </div>

            <el-table :data="tabelData"
                      style="width: 100%;margin-top:20px"
                      border
                      v-loading="loading"
                      v-if="!loading">
              <el-table-column type="selection"
                               width="50"></el-table-column>

              <el-table-column label="指标分类"
                               min-width="120">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.sortName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="指标名称"
                               min-width="160">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="行政区域"
                               min-width="150">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.cantonProvinceName }}</span>
                  <span hit
                        size="medium">{{ scope.row.cantonCityName }}</span>
                  <span hit
                        size="medium">{{ scope.row.cantonAreaName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位"
                               min-width="100">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.unit }}</span>
                </template>
              </el-table-column>
              <el-table-column label="标准值"
                               min-width="100"
                               v-if="arr3.length">
                <el-table-column v-for="(item,index) in arr3"
                                 :label="item"
                                 min-width="100"
                                 :key="index">
                  <template slot-scope="scope">
                    <span :key="key">{{scope.row.standardsValue.get(item)}}</span>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column label="阙值"
                               min-width="100"
                               v-if="arr4.length">
                <el-table-column v-for="(item,index) in arr4"
                                 :label="item"
                                 min-width="100"
                                 :key="index">
                  <template slot-scope="scope">
                    <span :key="key">{{scope.row.thresholdValue.get(item)}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="监测值"
                               min-width="100"
                               v-if="arr1.length">
                <el-table-column v-for="(item,index) in arr1"
                                 :label="item"
                                 min-width="100"
                                 :key="index">
                  <template slot-scope="scope">
                    <span :key="key">{{scope.row.detectionValue.get(item)}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="规划值"
                               min-width="100"
                               v-if="arr2.length">
                <el-table-column v-for="(item,index) in arr2"
                                 :label="item"
                                 min-width="100"
                                 :key="index">
                  <template slot-scope="scope">
                    <span :key="key">{{scope.row.planningValue.get(item)}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="管控类型"
                               min-width="150">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.controlTypeName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="传导方式"
                               min-width="150">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.conductionModeName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="上报类型"
                               min-width="150">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.reportTypeName }}</span>
                </template>
              </el-table-column>

              <el-table-column fixed="right"
                               label="操作"
                               min-width="190"
                               align="center">
                <template slot-scope="scope">
                  <span class="list-style: none;">
                    <!-- v-if="button.resourceId=='cjgs_editinfo'&&scope.row.status=='0'" -->
                    <el-button @click="pushTo(scope.row)"
                               type="text"
                               v-if="!configuration">指标值录入</el-button>
                    <el-button v-else
                               type="text">指标值录入</el-button>
                  </span>
                </template>
              </el-table-column>
            </el-table>

            <el-table :data="tabelData"
                      style="width: 100%;margin-top:20px"
                      border
                      v-loading="loading"
                      v-show="loading">
              <el-table-column type="selection"
                               width="40"></el-table-column>

              <el-table-column label="指标分类"
                               min-width="120">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.sortName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="指标名称"
                               min-width="160">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="行政区域"
                               min-width="150">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.cantonProvinceName }}</span>
                  <span hit
                        size="medium">{{ scope.row.cantonCityName }}</span>
                  <span hit
                        size="medium">{{ scope.row.cantonAreaName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位"
                               min-width="100">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.unit }}</span>
                </template>
              </el-table-column>
              <el-table-column label="标准值"
                               min-width="100"
                               v-if="arr3.length">
                <el-table-column v-for="(item,index) in arr3"
                                 :label="item"
                                 min-width="100"
                                 :key="index">
                  <template slot-scope="scope">
                    <span :key="key">{{scope.row.standardsValue.get(item)}}</span>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column label="阙值"
                               min-width="100"
                               v-if="arr4.length">
                <el-table-column v-for="(item,index) in arr4"
                                 :label="item"
                                 min-width="100"
                                 :key="index">
                  <template slot-scope="scope">
                    <span :key="key">{{scope.row.thresholdValue.get(item)}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="监测值"
                               min-width="100"
                               v-if="arr1.length">
                <el-table-column v-for="(item,index) in arr1"
                                 :label="item"
                                 min-width="100"
                                 :key="index">
                  <template slot-scope="scope">
                    <span :key="key">{{scope.row.detectionValue.get(item)}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="规划值"
                               min-width="100"
                               v-if="arr2.length">
                <el-table-column v-for="(item,index) in arr2"
                                 :label="item"
                                 min-width="100"
                                 :key="index">
                  <template slot-scope="scope">
                    <span :key="key">{{scope.row.planningValue.get(item)}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="管控类型"
                               min-width="150">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.controlTypeName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="传导方式"
                               min-width="150">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.conductionModeName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="上报类型"
                               min-width="150">
                <template slot-scope="scope">
                  <span hit
                        size="medium">{{ scope.row.reportTypeName }}</span>
                </template>
              </el-table-column>

              <el-table-column fixed="right"
                               label="操作"
                               min-width="190"
                               align="center">
                <template slot-scope="scope">
                  <span class="list-style: none;">
                    <!-- v-if="button.resourceId=='cjgs_editinfo'&&scope.row.status=='0'" -->
                    <el-button @click="pushTo(scope.row)"
                               type="text"
                               v-if="!configuration">指标值录入</el-button>
                    <el-button v-else
                               type="text">指标值录入</el-button>
                  </span>
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

    <div v-if="configuration"
         v-drag
         id="addIndexValue">
      <el-row class="dialogHeader drag-title">
        <el-col :span="6"
                style="font-size:18px;">指标值录入</el-col>
        <el-col :span="6"
                justify="end"
                :push="12"
                style="text-align:right">
          <i class="el-icon-close"
             @click="myClose()"
             style="font-size:20px;cursor:pointer;color:#fff"></i>
        </el-col>
      </el-row>

      <div style="height:350px">
        <el-scrollbar>
          <div class="dialogBody">
            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">指标名称：</span>
              </el-col>
              <el-col :span="8">
                <span class="filter_title center">{{imIndexValueData.name}}</span>
              </el-col>

              <el-col :span="4">
                <span class="filter_title">单位：</span>
              </el-col>
              <el-col :span="8">
                <span class="filter_title center">{{imIndexValueData.unit}}</span>
              </el-col>
            </el-row>

            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">监测值：</span>
              </el-col>
              <el-col :span="20">
                <el-col :span="8"
                        class="myCol"
                        v-for="(item,index ) in imIndexValueArr1"
                        :key="index">
                  <el-col :span="12">
                    <el-input-number v-model="item.year"
                                     size="small"
                                     controls-position="right"
                                     @change="handleChange"
                                     :min="2000"
                                     :max="3000"></el-input-number>
                  </el-col>
                  <el-col :span="9">
                    <el-input v-model="item.detectionValue"
                              placeholder
                              :maxlength="50"></el-input>
                  </el-col>
                  <el-col :span="1"
                          class="myCol">
                    <span class="filter_title dialogFilter">
                      <i class="el-icon-remove-outline addIcon"
                         @click="sub(index,1)"></i>
                    </span>
                  </el-col>
                </el-col>
                <el-col :span="1"
                        class="myCol">
                  <span class="filter_title dialogFilter">
                    <i class="el-icon-circle-plus-outline addIcon"
                       @click="xinzengClick(1)"></i>
                  </span>
                </el-col>
              </el-col>
            </el-row>

            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">标准值：</span>
              </el-col>
              <el-col :span="20">
                <el-col :span="8"
                        class="myCol"
                        v-for="(item,index ) in imIndexValueArr3"
                        :key="index">
                  <el-col :span="12">
                    <el-input-number v-model="item.year"
                                     size="small"
                                     controls-position="right"
                                     @change="handleChange"
                                     :min="2000"
                                     :max="3000"></el-input-number>
                  </el-col>
                  <el-col :span="9">
                    <el-input v-model="item.standardsValue"
                              placeholder
                              :maxlength="50"></el-input>
                  </el-col>
                  <el-col :span="1"
                          class="myCol">
                    <span class="filter_title dialogFilter">
                      <i class="el-icon-remove-outline addIcon"
                         @click="sub(index,3)"></i>
                    </span>
                  </el-col>
                </el-col>
                <el-col :span="1"
                        class="myCol">
                  <span class="filter_title dialogFilter">
                    <i class="el-icon-circle-plus-outline addIcon"
                       @click="xinzengClick(3)"></i>
                  </span>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">规划值：</span>
              </el-col>
              <el-col :span="20">
                <el-col :span="8"
                        class="myCol"
                        v-for="(item,index ) in imIndexValueArr2"
                        :key="index">
                  <el-col :span="12">
                    <el-input-number v-model="item.year"
                                     size="small"
                                     controls-position="right"
                                     @change="handleChange"
                                     :min="2000"
                                     :max="3000"></el-input-number>
                  </el-col>
                  <el-col :span="9">
                    <el-input v-model="item.planningValue"
                              placeholder
                              :maxlength="50"></el-input>
                  </el-col>
                  <el-col :span="1"
                          class="myCol">
                    <span class="filter_title dialogFilter">
                      <i class="el-icon-remove-outline addIcon"
                         @click="sub(index,2)"></i>
                    </span>
                  </el-col>
                </el-col>
                <el-col :span="1"
                        class="myCol">
                  <span class="filter_title dialogFilter">
                    <i class="el-icon-circle-plus-outline addIcon"
                       @click="xinzengClick(2)"></i>
                  </span>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">阙值：</span>
              </el-col>
              <el-col :span="20">
                <el-col :span="8"
                        class="myCol"
                        v-for="(item,index ) in imIndexValueArr4"
                        :key="index">
                  <el-col :span="12">
                    <el-input-number v-model="item.year"
                                     size="small"
                                     controls-position="right"
                                     @change="handleChange"
                                     :min="2000"
                                     :max="3000"></el-input-number>
                  </el-col>
                  <el-col :span="9">
                    <el-input v-model="item.thresholdValue"
                              placeholder
                              :maxlength="50"></el-input>
                  </el-col>
                  <el-col :span="1"
                          class="myCol">
                    <span class="filter_title dialogFilter">
                      <i class="el-icon-remove-outline addIcon"
                         @click="sub(index,4)"></i>
                    </span>
                  </el-col>
                </el-col>
                <el-col :span="1"
                        class="myCol">
                  <span class="filter_title dialogFilter">
                    <i class="el-icon-circle-plus-outline addIcon"
                       @click="xinzengClick(4)"></i>
                  </span>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title dialogFilter">指标说明：</span>
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
                          v-model="imIndexValueData.text"></el-input>
              </el-col>
            </el-row>
          </div>
        </el-scrollbar>
      </div>
      <el-row style="text-align:center"
              class="myRow">
        <div class="EPFButton EFPreset"
             @click="configuration=false">取 消</div>
        <div class="EPFButton EFPcommon"
             @click="save()">保 存</div>
      </el-row>

      <!-- <el-button @click="picture = false">取 消</el-button>
      <el-button type="primary" @click="addPictureEnter()">保 存</el-button>-->
    </div>
  </el-row>
</template>

<script>
import axios from 'axios'
import controllerResource from '../../onemap/controller/controllerResourceCommon'
import areaSelect from '../../../../assets/js/areaCascader'
export default {
  name: 'indicatorvalue',
  mixins: [areaSelect],
  data () {
    return {
      arr1: [],
      arr2: [],
      arr3: [],
      arr4: [],
      radio: {},
      key: 0,
      configuration: false,

      tabelData: [],

      filterData: {
        cantonProvince: '',
        cantonCity: '',
        cantonArea: '',
        orgName: ''
      },

      pictureFilterData: {},
      //  表格数据

      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      addIng: true,
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
        'administrative_regions',
        'index_manage_conductionmode',
        'index_manage_controltype',
        'index_manage_reporttype'
      ], // 字典码请求
      dictionary: {
        // 字典码结果
        administrative_regions: '',
        index_manage_conductionmode: '',
        index_manage_controltype: '',
        index_manage_reporttype: '',
        cantonCity: '',
        cantonArea: ''
      },

      dicNum: 0,
      num: 0,
      loading: false,
      params: {},
      imIndexValueArr1: [],
      imIndexValueArr2: [],
      imIndexValueArr3: [],
      imIndexValueArr4: [],
      imIndexValueData: {},
      currentID1: '',
      currentID2: '',
      currentID3: '',
      imIndexValueList: [],
      monitorList: [],
      planList: [],
      href: '/api/epf-index-model/imindexmanage/exportIndexValueExcel?',
      activeData: {}
    }
  },
  components: { controllerResource },
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
    this.getTreeAdmin()
    this.getList()

    this.getOrg()
  },
  methods: {
    xinzengClick (key) {
      if (key == 1) {
        let pushDataYear = this.imIndexValueArr1[
          this.imIndexValueArr1.length - 1
        ]
          ? this.imIndexValueArr1[this.imIndexValueArr1.length - 1].year + 1
          : 2019
        this.imIndexValueArr1.push({
          year: '2020',
          detectionValue: '0'
        })
      }
      if (key == 2) {
        this.imIndexValueArr2.push({
          year: '2020',
          planningValue: '0'
        })
      }
      if (key == 3) {
        this.imIndexValueArr3.push({
          year: '2020',
          standardsValue: '0'
        })
      }
      if (key == 4) {
        this.imIndexValueArr4.push({
          year: '2020',
          thresholdValue: '0'
        })
      }
    },
    sub (index, key) {
      if (key == 1) {
        this.imIndexValueArr1.splice(index, 1)
      }
      if (key == 2) {
        this.imIndexValueArr2.splice(index, 1)
      }
      if (key == 3) {
        this.imIndexValueArr3.splice(index, 1)
      }
      if (key == 4) {
        this.imIndexValueArr4.splice(index, 1)
      }
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
    myExport () {
      this.href = '/api/epf-index-model/imindexmanage/exportIndexValueExcel?'

      let { page, rows, ...key } = this.params
      let hrefParams = this.urlEncode(key).slice(1)
      this.href = this.href + hrefParams
      window.open(this.href)
    },
    save () {
      let arr = JSON.parse(JSON.stringify(this.imIndexValueArr1))
      let arr2 = JSON.parse(JSON.stringify(this.imIndexValueArr2))
      let arr3 = JSON.parse(JSON.stringify(this.imIndexValueArr3))
      let arr4 = JSON.parse(JSON.stringify(this.imIndexValueArr4))
      let arr5 = [...arr, ...arr2, ...arr3, ...arr4]
      let arr6 = []

      let valTemp = {}
      let item
      for (let i = 0; i < arr5.length; i++) {
        item = arr5[i]

        valTemp = arr6.find(e => e.year === item.year)

        if (valTemp) {
          arr6.splice(arr6.indexOf(valTemp), 1)
          valTemp = Object.assign(item, valTemp)
        } else {
          valTemp = item
        }

        arr6.push(valTemp)
      }

      // var arr5 = arr.concat(arr2);
      // arr5.forEach(item => (item.rowFlag = "2"));
      this.imIndexValueData.indexValueJson = JSON.stringify(arr6)
      this.$post(
        '/epf-index-model/imindexmanage/addImIndexValue',
        this.imIndexValueData
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.configuration = false
          this.getList()
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    myClose () {
      this.configuration = false
      this.imIndexValueArr1 = []
      this.imIndexValueArr2 = []
      this.imIndexValueArr3 = []
      this.imIndexValueArr4 = []
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
    searchList () {
      this.pageNo = 1
      this.pageSize = 5

      this.params = this.filterData

      this.getList()
    },
    location_first_photoUploadFile (files) {
      const file = files.file
      const formData = new FormData()
      if (this.activeData.id) {
        formData.append('sortId', this.activeData.id)
      }
      formData.append('file', file)
      this.photoUploadLocation(formData, files, file)
    },
    photoUploadLocation (formData, files, file, count) {
      // 图片上传方法
      const that = this
      this.$useAppend(
        '/epf-index-model/imindexmanage/importIndexValue',
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
    treeClick5 () { },
    treeChangeClick () { },
    // 得到目录树

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
          this.loading = false
          this.tabelData = res.pager.results
          this.pageNo = res.pager.pageNo
          this.pageSize = res.pager.pageSize
          this.totalPage = res.pager.totalPage
          this.totalRecord = res.pager.totalRecord

          this.arr1 = []
          this.arr2 = []
          this.arr3 = []
          this.arr4 = []

          let obj
          let detectionValue
          let planningValue
          let standardsValue
          let thresholdValue
          let imIndexValue
          let imIndexValueYear
          for (var i = 0; i < this.tabelData.length; i++) {
            detectionValue = new Map()
            planningValue = new Map()
            standardsValue = new Map()
            thresholdValue = new Map()
            obj = this.tabelData[i]

            for (var j = 0; j < obj.imIndexValue.length; j++) {
              imIndexValue = obj.imIndexValue[j]
              imIndexValueYear = imIndexValue.year

              if (imIndexValue.detectionValue && !isNaN(imIndexValue.detectionValue)) {
                if (this.arr1.indexOf(imIndexValueYear) === -1) {
                  this.arr1.push(imIndexValueYear)
                }

                detectionValue.set(
                  imIndexValueYear,

                  parseFloat(Number(imIndexValue.detectionValue).toFixed(2))
                )
              }

              if (imIndexValue.planningValue && !isNaN(imIndexValue.detectionValue)) {
                if (this.arr2.indexOf(imIndexValueYear) === -1) {
                  this.arr2.push(imIndexValueYear)
                }

                planningValue.set(
                  imIndexValueYear,
                  parseFloat(Number(imIndexValue.planningValue).toFixed(2))
                )
              }

              if (imIndexValue.standardsValue && !isNaN(imIndexValue.detectionValue)) {
                if (this.arr3.indexOf(imIndexValueYear) === -1) {
                  this.arr3.push(imIndexValueYear)
                }

                standardsValue.set(
                  imIndexValueYear,
                  parseFloat(Number(imIndexValue.standardsValue).toFixed(2))
                )
              }

              if (imIndexValue.thresholdValue && !isNaN(imIndexValue.detectionValue)) {
                if (this.arr4.indexOf(imIndexValueYear) === -1) {
                  this.arr4.push(imIndexValueYear)
                }

                thresholdValue.set(
                  imIndexValueYear,
                  parseFloat(Number(imIndexValue.thresholdValue).toFixed(2))
                )
              }
            }
            this.$set(this.tabelData[i], 'detectionValue', detectionValue)
            this.$set(this.tabelData[i], 'planningValue', planningValue)
            this.$set(this.tabelData[i], 'standardsValue', standardsValue)
            this.$set(this.tabelData[i], 'thresholdValue', thresholdValue)

            // this.tabelData[i].detectionValue = detectionValue;
            // this.tabelData[i].planningValue = planningValue;
            // this.tabelData[i].standardsValue = standardsValue;
            // this.tabelData[i].thresholdValue = thresholdValue;
          }
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    pushTo (item) {
      const that = this
      this.addIng = false
      this.configuration = true
      this.imIndexValueData.id = item.id

      this.imIndexValueData.name = item.name
      this.imIndexValueData.unit = item.unit

      item.imIndexValue.forEach(element => {
        if (element.detectionValue) {
          var obj1 = {
            year: element.year,
            detectionValue: element.detectionValue
          }
          that.imIndexValueArr1.push(obj1)
        }
        if (element.planningValue) {
          var obj2 = {
            year: element.year,
            planningValue: element.planningValue
          }
          that.imIndexValueArr2.push(obj2)
        }
        if (element.standardsValue) {
          var obj3 = {
            year: element.year,
            standardsValue: element.standardsValue
          }

          that.imIndexValueArr3.push(obj3)
        }
        if (element.thresholdValue) {
          var obj4 = {
            year: element.year,
            thresholdValue: element.thresholdValue
          }

          that.imIndexValueArr4.push(obj4)
        }
      })
    },
    handleAreaChange (value) {
      [
        this.filterData.cantonProvince,
        this.filterData.cantonCity,
        this.filterData.cantonArea
      ] = value
    },
    getTreeAdmin () {
      this.$post('/epf-index-model/imindexsort/getImIndexSortTree', {}).then(
        res => {
          if (res.code == '0') {
            this.data5[0].childs = res.result
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },

    showHandle (node) {
      return node.childNodes.length !== 0
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getList()
    },

    nodeClick (item) {
      this.pageNo = 1
      this.activeData = item
      this.params['sortId'] = item.id
      this.getList()
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
  },
  watch: {
    configuration (val) {
      if (!val) {
        this.imIndexValueArr1 = []
        this.imIndexValueArr2 = []
        this.imIndexValueArr3 = []
        this.imIndexValueArr4 = []
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
  text-align: right;
  line-height: 35px;
  color: rgba(48, 48, 48, 1);
  font-weight: 400;
  font-size: 16px;
}
.filter_title.center {
  text-align: center;
}
.filter_wrap {
  box-sizing: border-box;
  height: 100%;
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

.filter_content i {
  cursor: pointer;
  margin-left: 5px;
}

.addIcon {
  font-size: 20px;
  color: #1d7ce4;
  cursor: pointer;
}
.checkbox {
  margin: 5px 20px;
}
#indicatorvalue .myRow {
  margin-top: 15px;
}

#addIndexValue {
  width: 45%;
  background-color: #fff;
  position: absolute;
  top: 25%;
  left: 30%;
  box-shadow: 1px 3px 6px 3px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  z-index: 999;
}
.dialogHeader {
  height: 44px;
  border-radius: 2px 2px 0px 0px;
  line-height: 44px;
  padding: 0 20px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
}
.dialogBody {
  padding: 10px;
}
</style>

<style>
#indicatorvalue .el-upload {
  display: block;
}
#addIndexValue .el-input-number--small {
  width: 100%;
}

#addIndexValue .el-scrollbar {
  height: 100%;
}
#addIndexValue .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: auto;
}
#addIndexValue
  .el-input-number.is-controls-right[class*="small"]
  [class*="decrease"],
#addIndexValue
  .el-input-number.is-controls-right[class*="small"]
  [class*="increase"] {
  line-height: 19px;
}
</style>
