<template>
  <code :class="classes">
    <span class="pre">
      <component
        v-for="(c, index) in children"
        :key="'code_component_' + index"
        :is="c.component"
        :node="c.node"
        :componentName="c.name"
        :properties="c.properties"
      />
    </span>
  </code>
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

const { children } = useChildren(node)

const classes = ref(['literal', 'notranslate'])

const v = dataObject(node.value)
const isEmpty = (d) => {
  for (const i in d) {
    if (d[i].language === '') {
      continue
    }
    return false
  }

  return true
}

if (!isEmpty(v)) {
  if (v.attrs && v.attrs.role) {
    classes.value.push(v.attrs.role)
  }
}
</script>
