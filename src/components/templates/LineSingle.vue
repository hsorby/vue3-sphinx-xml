<template>
  <div :="attrs">
    <component
      v-for="(c, index) in children"
      :key="'footnote_component_' + index"
      :is="c.component"
      :node="c.node"
      :componentName="c.name"
      :properties="c.properties"
    />
  </div>
</template>

<script setup>
import { toRefs, ref } from 'vue'

import { useMethods } from '../../composables/methods'
import { useChildren } from '../../composables/computed'

console.log('***** IN USE *****')

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
const { children } = useChildren(node)
const { dataObject } = useMethods()
const attrs = ref({})

attrs.value = dataObject(node.value, ['line_single']).attrs
</script>
