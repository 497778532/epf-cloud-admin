<template>
  <div id="makeTemplate">
    <el-button size="medium"
               type="info"
               class="skipBox"
               @click="handleClickSkip">退出</el-button>
    <div class="makeTemplate_title">制作专题</div>
    <div class="makeTemplate_classify">统计地图</div>
    <div class="classify_content">
      <ul class="templateHome_content_ul">
        <li class="templateHome_content_li"
            v-for="(item,index) in templateListTJ"
            :key="index"
            @click="handleClickColor(item)">
          <div class="classify_content_title">{{item.templateName}}</div>
          <div v-if="item.templateType=='fdssdt'">
            <img src="../../../../assets/images/tem-color.png"
                 alt
                 class="classify_content_image" />
          </div>
          <div v-if="item.templateType=='lxdy'">
            <img src="../../../../assets/images/tem-flow.png"
                 alt
                 class="classify_content_image" />
          </div>
          <div v-if="item.templateType=='djfhdt'">
            <img src="../../../../assets/images/tem-grade.png"
                 alt
                 class="classify_content_image" />
          </div>
          <div v-if="item.templateType=='bztjdt'">
            <img src="../../../../assets/images/tem-pie.png"
                 alt
                 class="classify_content_image" />
          </div>
          <div v-if="item.templateType=='zztjdt'">
            <img src="../../../../assets/images/tem-columnar.png"
                 alt
                 class="classify_content_image" />
          </div>
          <div v-if="item.templateType=='fdssdjfhdt'">
            <img src="../../../../assets/images/tem-colorGrade.png"
                 alt
                 class="classify_content_image" />
          </div>
          <div v-if="item.templateType=='rlt'">
            <img src="../../../../assets/images/tem-hot.png"
                 alt
                 class="classify_content_image" />
          </div>
          <div v-if="item.templateType=='sbt'">
            <img src="../../../../assets/images/tem-water.png"
                 alt
                 class="classify_content_image" />
          </div>
          <!-- <div v-if="item.templateType=='ddlx'">
            <img src="../../../../assets/images/tem-moreLine.png" alt class="classify_content_image" />
          </div> -->
        </li>
      </ul>
    </div>
    <!-- <div class="makeTemplate_classify">业务地图</div>
    <div class="classify_content" style="margin-bottom:0;">
      <ul>
        <li
          class="templateHome_content_li"
          v-for="(item,index) in templateListYW"
          :key="index"
          @click="handleClickColor(item)"
        >
          <div class="classify_content_title">{{item.templateName}}</div>
          <div v-if="item.templateType=='dbjmb'">
            <img src="../../../../assets/images/u10.png" alt class="classify_content_image" />
          </div>
          <div v-if="item.templateType=='ywqhgl'">
            <img src="../../../../assets/images/u11.png" alt class="classify_content_image" />
          </div>
          <div v-if="item.templateType=='dbjqhgl'">
            <img src="../../../../assets/images/u12.png" alt class="classify_content_image" />
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      templateListTJ: [],
      templateListYW: []
    }
  },
  created () {
    // alert("3");
    this.getMapTopicTemplateList()
  },
  methods: {
    getMapTopicTemplateList () {
      let that = this
      console.log('获取模板数据列表：')
      this.$post('/epf-onemap/maptopictemplate/getMapTopicTemplateList').then(
        res => {
          // res 是返回结果
          console.log('获取模板列表数据接口：', res)
          if (res.code != 0) {
            self.$message.error(res.msg)
            return
          }

          // 返回的数据
          that.templateListTJ = res.tjList

          that.templateListYW = res.ywList

          that.templateListTJ.pop()
        }
      )
    },
    handleClickSkip () {
      let routerPath = 'templateHome'
      this.$router.push({ path: routerPath })
    },

    handleClickColor (item) {
      let routerPath = ''
      if (item.templateType == 'fdssdt') {
        // 分段设色地图
        routerPath = 'makeColorTemplate'
      } else if (item.templateType == 'lxdy') {
        // 流向地图
        routerPath = 'makeFlowTemplate'
      } else if (item.templateType == 'djfhdt') {
        // 等级符号地图
        routerPath = 'makeGradeTemplate'
      } else if (item.templateType == 'bztjdt') {
        // 饼状统计地图
        routerPath = 'makePieTemplate'
      } else if (item.templateType == 'zztjdt') {
        // 柱状统计地图
        routerPath = 'makeColumnarTemplate'
      } else if (item.templateType == 'fdssdjfhdt') {
        // 分段设色+等级符号
        routerPath = 'makeColorGradeTemplate'
      } else if (item.templateType == 'rlt') {
        // 热力图
        routerPath = 'makeHotTemplate'
      } else if (item.templateType == 'sbt') {
        // 水波纹
        routerPath = 'makeWaterTemplate'
      } else if (item.templateType == 'ddlx') {
        // 多点流向图
        routerPath = 'makeColorTemplate'
      } else if (item.templateType == 'dbjmb') {
        // 点标记模板
        routerPath = ''
        alert('暂无相应业务！！')
      } else if (item.templateType == 'ywqhgl') {
        // 业务区划管理
        routerPath = ''
        alert('暂无相应业务！！')
      } else if (item.templateType == 'dbjqhgl') {
        // 点标记区划模板
        routerPath = ''
        alert('暂无相应业务！！')
      } else {
        alert('找不到对应的业务！！')
      }
      this.$router.push({ name: routerPath, params: { item: item } })
    }
  }
}
</script>
<style scoped>
#makeTemplate {
  width: 100%;
  min-height: 100%;
  padding: 30px;
  background-color: #f9f9f9;
  position: relative;
}
.skipBox {
  position: absolute;
  top: 15px;
  right: 30px;
}
.makeTemplate_title {
  font-size: 18px;
  color: #1d7ce4;
  font-weight: bold;
  margin-bottom: 20px;
}
.makeTemplate_classify {
  width: 100%;
  height: 44px;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 600;
  background-color: #fff;
  line-height: 44px;
  margin-bottom: 20px;
}
.classify_content {
  width: 100%;
  margin-bottom: 20px;
}
.classify_content ul {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.classify_content ul li {
  width: 19%;
  background-color: #fff;
  height: 280px;
  margin-bottom: 1.25%;
  margin-right: 1.25%;
  cursor: pointer;
  border: 1px solid rgb(211, 211, 211);
  box-sizing: border-box;
}
.classify_content ul li:hover {
  box-shadow: 0px 5px 10px rgb(134, 134, 134);
  /* box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5); */
}
.classify_content ul li:nth-child(5n) {
  margin-right: 0;
}
.classify_content_title {
  width: 100%;
  height: 40px;
  padding-left: 15px;
  font-size: 14px;
  background-color: #fff;
  line-height: 40px;
  color: #333;
}
.classify_content_image {
  width: 100%;
  height: 238px;
  box-sizing: border-box;
}

@media screen and (max-width: 1599px) {
  #makeTemplate {
    width: calc(100% + 74px);
    height: 200px;
    position: absolute;
    left: -74px;
    z-index: 88;
    overflow: auto;
  }
}
</style>
