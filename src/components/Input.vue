<template>
  <input :value="value" @input="input"  class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:outline-0 disabled:opacity-50 disabled:pointer-events-none">
</template>
<script>
export default {
  data(){
    return{
      value: this.$attrs.modelValue
    }
  },
  methods:{
    input(event){
      if(this.$attrs.maxlength){
        const value = event.target.value
        if(String(value).length <= parseInt(this.$attrs.maxlength)){
          this.value = value
        }
        this.$forceUpdate()
      }
      this.$emit('update:modelValue',this.value)
    },
    clean(){
      this.value = ''
    }
  },
  computed:{},
  mounted(){},
  watch:{
    '$attrs.value': function (value) {
      this.value = value
    }
  }
}
</script>