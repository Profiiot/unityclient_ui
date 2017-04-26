import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import store from './store'
// import VueQuillEditor from 'vue-quill-editor'

Vue.use(Buefy)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
