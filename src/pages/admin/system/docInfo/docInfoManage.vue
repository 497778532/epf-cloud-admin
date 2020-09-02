<template>
  <div id="docInfoManage">
    <el-container>
      <el-aside width="300px"
                style="padding-top:10px;padding-left:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">文档分组</el-header>
          <!-- <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
            <span v-for="(button ,index)  in buttons" :key="index">
              <el-button
                v-if="button.resourceId=='docgrp_upadd'"
                size="mini"
                @click="addLevelOne"
              >添加顶级</el-button>
            </span>
          </div> -->
          <el-main v-loading="loading2"
                   element-loading-text="数据加载中"
                   element-loading-background="rgba(255, 255, 255,0.95)"
                   :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
            <el-tree :props="defaultProps"
                     :data="forderdata"
                     node-key="id"
                     :expand-on-click-node="false"
                     class="orgManange_List"
                     :render-content="renderContent"
                     @node-drag-end="handleDragEnd"
                     draggable></el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-main style="margin-left:15px;padding-top:10px;padding-right:20px;">
        <el-container style="height:100%;">
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">文档信息</el-header>
          <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);display:flex;flex-direction:row;">
            <el-upload class="upload-demo"
                       action="/api/epf-document/document/upload"
                       multiple
                       :http-request="userUploadFile"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload"
                       list-type="picture"
                       :show-file-list="false"
                       style="width:58px;">
              <el-button size="mini"
                         style="height:29px;">上传</el-button>
            </el-upload>
            <el-button size="mini"
                       style="margin-left:10px;"
                       @click="selectOpen">{{checkFiles?'取消选择':'选择'}}</el-button>
            <el-button size="mini"
                       @click="delChecked">删除</el-button>
          </div>
          <el-main :style="{'height':menuListHeight + 'px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderRight':'1px solid rgb(224, 224, 224)'}">
            <el-row>
              <el-col style="width:100%;margin:0px;"
                      :offset="1">
                <!-- <el-upload
                                class="upload-demo"
                                name="files"
                                drag
                                action="/api/epf-document/document/upload"
                                multiple
                                :http-request="userUploadFile"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :show-file-list="false">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>-->
              </el-col>
            </el-row>
            <el-row v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="min-height:200px;padding:3px;flex-direction: row;">
              <el-col class="carditem"
                      @contextmenu.native="rightClick(item.id,item.fdId,index)"
                      @mouseenter.native="mouseIn(item.id,index)"
                      @mouseleave.native="mouseOut(item.id,index)"
                      v-rightMenu="menudata"
                      v-for="(item,index) in docInfoList"
                      :key="index"
                      :span="12">
                <div class="docImgBox"
                     @click="changeCheckFile(item.id,index)">
                  <img v-if="item.extName=='jpg' || item.extName=='png' || item.extName=='jpeg' || item.extName=='gif'"
                       width="70px"
                       height:="70px"
                       class="docImg"
                       :src="'/api/epf-document/document/downloadById?id='+item.id">
                  <img v-else-if="item.extName=='txt'"
                       width="70px"
                       height:="70px"
                       class="docImg"
                       src="@/assets/images/txt.png">
                  <img v-else-if="item.extName=='pdf'"
                       width="70px"
                       height:="70px"
                       class="docImg"
                       src="@/assets/images/pdf.png">
                  <img v-else-if="item.extName=='doc'"
                       width="70px"
                       height:="70px"
                       class="docImg"
                       src="@/assets/images/doc.png">
                  <img v-else-if="item.extName=='docx'"
                       width="70px"
                       height:="70px"
                       class="docImg"
                       src="@/assets/images/docx.png">
                  <img v-else-if="item.extName=='xls'"
                       width="70px"
                       height:="70px"
                       class="docImg"
                       src="@/assets/images/xls.png">
                  <img v-else-if="item.extName=='xlsx'"
                       width="70px"
                       height:="70px"
                       class="docImg"
                       src="@/assets/images/xlsx.png">
                  <img v-else-if="item.extName==''"
                       width="70px"
                       height:="70px"
                       class="docImg"
                       src="@/assets/images/unnow.png">
                  <img v-else
                       width="70"
                       height:="70"
                       class="docImg"
                       src="@/assets/images/unnow.png">
                  <!-- 多选按钮 -->
                  <span v-show="checkFiles">
                    <span v-show="!item.checkFiles"
                          class="checkBox">
                      <span class="check"> <i class="el-icon-check"></i> </span>
                    </span>
                    <span v-show="item.checkFiles"
                          class="checkBox">
                      <span class="checked"> <i class="el-icon-check"></i> </span>
                    </span>
                  </span>
                </div>
                <div v-show="item.showInput"
                     class="cardbottomInput">
                  <input :style="{'borderColor':errorBoderColor}"
                         @focus="errorBoderColor = 'rgb(192, 192, 192)'"
                         v-model="newFileName"
                         placeholder="请输入内容">
                  <el-button type="success"
                             style="width:25px;height:25px;padding:0px 5px;line-height:25px;"
                             size="mini"
                             icon="el-icon-check"
                             @click="changeNameSure"
                             plain></el-button>
                  <el-button type="danger"
                             style="width:25px;height:25px;padding:0px 5px;line-height:25px;margin-left:1px;"
                             size="mini"
                             icon="el-icon-close"
                             @click="changeNameCancel"
                             plain></el-button>
                </div>
                <div v-show="!item.showInput"
                     class="cardbottom">{{item.name}}</div>

                <div v-show="item.showInput2"
                     class="cardbottomInput">
                  <input :style="{'borderColor':errorBoderColor}"
                         @focus="errorBoderColor = 'rgb(192, 192, 192)'"
                         v-model="newSort"
                         placeholder="请输入数字（数字越小越靠前）">
                  <el-button type="success"
                             style="width:25px;height:25px;padding:0px 5px;line-height:25px;"
                             size="mini"
                             icon="el-icon-check"
                             @click="changeSortSure"
                             plain></el-button>
                  <el-button type="danger"
                             style="width:25px;height:25px;padding:0px 5px;line-height:25px;margin-left:1px;"
                             size="mini"
                             icon="el-icon-close"
                             @click="changeSortCancel"
                             plain></el-button>
                </div>
                <!-- <div v-show="!item.showInput2" class="cardbottom">{{item.sort}}</div> -->
              </el-col>
            </el-row>

            <!-- <div style="text-align:right;margin:8px 0px;">
                    <el-pagination
                        background
                        layout="prev, pager, next,sizes,jumper"
                        :page-sizes="[5,10, 15, 20]"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :total="totalRecord"
                    ></el-pagination>
            </div>-->
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <!-- 预览弹出框弹出框 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="'/api/epf-document/document/downloadById?id='+dialogImageUrl"
           alt="">
    </el-dialog>
    <!-- 移动弹出框 -->
    <el-dialog :title="dialogTitle"
               class="companyInfo"
               width="400px"
               :visible.sync="editorPopup"
               :append-to-body="true"
               top="8%"
               center>
      <el-tree :props="defaultProps"
               :data="forderdata"
               node-key="id"
               current-node-key
               :check-on-click-node="true"
               ref="tree"
               highlight-current
               :expand-on-click-node="false"></el-tree>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="mini"
                   type="primary"
                   @click="editorSubmit">确定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import configApi from '../../../../../config/index'
import qs from "qs";
let id = 1000;
export default {
  name: "docInfoManage",
  data () {
    return {
      dialogImageUrl: '',//图片预览的路径
      dialogFlieName: '',
      dialogVisible: false,
      dialogTitle: '移动文件夹',
      editorPopup: false,
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
      currentIndex: -1,
      errorBoderColor: '',
      parentdata: {},
      checkFiles: false, //  开启选择文件功能
      pageNo: 1,
      pageSize: 100,
      totalPage: 0,
      totalRecord: 0,
      dialogAreaCheck: false,
      currentId: "",
      newFileName: "",
      newSort: '',
      //按钮组、主题
      buttons: [],
      theme_BackgroundColor: "",
      theme_TextColor: "",
      loading: false,
      currentFileIndex: 0,
      menudata: {
        dit: 'docRightMenu',
        // 菜单box的样式   Menu box style
        boxStyle:
          "width:80px;background:#fff;box-shadow: 0px 0px 15px rgb(172, 172, 172);",
        // 菜单选项的样式 Style of menu options
        optionStyle:
          "color:#666;line-height:30px;font-size:16px;text-align:left;padding-left:10px;",
        menus: [
          {
            content: "下载",
            callback: "downloadfile",
            style:
              "border-bottom:1px solid #fff;background:#fff;line-height:30px;"
          },
          {
            content: "重命名",
            callback: "changeName",
            style:
              "border-bottom:1px solid #fff;background:#fff;line-height:30px;"
          },
          {
            content: "排序",
            callback: "changeSort",
            style:
              "border-bottom:1px solid #fff;background:#fff;line-height:30px;"
          },
          {
            content: "删除",
            callback: "handleClose",
            style:
              "border-bottom:1px solid #fff;background:#fff;line-height:30px;"
          },
          {
            content: "移动",
            callback: "moveFolderDoc",
            style:
              "border-bottom:1px solid #fff;background:#fff;line-height:30px;"
          },
          {
            content: "预览",
            callback: "openDoc",
            style:
              "border-bottom:1px solid #fff;background:#fff;line-height:30px;"
          },
        ]
      }
    };
  },
  created () {
    this.menuListHeight = window.innerHeight - 261;
    this.buttons = JSON.parse(localStorage.getItem("docInfoManage"));
    this.theme_BackgroundColor = localStorage.getItem("theme_BackgroundColor");
    this.theme_TextColor = localStorage.getItem("theme_TextColor");

    this.loadTree();
  },
  mounted () {
    this.$bus.$on("themChange", val => {
      this.theme_BackgroundColor = val.menuBackgroundColor;
      this.theme_TextColor = val.textColor;
    });
  },
  methods: {
    addLevelOne () {
      const newOrg = { id: "", folderName: "", pId: "0", childForder: [] };
      this.parentdata = { id: "0", folderName: "", childForder: [] };
      this.forderdata.push(newOrg);
    },
    append (node, data) {
      this.parentdata = data;
      console.log(this.parentdata);
      if (!node.expanded) {
        node.expanded = true;
      }
      const children = { id: "", folderName: "", childForder: [] };
      if (!data.childForder) {
        this.$set(data, "childForder", []);
      }
      data.childForder.push(children);
    },
    remove (node, data) {
      if (data.childForder != null && data.childForder.length != undefined && data.childForder.length > 0) {
        this.$message.error("请先删除子菜单！"); //失败
        return;
      }
      this.currentNode = node;
      this.currentData = node.data;
      this.deleteforder();
    },
    deleteforder () {
      let that = this;
      console.log(that.currentData);
      if (!that.currentData.id) {
        const parent = that.currentNode.parent;
        const childMenu = parent.data.childForder || parent.data;
        console.log(that.currentData);
        const index = childMenu.findIndex(d => d.id === this.currentData.id);
        childMenu.splice(index, 1);
        return;
      }
      that.$confirm("确认要删除信息吗?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        // type: "warning",
        center: true
      }).then(() => {
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
      }).catch(() => {
        that.$message({ type: "info", message: "已取消删除" });
      });


    },
    getdocInfos (node, data) {
      this.loading = true;
      var that = this;
      var id = node.data.id;
      console.log(id);
      if (id == null || id == "") {
        return;
      }
      that.forderId = id;
      that.querdocinfo(node.data.id);
    },
    querdocinfo (id) {
      var that = this;
      that
        .$post("/epf-document/docdocumentinfo/getDocInfo", {
          id: id,
          page: that.pageNo,
          rows: that.pageSize
        })
        .then(res => {
          if (res.code != 0) {
            this.$message.error(res.msg);
            this.loading = false;
            return;
          }
          console.log(res);
          res.pager.results.map((val, index, arr) => {
            console.log(val);
            val['showInput'] = false;
            val['showInput2'] = false;
            val['checked'] = false;
          })
          that.docInfoList = res.pager.results
          that.pageNo = res.pager.pageNo;
          that.pageSize = res.pager.pageSize;
          that.totalPage = res.pager.totalPage;
          that.totalRecord = res.pager.totalRecord;
          this.loading = false;
        });
    },
    loadTree () {
      var that = this;
      this.loading2 = true;
      that.$post("/epf-document/admin/docfolder/getAllFolderTree").then(res => {
        console.log('数返回', res.ztreeJson);
        that.forderdata = res.ztreeJson;
        this.loading2 = false;
      });
    },
    handleClose (id) {

      var that = this;
      this.$confirm("确认要删除信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: "warning"
      })
        .then(() => {
          that
            .$post("/epf-document/docdocumentinfo/deleteFolderDoc", {
              id: that.currentId
            })
            .then(res => {
              console.log(res);
              if (res.code != 0) {
                that.$message.error("删除失败!");
                return;
              }
              that.querdocinfo(that.forderId);
              that.$message.success("删除成功!");
            });
        })
        .catch(() => { });
    },
    editorSubmit () {
      let treeId = this.$refs.tree.getCurrentKey();
      if (treeId == null) {
        this.$message({
          message: "请选择目标文件夹",
          type: "info"
        });
        return
      }
      console.log("数id," + treeId);
      console.log("文件id," + this.forderId);
      var fdId = this.fdId;
      this
        .$post("/epf-document/docdocumentinfo/moveFolderDoc", {
          fdId: fdId,
          forderId: treeId//改功能还未完善，目前是移动到本文件夹，后期更改目标文件夹的id就可以 更改forderId值
        })
        .then(res => {
          if (res.code != 0) {
            this.$message.error("移动失败!");
          } else {
            this.$message.success("移动成功!");
            this.querdocinfo(this.forderId);
          }
          this.editorPopup = false;
        });

    },
    moveFolderDoc () {
      this.editorPopup = true;
    },
    openDoc () {
      //debugger
      //  this.dialogFlieName = this.docInfoList[index].name;
      let lastIndex = this.dialogFlieName.lastIndexOf(".");
      let extension = this.dialogFlieName.substring(lastIndex + 1, this.dialogFlieName.length);
      var baseURL1 = configApi.dev.proxyTable["/api"].target;//仅限于开发环境，生产环境需要调整下
      let previewPath1 = baseURL1
      let previewPath2 = "epf-document/onlinePreview?url=" + baseURL1 + "epf-document/document/downloadById";
      let previewPath3 = "?id=";
      let previewPath = previewPath1 + previewPath2 + "." + extension + previewPath3;
      window.open(
        previewPath + this.currentId
      );
      // let that = this
      // that.dialogVisible = true;
      // that.dialogImageUrl=that.currentId
    },
    downloadfile (id) {
      window.open(
        "/api/epf-document/document/downloadById?id=" + this.currentId
      );
      // var that=this
      // that.$get('/epf-document/document/downloadById',{id:id}).then(res => {
      //     console.log(res)

      // });
    },
    changeName () {

      let docInfoList = this.docInfoList.map((val, index, arr) => {
        if (this.currentId == val.id) {
          this.currentIndex = index;
          for (let i = 0; i < this.docInfoList.length; i++) {
            this.docInfoList[i]['showInput2'] = false;
            if (i == index) {
              this.docInfoList[index]['showInput'] = true;
            } else {
              this.docInfoList[i]['showInput'] = false;
            }

          }

          this.newFileName = this.docInfoList[index].name;
        }
      })

    },
    changeSort () {

      let docInfoList = this.docInfoList.map((val, index, arr) => {
        if (this.currentId == val.id) {
          this.currentIndex = index;
          for (let i = 0; i < this.docInfoList.length; i++) {
            this.docInfoList[i]['showInput'] = false;
            if (i == index) {
              this.docInfoList[index]['showInput2'] = true;
            } else {
              this.docInfoList[i]['showInput2'] = false;
            }

          }
          // this.docInfoList[index]['showInput2'] = true;
          let sort = this.docInfoList[index].sort;
          if (this.docInfoList[index].sort) {
            this.newSort = this.docInfoList[index].sort + '';
          } else {
            this.newSort = '';
          }
        }
      })

    },
    changeNameSure () {
      if (this.newFileName.length == 0) {
        this.$message({
          showClose: true,
          message: '请输入文件名！',
          type: 'error'
        });
        this.errorBoderColor = '#F56C6C'
        return
      }
      // this.newFileName 新的文件名
      // this.currentId 当前修改的文件id
      // this.docInfoList[this.currentIndex].name = this.newFileName + '.' + this.docInfoList[this.currentIndex].extName;
      this.docInfoList[this.currentIndex].name = this.newFileName;
      this.$post("/epf-document/docdocumentinfo/renamedDoc", { id: this.docInfoList[this.currentIndex].id, name: this.docInfoList[this.currentIndex].name }).then(res => {
        if (res.code == 0) {
          this.$message({
            message: "重命名成功",
            type: "success"
          });
        } else {
          //失败
          this.$message.error(res.msg);
          return;
        }
      });
      this.docInfoList[this.currentIndex]['showInput'] = false;
      this.newFileName = ""
    },
    changeSortSure () {
      var re = /^[0-9]{1,3}$/;//小于4位数纯数字
      if (!re.test(this.newSort)) {
        this.$message({
          showClose: true,
          message: '请输入小于4位数字类型的排序字段！',
          type: 'error'
        });
        this.errorBoderColor = '#F56C6C'
        return
      }
      // if(this.newSort == ''||this.newSort == 'null'||typeof(this.newSort)!="number"||this.newSort.length>4){
      //     this.$message({
      //         showClose: true,
      //         message: '请输入小于4位数字类型的排序字段！',
      //         type: 'error'
      //     });
      //     this.errorBoderColor = '#F56C6C'
      //     return
      // }

      this.docInfoList[this.currentIndex].sort = this.newSort;
      this.$post("/epf-document/docdocumentinfo/sortDoc", { id: this.docInfoList[this.currentIndex].id, sort: this.docInfoList[this.currentIndex].sort }).then(res => {
        if (res.code == 0) {
          this.$message({
            message: "排序成功",
            type: "success"
          });
          this.querdocinfo(this.forderId);
        } else {
          //失败
          this.$message.error(res.msg);
          return;
        }
      });
      this.docInfoList[this.currentIndex]['showInput2'] = false;
      this.newSort = ""
    },
    changeNameCancel () {
      this.docInfoList[this.currentIndex]['showInput'] = false;
      this.newFileName = ""
    },
    changeSortCancel () {
      this.docInfoList[this.currentIndex]['showInput2'] = false;
      this.newSort = ""
    },
    changeCheckFile (item, index) {
      this.dialogFlieName = this.docInfoList[index].name;
      if (this.checkFiles) {
        this.docInfoList[index].checkFiles = !this.docInfoList[index].checkFiles;
        this.$forceUpdate();
        console.log(this.getCheckedList());
      }
    },
    selectOpen () {
      this.checkFiles = !this.checkFiles
      if (!this.checkFiles) {
        // 取消选择，初始化
        this.docInfoList.map((val, index, arr) => {
          val.checkFiles = false
        })
      }
    },
    delChecked () {
      var that = this;
      let checkedList = this.getCheckedList()
      if (checkedList.length == 0) {
        this.$message.error('请选择要删除的文件')
      } else {
        that.$confirm("确认要删除信息吗?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          // type: "warning",
          center: true
        }).then(() => {
          that
            .$post("/epf-document/docdocumentinfo/deleteFolderDocByIds", {
              id: checkedList,
            })
            .then(res => {
              if (res.code != 0) {
                this.$message.error(res.msg);
                return;
              }
              that.$message.success("删除成功!");
              that.querdocinfo(that.forderId);
            });
        }).catch(() => {
          that.$message({ type: "info", message: "已取消删除" });
        });
      }

    },
    getCheckedList () {
      let checkeds = "";
      this.docInfoList.map((val, index, arr) => {
        if (val.checkFiles) {
          checkeds += val.id + ",";
        }
      })
      if (checkeds.length > 0) {
        checkeds = checkeds.substring(0, checkeds.length - 1)
      }
      return checkeds
    },
    setName (node, data) {
      var name = document.getElementById(node.id + "Name").value;
      if (!name) {
        that.$message.error("请输入名称!");
        return false;
      }
      console.log();
      var that = this;
      that
        .$post("/epf-document/admin/docfolder/save", {
          folderName: name,
          pId: this.parentdata.id
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
    mouseIn (id, index) {
      document.querySelectorAll('.carditem')[this.currentFileIndex].style.border = '1px solid #fff'
    },
    mouseOut (id, index) {
      // document.querySelectorAll('.carditem')[this.currentFileIndex].style.border = '1px solid #fff'
    },
    onSubmit () {
      console.log("submit!");
    },
    handleSizeChange (val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.pageSize = val;
      // this.getlogList(this.searchInfo);
    },
    handleCurrentChange (val) {
      //获取当前页
      this.pageNo = val;
      this.querdocinfo(this.forderId);
    },
    handleAvatarSuccess (res, file) {
      var that = this;
      console.log(res);
      if (res.state == "FAILURE") {
        that.$message.error("上传失败!");
        return;
      }
    },
    beforeAvatarUpload (file) {
      var that = this;
      console.log(that.forderId);
      if (that.forderId == "" || that.forderId == null) {
        that.$message.warning("请选择文档分组!");
        return false;
      }
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 10;

      // if (!isJPG) {
      // that.$message.error('上传头像图片只能是 JPG 格式!');
      //}
      if (!isLt2M) {
        that.$message.error("上传文件大小不能超过10M!");
      }
      return isLt2M;
    },
    //  开始上传
    userUploadFile (files) {
      var that = this;
      const file = files.file;

      const formData = new FormData();

      formData.append("files", file);

      this.$useAppend("/epf-document/document/upload", formData).then(res => {
        console.log(res);
        files.onProgress(file);
        if (res.state != "SUCCESS") {
          this.$message.error("图片上传失败，请重新上传");
          return null;
        }
        var docId = res.data[0].id;
        var forderId = that.forderId;
        that
          .$post("/epf-document/docdocumentinfo/saveFolderDoc", {
            forderId: forderId,
            docId: docId
          })
          .then(res => {
            if (res.code != 0) {
              that.$message.error("保存失败!");
            } else {
              that.$message.success("上传成功!");
              that.querdocinfo(that.forderId);
            }
          });
        files.onSuccess(res);
      });
    },

    renderContent (h, { node, data, store }) {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (node.label) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span
              on-click={() => this.getdocInfos(node, data)}
              style="display: inline-block;width:100%;"
            >
              {node.label}
            </span>

            <span>
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
              <span>
                <input
                  id={node.id + "Name"}
                  type="text"
                  placeholder="请输入名称"
                  autofocus
                />
              </span>
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
    rightClick (id, fdId, index) {
      if (this.checkFiles) {
        sessionStorage.setItem('docMenu', 'true');
        return
      }
      sessionStorage.setItem('docMenu', 'false');

      this.currentId = id;
      this.fdId = fdId;
      if (index != this.currentFileIndex) {
        document.querySelectorAll('.carditem')[this.currentFileIndex].style.border = '1px solid #fff'
      }
      this.currentFileIndex = index
      document.querySelectorAll('.carditem')[index].style.border = '1px solid #409eff'
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", draggingNode, dropNode, dropType, ev);
      var orgId = draggingNode.data.id;
      var pId = "";
      if (dropType == "inner") {
        pId = dropNode.data.id;
      } else {
        pId = dropNode.data.pId;
      }

      var paramsData = { id: orgId, parentId: pId };
      this.$post("/epf-document/admin/docfolder/save", paramsData).then(res => {
        if (res.code == 0) {
          this.$message.warning("保存成功！");
        } else {
          this.$message.warning(res.msg);
        }
        this.loadTree()
      });
    }
  }
};
</script>

<style scoped>
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
<style>
.orgManange_List .el-tree-node__content {
  margin-bottom: 5px;
}
</style>


