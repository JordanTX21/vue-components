import './assets/main.css'

import {
  createApp,
  defineAsyncComponent,
  defineProps,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  defineEmits,
  defineModel,
  defineExpose,
  computed
} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/** DEFINIENDO FUNCIONES DE VUE */

window.defineProps = defineProps
window.ref = ref
window.watch = watch
window.computed = computed
window.onMounted = onMounted
window.onBeforeUnmount = onBeforeUnmount
window.defineModel = defineModel
window.defineEmits = defineEmits
window.defineExpose = defineExpose

const app = createApp(App)

app.use(createPinia())
app.use(router)

/** GENERAL COMPONENTS */

const componentList = [
  'Loader',
  'Button',
  'Video',
  'Modal',
  'ModalHeader',
  'ModalFooter',
  'ModalBackdrop',
  'MenuItems',
  'MenuItem',
  'Menu',
  'Input',
  'InputGroup',
  'Select',
  'Accordion',
  'DropDown',
  'DragScroll',
  'Pagination',
  'ImgLazzy'
]

componentList.forEach((nameComponent) => {
  const component = defineAsyncComponent(() => import(`@/components/${nameComponent}.vue`))
  app.component(nameComponent, component)
})

app.mount('#app')
