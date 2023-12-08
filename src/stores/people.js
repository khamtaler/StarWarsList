import axios from 'axios'
import { defineStore } from 'pinia'

export const usePeopleList = defineStore('peopleList', {
  state: () => {
    return {
      PeopleList: {},
      currentPage: 1,
      numberOfPages: null,
      sortKey: null
    }
  },
  getters: {
    getPeopleList: (state) => state.PeopleList,
    getCurrentPage: (state) => state.currentPage
  },
  actions: {
    async downloadPeopleList() {
      this.PeopleList = {}
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${this.currentPage}`)
        console.log(response.data)
        this.PeopleList = response.data
        this.numberOfPages = Math.ceil(response.data.count / 10)
        console.log(this.PeopleList.results)
        for (let i = 0; i < this.PeopleList.results.length; i++) {
          try {
            axios
              .get(`${this.PeopleList.results[i].homeworld}`)
              .then((res) => (this.PeopleList.results[i]['homeworld'] = res.data))
          } catch (err) {
            console.error(err)
          }
        }

        console.log(this.PeopleList)
      } catch (err) {
        console.error(err)
      }
    },
    navigateToPage(page) {
      this.currentPage = page
      this.downloadPeopleList()
    },
    sortStrings(key) {
      console.log(this.PeopleList.results[0][key])
      if (this.sortKey === key) {
        this.PeopleList.results.sort((a, b) => (a[key] < b[key] ? 1 : -1))
        this.sortKey = ''
      } else {
        this.PeopleList.results.sort((a, b) => (a[key] > b[key] ? 1 : -1))
        this.sortKey = key
      }
    },
    sortInts(key) {
      if (this.sortKey === key) {
        this.PeopleList.results.sort(
          (a, b) => (b[key] === 'unknown' ? 0 : b[key]) - (a[key] === 'unknown' ? 0 : a[key])
        )
        this.sortKey = ''
      } else {
        this.PeopleList.results.sort(
          (a, b) => (a[key] === 'unknown' ? 0 : a[key]) - (b[key] === 'unknown' ? 0 : b[key])
        )
        this.sortKey = key
      }
    },
    sortPlanets(key) {
      if (this.sortKey === key) {
        this.PeopleList.results.sort((a, b) => (a.homeworld[key] < b.homeworld[key] ? 1 : -1))
        this.sortKey = ''
      } else {
        this.PeopleList.results.sort((a, b) => (a.homeworld[key] > b.homeworld[key] ? 1 : -1))
        this.sortKey = key
      }
    }
  }
})
