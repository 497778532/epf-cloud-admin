<template>
  <!-- <div>预览地图服务</div> -->
  <div class="page-body"
       :view-id="newRender">
    <div class="preview_wrap"
         style="margin-bottom:16px;">
      <div class="switchHeight_box">
        <p class="preview_title">地图服务信息</p>
        <div style="padding:0 20px;margin:10px 0;">
          <table width="100%"
                 cellpadding="0"
                 cellspacing="0">
            <tr height="35px">
              <td>
                <span class="labelFont">服务编号：</span>
                {{mapData.serviceCode}}
              </td>
              <td>
                <span class="labelFont">服务简介：</span>
                {{mapData.remarks}}
              </td>
              <td>
                <span class="labelFont">坐标系：</span>
                {{mapData.coordinateSys}}
              </td>
              <td>
                <span class="labelFont">XMin：</span>
                {{mapData.longitudeLeft}}
              </td>
            </tr>
            <tr height="35px">
              <td>
                <span class="labelFont">数据名称：</span>
                {{mapData.dataName}}
              </td>
              <td>
                <span class="labelFont">服务类型：</span>
                {{mapData.serviceType}}
              </td>
              <td>
                <span class="labelFont">投影类型：</span>
                {{mapData.projectionType}}
              </td>
              <td>
                <span class="labelFont">YMin：</span>
                {{mapData.latitudeLeft}}
              </td>
            </tr>
            <tr height="35px">
              <td>
                <span class="labelFont">服务名称：</span>
                {{mapData.serviceName}}
              </td>
              <td>
                <span class="labelFont">覆盖区域：</span>
                {{mapData.coverageAreaName}}
              </td>
              <td>
                <span class="labelFont">来源单位：</span>
                {{mapData.sourceUnitName}}
              </td>
              <td>
                <span class="labelFont">XMax：</span>
                {{mapData.longitudeRight}}
              </td>
            </tr>
            <tr height="35px">
              <td>
                <span class="labelFont">服务URL：</span>
                <a href="javascript:void(0);"
                   @click="handleOpenServiceClick(mapData.url)">{{mapData.url}}</a>
              </td>
              <td>
                <span class="labelFont">空间参考：</span>
                {{mapData.spaceRefer}}
              </td>
              <td>
                <span class="labelFont">更新周期：</span>
                {{mapData.updateCycle}}
              </td>
              <td>
                <span class="labelFont">YMax：</span>
                {{mapData.latitudeRight}}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="preview_wrap_bottom">
      <div class="previewHeight_box">
        <epf-mapview name="preview_mapbox"
                     :custom="true"
                     :widgetConf="widgetConf"
                     ref="mapview"></epf-mapview>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapPreviewServe',
  data () {
    return {
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
      mapData: [],
      layerList: []
    }
  },
  methods: {
    handleOpenServiceClick (url) {
      window.open(url)
    },
    // 获取详情数据
    async getData () {
      let id = this.$route.query.id
      const res = await this.$get('/epf-onemap/admin/mapservices/getById', {
        id: id
      })
      if (res.code === 0) {
        this.mapData = res.services
        this.layerList = res.layerList
        this.$refs.mapview.creatMapApp(res.services)
      }
    }
  },
  created () {
    this.getData()
  },

  computed: {
    newRender: function () {
      this.getData(this.$route.query.id)
    }
  },
  components: {
  }
}
</script>

<style>
.page-body {
  height: auto;
  padding: 16px 24px;
}
.preview_wrap {
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.preview_wrap[data-v-60fb67bb] {
  background: #fff;
}
.switchHeight_box {
  transition: 0.5s;
  background: #fff;
  border: 1px solid #d7d7d7;
}
.previewHeight_box {
  min-height: 750px;
  transition: 0.5s;
  border: 1px solid #d7d7d7;
  padding: 5px;
}
.previewHeight_box iframe {
  min-height: 750px;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: block;
}
.preview_wrap_bottom {
  border: 1px solid #f3f3f3;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
  min-height: 750px;
}
.preview_title {
  height: 40px;
  font-size: 18px;
  padding-left: 20px;
  background-color: #e6ebf5;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
}
.labelFont {
  font-weight: bolder;
}
.left_text {
  font-size: 14px;
  color: #999;
  margin-left: 10px;
}
.special_text_five {
  width: 85px;
  text-align: right;
  display: inline-block;
}
.special_text_four {
  width: 70px;
  text-align: right;
  display: inline-block;
}
</style>
