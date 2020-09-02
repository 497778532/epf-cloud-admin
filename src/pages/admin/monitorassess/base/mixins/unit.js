export default {
  data () {
    return {
      unitsVal: 'HECTARE',
      unitName: '单位：公顷',
      units: [
        { label: '平方公里', value: 'SQUARE_KILOMETER' },
        { label: '亩', value: 'MU' },
        { label: '万亩', value: 'MILLION_MU' },
        { label: '平方米', value: 'SQUARE_METER' },
        { label: '公顷', value: 'HECTARE' }
      ]
    }
  },
  methods: {
    unitNameSelect () {
      if (this.unitsVal === 'SQUARE_KILOMETER') {
        this.unitName = '单位：平方公里'
      } else if (this.unitsVal === 'MU') {
        this.unitName = '单位：亩'
      } else if (this.unitsVal === 'MILLION_MU') {
        this.unitName = '单位：万亩'
      } else if (this.unitsVal === 'SQUARE_METER') {
        this.unitName = '单位：平方米'
      } else if (this.unitsVal === 'HECTARE') {
        this.unitName = '单位：公顷'
      }
    }
  }
}
