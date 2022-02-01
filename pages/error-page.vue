<template>
  <div>
    <p>エラーが発生しました。</p>
    <button @click="logout">ホームへ戻る</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['logout']),
  },
}
</script>
