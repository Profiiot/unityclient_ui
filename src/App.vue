<template lang="pug">
  #app
    .container
      Title
    section
      #appContent.tile.is-ancestor.is-fullwidth
        .tile.is-vertical.is-4.is-paddingless.is-marginless
          .tile
            .tile.is-parent.is-vertical
              article.tile.is-child.notification
                .content
                  p#documentTitle.title.edited Title
              article.tile.is-child#editorColumn
                editor
        .tile.is-parent.is-paddingless.is-marginless
          .tile
            article.tile.is-child.notification.is-info
              .content
                p.title Map
                p.subitle Map
                .content Stuff
        #debugTile.tile.is-parent.is-paddingless.is-marginless.is-2(
          v-if="debug")
          .tile
            article.tile.is-child.notification.is-danger
              .content
                p.title Debug
                p.subitle Map
                .content Stuff
    button(@click="switchDebug") Debug
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
      debug: true,
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
    switchDebug(){
      this.debug = !this.debug;
    }
  }

}
</script>

<style lang="sass">
@import './assets/custom_buefy';
@import "./assets/constants";

*
  transition-duration: 250ms

#editorColumn
  background-color: $editorBackground
  color: #fff



#app
  position: absolute
  top: 10px //TODO: find the problem. Don't fix the symptom

#documentTitle
  /*background: darkgrey*/
  color: #3b3b3b
  &.edited
    &:after
      content: ' \2013 Edited'
      opacity: .5

    &:before
      font-family: "Material Icons"
      content: '\E313'
      opacity: .5

.tile
  &.is-vertical
    flex-direction: column
    & > .tile.is-child:not(:last-child)
      margin-bottom: 0 !important

</style>
