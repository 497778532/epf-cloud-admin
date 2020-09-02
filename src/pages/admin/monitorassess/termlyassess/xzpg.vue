<template>
  <div id="xzpg-main">
    <div style="height:0;">
      <el-row ref="backTop"></el-row>
    </div>
    <el-steps :active="active"
              finish-status="success">
      <el-step title="选择评估区域"></el-step>
      <el-step title="选择评估指标"></el-step>
      <el-step title="指标权重设置"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <div id="content">
      <div v-if="active === 0"
           class="flex-center"
           style="justify-content: flex-start;"
           element-loading-background="white"
           v-loading="loading">
        <div>
          <div id="areaGroup">
            <el-radio-group v-model="areaSelect"
                            @change="handleAreaSelect">
              <el-radio v-for="(area, index) in areas"
                        :key="index"
                        :label="area.label">{{area.name}}</el-radio>
            </el-radio-group>
          </div>
          <div id="cityGroup">
            <div v-for="(city, index) in cities"
                 :key="index">
              <el-checkbox-group v-model="city.selected"
                                 size="mini">
                <el-checkbox-button :label="city.name"
                                    @change="handleCityChange(city.name)">{{city.name}}</el-checkbox-button>
                <el-checkbox-button v-for="(district, index) in city.districts"
                                    :key="index"
                                    :label="district.name"
                                    @change="handleSingleCityChange(district.name)">{{district.name}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="active === 1"
           class="page flex-center">
        <div class="panel">
          <div class="panel-title">评估类型</div>
          <div class="panel-left">
            <div v-for="(item, index) in PGTypeList"
                 :key="index"
                 class="PGtype"
                 @click="handlePGTypeClick(index)"
                 ref="PGtype">
              <img :src="item.iconUrl"
                   class="PG-icon"
                   alt />
              <div class="PG-title">{{item.title}}</div>
            </div>
          </div>
        </div>
        <div class="panel"
             style="width: 568px;">
          <div class="panel-title">
            <span>评估指标项目</span>
            <div class="pg-title-checkbox">
              <el-checkbox :indeterminate="isPGAllIndeterminate"
                           v-model="PGcheckAll"
                           @change="handlePGCheckAllChange">全选</el-checkbox>
            </div>
          </div>
          <div id="pg-collpase"
               v-if="isCollpaseShow">
            <el-checkbox-group v-model="checkedPGItems"
                               @change="handlePGItemChange">
              <!-- 不能使用change事件 -->
              <div class="pg-list"
                   v-for="(PGItem, index) in PGList"
                   :key="index">
                <div class="pg-items-title"
                     @click="handlePGItemClick(PGItem)">
                  <div class="pg-items-icon">
                    <img v-if="PGItem.isExpand"
                         src="@/assets/images/jcpgyj/pg-arrow-down.png"
                         class="pg-item-img"
                         alt />
                    <img v-else
                         src="@/assets/images/jcpgyj/pg-arrow-right.png"
                         class="pg-item-img"
                         alt />
                  </div>
                  <el-checkbox :label="PGItem.name"
                               @change="handlePGItemCheck"></el-checkbox>
                </div>
                <div class="pg-items-details"
                     v-if="PGItem.isExpand">
                  <div v-for="(item, key) in PGItem.items"
                       :key="key"
                       class="pg-items-title pg-items-detail">
                    <el-checkbox :label="item"></el-checkbox>
                  </div>
                </div>
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>

      <div v-else-if="active === 2"
           class="page flex-center">
        <div id="weight-panel"
             class="panel">
          <el-alert title="指标权重设置默认根据已选分类平分，调整权重时总和需等于1"
                    type="info"
                    show-icon></el-alert>
          <el-form label-width="100px"
                   style="margin-top: 20px;">
            <el-form-item label="指标分类1："
                          prop="weight1">
              <el-input placeholder="请输入指标分类1的指标权重设置值"
                        v-model="x1"
                        @input="getInputData"
                        :maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="指标分类2："
                          prop="weight2">
              <el-input placeholder="请输入指标分类2的指标权重设置值"
                        v-model="x2"
                        @input="getInputData"
                        :maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="指标分类3："
                          prop="weight3">
              <el-input placeholder="请输入指标分类3的指标权重设置值"
                        v-model="x3"
                        @input="getInputData"
                        :maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="指标分类4："
                          prop="weight4">
              <el-input placeholder="请输入指标分类4的指标权重设置值"
                        v-model="x4"
                        @input="getInputData"
                        :maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="指标分类5："
                          prop="weight5">
              <el-input placeholder="请输入指标分类5的指标权重设置值"
                        v-model="x5"
                        @input="getInputData"
                        :maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="总计："
                          :id="sumOfWeight">
              <el-input v-model="weightCount"
                        readonly
                        :maxlength="10"></el-input>
            </el-form-item>
          </el-form>
          <div v-if="!step3Check"
               style="color: #D21A1A; text-align: center;">
            <div v-if="isBiggerWeight">当前权重合计大于1，超出{{overWeight}}，请调整权重分配值</div>
            <div v-else>当前权重合计小于1，还需再分配{{overWeight}}，请调整权重分配值</div>
          </div>
        </div>
      </div>

      <div v-else-if="active === 3"
           class="page flex-center">
        <div>
          <img class="check-icon"
               src="@/assets/images/jcpgyj/pg-success.png"
               alt />
          <div class="bolder-text">评估完成</div>
          <div v-if="active === 3"
               class="button primary final"
               @click="done">查看评估结果</div>
        </div>
      </div>
    </div>
    <div id="footer"
         class="flex-center">
      <div v-if="active === 0"
           class="button cancel"
           @click="clear">取消</div>
      <div v-if="active === 1 || active === 2"
           class="button"
           @click="back">上一步</div>
      <div v-if="active === 0 || active === 1"
           :class="{button: true, primary:true, disabled:!stepNextCheck}"
           @click="next">下一步</div>
      <div v-if="active === 2"
           :class="{button: true, primary:true, disabled:!step3Check}"
           @click="next">开始评估</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      loading: true,
      isPGAllIndeterminate: false,
      PGcheckAll: false,
      isCollpaseShow: false,
      areaSelect: '',
      selectedResult: new Set(),
      cities: [
        {
          code: '440100',
          name: '广州市',
          districts: [
            { code: '440103', name: '荔湾区' },
            { code: '440104', name: '越秀区' },
            { code: '440105', name: '海珠区' },
            { code: '440106', name: '天河区' },
            { code: '440111', name: '白云区' },
            { code: '440112', name: '黄埔区' },
            { code: '440113', name: '番禺区' },
            { code: '440114', name: '花都区' },
            { code: '440115', name: '南沙区' },
            { code: '440117', name: '从化区' },
            { code: '440118', name: '增城区' }
          ],
          selected: []
        },
        {
          code: '440200',
          name: '韶关市',
          districts: [
            { code: '440203', name: '武江区' },
            { code: '440204', name: '浈江区' },
            { code: '440205', name: '曲江区' },
            { code: '440222', name: '始兴县' },
            { code: '440224', name: '仁化县' },
            { code: '440229', name: '翁源县' },
            { code: '440232', name: '乳源瑶族自治县' },
            { code: '440233', name: '新丰县' },
            { code: '440281', name: '乐昌市' },
            { code: '440282', name: '南雄市' }
          ],
          selected: []
        },
        {
          code: '440300',
          name: '深圳市',
          districts: [
            { code: '440303', name: '罗湖区' },
            { code: '440304', name: '福田区' },
            { code: '440305', name: '南山区' },
            { code: '440306', name: '宝安区' },
            { code: '440307', name: '龙岗区' },
            { code: '440308', name: '盐田区' },
            { code: '440309', name: '龙华区' },
            { code: '440310', name: '坪山区' },
            { code: '440311', name: '光明区' }
          ],
          selected: []
        },
        {
          code: '440400',
          name: '珠海市',
          districts: [
            { code: '440402', name: '香洲区' },
            { code: '440403', name: '斗门区' },
            { code: '440404', name: '金湾区' }
          ],
          selected: []
        },
        {
          code: '440500',
          name: '汕头市',
          districts: [
            { code: '440507', name: '龙湖区' },
            { code: '440511', name: '金平区' },
            { code: '440512', name: '濠江区' },
            { code: '440513', name: '潮阳区' },
            { code: '440514', name: '潮南区' },
            { code: '440515', name: '澄海区' },
            { code: '440523', name: '南澳县' }
          ],
          selected: []
        },
        {
          code: '440600',
          name: '佛山市',
          districts: [
            { code: '440604', name: '禅城区' },
            { code: '440605', name: '南海区' },
            { code: '440606', name: '顺德区' },
            { code: '440607', name: '三水区' },
            { code: '440608', name: '高明区' }
          ],
          selected: []
        },
        {
          code: '440700',
          name: '江门市',
          districts: [
            { code: '440703', name: '蓬江区' },
            { code: '440704', name: '江海区' },
            { code: '440705', name: '新会区' },
            { code: '440781', name: '台山市' },
            { code: '440783', name: '开平市' },
            { code: '440784', name: '鹤山市' },
            { code: '440785', name: '恩平市' }
          ],
          selected: []
        },
        {
          code: '440800',
          name: '湛江市',
          districts: [
            { code: '440802', name: '赤坎区' },
            { code: '440803', name: '霞山区' },
            { code: '440804', name: '坡头区' },
            { code: '440811', name: '麻章区' },
            { code: '440823', name: '遂溪县' },
            { code: '440825', name: '徐闻县' },
            { code: '440881', name: '廉江市' },
            { code: '440882', name: '雷州市' },
            { code: '440883', name: '吴川市' }
          ],
          selected: []
        },
        {
          code: '440900',
          name: '茂名市',
          districts: [
            { code: '440902', name: '茂南区' },
            { code: '440904', name: '电白区' },
            { code: '440981', name: '高州市' },
            { code: '440982', name: '化州市' },
            { code: '440983', name: '信宜市' }
          ],
          selected: []
        },
        {
          code: '441200',
          name: '肇庆市',
          districts: [
            { code: '441202', name: '端州区' },
            { code: '441203', name: '鼎湖区' },
            { code: '441204', name: '高要区' },
            { code: '441223', name: '广宁县' },
            { code: '441224', name: '怀集县' },
            { code: '441225', name: '封开县' },
            { code: '441226', name: '德庆县' },
            { code: '441284', name: '四会市' }
          ],
          selected: []
        },
        {
          code: '441300',
          name: '惠州市',
          districts: [
            { code: '441302', name: '惠城区' },
            { code: '441303', name: '惠阳区' },
            { code: '441322', name: '博罗县' },
            { code: '441323', name: '惠东县' },
            { code: '441324', name: '龙门县' }
          ],
          selected: []
        },
        {
          code: '441400',
          name: '梅州市',
          districts: [
            { code: '441402', name: '梅江区' },
            { code: '441403', name: '梅县区' },
            { code: '441422', name: '大埔县' },
            { code: '441423', name: '丰顺县' },
            { code: '441424', name: '五华县' },
            { code: '441426', name: '平远县' },
            { code: '441427', name: '蕉岭县' },
            { code: '441481', name: '兴宁市' }
          ],
          selected: []
        },
        {
          code: '441500',
          name: '汕尾市',
          districts: [
            { code: '441502', name: '城区' },
            { code: '441521', name: '海丰县' },
            { code: '441523', name: '陆河县' },
            { code: '441581', name: '陆丰市' }
          ],
          selected: []
        },
        {
          code: '441600',
          name: '河源市',
          districts: [
            { code: '441602', name: '源城区' },
            { code: '441621', name: '紫金县' },
            { code: '441622', name: '龙川县' },
            { code: '441623', name: '连平县' },
            { code: '441624', name: '和平县' },
            { code: '441625', name: '东源县' }
          ],
          selected: []
        },
        {
          code: '441700',
          name: '阳江市',
          districts: [
            { code: '441702', name: '江城区' },
            { code: '441704', name: '阳东区' },
            { code: '441721', name: '阳西县' },
            { code: '441781', name: '阳春市' }
          ],
          selected: []
        },
        {
          code: '441800',
          name: '清远市',
          districts: [
            { code: '441802', name: '清城区' },
            { code: '441803', name: '清新区' },
            { code: '441821', name: '佛冈县' },
            { code: '441823', name: '阳山县' },
            { code: '441825', name: '连山壮族瑶族自治县' },
            { code: '441826', name: '连南瑶族自治县' },
            { code: '441881', name: '英德市' },
            { code: '441882', name: '连州市' }
          ],
          selected: []
        },
        {
          code: '441900',
          name: '东莞市',
          districts: [{ code: '__vue_devtool_undefined__', name: '东莞市' }],
          selected: []
        },
        {
          code: '442000',
          name: '中山市',
          districts: [{ code: '__vue_devtool_undefined__', name: '中山市' }],
          selected: []
        },
        {
          code: '445100',
          name: '潮州市',
          districts: [
            { code: '445102', name: '湘桥区' },
            { code: '445103', name: '潮安区' },
            { code: '445122', name: '饶平县' }
          ],
          selected: []
        },
        {
          code: '445200',
          name: '揭阳市',
          districts: [
            { code: '445202', name: '榕城区' },
            { code: '445203', name: '揭东区' },
            { code: '445222', name: '揭西县' },
            { code: '445224', name: '惠来县' },
            { code: '445281', name: '普宁市' }
          ],
          selected: []
        },
        {
          code: '445300',
          name: '云浮市',
          districts: [
            { code: '445302', name: '云城区' },
            { code: '445303', name: '云安区' },
            { code: '445321', name: '新兴县' },
            { code: '445322', name: '郁南县' },
            { code: '445381', name: '罗定市' }
          ],
          selected: []
        }
      ],
      weightList: [
        {
          label: '指标分类1',
          val: 0.2
        },
        {
          label: '指标分类2',
          val: 0.2
        },
        {
          label: '指标分类3',
          val: 0.2
        },
        {
          label: '指标分类4',
          val: 0.2
        },
        {
          label: '指标分类5',
          val: 0.2
        }
      ],
      areas: [
        { name: '全省', label: 'all' },
        { name: '珠三角平原区', label: 'riverDelta' },
        { name: '粤东沿海区', label: 'eastZone' },
        { name: '粤西沿海区', label: 'westZone' },
        { name: '粤西北山区', label: 'northwestZone' }
      ],
      PGTypeList: [
        {
          title: '土地利用现状(11)',
          iconUrl: require('@/assets/images/jcpgyj/pg-tdlyxz.png')
        },
        {
          title: '耕地与基本农田保护(3)',
          iconUrl: require('@/assets/images/jcpgyj/pg-gdyjbntbh.png')
        },
        {
          title: '土地利用总规划实施情况(11)',
          iconUrl: require('@/assets/images/jcpgyj/pg-tdlyzghssqk.png')
        },
        {
          title: '土地利用与评价(15)',
          iconUrl: require('@/assets/images/jcpgyj/pg-tdlyypj.png')
        }
      ],
      PGList: [
        {
          id: 1,
          name: '全域土地利用程度（2）',
          items: [],
          isExpand: false
        },
        {
          id: 2,
          name: '全域土地利用强度（6）',
          items: [],
          isExpand: false
        },
        {
          id: 3,
          name: '全域年度节约集约用地考核指标（2）',
          items: [],
          isExpand: false
        },
        {
          id: 4,
          name: '人口、经济、建设用地考核指标（5）',
          items: [],
          isExpand: false
        },
        {
          id: 5,
          name: '园区数量和面积（7）',
          items: [],
          isExpand: false
        },
        {
          id: 6,
          name: '园区土地利用程度分析（2）',
          items: [],
          isExpand: false
        },
        {
          id: 7,
          name: '园区用地结构状况分析（1）',
          items: [],
          isExpand: false
        },
        {
          id: 8,
          name: '园区土地利用强度（4）',
          items: [],
          isExpand: false
        },
        {
          id: 9,
          name: '园区用地效益（3）',
          items: [],
          isExpand: false
        },
        {
          id: 10,
          name: '土地利用现状地类统计（9）',
          items: [
            '建筑用地',
            '城镇工矿用地占建筑用地比例（现状分类）',
            '村庄用地占建设用地比例（现状分类）',
            '交通运输用地占建设用地比例（现状分类）',
            '城乡建设用地占建设用地比例（现状分类）',
            '土地总面积'
          ],
          isExpand: false
        }
      ],
      checkedPGItems: [],
      x1: '',
      x2: '',
      x3: '',
      x4: '',
      x5: '',
      step3Check: false,
      isBiggerWeight: false,
      stepNextCheck: false
    }
  },

  methods: {
    next () {
      if (this.active === 2 && !this.step3Check) return
      if (this.active === 0 && !this.stepNextCheck) return
      if (this.active++ > 2) this.active = 0
      this.$refs.backTop.$el.scrollIntoView({ block: 'end' }, { behavior: 'smooth' })
    },
    back () {
      if (this.active-- < 1) this.active = 0
      this.$refs.backTop.$el.scrollIntoView({ block: 'end' }, { behavior: 'smooth' })
    },
    done () {
      this.$router.push({ name: 'assesscenter' })
    },
    getAllDistrictName (name) { },
    arrowIcon (isExpand) {
      let right = '@/assets/images/jcpgyj/pg-arrow-right.png'
      let down = '@/assets/images/jcpgyj/pg-arrow-down.png'
      return isExpand ? right : down
    },
    handlePGItemClick (PGItem) {
      PGItem.isExpand = !PGItem.isExpand
    },
    handlePGTypeClick (index) {
      this.isCollpaseShow = !this.isCollpaseShow
      let PGtypeDom = this.$refs.PGtype[index]
      this.$refs.PGtype.forEach((item, i) => {
        if (i !== index) {
          item.classList.remove('isActive')
        }
      })

      if (PGtypeDom.classList.contains('isActive')) {
        PGtypeDom.classList.remove('isActive')
      } else {
        PGtypeDom.classList.add('isActive')
        this.isCollpaseShow = true
      }
    },
    handlePGCheckAllChange (val) {
      let pgListOptions = this.PGList.map(e => e.name)
      this.checkedPGItems = val ? pgListOptions : []
      this.isPGAllIndeterminate = false
    },
    handlePGItemChange (val) {
      let pgListOptions = this.PGList.map(e => e.name)
      let checkedCount = val.length
      this.PGcheckAll = checkedCount === pgListOptions.length
      this.isPGAllIndeterminate
        = checkedCount > 0 && checkedCount < pgListOptions.length
    },
    handlePGItemCheck (val) { },
    _clear () {
      this.cities.forEach(e => {
        e.selected = []
      })
      this.selectedResult.clear()
      this.upDateNextState()
    },
    clear () {
      this._clear()
      this.areaSelect = ''
    },
    handleAreaSelect (area) {
      this._clear()
      let filter = []
      if (area === 'riverDelta') {
        filter = [
          '广州市',
          '深圳市',
          '佛山市',
          '东莞市',
          '中山市',
          '珠海市',
          '江门市',
          '肇庆市',
          '惠州市'
        ]
      } else if (area === 'eastZone') {
        filter = ['汕头市', '潮州市', '揭阳市', '汕尾市']
      } else if (area === 'westZone') {
        filter = ['湛江市', '茂名市', '阳江市']
      } else if (area === 'northwestZone') {
        filter = ['云浮市']
      }
      let cities = this.cities
      cities.forEach(city => {
        let name = city.name
        if (area === 'all' || filter.includes(name)) {
          let districts = city.districts
          let districtsName = districts.map(d => d.name)
          districtsName.push(name)
          city.selected = districtsName
          this.selectedResult = new Set(
            [...this.selectedResult].concat(districtsName)
          )
        }
      })
      this.upDateNextState()
    },
    handleSingleCityChange (distName) {
      if (this.selectedResult.has(distName)) {
        this.selectedResult.delete(distName)
      } else {
        this.selectedResult.add(distName)
      }
      this.upDateNextState()
    },
    handleCityChange (cityName) {
      let checked = this.selectedResult.has(cityName)
      let city = this.cities.find(city => city.name === cityName)
      let districts = city.districts
      let districtsName = districts.map(d => d.name)
      districtsName.push(cityName)
      if (checked) {
        city.selected = []
        this.selectedResult.forEach((item, i, arr) => {
          if (districtsName.includes(item)) {
            arr.delete(item)
          }
        })
      } else {
        city.selected = districtsName
        this.selectedResult = new Set(
          [...this.selectedResult].concat(districtsName)
        )
      }
      this.upDateNextState()
    },
    upDateNextState () {
      if (this.selectedResult.size > 0) {
        this.stepNextCheck = true
      } else if (this.selectedResult.size === 0) {
        this.stepNextCheck = false
      }
    },
    async getCities () {
      let that = this
      await this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
        parentId: 440000
      }).then(res => {
        let lst = res.dictionariesList
        lst.forEach(city => {
          that.cities.push({
            code: city.id,
            name: city.zhCn,
            districts: [],
            selected: []
          })
        })
      })
      let res, lst, districts
      let _cities = that.deepClone(that.cities)
      for (let city of _cities) {
        districts = []
        res = await that.getDistricts(parseInt(city.code))
        lst = res.dictionariesList
        if (lst.length === 0) {
          if (city.code === '442000') {
            lst = [{ zhCn: '中山市' }]
          } else if (city.code === '441900') {
            lst = [{ zhCn: '东莞市' }]
          }
        }
        lst.forEach(dist => {
          districts.push({
            code: dist.id,
            name: dist.zhCn
          })
        })
        city.districts = districts
      }
      that.cities = _cities
      this.loading = false
    },
    async getDistricts (code) {
      let that = this
      return new Promise((resolve, _) => {
        let res = that.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
          parentId: code
        })
        resolve(res)
      })
    },
    getInputData () {
      this.x1 = this.x1.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
      this.x2 = this.x2.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
      this.x3 = this.x3.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
      this.x4 = this.x4.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
      this.x5 = this.x5.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
    }
  },
  computed: {
    weightCount () {
      let x1 = parseFloat(this.x1) || 0
      let x2 = parseFloat(this.x2) || 0
      let x3 = parseFloat(this.x3) || 0
      let x4 = parseFloat(this.x4) || 0
      let x5 = parseFloat(this.x5) || 0
      let sum = x1 + x2 + x3 + x4 + x5
      Math.formatFloat = function (f, digit) {
        var m = Math.pow(10, digit)
        return parseInt(f * m, 10) / m
      }
      if (sum === 1) {
        this.step3Check = true
      } else if (sum > 1) {
        this.step3Check = false
        this.isBiggerWeight = true
      } else {
        this.step3Check = false
        this.isBiggerWeight = false
      }
      return sum === 1 ? sum : Math.formatFloat(sum, 2)
    },
    overWeight () {
      return Math.abs(1 - this.weightCount).toPrecision(2)
    },
    sumOfWeight () {
      if (this.weightCount !== 1) {
        return 'sum-of-weight'
      }
      return ''
    }
  },
  mounted () {
    this.loading = false
    // this.getCities();
  }
}
</script>

<style scoped>
#xzpg-main {
  padding: 20px;
  /* height: 100%; */
  font-size: 16px;
  font-family: MicrosoftYaHei;
}
#xzpg-main #content {
  height: calc(100% - 100px);
}
#xzpg-main #footer {
  margin: 12px 0;
}
.page {
  height: 100%;
  display: flex;
  overflow: hidden;
  clear: both;
}

.panel {
  width: 360px;
  height: 600px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(151, 151, 151, 1);
  margin-right: 20px;
  color: #303030;
}

#weight-panel {
  width: 711px;
  padding: 15px;
}

#weight-panel >>> .el-input__inner {
  border-radius: 2px;
  border: 1px solid rgba(151, 151, 151, 1);
}

#xzpg-main >>> .el-radio {
  color: rgba(32, 32, 32, 1);
}

#areaGroup {
  margin: 10px 0;
}
#cityGroup {
  /* overflow: scroll; */
  height: 750px;
  /* overflow-x: hidden; */
}

#cityGroup div {
  margin-bottom: 5px;
}

#cityGroup >>> .el-checkbox-button {
  margin-left: 5px;
}

#cityGroup >>> .el-checkbox-button__inner {
  border: 1px solid #75a9e3;
}

#cityGroup >>> .el-checkbox-button:first-child .el-checkbox-button__inner {
  border: 1px solid #007aff;
  border-radius: 2px;
  font-weight: bold;
}

#cityGroup .el-checkbox-button--mini .el-checkbox-button__inner {
  border-radius: 2px;
}
.panel-left {
  padding: 10px;
}

.PGtype {
  width: 340px;
  height: 90px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(29, 124, 228, 1);
  color: rgba(48, 48, 48, 1);
  line-height: 20px;
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.PGtype:hover,
.PGtype:active {
  background: rgba(212, 235, 255, 1);
}
.isActive {
  background: rgba(212, 235, 255, 1);
}
.PG-icon {
  margin-left: 20px;
  margin-right: 10px;
  height: 40px;
  width: 40px;
}

.PG-title {
}

.check-icon {
  height: 110px;
  width: 110px;
  margin: 30px;
}
.bolder-text {
  font-size: 32px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 50px;
  margin: 50px 0;
}

.panel-title {
  background: rgba(232, 234, 246, 1);
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 22px;
}
.panel-title > span {
  width: 568px;
}

#xzpg-main .panel-title >>> .el-checkbox__label {
  padding-right: 10px;
}

#xzpg-main .panel-title >>> .el-checkbox {
  direction: rtl;
}

#pg-collpase {
  padding: 0 10px;
  height: 556px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: overlay;
}

#pg-collpase .pg-items-title {
  position: relative;
  padding: 10px 0px 9px 0px;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
}

#pg-collpase >>> .el-checkbox {
  direction: rtl;
  margin-left: 20px;
}

#pg-collpase .pg-items-title >>> .el-checkbox__label {
  padding: 0px;
  width: 500px;
  text-align: left;
}

#pg-collpase .pg-items-icon {
  position: absolute;
  left: 0;
  height: 17px;
  width: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#pg-collpase .pg-items-details {
  color: #616161;
}
#pg-collpase .pg-items-detail {
  border-bottom: 1px dashed #d8d8d8;
}

#weight-panel >>> .el-alert--info.is-light {
  background-color: rgba(236, 245, 255, 1);
  color: #000000;
  border-radius: 2px;
  border: 1px solid rgba(29, 124, 228, 1);
}

#weight-panel >>> .el-alert__icon {
  color: #1d7ce4;
  font-size: 20px;
  width: 20px;
}

#weight-panel >>> .el-alert.is-light .el-alert__closebtn {
  color: #303030;
}

#weight-panel >>> .el-alert__closebtn {
  font-size: 18px;
  top: 10px;
  right: 15px;
}

#sum-of-weight >>> .el-input__inner {
  border-radius: 2px;
  border: 1px solid rgba(151, 151, 151, 1);
  color: #d21a1a;
}

#weight-panel >>> .el-form-item__label {
  text-align: left;
}
.button {
  width: 125px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: rgba(29, 124, 228, 1);
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(29, 124, 228, 1);
  cursor: pointer;
  margin: 0 10px;
}
.primary {
  background: rgba(29, 124, 228, 1);
  color: #fff;
  border: unset;
}

.cancel {
  background: rgba(151, 151, 151, 1);
  color: #fff;
  border: unset;
}
.final {
  margin: 25px;
}

.button:hover {
  opacity: 0.8;
}
.disabled {
  background: #979797;
  cursor: not-allowed;
}
.disabled:hover {
  opacity: 1;
}
</style>
