<template>
  <div class="epf-table__all">
    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <div class="epf-table__one">
          <el-row class="epf-table__title">
            <span>农业适宜性评价结果与永久基本农田的对比情况</span>
          </el-row>
          <div style="padding:15px">
            <el-row type="flex" justify="end">单位：km²</el-row>
            <el-table
              :data="tableData"
              style="width: 100%;margin-top:10px"
              border
              :summary-method="getSummaries"
              show-summary
            >
              <el-table-column label="承载力等级" min-width="80" align="center">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="评价结果" min-width="100" align="center" prop="key1">
                <template slot-scope="scope">
                  <el-row class="epf-table__row epf-table__fristRow">
                    <el-col :span="12" class="epf-table__fristCol">面积</el-col>
                    <el-col :span="12">{{ scope.row.key1 }}</el-col>
                  </el-row>
                  <el-row class="epf-table__row">
                    <el-col :span="12" class="epf-table__fristCol">占比</el-col>
                    <el-col :span="12">{{ scope.row.key2 }}</el-col>
                  </el-row>
                  <!-- <div>
                    <span>面积</span>
                    <span>236634.97</span>
                  </div>
                  <div>
                    <span>占比</span>
                    <span>13.6</span>
                  </div>-->
                </template>
              </el-table-column>
              <el-table-column label="现状耕地面积" min-width="150" align="center" prop="value1">
                <template slot-scope="scope">
                  <el-row class="epf-table__row epf-table__fristRow">
                    <el-col :span="24">{{ scope.row.value1 }}</el-col>
                  </el-row>
                  <el-row class="epf-table__row">
                    <el-col :span="24">{{ scope.row.value2 }}</el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="epf-table__one">
          <el-row class="epf-table__title">
            <span>城镇适宜性评价结果与城镇开发边界的对比情况</span>
          </el-row>
          <div style="padding:15px">
            <el-row type="flex" justify="end">单位：km²</el-row>
            <el-table
              :data="tableData2"
              style="width: 100%;margin-top:10px"
              border
              :summary-method="getSummaries"
              show-summary
            >
              <el-table-column label="承载力等级" min-width="80" align="center">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="评价结果" min-width="100" align="center" prop="key1">
                <template slot-scope="scope">
                  <el-row class="epf-table__row epf-table__fristRow">
                    <el-col :span="12" class="epf-table__fristCol">面积</el-col>
                    <el-col :span="12">{{ scope.row.key1 }}</el-col>
                  </el-row>
                  <el-row class="epf-table__row">
                    <el-col :span="12" class="epf-table__fristCol">占比</el-col>
                    <el-col :span="12">{{ scope.row.key2 }}</el-col>
                  </el-row>
                  <!-- <div>
                    <span>面积</span>
                    <span>236634.97</span>
                  </div>
                  <div>
                    <span>占比</span>
                    <span>13.6</span>
                  </div>-->
                </template>
              </el-table-column>
              <el-table-column label="现状耕地面积" min-width="150" align="center" prop="value1">
                <template slot-scope="scope">
                  <el-row class="epf-table__row epf-table__fristRow">
                    <el-col :span="24">{{ scope.row.value1 }}</el-col>
                  </el-row>
                  <el-row class="epf-table__row">
                    <el-col :span="24">{{ scope.row.value2 }}</el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <div class="epf-table__one">
          <el-row class="epf-table__title">
            <span>一般适宜及以上的永久基本农田分布情况</span>
          </el-row>
          <div style="padding:15px">
            <el-row type="flex" justify="end">单位：km²</el-row>
            <el-table
              :data="tableData3"
              style="width: 100%;margin-top:10px"
              border
              :summary-method="getSummaries"
              show-summary
            >
              <el-table-column label="承载力等级" min-width="80" align="center">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="评价结果" min-width="100" align="center" prop="key1">
                <template slot-scope="scope">
                  <el-row class="epf-table__row epf-table__fristRow">
                    <el-col :span="12" class="epf-table__fristCol">面积</el-col>
                    <el-col :span="12">{{ scope.row.key1 }}</el-col>
                  </el-row>
                  <el-row class="epf-table__row">
                    <el-col :span="12" class="epf-table__fristCol">占比</el-col>
                    <el-col :span="12">{{ scope.row.key2 }}</el-col>
                  </el-row>
                  <!-- <div>
                    <span>面积</span>
                    <span>236634.97</span>
                  </div>
                  <div>
                    <span>占比</span>
                    <span>13.6</span>
                  </div>-->
                </template>
              </el-table-column>
              <el-table-column label="现状耕地面积" min-width="150" align="center" prop="value1">
                <template slot-scope="scope">
                  <el-row class="epf-table__row epf-table__fristRow">
                    <el-col :span="24">{{ scope.row.value1 }}</el-col>
                  </el-row>
                  <el-row class="epf-table__row">
                    <el-col :span="24">{{ scope.row.value2 }}</el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="epf-table__one">
          <el-row class="epf-table__title">
            <span>一般适宜及以上的城镇开发边界分布情况</span>
          </el-row>
          <div style="padding:15px">
            <el-row type="flex" justify="end">单位：km²</el-row>
            <el-table
              :data="tableData4"
              style="width: 100%;margin-top:10px"
              border
              :summary-method="getSummaries"
              show-summary
            >
              <el-table-column label="承载力等级" min-width="80" align="center">
                <template slot-scope="scope">
                  <span hit size="medium">{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="评价结果" min-width="100" align="center" prop="key1">
                <template slot-scope="scope">
                  <el-row class="epf-table__row epf-table__fristRow">
                    <el-col :span="12" class="epf-table__fristCol">面积</el-col>
                    <el-col :span="12">{{ scope.row.key1 }}</el-col>
                  </el-row>
                  <el-row class="epf-table__row">
                    <el-col :span="12" class="epf-table__fristCol">占比</el-col>
                    <el-col :span="12">{{ scope.row.key2 }}</el-col>
                  </el-row>
                  <!-- <div>
                    <span>面积</span>
                    <span>236634.97</span>
                  </div>
                  <div>
                    <span>占比</span>
                    <span>13.6</span>
                  </div>-->
                </template>
              </el-table-column>
              <el-table-column label="现状耕地面积" min-width="150" align="center" prop="value1">
                <template slot-scope="scope">
                  <el-row class="epf-table__row epf-table__fristRow">
                    <el-col :span="24">{{ scope.row.value1 }}</el-col>
                  </el-row>
                  <el-row class="epf-table__row">
                    <el-col :span="24">{{ scope.row.value2 }}</el-col>
                  </el-row>
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
          id: "适应",
          name: "王小虎",
          key1: "108449.96",
          key2: "60.37%",
          value1: "32047.60",
          value2: "88.85%"
        },
        {
          id: "一般适应",
          name: "王小虎",
          key1: "37587.19",
          key2: "20.92%",
          value1: "3494.58",
          value2: "9.69%"
        },
        {
          id: "不适应",
          name: "王小虎",
          key1: "33606.85",
          key2: "18.71%",
          value1: "527.36",
          value2: "1.46%"
        }
      ],

      tableData2: [
        {
          id: "适应",
          name: "王小虎",
          key1: "93923.39",
          key2: "52.28%",
          value1: "6975.91",
          value2: "94.67%"
        },
        {
          id: "一般适应",
          name: "王小虎",
          key1: "37587.19",
          key2: "14.59%",
          value1: "3494.58",
          value2: "3.96%"
        },
        {
          id: "不适应",
          name: "王小虎",
          key1: "59508.42",
          key2: "33.13%",
          value1: "100.03",
          value2: "1.36%"
        }
      ],
      tableData3: [
        {
          id: "珠三角",
          key1: "40863.78",
          key2: "32.92%",
          value1: "4742.83",
          value2: "65.15%"
        },
        {
          id: "粤东",
          key1: "12031.89",
          key2: "9.69%",
          value1: "643.14",
          value2: "8.83%"
        },
        {
          id: "粤西",
          key1: "27637.69",
          key2: "22.26%",
          value1: "872.51",
          value2: "11.99%"
        },
        {
          id: "粤北",
          key1: "43610.64",
          key2: "35.13%",
          value1: "1021.52",
          value2: "14.03%"
        }
      ],
      tableData4: [
        {
          id: "珠三角",
          name: "王小虎",
          key1: "40863.78",
          key2: "32.92%",
          value1: "4742.83",
          value2: "65.15%"
        },
        {
          id: "粤东",
          name: "王小虎",
          key1: "12031.89",
          key2: "9.69%",
          value1: "643.14",
          value2: "8.83%"
        },
        {
          id: "粤西",
          name: "王小虎",
          key1: "25272.28",
          key2: "19.19%",
          value1: "7681.42",
          value2: "33.42%"
        },
        {
          id: "粤北",
          name: "王小虎",
          key1: "43610.64",
          key2: "35.13%",
          value1: "1021.52",
          value2: "14.03%"
        }
      ]
    };
  },
  methods: {
     getSummaries(param) {
      console.log(param);

      const { columns, data } = param;

      console.log(columns);
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总面积";
          return;
        }

        const values = data.map(item => Number(item[column.property]));

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);

          sums[index] = sums[index].toFixed(2);
          sums[index] += "";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    }
  },
  components: {}
};
</script>

<style>
@import "./css/index.css";
</style>