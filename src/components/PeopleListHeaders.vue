<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePeopleList } from '@/stores/people'

const peopleListStore = usePeopleList()

const route = useRoute()
const currentQueryParam = ref(route.query)

watch(
  () => {
    return route.query
  },
  (newVal) => {
    currentQueryParam.value = newVal
  }
)
watch(
  () => {
    return peopleListStore.getplanetsLoaded
  },
  (newVal) => {
    if (newVal && currentQueryParam.value.orderby && currentQueryParam.value.order) {
      if (currentQueryParam.value.orderby === 'name') {
        peopleListStore.sortStrings(currentQueryParam.value.orderby, currentQueryParam.value.order)
      }
      if (
        currentQueryParam.value.orderby === 'height' ||
        currentQueryParam.value.orderby === 'mass'
      ) {
        peopleListStore.sortInts(currentQueryParam.value.orderby, currentQueryParam.value.order)
      }
      if (
        currentQueryParam.value.orderby === 'created' ||
        currentQueryParam.value.orderby === 'edited'
      ) {
        peopleListStore.sortDates(currentQueryParam.value.orderby, currentQueryParam.value.order)
      }
      if (currentQueryParam.value.orderby === 'planetname') {
        peopleListStore.sortPlanets(currentQueryParam.value.orderby, currentQueryParam.value.order)
      }
    }
  }
)
</script>
<template>
  <thead>
    <tr class="border-b-[2px]">
      <th class="pb-3">
        <span
          class="cursor-pointer"
          @click="peopleListStore.sortStrings('name')"
          :class="[
            !peopleListStore.getplanetsLoaded ? 'pointer-events-none' : 'pointer',
            {
              asc: currentQueryParam.orderby === 'name' && currentQueryParam.order === 'asc'
            },
            {
              desc: currentQueryParam.orderby === 'name' && currentQueryParam.order === 'desc'
            }
          ]"
          >Name</span
        >
      </th>
      <th class="pb-3">
        <span
          class="cursor-pointer"
          @click="peopleListStore.sortInts('height')"
          :class="[
            !peopleListStore.getplanetsLoaded ? 'pointer-events-none' : 'pointer',
            {
              asc: currentQueryParam.orderby === 'height' && currentQueryParam.order === 'asc'
            },
            {
              desc: currentQueryParam.orderby === 'height' && currentQueryParam.order === 'desc'
            }
          ]"
          >Height</span
        >
      </th>
      <th class="pb-3">
        <span
          class="cursor-pointer"
          @click="peopleListStore.sortInts('mass')"
          :class="[
            !peopleListStore.getplanetsLoaded ? 'pointer-events-none' : 'pointer',
            {
              asc: currentQueryParam.orderby === 'mass' && currentQueryParam.order === 'asc'
            },
            {
              desc: currentQueryParam.orderby === 'mass' && currentQueryParam.order === 'desc'
            }
          ]"
          >Mass</span
        >
      </th>
      <th class="pb-3">
        <span
          class="cursor-pointer"
          @click="peopleListStore.sortDates('created')"
          :class="[
            !peopleListStore.getplanetsLoaded ? 'pointer-events-none' : 'pointer',
            {
              asc: currentQueryParam.orderby === 'created' && currentQueryParam.order === 'asc'
            },
            {
              desc: currentQueryParam.orderby === 'created' && currentQueryParam.order === 'desc'
            }
          ]"
          >Created</span
        >
      </th>
      <th class="pb-3">
        <span
          class="cursor-pointer"
          @click="peopleListStore.sortDates('edited')"
          :class="[
            !peopleListStore.getplanetsLoaded ? 'pointer-events-none' : 'pointer',
            {
              asc: currentQueryParam.orderby === 'edited' && currentQueryParam.order === 'asc'
            },
            {
              desc: currentQueryParam.orderby === 'edited' && currentQueryParam.order === 'desc'
            }
          ]"
          >Edited</span
        >
      </th>
      <th class="pb-3">
        <span
          class="cursor-pointer"
          @click="peopleListStore.sortPlanets('planetname')"
          :class="[
            !peopleListStore.getplanetsLoaded ? 'pointer-events-none' : 'pointer',
            {
              asc: currentQueryParam.orderby === 'planetname' && currentQueryParam.order === 'asc'
            },
            {
              desc: currentQueryParam.orderby === 'planetname' && currentQueryParam.order === 'desc'
            }
          ]"
          >Planet Name</span
        >
      </th>
    </tr>
  </thead>
</template>
