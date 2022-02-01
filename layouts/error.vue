<template>
  <div>
    <p>ステータスコード：{{ error.statusCode }}</p>
    <p>メッセージ：{{ error.message }}</p>
    <NuxtLink to="/">ホームへ戻る</NuxtLink>
  </div>
</template>
<script>
export default {
  name: 'LayoutsErrorPage',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
