<template>
  <div class="page-body-search"
       id="Leader-search">
    <div class="search-box">
      <el-input prefix-icon="el-icon-search"
                placeholder="请输入关键词"
                v-model="word"
                clearable
                style="width:535px;height:50px;"
                @keyup.enter.native="getSearchData"
                :maxlength="20"></el-input>
      <el-button type="primary"
                 @click="getSearchData">搜索</el-button>
    </div>
    <div class="search-hot-list">
      <div class="search-hot-title">热门关键词</div>
      <div class="search-hot-message">
        <span v-for="(item,index) in hotWordList"
              :key="index"
              @click="getHotData(item)">{{item.hotWord}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SearchIndex',

  data () {
    return {
      word: '',
      hotWordList: [
        { hotWord: '耕地保有量' },
        { hotWord: '拆旧复垦' },
        { hotWord: '三线管控' },
        { hotWord: '生态红线' },
        { hotWord: '三线' }
      ]
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    getSearchData () {
      if (this.word === '') return
      let title = '搜索页'
      let routerPath = `SearchList?word=${this.word}`
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath })
    },
    getHotData (item) {
      this.word = item.hotWord
      this.getSearchData()
    }
  },
  created () { },
  mounted () { },
  watch: {}
}
</script>
<style scoped>
.page-body-search {
  width: 100%;
  height: 100%;
}
#Leader-search {
  width: 100%;
  height: 100%;
}
.search-box {
  width: 665px;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 150px auto 55px;
}
.search-hot-list {
  width: 665px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
}
.search-hot-title {
  font-size: 18px;
  line-height: 24px;
  color: #707070;
  margin-bottom: 20px;
}
.search-hot-message {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.search-hot-message span {
  font-size: 16px;
  line-height: 21px;
  color: #1d7ce4;
  margin-right: 15px;
  cursor: pointer;
}
</style>
<style>
.page-body-search .el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  border-right: 0px solid #dcdfe6;
  border-radius: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  outline: 0;
  padding: 0 50px 0 80px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.page-body-search .el-icon-search {
  font-size: 30px;
  display: flex;
  align-items: center;
}
.page-body-search .el-icon-search:after {
  content: "丨";
  line-height: 50px;
}
.page-body-search .el-button {
  display: inline-block;
  line-height: 27px;
  white-space: nowrap;
  cursor: pointer;
  background: #1d7ce4;
  border: 1px solid #dcdfe6;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 20px;
  border-radius: 0px;
  width: 130px;
  height: 50px;
}
.page-body-search .el-icon-search:before {
  margin-left: 10px;
}
</style>
