import epfExport from './main.vue'
epfExport.install = function (Vue) {
  Vue.component(epfExport.name, epfExport)
}
export default epfExport
