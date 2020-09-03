<template>
  <div>
    <!-- <van-cell title="创建的角色" style="background:#f7f7f7;margin:0" value /> -->
    <van-nav-bar left-text="创建的角色" />
    <van-collapse v-model="activeNames" @change="commitChange" :accordion="true">
      <van-collapse-item
        :title="item.F_FullName"
        :name="item.F_RoleId"
        v-for="(item,index) in listData"
        :key="index"
      >
        <van-cell
          @click="showInfo(item1,item.F_FullName)"
          :title="item1.F_RealName"
          v-for="(item1,index1) in item.children"
          :key="index1"
        >
          <template #right-icon>
            <span
              v-if="item1.F_RealName"
              :style="{background:item1.color}"
              style="margin-right:5px"
              class="_icon"
            >{{item1.F_RealName.slice(0,1)}}</span>
          </template>
        </van-cell>
        <template #title>
          <div style="display:flex">
            <van-icon class="_icon" name="friends-o" />
            <span style="margin-left:5px">{{item.F_FullName}}</span>
          </div>
        </template>
      </van-collapse-item>
    </van-collapse>

    <!-- 成员信息 -->
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
      <van-cell title="角色" style="margin:0" :value="showData.roleTitle">
        <template #icon></template>
      </van-cell>
    </van-action-sheet>
  </div>
</template>

<script>
import { getRoleMemberList } from "../../request";
export default {
  data() {
    return {
      activeNames: "",
      listData: [],
      showUser: false,
      showData: ""
    };
  },
  created() {
    this.listData = this.$route.params.list;
  },
  methods: {
    onCancel() {
      this.show = false;
    },
    //成员点击
    showInfo(data, title) {
      console.log(data);
      data.roleTitle = title;
      this.showUser = true;
      this.showData = data;
    },
    commitChange(data) {
      let params = {
        formDataModel: { pageIndex: 1, pageSize: 10 },
        roleEntity: { F_RoleId: data }
      };
      getRoleMemberList(params).then(res => {
        this.listData.forEach(item => {
          if (item.F_RoleId == data) {
            this.$set(item, "children", JSON.parse(res.data.tableData));
            item.children.forEach(item1 => {
              this.$set(item1, "color", this.color16());
            });
          }
        });
      });
      console.log(data);
    },
    color16() {
      //十六进制颜色随机
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      return color;
    }
  }
};
</script>

<style lang="less" scoped>
.van-cell__title {
  display: flex;
}
/deep/.van-nav-bar__text {
  color: black;
}
.van-action-sheet__cancel {
  background: #409eff;
  color: white;
}
/deep/.van-collapse-item__content {
  padding: 0;
  margin-left: 28px;
}
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
</style>