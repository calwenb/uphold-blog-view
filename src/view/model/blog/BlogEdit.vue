<template>
  <div>
    <div id="main">
      <el-upload
        :action="uploadUrl"
        :on-success="onSuccess"
        drag
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>

      <mavon-editor ref="md" v-model="form.content" @imgAdd="imgAdd"/>
    </div>
    <el-button type="primary" @click="submit">提交</el-button>
    <blog-save-d/>
  </div>
</template>

<script>
import eventBus from "../../../js/eventBus";
import BlogSaveD from "../../../components/blog/BlogSaveD";
import axios from "axios";
import Global from "../../../js/global";
import global from "../../../js/global";

export default {
  components: {BlogSaveD},
  data() {
    return {
      form: {
        content: '',
        title: '',
        tagList: [],
        open: true
      },
      uploadUrl: global.SERVER + "/files/pars-content",
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id !== undefined) {
      this.form.id = id;
      this.getData();
    }
  },
  computed: {
    prop() {
      return {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true,
        navigation: true,
      }
    }
  },
  methods: {
    onSuccess(res, file) {
      this.form.content = res.data;
    },
    getData() {
      axios.get(global.SERVER + "/blogs/" + this.form.id).then(rs => {
        this.form = rs.data;
      })
    },
    submit() {
      eventBus.$emit("BlogSaveD", this.form);
    },
    imgAdd(pos, file) {
      let formData = new FormData();
      formData.append('file', file)
      axios.post(Global.SERVER + "/files/upload", formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((rs) => {
        this.$refs.md.$img2Url(pos, Global.SERVER + '/files/' + rs.data);
      })
    }
  }
}
</script>

<style scoped>

</style>
