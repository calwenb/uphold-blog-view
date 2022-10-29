<template>
  <div class="main">
    <el-card class="card">
      <div class="button">
        <router-link to="/login">
          <el-button circle title="去登录">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghudenglu"></use>
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

      <h3>注册</h3>

      <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>

        <span style="color:red;font-size: 15px">&nbsp;{{ msg }}</span>
      </el-form>
    </el-card>


  </div>
</template>

<script>
import Global from '../../js/global'

export default {
  name: "Register",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号'));
      }

    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: '',
        name: '',
        pass: '',
        checkPass: '',
        email: '',
      },
      msg: '',
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    };
  },

  methods: {
    register() {
      var that = this;
      this.axios({
        url: Global.SERVER_ADDRESS + '/auths/register',
        data: {
          name: this.form.name,
          email: this.form.email,
          account: this.form.account,
          password: this.form.pass
        },
        method: 'POST',
      }).then(function (rs) {
        that.$cookies.set("TOKEN", rs.data, Global.COOKIES_TIME);
        that.$router.push({path: '/index'})
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
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
  width: 20%;
  height: auto;
  padding: 3% 5% 2.4% 2%;
}

.button {
  margin-top: -15%;
  margin-right: -15%;
  text-align: right;
}


@media only screen and (max-width: 900px) {
  .card {
    width: 80%;
    height: auto;
    padding: 3% 5% 0% 2%;
  }

  .button {
    margin-top: -10%;
    margin-right: -10%;
    text-align: right;
  }

  .foot_text {
    bottom: 0%;
  }
}
</style>
