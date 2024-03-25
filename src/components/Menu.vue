<template>
  <div class="relative inline-block text-left">
    <div ref="dropdownMenu" @click="onClick" @mouseover="mouseover" @mouseleave="mouseleave">
      <slot name="MenuButton"></slot>
    </div>
    <slot name="MenuItems" :show="show"></slot>
  </div>
</template>
<script setup>

const emit = defineEmits()

const show = ref(false)
const dropdownMenu = ref(null)

const props = defineProps({
  tooltip: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

function onClick(){
  if(!props.disabled) show.value = !show.value
  emit('dropMenu',show.value)
}

function onClickOutside(event) {
  // Esta función se ejecutará cuando se haga clic fuera del div
  const div = dropdownMenu.value;
  if (div && !div.contains(event.target)) {
    show.value=false
  }
}
function mouseover(event){
  if(props.tooltip) show.value=true
}
function mouseleave(event){
  if(props.tooltip) show.value=false
}

onMounted(()=>{
  document.addEventListener('click', onClickOutside);
})
onBeforeUnmount(()=>{
  document.removeEventListener('click', onClickOutside);
})
</script>