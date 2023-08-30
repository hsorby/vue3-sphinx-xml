import { pathToRegexp } from 'path-to-regexp'

export const decodeHTML = (encoded) => {
  let elem = document.createElement('textarea')
  elem.innerHTML = encoded
  return elem.value
}

export const determineRouteUrl = (route) => {
  const regex = pathToRegexp(route.matched[0].path)
  let fullPath = route.fullPath
  if (route.hash) {
    fullPath = fullPath.replace(route.hash, '')
  }
  const matched = fullPath.match(regex)
  let base = undefined
  if (matched !== null) {
    base = matched[0]
    if (matched[matched.length - 1]) {
      base = matched[0].replace(`/${matched[matched.length - 1]}`, '')
    }
  }
  return base
}

export const constructPageNameFromRoute = (route) => {
  let pageName = undefined
  try {
    pageName = route.params.pageName.join('/')
  } catch (_) {
    pageName = route.params.pageName
  }
  return pageName
}

export const applyReferenceBaseChanges = (referenceBase, applicant) => {
  let parts = applicant.split(referenceBase)
  parts.pop()
  parts.push(referenceBase)
  return baseURLParts.join('/').replace('//', '/')
}
