
<template>
  <div class="container">
    <van-nav-bar title left-text style>
      <template #left>
        <van-icon name="manager" style="font-size:26px;color:#075ce3" />
        <div class="nameSetting">
          <span>{{$store.getters.name}}</span>
          <span>某某某</span>
        </div>
      </template>
    </van-nav-bar>

    <div style="height:8px"></div>
    <van-cell is-link>
      <van-icon class-prefix="my-icon" name="mobanguanli1" size="22px" />
      <span style="margin-left:20px;">模板中心</span>
    </van-cell>
    <van-cell is-link @click="showPopup">
      <van-icon class-prefix="my-icon" name="zhanghao1" size="24px" />
      <span style="margin-left:20px;">账号设置</span>
    </van-cell>
    <div style="height:15px"></div>
    <van-cell is-link @click="cellClick">
      <van-icon class-prefix="my-icon" name="fankui" size="24px" />
      <span style="margin-left:20px;">在线反馈</span>
    </van-cell>
    <van-cell is-link style="margin-top：15px">
      <van-icon class-prefix="my-icon" name="bangzhu" size="24px" />
      <span style="margin-left:20px;">在线帮助</span>
    </van-cell>
    <van-cell is-link>
      <van-icon class-prefix="my-icon" name="dianzan" size="24px" />
      <span style="margin-left:20px;">关于我们</span>
    </van-cell>

    <van-dialog
      v-model="showDialog"
      @confirm="confirmDialog"
      @open="openDialog"
      title="留言"
      show-cancel-button
    >
      <van-field
        style="width:100%"
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-dialog>
  </div>
</template>
<script>
import { Toast } from "vant";
import store from "../store";
export default {
  data() {
    return {
      show: false,
      showDialog: false,
      message: "",
      name: apiObj.company
    };
  },
  created() { },
  methods: {
    accountSet() { },
    cellClick() {
      this.showDialog = true;
    },
    openDialog() {
      this.message = "";
    },
    confirmDialog() {
      Toast.success("提交成功");
      this.showDialog = false;
    },
    showPopup() {
      this.$router.push({ path: "/accountSetting" });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.van-cell__value--alone {
  color: #323233;
  text-align: left;
  display: flex;
  align-items: center;
}
/deep/.van-field__body {
  width: 100%;
}
.container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #f7f7f7;

  .nameSetting {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 29px;
    text-align: left;
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