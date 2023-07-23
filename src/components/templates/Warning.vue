<template>
  <div :id="id" class="admonition warning">
    <component :is="tagName">Warning</component>
    <component
      v-for="(c, index) in children"
      :key="'warning_component_' + index"
      :is="c.component"
      :node="c.node"
      :componentName="c.name"
      :properties="c.properties"
    />
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

import { useMethods } from '../../composables/methods'
import { useChildren } from '../../composables/computed'

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

const { node, properties } = toRefs(props)

const { extractId } = useMethods()
const { id } = extractId(node.value)

const { children } = useChildren(node)
const tagName = 'h' + properties.value.depth
</script>
