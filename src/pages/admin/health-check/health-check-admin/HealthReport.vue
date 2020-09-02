<template>
  <div>
    <el-row style="height:45px"
            type="flex"
            align="middle">
      <el-col :span="8">
        体检编号：
        TJ-00000001
      </el-col>
      <el-col :span="8">
        体检时间：
        2019-12-20
      </el-col>
      <el-col :span="8">
        <span class="EFPwirte button">删除</span>
        <span class="EFPwirte button">下载报告</span>
      </el-col>
    </el-row>
    <div class="EPF-table"
         id="indicatorbase">
      <iframe :style="{ height:menuListHeight, width: '100%' }"
              id="ifra"
              :src="iframeSrc"
              frameborder="0"></iframe>
      <div class="report-select">
        <div class="report-select-title">
          <div class="wrap-header">
            <div class="wrap-header-icon"
                 style="background:#F4CE52;"></div>
            <div class="wrap-header-title">相关体检报告</div>
          </div>
          <div class="refresh-title">
            <i class="el-icon-refresh el-left"
               style="margin-right:10px;"></i>刷新
          </div>
        </div>
        <div class="report-content-box">
          <div class="report-content"
               v-for="(item, index) in reportList"
               :key="index"
               @click="handleClickSee(item)">
            <img src="../../../../assets/images/report.png"
                 alt
                 class="report-img" />
            <div class="report-time-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  name: "HealthReport",

  data () {
    return {
      iframeSrc:
        "/api/epf-document/onlinePreview?url=http://127.0.0.1:8081/,c4aa3e27-6dd4-42aa-8a4d-71789ec5e9a5.docx",
      menuListHeight: 100,

      reportList: [
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" },
        { name: "2018广州市县级诊断书2019121181113" }
      ]
    };
  },
  components: {},
  created () {
    this.menuListHeight = window.innerHeight - 50;
  },

  mounted () { },
  watch: {},
  methods: {
    ...mapActions(["setTabsList"]),
    detail (item) {
      let title = "查看体检报告";
      let routerPath = `/HealthDetail?${item.id}`;
      let tabObj = { title, routerPath };
      this.setTabsList(tabObj);
      this.$router.push({ path: routerPath });
    },
    handleClickSee (item) {
      this.$message.error("正在打开, 请稍候...");
    }
  }
};
</script>

<style scoped>
.button {
  padding: 3px 14px;
  border-radius: 8px;
}
#indicatorbase {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
}
.report-select {
  width: 400px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.report-select::-webkit-scrollbar {
  display: none;
}
.report-select-title {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0 10px;
}
.wrap-header {
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}
.wrap-header-icon {
  width: 6px;
  height: 21px;
  display: block;
  margin: 0 10px;
  border-radius: 6px;
}
.wrap-header-title {
  font-size: 18px;
  color: #4f4f4f;
  font-weight: 500px;
}
.refresh-title {
  font-size: 16px;
  color: #4f4f4f;
  cursor: pointer;
}
.report-content-box {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.report-content {
  width: 50%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.report-img {
  width: 92px;
  height: 92px;
}
.report-img:hover {
  transform: scale(1.2);
}
.report-time-name {
  width: 100%;
  padding: 5px 15px;
  font-size: 16px;
  color: #4f4f4f;
  white-space: pre-wrap;
}
.report-time-name:hover {
  color: #1d7ce4;
}
</style>
