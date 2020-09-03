
<template>
  <div class="container">
    <div style="height:30px;line-height:39px;margin:0px 0px 5px 15px;font-size:16px">当前所在团队信息</div>
    <van-cell is-link @click="showPopup">
      <span>通讯录头像</span>
      <template #right-icon>
        <span class="_icon" v-if="$store.getters.name">{{$store.getters.name.slice(0,1)}}</span>
      </template>
    </van-cell>
    <van-cell is-link @click="showPopup">
      <span>通讯录姓名</span>
      <template #right-icon>
        <span v-if="$store.getters.name">{{$store.getters.name}}</span>
      </template>
    </van-cell>
    <van-cell is-link @click="showPopup">
      <span>登出</span>
    </van-cell>
    <van-popup v-model="show"></van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import { Dialog } from "vant";
import { loginOut } from '../request'
export default {
  data() {
    return {
      show: false
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  created() { },
  methods: {
    accountSet() { },
    showPopup() {
      Dialog.confirm({
        title: "是否确认退出登录",
        message: ""
      })
        .then(() => {

          this.$store.dispatch("FedLogOut", {}).then(res => {
            window.location.reload();
            this.$router.push("/login");
          }).catch(err => {

          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #f7f7f7;

  ._icon {
    width: 46px;
    height: 46px;
    background: skyblue;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 23px;
    color: white;
  }

  .name_head {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    height: 65px;
    background-color: #fff;
    align-items: center;

    div {
      height: 45px;
      margin-left: 29px;
      p {
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>