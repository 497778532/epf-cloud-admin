<template>
  <div class="epf-table__all">
    <el-row type="flex">
      <el-col :span="24">
        <div class="epf-table__one">
          <el-row class="epf-table__title">
            <span>生态重要性评价结果与生态保护红线对比情况</span>
          </el-row>
          <div style="padding:15px">
            <el-table
              :data="tableData"
              style="width: 100%;margin-top:10px"
              border
       
            >
              <el-table-column label="市名称" min-width="80" align="center">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="县（市、区）名称" min-width="100" align="center" prop="amount1">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="主体功能分区" min-width="150" align="center" prop="amount2">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.age }}</span>
                </template>
              </el-table-column>
              <el-table-column label="农业适宜比例极差标准化" min-width="150" align="center" prop="amount2">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.amount1 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="城镇适宜比例极差标准化" min-width="150" align="center" prop="amount2">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.amount2 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="生态适宜比例极差标准化" min-width="150" align="center" prop="amount2">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.amount3 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="优势功能识别结果" min-width="150" align="center" prop="amount2">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.status }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "广州市",
          name: "从化市",
          age: "国家级优化开发区域",
          amount1: "0.11",
          amount2: "0.24",
          amount3: "0.40",
          amount3: "0.73",
          status: "生态"
        },
        {
          id: "韶关市",
          name: "武江区",
          age: "省级重点开发区域",
          amount1: "0.20",
          amount2: "0.23",
          amount3: "0.45",
          amount3: "0.74",
          status: "生态"
        },
        {
          id: "韶关市",
          name: "曲江区 ",
          age: "省级重点开发区域",
          amount1: "0.22",
          amount2: "0.44",
          amount3: "0.65",
          amount3: "0.32",
          status: "生态"
        },
        {
          id: "茂名市",
          name: "化州市",
          age: "国家级农产品主产区",
          amount1: "0.53",
          amount2: "0.82",
          amount3: "0.48",
          amount3: "0.48",
          status: "城镇"
        },
        {
          id: "惠州市",
          name: "龙门县",
          age: "国家级农产品主产区",
          amount1: "0.21",
          amount2: "0.31",
          amount3: "0.84",
          amount3: "0.48",
          status: "生态"
        }
      ]
    };
  },
  methods: {

  },
  components: {}
};
</script>

<style>
@import "./css/index.css";
</style>

