<template lang="pug">
  #editor
    quill-editor(
      ref='myQuillEditor',
      v-model='content',
      :options='editorOption',
    )
      #toolbar.ql-toolbar(slot='toolbar')
        .ql-formats(slot='toolbar')
          button.user(@click="annotate('user')")
            b-icon(icon='directions_walk')
          button.container(@click="annotate('container')")
            b-icon(icon='extension')
          button.location(@click="annotate('location')")
            b-icon(icon='add_location')
          button.date(@click="annotate('date')")
            b-icon(icon='list')
      #tooltip
        .ql-tooltip-arrow
        .ql-tooltip-editor
          input(type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL")
          a(class="ql-close")
    nav.level
      .level-item.hass-text-centered
        i#addChapterButton.fa.fa-plus-circle(@click="content = content + '<h2>mehr</h2><p>This is a story</p>'")



</template>

<script>
  import { quillEditor } from 'vue-quill-editor';
  import {initialiseQuillEditor, makeInlineBlot} from './editorUtils';
  import { mapGetters, mapMutations } from 'vuex';
  import $ from "jquery";
  import {ChariotTheme} from 'chariot-quill-theme';
//  import  '../assets/chariotTheme.styl'

  initialiseQuillEditor();

  Quill.register({"themes/chariot": ChariotTheme});

  let containerTypes = ["user", "container", "location", "date"];
  containerTypes.map(tag => {
    Quill.register(makeInlineBlot(tag, [tag]), true);
  });


  export default {

    name: 'editor',
    data () {
      return {
        content:
            "<h2>Registrierung</h2> " +
            "<p><user>Lisa</user> eröffnet ein <date>Kundenkonto</date> " +
            "bei \"<container>Cybershop</container>\". Hierzu lädt sie sich die <container> " +
            "CyberShop-App</container> herunter und reistriert sich als <user>Kunde</user>. " +
            "Sie hinterlegt ihre <date>Adressdaten</date>, <date>Kreditkartendaten</date> " +
            "und wählt ihren bevorzugten <date>Versanddienstleister</date> aus, sowie ihre " +
            "präferierten <date>Lieferzeiträume</date></p>"
        ,

        editorOption: {
          modules: {
            toolbar: '#toolbar'
          },
          theme: 'chariot'
        },
      }
    },
    components: {
      'quillEditor': quillEditor
    },
    computed:{
      changes(){
        return this.$store.state.changes
      },
      container(){return $("container", $(this.content))},
      user(){return $("user", $(this.content))},
        ...mapGetters({'getContent': 'getContent'})

    },
    methods:{
      ...mapMutations(['changeContent']),

      customButtonClick() {
        alert(`You can custom the button and listen click event to do something...\n你可以定义一些自定义按钮做你想做的事，如上传图片至第三方存储...等等`)
      },

      annotate(container){
        let quill = this.$refs.myQuillEditor.quill;
        let selectionRange = quill.getSelection();
        let self = this;

        console.log(container);
        function isStart(index) {
          return quill.getFormat(index - 1, 1) [container] == null;
        }

        function isEnd(index, length) {
          return quill.getFormat(index + length + 1) [container] == null;
        }

        function findStart(index) {
          while (!isStart(index) && index >= 0) index--;
          return index;
        }

        function findLength(index, length) {
          length = length || 0;
          while (!isEnd(index, length) && length < self.content.length) length++;
          return length;
        }

        if(selectionRange !== null){
          let format         = quill.getFormat(selectionRange.index, selectionRange.length);
          let selectedIndex  = selectionRange.index;
          let selectedLength = selectionRange.length;
          let isTagged = containerTypes.filter(tag => format[tag]).length > 0;

          if(isTagged){
            let start  = findStart (selectedIndex);
            let length = findLength(start);
            let end = start + length;
            let selectedEnd = selectedIndex + selectedLength;

            //if selection in center is selected
            if(selectedIndex !== start && selectedEnd !== end){
              selectedIndex  = start;
              selectedLength = length;
            }
          }

          //Delete all other annotations
          containerTypes.map(tag=> quill.formatText(selectedIndex, selectedLength, {[tag]: false}));
          //Annotate
          quill.formatText(selectedIndex, selectedLength, {[container]: !format[container]})
        }
      },
      onEditorChange($e){

      }
    }

  }
</script>

<style lang="sass">
@import "../assets/custom_buefy"
@import "../assets/constants.scss"

@font-face
  font-family: "Noto"
  src: url('../assets/fonts/NotoSerif-Regular.ttf') format("truetype")

@font-face
  font-family: "Yrsa Light"
  src: url('../assets/fonts/Yrsa-Light.otf') format("opentype")

@font-face
  font-family: "Fira Sans"
  src: url('../assets/fonts/FiraSans-Regular.otf') format("opentype")
  font-weight: 800

.ql-container .ql-editor
  /*min-height: 20em*/
  /*padding-bottom: 1em;*
  font-family: "Yrsa Light", monospace
  counter-reset: section
  font-size: $body-size

  p
    /*border-left: 2pt solid rgba(255,255,255, .1)*/
    padding-left: 1em
    margin-left: 1em
    padding-bottom: 1em

  h2, h3
    counter-increment: section
    font-family: "Fira Sans"
    margin-left: 1em
    padding-left: 1em
    font-size: $body-size !important

    &:after
      content: counter(section)  ' '
      position: absolute
      left: .5em
      width: 2em
      text-align: right


#addChapterButton
  color: #f3cb3b
  font-size: $size-3

.ql-toolbar .ql-formats button
  &.user
    color: $userColor
  &.location
    color: $locationColor
  &.container
    color: $containerColor
  &.date
    color: $dateColor


User
  color: $userColor
  .active
    background-color: $userColor


Location
  color: $locationColor
  .active
    background-color: $locationColor


Container
  color: $containerColor
  .active
    background-color: $containerColor

Date
  color: $dateColor
  .active
    background-color: $dateColor

User, Container, Location, Date
  /*border-width: 1pt*/
  /*border-style: solid*/
  /*border-radius: 3pt*/
  /*padding-left: 5pt*/
  /*padding-right: 5pt*/

/*#toolbar*/
  /*position: absolute*/
  /*right: 0px*/

</style>
