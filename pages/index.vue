<template>
  <div>
    <NuxtLogo />
    <ul>
      <li v-for="(post, i) in posts" v-show="i < 3" :key="i">
        <span>{{ post.url }}</span>
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
    const url = 'https://qiita.com/api/v2/items'
    const response = await $axios.$get(url)
    return {
      posts: response,
    }
  },
  methods: {
    ...mapActions(['logout']),
  },
}
</script>
