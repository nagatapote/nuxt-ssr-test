<template>
  <div>
    <p>認証の有効期限が切れました。再度、ログインしてください。</p>
    <button @click="logout">ホームへ戻る</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ErrorPage',
  methods: {
    ...mapActions(['logout']),
  },
}
</script>
