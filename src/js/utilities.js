
export const decodeHTML = (encoded) => {
  let elem = document.createElement('textarea')
  elem.innerHTML = encoded
  return elem.value
}

/**
 * Gets the base URL of the route, excluding the pageName parameter.
 */
export const determineRouteUrl = (route) => {
  const path = route.path
  const pageName = route.params.pageName

  // Case 1: No pageName parameter exists (e.g., /documentation/installation)
  // pageName will be undefined.
  if (pageName === undefined) {
    return path
  }

  // Case 2: pageName is an empty string (e.g., /documentation/installation/)
  if (pageName === '') {
    // Return the path without the trailing slash
    return path.endsWith('/') ? path.slice(0, -1) : path
  }

  // Case 3: pageName has content (e.g., /documentation/installation/foo/bar)
  // pageName will be "foo/bar".
  // We find the last instance of "/foo/bar" and take the substring before it.
  const paramIndex = path.lastIndexOf('/' + pageName)
  if (paramIndex !== -1) {
    return path.substring(0, paramIndex)
  }

  // Fallback
  return path
}

/**
 * [V4-COMPLIANT]
 * Gets the page name parameter from the route.
 */
export const constructPageNameFromRoute = (route) => {
  const pageName = route.params.pageName

  // In v4, a '(.*)' param is a string.
  // A '(...)+' param (one or more) is an array.
  // We handle both just in case.
  if (Array.isArray(pageName)) {
    return pageName.join('/')
  }

  // Returns the string (e.g., "foo/bar") or an empty string
  return pageName || ''
}

export const applyReferenceBaseChanges = (referenceBase, applicant) => {
  let parts = applicant.split(referenceBase)
  parts.pop()
  parts.push(referenceBase)
  // You had a typo here, it should be 'parts', not 'baseURLParts'
  return parts.join('/').replace('//', '/')
}
