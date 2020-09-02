<template>
  <div class="page-body"
       id="documentBrowse">
    <div class="filter_wrap">
      <div class="documentBrowse">
        <div class="document"
             v-if="useIframeView">
          <iframe style="width:100%;height:100%;"
                  id="ifra"
                  :src="iframeSrc"
                  frameborder="0"></iframe>
        </div>
        <div class="document"
             v-else>
          <div id="documentOnlineEditor"
               style="height: 100%"></div>
          <remote-js :src="onlyofficeApiJsAddr"></remote-js>
        </div>
        <!-- <el-button @click="initDocEditor">sdfsdfsd</el-button> -->
        <div class="list_zsk"
             :style="{'padding-bottom':(folderType?132+'px':0+'px')}">
          <div class="grid-content bg-purple">
            <el-container>
              <el-aside style="background-color: rgba(255, 255, 255, 1);width:100%">
                <el-menu :default-openeds="['1']">
                  <el-submenu index="1">
                    <template slot="title">
                      <!-- <i class="el-icon-document-copy"></i> -->
                      文件参数
                    </template>
                    <div class="parameter pub">
                      <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-document-remove"></i> 文件名称
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.name}}</span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-position"></i> 文档来源
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.source}}</span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-office-building"></i> 涉及业务
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.involvedBussyniss}}</span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-files"></i> 分类目录
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.folderName}}</span>
                        </el-col>
                      </el-row>
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-document"></i> 发文字号
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.issuedNumber}}</span>
                        </el-col>
                      </el-row> -->
                      <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-thumb"></i> 关键字
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.keywords}}</span>
                        </el-col>
                      </el-row>
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-news"></i> 涉及行业
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.involvedIndustry}}</span>
                        </el-col>
                      </el-row> -->
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-ship"></i> 作者
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.author}}</span>
                        </el-col>
                      </el-row> -->
                      <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-mouse"></i> 文档编号
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.docNo}}</span>
                        </el-col>
                      </el-row>
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-date"></i> 发文日期
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.publishTime}}</span>
                        </el-col>
                      </el-row> -->
                      <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-warning-outline"></i> 文档状态
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.versionType}}</span>
                        </el-col>
                      </el-row>
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-warning-outline"></i> 文件大小
                          </span>
                        </el-col>
                        <el-col :span="17" style="text-align: right;">
                          <span>{{document.versionType}}</span>
                        </el-col>
                      </el-row> -->
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-s-fold"></i> 文档分类
                          </span>
                        </el-col>
                        <el-col :span="17" style="text-align: right;">
                          <span>{{document.extName}}</span>
                        </el-col>
                      </el-row> -->
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-notebook-2"></i> 编目编号
                          </span>
                        </el-col>
                        <el-col :span="17" style="text-align: right;">
                          <span>{{document.fileCataloging}}</span>
                        </el-col>
                      </el-row> -->
                      <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-connection"></i> 文件大小
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.docSize | numFilterScan}}{{document.unit}}</span>
                        </el-col>
                      </el-row>
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-view"></i> 浏览次数
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.readNumber}}</span>
                        </el-col>
                      </el-row> -->
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-download"></i> 下载次数
                          </span>
                        </el-col>
                        <el-col :span="17"
                                style="text-align: right;">
                          <span>{{document.downloadNumber}}</span>
                        </el-col>
                      </el-row> -->
                      <!-- <el-row>
                        <el-col style="width:110px;">
                          <span>
                            <i class="el-icon-tickets"></i> 文档描述
                          </span>
                        </el-col>
                        <el-col :span="17" style="text-align: right;">
                          <span>{{document.remark}}</span>
                        </el-col>
                      </el-row> -->
                    </div>
                  </el-submenu>
                  <div v-if="folderType"
                       style="position: fixed;bottom:16px;width:392px;">
                    <div class="button_shen"
                         style="margin-bottom:16px;margin-left:0px;height:50px; display: flex; justify-content: center;align-items: center;"
                         @click="optPopup = true">编辑</div>
                    <div class="button_shen"
                         style="margin-left:0px;height:50px; display: flex; justify-content: center;align-items: center;"
                         @click="dialogFormroleVisible = true">审核</div>
                  </div>
                  <div v-if="!folderType">
                    <!-- <el-submenu index="2">
                      <template slot="title">
                        <i class="el-icon-c-scale-to-original"></i>历史版本
                      </template>
                      <div class="history pub">
                        <el-row>
                          <el-col style="min-width:130px;">
                            <span class="draft">
                              <span>审阅稿</span>
                              <span>
                                <i class="el-icon-date"></i>2019年5月
                              </span>
                            </span>
                          </el-col>
                          <el-col :span="17" style="text-align: right;">
                            <span>V1.1</span>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col style="min-width:130px;">
                            <span class="draft">
                              <span>意见征询稿</span>
                              <span>
                                <i class="el-icon-date"></i>2019年5月
                              </span>
                            </span>
                          </el-col>
                          <el-col :span="17" style="text-align: right;">
                            <span>V1.1</span>
                          </el-col>
                        </el-row>
                      </div>
                    </el-submenu> -->
                    <!-- <el-submenu index="3" class="comment" v-if="examineState!=0"> -->
                    <!-- <el-submenu index="3" class="comment" v-if="this.examineState!=0"> -->
                    <!-- <template slot="title"> -->
                    <!-- <el-button type="success" icon="el-icon-setting">我要评论</el-button> -->
                    <!-- <div style="background:rgba(43,149,247,1);
border-radius:2px;color:#fff;display: flex;
    justify-content: center;
    align-items: center;"><i class="el-icon-setting"></i>我要评论</div>
                      </template>
                      <el-input
                        type="textarea"
                        placeholder="请输入评论内容"
                        v-model="textarea"
                        :maxlength="200"
                        show-word-limit
                        resize="none"
                        :autosize="{ minRows: 4, maxRows: 30}"
                      ></el-input>
                    </el-submenu> -->
                  </div>
                </el-menu>
              </el-aside>
            </el-container>
          </div>
        </div>
      </div>
      <!-- 遮罩 -->
      <div class="mask"
           v-if="useIframeView">
        <div>
          <i class="el-icon-loading"></i>
          <p>数据加载中...</p>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->

    <el-dialog title="文档编辑"
               :visible.sync="optPopup"
               class="edictDia wdbjDialog"
               :close-on-click-modal="false"
               :append-to-body="true"
               width="60%">
      <el-form ref="form"
               :model="form"
               label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="文件名称：">
              <el-input v-model="form.name"
                        placeholder="请输入文件名称"
                        @input="change($event)"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文档来源：">
              <el-autocomplete style="width:100%;"
                               popper-class="my-autocomplete"
                               v-model="form.source"
                               :fetch-suggestions="querySearch"
                               placeholder="请输入文档来源"
                               @select="handleSelect"
                               @input="change($event)">

                <template slot-scope="props">
                  <div class="name">{{ props.item.name }}</div>
                </template>
              </el-autocomplete>

            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="涉及业务：">
              <el-select v-model="form.bussyniss"
                         multiple
                         @input="change($event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictbussyniss"
                           :key="index"
                           :label="item.zhCn"
                           :value="item.zhCn"></el-option>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="folderType=='3'"
                          label="文档分类：">
              <el-cascader expand-trigger="hover"
                           :options="forderdata"
                           :props="folderprops"
                           :placeholder="form.folderName"
                           :show-all-levels="false"
                           v-model="selectefolderid"
                           :change-on-select="true"
                           @change="handleChange"
                           style="width:100%">
              </el-cascader>
            </el-form-item>
            <el-form-item v-else
                          label="分类目录：">
              <el-cascader expand-trigger="hover"
                           :options="forderdata"
                           :placeholder="form.folderName"
                           :props="folderprops"
                           :show-all-levels="false"
                           v-model="selectefolderid"
                           :change-on-select="true"
                           @change="handleChange"
                           style="width:100%">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="发文字号：">
              <el-input v-model="form.issuedNumber"
                        @input="change($event)"
                        placeholder="请输入发文字号"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="关键字：">
              <el-input v-model="form.keywords"
                        placeholder="请输入关键字, 多个关键字用“、”隔开"
                        @input="change($event)"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文档编号：">
              <el-input v-model="form.docNo"
                        :readonly="true"
                        @input="change($event)"
                        placeholder="请输入文档编号"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="文件标签：">
              <div class="label">
                <el-tag :key="index"
                        v-for="(tag ,index) in selectedtag"
                        closable
                        :disable-transitions="false"
                        @close="handleClosetag(tag)">
                  {{tag.name}}
                </el-tag>

                <i class="el-icon-circle-plus-outline"
                   @click="AddFlowpatreason"></i>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="涉及行业：">
              <el-select v-model="form.industry"
                         multiple
                         @input="change($event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictindustry"
                           :key="index"
                           :label="item.zhCn"
                           :value="item.zhCn"></el-option>

              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="作者：">
              <el-input v-model="form.author"
                        @input="change($event)"
                        placeholder="请输入作者"
                        :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文档编号：">
              <el-input v-model="form.docNo"
                        :readonly="true"
                        @input="change($event)"
                        placeholder="请输入文档编号"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="发文日期：">
              <el-date-picker v-model="form.publishTime"
                              type="date"
                              @input="change($event)"
                              placeholder="请选择发文日期"
                              style="width:100%;">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="文档状态：">
              <!-- <el-col :span="20"
                      class="selt"> -->
              <el-select v-model="form.versionType"
                         placeholder="请选择文档状态"
                         @input="change($event)"
                         style="width:100%;">
                <el-option v-for="(item ,index ) in dictversions"
                           :key="index"
                           :label="item.zhCn"
                           :value="item.zhCn"></el-option>
              </el-select>
              <!-- </el-col> -->
              <!-- <el-col :span="11"
                      class="inp">
                <el-input v-model="form.versionRemark" :maxlength="50"></el-input>
              </el-col> -->
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="关联相关：">
              <el-button @click="handleEditt"
                         style="width:100%;">请选择要关联的文件</el-button>
              <div class="relevance"
                   v-for="(item,index) in guanlian"
                   :key="index"><span class="el-icon-paperclip"></span>{{item.name?item.name:item.NAME}}<span class="el-icon-close"
                      @click="guanliandelet(item)"></span></div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本关联：">
              <el-button @click="handlEdition"
                         style="width:100%;">请选择要关联的版本</el-button>
              <div class="relevance"
                   v-for="(item,index) in versiondoc"
                   :key="index"><span class="el-icon-paperclip"></span>{{item.name?item.name:item.NAME}}<span class="el-icon-close"
                      @click="versiondocdelet(item)"></span></div>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <!-- 单位文档上传 folderType == '3' -->
        <!-- <el-button @click="closeupload"
                   style="background:rgba(233,243,255,1);color:rgba(43,149,247,1);border:none;">取消</el-button>
        <el-button v-if="folderType=='3'"
                   type="primary"
                   @click="onSubmit">完成</el-button>
        <el-button v-else
                   type="primary"
                   @click="onSubmit">完成</el-button> -->

        <span class="button_shen"
              v-if="folderType=='3'"
              @click="onSubmit">完成</span>
        <span class="button_shen"
              v-else
              @click="onSubmit">完成</span>
        <div style="width:96px;height:40px;"></div>
        <span class="button_qian"
              @click="closeupload">取消</span>
      </div>
    </el-dialog>

    <el-dialog title="文档审核"
               :visible.sync="dialogFormroleVisible"
               class="collection guanliDialog"
               :close-on-click-modal="false"
               :append-to-body="true"
               width="40%">
      <div class="diologSwitchHeight_box">
        <div style="width:100%;display:flex;justify-content: flex-start;align-items: center;">
          <p style="min-width:85px;font-size:16px;padding: 20px 0px 10px;">审核意见：</p>
          <el-input type="textarea"
                    placeholder="请输入审核意见"
                    v-model="textarea1"
                    :maxlength="200"
                    show-word-limit
                    resize="none"
                    :autosize="{ minRows: 4, maxRows: 30}"></el-input>
        </div>
        <div style="font-size:16px;margin-top:15px;">
          温馨提示：
          <span>审核通过即发布文档，请确保文档符合发布要求</span>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <!-- <el-button type="primary"
                   @click="auditFailed"
                   style="color:red;background:#fff;border:1px solid red;">审核不通过</el-button>
        <el-button type="primary"
                   @click="auditPass">审核通过</el-button> -->

        <span class="button_shen"
              style="background:#f56c6c;"
              @click="auditFailed">审核不通过</span>
        <div style="width:96px;height:40px;"></div>
        <span class="button_shen"
              @click="auditPass">审核通过</span>
      </div>
    </el-dialog>

    <!-- 标签 -->
    <el-dialog :title="savetitle"
               :visible.sync="dialogFormVisible"
               width="40%"
               class="bianjiDialog"
               :append-to-body="true"
               :close-on-click-modal="false">
      <el-container style="background:rgba(248,248,248,1);
border:1px solid rgba(231,231,231,1);
border-radius:2px;padding:10px;">
        <el-row :gutter="2">
          <el-col :span="24">
            <p style="font-size:16px;">已选标签 <span>（最多只能添加六个）</span></p>
            <el-tag style="margin: 10px;"
                    :key="index"
                    v-for="(tag ,index) in selectedtag"
                    closable
                    :disable-transitions="false"
                    @close="handleClosetag(tag)">
              {{tag.name}}
            </el-tag>
          </el-col>
          <el-col :span="24">
            <p style="font-size:16px;margin-top:50px;">全部标签</p>
            <span v-for="(tag,index) in alltag"
                  :key="index">
              <el-button v-if="selectedtagid.indexOf(tag.id)!=-1"
                         class="button-new-tag"
                         size="small">{{tag.name}} +</el-button>
              <el-button v-else
                         class="button-new-tag"
                         size="small"
                         @click="handleInputConfirm(tag)">{{tag.name}} +</el-button>
            </span>
          </el-col>
        </el-row>

      </el-container>
      <div slot="footer"
           class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false"
                   class="primary_reset">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible = false"
                   class="primary_search">提交</el-button> -->

        <span class="button_shen"
              @click="dialogFormVisible = false">提交</span>
        <div style="width:96px;height:40px;"></div>
        <span class="button_qian"
              @click="dialogFormVisible = false">取消</span>
      </div>
    </el-dialog>

    <!-- 关联相关 -->
    <el-dialog :title="dlogTitle"
               class="companyInfo guanliDialog"
               width="70%"
               :visible.sync="guanlianDia"
               :append-to-body='true'
               :close-on-click-modal="false">
      <div class="diologSwitchHeight_box EPF-table">
        <el-row :gutter="2">
          <el-col :span="24"
                  class="filterIpt">
            <el-input size="small"
                      placeholder="请输入您要关联的相关文件的名称或关键字"
                      v-model="searchInfo.name"
                      @keyup.enter.native="tosearch"
                      :maxlength="50"></el-input>
            <i class="el-icon-search"
               @click="tosearch"></i>
          </el-col>
        </el-row>
        <!--
                <el-row :gutter="2">
                    <el-col :span="24" style="margin-top:15px;">
                        <el-select v-model="form.region" :placeholder="folder">
                            <el-option label="个人收藏夹" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                </el-row>-->
        <el-table :data="docInfoList"
                  style="width: 100%;min-height:80px;"
                  border
                  stripe
                  v-loading="loading"
                  @selection-change="dialogCheckChange"
                  ref="multipleTable"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)"
                  :header-cell-style="{background:'rgba(246,246,246,1)'}">

          <el-table-column type="selection"
                           width="55"
                           align="center"></el-table-column>

          <el-table-column prop="name"
                           label="文件名称"
                           min-width="180"
                           align="center">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>

          <el-table-column prop="source"
                           label="文档来源"
                           min-width="150"
                           align="center">
            <template slot-scope="scope">
              {{scope.row.source}}
            </template>
          </el-table-column>
          <el-table-column prop="publishTime"
                           label="发文日期"
                           min-width="130"
                           align="center">
            <template slot-scope="scope">
              {{scope.row.publishTime}}
            </template>
          </el-table-column>
        </el-table>

        <div style="text-align:right;margin:8px 0px;margin-top:15px;">
          <el-pagination background
                         layout="total,prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-size="pageSize"
                         :current-page="pageNo"
                         :total="totalRecord"
                         :pager-count="6"></el-pagination>
        </div>

        <!-- <el-row>
          <el-col :span="24"
                  style="text-align: center;margin-top:10px">
            <span class="button_border"
                  @click="guanlianDia = false"
                  style="margin:0;">确定</span>
          </el-col>
        </el-row> -->
      </div>
      <span slot="footer"
            class="dialog-footer">
        <span class="button_shen"
              @click="guanlianDia = false">确定</span>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import configIndex from '../../../../../config/index'
import selectInput from '@/components/common/form/selectInpt'
import { mapActions, mapState } from 'vuex'
import Bus from '../../../../utils/bus'
export default {
  name: 'documentBrowse',
  components: {
    'remote-js': {
      render (createElement) {
        return createElement('script', {
          attrs: {
            type: 'text/javascript',
            src: ''
          }
        })
      }
    }
  },
  data () {
    return {
      examineState: '',
      dictversions: [],
      folderprops: { value: 'id', label: 'folderName', children: 'childForder' },
      // selectefolderid: ["4bed7a93-68ef-4feb-a787-ce244d856f82"],
      selectefolderid: [],
      forderdata: [],
      relaod: '',
      type: '0',
      editor: '',
      docInfoList: [],
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      dialogtype: '',
      folder: '',
      dlogTitle: '',
      loading: false,
      dialogFormVisible: false, // 标签选择
      alltag: [],
      savetitle: '',
      dictbussyniss: [],
      selectedtag: [],
      selectedtagid: [],
      dictindustry: [
        // {zhCn: 'lalal'},
        // {zhCn: 'zizi'}
      ],
      form: { name: '', docNo: '' },
      restaurants: [{ 'name': '厅规划处', 'value': '厅规划处' }, { 'name': '厅领导', 'value': '厅领导' }],
      menuListHeight: 100,
      document: {
        versionType: '',
        docSize: ''
      },
      row: {},
      textarea: '',
      textarea1: '',
      iframeSrc: '',
      optPopup: false,
      guanlian: [],
      guanlianDia: false,
      input: '',
      test: false,
      dialogFormroleVisible: false,
      folderType: '',
      documentType: {
        docx: 'text',
        doc: 'text',
        xlsx: 'spreadsheet',
        xls: 'spreadsheet',
        pptx: 'presentation',
        ppt: 'presentation',
        wps: 'text',
        pdf: 'text'
      },
      useIframeView: true,
      onlyofficeApiJsAddr: configIndex.dev.onlyofficeApiJsAddr
    }
  },
  created () {
    let that = this
    this.examineState = this.$route.query.row.examineState
    this.loadTree()// 文件夹
    this.row = this.$route.query.row
    this.editor = this.$route.query.editor
    this.folderType = this.$route.query.folderType
    this.type = this.$route.query.uplaodtype
    this.relaod = this.$route.query.relaod
    this.folderType = this.$route.query.folderType
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.queryDictList('involved_industry')
    this.queryDictList('involved_bussyniss')
    this.queryDictList('doc_versions')
    this.queryDictList('doc_sourse')
    if (this.editor == 1) { // 是否为编辑
      this.form = this.row
      if (this.relaod == 1) {
        this.form.lastVersionId = this.form.id
      }

      this.form.pbtime = new Date(this.row.publishTime)
      this.getinit(this.row.id)
    }
    // 审核数据
    // name: '名字', docNo: '',source: '123' ,bussyniss: '商业' ,issuedNumber: '数字' ,keywords: '关键字' ,industry: '行业'
    // if(this.$route.query.folderType == '1') {
    this.form.id = this.$route.query.row.id
    this.form.name = this.$route.query.row.name
    this.form.versionType = this.$route.query.row.versionType
    this.form.version = this.$route.query.row.version
    this.form.source = this.$route.query.row.source
    this.form.extName = this.$route.query.row.extName
    this.form.docSize = this.$route.query.row.docSize
    this.form.issuedNumber = this.$route.query.row.issuedNumber
    this.form.fileCataloging = this.$route.query.row.fileCataloging
    this.form.readNumber = this.$route.query.row.readNumber
    this.form.publishTime = this.$route.query.row.publishTime
    this.form.remark = this.$route.query.row.remark
    this.form.downloadNumber = this.$route.query.row.downloadNumber
    this.form.keywords = this.$route.query.row.keywords
    this.form.involvedBussyniss = this.$route.query.row.involvedBussyniss
    this.form.involvedIndustry = this.$route.query.row.involvedIndustry
    this.form.author = this.$route.query.row.author
    this.form.docNo = this.$route.query.row.docNo
    this.form.bussyniss = this.$route.query.row.bussyniss
    this.form.issuedNumber = this.$route.query.row.issuedNumber
    this.form.folderName = this.$route.query.row.folderName
    if (this.form['involvedIndustry'] !== null || this.form['involvedIndustry'] !== undefined) { this.form.industry = this.form['involvedIndustry'].split(',') }
    if (this.form['involvedBussyniss'] !== null || this.form['involvedBussyniss'] !== undefined) { this.form.bussyniss = this.form['involvedBussyniss'].split(',') }
    // }

    this.menuListHeight = window.innerHeight - 245
    // this.addview(this.$route.query.row.id);
    this.document.id = this.$route.query.row.id
    this.document.unit = this.$route.query.row.unit
    this.document.name = this.$route.query.row.name
    this.document.versionType = this.$route.query.row.versionType
    this.document.version = this.$route.query.row.version
    this.document.source = this.$route.query.row.source
    this.document.extName = this.$route.query.row.extName
    this.document.docSize = this.$route.query.row.docSize
    this.document.issuedNumber = this.$route.query.row.issuedNumber
    this.document.fileCataloging = this.$route.query.row.fileCataloging
    this.document.readNumber = this.$route.query.row.readNumber
    this.document.publishTime = this.$route.query.row.publishTime
    this.document.remark = this.$route.query.row.remark
    this.document.downloadNumber = this.$route.query.row.downloadNumber
    this.document.keywords = this.$route.query.row.keywords
    this.document.involvedBussyniss = this.$route.query.row.involvedBussyniss
    this.document.involvedIndustry = this.$route.query.row.involvedIndustry
    this.document.author = this.$route.query.row.author
    this.document.docNo = this.$route.query.row.docNo
    this.document.issuedNumber = this.$route.query.row.issuedNumber
    this.document.folderName = this.$route.query.row.folderName
    this.folderType = this.$route.query.folderType

    this.getinit(this.row.id)
    this.getDocList(this.searchInfo)
    if (this.isUseIframeView(this.document.extName)) {
      this.initIframeSrc(this.document)
    } else {
      setTimeout(function () {
        that.initDocEditor()
      }, 1000)
    }
  },
  watch: {
    $route: function (to, from) {
      let that = this
      console.log(this.$route.query.row)
      this.examineState = this.$route.query.row.examineState
      console.log(this.examineState)
      this.menuListHeight = window.innerHeight - 245
      // this.addview(this.$route.query.row.id);

      this.document.id = this.$route.query.row.id
      this.document.unit = this.$route.query.row.unit
      this.getinit(this.document.id)
      this.document.name = this.$route.query.row.name
      this.document.versionType = this.$route.query.row.versionType
      this.document.version = this.$route.query.row.version
      this.document.source = this.$route.query.row.source
      this.document.extName = this.$route.query.row.extName
      this.document.docSize = this.$route.query.row.docSize
      this.document.issuedNumber = this.$route.query.row.issuedNumber
      this.document.fileCataloging = this.$route.query.row.fileCataloging
      this.document.readNumber = this.$route.query.row.readNumber
      this.document.publishTime = this.$route.query.row.publishTime
      this.document.remark = this.$route.query.row.remark
      this.document.author = this.$route.query.row.author
      this.document.involvedBussyniss = this.$route.query.row.involvedBussyniss
      this.document.involvedIndustry = this.$route.query.row.involvedIndustry
      this.document.folderName = this.$route.query.row.folderName
      this.document.keywords = this.$route.query.row.keywords
      this.document.docNo = this.$route.query.row.docNo
      this.document.downloadNumber = this.$route.query.row.downloadNumber

      this.form.id = this.$route.query.row.id
      this.form.name = this.$route.query.row.name
      this.form.versionType = this.$route.query.row.versionType
      this.form.version = this.$route.query.row.version
      this.form.source = this.$route.query.row.source
      this.form.extName = this.$route.query.row.extName
      this.form.docSize = this.$route.query.row.docSize
      this.form.issuedNumber = this.$route.query.row.issuedNumber
      this.form.fileCataloging = this.$route.query.row.fileCataloging
      this.form.readNumber = this.$route.query.row.readNumber
      this.form.publishTime = this.$route.query.row.publishTime
      this.form.remark = this.$route.query.row.remark
      this.form.downloadNumber = this.$route.query.row.downloadNumber
      this.form.keywords = this.$route.query.row.keywords
      this.form.involvedBussyniss = this.$route.query.row.involvedBussyniss
      this.form.involvedIndustry = this.$route.query.row.involvedIndustry
      this.form.author = this.$route.query.row.author
      this.form.docNo = this.$route.query.row.docNo
      this.form.bussyniss = this.$route.query.row.bussyniss
      this.form.issuedNumber = this.$route.query.row.issuedNumber
      this.form.folderName = this.$route.query.row.folderName
      this.folderType = this.$route.query.folderType

      if (this.isUseIframeView(this.document.extName)) {
        this.initIframeSrc(this.document)
      } else {
        setTimeout(function () {
          that.initDocEditor()
        }, 1000)
      }
    }
  },
  mounted () {
    if (this.isUseIframeView(this.document.extName)) {
      this.initMask()
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    handleSelect (item) {

    },
    handleChange (value) {
      this.selectefolderid = value
    },
    loadTree () { // 获取文件
      var that = this
      this.loading = true
      let urlStr = ''
      let params = {}
      urlStr = '/epf-document/admin/docfolder/getFolderByType'
      params['folderType'] = '1'

      that.$post(urlStr, params).then(res => {
        that.forderdata = res.ztreeJson
        this.loading = false
      })
    },
    tosearch () {
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = this.pageSize
      this.getDocList(this.searchInfo)
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = val
      this.getDocList(this.searchInfo)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.pageSize
      this.getDocList(this.searchInfo)
    },
    async getDocList (params) {
      this.loading = true

      params['foldertype'] = this.folderType

      this.$get('/epf-document/docdocumentinfo/getTenantDocJson', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          this.loading = false
          return
        }
        if (params.load) {
          this.totlecorde = res.pager.totalRecord
          this.searchInfo['load'] = ''
        }
        this.pageNo = res.pager.pageNo
        this.pageSize = res.pager.pageSize
        this.totalPage = res.pager.totalPage
        this.totalRecord = res.pager.totalRecord
        this.docInfoList = res.pager.results

        this.loading = false
      })
    },
    dialogCheckChange (selection) {
      if (this.dialogtype == 'guanlian') {
        this.guanlian = selection
      } else {
        this.versiondoc = selection
      }
    },
    handleEditt (index, row) {
      this.dlogTitle = '关联相关'
      this.folder = '个人收藏夹'
      this.dialogtype = 'guanlian'

      this.guanlianDia = true
      this.$refs.multipleTable.clearSelection()
    },
    handlEdition (index, row) {
      this.dlogTitle = '关联版本'
      this.folder = '政策法规'
      this.dialogtype = ''
      this.guanlianDia = true
      this.$refs.multipleTable.clearSelection()
    },
    handleInputConfirm (tag) {
      if (this.selectedtag.length >= 6) {
        this.$message.warning('最多添加六条标签！')
        return
      } else {
        this.selectedtag.push(tag)
        this.selectedtagid.push(tag.id)
      }
    },
    async getinit (id) {
      var params = {}
      this.$post('/epf-document/admin/doctag/getTagJson', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          this.loading = false
          return
        }
        this.alltag = res.tags
        this.loading = false

        //   return R.ok().put("tags", tags).put("guanlianlist", guanlianlist).put("versionlist", versionlist);
        this.$get('/epf-document/admin/doctag/getdocinit', { id: id }).then(res => {
          if (res.code != '0') {
            this.$message.error(res.msg) // 失败
            return
          }
          var ids = []
          var taglist = []
          if (res.tags != null && res.tags.length > 0) {
            for (let j = 0; j < this.alltag.length; j++) {
              for (let i = 0; i < res.tags.length; i++) {
                if (res.tags[i].TAG_ID == this.alltag[j].id) {
                  taglist.push(this.alltag[j])
                  ids.push(this.alltag[j].id)
                }
              }
            }
          }
          this.selectedtag = taglist
          this.selectedtagid = ids
          this.guanlian = res.guanlianlist

          this.versiondoc = res.versionlist
        })
      })
    },
    async Addtagtreason () {
      var params = {}
      params['type'] = this.type
      this.$post('/epf-document/admin/doctag/getTagJson', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          this.loading = false
          return
        }
        this.alltag = res.tags
        this.loading = false
      })
    },
    handleRemove (file, fileList) {
    },
    AddFlowpatreason () {
      this.savetitle = '标签选择'
      this.Addtagtreason()
      this.dialogFormVisible = true
    },

    // AddFlowpatreason() {
    //   this.dialogFormroleVisible = true
    // },
    change (e) {
      this.$forceUpdate()
    },
    queryDictList (code) {
      var that = this
      that.$get('/epf-admin/admin/dictionaries/getDictEbyDictGroup/' + code).then(res => {
        if (res.code === 0) {
          that.dictbussyniss = res.dictionariesList
          if (code == 'involved_industry') {
            if (res.dictionariesList != null) {
              that.dictindustry = res.dictionariesList
            } else {
              that.dictindustry = []
            }
          } else if (code == 'doc_sourse') {
            if (res.dictionariesList != null) {
              var list = []
              for (let index = 0; index < res.dictionariesList.length; index++) {
                list.push({ name: res.dictionariesList[index]['zhCn'], value: res.dictionariesList[index]['zhCn'] })
              }
              that.restaurants = list
            } else {
              that.restaurants = []
            }
          } else if (code == 'doc_versions') {
            if (res.dictionariesList != null) {
              that.dictversions = res.dictionariesList
            } else {
              that.dictversions = []
            }
          } else {
            if (res.dictionariesList != null) {
              that.dictbussyniss = res.dictionariesList
            } else {
              that.dictbussyniss = []
            }
          }
        } else {
          that.$message.warning(res.msg)
        }
      })
    },
    onSubmit () { // 保存
      var that = this
      var form = that.form
      var newform = {}
      // var tags = that.selectedtagid
      // var guanlian = this.guanlian
      // var tagids = ''
      // var guanliid = ''
      // var versid = ''
      // newform['involvedIndustry'] = this.form.industry.join(',')
      newform['involvedBussyniss'] = this.form.bussyniss.join(',')
      // if (tags.length > 0) {
      //   for (let index = 0; index < tags.length; index++) {
      //     tagids += tags[index] + ','
      //   }
      // }
      // if (guanlian.length > 0) {
      //   for (let index = 0; index < this.guanlian.length; index++) {
      //     guanliid += (this.guanlian[index].id ? this.guanlian[index].id : this.guanlian[index].ID) + ','
      //   }
      // }
      // if (this.versiondoc.length > 0) {
      //   for (let index = 0; index < this.versiondoc.length; index++) {
      //     versid += (this.versiondoc[index].id ? this.versiondoc[index].id : this.versiondoc[index].ID) + ','
      //   }
      // }
      // if (this.selectefolderid.length == 0) {
      //   this.$message.warning('请选择文档分类') // 失败
      //   return
      // }

      newform['folderId'] = this.selectefolderid[this.selectefolderid.length - 1]
      // newform['tagids'] = tagids
      // newform['guanliid'] = guanliid
      // newform['versid'] = versid
      newform['id'] = form['id']
      newform['name'] = form['name']
      newform['source'] = form['source']
      // newform['author'] = form['author']
      newform['catalog'] = form['catalog']
      newform['remark'] = form['remark']
      newform['versionType'] = form['versionType']
      newform['versionRemark'] = form['versionRemark']
      // newform['issuedNumber'] = form['issuedNumber']
      newform['docNo'] = form['docNo']
      newform['keywords'] = form['keywords']
      newform['fileCataloging'] = form['fileCataloging']
      newform['lastVersionId'] = form['lastVersionId']
      // newform['pbtime'] = form['publishTime']
      newform['folderName'] = form['folderName']
      // newform['involvedIndustry'] = form.industry
      // newform['involvedBussyniss'] = form.bussyniss
      // form["folderId"]="id,id";
      that.$post('/epf-document/docdocumentinfo/saveDocOnExamine', newform).then(res => {
        if (res.code == '0') {
          Object.keys(this.document).forEach(key => { this.document[key] = newform[key] })
          this.$message.success('编辑成功')
        } else {
          this.$message.error(res.msg) // 失败
        }

        // this.$bus.$emit('closeTabsItem', this.$route.name)
        // if (this.type == '1') { // 单位文档上传
        //   let routerPath = '/knowledgeConsult?folderType=3'
        //   let title = '单位文档上传记录'
        //   var tabObj = { title, routerPath }
        //   this.setTabsList(tabObj)
        //   this.$router.push('/knowledgeConsult?folderType=3')
        // } else {
        //   let routerPath = '/knowledgeConsult?folderType=1'
        //   let title = '公共文档上传记录'
        //   var tabObj = { title, routerPath }
        //   this.setTabsList(tabObj)
        //   this.$router.push('/knowledgeConsult?folderType=1')
        // }
        // this.$bus.$emit('refreshAssembly')
      })
      that.optPopup = false
      // this.$router.push('/myAudit?folderType=3')
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleClosetag (tag) {
      this.selectedtagid.splice(this.selectedtagid.indexOf(tag.id), 1)
      this.selectedtag.splice(this.selectedtag.indexOf(tag), 1)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    closeupload () {
      let that = this
      that.optPopup = false
      // this.$bus.$emit('closeTabsItem', this.$route.name)
      // if (this.type == '1') { // 单位文档上传
      //   let routerPath = '/workFiles'
      //   let title = '单位文档'
      //   var tabObj = { title, routerPath }
      //   this.setTabsList(tabObj)
      //   this.$router.push('/workFiles')
      // } else {
      //   let routerPath = '/knowledge'
      //   let title = '公共文档'
      //   var tabObj = { title, routerPath }
      //   this.setTabsList(tabObj)
      //   this.$router.push('/knowledge')
      // }

      // this.$bus.$emit('refreshAssembly')
    },
    addview (id) {
      // var _this=this
      // _this.$get("/epf-document/docdocumentinfo/addviews", {id:id,type:"read"}).then(res => {//浏览量read下载量down
      // });
    },
    auditPass () {
      this.$bus.$emit('closeTabsItem', 'myAudit')
      this.$bus.$emit('closeTabsItem', 'workAudit')
      let paramsData = {
        id: this.document.id,
        examineState: '2',
        examineComments: this.textarea1
      }
      if (this.folderType == '1') {
        this.$post(
          '/epf-document/docdocumentinfo/examineDocs',
          paramsData
        ).then(res => {
          this.$message({
            message: '审核通过',
            type: 'success'
          })
          this.$bus.$emit('closeTabsItem', this.$route.name)
          let routerPath = 'myAudit'
          let title = '公共文档审核'
          var tabObj = { title, routerPath }
          this.setTabsList(tabObj)
          this.$router.push({ path: routerPath })
          this.$bus.$emit('proSubmit1', true)
          this.dialogFormroleVisible = false
          // 路由跳转
          // this.$bus.$emit("closeTabsItem", this.$route.name);
          // let routerPath = "/workAuditConsult?folderType=1";
          // let title = "审核记录";
          // var tabObj = { title, routerPath };
          // this.setTabsList(tabObj);
          // this.$router.push("/workAuditConsult?folderType=1");
          // this.$bus.$emit("refreshAssembly");
        })
      } else if (this.folderType == '3') {
        this.$post(
          '/epf-document/docdocumentinfo/examineDocs',
          paramsData
        ).then(res => {
          this.$message({
            message: '审核通过',
            type: 'success'
          })
          // 路由跳转
          this.$bus.$emit('closeTabsItem', this.$route.name)
          let routerPath = '/workAudit'
          let title = '单位文档审核'
          var tabObj = { title, routerPath }
          this.setTabsList(tabObj)
          this.$router.push({ path: routerPath })
          this.$bus.$emit('refreshAssembly')
        })
        this.$bus.$emit('proSubmit2', true)
      }

      this.dialogFormroleVisible = false
    },
    auditFailed () {
      this.$bus.$emit('closeTabsItem', 'myAudit')
      this.$bus.$emit('closeTabsItem', 'workAudit')
      let paramsData = {
        id: this.document.id,
        examineState: '1',
        examineComments: this.textarea1
      }
      if (this.folderType == '1') {
        this.$post(
          '/epf-document/docdocumentinfo/examineDocs',
          paramsData
        ).then(res => {
          this.$message('审核不通过')
          this.$bus.$emit('closeTabsItem', this.$route.name)
          let routerPath = 'myAudit'
          let title = '公共文档审核'
          var tabObj = { title, routerPath }
          this.setTabsList(tabObj)
          this.$router.push({ path: routerPath })
          this.dialogFormroleVisible = false

          // 路由跳转
          // this.$bus.$emit("closeTabsItem", this.$route.name);

          // let routerPath = "/workAuditConsult?folderType=1";
          // let title = "审核记录";
          // var tabObj = { title, routerPath };
          // this.setTabsList(tabObj);
          // this.$router.push("/workAuditConsult?folderType=1");
          this.$bus.$emit('proSubmit1', true)
          this.$bus.$emit('refreshAssembly')
        })
      } else if (this.folderType == '3') {
        this.$post(
          '/epf-document/docdocumentinfo/examineDocs',
          paramsData
        ).then(res => {
          this.$message('审核不通过')
          this.$bus.$emit('closeTabsItem', this.$route.name)
          let routerPath = '/workAudit'
          let title = '单位文档审核'
          var tabObj = { title, routerPath }
          this.setTabsList(tabObj)
          this.$router.push('/workAudit')
          // 路由跳转
          // this.$bus.$emit("closeTabsItem", this.$route.name);
          // let routerPath = "/workAuditConsult?folderType=3";
          // let title = "审核记录";
          // var tabObj = { title, routerPath };
          // this.setTabsList(tabObj);
          // this.$router.push("/workAuditConsult?folderType=3");
          // this.$bus.$emit("refreshAssembly");
        })
        this.$bus.$emit('proSubmit2', true)
      }
      // this.$bus.$emit("closeTabsItem", myAudit);

      this.dialogFormroleVisible = false
    },
    initDocEditor () {
      let that = this
      var token = sessionStorage.getItem('token')
      // var ipAddr = configIndex.dev.proxyTable["/api"].target + '/epf-document/document/downloadById?fromWhere=page&id=' + that.document.id + '&token=' + token;
      var ipAddr = 'http://' + document.location.host + '/api/epf-document/document/downloadById?fromWhere=page&id=' + that.document.id + '&token=' + token
      var extName = that.document.extName
      extName = (extName == 'wps' ? 'docx' : extName)// wps格式特殊处理，如果是wps格式，预览时使用docx的类型
      // eslint-disable-next-line no-undef
      window.docEditor = new DocsAPI.DocEditor('documentOnlineEditor', {
        document: {
          fileType: extName,
          key: that.document.id,
          title: that.document.name,
          url:
            ipAddr
        },
        documentType: that.documentType[that.document.extName],
        editorConfig: {
          mode: 'view',
          lang: 'zh-CN' // "en-US",
        },
        height: '100%',
        width: '100%'
      })
    },
    initIframeSrc (document) {
      if (document.extName == 'html') {
        // this.iframeSrc
        //   = '/api/epf-document/document/showContentById?id='
        //   + this.$route.query.row.id
        this.iframeSrc
          = `/api/epf-document/document/showContentById?id=${document.id}&token=${sessionStorage.getItem('token')}`
      } else if (
        document.extName == 'txt'
        || document.extName == 'TXT'
        || document.extName == 'pdf'
        || document.extName == 'PDF'
      ) {
        // this.iframeSrc
        //   = '/api/epf-document/document/showFtpFileByid?id='
        //   + this.$route.query.row.id
        this.iframeSrc
          = `/api/epf-document/document/showFtpFileByid?id=${document.id}&token=${sessionStorage.getItem('token')}`
      } else {
        // this.iframeSrc
        //   = '/api/epf-document/onlinePreview?url=http://127.0.0.1:8081/,'
        //   + this.$route.query.row.id
        //   + '.'
        //   + this.document.extName
        this.iframeSrc
          // = `/api/epf-document/onlinePreview?token=${sessionStorage.getItem('token')}&url=http://127.0.0.1:8081/,`
          = `/api/epf-document/onlinePreview?token=${sessionStorage.getItem('token')}&url=`
          + document.id
          + '.'
          + document.extName
      }
    },
    initMask () {
      const mask = document.querySelector('.mask')
      const iframe = document.querySelector('#ifra')
      mask.style.display = 'block'
      // 处理兼容行问题
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', function () {
          // iframe加载完毕以后执行操作
          mask.style.display = 'none'
        })
      } else {
        iframe.onload = function () {
          // iframe加载完毕以后执行操作
          mask.style.display = 'none'
        }
      }
    },
    isUseIframeView (extName) {
      // office格式的文档使用onlyoffice预览，其他文档按原方式预览
      if (extName == 'docx'
        || extName == 'doc'
        || extName == 'xlsx'
        || extName == 'xls'
        || extName == 'pptx'
        || extName == 'ppt'
        || extName == 'wps') {
        this.useIframeView = false
        return false
      }
      this.useIframeView = true
      return true
    }
  },
  filters: {
    numFilterScan (value) {
      let realVal = ''
      if (value !== '') {
        // 截取当前数据到小数点后三位
        realVal = parseFloat(parseInt(Number(value))).toFixed(2)
        // realVal = tempVal.substring(0, tempVal.length - 1)
      } else {
        realVal = '--'
      }
      return realVal
    }
  }
}
</script>
<style scoped>
.page-body {
  padding: 16px 24px;
  background-color: #f6f6f6;
}
.headerpop {
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: bold;

  line-height: 30px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 120px;
  border-radius: 10px;
  height: 120px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.box-body {
  width: 100%;
  overflow: auto;
}
.pageName {
  padding-left: 15px;
  margin-bottom: 15px;
  border-left: 4px solid rgba(26, 188, 156, 6);
}
.toolsTitleBox {
  height: 55px;
  line-height: 55px;
  background: rgba(211, 211, 211, 0.1);
  color: #606266;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #ebeef5;
}
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
  display: inline-block;
}
.toolsTitle {
  line-height: 40px;
  font-size: 12px;
  margin-left: 25px;
}
.toolsTips {
  line-height: 40px;
  font-size: 14px;
  margin-left: 10px;
  color: red;
}
.filter_wrap {
  min-height: 789px;
  box-sizing: border-box;
  padding: 16px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
  background: #fff;
}
.switchHeight_box {
  padding-top: 15px;
  /* padding-bottom:10px; */
  /* height:80px; */
  transition: 0.5s;
  background: #fff;
  border: 1px solid #ebeef5;
}
.switchHeight_box__custom {
  width: 100%;
  padding: 16px 16px 0px;
  background-color: #f8f8f8;
  border: 1px solid #e7e7e7;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
}
.monad {
  display: block;
  width: 48px;
  position: absolute;
  top: 7px;
  left: 5px;
}
.primary {
  width: 88px;
  height: 34px;
  background-color: #ffa000;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 36px;
  display: inline-block;
  cursor: pointer;
  margin-left: 15px;
}
.flexibleSwitch {
  display: block;
  float: right;
  color: #4472d5;
  cursor: pointer;
}

.carditem {
  width: 150px;
  height: 170px;
  margin: 5px 5px;
  position: relative;
  padding: 5px;
  border-radius: 6px;
  cursor: default;
  transition: 0.4s;
  border: 1px solid #fff;
  z-index: 99 !important;
}
.carditem:hover {
  box-shadow: 0px 5px 10px rgb(134, 134, 134);
  border: 1px solid rgb(211, 211, 211);
}
.docImgBox {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 90px;
  background: rgb(255, 255, 255);
  cursor: pointer;
}
.docImgBox > img {
  object-fit: contain;
  width: 100%;
  height: 90px;
  display: block;
}
.Dangerg {
  width: 140px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.Dangergtn {
  color: #fff;
  background: #f56c6c;
}
.checkBox {
  position: absolute;
  top: 2px;
  left: 2px;
}
.check {
  padding: 0 3px;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 50%;
  background: rgba(240, 240, 240, 0.774);
}
.checked {
  padding: 0 3px;
  border: 1px solid rgb(88, 150, 57);
  border-radius: 50%;
  background: #67c23a;
}
.check i {
  font-size: 10px;
  color: rgb(153, 153, 153);
}
.checked i {
  font-size: 10px;
  color: #fff;
}
.dowld {
  color: #000;
  background: rgb(241, 245, 248);
}

.cardbottom {
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  width: 100%;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(85, 85, 85);
  transition: 0.4s;
  margin-top: 6px;
}
.cardbottomInput {
  margin-top: 8px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.cardbottomInput input {
  display: inline-block;
  box-sizing: border-box;
  width: 90px;
  height: 25px;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 3px;
  padding: 0 3px;
}
.carditem:hover {
  /* border: 1px solid rgb(211, 211, 211); */
}
.carditem:hover .cardbottom {
  color: #409eff;
}
.m_title {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 30px;
  background: rgb(50, 58, 64);
  color: #fff;
  font-size: 16px;
}
.el-tree > div {
  margin: 5px 0;
}
.iconList {
  height: 300px;
  background: rgb(255, 213, 213);
  overflow-y: auto;
}
</style>
<style scoped>
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 0 !important;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
  right: 8px;
}
/* .el-row {
        margin-bottom: 20px;
    } */
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #e5e9f2;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.documentBrowse {
  width: 100%;
  height: 100%;
  margin-left: 0px;
  margin-right: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.documentBrowse .document {
  flex: 1;
  height: 757px;
  padding-left: 0px;
  padding-right: 8px;
}
.documentBrowse .list_zsk {
  width: 400px;
  min-width: 400px;
  max-width: 400px;
  height: 757px;
  padding-left: 8px;
  padding-right: 0px;
}
.grid-content {
  width: 100%;
  height: 100%;
}
.pub > div {
  font-size: 16px;
  padding: 3% 5px;
  border-bottom: 1px solid rgb(224, 224, 224);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}

.pub {
  border-left: solid 1px #e6e6e6 !important;
  border-right: solid 1px #e6e6e6 !important;
  padding: 0 0px;
}
.history .draft {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.comment .el-submenu__title {
  background-color: transparent;
  padding: 0 !important;
}
.comment .el-button--success {
  width: 100%;
}
.comment .el-icon-arrow-down:before {
  content: "" !important;
}

.mask {
  display: none;
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.mask div {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute;
}
.mask i {
  font-size: 20px;
  color: #409eff;
}
.mask p {
  color: #409eff;
  margin: 3px 0;
  font-size: 14px;
}
.collection .el-dialog {
  width: 30%;
}
.edictDia .el-dialog {
  width: 30%;
  height: 30%;
}
.el-dialog__body {
  border-top: 1px solid #f2f3f4;
  background: rgba(248, 248, 248, 1);
}
.label {
  position: relative;
  /* overflow: auto; */
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  min-height: 40px;
  width: 100%;
}
.label i {
  position: absolute;
  top: 50%;
  right: 1%;
  margin-top: -12px;
  font-size: 24px;
  color: #3a8ee6;
  cursor: pointer;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0 5px 5px 0;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
.filterIpt {
  position: relative;
  margin-bottom: 10px;
}
.filterIpt i {
  position: absolute;
  right: 1%;
  top: 20%;
  font-size: 20px;
  cursor: pointer;
}
.edition .el-form-item__content {
  position: relative;
}
.edition .el-form-item__content .selt {
  position: absolute;
  left: 0;
}
.edition .el-form-item__content .inp {
  position: absolute;
  right: 0;
}
.wrap_shenhe {
  background: rgba(248, 248, 248, 1);
  border: 1px solid rgba(231, 231, 231, 1);
  border-radius: 2px;
  padding: 20px;
}
.primary_reset {
  width: 88px;
  height: 40px;
  border-radius: 2px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #50a5f4;
  color: #50a5f4;
  background: rgba(233, 243, 255, 1);
  border: none;
  margin-right: 15px;
}
.primary_search {
  width: 88px;
  height: 40px;
  border-radius: 2px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #2b95f7;
  color: #ffffff;
  background-color: #2b95f7;
  margin-left: 0px;
}
</style>
<style>
#documentBrowse .list_zsk .el-menu {
  border-right: solid 0px transparent;
}
#documentBrowse .list_zsk .el-menu .el-submenu__title {
  background-color: #e5e5e4;
  font-size: 18px;
  font-weight: 500;
}
.list_zsk .el-submenu {
  margin-bottom: 15px;
}
.list_zsk .el-container {
  width: 100%;
  height: 100%;
}

.wdbjDialog .el-dialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.wdbjDialog .el-dialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.wdbjDialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.wdbjDialog .el-dialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.wdbjDialog .el-dialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.wdbjDialog .el-dialog__body .el-form {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.wdbjDialog .el-dialog__body .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.wdbjDialog .el-dialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wdbjDialog .el-dialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wdbjDialog .el-dialog .button_qian,
.wdbjDialog .el-dialog .button_shen {
  margin-left: 0px;
}

.guanliDialog .el-dialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.guanliDialog .el-dialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.guanliDialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.guanliDialog
  .el-dialog
  .el-dialog__header
  .el-dialog__headerbtn
  .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.guanliDialog .el-dialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.guanliDialog .el-dialog .el-dialog__body .diologSwitchHeight_box {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.guanliDialog .el-dialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.guanliDialog .el-dialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.guanliDialog .el-dialog .button_qian,
.guanliDialog .el-dialog .button_shen {
  margin-left: 0px;
}

.guanliDialog .el-dialog .el-button {
  height: 40px;
  padding: 0px 32px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  cursor: pointer;
}
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
</style>
