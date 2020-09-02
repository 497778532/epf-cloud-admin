import axios from "axios";
import router from "../router";
import baseUrl from "./config";
import qs from "qs";
import { Message, MessageBox } from "element-ui";
// 创建axios实例
const service = axios.create({
  timeout: 1800000 // 请求超时时间
});
var onprogress = "";
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
// var cancelSource="";
var cancelToken = axios.CancelToken;
var source = cancelToken.source();
let pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识

let removePending = config => {
  for (let p in pending) {
    if (pending[p].u === config.url + "&" + config.method) {
      // 当当前请求在数组中存在时执行函数体
      pending[p].f(); // 执行取消操作
      pending.splice(p, 1); // 把这条记录从数组中移除
    }
  }
};

// 添加request拦截器
service.interceptors.request.use(
  config => {
    removePending(config); // 在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken(c => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + "&" + config.method, f: c });
    });
    if (onprogress !== "") {
      config.onUploadProgress = onprogress;
    }
    config.headers["token"] = sessionStorage.getItem("token");
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
// 添加respone拦截器
let count = 0;
service.interceptors.response.use(
  res => {
    removePending(res.config);
    if (res.data.msg == "token已失效！" || res.data.status == "40301") {
      count++;
      if (count === 1) {
        MessageBox.confirm("需要重新登录，是否前往？", "token已失效!", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          // type: "warning",
          closeOnClickModal: false,
          closeOnPressEscape: false
        })
          .then(() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("userName");
            router.push({ name: "login" });
            count = 0;
            return { code: 500, msg: "" };
          })
          .catch(() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("userName");
            count = 0;
          });
      }
    } else {
      return res.data;
    }
  },
  err => {
    if (err.response) {
      // switch (err.response.status) {
      //   case 401:
      //     // 这里写清除token的代码

      //     sessionStorage.removeItem("token");
      //     sessionStorage.removeItem("user");
      //     sessionStorage.removeItem("userName");
      //     router.replace({
      //       path: "login"
      //       // query: { redirect: router.currentRoute.fullPath } // 登录成功后跳入浏览的当前页面
      //     });
      //     Message.error({ message: "身份过期，请重新登录！" });
      // }
      if (err.response.status == 401) {
        count++;
        if (count === 1) {
          MessageBox.confirm("需要重新登录，是否前往？", "token已失效!", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            // type: "warning",
            closeOnClickModal: false,
            closeOnPressEscape: false
          })
            .then(() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("userName");
              router.replace({ path: "login" });
              count = 0;
              // return { code: 500, msg: "" };
            })
            .catch(() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("userName");
              count = 0;
            });
        }
      }
    }
    return Promise.reject(err);
  },
  function axiosRetryInterceptor(err) {
    var config = err.config;
    if (!config || !config.retry) return Promise.reject(err);

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.__retryCount += 1;

    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });

    return backoff.then(function() {
      return axios(config);
    });
  }
);

export function get(url, params) {
  // if(typeof cancelSource ==='function'){
  //   cancelSource('终止请求')
  // }
  // console.log('请求参数', params)
  // params['t'] = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
  return service({
    url: baseUrl.baseURL1 + url,
    method: "get",
    headers: {},
    params: params
    // cancelToken: new axios.CancelToken(function executor(c) {
    //   cancelSource = c;
    // })
  });
}

export function gisGet(url, params) {
  // if(typeof cancelSource ==='function'){
  //   cancelSource('终止请求')
  // }
  // console.log('请求参数', params)
  // params['t'] = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
  let myService = axios.create();
  myService.defaults.timeout = 1000 * 60 * 60;
  myService.defaults.sendSuscced = true; // 初始化报错后的请求状态
  myService.defaults.retryDelay = 10000 * 60 * 60; // 设置超时时间
  return myService({
    url: baseUrl.gisUrl + url,
    method: "get",
    headers: {},
    params: params
    // cancelToken: new axios.CancelToken(function executor(c) {
    //   cancelSource = c;
    // })
  });
}

//  封装post请求
export function post(url, data) {
  // 默认配置
  return service({
    url: baseUrl.baseURL1 + url,
    method: "post",
    data: qs.stringify(data)
  });
}

export function gisPost(url, data) {
  // 默认配置
  let myService = axios.create();
  myService.defaults.timeout = 1000 * 60 * 60;
  return myService({
    url: baseUrl.gisUrl + url,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    transformResponse: [
      function(data) {
        return data.match(/{"Analy.+"Message".+"}/)[0];
      }
    ],
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    data: {
      requestInfo: data + ""
    }
  });
}

export function useAppend(url, data, opction) {
  // 默认配置
  onprogress = opction || "";
  return service({
    url: baseUrl.baseURL1 + url,
    method: "post",
    data: data
  });
}

// 封装put方法 (resfulAPI常用)
export function put(url, data = {}) {
  return service({
    url: baseUrl.baseURL1 + url,
    method: "put",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: JSON.stringify(data)
  });
}
// 删除方法(resfulAPI常用)
export function deletes(url) {
  return service({
    url: baseUrl.baseURL1 + url,
    method: "delete",
    headers: {}
  });
}

export const request = service;
