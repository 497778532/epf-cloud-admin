<template>
  <div class="page-body"
       id="map-index">
    <div class="left-index">
      <div class="index-top-box">
        <div class="index-top-title">监测指标</div>
        <div class="index-top-content">
          <ul class="content-ul">
            <li class="content-li"
                v-for="(item, index) in topPlanList"
                :key="index">
              <span>
                <strong v-if="item.selectYear==null">{{ item.name }}</strong>
                <strong v-else>{{ item.name }}({{ item.selectYear }})</strong>
              </span>
              <span>
                <strong>
                  <span style="color:#f59a23;">{{ item.selectValue }}</span>
                  {{ item.unit }}
                </strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="index-bottom-box">
        <ul class="content-ul__custom">
          <li class="content-li__custom"
              v-for="(item, index) in bottomPlanList"
              :key="index">
            <div class="content-li-icon">
              <span class="content-li-icon-from-first"
                    v-if="index == 0"></span>
              <span class="content-li-icon-from-second"
                    v-else-if="index == 1"></span>
              <span class="content-li-icon-from-third"
                    v-else-if="index == 2"></span>
              <span style="width:25px;"
                    v-else></span>
              <span class="content-li-icon-from-name"
                    v-if="item.selectYear==null">{{ item.name }}</span>
              <span class="content-li-icon-from-name"
                    v-else>{{ item.name }}({{ item.selectYear }})</span>
            </div>
            <div class="content-li-number">
              <span style="color:#f59a23;">{{ item.selectValue }}</span>
              {{ item.unit }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="middle-index">
      <div class="index-map-button-box">
        <div class="index-map-button"
             :class="{ active: currentTab === 0 }"
             @click="turnFirst">一核一带一区</div>
        <div class="index-map-button"
             :class="{ active: currentTab === 1 }"
             @click="turnSecond">行政区划图</div>
        <div class="index-map-button"
             :class="{ active: currentTab === 2 }"
             @click="turnThird">四大版块</div>
        <div class="index-map-button map-inline"
             style="display:flex;justify-content:space-around;align-items: center;"
             :class="{ active: currentTab ===  3}"
             @click="turnMap">
          <img src="../../../assets/images/leader/inlinemap.png"
               width="20px"
               height="20px"
               style="margin-right:5px;"
               alt /> 在线地图
        </div>
      </div>
      <div class="index-map-current-box"
           v-if="currentTab === 0">
        <div class="chart-bread-name">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
              <img src="../../../assets/images/leader/dingwei.png"
                   alt />
              <el-button type="text"
                         @click="toProvinceWide"
                         style="color:#1D7CE4;">广东省</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="isWay">
              <el-button type="text"
                         @click="toWayWide"
                         style="color:#1D7CE4;">{{ breadcrumbWayName }}</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="isCity">
              <el-button type="text"
                         @click="toCityWide"
                         style="color:#1D7CE4;">{{ breadcrumbCityName }}</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="isArea">
              <el-button type="text"
                         style="color:#1D7CE4;">{{ breadcrumbAreaName }}</el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div id="mapFirst"
             ref="mapChartFirst"
             style="width:100%;height:100%;"></div>
      </div>
      <div class="index-map-current-box"
           v-if="currentTab === 1">
        <div class="chart-bread-name">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
              <img src="../../../assets/images/leader/dingwei.png"
                   alt />
              <el-button type="text"
                         @click="toProvinceWide"
                         style="color:#1D7CE4;">广东省</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="isCity">
              <el-button type="text"
                         @click="toCityWide"
                         style="color:#1D7CE4;">{{ breadcrumbCityName }}</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="isArea">
              <el-button type="text"
                         style="color:#1D7CE4;">{{ breadcrumbAreaName }}</el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div id="mapSecond"
             ref="mapChartSecond"
             style="width:100%;height:100%;"></div>
      </div>
      <div class="index-map-current-box"
           v-if="currentTab === 2">
        <div class="chart-bread-name">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
              <img src="../../../assets/images/leader/dingwei.png"
                   alt />
              <el-button type="text"
                         @click="toProvinceWide"
                         style="color:#1D7CE4;">广东省</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="isWrap">
              <el-button type="text"
                         @click="toWrapWide"
                         style="color:#1D7CE4;">{{ breadcrumbWrapName }}</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="isCity">
              <el-button type="text"
                         @click="toCityWide"
                         style="color:#1D7CE4;">{{ breadcrumbCityName }}</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="isArea">
              <el-button type="text"
                         style="color:#1D7CE4;">{{ breadcrumbAreaName }}</el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div id="mapThird"
             ref="mapChartThird"
             style="width:100%;height:100%;"></div>
      </div>
      <div class="index-map-current-box"
           v-if="currentTab === 3">
        <epf-mapview name="mapindex00"
                     :delay="1"
                     :mapAppInitConf="myMapAppInitConf"
                     :widgetConf="myWidgetConf"
                     style="width:calc(100% - 30px);height:calc(100% - 30px);margin: 15px;"></epf-mapview>
      </div>
      <div class="index-search">
        <el-input placeholder="请输入关键词"
                  v-model="word"
                  style="width:316px;height:35px;background:rgba(249,249,249,1);border:1px solid rgba(213,213,213,1);border-radius:6px;"
                  @keyup.enter.native="getSearchData"
                  :maxlength="20">
          <el-button slot="prepend"
                     icon="el-icon-search"
                     style="width:34px;display:flex;justify-content: center;font-size:18px;"></el-button>
        </el-input>
        <div class="index-search-word"
             @click="getSearchData">搜索</div>
      </div>
    </div>
    <div class="right-index">
      <div class="index-top-box">
        <div class="index-top-title">现状概况</div>
        <div class="index-top-content">
          <ul class="content-ul">
            <li class="content-li"
                v-for="(item, index) in topDetectionList"
                :key="index">
              <span>
                <strong v-if="item.selectYear==null">{{ item.name }}</strong>
                <strong v-else>{{ item.name }}({{ item.selectYear }})</strong>
              </span>
              <span>
                <strong>
                  <span style="color:#f59a23;">{{ item.selectValue }}</span>
                  {{ item.unit }}
                </strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="index-bottom-box">
        <ul class="content-ul__custom">
          <li class="content-li__custom"
              v-for="(item, index) in bottomDetectionList"
              :key="index">
            <div class="content-li-icon">
              <span class="content-li-icon-from-first"
                    v-if="index == 0"></span>
              <span class="content-li-icon-from-second"
                    v-else-if="index == 1"></span>
              <span class="content-li-icon-from-third"
                    v-else-if="index == 2"></span>
              <span style="width:25px;"
                    v-else></span>
              <span class="content-li-icon-from-name"
                    v-if="item.selectYear==null">{{ item.name }}</span>
              <span class="content-li-icon-from-name"
                    v-else>{{ item.name }}({{ item.selectYear }})</span>
            </div>
            <div class="content-li-number">
              <span style="color:#f59a23;">{{ item.selectValue }}</span>
              {{ item.unit }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState, mapMutations } from 'vuex'
import qs from 'qs'
import Bus from '../../../utils/bus'
import echarts from 'echarts'
import moment from 'moment'
import screenfull from 'screenfull'
import '../../../../static/map/js/province/guangdong'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  props: ['homeCurrentNo'],
  data () {
    return {
      mapServices: null,
      myMapAppInitConf: null,
      myWidgetConf: null,
      // 地图面包屑
      isWrap: false,
      breadcrumbWrapName: '',
      isWay: false,
      breadcrumbWayName: '',
      isCity: false,
      breadcrumbCityName: '',
      isArea: false,
      breadcrumbAreaName: '',

      // 地图
      chartFirst: null,
      chartSecond: null,
      chartThird: null,
      timeFnFirst: null,
      timeFnSecond: null,
      timeFnThird: null,
      mapCode: '',
      pro: {
        珠江三角洲: '../../../../static/map/json/siDaBanKuai/448100.json',
        粤西地区: '../../../../static/map/json/siDaBanKuai/448200.json',
        粤东地区: '../../../../static/map/json/siDaBanKuai/448300.json',
        粤北地区: '../../../../static/map/json/siDaBanKuai/448400.json',
        一核: '../../../../static/map/json/yidaiyiheyiqu/449100.json',
        一带: '../../../../static/map/json/yidaiyiheyiqu/449200.json',
        一区: '../../../../static/map/json/yidaiyiheyiqu/449300.json',
        广州市: '../../../../static/map/json/province/440100.json',
        韶关市: '../../../../static/map/json/province/440200.json',
        深圳市: '../../../../static/map/json/province/440300.json',
        珠海市: '../../../../static/map/json/province/440400.json',
        汕头市: '../../../../static/map/json/province/440500.json',
        佛山市: '../../../../static/map/json/province/440600.json',
        江门市: '../../../../static/map/json/province/440700.json',
        湛江市: '../../../../static/map/json/province/440800.json',
        茂名市: '../../../../static/map/json/province/440900.json',
        肇庆市: '../../../../static/map/json/province/441200.json',
        惠州市: '../../../../static/map/json/province/441300.json',
        梅州市: '../../../../static/map/json/province/441400.json',
        汕尾市: '../../../../static/map/json/province/441500.json',
        河源市: '../../../../static/map/json/province/441600.json',
        阳江市: '../../../../static/map/json/province/441700.json',
        清远市: '../../../../static/map/json/province/441800.json',
        东莞市: '../../../../static/map/json/province/441900.json',
        中山市: '../../../../static/map/json/province/442000.json',
        潮州市: '../../../../static/map/json/province/445100.json',
        揭阳市: '../../../../static/map/json/province/445200.json',
        云浮市: '../../../../static/map/json/province/445300.json'
      },

      allDataFirst: [
        { name: '一核', city: '449100', value: 100 },
        { name: '一带', city: '449200', value: 200 },
        { name: '一区', city: '449300', value: 300 }
      ],
      allDataSecond: [
        { name: '广州市', city: '440100', value: 25 },
        { name: '韶关市', city: '440200', value: 35 },
        { name: '深圳市', city: '440300', value: 15 },
        { name: '珠海市', city: '440400', value: 5 },
        { name: '汕头市', city: '440500', value: 5 },
        { name: '佛山市', city: '440600', value: 35 },
        { name: '江门市', city: '440700', value: 45 },
        { name: '湛江市', city: '440800', value: 5 },
        { name: '茂名市', city: '440900', value: 35 },
        { name: '肇庆市', city: '441200', value: 5 },
        { name: '惠州市', city: '441300', value: 5 },
        { name: '梅州市', city: '441400', value: 35 },
        { name: '汕尾市', city: '441500', value: 45 },
        { name: '河源市', city: '441600', value: 15 },
        { name: '阳江市', city: '441700', value: 5 },
        { name: '清远市', city: '441800', value: 15 },
        { name: '东莞市', city: '441900', value: 45 },
        { name: '中山市', city: '442000', value: 15 },
        { name: '潮州市', city: '445100', value: 45 },
        { name: '揭阳市', city: '445200', value: 25 },
        { name: '云浮市', city: '445300', value: 15 }
      ],
      allDataSecondOther: [
        { name: '广州市', city: '440100', value: 12 },
        { name: '韶关市', city: '440200', value: 15 },
        { name: '深圳市', city: '440300', value: 13 },
        { name: '珠海市', city: '440400', value: 11 },
        { name: '汕头市', city: '440500', value: 11 },
        { name: '佛山市', city: '440600', value: 12 },
        { name: '江门市', city: '440700', value: 14 },
        { name: '湛江市', city: '440800', value: 15 },
        { name: '茂名市', city: '440900', value: 14 },
        { name: '肇庆市', city: '441200', value: 14 },
        { name: '惠州市', city: '441300', value: 11 },
        { name: '梅州市', city: '441400', value: 15 },
        { name: '汕尾市', city: '441500', value: 15 },
        { name: '河源市', city: '441600', value: 15 },
        { name: '阳江市', city: '441700', value: 15 },
        { name: '清远市', city: '441800', value: 15 },
        { name: '东莞市', city: '441900', value: 12 },
        { name: '中山市', city: '442000', value: 11 },
        { name: '潮州市', city: '445100', value: 14 },
        { name: '揭阳市', city: '445200', value: 14 },
        { name: '云浮市', city: '445300', value: 15 }
      ],
      allDataThird: [
        { name: '珠江三角洲', city: '448100', value: 100 },
        { name: '粤西地区', city: '448200', value: 200 },
        { name: '粤东地区', city: '448300', value: 300 },
        { name: '粤北地区', city: '448400', value: 400 }
      ],
      guangzhouData: [
        { areaCode: '440103', value: 25, name: '荔湾区' },
        { areaCode: '440104', value: 25, name: '越秀区' },
        { areaCode: '440105', value: 25, name: '海珠区' },
        { areaCode: '440106', value: 25, name: '天河区' },
        { areaCode: '440111', value: 25, name: '白云区' },
        { areaCode: '440112', value: 25, name: '黄埔区' },
        { areaCode: '440113', value: 25, name: '番禺区' },
        { areaCode: '440114', value: 25, name: '花都区' },
        { areaCode: '440115', value: 25, name: '南沙区' },
        { areaCode: '440117', value: 25, name: '从化区' },
        { areaCode: '440118', value: 25, name: '增城区' }
      ],
      shaoguanData: [
        { areaCode: '440203', value: 35, name: '武江区' },
        { areaCode: '440204', value: 35, name: '浈江区' },
        { areaCode: '440205', value: 35, name: '曲江区' },
        { areaCode: '440222', value: 35, name: '始兴县' },
        { areaCode: '440224', value: 35, name: '仁化县' },
        { areaCode: '440229', value: 35, name: '翁源县' },
        { areaCode: '440232', value: 35, name: '乳源瑶族自治县' },
        { areaCode: '440233', value: 35, name: '新丰县' },
        { areaCode: '440281', value: 35, name: '乐昌市' },
        { areaCode: '440282', value: 35, name: '南雄市' }
      ],
      shenzhenData: [
        { areaCode: '440303', value: 15, name: '罗湖区' },
        { areaCode: '440304', value: 15, name: '福田区' },
        { areaCode: '440305', value: 15, name: '南山区' },
        { areaCode: '440306', value: 15, name: '宝安区' },
        { areaCode: '440307', value: 15, name: '龙岗区' },
        { areaCode: '440308', value: 15, name: '盐田区' },
        { areaCode: '440309', value: 15, name: '龙华区' },
        { areaCode: '440310', value: 15, name: '坪山区' },
        { areaCode: '440311', value: 15, name: '光明区' }
      ],
      zhuhaiData: [
        { areaCode: '440402', value: 5, name: '香洲区' },
        { areaCode: '440403', value: 5, name: '斗门区' },
        { areaCode: '440404', value: 5, name: '金湾区' }
      ],
      shantouData: [
        { areaCode: '440507', value: 5, name: '龙湖区' },
        { areaCode: '440511', value: 5, name: '金平区' },
        { areaCode: '440512', value: 5, name: '濠江区' },
        { areaCode: '440513', value: 5, name: '潮阳区' },
        { areaCode: '440514', value: 5, name: '潮南区' },
        { areaCode: '440515', value: 5, name: '澄海区' },
        { areaCode: '440523', value: 5, name: '南澳县' }
      ],
      foshanData: [
        { areaCode: '440604', value: 35, name: '禅城区' },
        { areaCode: '440605', value: 35, name: '南海区' },
        { areaCode: '440606', value: 35, name: '顺德区' },
        { areaCode: '440607', value: 35, name: '三水区' },
        { areaCode: '440608', value: 35, name: '高明区' }
      ],
      jiangmenData: [
        { areaCode: '440703', value: 45, name: '蓬江区' },
        { areaCode: '440704', value: 45, name: '江海区' },
        { areaCode: '440705', value: 45, name: '新会区' },
        { areaCode: '440781', value: 45, name: '台山市' },
        { areaCode: '440783', value: 45, name: '开平市' },
        { areaCode: '440784', value: 45, name: '鹤山市' },
        { areaCode: '440785', value: 45, name: '恩平市' }
      ],
      zhanjiangData: [
        { areaCode: '440802', value: 5, name: '赤坎区' },
        { areaCode: '440803', value: 5, name: '霞山区' },
        { areaCode: '440804', value: 5, name: '坡头区' },
        { areaCode: '440811', value: 5, name: '麻章区' },
        { areaCode: '440823', value: 5, name: '遂溪县' },
        { areaCode: '440825', value: 5, name: '徐闻县' },
        { areaCode: '440881', value: 5, name: '廉江市' },
        { areaCode: '440882', value: 5, name: '雷州市' },
        { areaCode: '440883', value: 5, name: '吴川市' }
      ],
      maomingData: [
        { areaCode: '440902', value: 35, name: '茂南区' },
        { areaCode: '440904', value: 35, name: '电白区' },
        { areaCode: '440981', value: 35, name: '高州市' },
        { areaCode: '440982', value: 35, name: '化州市' },
        { areaCode: '440983', value: 35, name: '信宜市' }
      ],
      zhaoqingData: [
        { areaCode: '441202', value: 5, name: '端州区' },
        { areaCode: '441203', value: 5, name: '鼎湖区' },
        { areaCode: '441204', value: 5, name: '高要区' },
        { areaCode: '441223', value: 5, name: '广宁县' },
        { areaCode: '441224', value: 5, name: '怀集县' },
        { areaCode: '441225', value: 5, name: '封开县' },
        { areaCode: '441226', value: 5, name: '德庆县' },
        { areaCode: '441284', value: 5, name: '四会市' }
      ],
      huizhouData: [
        { areaCode: '441302', value: 5, name: '惠城区' },
        { areaCode: '441303', value: 5, name: '惠阳区' },
        { areaCode: '441322', value: 5, name: '博罗县' },
        { areaCode: '441323', value: 5, name: '惠东县' },
        { areaCode: '441324', value: 5, name: '龙门县' }
      ],
      meizhouData: [
        { areaCode: '441402', value: 35, name: '梅江区' },
        { areaCode: '441403', value: 35, name: '梅县区' },
        { areaCode: '441422', value: 35, name: '大埔县' },
        { areaCode: '441423', value: 35, name: '丰顺县' },
        { areaCode: '441424', value: 35, name: '五华县' },
        { areaCode: '441426', value: 35, name: '平远县' },
        { areaCode: '441427', value: 35, name: '蕉岭县' },
        { areaCode: '441481', value: 35, name: '兴宁市' }
      ],
      shanweiData: [
        { areaCode: '441502', value: 45, name: '城区' },
        { areaCode: '441521', value: 45, name: '海丰县' },
        { areaCode: '441523', value: 45, name: '陆河县' },
        { areaCode: '441581', value: 45, name: '陆丰市' }
      ],
      heyuanData: [
        { areaCode: '441602', value: 15, name: '源城区' },
        { areaCode: '441621', value: 15, name: '紫金县' },
        { areaCode: '441622', value: 15, name: '龙川县' },
        { areaCode: '441623', value: 15, name: '连平县' },
        { areaCode: '441624', value: 15, name: '和平县' },
        { areaCode: '441625', value: 15, name: '东源县' }
      ],
      yangjiangData: [
        { areaCode: '441702', value: 5, name: '江城区' },
        { areaCode: '441704', value: 5, name: '阳东区' },
        { areaCode: '441721', value: 5, name: '阳西县' },
        { areaCode: '441781', value: 5, name: '阳春市' }
      ],
      qingyuanData: [
        { areaCode: '441802', value: 15, name: '清城区' },
        { areaCode: '441803', value: 15, name: '清新区' },
        { areaCode: '441821', value: 15, name: '佛冈县' },
        { areaCode: '441823', value: 15, name: '阳山县' },
        { areaCode: '441881', value: 15, name: '英德市' },
        { areaCode: '441882', value: 15, name: '连州市' },
        { areaCode: '441826', value: 15, name: '连南瑶族自治县' },
        { areaCode: '441825', value: 15, name: '连山壮族瑶族自治县' }
      ],
      dongguanData: [{ areaCode: '441900', value: 45, name: '东莞' }],
      zhongshanData: [{ areaCode: '442000', value: 15, name: '中山' }],
      chaozhouData: [
        { areaCode: '445102', value: 45, name: '湘桥区' },
        { areaCode: '445103', value: 45, name: '潮安区' },
        { areaCode: '445122', value: 45, name: '饶平县' }
      ],
      jieyangData: [
        { areaCode: '445202', value: 25, name: '榕城区' },
        { areaCode: '445203', value: 25, name: '揭东区' },
        { areaCode: '445222', value: 25, name: '揭西县' },
        { areaCode: '445224', value: 25, name: '惠来县' },
        { areaCode: '445281', value: 25, name: '普宁市' }
      ],
      yunfuData: [
        { areaCode: '445302', value: 15, name: '云城区' },
        { areaCode: '445303', value: 15, name: '云安区' },
        { areaCode: '445321', value: 15, name: '新兴县' },
        { areaCode: '445322', value: 15, name: '郁南县' },
        { areaCode: '445381', value: 15, name: '罗定市' }
      ],

      params: {
        // year: "",
        cantonProvinces: '440000',
        cantonCitys: '',
        cantonAreas: ''
      },
      paramss: {
        year: '',
        cantonProvinces: '440000',
        cantonCitys: '',
        cantonAreas: ''
      },
      nextYear: '',

      // 参数
      clickCity: '', // 获取市id
      clickAreaName: '', // 获取区name

      topPlanList: [],
      bottomPlanList: [],
      topDetectionList: [],
      bottomDetectionList: [],

      currentTab: 0,
      word: '',

      nowTime: moment().year(),
      nextTime: Number(moment().year()) + Number(1),

      screenWidth: ''
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    turnMap () { },
    turnFirst () {
      sessionStorage.removeItem('indexCity')
      sessionStorage.removeItem('indexArea')
      this.currentTab = 0
      // this.chartSecond.clear();
      // this.chartThird.clear();
      this.clickCity = ''
      this.clickAreaName = ''
      this.changeMapFirst()
    },
    turnSecond () {
      sessionStorage.removeItem('indexCity')
      sessionStorage.removeItem('indexArea')
      this.currentTab = 1
      // this.chartFirst.clear();
      // this.chartThird.clear();
      this.clickCity = ''
      this.clickAreaName = ''
      this.changeMapSecond()
    },
    turnThird () {
      sessionStorage.removeItem('indexCity')
      sessionStorage.removeItem('indexArea')
      this.currentTab = 2
      // this.chartFirst.clear();
      // this.chartSecond.clear();
      this.clickCity = ''
      this.clickAreaName = ''
      this.changeMapThird()
    },
    turnMap () {
      this.currentTab = 3
    },
    getSearchData () {
      if (this.word == '') return
      let title = '搜索页'
      let routerPath = `SearchList?word=${this.word}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    async getTopPlanningValue () {
      // let params = this.paramss
      // params['year'] = this.nextTime
      let params = this.params
      params['year'] = moment().year()
      let res = await this.$get(
        '/epf-index-model/bigScreen/getMonitorIndicator',
        params
      )
      this.topPlanList = res.result
      for (var key in this.topPlanList) {
        if (this.topPlanList[key].planningValue == null) {
          let index = key
          this.topPlanList[index]['selectValue'] = '_ _'
          this.topPlanList[index]['selectYear'] = this.topPlanList[
            index
          ].indexYear
        } else {
          if (this.topPlanList[key].planningValue == 0) {
            let index = key
            this.topPlanList[index]['selectValue'] = '- -'
            this.topPlanList[index]['selectYear'] = this.topPlanList[
              index
            ].indexYear
          } else {
            let index = key
            this.topPlanList[index]['selectValue'] = Number(
              this.topPlanList[index].planningValue
            ).toFixed(2)
            this.topPlanList[index]['selectValue'] = Number(
              this.topPlanList[index]['selectValue']
            ).toLocaleString()
            console.log(this.topPlanList[index]['selectValue'])
            this.topPlanList[index]['selectYear'] = this.topPlanList[
              index
            ].indexYear
          }
        }

        // if (this.topPlanList[key].dataType == 1) {
        //   let index = key;
        //   this.topPlanList[index]["selectValue"] = Number(
        //     this.topPlanList[index].planningValue
        //   ).toFixed(2);
        //   this.topPlanList[index]["selectYear"] = this.topPlanList[
        //     index
        //   ].indexYear;
        // } else if (this.topPlanList[key].dataType == 2) {
        //   let index = key;
        //   this.topPlanList[index]["selectValue"] = Number(
        //     this.topPlanList[index].detectionValue
        //   ).toFixed(2);
        //   this.topPlanList[index]["selectYear"] = this.topPlanList[index].year;
        // } else if (this.topPlanList[key].dataType == 0) {
        //   let index = key;
        //   this.topPlanList[index]["selectValue"] = Number(
        //     this.topPlanList[index].planningValue
        //   ).toFixed(2);
        // } else if (this.topPlanList[key].dataType == null) {
        //   let index = key;
        //   this.topPlanList[index]["selectValue"] = "_ _";
        // }
      }
    },
    async getBottomPlanningValue () {
      let params = this.params
      params['year'] = moment().year()
      let res = await this.$get(
        '/epf-index-model/bigScreen/getMonitorIndicatorDetail',
        params
      )
      this.bottomPlanList = res.result
      for (var key in this.bottomPlanList) {
        // if (this.bottomPlanList[key].planningValue == null) {
        //   let index = key
        //   this.bottomPlanList[index].planningValue = '_ _'
        // }
        // this.bottomPlanList[key].planningValue=Number(this.bottomPlanList[key].planningValue).toFixed(2);
        if (this.bottomPlanList[key].dataType == 1) {
          let index = key
          this.bottomPlanList[index]['selectValue'] = Number(
            this.bottomPlanList[index].planningValue
          ).toFixed(2)
          this.bottomPlanList[index]['selectValue'] = Number(
            this.bottomPlanList[index]['selectValue']
          ).toLocaleString()
          this.bottomPlanList[index]['selectYear'] = this.bottomPlanList[
            index
          ].indexYear
        } else if (this.bottomPlanList[key].dataType == 2) {
          let index = key
          this.bottomPlanList[index]['selectValue'] = Number(
            this.bottomPlanList[index].detectionValue
          ).toFixed(2)
          this.bottomPlanList[index]['selectValue'] = Number(
            this.bottomPlanList[index]['selectValue']
          ).toLocaleString()
          this.bottomPlanList[index]['selectYear'] = this.bottomPlanList[
            index
          ].year
        } else if (this.bottomPlanList[key].dataType == 0) {
          let index = key
          this.bottomPlanList[index]['selectValue'] = Number(
            this.bottomPlanList[index].detectionValue
          ).toFixed(2)
          this.bottomPlanList[index]['selectValue'] = Number(
            this.bottomPlanList[index]['selectValue']
          ).toLocaleString()
          this.bottomPlanList[index]['selectYear'] = this.bottomPlanList[
            index
          ].indexYear
        } else if (this.bottomPlanList[key].dataType == null) {
          let index = key
          this.bottomPlanList[index]['selectValue'] = '_ _'
          this.bottomPlanList[index]['selectYear'] = this.bottomPlanList[
            index
          ].indexYear
        }

        if (this.bottomPlanList[key].name == '年度计划指标使用进度') {
          let index = key
          this.bottomPlanList.splice(index, 1)
          this.bottomPlanList[index]['selectValue'] = Number(
            this.bottomPlanList[index].detectionValue
          ).toFixed(2)
          this.bottomPlanList[index]['selectValue'] = Number(
            this.bottomPlanList[index]['selectValue']
          ).toLocaleString()
          this.bottomPlanList[index]['selectYear'] = this.bottomPlanList[
            index
          ].year
        }
      }

      for (var key in this.bottomPlanList) {
        if (this.bottomPlanList[key].detectionValue == 0) {
          let index = key
          this.bottomPlanList[index]['selectValue'] = '- -'
        }
      }
      console.log(this.bottomPlanList)
    },
    async getTopDetectionValue () {
      let params = this.params
      params['year'] = moment().year()
      let res = await this.$get(
        '/epf-index-model/bigScreen/getCurrentSituation',
        params
      )
      this.topDetectionList = res.result
      for (var key in this.topDetectionList) {
        // if (this.topDetectionList[key].detectionValue == null) {
        //   let index = key
        //   this.topDetectionList[index].detectionValue = '_ _'
        // }
        // this.topDetectionList[key].detectionValue=Number(this.topDetectionList[key].detectionValue).toFixed(2);
        if (this.topDetectionList[key].detectionValue == null) {
          let index = key
          this.topDetectionList[index]['selectValue'] = '- -'
          this.topDetectionList[index]['selectYear'] = this.topDetectionList[
            index
          ].year
        } else {
          if (this.topDetectionList[key].detectionValue == 0) {
            let index = key
            this.topDetectionList[index]['selectValue'] = '- -'
            this.topDetectionList[index]['selectYear'] = this.topDetectionList[
              index
            ].year
          } else {
            let index = key
            this.topDetectionList[index]['selectValue'] = Number(
              this.topDetectionList[index].detectionValue
            ).toFixed(2)
            this.topDetectionList[index]['selectValue'] = Number(
              this.topDetectionList[index]['selectValue']
            ).toLocaleString()
            this.topDetectionList[index]['selectYear'] = this.topDetectionList[
              index
            ].year
          }
        }

        // if (this.topDetectionList[key].dataType == 1) {
        //   let index = key;
        //   this.topDetectionList[index]["selectValue"] = Number(
        //     this.topDetectionList[index].planningValue
        //   ).toFixed(2);
        //   this.topDetectionList[index]["selectYear"] = this.topDetectionList[
        //     index
        //   ].indexYear;
        // } else if (this.topDetectionList[key].dataType == 2) {
        //   let index = key;
        //   this.topDetectionList[index]["selectValue"] = Number(
        //     this.topDetectionList[index].detectionValue
        //   ).toFixed(2);
        //   this.topDetectionList[index]["selectYear"] = this.topDetectionList[
        //     index
        //   ].year;
        // } else if (this.topDetectionList[key].dataType == 0) {
        //   let index = key;
        //   this.topDetectionList[index]["selectValue"] = Number(
        //     this.topDetectionList[index].detectionValue
        //   ).toFixed(2);
        // } else if (this.topDetectionList[key].dataType == null) {
        //   let index = key;
        //   this.topDetectionList[index]["selectValue"] = "_ _";
        // }
      }
    },
    async getBottomDetectionValue () {
      let params = this.params
      params['year'] = moment().year()
      let res = await this.$get(
        '/epf-index-model/bigScreen/getCurrentSituationDetail',
        params
      )
      this.bottomDetectionList = res.result
      for (var key in this.bottomDetectionList) {
        // if (this.bottomDetectionList[key].detectionValue == null) {
        //   let index = key
        //   this.bottomDetectionList[index].detectionValue = '_ _'
        // }
        // this.bottomDetectionList[key].detectionValue=Number(this.bottomDetectionList[key].detectionValue).toFixed(2);
        if (this.bottomDetectionList[key].dataType == 1) {
          let index = key
          this.bottomDetectionList[index]['selectValue'] = Number(
            this.bottomDetectionList[index].planningValue
          ).toFixed(2)
          this.bottomDetectionList[index]['selectValue'] = Number(
            this.bottomDetectionList[index]['selectValue']
          ).toLocaleString()
          this.bottomDetectionList[index][
            'selectYear'
          ] = this.bottomDetectionList[index].indexYear
        } else if (this.bottomDetectionList[key].dataType == 2) {
          let index = key
          this.bottomDetectionList[index]['selectValue'] = Number(
            this.bottomDetectionList[index].detectionValue
          ).toFixed(2)
          this.bottomDetectionList[index]['selectValue'] = Number(
            this.bottomDetectionList[index]['selectValue']
          ).toLocaleString()
          this.bottomDetectionList[index][
            'selectYear'
          ] = this.bottomDetectionList[index].year
        } else if (this.bottomDetectionList[key].dataType == 0) {
          let index = key
          this.bottomDetectionList[index]['selectValue'] = Number(
            this.bottomDetectionList[index].detectionValue
          ).toFixed(2)
          this.bottomDetectionList[index]['selectValue'] = Number(
            this.bottomDetectionList[index]['selectValue']
          ).toLocaleString()
          this.bottomDetectionList[index][
            'selectYear'
          ] = this.bottomDetectionList[index].year
        } else if (this.bottomDetectionList[key].dataType == null) {
          let index = key
          this.bottomDetectionList[index]['selectValue'] = '- -'
          this.bottomDetectionList[index][
            'selectYear'
          ] = this.bottomDetectionList[index].year
        }
      }

      for (var key in this.bottomDetectionList) {
        if (this.bottomDetectionList[key].detectionValue == 0) {
          let index = key
          this.bottomDetectionList[index]['selectValue'] = '- -'
        }
      }
    },
    // 一带一核一区地图展示
    async loadMapFirst (mapCode, name) {
      setTimeout(() => {
        document.getElementById('mapFirst').style.width = 100 + '%'
        document.getElementById('mapFirst').style.height = 100 + '%'
        this.chartFirst = echarts.init(this.$refs.mapChartFirst)
        this.chartFirst.resize() // 直接加这句即可
      }, 0)

      const that = this
      const data = await axios.get(mapCode)

      let mapFirstData = []
      console.log(this.clickCity)
      if (this.clickCity === '') {
        mapFirstData = this.allDataFirst
      } else if (this.clickCity === '449100') {
        mapFirstData = this.allDataSecond
      } else if (this.clickCity === '449200') {
        mapFirstData = this.allDataSecond
      } else if (this.clickCity === '449300') {
        mapFirstData = this.allDataSecond
      } else if (this.clickCity === '440100') {
        mapFirstData = this.guangzhouData
      } else if (this.clickCity === '440200') {
        mapFirstData = this.shaoguanData
      } else if (this.clickCity === '440300') {
        mapFirstData = this.shenzhenData
      } else if (this.clickCity === '440400') {
        mapFirstData = this.zhuhaiData
      } else if (this.clickCity === '440500') {
        mapFirstData = this.shantouData
      } else if (this.clickCity === '440600') {
        mapFirstData = this.foshanData
      } else if (this.clickCity === '440700') {
        mapFirstData = this.jiangmenData
      } else if (this.clickCity === '440800') {
        mapFirstData = this.zhanjiangData
      } else if (this.clickCity === '440900') {
        mapFirstData = this.maomingData
      } else if (this.clickCity === '441200') {
        mapFirstData = this.zhaoqingData
      } else if (this.clickCity === '441300') {
        mapFirstData = this.huizhouData
      } else if (this.clickCity === '441400') {
        mapFirstData = this.meizhouData
      } else if (this.clickCity === '441500') {
        mapFirstData = this.shanweiData
      } else if (this.clickCity === '441600') {
        mapFirstData = this.heyuanData
      } else if (this.clickCity === '441700') {
        mapFirstData = this.yangjiangData
      } else if (this.clickCity === '441800') {
        mapFirstData = this.qingyuanData
      } else if (this.clickCity === '441900') {
        mapFirstData = this.dongguanData
      } else if (this.clickCity === '442000') {
        mapFirstData = this.zhongshanData
      } else if (this.clickCity === '445100') {
        mapFirstData = this.chaozhouData
      } else if (this.clickCity === '445200') {
        mapFirstData = this.jieyangData
      } else if (this.clickCity === '445300') {
        mapFirstData = this.yunfuData
      }
      if (data) {
        this.chartFirst = echarts.init(this.$refs.mapChartFirst)
        echarts.registerMap(name, data)

        var option1 = {
          visualMap: {
            type: 'piecewise', // 分段型。
            splitNumber: 3,
            inverse: true,

            pieces: [
              {
                min: 90,
                max: 110,
                label: '一核',
                color: 'rgba(10, 76, 172, 0.8)'
              },
              {
                min: 190,
                max: 210,
                label: '一带',
                color: 'rgba(3, 137, 221, 0.8)'
              },
              {
                min: 290,
                max: 310,
                label: '一区',
                color: '#59E8FF'
              }
            ],
            right: '3%',
            bottom: '3%',
            textStyle: {
              color: '#303030',
              fontSize: 18
            }
          },
          series: [
            {
              name: 'MAP',
              type: 'map',
              // roam: true, //禁止缩放
              mapType: name,
              // top:100,
              // left:100,
              aspectScale: 1,
              // layoutCenter: ['65%', '47%'], // 距离左右，上下距离的百分比
              // layoutSize: 510,
              center: [113.280637, 23.125178],
              selectedMode: 'false', // 是否允许选中多个区域
              label: {
                normal: {
                  show: false,
                  fontSize: '20',
                  fontWeight: 'bold'
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  // borderColor: "#b2b1a4",
                  // borderWidth: 1
                }, // 正常样式
                emphasis: {
                  areaColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#5276f1',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#FF8C00'
                    }
                  }
                } // 鼠标事件区块样式
              },
              data: mapFirstData,
              zoom: 1.025
            }
          ]
        }
        var option2 = {
          visualMap: {
            show: false,
            type: 'piecewise', // 分段型。
            splitNumber: 3,
            inverse: true,

            pieces: [
              {
                min: 1,
                max: 9,
                label: '绿色区域',
                color: '#a7c094'
              },
              {
                min: 11,
                max: 19,
                label: '深红色区域',
                color: '#e0ae99'
              },
              {
                min: 21,
                max: 29,
                label: '粉红色区域',
                color: '#e1a4c0'
              },
              {
                min: 31,
                max: 39,
                label: '紫色区域',
                color: '#beafcd'
              },
              {
                min: 41,
                max: 49,
                label: '黄色区域',
                color: '#ede19e'
              }
            ],
            right: '3%',
            bottom: '3%',
            textStyle: {
              color: '#303030',
              fontSize: 18
            }
          },
          series: [
            {
              name: 'MAP',
              type: 'map',
              // roam: true, //禁止缩放
              mapType: name,
              // top:100,
              // left:100,
              // layoutCenter: ['62%', '45%'],//距离左右，上下距离的百分比
              // layoutSize:550,
              aspectScale: 1,
              selectedMode: 'false', // 是否允许选中多个区域
              label: {
                normal: {
                  show: true,
                  fontSize: '16'
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  // borderColor: "#b2b1a4",
                  borderWidth: 2,
                  borderColor: '#9874ac'
                }, // 正常样式
                emphasis: {
                  areaColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#5276f1',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#FF8C00'
                    }
                  }
                } // 鼠标事件区块样式
              },
              zoom: 1.1,
              data: mapFirstData
            }
          ]
        }
        // this.chartFirst.hideLoading(); // 关闭提示

        if (this.clickCity == '') {
          this.chartFirst.setOption(option1, true)
        } else if (this.clickCity != '') {
          this.chartFirst.setOption(option2, true)
        }
        this.chartFirst.on('click', function (params) {
          console.log(params)
          if (params.data) {
            sessionStorage.setItem('indexCity', params.data.city)
          }
          sessionStorage.setItem('indexArea', params.data.name)
          that.clickCity = sessionStorage.getItem('indexCity')
          that.clickAreaName = sessionStorage.getItem('indexArea')

          clearTimeout(this.timeFnFirst)
          this.timeFnFirst = setTimeout(function () {
            const name = params.name
            console.log(params.name)
            const mapCode = that.pro[name]

            if (!mapCode) {
              console.log('1')
              return
            }

            that.loadMapFirst(mapCode, name)

            setTimeout(() => {
              document.getElementById('mapFirst').style.width = 100 + '%'
              document.getElementById('mapFirst').style.height = 100 + '%'
            }, 0)
          }, 250)
        })
      } else {
        alert('无法加载该地图')
      }
    },
    // 行政区地图展示
    async loadMapSecond (mapCode, name) {
      setTimeout(() => {
        document.getElementById('mapSecond').style.width = 100 + '%'
        document.getElementById('mapSecond').style.height = 100 + '%'
        this.chartSecond = echarts.init(this.$refs.mapChartSecond)
        this.chartSecond.resize() // 直接加这句即可
      }, 0)

      const that = this
      const data = await axios.get(mapCode)

      let mapSecondData = []
      console.log(this.clickCity)
      if (this.clickCity === '') {
        mapSecondData = this.allDataSecondOther
      } else if (this.clickCity === '440100') {
        mapSecondData = this.guangzhouData
      } else if (this.clickCity === '440200') {
        mapSecondData = this.shaoguanData
      } else if (this.clickCity === '440300') {
        mapSecondData = this.shenzhenData
      } else if (this.clickCity === '440400') {
        mapSecondData = this.zhuhaiData
      } else if (this.clickCity === '440500') {
        mapSecondData = this.shantouData
      } else if (this.clickCity === '440600') {
        mapSecondData = this.foshanData
      } else if (this.clickCity === '440700') {
        mapSecondData = this.jiangmenData
      } else if (this.clickCity === '440800') {
        mapSecondData = this.zhanjiangData
      } else if (this.clickCity === '440900') {
        mapSecondData = this.maomingData
      } else if (this.clickCity === '441200') {
        mapSecondData = this.zhaoqingData
      } else if (this.clickCity === '441300') {
        mapSecondData = this.huizhouData
      } else if (this.clickCity === '441400') {
        mapSecondData = this.meizhouData
      } else if (this.clickCity === '441500') {
        mapSecondData = this.shanweiData
      } else if (this.clickCity === '441600') {
        mapSecondData = this.heyuanData
      } else if (this.clickCity === '441700') {
        mapSecondData = this.yangjiangData
      } else if (this.clickCity === '441800') {
        mapSecondData = this.qingyuanData
      } else if (this.clickCity === '441900') {
        mapSecondData = this.dongguanData
      } else if (this.clickCity === '442000') {
        mapSecondData = this.zhongshanData
      } else if (this.clickCity === '445100') {
        mapSecondData = this.chaozhouData
      } else if (this.clickCity === '445200') {
        mapSecondData = this.jieyangData
      } else if (this.clickCity === '445300') {
        mapSecondData = this.yunfuData
      }

      if (data) {
        this.chartSecond = echarts.init(this.$refs.mapChartSecond)
        echarts.registerMap(name, data)

        var option1 = {
          visualMap: {
            // 颜色的设置  dataRange
            show: false,
            itemWidth: 14,
            itemHeight: 14,
            bottom: 60,
            left: 10,
            inverse: 'true', // 控制高低的位置
            orient: 'horizontal', // 控制导航的方向
            splitList: [
              {
                start: 14,
                end: 15,
                color: '#59E8FF'
              },
              {
                start: 13,
                end: 14,
                color: '#50baf9'
              },
              {
                start: 12,
                end: 13,
                color: '#001671'
              },
              {
                start: 11,
                end: 12,
                color: '#0a4cac'
              },
              {
                start: 11,
                end: 10,
                color: '#0389dd'
              },
              {
                start: 10,
                end: 0,
                color: '#0389dd'
              }
              // { end: 11, color: "#fb8c57" }
            ],
            text: ['高', '低'] // 文本，默认为数值文本
          },
          series: [
            {
              name: 'MAP',
              type: 'map',
              // roam: true, //禁止缩放
              mapType: name,
              aspectScale: 1,
              center: [113.280637, 23.125178],
              selectedMode: 'false', // 是否允许选中多个区域
              label: {
                normal: {
                  show: false,
                  fontSize: '20',
                  fontWeight: 'bold'
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  // borderColor: "#b2b1a4",
                  // borderWidth: 2,
                  // borderColor: "#9874ac"
                }, // 正常样式
                emphasis: {
                  areaColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#5276f1',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#FF8C00'
                    }
                  }
                } // 鼠标事件区块样式
              },
              zoom: 1.1,
              data: mapSecondData
            }
          ]
        }
        var option2 = {
          visualMap: {
            // 颜色的设置  dataRange
            show: false,
            itemWidth: 14,
            itemHeight: 14,
            bottom: 60,
            left: 10,
            inverse: 'true', // 控制高低的位置
            orient: 'horizontal', // 控制导航的方向
            splitList: [
              {
                min: 1,
                max: 9,
                label: '绿色区域',
                color: '#a7c094'
              },
              {
                min: 11,
                max: 19,
                label: '深红色区域',
                color: '#e0ae99'
              },
              {
                min: 21,
                max: 29,
                label: '粉红色区域',
                color: '#e1a4c0'
              },
              {
                min: 31,
                max: 39,
                label: '紫色区域',
                color: '#beafcd'
              },
              {
                min: 41,
                max: 49,
                label: '黄色区域',
                color: '#ede19e'
              }
              // { end: 11, color: "#fb8c57" }
            ],
            text: ['高', '低'] // 文本，默认为数值文本
          },
          series: [
            {
              name: 'MAP',
              type: 'map',
              // roam: true, //禁止缩放
              mapType: name,
              aspectScale: 1,
              selectedMode: 'false', // 是否允许选中多个区域
              label: {
                normal: {
                  show: true,
                  fontSize: '16'
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  // borderColor: "#b2b1a4",
                  borderWidth: 2,
                  borderColor: '#9874ac'
                }, // 正常样式
                emphasis: {
                  areaColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#5276f1',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#FF8C00'
                    }
                  }
                } // 鼠标事件区块样式
              },
              zoom: 1.1,
              data: mapSecondData
            }
          ]
        }
        // this.chartSecond.hideLoading(); // 关闭提示
        // this.chartSecond.setOption(option, true);
        if (this.clickCity == '') {
          this.chartSecond.setOption(option1, true)
        } else if (this.clickCity != '') {
          this.chartSecond.setOption(option2, true)
        }
        this.chartSecond.on('click', function (params) {
          console.log(params)
          sessionStorage.setItem('indexCity', params.data.city)
          sessionStorage.setItem('indexArea', params.data.name)

          that.clickCity = sessionStorage.getItem('indexCity')
          that.clickAreaName = sessionStorage.getItem('indexArea')

          clearTimeout(this.timeFnSecond)
          this.timeFnSecond = setTimeout(function () {
            const name = params.name
            const mapCode = that.pro[name]
            console.log(mapCode)
            if (!mapCode) {
              console.log('1')
              return
            }

            // if (mapCode != "") {
            that.loadMapSecond(mapCode, name)

            setTimeout(() => {
              document.getElementById('mapSecond').style.width = 100 + '%'
              document.getElementById('mapSecond').style.height = 100 + '%'
            }, 0)
            // that.isCity = true;
            // that.breadcrumbCityName = name;
            // }
          }, 250)
        })
      } else {
        alert('无法加载该地图')
      }
    },
    // 四大板块地图展示
    async loadMapThird (mapCode, name) {
      setTimeout(() => {
        document.getElementById('mapThird').style.width = 100 + '%'
        document.getElementById('mapThird').style.height = 100 + '%'
        this.chartThird = echarts.init(this.$refs.mapChartThird)
        this.chartThird.resize() // 直接加这句即可
      }, 0)

      const that = this
      const data = await axios.get(mapCode)

      let mapThirdData = []
      console.log(this.clickCity)
      if (this.clickCity === '') {
        mapThirdData = this.allDataThird
      } else if (this.clickCity === '448100') {
        mapThirdData = this.allDataSecond
      } else if (this.clickCity === '448200') {
        mapThirdData = this.allDataSecond
      } else if (this.clickCity === '448300') {
        mapThirdData = this.allDataSecond
      } else if (this.clickCity === '448400') {
        mapThirdData = this.allDataSecond
      } else if (this.clickCity === '440100') {
        mapThirdData = this.guangzhouData
      } else if (this.clickCity === '440200') {
        mapThirdData = this.shaoguanData
      } else if (this.clickCity === '440300') {
        mapThirdData = this.shenzhenData
      } else if (this.clickCity === '440400') {
        mapThirdData = this.zhuhaiData
      } else if (this.clickCity === '440500') {
        mapThirdData = this.shantouData
      } else if (this.clickCity === '440600') {
        mapThirdData = this.foshanData
      } else if (this.clickCity === '440700') {
        mapThirdData = this.jiangmenData
      } else if (this.clickCity === '440800') {
        mapThirdData = this.zhanjiangData
      } else if (this.clickCity === '440900') {
        mapThirdData = this.maomingData
      } else if (this.clickCity === '441200') {
        mapThirdData = this.zhaoqingData
      } else if (this.clickCity === '441300') {
        mapThirdData = this.huizhouData
      } else if (this.clickCity === '441400') {
        mapThirdData = this.meizhouData
      } else if (this.clickCity === '441500') {
        mapThirdData = this.shanweiData
      } else if (this.clickCity === '441600') {
        mapThirdData = this.heyuanData
      } else if (this.clickCity === '441700') {
        mapThirdData = this.yangjiangData
      } else if (this.clickCity === '441800') {
        mapThirdData = this.qingyuanData
      } else if (this.clickCity === '441900') {
        mapThirdData = this.dongguanData
      } else if (this.clickCity === '442000') {
        mapThirdData = this.zhongshanData
      } else if (this.clickCity === '445100') {
        mapThirdData = this.chaozhouData
      } else if (this.clickCity === '445200') {
        mapThirdData = this.jieyangData
      } else if (this.clickCity === '445300') {
        mapThirdData = this.yunfuData
      }
      if (data) {
        this.chartThird = echarts.init(this.$refs.mapChartThird)
        echarts.registerMap(name, data)

        var option1 = {
          visualMap: {
            type: 'piecewise', // 分段型。
            splitNumber: 3,
            inverse: true,

            pieces: [
              {
                min: 90,
                max: 110,
                label: '珠江三角洲',
                color: '#0a4cac'
              },
              {
                min: 190,
                max: 210,
                label: '粤西地区',
                color: '#59E8FF'
              },
              {
                min: 290,
                max: 310,
                label: '粤东地区',
                color: '#50baf9'
              },
              {
                min: 390,
                max: 410,
                label: '粤北地区',
                color: '#0389dd'
              }
            ],
            right: '3%',
            bottom: '3%',
            textStyle: {
              color: '#303030',
              fontSize: 18
            }
          },
          series: [
            {
              name: 'MAP',
              type: 'map',
              // roam: true, //禁止缩放
              mapType: name,
              aspectScale: 1,
              center: [113.280637, 23.125178],
              selectedMode: 'false', // 是否允许选中多个区域
              label: {
                normal: {
                  show: false,
                  fontSize: '20',
                  fontWeight: 'bold'
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  // borderColor: "#b2b1a4",
                  // borderWidth: 1
                }, // 正常样式
                emphasis: {
                  areaColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#5276f1',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#FF8C00'
                    }
                  }
                } // 鼠标事件区块样式
              },
              zoom: 1.1,
              data: mapThirdData
            }
          ]
        }
        var option2 = {
          visualMap: {
            show: false,
            type: 'piecewise', // 分段型。
            splitNumber: 3,
            inverse: true,

            pieces: [
              {
                min: 1,
                max: 9,
                label: '绿色区域',
                color: '#a7c094'
              },
              {
                min: 11,
                max: 19,
                label: '深红色区域',
                color: '#e0ae99'
              },
              {
                min: 21,
                max: 29,
                label: '粉红色区域',
                color: '#e1a4c0'
              },
              {
                min: 31,
                max: 39,
                label: '紫色区域',
                color: '#beafcd'
              },
              {
                min: 41,
                max: 49,
                label: '黄色区域',
                color: '#ede19e'
              }
            ],
            right: '3%',
            bottom: '3%',
            textStyle: {
              color: '#303030',
              fontSize: 18
            }
          },
          series: [
            {
              name: 'MAP',
              type: 'map',
              // roam: true, //禁止缩放
              mapType: name,
              aspectScale: 1,
              selectedMode: 'false', // 是否允许选中多个区域
              label: {
                normal: {
                  show: true,
                  fontSize: '16'
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  // borderColor: "#b2b1a4",
                  borderWidth: 2,
                  borderColor: '#9874ac'
                }, // 正常样式
                emphasis: {
                  areaColor: '#eee',
                  borderWidth: 2,
                  borderColor: '#5276f1',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#FF8C00'
                    }
                  }
                } // 鼠标事件区块样式
              },
              zoom: 1.1,
              data: mapThirdData
            }
          ]
        }
        // this.chartFirst.hideLoading(); // 关闭提示
        // this.chartThird.setOption(option, true);
        if (this.clickCity == '') {
          this.chartThird.setOption(option1, true)
        } else if (this.clickCity != '') {
          this.chartThird.setOption(option2, true)
        }
        this.chartThird.on('click', function (params) {
          console.log(params)
          if (params.data) {
            sessionStorage.setItem('indexCity', params.data.city)
          }
          sessionStorage.setItem('indexArea', params.data.name)
          that.clickCity = sessionStorage.getItem('indexCity')
          that.clickAreaName = sessionStorage.getItem('indexArea')

          clearTimeout(this.timeFnThird)
          this.timeFnThird = setTimeout(function () {
            const name = params.name
            console.log(params.name)
            const mapCode = that.pro[name]

            if (!mapCode) {
              console.log('1')
              return
            }

            that.loadMapThird(mapCode, name)

            setTimeout(() => {
              document.getElementById('mapThird').style.width = 100 + '%'
              document.getElementById('mapThird').style.height = 100 + '%'
            }, 0)
          }, 250)
        })
      } else {
        alert('无法加载该地图')
      }
    },
    returnLastStepFirst () {
      const that = this
      this.chartFirst = echarts.init(this.$refs.mapChartFirst)
      // 绑定双击事件，返回全省地图
      this.chartFirst.on('dblclick', function (params) {
        // 当双击事件发生时，清除单击事件，仅响应双击事件
        sessionStorage.removeItem('indexCity')
        sessionStorage.removeItem('indexArea')
        that.clickCity = ''
        that.clickAreaName = ''
        that.params.cantonAreas = ''
        that.paramss.cantonAreas = ''
        clearTimeout(this.timeFnFirst)
        setTimeout(() => {
          document.getElementById('mapFirst').style.width = 100 + '%'
          document.getElementById('mapFirst').style.height = 100 + '%'
        }, 0)
        that.loadMapFirst(
          '../../../../static/map/json/yidaiyiheyiqu/440000.json',
          'guangdong'
        )

        that.isWay = false
        that.breadcrumbWayName = ''
        that.isCity = false
        that.breadcrumbCityName = ''
        that.isArea = false
        that.breadcrumbAreaName = ''
      })
    },
    returnLastStepSecond () {
      const that = this
      this.chartSecond = echarts.init(this.$refs.mapChartSecond)
      // 绑定双击事件，返回全省地图
      this.chartSecond.on('dblclick', function (params) {
        // 当双击事件发生时，清除单击事件，仅响应双击事件
        sessionStorage.removeItem('indexCity')
        sessionStorage.removeItem('indexArea')
        that.clickCity = ''
        that.clickAreaName = ''
        that.params.cantonAreas = ''
        that.paramss.cantonAreas = ''
        clearTimeout(this.timeFnSecond)
        setTimeout(() => {
          document.getElementById('mapSecond').style.width = 100 + '%'
          document.getElementById('mapSecond').style.height = 100 + '%'
        }, 0)
        that.changeMapSecond()
        that.isCity = false
        that.breadcrumbCityName = ''
        that.isArea = false
        that.breadcrumbAreaName = ''
      })
    },
    returnLastStepThird () {
      const that = this
      this.chartThird = echarts.init(this.$refs.mapChartThird)
      // 绑定双击事件，返回全省地图
      this.chartThird.on('dblclick', function (params) {
        // 当双击事件发生时，清除单击事件，仅响应双击事件
        sessionStorage.removeItem('indexCity')
        sessionStorage.removeItem('indexArea')
        that.clickCity = ''
        that.clickAreaName = ''
        that.params.cantonAreas = ''
        that.paramss.cantonAreas = ''
        clearTimeout(this.timeFnThird)
        setTimeout(() => {
          document.getElementById('mapThird').style.width = 100 + '%'
          document.getElementById('mapThird').style.height = 100 + '%'
        }, 0)
        that.loadMapThird(
          '../../../../static/map/json/siDaBanKuai/440000.json',
          'guangdong'
        )

        that.isWrap = false
        that.breadcrumbWrapName = ''
        that.isCity = false
        that.breadcrumbCityName = ''
        that.isArea = false
        that.breadcrumbAreaName = ''
      })
    },
    changeMapFirst () {
      let that = this
      if (sessionStorage.getItem('indexCity')) {
        if (sessionStorage.getItem('indexCity') === '449100') {
          that.loadMapFirst(
            '../../../../static/map/json/yidaiyiheyiqu/449100.json',
            'yihe'
          )
        } else if (sessionStorage.getItem('indexCity') === '449200') {
          that.loadMapFirst(
            '../../../../static/map/json/yidaiyiheyiqu/449200.json',
            'yidai'
          )
        } else if (sessionStorage.getItem('indexCity') === '449300') {
          that.loadMapFirst(
            '../../../../static/map/json/yidaiyiheyiqu/449300.json',
            'yiqu'
          )
        } else if (sessionStorage.getItem('indexCity') === '440100') {
          that.loadMapFirst(
            '../../../../static/map/json/province/440100.json',
            '广州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440200') {
          that.loadMapFirst(
            '../../../../static/map/json/province/440200.json',
            '韶关市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440300') {
          that.loadMapFirst(
            '../../../../static/map/json/province/440300.json',
            '深圳市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440400') {
          that.loadMapFirst(
            '../../../../static/map/json/province/440400.json',
            '珠海市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440500') {
          that.loadMapFirst(
            '../../../../static/map/json/province/440500.json',
            '汕头市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440600') {
          that.loadMapFirst(
            '../../../../static/map/json/province/440600.json',
            '佛山市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440700') {
          that.loadMapFirst(
            '../../../../static/map/json/province/440700.json',
            '江门市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440800') {
          that.loadMapFirst(
            '../../../../static/map/json/province/440800.json',
            '湛江市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440900') {
          that.loadMapFirst(
            '../../../../static/map/json/province/440900.json',
            '茂名市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441200') {
          that.loadMapFirst(
            '../../../../static/map/json/province/441200.json',
            '肇庆市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441300') {
          that.loadMapFirst(
            '../../../../static/map/json/province/441300.json',
            '惠州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441400') {
          that.loadMapFirst(
            '../../../../static/map/json/province/441400.json',
            '梅州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441500') {
          that.loadMapFirst(
            '../../../../static/map/json/province/441500.json',
            '汕尾市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441600') {
          that.loadMapFirst(
            '../../../../static/map/json/province/441600.json',
            '河源市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441700') {
          that.loadMapFirst(
            '../../../../static/map/json/province/441700.json',
            '阳江市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441800') {
          that.loadMapFirst(
            '../../../../static/map/json/province/441800.json',
            '清远市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441900') {
          that.loadMapFirst(
            '../../../../static/map/json/province/441900.json',
            '东莞市'
          )
        } else if (sessionStorage.getItem('indexCity') === '442000') {
          that.loadMapFirst(
            '../../../../static/map/json/province/442000.json',
            '中山市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445100') {
          that.loadMapFirst(
            '../../../../static/map/json/province/445100.json',
            '潮州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445200') {
          that.loadMapFirst(
            '../../../../static/map/json/province/445200.json',
            '揭阳市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445300') {
          that.loadMapFirst(
            '../../../../static/map/json/province/445300.json',
            '云浮市'
          )
        }
      } else {
        that.loadMapFirst(
          '../../../../static/map/json/yidaiyiheyiqu/440000.json',
          'guangdong'
        )
      }
    },
    changeMapSecond () {
      if (sessionStorage.getItem('indexCity')) {
        if (sessionStorage.getItem('indexCity') === '440100') {
          this.loadMapSecond(
            '../../../../static/map/json/province/440100.json',
            '广州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440200') {
          this.loadMapSecond(
            '../../../../static/map/json/province/440200.json',
            '韶关市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440300') {
          this.loadMapSecond(
            '../../../../static/map/json/province/440300.json',
            '深圳市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440400') {
          this.loadMapSecond(
            '../../../../static/map/json/province/440400.json',
            '珠海市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440500') {
          this.loadMapSecond(
            '../../../../static/map/json/province/440500.json',
            '汕头市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440600') {
          this.loadMapSecond(
            '../../../../static/map/json/province/440600.json',
            '佛山市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440700') {
          this.loadMapSecond(
            '../../../../static/map/json/province/440700.json',
            '江门市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440800') {
          this.loadMapSecond(
            '../../../../static/map/json/province/440800.json',
            '湛江市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440900') {
          this.loadMapSecond(
            '../../../../static/map/json/province/440900.json',
            '茂名市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441200') {
          this.loadMapSecond(
            '../../../../static/map/json/province/441200.json',
            '肇庆市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441300') {
          this.loadMapSecond(
            '../../../../static/map/json/province/441300.json',
            '惠州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441400') {
          this.loadMapSecond(
            '../../../../static/map/json/province/441400.json',
            '梅州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441500') {
          this.loadMapSecond(
            '../../../../static/map/json/province/441500.json',
            '汕尾市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441600') {
          this.loadMapSecond(
            '../../../../static/map/json/province/441600.json',
            '河源市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441700') {
          this.loadMapSecond(
            '../../../../static/map/json/province/441700.json',
            '阳江市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441800') {
          this.loadMapSecond(
            '../../../../static/map/json/province/441800.json',
            '清远市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441900') {
          this.loadMapSecond(
            '../../../../static/map/json/province/441900.json',
            '东莞市'
          )
        } else if (sessionStorage.getItem('indexCity') === '442000') {
          this.loadMapSecond(
            '../../../../static/map/json/province/442000.json',
            '中山市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445100') {
          this.loadMapSecond(
            '../../../../static/map/json/province/445100.json',
            '潮州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445200') {
          this.loadMapSecond(
            '../../../../static/map/json/province/445200.json',
            '揭阳市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445300') {
          this.loadMapSecond(
            '../../../../static/map/json/province/445300.json',
            '云浮市'
          )
        }
      } else {
        this.loadMapSecond(
          '../../../../static/map/json/province/440000.json',
          'guangdong'
        )
      }
    },
    changeMapThird () {
      let that = this
      if (sessionStorage.getItem('indexCity')) {
        if (sessionStorage.getItem('indexCity') === '448100') {
          that.loadMapThird(
            '../../../../static/map/json/siDaBanKuai/448100.json',
            'zhusanjiao'
          )
        } else if (sessionStorage.getItem('indexCity') === '448200') {
          that.loadMapThird(
            '../../../../static/map/json/siDaBanKuai/448200.json',
            'yuexi'
          )
        } else if (sessionStorage.getItem('indexCity') === '448300') {
          that.loadMapThird(
            '../../../../static/map/json/siDaBanKuai/448300.json',
            'yuedong'
          )
        } else if (sessionStorage.getItem('indexCity') === '448400') {
          that.loadMapThird(
            '../../../../static/map/json/siDaBanKuai/448400.json',
            'yuebei'
          )
        } else if (sessionStorage.getItem('indexCity') === '440100') {
          that.loadMapThird(
            '../../../../static/map/json/province/440100.json',
            '广州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440200') {
          that.loadMapThird(
            '../../../../static/map/json/province/440200.json',
            '韶关市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440300') {
          that.loadMapThird(
            '../../../../static/map/json/province/440300.json',
            '深圳市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440400') {
          that.loadMapThird(
            '../../../../static/map/json/province/440400.json',
            '珠海市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440500') {
          that.loadMapThird(
            '../../../../static/map/json/province/440500.json',
            '汕头市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440600') {
          that.loadMapThird(
            '../../../../static/map/json/province/440600.json',
            '佛山市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440700') {
          that.loadMapThird(
            '../../../../static/map/json/province/440700.json',
            '江门市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440800') {
          that.loadMapThird(
            '../../../../static/map/json/province/440800.json',
            '湛江市'
          )
        } else if (sessionStorage.getItem('indexCity') === '440900') {
          that.loadMapThird(
            '../../../../static/map/json/province/440900.json',
            '茂名市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441200') {
          that.loadMapThird(
            '../../../../static/map/json/province/441200.json',
            '肇庆市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441300') {
          that.loadMapThird(
            '../../../../static/map/json/province/441300.json',
            '惠州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441400') {
          that.loadMapThird(
            '../../../../static/map/json/province/441400.json',
            '梅州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441500') {
          that.loadMapThird(
            '../../../../static/map/json/province/441500.json',
            '汕尾市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441600') {
          that.loadMapThird(
            '../../../../static/map/json/province/441600.json',
            '河源市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441700') {
          that.loadMapThird(
            '../../../../static/map/json/province/441700.json',
            '阳江市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441800') {
          that.loadMapThird(
            '../../../../static/map/json/province/441800.json',
            '清远市'
          )
        } else if (sessionStorage.getItem('indexCity') === '441900') {
          that.loadMapThird(
            '../../../../static/map/json/province/441900.json',
            '东莞市'
          )
        } else if (sessionStorage.getItem('indexCity') === '442000') {
          that.loadMapThird(
            '../../../../static/map/json/province/442000.json',
            '中山市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445100') {
          that.loadMapThird(
            '../../../../static/map/json/province/445100.json',
            '潮州市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445200') {
          that.loadMapThird(
            '../../../../static/map/json/province/445200.json',
            '揭阳市'
          )
        } else if (sessionStorage.getItem('indexCity') === '445300') {
          that.loadMapThird(
            '../../../../static/map/json/province/445300.json',
            '云浮市'
          )
        }
      } else {
        that.loadMapThird(
          '../../../../static/map/json/siDaBanKuai/440000.json',
          'guangdong'
        )
      }
    },
    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        this.screenWidth = document.body.clientWidth
        console.log(this.screenWidth)

        this.chartFirst = echarts.init(this.$refs.mapChartFirst)
        document.getElementById('mapFirst').style.width = 100 + '%'
        document.getElementById('mapFirst').style.height = 100 + '%'
        this.chartFirst.resize() // 直接加这句即可

        this.chartSecond = echarts.init(this.$refs.mapChartSecond)
        document.getElementById('mapSecond').style.width = 100 + '%'
        document.getElementById('mapSecond').style.height = 100 + '%'
        this.chartSecond.resize() // 直接加这句即可

        this.chartThird = echarts.init(this.$refs.mapChartThird)
        document.getElementById('mapThird').style.width = 100 + '%'
        document.getElementById('mapThird').style.height = 100 + '%'
        this.chartThird.resize() // 直接加这句即可
      })
    },
    // 面包屑
    toWayWide () {
      if (this.breadcrumbWayName === '一核') {
        this.params.cantonCitys
          = '440100,440300,440400,440600,440700,441200,441300,441900,442000'
        this.paramss.cantonCitys
          = '440100,440300,440400,440600,440700,441200,441300,441900,442000'
        this.clickCity = '449100'
        this.$nextTick(function () {
          setTimeout(() => {
            this.loadMapFirst(
              '../../../../static/map/json/yidaiyiheyiqu/449100.json',
              'yihe'
            )
          }, 100)
        })
      } else if (this.breadcrumbWayName === '一带') {
        this.params.cantonCitys
          = '440800,440900,441700,440100,440300,440400,440700,441300,441900,442000,440200,441400,441600,441800'
        this.paramss.cantonCitys
          = '440800,440900,441700,440100,440300,440400,440700,441300,441900,442000,440200,441400,441600,441800'
        this.clickCity = '449200'
        setTimeout(() => {
          this.loadMapFirst(
            '../../../../static/map/json/yidaiyiheyiqu/449200.json',
            'yidai'
          )
        }, 100)
      } else if (this.breadcrumbWayName === '一区') {
        this.params.cantonCitys = '440500,441500,445100,445200,445300'
        this.paramss.cantonCitys = '440500,441500,445100,445200,445300'
        this.clickCity = '449300'
        setTimeout(() => {
          this.loadMapFirst(
            '../../../../static/map/json/yidaiyiheyiqu/449300.json',
            'yiqu'
          )
        }, 100)
      }
      sessionStorage.removeItem('indexArea')
      this.params.cantonAreas = ''
      this.paramss.cantonAreas = ''
      this.clickAreaName = ''
      this.isCity = false
      this.breadcrumbCityName = ''
      this.isArea = false
      this.breadcrumbAreaName = ''
    },
    // 面包屑
    toWrapWide () {
      if (this.breadcrumbWrapName === '珠江三角洲') {
        this.params.cantonCitys
          = '440100,440300,440400,440600,440700,441200,441300,441900,442000'
        this.paramss.cantonCitys
          = '440100,440300,440400,440600,440700,441200,441300,441900,442000'
        this.clickCity = '448100'
        setTimeout(() => {
          this.loadMapThird(
            '../../../../static/map/json/siDaBanKuai/448100.json',
            'zhusanjiao'
          )
        }, 100)
      } else if (this.breadcrumbWrapName === '粤西地区') {
        this.params.cantonCitys = '440800,440900,441700,445300'
        this.paramss.cantonCitys = '440800,440900,441700,445300'
        this.clickCity = '448200'
        setTimeout(() => {
          this.loadMapThird(
            '../../../../static/map/json/siDaBanKuai/448200.json',
            'yuexi'
          )
        }, 100)
      } else if (this.breadcrumbWrapName === '粤东地区') {
        this.params.cantonCitys = '440500,441500,445100,445200'
        this.paramss.cantonCitys = '440500,441500,445100,445200'
        this.clickCity = '448300'
        setTimeout(() => {
          this.loadMapThird(
            '../../../../static/map/json/siDaBanKuai/448300.json',
            'yuedong'
          )
        }, 100)
      } else if (this.breadcrumbWrapName === '粤北地区') {
        this.params.cantonCitys = '440200,441400,441600,441800'
        this.paramss.cantonCitys = '440200,441400,441600,441800'
        this.clickCity = '448400'
        setTimeout(() => {
          this.loadMapThird(
            '../../../../static/map/json/siDaBanKuai/448400.json',
            'yuebei'
          )
        }, 100)
      }
      sessionStorage.removeItem('indexArea')
      this.params.cantonAreas = ''
      this.paramss.cantonAreas = ''
      this.clickAreaName = ''
      this.isCity = false
      this.breadcrumbCityName = ''
      this.isArea = false
      this.breadcrumbAreaName = ''
    },
    // 面包屑
    toProvinceWide () {
      sessionStorage.removeItem('indexCity')
      sessionStorage.removeItem('indexArea')
      this.clickCity = ''
      this.clickAreaName = ''
      this.params.cantonAreas = ''
      this.paramss.cantonAreas = ''

      // this.loadMapSecond(
      //   "../../../../static/map/json/province/440000.json",
      //   "guangdong"
      // );
      this.isW = false
      this.breadcrumbWName = ''
      this.isWrap = false
      this.breadcrumbWrapName = ''
      this.isCity = false
      this.breadcrumbCityName = ''
      this.isArea = false
      this.breadcrumbAreaName = ''
    },
    toCityWide () {
      sessionStorage.removeItem('indexArea')
      this.clickAreaName = ''
      this.clickCity = sessionStorage.getItem('indexCity')
      this.params.cantonAreas = ''
      this.paramss.cantonAreas = ''
      this.isArea = false
      this.breadcrumbAreaName = ''
      this.changeMapSecond()
    },
    initMapAppConf () {
      this.mapServices = [
        {
          title: '市级中心城区范围线',
          type: 'image',
          useProxy: false,
          url:
            'http://19.18.128.73:6080/arcgis/rest/services/TDGH/GDZXCQFW/MapServer'
        },
        {
          title: '县级中心城区范围线',
          type: 'image',
          useProxy: false,
          url:
            'http://19.18.128.73:6080/arcgis/rest/services/TDGH/全省县级中心城区范围/MapServer'
        }
      ]
      this.myMapAppInitConf = this.$getMapAppInitConf()
      this.myWidgetConf = this.$getWidgetConf()
      if (this.myWidgetConf.widgets) {
        this.myWidgetConf.widgets = [
          {
            name: 'Legend',
            position: 'customRight'
          },
          {
            name: 'BasemapGallery',
            position: 'bottom-right'
          }
        ]
      }
    }
  },
  created () {
    this.getTopPlanningValue()
    this.getBottomPlanningValue()
    this.getTopDetectionValue()
    this.getBottomDetectionValue()
    this.initMapAppConf()
    this.screenWidth = document.body.clientWidth
    console.log(this.screenWidth)
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    console.log(this.screenWidth)
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', res => {
      if (res === 'mapindex00') {
        this.mapApp = this.$findMapApp(res)
        this.mapServices.forEach(item => {
          if (this.mapApp) {
            this.mapApp.addLayerToMap(item)
          }
        })
      }
    })
    this.$nextTick(function () {
      setTimeout(() => {
        this.loadMapFirst(
          '../../../../static/map/json/yidaiyiheyiqu/440000.json',
          'guangdong'
        )
        this.loadMapSecond(
          '../../../../static/map/json/province/440000.json',
          'guangdong'
        )
        this.loadMapThird(
          '../../../../static/map/json/siDaBanKuai/440000.json',
          'guangdong'
        )

        // this.changeMapSecond();
      }, 1000)
    })
    this.initEchart()
    // if (this.currentTab === 0) {
    //   setTimeout(() => {
    //     this.returnLastStepFirst();
    //   }, 10);
    // } else if (this.currentTab === 1) {
    //   setTimeout(() => {
    //     this.returnLastStepSecond();
    //   }, 10);
    // } else if (this.currentTab === 2) {
    //   setTimeout(() => {
    //     this.returnLastStepThird();
    //   }, 10);
    // }
  },
  beforeDestroy () {
    this.$bus.$off('viewLoaded')
  },
  destroyed () {
    window.removeEventListener(
      'resize',
      () => {
        this.chartFirst = echarts.init(this.$refs.mapChartFirst)
        document.getElementById('mapFirst').style.width = 100 + '%'
        document.getElementById('mapFirst').style.height = 100 + '%'
        this.chartFirst.resize() // 直接加这句即可

        this.chartSecond = echarts.init(this.$refs.mapChartSecond)
        document.getElementById('mapSecond').style.width = 100 + '%'
        document.getElementById('mapSecond').style.height = 100 + '%'
        this.chartSecond.resize() // 直接加这句即可

        this.chartThird = echarts.init(this.$refs.mapChartThird)
        document.getElementById('mapThird').style.width = 100 + '%'
        document.getElementById('mapThird').style.height = 100 + '%'
        this.chartThird.resize() // 直接加这句即可
      },
      20
    )

    sessionStorage.removeItem('indexCity')
    sessionStorage.removeItem('indexArea')
  },
  watch: {
    screenWidth (val) {
      this.changeMapFirst()
      this.changeMapSecond()
      this.changeMapThird()
    },
    clickCity (val) {
      console.log(val)
      if (val == '448100') {
        (this.params.cantonCitys
          = '440100,440300,440400,440600,440700,441200,441300,441900,442000'),
          (this.breadcrumbWrapName = '珠江三角洲')
        this.paramss.cantonCitys
          = '440100,440300,440400,440600,440700,441200,441300,441900,442000'
        this.isWrap = true
      } else if (val == '448200') {
        (this.params.cantonCitys = '440800,440900,441700,445300'),
          (this.breadcrumbWrapName = '粤西地区')
        this.paramss.cantonCitys = '440800,440900,441700,445300'
        this.isWrap = true
      } else if (val == '448300') {
        (this.params.cantonCitys = '440500,441500,445100,445200'),
          (this.breadcrumbWrapName = '粤东地区')
        this.paramss.cantonCitys = '440500,441500,445100,445200'
        this.isWrap = true
      } else if (val == '448400') {
        (this.params.cantonCitys = '440200,441400,441600,441800'),
          (this.breadcrumbWrapName = '粤北地区')
        this.paramss.cantonCitys = '440200,441400,441600,441800'
        this.isWrap = true
      } else if (val == '449100') {
        (this.params.cantonCitys
          = '440100,440300,440400,440600,440700,441200,441300,441900,442000'),
          (this.breadcrumbWayName = '一核')
        this.paramss.cantonCitys
          = '440100,440300,440400,440600,440700,441200,441300,441900,442000'
        this.isWay = true
      } else if (val == '449200') {
        (this.params.cantonCitys
          = '440800,440900,441700,440100,440300,440400,440700,441300,441900,442000,440200,441400,441600,441800'),
          (this.breadcrumbWayName = '一带')
        this.paramss.cantonCitys
          = '440800,440900,441700,440100,440300,440400,440700,441300,441900,442000,440200,441400,441600,441800'
        this.isWay = true
      } else if (val == '449300') {
        (this.params.cantonCitys = '440500,441500,445100,445200,445300'),
          (this.breadcrumbWayName = '一区')
        this.paramss.cantonCitys = '440500,441500,445100,445200,445300'
        this.isWay = true
      } else if (val == '440100') {
        // this.breadcrumbWayName = "一核";
        this.isWay = true
        this.breadcrumbWrapName = '珠江三角洲'
        this.isWrap = true;
        (this.params.cantonCitys = '440100'),
          (this.breadcrumbCityName = '广州市')
        this.paramss.cantonCitys = '440100'
        this.isCity = true
      } else if (val == '440200') {
        this.breadcrumbWayName = '一区'
        this.isWay = true
        this.breadcrumbWrapName = '粤北地区'
        this.isWrap = true;
        (this.params.cantonCitys = '440200'),
          (this.breadcrumbCityName = '韶关市')
        this.paramss.cantonCitys = '440200'
        this.isCity = true
      } else if (val == '440300') {
        // this.breadcrumbWayName = "一核";
        this.isWay = true
        this.breadcrumbWrapName = '珠江三角洲'
        this.isWrap = true;
        (this.params.cantonCitys = '440300'),
          (this.breadcrumbCityName = '深圳市')
        this.paramss.cantonCitys = '440300'
        this.isCity = true
      } else if (val == '440400') {
        // this.breadcrumbWayName = "一核";
        this.isWay = true
        this.breadcrumbWrapName = '珠江三角洲'
        this.isWrap = true;
        (this.params.cantonCitys = '440400'),
          (this.breadcrumbCityName = '珠海市')
        this.paramss.cantonCitys = '440400'
        this.isCity = true
      } else if (val == '440500') {
        this.breadcrumbWayName = '一带'
        this.isWay = true
        this.breadcrumbWrapName = '粤东地区'
        this.isWrap = true;
        (this.params.cantonCitys = '440500'),
          (this.breadcrumbCityName = '汕头市')
        this.paramss.cantonCitys = '440500'
        this.isCity = true
      } else if (val == '440600') {
        // this.breadcrumbWayName = "一核";
        this.isWay = true
        this.breadcrumbWrapName = '珠江三角洲'
        this.isWrap = true;
        (this.params.cantonCitys = '440600'),
          (this.breadcrumbCityName = '佛山市')
        this.paramss.cantonCitys = '440600'
        this.isCity = true
      } else if (val == '440700') {
        // this.breadcrumbWayName = "一核";
        this.isWay = true
        this.breadcrumbWrapName = '珠江三角洲'
        this.isWrap = true;
        (this.params.cantonCitys = '440700'),
          (this.breadcrumbCityName = '江门市')
        this.paramss.cantonCitys = '440700'
        this.isCity = true
      } else if (val == '440800') {
        this.breadcrumbWayName = '一带'
        this.isWay = true
        this.breadcrumbWrapName = '粤西地区'
        this.isWrap = true;
        (this.params.cantonCitys = '440800'),
          (this.breadcrumbCityName = '湛江市')
        this.paramss.cantonCitys = '440800'
        this.isCity = true
      } else if (val == '440900') {
        this.breadcrumbWayName = '一带'
        this.isWay = true
        this.breadcrumbWrapName = '粤西地区'
        this.isWrap = true;
        (this.params.cantonCitys = '440900'),
          (this.breadcrumbCityName = '茂名市')
        this.paramss.cantonCitys = '440900'
        this.isCity = true
      } else if (val == '441200') {
        // this.breadcrumbWayName = "一核";
        this.isWay = true
        this.breadcrumbWrapName = '珠江三角洲'
        this.isWrap = true;
        (this.params.cantonCitys = '441200'),
          (this.breadcrumbCityName = '肇庆市')
        this.paramss.cantonCitys = '441200'
        this.isCity = true
      } else if (val == '441300') {
        // this.breadcrumbWayName = "一核";
        this.isWay = true
        this.breadcrumbWrapName = '珠江三角洲'
        this.isWrap = true;
        (this.params.cantonCitys = '441300'),
          (this.breadcrumbCityName = '惠州市')
        this.paramss.cantonCitys = '441300'
        this.isCity = true
      } else if (val == '441400') {
        this.breadcrumbWayName = '一区'
        this.isWay = true
        this.breadcrumbWrapName = '粤北地区'
        this.isWrap = true;
        (this.params.cantonCitys = '441400'),
          (this.breadcrumbCityName = '梅州市')
        this.paramss.cantonCitys = '441400'
        this.isCity = true
      } else if (val == '441500') {
        this.breadcrumbWayName = '一带'
        this.isWay = true
        this.breadcrumbWrapName = '粤东地区'
        this.isWrap = true;
        (this.params.cantonCitys = '441500'),
          (this.breadcrumbCityName = '汕尾市')
        this.paramss.cantonCitys = '441500'
        this.isCity = true
      } else if (val == '441600') {
        this.breadcrumbWayName = '一区'
        this.isWay = true
        this.breadcrumbWrapName = '粤北地区'
        this.isWrap = true;
        (this.params.cantonCitys = '441600'),
          (this.breadcrumbCityName = '河源市')
        this.paramss.cantonCitys = '441600'
        this.isCity = true
      } else if (val == '441700') {
        this.breadcrumbWayName = '一带'
        this.isWay = true
        this.breadcrumbWrapName = '粤西地区'
        this.isWrap = true;
        (this.params.cantonCitys = '441700'),
          (this.breadcrumbCityName = '阳江市')
        this.paramss.cantonCitys = '441700'
        this.isCity = true
      } else if (val == '441800') {
        this.breadcrumbWayName = '一区'
        this.isWay = true
        this.breadcrumbWrapName = '粤北地区'
        this.isWrap = true;
        (this.params.cantonCitys = '441800'),
          (this.breadcrumbCityName = '清远市')
        this.paramss.cantonCitys = '441800'
        this.isCity = true
      } else if (val == '441900') {
        // this.breadcrumbWayName = "一核";
        this.isWay = true
        this.breadcrumbWrapName = '珠江三角洲'
        this.isWrap = true;
        (this.params.cantonCitys = '441900'),
          (this.breadcrumbCityName = '东莞市')
        this.paramss.cantonCitys = '441900'
        this.isCity = true
      } else if (val == '442000') {
        // this.breadcrumbWayName = "一核";
        this.isWay = true
        this.breadcrumbWrapName = '珠江三角洲'
        this.isWrap = true;
        (this.params.cantonCitys = '442000'),
          (this.breadcrumbCityName = '中山市')
        this.paramss.cantonCitys = '442000'
        this.isCity = true
      } else if (val == '445100') {
        this.breadcrumbWayName = '一带'
        this.isWay = true
        this.breadcrumbWrapName = '粤东地区'
        this.isWrap = true;
        (this.params.cantonCitys = '445100'),
          (this.breadcrumbCityName = '潮州市')
        this.paramss.cantonCitys = '445100'
        this.isCity = true
      } else if (val == '445200') {
        this.breadcrumbWayName = '一带'
        this.isWay = true
        this.breadcrumbWrapName = '粤东地区'
        this.isWrap = true;
        (this.params.cantonCitys = '445200'),
          (this.breadcrumbCityName = '揭阳市')
        this.paramss.cantonCitys = '445200'
        this.isCity = true
      } else if (val == '445300') {
        this.breadcrumbWayName = '一区'
        this.isWay = true
        this.breadcrumbWrapName = '粤西地区'
        this.isWrap = true;
        (this.params.cantonCitys = '445300'),
          (this.breadcrumbCityName = '云浮市')
        this.paramss.cantonCitys = '445300'
        this.isCity = true
      } else if (val == '') {
        (this.params.cantonCitys = ''), (this.breadcrumbWrapName = '')
        this.paramss.cantonCitys = ''
        this.breadcrumbCityName = ''
        this.isWrap = false
        this.breadcrumbWayName = ''
        this.isWay = false
        this.isCity = false
      }
      this.changeMapFirst()
      this.changeMapSecond()
      this.changeMapThird()
      this.getTopPlanningValue()
      this.getBottomPlanningValue()
      this.getTopDetectionValue()
      this.getBottomDetectionValue()
    },

    clickAreaName (val) {
      if (val == '荔湾区') {
        this.params.cantonAreas = '440103'
        this.paramss.cantonAreas = '440103'
        this.breadcrumbAreaName = '荔湾区'
        this.isArea = true
      } else if (val == '越秀区') {
        this.params.cantonAreas = '440104'
        this.paramss.cantonAreas = '440104'
        this.breadcrumbAreaName = '越秀区'
        this.isArea = true
      } else if (val == '海珠区') {
        this.params.cantonAreas = '440105'
        this.paramss.cantonAreas = '440105'
        this.breadcrumbAreaName = '海珠区'
        this.isArea = true
      } else if (val == '天河区') {
        this.params.cantonAreas = '440106'
        this.paramss.cantonAreas = '440106'
        this.breadcrumbAreaName = '天河区'
        this.isArea = true
      } else if (val == '白云区') {
        this.params.cantonAreas = '440111'
        this.paramss.cantonAreas = '440111'
        this.breadcrumbAreaName = '白云区'
        this.isArea = true
      } else if (val == '黄埔区') {
        this.params.cantonAreas = '440112'
        this.paramss.cantonAreas = '440112'
        this.breadcrumbAreaName = '黄埔区'
        this.isArea = true
      } else if (val == '番禺区') {
        this.params.cantonAreas = '440113'
        this.paramss.cantonAreas = '440113'
        this.breadcrumbAreaName = '番禺区'
        this.isArea = true
      } else if (val == '花都区') {
        this.params.cantonAreas = '440114'
        this.paramss.cantonAreas = '440114'
        this.breadcrumbAreaName = '花都区'
        this.isArea = true
      } else if (val == '南沙区') {
        this.params.cantonAreas = '440115'
        this.paramss.cantonAreas = '440115'
        this.breadcrumbAreaName = '南沙区'
        this.isArea = true
      } else if (val == '从化区') {
        this.params.cantonAreas = '440117'
        this.paramss.cantonAreas = '440117'
        this.breadcrumbAreaName = '从化区'
        this.isArea = true
      } else if (val == '增城区') {
        this.params.cantonAreas = '440118'
        this.paramss.cantonAreas = '440118'
        this.breadcrumbAreaName = '增城区'
        this.isArea = true
      } else if (val == '武江区') {
        this.params.cantonAreas = '440203'
        this.paramss.cantonAreas = '440203'
        this.breadcrumbAreaName = '武江区'
        this.isArea = true
      } else if (val == '浈江区') {
        this.params.cantonAreas = '440204'
        this.paramss.cantonAreas = '440204'
        this.breadcrumbAreaName = '浈江区'
        this.isArea = true
      } else if (val == '曲江区') {
        this.params.cantonAreas = '440205'
        this.paramss.cantonAreas = '440205'
        this.breadcrumbAreaName = '曲江区'
        this.isArea = true
      } else if (val == '始兴县') {
        this.params.cantonAreas = '440222'
        this.paramss.cantonAreas = '440222'
        this.breadcrumbAreaName = '始兴县'
        this.isArea = true
      } else if (val == '仁化县') {
        this.params.cantonAreas = '440224'
        this.paramss.cantonAreas = '440224'
        this.breadcrumbAreaName = '仁化县'
        this.isArea = true
      } else if (val == '翁源县') {
        this.params.cantonAreas = '440229'
        this.paramss.cantonAreas = '440229'
        this.breadcrumbAreaName = '翁源县'
        this.isArea = true
      } else if (val == '乳源瑶族自治县') {
        this.params.cantonAreas = '440232'
        this.paramss.cantonAreas = '440232'
        this.breadcrumbAreaName = '乳源瑶族自治县'
        this.isArea = true
      } else if (val == '新丰县') {
        this.params.cantonAreas = '440233'
        this.paramss.cantonAreas = '440233'
        this.breadcrumbAreaName = '新丰县'
        this.isArea = true
      } else if (val == '乐昌市') {
        this.params.cantonAreas = '440281'
        this.paramss.cantonAreas = '440281'
        this.breadcrumbAreaName = '乐昌市'
        this.isArea = true
      } else if (val == '南雄市') {
        this.params.cantonAreas = '440282'
        this.paramss.cantonAreas = '440282'
        this.breadcrumbAreaName = '南雄市'
        this.isArea = true
      } else if (val == '罗湖区') {
        this.params.cantonAreas = '440303'
        this.paramss.cantonAreas = '440303'
        this.breadcrumbAreaName = '罗湖区'
        this.isArea = true
      } else if (val == '福田区') {
        this.params.cantonAreas = '440304'
        this.paramss.cantonAreas = '440304'
        this.breadcrumbAreaName = '福田区'
        this.isArea = true
      } else if (val == '南山区') {
        this.params.cantonAreas = '440305'
        this.paramss.cantonAreas = '440305'
        this.breadcrumbAreaName = '南山区'
        this.isArea = true
      } else if (val == '宝安区') {
        this.params.cantonAreas = '440306'
        this.paramss.cantonAreas = '440306'
        this.breadcrumbAreaName = '宝安区'
        this.isArea = true
      } else if (val == '龙岗区') {
        this.params.cantonAreas = '440307'
        this.paramss.cantonAreas = '440307'
        this.breadcrumbAreaName = '龙岗区'
        this.isArea = true
      } else if (val == '盐田区') {
        this.params.cantonAreas = '440308'
        this.paramss.cantonAreas = '440308'
        this.breadcrumbAreaName = '盐田区'
        this.isArea = true
      } else if (val == '龙华区') {
        this.params.cantonAreas = '440309'
        this.paramss.cantonAreas = '440309'
        this.breadcrumbAreaName = '龙华区'
        this.isArea = true
      } else if (val == '坪山区') {
        this.params.cantonAreas = '440310'
        this.paramss.cantonAreas = '440310'
        this.breadcrumbAreaName = '坪山区'
        this.isArea = true
      } else if (val == '光明区') {
        this.params.cantonAreas = '440311'
        this.paramss.cantonAreas = '440311'
        this.breadcrumbAreaName = '光明区'
        this.isArea = true
      } else if (val == '香洲区') {
        this.params.cantonAreas = '440402'
        this.paramss.cantonAreas = '440402'
        this.breadcrumbAreaName = '香洲区'
        this.isArea = true
      } else if (val == '斗门区') {
        this.params.cantonAreas = '440403'
        this.paramss.cantonAreas = '440403'
        this.breadcrumbAreaName = '斗门区'
        this.isArea = true
      } else if (val == '金湾区') {
        this.params.cantonAreas = '440404'
        this.paramss.cantonAreas = '440404'
        this.breadcrumbAreaName = '金湾区'
        this.isArea = true
      } else if (val == '龙湖区') {
        this.params.cantonAreas = '440507'
        this.paramss.cantonAreas = '440507'
        this.breadcrumbAreaName = '龙湖区'
        this.isArea = true
      } else if (val == '金平区') {
        this.params.cantonAreas = '440511'
        this.paramss.cantonAreas = '440511'
        this.breadcrumbAreaName = '金平区'
        this.isArea = true
      } else if (val == '濠江区') {
        this.params.cantonAreas = '440512'
        this.paramss.cantonAreas = '440512'
        this.breadcrumbAreaName = '濠江区'
        this.isArea = true
      } else if (val == '潮阳区') {
        this.params.cantonAreas = '440513'
        this.paramss.cantonAreas = '440513'
        this.breadcrumbAreaName = '潮阳区'
        this.isArea = true
      } else if (val == '潮南区') {
        this.params.cantonAreas = '440514'
        this.paramss.cantonAreas = '440514'
        this.breadcrumbAreaName = '潮南区'
        this.isArea = true
      } else if (val == '澄海区') {
        this.params.cantonAreas = '440515'
        this.paramss.cantonAreas = '440515'
        this.breadcrumbAreaName = '澄海区'
        this.isArea = true
      } else if (val == '南澳县') {
        this.params.cantonAreas = '440523'
        this.paramss.cantonAreas = '440523'
        this.breadcrumbAreaName = '南澳县'
        this.isArea = true
      } else if (val == '禅城区') {
        this.params.cantonAreas = '440604'
        this.paramss.cantonAreas = '440604'
        this.breadcrumbAreaName = '禅城区'
        this.isArea = true
      } else if (val == '南海区') {
        this.params.cantonAreas = '440605'
        this.paramss.cantonAreas = '440605'
        this.breadcrumbAreaName = '南海区'
        this.isArea = true
      } else if (val == '顺德区') {
        this.params.cantonAreas = '440606'
        this.paramss.cantonAreas = '440606'
        this.breadcrumbAreaName = '顺德区'
        this.isArea = true
      } else if (val == '三水区') {
        this.params.cantonAreas = '440607'
        this.paramss.cantonAreas = '440607'
        this.breadcrumbAreaName = '三水区'
        this.isArea = true
      } else if (val == '高明区') {
        this.params.cantonAreas = '440608'
        this.paramss.cantonAreas = '440608'
        this.breadcrumbAreaName = '高明区'
        this.isArea = true
      } else if (val == '蓬江区') {
        this.params.cantonAreas = '440703'
        this.paramss.cantonAreas = '440703'
        this.breadcrumbAreaName = '蓬江区'
        this.isArea = true
      } else if (val == '江海区') {
        this.params.cantonAreas = '440704'
        this.paramss.cantonAreas = '440704'
        this.breadcrumbAreaName = '江海区'
        this.isArea = true
      } else if (val == '新会区') {
        this.params.cantonAreas = '440705'
        this.paramss.cantonAreas = '440705'
        this.breadcrumbAreaName = '新会区'
        this.isArea = true
      } else if (val == '台山市') {
        this.params.cantonAreas = '440781'
        this.paramss.cantonAreas = '440781'
        this.breadcrumbAreaName = '台山市'
        this.isArea = true
      } else if (val == '开平市') {
        this.params.cantonAreas = '440783'
        this.paramss.cantonAreas = '440783'
        this.breadcrumbAreaName = '开平市'
        this.isArea = true
      } else if (val == '鹤山市') {
        this.params.cantonAreas = '440784'
        this.paramss.cantonAreas = '440784'
        this.breadcrumbAreaName = '鹤山市'
        this.isArea = true
      } else if (val == '恩平市') {
        this.params.cantonAreas = '440785'
        this.paramss.cantonAreas = '440785'
        this.breadcrumbAreaName = '恩平市'
        this.isArea = true
      } else if (val == '赤坎区') {
        this.params.cantonAreas = '440802'
        this.paramss.cantonAreas = '440802'
        this.breadcrumbAreaName = '赤坎区'
        this.isArea = true
      } else if (val == '霞山区') {
        this.params.cantonAreas = '440803'
        this.paramss.cantonAreas = '440803'
        this.breadcrumbAreaName = '霞山区'
        this.isArea = true
      } else if (val == '坡头区') {
        this.params.cantonAreas = '440804'
        this.paramss.cantonAreas = '440804'
        this.breadcrumbAreaName = '坡头区'
        this.isArea = true
      } else if (val == '麻章区') {
        this.params.cantonAreas = '440811'
        this.paramss.cantonAreas = '440811'
        this.breadcrumbAreaName = '麻章区'
        this.isArea = true
      } else if (val == '遂溪县') {
        this.params.cantonAreas = '440823'
        this.paramss.cantonAreas = '440823'
        this.breadcrumbAreaName = '遂溪县'
        this.isArea = true
      } else if (val == '徐闻县') {
        this.params.cantonAreas = '440825'
        this.paramss.cantonAreas = '440825'
        this.breadcrumbAreaName = '徐闻县'
        this.isArea = true
      } else if (val == '廉江市') {
        this.params.cantonAreas = '440881'
        this.paramss.cantonAreas = '440881'
        this.breadcrumbAreaName = '廉江市'
        this.isArea = true
      } else if (val == '雷州市') {
        this.params.cantonAreas = '440882'
        this.paramss.cantonAreas = '440882'
        this.breadcrumbAreaName = '雷州市'
        this.isArea = true
      } else if (val == '吴川市') {
        this.params.cantonAreas = '440883'
        this.paramss.cantonAreas = '440883'
        this.breadcrumbAreaName = '吴川市'
        this.isArea = true
      } else if (val == '茂南区') {
        this.params.cantonAreas = '440902'
        this.paramss.cantonAreas = '440902'
        this.breadcrumbAreaName = '茂南区'
        this.isArea = true
      } else if (val == '电白区') {
        this.params.cantonAreas = '440904'
        this.paramss.cantonAreas = '440904'
        this.breadcrumbAreaName = '电白区'
        this.isArea = true
      } else if (val == '高州市') {
        this.params.cantonAreas = '440981'
        this.paramss.cantonAreas = '440981'
        this.breadcrumbAreaName = '高州市'
        this.isArea = true
      } else if (val == '化州市') {
        this.params.cantonAreas = '440982'
        this.paramss.cantonAreas = '440982'
        this.breadcrumbAreaName = '化州市'
        this.isArea = true
      } else if (val == '信宜市') {
        this.params.cantonAreas = '440983'
        this.paramss.cantonAreas = '440983'
        this.breadcrumbAreaName = '信宜市'
        this.isArea = true
      } else if (val == '端州区') {
        this.params.cantonAreas = '441202'
        this.paramss.cantonAreas = '441202'
        this.breadcrumbAreaName = '端州区'
        this.isArea = true
      } else if (val == '鼎湖区') {
        this.params.cantonAreas = '441203'
        this.paramss.cantonAreas = '441203'
        this.breadcrumbAreaName = '鼎湖区'
        this.isArea = true
      } else if (val == '高要区') {
        this.params.cantonAreas = '441204'
        this.paramss.cantonAreas = '441204'
        this.breadcrumbAreaName = '高要区'
        this.isArea = true
      } else if (val == '广宁县') {
        this.params.cantonAreas = '441223'
        this.paramss.cantonAreas = '441223'
        this.breadcrumbAreaName = '广宁县'
        this.isArea = true
      } else if (val == '怀集县') {
        this.params.cantonAreas = '441224'
        this.paramss.cantonAreas = '441224'
        this.breadcrumbAreaName = '怀集县'
        this.isArea = true
      } else if (val == '封开县') {
        this.params.cantonAreas = '441225'
        this.paramss.cantonAreas = '441225'
        this.breadcrumbAreaName = '封开县'
        this.isArea = true
      } else if (val == '德庆县') {
        this.params.cantonAreas = '441226'
        this.paramss.cantonAreas = '441226'
        this.breadcrumbAreaName = '德庆县'
        this.isArea = true
      } else if (val == '四会市') {
        this.params.cantonAreas = '441284'
        this.paramss.cantonAreas = '441284'
        this.breadcrumbAreaName = '四会市'
        this.isArea = true
      } else if (val == '惠城区') {
        this.params.cantonAreas = '441302'
        this.paramss.cantonAreas = '441302'
        this.breadcrumbAreaName = '惠城区'
        this.isArea = true
      } else if (val == '惠阳区') {
        this.params.cantonAreas = '441303'
        this.paramss.cantonAreas = '441303'
        this.breadcrumbAreaName = '惠阳区'
        this.isArea = true
      } else if (val == '博罗县') {
        this.params.cantonAreas = '441322'
        this.paramss.cantonAreas = '441322'
        this.breadcrumbAreaName = '博罗县'
        this.isArea = true
      } else if (val == '惠东县') {
        this.params.cantonAreas = '441323'
        this.paramss.cantonAreas = '441323'
        this.breadcrumbAreaName = '惠东县'
        this.isArea = true
      } else if (val == '龙门县') {
        this.params.cantonAreas = '441324'
        this.paramss.cantonAreas = '441324'
        this.breadcrumbAreaName = '龙门县'
        this.isArea = true
      } else if (val == '梅江区') {
        this.params.cantonAreas = '441402'
        this.paramss.cantonAreas = '441402'
        this.breadcrumbAreaName = '梅江区'
        this.isArea = true
      } else if (val == '梅县区') {
        this.params.cantonAreas = '441403'
        this.paramss.cantonAreas = '441403'
        this.breadcrumbAreaName = '梅县区'
        this.isArea = true
      } else if (val == '大埔县') {
        this.params.cantonAreas = '441422'
        this.paramss.cantonAreas = '441422'
        this.breadcrumbAreaName = '大埔县'
        this.isArea = true
      } else if (val == '丰顺县') {
        this.params.cantonAreas = '441423'
        this.paramss.cantonAreas = '441423'
        this.breadcrumbAreaName = '丰顺县'
        this.isArea = true
      } else if (val == '五华县') {
        this.params.cantonAreas = '441424'
        this.paramss.cantonAreas = '441424'
        this.breadcrumbAreaName = '五华县'
        this.isArea = true
      } else if (val == '平远县') {
        this.params.cantonAreas = '441426'
        this.paramss.cantonAreas = '441426'
        this.breadcrumbAreaName = '平远县'
        this.isArea = true
      } else if (val == '蕉岭县') {
        this.params.cantonAreas = '441427'
        this.paramss.cantonAreas = '441427'
        this.breadcrumbAreaName = '蕉岭县'
        this.isArea = true
      } else if (val == '兴宁市') {
        this.params.cantonAreas = '441481'
        this.paramss.cantonAreas = '441481'
        this.breadcrumbAreaName = '兴宁市'
        this.isArea = true
      } else if (val == '城区') {
        this.params.cantonAreas = '441502'
        this.paramss.cantonAreas = '441502'
        this.breadcrumbAreaName = '城区'
        this.isArea = true
      } else if (val == '海丰县') {
        this.params.cantonAreas = '441521'
        this.paramss.cantonAreas = '441521'
        this.breadcrumbAreaName = '海丰县'
        this.isArea = true
      } else if (val == '陆河县') {
        this.params.cantonAreas = '441523'
        this.paramss.cantonAreas = '441523'
        this.breadcrumbAreaName = '陆河县'
        this.isArea = true
      } else if (val == '陆丰市') {
        this.params.cantonAreas = '441581'
        this.paramss.cantonAreas = '441581'
        this.breadcrumbAreaName = '陆丰市'
        this.isArea = true
      } else if (val == '源城区') {
        this.params.cantonAreas = '441602'
        this.paramss.cantonAreas = '441602'
        this.breadcrumbAreaName = '源城区'
        this.isArea = true
      } else if (val == '紫金县') {
        this.params.cantonAreas = '441621'
        this.paramss.cantonAreas = '441621'
        this.breadcrumbAreaName = '紫金县'
        this.isArea = true
      } else if (val == '龙川县') {
        this.params.cantonAreas = '441622'
        this.paramss.cantonAreas = '441622'
        this.breadcrumbAreaName = '龙川县'
        this.isArea = true
      } else if (val == '连平县') {
        this.params.cantonAreas = '441623'
        this.paramss.cantonAreas = '441623'
        this.breadcrumbAreaName = '连平县'
        this.isArea = true
      } else if (val == '和平县') {
        this.params.cantonAreas = '441624'
        this.paramss.cantonAreas = '441624'
        this.breadcrumbAreaName = '和平县'
        this.isArea = true
      } else if (val == '东源县') {
        this.params.cantonAreas = '441625'
        this.paramss.cantonAreas = '441625'
        this.breadcrumbAreaName = '东源县'
        this.isArea = true
      } else if (val == '江城区') {
        this.params.cantonAreas = '441702'
        this.paramss.cantonAreas = '441702'
        this.breadcrumbAreaName = '江城区'
        this.isArea = true
      } else if (val == '阳东区') {
        this.params.cantonAreas = '441704'
        this.paramss.cantonAreas = '441704'
        this.breadcrumbAreaName = '阳东区'
        this.isArea = true
      } else if (val == '阳西县') {
        this.params.cantonAreas = '441721'
        this.paramss.cantonAreas = '441721'
        this.breadcrumbAreaName = '阳西县'
        this.isArea = true
      } else if (val == '阳春市') {
        this.params.cantonAreas = '441781'
        this.paramss.cantonAreas = '441781'
        this.breadcrumbAreaName = '阳春市'
        this.isArea = true
      } else if (val == '清城区') {
        this.params.cantonAreas = '441802'
        this.paramss.cantonAreas = '441802'
        this.breadcrumbAreaName = '清城区'
        this.isArea = true
      } else if (val == '清新区') {
        this.params.cantonAreas = '441803'
        this.paramss.cantonAreas = '441803'
        this.breadcrumbAreaName = '清新区'
        this.isArea = true
      } else if (val == '佛冈县') {
        this.params.cantonAreas = '441821'
        this.paramss.cantonAreas = '441821'
        this.breadcrumbAreaName = '佛冈县'
        this.isArea = true
      } else if (val == '阳山县') {
        this.params.cantonAreas = '441823'
        this.paramss.cantonAreas = '441823'
        this.breadcrumbAreaName = '阳山县'
        this.isArea = true
      } else if (val == '连山壮族瑶族自治县') {
        this.params.cantonAreas = '441825'
        this.paramss.cantonAreas = '441825'
        this.breadcrumbAreaName = '连山壮族瑶族自治县'
        this.isArea = true
      } else if (val == '连南瑶族自治县') {
        this.params.cantonAreas = '441826'
        this.paramss.cantonAreas = '441826'
        this.breadcrumbAreaName = '连南瑶族自治县'
        this.isArea = true
      } else if (val == '英德市') {
        this.params.cantonAreas = '441881'
        this.paramss.cantonAreas = '441881'
        this.breadcrumbAreaName = '英德市'
        this.isArea = true
      } else if (val == '连州市') {
        this.params.cantonAreas = '441882'
        this.paramss.cantonAreas = '441882'
        this.breadcrumbAreaName = '连州市'
        this.isArea = true
      } else if (val == '湘桥区') {
        this.params.cantonAreas = '445102'
        this.paramss.cantonAreas = '445102'
        this.breadcrumbAreaName = '湘桥区'
        this.isArea = true
      } else if (val == '潮安区') {
        this.params.cantonAreas = '445103'
        this.paramss.cantonAreas = '445103'
        this.breadcrumbAreaName = '潮安区'
        this.isArea = true
      } else if (val == '饶平县') {
        this.params.cantonAreas = '445122'
        this.paramss.cantonAreas = '445122'
        this.breadcrumbAreaName = '饶平县'
        this.isArea = true
      } else if (val == '榕城区') {
        this.params.cantonAreas = '445202'
        this.paramss.cantonAreas = '445202'
        this.breadcrumbAreaName = '榕城区'
        this.isArea = true
      } else if (val == '揭东区') {
        this.params.cantonAreas = '445203'
        this.paramss.cantonAreas = '445203'
        this.breadcrumbAreaName = '揭东区'
        this.isArea = true
      } else if (val == '揭西县') {
        this.params.cantonAreas = '445222'
        this.paramss.cantonAreas = '445222'
        this.breadcrumbAreaName = '揭西县'
        this.isArea = true
      } else if (val == '惠来县') {
        this.params.cantonAreas = '445224'
        this.paramss.cantonAreas = '445224'
        this.breadcrumbAreaName = '惠来县'
        this.isArea = true
      } else if (val == '普宁市') {
        this.params.cantonAreas = '445281'
        this.paramss.cantonAreas = '445281'
        this.breadcrumbAreaName = '普宁市'
        this.isArea = true
      } else if (val == '云城区') {
        this.params.cantonAreas = '445302'
        this.paramss.cantonAreas = '445302'
        this.breadcrumbAreaName = '云城区'
        this.isArea = true
      } else if (val == '云安区') {
        this.params.cantonAreas = '445303'
        this.paramss.cantonAreas = '445303'
        this.breadcrumbAreaName = '云安区'
        this.isArea = true
      } else if (val == '新兴县') {
        this.params.cantonAreas = '445321'
        this.paramss.cantonAreas = '445321'
        this.breadcrumbAreaName = '新兴县'
        this.isArea = true
      } else if (val == '郁南县') {
        this.params.cantonAreas = '445322'
        this.paramss.cantonAreas = '445322'
        this.breadcrumbAreaName = '郁南县'
        this.isArea = true
      } else if (val == '罗定市') {
        this.params.cantonAreas = '445381'
        this.paramss.cantonAreas = '445381'
        this.breadcrumbAreaName = '罗定市'
        this.isArea = true
      } else {
        this.params.cantonAreas = ''
        this.paramss.cantonAreas = ''
        this.breadcrumbAreaName = ''
        this.isArea = false
      }
    },

    'paramss.cantonCitys': {
      immediate: true,
      deep: true,
      handler (oldVal, newVal) {
        setTimeout(() => {
          this.getTopPlanningValue()
          this.getBottomPlanningValue()
        }, 0)
      }
    },
    'params.cantonCitys': {
      immediate: true,
      deep: true,
      handler (oldVal, newVal) {
        setTimeout(() => {
          this.getTopDetectionValue()
          this.getBottomDetectionValue()
        }, 0)
      }
    },
    'paramss.cantonAreas': {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          this.getTopPlanningValue()
          this.getBottomPlanningValue()
        }, 0)
      }
    },
    'params.cantonAreas': {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          this.getTopDetectionValue()
          this.getBottomDetectionValue()
        }, 0)
      }
    },
    currentTab: {
      immediate: true,
      deep: true,
      handler (val) {
        sessionStorage.removeItem('indexCity')
        sessionStorage.removeItem('indexArea')
        this.breadcrumbWayName = ''
        this.isWay = false
        this.breadcrumbWrapName = ''
        this.isWrap = false
        this.clickCity = ''
        this.isCity = false
        this.clickAreaName = ''
        this.isArea = false
        this.initEchart()
        setTimeout(() => {
          this.returnLastStepFirst()
        }, 10)
        if (val === 0) {
          setTimeout(() => {
            this.returnLastStepFirst()
          }, 10)
        } else if (val === 1) {
          setTimeout(() => {
            this.returnLastStepSecond()
          }, 10)
        } else if (val === 2) {
          setTimeout(() => {
            this.returnLastStepThird()
          }, 10)
        }
      }
    }
  }
}
</script>
<style scoped>
.page-body {
  padding: 20px 30px;
  box-sizing: border-box;
}
#map-index {
  box-sizing: border-box;
  padding: 20px 30px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background-color: #f7f7f7;
}
.left-index {
  width: 22%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.index-top-box {
  height: 230px;
  width: 100%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
}
.index-top-title {
  height: 45px;
  width: 100%;
  background-color: #e8eaf6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #2d2d2d;
  font-weight: 900;
}
.index-top-content {
  height: 185px;
  width: 100%;
  padding: 0 20px;
  background-color: #fff;
}
.content-ul {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content-li {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2d2d2d;
  font-size: 16px;
}
.index-bottom-box {
  height: calc(100% - 230px);
  width: 100%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  padding: 10px 20px 10px 20px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.index-bottom-box::-webkit-scrollbar {
  display: none;
}
.content-ul__custom {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.content-li__custom {
  /* height: 40px; */
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #2d2d2d;
  font-size: 16px;
}
.content-li-icon {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.content-li-icon-from-first {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 5px;
  background-image: url("../../../assets/images/leader/no1.png");
  background-size: 100% 100%;
}
.content-li-icon-from-second {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 5px;
  background-image: url("../../../assets/images/leader/no2.png");
  background-size: 100% 100%;
}
.content-li-icon-from-third {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 5px;
  background-image: url("../../../assets/images/leader/no3.png");
  background-size: 100% 100%;
}
.content-li-icon-from-name {
  width: 160px;
  word-break: break-all;
}
.middle-index {
  width: 56%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
  position: relative;
}
.index-map-button-box {
  display: flex;
  justify-content: flex-start;
  margin: 15px 0 0 15px;
  position: relative;
}
.index-map-button {
  height: 36px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #1d7ce4;
  color: #1d7ce4;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 10px 10px;
  font-size: 14px;
  border-radius: 2px;
  margin-right: 10px;
}
.map-inline {
  position: absolute;
  right: 5px;
}
.index-map-button-box .active {
  height: 36px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #1d7ce4;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 10px 10px;
  font-size: 14px;
  border-radius: 2px;
  margin-right: 10px;
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
}
.chart-bread-name {
  height: 15px;
  position: absolute;
  top: 55px;
  left: 15px;
  z-index: 55;
}
.chart-bread-name img {
  width: 18px;
  height: 20px;
  margin-top: 10px;
}
.index-map-current-box {
  width: 100%;
  height: calc(100% - 140px);
}
.index-search {
  width: 394px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.13);
  border-radius: 7px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index-search-word {
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
  cursor: pointer;
}
.right-index {
  width: 22%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
@media screen and (max-width: 1600px) {
  .index-top-content {
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .index-top-content::-webkit-scrollbar {
    display: none;
  }
  .content-li {
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #2d2d2d;
    font-size: 16px;
  }
  .content-li__custom {
    min-height: 60px;
    padding: 4px 0px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: flex-start !important;
    color: #2d2d2d;
    font-size: 16px;
  }
  .content-li-icon {
    min-height: 22px;
    line-height: 22px;
  }
  .content-li-icon-from-name {
    min-height: 22px;
    line-height: 22px;
  }
  .content-li-number {
    width: 100%;
    min-height: 22px;
    line-height: 22px;
    /* min-height: 32px; */
    padding-left: 25px;
    /* padding-top: 5px; */
    /* padding-bottom: 5px; */
  }
}
</style>
<style>
#map-index .middle-index .el-icon-arrow-right:before {
  content: "\e6e0" !important;
}
</style>
