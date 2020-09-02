<template>
  <el-row style="height:100%"
          id="directoryTreeEditor"
          class="EPF-table">
    <el-col :span="7"
            style="height:100%; padding:15px">
      <controllerResource @EPFnodeClick="nodeClick"
                          :EPFDefaultProps="defaultProps"
                          :data="data"
                          :EPFdefaultArray="defaultArray1"
                          style="width:100%">
        <template slot="handle"
                  slot-scope="scope">
          <div class="currentDiv"
               v-if="scope.row.leverl&&scope.row===isCurrent">
            <div @click.stop="add('tree',scope.row)">
              <img :src="xzml"
                   alt />
            </div>
            <div @click.stop="add('picture',scope.row)">
              <img :src="tjfw"
                   alt />
            </div>
            <div @click.stop="add('editor',scope.row)">
              <img :src="WenJianEditor"
                   alt />
            </div>
            <div>
              <img v-if="showUp(scope.rowNode)"
                   :src="sy"
                   @click.stop="upAndDown('UP',scope.row,scope.rowNode,$event)"
                   alt />
              <img v-else
                   :src="syNo"
                   alt />
            </div>
            <div>
              <img v-if="showDown(scope.rowNode)"
                   :src="xy"
                   @click.stop="upAndDown('DOWN',scope.row,scope.rowNode,$event)"
                   alt />
              <img v-else
                   :src="xyNo"
                   alt />
            </div>
            <div @click.stop="remove(scope.row)">
              <img :src="sc"
                   alt />
            </div>
          </div>

          <div v-if="scope.row.hasOwnProperty('relId')&&scope.row===isCurrent"
               class="currentDiv">
            <div @click.stop="serverupAndDown('UP',scope.row,scope.rowNode)">
              <img v-if="showServerUp(scope.rowNode)"
                   :src="sy"
                   alt />
              <img v-else
                   :src="syNo"
                   alt />
            </div>
            <div @click.stop="serverupAndDown('DOWN',scope.row)">
              <img v-if="showServerDown(scope.rowNode)"
                   :src="xy"
                   alt />
              <img v-else
                   :src="xyNo"
                   alt />
            </div>
            <div @click.stop="serverRemove(scope.row,scope.rowNode)">
              <img :src="sc"
                   alt />
            </div>
          </div>
        </template>
      </controllerResource>
    </el-col>
    <el-col :span="17"
            style="height:100%;">
      <div class="filter_wrap">
        <!-- 搜索 -->
        <div class="switchHeight_box">
          <el-row>
            <el-col :span="3">
              <span class="filter_title">授权对象 :</span>
            </el-col>
            <el-col :span="5">
              <el-input v-model="filterData.orgName"
                        placeholder="请输入授权对象"
                        :maxlength="50"></el-input>
            </el-col>
            <!-- <el-col :span="2">
              <span class="filter_title">所属部门 :</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="filterData.projectName" placeholder="请输入目录树类型" :maxlength="50"></el-input>
            </el-col>-->
            <el-col :span="5"
                    style="text-align:right;">
              <el-button type="primary"
                         size="medium"
                         @click="searchList()">查询</el-button>
              <el-button type="primary"
                         size="medium"
                         @click="resetFilter()">重置</el-button>
              <!-- <div class="button_bg" @click="searchList()">查询</div>
              <div class="button_default" @click="resetFilter()" style="margin-right:0">重置</div>-->
            </el-col>
          </el-row>
        </div>
        <div class="toolsTitleBox">
          <!-- v-if="button.resourceId=='cjgs_add'"
            class="button_bg primary"
          @click="btnClick(1,'dealPublicityAdd')"-->
          <!-- <span @click="authorize()" class="button_bg primary">授权</span> -->
          <el-button type="primary"
                     size="medium"
                     @click="authorize()">授权</el-button>
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
                    size="medium"></span>
            </template>
          </el-table-column>

          <el-table-column label="所属区/县"
                           min-width="120">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.areaName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="授权人"
                           min-width="150">
            <template slot-scope="scope">
              <span hit
                    size="medium">{{ scope.row.createUserName }}</span>
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
                <el-button @click="deletedAuthorizeList(scope.row)"
                           type="text"
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
    <el-dialog top="15vh"
               title="添加数据"
               :visible.sync="picture"
               width="50%"
               class="pictureAndTree"
               :modal="false">
      <el-row>
        <el-col :span="3">
          <span class="filter_title">搜索关键字 :</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="pictureFilterData.key"
                    placeholder="请输入"
                    :maxlength="50"></el-input>
        </el-col>
        <el-col :span="3">
          <span class="filter_title">来源单位 :</span>
        </el-col>
        <el-col :span="8">
          <el-cascader placeholder="全部"
                       expand-trigger="hover"
                       :options="orgdata"
                       :show-all-levels="false"
                       v-model="slectdefall"
                       :change-on-select="true"
                       @change="handleChange"></el-cascader>
        </el-col>
        <el-col :span="4"
                style="text-align:right;">
          <el-button type="primary"
                     size="medium"
                     @click="pictureSearchList()">查询</el-button>
          <el-button type="primary"
                     size="medium"
                     @click="pictureResetFilter()">重置</el-button>
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
      <div style="text-align:right;margin:8px 0px;margin-top:15px;">
        <el-pagination background
                       layout="prev, pager, next,sizes,jumper"
                       :page-sizes="[5,10, 15, 20]"
                       @size-change="pictureHandleSizeChange"
                       @current-change="pictureHandleCurrentChange"
                       :total="pictureTotalRecord"
                       :page-size="picturePageSize"
                       :current-page="picturePageNo"></el-pagination>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="addPictureEnter()">确 定</el-button>
        <el-button @click="picture = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog top="15vh"
               title="添加目录"
               :visible.sync="text"
               width="30%"
               :modal="false">
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
        <el-button type="primary"
                   @click="addTreeEnter()">确 定</el-button>
        <el-button @click="text = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog top="15vh"
               title="修改"
               :visible.sync="text2"
               width="30%"
               :modal="false">
      <el-row>
        <el-col :span="5">
          <span class="filter_title">目录树名称 :</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="editorName"
                    placeholder="请输入目录树名称"
                    :maxlength="50"></el-input>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="text2 = false">取 消</el-button>
        <el-button type="primary"
                   @click="editorTreeEnter()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog top="15vh"
               title="授权"
               :visible.sync="authorizeDialog"
               width="50%"
               class="pictureAndTree">
      <tree-transfer :title="title"
                     :from_data="unAuth"
                     :to_data="auth"
                     :defaultProps="{key:'id',label:'orgName'}"
                     @addBtn="transferAdd"
                     @removeBtn="transferRemove"
                     :mode="mode"
                     height="400px"
                     filter
                     openAll></tree-transfer>

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
import controllerResource from '../../onemap/controller/controllerResourceCommon'
import treeTransfer from 'el-tree-transfer'
export default {
  data () {
    return {
      sy: require('../../../../assets/sy.png'),
      syNo: require('../../../../assets/syNo.png'),
      xyNo: require('../../../../assets/xyNo.png'),
      xy: require('../../../../assets/xy.png'),
      xzml: require('../../../../assets/xzml.png'),
      tjfw: require('../../../../assets/tjtc.png'),
      cmm: require('../../../../assets/cmm.png'),
      WenJianEditor: require('@/assets/WenJianEditor.png'),
      sc: require('../../../../assets/sc.png'),
      mode: 'transfer', // transfer addressList
      title: ['未授权机构', '已授权机构'],
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
      filterData: {
        orgName: ''
      },
      pictureFilterData: {},
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
      editorName: '',
      loading: false, // 控制loading动画显示隐藏
      params: {},
      orgdata: [],
      lowerTreeParams: {},
      pictureParams: {},
      authorizeData: [],
      node: {},
      lowerTreeData: {},
      lowerTreeData2: {},
      pictureData: [],
      direId: '',
      serviceIdsArr: '',
      menus: [],
      unAuth: [],
      auth: [],
      text2: false,
      isCurrent: '',
      defaultArray1: [],
      slectdefall: []
    }
  },
  components: { treeTransfer, controllerResource },
  created () {
    this.id = this.$route.query.id
    this.$set(this.defaultArray1, 0, this.id);
    (this.params['direId'] = this.id), this.getTreeAdmin()
    this.getAuthorizeList()
    this.getGrowpList({})
  },
  methods: {
    serverupAndDown (key, data, node) {
      console.log(node)
      this.$post('/epf-onemap/admin/mapdiretree/orderServiceRel', {
        id: data.relId,
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
    serverRemove (data, node) {
      console.log(node)
      this.$post('/epf-onemap/admin/mapdiretree/deleteServiceRel', {
        id: data.relId
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$set(this.defaultArray1, 0, node.parent.data.id)
          this.$message.success(res.msg)
          this.getTreeAdmin()
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    upAndDown (key, data, node) {
      console.log(node.nextSibling)
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
    add (key, data) {
      if (key == 'picture') {
        this.direId = data.id
        this.picture = true
        this.getPictureList()
      }
      if (key == 'tree') {
        this.text = true
        this.lowerTreeData = data
      }

      if (key === 'editor') {
        this.text2 = true
        this.lowerTreeData2 = data
        this.editorName = ''
      }
    },
    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
    },
    searchList () {
      this.params = this.filterData
      this.params['direId'] = this.id
      this.getAuthorizeList()
    },

    pictureSearchList () {
      this.pictureParams = this.pictureFilterData
      this.getPictureList()
    },
    pictureResetFilter () {
      for (let item in this.pictureFilterData) {
        this.pictureFilterData[item] = ''
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
          (this.lowerFilterData.name = ''), this.$message.success('添加成功') // 失败
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
          this.$message.success(res.msg)
          this.getAuthorizeList()
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    showCheck (node, data) {
      !data.hasOwnProperty('collectStatus')
    },
    // 授权的弹框确定世界
    authorizeEnter () {
      let topDireId = this.getIDs(this.auth)
      this.$post('/epf-onemap/admin/mapdiretree/authOrg', {
        orgIds: topDireId || '',
        topDireId: this.id
      }).then(res => {
        this.authorizeDialog = false
        if (res.code == '0') {
          this.getAuthorizeList()
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    // 得到目录树
    getTreeAdmin () {
      this.$post('/epf-onemap/admin/mapdiretree/getDireTreeById', {
        id: this.id
      }).then(res => {
        if (res.code == '0') {
          var treeNew = this.getTreeAndData(res.menus)

          /*
          res.menus = JSON.parse(
            JSON.stringify(res.menus).replace(/serviceName/g, "name")
          );
          */
          // const arr=res.menus.childs.concat(res.menus.layers)

          // res.menus.childs = this.getChidlren(res.menus.childs);
          console.log(res.menus.childs)
          this.$set(this.data, 0, treeNew)

          console.log(this.data)
          // this.$set(this.defaultArray, 0, this.lowerTreeData.id);
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    getChidlren (mydata) {
      var result
      var fn = function (data) {
        if (Array.isArray(data) && data.length) {
          // 判断是否是数组并且没有的情况下，
          data.forEach(item => {
            if (Array.isArray(item.services) && item.services.length) {
              // 数据循环每个子项，并且判断子项下边是否有id值
              item.childs = item.childs.concat(item.services) // 返回的结果等于每一项
            } else if (item.childs.length) {
              fn(item.childs) // 递归调用下边的子项
            }
          })
        }
        result = data
      }
      fn(mydata)

      return result
    },

    getTreeAndData (dataOne) {
      var result = {}

      result.name = dataOne.name
      result.id = dataOne.id
      result.leverl = dataOne.leverl
      result.childs = []

      var childrens = dataOne.childs
      var childServices = dataOne.services
      var dataChildTemp

      if (childrens) {
        for (let index = 0; index < childrens.length; index++) {
          dataChildTemp = this.getTreeAndData(childrens[index])
          result.childs.push(dataChildTemp)
        }
      }

      if (childServices) {
        for (let indexY = 0; indexY < childServices.length; indexY++) {
          dataChildTemp = {}
          dataChildTemp.name = childServices[indexY].serviceName
          dataChildTemp.id = childServices[indexY].id
          dataChildTemp.relId = childServices[indexY].relId
          result.childs.push(dataChildTemp)
        }
      }

      return result
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
        '/epf-onemap/admin/mapdiretree/queryDireServiceInfo',
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
      this.getAuthorizeList()
    },
    // 得到授权弹框的3个列表
    threeList () {
      this.$post('/epf-onemap/admin/mapdiretree/authOrgDireInfo', {
        topDireId: this.id
      }).then(res => {
        if (res.code == '0') {
          this.auth = res.info.auth
          this.unAuth = res.info.unAuth
          this.$set(this.menus, 0, res.info.menus)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    nodeClick (item) {
      this.$set(this.defaultArray1, 0, item.id)
      this.isCurrent = item
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getAuthorizeList()
    },
    pictureHandleSizeChange (val) {
      this.picturePageSize = val
      this.getPictureList()
    },
    pictureHandleCurrentChange (val) {
      this.picturePageNo = val // 页码改变
      this.getPictureList()
    },
    // 目录树上的删除事件
    remove (data) {
      let parentId = data.parentId
      this.$post('/epf-onemap/admin/mapdiretree/deleteMapDireTree', {
        id: data.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$set(this.defaultArray1, 0, parentId)
          this.$message.success('删除成功') // 失败
          this.getTreeAdmin()
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    // 添加图层与目录关系
    pictureAndTree () {
      if (this.serviceIdsArr === '') {
        return
      }
      this.$post('/epf-onemap/admin/mapdiretree/addDireService', {
        direId: this.direId,
        serviceIdsArr: this.serviceIdsArr
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.getTreeAdmin()
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
      this.serviceIdsArr = this.getIDs(val)
    },

    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode () {
      if (this.mode == 'transfer') {
        this.mode = 'addressList'
      } else {
        this.mode = 'transfer'
      }
    },
    showUp (node) {
      return (
        node.previousSibling
        && node.previousSibling.data.hasOwnProperty('leverl')
      )
    },
    showDown (node) {
      return node.nextSibling && node.nextSibling.data.hasOwnProperty('leverl')
    },
    showServerUp (node) {
      return (
        node.previousSibling
        && node.previousSibling.data.hasOwnProperty('relId')
      )
    },
    showServerDown (node) {
      return node.nextSibling && node.nextSibling.data.hasOwnProperty('relId')
    },
    showButton (data) {
      return !!data.hasOwnProperty('leverl')
    },
    editorTreeEnter () {
      let params = {
        id: this.lowerTreeData2.id,
        name: this.editorName
      }
      this.$get(
        '/epf-onemap/admin/mapdiretree/editMapDireTreeName',
        params
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.$message.success('修改成功') // 失败
          this.getTreeAdmin()
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
      this.text2 = false
    },
    // 监听穿梭框组件添加
    transferAdd (fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的        {keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表

      this.unAuth = fromData
      this.auth = toData

      //    console.log(this.unAuth)
      // console.log(this.auth)
    },
    // 监听穿梭框组件移除
    transferRemove (fromData, toData, obj) {
      this.auth = toData

      this.unAuth = fromData
    },
    async getGrowpList (params) {
      this.$get('/epf-admin/admin/org/getallOrg', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          return
        }
        console.log(res)
        var orglist = res.ztreeJson
        var selecttree = new Array()
        for (var i = 0; i < orglist.length; i++) {
          if (
            orglist[i].parentId == '0'
            || orglist[i].parentId == ''
            || orglist[i].parentId == null
          ) {
            var selecttree1 = new Array()
            for (var j = 0; j < orglist.length; j++) {
              if (orglist[j].parentId == orglist[i].id) {
                selecttree1.push({
                  value: orglist[j].id,
                  label: orglist[j].orgName
                })
              }
            }
            for (var j = 0; j < selecttree1.length; j++) {
              var selecttree2 = new Array()
              for (var k = 0; k < orglist.length; k++) {
                if (orglist[k].parentId == selecttree1[j].value) {
                  selecttree2.push({
                    value: orglist[k].id,
                    label: orglist[k].orgName
                  })
                }
              }
              if (selecttree2.length > 0) {
                selecttree1[j].children = selecttree2
              }
            }

            if (selecttree1.length > 0) {
              selecttree.push({
                value: orglist[i].id,
                label: orglist[i].orgName,
                children: selecttree1
              })
            } else {
              selecttree.push({
                value: orglist[i].id,
                label: orglist[i].orgName
              })
            }
          }
        }
        console.log(selecttree)
        this.orgdata = selecttree
      })
    },
    handleChange (value) {
      this.pictureFilterData.orgId = value[value.length - 1]
      // this.singleuser.orgId = value[value.length - 1];
      // this.addForm.sourceUnit = this.singleuser.orgId;
      //  this.editForm.sourceUnit = this.singleuser.orgId;
    }
  }
}
</script>

<style scoped>
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
.zy-main {
  height: 100%;
  overflow: hidden;
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

.toolsTitleBox {
  height: 56px;
  background: rgba(230, 230, 230, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  text-align: right;
  line-height: 56px;
  margin-bottom: 20px;
  padding-right: 20px;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 13px;
  float: left;
}
.currentDiv {
  display: flex;
  align-items: center;
  width: 50%;
}
.currentDiv > div {
  display: inline-block;
  margin-right: 5px;
}
</style>

<style>
#directoryTreeEditor .filter_wrap {
  box-sizing: border-box;
  padding: 30px 15px;
}
#directoryTreeEditor .filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding-right: 15px;
  text-align: right;
  line-height: 35px;
  color: rgba(48, 48, 48, 1);
  font-weight: 400;
  font-size: 16px;
}
#directoryTreeEditor .switchHeight_box {
  height: 56px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  line-height: 56px;
  margin-bottom: 20px;
}
#directoryTreeEditor .el-input__inner {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(198, 198, 198, 1);
  height: 36px;
  line-height: 40px;
}
#directoryTreeEditor .el-button--primary {
  background: linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -ms-linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -webkit-linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -moz-linear-gradient(left, #1e7ae5, #0ca6e1);
  border: none;
}

#directoryTreeEditor .el-table .el-button--text {
  padding: 5px 15px;
}

#directoryTreeEditor .el-dialog {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.57);
}
#directoryTreeEditor .el-dialog__header {
  border: none;
}
#directoryTreeEditor .pictureAndTree .el-dialog__header {
  height: 44px;
  border-radius: 2px 2px 0px 0px;
  line-height: 44px;
  padding: 0 0 0 20px;
  background: linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -ms-linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -webkit-linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -moz-linear-gradient(left, #1e7ae5, #0ca6e1);
}
#directoryTreeEditor .pictureAndTree .el-dialog__title {
  font-size: 18px;
  color: #fff;
}
#directoryTreeEditor .el-dialog__title {
  color: rgba(29, 124, 228, 1);
}
#directoryTreeEditor .el-dialog__footer {
  border: none;
}

#directoryTreeEditor .el-dialog__headerbtn {
  top: 13px;
}

#directoryTreeEditor .transfer-title[data-v-20f1e172] {
  background: rgba(230, 230, 230, 1);
  border-bottom: 1px solid rgba(112, 112, 112, 1);
}

#directoryTreeEditor .transfer-left[data-v-20f1e172],
#directoryTreeEditor .transfer-right[data-v-20f1e172] {
  border: 1px solid rgba(112, 112, 112, 1);
}
</style>
