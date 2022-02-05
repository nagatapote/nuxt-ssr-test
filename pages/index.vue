<template>
  <div>
    <NuxtLogo />
    <ul>
      <li v-for="(post, i) in posts" :key="i">
        <span>{{ post }}</span>
      </li>
    </ul>
    <button @click="fileDownload">ファイルダウンロード</button>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NuxtLogo from '~/components/NuxtLogo.vue'

export default {
  name: 'IndexPage',
  components: { NuxtLogo },
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get('/api/user/all')
      return {
        posts: res,
      }
    } catch (e) {
      if (process.browser) {
        window.console.error(e)
      }
    }
  },

  methods: {
    ...mapActions(['logout']),
    async fileDownload() {
      const res = await this.$axios.post(
        '/api/user/download',
        {
          filename: 'uploaded_1643203459290932000.jpg',
        },
        {
          responseType: 'blob',
          dataType: 'binary',
        }
      )
      const blob = new Blob([res.data], { type: 'image/jpeg' })
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'uploaded_1643203459290932000.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
  },
}
</script>
