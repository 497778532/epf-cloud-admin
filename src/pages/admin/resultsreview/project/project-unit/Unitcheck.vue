<template>
  <div id="proAdd"
       class="page-body">
    <div style="height:100%;">
      <!-- <el-scrollbar style="height:100%;"> -->
      <div class="filter_wrap">

        <div>
          <el-form :model="projectForm"
                   ref="projectForm"
                   id="el_form_unit_add"
                   label-width="200px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位名称："
                              prop="companyName">
                  <el-input v-model="projectForm.companyName"
                            disabled
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="城乡规划资质等级："
                              prop="planningLevel">
                  <el-select v-model="projectForm.planningLevel"
                             disabled
                             style="width:80%;">
                    <el-option v-for="(item, index) in dictionary.planning_qualification_level"
                               :label="item.zhCn"
                               :value="item.dictKey"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证书编号："
                              prop="certificateNo">
                  <el-input v-model="projectForm.certificateNo"
                            disabled
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发证机关："
                              prop="issuingAuthority">
                  <el-input v-model="projectForm.issuingAuthority"
                            disabled
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="发证日期："
                              prop="issueDate">
                  <el-date-picker v-model="projectForm.issueDate"
                                  type="date"
                                  style="width:80%;"
                                  disabled
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证书有效期："
                              prop="expiraDate">
                  <el-date-picker v-model="projectForm.expiraDate"
                                  type="date"
                                  disabled
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  style="width:80%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="推荐名录等级："
                              prop="directoryLevel">
                  <el-select v-model="projectForm.directoryLevel"
                             disabled
                             style="width:80%;">
                    <el-option v-for="(item,index) in dictionary.recommended_directory_level"
                               :label="item.zhCn"
                               :value="item.dictKey"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="测绘资质等级："
                              prop="mappingLevelId">
                  <el-select v-model="projectForm.mappingLevelId"
                             class="select-line"
                             disabled
                             style="width:30%;"
                             @change="mappinglevelChange(projectForm.mappingLevelId, $event)">
                    <el-option v-for="(item,index) in mappinglevelArr"
                               :label="item.name"
                               :value="item.id"
                               :key="index"></el-option>
                  </el-select>
                  <el-select v-model="projectForm.mappingQualificaId"
                             class="select-line"
                             style="width:50%;"
                             disabled>
                    <el-option v-for="(item,index) in mappingQualificaArr"
                               :label="item.name"
                               :value="item.id"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位性质："
                              prop="unitNature">
                  <el-select v-model="projectForm.unitNature"
                             disabled
                             style="width:80%;">
                    <el-option v-for="(item,index) in dictionary.unit_nature"
                               :label="item.zhCn"
                               :value="item.dictKey"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位总人数："
                              prop="totalPeople">
                  <el-input v-model="projectForm.totalPeople"
                            disabled
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
                <el-form-item label="注册城乡规划师总数："
                              prop="totalPlanner">
                  <el-input v-model="projectForm.totalPlanner"
                            disabled
                            style="width:80%;"
                            :maxlength="10">
                    <i slot="suffix"
                       class="itext">人</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经营状态："
                              prop="xx">
                  <el-select v-model="projectForm.operatStatus"
                             disabled
                             style="width:80%;">
                    <el-option v-for="(item,index) in dictionary.operating_status"
                               :label="item.zhCn"
                               :value="item.dictKey"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="法定代表人姓名："
                              prop="legalRepresentative">
                  <el-input v-model="projectForm.legalRepresentative"
                            disabled
                            style="width:80%;"
                            :maxlength="20">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="成立日期："
                              prop="establishmentDate">
                  <el-date-picker v-model="projectForm.establishmentDate"
                                  type="date"
                                  disabled
                                  style="width:80%;"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册地址："
                              prop="registerAddress">
                  <el-input v-model="projectForm.registerAddress"
                            disabled
                            style="width:80%;"
                            :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册资金："
                              prop="xx">
                  <el-input v-model="projectForm.registerCapital"
                            disabled
                            style="width:80%;"
                            :maxlength="10">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="经营范围：">
                <el-input type="textarea"
                          disabled
                          :maxlength="300"
                          :minlength="0"
                          @input="businessScopeInput"
                          :autosize="{ minRows: 3, maxRows: 3}"
                          v-model="projectForm.businessScope"
                          style="width:90%;height:76px;"></el-input>
                <span class="numberV"
                      style="color:#999;">{{txtDescNum.businessScope}}/300</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="成功项目案例：">
                <el-input type="textarea"
                          disabled
                          :maxlength="300"
                          :minlength="0"
                          @input="projectCaseInput"
                          :autosize="{ minRows: 3, maxRows: 3}"
                          v-model="projectForm.projectCase"
                          style="width:90%;height:76px;"></el-input>
                <span class="numberV"
                      style="color:#999;">{{txtDescNum.projectCase}}/300</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="工商执照或资质证明：">
                <el-upload action="#"
                           title="当前只能查看"
                           ref="upload"
                           disabled
                           list-type="picture-card"
                           :file-list="filesList"
                           :http-request="annexUpload">
                  <i slot="default"
                     class="el-icon-plus"></i>
                  <div slot="file"
                       slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail"
                         :src="file.url"
                         alt="">
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%"
                       :src="dialogImageUrl"
                       alt="">
                </el-dialog>
              </el-form-item>
            </el-row>
          </el-form>
          <!-- <div class="operfirst">
            <el-row>
              <el-col :offset="10" :span="12">
                <span class="button_default" @click="resetForm('projectForm')">取消</span>
                <span class="button_bg" @click="submitForm('projectForm')">保存</span>
              </el-col>
            </el-row>
          </div> -->

        </div>
      </div>
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'unitadd',
  data () {
    return {
      projectForm: {
        companyName: '', // 单位名称
        planningLevel: '', // 城乡规划资质等级(字典)
        certificateNo: '', // 证书编号
        issuingAuthority: '', // 发证机关
        issueDate: '', // 发证日期(yyyy-MM-dd HH:mm:ss)
        expiraDate: '', // 有效期(yyyy-MM-dd HH:mm:ss)
        directoryLevel: '', // 推荐名录等级(字典)
        mappingLevelId: '', // 测绘资质编号
        mappingQualificaId: '', // 测绘资质(测绘资质编号)
        unitNature: '', // 单位性质(字典)
        totalPeople: '', // 总人数
        totalPlanner: '', // 注册城乡规划师总数
        operatStatus: '', // 经营状态(字典)
        legalRepresentative: '', // 法定代表人
        establishmentDate: '', // 成立日期(yyyy-MM-dd HH:mm:ss)
        registerAddress: '', // 注册地址
        registerCapital: '', // 注册资本
        businessScope: '', // 经验范围
        projectCase: '' // 成功项目案例

      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadSuccessArr: [],
      txtDescNum: {
        businessScope: 0,
        projectCase: 0
      },

      mappinglevelArr: [], // 测绘资质等级
      mappingQualificaArr: [], // 测绘资质专业资质
      params: {
        id: ''
      },
      filesList: [], // 回显文件

      // 日期选择器选项
      pickerOptions: {
        disabledDate (time) {
          // return time.getTime() > Date.now()
        }
      },

      dicRequest: ['planning_qualification_level', 'recommended_directory_level', 'unit_nature', 'operating_status'], // 字典码请求
      dictionary: {
        // 字典码结果
        planning_qualification_level: '',
        recommended_directory_level: '',
        unit_nature: '',
        operating_status: ''
      },
      dicNum: 0 // 字典循环下标
    }
  },
  methods: {
    // 文本域字数回显 经验范围
    businessScopeInput () {
      this.txtDescNum.businessScope = this.projectForm.businessScope.length
    },
    // 文本域字数回显 成功项目案例
    projectCaseInput () {
      this.txtDescNum.projectCase = this.projectForm.projectCase.length
    },
    // 保存表单 按钮
    submitForm (val) {
      this.$refs[val].validate(async valid => {
        if (valid) {
          let params = this.projectForm
          params.revPreparatUnitFileEntityList = this.uploadSuccessArr

          console.log(params)

          let res = await axios({
            url: '/api/epf-result-review/preparatUnit/save',
            method: 'POST',
            data: params,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })

          // let res = await this.$post(
          //   '/epf-result-review/preparatUnit/save',
          //   params
          // )
          if (res.code == 0) {
            alert('success')
            // this.projectForm.id = res.projectId
            // this.$message.success("添加成功"); //成功
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        } else {
          document.querySelector('#proAdd').scrollIntoView(true)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
    // 获取 测绘等级
    getMappinglevel () {
      this.$get('/epf-result-review/mappinglevel/findList').then(res => {
        if (res.code === 0) this.mappinglevelArr = res.result
      })
    },
    mappinglevelChange (val) {
      this.$get('/epf-result-review/mappingQualifica/findByLevel', { mappingLevelId: val }).then(res => {
        if (res.code === 0) this.mappingQualificaArr = res.result
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    annexUpload (files) {
      // 附件上传
      let formData = new FormData()
      formData.append('files', files.file)
      this.$useAppend('/epf-document/document/upload', formData).then(res => {
        if (res.state == 'SUCCESS') {
          this.$message.success('上传成功!')
          const obj = res.data[0]
          this.uploadSuccessArr.push({
            documentId: obj.id,
            documentName: obj.name,
            extensionName: obj.extName,
            fileSize: obj.docSize
          })
        }
      })
    },
    // 根据项目id回显数据
    async getMessage (id) {
      let res = await this.$get(
        '/epf-result-review/preparatUnit/getById',
        { id: id }
      )
      if (res.code === 0) {
        this.projectForm = res.result
        this.projectForm.id = id
        this.mappinglevelChange(res.result.mappingLevelId)
      }
    },
    // 根据项目id回显数据
    async getFiles (id) {
      let res = await this.$get(
        '/epf-result-review/preparatUnitFile/findByUnit',
        { preparatUnitId: id }
      )
      if (res.code === 0) {
        // this.filesList = res.result
        const resultArr = res.result
        for (let i = 0; i < resultArr.length; i++) {
          const obj = resultArr[i]
          this.filesList.push({
            name: obj.documentName,
            url: '/api/epf-document/document/downloadById?id=' + obj.documentId
          })
        }
      }
    }
  },
  created () {
    this.getMappinglevel()
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
    let id = this.$route.query.id
    if (id) {
      this.getMessage(id)
      this.getFiles(id)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.select-line {
  display: inline-block;
}
.page-body {
  height: auto;
  padding: 16px 24px;
}
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  min-height: 789px;
  box-sizing: border-box;
  padding: 24px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
</style>
<style>
#proAdd .el-form-item__label {
  font-size: 16px;
  color: #595959;
}
</style>
