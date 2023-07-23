<template>
  <div :id="id" :="attrs">
    <component
      v-for="(c, index) in children"
      :key="'admonition_component_' + index"
      :is="c.component"
      :node="c.node"
      :componentName="c.name"
      :properties="c.properties"
    />
  </div>
</template>

<script setup>
import { computed, toRefs, ref } from 'vue'

import { useMethods } from '../../composables/methods'
import { useChildren, useClasses } from '../../composables/computed'

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

const { dataObject, extractId } = useMethods()
const { classes } = useClasses(node)

const { id } = extractId(node.value)

const { children } = useChildren(node)

const combinedClasses = computed(() => {
  return ['admonition', ...classes.value]
})

const result = dataObject(node.value, combinedClasses.value)

const attrs = ref({})
attrs.value = {
  ...result.attrs,
  class: result.class.join(' '),
}
</script>
