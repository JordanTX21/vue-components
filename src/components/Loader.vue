<template>
  <span :class="{text_color:color!=='white','text-white':color==='white'}" class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent rounded-full" role="status" aria-label="loading">
    <span class="sr-only">Loading...</span>
  </span>
</template>
<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'white',
  }
})

const text_color = computed(() => {
  return `text-${props.color}-600`
})
</script>
<style scoped>

</style>
