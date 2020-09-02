<template>
  <div class="delDialog my-dialog"
       v-if="indicatorDialog">
    <div class="handelDialog">

      <el-row class="dialogHeader">
        <el-col :span="6"
                style="font-size:18px;">指标详情</el-col>
        <el-col :span="6"
                justify="end"
                :push="12"
                style="text-align:right">
          <i class="el-icon-close"
             @click="myclose()"
             style="font-size:20px;cursor:pointer;color:#fff"></i>
        </el-col>
      </el-row>
      <el-form :disabled="true"
               :rules="rules"
               :model="indiatorData"
               ref="filterData"
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
                    <el-input v-model="indiatorData.name"
                              placeholder="请输入指标名称"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8"
                        :offset="2">
                  <el-form-item label="指标归属："
                                prop="belong">
                    <el-radio v-model="indiatorData.belong"
                              label="1">全省</el-radio>
                    <el-radio v-model="indiatorData.belong"
                              label="2">市区独有</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="myRow"
                      v-if="indiatorData.belong==='2'">
                <el-col :span="24">
                  <div style="display:flex;flex-direction: row;">
                    <el-form-item label="行政区域："
                                  prop="cantonProvinceName">
                      <el-select v-model="indiatorData.cantonProvinceName"
                                 placeholder="选择省"
                                 @change="provinceSelect(dictionaryDialog.administrative_regions,indiatorData.cantonProvinceName,$event)"
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
                      <el-select v-model="indiatorData.cantonCityName"
                                 placeholder="选择市"
                                 @change="citySelect(dictionaryDialog.cantonCity,indiatorData.cantonCityName,$event)"
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
                      <el-select v-model="indiatorData.cantonAreaName"
                                 placeholder="选择区县"
                                 @change="areaSelect(dictionaryDialog.cantonAreaName,indiatorData.cantonAreaName,$event)"
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
                        v-for="(item,index) in  indiatorData.imIndexSort"
                        :key="index">
                    <span>{{item.name}}</span>
                  </span>
                </el-form-item>
              </el-row>

              <el-row class="myRow">
                <el-form-item label="指标年份："
                              prop="year">
                  <span class="filter_content"
                        v-for="(item,index) in  indiatorData.year"
                        :key="index">
                    <span>{{item}}</span>
                  </span>
                  <!-- <el-col :span="8" v-for="(item,index) in filterData.year" :key="index">
                  <el-col :span="18">
                    <el-date-picker
                      v-model="filterData.year[index]"
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
                    <el-input v-model="indiatorData.unit"
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
                    <el-select v-model="indiatorData.controlTypeName"
                               size="small"
                               placeholder="选择管控类型"
                               @change="controlSelect(dictionaryDialog.index_manage_controltype,indiatorData.controlTypeName,$event)">
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
                    <el-select v-model="indiatorData.reportTypeName"
                               size="small"
                               placeholder="选择上报类型"
                               @change="reportSelect(dictionaryDialog.index_manage_reporttype,filterData.reportTypeName,$event)">
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
                            v-model="filterData.explain"></el-input>
                </el-form-item>
              </el-row>

              <!-- <el-row class="dialogFooter">
            <div class="EPFButton EFPreset" @click="myclose()">取 消</div>
            <div class="EPFButton EFPcommon" @click="save()">保 存</div>
            </el-row>-->
            </div>
          </el-scrollbar>
        </div>
      </el-form>
      <el-row class="dialogFooter">
        <div class="EPFButton EFPreset"
             @click="myclose()">取 消</div>
      </el-row>
    </div>
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
    dictionaryDialog: {
      type: Object,
      default: function () {
        return {}
      }
    },
    indiatorData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      value3: '',
      configuration: false,
      checkedCities: [],
      classification: [
        {
          id: 1,
          name: '安全国土'
        },
        {
          id: 2,
          name: '安全国土'
        },
        {
          id: 3,
          name: '安全国土'
        },
        {
          id: 4,
          name: '安全国土'
        },
        {
          id: 5,
          name: '安全国土'
        },
        {
          id: 6,
          name: '安全国土'
        },
        {
          id: 7,
          name: '安全国土'
        },
        {
          id: 8,
          name: '安全国土'
        },
        {
          id: 9,
          name: '安全国土'
        },
        {
          id: 10,
          name: '安全国土'
        }
      ],
      indexValue: [
        {
          year: '2018',
          targetValue: '100',
          standardsValue: '100',
          thresholdValue: '100',
          rowFlag: '1'
        },

        {
          year: '2025',
          targetValue: '200',
          standardsValue: '200',
          thresholdValue: '200',
          rowFlag: '1'
        },
        {
          year: '2025',
          targetValue: '200',
          standardsValue: '200',
          thresholdValue: '200',
          rowFlag: '1'
        }
      ],
      radio: '',
      myClassification: [],
      num: 2018,
      innerVisible: false,
      selectedOptions: [],

      dialogVisible: false,

      filterData: {
        classification: [],
        orgName: '',
        cantonAreaName: ''
      },

      addParams: {}
    }
  },

  created () { },
  methods: {
    myclose () {
      this.$emit('dialogclose')
    },
    innerClose () {
      this.myClassification = this.checkedCities
    },
    async imgAxios (id, array, array2, key) {
      const { fileList } = await axios.get(
        '/api/epf-document/document/getOneGroupFilsById',
        {
          params: {
            id: id
          }
        }
      )

      let filesData = fileList
      for (let index = 0; index < filesData.length; index++) {
        // if(index=0){
        //   debugger;
        //   this.followData[key]=filesData[0].pId
        // };
        if (
          filesData[index].extName == 'png'
          || filesData[index].extName == 'jpeg'
          || filesData[index].extName == 'PNG'
          || filesData[index].extName == 'jpg'
          || filesData[index].extName == 'JPG'
          || filesData[index].extName == 'jifi'
          || filesData[index].extName == 'gif'
        ) {
          array.push({
            name: filesData[index].name,
            url: this.baseUrl + filesData[index].id
          })
          if (array2) {
            array2.push(filesData[index].id)
          }
        }
      }
      if (key) {
        this.followData[key] = filesData[0].pId
      }
      // this.locationFileList = array;
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
          this.dictionaryDialog.cantonCity = res.dictionariesList

          return
        }
        this.dictionaryDialog.cantonCity = ''
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
          this.dictionaryDialog.cantonArea = res.dictionariesList

          return
        }
        this.dictionaryDialog.cantonArea = ''
      })
    },
    areaSelect (dic, cantonCity, event) {
      this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.dictKey
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
  padding-right: 15px;
  text-align: right;
  line-height: 35px;
  color: rgba(48, 48, 48, 1);
  font-weight: 400;
  font-size: 16px;
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
</style>
