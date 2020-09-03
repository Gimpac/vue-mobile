
<template>
  <div class="container">
    <img src="../assets/image/login1.jpg" alt />
    <div class="login">
      <span class="_text">登录</span>
      <van-form @submit="onSubmit" class="form">
        <van-field
          v-model="username"
          id="myInput1"
          name
          left-icon="smile-o"
          label
          placeholder="用户名"
        >
          <template #left-icon>
            <van-icon
              class-prefix="my-icon"
              name="shouji"
              style="margin-right:10px"
              color="#17ead9"
              size="18px"
            />
          </template>
        </van-field>
        <van-field id="myInput2" v-model="password" type="password" name label placeholder="密码">
          <template #left-icon>
            <van-icon
              class-prefix="my-icon"
              name="mima"
              style="margin-right:10px"
              color="#17ead9"
              size="18px"
            />
          </template>
        </van-field>
        <div style="margin:34px">
          <van-button
            class="btnLogin"
            :loading="loginTrue"
            round
            block
            type="info"
            native-type="submit"
          >登录</van-button>
        </div>
      </van-form>
    </div>
    <div class="allTest" v-show="isOriginHei">©2017-2020版权所有</div>
  </div>
</template>
<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      loading: true,
      loginTrue: false,
      showLogin: false,
      weCode: '',
      screenHeight: document.documentElement.clientHeight, // 这里是给到了一个默认值
      originHeight: document.documentElement.clientHeight, // 默认高度在watch里拿来做比较
      isOriginHei: true // 这个属性是固定定位按钮的显隐开关
    };
  },
  created() {


  },
  methods: {
    onSubmit(values) {
      if (this.username == "") {
        Notify({ type: "danger", message: "用户名不能为空" });
        return;
      }
      if (this.password == "") {
        Notify({ type: "danger", message: "密码不能为空" });
        return;
      }
      this.loginTrue = true;

      this.$store
        .dispatch("Login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.$router.push({ path: "/workBench/index" });
          localStorage.setItem("mobile", true);
        })
        .catch(err => {
          Notify({ type: "danger", message: err.info });
          this.loginTrue = false;
        });
    },
  },
  mounted() {
    let self = this;
    window.onresize = () => {
      return (() => {
        self.screenHeight = document.documentElement.clientHeight;
      })();
    };
  },
  watch: {
    screenHeight(val) {
      // 判断软键盘弹出，收起
      if (this.originHeight - val > 50) {
        // 键盘弹出
        this.isOriginHei = false;
      } else {
        // 键盘收起
        this.isOriginHei = true;
      }
    }
  },
  beforeDestroy() {
    window.onresize = null; //注销window.onresize事件
  }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background: #f4f5fa;
  align-items: center;

  .login {
    width: 90%;
    background: white;
    border-radius: 10px;
    margin-top: -38px;

    ._text {
      font-size: 40px;
      margin-top: 30px;
      display: flex;
      // font-weight: bold;
      margin-left: 30px;
    }
  }
  img {
    width: 100%;
  }

  .allTest {
    position: absolute;
    bottom: 60px;
  }

  .form {
    margin-top: 60px;
    height: 400px;

    .btnLogin {
      background-image: linear-gradient(to right, #20dbdb, #5b80e9);
      border: 0 none;
    }
  }
}
</style>