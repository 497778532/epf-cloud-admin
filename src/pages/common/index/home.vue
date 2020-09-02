<template>
<div class="error-panel animated fadeInUp">
  <h1 class="error-code">首页</h1>
  <!-- <p class="error-description">Page Not Found</p> -->
  <div class="error-ctrl">
    <!-- <m-button type="info" @click="$router.push({path: '/'})" round><i class="fa fa-home"></i>&nbsp;主页</m-button>
    <m-button @click="$router.back()" round plain><i class="fa fa-arrow-left"></i>&nbsp;返回</m-button> -->
  </div>
  <p class="copyright">广东省国土空间规划“一张图”实施监督信息系统</p>
</div>
</template>
<script>
export default {
  name: 'home',
  created() {
  //   this.$get('/epf-admin/admin/menu/getMenuList').then(res=>{
  //     if(res.code == 0){
  //       console.log(res);
  //       let menus = this.traverse(res.menus)
  //       console.log(menus);

  //       const page = name => () => import('@/pages/' + name)
  //       // let needRouter = this.getNeedRouter(allRouter,menus);

  //       //追加路由
  //       for (let index = 0; index < menus.length; index++) {
  //         this.$router.options.routes[0].children.push(menus[index]);
  //       }
  //       console.log(this.$router.options.routes[0]);

  //       // this.$router.options.routes[0].children.push({path: '/404', name: '404', component: page('404')});
  //       // this.$router.options.routes[0].children.push({path: '*', redirect: '/404'});
  //       // //保存需要的路由解决刷新后页面空白问题
  //       // sessionStorage.setItem('needRouter',JSON.stringify(this.$router.options.routes));
  //       this.$router.addRoutes(this.$router.options.routes);
  //       // this.$store.state.routerData = true;
  //       console.log('路由信息',this.$router);
  //       // this.$router.push({ path: "/" });
  //     }else{
  //       this.$message.error(res.msg);
  //     }
  //   })
  },
  methods: {
    // 遍历路由方法
    traverse(data) {
      let routerData = []
      let that = this
      traverseData(data)
      console.log('我是新出来的----------------' + routerData)
      function traverseData(data) {
        for (var index = 0, len = data.length; index < len; index++) {
          if (data[index].id == '0010101') {
            console.log(data[index].url)
            let vuePath = data[index].url

            // let page = name => () => import('@/pages/' + name)

            let newRouter = {
              'path': '/' + that.getRouterName(data[index].url),
              'name': that.getRouterName(data[index].url),
              'component': page(vuePath)
            }
            routerData.push(newRouter)
          }
          if (data[index].childMenu && data[index].childMenu.length) {
            traverseData(data[index].childMenu)
          }
        }
      }
      return routerData
    },
    getRouterName(filePath) {
      let arr = filePath.split('/')
      return arr[arr.length - 1]
    }
  }
}
</script>

<style type="text/css" scoped>
  .error-panel{
    position: relative;
    width: 350px;
    background: #fff;
    margin: 0 auto;
    margin-top: 150px;
    padding: 15px;
    border-radius: 4px;
    font-family: Roboto, Segoe UI, "Microsoft YaHei";
  }
  .error-panel:after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 30px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  .error-panel .error-code {
    font-size: 4rem;
    font-weight: 100;
    text-align: center;
    margin: 0;
    color: rgb(255, 51, 0);
  }
  .error-panel .error-description{
    text-align: center;
    margin-bottom: 30px;
  }
  .error-panel .error-ctrl{
    text-align: center;
    margin-bottom: 30px;
  }
  .error-panel .copyright{
    text-align: center;
    color: #bfbfbf;
    font-size: 10px;
    line-height: 0px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  }
</style>
