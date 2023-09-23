<template>
  <document :element="element" :id="id" />
</template>

<script setup>
import { defineProps, ref, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSphinxStore } from '@/stores/sphinx'

import { determineRouteUrl, constructPageNameFromRoute } from '../js/utilities'

import Document from './templates/Document.vue'

const props = defineProps({
  baseURL: {
    type: String,
    default: '/',
  },
  referenceBaseURL: {
    type: String,
    default: undefined,
  },
  downloadBaseURL: {
    type: String,
    default: '',
  },
  imagesBaseURL: {
    type: String,
    default: '',
  },
  indexFileName: {
    type: String,
    default: 'index',
  },
  pageNotFoundName: {
    type: String,
    default: '404',
  },
  scrollDelay: {
    type: Number,
    default: 200,
  },
})

const {
  baseURL,
  referenceBaseURL,
  downloadBaseURL,
  imagesBaseURL,
  indexFileName,
  pageNotFoundName,
  scrollDelay,
} = toRefs(props)

const router = useRouter()
const route = useRoute()
const sphinxStore = useSphinxStore()

let element = ref(null)
let scrollToTarget = ref(undefined)
let id = ref('')
let previousRoute = {
  path: undefined,
  hash: undefined,
}

function followScrollTarget(elem) {
  setTimeout(() => {
    scrollToTarget.value = elem.offsetTop
    window.scrollTo({
      top: elem.offsetTop,
      behavior: 'smooth',
    })
    setTimeout(() => {
      if (scrollToTarget.value !== elem.offsetTop) {
        followScrollTarget(elem)
      }
    }, 10)
  }, scrollDelay.value)
}

watch(
  route,
  (to) => {
    const routeURL = determineRouteUrl(to)
    if (routeURL !== undefined) {
      if (previousRoute.path === undefined || to.path !== previousRoute.path) {
        const pageName = constructPageNameFromRoute(to)
        fetchPageData(to.path, routeURL, pageName)
        if (to.hash) {
          setTimeout(() => {
            let hash = to.hash
            if (hash.startsWith('#')) {
              hash = hash.slice(1)
            }
            const elem = document.getElementById(hash)
            if (elem) {
              followScrollTarget(elem)
            }
          }, scrollDelay.value)
        }
      } else if (to.path === previousRoute.path && to.hash) {
        let hash = to.hash
        if (hash.startsWith('#')) {
          hash = hash.slice(1)
        }
        const elem = document.getElementById(hash)
        if (elem) {
          window.scrollTo({
            top: elem.offsetTop,
            behavior: 'smooth',
          })
        }
      }
    }

    previousRoute.path = to.path
    previousRoute.hash = to.hash
  },
  { flush: 'pre', immediate: true, deep: true },
)

function fetchPageData(currentPath, routeURL, pageName) {
  if (!pageName) {
    pageName = indexFileName.value
  }
  const resolvedImagesBaseURL =
    imagesBaseURL.value === ''
      ? `${baseURL.value}/_images`
      : imagesBaseURL.value
  const resolvedDownloadBaseURL =
    downloadBaseURL.value === ''
      ? `${baseURL.value}/_downloads`
      : downloadBaseURL.value

  let tmpBaseURL = baseURL.value
  let tmpRouteURL = routeURL
  let tmpPageName = pageName
  if (referenceBaseURL.value) {
    let baseURLParts = tmpBaseURL.split(referenceBaseURL.value)
    const value = baseURLParts.pop()
    if (value === indexFileName.value) {
      baseURLParts.pop()
    }
    if (referenceBaseURL.value !== '/') {
      baseURLParts.push(referenceBaseURL.value)
    }
    tmpBaseURL = baseURLParts.join('/').replace('//', '/')
    let routeURLParts = tmpRouteURL.split(referenceBaseURL.value)
    const routeEnd = routeURLParts.pop()
    routeURLParts.push(referenceBaseURL.value)
    tmpRouteURL = routeURLParts.join('/').replace('//', '/')
    const pagePrefix = routeEnd[0] === '/' ? routeEnd.slice(1) : routeEnd
    tmpPageName = pagePrefix + '/' + tmpPageName
  }

  sphinxStore.registerRouteUrl({
    baseURL: tmpBaseURL,
    routeURL: tmpRouteURL,
    downloadsURL: resolvedDownloadBaseURL,
    imagesURL: resolvedImagesBaseURL,
    offsetRouteURL: referenceBaseURL.value === undefined ? false : routeURL,
  })

  sphinxStore
    .fetchPage({
      page_name: tmpPageName,
      page_route: tmpRouteURL,
      page_url: tmpBaseURL,
    })
    .then((response) => {
      element.value = response
      id.value = 'page_' + tmpPageName.replace('/', '_')
    })
    .catch(() => {
      if (pageName.endsWith('index')) {
        router.push({
          name: pageNotFoundName.value,
          query: {
            path: currentPath,
          },
        })
      } else {
        // Didn't find a path with the original name, maybe it's an index page?
        const newPath =
          currentPath + (currentPath.endsWith('/') ? '' : '/') + indexFileName.value
        router.push(newPath)
      }
    })
}
</script>
