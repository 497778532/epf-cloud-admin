<template>
  <el-row style="height:100%"
          class="EPF-table"
          id="indicatorset"
          type="flex">
    <el-col :span="11"
            style="height:100%; padding:16px 8px 16px 16px"
            id="indicatorsetInput">
      <controllerResource @EPFgetNode="getNode"
                          :searchNode="mysearchNode"
                          @EPFnodeClick="nodeClick"
                          :EPFDefaultProps="defaultProps"
                          :data="data5"
                          :filterText="filterText"
                          :EPFdefaultArray="defaultArray1"
                          style="width:100%;box-shadow:1px 2px 10px 2px rgba(208,208,208,0.5);">
        <template slot="input"
                  slot-scope="scope">
          <div class="treeSearch">
            <el-input placeholder="输入服务关键字进行过滤"
                      suffix-icon="el-icon-search"
                      v-model="filterText"
                      :maxlength="50"></el-input>
          </div>
        </template>
        <template slot="item"
                  slot-scope="scope">
          <el-input ref="sortInput"
                    style="width:60%"
                    v-if="scope.row.add"
                    v-model="enterFilterData.name"
                    placeholder="请在右侧输入信息"
                    @click.stop
                    :maxlength="50"></el-input>
        </template>
        <template slot="handle"
                  slot-scope="scope">
          <div class="currentDiv"
               style="display:inline-block"
               v-if="scope.row===isCurrent&&!scope.row.add">
            <div @click.stop="add('tree',scope.row)">
              <img :src="xzml"
                   alt />
            </div>

            <div v-if="scope.row.id!==0"
                 @click.stop="remove(scope.row,scope.rowNode,$event)">
              <img :src="sc"
                   alt />
            </div>
          </div>
        </template>
      </controllerResource>
    </el-col>
    <el-col :span="13"
            style="height:100%;padding:16px 16px 16px 8px;">
      <div class="filter_wrap">
        <div class="toolsTitleBox">
          <span style="font-size:18px;color:#202020">指标分类信息</span>
        </div>
        <el-scrollbar style="height:calc(100% - 50px);">
          <div class="switchHeight_box2"
               v-show="addIng">
            <div class="tr">
              <div class="firstTd">分类名称：</div>
              <div class="secondTd">
                <el-input v-model="enterFilterData.name"
                          placeholder="请输入授权对象"
                          :disabled="inputDisabled"
                          :maxlength="50"></el-input>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">父节点：</div>
              <div class="secondTd">
                <el-select v-model="enterFilterData.treeName"
                           size="small"
                           placeholder="选择父节点"
                           :disabled="inputDisabled"
                           @change="nodeSelect(allTree,enterFilterData.treeName,$event,'enterFilterData')">
                  <el-option v-for="(item,index) in allTree"
                             :ref="item.name"
                             :id="item.id"
                             :dictKey="item.id"
                             :label="item.name"
                             :value="item.name"
                             :key="index"></el-option>
                </el-select>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">排序：</div>
              <div class="secondTd">
                <el-input-number v-model="enterFilterData.turn"
                                 size="small"
                                 controls-position="right"
                                 @change="handleChange"
                                 :disabled="inputDisabled"></el-input-number>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">行政区域：</div>
              <div class="secondTd">
                <div style="width:25%;float:left;margin-right:5%;">
                  <el-select :disabled="inputDisabled"
                             v-model="enterFilterData.cantonProvinceName"
                             size="small"
                             placeholder="选择省"
                             @change="provinceSelect(dictionary.administrative_regions,enterFilterData.cantonProvinceName,$event,'enterFilterData')">
                    <el-option v-for="item in dictionary.administrative_regions"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="item.dictKey"></el-option>
                  </el-select>
                </div>
                <div style="width:25%;float:left;margin-right:5%;">
                  <el-select v-model="enterFilterData.cantonCityName"
                             size="small"
                             placeholder="选择市"
                             @change="citySelect(dictionary.cantonCity,enterFilterData.cantonCityName,$event,'enterFilterData')"
                             :disabled="inputDisabled">
                    <el-option v-for="item in dictionary.cantonCity"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="item.dictKey"></el-option>
                  </el-select>
                </div>
                <div style="width:25%;float:left;marin-right:5%">
                  <el-select :disabled="inputDisabled"
                             v-model="enterFilterData.cantonAreaName"
                             size="small"
                             placeholder="选择区"
                             @change="areaSelect(dictionary.cantonArea,enterFilterData.cantonAreaName,$event,'enterFilterData')">
                    <el-option v-for="item in dictionary.cantonArea"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="item.dictKey"></el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">指标体系：</div>
              <div class="secondTd">
                <el-checkbox-group v-model="sortType">
                  <el-checkbox class="checkbox"
                               v-for="(item,index) in dictionary.sort_type"
                               :label="item.dictKey"
                               :key="item.dictKey">{{item.zhCn}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">选择年份：</div>
              <div class="secondTd">
                <span class="filter_content"
                      v-for="(item,index) in  year"
                      v-if="item"
                      :key="index ">
                  <template>
                    <span>{{item}}</span>
                    <i class="el-icon-close"
                       @click="deleteYear(index,'1')"></i>
                  </template>
                </span>
                <span>
                  <i class="el-icon-circle-plus-outline addIcon"
                     @click="addYear('1')"></i>
                </span>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">分类说明：</div>
              <div class="secondTd">
                <el-input type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="请输入内容"
                          :maxlength="200"
                          v-model="enterFilterData.description"
                          :disabled="inputDisabled"></el-input>
              </div>
            </div>

            <div class="tr"
                 style="align-items:stretch">
              <div class="firstTd">选择指标：</div>
              <div class="secondTd">

                <span v-for="(item,index) in  myClassification"
                      :key="index"
                      class="filter_content"
                      style="margin-top:15px">
                  <span>{{item.name}}</span>
                  <i class="el-icon-close"
                     @click="deleteIfication(index)"></i>
                </span>
                <span> <i class="el-icon-circle-plus-outline addIcon"
                     @click="innerVisible2=true"></i></span>
              </div>
            </div>

            <div style="text-align:right">
              <div class="EPFButton EFPreset"
                   @click="cancel()">取 消</div>
              <div class="EPFButton EFPcommon"
                   @click="save()">保 存</div>
            </div>
          </div>
          <!-- 搜索 -->
          <div class="switchHeight_box2"
               v-show="!addIng">

            <div class="tr">
              <div class="firstTd">分类名称：</div>
              <div class="secondTd">
                <el-input v-model="imIndexSort.name"
                          placeholder="请输入授权对象"
                          :disabled="inputDisabled"
                          :maxlength="50"></el-input>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">父节点：</div>
              <div class="secondTd">
                <el-select v-model="imIndexSort.treeName"
                           size="small"
                           placeholder="选择父节点"
                           @change="nodeSelect(allTree,imIndexSort.treeName,$event,'imIndexSort')"
                           :disabled="inputDisabled">
                  <el-option v-for="(item,index) in allTree"
                             :ref="item.name"
                             :id="item.id"
                             :dictKey="item.id"
                             :label="item.name"
                             :value="item.name"
                             :key="index"></el-option>
                </el-select>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">排序：</div>
              <div class="secondTd">
                <el-input-number v-model="imIndexSort.turn"
                                 size="small"
                                 controls-position="right"
                                 @change="handleChange"
                                 :disabled="inputDisabled"></el-input-number>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">行政区域：</div>
              <div class="secondTd">
                <div style="width:25%;float:left;margin-right:5%;">
                  <el-select v-model="imIndexSort.cantonProvinceName"
                             size="small"
                             placeholder="选择省"
                             :disabled="inputDisabled"
                             @change="provinceSelect(dictionary.administrative_regions,imIndexSort.cantonProvinceName,$event,'imIndexSort')">
                    <el-option v-for="item in dictionary.administrative_regions"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="item.dictKey"></el-option>
                  </el-select>
                </div>
                <div style="width:25%;float:left;margin-right:5%;">
                  <el-select :disabled="inputDisabled"
                             v-model="imIndexSort.cantonCityName"
                             size="small"
                             placeholder="选择市"
                             @change="citySelect(dictionary.cantonCity,imIndexSort.cantonCityName,$event,'imIndexSort')">
                    <el-option v-for="item in dictionary.cantonCity"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="item.dictKey"></el-option>
                  </el-select>
                </div>
                <div style="width:25%;float:left;marin-right:5%">
                  <el-select v-model="imIndexSort.cantonAreaName"
                             size="small"
                             :disabled="inputDisabled"
                             placeholder="选择区"
                             @change="areaSelect(dictionary.cantonArea,imIndexSort.cantonAreaName,$event,'imIndexSort')">
                    <el-option v-for="item in dictionary.cantonArea"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="item.dictKey"></el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">体系类别：</div>
              <div class="secondTd">
                <el-checkbox-group v-model="sortType2"
                                   :disabled="inputDisabled">
                  <el-checkbox class="checkbox"
                               v-for="(item,index) in dictionary.sort_type"
                               :label="item.dictKey"
                               :key="item.dictKey">{{item.zhCn}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">选择年份：</div>
              <div class="secondTd">
                <span class="filter_content"
                      v-for="(item,index) in  year2"
                      :key="index">
                  <span>{{item}}</span>
                  <i class="el-icon-close"
                     @click="deleteYear(index,'2')"></i>
                </span>
                <span v-if="!inputDisabled">
                  <i class="el-icon-circle-plus-outline addIcon"
                     @click="addYear('2')"></i>
                </span>
              </div>
            </div>

            <div class="tr">
              <div class="firstTd">分类说明：</div>
              <div class="secondTd">
                <el-input :disabled="inputDisabled"
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="请输入内容"
                          :maxlength="200"
                          v-model="imIndexSort.description"></el-input>
              </div>
            </div>

            <div class="tr"
                 style="align-items:stretch">
              <div class="firstTd">选择指标：</div>
              <div class="secondTd">
                <span v-for="(item,index) in  indexList"
                      :key="index"
                      class="filter_content">

                  <span>{{item.name}}</span>
                  <i class="el-icon-close"
                     @click="deleteIfication2(index)"></i>
                </span>
                <span>
                  <i class="el-icon-circle-plus-outline addIcon"
                     @click="innerVisible=true"
                     v-if="!inputDisabled"></i>
                </span>
              </div>
            </div>

            <div style="text-align:center;margin-top:15px">
              <div class="EPFButton EFPreset"
                   @click="cancel()"
                   v-if="!inputDisabled">取 消</div>
              <div class="EPFButton EFPcommon"
                   @click="editor()"
                   v-if="!inputDisabled">保 存</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-col>

    <el-dialog class="innerDialog"
               top="35vh"
               width="30%"
               :visible.sync="innerVisible"
               :modal="false"
               append-to-body
               :show-close="false">
      <template slot="title"
                slot-scope="scope">
        <el-row>
          <el-col :span="6"
                  style="font-size:18px;">选择指标分类</el-col>
          <el-col :span="6"
                  justify="end"
                  :push="12"
                  style="text-align:right">
            <i class="el-icon-close"
               @click="innerVisible=false"
               style="font-size:20px;cursor:pointer;"></i>
          </el-col>
        </el-row>
      </template>
      <div style="height:350px">
        <el-scrollbar>
          <el-checkbox-group v-model="checkedIds"
                             @change="handleCheckedCitiesChange">
            <el-checkbox class="checkbox"
                         v-for="(item,index) in imIndexManageSelect"
                         :label="item.id"
                         :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
    </el-dialog>

    <el-dialog class="innerDialog"
               top="35vh"
               width="30%"
               :visible.sync="innerVisible2"
               :modal="false"
               append-to-body
               :show-close="false">
      <template slot="title"
                slot-scope="scope">
        <el-row>
          <el-col :span="6"
                  style="font-size:18px;">选择指标分类</el-col>
          <el-col :span="6"
                  justify="end"
                  :push="12"
                  style="text-align:right">
            <i class="el-icon-close"
               @click="innerVisible2=false"
               style="font-size:20px;cursor:pointer;"></i>
          </el-col>
        </el-row>
      </template>
      <div style="height:350px">
        <el-scrollbar>
          <el-checkbox-group v-model="myClassification"
                             @change="handleCheckedCitiesChange">
            <el-checkbox class="checkbox"
                         v-for="(item,index) in imIndexManageSelect"
                         :label="item"
                         :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
    </el-dialog>

    <el-dialog class="innerDialog"
               top="25vh"
               width="30%"
               :visible.sync="innerVisible3"
               :modal="false"
               append-to-body
               :show-close="false">
      <template slot="title"
                slot-scope="scope">
        <el-row>
          <el-col :span="6"
                  style="font-size:18px;">选择年份</el-col>
          <el-col :span="6"
                  justify="end"
                  :push="12"
                  style="text-align:right">
            <i class="el-icon-close"
               @click="innerVisible3=false"
               style="font-size:20px;cursor:pointer;"></i>
          </el-col>
        </el-row>
      </template>

      <el-row style="height:350px">
        <el-scrollbar style="height:100%">
          <div style="padding:15px">
            <el-col :span="7"
                    v-for="(item,index) in year"
                    :key="index">
              <el-date-picker v-model="year[index]"
                              type="year"
                              placeholder="选择年"
                              value-format="yyyy"></el-date-picker>
            </el-col>
            <el-col :span="4">
              <i class="el-icon-circle-plus-outline addIcon"
                 @click="pushYear('1')"
                 style="margin-top:5px"></i>
            </el-col>
          </div>
        </el-scrollbar>
      </el-row>
    </el-dialog>

    <el-dialog class="innerDialog"
               top="25vh"
               width="30%"
               :visible.sync="innerVisible4"
               :modal="false"
               append-to-body
               :show-close="false">
      <template slot="title"
                slot-scope="scope">
        <el-row>
          <el-col :span="6"
                  style="font-size:18px;">选择年份</el-col>
          <el-col :span="6"
                  justify="end"
                  :push="12"
                  style="text-align:right">
            <i class="el-icon-close"
               @click="innerVisible4=false"
               style="font-size:20px;cursor:pointer;"></i>
          </el-col>
        </el-row>
      </template>

      <el-row style="height:350px">
        <el-scrollbar style="height:100%">
          <div style="padding:15px">
            <el-col :span="7"
                    v-for="(item,index) in year2"
                    :key="index">
              <el-date-picker v-model="year2[index]"
                              type="year"
                              placeholder="选择年"
                              value-format="yyyy"></el-date-picker>
            </el-col>
            <el-col :span="4">
              <i class="el-icon-circle-plus-outline addIcon"
                 @click="pushYear('2')"
                 style="margin-top:5px"></i>
            </el-col>
          </div>
        </el-scrollbar>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
import controllerResource from '../../onemap/controller/controllerResourceCommon'
import axios from 'axios'
import areaSelect from '../../../../assets/js/areaCascader.js'
export default {
  name: 'indicatortype',
  mixins: [areaSelect],
  data () {
    return {
      addIng: false,
      allTree: [],

      myClassification: [],
      innerVisible: false,
      innerVisible2: false,
      innerVisible3: false,
      innerVisible4: false,
      leverl: [
        {
          id: 1,
          name: '国家级'
        },
        {
          id: 2,
          name: '省级'
        },
        {
          id: 3,
          name: '市级'
        }
      ],
      dialogVisible: false,
      currentCheck: null,
      filterText: '',
      checkedCities: ['上海', '北京'],
      cities: ['上海111111', '北京', '广州', '深圳'],
      areaSelectedOptions: [],
      sy: require('../../../../assets/sy.png'),
      syNo: require('../../../../assets/syNo.png'),
      xyNo: require('../../../../assets/xyNo.png'),
      xy: require('../../../../assets/xy.png'),
      xzml: require('../../../../assets/xzml.png'),
      tjfw: require('../../../../assets/tjtc.png'),
      cmm: require('../../../../assets/cmm.png'),
      sc: require('../../../../assets/sc.png'),
      data: [],
      imIndexSort: {
        cantonProvinceName: '',
        cantonProvince: '',
        cantonAreaName: '',
        cantonArea: '',
        cantonCityName: '',
        cantonCity: '',
        description: '',
        sortTypeName: '',
        sortType: '',
        levels: '',
        levelsName: '',
        name: '国土空间规划指标体系',
        treeName: '',
        turn: '',
        year: ''
      },
      year: [],
      year2: [],
      indexList: [],
      focusState: false,
      imIndexSort: {},
      mysearchNode: '',
      inputDisabled: true,
      //  表格数据
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，

      defaultArray5: [],

      data5: [
        {
          id: 0,
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
        'project_type',
        'project_status',
        'sort_type'
      ], // 字典码请求
      dictionary: {
        // 字典码结果
        administrative_regions: '',
        project_type: '',
        project_status: '',
        sort_type: '',
        cantonCity: '',
        cantonArea: ''
      },
      dicNum: 0,
      defaultArray1: [0],
      isCurrent: null,
      enterFilterData: {
        cantonProvinceName: '',
        cantonProvince: '',
        cantonAreaName: '',
        cantonArea: '',
        cantonCityName: '',
        cantonCity: '',
        description: '',
        sortTypeName: '',
        sortType: '',
        levels: '',
        levelsName: '',
        name: '',
        treeName: '',
        parentId: '',
        turn: '',
        year: []
      },
      sortType: [],
      sortType2: [],
      parentId: '',
      parentData: {},
      nodeId: '',
      imIndexManageSelect: [],
      have: true
    }
  },
  components: { controllerResource },
  created () {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == 'administrative_regions') {
          this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
            parentId: 0
          }).then(res => {
            res = {
              code: 0,
              dictionariesList: [
                {
                  abbreviation: null,
                  children: null,
                  createTime: null,
                  creatorBy: null,
                  dictDelete: null,
                  dictKey: '440000',
                  dictOrder: 440000,
                  dictValue: '440000',
                  enUs: '440000',
                  groupId: null,
                  id: '440000',
                  parentId: '0',
                  updateTime: null,
                  updatorBy: null,
                  version: null,
                  zhCn: '广东省'
                }
              ],
              msg: '操作成功!'
            }
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
    })
    this.getOrg()
    this.getTreeAdmin()
    this.getSelect()
  },
  methods: {
    handleCheckedCitiesChange () { },
    handleChange (value) {
      this.filterData['orgId'] = value[value.length - 1]
    },
    getSelect () {
      this.$post(
        '/epf-index-model/imindexmanage/getImIndexManageSelect?',
        {}
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.imIndexManageSelect = res.imIndexManageSelect
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    remove (data, node) {
      this.$post('/epf-index-model/imindexsort/deleteImIndexSort', {
        id: data.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$set(this.defaultArray1, 0, node.parent.data.id)
          for (let item in this.imIndexSort) {
            this.imIndexSort[item] = ''
          }

          this.$message.success(res.msg)
          this.getTreeAdmin()
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    // 添加事件，打开弹窗
    add (key, data) {
      console.log(this.parentData)
      if (
        this.parentData.childs
        && this.parentData.childs[this.parentData.childs.length - 1].id == '100'
      ) {
        this.parentData.childs.pop()
      }
      if (key == 'tree') {
        data.childs.push({
          id: '100',
          name: '',
          leverl: '1',
          add: true
        })

        this.$nextTick(() => {
          this.$refs.sortInput.focus()
        })

        this.addIng = true
        this.parentData = data

        this.enterFilterData.treeName = data.name
        this.enterFilterData.parentId = data.id
        this.enterFilterData.turn = data.childs.length || 1
        this.defaultArray1.push(data.id)
      }
    },

    sub (index) {
      this.year.splice(index, 1)
    },
    sub2 (index) {
      this.year2.splice(index, 1)
    },
    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
    },
    deleleCheck (index) {
      this.cities.splice(index, 1)
    },
    showCheck (node, data) {
      !data.hasOwnProperty('collectStatus')
    },
    cancel () {
      for (let item in this.enterFilterData) {
        this.enterFilterData[item] = ''
      }

      this.indexList = []
      this.myClassification = []
      for (let item in this.imIndexSort) {
        this.imIndexSort[item] = ''
      }
    },
    addYear (key) {
      switch (key) {
        case '1':
          this.innerVisible3 = true
          // let num = 2019 + this.year.length + "";
          // this.year.push(num);
          break

        case '2':
          this.innerVisible4 = true
          break
      }
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
    // 得到目录树
    getTreeAdmin () {
      this.$post('/epf-index-model/imindexsort/getImIndexSortTree', {}).then(
        res => {
          if (res.code == '0') {
            this.data5[0].childs = res.result

            this.allTree = []
            this.getTreeAndData(this.data5, this.allTree)
            if (this.nodeId) {
              this.$set(this.defaultArray1, 0, this.nodeId)
            }
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    enteringBlur () { },

    treeClick (item, node, data) { },

    showHandle (node) {
      return node.childNodes.length !== 0
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getAuthorizeList()
    },
    nodeClick (item, node) {
      this.isCurrent = item
      if (item.id === 0) {
        this.inputDisabled = true
        this.imIndexSort = item

        return
      }
      this.inputDisabled = false
      if (item.add) {
        this.addIng = true

        return
      }
      this.addIng = false

      this.$post('/epf-index-model/imindexsort/getImIndexSort', {
        id: item.id
      }).then(res => {
        if (res.code === 0) {
          const that = this
          var arr = []
          this.imIndexSort = res.imIndexSort
          this.$set(this.imIndexSort, 'treeName', node.parent.data.name)
          this.indexList = this.imIndexSort.indexList

          that.sortType2 = that.imIndexSort.sortType
            ? that.imIndexSort.sortType.split(',')
            : []

          that.year2 = that.imIndexSort.year
            ? that.imIndexSort.year.split(',')
            : []
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getAuthorizeList()
    },

    showButton (data) {
      return !!data.hasOwnProperty('leverl')
    },

    provinceSelect (dic, cantonCode, event, obj) {
      this[obj].cantonAreaName = ''
      this[obj].cantonArea = ''
      this[obj].cantonCityName = ''
      this[obj].cantonCity = ''

      let pId = this.$refs[cantonCode][0].$attrs.id
      this[obj].cantonProvince = this.$refs[cantonCode][0].$attrs.dictKey
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
    citySelect (dic, cantonCity, event, obj) {
      this[obj].cantonArea = ''
      this[obj].cantonAreaName = ''

      let pId = this.$refs[cantonCity][0].$attrs.id
      this[obj].cantonCity = this.$refs[cantonCity][0].$attrs.dictKey
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
    areaSelect (dic, cantonArea, event, obj) {
      this[obj].cantonArea = this.$refs[cantonArea][0].$attrs.dictKey
    },
    deleteIfication (index) {
      this.myClassification.splice(index, 1)
    },
    deleteIfication2 (index) {
      this.indexList.splice(index, 1)
    },
    nodeSelect (dic, treeName, event, obj) {
      this[obj].parentId = this.$refs[treeName][0].$attrs.dictKey
    },
    levelSelect (dic, levelsName, event, obj) {
      this[obj].levels = this.$refs[levelsName][0].$attrs.dictKey
    },
    sortSelect (dic, sortTypeName, event, obj) {
      // this[obj].sortTypeName = sortTypeName;
      this[obj].sortType = this.$refs[sortTypeName][0].$attrs.dictKey
    },
    getOrg () {
      let orgId = sessionStorage.getItem('orgId')

      this.$get('/epf-admin/admin/org/getOrg', { id: orgId }).then(res => {
        if (res.code == '0') {
          this.data5[0].name = res.area + '指标体系'
        }
      })
    },
    handleChange () { },
    save () {
      // let {sortTypeName,...params}=this.enterFilterData
      if (!this.enterFilterData.name && !this.enterFilterData.parentId) {
        this.$message('请输入指标名称、父级目录')
        return
      }

      console.log(this.enterFilterData)
      this.enterFilterData['ids'] = this.getIDs(this.myClassification)
      this.enterFilterData['sortType']
        = this.sortType.join(',') || this.sortType
      this.enterFilterData['year'] = this.year.join(',') || this.year
      console.log(this.enterFilterData)
      this.mysearchNode = this.enterFilterData.parentId
      this.$post(
        '/epf-index-model/imindexsort/addImIndexSort',
        this.enterFilterData
      ).then(res => {
        if (res.code == '0') {
          for (let item in this.enterFilterData) {
            this.enterFilterData[item] = ''
          }
          this.myClassification = []
          this.year = []
          this.sortType = []
          this.getTreeAdmin()

          this.$message.success(res.msg) // 失败
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
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
    pushYear (key) {
      switch (key) {
        case '1':
          this.year.push('2020')
          break

        case '2':
          this.year2.push('2020')
          break
      }
    },
    deleteYear (index, key) {
      switch (key) {
        case '1':
          this.year.splice(index, 1)
          break

        case '2':
          this.year2.splice(index, 1)
          break
      }
    },
    editor () {
      if (!this.imIndexSort.name && !this.imIndexSort.parentId) {
        this.$message('请输入指标名称、父级目录')
        return
      }
      this.mysearchNode = this.imIndexSort.parentId
      let { indexList, ...params } = this.imIndexSort
      params['ids'] = this.getIDs(this.indexList)
      params['sortType'] = this.sortType2.join(',')
      params['year'] = this.year2.join(',')
      this.$post('/epf-index-model/imindexsort/editImIndexSort', params).then(
        res => {
          if (res.code == '0') {
            console.log(this.nodeId)
            this.getTreeAdmin()

            this.$message.success(res.msg) // 失败
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    getNode (node) {
      this.nodeId = node.data.id
    }
  },
  watch: {},
  computed: {
    checkedIds: {
      get () {
        let arr = []
        this.indexList.forEach(item => arr.push(item.id))
        return arr
      },
      set (val) {
        let arr2 = []
        let arr = this.imIndexManageSelect
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < arr.length; j++) {
            if (val[i] == arr[j].id) {
              arr2.push(arr[j])
            }
          }
        }
        this.indexList = arr2
        // for (var i = 0; i < val.length; i++) {
        //   for (var j = 0; j < this.imIndexManageSelect.length; j++) {
        //     if (val[i] == this.imIndexManageSelect[j].id) {
        //       this.indexList.push(this.imIndexManage[j]);
        //     }
        //   }
        // }
      }
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
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
.addIcon {
  font-size: 20px;
  color: #1d7ce4;
  cursor: pointer;
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
  margin-bottom: 8px;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(198, 198, 198, 1);
}
.filter_content i {
  cursor: pointer;
  margin-left: 5px;
}
.toolsTitleBox {
  height: 50px;

  border-bottom: 1px solid rgba(217, 217, 217, 1);
  font-weight: 700;
  line-height: 50px;

  padding-left: 16px;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;

  width: 100%;
  height: 35px;

  text-align: left;
  line-height: 35px;
  font-weight: 400;
  font-size: 16px;
  padding-left: 32px;
}
.filter_wrap {
  box-sizing: border-box;
  height: 100%;
  box-shadow: 1px 2px 10px 2px rgba(208, 208, 208, 0.5);
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

.switchHeight_box2 {
  padding: 32px;
  color: #000000;
}

.switchHeight_box2 .tr {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.switchHeight_box2 .tr .firstTd {
  width: 100px;
  color: #484848;
}
.switchHeight_box2 .tr .secondTd {
  width: calc(100% - 100px);
}
/* .switchHeight_box2 .el-row .el-col-18 {
  display: flex;
  align-items: center;
}
.switchHeight_box2 .el-row:last-child {
  align-items: flex-start;
}
.switchHeight_box2 .el-row:last-child {
  margin-top: 0;
} */
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
</style>

<style>
.hasSearchSelect .el-select {
  display: block;
}
.switchHeight_box2 .el-checkbox__label {
  font-size: 16px;
}
.innerDialog .el-dialog__body {
  padding: 10px 10px 30px 10px;
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
.treeSearch {
  height: 56px;
  display: flex;
  align-items: center;
  background: rgba(247, 247, 247, 1);
  box-shadow: 0px 1px 3px -1px rgba(153, 153, 153, 0.5);
  padding: 8px;
}
.treeSearch .el-input__inner {
  height: 40px;
  line-height: 40px;
  border: 1px solid #dcdfe6;
}
.area .el-dialog__header {
  padding: 0;
}
.area .el-dialog {
}

#indicatorset
  .el-input-number.is-controls-right[class*="small"]
  [class*="decrease"],
#indicatorset
  .el-input-number.is-controls-right[class*="small"]
  [class*="increase"] {
  line-height: 19px;
}

#indicatorset .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

#indicatorset .el-scrollbar {
  height: 100%;
  border: none;
  border-radius: 0;
}

#indicatorset .el-input__inner {
  height: 40px !important;
}
#indicatorset .el-select {
  width: 100%;
}
</style>
