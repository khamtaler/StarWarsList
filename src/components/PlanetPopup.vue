<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
const props = defineProps({
  open: Boolean,
  planet: Object
})
</script>

<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="$emit('closeModal')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="bg-gray-200 py-2 text-center text-xl font-medium leading-6 text-gray-900 shadow-md"
              >
                Planet info:
              </DialogTitle>
              <div class="mt-2">
                <ul class="text-lg text-black">
                  <li class="py-1"><span class="mr-3">Name:</span> {{ props.planet.name }}</li>

                  <li class="py-1">
                    <span class="mr-3">Diameter:</span> {{ props.planet.diameter }}
                  </li>
                  <li class="py-1">
                    <span class="mr-3">Climate:</span> {{ props.planet.climate }}
                  </li>
                  <li class="py-1">
                    <span class="mr-3">Population:</span> {{ props.planet.population }}
                  </li>
                </ul>
              </div>

              <div class="mt-4 flex items-center justify-center">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  @click="$emit('closeModal')"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
