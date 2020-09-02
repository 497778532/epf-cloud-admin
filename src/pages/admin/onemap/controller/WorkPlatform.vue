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
                        :EPFcommon="common"></controllerResource>
  </el-tab-pane>
</template>

<script>
export default {

}
</script>

<style>
</style>
