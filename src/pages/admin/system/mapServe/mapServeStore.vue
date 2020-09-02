<template>
  <!-- <div>地图服务仓库列表</div> -->
  <div class="page-body EPF-table"
       id="serveBody">
    <div style="height:100%;">
      <!-- <el-scrollbar> -->
      <div class="filter_wrap">
        <div class="switchHeight_box">
          <el-row style="margin-bottom:20px;">
            <el-col :span="8"
                    class="filter_title_box">
              <span class="filter_title__custom_five">搜索关键词：</span>
              <el-input v-model="filterData.serviceName"
                        size="small"
                        placeholder="请输入搜索关键词"
                        style="width:calc(100% - 140px);"
                        :maxlength="50"></el-input>
            </el-col>
            <el-col :span="10"
                    class="filter_title_box">
              <span class="filter_title__custom">覆盖区域：</span>
              <div style="width:calc(100% - 120px);height:40px;display:flex;justify-content: flex-start;align-items: center;">
                <div style="width:33.3%;float:left;margin-right:10px;">
                  <el-select v-model="filterData.cantonProvinceName"
                             size="small"
                             placeholder="全部"
                             @change="provinceSelect0(dictionary.administrative_regions,filterData.cantonProvinceName,$event)">
                    <el-option v-for="(item,index) in dictionary.administrative_regions"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </div>
                <div style="width:33.3%;float:left;margin:0 5px;">
                  <el-select v-model="filterData.cantonCityName"
                             size="small"
                             placeholder="全部"
                             @change="citySelect0(dictionary.cantonCity,filterData.cantonCityName,$event)"
                             @focus="provinceSelect0(dictionary.administrative_regions,filterData.cantonProvinceName,$event)">
                    <el-option v-for="(item,index) in dictionary.cantonCity"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </div>
                <div style="width:33.3%;float:left;margin-left:10px;">
                  <el-select v-model="filterData.cantonAreaName"
                             size="small"
                             placeholder="全部"
                             @change="areaSelect0(dictionary.cantonArea,filterData.cantonAreaName,$event)">
                    <el-option v-for="(item,index) in dictionary.cantonArea"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="6"
                    class="filter_title_box">
              <span class="filter_title__custom">来源单位：</span>
              <el-cascader placeholder="全部"
                           expand-trigger="hover"
                           :options="orgdata"
                           :show-all-levels="false"
                           v-model="slectdefallF"
                           :change-on-select="true"
                           @change="handleChange"
                           style="width:calc(100% - 90px);"></el-cascader>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:0px;">
            <el-col :span="8"
                    class="filter_title_box">
              <span class="filter_title__custom_five"
                    style="padding-left:48px;">状态：</span>
              <el-select size="small"
                         v-model="filterData.serviceStatus"
                         placeholder="全部"
                         style="width:calc(100% - 140px);">
                <el-option label="正常"
                           value="0"></el-option>
                <el-option label="异常"
                           value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <div style="width:100%;height:40px;"></div>
            </el-col>
            <el-col :span="4"
                    style="display:flex;justify-content:flex-end;">
              <div class="primary_reset"
                   @click="resetFilter()">重置</div>
              <div class="primary_search"
                   @click="searchList()">搜索</div>
            </el-col>
          </el-row>
        </div>
        <el-tabs style="margin-top:32px;">
          <div class="toolsTitleBox_list">
            <span class="toolsTitle_list">地图服务信息</span>
            <div class="primary_oper"
                 @click="addMapServe('addForm')">添加</div>
          </div>

          <el-table ref="multipleTable"
                    stripe
                    :data="mapData"
                    v-loading="loading"
                    element-loading-text="数据加载中"
                    element-loading-background="rgba(255, 255, 255,0.95)"
                    style="width: 100%;min-height:100px;"
                    border>
            <el-table-column prop="serviceCode"
                             label="服务编号"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column prop="dataName"
                             label="数据名称"
                             min-width="200"
                             align="center"></el-table-column>
            <el-table-column prop="serviceName"
                             label="服务名称"
                             min-width="240"
                             align="center"></el-table-column>
            <el-table-column prop="sourceUnit"
                             label="来源单位"
                             min-width="280"
                             align="center"></el-table-column>
            <el-table-column prop="coverageAreaName"
                             label="覆盖区域"
                             min-width="150"
                             align="center"></el-table-column>
            <el-table-column label="服务类型"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
                <el-button size="small"
                           type="primary"
                           plain
                           v-if="scope.row.serviceType=='wmts'">WMTS</el-button>
                <el-button size="small"
                           type="primary"
                           plain
                           v-if="scope.row.serviceType=='feature'">FEATURE</el-button>
                <el-button size="small"
                           type="primary"
                           plain
                           v-if="scope.row.serviceType=='image'">IMAGE</el-button>
                <el-button size="small"
                           type="primary"
                           plain
                           v-if="scope.row.serviceType=='tiled'">TILED</el-button>
              </template>
            </el-table-column>
            <el-table-column label="服务URL"
                             min-width="300"
                             align="center">
              <template slot-scope="scope">
                <a href="javascript:void(0);"
                   @click="handleServiceUrlClick(scope.row.url)">{{scope.row.url}}</a>
              </template>
            </el-table-column>
            <el-table-column label="服务状态"
                             min-width="150"
                             align="center">
              <template slot-scope="scope">
                <el-button size="small"
                           type="success"
                           plain
                           v-if="scope.row.serviceStatus==0">正常</el-button>
                <el-button size="small"
                           type="danger"
                           plain
                           v-if="scope.row.serviceStatus==1">异常</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             min-width="200"
                             fixed="right"
                             align="center">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           @click="handelClickPreview(scope.row)">预览</el-button>
                <el-button type="text"
                           size="small"
                           @click="handelClickCheck(scope.row)">查看</el-button>
                <el-button type="text"
                           size="small"
                           @click="handelClickEdit(scope.row)">编辑</el-button>
                <el-button type="text"
                           size="small"
                           @click="handelClickDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div style="text-align:right;margin:22px 0px;">
            <el-pagination background
                           layout="total,prev, pager, next,sizes,jumper"
                           :page-sizes="[5,10,15,20]"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :total="totalRecord"
                           :current-page.sync="currentPage"
                           :page-size="pageSize"></el-pagination>
          </div>
        </el-tabs>

        <!-- 添加地图服务弹窗 -->
        <!-- <div v-if="addMapServeVisible"
           class="addMapServeDialog"> -->
        <el-dialog title="添加地图服务"
                   :visible.sync="addMapServeVisible"
                   width="40%"
                   :modal="true"
                   :close-on-click-modal="false"
                   :append-to-body="true"
                   class="mapDialog">
          <!-- <div>添加地图服务<i class="el-icon-circle-close"
             @click="addMapServeVisible = false"></i></div> -->

          <el-form :model="addForm"
                   :rules="rules"
                   ref="addForm"
                   label-width="120px">
            <el-form-item label="服务编号："
                          prop="serviceCode">
              <el-input v-model="addForm.serviceCode"
                        :maxlength="35"
                        placeholder="请输入地图服务编号"></el-input>
            </el-form-item>
            <el-form-item label="数据名称："
                          prop="dataName">
              <el-input v-model="addForm.dataName"
                        :maxlength="35"
                        placeholder="请输入地图数据名称"></el-input>
            </el-form-item>
            <el-form-item label="服务名称："
                          prop="serviceName">
              <el-input v-model="addForm.serviceName"
                        :maxlength="35"
                        placeholder="请输入地图服务名称"></el-input>
            </el-form-item>
            <el-form-item label="服务简介："
                          prop="remarks">
              <el-input v-model="addForm.remarks"
                        :maxlength="200"
                        placeholder="请输入地图服务简介信息"></el-input>
            </el-form-item>
            <el-form-item label="服务URL："
                          prop="url">
              <el-input v-model="addForm.url"
                        :maxlength="100"
                        placeholder="请输入地图服务URL"></el-input>
            </el-form-item>
            <el-form-item label="服务类型："
                          prop="serviceType">
              <el-select v-model="addForm.serviceType"
                         placeholder="请选择地图服务类型"
                         @change="serviceTypeSelect(dictionary.service_type,addForm.serviceType,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.service_type"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="覆盖区域："
                          prop="cantonProvinceName"
                          ref="coverageAreaForm">
              <el-row>
                <el-col :span="8">
                  <el-form-item>
                    <el-select v-model="addForm.cantonProvinceName"
                               placeholder="请选择"
                               @change="provinceSelect(dictionary.administrative_regions,addForm.cantonProvinceName,$event)"
                               style="width:100%;padding-right:10px;"
                               ref="cantonProvinceName">
                      <el-option v-for="(item,index) in dictionary.administrative_regions"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-select v-model="addForm.cantonCityName"
                             placeholder="请选择"
                             @change="citySelect(dictionary.cantonCity,addForm.cantonCityName,$event)"
                             style="width:100%;padding:0 5px"
                             ref="cantonCityName">
                    <el-option v-for="(item,index) in dictionary.cantonCity"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="addForm.cantonAreaName"
                             placeholder="请选择"
                             @change="areaSelect(dictionary.cantonArea,addForm.cantonAreaName,$event)"
                             style="width:100%;padding-left:10px;"
                             ref="cantonAreaName">
                    <el-option v-for="(item,index) in dictionary.cantonArea"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="服务范围："
                          prop="longitudeLeft">
              <el-form-item label="XMin：">
                <el-input v-model="addForm.longitudeLeft"
                          placeholder="请输入XMin值"
                          ref="longitudeLeft"
                          @blur="getBlurData"
                          @input="addForm.longitudeLeft = addForm.longitudeLeft.replace(/[^\d\.]/g,'')"
                          style="margin-bottom:10px;"
                          :maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="YMin：">
                <el-input v-model="addForm.latitudeLeft"
                          placeholder="请输入YMin值"
                          ref="latitudeLeft"
                          @blur="getBlurData"
                          @input="addForm.latitudeLeft = addForm.latitudeLeft.replace(/[^\d\.]/g,'')"
                          style="margin-bottom:10px;"
                          :maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="XMax：">
                <el-input v-model="addForm.longitudeRight"
                          placeholder="请输入XMax值"
                          ref="longitudeRight"
                          @blur="getBlurData"
                          @input="addForm.longitudeRight = addForm.longitudeRight.replace(/[^\d\.]/g,'')"
                          style="margin-bottom:10px;"
                          :maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="YMax：">
                <el-input v-model="addForm.latitudeRight"
                          placeholder="请输入YMax值"
                          ref="latitudeRight"
                          @input="addForm.latitudeRight = addForm.latitudeRight.replace(/[^\d\.]/g,'')"
                          @blur="getBlurData"
                          :maxlength="30"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="空间参考："
                          prop="spaceRefer">
              <el-select v-model="addForm.spaceRefer"
                         placeholder="请选择空间参考(WKID)"
                         @change="spaceReferSelect(dictionary.space_refer,addForm.spaceRefer,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.space_refer"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="坐标系："
                          prop="coordinateSys">
              <el-select v-model="addForm.coordinateSys"
                         placeholder="请选择坐标系"
                         @change="coordinateSysSelect(dictionary.coordinate_sys,addForm.coordinateSys,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.coordinate_sys"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投影类型："
                          prop="projectionType">
              <el-select v-model="addForm.projectionType"
                         placeholder="请选择投影类型"
                         @change="projectionTypeSelect(dictionary.projection_type,addForm.projectionType,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.projection_type"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源单位："
                          prop="sourceUnit">
              <el-cascader expand-trigger="hover"
                           :options="orgdata"
                           :show-all-levels="false"
                           v-model="slectdefall"
                           :change-on-select="true"
                           @change="handleChangeAdd"
                           placeholder="请选择来源单位"
                           style="width:100%;"></el-cascader>
            </el-form-item>

            <el-form-item label="更新周期："
                          prop="updateCycle">
              <el-select v-model="addForm.updateCycle"
                         placeholder="请选择更新周期"
                         @change="updateCycleSelect(dictionary.update_cycle,addForm.updateCycle,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.update_cycle"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div class="dialogFooter">
            <!-- <el-button class="button_bg"
                       @click="nextAdd('addForm')">下一步</el-button>

            <el-button class="button_default"
                       type="primary"
                       @click="addMapServeVisible = false">取消</el-button> -->

            <div class="button_qian"
                 @click="addMapServeVisible = false">取消</div>
            <div style="width:96px;height:40px;"></div>
            <div class="button_shen"
                 @click="nextAdd('addForm')">下一步</div>
          </div>
        </el-dialog>
        <!-- </div> -->
        <!-- 添加地图图层弹窗 -->
        <el-dialog title="添加图层"
                   :visible.sync="nextAddMapServeVisible"
                   width="40%"
                   :modal="true"
                   :close-on-click-modal="false"
                   :append-to-body="true"
                   class="mapDialog-other">
          <el-form :model="addForm.mapLayerArray"
                   ref="addForm.mapLayerArray"
                   label-width="120px">
            <div class="coverageBox"
                 v-for="(item,index) in addForm.mapLayerArray"
                 :key="index">
              <div class="coverageTitleBox"
                   @click="flexSwitch(index)">
                <span class="coverageTitle">图层{{index+1}}</span>

                <span class="flexibleSwitch">
                  <i :class="item.isOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
                </span>
              </div>
              <div v-if="item.isOpen==true">
                <el-form-item label="图层名称："
                              style="margin-top: 20px;">
                  <el-input v-model="addForm.mapLayerArray[index].layerName"
                            placeholder="请输入图层名称"
                            :maxlength="35"></el-input>
                </el-form-item>
                <el-form-item label="图层URL：">
                  <el-input v-model="addForm.mapLayerArray[index].url"
                            placeholder="请输入图层URL"
                            :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="图层简介：">
                  <el-input v-model="addForm.mapLayerArray[index].remarks"
                            placeholder="请输入图层简介"
                            :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item label="覆盖范围：">
                  <div style="width:33.3%;float:left;padding-right:10px;">
                    <el-select v-model="addForm.mapLayerArray[index].cantonProvinceName"
                               placeholder="请选择"
                               @change="provinceSelectLayer(dictionary.administrative_regions,addForm.mapLayerArray[index].cantonProvinceName,$event,index)">
                      <el-option v-for="(item,index) in dictionary.administrative_regions"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="index"></el-option>
                    </el-select>
                  </div>
                  <div style="width:33.3%;float:left;padding:0 5px;">
                    <el-select v-model="addForm.mapLayerArray[index].cantonCityName"
                               placeholder="请选择"
                               @change="citySelectLayer(dictionary.cantonCity,addForm.mapLayerArray[index].cantonCityName,$event,index)">
                      <el-option v-for="(item,index) in dictionary.cantonCity"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="index"></el-option>
                    </el-select>
                  </div>
                  <div style="width:33.3%;float:left;padding-left:10px;">
                    <el-select v-model="addForm.mapLayerArray[index].cantonAreaName"
                               placeholder="请选择"
                               @change="areaSelectLayer(dictionary.cantonArea,addForm.mapLayerArray[index].cantonAreaName,$event,index)">
                      <el-option v-for="(item,index) in dictionary.cantonArea"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="index"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="服务范围：">
                  <el-form-item label="XMin：">
                    <el-input v-model="addForm.mapLayerArray[index].longitudeLeft"
                              placeholder="请输入XMin值"
                              @input="addForm.mapLayerArray[index].longitudeLeft = addForm.mapLayerArray[index].longitudeLeft.replace(/[^\d\.]/g,'')"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="YMin：">
                    <el-input v-model="addForm.mapLayerArray[index].latitudeLeft"
                              placeholder="请输入YMin值"
                              @input="addForm.mapLayerArray[index].latitudeLeft = addForm.mapLayerArray[index].latitudeLeft.replace(/[^\d\.]/g,'')"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="XMax：">
                    <el-input v-model="addForm.mapLayerArray[index].longitudeRight"
                              placeholder="请输入XMax值"
                              @input="addForm.mapLayerArray[index].longitudeRight = addForm.mapLayerArray[index].longitudeRight.replace(/[^\d\.]/g,'')"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="YMax：">
                    <el-input v-model="addForm.mapLayerArray[index].latitudeRight"
                              @input="addForm.mapLayerArray[index].latitudeRight = addForm.mapLayerArray[index].latitudeRight.replace(/[^\d\.]/g,'')"
                              placeholder="请输入YMax值"
                              :maxlength="30"></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="空间参考：">
                  <el-select v-model="addForm.mapLayerArray[index].spaceRefer"
                             placeholder="请选择空间参考(WKID)"
                             @change="spaceReferSelect(dictionary.space_refer,addForm.spaceRefer,$event)"
                             style="width:100%;">
                    <el-option v-for="(item,index) in dictionary.space_refer"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="坐标系：">
                  <el-select v-model="addForm.mapLayerArray[index].coordinateSys"
                             placeholder="请选择坐标系"
                             @change="coordinateSysSelect(dictionary.coordinate_sys,addForm.coordinateSys,$event)"
                             style="width:100%;">
                    <el-option v-for="(item,index) in dictionary.coordinate_sys"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="投影类型：">
                  <el-select v-model="addForm.mapLayerArray[index].projectionType"
                             placeholder="请选择投影类型"
                             @change="projectionTypeSelect(dictionary.projection_type,addForm.projectionType,$event)"
                             style="width:100%;">
                    <el-option v-for="(item,index) in dictionary.projection_type"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="loaderBox">
            <span @click="addMapcoverage">
              <i class="el-icon-circle-plus-outline"></i>点击添加更多图层
            </span>
          </div>

          <div class="dialogFooter">
            <!-- <el-button class="button_bg"
                       @click="submitAdd('addForm.mapLayerArray')">保存</el-button>

            <el-button class="button_default"
                       type="primary"
                       @click="nextAddMapServeVisible = false">取消</el-button> -->

            <div class="button_qian"
                 @click="nextAddMapServeVisible = false">取消</div>
            <div style="width:96px;height:40px;"></div>
            <div class="button_shen"
                 @click="submitAdd('addForm.mapLayerArray')">保存</div>
          </div>
        </el-dialog>

        <!-- 查看地图服务弹窗 -->
        <el-dialog title="查看地图服务信息"
                   :visible.sync="checkMapServeVisible"
                   width="40%"
                   :modal="true"
                   :close-on-click-modal="false"
                   :append-to-body="true"
                   class="mapDialog-other">
          <el-form :model="checkForm"
                   ref="checkForm"
                   label-width="120px">
            <div class="coverageBox">
              <div class="coverageTitleBox"
                   @click="flexServeSwitch">
                <span class="coverageTitle"
                      style="width:120px;">服务信息</span>

                <span class="flexibleSwitch">
                  <i :class="this.isOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
                </span>
              </div>
              <div v-if="this.isOpen==true">
                <el-form-item label="服务编号："
                              style="margin-top: 20px;color:#1D7CE4;">
                  <el-input v-model="checkForm.serviceCode"
                            :disabled="true"
                            :maxlength="35"></el-input>
                </el-form-item>
                <el-form-item label="数据名称：">
                  <el-input v-model="checkForm.dataName"
                            :disabled="true"
                            :maxlength="35"></el-input>
                </el-form-item>
                <el-form-item label="服务名称：">
                  <el-input v-model="checkForm.serviceName"
                            :disabled="true"
                            :maxlength="35"></el-input>
                </el-form-item>
                <el-form-item label="服务简介：">
                  <el-input v-model="checkForm.remarks"
                            :disabled="true"
                            :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item label="服务URL：">
                  <el-input v-model="checkForm.url"
                            :disabled="true"
                            :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="服务类型：">
                  <el-input v-model="checkForm.serviceType"
                            :disabled="true"
                            :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="覆盖区域：">
                  <el-input v-model="checkForm.coverageAreaName"
                            :disabled="true"
                            :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="服务范围：">
                  <el-form-item label="XMin：">
                    <el-input v-model="checkForm.longitudeLeft"
                              :disabled="true"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="YMin：">
                    <el-input v-model="checkForm.latitudeLeft"
                              :disabled="true"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="XMax：">
                    <el-input v-model="checkForm.longitudeRight"
                              :disabled="true"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="YMax：">
                    <el-input v-model="checkForm.latitudeRight"
                              :disabled="true"
                              :maxlength="30"></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="空间参考：">
                  <el-input v-model="checkForm.spaceRefer"
                            :disabled="true"
                            :maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="坐标系：">
                  <el-input v-model="checkForm.coordinateSys"
                            :disabled="true"
                            :maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="投影类型：">
                  <el-input v-model="checkForm.projectionType"
                            :disabled="true"
                            :maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="来源单位：">
                  <el-input v-model="checkForm.sourceUnitName"
                            :disabled="true"
                            :maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="更新周期：">
                  <el-input v-model="checkForm.updateCycle"
                            :disabled="true"
                            :maxlength="30"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="coverageBox"
                 v-for="(item,index) in coverageList"
                 :key="index">
              <div class="coverageTitleBox"
                   @click="checkflexSwitch(index)">
                <span class="coverageTitle">图层{{index+1}}</span>

                <span class="flexibleSwitch">
                  <i :class="item.isOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
                </span>
              </div>
              <div v-if="item.isOpen==true">
                <el-form-item label="图层名称："
                              style="margin-top: 20px;">
                  <el-input v-model="item.layerName"
                            :disabled="true"
                            :maxlength="35"></el-input>
                </el-form-item>
                <el-form-item label="图层URL：">
                  <el-input v-model="item.url"
                            :disabled="true"
                            :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="图层简介：">
                  <el-input v-model="item.remarks"
                            :disabled="true"
                            :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item label="覆盖范围：">
                  <el-input v-model="item.coverageAreaName"
                            :disabled="true"
                            :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="服务范围：">
                  <el-form-item label="XMin：">
                    <el-input v-model="item.longitudeLeft"
                              :disabled="true"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="YMin：">
                    <el-input v-model="item.latitudeLeft"
                              :disabled="true"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="XMax：">
                    <el-input v-model="item.longitudeRight"
                              :disabled="true"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="YMax：">
                    <el-input v-model="item.latitudeRight"
                              :disabled="true"
                              :maxlength="30"></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="空间参考：">
                  <el-input v-model="item.spaceRefer"
                            :disabled="true"
                            :maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="坐标系：">
                  <el-input v-model="item.coordinateSys"
                            :disabled="true"
                            :maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="投影类型：">
                  <el-input v-model="item.projectionType"
                            :disabled="true"
                            :maxlength="30"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>

          <div class="dialogFooter">
            <!-- <el-button class="button_default"
                       type="primary"
                       @click="checkMapServeVisible = false">取消</el-button> -->
            <div class="button_qian"
                 @click="checkMapServeVisible = false">取消</div>
          </div>
        </el-dialog>

        <!-- 修改地图服务弹窗 -->
        <el-dialog title="修改地图服务信息"
                   :visible.sync="editMapServeVisible"
                   width="40%"
                   :modal="true"
                   :close-on-click-modal="false"
                   :append-to-body="true"
                   class="mapDialog">
          <el-form :model="editForm"
                   :rules="rules"
                   ref="editForm"
                   label-width="120px">
            <el-form-item label="服务编号："
                          prop="serviceCode">
              <el-input v-model="editForm.serviceCode"
                        placeholder="请输入地图服务编号"
                        :maxlength="35"></el-input>
            </el-form-item>
            <el-form-item label="数据名称："
                          prop="dataName">
              <el-input v-model="editForm.dataName"
                        placeholder="请输入地图数据名称"
                        :maxlength="35"></el-input>
            </el-form-item>
            <el-form-item label="服务名称："
                          prop="serviceName">
              <el-input v-model="editForm.serviceName"
                        placeholder="请输入地图服务名称"
                        :maxlength="35"></el-input>
            </el-form-item>
            <el-form-item label="服务简介："
                          prop="remarks">
              <el-input v-model="editForm.remarks"
                        placeholder="请输入地图服务简介信息"
                        :maxlength="200"></el-input>
            </el-form-item>
            <el-form-item label="服务URL："
                          prop="url">
              <el-input v-model="editForm.url"
                        placeholder="请输入地图服务URL"
                        :maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="服务类型："
                          prop="serviceType">
              <el-select v-model="editForm.serviceType"
                         placeholder="请选择地图服务类型"
                         @change="serviceTypeSelect(dictionary.service_type,addForm.serviceType,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.service_type"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="覆盖区域："
                          v-if="isEditArea==false"
                          prop="coverageAreaName">
              <el-input v-model="editForm.coverageAreaName"
                        @focus="turnSelectArea(event)"
                        style="margin-bottom:10px;"
                        :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="覆盖区域："
                          v-if="isEditArea==true">
              <el-row>
                <el-col :span="8">
                  <el-form-item>
                    <el-select v-model="editForm.cantonProvinceName"
                               placeholder="请选择"
                               @change="provinceSelectEdit(dictionary.administrative_regions,editForm.cantonProvinceName,$event)"
                               style="width:100%;padding-right:10px;">
                      <el-option v-for="(item,index) in dictionary.administrative_regions"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-select v-model="editForm.cantonCityName"
                             placeholder="请选择"
                             @change="citySelectEdit(dictionary.cantonCity,editForm.cantonCityName,$event)"
                             style="width:100%;padding:0 5px">
                    <el-option v-for="(item,index) in dictionary.cantonCity"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="editForm.cantonAreaName"
                             placeholder="请选择"
                             @change="areaSelectEdit(dictionary.cantonArea,editForm.cantonAreaName,$event)"
                             style="width:100%;padding-left:10px;">
                    <el-option v-for="(item,index) in dictionary.cantonArea"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="服务范围："
                          prop="longitudeLeft">
              <el-form-item label="XMin：">
                <el-input v-model="editForm.longitudeLeft"
                          placeholder="请输入XMin值"
                          ref="longitudeLeft"
                          @blur="getBlurData"
                          @input="editForm.longitudeLeft = editForm.longitudeLeft.replace(/[^\d\.]/g,'')"
                          style="margin-bottom:10px;"
                          :maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="YMin：">
                <el-input v-model="editForm.latitudeLeft"
                          placeholder="请输入YMin值"
                          ref="latitudeLeft"
                          @blur="getBlurData"
                          @input="editForm.latitudeLeft = editForm.latitudeLeft.replace(/[^\d\.]/g,'')"
                          style="margin-bottom:10px;"
                          :maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="XMax：">
                <el-input v-model="editForm.longitudeRight"
                          placeholder="请输入XMax值"
                          ref="longitudeRight"
                          @blur="getBlurData"
                          @input="editForm.longitudeRight = editForm.longitudeRight.replace(/[^\d\.]/g,'')"
                          style="margin-bottom:10px;"
                          :maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="YMax：">
                <el-input v-model="editForm.latitudeRight"
                          placeholder="请输入YMax值"
                          ref="latitudeRight"
                          @input="editForm.latitudeRight = editForm.latitudeRight.replace(/[^\d\.]/g,'')"
                          @blur="getBlurData"
                          :maxlength="30"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="空间参考："
                          prop="spaceRefer">
              <el-select v-model="editForm.spaceRefer"
                         placeholder="请选择空间参考(WKID)"
                         @change="spaceReferSelect(dictionary.space_refer,addForm.spaceRefer,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.space_refer"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="坐标系："
                          prop="coordinateSys">
              <el-select v-model="editForm.coordinateSys"
                         placeholder="请选择坐标系"
                         @change="coordinateSysSelect(dictionary.coordinate_sys,addForm.coordinateSys,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.coordinate_sys"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投影类型："
                          prop="projectionType">
              <el-select v-model="editForm.projectionType"
                         placeholder="请选择投影类型"
                         @change="projectionTypeSelect(dictionary.projection_type,addForm.projectionType,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.projection_type"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源单位："
                          prop="sourceUnit">
              <el-cascader expand-trigger="hover"
                           :options="orgdata"
                           :show-all-levels="false"
                           v-model="slectdefall"
                           :change-on-select="true"
                           @change="handleChangeEdit"
                           style="width:100%;"></el-cascader>
            </el-form-item>
            <el-form-item label="更新周期："
                          prop="updateCycle">
              <el-select v-model="editForm.updateCycle"
                         placeholder="请选择更新周期"
                         @change="updateCycleSelect(dictionary.update_cycle,addForm.updateCycle,$event)"
                         style="width:100%;">
                <el-option v-for="(item,index) in dictionary.update_cycle"
                           :ref="item.zhCn"
                           :id="item.id"
                           :dictKey="item.dictKey"
                           :label="item.zhCn"
                           :value="item.zhCn"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div class="dialogFooter">
            <!-- <el-button class="button_bg"
                       @click="nextEdit('editForm')">下一步</el-button>

            <el-button class="button_default"
                       type="primary"
                       @click="editMapServeVisible = false">取消</el-button> -->

            <div class="button_qian"
                 @click="editMapServeVisible = false">取消</div>
            <div style="width:96px;height:40px;"></div>
            <div class="button_shen"
                 @click="nextEdit('editForm')">下一步</div>
          </div>
        </el-dialog>

        <!-- 修改地图图层弹窗 -->
        <el-dialog title="修改图层信息"
                   :visible.sync="nextEditMapServeVisible"
                   width="40%"
                   :modal="true"
                   :close-on-click-modal="false"
                   :append-to-body="true"
                   class="mapDialog-other">
          <el-form :model="editForm.mapLayerVoList"
                   ref="editForm.mapLayerVoList"
                   label-width="120px">
            <div class="coverageBox"
                 v-for="(item,index) in editForm.mapLayerVoList"
                 :key="index">
              <div class="coverageTitleBox"
                   @click="flexSwitchEdit(index)">
                <span class="coverageTitle">图层{{index+1}}</span>

                <span class="flexibleSwitch">
                  <i :class="item.noOpen==false?'el-icon-caret-left':'el-icon-caret-bottom'"></i>
                </span>
              </div>
              <div v-if="item.noOpen==true">
                <el-form-item label="图层名称："
                              style="margin-top: 20px;">
                  <el-input v-model="editForm.mapLayerVoList[index].layerName"
                            placeholder="请输入图层名称"
                            :maxlength="35"></el-input>
                </el-form-item>
                <el-form-item label="图层URL：">
                  <el-input v-model="editForm.mapLayerVoList[index].url"
                            placeholder="请输入图层URL"
                            :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="图层简介：">
                  <el-input v-model="editForm.mapLayerVoList[index].remarks"
                            placeholder="请输入图层简介"
                            :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item label="覆盖范围："
                              v-if="isEditLayerArea==false">
                  <el-input v-model="editForm.mapLayerVoList[index].coverageAreaName"
                            @focus="turnSelectLayerArea(event)"
                            :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="覆盖范围："
                              v-if="isEditLayerArea==true">
                  <div style="width:33.3%;float:left;padding-right:10px;">
                    <el-select v-model="editForm.mapLayerVoList[index].cantonProvinceName"
                               placeholder="请选择"
                               @change="provinceSelectEditLayer(dictionary.administrative_regions,editForm.mapLayerVoList[index].cantonProvinceName,$event,index)">
                      <el-option v-for="(item,index) in dictionary.administrative_regions"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="index"></el-option>
                    </el-select>
                  </div>
                  <div style="width:33.3%;float:left;padding:0 5px;">
                    <el-select v-model="editForm.mapLayerVoList[index].cantonCityName"
                               placeholder="请选择"
                               @change="citySelectEditLayer(dictionary.cantonCity,editForm.mapLayerVoList[index].cantonCityName,$event,index)">
                      <el-option v-for="(item,index) in dictionary.cantonCity"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="index"></el-option>
                    </el-select>
                  </div>
                  <div style="width:33.3%;float:left;padding-left:10px;">
                    <el-select v-model="editForm.mapLayerVoList[index].cantonAreaName"
                               placeholder="请选择"
                               @change="areaSelectEditLayer(dictionary.cantonArea,editForm.mapLayerVoList[index].cantonAreaName,$event,index)">
                      <el-option v-for="(item,index) in dictionary.cantonArea"
                                 :ref="item.zhCn"
                                 :id="item.id"
                                 :dictKey="item.dictKey"
                                 :label="item.zhCn"
                                 :value="item.zhCn"
                                 :key="index"></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="服务范围：">
                  <el-form-item label="XMin：">
                    <el-input v-model="editForm.mapLayerVoList[index].longitudeLeft"
                              placeholder="请输入XMin值"
                              @input="editForm.mapLayerVoList[index].longitudeLeft = editForm.mapLayerVoList[index].longitudeLeft.replace(/[^\d\.]/g,'')"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="YMin：">
                    <el-input v-model="editForm.mapLayerVoList[index].latitudeLeft"
                              placeholder="请输入YMin值"
                              @input="editForm.mapLayerVoList[index].latitudeLeft = editForm.mapLayerVoList[index].latitudeLeft.replace(/[^\d\.]/g,'')"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="XMax：">
                    <el-input v-model="editForm.mapLayerVoList[index].longitudeRight"
                              placeholder="请输入XMax值"
                              @input="editForm.mapLayerVoList[index].longitudeRight = editForm.mapLayerVoList[index].longitudeRight.replace(/[^\d\.]/g,'')"
                              style="margin-bottom:10px;"
                              :maxlength="30"></el-input>
                  </el-form-item>
                  <el-form-item label="YMax：">
                    <el-input v-model="editForm.mapLayerVoList[index].latitudeRight"
                              placeholder="请输入YMax值"
                              @input="editForm.mapLayerVoList[index].latitudeRight = editForm.mapLayerVoList[index].latitudeRight.replace(/[^\d\.]/g,'')"
                              :maxlength="30"></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="空间参考：">
                  <el-select v-model="editForm.mapLayerVoList[index].spaceRefer"
                             placeholder="请选择空间参考(WKID)"
                             @change="spaceReferSelect(dictionary.space_refer,addForm.spaceRefer,$event)"
                             style="width:100%;">
                    <el-option v-for="(item,index) in dictionary.space_refer"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="坐标系：">
                  <el-select v-model="editForm.mapLayerVoList[index].coordinateSys"
                             placeholder="请选择坐标系"
                             @change="coordinateSysSelect(dictionary.coordinate_sys,addForm.coordinateSys,$event)"
                             style="width:100%;">
                    <el-option v-for="(item,index) in dictionary.coordinate_sys"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="投影类型：">
                  <el-select v-model="editForm.mapLayerVoList[index].projectionType"
                             placeholder="请选择投影类型"
                             @change="projectionTypeSelect(dictionary.projection_type,addForm.projectionType,$event)"
                             style="width:100%;">
                    <el-option v-for="(item,index) in dictionary.projection_type"
                               :ref="item.zhCn"
                               :id="item.id"
                               :dictKey="item.dictKey"
                               :label="item.zhCn"
                               :value="item.zhCn"
                               :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="loaderBox">
            <span @click="editMapcoverage">
              <i class="el-icon-circle-plus-outline"></i>点击添加更多图层
            </span>
          </div>
          <input type="hidden"
                 name="flag"
                 v-model="flag" />
          <div class="dialogFooter">
            <!-- <el-button class="button_bg"
                       @click="submitEdit('editForm.mapLayerVoList')">保存</el-button>

            <el-button class="button_default"
                       type="primary"
                       @click="nextEditMapServeVisible = false">取消</el-button> -->

            <div class="button_qian"
                 @click="nextEditMapServeVisible = false">取消</div>
            <div style="width:96px;height:40px;"></div>
            <div class="button_shen"
                 @click="submitEdit('editForm.mapLayerVoList')">保存</div>
          </div>
        </el-dialog>
      </div>
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import qs from 'qs'
export default {
  name: 'mapServeStore',
  data () {
    var checkServiceRange = (rule, value, callback) => {
      let firstValue = this.$refs.longitudeLeft.value
      let secondValue = this.$refs.latitudeLeft.value
      let thirdValue = this.$refs.longitudeRight.value
      let fouthValue = this.$refs.latitudeRight.value
      if (
        value != ''
        && firstValue != ''
        && secondValue != ''
        && thirdValue != ''
        && fouthValue != ''
      ) {
        callback()
      } else {
        callback('地图服务范围数据不能为空')
      }
    }
    var checkArea = (rule, value, callback) => {
      let firstValue = this.$refs.cantonProvinceName.value
      let secondValue = this.$refs.cantonCityName.value
      let thirdValue = this.$refs.cantonAreaName.value
      if (
        (value != '' && firstValue != '')
        || secondValue != ''
        || thirdValue != ''
      ) {
        callback()
      } else {
        callback('请选择地图服务覆盖区域')
      }
    }
    return {
      // 地图服务信息列表
      mapData: [{}],

      addMapServeVisible: false,
      nextAddMapServeVisible: false,
      editMapServeVisible: false,
      nextEditMapServeVisible: false,

      rules: {
        serviceCode: [
          { required: true, message: '地图服务编号不能为空', trigger: 'blur' },
          {
            min: 3,
            max: 35,
            message: '长度在 3 到 35 个字符',
            trigger: 'blur'
          }
        ],
        dataName: [
          {
            required: true,
            message: '地图服务数据名称不能为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 35,
            message: '长度在 3 到 35 个字符',
            trigger: 'blur'
          }
        ],
        serviceName: [
          { required: true, message: '地图服务名称不能为空', trigger: 'blur' },
          {
            min: 3,
            max: 35,
            message: '长度在 3 到 35 个字符',
            trigger: 'blur'
          }
        ],
        url: [
          { required: true, message: '地图服务URL不能为空', trigger: 'blur' }
        ],
        serviceType: [
          { required: true, message: '请选择地图服务类型', trigger: 'change' }
        ],

        cantonProvinceName: [
          {
            required: true,
            message: '请选择地图服务覆盖区域',
            trigger: 'change',
            validator: checkArea
          }
        ],
        longitudeLeft: [
          {
            required: true,
            message: '地图服务范围数据不能为空',
            trigger: 'blur',
            validator: checkServiceRange
          }
        ],
        spaceRefer: [
          { required: true, message: '请选择空间参考(WKID)', trigger: 'change' }
        ],
        coordinateSys: [
          { required: true, message: '请选择坐标系', trigger: 'change' }
        ],
        projectionType: [
          { required: true, message: '请选择投影类型', trigger: 'change' }
        ],
        sourceUnit: [
          { required: true, message: '请选择来源单位', trigger: 'change' }
        ],
        coverageAreaName: [
          { required: true, message: '请选择地图服务覆盖区域', trigger: 'blur' }
        ]
      },

      flexibleOpen: false,

      coverageList: [],
      isOpen: false,

      checkMapServeVisible: false,

      params: {
        serviceName: '', // 关键字搜索
        coverageArea: '', // 覆盖区域
        serviceStatus: '', // 服务状态
        sourceUnit: '' // 来源单位(机构ID)
      },

      // 页码
      currentPage: 1,
      pageNo: 1, // 页码
      pageSize: 5, // 每页条数
      totalPage: 1,
      totalRecord: 1,

      loading: true,
      filterData: {
        cantonProvinceName: '', // 省
        cantonProvince: '',
        cantonCityName: '', // 市
        cantonCity: '',
        cantonAreaName: '', // 区
        cantonArea: '',
        serviceName: '', // 关键词
        coverageArea: '', // 覆盖区域
        serviceStatus: '', // 状态
        sourceUnit: '', // 来源单位
        org_type: ''
      },
      addForm: {
        serviceCode: '', // 服务编号
        dataName: '', // 数据名称
        serviceName: '', // 服务名称
        remarks: '', // 服务简介
        url: '', // 服务URL
        longitudeLeft: '', // XMin
        latitudeLeft: '', // YMin
        longitudeRight: '', // XMax
        latitudeRight: '', // YMax

        cantonProvinceName: '', // 省
        cantonProvince: '',
        cantonCityName: '', // 市
        cantonCity: '',
        cantonAreaName: '', // 区
        cantonArea: '',
        coverageArea: '',
        coverageAreaName: '',
        serviceRange: '', // 服务范围
        service_type: '', // 服务类型id
        serviceType: '', // 服务类型
        space_refer: '', // 空间参考id
        spaceRefer: '', // 空间参考
        coordinate_sys: '', // 坐标系id
        coordinateSys: '', // 坐标系
        projection_type: '', // 投影类型id
        projectionType: '', // 投影类型
        org_type: '', // 来源单位id
        sourceUnit: '', // 来源单位id

        update_cycle: '', // 更新周期id
        updateCycle: '', // 更新周期
        mapLayerArray: [
          {
            layerName: '', // 图层名称
            url: '', // 图层URL
            remarks: '', // 图层简介
            cantonProvinceName: '', // 省
            cantonProvince: '',
            cantonCityName: '', // 市
            cantonCity: '',
            cantonAreaName: '', // 区
            cantonArea: '',
            coverageArea: '',
            coverageAreaName: '',
            longitudeLeft: '', // XMin
            latitudeLeft: '', // YMin
            longitudeRight: '', // XMax
            latitudeRight: '', // YMax
            spaceRefer: '', // 空间参考
            coordinateSys: '', // 坐标系
            projectionType: '' // 投影类型
          }
        ]
      },
      isNextAdd: false,
      editForm: {
        // services: {
        serviceCode: '', // 服务编号
        dataName: '', // 数据名称
        serviceName: '', // 服务名称
        remarks: '', // 服务简介
        url: '', // 服务URL
        longitudeLeft: '', // XMin
        latitudeLeft: '', // YMin
        longitudeRight: '', // XMax
        latitudeRight: '', // YMax

        cantonProvinceName: '', // 省
        cantonProvince: '',
        cantonCityName: '', // 市
        cantonCity: '',
        cantonAreaName: '', // 区
        cantonArea: '',
        coverageArea: '',
        coverageAreaName: '',
        service_type: '', // 服务类型id
        serviceType: '', // 服务类型
        space_refer: '', // 空间参考id
        spaceRefer: '', // 空间参考
        coordinate_sys: '', // 坐标系id
        coordinateSys: '', // 坐标系
        projection_type: '', // 投影类型id
        projectionType: '', // 投影类型
        org_type: '', // 来源单位id
        sourceUnit: '', // 来源单位
        update_cycle: '', // 更新周期id
        updateCycle: '', // 更新周期
        // },

        mapLayerVoList: [
          {
            layerName: '', // 图层名称
            url: '', // 图层URL
            remarks: '', // 图层简介
            cantonProvinceName: '', // 省
            cantonProvince: '',
            cantonCityName: '', // 市
            cantonCity: '',
            cantonAreaName: '', // 区
            cantonArea: '',
            coverageArea: '',
            coverageAreaName: '',
            longitudeLeft: '', // XMin
            latitudeLeft: '', // YMin
            longitudeRight: '', // XMax
            latitudeRight: '', // YMax
            spaceRefer: '', // 空间参考
            spaceReferName: '', // 空间参考
            coordinateSys: '', // 坐标系
            coordinateSysName: '', // 坐标系
            projectionType: '', // 投影类型
            projectionTypeName: '' // 投影类型
          }
        ]
      },
      isEditArea: false,
      isEditLayerArea: false,

      flag: '',

      checkForm: {},
      dicRequest: [
        'service_type',
        'administrative_regions',
        'cantonCity',
        'cantonArea',
        'space_refer',
        'coordinate_sys',
        'projection_type',
        'org_type',
        'update_cycle'
      ], // 字典码请求
      dictionary: {
        // 字典码结果
        service_type: '',
        administrative_regions: '',
        cantonCity: '',
        cantonArea: '',
        space_refer: '',
        coordinate_sys: '',
        projection_type: '',
        org_type: '',
        update_cycle: ''
      },
      dicNum: 0, // 字典循环下标

      dictObj: {
        dictKey: '',
        id: '',
        zhCn: '全部'
      },

      orgdata: [],
      searchselectdefall: [],
      slectdefall: [],
      slectdefallF: [],
      singleuser: {}
    }
  },
  methods: {
    // inputCheck(val) {
    //   if (val.length > 54) {
    //     alert("输入过长！");
    //   }
    // },
    ...mapActions(['setTabsList']),

    addMapServe (formName) {
      this.addMapServeVisible = true

      this.$refs[formName].resetFields()

      console.log(this.addForm)
    },
    getBlurData () {
      if (
        this.addForm.longitudeLeft != ''
        && this.addForm.longitudeRight != ''
        && this.addForm.latitudeLeft != ''
        && this.addForm.latitudeRight != ''
      ) {
        this.$refs.addForm.clearValidate('longitudeLeft')
      }
      if (this.addForm.cantonProvinceName != '') {
        this.$refs.addForm.clearValidate('cantonProvinceName')
      }
    },
    nextAdd (formName) {
      if (this.addForm.cantonProvinceName != '') {
        if (this.addForm.cantonCityName != '') {
          if (this.addForm.cantonAreaName != '') {
            this.addForm['coverageArea'] = this.addForm.cantonArea
            this.addForm['coverageAreaName'] = this.addForm.cantonAreaName
          } else {
            this.addForm['coverageArea'] = this.addForm.cantonCity
            this.addForm['coverageAreaName'] = this.addForm.cantonCityName
          }
        } else {
          this.addForm['coverageArea'] = this.addForm.cantonProvince
          this.addForm['coverageAreaName'] = this.addForm.cantonProvinceName
        }
      } else {
        this.addForm['coverageArea'] = ''
        this.addForm['coverageAreaName'] = ''
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addMapServeVisible = false
          this.nextAddMapServeVisible = true
          this.isNextAdd = true
        } else {
          console.log('请检查是否漏填重要信息...')
          return false
        }
      })
    },
    submitAdd (formName) {
      this.$refs[formName].validate(async valid => {
        console.log('size - ' + this.addForm.mapLayerArray.length)

        if (valid) {
          // 验证成功

          delete this.addForm.mapLayerArray['cantonProvince']
          delete this.addForm.mapLayerArray['cantonProvinceName']
          delete this.addForm.mapLayerArray['cantonCity']
          delete this.addForm.mapLayerArray['cantonCityName']
          delete this.addForm.mapLayerArray['cantonArea']
          delete this.addForm.mapLayerArray['cantonAreaName']
          delete this.addForm.mapLayerArray['coverageArea']
          delete this.addForm.mapLayerArray['coverageAreaName']

          for (var key in this.addForm.mapLayerArray) {
            console.log('for - ' + key)
            if (this.addForm.mapLayerArray[key].cantonProvinceName != '') {
              if (this.addForm.mapLayerArray[key].cantonCityName != '') {
                if (this.addForm.mapLayerArray[key].cantonAreaName != '') {
                  this.addForm.mapLayerArray[
                    key
                  ].coverageArea = this.addForm.mapLayerArray[key].cantonArea
                  this.addForm.mapLayerArray[
                    key
                  ].coverageAreaName = this.addForm.mapLayerArray[
                    key
                  ].cantonAreaName
                } else {
                  this.addForm.mapLayerArray[
                    key
                  ].coverageArea = this.addForm.mapLayerArray[key].cantonCity
                  this.addForm.mapLayerArray[
                    key
                  ].coverageAreaName = this.addForm.mapLayerArray[
                    key
                  ].cantonCityName
                }
              } else {
                this.addForm.mapLayerArray[
                  key
                ].coverageArea = this.addForm.mapLayerArray[key].cantonProvince
                this.addForm.mapLayerArray[
                  key
                ].coverageAreaName = this.addForm.mapLayerArray[
                  key
                ].cantonProvinceName
              }
            } else {
              this.addForm.mapLayerArray[key].coverageArea = ''
              this.addForm.mapLayerArray[key].coverageAreaName = ''
            }
            delete this.addForm.mapLayerArray[key]['isOpen']
          }

          /*
          this.addForm.mapLayerArray = JSON.stringify(
            this.addForm.mapLayerArray
          );
          */
          console.log('before size - ' + this.addForm.mapLayerArray.length)

          console.log(this.addForm.mapLayerArray)
          let params = this.addForm
          params.mapLayersJson = JSON.stringify(this.addForm.mapLayerArray)
          console.log(this.addForm.mapLayerArray)
          console.log(
            'before size after stringify - ' + this.addForm.mapLayerArray.length
          )

          let res = await this.$post(
            '/epf-onemap/admin/mapservices/save',
            params
          )
          console.log(params)
          if (res.code == '0') {
            this.$message.success('添加成功') // 成功
            // this.getList();

            console.log('after size - ' + this.addForm.mapLayerArray.length)
            // console.log("after size a - " + params.mapLayerArray);

            this.loading = true
            let params = this.params
            params['page'] = 1
            params['rows'] = 5
            this.$get(
              '/epf-onemap/admin/mapservices/getServiceList',
              params
            ).then(res => {
              if (res.code == '0') {
                for (var key in res.pager.results) {
                  if (
                    res.pager.results[key].sourceUnit
                    == 'e8ae8519-10c1-4629-b7d1-39cb5540f1c6'
                  ) {
                    let index = key
                    res.pager.results[index].sourceUnit = '广东省自然资源厅'
                  } else if (
                    res.pager.results[key].sourceUnit
                    == 'b9ea0504-8082-419f-809a-0aff8d1c40c1'
                  ) {
                    let index = key
                    res.pager.results[index].sourceUnit
                      = '广东省土地调查规划院'
                  }
                }

                this.mapData = res.pager.results
                this.pageNo = res.pager.pageNo
                this.pageSize = res.pager.pageSize
                this.totalPage = res.pager.totalPage
                this.totalRecord = res.pager.totalRecord
                this.currentPage = 1
                this.loading = false
              } else {
                this.loading = false
                this.$message.error(res.msg) // 失败
                return
              }
            })
          }
          this.nextAddMapServeVisible = false
          this.isNextAdd = false
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
      this.$refs[formName].resetFields()
    },

    handelClickPreview (item) {
      let title = '预览地图服务'
      let routerPath = 'mapPreviewServe'
      var tabObj = { title, routerPath }
      this.setTabsList(tabObj)
      this.$router.push({ path: routerPath, query: { id: item.id } })
    },
    handelClickCheck (item) {
      let id = item.id
      this.$get('/epf-onemap/admin/mapservices/getById', { id: id }).then(
        res => {
          if (res.code == '0') {
            console.log(res)
            this.checkMapServeVisible = true
            this.checkForm = res.services

            if (
              res.services.sourceUnit == 'e8ae8519-10c1-4629-b7d1-39cb5540f1c6'
            ) {
              this.checkForm.sourceUnitName = '广东省自然资源厅'
            } else if (
              res.services.sourceUnit == 'b9ea0504-8082-419f-809a-0aff8d1c40c1'
            ) {
              this.checkForm.sourceUnitName = '广东省土地调查规划院'
            }

            this.coverageList = res.layerList
            for (var key in this.coverageList) {
              if (!this.coverageList[key].isOpen) {
                this.$set(this.coverageList[key], 'isOpen', false)
              }
            }
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    turnSelectArea (event) {
      this.isEditArea = true
    },
    turnSelectLayerArea (event) {
      this.isEditLayerArea = true
    },
    handelClickEdit (item) {
      this.isEditArea = false
      this.isEditLayerArea = false
      let id = item.id
      this.$get('/epf-onemap/admin/mapservices/getById', { id: id }).then(
        res => {
          if (res.code == '0') {
            this.editMapServeVisible = true
            this.editForm = res.services
            this.slectdefall = res.services.sourceUnit
            this.editForm.sourceUnit = this.slectdefall
            this.editForm.mapLayerVoList = res.layerList
            for (var key in this.editForm.mapLayerVoList) {
              if (!this.editForm.mapLayerVoList[key].noOpen) {
                this.$set(this.editForm.mapLayerVoList[key], 'noOpen', false)
              }
            }
          } else {
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    nextEdit (formName) {
      this.$refs[formName].validate(valid => {
        if (this.editForm.sourceUnit != '') {
          this.$refs.editForm.clearValidate('sourceUnit')
        }
        if (valid) {
          this.editMapServeVisible = false
          this.nextEditMapServeVisible = true
        } else {
          this.$message.error('请检查是否漏填重要信息...')
          return false
        }
      })
    },
    submitEdit (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证成功

          delete this.editForm.mapLayerVoList['cantonProvince']
          delete this.editForm.mapLayerVoList['cantonProvinceName']
          delete this.editForm.mapLayerVoList['cantonCity']
          delete this.editForm.mapLayerVoList['cantonCityName']
          delete this.editForm.mapLayerVoList['cantonArea']
          delete this.editForm.mapLayerVoList['cantonAreaName']
          delete this.editForm.mapLayerVoList['coverageArea']
          delete this.editForm.mapLayerVoList['coverageAreaName']

          for (var key in this.editForm.mapLayerVoList) {
            if (this.editForm.mapLayerVoList[key].cantonProvinceName != '') {
              if (this.editForm.mapLayerVoList[key].cantonCityName != '') {
                if (this.editForm.mapLayerVoList[key].cantonAreaName != '') {
                  this.editForm.mapLayerVoList[
                    key
                  ].coverageArea = this.editForm.mapLayerVoList[key].cantonArea
                  this.editForm.mapLayerVoList[
                    key
                  ].coverageAreaName = this.editForm.mapLayerVoList[
                    key
                  ].cantonAreaName
                } else {
                  this.editForm.mapLayerVoList[
                    key
                  ].coverageArea = this.editForm.mapLayerVoList[key].cantonCity
                  this.editForm.mapLayerVoList[
                    key
                  ].coverageAreaName = this.editForm.mapLayerVoList[
                    key
                  ].cantonCityName
                }
              } else {
                this.editForm.mapLayerVoList[
                  key
                ].coverageArea = this.editForm.mapLayerVoList[
                  key
                ].cantonProvince
                this.editForm.mapLayerVoList[
                  key
                ].coverageAreaName = this.editForm.mapLayerVoList[
                  key
                ].cantonProvinceName
              }
            } else {
              this.editForm.mapLayerVoList[key].coverageArea = ''
              this.editForm.mapLayerVoList[key].coverageAreaName = ''
            }
          }

          let params = this.editForm

          params.mapLayersJson = JSON.stringify(this.editForm.mapLayerVoList)

          console.log(params.mapLayersJson)

          let res = await this.$post(
            '/epf-onemap/admin/mapservices/update',
            params
          )

          if (res.code == '0') {
            this.$message.success('编辑成功') // 成功
            this.getList()
          }
          this.nextEditMapServeVisible = false
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    handelClickDelete (item) {
      this.$confirm('此操作将永久删除该地图服务信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      })
        .then(async () => {
          let id = item.id
          let res = await this.$post('/epf-onemap/admin/mapservices/delete', {
            id: id
          })

          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    flexSwitch (index) {
      this.addForm.mapLayerArray[index].isOpen = !this.addForm.mapLayerArray[
        index
      ].isOpen
    },
    flexSwitchEdit (index) {
      console.log('第' + index, this.editForm)
      console.log('第' + index, this.editForm.mapLayerVoList)
      this.editForm.mapLayerVoList[index].noOpen = !this.editForm
        .mapLayerVoList[index].noOpen
      console.log('第' + index, this.editForm.mapLayerVoList[index].noOpen)

      this.flag = this.flag + 1
    },
    checkflexSwitch (index) {
      this.coverageList[index].isOpen = !this.coverageList[index].isOpen
    },
    flexServeSwitch () {
      this.isOpen = !this.isOpen
    },
    addMapcoverage () {
      for (var key in this.addForm.mapLayerArray) {
        if (
          this.addForm.mapLayerArray[key].layerName == ''
          || this.addForm.mapLayerArray[key].url == ''
        ) {
          this.$message.error(
            '至少需要填写图层名称和图层URL才能继续添加图层...'
          )
          return
        }
      }
      this.addForm.mapLayerArray.push({
        layerName: '', // 图层名称
        url: '', // 图层URL
        remarks: '', // 图层简介
        cantonProvinceName: '', //
        cantonCityName: '',
        cantonAreaName: '',
        longitudeLeft: '', // XMin
        latitudeLeft: '', // YMin
        longitudeRight: '', // XMax
        latitudeRight: '', // YMax
        spaceRefer: '', // 空间参考
        coordinateSys: '', // 坐标系
        projectionType: '', // 投影类型
        isOpen: false
      })
    },
    editMapcoverage () {
      for (var key in this.editForm.mapLayerVoList) {
        if (
          this.editForm.mapLayerVoList[key].layerName == ''
          || this.editForm.mapLayerVoList[key].url == ''
        ) {
          this.$message.error(
            '至少需要填写图层名称和图层URL才能继续添加图层...'
          )
          return
        }
      }
      this.editForm.mapLayerVoList.push({
        layerName: '', // 图层名称
        url: '', // 图层URL
        remarks: '', // 图层简介
        cantonProvinceName: '', //
        cantonCityName: '',
        cantonAreaName: '',
        longitudeLeft: '', // XMin
        latitudeLeft: '', // YMin
        longitudeRight: '', // XMax
        latitudeRight: '', // YMax
        spaceRefer: '', // 空间参考
        coordinateSys: '', // 坐标系
        projectionType: '', // 投影类型
        noOpen: false
      })
      this.flag = this.flag + 1
    },

    // 获取列表
    getList () {
      this.loading = true
      let params = this.params
      params['page'] = this.pageNo
      params['rows'] = this.pageSize
      this.$get('/epf-onemap/admin/mapservices/getServiceList', params).then(
        res => {
          console.log(res)
          if (res.code == '0') {
            for (var key in res.pager.results) {
              if (
                res.pager.results[key].sourceUnit
                == 'e8ae8519-10c1-4629-b7d1-39cb5540f1c6'
              ) {
                let index = key
                res.pager.results[index].sourceUnit = '广东省自然资源厅'
              } else if (
                res.pager.results[key].sourceUnit
                == 'b9ea0504-8082-419f-809a-0aff8d1c40c1'
              ) {
                let index = key
                res.pager.results[index].sourceUnit = '广东省土地调查规划院'
              }
            }

            this.mapData = res.pager.results

            console.log(this.mapData)
            this.pageNo = res.pager.pageNo
            this.pageSize = res.pager.pageSize
            this.totalPage = res.pager.totalPage
            this.totalRecord = res.pager.totalRecord
            this.loading = false
          } else {
            this.loading = false
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },

    resetFilter () {
      for (let item in this.filterData) {
        this.filterData[item] = ''
      }
      this.filterData.cantonProvinceName = '广东省'
      this.filterData.cantonProvince = '440000'
      this.searchselectdefall = []
      // this.orgdata = [];
      this.singleuser = {}
      this.slectdefallF = []
      this.getList()
    },
    searchList () {
      this.currentPage = 1
      this.filterData.sourceUnit = this.singleuser.orgId

      this.params = this.filterData

      if (this.filterData.cantonProvinceName != '') {
        if (this.filterData.cantonCityName != '') {
          if (this.filterData.cantonAreaName != '') {
            this.params['coverageArea'] = this.filterData.cantonArea
          } else {
            this.params['coverageArea'] = this.filterData.cantonCity
          }
        } else {
          this.params['coverageArea'] = this.filterData.cantonProvince
        }
      } else {
        this.params['coverageArea'] = ''
      }

      this.loading = true
      let params = this.params
      params['page'] = 1
      params['rows'] = 5
      this.$get('/epf-onemap/admin/mapservices/getServiceList', params).then(
        res => {
          if (res.code == '0') {
            for (var key in res.pager.results) {
              if (
                res.pager.results[key].sourceUnit
                == 'e8ae8519-10c1-4629-b7d1-39cb5540f1c6'
              ) {
                let index = key
                res.pager.results[index].sourceUnit = '广东省自然资源厅'
              } else if (
                res.pager.results[key].sourceUnit
                == 'b9ea0504-8082-419f-809a-0aff8d1c40c1'
              ) {
                let index = key
                res.pager.results[index].sourceUnit = '广东省土地调查规划院'
              }
            }

            this.mapData = res.pager.results
            this.pageNo = res.pager.pageNo
            this.pageSize = res.pager.pageSize
            // this.pageNo = 1;

            this.totalPage = res.pager.totalPage
            this.totalRecord = res.pager.totalRecord
            this.loading = false
          } else {
            this.loading = false
            this.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    handleSizeChange (val) {
      // 每页条数改变时触发
      this.pageSize = val // 显示条数改变
      this.getList()
    },
    handleCurrentChange (val) {
      // 当前页发生改变时触发
      this.pageNo = val // 页码改变
      this.getList()
    },
    // 字典选择(filterData)
    provinceSelect0 (dic, cantonCode, event) {
      this.filterData.cantonAreaName = ''
      this.filterData.cantonArea = ''
      this.cantonArea = ''
      this.filterData.cantonCityName = ''
      this.filterData.cantonCity = ''
      this.cantonCity = ''
      let pId = this.$refs[cantonCode][0].$attrs.id
      this.filterData.cantonProvince = this.$refs[cantonCode][0].$attrs.dictKey

      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList
          return
        }
        this.dictionary.cantonCity = ''
      })
    },
    citySelect0 (dic, cantonCity, event) {
      this.filterData.cantonArea = ''
      this.filterData.cantonAreaName = ''
      this.cantonArea = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
      this.filterData.cantonCity = this.$refs[cantonCity][0].$attrs.dictKey
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList
          return
        }
        this.dictionary.cantonArea = ''
      })
    },
    areaSelect0 (dic, cantonCity, event) {
      this.filterData.cantonArea = this.$refs[cantonCity][0].$attrs.dictKey
      console.log(this.filterData.cantonArea)
    },
    statusSelect (val) {
      this.filterData.serviceStatus = val.value
    },
    // 字典选择(addForm)
    serviceTypeSelect (dic, serviceType, event) {
      this.addForm.service_type = this.$refs[serviceType][0].$attrs.dictKey
      console.log(this.addForm.service_type)
    },
    provinceSelect (dic, cantonCode, event) {
      this.addForm.cantonAreaName = ''
      this.addForm.cantonArea = ''
      this.cantonArea = ''
      this.addForm.cantonCityName = ''
      this.addForm.cantonCity = ''
      this.cantonCity = ''
      let pId = this.$refs[cantonCode][0].$attrs.id
      this.addForm.cantonProvince = this.$refs[cantonCode][0].$attrs.dictKey
      this.addForm.mapLayerArray.cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.dictKey
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList
          return
        }
        this.dictionary.cantonCity = ''
      })
    },
    citySelect (dic, cantonCity, event) {
      this.addForm.cantonArea = ''
      this.addForm.cantonAreaName = ''
      this.cantonArea = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
      this.addForm.cantonCity = this.$refs[cantonCity][0].$attrs.dictKey
      this.addForm.mapLayerArray.cantonCity = this.$refs[
        cantonCity
      ][0].$attrs.dictKey
      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList
          return
        }
        this.dictionary.cantonArea = ''
      })
    },
    areaSelect (dic, cantonCity, event) {
      this.addForm.cantonArea = this.$refs[cantonCity][0].$attrs.dictKey
      this.addForm.mapLayerArray.cantonArea = this.$refs[
        cantonCity
      ][0].$attrs.dictKey
      console.log(this.addForm.cantonArea)
    },

    provinceSelectEdit (dic, cantonCode, event) {
      this.editForm.cantonAreaName = ''
      this.editForm.cantonArea = ''
      this.cantonArea = ''
      this.editForm.cantonCityName = ''
      this.editForm.cantonCity = ''
      this.cantonCity = ''
      let pId = this.$refs[cantonCode][0].$attrs.id
      this.editForm.cantonProvince = this.$refs[cantonCode][0].$attrs.dictKey

      if (this.editForm.cantonProvince != '') {
        this.editForm['coverageArea'] = this.editForm.cantonProvince
        this.editForm['coverageAreaName'] = this.editForm.cantonProvinceName
      }

      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList
          return
        }
        this.dictionary.cantonCity = ''
      })
    },
    citySelectEdit (dic, cantonCity, event) {
      this.editForm.cantonArea = ''
      this.editForm.cantonAreaName = ''
      this.cantonArea = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
      this.editForm.cantonCity = this.$refs[cantonCity][0].$attrs.dictKey

      if (this.editForm.cantonCity != '') {
        this.editForm['coverageArea'] = this.editForm.cantonCity
        this.editForm['coverageAreaName'] = this.editForm.cantonCityName
      }

      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList
          return
        }
        this.dictionary.cantonArea = ''
      })
    },
    areaSelectEdit (dic, cantonCity, event) {
      this.editForm.cantonArea = this.$refs[cantonCity][0].$attrs.dictKey
      this.editForm.cantonAreaName = this.$refs[cantonCity][0].label

      if (this.editForm.cantonArea != '') {
        this.editForm['coverageArea'] = this.editForm.cantonArea
        this.editForm['coverageAreaName'] = this.editForm.cantonAreaName
      }
      console.log(this.editForm.cantonArea)
      console.log(this.editForm.coverageAreaName)
    },

    provinceSelectLayer (dic, cantonCode, event, index) {
      this.addForm.mapLayerArray[index].cantonAreaName = ''
      this.addForm.mapLayerArray[index].cantonArea = ''
      this.cantonArea = ''
      this.addForm.mapLayerArray[index].cantonCityName = ''
      this.addForm.mapLayerArray[index].cantonCity = ''
      this.cantonCity = ''
      let pId = this.$refs[cantonCode][0].$attrs.id

      this.addForm.mapLayerArray[index].cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.dictKey
      this.addForm.mapLayerArray[index].cantonProvinceName = this.$refs[
        cantonCode
      ][0].label

      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList
          return
        }
        this.dictionary.cantonCity = ''
      })
    },
    citySelectLayer (dic, cantonCity, event, index) {
      this.addForm.mapLayerArray[index].cantonArea = ''
      this.addForm.mapLayerArray[index].cantonAreaName = ''
      this.cantonArea = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
      this.addForm.mapLayerArray[index].cantonCity = this.$refs[
        cantonCity
      ][0].$attrs.dictKey
      this.addForm.mapLayerArray[index].cantonCityName = this.$refs[
        cantonCity
      ][0].label

      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList
          return
        }
        this.dictionary.cantonArea = ''
      })
    },
    areaSelectLayer (dic, cantonCity, event, index) {
      this.addForm.mapLayerArray[index].cantonArea = this.$refs[
        cantonCity
      ][0].$attrs.dictKey
      this.addForm.mapLayerArray[index].cantonAreaName = this.$refs[
        cantonCity
      ][0].label

      console.log(this.addForm.mapLayerArray[index].cantonArea)
    },
    provinceSelectEditLayer (dic, cantonCode, event, index) {
      this.editForm.mapLayerVoList[index].cantonAreaName = ''
      this.editForm.mapLayerVoList[index].cantonArea = ''
      this.cantonArea = ''
      this.editForm.mapLayerVoList[index].cantonCityName = ''
      this.editForm.mapLayerVoList[index].cantonCity = ''
      this.cantonCity = ''
      let pId = this.$refs[cantonCode][0].$attrs.id

      this.editForm.mapLayerVoList[index].cantonProvince = this.$refs[
        cantonCode
      ][0].$attrs.dictKey
      this.editForm.mapLayerVoList[index].cantonProvinceName = this.$refs[
        cantonCode
      ][0].label

      setTimeout(() => {
        if (this.editForm.mapLayerVoList[index].cantonProvinceName != '') {
          this.editForm.mapLayerVoList[
            index
          ].coverageArea = this.editForm.mapLayerVoList[index].cantonProvince
          this.editForm.mapLayerVoList[
            index
          ].coverageAreaName = this.editForm.mapLayerVoList[
            index
          ].cantonProvinceName
        }
        this.isEditLayerArea = false
      }, 10000)

      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonCity = res.dictionariesList
          return
        }
        this.dictionary.cantonCity = ''
      })
    },
    citySelectEditLayer (dic, cantonCity, event, index) {
      this.editForm.mapLayerVoList[index].cantonArea = ''
      this.editForm.mapLayerVoList[index].cantonAreaName = ''
      this.cantonArea = ''
      let pId = this.$refs[cantonCity][0].$attrs.id
      this.editForm.mapLayerVoList[index].cantonCity = this.$refs[
        cantonCity
      ][0].$attrs.dictKey
      this.editForm.mapLayerVoList[index].cantonCityName = this.$refs[
        cantonCity
      ][0].label

      setTimeout(() => {
        if (this.editForm.mapLayerVoList[index].cantonCityName != '') {
          this.editForm.mapLayerVoList[
            index
          ].coverageArea = this.editForm.mapLayerVoList[index].cantonCity
          this.editForm.mapLayerVoList[
            index
          ].coverageAreaName = this.editForm.mapLayerVoList[
            index
          ].cantonCityName
        }
        this.isEditLayerArea = false
      }, 10000)

      this.$get(
        `/epf-admin/regionals/getAreaByCodeOrParentId?parentId=${pId}`,
        {}
      ).then(res => {
        console.log(res)
        if (res.dictionariesList.length != 0) {
          this.dictionary.cantonArea = res.dictionariesList
          return
        }
        this.dictionary.cantonArea = ''
      })
    },
    areaSelectEditLayer (dic, cantonCity, event, index) {
      this.editForm.mapLayerVoList[index].cantonArea = this.$refs[
        cantonCity
      ][0].$attrs.dictKey
      this.editForm.mapLayerVoList[index].cantonAreaName = this.$refs[
        cantonCity
      ][0].label

      setTimeout(() => {
        if (this.editForm.mapLayerVoList[index].cantonAreaName != '') {
          this.editForm.mapLayerVoList[
            index
          ].coverageArea = this.editForm.mapLayerVoList[index].cantonArea
          this.editForm.mapLayerVoList[
            index
          ].coverageAreaName = this.editForm.mapLayerVoList[
            index
          ].cantonAreaName
        }
        this.isEditLayerArea = false
      }, 0)

      console.log(this.editForm.mapLayerVoList[index].cantonArea)
    },

    spaceReferSelect (dic, spaceRefer, event) {
      this.addForm.space_refer = this.$refs[spaceRefer][0].$attrs.dictKey
      console.log(this.addForm.space_refer)
    },
    coordinateSysSelect (dic, coordinateSys, event) {
      this.addForm.coordinate_sys = this.$refs[coordinateSys][0].$attrs.dictKey
      console.log(this.addForm.coordinate_sys)
    },
    projectionTypeSelect (dic, projectionType, event) {
      this.addForm.projection_type = this.$refs[
        projectionType
      ][0].$attrs.dictKey
      console.log(this.addForm.projection_type)
    },
    updateCycleSelect (dic, updateCycle, event) {
      this.addForm.update_cycle = this.$refs[updateCycle][0].$attrs.dictKey
      console.log(this.addForm.update_cycle)
    },
    async getGrowpList (params) {
      this.$get('/epf-admin/admin/org/getallOrg', params).then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          return
        }
        console.log(res)
        var orglist = res.ztreeJson
        var selecttree = new Array()
        for (var i = 0; i < orglist.length; i++) {
          if (
            orglist[i].parentId == '0'
            || orglist[i].parentId == ''
            || orglist[i].parentId == null
          ) {
            var selecttree1 = new Array()
            for (var j = 0; j < orglist.length; j++) {
              if (orglist[j].parentId == orglist[i].id) {
                selecttree1.push({
                  value: orglist[j].id,
                  label: orglist[j].orgName
                })
              }
            }
            for (var j = 0; j < selecttree1.length; j++) {
              var selecttree2 = new Array()
              for (var k = 0; k < orglist.length; k++) {
                if (orglist[k].parentId == selecttree1[j].value) {
                  selecttree2.push({
                    value: orglist[k].id,
                    label: orglist[k].orgName
                  })
                }
              }
              if (selecttree2.length > 0) {
                selecttree1[j].children = selecttree2
              }
            }

            if (selecttree1.length > 0) {
              selecttree.push({
                value: orglist[i].id,
                label: orglist[i].orgName,
                children: selecttree1
              })
            } else {
              selecttree.push({
                value: orglist[i].id,
                label: orglist[i].orgName
              })
            }
          }
        }

        this.orgdata = selecttree
      })
    },
    queryuserifo (id) {
      let that = this
      var url = '/epf-admin/admin/user/getUser'
      var params = { id: id }
      this.$get(url, params)
        .then(res => {
          that.singleuser = res.user
          that.imageUrl = that.getImgUrl(res.user.iconImg)
          if (res.user.orgId != '' && res.user.orgId != null) {
            var orgid = []
            var orgdt = that.orgdata

            for (var i = 0; i < orgdt.length; i++) {
              if (orgdt[i].value == res.user.orgId) {
                var orgid = [res.user.orgId]
                break
              }
              if (orgdt[i].children) {
                for (var k = 0; k < orgdt[i].children.length; k++) {
                  if (orgdt[i].children[k].value == res.user.orgId) {
                    var orgid = [orgdt[i].value, orgdt[i].children[k].value]
                    break
                  }
                  if (orgdt[i].children[k].children) {
                    for (
                      var j = 0;
                      j < orgdt[i].children[k].children.length;
                      j++
                    ) {
                      if (
                        orgdt[i].children[k].children[j].value == res.user.orgId
                      ) {
                        var orgid = [
                          orgdt[i].value,
                          orgdt[i].children[k].value,
                          orgdt[i].children[k].children[j].value
                        ]
                        break
                      }
                    }
                  }
                }
              }
            }
            that.slectdefall = orgid
            that.slectdefallF = orgid
          }
        })
        .catch(res => {
          that.$message.warning(res.msg)
        })
    },
    handleChange (value) {
      this.singleuser.orgId = value[value.length - 1]
      this.filterData.sourceUnit = this.singleuser.orgId
    },
    handleChangeAdd (value) {
      this.singleuser.orgId = value[value.length - 1]
      this.addForm.sourceUnit = this.singleuser.orgId
      //  this.editForm.sourceUnit = this.singleuser.orgId;
    },
    handleChangeEdit (value) {
      this.singleuser.orgId = value[value.length - 1]
      this.editForm.sourceUnit = this.singleuser.orgId
      console.log(this.editForm.sourceUnit)
    },
    handleServiceUrlClick (url) {
      window.open(url)
    }
  },
  created () {
    const that = this
    let reqArr = this.dicRequest.map((item, index, arr) => {
      console.log(item)
      console.log(index)
      console.log(arr)
      let reqFun = new Promise((resolve, reject) => {
        if (item == 'administrative_regions') {
          this.$get('/epf-admin/regionals/getAreaByCodeOrParentId', {
            parentId: 0
          }).then(res => {
            res = {
              code: 0,
              dictionariesList: [
                {                  abbreviation: null,
                  children: null,
                  createTime: null,
                  creatorBy: null,
                  dictDelete: null,
                  dictKey: '440000',
                  dictOrder: 440000,
                  dictValue: '440000',
                  enUs: '440000',
                  groupId: null,
                  id: '440000',
                  parentId: '0',
                  updateTime: null,
                  updatorBy: null,
                  version: null,
                  zhCn: '广东省'                }
              ],
              msg: '操作成功!'
            }
            resolve(res)
            console.log(res)
          })
        } else {
          this.$get(
            `/epf-admin/admin/dictionaries/getDictEbyDictGroup/${item}`,
            {}
          ).then(res => {
            console.log(res)
            resolve(res)
          })
        }
      })
      return reqFun
    })
    Promise.all(reqArr).then(res => {
      console.log(res)
      let dicArr = res.map(item => {
        console.log(item)
        let dicArr = item.dictionariesList.map(item => {
          return {
            dictKey: item.dictKey,
            zhCn: item.zhCn,
            id: item.id
          }
        })
        return dicArr
      })
      console.log(dicArr)
      for (let item in this.dictionary) {
        console.log(this.dicNum)
        this.dictionary[item] = dicArr[this.dicNum]
        console.log(dicArr[this.dicNum])
        this.dicNum++
      }
      this.dicFinsh = true
      console.log('字典结果', this.dictionary)
    })

    this.getList()

    // for (var key in that.addForm.mapLayerArray) {
    //   if (!that.addForm.mapLayerArray[key].isOpen) {
    //     that.$set(that.addForm.mapLayerArray[key], "isOpen", false);
    //   }
    // }
    // console.log(that.addForm.mapLayerArray);

    this.getGrowpList({})
  },
  mounted () {
    this.flag = 0
    this.filterData.cantonProvinceName = '广东省'
  },
  watch: {
    'addForm.cantonProvinceName': {
      immediate: true,
      deep: true,
      handler (val) {
        if (val != '') {
          this.$refs.addForm.clearValidate('cantonProvinceName')
        }
      }
    },
    'editForm.coverageArea': {
      immediate: true,
      deep: true,
      handler (oldVal, newVal) {
        setTimeout(() => {
          this.isEditArea = false
        }, 20000)
      }
    },
    'editForm.cantonArea': {
      immediate: true,
      deep: true,
      handler (val) {
        setTimeout(() => {
          if (val != '') {
            this.isEditArea = false
          }
        }, 0)
      }
    },
    addMapServeVisible (val) {
      if (val == true) {
        this.addForm.cantonArea = ''
        this.addForm.cantonAreaName = ''
        this.addForm.cantonCity = ''
        this.addForm.cantonCityName = ''
        this.addForm.cantonProvince = ''
        this.addForm.cantonProvinceName = ''
        this.addForm.coverageArea = ''
        this.addForm.coverageAreaName = ''
        this.addForm.latitudeLeft = ''
        this.addForm.latitudeRight = ''
        this.addForm.longitudeRight = ''
        this.addForm.longitudeLeft = ''
        this.addForm.sourceUnit = ''
        this.slectdefall = []

        delete this.addForm.mapLayerArray['cantonProvince']
        delete this.addForm.mapLayerArray['cantonProvinceName']
        delete this.addForm.mapLayerArray['cantonCity']
        delete this.addForm.mapLayerArray['cantonCityName']
        delete this.addForm.mapLayerArray['cantonArea']
        delete this.addForm.mapLayerArray['cantonAreaName']
        delete this.addForm.mapLayerArray['coverageArea']
        delete this.addForm.mapLayerArray['coverageAreaName']

        this.addForm.mapLayerArray = eval(this.addForm.mapLayerArray)

        this.addForm.mapLayerArray = this.addForm.mapLayerArray.slice(0, 1)

        for (var key in this.addForm.mapLayerArray) {
          this.addForm.mapLayerArray[key].layerName = ''
          this.addForm.mapLayerArray[key].url = ''
          this.addForm.mapLayerArray[key].remarks = ''
          this.addForm.mapLayerArray[key].cantonProvinceName = ''
          this.addForm.mapLayerArray[key].cantonProvince = ''
          this.addForm.mapLayerArray[key].cantonCityName = ''
          this.addForm.mapLayerArray[key].cantonCity = ''
          this.addForm.mapLayerArray[key].cantonAreaName = ''
          this.addForm.mapLayerArray[key].cantonArea = ''
          this.addForm.mapLayerArray[key].coverageArea = ''
          this.addForm.mapLayerArray[key].coverageAreaName = ''
          this.addForm.mapLayerArray[key].longitudeLeft = ''
          this.addForm.mapLayerArray[key].latitudeLeft = ''
          this.addForm.mapLayerArray[key].longitudeRight = ''
          this.addForm.mapLayerArray[key].latitudeRight = ''
          this.addForm.mapLayerArray[key].spaceRefer = ''
          this.addForm.mapLayerArray[key].coordinateSys = ''
          this.addForm.mapLayerArray[key].projectionType = ''

          if (!this.addForm.mapLayerArray[key].isOpen) {
            this.$set(this.addForm.mapLayerArray[key], 'isOpen', false)
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.headerpop {
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: bold;

  line-height: 30px;
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
  height: 60px;
  line-height: 60px;
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
  width: 80px;
  height: 32px;
  background-color: #3399ff;
  border-radius: 2px;
  margin-right: 40px;
  text-align: center;
  line-height: 36px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.toolsTitle {
  line-height: 40px;
  font-size: 14px;
  margin-left: 25px;
}
.toolsTips {
  line-height: 40px;
  font-size: 14px;
  margin-left: 10px;
  color: red;
}
.filter_wrap {
  /* border: 1px solid #f3f3f3; */
  min-height: 789px;
  box-sizing: border-box;
  padding: 16px;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.filter_wrap[data-v-60fb67bb] {
  background: #fff;
}
.switchHeight_box {
  transition: 0.5s;
  background: #fff;
  border: 0px solid transparent;
}
.filter_title_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.filter_title__custom {
  box-sizing: border-box;
  width: 90px;
  min-width: 90px;
  max-width: 90px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
}
.filter_title__custom_five {
  box-sizing: border-box;
  width: 110px;
  min-width: 110px;
  max-width: 110px;
  height: 40px;
  padding-right: 10px;
  line-height: 40px;
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
.primary_reset {
  width: 96px;
  height: 40px;
  background: rgba(233, 243, 255, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  margin-left: 16px;
  cursor: pointer;
}
.primary_oper {
  width: 96px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid rgba(27, 116, 238, 1);
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 1px 2px 5px 2px rgba(236, 236, 236, 0.5);
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(27, 116, 238, 1);
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.toolsTitleBox_list {
  height: 40px;
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toolsTitle_list {
  font-size: 18px;
  font-family: MicrosoftYaHeiSemibold;
  color: rgba(89, 89, 89, 1);
  font-weight: 500;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.coverageBox {
  width: 100%;
  height: 100%;
  /* border: 1px solid #d7d7d7;
  border-radius: 10px; */
  box-sizing: border-box;
  /* padding: 0 20px; */
  margin-bottom: 14px;
}
.loaderBox {
  width: 100%;
  height: 40px;
  /* border: 1px solid #d7d7d7;
  border-radius: 10px; */
  box-sizing: border-box;
  /* background-color: #f2f2f2; */
  /* margin-bottom: 24px; */
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
  font-size: 16px;
  cursor: pointer;
}
.loaderBox span {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.coverageTitleBox {
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  /* border-bottom: 2px solid #e4e7ed; */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.coverageTitle {
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  width: 100px;
  padding: 0 10px;
  font-size: 18px;
  color: #1082c2;
  margin-left: 20px;
  /* border-bottom: 2px solid #3399ff; */
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.flexibleSwitch {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  font-size: 18px;
  color: #1082c2;
}

.addMapServeDialog {
  height: 60vh;
  width: 30vw;
  position: fixed;
  top: 15vh;
  left: 25vw;
  background: #fff;
  z-index: 10001;
  padding: 20px 30px;
  overflow: auto;
  box-shadow: 2px 1px 30px rgba(0, 0, 0, 0.15);
}
.addMapServeDialog > div {
  position: relative;
  line-height: 24px;
  font-size: 18px;
  color: #303133;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2f3f4;
  border-radius: 3px;
}

.addMapServeDialog > div > i {
  position: absolute;
  right: 0;
  font-size: 25px;
  color: #303133;
}
.el-scrollbar {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: auto;
}
/* .dialogFooter {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
} */
</style>
<style>
#serveBody .default,
#serveBody .error,
#serveBody .success {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: relative;
  top: 1px;
  right: 5px;
}
#serveBody .default {
  background: #b6b6b6;
  border: 2px solid #cfcfcf;
}
#serveBody .error {
  background: #fd4041;
  border: 2px solid #ff6c6f;
}
#serveBody .success {
  background: #92b62d;
  border: 2px solid #bfd482;
}
#serveBody .filter_wrap .el-input--small .el-input__inner {
  height: 40px;
}
#serveBody .filter_wrap .el-row {
  margin-bottom: 10px;
}
#serveBody .filter_wrap .distpicker-address-wrapper select {
  width: 148px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  padding: 0 10px;
}

#serveBody .filter_wrap .el-date-editor.el-input .el-input__icon {
  line-height: 40px;
  color: #8dc4f7;
}
#serveBody .filter_wrap .el-input__prefix,
#serveBody .el-input__suffix {
  width: 25px;
  font-size: 16px;
}
#serveBody .el-textarea .el-textarea__inner {
  width: 100%;
  height: 100% !important;
}
#serveBody .el-input__inner {
  height: 40px;
}
#serveBody .el-pagination .el-input__inner {
  height: 28px;
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
.mapDialog .el-dialog__header {
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
.mapDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.mapDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.mapDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.mapDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.mapDialog .el-dialog__body .el-form {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.mapDialog .el-dialog__body .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.mapDialog .el-dialog__body .dialogFooter {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mapDialog .button_qian,
.mapDialog .button_shen {
  margin-left: 0px;
}
.mapDialog-other .el-dialog__header {
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
.mapDialog-other .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.mapDialog-other .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.mapDialog-other .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.mapDialog-other .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.mapDialog-other .el-dialog__body .el-form .coverageBox {
  padding: 0 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.mapDialog-other .el-dialog__body .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.mapDialog-other .el-dialog__body .dialogFooter {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mapDialog-other .button_qian,
.mapDialog-other .button_shen {
  margin-left: 0px;
}
.mapDialog .el-input.is-disabled .el-input__inner,
.mapDialog-other .el-input.is-disabled .el-input__inner {
  color: #656565;
  border-color: 1px solid #dcdfe6;
  background-color: #fff;
}
</style>
