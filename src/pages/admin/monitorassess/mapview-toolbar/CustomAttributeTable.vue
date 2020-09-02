<template>
  <epf-block>
    <epf-row></epf-row>
    <el-table :data="gisData"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:80px;"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column v-for="{ prop, label } in queryResultColumns"
                             :key="prop"
                             :prop="prop"
                             :label="label"
                             show-overflow-tooltip></el-table-column>
                    </el-table>
                    <el-pagination
                      background
                      layout="total, prev, pager, next,sizes,jumper"
                      :page-sizes="[5, 10, 15, 20]"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :total="totalRecord"
                      :current-page.sync="currentPage"
                      :page-size="pageSize"
                    ></el-pagination>
  </epf-block>
</template>
<script>
export default {
  props: {
    layerUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mapApp: null,

      queryResult: null,
      queryResultProperties: [],
      queryResultColumns: [],

      totalRecord: 0,
      currentPage: 1,
      pageSize: 5
    }
  },
  mounted() {
    const me = this
    this.$bus.$on('viewLoaded', res => {
      me.mapApp = me.$findMapApp(res)
      me.queryResultProperties = []
      setTimeout(() => {
        me.getDataFromGISService('1,2,3,4,5').then(res => {
          if (res) {
            me.queryResult = res
            me.queryResultColumns = Object.keys(res.properties)
            if (me.queryResultProperties.length > 0) {
              me.queryResult.forEach(item => {
                me.queryResultProperties.push(item.properties)
              })
            }
          }
        })
      }, 1000)
    })
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    getDataFromGISService(objectIds) {
      const me = this
      if (!this.mapApp) return
      return new Promise(resolve => {
        const sqlStr = 'OBJECTID_1 IN (' + objectIds + ')'
        me.mapApp.getQueryResult(this.layerUrl + '/0/query', null, [{ key: 'where', val: sqlStr}]).then(res => {
          if (res && res.fields) {
            me.columns = []
            res.fields.forEach(field => {
              me.columns.push({
                prop: field.name,
                label: field.alias
              })
            })
          }
          if (res && res.data) {
            me.totalRecord = 1000
            me.totalPage = Math.ceil((me.totalRecord * 1) / (me.pageSize * 1))
            me.features = me.$cloneDeep(res.data.features)
            resolve(me.features)
          }
        })
      })
    }
  }
}
</script>
<style scoped>

</style>
