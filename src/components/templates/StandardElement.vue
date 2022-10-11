<template>
  <component
    :is="tag"
    :="attrs"
    @[isButton&&`click`]="buttonClicked"
    ref="componentElement"
  >
    <component
      v-for="(c, index) in children"
      :key="'standard_element_component_' + index"
      :is="c.component"
      :node="c.node"
      :componentName="c.name"
      :properties="c.properties"
    />
  </component>
</template>

<script setup>
import { defineProps, toRefs, ref } from 'vue'

import { nodeNameTagNameMap } from '../../js/nodemap'
import { useChildren } from '../../composables/computed'
import { useMethods } from '../../composables/methods'

const props = defineProps({
  node: {
    type: undefined,
    default: null,
  },
  componentName: {
    type: String,
  },
})

const { node } = toRefs(props)
const { children } = useChildren(node)
const { dataObject } = useMethods()
const attrs = ref({})
const isButton = ref(false)
const componentElement = ref(null)

const transferAttributes = new Set(['div', 'button'])
const tag = nodeNameTagNameMap.get(node.value.nodeName)

const tmpDataObject = dataObject(node.value, node.value.getAttribute('classes'))
const classList = tmpDataObject.class
  ? tmpDataObject.class.join(' ')
  : undefined
attrs.value = {
  ...tmpDataObject.attrs,
  class: classList,
}

// An empty prefix attribute causes problems for <ol> elements.
if (attrs.value.prefix === '') {
  delete attrs.value.prefix
}

if (node.value.nodeName === 'button') {
  isButton.value = true
}

function buttonClicked() {
  if (componentElement.value.getAttribute('aria-selected') === 'false') {
    const parentElement = componentElement.value.parentElement
    let panels = []
    for (const child of parentElement.children) {
      const el = document.getElementById(child.id)
      el.setAttribute(
        'aria-selected',
        el.getAttribute('aria-selected') === 'true' ? 'false' : 'true',
      )
      panels.push({ id: child.getAttribute('aria-controls') })
    }
    for (const panel of panels) {
      const el = document.getElementById(panel.id)
      if (el.hasAttribute('hidden')) {
        el.removeAttribute('hidden')
      } else {
        el.setAttribute('hidden', '')
      }
    }
  }
}
</script>
