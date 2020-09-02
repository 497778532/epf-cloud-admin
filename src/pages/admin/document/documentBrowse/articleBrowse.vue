<template>
  <div class="page-body" id="articleBrowse" :style="{'height':menuListHeight +'px'}">
    <div class="filter_wrap">
      <el-row>
        <el-col :span="14" :offset="5" class="title">{{form.name}}</el-col>
      </el-row>
       <el-row>
        <el-col :span="7" :offset="2"><span class="tagspan">文章来源：</span>{{form.source}}</el-col>
        <el-col :span="7"><span class="tagspan">文章作者：</span>{{form.author}}</el-col>
        <el-col :span="7" ><span class="tagspan">发布日期：</span>{{form.publishTime}}</el-col>
        <el-col :span="7" :offset="2"><span class="tagspan">文章分类：</span>{{form.folderId}}</el-col>
        <el-col :span="7"><span class="tagspan">文章编目：</span>{{form.fileCataloging}}</el-col>
      </el-row>
      <el-row class="contenthtml">
        <el-col :span="20" :offset="2">
          <div v-html="content"></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="2" :offset="2">
          关联相关:
          
        </el-col>
        <el-col :span="12">
          <div class="relevance" v-for="(item,index) in guanlian" :key="index">
            <span class="el-icon-paperclip"></span>
            {{item.name?item.name:item.NAME}}
          </div>
        </el-col>
      </el-row>

      <div style="text-align:center;">
        <el-button @click="closearticle">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import selectInput from "@/components/common/form/selectInpt";
import { mapActions, mapState } from "vuex";
import Bus from "../../../../utils/bus";
export default {
  name: "articleBrowse",
  data() {
    return {
      dialogtype: "",
      pageNo: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 1,
      docInfoList: [],
      searchInfo: {},
      loading: false,
      dlogTitle: "",
      folder: "",
      optPopup: false, //  控制关联弹窗
      guanlian: [],
      menuListHeight: 900,
      forderdata: [],
      folderprops: {
        value: "id",
        label: "folderName",
        children: "childForder"
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      content: ""
    };
  },
  created() {
    this.menuListHeight = window.innerHeight - 200;
    this.form = this.$route.query.row;
    var name=this.form.name;
    if(name.indexOf(".")!=-1){
        this.form.name=name.substring(0,name.indexOf("."));
    }
    this.getcontent(this.form.id);
    this.getinit(this.form.id);
    // this.loadTree();
  },
  mounted() {},
  methods: {
    getcontent(id) {
      var that = this;
      this.loading = true;
      that.$post("/epf-document/document/showContentById", { id: id }).then(res => {
          this.content = res;
        });
    },
    async getinit(id) {
            var params={};
            this.$post("/epf-document/admin/doctag/getTagJson", params).then(res => {
                console.log("===========", res);
                if (res.code != "0") {
                    this.$message.error(res.msg); //失败
                    this.loading = false;
                    return;
                }
                this.alltag = res.tags;
                this.loading = false;
            
                //   return R.ok().put("tags", tags).put("guanlianlist", guanlianlist).put("versionlist", versionlist);
                    this.$get("/epf-document/admin/doctag/getdocinit", {id:id}).then(res => {
                        if (res.code != "0") {
                        this.$message.error(res.msg); //失败
                            return;
                        }
                        var ids=[];
                        var taglist=[];
                        if(res.tags!=null && res.tags.length>0){
                            for (let j = 0; j < this.alltag.length; j++) {
                                for (let i = 0; i < res.tags.length; i++) {
                                if(res.tags[i].TAG_ID ==this.alltag[j].id){
                                        taglist.push(this.alltag[j])
                                        ids.push(this.alltag[j].id)
                                };
                            }
                            }
                        }
                        this.selectedtag=taglist;
                        this.selectedtagid=ids;
                        this.guanlian=res.guanlianlist

                        this.versiondoc=res.versionlist
                        
                        
                        
                    });
            });
         },
   
    loadTree() {
      var that = this;
      this.loading = true;
      that.$post("/epf-document/admin/docfolder/getAllFolderTree").then(res => {
        console.log("数返回", res.ztreeJson);
        that.forderdata = res.ztreeJson;
        this.loading = false;
      });
    },
    closearticle() {
      let that = this;
      this.$bus.$emit("closeTabsItem", this.$route.name);
      let routerPath = "/libraryManage";
      let title = "文库管理";
      var tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push("/libraryManage");
      this.$bus.$emit("refreshAssembly");
    }
  }
};
</script>
<style scoped>
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  box-sizing: border-box;
  padding: 10px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  position: relative;
}

.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
.title{font-size: 1.5em;font-weight: 600;text-align: center;line-height: 4;}
.contenthtml{margin-top: 30px;}
.tagspan{font-weight: 550;}
.filterIpt {
  position: relative;
}
.filterIpt i {
  position: absolute;
  right: 1%;
  top: 20%;
  font-size: 20px;
  cursor: pointer;
}
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
</style>