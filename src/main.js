// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import Es6Promise from "es6-promise";
import ElementUI, { Alert } from "element-ui";
import Axios from "axios";
import {
  get,
  post,
  useAppend,
  deletes,
  put,
  gisPost,
  gisGet
} from "./utils/http";
import NProgress from "nprogress";
import VDistpicker from "v-distpicker";
import { MessageBox } from "element-ui";

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

import App from "./App";
import store from "./store";
import router from "./router";
// 动态路由
import _router from "./promission";
import "@/assets/font-awesome-4.7.0/css/font-awesome.min.css";
import "@/assets/css/main.css";
import "@/assets/css/scrollbar.css";
import "@/assets/css/reset.css";
import "@/assets/css/changeElStyle.css";
import "@/assets/css/ownIcon.css";
import "nprogress/nprogress.css";
import "animate.css";
import animated from "animate.css";

import DropdownPlugin from "./m/dropdown";
import NavbarPlugin from "./m/navbar";
import ContextMenuPlugin from "./m/context-menu";
import MButton from "@/m/button";
import MSwitch from "@/m/switch";
import MAlert from "@/m/alert";
import MCheckbox from "@/m/checkbox";
import MInput from "@/m/input";
import MLoading from "@/m/loading";
import Mkeyboard from "@/m/keyboard";
import MNumberkeyboard from "@/m/number-keyboard";
import MBox from "@/m/box";
import MBackTop from "@/m/back-top";
import MLoader from "@/m/loader";
import MContainer from "@/m/container";
import JsonExcel from "vue-json-excel";
import Blob from "../src/excel/Blob";
import Export2Excel from "../src/excel/Export2Excel.js";

import "@/epf-components/index";

import "../src/components/directive/drag";
// 引入自定义组件
import commonComponents from "./components/common/common";
import rightmenu from "./components/common/rightMenu//index.js";

import bus from "./utils/bus";
import "@/assets/css/common.css";
import tinymceVue from "@tinymce/tinymce-vue";
import Print from "vue-print-nb";

require("es6-promise").polyfill();
Es6Promise.polyfill();
Vue.use(Print);
Vue.use(ElementUI);
const pkg = require("../package.json");
Vue.use(VueAwesomeSwiper);
Vue.use(DropdownPlugin);
Vue.use(NavbarPlugin);
Vue.use(ContextMenuPlugin);
Vue.use(MButton);
Vue.use(MSwitch);
Vue.use(MAlert);
Vue.use(MCheckbox);
Vue.use(MInput);
Vue.use(MLoading);
Vue.use(Mkeyboard);
Vue.use(MNumberkeyboard);
Vue.use(MBox);
Vue.use(MBackTop);
Vue.use(MLoader);
Vue.use(MContainer);
Vue.component("v-distpicker", VDistpicker);
Vue.component("tinymceEditor", tinymceVue);
Vue.component("downloadExcel", JsonExcel);
Vue.use(animated);
Vue.use(commonComponents);
Vue.use(rightmenu);
Vue.use(Blob);
Vue.use(Export2Excel);

var whiteList = ["demo", "login"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  let token = sessionStorage.getItem("token");
  if (!token && whiteList.indexOf(to.name) === -1) {
    // app && app.$message.warning("未授权，请登陆授权后继续");
    NProgress.done();
    return next({ name: "login" });
  } else {
    // 已登录的情况下刷新
    if (token && !store.state.routerData) {
      _router.setNeedRouter();
      store.state.routerData = true;
      NProgress.done();
      return next();
    }
  }
  NProgress.done();
  return next();
});

router.afterEach(transition => {
  setTimeout(() => {
    NProgress.done();
  });
});

router.onError(() => {
  router.push({ path: "/500" });
});

window.APP_INFO = {
  projectName: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  appName: (pkg.app && pkg.app.name) || pkg.appName,
  dependencies: pkg.dependencies,
  engines: pkg.engines,
  license: pkg.license
};
Vue.directive("dialogDrag", {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector(".el-dialog__header");
    const dragDom = el.querySelector(".el-dialog");
    dialogHeaderEl.style.cursor = "move";

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes("%")) {
        styL =
          +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
        styT =
          +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
      } else {
        styL = +sty.left.replace(/\px/g, "");
        styT = +sty.top.replace(/\px/g, "");
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${t + styT}px`;

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});

Vue.directive("preventReClick", {
  inserted(el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 3000);
      }
    });
  }
});

// status < 500 不会抛错误
Axios.defaults.validateStatus = status => {
  return status < 500;
};
// 设置请求token
Axios.interceptors.request.use(config => {
  var token = sessionStorage.getItem("token");
  config.headers["token"] = sessionStorage.getItem("token");
  // console.log(config)
  return config;
});

// 接口错误拦截
let count = 0;
Axios.interceptors.response.use(
  res => {
    if (res.status === 401) {
      count++;
      if (count === 1) {
        // app && app.$message({
        //   type: 'warning',
        //   message: '登录身份过期，请重新登录。'
        // })
        // sessionStorage.removeItem('token')
        // sessionStorage.removeItem('user')
        // router.push({ name: 'login' })

        MessageBox.$confirm("需要重新登录，是否前往？", "token已失效!", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          // type: "warning",
          closeOnClickModal: false,
          closeOnPressEscape: false
        })
          .then(() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            router.push({ name: "login" });
            count = 0;
            return Promise.reject(new Error("身份过期"));
          })
          .catch(() => {});
      }
    } else {
      return res.data;
    }
  },
  err => {
    app.$notify.error({
      title: "服务错误",
      message: "服务器响应错误 " + err.message
    });
    return Promise.reject(err);
  }
);

Vue.prototype.resetSetItem = function(key, newVal) {
  if (key === "watchStorage") {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent("StorageEvent");
    const storage = {
      setItem: function(k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent(
          "setItem",
          false,
          false,
          k,
          null,
          val,
          null,
          null
        );
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    };
    return storage.setItem(key, newVal);
  } else if (key === "watchShow") {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent("StorageEvent");
    const storage = {
      setItem: function(k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent(
          "setItem",
          false,
          false,
          k,
          null,
          val,
          null,
          null
        );
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    };
    return storage.setItem(key, newVal);
  }
};

Vue.prototype.deepClone = function(obj) {
  var objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = this.deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
};

Vue.prototype.$deepClone = function(obj) {
  var objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = this.deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
};
Vue.prototype.$clone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};
Vue.prototype.$math = function(math) {
  if (math) {
    if (!/^\d+$/.test(math)) {
      math = parseFloat(math).toFixed(2);
    }
  } else {
    math = "-";
  }
  return math;
};
Vue.prototype.$bus = bus;
Vue.prototype.$http = Axios;
Vue.http = Axios;

//  封装好的axios
// Vue.get = get
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$useAppend = useAppend;
Vue.prototype.$gisPost = gisPost;
Vue.prototype.$gisGet = gisGet;
Vue.config.productionTip = false;

/* eslint-disable no-new */
var app = new Vue({
  mode: "history",
  el: "#app",
  store,
  router,
  template: "<App/>",
  components: { App }
});
window.app = app;
