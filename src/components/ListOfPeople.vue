<script setup>
import { onMounted } from 'vue'
import { usePeopleList } from '@/stores/people'
import SinglePersonListItem from './SinglePersonListItem.vue'
import SinglePersonListItemPlaceholder from './SinglePersonListItemPlaceholder.vue'
import ListOfPeoplePagination from './ListOfPeoplePagination.vue'

const peopleListStore = usePeopleList()

onMounted(() => {
  peopleListStore.downloadPeopleList()
  console.log(peopleListStore.getPeopleList)
})
</script>

<template>
  <div class="mx-5 mt-[100px] flex flex-col items-center justify-center text-center">
    <h2 class="mb-[30px] text-2xl font-bold">List of People</h2>
    <div
      class="no-scrollbar w-full max-w-[1000px] overflow-scroll rounded-xl border-2 p-5 lg:overflow-auto"
    >
      <!-- <label for="name">Search by name</label>
      <input
        type="string"
        id="name"
        placeholder="name"
        @onchange="searchByName($event.target.value)"
      /> -->
      <table class="w-full min-w-[900px]">
        <thead>
          <tr class="border-b-[2px]">
            <th class="pb-3" @click="peopleListStore.sortStrings('name')">Name</th>
            <th class="pb-3" @click="peopleListStore.sortInts('height')">Height</th>
            <th class="pb-3" @click="peopleListStore.sortInts('mass')">Mass</th>
            <th class="pb-3" @click="peopleListStore.sortStrings('created')">Created</th>
            <th class="pb-3" @click="peopleListStore.sortStrings('edited')">Edited</th>
            <th class="pb-3" @click="peopleListStore.sortPlanets('name')">Planet Name</th>
          </tr>
        </thead>
        <tbody class="mt-5">
          <template v-if="peopleListStore.getPeopleList.results">
            <SinglePersonListItem
              v-for="(person, index) in peopleListStore.getPeopleList.results"
              :SinglePerson="person"
              :key="index"
            />
          </template>

          <SinglePersonListItemPlaceholder v-else />
        </tbody>
      </table>
      <ListOfPeoplePagination />
    </div>
  </div>
</template>
