<template>
  <div :="attrs">
    <p class="admonition-title">Note</p>
    <component
      v-for="(c, index) in children"
      :key="'note_component_' + index"
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
const { dataObject } = useMethods()
const attrs = ref({})

const { children } = useChildren(node)

attrs.value = dataObject(node.value, ['admonition', 'note']).attrs
</script>
