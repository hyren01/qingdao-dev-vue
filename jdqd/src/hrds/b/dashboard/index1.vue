<!-- <template>
  <div class="dashboard-container">
    <div class="dashboard-aaa">
      <el-button @click="aaa" class="dashboard-aaa-aaa"> 事件识别 </el-button>
      <el-button @click="bbb" class="dashboard-aaa-aaa"> 事件预测 </el-button>
      <el-button @click="ccc" class="dashboard-aaa-aaa"> 事理图谱 </el-button>
      <el-button @click="ddd" class="dashboard-aaa-aaa"> 人员共现 </el-button>
    </div>
  </div>
</template> -->
<template>
  <div>
    <el-row>
        <el-button size="medium">事件识别</el-button>
        <el-button size="medium">事件预测</el-button>
        <el-button size="medium">事理图谱</el-button>
        <el-button size="medium">人员共现</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  methods: {
    aaa() {
      console.log(sessionStorage.getItem("usertype"))
      this.$router.push({ name: "Table" });
      let id = this.hotCities.find(function(item) {
        return item.name == value;
      });
    },
    bbb() {
      this.$router.push({ name: "Nested" });
    },
    ccc() {
      this.$router.push({ name: "Tree" });
    },
    ddd() {
      this.$router.push({ name: "People" });
    }
  }
};
</script>
<style scoped>
  /* .dashboard {
    display: grid;
    grid-template-columns: 250px 250px;
    grid-template-rows: 250px 250px;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    margin-left: 20vw;
    margin-top: 10vh;
    font-size: 30px;
  } */
</style>