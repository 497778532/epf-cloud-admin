import Vue from 'vue'
import './global'
import './epf-mapview-tools/index'
import EPFPanel from './epf-panel/index'
import EPFSide from './epf-side/index'
import EPFButton from './epf-button/index'
import EPFChart from './epf-chart/index'
import EPFRow from './epf-row/index'
import EPFColumn from './epf-column/index'
import EPFShowmore from './epf-showmore/index'
import EPFTitle from './epf-title/index'
import EPFExport from './epf-export/index'
import EPFBlock from './epf-block/index'
import EPFPage from './epf-page/index'
import EPFText from './epf-text/index'
import EPFSplitline from './epf-splitline/index'
import EPFMapviewPopup from './epf-mapview-popup/index'
import EPFLoading from './epf-loading/index'
import EPFSceneView from './epf-sceneview/index'
import EPFMapview from './epf-mapview/index'

const components = [
  EPFPanel,
  EPFSide,
  EPFButton,
  EPFChart,
  EPFRow,
  EPFColumn,
  EPFShowmore,
  EPFTitle,
  EPFExport,
  EPFBlock,
  EPFPage,
  EPFText,
  EPFSplitline,
  EPFMapviewPopup,
  EPFLoading,
  EPFSceneView,
  EPFMapview
]
components.forEach(component => {
  Vue.use(component)
})
