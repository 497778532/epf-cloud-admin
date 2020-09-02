import epfMapview from './src/main.vue'
epfMapview.install = function (Vue) {
  Vue.component(epfMapview.name, epfMapview)
}
export default epfMapview
