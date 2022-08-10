<template>
  <router-link v-if="isInternalReference(node)" :to="routeDescription">
    {{ node.textContent }}
  </router-link>
  <a v-else :href="node.getAttribute('refuri')" target="_blank">
    <component
      v-for="(c, index) in children"
      :key="'sub_link_' + index"
      :is="c.component"
      :node="c.node"
      :componentName="c.name"
      :properties="c.properties"
    />
  </a>
</template>

<script setup>
import { onMounted, toRefs, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useChildren } from '../../composables/computed'
import { useMethods } from '../../composables/methods'
import { useBaseReference } from '../../composables/basereference'

const props = defineProps({
  node: {
    type: undefined,
    default: null,
  },
  componentName: {
    type: String,
  },
})

const routeDescription = ref({ path: '', hash: '' })
const { node } = toRefs(props)
const route = useRoute()

const { isInternalReference } = useMethods()
const { onReferenceCreated } = useBaseReference(
  node.value,
  route,
  routeDescription,
)

onMounted(onReferenceCreated)
const { children } = useChildren(node)
</script>
