import axios from 'axios'
import { defineStore } from 'pinia'
const ITEMS_PER_PAGE = 10
import router from '@/router'

let cancelToken = null

export const usePeopleList = defineStore('data', {
  state: () => {
    return {
      data: {},
      dataLoaded: false,
      planetsLoaded: false,
      sortingKey: null,
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
    getSortingKey: (state) => state.sortingKey,
    getCurrentPage: (state) => state.pagination.currentPage,
    getTotalPages: (state) => Math.ceil(state.data.count / ITEMS_PER_PAGE)
  },
  actions: {
    async getList(keyword) {
      this.data = {}
      this.dataLoaded = false
      this.planetsLoaded = false
      const params = {}

      if (cancelToken) {
        cancelToken.cancel('Request canceled')
      }
      cancelToken = axios.CancelToken.source()
      keyword ? (params.search = keyword) : (params.page = this.pagination.currentPage)
      try {
        const response = await axios.get('https://swapi.dev/api/people/', { params: params })
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
            this.data.results[index] != undefined
          ) {
            this.data.results[index]['homeworld'] = homeworldResponse.data
          }
          this.planetsLoaded = true
        })
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message)
        } else {
          console.error('Error:', err)
        }
      }
    },
    setPage(page) {
      this.pagination.currentPage = page
      this.getList()
    },
    sortStrings(key) {
      if (this.sortingKey === key) {
        this.data.results.sort((a, b) => (a[key] < b[key] ? 1 : -1))
        this.sortingKey = ''
        this.updateRouteSortOrder(key)
      } else {
        this.data.results.sort((a, b) => (a[key] > b[key] ? 1 : -1))
        this.sortingKey = key
        this.updateRouteSortOrder(key)
      }
    },
    sortInts(key) {
      if (this.sortingKey === key) {
        this.data.results.sort(
          (a, b) => (b[key] === 'unknown' ? 0 : b[key]) - (a[key] === 'unknown' ? 0 : a[key])
        )
        this.sortingKey = ''
        this.updateRouteSortOrder(key)
      } else {
        this.data.results.sort(
          (a, b) => (a[key] === 'unknown' ? 0 : a[key]) - (b[key] === 'unknown' ? 0 : b[key])
        )
        this.sortingKey = key
        this.updateRouteSortOrder(key)
      }
    },
    sortPlanets() {
      const key = 'planetName'
      if (this.sortingKey === key) {
        this.data.results.sort((a, b) => (a.homeworld.name < b.homeworld.name ? 1 : -1))
        this.sortingKey = ''
        this.updateRouteSortOrder(key)
      } else {
        this.data.results.sort((a, b) => (a.homeworld.name > b.homeworld.name ? 1 : -1))
        this.sortingKey = 'planetName'
        this.updateRouteSortOrder(key)
      }
    },
    updateRouteSortOrder(key) {
      const currentSortOrder = this.sortingKey === key ? 'ascending' : 'descending'
      const currentRoute = { ...router.currentRoute.value }

      const newRoute = {
        ...currentRoute,
        query: { [key]: currentSortOrder }
      }
      router.replace(newRoute)
    }
  }
})
