<template>
  <mavon-editor
    :value="data.content"
    :subfield="prop.subfield"
    :defaultOpen="prop.defaultOpen"
    :toolbarsFlag="prop.toolbarsFlag"
    :editable="prop.editable"
    :scrollStyle="prop.scrollStyle"
    :navigation="prop.navigation"/>
</template>

<script>
import axios from "../../../js/axios";
import global from "../../../js/global";

export default {
  data() {
    return {
      data: {
        id: '',
        content: ''
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
