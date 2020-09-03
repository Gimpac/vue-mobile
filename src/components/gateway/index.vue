
<template>
  <div class="container">
    <div class="header"></div>
    <div class="main">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      wsUrl: "",
      websocket: null
    };
  },
  created() {
    // var ws = new WebSocket("wss://echo.websocket.org");
    // ws.onopen = function (evt) {
    //   console.log("Connection open ...");
    //   ws.send("Hello WebSockets!");
    // };
    // ws.onmessage = function (evt) {
    //   console.log("Received Message: " + evt.data);
    //   ws.close();
    //   Notify(evt.data);
    // };
    // ws.onclose = function (evt) {
    //   console.log("Connection closed.");
    // };
  }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  margin-top: 10px;
}
</style>