<template>
  <span :="attrs">
    <component
      v-for="(c, index) in children"
      :key="'figure_caption_' + index"
      :is="c.component"
      :node="c.node"
      :componentName="c.name"
      :properties="c.properties"
    />
  </span>
</template>

<script setup>
import { computed, toRefs, ref } from 'vue'

import { useChildren, useClasses } from '../../composables/computed'
import { useMethods } from '../../composables/methods'

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

const { dataObject } = useMethods()
const { node } = toRefs(props)
const attrs = ref({})
const { classes } = useClasses(node)

const { children } = useChildren(node)

const combinedClasses = computed(() => {
  let c = ['figure-caption', ...classes.value]
  for (const attr of node.value.attributes) {
    if (attr.name === 'align') {
      c.push('align-' + attr.value)
    }
  }
  return c
})

const result = dataObject(node.value, combinedClasses.value)
attrs.value = {
    ...result.attrs,
    class: result.class.join(' '),
  }
</script>
