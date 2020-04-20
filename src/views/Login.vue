<template>
  <div class='form'>
    <div class="form-title">
      登录
      <button class='btn-text' style='float: right;' @click='$router.push({ name: "SignUp" })'>注册</button>
    </div>
    <div class='form-item'>
      <input class='form-control' type="text" v-model='form.username' placeholder="username" @keyup.enter='login'>
    </div>
    <div class='form-item'>
      <input class='form-control' type="password" v-model='form.password' placeholder="password" @keyup.enter='login'>
    </div>

    <div class='form-item text-center'>
      <button class='btn-login' @click='login'>登录</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { login } from '@/api/session'
import { queryUserInfo } from '@/api/user'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapMutations(['setUser']),
    // 查询用户信息（用户信息、用户联系人、用户群组、用户聊天列表）
    queryUserInfo () {
      queryUserInfo().then(data => {
        if (data.success) {
          this.setUser(data.data)
          this.$router.push({ name: 'Home' })
        }
      })
    },

    login () {
      const username = this.form.username.trim()
      const password = this.form.password.trim()

      if (!username) {
        alert('请输入用户名！')
        return
      }
      if (!password) {
        alert('请输入密码！')
        return
      }

      login(username, password).then(data => {
        if (data.success) {
          this.queryUserInfo()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-login {
  width: 80%;
  margin-top: 60px;
  margin-bottom: 20px;
  background: linear-gradient(180deg,rgba(17,106,175,1) 0%,rgba(0,74,132,1) 100%);
  color: #fff;
  &:active {
    background: linear-gradient(0,rgba(17,106,175,1) 0%,rgba(0,74,132,1) 100%);
  }
}
</style>
