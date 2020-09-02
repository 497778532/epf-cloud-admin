<template>
  <el-dialog top="25vh" :visible.sync="mineDialog" width="50%" :show-close="false">
    <template slot="title" slot-scope="scope">
      <el-row>
        <el-col :span="6">矿产数据分析结果</el-col>
        <el-col :span="6" justify="end" :push="12" style="text-align:right">
          <i class="el-icon-close" @click="close()" style="font-size:20px;cursor:pointer;"></i>
        </el-col>
      </el-row>
    </template>
    <el-table :data="tableData" style="width: 100%;margin-top:50px" border>
      <el-table-column label="开采主矿种" min-width="110">
        <template slot-scope="scope">
          <span hit size="medium">{{ scope.row.noticeNo }}</span>
        </template>
      </el-table-column>

      <el-table-column label="许可证号" min-width="150">
        <template slot-scope="scope">
          <span hit size="medium">{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="原许可证号" min-width="190">
        <template slot-scope="scope">
          <span hit size="medium">{{scope.row.businessTypeName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="面积" min-width="100">
        <template slot-scope="scope">
          <span hit size="其它字段">{{ scope.row.assignor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="其它字段" min-width="120">
        <template slot-scope="scope">
          <span hit size="medium">{{ scope.row.assignor }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:right;margin:8px 0px;margin-top:15px;">
      <el-pagination
        background
        layout="prev, pager, next,sizes,jumper"
        :page-sizes="[5,10, 15, 20]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="totalRecord"
        :page-size="pageSize"
        :current-page="pageNo"
      ></el-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
      <div style="text-align:right;margin:8px 0px;margin-top:15px;">
        <el-button type="primary" size="medium" @click="11('mine')">统计图</el-button>
        <el-button type="primary" size="medium" @click="11('mine')">导出报告</el-button>
        <el-button type="primary" size="medium" @click="11('mine')">导出Excel</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    mineDialog: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {
      tableData: [
        {
          name: '哈哈哈'
        },
        {
          name: '哈哈哈'
        },
        {
          name: '哈哈哈'
        },
        {
          name: '哈哈哈'
        }
      ],
      totalRecord: 0,
      pageSize: 0,
      pageNo: 0
    }
  },
  methods: {
    close() {
      this.$emit('closeDialog', false)
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  components: {}
}
</script>

<style scoped>
#superposition {
  height: 300px;
}

.el-dialog__footer {
  padding: 0 20px;
}
/* #superposition .el-scrollbar {
  height: 100%;
  padding: 5px 0 0 5px;
  border-radius: 6px;
}
#superposition .el-scrollbar__wrap {
  overflow-x: hidden;
} */
</style>
