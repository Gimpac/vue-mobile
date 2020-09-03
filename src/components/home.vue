
<template>
  <div class="container">
    <div class="header">
      <van-nav-bar
        title="某某某"
        :placeholder="true"
        left-text
        :fixed="true"
        style="background: #03aaf4;color:white"
      >
        <template #right>
          <van-icon
            class-prefix="my-icon"
            name="lingdang"
            style="margin-right:5px"
            size="22px"
            color="white"
          />
          <van-icon name="setting" size="18px" color="white" @click="userSetting" />
        </template>
        <template #title>
          <span style="color:white">某某某</span>
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer">
      <van-tabbar v-model="active" :placeholder="true" :fixed="true">
        <van-tabbar-item
          icon="home-o"
          v-for="(item,index) in dataList"
          :key="index"
          @click="tabClick(item,index)"
        >
          <span>{{item.name}}</span>
          <template #icon="props">
            <van-icon class-prefix="my-icon" :name="item.icon" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      dataList: [
        {
          name: "门户",
          icon: "qiyemenhu"
        },
        {
          name: "工作台",
          icon: "weiruan"
        },
        {
          name: "知识库",
          icon: "zhishi"
        },
        {
          name: "通讯录",
          icon: "tongxunlu"
        }
      ],
      dataIndex: "1",
      name: apiObj.company
    };
  },
  created() {
    this.active =
      localStorage.getItem("navIndex") == null
        ? 1
        : Number(localStorage.getItem("navIndex"));
  },
  methods: {
    tabClick(item, index) {
      localStorage.setItem("navIndex", index);
      this.dataIndex = index;
      if (item.name == "门户") {
        this.$router.push({ path: "/gateway/index" });
      } else if (item.name == "工作台") {
        this.$router.push({ path: "/workBench/index" });
      } else if (item.name == "知识库") {
        this.$router.push({ path: "/knowledge/index" });
      } else if (item.name == "通讯录") {
        this.$router.push({ path: "/mailList/index" });
      }
    },
    userSetting() {
      this.$router.push({ path: "/accountInfo" });
    }
  }
};
</script>
<style lang="less" scoped>
.currentIndex {
  color: #3291f8;
}
/deep/.van-nav-bar {
  background: #03aaf4 !important;
}
.container {
  background: #f7f7f7;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  .header {
    .corporate_setting {
      position: absolute;
      right: 0px;
      font-size: 22px;
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .main {
    flex: 1;
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
  }
}
</style>