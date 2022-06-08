<template>
  <div :id="id">
    <component
      v-for="(c, index) in children"
      :key="'document_component_' + index"
      :is="c.component"
      :node="c.node"
      :componentName="c.name"
      :properties="c.properties"
    />
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

import { useChildren } from '../../composables/computed'

const props = defineProps({
  element: {
    type: undefined,
    default: { empty: true },
  },
  id: {
    type: String,
    default: '',
  },
})

const { element } = toRefs(props)
const { children } = useChildren(element)

</script>
