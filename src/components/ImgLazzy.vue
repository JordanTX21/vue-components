<template>
  <div ref="blurredImageDiv" class="blurred-img inline-block" :class="{'loaded':isLoaded,'relative':!isLoaded}">
    <img ref="img" id="img" :class="class_img" :src="src" :alt="alt" @load="loaded">
    <transition name="fadeimglazzy">
      <img v-if="!isLoaded" ref="imgLow" id="imgLow" :class="class_img" class="absolute top-0 left-0 w-full" :src="src_low" :alt="`${alt}_low`" @load="loadedLow">
    </transition>
  </div>
</template>
<script setup>
const emit = defineEmits(['show','showLow'])

const props = defineProps({
  class_img:{
    type: [String, Object, Array],
    default: ""
  },
  alt:{
    type:String,
    default: ""
  },
  src:{
    type:String,
    default: ""
  },
  src_low:{
    type:String,
    default: ""
  },
})

const blurredImageDiv = ref(null)
const img = ref(null)
const imgLow = ref(null)
const isLoaded = ref(false)
const isLowLoaded = ref(false)

function loadedLow() {
  if(!props.src_low) return;
  isLowLoaded.value=true
  emit('showLow',true)
}

function loaded() {
  if(!props.src) return;
  isLoaded.value=true
  emit('show',true)
}

onMounted(()=>{
  if (isLowLoaded.value && isLowLoaded.value.complete) {
    loadedLow()
  }
  if (img.value && img.value.complete) {
    loaded()
  }
})
</script>
<style scoped>

.blurred-img {
  filter: blur(10px);
  background-repeat: no-repeat;
  background-size: cover;
  transition: 500ms ease-in-out;
}

.blurred-img.loaded {
  filter: blur(0px);
  /*background: transparent !important;*/
}

.blurred-img #img {
  opacity: 0;
  transition: opacity 500ms ease-in-out;
}

.blurred-img #imgLow {
  opacity: 1;
  transition: opacity 500ms ease-in-out;
}

.blurred-img.loaded #img {
  opacity: 1;
}

.blurred-img.loaded #imgLow {
  opacity: 0;
}

.blurred-img::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: pulse 2.5s infinite;
  background-color: white;
}
.blurred-img.loaded::before {
  animation: none;
  content: none;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}

/** fade */
.fadeimglazzy-enter-active,
.fadeimglazzy-leave-active {
  transition: opacity 500ms ease;
}

.fadeimglazzy-enter-from,
.fadeimglazzy-leave-to {
  opacity: 0;
}
</style>