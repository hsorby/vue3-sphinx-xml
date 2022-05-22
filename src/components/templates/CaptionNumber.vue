<template>
  <span :="attrs">
    <component
      v-for="(c, index) in children"
      :key="'caption_number_' + index"
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
  return ['caption-number', ...classes.value]
})

const result = dataObject(node.value, combinedClasses.value)
attrs.value = {
    ...result.attrs,
    class: result.class.join(' '),
  }

</script>
