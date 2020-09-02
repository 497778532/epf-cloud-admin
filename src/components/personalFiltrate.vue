<template>
  <div class="filter_wrap">
    <div class="switchHeight_box">
      <el-row :gutter="2">
        <el-col :span="2">
          <span class="filter_title">信息标题 :</span>
        </el-col>
        <el-col :span="6"
                class="itemBox">
          <el-input v-model="filterData.title"
                    size="small"
                    style="float:left"
                    placeholder="请输入标题"
                    :maxlength="50"></el-input>
        </el-col>

        <el-col :span="2">
          <span class="filter_title">信息发布编号 :</span>
        </el-col>
        <el-col :span="6"
                class="itemBox">
          <el-input v-model="filterData.publishNo"
                    size="small"
                    placeholder="请输入信息发布编号"
                    :maxlength="50"></el-input>
        </el-col>

        <el-col :span="2">
          <span class="filter_title">状态 :</span>
        </el-col>
        <el-col :span="4"
                class="itemBox">
          <el-select size="small"
                     class="filterCirculatemode"
                     v-model="filterData.publishStatusName"
                     placeholder="请选择状态"
                     @change="publishStatusSelect(dictionary.purchasr_status,filterData.publishStatusName,$event)">
            <el-option v-for="(item,index) in dictionary.purchasr_status"
                       :ref="item.zhCn"
                       :id="item.id"
                       :dictKey="item.dictKey"
                       :label="item.zhCn"
                       :value="item.zhCn"
                       :key="index">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="2">
        <el-col :span="2">
          <span class="filter_title">申请时间 :</span>
        </el-col>
        <el-col :span="6"
                class="itemBox">
          <el-date-picker v-model="useDate"
                          type="daterange"
                          unlink-panels
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="起始日期"
                          end-placeholder="截止日期"
                          size="small"
                          @change="selectDatarange"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>

        <el-col :span="2">
          <span class="filter_title">行政区域 :</span>
        </el-col>
        <el-col v-if="!closeSelect"
                :span="10"
                class="itemBox">
          <div style="width:155px;float:left;margin-right:9px;">
            <el-select v-model="filterData.cantonProvinceName"
                       size="small"
                       placeholder="所属省"
                       @change="provinceSelect(dictionary.administrative_regions,filterData.cantonProvinceName,$event)">
              <el-option v-for="(item,index) in dictionary.administrative_regions"
                         :ref="item.zhCn"
                         :id="item.id"
                         :dictKey="item.dictKey"
                         :label="item.zhCn"
                         :value="item.zhCn"
                         :key="index"></el-option>
            </el-select>
          </div>
          <div style="width:155px;float:left;margin-right:9px;">
            <el-select v-model="filterData.cantonCityName"
                       size="small"
                       placeholder="所属市"
                       @change="citySelect(dictionary.cantonCity,filterData.cantonCityName,$event)">
              <el-option v-for="(item,index) in dictionary.cantonCity"
                         :ref="item.zhCn"
                         :id="item.id"
                         :dictKey="item.dictKey"
                         :label="item.zhCn"
                         :value="item.zhCn"
                         :key="index"></el-option>
            </el-select>
          </div>
          <div style="width:155px;float:left;">
            <el-select v-model="filterData.cantonAreaName"
                       size="small"
                       placeholder="所属区/县"
                       @change="areaSelect(dictionary.cantonAreaName,filterData.cantonAreaName,$event)">
              <el-option v-for="(item,index) in dictionary.cantonArea"
                         :ref="item.zhCn"
                         :id="item.id"
                         :dictKey="item.dictKey"
                         :label="item.zhCn"
                         :value="item.zhCn"
                         :key="index"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="primary"
               style="margin-left:20px;"
               @click="findInfo">查询</div>
        </el-col>
        <el-col :span="2">
          <div class="primary"
               @click="resetFilter">重置</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeSelectPlace: {
      type: Boolean
    },
    typeClose: {
      type: Boolean
    }
  },
  data () {
    return {
      closeSelect: this.closeSelectPlace,
      filter: [
        {
          inputType: 'input',
          title: '信息标题',
          titleSpan: 2,
          inputSpan: 12
        },
        {
          inputType: 'select',
          title: '流转方式',
          titleSpan: 3,
          inputSpan: 5,
          option: [
            {
              title: '全部'
            },
            {
              title: '转让'
            },
            {
              title: '出租'
            },
            {
              title: '抵押'
            }
          ]
        },
        {
          inputType: 'region'
        },
        {
          inputType: 'select',
          title: '状态',
          titleSpan: 3,
          spanSpan: 5
        }
      ],
      filterData: {
        title: '',
        circulation: '',
        publishStatus: '',
        publishStatusName: '',
        publishNo: '',
        type: '',
        cantonProvinceName: '',
        cantonProvince: '',
        cantonCityName: '',
        cantonCity: '',
        cantonAreaName: '',
        cantonArea: '',
        issueBeginDate: '',
        issueEndDate: ''
      },
      isShowProvince: true,
      temp: {
        address__province: '',
        address__city: '',
        address__dist: ''
      },
      useDate: '',
      pickerOptions: {// 日期范围快速选择配置
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 60)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // flexibleSwitch:'展开',
      // flexibleSwitchIcon:'el-icon-caret-bottom',
      switchHeight: 49,
      flexibleOpen: false,
      dicRequest: ['purchasr_status', 'administrative_regions', 'purchasr_demand'], // 字典码请求
      dictionary: {// 字典码结果
        purchasr_status: '',
        administrative_regions: '',
        purchasr_demand: '',
        cantonCity: '',
        cantonArea: ''
      },
      dicNum: 0
    }
  },
  created () {
    // 请求字典
    // let reqArr = this.dicRequest.map((item,index,arr)=>{
    //       let reqFun = new Promise((resolve,reject)=>{
    //           if(item == 'land_use'){
    //               this.$get(`/epf-supply/dictionaries/getDictsByCodeOrParentId?code=${item}`,{parentId:0}).then(res => {
    //                   resolve(res);
    //               }).catch(error=>{})
    //           }else if(item == 'administrative_regions'){
    //               this.$get(`/epf-admin/regionals/getAreaByCodeOrParentId?parentId=0`,{}).then(res => {
    //                     resolve(res);
    //                 }).catch(error=>{})

    //           }else{
    //           this.$get(`/epf-supply/dictionaries/getDictEbyDictGroup/${item}`,{}).then(res => {
    //               resolve(res);
    //           }).catch(error=>{})
    //         }
    //       })
    //       return reqFun
    //   })
    //   Promise.all(reqArr).then(res=>{
    //       console.log(res);
    //       let dicArr = res.map((item =>{
    //           console.log(item);
    //           let dicArr = item.dictionariesList.map((item => {
    //               return {
    //                   dictKey:item.dictKey,
    //                   zhCn:item.zhCn,
    //                   id:item.id
    //               }
    //           }))
    //           return dicArr
    //       }));

    //       for(let item in this.dictionary){
    //           console.log(dicArr[this.dicNum]);
    //           this.dictionary[item] = dicArr[this.dicNum];
    //           this.dicNum++;
    //       }

    //       this.dicFinsh = true;
    //       console.log('字典结果',this.dictionary);
    //   });
  },
  methods: {
    flexSwitch () {
      this.flexibleOpen = !this.flexibleOpen
      this.switchHeight = this.flexibleOpen ? 147 : 49
    },
    provinceSelect (dic, cantonCode, event) {
      this.filterData.cantonAreaName = ''
      this.filterData.cantonArea = ''
      this.cantonArea = ''
      this.filterData.cantonCityName = ''
      this.filterData.cantonCity = ''
      this.cantonCity = ''
      let pId = this.$refs[cantonCode][0].$attrs.id
      this.filterData.cantonProvince = this.$refs[cantonCode][0].$attrs.dictKey

      this.$get(`/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`, {}).then(res => {
        // console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList
          return
        }
        this.dictionary.cantonCity = ''
      }).catch(error => { })
    },
    citySelect (dic, cantonCity, event) {
      this.filterData.cantonArea = ''
      this.filterData.cantonAreaName = ''
      this.cantonArea = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
      this.filterData.cantonCity = this.$refs[cantonCity][0].$attrs.dictKey
      this.$get(`/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`, {}).then(res => {
        // console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList
          return
        }
        this.dictionary.cantonArea = ''
      }).catch(error => { })
    },
    areaSelect (dic, cantonCity, event) {
      this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.dictKey
    },
    publishStatusSelect (dic, publishStatusName, event) {
      this.filterData.publishStatus = this.$refs[publishStatusName][0].$attrs.dictKey
    },
    selectDatarange () { // 选择日期范围后的回调
      this.filterData.issueBeginDate = this.useDate[0]
      this.filterData.issueEndDate = this.useDate[1]
    },
    findInfo () {
      this.$emit('filterInfo', this.filterData)
      // console.log(this.filterData)
    },
    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.useDate = []
      this.$emit('filterInfo', this.filterData)
    }
  }
}
</script>

<style scoped>
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
.switchHeight_box {
  padding: 20px 0 10px 0px;
  margin: 0px 0 20px 0px;
  transition: 0.5s;
  background: #fff;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  height: 34px;
  width: 100%;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
}
.monad {
  display: block;
  width: 48px;
  position: absolute;
  top: 7px;
  left: 5px;
}
.primary {
  width: 70px;
  height: 34px;
  background-color: #ffa202;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 36px;
  display: inline-block;
  cursor: pointer;
}
.flexibleSwitch {
  display: block;
  float: right;
  color: #4472d5;
  cursor: pointer;
}
</style>
<style>
.filter_wrap .el-row {
  margin-bottom: 10px;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}
.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.el-date-editor.dataIconStyle > .el-input__prefix {
  width: 25px;
  left: 80%;
}
/* .filter_wrap .el-input--small .el-input__inner{
    height:34px;
  }
  .filter_wrap .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  } */
</style>
