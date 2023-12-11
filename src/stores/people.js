import axios from 'axios'
import { defineStore } from 'pinia'
import router from '@/router'

const ITEMS_PER_PAGE = 10

export const usePeopleList = defineStore('data', {
  state: () => {
    return {
      data: {},
      dataLoaded: false,
      planetsLoaded: false,
      pagination: {
        currentPage: 1,
        totalPages: null
      }
    }
  },
  getters: {
    getData: (state) => state.data,
    getdataLoaded: (state) => state.dataLoaded,
    getplanetsLoaded: (state) => state.planetsLoaded,
    getCurrentPage: (state) => state.pagination.currentPage,
    getTotalPages: (state) => Math.ceil(state.data.count / ITEMS_PER_PAGE)
  },
  actions: {
    async getList() {
      this.dataLoaded = false

      this.data = {}

      await router.isReady()
      const currentQuery = { ...router.currentRoute.value.query }

      if (currentQuery && currentQuery.page) {
        this.pagination.currentPage = parseInt(currentQuery.page)
      } else {
        this.pagination.currentPage = 1
      }
      let params = {}
      if (currentQuery.page) params.page = currentQuery.page
      if (currentQuery.search) params.search = currentQuery.search

      try {
        const response = await axios.get('https://swapi.dev/api/people/', {
          params: params
        })
        this.planetsLoaded = false
        this.data = response.data
        this.dataLoaded = true

        const homeworldPromises = this.data.results.map((result) => {
          if ('homeworld' in result) {
            return axios.get(result.homeworld)
          }
          return Promise.resolve(null)
        })

        const homeworldResponses = await Promise.all(homeworldPromises)

        homeworldResponses.forEach((homeworldResponse, index) => {
          if (
            homeworldResponse &&
            homeworldResponse.data &&
            this.data.results &&
            this.data.results[index] != undefined
          ) {
            this.data.results[index]['homeworld'] = homeworldResponse.data
          }
          this.planetsLoaded = true
        })
      } catch (err) {
        console.error('Error:', err)
      }
    },
    async setPage(page) {
      const currentRoute = { ...router.currentRoute.value }
      const newRoute = {
        ...currentRoute,
        query: { ...currentRoute.query, page: page }
      }

      await router.replace(newRoute)
      this.getList()
    },
    async sortStrings(key, order) {
      await this.updateRouteSortOrder(key, order)
      const currentRoute = { ...router.currentRoute.value }

      if (currentRoute.query.orderby === key && currentRoute.query.order === 'asc') {
        this.data.results.sort((a, b) => (a[key] < b[key] ? 1 : -1))
      } else {
        this.data.results.sort((a, b) => (a[key] > b[key] ? 1 : -1))
      }
    },
    async sortInts(key, order) {
      await this.updateRouteSortOrder(key, order)
      const currentRoute = { ...router.currentRoute.value }

      if (currentRoute.query.orderby === key && currentRoute.query.order === 'asc') {
        this.data.results.sort(
          (a, b) => (a[key] === 'unknown' ? 0 : a[key]) - (b[key] === 'unknown' ? 0 : b[key])
        )
      } else {
        this.data.results.sort(
          (a, b) => (b[key] === 'unknown' ? 0 : b[key]) - (a[key] === 'unknown' ? 0 : a[key])
        )
      }
    },
    async sortDates(key, order) {
      await this.updateRouteSortOrder(key, order)
      const currentRoute = { ...router.currentRoute.value }

      if (currentRoute.query.orderby === key && currentRoute.query.order === 'asc') {
        this.data.results.sort(
          (a, b) => new Date(a[key.split('T')[0]]) - new Date(b[key].split('T')[0])
        )
      } else {
        this.data.results.sort(
          (a, b) => new Date(b[key].split('T')[0]) - new Date(a[key].split('T')[0])
        )
      }
    },
    async sortPlanets(key, order) {
      await this.updateRouteSortOrder(key, order)
      const currentRoute = { ...router.currentRoute.value }
      if (currentRoute.query.orderby === key && currentRoute.query.order === 'desc') {
        this.data.results.sort((a, b) => (a.homeworld.name < b.homeworld.name ? 1 : -1))
      } else {
        this.data.results.sort((a, b) => (a.homeworld.name > b.homeworld.name ? 1 : -1))
      }
    },
    async updateRouteSortOrder(key, order) {
      const currentRoute = { ...router.currentRoute.value }
      let newSortOrder = order
        ? currentRoute.query.order
        : currentRoute.query.orderby === key && currentRoute.query.order === 'desc'
          ? 'asc'
          : 'desc'

      const newRoute = {
        ...currentRoute,
        query: { ...currentRoute.query, order: newSortOrder, orderby: key }
      }
      await router.replace(newRoute)
    }
  }
})
