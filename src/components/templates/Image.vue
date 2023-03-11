<template>
  <img :="attrs" />
</template>

<script setup>
import { computed, toRefs, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSphinxStore } from '@/stores/sphinx'

import { useMethods } from '../../composables/methods'
import { useChildren } from '../../composables/computed'
import { determineRouteUrl } from '../../js/utilities'

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
const { dataObject } = useMethods()
const route = useRoute()
const sphinxStore = useSphinxStore()
const attrs = ref({})

const uri = computed(() => {
  let imageURI = node.value.getAttribute('uri')
  if (imageURI && !imageURI.startsWith('/') && !imageURI.startsWith('http')) {
    const routeURL = determineRouteUrl(route)
    // Sphinx puts all images in a directory '_images' by default
    // for HTML output.  We are saying here that we will map the
    // XML image reference the same way.
    const lastIndex = imageURI.lastIndexOf('/')
    const imageName = imageURI.slice(lastIndex)
    // imageURI = `${this.$store.sphinx.getImagesURL(routeURL)}${imageName}`
    imageURI = [sphinxStore.getImagesURL(routeURL), imageName].join('/')
  }
  return imageURI
})

attrs.value = dataObject(node.value).attrs
if (attrs.value) {
  attrs.value.src = uri
} else {
  attrs.value = { src: uri }
}
</script>
