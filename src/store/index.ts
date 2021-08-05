import { createStore } from 'vuex'

import login from './login/login'

import { IRootState } from './type'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: ' ',
      age: 0
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
