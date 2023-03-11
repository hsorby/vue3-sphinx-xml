import Vue3Katex from '@hsorby/vue3-katex'
import 'katex/dist/katex.min.css'

import { installVue3Highlightjs } from '@hsorby/vue3-highlightjs'

import SphinxPage from './components/SphinxPage.vue'
import * as SphinxStore from './stores/sphinx'

function installVue3SphinxXml(app, options = {}) {
  if (!options.store) {
    throw 'Please provide a store!!'
  }

  options.store.registerModule('sphinx', SphinxStore)
  app.use(Vue3Katex, options.katex)
  app.use(installVue3Highlightjs)
}

export { installVue3SphinxXml, SphinxPage }
