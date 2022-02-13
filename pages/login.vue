<template>
  <div>
    <p v-show="message">{{ message }}</p>
    <div v-show="!login">
      <input v-model="email" type="email" placeholder="メールアドレス" />
      <input v-model="password" type="password" placeholder="パスワード" />
      <button @click="handleClickLogin">ログイン</button>
    </div>
    <div v-show="login">
      <input v-model="totp" type="totp" placeholder="totp" />
      <button @click="handleClickTotp">ログイン</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      message: '',
      login: false,
      totp: '',
    }
  },
  methods: {
    async handleClickLogin() {
      const params = { email: this.email, password: this.password }
      try {
        await this.$axios.post('/api/users/login', params)
        this.message = ''
        this.login = true
      } catch (e) {
        window.console.error(e)
        this.message = 'EmailまたはPasswordが違います。'
      }
    },
    async handleClickTotp() {
      const params = { email: this.email, totp: this.totp }
      try {
        await this.totpLogin(params)
        this.message = ''
        this.$router.push('/')
      } catch (e) {
        window.console.error(e)
        this.message = 'ワンタイムパスワードが違います。'
      }
    },
    ...mapActions(['totpLogin']),
  },
}
</script>
