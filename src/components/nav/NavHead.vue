<template>
  <el-row type="flex" justify="center">


    <el-menu default-active="1" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">
        <el-image class="pointer logo" :src="logoSrc" @click="$router.push('/movie')"/>
      </el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">标签</el-menu-item>
      <el-menu-item index="3">分类</el-menu-item>
      <el-menu-item index="4">碎语</el-menu-item>
      <el-menu-item index="5">发布</el-menu-item>
      <el-menu-item index="6">
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="45">
                 <el-image :src="avatarUrl"/>
              </el-avatar>
              <span class="mobileHide">
                <span>{{ user.name }}</span>
              </span>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma"></use>
              </svg>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item command="updateUser">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bianji4"></use>
              </svg>
              修改信息
            </el-dropdown-item>
            <el-dropdown-item command="updatepwd">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma"></use>
              </svg>
              修改密码
            </el-dropdown-item>
            <el-dropdown-item command="outLogin">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuichudenglu"></use>
              </svg>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>

    <!--    <Search/>-->

    <!--用户信息-->
    <!--    <el-col :xs="4" :md="4">
          <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <el-avatar :size="45">
                     <el-image :src="avatarUrl"/>
                  </el-avatar>
                  <span class="mobileHide">
                    <span>{{ user.name }}</span>
                  </span>
                </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yanzhengma"></use>
                </svg>
                个人信息
              </el-dropdown-item>
              <el-dropdown-item command="updateUser">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bianji4"></use>
                </svg>
                修改信息
              </el-dropdown-item>
              <el-dropdown-item command="updatepwd">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yanzhengma"></use>
                </svg>
                修改密码
              </el-dropdown-item>
              <el-dropdown-item command="outLogin">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tuichudenglu"></use>
                </svg>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>-->
    <user-info/>
    <user-update/>
  </el-row>
</template>

<script>
import logoL from "../../img/logo_l.png";
import UserUpdate from "../user/UserUpdate";
import UserInfo from "../user/UserInfo";
import vm from "../../main";
import router from "../../router";
import Search from "./Search";
import eventBus from "../../js/eventBus";

export default {
  name: "NavHead",
  props: ['user'],
  components: {UserUpdate, UserInfo, Search},
  data() {
    return {
      avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      logoSrc: logoL,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key)
      switch (key) {
        case "1":
          router.push('/blog');
          break;
        case "2":
          router.push('/tag');
          break;
        case "3":
          router.push('/tag');
          break;
        case "4":
          console.log(1);
          break;
        case "5":
          router.push('/blog/md');
          break;
        default:
          console.log("错误选择")
      }
    },
    handleCommand(command) {
      if (command === 'userInfo') {
        eventBus.$emit("userInfo", this.user);
      } else if (command === "updateUser") {
        eventBus.$emit("userUpdate", this.user);
      } else if (command === "updatepwd") {
        eventBus.$emit("userPwdUpdate", this.user);
      } else if (command === "outLogin") {
        this.$cookies.remove("TOKEN");
        this.$router.push('/login');
      }
    },


  }
}

</script>

<style scoped>
.pointer:hover {
  cursor: pointer;
  color: #409EFF;
}

.logo {
  width: 50px;
  height: 50px;
}
</style>
