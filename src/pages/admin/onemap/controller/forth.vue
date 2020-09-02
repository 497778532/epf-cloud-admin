<template>
  <div class="forth-container">
    <!-- 数据分析 -->
    <div class="title1"><span class="shuXian"> |</span>&nbsp;<span style="font-size:16px">常见业务分析</span></div>
    <div class="box1">
      <div class="box">
        <img src="../images/两规冲突.png"
             alt="">
        <p>两规冲突</p>
      </div>
      <div class="box">
        <img src="../images/规划现状分析.png"
             alt="">
        <p>规划现状冲突</p>
      </div>
      <div class="box">
        <img src="../images/历年现状.png"
             alt="">
        <p>历年现状</p>
      </div>
      <div class="box">
        <img src="../images/规划符合性.png"
             alt="">
        <p>规划符合性</p>
      </div>
      <div class="box">
        <img src="../images/压覆矿.png"
             alt="">
        <p>压覆矿</p>
      </div>
      <div class="box">
        <img src="../images/地质灾害点.png"
             alt="">
        <p>地质灾害点</p>
      </div>
      <div class="bigger">
        <img src="../images/地质灾害易发区.png"
             alt="">
        <p>地质灾害易发区</p>
      </div>
    </div>
    <div class="title2"><span class="shuXian"> |</span>&nbsp;<span style="font-size:16px">通用分析</span></div>
    <div class="box2">
      <div class="box">
        <img src="../images/叠加分析.png"
             alt="">
        <p>叠加分析</p>
      </div>
      <div class="box">
        <img src="../images/缓冲区分析.png"
             alt="">
        <p>缓冲区分析</p>
      </div>
    </div>
    <!-- 两规分析 -->

  </div>
</template>
<script>
export default {
  name: 'forth'
}
</script>
<style lang="css">
.forth-container {
  font-size: 12px;
  padding: 10px 5px;
}
.box {
  width: 33.33%;
  float: left;
}
.shuXian {
  display: inline-block;
  padding-right: 5px;
  height: 10px;
  height: 4px;
  color: rgba(40, 130, 229);
}
.bigger {
  padding-top: 160px;
  padding-left: 16px;
}
.box2 {
  padding-top: 10px;
}
.title2 {
  padding-top: 20px;
}
</style>
