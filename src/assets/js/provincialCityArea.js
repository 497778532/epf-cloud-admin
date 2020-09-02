export default {
  data () {
    return {
      dictionary: {
        // 字典码结果
        cantonCity: '',

        administrative_regions: [
          { id: '440000', dictKey: '440000', zhCn: '广东省' }
        ],
        cantonArea: ''
      },
      dicNum: 0,
      dicRequest: [
        'cantonCity'
      ] // 字典码请求
    }
  },
  created () {
    let reqArr = this.dicRequest.map((item, index, arr) => {
      let reqFun = new Promise((resolve, reject) => {
        if (item == 'cantonCity') {
          this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
            parentId: '440000'
          }).then(res => {
            resolve(res)
          })
        } else {
          this.$get(
            `/epf-admin/admin/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            resolve(res)
          })
        }
      })
      return reqFun
    })
    Promise.all(reqArr).then(res => {
      let dicArr = res.map(item => {
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          }
        })
        return dicArr
      })

      for (let item in this.dictionary) {
        this.dictionary[item] = dicArr[this.dicNum]

        this.dicNum++
      }
      this.dictionary.administrative_regions = [
        {
          dictKey: '440000',
          zhCn: '广东省',
          id: '440000'
        }
      ]
    })
  },
  mounted () {

  },
  methods: {

  }
}
