import { computed, defineAsyncComponent } from 'vue'

import ErrorComponent from '../components/Error.vue'
import LoadingComponent from '../components/Loading.vue'
import { nodeNameTagNameMap, nodeNameTemplateNameMap } from '../js/nodemap'

function defineChildComponent(name, node) {
  let properties = undefined
  if (node.nodeName === '#text') {
    if (!node.nodeValue.trim()) {
      return null
    }
    properties = {
      text: node.nodeValue,
    }
  } else if (node.nodeName === 'warning') {
    let parentNode = node.parentNode
    let depth = 0
    while (parentNode) {
      if (parentNode.nodeName === 'section') {
        depth += 1
      }
      parentNode = parentNode.parentNode
    }
    properties = {
      depth
    }
  } else if (node.nodeName === 'title') {
    let parentNode = node.parentNode
    let depth = 0
    let isTopic = false
    if (parentNode.nodeName === 'topic') {
      isTopic = true
    } else {
      while (parentNode) {
        // && parentNode.nodeName !== ('SphinxPage' should now be 'document' but maybe this is no longer requied).
        if (parentNode.nodeName === 'section') {
          depth += 1
        }
        parentNode = parentNode.parentNode
      }
    }
    properties = {
      depth,
      isTopic,
    }
  }
  const component = defineAsyncComponent({
    loader: () => {
      return import(`../components/templates/${name}.vue`)
    },
    // A component to use while the async component is loading
    loadingComponent: LoadingComponent,
    // A component to use if the load fails
    errorComponent: ErrorComponent,
  })

  return {
    component,
    name,
    node,
    properties,
  }
}

function defineColgroupComponent(node, colspecs) {
  const name = 'ColumnGroup'
  const component = defineAsyncComponent({
    loader: () => {
      return import(`../components/templates/${name}.vue`)
    },
    // A component to use while the async component is loading
    loadingComponent: LoadingComponent,
    // A component to use if the load fails
    errorComponent: ErrorComponent,
  })
  
  const properties = {
    colspecs
  }

  return {
    component,
    name,
    node,
    properties,
  }
}

function mapToComponentName(name) {
  let componentName =
  name.charAt(0).toUpperCase() + name.slice(1)
  if (nodeNameTemplateNameMap.has(name)) {
    componentName = nodeNameTemplateNameMap.get(name)
  } else if (nodeNameTagNameMap.has(name)) {
    componentName = 'StandardElement'
  }
return componentName
}

function addTGroup(components, node, columns) {
  if (node === null) {
    return components
  }

  let colspecs = []
  for (const colspec of node.querySelectorAll('colspec')) {
    colspecs.push(colspec.getAttribute('colwidth'))
  }

  if (colspecs.length !== columns) {
    console.log('***** Something is not right. *****', colspecs.length, columns)
  }
  components.push(defineColgroupComponent(node, colspecs))

  return components
}

function addComponents(components, node) {
  if (node === null) {
    return components
  }

  let childTarget = null
  for (const child of node.childNodes) {
    const childName = child.nodeName
    if (childName === 'compact_paragraph') {
      // Skip over this wrapper and directly add its children to this component.
      components = addComponents(components, child)
    } else if (childName === 'tgroup') {
      // Skip over these wrappers and directly add their children to this component.
      const columnCount = Number(child.getAttribute('cols'))
      components = addTGroup(components, child, columnCount)
      components = addComponents(components, child)
    } else if (childName === 'colspec') {
      // Ignore this element completely, this element is dealt with by 'tgroup'.
    } else {
      if (childName === 'target') {
        childTarget = child.getAttribute('refid')
      } else {
        if (childName !== '#text' && childTarget) {
          child.setAttribute('id', childTarget)
          childTarget = ''
        }
        const componentName = mapToComponentName(childName)
        const item = defineChildComponent(componentName, child)
        if (item) {
          components.push(item)
        }
      }
    }
  }

  return components
}

export function useChildren(element) {
  const children = computed(() => {
    return addComponents([], element.value)
  })

  return {
    children,
  }
}

export function useClasses(element) {
  const classes = computed(() => {
    let classesString = element.value.getAttribute('classes')
    let classes = []
    if (classesString) {
      classes = classesString.split(' ')
    }
    return [element.value.nodeName.toLowerCase(), ...classes]
  })

  return {
    classes
  }
}
