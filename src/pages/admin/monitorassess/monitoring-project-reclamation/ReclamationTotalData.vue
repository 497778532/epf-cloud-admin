<template>
  <div class="page-body"
       id="cj-total">
    <div class="left-top-stock">
      <div class="left-top-button-other">
        <div class="left-top-button-other-title">拆旧复垦数据总览</div>
      </div>
    </div>
    <div class="page-list-stock EPF-table"
         style="width:100%;height:100%;padding:15px;backgroundColor: #fff;">
      <div class="switchHeight_box_chaijiu">
        <el-cascader :props="props"
                     clearable
                     v-model="areaSelectedOptions"
                     @change="areaSelect()"
                     style="width:300px;"></el-cascader>
        <div class="primary-search-href__custom">
          <a href="javascript:void(0);">下载文档</a>
        </div>
      </div>
      <div class="checkout-big-box"
           style="margin-bottom:24px;margin-top:0px;">
        <div class="checkout-box-title">
          信息列筛选：
        </div>
        <div class="checkout-box">
          <el-checkbox-group v-model="checkListIng"
                             @change="handleCheckedTypesChange">
            <el-checkbox v-for="(item,index) in checkList"
                         :key="index"
                         :label="item"
                         :disabled="checkDisList.includes(item)"></el-checkbox>
            <span @click="handleCheckedTypesCancelChange"
                  style="color:#1B74EE;font-size:16px;line-height: 21px;cursor:pointer;margin-left:32px;">全部取消</span>
            <span style="color:#9A9A9A;font-size:16px;line-height: 21px;">（至多可选择2项）</span>
          </el-checkbox-group>
        </div>
      </div>
      <div style="min-height:552px;">
        <el-table :data="listData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  stripe
                  style="width: 100%;min-height:80px;"
                  border>
          <el-table-column label="序号"
                           min-width="100px"
                           align="center"
                           fixed="left">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="diqu"
                           label="地区"
                           min-width="150"
                           align="center"
                           fixed="left"></el-table-column>
          <el-table-column prop="gongzuo"
                           label="下达拆旧复垦工作目标面积"
                           min-width="250"
                           align="center"
                           v-if="checkListIng.includes('下达拆旧复垦工作目标面积')"></el-table-column>
          <el-table-column label="农村拆旧复垦项目累计建设情况"
                           min-width="780"
                           align="center"
                           v-if="checkListIng.includes('农村拆旧复垦项目累计建设情况')">
            <el-table-column label="项目立项情况"
                             min-width="260"
                             align="center">
              <el-table-column prop="geshu1"
                               label="个数"
                               min-width="130"
                               align="center"></el-table-column>
              <el-table-column prop="mianji1"
                               label="面积"
                               min-width="130"
                               align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="项目动工情况"
                             min-width="260"
                             align="center">
              <el-table-column prop="geshu2"
                               label="个数"
                               min-width="130"
                               align="center"></el-table-column>
              <el-table-column prop="mianji2"
                               label="面积"
                               min-width="130"
                               align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="项目验收情况"
                             min-width="260"
                             align="center">
              <el-table-column prop="geshu3"
                               label="个数"
                               min-width="130"
                               align="center"></el-table-column>
              <el-table-column prop="mianji3"
                               label="面积"
                               min-width="130"
                               align="center"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="累计下达复垦周转指标面积"
                           min-width="500"
                           align="center"
                           v-if="checkListIng.includes('累计下达复垦周转指标面积')">
            <el-table-column prop="geshu4"
                             label
                             min-width="250"
                             align="center"></el-table-column>
            <el-table-column prop="mianji4"
                             label="其中当年下达数"
                             min-width="250"
                             align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="复垦指标累计交易情况"
                           min-width="600"
                           align="center"
                           v-if="checkListIng.includes('复垦指标累计交易情况')">
            <el-table-column prop="mianji5"
                             label="交易面积"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column label
                             min-width="150"
                             align="center">
              <el-table-column prop="mianji7"
                               label="其中当年交易面积"
                               min-width="150"
                               align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="jine5"
                             label="交易金额"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column label
                             min-width="150"
                             align="center">
              <el-table-column prop="jine7"
                               label="其中当年交易金额"
                               min-width="150"
                               align="center"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="weiguihuan"
                           label="未归还复垦周转指标面积"
                           min-width="250"
                           align="center"
                           v-if="checkListIng.includes('未归还复垦周转指标面积')"></el-table-column>
        </el-table>
        <div style="text-align:right;margin:22px 0px;">
          <el-pagination background
                         layout="total, prev, pager, next,sizes,jumper"
                         :page-sizes="[5,10,15,20]"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="this.listData.length"
                         :current-page.sync="currentPage"
                         :page-size="pageSize"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import qs from 'qs'
import Bus from '../../../../utils/bus'
import moment from 'moment'
import areaSelect from '../../../../assets/js/areaCascader'
export default {
  name: 'ReclamationTotalData',
  mixins: [areaSelect],

  data () {
    return {
      params: {
        province: '440000',
        city: '',
        area: ''
      },
      href: '',

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      listData: [{
        diqu: '全省',
        gongzuo: '30000',
        geshu1: '1146',
        mianji1: '28064',
        geshu2: '368',
        mianji2: '7690',
        geshu3: '331',
        mianji3: '6709',
        geshu4: '39765',
        mianji4: '6200',
        mianji5: '5111',
        mianji7: '4002',
        jine5: '27.96',
        jine7: '22.31',
        weiguihuan: '34654'
      },
      {
        diqu: '广州市',
        gongzuo: '', // 1
        geshu1: '', // 2
        mianji1: '', // 3
        geshu2: '', // 4
        mianji2: '', // 5
        geshu3: '', // 6
        mianji3: '', // 7
        geshu4: '10800', // 8
        mianji4: '3300', // 9
        mianji5: '3750', // 10
        mianji7: '2750', // 11
        jine5: '20.40', // 12
        jine7: '15.30', // 13
        weiguihuan: '7050' // 14,
      },
      {
        diqu: '深圳市',
        gongzuo: '', // 1
        geshu1: '', // 2
        mianji1: '', // 3
        geshu2: '', // 4
        mianji2: '', // 5
        geshu3: '', // 6
        mianji3: '', // 7
        geshu4: '810', // 8
        mianji4: '0', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '810' // 14,
      },
      {
        diqu: '珠海市',
        gongzuo: '', // 1
        geshu1: '', // 2
        mianji1: '', // 3
        geshu2: '', // 4
        mianji2: '', // 5
        geshu3: '', // 6
        mianji3: '', // 7
        geshu4: '4000', // 8
        mianji4: '1300', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '4000' // 14,
      },
      {
        diqu: '汕头市',
        gongzuo: '1400', // 1
        geshu1: '0', // 2
        mianji1: '0', // 3
        geshu2: '0', // 4
        mianji2: '0', // 5
        geshu3: '0', // 6
        mianji3: '0', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '佛山市',
        gongzuo: '', // 1
        geshu1: '', // 2
        mianji1: '', // 3
        geshu2: '', // 4
        mianji2: '', // 5
        geshu3: '', // 6
        mianji3: '', // 7
        geshu4: '5970', // 8
        mianji4: '0', // 9
        mianji5: '65', // 10
        mianji7: '', // 11
        jine5: '0.33', // 12
        jine7: '', // 13
        weiguihuan: '5905' // 14,
      },
      {
        diqu: '韶关市',
        gongzuo: '2400', // 1
        geshu1: '146', // 2
        mianji1: '4279', // 3
        geshu2: '89', // 4
        mianji2: '2172', // 5
        geshu3: '80', // 6
        mianji3: '2009', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '河源市',
        gongzuo: '1550', // 1
        geshu1: '21', // 2
        mianji1: '1038', // 3
        geshu2: '10', // 4
        mianji2: '429', // 5
        geshu3: '7', // 6
        mianji3: '282', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '梅州市',
        gongzuo: '3500', // 1
        geshu1: '270', // 2
        mianji1: '5735', // 3
        geshu2: '116', // 4
        mianji2: '2028', // 5
        geshu3: '116', // 6
        mianji3: '2012', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '惠州市',
        gongzuo: '550', // 1
        geshu1: '38', // 2
        mianji1: '645', // 3
        geshu2: '20', // 4
        mianji2: '300', // 5
        geshu3: '20', // 6
        mianji3: '290', // 7
        geshu4: '3240', // 8
        mianji4: '0', // 9
        mianji5: '1252', // 10
        mianji7: '1252', // 11
        jine5: '7.01', // 12
        jine7: '7.01', // 13
        weiguihuan: '1988' // 14,
      },
      {
        diqu: '汕尾市',
        gongzuo: '900', // 1
        geshu1: '0', // 2
        mianji1: '0', // 3
        geshu2: '0', // 4
        mianji2: '0', // 5
        geshu3: '0', // 6
        mianji3: '0', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '东莞市',
        gongzuo: '', // 1
        geshu1: '', // 2
        mianji1: '', // 3
        geshu2: '', // 4
        mianji2: '', // 5
        geshu3: '', // 6
        mianji3: '', // 7
        geshu4: '3160', // 8
        mianji4: '1000', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '3160' // 14,
      },
      {
        diqu: '中山市',
        gongzuo: '', // 1
        geshu1: '', // 2
        mianji1: '', // 3
        geshu2: '', // 4
        mianji2: '', // 5
        geshu3: '', // 6
        mianji3: '', // 7
        geshu4: '1845', // 8
        mianji4: '0', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '1845' // 14,
      },
      {
        diqu: '江门市',
        gongzuo: '1200', // 1
        geshu1: '23', // 2
        mianji1: '1465', // 3
        geshu2: '13', // 4
        mianji2: '390', // 5
        geshu3: '13', // 6
        mianji3: '379', // 7
        geshu4: '3100', // 8
        mianji4: '600', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '3100' // 14,
      },
      {
        diqu: '阳江市',
        gongzuo: '1600', // 1
        geshu1: '14', // 2
        mianji1: '269', // 3
        geshu2: '0', // 4
        mianji2: '0', // 5
        geshu3: '0', // 6
        mianji3: '0', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '湛江市',
        gongzuo: '4000', // 1
        geshu1: '103', // 2
        mianji1: '3659', // 3
        geshu2: '5', // 4
        mianji2: '260', // 5
        geshu3: '4', // 6
        mianji3: '216', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '茂名市',
        gongzuo: '3700', // 1
        geshu1: '342', // 2
        mianji1: '7315', // 3
        geshu2: '34', // 4
        mianji2: '719', // 5
        geshu3: '34', // 6
        mianji3: '671', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '肇庆市',
        gongzuo: '1300', // 1
        geshu1: '40', // 2
        mianji1: '913', // 3
        geshu2: '32', // 4
        mianji2: '525', // 5
        geshu3: '32', // 6
        mianji3: '497', // 7
        geshu4: '6840', // 8
        mianji4: '0', // 9
        mianji5: '43', // 10
        mianji7: '', // 11
        jine5: '0.22', // 12
        jine7: '', // 13
        weiguihuan: '6797' // 14,
      },
      {
        diqu: '清远市',
        gongzuo: '3300', // 1
        geshu1: '72', // 2
        mianji1: '1000', // 3
        geshu2: '25', // 4
        mianji2: '417', // 5
        geshu3: '25', // 6
        mianji3: '354', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '潮州市',
        gongzuo: '1250', // 1
        geshu1: '5', // 2
        mianji1: '168', // 3
        geshu2: '1', // 4
        mianji2: '55', // 5
        geshu3: '0', // 6
        mianji3: '0', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '揭阳市',
        gongzuo: '1650', // 1
        geshu1: '47', // 2
        mianji1: '482', // 3
        geshu2: '17', // 4
        mianji2: '147', // 5
        geshu3: '0', // 6
        mianji3: '0', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      },
      {
        diqu: '云浮市',
        gongzuo: '1700', // 1
        geshu1: '25', // 2
        mianji1: '1097', // 3
        geshu2: '6', // 4
        mianji2: '248', // 5
        geshu3: '0', // 6
        mianji3: '0', // 7
        geshu4: '', // 8
        mianji4: '', // 9
        mianji5: '', // 10
        mianji7: '', // 11
        jine5: '', // 12
        jine7: '', // 13
        weiguihuan: '' // 14,
      }],

      checkList: ['序号', '地区', '下达拆旧复垦工作目标面积', '农村拆旧复垦项目累计建设情况', '累计下达复垦周转指标面积', '复垦指标累计交易情况', '未归还复垦周转指标面积'],
      checkDisList: ['序号', '地区'],
      checkListIng: ['序号', '地区', '农村拆旧复垦项目累计建设情况'],
      checked: true
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    areaSelect () {
      if (this.areaSelectedOptions.length == 1) {
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = ''
        this.params.area = ''
      } else if (this.areaSelectedOptions.length == 2) {
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = this.areaSelectedOptions[1]
        this.params.area = ''
      } else if (this.areaSelectedOptions.length == 3) {
        this.params.province = this.areaSelectedOptions[0]
        this.params.city = this.areaSelectedOptions[1]
        this.params.area = this.areaSelectedOptions[2]
      }
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      // this.pageSize = val; // 显示条数改变
      this.$data.pageSize = val
      this.currentPage = 1
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.currentPage = val // 页码改变
    },
    handleCheckedTypesChange (value) {
      if (this.checkListIng.length == 4) {
        this.checkDisList = this.checkList.filter(item => {
          return this.checkListIng.indexOf(item) === -1
        })
        this.checkDisList.unshift('序号', '地区')
      } else {
        this.checkDisList = ['序号', '地区']
      }
    },
    handleCheckedTypesCancelChange () {
      this.checkDisList = ['序号', '地区']
      this.checkListIng = ['序号', '地区']
    }
  },
  created () { },
  mounted () { },
  watch: {}
}
</script>
<style scoped>
.page-body {
  width: 100%;
  min-height: 821px;
  height: auto;
  padding: 16px 24px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
}
.left-top-stock {
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  border-bottom: 1px solid #d9d9d9;
}
.left-top-button-other {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left-top-button-other-title {
  font-size: 18px;
  color: #232323;
  font-weight: bolder;
}
.page-list-stock {
  width: 100% !important;
  height: calc(100% - 40px) !important;
  background-color: #fff !important;
  padding: 0px 16px 16px !important;
}
.switchHeight_box_chaijiu {
  width: 100%;
  height: 88px;
  padding: 24px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.primary-search-href__custom a {
  font-size: 16px;
  line-height: 30px;
  display: inline-block;
  height: 30px;
  cursor: pointer;
  color: #50a5f4;
  margin-left: 30px;
}
.checkout-big-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.checkout-box-title {
  width: 110px;
  height: 30px;
  font-size: 16px;
  color: #505050;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.checkout-box {
  flex: 1;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
<style>
#cj-total .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #c0c4cc;
  font-size: 16px;
  line-height: 21px;
}
#cj-total .el-checkbox__label {
  font-size: 16px;
  line-height: 21px;
}
#cj-total .el-checkbox {
  margin-bottom: 8px;
}
</style>
