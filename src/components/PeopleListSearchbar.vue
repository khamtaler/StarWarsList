<script setup>
import debounce from 'debounce'
import { useRoute, useRouter } from 'vue-router'
import { usePeopleList } from '@/stores/people'

const peopleListStore = usePeopleList()
const route = useRoute()
const router = useRouter()
const debouncedWrite = debounce(async (e) => {
  if (e.length !== 0) {
    let newRoute = {
      query: { search: e }
    }

    await router.push(newRoute)
    peopleListStore.getList()
  } else {
    await router.push({ query: {} })
    peopleListStore.getList()
  }
}, 1000)

function handleSearch(e) {
  debouncedWrite(e)
}
</script>

<template>
  <div>
    <form>
      <label
        for="default-search"
        class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="mb-3 block w-[30%] min-w-[200px] rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 ps-10 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-gray-500"
          placeholder="Search names..."
          :value="route.query.search ? route.query.search : ''"
          @input="handleSearch($event.target.value)"
          @keydown.enter.prevent
        />
      </div>
    </form>
  </div>
</template>
