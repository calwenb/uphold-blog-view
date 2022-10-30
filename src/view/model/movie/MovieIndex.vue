<template>
  <div class="main">
    <el-divider content-position="left"><h3>电影</h3></el-divider>
    <!--    {{ type }}-->
    <div>
      <span>类型：</span>

      <el-checkbox-group size="mini" class="check"
                         v-model="checkType" @change="getList">
        <el-checkbox-button v-for="t in type.type" :label="t" :key="t" >{{ t }}</el-checkbox-button>
      </el-checkbox-group>

      <span>地区：</span>
      <el-checkbox-group size="mini" class="check"
                         v-model="checkRegion" @change="getList">
        <el-checkbox-button v-for="r in type.region" :label="r" :key="r">{{ r }}</el-checkbox-button>
      </el-checkbox-group>

      <span>语言：</span>
      <el-checkbox-group size="mini" class="check"
                         v-model="checkLanguage" @change="getList">
        <el-checkbox-button v-for="l in type.language" :label="l" :key="l">{{ l }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
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
import global from "../../../js/global";

export default {
  name: "MovieIndex",
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      mvList: [],
      type: {
        type: ["全部"],
        language: ["全部"],
        region: ["全部"],
      },
      checkType: ["全部"],
      checkLanguage: ["全部"],
      checkRegion: ["全部"],
    }
  },
  created() {
    this.getList();
    this.getType();
  },
  methods: {
    getList() {
      console.log(this.checkType)
      axios.get(Global.SERVER_ADDRESS + "/movies/list",
        {
          params: {
            typeList: this.checkType,
            languageList: this.checkLanguage,
            regionList: this.checkRegion,
            dataType:"t",
          }
        }).then(rs => {
        this.mvList = rs.data
      })
    },
    getType() {
      axios.get(global.SERVER_ADDRESS + "/movies/type").then(rs => {
        this.type = rs.data;
/*        this.type.type.unshift("全部");
        this.type.language.unshift("全部");
        this.type.region.unshift("全部");*/
      })
    }
  }

}
</script>

<style scoped>
.mvImage {
  width: 15vw;
  height: 30vh;
}

.check {
  width: 70vw;
  padding-left: 2vw;
}

.mv {
  width: 15vw;
  height: 30vh;
  padding: 0.5vw;
  float: left;
  list-style: none;
}
</style>
