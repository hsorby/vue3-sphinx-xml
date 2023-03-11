import { useSphinxStore } from '@/stores/sphinx'

import { useMethods } from './methods'
import { determineRouteUrl, constructPageNameFromRoute } from '../js/utilities'

const {
  determinePageLocation,
  determinePageName,
  isInternalReference,
  isReferenceToCurrentPage,
} = useMethods()

export const useBaseReference = (element, route, routeDescription) => {
  const sphinxStore = useSphinxStore()

  const onReferenceCreated = () => {
    if (isInternalReference(element)) {
      let pageName = constructPageNameFromRoute(route)
      const baseRefUri = determineRouteUrl(route)
      const pageReference = element.getAttribute('refid')
      if (pageReference && !pageReference.startsWith('#')) {
        routeDescription.value.hash = '#' + pageReference
      } else {
        routeDescription.value.hash = pageReference
      }
      if (!isReferenceToCurrentPage(element)) {
        pageName = determinePageName(element, route)
        routeDescription.value.hash = determinePageLocation(element)
        const existingPageWrapper = sphinxStore.getPageById(
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

      routeDescription.value.path = baseRefUri + '/' + pageName
    }
  }
  return {
    onReferenceCreated,
  }
}
