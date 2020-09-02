// import Vue from 'vue'

const state = {
  tabsList: [],
  activeIndex: "home",
  treeCurrent: null,
  treeOpenIds: []
};

const actions = {
  setTabsList({ commit }, tabObj) {
    let active = null;
    /**
     * 先判断数组中是否已有当前点击的标签选项卡,
     * 如果已有则改变active
     * 没有则添加
     */

    // 去掉routerPath中的 首个 /
    if (tabObj.routerPath.substr(0, 1) === "/") {
      tabObj.routerPath = tabObj.routerPath.replace("/", "");
    }

    let hasTabs = state["tabsList"].some((item, index) => {
      if (item.routerPath === tabObj.routerPath) {
        active = index;
        return true; // true标识已有该选项卡
      }
    });
    if (hasTabs) {
      // 设置激活状态
      let indexStr = state["tabsList"][active].routerPath;
      commit("set_activeIndex", indexStr);
    } else {
      // 添加新选项卡并更新激活状态
      let indexStr = tabObj.routerPath;
      console.log(indexStr);
      tabObj["name"] = indexStr;
      console.log("当前新增标签页", tabObj);

      console.log("activeIndexTabs", indexStr);
      console.log("set_tabs", tabObj);

      commit("set_activeIndex", indexStr);
      commit("set_tabs", tabObj);
    }
  },
  //  关闭右侧
  closeRight({ commit }, tabName) {
    console.log("closeRight", tabName);
    if (tabName == "/") {
      let newTabList = [state["tabsList"][0]];
      commit("change_tabs", newTabList);
      commit("set_activeIndex", "home");
    } else {
      let currentIndex = 0;
      let newList = [];
      for (let index = 0; index < state["tabsList"].length; index++) {
        newList.push(state["tabsList"][index]);
        if (state["tabsList"][index].routerPath == tabName) {
          currentIndex = index;
          break;
        }
      }
      commit("change_tabs", newList);
      commit("set_activeIndex", state["tabsList"][currentIndex].name);
    }
  },
  offOther({ commit }, tabName) {
    console.log(tabName);

    if (tabName == "/") {
      let newTabList = [state["tabsList"][0]];
      commit("change_tabs", newTabList);
      commit("set_activeIndex", "home");
    } else {
      let currentIndex = 0;
      let newList = [];
      for (let index = 0; index < state["tabsList"].length; index++) {
        if (state["tabsList"][index].routerPath == tabName) {
          currentIndex = index;
          break;
        }
      }
      newList.push(state["tabsList"][0]);
      newList.push(state["tabsList"][currentIndex]);
      commit("change_tabs", newList);
      commit("set_activeIndex", newList[1].name);
    }
  },
  offAll({ commit }, tabName) {
    let newTabList = [];
    commit("change_tabs", newTabList);
    commit("set_activeIndex", "home");
  },
  deleteTab({ commit }, tabName) {
    if (tabName.substr(0, 1) === "/") {
      tabName = tabName.replace("/", "");
    }

    console.log("这是obj错误", tabName);

    console.log("对比", state, tabName);
    // 不关闭首页
    if (tabName == "home") {
      return;
    }
    let indexRes = null;

    let hasTabs = state["tabsList"].some((item, index) => {
      if (item.routerPath === tabName || item.routerPath.includes(tabName)) {
        indexRes = index;
        return true;
      }
    });
    console.log(state.tabsList[indexRes]);
    /**
     * 是否删除的是当前选中，是则选项卡后退一个，否则保存当前选中
     */
    if (state.tabsList[indexRes].name == state.activeIndex) {
      // 关闭的是当前选中 改变index
      console.log(indexRes + 1, state.tabsList.length);
      if (indexRes + 1 < state.tabsList.length) {
        console.log(222);
        commit("set_activeIndex", state.tabsList[indexRes + 1].name);
      } else if (indexRes - 1 >= 0) {
        console.log(333);
        commit("set_activeIndex", state.tabsList[indexRes - 1].name);
      } else {
        commit("set_activeIndex", "home");
      }
      commit("delete_tabs", indexRes);
    } else {
      commit("delete_tabs", indexRes);
    }
  },
  clearTab({ commit }) {
    commit("clear_tabs");
  },
  // 关闭的标签,跳转到的标签
  closeAndTo({ commit }, tabObj) {
    let tabName = tabObj.del;
    let toObj = tabObj.to;
    // 不关闭首页
    let indexRes = null;

    if (tabName.substr(0, 1) === "/") {
      tabName = tabName.replace("/", "");
    }

    let hasTabs = state["tabsList"].some((item, index) => {
      if (item.routerPath === tabName) {
        indexRes = index;
        return true;
      }
    });
    commit("delete_tabs", indexRes);

    let active = null;
    if (toObj.routerPath.substr(0, 1) === "/") {
      toObj.routerPath = toObj.routerPath.replace("/", "");
    }

    let setNew = state["tabsList"].some((item, index) => {
      if (item.routerPath === toObj.routerPath) {
        active = index;
        return true; // true标识已有该选项卡
      }
    });
    if (setNew) {
      // 设置激活状态
      let indexStr = state["tabsList"][active].routerPath;
      commit("set_activeIndex", indexStr);
    } else {
      // 添加新选项卡并更新激活状态
      let indexStr = tabObj.routerPath;
      tabObj["name"] = indexStr;

      commit("set_activeIndex", indexStr);
      commit("set_tabs", tabObj);
    }
  },
  setActive({ commit }, activeName) {
    commit("set_activeIndex", activeName);
  }
};

const mutations = {
  add_treeOpenIds(state, id) {
    state.treeOpenIds.push(id);
  },
  delete_treeOpenIds(state, id) {
    state.treeOpenIds.splice(
      state.treeOpenIds.findIndex(item => item === id),
      1
    );
  },
  set_treeCurrent(state, item) {
    state.treeCurrent = item;
  },
  set_tabs(state, tabsList) {
    state.tabsList.push(tabsList);
    setTimeout(() => {
      let href = window.location.href;
      if (href.indexOf("/SearchList?word") != -1) {
        let titleName = "搜索页";
        state.tabsList = state.tabsList.filter(obj => {
          return titleName === obj.title;
        });
      } else {
        let titleName = "搜索页";
        state.tabsList = state.tabsList.filter(obj => {
          return titleName !== obj.title;
        });
      }
    }, 0);
  },
  change_tabs(state, tabsList) {
    state.tabsList = tabsList;
  },
  set_activeIndex(state, index) {
    state.activeIndex = index;
  },
  delete_tabs(state, indexRes) {
    state.tabsList.splice(indexRes, 1);
  },
  clear_tabs(state) {
    state.tabsList = [];
    state.activeIndex = "home";
  }
  // SET_LOGIN_TOKEN (state, token) {
  //   if (token) {
  //     sessionStorage.setItem('token', token)
  //   } else {
  //     sessionStorage.removeItem('token')
  //   }
  // }
};

export default {
  state,
  actions,
  mutations
};
