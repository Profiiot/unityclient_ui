var quill = window.Quill
console.log(Quill)
var Inline = Quill.import('blots/inline');

export function initialiseQuillEditor() {
  if (!window.Quill) {
    window.Quill = require('quill/dist/quill.js')
  }
  // Quill.register(User, true);
}
export function makeInlineBlot(name, tag) {
  let annotator = class extends Inline {
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

  annotator.blotName = name;
  annotator.tagName  = tag;

  return annotator;
}