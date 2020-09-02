<template>
  <div class="switch_box">
    <div class="tr">
      <div class="firstTd">分类名称：</div>
      <div class="secondTd">
        <el-input v-model="params.name"
                  placeholder="请输入授权对象"
                  :maxlength="20"></el-input>
      </div>
    </div>

    <div class="tr">
      <div class="firstTd">层级：</div>
      <div class="secondTd">
        <el-select v-model="params.layersName"
                   :disabled="true"
                   size="small"
                   placeholder="选择层级"
                   @change="layersSelect(layers,params.layersName,$event)">
          <el-option v-for="(item,index) in layers"
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
      <div class="firstTd">父节点：</div>
      <div class="secondTd">
        <el-select v-model="params.treeName"
                   size="small"
                   placeholder="选择父节点"
                   @change="nodeSelect(allTree,params.treeName,$event)">
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
        <el-input-number v-model="params.turn"
                         size="small"
                         controls-position="right"
                         @change="handleChange"></el-input-number>
      </div>
    </div>

    <div class="tr">
      <div class="firstTd">分类说明：</div>
      <div class="secondTd">
        <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  :maxlength="200"
                  v-model="params.description"></el-input>
      </div>
    </div>

    <div class="tr-button">
      <div class="EPFButton EPFwirte"
           @click="cancel()">取 消</div>
      <div class="EPFButton darkBlue"
           @click="save()">保 存</div>
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
      default: []
    },
    layers: {
      type: Array,
      default: []
    },
    name: {
      type: String,
      default: ''
    }

  },
  data () {
    return {

      params: {
        description: '',
        layers: '',
        layersName: '',
        name: '',
        treeName: '',
        turn: '',
        parentId: ''
      }
    }
  },
  methods: {
    handleChange (value) {
      this.filterData['orgId'] = value[value.length - 1]
    },
    cancel () {
      this.params = this.$options.data().params
      this.$emit('cancel')
    },
    nodeSelect (dic, treeName, event) {
      this.params.parentId = this.$refs[treeName][0].$attrs.dictKey
    },
    layersSelect (dic, layersName, event) {
      this.params.layers = this.$refs[layersName][0].$attrs.dictKey
    },
    save () {
      if (!this.params.name && !this.params.parentId) {
        this.$message('请输入指标名称、父级目录')
        return
      }
      this.$post(
        '/epf-result-review/revplanningcategorymanage/addRevPlanningCategoryManage',
        this.params
      ).then(res => {
        if (res.code === 0) {
          this.$emit('success')
          this.params = this.$options.data().params
          this.$message.success(res.msg) // 失败
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    }
  },
  watch: {
    node: {
      handler (newVal, oldVal) {
        this.params = newVal
      },
      deep: true
    },
    params: {
      handler (newVal, oldVal) {
        this.$emit('update:name', newVal.name)
      },
      deep: true
    },
    name (val) {
      this.params.name = val
    }
  }
}
</script>

<style scoped>
@import "./index.css";
</style>
