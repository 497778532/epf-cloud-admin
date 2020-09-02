<template>
  <el-scrollbar style="height:100%"
                ref="tableScrollbar">
    <div class="page-body EPF-table"
         id="knowledge"
         style="background: #f7f7f7;">
      <div class="filter_wrap">
        <el-container style="height: auto;">
          <el-main style="margin-right: 16px;">
            <el-tabs>
              <div class="switchHeight_box">
                <el-row>
                  <el-col :span="10">
                    <el-col>
                      <span style="min-height:40px;font-size: 28px;line-height:40px; font-weight: bold;">公共文档</span>
                      <p class="tabs"
                         style="min-height:40px;">
                        <span v-for="(item, index) in toptag"
                              :key="index"
                              class="blu"
                              @click="tagclick(item)">
                          <i v-if="index > 0"
                             class="blu">> </i>{{ item.name }}
                        </span>
                      </p>
                    </el-col>
                  </el-col>
                  <el-col :span="14"
                          style="min-height:80px;display:flex;flex-direction: column;justify-content: space-between;align-items: flex-end;">
                    <el-row :span="12"
                            style="min-height:40px;display:flex;align-items: center;justify-content: flex-end;"
                            class="rightButton">
                      <!-- <div class="search">
                        <el-popover placement="bottom"
                                    trigger="click">
                          <el-form label-width="100px"
                                   ref="form"
                                   :model="searchInfo">
                            <el-form-item label="文档来源：">
                              <el-autocomplete style="width: 100%;"
                                               popper-class="my-autocomplete"
                                               v-model="searchInfo.resource"
                                               :fetch-suggestions="querySearch"
                                               placeholder="请输入文档来源"
                                               @select="handleSelect">
                                <template slot-scope="props">
                                  <div class="name">{{ props.item.name }}</div>
                                </template>
                              </el-autocomplete>
                            </el-form-item>
                            <el-form-item label="涉及业务：">
                              <el-select v-model="searchInfo.involvedBussyniss"
                                         placeholder="请选择涉及业务">
                                <el-option v-for="(item, index) in dictbussyniss"
                                           :key="index"
                                           :label="item.zhCn"
                                           :value="item.zhCn"></el-option>
                              </el-select>
                            </el-form-item> -->
                            <!-- <el-form-item label="涉及行业：">
                              <el-select v-model="searchInfo.involvedIndustry"
                                         placeholder="请选择涉及行业">
                                <el-option v-for="(item, index) in dictindustry"
                                           :key="index"
                                           :label="item.zhCn"
                                           :value="item.zhCn"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="作者：">
                              <el-input v-model="searchInfo.author"
                                        placeholder="请输入作者"
                                        style="width: 100%;"
                                        :maxlength="20"></el-input>
                            </el-form-item> -->
                            <!-- <div class="form-button"> -->
                              <!-- <el-button type="primary"
                                       plain
                                       @click="clear">重置</el-button>

                            <el-button type="primary"
                                       @click="tosearch">搜索</el-button> -->

                              <!-- <div class="button_qian"
                                   @click="clear">重置</div>
                              <div style="width:64px;height:40px;"></div>
                              <div class="button_shen"
                                   @click="tosearch">搜索</div>
                            </div>
                          </el-form>
                          <el-button slot="reference"
                                     circle
                                     style="border: 0px; border-radius: inherit;"><i class="el-icon-s-opportunity"
                               style="color: #ccc;font-size: 16px;"></i><span style="font-size: 16px;">筛选</span>
                          </el-button>
                        </el-popover>
                      </div> -->
                      <div class="search">
                        <img src="../images/上传.png"
                             alt=""><span @click="uploadWrokFile">上传</span>
                        <!-- <el-button icon="el-icon-upload2"
                                 circle
                                 style="border: 0px; border-radius: inherit;"
                                 @click="uploadWrokFile">上传
                      </el-button> -->
                      </div>
                      <div class="search">
                        <img src="../images/上传记录.png"
                             alt=""><span @click="uploadRecord">上传记录</span>
                        <!-- <el-button icon="el-icon-tickets"
                                 circle
                                 style="border: 0px; border-radius: inherit;"
                                 @click="uploadRecord">上传记录
                      </el-button> -->
                      </div>
                      <div class="search">
                        <img src="../images/下载.png"
                             alt=""><span @click="downFile">下载</span>
                        <!-- <el-button icon="el-icon-download"
                                 circle
                                 style="border: 0px; border-radius: inherit;"
                                 @click="downFile">下载 -->
                        <!-- </el-button> -->
                      </div>
                      <div class="search">
                        <img src="../images/导出.png"
                             alt=""><span @click="exportDocument">导出</span>

                        <!-- <el-button icon="el-icon-download"
                                 circle
                                 style="border: 0px; border-radius: inherit;"
                                 @click="exportDocument">导出
                      </el-button> -->
                      </div>
                      <div class="search">
                        <img src="../images/收藏.png"
                             alt=""><span @click="roleseting">收藏</span>
                        <!-- <el-button icon="el-icon-star-off"
                                 circle
                                 style="border: 0px; border-radius: inherit;"
                                 @click="roleseting">收藏
                      </el-button> -->
                      </div>
                      <!-- <el-col :span="5" class="search">
                      <el-button 
                        icon="el-icon-s-unfold" 
                        circle 
                        style="border: 0px;border-radius: inherit;"
                        @click="changelisttype">切换排列模式
                      </el-button>
                  </el-col> -->
                    </el-row>
                    <el-row :span="12">
                      <div style="display: flex;justify-content: flex-end;">
                        <!-- <i class="el-icon-search" @click="search"></i> -->
                        <el-input placeholder="请输入您要搜索的关键词"
                                  v-model="searchInfo.name"
                                  @keyup.enter.native="tosearch"
                                  style="width:300px;"
                                  :maxlength="50">
                        </el-input>
                        <div>
                          <!-- <el-button type="primary"
                                   plain
                                   @click="tosearch">搜索</el-button> -->
                          <div class="primary_search"
                               @click="tosearch">搜索</div>
                        </div>
                        <div class="search">
                        <el-popover placement="bottom"
                                    trigger="click">
                          <el-form label-width="100px"
                                   ref="form"
                                   :model="searchInfo">
                            <el-form-item label="文档来源：">
                              <el-autocomplete style="width: 100%;"
                                               popper-class="my-autocomplete"
                                               v-model="searchInfo.resource"
                                               :fetch-suggestions="querySearch"
                                               placeholder="请输入文档来源"
                                               @select="handleSelect">
                                <template slot-scope="props">
                                  <div class="name">{{ props.item.name }}</div>
                                </template>
                              </el-autocomplete>
                            </el-form-item>
                            <el-form-item label="涉及业务：">
                              <el-select v-model="searchInfo.involvedBussyniss"
                                         placeholder="请选择涉及业务">
                                <el-option v-for="(item, index) in dictbussyniss"
                                           :key="index"
                                           :label="item.zhCn"
                                           :value="item.zhCn"></el-option>
                              </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="涉及行业：">
                              <el-select v-model="searchInfo.involvedIndustry"
                                         placeholder="请选择涉及行业">
                                <el-option v-for="(item, index) in dictindustry"
                                           :key="index"
                                           :label="item.zhCn"
                                           :value="item.zhCn"></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="作者：">
                              <el-input v-model="searchInfo.author"
                                        placeholder="请输入作者"
                                        style="width: 100%;"
                                        :maxlength="20"></el-input>
                            </el-form-item> -->
                            <div class="form-button">
                              <!-- <el-button type="primary"
                                       plain
                                       @click="clear">重置</el-button>

                            <el-button type="primary"
                                       @click="tosearch">搜索</el-button> -->

                              <div class="button_qian"
                                   @click="clear">重置</div>
                              <div style="width:64px;height:40px;"></div>
                              <div class="button_shen"
                                   @click="tosearch">搜索</div>
                            </div>
                          </el-form>
                          <el-button slot="reference"
                                     circle
                                     style="border: 0px; border-radius: inherit;">
                                     <div style="display: flex;height: 20px;align-items: center;font-size: 18px;">
                                     <img src="../images/shaixuan.png" alt="">
                                     &nbsp;&nbsp;筛选
                                     </div>
                          </el-button>
                        </el-popover>
                      </div>
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
              </div>

              <!--列表模式  -->
              <div class="main-table"
                   ref="ggBOX">
                <el-table :default-sort="{ prop: 'createTime', order: 'descending' }"
                          ref="multipleTable"
                          :data="docInfoList"
                          style="width: 100%;min-height:100px;"
                          border
                          stripe
                          @selection-change="handleSelectionChange"
                          @sort-change="changeorders"
                          v-loading="loading"
                          element-loading-text="数据加载中"
                          element-loading-background="rgba(255, 255, 255,0.95)"
                          v-show="tablelist"
                          :header-cell-style="{ background: 'rgba(246,246,246,1)' }">
                  <el-table-column fixed
                                   type="selection"
                                   width="55"
                                   align="center"></el-table-column>
                  <el-table-column fixed
                                   prop="name"
                                   label="文件名称"
                                   min-width="230">
                    <template slot-scope="scope">
                      <div class="cell_click"
                           @click="clickselectrow(scope.$index, scope.row)">
                        <div class="docuImg">
                          <img v-if="'png,gif,jpeg,jpg,jtp,rar'.indexOf(scope.row.extName.toLowerCase()) != -1"
                               :src="'/api/epf-document/document/downloadById?id=' + scope.row.id" />
                          <img v-else
                               :src="require('@/assets/docu/' + scope.row.extName.toLowerCase() + '.png')" />
                        </div>
                        <p class="ellipsis"
                           :title="scope.row.name">
                          {{ scope.row.name }}
                        </p>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="source"
                                   label="文档来源"
                                   min-width="110"
                                   align="center">
                    <template slot-scope="scope">
                      {{ scope.row.source }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="involvedBussyniss"
                                   label="涉及业务"
                                   min-width="110"
                                   align="center">
                    <template slot-scope="scope">
                      {{ scope.row.involvedBussyniss }}
                    </template>
                  </el-table-column>

                  <el-table-column prop="keywords"
                                   label="关键字"
                                   min-width="100"
                                   align="center">
                    <template slot-scope="scope">
                      {{ scope.row.keywords }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="version"
                                   label="文档状态"
                                   min-width="110"
                                   align="center">
                    <template slot-scope="scope">
                      {{ scope.row.versionType }}-{{ scope.row.versionRemark }}
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="createTime"
                                 label="发文日期"
                                 min-width="130"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.createTime }}
                  </template>
                </el-table-column> -->
                  <!-- <el-table-column prop="issuedNumber"
                                 label="发文字号"
                                 min-width="130"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.issuedNumber }}
                  </template>
                </el-table-column> -->
                  <!-- <el-table-column prop="involvedIndustry"
                                 label="涉及行业"
                                 min-width="130"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.involvedIndustry }}
                  </template>
                </el-table-column> -->
                  <!-- <el-table-column prop="author"
                                 label="作者"
                                 min-width="130"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.author }}
                  </template>
                </el-table-column> -->
                  <el-table-column prop="createName"
                                   label="上传人"
                                   min-width="130"
                                   align="center">
                    <template slot-scope="scope">
                      {{ scope.row.createName }}
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="readNumber"
                                 label="浏览量"
                                 sortable
                                 min-width="100"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.readNumber }}
                  </template>
                </el-table-column> -->
                  <!-- <el-table-column prop="dochot"
                                 label="文档热度"
                                 min-width="100"
                                 align="center">
                  <template slot-scope="scope">
                    <hot :hotNumber="scope.row.readNumber"></hot>
                  </template>
                </el-table-column> -->
                  <!-- <el-table-column prop="remark" label="描述" min-width="150">
                  <template slot-scope="scope">
                    {{scope.row.remark}}
                  </template>
                </el-table-column> -->
                  <el-table-column prop="docNo"
                                   label="文档编号"
                                   min-width="150"
                                   align="center">
                    <template slot-scope="scope">
                      {{ scope.row.docNo }}
                    </template>
                  </el-table-column>

                  <!-- <el-table-column prop="docSize"
                                 label="大小"
                                 sortable
                                 min-width="100"
                                 align="center">
                  <template slot-scope="scope">
                    {{ scope.row.docSize | numFilterScan }}{{ scope.row.unit  }}
                  </template>
                </el-table-column> -->
                </el-table>

                <!-- 切换后的排列模式 -->
                <el-main :style="{
                  height: menuListHeight - 150 + 'px',
                  borderLeft: '1px solid rgb(224, 224, 224)',
                  borderBottom: '1px solid rgb(224, 224, 224)',
                  borderRight: '1px solid rgb(224, 224, 224)',
                }"
                         v-if="!tablelist">
                  <el-row> </el-row>
                  <el-row v-loading="loading"
                          element-loading-text="数据加载中"
                          element-loading-background="rgba(255, 255, 255,0.95)"
                          style="min-height: 200px; padding: 3px; flex-direction: row;">
                    <el-col :span="24"
                            style="padding-left: 1%;">
                      <el-checkbox :indeterminate="isIndeterminate"
                                   v-model="checkAll"
                                   @change="handleCheckAllChange">全选</el-checkbox>
                    </el-col>
                    <el-checkbox-group v-model="checkedCities"
                                       @change="handleCheckedCitiesChange"
                                       style="padding-left: 3%;">
                      <el-col class="carditem"
                              @contextmenu.native="
                        rightClick(item.id, item.fdId, index, item)
                      "
                              @mouseenter.native="mouseIn(item.id, index)"
                              @mouseleave.native="mouseOut(item.id, index)"
                              v-rightMenu="menudata"
                              v-for="(item, index) in docInfoList"
                              :key="index"
                              :span="3">
                        <el-checkbox :key="item.id"
                                     :label="item.id"><span hidden>this is hidden</span></el-checkbox>
                        <div class="docImgBox"
                             @click="changeCheckFile(item.id, index)">
                          <img width="70px"
                               height="70px"
                               v-if="
                            'png,gif,jpeg,jpg'.indexOf(
                              item.extName.toLowerCase()
                            ) != -1
                          "
                               :src="
                            '/api/epf-document/document/downloadById?id=' +
                            item.id
                          " />
                          <img width="70px"
                               height="70px"
                               v-else
                               :src="
                            require('@/assets/docu/' +
                              item.extName.toLowerCase() +
                              '2x.png')
                          " />
                          <span v-show="checkFiles">
                            <span v-show="!item.checkFiles"
                                  class="checkBox">
                              <span class="check">
                                <i class="el-icon-check"></i>
                              </span>
                            </span>
                            <span v-show="item.checkFiles"
                                  class="checkBox">
                              <span class="checked">
                                <i class="el-icon-check"></i>
                              </span>
                            </span>
                          </span>
                        </div>
                        <div v-show="item.showInput"
                             class="cardbottomInput">
                          <input :style="{ borderColor: errorBoderColor }"
                                 @focus="errorBoderColor = 'rgb(192, 192, 192)'"
                                 v-model="newFileName"
                                 placeholder="请输入内容" />
                          <el-button type="success"
                                     style="
                            width: 25px;
                            height: 25px;
                            padding: 0px 5px;
                            line-height: 25px;
                          "
                                     size="mini"
                                     icon="el-icon-check"
                                     @click="changeNameSure"
                                     plain></el-button>
                          <el-button type="danger"
                                     style="
                            width: 25px;
                            height: 25px;
                            padding: 0px 5px;
                            line-height: 25px;
                            margin-left: 1px;
                          "
                                     size="mini"
                                     icon="el-icon-close"
                                     @click="changeNameCancel"
                                     plain></el-button>
                        </div>
                        <div v-show="!item.showInput"
                             class="cardbottom">
                          {{ item.name }}
                        </div>

                        <div v-show="item.showInput2"
                             class="cardbottomInput">
                          <input :style="{ borderColor: errorBoderColor }"
                                 @focus="errorBoderColor = 'rgb(192, 192, 192)'"
                                 v-model="newSort"
                                 placeholder="请输入数字（数字越小越靠前）" />
                          <el-button type="success"
                                     style="
                            width: 25px;
                            height: 25px;
                            padding: 0px 5px;
                            line-height: 25px;
                          "
                                     size="mini"
                                     icon="el-icon-check"
                                     @click="changeSortSure"
                                     plain></el-button>
                          <el-button type="danger"
                                     style="
                            width: 25px;
                            height: 25px;
                            padding: 0px 5px;
                            line-height: 25px;
                            margin-left: 1px;
                          "
                                     size="mini"
                                     icon="el-icon-close"
                                     @click="changeSortCancel"
                                     plain></el-button>
                        </div>
                      </el-col>
                    </el-checkbox-group>
                  </el-row>
                </el-main>
                <div style="text-align:right;margin:12px 0px;position: absolute;bottom:16px;right:24px;">
                  <el-pagination background
                                 layout="total,prev, pager, next,sizes,jumper"
                                 :page-sizes="[5, 10, 15, 20]"
                                 @size-change="handleSizeChange"
                                 @current-change="handleCurrentChange"
                                 :page-size="pageSize"
                                 :current-page="pageNo"
                                 :total="totalRecord"></el-pagination>
                </div>
              </div>
            </el-tabs>
          </el-main>

          <div class="knowledgeRight">
            <el-aside width="300px"
                      style="margin-bottom:16px;height:270px;min-height:270px;max-height:270px;box-shadow:0px 0px 4px 0px rgba(153,153,153,0.3);border: 0px solid transparent; transform: translate3d(0, -2px, 0);transition: 0.5s;box-sizing:border-box;">
              <!-- <el-header style="height: 40px;line-height: 40px;display: flex;justify-content: space-between;align-items: center;"
                       class="m_title"><span style="font-size: 18px; padding-left: 12px;">常用标签</span><span @click="AddFlowpatreason"
                    style="cursor: pointer; color: rgba(80, 165, 244, 1);">编辑</span>
            </el-header> -->
              <div class="doc-left-title">
                <span>常用标签</span>
                <span @click="AddFlowpatreason">编辑</span>
              </div>
              <el-row>
                <el-col v-for="(tag, index) in dynamicTags"
                        :key="index"
                        style="display:flex;justify-content: flex-start;align-items: center;">
                  <!-- <el-button type="danger" :style="colors[index]" circle  @click="gettagdao(tag.id)"></el-button> -->
                  <img src="../images/标签.png"
                       alt="" /><span @click="gettagdao(tag.id)"
                        style="cursor: pointer;">{{ tag.name }}</span>
                </el-col>
              </el-row>
            </el-aside>
            <el-aside width="300px"
                      style="margin-bottom:16px;height:calc(100% - 362px);box-shadow:0px 0px 4px 0px rgba(153,153,153,0.3);border: 0px solid transparent; transform: translate3d(0, -2px, 0);transition: 0.5s;">
              <!-- <el-header style="height: 40px; line-height: 40px;border-bottom: 2px solid #eeeeee;"
                       class="m_title"><i class="el-icon-s-fold"></i> 文档分类</el-header> -->
              <div class="doc-left-title">
                <span>文档分类</span>
              </div>
              <div :style="{height:treeHeight+'px'}"
                   class="tree-flow">
                <el-tree v-loading="loading2"
                         element-loading-text="数据加载中"
                         element-loading-background="rgba(255, 255, 255,0.95)"
                         :props="defaultProps"
                         :data="forderdata"
                         node-key="id"
                         :expand-on-click-node="false"
                         class="orgManange_List"
                         @node-drag-end="handleDragEnd"
                         draggable
                         style="width:100%;">
                  <span class="custom-tree-node"
                        style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 16px;color:#595959;height:40px;overflow:hidden;"
                        slot-scope="{ node, data }">
                    <span style="width:100%;display: flex; align-items: center; justify-content: flex-start;">
                      <img v-if="!node.expanded"
                           style="width:22px;height:20px;margin-right:5px;"
                           src="../../../../assets/wenjian1.png"
                           alt />
                      <img v-if="node.expanded"
                           style="width:22px;height:20px;margin-right:5px;"
                           src="../../../../assets/wenjian2.png"
                           alt />
                      <span @click="getdocInfos(node, data)">{{ node.label }}</span>
                      <!-- <el-tooltip class="item"
                                effect="dark"
                                :content="node.label"
                                placement="top-start">
                      <span @click="getdocInfos(node, data)"
                            style="display: inline;width:calc(100% - 50px);overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                        {{ node.label }}
                      </span>
                    </el-tooltip> -->
                    </span>
                  </span>
                </el-tree>
              </div>
            </el-aside>
            <el-aside width="300px"
                      style="height:60px;min-height:60px;max-height:60px;padding: 10px 16px;box-shadow:0px 0px 4px 0px rgba(153,153,153,0.3);border: 0px solid transparent; transform: translate3d(0, -2px, 0);transition: 0.5s;"
                      class="includ">
              <div style="width: 40px; height: 40px;">
                <img src="../../../../assets/images/cake.png"
                     alt="" />
              </div>
              <div>
                <span style="font-size:24px;color:#595959;font-weight:600;">{{ totlecorde }}件</span>收录总数
              </div>
            </el-aside>
          </div>
        </el-container>
      </div>

      <!-- 弹框 -->
      <el-dialog :title="savetitle"
                 :visible.sync="dialogFormVisible"
                 width="40%"
                 class="bianjiDialog"
                 :append-to-body="true"
                 :close-on-click-modal="false">
        <el-container style="
            background: rgba(248, 248, 248, 1);
            border: 1px solid rgba(231, 231, 231, 1);
            border-radius: 2px;
            padding: 10px;
          ">
          <el-row :gutter="2">
            <el-col :span="24">
              <p style="font-size:16px;">我的标签 <span>（最多只能添加六个）</span></p>
              <el-tag style="margin: 10px;"
                      :key="index"
                      v-for="(tag, index) in selectedtag"
                      closable
                      :disable-transitions="false"
                      @close="handleClosetag(tag)">
                {{ tag.name }}
              </el-tag>
            </el-col>
            <el-col :span="24">
              <p style="font-size:16px;margin-top:50px;">全部标签</p>
              <span v-for="(tag, index) in alltag"
                    :key="index">
                <el-button v-if="selectedtagid.indexOf(tag.id) != -1"
                           class="button-new-tag"
                           size="small">{{ tag.name }} +</el-button>
                <el-button v-else
                           class="button-new-tag"
                           size="small"
                           @click="handleInputConfirm(tag)">{{ tag.name }} +</el-button>
              </span>
            </el-col>
          </el-row>
        </el-container>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->

          <!-- <el-button type="primary"
                   @click="saveuserinfo('ruleForm')">保存</el-button> -->
          <span class="button_shen"
                @click="saveuserinfo('ruleForm')">保存</span>
          <div style="width:96px;height:40px;"></div>
          <span class="button_qian"
                @click="dialogFormVisible = false">取消</span>
        </div>
      </el-dialog>
      <!--###########弹框收藏##############-->
      <el-dialog title="收藏"
                 :visible.sync="dialogFormroleVisible"
                 width="40%"
                 class="shoucangDialog"
                 :append-to-body="true"
                 :close-on-click-modal="false">
        <div style="
            background: rgba(248, 248, 248, 1);
            border: 1px solid rgba(231, 231, 231, 1);
            border-radius: 2px;
            padding: 10px;
            min-height: 300px;
          ">
          <div class="choice">
            <p style="padding-bottom: 10px;font-size:16px;">
              选择收藏夹
              <span class="el-icon-folder-add"
                    style="font-size:16px;"
                    @click="addCollect">新建收藏夹</span>
            </p>
            <el-cascader expand-trigger="hover"
                         :options="foldercollect"
                         :props="folderprops"
                         :show-all-levels="false"
                         v-model="selectrows"
                         :change-on-select="true"
                         @change="roleOnchange"
                         style="width:100%;">
            </el-cascader>
          </div>
          <!-- <div>
            <p style="padding: 20px 0px 10px;">添加备注</p>
            <el-input type="textarea"
                      placeholder="请输入要备注的内容"
                      v-model="textarea"
                      :maxlength="200"
                      show-word-limit
                      resize="none"
                      :autosize="{ minRows: 4, maxRows: 30 }"></el-input>
          </div> -->
        </div>
        <div slot="footer"
             class="dialog-footer">
          <!-- <el-button @click="dialogFormroleVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="getCheckedKeys">保存</el-button> -->
          <!-- <span class="button_shen"
                @click="getCheckedKeys">保存</span> -->
          <el-button @click="getCheckedKeys"
                     v-preventReClick>保存</el-button>
          <div style="width:96px;height:40px;"></div>
          <span class="button_qian"
                @click="dialogFormroleVisible = false">取消</span>
        </div>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>
<script>
import qs from "qs";
import Axios from "axios";
import { constants } from "zlib";
import { mapActions, mapState } from "vuex";
import configApi from "../../../../../config/index";
import base from "../../../../utils/config.js";
import hot from "../components/hot";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "knowledge",
  components: { hot },

  data () {
    return {
      folderprops: {
        value: "id",
        label: "folderName",
        children: "childForder",
      },
      form: { name: "", region: "" },
      tablelist: true,
      selectedtag: [],
      selectedtagid: [],
      foldercollect: [], //收藏夹
      alltag: [],
      totlecorde: 0,
      input: "",
      dynamicTags: [],
      inputVisible: false,
      textarea: "",
      searchShow: true,
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true,
      dialogFlieName: "",
      defaultProps: {
        children: "childForder",
        label: "id",
      },
      forderdata: [],
      loading2: true,
      folderId: "",
      docInfoList: [],
      currentNode: {},
      currentData: {},
      currentIndex: -1,
      errorBoderColor: "",
      parentdata: {},
      checkFiles: false, //  开启选择文件功能
      currentId: "",
      newFileName: "",
      newSort: "",
      currentFileIndex: 0,
      menudata: {
        dit: "docRightMenu",
        // 菜单box的样式   Menu box style
        boxStyle:
          "width:80px;background:#fff;box-shadow: 0px 0px 15px rgb(172, 172, 172);",
        // 菜单选项的样式 Style of menu options
        optionStyle:
          "color:#666;line-height:30px;font-size:16px;text-align:left;padding-left:10px;",
        menus: [
          {
            content: "下载",
            callback: "downloadfile",
            style:
              "border-bottom:1px solid #fff;background:#fff;line-height:30px;",
          },
          {
            content: "预览",
            callback: "openDoc",
            style:
              "border-bottom:1px solid #fff;background:#fff;line-height:30px;",
          },
        ],
      },
      queryByIdUrl: "",
      loading: true,
      menuListHeight: 100,
      dialogFormVisible: false,
      dialogFormroleVisible: false,
      selectrows: [],
      value: "",
      toptag: [{ name: "全部文件", type: "all", id: "" }],
      selectGroups: [],
      savetitle: "新增账号",
      dialogForm: false,
      pageNo: 1,
      pageSize: 5,
      totalPage: 1,
      totalRecord: 1,
      searchInfo: { usetype: "" },
      colors: [],
      folderType: "1", //文件类型：1文件夹，知识分类；2收藏夹；3工作文件夹分类,文档分类
      dictindustry: [],
      dictbussyniss: [],
      restaurants: [
        { name: "厅规划处", value: "厅规划处" },
        { name: "厅领导", value: "厅领导" },
      ],

      treeHeight: 377
    };
  },
  created () {
    this.menuListHeight = window.innerHeight - 245;
    this.searchInfo["page"] = this.pageNo;
    this.searchInfo["rows"] = this.pageSize;
    this.searchInfo["load"] = true;
    this.randomRgb();
    this.getDocList(this.searchInfo);
    this.getowmtag();
    this.loadTree();
    this.queryDictList("involved_industry");
    this.queryDictList("involved_bussyniss");
    this.queryDictList("doc_sourse");
    this.exitFullScreen();
  },
  methods: {
    queryDictList (code) {
      var that = this;
      that
        .$get("/epf-admin/admin/dictionaries/getDictEbyDictGroup/" + code)
        .then((res) => {
          if (res.code === 0) {
            if (code == "involved_industry") {
              if (res.dictionariesList != null) {
                that.dictindustry = res.dictionariesList;
              } else {
                that.dictindustry = [];
              }
            } else if (code == "doc_sourse") {
              if (res.dictionariesList != null) {
                var list = [];
                for (
                  let index = 0;
                  index < res.dictionariesList.length;
                  index++
                ) {
                  list.push({
                    name: res.dictionariesList[index]["zhCn"],
                    value: res.dictionariesList[index]["zhCn"],
                  });
                }
                that.restaurants = list;
              } else {
                that.restaurants = [];
              }
            } else {
              if (res.dictionariesList != null) {
                that.dictbussyniss = res.dictionariesList;
              } else {
                that.dictbussyniss = [];
              }
            }
          } else {
            that.$message.warning(res.msg);
          }
        });
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect (item) { },
    clear () {
      this.searchInfo = {};
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.getDocList(this.searchInfo);
    },
    changeorders (event) {
      var _this = this;
      this.pageNo - 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.searchInfo["sort"] = event.prop;
      this.searchInfo["order"] = event.order;
      this.getDocList(this.searchInfo);
    },
    randomRgb () {
      var colors = [];
      for (let index = 0; index < 10; index++) {
        let R = Math.floor(Math.random() * 255);
        let G = Math.floor(Math.random() * 255);
        let B = Math.floor(Math.random() * 255);
        colors.push({ background: "rgb(" + R + "," + G + "," + B + ")" });
      }
      this.colors = colors;
    },
    tosearch () {
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.getDocList(this.searchInfo);

      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("knowledge"), element => {
        _this.$nextTick(() => {
          setTimeout(() => {
            //监听到事件后执行的业务逻辑
            this.treeHeight = this.$refs.ggBOX.offsetHeight - 276;
          }, 500);
        });
      });
    },

    tagclick (tag) {
      //{name:"全部文件",type:"all",id:""}
      if (tag.type == "all") {
        var newtag = [];
        newtag.push(this.toptag[0]);
        this.toptag = newtag;
        this.pageNo = 1;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["name"] = "";
        this.searchInfo["folderId"] = "";
        this.searchInfo["tagId"] = "";
        this.getDocList(this.searchInfo);
      } else {
        this.pageNo = 1;
        this.searchInfo["page"] = this.pageNo;
        this.searchInfo["rows"] = this.pageSize;
        this.searchInfo["name"] = "";
        this.searchInfo["folderId"] = this.toptag[1].id;
        this.searchInfo["tagId"] = "";
        this.getDocList(this.searchInfo);
      }
    },
    //多选框
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange (value) {
      this.selectGroups = [];
      for (var i = 0; i < this.checkedCities.length; i++) {
        this.selectGroups.push({ id: this.checkedCities[i] });
      }

      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    changelisttype () {
      this.tablelist = !this.tablelist;

      this.selectGroups = [];

      this.checkAll = false;
      this.checkedCities = [];
      // this.cities=[];
      this.isIndeterminate = true;
    },
    gettagdao (tagId) {
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.searchInfo["folderId"] = "";
      this.searchInfo["tagId"] = tagId;
      this.getDocList(this.searchInfo);

      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("knowledge"), element => {
        _this.$nextTick(() => {
          setTimeout(() => {
            //监听到事件后执行的业务逻辑
            this.treeHeight = this.$refs.ggBOX.offsetHeight - 276;
          }, 500);
        });
      });
    },
    ...mapActions(["setTabsList"]),
    search () {
      this.searchShow = !this.searchShow;
    },
    addCollect () {
      this.$prompt("请输入收藏夹名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          var params = [];
          params["folderName"] = value;
          params["folderType"] = "2";
          this.$post("/epf-document/admin/docfolder/save", params).then(
            (res) => {
              if (res.code != 0) {
                return;
              }

              this.roleseting();
              this.selectrows = [res.oaFolder.id];
            }
          );
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });
        });
    },
    handleClosetag (tag) {
      this.selectedtagid.splice(this.selectedtagid.indexOf(tag.id), 1);
      this.selectedtag.splice(this.selectedtag.indexOf(tag), 1);
    },

    showInput () {
      this.inputVisible = true;

      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm (tag) {
      if (this.selectedtag.length >= 6) {
        this.$message.warning("最多添加六条标签！");
        return;
      } else {
        this.selectedtag.push(tag);
        this.selectedtagid.push(tag.id);
      }
    },
    roleOnchange (e) {
      this.selectrows = e;
    },
    clickselectrow (index, row) {
      // this.$refs.multipleTable.toggleRowSelection(row);
      let that = this;
      let title = "文档浏览";
      let routerPath = "/documentBrowse";
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({ path: routerPath, query: { row: row } });
    },
    getCheckedKeys (e) {
      var that = this;
      if (that.selectrows.length == 0) {
        that.$message.warning("请选择收藏夹！");
        return;
      }
      if (that.selectGroups.length < 1) {
        that.$message.warning("请选择文件！");
        return;
      } else {
        var folderid = that.selectrows[that.selectrows.length - 1];

        var docid = "";
        for (var i = 0; i < that.selectGroups.length; i++) {
          if (i == 0) {
            docid += that.selectGroups[i].id;
          } else {
            docid += "," + that.selectGroups[i].id;
          }
        }
        var params = {
          folderids: folderid,
          docids: docid,
          remark: that.textarea,
        };
        that
          .$get("/epf-document/admin/doctag/addcollect", params)
          .then((res) => {
            if (res.code != "0") {
              that.$message.error(res.msg); //失败
              return;
            }
            that.$message.success("收藏成功！");
            that.dialogFormroleVisible = false;
          });
      }
    },
    roleseting () {
      var that = this;
      let selectGroups = that.selectGroups;
      if (selectGroups.length <= 0) {
        that.$message.error("请选择需要收藏文件！"); //失败
        return;
      } else if (selectGroups.length > 1) {
        that.$message.error("一次只能收藏一个文件"); //失败
        return;
      }
      let params = { folderType: "2" };
      that
        .$post("/epf-document/admin/docfolder/getFolderByType", params)
        .then((res) => {
          that.foldercollect = res.ztreeJson;
          this.loading2 = false;
        });
      that.selectrows = [];
      that.textarea = "";

      that.dialogFormroleVisible = true;
    },
    saveuserinfo () {
      let that = this;
      var tags = that.selectedtagid;
      var ids = "";
      for (let index = 0; index < tags.length && index < 6; index++) {
        if (index == 0) {
          ids += tags[index];
        } else {
          ids += "," + tags[index];
        }
      }

      that
        .$post("/epf-document/admin/doctag/updateUtag", { id: ids, type: "0" })
        .then((res) => {
          if (res.code != "0") {
            that.$message.error(res.msg); //失败
            return;
          }
          that.dialogFormVisible = false;
          that.getowmtag();
        });
    },
    handleSelectionChange (val) {
      console.log(val)
      this.selectGroups = val;
    },
    async getDocList (params) {
      this.loading = true;
      params["foldertype"] = "1";
      this.$get("/epf-document/docdocumentinfo/getTenantDocJson", params).then(
        (res) => {
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            this.loading = false;
            return;
          }
          if (params.load) {
            this.totlecorde = res.pager.totalRecord;
            this.searchInfo["load"] = "";
          }
          this.pageNo = res.pager.pageNo;
          this.pageSize = res.pager.pageSize;
          this.totalPage = res.pager.totalPage;
          this.totalRecord = res.pager.totalRecord;
          this.docInfoList = res.pager.results;

          this.checkAll = false;
          this.checkedCities = [];
          this.isIndeterminate = true;

          this.cities = [];
          for (var i = 0; i < this.docInfoList.length; i++) {
            this.cities.push(this.docInfoList[i].id);
          }

          this.loading = false;
        }
      );
    },
    exportDocument () {
      let that = this;

      var params = this.searchInfo;
      params["foldertype"] = "1";

      var docIds = "";
      for (var i = 0; i < that.selectGroups.length; i++) {
        if (i == 0) {
          docIds += that.selectGroups[i].id;
        } else {
          docIds += "," + that.selectGroups[i].id;
        }
      }
      params["id"] = docIds;

      var str = this.objectToQueryString(params);
      var token = sessionStorage.getItem("token");
      let ursStr = encodeURI(
        "/api/epf-document/docdocumentinfo/exportExceldoc?token=" +
        token +
        "&" +
        str
      );
      window.open(ursStr);
    },
    objectToQueryString (obj) {
      return Object.keys(obj)
        .map(function (key) {
          return ""
            .concat(encodeURIComponent(key), "=")
            .concat(encodeURIComponent(obj[key]));
        })
        .join("&");
    },
    AddFlowpatreason () {
      this.savetitle = "标签选择";
      var dynamicTags = this.dynamicTags;
      this.selectedtag = dynamicTags;
      var ids = [];
      for (let index = 0; index < dynamicTags.length; index++) {
        ids.push(dynamicTags[index].id);
      }
      this.selectedtagid = ids;
      var params = {};
      params["type"] = "0";
      this.$post("/epf-document/admin/doctag/getTagJson", params).then(
        (res) => {
          if (res.code != "0") {
            this.$message.error(res.msg); //失败
            this.loading = false;
            return;
          }

          this.alltag = res.tags;
          this.loading = false;
        }
      );
      this.dialogFormVisible = true;
    },
    handleSizeChange (val) {
      //每页条数改变时触发
      this.pageNo = 1;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = val;
      this.getDocList(this.searchInfo);

      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("knowledge"), element => {
        _this.$nextTick(() => {
          setTimeout(() => {
            //监听到事件后执行的业务逻辑
            this.treeHeight = this.$refs.ggBOX.offsetHeight - 276;
          }, 500);
        });
      });
    },
    getImgUrl (id) {
      return "/api/epf-document/document/downloadById?id=" + id;
    },
    getowmtag () {
      var params = {};
      params["type"] = "0";
      var that = this;
      that
        .$post("/epf-document/admin/doctag/getOwnTagJson", params)
        .then((res) => {
          if (res.code != "0") {
            that.$message.error(res.msg);
            return;
          }
          if (res.tags == null) {
            that.dynamicTags = [];
          } else {
            that.dynamicTags = res.tags;
          }
        });
    },
    editDocu (node, data) {
      var _this = this;

      _this.$prompt('请输入要修改的文件夹名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        var params = {}
        params["id"] = data.id
        params["folderName"] = value
        params["pId"] = data.pId
        _this.$post("/epf-document/admin/docfolder/save", params).then(res => {
          if (res.code != "0") {
            _this.$message.error(res.msg);
            return;
          }
          _this.$message.success("修改成功！");
          _this.loadTree();
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });       
      });
    },
    append (node, data) {
      this.parentdata = data;
      if (!node.expanded) {
        node.expanded = true;
      }
      const children = { id: "", folderName: "", childForder: [] };
      if (!data.childForder) {
        this.$set(data, "childForder", []);
      }
      data.childForder.push(children);
    },
    remove (node, data) {
      if (data.childForder.length > 0) {
        this.$message.error("请先删除子菜单！"); //失败
        return;
      }
      this.currentNode = node;
      this.currentData = node.data;
      this.deleteforder();
    },
    deleteforder () {
      let that = this;
      if (!that.currentData.id) {
        const parent = that.currentNode.parent;
        const childMenu = parent.data.childForder || parent.data;
        const index = childMenu.findIndex((d) => d.id === this.currentData.id);
        childMenu.splice(index, 1);
        return;
      }
      that
        .$confirm("确认要删除信息吗?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          // type: "warning",
          center: true,
        })
        .then(() => {
          that
            .$post("/epf-document/admin/docfolder/delete", {
              id: that.currentData.id,
            })
            .then((res) => {
              if (res.code == 0) {
                that.$message.success("删除成功!");
              } else {
                that.$message.error(res.msg);
              }
              that.loadTree();
            });
        })
        .catch(() => {
          // that.$message({type: "info", message: "已取消删除"});
        });
    },
    getdocInfos (node, data) {
      this.loading = true;
      var that = this;
      var id = node.data.id;
      if (id == null || id == "") {
        return;
      }

      that.toptag[1] = { name: node.data.folderName, type: "folder", id: id };
      that.folderId = id;
      //每页条数改变时触发
      that.pageNo = 1;
      that.searchInfo["page"] = this.pageNo;
      that.searchInfo["rows"] = this.pageSize;
      that.searchInfo["tagId"] = "";
      that.searchInfo["folderId"] = that.folderId;
      that.getDocList(this.searchInfo);

      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("knowledge"), element => {
        _this.$nextTick(() => {
          setTimeout(() => {
            //监听到事件后执行的业务逻辑
            this.treeHeight = this.$refs.ggBOX.offsetHeight - 276;
          }, 500);
        });
      });
    },
    loadTree () {
      var that = this;
      this.loading2 = true;
      let params = { folderType: "1", showDocCount: "YES" };
      that
        .$post("/epf-document/admin/docfolder/getFolderByType", params)
        .then((res) => {
          if (res.ztreeJson[0].docCount != undefined) {
            if (res.ztreeJson[0].folderName) {
              res.ztreeJson[0].folderName =
                res.ztreeJson[0].folderName +
                "(" +
                res.ztreeJson[0].docCount +
                ")";
              that.totlecorde = res.ztreeJson[0].folderName +
                "(" +
                res.ztreeJson[0].docCount +
                ")";
              if (res.ztreeJson[0].childForder !== null) {
                for (var key2 in res.ztreeJson[0].childForder) {
                  res.ztreeJson[0].childForder[key2].folderName =
                    res.ztreeJson[0].childForder[key2].folderName +
                    "(" +
                    res.ztreeJson[0].childForder[key2].docCount +
                    ")";
                  if (res.ztreeJson[0].childForder[key2].childForder !== null) {
                    for (var key3 in res.ztreeJson[0].childForder[key2]
                      .childForder) {
                      res.ztreeJson[0].childForder[key2].childForder[
                        key3
                      ].folderName =
                        res.ztreeJson[0].childForder[key2].childForder[key3]
                          .folderName +
                        "(" +
                        res.ztreeJson[0].childForder[key2].childForder[key3]
                          .docCount +
                        ")";
                    }
                  }
                }
              }
            }
          }
          this.totlecorde = res.ztreeJson[0].docCount
          let cutPos = "folderName";
          this.$set(this.defaultProps, "label", cutPos);

          that.forderdata = res.ztreeJson;
          that.queryByIdUrl = res.queryByIdUrl;
          this.loading2 = false;
        });
    },
    //文件预览
    openDoc () {
      let that = this;
      let title = "文档浏览";
      let routerPath = "/documentBrowse";
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({ path: routerPath, query: { row: this.currentData } });
    },
    //上传文件跳转
    uploadWrokFile () {
      let that = this;
      let title = "公共文档上传";
      let routerPath = `/libraryUpload?folderType=${that.folderType}&uplaodtype=0`;
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({
        path: routerPath,
        query: { folderType: that.folderType, uplaodtype: "0" },
      });
    },
    //上传记录
    uploadRecord () {
      let that = this;
      let title = "公共文档上传记录";
      let routerPath = "/knowledgeConsult?folderType=1";
      let tabObj = { title, routerPath };
      that.setTabsList(tabObj);
      that.$router.push({
        path: routerPath,
        query: { folderType: that.folderType },
      });
    },
    //文件下载
    downFile (id) {
      let that = this;
      if (that.selectGroups.length != 1) {
        that.$message.warning("请选择一条数据下载！");
        return;
      }
      let ids = that.selectGroups[0].id;
      window.open(
        "/api/epf-document/document/downloadById?id=" + ids + "&fromWhere=page"
      );
    },
    downloadfile (id) {
      window.open(
        "/api/epf-document/document/downloadById?id=" +
        this.currentId +
        "&fromWhere=page"
      );
    },
    changeNameSure () {
      if (this.newFileName.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入文件名！",
          type: "error",
        });
        this.errorBoderColor = "#F56C6C";
        return;
      }
      // this.newFileName 新的文件名
      // this.currentId 当前修改的文件id
      // this.docInfoList[this.currentIndex].name = this.newFileName + '.' + this.docInfoList[this.currentIndex].extName;
      this.docInfoList[this.currentIndex].name = this.newFileName;
      this.$post("/epf-document/docdocumentinfo/renamedDoc", {
        id: this.docInfoList[this.currentIndex].id,
        name: this.docInfoList[this.currentIndex].name,
      }).then((res) => {
        if (res.code == 0) {
          this.$message({
            message: "重命名成功",
            type: "success",
          });
        } else {
          //失败
          this.$message.error(res.msg);
          return;
        }
      });
      this.docInfoList[this.currentIndex]["showInput"] = false;
      this.newFileName = "";
    },
    changeSortSure () {
      var re = /^[0-9]{1,3}$/; //小于4位数纯数字
      if (!re.test(this.newSort)) {
        this.$message({
          showClose: true,
          message: "请输入小于4位数字类型的排序字段！",
          type: "error",
        });
        this.errorBoderColor = "#F56C6C";
        return;
      }
      // if(this.newSort == ''||this.newSort == 'null'||typeof(this.newSort)!="number"||this.newSort.length>4){
      //     this.$message({
      //         showClose: true,
      //         message: '请输入小于4位数字类型的排序字段！',
      //         type: 'error'
      //     });
      //     this.errorBoderColor = '#F56C6C'
      //     return
      // }

      this.docInfoList[this.currentIndex].sort = this.newSort;
      this.$post("/epf-document/docdocumentinfo/sortDoc", {
        id: this.docInfoList[this.currentIndex].id,
        sort: this.docInfoList[this.currentIndex].sort,
      }).then((res) => {
        if (res.code == 0) {
          this.$message({
            message: "排序成功",
            type: "success",
          });
          this.searchInfo["page"] = this.pageNo;
          this.searchInfo["rows"] = this.pageSize;
          this.searchInfo["folderId"] = this.folderId;
          this.getDocList(this.searchInfo);
        } else {
          //失败
          this.$message.error(res.msg);
          return;
        }
      });
      this.docInfoList[this.currentIndex]["showInput2"] = false;
      this.newSort = "";
    },
    changeNameCancel () {
      this.docInfoList[this.currentIndex]["showInput"] = false;
      this.newFileName = "";
    },
    changeSortCancel () {
      this.docInfoList[this.currentIndex]["showInput2"] = false;
      this.newSort = "";
    },
    changeCheckFile (item, index) {
      this.dialogFlieName = this.docInfoList[index].name;
      if (this.checkFiles) {
        this.docInfoList[index].checkFiles = !this.docInfoList[index]
          .checkFiles;
        this.$forceUpdate();
      }
    },
    setName (node, data) {
      var that = this;
      var name = document.getElementById(node.id + "Name").value;

      if (!name) {
        that.$message.error("请输入名称!");
        return false;
      }
      //知识管理夹
      that
        .$post("/epf-document/admin/docfolder/save", {
          folderName: name,
          pId: this.parentdata.id,
          folderType: "1",
        })
        .then((res) => {
          if (res.code != 0) {
            that.$message.error("保存失败!");
            return false;
          }
          that.$message.success("保存成功!");
          that.loadTree();
        });
    },
    mouseIn (id, index) {
      document.querySelectorAll(".carditem")[
        this.currentFileIndex
      ].style.border = "1px solid #fff";
    },
    mouseOut (id, index) {
      // document.querySelectorAll('.carditem')[this.currentFileIndex].style.border = '1px solid #fff'
    },

    handleCurrentChange (val) {
      //获取当前页
      this.pageNo = val;
      this.searchInfo["page"] = this.pageNo;
      this.searchInfo["rows"] = this.pageSize;
      this.searchInfo["folderId"] = this.folderId;
      this.getDocList(this.searchInfo);

      const _this = this;
      const erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById("knowledge"), element => {
        _this.$nextTick(() => {
          setTimeout(() => {
            //监听到事件后执行的业务逻辑
            this.treeHeight = this.$refs.ggBOX.offsetHeight - 276;
          }, 500);
        });
      });
    },
    /*
      <el-button
          style="font-size: 16px;padding:0px;color:#409EFF;"
          type="text"
          on-click={() => this.append(node, data)}
        >
        <i class="el-icon-circle-plus-outline" />
            </el-button>
            <el-button
          style="font-size: 16px;color:#F56C6C;"
          type="text"
          on-click={() => this.remove(node, data)}
        >
        <i class="el-icon-delete" />
            </el-button>
    */
    renderContent (h, { node, data, store }) {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (node.label) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span
              on-click={() => this.getdocInfos(node, data)}
              style="display: inline-block;width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              title={node.label}>
              {node.label}
            </span>

            <span>
              <el-button
                style="font-size: 16px;padding:0px;color:#1587DB;"
                type="text"
                on-click={() => this.editDocu(node, data)}
              >
                <i class="el-icon-edit-outline" />
              </el-button>
              <el-button
                style="font-size: 16px;padding:0px;color:#409EFF;"
                type="text"
                on-click={() => this.append(node, data)}
              >
                <i class="el-icon-circle-plus-outline" />
              </el-button>
              <el-button
                style="font-size: 16px;color:#F56C6C;"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                <i class="el-icon-delete" />
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span>
              <input
                id={node.id + "Name"}
                type="text"
                style="max-width:80px;"
                placeholder="请输入名称"
                autofocus
              />
            </span>
            <span>

              <el-button
                style="font-size: 16px;padding:0px;color:#53c106;"
                type="text"
                on-click={() => this.setName(node, data)}
              >
                <i class="el-icon-success" />
              </el-button>
              <el-button
                style="font-size: 16px;color:#F56C6C;"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                <i class="el-icon-delete" />
              </el-button>
            </span>
          </span>
        );
      }
    },
    rightClick (id, fdId, index, item) {
      if (this.checkFiles) {
        sessionStorage.setItem("docMenu", "true");
        return;
      }
      sessionStorage.setItem("docMenu", "false");
      this.currentData = item;
      this.currentId = id;
      this.fdId = fdId;
      if (index != this.currentFileIndex) {
        document.querySelectorAll(".carditem")[
          this.currentFileIndex
        ].style.border = "1px solid #fff";
      }
      this.currentFileIndex = index;
      document.querySelectorAll(".carditem")[index].style.border =
        "1px solid #409eff";
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      var orgId = draggingNode.data.id;
      var pId = "";
      if (dropType == "inner") {
        pId = dropNode.data.id;
      } else {
        pId = dropNode.data.pId;
      }

      var paramsData = { id: orgId, pId: pId };
      this.$post("/epf-document/admin/docfolder/save", paramsData).then(
        (res) => {
          if (res.code == 0) {
            this.$message.success("保存成功！");
          } else {
            this.$message.warning(res.msg);
          }
          this.loadTree();
        }
      );
    },
    //退出全屏
    exitFullScreen (el) {
      var el = document,
        cfs =
          el.cancelFullScreen ||
          el.webkitCancelFullScreen ||
          el.mozCancelFullScreen ||
          el.exitFullScreen,
        wscript;

      if (typeof cfs !== "undefined" && cfs) {
        cfs.call(el);

        return;
      }

      if (typeof window.ActiveXObject !== "undefined") {
        wscript = new ActiveXObject("WScript.Shell");

        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
  },
  watch: {
    // $route: function (to, from) {
    //   if (from.name == "libraryManage") {
    //     this.loadTree();
    //     // this.getDocList(this.searchInfo);
    //   }
    // },
    pageNo (val) {
      this.$refs.tableScrollbar.wrap.scrollTop = 0
    },
    pageSize (val) {
      this.$refs.tableScrollbar.wrap.scrollTop = 0
    }
  },
  filters: {
    numFilterScan (value) {
      let realVal = ''
      if (value !== "") {
        // 截取当前数据到小数点后三位
        realVal = parseFloat(parseInt(Number(value))).toFixed(2)
        // realVal = tempVal.substring(0, tempVal.length - 1)
      } else {
        realVal = '--'
      }
      return realVal
    }
  },
  mounted () {
    const _this = this;
    const erd = elementResizeDetectorMaker();
    erd.listenTo(document.getElementById("knowledge"), element => {
      _this.$nextTick(() => {
        setTimeout(() => {
          //监听到事件后执行的业务逻辑
          this.treeHeight = this.$refs.ggBOX.offsetHeight - 276;
        }, 500);
      });
    });
    this.$bus.$on('toLength1', val => {
      this.totlecorde = val
      this.loadTree()
    })
  },
  beforeDestroy () {
    this.$bus.$off('toLength1');
  },
  // mounted() {
  //   this.$bus.$on('refreshNum', res => {
  //     this.$nextTick(() => {
  //         console.log(res)
  //     this.loadTree();
  //     this.getDocList(res);
  //       })

  //   })
  // }
};
</script>
<style scoped>
.page-body {
  width: 100%;
  padding: 16px 24px;
  background-color: #f6f6f6;
}
.el-container {
  height: 300px;
  overflow: auto;
}
.headerpop {
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: bold;

  line-height: 30px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 120px;
  border-radius: 10px;
  height: 120px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.box-body {
  width: 100%;
  overflow: auto;
}
.pageName {
  padding-left: 15px;
  margin-bottom: 15px;
  border-left: 4px solid rgba(26, 188, 156, 6);
}
.toolsTitleBox {
  height: 55px;
  line-height: 55px;
  background: rgba(211, 211, 211, 0.1);
  color: #606266;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #ebeef5;
}
.oper {
  float: right;
  font-weight: normal;
}
.oper span {
  display: inline-block;
}
.toolsTitle {
  line-height: 40px;
  font-size: 12px;
  margin-left: 25px;
}
.toolsTips {
  line-height: 40px;
  font-size: 14px;
  margin-left: 10px;
  color: red;
}
.switchHeight_box {
  width: 100%;
  min-height: 120px;
  max-height: 120px;
  box-sizing: border-box;
  padding: 20px 24px;
  margin-bottom: 16px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.filter_title {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-right: 10px;
  text-align: right;
  line-height: 34px;
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  border: 0px solid transparent;
}
.monad {
  display: block;
  width: 48px;
  position: absolute;
  top: 7px;
  left: 5px;
}
.primary {
  width: 88px;
  height: 34px;
  background-color: #ffa000;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 36px;
  display: inline-block;
  cursor: pointer;
  margin-left: 15px;
}
.flexibleSwitch {
  display: block;
  float: right;
  color: #4472d5;
  cursor: pointer;
}

.carditem {
  width: 150px;
  height: 170px;
  margin: 5px 5px;
  position: relative;
  padding: 5px;
  border-radius: 6px;
  cursor: default;
  transition: 0.4s;
  border: 1px solid #fff;
  z-index: 99 !important;
  display: inline-block;
  float: none !important;
}
.carditem:hover {
  box-shadow: 0px 5px 10px rgb(134, 134, 134);
  border: 1px solid rgb(211, 211, 211);
}
.docImgBox {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 90px;
  background: rgb(255, 255, 255);
  cursor: pointer;
}
.docImgBox > img {
  object-fit: contain;
  width: 100%;
  height: 90px;
  display: block;
}
.Dangerg {
  width: 140px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.Dangergtn {
  color: #fff;
  background: #f56c6c;
}
.checkBox {
  position: absolute;
  top: 2px;
  left: 2px;
}
.check {
  padding: 0 3px;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 50%;
  background: rgba(240, 240, 240, 0.774);
}
.checked {
  padding: 0 3px;
  border: 1px solid rgb(88, 150, 57);
  border-radius: 50%;
  background: #67c23a;
}
.check i {
  font-size: 10px;
  color: rgb(153, 153, 153);
}
.checked i {
  font-size: 10px;
  color: #fff;
}
.dowld {
  color: #000;
  background: rgb(241, 245, 248);
}

.cardbottom {
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  width: 100%;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(85, 85, 85);
  transition: 0.4s;
  margin-top: 6px;
}
.cardbottomInput {
  margin-top: 8px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.cardbottomInput input {
  display: inline-block;
  box-sizing: border-box;
  width: 90px;
  height: 25px;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 3px;
  padding: 0 3px;
}
.carditem:hover {
  /* border: 1px solid rgb(211, 211, 211); */
}
.carditem:hover .cardbottom {
  color: #409eff;
}
.m_title {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 10px;
  background: #fff;
  color: rgb(50, 58, 64);
  font-size: 16px;
  /* border-bottom: 1px solid rgb(224, 224, 224); */
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  border: 0px solid transparent;
}
.el-tree > div {
  margin: 5px 0;
}
.iconList {
  height: 300px;
  background: rgb(255, 213, 213);
  overflow-y: auto;
}
.primary_search {
  width: 96px;
  height: 40px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.main-table {
  min-height: 654px;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
  padding-bottom: 80px;
  position: relative;
}
.form-button {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-button .button_qian,
.form-button .button_shen {
  margin-left: 0px;
}
</style>
<style scoped>
/* .orgManange_List .el-tree-node__content {
  margin-bottom: 5px;
} */
.default,
.error,
.success {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: relative;
  top: 1px;
  right: 5px;
}
.default {
  background: #b6b6b6;
  border: 2px solid #cfcfcf;
}
.error {
  background: #fd4041;
  border: 2px solid #ff6c6f;
}
.success {
  background: #92b62d;
  border: 2px solid #bfd482;
}
.filter_wrap {
  width: 100%;
}
.filter_wrap .el-input--small .el-input__inner {
  height: 34px;
}
.filter_wrap .el-row {
  margin-bottom: 0 !important;
}
.filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  padding: 0 10px;
}

.filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 30px;
  color: #8dc4f7;
}
.filter_wrap .el-input__prefix,
.el-input__suffix {
  width: 25px;
  font-size: 16px;
  right: 8px;
}
.el-table th,
.el-table tr {
  /* border:1px solid #ebeef5; */
}
.el-table__body tr td:nth-child(2) .cell {
  color: rgb(70, 113, 213);
}
.el-table__body tr td:nth-child(2) .cell .cell_click {
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: relative;
}
.docuImg {
  width: 40px;
  height: 40px;
  /* border: 1px solid #ddd; */
  margin-right: 10px;
  display: inline-block;
}
.docuImg img {
  border-radius: 4px;
  width: 100%;
  height: 100%;
}
.ellipsis {
  position: absolute;
  top: 0;
  left: 50px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.filter_wrap >>> .el-table.el-table--fit .cell {
  line-height: 22px !important;
}

.el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
.usemngtable {
  width: 100%;
}
.usemngtable td {
  border: 1px solid #b6b6b6;
  line-height: 28px;
}
.knowledgeRight {
  display: flex;
  min-height: 691px;
  flex-direction: column;
  justify-content: space-between;
}
.includ {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid rgb(224, 224, 224); */
  background: #fff;
}
.includ img {
  width: 100%;
  height: 100%;
}
.includ span {
  font-size: 20px;
  padding-right: 5px;
}
.knowledgeRight .el-row {
  padding: 5px 16px;
  /* border-right: 1px solid rgb(224, 224, 224);
    border-bottom: 1px solid rgb(224, 224, 224);
    border-left: 1px solid rgb(224, 224, 224); */
  background: #fff;
}
.knowledgeRight .el-row div {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.knowledgeRight .el-row div span {
  padding-left: 5%;
}
.search {
  position: relative;
}
.switchHeight_box .search i {
  position: absolute !important;
  left: 0 !important;
}
.search .el-button:focus,
.search .el-button:hover {
  color: #409eff;
  border-color: transparent;
  background-color: transparent;
}
.searchIpt {
  position: relative;
}
.searchIpt i {
  background-color: #409eff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 8%;
  left: -18%;
}
.searchIpt input {
  padding-left: 30px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 5px;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
/* .collection .el-dialog {
  width: 30%;
} */
.choice {
  position: relative;
}
.choice p {
  display: flex;
  justify-content: space-between;
}
.choice p span {
  color: #409eff;
  letter-spacing: 1px;
  cursor: pointer;
}
.choice .el-select {
  display: block;
}
/* 标签 */
.tabs {
  border-left: 0px solid #ebeef5;
  border-right: 0px solid #ebeef5;
  padding-left: 0;
  line-height: 40px;
}
.tabs span {
  cursor: pointer;
}
.tabs .blu {
  color: #1587db;
}
.tabs i {
  margin: 0 5px;
}
.tabs .blac {
  color: #aeaeae;
}
.el-button--danger {
  border-color: transparent !important;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 40%;
  /* margin-top: 7%; */
}
.rightButton div {
  margin-left: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.knowledgeRight .el-aside {
  width: 296px;
  min-width: 296px;
  max-width: 296px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(153, 153, 153, 0.3);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.knowledgeRight .doc-left-title {
  height: 50px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eeeeee;
}
.knowledgeRight .doc-left-title span:nth-child(1) {
  font-weight: 600;
  color: #202020;
  font-size: 18px;
}
.knowledgeRight .doc-left-title span:nth-child(2) {
  color: #2d97f9;
  font-size: 14px;
  cursor: pointer;
}
.tree-flow {
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.tree-flow::-webkit-scrollbar {
  display: none;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style>
.knowledgeRight .el-tree-node .el-tree-node__content {
  height: 40px;
}
.knowledgeRight .el-tree-node .el-tree-node__content .custom-tree-node {
  height: 40px;
}
.bianjiDialog .el-dialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.bianjiDialog .el-dialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.bianjiDialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.bianjiDialog
  .el-dialog
  .el-dialog__header
  .el-dialog__headerbtn
  .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.bianjiDialog .el-dialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.bianjiDialog .el-dialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bianjiDialog .el-dialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bianjiDialog .el-dialog .button_qian,
.bianjiDialog .el-dialog .button_shen {
  margin-left: 0px;
}
.bianjiDialog .el-dialog .el-button {
  font-size: 14px;
}
.bianjiDialog .el-dialog .el-tag {
  font-size: 14px;
}
.shoucangDialog .el-dialog .el-dialog__header {
  padding: 0px 16px;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.shoucangDialog .el-dialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.shoucangDialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.shoucangDialog
  .el-dialog
  .el-dialog__header
  .el-dialog__headerbtn
  .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.shoucangDialog .el-dialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.shoucangDialog .el-dialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shoucangDialog .el-dialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shoucangDialog .el-dialog .button_qian,
.shoucangDialog .el-dialog .button_shen {
  margin-left: 0px;
}
.shoucangDialog .el-button {
  height: 40px;
  padding: 0px 32px;
  background: rgba(27, 116, 238, 1);
  border-radius: 2px;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  cursor: pointer;
}
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.el-popover {
  left: 1240px!important;
}
</style>
