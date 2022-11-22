<template>
  <!-- 修改 -->
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#F9F9F9"
      text-color="#000000"
      active-text-color="#3C8CFF"
    >
      <div>
        <el-image
          class="pointer"
          :src="logoSrc"
          @click="$router.push('/movie')"
        ></el-image>
      </div>

      <el-menu-item index="1">
        <template v-slot:title>
          <span>
            <router-link to="/test">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quanbu2"></use>
              </svg>
              <span class="mobileHide">全部</span>
            </router-link>
          </span>
        </template>
      </el-menu-item>

      <el-menu-item index="2">
        <template v-slot:title>
          <span>
            <router-link to="/client">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quanbu2"></use>
              </svg>
              <span class="mobileHide">客户</span>
            </router-link>
          </span>
        </template>
      </el-menu-item>
      <el-menu-item index="3">
        <template v-slot:title>
          <span>
            <router-link to="/serving">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quanbu2"></use>
              </svg>
              <span class="mobileHide">服务</span>
            </router-link>
          </span>
        </template>
      </el-menu-item>
      <el-menu-item index="4">
        <template v-slot:title>
          <span>
            <router-link to="/system">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quanbu2"></use>
              </svg>
              <span class="mobileHide">系统</span>
            </router-link>
          </span>
        </template>
      </el-menu-item>
      <el-menu-item index="5">
        <template v-slot:title>
          <span>
            <router-link to="/stats">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quanbu2"></use>
              </svg>
              <span class="mobileHide">统计</span>
            </router-link>
          </span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import logoL from '../../img/logo_l.png'

export default {
  name: 'NavLeft',
  data() {
    return {
      logoSrc: logoL,
    }
  },
  mounted() {},

  methods: {},
}
</script>

<style scoped>
/deep/ .el-progress-circle {
  height: 50px;
  width: 50px;
}
.router-link-active {
  text-decoration: none;
  color: #3c8cff;
}
a {
  text-decoration: none;
  color: #000000;
}
.pointer:hover {
  cursor: pointer;
  color: #409eff;
}
.icon {
  width: 1.8em;
  height: 1.8em;
  vertical-align: -0.5em;
}
</style>
