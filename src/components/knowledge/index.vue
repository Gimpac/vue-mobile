<template>
  <div class="knowledge">
    <div class="knowledge_main">
      <van-search v-model="value" shape="round" placeholder="搜索知识库、文档" />
      <p style="margin-left:15px;font-size:14px">知识库</p>

      <div class="name_head" @click="knowClick">
        <van-icon name="column" size="30" style="color:#03aaf4" />
        <div>
          <p>示例知识库</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      value: ""
    };
  },
  created() { },
  methods: {
    knowClick() {
      Toast("暂未开放");
    }
  }
};
</script>
<style lang="less" scoped>
.classP {
  font-size: 7.5rem;
}
.knowledge {
  display: flex;
  width: 100%;
  height: 98vh;
  flex-direction: column;
  background: white;
  font-size: 50px;
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
  height: 105px;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;

  i {
    color: #03aaf4;
    margin-top: 10px;
  }

  div {
    height: 85px;
    margin-left: 29px;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    padding: 0px 0px 10px 0px;
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    p {
      margin: 0;
      padding: 0;
      font-size: 24px;
    }
  }
}
</style>