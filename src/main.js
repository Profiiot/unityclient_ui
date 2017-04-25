import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
// import VueQuillEditor from 'vue-quill-editor'

Vue.use(Buefy)
// Vue.use(VueQuillEditor)

new Vue({
  el: '#app',
  render: h => h(App),

})
