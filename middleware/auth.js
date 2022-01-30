export default function ({ store, redirect, route }) {
  if (!store.getters.login && route.path !== '/user-login') {
    return redirect('/user-login')
  } else if (store.getters.login && route.path === '/user-login') {
    return redirect('/')
  }
}
