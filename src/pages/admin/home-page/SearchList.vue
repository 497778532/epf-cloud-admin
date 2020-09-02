<template>
  <div class="page-body page-body-searchDetail"
       id="LsearchDetail">
    <div class="search-box-detail">
      <el-input prefix-icon="el-icon-search"
                placeholder="请输入关键词"
                v-model="word"
                clearable
                style="width:625px;height:50px;"
                @keyup.enter.native="getData"
                @change="getWord"
                :maxlength="20"></el-input>
      <el-button type="primary"
                 @click="getData">搜索</el-button>
    </div>
    <div class="search-type">
      <span @click="getAllData"
            :class="{active:currentType==''}">全部</span>
      <span @click="getServiceData"
            :class="{active:currentType=='03'}">服务</span>
      <span @click="getFileData"
            :class="{active:currentType=='01'}">文件</span>
      <span @click="getIndexData"
            :class="{active:currentType=='05'}">模型</span>
      <span @click="getProjectData"
            :class="{active:currentType=='06'}">项目</span>
    </div>
    <div class="search-number"
         v-if="this.isNoDetail==false">为您找到的相关结果约{{this.totalRecord}}个</div>
    <div class="search-detail-list-bigBox"
         v-if="this.isNoDetail==false">
      <div class="search-detail-list-box"
           v-for="(item, index) in searchList"
           :key="index">
        <a class="search-detail-list-title"
           @click="handleSearchDetailClick(item)">
          <span>{{item.titleStart}}</span>
          <span>{{item.titleMiddle}}</span>
          <span>{{item.titleEnd}}</span>
          <span>[ {{item.typeName}} ]</span>
        </a>
        <div class="search-detail-list-content">
          <img :src="item.serverThumbnailUrl"
               alt
               width="170px"
               height="110px"
               v-if="item.typeName==='服务'" />
          <div class="search-detail-list-content-message">{{item.info}}</div>
        </div>
      </div>
    </div>
    <div class="search-pagination"
         v-if="this.isNoDetail==false">
      <el-pagination background
                     layout="total, prev, pager, next,sizes,jumper"
                     :page-sizes="[5,10,15,20]"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :total="totalRecord"
                     :current-page.sync="currentPage"
                     :page-size="pageSize"></el-pagination>
    </div>
    <div class="search-noDetail"
         v-if="this.isNoDetail==true">
      <div class="search-noDetail-image"></div>
      <div class="search-noDetail-text">抱歉，暂无相关内容，换个关键词试试</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SearchList',
  data () {
    return {
      word: '',
      currentType: '',
      newWord: '',

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      params: {
        key: '',
        type: ''
      },

      searchList: [],
      allData: [],
      serviceData: [],
      fileData: [],
      indexData: [],
      projectData: [],

      isNoDetail: false,
      readyGo: 0
    }
  },
  methods: {
    ...mapActions(['setTabsList']),

    handleSearchDetailClick (service) {
      if (service.type === '01') {
        this.$router.push({ name: 'knowledge' })
        // let title = '单位文档'
        // let routerPath = '/workFiles'
        // let tabObj = { title, routerPath }
        // this.setTabsList(tabObj)
        // this.$router.push({ path: routerPath })
      } else if (service.type === '03') {
        this.$router.push({ name: 'onemap', params: service })
      } else if (service.type === '05') {
        this.$router.push({ name: 'indicatorbase' })
      } else if (service.type === '06') {
        this.$router.push({ name: 'monitoringcenter' })
      }
    },

    getAllData () {
      this.currentType = ''
      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getData()
    },
    getServiceData () {
      this.currentType = '03'
      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getData()
    },
    getFileData () {
      this.currentType = '01'
      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getData()
    },
    getIndexData () {
      this.currentType = '05'
      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getData()
    },
    getProjectData () {
      this.currentType = '06'
      this.pageNo = 1
      this.pageSize = 5
      this.currentPage = 1
      this.getData()
    },

    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getData()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getData()
    },

    getData () {
      this.readyGo = 1
      let params = this.params
      params['key'] = this.newWord
      params['type'] = this.currentType
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-search/es/homePage/queryAllSearch', params).then(res => {
        if (res.code === 0) {
          if (res.pager.results === '') {
            this.isNoDetail = true
          } else {
            this.isNoDetail = false
            this.searchList = res.pager.results

            for (var key in this.searchList) {
              let searchWordMessage = this.searchList[key].title
              let str = searchWordMessage.split(this.word)
              this.searchList[key]['titleStart'] = str[0]
              this.searchList[key]['titleMiddle'] = this.word
              this.searchList[key]['titleEnd'] = str[1]
              this.searchList[key][
                'serverThumbnailUrl'
              ] = `${this.searchList[key].serviceUrl}/info/thumbnail`
              if (this.searchList[key].typeName == '指标模型') {
                let index = key
                this.searchList[index].typeName = '模型'
              }
            }
            this.pageNo = res.pager.pageNo
            this.pageSize = res.pager.pageSize
            this.totalPage = res.pager.totalPage
            this.totalRecord = res.pager.totalRecord
          }
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    getWord () {
      this.newWord = this.word
    }
  },
  created () {
    this.word = this.$route.query.word
    this.newWord = this.$route.query.word
    this.getData()
  },
  mounted () { },
  watch: {
    $route (to, from) {
      /** 初始化其他数据 */
      this.word = this.$route.query.word
      this.newWord = this.$route.query.word
    },
    newWord (oldval, newval) {
      let word = this.newWord
      if (word == '') return
      if (this.readyGo === 0) return
      if (word === oldval && this.readyGo === 1) {
        let title = '搜索页'
        let routerPath = `SearchList?word=${this.word}`
        var tabObj = { title, routerPath }
        this.setTabsList(tabObj)
        this.$router.push({ path: routerPath })
        this.getData()
      } else if (word === newval) {
        this.getData()
      }
    }
  }
}
</script>
<style scoped>
.page-body-searchDetail {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
#LsearchDetail {
  width: 100%;
  height: 100%;
}
.search-box-detail {
  width: 755px;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 30px auto 20px;
}
.search-hot-list {
  width: 755px;
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
.search-type {
  width: 755px;
  height: 40px;
  background-color: #f3f3f3;
  display: flex;
  justify-content: flex-start;
  line-height: 40px;
  font-size: 18px;
  color: #707070;
  padding-left: 20px;
  margin: 0 auto;
  margin-bottom: 30px;
}
.search-type span {
  margin-right: 40px;
  padding: 0 10px;
  cursor: pointer;
}
.search-type .active {
  border-bottom: 2px solid #1d7ce4;
  color: #303030;
  font-weight: bold;
}
.search-number {
  width: 755px;
  height: 20px;
  color: #979797;
  font-size: 14px;
  margin-bottom: 20px;
  margin: 0 auto;
}
.search-detail-list-bigBox {
  width: 755px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
}
.search-detail-list-box {
  width: 755px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 30px;
  font-size: 0;
}
.search-detail-list-title {
  margin-bottom: 10px;
  width: 100%;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; */
}
.search-detail-list-title span:nth-child(1) {
  font-size: 18px;
  line-height: 24px;
  color: #1d7ce4;
  border-bottom: 2px solid #1d7ce4;
  cursor: pointer;
}
.search-detail-list-title span:nth-child(2) {
  font-size: 18px;
  line-height: 24px;
  color: red;
  border-bottom: 2px solid red;
  cursor: pointer;
}
.search-detail-list-title span:nth-child(3) {
  font-size: 18px;
  line-height: 24px;
  color: #1d7ce4;
  border-bottom: 2px solid #1d7ce4;
  margin-right: 20px;
  cursor: pointer;
}
.search-detail-list-title span:nth-child(4) {
  font-size: 16px;
  line-height: 21px;
  color: #303030;
}
.search-detail-list-content {
  display: flex;
  justify-content: flex-start;
}
.search-detail-list-content img {
  margin-right: 20px;
}
.search-detail-list-content img {
  margin-right: 20px;
}
.search-detail-list-content .search-detail-list-content-message {
  flex: 1;
  height: 115px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
  font-size: 16px;
}
.search-pagination {
  width: 755px;
  margin: 0 auto 20px;
  text-align: right;
}
.search-noDetail {
  width: 755px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.search-noDetail-image {
  background-image: url("../../../assets/images/leader/nodetail.png");
  width: 446px;
  height: 280px;
  background-size: 446px 280px;
}
.search-noDetail-text {
  font-size: 18px;
  line-height: 24px;
  color: #9e9e9e;
}
@media screen and (max-width: 1599px) {
  .page-body-searchDetail {
    width: calc(100% + 74px) !important;
    height: 200px;
    position: absolute;
    left: -74px;
    z-index: 88;
    overflow: auto;
    padding-bottom: 40px;
  }
}
</style>
<style>
.page-body-searchDetail .search-box-detail .el-input__inner {
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
.page-body-searchDetail .el-icon-search {
  font-size: 30px;
  display: flex;
  align-items: center;
}
.page-body-searchDetail .el-icon-search:after {
  content: "丨";
  line-height: 50px;
}
.page-body-searchDetail .el-button {
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
#LsearchDetail .el-pagination .el-input__inner {
  height: 28px;
}
.page-body-searchDetail .search-box-detail .el-icon-search:before {
  margin-left: 10px;
}
</style>
