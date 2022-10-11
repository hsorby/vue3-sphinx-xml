<template>
  <router-link v-if="isInternalReference(node)" :to="routeDescription">
    [{{ node.textContent }}]
  </router-link>
  <a v-else :href="node.getAttribute('refuri')" target="_blank">
    [{{ node.textContent }}]
  </a>
</template>

<script setup>
import { onMounted, toRefs, ref } from 'vue'
import { useRoute } from 'vue-router'

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

const routeDescription = ref({path: '', hash: ''})
const { node } = toRefs(props)
const route = useRoute()

const { isInternalReference } = useMethods()
const { onReferenceCreated } = useBaseReference(node.value, route, routeDescription)

onMounted(onReferenceCreated)

</script>
