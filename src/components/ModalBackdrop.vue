<template>
  <transition name="fade">
    <div v-if="show" id="hs-small-modal-backdrop" style="z-index: 79;"
         class="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 hs-overlay-backdrop"></div>
  </transition>
</template>
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>