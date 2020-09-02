import Axios from "axios";
import store from "./store";
import router from "./router";
import baseUrl from "./utils/config";
import Bus from "./utils/bus";
window.app = app;
function setNeedRouter() {
  localStorage.removeItem("menuData");
  Axios.get(baseUrl.baseURL1 + "/epf-admin/admin/menu/getMenuList").then(
    async res => {
      if (res.code == 0) {
        console.log(res);
        localStorage.setItem("menuData", JSON.stringify(res));
        let menus = traverse(res.menus);
        Bus.$emit("menuData", res);
        //追加路由
        for (let index = 0; index < menus.length; index++) {
          router.options.routes[0].children.push(menus[index]);
        }
        let pages = name => () => import("@/pages" + name);
        router.options.routes[0].children.push({
          path: "/404",
          name: "404",
          component: pages("/common/404/404")
        });
        router.options.routes[0].children.push({
          path: "/500",
          name: "500",
          component: pages("/common/500/500")
        });

        let readRes = await Axios.get(
          baseUrl.baseURL1 + "/epf-admin/admin/user/geUserInfo"
        );
        if (readRes.username === "zsk") {
          router.options.routes[0].children.push({
            path: "*",
            redirect: "/knowledge"
          });
        } else if (readRes.username !== "zsk") {
          router.options.routes[0].children.push({
            path: "*",
            redirect: "/404"
          });
        }

        // //保存需要的路由解决刷新后页面空白问题
        // sessionStorage.setItem('needRouter',JSON.stringify(router.options.routes));
        router.addRoutes(router.options.routes);
        // store.state.routerData = true;
      }
    }
  );
}
function traverse(data) {
  let routerData = [];
  traverseData(data);
  function traverseData(data) {
    for (var index = 0, len = data.length; index < len; index++) {
      if (data[index].resourceId) {
        let admin = name => () => import("@/" + name);
        let newRouter = {
          path: "/" + getRouterName(data[index].url),
          name: data[index].resourceId,
          component: admin(data[index].url)
        };
        routerData.push(newRouter);
      }
      if (data[index].childMenu && data[index].childMenu.length) {
        traverseData(data[index].childMenu);
      }
    }
  }

  return routerData;
}
function getNeedRouter(localRouter, menusData) {
  let resultRouter = [];
  //取出需要的路由
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
        resultRouter.push(localRouter[local]);
      }
    }
  }
  return resultRouter;
}

function getRouterName(filePath) {
  let arr = filePath.split("/");
  return arr[arr.length - 1];
}

export default { setNeedRouter };
