export default function ({ store, redirect, route }) {
  if (!store.getters.login && route.path !== '/login') {
    return redirect('/login')
  } else if (store.getters.login && route.path === '/login') {
    return redirect('/')
  }
}
