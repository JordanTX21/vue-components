<template>
  <div ref="draggableContainer" >
    <div ref="draggableContent">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  horizontal: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
})

const draggableContainer = ref(null);
const draggableContent = ref(null);

let isDragging = false;
let startX = 0;
let startY = 0;
let scrollLeft = 0;
let scrollTop = 0;

const handleMouseDown = (e) => {
  isDragging = true;
  startX = e.pageX - draggableContainer.value.offsetLeft;
  startY = e.pageY - draggableContainer.value.offsetTop;
  scrollLeft = draggableContainer.value.scrollLeft;
  scrollTop = draggableContainer.value.scrollTop;

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('mouseleave', handleMouseUp);
}
const handleMouseMove = (e) => {
  if (!isDragging) return;

  const x = e.pageX - draggableContainer.value.offsetLeft;
  const y = e.pageY - draggableContainer.value.offsetTop;

  const deltaX = x - startX;
  const deltaY = y - startY;

  draggableContainer.value.scrollLeft = scrollLeft - deltaX;
  draggableContainer.value.scrollTop = scrollTop - deltaY;
};

const handleMouseUp = () => {
  isDragging = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  document.removeEventListener('mouseleave', handleMouseUp);
};

onMounted(() => {
  draggableContent.value.addEventListener('mousedown', handleMouseDown);
});

</script>