import { createPinia } from 'pinia'

import Vue3Katex from 'vue3-katex'
import 'katex/dist/katex.min.css'

import { installVue3Highlightjs } from '@hsorby/vue3-highlightjs'

import SphinxPage from './components/SphinxPage.vue'

function installVue3SphinxXml(app, options = {}) {
  // Create a local pinia instance???
  app.use(createPinia())
  app.use(Vue3Katex, options.katex)
  app.use(installVue3Highlightjs)
}

export { installVue3SphinxXml, SphinxPage }
