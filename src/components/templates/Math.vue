<template>
  <katex-element :expression="node.textContent"></katex-element>
</template>

<script setup>

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
  }
})
</script>
