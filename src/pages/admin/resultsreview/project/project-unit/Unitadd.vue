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
                   :rules="elFormRules"
                   label-width="200px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位名称："
                              prop="companyName">
                  <el-input v-model="projectForm.companyName"
                            placeholder="请输入单位名称"
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="城乡规划资质等级："
                              prop="planningLevel">
                  <el-select v-model="projectForm.planningLevel"
                             placeholder="请选择城乡规划资质等级"
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
                            placeholder="请输入证书编号"
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发证机关："
                              prop="issuingAuthority">
                  <el-input v-model="projectForm.issuingAuthority"
                            placeholder="请输入发证机关"
                            style="width:80%;"
                            :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="发证日期："
                              placeholder="请选择发证日期"
                              prop="issueDate">
                  <el-date-picker v-model="projectForm.issueDate"
                                  type="date"
                                  placeholder="选择日期"
                                  style="width:80%;"
                                  value-format="yyyy-MM-dd"
                                  :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证书有效期："
                              placeholder="请选择证书有效期："
                              prop="expiraDate">
                  <el-date-picker v-model="projectForm.expiraDate"
                                  type="date"
                                  placeholder="选择日期"
                                  value-format="yyyy-MM-dd"
                                  style="width:80%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="推荐名录等级："
                              prop="directoryLevel">
                  <el-select v-model="projectForm.directoryLevel"
                             placeholder="请选择推荐名录等级"
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
                             placeholder="请选择等级"
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
                             placeholder="请选择专业资质">
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
                             placeholder="请选择单位性质"
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
                            placeholder="请输入总人数"
                            style="width:80%;"
                            @input="getInputData"
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
                            placeholder="请输入注册城乡规划师总数"
                            style="width:80%;"
                            @input="getInputData"
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
                             placeholder="请选择经营状态"
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
                            placeholder="请输入法定代表人姓名"
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
                                  placeholder="选择成立日期"
                                  style="width:80%;"
                                  value-format="yyyy-MM-dd"
                                  :picker-options="pickerOptions"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="注册地址："
                              prop="registerAddress">
                  <el-input v-model="projectForm.registerAddress"
                            placeholder="请输入注册地址"
                            style="width:80%;"
                            :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="注册资金："
                              prop="registerCapital">
                  <el-input v-model="projectForm.registerCapital"
                            placeholder="请输入注册资金"
                            style="width:80%;"
                            @input="getInputData"
                            :maxlength="20">
                    <!-- <i slot="suffix"
                       class="itext">万元</i> -->
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="经营范围："
                            prop="businessScope">
                <el-input type="textarea"
                          :maxlength="300"
                          :minlength="0"
                          @input="businessScopeInput"
                          :autosize="{ minRows: 3, maxRows: 3}"
                          v-model="projectForm.businessScope"
                          placeholder="请输入经营范围"
                          style="width:90%;height:76px;"></el-input>
                <span class="numberV"
                      style="color:#999;">{{txtDescNum.businessScope}}/300</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="成功项目案例："
                            prop="projectCase">
                <el-input type="textarea"
                          :maxlength="300"
                          :minlength="0"
                          @input="projectCaseInput"
                          :autosize="{ minRows: 3, maxRows: 3}"
                          v-model="projectForm.projectCase"
                          placeholder="请输入成功案例"
                          style="width:90%;height:76px;"></el-input>
                <span class="numberV"
                      style="color:#999;">{{txtDescNum.projectCase}}/300</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="工商执照或资质证明：">
                <el-upload action="#"
                           ref="upload"
                           list-type="picture-card"
                           :http-request="annexUpload">
                  <i slot="default"
                     class="el-icon-plus"></i>
                  <div slot="file"
                       slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail"
                         :src="file.url">
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-delete"
                            @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-form-item>
            </el-row>
          </el-form>
          <div class="operfirst">

            <span class="button_qian"
                  @click="cancelClick()">取消</span>
            <span class="button_shen"
                  @click="submitForm('projectForm')">保存</span>

          </div>

        </div>
      </div>
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Bus from '../../../../../utils/bus'
import { mapActions } from 'vuex'
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
      uploadSuccessArr: [], // 文件上传成功 返回的数组
      txtDescNum: {
        businessScope: 0,
        projectCase: 0
      },

      mappinglevelArr: [], // 测绘资质等级
      mappingQualificaArr: [], // 测绘资质专业资质
      params: {
        id: ''
      },

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
      dicNum: 0, // 字典循环下标
      elFormRules: {
        companyName: [{ required: true, message: '单位名称不能为空', trigger: 'blur' }],
        planningLevel: [{ required: true, message: '城乡规划资质等级不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
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
          let res = await axios({
            url: '/api/epf-result-review/preparatUnit/save',
            method: 'POST',
            data: params,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          if (res.code == 0) {
            this.$message.success('添加编制单位成功') // 成功
            this.cancelClick()
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
      this.projectForm.mappingQualificaId = ''
    },
    cancelClick () {
      this.resetForm('projectForm')

      let title = '编制单位管理'
      let routerPath = 'UnitManage'
      this.$bus.$emit('closeTabsItem', this.$route.name)
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
      // Bus.$emit('unitMsg', 1)
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
    handleRemove (file) {
      // console.log(file)
      // console.log(this.$refs.upload.uploadFiles)
      // console.log(this.$refs.upload)
      // this.$refs.upload.handleRemove(file)

      let fileList = this.$refs.upload.uploadFiles
      let index = fileList.findIndex(fileItem => {
        return fileItem.uid === file.uid
      })
      console.log(index)
      const id = this.uploadSuccessArr[index]['id']
      console.log(this.uploadSuccessArr)
      this.$post('/epf-result-review/preparatUnitFile/deleteById', { id: id }).then(
        res => {
          if (res.code === 0) {
            fileList.splice(index, 1)
            this.uploadSuccessArr.splice(index, 1)
            this.$message.success('删除成功!')
          } else {
            this.$message.error(res.msg)
          }
        }
      )
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
            fileSize: obj.docSize,
            id: obj.id
          })
          console.log(this.uploadSuccessArr)
        }
      })
    },
    getInputData () {
      this.projectForm.registerCapital = this.projectForm.registerCapital.replace(/[^0-9\u4E00-\u9FA5.]/g, '')
      this.projectForm.totalPeople = this.projectForm.totalPeople.replace(/[^\d]/g, '')
      this.projectForm.totalPlanner = this.projectForm.totalPlanner.replace(/[^\d]/g, '')
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
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.operfirst {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
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
