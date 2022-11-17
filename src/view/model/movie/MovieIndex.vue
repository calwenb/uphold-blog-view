<template>
  <div class="main">
    <el-divider content-position="left">
      <h3>电影</h3>
    </el-divider>
    <div>
      <el-row>类型：</el-row>
      <el-checkbox-group size="mini" class="check"
                         v-model="check.checkType" @change="getList">
        <el-checkbox-button v-for="t in type.type" :label="t" :key="t">{{ t }}</el-checkbox-button>
      </el-checkbox-group>

      <el-row>地区：</el-row>
      <el-checkbox-group size="mini" class="check"
                         v-model="check.checkRegion" @change="getList">
        <el-checkbox-button v-for="r in type.region" :label="r" :key="r">{{ r }}</el-checkbox-button>
      </el-checkbox-group>

      <el-row>语言：</el-row>
      <el-checkbox-group size="mini" class="check"
                         v-model="check.checkLanguage" @change="getList">
        <el-checkbox-button v-for="l in type.language" :label="l" :key="l">{{ l }}</el-checkbox-button>
      </el-checkbox-group>

<!--      <el-row>年代：</el-row>
      <el-radio-group class="check" size="mini"
                      v-model="check.checkYear" @change="getList">
        <el-radio-button :label="y" v-for="y in yearsList"></el-radio-button>
      </el-radio-group>-->
    </div>
    <div>
      <ul>
        <li class="mv" v-for="mv in page.content">
          <el-link :underline="false" :href="'/mv-detail/'+mv.id">
            <el-image class="mvImage" :src="mv.data"></el-image>
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
      <div style="float:left;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="page.size"
          :total="page.total"
          background
          layout=" prev, pager, next, sizes,jumper,total">
        </el-pagination>
      </div>
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
      page: {
        content: [],
        page: 1,
        size: 20,
        total: 0,
      },
      type: {
        type: [],
        language: [],
        region: [],
      },
      yearsList: ["全部"],
      check: {
        checkType: [],
        checkLanguage: [],
        checkRegion: [],
        checkYear: "全部",
      },
    }
  },
  created() {
    this.getList();
    this.getType();
    this.creatYearsList();
  },
  methods: {
    creatYearsList() {
      let date = new Date();
      let year = date.getFullYear();
      for (let i = 0; i < 20; i++) {
        this.yearsList.push(year--);
      }
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page.page = val;
      this.getList();
    },
    getList() {
      axios.get(Global.SERVER + "/movies/page",
        {
          params: {
            typeList: this.check.checkType,
            languageList: this.check.checkLanguage,
            regionList: this.check.checkRegion,
            releaseYear: this.check.checkYear,
            dataType: "t",
            pageNum: this.page.page,
            pageSize: this.page.size,
          }
        }).then(rs => {
        this.page = rs.data
      })
    },
    getType() {
      axios.get(global.SERVER + "/movies/type").then(rs => {
        this.type = rs.data;
      })
    }
  }
}
</script>

<style scoped>
.mv {
  width: 13vw;
  height: 35vh;
  padding: 0.5vw;
  float: left;
  list-style: none;
}

.mvImage {
  width: 13vw;
  height: 30vh;
}

.check {
  width: 70vw;
  padding-left: 2vw;
}
</style>
