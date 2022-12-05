<template>
  <div>
    <el-card class="blog" shadow="hover" v-for="(blog,i) in data.content" :key="blog">
      <div v-if="i%2===0" style="float: left;">
        <el-link :underline="false" :href="'/blog-detail/'+blog.id">
          <el-image class="blogImage" :src="imgServer+blog.imgUrl">
            <div slot="error" class="image-slot">
              <el-image class="blogImage" :src="defaultImg"/>
            </div>
          </el-image>
        </el-link>
      </div>

      <div v-else style="float: right;">
        <el-link :underline="false" :href="'/blog-detail/'+blog.id">
          <el-image class="blogImage" :src="imgServer+blog.imgUrl">
            <div slot="error" class="image-slot">
              <el-image class="blogImage" :src="defaultImg"/>
            </div>
          </el-image>
        </el-link>
      </div>

      <div style="float: left;padding-left: 1vw;">
        <h3>
          <el-link :underline="false" :href="'/blog-detail/'+blog.id">
            {{ blog.title }}
          </el-link>
        </h3>
        <el-divider direction="vertical"></el-divider>
        <el-tag v-for="tag in blog.tagList" :key="tag" size="mini">{{ tag }}</el-tag>
        <el-divider direction="vertical"></el-divider>
        <span>{{ blog.createTime }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-row>{{ blog.preview }}</el-row>
      </div>

    </el-card>
  </div>
</template>

<script>
import global from "../../js/global";
import axios from "_axios@0.24.0@axios";
import eventBus from "../../js/eventBus";

export default {
  data() {
    return {
      imgServer: global.SERVER + "/files/",
      defaultImg: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      data: {
        content: [],
        page: 1,
        size: 20,
        total: 0,
      },
    }
  },
  mounted() {
    eventBus.$off("blogQuery")
    eventBus.$on("blogQuery", data => {
      this.getList(data != null ? data : {});
    });
  },
  methods: {
    getList(query) {
      query["pageNum"] = this.data.page;
      query["PageSize"] = this.data.size;
      axios.get(global.SERVER + "/blogs/page", {params: query}).then(rs => {
        this.data = rs.data;
      })
    },
  },
}
</script>

<style scoped>
.blog {
  width: 50vw;
  height: 25vh;
  margin-top: 2vh;
}

.blogImage {
  width: 13vw;
  height: 100%;
  float: left;
}
</style>
