<template>
  <el-scrollbar style="height:100%;"
                ref="socieyScrollbar">
    <div class="page-body-nature"
         id="oneChart-other">
      <div class="left-top--nature">
        <div class="left-top-button-other-nature">
          <div class="left-top-button-other-nature-title">规模以上分行业工业增加值和增长速度</div>
        </div>
      </div>
      <div class="page-list-nature EPF-table">
        <div class="switchHeight_box_nature">
          <div class="switchHeight_box_nature_left">
            <div style="width:80px;height:40px;display:flex;">

              <div class="tab-title-chart-nature"
                   :class="{
                'tab-title-chart2-nature': cjActiveName === 'Chart',
                'tab-title-chart4-nature': cjActiveName === 'Table'
              }"
                   @click="turnChart">
                <img src="../../../../assets/images/jcpgyj/project/条形图选中2x.png"
                     alt=""
                     style="width:100%;height:100%;"
                     v-if="cjActiveName === 'Chart'" />
                <img src="../../../../assets/images/jcpgyj/project/条形图未选2x.png"
                     alt=""
                     style="width:100%;height:100%;"
                     v-if="cjActiveName === 'Table'" />
              </div>
              <div class="tab-title-chart-nature"
                   :class="{
                'tab-title-chart1-nature': cjActiveName === 'Table',
                'tab-title-chart3-nature': cjActiveName === 'Chart'
              }"
                   @click="turnTable">
                <img src="../../../../assets/images/jcpgyj/project/表格选中2x.png"
                     alt=""
                     style="width:100%;height:100%;"
                     v-if="cjActiveName === 'Table'" />
                <img src="../../../../assets/images/jcpgyj/project/表格未选2x.png"
                     alt=""
                     style="width:100%;height:100%;"
                     v-if="cjActiveName === 'Chart'" />
              </div>
            </div>

            <div class="filter_title_box"
                 style="margin-left:24px;">
              <span class="filter_title__custom">统计年份：</span>

              <el-date-picker v-model="beginYear"
                              type="year"
                              align="center"
                              :clearable="false"
                              value-format="yyyy"
                              @change="getBeginYear"
                              placeholder="选择开始年份"
                              style="width:180px;">
              </el-date-picker>
              <span style="margin:0 10px;">至</span>
              <el-date-picker v-model="endYear"
                              type="year"
                              align="center"
                              :clearable="false"
                              value-format="yyyy"
                              @change="getEndYear"
                              placeholder="选择结束年份"
                              style="width:180px;">
              </el-date-picker>

            </div>
            <div class="primary_search"
                 @click="searchList()">查询</div>
            <div class="flex-box"
                 v-if="cjActiveName === 'Table'">
              <div class="primary_export"><span @click="exportList()">导出excel</span></div>
            </div>
          </div>
        </div>

        <div class="checkout-big-box"
             v-show="cjActiveName === 'Table'">
          <div class="checkout-box-title">
            信息列筛选：
          </div>
          <div class="checkout-box">
            <el-checkbox-group v-model="checkListIng"
                               @change="handleCheckedTypesChange">
              <el-checkbox v-for="(item, index) in checkList"
                           :key="index"
                           :label="item"
                           :disabled="checkDisList.includes(item)"></el-checkbox>
              <span @click="handleCheckedTypesCancelChange"
                    style="color:#1B74EE;font-size:16px;line-height: 21px;cursor:pointer;margin-left:32px;">全部取消</span>
              <span style="color:#9A9A9A;font-size:16px;line-height: 21px;">（至多可选择7项）</span>
            </el-checkbox-group>
          </div>
        </div>

        <div class="unitTipTable-nature"
             v-if="cjActiveName === 'Table'">
          单位：亿元
        </div>
        <div v-if="cjActiveName === 'Table'">
          <el-table :data="listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    stripe
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border>
            <el-table-column prop="NF"
                             label="年份"
                             min-width="100"
                             align="center"></el-table-column>
            <el-table-column prop="ZJ"
                             label="总计"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('总计')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZJ===''">- -</span>
                <span v-else>{{scope.row.ZJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GYZJZ"
                             label="工业增加值"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('工业增加值')">
              <template slot-scope="scope">
                <span v-if="scope.row.GYZJZ===''">- -</span>
                <span v-else>{{scope.row.GYZJZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZZHZZPY"
                             label="造纸和纸制品业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('造纸和纸制品业')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZZHZZPY===''">- -</span>
                <span v-else>{{scope.row.ZZHZZPY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="MCJGHMZTZCZPY"
                             label="木材加工和木、竹、藤、棕、草制品业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('木材加工和木、竹、藤、棕、草制品业')">
              <template slot-scope="scope">
                <span v-if="scope.row.MCJGHMZTZCZPY===''">- -</span>
                <span v-else>{{scope.row.MCJGHMZTZCZPY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="PGMPYMJQZPHZXY"
                             label="皮革、毛皮、羽毛及其制品和制鞋业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('皮革、毛皮、羽毛及其制品和制鞋业')">
              <template slot-scope="scope">
                <span v-if="scope.row.PGMPYMJQZPHZXY===''">- -</span>
                <span v-else>{{scope.row.PGMPYMJQZPHZXY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FJSKWZPY"
                             label="非金属矿物制品业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('非金属矿物制品业')">
              <template slot-scope="scope">
                <span v-if="scope.row.FJSKWZPY===''">- -</span>
                <span v-else>{{scope.row.FJSKWZPY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YCZPY"
                             label="烟草制品业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('烟草制品业')">
              <template slot-scope="scope">
                <span v-if="scope.row.YCZPY===''">- -</span>
                <span v-else>{{scope.row.YCZPY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JSZPY"
                             label="金属制品业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('金属制品业')">
              <template slot-scope="scope">
                <span v-if="scope.row.JSZPY===''">- -</span>
                <span v-else>{{scope.row.JSZPY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="XJHSLZPY"
                             label="橡胶和塑料制品业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('橡胶和塑料制品业')">
              <template slot-scope="scope">
                <span v-if="scope.row.XJHSLZPY===''">- -</span>
                <span v-else>{{scope.row.XJHSLZPY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="HXXWZZY"
                             label="化学纤维制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('化学纤维制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.HXXWZZY===''">- -</span>
                <span v-else>{{scope.row.HXXWZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JSJTXHQTDZSBZZY"
                             label="计算机、通信和其他电子设备制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('计算机、通信和其他电子设备制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.JSJTXHQTDZSBZZY===''">- -</span>
                <span v-else>{{scope.row.JSJTXHQTDZSBZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="HXYLHHXZPZZY"
                             label="化学原料和化学制品制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('化学原料和化学制品制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.HXYLHHXZPZZY===''">- -</span>
                <span v-else>{{scope.row.HXYLHHXZPZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="TYSBZZY"
                             label="通用设备制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('通用设备制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.TYSBZZY===''">- -</span>
                <span v-else>{{scope.row.TYSBZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="DQJXHQCZZY"
                             label="电气机械和器材制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('电气机械和器材制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.DQJXHQCZZY===''">- -</span>
                <span v-else>{{scope.row.DQJXHQCZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SPZZY"
                             label="食品制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('食品制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.SPZZY===''">- -</span>
                <span v-else>{{scope.row.SPZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JJZZY"
                             label="家具制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('家具制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.JJZZY===''">- -</span>
                <span v-else>{{scope.row.JJZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JYLHJZCZZY"
                             label="酒、饮料和精制茶制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('酒、饮料和精制茶制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.JYLHJZCZZY===''">- -</span>
                <span v-else>{{scope.row.JYLHJZCZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YQYBZZY"
                             label="仪器仪表制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('仪器仪表制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.YQYBZZY===''">- -</span>
                <span v-else>{{scope.row.YQYBZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QCZZY"
                             label="汽车制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('汽车制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.QCZZY===''">- -</span>
                <span v-else>{{scope.row.QCZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZZY"
                             label="制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZZY===''">- -</span>
                <span v-else>{{scope.row.ZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YYZZY"
                             label="医药制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('医药制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.YYZZY===''">- -</span>
                <span v-else>{{scope.row.YYZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZYSBZZY"
                             label="专用设备制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('专用设备制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZYSBZZY===''">- -</span>
                <span v-else>{{scope.row.ZYSBZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QTZZY"
                             label="其他制造业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('其他制造业')">
              <template slot-scope="scope">
                <span v-if="scope.row.QTZZY===''">- -</span>
                <span v-else>{{scope.row.QTZZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="NFSPJGY"
                             label="农副食品加工业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('农副食品加工业')">
              <template slot-scope="scope">
                <span v-if="scope.row.NFSPJGY===''">- -</span>
                <span v-else>{{scope.row.NFSPJGY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="HSJSYLHYYJGY"
                             label="黑色金属冶炼和压延加工业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('黑色金属冶炼和压延加工业')">
              <template slot-scope="scope">
                <span v-if="scope.row.HSJSYLHYYJGY===''">- -</span>
                <span v-else>{{scope.row.HSJSYLHYYJGY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YSJSYLHYYJGY"
                             label="有色金属冶炼和压延加工业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('有色金属冶炼和压延加工业')">
              <template slot-scope="scope">
                <span v-if="scope.row.YSJSYLHYYJGY===''">- -</span>
                <span v-else>{{scope.row.YSJSYLHYYJGY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SYJGLJHHRLJGY"
                             label="石油加工、炼焦和核燃料加工业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('石油加工、炼焦和核燃料加工业')">
              <template slot-scope="scope">
                <span v-if="scope.row.SYJGLJHHRLJGY===''">- -</span>
                <span v-else>{{scope.row.SYJGLJHHRLJGY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FJSKCXY"
                             label="非金属矿采选业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('非金属矿采选业')">
              <template slot-scope="scope">
                <span v-if="scope.row.FJSKCXY===''">- -</span>
                <span v-else>{{scope.row.FJSKCXY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="HSJSKCXY"
                             label="黑色金属矿采选业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('黑色金属矿采选业')">
              <template slot-scope="scope">
                <span v-if="scope.row.HSJSKCXY===''">- -</span>
                <span v-else>{{scope.row.HSJSKCXY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YSJSKCXY"
                             label="有色金属矿采选业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('有色金属矿采选业')">
              <template slot-scope="scope">
                <span v-if="scope.row.YSJSKCXY===''">- -</span>
                <span v-else>{{scope.row.YSJSKCXY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="RQSCHGYY"
                             label="燃气生产和供应业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('燃气生产和供应业')">
              <template slot-scope="scope">
                <span v-if="scope.row.RQSCHGYY===''">- -</span>
                <span v-else>{{scope.row.RQSCHGYY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="DLRLSCHGYY"
                             label="电力、热力生产和供应业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('电力、热力生产和供应业')">
              <template slot-scope="scope">
                <span v-if="scope.row.DLRLSCHGYY===''">- -</span>
                <span v-else>{{scope.row.DLRLSCHGYY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SDSCHGYY"
                             label="水的生产和供应业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('水的生产和供应业')">
              <template slot-scope="scope">
                <span v-if="scope.row.SDSCHGYY===''">- -</span>
                <span v-else>{{scope.row.SDSCHGYY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SYHTRQKCY"
                             label="石油和天然气开采业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('石油和天然气开采业')">
              <template slot-scope="scope">
                <span v-if="scope.row.SYHTRQKCY===''">- -</span>
                <span v-else>{{scope.row.SYHTRQKCY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="MTKCHXXY"
                             label="煤炭开采和洗选业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('煤炭开采和洗选业')">
              <template slot-scope="scope">
                <span v-if="scope.row.MTKCHXXY===''">- -</span>
                <span v-else>{{scope.row.MTKCHXXY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="KCFZHD"
                             label="开采辅助活动"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('开采辅助活动')">
              <template slot-scope="scope">
                <span v-if="scope.row.KCFZHD===''">- -</span>
                <span v-else>{{scope.row.KCFZHD}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="QTCKY"
                             label="其他采矿业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('其他采矿业')">
              <template slot-scope="scope">
                <span v-if="scope.row.QTCKY===''">- -</span>
                <span v-else>{{scope.row.QTCKY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FZY"
                             label="纺织业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('纺织业')">
              <template slot-scope="scope">
                <span v-if="scope.row.FZY===''">- -</span>
                <span v-else>{{scope.row.FZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FZFZFSY"
                             label="纺织服装、服饰业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('纺织服装、服饰业')">
              <template slot-scope="scope">
                <span v-if="scope.row.FZFZFSY===''">- -</span>
                <span v-else>{{scope.row.FZFZFSY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="TLCBHKHTHQTYSSB"
                             label="铁路、船舶、航空航天和其他运输设备"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('铁路、船舶、航空航天和其他运输设备')">
              <template slot-scope="scope">
                <span v-if="scope.row.TLCBHKHTHQTYSSB===''">- -</span>
                <span v-else>{{scope.row.TLCBHKHTHQTYSSB}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JSZPJXHSBXLY"
                             label="金属制品、机械和设备修理业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('金属制品、机械和设备修理业')">
              <template slot-scope="scope">
                <span v-if="scope.row.JSZPJXHSBXLY===''">- -</span>
                <span v-else>{{scope.row.JSZPJXHSBXLY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FQZYZHLYY"
                             label="废弃资源综合利用业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('废弃资源综合利用业')">
              <template slot-scope="scope">
                <span v-if="scope.row.FQZYZHLYY===''">- -</span>
                <span v-else>{{scope.row.FQZYZHLYY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="YSHJLMJFZY"
                             label="印刷和记录媒介复制业"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('印刷和记录媒介复制业')">
              <template slot-scope="scope">
                <span v-if="scope.row.YSHJLMJFZY===''">- -</span>
                <span v-else>{{scope.row.YSHJLMJFZY}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="TBZZ"
                             label="同比增长"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('同比增长')">
              <template slot-scope="scope">
                <span v-if="scope.row.TBZZ===''">- -</span>
                <span v-else>{{scope.row.TBZZ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="RKSJ"
                             label="入库时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('入库时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.RKSJ===''">- -</span>
                <span v-else>{{scope.row.RKSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GXSJ"
                             label="更新时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('更新时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.GXSJ===''">- -</span>
                <span v-else>{{scope.row.GXSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="PCH"
                             label="批次号"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('批次号')">
              <template slot-scope="scope">
                <span v-if="scope.row.PCH===''">- -</span>
                <span v-else>{{scope.row.PCH}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZLSJ"
                             label="增量时间"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('增量时间')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZLSJ===''">- -</span>
                <span v-else>{{scope.row.ZLSJ}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ZLBS"
                             label="增量标识"
                             min-width="100"
                             align="center"
                             v-if="checkListIng.includes('增量标识')">
              <template slot-scope="scope">
                <span v-if="scope.row.ZLBS===''">- -</span>
                <span v-else>{{scope.row.ZLBS}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin:50px 0;text-align:right;">
            <el-pagination background
                           layout="total, prev, pager, next,sizes,jumper"
                           :page-sizes="[5, 10, 15, 20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="this.listData.length"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </div>
        <!-- 第一个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForBar1 === true }"
                 @click="revealBar1">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="barChart1"
               ref="barChart1"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第二个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">

            <el-popover placement="bottom"
                        width="300"
                        trigger="click"
                        style="margin-right:16px;"
                        v-model="visible1">
              <el-checkbox-group v-model="checkListIngForChart1"
                                 @change="handleChangeChartData1"
                                 style="margin-bottom:10px;display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start;">
                <el-checkbox v-for="(item,index) in checkListForChart1"
                             :key="index"
                             :label="item"
                             :disabled="checkDisListForChart1.includes(item)"></el-checkbox>
              </el-checkbox-group>
              <el-checkbox v-model="checkedForChart1"
                           @change="handleCheckedCancel1">全部取消（至多可选择6项）</el-checkbox>
              <el-button slot="reference"
                         size="small">筛选统计内容</el-button>
            </el-popover>

            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine12 === true }"
                 @click="revealLine12">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart12"
               ref="lineChart12"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第三个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">

            <el-popover placement="bottom"
                        width="300"
                        trigger="click"
                        style="margin-right:16px;"
                        v-model="visible2">
              <el-checkbox-group v-model="checkListIngForChart2"
                                 @change="handleChangeChartData2"
                                 style="margin-bottom:10px;display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start;">
                <el-checkbox v-for="(item,index) in checkListForChart2"
                             :key="index"
                             :label="item"
                             :disabled="checkDisListForChart2.includes(item)"></el-checkbox>
              </el-checkbox-group>
              <el-checkbox v-model="checkedForChart2"
                           @change="handleCheckedCancel2">全部取消（至多可选择6项）</el-checkbox>
              <el-button slot="reference"
                         size="small">筛选统计内容</el-button>
            </el-popover>

            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine13 === true }"
                 @click="revealLine13">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart13"
               ref="lineChart13"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第四个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine3 === true }"
                 @click="revealLine3">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart3"
               ref="lineChart3"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第五个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine4 === true }"
                 @click="revealLine4">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart4"
               ref="lineChart4"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第六个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine5 === true }"
                 @click="revealLine5">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart5"
               ref="lineChart5"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第七个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine6 === true }"
                 @click="revealLine6">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart6"
               ref="lineChart6"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第八个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine7 === true }"
                 @click="revealLine7">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart7"
               ref="lineChart7"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第九个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine8 === true }"
                 @click="revealLine8">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart8"
               ref="lineChart8"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第十个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine9 === true }"
                 @click="revealLine9">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart9"
               ref="lineChart9"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第十一个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine10 === true }"
                 @click="revealLine10">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart10"
               ref="lineChart10"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>
        <!-- 第十二个表 -->
        <div class="unitTipChart-nature"
             v-if="cjActiveName === 'Chart'">
          <div>单位：亿元</div>
          <div class="index-map-button-nature-bigBox">
            <div class="index-map-button-nature"
                 :class="{ active: showDataNumberForLine11 === true }"
                 @click="revealLine11">
              显示数据
            </div>
          </div>
        </div>
        <div v-if="cjActiveName === 'Chart'"
             style="width:100%;height:550px;"
             v-loading="loading"
             element-loading-text="正在加载图表数据, 请稍候">
          <div id="lineChart11"
               ref="lineChart11"
               style="width:100%;height:100%;"
               v-show="isShowData"></div>
          <div class="chartImage"
               v-show="!isShowData">
            <img src="../../../../assets/noEchartData.png"
                 alt="">
          </div>
        </div>

      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import complexity from './js/complexityChart'
import moment from 'moment'

export default {
  mixins: [complexity],
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      params: {
        NF: ''
      },
      showYear: [],
      loading: true,

      checkList: [], // 全部多选内容
      checkDisList: ['年份'], // 默认+判断禁用内容
      checkListIng: [], // 选中内容
      checked: true, // 是否禁用
      // 第一个筛选框
      checkListForChart1: [], // 全部多选内容
      checkDisListForChart1: [], // 禁用内容
      checkListIngForChart1: [], // 选中内容
      checkedForChart1: false,

      legendDataMR1: [],
      seriesAllDataMR1: [],
      change1: false,

      checkAllData1: [], // 后台数据
      checkChartData1: [], // 图表展示数据

      visible1: false,
      // 第二个筛选框
      checkListForChart2: [], // 全部多选内容
      checkDisListForChart2: [], // 禁用内容
      checkListIngForChart2: [], // 选中内容
      checkedForChart2: false,

      legendDataMR2: [],
      seriesAllDataMR2: [],
      change2: false,

      checkAllData2: [], // 后台数据
      checkChartData2: [], // 图表展示数据

      visible2: false
    }
  },
  methods: {
    turnChart () {
      this.cjActiveName = 'Chart'
      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
          this.lineDrawLine12()
          this.lineDrawLine13()
          this.lineDrawLine3()
          this.lineDrawLine4()
          this.lineDrawLine5()
          this.lineDrawLine6()
          this.lineDrawLine7()
          this.lineDrawLine8()
          this.lineDrawLine9()
          this.lineDrawLine10()
          this.lineDrawLine11()
        }, 0)
      })
    },
    searchList () {
      if ((this.beginYear !== '' && this.endYear === '') || (this.beginYear === '' && this.endYear !== '')) {
        this.$message.error('开始年份 或 结束年份 存在空值')
        return
      }
      if (this.beginYear === '' && this.endYear === '') return

      let endYear = Number(this.endYear)
      let beginYear = Number(this.beginYear)
      let arrYear = [] // 查询年份

      if (this.beginYear && this.endYear) {
        let section = endYear - beginYear // 年份差变量
        for (let i = 0; i <= section; i++) {
          arrYear.push(endYear--)
        }
      }
      this.showYear = arrYear.reverse()

      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getEconomyData(this.showYear)
    },
    exportList () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../../excel/Export2Excel.js')
        const tHeader = ['年份', '总计', '工业增加值', '造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业', '非金属矿物制品业', '烟草制品业', '金属制品业', '橡胶和塑料制品业', '化学纤维制造业', '计算机、通信和其他电子设备制造业', '化学原料和化学制品制造业', '通用设备制造业', '电气机械和器材制造业', '食品制造业', '家具制造业', '酒、饮料和精制茶制造业', '仪器仪表制造业', '汽车制造业', '制造业', '医药制造业', '专用设备制造业', '其他制造业', '农副食品加工业', '黑色金属冶炼和压延加工业', '有色金属冶炼和压延加工业', '石油加工、炼焦和核燃料加工业', '非金属矿采选业', '黑色金属矿采选业', '有色金属矿采选业', '燃气生产和供应业', '电力、热力生产和供应业', '水的生产和供应业', '石油和天然气开采业', '煤炭开采和洗选业', '开采辅助活动', '其他采矿业', '纺织业', '纺织服装、服饰业', '铁路、船舶、航空航天和其他运输设备', '金属制品、机械和设备修理业', '废弃资源综合利用业', '印刷和记录媒介复制业', '同比增长', '入库时间', '更新时间', '批次号', '增量时间', '增量标识']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['NF', 'ZJ', 'GYZJZ', 'ZZHZZPY', 'MCJGHMZTZCZPY', 'PGMPYMJQZPHZXY', 'FJSKWZPY', 'YCZPY', 'JSZPY', 'XJHSLZPY', 'HXXWZZY', 'JSJTXHQTDZSBZZY', 'HXYLHHXZPZZY', 'TYSBZZY', 'DQJXHQCZZY', 'SPZZY', 'JJZZY', 'JYLHJZCZZY', 'YQYBZZY', 'QCZZY', 'ZZY', 'YYZZY', 'ZYSBZZY', 'QTZZY', 'NFSPJGY', 'HSJSYLHYYJGY', 'YSJSYLHYYJGY', 'SYJGLJHHRLJGY', 'FJSKCXY', 'HSJSKCXY', 'YSJSKCXY', 'RQSCHGYY', 'DLRLSCHGYY', 'SDSCHGYY', 'SYHTRQKCY', 'MTKCHXXY', 'KCFZHD', 'QTCKY', 'FZY', 'FZFZFSY', 'TLCBHKHTHQTYSSB', 'JSZPJXHSBXLY', 'FQZYZHLYY', 'YSHJLMJFZY', 'TBZZ', 'RKSJ', 'GXSJ', 'PCH', 'ZLSJ', 'ZLBS']
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.listData // 把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '规模以上分行业工业增加值和增长速度')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleChangeChartData1 (value) {
      this.change1 = true
      function searchKeyValue (lists, key, value) {
        let res = lists.filter(item => item[key] == value)
        return res
      }

      this.checkChartData1 = value.map((val, index) => {
        let changeData = searchKeyValue(this.checkAllData1, 'label', val)
        return changeData
      })

      if (this.checkListIngForChart1.length === 6) {
        this.checkDisListForChart1 = this.checkListForChart1.filter(item => {
          return this.checkListIngForChart1.indexOf(item) === -1
        })
      } else {
        this.checkDisListForChart1 = []
      }
    },
    handleCheckedCancel1 () {
      this.change1 = false
      this.checkDisListForChart1 = []
      this.checkListIngForChart1 = []
      this.legendDataMR1 = []
      this.seriesAllDataMR1 = []
    },
    handleChangeChartData2 (value) {
      this.change2 = true
      function searchKeyValue (lists, key, value) {
        let res = lists.filter(item => item[key] == value)
        return res
      }

      this.checkChartData2 = value.map((val, index) => {
        let changeData = searchKeyValue(this.checkAllData2, 'label', val)
        return changeData
      })

      if (this.checkListIngForChart2.length === 6) {
        this.checkDisListForChart2 = this.checkListForChart2.filter(item => {
          return this.checkListIngForChart2.indexOf(item) === -1
        })
      } else {
        this.checkDisListForChart2 = []
      }
    },
    handleCheckedCancel2 () {
      this.change2 = false
      this.checkDisListForChart2 = []
      this.checkListIngForChart2 = []
      this.legendDataMR2 = []
      this.seriesAllDataMR2 = []
    },
    handleCheckedTypesChange (value) {
      if (this.checkListIng.length === 8) {
        this.checkDisList = this.checkList.filter(item => {
          return this.checkListIng.indexOf(item) === -1
        })
        this.checkDisList.unshift('年份')
      } else {
        this.checkDisList = ['年份']
      }
    },
    handleCheckedTypesCancelChange () {
      this.checkDisList = ['年份']
      this.checkListIng = ['年份']
    },
    async getEconomyData (yaerList) {
      this.loading = true
      this.xzhouData = []
      this.seriesAllDataForBar1 = []
      this.seriesAllDataForLine1 = []
      this.seriesAllDataForLine2 = []
      this.seriesAllDataForLine3 = []
      this.seriesAllDataForLine4 = []
      this.seriesAllDataForLine5 = []
      this.seriesAllDataForLine6 = []
      this.seriesAllDataForLine7 = []
      this.seriesAllDataForLine8 = []
      this.seriesAllDataForLine9 = []
      this.seriesAllDataForLine10 = []
      this.seriesAllDataForLine11 = []

      let chartData = []
      for (let i = 0; i < yaerList.length; i++) {
        let res = await this.$post(`/epf-third-part/oneBatch/GMYSFXYGYZJZHZZSD?NF=${yaerList[i]}`)
        if (res.code === 0) {
          let data = res.result[0]
          chartData.push(data)
        } else {
          this.loading = false
          this.isShowData = false
          this.listData = []
          // this.checkList = ['年份', '总计', '工业增加值', '造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业', '非金属矿物制品业', '烟草制品业', '金属制品业', '橡胶和塑料制品业', '化学纤维制造业', '计算机、通信和其他电子设备制造业', '化学原料和化学制品制造业', '通用设备制造业', '电气机械和器材制造业', '食品制造业', '家具制造业', '酒、饮料和精制茶制造业', '仪器仪表制造业', '汽车制造业', '制造业', '医药制造业', '专用设备制造业', '其他制造业', '农副食品加工业', '黑色金属冶炼和压延加工业', '有色金属冶炼和压延加工业', '石油加工、炼焦和核燃料加工业', '非金属矿采选业', '黑色金属矿采选业', '有色金属矿采选业', '燃气生产和供应业', '电力、热力生产和供应业', '水的生产和供应业', '石油和天然气开采业', '煤炭开采和洗选业', '开采辅助活动', '其他采矿业', '纺织业', '纺织服装、服饰业', '铁路、船舶、航空航天和其他运输设备', '金属制品、机械和设备修理业', '废弃资源综合利用业', '印刷和记录媒介复制业', '同比增长', '入库时间', '更新时间', '批次号', '增量时间', '增量标识']
          // this.checkListIng = ['年份', '总计', '工业增加值', '造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业', '非金属矿物制品业', '更新时间']
          this.$message.error(res.msg)
          return
        }
      }
      chartData = chartData.filter(res => {
        return res !== undefined
      })

      for (let key in chartData) {
        chartData[key]['RankYear'] = parseInt(chartData[key].NF)
        if (chartData[key].NF.length > 4) {
          chartData[key]['RankYearChange'] = 0
        } else {
          chartData[key]['RankYearChange'] = 1
        }
      }

      chartData.sort(function (a, b) {
        if (a.RankYear === b.RankYear) { // 如果RankYear相同，按照RankYearChange的降序
          return b.RankYearChange - a.RankYearChange
        } else {
          return a.RankYear - b.RankYear
        }
      })

      this.loading = false
      this.listData = chartData
      // this.checkList = ['年份', '总计', '工业增加值', '造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业', '非金属矿物制品业', '烟草制品业', '金属制品业', '橡胶和塑料制品业', '化学纤维制造业', '计算机、通信和其他电子设备制造业', '化学原料和化学制品制造业', '通用设备制造业', '电气机械和器材制造业', '食品制造业', '家具制造业', '酒、饮料和精制茶制造业', '仪器仪表制造业', '汽车制造业', '制造业', '医药制造业', '专用设备制造业', '其他制造业', '农副食品加工业', '黑色金属冶炼和压延加工业', '有色金属冶炼和压延加工业', '石油加工、炼焦和核燃料加工业', '非金属矿采选业', '黑色金属矿采选业', '有色金属矿采选业', '燃气生产和供应业', '电力、热力生产和供应业', '水的生产和供应业', '石油和天然气开采业', '煤炭开采和洗选业', '开采辅助活动', '其他采矿业', '纺织业', '纺织服装、服饰业', '铁路、船舶、航空航天和其他运输设备', '金属制品、机械和设备修理业', '废弃资源综合利用业', '印刷和记录媒介复制业', '同比增长', '入库时间', '更新时间', '批次号', '增量时间', '增量标识']
      // this.checkListIng = ['年份', '总计', '工业增加值', '造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业', '非金属矿物制品业', '更新时间']
      this.xzhouData = [] // x轴数据
      this.legendDataForBar1 = [] // 图例数据
      this.legendDataForLine1 = [] // 图例数据
      this.legendDataForLine2 = [] // 图例数据
      this.legendDataForLine3 = [] // 图例数据
      this.legendDataForLine4 = [] // 图例数据
      this.legendDataForLine5 = [] // 图例数据
      this.legendDataForLine6 = [] // 图例数据
      this.legendDataForLine7 = [] // 图例数据
      this.legendDataForLine8 = [] // 图例数据
      this.legendDataForLine9 = [] // 图例数据
      this.legendDataForLine10 = [] // 图例数据
      this.legendDataForLine11 = [] // 图例数据

      this.legendDataMR1 = []// 默认图例
      this.seriesAllDataMR1 = []// 默认图表数据
      this.legendDataMR2 = []// 默认图例
      this.seriesAllDataMR2 = []// 默认图表数据

      // 展示的数据
      let data0 = []
      let data1 = []
      let data2 = []
      let data3 = []
      let data4 = []
      let data5 = []
      let data6 = []
      let data7 = []
      let data8 = []
      let data9 = []
      let data10 = []
      let data11 = []
      let data12 = []
      let data13 = []
      let data14 = []
      let data15 = []
      let data16 = []
      let data17 = []
      // let data18 = []
      let data19 = []
      let data20 = []
      let data21 = []
      let data22 = []
      let data23 = []
      let data24 = []
      let data25 = []
      let data26 = []
      let data27 = []
      let data28 = []
      let data29 = []
      let data30 = []
      let data31 = []
      let data32 = []
      let data33 = []
      let data34 = []
      let data35 = []
      let data36 = []
      let data37 = []
      let data38 = []
      let data39 = []
      let data40 = []
      let data41 = []
      let data42 = []

      for (var key in chartData) {
        data0.push(Number(chartData[key].GYZJZ).toFixed(2))//	工业增加值

        data1.push(Number(chartData[key].ZZHZZPY).toFixed(2))// 造纸和纸制品业
        data2.push(Number(chartData[key].MCJGHMZTZCZPY).toFixed(2))// 木材加工和木、竹、藤、棕、草制品业
        data3.push(Number(chartData[key].PGMPYMJQZPHZXY).toFixed(2))// 皮革、毛皮、羽毛及其制品和制鞋业
        data4.push(Number(chartData[key].FJSKWZPY).toFixed(2))// 非金属矿物制品业
        data5.push(Number(chartData[key].YCZPY).toFixed(2))// 烟草制品业
        data6.push(Number(chartData[key].JSZPY).toFixed(2))// 金属制品业
        data7.push(Number(chartData[key].XJHSLZPY).toFixed(2))// 橡胶和塑料制品业

        this.checkAllData1 = [
          { label: '造纸和纸制品业', value: data1 },
          { label: '木材加工和木、竹、藤、棕、草制品业', value: data2 },
          { label: '皮革、毛皮、羽毛及其制品和制鞋业', value: data3 },
          { label: '非金属矿物制品业', value: data4 },
          { label: '烟草制品业', value: data5 },
          { label: '金属制品业', value: data6 },
          { label: '橡胶和塑料制品业', value: data7 }
        ]

        data8.push(Number(chartData[key].HXXWZZY).toFixed(2))// 化学纤维制造业
        data9.push(Number(chartData[key].JSJTXHQTDZSBZZY).toFixed(2))// 计算机、通信和其他电子设备制造业
        data10.push(Number(chartData[key].HXYLHHXZPZZY).toFixed(2))// 化学原料和化学制品制造业
        data11.push(Number(chartData[key].TYSBZZY).toFixed(2))// 通用设备制造业
        data12.push(Number(chartData[key].DQJXHQCZZY).toFixed(2))// 电气机械和器材制造业
        data13.push(Number(chartData[key].SPZZY).toFixed(2))// 食品制造业
        data14.push(Number(chartData[key].JJZZY).toFixed(2))// 家具制造业
        data15.push(Number(chartData[key].JYLHJZCZZY).toFixed(2))// 酒、饮料和精制茶制造业
        data16.push(Number(chartData[key].YQYBZZY).toFixed(2))// 仪器仪表制造业
        data17.push(Number(chartData[key].QCZZY).toFixed(2))// 汽车制造业
        // data18.push(Number(chartData[key]['WJ、GM、TYHYLYPZZY']).toFixed(2))// 文教、工美、体育和娱乐用品制造业
        data19.push(Number(chartData[key].ZZY).toFixed(2))// 制造业
        data20.push(Number(chartData[key].YYZZY).toFixed(2))// 医药制造业
        data21.push(Number(chartData[key].ZYSBZZY).toFixed(2))// 专用设备制造业
        data22.push(Number(chartData[key].QTZZY).toFixed(2))// 其他制造业

        this.checkAllData2 = [
          { label: '化学纤维制造业', value: data8 },
          { label: '计算机、通信和其他电子设备制造业', value: data9 },
          { label: '化学原料和化学制品制造业', value: data10 },
          { label: '通用设备制造业', value: data11 },
          { label: '电气机械和器材制造业', value: data12 },
          { label: '食品制造业', value: data13 },
          { label: '家具制造业', value: data14 },
          { label: '酒、饮料和精制茶制造业', value: data15 },
          { label: '仪器仪表制造业', value: data16 },
          { label: '汽车制造业', value: data17 },
          { label: '制造业', value: data19 },
          { label: '医药制造业', value: data20 },
          { label: '专用设备制造业', value: data21 },
          { label: '其他制造业', value: data22 }
        ]

        data23.push(Number(chartData[key].NFSPJGY).toFixed(2))// 农副食品加工业
        data24.push(Number(chartData[key].HSJSYLHYYJGY).toFixed(2))// 黑色金属冶炼和压延加工业
        data25.push(Number(chartData[key].YSJSYLHYYJGY).toFixed(2))// 有色金属冶炼和压延加工业
        data26.push(Number(chartData[key].SYJGLJHHRLJGY).toFixed(2))// 石油加工、炼焦和核燃料加工业

        data27.push(Number(chartData[key].FJSKCXY).toFixed(2))// 非金属矿采选业
        data28.push(Number(chartData[key].HSJSKCXY).toFixed(2))// 黑色金属矿采选业
        data29.push(Number(chartData[key].YSJSKCXY).toFixed(2))// 有色金属矿采选业

        data30.push(Number(chartData[key].RQSCHGYY).toFixed(2))// 燃气生产和供应业
        data31.push(Number(chartData[key].DLRLSCHGYY).toFixed(2))// 电力、热力生产和供应业
        data32.push(Number(chartData[key].SDSCHGYY).toFixed(2))// 水的生产和供应业

        data33.push(Number(chartData[key].SYHTRQKCY).toFixed(2))// 石油和天然气开采业
        data34.push(Number(chartData[key].MTKCHXXY).toFixed(2))// 煤炭开采和洗选业
        data35.push(Number(chartData[key].KCFZHD).toFixed(2))// 开采辅助活动
        data36.push(Number(chartData[key].QTCKY).toFixed(2))// 其他采矿业

        data37.push(Number(chartData[key].FZY).toFixed(2))// 纺织业
        data38.push(Number(chartData[key].FZFZFSY).toFixed(2))// 纺织服装、服饰业

        data39.push(Number(chartData[key].TLCBHKHTHQTYSSB).toFixed(2))// 铁路、船舶、航空航天和其他运输设备

        data40.push(Number(chartData[key].JSZPJXHSBXLY).toFixed(2))// 金属制品、机械和设备修理业

        data41.push(Number(chartData[key].FQZYZHLYY).toFixed(2))// 废弃资源综合利用业

        data42.push(Number(chartData[key].YSHJLMJFZY).toFixed(2))// 印刷和记录媒介复制业

        this.xzhouData.push(chartData[key].NF)// x轴年份数据
      }

      if (this.xzhouData.length === 0) {
        this.legendDataForBar1 = []
        this.legendDataForLine1 = []
        this.legendDataForLine2 = []
        this.legendDataForLine3 = []
        this.legendDataForLine4 = []
        this.legendDataForLine5 = []
        this.legendDataForLine6 = []
        this.legendDataForLine7 = []
        this.legendDataForLine8 = []
        this.legendDataForLine9 = []
        this.legendDataForLine10 = []
        this.legendDataForLine11 = []
        this.isShowData = false
      } else {
        this.legendDataForBar1 = ['工业增加值']
        this.legendDataForLine1 = ['造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业', '非金属矿物制品业', '烟草制品业', '金属制品业', '橡胶和塑料制品业']
        this.checkListForChart1 = this.legendDataForLine1
        this.legendDataForLine2 = ['化学纤维制造业', '计算机、通信和其他电子设备制造业', '化学原料和化学制品制造业', '通用设备制造业', '电气机械和器材制造业', '食品制造业', '家具制造业', '酒、饮料和精制茶制造业', '仪器仪表制造业', '汽车制造业', '制造业', '医药制造业', '专用设备制造业', '其他制造业']
        this.checkListForChart2 = this.legendDataForLine2
        this.legendDataForLine3 = ['农副食品加工业', '黑色金属冶炼和压延加工业', '有色金属冶炼和压延加工业', '石油加工、炼焦和核燃料加工业']
        this.legendDataForLine4 = ['非金属矿采选业', '黑色金属矿采选业', '有色金属矿采选业']
        this.legendDataForLine5 = ['燃气生产和供应业', '电力、热力生产和供应业', '水的生产和供应业']
        this.legendDataForLine6 = ['石油和天然气开采业', '煤炭开采和洗选业', '开采辅助活动', '其他采矿业']
        this.legendDataForLine7 = ['纺织业', '纺织服装、服饰业']
        this.legendDataForLine8 = ['铁路、船舶、航空航天和其他运输设备']
        this.legendDataForLine9 = ['金属制品、机械和设备修理业']
        this.legendDataForLine10 = ['废弃资源综合利用业']
        this.legendDataForLine11 = ['印刷和记录媒介复制业']
        this.isShowData = true
      }

      this.seriesAllDataForBar1.push(data0)

      this.seriesAllDataForLine1.push(data1, data2, data3, data4, data5, data6, data7)
      // 默认展示3条数据
      this.legendDataMR1 = ['造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业']
      this.checkListIngForChart1 = ['造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业']
      this.seriesAllDataMR1.push(data1, data2, data3)

      this.seriesAllDataForLine2.push(data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data19, data20, data21, data22)
      // 默认展示3条数据
      this.legendDataMR2 = ['化学纤维制造业', '计算机、通信和其他电子设备制造业', '化学原料和化学制品制造业']
      this.checkListIngForChart2 = ['化学纤维制造业', '计算机、通信和其他电子设备制造业', '化学原料和化学制品制造业']
      this.seriesAllDataMR2.push(data8, data9, data10)

      this.seriesAllDataForLine3.push(data23, data24, data25, data26)
      this.seriesAllDataForLine4.push(data27, data28, data29)
      this.seriesAllDataForLine5.push(data30, data31, data32)
      this.seriesAllDataForLine6.push(data33, data34, data35, data36)
      this.seriesAllDataForLine7.push(data37, data38)
      this.seriesAllDataForLine8.push(data39)
      this.seriesAllDataForLine9.push(data40)
      this.seriesAllDataForLine10.push(data41)
      this.seriesAllDataForLine11.push(data42)

      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
          this.lineDrawLine12()
          this.lineDrawLine13()
          this.lineDrawLine3()
          this.lineDrawLine4()
          this.lineDrawLine5()
          this.lineDrawLine6()
          this.lineDrawLine7()
          this.lineDrawLine8()
          this.lineDrawLine9()
          this.lineDrawLine10()
          this.lineDrawLine11()
        }, 0)
      })
    },
    handleScroll () {
      let that = this
      let scrollbarEl = this.$refs.socieyScrollbar.wrap
      scrollbarEl.onscroll = function () {
        if (scrollbarEl.scrollTop > 700) {
          that.visible1 = false
        }
        if (scrollbarEl.scrollTop > 1300) {
          that.visible2 = false
        }
      }
    }
  },
  created () {
    this.checkList = ['年份', '总计', '工业增加值', '造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业', '非金属矿物制品业', '烟草制品业', '金属制品业', '橡胶和塑料制品业', '化学纤维制造业', '计算机、通信和其他电子设备制造业', '化学原料和化学制品制造业', '通用设备制造业', '电气机械和器材制造业', '食品制造业', '家具制造业', '酒、饮料和精制茶制造业', '仪器仪表制造业', '汽车制造业', '制造业', '医药制造业', '专用设备制造业', '其他制造业', '农副食品加工业', '黑色金属冶炼和压延加工业', '有色金属冶炼和压延加工业', '石油加工、炼焦和核燃料加工业', '非金属矿采选业', '黑色金属矿采选业', '有色金属矿采选业', '燃气生产和供应业', '电力、热力生产和供应业', '水的生产和供应业', '石油和天然气开采业', '煤炭开采和洗选业', '开采辅助活动', '其他采矿业', '纺织业', '纺织服装、服饰业', '铁路、船舶、航空航天和其他运输设备', '金属制品、机械和设备修理业', '废弃资源综合利用业', '印刷和记录媒介复制业', '同比增长', '入库时间', '更新时间', '批次号', '增量时间', '增量标识']
    this.checkListIng = ['年份', '总计', '工业增加值', '造纸和纸制品业', '木材加工和木、竹、藤、棕、草制品业', '皮革、毛皮、羽毛及其制品和制鞋业', '非金属矿物制品业', '更新时间']
    this.showYear = [moment().year() - 9, moment().year() - 8, moment().year() - 7, moment().year() - 6, moment().year() - 5, moment().year() - 4, moment().year() - 3, moment().year() - 2, moment().year() - 1, moment().year()]
    this.getEconomyData(this.showYear)
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.barDrawLine1()
        this.lineDrawLine12()
        this.lineDrawLine13()
        this.lineDrawLine3()
        this.lineDrawLine4()
        this.lineDrawLine5()
        this.lineDrawLine6()
        this.lineDrawLine7()
        this.lineDrawLine8()
        this.lineDrawLine9()
        this.lineDrawLine10()
        this.lineDrawLine11()
      }, 0)
    })

    this.initBarEchart1()
    this.initLineEchart12()
    this.initLineEchart13()
    this.initLineEchart3()
    this.initLineEchart4()
    this.initLineEchart5()
    this.initLineEchart6()
    this.initLineEchart7()
    this.initLineEchart8()
    this.initLineEchart9()
    this.initLineEchart10()
    this.initLineEchart11()

    this.handleScroll()
  },
  watch: {
    name (val) {
      this.$refs.socieyScrollbar.wrap.scrollTop = 0
      this.$nextTick(function () {
        setTimeout(() => {
          this.barDrawLine1()
          this.lineDrawLine12()
          this.lineDrawLine13()
          this.lineDrawLine3()
          this.lineDrawLine4()
          this.lineDrawLine5()
          this.lineDrawLine6()
          this.lineDrawLine7()
          this.lineDrawLine8()
          this.lineDrawLine9()
          this.lineDrawLine10()
          this.lineDrawLine11()
        }, 0)
      })
    },
    'checkListIngForChart1': {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.lineDrawLine12()
          }, 500)
        })
      }
    },
    'checkListIngForChart2': {
      immediate: true,
      deep: true,
      handler (val) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.lineDrawLine13()
          }, 500)
        })
      }
    },
    'change1': {
      immediate: true,
      deep: true,
      handler (val) {
        if (val === true) {
          this.checkedForChart1 = false
        }
      }
    },
    'change2': {
      immediate: true,
      deep: true,
      handler (val) {
        if (val === true) {
          this.checkedForChart2 = false
        }
      }
    }
  }
}
</script>
<style scoped>
@import "./css/simplenessChart.css";

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style>
#oneChart-other .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #c0c4cc;
  font-size: 16px;
  line-height: 21px;
}
#oneChart-other .el-checkbox__label {
  font-size: 16px;
  line-height: 21px;
}
#oneChart-other .el-checkbox {
  margin-bottom: 8px;
}
#oneChart-other .el-input__inner {
  text-align: center;
}
#oneChart-other .el-button--small {
  padding: 0px 10px;
  height: 32px;
}
</style>
