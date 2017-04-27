<template lang="pug">
  #app
    #appContent.columns
      #editorColumn.column.is-one-third
        h1#documentTitle.title.edited Title
        editor
      .column.is-two-quarter  {{content}}
      #debug.column.is-one-quarter
        div
          pre.
            \n        {{changes}}

          |  Container:
          pre.
            \n{{container}}

          |  User:
          pre.
            \n{{user}}

          |  User:
          pre.
            \n
</template>

<script>
//import 'buefy/lib/buefy.css'

import { mapGetters } from 'vuex'
import editorComponent from './components/editor.vue'
import $ from 'jquery'

export default {
  
  name: 'app',
  data () {
    return {
      content: '<p>I am an Example</p>',
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        },
        theme: 'bubble'
      },
    }
  },
  components: {
    'editor': editorComponent
  },
  computed:{
    changes(){return this.$store.state.changes},
    container(){return $("container", $(this.content))},
    user(){return $("user", $(this.content))}

  },
  methods:{

  }

}
</script>

<style lang="scss">
@import 'assets/custom_buefy';
@import "assets/constants";
#editorColumn{
  background-color: $editorBackground;
  color:#fff;
}

.html {
  height: 9em;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  resize: vertical;
}
#appContent{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

#documentTitle{
  &.edited{
    &:after {
      content: ' \2013 Edited';
      opacity: .5;
    }
    &:before {
      font-family: "Material Icons";
      content: '\E313';
      opacity: .5;
    }
  }
}
</style>
