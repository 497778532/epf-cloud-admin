<template>
  <div style="height:100%;position:relative;z-index:20;"
       class="newpage">
    <div class="controller_contain"
         v-if="isIframe === 10">
      <div style="height:100%;z-index:10"
           class="console">
        <div style="display: flex; flex-direction: column;height: 100%;">
          <el-tabs ref="elTabs"
                   :tab-position="tabPosition"
                   v-model="activeName"
                   class="transition-box"
                   type="border-card"
                   @tab-click="tabClick"
                   style="height:100%">
            <el-tab-pane name="first">
              <div slot="label">
                <div v-if="activeTab1"
                     class="active tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list"
                         alt />
                    <div class="tabsTitle">资源目录</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list1"
                         alt />
                    <div class="tabsTitle">资源目录</div>
                  </div>
                </div>
              </div>

              <div v-show="!searchShow"
                   style="height:100%">
                <div class="firstBox__control">
                  <div @click="turnTuCeng"
                       :class="{ Toactive: current == 1 }">
                    常用图层
                  </div>
                  <!-- <div @click="turnZhuanTi"
                       :class="{ Toactive: current == 2 }">
                    常用专题
                  </div> -->
                  <div @click="turnMuLu"
                       :class="{ Toactive: current == 3 }">
                    详细目录
                  </div>
                  <span @click="clearCheckbox"
                        style="cursor:pointer">
                    <img :src="list6"
                         alt="" />
                  </span>
                </div>
                <div style="height:calc(100% - 40px)"
                     v-show="this.current == 1">
                  <controllerResource :parentDataId="parentDataId"
                                      @Closeslider="closeslider"
                                      :EFPexpandedNode="expandedNode"
                                      :EFPexpandedData="expandedData"
                                      :data="resourceData"
                                      ref="commonLayerTree"
                                      :EPFDefaultProps="defaultProps"
                                      :EPFmenu="menu"
                                      @EPFrightClick="rightClick1"
                                      @EPFdropDown="dropDownClick1"
                                      @EPFcheckChange="treeChangeClick"
                                      @EPFnodeClick="treeClick1"
                                      :EPFdefaultArray="defaultArray1"
                                      @EPFloadNode="loadNode1"
                                      :EPFcommon="common"></controllerResource>
                </div>
                <div v-show="this.current === 2"
                     ref="commonTopic">
                  <div class="secondBox"
                       v-for="(item, index) in zhuanTiData"
                       :key="index">
                    <el-checkbox v-model="commonServiceModels[index].checked"
                                 class="changeCheckbox">{{ item.name }}</el-checkbox>
                  </div>
                </div>
                <div style="height:calc(100% - 40px)"
                     v-show="this.current == 3">
                  <controllerResource :parentDataId="parentDataId"
                                      @Closeslider="closeslider"
                                      :EFPexpandedNode="expandedNode"
                                      :EFPexpandedData="expandedData"
                                      :data="treeData"
                                      :EPFDefaultProps="defaultProps"
                                      :EPFmenu="menu"
                                      @EPFrightClick="rightClick1"
                                      @EPFdropDown="dropDownClick1"
                                      @EPFcheckChange="treeChangeClick"
                                      @EPFnodeClick="treeClick1"
                                      :EPFdefaultArray="defaultArray1"
                                      @EPFloadNode="loadNode1"
                                      :EPFcommon="common"
                                      ref="detailCatalog"></controllerResource>
                </div>
              </div>

              <div class="searchResult"
                   style="height:100%"
                   v-show="searchShow">
                <el-scrollbar>
                  <div class="firstBox__control">
                    <div @click="searchBtn(1, '')"
                         :class="{ Toactive: current == 1 }">
                      全部
                    </div>
                    <div @click="searchBtn(2, '03')"
                         :class="{ Toactive: current == 2 }">
                      服务
                    </div>
                    <div @click="searchBtn(3, '01')"
                         :class="{ Toactive: current == 3 }">
                      文件
                    </div>
                    <div @click="searchBtn(4, '02')"
                         :class="{ Toactive: current == 4 }">
                      专题
                    </div>
                  </div>

                  <div style="height:100%">
                    <div class="searchResultData">
                      <div class="searchTr"
                           :key="item.id"
                           v-for="item in searchListData1">
                        <el-row class="searchTrTitle overText">
                          <span @click="pushToTree(item)">{{ item.front
                            }}<span style="color:#F77575">{{
                              item.middle
                            }}</span>{{ item.back }}</span>
                        </el-row>
                        <el-row class="searchTrContent">
                          <el-col :span="12"
                                  class="overText"
                                  style="color:rgba(166,166,166,1);font-size:14px">
                            <span>{{ item.typeName }}</span>
                          </el-col>
                          <el-col :span="12"
                                  class="overText"
                                  style="color:rgba(166,166,166,1);text-align:right;font-size:14px">{{ item.info }}</el-col>
                        </el-row>
                      </div>
                    </div>
                    <div style="text-align:center;margin:8px 0px;margin-top:15px;">
                      <el-pagination :page-size="searchListPageSize"
                                     v-if="searchListData1.length !== 0"
                                     :current-page="searchListPageNo"
                                     @size-change="searchListHandleSizeChange"
                                     @current-change="searchListHandleCurrentChange"
                                     background
                                     layout="prev, pager, next"
                                     :total="searchTotalRecord"></el-pagination>
                      <span v-else>暂无数据</span>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </el-tab-pane>
            <el-tab-pane name="second">
              <div slot="label">
                <div v-if="activeTab2"
                     class="tabs active">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list2"
                         alt />
                    <div class="tabsTitle">工作台</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list22"
                         alt />
                    <div class="tabsTitle">工作台</div>
                  </div>
                </div>
              </div>
              <controllerResource :EPFDefaultProps="defaultProps2"
                                  :EPFmenu="menu2"
                                  :EPFdataChilds="data2Child1"
                                  @EPFdropDown="dropDownClick2"
                                  @EPFrightClick="rightClick2"
                                  :EPFdefaultArray="defaultArray2"
                                  @EPFloadNode="loadNode2"
                                  @EPFgetNode="getNode2"
                                  style="padding:unset;">
                <template slot="item"
                          slot-scope="scope">
                  <i v-if="scope.row.id == '11'"
                     class="el-icon-circle-plus-outline"
                     style="font-size:20px;color:#1D7CE4"
                     @click="xinzengClick('open')"></i>

                  <el-input v-if="scope.row.add"
                            v-model="enterFilterData.rename"
                            placeholder="请输入文件夹名称"
                            @keyup.enter.native="renameBlur()"
                            @click.stop
                            :maxlength="50"></el-input>
                </template>
              </controllerResource>
            </el-tab-pane>
            <el-tab-pane name="third">
              <div slot="label">
                <div v-if="activeTab3"
                     class="active tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list3"
                         alt />
                    <div class="tabsTitle">我的专题</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list33"
                         alt />
                    <div class="tabsTitle">我的专题</div>
                  </div>
                </div>
              </div>

              <div class="firstBox__control-right">
                <span style="cursor:pointer"
                      @click="handleClickTemplate">专题库
                </span>
                <i class="el-icon-arrow-right"></i>
              </div>
              <div style="height:calc(100% - 40px)">
                <controllerResource :data="data3"
                                    :EPFDefaultProps="defaultProps3"
                                    :EPFmenu="menu3"
                                    @EPFdropDown="dropDownClick3"
                                    @EPFrightClick="rightClick3"
                                    @EPFloadNode="loadNode3"
                                    @EPFcheckChange="treeChangeClick3"
                                    @EPFradioChange="radioChange3"
                                    style="padding:unset;"></controllerResource>
              </div>
            </el-tab-pane>
            <el-tab-pane name="fourth"
                         style="{height:100%, border:1px solid rgab(213, 213, 213)}"
                         class="tongjifenxi">
              <div slot="label">
                <div v-if="activeTab4"
                     class="active tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list44"
                         alt />
                    <div class="tabsTitle">统计分析</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list4"
                         alt />
                    <div class="tabsTitle">统计分析</div>
                  </div>
                </div>
              </div>
              <div v-if="countHome"
                   class="countHome"
                   style="height:100%; overflow: auto;">
                <div class="forth-container">
                  <epf-title title="常见业务分析"
                             style="margin:5px 10px;"></epf-title>
                  <div class="box1">
                    <div class="box1-part"
                         @click="toSecondCollide">
                      <img src="./images/两规冲突.png"
                           alt />
                      <p>两规冲突</p>
                    </div>
                    <div class="box1-part"
                         @click="toNowCollide">
                      <img src="./images/规划现状分析.png"
                           alt />
                      <p>规划现状冲突</p>
                    </div>
                    <div class="box1-part"
                         @click="toPlan">
                      <img src="./images/历年现状.png"
                           alt />
                      <p>历年现状</p>
                    </div>
                    <div class="box1-part"
                         @click="toYearsSituation">
                      <img src="./images/规划符合性.png"
                           alt />
                      <p>规划符合性</p>
                    </div>
                    <div class="box1-part"
                         @click="toConstructed">
                      <img src="./images/压覆矿.png"
                           alt />
                      <p>压覆矿</p>
                    </div>
                    <div class="box1-part"
                         @click="toDisaster">
                      <img src="./images/地质灾害点.png"
                           alt />
                      <p>地质灾害点</p>
                    </div>
                    <div class="box1-part"
                         @click="toDisasterArea">
                      <img src="./images/地质灾害易发区.png"
                           alt />
                      <p>地质灾害易发区</p>
                    </div>
                    <div class="box1-part"
                         @click="toZongHeFenXi">
                      <img src="./images/综合分析.png"
                           alt />
                      <p>综合分析</p>
                    </div>
                  </div>
                  <epf-title title="通用分析"
                             style="margin:5px 10px;"></epf-title>
                  <div class="box2">
                    <div class="box1-part"
                         @click="toSuperpositionPage">
                      <img src="./images/叠加分析.png"
                           alt />
                      <p>叠加分析</p>
                    </div>
                    <div class="box1-part"
                         @click="toBufferPages">
                      <img src="./images/缓冲区分析.png"
                           alt />
                      <p>缓冲区分析</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 统计分析--叠加分析 -->
              <div class="firstDiv"
                   v-if="superpositionPage">
                <el-scrollbar style="height:100%;">
                  <el-row class="selectHeader">选择叠加分析图层</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">服务名称 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.server"
                                 style="width:100%"
                                 @change="serverSelect(dictionary1, filterData.server)">
                        <el-option v-for="item in dictionary1.serverData"
                                   :ref="item.name"
                                   :id="item.id"
                                   :dictKey="item.name"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">图层名称 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.picture"
                                 style="width:100%"
                                 @change="getLayerId">
                        <el-option v-for="item in dictionary1.pictureData"
                                   :ref="item.layerName"
                                   :id="item.id"
                                   :dictKey="item.layerName"
                                   :label="item.layerName"
                                   :value="item.layerName"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">显示字段 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="(item, index) in property"
                                     :label="item.name"
                                     :key="index">{{ item.label }}</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                  <el-row class="selectHeader">选择叠加分析类型</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">选择类型 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.type"
                                 placeholder="请选择"
                                 style="width:100%">
                        <el-option v-for="item in transType"
                                   :ref="item.label"
                                   :id="item.label"
                                   :dictKey="item.label"
                                   :label="item.label"
                                   :value="item.value"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row class="selectHeader">统计分析范围</el-row>
                  <el-row>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('range')">绘制范围</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('coordinate')">导入坐标</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('area')">区域选择</el-button>
                    </el-col>
                  </el-row>
                  <el-row v-if="area">
                    <el-col :span="24">
                      <div style="width:30%;float:left;margin-right:9px;">
                        <el-select v-model="filterData.cantonProvinceName"
                                   size="small"
                                   placeholder="省"
                                   @change="
                            provinceSelect(
                              dictionary.administrative_regions,
                              filterData.cantonProvinceName,
                              $event
                            )
                          ">
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
                                   placeholder="市"
                                   @change="
                            citySelect(
                              dictionary.cantonCity,
                              filterData.cantonCityName,
                              $event
                            )
                          ">
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
                                   placeholder="区/镇"
                                   @change="
                            areaSelect(
                              dictionary.cantonArea,
                              filterData.cantonAreaName,
                              $event
                            )
                          ">
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
                  <el-row type="flex"
                          justify="end">
                    <el-col :span="8"
                            style="text-align:left">
                      <el-button type="primary"
                                 size="medium"
                                 @click="start('superposition')">开始分析</el-button>
                    </el-col>
                  </el-row>
                </el-scrollbar>
              </div>

              <div class="zy-main"
                   v-if="yearsSituation">
                <el-scrollbar>
                  <el-row class="selectHeader">选择缓冲分析因子</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">输入半径 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="filterData.radius"
                                size="small"
                                placeholder="请输入半径"
                                :maxlength="50"></el-input>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">选择服务 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.server"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="serverSelect(dictionary1, filterData.server)">
                        <el-option v-for="item in dictionary1.serverData"
                                   :ref="item.name"
                                   :id="item.id"
                                   :dictKey="item.name"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">选择图层 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.picture"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="getLayerId">
                        <el-option v-for="item in dictionary1.pictureData"
                                   :ref="item.layerName"
                                   :id="item.id"
                                   :dictKey="item.layerName"
                                   :label="item.layerName"
                                   :value="item.layerName"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">显示字段 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="(item, index) in property"
                                     :label="item.name"
                                     :key="index">{{ item.label }}</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                  <el-row class="selectHeader">选择分析类型</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">侧边类型 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.transType"
                                 placeholder="请选择"
                                 style="width:100%">
                        <el-option v-for="item in transType"
                                   :ref="item.label"
                                   :id="item.label"
                                   :dictKey="item.label"
                                   :label="item.label"
                                   :value="item.value"
                                   :key="item.label"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row class="selectHeader">统计分析范围</el-row>
                  <el-row>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('selectFeature')">选择中心点</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('coordinate')">导入坐标</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('area')">区域坐标</el-button>
                    </el-col>
                  </el-row>
                  <el-row v-if="area">
                    <el-col :span="24">
                      <div style="width:30%;float:left;margin-right:9px;">
                        <el-select v-model="filterData.cantonProvinceName"
                                   size="small"
                                   placeholder="选择省"
                                   @change="
                            provinceSelect(
                              dictionary.administrative_regions,
                              filterData.cantonProvinceName,
                              $event
                            )
                          ">
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
                                   @change="
                            citySelect(
                              dictionary.cantonCity,
                              filterData.cantonCityName,
                              $event
                            )
                          ">
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
                                   @change="
                            areaSelect(
                              dictionary.cantonArea,
                              filterData.cantonAreaName,
                              $event
                            )
                          ">
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
                  <el-row type="flex"
                          justify="end">
                    <el-col :span="8"
                            style="text-align:left">
                      <el-button type="primary"
                                 size="medium"
                                 @click="start('buffer')">开始分析</el-button>
                    </el-col>
                  </el-row>
                </el-scrollbar>
              </div>
              <!-- 统计分析--缓冲分析 -->
              <div class="firstDiv"
                   v-if="bufferPage">
                <el-scrollbar style="height:100%;">
                  <el-row class="selectHeader">选择缓冲分析因子</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">输入半径 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="filterData.radius"
                                size="small"
                                :maxlength="50"
                                placeholder="请输入半径"></el-input>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">选择服务 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.server"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="serverSelect(dictionary1, filterData.server)">
                        <el-option v-for="item in dictionary1.serverData"
                                   :ref="item.name"
                                   :id="item.id"
                                   :dictKey="item.name"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">选择图层 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.picture"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="getLayerId">
                        <el-option v-for="item in dictionary1.pictureData"
                                   :ref="item.layerName"
                                   :id="item.id"
                                   :dictKey="item.layerName"
                                   :label="item.layerName"
                                   :value="item.layerName"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">显示字段 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="(item, index) in property"
                                     :label="item.name"
                                     :key="index">{{ item.label }}</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                  <el-row class="selectHeader">选择分析类型</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">侧边类型 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.transType"
                                 placeholder="请选择"
                                 style="width:100%">
                        <el-option v-for="item in transType"
                                   :ref="item.label"
                                   :id="item.label"
                                   :dictKey="item.label"
                                   :label="item.label"
                                   :value="item.value"
                                   :key="item.label"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row class="selectHeader">统计分析范围</el-row>
                  <el-row>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 style="width:90%;display:flex;justify-content:center;"
                                 @click="btnClick('selectFeature')">选择中心点</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('coordinate')">导入坐标</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('area')">区域坐标</el-button>
                    </el-col>
                  </el-row>
                  <el-row v-if="area">
                    <el-col :span="24">
                      <div style="width:30%;float:left;margin-right:9px;">
                        <el-select v-model="filterData.cantonProvinceName"
                                   size="small"
                                   placeholder="选择省"
                                   @change="
                            provinceSelect(
                              dictionary.administrative_regions,
                              filterData.cantonProvinceName,
                              $event
                            )
                          ">
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
                                   @change="
                            citySelect(
                              dictionary.cantonCity,
                              filterData.cantonCityName,
                              $event
                            )
                          ">
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
                                   @change="
                            areaSelect(
                              dictionary.cantonArea,
                              filterData.cantonAreaName,
                              $event
                            )
                          ">
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
                  <el-row type="flex"
                          justify="end">
                    <el-col :span="8"
                            style="text-align:left">
                      <el-button type="primary"
                                 size="medium"
                                 @click="start('buffer')">开始分析</el-button>
                    </el-col>
                  </el-row>
                </el-scrollbar>
              </div>
              <!-- 统计分析--历年现状 -->
              <div v-if="present"
                   class="firstDiv">
                <el-scrollbar style="height:100%;">
                  <el-row class="selectHeader">选择年份服务分析</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">选择年份 :</span>
                    </el-col>
                    <el-col :span="14">
                      <!-- <el-select v-model="analystYear" placeholder="请选择" style="width:100%">
                      <el-option
                        v-for="(item, index) in years"
                        :id="item.id"
                        :label="item.name"
                        :value="item.name"
                        :key="index"
                      ></el-option>
                      </el-select>-->
                      <el-checkbox-group v-model="analystYearList"
                                         style="display: grid;">
                        <el-checkbox v-for="(item, index) in years"
                                     :label="item.name"
                                     :key="index">{{ item.name }}</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                  <el-row class="selectHeader">选择图层</el-row>
                  <el-row>
                    <el-col :span="8">
                      <span class="filter_title">选择服务 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.server"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="serverSelect(dictionary1, filterData.server)">
                        <el-option v-for="item in dictionary1.serverData"
                                   :ref="item.name"
                                   :id="item.id"
                                   :dictKey="item.name"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <span class="filter_title">选择图层 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.picture"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="getLayerId">
                        <el-option v-for="item in dictionary1.pictureData"
                                   :ref="item.layerName"
                                   :id="item.id"
                                   :dictKey="item.layerName"
                                   :label="item.layerName"
                                   :value="item.layerName"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row class="selectHeader">输入分析范围</el-row>
                  <el-row>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('range')">绘制范围</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('coordinate')">导入坐标</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('area')">区域坐标</el-button>
                    </el-col>
                  </el-row>
                  <el-row v-if="area">
                    <el-col :span="24">
                      <div style="width:30%;float:left;margin-right:9px;">
                        <el-select v-model="filterData.cantonProvinceName"
                                   size="small"
                                   placeholder="选择省"
                                   @change="
                            provinceSelect(
                              dictionary.administrative_regions,
                              filterData.cantonProvinceName,
                              $event
                            )
                          ">
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
                                   @change="
                            citySelect(
                              dictionary.cantonCity,
                              filterData.cantonCityName,
                              $event
                            )
                          ">
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
                                   @change="
                            areaSelect(
                              dictionary.cantonArea,
                              filterData.cantonAreaName,
                              $event
                            )
                          ">
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
                  <el-row type="flex"
                          justify="end">
                    <el-col :span="8"
                            style="text-align:left">
                      <el-button type="primary"
                                 size="medium"
                                 @click="start('present')">开始分析</el-button>
                    </el-col>
                  </el-row>
                </el-scrollbar>
              </div>
              <!-- 统计分析--规划符合性 -->
              <div v-if="planning"
                   class="firstDiv">
                <el-scrollbar style="height:100%;">
                  <el-row class="selectHeader">选择年份服务分析</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">选择年份 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="analystYear"
                                 placeholder="请选择"
                                 style="width:100%">
                        <el-option v-for="(item, index) in years"
                                   :id="item.id"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-row class="selectHeader">选择分析服务</el-row>
                    <el-row>
                      <el-col :span="20">
                        <el-checkbox-group v-model="checkedAnalystService">
                          <el-checkbox v-for="(item, index) in analystServiceOptions"
                                       :label="item.name"
                                       :disabled="!item.status"
                                       :key="index">{{ item.label }}</el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                    </el-row>
                  </el-row>

                  <el-row class="selectHeader">选择分析图层</el-row>
                  <el-row>
                    <el-col :span="8">
                      <span class="filter_title">选择服务 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.server"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="serverSelect(dictionary1, filterData.server)">
                        <el-option v-for="item in dictionary1.serverData"
                                   :ref="item.name"
                                   :id="item.id"
                                   :dictKey="item.name"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <span class="filter_title">选择图层 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.picture"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="getLayerId">
                        <el-option v-for="item in dictionary1.pictureData"
                                   :ref="item.layerName"
                                   :id="item.id"
                                   :dictKey="item.layerName"
                                   :label="item.layerName"
                                   :value="item.layerName"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row class="selectHeader">统计分析范围</el-row>
                  <el-row>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('range')">绘制范围</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('coordinate')">导入坐标</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('area')">区域坐标</el-button>
                    </el-col>
                  </el-row>
                  <el-row v-if="area">
                    <el-col :span="24">
                      <div style="width:30%;float:left;margin-right:9px;">
                        <el-select v-model="filterData.cantonProvinceName"
                                   size="small"
                                   placeholder="选择省"
                                   @change="
                            provinceSelect(
                              dictionary.administrative_regions,
                              filterData.cantonProvinceName,
                              $event
                            )
                          ">
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
                                   @change="
                            citySelect(
                              dictionary.cantonCity,
                              filterData.cantonCityName,
                              $event
                            )
                          ">
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
                                   @change="
                            areaSelect(
                              dictionary.cantonArea,
                              filterData.cantonAreaName,
                              $event
                            )
                          ">
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
                      <el-button type="primary"
                                 size="medium"
                                 @click="start('planning')">开始分析</el-button>
                    </el-col>
                  </el-row>
                </el-scrollbar>
              </div>

              <!-- 统计分析--压覆矿 -->
              <div v-if="constructed"
                   class="firstDiv">
                <el-scrollbar style="height:100%;">
                  <el-row class="selectHeader">选择分析服务</el-row>

                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">服务名称 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.server"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="serverSelect(dictionary1, filterData.server)">
                        <el-option v-for="item in dictionary1.serverData"
                                   :ref="item.name"
                                   :id="item.id"
                                   :dictKey="item.name"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">图层名称 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.picture"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="getLayerId">
                        <el-option v-for="item in dictionary1.pictureData"
                                   :ref="item.layerName"
                                   :id="item.id"
                                   :dictKey="item.layerName"
                                   :label="item.layerName"
                                   :value="item.layerName"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row class="selectHeader">输入分析范围</el-row>
                  <el-row>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('range')">绘制范围</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('coordinate')">导入坐标</el-button>
                    </el-col>
                  </el-row>
                  <el-row class="selectHeader">选择评估范围</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">评估范围 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="scopeData"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="getScopeId">
                        <el-option v-for="item in scopeList"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row type="flex"
                          justify="end">
                    <el-col :span="8"
                            style="text-align:left">
                      <el-button type="primary"
                                 size="medium"
                                 @click="jtstart('constructed')">开始分析</el-button>
                    </el-col>
                  </el-row>
                </el-scrollbar>
              </div>
              <!-- 统计分析--地质灾害点 -->
              <div v-if="disaster"
                   class="firstDiv">
                <el-scrollbar style="height:100%;">
                  <el-row class="selectHeader">选择分析服务</el-row>

                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">服务名称 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.server"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="serverSelect(dictionary1, filterData.server)">
                        <el-option v-for="item in dictionary1.serverData"
                                   :ref="item.name"
                                   :id="item.id"
                                   :dictKey="item.name"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">分析图层 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.picture"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="getLayerId">
                        <el-option v-for="item in dictionary1.pictureData"
                                   :ref="item.layerName"
                                   :id="item.id"
                                   :dictKey="item.layerName"
                                   :label="item.layerName"
                                   :value="item.layerName"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row class="selectHeader">输入分析区域</el-row>
                  <el-row>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('range')">绘制范围</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-upload action
                                 :auto-upload="false"
                                 :on-change="changeShp"
                                 accept=".zip"
                                 :show-file-list="false"
                                 :multiple="false">
                        <el-button size="medium"
                                   type="primary">导入坐标</el-button>
                      </el-upload>
                    </el-col>
                  </el-row>
                  <el-row class="selectHeader">选择影响范围</el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">影响范围 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="scopeDisData"
                                 placeholder="请选择影响范围"
                                 style="width:100%"
                                 @change="getScopeDisId">
                        <el-option v-for="item in scopeDisList"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row v-if="isImport">
                    <el-col :span="7">
                      <span class="filter_title">分析范围 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="inputScopeDis"
                                placeholder="请输入自定义分析范围"
                                :maxlength="50"></el-input>
                    </el-col>
                  </el-row>
                  <el-row type="flex"
                          justify="end">
                    <el-col :span="8"
                            style="text-align:left">
                      <el-button type="primary"
                                 size="medium"
                                 @click="jtstart('disaster')">开始分析</el-button>
                    </el-col>
                  </el-row>
                </el-scrollbar>
              </div>
              <!-- 统计分析--地质灾害易发区 -->
              <div v-if="disasterarea"
                   class="firstDiv">
                <el-scrollbar style="height:100%;">
                  <el-row class="selectHeader">选择分析服务</el-row>

                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">地灾图层 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.server"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="serverSelect(dictionary1, filterData.server)">
                        <el-option v-for="item in dictionary1.serverData"
                                   :ref="item.name"
                                   :id="item.id"
                                   :dictKey="item.name"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">分析图层 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.picture"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="getLayerId">
                        <el-option v-for="item in dictionary1.pictureData"
                                   :ref="item.layerName"
                                   :id="item.id"
                                   :dictKey="item.layerName"
                                   :label="item.layerName"
                                   :value="item.layerName"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row class="selectHeader">输入分析范围</el-row>
                  <el-row>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('range')">绘制范围</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('coordinate')">导入坐标</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('area')">区域选择</el-button>
                    </el-col>
                  </el-row>
                  <el-row v-if="area">
                    <el-col :span="24">
                      <div style="width:30%;float:left;margin-right:9px;">
                        <el-select v-model="filterData.cantonProvinceName"
                                   size="small"
                                   placeholder="选择省"
                                   @change="
                            provinceSelect(
                              dictionary.administrative_regions,
                              filterData.cantonProvinceName,
                              $event
                            )
                          ">
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
                                   @change="
                            citySelect(
                              dictionary.cantonCity,
                              filterData.cantonCityName,
                              $event
                            )
                          ">
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
                                   @change="
                            areaSelect(
                              dictionary.cantonArea,
                              filterData.cantonAreaName,
                              $event
                            )
                          ">
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
                  <el-row type="flex"
                          justify="end">
                    <el-col :span="8"
                            style="text-align:left">
                      <el-button type="primary"
                                 size="medium"
                                 @click="jtstart('disasterarea')">开始分析</el-button>
                    </el-col>
                  </el-row>
                </el-scrollbar>
              </div>
              <!-- 综合分析 -->
              <!-- <div v-if="zongHeFenXi"
                   class="firstDiv">
                <iframe :src="this.iframeSrcZH"
                        width="100%"
                        height="100%"
                        frameborder="no"
                        border="0"
                        marginwidth="0"
                        marginheight="0"
                        scrolling="no"
                        class="test"></iframe>
              </div> -->
              <!-- 两规冲突检测分析 -->
              <!-- <div v-if="secondcollide"
                   class="firstDiv">
                <el-row class="selectHeader">选择分析服务</el-row>

                <el-row>
                  <el-col :span="7">
                    <span class="filter_title">城规图层 :</span>
                  </el-col>
                  <el-col :span="14">
                    <el-select v-model="filterData.server"
                               placeholder="请选择"
                               style="width:100%"
                               @change="serverSelect(dictionary1,filterData.server)">
                      <el-option v-for="item in dictionary1.serverData"
                                 :ref="item.name"
                                 :id="item.id"
                                 :dictKey="item.name"
                                 :label="item.name"
                                 :value="item.name"
                                 :key="item.index"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="7">
                    <span class="filter_title">土规图层 :</span>
                  </el-col>
                  <el-col :span="14">
                    <el-select v-model="filterData.picture"
                               placeholder="请选择"
                               style="width:100%"
                               @change="getLayerId">
                      <el-option v-for="item in dictionary1.pictureData"
                                 :ref="item.layerName"
                                 :id="item.id"
                                 :dictKey="item.layerName"
                                 :label="item.layerName"
                                 :value="item.layerName"
                                 :key="item.index"></el-option>
                    </el-select>
                  </el-col>
                </el-row>

                <el-row class="selectHeader">输入分析范围</el-row>
                <el-row>
                  <el-col :span="8"
                          class="threePush">
                    <el-button type="primary"
                               size="medium"
                               @click="btnClick('range')">绘制范围</el-button>
                  </el-col>
                  <el-col :span="8"
                          class="threePush">
                    <el-button type="primary"
                               size="medium"
                               @click="btnClick('coordinate')">导入坐标</el-button>
                  </el-col>
                  <el-col :span="8"
                          class="threePush">
                    <el-button type="primary"
                               size="medium"
                               @click="btnClick('area')">区域选择</el-button>
                  </el-col>
                </el-row>
                <el-row v-if="area">
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
                <el-row type="flex"
                        justify="end">
                  <el-col :span="8"
                          style="text-align:left">
                    <el-button type="primary"
                               size="medium"
                               @click="jtstart('secondcollide')">开始分析</el-button>
                  </el-col>
                </el-row>
              </div> -->
              <!-- 统计分析--规划现状冲突 -->
              <div v-if="nowcollide"
                   class="firstDiv">
                <el-scrollbar style="height:100%;">
                  <el-row class="selectHeader">选择分析服务</el-row>

                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">规划图层 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.server"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="serverSelect(dictionary1, filterData.server)">
                        <el-option v-for="item in dictionary1.serverData"
                                   :ref="item.name"
                                   :id="item.id"
                                   :dictKey="item.name"
                                   :label="item.name"
                                   :value="item.name"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">
                      <span class="filter_title">现状图层 :</span>
                    </el-col>
                    <el-col :span="14">
                      <el-select v-model="filterData.picture"
                                 placeholder="请选择"
                                 style="width:100%"
                                 @change="getLayerId">
                        <el-option v-for="item in dictionary1.pictureData"
                                   :ref="item.layerName"
                                   :id="item.id"
                                   :dictKey="item.layerName"
                                   :label="item.layerName"
                                   :value="item.layerName"
                                   :key="item.index"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row class="selectHeader">输入分析范围</el-row>
                  <el-row>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('range')">绘制范围</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('coordinate')">导入坐标</el-button>
                    </el-col>
                    <el-col :span="8"
                            class="threePush">
                      <el-button type="primary"
                                 size="medium"
                                 @click="btnClick('area')">区域选择</el-button>
                    </el-col>
                  </el-row>
                  <el-row v-if="area">
                    <el-col :span="24">
                      <div style="width:30%;float:left;margin-right:9px;">
                        <el-select v-model="filterData.cantonProvinceName"
                                   size="small"
                                   placeholder="选择省"
                                   @change="
                            provinceSelect(
                              dictionary.administrative_regions,
                              filterData.cantonProvinceName,
                              $event
                            )
                          ">
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
                                   @change="
                            citySelect(
                              dictionary.cantonCity,
                              filterData.cantonCityName,
                              $event
                            )
                          ">
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
                                   @change="
                            areaSelect(
                              dictionary.cantonArea,
                              filterData.cantonAreaName,
                              $event
                            )
                          ">
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
                  <el-row type="flex"
                          justify="end">
                    <el-col :span="8"
                            style="text-align:left">
                      <el-button type="primary"
                                 size="medium"
                                 @click="jtstart('nowcollide')">开始分析</el-button>
                    </el-col>
                  </el-row>
                </el-scrollbar>
              </div>
            </el-tab-pane>
            <el-tab-pane name="fivth">
              <div slot="label">
                <div v-if="activeTab5"
                     class="active tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list8"
                         alt />
                    <div class="tabsTitle">统计数据</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list88"
                         alt />
                    <div class="tabsTitle">统计数据</div>
                  </div>
                </div>
              </div>
              <statisticalData @open="open"
                               @isNature="isNature"
                               @society="society"></statisticalData>
            </el-tab-pane>
          </el-tabs>
        </div>

        <superposition :superpositionDialog="superpositionDialog"
                       :tableData="queryResult"
                       :layerOutFieldsAlias="layerOutFieldsAlias"
                       :layerFieldsToShow="layerFieldsToShow"
                       @closeDialog="closeDialog"
                       :loading="tableLoading"></superposition>

        <buffer :bufferDialog="bufferDialog"
                :tableData="queryResult"
                :layerOutFieldsAlias="layerOutFieldsAlias"
                :layerFieldsToShow="layerFieldsToShow"
                @closeDialog="closeDialog"
                :loading="tableLoading"></buffer>

        <multiple-table :isMTableShow="isMTableShow"
                        :tableData="analystResult"
                        :layerOutFieldsAlias="layerOutFieldsAlias"
                        :layerFieldsToShow="layerFieldsToShow"
                        @closeDialog="closeDialog"
                        :loading="tableLoading"
                        :multiResult="multiResult"></multiple-table>

        <present-table :isPTableShow="isPTableShow"
                       :tableData="analystResult"
                       :layerOutFieldsAlias="layerOutFieldsAlias"
                       :layerFieldsToShow="layerFieldsToShow"
                       @closeDialog="closeDialog"
                       :loading="tableLoading"
                       :multiResult="multiResult"></present-table>

        <mine :mineDialog="mineDialog"
              @closeDialog="mineDialog = false"></mine>

        <constructed :constructedDialog="constructedDialog"
                     :layerOutFieldsAlias="layerOutFieldsAlias"
                     :layerFieldsToShow="layerFieldsToShow"
                     @closeDialog="closeDialog"
                     :loading="tableLoading"></constructed>

        <!-- <disaster :disasterDialog="disasterDialog"
                :layerOutFieldsAlias="layerOutFieldsAlias"
                :layerFieldsToShow="layerFieldsToShow"
                @closeDialog="closeDialog"
                :loading="tableLoading"
                :paramdisasterLayer="disasterResult"
                :paramdistance="distance"
                :paramgeometry="scopeBufferGeometry"></disaster> -->

        <disasterarea :disasterareaDialog="disasterareaDialog"
                      :layerOutFieldsAlias="layerOutFieldsAlias"
                      :layerFieldsToShow="layerFieldsToShow"
                      @closeDialog="closeDialog"
                      :loading="tableLoading"></disasterarea>

        <secondcollide :secondcollideDialog="secondcollideDialog"
                       :layerOutFieldsAlias="layerOutFieldsAlias"
                       :layerFieldsToShow="layerFieldsToShow"
                       @closeDialog="closeDialog"
                       :loading="tableLoading"></secondcollide>

        <nowcollide :nowcollideDialog="nowcollideDialog"
                    :layerOutFieldsAlias="layerOutFieldsAlias"
                    :layerFieldsToShow="layerFieldsToShow"
                    @closeDialog="closeDialog"
                    :loading="tableLoading"></nowcollide>

        <el-dialog top="25vh"
                   title="新增目录"
                   :visible.sync="xinzengDialog"
                   width="25%"
                   :modal="false">
          <div class
               style="height:430px">
            <controllerResourceCommon :data="data5"
                                      :EPFnodeKey="nodeKey"
                                      :EPFDefaultProps="defaultProps5"
                                      @EPFnodeClick="treeClick5"
                                      :EPFdefaultArray="defaultArray5">
              <template slot="item"
                        slot-scope="scope">
                <el-input v-if="scope.row.add"
                          v-model="enterFilterData.name"
                          placeholder="请输入文件夹名称"
                          @blur="enteringBlur(scope.row)"
                          @click.stop
                          :maxlength="50"></el-input>
              </template>
            </controllerResourceCommon>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="xinzengwenjianjia()">新增文件夹</el-button>
            <el-button type="primary"
                       @click="baocun()">保存</el-button>
            <el-button type="primary"
                       @click="xinzengClick('close')">关闭</el-button>
          </span>
        </el-dialog>

        <el-dialog top="25vh"
                   title="收藏目录"
                   :visible.sync="xiugaiDialog"
                   width="25%"
                   :modal="false">
          <div class
               style="height:430px">
            <controllerResourceCommon :data="data5"
                                      :EPFnodeKey="nodeKey"
                                      :EPFDefaultProps="defaultProps6"
                                      @EPFnodeClick="treeClick6"
                                      :EPFdefaultArray="defaultArray6"></controllerResourceCommon>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="shoucang()">保存</el-button>
            <el-button type="primary"
                       @click="xiugaiDialog = false">关闭</el-button>
          </span>
        </el-dialog>
        <!-- <upload-widget ref="UploadWidget"></upload-widget> -->
      </div>
    </div>

    <div class="controller_contain_custom"
         v-if="isIframe === 11">
      <div style="height:100%;z-index:10"
           class="console"
           id="console_custom">
        <div style="display: flex; flex-direction: column;height: 100%;width:100%;">
          <el-tabs ref="elTabs"
                   :tab-position="tabPosition"
                   v-model="activeName"
                   class="transition-box"
                   type="border-card"
                   @tab-click="tabClick"
                   style="height:100%">
            <el-tab-pane name="first">
              <div slot="label">
                <div v-if="activeTab1"
                     class="active tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list"
                         alt />
                    <div class="tabsTitle">资源目录</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list1"
                         alt />
                    <div class="tabsTitle">资源目录</div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="second">
              <div slot="label">
                <div v-if="activeTab2"
                     class="tabs active">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list2"
                         alt />
                    <div class="tabsTitle">工作台</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list22"
                         alt />
                    <div class="tabsTitle">工作台</div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="third">
              <div slot="label">
                <div v-if="activeTab3"
                     class="active tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list3"
                         alt />
                    <div class="tabsTitle">我的专题</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list33"
                         alt />
                    <div class="tabsTitle">我的专题</div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="fourth"
                         style="{height:100%,border:1px solid rgab(213, 213, 213)}"
                         class="tongjifenxi">
              <div slot="label">
                <div v-if="activeTab4"
                     class="active tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list44"
                         alt />
                    <div class="tabsTitle">统计分析</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list4"
                         alt />
                    <div class="tabsTitle">统计分析</div>
                  </div>
                </div>
              </div>

              <iframe :src="this.iframeSrcZH"
                      width="100%"
                      height="100%"
                      frameborder="no"
                      border="0"
                      marginwidth="0"
                      marginheight="0"
                      scrolling="no"
                      class="test"
                      v-if="zongHeFenXi === true"></iframe>

              <iframe :src="this.iframeSrcLG"
                      width="100%"
                      height="100%"
                      frameborder="no"
                      border="0"
                      marginwidth="0"
                      marginheight="0"
                      scrolling="no"
                      class="test"
                      v-if="secondcollide === true"></iframe>
            </el-tab-pane>
            <el-tab-pane name="fivth">
              <div slot="label">
                <div v-if="activeTab5"
                     class="active tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list8"
                         alt />
                    <div class="tabsTitle">统计数据</div>
                  </div>
                </div>
                <div v-else
                     class="tabs">
                  <div style="text-align:center">
                    <img class="tabsImg"
                         :src="list88"
                         alt />
                    <div class="tabsTitle">统计数据</div>
                  </div>
                </div>
              </div>
              <statisticalData @open="open"
                               @isNature="isNature"
                               @society="society"></statisticalData>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'
import qs from 'qs'
import Bus from '@/utils/bus'
import controllerResource from './controller/controllerResource'
import firstResource from './controller/firstResource'
import controllerResourceCommon from './controller/controllerResourceCommon'
import buffer from './controller/buffer'
import superposition from './controller/superposition'
import present from './controller/present'
import planning from './controller/planning'
import mine from './controller/mine'
import constructed from './controller/constructed'
import disaster from './controller/disaster'
import disasterarea from './controller/disasterarea'
import secondcollide from './controller/secondcollide'
import nowcollide from './controller/nowcollide'
import multipleTable from './controller/multipleTable'
import presentTable from './controller/presentTable'
import UploadWidget from './toolbarItem/upload/widget'
import commonecharts from '../onemap/topic/commonecharts.js'
import { config } from './analyst.conf'
import { analysisConfig } from './service.conf'

import ResourceDirectory from './controller/ResourceDirectory'
import { RESOURCE_DATA, ZHUANTI_DATA } from './controller-mock'
import Terraformer from 'terraformer-arcgis-parser'
import shp from 'shpjs'
import { loadModules } from 'esri-loader'
import StatisticalData from './controller/StatisticalData'
export default {
  inject: ['mapAppId'],

  data () {
    return {
      clicknodeObj: [],
      fivth5: '',
      commonServiceModels: [],
      arr: [],
      current: 1,
      resourceData: null,
      zhuanTiData: null,
      areaRes: null,
      mapApp: null,
      isRightClick: false,
      rightSelectNode: null,
      xiugaiDialog: false,
      queryResult: [],
      analystResult: [],
      constructor: null,
      enterFilterData: {
        name: '',
        rename: ''
      },

      nodeKey: 'myId',
      xinzengDialog: false,
      defaultProps: {
        children: 'childs',
        label: 'name',
        isLeaf: 'isLeaf'
      },

      defaultProps2: {
        children: 'childList',
        label: 'name',
        isLeaf: 'isLeaf'
      },
      defaultProps3: {
        children: 'childs',
        label: 'zhCn',
        isLeaf: 'isLeaf'
      },
      defaultProps4: {
        children: 'children',
        label: 'label',
        isLeaf: 'isLeaf'
      },
      defaultProps5: {
        children: 'childList',
        label: 'name',
        isLeaf: 'isLeaf'
      },
      defaultProps6: {
        children: 'childList',
        label: 'name',
        isLeaf: 'isLeaf'
      },
      activeAddId: '',
      addArray: [],
      defaultArray1: [],
      defaultArray2: [],
      defaultArray5: [],
      defaultArray6: [],
      obj: {},
      menu: [],
      menu2: [],
      menu3: [],
      property: [{ name: '请选择图层', label: '请选择图层' }],

      years: [
        // { name: "最新", id: "最新" },
        { name: '2018', id: '2018' },
        { name: '2017', id: '2017' },
        { name: '2016', id: '2016' },
        { name: '2015', id: '2015' },
        { name: '2014', id: '2014' },
        { name: '2013', id: '2013' },
        { name: '2012', id: '2012' },
        { name: '2011', yearsid: '2011' },
        { name: '2010', id: '2010' },
        { name: '2009', id: '2009' }
      ],
      smallerMeter: [
        { name: '300m', id: '300' },
        { name: '500m', id: '500' },
        { name: '800m', id: '800' }
      ],
      longerMeter: [
        { name: '500m', id: '500' },
        { name: '1000m', id: '1000' },
        { name: '1500m', id: '1500' },
        { name: '2000m', id: '2000' }
      ],
      treeData: [],
      xinzengDialog: false,
      data: [],
      data2: [
        {
          id: '0',
          name: '收藏',
          leverl: '0',
          childList: []
        },
        {
          id: '2',
          name: '收藏专题',
          leverl: '0',
          childList: []
        },
        {
          id: '3',
          name: '文件',
          leverl: '0',
          childList: []
        },
        {
          id: '4',
          name: '标记',
          leverl: '0',
          childList: []
        },
        {
          id: '5',
          leverl: '0',
          name: '历史分析结果',
          childList: []
        }
      ],
      data3: [],
      data4: [
        {
          id: 1,
          label: '通用分析',
          leverl: '0',
          children: [
            {
              id: 11,
              label: '叠加分析',
              isLeaf: true
            },
            {
              id: 12,
              label: '缓冲分析',
              isLeaf: true
            },
            {
              id: 13,
              label: '统计分析',
              isLeaf: true
            }
          ]
        },
        {
          id: 2,
          label: '业务分析',
          leverl: '0',
          children: [
            {
              id: 21,
              label: '现状数据分析',
              isLeaf: true
            },
            {
              id: 22,
              label: '规划数据分析',
              isLeaf: true
            },
            {
              id: 23,
              label: '矿产分析',
              isLeaf: true
            },
            {
              id: 24,
              label: '压覆矿分析',
              isLeaf: true
            },
            {
              id: 25,
              label: '地质灾害点分析',
              isLeaf: true
            },
            {
              id: 26,
              label: '地质灾害易发区分析',
              isLeaf: true
            },
            {
              id: 27,
              label: '两规冲突检测分析',
              isLeaf: true
            },
            {
              id: 28,
              label: '规划现状冲突分析',
              isLeaf: true
            }
          ]
        }
      ],
      data5: [
        {
          id: '0',
          name: '收藏',
          leverl: '0',
          childList: []
        }
      ],

      isOtherTitle: false,
      defaultProps1: {},
      transType: [{ label: '相交', value: '相交' }],
      dicRequest: ['administrative_regions'], // 字典码请求
      dictionary: {
        // 字典码结果
        administrative_regions: '',
        cantonCity: '',
        cantonArea: ''
      },
      entering: false,
      complete: true,
      fenxiResult: false,
      openOrClose: require('@/assets/shangla.png'),
      checked: false,
      searchLogo: require('@/assets/searchLogo.png'),
      dicRequest: ['administrative_regions'], // 字典码请求
      dictionary: {
        // 字典码结果
        administrative_regions: '',
        cantonCity: '',
        cantonArea: ''
      },
      common: true,
      title: '资源目录',
      list: require('@/assets/list1.png'),
      list1: require('@/assets/list11.png'),
      list2: require('@/assets/list2.png'),
      list22: require('@/assets/list22.png'),
      list3: require('@/assets/list3.png'),
      list33: require('@/assets/list33.png'),
      list4: require('@/assets/list44.png'),
      list44: require('@/assets/list4.png'),
      list5: require('@/assets/list5.png'),
      list55: require('@/assets/list55.png'),
      list6: require('@/assets/list6.png'),
      list7: require('@/assets/list7.png'),
      list8: require('@/assets/list8.png'),
      list88: require('@/assets/list88.png'),
      shangla: require('@/assets/shangla.png'),
      xiala: require('@/assets/xiala.png'),
      liubianxing: require('@/assets/check.png'),
      wenjian: require('@/assets/wenjian1.png'),
      right: require('@/assets/right.png'),
      pageNo: 1, // 当前页
      pageSize: 5, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数，

      searchListPageNo: 1,
      searchListPageSize: 7,
      searchTotalPage: 1,
      searchTotalRecord: 1,
      filterData: {
        cantonProvinceName: '',
        cantonProvince: '',
        cantonCityName: '',
        cantonCity: '',
        cantonAreaName: '',
        cantonArea: '',
        server: '',
        picture: '',
        type: '相交'
      },
      loading: false,
      activeTab1: true,
      activeTab2: false,
      activeTab3: false,
      activeTab4: false,
      activeTab5: false,
      dicNum: 0,
      params: {
        type: ''
      },
      parentDataId: '',
      search: false,
      home: true,
      countHome: true, // 统计分析主页
      superpositionPage: false,
      situation: false,
      disasterPoint: false,
      disasterPlace: false, // 叠加分析
      bufferPage: false,
      yearsSituation: false, // 缓冲分析
      area: false, // 行政区域
      present: false,
      liangGui: false,
      superpositionDialog: false,
      bufferDialog: false,
      presentDialog: false,
      planningDialog: false,
      mineDialog: false,
      constructedDialog: false,
      disasterDialog: false,
      disasterareaDialog: false,
      secondcollideDialog: false,
      nowcollideDialog: false,
      tabIndex: 0,
      superpositionData: [],
      bufferData: [],
      presentData: [],
      planningData: [],
      zhuanti: false,
      mineData: [],
      constructedData: [],
      disasterData: [],
      disasterareaData: [],
      secondcollideData: [],
      nowcollideData: [],
      lowerTreeData: {
        id: ''
      },
      activeName: 'first',
      show4: true,
      checkList: [],
      fenxiText: '',
      searchListData1: [],
      GisPicture: {},
      copy: {},
      planning: false,
      conflict: false,
      mine: false,
      constructed: false,
      disaster: false,
      disasterarea: false,
      secondcollide: false,
      nowcollide: false,
      zongHeFenXi: false,
      isIframe: 10,
      iframeSrcZH: 'http://172.16.8.107/#/synthesize',
      iframeSrcLG: 'http://172.16.8.107/#/conflict',
      serverWX: '',
      leftTabIndex: '',
      topSearchValue: '',
      checkedCities: ['土地利用总体规划'],
      cityOptions: [
        '土地利用总体规划',
        '城市利用总体规划',
        '生态环境保护规划',
        '水资源保护规划'
      ],
      show: true,
      tabPosition: 'left',

      primaryOrPlain: 'primary',
      arr: [],
      topicContentsId: '',
      expandedNode: {},
      expandedData: [],
      menuVisible: false,
      rightObject: {},
      rightNode: {},
      rightParentObject: {},
      isShow: false,
      obj: {},
      node1: {},
      resolve1: null,
      node2: {},
      resolve2: null,
      data2Child1: [],
      data2Child2: [],
      data2Child3: [],
      data2Child4: [],
      data3Child: [],
      dictionary1: {
        serverData: [],
        pictureData: []
      },
      layerIdUrl: null,
      selectedLayer: null,
      layerOutFieldsAlias: null,
      layerFieldsToDelete: ['SHAPE', 'SHAPE.AREA', 'SHAPE.LEN', 'ORIGFID'],
      layerFieldsToShow: [],
      tableLoading: true,
      analystYear: 2018,
      analystSmallerMetter: '300m',
      analystLongerMetter: '500m',
      checkedAnalystService: [],
      analystServiceOptions: [
        {
          name: 'GTKJZTGH',
          label: '国土空间总体规划',
          status: false
        },
        {
          name: 'GTKJCZGH',
          label: '国土空间村庄规划',
          status: false
        },
        {
          name: 'GTKJKZXXXGH',
          label: '国土空间控制性详细规划',
          status: false
        },
        {
          name: 'SYKJ',
          label: '剩余空间',
          status: true
        },
        {
          name: 'present',
          label: '土地利用现状',
          status: true
        },
        {
          name: 'YJJBNT',
          label: '永久基本农田',
          status: true
        },
        {
          name: 'CZKFBJ',
          label: '城镇开发边界',
          status: false
        },
        {
          name: 'STBHHX',
          label: '生态保护红线',
          status: true
        },
        {
          name: 'QMDLTB',
          label: '期末地类图斑',
          status: false
        },
        {
          name: 'JSYDGZQ',
          label: '建设用地管制区',
          status: false
        },
        {
          name: 'TDYTFQ',
          label: '土地用途分区',
          status: false
        },
        {
          name: 'GHFKQ',
          label: '规划复垦区',
          status: false
        },
        {
          name: 'CSGHYDBJ',
          label: '城市规划用地布局',
          status: false
        },
        {
          name: 'YDHX',
          label: '用地红线',
          status: true
        },
        {
          name: 'ZXCQ',
          label: '中心城区范围',
          status: true
        },
        {
          name: 'YQFW',
          label: '园区范围',
          status: true
        },
        {
          name: 'CSZTGH',
          label: '城市总体规划',
          status: true
        },
        {
          name: 'GBZNTFX',
          label: '高标准农田范围',
          status: true
        },
        {
          name: 'CSZBYJJBNTFX',
          label: '城市周边永久基本农田',
          status: true
        }
      ],
      typeAlias: null,
      isMTableShow: false,
      isPTableShow: false,
      multiResult: [],
      analystYearList: [],

      coverageData: '矿产分布类图层',
      scopeData: '300米',
      scopeDataId: '300',
      scopeList: [
        {
          value: '300',
          label: '300米'
        },
        {
          value: '500',
          label: '500米'
        },
        {
          value: '800',
          label: '800米'
        },
        {
          value: '1000',
          label: '1000米'
        }
      ],
      scopeDisData: '',
      scopeDisDataId: '',
      scopeBufferGeometry: {},
      isImport: false,
      inputScopeDis: '',
      scopeDisList: [
        {
          value: '500',
          label: '500米'
        },
        {
          value: '1000',
          label: '1000米'
        },
        {
          value: '1500',
          label: '1500米'
        },
        {
          value: '2000',
          label: '2000米'
        },
        {
          value: 'zidingyi',
          label: '自定义输入'
        }
      ],
      disasterLayer: {},
      distance: '',
      disasterResult: '',

      iframeSrcZH: ''
    }
  },
  provide () {
    return {
      rightSelectNode: this.rightSelectNode
    }
  },
  components: {
    controllerResource,
    controllerResourceCommon,
    firstResource,
    superposition,
    buffer,
    present,
    planning,
    mine,
    constructed,
    disaster,
    disasterarea,
    secondcollide,
    nowcollide,
    multipleTable,
    presentTable,
    UploadWidget,
    StatisticalData,

    ResourceDirectory
  },
  methods: {
    ...mapMutations('onemap', ['SET_Search']),
    open (item) {
      this.$emit('show', item)
    },
    society (item) {
      this.$emit('societyMsg', item)
    },
    isNature (val) {
      this.$emit('isNatureMsg', val)
    },
    changeShp (file) {
      let me = this
      let parent = this.$parent
      let reader = new FileReader()
      reader.readAsArrayBuffer(file.raw)
      reader.onload = e => {
        shp(e.target.result).then(function (geojson) {
          parent.mapApp.polySymbol.color = [255, 255, 255, 0]
          parent.mapApp.parseJsonLayer(geojson, Terraformer)
          let extent = parent.mapApp.view.extent.clone()
          geojson.features.forEach(element => {
            if (element.geometry.type === 'Polygon') {
              extent.xmin = element.geometry.bbox[0]
              extent.ymin = element.geometry.bbox[1]
              extent.xmax = element.geometry.bbox[2]
              extent.ymax = element.geometry.bbox[3]
              me.scopeBufferGeometry = element.geometry

              return
            }
          })
          parent.mapApp.view.goTo(extent, {
            duration: 3000
          })
        })
      }
    },
    turnTuCeng () {
      this.current = 1
    },
    turnZhuanTi () {
      this.current = 2
    },
    turnMuLu () {
      this.current = 3
    },
    clearCheckbox (e) {
      if (this.current === 1) {
        this.$refs.commonLayerTree.$refs.tree.setCheckedKeys([])
      } else if (this.current === 2) {
        for (let i = 0; i < this.commonServiceModels.length; i++) {
          this.commonServiceModels[i].checked = false
        }
      } else if (this.current === 3) {
        this.$refs.detailCatalog.$refs.tree.setCheckedKeys([])
      }
    },
    // 压覆矿
    toConstructed () {
      this.countHome = false
      this.nowcollide = false
      this.superpositionPage = false
      this.secondcollide = false
      this.disaster = false
      this.disasterarea = false
      this.bufferPage = false
      this.yearsSituation = false
      this.constructed = true
      this.planning = false
      this.present = false
      // 面包屑
      this.isOtherTitle = true
      this.fenxiResult = true
      this.fenxiText = '压覆矿分析'
      this.push('constructed')
      // 重置表单
      for (var key in this.filterData) {
        this.filterData[key] = ''
      }
      this.filterData.type = '相交'
    },
    // 两规冲突分析
    toSecondCollide () {
      this.countHome = true
      this.nowcollide = false
      this.disaster = false
      this.disasterarea = false
      this.bufferPage = false
      this.constructed = false
      this.superpositionPage = false
      this.secondcollide = true
      this.planning = false
      this.yearsSituation = false
      this.present = false
      this.zongHeFenXi = false
      this.isIframe = 11
      this.$emit('isIframe', 11)
      // 面包屑
      // this.isOtherTitle = true
      // this.fenxiResult = true
      // this.fenxiText = '两规冲突检测分析'
      // this.push('secondcollide')

      this.serverWX = JSON.stringify(this.dictionary1.serverData)
      this.iframeSrcLG
        = 'http://172.16.8.107/#/conflict?serverData=' + this.serverWX
      // // 重置表单
      // for (var key in this.filterData) {
      //   this.filterData[key] = ''
      // }
      // this.filterData.type = '相交'
    },
    // 规划现状分析
    toNowCollide () {
      this.countHome = false
      this.nowcollide = true
      this.disaster = false
      this.disasterarea = false
      this.bufferPage = false
      this.constructed = false
      this.superpositionPage = false
      this.planning = false
      this.secondcollide = false
      this.yearsSituation = false
      this.present = false
      // 面包屑
      this.isOtherTitle = true
      this.fenxiResult = true
      this.fenxiText = '规划现状冲突分析'
      this.push('nowcollide')
      // 重置表单
      for (var key in this.filterData) {
        this.filterData[key] = ''
      }
      this.filterData.type = '相交'
    },
    // 规划符合性
    toYearsSituation () {
      this.countHome = false
      this.nowcollide = false
      this.disaster = false
      this.disasterarea = false
      this.bufferPage = false
      this.constructed = false
      this.superpositionPage = false
      this.planning = true
      this.secondcollide = false
      this.yearsSituation = false
      this.present = false
      // 面包屑
      this.isOtherTitle = true
      this.fenxiResult = true
      this.fenxiText = '规划符合性分析'
      this.push('planning')
      // 重置表单
      for (var key in this.filterData) {
        this.filterData[key] = ''
      }
      this.filterData.type = '相交'
    },
    // 地质灾害易发区
    toDisasterArea () {
      this.countHome = false
      this.nowcollide = false
      this.disaster = false
      this.disasterarea = true
      this.bufferPage = false
      this.constructed = false
      this.superpositionPage = false
      this.planning = false
      this.secondcollide = false
      this.yearsSituation = false
      this.present = false
      // 面包屑
      this.isOtherTitle = true
      this.fenxiResult = true
      this.fenxiText = '地质灾害易发区分析'
      this.push('disasterarea')
      // 重置表单
      for (var key in this.filterData) {
        this.filterData[key] = ''
      }
      this.filterData.type = '相交'
    },

    searchBtn (key, key2) {
      this.current = key
      this.params.type = key2
      this.searchListPageNo = 1
      this.getSearchListData()
    },
    // 综合分析
    toZongHeFenXi () {
      this.countHome = true
      this.nowcollide = false
      this.disaster = false
      this.disasterarea = false
      this.bufferPage = false
      this.constructed = false
      this.superpositionPage = false
      this.planning = false
      this.secondcollide = false
      this.yearsSituation = false
      this.present = false
      this.zongHeFenXi = true
      this.isIframe = 11
      this.$emit('isIframe', 11)
      // 面包屑
      // this.isOtherTitle = true
      // this.fenxiResult = true
      // this.fenxiText = '综合分析'
      // this.push('zongHeFenXi')

      this.serverWX = JSON.stringify(this.dictionary1.serverData)
      this.iframeSrcZH
        = 'http://172.16.8.107/#/synthesize?serverData=' + this.serverWX
    },
    // 地质灾害点
    toDisaster () {
      this.countHome = false
      this.nowcollide = false
      this.disaster = true
      this.disasterarea = false
      this.bufferPage = false
      this.constructed = false
      this.superpositionPage = false
      this.planning = false
      this.secondcollide = false
      this.yearsSituation = false
      this.present = false
      // 面包屑
      this.isOtherTitle = true
      this.fenxiResult = true
      this.fenxiText = '地质灾害点分析'
      this.push('disaster')
      // 重置表单
      for (var key in this.filterData) {
        this.filterData[key] = ''
      }
      this.filterData.type = '相交'
      this.scopeDisDataId = ''
    },
    // 历年现状
    toPlan () {
      this.countHome = false
      this.nowcollide = false
      this.disaster = false
      this.disasterarea = false
      this.bufferPage = false
      this.constructed = false
      this.superpositionPage = false
      this.planning = false
      this.secondcollide = false
      this.yearsSituation = false
      this.present = true
      // 面包屑
      this.isOtherTitle = true
      this.fenxiResult = true
      this.fenxiText = '历年现状分析'
      this.push('present')
      // 重置表单
      for (var key in this.filterData) {
        this.filterData[key] = ''
      }
      this.filterData.type = '相交'
    },
    // 叠加分析
    toSuperpositionPage () {
      this.countHome = false
      this.nowcollide = false
      this.disaster = false
      this.disasterarea = false
      this.bufferPage = false
      this.constructed = false
      this.superpositionPage = true
      this.planning = false
      this.secondcollide = false
      this.yearsSituation = false
      this.present = false
      // 面包屑
      this.isOtherTitle = true
      this.fenxiResult = true
      this.fenxiText = '叠加分析'
      this.push('superpositionPage')
      // 重置表单
      for (var key in this.filterData) {
        this.filterData[key] = ''
      }
      this.filterData.type = '相交'
    },
    // 缓冲分析
    toBufferPages () {
      this.countHome = false
      this.nowcollide = false
      this.disaster = false
      this.disasterarea = false
      this.bufferPage = true
      this.constructed = false
      this.superpositionPage = false
      this.planning = false
      this.secondcollide = false
      this.yearsSituation = false
      this.present = false
      // 面包屑
      this.isOtherTitle = true
      this.fenxiResult = true
      this.fenxiText = '缓冲分析'
      this.push('bufferPage')
      // 重置表单
      for (var key in this.filterData) {
        this.filterData[key] = ''
      }
      this.filterData.type = '相交'
    },
    ...mapMutations('oneMap', ['getTreeData']),
    // 第一颗目录树

    loadNode1 (node, resolve) {
      this.node1 = node
      this.resolve1 = resolve
      // console.log(node);
      if (node.level === 0) {
        return resolve(node.data)
      }
      this.$post('/epf-onemap/admin/mapdiretree/getServicesByDireId', {
        id: this.node1.data.id
      }).then(res => {
        if (res.code === 0) {
          if (res.result.length === 0) {
            if (this.node1.data.childs.length) {
              return resolve(this.node1.data.childs)
            }
            return resolve(this.node1.data)
          }
          res.result = JSON.parse(
            JSON.stringify(res.result).replace(/serviceName/g, 'name')
          )
          res.result.forEach(item => (item['isLeaf'] = true))

          this.expandedData = this.node1.data.childs.concat(res.result)
          return resolve(this.expandedData)

          // this.node1.data.childs = this.node1.data.childs.concat(res.result);
          // return resolve(this.node1.data.childs);
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    getTreeAdmin () {
      this.$post('/epf-onemap/admin/mapdiretree/getResourceDir', {}).then(
        res => {
          if (res.code == '0') {
            if (res.result.length > 0) {
              this.treeData = res.result[0].childs
              // this.$set(this.defaultArray1, 0, this.lowerTreeData.id);
            }
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    closeDialog (isShow) {
      this[isShow] = false
      if (this.mapApp && this.geoJSONLayer) {
        this.mapApp.map.remove(this.geoJSONLayer)
        this.geoJSONLayer = null
      }

      this.constructedDialog = isShow
      this.disasterDialog = isShow
      this.disasterareaDialog = isShow
      this.secondcollideDialog = isShow
      this.nowcollideDialog = isShow
    },
    // 第二棵目录树
    getNode2 (node) {
      this.data2Node1 = node
    },
    async getData2 () {
      const res = await axios.post(
        '/api/epf-onemap/admin/mapworkbenchcontents/getList',
        qs.stringify({
          workbenchType: 'workbench_type-002',
          parentId: '0'
        })
      )
      if (res.code !== 0) {
        this.$message.error(res.msg)
      }
      const list = res.result
      list.unshift({
        id: '11',
        name: '新增',
        isLeaf: true
      })
      const resServer = await axios.post(
        '/api/epf-onemap/admin/mapservicescollect/collectServiceList',
        qs.stringify({
          topicContentsId: '0'
        })
      )

      if (resServer.code !== 0) {
        this.$message.error(res.msg)
      }

      resServer.result = JSON.parse(
        JSON.stringify(resServer.result).replace(/serviceName/g, 'name')
      )
      resServer.result.forEach(item => (item.isLeaf = true))
      const serverList = resServer.result

      this.data2Child1 = list.concat(serverList)
    },
    async loadNode2 (node, resolve) {
      this.resolve2 = resolve
      this.node2 = node

      if (node.level === 0) {
        return this.resolve2(this.data2)
      }

      if (node.data.name === '收藏') {
        return this.resolve2(this.data2Child1)
      }
      if (node.data.workbenchType) {
        const resServer = await axios.post(
          '/api/epf-onemap/admin/mapservicescollect/collectServiceList',
          qs.stringify({
            topicContentsId: node.data.id
          })
        )

        if (resServer.code !== 0) {
          this.$message.error(res.msg)
        }

        resServer.result = JSON.parse(
          JSON.stringify(resServer.result).replace(/serviceName/g, 'name')
        )

        resServer.result.forEach(item => (item.isLeaf = true))
        const serverList = resServer.result
        let newArr = node.data.childList.concat(serverList)
        if (newArr.length) {
          return this.resolve2(newArr)
        }
        return this.resolve2()
      }
      if (node.data.name === '收藏专题') {
        return this.resolve2(this.data2Child2)
      }
      if (node.data.name === '文件') {
        return this.resolve2(this.data2Child3)
      }

      if (node.data.name === '标记') {
        return this.resolve2(this.data2Child4)
      }

      if (node.data.childList.length) {
      }
      return this.resolve2()
    },
    async getData5AndData6 () {
      const res = await axios.post(
        '/api/epf-onemap/admin/mapworkbenchcontents/getList',
        qs.stringify({
          workbenchType: 'workbench_type-002',
          parentId: '0'
        })
      )
      if (res.code !== 0) {
        this.$message.error(res.msg)
      }
      this.data5[0].childList = res.result
    },
    rightClick1 (MouseEvent, object, node, element) {
      this.common = true
      this.isRightClick = true
      this.menu = []
      this.rightObject = object
      if (this.rightObject.hasOwnProperty('collectStatus')) {
        let myLabel = this.rightObject.collectStatus == 0 ? '收藏' : '取消收藏'
        this.menu = [
          { label: myLabel, type: '1' },
          { label: '透明度', type: 'opcaity' },
          { label: '查看详情', type: '3' }
        ]
      }
      // this.treeChangeClick(object, true)
      // this.$store.dispatch(
      //   'onemap/setRightSelectLayerId',
      //   object.id || object.name
      // )
    },
    rightClick2 (MouseEvent, object, node, element) {
      this.rightNode = node;
      (this.menu2 = []), (this.rightObject = object)
      if (this.rightObject.hasOwnProperty('collectStatus')) {
        let myLabel = this.rightObject.collectStatus == 0 ? '收藏' : '取消收藏'
        this.menu2 = [{ label: '取消收藏', type: '1' }]
      }

      if (this.rightObject.hasOwnProperty('workbenchType')) {
        this.menu2 = [
          { label: '重命名', type: '2' },
          { label: '删除', type: '3' }
        ]
      }

      if (this.rightObject.hasOwnProperty('documentId')) {
        this.menu2 = [
          // { label: '在线定位', type: '4' },
          { label: '下载文件', type: '5' },
          { label: '删除文件', type: '6' }
        ]
      }
    },
    rightClick3 (MouseEvent, object, node, element) {
      (this.menu3 = []), (this.rightObject = object)
      this.rightNode = node
      if (this.rightObject.hasOwnProperty('topicTemplateId')) {
        let myLabel = this.rightObject.isShow == 0 ? '共享' : '取消共享'
        this.menu3 = [
          { label: myLabel, type: '1' },
          { label: '置顶', type: '2' }
        ]
      }
    },

    xinzengwenjianjia () {
      if (!this.activeAddId) {
        this.$message({
          showClose: true,
          message: '请先选择文件(夹)挂载节点。',
          type: 'warning'
        })
        return
      }

      console.log(this.activeAddId)
      const myId = this.genID()

      this.$set(this.defaultArray5, 0, myId)
      const parentData = this.getChidlren(this.data5, this.activeAddId)
      let axiosData = {
        myId: myId,
        parentId: this.activeAddId,
        workbenchType: 'workbench_type-002',
        name: '',
        orderNum: 0,
        add: true,
        childList: [],
        onlyList: true
      }
      parentData.childList.push(axiosData)
      this.addArray.push(axiosData)
    },
    async axiosAdd (params) {
      const res = await axios.post(
        '/api/epf-onemap/admin/mapworkbenchcontents/save',
        qs.stringify(params)
      )
      if (res.code == '0') {
        this.getData2()
        this.$message.success('添加成功')
      }
    },
    baocun () {
      if (
        this.enterFilterData.name.length === 0
        && this.enterFilterData.rename.length === 0
      ) {
        this.$message({ message: '请先输入文件夹名称。', type: 'warning' })
        return
      }
      this.xinzengDialog = false
      for (let i = 0; i < this.addArray.length; i++) {
        this.axiosAdd(this.addArray[i])
      }
    },
    xiugaibaocun () {
      this.xiugaiDialog = false
    },
    dropDownClick2 (type) {
      this.menuVisible = false
      switch (type) {
        case '1':
          this.collect(
            '/epf-onemap/admin/mapservicescollect/cancelCollect',
            this.rightObject.id,
            this.rightObject
          )
          break
        case '2':
          this.enterFilterData.rename = this.rightObject.name
          this.$set(this.rightObject, 'add', true)
          break
        case '3':
          this.$post('/epf-onemap/admin/mapworkbenchcontents/delete', {
            id: this.rightObject.id
          }).then(res => {
            if (res.code == '0') {
              this.$message.success('删除成功')
              this.getData2()
            } else {
              this.$message.error(res.msg) // 失败
              return
            }
          })
          break

        case '4':
          break
        // 定位
        case '5':
          // 下载
          this.documentDownload(this.rightObject.documentId)
          break
        case '6':
          // 删除
          this.documentDelete(this.rightObject.id)
          this.mypapers()
          break
      }
    },

    dropDownClick3 (type) {
      this.menuVisible = false
      let isShow = this.rightObject.isShow == 0 ? '0' : '1'
      switch (type) {
        case '1':
          this.$post('/epf-onemap/maptopic/setMapTopicIsShow', {
            id: this.rightObject.id,
            isShow: isShow
          }).then(res => {
            if (res.code == '0') {
              this.rightObject.isShow
                = this.rightObject.isShow == 0 ? '1' : '0'
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg) // 失败
              return
            }
          })
          break
        case '2':
          let loadingData = this.rightNode.parent.childNodes
          let index = loadingData.findIndex(
            item => item.data.id === this.rightObject.id
          )
          let indexData = loadingData[index]
          loadingData.splice(index, 1)
          loadingData.unshift(indexData)
          this.data3Child = loadingData

          break
        case '3':
          break
      }
    },
    closeslider (bol) {
      this.common = true
    },
    documentDelete (id) {
      this.$post('/epf-onemap/admin/mapgeodoucment/deleteById', {
        id: id
      }).then(res => {
        if (res.code == '0') {
          this.$message.success(res.msg) // 失败
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    documentDownload (id) {
      window.open('/api/epf-document/document/downloadById?id=' + id)
    },
    // ���三课目录树

    loadNode3 (node, resolve) {
      if (node.level === 0) {
        return resolve(this.data3)
      }
      let filters = JSON.stringify({ isShow: 0, contentsType: node.data.enUs })
      let searchInfo = {}
      searchInfo['filterData'] = filters
      this.$post('/epf-onemap/maptopic/getMapTopicJson', searchInfo).then(
        res => {
          if (res.code != '0') {
            that.$message.error(res.msg) // 失败
            return
          }
          res.pager.results = JSON.parse(
            JSON.stringify(res.pager.results).replace(/name/g, 'zhCn')
          )
          res.pager.results.forEach(item => (item.isLeaf = true))
          this.data3Child = res.pager.results
          return resolve(this.data3Child)
        }
      )
    },

    loadNode4 (node, resolve) {
      if (node.level === 0) {
        return resolve(this.data4)
      }
      return resolve(node.data.children)
    },
    getPicture3 (obj) { },

    specialTopic3 () {
      this.$post('/epf-onemap/maptopic/getMapTopicContentsType', {
        falg: 0
      }).then(res => {
        // res 是返回结果

        if (res.code != 0) {
          this.$message.error(res.msg)
          return
        }
        this.data3 = res.ContentsTypeList
      })
    },

    handleClickTemplate () {
      let routerPath = 'templateHome'
      this.$router.push({ path: routerPath })
    },
    close (dialog) {
      this[dialog] = false
      this.pageSize = 1
      this.totalPage = 1
      this.totalRecord = 1
      this.pageNo = 1
    },
    dropDownClick1 (type, item) {
      switch (type) {
        case '1':
          if (item.collectStatus == 0) {
            this.xiugaiDialog = true
          } else {
            this.collect(
              '/epf-onemap/admin/mapservicescollect/cancelCollect',
              item.id,
              item
            )
          }

          break
        case 'opcaity':
          this.common = false
          break
        case '3':
          this.checkDetail(
            '/epf-onemap/admin/mapservices/getById',
            item.id,
            item
          )
          break
      }
    },

    collect (url, id, obj) {
      this.$post(url, {
        serviceId: id
      }).then(res => {
        if (res.code == '0') {
          this.getData2()
          obj.collectStatus = obj.collectStatus == 0 ? 1 : 0
          this.$message.success('操作成功')
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    checkDetail (url, id, obj) {
      this.$nextTick(
        (this.isShow = true),
        this.$get(url, {
          id: id
        }).then(res => {
          if (res.code === 0) {
            this.dataDetailMessage = res.services
            Bus.$emit('send', this.isShow)
            this.$set(this.isShow, 'send')
            Bus.$emit('sendDetail', this.dataDetailMessage)
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        })
      )
    },
    queryPage (type) {
      this.params.type = type
      this.getSearchListData()
    },
    radioChange3 (data) {
      this.$emit('radioChange', data)
    },
    tabClick (tab, event) {
      // 子菜单切换隐藏图层显示
      if (document.getElementById('layerlists').parentNode.clientWidth != 0) {
        this.$bus.$emit('basemapfalse', false)
        document.getElementById('layerlists').parentNode.style.display = 'none'
      }
      // 子菜单切换隐藏底图显示
      if (document.getElementById('basemaps').parentNode.clientWidth != 0) {
        this.$bus.$emit('layerlistfalse', false)
        document.getElementById('basemaps').parentNode.style.display = 'none'
      }
      this.show = true
      document.querySelector('.el-tabs__content').style.display = ''
      this.isIframe = 10
      this.$emit('isIframe', 10)
      this.property = []
      this.queryResult = []
      this.layerFieldsToShow = []
      this.menuVisible = false
      this.superpositionPage = false
      this.bufferPage = false
      this.present = false
      this.planning = false
      this.mine = false
      this.constructed = false
      this.disaster = false
      this.disasterarea = false
      this.secondcollide = false
      this.nowcollide = false
      this.countHome = true
      this.isOtherTitle = false
      this.fenxiResult = false

      if (tab.index == this.tabIndex) {
        return
      }
      this.tabIndex = tab.index
      if (this.tabIndex == 2) {
        this.zhuanti = true
      } else {
        this.zhuanti = false
      }
      if (this.tabIndex == 0) {
        this.title = '资源目录'
        this.activeTab2 = false
        this.activeTab3 = false
        this.activeTab4 = false
        this.activeTab5 = false
        this.activeTab1 = true
        this.countHome = false
        this.leftTabIndex = '1'
      } else if (this.tabIndex == 1) {
        this.title = '工作台'
        this.activeTab1 = false
        this.activeTab3 = false
        this.activeTab4 = false
        this.activeTab5 = false
        this.activeTab2 = true
        this.countHome = false
        this.leftTabIndex = '2'
        // this.getListAndPicture2("workbench_type-002", "0");
        this.collectionTopics()
        this.mypapers()
        this.tag()
      } else if (this.tabIndex == 2) {
        this.title = '我的专题'
        this.activeTab1 = false
        this.activeTab2 = false
        this.activeTab4 = false
        this.activeTab5 = false
        this.activeTab3 = true
        this.countHome = false
        this.leftTabIndex = '3'
      } else if (this.tabIndex == 3) {
        this.title = '统计分析'
        this.activeTab1 = false
        this.activeTab2 = false
        this.activeTab3 = false
        this.activeTab5 = false
        this.activeTab4 = true
        this.countHome = true
        this.leftTabIndex = '4'
      } else if (this.tabIndex == 4) {
        this.activeTab1 = false
        this.activeTab2 = false
        this.activeTab3 = false
        this.activeTab5 = true
        this.activeTab4 = false
        this.countHome = false
        this.leftTabIndex = '5'
      }
      // this.tableData1 = [];

      // this.stopFun().then(val => {
      //   //异步操作同步化
      //   this.requestFun();
      // });
    },
    treeClick3 (data, node, element) {
      if (!this.arr.includes(data.id)) {
        this.arr.push(data.id)
        this.specialTopicPicture(data)
      }

      this.menuVisible = false
    },
    // checkProjectMenu () {
    //   if (this.show) {
    //     document.querySelector('.el-tabs__content').style.display = 'none'
    //     document.querySelector('.newPage').style.width = 74 + 'px'
    //   } else {
    //     document.querySelector('.el-tabs__content').style.display = ''
    //     document.querySelector('.newPage').style.width = 394 + 'px'
    //   }
    //   this.show = !this.show
    //   this.$emit('filterInfo', this.isShow)
    // },
    searchList () {
      this.defaultArray1 = []

      this.primaryOrPlain = 'primary'
    },
    pushRouter (id, node) {
      if (node.childNodes.length !== 0) {
        return
      }

      this.isOtherTitle = true
      this.fenxiResult = true
      switch (id) {
        case 11:
          this.fenxiText = '叠加分析'
          this.push('superposition')
          break
        case 12:
          this.fenxiText = '缓冲分析'
          this.push('buffer')
          break
        case 13:
          this.fenxiText = '统计分析 '
          this.push('present')
          break
        case 21:
          this.fenxiText = '现状数据分析'
          this.push('present')
          break
        case 22:
          this.fenxiText = '规划数据分析'
          this.push('planning')
          break
        case 23:
          this.fenxiText = '矿产分析'
          this.push('mine')
          break
        case 24:
          this.fenxiText = '压覆矿分析'
          this.push('constructed')
          break
        case 25:
          this.fenxiText = '地质灾害点分析'
          this.push('disaster')
          break
        case 26:
          this.fenxiText = '地质灾害易发区分析'
          this.push('disasterarea')
          break
        case 27:
          this.fenxiText = '两规冲突检测分析'
          this.push('secondcollide')
          break
        case 28:
          this.fenxiText = '规划现状冲突分析'
          this.push('nowcollide')
          break
      }
    },
    getSearchListData () {
      let that = this
      let params = this.params
      params['key'] = this.searchParams
      params['page'] = this.searchListPageNo
      params['rows'] = this.searchListPageSize
      this.$get('/epf-search/es/homePage/queryPage', params).then(res => {
        if (res.code === 0) {
          let data = res.pager.results
          data.forEach((item, index) => {
            if (that.searchParams) {
              item['front'] = item.title.split(that.searchParams)[0]
              item['middle'] = that.searchParams
              item['back'] = item.title.split(that.searchParams)[1]
            } else {
              item['front'] = ''
              item['middle'] = ''
              item['back'] = item.title
            }
          })

          this.searchListData1 = data
          this.searchListPageNo = res.pager.pageNo
          this.searchListPageSize = res.pager.pageSize
          this.searchTotalPage = res.pager.totalPage
          this.searchTotalRecord = res.pager.totalRecord
        } else {
          this.loading = false
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    previous () {
      for (let item in this.params) {
        this.params[item] = ''
      }
      this.home = true
      this.search = false
    },
    workAdd () { },
    push (key) {
      if (key == 'superposition') {
        (this.countHome = false), (this.superpositionPage = true)
      }
      if (key == 'buffer') {
        (this.countHome = false), (this.bufferPage = true)
      }
      if (key == 'present') {
        (this.countHome = false), (this.present = true)
      }
      if (key == 'planning') {
        (this.countHome = false), (this.planning = true)
      }
      if (key == 'mine') {
        (this.countHome = false), (this.mine = true)
      }
      if (key == 'constructed') {
        (this.countHome = false), (this.constructed = true)
      }
      if (key == 'disaster') {
        (this.countHome = false), (this.disaster = true)
      }
      if (key == 'disasterarea') {
        (this.countHome = false), (this.disasterarea = true)
      }
      if (key == 'secondcollide') {
        (this.countHome = false), (this.secondcollide = true)
      }
      if (key == 'nowcollide') {
        (this.countHome = false), (this.nowcollide = true)
      }
    },
    goBack () {
      this.property = []
      this.checkList = []
      let mapApp = this.$findMapApp('mapapp0')
      mapApp.view.container.style = 'auto'
      if (mapApp.findLayerById('RGLayer')) {
        mapApp.removeLayerById('RGLayer')
      }
      if (mapApp.findLayerById('SGLayer')) {
        mapApp.removeLayerById('SGLayer')
      }
      if (mapApp.findLayerById('SGLayer2')) {
        let layer2 = mapApp.findLayerById('SGLayer2')
        layer2.graphics.removeAll()
        // mapApp.removeLayerById("SGLayer2");
      }
      if (mapApp.findLayerById('SGLayer1')) {
        let layer1 = mapApp.findLayerById('SGLayer1')
        layer1.graphics.removeAll()
        // mapApp.removeLayerById("SGLayer1");
      }
      mapApp.view.graphics.removeAll()
      this.fenxiResult = false
      this.isOtherTitle = false
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      if (!this.title === '统计分析') {
        return
      }

      if (this.fenxiText === '叠加分析') {
        (this.countHome = true), (this.superpositionPage = false)
      }
      if (this.fenxiText === '缓冲分析') {
        (this.countHome = true), (this.bufferPage = false)
      }
      if (this.fenxiText === '历年现状分析') {
        (this.countHome = true), (this.present = false)
      }
      if (this.fenxiText === '统计分析 ') {
        (this.countHome = true), (this.present = false)
      }
      if (this.fenxiText === '规划符合性分析') {
        (this.countHome = true), (this.planning = false)
      }
      if (this.fenxiText === '矿产分析') {
        (this.countHome = true), (this.mine = false)
      }
      if (this.fenxiText === '压覆矿分析') {
        (this.countHome = true), (this.constructed = false)
      }
      if (this.fenxiText === '地质灾害点分析') {
        (this.countHome = true), (this.disaster = false)
      }
      if (this.fenxiText === '地质灾害易发区分析') {
        (this.countHome = true), (this.disasterarea = false)
      }
      if (this.fenxiText === '两规冲突检测分析') {
        (this.countHome = true), (this.secondcollide = false)
      }
      if (this.fenxiText === '规划现状冲突分析') {
        (this.countHome = true), (this.nowcollide = false)
      }
    },
    xinzengClick (key) {
      if (key == 'open') {
        this.xinzengDialog = true
      }
      if (key == 'close') {
        this.xinzengDialog = false
      }
    },

    collectionLayer (obj) {
      this.$post('/epf-onemap/admin/maplayercollect/collectLayerList', {
        topicContentsId: obj.id
      }).then(res => {
        if (res.code == '0') {
          if (res.result.length == 0 || !res.result) {
            return
          }
          if (!obj.childList[0].hasOwnProperty('id')) {
            obj.childList = res.result
          } else {
            obj.childList = obj.childList.concat[res.result]
          }
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    // doQuery(options) {
    //   let root = this.$root.gisInstance;
    //   if (options.url.includes("YZFXService.asmx/")) {
    //     if (!this.mapApp) {
    //       this.mapApp = this.$root.gisInstance.findMapApp(this.mapAppId);
    //     }
    //     let opt = root.parseGHParams(options, this.mapApp.httpProxy);
    //     return opt;
    //     // return this.$geoPost(options.url, opt)
    //   }
    //   return root.startAnalyst(options);
    // },
    doQuery (options) {
      if (options.url.includes('YZFXService.asmx/')) {
        if (!this.mapApp) {
          this.mapApp = this.$findMapApp(this.mapAppId)
        }
        let opt = this.$parent.parseGHParams(options, this.mapApp.httpProxy)
        return opt
        // return this.$geoPost(options.url, opt)
      }
      return this.$parent.startAnalyst(options)
    },
    async getAreaGraphic () {
      let graphic
      if (this.area && this.filterData.cantonCity) {
        let echarMap = commonecharts.getEcharMap(this.filterData.cantonCity)
        let data = await axios.get(echarMap)

        let rings = []
        data.features.forEach(e => {
          rings.push(e.geometry.coordinates[0][0])
        })
        let gisModules = await this.$loadGISModules([
          'esri/Graphic',
          'esri/geometry/Polygon'
        ])

        graphic = new gisModules.Graphic({
          geometry: new gisModules.Polygon({
            rings: rings
          })
        })
      }
      return graphic
    },
    async createGeoJSONLayer () {
      let origin = window.location.origin
      let hash = '/static/map/json/province/'
      let city = this.filterData.cantonCity + '.json'
      let url = origin + hash + city
      let gisModules = await this.$loadGISModules([
        'esri/layers/GeoJSONLayer',
        'esri/tasks/support/Query'
      ])
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }
      this.mapApp.map.remove(this.geoJSONLayer)
      this.geoJSONLayer = null

      this.geoJSONLayer = new gisModules.GeoJSONLayer({
        url: url,
        opacity: 0.8,
        listMode: 'hide',
        legendEnabled: false
      })

      this.mapApp.map.add(this.geoJSONLayer)
    },
    async start (key) {
      let layerId = this.dictionary1.pictureData[0].serviceId
      let mapAppId = 'mapapp0'
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }
      var res = this.mapApp.res[layerId]

      if (config.outFields) {
        config.outFields.forEach(field => {
          this.layerOutFieldsAlias.set(field.name, field.alias)
        })
      }

      this.queryResult = res
      this.layerFieldsToShow = this.checkList

      let graphic = await this.getAreaGraphic()

      if (key === 'superposition') {
        // 叠加分析 => 开始分析

        this.superpositionDialog = true
        let sq = this.mapApp.createSpatialQuery(
          this.mapApp,
          layerId,
          graphic.geometry
        )
        let me = this
        sq.queryFeatures()
          .then(res => {
            me.queryResult = res.features.reduce(
              (arr, cur) => arr.concat(cur.attributes),
              []
            )
            // eslint-disable-next-line handle-callback-err
          })
          .catch(err => {
            me.mapApp.map.remove(me.geoJSONLayer)
            this.geoJSONLayer = null
            console.error(err)
          })
      } else if (key == 'buffer') {
        // 缓冲分析 => 开始分析
        this.tableLoading = false
        this.bufferDialog = true
        if (this.area) {
          // this.queryResult = [];
          let sq = this.mapApp.createSpatialQuery(
            this.mapApp,
            layerId,
            graphic.geometry
          )
          let me = this
          sq.queryFeatures()
            .then(res => {
              me.queryResult = res.features.reduce(
                (arr, cur) => arr.concat(cur.attributes),
                []
              )
            })
            .catch(err => {
              me.mapApp.map.remove(me.geoJSONLayer)
              me.geoJSONLayer = null
              console.error(err)
            })
        }
      } else if (key == 'present') {
        // 现状数据分析 => 开始分析
        this.isPTableShow = true

        let analystConf = config.presentConf
        let url = analystConf.url

        let len = this.analystYearList.length
        this.analystResult = []
        this.multiResult = []
        var options, _year
        var promiseArr = []
        for (var i = 0; i < len; i++) {
          _year = parseInt(this.analystYearList[i]) || 1901
          options = {
            mapAppId: mapAppId,
            layerId: layerId,
            year: _year,
            url: url
          }
          this.multiResult.push({ name: _year })
          promiseArr.push(this.doQuery(options))
        }
        this.promiseAll(promiseArr)
      } else if (key == 'planning') {
        // 规划数据分析 => 开始分析
        // this.planningDialog = true;
        var year = parseInt(this.analystYearList[i]) || 1901
        this.isMTableShow = true

        this.analystResult = []
        this.multiResult = [{ name: '所有数据' }]
        var checkedAlias = this.analystServiceOptions.filter(item =>
          this.checkedAnalystService.includes(item.name)
        )
        for (let item of checkedAlias) {
          this.multiResult.push({ name: item.label })
        }
        let promiseArr = []
        let analystConf
        let options = {
          mapAppId: mapAppId,
          layerId: layerId,
          year: year,
          url: ''
        }

        // const param = this.$root.gisInstance.getRequestParam(mapAppId, layerId);
        // this.$geoPost("/geoapi/YZFXService.asmx/CSZBYJJBNTFX", param).then(
        //   res => {
        //     console.log(res);
        //   }
        // );
        // return;
        let len = this.checkedAnalystService.length
        for (var i = 0; i < len; i++) {
          let serviceId = this.checkedAnalystService[i]
          if (serviceId === 'GBZNTFX' || serviceId === 'CSZBYJJBNTFX') {
            analystConf = analysisConfig[serviceId + 'Config']
          } else {
            analystConf = config[serviceId + 'Conf']
          }
          options.url = analystConf.url
          promiseArr.push(this.doQuery(options))
        }
        if (analystConf.fields) {
          analystConf.fields.forEach(field => {
            this.layerOutFieldsAlias.set(field.name, field.alias)
          })
        }
        let self = this
        Promise.all(promiseArr)
          .then(results => {
            var data = []
            for (let result of results) {
              if (result.data.toLocaleString() === '[object XMLDocument]') {
                data = JSON.parse(result.data.documentElement.textContent)
                // if (Object.prototype.toString.call(result)=="[object String]") {
                //   data = JSON.parse(result)
                if (data.Message === 'success') {
                  data = self.parseYJJBNTFX(data)
                } else {
                  self.$message.error(data.Message + '请重试！')
                  self.isMTableShow = false
                }
              } else {
                data = self.parseResult(result.data.items)
              }
              self.analystResult = [...self.analystResult, ...data]
            }
            self.tableLoading = false
          })
          .catch(err => {
            self.$message.error('分析服务出错， 请重试') // 失败

            self.isMTableShow = false
            console.log(err)
          })
      }
    },
    jtstart (key) {
      if (key == 'constructed') {
        this.constructedDialog = true
        this.disasterDialog = false
        this.disasterareaDialog = false
        this.secondcollideDialog = false
        this.nowcollideDialog = false
        this.tableLoading = false
      } else if (key == 'disaster') {
        // 地质灾害点分析 => 开始分析
        if (
          this.filterData.server == ''
          || this.filterData.picture == ''
          || this.scopeDisData == ''
        ) {
          return
        }
        this.constructedDialog = false
        this.disasterDialog = true
        this.disasterareaDialog = false
        this.secondcollideDialog = false
        this.nowcollideDialog = false
        this.tableLoading = false

        this.disasterLayer['layerName'] = this.selectedLayer.layerName
        this.disasterLayer['layerNo'] = this.selectedLayer.id

        if (this.isImport == false) {
          this.distance = this.scopeDisDataId
        } else {
          this.distance = this.inputScopeDis
        }
        this.disasterResult = this.disasterLayer.layerName
      } else if (key == 'disasterarea') {
        this.constructedDialog = false
        this.disasterDialog = false
        this.disasterareaDialog = true
        this.secondcollideDialog = false
        this.nowcollideDialog = false
        this.tableLoading = false
      } else if (key == 'secondcollide') {
        this.constructedDialog = false
        this.disasterDialog = false
        this.disasterareaDialog = false
        this.secondcollideDialog = true
        this.nowcollideDialog = false
        this.tableLoading = false
      } else if (key == 'nowcollide') {
        this.constructedDialog = false
        this.disasterDialog = false
        this.disasterareaDialog = false
        this.secondcollideDialog = false
        this.nowcollideDialog = true
        this.tableLoading = false
      }
    },
    promiseAll (promiseArr) {
      let me = this
      Promise.all(promiseArr)
        .then(results => {
          me.tableLoading = false
          var data
          for (let result of results) {
            var year = result.requestOptions.body.year
            data = me.parseResult(result.data.items, year)
            me.analystResult = [...me.analystResult, ...data]
          }
        })
        .catch(err => {
          self.$message.error('分析服务出错， 请重试') // 失败
          me.isPTableShow = false
          console.log(err)
        })
    },
    getTypeAlias (aliasConf) {
      if (!this.typeAlias) {
        this.typeAlias = new Map()
      }
      aliasConf.forEach(field => {
        this.typeAlias.set(field.name, field.alias)
      })
    },
    parseYJJBNTFX (data) {
      if (!data) return []
      let res = data.AnalysisResults

      if (res == {} || res == null) return []
      return res.ResultRecords
    },
    parseResult (data, year) {
      if (!data) return []
      this.getTypeAlias(config.aliasConf)
      var result = []
      var type, name, code, ratio, area, typeAlias
      var index = -1
      for (let item of data) {
        if (item && item['FDK'] === 'a') {
          type = item['FLAYER']
          name = item['FDLMC']
          code = item['FDLBM']
          ratio = item['FBL']
          area = item['FMJ']
          index = result.findIndex(item => item.landuseName === name)
          typeAlias = this.typeAlias.get(type) || type
          if (index === -1) {
            result.push({
              landuseType: typeAlias,
              landuseName: name,
              landuseCode: code,
              landuseRatio: ratio,
              landuseArea: area,
              type: typeAlias,
              year: year
            })
          } else {
            result[index].landuseRatio += ratio
            result[index].landuseArea += area
          }
        }
      }
      for (let item of result) {
        item.landuseRatio *= 100
        item.landuseRatio = item.landuseRatio.toFixed(2) / 1
        if (item.landuseRatio == 0) {
          item.landuseRatio = 0.01
        }
        item.landuseArea /= 10000
        item.landuseArea = item.landuseArea.toFixed(4) / 1
        if (item.landuseArea == 0) {
          item.landuseArea = 0.0001
        }
      }
      return result
    },
    getLayerId (val) {
      this.property = []
      this.queryResult = []
      this.layerFieldsToShow = []
      this.selectedLayer = this.dictionary1.pictureData.find(item => {
        return item.layerName == val
      })
      let mapApp = this.$findMapApp('mapapp0')
      let layer = mapApp.findLayerById(this.selectedLayer.serviceId)
      if (!layer) return
      this.property = []
      this.layerOutFieldsAlias = new Map()
      if (!layer.fields) {
        let aq = mapApp.createAttributeQuery(
          mapApp,
          layer.id,
          mapApp.view.extent
        )
        let me = this
        aq._queryAttributes()
          .then(res => {
            res.fields.forEach(field => {
              me.layerOutFieldsAlias.set(field.name, field.alias)
            })
            res.fields.forEach(field => {
              if (me.layerFieldsToDelete.indexOf(field.name) === -1) {
                me.property.push({ name: field.name, label: field.alias })
              }
            })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        layer.fields.forEach(field => {
          this.layerOutFieldsAlias.set(field.name, field.alias)
        })
        layer.fields.forEach(field => {
          if (this.layerFieldsToDelete.indexOf(field.name) === -1) {
            this.property.push({ name: field.name, label: field.alias })
          }
        })
      }
    },
    getLayerUrl (val) {
      this.selectedLayer = this.dictionary1.pictureData.find(item => {
        return item.layerName == val
      })
    },
    btnClick (key) {
      if (key == 'area') {
        this.area = !this.area
      }
      if (key == 'coordinate') {
        this.area = false

        let widget = this.$refs.UploadWidget
        if (!widget.showPanel) {
          let el = widget.$el
          el.style.top = '0%'
          el.style.left = '100%'
        }
        widget.showPanel = !widget.showPanel
      }
      if (key == 'range') {
        // 绘制范围
        this.area = false
        this.$store.dispatch('onemap/setlayerId', this.selectedLayer.serviceId)
        this.$store.dispatch({
          type: 'onemap/setlayerId',
          layerId: this.selectedLayer.serviceId,
          drawType: 'rectangle',
          radius: 0
        })
      }
      if (key == 'selectFeature') {
        this.area = false

        this.$store.dispatch({
          type: 'onemap/setlayerId',
          layerId: this.selectedLayer.serviceId,
          drawType: 'buffer',
          radius: this.filterData.radius
        })
      }
      if (key == 'goTo') {
        this.property = []
      }
      if (key == 'goBack') {
        this.property = []
        let mapApp = this.$findMapApp('mapapp0')
        mapApp.view.container.style = 'auto'
        if (mapApp.findLayerById('RGLayer')) {
          mapApp.removeLayerById('RGLayer')
        }
        if (mapApp.findLayerById('SGLayer')) {
          mapApp.removeLayerById('SGLayer')
        }
        if (mapApp.findLayerById('SGLayer2')) {
          let layer2 = mapApp.findLayerById('SGLayer2')
          layer2.graphics.removeAll()
          mapApp.removeLayerById('SGLayer2')
        }
        if (mapApp.findLayerById('SGLayer1')) {
          let layer1 = mapApp.findLayerById('SGLayer1')
          layer1.graphics.removeAll()
          mapApp.removeLayerById('SGLayer1')
        }
        mapApp.view.graphics.removeAll()
        this.countHome = true
        this.superpositionPage = false
      }
    },
    bufferClick () {
      (this.bufferPage = false), (this.countHome = true)
    },
    treeClick1 (item, node) {
      this.clicknodeObj.push({ name: item.name, node: node })
    },
    treeChangeClick (obj, bol, have) {
      if (obj.url == '') return
      if (!obj) return
      const layerConf = {
        title: obj.name || '',
        url: obj.url || '',
        type: obj.serviceType || 'feature', // type: "feature",
        useProxy: obj.useProxy || false,
        id: obj.name,
        layer: obj.layer,
        style: obj.style,
        matrixid: obj.matrixid
      }

      const mapApp = this.$findMapApp(this.mapAppId)
      const layer = mapApp.findLayerById(layerConf.id)
      let me = this
      if (bol) {
        if (!layer) {
          this.$addLayerToMap({ mapApp: mapApp }, layerConf).then(lay => {
            var title = lay.title
            lay.watch('visible', function (evt) {
              me.clicknodeObj.forEach(item => {
                if (item.name == title) item.node.checked = evt
              })
            })
          })
          // mapApp.addLayerToMap(layerConf)
        }
        if (this.dictionary1.serverData.some(item => item.id === obj.id)) {
          return
        }
        this.dictionary1.serverData.push(obj)
      } else {
        this.$bus.$emit('layerLoading', false)
        this.dictionary1.serverData.forEach((item, index) => {
          if (item.id === obj.id) {
            this.dictionary1.serverData.splice(index, 1)
          }
        })
      }

      if (layer) {
        mapApp.setLayerVisiblity(layerConf.id, bol)
      }
    },
    treeChangeClick3 (obj, bol, have) { },
    enteringBlur (data) {
      data.add = false
      data.name = this.enterFilterData.name
    },

    handleCurrentChange () { },
    handleSizeChange () { },
    directoryClick (key, node, data) {
      if (key == 'collect') {
      }
      if (key == 'transparency') {
      }

      if (key == 'details') {
      }
    },
    workStep (data, node, ele) {
      if (node.childNodes.length !== 0) {
        return
      }
      switch (data.id) {
        case 11:
          this.fenxiText = '叠加分析'
          this.push('superposition')
          break
        case 12:
          this.fenxiText = '缓冲分析'
          this.push('buffer')
          break
        case 21:
          this.fenxiText = '现状数据分析'
          this.push('present')
          break
        case 22:
          this.fenxiText = '规划数据分析'
          this.push('planning')
          break
        case 23:
          this.fenxiText = '矿产分析'
          this.push('mine')
          break
        case 24:
          this.fenxiText = '压覆矿分析'
          this.push('constructed')
          break
        case 25:
          this.fenxiText = '地质灾害点分析'
          this.push('disaster')
          break
        case 26:
          this.fenxiText = '地质灾害易发区分析'
          this.push('disasterarea')
          break
        case 27:
          this.fenxiText = '两规冲突检测分析'
          this.push('secondcollide')
          break
        case 28:
          this.fenxiText = '规划现状冲突分析'
          this.push('nowcollide')
          break
      }
    },
    renameBlur () {
      this.rightObject.add = false

      if (this.rightObject.name === this.enterFilterData.rename) {
        return
      }
      let params = {
        id: this.rightObject.id,
        name: this.enterFilterData.rename
      }
      this.$post('/epf-onemap/admin/mapworkbenchcontents/update', params).then(
        res => {
          if (res.code == '0') {
            this.$message.success('修改成功')
            this.getData2()
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    collectionTopics () {
      this.$post('/epf-onemap/maptopiccollect/queryCollectByUserId', {}).then(
        res => {
          if (res.code == '0') {
            if (res.list.length > 0) {
              res.list.forEach(item => (item.isLeaf = true))

              this.data2Child2 = res.list
            }
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    mypapers () {
      this.$get('/epf-onemap/admin/mapgeodoucment/getGeoDoucmentList', {}).then(
        res => {
          if (res.code == '0') {
            if (res.result.length > 0) {
              res.result = JSON.parse(
                JSON.stringify(res.result).replace(/documentName/g, 'name')
              )
              res.result.forEach(item => (item.isLeaf = true))
              this.data2Child3 = res.result

              if (this.node2.data.name === '文件') {
                this.resolve2(this.data2Child3)
              }
            }
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    tag () {
      this.$get('/epf-onemap/front/mapSign/list', {}).then(res => {
        if (res.code == '0') {
          if (res.pager.results.length > 0) {
            res.pager.results.forEach(item => (item.isLeaf = true))
            this.data2Child4 = res.pager.results
            if (this.node2.data.name === '标记') {
              this.resolve2(this.data2Child4)
            }
          }
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    deleteCard () { },
    xinzeng (data, node, ele) {
      this.activeAddId = data.id
      console.log(this.activeAddId)
    },

    editor (node, data) {
      this.$set(data, 'add', true)
    },
    genID (length) {
      return Number(
        Math.random()
          .toString()
          .substr(3, length) + Date.now()
      ).toString(36)
    },

    documentDelete (id) {
      this.$post('/epf-onemap/admin/mapgeodoucment/deleteById', {
        id: id
      }).then(res => {
        if (res.code == '0') {
          this.$message.success(res.msg) // 失败
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },

    documentDownload (id) {
      window.open('/api/epf-document/document/downloadById?id=' + id)
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
    citySelect (dic, cantonCity, event) {
      this.filterData.cantonArea = ''
      this.filterData.cantonAreaName = ''
      this.cantonArea = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
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
      this.createGeoJSONLayer()
    },
    areaSelect (dic, cantonCity, event) {
      this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.dictKey
    },
    searchListHandleSizeChange (val) {
      // 每页条数改变时触发
      this.searchListPageSize = val // 显示条数改变
      this.getSearchListData()
    },
    searchListHandleCurrentChange (val) {
      // 当前页发生改变时触发
      this.searchListPageNo = val // 页码改变
      this.getSearchListData()
    },
    openOrCloseClick () {
      if (this.search) {
        this.search = false
        this.home = true

        if (this.activeName === 'fourth') {
          this.countHome = true
          this.nowcollide = false
          this.disaster = false
          this.disasterarea = false
          this.bufferPage = false
          this.constructed = false
          this.superpositionPage = false
          this.planning = false
          this.secondcollide = false
          this.yearsSituation = false
          this.present = false
          this.zongHeFenXi = false
        }
      } else {
        this.show3 = !this.show3
      }
    },
    getChidlren (data, id) {
      console.log(data)
      var hasFound = false // 表示是否有找到id值
      var result = null
      var fn = function (data) {
        if (Array.isArray(data) && !hasFound) {
          // 判断是否是数组并且没有的情况下，
          data.forEach(item => {
            if (item.id === id) {
              // 数据循环每个子项，并且判断子项下边是否有id值
              result = item // 返回的结果等于每一项
              hasFound = true // 并且找到id值
            } else if (item.childList) {
              fn(item.childList) // 递归调用下边的子项
            }
          })
        }
      }
      fn(data) // 调用一下

      return result
    },
    getChidlren2 (data, id) {
      var hasFound = false // 表示是否有找到id值
      var result = null
      var fn = function (data) {
        if (Array.isArray(data) && !hasFound) {
          // 判断是否是数组并且没有的情况下，
          data.forEach(item => {
            if (item.id === id) {
              // 数据循环每个子项，并且判断子项下边是否有id值
              result = item // 返回的结果等于每一项
              hasFound = true // 并且找到id值
            } else if (item.childs) {
              fn(item.childs) // 递归调用下边的子项
            }
          })
        }
      }
      fn(data) // 调用一下

      return result
    },
    treeClick5 (data) {
      this.activeAddId = data.id
    },
    treeClick6 (data) {
      this.topicContentsId = data.id
    },
    shoucang (obj) {
      const that = this
      this.$post('/epf-onemap/admin/mapservicescollect/collectService', {
        topicContentsId: this.topicContentsId,
        serviceId: this.rightObject.id
      }).then(res => {
        if (res.code == '0') {
          that.xiugaiDialog = false

          this.rightObject.collectStatus
            = this.rightObject.collectStatus == 0 ? 1 : 0
          this.getData2()
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    pushToTree (item) {
      this.search = false
      this.home = true
      this.primaryOrPlain = 'primary'

      switch (item.type) {
        case '03':
          this.SET_Search(false)
          this.current = 3
          const id = item.id.split('_')[1]
          this.pushToTreePicture(id)
          break

        case '02':
          this.activeName = 'third'
          this.pushToTreeSpecial(item)
          break
        case '01':
          this.activeName = 'second'

          this.mypapers()
          // let parentData = this.getChidlren2(this.data2, "3");
          this.$set(this.defaultArray2, 0, '3')
          break
      }
    },
    pushToTreePicture (id) {
      this.$post('/epf-onemap/admin/mapdiretree/getDireIdByServiceId', {
        serviceId: id
      }).then(res => {
        if (res.code == '0') {
          const arr = res.direId
          arr.pop()

          this.defaultArray1 = arr
        } else {
          // this.$message.error(res.msg); //失败
          return
        }
      })
    },
    pushToTreeSpecial (item) {
      this.$post('/epf-onemap/admin/mapdiretree/getDireIdByServiceId', {
        serviceId: item.id
      }).then(res => {
        if (res.code == '0') {
          let parentId = res.direId
          this.$set(this.defaultArray3, 0, parentId)
        } else {
          // this.$message.error(res.msg); //失败
          return
        }
      })
    },
    serverSelect (dic, server, event) {
      console.log(dic)
      console.log(server)
      console.log(event)
      let pId = this.$refs[server][0].$attrs.id
      this.property = []
      this.checkList = []
      this.$get(`/epf-onemap/admin/mapservices/getById?id=${pId}`, {}).then(
        res => {
          if (!res.layerList.length) {
            this.$message.warning('此服务下没有图层数据')
          }
          this.dictionary1.pictureData = res.layerList
          this.disasterLayer['serviceName'] = res.services.serviceName
          this.disasterLayer['serviceNo'] = res.services.id
        }
      )
      this.filterData.picture = ''
    },
    getScopeId (val) {
      this.scopeDataId = val.label
    },
    getScopeDisId (val) {
      this.scopeDisDataId = val.value
      if (this.scopeDisDataId === 'zidingyi') {
        this.isImport = true
      } else {
        this.isImport = false
        this.inputScopeDis = ''
      }
    },
    async getFromIframe (e) {
      console.log(e.data.id)
      console.log(e.data.value)
      this.isIframe = 10
      this.leftTabIndex = e.data.id
      this.topSearchValue = e.data.value
    }
  },
  created () {
    if (this.$route.params.index === 4) {
      this.activeTab1 = false
      this.activeTab2 = false
      this.activeTab3 = false
      this.activeTab4 = false
      this.activeTab5 = true
      this.countHome = false
      this.activeName = 'fivth'
      this.tabIndex = 4
    }
    this.resourceData = RESOURCE_DATA
    this.zhuanTiData = ZHUANTI_DATA
    for (let i = 0; i < this.zhuanTiData.length; i++) {
      this.commonServiceModels.push({ checked: false })
    }
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item === 'land_use') {
          this.$get(
            `/epf-trade/dictionaries/getDictsByCodeOrParentId?code=${item}`,
            { parentId: 0 }
          ).then(res => {
            resolve(res)
          })
        } else if (item == 'administrative_regions') {
          this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
            parentId: 0
          }).then(res => {
            res = {
              code: 0,
              dictionariesList: [
                {
                  abbreviation: null,
                  children: null,
                  createTime: null,
                  creatorBy: null,
                  dictDelete: null,
                  dictKey: '440000',
                  dictOrder: 440000,
                  dictValue: '440000',
                  enUs: '440000',
                  groupId: null,
                  id: '440000',
                  parentId: '0',
                  updateTime: null,
                  updatorBy: null,
                  version: null,
                  zhCn: '广东省'
                }
              ],
              msg: '操作成功!'
            }
            resolve(res)
          })
        } else {
          this.$get(
            `/epf-trade/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            resolve(res)
          })
        }
      })
      return reqFun
    })
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item0 => {
        let dicArr = item0.dictionariesList.map(item1 => {
          return {
            dictKey: item1.dictKey,
            zhCn: item1.zhCn,
            id: item1.id
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
    this.getTreeAdmin()
    this.specialTopic3()
    this.getData2()
    this.getData5AndData6()
  },
  watch: {
    searchParams (newVal, oldVal) {
      this.getSearchListData(newVal)
    },
    searchShow (newVal, oldVal) {
      if (newVal) {
        this.getSearchListData()
      }
    },
    xinzengDialog (val) {
      if (val === true) {
        this.getData5AndData6()
      }
    },
    activeTab4 (val) {
      if (val == false) {
        this.constructedDialog = false
        this.disasterDialog = false
        this.disasterareaDialog = false
        this.secondcollideDialog = false
        this.nowcollideDialog = false
      } else {
        this.countHome = true
      }
    },
    leftTabIndex (val) {
      this.isIframe = 10
      if (val === '1') {
        this.tabIndex = 0
        this.leftTabIndex = '1'
      } else if (val === '2') {
        this.tabIndex = 1
        this.leftTabIndex = '2'
      } else if (val === '3') {
        this.tabIndex = 2
        this.leftTabIndex = '3'
      } else if (val === '4') {
        this.tabIndex = 3
        this.leftTabIndex = '4'
      } else if (val === '0') {
        this.tabIndex = 3
        this.leftTabIndex = '0'
      }
    },
    tabIndex (val) {
      this.$emit('tab', Number(val))
      this.isIframe = 10
      this.property = []
      this.queryResult = []
      this.layerFieldsToShow = []
      this.menuVisible = false
      this.superpositionPage = false
      this.bufferPage = false
      this.present = false
      this.planning = false
      this.mine = false
      this.constructed = false
      this.disaster = false
      this.disasterarea = false
      this.secondcollide = false
      this.nowcollide = false
      this.isOtherTitle = false
      this.fenxiResult = false

      if (val == 2) {
        this.zhuanti = true
      } else {
        this.zhuanti = false
      }
      if (val == 0) {
        this.title = '资源目录'
        this.activeTab2 = false
        this.activeTab3 = false
        this.activeTab4 = false
        this.activeTab1 = true
        this.countHome = false
        this.activeName = 'first'
        this.leftTabIndex = '1'
      } else if (val == 1) {
        this.title = '工作台'
        this.activeTab1 = false
        this.activeTab3 = false
        this.activeTab4 = false
        this.activeTab2 = true
        this.countHome = false
        this.activeName = 'second'
        this.leftTabIndex = '2'

        // this.getListAndPicture2("workbench_type-002", "0");
        this.collectionTopics()
        this.mypapers()
        this.tag()
      } else if (val == 2) {
        this.title = '我的专题'
        this.activeTab1 = false
        this.activeTab2 = false
        this.activeTab4 = false
        this.activeTab3 = true
        this.countHome = false
        this.activeName = 'third'
        this.leftTabIndex = '3'
      } else if (val == 3) {
        this.title = '统计分析'
        this.activeTab1 = false
        this.activeTab2 = false
        this.activeTab3 = false
        this.activeTab4 = true
        this.countHome = true
        this.activeName = 'fourth'
        this.leftTabIndex = '4'
      }
    },
    topSearchValue (val) {
      if (val === undefined) return
      this.searchList()
    }

  },
  mounted () {
    this.menuListHeight = window.innerHeight - 245
    window.addEventListener('message', this.getFromIframe)
  },
  computed: {
    ...mapState('onemap', ['searchShow', 'searchParams'])
  }
}
</script>

<style scoped>
.tabsTitle {
  margin-top: 5px;
  color: #76b0ff;
}
.active .tabsTitle {
  color: #fff;
}
.overText {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.newpage {
  height: 100%;
}
.newpage .controller_contain {
  position: absolute;
  /* height: calc(100% - 56px);
  left: 0;
  top: 56px; */
  /* height: calc(100% - 131px); */
  height: 100%;
  background: transparent;
}
.controller_contain_custom {
  /* position: absolute;
  width: 100%;
  height: calc(100% - 56px);
  left: 0;
  top: 56px; */
  width: 100%;
  height: 100%;
  background: transparent;
}
.console {
  z-index: 99;
  display: flex;
  flex-direction: column;
}
.controller_contain_custom .console {
  width: 100%;
}
.controller_contain_custom .tongjifenxi {
  width: 100%;
}

.search {
  padding: 12px 10px;
}

.searchLogo {
  font-style: normal;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 22px;
  background: url("../../../assets/searchLogo.png") no-repeat center;
  cursor: pointer;
}

.list {
  height: 30px;
  background-color: #f9f9f9;
  line-height: 40px;
}

.list .listLogo {
  padding: 7px 0 0 10px;
}

.list .listText {
  font-size: 18px;
  color: #1d7ce4;
  padding: 0 10px;
  font-weight: bold;
}

.box-card {
  width: 35%;
  position: relative;
}

.toolsTitleBox {
  height: 40px;
  line-height: 40px;
  background: rgba(211, 211, 211, 0.1);
}

.toolsTitle {
  line-height: 40px;

  font-weight: 600;
  float: left;
}

.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding-right: 10px;
  text-align: left;
  line-height: 35px;
}

.wenjian {
  display: inline-block;
  margin: 0 5px;
  line-height: 20px;
  height: 20px;
}

.tabs {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
}

.zhuantiBtn {
  color: #1d7ce4;
  float: right;
  cursor: pointer;
}

.list .listText .otherTitle {
  color: #c1c1c1;
  font-weight: normal;
}

.console .tongjifenxi .selectHeader {
  font-size: 18px;
  color: #515050;
}

.console .threePush {
  text-align: left;
}

.console .threePush span {
  display: inline-block;
  width: 100%;
  background-color: #1d7ce4;
}

.console .searchResultCondition {
  text-align: center;
  line-height: 42px;
}

.console .searchResultCondition .el-row {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0px;
}

.console .searchResultCondition .el-row p {
  margin: 7px 0;
}

.console .searchResultCondition .el-button--medium {
  padding: 14px;
  font-size: 16px;
}

.console .searchResultData {
  background: rgba(249, 250, 255, 1);
  padding: 0 8px;
}

.console .searchResultData .searchTr {
  padding: 8px 0;
  border-bottom: 1px solid #c6c6c6;
}

.console .searchResultData .searchTr .el-row {
  height: 24px;
  line-height: 24px;
  margin-bottom: 0;
}

.console .searchResultData .searchTr .searchTrTitle {
  color: #50a5f4;
  cursor: pointer;
}

.console .tongjifenxi .firstDiv {
  height: 100%;
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  overflow: auto;
}
.middle-middle-message-box {
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: -10;
  cursor: pointer;
  box-shadow: -1px 1px 3px 0px rgba(219, 219, 219, 1);
  background-color: #fff;
}

.middle-middle-message-boxL {
  background-image: url("../../../assets/images/jcpgyj/right.png");
  background-size: 40px 40px;
  left: 74px;

  top: 0;
}
.middle-middle-message-boxR {
  background-image: url("../../../assets/images/jcpgyj/left.png");
  background-size: 40px 40px;
  left: 394px;
  top: 0;
}
</style>
<style>
.console .el-input__inner {
  border: 1px solid #1d7ce4;
  background-color: #fff;
  font-size: 16px;
}
.console .el-tabs--left.el-tabs--border-card .el-tabs__item.is-left {
  border: none;
  margin: 0;
}
.console .tongjifenxi .el-input__inner {
  height: 30px;
  line-height: 30px;
  color: #000;
  border: 1px solid #000;
  background-color: #fff;
  border: 1px solid #d5d5d5;
}

.console .el-tabs--left .el-tabs__header.is-left {
  min-width: 74px;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(15, 36, 106, 1) 0%,
    rgba(0, 63, 163, 1) 29%,
    rgba(15, 36, 106, 1) 100%
  );
  border: none;
  box-shadow: 3px 0px 8px 0px rgba(59, 74, 128, 0.5);
  margin-right: 0;
  overflow: hidden;
  z-index: 11;
}

.console .el-tabs--border-card > .el-tabs__content {
  height: 100%;
  width: 320px;
  padding-bottom: 0;
  background: rgba(249, 250, 255, 1);
  box-shadow: 3px 0px 3px -2px rgba(172, 172, 172, 0.5);
  font-size: 16px;
}

#console_custom .el-tabs--border-card > .el-tabs__content {
  height: 100%;
  width: 100%;
  padding-bottom: 0;
  background: rgba(249, 250, 255, 1);
  box-shadow: 3px 0px 3px -2px rgba(172, 172, 172, 0.5);
  font-size: 16px;
}
/* .controller_contain .console .el-tabs--border-card > .el-tabs__content {
  height: 100%;
  width: 100%;
  padding-bottom: 0;
  background: rgba(249, 250, 255, 1);
  box-shadow: 3px 0px 3px -2px rgba(172, 172, 172, 0.5);
  font-size: 16px;
} */

.console .el-tabs--border-card {
  box-shadow: none;
  border: none;
}
.controller_contain_custom .console .el-tabs--border-card {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.console .el-tree {
  background: rgba(249, 250, 255, 1);
}
.console .el-tabs--left,
.el-tabs--right {
  overflow: visible;
}

.console .el-tabs__item {
  line-height: normal;
  font-size: 16px;
  height: 70px;
  padding: 0;
  text-align: center;
}

.console img {
  vertical-align: middle;
}

.console .el-page-header {
  width: 100%;
}

.console .el-tree {
  font-size: 16px;
}

.console .el-tree-node__expand-icon {
  font-size: 20px;
}

.console .tongjifenxi .el-row,
.console .tongjifenxi .el-row .el-checkbox {
  margin-top: 8px;
  color: #000000;
  margin-bottom: 0;
}

.console .el-checkbox__inner {
  width: 14px;
  height: 14px;
  border-color: #000;
}

.console .el-checkbox__label {
  font-size: 16px;
}

.console .el-dialog__header,
.console .el-button--primary {
  background: linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -ms-linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -webkit-linear-gradient(left, #1e7ae5, #0ca6e1);
  background: -moz-linear-gradient(left, #1e7ae5, #0ca6e1);
  border: none;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#1e7ae5),
    to(#0ca6e1)
  );
}

.console .el-dialog__header {
  color: #fff;
}

.console .el-dialog {
  border-radius: 7px;
}

.console .el-table th.gutter {
  display: table-cell !important;
}

.console .el-dialog__title {
  color: #fff;
  font-size: 16px;
  padding: 15px;
}

.console .superposition .el-table {
  border-radius: 7px;
}

.console .superposition .el-table .el-table__header thead th {
  background-color: #efefef;
}

.console .el-dialog__footer {
  padding-right: 20px;
}

.console .zy-main {
  height: 100%;
  padding: 0 0 10px 0;
}

/* .console .el-scrollbar {
  border-radius: 6px;
  height: 100%;
} */

.el-scrollbar__wrap {
  overflow-x: hidden;
}
.forth-container {
  height: 100%;
  font-size: 12px;
  padding: 10px 5px;
  overflow: auto;
}
.box {
  width: 33.33%;
  justify-content: center;
}
.shuXian {
  display: inline-block;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
}
.shuXian i {
  position: absolute;
  bottom: 0;
  left: 20px;
  color: rgba(40, 130, 229);
  display: inline-block;
  padding-right: 5px;
  height: 20px;
  background-color: rgba(40, 130, 229);
}
.bigger {
  padding-top: 160px;
  padding-left: 16px;
}
.console .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background: rgba(5, 92, 210, 1);
}
/* .box2 {
  display: flex;
  padding-top: 10px;
} */
.title2 {
  padding-top: 20px;
}
.changeCheckbox {
  margin-top: 10px;
  color: rgba(1, 1, 1);
}
.firstBox__control {
  padding: 0 12px;
  background: rgba(241, 241, 241, 1);
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.firstBox__control .rightButton {
  width: 100px;
  height: 40px;
}
.firstBox__control-right {
  padding: 0 12px;
  background: rgba(241, 241, 241, 1);
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-end;
}
.firstBox__control div {
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  flex: 1;
  border-radius: 2px;
  justify-content: center;
  color: rgba(175, 175, 175, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
}
.firstBox__control div:nth-child(2) {
}
.firstBox__control .Toactive {
  border-bottom: 2px solid rgba(27, 116, 238, 1);
  height: 38px;
  color: rgba(97, 97, 97, 1);
}

.secondBox {
  height: 30px;
  position: relative;
  padding-left: 0px;
  margin: 13px;
  margin-left: 10px;
}
.secondBox .el-checkbox {
  color: #606266 !important;
}
/* .secondBox:first-child {
  padding-top:0;
} */

#console #pane-third .epf-tree {
  padding-bottom: 0;
}
#console #pane-second .epf-tree {
  padding-bottom: 0;
}
.box1,
.box2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.box1 .box1-part,
.box2 .box1-part {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0;
  cursor: pointer;
}
.el-scrollbar {
  height: 100%;
  border: unset;
  border-radius: 6px;
}
.console .el-tab-pane {
  height: 100%;
}
.countHome {
  height: 100%;
  overflow: auto;
}

/* .console .el-tabs--left .el-tabs__item.is-left {
  text-align: center;
} */
</style>
