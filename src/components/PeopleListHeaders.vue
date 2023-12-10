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
    console.log('changed')
    if (Object.keys(currentQueryParam.value).length > 0 && newVal) {
      console.log(Object.values(currentQueryParam.value)[0])
      if (Object.values(currentQueryParam.value)[0] === 'descending') {
        peopleListStore.sortingKey = ''
      } else {
        peopleListStore.sortingKey = Object.keys(currentQueryParam.value)[0]
      }
      if (
        Object.keys(currentQueryParam.value)[0] === 'name' ||
        Object.keys(currentQueryParam.value)[0] === 'created' ||
        Object.keys(currentQueryParam.value)[0] === 'edited'
      ) {
        peopleListStore.sortStrings(Object.keys(currentQueryParam.value)[0])
      }
      if (
        Object.keys(currentQueryParam.value)[0] === 'height' ||
        Object.keys(currentQueryParam.value)[0] === 'mass'
      ) {
        peopleListStore.sortInts(Object.keys(currentQueryParam.value)[0])
      }
      if (Object.keys(currentQueryParam.value)[0] === 'planetname') {
        peopleListStore.sortPlanets()
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
              asc:
                Object.keys(currentQueryParam)[0] === 'name' &&
                Object.values(currentQueryParam)[0] === 'ascending'
            },
            {
              desc:
                Object.keys(currentQueryParam)[0] === 'name' &&
                Object.values(currentQueryParam)[0] === 'descending'
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
              asc:
                Object.keys(currentQueryParam)[0] === 'height' &&
                Object.values(currentQueryParam)[0] === 'ascending'
            },
            {
              desc:
                Object.keys(currentQueryParam)[0] === 'height' &&
                Object.values(currentQueryParam)[0] === 'descending'
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
              asc:
                Object.keys(currentQueryParam)[0] === 'mass' &&
                Object.values(currentQueryParam)[0] === 'ascending'
            },
            {
              desc:
                Object.keys(currentQueryParam)[0] === 'mass' &&
                Object.values(currentQueryParam)[0] === 'descending'
            }
          ]"
          >Mass</span
        >
      </th>
      <th class="pb-3">
        <span
          class="cursor-pointer"
          @click="peopleListStore.sortStrings('created')"
          :class="[
            !peopleListStore.getplanetsLoaded ? 'pointer-events-none' : 'pointer',
            {
              asc:
                Object.keys(currentQueryParam)[0] === 'created' &&
                Object.values(currentQueryParam)[0] === 'ascending'
            },
            {
              desc:
                Object.keys(currentQueryParam)[0] === 'created' &&
                Object.values(currentQueryParam)[0] === 'descending'
            }
          ]"
          >Created</span
        >
      </th>
      <th class="pb-3">
        <span
          class="cursor-pointer"
          @click="peopleListStore.sortStrings('edited')"
          :class="[
            !peopleListStore.getplanetsLoaded ? 'pointer-events-none' : 'pointer',
            {
              asc:
                Object.keys(currentQueryParam)[0] === 'edited' &&
                Object.values(currentQueryParam)[0] === 'ascending'
            },
            {
              desc:
                Object.keys(currentQueryParam)[0] === 'edited' &&
                Object.values(currentQueryParam)[0] === 'descending'
            }
          ]"
          >Edited</span
        >
      </th>
      <th class="pb-3">
        <span
          class="cursor-pointer"
          @click="peopleListStore.sortPlanets()"
          :class="[
            !peopleListStore.getplanetsLoaded ? 'pointer-events-none' : 'pointer',
            {
              asc:
                Object.keys(currentQueryParam)[0] === 'planetname' &&
                Object.values(currentQueryParam)[0] === 'ascending'
            },
            {
              desc:
                Object.keys(currentQueryParam)[0] === 'planetname' &&
                Object.values(currentQueryParam)[0] === 'descending'
            }
          ]"
          >Planet Name</span
        >
      </th>
    </tr>
  </thead>
</template>
