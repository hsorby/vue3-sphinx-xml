![logo](https://github.com/hsorby/vue3-sphinx-xml/raw/main/docs/assets/vue-sphinx-xml-logo.svg)

# vue3-sphinx-xml

[![npm](https://img.shields.io/npm/v/vue3-sphinx-xml.svg) ![npm](https://img.shields.io/npm/dm/vue3-sphinx-xml.svg)](https://www.npmjs.com/package/vue3-sphinx-xml)
[![vue3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)

Vue component for displaying documentation from XML that has been generaterd by [Sphinx](https://www.sphinx-doc.org/).

## Project setup

```
npm install --save vue3-sphinx-xml
```

### Module import

vue3-sphinx-xml makes use of the pinia to track data.
It uses a local pinia instance for its own purposes.
You can pass options to Katex when you install vue3-sphinx-xml, using the **katex** key in the options parameter.

```javascript
import { installVue3SphinxXml } from 'vue3-sphinx-xml'
import 'vue3-sphinx-xml/dist/style.css'

createApp(App)
  .use(installVue3SphinxXml, {
    katex: {
      /* Katex options go here. */
    },
  })
  .mount('#app')
```

Add the above to your `main.js` application file before the line creating a `createApp(App)` instance (this assumes that a standard layout is followed when creating your application).

vue3-sphinx-xml can make use of vue-highlightjs as an optional package.
vue-highlightjs adds code highlighting to any code blocks in the documentation. To make use of vue-highlightjs install the package:

```
npm install --save vue-highlightjs
```

and edit your `main.js` application file to have the following:

```javascript
import { installVue3SphinxXml } from 'vue3-sphinx-xml'
import 'vue3-sphinx-xml/dist/style.css'

import VueHighlightJS from 'vue-highlightjs'

import 'highlight.js/styles/xcode.css'

createApp(App)
  .use(store)
  .use(installVue3SphinxXml)
  .use(VueHighlightJS)
  .mount('#app')
```

The line `import 'highlight.js/styles/xcode.css'` is one of many styles available from highlightjs that may be imported.
See [highlightjs styles](https://highlightjs.org/static/demo/) for a comprehensive list of available styles.

### Module component

To use the vue3-sphinx-xml component import it in a view and set the `baseURL` for the source XML.
Example view `Documentation.vue`:

```javascript
<template>
  <div class="documentation">
    <sphinx-page baseURL="/sphinx-xml-files"
    />
  </div>
</template>

<script setup>
import { SphinxPage } from 'vue3-sphinx-xml'
</script>

```

In this example the XML source files would be in the directory **public/sphinx-xml-files**.

#### SphinxPage API

- props

| prop              | description                                     | default                   | type     |
| :---------------- | ----------------------------------------------- | ------------------------- | -------- |
| `baseURL`         | the base URL of the XML files                   | `'/'`                     | `String` |
| `downloadBaseURL` | the base URL for downloads                      | `baseURL + '/_downloads'` | `String` |
| `imagesBaseURL`   | the base URL for images                         | `baseURL + '/_images'`    | `String` |
| `indexFileName`   | the name of the index file at the base URL      | `'index'`                 | `String` |
| `scrollDelay`     | delay before scrolling to hash location on page | `300`                     | `Number` |

### Module routing

vue3-sphinx-xml requires that you use vue-router.
To add a vue3-sphinx-xml route under `documentation` add the following to `routes` object for vue-router:

```javascript
  {
    path: '/documentation/:pageName*',
    name: 'Documentation',
    component: () => import('../views/Documentation.vue')
  }
```

Again assuming standard layout.

### Module math

To render any math in the page vue3-sphinx-xml uses Katex.
Katex is not automatically loaded because it is a large package.
To render math with Katex you need to install the following packages:

```bash
npm install --save katex vue-katex
```

and edit your `main.js` application file to have the following:

```javascript
import SphinxXml from 'vue-sphinx-xml'
import VueKatex from 'vue-katex'

import 'katex/dist/katex.min.css'

Vue.use(SphinxXml, {
  katex: {
    /* Katex options. */
  },
})
Vue.use(VueKatex)
```

## Examples

For a complete example of a Vue application using vue3-sphinx-xml look at https://github.com/hsorby/example-vue3-sphinx-xml.
The **main** branch has a basic example of how vue3-sphinx-xml may be used and the **multi_version** branch has an example of how vue3-sphinx-xml may be used for different versions of Sphinx XML output.

---

## License

[Apache-2.0](https://opensource.org/licenses/Apache-2.0)

---

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
