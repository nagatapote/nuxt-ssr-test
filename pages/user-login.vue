<template>
  <div>
    <input v-model="email" type="email" placeholder="メールアドレス" />
    <input v-model="password" type="password" placeholder="パスワード" />
    <button @click="handleClickLogin">ログイン</button>
    <p v-show="message">{{ message }}</p>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
    }
  },
  methods: {
    async handleClickLogin() {
      const params = { email: this.email, password: this.password }
      try {
        await this.login(params)
        this.message = ''
        this.$router.push('/')
      } catch (e) {
        window.console.error(e)
        this.message = 'EmailまたはPasswordが違います。'
      }
    },
    ...mapActions(['login']),
  },
}
</script>
