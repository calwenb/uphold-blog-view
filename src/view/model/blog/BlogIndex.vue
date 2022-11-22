<template>
  <div class="main">
    <blog-list/>
  </div>
</template>

<script>

import BlogList from "../../../components/blog/BlogList";
import eventBus from "../../../js/eventBus";

export default {
  components: {BlogList},
  data() {
    return {}
  },
  mounted(){
    eventBus.$emit("blogQuery")
  },
  methods: {},
}
</script>

<style scoped>


</style>
