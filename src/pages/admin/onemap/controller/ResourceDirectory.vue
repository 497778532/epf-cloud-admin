<template>
  <el-tab-pane name="first">
    <div slot="label"
         style="height:100%">
      <div v-if="activeTab1"
           class="active tabs">
        <img class="tabsImg"
             :src="list"
             alt />
      </div>
      <div v-else
           class="tabs">
        <img class="tabsImg"
             :src="list1"
             alt />
        <div style="margin-top:5px">资源目录</div>
      </div>
    </div>
    <div class="firstBox">
      <div @click="turnTuCeng"
           :class="{Toactive:current==1}">常用图层</div>
      <!-- <div @click="turnZhuanTi"
           :class="{Toactive:current==2}">常用专题</div> -->
      <div @click="turnMuLu"
           :class="{Toactive:current==3}">详细目录</div>
      <i class="el-icon-delete"
         @click="clearCheckbox"></i>
    </div>

    <controllerResource :parentDataId="parentDataId"
                        @Closeslider="closeslider"
                        :EFPexpandedNode="expandedNode"
                        :EFPexpandedData="expandedData"
                        :data="resourceData"
                        ref="commonLayerTree"
                        :EPFDefaultProps="defaultProps"
                        :EPFmenu="menu"
                        @EPFrightClick="rightClick1"
                        @EPFdropDown="dropDownClick1"
                        @EPFcheckChange="treeChangeClick"
                        :EPFdefaultArray="defaultArray1"
                        @EPFloadNode="loadNode1"
                        :EPFcommon="common"
                        v-show="this.current==1"></controllerResource>
    <div v-show="this.current===2"
         ref="commonTopic"
         style="border:1px solid #d7d7d7;border-radius:6px;height:92%">
      <div class="secondBox"
           v-for="(item, index) in zhuanTiData"
           :key="index">
        <el-checkbox v-model="commonServiceModels[index].checked"
                     class="changeCheckbox">{{ item.name }}</el-checkbox>
      </div>
    </div>
    <div v-show="current===3"
         style="height:100%;">
      <controllerResource :parentDataId="parentDataId"
                          @Closeslider="closeslider"
                          :EFPexpandedNode="expandedNode"
                          :EFPexpandedData="expandedData"
                          :data="treeData"
                          :EPFDefaultProps="defaultProps"
                          :EPFmenu="menu"
                          @EPFrightClick="rightClick1"
                          @EPFdropDown="dropDownClick1"
                          @EPFcheckChange="treeChangeClick"
                          :EPFdefaultArray="defaultArray1"
                          @EPFloadNode="loadNode1"
                          :EPFcommon="common"
                          ref="detailCatalog"></controllerResource>
    </div>
  </el-tab-pane>
</template>

<script>
export default {
  data() {
    return {
      activeTab1: true,
      list: require('@/assets/list1.png'),
      list1: require('@/assets/list11.png'),
      parentDataId: '',
      expandedNode: {},
      expandedData: [],
      treeData: [],
      defaultProps: {
        children: 'childs',
        label: 'name',
        isLeaf: 'isLeaf'
      },
      defaultArray1: [],
    }
  },
  methods: {
    turnTuCeng() {
      this.current = 1
    },
    turnZhuanTi() {
      this.current = 2
    },
    turnMuLu() {
      this.current = 3
    },
    closeslider(bol) {
      this.common = true
    },
    rightClick1(MouseEvent, object, node, element) {
      this.common = true
      this.isRightClick = true
      this.menu = []
      this.rightObject = object
      if (this.rightObject.hasOwnProperty('collectStatus')) {
        let myLabel = this.rightObject.collectStatus == 0 ? '收藏' : '取消收藏'
        this.menu = [
          { label: myLabel, type: '1' },
          { label: '透明度', type: 'opcaity' },
          { label: '查看详情', type: '3' }
        ]
      }
      this.treeChangeClick(object, true)
      this.$store.dispatch(
        'onemap/setRightSelectLayerId',
        object.id || object.name
      )
    },
    dropDownClick1(type, item) {
      switch (type) {
        case '1':
          if (item.collectStatus == 0) {
            this.xiugaiDialog = true
          } else {
            this.collect(
              '/epf-onemap/admin/mapservicescollect/cancelCollect',
              item.id,
              item
            )
          }

          break
        case 'opcaity':
          this.common = false
          break
        case '3':
          this.checkDetail(
            '/epf-onemap/admin/mapservices/getById',
            item.id,
            item
          )
          break
      }
    },
    treeChangeClick(obj, bol, have) {
      if (!obj) return
      const layerConf = {
        title: obj.name || '',
        url: obj.url || '',
        type: obj.serviceType || 'feature', // type: "feature",
        id: obj.id
      }

      const mapApp = this.$findMapApp(this.mapAppId)
      const layer = mapApp.findLayerById(layerConf.id)
      if (bol) {
        if (!layer) {
          this.$bus.$emit('layerLoading', true)
          mapApp.addLayerToMap(layerConf).then(res => {
            this.$bus.$emit('layerLoading', false)
            if (res.message === 'Error') {
              this.$message.error(`${res.details.url}访问异常。`)
            }
            // if (res.spatialReference.isWGS84 === false) {
            //   this.$message.error(`不支持显示wkid为${res.spatialReference.wkid}的服务。`)
            // }
          })
        }
        if (this.dictionary1.serverData.some(item => item.id === obj.id)) {
          return
        }
        this.dictionary1.serverData.push(obj)
      } else {
        this.$bus.$emit('layerLoading', false)
        this.dictionary1.serverData.forEach((item, index) => {
          if (item.id === obj.id) {
            this.dictionary1.serverData.splice(index, 1)
          }
        })
      }
      if (layer) {
        mapApp.setLayerVisiblity(layerConf.id, bol)
      }
    },
    loadNode1(node, resolve) {
      this.node1 = node
      this.resolve1 = resolve
      // console.log(node);
      if (node.level === 0) {
        return resolve(node.data)
      }
      this.$post('/epf-onemap/admin/mapdiretree/getServicesByDireId', {
        id: this.node1.data.id
      }).then(res => {
        if (res.code === 0) {
          if (res.result.length === 0) {
            if (this.node1.data.childs.length) {
              return resolve(this.node1.data.childs)
            }
            return resolve(this.node1.data)
          }
          res.result = JSON.parse(
            JSON.stringify(res.result).replace(/serviceName/g, 'name')
          )
          res.result.forEach(item => (item['isLeaf'] = true))

          this.expandedData = this.node1.data.childs.concat(res.result)
          return resolve(this.expandedData)

          // this.node1.data.childs = this.node1.data.childs.concat(res.result);
          // return resolve(this.node1.data.childs);
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
  }
}
</script>

<style>
</style>