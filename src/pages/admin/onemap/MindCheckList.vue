<template>
  <el-scrollbar style="height:100%;"
                ref="myScrollbar">
    <div class="mindOMC">
      <div class="switchHeight_box">
        <el-row style="margin-bottom:20px;">
          <el-col :span="8"
                  class="filter_title_box">
            <span class="filter_title__custom">行政区划</span>
            <el-cascader :props="props"
                         clearable
                         v-model="areaSelectedOptions"
                         @change="areaSelect()"
                         style="width:calc(100% - 120px);"></el-cascader>
          </el-col>
          <el-col :span="6"
                  class="filter_title_box">
            <span class="filter_title__custom">统计年份：</span>
            <el-select v-model="this.params.year"
                       filterable
                       @change="handleChangeYear"
                       style="width:calc(100% - 120px);">
              <el-option v-for="item in yearOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="10"
                  style="display:flex;justify-content:flex-end;">
            <div class="primary_reset"
                 @click="resetFilter()">重置</div>
            <div class="primary_search"
                 @click="searchList()">查询</div>
            <div class="button_shen"
                 @click="pushTo()">生成表单</div>
          </el-col>
        </el-row>
      </div>
      <div class="wrap_body"
           v-loading="loading">
        <div class="page-body">
          <!-- 一级 -->
          <div class="first-title">{{ mindList.displayName }}</div>
          <div class="heng-line"></div>

          <!-- 二级 -->
          <div class="second-big">
            <div class="second-box"
                 v-for="(item2, index2) in mindList.childList"
                 :key="index2">
              <div class="shu-line"
                   v-show="mindList.childList.length > 1"></div>
              <div :class="{
                oneGradeYJ: exitTwo && !exitThree && !exitFour,
                oneGradeEJ: exitThree && exitTwo && !exitFour&&item2.parentTreeCode!=='gtkjytgzqk',
                oneGradeSJ: exitFour && exitThree && exitTwo,
                oneGradeSpecial: exitThree && exitTwo && !exitFour&&item2.parentTreeCode==='gtkjytgzqk'
              }"
                   v-if="item2.childList[0].indexQueryFlag === '1'"></div>
              <div class="heng-line left"></div>
              <div class="second-title"
                   :class="{
                miniWidth: exitFour && exitThree && exitTwo,
                smallWidth: exitThree && exitTwo && !exitFour,
                mediumWidth: exitTwo && !exitThree && !exitFour
              }">{{ item2.displayName }}</div>
              <!-- 假设有些只有二级 -->
              <div class="heng-line right"
                   :class="{ right2__custom: item2.childList.length === 0 }"
                   v-if="item2.indexQueryFlag === '0'"
                   style="position: relative;z-index:100;">
                <div class="number-icon"
                     :id="item2.isSelectID"
                     @click="handleClickChange4(item2, index2)"
                     v-if="item2.childList[0].indexQueryFlag === '1' &&limit !== item2.isSelectID">{{ item2.childList.length }}</div>
                <div class="number-icon"
                     :id="item2.isSelectID"
                     @click="handleClickChange4(item2, index2)"
                     v-if="item2.childList[0].indexQueryFlag === '1' &&limit === item2.isSelectID">一</div>
              </div>
              <!-- 二级完成情况 -->
              <div class="overConditionBox2"
                   v-if="item2.childList[0].indexQueryFlag === '1'&& item2.treeCode!=='gtkjytgzqk_ghxkqk' &&limit === item2.isSelectID">
                <div class="overCondition2"
                     :id="getIndexID2(index2)">
                  <div v-for="(item3, index3) in item2.childList"
                       :key="index3"
                       class="textMsg">
                    <div class="textMsg-bgc"></div>
                    <div class="heng-line left"
                         style="text-align:left;"></div>
                    <div class="pro-name">
                      <div>{{ item3.indexName }}</div>
                    </div>
                    <div class="pro-data">
                      <div class="pro-data-number"
                           v-if="item3.indexValue!==null">{{ item3.indexValue }}</div>
                      <div class="pro-data-number"
                           v-if="item3.indexValue===null">- -</div>
                      <div class="pro-data-unit">{{ item3.unit }}</div>
                    </div>
                    <div class="shu-line-pro"
                         v-if="item2.childList.length > 1"></div>
                    <div class="dashed-line-pro"></div>
                  </div>
                </div>
              </div>
              <!-- 二级完成特殊情况 -->
              <div class="overConditionBox2"
                   v-if="item2.childList[0].indexQueryFlag === '1'&&item2.treeCode==='gtkjytgzqk_ghxkqk' &&limit === item2.isSelectID">
                <div class="overCondition2"
                     :id="getIndexID2(index2)">
                  <div v-for="(item3, index3) in item2.childList"
                       :key="index3"
                       class="textMsg"
                       :class="{'textMsgSpecial':item2.treeCode==='gtkjytgzqk_ghxkqk'&&item3.indexQueryFlag==='0'}">
                    <!-- 二级完成特殊指标情况 -->
                    <div class="textMsg-bgc"
                         v-if="item3.indexQueryFlag==='1'"></div>
                    <div class="heng-line left"
                         style="text-align:left;"
                         v-if="item3.indexQueryFlag==='1'"></div>
                    <div class="pro-name"
                         v-if="item3.indexQueryFlag==='1'">
                      <div>{{ item3.indexName }}</div>
                    </div>
                    <div class="pro-data"
                         v-if="item3.indexQueryFlag==='1'">
                      <div class="pro-data-number"
                           v-if="item3.indexValue!==null">{{ item3.indexValue }}</div>
                      <div class="pro-data-number"
                           v-if="item3.indexValue===null">- -</div>
                      <div class="pro-data-unit">{{ item3.unit }}</div>
                    </div>
                    <div class="shu-line-pro"
                         v-if="item2.childList.length > 1&&item3.indexQueryFlag==='1'"></div>
                    <div class="dashed-line-pro"
                         v-if="item3.indexQueryFlag==='1'"></div>
                    <!-- 二级完成特殊目录指标情况 -->
                    <div class="special-two-box"
                         v-if="item3.indexQueryFlag==='0'">
                      <!-- 三级 -->

                      <!-- <div class="shu-line-third"
                         v-if="item2.childList.length > 1"></div> -->
                      <div class="shu-line-third-special"></div>
                      <div :class="{
                    twoGradeEJ: exitThree && exitTwo && !exitFour,
                    twoGradeSJ: exitFour && exitThree && exitTwo
                  }"
                           v-if="item3.childList[0].indexQueryFlag === '1'"></div>
                      <div class="heng-line left"></div>
                      <div class="third-title"
                           :class="{
                    miniWidth: exitFour && exitThree && exitTwo,
                    smallWidth: exitThree && exitTwo && !exitFour
                  }">{{ item3.displayName }}</div>
                      <!-- 假设有些只有三级 -->
                      <div class="heng-line right"
                           :class="{ right3__custom: item3.childList.length === 0 }"
                           v-if="item3.indexQueryFlag === '0'"
                           style="position: relative;z-index:100;">
                        <div class="number-icon"
                             :id="item3.isSpecialID"
                             @click="handleClickSpecialChange(item3, index3)"
                             v-if="item3.childList[0].indexQueryFlag === '1' &&limitSpecial !== item3.isSpecialID">{{ item3.childList.length }}</div>
                        <div class="number-icon"
                             :id="item3.isSpecialID"
                             @click="handleClickSpecialChange(item3, index3)"
                             v-if="item3.childList[0].indexQueryFlag === '1' &&limitSpecial === item3.isSpecialID">一</div>
                      </div>
                      <!-- 三级完成情况 -->
                      <div class="overConditionBox3"
                           :class="{'overConditionBox3-special':item2.treeCode==='gtkjytgzqk_ghxkqk'}"
                           v-if="item3.childList[0].indexQueryFlag === '1'&&limitSpecial === item3.isSpecialID">
                        <div class="overCondition3"
                             :id="getIndexID3(index2, index3)">
                          <div v-for="(item4, index4) in item3.childList"
                               :key="index4"
                               class="textMsg">
                            <div class="textMsg-bgc"></div>
                            <div class="heng-line left"></div>
                            <div class="pro-name">
                              <div>{{ item4.indexName }}</div>
                            </div>
                            <div class="pro-data">
                              <div class="pro-data-number"
                                   v-if="item4.indexValue!==null">{{ item4.indexValue }}</div>
                              <div class="pro-data-number"
                                   v-if="item4.indexValue===null">- -</div>
                              <div class="pro-data-unit">{{ item4.unit }}</div>
                            </div>
                            <div class="shu-line-pro"
                                 v-if="item3.childList.length > 1"></div>
                            <div class="dashed-line-pro"></div>
                          </div>
                        </div>
                      </div>
                      <!-- 三级完成特殊情况 -->

                      <!-- 四级 -->
                      <div class="fourth-big"
                           v-if="item3.childList[0].indexQueryFlag === '0'">
                        <div class="fourth-box"
                             v-for="(item4, index4) in item3.childList"
                             :key="index4">
                          <div class="shu-line-fourth"
                               v-if="item3.childList.length > 1"></div>
                          <div class="heng-line left"></div>
                          <div class="fourth-title"
                               :class="{ miniWidth: exitFour && exitThree && exitTwo }">{{ item4.displayName }}</div>
                          <!-- 假设四级为最后一级 -->
                          <div class="heng-line right"
                               :class="{ right4__custom: item4.childList.length === 0 }"
                               v-if="item4.indexQueryFlag === '0'"
                               style="position: relative;z-index:100;">
                            <div class="number-icon"
                                 :id="item4.isSelectID"
                                 @click="handleClickChange4(item4, index4)"
                                 v-if="item4.childList[0].indexQueryFlag === '1' &&limit !== item4.isSelectID">{{ item4.childList.length }}</div>
                            <div class="number-icon"
                                 :id="item4.isSelectID"
                                 @click="handleClickChange4(item4, index4)"
                                 v-if="item4.childList[0].indexQueryFlag === '1' &&limit === item4.isSelectID">一</div>
                          </div>
                          <!-- 四级完成情况 -->
                          <div class="overConditionBox4"
                               v-if="item4.childList[0].indexQueryFlag === '1' &&limit === item4.isSelectID">
                            <div class="overCondition4"
                                 :id="getIndexID4(index2, index3, index4)">
                              <div v-for="(item5, index5) in item4.childList"
                                   :key="index5"
                                   class="textMsg">
                                <div class="textMsg-bgc"></div>
                                <div class="heng-line left"></div>
                                <div class="pro-name">
                                  <div>{{ item5.indexName }}</div>
                                </div>
                                <div class="pro-data">
                                  <div class="pro-data-number"
                                       v-if="item5.indexValue!==null">{{ item5.indexValue }}</div>
                                  <div class="pro-data-number"
                                       v-if="item5.indexValue===null">- -</div>
                                  <div class="pro-data-unit">{{ item5.unit }}</div>
                                </div>
                                <div class="shu-line-pro"
                                     v-if="item4.childList.length > 1"></div>
                                <div class="dashed-line-pro"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              <!-- 三级 -->
              <div class="third-big"
                   v-if="item2.childList[0].indexQueryFlag === '0'">
                <div class="third-box"
                     v-for="(item3, index3) in item2.childList"
                     :key="index3">
                  <div class="shu-line-third"
                       v-if="item2.childList.length > 1"></div>
                  <div :class="{
                    twoGradeEJ: exitThree && exitTwo && !exitFour,
                    twoGradeSJ: exitFour && exitThree && exitTwo
                  }"
                       v-if="item3.childList[0].indexQueryFlag === '1'"></div>
                  <div class="heng-line left"></div>
                  <div class="third-title"
                       :class="{
                    miniWidth: exitFour && exitThree && exitTwo,
                    smallWidth: exitThree && exitTwo && !exitFour
                  }">{{ item3.displayName }}</div>
                  <!-- 假设有些只有三级 -->
                  <div class="heng-line right"
                       :class="{ right3__custom: item3.childList.length === 0 }"
                       v-if="item3.indexQueryFlag === '0'"
                       style="position: relative;z-index:100;">
                    <div class="number-icon"
                         :id="item3.isSelectID"
                         @click="handleClickChange4(item3, index3)"
                         v-if="item3.childList[0].indexQueryFlag === '1' &&limit !== item3.isSelectID">{{ item3.childList.length }}</div>
                    <div class="number-icon"
                         :id="item3.isSelectID"
                         @click="handleClickChange4(item3, index3)"
                         v-if="item3.childList[0].indexQueryFlag === '1' &&limit === item3.isSelectID">一</div>
                  </div>
                  <!-- 三级完成情况 -->
                  <div class="overConditionBox3"
                       v-if="item3.childList[0].indexQueryFlag === '1'&&limit === item3.isSelectID">
                    <div class="overCondition3"
                         :id="getIndexID3(index2, index3)">
                      <div v-for="(item4, index4) in item3.childList"
                           :key="index4"
                           class="textMsg">
                        <div class="textMsg-bgc"></div>
                        <div class="heng-line left"></div>
                        <div class="pro-name">
                          <div>{{ item4.indexName }}</div>
                        </div>
                        <div class="pro-data">
                          <div class="pro-data-number"
                               v-if="item4.indexValue!==null">{{ item4.indexValue }}</div>
                          <div class="pro-data-number"
                               v-if="item4.indexValue===null">- -</div>
                          <div class="pro-data-unit">{{ item4.unit }}</div>
                        </div>
                        <div class="shu-line-pro"
                             v-if="item3.childList.length > 1"></div>
                        <div class="dashed-line-pro"></div>
                      </div>
                    </div>
                  </div>
                  <!-- 三级完成特殊情况 -->

                  <!-- 四级 -->
                  <div class="fourth-big"
                       v-if="item3.childList[0].indexQueryFlag === '0'">
                    <div class="fourth-box"
                         v-for="(item4, index4) in item3.childList"
                         :key="index4">
                      <div class="shu-line-fourth"
                           v-if="item3.childList.length > 1"></div>
                      <div class="heng-line left"></div>
                      <div class="fourth-title"
                           :class="{ miniWidth: exitFour && exitThree && exitTwo }">{{ item4.displayName }}</div>
                      <!-- 假设四级为最后一级 -->
                      <div class="heng-line right"
                           :class="{ right4__custom: item4.childList.length === 0 }"
                           v-if="item4.indexQueryFlag === '0'"
                           style="position: relative;z-index:100;">
                        <div class="number-icon"
                             :id="item4.isSelectID"
                             @click="handleClickChange4(item4, index4)"
                             v-if="item4.childList[0].indexQueryFlag === '1' &&limit !== item4.isSelectID">{{ item4.childList.length }}</div>
                        <div class="number-icon"
                             :id="item4.isSelectID"
                             @click="handleClickChange4(item4, index4)"
                             v-if="item4.childList[0].indexQueryFlag === '1' &&limit === item4.isSelectID">一</div>
                      </div>
                      <!-- 四级完成情况 -->
                      <div class="overConditionBox4"
                           v-if="item4.childList[0].indexQueryFlag === '1' &&limit === item4.isSelectID">
                        <div class="overCondition4"
                             :id="getIndexID4(index2, index3, index4)">
                          <div v-for="(item5, index5) in item4.childList"
                               :key="index5"
                               class="textMsg">
                            <div class="textMsg-bgc"></div>
                            <div class="heng-line left"></div>
                            <div class="pro-name">
                              <div>{{ item5.indexName }}</div>
                            </div>
                            <div class="pro-data">
                              <div class="pro-data-number"
                                   v-if="item5.indexValue!==null">
                                {{ item5.indexValue }}
                              </div>
                              <div class="pro-data-number"
                                   v-if="item5.indexValue===null">
                                - -
                              </div>
                              <div class="pro-data-unit">{{ item5.unit }}</div>
                            </div>
                            <div class="shu-line-pro"
                                 v-if="item4.childList.length > 1"></div>
                            <div class="dashed-line-pro"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import areaSelect from '../../../assets/js/areaCascader'
export default {
  mixins: [areaSelect],
  props: {
    natureType: {
      type: Object
    }
  },
  data () {
    return {
      exitFour: false,
      exitTwo: false,
      exitThree: false,
      detail: false,
      mindList: {},
      isUnfold: false,
      isUnfoldName4: '展开',
      limit: -1,
      limitSpecial: -1,
      isSelectID: '',
      params: {
        formType: '',
        province: '440000',
        city: '',
        area: '',
        year: '2020'
      },
      natureTypeName: {},
      exitLine: '',
      loading: true,
      yearOptions: [
        {
          value: 2020,
          label: 2020
        },
        {
          value: 2019,
          label: 2019
        },
        {
          value: 2018,
          label: 2018
        },
        {
          value: 2017,
          label: 2017
        },
        {
          value: 2016,
          label: 2016
        },
        {
          value: 2015,
          label: 2015
        }
      ]
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    areaSelect () {
      if (this.areaSelectedOptions.length == 1) {
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = ''
        this.params.area = ''
      } else if (this.areaSelectedOptions.length == 2) {
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = this.areaSelectedOptions[1]
        this.params.area = ''
      } else if (this.areaSelectedOptions.length == 3) {
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = this.areaSelectedOptions[1]
        this.params.area = this.areaSelectedOptions[2]
      } else if (this.areaSelectedOptions.length == 0) {
        this.params.province = ''
        this.params.city = ''
        this.params.area = ''
      }
    },
    handleChangeYear (val) {
      this.params.year = val.value
    },
    getOverviewData () {
      this.loading = true
      this.exitTwo = false
      this.exitThree = false
      this.exitFour = false
      let params = this.params
      params['formType'] = this.natureTypeName.key
      this.$get('/epf-onemap/indexTree/findTree', params).then(res => {
        if (res.code === 0) {
          this.mindList = res.result
          for (var key2 in this.mindList.childList) {
            if (!this.mindList.childList[key2].isSelectID) {
              this.$set(
                this.mindList.childList[key2],
                'isSelectID',
                Math.round(Math.random() * 10000)
              )
            }
            if (!this.mindList.childList[key2].isSpecialID) {
              this.$set(
                this.mindList.childList[key2],
                'isSpecialID',
                Math.round(Math.random() * 10000)
              )
            }
            if (!this.mindList.childList[key2].isUnfold) {
              this.$set(
                this.mindList.childList[key2],
                'isUnfold', true
              )
            }
            this.limit = this.mindList.childList[0].isSelectID

            // if (!this.mindList.childList[key2].isTeshu) {
            //   if (this.mindList.childList[key2].treeCode === 'gtkjytgzqk_ghxkqk') {
            //     this.$set(this.mindList.childList[key2], 'isTeshu', true)
            //   } else {
            //     this.$set(this.mindList.childList[key2], 'isTeshu', false)
            //   }
            // }
            // console.log(this.mindList.childList[key2])

            // 三级
            if (this.mindList.childList[key2].childList) {
              this.exitTwo = true
              for (var key3 in this.mindList.childList[key2].childList) {
                if (!this.mindList.childList[key2].childList[key3].isSelectID) {
                  this.$set(
                    this.mindList.childList[key2].childList[key3],
                    'isSelectID',
                    Math.round(Math.random() * 10000)
                  )
                }
                if (!this.mindList.childList[key2].childList[key3].isSpecialID) {
                  this.$set(
                    this.mindList.childList[key2].childList[key3],
                    'isSpecialID',
                    Math.round(Math.random() * 10000)
                  )
                }
                if (!this.mindList.childList[key2].childList[key3].isUnfold) {
                  this.$set(
                    this.mindList.childList[key2].childList[key3],
                    'isUnfold', true
                  )
                }
                // if (!this.mindList.childList[key2].childList[key3].isTeshu) {
                //   if (this.mindList.childList[key2].childList[key3].parentTreeCode === 'gtkjytgzqk_ghxkqk') {
                //     this.$set(this.mindList.childList[key2].childList[key3], 'isTeshu', true)
                //   } else {
                //     this.$set(this.mindList.childList[key2].childList[key3], 'isTeshu', false)
                //   }
                // }
                // console.log(this.mindList.childList[key2].childList[key3])
                // 四级
                if (this.mindList.childList[key2].childList[key3].childList) {
                  this.exitThree = true
                  for (var key4 in this.mindList.childList[key2].childList[key3].childList) {
                    if (!this.mindList.childList[key2].childList[key3].childList[key4].isSelectID) {
                      this.$set(
                        this.mindList.childList[key2].childList[key3].childList[key4],
                        'isSelectID',
                        Math.round(Math.random() * 10000)
                      )
                    }
                    if (!this.mindList.childList[key2].childList[key3].childList[key4].isSpecialID) {
                      this.$set(
                        this.mindList.childList[key2].childList[key3].childList[key4],
                        'isSpecialID',
                        Math.round(Math.random() * 10000)
                      )
                    }
                    if (!this.mindList.childList[key2].childList[key3].childList[key4].isUnfold) {
                      this.$set(
                        this.mindList.childList[key2].childList[key3].childList[key4],
                        'isUnfold', true
                      )
                    }
                    // 五级
                    if (
                      this.mindList.childList[key2].childList[key3].childList[key4].childList) {
                      this.exitFour = true
                      // for (var key5 in this.mindList.childList[key2].childList[key3].childList[key4].childList) {
                      //   console.log(this.mindList.childList[key2].childList[key3].childList[key4].childList[key5])
                      // }
                    }
                  }
                }
              }
            }
          }
          this.loading = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    childBack (val) {
      this.detail = val
    },
    resetFilter () {
      this.areaSelectedOptions = ['440000']
      this.params.province = '440000'
      this.params.city = ''
      this.params.area = ''
      this.params.year = '2020'
      this.getOverviewData()
    },
    pushTo () {
      this.$emit('push', this.areaSelectedOptions, this.params.year)
    },
    searchList () {
      this.getOverviewData()
    },

    handleClickChange3 () {
      this.isUnfold = !this.isUnfold
    },
    handleClickChange4 (item4, index4) {
      if (item4.isSelectID === this.limit) {
        this.limit = -1
      } else {
        this.limit = item4.isSelectID
      }
    },
    handleClickSpecialChange (item4, index4) {
      if (item4.isSpecialID === this.limitSpecial) {
        this.limitSpecial = -1
      } else {
        this.limitSpecial = item4.isSpecialID
      }
    },
    getIndexID2 (index2) {
      return 'change2_' + index2
    },
    getIndexID3 (index2, index3) {
      return 'change3_' + index2 + index3
    },
    getIndexID4 (index2, index3, index4) {
      return 'change4_' + index2 + index3 + index4
    }
  },
  created () {
    this.natureTypeName = this.natureType
    this.getOverviewData()
  },
  mounted () {
    this.natureTypeName = this.natureType
  },
  watch: {
    // 'params': {
    //   immediate: true,
    //   deep: true,
    //   handler (val) {
    //     this.getOverviewData()
    //   }
    // },
    natureType (val) {
      this.natureTypeName = val
      this.$refs.myScrollbar.wrap.scrollTop = 0
    }
  }
}
</script>
<style scoped>
.mindOMC {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 16px 24px;
  /* box-shadow: 1px 2px 5px 2px rgba(236, 236, 236, 0.5); */
  /* margin: 16px 24px;
  padding-bottom: 1px; */
}
.page-body {
  position: relative;
  width: 100%;
  min-height: 734px;
  /* background:rgba(252,252,252,1); */
  /* border-radius:2px;
border:1px solid rgba(231,231,231,1); */
  /* background-color: aquamarine; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* margin: 20px; */
  color: rgba(101, 101, 101, 1);
  border-top: 0;
  /* margin: 15px; */
}
.first-title {
  padding: 45px 20px;
  border: 1px solid rgba(201, 201, 201, 1);
  border-radius: 6px;
  color: rgba(101, 101, 101, 1);
  background-color: rgba(255, 255, 255, 1);
  writing-mode: vertical-rl;
  font-size: 20px;
  line-height: 22px;
  line-height: 27px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  width: 60px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 1);
}
.heng-line {
  width: 24px;
  min-width: 24px;
  max-width: 24px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
  position: relative;
}
.item3_heng {
  width: 320px;
  min-width: 320px;
  max-width: 320px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
}
.twoGradeEJ {
  width: 0px;
  min-width: 0px;
  max-width: 0px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
}
.twoGradeSJ {
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
}
.oneGradeYJ {
  width: 0px;
  min-width: 0px;
  max-width: 0px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
}
.oneGradeSpecial {
  width: 0px;
  min-width: 0px;
  max-width: 0px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
}
.oneGradeEJ {
  width: 320px;
  min-width: 320px;
  max-width: 320px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
}
.oneGradeSJ {
  width: 600px;
  min-width: 600px;
  max-width: 600px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
}
.twoGrade {
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
}
.left {
  margin-right: 16px;
}
.right {
  margin-left: 16px;
}
.miniWidth {
  width: 220px;
  min-width: 220px;
  max-width: 220px;
  min-height: 50px;
}
.smallWidth {
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  min-height: 50px;
}
.mediumWidth {
  width: 260px;
  min-width: 260px;
  max-width: 260px;
  min-height: 50px;
}
.second-title {
  padding: 12px 20px;
  border: 1px solid rgba(201, 201, 201, 1);
  border-radius: 6px;
  color: rgba(101, 101, 101, 1);
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  background-color: rgba(255, 255, 255, 1);
  font-size: 18px;
  line-height: 24px;
  text-align: center;
}
.second-box {
  min-width: 320px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-top: 16px;
  margin-bottom: 16px;
}
.shu-line {
  width: 1px;
  height: calc(100% + 16px);
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
  position: absolute;
  left: 0px;
}
.second-big {
  width: calc(100% - 0px);
}
.second-big .second-box:first-of-type {
  margin-top: 0px;
}
.second-big .second-box:last-of-type {
  margin-bottom: 0px;
}
.second-big .second-box:first-of-type .shu-line {
  height: calc(50% + 8px);
  top: 50%;
}
.second-big .second-box:last-of-type .shu-line {
  height: calc(50% + 8px);
  bottom: 50%;
}

.kongSecond {
  width: 596px;
  min-width: 596px;
  max-width: 596px;
  margin: 0 16px;
  height: 1px;
  background-color: #e3f0ff;
  margin-left: 0;
}

.third-title {
  padding: 12px 20px;
  border: 1px solid rgba(201, 201, 201, 1);
  border-radius: 6px;
  color: rgba(101, 101, 101, 1);
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  background-color: rgba(255, 255, 255, 1);
  font-size: 18px;
  line-height: 24px;
  text-align: center;
}
.third-box {
  /* min-width: 320px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-top: 16px;
  margin-bottom: 16px;
}
.shu-line-third {
  width: 1px;
  height: calc(100% + 16px);
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
  position: absolute;
  left: 0px;
}
.shu-line-third-special {
  width: 1px;
  height: 50%;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
  position: absolute;
  left: 0px;
  top: 0px;
}
.third-big {
  width: calc(100% - 320px);
}

.third-big .third-box:first-of-type {
  margin-top: 0px;
}
.third-big .third-box:last-of-type {
  margin-bottom: 0px;
}
.third-big .third-box:first-of-type .shu-line-third {
  height: calc(50% + 8px);
  top: 50%;
}
.third-big .third-box:last-of-type .shu-line-third {
  height: calc(50% + 8px);
  bottom: 50%;
}

.kongThird {
  width: 30px;
  min-width: 30px;
  max-width: 30px;
  margin: 0 16px;
  /* color: red; */
  /* height: 1px; */
  background: rgba(255, 255, 255, 1);
  margin-left: 0;
}
.fourKongThird {
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  margin: 0 16px;
  /* color: red; */
  /* height: 1px; */
  background: rgba(255, 255, 255, 1);
  margin-left: 0;
}
.fourth-title {
  padding: 12px 20px;
  border: 1px solid rgba(201, 201, 201, 1);
  border-radius: 6px;
  color: rgba(101, 101, 101, 1);
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  background-color: rgba(255, 255, 255, 1);
  font-size: 18px;
  line-height: 24px;
  text-align: center;
}
.fourth-box {
  min-width: 320px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-top: 16px;
  margin-bottom: 16px;
}
.shu-line-fourth {
  width: 1px;
  height: calc(100% + 16px);
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
  position: absolute;
  left: 0px;
}

.fourth-big {
  width: calc(100% - 320px);
}

.fourth-big .fourth-box:first-of-type {
  margin-top: 0px;
}
.fourth-big .fourth-box:last-of-type {
  margin-bottom: 0px;
}
.fourth-big .fourth-box:first-of-type .shu-line-fourth {
  height: calc(50% + 8px);
  top: 50%;
}
.fourth-big .fourth-box:last-of-type .shu-line-fourth {
  height: calc(50% + 8px);
  bottom: 50%;
}

.kongFourth {
  width: 15px;
  min-width: 15px;
  max-width: 15px;
  margin: 0 16px;
}

.overConditionBox2 {
  /* width: 400px;
  min-width: 400px;
  max-width: 400px; */
  flex: 1;
  max-width: 500px;
  /* margin-left: 16px; */
  position: relative;
}
/* .overConditionBox2::before {
  content: "";
  width: 24px;
  min-width: 24px;
  max-width: 24px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
  position: absolute;
  left: 0px;
  top: 50%;
  margin-top: -0.5px;
} */
.overCondition2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.overCondition2 span {
  font-size: 14px;
  line-height: 22px;
  margin-right: 50px;
  margin-bottom: 2px;
}
.overCondition3 span:last-of-type {
  margin-right: 0px;
}
.switchIcon2 {
  position: absolute;
  right: 0px;
  top: 10px;
  font-size: 14px;
  z-index: 10;
  cursor: pointer;
}
.unfold2 {
  height: auto;
}
.hike2 {
  max-height: 50px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.overConditionBox3 {
  /* width: 400px;
  min-width: 400px;
  max-width: 400px; */
  flex: 1;
  max-width: 500px;
  /* margin-left: 16px; */
  position: relative;
}
.overConditionBox3-special {
  /* width: 400px;
  min-width: 400px;
  max-width: 400px; */
  flex: 1;
  max-width: 500px;
  min-width: 400px;
  /* margin-left: 16px; */
  position: relative;
}
/* .overConditionBox3::before {
  content: "";
  width: 24px;
  min-width: 24px;
  max-width: 24px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
  position: absolute;
  left: 0px;
  top: 50%;
  margin-top: -0.5px;
} */
.overCondition3 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.overCondition3 span {
  font-size: 14px;
  line-height: 22px;
  margin-right: 50px;
  margin-bottom: 2px;
}
.overCondition3 span:last-of-type {
  margin-right: 0px;
}
.switchIcon3 {
  position: absolute;
  right: 0;
  top: 10px;
  font-size: 14px;
  z-index: 10;
  cursor: pointer;
}
.unfold3 {
  height: auto;
}
.hike3 {
  max-height: 50px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.overConditionBox4 {
  /* width: 400px;
  min-width: 400px;
  max-width: 400px; */
  flex: 1;
  max-width: 500px;
  /* margin-left: 16px; */
  position: relative;
}
/* .overConditionBox4::before {
  content: "";
  width: 24px;
  min-width: 24px;
  max-width: 24px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
  position: absolute;
  left: 0px;
  top: 50%;
  margin-top: -0.5px;
} */
.overCondition4 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.overCondition4 span {
  font-size: 14px;
  line-height: 22px;
  margin-right: 50px;
  margin-bottom: 2px;
}
.overCondition4 span:last-of-type {
  margin-right: 0px;
}
.switchIcon4 {
  position: absolute;
  right: 0px;
  top: 10px;
  font-size: 14px;
  z-index: 10;
  cursor: pointer;
}
.unfold4 {
  height: auto;
}
.hike4 {
  max-height: 50px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.textMsg {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: rgba(101, 101, 101, 1);
  width: 100%;
  height: 50px;
  position: relative;
  z-index: 50;
  /* padding-left: 24px; */
}
.textMsgSpecial {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: rgba(101, 101, 101, 1);
  width: 100%;
  height: auto;
  position: relative;
  z-index: 50;
}
.textMsg-bgc {
  width: calc(100% - 40px);
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 49;
}
/* .textMsg-bgc:hover {
  background: rgba(27, 116, 238, 0.2);
} */
/* .pro-name:hover {
  color: #1b74ee;
} */
.select-color {
  color: #50a5f4;
}
.first-title,
.second-title,
.third-title,
.fourth-title {
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  border: 1px solid rgba(201, 201, 201, 1);
}
.kongSecondTitle {
  width: 120px;
  max-width: 120px;
  min-width: 120px;
}
.kongThirdTitle {
  width: 120px;
  max-width: 120px;
  min-width: 120px;
}
#triangle-left {
  color: #50a5f4;
  transform: rotate(-90deg);
}
#triangle-down {
  color: #50a5f4;
  transform: rotate(180deg);
}
.margin200 {
  margin-left: 365px;
}
.kongSecPro {
  width: 30px;
  min-width: 30px;
  max-width: 30px;
  margin: 0 16px;
  background: rgba(255, 255, 255, 1);
  margin-left: 0;
}
.nonkongSecPro {
  width: 370px;
  min-width: 370px;
  max-width: 370px;
  margin: 0 16px;
  background: rgba(255, 255, 255, 1);
  margin-left: 0;
}
.wrap_twotitle {
  position: relative;
  margin: 15px;
  display: flex;
  justify-content: space-between;
  height: 30px;
}
.wrap_body {
  display: flex;
  flex-direction: column;
  background: rgba(252, 252, 252, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.exitFourthLine {
  min-height: 734px;
  width: 1px;
  background: rgba(242, 241, 241, 1);
  position: absolute;
  left: 1040px;
  height: 100%;
}
.exitThirdLine {
  min-height: 734px;
  width: 1px;
  background: rgba(242, 241, 241, 1);
  position: absolute;
  left: 735px;
  height: 100%;
}
.primary_search {
  width: 96px;
  height: 40px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
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
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.do-text3 {
  font-size: 18px;
  position: absolute;
  left: 735px;
}
.do-text4 {
  font-size: 18px;
  position: absolute;
  left: 1050px;
}
/* 添加加减号 */
.mindOMC .el-icon-circle-plus-outline {
  font-size: 20px;
  color: #1b74ee;
  position: absolute;
  top: -25px;
  left: 2px;
  cursor: pointer;
}
.plus-change .el-icon-circle-plus-outline {
  font-size: 20px;
  color: #1b74ee;
  position: absolute;
  top: -25px;
  left: 14px;
  cursor: pointer;
}
.mindOMC .el-icon-remove-outline {
  font-size: 20px;
  color: #1b74ee;
  position: absolute;
  top: -25px;
  left: 2px;
  cursor: pointer;
}
.plus-change .el-icon-remove-outline {
  font-size: 20px;
  color: #1b74ee;
  position: absolute;
  top: -25px;
  left: 14px;
  cursor: pointer;
}
.shu-line-pro {
  width: 1px;
  height: 100%;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
  position: absolute;
  left: 0px;
}
.textMsg:first-of-type .shu-line-pro {
  height: 50%;
  top: 50%;
}
.textMsg:last-of-type .shu-line-pro {
  height: 50%;
  bottom: 50%;
}
.dashed-line-pro {
  width: calc(100% - 40px);
  height: 1px;
  display: inline-block;
  border-top: 1px dashed rgba(201, 201, 201, 1);
  box-sizing: border-box;
  position: absolute;
  right: 0px;
  bottom: 0px;
}
.pro-name {
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.pro-data {
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}
.right2__custom {
  background: transparent;
}
.right3__custom {
  background: transparent;
}
.right4__custom {
  background: transparent;
}
.second-title__custom {
  background: #e9f3ff;
  cursor: pointer;
}
.second-title-color {
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.right2-color {
  background: transparent;
}
.third-title__custom {
  background: #e9f3ff;
  cursor: pointer;
}
.third-title-color {
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.right3-color {
  background: transparent;
}
.fourth-title__custom {
  background: #e9f3ff;
  cursor: pointer;
}
.fourth-title-color {
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.right4-color {
  background: transparent;
}
.number-icon {
  width: 25px;
  height: 25px;
  border-radius: 25px;
  border: 1px solid #1b74ee;
  background-color: #fff;
  position: absolute;
  top: -12.5px;
  left: 12px;
  z-index: 666;
  font-size: 13px;
  color: #1b74ee;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
}
.pro-data-number {
  color: #f7955b;
  font-size: 18px;
}
.pro-data-unit {
  color: #9f9f9f;
  font-size: 14px;
}

.switchHeight_box {
  width: 100%;
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.filter_title_box {
  display: flex;
  justify-content: flex-start;
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
.special-two-box {
  display: flex;
  justify-items: flex-start;
  align-items: center;
  margin: 16px 0;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
@media screen and (max-width: 1800px) and (min-width: 1500px) {
  .heng-line {
    width: 16px;
    min-width: 16px;
    max-width: 16px;
  }
  .first-title {
    margin-right: 8px;
  }
  /* .second-title {
    width: 190px;
    min-width: 190px;
    max-width: 190px;
  }
  .third-title {
    width: 190px;
    min-width: 190px;
    max-width: 190px;
  }
  .fourth-title {
    width: 190px;
    min-width: 190px;
    max-width: 190px;
  } */
  .miniWidth {
    width: 170px;
    min-width: 170px;
    max-width: 170px;
  }
  .smallWidth {
    width: 190px;
    min-width: 190px;
    max-width: 190px;
  }
  .mediumWidth {
    width: 210px;
    min-width: 210px;
    max-width: 210px;
  }
  .oneGradeYJ {
    width: 0px;
    min-width: 0px;
    max-width: 0px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .oneGradeEJ {
    width: 238px;
    min-width: 238px;
    max-width: 238px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .oneGradeSJ {
    width: 435px;
    min-width: 435px;
    max-width: 435px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .twoGradeEJ {
    width: 0px;
    min-width: 0px;
    max-width: 0px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .twoGradeSJ {
    width: 218px;
    min-width: 218px;
    max-width: 218px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .left {
    margin-right: 8px;
  }
  .right {
    margin-left: 8px;
  }
  .item3_heng {
    width: 238px;
    min-width: 238px;
    max-width: 238px;
  }
  .oneGrade {
    width: 476px;
    min-width: 476px;
    max-width: 476px;
  }
  .third-big {
    width: 100%;
  }
  .fourth-big {
    width: 100%;
  }
  .exitFourthLine {
    left: 795px;
  }
  .do-text3 {
    left: 485px;
  }
  .do-text4 {
    left: 800px;
  }
  .dashed-line-pro {
    width: calc(100% - 24px);
  }
  /* .overConditionBox2 {
    margin-left: 8px;
  }
  .overConditionBox3 {
    margin-left: 8px;
  }
  .overConditionBox4 {
    margin-left: 8px;
  } */
  /* .overConditionBox2::before {
    content: "";
    width: 16px;
    min-width: 16px;
    max-width: 16px;
  }
  .overConditionBox3::before {
    content: "";
    width: 16px;
    min-width: 16px;
    max-width: 16px;
  }
  .overConditionBox4::before {
    content: "";
    width: 16px;
    min-width: 16px;
    max-width: 16px;
  } */
  /* .textMsg {
    padding-left: 16px;
  } */
  .shu-line-pro {
    left: 0px;
  }
  .number-icon {
    width: 17px;
    height: 17px;
    border-radius: 17px;
    border: 1px solid #1b74ee;
    background-color: #fff;
    position: absolute;
    top: -8.5px;
    left: 8px;
    z-index: 666;
    font-size: 1px;
    color: #1b74ee;
    text-align: center;
    line-height: 17px;
    cursor: pointer;
  }
  .textMsg-bgc {
    width: calc(100% - 24px);
  }
}
@media screen and (max-width: 1499px) and (min-width: 1200px) {
  /* .wrap_body {
    overflow-x: auto;
  }
  .overConditionBox2 {
    min-width: 500px;
  }
  .overConditionBox3 {
    min-width: 500px;
  }
  .overConditionBox4 {
    min-width: 500px;
  } */
  .overConditionBox2 {
    min-width: 250px;
  }
  .overConditionBox3 {
    min-width: 250px;
  }
  .overConditionBox3-special {
    min-width: 400px;
    max-width: 400px;
  }
  .overConditionBox4 {
    min-width: 250px;
  }
  .heng-line {
    width: 16px;
    min-width: 16px;
    max-width: 16px;
  }
  .first-title {
    margin-right: 8px;
  }
  /* .second-title {
    width: 190px;
    min-width: 190px;
    max-width: 190px;
  }
  .third-title {
    width: 190px;
    min-width: 190px;
    max-width: 190px;
  }
  .fourth-title {
    width: 190px;
    min-width: 190px;
    max-width: 190px;
  } */
  .miniWidth {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
  }
  .smallWidth {
    width: 120px;
    min-width: 120px;
    max-width: 120px;
  }
  .mediumWidth {
    width: 140px;
    min-width: 140px;
    max-width: 140px;
  }
  .oneGradeYJ {
    width: 0px;
    min-width: 0px;
    max-width: 0px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .oneGradeEJ {
    width: 168px;
    min-width: 168px;
    max-width: 168px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .oneGradeSJ {
    width: 296px;
    min-width: 296px;
    max-width: 296px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .twoGradeEJ {
    width: 0px;
    min-width: 0px;
    max-width: 0px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .twoGradeSJ {
    width: 148px;
    min-width: 148px;
    max-width: 148px;
    height: 1px;
    display: inline-block;
    background-color: rgba(201, 201, 201, 1);
  }
  .left {
    margin-right: 8px;
  }
  .right {
    margin-left: 8px;
  }
  .item3_heng {
    width: 238px;
    min-width: 238px;
    max-width: 238px;
  }
  .oneGrade {
    width: 476px;
    min-width: 476px;
    max-width: 476px;
  }
  .third-big {
    width: 100%;
  }
  .fourth-big {
    width: 100%;
  }
  .exitFourthLine {
    left: 795px;
  }
  .do-text3 {
    left: 485px;
  }
  .do-text4 {
    left: 800px;
  }
  .dashed-line-pro {
    width: calc(100% - 24px);
  }
  /* .overConditionBox2 {
    margin-left: 8px;
  }
  .overConditionBox3 {
    margin-left: 8px;
  }
  .overConditionBox4 {
    margin-left: 8px;
  } */
  /* .overConditionBox2::before {
    content: "";
    width: 16px;
    min-width: 16px;
    max-width: 16px;
  }
  .overConditionBox3::before {
    content: "";
    width: 16px;
    min-width: 16px;
    max-width: 16px;
  }
  .overConditionBox4::before {
    content: "";
    width: 16px;
    min-width: 16px;
    max-width: 16px;
  } */
  /* .textMsg {
    padding-left: 16px;
  } */
  .shu-line-pro {
    left: 0px;
  }
  .number-icon {
    width: 17px;
    height: 17px;
    border-radius: 17px;
    border: 1px solid #1b74ee;
    background-color: #fff;
    position: absolute;
    top: -8.5px;
    left: 8px;
    z-index: 666;
    font-size: 1px;
    color: #1b74ee;
    text-align: center;
    line-height: 17px;
    cursor: pointer;
  }
  .textMsg-bgc {
    width: calc(100% - 24px);
  }
}
</style>
