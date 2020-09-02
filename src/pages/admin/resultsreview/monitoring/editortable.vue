<template>
  <div class="exchangeTable">
    <el-row>
      <el-col :span="7"
              style="font-size:18px;color:rgba(79,79,79,1)">成果修改排行榜</el-col>
      <div v-if="canMore"
           class="more"
           @click="toDetail()">更多</div>
      <div class="bottonParent">
        <span v-for="(item,index) in buttons "
              :class="{'active':isCurrent.id===item.id}"
              @click="isCurrent=item"
              :key="index">{{item.name}}</span>
      </div>
    </el-row>
    <el-table :data="data"
              style="width: 100%;margin-top:15px"
              border>
      <el-table-column label="排名"
                       min-width="40">
        <template slot-scope="scope">
          <span hit
                size="medium">{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成果名称"
                       min-width="150">
        <template slot-scope="scope">
          <span hit
                size="medium">{{ scope.row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column label="行政区域"
                       min-width="90">
        <template slot-scope="scope">
          <span hit
                size="medium">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="汇报次数"
                       min-width="70">
        <template slot-scope="scope">
          <span hit
                size="medium">{{ scope.row.class }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:right;margin:8px 0px;margin-top:15px;"
         v-if="!canMore">
      <el-pagination background
                     layout="prev, pager, next,sizes,jumper"
                     :page-sizes="[5,10, 15, 20]"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :total="totalRecord"
                     :page-size="pageSize"
                     :current-page="pageNo"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    canMore: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  data () {
    return {
      pageNo: 1, // 当前页
      pageSize: 10, // 当前每页条数
      totalPage: 1, // 总页数
      totalRecord: 1, // 总条数

      isCurrent: { id: 1, name: '本日' },
      buttons: [
        { id: 1, name: '本日' },
        { id: 2, name: '本周' },
        { id: 3, name: '本月' },
        { id: 4, name: '本年' }
      ]
    }
  },
  components: {},
  methods: {
    ...mapActions(['setTabsList']),
    toDetail () {
      let title = '成果修改排行榜'
      let routerPath = '/editortabledetail'
      console.log(routerPath)
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    }
  }
}
</script>

<style scoped>
.exchangeTable {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-shadow: 1px 3px 12px 5px rgba(0, 0, 0, 0.06);
}
.bottonParent {
  border: 1px solid rgba(151, 151, 151, 1);
  border-radius: 11px;
  font-size: 0;
  float: right;
}
.bottonParent span {
  cursor: pointer;
  padding: 2px 15px;
  font-size: 16px;
  color: rgba(104, 104, 104, 1);
}

.bottonParent .active {
  border-radius: 11px;
  background-color: rgba(29, 124, 228, 1);
  color: rgba(255, 255, 255, 1);
}

.exchangeTable .el-table td,
.exchangeTable .el-table th {
  padding: 9px 0;
}
.exchangeTable .el-table .el-table__header thead th {
  background: rgba(189, 208, 255, 0.5);
}
.more {
  color: rgba(29, 124, 228, 1);
  cursor: pointer;
  float: right;
  padding: 2px 0 2px 15px;
}
</style>
