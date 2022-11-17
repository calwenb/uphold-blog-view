<template>
  <div class="main">
    <div>
      <el-card class="blog" shadow="hover" v-for="(blog,i) in data.content" :key="blog">
        <div v-if="i%2===0" style="float: left;">
          <el-link :underline="false" :href="'/blog-detail/'+blog.id">
            <el-image class="blogImage" :src="imgServer+'?url='+blog.imgUrl"></el-image>
          </el-link>
        </div>

        <div v-else style="float: right;">
          <el-link :underline="false" :href="'/blog-detail/'+blog.id">
            <el-image class="blogImage" :src="imgServer+'?url='+blog.imgUrl"></el-image>
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
  </div>

</template>

<script>
import axios from "axios";
import global from "../../../js/global";

export default {
  data() {
    return {
      imgServer: global.SERVER + "/files",
      src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      data: {
        content: [],
        page: 1,
        size: 20,
        total: 0,
      },
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get(global.SERVER + "/blogs/page", {
        params: {
          pageNum: this.data.page,
          PageSize: this.data.size,
        }
      }).then(rs => {
        this.data = rs.data;
      })
    },

  }

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
