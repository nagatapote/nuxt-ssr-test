import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'my-key',
    storage: {
      getItem: (key) =>
        process.client
          ? Cookies.withConverter(Cookies.get(key))
          : cookie.parse(req.headers.cookie || '')[key],
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 1, secure: !isDev }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
