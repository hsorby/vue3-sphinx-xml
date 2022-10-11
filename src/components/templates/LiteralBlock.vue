<template>
  <pre v-highlightjs><code :class="sourceLanguage">{{ sourceCode }}</code></pre>
</template>

<script setup>
import { computed, toRefs } from 'vue'

import { decodeHTML } from '../../js/utilities'

const props = defineProps({
  node: {
    type: undefined,
    default: null,
  },
  componentName: {
    type: String,
  },
  properties: {
    type: Object,
  },
})

const { node } = toRefs(props)

const sourceLanguage = computed(() => {
  let language = node.value.getAttribute('language')
  if (language === 'console' || language === 'default') {
    language = 'bash'
  } else if (language === 'text') {
    language = 'plaintext'
  }
  return language
})

const sourceCode = computed(() => {
  return decodeHTML(node.value.innerHTML)
})
</script>
