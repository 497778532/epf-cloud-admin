<template>
  <el-scrollbar style="height:100%"
                ref="tableScrollbar">
    <div class="page-body EPF-table"
         id="workDocManage">
      <div class="filter_wrap">
        <div class="switchHeight_box">
          <el-row>
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom_three">关键字：</span>
              <el-input size="small"
                        v-model="searchInfo.name"
                        placeholder="请输入搜索关键词"
                        style="width:calc(100% - 110px);"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom">文档来源：</span>
              <el-select v-model="searchInfo.resource"
                         placeholder="请选择文档来源"
                         style="width:calc(100% - 120px);">
                <el-option v-for="item in resourcedata"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8"
                    class="filter_title_box">
              <span class="filter_title__custom">发文日期：</span>
              <el-date-picker v-model="publishdata"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              style="width:calc(100% - 120px);">
              </el-date-picker>
            </el-col>
            <el-col :span="4"
                    style="display:flex;justify-content:flex-end;">
              <div class="primary_reset"
                   @click="resetsearchuser">重置</div>
              <div class="primary_search"
                   @click="getsearchuser">搜索</div>
            </el-col>
          </el-row>
        </div>
        <div class="doc-box">
          <div class="doc-left">
            <div class="doc-left-title">文档分类</div>
            <div class="doc-left-tree"
                 :style="{ height: treeHeight + 'px' }">
              <el-tree v-loading="loading2"
                       element-loading-text="数据加载中"
                       element-loading-background="rgba(255, 255, 255,0.95)"
                       :props="defaultProps"
                       :data="forderdata"
                       node-key="id"
                       :expand-on-click-node="false"
                       class="orgManange_List"
                       @node-drag-end="handleDragEnd"
                       draggable
                       style="width:100%;padding:16px 4px 16px 10px;">
                <!-- :render-content="renderContent" -->
                <span class="custom-tree-node"
                      style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 16px;color:#595959;height:40px;overflow:hidden;"
                      slot-scope="{ node, data }"
                      v-if="node.label">
                  <span style="flex:1;display: flex; align-items: center; justify-content: flex-start;max-width:140px;">
                    <img v-if="!node.expanded"
                         style="width:22px;height:20px;margin-right:5px;"
                         src="../../../../assets/wenjian1.png"
                         alt />
                    <img v-if="node.expanded"
                         style="width:22px;height:20px;margin-right:5px;"
                         src="../../../../assets/wenjian2.png"
                         alt />
                    <el-tooltip class="item"
                                effect="dark"
                                :content="node.label"
                                placement="top-start">
                      <span @click="getdocInfos(node, data)"
                            style="display: inline;width:calc(100% - 50px);overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                        {{ node.label }}
                      </span>
                    </el-tooltip>
                  </span>
                  <span style="width:80px;min-width:80px;display: flex; align-items: center; justify-content: flex-end;">
                    <img @click="editDocu(node, data)"
                         style="width:20px;height:20px;margin-right:10px;"
                         src="../../../../assets/images/xg.png"
                         alt />
                    <img @click="append(node, data)"
                         style="width:20px;height:20px;margin-right:10px;"
                         src="../../../../assets/images/xz.png"
                         alt />
                    <img @click="remove(node, data)"
                         style="width:20px;height:20px;"
                         src="../../../../assets/images/sc.png"
                         alt />
                  </span>
                </span>
                <span class="custom-tree-node"
                      style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 16px;color:#595959;height:40px;overflow:hidden;"
                      slot-scope="{ node, data }"
                      v-else>
                  <span style="flex:1;display: flex; align-items: center; justify-content: flex-start;max-width:140px;">
                    <img v-if="!node.expanded"
                         style="width:22px;height:20px;margin-right:5px;"
                         src="../../../../assets/wenjian1.png"
                         alt />
                    <img v-if="node.expanded"
                         style="width:22px;height:20px;margin-right:5px;"
                         src="../../../../assets/wenjian2.png"
                         alt />
                    <span>
                      <input :id="node.id + 'Name'"
                             type="text"
                             style="max-width:95px;"
                             placeholder="请输入名称"
                             autofocus />
                    </span>
                  </span>
                  <span style="width:80px;min-width:80px;display: flex; align-items: center; justify-content: flex-end;">
                    <img @click="setName(node, data)"
                         style="width:20px;height:20px;margin-right:10px;"
                         src="../../../../assets/images/dg.png"
                         alt />
                    <img @click="remove(node, data)"
                         style="width:20px;height:20px;"
                         src="../../../../assets/images/sc.png"
                         alt />
                  </span>
                </span>
              </el-tree>
            </div>
            <div style="width:100%;height:16px;min-height:16px;max-height:16px;backgroundColor:#fff;"></div>
          </div>
          <div style="width:16px;min-width:16px;max-width:16px;height:100px;"></div>
          <div class="doc-right">
            <div class="m_title">
              <div style="width:100%;height:30px;display:flex;justify-content: space-between;align-items: center;">
                <div style="font-weight:bold;font-size:28px;color: #464C5B;">
                  单位文档管理
                </div>
                <div style="color:#727272;"
                     class="threeEdict">
                  <!-- <span v-for="(button ,index)  in buttons" :key="index">
                  <span  v-if="button.resourceId=='user_add'" class="button_bg" @click="upload">上传</span>
                  <span  v-if="button.resourceId=='user_role'" class="button_bg"  @click=" showsingleuser"> 回收站 </span>
                  <span  v-if="button.resourceId=='user_restpsd'" class="button_bg" @click="initPwd">移动</span>
                  <span  v-if="button.resourceId=='user_edit'" class="button_bg" @click="editFlowpatreason">编辑</span>
                  <span  v-if="button.resourceId=='user_delete'" class="button_bg" @click="handleDelete">删除</span>
                  <span  v-if="button.resourceId=='user_view'" class="button_bg" @click="addDocument">新增</span>
                </span> -->

                  <!-- <span @click="upload"><i class="el-icon-upload"></i>上传</span> -->
                  <!-- <span @click="handleDelete"><i class="el-icon-delete"></i>删除</span>
                  <span @click="initPwd"><i class="el-icon-s-promotion"></i>移动</span>
                  <span @click="upload" style="display: none;"><i class="el-icon-upload"></i>上传</span>
                  <span @click=" showsingleuser"><i class="el-icon-delete-solid"></i>回收站 </span>
                  <span @click="editFlowpatreason" style="display: none;" ><i class="el-icon-edit"></i>编辑</span> -->
                  <div @click="handleDelete"
                       style="margin-left:16px;">
                    <img src="../images/删除.png"
                         alt="" /><span>删除</span>
                  </div>
                  <div @click="initPwd"
                       style="margin-left:16px;">
                    <img src="../images/导出.png"
                         alt="" /><span>移动</span>
                  </div>
                  <div @click="showsingleuser"
                       style="margin-left:16px;">
                    <i class="el-icon-s-release"
                       style="font-size:18px;color:#727272;"></i><span>回收站</span>
                  </div>
                </div>
              </div>
              <div class="tabs">
                <span v-for="(item, index) in toptag"
                      :key="index"
                      class="blu"
                      @click="tagclick(item)"><i v-if="index > 0"
                     class="blu">></i>{{ item.name }}</span>
              </div>
            </div>
            <div class="main-table"
                 ref="docBOX">
              <el-table ref="multipleTable"
                        :data="docInfoList"
                        style="width: 100%;min-height:100px;"
                        border
                        stripe
                        @selection-change="handleSelectionChange"
                        @sort-change="changeorders"
                        v-loading="loading"
                        element-loading-text="数据加载中"
                        element-loading-background="rgba(255, 255, 255,0.95)"
                        :default-sort="{ prop: 'publishTime', order: 'descending' }"
                        :header-cell-style="{ background: 'rgba(246,246,246,1)' }">
                <el-table-column fixed
                                 type="selection"
                                 width="55"
                                 align="center"></el-table-column>
                <el-table-column prop="name"
                                 label="文件名称"
                                 min-width="230">
                  <template slot-scope="scope">
                    <div class="cell_click"
                         @click="clickselectrow(scope.$index, scope.row)">
                      <div class="docuImg">
                        <img v-if="
                          'png,gif,jpeg,jpg,jtp,rar'.indexOf(
                            scope.row.extName.toLowerCase()
                          ) != -1
                        "
                             :src="
                          '/api/epf-document/document/downloadById?id=' +
                            scope.row.id
                        " />
                        <img v-else
                             :src="
                          require('@/assets/docu/' +
                            scope.row.extName.toLowerCase() +
                            '.png')
                        " />
                      </div>
                      <p class="ellipsis"
                         :title="scope.row.name">
                        {{ scope.row.name }}
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="source"
                                 label="文档来源"
                                 min-width="100"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.source }}
                  </template>
                </el-table-column>
                <el-table-column prop="involvedBussyniss"
                                 label="涉及业务"
                                 min-width="100"
                                 align="center">
                  <template slot-scope="scope">
                    {{scope.row.involvedBussyniss}}
                  </template>
                </el-table-column>
                <el-table-column prop="keywords"
                                 label="关键字"
                                 min-width="100"
                                 align="center">
                  <template slot-scope="scope">
                    {{scope.row.keywords}}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="publishTime"
                               label="发文日期"
                               min-width="130"
                               align="center">
                <template slot-scope="scope">
                  {{ scope.row.publishTime }}
                </template>
              </el-table-column> -->
                <el-table-column prop="version"
                                 label="文档状态"
                                 min-width="110"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.versionType }}-{{ scope.row.versionRemark }}
                  </template>
                </el-table-column>
                <el-table-column prop="createName"
                                 label="上传人"
                                 min-width="130"
                                 align="center">
                  <template slot-scope="scope">
                    {{scope.row.createName}}
                  </template>
                </el-table-column>
                <el-table-column prop="docNo"
                                 label="文档编号"
                                 min-width="130"
                                 align="center">
                  <template slot-scope="scope">
                    {{scope.row.docNo}}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="readNumber"
                               label="浏览量"
                               sortable
                               min-width="100"
                               align="center">
                <template slot-scope="scope">
                  {{ scope.row.readNumber }}
                </template>
              </el-table-column> -->
                <!-- <el-table-column prop="docSize"
                               label="大小"
                               sortable
                               min-width="100"
                               align="center">
                <template slot-scope="scope">
                  {{ scope.row.docSize | numFilterScan }}{{ scope.row.unit }}
                </template>
              </el-table-column> -->
                <!-- <el-table-column prop="remark" label="描述" min-width="150">
                <template slot-scope="scope">
                   {{scope.row.remark}}
                </template>
              </el-table-column> -->
              </el-table>
              <div style="text-align:right;margin:12px 0px;position: absolute;bottom:16px;right:24px;">
                <el-pagination background
                               layout="total,prev, pager, next,sizes,jumper"
                               :page-sizes="[5, 10, 15, 20]"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :page-size="pageSize"
                               :current-page="pageNo"
                               :total="totalRecord"></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 弹窗 -->
      <div>
        <!-- 回收站 -->
        <el-dialog title="回收站"
                   class="companyInfo guanliDialog"
                   width="50%"
                   :visible.sync="optPopup"
                   :append-to-body="true"
                   :close-on-click-modal="false">
          <div class="diologSwitchHeight_box EPF-table">
            <el-row :gutter="2">
              <el-col :span="24"
                      class="filterIpt">
                <el-input placeholder="请输入您要关联的相关文件的名称或关键字"
                          v-model="deletname"
                          @keyup.enter.native="deletsearch"
                          :maxlength="50"></el-input>
                <i class="el-icon-search"
                   @click="deletsearch"></i>
              </el-col>
            </el-row>
            <el-table ref="deletTable"
                      :data="tableData"
                      style="width: 100%"
                      :props="defaultProps"
                      border
                      stripe
                      @selection-change="deletSelectionChange"
                      v-loading="loading"
                      element-loading-text="数据加载中"
                      element-loading-background="rgba(255, 255, 255,0.95)"
                      :header-cell-style="{ background: '#fff' }">
              <el-table-column fixed
                               type="selection"
                               width="55"
                               align="center"></el-table-column>
              <el-table-column fixed
                               prop="name"
                               label="文件名称"
                               min-width="180"
                               align="center">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column fixed
                               prop="source"
                               label="文档来源"
                               min-width="150"
                               align="center">
                <template slot-scope="scope">
                  {{ scope.row.source }}
                </template>
              </el-table-column>
              <el-table-column prop="publishTime"
                               label="发文日期"
                               min-width="130"
                               align="center">
                <template slot-scope="scope">
                  {{ scope.row.publishTime }}
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align:right;margin:8px 0px;margin-top:15px;">
              <el-pagination background
                             layout="total,prev, pager, next,sizes,jumper"
                             :page-sizes="[5, 10, 15, 20]"
                             @size-change="handleSizeChangedel"
                             @current-change="handleCurrentChangedel"
                             :page-size="pageSizedel"
                             :current-page="pageNodel"
                             :total="totalRecorddel"></el-pagination>
            </div>
          </div>
          <!-- <el-row>
          <el-col :span="24"
                  style="text-align: center;margin-top:10px">
            <el-button type="danger"
                       @click="deletformback">彻底删除</el-button>
            <el-button type="primary"
                       @click="backtonormal">恢复</el-button>
            <el-button @click="optPopup = false">取消</el-button>
          </el-col>
        </el-row> -->
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="deletformback"
                       style="backgroundColor:#f56c6c;"
                       v-preventReClick>彻底删除</el-button>
            <div style="width:64px;height:40px;"></div>
            <el-button @click="backtonormal"
                       v-preventReClick>恢复</el-button>
            <!-- <el-button @click="popups = false">取消</el-button> -->
            <div style="width:64px;height:40px;"></div>
            <span class="button_qian"
                  @click="optPopup = false">取消</span>
          </span>
        </el-dialog>

        <!-- 移动 -->
        <el-dialog title="移动"
                   class="companyInfo guanliDialog"
                   width="50%"
                   :visible.sync="movePopup"
                   :append-to-body="true"
                   :close-on-click-modal="false">
          <div class="diologSwitchHeight_box">
            <p style="margin-bottom: 20px;font-size:16px;">请选择要移动至的文件夹</p>
            <div :height="menuListHeight - 150">
              <el-tree :data="forderdata"
                       :props="defaultProps"
                       @node-click="handleNodeClick"
                       style="width:100%;">
                <span class="custom-tree-node"
                      style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 16px;color:#595959;height:40px;overflow:hidden;"
                      slot-scope="{ node, data }">
                  <span style="width:100%;display: flex; align-items: center; justify-content: flex-start;">
                    <img v-if="!node.expanded"
                         style="width:22px;height:20px;margin-right:5px;"
                         src="../../../../assets/wenjian1.png"
                         alt />
                    <img v-if="node.expanded"
                         style="width:22px;height:20px;margin-right:5px;"
                         src="../../../../assets/wenjian2.png"
                         alt />
                    <span>{{ node.label }}</span>
                  </span>
                </span>
              </el-tree>
            </div>
            <!-- <el-row>
            <el-col :span="24"
                    style="text-align: center;margin-top:10px">
              <span class="primary_search"
                    @click="savetomove">保存</span>
              <span class="primary_reset"
                    @click="movePopup = false"
                    style="margin:0;">关闭</span>
            </el-col>
          </el-row> -->
          </div>
          <span slot="footer"
                class="dialog-footer">
            <span class="button_shen"
                  @click="savetomove">保存</span>
            <div style="width:96px;height:40px;"></div>
            <span class="button_qian"
                  @click="movePopup = false">关闭</span>
          </span>
        </el-dialog>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import qs from "qs";
import personalFiltrate from "@/components/personalFiltrate";
import transferTable from "@/components/transferTable";
import Axios from "axios";
import { constants } from "zlib";
import configApi from "../../../../../config/index";
import base from "../../../../utils/config.js";
import { mapActions, mapState } from "vuex";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "workDocManage",
  components: {
    personalFiltrate,
    transferTable
  },

  data () {
    return {
      toLength2: "",
      publishdata: [],
      input: "",
      textarea: "",
      optPopup: false, //  控制回收站弹窗
      movePopup: false, //控制移动弹窗
      defaultProps: {
        children: "childForder",
        label: "folderName"
      },
      forderdata: [],
      loading2: true,
      forderId: "",
      menuListHeight: 100,
      docInfoList: [],
      currentNode: {},
      currentData: {},
      parentdata: {},
      checkFiles: false, //  开启选择文件功能
      totalRecord: 0,
      pageNodel: 1,
      pageSizedel: 5,
      totalPagedel: 0,
      totalRecorddel: 0,
      dialogAreaCheck: false,
      currentId: "",
      newFileName: "",
      newSort: "",
      //按钮组、主题
      buttons: [],
      theme_BackgroundColor: "",
      theme_TextColor: "",
      loading: false,
      currentFileIndex: 0,

      queryByIdUrl: "",

      //扩展信息参数
      dialogManageInfo: false,
      usermanageInfo: {},
      sexoptions: [
        { value: "男", label: "男" },
        { value: "女", label: "女" }
      ],
      loading: true,

      menuListHeight: 100,
      txtVal: 0,
      searchselectdefall: [],
      slectdefall: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogFormroleVisible: false,
      rolelist: [],
      selectrows: [],
      tableData: [],
      multipleSelection: [],
      handleDataError: [],
      howProvince: true,
      toptag: [{ name: "全部文件", type: "all", id: "" }],
      value: "",

      handleData: "",
      singleuser: {},
      selectGroups: [],
      imageUrl: "",
      add: false,
      savetitle: "新增账号",
      edit: false,
      dialogForm: false,
      dialogTable: false,
      dialogTest: false,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: { usetype: "" },
      resourcedata: [],
      collectselected: [],
      deletname: "",
      deletGroups: [],
      folderType: "3", //文件类型：1文件夹，知识分类；2收藏夹；3工作文件夹分类,文档分类

      treeHeight: 625
    };
  },
  created () {
    this.menuListHeight = window.innerHeight - 245;
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = this.pageSize;
    this.loadTree();
    this.getDocList(this.searchInfo);
    this.queryDictList("doc_sourse");
  },
  mounted () {
    const _this = this;
    const erd = elementResizeDetectorMaker();
    erd.listenTo(document.getElementById("workDocManage"), element => {
      _this.$nextTick(() => {
        setTimeout(() => {
          //监听到事件后执行的业务逻辑
          this.treeHeight = this.$refs.docBOX.offsetHeight + 50;
        }, 500);
      });
    });
  },
  methods: {
    ...mapActions(["setTabsList"]),
    queryDictList (code) {
      var that = this;
      that
        .$get("/epf-admin/admin/dictionaries/getDictEbyDictGroup/" + code)
        .then(res => {
          if (res.code === 0) {
            if (code == "doc_sourse") {
              if (res.dictionariesList != null) {
                var list = [];
                for (
                  let index = 0;
                  index < res.dictionariesList.length;
                  index++
                ) {
                  list.push({
                    name: res.dictionariesList[index]["zhCn"],
                    value: res.dictionariesList[index]["zhCn"]
                  });
                }
                that.resourcedata = list;
              } else {
                that.resourcedata = [];
              }
            }
          }
        });
    },
    changeorders (event) {
      var _this = this;
      this.pageNo - 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.searchInfo["sort"] = event.prop;
      this.searchInfo["order"] = event.order;
      this.getDocList(this.searchInfo);
    },
    addLevelOne () {
      this.parentdata["id"] = "0";
      const newOrg = { id: "", folderName: "", childForder: [] };
      this.forderdata.push(newOrg);
    },
    savetomove () {
      var folderdat = this.collectselected;
      var docs = this.selectGroups;

      if (folderdat.length < 1) {
        this.$message.warning("请选择收藏夹！");
        return;
      }
      if (docs.length < 1) {
        this.$message.warning("请选择文件有误！");
        return;
      }
      var docId = docs[0].id;
      var folderId = folderdat.id;
      var params = {};
      params["id"] = docId;
      params["folderId"] = folderId;
      this.$post("/epf-document/docdocumentinfo/movetofolder", params).then(
        res => {
          if (res.code != 0) {
            this.$message.error(res.msg);
            return;
          }
          this.movePopup = false;
          this.searchInfo["page"] = this.pageNo;
          this.searchInfo["rows"] = this.pageSize;
          this.getDocList(this.searchInfo);
          this.$message.success("移动成功！");
        }
      );
    },
    tagclick (tag) {
      //{name:"全部文件",type:"all",id:""}
      if (tag.type == "all") {
        var newtag = [];
        newtag.push(this.toptag[0]);
        this.toptag = newtag;
        this.pageNo = 1;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["name"] = "";
        this.searchInfo["folderId"] = "";
        this.searchInfo["tagId"] = "";
        this.getDocList(this.searchInfo);
      } else {
        this.pageNo = 1;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["name"] = "";
        this.searchInfo["forderId"] = this.toptag[1].id;
        this.searchInfo["tagId"] = "";
        this.getDocList(this.searchInfo);
      }
    },
    //上传文档
    upload () {
      let that = this;
      let title = "上传文档";
      let routerPath = "/libraryUpload";
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({
        path: routerPath,
        query: { folderType: that.folderType, uplaodtype: "0" }
      });
      // let that = this;
      // let title = '上传单位文档'
      // let routerPath = '/workDocUpload'
      // let tabObj = {title, routerPath}
      // that.setTabsList(tabObj)
      // that.$router.push({path: routerPath,query:{}})
    },
    //新增文档
    addDocument () {
      let that = this;
      let title = "新增单位文档";
      let routerPath = "/workDocAdd";
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({ path: routerPath, query: { editor: "" } });
    },
    async getDocList (params) {
      params["foldertype"] = "3";
      this.loading = true;
      this.$get("/epf-document/docdocumentinfo/getTenantDocJson", params).then(
        res => {
          this.toLength2 = res.pager.totalRecord;
          console.log(this.toLength2);
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            this.loading = false;
            return;
          }
          if (params.load) {
            this.totlecorde = res.pager.totalRecord;
            this.searchInfo["load"] = "";
          }
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.docInfoList = res.pager.results;

          this.checkAll = false;
          this.checkedCities = [];
          this.isIndeterminate = true;

          this.cities = [];
          for (var i = 0; i < this.docInfoList.length; i++) {
            this.cities.push(this.docInfoList[i].id);
          }

          this.loading = false;
        }
      );
    },
    clickselectrow (index, row) {
      // this.$refs.multipleTable.toggleRowSelection(row);
      let that = this;
      let title = "文档浏览";
      let routerPath = "";

      routerPath = "/documentBrowse";
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({ path: routerPath, query: { row: row } });
    },
    getsearchuser () {
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = this.pageSize;
      this.getDocList(this.searchInfo);
    },
    resetsearchuser () {
      this.publishdata = [];
      this.searchInfo["page"] = 1;
      this.searchInfo["rows"] = this.pageSize;
      this.searchInfo["name"] = "";
      this.searchInfo["resource"] = "";
      this.searchInfo["doctype"] = "";
      this.searchInfo["starttime"] = "";
      this.searchInfo["endtime"] = "";
      this.searchselectdefall = [];
      this.getDocList(this.searchInfo);
    },
    handleSelectionChange (val) {
      this.selectGroups = val;
    },
    deletSelectionChange (val) {
      this.deletGroups = val;
    },
    deletformback () {
      var selected = this.deletGroups;
      if (selected.length < 1) {
        that.$message.warning("请选择数据！");
        return;
      }
      var ids = "";
      for (let index = 0; index < selected.length; index++) {
        ids += selected[index].id + ",";
      }
      this.$get("/epf-document/docdocumentinfo/deletdoc", { id: ids }).then(
        res => {
          if (res.code != 0) {
            that.$message.warning(res.msg);
          }
          var params = {};
          this.pageNodel = 1;
          params["page"] = this.pageNodel;
          params["rows"] = this.pageSizedel;
          this.deldoclist(params);
        }
      );
    },
    backtonormal () {
      var selected = this.deletGroups;
      if (selected.length < 1) {
        that.$message.warning("请选择数据！");
        return;
      }
      var ids = "";
      for (let index = 0; index < selected.length; index++) {
        ids += selected[index].id + ",";
      }
      this.$get("/epf-document/docdocumentinfo/deletback", { id: ids }).then(
        res => {
          if (res.code != 0) {
            that.$message.warning(res.msg);
          }
          var params = {};
          this.pageNodel = 1;
          params["page"] = this.pageNodel;
          params["rows"] = this.pageSizedel;
          this.deldoclist(params);
          this.$message.success("恢复文件成功！");
          setTimeout(() => {
            this.pageNo = 1;
            this.searchInfo["page"] = this.pageNo;
            this.searchInfo["rows"] = this.pageSize;
            this.getDocList(this.searchInfo);
          }, 2000)

        }
      );
    },
    initPwd () {
      let that = this;
      if (that.selectGroups.length != 1) {
        that.$message.warning("请选择一条数据！");
        return;
      }
      that.movePopup = true;
    },
    handleNodeClick (data) {
      this.collectselected = data;
    },
    deletsearch () {
      var params = {};
      this.pageNodel = 1;
      params["page"] = this.pageNodel;
      params["rows"] = this.pageSizedel;
      params["name"] = this.deletname;
      this.deldoclist(params);
    },
    showsingleuser () {
      var params = {};
      params["page"] = this.pageNodel;
      params["rows"] = this.pageSizedel;
      this.deldoclist(params);
      this.optPopup = true;
    },
    deldoclist (params) {
      params["isdel"] = "1";
      params["foldertype"] = "3";
      this.$get("/epf-document/docdocumentinfo/getTenantDocJson", params).then(
        res => {
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            this.loading = false;
            return;
          }
          this.pageNodel = res.pager.pageNo;
          this.pageSizedel = res.pager.pageSize;
          this.totalPagedel = res.pager.totalPage;
          this.totalRecorddel = res.pager.totalRecord;
          this.tableData = res.pager.results;
        }
      );
    },
    editFlowpatreason () {
      let that = this;
      if (that.selectGroups.length != 1) {
        that.$message.warning("请选择一条数据！");
        return;
      }
      let title = "编辑单位文档";
      let routerPath = "";
      var row = that.selectGroups[0];
      if (row.name.indexOf(".html") != -1) {
        routerPath = "/workDocAdd";
        that
          .$post("/epf-document/document/showContentById", { id: row.id })
          .then(res => {
            row["content"] = res;
            let tabObj = { title, routerPath };
            that.setTabsList(tabObj);
            that.$router.push({
              path: routerPath,
              query: { row: row, editor: "1" }
            });
          });
      } else {
        routerPath = "/workDocUpload";
        let tabObj = { title, routerPath };
        that.setTabsList(tabObj);
        that.$router.push({
          path: routerPath,
          query: { row: row, editor: "1" }
        });
      }
    },
    handleDelete () {
      let ids = "";
      let that = this;
      if (that.selectGroups.length < 1) {
        that.$message.warning("请选择要删除的数据！");
        return;
      } else {
        for (var i = 0; i < this.selectGroups.length; i++) {
          ids += this.selectGroups[i].id + ",";
        }
      }
      that
        .$confirm("确认要删除该条信息吗?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          // type: "warning",
          center: true
        })
        .then(() => {
          that
            .$post("/epf-document/docdocumentinfo/movetodelet", { id: ids })
            .then(res => {
              if (res.code != "0") {
                that.$message.error(res.msg);
                return;
              }
              that.$message({
                type: "success",
                message: "删除成功!"
              });

              that.searchInfo["page"] = 1;
              that.searchInfo["rows"] = this.pageSize;
              that.getDocList(that.searchInfo);
            });
        })
        .catch(() => { });
    },
    handleSizeChange (val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getDocList(this.searchInfo);
      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("workDocManage"), element => {
        _this.$nextTick(() => {
          //监听到事件后执行的业务逻辑
          setTimeout(() => {
            this.treeHeight = this.$refs.docBOX.offsetHeight + 50;
          }, 500);
        });
      });
    },
    handleCurrentChange (val) {
      //获取当前页
      this.searchInfo["page"] = val;
      this.searchInfo["rows"] = this.pageSize;
      this.getDocList(this.searchInfo);
      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("workDocManage"), element => {
        _this.$nextTick(() => {
          //监听到事件后执行的业务逻辑
          setTimeout(() => {
            this.treeHeight = this.$refs.docBOX.offsetHeight + 50;
          }, 500);
        });
      });
    },
    handleSizeChangedel (val) {
      //每页条数改变时触发
      var params = {};
      this.pageNodel = 1;
      params["page"] = this.pageNodel;
      params["rows"] = val;
      this.deldoclist(params);
    },
    handleCurrentChangedel (val) {
      //获取当前页
      var params = {};
      params["page"] = val;
      params["rows"] = this.pageSizedel;
      this.deldoclist(params);
    },
    append (node, data) {
      this.parentdata = data;
      if (!node.expanded) {
        node.expanded = true;
      }
      const children = { id: "", folderName: "", childForder: [] };
      if (!data.childForder) {
        this.$set(data, "childForder", []);
      }
      data.childForder.push(children);
    },
    editDocu (node, data) {
      var _this = this;

      _this
        .$prompt("请输入要修改的文件夹名称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '文件夹名称不能为空'
        })
        .then(({ value }) => {
          // if (value === null) {
          //   return this.$message.warning('文件夹名称为空时不会修改该名称')
          // }
          var params = {};
          params["id"] = data.id;
          params["folderName"] = value;
          params["pId"] = data.pId;
          _this
            .$post("/epf-document/admin/docfolder/save", params)
            .then(res => {
              if (res.code != "0") {
                _this.$message.error(res.msg);
                return;
              }
              _this.$message.success("修改成功！");
              _this.loadTree();
            });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });
        });
    },
    remove (node, data) {
      if (data.childForder != null && data.childForder.length > 0) {
        this.$message.error("请先删除子菜单！"); //失败
        return;
      }
      this.currentNode = node;
      this.currentData = node.data;
      this.deleteforder();
    },
    deleteforder () {
      let that = this;
      if (!that.currentData.id) {
        const parent = that.currentNode.parent;
        const childMenu = parent.data.childForder || parent.data;
        const index = childMenu.findIndex(d => d.id === this.currentData.id);
        childMenu.splice(index, 1);
        return;
      }
      that
        .$confirm("确认要删除该菜单吗?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          // type: "warning",
          center: true
        })
        .then(() => {
          that
            .$post("/epf-document/admin/docfolder/delete", {
              id: that.currentData.id
            })
            .then(res => {
              if (res.code == 0) {
                that.$message.success("删除成功!");
              } else {
                that.$message.error(res.msg);
              }
              that.loadTree();
            });
        })
        .catch(() => {
          // that.$message({type: "info", message: "已取消删除"});
        });
    },
    getdocInfos (node, data) {
      this.loading = true;
      var that = this;
      var id = node.data.id;
      if (id == null || id == "") {
        return;
      }
      that.toptag[1] = { name: node.data.folderName, type: "folder", id: id };
      that.forderId = id;
      //每页条数改变时触发
      var that = this;
      that.pageNo = 1;
      that.searchInfo["page"] = this.pageNo;
      that.searchInfo["rows"] = this.pageSize;
      that.searchInfo["tagId"] = "";
      that.searchInfo["folderId"] = that.forderId;
      that.getDocList(this.searchInfo);

      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("workDocManage"), element => {
        _this.$nextTick(() => {
          //监听到事件后执行的业务逻辑
          setTimeout(() => {
            this.treeHeight = this.$refs.docBOX.offsetHeight + 50;
          }, 500);
        });
      });
    },
    loadTree () {
      var that = this;
      this.loading2 = true;
      let params = { folderType: that.folderType, useAllSystem: "0" };
      that
        .$get("/epf-document/admin/docfolder/getFolderByType", params)
        .then(res => {
          that.forderdata = res.ztreeJson;
          that.queryByIdUrl = res.queryByIdUrl;
          this.loading2 = false;
        });
    },
    getCheckedList () {
      let checkeds = "";
      this.docInfoList.map((val, index, arr) => {
        if (val.checkFiles) {
          checkeds += val.id + ",";
        }
      });
      if (checkeds.length > 0) {
        checkeds = checkeds.substring(0, checkeds.length - 1);
      }
      return checkeds;
    },
    setName (node, data) {
      var name = document.getElementById(node.id + "Name").value;
      if (!name) {
        that.$message.error("请输入名称!");
        return false;
      }
      var that = this;
      that
        .$post("/epf-document/admin/docfolder/save", {
          folderName: name,
          pId: this.parentdata.id,
          folderType: that.folderType
        })
        .then(res => {
          if (res.code != 0) {
            that.$message.error("保存失败!");
            return false;
          }

          that.$message.success("保存成功!");
          that.loadTree();
        });
    },
    renderContent (h, { node, data, store }) {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (node.label) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 16px;color:#595959; padding-right: 8px;height:40px;overflow:hidden;">
            <span
              on-click={() => this.getdocInfos(node, data)}
              style="display: inline-block;width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              title={node.label}
            >
              {node.label}
            </span>

            <span>
              <el-button
                style="font-size: 16px;padding:0px;color:#1587DB;"
                type="text"
                on-click={() => this.editDocu(node, data)}
              >
                <i class="el-icon-edit-outline" />
              </el-button>
              <el-button
                style="font-size: 16px;padding:0px;color:#409EFF;"
                type="text"
                on-click={() => this.append(node, data)}
              >
                <i class="el-icon-circle-plus-outline" />
              </el-button>
              <el-button
                style="font-size: 16px;color:#F56C6C;"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                <i class="el-icon-delete" />
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span>
              <input
                id={node.id + "Name"}
                type="text"
                style="max-width:80px;"
                placeholder="请输入名称"
                autofocus
              />
            </span>
            <span>
              <el-button
                style="font-size: 16px;padding:0px;color:#53c106;"
                type="text"
                on-click={() => this.setName(node, data)}
              >
                <i class="el-icon-success" />
              </el-button>
              <el-button
                style="font-size: 16px;color:#F56C6C;"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                <i class="el-icon-delete" />
              </el-button>
            </span>
          </span>
        );
      }
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      var orgId = draggingNode.data.id;
      var pId = "";
      if (dropType == "inner") {
        pId = dropNode.data.id;
      } else {
        pId = dropNode.data.pId;
      }

      var paramsData = { id: orgId, pId: pId };
      this.$post("/epf-document/admin/docfolder/save", paramsData).then(res => {
        if (res.code == 0) {
          this.$message.success("保存成功！");
        } else {
          this.$message.warning(res.msg);
        }
        this.loadTree();
      });
    }
  },
  watch: {
    toLength2 (val) {
      this.$bus.$emit("toLength2", this.toLength2);
    },
    pageNo (val) {
      this.$refs.tableScrollbar.wrap.scrollTop = 0
    },
    pageSize (val) {
      this.$refs.tableScrollbar.wrap.scrollTop = 0
    }
  },
  filters: {
    numFilterScan (value) {
      let realVal = "";
      if (value !== "") {
        // 截取当前数据到小数点后三位
        realVal = parseFloat(parseInt(Number(value))).toFixed(2);
        // realVal = tempVal.substring(0, tempVal.length - 1)
      } else {
        realVal = "--";
      }
      return realVal;
    }
  }
};
</script>
<style scoped>
.page-body {
  width: 100%;
  padding: 16px 24px;
  background-color: #f6f6f6;
}
.el-container {
  height: 300px;
  overflow: auto;
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
  padding-right: 15px;
}
.oper span {
  display: inline-block;
  margin: 0 !important;
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
/* .filter_wrap {
  box-sizing: border-box;
  padding: 38px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
} */
.filter_wrap {
  width: 100%;
}
.switchHeight_box {
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  padding: 20px 24px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
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
.filter_title__custom_three {
  box-sizing: border-box;
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.filter_title {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
}
.switchHeight_box >>> .el-input__inner {
  height: 40px;
  line-height: 40px;
}
.switchHeight_box >>> .el-input__suffix {
  display: flex;
  align-items: center;
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
.doc-box {
  margin-top: 16px;
  width: 100%;
  min-height: 691px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.doc-left {
  width: 296px;
  min-width: 296px;
  max-width: 296px;
  min-height: 691px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: flex-start;
}
.doc-left-title {
  height: 50px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  border-bottom: 2px solid #eeeeee;
}
.doc-left-tree {
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.doc-left-tree::-webkit-scrollbar {
  display: none;
}
.doc-right {
  width: calc(100% - 312px);
  min-height: 691px;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: flex-start;
}
.m_title {
  width: 100%;
  min-height: 100px;
  max-height: 100px;
  box-sizing: border-box;
  padding: 16px 24px;
  margin-bottom: 16px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-tree > div {
  margin: 5px 0;
}
.iconList {
  height: 300px;
  background: rgb(255, 213, 213);
  overflow-y: auto;
}
.main-table {
  width: 100%;
  min-height: 575px;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
  padding-bottom: 80px;
  position: relative;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style scoped>
.orgManange_List .el-tree-node__content {
  margin-bottom: 5px;
}
.default,
.error,
.success {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: relative;
  top: 1px;
  right: 5px;
}
.default {
  background: #b6b6b6;
  border: 2px solid #cfcfcf;
}
.error {
  background: #fd4041;
  border: 2px solid #ff6c6f;
}
.success {
  background: #92b62d;
  border: 2px solid #bfd482;
}
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 10px;
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
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
}
.el-table__body tr td:nth-child(2) .cell .cell_click {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: relative;
}
.docuImg {
  width: 40px;
  height: 40px;
  /* border: 1px solid #ddd; */
  margin-right: 10px;
  display: inline-block;
}
.docuImg img {
  border-radius: 4px;
  width: 100%;
  height: 100%;
}
.ellipsis {
  position: absolute;
  top: 0;
  left: 50px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.filter_wrap >>> .el-table.el-table--fit .cell {
  line-height: 22px !important;
}
.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.usemngtable {
  width: 100%;
}
.usemngtable td {
  border: 1px solid #b6b6b6;
  line-height: 28px;
}

.tableHead {
  /* background-color: #f9fbff;
    padding: 10px 15px; */
  display: inline-block;
  position: absolute;
  right: 1%;
}
.tableHead .el-upload-list {
  display: none !important;
}
.tableHead .el-upload-list--text {
  display: none !important;
}
.tableHead .el-upload-list__item-name {
  display: none !important;
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
/* 标签 */
.tabs {
  /* border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5; */
  /* padding-left: 2%; */
}
.tabs span {
  cursor: pointer;
}
.tabs .blu {
  color: #1587db;
}
.tabs i {
  margin: 0 5px;
}
.tabs .blac {
  color: #aeaeae;
}
.el-aside {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
}
.el-header {
  border: 1px solid rgba(238, 238, 238, 1);
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
/* .el-table {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  margin-top: 10px;
} */
.threeEdict {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}
.threeEdict div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
}
.el-tree {
  background: unset;
}
.el-tabs__content {
  border: none !important;
}
</style>
<style>
.doc-box .el-tree-node__content {
  height: 40px;
}
.guanliDialog .el-tree-node__content {
  height: 40px;
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
