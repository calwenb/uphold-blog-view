<template>
  <div class="main">
    <el-divider content-position="left">
      <h3>搜索</h3>
    </el-divider>
    <el-row>
      为您找到 300 条与 {{keyword}} 相关的资源 耗时 {{time}} 毫秒
    </el-row>

    <div>
      <ul>
        <li class="mv" v-for="mv in mvList">
          <el-link :underline="false" :href="'/mv-detail/'+mv.id">
            <el-image class="mvImage" :src="mv.data"></el-image>
          </el-link>
          <el-row>
            <el-link :underline="false" :href="'/mv-detail/'+mv.id">
              {{ mv.name }}
            </el-link>
          </el-row>
          <el-row>
            <span v-text="mv.releaseYear"></span>
            <span v-text="mv.type"></span>
          </el-row>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

import axios from "../../../js/axios";
import Global from "../../../js/global";
import vm from "../../../main";
import eventBus from "../../../js/eventBus";

export default {
  name: "MovieSearch",
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      mvList: [],
      keyword: '',
      time: 0,
    }
  },
  created() {
    eventBus.$off("search");
    eventBus.$on("search", data => {
      this.keyword = data;
      this.getList();
    })

  },
  methods: {
    getList() {
      let time = new Date();
      axios.get(Global.SERVER + "/movies/list", {
        params: {"keyword": this.keyword,dataType:'t'}
      }).then(rs => {
        this.mvList = rs.data
        console.log(this.mvList)
        this.time = new Date() - time;
      })

    }
  },
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => {
  //     console.log("222")
  //     let keyword = vm.$route.params.keyword;
  //     if (keyword !== undefined) {
  //       vm.keyword = keyword;
  //       vm.getList();
  //     }
  //   });
  // }

}
</script>

<style scoped>
.mv {
  width: 15vw;
  height: 35vh;
  padding: 0.5vw;
  float: left;
  list-style: none;
}
.mvImage {
  width: 15vw;
  height: 30vh;
}
</style>
