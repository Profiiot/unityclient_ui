<template>
  <div id="app">
    <div class="columns">
      <div class="column is-one-quarter">
        <quill-editor
          ref="myQuillEditor"
          v-model="content"
          :options="editorOption"
          @change="onEditorChange($event)">
          <div id="toolbar" slot="toolbar">
            <button @click="annotate('user')"><b-icon icon="directions_walk"></b-icon></button>
            <button @click="annotate('container')"><b-icon icon="extension"></b-icon></button>
            <button @click="annotate('')"><b-icon icon="add_location"></b-icon></button>
          </div>
        </quill-editor>
        
      </div>
      <div class="column">
        {{content}}
      </div>
    </div>


    <div>
      <pre>
        {{changes}}
      </pre>
      Container:
      <pre>{{container}}
      </pre>
      User:
      <pre>{{user}}
      </pre>
      User:
      <pre>
      </pre>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'buefy/lib/buefy.css'
import {initialiseQuillEditor, makeInlineBlot} from './editorUtils'
import { mapGetters } from 'vuex'

import $ from "jquery"

initialiseQuillEditor();
Quill.register(makeInlineBlot("user", ['user']), true)
Quill.register(makeInlineBlot("container", ['container']), true)

export default {
  
  name: 'app',
  data () {
    return {
      content: '<p>I am an Example</p>',
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      },
    }
  },
  components: {
    'quillEditor': quillEditor
  },
  computed:{
    changes(){return this.$store.state.changes},
    container(){return $("container", $(this.content))},
    user(){return $("user", $(this.content))}

  },
  methods:{
    customButtonClick() {
      alert(`You can custom the button and listen click event to do something...\n你可以定义一些自定义按钮做你想做的事，如上传图片至第三方存储...等等`)
    },
    annotate(option){
      let quill = this.$refs.myQuillEditor.quill;
      let selectionRange = quill.getSelection();

      console.log(option);
      function isStart(index) {
        return quill.getFormat(index - 1) [option] == null;
      }

      function isEnd(index, length) {
        return quill.getFormat(index + length + 1) [option] == null;
      }

      if(selectionRange != null){
        let format  = quill.getFormat(selectionRange.index, selectionRange.length);
        let index   = selectionRange.index;
        let length  = selectionRange.length;

        if(format[option]){
          console.log(index);
          debugger;
          if(!isStart(index)) while(!isStart(--index) && index > 0);
          console.log(index);
        }

        quill.formatText(selectionRange.index, selectionRange.length, {[option]: !format[option]})
      }
    },
    onEditorChange($e){
      console.log($e);
    }
  }

}
</script>

<style lang="scss">

  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    // max-height: 25em;
  }
  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
  User{
    background-color:#fbb;
  }
  container{
    background-color:#bfb;
  }
  User, Container{
    border-radius: 3pt;
    padding-left:5pt;
    padding-right:5pt;
  }
</style>
