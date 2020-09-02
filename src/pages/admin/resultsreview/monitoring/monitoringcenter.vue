<template>
  <div id="monitoringcenter">
    <el-row class="title">
      广东省国土空间规划成果汇交监控
      <span style="float:right;font-size:16px;">{{showdate}}</span>
    </el-row>
    <el-row class="monitorHeader">
      <el-col :span="4">总成果汇交：95次</el-col>
      <el-col :span="4">总成果入库：95次</el-col>
      <el-col :span="4">本月成果汇交：23次</el-col>
      <el-col :span="4">本月审核中成果：23次</el-col>
      <el-col :span="4">本月成果汇交：23次</el-col>
      <el-col :span="4">本月成果汇交：23次</el-col>
    </el-row>

    <el-row type="flex"
            style="margin-top:20px"
            :gutter="20">
      <el-col :span="7">
        <exchangetable :data="tableData"
                       :canMore="true"></exchangetable>
      </el-col>
      <el-col :span="10">
        <provincemap></provincemap>
      </el-col>
      <el-col :span="7">
        <editortable :data="tableData2"
                     :canMore="true"></editortable>
      </el-col>
    </el-row>

    <el-row style="margin-top:20px"
            :gutter="20"
            class="footerRow">
      <el-col :span="8">
        <diagram></diagram>
      </el-col>
      <el-col :span="8">
        <percentage :canMore="true"></percentage>
      </el-col>
      <el-col :span="8">
        <columns :canMore="true"></columns>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import provincemap from './provincemap'
import diagram from './diagram'
import columns from './columns'
import exchangetable from './exchangetable'
import percentage from './percentage'

import editortable from './editortable'

Date.prototype.pattern = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours() % 24 == 0 ? 24 : this.getHours() % 24, // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  var week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '/u661f/u671f'
          : '/u5468'
        : '') + week[this.getDay() + '']
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
export default {
  name: 'monitoringcenter',
  data () {
    return {
      showdate: '',
      timer: null,
      serverDate: '',
      tableData: [
        {
          number: 1,
          name: '广州市',
          key: '35',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 2,
          name: '深圳市',
          key: '35',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 3,
          name: '中山市',
          key: '21',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 4,
          name: '佛山市',
          key: '12',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 5,
          name: '东莞市',
          key: '21',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 6,
          name: '韶关市',
          key: '35',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 7,
          name: '梅州市',
          key: '32',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 8,
          name: '潮州市',
          key: '2',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 9,
          name: '河源市',
          key: '0',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 10,
          name: '湛江市',
          key: '42',
          main: '珠三角',
          minor: '粤东',
          class: '1',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        }
      ],
      tableData2: [
        {
          number: 1,
          name: '深圳市',
          key: '深圳市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '5',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 2,
          name: '广州市',
          key: '广州市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '12',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 3,
          name: '河源市',
          key: '河源市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '1'
        },
        {
          number: 4,
          name: '揭阳市',
          key: '揭阳市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '8',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 5,
          name: '清远市',
          key: '清远市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '9',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 6,
          name: '韶关市',
          key: '韶关市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '2',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 7,
          name: '云浮市',
          key: '云浮市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '6',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 8,
          name: '江门市',
          key: '江门市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '4',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 9,
          name: '佛山市 ',
          key: '佛山市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '3',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        },
        {
          number: 10,
          name: '肇庆市',
          key: '肇庆市总体规划',
          main: '珠三角',
          minor: '粤东',
          class: '5',
          sector: '天河区国土资源局',
          agent: '张三',
          data: '2019-10-25',
          data2: '2019-10-27',
          state: '2'
        }
      ],
      isCurrent: { id: 1, name: '本日' },
      buttons: [
        { id: 1, name: '本日' },
        { id: 2, name: '本周' },
        { id: 3, name: '本月' },
        { id: 4, name: '本年' }
      ]
    }
  },
  components: {
    provincemap,
    diagram,
    columns,
    percentage,
    exchangetable,
    editortable
  },
  mounted () {
    let that = this
    this.timer = setInterval(function () {
      that.showServerTime()
    }, 1000)
  },
  created () {
    this.getServerDate()
    this.exitFullScreen()
  },
  methods: {
    getServerDate: function () {
      var date = null
      try {
        var xmlHttp = false
        // 获取服务器时间
        try {
          xmlHttp = new ActiveXObject('Msxml2.XMLHTTP')
        } catch (e) {
          try {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
          } catch (e2) {
            xmlHttp = false
          }
        }
        if (!xmlHttp && typeof XMLHttpRequest !== 'undefined') {
          xmlHttp = new XMLHttpRequest()
        }
        xmlHttp.open('GET', '/api/epf-result-review/null.txt', false)
        xmlHttp.setRequestHeader('Range', 'bytes=-1')
        xmlHttp.send(null)
        date = new Date(xmlHttp.getResponseHeader('Date'))
      } catch (e) { }

      this.serverDate = date
    },
    showServerTime: function () {
      var that = this
      // 每10分钟同步一次服务器时间
      let dataChuo = this.serverDate.getTime() + 1000

      this.serverDate = new Date(dataChuo)
      this.showdate = this.serverDate.pattern('yyyy-MM-dd hh:mm:ss')
    },
    // 退出全屏
    exitFullScreen (el) {
      var el = document,
        cfs
          = el.cancelFullScreen
          || el.webkitCancelFullScreen
          || el.mozCancelFullScreen
          || el.exitFullScreen,
        wscript

      if (typeof cfs !== 'undefined' && cfs) {
        cfs.call(el)

        return
      }

      if (typeof window.ActiveXObject !== 'undefined') {
        wscript = new ActiveXObject('WScript.Shell')

        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  },
  computed: {},
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style scoped>
#monitoringcenter {
  padding: 14px;
}

.title {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  text-align: center;
  font-weight: 700;
}
#monitoringcenter .monitorHeader {
  text-align: center;
  margin-top: 20px;
  font-weight: 700;
}
.footerRow .el-col-8 {
  height: 390px;
}
</style>
