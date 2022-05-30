<template>
  <comment-node :content="text" />
</template>

<script setup>
import { toRefs, ref } from 'vue'
import CommentNode from '../CommentNode.vue'

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
const text = ref('')

for (const n of node.value.childNodes) {
  text.value += n.nodeValue
}
</script>
