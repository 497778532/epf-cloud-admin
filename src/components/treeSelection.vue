<template>
  <div class="zy-main">
    <el-tree ref="tree"
             :filter-node-method="filterNode"
             :data="treeData"
             node-key="id"
             @node-expand="treeClick"
             @check-change="treeChangeClick"
             :default-expanded-keys="defaultArray"
             :props="defaultProps">
      <span class="custom-tree-node"
            slot-scope="{ node, data }">
        <el-checkbox v-if="showCheck(node,data)"
                     v-model="node.checked"></el-checkbox>
        <el-dropdown @command="handleCommand">
          <div style="display:inline-block">
            <img v-if="showWenjian(node,data)"
                 :src="wenjian" />
            <span>{{ node.label }}</span>
          </div>
          <el-dropdown-menu v-if="showCheck(node,data)"
                            slot="dropdown">
            <el-dropdown-item :command="['collect',node,data]">{{data.collectStatus==0?'收藏':'取消收藏'}}</el-dropdown-item>
            <el-dropdown-item :command="['transparency',node,data]">透明度</el-dropdown-item>
            <el-dropdown-item :command="['detail',node,data]">详情</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  props: ['boolData'],
  data () {
    return {
      wenjian: require('../assets/wenjian1.png'),
      treeData: [],
      screenAllData: [],
      lowerTreeData: {
        id: ''
      },
      defaultArray: [],
      arr: [],
      boolMessage: '',
      defaultProps: {
        children: 'childs',
        label: 'name'
      }
    }
  },
  methods: {
    getTreeAdmin () {
      this.$post('/epf-onemap/admin/mapdiretree/getResourceDir', {}).then(
        res => {
          // console.log(res)
          if (res.code == '0') {
            if (res.result.length > 0) {
              this.treeData = res.result[0].childs
              this.digui1(this.treeData)
              // this.$set(this.treeData, 0, res.result);
              this.$set(this.defaultArray, 0, this.lowerTreeData.id)
            }
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    treeClick (item, node, data) {
      if (!this.arr.includes(item.id)) {
        this.arr.push(item.id)
        this.$post('/epf-onemap/admin/mapdiretree/getLayerByDireId', {
          id: item.id
        }).then(res => {
          if (res.code == '0') {
            if (!item.childs[0].id) {
              for (var i = 0; i < res.result.length; i++) {
                res.result[i] = JSON.parse(
                  JSON.stringify(res.result[i]).replace('layerName', 'name')
                )
              }
              if (res.result[0].id) {
                item.childs = res.result
              }
            } else {
              for (var i = 0; i < res.result.length; i++) {
                res.result[i] = JSON.parse(
                  JSON.stringify(res.result[i]).replace('layerName', 'name')
                )
                item.childs.push(res.result[i])
              }
            }
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        })
      }
    },
    async treeChangeClick (obj, bol, have) {
      // console.log(obj)
      // console.log(bol)
      // console.log(have)

      let res = await this.$post('/epf-onemap/admin/maplayer/getById', {
        id: obj.id
      })
      // console.log(res)
      if (res.code == '0') {
        // GIS linyx 更新
        const layerConfig = {
          title: res.result.layerName || '',
          url: res.result.url || '',
          type: res.result.serviceType || 'feature',
          id: res.result.id
        }
        let layer = MapApp.findLayerById(layerConfig.id)
        if (layer) {
          MapApp.setLayerVisiblity(layerConfig.id, bol)
        } else {
          MapApp.addLayerToMap(layerConfig)
        }

        if (bol == true) {
          this.screenAllData.push(layerConfig)
          console.log(this.screenAllData)
          this.$emit('messageData', this.screenAllData)
        }
        if (bol == false) {
          for (var key in this.screenAllData) {
            let id = layerConfig.id
            if (this.screenAllData[key].id == id) {
              this.screenAllData.splice(key, 1)
            }
            this.$emit('messageData', this.screenAllData)
          }
        }
      } else {
        this.$message.error(res.msg) // 失败
        return
      }
    },
    showCheck (node, data) {
      return !!(node.childNodes.length === 0
        && data.hasOwnProperty('collectStatus'))
    },
    showWenjian (node, data) {
      console.log(node)
      console.log(data)
      return !(node.childNodes.length === 0
        || data.hasOwnProperty('collectStatus'))
    },
    digui1 (array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].childs.length > 0) {
          digui(array[i].childs)
        } else {
          array[i].childs.push({})
        }
      }
    },
    handleCommand (array) {
      const node = array[1]
      const data = array[2]
      if (array[0] == 'collect') {
        console.log(data)
        if (data.collectStatus == 0) {
          this.collect(
            '/epf-onemap/admin/maplayercollect/collectLayer',
            data.id
          )
        } else {
          this.collect(
            '/epf-onemap/admin/maplayercollect/cancelCollect',
            data.id
          )
        }
      }
      if (array[0] == 'transparency') {
      }
      if (array[0] == 'detail') {
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
    //  getCheckedNodes() {
    //   console.log(this.$refs.tree.getCheckedNodes());
    // },
  },
  created () {
    this.getTreeAdmin()
    this.boolMessage = this.boolData
  },
  mounted () {
    this.$refs.tree.setCheckedKeys([])
  },
  watch: {
    boolData (val) {
      console.log(val)
      this.$refs.tree.setCheckedKeys([])
      this.screenAllData = []
    }
  }
}
</script>
<style scoped>
.zy-main {
  height: 100%;
  overflow: hidden;
}
</style>
