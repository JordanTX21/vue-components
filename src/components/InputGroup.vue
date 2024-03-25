<template>
  <div class="flex flex-row w-full items-stretch">
    <slot name="prepend" class="flex -mr-1 items-center mb-0 pr-0"></slot>
    <slot name="input"></slot>
    <slot name="append"  class="flex -ml-1 items-center mb-0 pl-0"></slot>
  </div>
</template>
<script>
export default {
  props:{
    border: {
      type: String,
      default: ''
    },
  }
}
</script>