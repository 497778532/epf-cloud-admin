<template>
  <div v-if="indicatorDialog"
       class="delDialog my-dialog">
    <div class="handelDialog">
      <el-row class="dialogHeader">
        <el-col :span="6"
                class="h4">修改指标</el-col>
        <el-col :span="6"
                justify="end"
                :push="12"
                style="text-align:right">
          <i class="el-icon-close"
             @click="myclose()"
             style="font-size:20px;cursor:pointer;color:#fff"></i>
        </el-col>
      </el-row>
      <el-form :rules="rules"
               :model="editorDataDialog"
               ref="editorDataDialog"
               label-width="auto"
               class="demo-ruleForm"
               id="basicInfo">
        <div style="height:300px">
          <el-scrollbar>
            <div style="padding:15px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="指标名称："
                                prop="name">
                    <el-input v-model="editorDataDialog.name"
                              placeholder="请输入指标名称"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10"
                        :offset="2">
                  <el-form-item label="指标归属："
                                prop="belong">
                    <el-radio v-model="belong"
                              label="1">全省</el-radio>
                    <el-radio v-model="belong"
                              label="2">市区独有</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="myRow"
                      v-if="belong==='2'">
                <el-col :span="24">
                  <div style="display:flex;flex-direction: row;">
                    <el-form-item label="行政区域："
                                  prop="cantonProvinceName">
                      <el-select v-model="editorDataDialog.cantonProvinceName"
                                 placeholder="选择省"
                                 @change="provinceSelect(dictionaryDialog.administrative_regions,editorDataDialog.cantonProvinceName,$event)"
                                 style="width:140px">
                        <el-option v-for="(item,index) in dictionaryDialog.administrative_regions"
                                   :ref="item.zhCn"
                                   :id="item.id"
                                   :dictKey="item.dictKey"
                                   :label="item.zhCn"
                                   :value="item.zhCn"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="cantonCityName"
                                  class="canton_Regions">
                      <el-select v-model="editorDataDialog.cantonCityName"
                                 placeholder="选择市"
                                 @change="citySelect(dictionaryDialog.cantonCity,editorDataDialog.cantonCityName,$event)"
                                 style="width:140px">
                        <el-option v-for="(item,index) in dictionaryDialog.cantonCity"
                                   :ref="item.zhCn"
                                   :id="item.id"
                                   :dictKey="item.dictKey"
                                   :label="item.zhCn"
                                   :value="item.zhCn"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="cantonAreaName"
                                  class="canton_Regions">
                      <el-select v-model="editorDataDialog.cantonAreaName"
                                 placeholder="选择区县"
                                 @change="areaSelect(dictionaryDialog.cantonAreaName,editorDataDialog.cantonAreaName,$event)"
                                 style="width:140px">
                        <el-option v-for="(item,index) in dictionaryDialog.cantonArea"
                                   :ref="item.zhCn"
                                   :id="item.id"
                                   :dictKey="item.dictKey"
                                   :label="item.zhCn"
                                   :value="item.zhCn"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row class="myRow">
                <el-form-item label="指标分类："
                              prop="checkMange">
                  <span class="filter_content"
                        v-for="(item,index) in  myClassification"
                        :key="index">
                    <span>{{item.name}}</span>
                    <i class="el-icon-close"
                       @click="deleteIfication(index)"></i>
                  </span>
                  <i class="el-icon-circle-plus-outline addIcon"
                     @click="innerVisible=true"></i>
                </el-form-item>
              </el-row>

              <el-row class="myRow">
                <el-form-item label="指标年份："
                              prop="year">
                  <span class="filter_content"
                        v-for="(item,index) in  editorDataDialog.year"
                        :key="index">
                    <span>{{item}}</span>
                    <i class="el-icon-close"
                       @click="deleteIfication2(index)"></i>
                  </span>
                  <i class="el-icon-circle-plus-outline addIcon"
                     @click="innerVisible2=true"></i>
                  <!-- <el-col :span="8" v-for="(item,index) in editorDataDialog.year" :key="index">
                  <el-col :span="18">
                    <el-date-picker
                      v-model="editorDataDialog.year[index]"
                      type="year"
                      placeholder="选择年"
                      value-format="yyyy"
                    ></el-date-picker>
                  </el-col>
                  <el-col :span="4">
                    <span class="filter_title left">
                      <i class="el-icon-circle-plus-outline addIcon" @click="addYear()"></i>
                    </span>
                  </el-col>
                </el-col>-->
                </el-form-item>
              </el-row>

              <el-row class="myRow">
                <el-col :span="8">
                  <el-form-item label="单位："
                                prop="unit">
                    <el-input v-model="editorDataDialog.unit"
                              placeholder="请输入单位"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="9">
                  <span class="filter_title"
                        style="text-align:left;margin-left:8%">输入多个单位时,请用" 、"隔开</span>
                </el-col>
              </el-row>
              <el-row class="myRow">
                <el-col :span="8">
                  <el-form-item label="管控类型："
                                prop="controlTypeName">
                    <el-select v-model="editorDataDialog.controlTypeName"
                               size="small"
                               placeholder="选择管控类型"
                               @change="controlSelect(dictionaryDialog.index_manage_controltype,editorDataDialog.controlTypeName,$event)">
                      <el-option v-for="item in dictionaryDialog.index_manage_controltype"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="item.dictKey"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7"
                        :offset="1">
                  <el-form-item label="上报类型："
                                prop="year">
                    <el-select v-model="editorDataDialog.reportTypeName"
                               size="small"
                               placeholder="选择上报类型"
                               @change="reportSelect(dictionaryDialog.index_manage_reporttype,editorDataDialog.reportTypeName,$event)">
                      <el-option v-for="item in dictionaryDialog.index_manage_reporttype"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="item.dictKey"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row class="myRow">
                <el-form-item label="指标说明："
                              prop="unit">
                  <el-input type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            :maxlength="200"
                            v-model="editorDataDialog.explain"></el-input>
                </el-form-item>
              </el-row>

              <!-- <el-row class="dialogFooter">
            <div class="EPFButton EFPreset" @click="myclose()">取 消</div>
            <div class="EPFButton EFPcommon" @click="save()">保 存</div>
            </el-row>-->
            </div>
          </el-scrollbar>
        </div>

        <el-row class="dialogFooter">
          <el-form-item>
            <div class="EPFButton EFPreset"
                 @click="myclose()">取 消</div>
            <div class="EPFButton EFPcommon"
                 @click="submitForm('editorDataDialog')">保 存</div>
          </el-form-item>
        </el-row>
      </el-form>

    </div>
    <el-dialog class="innerDialog"
               top="25vh"
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

      <div style="height:300px">
        <el-scrollbar style="height:100%">
          <el-checkbox-group v-model="checkedIds">
            <el-checkbox class="checkbox"
                         v-for="(item,index) in imIndexManage"
                         :label="item.id"
                         :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
    </el-dialog>

    <el-dialog class="innerDialog"
               top="25vh"
               width="30%"
               :visible.sync="innerVisible2"
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
               @click="innerVisible2=false"
               style="font-size:20px;cursor:pointer;"></i>
          </el-col>
        </el-row>
      </template>

      <el-row style="height:350px">
        <el-scrollbar style="height:100%">
          <el-col :span="7"
                  v-for="(item,index) in editorDataDialog.year"
                  :key="index">
            <!-- <el-date-picker
              v-model="editorDataDialog.year[index]"
              type="year"
              placeholder="选择年"
              value-format="yyyy"
            ></el-date-picker>-->

            <el-row type="flex"
                    align="middle">
              <el-col :span="20">
                <el-date-picker v-model="editorDataDialog.year[index]"
                                type="year"
                                placeholder="选择年"
                                value-format="yyyy"></el-date-picker>
              </el-col>

              <el-col :span="4">
                <i class="el-icon-remove-outline addIcon"
                   @click="sub(index)"></i>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <i class="el-icon-circle-plus-outline addIcon"
               @click="addYear()"
               style="margin-top:10px"></i>
          </el-col>

          <!-- <el-checkbox-group v-model="editorDataDialog.checkMange" @change="handleCheckedCitiesChange">
            <el-checkbox
              class="checkbox"
              v-for="(item,index) in imIndexManage"
              :label="item"
              :key="index"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>-->
        </el-scrollbar>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    indicatorDialog: {
      type: Boolean,
      default: function () {
        return false
      } // 这样可以指定默认的值
    },
    imIndexManage: {
      type: Array,
      default: function () {
        return []
      }
    },
    dictionaryDialog: {
      type: Object,
      default: function () {
        return {}
      }
    },
    editorDataDialog: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入指标名称' }],
        cantonProvince: [{ required: true, message: '请选择省' }],
        cantonCity: [{ required: true, message: '请选择省市' }]
      },
      belong: '',
      configuration: false,
      checkedCities: [],
      classification: [],
      radio: '',
      myClassification: [],
      name: '',
      num: 2018,
      innerVisible: false,
      innerVisible2: false,
      selectedOptions: [],

      dialogVisible: false,

      addParams: {}
    }
  },

  created () { },
  methods: {
    submitForm (formName) {
      const that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          var arr = []
          let {
            imIndexValue,
            deleteFlag,
            imIndexSort,
            year,
            ...params
          } = that.editorDataDialog
          console.log(this.checkedIds)
          this.checkedIds.forEach(item => {
            let obj = {}
            obj['sortId'] = item
            arr.push(obj)
          })

          params['indexSortJson'] = JSON.stringify(arr)
          params['provinceGroupId'] = this.belong === '1' ? 'TRUE' : ''

          if (year) {
            params['year'] = year.join(',') || year
          }
          if (params['provinceGroupId'] === 'TRUE') {
            params.cantonProvince = ''
            params.cantonCity = ''
            params.cantonArea = ''
            params.cantonProvinceName = ''
            params.cantonCityName = ''
            params.cantonAreaName = ''
          }

          let searchData = {
            cantonProvince: params.cantonProvince,
            cantonCity: params.cantonCity,
            cantonArea: params.cantonArea,
            name: params.name
          }
          if (params.name === this.name) {
            this.$post(
              '/epf-index-model/imindexmanage/editImIndexManage',
              params
            ).then(res => {
              console.log(res)
              if (res.code == '0') {
                that.$emit('dialogclose', 'f5')

                that.checkMange = []
                for (let item in that.editorDataDialog) {
                  this.editorDataDialog[item] = ''
                }

                this.$set(that.editorDataDialog, 'checkMange', [])
                that.$message.success(res.msg)
              } else {
                this.loading = false
                this.$message.error(res.msg) // 失败
                return
              }
            })
          } else {
            this.$get(
              '/epf-index-model/imindexmanage/checkName',
              searchData
            ).then(res => {
              console.log(res)
              if (res.code == '0') {
                let array = res.pager.results

                if (array.length) {
                  this.$message('相同行政区域指标名称重复')
                  return
                }
                this.$post(
                  '/epf-index-model/imindexmanage/editImIndexManage',
                  params
                ).then(res => {
                  console.log(res)
                  if (res.code == '0') {
                    that.$emit('dialogclose', 'f5')

                    that.checkMange = []
                    for (let item in that.editorDataDialog) {
                      this.editorDataDialog[item] = ''
                    }

                    this.$set(that.editorDataDialog, 'checkMange', [])
                    that.$message.success(res.msg)
                  } else {
                    this.loading = false
                    this.$message.error(res.msg) // 失败
                    return
                  }
                })
              } else {
                this.loading = false
                this.$message.error(res.msg) // 失败
                return
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    sub (index) {
      this.editorDataDialog.year.splice(index, 1)
    },
    myclose () {
      this.$emit('dialogclose')
    },
    addYear () {
      this.editorDataDialog.year.push('2020')
    },
    deleteIfication (index) {
      this.myClassification.splice(index, 1)
    },
    deleteIfication2 (index) {
      this.editorDataDialog.year.splice(index, 1)
    },

    provinceSelect (dic, cantonCode, event) {
      this.editorDataDialog.cantonAreaName = ''
      this.editorDataDialog.cantonArea = ''
      this.cantonArea = ''
      this.editorDataDialog.cantonCityName = ''
      this.editorDataDialog.cantonCity = ''
      this.cantonCity = ''
      let pId = this.$refs[cantonCode][0].$attrs.id
      this.editorDataDialog.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.dictKey

      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length != 0) {
          this.dictionaryDialog.cantonCity = res.dictionariesList

          return
        }
        this.dictionaryDialog.cantonCity = ''
      })
    },
    citySelect (dic, cantonCity, event) {
      this.editorDataDialog.cantonArea = ''
      this.editorDataDialog.cantonAreaName = ''
      this.cantonArea = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
      this.editorDataDialog.cantonCity = this.$refs[
        cantonCity
      ][0].$attrs.dictKey
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length != 0) {
          this.dictionaryDialog.cantonArea = res.dictionariesList

          return
        }
        this.dictionaryDialog.cantonArea = ''
      })
    },
    areaSelect (dic, cantonAreaName, event) {
      this.editorDataDialog.cantonArea = this.$refs[
        cantonAreaName
      ][0].$attrs.dictKey
    },
    controlSelect (dic, controlTypeName, event) {
      this.editorDataDialog.controlType = this.$refs[
        controlTypeName
      ][0].$attrs.dictKey
    },
    reportSelect (dic, reportTypeName, event) {
      this.editorDataDialog.reportType = this.$refs[
        reportTypeName
      ][0].$attrs.dictKey
    }
  },
  watch: {
    editorDataDialog (val) {
      this.myClassification = val.imIndexSort

      this.belong = val.provinceGroupId ? '1' : '2'
      this.name = JSON.parse(JSON.stringify(val.name))
    }
  },
  computed: {
    checkedIds: {
      get () {
        let arr = []
        this.myClassification.forEach(item => arr.push(item.id))
        return arr
      },
      set (val) {
        this.myClassification = []
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < this.imIndexManage.length; j++) {
            if (val[i] === this.imIndexManage[j].id) {
              this.myClassification.push(this.imIndexManage[j])
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding-right: 24%;
  text-align: right;
  line-height: 35px;
  color: rgba(48, 48, 48, 1);
  font-weight: 400;
  font-size: 16px;
}
.filter_title.left {
  text-align: center;
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

.addIcon {
  font-size: 20px;
  color: #1d7ce4;
  cursor: pointer;
}
.checkbox {
  margin: 5px 20px;
}

.myCol {
  margin-top: 5px;
}
</style>
<style>
.canton_Regions > .el-form-item__content {
  margin-left: 5px !important;
}

#indicatorEditor .el-form-item {
  margin-bottom: 0;
}
.indicatorEditor .el-scrollbar {
  height: 100%;
}
#indicatorEditor .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: hidden;
}
.innerDialog .el-scrollbar {
  height: 100%;
}
.innerDialog .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: hidden;
}
.innerDialog .el-dialog__body {
  padding: 0;
}
#indicatorEditor .el-form-item__label {
  color: rgba(48, 48, 48, 1);
  font-size: 16px;
  padding: 0;
}

#indicatorEditor .el-form-item__label {
  color: rgba(48, 48, 48, 1);
  font-size: 16px;
  padding: 0;
}
.innerDialog .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 90%;
}
</style>
