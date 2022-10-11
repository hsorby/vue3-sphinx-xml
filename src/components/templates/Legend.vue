<template>
  <div :class="classes">
    <component
      v-for="(c, index) in children"
      :key="'container_component_' + index"
      :is="c.component"
      :node="c.node"
      :componentName="c.name"
      :properties="c.properties"
    />
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

import { useChildren, useClasses } from '../../composables/computed'

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
const { classes } = useClasses(node)
</script>
