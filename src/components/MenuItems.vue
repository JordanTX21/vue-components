<template>
  <transition 
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95">
    <div v-if="show" :class="{'left-3 bottom-3':position==='top','right-0 ':position==='bottom'}" class="absolute z-10 mt-2 rounded-[20px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="px-4 py-2 divide-y divide-zinc-100" role="none">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script setup>
const props = defineProps({
  show: {
    default: false,
    type: Boolean
  },
  position: {
    default: 'bottom',
    type: String
  }
})
</script>