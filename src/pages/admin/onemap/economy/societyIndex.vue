<template>
  <div class="societyIndex">
    <lnlkzzl :name="societyData"
             v-if="this.societyData==='历年旅客周转量'"></lnlkzzl>
    <lnkyl :name="societyData"
           v-if="this.societyData==='历年客运量'"></lnkyl>
    <gdzctzze :name="societyData"
              v-if="this.societyData==='固定资产投资总额'"></gdzctzze>
    <kyjgryjfjhdqk :name="societyData"
                   v-if="this.societyData==='科研机构、人员、经费及活动情况'"></kyjgryjfjhdqk>
    <sccyddqsczzzzdld :name="societyData"
                      v-if="this.societyData==='三次产业对地区生产总值增长的拉动'"></sccyddqsczzzzdld>
    <lndqsczz :name="societyData"
              v-if="this.societyData==='历年地区生产总值'"></lndqsczz>
    <glwssyjgcwhrystj :name="societyData"
                      v-if="this.societyData==='各类卫生事业机构、床位和人员数统计'"></glwssyjgcwhrystj>
    <lngmysgyzjzzzsd :name="societyData"
                     v-if="this.societyData==='历年规模以上工业增加值增长速度'"></lngmysgyzjzzzsd>
    <shzajjthzqk :name="societyData"
                 v-if="this.societyData==='社会治安及交通火灾情况'"></shzajjthzqk>
    <gxjsqyrdxx :name="societyData"
                v-if="this.societyData==='高新技术企业认定信息'"></gxjsqyrdxx>
    <whwwjgjrys :name="societyData"
                v-if="this.societyData==='文化、文物机构及人员数'"></whwwjgjrys>
    <rkzyzb :name="societyData"
            v-if="this.societyData==='人口主要指标'"></rkzyzb>
    <lndqsczzgcjzzsd :name="societyData"
                     v-if="this.societyData==='历年地区生产总值构成及增长速度'"></lndqsczzgcjzzsd>
    <yjsjyqk :name="societyData"
             v-if="this.societyData==='研究生教育情况'"></yjsjyqk>
    <fyshxfplsze :name="societyData"
                 v-if="this.societyData==='分月社会消费品零售总额'"></fyshxfplsze>
    <gmysfhygyzjzhzzsd :name="societyData"
                       v-if="this.societyData==='规模以上分行业工业增加值和增长速度'"></gmysfhygyzjzhzzsd>
    <gsdwgdpnhzzsd :name="societyData"
                   v-if="this.societyData==='各市单位GDP能耗增长速度'"></gsdwgdpnhzzsd>
    <gdsggtsgml :name="societyData"
                v-if="this.societyData==='广东省公共图书馆目录'"></gdsggtsgml>
    <mqlnrkylcwstjxx :name="societyData"
                     v-if="this.societyData==='每千老年人口养老床位数统计信息'"></mqlnrkylcwstjxx>
    <gdsgsjdgylyzrs :name="societyData"
                    v-if="this.societyData==='广东省各市接待过夜旅游者人数'"></gdsgsjdgylyzrs>
    <fsczrkjczhl :name="societyData"
                 v-if="this.societyData==='分市常住人口及城镇化率'"></fsczrkjczhl>
    <gdsmsgml :name="societyData"
              v-if="this.societyData==='广东省美术馆名录'"></gdsmsgml>
    <qswhwwtjxx :name="societyData"
                v-if="this.societyData==='全省文化文物统计信息'"></qswhwwtjxx>
    <gmysgyzyzbdfl :name="societyData"
                   v-if="this.societyData==='规模以上工业主要指标'"></gmysgyzyzbdfl>
    <nyschxfzljgc :name="societyData"
                  v-if="this.societyData==='能源生产和消费总量及构成'"></nyschxfzljgc>
    <gdsszyglnb :name="societyData"
                v-if="this.societyData==='广东省水资源管理年报'"></gdsszyglnb>
  </div>
</template>

<script>
import lnlkzzl from './lnlkzzl'
import lnkyl from './lnkyl'
import gdzctzze from './gdzctzze'
import kyjgryjfjhdqk from './kyjgryjfjhdqk'
import sccyddqsczzzzdld from './sccyddqsczzzzdld'
import lndqsczz from './lndqsczz'
import glwssyjgcwhrystj from './glwssyjgcwhrystj'
import lngmysgyzjzzzsd from './lngmysgyzjzzzsd'
import shzajjthzqk from './shzajjthzqk'
import gxjsqyrdxx from './gxjsqyrdxx'
import whwwjgjrys from './whwwjgjrys'
import rkzyzb from './rkzyzb'
import lndqsczzgcjzzsd from './lndqsczzgcjzzsd'
import yjsjyqk from './yjsjyqk'
import fyshxfplsze from './fyshxfplsze'
import gmysfhygyzjzhzzsd from './gmysfhygyzjzhzzsd'
import gsdwgdpnhzzsd from './gsdwgdpnhzzsd'
import gdsggtsgml from './gdsggtsgml'
import mqlnrkylcwstjxx from './mqlnrkylcwstjxx'
import gdsgsjdgylyzrs from './gdsgsjdgylyzrs'
import fsczrkjczhl from './fsczrkjczhl'
import gdsmsgml from './gdsmsgml'
import qswhwwtjxx from './qswhwwtjxx'
import gmysgyzyzbdfl from './gmysgyzyzbdfl'
import nyschxfzljgc from './nyschxfzljgc'
import gdsszyglnb from './gdsszyglnb'
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    lnlkzzl,
    lnkyl,
    gdzctzze,
    kyjgryjfjhdqk,
    sccyddqsczzzzdld,
    lndqsczz,
    glwssyjgcwhrystj,
    lngmysgyzjzzzsd,
    shzajjthzqk,
    gxjsqyrdxx,
    whwwjgjrys,
    rkzyzb,
    lndqsczzgcjzzsd,
    yjsjyqk,
    fyshxfplsze,
    gmysfhygyzjzhzzsd,
    gsdwgdpnhzzsd,
    gdsggtsgml,
    mqlnrkylcwstjxx,
    gdsgsjdgylyzrs,
    fsczrkjczhl,
    gdsmsgml,
    qswhwwtjxx,
    gmysgyzyzbdfl,
    nyschxfzljgc,
    gdsszyglnb
  },

  data () {
    return {
      societyData: '历年旅客周转量'
    }
  },
  methods: {
  },
  created () { },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler (val) {
        this.societyData = val.name
      }
    }
  }
}
</script>

<style soped>
.societyIndex {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
  left: 0;
  top: 0;
}
</style>
