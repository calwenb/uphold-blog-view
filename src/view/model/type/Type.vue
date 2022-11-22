<template>
  <div>

    <el-button @click="saveShow=true" icon="el-icon-edit" circle></el-button>

    <el-collapse @change="getBlog" accordion>
      <el-collapse-item v-for="(t,i) in list" :title="t.value" :name="t.id">
        <blog-list/>
      </el-collapse-item>
    </el-collapse>

    <el-dialog
      title="保存"
      :visible.sync="saveShow"
      append-to-body>


      <span>值：</span>
      <el-input v-model="form.value"></el-input>
      <span>公开</span>
      <el-switch v-model="form.open"></el-switch>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="saveShow = false">取 消</el-button>
      </span>


    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import global from "../../../js/global";
import eventBus from "../../../js/eventBus";
import BlogList from "../../../components/blog/BlogList";
import {successMsg} from "../../../js/comm/comm";

export default {
  components: {BlogList},
  data() {
    return {
      list: [],
      saveShow: false,
      form: {open:true},
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    save() {
      axios.post(global.SERVER + "/types", this.form).then(rs => {
        successMsg(rs.message);
        this.getData()
      })
      this.saveShow = false;
    },
    getBlog(id) {
      eventBus.$emit("blogQuery", {typeId: id})
    },
    getData() {
      axios.get(global.SERVER + "/types/list").then(rs => {
        this.list = rs.data;
      })
    }
  }
}
</script>

<style scoped>

</style>
