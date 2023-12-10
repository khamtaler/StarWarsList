<script setup>
import { onBeforeMount } from 'vue'
import { usePeopleList } from '@/stores/people'
import PeopleListSearchbar from './PeopleListSearchbar.vue'
import PeopleListItem from './PeopleListItem.vue'
import PeopleListItemPlaceholder from './PeopleListItemPlaceholder.vue'
import PeopleListPagination from './PeopleListPagination.vue'
import PeopleListHeaders from './PeopleListHeaders.vue'

const peopleListStore = usePeopleList()

onBeforeMount(() => {
  peopleListStore.getList()
})
</script>

<template>
  <div class="mx-5 mt-[100px] flex flex-col items-center justify-center text-center">
    <h2 class="mb-[30px] text-2xl font-bold">List of People</h2>
    <div
      class="no-scrollbar w-full max-w-[1000px] overflow-scroll rounded-xl border-2 p-5 lg:overflow-auto"
    >
      <PeopleListSearchbar />
      <table class="w-full min-w-[900px]">
        <PeopleListHeaders />
        <tbody class="mt-5">
          <template
            v-if="peopleListStore.getdataLoaded && peopleListStore.getData.results.length !== 0"
          >
            <PeopleListItem
              v-for="(person, index) in peopleListStore.getData.results"
              :SinglePerson="person"
              :key="index"
            />
          </template>
        </tbody>
      </table>
      <PeopleListItemPlaceholder v-if="!peopleListStore.getdataLoaded" />
      <span v-if="peopleListStore.getdataLoaded && peopleListStore.getData.results.length === 0"
        >Sorry, there is no data matching your search</span
      >
      <PeopleListPagination v-if="peopleListStore.getTotalPages && peopleListStore.getdataLoaded" />
    </div>
  </div>
</template>
