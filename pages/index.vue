<template>
  <div>
    <NuxtLogo />
    <ul>
      <li v-for="(post, i) in posts" :key="i">
        <span>{{ post }}</span>
      </li>
    </ul>
    <input v-if="!selectFileData" type="file" @change="selectFile" />
    <span v-if="selectFileData"
      >ファイル名: <span class="file-name">{{ selectFileName }}</span></span
    >
    <p v-if="selectFileData">
      <button @click="uploadFile">アップロード</button>
      <button @click="fileCancel">キャンセル</button>
    </p>
    <p>
      <button @click="fileDownload">ファイルダウンロード</button>
      <button @click="logout">ログアウト</button>
    </p>
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
  data() {
    return {
      selectFileData: null,
      selectFileName: null,
    }
  },
  methods: {
    ...mapActions(['logout']),
    selectFile(e) {
      if (this.selectFileData) {
        this.selectFileData = null
        this.selectFileName = null
        return
      }
      const file = e.target.files[0]
      this.selectFileData = file
      this.selectFileName = file.name
    },
    async uploadFile() {
      if (!this.selectFileData) {
        return window.alert('ファイルが選択されていません。')
      }
      const formData = new FormData()
      formData.append('file', this.selectFileData)
      try {
        await this.$axios.post('/api/user/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.selectFileData = null
        window.alert('アップロードが完了しました。')
      } catch (e) {
        if (process.browser) {
          window.console.alert('アップロードに失敗しました。')
          window.console.error(e)
        }
      }
    },
    fileCancel() {
      this.selectFileData = null
      this.selectFileName = null
    },
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
<style scoped>
.file-name {
  color: red;
}
</style>
