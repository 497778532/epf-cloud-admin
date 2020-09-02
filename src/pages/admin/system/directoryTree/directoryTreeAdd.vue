<template>
  <el-row style="height:100%"
          id="directoryTreeAdd">
    <el-col :span="7"
            style="height:100%;">
      <el-tree :data="data"
               show-checkbox
               node-key="id"
               :expand-on-click-node="false"
               @node-click="treeClick"
               :default-expanded-keys="defaultArray"
               :props="defaultProps">
        <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text"
                       size="mini"
                       @click="add('tree',node,data)">新建</el-button>
            <el-button type="text"
                       size="mini"
                       @click="remove(node, data)">删除</el-button>
            <el-button type="text"
                       size="mini"
                       @click="add('picture',node,data)">添加图层</el-button>
          </span>
          <span>
            <el-button type="text"
                       size="mini"
                       @click="upAndDown('UP',node, data)">上移</el-button>
            <el-button type="text"
                       size="mini"
                       @click="upAndDown('DOWN',node, data)">下移</el-button>
            <el-button type="text"
                       size="mini"
                       @click="remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </el-col>
    <el-col :span="17"
            style="height:100%;">
      <div class="filter_wrap">
        <!-- 搜索 -->
        <div class="switchHeight_box">
          <el-row>
            <el-col :span="2">
              <span class="filter_title">授权对象 :</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="filterData.noticeNo"
                        placeholder="请输入目录树名称"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="2">
              <span class="filter_title">所属部门 :</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="filterData.projectName"
                        placeholder="请输入目录树类型"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="5"
                    style="text-align:right;">
              <div class="button_bg"
                   @click="searchList()">查询</div>
              <div class="button_default"
                   @click="resetFilter()"
                   style="margin-right:0">重置</div>
            </el-col>
          </el-row>
        </div>
        <div class="toolsTitleBox">
          <!-- v-if="button.resourceId=='cjgs_add'"
            class="button_bg primary"
          @click="btnClick(1,'dealPublicityAdd')"-->
          <span @click="authorize()"
                class="button_bg primary">授权</span>
        </div>
        <el-table :data="authorizeData"
                  style="width: 100%;"
                  border
                  v-loading="loading"
                  element-loading-text="数据加载中"
                  element-loading-background="rgba(255, 255, 255,0.95)">
          <el-table-column type="selection"
                           width="40"></el-table-column>

          <el-table-column label="授权机构"
                           min-width="150">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.orgName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属部门"
                           min-width="140">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.orgName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属市"
                           min-width="120">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{scope.row.areaName}}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属区/县"
                           min-width="120">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.assignor }}</span>
            </template>
          </el-table-column>
          <el-table-column label="授权人"
                           min-width="150">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.assignor }}</span>
            </template>
          </el-table-column>
          <el-table-column label="授权日期"
                           min-width="150">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right"
                           label="操作"
                           min-width="190"
                           align="center">
            <template slot-scope="scope">
              <span class="list-style: none;">
                <!-- v-if="button.resourceId=='cjgs_editinfo'&&scope.row.status=='0'" -->
                <el-button @click="deletedAuthorizeList(item)"
                           size="mini"
                           type="primary"
                           plain>删除</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页控件 -->
        <div style="text-align:right;margin:8px 0px;margin-top:15px;">
          <el-pagination background
                         layout="prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10, 15, 20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="totalRecord"
                         :page-size="pageSize"
                         :current-page="pageNo"></el-pagination>
        </div>
      </div>
    </el-col>
    <el-dialog top="25vh"
               title="添加数据"
               :visible.sync="picture"
               width="60%">
      <el-row>
        <el-col :span="2">
          <span class="filter_title">图层名称 :</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="filterData.noticeNo"
                    placeholder="请输入"
                    :maxlength="50"></el-input>
        </el-col>
        <el-col :span="2">
          <span class="filter_title">区域 :</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="filterData.noticeNo"
                    placeholder="请输入"
                    :maxlength="50"></el-input>
        </el-col>
        <el-col :span="2">
          <span class="filter_title">类型 :</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="filterData.noticeNo"
                    placeholder="请输入"
                    :maxlength="50"></el-input>
        </el-col>
        <el-col :span="4"
                style="text-align:right;">
          <div class="button_bg"
               @click="searchList()">查询</div>
          <div class="button_default"
               @click="resetFilter()"
               style="margin-right:0">重置</div>
        </el-col>
      </el-row>
      <el-table :data="pictureData"
                style="width: 100%;margin-top:50px"
                border
                v-loading="loading"
                element-loading-text="数据加载中"
                element-loading-background="rgba(255, 255, 255,0.95)"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="40"></el-table-column>

        <el-table-column label="编号"
                         min-width="110">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.serviceCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="数据名称"
                         min-width="150">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.dataName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="服务名称"
                         min-width="190">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{scope.row.serviceName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="图层名称"
                         min-width="100">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.layerName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源单位"
                         min-width="120">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.orgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="区域"
                         min-width="120">
          <template slot-scope="scope">
            <span hit
                  size="medium">{{ scope.row.cantonAreaName }}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="picture = false">取 消</el-button>
        <el-button type="primary"
                   @click="addPictureEnter()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog top="25vh"
               title="添加目录"
               :visible.sync="text"
               width="30%">
      <el-row>
        <el-col :span="5">
          <span class="filter_title">目录树名称 :</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="lowerFilterData.name"
                    placeholder="请输入目录树名称"
                    :maxlength="50"></el-input>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addTree = false">取 消</el-button>
        <el-button type="primary"
                   @click="addTreeEnter()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog top="25vh"
               title="授权"
               :visible.sync="authorizeDialog"
               width="60%">
      <el-row>
        <el-col :span="8">
          <el-tree :data="menus"
                   show-checkbox
                   node-key="id"
                   :expand-on-click-node="false"
                   :props="authOrgDireInfo">
            <span class="custom-tree-node"
                  slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="16">
          <el-transfer v-model="unAuth"
                       :data="auth"
                       :props="{key:'id',label:'orgName'}"></el-transfer>
        </el-col>
      </el-row>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="authorizeDialog= false">取 消</el-button>
        <el-button type="primary"
                   @click="authorizeEnter()">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      authOrgDireInfo: {
        children: 'orgEntities',
        label: 'orgName'
      },
      id: '',
      filterData: {},
      //  表格数据
      tableData: [{}, {}],

      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，

      picturePageNo: 1, // 当前页
      picturePageSize: 5, // 当前每页条数
      pictureTotalPage: 1, // 总页数
      pictureTotalRecord: 1, // 总条数，
      authorizeDialog: false,
      picture: false,
      text: false,
      lowerFilterData: {},
      loading: false, // 控制loading动画显示隐藏
      params: {},
      lowerTreeParams: {},
      pictureParams: {},
      authorizeData: [],
      node: {},
      lowerTreeData: {},
      defaultArray: [],
      pictureData: [],
      direId: '',
      layerIdsArr: [],
      menus: [],
      unAuth: [],
      auth: []
    }
  },
  components: {},
  created () {
    this.id = this.$route.query.id;
    (this.params['direId'] = this.id), this.getTreeAdmin()
    this.getAuthorizeList()
  },
  methods: {
    // 修改目录树排序
    upAndDown (key, node, data) {
      this.lowerTreeData = data
      console.log(this.lowerTreeData)
      this.$post('/epf-onemap/admin/mapdiretree/changeOrder', {
        id: data.id,
        option: key
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$message.success(res.msg)
          this.getTreeAdmin()
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    // 添加事件，打开弹窗
    add (key, node, data) {
      if (key == 'picture') {
        this.direId = data.id
        this.picture = true
        this.getPictureList()
      }
      if (key == 'tree') {
        this.text = true
        this.lowerTreeData = data
      }
    },
    // 添加页面保存按钮事件 --添加其他等级目录树
    addTreeEnter () {
      this.lowerTreeParams = this.lowerFilterData
      this.lowerTreeParams['leverl'] = parseInt(this.lowerTreeData.leverl) + 1
      this.lowerTreeParams['parentId'] = this.lowerTreeData.id
      this.$post(
        '/epf-onemap/admin/mapdiretree/addOtherMapDireTree',
        this.lowerTreeParams
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$message.success('添加成功') // 失败
          this.getTreeAdmin()
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
      this.text = false
    },
    // 添加页面保存按钮事件 --添加图层与目录关系
    addPictureEnter () {
      this.picture = false
      this.pictureAndTree()
    },
    // 授权的弹框
    authorize () {
      this.authorizeDialog = true
      this.threeList()
    },
    // 获取权限列表
    getAuthorizeList () {
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$post('/epf-onemap/admin/mapdiretree/getMapDireTree', params).then(
        res => {
          console.log(res)
          if (res.code == '0') {
            this.authorizeData = res.pager.results
            this.pageNo = res.pager.pageNo
            this.pageSize = res.pager.pageSize
            this.totalPage = res.pager.totalPage
            this.totalRecord = res.pager.totalRecord
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    // 从授权列表上删除数据
    deletedAuthorizeList (item) {
      this.$post('/epf-onemap/admin/mapdiretree/deleteOrgRel', {
        id: item.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$message.success(res.msg) // 失败
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    // 授权的弹框确定世界
    authorizeEnter () {
      this.authorizeDialog = false
    },
    // 得到目录树
    getTreeAdmin () {
      this.$post('/epf-onemap/admin/mapdiretree/getDireTreeById', {
        id: this.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$set(this.data, 0, res.menus)
          this.$set(this.defaultArray, 0, this.lowerTreeData.id)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    treeClick (item, node, data) {
      console.log(item)
      console.log(node)
      console.log(data)
    },
    getPictureList () {
      let pictureParams = this.pictureParams
      pictureParams['page'] = this.picturePageNo
      pictureParams['rows'] = this.picturePageSize
      this.$get(
        '/epf-onemap/admin/mapdiretree/queryDireLayerInfo',
        pictureParams
      ).then(res => {
        if (res.code == '0') {
          this.pictureData = res.pager.results
          this.picturePageNo = res.pager.pageNo
          this.picturePageSize = res.pager.pageSize
          this.pictureTotalPage = res.pager.totalPage
          this.pictureTotalRecord = res.pager.totalRecord
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    showHandle (node) {
      return node.childNodes.length !== 0
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      // this.getList();
    },
    // 得到授权弹框的3个列表
    threeList () {
      this.$post('/epf-onemap/admin/mapdiretree/authOrgDireInfo', {
        topDireId: this.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.auth = res.info.auth
          this.unAuth = res.info.unAuth
          this.$set(this.menus, 0, res.info.menus)
          this.$message.success(res.msg) // 失败
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      // this.getList();
    },
    // 目录树上的删除事件
    remove (node, data) {
      let parentId = data.parentId
      this.$post('/epf-onemap/admin/mapdiretree/deleteMapDireTree', {
        id: data.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$message.success('删除成功') // 失败
          this.getTreeAdmin()
          this.defaultArray = parentId
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    // 添加图层与目录关系
    pictureAndTree () {
      this.$post('/epf-onemap/admin/mapdiretree/addDireLayer', {
        direId: this.direId,
        layerIdsArr: this.layerIdsArr
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$message.success('成功') // 失败T
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    getIDs: function (array) {
      var ids = ''
      for (var i = 0; i < array.length; i++) {
        ids += array[i].id
        if (i != array.length - 1) {
          ids += ','
        }
      }
      return ids
    },
    handleSelectionChange (val) {
      this.layerIdsArr = this.getIDs(val)
    }
  }
}
</script>

<style scoped>
.filter_wrap {
  height: 100%;
  box-sizing: border-box;
  padding: 34px 22px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
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
.switchHeight_box {
  padding: 30px;
  border: 1px solid rgb(219, 219, 219);
  margin-bottom: 30px;
}
.btnBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.companyInfoBox {
  padding: 30px 30px;
  max-height: 600px;
  overflow-y: auto;
}
.titleFont {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.middleBox {
  margin: 30px auto;
  margin-top: 10px;
}
.middleBox_btn {
  width: 85%;
  margin: 30px auto;
  margin-bottom: 0;
}
.btnInfo {
  margin-top: 20px;
  text-align: right;
  font-size: 16px;
  letter-spacing: 3px;
}
.toolsTitleBox {
  background-color: #f9fbff;
  padding: 10px 15px;
  text-align: right;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 13px;
  float: left;
}
.primary {
  background-color: #03b976;
  border-color: #03b976;
}
</style>
<style >
