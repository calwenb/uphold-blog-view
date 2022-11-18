<template>
  <div>
    <ul v-for="t in list">
      <el-badge :value="t.count"
                class="item">
        <el-button @click="getBlog(t.value)">{{ t.value }}</el-button>
      </el-badge>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import global from "../../../js/global";
import router from "../../../router";
import eventBus from "../../../js/eventBus";

export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getBlog(tag) {
      eventBus.$emit("blogQuery", {tagList: [tag]})
      router.push('/blog');
    },
    getData() {
      axios.get(global.SERVER + "/blogs/tag/count").then(rs => {
        this.list = rs.data;
      })
    }
  }
}
</script>

<style scoped>

</style>
