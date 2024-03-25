<template>
  <div id="hs-bg-gray-on-hover-cards"
       class="w-full h-full fixed top-0 start-0 z-[1000] overflow-x-hidden overflow-y-auto pointer-events-none"
       :class="{'flex items-center':center}">
    <Transition name="modal" mode="out-in">
      <div v-if="show"
           class="w-full m-3 sm:mx-auto" :class="classes">
        <div
            class="max-h-full overflow-hidden flex flex-col bg-white shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:shadow-slate-700/[.7]">
          <slot name="header"></slot>

          <div class="p-4 overflow-y-auto">
            <slot name="body"></slot>
          </div>
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup>

const emit = defineEmits()
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md'
  }
})

const defaultSizes = ref(['sm', 'md', 'lg'])
const classes = ref({
  'sm:max-w-lg': props.size === 'sm',
  'md:max-w-2xl': props.size === 'md',
  'lg:max-w-4xl': props.size === 'lg',
  'mt-7': !props.center
})
function handleKeyUp(e){
  if(e.code === 'Escape'){
    emit('close')
  }
}

onMounted(()=>{
  document.addEventListener('keyup', handleKeyUp);
})
onBeforeUnmount(()=>{
  document.removeEventListener('keyup', handleKeyUp);
})

</script>
<style scoped>
@media (min-width: 768px) {
  .md\:mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .md\:w-full {
    width: 100%;
  }

  .md\:max-w-2xl {
    max-width: 42rem;
  }
}

@media (min-width: 640px) {
  .sm\:max-w-lg {
    max-width: 32rem;
  }

  .sm\:w-full {
    width: 100%;
  }

  .sm\:mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>