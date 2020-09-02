<template>
  <div class="StatisticalData">
    <!-- <div><span @click="click">哈哈
      </span></div> -->
    <div class="StatisticalData-title">
      <div :class="{'current':li===1}"
           @click="turnNature">
        自然资源综合统计
      </div>
      <div :class="{'current':li===2}"
           @click="turnSociety">
        社会经济数据统计
      </div>
    </div>
    <div class="line3">
      <div :class="{'borderBottom':li===1}">

      </div>
      <div :class="{'borderBottom':li===2}">

      </div>
    </div>
    <div class="StatisticalData-content"
         v-if="li===1">
      <div :class="{'active':current===item.id}"
           @click="click(item)"
           v-for="(item,index) in table"
           :key="index">
        <span>{{item.name}}</span>
      </div>
    </div>

    <div style="width:100%;height:15px;"
         v-if="li===2"></div>
    <el-scrollbar style="max-height:calc(100% - 42px);">
      <div class="StatisticalData-content-nature"
           v-if="li===2">
        <div :class="{'active':currentNature===item.id}"
             @click="handleClickCheckNature(item)"
             v-for="(item,index) in natureList"
             :key="index">
          <span>{{item.name}}</span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      li: 1,
      acitve: 0,
      current: 0,
      table: [
        { name: '自然资源概况', id: 0, key: 'zrzygk' },
        { name: '自然资源节约集约利用情况', id: 1, key: 'zrzyjyjylyqk' },
        { name: '国土空间规划编制实施情况', id: 2, key: 'gtkjghbzssqk' },
        { name: '耕地保护情况', id: 3, key: 'gdbhqk' },
        { name: '国土空间用途管制情况', id: 4, key: 'gtkjytgzqk' },
        { name: '海洋经济情况', id: 5, key: 'hyjjqk' },
        { name: '围填海情况', id: 6, key: 'wthqk' }

      ],
      currentNature: 0,
      natureList: [
        { name: '历年旅客周转量', id: 0 },
        { name: '历年客运量', id: 1 },
        { name: '固定资产投资总额', id: 2 },
        { name: '科研机构、人员、经费及活动情况', id: 3 },
        { name: '三次产业对地区生产总值增长的拉动', id: 4 },
        { name: '历年地区生产总值', id: 5 },
        { name: '各类卫生事业机构、床位和人员数统计', id: 6 },
        { name: '历年规模以上工业增加值增长速度', id: 7 },
        { name: '社会治安及交通火灾情况', id: 8 },
        { name: '高新技术企业认定信息', id: 9 },
        { name: '文化、文物机构及人员数', id: 10 },
        { name: '人口主要指标', id: 11 },
        { name: '历年地区生产总值构成及增长速度', id: 12 },
        { name: '研究生教育情况', id: 13 },
        { name: '分月社会消费品零售总额', id: 14 },
        { name: '规模以上分行业工业增加值和增长速度', id: 15 },
        { name: '各市单位GDP能耗增长速度', id: 16 },
        { name: '广东省公共图书馆目录', id: 17 },
        { name: '每千老年人口养老床位数统计信息', id: 18 },
        { name: '广东省各市接待过夜旅游者人数', id: 19 },
        { name: '分市常住人口及城镇化率', id: 20 },
        { name: '广东省美术馆名录', id: 21 },
        { name: '全省文化文物统计信息', id: 22 },
        { name: '规模以上工业主要指标', id: 23 },
        { name: '能源生产和消费总量及构成', id: 24 },
        { name: '广东省水资源管理年报', id: 25 }
      ]
    }
  },
  methods: {
    turnNature () {
      this.li = 1
      this.$emit('isNature', this.li)
    },
    turnSociety () {
      this.li = 2
      this.$emit('isNature', this.li)
    },
    click (item) {
      this.current = item.id
      this.$emit('open', item)
    },
    handleClickCheckNature (item) {
      this.currentNature = item.id
      this.$emit('society', item)
    }
  }
}
</script>

<style scoped>
.StatisticalData {
  height: 100%;
}
.StatisticalData-content {
  padding: 0 16px;
}
.StatisticalData-content > div {
  height: 45px;

  border-radius: 2px;

  color: rgba(89, 89, 89, 1);
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 15px;
  cursor: pointer;
  padding-left: 16px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}
.StatisticalData-content > div.active {
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(27, 116, 238, 1);
}

.StatisticalData-title {
  background: rgba(241, 241, 241, 1);
  height: 40px;
  display: flex;
  padding: 0 16px;

  color: rgba(175, 175, 175, 1);
}

.line3 {
  display: flex;
  padding: 0 16px;
}

.line3 > div {
  flex: 1;
  height: 2px;
}

.line3 > div.borderBottom {
  background: rgba(27, 116, 238, 1);
}
.StatisticalData-title > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  cursor: pointer;
}
.StatisticalData-title > div.current {
  color: rgba(97, 97, 97, 1);
  font-weight: 700;
}

.StatisticalData-content-nature {
  padding: 0 16px 16px;
  height: calc(100% - 40px);
}
.StatisticalData-content-nature > div {
  height: 45px;
  border-radius: 2px;
  color: rgba(89, 89, 89, 1);
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 15px;
  cursor: pointer;
  padding: 0 16px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}
.StatisticalData-content-nature > div.active {
  background: rgba(244, 250, 255, 1);
  box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(27, 116, 238, 1);
  box-sizing: border-box;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
