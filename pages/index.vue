<template>
  <div>
    <NuxtLogo />
    <ul>
      <li v-for="(post, i) in posts" :key="i">
        <span>{{ post.FilesName }}</span
        ><button @click="fileDownload(post.UploadName, post.FilesName)">
          ダウンロード
        </button>
      </li>
    </ul>
    <input v-if="!selectFileData" type="file" @change="selectFile" />
    <span v-if="selectFileData"
      >ファイル名: <span class="file-name">{{ selectFileName }}</span></span
    >
    <p>{{ message }}</p>
    <p v-if="selectFileData">
      <button @click="uploadFile">アップロード</button>
      <button @click="fileCancel">キャンセル</button>
    </p>
    <p>
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
      const res = await $axios.$get('/api/files/')
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
      message: null,
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
      if (this.selectFileName.match(/\./g).length > 1) {
        return window.alert(
          'ファイル名に拡張子以外の.（ドット）を含まないでください。'
        )
      }
      this.message = 'ファイルをアップロード中'
      const formData = new FormData()
      formData.append('file', this.selectFileData)
      try {
        await this.$axios.post('/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        window.alert('アップロードが完了しました。')
        this.selectFileData = null
        this.selectFileName = null
        this.message = ''
      } catch (e) {
        if (process.browser) {
          window.alert('アップロードに失敗しました。')
          this.selectFileData = null
          this.selectFileName = null
          this.message = ''
          window.console.error(e)
        }
      }
    },
    fileCancel() {
      this.selectFileData = null
      this.selectFileName = null
    },
    async fileDownload(uploadName, fileName) {
      const res = await this.$axios.post(
        '/api/files/download',
        {
          filename: uploadName,
        },
        {
          responseType: 'blob',
          dataType: 'binary',
        }
      )
      const blob = new Blob([res.data], { type: 'multipart/form-data' })
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = fileName
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
