import SphinxService from '../../services/SphinxService'

export const namespaced = true

export const state = {
  pages: new Map(),
  urlMap: new Map(),
  inflight: new Map(),
  downloadURLs: new Map(),
  imagesURLs: new Map(),
}

export const mutations = {
  APPEND_PAGE(state, { routeURL, page }) {
    let pages = state.pages.get(routeURL)
    if (!pages) {
      pages = []
    }
    pages.push(page)
    state.pages.set(routeURL, pages)
  },
  ADD_INFLIGHT(state, { routeURL, page_name, pending }) {
    let inflightMap = state.inflight.get(routeURL)
    if (!inflightMap) {
      inflightMap = new Map()
    }
    inflightMap.set(page_name, pending)
    state.inflight.set(routeURL, inflightMap)
  },
  REMOVE_INFLIGHT(state, { routeURL, id }) {
    state.inflight.get(routeURL).delete(id)
  },
  // SET_DOWNLOADS_URL(state, { routeURL, url }) {
  //   state.downloadsURLs.set(routeURL, url)
  // },
  // SET_IMAGES_URL(state, { routeURL, url }) {
  //   state.imagesURLs.set(routeURL, url)
  // },
  REGISTER_ROUTE_URL(state, { baseURL, routeURL, downloadsURL, imagesURL }) {
    const registeredURL = state.pages.get(routeURL)
    if (!registeredURL) {
      state.pages.set(routeURL, [])
      state.urlMap.set(routeURL, baseURL)
      state.downloadURLs.set(routeURL, downloadsURL)
      state.imagesURLs.set(routeURL, imagesURL)
      state.inflight.set(routeURL, new Map())
    }
  },
}

export const actions = {
  fetchPage({ commit, getters }, payload) {
    const page_name = payload.page_name
    const page_route = payload.page_route
    const base_url = payload.page_url
    commit('REGISTER_ROUTE_URL', {
      baseURL: base_url,
      routeURL: page_route,
      downloadsURL: payload.page_downloads,
      imagesURL: payload.page_images,
    })
    const existingPage = getters.getPageById(page_route, page_name)
    if (existingPage) {
      return Promise.resolve(existingPage)
    }
    if (getters.isInflight(page_route, page_name)) {
      return getters.getInflight(page_route, page_name)
    }
    const pending = SphinxService.getPage(base_url, page_name)
      .then(response => {
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const documentElement = xmlDoc.querySelector('document')
        commit('APPEND_PAGE', { routeURL: page_route, page: documentElement })
        commit('REMOVE_INFLIGHT', { routeURL: page_route, id: page_name })
        return documentElement
      })
      .catch(() => {
        commit('REMOVE_INFLIGHT', { routeURL: page_route, id: page_name })
        throw 'Page not found'
      })
    commit('ADD_INFLIGHT', { routeURL: page_route, page_name, pending })
    return pending
  },
  // setDownloadURL({ commit }, { page_route, url }) {
  //   commit('SET_DOWNLOAD_URL', { routeURL: page_route, url })
  // },
  // setImagesURL({ commit }, { page_route, url }) {
  //   commit('SET_IMAGES_URL', { routeURL: page_route, url })
  // },
}

export const getters = {
  getPageById: state => (routeURL, id) => {
    return state.pages.get(routeURL).find(page => page.id === id)
  },
  getInflight: state => (routeURL, id) => {
    return state.inflight.get(routeURL).get(id)
  },
  isInflight: state => (routeURL, id) => {
    return !!state.inflight.get(routeURL).get(id)
  },
  getBaseUrl: state => routeURL => {
    return state.urlMap.get(routeURL)
  },
  getDownloadURL: state => routeURL => {
    return state.downloadURLs.get(routeURL)
  },
  getImagesURL: state => routeURL => {
    return state.imagesURLs.get(routeURL)
  },
}
