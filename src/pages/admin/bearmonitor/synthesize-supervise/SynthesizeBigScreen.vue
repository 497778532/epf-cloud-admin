<template>
  <div :class="{'page-body':this.chartScreen==='small','page-body__custom':this.chartScreen==='big'}"
       :id="{'page-body-chart':this.chartScreen==='small','page-body-chart__custom':this.chartScreen==='big'}">
    <div :class="{'chart-header':this.chartScreen==='small','chart-header__custom':this.chartScreen==='big'}">
      <p :class="{'chart-header-title':this.chartScreen==='small','chart-header-title__custom':this.chartScreen==='big'}">资源环境承载能力监测预警</p>
      <div :class="{'chart-header-time':this.chartScreen==='small','chart-header-time__custom':this.chartScreen==='big'}">
        <i :class="{'chart-header-timeIcon':this.chartScreen==='small','chart-header-timeIcon__custom':this.chartScreen==='big'}"></i>
        {{ this.presentTime }}
      </div>

      <el-tooltip effect="dark"
                  content="全屏"
                  placement="bottom"
                  v-if="this.chartScreen==='small'">
        <img src="../../../../assets/images/czjcyj/fullicon.png"
             alt
             class="chart-header-screenIcon"
             @click="fullScreen" />
      </el-tooltip>
      <el-tooltip effect="light"
                  content="退出全屏"
                  placement="left"
                  v-if="this.chartScreen==='big'">
        <img src="../../../../assets/images/czjcyj/nofullicon.png"
             alt
             class="chart-header-screenIcon__custom"
             @click="exitFullScreen" />
      </el-tooltip>
    </div>
    <div :class="{'chart-content-wrap':this.chartScreen==='small','chart-content-wrap__custom':this.chartScreen==='big'}">
      <!-- 大屏左边 -->
      <div class="chart-content-wrapLeft">
        <div class="chart-content-wrapLeft-top">
          <!-- 左顶部 -->
          <div :class="{'wrap-left-top':this.chartScreen==='small','wrap-left-top__custom':this.chartScreen==='big'}">
            <div :class="{'wrap-header':this.chartScreen==='small','wrap-header__custom':this.chartScreen==='big'}">
              <div class="wrap-header-icon"
                   style="background:#0ACD8E;"></div>
              <div :class="{'wrap-header-title':this.chartScreen==='small','wrap-header-title__custom':this.chartScreen==='big'}">土地资源</div>
              <div class="wrap-header-ltStyle"
                   v-if="this.chartScreen==='big'"></div>
            </div>
            <div class="title-message-wrapBox">
              <div class="title-message-content">
                <div :class="{'title-message':this.chartScreen==='small','title-message__custom':this.chartScreen==='big'}">
                  <span>可利用程度评价：</span>
                  <span>{{this.landLevelNameData}}</span>
                </div>
              </div>
              <div class="wrap-left-top-message-content"
                   v-if="this.chartScreen==='small'">
                <div class="wrap-left-top-message"
                     v-for="(item,index) in landData"
                     :key="index">
                  <span>{{item.name}}</span>
                  <span>{{item.number}}{{item.unit}}</span>
                </div>
              </div>
              <div class="wrap-left-top-message-content"
                   v-if="this.chartScreen==='big'">
                <div class="wrap-left-top-message__custom"
                     v-for="(item,index) in landData"
                     :key="index">
                  <span>{{item.name}}</span>
                  <span>{{item.number}}{{item.unit}}</span>
                </div>
              </div>
              <div id="chartLT"
                   style=" width: 100%; height: 50%"></div>
            </div>
          </div>
          <!-- 左中部 -->
          <div :class="{'wrap-left-middle':this.chartScreen==='small','wrap-left-middle__custom':this.chartScreen==='big'}">
            <div :class="{'wrap-header':this.chartScreen==='small','wrap-header__custom':this.chartScreen==='big'}">
              <div class="wrap-header-icon"
                   style="background:#50B8EF;"></div>
              <div :class="{'wrap-header-title':this.chartScreen==='small','wrap-header-title__custom':this.chartScreen==='big'}">水资源</div>
              <div class="wrap-header-lmStyle"
                   v-if="this.chartScreen==='big'"></div>
            </div>

            <div class="title-message-wrapBox">
              <div class="title-message-content">
                <div :class="{'title-message':this.chartScreen==='small','title-message__custom':this.chartScreen==='big'}">
                  <span>可利用程度评价：</span>
                  <span>{{this.evaluationLevelNameData}}</span>
                </div>
              </div>

              <div :class="{'wrap-left-middle-content-box':this.chartScreen==='small','wrap-left-middle-content-box__custom':this.chartScreen==='big'}">
                <div class="wrap-left-middle-content">
                  <div class="wrap-left-middle-content-top">
                    <img class="wrap-left-middle-content-top-image"
                         src="../../../../assets/images/czjcyj/lm001.png"
                         alt />
                    <p :class="{'wrap-left-middle-content-top-title':this.chartScreen==='small','wrap-left-middle-content-top-title__custom':this.chartScreen==='big'}">地表水资源可利用量</p>
                  </div>
                  <div class="wrap-left-middle-content-bottom">{{this.surfaceAmountData}}</div>
                </div>

                <div :class="{'wrap-header-columStyle':this.chartScreen==='small','wrap-header-columStyle__custom':this.chartScreen==='big'}"></div>

                <div class="wrap-left-middle-content">
                  <div class="wrap-left-middle-content-top">
                    <img class="wrap-left-middle-content-top-image"
                         src="../../../../assets/images/czjcyj/lm002.png"
                         alt />
                    <p :class="{'wrap-left-middle-content-top-title':this.chartScreen==='small','wrap-left-middle-content-top-title__custom':this.chartScreen==='big'}">地下水资源可开采量</p>
                  </div>
                  <div class="wrap-left-middle-content-bottom">{{this.groundAmountData}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 左底部 -->
        <div :class="{'wrap-left-bottom':this.chartScreen==='small','wrap-left-bottom__custom':this.chartScreen==='big'}">
          <div :class="{'wrap-header':this.chartScreen==='small','wrap-header__custom':this.chartScreen==='big'}">
            <div class="wrap-header-icon"
                 style="background:#F0525B;"></div>
            <div :class="{'wrap-header-title':this.chartScreen==='small','wrap-header-title__custom':this.chartScreen==='big'}">三区三线</div>
            <div class="wrap-header-lbStyle"
                 v-if="this.chartScreen==='big'"></div>
          </div>
          <div class="wrap-left-bottom-content">
            <div :class="{'wrap-left-bottom-content-showData':this.chartScreen==='small','wrap-left-bottom-content-showData__custom':this.chartScreen==='big'}">
              <div :class="{'showData-title':this.chartScreen==='small','showData-title__custom':this.chartScreen==='big'}">
                国土开发强度：
                <span class="showData-message">{{this.landExploitData}}</span>
              </div>
              <div :class="{'showData-title':this.chartScreen==='small','showData-title__custom':this.chartScreen==='big'}">
                三类空间比重：
                <span class="showData-message">{{this.spaceWeightData}}</span>
              </div>
            </div>
            <div :class="{'wrap-left-bottom-content-table':this.chartScreen==='small','wrap-left-bottom-content-table__custom':this.chartScreen==='big'}">
              <table width="100%"
                     height="100%"
                     max-width="100%"
                     border="1"
                     cellpadding="4"
                     cellspacing="0"
                     bordercolor="#e8eaf6"
                     style="table-layout:fixed;text-align:center;"
                     v-if="this.chartScreen==='small'">
                <tr height="20px"
                    style="color:#4F4F4F;background:rgba(232,234,246,1);">
                  <td>名称</td>
                  <td>现状（{{this.nowYearData}}）</td>
                  <td>规划（{{this.planYearData}}）</td>
                </tr>
                <tr height="20px"
                    style="color:#4F4F4F;"
                    v-for="(item, index) in areaLinesData"
                    :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.now }}{{item.nowUnit}}</td>
                  <td>{{ item.feature }}{{item.featureUnit}}</td>
                </tr>
              </table>
              <table width="100%"
                     height="100%"
                     max-width="100%"
                     border="1"
                     cellpadding="4"
                     cellspacing="0"
                     bordercolor="#818181"
                     style="table-layout:fixed;text-align:center;"
                     v-if="this.chartScreen==='big'">
                <tr height="20px"
                    style="color:#fff;background:linear-gradient(270deg,rgba(18,22,35,1) 0%,rgba(28,40,128,1) 100%);">
                  <td>名称</td>
                  <td>现状（{{this.nowYearData}}）</td>
                  <td>规划（{{this.planYearData}}）</td>
                </tr>
                <tr height="20px"
                    style="color:#fff;"
                    v-for="(item, index) in areaLinesData"
                    :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.now }}{{item.nowUnit}}</td>
                  <td>{{ item.feature }}{{item.featureUnit}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- 大屏中间 -->
      <div class="chart-content-wrapMiddle">
        <!-- 中中部(地图展示) -->
        <div :class="{'wrap-middle-top':this.chartScreen==='small','wrap-middle-top__custom':this.chartScreen==='big'}">
          <div class="chart-bread-name">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>
                <img src="../../../../assets/images/czjcyj/dingwei01.png"
                     alt />
                <el-button type="text"
                           @click="toProvinceWide"
                           style="color:#1D7CE4;">广东省</el-button>
              </el-breadcrumb-item>
              <el-breadcrumb-item v-if="isCity">
                <el-button type="text"
                           @click="toCityWide"
                           style="color:#1D7CE4;">
                  {{
                  breadcrumbCityName
                  }}
                </el-button>
              </el-breadcrumb-item>
              <el-breadcrumb-item v-if="isArea">
                <el-button type="text"
                           style="color:#1D7CE4;">
                  {{
                  breadcrumbAreaName
                  }}
                </el-button>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div :class="{'wrap-middle-top-wrapBorder':this.chartScreen==='small','wrap-middle-top-wrapBorder__custom':this.chartScreen==='big'}">
            <span>资源环境承载评价等级：</span>
            <span>{{this.levelName}}</span>
          </div>
          <div :class="{'map-border':this.chartScreen==='small','map-border__custom':this.chartScreen==='big'}"></div>

          <div id="chinaChart"
               style="width:100%;height: 100%;"
               ref="mapChart"></div>
        </div>

        <!-- 中底部 -->
        <div :class="{'chart-content-wrapMiddle-bottom':this.chartScreen==='small','chart-content-wrapMiddle-bottom__custom':this.chartScreen==='big'}">
          <!-- 中左底部 -->
          <div :class="{'wrap-middle-bottom-left':this.chartScreen==='small','wrap-middle-bottom-left__custom':this.chartScreen==='big'}">
            <div :class="{'wrap-header':this.chartScreen==='small','wrap-header__custom':this.chartScreen==='big'}">
              <div class="wrap-header-icon"
                   style="background:#2060AB;"></div>
              <div :class="{'wrap-header-title':this.chartScreen==='small','wrap-header-title__custom':this.chartScreen==='big'}">开发利用</div>
              <div class="wrap-header-mblStyle"
                   v-if="this.chartScreen==='big'"></div>
            </div>

            <div :class="{'wrap-middle-bottom-left-chart':this.chartScreen==='small','wrap-middle-bottom-left-chart__custom':this.chartScreen==='big'}">
              <div class="wrap-middle-bottom-left-chart-content">
                <div id="chartMBT"
                     style=" width: 100%; height: 50%"></div>
                <div id="chartMBB"
                     style=" width: 100%; height: 50%"></div>
              </div>
              <div :class="{'wrap-header-columStyle':this.chartScreen==='small','wrap-header-columStyle__custom':this.chartScreen==='big'}"></div>
              <div class="wrap-middle-bottom-left-list"
                   v-if="this.chartScreen==='small'">
                <div class="wrap-middle-bottom-left-list-content"
                     v-for="(item,index) in useData"
                     :key="index">
                  <div class="content-list-left">
                    <img :src="item.src"
                         alt />
                  </div>
                  <div class="middle-bottom-content-list-right">
                    <span class="middle-bottom-content-list-right-title">{{item.name}}</span>
                    <span class="middle-bottom-content-list-right-number">
                      <span>{{item.number}}</span>
                      <span>{{item.unit}}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="wrap-middle-bottom-left-list"
                   v-if="this.chartScreen==='big'">
                <div class="wrap-middle-bottom-left-list-content"
                     v-for="(item,index) in useData"
                     :key="index">
                  <div class="content-list-left">
                    <img :src="item.src"
                         alt />
                  </div>
                  <div class="middle-bottom-content-list-right">
                    <span class="middle-bottom-content-list-right-title__custom">{{item.name}}</span>
                    <span class="middle-bottom-content-list-right-number">
                      <span>{{item.number}}</span>
                      <span>{{item.unit}}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 中右底部 -->
          <div :class="{'wrap-middle-bottom-right':this.chartScreen==='small','wrap-middle-bottom-right__custom':this.chartScreen==='big'}">
            <div :class="{'wrap-header':this.chartScreen==='small','wrap-header__custom':this.chartScreen==='big'}">
              <div class="wrap-header-icon"
                   style="background:#44D7B6;"></div>
              <div :class="{'wrap-header-title':this.chartScreen==='small','wrap-header-title__custom':this.chartScreen==='big'}">生态修复</div>
              <div class="wrap-header-mbrStyle"
                   v-if="this.chartScreen==='big'"></div>
            </div>
            <div :class="{'wrap-middle-bottom-right-contentBox':this.chartScreen==='small','wrap-middle-bottom-right-contentBox__custom':this.chartScreen==='big'}">
              <div class="wrap-middle-bottom-right-content">
                <div :class="{'wrap-middle-bottom-right-content-title':this.chartScreen==='small','wrap-middle-bottom-right-content-title__custom':this.chartScreen==='big'}">
                  生态待修复总面积（公顷）：
                  <span class="wrap-middle-bottom-right-content-number">{{this.repairAreaAllSum}}</span>
                </div>
                <div id="chartMTL"
                     style=" width: 100%; height: 80%"></div>
              </div>
              <div class="wrap-middle-bottom-right-content">
                <div :class="{'wrap-middle-bottom-right-content-title':this.chartScreen==='small','wrap-middle-bottom-right-content-title__custom':this.chartScreen==='big'}">
                  土地整治总面积（公顷）：
                  <span class="wrap-middle-bottom-right-content-number">{{this.remediateAreaAllSum}}</span>
                </div>
                <div class="wrap-middle-bottom-right-content-data"
                     v-if="this.chartScreen==='small'">
                  <div class="wrap-middle-bottom-right-content-list"
                       v-for="(item,index) in repairDataList"
                       :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.number}}</span>
                  </div>
                </div>
                <div class="wrap-middle-bottom-right-content-data"
                     v-if="this.chartScreen==='big'">
                  <div class="wrap-middle-bottom-right-content-list__custom"
                       v-for="(item,index) in repairDataList"
                       :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.number}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 大屏右边 -->
      <div class="chart-content-wrapRight">
        <div class="chart-content-wrapRight-top">
          <!-- 右顶部 -->

          <div :class="{'wrap-right-top':this.chartScreen==='small','wrap-right-top__custom':this.chartScreen==='big'}">
            <div :class="{'wrap-header':this.chartScreen==='small','wrap-header__custom':this.chartScreen==='big'}">
              <div class="wrap-header-icon"
                   style="background:#F4CE52;"></div>
              <div :class="{'wrap-header-title':this.chartScreen==='small','wrap-header-title__custom':this.chartScreen==='big'}">确权登记</div>
              <div class="wrap-header-rtStyle"
                   v-if="this.chartScreen==='big'"></div>
            </div>
            <div class="wrap-right-top-content">
              <ul class="wrap-right-top-messageBox"
                  v-if="this.chartScreen==='small'">
                <li class="wrap-right-top-message"
                    v-for="(item, index) in registrationList"
                    :key="index">
                  <span class="wrap-right-top-message-title">{{ item.name }}</span>
                  <span class="wrap-right-top-message-number">{{ item.sum }} {{ item.unit }}</span>
                </li>
              </ul>
              <ul class="wrap-right-top-messageBox__custom"
                  v-if="this.chartScreen==='big'">
                <li class="wrap-right-top-message__custom"
                    v-for="(item, index) in registrationList"
                    :key="index">
                  <span class="wrap-right-top-message-title__custom">{{ item.name }}</span>
                  <span class="wrap-right-top-message-number__custom">{{ item.sum }} {{ item.unit }}</span>
                </li>
              </ul>

              <div class="chart-rt">
                <div id="chartRTL"
                     style=" width: 50%; height: 100%"></div>
                <div id="chartRTR"
                     style=" width: 50%; height: 100%"></div>
              </div>
            </div>
          </div>
          <!-- 右中部 -->
          <div :class="{'wrap-right-middle':this.chartScreen==='small','wrap-right-middle__custom':this.chartScreen==='big'}">
            <div :class="{'wrap-header':this.chartScreen==='small','wrap-header__custom':this.chartScreen==='big'}">
              <div class="wrap-header-icon"
                   style="background:#FA8C16;"></div>
              <div :class="{'wrap-header-title':this.chartScreen==='small','wrap-header-title__custom':this.chartScreen==='big'}">执法监察</div>
              <div class="wrap-header-rmStyle"
                   v-if="this.chartScreen==='big'"></div>
            </div>

            <div :class="{'wrap-right-middle-message-title':this.chartScreen==='small','wrap-right-middle-message-title__custom':this.chartScreen==='big'}">
              本年度立案&nbsp;
              <span class="wrap-right-middle-message-number">{{this.lianCount}}</span>&nbsp;件，涉及城中村改造&nbsp;
              <span class="wrap-right-middle-message-number">{{this.shejiCount}}</span>&nbsp;件
            </div>
            <div id="chartRM"
                 style=" width: 100%; height: 70%"></div>
          </div>
        </div>
        <!-- 右底部 -->
        <div :class="{'wrap-right-bottom':this.chartScreen==='small','wrap-right-bottom__custom':this.chartScreen==='big'}">
          <div :class="{'wrap-header':this.chartScreen==='small','wrap-header__custom':this.chartScreen==='big'}">
            <div class="wrap-header-icon"
                 style="background:#1890FF;"></div>
            <div :class="{'wrap-header-title':this.chartScreen==='small','wrap-header-title__custom':this.chartScreen==='big'}">地质矿产</div>
            <div class="wrap-header-rbStyle"
                 v-if="this.chartScreen==='big'"></div>
          </div>

          <div :class="{'wrap-right-bottom-contentBox':this.chartScreen==='small','wrap-right-bottom-contentBox__custom':this.chartScreen==='big'}">
            <div :class="{'wrap-right-bottom-content':this.chartScreen==='small','wrap-right-bottom-content__custom':this.chartScreen==='big'}">
              <div :class="{'wrap-right-bottom-content-list':this.chartScreen==='small','wrap-right-bottom-content-list__custom':this.chartScreen==='big'}">
                <div class="content-list-left">
                  <img src="../../../../assets/images/czjcyj/zhjgrb001.png"
                       alt />
                </div>
                <div :class="{'content-list-right':this.chartScreen==='small','content-list-right__custom':this.chartScreen==='big'}">
                  <span>地质调查项目</span>
                  <span>{{this.surveyProjectNumberData}}个</span>
                </div>
              </div>
              <div :class="{'wrap-right-bottom-content-list':this.chartScreen==='small','wrap-right-bottom-content-list__custom':this.chartScreen==='big'}">
                <div class="content-list-left">
                  <img src="../../../../assets/images/czjcyj/zhjgrb002.png"
                       alt />
                </div>
                <div :class="{'content-list-right':this.chartScreen==='small','content-list-right__custom':this.chartScreen==='big'}">
                  <span>经费总预算</span>
                  <span>{{this.totalBudgetData}}亿元</span>
                </div>
              </div>
            </div>
            <div :class="{'wrap-right-bottom-content':this.chartScreen==='small','wrap-right-bottom-content__custom':this.chartScreen==='big'}">
              <div :class="{'wrap-right-bottom-content-list':this.chartScreen==='small','wrap-right-bottom-content-list__custom':this.chartScreen==='big'}">
                <div class="content-list-left">
                  <img src="../../../../assets/images/czjcyj/zhjgrb003.png"
                       alt />
                </div>
                <div :class="{'content-list-right':this.chartScreen==='small','content-list-right__custom':this.chartScreen==='big'}">
                  <span>采矿权出让</span>
                  <span>{{this.exploitTransferData}}个</span>
                </div>
              </div>
              <div :class="{'wrap-right-bottom-content-list':this.chartScreen==='small','wrap-right-bottom-content-list__custom':this.chartScreen==='big'}">
                <div class="content-list-left">
                  <img src="../../../../assets/images/czjcyj/zhjgrb004.png"
                       alt />
                </div>
                <div :class="{'content-list-right':this.chartScreen==='small','content-list-right__custom':this.chartScreen==='big'}">
                  <span>出让总价款</span>
                  <span>{{this.transferTotalPriceData}}亿元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
import qs from "qs";
import Bus from "../../../../utils/bus";
import echarts from "echarts";
import moment from "moment";
import screenfull from "screenfull";
import "../../../../../static/map/js/province/guangdong";
require("echarts/lib/chart/map");
// 图例
require("echarts/lib/component/legend");
// 提示框
require("echarts/lib/component/tooltip");
// 地图geo
require("echarts/lib/component/geo");

export default {
  name: "SynthesizeBigScreen",
  data () {
    return {
      // 地图
      chart: null,
      timeFn: null,
      mapCode: "",
      pro: {
        广州市: "../../../../../static/map/json/province/440100.json",
        韶关市: "../../../../../static/map/json/province/440200.json",
        深圳市: "../../../../../static/map/json/province/440300.json",
        珠海市: "../../../../../static/map/json/province/440400.json",
        汕头市: "../../../../../static/map/json/province/440500.json",
        佛山市: "../../../../../static/map/json/province/440600.json",
        江门市: "../../../../../static/map/json/province/440700.json",
        湛江市: "../../../../../static/map/json/province/440800.json",
        茂名市: "../../../../../static/map/json/province/440900.json",
        肇庆市: "../../../../../static/map/json/province/441200.json",
        惠州市: "../../../../../static/map/json/province/441300.json",
        梅州市: "../../../../../static/map/json/province/441400.json",
        汕尾市: "../../../../../static/map/json/province/441500.json",
        河源市: "../../../../../static/map/json/province/441600.json",
        阳江市: "../../../../../static/map/json/province/441700.json",
        清远市: "../../../../../static/map/json/province/441800.json",
        东莞市: "../../../../../static/map/json/province/441900.json",
        中山市: "../../../../../static/map/json/province/442000.json",
        潮州市: "../../../../../static/map/json/province/445100.json",
        揭阳市: "../../../../../static/map/json/province/445200.json",
        云浮市: "../../../../../static/map/json/province/445300.json"
      },
      allData: [],

      level: "",
      levelName: "",
      clickCity: "", // 获取市id
      clickAreaName: "", // 获取区name

      selectCityID: "",
      selectAreaID: "",

      // 请求参数
      params: {
        province: "440000",
        city: "",
        area: "",
        year: moment().year()
      },

      isNoReturnScreen: false, // 判断是否全屏
      presentTime: "", // 时间
      // 面包屑
      isCity: false,
      breadcrumbCityName: "",
      isArea: false,
      breadcrumbAreaName: "",

      // 土地资源
      constructionLandData: "",
      agriculturalLandData: "",
      unutilizedLandData: "",
      landLevelNameData: "",
      landData: [],

      // 水资源
      surfaceAmountData: "",
      groundAmountData: "",
      evaluationLevelNameData: "",

      // 三区三线
      nowYearData: "",
      planYearData: "",
      ecologyLineNowData: "",
      farmlandLineNowData: "",
      townBoundaryNowData: "",
      ecologyLinePlanData: "",
      farmlandLinePlanData: "",
      townBoundaryPlanData: "",
      landExploitData: "",
      spaceWeightData: "",
      areaLinesData: [],

      // 开发利用
      supplyLandAreaData: "",
      approvedAreaData: "",
      constructionLandNewData: "",
      transferTotalData: "",
      constructionLandNewRateData: "",
      landSupplyPlanData: "",
      useData: [],

      // 生态修复
      repairAreaAllSum: "",
      remediateAreaAllSum: "",
      projectNumberData: "",
      implementNumberData: "",
      acceptanceNumberData: "",
      repairDataList: [],

      // 确权登记
      mortgageAmountSum: "",
      mortgageCountSum: "",
      certificateCountSum: "",
      registrationList: [],

      // 执法监察
      lianCount: "",
      shejiCount: "",

      // 地质矿产
      surveyProjectNumberData: "",
      totalBudgetData: "",
      exploitTransferData: "",
      transferTotalPriceData: "",

      chartScreen: "small", //大屏<=>全屏

      isShowMenu: ''
    };
  },
  methods: {
    //地图展示
    async loadMap (mapCode, name) {
      setTimeout(() => {
        document.getElementById("chinaChart").style.width = 100 + "%";
        this.chart = echarts.init(this.$refs.mapChart);
        this.chart.resize(); // 直接加这句即可
      }, 0);

      // 请求数据
      let params = this.params;
      params["city"] = this.clickCity;

      let mapRes = await this.$get(
        "/epf-monitor-bearer/bigScreen/getBearerCapacity",
        params
      );

      if (mapRes.code == 0) {
        this.levelName = mapRes.self.monitLevelName;
        let chartData = mapRes.result;

        var mapAllData = [];
        for (var key in chartData) {
          if (params.city == "") {
            mapAllData.push({
              name: chartData[key].cityName,
              value: chartData[key].monitValue,
              province: chartData[key].province,
              city: chartData[key].city,
              area: chartData[key].area
            });
          } else {
            mapAllData.push({
              name: chartData[key].areaName,
              value: chartData[key].monitValue,
              province: chartData[key].province,
              city: chartData[key].city,
              area: chartData[key].area
            });
          }
        }
        let color1 = "";
        let color2 = "";

        if (this.chartScreen === "small") {
          color1 = "#303030";
          color2 = "#707070";
        } else if (this.chartScreen === "big") {
          color1 = "#fff";
          color2 = "#fff";
        }

        const that = this;
        const data = await axios.get(mapCode);

        if (data) {
          this.chart = echarts.init(this.$refs.mapChart);
          echarts.registerMap(name, data);

          var option = {
            title: {
              text: "资源环境承载能力等级",
              bottom: 150,
              right: 25,
              textStyle: {
                color: color1,
                fontSize: 14,
                fontWeight: "bolder"
              }
            },
            tooltip: {},
            visualMap: {
              type: "piecewise", // 分段型。
              splitNumber: 6,
              inverse: true,

              pieces: [
                {
                  min: 0.001,
                  max: 0.11,
                  label: "Ⅰ级  0.001 - 0.110",
                  color: "#FDF0DD"
                },
                {
                  min: 0.11,
                  max: 0.168,
                  label: "Ⅱ级  0.110 - 0.168",
                  color: "#FACE89"
                },
                {
                  min: 0.168,
                  max: 0.358,
                  label: "Ⅲ级  0.168 - 0.358",
                  color: "#FA8B5F"
                },
                {
                  min: 0.358,
                  max: 0.798,
                  label: "Ⅳ级  0.358 - 0.798",
                  color: "#E04937"
                },
                {
                  min: 0.798,
                  max: 1.0,
                  label: "Ⅴ级  0.798 - 1.000",
                  color: "#AF0102"
                }
              ],
              right: "3%",
              bottom: "3%",
              textStyle: {
                color: color2,
                fontSize: 12
              }
            },
            series: [
              {
                name: "MAP",
                type: "map",
                // roam: true, //禁止缩放
                mapType: name,
                aspectScale: 1,
                selectedMode: "false", // 是否允许选中多个区域
                label: {
                  normal: {
                    show: false
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
                    // areaColor: "#10d4c3",
                    borderWidth: 2,
                    borderColor: "#5276f1"
                  } // 鼠标事件区块样式
                },
                zoom: 1,
                tooltip: {
                  trigger: "item",
                  // formatter: "{b} : {c}"
                  formatter: function (params) {
                    if (params.data) {
                      return params.name + "：" + params.data["value"];
                    } else {
                      return params.name + "：" + 0;
                    }
                  }
                },
                data: mapAllData
              }
            ]
          };
          this.chart.setOption(option, true);
          this.chart.on("click", function (params) {
            sessionStorage.setItem("syntheCity", params.data.city);
            sessionStorage.setItem("syntheArea", params.data.name);

            that.clickCity = sessionStorage.getItem("syntheCity");
            that.clickAreaName = sessionStorage.getItem("syntheArea");

            clearTimeout(this.timeFn);
            this.timeFn = setTimeout(function () {
              const name = params.name;
              const mapCode = that.pro[name];

              if (!mapCode) {
                console.log("1");
                return;
              }
              that.loadMap(mapCode, name);

              setTimeout(() => {
                document.getElementById("chinaChart").style.width = 100 + "%";
              }, 0);

              that.ltDrawLine();
              that.getWaterData();
              that.getThreeData();
              that.getUseData();
              that.mbtDrawLine();
              that.mbbDrawLine();
              that.mtlDrawLine();
              that.rtlDrawLine();
              that.rmDrawLine();
              that.getKuangCanData();
              that.isCity = true;
              that.breadcrumbCityName = name;
            }, 250);
          });
        } else {
          alert("无法加载该地图");
        }
      } else {
        this.$message.error(mapRes.msg); // 失败
      }
    },
    returnLastStep () {
      const that = this;
      this.chart = echarts.init(this.$refs.mapChart);
      // 绑定双击事件，返回全省地图
      this.chart.on("dblclick", function (params) {
        // 当双击事件发生时，清除单击事件，仅响应双击事件
        sessionStorage.removeItem("syntheCity");
        sessionStorage.removeItem("syntheArea");
        that.clickCity = "";
        that.clickAreaName = "";
        that.params.area = "";
        clearTimeout(this.timeFn);

        // that.loadMap(
        //   "../../../../../static/map/json/province/440000.json",
        //   "guangdong"
        // );
        setTimeout(() => {
          document.getElementById("chinaChart").style.width = 100 + "%";
        }, 0);

        that.ltDrawLine();
        that.getWaterData();
        that.getThreeData();
        that.getUseData();
        that.mbtDrawLine();
        that.mbbDrawLine();
        that.mtlDrawLine();
        that.rtlDrawLine();
        that.rmDrawLine();
        that.getKuangCanData();

        that.isCity = false;
        that.breadcrumbCityName = "";
        that.isArea = false;
        that.breadcrumbAreaName = "";
      });
    },
    changeMap () {
      if (sessionStorage.getItem("syntheCity")) {
        if (sessionStorage.getItem("syntheCity") == "440100") {
          this.loadMap(
            "../../../../../static/map/json/province/440100.json",
            "广州市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "440200") {
          this.loadMap(
            "../../../../../static/map/json/province/440200.json",
            "韶关市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "440300") {
          this.loadMap(
            "../../../../../static/map/json/province/440300.json",
            "深圳市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "440400") {
          this.loadMap(
            "../../../../../static/map/json/province/440400.json",
            "珠海市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "440500") {
          this.loadMap(
            "../../../../../static/map/json/province/440500.json",
            "汕头市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "440600") {
          this.loadMap(
            "../../../../../static/map/json/province/440600.json",
            "佛山市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "440700") {
          this.loadMap(
            "../../../../../static/map/json/province/440700.json",
            "江门市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "440800") {
          this.loadMap(
            "../../../../../static/map/json/province/440800.json",
            "湛江市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "440900") {
          this.loadMap(
            "../../../../../static/map/json/province/440900.json",
            "茂名市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "441200") {
          this.loadMap(
            "../../../../../static/map/json/province/441200.json",
            "肇庆市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "441300") {
          this.loadMap(
            "../../../../../static/map/json/province/441300.json",
            "惠州市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "441400") {
          this.loadMap(
            "../../../../../static/map/json/province/441400.json",
            "梅州市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "441500") {
          this.loadMap(
            "../../../../../static/map/json/province/441500.json",
            "汕尾市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "441600") {
          this.loadMap(
            "../../../../../static/map/json/province/441600.json",
            "河源市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "441700") {
          this.loadMap(
            "../../../../../static/map/json/province/441700.json",
            "阳江市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "441800") {
          this.loadMap(
            "../../../../../static/map/json/province/441800.json",
            "清远市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "441900") {
          this.loadMap(
            "../../../../../static/map/json/province/441900.json",
            "东莞市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "442000") {
          this.loadMap(
            "../../../../../static/map/json/province/442000.json",
            "中山市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "445100") {
          this.loadMap(
            "../../../../../static/map/json/province/445100.json",
            "潮州市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "445200") {
          this.loadMap(
            "../../../../../static/map/json/province/445200.json",
            "揭阳市"
          );
        } else if (sessionStorage.getItem("syntheCity") == "445300") {
          this.loadMap(
            "../../../../../static/map/json/province/445300.json",
            "云浮市"
          );
        }
      } else {
        this.loadMap(
          "../../../../../static/map/json/province/440000.json",
          "guangdong"
        );
      }
    },
    // 土地资源
    async ltDrawLine () {
      setTimeout(() => {
        let chartLT = echarts.init(document.getElementById("chartLT"));
        document.getElementById("chartLT").style.width = 100 + "%";
        document.getElementById("chartLT").style.height = 50 + "%";

        chartLT.resize(); // 直接加这句即可
      }, 0);
      let chartLT = echarts.init(document.getElementById("chartLT"));

      let params = this.params;
      params["city"] = this.clickCity;

      let res = await this.$get(
        "/epf-monitor-bearer/bigScreen/getLandResource",
        params
      );
      if (res.code == 0) {
        this.constructionLandData = res.result.constructionLand; // 建设用地面积
        this.agriculturalLandData = res.result.agriculturalLand; // 农用地面积
        this.unutilizedLandData = res.result.unutilizedLand; // 未利用地面积
        this.landLevelNameData = res.result.landLevelName; // 土地资源可利用程度评价等级

        this.landData = [
          {
            name: "建筑用地",
            number: this.constructionLandData,
            unit: "万亩"
          },
          {
            name: "农用地",
            number: this.agriculturalLandData,
            unit: "万亩"
          },
          {
            name: "未利用地",
            number: this.unutilizedLandData,
            unit: "万亩"
          }
        ];

        var legendData = ["建筑用地", "农用地", "未利用地"];

        var Data1 = {
          value: this.constructionLandData,
          name: "建筑用地"
        };
        var Data2 = {
          value: this.agriculturalLandData,
          name: "农用地"
        };
        var Data3 = {
          value: this.unutilizedLandData,
          name: "未利用地"
        };
        var seriesAllData = [];
        seriesAllData = seriesAllData.concat(Data1, Data2, Data3);

        let option = {};

        if (this.chartScreen === "small") {
          option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} "
            },
            legend: [
              {
                orient: "vertical",
                icon: "circle",
                data: legendData,
                right: "10%",
                align: "left",
                top: "middle",
                itemWidth: 14,
                itemHeight: 14,
                formatter: function (name) {
                  var total = 0;
                  var target;
                  for (var i = 0, l = seriesAllData.length; i < l; i++) {
                    total += seriesAllData[i].value;
                    if (seriesAllData[i].name == name) {
                      target = seriesAllData[i].value;
                    }
                  }
                  let rateData = ((target / total) * 100).toFixed(3);
                  if (rateData == "NaN") {
                    rateData = 0;
                  }
                  return (
                    name + " ：" + " " + "{xx|" + rateData + "}" + "{xx| %}"
                  );
                },
                itemGap: 15,
                textStyle: {
                  color: "#707070",
                  fontSize: 14,
                  rich: {
                    xx: {
                      color: "#1D7CE4",
                      fontSize: "14"
                    }
                  }
                }
              }
            ],
            color: ["#40A9FF", "#FA8C16", "#40C79F"],
            series: [
              {
                name: "土地资源",
                type: "pie",
                clockwise: true, // 饼图的扇区是否是顺时针排布
                minAngle: 2, // 最小的扇区角度（0 ~ 360）
                radius: ["60%", "80%"],
                center: ["20%", "50%"],
                avoidLabelOverlap: false,
                // itemStyle: {
                //   //图形样式(间隙颜色和大小)
                //   normal: {
                //     borderColor: "#ffffff",
                //     borderWidth: 3
                //   }
                // },
                label: {
                  normal: {
                    show: false,
                    position: "center",
                    formatter: "{text|{b}}\n{rate|{d}%}",
                    rich: {
                      text: {
                        color: "#707070",
                        fontSize: 10,
                        align: "center",
                        verticalAlign: "middle",
                        padding: 8
                      },
                      rate: {
                        color: "#1D7CE4",
                        fontSize: 11,
                        fontWeight: 550,
                        align: "center",
                        verticalAlign: "middle"
                      }
                    }
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: 24
                    }
                  }
                },
                data: seriesAllData
              }
            ]
          };
        } else if (this.chartScreen === "big") {
          option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} "
            },
            legend: [
              {
                orient: "vertical",
                icon: "circle",
                data: legendData,
                right: "10%",
                align: "left",
                top: "middle",
                itemWidth: 14,
                itemHeight: 14,
                formatter: function (name) {
                  var total = 0;
                  var target;
                  for (var i = 0, l = seriesAllData.length; i < l; i++) {
                    total += seriesAllData[i].value;
                    if (seriesAllData[i].name == name) {
                      target = seriesAllData[i].value;
                    }
                  }
                  let rateData = ((target / total) * 100).toFixed(3);
                  if (rateData == "NaN") {
                    rateData = 0;
                  }
                  return (
                    name + " ：" + " " + "{xx|" + rateData + "}" + "{xx| %}"
                  );
                },
                itemGap: 15,
                textStyle: {
                  color: "#fff",
                  fontSize: 14,
                  rich: {
                    xx: {
                      color: "#1890FF",
                      fontSize: "14"
                    }
                  }
                }
              }
            ],
            color: ["#40A9FF", "#FA8C16", "#40C79F"],
            series: [
              {
                name: "土地资源",
                type: "pie",
                clockwise: true, // 饼图的扇区是否是顺时针排布
                minAngle: 2, // 最小的扇区角度（0 ~ 360）
                radius: ["50%", "80%"],
                center: ["20%", "50%"],
                avoidLabelOverlap: false,
                // itemStyle: {
                //   //图形样式(间隙颜色和大小)
                //   normal: {
                //     borderColor: "#ffffff",
                //     borderWidth: 3
                //   }
                // },
                label: {
                  normal: {
                    show: false,
                    position: "center",
                    formatter: "{text|{b}}\n{rate|{d}%}",
                    rich: {
                      text: {
                        color: "#fff",
                        fontSize: 10,
                        align: "center",
                        verticalAlign: "middle",
                        padding: 8
                      },
                      rate: {
                        color: "#1890FF",
                        fontSize: 16,
                        fontWeight: 550,
                        align: "center",
                        verticalAlign: "middle"
                      }
                    }
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: 24
                    }
                  }
                },
                data: seriesAllData
              }
            ]
          };
        }

        chartLT.setOption(option, true);
      } else {
        this.$message.error(res.msg);
        return;
      }
    },
    // 水资源
    async getWaterData () {
      let params = this.params;
      params["city"] = this.clickCity;

      let res = await this.$get(
        "/epf-monitor-bearer/bigScreen/getWaterResource",
        params
      );

      if (res.code == 0) {
        this.surfaceAmountData = res.result.surfaceAmount; // 地表水资源可利用量
        this.groundAmountData = res.result.groundAmount; // 地下水资源可开采量
        this.evaluationLevelNameData = res.result.evaluationLevelName; // 水资源总体评价等级
      } else {
        this.$message.error(res.msg);
        return;
      }
    },
    // 三区三线
    async getThreeData () {
      let params = this.params;
      params["city"] = this.clickCity;

      let res = await this.$get(
        "/epf-monitor-bearer/bigScreen/getThreeAreaLine",
        params
      );
      if (res.code == 0) {
        this.nowYearData = res.result.nowYear; // 当前值年份
        this.planYearData = res.result.planYear; // 规划值年份
        this.ecologyLineNowData = res.result.ecologyLineNow; // 生态红线当前值
        this.farmlandLineNowData = res.result.farmlandLineNow; // 基本农田控制线当前值
        this.townBoundaryNowData = res.result.townBoundaryNow; // 城镇开发边界当前值
        this.ecologyLinePlanData = res.result.ecologyLinePlan; // 生态红线规划值
        this.farmlandLinePlanData = res.result.farmlandLinePlan; // 基本农田控制线规划值
        this.townBoundaryPlanData = res.result.townBoundaryPlan; // 城镇开发边界规划值
        this.landExploitData = res.result.landExploit; // 国土开发强度
        this.spaceWeightData = res.result.spaceWeight; // 三类空间比重

        this.areaLinesData = [
          {
            name: "生态保护红线",
            now: this.ecologyLineNowData,
            feature: this.ecologyLinePlanData,
            nowUnit: "km²",
            featureUnit: "万km²"
          },
          {
            name: "基本农田控制线",
            now: this.farmlandLineNowData,
            feature: this.farmlandLinePlanData,
            nowUnit: "万亩",
            featureUnit: "万亩"
          },
          {
            name: "城镇开发边界",
            now: this.townBoundaryNowData,
            feature: this.townBoundaryPlanData,
            nowUnit: "km²",
            featureUnit: "km²"
          }
        ];
      } else {
        this.$message.error(res.msg);
        return;
      }
    },
    // 开发利用
    async getUseData () {
      let params = this.params;
      params["city"] = this.clickCity;

      let res = await this.$get(
        "/epf-monitor-bearer/bigScreen/getDevAndUse",
        params
      );
      if (res.code == 0) {
        this.supplyLandAreaData = res.result.supplyLandArea; // 土地供应总面积
        this.approvedAreaData = res.result.approvedArea; // 批准总面积
        this.constructionLandNewData = res.result.constructionLandNew; // 新增建设用地面积
        this.transferTotalData = res.result.transferTotal; // 出让价款总额

        this.constructionLandNewRateData = res.result.constructionLandNewRate; // 新增建设用地百分比
        this.landSupplyPlanData = res.result.landSupplyPlan; // 土地供应计划百分比

        this.useData = [
          {
            src: require("../../../../assets/images/czjcyj/zhjgmb001.png"),
            name: "土地供应总面积",
            number: this.supplyLandAreaData,
            unit: "公顷"
          },
          {
            src: require("../../../../assets/images/czjcyj/zhjgmb002.png"),
            name: "批准总面积",
            number: this.approvedAreaData,
            unit: "公顷"
          },
          {
            src: require("../../../../assets/images/czjcyj/zhjgmb003.png"),
            name: "新增建设用地面积",
            number: this.constructionLandNewData,
            unit: "公顷"
          },
          {
            src: require("../../../../assets/images/czjcyj/zhjgmb004.png"),
            name: "出让价款总额",
            number: this.transferTotalData,
            unit: "亿元"
          }
        ];
      } else {
        this.$message.error(res.msg);
        return;
      }
    },
    // 开发利用--新增建设用地(新增建设用地面积/土地供应总面积)
    mbtDrawLine () {
      setTimeout(() => {
        let chartMBT = echarts.init(document.getElementById("chartMBT"));
        document.getElementById("chartMBT").style.width = 100 + "%";
        document.getElementById("chartMBT").style.height = 50 + "%";

        chartMBT.resize(); // 直接加这句即可
      }, 0);
      let chartMBT = echarts.init(document.getElementById("chartMBT"));

      let firstData = this.constructionLandNewRateData;

      let option = {};

      if (this.chartScreen === "small") {
        option = {
          title: [
            {
              text: "新增建设用地",
              x: "center",
              y: "80%",
              textStyle: {
                fontWeight: "normal",
                color: "#303030",
                fontSize: "12"
              }
            }
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}%"
          },
          color: ["#E6E6E6"],

          series: [
            {
              name: "土地供应总面积",
              type: "pie",
              clockWise: true,
              radius: ["50%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ["50%", "40%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
              hoverAnimation: true,

              data: [
                {
                  value: firstData,
                  name: "新增建设用地",
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: "#FA8C16" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#FA8C16" // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: "normal",
                          color: "#999",
                          fontSize: "12"
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  },
                  label: {
                    normal: {
                      formatter: function (params) {
                        return params.value + "%";
                      },
                      position: "center",
                      show: true,
                      textStyle: {
                        fontSize: "12",
                        fontWeight: "bolder",
                        color: "#FA8C16"
                      }
                    }
                  }
                },
                {
                  value: 100 - firstData,
                  name: "其他建设用地"
                }
              ]
            }
          ]
        };
      } else if (this.chartScreen === "big") {
        option = {
          title: [
            {
              text: "新增建设用地",
              x: "center",
              y: "80%",
              textStyle: {
                fontWeight: "normal",
                color: "#fff",
                fontSize: "14"
              }
            }
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}%"
          },
          color: ["#E6E6E6"],

          series: [
            {
              name: "土地供应总面积",
              type: "pie",
              clockWise: true,
              radius: ["50%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ["50%", "40%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },

              hoverAnimation: true,
              data: [
                {
                  value: firstData,
                  name: "新增建设用地",
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: "#FA8C16" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#FA8C16" // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: "normal",
                          color: "#999",
                          fontSize: "20"
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  },
                  label: {
                    normal: {
                      formatter: function (params) {
                        return params.value + "%";
                      },
                      position: "center",
                      show: true,
                      textStyle: {
                        fontSize: "14",
                        fontWeight: "bolder",
                        color: "#FA8C16"
                      }
                    }
                  }
                },
                {
                  value: 100 - firstData,
                  name: "其他建设用地"
                }
              ]
            }
          ]
        };
      }

      chartMBT.setOption(option, true);
    },
    // 开发利用-土地供应计划(土地供应总面积/批准总面积)
    mbbDrawLine () {
      setTimeout(() => {
        let chartMBB = echarts.init(document.getElementById("chartMBB"));
        document.getElementById("chartMBB").style.width = 100 + "%";

        chartMBB.resize(); // 直接加这句即可
      }, 0);
      let chartMBB = echarts.init(document.getElementById("chartMBB"));

      let secondData = this.landSupplyPlanData;

      let option = {};

      if (this.chartScreen === "small") {
        option = {
          title: [
            {
              text: "土地供应计划",
              x: "center",
              y: "80%",
              textStyle: {
                fontWeight: "normal",
                color: "#303030",
                fontSize: "12"
              }
            }
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}%"
          },
          color: ["#E6E6E6"],

          series: [
            {
              name: "批准总面积",
              type: "pie",
              clockWise: true,
              radius: ["50%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ["50%", "40%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
              hoverAnimation: true,

              data: [
                {
                  value: secondData,
                  name: "土地供应总面积",
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: "#40C79F" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#40C79F" // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: "normal",
                          color: "#999",
                          fontSize: "12"
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  },
                  label: {
                    normal: {
                      formatter: function (params) {
                        return params.value + "%";
                      },
                      position: "center",
                      show: true,
                      textStyle: {
                        fontSize: "12",
                        fontWeight: "bolder",
                        color: "#40C79F"
                      }
                    }
                  }
                },
                {
                  value: 100 - secondData,
                  name: "其他建设用地"
                }
              ]
            }
          ]
        };
      } else if (this.chartScreen === "big") {
        option = {
          title: [
            {
              text: "土地供应计划",
              x: "center",
              y: "80%",
              textStyle: {
                fontWeight: "normal",
                color: "#fff",
                fontSize: "14"
              }
            }
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}%"
          },
          color: ["#E6E6E6"],

          series: [
            {
              name: "批准总面积",
              type: "pie",
              clockWise: true,
              radius: ["50%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ["50%", "40%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
              hoverAnimation: true,
              data: [
                {
                  value: secondData,
                  name: "土地供应总面积",
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: "#40C79F" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#40C79F" // 100% 处的颜色
                          }
                        ]
                      },
                      label: {
                        show: true,
                        textStyle: {
                          fontWeight: "normal",
                          color: "#999",
                          fontSize: "20"
                        }
                      },
                      labelLine: {
                        show: true
                      },
                      barBorderRadius: [30, 30, 0, 0]
                    }
                  },
                  label: {
                    normal: {
                      formatter: function (params) {
                        return params.value + "%";
                      },
                      position: "center",
                      show: true,
                      textStyle: {
                        fontSize: "14",
                        fontWeight: "bolder",
                        color: "#40C79F"
                      }
                    }
                  }
                },
                {
                  value: 100 - secondData,
                  name: "其他建设用地"
                }
              ]
            }
          ]
        };
      }

      chartMBB.setOption(option, true);
    },
    // 生态修复
    async mtlDrawLine () {
      setTimeout(() => {
        let chartMTL = echarts.init(document.getElementById("chartMTL"));
        document.getElementById("chartMTL").style.width = 100 + "%";
        document.getElementById("chartMTL").style.height = 80 + "%";

        chartMTL.resize(); // 直接加这句即可
      }, 0);
      let chartMTL = echarts.init(document.getElementById("chartMTL"));

      let params = this.params;
      params["city"] = this.clickCity;

      let res = await this.$get(
        "/epf-monitor-bearer/bigScreen/getEcosystemRepair",
        params
      );
      if (res.code == 0) {
        this.repairAreaAllSum = res.result.repairAreaAll;
        this.remediateAreaAllSum = res.result.remediateAreaAll;

        this.projectNumberData = res.result.projectNumber;
        this.implementNumberData = res.result.implementNumber;
        this.acceptanceNumberData = res.result.acceptanceNumber;

        this.repairDataList = [
          {
            name: "立项（个）",
            number: this.projectNumberData
          },
          {
            name: "实施（个）",
            number: this.implementNumberData
          },
          {
            name: "验收（个）",
            number: this.acceptanceNumberData
          }
        ];

        let chartData = res.result;

        function sum (arr) {
          return eval(arr.join("+"));
        }
        var Data = [
          chartData.desertifiedLandArea,
          chartData.soilErosionArea,
          chartData.otherArea
        ];
        var DataSum = sum(Data);
        var Data1 = [
          +((chartData.desertifiedLandArea / DataSum) * 100).toFixed(3)
        ];
        var Data2 = [+((chartData.soilErosionArea / DataSum) * 100).toFixed(3)];
        var Data3 = [100 - Data1 - Data2];

        var legendData = ["沙化土地", "水土流失", "其他"];
        var colorData = ["#0091FF", "#2060AB", "#3B5060"];

        var seriesAllData = [Data1, Data2, Data3];

        var series = [];

        let option = {};

        if (this.chartScreen === "small") {
          for (var i = 0; i < legendData.length; i++) {
            series.push({
              type: "bar",
              name: legendData[i],
              data: seriesAllData[i],
              stack: "income",
              barWidth: 14,
              label: {
                normal: {
                  show: true,
                  position: "left",
                  // TODO
                  offset: [40, 25],
                  formatter: function (value) {
                    let total = Math.round((DataSum * value.value) / 100); // 计算总和
                    return value.seriesName + "\n" + "{b|" + total + "}";
                  },
                  textStyle: {
                    fontWeight: "normal",
                    color: "#4F4F4F",
                    fontSize: "12",
                    rich: {
                      b: {
                        color: "#1890FF",
                        fontSize: "12"
                      }
                    }
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: colorData[i]
                }
              }
            });
          }

          option = {
            tooltip: {
              trigger: "item",
              formatter: function (params) {
                var res = params.name;
                var myseries = option.series;
                for (var i = 0; i < myseries.length; i++) {
                  res +=
                    myseries[i].name + " : " + myseries[i].data[0] + "%</br>";
                }
                return res;
              }
            },
            grid: {
              left: "10%",
              right: "5%",
              top: "30%",
              bottom: "20%",
              containLabel: true
            },
            legend: {
              right: "0%",
              top: "0%",
              data: legendData,
              itemWidth: 10,
              itemHeight: 10,
              textStyle: {
                color: "#4F4F4F"
              }
            },
            xAxis: {
              type: "value",
              show: false
              // boundaryGap:['20%',"20%"]
              // max:totalData
            },
            yAxis: {
              type: "category",
              show: false,
              axisTick: {
                show: false
              }
            },
            series: series
          };
        } else if (this.chartScreen === "big") {
          for (var i = 0; i < legendData.length; i++) {
            series.push({
              type: "bar",
              name: legendData[i],
              data: seriesAllData[i],
              stack: "income",
              barWidth: 14,
              label: {
                normal: {
                  show: true,
                  position: "left",
                  // TODO
                  offset: [40, 30],
                  formatter: function (value) {
                    let total = Math.round((DataSum * value.value) / 100); // 计算总和
                    return value.seriesName + "\n" + "{b|" + total + "}";
                  },
                  textStyle: {
                    fontWeight: "normal",
                    color: "#fff",
                    fontSize: "14",
                    rich: {
                      b: {
                        color: "#1890FF",
                        fontSize: "15"
                      }
                    }
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: colorData[i]
                }
              }
            });
          }

          option = {
            tooltip: {
              trigger: "item",
              formatter: function (params) {
                var res = params.name;
                var myseries = option.series;
                for (var i = 0; i < myseries.length; i++) {
                  res +=
                    myseries[i].name + " : " + myseries[i].data[0] + "%</br>";
                }
                return res;
              }
            },
            grid: {
              left: "10%",
              right: "5%",
              top: "30%",
              bottom: "30%",
              containLabel: true
            },
            legend: {
              right: "0%",
              top: "0%",
              data: legendData,
              itemWidth: 14,
              itemHeight: 14,
              textStyle: {
                color: "#fff"
              }
            },
            xAxis: {
              type: "value",
              show: false
              // boundaryGap:['20%',"20%"]
              // max:totalData
            },
            yAxis: {
              type: "category",
              show: false,
              axisTick: {
                show: false
              }
            },
            series: series
          };
        }

        chartMTL.setOption(option, true);
      } else {
        this.$message.error(res.msg);
        return;
      }
    },
    // 确权登记
    async rtlDrawLine () {
      setTimeout(() => {
        let chartRTL = echarts.init(document.getElementById("chartRTL"));
        document.getElementById("chartRTL").style.width = 50 + "%";
        document.getElementById("chartRTL").style.height = 100 + "%";
        chartRTL.resize(); // 直接加这句即可
        let chartRTR = echarts.init(document.getElementById("chartRTR"));
        document.getElementById("chartRTR").style.width = 50 + "%";
        document.getElementById("chartRTR").style.height = 100 + "%";
        chartRTR.resize(); // 直接加这句即可
      }, 0);
      let chartRTL = echarts.init(document.getElementById("chartRTL"));
      let chartRTR = echarts.init(document.getElementById("chartRTR"));

      let params = this.params;
      params["city"] = this.clickCity;

      let res = await this.$get(
        "/epf-monitor-bearer/bigScreen/getRegistration",
        params
      );

      if (res.code == 0) {
        this.mortgageAmountSum = res.self.mortgageAmount;
        this.mortgageCountSum = res.self.mortgageCount;
        this.certificateCountSum = res.self.certificateCount;

        this.registrationList = [
          {
            sum: this.certificateCountSum,
            name: "本年度发证总量",
            unit: "件"
          },
          {
            sum: this.mortgageCountSum,
            name: "累积抵押总量",
            unit: "件"
          },
          {
            sum: this.mortgageAmountSum,
            name: "累积抵押金额",
            unit: "亿元"
          }
        ];

        let chartData = res.result;

        var xzhouData = [];
        var Data1 = [];
        var Data2 = [];
        var colorData1 = ["#00D07C"];
        var colorData3 = ["#1D7CE4"];
        var colorData5 = ["#00f896"];
        var colorData6 = ["#091e31"];
        var colorData7 = ["#0269f3"];
        var colorData8 = ["#091e31"];
        var unitName1 = "";
        var unitName2 = "";
        var legendName1 = [];
        var legendName2 = [];

        for (var key in chartData) {
          xzhouData.push(chartData[key].year);
          Data1.push(chartData[key].certificateCount);
          Data2.push(chartData[key].mortgageAmount);
        }

        if (this.mortgageAmountSum != 0) {
          unitName1 = "单位：公顷";
          legendName1 = ["发证量"];
        } else {
          unitName1 = "";
          legendName1 = ["发证量"];
        }
        if (this.certificateCountSum != 0) {
          unitName2 = "单位：亿元";
          legendName2 = ["抵押金额"];
        } else {
          unitName2 = "";
          legendName2 = ["抵押金额"];
        }

        let option = {};
        let option2 = {};

        if (this.chartScreen === "small") {
          // 发证量
          option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: "4%",
              right: "5%",
              bottom: "8%",
              top: "18%",
              containLabel: true,
              x: 100, //控制x轴文字与底部的距离
              y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
            },
            legend: {
              right: "5%",
              top: "0%",
              data: legendName1,
              itemWidth: 14,
              itemHeight: 14,
              textStyle: {
                color: "#4F4F4F"
              }
            },
            xAxis: [
              {
                // name: '市',
                type: "category",
                data: xzhouData,
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                },
                axisLabel: {
                  show: true,
                  interval: 'auto',
                  rotate: 45, //文字逆时针旋转45°
                  textStyle: {
                    color: "#4F4F4F"
                  }
                }
              }
            ],
            // dataZoom: [
            //   {
            //     type: "inside",
            //     show: true,
            //     xAxisIndex: [0],
            //     start: 0, //默认为1
            //     end: 50
            //   }
            // ],
            yAxis: [
              {
                name: unitName1,
                nameTextStyle: {
                  color: "#4F4F4F"
                },
                type: "value",
                // interval: 500,
                // max: 1500,
                splitLine: {
                  // 网格线
                  lineStyle: {
                    type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
                  },
                  show: true // 隐藏或显示
                },
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#4F4F4F"
                  }
                }
              }
            ],
            series: {
              name: "发证量",
              type: "bar",
              barWidth: null, // 默认自适应
              barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
              barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
              data: Data1, // 数据
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: colorData1 // 高处的颜色
                      },
                      {
                        offset: 1,
                        color: colorData1 // 低处的颜色
                      }
                    ],
                    false
                  )
                }
              }
            }
          };
          // 抵押金额
          option2 = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: "5%",
              right: "3%",
              bottom: "8%",
              top: "18%",
              containLabel: true,
              x: 100, //控制x轴文字与底部的距离
              y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
            },
            legend: {
              right: "0%",
              top: "0%",
              data: legendName2,
              itemWidth: 14,
              itemHeight: 14,
              textStyle: {
                color: "#4F4F4F"
              }
            },
            xAxis: [
              {
                // name: '市',
                type: "category",
                data: xzhouData,
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                },
                axisLabel: {
                  show: true,
                  interval: 'auto',
                  rotate: 45, //文字逆时针旋转45°
                  textStyle: {
                    color: "#4F4F4F"
                  }
                }
              }
            ],
            // dataZoom: [
            //   {
            //     type: "inside",
            //     show: true,
            //     xAxisIndex: [0],
            //     start: 0, //默认为1
            //     end: 50
            //   }
            // ],
            yAxis: [
              {
                name: unitName2,
                nameTextStyle: {
                  color: "#4F4F4F"
                },
                type: "value",
                // interval: 500,
                // max: 1500,
                splitLine: {
                  // 网格线
                  lineStyle: {
                    type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
                  },
                  show: true // 隐藏或显示
                },
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#4F4F4F"
                  }
                }
              }
            ],
            series: {
              name: "抵押金额",
              type: "bar",
              barWidth: null, // 默认自适应
              barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
              barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
              data: Data2, // 数据
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: colorData3 // 高处的颜色
                      },
                      {
                        offset: 1,
                        color: colorData3 // 低处的颜色
                      }
                    ],
                    false
                  )
                }
              }
            }
          };
        } else if (this.chartScreen === "big") {
          // 发证量
          option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: "3%",
              right: "3%",
              bottom: "5%",
              top: "15%",
              containLabel: true,
              x: 100, //控制x轴文字与底部的距离
              y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
            },
            legend: {
              right: "5%",
              top: "3%",
              data: legendName1,
              itemWidth: 14,
              itemHeight: 14,
              textStyle: {
                color: "#fff"
              }
            },
            xAxis: [
              {
                // name: '市',
                type: "category",
                data: xzhouData,
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                },
                axisLabel: {
                  show: true,
                  interval: 'auto',
                  rotate: 45, //文字逆时针旋转45°
                  textStyle: {
                    color: "#fff"
                  }
                }
              }
            ],
            // dataZoom: [
            //   {
            //     type: "inside",
            //     show: true,
            //     xAxisIndex: [0],
            //     start: 0, //默认为1
            //     end: 50
            //   }
            // ],
            yAxis: [
              {
                name: unitName1,
                nameTextStyle: {
                  color: "#fff"
                },
                type: "value",
                // interval: 500,
                // max: 1500,
                splitLine: {
                  // 网格线
                  lineStyle: {
                    type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
                  },
                  show: true // 隐藏或显示
                },
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff"
                  }
                }
              }
            ],
            series: {
              name: "发证量",
              type: "bar",
              barWidth: null, // 默认自适应
              barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
              barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
              data: Data1, // 数据
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: colorData5 // 高处的颜色
                      },
                      {
                        offset: 1,
                        color: colorData6 // 低处的颜色
                      }
                    ],
                    false
                  )
                }
              }
            }
          };
          // 抵押金额
          option2 = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: "3%",
              right: "3%",
              bottom: "5%",
              top: "15%",
              containLabel: true,
              x: 100, //控制x轴文字与底部的距离
              y2: 200 // y2可以控制倾斜的文字狱最右边的距离，放置倾斜的文字超过显示区域
            },
            legend: {
              right: "5%",
              top: "3%",
              data: legendName2,
              itemWidth: 14,
              itemHeight: 14,
              textStyle: {
                color: "#fff"
              }
            },
            xAxis: [
              {
                // name: '市',
                type: "category",
                data: xzhouData,
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                },
                axisLabel: {
                  show: true,
                  interval: 'auto',
                  rotate: 45, //文字逆时针旋转45°
                  textStyle: {
                    color: "#fff"
                  }
                }
              }
            ],
            // dataZoom: [
            //   {
            //     type: "inside",
            //     show: true,
            //     xAxisIndex: [0],
            //     start: 0, //默认为1
            //     end: 50
            //   }
            // ],
            yAxis: [
              {
                name: unitName2,
                nameTextStyle: {
                  color: "#fff"
                },
                type: "value",
                // interval: 500,
                // max: 1500,
                splitLine: {
                  // 网格线
                  lineStyle: {
                    type: "dashed" // 设置网格线类型 dotted：虚线   solid:实线
                  },
                  show: true // 隐藏或显示
                },
                axisTick: {
                  alignWithLabel: true,
                  show: false // 不要刻度
                },
                axisLine: {
                  show: false // 不要x轴
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff"
                  }
                }
              }
            ],
            series: {
              name: "抵押金额",
              type: "bar",
              barWidth: null, // 默认自适应
              barGap: "50%", // 柱间距离，默认为柱形宽度的30%，可设固定值
              barCategoryGap: "20%", // 类目间柱形距离，默认为类目间距的20%，可设固定值
              data: Data2, // 数据
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: colorData7 // 高处的颜色
                      },
                      {
                        offset: 1,
                        color: colorData8 // 低处的颜色
                      }
                    ],
                    false
                  )
                }
              }
            }
          };
        }

        chartRTL.setOption(option, true);
        chartRTR.setOption(option2, true);
      } else {
        this.$message.error(res.msg);
        return;
      }
    },
    // 执法监察
    async rmDrawLine () {
      setTimeout(() => {
        let chartRM = echarts.init(document.getElementById("chartRM"));
        document.getElementById("chartRM").style.width = 100 + "%";
        document.getElementById("chartRM").style.height = 70 + "%";
        chartRM.resize(); // 直接加这句即可
      }, 0);
      let chartRM = echarts.init(document.getElementById("chartRM"));

      let params = this.params;
      params["city"] = this.clickCity;

      let res = await this.$get(
        "/epf-monitor-bearer/bigScreen/getLawSupervision",
        params
      );
      if (res.code == 0) {
        let chartData = res.result;

        var xzhouData = ["发现", "立案", "处罚"];
        var colorData1 = ["#00D07C"];
        var colorData3 = ["#1D7CE4"];
        var colorData5 = ["#00f896"];
        var colorData6 = ["#091e31"];
        var colorData7 = ["#0269f3"];
        var colorData8 = ["#091e31"];
        var Data1 = [
          chartData.caseType1Count,
          chartData.caseType2Count,
          chartData.caseType3Count
        ]; // 案件数
        var Data2 = [
          chartData.caseType1Area,
          chartData.caseType2Area,
          chartData.caseType3Area
        ]; // 涉案面积

        this.lianCount = chartData.lawCount;
        this.shejiCount = chartData.law3Count;

        let option = {};

        if (this.chartScreen === "small") {
          var option = {
            legend: {
              data: ["案件数(件)", "涉案面积(亩)"],

              bottom: "10%",
              itemWidth: 14,
              itemHeight: 14,
              itemGap: 70,
              textStyle: {
                color: "#303030"
              }
            },
            tooltip: {
              show: true,
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },

            grid: [
              {
                show: false,
                left: "5%",
                top: "0%",
                bottom: "30%",
                containLabel: true,
                width: "40%"
              },
              {
                show: false,
                left: "52%",
                top: "12%",
                bottom: "30%",
                width: "0%"
              },
              {
                show: false,
                right: "5%",
                top: "0%",
                bottom: "30%",
                containLabel: true,
                width: "40%"
              }
            ],

            xAxis: [
              {
                show: false, // 隐藏左边边x轴值
                type: "value",
                inverse: true,
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                position: "top",
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#B2B2B2",
                    fontSize: 12
                  }
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: "#1F2022",
                    width: 1,
                    type: "solid"
                  }
                }
              },
              {
                gridIndex: 1,
                show: false
              },
              {
                show: false, // 隐藏右边x轴值
                gridIndex: 2,
                type: "value",
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                position: "top",
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#B2B2B2",
                    fontSize: 12
                  }
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: "#1F2022",
                    width: 1,
                    type: "solid"
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "category",
                inverse: true,
                position: "right",
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false,
                  margin: 8,
                  textStyle: {
                    color: "#9D9EA0",
                    fontSize: 12
                  }
                },
                data: xzhouData
              },
              {
                gridIndex: 1,
                type: "category",
                inverse: true,
                position: "left",
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#303030", // 改变中间字体颜色
                    fontSize: 12
                  }
                },
                data: xzhouData.map(function (value) {
                  return {
                    value: value,
                    textStyle: {
                      align: "center"
                    }
                  };
                })
              },
              {
                gridIndex: 2,
                type: "category",
                inverse: true,
                position: "left",
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false,
                  textStyle: {
                    color: "#9D9EA0",
                    fontSize: 12
                  }
                },
                data: xzhouData
              }
            ],
            series: [
              {
                name: "案件数(件)",
                type: "bar",
                barGap: 20,
                barWidth: 15,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true,
                    position: "left",
                    offset: [0, 0],
                    textStyle: {
                      color: "#fff",
                      fontSize: 14
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    barBorderWidth: "0",

                    barBorderColor: colorData3,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: colorData3
                      },
                      {
                        offset: 1,
                        color: colorData3
                      }
                    ])
                  },
                  emphasis: {
                    barBorderWidth: "1",
                    barBorderColor: colorData3
                    // color: 'rgba(26,177,98,.8)'
                  }
                },
                data: Data1
              },

              {
                name: "涉案面积(亩)",
                type: "bar",
                barGap: 20,
                barWidth: 15,
                xAxisIndex: 2,
                yAxisIndex: 2,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true,
                    position: "right",
                    offset: [0, 0],
                    textStyle: {
                      color: "#fff",
                      fontSize: 14
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    barBorderWidth: "0",

                    barBorderColor: colorData1,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: colorData1
                      },
                      {
                        offset: 1,
                        color: colorData1
                      }
                    ])
                  },
                  emphasis: {
                    barBorderWidth: "1",
                    barBorderColor: colorData1
                    // color: 'rgba(26,177,98,.8)'
                  }
                },
                data: Data2
              }
            ]
          };
        } else if (this.chartScreen === "big") {
          option = {
            legend: {
              data: ["案件数(件)", "涉案面积(亩)"],

              bottom: "10%",
              itemWidth: 14,
              itemHeight: 14,
              itemGap: 70,
              textStyle: {
                color: "#fff"
              }
            },
            tooltip: {
              show: true,
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },

            grid: [
              {
                show: false,
                left: "5%",
                top: "0%",
                bottom: "30%",
                containLabel: true,
                width: "40%"
              },
              {
                show: false,
                left: "52%",
                top: "10%",
                bottom: "30%",
                width: "0%"
              },
              {
                show: false,
                right: "5%",
                top: "0%",
                bottom: "30%",
                containLabel: true,
                width: "40%"
              }
            ],

            xAxis: [
              {
                show: false, // 隐藏左边边x轴值
                type: "value",
                inverse: true,
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                position: "top",
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#B2B2B2",
                    fontSize: 12
                  }
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: "#1F2022",
                    width: 1,
                    type: "solid"
                  }
                }
              },
              {
                gridIndex: 1,
                show: false
              },
              {
                show: false, // 隐藏右边x轴值
                gridIndex: 2,
                type: "value",
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                position: "top",
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#B2B2B2",
                    fontSize: 12
                  }
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: "#1F2022",
                    width: 1,
                    type: "solid"
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "category",
                inverse: true,
                position: "right",
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false,
                  margin: 8,
                  textStyle: {
                    color: "#9D9EA0",
                    fontSize: 12
                  }
                },
                data: xzhouData
              },
              {
                gridIndex: 1,
                type: "category",
                inverse: true,
                position: "left",
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff", // 改变中间字体颜色
                    fontSize: 12
                  }
                },
                data: xzhouData.map(function (value) {
                  return {
                    value: value,
                    textStyle: {
                      align: "center"
                    }
                  };
                })
              },
              {
                gridIndex: 2,
                type: "category",
                inverse: true,
                position: "left",
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false,
                  textStyle: {
                    color: "#9D9EA0",
                    fontSize: 12
                  }
                },
                data: xzhouData
              }
            ],
            series: [
              {
                name: "案件数(件)",
                type: "bar",
                barGap: 20,
                barWidth: 15,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true,
                    position: "left",
                    offset: [0, 0],
                    textStyle: {
                      color: "#fff",
                      fontSize: 14
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    barBorderWidth: "0",

                    barBorderColor: colorData7,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: colorData7
                      },
                      {
                        offset: 1,
                        color: colorData8
                      }
                    ])
                  },
                  emphasis: {
                    barBorderWidth: "1",
                    barBorderColor: colorData7
                    // color: 'rgba(26,177,98,.8)'
                  }
                },
                data: Data1
              },

              {
                name: "涉案面积(亩)",
                type: "bar",
                barGap: 20,
                barWidth: 15,
                xAxisIndex: 2,
                yAxisIndex: 2,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true,
                    position: "right",
                    offset: [0, 0],
                    textStyle: {
                      color: "#fff",
                      fontSize: 14
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    barBorderWidth: "0",

                    barBorderColor: colorData5,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: colorData6
                      },
                      {
                        offset: 1,
                        color: colorData5
                      }
                    ])
                  },
                  emphasis: {
                    barBorderWidth: "1",
                    barBorderColor: colorData5
                    // color: 'rgba(26,177,98,.8)'
                  }
                },
                data: Data2
              }
            ]
          };
        }

        chartRM.setOption(option, true);
      } else {
        this.$message.error(res.msg);
        return;
      }
    },
    // 地质矿产
    async getKuangCanData () {
      let params = this.params;
      params["city"] = this.clickCity;

      let res = await this.$get(
        "/epf-monitor-bearer/bigScreen/getGeologyResource",
        params
      );

      if (res.code == 0) {
        this.surveyProjectNumberData = res.result.surveyProjectNumber;
        this.totalBudgetData = res.result.totalBudget;
        this.exploitTransferData = res.result.exploitTransfer;
        this.transferTotalPriceData = res.result.transferTotalPrice;
      } else {
        this.$message.error(res.msg);
        return;
      }
    },

    // 获取当前时间
    getTime () {
      this.presentTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    },

    // 图表自适应
    initEchart () {
      window.addEventListener("resize", () => {
        this.chart = echarts.init(this.$refs.mapChart);
        document.getElementById("chinaChart").style.width = 100 + "%";
        this.chart.resize(); // 直接加这句即可

        let chartLT = echarts.init(document.getElementById("chartLT"));
        document.getElementById("chartLT").style.width = 100 + "%";
        document.getElementById("chartLT").style.height = 50 + "%";
        chartLT.resize();

        let chartMBT = echarts.init(document.getElementById("chartMBT"));
        document.getElementById("chartMBT").style.width = 100 + "%";
        chartMBT.resize();

        let chartMBB = echarts.init(document.getElementById("chartMBB"));
        document.getElementById("chartMBB").style.width = 100 + "%";
        chartMBB.resize();

        let chartMTL = echarts.init(document.getElementById("chartMTL"));
        document.getElementById("chartMTL").style.width = 100 + "%";
        document.getElementById("chartMTL").style.height = 80 + "%";
        chartMTL.resize();

        let chartRTL = echarts.init(document.getElementById("chartRTL"));
        document.getElementById("chartRTL").style.width = 50 + "%";
        document.getElementById("chartRTL").style.height = 100 + "%";
        chartRTL.resize();
        let chartRTR = echarts.init(document.getElementById("chartRTR"));
        document.getElementById("chartRTR").style.width = 50 + "%";
        document.getElementById("chartRTR").style.height = 100 + "%";
        chartRTR.resize();

        let chartRM = echarts.init(document.getElementById("chartRM"));
        document.getElementById("chartRM").style.width = 100 + "%";
        document.getElementById("chartRM").style.height = 70 + "%";
        chartRM.resize();
      });
    },
    // 面包屑
    toProvinceWide () {
      sessionStorage.removeItem("syntheCity");
      sessionStorage.removeItem("syntheArea");
      this.clickCity = "";
      this.clickAreaName = "";
      this.params.area = "";
      // this.loadMap(
      //   "../../../../../static/map/json/province/440000.json",
      //   "guangdong"
      // );
      this.isCity = false;
      this.breadcrumbCityName = "";
      this.isArea = false;
      this.breadcrumbAreaName = "";
    },
    toCityWide () {
      sessionStorage.removeItem("syntheArea");
      this.clickAreaName = "";
      this.clickCity = sessionStorage.getItem("syntheCity");
      this.params.area = "";
      this.isArea = false;
      this.breadcrumbAreaName = "";
      this.changeMap();
    },
    // 进入全屏
    fullScreen (el) {
      this.$emit("full");
      this.chartScreen = "big";
    },
    // 退出全屏
    exitFullScreen (el) {
      this.$emit("full");
      this.chartScreen = "small";

      var el = document,
        cfs =
          el.cancelFullScreen ||
          el.webkitCancelFullScreen ||
          el.mozCancelFullScreen ||
          el.exitFullScreen,
        wscript;

      if (typeof cfs !== "undefined" && cfs) {
        cfs.call(el);

        return;
      }

      if (typeof window.ActiveXObject !== "undefined") {
        wscript = new ActiveXObject("WScript.Shell");

        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    // 点击全屏按钮
    screen () {
      screenfull.on("change", () => {
        if (!screenfull.isFullscreen) {
          this.chartScreen = "small";
        }
      });
    }
  },
  created () {
    this.getTime();
    // this.initEchart();
    // // this.loadMap(
    // //   "../../../../../static/map/json/province/440000.json",
    // //   "guangdong"
    // // );
    // this.changeMap();
    // this.ltDrawLine();
    // this.getWaterData();
    // this.getThreeData();
    // this.getUseData();
    // this.mbtDrawLine();
    // this.mbbDrawLine();
    // this.mtlDrawLine();
    // this.rtlDrawLine();
    // this.rmDrawLine();
    // this.getKuangCanData();
    window.addEventListener("setItem", () => {
      this.isShowMenu = sessionStorage.getItem("watchShow");
    });
  },
  mounted () {
    window.addEventListener("setItem", () => {
      this.isShowMenu = sessionStorage.getItem("watchShow");
    });
    this.$nextTick(function () {
      setTimeout(() => {
        // this.loadMap(
        //   "../../../../../static/map/json/province/440000.json",
        //   "guangdong"
        // );
        this.changeMap();
        this.ltDrawLine();
        this.getWaterData();
        this.getThreeData();
        this.getUseData();
        this.mbtDrawLine();
        this.mbbDrawLine();
        this.mtlDrawLine();
        this.rtlDrawLine();
        this.rmDrawLine();
        this.getKuangCanData();
      }, 1000);
    });
    this.initEchart();
    this.returnLastStep();
    this.toProvinceWide();
    this.screen();

    let that = this;
    that.getTime();
    setInterval(function () {
      that.getTime();
    }, 1000);
  },
  beforeDestroy () {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  destroyed () {
    window.removeEventListener(
      "resize",
      () => {
        this.chart = echarts.init(this.$refs.mapChart);
        document.getElementById("chinaChart").style.width = 100 + "%";
        this.chart.resize(); // 直接加这句即可

        let chartLT = echarts.init(document.getElementById("chartLT"));
        document.getElementById("chartLT").style.width = 100 + "%";
        document.getElementById("chartLT").style.height = 50 + "%";
        chartLT.resize();

        let chartMBT = echarts.init(document.getElementById("chartMBT"));
        document.getElementById("chartMBT").style.width = 100 + "%";
        chartMBT.resize();

        let chartMBB = echarts.init(document.getElementById("chartMBB"));
        document.getElementById("chartMBB").style.width = 100 + "%";
        chartMBB.resize();

        let chartMTL = echarts.init(document.getElementById("chartMTL"));
        document.getElementById("chartMTL").style.width = 100 + "%";
        document.getElementById("chartMTL").style.height = 80 + "%";
        chartMTL.resize();

        let chartRTL = echarts.init(document.getElementById("chartRTL"));
        document.getElementById("chartRTL").style.width = 50 + "%";
        document.getElementById("chartRTL").style.height = 100 + "%";
        chartRTL.resize();
        let chartRTR = echarts.init(document.getElementById("chartRTR"));
        document.getElementById("chartRTR").style.width = 50 + "%";
        document.getElementById("chartRTR").style.height = 100 + "%";
        chartRTR.resize();

        let chartRM = echarts.init(document.getElementById("chartRM"));
        document.getElementById("chartRM").style.width = 100 + "%";
        document.getElementById("chartRM").style.height = 70 + "%";
        chartRM.resize();
      },
      20
    );
    sessionStorage.removeItem("syntheCity");
  },
  // computed: {
  //   ...mapState('screen',["screenMessage"]),
  // },
  watch: {
    constructionLandNewRateData (val) {
      this.mbtDrawLine();
      this.mbbDrawLine();
    },
    landSupplyPlanData (val) {
      this.mbtDrawLine();
      this.mbbDrawLine();
    },
    clickCity (val) {
      //   console.log(val);
      //   sessionStorage.removeItem("syntheCity");
      //   sessionStorage.setItem("syntheCity", val);
      //   this.clickCity = sessionStorage.getItem("syntheCity");
      if (val == "440100") {
        this.breadcrumbCityName = "广州市";
        this.isCity = true;
      } else if (val == "440200") {
        this.breadcrumbCityName = "韶关市";
        this.isCity = true;
      } else if (val == "440300") {
        this.breadcrumbCityName = "深圳市";
        this.isCity = true;
      } else if (val == "440400") {
        this.breadcrumbCityName = "珠海市";
        this.isCity = true;
      } else if (val == "440500") {
        this.breadcrumbCityName = "汕头市";
        this.isCity = true;
      } else if (val == "440600") {
        this.breadcrumbCityName = "佛山市";
        this.isCity = true;
      } else if (val == "440700") {
        this.breadcrumbCityName = "江门市";
        this.isCity = true;
      } else if (val == "440800") {
        this.breadcrumbCityName = "湛江市";
        this.isCity = true;
      } else if (val == "440900") {
        this.breadcrumbCityName = "茂名市";
        this.isCity = true;
      } else if (val == "441200") {
        this.breadcrumbCityName = "肇庆市";
        this.isCity = true;
      } else if (val == "441300") {
        this.breadcrumbCityName = "惠州市";
        this.isCity = true;
      } else if (val == "441400") {
        this.breadcrumbCityName = "梅州市";
        this.isCity = true;
      } else if (val == "441500") {
        this.breadcrumbCityName = "汕尾市";
        this.isCity = true;
      } else if (val == "441600") {
        this.breadcrumbCityName = "河源市";
        this.isCity = true;
      } else if (val == "441700") {
        this.breadcrumbCityName = "阳江市";
        this.isCity = true;
      } else if (val == "441800") {
        this.breadcrumbCityName = "清远市";
        this.isCity = true;
      } else if (val == "441900") {
        this.breadcrumbCityName = "东莞市";
        this.isCity = true;
      } else if (val == "442000") {
        this.breadcrumbCityName = "中山市";
        this.isCity = true;
      } else if (val == "445100") {
        this.breadcrumbCityName = "潮州市";
        this.isCity = true;
      } else if (val == "445200") {
        this.breadcrumbCityName = "揭阳市";
        this.isCity = true;
      } else if (val == "445300") {
        this.breadcrumbCityName = "云浮市";
        this.isCity = true;
      } else if (val == "") {
        this.breadcrumbCityName = "";
        this.isCity = false;
      }
      this.changeMap();
      this.ltDrawLine();
      this.getWaterData();
      this.getThreeData();
      this.getUseData();
      this.mbtDrawLine();
      this.mbbDrawLine();
      this.mtlDrawLine();
      this.rtlDrawLine();
      this.rmDrawLine();
      this.getKuangCanData();
    },
    clickAreaName (val) {
      console.log(val);
      if (val == "荔湾区") {
        this.params.area = "440103";
        this.breadcrumbAreaName = "荔湾区";
        this.isArea = true;
      } else if (val == "越秀区") {
        this.params.area = "440104";
        this.breadcrumbAreaName = "越秀区";
        this.isArea = true;
      } else if (val == "海珠区") {
        this.params.area = "440105";
        this.breadcrumbAreaName = "海珠区";
        this.isArea = true;
      } else if (val == "天河区") {
        this.params.area = "440106";
        this.breadcrumbAreaName = "天河区";
        this.isArea = true;
      } else if (val == "白云区") {
        this.params.area = "440111";
        this.breadcrumbAreaName = "白云区";
        this.isArea = true;
      } else if (val == "黄埔区") {
        this.params.area = "440112";
        this.breadcrumbAreaName = "黄埔区";
        this.isArea = true;
      } else if (val == "番禺区") {
        this.params.area = "440113";
        this.breadcrumbAreaName = "番禺区";
        this.isArea = true;
      } else if (val == "花都区") {
        this.params.area = "440114";
        this.breadcrumbAreaName = "花都区";
        this.isArea = true;
      } else if (val == "南沙区") {
        this.params.area = "440115";
        this.breadcrumbAreaName = "南沙区";
        this.isArea = true;
      } else if (val == "从化区") {
        this.params.area = "440117";
        this.breadcrumbAreaName = "从化区";
        this.isArea = true;
      } else if (val == "增城区") {
        this.params.area = "440118";
        this.breadcrumbAreaName = "增城区";
        this.isArea = true;
      } else if (val == "武江区") {
        this.params.area = "440203";
        this.breadcrumbAreaName = "武江区";
        this.isArea = true;
      } else if (val == "浈江区") {
        this.params.area = "440204";
        this.breadcrumbAreaName = "浈江区";
        this.isArea = true;
      } else if (val == "曲江区") {
        this.params.area = "440205";
        this.breadcrumbAreaName = "曲江区";
        this.isArea = true;
      } else if (val == "始兴县") {
        this.params.area = "440222";
        this.breadcrumbAreaName = "始兴县";
        this.isArea = true;
      } else if (val == "仁化县") {
        this.params.area = "440224";
        this.breadcrumbAreaName = "仁化县";
        this.isArea = true;
      } else if (val == "翁源县") {
        this.params.area = "440229";
        this.breadcrumbAreaName = "翁源县";
        this.isArea = true;
      } else if (val == "乳源瑶族自治县") {
        this.params.area = "440232";
        this.breadcrumbAreaName = "乳源瑶族自治县";
        this.isArea = true;
      } else if (val == "新丰县") {
        this.params.area = "440233";
        this.breadcrumbAreaName = "新丰县";
        this.isArea = true;
      } else if (val == "乐昌市") {
        this.params.area = "440281";
        this.breadcrumbAreaName = "乐昌市";
        this.isArea = true;
      } else if (val == "南雄市") {
        this.params.area = "440282";
        this.breadcrumbAreaName = "南雄市";
        this.isArea = true;
      } else if (val == "罗湖区") {
        this.params.area = "440303";
        this.breadcrumbAreaName = "罗湖区";
        this.isArea = true;
      } else if (val == "福田区") {
        this.params.area = "440304";
        this.breadcrumbAreaName = "福田区";
        this.isArea = true;
      } else if (val == "南山区") {
        this.params.area = "440305";
        this.breadcrumbAreaName = "南山区";
        this.isArea = true;
      } else if (val == "宝安区") {
        this.params.area = "440306";
        this.breadcrumbAreaName = "宝安区";
        this.isArea = true;
      } else if (val == "龙岗区") {
        this.params.area = "440307";
        this.breadcrumbAreaName = "龙岗区";
        this.isArea = true;
      } else if (val == "盐田区") {
        this.params.area = "440308";
        this.breadcrumbAreaName = "盐田区";
        this.isArea = true;
      } else if (val == "龙华区") {
        this.params.area = "440309";
        this.breadcrumbAreaName = "龙华区";
        this.isArea = true;
      } else if (val == "坪山区") {
        this.params.area = "440310";
        this.breadcrumbAreaName = "坪山区";
        this.isArea = true;
      } else if (val == "光明区") {
        this.params.area = "440311";
        this.breadcrumbAreaName = "光明区";
        this.isArea = true;
      } else if (val == "香洲区") {
        this.params.area = "440402";
        this.breadcrumbAreaName = "香洲区";
        this.isArea = true;
      } else if (val == "斗门区") {
        this.params.area = "440403";
        this.breadcrumbAreaName = "斗门区";
        this.isArea = true;
      } else if (val == "金湾区") {
        this.params.area = "440404";
        this.breadcrumbAreaName = "金湾区";
        this.isArea = true;
      } else if (val == "龙湖区") {
        this.params.area = "440507";
        this.breadcrumbAreaName = "龙湖区";
        this.isArea = true;
      } else if (val == "金平区") {
        this.params.area = "440511";
        this.breadcrumbAreaName = "金平区";
        this.isArea = true;
      } else if (val == "濠江区") {
        this.params.area = "440512";
        this.breadcrumbAreaName = "濠江区";
        this.isArea = true;
      } else if (val == "潮阳区") {
        this.params.area = "440513";
        this.breadcrumbAreaName = "潮阳区";
        this.isArea = true;
      } else if (val == "潮南区") {
        this.params.area = "440514";
        this.breadcrumbAreaName = "潮南区";
        this.isArea = true;
      } else if (val == "澄海区") {
        this.params.area = "440515";
        this.breadcrumbAreaName = "澄海区";
        this.isArea = true;
      } else if (val == "南澳县") {
        this.params.area = "440523";
        this.breadcrumbAreaName = "南澳县";
        this.isArea = true;
      } else if (val == "禅城区") {
        this.params.area = "440604";
        this.breadcrumbAreaName = "禅城区";
        this.isArea = true;
      } else if (val == "南海区") {
        this.params.area = "440605";
        this.breadcrumbAreaName = "南海区";
        this.isArea = true;
      } else if (val == "顺德区") {
        this.params.area = "440606";
        this.breadcrumbAreaName = "顺德区";
        this.isArea = true;
      } else if (val == "三水区") {
        this.params.area = "440607";
        this.breadcrumbAreaName = "三水区";
        this.isArea = true;
      } else if (val == "高明区") {
        this.params.area = "440608";
        this.breadcrumbAreaName = "高明区";
        this.isArea = true;
      } else if (val == "蓬江区") {
        this.params.area = "440703";
        this.breadcrumbAreaName = "蓬江区";
        this.isArea = true;
      } else if (val == "江海区") {
        this.params.area = "440704";
        this.breadcrumbAreaName = "江海区";
        this.isArea = true;
      } else if (val == "新会区") {
        this.params.area = "440705";
        this.breadcrumbAreaName = "新会区";
        this.isArea = true;
      } else if (val == "台山市") {
        this.params.area = "440781";
        this.breadcrumbAreaName = "台山市";
        this.isArea = true;
      } else if (val == "开平市") {
        this.params.area = "440783";
        this.breadcrumbAreaName = "开平市";
        this.isArea = true;
      } else if (val == "鹤山市") {
        this.params.area = "440784";
        this.breadcrumbAreaName = "鹤山市";
        this.isArea = true;
      } else if (val == "恩平市") {
        this.params.area = "440785";
        this.breadcrumbAreaName = "恩平市";
        this.isArea = true;
      } else if (val == "赤坎区") {
        this.params.area = "440802";
        this.breadcrumbAreaName = "赤坎区";
        this.isArea = true;
      } else if (val == "霞山区") {
        this.params.area = "440803";
        this.breadcrumbAreaName = "霞山区";
        this.isArea = true;
      } else if (val == "坡头区") {
        this.params.area = "440804";
        this.breadcrumbAreaName = "坡头区";
        this.isArea = true;
      } else if (val == "麻章区") {
        this.params.area = "440811";
        this.breadcrumbAreaName = "麻章区";
        this.isArea = true;
      } else if (val == "遂溪县") {
        this.params.area = "440823";
        this.breadcrumbAreaName = "遂溪县";
        this.isArea = true;
      } else if (val == "徐闻县") {
        this.params.area = "440825";
        this.breadcrumbAreaName = "徐闻县";
        this.isArea = true;
      } else if (val == "廉江市") {
        this.params.area = "440881";
        this.breadcrumbAreaName = "廉江市";
        this.isArea = true;
      } else if (val == "雷州市") {
        this.params.area = "440882";
        this.breadcrumbAreaName = "雷州市";
        this.isArea = true;
      } else if (val == "吴川市") {
        this.params.area = "440883";
        this.breadcrumbAreaName = "吴川市";
        this.isArea = true;
      } else if (val == "茂南区") {
        this.params.area = "440902";
        this.breadcrumbAreaName = "茂南区";
        this.isArea = true;
      } else if (val == "电白区") {
        this.params.area = "440904";
        this.breadcrumbAreaName = "电白区";
        this.isArea = true;
      } else if (val == "高州市") {
        this.params.area = "440981";
        this.breadcrumbAreaName = "高州市";
        this.isArea = true;
      } else if (val == "化州市") {
        this.params.area = "440982";
        this.breadcrumbAreaName = "化州市";
        this.isArea = true;
      } else if (val == "信宜市") {
        this.params.area = "440983";
        this.breadcrumbAreaName = "信宜市";
        this.isArea = true;
      } else if (val == "端州区") {
        this.params.area = "441202";
        this.breadcrumbAreaName = "端州区";
        this.isArea = true;
      } else if (val == "鼎湖区") {
        this.params.area = "441203";
        this.breadcrumbAreaName = "鼎湖区";
        this.isArea = true;
      } else if (val == "高要区") {
        this.params.area = "441204";
        this.breadcrumbAreaName = "高要区";
        this.isArea = true;
      } else if (val == "广宁县") {
        this.params.area = "441223";
        this.breadcrumbAreaName = "广宁县";
        this.isArea = true;
      } else if (val == "怀集县") {
        this.params.area = "441224";
        this.breadcrumbAreaName = "怀集县";
        this.isArea = true;
      } else if (val == "封开县") {
        this.params.area = "441225";
        this.breadcrumbAreaName = "封开县";
        this.isArea = true;
      } else if (val == "德庆县") {
        this.params.area = "441226";
        this.breadcrumbAreaName = "德庆县";
        this.isArea = true;
      } else if (val == "四会市") {
        this.params.area = "441284";
        this.breadcrumbAreaName = "四会市";
        this.isArea = true;
      } else if (val == "惠城区") {
        this.params.area = "441302";
        this.breadcrumbAreaName = "惠城区";
        this.isArea = true;
      } else if (val == "惠阳区") {
        this.params.area = "441303";
        this.breadcrumbAreaName = "惠阳区";
        this.isArea = true;
      } else if (val == "博罗县") {
        this.params.area = "441322";
        this.breadcrumbAreaName = "博罗县";
        this.isArea = true;
      } else if (val == "惠东县") {
        this.params.area = "441323";
        this.breadcrumbAreaName = "惠东县";
        this.isArea = true;
      } else if (val == "龙门县") {
        this.params.area = "441324";
        this.breadcrumbAreaName = "龙门县";
        this.isArea = true;
      } else if (val == "梅江区") {
        this.params.area = "441402";
        this.breadcrumbAreaName = "梅江区";
        this.isArea = true;
      } else if (val == "梅县区") {
        this.params.area = "441403";
        this.breadcrumbAreaName = "梅县区";
        this.isArea = true;
      } else if (val == "大埔县") {
        this.params.area = "441422";
        this.breadcrumbAreaName = "大埔县";
        this.isArea = true;
      } else if (val == "丰顺县") {
        this.params.area = "441423";
        this.breadcrumbAreaName = "丰顺县";
        this.isArea = true;
      } else if (val == "五华县") {
        this.params.area = "441424";
        this.breadcrumbAreaName = "五华县";
        this.isArea = true;
      } else if (val == "平远县") {
        this.params.area = "441426";
        this.breadcrumbAreaName = "平远县";
        this.isArea = true;
      } else if (val == "蕉岭县") {
        this.params.area = "441427";
        this.breadcrumbAreaName = "蕉岭县";
        this.isArea = true;
      } else if (val == "兴宁市") {
        this.params.area = "441481";
        this.breadcrumbAreaName = "兴宁市";
        this.isArea = true;
      } else if (val == "城区") {
        this.params.area = "441502";
        this.breadcrumbAreaName = "城区";
        this.isArea = true;
      } else if (val == "海丰县") {
        this.params.area = "441521";
        this.breadcrumbAreaName = "海丰县";
        this.isArea = true;
      } else if (val == "陆河县") {
        this.params.area = "441523";
        this.breadcrumbAreaName = "陆河县";
        this.isArea = true;
      } else if (val == "陆丰市") {
        this.params.area = "441581";
        this.breadcrumbAreaName = "陆丰市";
        this.isArea = true;
      } else if (val == "源城区") {
        this.params.area = "441602";
        this.breadcrumbAreaName = "源城区";
        this.isArea = true;
      } else if (val == "紫金县") {
        this.params.area = "441621";
        this.breadcrumbAreaName = "紫金县";
        this.isArea = true;
      } else if (val == "龙川县") {
        this.params.area = "441622";
        this.breadcrumbAreaName = "龙川县";
        this.isArea = true;
      } else if (val == "连平县") {
        this.params.area = "441623";
        this.breadcrumbAreaName = "连平县";
        this.isArea = true;
      } else if (val == "和平县") {
        this.params.area = "441624";
        this.breadcrumbAreaName = "和平县";
        this.isArea = true;
      } else if (val == "东源县") {
        this.params.area = "441625";
        this.breadcrumbAreaName = "东源县";
        this.isArea = true;
      } else if (val == "江城区") {
        this.params.area = "441702";
        this.breadcrumbAreaName = "江城区";
        this.isArea = true;
      } else if (val == "阳东区") {
        this.params.area = "441704";
        this.breadcrumbAreaName = "阳东区";
        this.isArea = true;
      } else if (val == "阳西县") {
        this.params.area = "441721";
        this.breadcrumbAreaName = "阳西县";
        this.isArea = true;
      } else if (val == "阳春市") {
        this.params.area = "441781";
        this.breadcrumbAreaName = "阳春市";
        this.isArea = true;
      } else if (val == "清城区") {
        this.params.area = "441802";
        this.breadcrumbAreaName = "清城区";
        this.isArea = true;
      } else if (val == "清新区") {
        this.params.area = "441803";
        this.breadcrumbAreaName = "清新区";
        this.isArea = true;
      } else if (val == "佛冈县") {
        this.params.area = "441821";
        this.breadcrumbAreaName = "佛冈县";
        this.isArea = true;
      } else if (val == "阳山县") {
        this.params.area = "441823";
        this.breadcrumbAreaName = "阳山县";
        this.isArea = true;
      } else if (val == "连山壮族瑶族自治县") {
        this.params.area = "441825";
        this.breadcrumbAreaName = "连山壮族瑶族自治县";
        this.isArea = true;
      } else if (val == "连南瑶族自治县") {
        this.params.area = "441826";
        this.breadcrumbAreaName = "连南瑶族自治县";
        this.isArea = true;
      } else if (val == "英德市") {
        this.params.area = "441881";
        this.breadcrumbAreaName = "英德市";
        this.isArea = true;
      } else if (val == "连州市") {
        this.params.area = "441882";
        this.breadcrumbAreaName = "连州市";
        this.isArea = true;
      } else if (val == "湘桥区") {
        this.params.area = "445102";
        this.breadcrumbAreaName = "湘桥区";
        this.isArea = true;
      } else if (val == "潮安区") {
        this.params.area = "445103";
        this.breadcrumbAreaName = "潮安区";
        this.isArea = true;
      } else if (val == "饶平县") {
        this.params.area = "445122";
        this.breadcrumbAreaName = "饶平县";
        this.isArea = true;
      } else if (val == "榕城区") {
        this.params.area = "445202";
        this.breadcrumbAreaName = "榕城区";
        this.isArea = true;
      } else if (val == "揭东区") {
        this.params.area = "445203";
        this.breadcrumbAreaName = "揭东区";
        this.isArea = true;
      } else if (val == "揭西县") {
        this.params.area = "445222";
        this.breadcrumbAreaName = "揭西县";
        this.isArea = true;
      } else if (val == "惠来县") {
        this.params.area = "445224";
        this.breadcrumbAreaName = "惠来县";
        this.isArea = true;
      } else if (val == "普宁市") {
        this.params.area = "445281";
        this.breadcrumbAreaName = "普宁市";
        this.isArea = true;
      } else if (val == "云城区") {
        this.params.area = "445302";
        this.breadcrumbAreaName = "云城区";
        this.isArea = true;
      } else if (val == "云安区") {
        this.params.area = "445303";
        this.breadcrumbAreaName = "云安区";
        this.isArea = true;
      } else if (val == "新兴县") {
        this.params.area = "445321";
        this.breadcrumbAreaName = "新兴县";
        this.isArea = true;
      } else if (val == "郁南县") {
        this.params.area = "445322";
        this.breadcrumbAreaName = "郁南县";
        this.isArea = true;
      } else if (val == "罗定市") {
        this.params.area = "445381";
        this.breadcrumbAreaName = "罗定市";
        this.isArea = true;
      } else {
        this.params.area = "";
        this.breadcrumbAreaName = "";
        this.isArea = false;
      }
    },
    "params.area": {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeMap();
        this.ltDrawLine();
        this.getWaterData();
        this.getThreeData();
        this.getUseData();
        this.mbtDrawLine();
        this.mbbDrawLine();
        this.mtlDrawLine();
        this.rtlDrawLine();
        this.rmDrawLine();
        this.getKuangCanData();
      }
    },
    chartScreen: {
      immediate: true,
      deep: true,
      handler (val) {
        this.changeMap();
        this.ltDrawLine();
        this.getWaterData();
        this.getThreeData();
        this.getUseData();
        this.mbtDrawLine();
        this.mbbDrawLine();
        this.mtlDrawLine();
        this.rtlDrawLine();
        this.rmDrawLine();
        this.getKuangCanData();
      }
    },
    isShowMenu: {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.changeMap();
            this.ltDrawLine();
            this.getWaterData();
            this.getThreeData();
            this.getUseData();
            this.mbtDrawLine();
            this.mbbDrawLine();
            this.mtlDrawLine();
            this.rtlDrawLine();
            this.rmDrawLine();
            this.getKuangCanData();
          }, 0);
        });
      }
    }
  }
};
</script>
<style scoped>
.page-body {
  padding: 0 15px 15px;
  background-color: #f7f7f7;
  height: 100%;
}
.page-body__custom {
  padding: 0 15px 15px;
  height: 100%;
  background-image: url("../../../../assets/images/czjcyj/mapH.png");
  background-size: 1920px 1080px;
}
#page-body-chart {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#page-body-chart__custom {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chart-header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.chart-header__custom {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("../../../../assets/images/czjcyj/mapTH.png") no-repeat center -20px;
  margin-bottom: 15px;
}
.chart-header-title {
  font-size: 16px;
  line-height: 50px;
  font-weight: bolder;
  color: #000;
}
.chart-header-title__custom {
  font-size: 20px;
  line-height: 26px;
  color: #ffffff;
}
.chart-header-time {
  position: absolute;
  right: 50px;
}
.chart-header-time__custom {
  color: #fff;
}
.chart-header-timeIcon {
  width: 5px;
  height: 5px;
  display: inline-block;
  background-color: #5290f2;
  margin-right: 10px;
  border-radius: 5px;
  margin-bottom: 3px;
}
.chart-header-timeIcon__custom {
  width: 5px;
  height: 5px;
  display: inline-block;
  background-color: #01ff25;
  margin-right: 10px;
  border-radius: 5px;
  margin-bottom: 3px;
}
.chart-header-screenIcon {
  width: 42px;
  height: 42px;
  display: inline-block;
  border-radius: 42px;
  position: absolute;
  top: 4px;
  right: 0;
  cursor: pointer;
}
.chart-header-screenIcon__custom {
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 30px;
  position: absolute;
  top: 50px;
  right: 0;
  cursor: pointer;
}

.chart-content-wrap {
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
  background-color: #f7f7f7;
}
.chart-content-wrap__custom {
  display: flex;
  width: 100%;
  height: calc(100% - 70px);
  overflow: hidden;
}
.chart-content-wrapLeft {
  box-sizing: border-box;
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-content-wrapLeft-top {
  box-sizing: border-box;
  width: 100%;
  height: 68%;
  min-height: 68%;
  max-height: 68%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.wrap-left-top {
  width: 100%;
  height: 60%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
}
.wrap-left-top__custom {
  width: 100%;
  height: 60%;
  overflow: hidden;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.title-message-wrapBox {
  width: 100%;
  height: 90%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.title-message-content {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}
.title-message {
  width: 60%;
  height: 30px;
  background: url("../../../../assets/images/czjcyj/pjbgix.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
}
.title-message__custom {
  width: 50%;
  height: 40px;
  background: url("../../../../assets/images/czjcyj/pjbgi.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
}
.title-message span:nth-child(1) {
  font-size: 14px;
  color: #303030;
}
.title-message span:nth-child(2) {
  font-size: 20px;
  color: #4571c9;
  font-weight: bolder;
}
.title-message__custom span:nth-child(1) {
  font-size: 14px;
  color: #fff;
}
.title-message__custom span:nth-child(2) {
  font-size: 20px;
  color: #2fb8d7;
  font-weight: bolder;
}
.wrap-left-top-message-content {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrap-left-top-message {
  width: 32%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  border: 1px solid rgba(169, 169, 169, 1);
}
.wrap-left-top-message__custom {
  width: 32%;
  height: 70%;
  border: 1px solid rgba(32, 96, 171, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(50, 97, 177, 0) 0%,
    rgba(50, 96, 175, 0.02) 13%,
    rgba(49, 94, 172, 0.06) 23%,
    rgba(48, 92, 167, 0.11) 33%,
    rgba(46, 89, 162, 0.17) 41%,
    rgba(44, 85, 154, 0.25) 48%,
    rgba(42, 81, 146, 0.33) 54%,
    rgba(40, 76, 137, 0.42) 60%,
    rgba(38, 70, 126, 0.51) 65%,
    rgba(35, 64, 114, 0.6) 70%,
    rgba(32, 58, 102, 0.69) 75%,
    rgba(29, 51, 88, 0.78) 81%,
    rgba(26, 43, 72, 0.86) 86%,
    rgba(22, 35, 54, 0.94) 93%,
    rgba(19, 26, 32, 1) 100%
  );
  border-radius: 3px;
}
.wrap-left-top-message span:nth-child(1) {
  color: #303030;
  font-size: 14px;
}
.wrap-left-top-message span:nth-child(2) {
  color: #1890ff;
  font-size: 14px;
}
.wrap-left-top-message__custom span:nth-child(1) {
  color: #ffffff;
  font-size: 14px;
}
.wrap-left-top-message__custom span:nth-child(2) {
  color: #1890ff;
  font-size: 14px;
}
.wrap-left-middle {
  width: 100%;
  height: 40%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
}
.wrap-left-middle__custom {
  width: 100%;
  height: 40%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.wrap-left-middle-content-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 40%;
  margin-top: 15px;
}
.wrap-left-middle-content-box__custom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 40%;
  margin-top: 50px;
}
.wrap-left-middle-content {
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.wrap-left-middle-content-top {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrap-left-middle-content-top .wrap-left-middle-content-top-image {
  width: 38px;
  height: 38px;
}
.wrap-left-middle-content-top .wrap-left-middle-content-top-title {
  width: 70%;
  height: 100%;
  color: #303030;
  font-size: 14px;
  word-wrap: break-word;
  word-break: normal;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-left-middle-content-top .wrap-left-middle-content-top-title__custom {
  width: 70%;
  height: 100%;
  color: #fff;
  font-size: 14px;
  word-wrap: break-word;
  word-break: normal;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-left-middle-content-bottom {
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #1890ff;
}

.wrap-left-bottom {
  width: 100%;
  height: 32%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
}
.wrap-left-bottom__custom {
  width: 100%;
  height: 32%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 15px;
}
.wrap-left-bottom-content {
  width: 100%;
  height: 90%;
  margin-top: 10px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.wrap-left-bottom-content-showData {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(169, 169, 169, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}
.wrap-left-bottom-content-showData__custom {
  width: 100%;
  height: 45px;
  background: linear-gradient(
    180deg,
    rgba(50, 97, 177, 0) 0%,
    rgba(50, 96, 175, 0.02) 13%,
    rgba(49, 94, 172, 0.06) 23%,
    rgba(48, 92, 167, 0.11) 33%,
    rgba(46, 89, 162, 0.17) 41%,
    rgba(44, 85, 154, 0.25) 48%,
    rgba(42, 81, 146, 0.33) 54%,
    rgba(40, 76, 137, 0.42) 60%,
    rgba(38, 70, 126, 0.51) 65%,
    rgba(35, 64, 114, 0.6) 70%,
    rgba(32, 58, 102, 0.69) 75%,
    rgba(29, 51, 88, 0.78) 81%,
    rgba(26, 43, 72, 0.86) 86%,
    rgba(22, 35, 54, 0.94) 93%,
    rgba(19, 26, 32, 1) 100%
  );
  border: 1px solid rgba(29, 124, 228, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}
.showData-title {
  font-size: 14px;
  color: #303030;
  width: 45%;
}
.showData-title__custom {
  font-size: 14px;
  color: #fff;
  width: 45%;
}
.showData-message {
  color: #1890ff;
  margin-left: 10px;
}
.wrap-left-bottom-content-table {
  width: 100%;
  flex: 1;
  padding-bottom: 10px;
}
.wrap-left-bottom-content-table__custom {
  width: 100%;
  flex: 1;
}

.chart-content-wrapMiddle {
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.wrap-middle-top {
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  width: 100%;
  height: 68%;
  min-height: 68%;
  max-height: 68%;
  position: relative;
  overflow: hidden;

  margin-bottom: 15px;
}
.wrap-middle-top__custom {
  background: url("../../../../assets/images/czjcyj/kuang.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 68%;
  min-height: 68%;
  max-height: 68%;
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
}
.chart-bread-name {
  height: 15px;
  position: absolute;
  top: 0px;
  left: 15px;
  z-index: 55;
}
.chart-bread-name img {
  width: 18px;
  height: 20px;
  margin-top: 10px;
}
.wrap-middle-top-wrapBorder {
  width: 255px;
  height: 53px;
  background: #e8eaf6;
  border-radius: 0px 100px 100px 0px;
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-middle-top-wrapBorder__custom {
  width: 258px;
  height: 53px;
  background: rgba(39, 48, 65, 1);
  border-radius: 0px 100px 100px 0px;
  position: absolute;
  top: 50px;
  left: 5px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-middle-top-wrapBorder span:nth-child(1) {
  font-size: 16px;
  color: #303030;
}
.wrap-middle-top-wrapBorder span:nth-child(2) {
  font-size: 20px;
  color: #f0c731;
}
.wrap-middle-top-wrapBorder__custom span:nth-child(1) {
  font-size: 16px;
  color: #fff;
}
.wrap-middle-top-wrapBorder__custom span:nth-child(2) {
  font-size: 20px;
  color: #f0c731;
}
.map-border {
  width: 165px;
  height: 180px;
  border: 2px dashed #c4c8e0;
  position: absolute;
  bottom: 2%;
  right: 2%;
  /* z-index: 99; */
}
.map-border__custom {
  width: 165px;
  height: 180px;
  border: 2px dashed rgba(20, 82, 118, 1);
  position: absolute;
  bottom: 2%;
  right: 2%;
  /* z-index: 99; */
}

.chart-content-wrapMiddle-bottom {
  width: 100%;
  height: 32%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chart-content-wrapMiddle-bottom__custom {
  width: 100%;
  height: 32%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
}
.wrap-middle-bottom-left {
  width: 50%;
  height: 100%;
  margin-right: 15px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.wrap-middle-bottom-left__custom {
  width: 50%;
  height: 100%;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.wrap-middle-bottom-left-chart {
  width: 100%;
  height: 85%;
  /* margin-top: 10px; */
  padding: 5px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.wrap-middle-bottom-left-chart__custom {
  width: 100%;
  height: 90%;
  margin-top: 10px;
  padding: 5px 10px;
  border: 1px solid rgba(32, 96, 171, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.wrap-middle-bottom-left-chart-content {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.wrap-middle-bottom-left-list {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.wrap-middle-bottom-left-list-content {
  width: 100%;
  height: 25%;
  display: flex;
}
.middle-bottom-content-list-right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 65%;
  height: 100%;
}
.middle-bottom-content-list-right-title {
  color: #4f4f4f;
  font-size: 14px;
}
.middle-bottom-content-list-right-title__custom {
  color: #fff;
  font-size: 14px;
}
.middle-bottom-content-list-right-number {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.middle-bottom-content-list-right-number span:nth-child(1) {
  color: #1890ff;
  font-size: 18px;
}
.middle-bottom-content-list-right-number span:nth-child(2) {
  margin-left: 10px;
  color: #1890ff;
  font-size: 14px;
}
.wrap-middle-bottom-right {
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.wrap-middle-bottom-right__custom {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.wrap-middle-bottom-right-contentBox {
  width: 100%;
  height: 85%;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.wrap-middle-bottom-right-contentBox__custom {
  width: 100%;
  height: 90%;
  margin-top: 10px;
  padding: 5px 0;
  border: 1px solid rgba(32, 96, 171, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.wrap-middle-bottom-right-content {
  width: 90%;
  height: 48%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrap-middle-bottom-right-content-title {
  font-size: 14px;
  color: #303030;
  width: 100%;
  margin: 4px 0;
}
.wrap-middle-bottom-right-content-title__custom {
  font-size: 14px;
  color: #fff;
  width: 100%;
  margin: 10px 0;
}
.wrap-middle-bottom-right-content-number {
  color: #fa8c16;
}
.wrap-middle-bottom-right-content-data {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrap-middle-bottom-right-content-list {
  width: 32%;
  height: 80%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  border: 1px solid rgba(169, 169, 169, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.wrap-middle-bottom-right-content-list__custom {
  width: 32%;
  height: 70%;
  border: 1px solid rgba(32, 96, 171, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.wrap-middle-bottom-right-content-list span:nth-child(1) {
  color: #303030;
  font-size: 12px;
}
.wrap-middle-bottom-right-content-list span:nth-child(2) {
  color: #1890ff;
  font-size: 12px;
}
.wrap-middle-bottom-right-content-list__custom span:nth-child(1) {
  color: #ffffff;
  font-size: 14px;
}
.wrap-middle-bottom-right-content-list__custom span:nth-child(2) {
  color: #1890ff;
  font-size: 14px;
}

.chart-content-wrapRight {
  box-sizing: border-box;
  width: 25%;
  height: 100%;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.chart-content-wrapRight-top {
  box-sizing: border-box;
  width: 100%;
  height: 68%;
  max-height: 68%;
  min-height: 68%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.wrap-right-top {
  width: 100%;
  height: 60%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  margin-bottom: 15px;
}
.wrap-right-top__custom {
  width: 100%;
  height: 60%;
  overflow: hidden;
  margin-bottom: 15px;
}
.wrap-right-top-content {
  width: 100%;
  height: 90%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.wrap-right-top-messageBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 10px 0;
}
.wrap-right-top-messageBox__custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 10px 0;
}
.wrap-right-top-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #1c3f86;
  border-radius: 5px;
  padding: 10px;
  height: 50px;
  box-sizing: border-box;
  width: 34%;
  margin-right: 15px;
}
.wrap-right-top-message__custom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #1c3f86;
  border-radius: 5px;
  padding: 10px;
  height: 60px;
  box-sizing: border-box;
  width: 34%;
  margin-right: 15px;
}

.wrap-right-top-messageBox li.wrap-right-top-message:nth-child(3) {
  margin-right: 0;
}
.wrap-right-top-messageBox__custom
  li.wrap-right-top-message__custom:nth-child(3) {
  margin-right: 0;
}
.wrap-right-top-message-title {
  font-size: 12px;
  color: #303030;
}
.wrap-right-top-message-title__custom {
  font-size: 14px;
  color: #fff;
}
.wrap-right-top-message-number {
  font-size: 12px;
  color: #1890ff;
}
.wrap-right-top-message-number__custom {
  font-size: 14px;
  color: #1890ff;
}
.chart-rt {
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: space-between;
}
.wrap-right-middle {
  width: 100%;
  height: 40%;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
  position: relative;
}
.wrap-right-middle__custom {
  width: 100%;
  height: 40%;
  overflow: hidden;
  position: relative;
}
.wrap-right-middle-message-title {
  margin: 5px 0;
  font-size: 14px;
  color: #303030;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-right-middle-message-title__custom {
  margin: 15px 0;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-right-middle-message-number {
  font-size: 14px;
  color: #fa8c16;
}
.wrap-right-bottom {
  width: 100%;
  height: 32%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.wrap-right-bottom__custom {
  width: 100%;
  height: 32%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 15px;
}
.wrap-right-bottom-contentBox {
  width: 100%;
  height: 90%;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.wrap-right-bottom-contentBox__custom {
  width: 100%;
  height: 90%;
  margin-top: 10px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.wrap-right-bottom-content {
  width: 100%;
  height: 45%;

  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrap-right-bottom-content__custom {
  width: 100%;
  height: 45%;
  border: 1px solid rgba(151, 151, 151, 1);
  background: rgba(30, 38, 52, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrap-right-bottom-content-list {
  width: 42%;
  height: 80%;
  display: flex;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  border-radius: 3px;
  border: 1px solid rgba(169, 169, 169, 1);
}
.wrap-right-bottom-content-list__custom {
  width: 42%;
  height: 70%;
  display: flex;
  border: 1px solid rgba(32, 96, 171, 1);
}
.content-list-left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 100%;
}
.content-list-left img {
  width: 21px;
  height: 26px;
}
.content-list-right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 65%;
  height: 100%;
}
.content-list-right__custom {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 65%;
  height: 100%;
}
.content-list-right span:nth-child(1) {
  color: #4f4f4f;
  font-size: 14px;
}
.content-list-right__custom span:nth-child(1) {
  color: #fff;
  font-size: 14px;
}
.content-list-right span:nth-child(2) {
  color: #1890ff;
  font-size: 16px;
}
.content-list-right__custom span:nth-child(2) {
  color: #1890ff;
  font-size: 18px;
}

.wrap-header {
  width: 100%;
  height: 30px;
  max-height: 30px;
  min-height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 2px solid #f6f5f8;
}
.wrap-header__custom {
  width: 100%;
  height: 30px;
  max-height: 30px;
  min-height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}
.wrap-header-icon {
  width: 4px;
  height: 16px;
  display: block;
  margin: 0 10px;
  border-radius: 4px;
}
.wrap-header-title {
  font-size: 16px;
  color: #333;
  font-weight: 500px;
}
.wrap-header-title__custom {
  font-size: 16px;
  color: #fff;
  font-weight: 500px;
}
.wrap-header-ltStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(18, 0, 89, 1) 0%,
    rgba(0, 143, 210, 1) 61%,
    rgba(86, 187, 255, 1) 74%,
    rgba(0, 145, 211, 1) 87%,
    rgba(21, 1, 97, 1) 100%
  );
}
.wrap-header-lmStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(18, 0, 89, 1) 0%,
    rgba(0, 143, 210, 1) 26%,
    rgba(86, 187, 255, 1) 38%,
    rgba(0, 145, 211, 1) 50%,
    rgba(21, 1, 97, 1) 100%
  );
}
.wrap-header-lbStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(18, 0, 89, 1) 0%,
    rgba(0, 143, 210, 1) 49%,
    rgba(86, 187, 255, 1) 59%,
    rgba(0, 145, 211, 1) 71%,
    rgba(21, 1, 97, 1) 100%
  );
}
.wrap-header-mblStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(18, 0, 89, 1) 0%,
    rgba(0, 143, 210, 1) 38%,
    rgba(86, 187, 255, 1) 52%,
    rgba(0, 145, 211, 1) 67%,
    rgba(21, 1, 97, 1) 100%
  );
}
.wrap-header-mbrStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(18, 0, 89, 1) 0%,
    rgba(0, 143, 210, 1) 20%,
    rgba(86, 187, 255, 1) 42%,
    rgba(0, 145, 211, 1) 58%,
    rgba(21, 1, 97, 1) 100%
  );
}
.wrap-header-rtStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(21, 0, 102, 1) 0%,
    rgba(0, 145, 211, 1) 43%,
    rgba(86, 187, 255, 1) 60%,
    rgba(0, 145, 211, 1) 75%,
    rgba(24, 0, 115, 1) 100%
  );
}
.wrap-header-rmStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(21, 0, 103, 1) 0%,
    rgba(0, 145, 211, 1) 14%,
    rgba(86, 187, 255, 1) 31%,
    rgba(0, 145, 211, 1) 49%,
    rgba(20, 0, 96, 1) 100%
  );
}
.wrap-header-rbStyle {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    270deg,
    rgba(20, 0, 97, 1) 0%,
    rgba(0, 145, 211, 1) 56%,
    rgba(86, 187, 255, 1) 77%,
    rgba(0, 145, 211, 1) 91%,
    rgba(18, 0, 90, 1) 100%
  );
}
.wrap-header-columStyle {
  width: 2px;
  height: 100px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(246, 245, 248, 1) 19%,
    rgba(236, 236, 236, 1) 46%,
    rgba(246, 245, 248, 1) 77%,
    rgba(255, 255, 255, 1) 100%
  );
}
.wrap-header-columStyle__custom {
  width: 2px;
  height: 100px;
  background: linear-gradient(
    0deg,
    rgba(13, 26, 40, 1) 0%,
    rgba(0, 145, 211, 1) 35%,
    rgba(86, 187, 255, 1) 46%,
    rgba(0, 145, 211, 1) 65%,
    rgba(13, 26, 40, 1) 100%
  );
}
@media screen and (max-width: 1600px) {
  .page-body {
    padding: 0 15px 15px;
    background-color: #f7f7f7;
    width: 1846px;
    height: 821px;
    overflow: auto;
  }
  #page-body-chart {
    width: 1846px;
    height: 821px;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
}
</style>
<style>
#page-body-chart .el-input__inner {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
}
#page-body-chart .el-icon-arrow-up:before {
  color: #fff;
}
#page-body-chart__custom .el-input__inner {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
}
#page-body-chart__custom .el-icon-arrow-up:before {
  color: #fff;
}
</style>
