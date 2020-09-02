<template>
  <div class="biggest">
    <div class="wrap_top">
      <el-col :span="12"
              style="display: flex;align-items: center;">
        <span>行政区划</span>
        <el-cascader style="width:340px;margin-left:8px;"
                     :props="props"
                     clearable
                     v-model="areaSelectedOptions"
                     @change="handleChange()"></el-cascader>
      </el-col>
      <div>
        <div class="primary_reset"
             @click="resetFilter()">重置</div>
        <div class="primary_search"
             @click="searchList()">搜索</div>
      </div>
    </div>
    <div class="wrap_body">
      <div class="wrap_twotitle">
        <div style="font-size: 18px;">规划清单：</div>
        <div class="do-text4"
             v-if="exitFour">完成情况：</div>
        <div class="do-text3"
             v-if="exitThree && !exitFour">完成情况：</div>
      </div>
      <div class="page-body">
        <div class="exitFourthLine"
             :class="{
          'exitFourthLine': exitFour,
          'exitThirdLine': exitThree && !exitFour
        }"></div>
        <!-- 一级 -->
        <div class="first-title">{{this.planList.name}}</div>
        <div class="heng-line"></div>
        <!-- 二级 -->
        <div class="second-big">
          <div class="second-box"
               v-for="(item2,index2) in planList.childs"
               :key="index2">
            <div class="shu-line"
                 v-show="planList.childs.length>1"></div>
            <div class="oneGrade"
                 v-if="exitFour && item2.childs.length == 0"></div>
            <!-- <div class="twoGrade" v-if="exitFour && item2.childs.length !== 0"></div> -->
            <!-- <div v-for="(child2, index) in item2.childs" :key="index">
          <div v-if="child2.childs.length == 0">123</div>
        </div> -->
            <div class="heng-line left"></div>
            <div class="second-title">{{item2.name}}<span v-show="item2.projects !='' && item2.childs == ''"><span v-if="item2.projects !=null"> ({{ item2.projects.length }})</span></span></div>
            <!-- 假设有些只有二级 -->
            <div class="heng-line right"
                 v-if="item2.childs!=''"></div>

            <!-- <div class="kongSecond"
             v-if="item2.projects!=''"></div> -->
            <div class="switchIcon2"
                 @click="handleClickChange4(item2,index2)"
                 v-if="item2.projects!=''&& item2.isFull===true">
              <!-- <div id="triangle-left"
                   v-if="item2.isUnfoldName == '收缩' && item2.projects!==null"
                   style="transform: rotate(180deg);color:#50a5f4;">▲</div>
              <div id="triangle-down "
                   v-if="item2.isUnfoldName == '展开' && item2.projects!==null"
                   style="transform: rotate(-90deg);color:#50a5f4;">▲</div> -->
              <div class="el-icon-caret-bottom"
                   v-if="item2.isUnfoldName == '收缩' && item2.projects!==null"
                   style="color:#69A5FF;font-size:18px;"></div>
              <div class="el-icon-caret-left"
                   v-if="item2.isUnfoldName == '展开' && item2.projects!==null"
                   style="color:#69A5FF;font-size:18px;"></div>
            </div>

            <!-- 二级完成情况 -->
            <div v-if="item2.childs == ''"
                 :class="{'kongSecPro':exitFour,'nonkongSecPro':!exitFour}"></div>
            <div class="overConditionBox2"
                 :class="{'unfold2':item2.isUnfold,'hike2':!item2.isUnfold}"
                 v-if="item2.projects!=''">
              <div class="overCondition2"
                   :id="getIndexID2(index2)">
                <span v-for="(item3,index3) in item2.projects"
                      :key="index3"
                      class="textMsg"
                      :id="item3.id"
                      @click="handleClickSelect4(item3,index3)">{{item3.projectName}}</span>

              </div>

            </div>

            <!-- 三级 -->
            <div class="third-big"
                 v-if="item2.childs!=''">
              <div class="third-box"
                   v-for="(item3,index3) in item2.childs"
                   :key="index3">
                <div class="shu-line-third"
                     v-if="item2.childs.length>1"></div>
                <div v-if="item3.childs.length == 0 && exitFour"
                     class="item3_heng"></div>
                <div class="heng-line left"></div>
                <div class="third-title">{{item3.name}}<span v-if="item3.projects !=null"> ({{ item3.projects.length }})</span></div>
                <!-- 假设有些只有三级 -->
                <div v-if="item3.projects!='' && item3.childs.length == 0"
                     :class="{'kongThird':exitFour,'fourKongThird':!exitFour}"></div>
                <div class="heng-line right"
                     v-if="item3.childs!=''"></div>
                <div class="switchIcon3"
                     @click="handleClickChange4(item3,index3)"
                     v-if="item3.projects!='' && item3.childs.length == 0 && item3.isFull===true">
                  <!-- <div id="triangle-left"
                       v-if="item3.isUnfoldName == '收缩' && item3.projects!==null"
                       style="transform: rotate(180deg);color:#50a5f4;">▲</div>
                  <div id="triangle-down "
                       v-if="item3.isUnfoldName == '展开' && item3.projects!==null"
                       style="transform: rotate(-90deg);color:#50a5f4;">▲</div> -->
                  <div class="el-icon-caret-bottom"
                       v-if="item3.isUnfoldName == '收缩' && item3.projects!==null"
                       style="color:#69A5FF;font-size:18px;"></div>
                  <div class="el-icon-caret-left"
                       v-if="item3.isUnfoldName == '展开' && item3.projects!==null"
                       style="color:#69A5FF;font-size:18px;"></div>
                </div>

                <!-- 三级完成情况 -->
                <div class="overConditionBox3"
                     :class="{'unfold3':item3.isUnfold,'hike3':!item3.isUnfold}"
                     v-if="item3.projects!=''">
                  <div class="overCondition3"
                       :id="getIndexID3(index2,index3)">
                    <span v-for="(item4,index4) in item3.projects"
                          :key="index4"
                          class="textMsg"
                          :id="item4.id"
                          @click="handleClickSelect4(item4,index4)">{{item4.projectName}}</span>

                  </div>

                </div>

                <!-- 四级 -->
                <div class="fourth-big"
                     v-if="item3.childs!=''">
                  <div class="fourth-box"
                       v-for="(item4,index4) in item3.childs"
                       :key="index4">
                    <div class="shu-line-fourth"
                         v-if="item3.childs.length>1"></div>
                    <div class="heng-line left"></div>
                    <div class="fourth-title">{{item4.name}}<span v-if="item4.projects !=null">({{ item4.projects.length }})</span></div>
                    <div class="switchIcon4"
                         @click="handleClickChange4(item4,index4)"
                         v-if="item4.isFull===true">
                      <!-- <div id="triangle-left"
                           v-if="item4.isUnfoldName == '收缩' && item4.projects!==null"
                           style="transform: rotate(180deg);color:#50a5f4;">▲</div>
                      <div id="triangle-down "
                           v-if="item4.isUnfoldName == '展开' && item4.projects!==null"
                           style="transform: rotate(-90deg);color:#50a5f4;">▲</div> -->
                      <div class="el-icon-caret-bottom"
                           v-if="item4.isUnfoldName == '收缩' && item4.projects!==null"
                           style="color:#69A5FF;font-size:18px;"></div>
                      <div class="el-icon-caret-left"
                           v-if="item4.isUnfoldName == '展开' && item4.projects!==null"
                           style="color:#69A5FF;font-size:18px;"></div>
                    </div>
                    <!-- 假设四级为最后一级,没有横线 -->
                    <!-- <div class="heng-line right"></div> -->
                    <div class="kongFourth"></div>
                    <!-- 四级完成情况 -->
                    <div class="overConditionBox4"
                         :class="{'unfold4':item4.isUnfold,'hike4':!item4.isUnfold}">
                      <div class="overCondition4"
                           :id="getIndexID4(index2,index3,index4)">
                        <span v-for="(item5,index5) in item4.projects"
                              :key="index5"
                              class="textMsg"
                              :id="item5.id"
                              @click="handleClickSelect4(item5,index5)">{{item5.projectName}}</span>
                        <!-- :class="{'select-color':limit===index5&&item5.isSelect}" -->
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
</template>
<script>
import { mapActions, mapState } from 'vuex'
import areaSelect from '../../../../assets/js/areaCascader'
export default {
  mixins: [areaSelect],
  data () {
    return {
      exitFour: false,
      exitTwo: false,
      exitThree: false,
      detail: false,
      planList: {},
      // planList: {
      //   name: "庆历四年春1",
      //   projects: [],
      //   childs: [
      //     {
      //       name: "滕子京谪守巴陵郡1",
      //       projects: [],
      //       childs: [
      //         {
      //           name: "不以物喜，不以己悲，居庙堂之高则忧其民1",
      //           projects: [],
      //           childs: [
      //             {
      //               name: "予尝求古仁人之心1",
      //               childs: [],
      //               projects: [
      //                 {
      //                   name:
      //                     "予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1"
      //                 },
      //                 { name: "予尝求古仁人之心2" },
      //                 { name: "予尝求古仁人之心3" },
      //                 {
      //                   name:
      //                     "予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1"
      //                 },
      //                 { name: "予尝求古仁人之心2" },
      //                 { name: "予尝求古仁人之心3" },
      //                 {
      //                   name:
      //                     "予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1"
      //                 },
      //                 { name: "予尝求古仁人之心2" },
      //                 { name: "予尝求古仁人之心3" }
      //               ]
      //             },
      //             {
      //               name: "予尝求古仁人之心2",
      //               childs: [],
      //               projects: [
      //                 {
      //                   name:
      //                     "予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1"
      //                 },
      //                 { name: "予尝求古仁人之心2" },
      //                 { name: "予尝求古仁人之心3" },
      //                 { name: "予尝求古仁人之心1予尝求古仁人之心1" }
      //               ]
      //             },
      //             {
      //               name: "予尝求古仁人之心3",
      //               childs: [],
      //               projects: [
      //                 {
      //                   name:
      //                     "予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1予尝求古仁人之心1"
      //                 },
      //                 { name: "予尝求古仁人之心2" },
      //                 { name: "予尝求古仁人之心3" },
      //                 { name: "予尝求古仁人之心3" },
      //                 { name: "予尝求古仁人之心1予尝求古仁人之心1" }
      //               ]
      //             }
      //           ]
      //         },
      //         {
      //           name: "不以物喜，不以己悲，居庙堂之高则忧其民2",
      //           projects: [],
      //           childs: [
      //             {
      //               name: "予尝求古仁人之心3",
      //               childs: [],
      //               projects: [
      //                 { name: "予尝求古仁人之心3" },
      //                 { name: "予尝求古仁人之心3" },
      //                 { name: "予尝求古仁人之心3" },
      //                 { name: "予尝求古仁人之心3" },
      //                 { name: "予尝求古仁人之心1予尝求古仁人之心1" }
      //               ]
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       name: "予观夫巴陵胜状1",
      //       projects: [],
      //       childs: [
      //         {
      //           name: "然则何时而乐耶？其必曰“先天下之忧而忧1",
      //           childs: [],
      //           projects: [
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" }
      //           ]
      //         },
      //         {
      //           name: "然则何时而乐耶？其必曰“先天下之忧而忧2",
      //           childs: [],
      //           projects: [
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" }
      //           ]
      //         },
      //         {
      //           name: "然则何时而乐耶？其必曰“先天下之忧而忧3",
      //           childs: [],
      //           projects: [
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       name: "浊浪排浊浪排空1浊浪排空1空1",
      //       projects: [],
      //       childs: [
      //         {
      //           name: "时六年九月十五日",
      //           childs: [],
      //           projects: [
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" }
      //           ]
      //         },
      //         {
      //           name: "时六年九月十五日",
      //           childs: [],
      //           projects: [
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心3" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //             { name: "予尝求古仁人之心1予尝求古仁人之心1" }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       name: "浊浪排空2",
      //       childs: [],
      //       projects: [
      //         { name: "予尝求古仁人之心3" },
      //         { name: "予尝求古仁人之心3" },
      //         { name: "予尝求古仁人之心3" },
      //         { name: "予尝求古仁人之心3" },
      //         { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //         { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //         { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //         { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //         { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //         { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //         { name: "予尝求古仁人之心1予尝求古仁人之心1" },
      //         { name: "予尝求古仁人之心1予尝求古仁人之心1" }
      //       ]
      //     }
      //   ]
      // },
      isUnfold: false,
      isUnfoldName4: '展开',
      limit: -1,
      id: '',
      params: '440000'
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    handleChange () {
      if (this.areaSelectedOptions[2] && this.areaSelectedOptions[1]) {
        this.params = this.areaSelectedOptions[2]
      } else if (this.areaSelectedOptions[1] && !this.areaSelectedOptions[2]) {
        this.params = this.areaSelectedOptions[1]
      }
    },
    getOverviewData () {
      this.$post('/epf-result-review/revplanningcategorymanage/getRevPlanningListingTree?', { cantonId: this.params }).then(res => {
        if (res.code == 0) {
          console.log(res)
          if (res.planningListing[0] == undefined) {
            this.planList = {}
          } else {
            this.planList = res.planningListing[0]
          }
          for (var key2 in this.planList.childs) {
            if (this.planList.childs) {
              this.exitTwo = true
            }
            if (!this.planList.childs[key2].isUnfold) {
              this.$set(this.planList.childs[key2], 'isUnfold', false)
            }
            if (!this.planList.childs[key2].isUnfoldName) {
              this.$set(this.planList.childs[key2], 'isUnfoldName', '展开')
            }
            if (this.planList.childs[key2].childs.length > 0) {
              this.$set(this.planList.childs[key2], 'isUnfoldName', '')
              this.hide2 = false
            }
            if (!this.planList.childs[key2].isFull) {
              if (document.getElementById('change2_' + key2)) {
                let index2 = key2
                if (document.getElementById('change2_' + index2).scrollHeight > 50) {
                  this.$set(
                    this.planList.childs[index2],
                    'isFull',
                    true
                  )
                } else {
                  // let index2 = key2
                  this.$set(
                    this.planList.childs[index2],
                    'isFull',
                    false
                  )
                }
              }
            }
            // 二级
            for (var key3s in this.planList.childs[key2].projects) {
              if (!this.planList.childs[key2].projects[key3s].id) {
                this.$set(
                  this.planList.childs[key2].projects[key3s],
                  'id',
                  Math.round(Math.random() * 10000)
                )
              }
            }

            for (var key3 in this.planList.childs[key2].childs) {
              if (this.planList.childs[key2].childs) {
                this.exitThree = true
              }
              if (!this.planList.childs[key2].childs[key3].isUnfold) {
                this.$set(
                  this.planList.childs[key2].childs[key3],
                  'isUnfold',
                  false
                )
              }
              if (!this.planList.childs[key2].childs[key3].isUnfoldName) {
                this.$set(
                  this.planList.childs[key2].childs[key3],
                  'isUnfoldName',
                  '展开'
                )
              }
              if (!this.planList.childs[key2].childs[key3].isFull) {
                if (document.getElementById('change3_' + key2 + key3)) {
                  let index3 = key3
                  if (document.getElementById('change3_' + key2 + index3).scrollHeight > 50) {
                    // let index33 = index3
                    this.$set(
                      this.planList.childs[key2].childs[index3],
                      'isFull',
                      true
                    )
                  } else {
                    // let index33 = index3
                    this.$set(
                      this.planList.childs[key2].childs[index3],
                      'isFull',
                      false
                    )
                  }
                }
              }
              // console.log(this.planList.childs[key2].childs[key3])
              // 三级
              for (var key4s in this.planList.childs[key2].childs[key3].projects) {
                if (
                  !this.planList.childs[key2].childs[key3].projects[key4s]
                    .id
                ) {
                  this.$set(
                    this.planList.childs[key2].childs[key3].projects[key4s],
                    'id',
                    Math.round(Math.random() * 10000)
                  )
                }
              }
              // 四级
              for (var key4 in this.planList.childs[key2].childs[key3].childs) {
                if (this.planList.childs[key2].childs[key3].childs) {
                  this.exitFour = true
                }
                if (
                  !this.planList.childs[key2].childs[key3].childs[key4].isUnfold
                ) {
                  this.$set(
                    this.planList.childs[key2].childs[key3].childs[key4],
                    'isUnfold',
                    false
                  )
                }
                if (
                  !this.planList.childs[key2].childs[key3].childs[key4]
                    .isUnfoldName
                ) {
                  this.$set(
                    this.planList.childs[key2].childs[key3].childs[key4],
                    'isUnfoldName',
                    '展开'
                  )
                }
                if (!this.planList.childs[key2].childs[key3].childs[key4].isFull) {
                  if (document.getElementById('change4_' + key2 + key3 + key4)) {
                    let index4 = key4
                    if (document.getElementById('change4_' + key2 + key3 + index4).scrollHeight > 50) {
                      this.$set(
                        this.planList.childs[key2].childs[key3].childs[index4],
                        'isFull',
                        true
                      )
                    } else {
                      // let index4 = key4
                      this.$set(
                        this.planList.childs[key2].childs[key3].childs[index4],
                        'isFull',
                        false
                      )
                    }
                  }
                }
                for (var key5 in this.planList.childs[key2].childs[key3].childs[
                  key4
                ].projects) {
                  if (
                    !this.planList.childs[key2].childs[key3].childs[key4]
                      .projects[key5].id
                  ) {
                    this.$set(
                      this.planList.childs[key2].childs[key3].childs[key4]
                        .projects[key5],
                      'id',
                      Math.round(Math.random() * 10000)
                    )
                  }
                }
              }
            }
          }
          this.$forceUpdate()
        }
      })
    },
    childBack (val) {
      this.detail = val
    },
    resetFilter () {
      this.areaSelectedOptions = '广东省'
      this.params = '440000'
      this.getOverviewData()
    },
    searchList () {
      this.getOverviewData()
    },
    handleClickChange4 (item4, index4) {
      item4.isUnfold = !item4.isUnfold
      if (item4.isUnfold === true) {
        item4.isUnfoldName = '收缩'
      } else {
        item4.isUnfoldName = '展开'
      }
    },
    handleClickSelect4 (item5, index5) {
      // this.detail = true
      this.id = item5.id
      let title = '查看项目详情'
      let routerPath = `projectcheck?id=${item5.id}&isShowReport=${false}&isShowOpinion=${false}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: { id: item5.id, isShowReport: false, isShowOpinion: false }
      })
      // if (index5 == this.limit) {
      //   this.limit = -1
      //   item5.isSelect = false
      // } else {
      //   this.limit = index5
      //   item5.isSelect = true
      // }
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
    this.getOverviewData()
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getOverviewData()
      }, 1000)
    })
  },
  watch: {
    id (oldValue, newValue) {
      // oldValue:现在获取的id
      if (oldValue != newValue) {
        document.getElementById(oldValue).style.color = '#50a5f4'
        document.getElementById(newValue).style.color = '#464C58'
      }
    }
  }
}
</script>
<style scoped>
* {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(101, 101, 101, 1);
  line-height: 21px;
}
.biggest {
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 2px 5px 2px rgba(236, 236, 236, 0.5);
  margin: 16px 24px;
  padding-bottom: 1px;
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
  font-family: MicrosoftYaHei;
  line-height: 27px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  width: 45px;
  height: 330px;
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
}
.item3_heng {
  width: 320px;
  min-width: 320px;
  max-width: 320px;
  height: 1px;
  display: inline-block;
  background-color: rgba(201, 201, 201, 1);
}
.oneGrade {
  width: 640px;
  min-width: 640px;
  max-width: 640px;
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
.second-title {
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  padding: 12px 20px;
  border: 1px solid rgba(201, 201, 201, 1);
  border-radius: 6px;
  color: rgba(101, 101, 101, 1);
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  background-color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: MicrosoftYaHei;
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
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  padding: 12px 20px;
  border: 1px solid rgba(201, 201, 201, 1);
  border-radius: 6px;
  color: rgba(101, 101, 101, 1);
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  background-color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: MicrosoftYaHei;
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
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  padding: 12px 20px;
  border: 1px solid rgba(201, 201, 201, 1);
  border-radius: 6px;
  color: rgba(101, 101, 101, 1);
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  background-color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: MicrosoftYaHei;
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
  /* height: 1px;
  background-color: #50a5f4; */
  margin: 0 16px;
}

.overConditionBox2 {
  width: calc(100%-400px);
  /* padding-right: 50px; */
  position: relative;
  border-bottom: 1px dashed #cae1fb;
}
.overCondition2 {
  width: 100%;
  /* min-width: 550px; */
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* padding-bottom: 5px; */
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
  /* min-height: 50px; */
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
  width: calc(100%-400px);
  /* padding-right: 50px; */
  position: relative;
  border-bottom: 1px dashed #cae1fb;
}
.overCondition3 {
  width: 100%;
  /* min-width: 550px; */
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* padding-bottom: 5px; */
}
/* .overConditionBox3 {
  width: 600px;
  position: relative;
}
.overCondition3 {
  width: 550px;
  min-width: 550px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
} */
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
  /* min-height: 50px; */
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
  width: calc(100%-400px);
  /* padding-right: 50px; */
  position: relative;
  border-bottom: 1px dashed #cae1fb;
}
.overCondition4 {
  width: 100%;
  /* min-width: 550px; */
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* padding-bottom: 5px; */
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
  /* min-height: 50px; */
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
  text-decoration: underline;
  /* text-decoration: rgba(80,165,244,1); */
  /* border-bottom: 1px solid rgba(80,165,244,1); */
  /* color: #464c58; */
  color: #1b74ee;
}
.textMsg:hover {
  color: #1b74ee;
  cursor: pointer;
}
.select-color {
  color: #50a5f4;
}
.wrap_top {
  margin-top: 20px;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 8px;
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
  /* color: red; */
  /* height: 1px; */
  background: rgba(255, 255, 255, 1);
  margin-left: 0;
}
.wrap_twotitle {
  position: relative;
  margin: 15px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  /* padding: 20px 460px 20px 15px;
    background-color: white;
    background: rgba(252,252,252,1);
    border-radius: 2px;
    border: 1px solid rgba(231,231,231,1);
    border-bottom: 0; */
}
.wrap_body {
  display: flex;
  flex-direction: column;
  background: rgba(252, 252, 252, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
  margin: 16px;
}
.exitFourthLine {
  min-height: 734px;
  width: 1px;
  background: rgba(242, 241, 241, 1);
  position: absolute;
  /* left: calc(100% - 178px); */
  left: 1040px;
  height: 100%;
}
.exitThirdLine {
  min-height: 734px;
  width: 1px;
  background: rgba(242, 241, 241, 1);
  position: absolute;
  /* left: calc(100% - 178px); */
  left: 735px;
  height: 100%;
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

@media screen and (max-width: 1600px) {
  .heng-line {
    width: 16px;
    min-width: 16px;
    max-width: 16px;
  }
  .first-title {
    margin-right: 8px;
  }
  .second-title {
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
  /* .overConditionBox2 {
    width: 366px;
    min-width: 366px;
    max-width: 366px;
  }
  .overConditionBox3 {
    width: 366px;
    min-width: 366px;
    max-width: 366px;
  } */
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
}
</style>
