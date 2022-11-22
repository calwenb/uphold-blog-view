<template>
  <div>
    <el-badge v-for="t in list" :value="t.count" class="tag">
      <el-button @click="getBlog(t.value)">{{ t.value }}</el-button>
    </el-badge>
    <div class="main">
      <blog-list/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import global from "../../../js/global";
import eventBus from "../../../js/eventBus";
import BlogList from "../../../components/blog/BlogList";

export default {
  components: {BlogList},
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getBlog(tag) {
      eventBus.$emit("blogQuery", {tagList: [tag]})
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
.tag {
  margin-left: 1vw;
}

</style>
