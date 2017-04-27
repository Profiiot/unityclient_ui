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
        .ql-formats(slot='toolbar')
          select.ql-header
            option(selected='')
            option(value='2')
            option(value='3')



</template>

<script>
  import { quillEditor } from 'vue-quill-editor';
  import {initialiseQuillEditor, makeInlineBlot} from '../editorUtils';
  import { mapGetters, mapMutations } from 'vuex';
  import $ from "jquery";

  initialiseQuillEditor();

  let containerTypes = ["user", "container", "location", "date"];
  containerTypes.map(tag => {
    Quill.register(makeInlineBlot(tag, [tag]), true);
  });


  export default {

    name: 'editor',
    data () {
      return {
        content:
            "<h2>Termin und Filter</h2>" +
            "<p>Tom erhält zusätzliche Termininformation hinsichtlich des anstehenden Abendessens. " +
            "Da Tom mit Emma, Ana und Paul auf Facebook befreundet ist, erkennt sein Kundenkonto " +
            "aufgrund der Einträge automatisch das Emma gerade Lowcarb isst und Ana ein " +
            "Nussallergie hat. Der Assistent fragt ob diese Informationen bei der Rezeptwahl " +
            "Beachtung finden sollen und ob es noch weitere Dinge gibt die beachtet werden müssen. " +
            "Tom aktiviert weitere Filter.</p>" +
            "<h2>Menge festlegen und bestellen</h2>" +
            "Tom entscheidet sich für eine Rezeptinsel und gibt Anzahl der Portionen ein. Er " +
            "bestättig die Menge und Preis. Informationen werden an das Lager gesendet. Die " +
            "Zutaten kann er anschließend zusammen mit den Basisprodukten abholen.  Tom hat ein " +
            "Budget von 200 Euro im Monat angelegt. Tom  kann somit jederzeit überprüfen wie viel " +
            "er für seinen derzeitigen Einkauf bezahlen muss und wie viel er bereits in dem Monat " +
            "ausgegeben hat."
        ,

        editorOption: {
          modules: {
            toolbar: '#toolbar'
          },
          theme: 'bubble'
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

        if(selectionRange != null){
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
            if(selectedIndex != start && selectedEnd != end){
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

<style lang="scss">
 @import "../assets/constants";

  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    font-family: "Courier";
    counter-reset: section;
    // max-height: 25em;
    p {
      border-left: 2pt solid rgba(255,255,255, .1);
      padding-left: 1em;
      margin-left: 1em;
      padding-bottom: 1em;
    }
    h2, h3 {
      font-weight: bold;
      color: $sectionTitleColor;
      counter-increment: section;
      &:before{
        content: counter(section)  ' ';
      }
      &:after{
        font-family: "Material Icons";
        position: absolute;
        left: .5em;
        display: block;
        content: '\E313';
        height: 1em;
        vertical-align: bottom;
      }
    }
  }
  .ql-toolbar .ql-formats button {
    &.user {
      color: $userColor;
    }
    &.location {
      color: $locationColor;
    }
    &.container {
      color: $containerColor;
    }
    &.date {
      color: $dateColor;
    }
  }

  User {
    border-color: $userColor;
    .active {
      background-color: $userColor;
    }
  }

  Location {
    border-color: $locationColor;
    .active {
      background-color: $locationColor;
    }
  }

  Container {
    border-color: $containerColor;
    .active {
      background-color: $containerColor;
    }
  }

  Date {
    border-color: $dateColor;
    .active {
      background-color: $dateColor;
    }
  }

  User, Container, Location, Date {
    border-width: 1pt;
    border-style: solid;
    border-radius: 3pt;
    padding-left:5pt;
    padding-right:5pt;
  }
</style>
