<template>
  <div id="projectTable"
       v-if="proTableDialog">
    <el-row class="header">
      <el-col :span="6">
        <span>数据有效性检查详情</span>
      </el-col>
      <el-col :span="3"
              :offset="15"
              style="text-align:right">
        <i class="el-icon-close close"
           @click="close()"></i>
      </el-col>
    </el-row>

    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="错误信息列表（3）">
        <el-table :data="data"
                  class="table"
                  border
                  v-loading="loading"
                  height="200"
                  :element-loading-text="loadingText">
          <el-table-column type="index"
                           width="60"
                           label="序号"></el-table-column>
          <el-table-column prop="proName"
                           label="图层名称"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="type"
                           label="标识码"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="error"
                           label="错误描述"
                           min-width="200"
                           align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="任务信息列表（3）">
        <el-table :data="data"
                  class="table"
                  border
                  v-loading="loading"
                  height="200"
                  :element-loading-text="loadingText">
          <el-table-column type="index"
                           width="60"
                           label="序号"></el-table-column>
          <el-table-column prop="proName"
                           label="图层名称"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="type"
                           label="标识码"
                           min-width="200"
                           align="center"></el-table-column>
          <el-table-column prop="error"
                           label="错误描述"
                           min-width="200"
                           align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    proTableDialog: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    loading: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      columns: [],
      loadingText: '拼命加载中',
      isChartShow: false
    }
  },
  methods: {
    close() {
      this.$emit('closeDialog', false)
    }
  },
  components: {},
  watch: {
    tableData() {
      this.updateTableHeader()
    }
  }
}
</script>

<style scoped>
.header,
.nav {
  background-color: #fff;
}
#projectTable {
  width: 75%;
  position: absolute;
  left: 25%;
  bottom: 0;
}
#projectTable .nav {
  height: 40px;
  line-height: 40px;
}
#projectTable .nav span {
  cursor: pointer;
}

#projectTable .close {
  font-size: 16px;
  cursor: pointer;
}
</style>
<style >
#projectTable .el-tabs__nav-scroll {
  background-color: #fff;
}
</style>
