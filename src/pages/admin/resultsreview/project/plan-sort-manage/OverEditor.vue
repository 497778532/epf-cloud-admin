<template>
  <div class="switch_box">
    <div class="tr">
      <div class="firstTd">分类名称：</div>
      <div class="secondTd">
        <el-input v-model="imIndexSort.name"
                  placeholder="请输入授权对象"
                  :disabled="inputDisabled"
                  :maxlength="20"></el-input>
      </div>
    </div>

    <div class="tr">
      <div class="firstTd">层级：</div>
      <div class="secondTd">
        <el-select v-model="imIndexSort.levels"
                   size="small"
                   placeholder="选择层级"
                   @change="layersSelect(layers,imIndexSort.levels,$event)"
                   :disabled="true">
          <el-option v-for="(item,index) in layers"
                     :ref="item.name"
                     :id="item.name"
                     :dictKey="item.name"
                     :label="item.name"
                     :value="item.name"
                     :key="index"></el-option>
        </el-select>
      </div>
    </div>
    <div class="tr">
      <div class="firstTd">父节点：</div>
      <div class="secondTd">
        <el-select v-model="treeName"
                   size="small"
                   placeholder="选择父节点"
                   @change="nodeSelect(allTree,treeName,$event)"
                   :disabled="inputDisabled">
          <el-option v-for="(item,index) in allTree"
                     :ref="item.name"
                     :id="item.id"
                     :dictKey="item.id"
                     :label="item.name"
                     :value="item.name"
                     :key="index"></el-option>
        </el-select>
      </div>
    </div>
    <div class="tr">
      <div class="firstTd">排序：</div>
      <div class="secondTd">
        <el-input-number v-model="imIndexSort.turn"
                         size="small"
                         controls-position="right"
                         @change="handleChange"
                         :disabled="inputDisabled"></el-input-number>
      </div>
    </div>

    <div class="tr">
      <div class="firstTd">分类说明：</div>
      <div class="secondTd">
        <el-input :disabled="inputDisabled"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  :maxlength="200"
                  v-model="imIndexSort.description"></el-input>
      </div>
    </div>

    <div class="tr-button"
         v-if="!inputDisabled">
      <div class="EPFButton EFPreset"
           @click="cancel()">取 消</div>
      <div class="EPFButton EFPcommon"
           @click="editor()">保 存</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputDisabled: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: ''
    },
    node: {
      type: Object,
      default: {}
    },
    allTree: {
      type: Array,
      default: [{ id: '1', name: '第一节' }, { id: '2', name: '第儿节' }, { id: '3', name: '第3节' }, { id: '4', name: '第4节' }]
    },
    layers: {
      type: Array,
      default: []
    }

  },
  data () {
    return {
      treeName: '',
      node: '',
      imIndexSort: {
        id: '',
        description: '',
        layers: '',
        layersName: '',
        name: '',

        turn: '',
        parentId: ''
      }
    }
  },
  methods: {
    handleChange (value) {
      this.filterData['orgId'] = value[value.length - 1]
    },
    editor () {
      if (!this.imIndexSort.name && !this.imIndexSort.parentId) {
        this.$message('请输入指标名称、父级目录')
        return
      }
      this.$post(
        '/epf-result-review/revplanningcategorymanage/editRevPlanningCategoryManage',
        this.imIndexSort
      ).then(res => {
        if (res.code === 0) {
          this.$emit('success')
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    getEditor (id) {
      this.$post(
        '/epf-result-review/revplanningcategorymanage/getRevPlanningCategoryManage',
        { id: id }
      ).then(res => {
        if (res.code === 0) {
          this.imIndexSort = res.revPlanningCategoryManage
          switch (this.node.level) {
            case 1:
              this.$set(this.imIndexSort, 'levels', '顶级')
              break

            case 2:
              this.$set(this.imIndexSort, 'levels', '一级')
              break
            case 3:
              this.$set(this.imIndexSort, 'levels', '二级')
              break
            case 4:
              this.$set(this.imIndexSort, 'levels', '三级')
              break
            case 5:
              this.$set(this.imIndexSort, 'levels', '四级')
              break
          }
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    nodeSelect (dic, treeName, event) {
      this.imIndexSort.parentId = this.$refs[treeName][0].$attrs.dictKey
    },

    cancel () {
      this.$emit('cancel')
    }

  },
  watch: {
    id: {
      handler (newVal, oldVal) {
        this.getEditor(newVal)
      }
    },
    node: {
      handler (newVal, oldVal) {
        this.treeName = newVal.parent.data.name
        this.node = node
      },
      deep: true
    }
  }

}
</script>

<style scoped>
@import "./index.css";
</style>
