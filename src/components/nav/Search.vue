<template>
  <div>
    <el-col :span="10">
      <el-input v-model="keyword" placeholder="input"></el-input>
    </el-col>
    <el-col :span="3">
      <el-button circle @click="searchData">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo2"></use>
        </svg>
      </el-button>
    </el-col>
  </div>
</template>

<script>
import router from "../../router";
import eventBus from "../../js/eventBus";
import vm from "../../main";
import comm from "../../js/comm/comm";

export default {
  name: "Search",
  data() {
    return {
      keyword: ''
    };
  },
  methods: {
    searchData() {
      let keyword = this.keyword;
      if (keyword === '') {
        comm.errorMsg("请输入要搜索的关键字");
        return;
      }
      var rule = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
      if (keyword === "" || rule.test(keyword)) {
        this.$message.error("禁止输入特殊符号");
        return;
      }
      eventBus.$emit("search", keyword);
      router.push('/mv-s');
    },
  }
}
</script>

<style scoped>

</style>
