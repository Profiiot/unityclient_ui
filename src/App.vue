<template lang="pug">
  #app
    nav.nav.level#mainNavigation
      .level-left
        .level-item
          strong Profi
        p.level-item
          a.button(@click="view = 'text'", v-bind:disabled="view == 'text'") Text
        p.level-item
          a.button(@click="view = 'split'", v-bind:disabled="view == 'split'") Split
      p#documentTitle.level-item.has-text-centered(:class="{edited: dirty}", @click="dirty=false")
        | Supermarkt
    section.section#appSection.is-fullwidth.is-paddingless
      #appContent.tile.is-ancestor.is-vertical
        .tile(:class="{'is-vertical' : (view == 'preview')}")
          .tile.is-vertical.is-paddingless.is-marginless(:class="{'is-4' : (view == 'split')}")
            .tile
              article.tile.is-child#editorColumn
                editor
          .tile.is-parent.is-paddingless.is-marginless(v-if="view == 'split'")
            .tile
              article.tile.is-child.notification.is-info
                .content
                  p.title Map
                  p.subitle Map
                  .content Stuff

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
      view: "split",
      dirty: true,
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
@import './assets/custom_buefy.scss'
@import "./assets/constants.scss"

#app
  position: absolute
  height: 100%
  bottom: 0


*
  transition-duration: 250ms
  /*border: 1px solid black*/

#appSection, #app
  display: flex
  flex-grow: 1
  align-items: stretch
  flex-direction: column

#mainNavigation
  margin-bottom: 0

#appContent
  margin-top: 0


#editorColumn
  background-color: $editorBackground
  color: #fff

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
