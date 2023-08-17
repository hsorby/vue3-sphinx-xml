import { determineRouteUrl } from '../js/utilities'

const isEmpty = (d) => {
  for (const i in d) {
    return false
  }

  return true
}

export const useMethods = () => {
  const toggleActiveClass = (classList) => {
    let index = classList.indexOf('active')

    if (index !== -1) {
      classList[index] = 'inactive'
    } else {
      index = classList.indexOf('inactive')
      if (index !== -1) {
        classList[index] = 'active'
      }
    }
  }

  const separateIds = (element, targetId) => {
    const ids = element.getAttribute('ids')
    if (ids !== null) {
      let splitIds = ids.split(' ')
      const targetIndex = splitIds.indexOf(targetId)
      if (targetId && targetIndex !== -1) {
        splitIds.splice(targetIndex, 1)
        splitIds.unshift(targetId)
      }
      return { id: splitIds.shift(), extraIds: splitIds }
    }
    return {}
  }

  const dataObject = (element, additionalClasses) => {
    let dO = {}

    let classes = [...element.classList]
    if (additionalClasses) {
      classes = classes.concat(additionalClasses)
    }

    const id = extractId(element)
    const attributes = extractAttributes(element)

    if (classes.length) {
      dO['class'] = classes
    }
    if (!isEmpty(attributes) || !isEmpty(id)) {
      dO['attrs'] = {
        ...id,
        ...attributes,
      }
    }

    return dO
  }

  const extractAttributes = (element) => {
    const unrequiredAttrs = ['uri', 'ids', 'names', 'candidates', 'classes']
    const styleAttrs = ['width']
    let style = ''
    let attrDict = {}
    for (const attr of element.attributes) {
      if (styleAttrs.includes(attr.name)) {
        style += `${attr.name}: ${attr.value};`
      } else if (!unrequiredAttrs.includes(attr.name)) {
        attrDict[attr.name] = attr.value
      }
    }
    if (style) {
      attrDict.style = style
    }
    return attrDict
  }

  const extractId = (element) => {
    // Inserting the id of the first term in a collection as the contents of the item.
    const id = element.getAttribute('id')
    if (id) {
      return { id }
    }
    if (element.getAttribute('ids') && element.getAttribute('ids').length > 0) {
      const ids = element.getAttribute('ids').split(' ')
      const id = ids[0]
      return {
        id,
      }
    }
    return {}
  }

  const determinePageLocation = (element) => {
    const elementRefUri = element.getAttribute('refuri')
    const hash = elementRefUri.split('#')[1]
    return hash ? '#' + hash : ''
  }

  const determinePageName = (element, route) => {
    const baseRefUri = determineRouteUrl(route)
    const elementRefUri = element.getAttribute('refuri')
    // Remove page from reference uri
    let splitRefUri = elementRefUri.split('/')
    let routePath = route.path.replace(baseRefUri, '')
    // Remove the baseRefUri and make that our root location
    let splitRoutePath = routePath.split('/')
    // Remove the empty string from the beginning of the array
    splitRoutePath.shift()
    if (route.path !== baseRefUri) {
      // The base reference uri is a special case usually we have to
      // remove the page name from the route as well.
      splitRoutePath.pop()
    }
    // Get the file name from the reference uri
    const filePart = splitRefUri.pop()
    const fileBaseName = filePart.split('#')[0]
    // Remove up route if parent directory name found
    while (splitRefUri[0] === '..') {
      splitRefUri.shift()
      splitRoutePath.pop()
    }
    return [...splitRoutePath, ...splitRefUri, fileBaseName].join('/')
  }

  const isInternalReference = (element) => {
    const internal = element.getAttribute('internal') === 'True'
    return internal || isReferenceToCurrentPage(element)
  }

  const isReferenceToCurrentPage = (element) => {
    return element.hasAttribute('refid')
  }

  return {
    dataObject,
    determinePageLocation,
    determinePageName,
    extractId,
    isInternalReference,
    isReferenceToCurrentPage,
    separateIds,
    toggleActiveClass,
  }
}
