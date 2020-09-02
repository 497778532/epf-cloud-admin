<template>
  <div class="fullscreen">
    <div style="width:100%;height:100%;position: relative;top:-75px;left:0px;z-index:10;"
         id="login-bg"
         v-if="this.userType.indexOf('type=2')==-1">
      <div class="login-mk-1"
           @mouseover="hover1"
           @mouseleave="leave1"></div>
      <div class="login-mk-2"
           @mouseover="hover2"
           @mouseleave="leave1"></div>
      <div class="login-mk-3"
           @mouseover="hover3"
           @mouseleave="leave1"></div>
      <div class="login-mk-4"
           @mouseover="hover4"
           @mouseleave="leave1"></div>
      <div class="login-mk-5"
           @mouseover="hover5"
           @mouseleave="leave1"></div>
      <div class="login-mk-6"
           @mouseover="hover6"
           @mouseleave="leave1"></div>
      <div class="login-mk-7"
           @mouseover="hover7"
           @mouseleave="leave1"></div>
      <div v-for="(item, index) in idList"
           :key="index"
           :id="'login-mk-' + index + 'g'"
           :class="{
          'login-mk-dis1': mkID == 1,
          'login-mk-dis2': mkID == 2,
          'login-mk-dis3': mkID == 3,
          'login-mk-dis4': mkID == 4,
          'login-mk-dis5': mkID == 5,
          'login-mk-dis6': mkID == 6,
          'login-mk-dis7': mkID == 7
        }"></div>
      <div class="login-mk-text login-mk-text1"
           v-if="mkID == 1"></div>
      <div class="login-mk-text login-mk-text2"
           v-if="mkID == 2"></div>
      <div class="login-mk-text login-mk-text3"
           v-if="mkID == 3"></div>
      <div class="login-mk-text login-mk-text4"
           v-if="mkID == 4"></div>
      <div class="login-mk-text login-mk-text5"
           v-if="mkID == 5"></div>
      <div class="login-mk-text login-mk-text6"
           v-if="mkID == 6"></div>
      <div class="login-mk-text login-mk-text7"
           v-if="mkID == 7"></div>
      <div class="login-mk-xian"></div>
      <div class="login-mk-title"></div>

      <div :class="{'login-box':this.userType.indexOf('type=2')==-1,'login-read':this.userType.indexOf('type=2')!=-1}">
        <div class="pseudoCls">
          <!-- <img src="../assets/login-title.png" class="title" style="width:729px;height:auto;" alt> -->
          <div class="login-box-main">
            <p class="login-box-title">
              用户登录:
            </p>

            <form action
                  class="login-form"
                  style="width:100%;">
              <div class="m-list-group">
                <div class="m-list-group-item item-margin1">
                  <img class="iconlogin"
                       src="../assets/images/login/账户2x.png"
                       width="24"
                       height="24"
                       alt />
                  <input type="text"
                         autofocus
                         placeholder="请输入登录ID"
                         v-model="username"
                         class="dulu-box"
                         @keyup.enter="handleLogin" />
                </div>
                <div class="validate">
                  <span v-if="username === ''">{{ errors.errorsName }}</span>
                </div>
                <div class="m-list-group-item item-margin2">
                  <img class="iconlogin"
                       src="../assets/images/login/密码2x.png"
                       width="24"
                       height="24"
                       alt />
                  <input type="text"
                         v-if="pwdType"
                         placeholder="请输入密码"
                         v-model="password"
                         class="mima-box"
                         @keyup.enter="handleLogin" />
                  <input type="password"
                         v-else
                         placeholder="请输入密码"
                         v-model="password"
                         class="mima-box"
                         @keyup.enter="handleLogin" />
                  <img :src="seen ? seenImg : unseenImg"
                       @click="changeType()"
                       class="eye_img"
                       width="24"
                       height="24"
                       style="margin-left:16px;" />
                </div>
                <div class="validate">
                  <span v-if="password === ''">{{
                    errors.errorsPassword
                  }}</span>
                </div>
                <div class="m-list-group-item1 item-margin2">
                  <input type="text"
                         placeholder="请输入验证码"
                         v-model="picCode"
                         class="yzm-box"
                         @keyup.enter="handleLogin" />

                  <img class="identifycode"
                       :src="identifyCode"
                       @click="refreshIdentifyCode"
                       style="margin:0 10px;" />
                  <span class="hyz-box"
                        @click="refreshIdentifyCode">换一张</span>
                </div>
                <div class="validate">
                  <span v-if="picCode === ''">{{ errors.errorsPic }}</span>
                </div>
              </div>
            </form>
            <div class="buttonBox">
              <div class="button_login"
                   @click.prevent="handleLogin"
                   v-loading="isLoging"
                   :disabled="disabled">
                <span v-if="stateFront">登&nbsp&nbsp&nbsp&nbsp录</span>
                <span class="el-icon-loading"
                      v-if="stateAfter"></span>
              </div>
            </div>
            <div class="forgetPwd">
              <div class="checkd"
                   @click="checkedBox()">
                <span class="el-icon-check icons"
                      v-show="checked"></span>
                <span class="check-text">记住密码</span>
              </div>
              <div>
                <span class="jumpPwd">忘记密码？</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'login-box':this.userType.indexOf('type=2')==-1,'login-read':this.userType.indexOf('type=2')!=-1}"
         v-if="this.userType.indexOf('type=2')!=-1">
      <div class="pseudoCls">
        <!-- <img src="../assets/login-title.png" class="title" style="width:729px;height:auto;" alt> -->
        <div class="login-box-main">
          <p class="login-box-title">
            用户登录:
          </p>

          <form action
                class="login-form"
                style="width:100%;">
            <div class="m-list-group">
              <div class="m-list-group-item item-margin1">
                <img class="iconlogin"
                     src="../assets/images/login/账户2x.png"
                     width="24"
                     height="24"
                     alt />
                <input type="text"
                       autofocus
                       placeholder="请输入登录ID"
                       v-model="username"
                       class="dulu-box"
                       @keyup.enter="handleLogin" />
              </div>
              <div class="validate">
                <span v-if="username === ''">{{ errors.errorsName }}</span>
              </div>
              <div class="m-list-group-item item-margin2">
                <img class="iconlogin"
                     src="../assets/images/login/密码2x.png"
                     width="24"
                     height="24"
                     alt />
                <input type="text"
                       v-if="pwdType"
                       placeholder="请输入密码"
                       v-model="password"
                       class="mima-box"
                       @keyup.enter="handleLogin" />
                <input type="password"
                       v-else
                       placeholder="请输入密码"
                       v-model="password"
                       class="mima-box"
                       @keyup.enter="handleLogin" />
                <img :src="seen ? seenImg : unseenImg"
                     @click="changeType()"
                     class="eye_img"
                     width="24"
                     height="24"
                     style="margin-left:16px;" />
              </div>
              <div class="validate">
                <span v-if="password === ''">{{
                    errors.errorsPassword
                  }}</span>
              </div>
              <div class="m-list-group-item1 item-margin2">
                <input type="text"
                       placeholder="请输入验证码"
                       v-model="picCode"
                       class="yzm-box"
                       @keyup.enter="handleLogin" />

                <img class="identifycode"
                     :src="identifyCode"
                     @click="refreshIdentifyCode"
                     style="margin:0 10px;" />
                <span class="hyz-box"
                      @click="refreshIdentifyCode">换一张</span>
              </div>
              <div class="validate">
                <span v-if="picCode === ''">{{ errors.errorsPic }}</span>
              </div>
            </div>
          </form>
          <div class="buttonBox">
            <div class="button_login"
                 @click.prevent="handleLogin"
                 v-loading="isLoging"
                 :disabled="disabled">
              <span v-if="stateFront">登&nbsp&nbsp&nbsp&nbsp录</span>
              <span class="el-icon-loading"
                    v-if="stateAfter"></span>
            </div>
          </div>
          <div class="forgetPwd">
            <div class="checkd"
                 @click="checkedBox()">
              <span class="el-icon-check icons"
                    v-show="checked"></span>
              <span class="check-text">记住密码</span>
            </div>
            <div>
              <span class="jumpPwd">忘记密码？</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bd">
      <p v-if="this.userType.indexOf('type=2')==-1">
        <span>主办：广东省自然资源厅</span>
        <b></b>
        <span>承办：广东省土地调查规划院</span>
        <b></b>
        <img src="../assets/beian.png"
             alt />
        <span>备案号：京-ICP备55555号</span>
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import apiConfig from '../utils/config'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      picCode: '',
      identifyCode: '',
      random: '',
      isLoging: false,
      checked: false,
      author: window.APP_INFO.author,
      version: window.APP_INFO.version,
      appName: window.APP_INFO.appName,
      disabled: false,
      stateFront: true,
      stateAfter: false,
      // stateFront:false,
      // stateAfter:true,
      seen: '',
      unseenImg: require('../assets/images/login/密码不可见2x.png'), // 看不见
      seenImg: require('../assets/images/login/密码可见2x.png'), // 看得见密码
      pwdType: false, // 此时文本框隐藏，显示密码框
      errors: {
        errorsName: '',
        errorsPic: '',
        errorsPassword: ''
      },

      idList: [1, 2, 3, 4, 5, 6, 7],
      mkID: 1,
      isHover: false,

      userType: '',

      clickNum: 1
    }
  },
  mounted () {
    this.userType = window.location.href
    this.mkID = setInterval(this.getMkID, 3000)
    if (this.random == null || this.random == '') {
      this.random = Math.random()
    }
    this.identifyCode
      = apiConfig.baseURL1 + '/epf-admin/captcha.jpg?random=' + this.random
    this.getCookie()
  },
  created () {
    this.userType = window.location.href
  },
  methods: {
    getMkID () {
      if (this.isHover === false) {
        if (this.mkID > 6) {
          this.mkID = 0
        }
        this.mkID = this.mkID + 1
      }
    },
    hover1 () {
      this.mkID = 2
      this.isHover = true
    },
    hover2 () {
      this.mkID = 1
      this.isHover = true
    },
    hover3 () {
      this.mkID = 6
      this.isHover = true
    },
    hover4 () {
      this.mkID = 5
      this.isHover = true
    },
    hover5 () {
      this.mkID = 7
      this.isHover = true
    },
    hover6 () {
      this.mkID = 3
      this.isHover = true
    },
    hover7 () {
      this.mkID = 4
      this.isHover = true
    },
    leave1 () {
      this.isHover = false
    },
    refreshIdentifyCode () {
      this.identifyCode
        = apiConfig.baseURL1
        + '/epf-admin/captcha.jpg?random='
        + this.random
        + '&i='
        + Math.random()
    },
    handleLogin () {
      var that = this
      var url = '/epf-admin/login'
      let data = new FormData()
      data.append('username', this.username)
      data.append('password', this.password)
      data.append('captcha', this.picCode)
      data.append('loginType', 1)
      data.append('random', this.random)
      if (this.username === '') {
        this.errors.errorsName = '*用户名不能为空'
      }
      if (this.password === '') {
        this.errors.errorsPassword = '*密码不能为空'
      }
      if (this.picCode === '') {
        this.errors.errorsPic = '*图片验证不能为空'
      }
      if (that.checked == true) {
        console.log('checked == true')
        that.setCookie(that.username, that.password, 7)
      } else {
        console.log('清空cookie')
        that.clearCookie()
      }
      if (!this.username && this.password && this.picCode) {
        this.refreshIdentifyCode()
        return this.$message.warning('用户名不能为空')
      } else if (this.username && !this.password && this.picCode) {
        this.refreshIdentifyCode()
        return this.$message.warning('密码不能为空')
      } else if (this.username && this.password && !this.picCode) {
        this.refreshIdentifyCode()
        return this.$message.warning('验证码不能为空')
      } else if (!this.username && !this.password && this.picCode) {
        this.refreshIdentifyCode()
        return this.$message.warning('用户名、密码不能为空')
      } else if (!this.username && this.password && !this.picCode) {
        this.refreshIdentifyCode()
        return this.$message.warning('用户名、验证码不能为空')
      } else if (this.username && !this.password && !this.picCode) {
        this.refreshIdentifyCode()
        return this.$message.warning('密码、验证码不能为空')
      } else if (!this.username && !this.password && !this.picCode) {
        this.refreshIdentifyCode()
        return this.$message.warning('用户名、密码和验证码不能为空')
      } else {
        this.stateFront = false
        this.stateAfter = true
        this.disabled = true
        this.$useAppend(url, data)
          .then(res => {
            // this.$post(url, {username:this.username,password:this.password}).then(res => {
            if (res.code == '0') {
              this.clickNum = this.clickNum + 1
              if (this.clickNum == 2) {
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration: 1000
                })
              }
              sessionStorage.setItem('token', res.token)
              var user = {}
              user.username = that.username
              sessionStorage.setItem('user', JSON.stringify(user))
              setTimeout(() => {
                this.$get('/epf-admin/admin/user/geUserInfo').then(res => {
                  let realName = res.realname
                  sessionStorage.setItem('userName', realName)
                  sessionStorage.setItem('iconImg', res.iconImg)
                  sessionStorage.setItem('orgId', res.orgId)
                  // this.$router.push({ path: '/' })
                  if (user.username !== 'zsk') {
                    this.$router.push({ path: '/LeadershipIndex' })
                  } else if (user.username === 'zsk') {
                    this.$router.push({ path: '/knowledge' })
                  }
                })
              }, 100)
            } else {
              this.stateFront = true
              this.stateAfter = false
              this.disabled = false
              this.refreshIdentifyCode()
              this.$message.warning(res.msg)
            }
          })
          .catch(res => {
            this.stateFront = true
            this.stateAfter = false
            this.disabled = false
            this.refreshIdentifyCode()
            this.$message.warning(res.msg)
          })
      }
    },
    // 遍历路由方法
    traverse (data) {
      let routerData = []
      traverseData(data)
      function traverseData (data) {
        for (var index = 0, len = data.length; index < len; index++) {
          routerData.push(data[index])
          if (data[index].childMenu && data[index].childMenu.length) {
            traverseData(data[index].childMenu)
          }
        }
      }
      return routerData
    },
    getNeedRouter (localRouter, menusData) {
      let resultRouter = []
      // 取出需要的路由
      for (
        let local = 0, dataLength = localRouter.length;
        local < dataLength;
        local++
      ) {
        for (
          let menus = 0, menusLength = menusData.length;
          menus < menusLength;
          menus++
        ) {
          if (localRouter[local].name == menusData[menus].url) {
            resultRouter.push(localRouter[local])
          }
        }
      }
      return resultRouter
    },
    changeType: function () {
      this.seen = !this.seen
      this.pwdType = !this.pwdType
    },

    // 设置cookie
    setCookie (c_name, c_pwd, exdays) {
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie
        = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie
        = 'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
    },
    // 读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] == 'userName') {
            this.username = arr2[1] // 保存到保存数据的地方
          } else if (arr2[0] == 'userPwd') {
            this.password = arr2[1]
          }
        }
      }
    },
    // 清除cookie
    clearCookie: function () {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    },
    checkedBox () {
      if (this.checked) {
        this.checked = !this.checked
      } else {
        this.checked = !this.checked
      }
    }
  }
}
</script>
<style type="text/css">
.fullscreen .input,
.fullscreen .textarea {
  font-size: 16px;
}
.validate {
  display: block;
  width: 100%;
  height: 24px;
  color: red;
  font-size: 12px;
  line-height: 24px;
}
.m-list-group {
  border-radius: 3px;
  padding: 0;
  margin: 0 !important;
  width: 100%;
}
.m-list-group .m-list-group-item {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 16px;
  margin-bottom: -1px;
  background: rgba(0, 0, 0, 0);
  border: solid 1px #707070 !important;
  display: flex !important;
}
.m-list-group-item .iconlogin {
  margin-right: 10px;
}
.m-list-group .m-list-group-item1 {
  display: flex;
  justify-content: space-between;
  margin-bottom: -1px;
  width: 100%;
  height: 50px;
}
.yzm-box {
  width: 52.5%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 16px;
  border: solid 1px #707070;
  background: rgba(0, 0, 0, 0);
  color: #aaaaaa;
}
.hyz-box {
  font-size: 16px;
  color: #1b74ee;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.forgetPwd {
  width: 100%;
  color: #c5d4e3;
  overflow: hidden;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.forgetPwd .checkd {
  width: 24px;
  height: 24px;
  float: left;
  cursor: pointer;
  border: solid 1px #ccc;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.forgetPwd .checkd .icons {
  /* font-weight: 900;
  font-size: 16px;
  color: #4d88fe; */
  width: 24px;
  height: 24px;
  display: block;
  background-image: url(../assets/images/login/已选择2x.png);
  background-size: cover;
}
.forgetPwd .el-icon-check:before {
  content: "";
}
/* .forgetPwd .checkd::after {
  content: "记住密码";
  color: #979797;
  font-size: 16px;
  position: absolute;
  left: 60px;
  bottom: 20px;
} */
.check-text {
  content: "记住密码";
  color: #979797;
  width: 80px;
  font-size: 16px;
  position: absolute;
  left: 40px;
  bottom: 0px;
}
.forgetPwd .jumpPwd {
  cursor: pointer;
  float: right;
  color: #1b74ee;
  font-size: 16px;
}
.forgetPwd .jumpPwd:active {
  color: #1b74ee;
  transform: translateY(1px);
}
.fullscreen {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-image: url(../assets/images/login/线路2x.png); */
  background-image: linear-gradient(
    90deg,
    rgba(12, 39, 112, 1) 0%,
    rgba(3, 57, 148, 1) 20%,
    rgba(2, 57, 152, 1) 40%,
    rgba(8, 46, 129, 1) 70%,
    rgba(14, 37, 109, 1) 100%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
#login-bg {
  /* background: url(../assets/images/login/title.png) no-repeat center 0;
  background-repeat: no-repeat;
  background-size: cover;
  width: 53%;
  height: 5.5%;
  position: absolute;
  top: 43.6%;
  left: 26%;
  z-index: 15; */
}
.login-title {
  width: 100%;
  position: absolute;
  top: 124px;
  color: #fff;
  font-size: 46px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.login-box {
  position: absolute;
  top: 37%;
  left: 65%;
  /* margin-left: -315px; */
  flex-direction: column;
  justify-content: center;
  padding: 1.25% 1.25% 1% 1.25%;
  width: 23.4%;
  height: 49.6%;
  border: solid 1px #ccc;
  background: rgba(255, 255, 255, 1);
  box-shadow: 7px 6px 29px 0px rgba(153, 222, 253, 0.36),
    5px 4px 7px 0px rgba(3, 52, 203, 0.46);
  border-radius: 5px;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; */
}
.login-read {
  /* position: absolute;
  top: 37%;
  left: 65%; */
  /* margin-left: -315px; */
  margin: auto;
  flex-direction: column;
  justify-content: center;
  padding: 1.25% 1.25% 1% 1.25%;
  width: 23.4%;
  height: 49.6%;
  border: solid 1px #ccc;
  background: rgba(255, 255, 255, 1);
  box-shadow: 7px 6px 29px 0px rgba(153, 222, 253, 0.36),
    5px 4px 7px 0px rgba(3, 52, 203, 0.46);
  border-radius: 5px;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; */
}
.pseudoCls {
  width: 100%;
  height: 100%;
}
.login-box-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.login-box-title {
  color: #323131;
  font-size: 24px;
  text-align: left;
  height: 32px;
  line-height: 32px;
  font-weight: bolder;
}
.item-margin1 {
  margin-top: 32px;
}
.item-margin2 {
  margin-top: 8px;
}
.login-box .title {
  position: absolute;
  top: -80px;
  left: -53px;
}
.dulu-box {
  width: 86%;
  line-height: 36px;
  height: 36px;
  color: #aaaaaa;
  font-size: 16px;
}
.mima-box {
  width: 86%;
  line-height: 36px;
  height: 36px;
  color: #aaaaaa;
  font-size: 16px;
}
.login-box .logo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: absolute;
  background-color: #fff;
  top: -3px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-box .logo img {
  display: block;
  width: 70px;
  height: 70px;
  margin-top: 10px;
  margin-left: 10px;
}
/* .login-box::after{
  content: '';
  width: 50px;
  height: 50px;
  border: none!important;
  background-image: url('../assets/icon-login10.png');
  background-repeat: no-repeat;
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: 10;
}
.login-box::before{
  content: '';
  width: 50px;
  height: 50px;
  border: none!important;
  background-image: url('../assets/icon-login10.png');
  background-repeat: no-repeat;
  position: absolute;
  top: -3px;
  right: -3px;
  z-index: 10;
  transform: rotate(90deg);
}
.pseudoCls::before{
  content: '';
  width: 50px;
  height: 50px;
  border: none!important;
  background-image: url('../assets/icon-login10.png');
  background-repeat: no-repeat;
  position: absolute;
  bottom: -3px;
  right: -3px;
  z-index: 10;
  transform: rotate(180deg);
}
.pseudoCls::after{
  content: '';
  width: 50px;
  height: 50px;
  border: none!important;
  background-image: url('../assets/icon-login10.png');
  background-repeat: no-repeat;
  position: absolute;
  bottom: -3px;
  left: -3px;
  z-index: 10;
  transform: rotate(-90deg);
} */
input {
  background: rgba(0, 0, 0, 0);
  font-size: 16px;
  color: #c5d4e3;
  line-height: 32px;
  border: none;
  outline: none;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #c5d4e3;
  font-size: 16px;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #c5d4e3;
  font-size: 16px;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #c5d4e3;
  font-size: 16px;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #999 !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;
}
input {
  background-color: transparent;
}
.login-box img {
  /* margin: 4px; */
}
.identifycode {
  width: 26.5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: pink;
  cursor: pointer;
}
.buttonBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  display: -ms-flexbox;
  /* margin-bottom: 10px; */
  -ms-flex-pack: center;
  height: 50px;
  width: 100%;
  margin-top: 15px;
}
.button_login {
  display: inline-block;
  box-sizing: border-box;
  min-width: 60px;
  height: 100%;
  padding: 0 10px;
  font-size: 20px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  display: inline-block;
  cursor: pointer;
  width: 100%;
  background: #1b74ee;
}
.button_login:active {
  transform: translateY(1px);
}
.footer-bd {
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.footer-bd b {
  display: inline-block;
  width: 30px;
}
.footer-bd span {
  color: #c5d4e3;
}
/* @media (max-width: 768px) {
  .login-box {
    width: auto;
  }
} */
</style>
<style scoped>
.login-mk-1 {
  background-image: url(../assets/images/login/成果审查2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 8%;
  height: 28%;
  position: absolute;
  top: 42%;
  left: 27.5%;
  z-index: 14;
  cursor: pointer;
}
#login-mk-1g {
  background-image: url(../assets/images/login/成果审查发光2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 11%;
  height: 30%;
  position: absolute;
  top: 43.6%;
  left: 26%;
  z-index: 15;
  display: none;
}
.login-mk-2 {
  background-image: url(../assets/images/login/DATA2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 12.8%;
  height: 27%;
  position: absolute;
  top: 52%;
  left: 15%;
  z-index: 14;
  cursor: pointer;
}
#login-mk-0g {
  background-image: url(../assets/images/login/DATA发光2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 18%;
  height: 33.5%;
  position: absolute;
  top: 49%;
  left: 13.5%;
  z-index: 15;
  display: none;
}
.login-mk-3 {
  background-image: url(../assets/images/login/承载预警.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 12.6%;
  height: 18%;
  position: absolute;
  top: 58%;
  left: 42%;
  z-index: 14;
  cursor: pointer;
}
#login-mk-5g {
  background-image: url(../assets/images/login/承载预警发光2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 15.8%;
  height: 24.5%;
  position: absolute;
  top: 55%;
  left: 40.2%;
  z-index: 15;
  display: none;
}
.login-mk-4 {
  background-image: url(../assets/images/login/规划分析2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 11%;
  height: 18.8%;
  position: absolute;
  top: 43%;
  left: 17%;
  z-index: 12;
  cursor: pointer;
}
#login-mk-4g {
  background-image: url(../assets/images/login/规划分析发光2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 14.1%;
  height: 25.3%;
  position: absolute;
  top: 40%;
  left: 15.5%;
  z-index: 13;
  display: none;
}
.login-mk-5 {
  background-image: url(../assets/images/login/监测预警2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 12.4%;
  height: 21%;
  position: absolute;
  top: 71%;
  left: 30%;
  z-index: 14;
  cursor: pointer;
}
#login-mk-6g {
  background-image: url(../assets/images/login/监测预警发光2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 15.5%;
  height: 27.2%;
  position: absolute;
  top: 68%;
  left: 28.5%;
  z-index: 15;
  display: none;
}
.login-mk-6 {
  background-image: url(../assets/images/login/一张图2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 8.2%;
  height: 23%;
  position: absolute;
  top: 38%;
  left: 36%;
  z-index: 14;
  cursor: pointer;
}
#login-mk-2g {
  background-image: url(../assets/images/login/一张图发光2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 9%;
  height: 28%;
  position: absolute;
  top: 36.5%;
  left: 36%;
  z-index: 15;
  display: none;
}
.login-mk-7 {
  background-image: url(../assets/images/login/指标模型2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 9.7%;
  height: 19.7%;
  position: absolute;
  top: 30.2%;
  left: 26%;
  z-index: 12;
  cursor: pointer;
}
#login-mk-3g {
  background-image: url(../assets/images/login/指标模型发光2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 12.9%;
  height: 26.2%;
  position: absolute;
  top: 27.3%;
  left: 24.4%;
  z-index: 13;
  display: none;
}
.login-mk-dis1:nth-child(8) {
  display: block !important;
}
.login-mk-dis2:nth-child(9) {
  display: block !important;
}
.login-mk-dis3:nth-child(10) {
  display: block !important;
}
.login-mk-dis4:nth-child(11) {
  display: block !important;
}
.login-mk-dis5:nth-child(12) {
  display: block !important;
}
.login-mk-dis6:nth-child(13) {
  display: block !important;
}
.login-mk-dis7:nth-child(14) {
  display: block !important;
}
.login-mk-text {
  background-repeat: no-repeat;
  background-size: contain;
  width: 14.7%;
  height: 15%;
  position: absolute;
  top: 40%;
  left: 46%;
  z-index: 14;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.login-mk-text1 {
  background-image: url(../assets/images/login/DATA.png);
}
.login-mk-text2 {
  background-image: url(../assets/images/login/成果审查.png);
}
.login-mk-text3 {
  background-image: url(../assets/images/login/一张图.png);
}
.login-mk-text4 {
  background-image: url(../assets/images/login/指标模型.png);
}
.login-mk-text5 {
  background-image: url(../assets/images/login/规划分析.png);
}
.login-mk-text6 {
  background-image: url(../assets/images/login/资源承载预警.png);
}
.login-mk-text7 {
  background-image: url(../assets/images/login/监测预警.png);
}
.login-mk-xian {
  background-image: url(../assets/images/login/线路2x.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 17.3%;
  height: 31.4%;
  position: absolute;
  top: 43%;
  left: 23.5%;
  z-index: 10;
}
.login-mk-title {
  background-image: url(../assets/images/login/title.png);
  background-repeat: no-repeat;
  background-size: cover;
  width: 60%;
  height: 5.5%;
  position: absolute;
  top: 18%;
  left: 20%;
  z-index: 15;
}
@media screen and (max-width: 1910px) {
  .login-box-title {
    color: #323131;
    font-size: 18px;
    text-align: left;
    height: 18px;
    line-height: 18px;
    font-weight: bolder;
  }
  .m-list-group .m-list-group-item {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    padding: 2px 10px;
    margin-bottom: -1px;
    background: rgba(0, 0, 0, 0);
    border: solid 1px #707070;
    display: flex !important;
  }
  .validate {
    display: block;
    width: 100%;
    height: 18px;
    color: red;
    font-size: 12px;
    line-height: 18px;
    padding-top: 2px;
  }
  .item-margin1 {
    margin-top: 14px;
  }
  .item-margin2 {
    margin-top: 4px;
  }
  .m-list-group .m-list-group-item1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: -1px;
    width: 100%;
    height: 50px;
  }
  .yzm-box {
    width: 47%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 16px;
    border: solid 1px #707070;
    background: rgba(0, 0, 0, 0);
    color: #aaaaaa;
  }
  .hyz-box {
    font-size: 14px;
    color: #1b74ee;
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .buttonBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    display: -ms-flexbox;
    /* margin-bottom: 10px; */
    -ms-flex-pack: center;
    height: 50px;
    width: 100%;
    margin-top: 12px;
  }
  .button_login {
    display: inline-block;
    box-sizing: border-box;
    min-width: 60px;
    height: 100%;
    padding: 0 10px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    display: inline-block;
    cursor: pointer;
    width: 100%;
    background: #1b74ee;
  }
  .forgetPwd {
    color: #c5d4e3;
    overflow: hidden;
    margin-top: 10px;
  }
  .forgetPwd .checkd {
    width: 16px;
    height: 16px;
    float: left;
    cursor: pointer;
    border: solid 1px #ccc;
    margin-top: 2px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .forgetPwd .checkd .icons {
    /* font-weight: 900;
  font-size: 16px;
  color: #4d88fe; */
    width: 16px;
    height: 16px;
    display: block;
    background-image: url(../assets/images/login/已选择2x.png);
    background-size: cover;
  }
  .forgetPwd .jumpPwd {
    cursor: pointer;
    float: right;
    color: #1b74ee;
    font-size: 14px;
  }
  .check-text {
    content: "记住密码";
    color: #979797;
    width: 80px;
    font-size: 14px;
    position: absolute;
    left: 25px;
    bottom: 0px;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c5d4e3;
    font-size: 14px;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c5d4e3;
    font-size: 14px;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #c5d4e3;
    font-size: 14px;
  }
  .dulu-box {
    width: 86%;
    line-height: 36px;
    height: 36px;
    color: #aaaaaa;
    font-size: 14px;
  }
  .mima-box {
    width: 86%;
    line-height: 36px;
    height: 36px;
    color: #aaaaaa;
    font-size: 14px;
  }
}
@media screen and (max-width: 1599px) {
  .login-box-title {
    color: #323131;
    font-size: 16px;
    text-align: left;
    height: 18px;
    line-height: 18px;
    font-weight: bolder;
  }
  .m-list-group .m-list-group-item {
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    padding: 2px 10px;
    margin-bottom: -1px;
    background: rgba(0, 0, 0, 0);
    border: solid 1px #707070;
    display: flex !important;
  }
  .validate {
    display: block;
    width: 100%;
    height: 14px;
    color: red;
    font-size: 12px;
    line-height: 14px;
    padding-top: 2px;
  }
  .item-margin1 {
    margin-top: 18px;
  }
  .item-margin2 {
    margin-top: 4px;
  }
  .m-list-group .m-list-group-item1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: -1px;
    width: 100%;
    height: 36px;
  }
  .yzm-box {
    width: 47%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 16px;
    border: solid 1px #707070;
    background: rgba(0, 0, 0, 0);
    color: #aaaaaa;
  }
  .hyz-box {
    font-size: 14px;
    color: #1b74ee;
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .buttonBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    display: -ms-flexbox;
    /* margin-bottom: 10px; */
    -ms-flex-pack: center;
    height: 36px;
    width: 100%;
    margin-top: 12px;
  }
  .button_login {
    display: inline-block;
    box-sizing: border-box;
    min-width: 60px;
    height: 100%;
    padding: 0 10px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    display: inline-block;
    cursor: pointer;
    width: 100%;
    background: #1b74ee;
  }
  .forgetPwd {
    color: #c5d4e3;
    overflow: hidden;
    margin-top: 10px;
  }
  .forgetPwd .checkd {
    width: 16px;
    height: 16px;
    float: left;
    cursor: pointer;
    border: solid 1px #ccc;
    margin-top: 2px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .forgetPwd .checkd .icons {
    /* font-weight: 900;
  font-size: 16px;
  color: #4d88fe; */
    width: 16px;
    height: 16px;
    display: block;
    background-image: url(../assets/images/login/已选择2x.png);
    background-size: cover;
  }
  .forgetPwd .jumpPwd {
    cursor: pointer;
    float: right;
    color: #1b74ee;
    font-size: 14px;
  }
  .check-text {
    content: "记住密码";
    color: #979797;
    width: 80px;
    font-size: 14px;
    position: absolute;
    left: 25px;
    bottom: 0px;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c5d4e3;
    font-size: 14px;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c5d4e3;
    font-size: 14px;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #c5d4e3;
    font-size: 14px;
  }
  .dulu-box {
    width: 86%;
    line-height: 36px;
    height: 36px;
    color: #aaaaaa;
    font-size: 14px;
  }
  .mima-box {
    width: 86%;
    line-height: 36px;
    height: 36px;
    color: #aaaaaa;
    font-size: 14px;
  }
}
</style>
