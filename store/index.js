export const state = () => ({
  login: null,
  token: null,
})

export const getters = {
  login: (state) => state.login,
  token: (state) => state.token,
}

export const mutations = {
  setToken(state, { token }) {
    state.login = true
    state.token = token
  },
}

export const actions = {
  async login({ commit }, params) {
    const res = await this.$axios.post('/api/user/login', params)
    const { token } = res.data
    commit('setToken', { token })
  },
}
