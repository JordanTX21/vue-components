<template>
  <div class="relative inline-block text-left w-full" ref="selectDropdown">
    <InputGroup :class="defaultClasses['input-group']">
      <template #prepend="prependProps">
        <div :class="prependProps.class">
          <div class="pl-4 py-3.5" v-if="prepend">
            <IconLupa class="w-4 bg-icon-stone-300"/>
          </div>
        </div>
      </template>
      <template #input>
        <VField v-if="validate" v-model="inputModel" :name="name" v-slot="{ field }" :rules="rules">
          <input v-bind="field"
                 :class="defaultClasses['input-select']"
                 type="text" :placeholder="placeholder" @input="input" @focus="showOptions" :disabled="disabled">
        </VField>
        <input v-else v-model="inputModel"
               :class="defaultClasses['input-select']"
               type="text" :placeholder="placeholder" @input="input" @focus="showOptions" :disabled="disabled">
      </template>
      <template #append="appendProps">
        <div :class="appendProps.class">
          <div class="pr-4 py-3.5 flex align-center">
            <button v-if="showClear">
              <IconEquis class="w-3 bg-icon-stone-300" @click="clear"/>
            </button>
            <slot name="append"></slot>
          </div>
        </div>
      </template>
    </InputGroup>
    <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95">
      <div v-show="show"
           :class="defaultClasses['options-select']"
           role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div :class="defaultClasses['options-select-container']" role="none">
          <div v-for="(item,index) in optionsValues"
               :class="defaultClasses['option-select']" @click="select(item)">
            {{ item.label }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  classes: {
    type: Object,
  },
  placeholder: {
    type: String,
    default: "",
  },
  search_by: {
    type: String,
    default: "",
  },
  showClear: {
    type: Boolean,
    default: false,
  },
  prepend: {
    type: Boolean,
    default: true,
  },
  validate: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['input', 'select', 'clear','showOptions','update:modelValue'])
const model = defineModel({
  default: {
    value: '',
    label: '',
  }
})

const show = ref(false)
const selectDropdown = ref(undefined)
const inputModel = ref(model.value.label)
const option = ref(null)

function input(e) {
  if(e.target.value === ''){
    clear()
  }
  // optionsValues.value = props.options.filter(item => item.label.toLowerCase().includes(inputModel.value.toLowerCase()))
  emit('input', e)
}

function clear() {
  inputModel.value = ""
  option.value = null
  emit('clear')
  emit('update:modelValue', {value:'',label:''})
}

function showOptions(){
  show.value = true
  emit('showOptions', show.value)
}

function select(item) {
  show.value = false
  inputModel.value = item.label
  option.value = {...item}
  emit('showOptions', show.value)
  emit('select', {...item})
  emit('update:modelValue', {...item})
}

function onClickOutside(event) {
  // Esta función se ejecutará cuando se haga clic fuera del div
  const div = selectDropdown.value;
  if (div && !div.contains(event.target)) {
    show.value=false
    emit('showOptions', show.value)
  }
}
onMounted(()=>{
  document.addEventListener('click', onClickOutside);
})
onBeforeUnmount(()=>{
  document.removeEventListener('click', onClickOutside);
})

const defaultClasses = computed(() => {
  const classes = {
    'input-select': '!py-3.5 px-4 placeholder:text-zinc-300 text-xs bg-transparent w-full focus:outline-0',
    'input-group': 'border border-stone-300 rounded-lg',
    'options-select': 'absolute right-0 z-20 origin-top-right rounded-t-none rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full',
    'option-select': 'p-2 m-2 hover:bg-claim-input rounded-lg text-xs font-medium text-[#8C8C8C] cursor-pointer w-[100% - 0.5rem]',
    'options-select-container': 'divide-y divide-zinc-100 max-h-[250px] overflow-y-auto w-full',
  }
  if(props.classes){
    for(const [index,item] of Object.entries(props.classes)){
      classes[index] = item;
    }
  }
  return classes
})

const optionsValues = computed(() => {
  let opciones = props.options
  if(inputModel.value && !option.value){
    opciones = props.options.filter(item => item.label.toLowerCase().includes(inputModel.value.toLowerCase()))
  }
  if(props.search_by){
    opciones = props.options.filter(item => item[props.search_by].toLowerCase().includes(inputModel.value.toLowerCase()))
  }
  return opciones
})

const rules = computed(() => {
  return {
    required: true,
    one_of: props.options.map(item => item.label)
  }
})

watch(model,(newValue,oldValue)=>{
  inputModel.value = newValue.label
})

</script>