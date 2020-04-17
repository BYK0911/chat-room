<template>
  <div class='form'>
    <div class="form-title">
      注册
      <button class='btn-text' style='float: right;' @click='$router.push({ name: "Login" })'>登录</button>
    </div>
    <div class='form-item'>
      <input class='form-control' type="text" v-model='form.username' placeholder="username" @keyup.enter='sign'>
    </div>
    <div class='form-item'>
      <input class='form-control' type="password" v-model='form.password' placeholder="password" @keyup.enter='sign'>
    </div>
    <div class='form-item'>
      <input class='form-control' type="password" v-model='form.checkPassword' placeholder="check password" @keyup.enter='sign'>
    </div>

    <div class='form-item text-center'>
      <button class='btn-sign' @click='sign'>注册</button>
    </div>
  </div>
</template>

<script>
import { signUp } from '@/api/user'

export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        checkPassword: ''
      }
    }
  },

  methods: {
    sign () {
      if (!this.form.username.trim()) {
        alert('请输入用户名！')
        return
      }
      if (!this.form.password.trim()) {
        alert('请输入密码！')
        return
      }
      if (!this.form.checkPassword.trim()) {
        alert('请输入确认密码！')
        return
      }
      if (this.form.checkPassword.trim() !== this.form.password.trim()) {
        alert('两次密码输入不相同！')
        return
      }

      signUp(this.form.username.trim(), this.form.password.trim()).then(data => {
        if (data.success) {
          this.$socket.emit('sign')
          this.$router.push({ name: 'Login' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-sign {
  width: 80%;
  margin: 20px 0;
  background: linear-gradient(180deg,rgba(17,106,175,1) 0%,rgba(0,74,132,1) 100%);
  color: #fff;
  &:active {
    background: linear-gradient(0,rgba(17,106,175,1) 0%,rgba(0,74,132,1) 100%);
  }
}
</style>
