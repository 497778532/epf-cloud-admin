<template>
  <div class="statisticsBanner EPF-table"
       v-loading="loading">
    <div style="height:calc(100% - 243px)"
         v-if="!treeEchart">
      <el-scrollbar>
        <div style="width:924px;margin:0 auto;padding-top:16px"
             id="banner-table">
          <div style="color:#595959;font-size:18px;font-weight:700;text-align:center">
            <span>{{dataItem.formTypeName}}</span>
          </div>

          <div class="rule-form">
            <div class="rule-form-item">
              <div>

                <div>行政区域（省、市、县）：</div>
                <div class="province-city">

                  <el-select v-model="dataItem.province"
                             placeholder="省"
                             @change="provinceSelect(dataItem.province)">
                    <el-option v-for="(item, index) in dictionary.administrative_regions"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.dictKey"
                               :key="index"></el-option>
                  </el-select>
                  <el-select v-model="dataItem.city"
                             placeholder="市"
                             @change="citySelect(dataItem.city)"
                             style="margin:0 3%">
                    <el-option v-for="(item, index) in dictionary.cantonCity"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.dictKey"
                               :key="index"></el-option>
                  </el-select>
                  <el-select v-model="dataItem.area"
                             placeholder="区县"
                             @change="areaSelectMethods(dataItem.area)">
                    <el-option v-for="(item, index) in dictionary.cantonArea"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.dictKey"
                               :key="index"></el-option>
                  </el-select>

                </div>
              </div>
              <div>
                <div>行政区域代码：</div>
                <el-input v-model="dataItem.zoneCode"
                          :maxlength="20"></el-input>
              </div>
              <div>
                <div>统计负责人：</div>
                <el-input v-model="dataItem.staPrincipal"
                          :maxlength="20"></el-input>
              </div>
              <div>
                <div>统计年份：</div>
                <el-select v-model="dataItem.year"
                           filterable>
                  <el-option v-for="item in yearOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.label"></el-option>
                </el-select>
              </div>
            </div>
            <div class="rule-form-item">
              <div>
                <div>综合机关单位：</div>
                <el-input v-model="dataItem.organName"
                          :maxlength="50"></el-input>
              </div>
              <div>
                <div>单位负责人：</div>
                <el-input v-model="dataItem.unitPrincipal"
                          :maxlength="20"></el-input>
              </div>
              <div>
                <div>填表人：</div>
                <el-input v-model="dataItem.formPrincipal"
                          :maxlength="20"></el-input>
              </div>
              <div>
                <div>报出日期：</div>

                <el-date-picker v-model="dataItem.reportDate"
                                align="right"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>

          <div class="statistics-table">

            <el-table :data="dataItem.indexTreeList"
                      stripe
                      style="width: 100%;">
              <el-table-column label="指标名称"
                               min-width="250">
                <template slot-scope="scope">
                  <span>{{ scope.row.displayName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="代码"
                               min-width="100"
                               prop="name"
                               show-overflow-tooltip></el-table-column>

              <el-table-column label="单位"
                               min-width="100"
                               prop="unit"
                               show-overflow-tooltip></el-table-column>
              <el-table-column label="数量"
                               min-width="100"
                               prop="indexValue"
                               show-overflow-tooltip></el-table-column>
            </el-table>

          </div>

        </div>
      </el-scrollbar>
      <div class="fixe">
        <div style="width:924px;margin:0 auto;">
          <el-scrollbar style="height:150px">
            <div v-html="explain"
                 class="explain"
                 :style="{'line-height':lineHeight}">
            </div>
          </el-scrollbar>
          <div class="fotter">

            <div class="EPFBrown"
                 @click="myCancel">取消</div>
            <div class="darkBlue"
                 @click="save">保存</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="treeEchart"
         style="width:100%;height:100%;">
      <mindCheck :natureType="natureData"
                 ref="mindChild"
                 @push="push"></mindCheck>
    </div>
  </div>
</template>

<script>
import provincialCityArea from '../../../../assets/js/provincialCityArea'
import Bus from '@/utils/bus'
import mindCheck from '../MindCheckList'
export default {
  mixins: [provincialCityArea],
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    mindCheck
  },

  data () {
    return {
      year: '',
      loading: false,
      treeEchart: true,
      areaSelect: [],
      dataItem: {
        province: '',
        city: '',
        area: '',
        areaSelectedOptions: ['440000']
      },
      yearOptions: [
        {
          value: 2020,
          label: 2020
        },
        {
          value: 2019,
          label: 2019
        },
        {
          value: 2018,
          label: 2018
        },
        {
          value: 2017,
          label: 2017
        },
        {
          value: 2016,
          label: 2016
        },
        {
          value: 2015,
          label: 2015
        }
      ],

      table: [
        {
          cantonProvinceName: '哈哈哈',
          name: '我是name',
          unit: '元',
          controlTypeName: '类类'
        },
        {
          cantonProvinceName: '哈哈哈1',
          name: '我是name1',
          unit: '元',
          controlTypeName: '类类'
        },
        {
          cantonProvinceName: '哈哈哈2',
          name: '我是name2',
          unit: '元',
          controlTypeName: '类类'
        },
        {
          cantonProvinceName: '哈哈哈3',
          name: '我是name3',
          unit: '元',
          controlTypeName: '类类'
        },
        {
          cantonProvinceName: '哈哈哈4',
          name: '我是name4',
          unit: '元',
          controlTypeName: '类类'
        },
        {
          cantonProvinceName: '哈哈哈5',
          name: '我是name5',
          unit: '元',
          controlTypeName: '类类'
        },
        {
          cantonProvinceName: '哈哈哈6',
          name: '我是name6',
          unit: '元',
          controlTypeName: '类类'
        },
        {
          cantonProvinceName: '哈哈哈6',
          name: '我是name6',
          unit: '元',
          controlTypeName: '类类'
        },
        {
          cantonProvinceName: '哈哈哈6',
          name: '我是name6',
          unit: '元',
          controlTypeName: '类类'
        },
        {
          cantonProvinceName: '哈哈哈6',
          name: '我是name6',
          unit: '元',
          controlTypeName: '类类'
        },

        {
          cantonProvinceName: '哈哈哈7',
          name: '我是name7',
          unit: '元',
          controlTypeName: '类类'
        }
      ],

      natureData: {}

    }
  },
  methods: {
    push (val, year) {
      if (val.length === 3) {
        this.$get(
          `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${val[1]}`,
          {}
        ).then(res => {
          if (res.dictionariesList.length !== 0) {
            this.dictionary.cantonArea = res.dictionariesList
            return
          }
          this.dictionary.cantonArea = ''
        })
      }
      // this.dataItem.cantonProvince = val[1] || ''
      // this.dataItem.cantonCity = val[2] || ''

      this.year = year
      this.treeEchart = false
      this.getList(val)
    },

    print () { },
    myCancel () {
      this.treeEchart = true
    },
    getList (val) {
      let params = {}

      params['formType'] = this.formType
      params['city'] = val[1] || ''
      params['area'] = val[2] || ''
      params['province'] = '440000'
      params['year'] = this.year
      this.$get('/epf-onemap/formData/createByType', params).then(res => {
        if (res.code === 0) {
          this.dataItem = res.result
          this.dataItem.zoneCode = val[val.length - 1] || '440000'
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    save () {
      this.loading = true
      let {
        formType,
        province,
        city,
        area,
        zoneCode,
        year,
        organName,
        staPrincipal,
        unitPrincipal,
        formPrincipal,
        reportDate
      } = this.dataItem

      let key = {
        formType,
        province,
        city,
        area,
        zoneCode,
        year,
        organName,
        staPrincipal,
        unitPrincipal,
        formPrincipal,
        reportDate
      }
      this.$post('/epf-onemap/formData/save', key).then(res => {
        if (res.code === 0) {
          this.loading = false
          this.$message.success('生成成功')
          // let title = '表单预览'
          // let routerPath = `ComprehensiveDeail?documentId=${res.documentId}`
          // var tabObj = { title, routerPath }
          Bus.$emit('describe', {
            key: 'systemManage3',
            name: 'statisticsBanner',
            id: res.documentId
          })
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    provinceSelect (id) {
      this.dataItem.area = ''
      this.dataItem.city = ''
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${id}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length !== 0) {
          this.dictionary.cantonCity = res.dictionariesList
          return
        }
        this.dictionary.cantonCity = ''
      })
    },
    citySelect (id) {
      this.dataItem.zoneCode = id
      this.dataItem.cantonArea = ''
      this.dataItem.area = ''
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${id}`,
        {}
      ).then(res => {
        if (res.dictionariesList.length !== 0) {
          this.dictionary.cantonArea = res.dictionariesList
          return
        }
        this.dictionary.cantonArea = ''
      })
    },
    areaSelectMethods (id) {
      this.dataItem.zoneCode = id
    }
  },
  created () {
    this.natureData = this.data
  },
  computed: {
    explain () {
      let str = ''
      switch (this.data.id) {
        case 0:
          str
            = '<div class="one">说明：</div><div> 1.其中涉及土地变更调查数据汇交截止时间为次年7月1日。</div> <div>2.主要河流包括：长江、黄河、松花江、辽河、珠江、海河和淮河。 </div>  <div>3.逻辑关系：代码01=02+03+04+05+06+07+08+09+10+11+12+13+14     代码27=28+30  28≥29  30≥31  </div>'
          break

        case 1:
          str
            = '<div>说明：</div><div> 1.逻辑关系：代码04=01+02+03 代码05=06+07+08+09+10。</div> <div> 代码10=11+12 </div> '
          break
        case 2:
          str
            = '<div>说明：</div><div>  本表代码05中“永久基本农田面积”与耕地保护情况里“永久。</div> <div> 基本农田面积”必须一致 </div> '
          break
        case 3:
          str
            = '<div>说明：</div><div> 1. 耕地面积变化情况中，年初耕地面积数必须与上年年末耕地面积数一致。</div> <div> 2. 永久基本农田情况统计范围是全辖区永久基本农田。资料来源于省、市、县自然资源管理部门。</div> <div> 3. 逻辑关系：代码03=04+05+06+07+08  代码09=01+02-03    代码21≥22 </div> <div>  4. 其中涉及土地变更调查数据汇交截止时间为次年7月1日。</div> '
          break
        case 4:
          str
            = '<div>说明：</div><div>逻辑关系：代码01≥02≥03    代码04≥05≥06   代码11≥12 </div><div>代码14≥15   代码16≥17≥18 代码32≥34   代码33≥35  代码36≥38   代码37≥39   代码40≥43  代码41≥44  代码42≥45。</div>'
          break
        case 5:
          str
            = '<div>说明：</div> <div>海洋生产总值占国内生产总值比重”、“海洋新兴产业增加值增速”、“第三产业占海洋生产总值比重”、“涉海就业人员”4个指标的报告期别为年度，“海洋生产总值”、“海洋生产总值增长率”2个指标的报告期别为季度。</div>'
          break
        case 6:
          str
            = '<div>说明：</div><div>1、以上指标按海域使用类型二级类分列 </div> <div>2、数据来源于自然资源部各海区局及沿海省、市、县各级自然资源主管部门。各级自然资源主管部门逐级填写、审核、上报，由省级自然资源主管部门报送自然资源部，自然资源部各海区局直接报送自然资源部。</div><div>3、海域使用类型二级类：包括渔业基础设施用海、围海养殖用海、开放式养殖用海、人工鱼礁用海、盐业用海、固体矿产开采用海、油气开采用海、船舶工业用海、电力工业用海、海水综合利用用海、其他工业用海、港口用海、航道用海、锚地用海、路桥用海、旅游基础设施用海、浴场用海、游乐场用海、电缆管道用海、海底隧道用海、海底场馆用海、污水达标排放用海、倾倒区用海、城镇建设填海造地用海、废弃物处置填海造地用海、科研教学用海、军事用海、海洋保护区用海、海岸防护工程用海、其他用海。</div>'
          break
      }
      return str
    },
    lineHeight () {
      let str = ''
      switch (this.data.id) {
        case 0:
          str = 35
          break

        case 1:
          str = 35
          break
        case 2:
          str = 35
          break
        case 3:
          str = 30
          break
        case 4:
          str = 35
          break
        case 5:
          str = 35
          break
        case 6:
          str = 21
          break
      }
      return str + 'px'
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler (val) {
        this.treeEchart = true
        this.formType = val.key
        if (this.treeEchart) {
          this.natureData = val

          this.$nextTick(function () {
            setTimeout(() => {
              this.$refs.mindChild.getOverviewData()
            }, 0)
          })
        }
      }
    }
  },
  mounted () {
  }
}
</script>

<style soped>
.statisticsBanner {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
  left: 0;
  top: 0;
}
.rule-form {
}
.rule-form-item {
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
}
.rule-form-item > div {
  width: 176px;
}

.rule-form-item > div:nth-child(1) {
  width: 320px;
}

.fixe {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 16px 0;
  height: 227px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -1px 9px 0px rgba(161, 161, 161, 0.5);
}
.fotter {
  display: flex;
  /* position: absolute;
  left: 0;
  bottom: 0; */
  justify-content: space-between;
  width: 100%;
  /* height: 40px;
  padding: 12px 22px; */
}
.fotter > div {
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.statistics-table {
  margin-top: 16px;
}
.explain {
  margin-bottom: 5px;
}
.explain div {
  color: rgba(134, 134, 134, 1);
}

.rule-form .rule-form-item .province-city {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.one {
}
</style>
<style>
.statisticsBanner .el-form-item {
  margin-bottom: 10px;
}
</style>
