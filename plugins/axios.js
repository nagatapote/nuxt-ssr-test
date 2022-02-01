export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    config.headers.common = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${store.getters.token}`,
    }
    return config
  })
  $axios.onError((error) => {
    if (error.response.status) redirect('/error-page')
  })
}
