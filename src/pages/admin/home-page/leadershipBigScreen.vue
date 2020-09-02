<template>
  <div :class="{'page-body-leader':this.chartScreen==='small','page-body-leader__custom':this.chartScreen==='big'}"
       :id="{'leader-index':this.chartScreen==='small','leader-index__custom':this.chartScreen==='big'}">
    <div :class="{'leader-top-content':this.chartScreen==='small','leader-top-content__custom':this.chartScreen==='big'}">
      <p class="leader-title">
        <span v-if="this.chartScreen==='big'">广东省国土空间规划“一张图”实施监督信息系统</span>
      </p>
      <div :class="{'leader-time-box':this.chartScreen==='small','leader-time-box__custom':this.chartScreen==='big'}">
        <i :class="{'leader-time-boxIcon':this.chartScreen==='small','leader-time-boxIcon__custom':this.chartScreen==='big'}"></i>
        {{ this.presentTime }}
      </div>

      <el-tooltip effect="dark"
                  content="全屏"
                  placement="bottom"
                  v-if="this.chartScreen==='small'">
        <img src="../../../assets/images/leader/fullicon.png"
             alt
             class="leader-system-icon"
             @click="fullScreen" />
      </el-tooltip>
      <el-tooltip effect="light"
                  content="退出全屏"
                  placement="left"
                  v-if="this.chartScreen==='big'">
        <img src="../../../assets/images/leader/nofullicon.png"
             alt
             class="leader-system-icon__custom"
             @click="exitFullScreen" />
      </el-tooltip>
    </div>
    <div :class="{'leader-content':this.chartScreen==='small','leader-content__custom':this.chartScreen==='big'}">
      <!-- 首页左边 -->
      <div class="leader-content-Left">
        <!-- 左顶部 -->

        <div :class="{'content-left-top':this.chartScreen==='small','content-left-top__custom':this.chartScreen==='big'}">
          <div :class="{'modelling-box':this.chartScreen==='small','modelling-box__custom':this.chartScreen==='big'}">
            <div :class="{'modelling-content':this.chartScreen==='small','modelling-content__custom':this.chartScreen==='big'}">
              <span style="background:#0ACD8E;"></span>
              <span>一张图应用</span>
            </div>
            <div class="modelling-icon"
                 @click="intoOnemap"></div>
          </div>

          <ul :class="{'content-left-top-box':this.chartScreen==='small','content-left-top-box__custom':this.chartScreen==='big'}">
            <li :class="{'content-left-top-text':this.chartScreen==='small','content-left-top-text__custom':this.chartScreen==='big'}">
              <span>省级国土空间规划</span>
            </li>
            <li :class="{'content-left-top-text':this.chartScreen==='small','content-left-top-text__custom':this.chartScreen==='big'}">
              <span>三条控制线</span>
            </li>
            <li :class="{'content-left-top-text':this.chartScreen==='small','content-left-top-text__custom':this.chartScreen==='big'}">
              <span>主体功能区</span>
            </li>
            <li :class="{'content-left-top-text':this.chartScreen==='small','content-left-top-text__custom':this.chartScreen==='big'}">
              <span>三调</span>
            </li>
            <li :class="{'content-left-top-text':this.chartScreen==='small','content-left-top-text__custom':this.chartScreen==='big'}">
              <span>人口数据</span>
            </li>
          </ul>
        </div>
        <!-- 左中部 -->
        <div :class="{'content-left-middle':this.chartScreen==='small','content-left-middle__custom':this.chartScreen==='big'}">
          <div :class="{'modelling-box':this.chartScreen==='small','modelling-box__custom':this.chartScreen==='big'}">
            <div :class="{'modelling-content':this.chartScreen==='small','modelling-content__custom':this.chartScreen==='big'}">
              <span style="background:#F3A664;"></span>
              <span>监测评估预警</span>
            </div>
            <div class="modelling-icon"
                 @click="intoMonitor"></div>
          </div>

          <el-carousel indicator-position="outside"
                       height="80%"
                       style="width:100%;height:80%;overflow:hidden;">
            <el-carousel-item>
              <div class="slideshow-big-box">
                <div class="slideshow-content">
                  <div class="slideshow-img"></div>
                  <div :class="{'slideshow-title':this.chartScreen==='small','slideshow-title__custom':this.chartScreen==='big'}">耕地保有量</div>
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">全省无突破</div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">21</span>个地级市实际划定均多于指标，无突破
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">122</span>个县（区）实际划定均多于指标，无突破
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="slideshow-big-box">
                <div class="slideshow-content">
                  <div class="slideshow-img"></div>
                  <div :class="{'slideshow-title':this.chartScreen==='small','slideshow-title__custom':this.chartScreen==='big'}">永久基本农田</div>
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">全省无突破</div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">21</span>个地级市实际划定均多于指标，无突破
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">21</span>个地级市、
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">122</span>个县（区）实际划定均多于指标，无突破
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="slideshow-big-box">
                <div class="slideshow-content">
                  <div class="slideshow-img"></div>
                  <div :class="{'slideshow-title':this.chartScreen==='small','slideshow-title__custom':this.chartScreen==='big'}">建设用地总规模</div>
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">全省无突破</div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">21</span>个地级市中已有
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">11</span>个突破规划指标（累计突破
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area01}}</span>万亩）
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">122</span>个县（区）中已有
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">53</span>个突破规划指标（累计突破
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area02}}</span>万亩）
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="slideshow-big-box">
                <div class="slideshow-content">
                  <div class="slideshow-img"></div>
                  <div :class="{'slideshow-title':this.chartScreen==='small','slideshow-title__custom':this.chartScreen==='big'}">城乡建设用地</div>
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  全省突破
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area03}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">21</span>个地级市中已有
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">12</span>个突破规划指标（累计突破
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area04}}</span>万亩）
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">122</span>个县（区）中已有
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">56</span>个突破规划指标（累计突破
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area05}}</span>万亩）
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="slideshow-big-box">
                <div class="slideshow-content">
                  <div class="slideshow-img__custom"></div>
                  <div :class="{'slideshow-title':this.chartScreen==='small','slideshow-title__custom':this.chartScreen==='big'}">不符合规划新增建设用地</div>
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  全省不符合规划面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area06}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">11</span>个地市有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area07}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">56</span>个县/区有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area08}}</span>万亩
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="slideshow-big-box">
                <div class="slideshow-content">
                  <div class="slideshow-img__custom"></div>
                  <div :class="{'slideshow-title':this.chartScreen==='small','slideshow-title__custom':this.chartScreen==='big'}">未批先建土地</div>
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  全省不符合规划面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area09}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">11</span>个地市有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area10}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">56</span>个县/区有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area11}}</span>万亩
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="slideshow-big-box">
                <div class="slideshow-content">
                  <div class="slideshow-img__custom"></div>
                  <div :class="{'slideshow-title':this.chartScreen==='small','slideshow-title__custom':this.chartScreen==='big'}">生态保护红线内建设用地</div>
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  全省不符合规划面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area12}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">11</span>个地市有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area13}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">56</span>个县/区有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area14}}</span>万亩
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="slideshow-big-box">
                <div class="slideshow-content">
                  <div class="slideshow-img__custom"></div>
                  <div :class="{'slideshow-title':this.chartScreen==='small','slideshow-title__custom':this.chartScreen==='big'}">开发边界外的城镇建设用地</div>
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  全省不符合规划面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area15}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">11</span>个地市有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area16}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">56</span>个县/区有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area17}}</span>万亩
                </div>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="slideshow-big-box">
                <div class="slideshow-content">
                  <div class="slideshow-img__custom"></div>
                  <div :class="{'slideshow-title':this.chartScreen==='small','slideshow-title__custom':this.chartScreen==='big'}">基本农田内建设用地</div>
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  全省不符合规划面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area18}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">11</span>个地市有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area19}}</span>万亩
                </div>
                <div :class="{'slideshow-text':this.chartScreen==='small','slideshow-text__custom':this.chartScreen==='big'}">
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">56</span>个县/区有规划不符，不符合规划的面积
                  <span :class="{'slideshow-number':this.chartScreen==='small','slideshow-number__custom':this.chartScreen==='big'}">{{this.area20}}</span>万亩
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 左底部 -->
        <div :class="{'content-left-bottom':this.chartScreen==='small','content-left-bottom__custom':this.chartScreen==='big'}">
          <div :class="{'modelling-box':this.chartScreen==='small','modelling-box__custom':this.chartScreen==='big'}">
            <div :class="{'modelling-content':this.chartScreen==='small','modelling-content__custom':this.chartScreen==='big'}">
              <span style="background:#E8D25B;"></span>
              <span>资源环境承载监测</span>
            </div>
            <div class="modelling-icon"
                 @click="intoAnalysis"></div>
          </div>
          <div class="content-left-bottom-chart">
            <div id="agriculture-chart"
                 style=" width: 100%; height: 33%"></div>
            <div id="city-chart"
                 style=" width: 100%; height: 33%"></div>
            <div id="ecological-chart"
                 style=" width: 100%; height: 33%"></div>
          </div>
        </div>
      </div>
      <!-- 首页中间 -->
      <div class="leader-content-middle">
        <!-- 中顶部(地图展示) -->
        <div :class="{'content-middle-top':this.chartScreen==='small','content-middle-top__custom':this.chartScreen==='big'}">
          <el-carousel ref="myCarousel"
                       indicator-position="outside"
                       height="97%"
                       style="width:100%;height:97%;overflow:hidden;"
                       @change="handleCarouselChange">
            <el-carousel-item v-for="(item,index) in coverageList"
                              :key="index"></el-carousel-item>
            <h3 style="height: 50px;text-align: center; line-height: 50px;color: #000;">{{title}}</h3>
            <epf-mapview name="leaderShip"
                         ref="leaderShip"
                         :delay="1"
                         :mapAppInitConf="mapAppInitConf"
                         :widgetConf="widgetConf"
                         :hidden="mapViewHidden"
                         style="width:calc(100% - 6px);height:calc(100% - 50px);margin: 0 3px;"></epf-mapview>
          </el-carousel>
        </div>

        <!-- 中底部 -->
        <div :class="{'content-middle-bottom-bigBox':this.chartScreen==='small','content-middle-bottom-bigBox__custom':this.chartScreen==='big'}">
          <ul class="content-middle-bottom-box">
            <li :class="{'content-middle-bottom-message':this.chartScreen==='small','content-middle-bottom-message__custom':this.chartScreen==='big'}">
              <div :class="{'content-middle-bottom-message-title':this.chartScreen==='small','content-middle-bottom-message-title__custom':this.chartScreen==='big'}">永久基本农田</div>
              <div :class="{'content-middle-bottom-message-number':this.chartScreen==='small','content-middle-bottom-message-number__custom':this.chartScreen==='big'}">{{this.yjjbntArea}}</div>
              <div :class="{'content-middle-bottom-message-unit':this.chartScreen==='small','content-middle-bottom-message-unit__custom':this.chartScreen==='big'}">万亩</div>
              <div :class="{'content-middle-bottom-message-img0':this.chartScreen==='small','content-middle-bottom-message-img0__custom':this.chartScreen==='big'}"></div>
            </li>
            <li :class="{'content-middle-bottom-message':this.chartScreen==='small','content-middle-bottom-message__custom':this.chartScreen==='big'}">
              <div :class="{'content-middle-bottom-message-title':this.chartScreen==='small','content-middle-bottom-message-title__custom':this.chartScreen==='big'}">林地面积</div>
              <div :class="{'content-middle-bottom-message-number':this.chartScreen==='small','content-middle-bottom-message-number__custom':this.chartScreen==='big'}">{{this.lindiArea}}</div>
              <div :class="{'content-middle-bottom-message-unit':this.chartScreen==='small','content-middle-bottom-message-unit__custom':this.chartScreen==='big'}">万公顷</div>
              <div :class="{'content-middle-bottom-message-img1':this.chartScreen==='small','content-middle-bottom-message-img1__custom':this.chartScreen==='big'}"></div>
            </li>
            <li :class="{'content-middle-bottom-message':this.chartScreen==='small','content-middle-bottom-message__custom':this.chartScreen==='big'}">
              <div :class="{'content-middle-bottom-message-title':this.chartScreen==='small','content-middle-bottom-message-title__custom':this.chartScreen==='big'}">水资源总量</div>
              <div :class="{'content-middle-bottom-message-number':this.chartScreen==='small','content-middle-bottom-message-number__custom':this.chartScreen==='big'}">{{this.shuiziyuanArea}}</div>
              <div :class="{'content-middle-bottom-message-unit':this.chartScreen==='small','content-middle-bottom-message-unit__custom':this.chartScreen==='big'}">亿立方米</div>
              <div :class="{'content-middle-bottom-message-img2':this.chartScreen==='small','content-middle-bottom-message-img2__custom':this.chartScreen==='big'}"></div>
            </li>
            <li :class="{'content-middle-bottom-message':this.chartScreen==='small','content-middle-bottom-message__custom':this.chartScreen==='big'}">
              <div :class="{'content-middle-bottom-message-title':this.chartScreen==='small','content-middle-bottom-message-title__custom':this.chartScreen==='big'}">海域面积</div>
              <div :class="{'content-middle-bottom-message-number':this.chartScreen==='small','content-middle-bottom-message-number__custom':this.chartScreen==='big'}">{{this.haiyuArea}}</div>
              <div :class="{'content-middle-bottom-message-unit':this.chartScreen==='small','content-middle-bottom-message-unit__custom':this.chartScreen==='big'}">万平方公里</div>
              <div :class="{'content-middle-bottom-message-img3':this.chartScreen==='small','content-middle-bottom-message-img3__custom':this.chartScreen==='big'}"></div>
            </li>
            <li :class="{'content-middle-bottom-message':this.chartScreen==='small','content-middle-bottom-message__custom':this.chartScreen==='big'}">
              <div :class="{'content-middle-bottom-message-title':this.chartScreen==='small','content-middle-bottom-message-title__custom':this.chartScreen==='big'}">建设用地总规模</div>
              <div :class="{'content-middle-bottom-message-number':this.chartScreen==='small','content-middle-bottom-message-number__custom':this.chartScreen==='big'}">{{this.jsgmArea}}</div>
              <div :class="{'content-middle-bottom-message-unit':this.chartScreen==='small','content-middle-bottom-message-unit__custom':this.chartScreen==='big'}">万亩</div>
              <div :class="{'content-middle-bottom-message-img4':this.chartScreen==='small','content-middle-bottom-message-img4__custom':this.chartScreen==='big'}"></div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 首页右边 -->
      <div class="leader-content-right">
        <!-- 右顶部 -->

        <div :class="{'content-right-top':this.chartScreen==='small','content-right-top__custom':this.chartScreen==='big'}">
          <div :class="{'modelling-box':this.chartScreen==='small','modelling-box__custom':this.chartScreen==='big'}">
            <div :class="{'modelling-content':this.chartScreen==='small','modelling-content__custom':this.chartScreen==='big'}">
              <span style="background:#8759D6;"></span>
              <span>成果审查</span>
            </div>
            <div class="modelling-icon"
                 @click="intoExamine"></div>
          </div>

          <div class="content-right-top-box">
            <div :class="{'content-right-top-message-special':this.chartScreen==='small','content-right-top-message-special__custom':this.chartScreen==='big'}">
              <span>成果入库数量：</span>
              <span>{{this.cgscData01}}个</span>
            </div>
            <div :class="{'content-right-top-message':this.chartScreen==='small','content-right-top-message__custom':this.chartScreen==='big'}">
              <span>规划修改宗数：</span>
              <span>{{this.cgscData02}}个</span>
            </div>
            <div :class="{'content-right-top-message':this.chartScreen==='small','content-right-top-message__custom':this.chartScreen==='big'}">
              <span>规划修改面积：</span>
              <span>{{this.cgscData03}}万亩</span>
            </div>
            <div :class="{'content-right-top-message':this.chartScreen==='small','content-right-top-message__custom':this.chartScreen==='big'}">
              <span>2019规划修改宗数：</span>
              <span>{{this.cgscData04}}个</span>
            </div>
            <div :class="{'content-right-top-message':this.chartScreen==='small','content-right-top-message__custom':this.chartScreen==='big'}">
              <span>2019规划修改面积：</span>
              <span>{{this.cgscData05}}万亩</span>
            </div>
          </div>
        </div>

        <!-- 右中部 -->
        <div :class="{'content-right-middle':this.chartScreen==='small','content-right-middle__custom':this.chartScreen==='big'}">
          <div :class="{'modelling-box':this.chartScreen==='small','modelling-box__custom':this.chartScreen==='big'}">
            <div :class="{'modelling-content':this.chartScreen==='small','modelling-content__custom':this.chartScreen==='big'}">
              <span style="background:#1DB7AF;"></span>
              <span>知识库</span>
            </div>
            <div class="modelling-icon"
                 @click="intoRepository"></div>
          </div>
          <div class="content-right-middle-box">
            <div class="content-right-middle-message">
              <div class="content-right-middle-message-iconBox">
                <div class="content-right-middle-message-icon1"></div>
              </div>
              <div :class="{'content-right-middle-message-textBox':this.chartScreen==='small','content-right-middle-message-textBox__custom':this.chartScreen==='big'}">
                <span>法律法规</span>
                <span>{{this.zsk01}}份</span>
              </div>
            </div>
            <div class="content-right-middle-message">
              <div class="content-right-middle-message-iconBox">
                <div class="content-right-middle-message-icon2"></div>
              </div>
              <div :class="{'content-right-middle-message-textBox':this.chartScreen==='small','content-right-middle-message-textBox__custom':this.chartScreen==='big'}">
                <span>规范文档</span>
                <span>{{this.zsk02}}份</span>
              </div>
            </div>
            <div class="content-right-middle-message">
              <div class="content-right-middle-message-iconBox">
                <div class="content-right-middle-message-icon3"></div>
              </div>
              <div :class="{'content-right-middle-message-textBox':this.chartScreen==='small','content-right-middle-message-textBox__custom':this.chartScreen==='big'}">
                <span>标准指南</span>
                <span>{{this.zsk03}}份</span>
              </div>
            </div>
            <div class="content-right-middle-message">
              <div class="content-right-middle-message-iconBox">
                <div class="content-right-middle-message-icon4"></div>
              </div>
              <div :class="{'content-right-middle-message-textBox':this.chartScreen==='small','content-right-middle-message-textBox__custom':this.chartScreen==='big'}">
                <span>规划数据</span>
                <span>{{this.zsk04}}份</span>
              </div>
            </div>
            <div class="content-right-middle-message">
              <div class="content-right-middle-message-iconBox">
                <div class="content-right-middle-message-icon5"></div>
              </div>
              <div :class="{'content-right-middle-message-textBox':this.chartScreen==='small','content-right-middle-message-textBox__custom':this.chartScreen==='big'}">
                <span>专项规划</span>
                <span>{{this.zsk05}}份</span>
              </div>
            </div>
            <div class="content-right-middle-message">
              <div class="content-right-middle-message-iconBox">
                <div class="content-right-middle-message-icon6"></div>
              </div>
              <div :class="{'content-right-middle-message-textBox':this.chartScreen==='small','content-right-middle-message-textBox__custom':this.chartScreen==='big'}">
                <span>详细规划</span>
                <span>{{this.zsk06}}份</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右底部 -->
        <div :class="{'content-right-bottom':this.chartScreen==='small','content-right-bottom__custom':this.chartScreen==='big'}">
          <div :class="{'modelling-box':this.chartScreen==='small','modelling-box__custom':this.chartScreen==='big'}">
            <div :class="{'modelling-content':this.chartScreen==='small','modelling-content__custom':this.chartScreen==='big'}">
              <span style="background:#5582EA;"></span>
              <span>辅助选址</span>
            </div>
            <div class="modelling-icon"
                 @click="intoNosomething"></div>
          </div>

          <div class="content-right-bottom-table">
            <table width="100%"
                   height="100%"
                   max-width="100%"
                   border="1"
                   cellpadding="4"
                   cellspacing="0"
                   bordercolor="#818181"
                   style="table-layout:fixed;text-align:center;marign:10px 20px;"
                   v-if="this.chartScreen==='small'">
              <tr height="30px"
                  style="color:#303030;background:#E8EAF6">
                <td>可选址地类</td>
                <td>宗数</td>
                <td>面积</td>
              </tr>
              <tr height="30px"
                  v-for="(item,index) in siteTestingData"
                  :key="index">
                <td style="color:#303030;">{{item.testName}}</td>
                <td style="color:#303030;">{{item.testNumber}}</td>
                <td style="color:#303030;">{{item.testArea}}万亩</td>
              </tr>
            </table>
            <table width="100%"
                   height="100%"
                   max-width="100%"
                   border="1"
                   cellpadding="4"
                   cellspacing="0"
                   bordercolor="#818181"
                   style="table-layout:fixed;text-align:center;marign:10px 20px;"
                   v-if="this.chartScreen==='big'">
              <tr height="30px"
                  style="color:#fff;background:linear-gradient(270deg,rgba(18,22,35,1) 0%,rgba(28,40,128,1) 100%);">
                <td>可选址地类</td>
                <td>宗数</td>
                <td>面积</td>
              </tr>
              <tr height="30px"
                  v-for="(item,index) in siteTestingData"
                  :key="index">
                <td style="color:#fff;">{{item.testName}}</td>
                <td style="color:#50B5FF;">{{item.testNumber}}</td>
                <td style="color:#50B5FF;">{{item.testArea}}万亩</td>
              </tr>
            </table>
          </div>
        </div>
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
import screenfull from 'screenfull'
import moment from 'moment'
import { MAPSERVICE } from './LeaderShipMock'

export default {
  name: 'leadershipBigScreen',
  props: {
    chartScreen: {
      type: String,
      default: function () {
        return 'small'
      } // 这样可以指定默认的值
    }
  },
  data () {
    return {
      mapViewHidden: true,
      title: '图层加载中...',
      mapApp: null,
      activeIndex: -1,
      mapservices: null,
      mapAppInitConf: null,
      widgetConf: null,
      presentTime: '', // 时间

      siteTestingData: [
        {
          testName: '居住用地',
          testNumber: 43,
          testArea: 74.37
        },
        {
          testName: '商业服务业设施用地',
          testNumber: 27,
          testArea: 85.21
        },
        {
          testName: '工业用地',
          testNumber: 62,
          testArea: 46.77
        },
        {
          testName: '公共设施用地',
          testNumber: 48,
          testArea: 92.01
        },
        {
          testName: '绿地与广场用地',
          testNumber: 55,
          testArea: 15.28
        },
        {
          testName: '建设用地',
          testNumber: 39,
          testArea: 39.19
        }
      ],
      coverageList: [
        { name: '城市利用总体规划' },
        { name: '土地规划用途分区' },
        { name: '土地规划期末地类图斑' },
        { name: '土地利用现状' },
        { name: '生态保护红线' },
        { name: '永久基本农田' },
        { name: '城镇开发边界' },
        { name: '海洋功能区划' }
      ],

      area01: 76.33,
      area02: 131.19,
      area03: 28.19,
      area04: 117.39,
      area05: 126.87,
      area06: 16.92,
      area07: 9.81,
      area08: 7.11,
      area09: 28.26,
      area10: 17.55,
      area11: 10.71,
      area12: 31.72,
      area13: 11.23,
      area14: 20.49,
      area15: 33.64,
      area16: 18.3,
      area17: 15.34,
      area18: 45.28,
      area19: 27.52,
      area20: 17.76,

      yjjbntArea: 3163.95,
      lindiArea: 1101.6,
      shuiziyuanArea: 1830,
      haiyuArea: 41.9,
      jsgmArea: 3127.95,

      cgscData01: 217,
      cgscData02: 128,
      cgscData03: 2.73,
      cgscData04: 300,
      cgscData05: 10,

      zsk01: 856,
      zsk02: 394,
      zsk03: 285,
      zsk04: 182,
      zsk05: 127,
      zsk06: 102

      // chartScreen: "small" //大屏<=>全屏
    }
  },
  methods: {
    ...mapActions(['setTabsList']),
    handleCarouselChange (activeIndex) {
      this.title = this.mapservices[activeIndex].title
      if (this.mapApp) {
        this.mapservices.forEach((item, index) => {
          let layer = this.mapApp.findLayerById(item.title)
          if (index === activeIndex) {
            this.mapApp.setLayerVisiblity(item.title, true)
          } else {
            this.mapApp.setLayerVisiblity(item.title, false)
          }
        })
      }
    },
    // 资源环境承载监测--农业适宜性
    agricultureDrawLine () {
      setTimeout(() => {
        let agricultureChart = echarts.init(
          document.getElementById('agriculture-chart')
        )
        document.getElementById('agriculture-chart').style.width = 100 + '%'
        document.getElementById('agriculture-chart').style.height = 33 + '%'
        agricultureChart.resize() // 直接加这句即可
      }, 0)
      let agricultureChart = echarts.init(
        document.getElementById('agriculture-chart')
      )

      let firstData = 7.16
      let secondData = 8.29
      let thirdData = 2.45
      let allData = firstData + secondData + thirdData
      let legendData = ['适宜', '一般适宜', '不适宜']
      let valueData = [firstData, secondData, thirdData]
      let colorData = ['#2B63E4', '#8FD3E8', '#F59A23']
      let seriesData = []
      let firstPercent = ((firstData / allData) * 100).toFixed(2)
      let secondPercent = ((secondData / allData) * 100).toFixed(2)
      let thirdPercent = ((thirdData / allData) * 100).toFixed(2)
      let topName = '农业'
      let bottomName = '适宜性'

      for (var i = 0; i < legendData.length; i++) {
        seriesData.push({
          value: valueData[i],
          name: legendData[i],
          itemStyle: {
            normal: {
              color: {
                // 完成的圆环的颜色
                colorStops: [
                  {
                    offset: 0,
                    color: colorData[i] // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: colorData[i] // 100% 处的颜色
                  }
                ]
              },
              label: {
                show: true,
                textStyle: {
                  fontWeight: 'normal',
                  color: '#999',
                  fontSize: '24'
                }
              },
              labelLine: {
                show: true
              },
              barBorderRadius: [30, 30, 0, 0]
            }
          }
        })
      }
      let option = {}
      if (this.chartScreen === 'small') {
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}km² ({d}%)'
          },
          legend: {
            data: ['适宜', '一般适宜', '不适宜'],
            orient: 'vertical',
            icon: 'circle',
            left: '35%',
            align: 'left',
            top: '10%',
            itemWidth: 15,
            itemHeight: 15,
            formatter: function (name) {
              if (name == '适宜') {
                return (
                  name
                  + '：'
                  + '{b|'
                  + firstPercent
                  + '}'
                  + '{b| %}'
                  + '  '
                  + '{a|'
                  + firstData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '一般适宜') {
                return (
                  name
                  + '：'
                  + '{c|'
                  + secondPercent
                  + '}'
                  + '{c| %}'
                  + '  '
                  + '{a|'
                  + secondData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '不适宜') {
                return (
                  name
                  + '：'
                  + '{d|'
                  + thirdPercent
                  + '}'
                  + '{d| %}'
                  + '  '
                  + '{a|'
                  + thirdData
                  + '}'
                  + '{a| 万km²}'
                )
              }
            },
            textStyle: {
              color: '#303030',
              fontSize: 14,
              rich: {
                a: {
                  color: '#303030',
                  fontSize: 16
                },
                b: {
                  color: '#2B63E4',
                  fontSize: 16
                },
                c: {
                  color: '#8FD3E8',
                  fontSize: 16
                },
                d: {
                  color: '#F59A23',
                  fontSize: 16
                }
              }
            }
          },
          series: [
            {
              name: '农业适宜性',
              type: 'pie',
              clockWise: true,
              radius: ['80%', '90%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  //   formatter: "{name|{a}}",
                  //  formatter: function() {
                  //      return '农业'+'适宜性';
                  formatter: function (name) {
                    // 让series 中的文字进行换行
                    return (
                      '{f|' + topName + '}' + '\n' + '{s|' + bottomName + '}'
                    )
                  },
                  rich: {
                    f: {
                      color: '#1D7CE4',
                      fontSize: 24,
                      fontWeight: 'bolder',
                      lineHeight: 30
                    },
                    s: {
                      color: '#1D7CE4',
                      fontSize: 14
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: false,
              data: seriesData
            }
          ]
        }
      } else if (this.chartScreen === 'big') {
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}km² ({d}%)'
          },
          legend: {
            data: ['适宜', '一般适宜', '不适宜'],
            orient: 'vertical',
            icon: 'circle',
            left: '35%',
            align: 'left',
            top: '15%',
            itemWidth: 15,
            itemHeight: 15,
            formatter: function (name) {
              if (name == '适宜') {
                return (
                  name
                  + '：'
                  + '{b|'
                  + firstPercent
                  + '}'
                  + '{b| %}'
                  + '  '
                  + '{a|'
                  + firstData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '一般适宜') {
                return (
                  name
                  + '：'
                  + '{c|'
                  + secondPercent
                  + '}'
                  + '{c| %}'
                  + '  '
                  + '{a|'
                  + secondData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '不适宜') {
                return (
                  name
                  + '：'
                  + '{d|'
                  + thirdPercent
                  + '}'
                  + '{d| %}'
                  + '  '
                  + '{a|'
                  + thirdData
                  + '}'
                  + '{a| 万km²}'
                )
              }
            },
            textStyle: {
              color: '#fff',
              fontSize: 16,
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 18
                },
                b: {
                  color: '#2B63E4',
                  fontSize: 18
                },
                c: {
                  color: '#8FD3E8',
                  fontSize: 18
                },
                d: {
                  color: '#F59A23',
                  fontSize: 18
                }
              }
            }
          },
          series: [
            {
              name: '农业适宜性',
              type: 'pie',
              clockWise: true,
              radius: ['80%', '90%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  //   formatter: "{name|{a}}",
                  //  formatter: function() {
                  //      return '农业'+'适宜性';
                  formatter: function (name) {
                    // 让series 中的文字进行换行
                    return (
                      '{f|' + topName + '}' + '\n' + '{s|' + bottomName + '}'
                    )
                  },
                  rich: {
                    f: {
                      color: '#B9DAFF',
                      fontSize: 24,
                      fontWeight: 'bolder',
                      lineHeight: 30
                    },
                    s: {
                      color: '#B9DAFF',
                      fontSize: 14
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: false,
              data: seriesData
            }
          ]
        }
      }
      agricultureChart.setOption(option, true)
    },
    // 资源环境承载监测--城镇适宜性
    cityDrawLine () {
      setTimeout(() => {
        let cityChart = echarts.init(document.getElementById('city-chart'))
        document.getElementById('city-chart').style.width = 100 + '%'
        document.getElementById('city-chart').style.height = 33 + '%'
        cityChart.resize() // 直接加这句即可
      }, 0)
      let cityChart = echarts.init(document.getElementById('city-chart'))

      let firstData = 6.45
      let secondData = 5.72
      let thirdData = 5.74
      let allData = firstData + secondData + thirdData
      let legendData = ['适宜', '一般适宜', '不适宜']
      let valueData = [firstData, secondData, thirdData]
      let colorData = ['#2B63E4', '#8FD3E8', '#F59A23']
      let seriesData = []
      let firstPercent = ((firstData / allData) * 100).toFixed(2)
      let secondPercent = ((secondData / allData) * 100).toFixed(2)
      let thirdPercent = ((thirdData / allData) * 100).toFixed(2)
      let topName = '城镇'
      let bottomName = '适宜性'

      for (var i = 0; i < legendData.length; i++) {
        seriesData.push({
          value: valueData[i],
          name: legendData[i],
          itemStyle: {
            normal: {
              color: {
                // 完成的圆环的颜色
                colorStops: [
                  {
                    offset: 0,
                    color: colorData[i] // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: colorData[i] // 100% 处的颜色
                  }
                ]
              },
              label: {
                show: true,
                textStyle: {
                  fontWeight: 'normal',
                  color: '#999',
                  fontSize: '24'
                }
              },
              labelLine: {
                show: true
              },
              barBorderRadius: [30, 30, 0, 0]
            }
          }
        })
      }
      let option = {}
      if (this.chartScreen === 'small') {
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}km² ({d}%)'
          },
          legend: {
            data: ['适宜', '一般适宜', '不适宜'],
            orient: 'vertical',
            icon: 'circle',
            left: '35%',
            align: 'left',
            top: '10%',
            itemWidth: 15,
            itemHeight: 15,
            formatter: function (name) {
              if (name == '适宜') {
                return (
                  name
                  + '：'
                  + '{b|'
                  + firstPercent
                  + '}'
                  + '{b| %}'
                  + '  '
                  + '{a|'
                  + firstData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '一般适宜') {
                return (
                  name
                  + '：'
                  + '{c|'
                  + secondPercent
                  + '}'
                  + '{c| %}'
                  + '  '
                  + '{a|'
                  + secondData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '不适宜') {
                return (
                  name
                  + '：'
                  + '{d|'
                  + thirdPercent
                  + '}'
                  + '{d| %}'
                  + '  '
                  + '{a|'
                  + thirdData
                  + '}'
                  + '{a| 万km²}'
                )
              }
            },
            textStyle: {
              color: '#303030',
              fontSize: 14,
              rich: {
                a: {
                  color: '#303030',
                  fontSize: 16
                },
                b: {
                  color: '#2B63E4',
                  fontSize: 16
                },
                c: {
                  color: '#8FD3E8',
                  fontSize: 16
                },
                d: {
                  color: '#F59A23',
                  fontSize: 16
                }
              }
            }
          },
          series: [
            {
              name: '城镇适宜性',
              type: 'pie',
              clockWise: true,
              radius: ['80%', '90%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  //   formatter: "{name|{a}}",
                  //  formatter: function() {
                  //      return '农业'+'适宜性';
                  formatter: function (name) {
                    // 让series 中的文字进行换行
                    return (
                      '{f|' + topName + '}' + '\n' + '{s|' + bottomName + '}'
                    )
                  },
                  rich: {
                    f: {
                      color: '#1D7CE4',
                      fontSize: 24,
                      fontWeight: 'bolder',
                      lineHeight: 30
                    },
                    s: {
                      color: '#1D7CE4',
                      fontSize: 14
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: false,
              data: seriesData
            }
          ]
        }
      } else if (this.chartScreen === 'big') {
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}km² ({d}%)'
          },
          legend: {
            data: ['适宜', '一般适宜', '不适宜'],
            orient: 'vertical',
            icon: 'circle',
            left: '35%',
            align: 'left',
            top: '15%',
            itemWidth: 15,
            itemHeight: 15,
            formatter: function (name) {
              if (name == '适宜') {
                return (
                  name
                  + '：'
                  + '{b|'
                  + firstPercent
                  + '}'
                  + '{b| %}'
                  + '  '
                  + '{a|'
                  + firstData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '一般适宜') {
                return (
                  name
                  + '：'
                  + '{c|'
                  + secondPercent
                  + '}'
                  + '{c| %}'
                  + '  '
                  + '{a|'
                  + secondData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '不适宜') {
                return (
                  name
                  + '：'
                  + '{d|'
                  + thirdPercent
                  + '}'
                  + '{d| %}'
                  + '  '
                  + '{a|'
                  + thirdData
                  + '}'
                  + '{a| 万km²}'
                )
              }
            },
            textStyle: {
              color: '#fff',
              fontSize: 16,
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 18
                },
                b: {
                  color: '#2B63E4',
                  fontSize: 18
                },
                c: {
                  color: '#8FD3E8',
                  fontSize: 18
                },
                d: {
                  color: '#F59A23',
                  fontSize: 18
                }
              }
            }
          },
          series: [
            {
              name: '城镇适宜性',
              type: 'pie',
              clockWise: true,
              radius: ['80%', '90%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  //   formatter: "{name|{a}}",
                  //  formatter: function() {
                  //      return '农业'+'适宜性';
                  formatter: function (name) {
                    // 让series 中的文字进行换行
                    return (
                      '{f|' + topName + '}' + '\n' + '{s|' + bottomName + '}'
                    )
                  },
                  rich: {
                    f: {
                      color: '#B9DAFF',
                      fontSize: 24,
                      fontWeight: 'bolder',
                      lineHeight: 30
                    },
                    s: {
                      color: '#B9DAFF',
                      fontSize: 14
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: false,
              data: seriesData
            }
          ]
        }
      }
      cityChart.setOption(option, true)
    },
    // 资源环境承载监测--生态适宜性
    ecologicalDrawLine () {
      setTimeout(() => {
        let ecologicalChart = echarts.init(
          document.getElementById('ecological-chart')
        )
        document.getElementById('ecological-chart').style.width = 100 + '%'
        document.getElementById('ecological-chart').style.height = 33 + '%'
        ecologicalChart.resize() // 直接加这句即可
      }, 0)
      let ecologicalChart = echarts.init(
        document.getElementById('ecological-chart')
      )

      let firstData = 3.36
      let secondData = 3.76
      let thirdData = 10.8
      let allData = firstData + secondData + thirdData
      let legendData = ['生态一般区', '生态重要区', '生态极重要区']
      let valueData = [firstData, secondData, thirdData]
      let colorData = ['#AFD5FF', '#5FA9FA', '#0066D6']
      let seriesData = []
      let firstPercent = ((firstData / allData) * 100).toFixed(2)
      let secondPercent = ((secondData / allData) * 100).toFixed(2)
      let thirdPercent = ((thirdData / allData) * 100).toFixed(2)
      let topName = '生态'
      let bottomName = '适宜性'

      for (var i = 0; i < legendData.length; i++) {
        seriesData.push({
          value: valueData[i],
          name: legendData[i],
          itemStyle: {
            normal: {
              color: {
                // 完成的圆环的颜色
                colorStops: [
                  {
                    offset: 0,
                    color: colorData[i] // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: colorData[i] // 100% 处的颜色
                  }
                ]
              },
              label: {
                show: true,
                textStyle: {
                  fontWeight: 'normal',
                  color: '#999',
                  fontSize: '24'
                }
              },
              labelLine: {
                show: true
              },
              barBorderRadius: [30, 30, 0, 0]
            }
          }
        })
      }
      let option = {}
      if (this.chartScreen === 'small') {
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}km² ({d}%)'
          },
          legend: {
            data: ['生态一般区', '生态重要区', '生态极重要区'],
            orient: 'vertical',
            icon: 'circle',
            left: '35%',
            align: 'left',
            top: '10%',
            itemWidth: 15,
            itemHeight: 15,
            formatter: function (name) {
              if (name == '生态一般区') {
                return (
                  name
                  + '：'
                  + '{b|'
                  + firstPercent
                  + '}'
                  + '{b| %}'
                  + '  '
                  + '{a|'
                  + firstData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '生态重要区') {
                return (
                  name
                  + '：'
                  + '{c|'
                  + secondPercent
                  + '}'
                  + '{c| %}'
                  + '  '
                  + '{a|'
                  + secondData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '生态极重要区') {
                return (
                  name
                  + '：'
                  + '{d|'
                  + thirdPercent
                  + '}'
                  + '{d| %}'
                  + '  '
                  + '{a|'
                  + thirdData
                  + '}'
                  + '{a| 万km²}'
                )
              }
            },
            textStyle: {
              color: '#303030',
              fontSize: 14,
              rich: {
                a: {
                  color: '#303030',
                  fontSize: 16
                },
                b: {
                  color: '#2B63E4',
                  fontSize: 16
                },
                c: {
                  color: '#8FD3E8',
                  fontSize: 16
                },
                d: {
                  color: '#F59A23',
                  fontSize: 16
                }
              }
            }
          },
          series: [
            {
              name: '生态适宜性',
              type: 'pie',
              clockWise: true,
              radius: ['80%', '90%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  //   formatter: "{name|{a}}",
                  //  formatter: function() {
                  //      return '农业'+'适宜性';
                  formatter: function (name) {
                    // 让series 中的文字进行换行
                    return (
                      '{f|' + topName + '}' + '\n' + '{s|' + bottomName + '}'
                    )
                  },
                  rich: {
                    f: {
                      color: '#1D7CE4',
                      fontSize: 24,
                      fontWeight: 'bolder',
                      lineHeight: 30
                    },
                    s: {
                      color: '#1D7CE4',
                      fontSize: 14
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: false,
              data: seriesData
            }
          ]
        }
      } else if (this.chartScreen === 'big') {
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}km² ({d}%)'
          },
          legend: {
            data: ['生态一般区', '生态重要区', '生态极重要区'],
            orient: 'vertical',
            icon: 'circle',
            left: '35%',
            align: 'left',
            top: '15%',
            itemWidth: 15,
            itemHeight: 15,
            formatter: function (name) {
              if (name == '生态一般区') {
                return (
                  name
                  + '：'
                  + '{b|'
                  + firstPercent
                  + '}'
                  + '{b| %}'
                  + '  '
                  + '{a|'
                  + firstData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '生态重要区') {
                return (
                  name
                  + '：'
                  + '{c|'
                  + secondPercent
                  + '}'
                  + '{c| %}'
                  + '  '
                  + '{a|'
                  + secondData
                  + '}'
                  + '{a| 万km²}'
                )
              }
              if (name == '生态极重要区') {
                return (
                  name
                  + '：'
                  + '{d|'
                  + thirdPercent
                  + '}'
                  + '{d| %}'
                  + '  '
                  + '{a|'
                  + thirdData
                  + '}'
                  + '{a| 万km²}'
                )
              }
            },
            textStyle: {
              color: '#fff',
              fontSize: 16,
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 18
                },
                b: {
                  color: '#2B63E4',
                  fontSize: 18
                },
                c: {
                  color: '#8FD3E8',
                  fontSize: 18
                },
                d: {
                  color: '#F59A23',
                  fontSize: 18
                }
              }
            }
          },
          series: [
            {
              name: '生态适宜性',
              type: 'pie',
              clockWise: true,
              radius: ['80%', '90%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['20%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
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
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  //   formatter: "{name|{a}}",
                  //  formatter: function() {
                  //      return '农业'+'适宜性';
                  formatter: function (name) {
                    // 让series 中的文字进行换行
                    return (
                      '{f|' + topName + '}' + '\n' + '{s|' + bottomName + '}'
                    )
                  },
                  rich: {
                    f: {
                      color: '#B9DAFF',
                      fontSize: 24,
                      fontWeight: 'bolder',
                      lineHeight: 30
                    },
                    s: {
                      color: '#B9DAFF',
                      fontSize: 14
                    }
                  }
                }
                // emphasis: {
                //   show: true,
                //   textStyle: {
                //     fontSize: 24
                //   }
                // }//内圈字体不放大
              },
              hoverAnimation: false,
              data: seriesData
            }
          ]
        }
      }
      ecologicalChart.setOption(option, true)
    },

    // 获取当前时间
    getTime () {
      this.presentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    // 进入全屏
    fullScreen (el) {
      this.$emit('full')
      // this.chartScreen = "big";
    },
    // 退出全屏
    exitFullScreen (el) {
      this.$emit('full')
      this.chartScreen = 'small'

      var el = document,
        cfs
          = el.cancelFullScreen
          || el.webkitCancelFullScreen
          || el.mozCancelFullScreen
          || el.exitFullScreen,
        wscript

      if (typeof cfs !== 'undefined' && cfs) {
        cfs.call(el)

        return
      }

      if (typeof window.ActiveXObject !== 'undefined') {
        wscript = new ActiveXObject('WScript.Shell')

        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },
    // 点击全屏按钮
    screen () {
      screenfull.on('change', () => {
        if (!screenfull.isFullscreen) {
          this.$emit('full')
          this.chartScreen = 'small'
        }
      })
    },
    intoOnemap () {
      this.$router.push({ path: '/onemap' })
    },
    intoMonitor () {
      //   this.$router.push({ path: "/MonitorLargeScreen" });
      let title = '监测大屏'
      let routerPath = 'MonitorLargeScreen'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    intoAnalysis () {
      //   this.$router.push({ path: "/oceandepth?index=1" });
      let title = '土地资源坡度分析'
      let routerPath = 'oceandepth?index=1'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath, query: { index: '1' } })
    },
    intoExamine () {
      //   this.$router.push({ path: "/monitoringcenter" });
      let title = '监控中心'
      let routerPath = 'monitoringcenter'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    intoRepository () {
      //   this.$router.push({ path: "/knowledge" });
      let title = '公共文档'
      let routerPath = 'knowledge'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    intoNosomething () {
      let title = '辅助选址'
      let routerPath = 'Auxiliary'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },

    // 图表自适应
    initEchart () {
      window.addEventListener('resize', () => {
        let agricultureChart = echarts.init(
          document.getElementById('agriculture-chart')
        )
        document.getElementById('agriculture-chart').style.width = 100 + '%'
        document.getElementById('agriculture-chart').style.height = 33 + '%'
        agricultureChart.resize()

        let cityChart = echarts.init(document.getElementById('city-chart'))
        document.getElementById('city-chart').style.width = 100 + '%'
        document.getElementById('city-chart').style.height = 33 + '%'
        cityChart.resize()

        let ecologicalChart = echarts.init(
          document.getElementById('ecological-chart')
        )
        document.getElementById('ecological-chart').style.width = 100 + '%'
        document.getElementById('ecological-chart').style.height = 33 + '%'
        ecologicalChart.resize()
      })
    }
  },
  created () {
    this.mapservices = this.$cloneDeep(MAPSERVICE)
    this.mapAppInitConf = this.$getMapAppInitConf()
    this.mapAppInitConf.map.basemaps = [[]]
    this.mapAppInitConf.map.maskService.disable = false
    this.mapAppInitConf.map.xzqhService.disable = false

    this.widgetConf = this.$getWidgetConf()
    this.widgetConf.widgets = [
      {
        name: 'Legend',
        position: 'bottom-right'
      }
    ]
    this.getTime()
  },
  mounted () {
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', res => {
      if (res === 'leaderShip') {
        this.mapApp = this.$findMapApp(res)
        this.mapservices.forEach((item, index) => {
          if (this.mapApp) {
            this.mapApp.addLayerToMap(item)
          }
        })
      }
    })
    this.$nextTick(function () {
      setTimeout(() => {
        this.agricultureDrawLine()
        this.cityDrawLine()
        this.ecologicalDrawLine()
      }, 1000)
    })
    this.initEchart()

    let that = this
    that.getTime()
    setInterval(function () {
      that.getTime()
    }, 1000)

    // setInterval(function() {
    //   that.agricultureDrawLine();
    //   that.cityDrawLine();
    //   that.ecologicalDrawLine();
    // }, 10000);
  },
  // updated() {
  //   let that = this;
  //   that.getTime();
  //   setInterval(function() {
  //     that.getTime();
  //   }, 1000);
  // },
  beforeDestroy () {
    this.$bus.$off('viewLoaded')
  },
  destroyed () {
    window.removeEventListener(
      'resize',
      () => {
        let agricultureChart = echarts.init(
          document.getElementById('agriculture-chart')
        )
        document.getElementById('agriculture-chart').style.width = 100 + '%'
        document.getElementById('agriculture-chart').style.height = 33 + '%'
        agricultureChart.resize()

        let cityChart = echarts.init(document.getElementById('city-chart'))
        document.getElementById('city-chart').style.width = 100 + '%'
        document.getElementById('city-chart').style.height = 33 + '%'
        cityChart.resize()

        let ecologicalChart = echarts.init(
          document.getElementById('ecological-chart')
        )
        document.getElementById('ecological-chart').style.width = 100 + '%'
        document.getElementById('ecological-chart').style.height = 33 + '%'
        ecologicalChart.resize()
      },
      20
    )
  },
  watch: {
    chartScreen: {
      immediate: true,
      deep: true,
      handler (val) {
        this.agricultureDrawLine()
        this.cityDrawLine()
        this.ecologicalDrawLine()
      }
    }
  }
}
</script>
<style scoped>
.page-body-leader {
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
}
.page-body-leader__custom {
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  background-image: url("../../../assets/images/leader/wgbj.png");
}
#leader-index {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
#leader-index__custom {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url("../../../assets/images/leader/wgbj.png");
}
.leader-top-content {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.leader-top-content__custom {
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("../../../assets/images/leader/topbj.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 40px;
}
.leader-title {
  font-size: 30px;
  line-height: 40px;
  color: #ffffff;
}
.leader-time-box {
  font-size: 16px;
  line-height: 20px;
  position: absolute;
  right: 80px;
  top: 15px;
}
.leader-time-box__custom {
  font-size: 20px;
  line-height: 27px;
  color: #fff;
}
.leader-time-boxIcon {
  width: 5px;
  height: 5px;
  display: inline-block;
  background-color: #1d7ce4;
  margin-right: 10px;
  border-radius: 5px;
  margin-bottom: 3px;
}
.leader-time-boxIcon__custom {
  width: 7px;
  height: 7px;
  display: inline-block;
  background-color: #01ff25;
  margin-right: 10px;
  border-radius: 7px;
  margin-bottom: 3px;
}
.leader-system-icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  position: absolute;
  top: 5px;
  right: 30px;
  cursor: pointer;
}
.leader-system-icon__custom {
  width: 40px;
  height: 40px;
  display: inline-block;
  position: absolute;
  top: 70px;
  right: 30px;
  cursor: pointer;
}

.leader-content {
  display: flex;
  width: 100%;
  height: calc(100% - 40px);
  overflow: hidden;
  padding: 10px 30px 30px;
  box-sizing: border-box;
}
.leader-content__custom {
  display: flex;
  width: 100%;
  height: calc(100% - 90px);
  overflow: hidden;
  padding: 0 30px 30px;
  box-sizing: border-box;
}

.leader-content-Left {
  box-sizing: border-box;
  width: 27.5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 15px;
}

.content-left-top {
  box-sizing: border-box;
  width: 100%;
  height: 24%;
  overflow: hidden;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.content-left-top__custom {
  box-sizing: border-box;
  width: 100%;
  height: 24%;
  overflow: hidden;
  margin-bottom: 30px;
  background-image: url("../../../assets/images/leader/yzt.png");
  background-size: 100% 100%;
}

.content-left-top-box {
  box-sizing: border-box;
  width: 100%;
  height: 78%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
}
.content-left-top-box__custom {
  box-sizing: border-box;
  width: 100%;
  height: 78%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 20px;
}
.content-left-top-text {
  box-sizing: border-box;
  width: 32%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #303030;
  font-size: 16px;
  line-height: 21px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(97, 155, 219, 1);
  margin-right: 2%;
  cursor: pointer;
}
.content-left-top-text__custom {
  box-sizing: border-box;
  width: 32%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  line-height: 21px;
  background-color: #292e48;
  border: 2px solid #224264;
  border-radius: 4px;
  margin-right: 2%;
  cursor: pointer;
}
li.content-left-top-text:nth-child(3n) {
  margin-right: 0px;
}
li.content-left-top-text__custom:nth-child(3n) {
  margin-right: 0px;
}
.modelling-box {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
.modelling-box__custom {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.modelling-content {
  width: 50%;
  height: 30px;
  background: url("../../../assets/images/leader/littleTitle.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 15px;
}
.modelling-content__custom {
  width: 50%;
  height: 30px;
  background: url("../../../assets/images/leader/title.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 15px;
}
.modelling-content span:nth-child(1) {
  width: 4px;
  height: 20px;
  display: block;
  margin: 0 15px 0 5px;
  border-radius: 4px;
}
.modelling-content span:nth-child(2) {
  font-size: 20px;
  line-height: 27px;
  color: #303030;
}
.modelling-content__custom span:nth-child(1) {
  width: 4px;
  height: 20px;
  display: block;
  margin: 0 15px 0 5px;
  border-radius: 4px;
}
.modelling-content__custom span:nth-child(2) {
  font-size: 20px;
  line-height: 27px;
  color: #fff;
}
.modelling-icon {
  width: 24px;
  height: 24px;
  background: url("../../../assets/images/leader/detailIcon.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 20px;
  cursor: pointer;
}

.content-left-middle {
  box-sizing: border-box;
  width: 100%;
  height: 27%;
  overflow: hidden;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.content-left-middle__custom {
  box-sizing: border-box;
  width: 100%;
  height: 27%;
  overflow: hidden;
  margin-bottom: 30px;
  background-image: url("../../../assets/images/leader/jcpgyj.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.el-carousel__item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.el-carousel__item .slideshow-big-box {
  width: 100%;
  padding: 0 40px;
}
.el-carousel__item .slideshow-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.el-carousel__item .slideshow-img {
  width: 30px;
  height: 30px;
  background-image: url("../../../assets/images/leader/yjyes.png");
  margin-top: 5px;
}
.el-carousel__item .slideshow-img__custom {
  width: 30px;
  height: 30px;
  background-image: url("../../../assets/images/leader/dbyes.png");
  margin-top: 5px;
}
.el-carousel__item .slideshow-title {
  color: #f0760c;
  font-size: 16px;
  line-height: 20px;
  margin-left: 10px;
  margin-top: 5px;
}
.el-carousel__item .slideshow-text {
  font-size: 14px;
  line-height: 20px;
  color: #303030;
}
.el-carousel__item .slideshow-number {
  color: #d1d85b;
  font-size: 16px;
  line-height: 20px;
}
.el-carousel__item .slideshow-title__custom {
  color: #ffdca8;
  font-size: 18px;
  line-height: 24px;
  margin-left: 10px;
}
.el-carousel__item .slideshow-text__custom {
  font-size: 16px;
  line-height: 21px;
  color: #fff;
}
.el-carousel__item .slideshow-number__custom {
  color: #d1d85b;
  font-size: 18px;
  line-height: 24px;
}

.content-left-bottom {
  box-sizing: border-box;
  width: 100%;
  height: 49%;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.content-left-bottom__custom {
  box-sizing: border-box;
  width: 100%;
  height: 49%;
  overflow: hidden;
  background: url("../../../assets/images/leader/capgyj.png") no-repeat;
  background-size: 100% calc(100% - 30px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 30px;
}

.content-left-bottom-chart {
  width: 100%;
  height: 85%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.leader-content-middle {
  box-sizing: border-box;
  width: 45%;
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.content-middle-top {
  box-sizing: border-box;
  background: #fff;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  width: 100%;
  height: 75%;
  overflow: hidden;
  margin-bottom: 30px;
  position: relative;
}
.content-middle-top__custom {
  box-sizing: border-box;
  background: url("../../../assets/images/leader/map.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 75%;
  overflow: hidden;
  margin-bottom: 30px;
  position: relative;
}
.el-carousel__item h3 {
  color: #1f7de3;
  font-size: 18px;
  opacity: 0.75;
  line-height: 80px;
  margin: 0 auto;
  letter-spacing: 2px;
}

.content-middle-bottom-bigBox {
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  overflow: hidden;
  background: #fff;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.content-middle-bottom-bigBox__custom {
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  overflow: hidden;
  padding-bottom: 30px;
}
.content-middle-bottom-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-middle-bottom-message {
  box-sizing: border-box;
  width: 18%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  /* box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.1); */
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.content-middle-bottom-message__custom {
  box-sizing: border-box;
  width: 18%;
  height: 100%;
  border-radius: 5px;
  border: 2px solid rgba(0, 53, 111, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.content-middle-bottom-message-title {
  font-size: 16px;
  line-height: 21px;
  color: #303030;
  margin-top: 5px;
}
.content-middle-bottom-message-title__custom {
  font-size: 18px;
  line-height: 24px;
  color: #fff;
  margin-top: 5px;
}
.content-middle-bottom-message-number {
  font-size: 18px;
  line-height: 24px;
  color: #1d7ce4;
}
.content-middle-bottom-message-number__custom {
  font-size: 24px;
  line-height: 30px;
  color: #1a9eff;
}
.content-middle-bottom-message-unit {
  font-size: 14px;
  line-height: 19px;
  color: #1d7ce4;
}
.content-middle-bottom-message-unit__custom {
  font-size: 14px;
  line-height: 19px;
  color: #1a9eff;
}
.content-middle-bottom-message-img0 {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/indexLittle01.png");
  background-size: 100% 100%;
}
.content-middle-bottom-message-img1 {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/indexLittle02.png");
  background-size: 100% 100%;
}
.content-middle-bottom-message-img2 {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/indexLittle03.png");
  background-size: 100% 100%;
}
.content-middle-bottom-message-img3 {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/indexLittle04.png");
  background-size: 100% 100%;
}
.content-middle-bottom-message-img4 {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/indexLittle05.png");
  background-size: 100% 100%;
}
.content-middle-bottom-message-img0__custom {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/index01.png");
  background-size: 100% 100%;
}
.content-middle-bottom-message-img1__custom {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/index02.png");
  background-size: 100% 100%;
}
.content-middle-bottom-message-img2__custom {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/index03.png");
  background-size: 100% 100%;
}
.content-middle-bottom-message-img3__custom {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/index04.png");
  background-size: 100% 100%;
}
.content-middle-bottom-message-img4__custom {
  width: 100%;
  height: 140px;
  background-image: url("../../../assets/images/leader/index05.png");
  background-size: 100% 100%;
}

.leader-content-right {
  box-sizing: border-box;
  width: 27.5%;
  /* flex: 1; */
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.content-right-top {
  box-sizing: border-box;
  width: 100%;
  height: 31%;
  overflow: hidden;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.content-right-top__custom {
  box-sizing: border-box;
  width: 100%;
  height: 31%;
  overflow: hidden;
  margin-bottom: 30px;
  background-image: url("../../../assets/images/leader/cgsc.png");
  background-size: 100% 100%;
}
.content-right-top-box {
  width: 100%;
  height: 78%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.content-right-top-message-special {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #303030;
  font-size: 16px;
  line-height: 21px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 2px solid rgba(97, 155, 219, 1);
}
.content-right-top-message-special__custom {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  line-height: 21px;
  background-color: #292e48;
  border: 2px solid #224264;
  border-radius: 4px;
}
.content-right-top-message-special span:nth-child(2) {
  color: #619bdb;
}
.content-right-top-message-special__custom span:nth-child(2) {
  color: #50b5ff;
}
.content-right-top-message {
  width: 49%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #303030;
  font-size: 16px;
  line-height: 21px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 2px solid rgba(97, 155, 219, 1);
}
.content-right-top-message__custom {
  width: 49%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  font-size: 16px;
  line-height: 21px;
  background-color: #292e48;
  border: 2px solid #224264;
  border-radius: 4px;
}
.content-right-top-message span:nth-child(1) {
  margin-left: 5px;
}
.content-right-top-message span:nth-child(2) {
  color: #619bdb;
}
.content-right-top-message__custom span:nth-child(2) {
  color: #50b5ff;
}

.content-right-middle {
  box-sizing: border-box;
  width: 100%;
  height: 27%;
  margin-bottom: 30px;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content-right-middle__custom {
  box-sizing: border-box;
  width: 100%;
  height: 27%;
  margin-bottom: 30px;
  overflow: hidden;
  background-image: url("../../../assets/images/leader/zsk.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content-right-middle-box {
  width: 100%;
  height: 78%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.content-right-middle-message {
  width: 32%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-right-middle-message-iconBox {
  width: 40px;
}
.content-right-middle-message-icon1 {
  width: 40px;
  height: 40px;
  background-image: url("../../../assets/images/leader/text01.png");
}
.content-right-middle-message-icon2 {
  width: 40px;
  height: 40px;
  background-image: url("../../../assets/images/leader/text02.png");
}
.content-right-middle-message-icon3 {
  width: 40px;
  height: 40px;
  background-image: url("../../../assets/images/leader/text03.png");
}
.content-right-middle-message-icon4 {
  width: 40px;
  height: 40px;
  background-image: url("../../../assets/images/leader/text04.png");
}
.content-right-middle-message-icon5 {
  width: 40px;
  height: 40px;
  background-image: url("../../../assets/images/leader/text05.png");
}
.content-right-middle-message-icon6 {
  width: 40px;
  height: 40px;
  background-image: url("../../../assets/images/leader/text06.png");
}
.content-right-middle-message-textBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 15px;
  /* width: 90px; */
}
.content-right-middle-message-textBox__custom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 15px;
  /* width: 90px; */
}
.content-right-middle-message-textBox span:nth-child(1) {
  color: #303030;
  font-size: 16px;
  line-height: 21px;
}
.content-right-middle-message-textBox span:nth-child(2) {
  color: #1d7ce4;
  font-size: 18px;
  line-height: 24px;
}
.content-right-middle-message-textBox__custom span:nth-child(1) {
  color: #fff;
  font-size: 16px;
  line-height: 21px;
}
.content-right-middle-message-textBox__custom span:nth-child(2) {
  color: #50b5ff;
  font-size: 18px;
  line-height: 24px;
}

.content-right-bottom {
  box-sizing: border-box;
  width: 100%;
  height: 42%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.content-right-bottom__custom {
  box-sizing: border-box;
  width: 100%;
  height: 42%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  background: url("../../../assets/images/leader/fzxz.png") no-repeat;
  background-size: 100% calc(100% - 30px);
  padding-bottom: 30px;
}
.content-right-bottom-table {
  padding: 0 20px;
  margin: 10px auto;
  width: 100%;
  height: 80%;
}
</style>
<style>
/* .page-body .el-input__inner {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
}
.page-body__custom .el-input__inner {
  background-color: #5290f2;
  border-radius: 5px;
  border: 1px solid #5290f2;
  color: #fff;
} */
/* .page-body-leader .el-icon-arrow-up:before {
  color: #fff;
}
.page-body-leader__custom .el-icon-arrow-up:before {
  color: #fff;
} */
.page-body-leader .el-progress__text {
  display: none;
}
.page-body-leader__custom .el-progress__text {
  display: none;
}
.page-body-leader .el-carousel-item {
  width: 100%;
}
.page-body-leader__custom .el-carousel-item {
  width: 100%;
}
.page-body-leader .el-carousel__arrow {
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  height: 87px;
  width: 14px;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 0;
  /* color: #FFF; */
  background-color: transparent;
  position: absolute;
  top: 50%;
  z-index: 10;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  /* text-align: center;
    font-size: 12px; */
}
.page-body-leader__custom .el-carousel__arrow {
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  height: 87px;
  width: 14px;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 0;
  /* color: #FFF; */
  background-color: transparent;
  position: absolute;
  top: 50%;
  z-index: 10;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  /* text-align: center;
    font-size: 12px; */
}
.page-body-leader .el-carousel__arrow--right {
  right: 16px;
  background-image: url("../../../assets/images/leader/rightLittle.png");
}
.page-body-leader__custom .el-carousel__arrow--right {
  right: 16px;
  background-image: url("../../../assets/images/leader/right.png");
}
.page-body-leader .el-icon-arrow-right:before {
  content: "";
}
.page-body-leader__custom .el-icon-arrow-right:before {
  content: "";
}
.page-body-leader .el-carousel__arrow--left {
  left: 16px;
  background: url("../../../assets/images/leader/leftLittle.png") no-repeat;
  background-size: 100% 100%;
}
.page-body-leader__custom .el-carousel__arrow--left {
  left: 16px;
  background: url("../../../assets/images/leader/left.png") no-repeat;
  background-size: 100% 100%;
}
.page-body-leader .el-icon-arrow-left:before {
  content: "";
}
.page-body-leader__custom .el-icon-arrow-left:before {
  content: "";
}
.page-body-leader .el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 16px;
  height: 4px;
  background-color: #066493;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.page-body-leader__custom .el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 16px;
  height: 4px;
  background-color: #066493;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.page-body-leader .el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 14px;
  height: 3px;
  background-color: #066493;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 3px;
}
.page-body-leader__custom .el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 14px;
  height: 3px;
  background-color: #066493;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 3px;
}
.page-body-leader .is-active .el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 24px;
  height: 5px;
  background-color: #089efe;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 5px;
}
.page-body-leader__custom .is-active .el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 24px;
  height: 5px;
  background-color: #089efe;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 5px;
}
.content-middle-top .el-carousel__item {
  visibility: hidden;
}
.content-middle-top__custom .el-carousel__item {
  visibility: hidden;
}
</style>
