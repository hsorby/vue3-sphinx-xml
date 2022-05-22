<template>
  <router-link v-if="isInternalReference(node)" :to="routeDescription">
    {{ title }}
  </router-link>
  <a v-else :href="node.getAttribute('refuri')" target="_blank">
    {{ title }}
  </a>
</template>

<script setup>
import { computed, onMounted, toRefs, ref } from 'vue'
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

const title = computed(() => {
  if (node.value.childElementCount) {
    // A number reference has a single child element that
    // contains the label for the referenced element.
    // This is what we are assuming: <inline classes="std std-numref">Fig. 3</inline>
    return node.value.children[0].innerHTML
  }

  let refLabel = node.value.getAttribute('refid')
  if (!refLabel) {
    refLabel = node.value.getAttribute('refuri')
  }
  const t = refLabel.replace('-', ' ')
  return 'Fig. ' + t.charAt(0).toUpperCase() + t.slice(1)
})
</script>
