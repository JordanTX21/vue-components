<template>
  <button class="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 text-center" :disabled="disabled">
    <Loader v-if="disabled && loading" />
    <slot></slot>
  </button>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    text_loading: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
  },
  mounted() {

  }
}
</script>
<style scoped>

</style>
