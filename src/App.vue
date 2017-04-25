<template>
  <div id="app">
    <div class="box">
    <a class="button">
      Button
    </a>
    </div>
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-quill-editor'
export default {
  
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      content: '<h1>Some initial content</h1>'  
    }
  },
     components: {
      VueEditor
   },

}
</script>

<style lang="scss">
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
