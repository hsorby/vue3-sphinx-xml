<template>
  <blockquote>
    <div>
      <component
        v-for="(c, index) in children"
        :key="'blockquote_component_' + index"
        :is="c.component"
        :node="c.node"
        :componentName="c.name"
        :properties="c.properties"
      />
    </div>
  </blockquote>
</template>

<script setup>
import { toRefs } from 'vue'

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
  }
})

const { node } = toRefs(props)

const { children } = useChildren(node)
</script>
