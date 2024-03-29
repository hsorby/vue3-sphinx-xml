import { defineStore } from 'pinia'

import SphinxService from '../services/SphinxService'

export const useSphinxStore = defineStore('sphinx', {
  state: () => ({
    pages: new Map(),
    urlMap: new Map(),
    inflight: new Map(),
    downloadURLs: new Map(),
    imagesURLs: new Map(),
    offsetReferenceURLs: new Map(),
  }),
  getters: {
    printPages: (state) => () => {
      console.log(state.pages)
    },
    getPageById: (state) => (routeURL, id) => {
      return state.pages.get(routeURL).find((page) => page.id === id)
    },
    hasPageById: (state) => (routeURL, id) => {
      return !!state.getPageById(routeURL, id)
    },
    getInflight: (state) => (routeURL, id) => {
      return state.inflight.get(routeURL).get(id)
    },
    isInflight: (state) => (routeURL, id) => {
      return !!state.inflight.get(routeURL).get(id)
    },
    getBaseUrl: (state) => (routeURL) => {
      return state.urlMap.get(routeURL)
    },
    getDownloadURL: (state) => (routeURL) => {
      return state.downloadURLs.get(routeURL)
    },
    getImagesURL: (state) => (routeURL) => {
      return state.imagesURLs.get(routeURL)
    },
    isOffsetReferenceURL: (state) => (routeURL) => {
      return state.offsetReferenceURLs.get(routeURL)
    },
  },
  actions: {
    appendPage({ routeURL, page }) {
      let pages = this.pages.get(routeURL)
      if (!pages) {
        pages = []
      }
      pages.push(page)
      this.pages.set(routeURL, pages)
    },
    addInflight({ routeURL, page_name, pending }) {
      let inflightMap = this.inflight.get(routeURL)
      if (!inflightMap) {
        inflightMap = new Map()
      }
      inflightMap.set(page_name, pending)
      this.inflight.set(routeURL, inflightMap)
    },
    removeInflight({ routeURL, id }) {
      this.inflight.get(routeURL).delete(id)
    },
    registerRouteUrl({
      baseURL,
      routeURL,
      downloadsURL,
      imagesURL,
      offsetRouteURL,
    }) {
      const registeredURL = this.pages.get(routeURL)
      const activeRouteURL = offsetRouteURL ? offsetRouteURL : routeURL
      this.downloadURLs.set(activeRouteURL, downloadsURL)
      this.imagesURLs.set(activeRouteURL, imagesURL)
      this.offsetReferenceURLs.set(
        activeRouteURL,
        offsetRouteURL ? true : false,
      )
      if (!registeredURL) {
        this.pages.set(routeURL, [])
        this.urlMap.set(routeURL, baseURL)
        this.inflight.set(routeURL, new Map())
      }
    },
    fetchPage(payload) {
      const page_name = payload.page_name
      const page_route = payload.page_route
      const base_url = payload.page_url

      const existingPage = this.getPageById(page_route, page_name)
      if (existingPage) {
        return Promise.resolve(existingPage)
      }

      if (this.isInflight(page_route, page_name)) {
        return this.getInflight(page_route, page_name)
      }

      const pending = SphinxService.getPage(base_url, page_name)
        .then((response) => {
          let parser = new DOMParser()
          let xmlDoc = parser.parseFromString(response.data, 'text/xml')
          const documentElement = xmlDoc.querySelector('document')
          documentElement.id = page_name
          this.appendPage({ routeURL: page_route, page: documentElement })
          this.removeInflight({ routeURL: page_route, id: page_name })
          return documentElement
        })
        .catch(() => {
          this.removeInflight({ routeURL: page_route, id: page_name })
          throw 'Page not found'
        })
      this.addInflight({ routeURL: page_route, page_name, pending })
      return pending
    },
    setDownloadURL({ routeURL, url }) {
      this.downloadsURLs.set(routeURL, url)
    },
    setImagesURL({ commit }, { routeURL, url }) {
      this.imagesURLs.set(routeURL, url)
    },
  },
})
