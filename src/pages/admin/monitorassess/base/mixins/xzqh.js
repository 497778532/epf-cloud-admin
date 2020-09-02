import axios from 'axios'
export default {
  data () {
    return {
      params: {},
      areaSelectedOptions: ['440000'],
      props: {
        value: 'dictKey',
        label: 'zhCn',
        checkStrictly: true,
        expandTrigger: 'hover',
        lazy: true,
        async lazyLoad (node, resolve) {
          const {
            level
          } = node
          if (level === 0) {
            const dictionariesList = [{
              zhCn: '广东省',
              id: '440000',
              parentId: '0',
              dictKey: '440000',
              dictValue: '440000'
            }]
            return resolve(dictionariesList)
          }
          const res = await axios.get(
            `/api/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${node.data.dictKey}`
          )
          res.dictionariesList.forEach(
            item => (item.leaf = level >= 2)
          )
          return resolve(res.dictionariesList)
        }
      }
    }
  },
  methods: {
    // 城市三级联动
    areaSelect (val) {
      console.log(this.areaSelectedOptions)
      this.params.province = this.areaSelectedOptions[0]
      this.params.city = this.areaSelectedOptions[1]
      this.params.area = this.areaSelectedOptions[2]

      this.nextparams.province = this.areaSelectedOptions[0]
      this.nextparams.cityx = this.areaSelectedOptions[1]

      this.lastparams.province = this.areaSelectedOptions[0]
      this.lastparams.city = this.areaSelectedOptions[1]
      this.lastparams.area = this.areaSelectedOptions[2]
    }
  }
}
