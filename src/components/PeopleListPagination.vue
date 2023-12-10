<script setup>
import { usePeopleList } from '@/stores/people'

const peopleListStore = usePeopleList()
</script>

<template>
  <div class="mt-5 flex flex-wrap items-end justify-center">
    <button
      v-if="peopleListStore.getCurrentPage !== 1"
      type="button"
      @click="peopleListStore.setPage(peopleListStore.getCurrentPage - 1)"
      class="p border-lighter-gray border-[1px] bg-white px-4 py-2 text-base"
    >
      prev
    </button>
    <span v-if="peopleListStore.getCurrentPage - 3 >= 1" class="px-2"> ... </span>
    <template v-for="index in peopleListStore.getTotalPages"
      ><button
        type="button"
        v-if="
          index >= peopleListStore.getCurrentPage - 2 && index <= peopleListStore.getCurrentPage + 2
        "
        :key="index"
        @click="peopleListStore.setPage(index)"
        :class="{ active: index === peopleListStore.getCurrentPage }"
        :disabled="index === peopleListStore.getCurrentPage"
        class="border-lighter-gray border-collapse border-[1px] bg-white px-4 py-2 text-base"
      >
        {{ index }}
      </button></template
    >
    <span v-if="peopleListStore.getCurrentPage + 3 <= peopleListStore.getTotalPages" class="px-2">
      ...
    </span>
    <button
      v-if="peopleListStore.getCurrentPage !== peopleListStore.getTotalPages"
      type="button"
      @click="peopleListStore.setPage(peopleListStore.getCurrentPage + 1)"
      class="border-lighter-gray border-[1px] bg-white px-4 py-2 text-base"
    >
      next
    </button>
  </div>
</template>
