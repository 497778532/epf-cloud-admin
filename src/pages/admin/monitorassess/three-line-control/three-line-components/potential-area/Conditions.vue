<template>
  <div class="condition">
    <el-row class="font-header"
            :class="{'active':!show3}">
      <span class="font-big">补划潜力区</span>
      <span class="font-small">(重大项目占用基本农田补划潜力区)</span>
      <span>
        <i @click="show3=!show3"
           :class="show3?'el-icon-arrow-down':'el-icon-arrow-up'"
           class="icon"></i>
        <i class="el-icon-circle-close"
           @click="myClose()"></i>
      </span>
    </el-row>
    <el-collapse-transition style="height:90%">
      <el-scrollbar style="height:90%"
                    v-show="show3">
        <el-row class="selectHeader">基础分析数据</el-row>
        <el-row>
          <el-col :span="16">三调数据(耕地部份)</el-col>
        </el-row>

        <el-row>
          <el-row class="selectHeader">选择分析服务</el-row>
          <el-row>
            <el-col :span="20">
              <el-checkbox-group v-model="checkedAnalystService">
                <el-checkbox v-for="(item, index) in analystServiceOptions"
                             :label="item.name"
                             :disabled="!item.status"
                             :key="index">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-row>

        <el-row class="selectHeader">选择分析范围</el-row>
        <el-row>
          <el-col :span="8"
                  class="threePush">
            <div class="primary_search__2">区域选择</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="width:30%;float:left;margin-right:9px;">
              <el-select v-model="filterData.cantonProvinceName"
                         size="small"
                         placeholder="选择省"
                         @change="provinceSelect(dictionary.administrative_regions,filterData.cantonProvinceName,$event)">
                <el-option v-for="item in dictionary.administrative_regions"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="item.dictKey"></el-option>
              </el-select>
            </div>
            <div style="width:30%;float:left;margin-right:9px;">
              <el-select v-model="filterData.cantonCityName"
                         size="small"
                         placeholder="选择市"
                         @change="citySelect(dictionary.cantonCity,filterData.cantonCityName,$event)">
                <el-option v-for="item in dictionary.cantonCity"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="item.dictKey"></el-option>
              </el-select>
            </div>
            <div style="width:30%;float:left;">
              <el-select v-model="filterData.cantonAreaName"
                         size="small"
                         placeholder="选择区"
                         @change="areaSelect(dictionary.cantonArea,filterData.cantonAreaName,$event)">
                <el-option v-for="item in dictionary.cantonArea"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="item.dictKey"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex"></el-row>
        <el-row type="flex"
                justify="end">
          <el-col :span="8"
                  style="text-align:left">
            <div class="primary_search__2"
                 @click.stop="myClick">开始分析</div>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  props: {
    conditionsVisiblity: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  data() {
    return {
      show3: true,
      checkedAnalystService: [],
      analystServiceOptions: [
        {
          name: 'basicFarmland',
          label: '永久基本农田',
          status: true
        },
        {
          name: 'farmlandPreparation',
          label: '永久基本农田储备区',
          status: true
        },
        {
          name: 'prospectingRight',
          label: '探矿权',
          status: true
        },

        {
          name: 'natureReserve',
          label: '自然保护地（核心区）',
          status: true
        },

        {
          name: 'landApproval',
          label: '已完成建设项目用地审批',
          status: true
        },
        {
          name: 'slope25',
          label: '坡度大于25度耕地',
          status: true
        }
      ],
      filterData: {
        cantonArea: '440104',
        cantonAreaName: '越秀区',
        cantonProvinceName: '广东省',
        cantonProvince: '440000',
        cantonCity: '440100',
        cantonCityName: '广州市'
      },
      cantonProvinceName: '',
      dicRequest: ['cantonCity'],
      dictionary: {
        // 字典码结果
        cantonCity: '',

        administrative_regions: [
          { id: '440000', dictKey: '440000', zhCn: '广东省' }
        ],
        cantonArea: ''
      },
      dicNum: 0,
      area: '440000'
    }
  },
  methods: {
    myClose() {
      this.$emit('close')
      this.$bus.$emit('changeTimeLineStatus', 0)
    },
    myClick() {
      if (this.checkedAnalystService.length === 0) {
        this.$message({ message: '请先选择叠加扣除', type: 'warning' })
        return
      }
      this.$bus.$emit('changeTimeLineStatus', 1)
      this.$bus.$emit('startQLQAnalyse', {
        province: this.filterData.cantonProvince,
        city: this.filterData.cantonCity,
        area: this.filterData.cantonArea,
        checkedAnalystService: this.checkedAnalystService
      })

      let eraseLayers = ''
      for (var i = 0; i < this.checkedAnalystService.length; i++) {
        let temp = this.checkedAnalystService[i]
        eraseLayers += temp + ';'
      }
      // 向父组件提交开始分析事件
      let params = {
        baseLayer: 'cultivatedLand',
        eraseLayers: eraseLayers,
        areaCode: this.area
      }
      this.$emit('begin', params)
    },

    provinceSelect(dic, cantonCode, event) {
      this.filterData.cantonAreaName = ''
      this.filterData.cantonArea = ''

      this.filterData.cantonCityName = ''
      this.filterData.cantonCity = ''

      let pId = this.$refs[cantonCode][0].$attrs.id
      this.area = this.$refs[cantonCode][0].$attrs.dictKey
      this.filterData.cantonProvince = this.$refs[cantonCode][0].$attrs.dictKey
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList
          return
        }
        this.dictionary.cantonCity = ''
      })
    },
    citySelect(dic, cantonCity, event) {
      this.filterData.cantonArea = ''
      this.filterData.cantonAreaName = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
      this.area = this.$refs[cantonCity][0].$attrs.dictKey
      this.filterData.cantonCity = this.$refs[cantonCity][0].$attrs.dictKey
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList
          return
        }
        this.dictionary.cantonArea = ''
      })
    },
    areaSelect(dic, cantonAreaName, event) {
      this.filterData.cantonArea = this.$refs[cantonAreaName][0].$attrs.dictKey
      this.area = this.$refs[cantonAreaName][0].$attrs.dictKey
    }
  },
  created() {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == 'cantonCity') {
          this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
            parentId: '440000'
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
        this.dictionary[item] = dicArr[this.dicNum]

        this.dicNum++
      }
      this.dictionary.administrative_regions = [
        {
          dictKey: '440000',
          zhCn: '广东省',
          id: '440000'
        }
      ]
    })
  }
}
</script>

<style scoped>
.condition {
  height: 80%;
  /* padding: 10px; */

  overflow: auto;

  width: 28%;
  position: absolute;
  z-index: 1000;
  right: 0.9rem;
  bottom: 0;
}
.selectHeader {
  font-size: 18px;
  color: #515050;
}

.condition .el-row {
  margin-top: 7px;
  color: #000;
  margin-bottom: 0;
}

.condition .font-header {
  height: 7%;
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
  background-color: #fff;
  margin-top: 0;
  border: 1px solid #d5d5d5;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
}
.condition .font-header.active {
  border: 1px solid #d5d5d5;
  border-radius: 6px;
}
</style>
<style >
.condition .el-scrollbar {
  padding: 5px 0 0 5px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #d5d5d5;
  border-top: none;
  border-radius: 0 0 6px 6px;
}
.condition .el-scrollbar__wrap {
  overflow-x: hidden;
}

.condition .el-checkbox__label {
  font-size: 16px;
}

.condition .el-checkbox {
  margin-top: 7px;
  color: #000;
  margin-bottom: 0;
}
.condition .font-big {
  font-size: 18px;
  font-weight: 700;
  color: #000;
}
.condition .font-small {
  font-size: 12px;
}
.condition .el-checkbox {
  margin-right: 100px;
}
</style>
