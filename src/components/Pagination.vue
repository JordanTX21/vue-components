<template>
  <nav aria-label="Page navigation example">
    <ul class="flex justify-center items-center text-shalom gap-2">
      <li class="w-9 h-9 flex items-center justify-center">
        <button class="flex items-center justify-center" aria-label="Previous" @click="sendPage(page--)"
          :disabled="disabled" v-show="page > 1">
          <IconBlogArrowLeft class="w-3" />
        </button>
      </li>
      <li class="" v-if="pages_per_records > 1 && !pages_show.includes(1)">
        <button class="text-xs rounded-full border border-shalom w-9 h-9 flex items-center justify-center"
          @click="sendPage(page = 1)" :disabled="disabled">{{ 1 }}</button>
      </li>
      <li class="" v-if="page > 3">
        <div class="text-xs rounded-full border border-shalom w-9 h-9 flex items-center justify-center"
          :disabled="disabled">...</div>
      </li>
      <li class="" v-for="pageNumber in pages_show" :key="`page-${pageNumber}`">
        <button @click="sendPage(page = pageNumber)"
          :class="[{ 'bg-shalom text-white': pageNumber === page }, 'text-xs rounded-full border border-shalom w-9 h-9 flex items-center justify-center']"
          :disabled="disabled">{{ pageNumber }}</button>
      </li>
      <li class="" v-if="page < last_page - 2">
        <div class="text-xs rounded-full border border-shalom w-9 h-9 flex items-center justify-center"
          :disabled="disabled">...</div>
      </li>
      <li class="" v-if="pages_per_records > 1 && !pages_show.includes(last_page)">
        <button class="text-xs rounded-full border border-shalom w-9 h-9 flex items-center justify-center"
          @click="sendPage(page = last_page)" :disabled="disabled">{{ last_page }}</button>
      </li>
      <li class="w-9 h-9 flex items-center justify-center">
        <button class="flex items-center justify-center" aria-label="Next" @click="sendPage(page++)"
          :disabled="disabled" v-show="page < last_page">
          <IconBlogArrowRight class="w-3" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>

const emit = defineEmits(['paginate'])

const props = defineProps({
  value: {
    type: Number,
    default: 1
  },
  records: {
    type: Number,
    default: 0
  },
  per_page: {
    type: Number,
    default: 25
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

const page = defineModel()
const pages_per_records = ref(0)
const last_page = ref(0)
const pages = ref([])

function sendPage(value) {
  emit('paginate', page.value)
}
function setPages() {
  pages.value = [];
  pages_per_records.value = Math.ceil(props.records / props.per_page)
  for (let i = 1; i <= pages_per_records.value; i++) {
    pages.value.push(i);
  }
  last_page.value = pages.value.length
}

const pages_show = computed(() => {
  const first_index = Math.max(page.value - 2, 0)
  const last_index = Math.min(page.value + 1, last_page.value)
  return pages.value.slice(first_index, last_index)
})

onMounted(() => {
  setPages()
})

watch(() => props.records, () => {
  setPages()
})

</script>

<style scoped></style>
