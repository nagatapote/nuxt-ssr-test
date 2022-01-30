export const state = () => ({
  login: null,
  token: null,
})

export const getters = {
  login: (state) => state.login,
  token: (state) => state.token,
}

export const mutations = {
  setToken(state, { token, login }) {
    state.login = login
    state.token = token
  },
}

export const actions = {
  async login({ commit }, params) {
    const res = await this.$axios.post('/api/user/login', params)
    const { token } = res.data
    const login = true
    commit('setToken', { token, login })
  },
  logout({ commit }) {
    commit('setToken', { token: null, login: null })
  },
}
