<template>
  <transition name="el-zoom-in-top">
    <epf-page :style="pageStyle"
              v-show="showPanel"
              @mouseleave.native="setStatus"
              col>
      <epf-row>
        <span class="active">区域列表</span>
      </epf-row>
      <epf-row>
        <span>当前地区：{{currentCity}}</span>
      </epf-row>
      <epf-row>
        <epf-splitline :style="splitlineStyle"></epf-splitline>
      </epf-row>
      <epf-block style="padding: 0 20px;">
        <epf-row v-for="(item0, index0) in cities"
                 :key="index0"
                 :style="rowStyle">
          <a v-for="(item1, index1) in item0"
             :key="index1"
             src="javascript:void(0)"
             @click="handleCitySelectedClick(item1, index0, index1)"
             class="content-item">{{item1}}</a>
        </epf-row>
      </epf-block>
      <epf-block>
        <epf-row>
          <span :class="{active: isActive0}"
                @click="handleLocationSeletClick(0)">按地区</span>
          <span :class="{active: isActive1}"
                @click="handleLocationSeletClick(1)">按片区</span>
        </epf-row>
      </epf-block>
      <epf-block v-show="isActive0">
        <epf-row :style="rowStyle">
          <a v-for="(item, index) in locate"
             src="javascript:void(0)"
             :style="uppercaseStyle"
             :key="index"
             @click="handleUpperCaseClick(item.uppercase)">{{item.uppercase}}</a>
        </epf-row>
        <epf-row>
          <epf-splitline :style="splitlineStyle"></epf-splitline>
        </epf-row>
        <epf-block col
                   style="max-height: 300px;overflow-y: scroll;flex: 1;">
          <epf-row v-for="(item0, index0) in locate"
                   :key="index0"
                   :style="rowStyle"
                   :ref="item0.uppercase">
            <epf-col style="width: 32px;">
              <a src="javascript:void(0)"
                 class="content-item"
                 style="color: #464C5B;">{{item0.uppercase}}</a>
            </epf-col>
            <epf-col>
              <epf-row v-for="(item1, index1) in item0.content"
                       :key="index1"
                       :style="rowStyle">
                <epf-col>
                  <a src="javascript:void(0)"
                     class="content-item"
                     style="color: #464C5B;">{{item1.name}}</a>
                </epf-col>
                <epf-col>
                  <epf-row v-for="(item2, index2) in item1.children"
                           :key="index2"
                           :style="rowStyle">
                    <a v-for="(item3, index3) in item2"
                       :key="index3"
                       class="content-item"
                       src="javascript:void(0)"
                       @click="handleCitySelectedClick(item3, index1, index3, item1)">{{item3}}</a>
                  </epf-row>
                </epf-col>
              </epf-row>
            </epf-col>
          </epf-row>
        </epf-block>
      </epf-block>
      <epf-block v-show="isActive1">
        <epf-row>
          <epf-splitline :style="splitlineStyle"></epf-splitline>
        </epf-row>
        <epf-row>
          <a v-for="(item, index) in areaBlock"
             :key="index"
             src="javascript:void(0)"
             class="content-item">{{item}}</a>
        </epf-row>
      </epf-block>
    </epf-page>
  </transition>
</template>

<script>
export default {
  name: 'CityLocate',
  inject: ['mapAppId'],
  data() {
    return {
      pageStyle: {
        position: 'absolute',
        top: '50px',
        bottom: '20px',
        height: 'unset',
        right: '183px',
        width: '390px',
        'font-size': '16px',
        'overflow-y': 'auto',
        '-ms-overflow-style': 'none',
        'overflow': '-moz-scrollbars-none',
        'border-radius': '6px',
        'box-shadow': '1px 3px 6px 0px rgba(0, 0, 0, 0.25)'
      },
      splitlineStyle: {
        margin: 0
      },
      rowStyle: {
        margin: 0
      },
      uppercaseStyle: {
        margin: '0 8px',
        cursor: 'pointer'
      },
      cities: [
        ['广东省', '广州市', '韶关市', '深圳市', '珠海市'],
        ['汕头市', '佛山市', '江门市', '湛江市', '茂名市'],
        ['肇庆市', '惠州市', '梅州市', '汕尾市', '河源市'],
        ['阳江市', '清远市', '东莞市', '中山市', '潮州市'],
        ['揭阳市', '云浮市']
      ],
      locate: [
        { uppercase: 'C', content: [{ name: '潮州市', children: [['湘桥区', '潮安区', '饶平县']] }] },
        { uppercase: 'D', content: [{ name: '东莞市', children: [['东莞市']] }] },
        { uppercase: 'F', content: [{ name: '佛山市', children: [['禅城区', '南海区', '顺德区', '三水区'], ['高明区']] }] },
        { uppercase: 'G', content: [{ name: '广州市', children: [['荔湾区', '越秀区', '海珠区', '天河区'], ['白云区', '黄埔区', '番禺区', '花都区'], ['南沙区', '从化区', '增城区']] }] },
        { uppercase: 'H', content: [{ name: '河源市', children: [['源城区', '紫金县', '龙川县', '连平县'], ['和平县', '东源县']] }, { name: '惠州市', children: [['惠城区', '惠阳区', '博罗县', '惠东县'], ['龙门县']] }] },
        { uppercase: 'J', content: [{ name: '江门市', children: [['蓬江区', '江海区', '新会区', '台山市'], ['开平市', '鹤山市', '恩平市']] }, { name: '揭阳市', children: [['榕城区', '揭东区', '揭西县', '惠来县'], ['普宁市']] }] },
        { uppercase: 'M', content: [{ name: '茂名市', children: [['茂南区', '电白区', '高州市', '化州市'], ['信宜市']] }, { name: '梅州市', children: [['梅江区', '梅县区', '大埔县', '丰顺县'], ['五华县', '平远县', '蕉岭县', '兴宁市']] }] },
        { uppercase: 'Q', content: [{ name: '清远市', children: [['清城区', '清新区', '佛冈县', '阳山县'], ['英德市', '连山壮族瑶族自治县'], ['连州市', '连南瑶族自治县']] }] },
        { uppercase: 'S', content: [{ name: '韶关市', children: [['武江区', '浈江区', '曲江区', '始兴县'], ['仁化县', '翁源县', '乐昌市', '南雄市'], ['乳源瑶族自治县', '新丰县']] }, { name: '深圳市', children: [['罗湖区', '福田区', '南山区', '宝安区'], ['龙岗区', '盐田区', '龙华区', '坪山区'], ['光明区']] }, { name: '汕头市', children: [['龙湖区', '金平区', '濠江区', '潮阳区'], ['潮南区', '澄海区', '南澳县']] }, { name: '汕尾市', children: [['城区', '海丰县', '陆河县', '陆丰市']] }] },
        { uppercase: 'Y', content: [{ name: '阳江市', children: [['江城区', '阳东区', '阳西县', '阳春市']] }, { name: '云浮市', children: [['云城区', '云安区', '新兴县', '郁南县'], ['罗定市']] }] },
        { uppercase: 'Z', content: [{ name: '肇庆市', children: [['端州区', '鼎湖区', '高要区', '广宁县'], ['怀集县', '封开县', '德庆县', '四会市']] }, { name: '中山市', children: [['中山市']] }, { name: '珠海市', children: [['香洲区', '斗门区', '金湾区']] }, { name: '湛江市', uppercase: 'Z', children: [['赤坎区', '霞山区', '坡头区', '麻章区'], ['遂溪县', '徐闻县', '廉江市', '雷州市'], ['吴川市']] }] }
      ],
      showPanel: false,
      mapApp: null,
      currentCity: '广东省',
      isActive0: true,
      isActive1: false,
      areaBlock: ['珠三角', '粤东', '粤西', '粤北']
    }
  },
  mounted() {
    this.$bus.$on('showPanel', res => {
      this.showPanel = res
    })
    this.$bus.$off('viewLoaded')
    this.$bus.$on('viewLoaded', mapAppId => {
      const me = this
      setTimeout(() => {
        if (mapAppId === (me.mapAppId || me.$parent.name)) {
          me.mapApp = me.$findMapApp(mapAppId)
          if (me.mapApp) {
            me.mapApp.view.on('click', event => {
              me.showPanel = false
            })
          }
        }
      }, 20)
    })
  },
  beforeDestroy() {
    this.$bus.$off('viewLoaded')
  },
  methods: {
    setStatus() {
      this.showPanel = false
      this.$bus.$emit('showPanel', false)
    },
    handleLocationSeletClick(item) {
      if (item === 0) {
        this.isActive0 = true
        this.isActive1 = false
      } else {
        this.isActive0 = false
        this.isActive1 = true
      }
    },
    handleUpperCaseClick(item) {
      this.$refs[item][0].$el.scrollIntoView({ behavior: 'smooth' })
    },
    /**
     * item1: 所在城市
     * index0: 所在列表的index
     * index1:城市的index
     */
    handleCitySelectedClick(cityName, parentCityIndex, cityIndex, parentCity) {          
      const me = this
      this.currentCity = cityName
      this.$bus.$emit('changeCity', cityName)
      if (!this.mapApp) {
        this.mapApp = this.$findMapApp(this.mapAppId)
      }
      if (parentCityIndex === 0 && cityIndex === 0 && !parentCity) {
        this.mapApp.widgets.find(e => e.home).home.go()
        this.getCityInfo(true)
      } else {
        const url = this.$getMapAppInitConf().map.xzqhService.url4
        //var where = 'CityNameC = \'' + this.currentCity + '\''
        var where = 'NL_NAME_2 = \'' + this.currentCity + '\''
        if(this.currentCity.indexOf("区")>=0 || this.currentCity.indexOf("县")>=0){
          where = 'NL_NAME_3 = \'' + this.currentCity + '\''
        }
        const aq = this.mapApp.createAttributeQuery(this.mapApp, null, null)
        aq.doQuery(url, where)
          .then(res => {
            const extent = res.features[0].geometry.extent
            me.mapApp.view.goTo([extent.center.x, extent.center.y])
          })
          .catch(err => { throw new Error(err) })
        this.getCityInfo(false, parentCity)
      }
    },
    getCityInfo(val, parentCity) {
      const me = this
      const code = this.$getMapAppInitConf().map.areaCode
      this.$get('/epf-admin/admin/regionals/getAreasByCode').then(res => {
        if (res.code === 0) {
          const areas = JSON.parse(res.areas)
          me.$root.areaInfo = areas.filter(area => area.dictKey === code)[0]
          if (me.mapApp) {
            me.mapApp.areaInfo = me.$root.areaInfo
          }
          if (val === true) {
            me.$bus.$emit('sendCityInfo', me.mapApp.areaInfo)
            me.$emit('sendCityInfo', me.mapApp.areaInfo)
          } else {
            let cityInfo = this.mapApp.areaInfo.children.filter(child => child.zhCn === this.currentCity)[0]
            if (!cityInfo) {
              const parentCityInfo = this.mapApp.areaInfo.children.filter(child => child.zhCn === parentCity.name)[0]
              cityInfo = parentCityInfo.children.filter(child => child.zhCn === this.currentCity)[0]
            }
            me.$bus.$emit('sendCityInfo', cityInfo)
            me.$emit('sendCityInfo', cityInfo)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
.content-item {
  margin: 8px;
  cursor: pointer;
}
.content-item:hover {
  text-decoration: underline;
}
span {
  color: rgba(32, 32, 32, 1);
  margin: 0 10px 0 0;
  cursor: pointer;
}
.active {
  border-bottom: 2px solid #1d7ce4;
}
</style>
