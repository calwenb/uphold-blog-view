<template>
  <div>
    <div id="main">
      <mavon-editor v-model="form.content" @imgAdd="imgAdd"/>
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

export default {
  components: {BlogSaveD},
  data() {
    return {
      form: {
        content: '',
        title: '',
        tagList: [],
        open: true
      }
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
    submit() {
      eventBus.$emit("BlogSaveD", this.form);
    },
    imgAdd(pos, file) {
      let formData = new FormData();
      formData.append('file', file)
      axios.post(Global.SERVER + "/files/upload-img", formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((rs) => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1.  通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         * 3. 由于vue运行访问的路径只能在static下，so，我就把图片保存到它这里了
         */
        this.$refs.md.$img2Url(pos, 'http://localhost:8002/static/image/' + rs.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
