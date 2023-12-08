<script setup>
import { usePeopleList } from '@/stores/people'

const peopleListStore = usePeopleList()

function navigate(page) {
  if (page === 0) {
    return
  }
  if (page === peopleListStore.numberOfPages + 1) {
    return
  }
  peopleListStore.navigateToPage(page)
}
</script>

<template>
  <div class="mt-5 flex flex-wrap items-center justify-center" v-if="peopleListStore.numberOfPages">
    <button
      type="button"
      @click="navigate(peopleListStore.currentPage - 1)"
      class="p border-lighter-gray border-[1px] bg-white px-4 py-2 text-base"
    >
      prev
    </button>
    <button
      type="button"
      v-for="index in peopleListStore.numberOfPages"
      :key="index"
      @click="navigate(index)"
      :class="{ active: index === peopleListStore.currentPage }"
      class="border-lighter-gray border-[1px] border-l-0 bg-white px-4 py-2 text-base"
    >
      {{ index }}
    </button>
    <button
      type="button"
      @click="navigate(peopleListStore.currentPage + 1)"
      class="border-lighter-gray border-[1px] border-l-0 bg-white px-4 py-2 text-base"
    >
      next
    </button>
  </div>
</template>
