<template>
  <div id="Template"
       class="dengbing">
    <div class="templateBox">
      <p class="templateTitle_big">土地利用总体规划专题模板</p>
      <p class="templateTitle">分段设色与等级符号地图</p>
      <el-form :model="dataForm"
               ref="dataForm"
               label-width="100px">
        <el-form-item label="底图选择："
                      prop="baseMap">
          <el-select size="small"
                     v-model="dataForm.baseMap"
                     placeholder="请选择地图底图"
                     style="width:100%;">
            <el-option label="底图选择1"
                       value="底图选择1"></el-option>
            <el-option label="底图选择2"
                       value="底图选择2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政区域："
                      prop="serveArea">
          <el-select size="small"
                     v-model="dataForm.serveArea"
                     placeholder="请选择地图行政区域"
                     style="width:100%;">
            <el-option label="行政区域1"
                       value="行政区域1"></el-option>
            <el-option label="行政区域2"
                       value="行政区域2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分级数量："
                      prop="baseMap">
          <el-select size="small"
                     v-model="dataForm.baseMap"
                     placeholder="请选择地图分级数量"
                     style="width:100%;">
            <el-option label="分级数量1"
                       value="分级数量1"></el-option>
            <el-option label="分级数量2"
                       value="分级数量2"></el-option>
          </el-select>
        </el-form-item>

        <div class="bigtab">
          <ul class="bigtab_title">
            <li @click="turnColor"
                :class="{ active: current == 0 }">
              <input style="display:none;"
                     type="radio"
                     name="tabToggle"
                     value="0" />
              分段设色
            </li>
            <li @click="turnGrade"
                :class="{ active: current == 1 }">
              <input style="display:none;"
                     type="radio"
                     name="tabToggle"
                     value="1" />
              等级符号
            </li>
          </ul>
        </div>
        <div v-if="current == 0">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick"
                   style="width:96%;margin-left:4%;margin-bottom:15px;">
            <el-tab-pane label="添加数据"
                         name="first">
              <div class="tabContent">
                <el-row class="tabContent_row">
                  <el-col :span="10"
                          style="text-align:center;">
                    <span>行政区域</span>
                  </el-col>
                  <el-divider direction="vertical"></el-divider>
                  <el-col :span="14"
                          style="text-align:center;">
                    <span>描述</span>
                  </el-col>
                </el-row>
                <el-row style="margin-top:10px;"
                        v-for="(item, index) in rowList"
                        :key="index">
                  <el-col :span="10"
                          style="display:flex;justify-content:center;">
                    <el-input v-model="item.inputStart"
                              size="small"
                              style="width:85%;"
                              :maxlength="20"></el-input>
                  </el-col>
                  <el-col :span="14"
                          style="display:flex;justify-content:center;">
                    <el-input v-model="item.inputEnd"
                              size="small"
                              style="width:85%;"
                              :maxlength="6"
                              @input="item.inputEnd = item.inputEnd.replace(/[^\d]/g, '')"></el-input>
                  </el-col>
                </el-row>
                <el-button type="primary"
                           size="small"
                           style="margin-top:10px;float:right;margin-right:10px;">预览</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="导入数据"
                         name="second">
              <div class="tabContent"
                   style="padding:10px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                  <el-button size="small">
                    <i class="el-icon-download"></i>下载模板
                  </el-button>

                  <el-button size="small">
                    <i class="el-icon-upload2"></i>上传文件
                  </el-button>

                  <el-button size="small"
                             type="primary">预览</el-button>
                </div>
                <div style="padding:0 10px 10px 10px;background:#F1F1F1;">
                  <div style="display:flex;justify-content:space-between; align-items: center;">
                    <div class="docTitle">广东省城市分段描述.doc</div>
                    <i class="el-icon-delete"></i>
                  </div>
                  <table width="100%"
                         max-width="100%"
                         border="1"
                         cellpadding="4"
                         cellspacing="0"
                         bordercolor="#c5defb"
                         style="table-layout:fixed;text-align:center;background:#fff;">
                    <tr height="30px"
                        style="color:#333;font-weight:bolder;text-align:center;font-size:14px;">
                      <td>人口数量</td>
                      <td>行政区域</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>广州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>深圳市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>东莞市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>中山市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>潮州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>梅州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>河源市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>惠州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>湛江市</td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="数据库获取"
                         name="third">
              <div class="tabContent"
                   style="padding:10px;">
                <el-form-item label="图层数据："
                              prop="coverage">
                  <el-select size="small"
                             v-model="dataForm.coverage"
                             placeholder="请选择"
                             style="width:100%;">
                    <el-option label="土地利用总体规划"
                               value="土地利用总体规划"></el-option>
                    <el-option label="城市利用总体规划"
                               value="城市利用总体规划"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="行政区域："
                              prop="storeArea">
                  <el-select size="small"
                             v-model="dataForm.storeArea"
                             placeholder="请选择"
                             style="width:100%;">
                    <el-option label="土地利用总体规划"
                               value="土地利用总体规划"></el-option>
                    <el-option label="城市利用总体规划"
                               value="城市利用总体规划"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="值："
                              prop="storeNumber">
                  <el-select size="small"
                             v-model="dataForm.storeNumber"
                             placeholder="请选择"
                             style="width:100%;">
                    <el-option label="土地利用总体规划"
                               value="土地利用总体规划"></el-option>
                    <el-option label="城市利用总体规划"
                               value="城市利用总体规划"></el-option>
                  </el-select>
                </el-form-item>
                <div style="display:flex;justify-content:flex-end;">
                  <el-button size="small"
                             type="primary">确认导入</el-button>
                  <el-button size="small"
                             type="primary"
                             style="margin-left:20px;">预览</el-button>
                </div>
                <div style="padding:10px;background:#F1F1F1;margin-top:10px;">
                  <table width="100%"
                         max-width="100%"
                         border="1"
                         cellpadding="4"
                         cellspacing="0"
                         bordercolor="#c5defb"
                         style="table-layout:fixed;text-align:center;background:#fff;">
                    <tr height="30px"
                        style="color:#333;font-weight:bolder;text-align:center;font-size:14px;">
                      <td>人口数量</td>
                      <td>行政区域</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>广州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>深圳市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>东莞市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>中山市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>潮州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>梅州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>河源市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>惠州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>湛江市</td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-form-item label="色带："
                        prop="flowStyle"
                        style="margin-top:10px;">
            <span :style="{
                width: 90 + '%',
                height: 24 + 'px',
                'margin-top': 8 + 'px',
                display: 'block',
                'background-image':
                  'linear-gradient(to right,#FCE0BC 0%,#FCE0BC 25%,#FAD5A4 25%,#FAD5A4 50%,#FACD93 50%,#FACD93 75%,#F8BF74 75%,#F8BF74 100%)'
              }"></span>
          </el-form-item>
          <!-- <el-form-item label="图例：" prop="legend">
          <el-button type="primary">编辑</el-button>
          </el-form-item>-->
          <!-- <el-table :data="legendData" style="width:80%">
          <el-table-column prop="color" label="颜色" width="80"></el-table-column>
          <el-table-column prop="area" label="区间"></el-table-column>
          <el-table-column prop="message" label="描述"></el-table-column>
          </el-table>-->
          <div class="tabContent"
               style="width:96%;margin-left:4%;margin-bottom:15px;">
            <el-row class="tabContent_row">
              <el-col :span="4"
                      style="text-align:center;">
                <span>颜色</span>
              </el-col>
              <el-divider direction="vertical"></el-divider>
              <el-col :span="5"
                      style="text-align:center;">
                <span>最小值</span>
              </el-col>
              <el-divider direction="vertical"></el-divider>
              <el-col :span="5"
                      style="text-align:center;">
                <span>最大值</span>
              </el-col>
              <el-divider direction="vertical"></el-divider>
              <el-col :span="10"
                      style="text-align:center;">
                <span>图例描述</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;"
                    v-for="(item, index) in colorList"
                    :key="index">
              <el-col :span="4"
                      style="display:flex;justify-content:center;">
                <span style="width:24px;height:24px;display:block;background:#FCE0BC;"></span>
              </el-col>
              <el-col :span="5"
                      style="display:flex;justify-content:center;">
                <el-input v-model="item.colorMin"
                          size="small"
                          style="width:85%;"
                          :maxlength="6"
                          @input="item.colorMin = item.colorMin.replace(/[^\d]/g, '')"></el-input>
              </el-col>
              <el-col :span="5"
                      style="display:flex;justify-content:center;">
                <el-input v-model="item.colorMax"
                          size="small"
                          style="width:85%;"
                          :maxlength="6"
                          @input="item.colorMax = item.colorMax.replace(/[^\d]/g, '')"></el-input>
              </el-col>
              <el-col :span="10"
                      style="display:flex;justify-content:center;">
                <el-input v-model="item.colorMessage"
                          size="small"
                          style="width:85%;"
                          :maxlength="20"></el-input>
              </el-col>
            </el-row>
          </div>
          <el-form-item label="边框宽度："
                        prop="sectionProgram">
            <el-select size="small"
                       v-model="dataForm.sectionProgram"
                       placeholder="请选择地图边框宽度"
                       style="width:100%;">
              <el-option label="边框宽度1"
                         value="边框宽度1"></el-option>
              <el-option label="边框宽度2"
                         value="边框宽度2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="边框颜色："
                        prop="colorProgram">
            <el-select size="small"
                       v-model="dataForm.colorProgram"
                       placeholder="请选择地图边框颜色"
                       style="width:100%;">
              <el-option label="边框颜色1"
                         value="边框颜色1"></el-option>
              <el-option label="边框颜色2"
                         value="边框颜色2"></el-option>
              <el-option label="边框颜色3"
                         value="边框颜色3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示数值："
                        prop="showData">
            <el-select size="small"
                       v-model="dataForm.showData"
                       placeholder="请选择地图颜色方案"
                       style="width:100%;">
              <el-option label="是"
                         value="是"></el-option>
              <el-option label="否"
                         value="否"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="current == 1">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick"
                   style="width:90%;">
            <el-tab-pane label="添加数据"
                         name="first">
              <div class="tabContent">
                <el-row class="tabContent_row">
                  <el-col :span="10"
                          style="text-align:center;">
                    <span>行政区域</span>
                  </el-col>
                  <el-divider direction="vertical"></el-divider>
                  <el-col :span="14"
                          style="text-align:center;">
                    <span>描述</span>
                  </el-col>
                </el-row>
                <el-row style="margin-top:10px;"
                        v-for="(item, index) in rowList2"
                        :key="index">
                  <el-col :span="10"
                          style="display:flex;justify-content:center;">
                    <el-input v-model="item.inputStart"
                              size="small"
                              style="width:85%;"
                              :maxlength="20"></el-input>
                  </el-col>
                  <el-col :span="14"
                          style="display:flex;justify-content:center;">
                    <el-input v-model="item.inputEnd"
                              size="small"
                              style="width:85%;"
                              :maxlength="6"
                              @input="item.inputEnd = item.inputEnd.replace(/[^\d]/g, '')"></el-input>
                  </el-col>
                </el-row>
                <el-button type="primary"
                           size="small"
                           style="margin-top:10px;float:right;margin-right:10px;">预览</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="导入数据"
                         name="second">
              <div class="tabContent"
                   style="padding:10px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                  <el-button size="small">
                    <i class="el-icon-download"></i>下载模板
                  </el-button>

                  <el-button size="small">
                    <i class="el-icon-upload2"></i>上传文件
                  </el-button>

                  <el-button size="small"
                             type="primary">预览</el-button>
                </div>
                <div style="padding:0 10px 10px 10px;background:#F1F1F1;">
                  <div style="display:flex;justify-content:space-between; align-items: center;">
                    <div class="docTitle">广东省城市分段描述.doc</div>
                    <i class="el-icon-delete"></i>
                  </div>
                  <table width="100%"
                         max-width="100%"
                         border="1"
                         cellpadding="4"
                         cellspacing="0"
                         bordercolor="#c5defb"
                         style="table-layout:fixed;text-align:center;background:#fff;">
                    <tr height="30px"
                        style="color:#333;font-weight:bolder;text-align:center;font-size:14px;">
                      <td>人口数量</td>
                      <td>行政区域</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>广州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>深圳市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>东莞市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>中山市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>潮州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>梅州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>河源市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>惠州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>湛江市</td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="数据库获取"
                         name="third">
              <div class="tabContent"
                   style="padding:10px;">
                <el-form-item label="图层数据："
                              prop="coverage">
                  <el-select size="small"
                             v-model="dataForm.coverage"
                             placeholder="请选择"
                             style="width:100%;">
                    <el-option label="土地利用总体规划"
                               value="土地利用总体规划"></el-option>
                    <el-option label="城市利用总体规划"
                               value="城市利用总体规划"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="行政区域："
                              prop="storeArea">
                  <el-select size="small"
                             v-model="dataForm.storeArea"
                             placeholder="请选择"
                             style="width:100%;">
                    <el-option label="土地利用总体规划"
                               value="土地利用总体规划"></el-option>
                    <el-option label="城市利用总体规划"
                               value="城市利用总体规划"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="值："
                              prop="storeNumber">
                  <el-select size="small"
                             v-model="dataForm.storeNumber"
                             placeholder="请选择"
                             style="width:100%;">
                    <el-option label="土地利用总体规划"
                               value="土地利用总体规划"></el-option>
                    <el-option label="城市利用总体规划"
                               value="城市利用总体规划"></el-option>
                  </el-select>
                </el-form-item>
                <div style="display:flex;justify-content:flex-end;">
                  <el-button size="small"
                             type="primary">确认导入</el-button>
                  <el-button size="small"
                             type="primary"
                             style="margin-left:20px;">预览</el-button>
                </div>
                <div style="padding:10px;background:#F1F1F1;margin-top:10px;">
                  <table width="100%"
                         max-width="100%"
                         border="1"
                         cellpadding="4"
                         cellspacing="0"
                         bordercolor="#c5defb"
                         style="table-layout:fixed;text-align:center;background:#fff;">
                    <tr height="30px"
                        style="color:#333;font-weight:bolder;text-align:center;font-size:14px;">
                      <td>人口数量</td>
                      <td>行政区域</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>广州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>深圳市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>东莞市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>中山市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>潮州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>梅州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>河源市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>惠州市</td>
                    </tr>
                    <tr height="30px"
                        style="color:#999;">
                      <td>1000</td>
                      <td>湛江市</td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-form-item label="色带："
                        prop="flowStyle"
                        style="margin-top:10px;">
            <span :style="{
                width: 90 + '%',
                height: 24 + 'px',
                'margin-top': 8 + 'px',
                display: 'block',
                'background-image':
                  'linear-gradient(to right,#FCE0BC 0%,#FCE0BC 25%,#FAD5A4 25%,#FAD5A4 50%,#FACD93 50%,#FACD93 75%,#F8BF74 75%,#F8BF74 100%)'
              }"></span>
          </el-form-item>
          <!-- <el-form-item label="图例：" prop="legend">
          <el-button type="primary">编辑</el-button>
          </el-form-item>-->
          <!-- <el-table :data="legendData" style="width:80%">
          <el-table-column prop="color" label="颜色" width="80"></el-table-column>
          <el-table-column prop="area" label="区间"></el-table-column>
          <el-table-column prop="message" label="描述"></el-table-column>
          </el-table>-->
          <div class="tabContent"
               style="width:90%;margin:10px auto;">
            <el-row class="tabContent_row">
              <el-col :span="4"
                      style="text-align:center;">
                <span>颜色</span>
              </el-col>
              <el-divider direction="vertical"></el-divider>
              <el-col :span="5"
                      style="text-align:center;">
                <span>最小值</span>
              </el-col>
              <el-divider direction="vertical"></el-divider>
              <el-col :span="5"
                      style="text-align:center;">
                <span>最大值</span>
              </el-col>
              <el-divider direction="vertical"></el-divider>
              <el-col :span="10"
                      style="text-align:center;">
                <span>图例描述</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;"
                    v-for="(item, index) in colorList2"
                    :key="index">
              <el-col :span="4"
                      style="display:flex;justify-content:center;">
                <span style="width:24px;height:24px;display:block;background:#FCE0BC;"></span>
              </el-col>
              <el-col :span="5"
                      style="display:flex;justify-content:center;">
                <el-input v-model="item.colorMin"
                          size="small"
                          style="width:85%;"
                          :maxlength="6"
                          @input="item.colorMin = item.colorMin.replace(/[^\d]/g, '')"></el-input>
              </el-col>
              <el-col :span="5"
                      style="display:flex;justify-content:center;">
                <el-input v-model="item.colorMax"
                          size="small"
                          style="width:85%;"
                          :maxlength="6"
                          @input="item.colorMax = item.colorMax.replace(/[^\d]/g, '')"></el-input>
              </el-col>
              <el-col :span="10"
                      style="display:flex;justify-content:center;">
                <el-input v-model="item.colorMessage"
                          size="small"
                          style="width:85%;"
                          :maxlength="20"></el-input>
              </el-col>
            </el-row>
          </div>
          <el-form-item label="显示形状："
                        prop="sectionProgram">
            <el-select size="small"
                       v-model="dataForm.sectionProgram"
                       placeholder="请选择地图显示形状"
                       style="width:100%;">
              <el-option label="显示形状1"
                         value="显示形状1"></el-option>
              <el-option label="显示形状2"
                         value="显示形状2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示数值："
                        prop="showData">
            <el-select size="small"
                       v-model="dataForm.showData"
                       placeholder="请选择地图颜色方案"
                       style="width:100%;">
              <el-option label="是"
                         value="是"></el-option>
              <el-option label="否"
                         value="否"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-button type="primary"
                   size="medium"
                   style="margin:20px 0;float:right;"
                   @click="handleClickSave">保存专题</el-button>
      </el-form>
    </div>
    <div style="display:flex;flex-direction: column;align-items: flex-end;flex:1;height:100%;">
      <div class="buttonBox">
        <el-button size="medium"
                   type="info"
                   class="skipBox"
                   @click="handleClickSkip">退出</el-button>
      </div>
      <!-- <div id="mapBox" ref="chinaChart"></div> -->
      <img src="../../../../assets/images/ColorGrade.png"
           alt
           width="100%"
           height="95%"
           style="border-top: 1px dashed #999; border-left: 1px dashed #999; box-sizing: border-box;" />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import echarts from 'echarts'
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  data () {
    return {
      dataForm: {},
      activeName: 'first',
      checked: true,
      legendData: [
        {
          color: 'black',
          area: '广州市',
          message: '广州市'
        },
        {
          color: 'black',
          area: '深圳市',
          message: '深圳市'
        },
        {
          color: 'black',
          area: '河源市',
          message: '河源市'
        },
        {
          color: 'black',
          area: '梅州市',
          message: '梅州市'
        }
      ],

      chart: null,
      timeFn: null,
      mapCode: '',
      pro: {
        内蒙古: '../../../../../static/map/json/province/neimenggu.json',
        天津: '../../../../../static/map/json/province/tianjin.json',
        河北: '../../../../../static/map/json/province/hebei.json',
        山西: '../../../../../static/map/json/province/shanxi.json',
        江苏: '../../../../../static/map/json/province/jiangsu.json',
        浙江: '../../../../../static/map/json/province/zhejiang.json',
        山东: '../../../../../static/map/json/province/shandong.json',
        河南: '../../../../../static/map/json/province/henan.json',
        湖北: '../../../../../static/map/json/province/hubei.json',
        湖南: '../../../../../static/map/json/province/hunan.json',
        广东: '../../../../../static/map/json/province/guangdong.json',
        重庆: '../../../../../static/map/json/province/chongqing.json',
        四川: '../../../../../static/map/json/province/sichuan.json',
        云南: '../../../../../static/map/json/province/yunnan.json',
        新疆: '../../../../../static/map/json/province/xinjiang.json',
        青海: '../../../../../static/map/json/province/qinghai.json',
        香港: '../../../../../static/map/json/province/xianggang.json',
        澳门: '../../../../../static/map/json/province/aomen.json',
        北京: '../../../../../static/map/json/province/beijing.json',
        辽宁: '../../../../../static/map/json/province/liaoning.json',
        吉林: '../../../../../static/map/json/province/jilin.json',
        黑龙江: '../../../../../static/map/json/province/heilongjiang.json',
        上海: '../../../../../static/map/json/province/shanghai.json',
        安徽: '../../../../../static/map/json/province/anhui.json',
        福建: '../../../../../static/map/json/province/fujian.json',
        江西: '../../../../../static/map/json/province/jiangxi.json',
        广西: '../../../../../static/map/json/province/guangxi.json',
        海南: '../../../../../static/map/json/province/hainan.json',
        贵州: '../../../../../static/map/json/province/guizhou.json',
        西藏: '../../../../../static/map/json/province/xizang.json',
        陕西: '../../../../../static/map/json/province/shanxi.json',
        甘肃: '../../../../../static/map/json/province/gansu.json',
        宁夏: '../../../../../static/map/json/province/ningxia.json',
        台湾: '../../../../../static/map/json/province/taiwan.json'
      },
      allData: [
        {
          name: '北京'
        },
        {
          name: '天津'
        },
        {
          name: '上海'
        },
        {
          name: '重庆'
        },
        {
          name: '河北'
        },
        {
          name: '河南'
        },
        {
          name: '云南'
        },
        {
          name: '辽宁'
        },
        {
          name: '黑龙江'
        },
        {
          name: '湖南'
        },
        {
          name: '安徽'
        },
        {
          name: '山东'
        },
        {
          name: '新疆'
        },
        {
          name: '江苏'
        },
        {
          name: '浙江'
        },
        {
          name: '江西'
        },
        {
          name: '湖北'
        },
        {
          name: '广西'
        },
        {
          name: '甘肃'
        },
        {
          name: '山西'
        },
        {
          name: '内蒙古'
        },
        {
          name: '陕西'
        },
        {
          name: '吉林'
        },
        {
          name: '福建'
        },
        {
          name: '贵州'
        },
        {
          name: '广东'
        },
        {
          name: '青海'
        },
        {
          name: '西藏'
        },
        {
          name: '四川'
        },
        {
          name: '宁夏'
        },
        {
          name: '海南'
        },
        {
          name: '台湾'
        },
        {
          name: '香港'
        },
        {
          name: '澳门'
        }
      ],

      rowList: [{ inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }],
      rowList2: [{ inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }, { inputStart: '', inputEnd: '' }],

      colorList: [{ colorMin: '', colorMax: '', colorMessage: '' }, { colorMin: '', colorMax: '', colorMessage: '' }, { colorMin: '', colorMax: '', colorMessage: '' }, { colorMin: '', colorMax: '', colorMessage: '' }],
      colorList2: [{ colorMin: '', colorMax: '', colorMessage: '' }, { colorMin: '', colorMax: '', colorMessage: '' }, { colorMin: '', colorMax: '', colorMessage: '' }, { colorMin: '', colorMax: '', colorMessage: '' }],
      current: 0
    }
  },
  methods: {
    handleClickSkip () {
      let routerPath = 'makeTemplate'
      this.$router.push({ path: routerPath })
    },
    handleClickSave () {
      let routerPath = 'saveTemplate'
      this.$router.push({ path: routerPath })
    },
    turnColor () {
      this.current = 0
      this.activeName = first
    },
    turnGrade () {
      this.current = 1
      this.activeName = first
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async loadMap (mapCode, name) {
      const that = this
      const data = await axios.get(mapCode)
      if (data) {
        this.chart = echarts.init(this.$refs.chinaChart)
        echarts.registerMap(name, data)
        var option = {
          tooltip: {
            show: true,
            formatter: function (params) {
              if (params.data) return params.name + '：' + params.data['value']
            }
          },
          visualMap: {
            type: 'continuous',
            text: ['', ''],
            showLabel: true,
            left: '50',
            min: 0,
            max: 100,
            inRange: {
              color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096']
            },
            splitNumber: 0
          },
          series: [
            {
              name: 'MAP',
              type: 'map',
              mapType: name,
              selectedMode: 'false', // 是否允许选中多个区域
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data: this.allData
            }
          ]
        }
        this.chart.setOption(option)
        this.chart.on('click', function (params) {
          clearTimeout(this.timeFn)
          this.timeFn = setTimeout(function () {
            const name = params.name
            const mapCode = that.pro[name]
            console.log(mapCode, name)
            if (!mapCode) {
              alert('无此区域地图')
            }
            that.loadMap(mapCode, name)
          }, 250)
        })
      } else {
        alert('无法加载该地图')
      }
    },
    initEchart () {
      window.addEventListener('resize', () => {
        this.chart = echarts.init(this.$refs.chinaChart)
        document.getElementById('mapBox').style.width = 100 + '%'
        this.chart.resize() // 直接加这句即可
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.loadMap(
          '../../../../../static/map/json/province/guangdong.json',
          '广东'
        )
      }, 1000)
    })
    this.initEchart()
  },
  created () {
    for (var i = 0; i < this.allData.length; i++) {
      this.allData[i].value = Math.round(Math.random() * 100)
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
}
</script>
<style scoped>
#Template {
  width: 100%;
  height: 100%;
  padding: 20px 0 0 30px;
  position: relative;
  display: flex;
  justify-content: flex-start;
}
.skipBox {
  position: absolute;
  top: 15px;
  right: 30px;
}
.templateBox {
  width: 25%;
  height: 100%;
  float: left;
  background-color: #fff;
  padding-right: 30px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.templateBox::-webkit-scrollbar {
  display: none;
}
.templateTitle_big {
  font-size: 16px;
  font-weight: bold;
}
.templateTitle {
  font-size: 15px;
  line-height: 30px;
  margin-bottom: 10px;
}
.tabContent {
  height: 250px;
  overflow: auto;
  border: 2px solid #666;
  padding-bottom: 10px;
}
.tabContent_row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f1f1f1;
  height: 32px;
}
.docTitle {
  font-size: 14px;
  font-weight: bold;
  line-height: 50px;
}
#mapBox {
  width: 100%;
  height: 95%;
  float: left;
  background-color: #fff;
  border-top: 1px dashed #999;
  border-left: 1px dashed #999;
  box-sizing: border-box;
}
.buttonBox {
  width: 100%;
  height: 7%;
  background-color: #fff;
}
.bigtab {
  width: 100%;
  height: 30px;
  margin: 10px 0;
}
.bigtab_title {
  width: 100%;
  height: 30px;
  display: flex;
}
.bigtab_title li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #dcdcdc;
  color: #979797;
}
.bigtab_title li.active {
  background-color: #1d7ce4;
  color: #fff;
}
@media screen and (max-width: 1599px) {
  #Template {
    width: calc(100% + 74px);
    /* height: 200px; */
    position: absolute;
    left: -74px;
    z-index: 88;
    overflow: auto;
  }
}
</style>
<style>
.dengbing .el-table__header tr,
.dengbing .el-table__header th {
  padding: 0;
  height: 40px;
}
.dengbing .el-table__body tr,
.dengbing .el-table__body td {
  padding: 0;
  height: 40px;
}
.dengbing .el-table {
  margin: 0 auto;
  margin-bottom: 20px;
}
.dengbing .el-tabs {
  margin: 0 auto;
}
.dengbing .el-form-item {
  margin-bottom: 5px;
}
</style>
