<template>
  <div id="attributeTable"
       v-show="isAttributeTableShow">
    <el-tabs v-model="editableTabsValue"
             @tab-click="handleTabClick">
      <el-tab-pane :key="index"
                   v-for="(item, index) in editableTabs"
                   :label="item.title"
                   :name="item.name">
        <el-row id="header">
          <el-select v-model="selectResult"
                     size="mini"
                     style="width:120px;"
                     placeholder="选项"
                     @change="selectChange">
            <el-option v-for="(item, index) in selectItems"
                       :key="index"
                       class="option-class"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>

          <el-button size="mini"
                     @click="extentFilterClick">{{filterTitle}}</el-button>
          <el-button size="mini"
                     @click="zoomInClick"
                     icon="el-icon-location">{{zoomInTitle}}</el-button>
          <el-button size="mini"
                     @click="clearClick"
                     icon="el-icon-delete">{{clearTitle}}</el-button>
          <el-button size="mini"
                     @click="refreshClick"
                     icon="el-icon-refresh">{{refreshTitle}}</el-button>
        </el-row>

        <el-row>
          <el-table :data="listData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                    :height="tableHeight"
                    tooltip-effect="dark"
                    highlight-current-row
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    @select-all="selectAll"
                    @row-click="rowClick"
                    :row-style="rowStyle">
            <el-table-column type="selection"
                             style="display:none;"></el-table-column>
            <el-table-column v-for="{ prop, label } in columns"
                             :key="prop"
                             :prop="prop"
                             :label="label"
                             show-overflow-tooltip></el-table-column>
          </el-table>
          <el-pagination background
                         layout="prev, pager, next"
                         :total="tableDataLength"
                         align="center"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-size="pageSize"></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    layerId: String
  },
  name: 'attributeTable',
  data() {
    return {
      selectResult: '',
      filterTitle: '按地图范围过滤',
      zoomInTitle: '缩放至',
      clearTitle: '清除选择',
      refreshTitle: '加载数据',
      closeTitle: '关闭',
      columns: [],
      tableHeight: '500px',
      selectItems: [
        { label: '显示所选记录', value: '显示所选记录' },
        { label: '显示相关记录', value: '显示相关记录' },
        { label: '过滤器', value: '过滤器' },
        { label: '显示/隐藏列', value: '显示/隐藏列' }
      ],
      listData: [],
      multipleSelection: [],
      selectionRow: [],
      editableTabsValue: '0',
      editableTabs: [],
      tabIndex: 0,
      isAttributeTableShow: false,
      currentPage: 1,
      pageSize: 60,
      tableDataLength: 1,
      layerOutFieldsAlias: []
    }
  },
  computed: {
    bottomSelectionRow() {
      if (this.selectionRow.length === 0) return null
      return this.selectionRow.reduce((start, end) => {
        return start.rowIndex > end.rowIndex ? start : end
      })
    },
    topSelectionRow() {
      if (this.selectionRow.length === 0) return null
      return this.selectionRow.reduce((start, end) => {
        return start.rowIndex < end.rowIndex ? start : end
      })
    },
    mapApp() {
      return this.$parent.mapApp
    }
  },
  watch: {
    layerId(newVal, oldVal) {
      this.startupTabs()
    },
    isAttributeTableShow() {
      this.refreshClick()
    }
  },
  methods: {
    selectChange() { },
    startupTabs() {
      let isCurrentLayerExisted = this.editableTabs.some(
        e => e.title === this.layerId
      )
      if (!isCurrentLayerExisted) {
        this.addTab()
        this.getLayerOutFieldsAlias()
      }
    },
    handleSizeChange() {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleTabClick(e) {
      this.refreshClick(this.layerId)
      this.refreshClick(this.layerId)
      this.$emit('watchTabLabel', e.label)
    },
    closeClick() {
      this.editableTabsValue = '0'
      this.editableTabs = []
      this.tabIndex = 0
    },
    addTab() {
      // let layer = this.mapApp.findLayerById(this.layerId);
      let newTabId = ++this.tabIndex + ''
      // let title = layer.id || layer.title;
      this.editableTabs.push({
        title: this.layerId,
        name: newTabId
      })
      this.editableTabsValue = newTabId
      this.refreshClick()
    },
    extentFilterClick() {
      let me = this
      var aq = me.mapApp.createAttributeQuery(
        me.mapApp,
        me.layerId,
        me.mapApp.view.extent
      )
      aq._queryCount().then(count => {
        if (count > 1000) {
          let popup = confirm('选择要素的数量超过系统限制(1000)，是否继续？')
          if (!popup) return
        }
        aq._queryAttributes().then(results => {
          // me.mapApp.res['' + me.layerId] = results.features.reduce(
          //   (arr, cur) => arr.concat(cur.attributes),
          //   []
          // )
          me.mapApp.res['' + me.layerId] = results.features
          me.isAttributeTableShow = true
          me.refreshClick()
        })
      })
    },
    zoomInClick() {
      let me = this;
      if (me.mapApp.findLayerById("RGLayer")) {
        var graphics =  me.mapApp.findLayerById("RGLayer").graphics
        if(graphics.length>0){
          var gra = graphics.items[graphics.length-1];
          let extent = gra.geometry.centroid
          if(!extent.latitude){
            extent = gra.geometry.rings
          }
          me.mapApp.view.zoom = 10
          me.mapApp.view.goTo(extent)
        }
      }
     },
    clearClick() {
      let tabIndex = this.editableTabs.findIndex(e => e.title === this.layerId)
      if (tabIndex !== -1) {
        this.$refs.multipleTable[tabIndex].clearSelection()
      }
      this.mapApp.view.graphics.removeAll();
      if (this.mapApp.findLayerById("RGLayer")) {
        this.mapApp.removeLayerById("RGLayer");
      }
    },
    getLayerOutFieldsAlias() {
      let layer = this.mapApp.findLayerById(this.layerId)

      this.layerOutFieldsAlias['' + this.layerId] = new Map()
      if (!layer.fields) {
        for (let field in this.listData[0]) {
          this.layerOutFieldsAlias['' + this.layerId].set(field, field)
        }
      } else {
        layer.fields.forEach(field => {
          this.layerOutFieldsAlias['' + this.layerId].set(
            field.name,
            field.alias
          )
        })
      }
    },
    updateTableHeader() {
      this.columns = []
      if (this.listData.length === 0) return
      this.getLayerOutFieldsAlias()
      let layerOutFieldsAlias = this.layerOutFieldsAlias['' + this.layerId]
      let tableHeader = this.listData[0]
      var propAlias, data
      for (let propName in tableHeader) {
        propAlias = layerOutFieldsAlias.get(propName)
        data = {
          prop: propName,
          label: propAlias
        }
        this.columns.push(data)
      }
    },
    refreshClick() {
      this.listData = []
      this.listData = this.mapApp.res['' + this.layerId]
        ? this.mapApp.res['' + this.layerId]
        : []
      if(this.listData.length>0){
        var tempArr = [];
        this.listData.forEach(item=>{
          tempArr.push(item.attributes)
        })
        this.listData = tempArr
      }
      this.updateTableHeader()
      this.tableDataLength = this.listData.length
    },
    getTopAndBottom(row, bottom, top) {
      let n = row.rowIndex,
        mx = bottom.rowIndex,
        mi = top.rowIndex
      if (n > mx) {
        return {
          top: mi,
          bottom: n
        }
      } else if (n < mx && n > mi) {
        return {
          top: mi,
          bottom: n
        }
      } else if (n < mi) {
        return {
          top: n,
          bottom: mx
        }
      } else if (n == mi || n == mx) {
        return {
          top: mi,
          bottom: mx
        }
      }
    },
    rowClick(row, column, event) {          
      let tabIndex = this.editableTabs.findIndex(e => e.title === this.layerId)
      if (tabIndex !== -1) {
        let refsElTable = this.$refs.multipleTable[tabIndex]
        refsElTable.toggleRowSelection(row)
      }
      // if(this.selectionRow.length>0){
      //   this.selectionRow.forEach((item,index)=>{
      //     if(item["OBJECTID"]==row["OBJECTID"]){
      //       this.selectionRow.splice(index,1)
      //     }else{
      //       this.selectionRow.push(item)
      //     }
      //   })       
      // }else{
      //     this.selectionRow.push(item)
      // }
      //this.handleSelectionChange(this.selectionRow);
    },
    // rowClick(row, column, event) {
    //   let tabIndex = this.editableTabs.findIndex(e => e.title === this.layerId)
    //   if (tabIndex !== -1) {
    //     let refsElTable = this.$refs.multipleTable[tabIndex]
    //     if (this.CtrlDown) {
    //       refsElTable.toggleRowSelection(row)
    //       return
    //     }
    //     if (this.shiftOrAltDown && this.selectionRow.length > 0) {
    //       let topAndBottom = this.getTopAndBottom(
    //         row,
    //         this.bottomSelectionRow,
    //         this.topSelectionRow
    //       )
    //       refsElTable.clearSelection()
    //       for (
    //         let index = topAndBottom.top;
    //         index <= topAndBottom.bottom;
    //         index++
    //       ) {
    //         refsElTable.toggleRowSelection(this.tableData[index], true)
    //       }
    //     } else {
    //       let findRow = this.selectionRow.find(c => c.rowIndex == row.rowIndex)
    //       if (findRow && this.selectionRow.length == 1) {
    //         refsElTable.toggleRowSelection(row, false)
    //         return
    //       }
    //       refsElTable.clearSelection()
    //       refsElTable.toggleRowSelection(row)
    //     }
    //   }

    //   let me = this
    //   let layer = me.mapApp.findLayerById(me.layerId)
    //   if (!layer) return
    //   let url = layer.url + '/0'
    //   let where
    //   if (row['FID'] != null) {
    //     where = 'FID = ' + row['FID']
    //   } else {
    //     where = 'OBJECTID = ' + row['OBJECTID']
    //   }

    //   var aq = me.mapApp.createAttributeQuery(me.mapApp, null, null)
    //   aq.doQuery(url, where)
    //     .then(res => {
    //       let extent = res.features[0].geometry.extent
    //       if (extent.spatialReference.wkid === null) {
    //         extent.spatialReference.wkid = me.mapApp.view.spatialReference.wkid
    //       }
    //       me.mapApp.view.goTo(extent)
    //       let sq = me.mapApp.createSpatialQuery(me.mapApp, null, null)
    //       sq.showSelectedFeatures(res.features[0])
    //     })
    //     .catch(err => console.log(err))
    // },
    rowStyle({ row, rowIndex }) {
      Object.defineProperty(row, 'rowIndex', {
        value: rowIndex,
        writable: true,
        enumerable: false
      })
    },
    rowClassName({ row, rowIndex }) {
      let rowName = '',
        findRow = this.selectionRow.find(c => c.rowIndex === row.rowIndex)
      if (findRow) {
        rowName = 'current-row '
      }
      return rowName
    },
    selectAll(){ },
    handleSelectionChange(val) {   
      if(val.length==0) this.clearClick();  
      this.selectionRow = val
      var graArr = [];
      // var Glayer = this.mapApp.findLayerById("RGLayer").graphics;
      var Glayer = this.mapApp.res['' + this.layerId]
        ? this.mapApp.res['' + this.layerId]
        : []
      if(this.selectionRow.length>0){
        for(var i=0;i<this.selectionRow.length;i++){
          if(!this.selectionRow[i]["OBJECTID"]) continue
          for(var j=0;j<Glayer.length;j++){
            if(Glayer[j].attributes["OBJECTID"]==this.selectionRow[i]["OBJECTID"]){
              var gra = Glayer[j]
            if(gra) graArr.push(gra);
            }           
          }
        //var gra = this.checkboxfind(this.selectionRow[i])
        }
        //console.log(graArr)
        if(graArr.length>0){
          let sq = this.mapApp.createSpatialQuery(this.mapApp, null, null)
            sq.showSelectedFeatures(graArr)
            this.zoomInClick();
            // var graphics = graArr[graArr.length-1]
            // if(graphics.length>0){
            //   var gra = graphics.items[graphics.length-1];
            //   let extent = gra.geometry.centroid
            //   if(!extent.latitude){
            //     extent = gra.geometry.rings
            //   }
            //   me.mapApp.view.zoom = 13
            //   me.mapApp.view.goTo(extent)
            // }
        }
      }    
    },
    keyDown(event) {
      let key = event.keyCode
      if (key == 17) this.CtrlDown = true
      if (key == 16 || key == 18) this.shiftOrAltDown = true
    },
    keyUp(event) {
      let key = event.keyCode
      if (key == 17) this.CtrlDown = false
      if (key == 16 || key == 18) this.shiftOrAltDown = false
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown, false)
    window.addEventListener('keyup', this.keyUp, false)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
  }
  // directives: {
  //   drag: {
  //     inserted: function (el, binding, vNode) {
  //         el.setAttribute('style', 'position: fixed;')
  //     },
  //     bind: function (el, bindding, vNode) {
  //       el.setAttribute('draggable', true)
  //       let left, top, width, height
  //       el._dragstart = function (event) {
  //         event.stopPropagation()
  //         left = event.clientX - el.offsetLeft
  //         top = event.clientY - el.offsetTop
  //         width = el.offsetWidth
  //         height = el.offsetHeight
  //       }
  //       el._checkPosition = function () { // 防止被拖出边界
  //         let width = el.offsetWidth
  //         let height = el.offsetHeight
  //         let left = Math.min(el.offsetLeft, document.body.clientWidth - width)
  //         left = Math.max(0, left)
  //         let top = Math.min(el.offsetTop, document.body.clientHeight - height)
  //         top = Math.max(0, top)
  //         el.style.left = left + 'px'
  //         el.style.top = top + 'px'
  //         el.style.width = width + 'px'
  //         el.style.height = height + 'px'
  //       }
  //       el._dragEnd = function (event) {
  //         event.stopPropagation()
  //         left = event.clientX - left
  //         top = event.clientY - top
  //         el.style.left = left + 'px'
  //         el.style.top = top + 'px'
  //         el.style.width = width + 'px'
  //         el.style.height = height + 'px'
  //         el._checkPosition()
  //       }
  //       el._documentAllowDraop = function (event) {
  //         event.preventDefault()
  //       }
  //       document.body.addEventListener('dragover', el._documentAllowDraop)
  //       el.addEventListener('dragstart', el._dragstart)
  //       el.addEventListener('dragend', el._dragEnd)
  //       window.addEventListener('resize', el._checkPosition)
  //     },
  //     unbind: function (el, bindding, vNode) {
  //       document.body.removeEventListener('dragover', el._documentAllowDraop)
  //       el.removeEventListener('dragstart', el._dragstart)
  //       el.removeEventListener('dragend', el._dragEnd)
  //       window.removeEventListener('resize', el._checkPosition)
  //       delete el._documentAllowDraop
  //       delete el._dragstart
  //       delete el._dragEnd
  //       delete el._checkPosition
  //     }
  //   }
  // }
}
</script>
<style scoped>
#attributeTable {
  position: absolute;
  top: 3rem;
  right: 0rem;
  width: 43.75rem;
  padding: 10px;
  background: #fff;
  border-radius: 2px;
  border: 0.3px solid #d6d6d6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
/* .closeButton {
    position: absolute;
    right: 0px;
    top: 0px;
} */
#attributeTable .el-table {
  font-size: 10px;
}
#header {
  padding: 10px 0px;
}
</style>
