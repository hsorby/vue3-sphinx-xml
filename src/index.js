import Vue3Katex from '@hsorby/vue3-katex'
import 'katex/dist/katex.min.css'

import SphinxPage from './components/SphinxPage.vue'
import * as SphinxStore from './store/modules/sphinx'

// import BlockQuote from './components/templates/BlockQuote.vue'
// import ColumnGroup from './components/templates/ColumnGroup.vue'
// import Comment from './components/templates/Comment.vue'
// import Compound from './components/templates/Compound.vue'
// import Container from './components/templates/Container.vue'
// import Document_ from './components/templates/Document.vue'
// import DirectElementMap from './components/templates/DirectElementMap.vue'
// import DownloadReference from './components/templates/DownloadReference.vue'
// import Figure from './components/templates/Figure.vue'
// import FigureCaption from './components/templates/FigureCaption.vue'
// import Footnote from './components/templates/Footnote.vue'
// import FootnoteReference from './components/templates/FootnoteReference.vue'
// import Image from './components/templates/Image.vue'
// import Legend from './components/templates/Legend.vue'
// import LineBlock from './components/templates/LineBlock.vue'
// import LineSingle from './components/templates/LineSingle.vue'
// import Literal from './components/templates/Literal.vue'
// import LiteralBlock from './components/templates/LiteralBlock.vue'
// import Math_ from './components/templates/Math.vue'
// import MathBlock from './components/templates/MathBlock.vue'
// import Note from './components/templates/Note.vue'
// import NumberReference from './components/templates/NumberReference.vue'
// import Problematic from './components/templates/Problematic.vue'
// import Reference from './components/templates/Reference.vue'
// import Raw from './components/templates/Raw.vue'
// import Section from './components/templates/Section.vue'
// import StandardElement from './components/templates/StandardElement.vue'
// import Text from './components/templates/Text.vue'
// import Title from './components/templates/Title.vue'
// import TodoNode from './components/templates/TodoNode.vue'
// import Topic from './components/templates/Topic.vue'
// import Transition from './components/templates/Transition.vue'

// if (
//   BlockQuote ||
//   ColumnGroup ||
//   Comment ||
//   Compound ||
//   Container ||
//   DirectElementMap ||
//   Document_ ||
//   DownloadReference ||
//   Figure ||
//   FigureCaption ||
//   Footnote ||
//   FootnoteReference ||
//   Image ||
//   Legend ||
//   LineSingle ||
//   LineBlock ||
//   Literal ||
//   LiteralBlock ||
//   Math_ ||
//   MathBlock ||
//   Note ||
//   NumberReference ||
//   Problematic ||
//   Raw ||
//   Reference ||
//   Section ||
//   StandardElement ||
//   Text ||
//   Title ||
//   TodoNode ||
//   Topic ||
//   Transition
// ) {
  // Are these things hidden?
// }

function install(app, options = {}) {
  if (!options.store) {
    throw 'Please provide a store!!'
  }

  options.store.registerModule('sphinx', SphinxStore)
  app.use(Vue3Katex, options.katex)
}

export default install
export { SphinxPage }
