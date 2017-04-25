<template>
  <div id="app">
    <div class="columns">
      <div class="column is-one-quarter">
        <quill-editor
          ref="myQuillEditor"
          v-model="content"
          :options="editorOption">
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



  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'buefy/lib/buefy.css'
{
  if (!window.Quill) {
    window.Quill = require('quill/dist/quill.js')
  }
  var quill = window.Quill
  console.log(Quill)
  var Inline = Quill.import('blots/inline');

  class User extends Inline{
    static create() {
      return super.create();
    }

    static formats() {
      return true;
    }

    optimize() {
      super.optimize();
      if (this.domNode.tagName !== this.statics.tagName[0]) {
        this.replaceWith(this.statics.blotName);
      }
    }
  }

  User.blotName = 'user';
  User.tagName = ['USER'];

    class Container extends Inline{
    static create() {
      return super.create();
    }

    static formats() {
      return true;
    }

    optimize() {
      super.optimize();
      if (this.domNode.tagName !== this.statics.tagName[0]) {
        this.replaceWith(this.statics.blotName);
      }
    }
  }

  Container.blotName = 'container';
  Container.tagName = ['CONTAINER'];

  Quill.register(User, true);
  Quill.register(Container, true);
}

export default {
  
  name: 'app',
  data () {
    return {
      content: '<p>I am an Example</p>',
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      }
    }
  },
  components: {
    'quillEditor': quillEditor
  },
  methods:{
    customButtonClick() {
      alert(`You can custom the button and listen click event to do something...\n你可以定义一些自定义按钮做你想做的事，如上传图片至第三方存储...等等`)
    },
    annotate(option){
      var quill = this.$refs.myQuillEditor.quill
      var selectionRange = quill.selection.lastRange;
      console.log(option);
      if(selectionRange != null){
        quill.formatText(selectionRange.index, selectionRange.length, {[option]: true})
        console.log(quill.getFormat());
      }


    }
  }

}
</script>

<style lang="scss">

  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
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
