<template>
  <div class="main">
    <el-card class="card">
      <div class="button">
        <router-link to="/register">
          <el-button circle title="去注册">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-denglu-yonghu"></use>
            </svg>
          </el-button>
        </router-link>
        <el-divider direction="vertical"></el-divider>
        <router-link to="/getshare">
          <el-button circle title="获取分享照片">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang7"></use>
            </svg>
          </el-button>
        </router-link>
      </div>
      <br><br>
      <h3 @click="repwd">登录</h3>
      <el-form :model="form"
               @submit.native.prevent
               status-icon :rules="rules" ref="form" label-width="100px">
        <el-form-item label="账号" prop="name">
          <el-input v-model.number="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-row type="flex" justify="end">

          <span @click="repwd" class="pointer" style="font-size: 13px;color: #868585;">忘记密码？</span>
        </el-row>
        <el-switch class="remember_me"
                   v-model="remember"
                   active-text="自动登录">
        </el-switch>
        <br><br>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" native-type="submit">登录</el-button>
          <el-tooltip content="使用手机短信一键登录" placement="top">
            <el-button @click="loginPhone">手机登录</el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>

<script>
import Global from '../../js/global'
import comm from "../../js/comm/comm";


export default {
  name: "Login",
  data() {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号'));
      }

    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      remember: false,
      form: {
        account: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        age: [
          {validator: checkAge, trigger: 'blur'}
        ]
      }
    };
  },

  created() {
    this.getBulletin();
  },

  methods: {
    getBulletin() {
      let content = "项目发现缺陷，正在紧张维护中，预计9月2日 21:00恢复正常";
      comm.warnMsg(content);

    },
    repwd() {
      let path = "/re_pwd";
      if (this.form.account !== "") {
        path = "/re_pwd/" + this.form.account;
      }
      this.$router.push({path: path})
    },
    loginPhone() {
      this.$router.push({path: "/login/phone"})
    },
    /*接入登录接口*/
    submitForm(formName) {
      let that = this;
      this.axios({
        url: Global.SERVER_ADDRESS + '/auths/login',
        data: {
          account: this.form.account,
          password: this.form.pass,
          remember: that.remember,
        },
        method: 'POST',
        withCredentials: true,
      }).then(function (rs) {
        if (that.remember === true) {
          that.$cookies.set("TOKEN", rs.data, Global.COOKIES_TIME);
        } else {
          that.$cookies.set("TOKEN", rs.data, "Session");
        }
        that.$router.push({path: '/movie'});
      })
    },
  },

}
</script>

<style scoped>

.foot_text {
  line-height: 20px;
  color: #a9a8a8;
  position: absolute;
  bottom: 2%;
  font-size: 12px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", serif;
}

.main {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('../../img/login_bg.png');
  display: flex;
  justify-content: center;
  align-items: center;

}


.card {
  background-color: #FCFDFD;
  text-align: center;
  position: absolute;
  top: 10%;
  width: 25%;
  height: auto;
  padding: 3% 5% 3% 2%;
}

.button {
  margin-top: -15%;
  margin-right: -15%;
  text-align: right;
}

.remember_me {
  margin-top: 31%;
}

@media only screen and (max-width: 900px) {
  .card {
    width: 80%;
    height: auto;
  }

  .remember_me {
    margin-top: 20%;
  }

  .button {
    margin-top: -10%;
    margin-right: -10%;
    text-align: right;
  }

  .card {
    width: 80%;
    height: auto;
  }

  .remember_me {
    margin-top: 20%;
  }

  .button {
    margin-top: -10%;
    margin-right: -10%;
    text-align: right;
  }

}

.pointer:hover {
  cursor: pointer;
  color: #409EFF;
}

</style>
