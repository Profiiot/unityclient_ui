import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state: {
    count: 0,
    changes: [],
    content: ""
  },
  mutations: {
    increment (state) {
      state.count++
    },

    changeContent (state, text) {
      state.content = text;
    }
  },
  getters:{
    getContent(state){
      return state.content;
    }
  }
})

export default store