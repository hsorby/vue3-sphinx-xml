<template>
  <div
    :class="combinedClasses"
    @[isToggleHeader&&`click`]="toggleHeaderClicked"
    ref="containerElement"
  >
    <component
      v-for="(c, index) in children"
      :key="'container_component_' + index"
      :is="c.component"
      :node="c.node"
      :componentName="c.name"
      :properties="c.properties"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue'

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

const { node } = toRefs(props)

const { children } = useChildren(node)
const { classes } = useClasses(node)
const { toggleActiveClass } = useMethods()

const combinedClasses = ref([])
const isToggleHeader = ref(false)
const containerElement = ref(null)

combinedClasses.value = [...classes.value]

function toggleHeaderClicked() {
  toggleActiveClass(combinedClasses.value)
  const index = combinedClasses.value.indexOf('active')
  let blockType = index === -1 ? 'none' : 'block'

  let elementSibling = containerElement.value.nextElementSibling
  while (elementSibling !== null) {
    elementSibling.style.display = blockType
    elementSibling = elementSibling.nextElementSibling
  }
}

onMounted(() => {
  if (
    classes.value.includes('header') ||
    classes.value.includes('header-left')
  ) {
    combinedClasses.value.push('inactive')
    const parent = node.value.parentElement
    if (parent) {
      if (parent.getAttribute('classes').includes('toggle')) {
        isToggleHeader.value = true
        combinedClasses.value.push('toggle-header')
      }
    }
  }

  if (classes.value.includes('tab2name')) {
    console.log('***** IN USE tab2name found ??? *****')
  }
})
</script>

<style scoped>
.toggle-header {
  cursor: pointer;
}
</style>
