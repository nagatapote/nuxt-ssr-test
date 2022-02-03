<template>
  <div>
    <NuxtLogo />
    <ul>
      <li v-for="(post, i) in posts" :key="i">
        <span>{{ post }}</span>
      </li>
    </ul>
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
  },
}
</script>
