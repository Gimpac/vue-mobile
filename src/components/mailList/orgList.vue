<template>
  <div>
    <van-nav-bar left-text="组织架构" />
    <!-- <van-nav-bar title="组织架构" /> -->
    <van-collapse v-model="activeNames" @change="commitChange">
      <van-collapse-item
        :title="item.F_FullName"
        :name="item.F_DepartmentId"
        v-for="(item,index) in orgListData.children"
        :key="index"
      >
        <van-cell
          @click="showInfo(item1,item.F_FullName)"
          :title="item1.F_FullName"
          v-for="(item1,index1) in item.children"
          :key="index1"
          v-if="!Array.isArray(item1.children)"
        >
          <template #icon>
            <span
              v-if="item1.F_FullName"
              :style="{background:color16()}"
              style="margin-right:5px"
              class="_icon"
            >{{item1.F_FullName.slice(0,1)}}</span>
          </template>
        </van-cell>

        <div v-else style="border-bottom:1px solid #ebedf0">
          <van-collapse-item
            v-if="Array.isArray(item1.children)"
            v-for="(item1,index1) in item.children"
            :key="index1"
            :name="item1.F_DepartmentId"
            :title="item1.F_FullName"
          >
            <van-cell
              @click="showInfo(item2,item.F_FullName)"
              v-if="!Array.isArray(item2.children)"
              :title="item2.F_FullName"
              v-for="(item2,index2) in item1.children"
              :key="index2"
            >
              <template #icon>
                <span
                  v-if="item2.F_FullName"
                  :style="{background:'#f5c142'}"
                  style="margin-right:5px"
                  class="_icon"
                >{{item2.F_FullName.slice(0,1)}}</span>
              </template>
            </van-cell>
            <!-- 三 -->
            <template #title>
              <div style="display:flex">
                <span
                  v-if="item1.F_FullName"
                  :style="{background:item1.color}"
                  style="margin-right:5px"
                  class="_icon"
                >{{item1.F_FullName.slice(0,1)}}</span>
                <span>{{item1.F_FullName}}</span>
              </div>
            </template>
          </van-collapse-item>
        </div>
        <template #title>
          <div style="display:flex">
            <van-icon class="_icon" style="background:#f5c142" name="cluster-o" />
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
      :close-on-click-overlay="false"
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
import { getRoleMemberList, getOrgList } from "../../request";
export default {
  data() {
    return {
      activeNames: [],
      listData: [],
      showUser: false,
      showData: "",
      orgListData: []
    };
  },
  created() {
    this.orgList();
  },
  methods: {
    orgList() {
      getOrgList().then(res => {
        this.orgListData = res.data[0];
      });
    },
    onCancel() {
      this.show = false;
    },
    //成员点击
    showInfo(data, title) {
      //   console.log(data);
      //   data.roleTitle = title;
      //   this.showUser = true;
      //   this.showData = data;
    },
    commitChange(data) {},
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
.van-action-sheet__cancel {
  background: #409eff;
  color: white;
}
/deep/.van-nav-bar__text {
  color: black;
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