<template>
  <m-navbar id="navBarId"
            class="navBarBox"
            style="height:74px;padding-left:0px;box-shadow:0px 3px 8px 0px rgba(59,74,128,0.5);"
            :theme="theme.theme.headerTheme">
    <div style="width:308px;flex-shrink:0;display:flex;justify-content: flex-start;">
      <m-nav style="height:74px;width:74px;box-sizing:border-box;position: relative;padding-top:9px;">
        <img width="74px;"
             height="65px"
             src="../assets/logo3.png"
             :onerror="defaultImg" />
        <!-- <img width="74px;"
             height="74px"
             :src="'/api/epf-document/document/downloadById?id='+InfoConfigBase.logoUrl"
        :onerror="defaultImg" />-->
        <i class="line-special"></i>
      </m-nav>
      <m-nav class="systemNav1"
             v-if="this.adminName !== 'zsk'">
        <p style="height:32px;width:234px;font-size: 22px;line-height:32px;text-shadow:0px 1px 4px rgba(47,128,223,1);text-align:center;">
          <!-- <span v-if="InfoConfigBase.name != ''">{{
            InfoConfigBase.name.substring(0, 9)
          }}</span> -->
          广东省国土空间规划
        </p>
        <p style="height:24px;width:234px;font-size: 16px;line-height:24px;text-shadow:0px 1px 4px rgba(47,128,223,1);text-align:center;">
          <!-- {{
            InfoConfigBase.name.substring(
              InfoConfigBase.name.length - 13,
              InfoConfigBase.name.length
            )
          }} -->
          &nbsp;“一张图”&nbsp;实施监督信息系统
        </p>
      </m-nav>
    </div>
    <div id="topMenu"
         :style="{ width: setTopMentWidth }"
         v-if="this.adminName !== 'zsk'">
      <el-menu :default-active="activeIndex2"
               class="el-menu-header"
               mode="horizontal"
               @select="handleSelect1"
               :text-color="menuTextColor"
               :active-text-color="menuActiveTextColor"
               style="height:100%;">
        <el-menu-item v-for="(item, index) in outMenu"
                      :key="index"
                      :index="item.url"
                      style="width:142px;text-align:center;padding:0 5px;font-size:16px;">
          <div style="height:74px; display:flex; flex-direction: column;justify-content: center;align-items: center;"
               class="nav-special">
            <!-- <i :class="item.iconCls"
               style="font-size: 28px;"></i> -->
            <span :class="item.topIcons"></span>
            <span style="height: 32px;font-size: 16px;line-height:32px;">{{
              item.menuname
            }}</span>
          </div>
        </el-menu-item>
        <el-submenu v-show="hasMore"
                    class="more"
                    index="2">
          <template slot="title">
            <i class="fa fa-ellipsis-h"></i>
            <span style="font-size:16px;">更多</span>
          </template>
          <!-- <el-menu-item
            style="background-image:linear-gradient(180deg,rgba(15,36,106,1) 0%,rgba(0,63,163,1) 29%,rgba(15,36,106,1) 100%);font-size:16px;height:74px;width:142px;"
            v-for="(item,index) in hiddenMenu"
            :key="index"
            :index="item.url"
          >
            <div
              style="height:74px; display:flex; flex-direction: column;justify-content: center;align-items: center;background:#0d2973;"
            >
              <i :class="item.iconCls" style="font-size: 28px;"></i>
              <span style="height: 32px;font-size: 16px;line-height:32px;">{{item.menuname}}</span>
            </div>
          </el-menu-item>-->
          <el-menu-item style="backgroundColor:#0e2974;font-size:16px;"
                        v-for="(item, index) in hiddenMenu"
                        :key="index"
                        :index="item.url">
            <div class="nav-special">
              <!-- <i :class="item.iconCls"></i> -->
              <span :class="item.topIcons"></span>
              {{ item.menuname }}
            </div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <m-nav align="right"
           style="flex-shrink:0;">
      <m-nav-item :style="{ color: menuTextColor }"
                  padding="0"
                  style="height:74px;">
        <m-dropdown id="userMenu"
                    align="right"
                    v-if="user"
                    padding="0 10px 0 0"
                    style="height:74px;">
          <a href="#"
             style="display: inline-block; padding: 0px; color: inherit;height:74px;">
            <img :src="imageUrl"
                 :onerror="defaultImg"
                 width="40px"
                 height="40px"
                 style="border-radius: 3px; vertical-align: middle;margin-right:18px;" />
            <span>
              <span>欢迎您，</span>
              {{ userRealName }}
            </span>
            <span class="caret"></span>
          </a>
          <m-dropdown-panel>
            <m-dropdown-item>
              <div @click="setuserinfo">用户信息</div>
            </m-dropdown-item>
            <m-dropdown-item>
              <div @click="updatepswd">修改密码</div>
            </m-dropdown-item>
            <div class="test-line"></div>
            <m-dropdown-item>
              <div @click="outSystem">退出账号</div>
            </m-dropdown-item>
          </m-dropdown-panel>
        </m-dropdown>
      </m-nav-item>
      <!-- 屏幕全屏 -->
      <!-- <m-nav-item :style="{ color: menuTextColor }"
                  padding="0 5px"
                  style="height:74px;">
        <a href="#"
           @click.stop.prevent="handleSwitchScreen"
           style="height:74px;">
          <i class="fa"
             :class="isFullScreen ? 'fa-compress' : 'fa-expand'"></i>
        </a>
      </m-nav-item> -->
      <!-- 主题 -->
      <!-- <m-nav-item :style="{ color: menuTextColor }"
                  padding="0"
                  style="height:74px;">
        <m-dropdown align="right"
                    padding="0 10px"
                    style="height:74px;">
          <a href="#"
             style="padding:0 0px; color: inherit;height:74px;">
            <i class="fa fa-gears"></i>
          </a>
          <m-dropdown-panel class="only-panel"
                            style="width: 200px; min-height: 100px;">
            <el-form>
              <el-form-item label="侧边栏">
                <el-switch v-model="showAside"
                           @change="handleSwitchHideSide" />
              </el-form-item>
              <el-form-item label="主题">
                <el-select class="themeSelect"
                           v-model="themeType"
                           style="width: 100px">
                  <el-option v-for="theme in themes"
                             :key="theme.label"
                             :label="theme.label"
                             :value="theme.name"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </m-dropdown-panel>
        </m-dropdown>
      </m-nav-item> -->
    </m-nav>
    <!-- 密码修改弹框 -->

    <el-dialog title="修改密码"
               :visible.sync="psddialogFormVisible"
               :modal="true"
               width="450px"
               :close-on-click-modal="false"
               :append-to-body="true"
               class="mmDialog">
      <el-form :model="passwordForm"
               ref="passwordForm"
               status-icon
               :label-position="labelPosition"
               label-width="120px"
               :rules="rulesForPwd">
        <el-form-item label="原密码："
                      prop="oldpass">
          <el-input type="text"
                    :maxlength="20"
                    v-if="pwdType1"
                    v-model="passwordForm.oldpass"
                    autocomplete="off"
                    style="width:100%;position:relative;"
                    @blur="getPwd">
          </el-input>
          <el-input type="password"
                    :maxlength="20"
                    v-else
                    v-model="passwordForm.oldpass"
                    autocomplete="off"
                    style="width:100%;position:relative;"
                    @blur="getPwd">
          </el-input>
          <img :src="seen1 ? seenImg : unseenImg"
               @click="changeType1"
               style="position:absolute;top:8px;right:5px;cursor:pointer;"
               width="24"
               height="24" />
        </el-form-item>
        <el-form-item label="新密码："
                      prop="newPass">
          <el-input type="text"
                    :maxlength="20"
                    v-if="pwdType2"
                    v-model="passwordForm.newPass"
                    autocomplete="off"
                    style="width:100%;"
                    @blur="getPwd"></el-input>
          <el-input type="password"
                    :maxlength="20"
                    v-else
                    v-model="passwordForm.newPass"
                    autocomplete="off"
                    style="width:100%;"
                    @blur="getPwd"></el-input>
          <img :src="seen2 ? seenImg : unseenImg"
               @click="changeType2"
               style="position:absolute;top:8px;right:5px;cursor:pointer;"
               width="24"
               height="24" />
        </el-form-item>
        <el-form-item label="密码强度：">
          <div class="input_span">
            <span id="one"></span>
            <span id="two"></span>
            <span id="three"></span>
          </div>
          <div id="font">
            <span>弱</span>
            <span>中</span>
            <span>强</span>
          </div>
        </el-form-item>
        <el-form-item label="确认密码："
                      prop="relnewPass">
          <el-input type="text"
                    :maxlength="20"
                    v-if="pwdType3"
                    v-model="passwordForm.relnewPass"
                    autocomplete="off"
                    style="width:100%;"
                    @blur="getPwd"></el-input>
          <el-input type="password"
                    :maxlength="20"
                    v-else
                    v-model="passwordForm.relnewPass"
                    autocomplete="off"
                    style="width:100%;"
                    @blur="getPwd"></el-input>
          <img :src="seen3 ? seenImg : unseenImg"
               @click="changeType3"
               style="position:absolute;top:8px;right:5px;cursor:pointer;"
               width="24"
               height="24" />
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <!-- <el-button @click="psddialogFormVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="updatepassword">保存</el-button> -->
        <div class="button_qian"
             @click="updatepasswordCancel('passwordForm')">
          取消
        </div>
        <div style="width:96px;height:40px;"></div>
        <div class="button_shen"
             @click="updatepassword('passwordForm')">
          保存
        </div>
      </div>
    </el-dialog>
    <!--信息修改弹框 -->

    <el-dialog title="信息修改"
               :visible.sync="baseinfodialogFormVisible"
               :modal="true"
               width="700px"
               :close-on-click-modal="false"
               :append-to-body="true"
               class="xxxgDialog">
      <el-container>
        <el-aside width="200px">
          <span style="font-size:16px;height:40px;line-height:40px;margin-bottom:16px;">上传头像：</span>
          <el-upload class="avatar-uploader"
                     action="/api/epf-document/document/upload"
                     name="files"
                     :show-file-list="false"
                     :http-request="userUploadFile"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 :onerror="defaultImg"
                 class="avatar"
                 width="150px" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-aside>
        <el-main width="500px">
          <el-form :model="singleuser"
                   :rules="rules"
                   ref="ruleForm">
            <el-form-item label="账号："
                          prop="username"
                          label-width="120px">
              <el-input v-model="singleuser.username"
                        auto-complete="off"
                        :maxlength="20"
                        :disabled="true"
                        style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="所属机构："
                          label-width="120px">
              <el-input v-model="singleuser.orgName"
                        auto-complete="off"
                        :maxlength="50"
                        :disabled="true"
                        style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="姓名："
                          prop="realname"
                          label-width="120px">
              <el-input v-model="singleuser.realname"
                        auto-complete="off"
                        :maxlength="10"
                        style="width:100%;"></el-input>
            </el-form-item>
            <el-form-item label="手机号："
                          prop="telPhone"
                          label-width="120px">
              <el-input v-model="singleuser.telPhone"
                        auto-complete="off"
                        :maxlength="11"
                        style="width:100%;"></el-input>
            </el-form-item>

            <el-form-item label="性别："
                          prop="sex"
                          label-width="120px">
              <el-switch style="margin-left:20px;"
                         v-model="singleuser.sex"
                         active-color="#13ce66"
                         inactive-color="#b9ccfd"
                         active-value="0"
                         inactive-value="1"
                         active-text="女"
                         inactive-text="男"></el-switch>
            </el-form-item>

            <el-form-item label="邮箱："
                          prop="email"
                          label-width="120px">
              <el-input v-model="singleuser.email"
                        auto-complete="off"
                        :maxlength="20"
                        style="width:100%;"></el-input>
            </el-form-item>

            <el-form-item label="状态："
                          prop="deleteType"
                          label-width="120px">
              <el-tooltip :content="singleuser.deleteType == '0' ? '正常' : '已禁用'"
                          placement="top">
                <el-switch style="margin-left:20px;"
                           v-model="singleuser.deleteType"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           active-value="0"
                           inactive-value="1"></el-switch>
              </el-tooltip>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>

      <div slot="footer"
           class="dialog-footer">
        <!-- <el-button @click="baseinfodialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateuserinfo('ruleForm')">保存</el-button> -->

        <div class="button_qian"
             @click="updateuserinfoCancel('ruleForm')">
          取消
        </div>
        <div style="width:96px;height:40px;"></div>
        <div class="button_shen"
             @click="updateuserinfo('ruleForm')">保存</div>
      </div>
    </el-dialog>
  </m-navbar>
</template>
<script type="text/javascript">
import qs from 'qs'
import { mapActions, mapState } from 'vuex'
import Bus from '../utils/bus.js'
import { requestFullScreen, exitFullscreen } from '@/utils'
import themes from './theme'
export default {
  name: 'app-header',
  props: ['activeMessage'],
  data () {
    var validataPhone = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(value)) {
        callback(new Error('请输入正确的手机号格式'))
      } else {
        callback()
      }
    }
    var returnNewPass = (rule, value, callback) => {
      var regex = new RegExp(
        '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}'
      )

      if (!regex.test(value)) {
        callback(new Error('密码中必须包含字母、数字、特殊字符'))
      } else {
        callback()
      }
    }

    return {
      userRealName: '管理员',
      mini: false,
      isFullScreen: false,
      themes,
      themeType: 'keji',
      showAside: false,
      theme: { theme: { headerTheme: 'info' } },
      menuBackgroundColor: '#76B0FF',
      menuTextColor: '#76B0FF',
      menuActiveTextColor: '#76B0FF',
      activeIndex2: '',
      // activeIndex2: 'pages/admin/home-page/LeadershipIndex',
      menuGroups: [],
      outMenu: [],
      hiddenMenu: [],
      canJoin: 0,
      topMenuPopover: false,
      baseinfodialogFormVisible: false,
      userinfo: {},
      singleuser: {},
      imageUrl: '',
      orgdata: [],
      orgdataprops: {
        value: 'id',
        children: 'children',
        label: 'name',
        disabled: 'disabled'
      },
      slectdefall: [],
      psddialogFormVisible: false,
      labelPosition: 'right',
      passwordForm: {
        oldpass: '',
        newPass: '',
        relnewPass: ''
      },
      menuData: null,
      InfoConfigBase: {},
      defaultImg: 'this.src="' + require('../assets/logo.png') + '"', // 默认图片
      setTopMentWidth: 100,
      hasMore: false,
      // 修改密码验证
      rulesForPwd: {
        oldpass: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPass: [
          {
            required: true,
            min: 8,
            max: 20,
            message: '长度在 8 到 20 个字符',
            trigger: 'blur'
          },
          { validator: returnNewPass, trigger: 'blur' }
        ],
        relnewPass: [
          {
            required: true,
            min: 8,
            max: 20,
            message: '长度在 8 到 20 个字符',
            trigger: 'blur'
          },
          { validator: returnNewPass, trigger: 'blur' }
        ]
      },
      //  编辑 表单验证
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        telPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validataPhone, trigger: 'blur' }
        ]
      },
      topIcons: [
        { url: 'icon-daoh-zy' },
        { url: 'icon-daoh-yzt' },
        { url: 'icon-daoh-ghfx' },
        { url: 'icon-daoh-cgsc' },
        { url: 'icon-daoh-jcpgyj' },
        { url: 'icon-daoh-czpgyj' },
        { url: 'icon-daoh-zbmx' },
        { url: 'icon-daoh-dghyzc' },
        { url: 'icon-daoh-zsk' },
        { url: 'icon-daoh-ndtj' },
        { url: 'icon-daoh-xtgl' }
      ],
      adminName: '',

      seen1: false,
      seen2: false,
      seen3: false,
      pwdType1: false,
      pwdType2: false,
      pwdType3: false,
      unseenImg: require('../assets/images/login/密码不可见2x.png'), // 看不见
      seenImg: require('../assets/images/login/密码可见2x.png'), // 看得见密码
      msgText: 0
    }
  },
  computed: {
    ...mapState({
      user: ({ user }) => user.user
    })
  },
  watch: {
    'passwordForm.newPass': {
      handler: function (newname, oldname) {
        if (newname != null && newname != '') {
          this.msgText = this.checkStrong(newname)
          if (this.msgText > 1 || this.msgText == 1) {
            document.getElementById('one').style.background = 'red'
          } else {
            document.getElementById('one').style.background = '#eee'
          }
          if (this.msgText > 2 || this.msgText == 2) {
            document.getElementById('two').style.background = 'orange'
          } else {
            document.getElementById('two').style.background = '#eee'
          }
          if (this.msgText == 4) {
            document.getElementById('three').style.background = '#00D1B2'
          } else {
            document.getElementById('three').style.background = '#eee'
          }
        }
      }
    },
    themeType (val) {
      // console.log('当前选择的主题', val)
      this.theme = this.themes.find(e => e.name === val) || {}
      this.$emit('set-theme', this.theme)
      localStorage.setItem('theme', val)
      this.changeMenu(val)
    },
    activeMessage (val) {
      this.activeIndex2 = val
      if (val === 'systemManage2') {
        this.handleSelect1('systemManage2', ['systemManage2'])
      } else if (val === 'systemManage3') {
        this.handleSelect1('systemManage3', ['systemManage3'])
      } else if (val === 'systemManage4') {
        this.handleSelect1('systemManage4', ['systemManage4'])
      } else if (val === 'knowledgeManage') {
        this.handleSelect1('knowledgeManage', ['knowledgeManage'])
      } else if (val === 'plansupport') {
        this.handleSelect1('plansupport', ['plansupport'])
      } else if (val === 'systemManage6') {
        this.handleSelect1('systemManage6', ['systemManage6'])
      }
    }
  },
  methods: {
    ...mapActions(['getLoginUser', 'logout', 'clearTab']),
    handleSwitchSide () {
      this.mini = !this.mini
      this.$emit('switch', this.mini)
    },
    updatepswd () {
      this.passwordForm = {}
      this.psddialogFormVisible = true
      this.seen1 = false
      this.seen2 = false
      this.seen3 = false
      this.pwdType1 = false
      this.pwdType2 = false
      this.pwdType3 = false
      this.$refs.passwordForm.resetFields()
    },
    async setuserinfo () {
      var that = this
      that.baseinfodialogFormVisible = true
      this.$refs.ruleForm.resetFields()
    },
    org () {
      var that = this
      that.$get('/epf-admin/admin/org/getOrgTreeForTree').then(res => {
        that.orgdata = JSON.parse(res.ztreeJson.replace(/'/g, '"'))
        var orgid = []
        var orgdt = that.orgdata
        // console.log('字典数据', that.orgdata)
        var idorg = that.singleuser.orgId
        // console.log('数据里的原来的id+' + idorg)
        //
        for (var i = 0; i < orgdt.length; i++) {
          if (orgdt[i].id == idorg) {
            orgid = [idorg]
            break
          }
          if (orgdt[i].children) {
            for (var k = 0; k < orgdt[i].children.length; k++) {
              if (orgdt[i].children[k].id == idorg) {
                orgid = [orgdt[i].id, orgdt[i].children[k].id]
                break
              }
              if (orgdt[i].children[k].children) {
                for (var j = 0; j < orgdt[i].children[k].children.length; j++) {
                  if (orgdt[i].children[k].children[j].id == idorg) {
                    orgid = [
                      orgdt[i].id,
                      orgdt[i].children[k].id,
                      orgdt[i].children[k].children[j].id
                    ]
                    break
                  }
                }
              }
            }
          }
        }
        that.slectdefall = orgid
        // console.log(that.slectdefall)
      })
    },
    updateuserinfo (formName) {
      var that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          var sg = that.singleuser
          var url = ''

          url = '/epf-admin/admin/user/editUser'

          sg.createTime = ''
          that.$post(url, sg).then(res => {
            if (res.code != '0') {
              that.$message.error(res.msg) // 失败
              return
            }
            that.baseinfodialogFormVisible = false
            if (that.add) {
              that.$message.success('修改成功')
            }
          })
        } else {
          return false
        }
      })
    },
    updateuserinfoCancel (formName) {
      this.baseinfodialogFormVisible = false
      // this.$refs[formName].resetFields()
    },
    getPwd () {
      if (this.passwordForm.oldpass !== undefined || this.passwordForm.newPass !== undefined) {
        if (this.passwordForm.oldpass == this.passwordForm.newPass) {
          this.$message.warning('新密码不能和原密码一致！')
        }
      }
      if (this.passwordForm.relnewPass !== undefined && this.passwordForm.newPass !== undefined) {
        if (this.passwordForm.relnewPass != this.passwordForm.newPass) {
          this.$message.warning('新密码输入不一致！')
        }
      }
    },
    updatepassword (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this
          // if (!that.passwordForm.relnewPass) {
          //   that.$message.warning('密码不能为空！')
          //   return false
          // }
          if (that.passwordForm.oldpass == that.passwordForm.newPass) {
            that.$message.warning('新密码不能和原密码一致！')
            return false
          }
          if (that.passwordForm.relnewPass != that.passwordForm.newPass) {
            that.$message.warning('新密码输入不一致！')
            return false
          }

          var params = {
            phone: that.user.username,
            oldPassword: that.passwordForm.oldpass,
            newPassword: that.passwordForm.newPass,
            relnewPassword: that.passwordForm.relnewPass
          }
          that
            .$post('/epf-admin/admin/user/updatepssd', {
              oldPassword: that.passwordForm.oldpass,
              newPassword: that.passwordForm.newPass
            })
            .then(res => {
              // console.log(res)
              if (res.code != 0) {
                that.$message.warning(res.msg)
                return
              }
              that.$message.warning(res.msg)
              that.psddialogFormVisible = false
            })
        } else {
          this.$message.warning(res.msg)
          return false
        }
      })
      // this.$refs[formName].resetFields()
    },
    updatepasswordCancel (formName) {
      this.psddialogFormVisible = false
      // this.$refs[formName].resetFields()
    },
    handleSwitchScreen () {
      if (this.isFullScreen) {
        exitFullscreen()
        this.isFullScreen = false
      } else {
        requestFullScreen()
        this.isFullScreen = true
      }
    },
    handleSwitchHideSide () {
      this.$emit('hide-side')
    },
    changeSide (e) {
      let describe = e.currentTarget.getAttribute('describe')
      Bus.$emit('describe', describe)
    },
    handleSelect1 (key, keyPath) {
      console.log(key, keyPath)
      this.activeIndex2 = key
      Bus.$emit('describe', key)
    },
    changeMenu (newTheme) {
      let themeIndex = null
      let allTheme = this.themes
      // 保存用户选择的主题
      let user = JSON.parse(sessionStorage.getItem('user')).username

      localStorage.setItem(
        'userTheme',
        JSON.stringify({ userName: user, userTheme: newTheme })
      )

      let hasTabs = allTheme.some((item, index) => {
        if (item.name === newTheme) {
          themeIndex = index
          return true // true标识已有改选项卡
        }
      })

      this.menuBackgroundColor = allTheme[themeIndex].theme.menuBackgroundColor
      this.menuTextColor = allTheme[themeIndex].theme.textColor
      this.menuActiveTextColor = allTheme[themeIndex].theme.activeTextColor
      this.$bus.$emit('themChange', allTheme[themeIndex].theme)
      localStorage.setItem('theme_BackgroundColor', this.menuBackgroundColor)
      localStorage.setItem('theme_TextColor', this.menuTextColor)
    },
    outSystem () {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      // 清除tabs
      this.clearTab()
      if (this.adminName !== 'zsk') {
        this.$router.push({ path: '/login' })
      } else if (this.adminName === 'zsk') {
        this.$router.push({ path: '/login?type=2' })
      }
    },
    handleChange (value) {
      // console.log(this.slectdefall)
      this.singleuser.orgId = value[value.length - 1]
    },
    getImgUrl (id) {
      return '/api/epf-document/document/downloadById?id=' + id
    },

    //  开始上传
    userUploadFile (files) {
      const file = files.file

      const formData = new FormData()

      formData.append('files', file)

      this.$useAppend('/epf-document/document/upload', formData).then(res => {
        // console.log(res)
        files.onProgress(file)
        if (res.state != 'SUCCESS') {
          this.$message.error('图片上传失败，请重新上传')
          return null
        }
        this.singleuser.iconImg = res.data[0].id
        this.imageUrl
          = '/api/epf-document/document/downloadById?id=' + res.data[0].id
        files.onSuccess(res)
      })
    },
    //  上传成功
    handleAvatarSuccess (res, file) { },
    //  上传限制
    beforeAvatarUpload (file) {
      // console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt6M = file.size / 1024 / 1024 < 6
      if (file.size === 0) {
        this.$message.error('上传土地照片大小不能为0')
        return false
      }
      if (!isPNG && !isJPG && !isGIF) {
        this.$message.error('上传土地照片只能是 jpg , png , gif 格式!')
        return false
      }
      if (!isLt6M) {
        this.$message.error('上传土地照片大小不能超过 6MB!')
        return false
      }
    },
    rednderTopMenu (menuData) {
      let topMenuWidth
        = document.getElementById('navBarId') != null
          ? document.getElementById('navBarId').clientWidth
          : window.innerWidth
      topMenuWidth = topMenuWidth - 220 - 30 - 255 - 130 - 30
      let canIn = Math.floor(topMenuWidth / 142) // 容器能放多少个菜单
      if (this.canJoin == canIn) {
        return
      }
      this.canJoin = canIn
      this.setTopMentWidth = 142 * this.canJoin
      let newoutMenu = []
      let newhiddenMenu = []
      // console.log('容器能放', this.canJoin)

      menuData.map((val, index) => {
        if (index < this.canJoin) {
          newoutMenu.push(val)
        } else {
          newhiddenMenu.push(val)
        }
      })
      if (newhiddenMenu.length == 0) {
        this.hasMore = false
      } else {
        this.hasMore = true
      }

      if (newhiddenMenu.length == 0) {
        this.hasMore = false
        // console.log(this.hasMore)
      }
      this.outMenu = newoutMenu
      this.hiddenMenu = newhiddenMenu
      for (var key in this.outMenu) {
        this.outMenu[key]['topIcons'] = this.topIcons.slice(
          0,
          this.outMenu.length
        )[key].url
      }
      for (var key in this.hiddenMenu) {
        this.hiddenMenu[key]['topIcons'] = this.topIcons.slice(
          this.outMenu.length
        )[key].url
      }
    },
    async getUserMsg () {
      let res = await this.$get('/epf-admin/admin/user/geUserInfo')
      this.adminName = res.username
      if (res.username === 'zsk') {
        this.activeIndex2 = 'knowledgeManage'
        this.handleSelect1('knowledgeManage', ['knowledgeManage'])
      } else {
        this.activeIndex2 = 'pages/admin/home-page/LeadershipIndex'
      }
    },
    changeType1 () {
      this.seen1 = !this.seen1
      this.pwdType1 = !this.pwdType1
    },
    changeType2 () {
      this.seen2 = !this.seen2
      this.pwdType2 = !this.pwdType2
    },
    changeType3 () {
      this.seen3 = !this.seen3
      this.pwdType3 = !this.pwdType3
    },
    checkStrong (sValue) {
      var modes = 0
      // 正则表达式验证符合要求的
      if (sValue.length < 1) return modes
      if (/\d/.test(sValue)) modes++ // 数字
      if (/[a-zA-Z]/.test(sValue)) modes++ // 大小写
      if (/\W/.test(sValue)) modes++ // 特殊字符
      if (sValue.length > 7) modes++ // 长度达到8位或以上
      // 逻辑处理
      switch (modes) {
        case 1:
          return 1
          break
        case 2:
          return 2
          break
        case 3:
          return 3
          break
        case 4:
          return 4
          break
      }
      return modes
    }
  },
  mounted () {
    // window.onresize = () => {
    //   this.rednderTopMenu(this.menuGroups);
    // };
    window.addEventListener(
      'resize',
      () => {
        this.rednderTopMenu(this.menuGroups)
      },
      0
    )
  },
  created () {
    let that = this
    this.getLoginUser()
    let user = JSON.parse(sessionStorage.getItem('user')).username
    var theme = localStorage.getItem('theme') || 'keji'
    if (localStorage.getItem('userTheme')) {
      let uTheme = JSON.parse(localStorage.getItem('userTheme'))
      if (uTheme.userName == user) {
        theme = uTheme.userTheme
      }
    }
    this.userRealName
      = sessionStorage.getItem('userName') == 'undefined'
        ? JSON.parse(sessionStorage.getItem('user')).username
        : sessionStorage.getItem('userName')
    this.themeType = theme
    this.changeMenu(this.themeType)
    if (localStorage.getItem('menuData')) {
      // console.log('本地存储有getMenuList')
      let menuGroups = JSON.parse(localStorage.getItem('menuData')).menus
      this.menuGroups = menuGroups
      this.rednderTopMenu(menuGroups)
      this.$bus.$emit('menuData', JSON.parse(localStorage.getItem('menuData')))
    } else {
      this.$get('/epf-admin/admin/menu/getMenuList').then(res => {
        if (res.code == 0) {
          // console.log('本地没有存储getMenuList')
          localStorage.setItem('menuData', JSON.stringify(res))
          let menuGroups = res.menus
          this.menuGroups = menuGroups
          this.rednderTopMenu(menuGroups)
        } else {
          this.$message.error(res.msg)
        }
      })
    }

    that.$get('/epf-admin/admin/user/geUserInfo').then(res => {
      that.singleuser = res
      that.imageUrl = that.getImgUrl(res.iconImg)
      that.org()
    })

    this.$get('/epf-cms/cms/basics/getInformationList', {}).then(res => {
      if (res.code != '0') {
        this.$message.error(res.msg) // 失败
        return
      }
      this.InfoConfigBase = res.list[0]
      this.$bus.$emit('homeData', res.list[0])
    })

    this.getUserMsg()
  }
}
</script>
<style scoped>
.navBarBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#navBarId {
  background-image: linear-gradient(
    90deg,
    rgba(15, 36, 106, 1) 0%,
    rgba(0, 63, 163, 1) 40%,
    rgba(15, 36, 106, 1) 100%
  );
}

#navBarId .el-menu {
  background-image: linear-gradient(
    135deg,
    rgba(8, 48, 131) 0%,
    rgba(1, 60, 156) 50%,
    rgba(14, 40, 114) 100%
  );
}

#topMenu {
  margin-left: auto;
  margin-right: 0px;
  height: 100%;
  flex-shrink: 1;
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
.topMenuIcon {
  display: inline-block;
  width: 100%;
  height: 74px;
  padding: 0 15px;
  transition: 0.3s;
  cursor: pointer;
}
.topMenuIcon > i {
  font-weight: lighter;
  font-size: 16px;
  position: relative;
  top: 2px;
}
.popoverTitle {
  padding: 0 6px;
  font-size: 14px;
}
.topMenuIcon:hover {
  color: #ffffff !important;
}
.title-special {
  color: #76b0ff;
}
.line-special {
  position: absolute;
  width: 1px;
  height: 66px;
  background: rgba(0, 10, 44, 1);
  box-shadow: 0px 1px 1px 0px rgba(0, 84, 183, 1);
  border-radius: 1px;
  top: 4px;
  right: 0;
}
.nav-special:hover {
  color: #fff;
}

.input_span {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 16px;
}
.input_span span {
  display: inline-block;
  height: 16px;
  background: #eee;
  line-height: 20px;
  font-size: 12px;
}
#one {
  width: 33%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-right: 0px solid;
}

#two {
  width: 33%;
  border-left: 0px solid;
  border-right: 0px solid;
}

#three {
  width: 33%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-left: 0px solid;
}

#font {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 24px;
}
#font span:nth-child(1) {
  color: red;
  font-size: 14px;
}
#font span:nth-child(2) {
  color: orange;
  font-size: 14px;
}
#font span:nth-child(3) {
  color: #00d1b2;
  font-size: 14px;
}
</style>

<style type="text/css">
#navBarId .el-menu {
  background: linear-gradient(left, #3f80c4, #2665b5);
  background: -ms-linear-gradient(left, #3f80c4, #2665b5);
  background: -webkit-linear-gradient(left, #3f80c4, #2665b5);
  background: -moz-linear-gradient(left, #3f80c4, #2665b5);
}
.el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
  display: none;
}

#navBarId .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
#navBarId .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: transparent;
}

#navBarId .el-menu.el-menu--horizontal {
  border-bottom: solid 0px #e6e6e6;
}

#navBarId .el-submenu .el-submenu__title {
  border-bottom: solid 0px #e6e6e6 !important;
}

.el-menu--popup-bottom-start {
  margin: 0 !important;
}
.el-select.themeSelect .el-input.el-input--suffix .el-input__suffix {
  left: 70px !important;
}
.systemNav1 {
  width: 234px;
  height: 74px;
  color: #fff;
  /* font-size: 22px; */
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.systemNav2 {
  width: 195px;
  color: #cdd4d9;
  font-size: 22px;
}
#userMenu > a:hover {
  text-decoration: none;
}
.side-switch {
  display: inline-block;
  font-size: 32px;
  cursor: pointer;
  color: inherit;
  margin-top: 20px;
}
.side-switch:hover {
  color: #fff;
}
.el-menu-header {
  border-bottom: none;
  display: flex;
}
.el-menu-header .el-menu-item {
  height: 74px;
  line-height: 74px;
}
.el-menu-header2 .el-menu-item {
  height: 50px;
  line-height: 50px;
}
.el-menu-header .el-submenu {
  height: 100%;
}
.el-menu-header .el-submenu .el-submenu__title {
  height: 74px;
  line-height: 74px;
}
.el-menu-header2 .el-submenu .el-submenu__title {
  height: 50px;
  line-height: 50px;
}
.el-dialog__header {
  line-height: 25px;
}
.topMenuPopper {
  top: 58px !important;
  padding: 0px !important;
  border: none !important;
}
.topMenuPopper .el-menu {
  border: none !important;
}
.m-dropdown .only-panel {
  margin: 4px 0 0 !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 0px solid transparent;
  color: #303133;
}
.el-menu-item.is-active {
  border-bottom-color: transparent !important;
}
</style>
<style>
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
.mmDialog .el-dialog__header {
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
.mmDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.mmDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.mmDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.mmDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.mmDialog .el-dialog__body .el-form {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
.mmDialog .el-dialog__body .el-form .el-input__inner {
  padding: 0px 35px 0px 15px;
}
.mmDialog .el-dialog__body .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.mmDialog .el-dialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mmDialog .el-dialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mmDialog .el-dialog .button_qian,
.mmDialog .el-dialog .button_shen {
  margin-left: 0px;
}
.xxxgDialog .el-dialog__header {
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
.xxxgDialog .el-dialog__title {
  font-size: 18px;
  color: rgba(89, 89, 89, 1);
  font-weight: 600;
}
.xxxgDialog .el-dialog__header .el-dialog__headerbtn {
  width: 24px;
  height: 24px;
  top: 12px;
  border-radius: 24px;
  background-color: #d5d5d5;
}
.xxxgDialog .el-dialog__header .el-dialog__headerbtn .el-icon-close {
  font-size: 18px;
  color: #fff;
  border: 0px;
}
.xxxgDialog .el-dialog__body {
  padding: 0 16px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.xxxgDialog .el-dialog__body .el-container {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
}
/* .xxxgDialog .el-dialog__body .el-form {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-radius: 2px;
  border: 1px solid rgba(231, 231, 231, 1);
} */
.xxxgDialog .el-dialog__body .el-form .el-input__inner {
  padding: 0px 35px 0px 15px;
}
.xxxgDialog .el-dialog__body .el-form .el-form-item__label {
  font-size: 16px;
  color: rgba(72, 72, 72, 1);
}
.xxxgDialog .el-dialog .el-dialog__footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.xxxgDialog .el-dialog .el-dialog__footer .dialog-footer {
  height: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.xxxgDialog .el-dialog .button_qian,
.xxxgDialog .el-dialog .button_shen {
  margin-left: 0px;
}
</style>
