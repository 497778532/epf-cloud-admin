<template>
  <div class="centerPrice"
       id="centerPrice">

    <tree :list="data"
          @add="add"
          @editor="editor"
          @remove="remove"
          @toggle="toggle"
          style="padding:0 5px">
    </tree>

  </div>
</template>

<script>
import tree from './SiWei'
export default {
  name: 'centerPrice',

  data () {
    return {
      data: [],
      cantonId: '440000',
      parentData: {}
    }
  },
  methods: {
    add (item, parent) {
      console.log(parent)
      let params = {
        name: item.name,
        parentId: parent.id
      }
      this.$post(
        '/epf-result-review/revplanningcategorymanage/addRevPlanningCategoryManage',
        params
      ).then(res => {
        if (res.code === 0) {
          this.getTreeAdmin()
          this.$message.success(res.msg) // 失败
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    editor (item) {
      let params = {
        name: item.name,
        id: item.id
      }
      this.$post(
        '/epf-result-review/revplanningcategorymanage/editRevPlanningCategoryManage',
        params
      ).then(res => {
        if (res.code === 0) {
          this.getTreeAdmin()
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    remove (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      }).then(() => {
        this.$post('/epf-result-review/revplanningcategorymanage/deleteRevPlanningCategoryManage?', {
          id: item.id
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getTreeAdmin()
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    toggle (item) {
      this.parentData = item
    },
    getTreeAdmin () {
      this.$post('/epf-result-review/revplanningcategorymanage/getRevPlanningCategoryManageTree', { cantonId: this.cantonId }).then(
        res => {
          if (res.code === 0) {
            this.data = JSON.parse(JSON.stringify(res.planningManage))
            let that = this
            let setData = function (arr) {
              if (arr) {
                for (let i = 0; i < arr.length; i++) {
                  let temp = arr[i]
                  setData(temp.childs)
                  if (that.$store.state.tabs.treeOpenIds.includes(temp.id)) {
                    that.$set(temp, 'display', true)
                  }
                }
              }
            }
            setData(this.data)
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    }

  },
  components: {
    tree
  },
  computed: {

  },
  created () {
    this.getTreeAdmin()
  }
}
</script>

<style scoped>
.centerPrice {
  display: flex;

  padding: 5px;
  justify-content: center;
  align-items: center;
}
</style>

<style>
</style>
