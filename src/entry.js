import Vue3Katex from '@hsorby/vue3-katex'
import 'katex/dist/katex.min.css'

import SphinxPage from './components/SphinxPage.vue'
import * as SphinxStore from './store/modules/sphinx'

function installVue3SphinxXml(app, options = {}) {
  if (!options.store) {
    throw 'Please provide a store!!'
  }

  options.store.registerModule('sphinx', SphinxStore)
  app.use(Vue3Katex, options.katex)
}

export { installVue3SphinxXml, SphinxPage }

