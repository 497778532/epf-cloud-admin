import axios from 'axios'

export default {
  data() {
    return {
      selectedOptions: [],
      props: {
        value: 'dictKey',
        label: 'zhCn',
        checkStrictly: true,
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level } = node
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
  created() {

  },
  mounted() {

  },
  methods: {}
}
