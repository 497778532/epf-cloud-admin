<template>
  <el-row id="modelbase">
    <!-- <el-avatar
              src="http://39.108.106.59:8081/epf-document/document/downloadById?id=1207ef89-f5f7-4d4b-b3e4-760b2baba4af"
              :size="100"
              style="margin:0 auto;display:block"
              shape="square"
    ></el-avatar>-->
    <div class="filter_wrap">
      <el-row class="switchHeight_box">
        <el-col :span="4">
          <el-input v-model="searchData.modelName"
                    placeholder="请输入模型名称"
                    :maxlength="50"></el-input>
        </el-col>

        <el-col :span="2"
                :offset="1">
          <div class="primary_reset"
               @click="resetFilter()">重置</div>
        </el-col>
        <el-col :span="2">
          <div class="primary_search"
               @click="searchList()">搜索</div>
        </el-col>
        <el-col :span="2"
                :offset="13">
          <div class="primary_reset"
               @click="configuration1=true">新建模型</div>
        </el-col>
      </el-row>
    </div>
    <div class="baseTable">
      <el-row :gutter="15"
              style="background:rgba(252,252,252,1);
              padding:14px 16px
              border-radius:2px;
              border:1px solid rgba(231,231,231,1);">
        <el-col :span="6"
                v-for="(item,index) in tableData"
                :key="index">
          <div style="padding:8px;cursor:pointer"
               @click.stop="detail(item)">
            <el-avatar :src="item.modelIconFileImg"
                       :size="100"
                       style="margin:0 auto;display:block"
                       shape="square"></el-avatar>

            <div class="baseTableTitle">
              <span>{{item.modelName}}</span>
            </div>

            <div class="baseTableContent">
              <el-scrollbar>{{item.modelDefine}}</el-scrollbar>
            </div>
            <div class="last-tr">
              <div @click.stop="publish(item)"><img :src="item.isRelease==0?handle1:handle4"
                     alt="">
                <span v-if="item.isRelease==0">发布</span>
                <span v-else>暂停</span>
              </div>
              <div @click.stop="editor(item)"><img :src="handle2"
                     alt="">
                <span>编辑</span></div>
              <div @click.stop="remove(item)"><img :src="handle3"
                     alt="">
                <span>删除</span></div>

              <!-- <i :class="item.isRelease==0?'el-icon-position modelHandle':'el-icon-video-pause modelHandle' "
                 style="margin-right:10px"
                 @click.stop="publish(item)"></i>
              <i class="el-icon-edit modelHandle"
                 style="margin-right:10px"
                 @click.stop="editor(item)"></i>
              <i class="el-icon-delete modelHandle"
                 @click.stop="remove(item)"></i> -->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 分页控件 -->
    <div style="text-align:right;margin:8px 0px;">
      <el-pagination background
                     layout="total,prev, pager, next,sizes,jumper"
                     :page-sizes="[12,24,36,48]"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :total="totalRecord"
                     :page-size="pageSize"
                     :current-page="pageNo"></el-pagination>
    </div>

    <div v-if="configuration1"
         class="delDialog my-dialog">
      <div class="handelDialog">

        <el-row class="dialogHeader drag-title">
          <el-col :span="6"
                  style="font-size:18px;">新增模型</el-col>
          <el-col :span="6"
                  justify="end"
                  :push="12"
                  style="text-align:right">
            <i class="el-icon-close"
               @click="configuration1=false"
               style="font-size:20px;cursor:pointer;color:#fff"></i>
          </el-col>
        </el-row>
        <div style="height:300px">
          <el-scrollbar>
            <el-form :model="filterData"
                     ref="followData"
                     label-width="auto"
                     class="demo-ruleForm"
                     id="basicInfo"
                     style="margin-top:15px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="模型名称："
                                prop="modelName">
                    <el-input v-model="filterData.modelName"
                              placeholder="请输入模型名称"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="版本号："
                                prop="versionNo">
                    <el-input v-model="filterData.versionNo"
                              placeholder="请输入版本号"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="模型类型："
                                prop="modelTypeName">
                    <el-select v-model="filterData.modelTypeName"
                               size="small"
                               placeholder="选择模型类型"
                               @change="modelTypeSelect2(dictionary.model_type,filterData.modelTypeName,$event)">
                      <el-option v-for="item in dictionary.model_type"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="item.dictKey"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="模型定义："
                                prop="goodsId">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              :maxlength="200"
                              v-model="filterData.modelDefine"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="locationImg"
                                label="模型ICON：">
                    <el-upload action="http://192.168.1.200:8081/epf-document/document/upload/"
                               ref="photoUploaderOne"
                               list-type="picture-card"
                               multiple
                               :limit="1"
                               :http-request="location_first_photoUploadFile"
                               :on-preview="location_handlePictureCardPreview"
                               :on-remove="location_file_List_Remove"
                               :before-upload="location_beforeAvatarUploadImg"
                               :on-success="location_first_UploadSuccess"
                               :on-error="location_upLoadError"
                               :file-list="filterData.fileList">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="locationImg"
                                label="模型流程设计图：">
                    <el-upload action="http://192.168.1.200:8081/epf-document/document/upload/"
                               ref="photoUploaderTwo"
                               list-type="picture-card"
                               multiple
                               :http-request="step_first_photoUploadFile"
                               :on-remove="step_file_List_Remove"
                               :before-upload="step_file_List_Remove"
                               :on-success="step_first_UploadSuccess"
                               :on-error="step_upLoadError"
                               :file-list="filterData.stepFileList">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="模型输入："
                                prop="goodsId">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              :maxlength="200"
                              v-model="filterData.modelInput"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="计算过程："
                                prop="goodsId">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              :maxlength="200"
                              v-model="filterData.modelProcerr"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="模型输出："
                                prop="goodsId">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              :maxlength="200"
                              v-model="filterData.modelOutput"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-scrollbar>
        </div>

        <el-row class="dialogFooter">
          <div class="EPFButton EFPreset"
               @click="configuration1=false">取 消</div>
          <div class="EPFButton EFPcommon"
               @click="save()">保 存</div>
        </el-row>
      </div>
    </div>

    <div v-if="configuration2"
         class="delDialog my-dialog">
      <div class="handelDialog">
        <el-row class="dialogHeader drag-title">
          <el-col :span="6"
                  style="font-size:18px;">修改模型</el-col>
          <el-col :span="6"
                  justify="end"
                  :push="12"
                  style="text-align:right">
            <i class="el-icon-close"
               @click="configuration2=false"
               style="font-size:20px;cursor:pointer;color:#fff"></i>
          </el-col>
        </el-row>
        <div style="height:300px">
          <el-scrollbar>
            <el-form :model="editorModel"
                     ref="editorModel"
                     label-width="auto"
                     class="demo-ruleForm"
                     id="basicInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="模型名称："
                                prop="modelName">
                    <el-input v-model="editorModel.modelName"
                              placeholder="请输入模型名称"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="版本号："
                                prop="versionNo">
                    <el-input v-model="editorModel.versionNo"
                              placeholder="请输入版本号"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="模型类型："
                                prop="modelTypeName">
                    <el-select v-model="editorModel.modelTypeName"
                               size="small"
                               placeholder="选择模型类型"
                               @change="modelTypeSelect(dictionary.model_type,editorModel.modelTypeName,$event)">
                      <el-option v-for="item in dictionary.model_type"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="item.dictKey"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="模型定义："
                                prop="goodsId">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              :maxlength="200"
                              v-model="editorModel.modelDefine"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="locationImg"
                                label="模型ICON：">
                    <el-upload action="http://192.168.1.200:8081/epf-document/document/upload/"
                               ref="photoUploaderOne"
                               list-type="picture-card"
                               multiple
                               :limit="1"
                               :http-request="editor_first_photoUploadFile"
                               :on-preview="editor_handlePictureCardPreview"
                               :on-remove="editor_file_List_Remove"
                               :before-upload="editor_beforeAvatarUploadImg"
                               :on-success="editor_first_UploadSuccess"
                               :on-error="editor_upLoadError"
                               :file-list="editorModel.fileList">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="locationImg"
                                label="模型流程设计图：">
                    <el-upload action="http://192.168.1.200:8081/epf-document/document/upload/"
                               ref="photoUploaderTwo"
                               list-type="picture-card"
                               multiple
                               :http-request="editor2_first_photoUploadFile"
                               :on-remove="editor2_file_List_Remove"
                               :before-upload="editor_beforeAvatarUploadImg"
                               :on-success="editor_first_UploadSuccess"
                               :on-error="editor_upLoadError"
                               :file-list="editorModel.fileList2">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="模型输入："
                                prop="goodsId">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              :maxlength="200"
                              v-model="editorModel.modelInput"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="计算过程："
                                prop="goodsId">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              :maxlength="200"
                              v-model="editorModel.modelProcerr"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="模型输出："
                                prop="goodsId">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                              placeholder="请输入内容"
                              :maxlength="200"
                              v-model="editorModel.modelOutput"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-scrollbar>
        </div>
        <el-row class="dialogFooter">
          <div class="EPFButton EFPreset"
               @click="configuration2=false">取 消</div>
          <div class="EPFButton EFPcommon"
               @click="editorSave()">保 存</div>
        </el-row>
      </div>

    </div>

    <div v-if="configuration3"
         class="delDialog my-dialog">
      <div class="handelDialog">

        <el-row class="dialogHeader drag-title">
          <el-col :span="6"
                  style="font-size:18px;">模型详情</el-col>
          <el-col :span="6"
                  justify="end"
                  :push="12"
                  style="text-align:right">
            <i class="el-icon-close"
               @click="configuration3=false"
               style="font-size:20px;cursor:pointer;color:#fff"></i>
          </el-col>
        </el-row>

        <div style="height:300px">
          <el-scrollbar>
            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">模型名称：</span>
              </el-col>
              <el-col :span="12">
                <span class="filter_title left">{{imModelLibrary.modelName}}</span>
              </el-col>

              <el-col :span="3">
                <span class="filter_title">版本号：</span>
              </el-col>
              <el-col :span="5">
                <span class="filter_title left">{{imModelLibrary.versionNo}}</span>
              </el-col>
            </el-row>

            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">模型定义：</span>
              </el-col>
              <el-col :span="20">
                <span class="filter_title left">{{imModelLibrary.modelDefine}}</span>
              </el-col>
            </el-row>

            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">模型输入：</span>
              </el-col>
              <el-col :span="20">
                <span class="filter_title left">{{imModelLibrary.modelInput}}</span>
              </el-col>
            </el-row>
            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">计算过程：</span>
              </el-col>
              <el-col :span="20">
                <span class="filter_title left">{{imModelLibrary.modelProcerr}}</span>
              </el-col>
            </el-row>
            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">模型输出：</span>
              </el-col>
              <el-col :span="20">
                <span class="filter_title left">{{imModelLibrary.modelOutput}}</span>
              </el-col>
            </el-row>
            <el-row class="myRow">
              <el-col :span="4">
                <span class="filter_title">模型流程图：</span>
              </el-col>
            </el-row>
            <el-row class="myRow">
              <img :src="imModelLibrary.modelDesignFileImg	"
                   alt
                   style="width:100%" />
            </el-row>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
import axios from 'axios'
import baseURL1 from '../../../../utils/config'
export default {
  name: 'modelbase',
  data () {
    return {
      imgBox: {},
      liucheng: require('../../../../assets/liucheng.png'),
      tableData: [
        {
          id: '1',
          title: '经济社会发展预期分析',
          content:
            '用于土地利用总体规划实施评估，根据经济、社会历史、现状数据对未来的发展进行预测。'
        },
        {
          id: '2',
          title: '经济社会发展预期分析',
          content:
            '用于土地利用总体规划实施评估，根据自然资源、人口结构、产业条件，对土地利用的潜力进行预测。'
        },
        {
          id: '3',
          title: '经济社会发展预期分析',
          content:
            '用于土地利用总体规划实施评估，根据规划数据与当前实际现状数据评价规划目标的实现程度。'
        },
        {
          id: '4',
          title: '经济社会发展预期分析',
          content:
            '用于土地利用总体规划实施评估，根据自各类用地数据空间分布数据评价用地节约集约程度。'
        },
        {
          id: '5',
          title: '经济社会发展预期分析',
          content:
            '用于土地利用总体规划实施评估，根据自然资源、人口结构、产业条件对土地利用结构进行优化配置。'
        },
        {
          id: '61',
          title: '经济社会发展预期分析',
          content:
            '用于土地利用总体规划实施评估，根据土地利用现状信息分析当前存在的问题。'
        },
        {
          id: '7',
          title: '经济社会发展预期分析',
          content:
            '用于土地利用总体规划实施评估，根据自评价对象区域内的人口、资源等因素评价用地结构和布局是否合理。'
        },
        {
          id: '8',
          title: '经济社会发展预期分析',
          content:
            '用于土地利用总体规划实施评估，根据人口及预测结果和经济发展预测未来一段时间的用地需求。'
        }
      ],
      searchData: {
        modelName: '',
        modelType: '',
        modelTypeName: ''
      },
      loading: false,
      pageNo: 1, // 当前页
      pageSize: 12, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，
      configuration1: false,
      configuration2: false,
      configuration3: false,
      zhibiao: require('../../../../assets/zhibiao.png'),
      handle1: require('../../../../assets/images/indicatormodel/1.png'),
      handle2: require('../../../../assets/images/indicatormodel/2.png'),
      handle3: require('../../../../assets/images/indicatormodel/3.png'),
      handle4: require('../../../../assets/images/indicatormodel/4.png'),
      filterData: {
        locationFileList: [],
        locationPhotoFirstUpload: true,
        locationpId: '',
        modelTypeName: '',
        modelType: '',
        steppId: '',
        stepPhotoFirstUpload: true
      },
      dicRequest: ['model_type'], // 字典码请求
      dictionary: {
        // 字典码结果
        model_type: ''
      },
      editorModel: {},

      baseUrl: baseURL1.imgUrl,
      dicNum: 0,
      imgOneUrlId: '',
      params: {},
      imModelLibrary: {},
      editorModelFileList: []
    }
  },
  components: {},
  methods: {
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getList()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getList()
    },
    save () {
      let { fileList, ...params } = this.filterData
      this.$get(
        '/epf-index-model/immodellibrary/addImModelLibrary',
        params
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.configuration1 = false

          for (let item in this.filterData) {
            this.filterData[item] = ''
          }
          this.getList()

          this.$message.success(res.msg)
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    editor (item) {
      this.configuration2 = true

      this.$get('/epf-index-model/immodellibrary/getImModelLibrary', {
        id: item.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          switch (res.imModelLibrary.modelType) {
            case 'model_type-001':
              break
              res.imModelLibrary.modelTypeName = '评价模型'
            case 'model_type-002':
              res.imModelLibrary.modelTypeName = '规则模型'
              break
            case 'model_type-003':
              res.imModelLibrary.modelTypeName = '评估模型'
              break
          }
          this.editorModel = res.imModelLibrary

          if (this.editorModel.modelIconFileId) {
            this.editorModel['fileList'] = [
              {
                name: this.editorModel.modelName,
                url: this.baseUrl + this.editorModel.modelIconFileId
              }
            ]
          }
          if (this.editorModel.modelDesignFileId) {
            this.editorModel['fileList2'] = [
              {
                name: this.editorModel.modelName,
                url: this.baseUrl + this.editorModel.modelDesignFileId
              }
            ]
          }
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    editorSave () {
      let { fileList, fileList2, ...params } = this.editorModel

      this.$get(
        '/epf-index-model/immodellibrary/editImModelLibrary',
        params
      ).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.configuration2 = false
          this.getList()
          this.$message.success(res.msg)
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    remove (item) {
      this.$get('/epf-index-model/immodellibrary/deleteImModelLibrary', {
        id: item.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.getList()
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    publish (item) {
      if (item.isRelease == 0) {
        this.$confirm('确认发布吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'
        })
          .then(() => {
            this.$post(
              '/epf-index-model/immodellibrary/releaseImModelLibrary',
              {
                isRelease: 1,
                modelLibraryId: item.id
              }
            ).then(res => {
              console.log(res)
              if (res.code == '0') {
                this.getList()
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg) // 失败
                return
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
      if (item.isRelease == 1) {
        this.$confirm('取消发布吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // type: 'warning'
        })
          .then(() => {
            this.$post(
              '/epf-index-model/immodellibrary/releaseImModelLibrary',
              {
                isRelease: 0,
                modelLibraryId: item.id
              }
            ).then(res => {
              console.log(res)
              if (res.code == '0') {
                this.getList()
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg) // 失败
                return
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
    },
    getList (val) {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize

      this.$get(
        '/epf-index-model/immodellibrary/getImModelLibraryJson',
        params
      ).then(res => {
        if (res.code == '0') {
          this.tableData = res.pager.results
          for (var i = 0; i < this.tableData.length; i++) {
            var url = []
            if (this.tableData[i].modelIconFileId) {
              url = this.baseUrl + this.tableData[i].modelIconFileId
            } else {
              url = require('../../../../assets/zhibiao.png')
            }
            this.tableData[i].modelIconFileImg = url
          }
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
    },
    detail (item) {
      this.configuration3 = true
      this.$get('/epf-index-model/immodellibrary/getImModelLibrary', {
        id: item.id
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          this.imModelLibrary = res.imModelLibrary
          this.imModelLibrary.modelDesignFileImg
            = this.baseUrl + this.imModelLibrary.modelDesignFileId
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    resetFilter () {
      for (let item in this.searchData) {
        this.searchData[item] = ''
      }
      this.params['filterData'] = JSON.stringify(this.searchData)
      this.getList()
    },
    searchList () {
      console.log(this.searchData)
      this.params['filterData'] = JSON.stringify(this.searchData)
      this.getList()
    },
    location_first_photoUploadFile (files) {
      const file = files.file
      const formData = new FormData()

      formData.append('files', file)

      // 第一张图片上传

      this.filterData.locationPhotoFirstUpload = false
      this.photoUploadLocation(formData, files, file)
      return
    },
    photoUploadLocation (formData, files, file, count) {
      // 图片上传方法
      const that = this
      this.$useAppend('/epf-document/document/upload', formData, function (
        event
      ) {
        // 进度条
        file.percent = (event.loaded / event.total) * 100
        files.onProgress(file)
      }).then(res => {
        console.log('这是照片上传的返回', res)
        if (res.state != 'SUCCESS') {
          that.filterData.locationPhotoFirstUpload = true

          return null
        }

        that.filterData.modelIconFileId = res.data[0].id
        files.onSuccess(res)
      })
    },
    location_handlePictureCardPreview (file) {
      this.locationDialogImageUrl = file.url
      this.locationDialogVisible = true
    },
    location_file_List_Remove (file, fileList) {
      const id = file.url.split('?')[1].split('=')[1]
      this.$post('/epf-document/document/deleteById', { id: id }).then(res => {
        if (res.state === 'SUCCESS') {
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    location_beforeAvatarUploadImg (file) {
      // 上传图片格式验证
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt6M = file.size / 1024 / 1024 < 6
      if (!isPNG && !isJPG && !isGIF) {
        this.$message.error('上传土地照片只能是 PNG/jpeg/gif 格式!')
        return false
      }
      if (!isLt6M) {
        this.$message.error('上传土地照片大小不能超过 6MB!')
        return false
      }
    },
    location_first_UploadSuccess (res, file, fileList) {
      console.log('进入成功函数')
    },
    location_upLoadError (err, file, fileList) {
      // 上传失败回调
      this.$message.error('文件上传失败')
    },

    step_first_photoUploadFile (files) {
      const file = files.file
      const formData = new FormData()

      formData.append('files', file)
      if (this.filterData.steppId) {
        console.log('第二张图片上传')
        formData.append('pId', this.filterData.locationpId)
        this.step_photoUploadLocation(formData, files, file)
        return
      }
      if (!this.filterData.steppId && this.filterData.stepPhotoFirstUpload) {
        // 第一张图片上传
        console.log('第一张图片上传')
        this.filterData.stepPhotoFirstUpload = false
        this.step_photoUploadLocation(formData, files, file, 'first')
        return
      }
      if (this.filterData.steppId && !this.filterData.stepPhotoFirstUpload) {
        console.log('之后的图片上传携带id')
        this.step_photoUploadLocation(formData, files, file)
        return
      }
    },
    step_photoUploadLocation (formData, files, file, count) {
      // 图片上传方法
      const that = this
      this.$useAppend('/epf-document/document/upload', formData, function (
        event
      ) {
        // 进度条
        file.percent = (event.loaded / event.total) * 100
        files.onProgress(file)
      }).then(res => {
        console.log('这是照片上传的返回', res)
        if (res.state != 'SUCCESS') {
          if (count == 'first') {
            // 第一张上传出错
            that.filterData.stepPhotoFirstUpload = true
            return null
          }
          return null
        }

        if (!that.filterData.steppId) {
          that.filterData.steppId = res.data[0].pId
          that.filterData.modelDesignFileId = res.data[0].id
        }
        if (that.filterData.steppId && !that.filterData.stepPhotoFirstUpload) {
          that.$refs.photoUploaderTwo.submit()
        }

        files.onSuccess(res)
      })
    },
    step_handlePictureCardPreview (file) {
      this.locationDialogImageUrl = file.url
      this.locationDialogVisible = true
    },
    step_file_List_Remove (file, fileList) {
      // this.$post("/epf-document/document/deleteById", { id: id }).then(res => {
      //   if (res.state === "SUCCESS") {
      //     this.$message.warning(res.msg);
      //     queryFiles(this.parentId);
      //   } else {
      //     this.$message.warning(res.msg);
      //   }
      // });
    },
    step_beforeAvatarUploadImg (file) {
      // 上传图片格式验证
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt6M = file.size / 1024 / 1024 < 6
      if (!isPNG && !isJPG && !isGIF) {
        this.$message.error('上传土地照片只能是 PNG/jpeg/gif 格式!')
        return false
      }
      if (!isLt6M) {
        this.$message.error('上传土地照片大小不能超过 6MB!')
        return false
      }
    },
    step_first_UploadSuccess (res, file, fileList) {
      console.log('进入成功函数')
    },
    step_upLoadError (err, file, fileList) {
      // 上传失败回调
      this.$message.error('文件上传失败')
    },

    editor_first_photoUploadFile (files) {
      const file = files.file
      const formData = new FormData()

      formData.append('files', file)
      this.editor_photoUploadLocation(formData, files, file, 'first')
      return
    },
    editor_photoUploadLocation (formData, files, file, count) {
      // 图片上传方法
      const that = this
      this.$useAppend('/epf-document/document/upload', formData, function (
        event
      ) {
        // 进度条
        file.percent = (event.loaded / event.total) * 100
        files.onProgress(file)
      }).then(res => {
        console.log('这是照片上传的返回', res)
        if (res.state != 'SUCCESS') {
          return null
        }

        this.$set(this.editorModel, 'modelIconFileId', res.data[0].id)

        files.onSuccess(res)
      })
    },
    editor_handlePictureCardPreview (file) {
      this.locationDialogImageUrl = file.url
      this.locationDialogVisible = true
    },
    editor_file_List_Remove (file, fileList) {
      const id = file.url.split('?')[1].split('=')[1]
      this.$post('/epf-document/document/deleteById', { id: id }).then(res => {
        if (res.state === 'SUCCESS') {
          this.$set(this.editorModel, 'modelIconFileId', '')
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    editor_beforeAvatarUploadImg (file) {
      // 上传图片格式验证
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt6M = file.size / 1024 / 1024 < 6
      if (!isPNG && !isJPG && !isGIF) {
        this.$message.error('上传土地照片只能是 PNG/jpeg/gif 格式!')
        return false
      }
      if (!isLt6M) {
        this.$message.error('上传土地照片大小不能超过 6MB!')
        return false
      }
    },
    editor_first_UploadSuccess (res, file, fileList) {
      console.log('进入成功函数')
    },
    editor_upLoadError (err, file, fileList) {
      // 上传失败回调
      this.$message.error('文件上传失败')
    },

    editor2_first_photoUploadFile (files) {
      const file = files.file
      const formData = new FormData()

      formData.append('files', file)
      this.editor2_photoUploadLocation(formData, files, file, 'first')
      return
    },
    editor2_photoUploadLocation (formData, files, file, count) {
      // 图片上传方法
      const that = this
      this.$useAppend('/epf-document/document/upload', formData, function (
        event
      ) {
        // 进度条
        file.percent = (event.loaded / event.total) * 100
        files.onProgress(file)
      }).then(res => {
        console.log('这是照片上传的返回', res)
        if (res.state != 'SUCCESS') {
          return null
        }

        this.$set(this.editorModel, 'modelDesignFileId', res.data[0].id)

        files.onSuccess(res)
      })
    },
    editor2_file_List_Remove (file, fileList) {
      const id = file.url.split('?')[1].split('=')[1]
      this.$post('/epf-document/document/deleteById', { id: id }).then(res => {
        if (res.state === 'SUCCESS') {
          this.$set(this.editorModel, 'modelDesignFileId', '')
        } else {
          this.$message.warning(res.msg)
        }
      })
    },

    modelTypeSelect (dic, modelTypeName, event) {
      this.filterData.modelType = this.$refs[modelTypeName][0].$attrs.dictKey
    },
    modelTypeSelect2 (dic, modelTypeName, event) {
      this.editorModel.modelType = this.$refs[modelTypeName][0].$attrs.dictKey
    },
    modelTypeSelect3 (dic, modelTypeName, event) {
      this.searchData.modelType = this.$refs[modelTypeName][0].$attrs.dictKey
    }
  },
  created () {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == 'administrative_regions') {
          this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
            parentId: 0
          }).then(res => {
            resolve(res)
          })
        } else {
          this.$get(
            `/epf-admin/admin/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            resolve(res)
          })
        }
      })
      return reqFun
    })
    Promise.all(reqArr).then(res => {
      console.log(res)
      let dicArr = res.map(item => {
        console.log(item)
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          }
        })
        return dicArr
      })
      console.log(dicArr)
      for (let item in this.dictionary) {
        console.log(this.dicNum)
        this.dictionary[item] = dicArr[this.dicNum]
        console.log(dicArr[this.dicNum])
        this.dicNum++
      }

      console.log('字典结果', this.dictionary)
    })

    this.getList()
  }
}
</script>

<style scoped>
#modelbase {
  padding: 16px;
}
.my-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}
.companyInfoBox {
  padding: 30px 30px;
  max-height: 600px;
  overflow-y: auto;
}
.last-tr {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-tr div {
  display: flex;
  align-items: center;
}
.last-tr div img {
  margin-right: 8px;
}
.filter_title {
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
.filter_wrap {
  box-sizing: border-box;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  padding: 15px;
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
  border-bottom: 1px solid rgba(151, 151, 151, 1);
  text-align: left;
  line-height: 56px;
  background: #deeeff;
  padding-left: 20px;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 13px;
  float: left;
}
.left {
  text-align: left;
}
.currentDiv {
  float: right;
  text-align: right;
  width: 40%;
}
.currentDiv > div {
  display: inline-block;
  margin-right: 5px;
}

.switchHeight_box {
  padding: 20px;

  line-height: 45px;
  color: rgba(89, 89, 89, 1);
}
.dictionary span {
  margin-right: 25px;
  cursor: pointer;
}

.dictionary span.all {
  color: rgba(245, 154, 35, 1);
}
.dictionary .el-col {
  font-size: 15px;
  text-align: center;
}
.baseTable {
  border-radius: 2px;
  padding: 16px 7px;
}
.baseTable .el-col {
  margin: 15px 0;

  color: rgba(67, 67, 67, 1);
}
.baseTable .el-col > div {
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.16);
}

.baseTable .baseTableTitle {
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.baseTable .baseTableContent {
  color: rgba(151, 151, 151, 1);
  font-size: 16px;
  height: 85px;
  margin-top: 10px;
}

#modelbase .el-scrollbar {
  height: 100%;
}
#modelbase .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: auto;
}

.baseTable .el-avatar {
  background-color: #fff;
}

.modelHandle {
  cursor: pointer;
}

.handelDialog {
  width: 45%;
  background-color: #fff;
  padding-bottom: 25px;
}
.dialogHeader {
  height: 44px;
  border-radius: 2px 2px 0px 0px;
  line-height: 44px;
  padding: 0 20px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
}
.dialogBody {
  padding: 10px;
}
.dialogFooter {
  text-align: center;
  margin-top: 15px;
}
</style>
<style>
#modelbase .el-dialog__header {
  height: 44px;
  border-radius: 2px 2px 0px 0px;
  line-height: 44px;
  padding: 0 20px;
  background-image: linear-gradient(to right, #1b80e4 0%, #0e9fe1 50%);
}

#modelbase .el-dialog__body {
  padding: 10px;
}

#modelbase .pictureAndTree .myRow {
  margin-top: 10px;
}

#modelbase .el-form-item__label {
  font-size: 16px;
  color: rgba(48, 48, 48, 1);
}
</style>
