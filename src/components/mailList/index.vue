
<template>
  <div class="container">
    <div class="header"></div>
    <div class="main" style="margin-bottom: 50px">
      <van-search v-model="search" @input="onSearch" shape="round" placeholder="搜索成员" />
      <van-cell title="组织架构" is-link icon="cluster-o" @click="goOrg">
        <template #icon>
          <van-icon class="_icon" style="background:#f5c142" name="cluster-o" />
        </template>
      </van-cell>
      <van-cell title="角色" is-link icon="friends-o" @click="roleClick">
        <template #icon>
          <van-icon class="_icon" name="friends-o" />
        </template>
      </van-cell>
      <!-- 全部成员 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell title="全部成员" style="background:#f7f7f7;margin:0" icon="friends-o">
            <template #icon></template>
          </van-cell>
          <van-cell
            :title="item.F_RealName"
            v-for="(item,index) in listData1"
            :key="index"
            @click="cellUser(item)"
          >
            <template #icon>
              <span class="_icon" :style="{background:item.color}">{{item.F_RealName.slice(0,1)}}</span>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>

      <!-- 成员信息"-->
      <van-action-sheet
        v-model="showUser"
        :title="showData.F_RealName"
        :round="false"
        cancel-text="关闭"
        close-icon
        @cancel="onCancel"
      >
        <van-cell title="头像" style="margin:0">
          <template #right-icon>
            <span
              v-if="showData.F_RealName"
              class="_icon"
              :style="{background:showData.color}"
            >{{showData.F_RealName.slice(0,1)}}</span>
          </template>
        </van-cell>
        <van-cell title="姓名" style="margin:0" :value="showData.F_RealName">
          <template #icon></template>
        </van-cell>
        <van-cell title="工号" style="margin:0" :value="showData.F_Account">
          <template #icon></template>
        </van-cell>
        <van-cell title="手机" style="margin:0" :value="showData.F_Mobile">
          <template #icon></template>
        </van-cell>
        <van-cell title="邮箱" style="margin:0" :value="showData.F_Email">
          <template #icon></template>
        </van-cell>
        <van-cell title="部门" style="margin:0" :value="showData.F_DepartmentName">
          <template #icon></template>
        </van-cell>
        <van-cell title="角色" style="margin:0" value>
          <template #icon></template>
        </van-cell>
      </van-action-sheet>
    </div>
  </div>
</template>
<script>
import { getUserList, getRoleList } from "../../request";
import { Toast } from "vant";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      search: "",
      listData: [],
      pageIndex: 1,
      pageSize: 10,
      queryString: 10,
      showUser: false,
      showData: ""
    };
  },
  created() {
    this.userList();
  },
  computed: {
    listData1() {
      return this.listData.filter(value => {
        return value.F_RealName.match(this.search);
      });
    }
  },
  methods: {
    goOrg() {

    },
    onSearch() {
      if (this.search == "") {
        this.pageIndex = 0;
        this.onLoad();
        return;
      }
      let params = {
        queryString: JSON.stringify({
          F_RealName: this.search
        })
      };
      getUserList(params).then(res => {
        this.listData = JSON.parse(res.data.tableData);
        this.listData.forEach(item => {
          this.$set(item, "color", this.color16());
        });
      });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    //加载事件
    onLoad() {
      this.pageIndex++;
      if (this.refreshing) {
        this.listData = [];
        this.refreshing = false;
        this.pageIndex = 1;
      }

      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        queryString: ""
      };
      // getUserList(params).then(res => {
      //   if (JSON.parse(res.data.tableData).length == 0) {
      //     this.finished = true;
      //     return;
      //   }
      //   JSON.parse(res.data.tableData).forEach(item => {
      //     this.$set(item, "color", this.color16());
      //     this.listData.push(item);
      //     this.loading = false;
      //   });
      // });
    },
    roleClick() {

    },

    onCancel() {
      this.show = false;
    },
    //成员点击
    cellUser(data) {
      this.showUser = true;
      this.showData = data;
    },
    //十六进制颜色随机
    color16() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      return color;
    },
    userList() {
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        queryString: ""
      };
      this.listData = [{
        F_Account: "001913",
        F_CreateDate: "2020-08-05T13:51:26.003",
        F_CreateUserId: "1",
        F_CreateUserName: "Admin",
        F_DeleteMark: 0,
        F_DepartmentId: "510dfb9e-75da-4fd0-993c-5fbe705f5522",
        F_DepartmentName: "圆刀模切科",
        F_EnCode: "001913",
        F_EnterpriseId: "CorpEsy000000000001",
        F_Password: "d206cb64b4ccbaba072a00f7c2c4e410",
        F_PostId: "e6c1db35-b10f-4683-aa26-f0d023631a53",
        F_PostName: "圆刀初级技工",
        F_RealName: "庞振良",
        F_UserId: "74af9822-e9f0-4ba3-83c9-12ca87051088",
      }]
      this.listData.forEach(item => {
        this.$set(item, "color", this.color16());
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-action-sheet__cancel {
  background: #409eff;
  color: white;
}
.van-cell {
  align-items: center;
}
.container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: white;
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
  .van-cell__title {
    margin-left: 10px;
  }
}
</style>