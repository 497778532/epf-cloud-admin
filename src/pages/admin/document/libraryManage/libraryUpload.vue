<template>
  <div class="page-body EPF-table"
       id="libraryupload">
    <div class="filter_wrap">
      <div style="width:100%;height:56px;font-size:20px;line-height:56px;font-family:Microsoft YaHei;font-weight:600;color:rgba(32,32,32,1);border-bottom:1px solid rgba(217,217,217,1);padding-left: 16px;margin-bottom:50px">
        <span v-if="this.$route.query.folderType==1">公共文档上传</span>
        <span v-if="this.$route.query.folderType==3">单位文档上传</span>
        <!-- 文档上传 -->
      </div>
      <el-form ref="form"
               :model="form"
               label-width="130px"
               style="padding:0px 24px;"
               class="wdsc-form">
        <el-row>
          <el-col :span="18"
                  style="position:relative;">
            <span style="font-size: 18px;color: #f56c6c;position: absolute;top: 7px;left: 28px;">*</span>
            <el-form-item label="选择文件：">
              <el-upload class="upload-demo"
                         name="files"
                         action="/api/epf-document/document/upload"
                         :before-upload="fileFormatChecking"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :http-request="annexUpload"
                         :before-remove="beforeRemove"
                         multiple
                         :limit="1"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
                <!-- <el-button size="small"
                           type="primary"
                           style="margin-right:10px;">点击上传</el-button> -->
                <div class="button_kuang"
                     style="margin-left:0px;margin-right:16px;">点击上传</div>
                <span slot="tip"
                      class="el-upload__tip"
                      style="padding:left:10px;font-size:14px;">支持扩展名：
                  <span v-for="(item,index) in extName"
                        :key="index">.{{item}}&nbsp;</span></span>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="6"
                  style="display:flex; justify-content: flex-end; align-items:center;">
            <div class="button_kuang"
                 style="margin-left:0px;"
                 @click="handleClickChoice">从采集邮箱中选择</div>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="文档来源：">
              <el-autocomplete style="width:100%;"
                               popper-class="my-autocomplete"
                               v-model="form.source"
                               :fetch-suggestions="querySearch"
                               placeholder="请输入文档来源"
                               @select="handleSelect">

                <template slot-scope="props">
                  <div class="name">{{ props.item.name }}</div>
                </template>
              </el-autocomplete>

            </el-form-item>
          </el-col>
          <el-col :span="12"
                  style="position:relative;">
            <span style="font-size: 18px;color: #f56c6c;position: absolute;top: 7px;left: 28px;">*</span>
            <el-form-item label="文件名称：">
              <!-- <el-input v-model="form.name"
                        placeholder="填写文件名称" :maxlength="50"></el-input> -->
              <el-autocomplete style="width:100%;"
                               popper-class="my-autocomplete"
                               v-model="form.name"
                               :fetch-suggestions="queryNameSearch"
                               placeholder="请输入文件名称"
                               @select="handleNameSelect"
                               ref="autoInput">

                <template slot-scope="props">
                  <div class="eyeStyle">
                    <div class="name">{{ props.item.name }}</div><i class="el-icon-view"></i>
                  </div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12"
                  style="position:relative;">
            <span style="font-size: 18px;color: #f56c6c;position: absolute;top: 7px;left: 28px;">*</span>
            <el-form-item label="涉及业务：">
              <el-select v-model="form.bussyniss"
                         multiple>
                <el-option v-for="(item,index) in dictbussyniss"
                           :key="index"
                           :label="item.zhCn"
                           :value="item.zhCn"></el-option>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"
                  style="position:relative;">
            <span style="font-size: 18px;color: #f56c6c;position: absolute;top: 7px;left: 28px;">*</span>
            <!-- 单位文档上传 folderType == '3' -->
            <el-form-item v-if="folderType=='3'"
                          label="文档分类：">
              <el-cascader expand-trigger="hover"
                           :options="forderdata"
                           :props="folderprops"
                           :show-all-levels="false"
                           v-model="selectefolderid"
                           :placeholder="form.folderName"
                           :change-on-select="true"
                           @change="handleChange"
                           style="width:100%">
              </el-cascader>

            </el-form-item>
            <el-form-item v-else
                          label="分类目录：">
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
          </el-col>

        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="发文字号：">
              <el-input v-model="form.issuedNumber"
                        placeholder="请输入发文字号"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12"
                  class="edition"
                  style="position:relative;">
            <span style="font-size: 18px;color: #f56c6c;position: absolute;top: 7px;left: 42px;">*</span>
            <el-form-item label="关键字：">
              <el-input v-model="form.keywords"
                        placeholder="请输入关键字, 多个关键字用“、”隔开"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="文档编号：">
              <el-input v-model="form.docNo"
                        :readonly="true"
                        placeholder="请输入文档编号"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <!-- <el-row>
          <el-col :span="12"
                  style="position:relative;">
            <i class="el-icon-circle-plus-outline"
               style="position: absolute;top: 8px;right: 10px;z-index:100;font-size: 24px;color: #3a8ee6;cursor: pointer;"
               @click="AddFlowpatreason"></i>
            <el-form-item label="文件标签：">
              <div class="label">
                <el-tag :key="index"
                        v-for="(tag ,index) in selectedtag"
                        closable
                        :disable-transitions="false"
                        @close="handleClosetag(tag)"
                        size="small">
                  {{tag.name}}
                </el-tag>

              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12"
                  class="edition"
                  style="position:relative;">
            <span style="font-size: 18px;color: #f56c6c;position: absolute;top: 7px;left: 28px;">*</span>
            <el-form-item label="涉及行业：">
              <el-select v-model="form.industry"
                         multiple>
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
                        placeholder="请输入作者"
                        :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文档编号：">
              <el-input v-model="form.docNo"
                        :readonly="true"
                        placeholder="请输入文档编号"
                        :maxlength="50"></el-input>
            </el-form-item>
          </el-col>

        </el-row> -->
        <el-row>
          <!-- <el-col :span="12"
                  style="position:relative;">
            <span style="font-size: 18px;color: #f56c6c;position: absolute;top: 7px;left: 28px;">*</span>
            <el-form-item label="发文日期：">
              <el-date-picker v-model="form.publishTime"
                              type="date"
                              placeholder="请选择发文日期"
                              style="width:100%;">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="12"
                  class="edition"
                  style="position:relative;">
            <span style="font-size: 18px;color: #f56c6c;position: absolute;top: 7px;left: 28px;">*</span>
            <el-form-item label="文档状态：">
              <el-select v-model="form.versionType"
                         placeholder="请选择文档状态">
                <el-option v-for="(item ,index ) in dictversions"
                           :key="index"
                           :label="item.zhCn"
                           :value="item.zhCn"></el-option>
              </el-select>
              <!-- <el-col :span="11"
                      class="inp">
                <el-input v-model="form.versionRemark" :maxlength="50"></el-input>
              </el-col> -->
            </el-form-item>
          </el-col>

        </el-row>

        <!-- <el-row class="relation">
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
      <div class="form-button-box">
        <span @click="closeupload"
              class="button_qian">取消</span>
        <div style="width:94px;height:40px;"></div>
        <!-- 单位文档上传 folderType == '3' -->
        <span v-if="folderType=='3'"
              @click="onSubmit"
              class="button_shen">提交</span>
        <span v-else
              class="button_shen"
              @click="onSubmit">提交</span>
      </div>
    </div>
    <!-- 弹窗 -->
    <div>
      <!-- 关联相关 -->
      <el-dialog :title="dlogTitle"
                 class="companyInfo guanliDialog"
                 width="70%"
                 :visible.sync="optPopup"
                 :append-to-body='true'
                 :close-on-click-modal="false">
        <div class="diologSwitchHeight_box EPF-table">
          <el-row :gutter="2">
            <el-col :span="24"
                    class="filterIpt">
              <el-input placeholder="请输入您要关联的相关文件的名称或关键字"
                        v-model="searchInfo.name"
                        @keyup.enter.native="tosearch"
                        :maxlength="50"></el-input>
              <i class="el-icon-search"
                 @click="tosearch"></i>
            </el-col>
          </el-row>

          <!-- <el-row :gutter="2">
                    <el-col :span="24" style="margin-top:15px;">
                        <el-select v-model="form.region" :placeholder="folder">
                            <el-option label="个人收藏夹" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                </el-row> -->
          <el-table :data="docInfoList"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    stripe
                    :header-cell-style="tableHeaderColor"
                    @selection-change="dialogCheckChange"
                    ref="multipleTable">

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
          <!-- <el-row> -->
          <!-- <el-col :span="12"
                    style="text-align: center;margin-top:10px"> -->
          <!-- <div style="display: flex;justify-content: center;margin-top:15px;">
              <el-button type="primary"
                         @click="sureGulian">确定</el-button> -->
          <!-- <span class="button_border"
                    @click="optPopup = false"
                    style="margin:0;">确定</span> -->
          <!-- </el-col> -->
          <!-- <el-col :span="12"
                    style="text-align: center;margin-top:10px"> -->
          <!-- <el-button type="primary"
                         plain
                         @click="resetGuanlian()">重置</el-button>
            </div> -->
          <!-- <span class="button_border"
                    @click="optPopup = false"
                    style="margin:0;">重置</span> -->
          <!-- </el-col> -->
          <!-- </el-row> -->
        </div>
        <span slot="footer"
              class="dialog-footer">
          <span class="button_shen"
                @click="sureGulian">确定</span>
          <div style="width:96px;height:40px;"></div>
          <span class="button_qian"
                @click="resetGuanlian()">重置</span>
        </span>
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
              <p style="font-size:16px;">我的标签 <span>（最多只能添加六个）</span></p>
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
          <!-- <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogFormVisible = false">保存</el-button> -->
          <span class="button_shen"
                @click="dialogFormVisible = false">保存</span>
          <div style="width:96px;height:40px;"></div>
          <span class="button_qian"
                @click="dialogFormVisible = false">取消</span>
        </div>
      </el-dialog>

      <!-- 采集邮箱弹窗 -->
      <el-dialog title="从采集邮箱选择"
                 :visible.sync="dialogChoiceTable"
                 width="70%"
                 class="guanliDialog EPF-table"
                 :append-to-body="true"
                 :close-on-click-modal="false">
        <div class="diologSwitchHeight_box">
          <el-row style="margin-bottom:16px;">
            <el-col :span="6"
                    style=" display: flex;justify-content: flex-start;align-items: center;">
              <span class="filter_title__custom_two">标题：</span>
              <el-input v-model="filterData.subject"
                        placeholder="请输入标题"
                        style="width:calc(100% - 90px);"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="6"
                    style=" display: flex;justify-content: flex-start;align-items: center;">
              <span class="filter_title__custom_two">内容：</span>
              <el-input v-model="filterData.text"
                        placeholder="请输入内容"
                        style="width:calc(100% - 90px);"
                        :maxlength="100"></el-input>
            </el-col>
            <el-col :span="6"
                    style=" display: flex;justify-content: flex-start;align-items: center;">
              <span class="filter_title__custom">发送邮箱：</span>
              <el-input v-model="filterData.sendMail"
                        placeholder="请输入发送邮箱"
                        style="width:calc(100% - 120px);"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="2">
              <div style="width:100%;height:40px;"></div>
            </el-col>
            <el-col :span="4"
                    style="display:flex;justify-content:flex-end;">
              <div class="primary_reset"
                   @click="resetFilter()">重置</div>
              <div class="primary_search"
                   @click="searchList()">查询</div>
            </el-col>
          </el-row>
          <el-table :data="mailData"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    stripe
                    :header-cell-style="tableHeaderColor">
            <el-table-column width="65"
                             align="center">
              <template slot-scope="scope">
                <el-radio class="radio"
                          v-model="templateSelection"
                          :label="scope.$index"
                          @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column property="sender"
                             label="发送者"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column property="sender"
                             label="发送者"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column property="text"
                             label="文档内容"
                             min-width="150"
                             align="center"
                             :show-overflow-tooltip='true'></el-table-column>
            <el-table-column property="subject"
                             label="文档标题"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column property="sendMail"
                             label="发送邮箱"
                             min-width="150"
                             align="center"></el-table-column>
          </el-table>
          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleMailSizeChange"
                           @current-change="handleMailCurrentChange"
                           :total="mailtotalRecord"
                           :current-page.sync="mailcurrentPage"
                           :page-size="mailpageSize"></el-pagination>
          </div>
        </div>

        <div slot="footer"
             class="dialog-footer">
          <div class="primary_quxiao"
               @click="dialogChoiceTable = false">取消</div>
          <!-- <div class="primary_sure"
               @click="handleClickSure()">确认</div> -->
          <div class="primary_sure"
               @click="handleClickSure"
               :disabled="disabled">
            <span v-if="stateFront">确认</span>
            <span class="el-icon-loading"
                  v-if="stateAfter"></span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import selectInput from '@/components/common/form/selectInpt'
import { mapActions, mapState } from 'vuex'
import Bus from '../../../../utils/bus'
export default {
  name: 'libraryupload',
  data () {
    return {
      toDoc: '',
      nameRestaurants: [],
      // nameRestaurants: [{ 'name': '暂无数据', 'value': '暂无数据' }],
      restaurants: [{ 'name': '厅规划处', 'value': '厅规划处' }, { 'name': '厅领导', 'value': '厅领导' }],
      type: '0',
      relaod: '',
      folderprops: { value: 'id', label: 'folderName', children: 'childForder' },
      fileList: [],
      loading: false,
      xmbsmTableData: [],
      menuListHeight: 100,
      savetitle: '',
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      dlogTitle: '',
      folder: '',
      optPopup: false, //  控制关联弹窗
      dialogFormVisible: false, // 标签选择
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      forderdata: [],
      folderType: '', // 文件类型：1文件夹，知识分类；2收藏夹；3工作文件夹分类,文档分类
      alltag: [],
      selectedtag: [],
      selectefolderid: [],
      selectedtagid: [],
      docInfoList: [],
      searchInfo: {},
      guanlian: [],
      versiondoc: [],
      dialogtype: '',
      form: { name: '', docNo: '' },
      row: {},
      editor: '',
      selectedData: [],
      dictindustry: [],
      dictbussyniss: [],
      dictversions: [],

      dialogChoiceTable: false,
      filterData: {
        subject: '',
        text: '',
        sendMail: ''
      },
      mailData: [],
      templateSelection: '',
      selectMailID: '',
      // 页码
      mailcurrentPage: 1,
      mailpageNo: 1, // 页码
      mailpageSize: 5, // 每页条数
      mailtotalPage: 1,
      mailtotalRecord: 1,

      fullscreenLoading: false,
      stateFront: true,
      stateAfter: false,
      disabled: false,

      extName: [
        'png',
        'jpg',
        'gif',
        'rar',
        'zip',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'pdf',
        'wps'
      ]
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 245
    this.searchInfo['page'] = this.pageNo
    this.searchInfo['rows'] = this.pageSize
    this.row = this.$route.query.row
    this.editor = this.$route.query.editor

    this.folderType = this.$route.query.folderType
    this.type = this.$route.query.uplaodtype
    this.relaod = this.$route.query.relaod
    if (this.editor == 1) { // 是否为编辑
      this.form = this.row
      if (this.relaod == 1) {
        this.form.lastVersionId = this.form.id
        this.selectefolderid = this.row.folderId
        this.form.publishTime = undefined
        console.log(this.selectefolderid)
      }
      if (this.form['involvedIndustry'] != null || this.form['involvedIndustry'] != undefined) { this.form.industry = this.form['involvedIndustry'].split(',') }
      if (this.form['involvedBussyniss'] != null || this.form['involvedBussyniss'] != undefined) { this.form.bussyniss = this.form['involvedBussyniss'].split(',') }
      this.form.pbtime = new Date(this.row.publishTime)
      this.getinit(this.row.id)
    }
    this.loadTree()// 文件夹
    this.getDocList(this.searchInfo)
    this.queryDictList('involved_industry')
    this.queryDictList('involved_bussyniss')
    this.queryDictList('doc_versions')
    this.queryDictList('doc_sourse')
  },
  methods: {
    ...mapActions(['setTabsList']),
    sureGulian () {
      this.optPopup = false
    },
    resetGuanlian (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    queryDictList (code) {
      var that = this
      that.$get('/epf-admin/admin/dictionaries/getDictEbyDictGroup/' + code).then(res => {
        if (res.code === 0) {
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
                list.push({ name: res.dictionariesList[index]['zhCn'], value: res.dictionariesList[index]['zhCn'], id: res.dictionariesList[index]['id'] })
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
    creatDocNo () {
      var params = {}
      this.$post('/epf-document/docdocumentinfo/creatdocNo', params).then(res => {
        if (res.code != 0) {
          return
        }
        this.form.docNo = res.docNo
      })
    },
    querySearch (queryString, cb) {
      let restaurants = this.restaurants
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
    },
    queryNameSearch (queryString, cb) {
      let nameRestaurants = this.nameRestaurants
      let nameResults = queryString ? nameRestaurants.filter(this.createNameFilter(queryString)) : nameRestaurants
      // 调用 callback 返回建议列表的数据
      cb(nameResults)
    },
    handleNameSelect (row) {
      console.log(row)
      let that = this
      let title = '文档浏览'
      let routerPath = '/documentBrowse'
      let tabObj = { title, routerPath }
      that.setTabsList(tabObj)
      if (this.toDoc == true) {
        that.$router.push({ path: routerPath, query: { row: row } })
      }
    },
    createNameFilter (queryString) {
      return (nameRestaurant) => {
        return (nameRestaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
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
    tosearch () {
      this.pageNo = 1
      this.searchInfo['page'] = this.pageNo
      this.searchInfo['rows'] = this.pageSize
      this.getDocList(this.searchInfo)
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
      if (this.editor == 1) {
        if (this.relaod == 1) {
          newform['folderId'] = this.selectefolderid
          newform['examineState'] = '0'
        }
      } else {
        newform['folderId'] = this.selectefolderid[this.selectefolderid.length - 1]
      }
      // if(this.type == '0') {
      //   newform['examineState'] = '2'
      // }
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
      newform['folderName'] = form['folderName']
      newform['keywords'] = form['keywords']
      newform['fileCataloging'] = form['fileCataloging']
      newform['lastVersionId'] = form['lastVersionId']
      // newform['pbtime'] = form['publishTime']
      // form["folderId"]="id,id";
      // if (this.selectefolderid.length == 0 || newform['name'] == '' || newform['involvedIndustry'] == '' || newform['involvedBussyniss'] == '' || newform['keywords'] == undefined || newform['pbtime'] == undefined || newform['versionType'] == undefined) {
      //   this.$message.warning('请填写必填选项') // 失败
      //   return
      // }
      if (this.selectefolderid.length == 0 || newform['name'] == '' || newform['involvedBussyniss'] == '' || newform['keywords'] == undefined || newform['versionType'] == undefined) {
        this.$message.warning('请填写必填选项') // 失败
        return
      }
      that.$post('/epf-document/docdocumentinfo/savedocinfo', newform).then(res => {
        console.log(newform)
        console.log(res)
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
        }

        this.$bus.$emit('closeTabsItem', this.$route.name)
        if (this.type == '1') { // 单位文档上传
          let routerPath = '/knowledgeConsult?folderType=3'
          let title = '单位文档上传记录'
          var tabObj = { title, routerPath }
          this.setTabsList(tabObj)
          this.$router.push('/knowledgeConsult?folderType=3')
        } else {
          let routerPath = '/knowledgeConsult?folderType=1'
          let title = '公共文档上传记录'
          var tabObj = { title, routerPath }
          this.setTabsList(tabObj)
          this.$router.push('/knowledgeConsult?folderType=1')
        }
        this.$bus.$emit('refreshAssembly')
      })
    },
    closeupload () {
      let that = this
      this.$bus.$emit('closeTabsItem', this.$route.name)
      if (this.type == '1') { // 单位文档上传
        let routerPath = '/workFiles'
        let title = '单位文档'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push('/workFiles')
      } else {
        let routerPath = '/knowledge'
        let title = '公共文档'
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push('/knowledge')
      }

      this.$bus.$emit('refreshAssembly')
    },
    guanliandelet (item) { this.guanlian.splice(this.guanlian.indexOf(item), 1) },
    versiondocdelet (item) { this.versiondoc.splice(this.versiondoc.indexOf(item), 1) },
    handleClosetag (tag) {
      this.selectedtagid.splice(this.selectedtagid.indexOf(tag.id), 1)
      this.selectedtag.splice(this.selectedtag.indexOf(tag), 1)
    },
    dialogCheckChange (selection) {
      if (this.dialogtype == 'guanlian') {
        this.guanlian = selection
      } else {
        this.versiondoc = selection
      }
    },
    loadTree () { // 获取文件
      this.$nextTick(() => {
        var that = this
        that.loading = true
        let urlStr = ''
        let params = {}
        urlStr = '/epf-document/admin/docfolder/getFolderByType'
        params['folderType'] = that.folderType

        that.$post(urlStr, params).then(res => {
          that.forderdata = res.ztreeJson
          that.loading = false
        })
      })
    },
    handleChange (value) {
      this.selectefolderid = value
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
    handlePreview (file) {
    },
    fileFormatChecking (file) {
      // let me = this
      // 附件上传格式验证
      let extName = file.name.split('.').slice(-1)[0]
      const fileTyState = this.extName.indexOf(extName)
      if (fileTyState == -1) {
        this.$message.error(`上传附件不能是 ${extName} 格式!`)
        return false
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
    handleEditt (index, row) {
      this.dlogTitle = '关联相关'
      this.folder = '个人收藏夹'
      this.dialogtype = 'guanlian'

      this.optPopup = true
      this.$refs.multipleTable.clearSelection()
    },
    handlEdition (index, row) {
      this.dlogTitle = '关联版本'
      this.folder = '政策法规'
      this.dialogtype = ''
      this.optPopup = true
      this.$refs.multipleTable.clearSelection()
    },
    AddFlowpatreason () {
      this.savetitle = '标签选择'
      this.Addtagtreason()
      this.dialogFormVisible = true
    },

    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
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
    annexUpload (files) { // 附件上传
      const file = files.file
      const formData = new FormData()

      formData.append('files', file)
      formData.append('belong', this.belong)
      formData.append('checkname', 'check')
      if (this.editor == 1 && this.relaod != 1) {
        formData.append('id', this.form.id)
      } else {
        delete formData.id
      }
      this.uploadFunction(formData, files, file)
    },
    uploadFunction (formData, files, file, count) { // 上传方法
      var _this = this
      _this.$useAppend('/epf-document/document/upload', formData).then(res => {
        if (res.state != 'SUCCESS') {
          _this.$message.error(res.msg)
          return null
        }
        if (res.esData.length != 0) {
          this.toDoc = true
          _this.nameRestaurants = res.esData
          let list = []
          for (let index = 0; index < res.esData.length; index++) {
            _this.$set(_this.nameRestaurants[index], 'name', res.esData[index]['title'])
            _this.$set(_this.nameRestaurants[index], 'value', res.esData[index]['title'])
            _this.$set(_this.nameRestaurants[index], 'id', res.esData[index]['id'])

            // list.push({ name: res.esData[index]['title'], value: res.esData[index]['title'], id: res.esData[index]['id'] })
          }
        } else {
          this.toDoc = false
        }

        _this.$nextTick(() => {
          // DOM更新了
          this.$refs.autoInput.focus() // 获取焦点
        })
        // _this.nameRestaurants = list
        _this.form.id = res.data[0].id
        _this.form.name = res.data[0].name
        if (this.editor != 1) { // 是否为编辑
          this.creatDocNo()
        }
        files.onSuccess(res)
      }).catch(error => {
        _this.$message.error('文件上传请求失败')
      })
      this.loadTree()
    },
    handleClickChoice () {
      // if (this.fileList.length == 0) {
      this.dialogChoiceTable = true
      this.templateSelection = ''
      this.loading = true
      this.$get(`/epf-document/receivecontent/findList?subject=${this.filterData.subject}&text=${this.filterData.text}&sendMail=${this.filterData.sendMail}&page=${this.mailpageNo}&rows=${this.mailpageSize}`).then(res => {
        if (res.code == 0) {
          this.mailData = res.pager.results
          this.mailpageNo = res.pager.pageNo
          this.mailpageSize = res.pager.pageSize
          this.mailtotalPage = res.pager.totalPage
          this.mailtotalRecord = res.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
      // } else {
      //   this.dialogChoiceTable = false
      //   this.$message.warning('请检查是否已上传了文件')
      // }
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #fff;color: #595959;font-weight: 500;'
      }
    },
    getCurrentRow (val) {
      this.selectMailID = val.id
    },
    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.handleClickChoice()
    },
    searchList () {
      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.handleClickChoice()
    },
    handleClickSure () {
      if (this.templateSelection === '') {
        this.dialogChoiceTable = false
      } else {
        this.stateFront = false
        this.stateAfter = true
        this.disabled = true
        const formData = new FormData()
        formData.append('id', this.selectMailID)
        // let config = {
        //   headers: { 'Content-Type': 'multipart/form-data' }
        // } // 添加请求头
        this.$useAppend('/epf-document/receivecontent/convertDocument', formData)
          .then(response => {
            if (response.state === 'SUCCESS') {
              this.stateFront = true
              this.stateAfter = false
              this.disabled = false
              this.dialogChoiceTable = false
              this.fileList = response.data
              this.form.name = response.data[0].name
              this.form.id = response.data[0].id
              this.$message.success(response.msg)
              this.creatDocNo()
            } else {
              this.stateFront = true
              this.stateAfter = false
              this.disabled = false
              this.dialogChoiceTable = false
              this.fileList = []
              this.form = []
              this.$message.success(response.msg)
            }
          })
      }
    },
    handleMailSizeChange (val) {
      this.mailpageSize = val // 显示条数改变
      this.handleClickChoice()
    },
    handleMailCurrentChange (val) {
      this.mailpageNo = val // 页码改变
      this.handleClickChoice()
    }
  },
  watch: {
    $route: function (to, from) {
      this.form.id = this.$route.query.row.id
      this.getinit(this.document.id)
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
      this.form.author = this.$route.query.row.author
      this.form.involvedBussyniss = this.$route.query.row.involvedBussyniss
      this.form.involvedIndustry = this.$route.query.row.involvedIndustry
      this.form.folderName = this.$route.query.row.folderName
      this.form.keywords = this.$route.query.row.keywords
      this.form.docNo = this.$route.query.row.docNo
      this.form.downloadNumber = this.$route.query.row.downloadNumber
    }
  },
  mounted () {
    // this.nameRestaurants = this.loadAll();
  }
}
</script>
<style scoped>
.page-body {
  padding: 16px 24px;
  background-color: #f6f6f6;
}
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  min-height: 789px;
  /* padding: 16px; */
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
  background-color: #ffffff;
}
.form-button-box {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-button-box .button_qian,
.form-button-box .button_shen {
  margin-left: 0px;
}
.filter_title__custom_two {
  box-sizing: border-box;
  width: 60px;
  min-width: 60px;
  max-width: 60px;
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
</style>
<style scoped>
.el-select {
  width: 100%;
}
.relation .el-upload {
  width: 100%;
}
.relation .el-button--small {
  width: 100%;
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
.relevance {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.relevance span {
  color: #3a8ee6;
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
.el-message-box__message {
  text-align: center;
  font-size: 20px;
}
.label {
  position: relative;
  overflow: auto;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  height: 40px;
  width: 100%;
  padding-left: 8px;
}
.label i {
  position: absolute;
  top: 20%;
  right: 1%;
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
  margin: 5px;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
.collection .el-dialog {
  width: 30%;
}
.choice .el-select {
  display: block;
}
.primary_choice {
  width: 136px;
  height: 28px;
  border-radius: 2px;
  font-size: 14px;
  text-align: center;
  line-height: 28px;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #409eff;
  color: #409eff;
  background-color: #e9f3ff;
  margin-left: 0px;
  margin-top: 6px;
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
.primary_quxiao {
  width: 96px;
  height: 40px;
  border-radius: 2px;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  color: #1b74ee;
  background-color: #e9f1ff;
  margin-right: 48px;
}
.primary_sure {
  width: 96px;
  height: 40px;
  border-radius: 2px;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  background-color: #1b74ee;
  margin-left: 48px;
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
  height: 40px;
  padding-right: 10px;
  text-align: left;
  line-height: 40px;
  font-size: 16px;
  color: #595959;
}
</style>
<style>
#libraryupload span.el-radio__label {
  padding: 0px 0px 0px 0px !important;
}
#libraryupload .el-radio__label {
  padding-left: 0px !important;
}
#libraryupload .el-dialog__body {
  padding: 0px 16px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
#libraryupload div.el-dialog_header {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
#libraryupload div.el-dialog_footer {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.eyeStyle {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}
#libraryupload .el-dialog__body {
  padding-top: 0;
}
#libraryupload .el-tabs__content {
  border: 1px solid rgb(224, 224, 224);
  border-top: 0;
}
#libraryupload .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
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

