import { useSphinxStore } from '@/stores/sphinx'

import { useMethods } from './methods'
import { determineRouteUrl, constructPageNameFromRoute } from '../js/utilities'

const {
  determinePageLocation,
  determinePageName,
  isInternalReference,
  isReferenceToCurrentPage,
  parentLevelsInRefURI,
} = useMethods()

export const useBaseReference = (element, route, routeDescription) => {
  const sphinxStore = useSphinxStore()

  const onReferenceCreated = () => {
    if (isInternalReference(element)) {
      let pageName = constructPageNameFromRoute(route)
      let baseRefUri = determineRouteUrl(route)
      const pageReference = element.getAttribute('refid')
      if (pageReference && !pageReference.startsWith('#')) {
        routeDescription.value.hash = '#' + pageReference
      } else {
        routeDescription.value.hash = pageReference
      }
      if (!isReferenceToCurrentPage(element)) {
        pageName = determinePageName(element, route)
        let parentLevels = parentLevelsInRefURI(element)
        if (sphinxStore.isOffsetReferenceURL(baseRefUri) && parentLevels) {
          let parts = baseRefUri.split('/')
          while(parentLevels--) {
            parts.pop()
          }
          if (parts.length === 1) {
            baseRefUri = '/'
          } else {
            baseRefUri = parts.join('/')
          }
        }
        routeDescription.value.hash = determinePageLocation(element)
        const existingPageWrapper = sphinxStore.hasPageById(
          baseRefUri,
          pageName,
        )
        if (!existingPageWrapper) {
          sphinxStore.fetchPage({
            page_name: pageName,
            page_route: baseRefUri,
            page_url: sphinxStore.getBaseUrl(baseRefUri),
          })
        }
      }

      routeDescription.value.path = baseRefUri === '/' ? baseRefUri + pageName : baseRefUri + '/' + pageName
    }
  }
  return {
    onReferenceCreated,
  }
}
