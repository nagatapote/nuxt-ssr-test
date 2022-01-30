<template>
  <div>
    <NuxtLogo />
    <ul>
      <li v-for="(post, i) in posts" v-show="i < 3" :key="i">
        <span>{{ post.url }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import NuxtLogo from '~/components/NuxtLogo.vue'
export default {
  name: 'IndexPage',
  components: { NuxtLogo },
  middleware: 'auth',
  async asyncData({ $axios }) {
    const url = 'https://qiita.com/api/v2/items'
    const response = await $axios.$get(url)
    return {
      posts: response,
    }
  },
}
</script>
