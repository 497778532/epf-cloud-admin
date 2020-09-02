import echarts from 'echarts'
export default {

  data () {
    return {
      chart: '',
      sortParam: '',
      selected: [],
      previous: ''
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    loadMap (id, option, callback, event) {
      const that = this
      this.$nextTick(function () {
        setTimeout(() => {
          that.chart = echarts.init(this.$refs[id])
          that.chart.setOption(option, true)
          that.chart.on('legendselectchanged', function (params) {
            console.log(1)
            let data = params.selected
            that.selected = []
            for (let k in data) {
              if (data[k]) {
                that.selected.push(k)
              }
            }

            // '符合基本农田落实地类情况',
            // '疑似符合基本农田落实地类情况',
            // '疑似不符合基本农田落实地类情况',
            // '不符合基本农田落实地类情况'
            if (that.selected.length !== 1) {
              that.sortParam = ''
              return
            }
            switch (that.selected[0]) {
              case '符合基本农田落实地类情况':
                that.sortParam = 'accordArea'
                break

              case '疑似符合基本农田落实地类情况':
                that.sortParam = 'suspectAccordArea'
                break
              case '疑似不符合基本农田落实地类情况':
                that.sortParam = 'suspectUnaccordArea'
                break
              case '不符合基本农田落实地类情况':
                that.sortParam = 'unaccordArea'
                break
              case '生态保护红线面积':
                that.sortParam = 'redLineArea'
                break
              case '城镇开发边界面积':
                that.sortParam = 'townBorderArea'
                break
            }
          })

          if (callback) {
            callback()
          }
          that.chart.on('click', function (params) {
            if (event) {
              event(params)
            }
            if (callback) {
              callback()
            }
          })

          that.chart.resize()
        }, 200)
      })
    },
    initEchart (id) {
      let that = this
      window.addEventListener('resize', () => {
        this.$refs[id].$el.style.width = 100 + '%'
        that.chart.resize() // 直接加这句即可
      })
    }
  }
}
