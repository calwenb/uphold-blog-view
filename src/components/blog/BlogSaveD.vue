<template>
  <el-dialog
    title="修改信息"
    :visible.sync="show">

    <el-upload
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="onSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.typeId" placeholder="请选择">
          <el-option
            v-for="t in typeList" :key="t.id" :label="t.value" :value="t.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-autocomplete
          class="inline-input"
          v-model="tag"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @keyup.enter.native="addTag"
          @select="handleSelect">
        </el-autocomplete>
        <el-tag v-for="tag in form.tagList" :key="tag" size="mini">{{ tag }}</el-tag>
      </el-form-item>
      <el-form-item label="公开">
        <el-switch v-model="form.open"></el-switch>
      </el-form-item>
    </el-form>
    <br>
    <span slot="footer">
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="show = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import eventBus from "../../js/eventBus";
import axios from "../../js/axios";
import global from "../../js/global";
import {errorMsg, successMsg} from "../../js/comm/comm";

export default {
  name: "BlogSaveD",
  data() {
    return {
      show: false,
      form: {},
      tag: [],
      uploadUrl: global.SERVER + "/files/upload",
      dialogImageUrl: "",
      dialogVisible: false,
      tagEnum: [],
      typeList: [],
    }
  },
  mounted() {
    this.getTypeList();
    eventBus.$on("BlogSaveD", data => {
      this.form = data;
      this.show = true;
      this.getTagEnum();
    });
  },
  methods: {
    getTypeList() {
      axios.get(global.SERVER + "/types/list").then(rs => {
        this.typeList = rs.data;
      })
    },
    handleSelect(item) {
      console.log(item);
    },
    querySearch(queryStr, cb) {
      var tagEnum = this.tagEnum;
      var results = queryStr ? tagEnum.filter(this.createFilter(queryStr)) : tagEnum;
      cb(results);
    },
    createFilter(queryStr) {
      return (tag) => {
        return (tag.toLowerCase().indexOf(queryStr.toLowerCase()) === 0);
      };
    },
    onSuccess(res, file) {
      this.form.imgUrl = res.data;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = global.SERVER + "/files" + file.url;
      this.dialogVisible = true;
    },
    getTagEnum() {
      axios.get(global.SERVER + "/blogs/tag/enum").then(rs => {
        this.tagEnum = rs.data;
      })
    },
    addTag() {
      if (this.tag != "") {
        var set = new Set(this.form.tagList);
        set.add(this.tag);
        this.form.tagList = set;
        this.tag = '';
      }
    },
    submit() {
      if (this.form.content == "" || this.form.title == "") {
        errorMsg("请正确编辑");
        this.show = false;
        return;
      }
      console.log(this.form)
      axios.post(global.SERVER + "/blogs", this.form).then(rs => {
        successMsg(rs.message)
      })
      this.show = false;
    }
  }

}
</script>

<style scoped>

</style>
