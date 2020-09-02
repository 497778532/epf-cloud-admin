<template>
  <div id="proAdd"
       class="page-body">
    <div style="height:0;">
      <el-row ref="backTop"></el-row>
    </div>
    <div style="height:100%;">
      <div class="filterWrap">
        <el-steps :active="active"
                  finish-status="success"
                  simple>
          <el-step title="填写项目信息"></el-step>
          <el-step title="关联项目成果文件"></el-step>
          <el-step title="提交"></el-step>
        </el-steps>

        <div class="firstStep"
             v-if="active===0"
             align-center>
          <div class="project-title">项目基本情况：</div>
          <el-form :model="projectForm"
                   :rules="rules"
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
                            placeholder="请输入项目名称"
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
                            placeholder="请输入金额"
                            style="width:55%;"
                            @input="getInputData0"
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
                               v-model="areaSelectedOptions"
                               @change="areaSelect()"></el-cascader>
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
                  <el-select v-model="projectForm.projectTypeName"
                             placeholder="请选择项目类型"
                             style="width:80%"
                             @change="projectTypeSelect">
                    <el-option v-for="item in projectTypeList"
                               :key="item.value"
                               :label="item.label"
                               :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成果类型："
                              prop="resultType">
                  <el-input v-model="projectForm.resultType"
                            placeholder="请输入成果类型"
                            style="width:80%;"
                            :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="现状基准年："
                              prop="currentBaseYear">
                  <el-input v-model="projectForm.currentBaseYear"
                            placeholder="请输入现状基准年"
                            style="width:80%;"
                            @input="getInputData1"
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
                            placeholder="请输入规划起始年"
                            style="width:80%;"
                            @input="getInputData2"
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
                            placeholder="请输入规划目标年"
                            style="width:80%;"
                            @input="getInputData3"
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
                  <el-date-picker @change="getBiddingDateTimeClick()"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  v-model="biddingDate"
                                  placeholder="请选择招投标年月"
                                  style="width:80%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="规划范围："
                              prop="planRange">
                  <el-input v-model="projectForm.planRange"
                            placeholder="请输入规划范围"
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="规划面积："
                              prop="planArea">
                  <el-input v-model="projectForm.planArea"
                            placeholder="请输入规划面积"
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
                            placeholder="请输入规划人口"
                            style="width:80%;"
                            @input="getInputData4"
                            :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="规划年限："
                              prop="planPeriod">
                  <el-input v-model="projectForm.planPeriod"
                            placeholder="请输入规划年限"
                            style="width:80%;"
                            @input="getInputData5"
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
                            placeholder="请输入批复部门"
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="批复时间："
                              prop="replyTime">
                  <el-date-picker @change="getTimeClick()"
                                  v-model="replyTime"
                                  type="datetime"
                                  placeholder="请选择批复时间"
                                  style="width:80%;"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="成果版本："
                              prop="resultVersion">
                  <el-input v-model="projectForm.resultVersion"
                            placeholder="请输入成果版本"
                            style="width:80%;"
                            :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人："
                              prop="contactUser">
                  <el-input v-model="projectForm.contactUser"
                            placeholder="请输入联系人"
                            style="width:80%;"
                            :maxlength="10"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话："
                              prop="contactPhone">
                  <el-input v-model="projectForm.contactPhone"
                            :maxlength="11"
                            placeholder="请输入联系电话"
                            style="width:80%;"
                            @input="getInputData6"></el-input>
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
                          placeholder="可针对项目进行补充说明"
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
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
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
                 :key="index"
                 :style="{paddingTop:(projectForm.revProjectUndertakerParamList.length > 1?40+'px':22+'px')}">
              <div class="deleteIcon"
                   v-if="projectForm.revProjectUndertakerParamList.length>1">
                <el-tooltip class="item"
                            effect="dark"
                            content="删除该承担单位信息"
                            placement="top-end">
                  <i class="el-icon-circle-close"
                     @click="deleteUnitMsg(item,index)"></i>
                </el-tooltip>
              </div>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="编制单位名称："
                                prop="companyName">
                    <el-autocomplete v-model="projectForm.revProjectUndertakerParamList[index].companyName"
                                     :fetch-suggestions="querySearchAsync"
                                     :debounce='0'
                                     :trigger-on-focus='false'
                                     placeholder="请输入编制单位名称"
                                     @select="handleSelect"
                                     @focus="getFocusUnitMsg(index)"
                                     @blur="getBlurUnitMsg(index)"
                                     style="width:80%;"></el-autocomplete>
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
                              placeholder="请输入合同名称"
                              style="width:80%;"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同金额：">
                    <el-input v-model="projectForm.revProjectUndertakerParamList[index].contractAmount"
                              placeholder="请输入合同金额"
                              style="width:80%;"
                              @input="getCDInputData0(index)"
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
                              placeholder="请输入合同范围"
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
                              placeholder="请输入项目负责人姓名"
                              style="width:80%;"
                              :maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="项目负责人职务：">
                    <el-input v-model="projectForm.revProjectUndertakerParamList[index].projectLeader"
                              placeholder="请输入项目负责人职务"
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
                              placeholder="请输入直接参与人数"
                              style="width:80%;"
                              @input="getCDInputData1(index)"
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
                              placeholder="请输入直接参与注册规划师人数"
                              style="width:80%;"
                              @input="getCDInputData2(index)"
                              :maxlength="10">
                      <i slot="suffix"
                         class="itext">人</i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="各专业中级以上人数：">
                    <el-select v-model="projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].zhname"
                               placeholder="请选择专业"
                               style="width:50%"
                               @change="zhuanyeTypeSelect(dictionary.professional_list,projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].zhname,$event,index,dex,0)">
                      <el-option v-for="(item, indexZD) in dictionary.professional_list"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="indexZD"></el-option>
                    </el-select>
                    <el-input v-model="projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].peopleNumber"
                              style="width:30%;"
                              @input="getCDInputData3(index)"
                              :maxlength="10">
                      <i slot="suffix"
                         class="itext">人</i>
                    </el-input>
                    <i class="el-icon-circle-plus-outline"
                       style="cursor:pointer;"
                       @click="addMajorMsg(index, dex)"></i>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <div v-for="(t,
                  dex) in item.revProjectUndertakerNumberVoList.slice(1)"
                     :key="dex">
                  <el-col :span="12">
                    <el-form-item label="各专业中级以上人数：">
                      <el-select v-model="t.zhname"
                                 placeholder="请选择专业"
                                 style="width:50%"
                                 @change="zhuanyeTypeSelect(dictionary.professional_list,t.zhname,$event,index,dex,1)">
                        <el-option v-for="(item, indexZD) in dictionary.professional_list"
                                   :ref="item.zhCn"
                                   :id="item.id"
                                   :dictKey="item.dictKey"
                                   :label="item.zhCn"
                                   :value="item.zhCn"
                                   :key="indexZD"></el-option>
                      </el-select>
                      <el-input v-model="t.peopleNumber"
                                style="width:30%;"
                                @input="getCDInputData4(index)"
                                :maxlength="10">
                        <i slot="suffix"
                           class="itext">人</i>
                      </el-input>
                      <i class="el-icon-remove-outline"
                         style="cursor:pointer;"
                         @click="removeMajorMsg(index, dex)"></i>
                    </el-form-item>
                  </el-col>
                </div>
              </el-row>
            </div>

            <div class="plus-button"
                 @click="addUnitMsg">添加承担单位</div>
          </el-form>

          <!-- 相关附件 -->
          <div class="project-title">相关附件：</div>
          <div class="uploadBigBox">
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
                <div style="width:300px;display:flex;align-items: center;">
                  <!-- <i class="el-icon-paperclip"></i> -->
                  <img src="../../../../../assets/images/cgsc/PDF.png"
                       class="image-type-icon"
                       v-if="item.extensionName==='pdf'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/PPT.png"
                       class="image-type-icon"
                       v-if="item.extensionName==='ppt'||item.extensionName==='pps'||item.extensionName==='pot'||item.extensionName==='ppa'"
                       alt="">
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
          </div>

          <div class="operfirst"
               id="project-oper">
            <span class="button_qian"
                  @click="cancelForm">取消</span>
            <el-button @click="saveForm('projectForm')"
                       v-preventReClick>保存</el-button>
            <el-button @click="submitForm('projectForm')"
                       v-preventReClick>下一步</el-button>
            <!-- <span class="button_shen"
                  @click="saveForm('projectForm')">保存</span>
            <span class="button_shen"
                  @click="submitForm('projectForm')">下一步</span> -->
          </div>
        </div>

        <div class="Secondstep"
             v-if="active===1"
             align-center>
          <div class="uploadTip">单个文件上传大小不得超过150MB</div>
          <div class="project-title">数据库建设文档：</div>
          <div class="uploadBigBox">
            <div class="uploadTitleBox">
              <el-upload class="fileBox"
                         ref="additionalRef"
                         action="/epf-document/document/upload/"
                         :before-upload="fileFormatChecking"
                         :http-request="annexUpload"
                         :on-success="uploadDataBaseSuccess"
                         :on-error="upLoadError"
                         :on-change="change"
                         :show-file-list="false"
                         :multiple="true">
                <div class="upload-button">上传文件</div>
              </el-upload>

              <span class="flexibleSwitch"
                    @click="flexSwitchDatabase">
                <i :class="isDatabaseOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
              </span>
            </div>

            <div class="uploadContentBox"
                 v-if="isDatabaseOpen">
              <div class="fileNameBox"
                   v-for="(item,index) in datBaseList"
                   :key="index">
                <div style="width:300px;display:flex;align-items: center;">
                  <!-- <i class="el-icon-paperclip"></i> -->
                  <img src="../../../../../assets/images/cgsc/PDF.png"
                       class="image-type-icon"
                       v-if="item.extName==='pdf'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/PPT.png"
                       class="image-type-icon"
                       v-if="item.extName==='ppt'||item.extName==='pps'||item.extName==='pot'||item.extName==='ppa'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Word.png"
                       class="image-type-icon"
                       v-if="item.extName==='doc'||item.extName==='docx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Excel.png"
                       class="image-type-icon"
                       v-if="item.extName==='xls'||item.extName==='xlsx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/文本.png"
                       class="image-type-icon"
                       v-if="item.extName==='txt'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/图片.png"
                       class="image-type-icon"
                       v-if="item.extName==='png'||item.extName==='psd'||item.extName==='jpg'||item.extName==='gif'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/音频.png"
                       class="image-type-icon"
                       v-if="item.extName==='mp3'||item.extName==='wma'||item.extName==='avi'||item.extName==='flv'"
                       alt="">
                  <span>{{ item.name }}</span>
                </div>
                <div style="width:70%;">
                  <el-progress :text-inside="true"
                               :stroke-width="20"
                               :percentage="progressing"
                               :status="status"></el-progress>
                </div>
                <i class="el-icon-delete"
                   @click="handleClickDelProjectFile(item)"></i>
              </div>
            </div>
          </div>
          <div class="project-title">矢量数据：</div>
          <div class="uploadBigBox">
            <div class="uploadTitleBox">
              <el-upload class="fileBox"
                         ref="additionalRef"
                         action="/epf-document/document/upload/"
                         :before-upload="fileFormatChecking"
                         :http-request="annexUpload"
                         :on-success="uploadVectorSuccess"
                         :on-error="upLoadError"
                         :on-change="change"
                         :show-file-list="false"
                         :multiple="true">
                <div class="upload-button">上传文件</div>
              </el-upload>

              <span class="flexibleSwitch"
                    @click="flexSwitchVector">
                <i :class="isVectorOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
              </span>
            </div>

            <div class="uploadContentBox"
                 v-if="isVectorOpen">
              <div class="fileNameBox"
                   v-for="(item,index) in vectorList"
                   :key="index">
                <div style="width:300px;display:flex;align-items: center;">
                  <!-- <i class="el-icon-paperclip"></i> -->
                  <img src="../../../../../assets/images/cgsc/PDF.png"
                       class="image-type-icon"
                       v-if="item.extName==='pdf'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/PPT.png"
                       class="image-type-icon"
                       v-if="item.extName==='ppt'||item.extName==='pps'||item.extName==='pot'||item.extName==='ppa'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Word.png"
                       class="image-type-icon"
                       v-if="item.extName==='doc'||item.extName==='docx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Excel.png"
                       class="image-type-icon"
                       v-if="item.extName==='xls'||item.extName==='xlsx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/文本.png"
                       class="image-type-icon"
                       v-if="item.extName==='txt'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/图片.png"
                       class="image-type-icon"
                       v-if="item.extName==='png'||item.extName==='psd'||item.extName==='jpg'||item.extName==='gif'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/音频.png"
                       class="image-type-icon"
                       v-if="item.extName==='mp3'||item.extName==='wma'||item.extName==='avi'||item.extName==='flv'"
                       alt="">
                  <span>{{ item.name }}</span>
                </div>
                <div style="width:70%;">
                  <el-progress :text-inside="true"
                               :stroke-width="20"
                               :percentage="progressing"
                               :status="status"></el-progress>
                </div>
                <i class="el-icon-delete"
                   @click="handleClickDelProjectFile(item)"></i>
              </div>
            </div>
          </div>
          <div class="project-title">栅格数据：</div>
          <div class="uploadBigBox">
            <div class="uploadTitleBox">
              <el-upload class="fileBox"
                         ref="additionalRef"
                         action="/epf-document/document/upload/"
                         :before-upload="fileFormatChecking"
                         :http-request="annexUpload"
                         :on-success="uploadGridSuccess"
                         :on-error="upLoadError"
                         :on-change="change"
                         :show-file-list="false"
                         :multiple="true">
                <div class="upload-button">上传文件</div>
              </el-upload>

              <span class="flexibleSwitch"
                    @click="flexSwitchGrid">
                <i :class="isGridOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
              </span>
            </div>

            <div class="uploadContentBox"
                 v-if="isGridOpen">
              <div class="fileNameBox"
                   v-for="(item,index) in gridList"
                   :key="index">
                <div style="width:300px;display:flex;align-items: center;">
                  <!-- <i class="el-icon-paperclip"></i> -->
                  <img src="../../../../../assets/images/cgsc/PDF.png"
                       class="image-type-icon"
                       v-if="item.extName==='pdf'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/PPT.png"
                       class="image-type-icon"
                       v-if="item.extName==='ppt'||item.extName==='pps'||item.extName==='pot'||item.extName==='ppa'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Word.png"
                       class="image-type-icon"
                       v-if="item.extName==='doc'||item.extName==='docx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Excel.png"
                       class="image-type-icon"
                       v-if="item.extName==='xls'||item.extName==='xlsx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/文本.png"
                       class="image-type-icon"
                       v-if="item.extName==='txt'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/图片.png"
                       class="image-type-icon"
                       v-if="item.extName==='png'||item.extName==='psd'||item.extName==='jpg'||item.extName==='gif'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/音频.png"
                       class="image-type-icon"
                       v-if="item.extName==='mp3'||item.extName==='wma'||item.extName==='avi'||item.extName==='flv'"
                       alt="">
                  <span>{{ item.name }}</span>
                </div>
                <div style="width:70%;">
                  <el-progress :text-inside="true"
                               :stroke-width="20"
                               :percentage="progressing"
                               :status="status"></el-progress>
                </div>
                <i class="el-icon-delete"
                   @click="handleClickDelProjectFile(item)"></i>
              </div>
            </div>
          </div>
          <div class="project-title">文档数据：</div>
          <div class="uploadBigBox">
            <div class="uploadTitleBox">
              <el-upload class="fileBox"
                         ref="additionalRef"
                         action="/epf-document/document/upload/"
                         :before-upload="fileFormatChecking"
                         :http-request="annexUpload"
                         :on-success="uploadDocSuccess"
                         :on-error="upLoadError"
                         :on-change="change"
                         :show-file-list="false"
                         :multiple="true">
                <div class="upload-button">上传文件</div>
              </el-upload>

              <span class="flexibleSwitch"
                    @click="flexSwitchDoc">
                <i :class="isDocOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
              </span>
            </div>

            <div class="uploadContentBox"
                 v-if="isDocOpen">
              <div class="fileNameBox"
                   v-for="(item,index) in docList"
                   :key="index">
                <div style="width:300px;display:flex;align-items: center;">
                  <!-- <i class="el-icon-paperclip"></i> -->
                  <img src="../../../../../assets/images/cgsc/PDF.png"
                       class="image-type-icon"
                       v-if="item.extName==='pdf'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/PPT.png"
                       class="image-type-icon"
                       v-if="item.extName==='ppt'||item.extName==='pps'||item.extName==='pot'||item.extName==='ppa'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Word.png"
                       class="image-type-icon"
                       v-if="item.extName==='doc'||item.extName==='docx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Excel.png"
                       class="image-type-icon"
                       v-if="item.extName==='xls'||item.extName==='xlsx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/文本.png"
                       class="image-type-icon"
                       v-if="item.extName==='txt'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/图片.png"
                       class="image-type-icon"
                       v-if="item.extName==='png'||item.extName==='psd'||item.extName==='jpg'||item.extName==='gif'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/音频.png"
                       class="image-type-icon"
                       v-if="item.extName==='mp3'||item.extName==='wma'||item.extName==='avi'||item.extName==='flv'"
                       alt="">
                  <span>{{ item.name }}</span>
                </div>
                <div style="width:70%;">
                  <el-progress :text-inside="true"
                               :stroke-width="20"
                               :percentage="progressing"
                               :status="status"></el-progress>
                </div>
                <i class="el-icon-delete"
                   @click="handleClickDelProjectFile(item)"></i>
              </div>
            </div>
          </div>
          <div class="project-title">表格数据：</div>
          <div class="uploadBigBox">
            <div class="uploadTitleBox">
              <el-upload class="fileBox"
                         ref="additionalRef"
                         action="/epf-document/document/upload/"
                         :before-upload="fileFormatChecking"
                         :http-request="annexUpload"
                         :on-success="uploadTableSuccess"
                         :on-error="upLoadError"
                         :on-change="change"
                         :show-file-list="false"
                         :multiple="true">
                <div class="upload-button">上传文件</div>
              </el-upload>

              <span class="flexibleSwitch"
                    @click="flexSwitchTable">
                <i :class="isTableOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
              </span>
            </div>

            <div class="uploadContentBox"
                 v-if="isTableOpen">
              <div class="fileNameBox"
                   v-for="(item,index) in tableList"
                   :key="index">
                <div style="width:300px;display:flex;align-items: center;">
                  <!-- <i class="el-icon-paperclip"></i> -->
                  <img src="../../../../../assets/images/cgsc/PDF.png"
                       class="image-type-icon"
                       v-if="item.extName==='pdf'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/PPT.png"
                       class="image-type-icon"
                       v-if="item.extName==='ppt'||item.extName==='pps'||item.extName==='pot'||item.extName==='ppa'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Word.png"
                       class="image-type-icon"
                       v-if="item.extName==='doc'||item.extName==='docx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Excel.png"
                       class="image-type-icon"
                       v-if="item.extName==='xls'||item.extName==='xlsx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/文本.png"
                       class="image-type-icon"
                       v-if="item.extName==='txt'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/图片.png"
                       class="image-type-icon"
                       v-if="item.extName==='png'||item.extName==='psd'||item.extName==='jpg'||item.extName==='gif'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/音频.png"
                       class="image-type-icon"
                       v-if="item.extName==='mp3'||item.extName==='wma'||item.extName==='avi'||item.extName==='flv'"
                       alt="">
                  <span>{{ item.name }}</span>
                </div>
                <div style="width:70%;">
                  <el-progress :text-inside="true"
                               :stroke-width="20"
                               :percentage="progressing"
                               :status="status"></el-progress>
                </div>
                <i class="el-icon-delete"
                   @click="handleClickDelProjectFile(item)"></i>
              </div>
            </div>
          </div>
          <div class="project-title">说明文档：</div>
          <div class="uploadBigBox">
            <div class="uploadTitleBox">
              <el-upload class="fileBox"
                         ref="additionalRef"
                         action="/epf-document/document/upload/"
                         :before-upload="fileFormatChecking"
                         :http-request="annexUpload"
                         :on-success="uploadExplainSuccess"
                         :on-error="upLoadError"
                         :on-change="change"
                         :show-file-list="false"
                         :multiple="true">
                <div class="upload-button">上传文件</div>
              </el-upload>

              <span class="flexibleSwitch"
                    @click="flexSwitchExplain">
                <i :class="isExplainOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
              </span>
            </div>

            <div class="uploadContentBox"
                 v-if="isExplainOpen">
              <div class="fileNameBox"
                   v-for="(item,index) in explainList"
                   :key="index">
                <div style="width:300px;display:flex;align-items: center;">
                  <!-- <i class="el-icon-paperclip"></i> -->
                  <img src="../../../../../assets/images/cgsc/PDF.png"
                       class="image-type-icon"
                       v-if="item.extName==='pdf'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/PPT.png"
                       class="image-type-icon"
                       v-if="item.extName==='ppt'||item.extName==='pps'||item.extName==='pot'||item.extName==='ppa'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Word.png"
                       class="image-type-icon"
                       v-if="item.extName==='doc'||item.extName==='docx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/Excel.png"
                       class="image-type-icon"
                       v-if="item.extName==='xls'||item.extName==='xlsx'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/文本.png"
                       class="image-type-icon"
                       v-if="item.extName==='txt'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/图片.png"
                       class="image-type-icon"
                       v-if="item.extName==='png'||item.extName==='psd'||item.extName==='jpg'||item.extName==='gif'"
                       alt="">
                  <img src="../../../../../assets/images/cgsc/音频.png"
                       class="image-type-icon"
                       v-if="item.extName==='mp3'||item.extName==='wma'||item.extName==='avi'||item.extName==='flv'"
                       alt="">
                  <span>{{ item.name }}</span>
                </div>
                <div style="width:70%;">
                  <el-progress :text-inside="true"
                               :stroke-width="20"
                               :percentage="progressing"
                               :status="status"></el-progress>
                </div>
                <i class="el-icon-delete"
                   @click="handleClickDelProjectFile(item)"></i>
              </div>
            </div>
          </div>
          <div style="width:100%;height:80px;"></div>
          <div class="operfirst"
               id="project-oper">
            <span class="button_shen"
                  @click="prev">上一步</span>
            <!-- <span class="button_shen"
                  @click="submitData">提交</span> -->
            <el-button @click="submitData"
                       v-preventReClick>提交</el-button>
          </div>
        </div>
        <div class="thirdStep"
             v-if="active===2"
             align-center>
          <el-button type="success"
                     icon="el-icon-check"
                     circle
                     style="font-size:40px;"></el-button>
          <div class="submitTitle">提交成功</div>
          <div class="submitMessage">项目已生成，可在项目库中申请质检</div>
          <div class="submitTime">
            <span style="color:#1e7ae5;font-size:14px;">{{count}}</span> 秒后自动返回项目库
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import Bus from '../../../../../utils/bus'
import shp from 'shpjs'
import Terraformer from 'terraformer-arcgis-parser'

export default {
  name: 'projectedit',
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
      active: 0,

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
      txtVal: '',
      isDatabaseOpen: true,
      isVectorOpen: true,
      isGridOpen: true,
      isDocOpen: true,
      isTableOpen: true,
      isExplainOpen: true,

      count: '', // 倒计时

      params: {
        id: ''
      },

      // 日期选择器
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      replyTime: '',
      biddingDate: '',

      dicRequest: ['professional_list'], // 字典码请求
      dictionary: {
        // 字典码结果
        professional_list: ''
      },
      dicNum: 0, // 字典循环下标

      dictObj: {
        dictKey: '',
        id: '',
        zhCn: '全部'
      },

      // 上传
      extName: [
        'shp',
        'dbf',
        'geojson',
        'prj',
        'sbn',
        'sbx',
        'xml',
        'shx',
        'txt',
        'zip'
      ],
      docSize: 150, // 自定义上传文件大小限制，单位 MB
      datBaseList: [],
      vectorList: [],
      gridList: [],
      docList: [],
      tableList: [],
      explainList: [],
      length: 0,
      fileList: [], // 文件存储中间量
      treeData: [],
      progressing: 0,
      status: 'success',
      size: '',
      percentage: '',

      projectTypeList: [],
      isCheck: false,
      isFirst: true,
      selectIdsArr: [],

      correlationList: [], // 相关附件
      isCorrelationOpen: true,

      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        projectTypeName: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ],
        contactPhone: [
          { required: false, message: '请输入联系电话', trigger: 'blur' },
          {
            // pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号码格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    // 招投标时间选择器
    getBiddingDateTimeClick () {
      this.projectForm.biddingDate = this.biddingDate
    },
    // 时间选择器
    getTimeClick () {
      this.projectForm.replyTime = this.replyTime
    },
    // 文本域字数回显
    descInput () {
      this.txtVal = this.projectForm.remarks.length
    },
    // 上传文件展开拉起
    flexSwitchDatabase () {
      this.isDatabaseOpen = !this.isDatabaseOpen
    },
    flexSwitchVector () {
      this.isVectorOpen = !this.isVectorOpen
    },
    flexSwitchGrid () {
      this.isGridOpen = !this.isGridOpen
    },
    flexSwitchDoc () {
      this.isDocOpen = !this.isDocOpen
    },
    flexSwitchTable () {
      this.isTableOpen = !this.isTableOpen
    },
    flexSwitchExplain () {
      this.isExplainOpen = !this.isExplainOpen
    },
    // 取消按钮
    cancelForm () {
      // 跳转的页面写在此处
      //  this.$message.success('已取消')
      let title = '项目库'
      let routerPath = 'projectlist'
      this.$bus.$emit('closeTabsItem', this.$route.name)
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
      Bus.$emit('proSubmit', true)
    },
    // 保存按钮
    saveForm (val) {
      this.$refs[val].validate(async valid => {
        if (valid) {
          // 是否投标
          if (this.projectForm.biddingFlag == 0 || this.projectForm.biddingFlag == '') {
            delete this.projectForm.revProjectUndertakerParamList
            delete this.projectForm.revProjectUndertakerVoList
            this.projectForm.requester = 1
            this.isCheck = true
          } else {
            this.projectForm.requester = 0
            for (var key in this.projectForm.revProjectUndertakerParamList) {
              if (this.projectForm.revProjectUndertakerParamList[key].preparatUnitId === '') {
                let index = key
                document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = '1px solid red'
                document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = '4px'
                this.isCheck = false
              }
              let index0 = key
              if (document.querySelector(`#unitFormStyle${index0} .el-autocomplete`).style.borderRadius === '4px') {
                this.isCheck = false
              } else {
                this.isCheck = true
              }

              // 判断专业
              if (this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList.length > 1) {
                for (var i in this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList) {
                  if (this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[i].zhname === '' && this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[i].peopleNumber === '') {
                    let index1 = i
                    this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList.splice(index1, 1)
                  }
                  if (this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[i].zhname === '' || this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[i].peopleNumber === '') {
                    this.$message.error('请检查是否所有的各专业中级以上人数信息填写完整')
                    return
                  }
                }
              }
            }
            if (this.isCheck === false) {
              this.$message.error('请检查以上所有的承担单位信息是否已经全部填写')
              return
            }
          }

          let res = await axios({
            url: '/api/epf-result-review/admin/revproject/update',
            method: 'POST',
            data: this.projectForm,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          if (res.code === 0) {
            this.projectForm.id = res.projectId
            this.$message.success('编辑成功') // 成功
            // 跳转的页面写在此处
            let title = '项目库'
            let routerPath = 'projectlist'
            this.$bus.$emit('closeTabsItem', this.$route.name)
            var tabObj = { title, routerPath }
            this.setTabsList(tabObj)
            this.$router.push({ path: routerPath })
            Bus.$emit('proSubmit', true)
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        } else {
          document.querySelector('#proAdd').scrollIntoView(true)
        }
      })
    },
    // 下一步按钮
    submitForm (val) {
      this.$refs[val].validate(async valid => {
        if (valid) {
          // 判断承担单位是否填写完整
          if (this.projectForm.biddingFlag == 0 || this.projectForm.biddingFlag == '') {
            this.projectForm.requester = 1
            this.isCheck = true
            for (var key in this.projectForm.revProjectUndertakerParamList) {
              if (this.projectForm.revProjectUndertakerParamList[key].preparatUnitId === '') {
                let index = key
                this.projectForm.revProjectUndertakerParamList.splice(index, 1)
              }
            }
          } else {
            this.projectForm.requester = 0
            for (var key in this.projectForm.revProjectUndertakerParamList) {
              if (this.projectForm.revProjectUndertakerParamList[key].preparatUnitId === '') {
                let index = key
                document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = '1px solid red'
                document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = '4px'
                this.isCheck = false
              }
              let index0 = key
              if (document.querySelector(`#unitFormStyle${index0} .el-autocomplete`).style.borderRadius === '4px') {
                this.isCheck = false
              } else {
                this.isCheck = true
              }

              // 判断专业
              if (this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList.length > 1) {
                for (var i in this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList) {
                  if (this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[i].zhname === '' && this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[i].peopleNumber === '') {
                    let index1 = i
                    this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList.splice(index1, 1)
                  } else if (this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[i].zhname === '' || this.projectForm.revProjectUndertakerParamList[key].revProjectUndertakerNumberVoList[i].peopleNumber === '') {
                    this.$message.error('请检查是否所有的各专业中级以上人数信息填写完整')
                    return
                  }
                }
              }
            }
            if (this.isCheck === false) {
              this.$message.error('请检查以上所有的承担单位信息是否已经全部填写')
              return
            }
          }

          // let projectFormIDMsg={}
          // projectFormIDMsg['id']=this.projectForm.id
          // projectFormIDMsg['projectName']=this.projectForm.projectName
          // projectFormIDMsg['projectType']=this.projectForm.projectType
          //            let res = await axios({
          //             url: '/api/epf-result-review/admin/revproject/update',
          //             method: 'POST',
          //             data: projectFormIDMsg,
          //             headers: {
          //               'Content-Type': 'application/json;charset=UTF-8'
          //             }
          //           })
          //           console.log(res)
          //           if (res.code === 0) {
          //             this.projectForm.id = res.projectId
          //   // for(var key in this.projectForm.revProjectUndertakerParamList){
          //   //         this.projectForm.revProjectUndertakerParamList[key]['projectId']=res.projectId
          //   // }
          //   //           for(var key in this.correlationList){
          //   //             this.correlationList[key]['projectId']=res.projectId
          //   //           }

          //           } else {
          //             this.$message.error(res.msg) // 失败
          //             return
          //           }

          // 成果上传文件回显
          let projectId = this.$route.query.id
          let prores = await this.$get(
            '/epf-result-review/admin/revprojectfile/getByProjectId',
            { projectId: projectId }
          )

          let proFileData = prores.pager.results
          // 数据库建设文档
          var datBaseData = []
          var datBaseTemp = proFileData.filter(function (i) {
            return i.fileType.includes('project_file_type-001')
          })
          datBaseData = datBaseData.concat(datBaseTemp)
          console.log(datBaseData)

          for (var key in datBaseData) {
            this.datBaseList.push({
              name: datBaseData[key].documentName,
              extName: datBaseData[key].extensionName,
              docSize: datBaseData[key].fileSize,
              id: datBaseData[key].documentId,
              fileid: datBaseData[key].id
            })
          }
          // 矢量数据
          var vectorData = []
          var vectorTemp = proFileData.filter(function (i) {
            return i.fileType.includes('project_file_type-002')
          })
          vectorData = vectorData.concat(vectorTemp)
          console.log(vectorData)

          for (var key in vectorData) {
            this.vectorList.push({
              name: vectorData[key].documentName,
              extName: vectorData[key].extensionName,
              docSize: vectorData[key].fileSize,
              id: vectorData[key].documentId,
              fileid: vectorData[key].id
            })
          }
          // 栅格数据
          var gridData = []
          var gridTemp = proFileData.filter(function (i) {
            return i.fileType.includes('project_file_type-003')
          })
          gridData = gridData.concat(gridTemp)
          console.log(gridData)

          for (var key in gridData) {
            this.gridList.push({
              name: gridData[key].documentName,
              extName: gridData[key].extensionName,
              docSize: gridData[key].fileSize,
              id: gridData[key].documentId,
              fileid: gridData[key].id
            })
          }
          // 文档数据
          var docData = []
          var docTemp = proFileData.filter(function (i) {
            return i.fileType.includes('project_file_type-004')
          })
          docData = docData.concat(docTemp)
          console.log(docData)

          for (var key in docData) {
            this.docList.push({
              name: docData[key].documentName,
              extName: docData[key].extensionName,
              docSize: docData[key].fileSize,
              id: docData[key].documentId,
              fileid: docData[key].id
            })
          }
          // 表格数据
          var tableData = []
          var tableTemp = proFileData.filter(function (i) {
            return i.fileType.includes('project_file_type-005')
          })
          tableData = tableData.concat(tableTemp)
          console.log(tableData)

          for (var key in tableData) {
            this.tableList.push({
              name: tableData[key].documentName,
              extName: tableData[key].extensionName,
              docSize: tableData[key].fileSize,
              id: tableData[key].documentId,
              fileid: tableData[key].id
            })
          }
          // 说明文档
          var explainData = []
          var explainTemp = proFileData.filter(function (i) {
            return i.fileType.includes('project_file_type-006')
          })
          explainData = explainData.concat(explainTemp)
          console.log(explainData)

          for (var key in explainData) {
            this.explainList.push({
              name: explainData[key].documentName,
              extName: explainData[key].extensionName,
              docSize: explainData[key].fileSize,
              id: explainData[key].documentId,
              fileid: explainData[key].id
            })
          }

          this.progressing = 100
          this.status = 'success'

          if (this.active++ > 2) this.active = 0
          this.$refs.backTop.$el.scrollIntoView({ block: 'end' }, { behavior: 'smooth' })
        } else {
          document.querySelector('#proAdd').scrollIntoView(true)
          this.$refs.backTop.$el.scrollIntoView({ block: 'end' }, { behavior: 'smooth' })
        }
      })
    },
    // 上一步按钮
    prev () {
      if (this.active-- < 0) this.active = 2
      this.$refs.backTop.$el.scrollIntoView({ block: 'end' }, { behavior: 'smooth' })
    },
    // 提交按钮
    async submitData () {
      //  this.projectForm.revProjectFileEntityList=this.correlationList
      let res = await axios({
        url: '/api/epf-result-review/admin/revproject/update',
        method: 'POST',
        data: this.projectForm,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      if (res.code === 0) {
        // this.projectForm.id = res.projectId
        this.$message.success('编辑成功') // 成功
        if (this.active++ > 2) this.active = 0
        this.$refs.backTop.$el.scrollIntoView({ block: 'end' }, { behavior: 'smooth' })
        this.goGrdoupRecor()
      } else {
        this.$message.error(res.msg) // 失败
        return
      }
    },
    // 提交页面
    goGrdoupRecor () {
      const timeCount = 3
      if (!this.timer) {
        this.count = timeCount
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= timeCount) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
            // 跳转的页面写在此处
            let title = '项目库'
            let routerPath = 'projectlist'
            this.$bus.$emit('closeTabsItem', this.$route.name)
            var tabObj = { title, routerPath }
            this.setTabsList(tabObj)
            this.$router.push({ path: routerPath })
            Bus.$emit('proSubmit', true)
          }
        }, 1000)
      }
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
        if (res.result.biddingFlag === null) {
          this.projectForm.biddingFlag = ''
        } else {
          this.projectForm.biddingFlag = Number(res.result.biddingFlag)
        }
        if (res.result.remarks !== null) {
          this.txtVal = res.result.remarks.length
        } else {
          this.txtVal = 0
        }

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
        // this.replyTime = res.result.replyTime
        if (res.result.replyTime === null) {
          this.replyTime = ''
        } else {
          this.replyTime = res.result.replyTime
        }
        // this.biddingDate = res.result.biddingDate

        if (res.result.biddingDate === null) {
          this.biddingDate = ''
        } else {
          this.biddingDate = res.result.biddingDate
        }
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
        for (var k in typeRes.planning) {
          if (typeRes.planning[k].planningTypeId === res.result.projectType) {
            let index = k
            this.projectForm.projectTypeName = typeRes.planning[index].planningTypeName
          }
          this.projectTypeList.push({
            value: typeRes.planning[k].planningTypeId,
            label: typeRes.planning[k].planningTypeName
          })
        }
        console.log(this.projectTypeList)

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
        // 相关附件
        console.log(correlationData)

        // //data是json对象，Name是根据什么字段去重
        //           function FilterByName(data, Name) {
        //     var map = {},
        //       dest = [];
        //     for (var i = 0; i < data.length; i++) {
        //         var ai = data[i];
        //         if (i == 0) {
        //             dest.push(ai);
        //         } else {
        //             var filterData = dest.filter(function (e) {
        //                 return e[Name] == ai[Name];
        //             })
        //             if (filterData.length == 0) {
        //                 dest.push(ai);
        //             }
        //         }
        //     }
        //     return dest;
        // }
        // correlationData=FilterByName(correlationData,'documentId')
        //           console.log(correlationData)
        // this.projectForm.revProjectFileEntityList=[]
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

          // this.projectForm.revProjectFileEntityList.push({
          //   documentName: correlationData[key].documentName,
          //   extensionName: correlationData[key].extensionName,
          //   fileSize: correlationData[key].fileSize,
          //   documentId: correlationData[key].documentId,
          //   fileType:'project_file_type-007',
          //   deleteFlag: 0,
          //   fileid: correlationData[key].id,
          //   projectId:correlationData[key].projectId
          // })
        }

        this.progressing = 100
        this.status = 'success'
        // console.log(this.projectForm.revProjectFileEntityList)
      } else {
        this.$message.error(res.msg) // 失败
        return
      }
    },

    // 上传文件
    fileFormatChecking (file) {
      let me = this
      // 附件上传格式验证
      let extName = file.name.split('.').slice(-1)[0]
      // const fileTyState = this.extName.indexOf(extName);
      let docSize = file.size / Math.pow(1024, 2)
      if (extName == 'zip' && docSize <= 150) {
        const reader = new FileReader()
        reader.onload = function (event) {
          shp(event.target.result).then(function (geojson) {
            me.$parent.mapApp.parseJsonLayer(geojson, Terraformer)
            me.treeData = geojson.features
          })
        }
        reader.readAsArrayBuffer(file)
      } else {
        // if (fileTyState == -1) {
        //   this.$message.error(`上传附件不能是 ${extName} 格式!`);
        //   return false;
        // }
        if (docSize > this.docSize) {
          this.$message.error(`上传附件大小不能超过 ${this.docSize} MB!`)
          return false
        }
      }
    },
    annexUpload (files) {
      // 附件上传
      const file = files.file
      let formData = new FormData()
      // if (this.fileList.length > 0) {
      //   this.fileList.forEach(file => {
      //     formData.append("files", file);
      //   });
      //   if (formData.getAll("files").length == this.length && this.length > 0) {
      //     this.$useAppend("/epf-document/document/upload", formData).then(
      //       res => {
      //         this.fileList = [];
      //         //此处重置文件中间存储变量是为了相同文件能够重复传递
      //         if (res.state == "SUCCESS") {
      //           clearInterval(this.time);
      //           var progressing = 0;
      //           this.time = setInterval(() => {
      //             progressing += 10; //进程条
      //             if (progressing >= 100) {
      //               clearInterval(this.time);
      //             }
      //             this.progressing = progressing;
      //             this.status = "success";
      //           }, 10);
      //           console.log(this.progressing);

      //           files.onSuccess(res);
      //           this.$message.success("上传成功!");
      //         }
      //       }
      //     );
      //   }
      // }
      formData.append('files', file)
      this.$useAppend('/epf-document/document/upload', formData).then(res => {
        this.fileList = []
        // 此处重置文件中间存储变量是为了相同文件能够重复传递
        if (res.state == 'SUCCESS') {
          clearInterval(this.time)
          var progressing = 0
          this.time = setInterval(() => {
            progressing += 10 // 进程条
            if (progressing >= 100) {
              clearInterval(this.time)
            }
            this.progressing = progressing
            this.status = 'success'
          }, 10)

          console.log(this.progressing)
          files.onSuccess(res)
          // this.$message.success("上传成功!");
        }
      })
    },
    change () {
      // 判断上传文件数量
      this.length = document.querySelector('input[type=file]').files.length
      if (this.length > 0) {
        Array.from(document.querySelector('input[type=file]').files).forEach(
          file => {
            let extName = file.name.split('.').slice(-1)[0]
            let docSize = file.size / Math.pow(1024, 2)
            if (
              this.fileList.indexOf(file) == -1
              && !(extName == 'zip' && docSize <= 4)
            ) {
              this.fileList.push(file)
            }
          }
        )
      }
      return false
    },
    uploadDataBaseSuccess (res, file, fileList) {
      // 上传成功回调

      for (var key in res.data) {
        this.datBaseList.push({
          name: res.data[key].name,
          extName: res.data[key].extName,
          docSize: res.data[key].docSize,
          id: res.data[key].id
        })
      }

      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      }

      let params = fileObject
      params['projectId'] = this.projectForm.id
      params['documentId'] = fileObject.fid
      params['documentName'] = fileObject.fname
      params['extensionName'] = fileObject.ftype
      params['fileType'] = 'project_file_type-001'
      params['fileSize'] = fileObject.fsize
      this.$post('/epf-result-review/admin/revprojectfile/save', params).then(
        res => {
          for (var key in this.datBaseList) {
            if (!this.datBaseList[key].fileid) {
              this.$set(this.datBaseList[key], 'fileid', res.id)
            }
          }
          this.$message.success('上传成功!')
        }
      )
      this.progressing = 0
    },
    uploadVectorSuccess (res, file, fileList) {
      // 上传成功回调
      for (var key in res.data) {
        this.vectorList.push({
          name: res.data[key].name,
          extName: res.data[key].extName,
          docSize: res.data[key].docSize,
          id: res.data[key].id
        })
      }

      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      }

      let params = fileObject
      params['projectId'] = this.projectForm.id
      params['documentId'] = fileObject.fid
      params['documentName'] = fileObject.fname
      params['extensionName'] = fileObject.ftype
      params['fileType'] = 'project_file_type-002'
      params['fileSize'] = fileObject.fsize
      this.$post('/epf-result-review/admin/revprojectfile/save', params).then(
        res => {
          for (var key in this.vectorList) {
            if (!this.vectorList[key].fileid) {
              this.$set(this.vectorList[key], 'fileid', res.id)
            }
          }
          this.$message.success('上传成功!')
        }
      )
      this.progressing = 0
    },
    uploadGridSuccess (res, file, fileList) {
      // 上传成功回调
      for (var key in res.data) {
        this.gridList.push({
          name: res.data[key].name,
          extName: res.data[key].extName,
          docSize: res.data[key].docSize,
          id: res.data[key].id
        })
      }

      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      }

      let params = fileObject
      params['projectId'] = this.projectForm.id
      params['documentId'] = fileObject.fid
      params['documentName'] = fileObject.fname
      params['extensionName'] = fileObject.ftype
      params['fileType'] = 'project_file_type-003'
      params['fileSize'] = fileObject.fsize
      this.$post('/epf-result-review/admin/revprojectfile/save', params).then(
        res => {
          for (var key in this.gridList) {
            if (!this.gridList[key].fileid) {
              this.$set(this.gridList[key], 'fileid', res.id)
            }
          }
          this.$message.success('上传成功!')
        }
      )
      this.progressing = 0
    },
    uploadDocSuccess (res, file, fileList) {
      // 上传成功回调
      for (var key in res.data) {
        this.docList.push({
          name: res.data[key].name,
          extName: res.data[key].extName,
          docSize: res.data[key].docSize,
          id: res.data[key].id
        })
      }

      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      }

      let params = fileObject
      params['projectId'] = this.projectForm.id
      params['documentId'] = fileObject.fid
      params['documentName'] = fileObject.fname
      params['extensionName'] = fileObject.ftype
      params['fileType'] = 'project_file_type-004'
      params['fileSize'] = fileObject.fsize
      this.$post('/epf-result-review/admin/revprojectfile/save', params).then(
        res => {
          for (var key in this.docList) {
            if (!this.docList[key].fileid) {
              this.$set(this.docList[key], 'fileid', res.id)
            }
          }
          this.$message.success('上传成功!')
        }
      )
      this.progressing = 0
    },
    uploadTableSuccess (res, file, fileList) {
      // 上传成功回调

      for (var key in res.data) {
        this.tableList.push({
          name: res.data[key].name,
          extName: res.data[key].extName,
          docSize: res.data[key].docSize,
          id: res.data[key].id
        })
      }

      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      }

      let params = fileObject
      params['projectId'] = this.projectForm.id
      params['documentId'] = fileObject.fid
      params['documentName'] = fileObject.fname
      params['extensionName'] = fileObject.ftype
      params['fileType'] = 'project_file_type-005'
      params['fileSize'] = fileObject.fsize
      this.$post('/epf-result-review/admin/revprojectfile/save', params).then(
        res => {
          for (var key in this.tableList) {
            if (!this.tableList[key].fileid) {
              this.$set(this.tableList[key], 'fileid', res.id)
            }
          }
          this.$message.success('上传成功!')
        }
      )
      this.progressing = 0
    },
    uploadExplainSuccess (res, file, fileList) {
      // 上传成功回调
      for (var key in res.data) {
        this.explainList.push({
          name: res.data[key].name,
          extName: res.data[key].extName,
          docSize: res.data[key].docSize,
          id: res.data[key].id
        })
      }

      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      }

      let params = fileObject
      params['projectId'] = this.projectForm.id
      params['documentId'] = fileObject.fid
      params['documentName'] = fileObject.fname
      params['extensionName'] = fileObject.ftype
      params['fileType'] = 'project_file_type-006'
      params['fileSize'] = fileObject.fsize
      this.$post('/epf-result-review/admin/revprojectfile/save', params).then(
        res => {
          for (var key in this.explainList) {
            if (!this.explainList[key].fileid) {
              this.$set(this.explainList[key], 'fileid', res.id)
            }
          }
          this.$message.success('上传成功!')
        }
      )
      this.progressing = 0
    },
    upLoadError () {
      // 上传失败回调
      clearInterval(this.time)
      this.status = 'exception'
      this.$message.error('文件上传失败啦!')
    },
    handleClickDelProjectFile (item) {
      console.log(item)
      this.$confirm('此操作将永久删除该项目成果文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      })
        .then(async () => {
          let id = item.fileid
          let res = await this.$post(
            '/epf-result-review/admin/revprojectfile/delete',
            {
              id: id
            }
          )

          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            var datBaseArr = this.datBaseList.filter(function (obj) {
              return id !== obj.fileid
            })
            var vectorArr = this.vectorList.filter(function (obj) {
              return id !== obj.fileid
            })
            var gridArr = this.gridList.filter(function (obj) {
              return id !== obj.fileid
            })
            var docArr = this.docList.filter(function (obj) {
              return id !== obj.fileid
            })
            var tableArr = this.tableList.filter(function (obj) {
              return id !== obj.fileid
            })
            var explainArr = this.explainList.filter(function (obj) {
              return id !== obj.fileid
            })
            this.datBaseList = datBaseArr
            this.vectorList = vectorArr
            this.gridList = gridArr
            this.docList = docArr
            this.tableList = tableArr
            this.explainList = explainArr
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 上传文件进度条
    // format(percentage) {
    //   return percentage === 100 ? "15MB" : `${percentage}%`;
    // },

    // format(percentage) {
    //   for (var key in this.datBaseList) {
    //     percentage === 100 ? `100%` : `${percentage}%`;
    //   }
    //   return percentage;
    // },

    // 相关附件
    // 上传附件
    uploadCorrelationSuccess (res, file, fileList) {
      // // 上传成功回调
      // for (var key in res.data) {
      //   this.correlationList.push({
      //     documentName: res.data[key].name,
      //     extensionName: res.data[key].extName,
      //     fileSize: res.data[key].docSize,
      //     documentId: res.data[key].id,
      //     fileType:'project_file_type-007',
      //     deleteFlag:0
      //   })
      //   this.projectForm.revProjectFileEntityList.push({
      //     documentName: res.data[key].name,
      //     extensionName: res.data[key].extName,
      //     fileSize: res.data[key].docSize,
      //     documentId: res.data[key].id,
      //     fileType:'project_file_type-007',
      //     deleteFlag:0
      //   })
      // }

      // // this.projectForm.revProjectFileEntityList=this.correlationList

      // this.$message.success('上传成功!')
      // this.progressing = 0

      //  console.log(this.correlationList)

      console.log(res)
      // 上传成功回调
      for (var key in res.data) {
        this.correlationList.push({
          documentName: res.data[key].name,
          extensionName: res.data[key].extName,
          fileSize: res.data[key].docSize,
          documentId: res.data[key].id,
          fileType: 'project_file_type-007',
          deleteFlag: 0
        })
      }

      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      }

      let params = {}
      params['projectId'] = this.projectForm.id
      params['documentId'] = fileObject.fid
      params['documentName'] = fileObject.fname
      params['extensionName'] = fileObject.ftype
      params['fileType'] = 'project_file_type-007'
      params['fileSize'] = fileObject.fsize
      this.$post('/epf-result-review/admin/revprojectfile/save', params).then(
        res => {
          for (var key in this.correlationList) {
            if (!this.correlationList[key].fileid) {
              this.$set(this.correlationList[key], 'fileid', res.id)
            }
            // if(this.correlationList[key].documentId===params.documentId){
            //   let index=key
            //   this.correlationList[index]['id']=RES.id
            // }
          }
          this.$message.success('上传成功!')
        }
      )
      this.progressing = 0
      //  this.projectForm.revProjectFileEntityList=this.correlationList
      //  console.log(this.projectForm.revProjectFileEntityList)
    },
    // 删除附件
    handleClickDelCorrelationFile (item, index) {
      console.log(item)
      this.$confirm('此操作将永久删除该项目信息相关附件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      })
        .then(async () => {
          //          if(item.hasOwnProperty('projectId') === false){
          // for(var key in this.correlationList){
          // if(this.correlationList[key].documentId===item.documentId){
          // let index=key
          // this.correlationList.splice(index,1)
          // }
          // }
          // // for(var key in this.projectForm.revProjectFileEntityList){
          // // if(this.projectForm.revProjectFileEntityList[key].documentId===item.documentId){
          // // let index=key
          // // this.projectForm.revProjectFileEntityList.splice(index,1)
          // // }
          // // }
          //  this.projectForm.revProjectFileEntityList=this.correlationList
          //   this.$message({
          //               type: 'success',
          //               message: '删除成功,未保存删除'
          //             })
          //             console.log('删除成功,未保存删除' , this.correlationList)
          //             console.log('删除成功,未保存删除' , this.projectForm.revProjectFileEntityList)
          //          }else{
          //            item['deleteFlag']=1
          //            let uploadUpdateList={}
          //            uploadUpdateList['id']=item.projectId
          //            uploadUpdateList['projectName']=this.projectForm.projectName
          //            uploadUpdateList['projectType']=this.projectForm.projectType
          // // uploadUpdateList['revProjectFileEntityList']=[]
          // // uploadUpdateList['revProjectFileEntityList'][0]= item
          // uploadUpdateList['revProjectFileEntityList']=[{
          //   documentId:'',
          //   documentName:'',
          //   extensionName:'',
          //   fileType:'',
          //   fileSize:'',
          //   deleteFlag:'',
          // }]

          //       uploadUpdateList['revProjectFileEntityList'][0].documentId = item.documentId
          //       uploadUpdateList['revProjectFileEntityList'][0].documentName= item.documentName
          //       uploadUpdateList['revProjectFileEntityList'][0].extensionName = item.extensionName
          //       uploadUpdateList['revProjectFileEntityList'][0].fileType = item.fileType
          //       uploadUpdateList['revProjectFileEntityList'][0].fileSize = item.fileSize
          //       uploadUpdateList['revProjectFileEntityList'][0].deleteFlag = 1
          //       console.log(uploadUpdateList)
          //            axios({
          //             url: '/api/epf-result-review/admin/revproject/update',
          //             method: 'POST',
          //             data: uploadUpdateList,
          //             headers: {
          //               'Content-Type': 'application/json;charset=UTF-8'
          //             }
          //           }).then(res=>{
          //             if(res.code===0){
          //               let id=item.documentId

          //  var correlationArr = this.correlationList.filter(function (obj) {
          //               return id !== obj.documentId
          //             })
          //             console.log(correlationArr)
          //             this.correlationList = correlationArr
          // //  this.projectForm.revProjectFileEntityList=this.correlationList

          // //             console.log(this.projectForm.revProjectFileEntityList)

          // this.$message({
          //               type: 'success',
          //               message: '删除成功,保存删除'
          //             })

          //             }else{
          //               this.$message.error(res.msg)
          //               return
          //             }
          //           })

          // item.deleteFlag=1

          //           for(var key in this.projectForm.revProjectFileEntityList){
          // if(this.projectForm.revProjectFileEntityList[key].documentId===item.documentId){
          // let index=key
          // this.projectForm.revProjectFileEntityList[index].deleteFlag=1
          // }
          // }

          //           let id=item.documentId
          //  var correlationArr = this.correlationList.filter(function (obj) {
          //               return id !== obj.documentId
          //             })
          //             console.log(correlationArr)
          //             this.correlationList = correlationArr

          // this.$message({
          //               type: 'success',
          //               message: '删除成功,保存删除'
          //             })

          //             console.log('删除成功,保存删除'  ,  this.correlationList)
          //             console.log('删除成功,保存删除'  ,  this.projectForm.revProjectFileEntityList)

          //  }
          let id = item.fileid
          let res = await this.$post(
            '/epf-result-review/admin/revprojectfile/delete',
            {
              id: id
            }
          )
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            var correlationArr = this.correlationList.filter(function (obj) {
              return id !== obj.fileid
            })
            this.correlationList = correlationArr
            //  this.projectForm.revProjectFileEntityList=this.correlationList
            // console.log(this.projectForm.revProjectFileEntityList)
          } else {
            this.$message.error(res.msg)
            return
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 相关附件展开拉起
    flexSwitchCorrelation () {
      this.isCorrelationOpen = !this.isCorrelationOpen
    },

    // 跳转计费参考标准
    toMoneyBZ () {
      window.open(
        'https://mp.weixin.qq.com/s?__biz=MzA3MjgyNDIyNw==&mid=2652609652&idx=1&sn=1d13892d2e0c22e04dfe2c7174adad3b&chksm=84f758b8b380d1ae3a509fb48845aa46f4ddca06af846da1911ae2c619bed2adf31ec4203606&mpshare=1&scene=1&srcid=0402JQxCRecSvwszJOoEZULm&sharer_sharetime=1585796102966&sharer_shareid=de067e721fd8667605cef0940a530950&key=8def48700d5022e95856e4038a593e3270f6a84efa4ba5179e4d4cea7b176ef2fa2b956d69afb6eeea12dc08f503d05de042444cfb8d6fee399033e4224848deacd996729699bb991f875933298a28a2&ascene=1&uin=ODk4OTAyNTgw&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=AxjfRkpJsBKN82EoCz3ESUs%3D&pass_ticket=2nRXuXL%2FHiilAPVCU0%2FTodCCuR57DgJl3k263yjuQRcz0TtR2lLbJ6kKch2wjaNx'
      )
    },
    // 城市三级联动
    areaSelect () {
      this.isFirst = false
      this.projectForm.planningProvince = this.areaSelectedOptions[0]
      this.projectForm.planningCity = this.areaSelectedOptions[1]
      this.projectForm.planningArea = this.areaSelectedOptions[2]
      if (this.areaSelectedOptions.length === 3) {
        this.projectForm.administrativeCode = this.areaSelectedOptions[2]
      } else if (this.areaSelectedOptions.length === 2) {
        this.projectForm.administrativeCode = this.areaSelectedOptions[1]
      } else if (this.areaSelectedOptions.length === 1) {
        this.projectForm.administrativeCode = this.areaSelectedOptions[0]
      } else if (this.areaSelectedOptions.length === 0) {
        this.projectForm.administrativeCode = ''
        this.projectForm.planningProvince = ''
        this.projectForm.planningCity = ''
        this.projectForm.planningArea = ''
      }

      this.projectForm.projectType = ''
      this.projectForm.projectTypeName = ''
      this.getProjectType()
    },
    // 获取项目类型
    async getProjectType () {
      let res = await this.$get(`/epf-result-review/revplanningcategorymanage/getRevPlanningType?cantonId=${this.projectForm.administrativeCode}&orgId=${sessionStorage.getItem('orgId')}`)
      if (res.code === 0) {
        this.projectTypeList = []
        for (var i in res.planning) {
          this.projectTypeList.push({
            value: res.planning[i].planningTypeId,
            label: res.planning[i].planningTypeName
          })
        }
      } else {
        this.$message.error(res.msg)
      }
    },
    projectTypeSelect (val) {
      this.projectForm.projectType = val.value
      this.projectForm.projectTypeName = val.label
    },
    // 添加承担单位
    addUnitMsg () {
      for (var key in this.projectForm.revProjectUndertakerParamList) {
        if (this.projectForm.revProjectUndertakerParamList[key].companyName === '') {
          let index = key
          document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = '1px solid red'
          document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = '4px'
          this.isCheck = false
        }
        let index0 = key
        if (document.querySelector(`#unitFormStyle${index0} .el-autocomplete`).style.borderRadius === '4px') {
          this.isCheck = false
        } else {
          this.isCheck = true
        }
      }
      if (this.isCheck === true) {
        this.projectForm.revProjectUndertakerParamList.push({
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
        })
      } else {
        this.$message.error('请检查以上所有的承担单位名称是否输入正确')
      }
    },
    // 删除承担单位
    deleteUnitMsg (item, index) {
      // 第一种已经保存后做删除操作
      // 第二种还没保存做删除操作
      if (item.hasOwnProperty('projectId') === false) {
        this.projectForm.revProjectUndertakerParamList.splice(index, 1)
        document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = ''
        document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = ''
        this.isCheck = true
        this.$message({
          type: 'success',
          message: '该承担单位信息已删除'
        })
        console.log(this.projectForm.revProjectUndertakerParamList)
      } else {
        item['deleteFlag'] = 1
        let unitUpdateList = {}
        unitUpdateList['id'] = this.projectForm.id
        unitUpdateList['projectName'] = this.projectForm.projectName
        unitUpdateList['projectType'] = this.projectForm.projectType
        unitUpdateList['revProjectUndertakerParamList'] = []
        unitUpdateList['revProjectUndertakerParamList'][0] = item
        axios({
          url: '/api/epf-result-review/admin/revproject/update',
          method: 'POST',
          data: unitUpdateList,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res => {
          if (res.code === 0) {
            this.projectForm.revProjectUndertakerParamList.splice(index, 1)
            document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = ''
            document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = ''
            this.isCheck = true
            this.$message({
              type: 'success',
              message: '该承担单位信息已删除'
            })
          } else {
            this.$message.error(res.msg)
            return
          }
        })
      }
    },
    // 增加专业信息
    addMajorMsg (index, dex) {
      for (var key in this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList) {
        if (this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[key].name === '' || this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[key].peopleNumber === '') {
          this.$message.error('请输入完整各专业中级以上人数对应信息')
          return
        }
        if (Number(key) > this.dictionary.professional_list.length - 2) {
          this.$message.error('添加各专业中级以上人数信息总条数不能超过专业的总个数')
          return
        }
      }
      this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList.push({
        name: '', // 专业名称id
        zhname: '', // 专业名称
        peopleNumber: '' // 人数
      })
    },
    // 删除专业信息
    removeMajorMsg (index, dex) {
      this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList.splice(dex + 1, 1)
    },
    // 选择专业信息
    zhuanyeTypeSelect (dic, name, event, index, dex, number) {
      this.selectIdsArr = []
      for (var key in this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList) {
        if (this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[key].zhname === '城乡规划相关专业') {
          let setIndex = key
          this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[setIndex].name = 'professional_list-002'
        } else if (this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[key].zhname === '土地管理相关专业') {
          let setIndex = key
          this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[setIndex].name = 'professional_list-001'
        }

        if (this.projectForm.revProjectUndertakerParamList[index]
          .revProjectUndertakerNumberVoList[key].zhname) {
          this.selectIdsArr.push(this.projectForm.revProjectUndertakerParamList[index]
            .revProjectUndertakerNumberVoList[key].zhname)
        }
      }
      this.$forceUpdate()
      function isRepeat (arr) {
        var hash = {}
        for (var i in arr) {
          if (hash[arr[i]]) {
            return true
          }
          hash[arr[i]] = true
        }
        return false
      }
      if (number === 0) {
        if (isRepeat(this.selectIdsArr) === true) {
          this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].name = ''
          this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].zhname = ''
          this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].peopleNumber = ''
          this.$message.error('不允许选择同样的专业')
        }
      } else if (number === 1) {
        if (isRepeat(this.selectIdsArr) === true) {
          this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[dex + 1].name = ''
          this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[dex + 1].zhname = ''
          this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[dex + 1].peopleNumber = ''
          this.$message.error('不允许选择同样的专业')
        }
      }
    },
    // 模糊查询承担单位名称
    async handleSelect (item) {
      let index = item.valueIndex
      let companyNameList = []
      for (var key in this.projectForm.revProjectUndertakerParamList) {
        companyNameList.push(this.projectForm.revProjectUndertakerParamList[key].companyName)
      }
      console.log(companyNameList)

      function isRepeat (arr) {
        var hash = {}
        for (var i in arr) {
          if (hash[arr[i]]) {
            return true
          }
          hash[arr[i]] = true
        }
        return false
      }

      if (isRepeat(companyNameList) === true) {
        this.$message.error('已存在该承担单位信息, 请重新输入其它承担单位名称')
        this.projectForm.revProjectUndertakerParamList[index].preparatUnitId = '' // 编制单位ID
        // this.projectForm.revProjectUndertakerParamList[index].companyName= '' // 编制单位名称
        this.projectForm.revProjectUndertakerParamList[index].contractAmount = '' // 合同金额
        this.projectForm.revProjectUndertakerParamList[index].contractTitle = '' // 合同名称
        this.projectForm.revProjectUndertakerParamList[index].contractScope = '' // 合同范围
        this.projectForm.revProjectUndertakerParamList[index].projectLeader = '' // 项目负责人职务
        this.projectForm.revProjectUndertakerParamList[index].projectLeaderName = '' // 项目负责人姓名
        this.projectForm.revProjectUndertakerParamList[index].joinNumber = '' // 直接参与人数
        this.projectForm.revProjectUndertakerParamList[index].joinRegisterNumber = '' // 直接参与注册规划师人数
        this.projectForm.revProjectUndertakerParamList[index].unitNatureName = '' // 单位性质
        this.projectForm.revProjectUndertakerParamList[index].totalPeople = '' // 总人数
        this.projectForm.revProjectUndertakerParamList[index].planningLevelName = '' // 城乡规划资质等级
        this.projectForm.revProjectUndertakerParamList[index].mappingLevelName = '' // 测绘资质
        this.projectForm.revProjectUndertakerParamList[index].directoryLevelName = '' // 推荐名录等级
        this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList = [
          {
            name: '', // 专业名称id
            zhname: '', // 专业名称
            peopleNumber: '' // 人数
          }
        ]

        document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = '1px solid red'
        document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = '4px'
        this.isCheck = false

        return
      }

      console.log(item)
      this.projectForm.revProjectUndertakerParamList[index].preparatUnitId = item.id
      this.projectForm.revProjectUndertakerParamList[index].companyName = item.companyName
      this.projectForm.revProjectUndertakerParamList[index].unitNatureName = item.dictTranslate.unitNatureName
      this.projectForm.revProjectUndertakerParamList[index].totalPeople = item.totalPeople
      this.projectForm.revProjectUndertakerParamList[index].planningLevelName = item.dictTranslate.planningLevelName
      this.projectForm.revProjectUndertakerParamList[index].mappingLevelName = item.mappingLevelName
      this.projectForm.revProjectUndertakerParamList[index].directoryLevelName = item.dictTranslate.directoryLevelName
      document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = ''
      document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = ''
      this.isCheck = true
      this.$forceUpdate()
      console.log(this.projectForm)
    },
    querySearchAsync (queryString, callback) {
      if (queryString === '') return
      let list = [{}]
      this.$get(
        `/epf-result-review/preparatUnit/searchByName?companyName=${queryString}`
      )
        .then(res => {
          if (res.code === 0) {
            for (var key in res.pager.results) {
              let index = sessionStorage.getItem('focusIndex')
              res.pager.results[key]['value'] = res.pager.results[key].companyName
              res.pager.results[key]['valueIndex'] = Number(index)
            }
            if (res.pager.results.length > 50) {
              list = res.pager.results.slice(0, 50)
            } else {
              list = res.pager.results
            }

            console.log(list)
            callback(list)
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    getFocusUnitMsg (index) {
      sessionStorage.setItem('focusIndex', index)
      document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = ''
      document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = ''
    },
    getBlurUnitMsg (index) {
      setTimeout(() => {
        let nowCompanyName = this.projectForm.revProjectUndertakerParamList[index].companyName
        console.log(nowCompanyName)
        if (nowCompanyName === '') {
          this.$message.error('该承担单位名称为空, 请输入承担单位名称')
          this.projectForm.revProjectUndertakerParamList[index].preparatUnitId = '' // 编制单位ID
          this.projectForm.revProjectUndertakerParamList[index].companyName = '' // 编制单位名称
          this.projectForm.revProjectUndertakerParamList[index].contractAmount = '' // 合同金额
          this.projectForm.revProjectUndertakerParamList[index].contractTitle = '' // 合同名称
          this.projectForm.revProjectUndertakerParamList[index].contractScope = '' // 合同范围
          this.projectForm.revProjectUndertakerParamList[index].projectLeader = '' // 项目负责人职务
          this.projectForm.revProjectUndertakerParamList[index].projectLeaderName = '' // 项目负责人姓名
          this.projectForm.revProjectUndertakerParamList[index].joinNumber = '' // 直接参与人数
          this.projectForm.revProjectUndertakerParamList[index].joinRegisterNumber = '' // 直接参与注册规划师人数
          this.projectForm.revProjectUndertakerParamList[index].unitNatureName = '' // 单位性质
          this.projectForm.revProjectUndertakerParamList[index].totalPeople = '' // 总人数
          this.projectForm.revProjectUndertakerParamList[index].planningLevelName = '' // 城乡规划资质等级
          this.projectForm.revProjectUndertakerParamList[index].mappingLevelName = '' // 测绘资质
          this.projectForm.revProjectUndertakerParamList[index].directoryLevelName = '' // 推荐名录等级
          this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList = [
            {
              name: '', // 专业名称id
              zhname: '', // 专业名称
              peopleNumber: '' // 人数
            }
          ]

          document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = '1px solid red'
          document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = '4px'
          this.isCheck = false

          return
        }
        let companyNameList = []
        for (var key in this.projectForm.revProjectUndertakerParamList) {
          companyNameList.push(this.projectForm.revProjectUndertakerParamList[key].companyName)
        }
        console.log(companyNameList)

        function isRepeat (arr) {
          var hash = {}
          for (var i in arr) {
            if (hash[arr[i]]) {
              return true
            }
            hash[arr[i]] = true
          }
          return false
        }

        if (isRepeat(companyNameList) === true) return

        this.$get(`/epf-result-review/preparatUnit/searchByName?companyName=${nowCompanyName}`).then(res => {
          if (res.code === 0) {
            let nowCompanyNameList = []
            for (var key in res.pager.results) {
              nowCompanyNameList.push(res.pager.results[key].companyName)
            }
            console.log(nowCompanyNameList)

            console.log(nowCompanyName)
            if (nowCompanyNameList.includes(nowCompanyName) === true) {
              // let blurIndex = sessionStorage.getItem('focusIndex')
              this.projectForm.revProjectUndertakerParamList[index].preparatUnitId = res.pager.results[0].id
              this.projectForm.revProjectUndertakerParamList[index].unitNatureName = res.pager.results[0].dictTranslate.unitNatureName
              this.projectForm.revProjectUndertakerParamList[index].totalPeople = res.pager.results[0].totalPeople
              this.projectForm.revProjectUndertakerParamList[index].planningLevelName = res.pager.results[0].dictTranslate.planningLevelName
              this.projectForm.revProjectUndertakerParamList[index].mappingLevelName = res.pager.results[0].mappingLevelName
              this.projectForm.revProjectUndertakerParamList[index].directoryLevelName = res.pager.results[0].dictTranslate.directoryLevelName
              document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = ''
              document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = ''
              this.isCheck = true
              this.$forceUpdate()
            } else {
              this.$message.error('请检查该承担单位名称是否输入正确')
              this.projectForm.revProjectUndertakerParamList[index].preparatUnitId = '' // 编制单位ID
              // this.projectForm.revProjectUndertakerParamList[index].companyName= '' // 编制单位名称
              this.projectForm.revProjectUndertakerParamList[index].contractAmount = '' // 合同金额
              this.projectForm.revProjectUndertakerParamList[index].contractTitle = '' // 合同名称
              this.projectForm.revProjectUndertakerParamList[index].contractScope = '' // 合同范围
              this.projectForm.revProjectUndertakerParamList[index].projectLeader = '' // 项目负责人职务
              this.projectForm.revProjectUndertakerParamList[index].projectLeaderName = '' // 项目负责人姓名
              this.projectForm.revProjectUndertakerParamList[index].joinNumber = '' // 直接参与人数
              this.projectForm.revProjectUndertakerParamList[index].joinRegisterNumber = '' // 直接参与注册规划师人数
              this.projectForm.revProjectUndertakerParamList[index].unitNatureName = '' // 单位性质
              this.projectForm.revProjectUndertakerParamList[index].totalPeople = '' // 总人数
              this.projectForm.revProjectUndertakerParamList[index].planningLevelName = '' // 城乡规划资质等级
              this.projectForm.revProjectUndertakerParamList[index].mappingLevelName = '' // 测绘资质
              this.projectForm.revProjectUndertakerParamList[index].directoryLevelName = '' // 推荐名录等级
              this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList = [
                {
                  name: '', // 专业名称id
                  zhname: '', // 专业名称
                  peopleNumber: '' // 人数
                }
              ]
              document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.border = '1px solid red'
              document.querySelector(`#unitFormStyle${index} .el-autocomplete`).style.borderRadius = '4px'
              this.isCheck = false
            }
            console.log(this.projectForm)
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        })
      }, 1000)
    },
    getInputData0 () {
      this.projectForm.itemAmount = this.projectForm.itemAmount.replace(/^\D*(\d*(?:\.\d{0,12})?).*$/g, '$1')
    },
    getInputData1 () {
      this.projectForm.currentBaseYear = this.projectForm.currentBaseYear.replace(/[^\d]/g, '')
    },
    getInputData2 () {
      this.projectForm.planStartYear = this.projectForm.planStartYear.replace(/[^\d]/g, '')
    },
    getInputData3 () {
      this.projectForm.planTargetYear = this.projectForm.planTargetYear.replace(/[^\d]/g, '')
    },
    getInputData4 () {
      this.projectForm.planPopulation = this.projectForm.planPopulation.replace(/[^\d]/g, '')
    },
    getInputData5 () {
      this.projectForm.planPeriod = this.projectForm.planPeriod.replace(/[^\d]/g, '')
    },
    getInputData6 () {
      this.projectForm.contactPhone = this.projectForm.contactPhone.replace(/[^\d]/g, '')
    },
    getCDInputData0 (index) {
      this.projectForm.revProjectUndertakerParamList[index].contractAmount = this.projectForm.revProjectUndertakerParamList[index].contractAmount.replace(/^\D*(\d*(?:\.\d{0,12})?).*$/g, '$1')
    },
    getCDInputData1 (index) {
      this.projectForm.revProjectUndertakerParamList[index].joinNumber = this.projectForm.revProjectUndertakerParamList[index].joinNumber.replace(/[^\d]/g, '')
    },
    getCDInputData2 (index) {
      this.projectForm.revProjectUndertakerParamList[index].joinRegisterNumber = this.projectForm.revProjectUndertakerParamList[index].joinRegisterNumber.replace(/[^\d]/g, '')
    },
    getCDInputData3 (index) {
      this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].peopleNumber = this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[0].peopleNumber.replace(/[^\d]/g, '')
    },
    getCDInputData4 (index) {
      for (var key in this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList) {
        this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[key].peopleNumber = this.projectForm.revProjectUndertakerParamList[index].revProjectUndertakerNumberVoList[key].peopleNumber.replace(/[^\d]/g, '')
      }
    }

  },
  created () {
    const that = this
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
      let dicArr = res.map(item => {
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          }
        })
        return dicArr
      })
      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum]
        this.dicNum++
      }
      this.dicFinsh = true
    })

    this.isFirst = true

    let id = this.$route.query.id
    if (id) {
      this.getMessage(id)
    }
  },
  watch: {
    // 监听相同路由下参数变化的时候，从而实现异步刷新
    $route (to, from) {
      /** 初始化其他数据 */
      let id = this.$route.query.id
      if (id) {
        this.getMessage(id)
      }
    },
    'projectForm.biddingFlag': {
      immediate: true,
      deep: true,
      handler (val) {
        console.log(this.projectForm)
        if (val == 1) {
          if (this.projectForm.revProjectUndertakerParamList === null) {
            this.projectForm.revProjectUndertakerParamList = [
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
          }
        }
      }
    },
    areaSelectedOptions (val) {
      if (this.isFirst === true) return
      this.projectForm.planningProvince = val[0]
      this.projectForm.planningCity = val[1]
      this.projectForm.planningArea = val[2]
      if (val.length === 3) {
        this.projectForm.administrativeCode = val[2]
      } else if (val.length === 2) {
        this.projectForm.administrativeCode = val[1]
      } else if (val.length === 1) {
        this.projectForm.administrativeCode = val[0]
      } else if (val.length === 0) {
        this.projectForm.administrativeCode = ''
        this.projectForm.planningProvince = ''
        this.projectForm.planningCity = ''
        this.projectForm.planningArea = ''
      }
      this.projectForm.projectType = ''
      this.projectForm.projectTypeName = ''
      this.getProjectType()
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
#proAdd {
  .firstStep {
    margin-top: 15px;
    .uploadBigBox {
      width: 100%;
      margin-bottom: 50px;
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
        width: 80%;
        margin: 30px 0;
        .fileNameBox {
          height: 30px;
          width: 1100px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin: 5px 0;
          .el-icon-delete {
            width: 5%;
            text-align: right;
            cursor: pointer;
          }
        }
      }
    }
  }
  .Secondstep {
    margin-top: 15px;
    .uploadTip {
      margin-bottom: 20px;
    }
    .uploadBigBox {
      width: 100%;
      margin-bottom: 50px;
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
        width: 80%;
        margin: 30px 0;
        .fileNameBox {
          height: 30px;
          width: 1100px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin: 5px 0;
          .el-icon-delete {
            width: 5%;
            text-align: right;
            cursor: pointer;
          }
        }
      }
    }
  }
  .thirdStep {
    width: 100%;
    height: 620px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .submitTitle {
      font-size: 20px;
      font-weight: bolder;
      margin: 20px 0;
      color: #333;
    }
    .submitTime {
      margin-top: 20px;
    }
  }
}
</style>
<style scoped>
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
  margin-bottom: 16px;
  position: relative;
}
.plus-button {
  height: 40px;
  max-width: 128px;
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-bottom: 22px;
  cursor: pointer;
}
.upload-button {
  width: 96px;
  min-width: 96px;
  max-width: 96px;
  height: 40px;
  background: rgba(233, 243, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.operfirst {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.button_qian {
  height: 40px;
  padding: 0px 32px;
  background: rgba(233, 243, 255, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  margin-left: 32px;
  cursor: pointer;
}
.button_shen {
  height: 40px;
  padding: 0px 32px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  margin-left: 32px;
  cursor: pointer;
}
.deleteIcon {
  width: 30px;
  height: 40px;
  position: absolute;
  right: 10px;
  top: 0px;
  cursor: pointer;
  z-index: 100;
}
.image-type-icon {
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
#proAdd .el-steps--simple {
  padding: 13px 8%;
  border-radius: 4px;
  width: 75%;
  margin: 0 auto;
  background: transparent;
}
#proAdd .el-form-item__label {
  font-size: 16px;
  color: #595959;
}
#proAdd .el-icon-circle-plus-outline:before {
  content: "\e723";
  color: #50a5f4;
  font-size: 21px;
  height: 40px;
  line-height: 40px;
}
#proAdd .el-icon-remove-outline:before {
  content: "\e722";
  color: #50a5f4;
  font-size: 21px;
  height: 40px;
  line-height: 40px;
}

#proAdd .el-input__suffix-inner i {
  display: inline-block;
  width: 40px;
}
#proAdd .el-input__suffix-inner i.itext {
  font-size: 14px;
}
#proAdd .el-input__suffix {
  width: 32px;
}
#project-oper .el-button {
  height: 40px;
  padding: 0px 32px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  margin-left: 32px;
  cursor: pointer;
}
.unitFormStyle .el-icon-circle-close:before {
  content: "\e78d";
  color: #50a5f4;
  font-size: 30px;
  width: 30px;
  height: 40px;
  line-height: 40px;
}
</style>
