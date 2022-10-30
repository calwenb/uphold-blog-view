<template>
  <!-- 整个布局 -->
  <el-container>
    <el-header
      style="z-index: 1; padding-left:1%;padding-bottom: 4%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);">
      <!--头导航栏-->
      <navHead :user="user"/>
    </el-header>
    <el-main>
      <el-card>
        <transition name="slide-left" mode="out-in">
          <router-view class="main"/>
        </transition>
      </el-card>

    </el-main>
  </el-container>

</template>

<script>
import NavHead from "../components/nav/NavHead";
import NavLeft from "../components/nav/NavLeft";
import Global from "../js/global";
import comm from "../js/comm/comm";

export default {
  name: "Index",
  components: {
    'navHead': NavHead,
    'navLeft': NavLeft,
  },
  data() {
    return {
      token: '',
      hoursTip: "",
      user: {
        userId: '',
        account: '',
        name: '',
        userType: '9',
        email: '',
        phoneNumber: '',
      },
    }
  },
  methods: {
    getTime() {
      let date = new Date();
      if (date.getHours() >= 0 && date.getHours() < 12) {
        this.hoursTip = " 上午好"
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        this.hoursTip = " 下午好"
      } else {
        this.hoursTip = " 晚上好"
      }
    },
    getUser(token, vm) {
      if (token == null) {
        vm.$router.push('/login');
        return
      }
      const that = vm;
      this.axios({
        url: Global.SERVER_ADDRESS + '/auths/user/info',
        method: 'GET',
      }).then(function (rs) {
        that.user = rs.data;
        comm.successMsg("尊敬的 用户: " + that.user.name + that.hoursTip);
      })
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      const token = vm.$cookies.get("TOKEN");
      vm.getTime();
      vm.getUser(token, vm);
    });
  },
}
</script>

<style scoped>
.el-header {
  background-color: #ffffff;
  text-align: center;
  line-height: 5vh;
}

.main {
  margin: auto;
  background-color: #ffffff;
  width: 80vw;
  font-size: 1vw;
}

</style>
