<script setup>
import { ref } from 'vue'
import { usePeopleList } from '@/stores/people'
import spinner from '@/assets/svg/spinner.vue'
import PlanetPopup from './PlanetPopup.vue'

const props = defineProps({
  SinglePerson: Object
})

const isOpen = ref(false)
const peopleListStore = usePeopleList()
function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>

<template>
  <tr class="border-b-[1px] border-gray-200 text-center last:border-b-0 even:bg-gray-100">
    <td class="px-3 py-3">{{ props.SinglePerson.name }}</td>
    <td class="px-3 py-3">{{ props.SinglePerson.height }}</td>
    <td class="px-3 py-3">{{ props.SinglePerson.mass }}</td>
    <td class="px-3 py-3">{{ props.SinglePerson.created.split('T')[0] }}</td>
    <td class="px-3 py-3">{{ props.SinglePerson.edited.split('T')[0] }}</td>
    <td
      class="cursor-pointer px-3 py-3 underline hover:text-gray-400"
      v-if="peopleListStore.getplanetsLoaded"
      @click="openModal()"
    >
      {{ props.SinglePerson.homeworld.name }}
    </td>
    <td class="px-3 py-3" v-else><spinner class="m-auto" /></td>
    <PlanetPopup
      v-if="peopleListStore.getplanetsLoaded"
      :open="isOpen"
      @closeModal="closeModal"
      :planet="props.SinglePerson.homeworld"
    />
  </tr>
</template>
