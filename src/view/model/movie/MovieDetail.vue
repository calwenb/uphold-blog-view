<template>
  <div class="main">
    <el-row type="flex">
      <el-image class="mvImage" :src="mv.data"></el-image>
      <el-row class="content">
        <h3>{{ mv.name }} — {{ mv.releaseYear }}</h3>
        <el-row>别名：{{ mv.otherName }}</el-row>
        <el-row>类型：{{ mv.type }}</el-row>
        <el-row>地区：{{ mv.region }}</el-row>
        <el-row>语言：{{ mv.language }}</el-row>
        <el-row>时长：{{ mv.time }} 分钟</el-row>
        <el-row>演员：{{ mv.actor }}</el-row>
        <el-row>上映时间：{{ mv.releaseTime }}</el-row>
        <el-row>评分：{{ mv.score }}</el-row>
      </el-row>
    </el-row>
    <br>

    <el-divider content-position="left">简介</el-divider>
    <el-row>{{ mv.intro }}</el-row>
    <br> <br>
    <el-divider content-position="left">资源</el-divider>
    <div class="resource">
      <el-collapse>
        <el-collapse-item v-for="(resource,i) in resources" :key="i"
                          :title="resource.name">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="resource.resourceLink">
          </el-input>
          <el-button @click="copy(resource.resourceLink)" icon="el-icon-copy-document"/>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-divider content-position="left">推荐</el-divider>
    <div class="recommend">
      <ul>
        <li class="recommendMv" v-for="mv in recommend">
          <el-link :underline="false" :href="'/mv-detail/'+mv.id">
            <el-image class="recommendImage" :src="mv.data"></el-image>
          </el-link>
          <el-row>
            <el-badge :value="mv.score" class="item">
              <el-link :underline="false" :href="'/mv-detail/'+mv.id">
                {{ mv.name }}
              </el-link>
            </el-badge>
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
import comm from "../../../js/comm/comm";

export default {
  name: "MovieDetail",
  data() {
    return {
      id: '',
      mv: {},
      recommend: {},
      resources: '',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    }

  },
  created() {
    let id = this.$route.params.id;
    if (id !== undefined) {
      this.id = id;
      this.getMv();
      this.getResource();
      this.getRecommend();
    }
  },
  methods: {
    getRecommend() {
      axios.get(Global.SERVER_ADDRESS + "/movies/recommend/" + this.id).then(rs => {
        this.recommend = rs.data;
      })
    },
    getMv() {
      axios.get(Global.SERVER_ADDRESS + "/movies/" + this.id + "/o").then(rs => {
        this.mv = rs.data;
      })
    },
    getResource() {
      axios.get(Global.SERVER_ADDRESS + "/resources/list",
        {params: {"targetId": this.id}}
      ).then(rs => {
        this.resources = rs.data;
      })
    },
    copy(text) {
      var cInput = document.createElement("input");
      cInput.value = text;
      document.body.appendChild(cInput);
      cInput.select(); // 选取文本框内容
      document.execCommand("copy");
      document.body.removeChild(cInput);
      comm.successMsg("已复制");
    }
  }
}
</script>

<style scoped>
.recommendMv {
  width: 8vw;
  height: 20vh;
  padding: 0.5vw;
  float: left;
  list-style: none;
}

.recommendImage {
  width: 8vw;
  height: 15vh;
}


.mvImage {
  width: 20vw;
}

.content {
  margin: 1vw;
}

.resource {
  padding: 0vw;
}

</style>
