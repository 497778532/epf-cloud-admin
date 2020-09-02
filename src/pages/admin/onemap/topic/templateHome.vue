<template>
  <div id="templateHome">
    <el-button size="medium"
               type="info"
               class="skipBox"
               @click="handleClickSkip">退出</el-button>
    <div class="templateHome_tab">
      <el-button-group>
        <el-button :type="this.current==0?'primary':'info'"
                   @click="nodeChange(0)">全部专题</el-button>
        <el-button :type="this.current==1?'primary':'info'"
                   @click="nodeChange(1)">我的收藏</el-button>
        <el-button :type="this.current==2?'primary':'info'"
                   @click="nodeChange(2)">我的专题</el-button>
      </el-button-group>
      <el-button class="myTemplate"
                 @click="handleClickMake">制作专题</el-button>
    </div>
    <div v-if="this.current==0">
      <div class="templateHome_bread">
        <p class="templateHome_bread_title">专题分类</p>
        <el-input placeholder="请输入图层/文件/专题关键字"
                  class="templateHome_bread_search"
                  v-model="searchList"
                  :maxlength="50">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="searchListbutton"></el-button>
          <!-- <i slot="prefix" class="el-input__icon el-icon-search" @click="searchList222"></i> -->
        </el-input>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <div class="templateHome_menu">
          <el-tree :data="menuData"
                   :props="defaultProps"
                   :default-expand-all="true"
                   @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="templateHome_content">
          <ul class="templateHome_content_ul">
            <li class="templateHome_content_li"
                v-for="(item,index) in totalList"
                :key="index">
              <div class="content_imgBox">
                <img :src="item.srcUrl"
                     alt
                     style="height:100%;width:100%;"
                     @click="handleClickUse(item)" />
              </div>
              <div class="content_textBox">
                <span style="width:50%;font-size:16px;font-weight:600;">{{ item.name }}</span>
                <div style="width:50%;display:flex;justify-content: flex-end;"
                     v-if="item.isShow==0">
                  <img src="@/assets/images/wsc.png"
                       alt
                       style="width:25px;height:25px"
                       @click="toggleCollect(index,item.id)" />
                </div>
                <div style="width:50%;display:flex;justify-content: flex-end;"
                     v-if="item.isShow==1">
                  <img src="@/assets/images/ysc.png"
                       alt
                       style="width:25px;height:25px"
                       @click="toggleCollect(index,item.id)" />
                </div>
                <div style="width:50%">
                  <img src="@/assets/images/cjr.png"
                       alt
                       style="width:20px;height:20px" />
                  <span style="font-size:12px;color:#666;">{{ item.createUserName }}</span>
                </div>
                <div style="width:50%">
                  <img src="@/assets/images/cjsj.png"
                       alt
                       style="width:20px;height:20px" />
                  <span style="font-size:12px;color:#666;">{{ item.createTime }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="text-align:right;margin-bottom:30px">
        <el-pagination ref="pagination"
                       background
                       layout="total,prev, pager, next,sizes,jumper"
                       :page-sizes="[6,15,30]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"></el-pagination>
      </div>
    </div>
    <div v-if="this.current==1">
      <div class="templateHome_bread">
        <p class="templateHome_bread_title">专题分类</p>
        <el-input placeholder="请输入图层/文件/专题关键字"
                  class="templateHome_bread_search"
                  v-model="searchList"
                  :maxlength="50">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="searchListbutton"></el-button>
        </el-input>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <div class="templateHome_menu">
          <el-tree :data="menuData"
                   :props="defaultProps"
                   :default-expand-all="true"
                   @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="templateHome_content">
          <ul class="templateHome_content_ul">
            <li class="templateHome_content_li"
                v-for="(item,index) in collectList"
                :key="index">
              <div class="content_imgBox">
                <img :src="item.srcUrl"
                     alt
                     style="height:100%;width:100%;"
                     @click="handleClickUse(item)" />
              </div>
              <div class="content_textBox">
                <span style="width:50%;font-size:16px;font-weight:600;">{{ item.name }}</span>
                <div style="width:50%;display:flex;justify-content: flex-end;">
                  <img src="@/assets/images/ysc.png"
                       alt
                       style="width:25px;height:25px"
                       @click="toggleDelete(index,item.id)" />
                </div>
                <div style="width:50%">
                  <img src="@/assets/images/cjr.png"
                       alt
                       style="width:20px;height:20px" />
                  <span style="font-size:12px;color:#666;">{{ item.createUserName }}</span>
                </div>
                <div style="width:50%">
                  <img src="@/assets/images/cjsj.png"
                       alt
                       style="width:20px;height:20px" />
                  <span style="font-size:12px;color:#666;">{{ item.createTime }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="text-align:right;margin-bottom:30px">
        <el-pagination ref="pagination"
                       background
                       layout="total,prev, pager, next,sizes,jumper"
                       :page-sizes="[6,15,30]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"></el-pagination>
      </div>
    </div>
    <div v-if="this.current==2">
      <div class="templateHome_bread">
        <p class="templateHome_bread_title">专题分类</p>
        <el-input placeholder="请输入图层/文件/专题关键字"
                  class="templateHome_bread_search"
                  v-model="searchList"
                  :maxlength="50">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="searchListbutton"></el-button>
        </el-input>
      </div>
      <div style="display:flex;justify-content: space-between;">
        <div class="templateHome_menu">
          <el-tree :data="menuData"
                   :props="defaultProps"
                   :default-expand-all="true"
                   @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="templateHome_content">
          <ul class="templateHome_content_ul">
            <li class="templateHome_content_li"
                v-for="(item,index) in templateList"
                :key="index">
              <div class="content_imgBox">
                <img :src="item.srcUrl"
                     alt
                     style="height:100%;width:100%;"
                     @click="handleClickUse(item)" />
              </div>
              <div class="content_textBox">
                <span style="width:50%;font-size:16px;font-weight:600;">{{ item.name }}</span>
                <div style="width:50%;display:flex;justify-content: flex-end;"
                     v-if="item.isShow==0">
                  <el-button size="mini"
                             type="info"
                             round
                             @click="toggleShare(index,item.id,1)">共享</el-button>
                </div>
                <div style="width:50%;display:flex;justify-content: flex-end;"
                     v-if="item.isShow==1">
                  <el-button size="mini"
                             type="primary"
                             round
                             @click="toggleShare(index,item.id,0)">已共享</el-button>
                </div>
                <div style="width:50%">
                  <img src="@/assets/images/cjr.png"
                       alt
                       style="width:20px;height:20px" />
                  <span style="font-size:12px;color:#666;">{{ item.createUserName }}</span>
                </div>
                <div style="width:50%">
                  <img src="@/assets/images/cjsj.png"
                       alt
                       style="width:20px;height:20px" />
                  <span style="font-size:12px;color:#666;">{{ item.createTime }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div style="text-align:right;margin-bottom:30px">
        <el-pagination ref="pagination"
                       background
                       layout="total,prev, pager, next,sizes,jumper"
                       :page-sizes="[6,15,30]"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :total="totalRecord"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      current: 0,
      searchList: '',
      contentsType: '',
      totalList: [],
      collectList: [],
      templateList: [],
      currentPage: 1,
      pageSize: 6, // 每页条数
      totalPage: 1,
      totalRecord: 1,
      searchInfo: {},
      menuData: [
        {
          id: 1,
          label: '全部',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      isCollect: true
    }
  },
  methods: {
    searchListbutton () {
      this.nodeChange(this.current)
    },
    menuDataSearch () {
      var falg = this.current
      this.$post('/epf-onemap/maptopic/getMapTopicContentsType', {
        falg: falg,
        name: this.searchList
      }).then(res => {
        // res 是返回结果
        if (res.code != 0) {
          self.$message.error(res.msg)
          return
        }
        // 返回的数据 -我的
        var tempList = new Array()
        for (var index in res.ContentsTypeList) {
          var ContentsType = res.ContentsTypeList[index]
          var json = {
            label: ContentsType.zhCn + '(' + ContentsType.mun + ')',
            dictValue: ContentsType.dictValue
          }
          tempList[index] = json
        }
        this.menuData[0]['children'] = tempList
      })
    },
    handleClickSkip () {
      let routerPath = 'oneMap'
      this.$router.push({ path: routerPath })
    },
    handleClickMake () {
      let routerPath = 'makeTemplate'
      this.$router.push({ path: routerPath })
    },
    handleClickUse (item) {
      console.log(item)
      let routerPath = 'useTemplate'
      this.$router.push({ path: routerPath, query: { id: item.id } })
    },
    handleNodeClick (data) {
      this.contentsType = data.dictValue
      this.$refs.pagination.lastEmittedPage = 1
      this.searchInfo['page'] = 1
      this.currentPage = 1

      this.nodeChange(this.current)
    },
    findImage (data) {
      for (var i in data) {
        if (data[i].templateType != null) {
          let type = data[i].templateType
          data[i].srcUrl = null
          if (type == 'fdssdt') {
            data[i].srcUrl = require('@/assets/images/tem-color.png')
          } else if (type == 'lxdy') {
            data[i].srcUrl = require('@/assets/images/tem-flow.png')
          } else if (type == 'djfhdt') {
            data[i].srcUrl = require('@/assets/images/tem-grade.png')
          } else if (type == 'bztjdt') {
            data[i].srcUrl = require('@/assets/images/tem-pie.png')
          } else if (type == 'zztjdt') {
            data[i].srcUrl = require('@/assets/images/tem-columnar.png')
          } else if (type == 'fdssdjfhdt') {
            data[i].srcUrl = require('@/assets/images/tem-colorGrade.png')
          } else if (type == 'rlt') {
            data[i].srcUrl = require('@/assets/images/tem-hot.png')
          } else if (type == 'sbt') {
            data[i].srcUrl = require('@/assets/images/tem-water.png')
          } else {
            data[i].srcUrl = require('@/assets/images/u9.png')
          }
        }
      }
    },
    nodeChange (id) {
      // 将turnTotal(id=1), turnCollect(id=2)，turnMyTemplate(id=3)封装为一个方法
      if (this.current != id) {
        this.searchList = ''
        this.contentsType = ''
      }
      this.current = id

      this.searchInfo['rows'] = this.pageSize
      var json = {}
      // 专题名称
      if (this.searchList != '') {
        json['name'] = this.searchList
      }
      if (this.contentsType != '') {
        json['contentsType'] = this.contentsType
      }
      var api = '/epf-onemap/maptopic/getMapTopicJson'
      if (id === 0) {
        json['isShow'] = '1'
      } else if (id === 2) {
        json['isShow'] = '0'
      } else if (id === 1) {
        api = '/epf-onemap/maptopiccollect/getMapTopicCollectJson'
      }
      // 把json对象转为json字符串
      var filters = JSON.stringify(json)
      // 插入搜索条件
      this.searchInfo['filterData'] = filters

      let that = this
      that.$post(api, that.searchInfo).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg) // 失败
          return
        }
        // 返回的数据
        let results = res.pager.results
        if (id === 0) {
          that.totalList = results
        } else if (id === 1) {
          that.collectList = results
        } else if (id == 2) {
          that.templateList = results
        }
        that.findImage(results)

        // 数据条数
        that.totalRecord = res.pager.totalRecord
        // 总页数
        that.totalPage = res.pager.totalPage
        that.menuDataSearch()
      })
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.searchInfo['page'] = 1
      this.currentPage = 1

      this.nodeChange(this.current)
    },
    handleCurrentChange (val) {
      // 获取当前页
      this.searchInfo['page'] = val
      this.searchInfo['rows'] = this.pageSize
      this.nodeChange(this.current)
    },
    // 添加收藏
    addCollect (id) {
      console.log('添加收藏数据：', { mapTopicId: id })
      this.$post('/epf-onemap/maptopiccollect/addMapTopicCollect', {
        mapTopicId: id
      }).then(res => {
        // res 是返回结果
        this.isCollect = !this.isCollect
        console.log('请求添加方法接口：', res)
        if (res.code != 0) {
          self.$message.error(res.msg)
          return
        }
      })
    },
    // 删除收藏
    delCollect (id) {
      console.log('删除收藏数据：', { mapTopicId: id })
      this.$post(
        '/epf-onemap/maptopiccollect/deleteMapTopicCollectByMapTopicId',
        { mapTopicId: id }
      ).then(res => {
        // res 是返回结果
        this.isCollect = !this.isCollect
        console.log('请求添加方法接口：', res)
        if (res.code != 0) {
          self.$message.error(res.msg)
          return
        }
      })
    },
    // 共享、取消共享
    sharedTopic (id, falg) {
      console.log('共享、取消共享：', { id: id, isShow: falg })
      this.$post('/epf-onemap/maptopic/setMapTopicIsShow', {
        id: id,
        isShow: falg
      }).then(res => {
        // res 是返回结果
        console.log('请求添加方法接口：', res)
        if (res.code != 0) {
          self.$message.error(res.msg)
          return
        }
      })
    },
    // 收藏，取消收藏，
    toggleCollect (index, id) {
      this.totalList[index].isShow = !this.totalList[index].isShow
      if (this.totalList[index].isShow == 1) {
        this.addCollect(id)
        this.$message({
          showClose: true,
          message: '已收藏',
          type: 'success',
          center: true
        })
      } else {
        this.delCollect(id)
        this.$message({
          showClose: true,
          message: '已取消收藏',
          center: true
        })
      }
    },
    toggleDelete (index, id) {
      this.delCollect(id)
      this.collectList.splice(index, 1)
      this.$message({
        showClose: true,
        message: '已取消收藏',
        center: true
      })
    },
    toggleShare (index, id, falg) {
      this.sharedTopic(id, falg)
      this.templateList[index].isShow = !this.templateList[index].isShow
      if (this.templateList[index].isShow == 1) {
        this.$message({
          showClose: true,
          message: '已共享',
          type: 'success',
          center: true
        })
      } else {
        this.$message({
          showClose: true,
          message: '已取消共享',
          center: true
        })
      }
    }
  },
  created () {
    this.nodeChange(0)
    this.menuDataSearch()
  },
  watch: {
    isCollect (val) {
      this.menuDataSearch()
    }
  }
}
</script>
<style scoped>
#templateHome {
  width: 100%;
  min-height: 100%;
  padding: 50px 30px 30px;
  background-color: #f9f9f9;
  position: relative;
}
.skipBox {
  position: absolute;
  top: 15px;
  right: 30px;
}
.myTemplate {
  background-color: #ffa200;
  margin-left: 15px;
  color: #fff;
}
.templateHome_bread {
  margin: 30px 0 30px 0;
  width: 100%;
  height: 30px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* box-shadow:0px 0px 4px #333333; */
}
.templateHome_bread_title {
  font-size: 16px;
}
.templateHome_bread_search {
  width: 350px;
  height: 35px;
}
.templateHome_content {
  width: 100%;
  height: 100%;
  flex: 1;
  margin-left: 20px;
}
.templateHome_content_ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.templateHome_content_ul li {
  width: 32%;
  background-color: #fff;
  height: 340px;
  margin-bottom: 2%;
  margin-right: 2%;
  cursor: pointer;
  border: 1px solid rgb(211, 211, 211);
  box-sizing: border-box;
}
.templateHome_content_ul li:hover {
  box-shadow: 0px 5px 10px rgb(134, 134, 134);
  /* box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5); */
}

.templateHome_content_ul li:nth-child(3n) {
  margin-right: 0;
}
.content_imgBox {
  width: 100%;
  height: 260px;
  box-sizing: border-box;
}
.content_textBox {
  height: 80px;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.templateHome_menu {
  width: 300px;
}

@media screen and (max-width: 1599px) {
  #templateHome {
    width: calc(100% + 74px);
    height: 200px;
    position: absolute;
    left: -74px;
    z-index: 88;
    overflow: auto;
  }
}
</style>
<style>
.el-breadcrumb .el-breadcrumb__inner {
  color: #000;
  font-weight: 600;
  font-size: 14px;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 600;
  color: #000;
  font-size: 14px;
}
</style>

