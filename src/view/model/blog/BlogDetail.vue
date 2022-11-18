<template>
  <div>
    <div>

      <el-popconfirm
        title="确认编辑？" @confirm="update">
        <el-button slot="reference" icon="el-icon-edit" circle></el-button>
      </el-popconfirm>
      <el-popconfirm
        title="确认删除？" @confirm="del">
        <el-button slot="reference" icon="el-icon-delete" circle></el-button>
      </el-popconfirm>

    </div>

    <mavon-editor
      :value="data.content"
      :subfield="prop.subfield"
      :defaultOpen="prop.defaultOpen"
      :toolbarsFlag="prop.toolbarsFlag"
      :editable="prop.editable"
      :scrollStyle="prop.scrollStyle"
      :navigation="prop.navigation"/>
  </div>
</template>

<script>
import axios from "../../../js/axios";
import global from "../../../js/global";
import eventBus from "../../../js/eventBus";
import {successMsg} from "../../../js/comm/comm";

export default {
  data() {
    return {
      data: {
        id: '',
        content: '',
        edit: false,
      },
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
  created() {
    let id = this.$route.params.id;
    if (id !== undefined) {
      this.data.id = id;
      this.getData();
    }
  },
  methods: {
    del() {
      axios.delete(global.SERVER + "/blogs/" + this.data.id).then(rs => {
        successMsg(rs.message);
      })
    },
    update() {
      this.$router.push('/blog/md/' + this.data.id);
    },
    getData() {
      axios.get(global.SERVER + "/blogs/" + this.data.id).then(rs => {
        this.data = rs.data
      })
    }
  }

}
</script>

<style scoped>

</style>
