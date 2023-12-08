<script setup>
import Spinner from '../assets/svg/spinner.vue'
</script>

<template>
  <tr>
    <td class="px-4 py-4" v-for="index in 6" :key="index">
      <Spinner class="m-auto" />
    </td>
  </tr>
</template>
