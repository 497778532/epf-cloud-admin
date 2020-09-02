<template>

  <div v-drag
       class="selcetDialog2">
    <el-row type="flex"
            class="drag-title"
            align="middle">
      <span class="table-header__title">问题发现</span>

      <i class="el-icon-circle-close"
         @click="close"
         style="font-size:26px;margin-left:auto"></i>

    </el-row>
    <div class="table-content">

      <el-row>
        <el-col :span="6">
          <span>项目名称</span>
        </el-col>
        <el-col :span="18">
          <span>河源市紫金县XX乡XX村第二批拆旧复垦项目</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span>地块位置</span>
        </el-col>
        <el-col :span="18">
          <span>133.224.23.445</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <span>现状用途</span>
        </el-col>
        <el-col :span="18">
          <span>耕地</span>
        </el-col>

      </el-row>

      <el-row>

        <el-col :span="6">
          <span>规划用途</span>
        </el-col>
        <el-col :span="18">
          <span>耕地</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span>现状用途</span>
        </el-col>
        <el-col :span="18">
          <div>

            <el-input type="textarea"
                      :rows="2"
                      :maxlength="200"
                      placeholder="请输入内容"
                      v-model="textarea">
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span>附件材料</span>
        </el-col>
        <el-col :span="18">
          <el-upload class="upload-demo"
                     action="/api/epf-document/document/upload"
                     :before-upload="beforeUpload"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :before-remove="beforeRemove2"
                     :headers="myHeaders"
                     multiple
                     name="files"
                     :limit="5"
                     :file-list="fileList"
                     :on-success="success">
            <div class="EPFLightBlue EPFButton">上传文件</div>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-checkbox-group v-model="checkedCities"
                           @change="handleCheckedCitiesChange">
          <el-checkbox v-for="item in check"
                       :label="city"
                       :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </el-row>

    </div>
    <el-row type="flex"
            style="margin:16px 0"
            justify="space-around">
      <div class="EPFButton EPFwirte"
           @click="close">
        取消
      </div>
      <div class="EPFButton EPFBlue"
           @click="submit">
        提交
      </div>
    </el-row>
  </div>

</template>

<script>
export default {
  props: {},
  data () {
    return {
      fileList: [],
      checkedCities: [],
      check: ['纳入动态监测目标清单', '推送至外业巡查'],
      textarea: '',
      show3: true,
      checkedAnalystService: [],
      myHeaders: {
        token: sessionStorage.getItem('token')
      },
      filterData: {
        cantonAreaName: '',
        cantonArea: '',
        cantonAreaName: '',
        cantonProvinceName: '',
        cantonProvince: '',
        cantonCity: '',
        cantonCityName: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    open () {
      this.$emit('open')
    },
    beforeUpload () {

    },
    success () {

    },
    handlePreview () {

    }
  },
  created () { }
}
</script>

<style scoped>
.selcetDialog2 {
  position: fixed;
  left: 40%;
  height: auto !important;
  top: 200px;
  width: 456px;

  z-index: 1002;
  background: #fff;
  padding: 16px;

  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  border: 1px solid rgba(213, 213, 213, 1);
}
.table-header__title {
  font-size: 18px;

  color: rgba(89, 89, 89, 1);
  font-weight: 700;
}

.table-content {
  background: rgba(248, 248, 248, 1);
  padding: 20px 8px 8px 8px;

  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
  position: relative;
  margin-top: 10px;
}
.table-content .el-row {
  margin-top: 10px;
}

.table-content .el-row .el-col-6 span {
  color: rgba(64, 64, 64, 1);
}
.table-content .el-row .el-col-18 span {
  color: rgba(140, 140, 140, 1);
}
</style>
