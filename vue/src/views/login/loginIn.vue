<template>
  <el-card class="login-form-layout">
    <el-form
      autocomplete="on"
      :model="loginForm"
      ref="loginForm"
      label-position="left"
    >
      <h2 class="login-title color-main">登陆入口</h2>
      <el-form-item prop="username">
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="on"
          clearable
          placeholder="请输入用户名"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          name="password"
          placeholder="请输入密码"
          :type="pwdType"
          v-model="loginForm.password"
          show-password
          @keyup.enter.native="handleLogin"
          autocomplete="on"
        >
        </el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 20px">
        <el-button
          style="width: 25%"
          type="primary"
          :loading="loading"
          @click.native.prevent="handleLogin"
          >登录 </el-button
        >ƒ
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "loginIn",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loading: false,
      pwdType: "password",
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("loginIn", this.loginForm)
            .then((response) => {
              this.loading = false;
              let code = response.data.code;
              if (code == 200) {
                this.$router.push({
                  path: "/success",
                  query: { data: response.data.data },
                });
              } else {
                this.$router.push({
                  path: "/error",
                  query: { message: response.data.message },
                });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          // eslint-disable-next-line no-console
          console.log("参数验证不合法！");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #bd3885;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>