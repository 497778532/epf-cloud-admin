<template>
  <div class="epf-table__all">
    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <div class="epf-table__one">
          <el-row class="epf-table__title">
            <span>生态重要性评价结果与生态保护红线对比情况</span>
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
            <span>生态重要性为重要及以上的生态保护红线分布情况</span>
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
            <span>农业适宜性评价结果与现状耕地的对比情况</span>
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
              <el-table-column label="片区" min-width="80" align="center">
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
            <span>城镇适宜性评价结果与现状城镇的对比情况</span>
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
    <el-row type="flex" :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <div class="epf-table__one">
          <el-row class="epf-table__title">
            <span>城镇适宜性为一般适宜以上的现状城镇分布情况</span>
          </el-row>
          <div style="padding:15px">
            <el-row type="flex" justify="end">单位：km²</el-row>
            <el-table
              :data="tableData5"
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
            <span>农业适宜性为一般适宜及以上的现状耕地分布情况</span>
          </el-row>
          <div style="padding:15px">
            <el-row type="flex" justify="end">单位：km²</el-row>
            <el-table
              :data="tableData6"
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
          id: "极重要",
          name: "王小虎",
          key1: "108449.96",
          key2: "60.37%",
          value1: "32047.60",
          value2: "88.85%"
        },
        {
          id: "重要",
          name: "王小虎",
          key1: "37587.19",
          key2: "20.92%",
          value1: "3494.58",
          value2: "9.69%"
        },
        {
          id: "一般重要",
          name: "王小虎",
          key1: "33606.85",
          key2: "18.71%",
          value1: "527.36",
          value2: "1.46%"
        }
      ],

      tableData2: [
        {
          id: "珠三角",
          name: "王小虎",
          key1: "37623.72",
          key2: "28.58%",
          value1: "5567.58",
          value2: "24.22%"
        },
        {
          id: "粤东",
          name: "王小虎",
          key1: "11042.56",
          key2: "8.39%",
          value1: "2412.25",
          value2: "10.50%"
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
          key1: "57722.68",
          key2: "43.84%",
          value1: "7323.22",
          value2: "31.86%"
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
      ],
      tableData5: [
        {
          id: "V",
          key1: "62885.21",
          key2: "35.01%",
          value1: "5464.78",
          value2: "74.16%"
        },
        {
          id: "IV",
          key1: "33228.92",
          key2: "18.50%",
          value1: "1515.62",
          value2: "20.57%"
        },
        {
          id: "III",
          key1: "28029.87",
          key2: "15.60%",
          value1: "299.60",
          value2: "4.07%"
        },
        {
          id: "II",
          key1: "0.00",
          key2: "0.00% ",
          value1: "0.00",
          value2: "0.00%"
        },
        {
          id: "I",
          key1: "55500.00",
          key2: "30.89%",
          value1: "88.47",
          value2: "1.20%"
        }
      ],
      tableData6: [
        {
          id: "V",
          name: "王小虎",
          key1: "23634.97",
          key2: "13.16%",
          value1: "6091.33",
          value2: "23.42%"
        },
        {
          id: "IV",
          name: "王小虎",
          key1: "48531.73",
          key2: "27.02%",
          value1: "11458.81",
          value2: "44.05%"
        },
        {
          id: "III",
          name: "王小虎",
          key1: "41955.45",
          key2: "23.335%",
          value1: "5434.52",
          value2: "20.89%"
        },
        {
          id: "II",
          name: "王小虎",
          key1: "41174.05",
          key2: "22.92%",
          value1: "2377.2",
          value2: "9.14%"
        },
        {
          id: "I",
          name: "王小虎",
          key1: "233471.81",
          key2: "13.55%",
          value1: "649.49",
          value2: "2.50%"
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
