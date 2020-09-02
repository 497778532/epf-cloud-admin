<template>
  <!-- <div>分屏对比</div> -->
  <div id="splitScreen">
    <div class="screenContent">
      <div class="screenContent_title">分屏对比</div>
      <!-- <div class="screenTxt">对比范围：</div>

      <el-upload
        class="fileBox"
        ref="additionalRef"
        action="/epf-document/document/upload/"
        :before-upload="fileFormatChecking"
        :http-request="annexUpload"
        :on-success="uploadSuccess"
        :on-error="upLoadError"
        :show-file-list="false"
        v-if="this.isLookFileName==false"
      >
        <el-button
          size="medium"
          round
          icon="el-icon-upload2"
          style="margin-bottom:5px;margin-top:15px;"
        >上传文件</el-button>
        <div slot="tip" style="color:#999;">
          支持扩展名：
          <span v-for="(item,index) in extName" :key="index">.{{item}}</span>
        </div>
      </el-upload>-->

      <div class="fileNameBox"
           v-if="this.isLookFileName == true">
        <el-input :disabled="true"
                  size="medium"
                  prefix-icon="el-icon-paperclip"
                  v-model="fileName"
                  style="width:90%;"
                  :maxlength="50"></el-input>
        <i class="el-icon-delete"
           style="width:8%;text-align:right;"
           @click="handleClickDelName"></i>
      </div>
      <div class="screenTxt">图层选择：</div>
      <ul>
        <li class="coverageBox"
            v-for="(item, index) in legendList"
            :key="index">
          <div class="coverageMsg">
            <span style="font-weight:600;width:40px;">屏幕{{ index + 1 }}</span>
            <span style="width:80px;">{{ item.legendName }}</span>
            <el-button size="mini"
                       type="primary"
                       @click="handleClicklegend(index)"
                       v-if="index != limit">图例</el-button>
            <el-button size="mini"
                       type="info"
                       @click="handleClicklegend(index)"
                       v-if="index == limit">图例</el-button>
            <el-button size="mini"
                       type="primary"
                       @click="handleClickSelect(index)">选择</el-button>
            <i class="el-icon-delete"
               @click="handleClickDellegend(index)"></i>
          </div>
          <div class="legendBox"
               v-show="item.showLegend"
               :id="forId(index)"></div>
        </li>
      </ul>
    </div>
    <div class="rightBox">
      <div class="rightBox_tab">
        <el-radio-group v-model="radio"
                        style="margin-left:25px;height:30px;display:flex;align-items: center;">
          <el-radio :label="item.value"
                    :key="item.value"
                    v-for="item in screenList"
                    @change="toggleCycle(item)">{{ item.label }}</el-radio>
        </el-radio-group>
        <el-button size="medium"
                   type="info"
                   class="skipBox"
                   @click="handleClickSkip">退出</el-button>
      </div>

      <div class="screenBigBox">
        <div :class="{
            screenBigBox1: radio == '1',
            screenBigBox2: radio == '2',
            screenBigBox3: radio == '3'
          }"
             v-show="radio == '1' || radio == '2' || radio == '3'">
          <div class="screenBox"
               :class="{
              screenBox1: radio == '1',
              screenBox2: radio == '2',
              screenBox3: radio == '3'
            }"
               v-for="(item, index) in viewListPart1"
               :key="index">
            <div class="screenTitle">
              <span>屏幕{{ index + 1 }}</span>
              <span>{{ item.screenName }}</span>
              <el-button-group>
                <el-button :type="item.islinkage == true ? 'primary' : 'info'"
                           size="small"
                           @click="setLinkedState(1, index, true)">联动</el-button>
                <el-button :type="item.islinkage == false ? 'primary' : 'info'"
                           size="small"
                           @click="setLinkedState(1, index, false)">非联动</el-button>
              </el-button-group>
            </div>
            <mapview :name="item.id"
                     :linked="true"
                     :widgetConf="widgetConf">
              <div class="toolbar">
                <zoom></zoom>
                <pan></pan>
                <!-- <attributes></attributes> -->
              </div>
            </mapview>
          </div>
        </div>

        <div :class="{ screenBigBox2: radio == '2', screenBigBox3: radio == '3' }"
             v-show="radio == '2' || radio == '3'">
          <div class="screenBox"
               :class="{ screenBox2: radio == '2', screenBox3: radio == '3' }"
               v-for="(item, index) in viewListPart2"
               :key="index">
            <div class="screenTitle">
              <span>屏幕{{ index + 3 }}</span>
              <span>{{ item.screenName }}</span>
              <el-button-group>
                <el-button :type="item.islinkage == true ? 'primary' : 'info'"
                           size="small"
                           @click="setLinkedState(2, index, true)">联动</el-button>
                <el-button :type="item.islinkage == false ? 'primary' : 'info'"
                           size="small"
                           @click="setLinkedState(2, index, false)">非联动</el-button>
              </el-button-group>
            </div>
            <mapview :name="item.id"
                     :linked="true"
                     :widgetConf="widgetConf">
              <div class="toolbar">
                <zoom></zoom>
                <pan></pan>
                <!-- <attributes></attributes> -->
              </div>
            </mapview>
          </div>
        </div>

        <div :class="{ screenBigBox3: radio == '3' }"
             v-show="radio == '3'">
          <div class="screenBox"
               :class="{ screenBox3: radio == '3' }"
               v-for="(item, index) in viewListPart3"
               :key="index">
            <div class="screenTitle">
              <span>屏幕{{ index + 5 }}</span>
              <span>{{ item.screenName }}</span>
              <el-button-group>
                <el-button :type="item.islinkage == true ? 'primary' : 'info'"
                           size="small"
                           @click="setLinkedState(3, index, true)">联动</el-button>
                <el-button :type="item.islinkage == false ? 'primary' : 'info'"
                           size="small"
                           @click="setLinkedState(3, index, false)">非联动</el-button>
              </el-button-group>
            </div>
            <mapview :name="item.id"
                     :linked="true"
                     :widgetConf="widgetConf">
              <div class="toolbar">
                <zoom></zoom>
                <pan></pan>
                <!-- <attributes></attributes> -->
              </div>
            </mapview>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-for="(item, index) in directoryTrees"
               :key="index"
               title="选择服务"
               :visible.sync="item.visible"
               width="500px">
      <div class="visibleBox">
        <controllerResource :ref="item.name"
                            :data="treeData2"
                            :EPFDefaultProps="defaultProps"
                            :filterText="filterText"
                            @EPFcheckChange="treeChangeClick"
                            style="width:100%"
                            @EPFradioChange="radioChange">
          <template slot="input"
                    slot-scope="">
            <el-input placeholder="输入服务关键字进行过滤"
                      suffix-icon="el-icon-search"
                      style="margin-top:10px;"
                      v-model="filterText"
                      :maxlength="50"></el-input>
          </template>
          <!-- v-if="showRadio(node,data)" -->
          <!-- <template slot="radio" slot-scope="scope">
            <el-radio-group v-model="radio" @change="radioChange">
              <el-radio :label="scope.row">
                <span>{{scope.row.name}}</span>
              </el-radio>
            </el-radio-group>
          </template>-->
        </controllerResource>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleCancelClick">取 消</el-button>
        <el-button type="primary"
                   @click="sureTemplate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mapview from './toolbarItem/mapview/main.vue'
import controllerResource from '../onemap/controller/controllerResourceCommon'

import zoom from './toolbarItem/zoom'
import pan from './toolbarItem/pan/widget'
import attributes from './toolbarItem/attributes'

export default {
  computed: {},
  components: {
    mapview,
    controllerResource,
    zoom,
    pan,
    attributes
  },
  data () {
    return {
      MapAppFactory: null,
      directoryTrees: [],
      widgetConf: {
        widgets: [
          {
            name: 'Compass',
            position: 'customRight'
          },
          {
            name: 'Home',
            position: 'customRight'
          },
          {
            name: 'ScaleBar',
            position: 'bottom-left'
          },
          {
            name: 'BasemapGallery',
            position: 'bottom-right'
          }
        ]
      },
      showLegend: false,
      radio: '',
      filterText: '',
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      treeData2: [],
      extName: ['shp', 'txt'],
      docSize: 10, // 自定义上传文件大小限制，单位 MB
      fileNameList: [],
      fileName: '',
      isLookFileName: false,
      limit: -1,
      dialogVisible: false,
      isClear: true,
      radio: '1',
      screenList: [
        {
          value: '1',
          label: '双屏'
        },
        {
          value: '2',
          label: '四屏'
        },
        {
          value: '3',
          label: '六屏'
        }
      ],
      current: 0,
      islinkage: false,
      idList: [],
      viewList: [
        {
          id: 'mapdiv1',
          islinkage: '',
          screenName: '请选择图层',
          disable: true
        },
        {
          id: 'mapdiv2',
          islinkage: '',
          screenName: '请选择图层',
          disable: true
        }
      ],
      viewListPart1: [
        {
          id: 'mapdiv1',
          islinkage: '',
          screenName: '请选择图层',
          disable: true
        },
        {
          id: 'mapdiv2',
          islinkage: '',
          screenName: '请选择图层',
          disable: true
        }
      ],
      viewListPart2: [
        {
          id: 'mapdiv3',
          islinkage: '',
          screenName: '请选择图层',
          disable: false
        },
        {
          id: 'mapdiv4',
          islinkage: '',
          screenName: '请选择图层',
          disable: false
        }
      ],
      viewListPart3: [
        {
          id: 'mapdiv5',
          islinkage: '',
          screenName: '请选择图层',
          disable: false
        },
        {
          id: 'mapdiv6',
          islinkage: '',
          screenName: '请选择图层',
          disable: false
        }
      ],
      legendList: [
        {
          legendName: '请选择图层',
          showLegend: false
        },
        {
          legendName: '请选择图层',
          showLegend: false
        }
      ],
      screenWidth: 50,
      screenHeight: 100,
      searchList: '',
      treeData: [],
      screenSelectData: [],
      screenIndex: '',
      serverData: [],
      linkedState: {},
      gisConstructor: {},
      gisInstance: {},
      selectLayerData: {},
      slelectedLayers: [
        {
          legendName: '请选择图层',
          showLegend: false
        },
        {
          legendName: '请选择图层',
          showLegend: false
        },
        {
          legendName: '请选择图层',
          showLegend: false
        },
        {
          legendName: '请选择图层',
          showLegend: false
        },
        {
          legendName: '请选择图层',
          showLegend: false
        },
        {
          legendName: '请选择图层',
          showLegend: false
        }
      ]
    }
  },
  methods: {
    handleCancelClick () {
      this.handleClickDellegend(this.screenIndex)
      this.directoryTrees[this.screenIndex].visible = false
      this.$refs[this.directoryTrees[this.screenIndex].name][0].radio = {}
    },
    forId (index) {
      return `legend_${index}`
    },
    toggleCycle (item) {
      const me = this
      this.radio = item.value
      this.viewList = []
      if (this.MapAppFactory) {
        this.MapAppFactory = this.$findMapAppFactory()
      }
      if (this.radio == '1') {
        this.viewList = [...this.viewListPart1]
        this.legendList = this.slelectedLayers.slice(0, 2)
        const viewListPart = [...this.viewListPart2, ...this.viewListPart3]
        viewListPart.forEach(viewitem => {
          me.MapAppFactory.removeEventLinstener(viewitem.id)
        })
      } else if (this.radio == '2') {
        this.viewList = [...this.viewListPart1, ...this.viewListPart2]
        this.legendList = this.slelectedLayers.slice(0, 4)
        this.viewListPart2.forEach(viewitem => {
          me.MapAppFactory.addEventLinstener(viewitem.id)
        })
        this.viewListPart3.forEach(viewitem => {
          me.MapAppFactory.removeEventLinstener(viewitem.id)
        })
      } else if (this.radio == '3') {
        const viewListPart = [...this.viewListPart2, ...this.viewListPart3]
        viewListPart.forEach(viewitem => {
          this.MapAppFactory.addEventLinstener(viewitem.id)
        })
        this.viewList = [
          ...this.viewListPart1,
          ...this.viewListPart2,
          ...this.viewListPart3
        ]
        this.legendList = this.slelectedLayers.slice(0, 6)
      }

      var idList = []
      for (var key in this.viewList) {
        idList.push(this.viewList[key].id)
      }
      this.idList = idList
    },

    fileFormatChecking (file) {
      // 附件上传格式验证
      let extName = file.name.split('.').slice(-1)[0]
      const fileTyState = this.extName.indexOf(extName)
      let docSize = file.size / 1024 / 1024 < this.docSize
      if (fileTyState == -1) {
        this.$message.error(`上传附件不能是 ${extName} 格式!`)
        return false
      }
      if (!docSize) {
        this.$message.error(`上传附件大小不能超过 ${this.docSize} MB!`)
        return false
      }
      this.isLookFileName = true
      this.fileName = file.name
    },
    annexUpload (files) {
      // 附件上传
      const file = files.file
      const formData = new FormData()
      formData.append('files', file)
      this.uploadFunction(formData, files)
    },
    uploadFunction (formData, files) {
      // 上传方法

      this.$useAppend('/epf-document/document/upload', formData).then(res => {
        if (res.state == 'SUCCESS') {
          files.onSuccess(res)
          this.$message.success('上传成功!')
        }
      })
    },
    async uploadSuccess (res, file, fileList) {
      // 上传成功回调

      let fileObject = {
        fname: res.data[0].name,
        fid: res.data[0].id,
        fsize: res.data[0].docSize,
        ftype: res.data[0].extName
      }
      this.isLookFileName = true
      this.fileName = file.name

      let id = fileObject.fid
      let parseRes = await this.$get(
        `/epf-onemap/admin/mapgeodoucment/getGeoJson?id=${id}`
      )
      console.log(parseRes)
    },
    upLoadError () {
      // 上传失败回调
      this.$message.error('文件上传失败啦')
    },

    digui2 (array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].childs.length > 0) {
          this.digui2(array[i].childs)
        } else {
          if (array[i].services && array[i].services.length > 0) {
            array[i].childs = array[i].childs.concat(array[i].services)
          }
        }
      }
      return array
    },

    getChidlren (mydata) {
      const that = this
      var result
      var fn = function (data) {
        if (Array.isArray(data) && data.length) {
          // 判断是否是数组并且没有的情况下，
          data.forEach(item => {
            if (Array.isArray(item.services) && item.services.length) {
              item.services.forEach(servicesItem =>
                that.$set(servicesItem, 'topicTemplateId', true)
              )
              // 数据循环每个子项，并且判断子项下边是否有id值
              item.childs = item.childs.concat(item.services) // 返回的结果等于每一项
            } else if (item.childs.length) {
              fn(item.childs) // 递归调用下边的子项
            }
          })
        }
        result = data
      }
      fn(mydata)

      return result
    },
    handleClickDelName () {
      this.isLookFileName = false
      this.fileName = ''
    },
    handleClicklegend (index) {
      if (this.legendList[index].legendName !== '请选择图层') {
        if (index == this.limit) {
          this.limit = -1
        } else {
          this.limit = index
        }
        this.legendList[index].showLegend = !this.legendList[index].showLegend
        if (this.legendList[index].showLegend) {
          const el = document.querySelector(`#legend_${index}`)
          let mapApp = this.findMapApp(index)
          if (!mapApp.widgetInstance.legend) {
            mapApp.createLegend(el)
          }
        }
      }
    },
    handleClickDellegend (index) {
      this.legendList[index].legendName = '请选择图层'
      this.$refs[this.directoryTrees[index].name][0].radio = {}
      this.selectLayerData.id = null
      let currentMapApp = this.findMapApp(index)
      if (currentMapApp) {
        currentMapApp.removeAllLayer()
      }
    },
    handleClickSelect (index) {
      this.directoryTrees[index].visible = true
      this.screenIndex = index
      this.isClear = true
    },
    handleCheckChange () {
      let res = this.$refs.tree.getCheckedNodes()
      let arr = []
      res.forEach(item => {
        arr.push(item.id)
      })
    },
    radioChange (data) {
      this.selectLayerData = this.$deepClone(data)
    },
    handleClickSkip () {
      let routerPath = 'onemap'
      this.$router.push({ path: routerPath })
    },

    findMapApp (index) {
      let mapApps = this.MapAppFactory.mapApps
      const arrMapAppName = Object.keys(this.MapAppFactory.mapApps)
      return mapApps[arrMapAppName[index]]
    },
    sureTemplate () {
      let me = this
      let id = this.selectLayerData.id
      if (!id) {
        this.$message.error('请先选择服务。')
        return
      }

      this.$post('/epf-onemap/admin/mapservices/getById', { id: id }).then(
        res => {
          if (res.code === 0) {
            me.screenSelectData = {
              title: res.services.serviceName,
              url: res.services.url,
              type: res.services.serviceType,
              id: res.services.id
            }
            if (res.services.url.indexOf('19.15.73.111') > 0) {
              me.screenSelectData.useProxy = false
            }
            // me.screenSelectData = {
            //   title: res.services.serviceName,
            //   url: "http://19.15.73.111/arcgisserver12/rest/services/试评价结果/生态保护等级评价结果/MapServer",
            //   type: "image",
            //   id: res.services.id,
            //   useProxy:  false,
            // };

            let currentMapApp = me.findMapApp(me.screenIndex)
            currentMapApp.removeAllLayer()
            currentMapApp.addLayerToMap(me.screenSelectData)
            me.slelectedLayers[me.screenIndex] = {
              legendName: me.screenSelectData.title
            }

            this.directoryTrees[this.screenIndex].visible = false
            me.isClear = false

            me.legendList[me.screenIndex].legendName
              = me.screenSelectData.title

            if (me.screenIndex === 0) {
              me.viewListPart1[0].screenName = me.screenSelectData.title
            }
            if (me.screenIndex === 1) {
              me.viewListPart1[1].screenName = me.screenSelectData.title
            }
            if (me.screenIndex === 2) {
              me.viewListPart2[0].screenName = me.screenSelectData.title
            }
            if (me.screenIndex === 3) {
              me.viewListPart2[1].screenName = me.screenSelectData.title
            }
            if (me.screenIndex === 4) {
              me.viewListPart3[0].screenName = me.screenSelectData.title
            }
            if (me.screenIndex === 5) {
              me.viewListPart3[1].screenName = me.screenSelectData.title
            }
          } else {
            me.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    getMessageData (val) {
      console.log(val)
      this.screenSelectData = val
    },
    treeChangeClick (obj, bol, have) {
      let me = this
      if (bol) {
        if (this.serverData.some(item => item.id == obj.id)) {
          return
        }
        this.serverData.push(obj)
      } else {
        this.serverData.forEach((item, index) => {
          if (item.id === obj.id) {
            this.serverData.splice(index, 1)
          }
        })
      }
      this.$post('/epf-onemap/admin/mapservices/getById', { id: obj.id }).then(
        res => {
          if (res.code == '0') {
            if (!res.services) return
            const layerConfig = {
              title: res.services.serviceName || '',
              url: res.services.url || '',
              type: res.services.serviceType || 'feature',
              id: res.services.id
            }
            let mapApps = me.MapAppFactory.mapApps
            const arrMapAppName = Object.keys(me.MapAppFactory.mapApps)
            let currentMapApp = mapApps[arrMapAppName[me.screenIndex]]
            let layer = currentMapApp.findLayerById(layerConfig.id)
            if (layer) {
              currentMapApp.setLayerVisiblity(layerConfig.id, bol)
            } else {
              currentMapApp.addLayerToMap(layerConfig)
            }
          } else {
            me.$message.error(res.msg) // 失败
            return
          }
        }
      )
    },
    getTreeAdmin () {
      this.$post('/epf-onemap/admin/mapdiretree/getResourceDir', {
        needLayer: true
      }).then(res => {
        console.log(res)
        if (res.code == '0') {
          res.result = JSON.parse(
            JSON.stringify(res.result).replace(/serviceName/g, 'name')
          )
          this.treeData2 = this.getChidlren(res.result[0].childs)
        } else {
          this.$message.error(res.msg) // 失败
          return
        }
      })
    },
    handleClickSearch () {
      // let params=this.searchList;
      this.$get(
        `/epf-search/es/homePage/queryPage?key=${this.searchList}&type=03`
      ).then(res => {
        console.log(res)
      })
    },
    setLinkedState (part, index, linkedState) {
      let currentPartObj = this[`viewListPart${part}`][index]
      let currentMapApp = this.MapAppFactory.mapApps[currentPartObj.id]
      currentPartObj.islinkage = linkedState
      if (linkedState && currentMapApp.linkedState) {
        return
      }
      if (!linkedState && !currentMapApp.linkedState) {
        return
      }
      if (this.MapAppFactory) {
        this.MapAppFactory.setMappAppState(currentPartObj.id)
      }
    }
  },
  created () {
    for (let i = 0; i < 6; i++) {
      this.directoryTrees.push({ name: `directoryTree${i}`, visible: false })
    }
    this.getTreeAdmin()
    this.viewList = [...this.viewListPart1]
    const that = this
    for (var key in that.viewListPart1) {
      if (!that.viewListPart1[key].islinkage) {
        that.$set(that.viewListPart1[key], 'islinkage', true)
      }
    }
    for (var key in that.viewListPart2) {
      if (!that.viewListPart2[key].islinkage) {
        that.$set(that.viewListPart2[key], 'islinkage', true)
      }
    }
    for (var key in that.viewListPart3) {
      if (!that.viewListPart3[key].islinkage) {
        that.$set(that.viewListPart3[key], 'islinkage', true)
      }
    }
    var idList = []
    for (var key in this.viewList) {
      idList.push(this.viewList[key].id)
    }
    this.idList = idList
  },
  mounted () {
    this.MapAppFactory = this.$findMapAppFactory()
  },

  watch: {
    searchList (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>
<style scoped>
@import "./toolbarItem/style.css";
.esri-view-root.esri-view-root {
  height: 100%;
}
#splitScreen {
  width: 100%;
  height: 100%;
  position: relative;
}
.skipBox {
  position: absolute;
  top: 15px;
  right: 20px;
}
.screenContent {
  width: 22%;
  height: 100%;
  background-color: #fff;
  padding: 20px 10px 20px 20px;
  float: left;
  overflow: auto;
}
.screenContent_title {
  font-size: 18px;
  color: #1d7ce4;
  font-weight: bold;
  margin-bottom: 40px;
}
.screenTxt {
  font-size: 16px;
  margin-bottom: 15px;
}
.fileBox {
  height: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}
.fileNameBox {
  height: 85px;
  display: flex;
  align-items: center;
  margin: 20px 0;
}
.coverageBox {
  box-sizing: border-box;
  padding: 3px;
  border-bottom: 1px solid #999;
}
.coverageMsg {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.legendBox {
  width: 100%;
  height: 300px;
  padding: 10px;
  margin-top: 3px;
  border: 1px solid #666;
}
.legendTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
}
.rightBox {
  width: 78%;
  height: 100%;
  float: left;
  padding: 20px 20px 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.rightBox_tab {
  display: flex;
  justify-content: space-between;
}
.screenBigBox {
  width: 100%;
  display: flex;
  flex: 111;
  flex-wrap: wrap;
  margin-top: 5px;
}
.screenBigBox1 {
  width: 100%;
  height: 100%;
  display: flex;
}
.screenBigBox2 {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.screenBigBox3 {
  width: 33.33%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.screenBox {
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #000;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.screenBox1 {
  width: 100%;
  height: 100%;
}
.screenBox2 {
  width: 100%;
  height: 100%;
}
.screenBox3 {
  width: 100%;
  height: 100%;
}

.screenTitle {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
  box-shadow: 0px 4px 4px #999;
  padding: 10px;
  /* position: absolute;
  top: 0;
  z-index: 999; */
}
.imgBox {
  width: 100%;
  /* height: calc(100% - 40px); */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.visibleBox {
  width: 100%;
  height: 100%;
  border: 1px solid #666;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.visibleBox_search {
  width: 70%;
  margin: 5px 0;
}

@media screen and (max-width: 1599px) {
  #splitScreen {
    width: calc(100% + 74px);
    position: absolute;
    left: -74px;
    z-index: 88;
    overflow: auto;
  }
}
</style>
<style>
#splitScreen .el-icon-delete {
  cursor: pointer;
}
#splitScreen .el-dialog__footer {
  border-top: 0px solid #dddddd;
}
#splitScreen .el-dialog {
  width: 450px;
}
#splitScreen .el-dialog__body {
  padding: 10px 20px;
}
#splitScreen .el-dialog__header {
  border-bottom: 0px solid rgb(226, 226, 226);
}
#splitScreen .epf-tree {
  height: 100%;
  padding: 10px;
}
#splitScreen .epf-tree .el-scrollbar {
  border: 0px solid #d5d5d5;
  margin: 10px 0 20px 0;
}
#splitScreen .el-dialog__body {
  height: 600px;
}
/* #splitScreen .esri-component {
  position: absolute;
  right: -7px;
  top: 41px;
} */
</style>
