import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);
import { login, validate } from '../api/index'

export default new Vuex.Store({
  state: {
    username: '',
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    }
  },
  actions: {
    async login({ commit }, username) {
      let r = await login(username)
      if (r.code === 1) {
        return Promise.reject(r)
      }
      localStorage.setItem('token', r.token)
      commit('setUsername', r.username)
    },
    async validate({ commit }) {
      let r = await validate()
      if (r.code === 1) {
        return false
      }
      localStorage.setItem('token', r.token)
      commit('setUsername', r.username)
      return true;
    }
  },
  modules: {
  },
});
