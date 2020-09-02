<template>
  <div class="page-body EPF-table">
    <div class="page-content">
      <div class="choice_case"
           style="width:74%;float:left">
        <div class="choice_core">
          <div class="choice_bus">
            <el-cascader size="small"
                         style="margin:0 20px;width:220px;"
                         :props="props"
                         clearable
                         v-model="areaSelectedOptions"
                         @change="areaSelect()"></el-cascader>
            <el-select v-model="unitsVal"
                       placeholder="请选择单位"
                       style="margin-left:15px;width:100px;"
                       @change="unitNameSelect()">
              <el-option v-for="item in units"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <el-button type="primary"
                       style="margin-left:10px">导出评估报告</el-button>
          </div>
          <div class="choice_tab">
            <ul class="choice_tab_ul">
              <li @click="num = 0"
                  :class="{active:num==1}">
                <img :src="num===0?require('@/assets/images/jcpgyj/index0202.png'):require('@/assets/images/jcpgyj/index02.png')"
                     style="width:46px;height:36px;" />
              </li>
              <li @click="num = 1"
                  :class="{active:num==0}">
                <img :src="num===1?require('@/assets/images/jcpgyj/index01.png'):require('@/assets/images/jcpgyj/index0101.png')"
                     style="width:46px;height:36px;" />
              </li>
            </ul>
          </div>
        </div>

        <!-- 切换的内容 -->
        <div class="tab_content">
          <p style="height:30px;font-weight: bolder;color: #303030;margin: 10px;padding-left: 48px;">{{this.unitName}}</p>
          <ul class="tab_content_ul">
            <li v-show="num == 0">
              <columns :option="customoption"
                       width="1290px"
                       height="100%"></columns>
            </li>
            <li v-show="num == 1">
              <div class="pageTab">
                <el-table :data="tableData"
                          border
                          style="width: 100%"
                          max-height="500">
                  <el-table-column prop="xzqh"
                                   label="行政区"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="stmj"
                                   label="水田面积"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="stmhpm"
                                   label="水田面积排名"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="stzgdmjbl"
                                   label="水田占耕地面积的比例"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="stzgdmjblpm"
                                   label="水田占耕地面积的比例排名"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="sjd"
                                   label="水浇地"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="sjdpm"
                                   label="水浇地排名"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="sjdzgdmjzb"
                                   label="水浇地占耕地面积的比例"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="hd"
                                   label="旱地"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="hdpm"
                                   label="旱地排名"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="hdzgdmjbl"
                                   label="旱地占耕地面积的比例"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="gd"
                                   label="耕地"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdpm"
                                   label="耕地排名"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="ktzdlmj"
                                   label="可调整地类面积"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="ktzdlmjpm"
                                   label="可调整地类面积排名"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylxz"
                                   label="耕地保有量现状"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylxzpm"
                                   label="耕地保有量现状排名"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylxzpm2"
                                   label="耕地保有量现状(含全部可调整地类)"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylzapm3"
                                   label="耕地保有量现状(含全部可调整地类)排名"
                                   width="180"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylxzdk"
                                   label="耕地保有量现状（含带K园地和带K坑塘）"
                                   width="180"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylxzdkpm"
                                   label="耕地保有量现状（含带K园地和带K坑塘）排名"
                                   width="180"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylghzb"
                                   label="耕地保有量规划指标"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylghzbpm"
                                   label="耕地保有量规划指标排名"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylzbwcqk"
                                   label="耕地保有量指标完成情况"
                                   width="140"
                                   align="center"></el-table-column>
                  <el-table-column prop="gdbylzbwcqkpm"
                                   label="耕地保有量指标完成情况排名"
                                   width="140"
                                   align="center"></el-table-column>
                </el-table>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="norm">
        <div>
          <el-input placeholder="输入关键字查询"
                    prefix-icon="el-icon-search"
                    v-model="inquire"
                    style="font-size:16px"
                    :maxlength="50"></el-input>
        </div>
        <div style="margin-top:20px">
          <el-menu default-active="2"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i>
                  <img src="@/assets/icon3.png"
                       alt />
                </i>
                <span>安全国土</span>
                <span>(14)</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">耕地保有量</el-menu-item>
                <el-menu-item index="1-2">永久基本农田保护面积</el-menu-item>
                <el-menu-item index="1-3">高标准农田假设面积</el-menu-item>
                <el-menu-item index="1-4">生态保护红线面积</el-menu-item>
                <el-menu-item index="1-5">用水强度</el-menu-item>
                <el-menu-item index="1-6">用水总量</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i>
                  <img src="@/assets/icon4.png"
                       alt />
                </i>
                <span>繁荣国土</span>
                <span>(6)</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">城乡建设用地规模</el-menu-item>
                <el-menu-item index="2-2">城镇建设用地规模</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i>
                  <img src="@/assets/icon5.png"
                       alt />
                </i>
                <span>美丽国土</span>
                <span>(5)</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">自然保护地面积</el-menu-item>
                <el-menu-item index="3-2">新增国土修复面积</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i>
                  <img src="@/assets/icon6.png"
                       alt />
                </i>
                <span>和谐国土</span>
                <span>(9)</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">都市圈内城镇一小时可达性</el-menu-item>
                <el-menu-item index="4-2">人地匹配度</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import columns from './dynamic/columns'
import xzqhMixin from './base/mixins/xzqh'
import unitMixin from './base/mixins/unit'
import { MAINCHARTOPTION, tableData } from './mock/index'
export default {
  name: 'monitormanage',
  mixins: [xzqhMixin, unitMixin],
  data () {
    return {
      num: 0,
      inquire: '',
      produImg: [
        { src: require('@/assets/icon1.png') },
        { src: require('@/assets/icon2.png') }
      ],
      tableData: null,
      customoption: null
    }
  },
  methods: {},
  components: {
    columns
  },
  beforeMount () {
    this.tableData = this.deepClone(tableData)
    this.customoption = this.deepClone(MAINCHARTOPTION)
  }
}
</script>
<style src="./css/style.css" scoped>
</style>
