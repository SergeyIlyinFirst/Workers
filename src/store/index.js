import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    workers: []
  },
  mutations: {
    setWorkers (state, employees) {
      state.workers = employees
    },
    addWorker (state, worker) {
      state.workers.push(worker)
    }
  },
  actions: {
    getWorkers ({ commit }) {
      return Vue.http.get('https://workers-1f48e.firebaseapp.com/static/employees.json')
        .then(response => response.json())
        .then(employees => commit('setWorkers', employees))
    }
  }
})
// http://localhost:8080/static/employees.json
