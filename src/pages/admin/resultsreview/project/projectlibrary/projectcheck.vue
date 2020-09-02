<template>
  <div id="proCheck"
       class="page-body EPF-table">
    <div class="filterWrap">
      <div class="tabBox">
        <div class="tabBoxL">

          <el-button-group>
            <el-button :type="this.current==0?'primary':''"
                       @click="turn0">项目基本信息</el-button>
            <el-button :type="this.current==1?'primary':''"
                       @click="turn1">成果数据</el-button>
            <el-button :type="this.current==2?'primary':''"
                       @click="turn2">审批流程和意见</el-button>
            <el-button :type="this.current==3?'primary':''"
                       @click="turn3">成果文本</el-button>
          </el-button-group>
        </div>
        <div class="tabBoxR">

          <div class="primary_checkProject"
               @click="skipHistory">历史报送</div>
          <div class="primary_checkProject"
               @click="skipReport"
               v-if="this.isShowReport==true">审查报告</div>
          <div class="primary_checkProject"
               @click="skipOpinion"
               v-if="this.isShowOpinion==true">填写意见</div>
        </div>
      </div>

      <div v-if="this.current===0">
        <div class="project-title">项目基本情况：</div>
        <el-form :model="projectForm"
                 ref="projectForm"
                 label-width="160px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目编号："
                            prop="projectNo">
                <el-input v-model="projectForm.projectNo"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称："
                            prop="projectName">
                <el-input v-model="projectForm.projectName"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <!-- 项目金额 -->
            <el-col :span="8">
              <el-form-item label="项目金额："
                            prop="itemAmount"
                            style="position: relative;">
                <el-input v-model="projectForm.itemAmount"
                          :disabled="true"
                          style="width:55%;"
                          :maxlength="10">
                  <i slot="suffix"
                     class="itext">万元</i>

                </el-input>
                <a href="javascript:void(0)"
                   @click="toMoneyBZ"
                   class="money-msg">《计费参考标准》</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发起人："
                            prop="insertUserName">
                <el-input v-model="projectForm.insertUserName"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发起人部门："
                            prop="insertUnitName">
                <el-input v-model="projectForm.insertUnitName"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发起时间："
                            prop="insertTime">
                <el-input v-model="projectForm.insertTime"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发起类型："
                            prop="insertType">
                <el-input v-model="projectForm.insertType"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行政区名称：">
                <el-cascader style="width:80%;"
                             :props="props"
                             clearable
                             placeholder=""
                             v-model="areaSelectedOptions"
                             :disabled="true"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行政区代码："
                            prop="administrativeCode">
                <el-input v-model="projectForm.administrativeCode"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目类型："
                            prop="projectTypeName">
                <!-- <el-select v-model="projectForm.projectTypeName"
                             placeholder="请选择项目类型"
                             style="width:80%"
                             @change="projectTypeSelect">
                    <el-option v-for="item in projectTypeList"
                               :key="item.value"
                               :label="item.label"
                               :value="item"></el-option>
                  </el-select> -->
                <el-input v-model="projectForm.projectTypeName"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成果类型："
                            prop="resultType">
                <el-input v-model="projectForm.resultType"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="现状基准年："
                            prop="currentBaseYear">
                <el-input v-model="projectForm.currentBaseYear"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="4">
                  <i slot="suffix"
                     class="itext">年</i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="规划起始年："
                            prop="planStartYear">
                <el-input v-model="projectForm.planStartYear"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="4">
                  <i slot="suffix"
                     class="itext">年</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规划目标年："
                            prop="planTargetYear">
                <el-input v-model="projectForm.planTargetYear"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="4">
                  <i slot="suffix"
                     class="itext">年</i>
                </el-input>
              </el-form-item>
            </el-col>
            <!-- 招投标年月 -->
            <el-col :span="8">
              <el-form-item label="招投标年月："
                            prop="biddingDate">
                <!-- <el-date-picker @change="getBiddingDateTimeClick()"
      type="date"
      value-format="yyyy-MM-dd"
      v-model="biddingDate"
      placeholder="请选择招投标年月"
      style="width:80%;">
    </el-date-picker> -->
                <el-input v-model="biddingDate"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="规划范围："
                            prop="planRange">
                <el-input v-model="projectForm.planRange"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规划面积："
                            prop="planArea">
                <el-input v-model="projectForm.planArea"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="10">
                  <i slot="suffix"
                     class="itext">m²</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规划人口："
                            prop="planPopulation">
                <el-input v-model="projectForm.planPopulation"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="规划年限："
                            prop="planPeriod">
                <el-input v-model="projectForm.planPeriod"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="4">
                  <i slot="suffix"
                     class="itext">年</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批复部门："
                            prop="replyDepartment">
                <el-input v-model="projectForm.replyDepartment"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批复时间："
                            prop="replyTime">
                <!-- <el-date-picker @change="getTimeClick()"
                                  v-model="replyTime"
                                  type="datetime"
                                  placeholder="请选择批复时间"
                                  style="width:80%;"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  :picker-options="pickerOptions"></el-date-picker> -->
                <el-input v-model="replyTime"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="成果版本："
                            prop="resultVersion">
                <el-input v-model="projectForm.resultVersion"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人："
                            prop="contactUser">
                <el-input v-model="projectForm.contactUser"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话："
                            prop="contactPhone">
                <el-input v-model="projectForm.contactPhone"
                          :disabled="true"
                          style="width:80%;"
                          :maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="项目说明：">
              <el-input type="textarea"
                        :maxlength="1000"
                        :minlength="0"
                        @input="descInput"
                        :autosize="{ minRows: 7, maxRows: 7 }"
                        v-model="projectForm.remarks"
                        :disabled="true"
                        style="width:90%;height:165px;"></el-input>
              <span class="numberV"
                    style="color:#999;">{{ txtVal }}/1000</span>
            </el-form-item>
          </el-row>
          <!-- 是否招投标 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否招投标："
                            prop="biddingFlag">
                <el-radio-group v-model="projectForm.biddingFlag">
                  <el-radio :label="1"
                            disabled>是</el-radio>
                  <el-radio :label="0"
                            disabled>否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div class="project-title"
             v-if="projectForm.biddingFlag==1">项目承担单位情况：</div>
        <el-form :model="projectForm.revProjectUndertakerParamList"
                 ref="projectForm.revProjectUndertakerParamList"
                 label-width="220px"
                 v-if="projectForm.biddingFlag==1">
          <div class="unitFormStyle"
               :id="'unitFormStyle'+index"
               v-for="(item, index) in projectForm.revProjectUndertakerParamList"
               :key="index">

            <el-row>
              <el-col :span="12">
                <el-form-item label="编制单位名称："
                              prop="companyName">
                  <!-- <el-autocomplete v-model="projectForm.revProjectUndertakerParamList[index].companyName"
                                     :fetch-suggestions="querySearchAsync"
                                     :debounce='0'
                                     :trigger-on-focus='false'
                                     placeholder="请输入编制单位名称"
                                     @select="handleSelect"
                                     @focus="getFocusUnitMsg(index)"
                                     @blur="getBlurUnitMsg(index)"
                                     style="width:80%;"></el-autocomplete> -->
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].companyName"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位性质："
                              prop="unitNatureName">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].unitNatureName"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同名称：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].contractTitle"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同金额：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].contractAmount"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="10">
                    <i slot="suffix"
                       class="itext">万元</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同范围：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].contractScope"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="推荐名录等级：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].directoryLevelName"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="城乡规划资质等级：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].planningLevelName"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="测绘资质等级：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].mappingLevelName"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="项目负责人姓名：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].projectLeaderName"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目负责人职务：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].projectLeader"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="总人数：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].totalPeople"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="10">
                    <i slot="suffix"
                       class="itext">人</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="直接参与人数：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].joinNumber"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="10">
                    <i slot="suffix"
                       class="itext">人</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="直接参与注册规划师人数：">
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].joinRegisterNumber"
                            :disabled="true"
                            style="width:80%;"
                            :maxlength="10">
                    <i slot="suffix"
                       class="itext">人</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="各专业中级以上人数：">
                  <!-- <el-select v-model="projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].zhname"
                               placeholder="请选择专业"
                               style="width:50%"
                               @change="zhuanyeTypeSelect(dictionary.professional_list,projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].zhname,$event,index)">
                      <el-option v-for="(item, indexZD) in dictionary.professional_list"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="indexZD"></el-option>
                    </el-select> -->
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].zhname"
                            :disabled="true"
                            style="width:50%;"
                            :maxlength="20"></el-input>
                  <el-input v-model="projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].peopleNumber"
                            :disabled="true"
                            style="width:30%;"
                            :maxlength="10">
                    <i slot="suffix"
                       class="itext">人</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div v-for="(t,
                  dex) in item.revProjectUndertakerNumberVoList.slice(1)"
                   :key="dex">
                <el-col :span="12">
                  <el-form-item label="各专业中级以上人数：">
                    <!-- <el-select v-model="t.zhname"
                                 placeholder="请选择专业"
                                 style="width:50%"
                                 @change="zhuanyeTypeSelect(dictionary.professional_list,t.zhname,$event,index)">
                        <el-option v-for="(item, indexZD) in dictionary.professional_list"
                                   :ref="item.zhCn"
                                   :id="item.id"
                                   :dictKey="item.dictKey"
                                   :label="item.zhCn"
                                   :value="item.zhCn"
                                   :key="indexZD"></el-option>
                      </el-select> -->
                    <el-input v-model="t.zhname"
                              :disabled="true"
                              style="width:50%;"
                              :maxlength="20"></el-input>
                    <el-input v-model="t.peopleNumber"
                              :disabled="true"
                              style="width:30%;"
                              :maxlength="10">
                      <i slot="suffix"
                         class="itext">人</i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </div>
        </el-form>

        <!-- 相关附件 -->
        <div class="project-title"
             style="margin-top:6px;">相关附件：</div>
        <div class="fujian-check">
          <div class="fileNameBox-check"
               v-for="(item, index) in correlationList"
               :key="index">
            <img src="../../../../../assets/images/cgsc/PDF.png"
                 class="image-type-icon"
                 v-if="item.extensionName==='pdf'"
                 alt="">
            <img src="../../../../../assets/images/cgsc/PPT.png"
                 class="image-type-icon"
                 v-if="item.extensionName==='ppt'||item.extensionName==='pps'||item.extensionName==='pot'||item.extensionName==='ppa'"
                 alt="">
            <!-- <img src="../../../../../assets/images/cgsc/PSD.png"
                 class="image-type-icon"
                 v-if="item.extensionName==='psd'||item.extensionName==='eps'"
                 alt=""> -->
            <img src="../../../../../assets/images/cgsc/Word.png"
                 class="image-type-icon"
                 v-if="item.extensionName==='doc'||item.extensionName==='docx'"
                 alt="">
            <img src="../../../../../assets/images/cgsc/Excel.png"
                 class="image-type-icon"
                 v-if="item.extensionName==='xls'||item.extensionName==='xlsx'"
                 alt="">
            <img src="../../../../../assets/images/cgsc/文本.png"
                 class="image-type-icon"
                 v-if="item.extensionName==='txt'"
                 alt="">
            <img src="../../../../../assets/images/cgsc/图片.png"
                 class="image-type-icon"
                 v-if="item.extensionName==='png'||item.extensionName==='psd'||item.extensionName==='jpg'||item.extensionName==='gif'"
                 alt="">
            <img src="../../../../../assets/images/cgsc/音频.png"
                 class="image-type-icon"
                 v-if="item.extensionName==='mp3'||item.extensionName==='wma'||item.extensionName==='avi'||item.extensionName==='flv'"
                 alt="">
            <span @click="getFJData(item)">{{ item.documentName }}</span>
          </div>
        </div>
        <!-- <div class="uploadBigBox">
            <div class="uploadTitleBox">
              <el-upload class="fileBox"
                         ref="additionalRef"
                         action="/epf-document/document/upload/"
                         :before-upload="fileFormatChecking"
                         :http-request="annexUpload"
                         :on-success="uploadCorrelationSuccess"
                         :on-error="upLoadError"
                         :on-change="change"
                         :show-file-list="false"
                         :multiple="true">
                <div class="upload-button">上传文件</div>
              </el-upload>

              <span class="flexibleSwitch"
                    @click="flexSwitchCorrelation">
                <i :class="
                    isCorrelationOpen == false
                      ? 'el-icon-caret-left'
                      : 'el-icon-caret-bottom'
                  "></i>
              </span>
            </div>

            <div class="uploadContentBox"
                 v-if="isCorrelationOpen">
              <div class="fileNameBox"
                   v-for="(item, index) in correlationList"
                   :key="index">
                <div style="width:300px;">
                  <i class="el-icon-paperclip"></i>
                  <span>{{ item.documentName }}</span>
                </div>
                <div style="width:70%;">
                  <el-progress :text-inside="true"
                               :stroke-width="20"
                               :percentage="progressing"
                               :status="status"></el-progress>
                </div>
                <i class="el-icon-delete"
                   @click="handleClickDelCorrelationFile(item,index)"></i>
              </div>
            </div>
          </div> -->
      </div>

      <div v-if="this.current===1">
        <!-- <div class="checkTitleBox">
          <div class="checkTitleIcon"></div>
          <div class="checkTitle">成果数据</div>
        </div> -->
        <div style=" position: relative;height:685px;"
             id="projectBox">
          <epf-mapview name="mapapp0"
                       :widgetConf="widgetConf"
                       :linked="true"
                       id="projectOneMap">
            <div class="tree">
              <controllerResourceCommon :data="data5"
                                        :EPFDefaultProps="defaultProps5"
                                        @EPFnodeClick="treeClick5"
                                        :EPFdefaultArray="defaultArray5"
                                        @EPFcheckChange="treeChangeClick"></controllerResourceCommon>
            </div>
            <projectTable :proTableDialog="proTableDialog"
                          :data="tableData"
                          :loading="tableLoading"
                          @closeDialog="proTableDialog = false"></projectTable>
            <!-- <screenshot></screenshot> -->
          </epf-mapview>
        </div>
      </div>
      <div v-if="this.current===2">
        <!-- <div class="checkTitleBox">
          <div class="checkTitleIcon"></div>
          <div class="checkTitle">审批流程和意见</div>
        </div> -->
        <div class="examineBigBox">
          <div class="examineBox">
            <div class="examineOne">任务中心</div>

            <div v-for="(item,index) in this.examineList"
                 :key="index"
                 :class="{examineTwo:item.status==0,examineThree:item.status==1}">
              <div class="examineLine"></div>
              <div class="examineContentBox">
                <div class="examineTitle">{{item.title}}</div>
                <div class="examineContent">
                  <div class="examineContent3">执行人：{{item.name}}</div>
                  <div>办理时间：{{item.time}}</div>
                  <div class="examineContent2">状态：{{item.statusName}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="examineTableBox">
            <!-- <el-button type="primary"
                       plain
                       icon="el-icon-upload2"
                       size="small"

                       class="examineButton">导出</el-button> -->
            <div class="SelectButton">
              <div class="button_kuang">导出</div>
            </div>
            <el-table ref="multipleTable"
                      :data="examineTableList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                      v-loading="loading"
                      element-loading-text="数据加载中"
                      element-loading-background="rgba(255, 255, 255,0.95)"
                      style="width: 100%;min-height:80px;"
                      border
                      stripe>
              <el-table-column label="序号"
                               width="70px"
                               align="center">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column prop="examineHj"
                               label="流程环节"
                               min-width="120"
                               align="center"></el-table-column>
              <el-table-column prop="examinePeople"
                               label="执行人"
                               min-width="150"
                               align="center"></el-table-column>
              <el-table-column prop="examineStart"
                               label="开始时间"
                               min-width="220"
                               align="center"></el-table-column>
              <el-table-column prop="examineEnd"
                               label="结束时间"
                               min-width="220"
                               align="center"></el-table-column>
              <el-table-column prop="examineTime"
                               label="审批历时"
                               min-width="150"
                               align="center"></el-table-column>

              <el-table-column prop="examineMessage"
                               label="审批意见"
                               min-width="350"
                               align="center"></el-table-column>
            </el-table>
            <div style="text-align:right;margin:22px 0px;">
              <el-pagination background
                             layout="total,prev, pager, next,sizes,jumper"
                             :page-sizes="[5,10,15,20]"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :total="this.examineTableList.length"
                             :current-page.sync="currentPage"
                             :page-size="pageSize"></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.current===3">
        <!-- <div class="checkTitleBox">
          <div class="checkTitleIcon"></div>
          <div class="checkTitle">成果文本</div>
        </div> -->

        <div class="SelectButton">
          <!-- <el-button @click="batchExport">批量导出</el-button>
          <el-button icon="el-icon-finished"
                     @click="flexSwitch">筛选类别</el-button> -->
          <div class="button_kuang"
               @click="batchExport">批量导出</div>
          <div class="button_qian"
               @click="flexSwitch">筛选类别</div>
        </div>

        <div class="switchHeight_box"
             v-if="isShow==true">
          <el-row style="margin-bottom:0px;">
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom">文件名称：</span>
              <el-input v-model="filterData.docName"
                        size="small"
                        style="width:calc(100% - 120px);"
                        placeholder="请输入文件名称"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom">文件格式：</span>
              <el-input v-model="filterData.docFormat"
                        size="small"
                        style="width:calc(100% - 120px);"
                        placeholder="请输入文件格式"
                        :maxlength="50"></el-input>
            </el-col>

            <el-col :span="8"
                    class="filter_title_box">
              <span class="filter_title__custom_six">所属流程环节：</span>
              <el-select size="small"
                         v-model="filterData.docFlow"
                         style="width:calc(100% - 155px);"
                         placeholder="全部">
                <el-option label="已完成"
                           value="0"></el-option>
                <el-option label="正在处理中"
                           value="1"></el-option>
                <el-option label="无"
                           value="2"></el-option>
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

        <el-table ref="multipleTable"
                  :data="docList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  style="width: 100%;min-height:80px;margin-top:24px;"
                  border
                  stripe>
          <el-table-column label="序号"
                           width="100px"
                           align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="documentName"
                           label="文件名称"
                           min-width="400"
                           align="center"></el-table-column>
          <el-table-column prop="extensionName"
                           label="文件格式"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="fileSize"
                           label="文件大小"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="fileTypeName"
                           label="文件分类"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column label="操作"
                           min-width="200"
                           fixed="right"
                           align="center">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="handelClickPreview(scope.row)">预览</el-button>
              <el-button type="text"
                         size="small"
                         @click="handelClickUpload(scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination background
                         layout="total,prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10,15,20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="this.docList.length"
                         :current-page.sync="currentPage"
                         :page-size="pageSize"></el-pagination>
        </div>
      </div>

      <!-- <div class="operfirst" style="margin-left:0;margin-top:20px;">
        <span class="button_bg" @click="submitData">确定</span>
      </div>-->

      <!-- 审查报告弹窗 -->
      <el-dialog title="审查报告"
                 :visible.sync="reportVisible"
                 width="40%"
                 :modal="true"
                 :close-on-click-modal="false"
                 :append-to-body="true"
                 class="reportDialog">
        <div class="uploadTitleBigBox">
          <div class="uploadTitleBox">
            <i class="uploadTitleIcon"></i>
            <span class="uploadTitle">审查报告</span>
          </div>

          <div style="font-size: 14px;display: flex;justify-content: space-between; align-items: center;">
            <span style="width:300px;display:inline-block;">审查报告.pdf</span>
            <div style="flex:1;display: flex;justify-content: flex-end;">
              <el-button type="text"
                         @click="reportPreview">预览</el-button>
              <el-button type="text"
                         @click="reportDownload">下载</el-button>
              <el-button type="text"
                         @click="reportUpload">上传</el-button>
            </div>
          </div>

          <div class="uploadTitleBox">
            <i class="uploadTitleIcon"></i>
            <span class="uploadTitle">审查报告在线预览</span>
          </div>

          <img src="../../../../../assets/images/cgsc/reportpreview.png"
               alt
               style="width:100%;"
               v-if="this.isPreview==true" />
        </div>

        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button type="primary"
                     @click="reportSure">确 定</el-button> -->
          <div class="button_shen"
               @click="reportSure">确定</div>
        </div>
      </el-dialog>

      <!-- 填写意见弹窗 -->
      <el-dialog title="审核结果"
                 :visible.sync="opinionVisible"
                 width="40%"
                 :modal="true"
                 :close-on-click-modal="false"
                 :append-to-body="true"
                 class="shenDialog">
        <div class="dialog-tip">
          <span style="font-size:14px;font-weight:bolder;">温馨提示：</span>
          <span>请确认更新审查报告以及补充相关附件</span>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button type="primary"
                     @click="opinionYes">审核通过</el-button>
          <el-button type="warning"
                     @click="opinionNo">审核不通过</el-button> -->
          <div class="button_shen"
               @click="opinionYes">审核通过</div>
          <div style="width:96px;height:40px;"></div>
          <div class="button_shen"
               style="background: #e6a23c;"
               @click="opinionNo">审核不通过</div>
        </div>
      </el-dialog>

      <!-- 审核通过弹窗弹窗 -->
      <el-dialog title="审核通过"
                 :visible.sync="opinionYesVisible"
                 width="40%"
                 :modal="true"
                 :close-on-click-modal="false"
                 :append-to-body="true"
                 class="shenheDialog">
        <el-form :model="opinionYesForm"
                 ref="opinionYesForm"
                 label-width="100px">
          <el-form-item label="下一节点：">
            <el-radio-group v-model="opinionYesForm.nextLinkUser">
              <el-radio label="project_status-00E"
                        v-if="this.nodeSelectLabel=='project_status-00E'">质检失败</el-radio>
              <el-radio label="project_status-000"
                        v-if="this.nodeSelectLabel=='project_status-000'">创建中</el-radio>
              <el-radio label="project_status-001"
                        v-if="this.nodeSelectLabel=='project_status-001'">排队中</el-radio>
              <el-radio label="project_status-002"
                        v-if="this.nodeSelectLabel=='project_status-002'">质检中</el-radio>
              <el-radio label="project_status-003"
                        v-if="this.nodeSelectLabel=='project_status-003'">待派发</el-radio>
              <el-radio label="project_status-004"
                        v-if="this.nodeSelectLabel=='project_status-004'">经办待签收</el-radio>
              <el-radio label="project_status-005"
                        v-if="this.nodeSelectLabel=='project_status-005'">经办审核</el-radio>
              <el-radio label="project_status-006"
                        v-if="this.nodeSelectLabel=='project_status-006'">经办核准待签收</el-radio>
              <el-radio label="project_status-007"
                        v-if="this.nodeSelectLabel=='project_status-007'">经办核准</el-radio>
              <el-radio label="project_status-008"
                        v-if="this.nodeSelectLabel=='project_status-008'">经办复核待签收</el-radio>
              <el-radio label="project_status-009"
                        v-if="this.nodeSelectLabel=='project_status-009'">经办复核</el-radio>
              <el-radio label="project_status-010"
                        v-if="this.nodeSelectLabel=='project_status-010'">主任待签收</el-radio>
              <el-radio label="project_status-011"
                        v-if="this.nodeSelectLabel=='project_status-011'">主任审核</el-radio>
              <el-radio label="project_status-012"
                        v-if="this.nodeSelectLabel=='project_status-012'">待省厅审核</el-radio>
              <el-radio label="project_status-013"
                        v-if="this.nodeSelectLabel=='project_status-013'">省厅审核</el-radio>
              <el-radio label="project_status-014"
                        v-if="this.nodeSelectLabel=='project_status-014'">省厅审核不通过</el-radio>
              <el-radio label="project_status-015"
                        v-if="this.nodeSelectLabel=='project_status-015'">已入库</el-radio>
              <el-radio label="project_status-016"
                        v-if="this.nodeSelectLabel=='project_status-016'">经办审核不通过</el-radio>
              <el-radio label="project_status-017"
                        v-if="this.nodeSelectLabel=='project_status-017'">经办核准不通过</el-radio>
              <el-radio label="project_status-018"
                        v-if="this.nodeSelectLabel=='project_status-018'">经办复核不通过</el-radio>
              <el-radio label="project_status-019"
                        v-if="this.nodeSelectLabel=='project_status-019'">主任审核不通过</el-radio>
              <el-radio label="project_status-020"
                        v-if="this.nodeSelectLabel=='project_status-020'">退回到下级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核人：">
            <el-select v-model="opinionYesForm.userName"
                       placeholder="选择审核人"
                       @change="userSelect"
                       style="width:100%;">
              <el-option v-for="item in userList"
                         :key="item.id"
                         :label="item.username"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核意见：">
            <el-input type="textarea"
                      :maxlength="300"
                      :minlength="0"
                      @input="opinionYesInput"
                      :autosize="{ minRows: 6, maxRows: 6}"
                      v-model="opinionYesForm.remarks"
                      placeholder="请输入至少5个字符"
                      style="width:85%;height:150px;"></el-input>
            <span class="numberV"
                  style="color:#999;">{{opinionYesTxtVal}}/300</span>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button @click="opinionYesCancel">取 消</el-button>
          <el-button type="primary"
                     @click="opinionYesSend('opinionYesForm')">发 送</el-button> -->
          <div class="button_qian"
               @click="opinionYesCancel">取消</div>
          <div style="width:96px;height:40px;"></div>
          <div class="button_shen"
               @click="opinionYesSend('opinionYesForm')">发送</div>
        </div>
      </el-dialog>

      <!-- 审核不通过弹窗弹窗 -->
      <el-dialog title="审核不通过"
                 :visible.sync="opinionNoVisible"
                 width="40%"
                 :modal="true"
                 :close-on-click-modal="false"
                 :append-to-body="true"
                 class="shenheDialog">
        <el-form :model="opinionNoForm"
                 ref="opinionNoForm"
                 label-width="100px">
          <el-form-item label="下一节点：">
            <el-radio-group v-model="opinionNoForm.nextLinkUser">
              <el-radio label="project_status-00E"
                        v-if="this.nodeSelectLabel=='project_status-00E'">质检失败</el-radio>
              <el-radio label="project_status-000"
                        v-if="this.nodeSelectLabel=='project_status-000'">创建中</el-radio>
              <el-radio label="project_status-001"
                        v-if="this.nodeSelectLabel=='project_status-001'">排队中</el-radio>
              <el-radio label="project_status-002"
                        v-if="this.nodeSelectLabel=='project_status-002'">质检中</el-radio>
              <el-radio label="project_status-003"
                        v-if="this.nodeSelectLabel=='project_status-003'">待派发</el-radio>
              <el-radio label="project_status-004"
                        v-if="this.nodeSelectLabel=='project_status-004'">经办待签收</el-radio>
              <el-radio label="project_status-005"
                        v-if="this.nodeSelectLabel=='project_status-005'">经办审核</el-radio>
              <el-radio label="project_status-006"
                        v-if="this.nodeSelectLabel=='project_status-006'">经办核准待签收</el-radio>
              <el-radio label="project_status-007"
                        v-if="this.nodeSelectLabel=='project_status-007'">经办核准</el-radio>
              <el-radio label="project_status-008"
                        v-if="this.nodeSelectLabel=='project_status-008'">经办复核待签收</el-radio>
              <el-radio label="project_status-009"
                        v-if="this.nodeSelectLabel=='project_status-009'">经办复核</el-radio>
              <el-radio label="project_status-010"
                        v-if="this.nodeSelectLabel=='project_status-010'">主任待签收</el-radio>
              <el-radio label="project_status-011"
                        v-if="this.nodeSelectLabel=='project_status-011'">主任审核</el-radio>
              <el-radio label="project_status-012"
                        v-if="this.nodeSelectLabel=='project_status-012'">待省厅审核</el-radio>
              <el-radio label="project_status-013"
                        v-if="this.nodeSelectLabel=='project_status-013'">省厅审核</el-radio>
              <el-radio label="project_status-014"
                        v-if="this.nodeSelectLabel=='project_status-014'">省厅审核不通过</el-radio>
              <el-radio label="project_status-015"
                        v-if="this.nodeSelectLabel=='project_status-015'">已入库</el-radio>
              <el-radio label="project_status-016"
                        v-if="this.nodeSelectLabel=='project_status-016'">经办审核不通过</el-radio>
              <el-radio label="project_status-017"
                        v-if="this.nodeSelectLabel=='project_status-017'">经办核准不通过</el-radio>
              <el-radio label="project_status-018"
                        v-if="this.nodeSelectLabel=='project_status-018'">经办复核不通过</el-radio>
              <el-radio label="project_status-019"
                        v-if="this.nodeSelectLabel=='project_status-019'">主任审核不通过</el-radio>
              <el-radio label="project_status-020"
                        v-if="this.nodeSelectLabel=='project_status-020'">退回到下级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核意见：">
            <el-input type="textarea"
                      :maxlength="300"
                      :minlength="5"
                      @input="opinionNoInput"
                      :autosize="{ minRows: 6, maxRows: 6}"
                      v-model="opinionNoForm.remarks"
                      placeholder="请输入至少5个字符"
                      style="width:85%;height:150px;"></el-input>
            <span class="numberV"
                  style="color:#999;">{{opinionNoTxtVal}}/300</span>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button @click="opinionNoCancel">取 消</el-button>
          <el-button type="primary"
                     @click="opinionNoSend('opinionNoForm')">发 送</el-button> -->
          <div class="button_qian"
               @click="opinionNoCancel">取消</div>
          <div style="width:96px;height:40px;"></div>
          <div class="button_shen"
               @click="opinionNoSend('opinionNoForm')">发送</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import Bus from '../../../../../utils/bus'
import controllerResourceCommon from '../../../onemap/controller/controllerResourceCommon'
import projectTable from './projectTable'

export default {
  name: 'projectcheck',
  data () {
    return {
      routername: '',
      tableData: [
        {
          proName: '现状重点建设项目',
          type: 'JSYG(JSZYG)',
          error: 'JSYG(JSZYG)为多余字段'
        },
        {
          proName: '现状重点建设项目',
          type: 'JSYG(建设用地耕地)',
          error: 'JSYG(建设用地耕地)字段不存在'
        },
        {
          proName: '现状重点建设项目',
          type: 'JSYG(建设用地第一产业用地)',
          error: 'JSYG(建设用地第一产业用地)字段不存在'
        }
      ],
      tableLoading: false,
      active: 0,
      defaultArray5: [],
      data5: [
        {
          id: '0',
          name: '收藏',
          leverl: '0',
          childList: [
            {
              id: '1',
              name: '天河区',
              leverl: '1',
              childList: [
                { id: '4', name: '项目名称-市级总体规划', leverl: '2' },
                {
                  id: '5',
                  name: '目录及文件规范性',

                  serviceStatus: 1
                },
                {
                  id: '6',
                  name: '数据格式正确性',

                  serviceStatus: 1
                }
              ]
            },
            { id: '2', name: '成果质检结果', leverl: '1' },
            { id: '3', name: '空间数据基本检查', leverl: '1' }
          ]
        }
      ],
      defaultProps5: {
        children: 'childList',
        label: 'name',
        isLeaf: 'isLeaf'
      },

      projectForm: {
        id: '', // 项目ID
        projectNo: '', // 项目编号
        projectName: '', // 项目名称

        projectType: '', // 项目类型id
        projectTypeName: '', // 项目类型

        insertUserName: '', // 发起人
        insertTime: '', // 发起时间
        insertUnitName: '', // 发起人部门
        insertType: '', // 发起类型

        administrativeCode: '', // 行政区代码
        resultType: '', // 成果类型
        currentBaseYear: '', // 现状基准年
        planStartYear: '', // 规划起始年
        planTargetYear: '', // 规划目标年
        planRange: '', // 规划范围
        planArea: '', // 规划面积
        planPopulation: '', // 规划人口
        planPeriod: '', // 规划年限
        resultVersion: '', // 成果版本
        replyDepartment: '', // 批复部门
        replyTime: '', // 批复时间
        contactUser: '', // 联系人
        contactPhone: '', // 联系电话
        remarks: '', // 项目说明
        biddingFlag: '', // 是否招投标
        biddingDate: '', // 招投标年月
        planningProvince: '', // 规划省
        planningCity: '', // 规划市
        planningArea: '', // 规划区
        itemAmount: '', // 项目金额
        revProjectUndertakerParamList: [
          {
            preparatUnitId: '', // 编制单位ID
            companyName: '', // 编制单位名称
            contractAmount: '', // 合同金额
            contractTitle: '', // 合同名称
            contractScope: '', // 合同范围
            projectLeader: '', // 项目负责人职务
            projectLeaderName: '', // 项目负责人姓名
            joinNumber: '', // 直接参与人数
            joinRegisterNumber: '', // 直接参与注册规划师人数
            unitNatureName: '', // 单位性质
            totalPeople: '', // 总人数
            planningLevelName: '', // 城乡规划资质等级
            mappingLevelName: '', // 测绘资质
            directoryLevelName: '', // 推荐名录等级
            revProjectUndertakerNumberVoList: [
              {
                name: '', // 专业名称id
                zhname: '', // 专业名称
                peopleNumber: '' // 人数
              }
            ]
          }
        ]
        // revProjectFileEntityList: []
      },
      areaSelectedOptions: [],
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
      replyTime: '',
      biddingDate: '',
      txtVal: '',
      correlationList: [], // 相关附件

      isDatabaseOpen: true,
      isVectorOpen: true,
      isGridOpen: true,
      isDocOpen: true,
      isTableOpen: true,
      isExplainOpen: true,

      count: '', // 倒计时
      current: 0,
      examineList: [
        {
          title: '经办人',
          name: '杨紫',
          time: '2019-10-10',
          status: 0,
          statusName: '已完成'
        },
        {
          title: '审核人',
          name: '李主任',
          time: '2019-10-12',
          status: 1,
          statusName: '正在处理中'
        },
        {
          title: '审批人',
          name: '宋院长',
          time: '无',
          status: 1,
          statusName: '无'
        }
      ],
      examineTableList: [
        {
          examineHj: '环节1',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          examineHj: '环节2',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          examineHj: '环节3',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          examineHj: '环节4',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          examineHj: '环节5',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          examineHj: '环节6',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          examineHj: '环节7',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          examineHj: '环节8',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          examineHj: '环节9',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        },
        {
          examineHj: '环节10',
          examinePeople: '章紫',
          examineStart: '2019-10-10 10：10：10',
          examineEnd: '2019-10-12 10：10：10',
          examineTime: '2天1小时',
          examineMessage: '质检结果反馈没问题，规划文本核实没问题'
        }
      ],
      docList: [
        {
          docName: '属重点项目的证明文件',
          docformat: 'pdf',
          docSize: '12 MB',
          docType: '矢量数据'
        },
        {
          docName: '调出地块不涉及建设用地的红头说明',
          docformat: 'pdf',
          docSize: '12 MB',
          docType: '栅格数据'
        },
        {
          docName: '拟定征求意见函及复函',
          docformat: 'rar',
          docSize: '12 MB',
          docType: '表格数据'
        },
        {
          docName: '编制镇级规划修改方案',
          docformat: 'pdf',
          docSize: '12 MB',
          docType: '数据库建设文档'
        },
        {
          docName: '拍现场照片',
          docformat: 'jpg',
          docSize: '102 KB',
          docType: '文档数据'
        },
        {
          docName: '听证会文件',
          docformat: 'jpg',
          docSize: '102 KB',
          docType: '说明文档'
        },
        {
          docName: '征求意见函及复函',
          docformat: 'pdf',
          docSize: '102 KB',
          docType: '成果数据基本信息'
        },
        {
          docName: '听证通知书回执',
          docformat: 'pdf',
          docSize: '102 KB',
          docType: '批复文件'
        },
        {
          docName: '项目用地规模和用地标准的红头说明',
          docformat: 'pdf',
          docSize: '102 KB',
          docType: '审查报告'
        },
        {
          docName: '确定调入、调出地块界线',
          docformat: 'pdf',
          docSize: '102 KB',
          docType: '审查报告'
        }
      ],

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      filterData: {
        docName: '',
        docFormat: '',
        docFlow: ''
      },

      widgetConf: {
        widgets: [
          {
            name: 'Compass',
            position: 'top-right'
          },
          {
            name: 'Home',
            position: 'top-right'
          },
          {
            name: 'ScaleBar',
            position: 'bottom-left'
          },
          {
            name: 'BasemapGallery',
            position: 'top-right'
          }
        ]
      },
      isShow: false,
      data: {},
      reportVisible: false,
      isPreview: false,

      opinionVisible: false,
      opinionYesVisible: false,
      opinionNoVisible: false,
      txtVal: '',
      opinionYesForm: {
        nextLinkUser: '',
        remarks: '',
        user: '',
        userName: '',
        opt: 'APPROVE'
      },
      opinionparams: {},
      userList: [],
      nodeSelectLabel: '',
      opinionYesTxtVal: 0,
      opinionNoTxtVal: 0,
      opinionNoForm: {
        nextLinkUser: '',
        remarks: '',
        opt: 'APPROVED_NOT'
      },

      proTableDialog: false,

      isShowReport: '', // 是否显示审查报告
      isShowOpinion: '' // 是否显示填写意见
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    treeChangeClick (obj, bol, have) {
      this.proTableDialog = bol
    },
    turn0 () {
      this.current = 0
    },
    turn1 () {
      this.current = 1
    },
    turn2 () {
      this.current = 2
      this.currentPage = 1
      this.pageNo = 1
      this.pageSize = 5
    },
    turn3 () {
      this.current = 3
      this.currentPage = 1
      this.pageNo = 1
      this.pageSize = 5
    },

    handelClickPreview () { },
    handelClickUpload () { },
    handleSizeChange (val) {
      // 每页条数改变时触发
      // this.pageSize = val // 显示条数改变
      // this.getList()
      this.$data.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      // this.pageNo = val // 页码改变
      // this.getList()
      this.currentPage = val // 页码改变
    },

    flexSwitch () {
      setTimeout(() => {
        this.isShow = !this.isShow
      }, 100)
    },
    batchExport () { },
    treeClick5 () {
      console.log(1)
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    prev () {
      if (this.active-- < 0) this.active = 2
    },
    format (percentage) {
      return percentage === 100 ? '15MB' : `${percentage}%`
    },
    descInput () {
      this.txtVal = this.projectForm.remarks.length
    },
    opinionYesInput () {
      this.opinionYesTxtVal = this.opinionYesForm.remarks.length
    },
    opinionNoInput () {
      this.opinionNoTxtVal = this.opinionNoForm.remarks.length
    },
    // 历史报送
    skipHistory () {
      let title = '历史报送'
      let routerPath = 'historysubmission'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    // 审查报告
    skipReport () {
      this.reportVisible = true
    },
    reportSure () {
      this.reportVisible = false
    },
    reportPreview () {
      this.isPreview = true
    },
    reportDownload () { },
    reportUpload () {
      let id = this.$route.query.id
      let title = '附件上传'
      let routerPath = 'reportupload'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({
        path: routerPath,
        query: { id: id, isShowReport: true, isShowOpinion: true }
      })
    },
    // 填写意见
    skipOpinion () {
      this.opinionVisible = true
    },
    // 填写意见--同意审核
    async opinionYes () {
      this.opinionVisible = false
      this.opinionYesForm = {
        nextLinkUser: '',
        remarks: '',
        user: '',
        userName: '',
        opt: 'APPROVE'
      }
      this.opinionYesVisible = true
      let projectId = this.$route.query.id
      let res = await this.$get(
        `/epf-result-review/task/getTodoNextLink?projectId=${projectId}&opt=APPROVE`
      )
      this.userList = res.result.userList
      this.nodeSelectLabel = res.result.nextLink
    },
    userSelect (val) {
      this.opinionYesForm.user = val.id
      this.opinionYesForm.userName = val.username
    },
    opinionYesCancel () {
      this.$message.info('审核通过信息已取消!')
      this.opinionYesVisible = false
      this.opinionYesTxtVal = 0
    },
    opinionYesSend (formName) {
      if (this.opinionYesForm.remarks.length < 5) {
        this.$message.error('审核意见请输入至少5个字符')
        return
      } else {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            this.opinionparams[
              'nextLinkUser'
            ] = this.opinionYesForm.nextLinkUser
            this.opinionparams['opt'] = this.opinionYesForm.opt
            this.opinionparams['remarks'] = this.opinionYesForm.remarks
            this.opinionparams['projectId'] = this.$route.query.id
            let params = this.opinionparams
            this.$post('/epf-result-review/task/todoReview', params).then(
              res => {
                console.log(res)
                if (res.code == 0) {
                  this.opinionYesVisible = false
                  this.opinionYesTxtVal = 0
                  this.$message.success('审核通过信息已发送!')
                  this.isShowOpinion = false
                } else {
                  this.opinionYesTxtVal = 0
                  this.$message.error(res.msg) // 失败
                  return
                }
                this.nodeSelectLabel = ''
              }
            )
          }
        })
      }
    },
    // 填写意见--不同意审核
    async opinionNo () {
      this.opinionVisible = false
      this.opinionNoForm = {
        nextLinkUser: '',
        remarks: '',
        opt: 'APPROVED_NOT'
      }
      this.opinionNoVisible = true
      let projectId = this.$route.query.id
      let res = await this.$get(
        `/epf-result-review/task/getTodoNextLink?projectId=${projectId}&opt=APPROVED_NOT`
      )
      this.nodeSelectLabel = res.result.nextLink
    },
    opinionNoCancel () {
      this.$message.info('审核不通过信息已取消!')
      this.opinionNoVisible = false
      this.opinionNoTxtVal = 0
    },
    opinionNoSend (formName) {
      if (this.opinionNoForm.remarks.length < 5) {
        this.$message.error('审核意见请输入至少5个字符')
        return
      } else {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            this.opinionparams[
              'nextLinkUser'
            ] = this.opinionNoForm.nextLinkUser
            this.opinionparams['opt'] = this.opinionNoForm.opt
            this.opinionparams['remarks'] = this.opinionNoForm.remarks
            this.opinionparams['projectId'] = this.$route.query.id
            let params = this.opinionparams
            this.$post('/epf-result-review/task/todoReview', params).then(
              res => {
                if (res.code == 0) {
                  this.opinionNoVisible = false
                  this.opinionNoTxtVal = 0
                  this.$message.success('审核不通过信息已发送!')
                } else {
                  this.opinionNoTxtVal = 0
                  this.$message.error(res.msg) // 失败
                  return
                }
                this.nodeSelectLabel = ''
              }
            )
          }
        })
      }
    },
    submitData () {
      this.$bus.$emit('closeTabsItem', this.$route.name)
    },
    // getMessage (id) {
    //   this.loading = true
    //   this.$get('/epf-result-review/admin/revproject/getProjectDetail', {
    //     id: id
    //   }).then(res => {
    //     console.log(res)
    //     if (res.code == '0') {
    //       this.projectForm = res.result

    //       // 项目类型中文回显
    //       if (res.result.projectType == 'project_type-001') {
    //         this.projectForm.projectTypeName = '总体规划'
    //       } else if (res.result.projectType == 'project_type-002') {
    //         this.projectForm.projectTypeName = '详细规划'
    //       } else if (res.result.projectType == 'project_type-003') {
    //         this.projectForm.projectTypeName = '专项规划'
    //       }

    //       this.$set(this.projectForm, 'protypeName', this.$route.query.status)
    //       this.loading = false
    //     } else {
    //       this.loading = false
    //       this.$message.error(res.msg) // 失败
    //       return
    //     }
    //   })
    // },
    // 跳转计费参考标准
    toMoneyBZ () {
      window.open(
        'https://mp.weixin.qq.com/s?__biz=MzA3MjgyNDIyNw==&mid=2652609652&idx=1&sn=1d13892d2e0c22e04dfe2c7174adad3b&chksm=84f758b8b380d1ae3a509fb48845aa46f4ddca06af846da1911ae2c619bed2adf31ec4203606&mpshare=1&scene=1&srcid=0402JQxCRecSvwszJOoEZULm&sharer_sharetime=1585796102966&sharer_shareid=de067e721fd8667605cef0940a530950&key=8def48700d5022e95856e4038a593e3270f6a84efa4ba5179e4d4cea7b176ef2fa2b956d69afb6eeea12dc08f503d05de042444cfb8d6fee399033e4224848deacd996729699bb991f875933298a28a2&ascene=1&uin=ODk4OTAyNTgw&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=AxjfRkpJsBKN82EoCz3ESUs%3D&pass_ticket=2nRXuXL%2FHiilAPVCU0%2FTodCCuR57DgJl3k263yjuQRcz0TtR2lLbJ6kKch2wjaNx'
      )
    },
    // 根据项目id回显数据
    async getMessage () {
      let id = this.$route.query.id
      let res = await this.$get(
        '/epf-result-review/admin/revproject/getProjectDetail',
        { id: id }
      )
      console.log(res)
      if (res.code === 0) {
        this.projectForm = res.result
        this.projectForm.id = id
        // 回显是否招投标
        if (res.result.biddingFlag === null) {
          this.projectForm.biddingFlag = ''
        } else {
          this.projectForm.biddingFlag = Number(res.result.biddingFlag)
        }
        // 回显项目说明字数
        if (res.result.remarks !== null) {
          this.txtVal = res.result.remarks.length
        } else {
          this.txtVal = 0
        }

        // 回显承担单位信息
        if (res.result.biddingFlag == '1') {
          this.projectForm.revProjectUndertakerParamList = res.result.revProjectUndertakerVoList
          for (var key in this.projectForm.revProjectUndertakerParamList) {
            this.projectForm.revProjectUndertakerParamList[key].unitNatureName = this.projectForm.revProjectUndertakerParamList[key].dictTranslate.unitNatureName
            this.projectForm.revProjectUndertakerParamList[key].planningLevelName = this.projectForm.revProjectUndertakerParamList[key].dictTranslate.planningLevelName
            this.projectForm.revProjectUndertakerParamList[key].directoryLevelName = this.projectForm.revProjectUndertakerParamList[key].dictTranslate.directoryLevelName
            this.projectForm.revProjectUndertakerParamList[key]['projectId'] = id
            for (var ke in this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList) {
              if (this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[ke].name === 'professional_list-001') {
                let index = ke
                this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[index].zhname = '土地管理相关专业'
              } else if (this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[ke].name === 'professional_list-002') {
                let index = ke
                this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[index].zhname = '城乡规划相关专业'
              }
            }
          }
        } else {
          // delete res.result.revProjectUndertakerVoList
          for (var key in res.result.revProjectUndertakerVoList) {
            res.result.revProjectUndertakerVoList[key]['deleteFlag'] = 1
          }
          let unitUpdateList = {}
          unitUpdateList['id'] = this.projectForm.id
          unitUpdateList['projectName'] = this.projectForm.projectName
          unitUpdateList['projectType'] = this.projectForm.projectType
          unitUpdateList['revProjectUndertakerParamList'] = []
          unitUpdateList['revProjectUndertakerParamList'] = res.result.revProjectUndertakerVoList
          axios({
            url: '/api/epf-result-review/admin/revproject/update',
            method: 'POST',
            data: unitUpdateList,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
        }
        console.log(res)
        // 回显批复时间
        if (res.result.replyTime === null) {
          this.replyTime = ''
        } else {
          this.replyTime = res.result.replyTime
        }
        // 回显招投标年月

        if (res.result.biddingDate === null) {
          this.biddingDate = ''
        } else {
          this.biddingDate = res.result.biddingDate
          this.biddingDate = this.biddingDate.substring(0, 10)
        }
        // 回显行政区域
        if (res.result.planningProvince !== null) {
          if (res.result.planningCity !== null) {
            if (res.result.planningArea !== null) {
              this.areaSelectedOptions = [res.result.planningProvince, res.result.planningCity, res.result.planningArea]
            } else {
              this.areaSelectedOptions = [res.result.planningProvince, res.result.planningCity]
            }
          } else {
            this.areaSelectedOptions = [res.result.planningProvince]
          }
        } else {
          this.areaSelectedOptions = []
        }
        if (res.result.administrativeCode === null) {
          res.result.administrativeCode = ''
        }
        console.log(this.areaSelectedOptions)
        // 项目类型中文回显
        let typeRes = await this.$get(`/epf-result-review/revplanningcategorymanage/getRevPlanningType?cantonId=${res.result.administrativeCode}&orgId=${sessionStorage.getItem('orgId')}`)
        for (var i in typeRes.planning) {
          if (typeRes.planning[i].planningTypeId === res.result.projectType) {
            let index = i
            this.projectForm.projectTypeName = typeRes.planning[index].planningTypeName
          }
          // this.projectTypeList.push({
          //   value: typeRes.planning[key].planningTypeId,
          //   label: typeRes.planning[key].planningTypeName
          // })
        }
        // 发起类型中文回显
        if (res.result.insertType == '0') {
          this.projectForm.insertType = '下级上报'
        } else if (res.result.insertType == '1') {
          this.projectForm.insertType = '本级添加'
        }

        // 相关附件文件回显
        let projectId = id
        let xianguanRes = await this.$get(`/epf-result-review/admin/revprojectfile/getByProjectId?projectId=${projectId}&fileType=project_file_type-007`)
        let correlationData = xianguanRes.pager.results
        // 相关附件回显
        for (var key in correlationData) {
          this.correlationList.push({
            documentName: correlationData[key].documentName,
            extensionName: correlationData[key].extensionName,
            fileSize: correlationData[key].fileSize,
            documentId: correlationData[key].documentId,
            fileType: 'project_file_type-007',
            fileid: correlationData[key].id,
            deleteFlag: 0,
            projectId: correlationData[key].projectId
          })
        }
      } else {
        this.$message.error(res.msg) // 失败
        return
      }
    },
    getFJData (item) {
      window.open('/api/epf-document/document/downloadById?id=' + item.documentId)
    },
    getList (id) {
      this.loading = true
      let params = {}
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      params['projectId'] = id
      this.$get(
        '/epf-result-review/admin/revprojectfile/getByProjectId',
        params
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.docList = res.pager.results
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
    }
  },

  components: {
    controllerResourceCommon,
    projectTable
  },
  beforeRouteLeave (to, from, next) {
    if (document.getElementById('projectBox')) {
      document
        .getElementById('projectBox')
        .removeChild(document.getElementById('projectOneMap'))
    }
    next()
  },
  created () {
    this.routername = this.$route.fullPath
    this.isShowReport = this.$route.query.isShowReport
    this.isShowOpinion = this.$route.query.isShowOpinion
    let id = this.$route.query.id

    if (id) {
      this.getMessage(id)
      this.getList(id)
    }
  },
  mounted () {
    Bus.$on('proDetail', val => {
      let id = this.$route.query.id
      if (id) {
        this.getMessage(id)
        this.getList(id)
      }
    })
  },
  // updated() {
  //   this.isShowReport = true
  //   this.isShowOpinion = false
  // },
  watch: {
    // 监听相同路由下参数变化的时候，从而实现异步刷新
    $route (to, from) {
      /** 初始化其他数据 */
      console.log(to)
      console.log(from)
      this.isShowReport = this.$route.query.isShowReport
      this.isShowOpinion = this.$route.query.isShowOpinion
      let id = this.$route.query.id

      if (id) {
        this.getMessage(id)
        this.getList(id)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.filterWrap {
  /* border: 1px solid #f3f3f3; */
  min-height: 789px;
  box-sizing: border-box;
  padding: 16px 24px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filterWrap[data-v-60fb67bb] {
  background: #fff;
}
.switchHeight_box {
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.filter_title_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.filter_title__custom_six {
  box-sizing: border-box;
  width: 125px;
  min-width: 125px;
  max-width: 125px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
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

#proCheck {
  .tabBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    .tabBoxL {
      height: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 50%;
    }
    .tabBoxR {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 50%;
    }
  }
  .checkTitleBox {
    width: 100%;
    height: 50px;
    background-color: #f5f7fa;
    padding: 10px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 40px;
    .checkTitleIcon {
      width: 5px;
      height: 30px;
      display: block;
      background-color: #1082c2;
      margin-right: 20px;
    }
    .checkTitle {
      font-size: 18px;
      font-weight: bolder;
    }
  }
  .uploadTip {
    margin-bottom: 50px;
  }
  .uploadBigBox {
    width: 100%;
    margin-bottom: 50px;
    padding: 0 50px;
    .uploadTitleBox {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      align-items: center;
      .uploadTitleIcon {
        width: 3px;
        height: 20px;
        display: block;
        background-color: #1890ff;
        float: left;
        margin: 0 20px 0 10px;
      }
      .uploadTitle {
        width: 150px;
        font-size: 16px;
        color: #333;
        float: left;
        font-weight: bolder;
        margin-right: 50px;
      }

      .flexibleSwitch {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 20px;
        font-size: 18px;
        color: #1082c2;
      }
    }
    .uploadContentBox {
      width: 100%;
      margin: 30px 0;
      .uploadBox {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 15px 0;
        .uploadContentTitle {
          width: 200px;
          margin-left: 50px;
        }
        .el-icon-circle-close {
          font-size: 16px;
          color: #66b1ff;
        }
      }
    }
  }
  .examineBigBox {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // margin-bottom: 50px;
    width: 100%;
    .examineBox {
      display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 180px;
      .examineOne {
        width: 250px;
        height: 50px;
        border: 1px solid #539ccc;
        display: flex;
        color: #539ccc;
        font-size: 16px;

        justify-content: center;
        align-items: center;
      }
      .examineTwo {
        display: flex;
        // flex-direction: column;
        justify-content: center;
        align-items: center;
        .examineLine {
          min-width: 80px;
          height: 3px;
          background-color: #539ccc;
        }
        .examineContentBox {
          min-width: 250px;
          height: 180px;
          border: 1px solid #539ccc;
          .examineTitle {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #539ccc;
            color: #fff;
            font-size: 16px;
          }
          .examineContent {
            width: 100%;
            height: 130px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            color: #539ccc;
            font-size: 16px;
            .examineContent3 {
              margin-left: 16px;
              margin-bottom: 5px;
            }
            .examineContent2 {
              margin-left: 32px;
              margin-top: 5px;
            }
          }
        }
      }
      .examineThree {
        display: flex;
        // flex-direction: column;
        justify-content: center;
        align-items: center;
        .examineLine {
          min-width: 80px;
          height: 3px;
          background-color: #e2e4e6;
        }
        .examineContentBox {
          min-width: 250px;
          height: 180px;
          border: 1px solid #e2e4e6;
          .examineTitle {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e2e4e6;
            color: #333;
            font-size: 16px;
          }
          .examineContent {
            width: 100%;
            height: 130px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            color: #333;
            font-size: 16px;
            .examineContent3 {
              margin-left: 16px;
              margin-bottom: 5px;
            }
            .examineContent2 {
              margin-left: 32px;
              margin-top: 5px;
            }
          }
        }
      }
    }
    .examineTableBox {
      width: 100%;
      margin-top: 24px;
      .examineButton {
        float: right;
        margin: 0 20px 20px 0;
      }
    }
  }
  .SelectButton {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
  }
  .uploadTitleBox {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    align-items: center;
  }
  .uploadTitleIcon {
    width: 3px;
    height: 20px;
    display: block;
    background-color: #1890ff;
    float: left;
    margin: 0 20px 0 10px;
  }
  .uploadTitle {
    width: 150px;
    font-size: 16px;
    color: #333;
    float: left;
    font-weight: bolder;
    margin-right: 50px;
  }
}

#proCheck .tree {
  width: 25%;
  height: 685px;
  position: absolute;
  background: #fff;
  left: 0;
  top: 0;
}

.primary_checkProject {
  height: 40px;
  padding: 0 24px;
  background: rgba(233, 243, 255, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 32px;
  cursor: pointer;
}
.project-title {
  height: 24px;
  font-size: 18px;
  font-family: MicrosoftYaHeiSemibold;
  color: rgba(164, 164, 164, 1);
  line-height: 24px;
  margin-bottom: 16px;
}
.money-msg {
  display: inline-block;
  height: 40px;
  word-wrap: break-word;
  word-break: normal;
  color: #50a5f4;
  position: absolute;
  left: 60%;
  line-height: 40px;
}
.unitFormStyle {
  width: 100%;
  background: rgba(252, 252, 252, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
  padding-top: 22px;
  margin-bottom: 16px;
  position: relative;
}
.fujian-check {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.fileNameBox-check {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
}
.fileNameBox-check span:hover {
  color: #1b74ee;
  cursor: pointer;
}
.fileNameBox-check .image-type-icon {
  width: 32px;
  height: 32px;
  margin-right: 24px;
}

@media screen and (max-width: 1600px) {
  .money-msg {
    line-height: 20px;
  }
}
</style>
<style>
#proCheck .el-input--small .el-input__inner {
  height: 40px;
  line-height: 40px;
}
#proCheck .el-form-item__label {
  font-size: 16px;
  color: #595959;
}
#proCheck .tabBoxL .el-button {
  border: 1px solid #d9d9d9;
  color: #595959;
  font-weight: 500;
  font-size: 16px;
  padding: 10px;
}
#proCheck .tabBoxL .el-button:focus {
  color: #1b74ee;
  border-color: #1b74ee;
  background-color: #fff;
}
#proCheck .tabBoxL .el-button--primary {
  background-color: #fff;
  color: #1b74ee;
  border-color: #1b74ee;
  z-index: 11;
}

#proCheck .tabBoxL .el-button:hover {
  background-color: #fff;
}

#proCheck .el-input__suffix-inner i {
  display: inline-block;
  width: 40px;
}
#proCheck .el-input__suffix-inner i.itext {
  font-size: 14px;
}
#proCheck .el-input__suffix {
  width: 32px;
}

.reportDialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.reportDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.reportDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.reportDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.reportDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.reportDialog .el-dialog__body .uploadTitleBigBox {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.reportDialog .el-dialog__body .uploadTitleBox {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.reportDialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reportDialog .button_qian,
.reportDialog .button_shen {
  margin-left: 0px;
}
.shenheDialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.shenheDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.shenheDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.shenheDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.shenheDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.shenheDialog .el-dialog__body .el-form {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.shenheDialog .el-dialog__body .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.shenheDialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shenheDialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shenheDialog .button_qian,
.shenheDialog .button_shen {
  margin-left: 0px;
}
.shenDialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.shenDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.shenDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.shenDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.shenDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.shenDialog .el-dialog__body .dialog-tip {
  min-height: 50px;
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.shenDialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shenDialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shenDialog .button_qian,
.shenDialog .button_shen {
  margin-left: 0px;
}
</style>
